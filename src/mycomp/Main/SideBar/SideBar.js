import "./SideBar.css";

const SideBar = () => {
  return (
    <nav id="sidebarMenu" className="sidebar">
      <div className="position-sticky">
        <div className="list-group list-group-flush">
          <div className="search text-center btn-group mx-3 mt-3">
            <input
              type="text"
              placeholder="Search"
              className="form-control shadow-none"
            />
          </div>

          <div className="mt-4 mx-1">
            <button className="list-group-item list-group-item-action py-2 ripple">
              <span>Mihir</span>
            </button>
            <button className="list-group-item list-group-item-action py-2 ripple">
              <span>Chintan</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
