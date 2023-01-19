import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firedb from "../Firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import "../App.css";

function AdminHome() {
  const [status, setstatus] = useState("false");
  useEffect(() => {
    setstatus(localStorage.getItem("adminlogin"));
  }, []);
  return status === "true" ? (
    <div>
      <div id="nav">
        <nav>
          <ul>
            <li className="nav_li">
              <Link to="/AdminHome" className="link">
                View Questions
              </Link>
            </li>
            <li className="nav_li">
              <Link to="/AdminHome/Analytics" className="link">
                Analytics
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => {
            localStorage.setItem("adminlogin", "false");
            setstatus("false");
          }}
          style={{
            marginTop: "15px",
            marginRight: "20px",
            position: "absolute",
            top: "0",
            right: "0",
          }}
        >
          Logout
        </button>
        <br />
      </div>
      <div>
        <Outlet />
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
}

const Analytics = () => {
  const [data, setdata] = useState({});
  const [List, setList] = useState([]);
  useEffect(() => {
    firedb.child("Consulations").on("value", (snapshot) => {
      setdata(snapshot.val());
    });
  }, []);

  useEffect(() => {
    setList([]);
    Object.keys(data).map((id) => {
      setList((prevList) => [
        ...prevList,
        {
          Question: data[id].question,
          Option_1: data[id].count1,
          Option_2: data[id].count2,
          Option_3: data[id].count3,
        },
      ]);
    });
  }, [data]);
  return (
    <div className="row">
      <center>
        <h2 style={{ color: "red" }}>Analytics</h2>
        <h4 style={{ color: "blue" }}>tabular View</h4>
      </center>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col" colspan="2">
                Option1
              </th>
              <th scope="col" colspan="2">
                Option2
              </th>
              <th scope="col" colspan="2">
                Option3
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? Object.keys(data).map((id, index) => {
                  let sum = data[id].count1 + data[id].count2 + data[id].count3;

                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data[id].question}</td>
                      <td>{data[id].option1}</td>
                      <td>
                        {parseFloat((data[id].count1 / sum) * 100).toFixed(2)} %
                      </td>
                      <td>{data[id].option2}</td>
                      <td>
                        {parseFloat((data[id].count2 / sum) * 100).toFixed(2)} %
                      </td>
                      <td>{data[id].option3}</td>
                      <td>
                        {parseFloat((data[id].count3 / sum) * 100).toFixed(2)} %
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <center>
          <br />
          <h4 style={{ color: "blue" }}>Bar Graph</h4>
          <br />
        </center>
        <BarChart
          width={700}
          height={400}
          data={List}
          margin={{
            top: 40,
            right: 40,
            left: 40,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Question" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Option_1" fill="#8884d8" />
          <Bar dataKey="Option_2" fill="#82ca9d" />
          <Bar dataKey="Option_3" fill="#ffc658" />
        </BarChart>{" "}
        <br />
        <center>
          <br />
          <h4 style={{ color: "blue" }}>Area Graph</h4>
          <br />
        </center>
        <AreaChart
          width={700}
          height={550}
          data={List}
          margin={{
            top: 40,
            right: 40,
            left: 40,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Question" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Option_1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="Option_2"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="Option_3"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </div>
    </div>
  );
};

const View = () => {
  const Navigate = useNavigate();
  const [data, setdata] = useState({});
  useEffect(() => {
    firedb.child("Consulations").on("value", (snapshot) => {
      setdata(snapshot.val());
    });
  }, []);
  const Delete = (id, count1, count2, count3) => {
    if (count1 > 0 || count2 > 0 || count3 > 0) {
      toast.warn(
        "you cannot delete this question because this question is answered by more than one user"
      );
    } else {
      if (window.confirm("Do you want to delete this question")) {
        firedb.child(`Consulations/${id}`).remove();
      }
    }
  };
  return (
    <div className="row" style={{ marginTop: "35px", marginBottom: "35px" }}>
      <div className="col md-4"></div>
      <div className="col md-4">
        <center>
          <h2>List of Questions</h2>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              Navigate("/AddQuestion");
            }}
          >
            Create New Question
          </button>
        </center>{" "}
        <br />
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
                    <div className="card-text">a) {data[id].option1}</div>
                    <br />
                    <div className="card-text">b) {data[id].option2}</div>
                    <br />
                    <div className="card-text">c) {data[id].option3}</div>
                    <br />
                    <center>
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            Delete(
                              id,
                              data[id].count1,
                              data[id].count2,
                              data[id].count3
                            );
                          }}
                        >
                          Delete
                        </button>{" "}
                        &nbsp;&nbsp;
                        <Link to={`Edit/${id}`} className="btn btn-info">
                          Edit
                        </Link>
                      </div>
                    </center>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="col md-4"></div>
    </div>
  );
};

export default AdminHome;
export { View };
export { Analytics };
