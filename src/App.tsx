import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider  from "./contexts/authContext";

export default function App() {
  return (
    <div>
      <AuthProvider>
              <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}