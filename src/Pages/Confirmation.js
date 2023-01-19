import reactDom from "react-dom";
import { Link } from "react-router-dom";
const Confirmation = () => {
  return (
    <div style={{ color: "green", textAlign: "center", marginTop: "250px" }}>
      <h3>You Response Submitted Sucessfully</h3>
      <Link to="/UserLogin" style={{ TextDecoder: "none" }}>
        Login Again
      </Link>
      <br />
      <Link to="/" style={{ TextDecoder: "none" }}>
        Home Page
      </Link>
    </div>
  );
};
export default Confirmation;
