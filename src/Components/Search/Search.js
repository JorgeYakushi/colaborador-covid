import React, { Component } from "react";
import Regions from "../Resources/Regions";
import Hotels from "../Resources/Hotels";
import Estados from "../Resources/Estados";
import Campañas from "../Resources/Campañas";
import Workers from "../Resources/Workers";
import Areas from "../Resources/Areas";
import Units from "../Resources/Units";
import WorkerRow from "./WorkerRow";
import Chart from "../Resources/Chart";
import Chart2 from "../Resources/Chart2";
import Chart3 from "../Resources/Chart3";
import Chart4 from "../Resources/Chart4";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Data from "../Resources/ChartData.js";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "./Search.css";
registerLocale("es", es);
const mapStateToProps = (state) => ({
  workerList: state.storeData.workerList,
});

class Search extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      regionList: Regions,
      hotelList: Hotels,
      statusList: Estados,
      campaignsList: Campañas,
      workerList: Workers,
      unitList: Units,
      areaList: Areas,
      selectedUnit: 0,
      selectedArea: 0,
      selectedActivity: 0,
      startDate: new Date(),
      endDate: new Date(),
      chartData: Data,
      displayData: {
        aislamiento: { UM: 0, Casa: 0, Hotel: 0 },
        hosp: { Int: 0, UCI: 0, Vent: 0 },
        pruebas: {
          RapPos: 0,
          RapNeg: 0,
          MolPos: 0,
          MolNeg: 0,
        },
        otros: { AltaMed: 0, AltaEp: 0, Fallecimiento: 0 },
      },
      chartIndex: 0,
    };
    this.handleRegionSelector = this.handleRegionSelector.bind(this);
    this.filterData = this.filterData.bind(this);
  }
  handleChangeStart = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleChangeEnd = (date) => {
    this.setState({
      endDate: date,
    });
  };
  handleRegionSelector(event) {
    if (event.target.id === "unitSelector") {
      this.setState({ selectedUnit: event.target.value });
    } else if (event.target.id === "areaSelector") {
      this.setState({ selectedArea: event.target.value });
    } else if (event.target.id === "activitySelector") {
      this.setState({ selectedActivity: event.target.value });
    }
  }

  filterData = () => {
    const indexActivity = parseInt(this.state.selectedActivity);
    const indexArea = parseInt(this.state.selectedArea);
    const indexUnit = parseInt(this.state.selectedUnit);
    const properStartDate = new Date(
      this.state.startDate.getFullYear(),
      this.state.startDate.getMonth(),
      this.state.startDate.getDate()
    );
    const properEndDate = new Date(
      this.state.endDate.getFullYear(),
      this.state.endDate.getMonth(),
      this.state.endDate.getDate()
    );
    if (properStartDate > properEndDate) {
      return alert("La Fecha Inicio es posterior a la Fecha Fin.");
    }
    let aisUM = 0;
    let aisCasa = 0;
    let aisHotel = 0;
    let hospInt = 0;
    let hospUCI = 0;
    let hospVent = 0;
    let rapPos = 0;
    let rapNeg = 0;
    let molPos = 0;
    let molNeg = 0;
    let altMed = 0;
    let altEp = 0;
    let fall = 0;
    const arrData = this.state.chartData;

    for (let i = 0; i < arrData.length; i++) {}
    arrData.map((item) => {
      if (
        new Date(item.Date) >= properStartDate &&
        new Date(item.Date) <= properEndDate
      ) {
        if (
          (indexArea === 0 && indexUnit === 0) ||
          (indexArea === 0 && indexUnit === item.Unit) ||
          (indexArea === item.Area && indexUnit === 0) ||
          (indexArea === item.Area && indexUnit === item.Unit)
        ) {
          switch (item.Type) {
            case 1:
              aisUM++;
              break;
            case 2:
              aisCasa++;
              break;
            case 3:
              aisHotel++;
              break;
            case 4:
              hospInt++;
              break;
            case 5:
              hospUCI++;
              break;
            case 6:
              hospVent++;
              break;
            case 7:
              if (item.Result === "TRUE") {
                rapPos++;
              } else {
                rapNeg++;
              }
              break;
            case 8:
              if (item.Result === "TRUE") {
                molPos++;
              } else {
                molNeg++;
              }
              break;
            case 9:
              altMed++;
              break;
            case 10:
              altEp++;
              break;
            case 11:
              fall++;
              break;
          }
        }
      }
    });
    var newList = {
      aislamiento: { UM: aisUM, Casa: aisCasa, Hotel: aisHotel },
      hosp: { Int: hospInt, UCI: hospUCI, Vent: hospVent },
      pruebas: {
        RapPos: rapPos,
        RapNeg: rapNeg,
        MolPos: molPos,
        MolNeg: molNeg,
      },
      otros: { AltaMed: altMed, AltaEp: altEp, Fallecimiento: fall },
    };

    this.setState({ displayData: newList });

    switch (indexActivity) {
      case 1:
        const sumAisl =
          newList.aislamiento.UM +
          newList.aislamiento.Casa +
          newList.aislamiento.Hotel;
        if (sumAisl === 0) {
          this.setState({ chartIndex: 0 });
          alert("No se encontraron registros según los criterios filtrados.");
        } else {
          this.setState({ chartIndex: 1 });
        }
        break;
      case 2:
        const sumHosp = newList.hosp.Int + newList.hosp.UCI + newList.hosp.Vent;
        if (sumHosp === 0) {
          this.setState({ chartIndex: 0 });
          alert("No se encontraron registros según los criterios filtrados.");
        } else {
          this.setState({ chartIndex: 2 });
        }
        break;
      case 3:
        const sumPruebas =
          newList.pruebas.RapPos +
          newList.pruebas.RapNeg +
          newList.pruebas.MolPos +
          newList.pruebas.MolNeg;
        if (sumPruebas === 0) {
          this.setState({ chartIndex: 0 });
          alert("No se encontraron registros según los criterios filtrados.");
        } else {
          this.setState({ chartIndex: 3 });
        }
        break;
      case 4:
        const sumOtros =
          newList.otros.AltaMed +
          newList.otros.AltaEp +
          newList.otros.Fallecimiento;
        if (sumOtros === 0) {
          this.setState({ chartIndex: 0 });
          alert("No se encontraron registros según los criterios filtrados.");
        } else {
          this.setState({ chartIndex: 4 });
        }
        break;
    }
  };

  componentDidMount() {
    this.filterData();
    this.setState({ selectedActivity: 1 });
  }

  render() {
    const showCharts = () => {
      if (this.state.chartIndex == 1) {
        return (
          <div>
            <Chart data={this.state.displayData} />
          </div>
        );
      } else if (this.state.chartIndex == 2) {
        return (
          <div>
            <Chart2 data={this.state.displayData} />
          </div>
        );
      } else if (this.state.chartIndex == 3) {
        return (
          <div>
            <Chart3 data={this.state.displayData} />
          </div>
        );
      } else if (this.state.chartIndex == 4) {
        return (
          <div>
            <Chart4 data={this.state.displayData} />
          </div>
        );
      } else {
        return null;
      }
    };

    const setStyle = () => {
      if (!document.getElementById("navlink-4")) {
      } else {
        const navs = document.getElementsByClassName("navlink");
        for (let i = 0; i < navs.length; i++) {
          navs[i].style.color = "#214f88";
          navs[i].style.backgroundColor = "transparent";
          navs[i].querySelector("object").style.filter =
            "invert(21%) sepia(82%) saturate(1130%) hue-rotate(189deg) brightness(94%) contrast(86%)";
          navs[i].querySelector("h3").style.color = "#214f88";
        }
        const nav = document.getElementById("navlink-4");
        nav.style.color = "#FFFFFF";
        nav.style.backgroundColor = "#214f88";
        const obj = nav.querySelector("object");
        const text = nav.querySelector("h3");
        obj.style.filter =
          "invert(100%) sepia(70%) saturate(0%) hue-rotate(322deg) brightness(112%) contrast(101%)";
        text.style.color = "white";

        const navBar = document.getElementsByClassName("header__list")[0];
        const menuLinks = navBar.querySelectorAll("li");
        for (let i = 0; i < menuLinks.length; i++) {
          menuLinks[i].querySelector("a").style.textDecoration = "none";
        }
        menuLinks[3].querySelector("a").style.textDecoration = "underline";
      }
    };
    setStyle();
    const unitSelector = this.state.unitList.map((item, index) => (
      <option key={index} value={index + 1}>
        {item}
      </option>
    ));

    const areaSelector = this.state.areaList.map((item, index) => (
      <option key={index} value={index + 1}>
        {item}
      </option>
    ));

    const statusSelector = this.state.statusList.map((item, index) => (
      <option key={index} value={index + 1}>
        {item}
      </option>
    ));

    const workerTable = this.props.workerList.map((item) => (
      <WorkerRow
        key={item.id}
        name={item.name}
        unit={item.region}
        dni={item.dni}
        hotel={item.hotel}
        status={item.status}
        campaign={item.campaign}
        selectedRegion={this.state.selectedRegion}
        selectedHotel={this.state.selectedHotel}
        selectedStatus={this.state.selectedStatus}
        selectedCampaign={this.state.selectedCampaign}
      ></WorkerRow>
    ));
    return (
      <div className="report__container">
        <div className="report__header">
          <h2>Generar Reporte</h2>
        </div>
        <div className="search__header">Panel de filtros</div>
        <div className="search__manager">
          <div className="selector__container">
            <h3>Unidad:</h3>
            <div className="select__container">
              <select onChange={this.handleRegionSelector} id="unitSelector">
                <option value={0}>Todas las unidades</option>
                {unitSelector}
              </select>
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="selector__container">
            <h3>Área:</h3>
            <div className="select__container">
              <select onChange={this.handleRegionSelector} id="areaSelector">
                <option value={0}>Todas las áreas</option>
                {areaSelector}
              </select>
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="selector__container">
            <h3>Estado:</h3>
            <div className="select__container">
              <select
                onChange={this.handleRegionSelector}
                id="activitySelector"
              >
                {statusSelector}
              </select>
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="selector__container add--date">
            <h3 className="add--label">Fecha Inicio:</h3>
            <div className="add--calendar">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <DatePicker
                locale="es"
                selected={this.state.startDate}
                onChange={this.handleChangeStart}
              />
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="selector__container add--date">
            <h3 className="add--label">Fecha Fin:</h3>
            <div className="add--calendar">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <DatePicker
                locale="es"
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
        </div>
        <div className="chart__container">
          <button className="add--button" onClick={this.filterData}>
            Generar gráficos
          </button>
          {showCharts()}
          {/* <div className="report__generate">
            <button className="generate--button">
              <i class="fa fa-table" aria-hidden="true"></i>
              <h3>Crear Reporte</h3>
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
Search = connect(mapStateToProps)(Search);
export default Search;
