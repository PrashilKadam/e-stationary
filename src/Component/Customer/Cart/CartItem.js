import './CartItem.css'
import { database } from '../../../firebase';
import { ref, update, remove, onValue } from 'firebase/database';
import { useState,useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext';
function CartItem({itemdata}) {
    const {currentUser} = useAuth();
    const [disable, setdisable]=useState(false);

    function onDecrement(){
        if(itemdata.itemQuantity==1){
            remove(ref(database, currentUser.uid+'/cart/'+ itemdata.itemName));
        }else{
            update(ref(database, currentUser.uid+'/cart/'+ itemdata.itemName),{
                itemQuantity: parseInt(itemdata.itemQuantity-1),
                itemTotal: parseInt(parseInt(itemdata.itemPrice)*parseInt(itemdata.itemQuantity-1))
            })
        }
    }
    function onIncrement(itemName){
        let quantity;
        onValue(ref(database,'stocks/'+ itemName),snapshot=>{
            quantity=(snapshot.val());
        })
        if(parseInt(itemdata.itemQuantity)==parseInt(quantity.ItemQuantity)){
            setdisable(true);
        }else{
            update(ref(database, currentUser.uid+'/cart/' + itemdata.itemName),{
                itemQuantity: parseInt(itemdata.itemQuantity+1),
                itemTotal: parseInt(parseInt(itemdata.itemPrice)*parseInt(itemdata.itemQuantity+1))
            })
        }
    }
    function onDeleteItem(){
        remove(ref(database, currentUser.uid+'/cart/'+ itemdata.itemName));
        
    } 
    return (
        <div id='card'>
            <div id='contains'>
                {console.log(itemdata)}
                <div id='img'>
                    <img id='imgsrc' src={itemdata.itemImage}></img>
                </div>
                <div id='details'>
                    <p id='name'>{itemdata.itemName}</p>
                    <p className='pq'>Price : ₹{(itemdata.itemPrice*itemdata.itemQuantity)}</p>
                    <p className='pq'>Quantity :{itemdata.itemQuantity}</p>
                </div>
                <div id='controls'>
                    <div id='box'>
                        <input type='button' value='-' onClick={onDecrement}></input>
                        <input id='input' inputMode='numeric' readOnly={true} value={itemdata.itemQuantity}></input>
                        <input type='button' value='+'  disable={disable.toString()} onClick={()=>onIncrement(itemdata.itemName)}></input>
                        <div id='setwidth'>
                        <input id='dticon' type='button' value='Delete' onClick={onDeleteItem}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartItem;