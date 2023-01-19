import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firedb from "../Firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [data, setdata] = useState({});
  const { id } = useParams();
  useEffect(() => {
    firedb.child(`Consulations/${id}`).on("value", (snapshot) => {
      setdata(snapshot.val());
    });
  }, [id]);
  const handler = (e) => {
    e.preventDefault();
    firedb
      .child(`Consulations/${id}`)
      .set(data)
      .then(() => toast.success("Updated Sucessfully"))
      .catch((err) => {
        toast.warn("error in updating");
      });
  };
  const questionhandler = (e) => {
    setdata({ ...data, question: e.target.value });
  };
  const option1handler = (e) => {
    setdata({ ...data, option1: e.target.value });
  };
  const option2handler = (e) => {
    setdata({ ...data, option2: e.target.value });
  };
  const option3handler = (e) => {
    setdata({ ...data, option3: e.target.value });
  };
  const [status, setstatus] = useState("false");
  useEffect(() => {
    setstatus(localStorage.getItem("adminlogin"));
  }, []);
  return status === "true" ? (
    <div>
      {data.count1 === 0 && data.count2 === 0 && data.count3 === 0 ? (
        <div className="reg_form" style={{ height: "480px" }}>
          <form onSubmit={handler}>
            <center>
              <h4>Edit Question</h4>
              <br />
            </center>
            <div className="form-group">
              <label for="question">Question</label>
              <input
                type="text"
                value={data.question}
                onChange={questionhandler}
                name="question"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="option1">Option 1. </label>
              <input
                type="text"
                value={data.option1}
                onChange={option1handler}
                name="option1"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="option2">Option 2. </label>
              <input
                type="text"
                value={data.option2}
                onChange={option2handler}
                name="option2"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="option3">Option 3. </label>
              <input
                type="text"
                value={data.option3}
                onChange={option3handler}
                name="option3"
                className="form-control"
              />
            </div>{" "}
            <br />
            <div>
              <center>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <br />
                <Link to="/AdminHome" style={{ textDecoration: "none" }}>
                  Back to Home Page
                </Link>
              </center>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ marginTop: "20%" }}>
          <center>
            <h3 style={{ color: "red" }}>
              You cannot edit this question, because this question is answered
              by one or more users..!
            </h3>
            <br />
            <span style={{ font: "20px solid black" }}>Click here to -</span>
            <Link to="/AdminHome" style={{ textDecoration: "none" }}>
              Back to Home Page
            </Link>
          </center>
        </div>
      )}
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
export default Edit;
