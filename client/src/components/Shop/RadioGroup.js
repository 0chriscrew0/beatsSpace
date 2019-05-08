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
              <div
                key={index}
                className="pretty p-default p-thick p-round p-smooth d-block my-3"
              >
                <input
                  type="radio"
                  name="price"
                  value={item}
                  id={item.name}
                  checked={this.state.selected === item.name}
                  onChange={this.handleChecked(item)}
                />
                <div className="state p-primary-o">
                  <label htmlFor={item.name}>
                    {item.name === "All" || item.name === "Free"
                      ? item.name
                      : `$${item.name}`}
                  </label>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default RadioGroup;
