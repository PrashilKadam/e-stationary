import './ShopNavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from './../../../Context/AuthContext';
import Profile from './../../NavBar/profile1.png';
import Cart from './../../NavBar/cart.png';
import Logout from './../../NavBar/logout.png';
import Update from './../../NavBar/update.png';
import Menu from './../../NavBar/menu.png';
import { useEffect, useState } from 'react';
import profile from './../ShopNavBar/altprofile.png';

function ShopNavBar({isShopKeeper}){
    let history =useHistory();
    const { loginIn, SignOut, currentUser } = useAuth()
    async function signOutMe(){
        await SignOut();
        history.push('./')
    }

    return(
        <div>
            <div className="nav-links">
                <div bgcolor="dark"></div>
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">NoteBook Junction</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="/shop">Stock</Nav.Link>
                                <Nav.Link href="/customer">Customer</Nav.Link>
                                <Nav.Link href="/aboutus">About Us</Nav.Link>
                                */}
                            </Nav>
                            <Nav>{/*<i className="fab fa-google fa-1x">*/}
                                {/* <Button variant="outline-primary" onClick={LoginwithGoogle}><i class="fa fa-google fa-fw"></i>Sign In </Button> */}
                               {/* <Nav.Link><Link to='/customer/cart'><Button variant="outline-primary"><span id='spancart' class="material-symbols-outlined">shopping_cart_checkout</span></Button></Link></Nav.Link> */}
                            </Nav>
                            {/* <Link to='/customer/cart'><Button variant="outline-primary">Cart</Button></Link> */}
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


                            <nav id="nav1">
                                <ul>
                                    <li>
                                        <img id="image" src={localStorage.getItem("photoURL")}  alt={profile} />
                                    </li>
                                </ul>
                            </nav>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                            <button id='Signout' onClick={signOutMe}><i class="fa fa-sign-out" aria-hidden="true"></i></button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                {/* 
            <Link to="/">Home</Link>
            <Link to="/shop">Stock</Link>
            <Link to="/customer">Customer</Link> */}
            </div>
        </div>
    )
}
export default ShopNavBar;