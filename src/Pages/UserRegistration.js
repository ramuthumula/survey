import axios from "axios";
import { useEffect, useState } from "react";
import firedb from "../Firebase";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { sha512 } from "./sha512";
toast.configure();
const initialstate = {
  Email: "",
  FullName: "",
  DOB: "",
  Address: "",
  Password: "",
  Confirm_Password: "",
  SIN_Number: "",
};

const UserRegistration = () => {
  let error = 0;
  const SIN_Register = [
    "MM2874Z6",
    "FEQQ6UUG",
    "34GC829B",
    "CB8FBCCM",
    "CB923FCC",
    "CM2432F3",
    "D01F93CG",
    "M2946EBG",
    "MKD453DF",
    "MN453X0G",
  ];
  const [RegistrationData, SetRegistrationData] = useState({});
  const [data, setdata] = useState(initialstate);
  const {
    Email,
    FullName,
    DOB,
    Address,
    Password,
    Confirm_Password,
    SIN_Number,
  } = { ...data };
  const onchange_handler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    toast.warn(" valid SIN Numbers : \nMM2874Z6,FEQQ6UUG,\nCB8FBCCM,CB923FCC,\nCM2432F3,D01F93CG,\nM2946EBG,MKD453DF,\nMN453X0G,34GC829B");
    firedb.child("Registration").on("value", (snapshot) => {
      SetRegistrationData(snapshot.val());
    });
  }, []);
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (Password === Confirm_Password) {
      if (SIN_Number.length === 8) {
        if (Password.length >= 8) {
          if (SIN_Register.includes(SIN_Number)) {
            Object.keys(RegistrationData).filter((id) => {
              if (RegistrationData[id].SIN == SIN_Number) {
                error = 1;
              }
            });
          } else {
            error = 2;
          }
          if (error === 1) {
            toast.warn("SIN Number is Already Exist Database");
          } else if (error === 2) {
            toast.warn("Invalid SIN Number");
          } else {
            sha512(Password).then((val) => {
              setdata({ ...data, Password: val, Confirm_Password: val });
              auth
                .createUserWithEmailAndPassword(Email, val)
                .then((user) => {
                  firedb.child("Registration").push({
                    Email: Email,
                    FullName: FullName,
                    DOB: DOB,
                    Address: Address,
                    SIN: SIN_Number,
                  });
                  toast.success("User Created Sucessfully");
                })
                .catch((err) => {
                  if (err) {
                    toast.warn(
                      "Please use other username, already user exist with this username"
                    );
                  }
                });
            });
          }
        } else {
          toast.warn("Password should be atleast 8 Characters");
        }
      } else {
        toast.warn("Invalid SIN Number, SIN Number should be 8 characters");
      }
    } else {
      toast.warn("Password didn't matched");
    }
  };
  return (
    <div style={{backgroundColor:"DodgerBlue", height: '100vh', minHeight : '100vh'}}>
    <div className="reg_form" style={{ height: "650px", backgroundColor:"white", borderRadius:"4px" }}>
      <center>
        {" "}
        <h5>User Registration</h5>
      </center>
      <br />
      <form onSubmit={SubmitHandler}>
        <div className="form-group">
          <label for="Email">Email address</label>
          <input
            type="email"
            name="Email"
            value={Email}
            onChange={onchange_handler}
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label for="Full_Name">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={FullName}
            onChange={onchange_handler}
            className="form-control"
            id="Full_Name"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label for="Date">Date Of Birth</label>
          <input
            type="date"
            name="DOB"
            value={DOB}
            onChange={onchange_handler}
            className="form-control"
            id="Date"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label for="Address">Address</label>
          <input
            type="text"
            name="Address"
            value={Address}
            onChange={onchange_handler}
            className="form-control"
            id="Address"
            placeholder="Enter Address"
            required
          />
        </div>
        <div className="form-group">
          <label for="Password">Password</label>
          <input
            type="password"
            name="Password"
            value={Password}
            onChange={onchange_handler}
            className="form-control"
            id="Password"
            placeholder="Password"
            required
          />
          <label for="Cnfm_Password">Confirm Password</label>
          <input
            type="password"
            name="Confirm_Password"
            value={Confirm_Password}
            onChange={onchange_handler}
            className="form-control"
            id="Cnfm_Password"
            placeholder="Confirm-Password"
            required
          />
        </div>
        <div className="form-group">
          <label for="SIN">SIN Number</label>
          <input
            type="text"
            name="SIN_Number"
            value={SIN_Number}
            onChange={onchange_handler}
            className="form-control"
            id="SIN"
            placeholder="Enter SIN Number"
            required
          />
        </div>
        <br />
        <center>
          {" "}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <br />
          <Link to="/UserLogin" style={{ textDecoration: "none" }}>
            {" "}
            Login
          </Link>
        </center>
      </form>
    </div>
    </div>
  );
};

export default UserRegistration;
