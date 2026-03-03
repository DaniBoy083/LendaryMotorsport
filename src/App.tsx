import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "./contexts/authContext";
import { register } from "swiper/element/bundle";
import { Toaster } from "react-hot-toast";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Register Swiper custom elements
register();

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}