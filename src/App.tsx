import useRouteElements from "./useRouteElements";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const routeElements = useRouteElements();
  return (
    <div>
      {routeElements}
      <ToastContainer hideProgressBar autoClose={1000} />
    </div>
  );
}

export default App;
