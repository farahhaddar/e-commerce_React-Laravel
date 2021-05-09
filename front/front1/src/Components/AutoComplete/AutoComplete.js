import React from "react";
import "./AutoComplete.css";
class AutoComplete extends React.Component {
  state = {
    input: "",
    searchTeam: "",
    teams: "",
  };
  select(e, q) {
    document.getElementById("search0").setAttribute("data", e);
    document.getElementById("search0").value = q;
    this.setState({ teams: "" });

    // alert(document.getElementById("search0").getAttribute("data"));
  }
  searchTeam() {
    // alert(this.state.searchTeam);

    fetch("http://localhost:8000/api/teams/7?name=" + this.state.searchTeam)
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
  }
  componentDidMount() {
    var search0 = document.getElementById("search0");
    search0.addEventListener("input", (event) => {
      this.setState({ searchTeam: search0.value });
      this.searchTeam();
    });
  }

  render() {
    let teams = [];
    if (this.state.teams != "") {
      console.log(this.state.teams.data[0]);
      for (let i = 0; i < this.state.teams.data.length; i++) {
        teams.push(
          <div
            onClick={() => {
              this.select(
                this.state.teams.data[i].id,
                this.state.teams.data[i].name
              );
            }}
            className="chooseTeam"
          >
            {this.state.teams.data[i].name}
          </div>
        );
      }
    }
    console.log(this.state.teams);
    return (
      <div className="App">
        <div>
          <div>
            <input id="search0" aria-invalid="false" type="text" />
          </div>
          <div id="chooseTeamList" className="chooseTeamList">
            {teams}
          </div>
        </div>
      </div>
    );
  }
}
export default AutoComplete;
