import React, { Component } from "react";
import WorkerList from "../Resources/Workers";
import PatientRow from "./PatientsRow";
import { inputText, storeData } from "../../Redux/Actions";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

const mapDispatchToProps = {
  inputText,
  storeData,
};
const mapStateToProps = (state) => ({
  dniSearch: state.inputText.patient__DNI,
  workerList: state.storeData.workerList,
  foundWorker: state.storeData.foundWorker,
});
class Reports extends Component {
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
      tableArray: [],
    };
    this.getDNI = this.getDNI.bind(this);
  }
  componentDidMount() {
    const button = document.getElementById("button__patient--add");
    button.disabled = true;
    const addButton = document.getElementById("button__contact--add");
    addButton.disabled = true;
  }
  getDNI(event) {
    this.setState({ dniToFind: event.target.value });
  }

  render() {
    const textHandler = (event) => {
      this.props.inputText(event.target.name, event.target.value);
    };
    const setStyle = () => {
      if (!document.getElementById("navlink-2")) {
      } else {
        const navs = document.getElementsByClassName("navlink");
        for (let i = 0; i < navs.length; i++) {
          navs[i].style.color = "#214f88";
          navs[i].style.backgroundColor = "transparent";
          navs[i].querySelector("object").style.filter =
            "invert(21%) sepia(82%) saturate(1130%) hue-rotate(189deg) brightness(94%) contrast(86%)";
          navs[i].querySelector("h3").style.color = "#214f88";
        }
        const nav = document.getElementById("navlink-2");
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
        menuLinks[1].querySelector("a").style.textDecoration = "underline";
      }
    };
    setStyle();

    const findPatient = () => {
      const foundPatient = this.props.workerList.find(
        (item) => item.dni == this.props.dniSearch
      );
      if (typeof foundPatient === "object") {
        const button = document.getElementById("button__patient--add");
        const addButton = document.getElementById("button__contact--add");
        const foundInList = this.state.patientList.find(
          (item) => foundPatient.dni == item.dni
        );
        if (typeof foundInList === "undefined") {
          button.disabled = false;
          button.classList.remove("button--disabled");
          addButton.disabled = false;
          addButton.classList.remove("button--disabled");
        } else {
          button.disabled = true;
          button.classList.add("button--disabled");
          addButton.disabled = true;
          addButton.classList.add("button--disabled");
        }

        var newList = [];
        const supercontactList = foundPatient.contacts.map((item) => {
          const workerContact = this.props.workerList.map((element) => {
            if (item === element.dni) {
              newList.push({
                DNI: element.dni,
                name: element.name,
                unit: element.unit,
                area: element.area,
                position: element.position,
                type: element.type,
                vulnerability: element.vulnerable,
                picture: element.picture,
              });
            }
          });
        });
        this.setState({ workerFound: foundPatient, tableArray: newList });
      } else {
        alert(
          `No se ha encontrado al colaborador con DNI:${this.props.dniSearch}`
        );
      }
    };

    const changeVulnerability = (event) => {
      this.setState({ vulnerable: event.target.value });
    };

    const addPatient = () => {
      if (typeof this.state.workerFound.name === "string") {
        if (this.state.vulnerable === "Sí" || this.state.vulnerable === "No") {
          let copy = Object.assign({}, this.state.workerFound);
          copy.vulnerable = this.state.vulnerable;

          var joined = this.state.patientList.concat(copy);
          // this.setState({ workerFound: copy });
          this.setState({ workerFound: copy, patientList: joined });

          alert(
            `El colaborador ${this.state.workerFound.name} ha sido ingresado a la base.`
          );
          const button = document.getElementById("button__patient--add");
          button.disabled = true;
          button.classList.add("button--disabled");
        } else {
          alert("Por favor indique si el colaborador es vulnerable o no.");
        }
      } else {
        alert("Por favor primero ubique al colaborador que desea ingresar.");
      }
    };

    const contactChange = (event) => {
      this.setState({ contactAdd: event.target.value });
    };

    const addContact = () => {
      const contactSelect = document.querySelector(".dropdown");
      const selectedValue = contactSelect.querySelector(".text").innerHTML;
      if (selectedValue === "Colaborador") {
        return alert(
          "Por favor seleccione a qué colaborador desea asignar el contacto."
        );
      }
      const foundContact = this.props.workerList.find(
        (item) => item.name == this.state.workerFound.name
      );
      if (typeof foundContact === "undefined") {
        return alert(
          "Por favor seleccione a qué colaborador desea asignar el contacto."
        );
      }
      const newContact = this.props.workerList.find(
        (item) => item.name == selectedValue
      );
      const contactList = foundContact.contacts;

      const newContactDNI = newContact.dni;
      const searchDuplicates = contactList.find(
        (item) => item == newContactDNI
      );
      if (typeof searchDuplicates === "undefined") {
        const newContactList = contactList.concat(newContactDNI);

        foundContact.contacts = newContactList;
        const contactIndex = foundContact.id;
        const copyWorkerList = this.props.workerList;

        copyWorkerList[contactIndex - 1] = foundContact;

        this.setState({ workerList: copyWorkerList });

        var newList = [];
        const supercontactList = foundContact.contacts.map((item) => {
          const workerContact = copyWorkerList.map((element) => {
            if (item === element.dni) {
              newList.push({
                DNI: element.dni,
                name: element.name,
                unit: element.unit,
                area: element.area,
                position: element.position,
                type: element.type,
                vulnerability: element.vulnerable,
                picture: element.picture,
              });
            }
          });
        });
        this.setState({ tableArray: newList });
      } else {
        alert(
          "El colaborador ya se encuentra en la lista de contactos del paciente."
        );
      }
    };

    const RemoveRow = (event) => {
      var newList = this.state.tableArray;
      newList.splice(event.target.id, 1);
      this.setState({ tableArray: newList });
    };

    const workerTable = () => {
      return this.state.tableArray.map((item, index) => (
        <PatientRow
          key={index}
          name={item.name}
          area={item.area}
          picture={item.picture}
          handler={RemoveRow}
        />
      ));
    };

    const possibleAdds = this.props.workerList.map((item, index) => {
      if (this.state.workerFound.name != item.name) {
        return <option key={index}>{item.name}</option>;
      }
    });

    const possibleAddsOptions = this.props.workerList.map((item, index) => {
      return { key: index, text: item.name, value: item.dni };
    });

    const handler2 = (e, { text }) => {
      this.setState({ contactAdd: text });
    };

    return (
      <div className="patient__container">
        <h2 className="patient__header">Ingreso pacientes</h2>
        <div className="patient__search">
          <div className="search__header">Panel de Búsqueda</div>
          <div className="search__container">
            <div className="search__finder">
              <h3 className="search__label">DNI: </h3>
              <input
                type="text"
                className="patient__inputtext"
                name={"patient__DNI"}
                // onChange={this.getDNI}
                value={this.props.dniSearch}
                onChange={textHandler}
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
            <div className="search__data">
              <h3 className="search__label">¿Vulnerable?:</h3>
              <div className="search__radio">
                <input
                  type="radio"
                  name="vulnerability"
                  value="Sí"
                  onChange={changeVulnerability}
                ></input>
                <h3>Sí</h3>
              </div>
              <div className="search__radio">
                <input
                  type="radio"
                  name="vulnerability"
                  value="No"
                  onChange={changeVulnerability}
                ></input>
                <h3>No</h3>
              </div>
              <button
                className="add--button button--disabled"
                onClick={addPatient}
                type="button"
                id="button__patient--add"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>Ingresar
              </button>
            </div>
          </div>
        </div>
        <div className="patient__addcontacts">
          <div className="search__header">Relación de contactos</div>
          <div className="add__container">
            <div className="add--search">
              <h3 className="add--label">Buscar:</h3>
              <div className="select__container">
                <Dropdown
                  placeholder="Colaborador"
                  search
                  selection
                  options={possibleAddsOptions}
                />
                <i className="fa fa-angle-down"></i>
              </div>
              {/* <PossibleContacts workerList={this.props.workerList} /> */}
            </div>
            <button
              className="add--button button--disabled"
              id="button__contact--add"
              onClick={addContact}
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
                <tr className="table__header">
                  {/* <th>Nombre completo</th>
                  <th>Área</th>
                  <th></th> */}
                </tr>
                {workerTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
Reports = connect(mapStateToProps)(Reports);
export default connect(null, mapDispatchToProps)(Reports);
