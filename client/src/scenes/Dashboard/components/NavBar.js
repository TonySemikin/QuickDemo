import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(props) {
  return (
    <nav className="navigation">
      <ul>
        <NavLink to="/dashboard/getsomejob">Get Some Job</ NavLink>
        <NavLink to="/dashboard/changeawife">Change a Wife</ NavLink>
        <NavLink to="/dashboard/buysomefood">Food</ NavLink>
        <NavLink to="/dashboard/buysomestuff">Computers</ NavLink>
        <NavLink to="/dashboard/buysomecar">Cars</ NavLink>
        <NavLink to="/dashboard/buysomehouse">Houses</ NavLink>
      </ul>
    </nav>
  );
}
