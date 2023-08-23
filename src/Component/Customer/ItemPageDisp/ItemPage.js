import './../CustomerPage/Item.css'
import { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import { update, ref, set, remove, onValue } from 'firebase/database';
import { useAuth } from '../../../Context/AuthContext'
function ItemPage({ data }) {
    const { currentUser } = useAuth()
    const [addItem, setAddItem] = useState(true)
    const [count, setCount] = useState(1);
    const [outOfStock, setOutOfStock] = useState(false);

    useEffect(() => {
        if (data.ItemQuantity == 0) {
            setOutOfStock(true);
        } else {
            setOutOfStock(false);
        }
    }, [])

    
    
    return (
        <div id="card">
            <div id="carditem">

                <img src={data.ItemImage} alt="Error 404"></img>
                <div id="container">
                    <p id='pname' class="card-text"><b>{data.ItemName}</b></p>
                    <span id="pprice">₹{data.ItemPrice}</span>
                    {/* <span id="pstock">Left :{data.ItemQuantity}</span> */}
                </div>
                {/* <div id='addbtn'>
                    {!outOfStock && <div id='addbtn'>
                        {addItem && <input type='button' id="Additem" value='Add Item' onClick={() => onAddItemHandler(data.ItemName, data.ItemPrice)}></input>}
                        {!addItem && <div>
                            <input type='button' id="Additem" value='-' onClick={() => onDecrement(data.ItemName, data.ItemPrice)}></input>
                            <input id='qty' inputMode='numeric' value={count} readOnly={true}></input>
                            <input type='button' id="Additem" value='+' onClick={() => onIncrement(data.ItemName, data.ItemPrice)}></input>
                        </div>}
                    </div>}
                </div>
                {outOfStock && <div id='addbtn'>
                    <p>Out of Stock!</p>
                </div>} */}

            </div>
        </div>
    )
}
export default ItemPage;
