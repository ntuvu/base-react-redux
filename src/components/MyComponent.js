import React from "react";

class MyComponent extends React.Component {

  state = {
    name: "Tu", address: "HP", age: 55
  }

  handleClick = (event) => {
    console.log(">> click", this.state.name)
    this.setState({
      name: "Tu Vu",
      age: Math.floor((Math.random() * 100) + 1)
    })
  }

  handleOnMouseOver(event) {
    console.log(event.pageX)
  }

  render() {
    return (<div>
        My name is {this.state.name} I'm {this.state.age}
        <button onClick={this.handleClick}>Click me</button>
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
      </div>);
  }
}

export default MyComponent;
