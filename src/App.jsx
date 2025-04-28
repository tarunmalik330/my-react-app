import "./App.css";
import ChildComponent from "./components/ChildComponent";
import AppProvider from "./context/AppContext";
import Navbar from "./components/Navbar";
import ArrayTask from "./components/ArrayTask";

function App() {
  return (
    <>
      {/* <div>
        <p className="underline text-red">hlo</p>
      </div> */}
      <AppProvider>
        <Navbar />
        <ChildComponent />
      </AppProvider>
      <ArrayTask />
    </>
  );
}

export default App;
