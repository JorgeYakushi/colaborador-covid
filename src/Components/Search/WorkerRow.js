import React from "react";

function workerRow(props) {
  if (
    (props.selectedRegion === "none" ||
      props.selectedRegion === props.region) &&
    (props.selectedHotel === "none" || props.selectedHotel === props.hotel) &&
    (props.selectedStatus === "none" ||
      props.selectedStatus === props.status) &&
    (props.selectedCampaign === "none" ||
      props.selectedCampaign === props.campaign)
  ) {
    return (
      <tr>
        <th>{props.dni}</th>
        <th>{props.name}</th>
        <th>{props.region}</th>
        <th>{props.hotel}</th>
        <th>{props.status}</th>
        <th>{props.campaign}</th>
      </tr>
    );
  }
  return null;
}

export default workerRow;
