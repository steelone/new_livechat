import React from 'react'

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="./cat.jpg" alt="img" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

export default Cat