import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "./contexts/authContext";
import { register } from "swiper/element/bundle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

register();

export default function App() {
  return (
    <div>
      <AuthProvider>
              <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}