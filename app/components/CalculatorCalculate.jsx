const json = {
    "Precio bombona euros/kg": 1,
    "Precio luz euros/kw": 0.12,
    "Huella carbono bombona kg/h": 3,
    "Huella carbono luz kg/h": 0.5,
    "Consumo Warme kw/h": 0.04,
    "Consumo bombona kg/h": 1,
    "Consumo estufa electrica kw/h": 1.5
}

// { text: 'Cuantas estufas tienes', min: 1, max: 20, value: 1, desc: '', step: 1 },
// { text: 'Cuantas estufas electricas tienes', min: 1, max: 20, value: 1, desc: '', step: 10 },
// { text: 'Cuantas sillas tienes en la terraza', min: 1, max: 100, value: 1, desc: '', step: 1 },
// { text: 'Cuantas horas al dia abres la terraza', min: 4, max: 12, value: 4, desc: '', step: 1 },

export function calculateHuellaCo2(questionInput, type) {
    if (type == 'tradicional') {
       const diario =  (questionInput[3].value * questionInput[0].value * json["Huella carbono bombona kg/h"]) + (questionInput[3].value * questionInput[1].value * json["Huella carbono luz kg/h"] *json["Consumo estufa electrica kw/h"])
       return diario * 20
    }
    else if (type == "warme"){
        const diario = questionInput[3].value * questionInput[2].value * json["Huella carbono luz kg/h"] * json["Consumo Warme kw/h"]
        return diario * 20

    }
    return null
}