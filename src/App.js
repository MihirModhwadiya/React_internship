import "./App.css";
import Header from "./mycomp/Header/Header";
import Chat from "./mycomp/Main/Chat/Chat";
import SideBar from "./mycomp/Main/SideBar/SideBar";

function App() {
  return (
    <body className="d-flex">
      <div className="collapse sidebar" id="collapseExample">
        <SideBar />
      </div>
      <main className="main position-relative">
        <div className="header">
          <Header />
        </div>
        <div className="chat">
          <Chat />
        </div>
      </main>
    </body>
  );
}

export default App;
