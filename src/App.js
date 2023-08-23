import { Route } from "react-router-dom";
import './App.css';
import NavBar from './Component/NavBar/NavBar';
import Homepage from '../src/Component/Customer/Homepage';
import Shop from './Component/Shop/Shop';
import CustomerView from "./Component/Customer/CustomerPage/CustomerView";
import Cart from "./Component/Customer/Cart/Cart"
import { AuthProvider } from "./Context/AuthContext";
import MyOrder from "./Component/Customer/MyOrder/MyOrder";
import Aboutus from "./Component/Aboutus/Aboutus";
function App() {
  return (
    <div id="homescreen">
      <div id="flim">
      <AuthProvider>
      <Route>
      <Route exact path="/" component={Homepage}></Route>
      <Route exact path="/shop" component={Shop}></Route>
      <Route exact path="/customer" component={CustomerView}></Route>
      <Route exact path="/customer/cart" component={Cart}></Route>
      <Route exact path="/customer/my-orders" component={MyOrder}></Route>
      <Route exact path="/Aboutus" component={Aboutus}></Route>
      </Route>
      </AuthProvider>
    </div>
    </div>
  );
}

export default App;
