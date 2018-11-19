import React, { Component } from 'react';

export default class Wife extends Component {
  constructor(props) {
    super(props);

    const { defineInitialWifeStatus, id, status } = this.props;

    defineInitialWifeStatus(id, status);
  }

  render() {
    const { content: { name, title }, id, status, changeWife } = this.props;
    const image = status === 'unavailable'
      ? require(`../../../assets/wives/placeholder.jpg`)
      : require(`../../../assets/wives/${id}.jpg`);

    let buttonName;

    if (status === 'married') {
      buttonName = 'Divorce';
    } else if (status === 'available') {
      buttonName = 'Marry';
    } else {
      buttonName = 'Go get some better job...';
    }

    return (
      <li onClick={changeWife} className={`${status} standard_tile`}>
        <div className="name">
          <h3>{status === 'unavailable' ? '?' : name}</h3>
        </div>
        <div className="title">
          <p>{title}</p>
        </div>
        <img src={image} alt="hmm, there should be something here"/>
        <button>{buttonName}</button>
      </li>
    );
  }
}
