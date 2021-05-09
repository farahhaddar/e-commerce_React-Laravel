import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const token = localStorage.getItem("token");
class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kpisd: "",
      rows: 10,
    };
  }
  componentDidMount() {
    this.props.title("Graph");
    const { fromNotifications } = this.props.location.state;
    fetch(
      "http://localhost:8000/api/kpisd/" +
        this.state.rows +
        "?page=1&kpiId=" +
        fromNotifications,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
  }
  render() {
    let array = [];
    if (this.state.kpisd.data != undefined) {
      console.log(this.state.kpisd.data);
      for (let i = 0; i < this.state.kpisd.data.length; i++) {
        let k = i + 1;
        array.push({ x: k, y: this.state.kpisd.data[i].level });
      }
    }
    console.log(array);
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "KPI Graph",
      },
      axisY: {
        // title: "Bounce Rate",
        title: "Kpi Level",
        includeZero: false,
        // suffix: "%",
      },
      axisX: {
        // title: "Week of Year",
        title: "Progress",
        // prefix: "W",
        prefix: "K",
        // interval: 2,
        interval: 1,
      },
      data: [
        {
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: array,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default LineChart;
