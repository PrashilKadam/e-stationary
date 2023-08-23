import CustNavBar from "../Customer/CustNavBAr/CustNavBar";
import NavBar from "../NavBar/NavBar";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Aboutus.css"

function Aboutus() {
    return (
        <>
            
            <p id="about">Hello User! We hope your experience throughout our website was good</p>
            <p id="about">We the team of SMASH</p> 
            <p id='about'>To return to the Customer page --- <a href='/customer'>Click here</a></p>
            {/* <a href="https://facebook.com/" id="fas" class="fa fa-facebook"></a> */}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <p id="aboutf">You can connect us through our social media platforms...</p>
            <p id="aboutfooter">
                <a href="https://facebook.com/" id="fas" class="fa fa-facebook"></a>
                {/* <a href="https://snapchat.com/" id="fas" class="fa fa-snapchat"></a> */}
                <a href="https://github.com/" id="fas" class="fa fa-github"></a>
                <a href="https://chat.whatsapp.com/J4t5ZCWkHLKKItfJwg9gOo" id="fas" class="fa fa-whatsapp"></a>
                <a href="https://www.google.com/gmail/" id="fas" class="fa fa-envelope-o"></a>
                <a href="https://linkedin.com/" id="fas" class="fa fa-linkedin"></a>
                <a href="https://instagram.com/" id="fas" class="fa fa-instagram"></a>
                {/* <a href="https://twitter.com/" id="fas" class="fa fa-twitter"></a> */}
                {/* <a href="https://youtube.com/" id="fas" class="fa fa-youtube"></a> */}
                {/* <a href="https://www.skype.com/en/" id="fas" class="fa fa-skype"></a> */}
                {/* <a href="https://web.telegram.org/" id="fas" class="fa fa-telegram"></a> */}
                {/* <a href="https://www.skype.com/en/" id="fas" class="fa fa-skype"></a> */}
            </p>
        </>
    )
}

export default Aboutus;