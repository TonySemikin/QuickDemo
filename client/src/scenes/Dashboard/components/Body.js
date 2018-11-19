import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Jobs from '../components/Jobs';
import Purchases from '../components/Purchases';
import Wives from '../components/Wives';

class Body extends Component {
  render() {
    const { jobs, food, stuff, cars, houses, wives } = this.props.state;

    return (
      <div className="body">
        <Route
          exact
          path="/dashboard/"
          render={() => <div className="start_message">Now, go get some job...</div>}
          />
        <Route
          path="/dashboard/getsomejob"
          render={(props) => <Jobs
            content={jobs}
            contentType="jobs"
            {...props}/>}
          />
        <Route
          path="/dashboard/buysomefood"
          render={(props) => <Purchases
            content={food}
            contentType="food"
            mode="simple"
            {...props}/>}
          />
        <Route
          path="/dashboard/buysomestuff"
          render={(props) => <Purchases
            content={stuff}
            contentType="stuff"
            mode="toggle"
            {...props}/>}
          />
        <Route
          path="/dashboard/buysomecar"
          render={(props) => <Purchases
            content={cars}
            contentType="cars"
            mode="toggle"
            {...props}/>}
          />
        <Route
          path="/dashboard/buysomehouse"
          render={(props) => <Purchases
            content={houses}
            contentType="houses"
            mode="toggle"
            {...props}/>}
          />
        <Route
          path="/dashboard/changeawife"
          render={(props) => <Wives
            content={wives}
            contentType="wives"
            {...props}/>}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Body);
