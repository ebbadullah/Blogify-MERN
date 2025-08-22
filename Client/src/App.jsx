import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./Routes/Index";
import "./index.css";
import AuthBootstrap from "./Components/Auth/AuthBootstrap";

function App() {
    return (
        <Router>
            <AuthBootstrap />
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: { background: "#333", color: "#fff" },
                    success: { style: { background: "#22c55e" } },
                    error: { style: { background: "#ef4444" } },
                }} 
            />
            <AppRoutes />
        </Router>
    );
}

export default App;