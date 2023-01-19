import { useState } from "react";
import firedb from "../Firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddQuestion = () => {
  const consulations = {
    question: "",
    option1: "",
    count1: 0,
    option2: "",
    count2: 0,
    option3: "",
    count3: 0,
  };
  const [question, setquestion] = useState(consulations);
  const handler = (e) => {
    e.preventDefault();
    firedb
      .child("Consulations")
      .push(question)
      .then(() => {
        toast.success("Question created sucessfullly");
      })
      .catch((err) => {
        toast.warn("Error in creating Question");
      });
  };

  const questionhandler = (e) => {
    setquestion({ ...question, question: e.target.value });
  };
  const option1handler = (e) => {
    setquestion({ ...question, option1: e.target.value });
  };
  const option2handler = (e) => {
    setquestion({ ...question, option2: e.target.value });
  };
  const option3handler = (e) => {
    setquestion({ ...question, option3: e.target.value });
  };
  return (
    <div className="reg_form" style={{ height: "480px" }}>
      <form onSubmit={handler}>
        <center>
          <h4>Add Question</h4>
          <br />
        </center>
        <div className="form-group">
          <label for="question">Enter Question</label>
          <input
            type="text"
            value={question.question}
            onChange={questionhandler}
            name="question"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label for="option1">Option 1. </label>
          <input
            type="text"
            value={question.option1}
            onChange={option1handler}
            name="option1"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label for="option2">Option 2. </label>
          <input
            type="text"
            value={question.option2}
            onChange={option2handler}
            name="option2"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label for="option3">Option 3. </label>
          <input
            type="text"
            value={question.option3}
            onChange={option3handler}
            name="option3"
            className="form-control"
          />
        </div>
        <br />
        <div>
          <center>
            <button type="submit" className="btn btn-primary">
              create Question
            </button>
            <br />
            <Link to="/AdminHome" style={{ textDecoration: "none" }}>
              Back to Home Page
            </Link>
          </center>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
