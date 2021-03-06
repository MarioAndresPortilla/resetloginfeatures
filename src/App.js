import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
} from "react-router-dom";
import Userfront from "@userfront/react";
import buttonSyles from './buttonStyles.module.css';


Userfront.init("demo1234");

const SignupForm = Userfront.build({
    toolId: "nkmbbm",
});
const LoginForm = Userfront.build({
    toolId: "alnkkd",
});
const PasswordResetForm = Userfront.build({
    toolId: "dkbmmo",
});

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/reset">Reset</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset" element={<PasswordReset />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <SignupForm />
        </div>
    );
}

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
}

function PasswordReset() {
    return (
        <div>
            <h1 className={buttonSyles.darkgreen}>Password Reset</h1>
            <button className={buttonSyles.darkgreen}>Services Provided By CacheMoney</button>
            <PasswordResetForm />
        </div>
    );
}

function Dashboard() {
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>{userData}</pre>
            <button onClick={Userfront.logout}>Logout</button>
        </div>
    );
}

function RequireAuth({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
        // Redirect to the /login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
