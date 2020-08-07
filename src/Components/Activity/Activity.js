import React, { Component } from "react";
import WorkerList from "../Resources/Workers";
import "./Activity.css";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import ActivitiesRow from "./ActivitiesRow";

registerLocale("es", es);

class Update extends Component {
  constructor() {
    super();
    this.state = {
      workerList: WorkerList,
      dniToFind: "",
      workerFound: [],
      vulnerable: "none",
      patientList: [],
      contactList: [],
      contactAdd: "",
      startDate: new Date(),
      activityType: "",
      tableArray: [],
    };
    this.getDNI = this.getDNI.bind(this);
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  componentDidMount() {
    const button = document.getElementById("button__patient--add");
    button.disabled = true;
  }
  getDNI(event) {
    this.setState({ dniToFind: event.target.value });
  }
  render() {
    const setStyle = () => {
      if (!document.getElementById("navlink-3")) {
      } else {
        const navs = document.getElementsByClassName("navlink");
        for (let i = 0; i < navs.length; i++) {
          navs[i].style.color = "#214f88";
          navs[i].style.backgroundColor = "transparent";
          navs[i].querySelector("object").style.filter =
            "invert(21%) sepia(82%) saturate(1130%) hue-rotate(189deg) brightness(94%) contrast(86%)";
          navs[i].querySelector("h3").style.color = "#214f88";
        }
        const nav = document.getElementById("navlink-3");
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
        menuLinks[2].querySelector("a").style.textDecoration = "underline";
      }
    };
    setStyle();
    const findPatient = () => {
      const foundPatient = this.state.workerList.find(
        (item) => item.dni == this.state.dniToFind
      );
      if (typeof foundPatient === "object") {
        const button = document.getElementById("button__patient--add");
        this.setState({ workerFound: foundPatient });
        const foundInList = this.state.patientList.find(
          (item) => foundPatient.dni == item.dni
        );
        if (typeof foundInList === "undefined") {
          button.disabled = false;
          button.classList.remove("button--disabled");
        } else {
          button.disabled = true;
          button.classList.add("button--disabled");
        }
        this.setState({ tableArray: foundPatient.activities });
      } else {
        alert(
          `No se ha encontrado al colaborador con DNI:${this.state.dniToFind}`
        );
      }
    };
    const setActivityType = (event) => {
      const selectActivity = document.getElementById("select--activity");
      const selectLocation = document.getElementById("select--location");
      const selectResult = document.getElementById("select--result");
      const selectedOption =
        selectActivity.options[selectActivity.selectedIndex].value;

      this.setState({ activityType: selectedOption });
    };
    const displaySelectLocation = () => {
      if (this.state.activityType == 1) {
        return (
          <div className="add--location">
            <h3 className="add--label">Ubicación:</h3>
            <div className="select__container">
              <select className="add--select" id="select--location">
                <option value="0">Seleccionar</option>
                <option value="1">UBICACIÓN 1</option>
                <option value="2">UBICACIÓN 2</option>
                <option value="3">UBICACIÓN 3</option>
              </select>
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
        );
      }
    };

    const addActivity = () => {
      var newDate = this.state.startDate;
      const actualDate = new Date();

      const properActualDate = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        actualDate.getDate()
      );
      const newProperDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
      );

      if (newProperDate > properActualDate) {
        alert(
          `La fecha especificada es posterior a la fecha actual. Por favor, elija una fecha anterior o equivalente a la actual.`
        );
        return null;
      }

      var properDate =
        ("0" + newDate.getDate()).slice(-2) +
        "-" +
        ("0" + (newDate.getMonth() + 1)).slice(-2) +
        "-" +
        newDate.getFullYear();

      const activitySelect = document.getElementById("select--activity");
      const activityValue =
        activitySelect.options[activitySelect.selectedIndex].text;
      var locationSelect = [];
      var locationValue = "";
      var resultSelect = "";
      var resultValue = "";
      if (this.state.activityType == 1) {
        locationSelect = document.getElementById("select--location");
        locationValue =
          locationSelect.options[locationSelect.selectedIndex].value;
        if (locationValue == 1) {
          locationValue = "UBICACIÓN 1";
        } else if (locationValue == 2) {
          locationValue = "UBICACIÓN 2";
        } else if (locationValue == 3) {
          locationValue = "UBICACIÓN 3";
        }
      } else if (this.state.activityType == 7 || this.state.activityType == 8) {
        resultSelect = document.getElementById("select--result");
        resultValue = resultSelect.options[resultSelect.selectedIndex].value;
        if (resultValue == 1) {
          resultValue = "POSITIVO";
        } else if (resultValue == 2) {
          resultValue = "NEGATIVO";
        }
      }
      const foundContact = this.state.workerList.find(
        (item) => item.name == this.state.workerFound.name
      );
      if (typeof foundContact === "undefined") {
        return alert(
          "Por favor seleccione a qué colaborador desea asignar la actividad."
        );
      }
      const activityList = foundContact.activities;
      var newActivity = {};
      if (this.state.activityType == 1) {
        newActivity = {
          date: properDate,
          type: activityValue,
          location: locationValue,
        };
      } else if (this.state.activityType == 7 || this.state.activityType == 8) {
        newActivity = {
          date: properDate,
          type: activityValue,
          result: resultValue,
        };
      } else {
        newActivity = { date: properDate, type: activityValue };
      }
      var checkDuplicates = false;
      foundContact.activities.map((item) => {
        if (item.date === newActivity.date && item.type === newActivity.type) {
          checkDuplicates = true;
        }
      });

      if (checkDuplicates === true) {
        return alert(
          "El colaborador ya presenta la actividad registrada en el mismo día."
        );
      }
      const patientActivities = foundContact.activities;
      const newPatientActivities = patientActivities.concat(newActivity);

      foundContact.activities = newPatientActivities;
      const patientIndex = foundContact.id;
      const copyWorkerList = this.state.workerList;
      copyWorkerList[patientIndex - 1] = foundContact;
      this.setState({ workerList: copyWorkerList });

      var newList = foundContact.activities;

      this.setState({ tableArray: newList });
    };
    const displaySelectResult = () => {
      if (this.state.activityType == 7 || this.state.activityType == 8) {
        return (
          <div className="add--location">
            <h3 className="add--label">Resultado:</h3>
            <div className="select__container">
              <select className="add--select" id="select--result">
                <option value="0">Seleccionar</option>
                <option value="1">POSITIVO</option>
                <option value="2">NEGATIVO</option>
              </select>
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
        );
      }
    };

    const activityTable = () => {
      return this.state.tableArray.map((item, index) => (
        <ActivitiesRow
          key={index}
          number={index}
          date={item.date}
          activity={item.type}
          location={item.location}
          result={item.result}
          handler={RemoveRow}
        />
      ));
    };
    const RemoveRow = (event) => {
      var newList = this.state.tableArray;
      newList.splice(event.target.id, 1);
      this.setState({ tableArray: newList });
    };

    return (
      <div className="activity__container">
        <h2 className="patient__header">Registro actividades</h2>
        <div className="patient__search">
          <div className="search__header">Panel de Búsqueda</div>
          <div className="search__container">
            <div className="search__finder">
              <h3 className="search__label">DNI: </h3>
              <input
                type="text"
                className="patient__inputtext"
                onChange={this.getDNI}
              ></input>
              <button
                className="finder--button"
                onClick={findPatient}
                type="button"
              >
                <i className="fa fa-search" aria-hidden="true"></i>Buscar
              </button>
            </div>
            <div className="search__data">
              <h3 className="search__label">Nombre:</h3>
              <h3 className="search__textbox">{this.state.workerFound.name}</h3>
            </div>
            <div className="search__data">
              <h3 className="search__label">Unidad:</h3>
              <h3 className="search__textbox">{this.state.workerFound.unit}</h3>
            </div>
            <div className="search__data">
              <h3 className="search__label">Área:</h3>
              <h3 className="search__textbox">{this.state.workerFound.area}</h3>
            </div>
            <div className="search__data">
              <h3 className="search__label">Puesto:</h3>
              <h3 className="search__textbox">
                {this.state.workerFound.position}
              </h3>
            </div>
            <div className="search__data">
              <h3 className="search__label">Tipo de empleado:</h3>
              <h3 className="search__textbox">{this.state.workerFound.type}</h3>
            </div>
          </div>
        </div>
        <div className="activity__add">
          <div className="search__header">Relación de actividades:</div>
          <div className="add__container">
            <div className="add--date">
              <h3 className="add--label">Fecha:</h3>
              <div className="add--calendar">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <DatePicker
                  locale="es"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  dateFormat="dd/MM/yyyy"
                />
                <i className="fa fa-angle-down"></i>
              </div>
            </div>
            <div className="add--search">
              <h3 className="add--label">Actividad:</h3>
              <div className="select__container">
                <select
                  className="add--select"
                  onChange={setActivityType}
                  id="select--activity"
                >
                  <option value="0">Seleccionar</option>
                  <option value="1">AISLAMIENTO U.M</option>
                  <option value="2">AISLAMIENTO CASA</option>
                  <option value="3">AISLAMIENTO HOTEL</option>
                  <option value="4">HOSPITALIZACIÓN</option>
                  <option value="5">UCI</option>
                  <option value="6">VENTILADOR MECÁNICO</option>
                  <option value="7">PRUEBA RÁPIDA</option>
                  <option value="8">PRUEBA MOLECULAR</option>
                  <option value="9">ALTA MÉDICA</option>
                  <option value="10">ALTA EPIDEMIOLÓGICA</option>
                  <option value="11">FALLECIMIENTO</option>
                </select>
                <i className="fa fa-angle-down"></i>
              </div>
            </div>
            {displaySelectLocation()}
            {displaySelectResult()}
            <button
              className="add--button button--disabled"
              id="button__patient--add"
              onClick={addActivity}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
              <h3>Adicionar</h3>
            </button>
          </div>
        </div>

        <div className="patient__browsecontacts">
          <div className="browse__container">
            <table className="contacts__table">
              <tbody>
                <tr className="table__header"></tr>
                {activityTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
