import React from "react";

function patientRow(props) {
  return (
    <tr className="contact__row">
      <th>
        <img src={props.picture}></img>
      </th>
      <th className="row__text">
        <p>{props.name}</p>
        <h6>{props.area}</h6>
      </th>

      <th>
        <a
          className="remove__contact"
          id={props.number}
          onClick={props.handler}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </a>
      </th>
    </tr>
  );
}

export default patientRow;
