import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default props => (
  <div>
    <NavMenu />
    <div>
      {props.children}
    </div>
  </div>
);
