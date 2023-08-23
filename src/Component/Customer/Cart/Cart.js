import './Cart.css'
import CartItem from './CartItem';
import { auth, database } from '../../../firebase'
import { onValue, ref, remove, set, update} from 'firebase/database';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import CartTable from './CartTable';
import CustNavBar from './../CustNavBAr/CustNavBar'

function Cart() {
    const { currentUser } = useAuth()
    const [total, setTotal] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [dispbtn, setDispBtn] = useState(false)
    const [user, setUser] =useState({})
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })

        onValue(ref(database, user.uid + '/cart'), (snapshot) => {
            if (snapshot.exists()) {
                let cartlist = [];
                let sum = 0;
                snapshot.forEach(childsnapshot => {
                    console.log(childsnapshot.val())
                    cartlist.push(childsnapshot.val())
                })
                setCartItem(cartlist);
                console.log(cartlist)
                cartlist.map((item) => {
                    sum = sum + (item.itemTotal);
                })
                setTotal(sum);
                setDispBtn(true);
            } else {
                let cartlist = [];
                snapshot.forEach(childsnapshot => {
                    console.log(childsnapshot.val())
                    cartlist.push(childsnapshot.val())
                })
                setCartItem(cartlist);
                setDispBtn(false);
            }
        })
    }, [user])

    function onPlaceOrderHandler() {
        let uniqueNo = Math.floor(Math.random() * Date.now());
        let orderId = uniqueNo.toString().substring(0, 10);
        let quantity = 0;
        cartItem.map((item) => {
            quantity = quantity + (item.itemQuantity)
            console.log(quantity)
        })
        const postData = {
            orderId: Number(orderId),
            timestamp: parseInt(Date.now()),
            totalQuantity: Number(quantity),
            totalPrice: Number(total),
            itemOrdered: (cartItem)
        }
        
        cartItem.map(async (item)=>{
            var quant;
            onValue(ref(database, 'stocks/'+ item.itemName), snapshot =>{
                quant=parseInt(snapshot.val().ItemQuantity)
            })
            if(quant>=item.itemQuantity){
                console.log("I am here")
                await update(ref(database, 'stocks/'+ item.itemName),{
                    ItemQuantity: Number(quant-item.itemQuantity)
                })
                await set(ref(database, '' + user.uid + "/order/" + orderId), {
                    orderId: Number(orderId),
                    timestamp: parseInt(Date.now()),
                    totalQuantity: Number(quantity),
                    totalPrice: Number(total),
                    itemOrdered: (cartItem)
                })
                await set(ref(database, 'order/' + postData.orderId), {
                    orderId: Number(orderId),
                    timestamp: parseInt(Date.now()),
                    totalQuantity: Number(quantity),
                    totalPrice: Number(total),
                    itemOrdered: (cartItem)
                })
                await remove(ref(database, user.uid + '/cart'));
                window.location.replace("/customer")
            }
        })
        
        //This code is reserved for the future instances....Avoid this to be deleted.
        // const q = query(ref(database, "user0/order"),orderByChild("timestamp"))        
        // get(q).then(snapshot=>{
        //     snapshot.forEach((child)=>console.log(child.val()))
        // })
    }

    return (
        <>
        {console.log(cartItem)}
            <CustNavBar></CustNavBar>
            <div id='container-0'>
                {cartItem.length!=0 && <div id='List'>
                    <div id='CartList'>
                        {cartItem.map((data) => <CartItem itemdata={data} key={Math.random()}></CartItem>)}
                    </div>
                </div>}
                {cartItem.length!=0 && <div id='invoice'>
                    <div id='invoice-details'>
                        <h3>Details</h3>
                        <hr></hr>
                        <CartTable data={user}></CartTable>
                        <div id='total'>
                            <p>Total : ₹{parseInt(total)} </p>
                        </div>
                        {dispbtn && <div id='checkbtn'>
                            <input type='button' class="orderplace placeorder" value='Place Order' onClick={onPlaceOrderHandler}></input>
                        </div>}
                    </div>
                </div>}
                {cartItem.length==0 && <div id='another-div'>
                    <img id="nodataimg" src="https://firebasestorage.googleapis.com/v0/b/test-c03d1.appspot.com/o/images%2Fshop.png?alt=media&token=c0ac83e6-38d3-4b9e-b454-1ea2cb61d071" alt='Here tera baap aayega'></img>
                    <p id='text1'>Your cart is empty. <a href='/customer' id="clickhere">Click here</a> to continue shopping...</p>
                </div>}
            </div>

        </>
    )
}
export default Cart;