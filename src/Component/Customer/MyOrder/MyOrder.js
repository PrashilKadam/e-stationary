import CustNavBar from '../CustNavBAr/CustNavBar';
import './MyOrder.css'
import { onValue, ref } from 'firebase/database';
import { database } from '../../../firebase';
import { useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { useState } from 'react';
import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';
function MyOrder() {
    const [order, setOrder] = useState([]);
    const [time, SetTimer]= useState(false)
    const { currentUser } = useAuth()
    var itemorderId = [];
    var eachitem = [];
    var indents = [1]
    useEffect(() => {
        onValue(ref(database, '' + currentUser.uid + '/order'), (snapshot) => {
            if (snapshot.exists) {
                let array = [];
                snapshot.forEach((item) => {
                    array.push(item.val())
                })
                setOrder(array);
                array.map((item) => {
                    itemorderId.push(item.orderId)
                })
                onValue(ref(database, '' + currentUser.uid + '/order/'+itemorderId), snapshot=>{
                    snapshot.forEach((item)=>{
                        eachitem.push(item.val());
                    })
                })
                console.log(itemorderId)
            }
        })
    }, [])

    return (<>
        <CustNavBar></CustNavBar>
        <p id='my-orders-head'>My Order's</p>
        <div id="border-order">
            <div id="ordered-order"></div>
{onValue(ref(database, '' + currentUser.uid + '/order/'+itemorderId), snapshot=>{
                   return(
                    <div id='order'>
                        <div id="order-details">
                            <img id="itemimage"></img>
                            <div id="itemDetails">
                                <p>{snapshot.val().itemName}</p>
                                <p>Item Quantity</p>
                                <p>Item Price</p>
                                <p>Total Price</p>
                            </div>
                            <div id="orderId">
                                <p>Order Id</p>
                                {/* <p>{item.orderId}</p> */}
                            </div>
                        </div>
                    </div>
                   )
                })}
            {time && indents.map((item) => {
                for (let index = 0; index < eachitem.length; index++) {
                    return (
                        <div id='order'>
                            <div id="order-details">
                                <img id="itemimage"></img>
                                <div id="itemDetails">
                                    <p>Item Name</p>
                                    <p>Item Quantity</p>
                                    <p>Item Price</p>
                                    <p>Total Price</p>
                                </div>
                                <div id="orderId">
                                    <p>Order Id</p>
                                    {/* <p>{item.orderId}</p> */}
                                </div>
                            </div>
                        </div>
                    )
                    
                }
                console.log(item.itemImage)
                return (
                    <div id='order'>
                        <div id="order-details">
                            <img id="itemimage"></img>
                            <div id="itemDetails">
                                <p>Item Name</p>
                                <p>Item Quantity</p>
                                <p>Item Price</p>
                                <p>Total Price</p>
                            </div>
                            <div id="orderId">
                                <p>Order Id</p>
                                {/* <p>{item.orderId}</p> */}
                            </div>
                        </div>
                    </div>
                )
            })
            }
            {/* {console.log(Object.values(itemorder))} */}
           { time &&<div id='order'>
                        <div id="order-details">
                            <img id="itemimage"></img>
                            <div id="itemDetails">
                                <p>{eachitem[0].itemName}</p>
                                <p>Item Quantity</p>
                                <p>Item Price</p>
                                <p>Total Price</p>
                            </div>
                            <div id="orderId">
                                <p>Order Id</p>
                                {/* <p>{item.orderId}</p> */}
                            </div>
                        </div>
                    </div>}
        </div>
    </>)
}
export default MyOrder;