// src/components/Home.jsx
import {
  Box,
  Typography,
  MenuItem,
  Select,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Tooltip as MuiTooltip
} from "@mui/material";
import { useState, useEffect } from "react";
import { mezclas, equivalencias, agregados } from "../data/mezclas";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Legend, 
  LabelList 
} from "recharts";
import {
  Brightness4,
  Brightness7,
  Save,
  Bookmark,
  AttachMoney,
  Info,
  Close
} from "@mui/icons-material";

function calcularDosificacion(tipo, volumenM3) {
  const mezcla = mezclas[tipo];
  const densidad = equivalencias.densidad;
  const materiales = {};

  for (const mat in mezcla) {
    if (mat === "descripcion") continue;
    const kgTotales = mezcla[mat] * volumenM3;
    const volumenL = kgTotales / densidad[mat];

    materiales[mat] = {
      kg: kgTotales,
      bolsas: mat === "cemento" ? kgTotales / equivalencias.bolsa : 0,
      baldes: volumenL / equivalencias.balde,
      carretillas: volumenL / equivalencias.carretilla,
      palas: volumenL / equivalencias.pala,
    };
  }

  return materiales;
}

export default function Home() {
  const [tipo, setTipo] = useState("1:2:3");
  const [volumen, setVolumen] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [precios, setPrecios] = useState({
    cemento: 0,
    arena: 0,
    grava: 0,
    agua: 0
  });
  const [openCostDialog, setOpenCostDialog] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [openSavedDialog, setOpenSavedDialog] = useState(false);
  const [openAggregateInfo, setOpenAggregateInfo] = useState(null);

  const materiales = calcularDosificacion(tipo, volumen);
  const descripcion = mezclas[tipo].descripcion;

  const chartData = Object.entries(materiales).map(([mat, vals]) => ({
    material: mat.toUpperCase(),
    kg: Number(vals.kg.toFixed(1)),
  }));

  const calcularCostoTotal = () => {
    return Object.entries(materiales).reduce((total, [mat, vals]) => {
      return total + (precios[mat] || 0) * vals.kg;
    }, 0);
  };

  const guardarCalculo = () => {
    const nuevoCalculo = {
      id: Date.now(),
      tipo,
      volumen,
      fecha: new Date().toLocaleString(),
      materiales: {...materiales},
      costo: calcularCostoTotal()
    };
    
    setSavedCalculations([...savedCalculations, nuevoCalculo]);
    localStorage.setItem('savedCalculations', JSON.stringify([...savedCalculations, nuevoCalculo]));
  };

  useEffect(() => {
    const saved = localStorage.getItem('savedCalculations');
    if (saved) {
      setSavedCalculations(JSON.parse(saved));
    }
  }, []);

  const eliminarCalculo = (id) => {
    const nuevosCalculos = savedCalculations.filter(c => c.id !== id);
    setSavedCalculations(nuevosCalculos);
    localStorage.setItem('savedCalculations', JSON.stringify(nuevosCalculos));
  };

  return (
    <Box component="main" p={{ xs: 1.5, sm: 2 }} sx={{ 
      backgroundColor: darkMode ? "#121212" : "#f9f9fb", 
      minHeight: "100vh",
      color: darkMode ? "#ffffff" : "inherit"
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Paper elevation={2} sx={{ p: { xs: 1.5, sm: 2 }, flexGrow: 1, mr: 2, backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontSize: { xs: "1.8rem", sm: "2.125rem" } }}>
            Calculadora de Dosificación de Hormigón 📊
          </Typography>
<Typography variant="subtitle1" sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)" }}>
  Seleccione el tipo de mezcla y volumen a preparar.
</Typography>
        </Paper>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MuiTooltip title="Modo oscuro/claro">
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </MuiTooltip>
          
          <MuiTooltip title="Guardar cálculo actual">
            <IconButton onClick={guardarCalculo} color="primary">
              <Save />
            </IconButton>
          </MuiTooltip>
          
          <MuiTooltip title="Cálculos guardados">
            <IconButton onClick={() => setOpenSavedDialog(true)} color="secondary">
              <Bookmark />
            </IconButton>
          </MuiTooltip>
        </Box>
      </Box>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: darkMode ? " #1e1e1e" : "#ffffff" }}>
            <Typography variant="h6" color="primary">
              Tipo de Hormigón
            </Typography>
            <Select 
              fullWidth 
              value={tipo} 
              onChange={(e) => setTipo(e.target.value)} 
              sx={{ mt: 1 , color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)"}}
              MenuProps={{ sx: { maxHeight: 400, color: darkMode ? "rgba(255, 255, 255, 0.9)" : "rgb(73, 73, 73)"} }}
            >
              {Object.keys(mezclas).map((k) => (
                <MenuItem key={k} value={k}>
                  {k}
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: darkMode ? " #1e1e1e" : "#ffffff" ,
          border: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)",
          color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)"}}>
            <Typography variant="h6">
              Volumen en m³
            </Typography>
            <TextField 
              fullWidth
              type="number"
              inputMode="decimal"
              value={volumen}
              onChange={(e) => setVolumen(Number(e.target.value))}
              inputProps={{ min: 0, step: "0.1" }}
               sx={{ 
                mt: 1,
                '& .MuiInputBase-input': {
                  color: darkMode ? "rgba(255, 255, 255, 0.9)" : "inherit" // CAMBIO
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, overflowX: "auto", backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="secondary">
                Resultados de Dosificación
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AttachMoney />}
                onClick={() => setOpenCostDialog(true)}
              >
                Calcular Costo
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: darkMode ? "#333" : "#f0f0f0" }}>
                  {["Material", "Kg", "Bolsas", "Baldes", "Carretillas", "Palas"].map((h) => (
                    <TableCell 
                      key={h} 
                      sx={{ 
                        fontWeight: "bold", 
                        color: darkMode ? "rgba(255, 255, 255, 0.9)" : "inherit",
                        py: { xs: 0.5, sm: 1 },
                        backgroundColor: darkMode ? "#333" : "#f0f0f0"
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody >
                {Object.entries(materiales).map(([mat, vals], idx) => (
                  <TableRow 
                    key={mat} 
                    sx={{ 
                      backgroundColor: idx % 2 === 0 ? 
                        (darkMode ? "#2a2a2a" : "#fafafa") : 
                        (darkMode ? "#1e1e1e" : "#fff") 
                    }}
                  >
                    <TableCell sx={{ 
                        color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", 
                      }}  
                    >{mat.toUpperCase()}</TableCell>
                    <TableCell sx={{ 
                        color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", 
                      }}  
                      >{vals.kg.toFixed(1)}</TableCell>
                    <TableCell sx={{ 
                        color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", 
                      }} 
                      >{mat === "cemento" ? vals.bolsas.toFixed(2) : "-"}</TableCell>
                    <TableCell sx={{ 
                        color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", 
                      }}  
                    >{vals.baldes.toFixed(1)}</TableCell>
                    <TableCell                    sx={{ 
                        color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", 
                      }}  
                      >{vals.carretillas.toFixed(1)}</TableCell>
                    <TableCell                 sx={{ 
                        color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", 
                      }}  
                    >{vals.palas.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" }}>
            <Typography variant="h6" gutterBottom color={darkMode ?   "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)"}>
              📈 Comparativa de Materiales (Kg)
            </Typography>
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={chartData} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="material" stroke={darkMode ? "#ffffff" : "#666"} />
                <YAxis stroke={darkMode ? "#ffffff" : "#666"} />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? "#333" : "#fff",
                    borderColor: darkMode ? "#666" : "#ddd"
                  }} 
                />
                <Legend />
                <Bar dataKey="kg" fill="#1976d2">
                  <LabelList 
                    dataKey="kg" 
                    position="top" 
                    fill={darkMode ? "#ffffff" : "#666"} 
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ 
            p: 2, 
            backgroundColor: darkMode ? "#333" : "#000000",
            border: darkMode ? "1px solid #444" : "#ffffff"
          }}>
  <Typography variant="h6" gutterBottom sx={{ color: "#ffd000" }}>
    📌 Descripción de Mezcla
  </Typography>
  <Typography sx={{ color: darkMode ? "rgba(255, 255, 255, 0.9)" : "#ffffff" }}>
    {descripcion}
  </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" , color: darkMode ? "rgba(255, 255, 255, 0.9)" : "#000"}}>
            <Typography variant="subtitle1" fontWeight="bold">
              Equivalencias usadas:
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6} md={3}>🧱 Bolsa de cemento: 50 kg</Grid>
              <Grid item xs={6} md={3}>🧺 1 balde: 18 L</Grid>
              <Grid item xs={6} md={3}>🛒 1 carretilla: 60 L</Grid>
              <Grid item xs={6} md={3}>🪓 1 pala: 5 L</Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: darkMode ? "rgb(31, 31, 31)" : "#ffffff", color: darkMode ? "rgba(255, 255, 255, 0.9)" : "#000" }}>
            <Typography variant="h6" gutterBottom>
              ⛰️ Tipos de Agregados
            </Typography>
            <Table >
              <TableHead>
                <TableRow sx={{ backgroundColor: darkMode ? " #333" : "#f0f0f0" }}>
                  {["Agregado", "Descripción", "Tamaño (mm)", "Uso común", "Características", ""].map((h) => (
                    <TableCell 
                      key={h} 
                      sx={{ 
                        fontWeight: "bold", 
                        color: darkMode ? "#f0f0f0":"#333" , 
                        py: { xs: 0.5, sm: 1 },
                        backgroundColor: darkMode ? "#333" : "#f0f0f0",
                        borderColor: "#131313"
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {agregados.map((a, idx) => (
                  <TableRow 
                    key={a.nombre} 
                    sx={{ 
                      backgroundColor: idx % 2 === 0 ? 
                        (darkMode ? "#2a2a2a" : " #fafafa") : 
                        (darkMode ? "#000" : "#fff") 
                    }}
                  >
                    <TableCell sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#000000", }}  >  
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar 
                          src={`/Hormigones/images/aggregates/${a.nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                          alt={a.nombre}
                          sx={{ width: 40, height: 40 ,color:"#000000"}}
                        />
                        {a.nombre}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", }}  >{a.descripcion}</TableCell>
                    <TableCell sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", }}>{a.tamaño}</TableCell>
                    <TableCell sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", }}>{a.uso}</TableCell>
                    <TableCell sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgb(73, 73, 73)", }}>
                      {a.caracteristicas.length > 50 ? 
                        `${a.caracteristicas.substring(0, 50)}...` : 
                        a.caracteristicas}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => setOpenAggregateInfo(a)}>
                        <Info color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openCostDialog} onClose={() => setOpenCostDialog(false)}>
        <DialogTitle>Calcular Costo Total</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Ingrese los precios por kg de cada material:
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.keys(materiales).map(mat => (
              <Grid item xs={12} sm={6} key={mat}>
                <TextField
                  fullWidth
                  label={`Precio ${mat} (por kg)`}
                  type="number"
                  inputProps={{ min: 0, step: "0.01" }}
                  value={precios[mat] || ''}
                  onChange={(e) => setPrecios({
                    ...precios,
                    [mat]: parseFloat(e.target.value) || 0
                  })}
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Costo Total Estimado: ${calcularCostoTotal().toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCostDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openSavedDialog} 
        onClose={() => setOpenSavedDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Cálculos Guardados</DialogTitle>
        <DialogContent>
          {savedCalculations.length === 0 ? (
            <Typography sx={{ py: 2 }}>No hay cálculos guardados</Typography>
          ) : (
            <List>
              {savedCalculations.map((calc) => (
                <div key={calc.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        {calc.tipo.substring(0, 1)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Mezcla: ${calc.tipo} - Volumen: ${calc.volumen}m³`}
                      secondary={`${calc.fecha} - Costo: $${calc.costo?.toFixed(2) || 'N/A'}`}
                    />
                    <IconButton edge="end" onClick={() => {
                      setTipo(calc.tipo);
                      setVolumen(calc.volumen);
                      setOpenSavedDialog(false);
                    }}>
                      <Save color="primary" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => eliminarCalculo(calc.id)}>
                      <Close color="error" />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSavedDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={!!openAggregateInfo} 
        onClose={() => setOpenAggregateInfo(null)}
        maxWidth="sm"
        fullWidth
      >
        {openAggregateInfo && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  src={`/Hormigones/images/aggregates/${openAggregateInfo.nombre.toLowerCase().normalize("NFD").replace(/\s+/g, '-')}.jpg`} 
                  sx={{ width: 60, height: 60 }}
                />
                {openAggregateInfo.nombre}
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <img 
                src={`/Hormigones/images/aggregates/${openAggregateInfo.nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                alt={openAggregateInfo.nombre}
                style={{ width: '100%', height: 'auto', borderRadius: 4, marginBottom: 16 }}
              />
              <Typography variant="h6" gutterBottom>Descripción</Typography>
              <Typography paragraph>{openAggregateInfo.descripcion}</Typography>
              
              <Typography variant="h6" gutterBottom>Características</Typography>
              <Typography paragraph>{openAggregateInfo.caracteristicas}</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Tamaño típico:</Typography>
                  <Typography>{openAggregateInfo.tamaño}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Uso común:</Typography>
                  <Typography>{openAggregateInfo.uso}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAggregateInfo(null)}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}