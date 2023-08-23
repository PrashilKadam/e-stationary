import { Link, NavLink, useHistory } from 'react-router-dom'
import './NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
// import Cart from '../Customer/Cart/Cart';
// import Aboutus from '../Aboutus/Aboutus';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../../Context/AuthContext';
import Profile from './profile1.png';
import Cart from './cart.png';
import Logout from './logout.png';
import Update from './update.png';
import Menu from './menu.png';

function NavBar() {
    const { loginIn } = useAuth();
    let history = useHistory()
    async function LoginwithGoogle() {
        let email= await loginIn();
        if(email=='mrunalmisale26@gmail.com' || email=='20102099.suhas.murthy@gmail.com'){
            history.push('./shop')
        }else{
            history.push('./customer')
        }
    }
    return (
        <div>
            <div className="nav-links">
                <div bgcolor="dark"></div>
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
                    <Container>
                        <Navbar.Brand id="navhead" href="/">NoteBook Junction</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id = "responsive-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="/shop">Stock</Nav.Link>
                                <Nav.Link href="/customer">Customer</Nav.Link>
                                <Nav.Link href="/aboutus">About Us</Nav.Link> */}
                            </Nav>
                            <Nav>
                                {/*<i className="fab fa-google fa-1x">*/}
                                <Button variant="outline-primary" onClick={LoginwithGoogle}><i class="fa fa-google fa-fw"></i>Sign In</Button>
                                {/* <Nav.Link><Link to='/customer/cart'><Button variant="outline-primary"><span id='spancart' class="material-symbols-outlined">shopping_cart_checkout</span></Button></Link></Nav.Link> */}
                            </Nav>

                            {/* <a href="\Aboutus"><Button variant="outline-primary" id="aboutus"><i class="fa fa-info-circle"  id="abouticon" aria-hidden="true"></i></Button></a> */}
                            {/* <Link to='/customer/cart'><Button variant="outline-primary">Cart</Button></Link> */}
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


                            {/* <nav id="nav1">
                            <li>
                                        <span class="material-icons-outlined"><img src={Cart} class="profile" /></span>
                                    </li> 
                                <ul>

                                    
                                    <li>
                                        <img src={Profile} class="profile" />
                                        <ul>

                                            <li class="sub-item">
                                                <span class="material-icons-outlined"><img src={Menu} class="profile1" />
                                                </span>
                                                <p>My Orders</p>
                                            </li>
                                             <li class="sub-item">
                                                <span class="material-icons-outlined"><img src={Update} class="profile1" /></span>
                                                <p>Update Profile</p>
                                            </li> 
                                            <li class="sub-item">
                                                <span class="material-icons-outlined"><img src={Logout} class="profile1" /></span>
                                                <p>Logout</p>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav> */}
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

export default NavBar;