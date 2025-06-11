export const mezclas = {
  "1:2:3": { cemento: 300, arena: 600, grava: 900, agua: 150, descripcion: "Dosificación básica empírica usada para hormigón simple." },
  "H-140": { cemento: 300, arena: 780, grava: 1170, agua: 180, descripcion: "Hormigón pobre para limpieza o relleno." },
  "1:2:3.5 [Tipo A] 210": { cemento: 350, arena: 700, grava: 1225, agua: 175, descripcion: "Hormigón estructural de resistencia 210 kg/cm². Tamaño máximo de agregado 1'' " },
  "1:2:4   [Tipo B] 180": { cemento: 300, arena: 600, grava: 1200, agua: 165, descripcion: "Hormigón de resistencia 180 kg/cm². Tamaño máximo de agregado 1.5'' " },
  "1:3:4   [Tipo C] 160": { cemento: 265, arena: 795, grava: 1060, agua: 159, descripcion: "Hormigón de resistencia 160 kg/cm². Tamaño máximo de agregado 1.5'' " },

  "1:3:5 [Hormigon Pobre] 14MPa": { cemento: 235, arena: 705, grava: 1175, agua: 165, descripcion: "Hormigón pobre para limpieza o relleno de resistencia 14 MPa." },
};

export const equivalencias = {
  bolsa: 50, // kg
  balde: 18, // litros
  carretilla: 60, // litros
  pala: 5, // litros
  densidad: {
    cemento: 1.44, // kg/L
    arena: 1.6,
    grava: 1.5,
    agua: 1.0,
  }
};

export const agregados = [
  {
    nombre: "Arenilla",
    descripcion: "Partículas muy finas, más fina que la arena gruesa",
    tamaño: "0.075 - 1",
    uso: "Morteros, acabados finos, mezclas especiales",
    caracteristicas:
      "Granulometría fina, mejora cohesión y acabado, absorción moderada",
  },
  {
    nombre: "Arena fina",
    descripcion: "Material granular fino proveniente de ríos o minas",
    tamaño: "0.075 - 2",
    uso: "Morteros, hormigón, rellenos",
    caracteristicas: "Buena plasticidad, baja absorción",
  },
    {
    nombre: "Arena",
    descripcion: "Material granular fino proveniente de ríos o minas",
    tamaño: "0.075 - 4",
    uso: "Morteros, hormigón, rellenos",
    caracteristicas: "Buena plasticidad, baja absorción",
  },
  {
    nombre: "Arena chancada",
    descripcion: "Material fino resultante de la trituración mecánica de rocas",
    tamaño: "0.075 - 5",
    uso: "Hormigón estructural, concreto de alta resistencia",
    caracteristicas: "Forma angular, alta adherencia, mayor rugosidad superficial",
  },
  {
    nombre: "Gravilla de 0.5 pulg",
    descripcion: "Agregado grueso con tamaño nominal máximo de 1/2 pulgada",
    tamaño: "9 - 12",
    uso: "Hormigón fino, prefabricados, elementos decorativos",
    caracteristicas: "Forma angular o redondeada, buena distribución en mezcla, alta resistencia",
  },
  {
    nombre: "Grava",
    descripcion: "Fragmentos redondeados de rocas, provenientes de ríos",
    tamaño: "4 - 25",
    uso: "Hormigón estructural, drenajes",
    caracteristicas: "Forma redondeada, buen compactado, baja absorción.",
  },
   {
    nombre: "Grava de 1 pulg",
    descripcion: "Agregado grueso con tamaño máximo nominal de 1 pulgada",
    tamaño: "20 - 25",
    uso: "Hormigón estructural, columnas, losas y cimentaciones",
    caracteristicas: "Forma semi-angular, buena resistencia, compactación eficiente",
  }, 
  {
    nombre: "Ripio",
    descripcion: "Material granular entre arena y grava",
    tamaño: "4 - 10",
    uso: "Bases, mezclas de concreto",
    caracteristicas: "Mezcla fina gruesa, buen soporte, drenaje medio.",
  },
  {
    nombre: "Piedra chancada",
    descripcion: "Fragmentos angulares por trituración mecánica",
    tamaño: "9 - 38",
    uso: "Hormigón, bases de caminos",
    caracteristicas: "Angular, alta resistencia mecánica, buena adherencia.",
  },
  {
    nombre: "Piedra manzana",
    descripcion: "Rocas medianas a grandes, típicamente redondeadas",
    tamaño: "25 - 100",
    uso: "Bases, rellenos y muros",
    caracteristicas: "Gran tamaño, buena estabilidad, peso alto.",
  },
  {
    nombre: "Caliza triturada",
    descripcion: "Roca sedimentaria molida o triturada",
    tamaño: "Variable",
    uso: "Agregado para concreto y cemento",
    caracteristicas: "Alta dureza, buena resistencia química.",
  },
  {
    nombre: "Basalto triturado",
    descripcion: "Roca ígnea volcánica triturada",
    tamaño: "Variable",
    uso: "Pavimentos y hormigones",
    caracteristicas: "Muy dura, alta durabilidad, buen agarre.",
  },
    {
    nombre: "Cascote 0.5",
    descripcion: "Fragmentos grandes de roca o concreto, tamaño máximo 1 1/2 pulgadas",
    tamaño: "30 - 38",
    uso: "Rellenos estructurales, subbases, fundaciones",
    caracteristicas: "Tamaño grueso, buena estabilidad, uso estructural",
  },
  {
    nombre: "Cascote 0.75",
    descripcion: "Fragmentos gruesos de roca triturada o demolida, tamaño máximo 2 3/4 pulgadas",
    tamaño: "50 - 70",
    uso: "Bases de vías, rellenos compactados, estructuras de soporte",
    caracteristicas: "Gran tamaño, alta capacidad de carga, resistente a deformaciones",
  }
];
