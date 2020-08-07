import React, { Component } from "react";
import logoMod1 from "../../img/personal-information.svg";
import logoMod2 from "../../img/hospital-bed.svg";
import logoMod3 from "../../img/medical-records.svg";
import home from "../../img/home.svg";

import { NavLink } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer__container">
        <ul className="nav__container">
          <li className="navlink" id="navlink-1">
            <NavLink exact to="/">
              <object
                type="image/svg+xml"
                data={home}
                className="logo-2"
              ></object>
              <div className="text__container">
                <h3 name="navlink-1">Inicio</h3>
              </div>
            </NavLink>
          </li>

          <li className="navlink" id="navlink-2">
            <NavLink to="/patients">
              <object
                type="image/svg+xml"
                data={logoMod1}
                className="logo"
              ></object>
              <div className="text__container">
                <h3>Ingreso Paciente</h3>
              </div>
            </NavLink>
          </li>
          <li className="navlink" id="navlink-3">
            <NavLink to="/activity">
              <object
                type="image/svg+xml"
                data={logoMod2}
                className="logo"
              ></object>
              <div className="text__container">
                <h3>Registro Actividad</h3>
              </div>
            </NavLink>
          </li>
          <li className="navlink" id="navlink-4">
            <NavLink to="/search">
              <object
                type="image/svg+xml"
                data={logoMod3}
                className="logo"
              ></object>
              <div className="text__container">
                <h3>Generar reporte</h3>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Footer;
