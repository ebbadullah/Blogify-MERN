import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./Routes/Index";
import { fetchUserData } from "./redux/auth/authSlice";
import "./index.css";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <Router>
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