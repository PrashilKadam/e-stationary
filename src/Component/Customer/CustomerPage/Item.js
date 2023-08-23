import './Item.css'
import { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import { update, ref, set, remove, onValue } from 'firebase/database';
import { useAuth } from '../../../Context/AuthContext'
function Item({ data }) {
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
        onValue(ref(database, '' + currentUser.uid + '/cart/' + data.ItemName), snapshot => {
            if (snapshot.val() != null) {
                let county = snapshot.val();
                setAddItem(false);
                setCount(county.itemQuantity);
            }
        })
    }, [])

    function onAddItemHandler(AName, Price) {
        setAddItem(false);
        setCount(1);
        set(ref(database, currentUser.uid + '/cart/' + AName), {
            itemName: AName,
            itemPrice: parseInt(Price),
            itemQuantity: parseInt(1),
            itemTotal: parseInt(Price * 1),
            itemImage: data.ItemImage
        })
    }
    function onDecrement(AName, Price) {
        if (count == 1) {
            setCount(1);
            setAddItem(true);
            remove(ref(database, currentUser.uid + '/cart/' + AName));
        } else {
            setCount(count - 1);
            update(ref(database, currentUser.uid + '/cart/' + AName), {
                itemQuantity: parseInt(count - 1),
                itemTotal: parseInt(parseInt(data.ItemPrice) * parseInt(count - 1))
            })
        }

    }
    function onIncrement(AName, Price) {

        if (count == data.ItemQuantity) {
            setCount(data.ItemQuantity)
            update(ref(database, currentUser.uid + '/cart/' + AName), {
                itemQuantity: parseInt(count),
                itemTotal: parseInt(parseInt(data.ItemPrice) * parseInt(count))
            })
        } else {
            setCount(count + 1);
            update(ref(database, currentUser.uid + '/cart/' + AName), {
                itemQuantity: parseInt(count + 1),
                itemTotal: parseInt(parseInt(data.ItemPrice) * parseInt(count + 1))
            })
        }
    }
    return (
        <div id="card">
            <div id="carditem">

                <img src={data.ItemImage} alt="Error 404"></img>
                <div id="container">
                    <p id='pname' class="card-text"><b>{data.ItemName}</b></p>
                    <span id="pprice">₹{data.ItemPrice}</span>
                    <span id="pstock">Left :{data.ItemQuantity}</span>
                </div>
                <div id='addbtn'>
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
                </div>}

            </div>
        </div>
    )
}
export default Item;
