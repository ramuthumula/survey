import "../App.css";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import UserHome from "./UserHome";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AdminHome, { View, Analytics } from "./AdminHome";
import AddQuestion from "./AddQuestion";
import Edit from "./Edit";
import Confirmation from "./Confirmation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/UserHome" element={<UserHome />} />
          <Route path="/AdminHome" element={<AdminHome />}>
            <Route path="/AdminHome" element={<View />} />
            <Route path="/AdminHome/Analytics" element={<Analytics />} />
          </Route>
          <Route path="/AddQuestion" element={<AddQuestion />} />
          <Route path="AdminHome/Edit/:id" element={<Edit />} />
          <Route path="/Confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Layout() {
  return (
    <div>
      <div>
        <center>
          <br />
          <br />
          <h3 style={{ color: "red" }}>e-Survey Application</h3>
        </center>
      </div>
      <div className="container">
        <div className="position-absolute mid-center">
          <button className="btn btn-dark" style={{ width: "250px" }}>
            <Link to="/UserLogin" className="link">
              User Login
            </Link>
          </button>{" "}
          <br />
          <br />
          <button className="btn btn-secondary" style={{ width: "250px" }}>
            <Link to="/AdminLogin" className="link">
              Admin Login
            </Link>
          </button>{" "}
          <br />
          <br />
          <button className="btn btn-info" style={{ width: "250px" }}>
            <Link to="UserRegistration" className="link">
              Click here for New Registration
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
