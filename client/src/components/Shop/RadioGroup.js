import React, { Component } from "react";

class RadioGroup extends Component {
  state = {
    selected: "All"
  };

  handleChecked = checked => () => {
    this.props.handleFilters(checked);
    this.setState({ selected: checked.name });
  };

  render() {
    return (
      <div className="shop-radio-group">
        {this.props.list
          ? this.props.list.map((item, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  value={item}
                  id={item.name}
                  checked={this.state.selected === item.name}
                  onChange={this.handleChecked(item)}
                />
                <label className="form-check-label" htmlFor={item.name}>
                  {item.name === "All" || item.name === "Free"
                    ? item.name
                    : `$${item.name}`}
                </label>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default RadioGroup;
