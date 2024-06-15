import "./Dashboard.css";
import { getTest } from "../../services/psyTest";

const Dashboard = () => {
  return (
    <div className="app-dashboard">
      <div className="content">
        <div className="tools">
          <div className="tool-1" onClick={getTest}>
            {" "}
            <p>استعداد ریاست جمهوری</p>
          </div>
          <div className="tool-2">
            <p>بازی کابینه ریاست جمهوری</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
