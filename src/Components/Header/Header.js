import React, { Component } from "react";

import { NavLink } from "react-router-dom";

class Header extends Component {
  hideList() {
    const headerMobile = document.getElementsByClassName("header__list")[0];
    headerMobile.classList.remove("menu--visible");
  }
  showList() {
    const headerMobile = document.getElementsByClassName("header__list")[0];
    headerMobile.classList.add("menu--visible");
  }
  render() {
    return (
      <div className="header__container">
        <div className="header__main">
          <div className="header__logo">
            <a>Colaborador-COVID</a>
          </div>
          <div className="header__button">
            <i
              className="fa fa-bars"
              aria-hidden="true"
              onClick={this.showList}
            ></i>
          </div>
        </div>
        <ul className="header__list">
          <div className="menu--visible__main">
            <div className="menu--visible__logo">Colaborador-COVID</div>
            <div className="menu--visible__exit">
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={this.hideList}
              ></i>
            </div>
          </div>
          <li>
            <NavLink exact to="/" onClick={this.hideList}>
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink to="/patients" onClick={this.hideList}>
              Ingreso Paciente
            </NavLink>
          </li>
          <li>
            <NavLink to="/activity" onClick={this.hideList}>
              Registrar Actividad
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" onClick={this.hideList}>
              Generar Reporte
            </NavLink>
          </li>
          <li>
            <a className="logout" href="">
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
