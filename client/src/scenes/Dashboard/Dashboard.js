import React, { Fragment } from 'react';

import NavBar from './components/NavBar';
import Status from './components/Status';
import Body from './components/Body';

import withCounter from '../../common/hoc/withCounter';

const StatusWithCounter = withCounter(Status);

export default function Dashboard(props) {
  return (
    <Fragment>
      <NavBar />
      <StatusWithCounter />
      <Body {...props}/>
    </Fragment>
  );
}
