import * as React from "react";
import MechSimple from "./MechSimple";
import MechMetadata from "./MechMetadata";
import { Rnd } from "react-rnd";
const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};
class GenericMechanism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      width: 200,
      height: 200,
      x: 10,
      y: 10
    }
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  changeVisibility() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const { expanded } = this.state;

    return (
      // <>
      //   { expanded
      //     ? ( <MechMetadata changeVisibility={this.changeVisibility} {...this.props} /> )
      //     : ( <MechSimple changeVisibility={this.changeVisibility} {...this.props} /> )
      //   }
      // </>
      <Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
      >
        Rnd
      </Rnd>
    );
  }
}

export default GenericMechanism;
