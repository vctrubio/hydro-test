import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../css/Render.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/*UTILS*/
async function fetchJsonFile() {
    try {
        const response = await fetch('/PillowTelaConfig.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: no encuentro: /PillowTelaConfig.json', error);
    }
}

function splitHyphen(str) {
    let rtn = str.split('-');
    if (isNaN(rtn[0]) === false) {
        console.log('rtn[0] has a number');
        rtn.shift();
    }
    return rtn.join(' ')
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
        setSelection(prevState => ({ ...prevState, selectedTela: key }));
        if (!data[key].includes(selection.selectedColor)) {
            setSelection(prevState => ({ ...prevState, selectedColor: data[key][0] }));
            setUiPillo(prevState => ({ ...prevState, [key]: data[key][0] }));
        }
        setTelaDropdownVisible(false);
    }

    const handleTypeClick = (type) => {
        setSelection(prevState => ({ ...prevState, selectedType: type }));
        setUiPillo(prevState => ({ ...prevState, type }));
        setTypeDropdownVisible(false);
    }

    return (
        <div className='d-flex flex-column pl-2'>
            <div className='render-title'>
                <h1>Big Hug XL</h1>
                <h2>Big Hug XL is a cordless heating pad with infrared technology and rechargeable battery. The Original fabric is super soft and fits every style.</h2>
            </div>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setTypeDropdownVisible(!typeDropdownVisible)}>
                    Escoge tipo: {selection.selectedType}
                </div>
                {typeDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {['Simple Seated Cushion', 'Double Seated Cushion', 'Sofa Heating Pag'].map((type) => (
                            <div key={type} onClick={() => handleTypeClick(type)}>
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setTelaDropdownVisible(!telaDropdownVisible)}>
                    Escoge tela: {selection.selectedTela}
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
                    {selection.selectedColor ? `Escoge color: ${splitHyphen(selection.selectedColor)}` : null}
                </div>
                {colorDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {data[selection.selectedTela].map((color, index) => (
                            <div key={index} onClick={() => handleColorClick(color)}>
                                {splitHyphen(color)}
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
    const [isImageVisible, setIsImageVisible] = useState(false);

    const handleResize = useCallback((renderer, camera) => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }, []);

    const handleClick = () => {
        setIsImageVisible(!isImageVisible);
    };

    useEffect(() => {
        // Scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        // renderer.setClearColor(0xeeeeee, 0.5); // 0xeeeeee is light gray in hexadecimal
        const rendererHeight = 500; // Example: 500 pixels
        
        renderer.setSize(mountRef.current.clientWidth, rendererHeight);
        mountRef.current.appendChild(renderer.domElement);


        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // optional, for inertia
        controls.dampingFactor = 0.05; // optional, damping inertia
        controls.enableZoom = true; // optional, if you want zoom
        controls.minDistance = 0.3;
        controls.maxDistance = 1.1; // set zoom out limit
        controls.autoRotateSpeed = 0.6;
        controls.autoRotate = true;

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, .8);
        light.position.set(0, 1, 0).normalize();
        scene.add(light);

        // New light from below
        const lightFromBelow = new THREE.DirectionalLight(0xffffff, 0.5);
        lightFromBelow.position.set(0, -1, 0);
        scene.add(lightFromBelow);

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
            camera.position.y = cameraZ / 3;
            // Rotate the camera to point downwards
            camera.rotation.x = -Math.PI / 6;

            const minZ = bbox.min.z;
            const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

            camera.far = cameraToFarEdge * 3;
            camera.updateProjectionMatrix();

            // Animation loop
            const animate = function () {
                requestAnimationFrame(animate);
                controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
                renderer.render(scene, camera);
            };

            animate();
        });

        // Handle window resize
        window.addEventListener('resize', () => handleResize(renderer, camera));

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', () => handleResize(renderer, camera));
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [handleResize, selectedColor]); // Re-run the effect when selectedColor changes

    return (
        <div className="render-view" ref={mountRef} style={{ position: 'relative' }}>
            {isImageVisible ? (
                <img src={`/path-to-your-image/A.jpg`} alt="A" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, border: '1px solid black' }} />
            ) : null}
            <button onClick={handleClick} style={{ position: 'absolute', top: 0, right: 20, zIndex: 1000, backgroundColor: 'transparent' }}>
                {isImageVisible ? (
                    <svg fill="#000000" width="40px" height="40px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 4.039063 7 0 11.035156 0 16 C 0 20.964844 4.039063 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 C 19.121094 23 16 19.878906 16 16 C 16 12.121094 19.121094 9 23 9 Z" /></svg>)
                    : (
                        <svg fill="#000000" width="40px" height="40px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 8.378906 7 7.773438 7.066406 7.1875 7.1875 C 6.894531 7.246094 6.59375 7.320313 6.3125 7.40625 C 3.792969 8.203125 1.742188 10.085938 0.71875 12.5 C 0.605469 12.769531 0.492188 13.03125 0.40625 13.3125 C 0.136719 14.164063 0 15.058594 0 16 C 0 16.929688 0.144531 17.8125 0.40625 18.65625 C 0.410156 18.664063 0.402344 18.679688 0.40625 18.6875 C 1.203125 21.207031 3.085938 23.257813 5.5 24.28125 C 5.769531 24.394531 6.03125 24.507813 6.3125 24.59375 C 7.164063 24.863281 8.058594 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 9 9 C 12.878906 9 16 12.121094 16 16 C 16 19.878906 12.878906 23 9 23 C 5.121094 23 2 19.878906 2 16 C 2 15.757813 2.007813 15.515625 2.03125 15.28125 C 2.386719 11.742188 5.363281 9 9 9 Z M 14.625 9 L 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 L 14.625 23 C 16.675781 21.347656 18 18.828125 18 16 C 18 13.171875 16.675781 10.652344 14.625 9 Z" /></svg>
                    )}
            </button>
        </div>
    );
};

const RenderWrapper = ({ data }) => {
    const [uiPillo, setUiPillo] = useState(data.DEFAULT);
    const [selection, setSelection] = useState({
        selectedTela: Object.keys(data)[0],
        selectedColor: data[Object.keys(data)[0]][0],
        selectedType: 'Simple Seated Cushion'
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
            <h1 style={{ textAlign: 'center', }}>Fabric Component</h1>
            <div className='d-flex flex-column'>
                {Object.entries(data).map(([key, value]) => {
                    return (
                        <div className='d-flex flex-column'>
                            <div className='render-row ' key={key}>
                                {key}
                            </div>
                            <div className='render-card-container'>
                                {Object.entries(value).sort((a, b) => a[1].localeCompare(b[1])).map(([subKey, subValue]) => {
                                    return (
                                        <div className='render-card'>
                                            <div className='render-hover' style={{ backgroundImage: `url(/telas/${subValue}.jpg)` }} key={subKey}>
                                            </div>
                                            <div className='render-subvalue'>
                                                {subValue.replace(/-/g, ' ')}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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
        B: 'How Does It Work?',
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
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <RenderWrapper data={pillowDataConfig} />
            <RenderBar data={pillowDataConfig} />
        </div>
    )
}
