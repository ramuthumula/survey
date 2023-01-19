import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { sha512 } from "./sha512";

const UserLogin = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const { Email, Password } = { ...user };
  const handler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit_handler = (e) => {
    e.preventDefault();
    sha512(Password).then((x) => {
      auth
        .signInWithEmailAndPassword(Email, x)
        .then((user) => {
          toast.success("Logged In sucessfully");
          history("/UserHome");
        })
        .catch((err) => {
          console.log(err);
          toast.warn("Invalid Credentials");
        });
    });
  };
  return (
    <div style={{backgroundColor:"DodgerBlue", height: '100vh', minHeight : '100vh'}}>
      <div className="reg_form" style={{ height: "400px", backgroundColor:"white", borderRadius:"4px"}}>
        <center>
          {" "}
          <h5>User Login</h5>
        </center>
        <br />
        <form onSubmit={submit_handler}>
          <div className="form-group">
            <label for="Email">Email address</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              value={Email}
              onChange={handler}
              id="Email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label for="Password">Password</label>
            <input
              type="password"
              className="form-control"
              name="Password"
              value={Password}
              onChange={handler}
              id="Password"
              placeholder="Password"
            />
          </div>
          <br />
          <center>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "150px", borderRadius: "15px" }}
            >
              Login
            </button>
            <br />
            <br />
            <Link to="/UserRegistration" style={{ textDecoration: "none" }}>
              SignUp
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
};
export default UserLogin;
