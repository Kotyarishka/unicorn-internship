import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./routes/auth/layout";
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import WithAuth from "./components/withAuth";
import DashboardLayout from "./routes/dashboard/layout";
import HomePage from "./routes/home";
import { setNavigate } from "./lib/navigation";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<WithAuth />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<p>home page?</p>} />
          <Route path="settings" element={<p>settings</p>} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
