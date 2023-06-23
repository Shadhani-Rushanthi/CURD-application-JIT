import React, { useState } from 'react'
import user from '../images/user.png'
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse} from 'reactstrap'

const  NavBar= () => {
    
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
        <Navbar color="faded" light container="lg">
            <NavbarToggler onClick={toggleNavbar} className="me-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav  navbar>
                    <NavItem>
                        <NavLink href="/">Students</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/teacher">Teachers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/classroom">Class Rooms</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/subject">Subjects</NavLink>
                    </NavItem>
                </Nav>
                <Nav navbar>                    
                    <NavItem>
                        <NavLink href="/AllocateSubjects">Allocate Subjects</NavLink>
                    </NavItem>                    
                    <NavItem>
                        <NavLink href="/AllocateClassRooms">Allocate Class Rooms</NavLink>
                    </NavItem>                    
                    <NavItem>
                        <NavLink href="/studentReport">Studnt Detail Report</NavLink>
                    </NavItem>
                    
                </Nav>
            </Collapse>
            <NavbarBrand href="/" className="me"><img src={user} alt="" /></NavbarBrand>
        </Navbar>
    </div>
  )
}

export default NavBar