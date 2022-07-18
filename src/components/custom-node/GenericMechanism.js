import * as React from "react";
import MechSimple from "./MechSimple";
import MechMetadata from "./MechMetadata";

class GenericMechanism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  changeVisibility() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const { expanded } = this.state;

    return (
      <>
        { expanded
          ? ( <MechMetadata changeVisibility={this.changeVisibility} {...this.props} /> )
          : ( <MechSimple changeVisibility={this.changeVisibility} {...this.props} /> )
        }
      </>
    );
  }
}

export default GenericMechanism;
