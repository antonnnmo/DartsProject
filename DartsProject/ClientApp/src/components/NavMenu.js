import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../site.css';

export default class NavMenu extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render () {
    return (
        <header>
            <div className="menu-container clearfix">
                <div className="menu-item-wrapper clearfix">
                    <NavLink tag={Link} className="menu-item" to="/">На главную</NavLink>
                </div>
                <div className="menu-item-wrapper clearfix">
                    <NavLink tag={Link} className="menu-item" to="/users">Список</NavLink>
                </div>
                <div className="menu-item-wrapper clearfix">
                    <NavLink tag={Link} className="menu-item" to="/games">Игры</NavLink>
                </div>
                <div className="menu-item-wrapper clearfix">
                    <NavLink tag={Link} className="menu-item" to="/liders">Лидеры</NavLink>
                </div>
                <div className="menu-item-wrapper clearfix">
                    <NavLink tag={Link} className="menu-item" to="/activeGame">Активная игра</NavLink>
                </div>
            </div>
      </header>
    );
  }
}
