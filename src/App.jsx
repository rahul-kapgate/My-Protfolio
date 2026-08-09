import "./App.css";
import "./assets/fonts/fonts.css";
import Home from "./Pages/Home.jsx";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Home />
      </HelmetProvider>
    </>
  );
}

export default App;
