import { ThemeProvider, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#f50057" },
    secondary: { main: "#f50057" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#222222", secondary: "#555555" },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#e0e0e0",
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

