import "./App.css";
import Header from "./mycomp/Header/Header";
import Chat from "./mycomp/Main/Chat/Chat";
import SideBar from "./mycomp/Main/SideBar/SideBar";
import Footer from "./mycomp/Footer/Footer";

function App() {
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="chat-container">
        <Chat />
      </div>
    </div>
  );
}

export default App;
