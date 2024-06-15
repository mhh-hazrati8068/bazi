import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UnityGame from "./unity";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoutes";

const msRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/game",
    element: <PrivateRoute element={<UnityGame />} />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function MyRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={msRouter} />
    </AuthProvider>
  );
}
