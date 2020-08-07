import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class PossibleContacts extends Component {
  constructor(props) {
    super(props);
    this.state = { workerlist: this.props.workerList };
  }
  render() {
    const possibleAddsOptions = this.props.workerList.map((item, index) => ({
      key: index,
      text: item.name,
      value: item.name,
    }));
    const possibleAdds = () => (
      <Dropdown
        placeholder="State"
        search
        selection
        options={possibleAddsOptions}
      />
    );
    return possibleAdds;
  }
}
export default PossibleContacts;
