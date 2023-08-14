import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faChartLine,
  faChartPie,
  faGlobe,
  faSearch,
  faTachometerAltAverage,
} from "@fortawesome/free-solid-svg-icons";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";

const SideBar = () => {
  return (
    <nav id="sidebarMenu" classNameNameName="sidebar">
      <div className="position-sticky">
        <div className="list-group list-group-flush">
          <div classNameName="search text-center btn-group mx-3">
            <input
              type="text"
              placeholder="Search"
              classNameName="form-control border-1 border-black"
            />
            {/* <button classNameName="btn btn-primary rounded-0"><FontAwesomeIcon icon={faSearch}/></button> */}
          </div>

          <div classNameName="mt-4 mx-1">
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
