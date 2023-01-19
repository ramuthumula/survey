import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firedb from "../Firebase";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { useNavigate } from "react-router";
const UserHome = () => {
  const History = useNavigate();
  const [Loggin, setLoggin] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggin(1);
      } else {
        setLoggin(0);
      }
    });
  }, []);
  const [data, setdata] = useState({});
  const [refdata, setrefdata] = useState({});
  useEffect(() => {
    firedb.child("Consulations").on("value", (snapshot) => {
      setdata(snapshot.val());
      setrefdata(snapshot.val());
    });
  }, []);
  const handler = (abc, count) => {
    const { question, option1, count1, option2, count2, option3, count3 } =
      data[abc];
    switch (count) {
      case "count1": {
        setdata({ ...data, [abc]: { ...refdata[abc], count1: count1 + 1 } });
        break;
      }
      case "count2": {
        setdata({ ...data, [abc]: { ...refdata[abc], count2: count2 + 1 } });
        break;
      }
      case "count3": {
        setdata({ ...data, [abc]: { ...refdata[abc], count3: count3 + 1 } });
        break;
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    firedb
      .child("Consulations")
      .set(data)
      .then(() => {
        toast.success("Survery Submitted sucessfully");
        History("/Confirmation");
        auth.signOut();
      })
      .catch(() => {
        toast.warn("Error in Submitting Survery");
      });
  };
  return Loggin ? (
    <div style={{ backgroundColor: "#D5F5E3" }} className="row">
      <div className="col md-4"></div>
      <div className="col md-4" style={{ marginTop: "35px", marginBottom: "35px" }}>
        <center>
          <h3 style={{ color: "red" }}>E Survery Questions</h3>
        </center>
        <br />
        <form onSubmit={submitHandler}>
          {data
            ? Object.keys(data).map((id, index) => {
                return (
                  <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body">
                      <div className="card-title">
                        <span>{index + 1}. </span>
                        {data[id].question}
                      </div>
                      <br />
                      <div className="card-text">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            onClick={() => handler(id, "count1")}
                            value="option1"
                            name={index}
                            id={id}
                            required
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            {data[id].option1}
                          </label>
                        </div>
                      </div>
                      <br />
                      <div className="card-text">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            onClick={() => handler(id, "count2")}
                            value="option2"
                            name={index}
                            id={id}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            {data[id].option2}
                          </label>
                        </div>
                      </div>
                      <br />
                      <div className="card-text">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            onClick={() => handler(id, "count3")}
                            value="option3"
                            name={index}
                            id={id}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            {data[id].option3}
                          </label>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                );
              })
            : null}{" "}
          <br />
          <center>
            <button className="btn btn-primary">Submit</button>
          </center>
        </form>
      </div>
      <div className="col md-4">
        <button
          onClick={() => {
            auth.signOut();
          }}
          className="btn btn-info"
          style={{
            marginTop: "15px",
            marginRight: "20px",
            position: "absolute",
            top: "0",
            right: "0",
          }}
        >
          signOut
        </button>
      </div>
    </div>
  ) : (
    <center>
      <h1>Session Expired</h1>
      <br />
      Please click here for HomePage{" "}
      <Link to="/" style={{ TextDecoder: "none" }}>
        Home Page
      </Link>
    </center>
  );
};

export default UserHome;
