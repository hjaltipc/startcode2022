import "./App.css";
import World from "./World";
import GuiTop from "./components/gui";
import { SocketProvider } from "./SocketProvider";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <GuiTop />
        <World />
      </SocketProvider>
    </div>
  );
}

export default App;
