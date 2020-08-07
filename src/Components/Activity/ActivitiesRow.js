import React, { Component } from "react";
import icon1 from "../../img/individual.svg";
import icon2 from "../../img/pharmacy.svg";
import icon3 from "../../img/pills.svg";
import icon4 from "../../img/more.svg";
import icon5 from "../../img/testing.svg";
class activitiesRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const activityIcon = () => {
      if (
        this.props.activity == "AISLAMIENTO U.M" ||
        this.props.activity == "AISLAMIENTO CASA" ||
        this.props.activity == "AISLAMIENTO HOTEL"
      ) {
        return (
          <object type="image/svg+xml" data={icon1} className="icon"></object>
        );
      } else if (
        this.props.activity == "HOSPITALIZACIÓN" ||
        this.props.activity == "UCI" ||
        this.props.activity == "VENTIALDOR MECÁNICO"
      ) {
        return (
          <object type="image/svg+xml" data={icon2} className="icon"></object>
        );
      } else if (
        this.props.activity == "PRUEBA RÁPIDA" ||
        this.props.activity == "PRUEBA MOLECULAR"
      ) {
        return (
          <object type="image/svg+xml" data={icon5} className="icon"></object>
        );
      } else if (
        this.props.activity == "ALTA MÉDICA" ||
        this.props.activity == "ALTA EPIDEMIOLÓGICA"
      ) {
        return (
          <object type="image/svg+xml" data={icon3} className="icon"></object>
        );
      } else if (this.props.activity == "FALLECIMIENTO") {
        return (
          <object type="image/svg+xml" data={icon4} className="icon"></object>
        );
      }

      return <div className="read"></div>;
    };
    return (
      <tr className="contact__row">
        <th className="row__image">
          {activityIcon()}
          <h6>{this.props.date}</h6>
        </th>

        <th className="row__text">
          <p>{this.props.activity}</p>
          <h6>{this.props.location}</h6>
          <h6> {this.props.result}</h6>
        </th>

        <th>
          <a
            className="remove__contact"
            id={this.props.number}
            onClick={this.props.handler}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </a>
        </th>
      </tr>
    );
  }
}

export default activitiesRow;
