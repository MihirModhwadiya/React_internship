import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div className="mt-3 position-relative">
      <div className="btn-group d-flex justify-content-center p-3">
        <input
          className="form-control shadow-none rounded-end-0"
          type="text"
          placeholder="Search"
        />
        <button className="btn btn-light">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <ul className="list-group p-1">
        <a className="btn rounded-0 border-1 list-group-item bg-transparent text-light">
          Mihir
        </a>
        <a className="btn rounded-0 border-1 list-group-item bg-transparent text-light">
          Chintan
        </a>
        <a className="btn rounded-0 border-1 list-group-item bg-transparent text-light">
          Shubham
        </a>
      </ul>
    </div>
  );
};

export default SideBar;
