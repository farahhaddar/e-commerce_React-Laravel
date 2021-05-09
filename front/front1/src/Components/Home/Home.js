import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Home.css";

const token = localStorage.getItem("token");

const Home = (props) => {
  const [empCount, setEmpCount] = useState("");
  const [projectCount, setProjectCount] = useState("");
  const [teamCount, setTeamCount] = useState("");
  const [roleCount, setRoleCount] = useState("");
  const [userCount, setUserCount] = useState("");
  const [kpiCount, setKpiCount] = useState("");
  const image = "https://placekitten.com/220/130";
  useEffect(() => {
    props.title("Dashboard");
  }, []);

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/employees", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setEmpCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/users", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setUserCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/projects", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setProjectCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/teams", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setTeamCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/roles", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setRoleCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/kpis", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setKpiCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="card">
          <Link className="home-link" to="/manageAdmins">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src="./admin.png" />
              </div>
              <div className="count">
                <div className="category">
                  <span>Admins</span>
                  <div className="number">
                    <span>{userCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/manageEmployees">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src="./employee.jpg" />
              </div>
              <div className="count">
                <div className="category">
                  <span>Employees</span>
                  <div className="number">
                    <span>{empCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/Projects">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src="./project.png" />
              </div>
              <div className="count">
                <div className="category">
                  <span>Projects</span>
                  <div className="number">
                    <span>{projectCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/Teams">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src="./team.jpg" />
              </div>
              <div className="count">
                <div className="category">
                  <span>Teams</span>
                  <div className="number">
                    <span>{teamCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/Roles">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src="./role.png" />
              </div>
              <div className="count">
                <div className="category">
                  <span>Roles</span>
                  <div className="number">
                    <span>{roleCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/Kpis">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src="./kpi.jpg" />
              </div>
              <div className="count">
                <div className="category">
                  <span>kpis</span>
                  <div className="number">
                    <span>{kpiCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
