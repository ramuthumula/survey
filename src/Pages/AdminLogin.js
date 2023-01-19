import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import firedb from "../Firebase";
import { sha512 } from "./sha512";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [admin, setadmin] = useState({});
  const [cred, setcred] = useState({
    email: "",
    password: "",
  });
  const { email, password } = { ...cred };
  const ChangeHandler = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    toast.warn("Username:admin@shangrila.gov.un \nPassword : shangrila@2021$")
    firedb.child("Admin").on("value", (snapshot) => {
      setadmin(snapshot.val());
    });
  }, []);
  const handler = (e) => {
    e.preventDefault();
    sha512(password).then((x) => {
      if (
        email === admin["-MtX5CecQdtkCWhoJLEp"].email &&
        x === admin["-MtX5CecQdtkCWhoJLEp"].password
      ) {
        toast.success("logged In sucessfully");
        localStorage.setItem("adminlogin", "true");
        navigate("/AdminHome");
      } else {
        toast.warn("Invalid Credentials");
      }
    });
  };
  return (
    <div style={{backgroundColor:"DodgerBlue", height: '100vh', minHeight : '100vh'}}>
    <div className="reg_form" style={{ height: "350px", backgroundColor:"white"}}>
        <center>
          {" "}
          <h5>Admin Login</h5>
        </center>
        <br />
        <form onSubmit={handler}>
          <div className="form-group">
            <label for="Email">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={ChangeHandler}
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
              name="password"
              value={password}
              onChange={ChangeHandler}
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
          </center>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
