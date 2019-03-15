import React, { Component } from "react";

class SizeSensitive extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleSizeChange);
  }

  handleSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 576;

    if (isMobile) {
      return <div>{this.props.mobileContent}</div>;
    } else {
      return <div>{this.props.regularContent}</div>;
    }
  }
}

export default SizeSensitive;
