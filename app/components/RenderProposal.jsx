import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../css/Render.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function fetchJsonFile() {
    try {
        const response = await fetch('/PillowTelaConfig.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: no encuentro: /PillowTelaConfig.json', error);
    }
}

const RenderMenu = ({ data, uiPillo, setUiPillo, selection, setSelection }) => {
    const [telaDropdownVisible, setTelaDropdownVisible] = useState(false);
    const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
    const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

    const handleColorClick = (value) => {
        setUiPillo(prevState => ({ ...prevState, [selection.selectedTela]: value }));
        setSelection(prevState => ({ ...prevState, selectedColor: value }));
        setColorDropdownVisible(false);
    }

    const handleTelaClick = (key) => {
        setSelection(prevState => ({ ...prevState, selectedTela: key, selectedColor: data[key][0] }));
        setUiPillo(prevState => ({ ...prevState, [key]: data[key][0] }));
        setTelaDropdownVisible(false);
    }

    const handleTypeClick = (type) => {
        setSelection(prevState => ({ ...prevState, selectedType: type }));
        setUiPillo(prevState => ({ ...prevState, type }));
        setTypeDropdownVisible(false);
    }

    return (
        <div className='d-flex flex-column'>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setTypeDropdownVisible(!typeDropdownVisible)}>
                    Select type {selection.selectedType}
                </div>
                {typeDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {['single', 'double', 'triple'].map((type) => (
                            <div key={type} onClick={() => handleTypeClick(type)}>
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setTelaDropdownVisible(!telaDropdownVisible)}>
                    Select tela {selection.selectedTela}
                </div>
                {telaDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {Object.keys(data).map((key) => (
                            <div key={key} onClick={() => handleTelaClick(key)}>
                                {key}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setColorDropdownVisible(!colorDropdownVisible)}>
                    Select color {selection.selectedColor}
                </div>
                {colorDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {data[selection.selectedTela].map((color, index) => (
                            <div key={index} onClick={() => handleColorClick(color)}>
                                {color}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

const RenderView = ({ selectedColor }) => {
    const mountRef = useRef(null);

    const handleResize = useCallback((renderer, camera) => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }, []);

    useEffect(() => {
        // Scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0xeeeeee, 0.5); // 0xeeeeee is light gray in hexadecimal
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, .8);
        light.position.set(0, 1, 0).normalize();
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // Load 3D model
        const loader = new GLTFLoader();
        loader.load('/Pillow.glb', (gltf) => {
            const model = gltf.scene;

            // Apply the initial texture
            const textureLoader = new THREE.TextureLoader();
            let texture = textureLoader.load(`/telas/${selectedColor}.jpg`);
            model.traverse((node) => {
                if (node.isMesh) {
                    node.material.map = texture;
                    node.material.needsUpdate = true;
                }
            });

            scene.add(model);

            // Compute bounding box of the model
            const bbox = new THREE.Box3().setFromObject(model);
            const center = bbox.getCenter(new THREE.Vector3());
            const size = bbox.getSize(new THREE.Vector3());

            // Reposition the model
            model.position.sub(center); // Center the model
            model.position.y -= size.y / 2; // Adjust height if necessary

            // Adjust camera position to fit the model
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // Zoom out a little so the object is not too close

            camera.position.z = cameraZ;
            // Move the camera upwards
            camera.position.y = cameraZ / 2; 
            // Rotate the camera to point downwards
            camera.rotation.x = -Math.PI / 6; 

            const minZ = bbox.min.z;
            const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

            camera.far = cameraToFarEdge * 3;
            camera.updateProjectionMatrix();

            // Animation loop
            const animate = function () {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };

            animate();
        });

        // Handle window resize
        window.addEventListener('resize', () => handleResize(renderer, camera));

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', () => handleResize(renderer, camera));
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [handleResize, selectedColor]); // Re-run the effect when selectedColor changes

    return <div className="render-view" ref={mountRef} />;
};

const RenderWrapper = ({ data }) => {
    const [uiPillo, setUiPillo] = useState(data.DEFAULT);
    const [selection, setSelection] = useState({
        selectedTela: Object.keys(data)[0],
        selectedColor: data[Object.keys(data)[0]][0],
        selectedType: 'single'
    });

    const sortDataValues = (data) => {
        delete data.DEFAULT; //  to pass to RenderMenu we don't want this option
        let sortedData = {};
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                sortedData[key] = [...data[key]].sort((a, b) => b - a); //DESC
            } else {
                sortedData[key] = data[key];
            }
        });
        return sortedData;
    }

    return (
        <div className='render-container'>
            <RenderView selectedColor={selection.selectedColor} />
            <RenderMenu data={sortDataValues(data)} uiPillo={uiPillo} setUiPillo={setUiPillo} selection={selection} setSelection={setSelection} />
        </div>
    )
}

const Fabric = ({ data }) => {

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Fabric Component</h1>
            <div className='d-flex flex-column'>
                {Object.entries(data).map(([key, value]) => {
                    return (
                        <div className='render-row' key={key}>
                            {key}
                            {Object.entries(value).map(([subKey, subValue]) => {
                                return (
                                    <div className='render-hover' style={{ backgroundImage: `url(/telas/${subValue}.jpg)` }} key={subKey}>
                                        {/* {JSON.stringify(subValue)} */}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

const HowDoesItWork = () => {
    return (
        <div>
            <h1>How Does It Work Component</h1>
            <p>This is the How Does It Work component.</p>
        </div>
    );
}

const Specifications = () => {
    return (
        <div>
            <h1>Specifications Component</h1>
            <p>This is the Specifications component.</p>
        </div>
    );
}

const RenderBar = ({ data }) => {
    const TitleEnum = Object.freeze({
        A: 'Fabric',
        B: 'How does it Work?',
        C: 'Specifications'
    });

    const componentMap = {
        [TitleEnum.A]: <Fabric data={data} />,
        [TitleEnum.B]: <HowDoesItWork />,
        [TitleEnum.C]: <Specifications />
    };

    const [title, setTitle] = useState(TitleEnum.A);
    const handleClick = (newTitle) => {
        setTitle(newTitle);
    }

    return (
        <div className='render-bar'>
            <div className='render-navbar'>
                <div
                    onClick={() => handleClick(TitleEnum.A)}
                    className={title === TitleEnum.A ? 'active' : ''}
                >
                    {TitleEnum.A}
                </div>
                <div
                    onClick={() => handleClick(TitleEnum.B)}
                    className={title === TitleEnum.B ? 'active' : ''}
                >
                    {TitleEnum.B}
                </div>
                <div
                    onClick={() => handleClick(TitleEnum.C)}
                    className={title === TitleEnum.C ? 'active' : ''}
                >
                    {TitleEnum.C}
                </div>
            </div>
            <div>{componentMap[title]}</div>
        </div>
    )
}

export const RenderProposal = () => {
    const [pillowDataConfig, setPillowDataConfig] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchJsonFile();
            setPillowDataConfig(result);
        };
        fetchData();
    }, []);

    if (!pillowDataConfig) {
        return <div>Loading... ... ...</div>;
    }

    return (
        <>
            <RenderWrapper data={pillowDataConfig} />
            <RenderBar data={pillowDataConfig} />
        </>
    )
}
