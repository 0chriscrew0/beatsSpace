import React, { Component } from "react";

class CheckBoxGroup extends Component {
  state = {
    checked: []
  };

  handleToggle = item => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked }, () =>
      this.props.handleFilters(newChecked)
    );
  };

  render() {
    return (
      <div className="shop-checkbox-group">
        {this.props.list
          ? this.props.list.map(item => (
              <div key={item._id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.checked.indexOf(item._id) !== -1}
                  id={item._id}
                  onChange={this.handleToggle(item._id)}
                />
                <label className="form-check-label" htmlFor={item._id}>
                  {item.name}
                </label>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default CheckBoxGroup;
