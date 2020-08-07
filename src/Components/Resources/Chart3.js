import React, { Component } from "react";
import { Bar, Line, HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
class Chart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const chartData = {
      labels: ["Rápidas", "Moleculares"],
      datasets: [
        {
          stack: "pruebas",
          label: "Positivas",
          data: [
            this.props.data.pruebas.RapPos,
            this.props.data.pruebas.MolPos,
          ],
          fill: true,
          backgroundColor: ["#4F97A3", "#4F97A3"],
        },
        {
          stack: "pruebas",
          label: "Negativas",
          data: [
            this.props.data.pruebas.RapNeg,
            this.props.data.pruebas.MolNeg,
          ],
          fill: true,
          backgroundColor: ["#003152", "#003152"],
        },
      ],
    };
    const chartOptions = {
      title: {
        display: true,
        text:
          "Total de pruebas: " +
          (this.props.data.pruebas.RapPos +
            this.props.data.pruebas.RapNeg +
            this.props.data.pruebas.MolPos +
            this.props.data.pruebas.MolNeg),
        fontColor: "#06174e",
        fontSize: 16,
      },
      maintainAspectRatio: false,
      legend: {
        labels: { fontColor: "#06174e" },
        display: true,
        position: "bottom",
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
        <HorizontalBar height="200px" data={chartData} options={chartOptions} />
      </div>
    );
  }
}

export default Chart2;
