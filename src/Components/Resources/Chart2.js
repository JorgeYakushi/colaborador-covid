import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
class Chart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const chartData = {
      labels: [
        "Internado",
        "UCI",
        "Ventilador mecánico",
        // "Prueba rápida",
        // "Prueba molecular",
        // "Alta médica",
        // "Alta epidemiológica",
        // "Fallecimiento",
      ],
      datasets: [
        {
          label: "Colaboradores",
          data: [
            this.props.data.hosp.Int,
            this.props.data.hosp.UCI,
            this.props.data.hosp.Vent,
          ],
          fill: true,
          backgroundColor: ["#4F97A3", "#89CFF0", "#003152"],
        },
      ],
    };
    const chartOptions = {
      title: {
        display: true,
        text:
          "Colaboradores en hospitalización: " +
          (this.props.data.hosp.Int +
            this.props.data.hosp.UCI +
            this.props.data.hosp.Vent),
        fontColor: "#06174e",
        fontSize: 16,
      },
      maintainAspectRatio: false,
      legend: {
        labels: { fontColor: "#06174e" },
        display: true,
        position: "left",
      },
      plugins: {
        datalabels: {
          display: true,
          color: "white",
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
    };
    return (
      <div className="chart">
        <Pie height="150px" data={chartData} options={chartOptions} />
      </div>
    );
  }
}

export default Chart2;
