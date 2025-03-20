import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./routes/auth/layout";
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import WithAuth from "./components/withAuth";
import DashboardLayout from "./routes/dashboard/layout";
import HomePage from "./routes/home";
import { setNavigate } from "./lib/navigation";
import DashboardHome from "./routes/dashboard";
import DashboardProviders from "./routes/dashboard/providers";
import DashboardViewProvider from "./routes/dashboard/providers/view";
import DashboardProvidersLayout from "./routes/dashboard/providers/layout";
import DashboardAddProvider from "./routes/dashboard/providers/add";
import DashboardEditProvider from "./routes/dashboard/providers/edit";
import DashboardApiIndex from "./routes/dashboard/api";
import DashboardAddApi from "./routes/dashboard/api/add";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<WithAuth />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="providers" element={<DashboardProvidersLayout />}>
            <Route index element={<DashboardProviders />} />
            <Route path="add" element={<DashboardAddProvider />} />
            <Route path=":id" element={<DashboardViewProvider />} />
            <Route path=":id/edit" element={<DashboardEditProvider />} />
          </Route>
          <Route path="api">
            <Route index element={<DashboardApiIndex />} />
            <Route path="add" element={<DashboardAddApi />} />
          </Route>
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
