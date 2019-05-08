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
      <div className="bg-gray">
        {this.props.list
          ? this.props.list.map(item => (
              <div
                key={item._id}
                className="pretty p-default p-thick p-curve p-smooth d-block my-3"
              >
                <input
                  type="checkbox"
                  checked={this.state.checked.indexOf(item._id) !== -1}
                  id={item._id}
                  onChange={this.handleToggle(item._id)}
                />
                <div className="state p-primary-o">
                  <label htmlFor={item._id}>{item.name}</label>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default CheckBoxGroup;
