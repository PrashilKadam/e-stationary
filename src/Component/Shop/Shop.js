import { useRef, useEffect, useState } from 'react'
import ListItem from './ListItem';
import { ref, onValue, set, query, orderByChild, remove} from 'firebase/database'
import { database } from '../../firebase'
import { storage } from '../../firebase';
import { ref as reference, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Shop.css'
import ShopNavBar from './ShopNavBar/ShopNavBar'

function Shop() {
    var ItemName = useRef();
    var ItemPrice = useRef();
    var ItemQuantity = useRef();
    var lightOrderLength 
    var bulkOrderLength 
    // var interval = 0;
    var intervalId;
    let lorder = [];
    let border = [];

    const [lists, setList] = useState([]);
    const [Ordered, setOrderedList] = useState([]);
    const [orderState, setOrderState] = useState(false);
    const [lightOrder, setLightOrder] = useState([]);
    const [bulkOrder, setBulkOrder] = useState([]);
    const [btndisp, setBtnDisp] = useState({ toggle: true });
    const [acceptOrder, setAcceptOrder] = useState(false);
    const [imageUpload, setImageUpload] = useState(null)
    


    useEffect(() => {
        getUpdate();
    }, [])

    // useEffect(()=>{
    //     if(lightOrder.length==0){
    //         clearInterval(intervalId)
    //         interval=15000
    //         startInterval(interval)
    //         console.log("Heya bulk order execute karna chahiye")
    //     }
    //     if(bulkOrder.length==0){
    //         clearInterval(intervalId)
    //         interval=30000
    //         startInterval(interval) 
    //         console.log("Heya light order execute karna chahiye")
    //     }
    // },[serve])
    // var interval = 0;
    // var checkInterval;
    // function startInterval1(_interval) {

    //     checkInterval = setInterval(function () {
    //         console.log(bulkOrder)
    //         if (bulkOrder.length == 0) {
    //             console.log('lightorder checkInterval')
    //             clearInterval(intervalId);
    //             document.getElementById("lightorder").style.pointerEvents = 'auto';
    //             document.getElementById('bulkorder').style.pointerEvents = 'none';
    //             interval=15000;

    //         }
    //         else if (lightOrder.length == 0) {
    //             console.log('bulkorder checkInterval')
    //             clearInterval(intervalId)
    //             document.getElementById("lightorder").style.pointerEvents = "none";
    //             document.getElementById('bulkorder').style.pointerEvents = 'auto';
    //             interval=30000;

    //         }
    //         clearInterval(checkInterval);
    //         startInterval1(2000)
    //     }, 2000);
    //     // listInterval = setInterval(function () {
    //     //     console.log(interval)
    //     //     if (interval == 15000) {
    //     //         document.getElementById("bulkorder").style.pointerEvents = "auto";
    //     //         document.getElementById("lightorder").style.pointerEvents = "none";
    //     //     } else {
    //     //         document.getElementById("lightorder").style.pointerEvents = "auto"
    //     //         document.getElementById("bulkorder").style.pointerEvents = "none"
    //     //     }
    //     //     interval == 15000 ? interval = 30000 : interval = 15000;
    //     //     clearInterval(listInterval)
    //     // }, interval)

    // }
    function startInterval(interval) {
        intervalId = setInterval(function () {
            //Validation of time to time to check before shifting whether the orderlist is having orders or not and
            //then to decide the timers accordingly.
            // if(bulkOrder.length==0 && lightOrder.length==0){
            //     //orders ko lena baandh krr
            //     //Stop button -> Accept button 
            //     console.log(bulkOrder.length)
            //     console.log(lightOrder.length)
            //     let time_id=localStorage.getItem("time_id")
            //     clearInterval(time_id);
            //     setAcceptOrder(false)
            //     setBtnDisp({ toggle: true })
            // }else{
                if (interval == 15000) {
                    if(localStorage.getItem("border_length")!=0){
                        console.log("bulkOrder time")
                        document.getElementById("bulkorder").style.pointerEvents = "auto";
                        document.getElementById("lightorder").style.pointerEvents = "none";
                    }else{
                        interval = 30000;
                        console.log("ligtorder time")
                        document.getElementById("lightorder").style.pointerEvents = "auto"
                        document.getElementById("bulkorder").style.pointerEvents = "none"
                    }
                } else {
                    console.log(localStorage.getItem("lorder_length"))
                    console.log(localStorage.getItem("border_length"))
                    if(localStorage.getItem("lorder_length")!=0){
                        console.log("ligtorder time")
                        document.getElementById("lightorder").style.pointerEvents = "auto"
                        document.getElementById("bulkorder").style.pointerEvents = "none"
                    }else{
                        interval = 15000;
                        console.log("bulkOrder time")
                        document.getElementById("bulkorder").style.pointerEvents = "auto";
                        document.getElementById("lightorder").style.pointerEvents = "none";
                    }
                }
                interval == 15000 ? interval = 30000 : interval = 15000;
                clearInterval(intervalId)
                startInterval(interval)
            // }
        }, interval);
        localStorage.setItem("time_id", intervalId);
    }

    function getUpdate() {
        onValue(ref(database, 'stocks'), (snapshot) => {
            let list = []
            snapshot.forEach(childsnapshot => {
                list.push(childsnapshot.val());
            })
            setList(list);

        })
        onValue(query(ref(database, 'order'), orderByChild('timestamp')), snapshot => {
            let orderedlist = [];
            snapshot.forEach(order => {
                orderedlist.push(order.val())
            })
            setOrderedList(orderedlist);
        })
    }

    useEffect(() => {
        orderAcceptance()
    }, [Ordered, acceptOrder])

    const addItemHandler = async(event) => {
        event.preventDefault();
        var ImageURL=await uploadImage()
        //Validation required*** to not put the same item of same name.
        set(ref(database, 'stocks/' + ItemName.current.value), {
            ItemName: ItemName.current.value,
            ItemPrice: Number(ItemPrice.current.value),
            ItemQuantity: Number(ItemQuantity.current.value),
            ItemImage: ImageURL
        })
        alert("Item Added!")
    };

    const onAcceptOrder = () => {
        setOrderState(true)
        setAcceptOrder(true)
        startInterval()
        
        setBtnDisp({ toggle: false })
    };

    function onStopOrder() {
        console.log("I am here")
        setAcceptOrder(false)
        setBtnDisp({ toggle: true })
    };

    function orderAcceptance() {
        Ordered.map((order) => {
            if (acceptOrder == true) {
                if (order.totalQuantity < 50) {
                    if (lorder.length < 10) {
                        lorder.push(order);
                        localStorage.setItem("lorder_length",lorder.length);
                        setLightOrder(lorder)
                    } else {
                    }
                } else {
                    if (border.length < 6) {
                        border.push(order);
                        localStorage.setItem("border_length",border.length);
                        setBulkOrder(border);
                    }
                }
            }
        })
    }

    function getData(order) {
        if (order == null) {

        } else {
            const data = []
            onValue(ref(database, 'order/' + order.orderId + '/itemOrdered'), snapshot => {
                snapshot.forEach((item) => {
                    data.push(item.val())
                })
            })
            return data;
        }
    }

    function onServeHandlerL(orderId) {
        if (lightOrder.length == 1) {
            // document.getElementById("bulkorder").style.pointerEvents = "auto";
            // document.getElementById("lightorder").style.pointerEvents = "none";
            if(bulkOrder.length != 0){
                let time_id= localStorage.getItem("time_id")
                clearInterval(time_id);
                startInterval(30000);
                console.log("Bulkorder time")
                document.getElementById("bulkorder").style.pointerEvents = "auto";
                document.getElementById("lightorder").style.pointerEvents = "none";
                document.getElementById("bulkorder").style.pointerEvents = "auto";
                document.getElementById("lightorder").style.pointerEvents = "none";
            }else{
                let time_id= localStorage.getItem("time_id")
                clearInterval(time_id);
                setAcceptOrder(false)
                setBtnDisp({ toggle: true })
            }
            // let time_id= localStorage.getItem("time_id")
            // clearInterval(time_id);
            // startInterval(30000);
        }
        remove(ref(database, 'order/' + orderId));
        localStorage.setItem("lorder_length", localStorage.getItem("lorder_length")-1);
        lightOrder.shift()
    }

    function onServeHandlerB(orderId) {
        if (bulkOrder.length == 1) {
            // document.getElementById("bulkorder").style.pointerEvents = "none";
            // document.getElementById("lightorder").style.pointerEvents = "auto";
            if(lightOrder.length != 0){
                let time_id= localStorage.getItem("time_id")
                clearInterval(time_id);
                startInterval(15000);
                console.log("Lightorder time")
                document.getElementById("lightorder").style.pointerEvents = "auto"
                document.getElementById("bulkorder").style.pointerEvents = "none"
                document.getElementById("lightorder").style.pointerEvents = "auto"
                document.getElementById("bulkorder").style.pointerEvents = "none"
            }else{
                let time_id= localStorage.getItem("time_id")
                clearInterval(time_id);
                setAcceptOrder(false)
                setBtnDisp({ toggle: true })
            }
        }
        remove(ref(database, 'order/' + orderId));
        localStorage.setItem("border_length", localStorage.getItem("border_length")-1);
        bulkOrder.shift()
    }

    // function openAllDoors() {
    //     document.getElementById("bulkorder").style.pointerEvents = "auto";
    //     document.getElementById("lightorder").style.pointerEvents = "auto";
    // }

    async function uploadImage() {
        if(imageUpload == null) return;
        const imageRef = reference(storage, `images/${imageUpload.name}`)
        await uploadBytes(imageRef,imageUpload).then((resp)=>{
            alert("Image Uploaded")
        })
        const imageURL= await getDownloadURL(imageRef).then((url)=>{
            return url
        })
        return imageURL;
    }

    function deleteID(){
        let time_id=localStorage.getItem("time_id");
        clearInterval(time_id);
    }

    return (
        <>
        <ShopNavBar></ShopNavBar>
        <div className='grid-container'>
            
            <div id='add-Items'>
                <h3>Add items</h3>
                <form onSubmit={addItemHandler}>
                    <label>Name of the object</label>
                    <input class="iskokum" type='text' ref={ItemName} required></input>
                    <label>Price</label>
                    <input class="iskokum" type='number' ref={ItemPrice} required></input>
                    <label>Quantity</label>
                    <input class="iskokum" type='number' ref={ItemQuantity} required></input>
                    <input type='file' 
                    onChange={(event)=>{setImageUpload(event.target.files[0])}} required></input>
                    <input class="btn btn-outline-success"  type='submit' value='Add Item'></input>
                </form>
            </div>
            <div id='stock-list'>
                <div id="list-Item">
                    <ListItem list={lists} column=''></ListItem>

                </div>
            </div>
            <div id='orderExe'>
                <div id='order-Exe' >
                    <div id='lightorder' >

                        {orderState && lightOrder.map((order, index) => {
                            {
                                if (index == 0) {
                                    const data = getData(order);
                                    return (
                                        <div id="map">
                                            <div id='lorder'>
                                                <h3>#Order{index + 1}</h3>
                                                <p>Order_ID: {order.orderId} </p>
                                            </div>
                                            {/* {itemDetails.map(item => console.log("Hello"))} */}
                                            {data.map(item => {
                                                return (
                                                    <div id='listul'>
                                                        <ul>
                                                        <li><b>{item.itemName}</b><br></br>
                                                        Quantity : {item.itemQuantity} | Price : ₹{item.itemPrice}</li>
                                                        </ul>
                                                    </div>
                                                )
                                            })}
                                            <div id='serve'>
                                                <input type="button" class="serve" value='Served' onClick={() => onServeHandlerL(order.orderId)}></input>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (<div id='lorder'>
                                        <h3>#Order{index+ 1}</h3>
                                        <p>Order_ID: {order.orderId} </p>
                                    </div>)
                                }
                            }
                        })}
                    </div>
                    <div id='bulkorder'>
                        {orderState && bulkOrder.map((order, index) => {
                            if (index == 0) {
                                const data = getData(order);
                                return (
                                    <div id="map">
                                        <div id='border'>
                                            <h3>#Order{index+1}</h3>
                                            <p>Order_ID: {order.orderId} </p>
                                        </div>
                                        {/* {itemDetails.map(item => console.log("Hello"))} */}
                                        {data.map(item => {
                                            return (
                                                <div id='listul'>
                                                    <ul>
                                                        <li><b>{item.itemName}</b><br></br>
                                                        Quantity : {item.itemQuantity} | Price : ₹{item.itemPrice}</li>
                                                    </ul>
                                                </div>
                                            )
                                        })}
                                        <div id='serve1'>
                                            <input type="button" class="serve" value='Served' onClick={() => onServeHandlerB(order.orderId)}></input>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (<div id='lorder'>
                                    <h3>#Order{index+1}</h3>
                                    <p>Order_ID: {order.orderId} </p>
                                </div>)
                            }
                            // return (
                            //     <div id='border'>
                            //         <h3>#Order{index}</h3>
                            //         <p>Order_ID: {order.orderId} </p>
                            //     </div>
                            // )
                        })}
                    </div>
                </div>
            </div>
            <div id='order-list'>
                <div id='ordered-list'>
                    {Ordered.map((orders, index) => {
                        return (
                            <div id='order' key={index}>
                                <h3>#Order{index}</h3>
                                <p>Order Id: {orders.orderId}</p>
                            </div>
                        )
                    })}

                </div>
                <div id='acceptbtn'>
                    {/* {!orderState && <input type='button' value='Accept Order' onClick={()=>onAcceptOrder()}></input>}
                    {orderState && <input type='button' value='Stop' onClick={onStopOrder}></input>} */}
                    {btndisp.toggle ? <input type='button' class="btn btn-success" value='Accept Order' onClick={() => onAcceptOrder()}></input> : <input type='button' value='Stop' class="btn btn-danger" onClick={onStopOrder}></input>}
                    {/* <button class="btn btn-success" onClick={deleteID}>Delete Time ID</button> */}
                </div>
            </div>
        </div>
        </>
    );
}
export default Shop;