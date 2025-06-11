import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";

const agregadosDetalle = [
  {
    agregado: "Arenilla",
    descripcion: "Partículas muy finas, más fina que la arena gruesa",
    tamano: "0.075 - 1",
    uso: "Morteros, acabados finos, mezclas especiales",
    caracteristicas:
      "Granulometría fina, mejora cohesión y acabado, absorción moderada",
  },
  {
    agregado: "Arena fina",
    descripcion: "Material granular fino proveniente de ríos o minas",
    tamano: "0.075 - 4",
    uso: "Morteros, hormigón, rellenos",
    caracteristicas: "Buena plasticidad, baja absorción",
  },
  {
    agregado: "Grava natural",
    descripcion: "Fragmentos redondeados de rocas, provenientes de ríos",
    tamano: "4 - 25",
    uso: "Hormigón estructural, drenajes",
    caracteristicas: "Forma redondeada, buen compactado, baja absorción",
  },
  {
    agregado: "Ripio",
    descripcion: "Material granular entre arena y grava",
    tamano: "4 - 10",
    uso: "Bases, mezclas de concreto",
    caracteristicas: "Mezcla fina gruesa, buen soporte, drenaje medio",
  },
  {
    agregado: "Piedra chancada",
    descripcion: "Fragmentos angulares por trituración mecánica",
    tamano: "9 - 38",
    uso: "Hormigón, bases de caminos",
    caracteristicas: "Angular, alta resistencia mecánica, buena adherencia",
  },
  {
    agregado: "Piedra manzana",
    descripcion: "Rocas medianas a grandes, típicamente redondeadas",
    tamano: "25 - 100",
    uso: "Bases, rellenos y muros",
    caracteristicas: "Gran tamaño, buena estabilidad, peso alto",
  },
  {
    agregado: "Caliza triturada",
    descripcion: "Roca sedimentaria molida o triturada",
    tamano: "Variable",
    uso: "Agregado para concreto y cemento",
    caracteristicas: "Alta dureza, buena resistencia química",
  },
  {
    agregado: "Basalto triturado",
    descripcion: "Roca ígnea volcánica triturada",
    tamano: "Variable",
    uso: "Pavimentos y hormigones",
    caracteristicas: "Muy dura, alta durabilidad, buen agarre",
  },
];

export default function TablaAgregados() {
  return (
    <Paper sx={{ mt: 4, p: 3, overflowX: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Detalle de Tipos de Agregados
      </Typography>
      <Table size="small" aria-label="tabla de agregados">
        <TableHead>
          <TableRow>
            <TableCell><strong>Agregado</strong></TableCell>
            <TableCell><strong>Descripción</strong></TableCell>
            <TableCell><strong>Tamaño típico (mm)</strong></TableCell>
            <TableCell><strong>Uso común</strong></TableCell>
            <TableCell><strong>Características principales</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agregadosDetalle.map((row) => (
            <TableRow key={row.agregado}>
              <TableCell><strong>{row.agregado}</strong></TableCell>
              <TableCell>{row.descripcion}</TableCell>
              <TableCell>{row.tamano}</TableCell>
              <TableCell>{row.uso}</TableCell>
              <TableCell>{row.caracteristicas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
