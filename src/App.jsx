import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registation from "./pages/Registation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Msg from "./pages/Msg"
import RootLayouts from "./components/RootLayouts";
import Notification from "./pages/Notification";
import Setting from "./pages/Setting";
import Logout from "./pages/Logout";

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
        path="/"
        element={<Registation/>}
        ></Route>
        <Route
        path="/login"
        element={<Login/>}
        ></Route>
        <Route
        path="/logout"
        element={<Logout/>}
        ></Route>
        <Route
        path="/page"
        element={<RootLayouts/>}
        >
          <Route
          path="home"
          element={<Home/>}
          ></Route>
          <Route
          path="msg"
          element={<Msg/>}
          ></Route>
          <Route
          path="notification"
          element={<Notification/>}
          ></Route>
          <Route
          path="setting"
          element={<Setting/>}
          ></Route>

        </Route>
      </Route>
    )
  );
  
  

  return (
    <>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <RouterProvider router={router} />
    </>
  )
}

export default App
