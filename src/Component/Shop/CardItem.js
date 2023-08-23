import { useState, useRef } from 'react';
import { remove ,ref ,update } from 'firebase/database'
import { database } from '../../firebase';
function CardItem({data}) {
    const [updateState, setUpdateState]= useState(true);
    var itemPrice=useRef();
    var itemQuantity=useRef();
    function onClickHandler(ItemName){
        remove(ref(database, 'stocks/'+ ItemName));
    }
    function onUpdateHandler(){
        setUpdateState(false);
    }
    function onSaveHandler(ItemName){
        update(ref(database, 'stocks/'+ ItemName),{
            ItemPrice: parseInt(itemPrice.current.value),
            ItemQuantity: parseInt(itemQuantity.current.value) 
        })
        setUpdateState(true);
    }
    return (
        <div id="listItem" key={Math.random()}>
            <h4 id='itemName'>{data.ItemName}</h4>
            {updateState && <p id='itemPrice'>{`Price :${data.ItemPrice}`}</p>}
            {updateState && <p id='itemQuantity'>{`Quantity :${data.ItemQuantity}`}</p>}
            {!updateState && <div id='itemPrice'><label style={{fontSize:'14px'}}>Price:</label><input className='inputdata' type='number' ref={itemPrice}></input></div>}
            {!updateState && <div id='itemPrice'><label style={{fontSize:'14px'}}>Quantity:</label><input className='inputdata' type='number' ref={itemQuantity}></input></div>}
            <input className="button" value='Delete' type='button' onClick={()=>{onClickHandler(data.ItemName)}}></input>
            {updateState && <input className="button" value='Update' type='button' onClick={()=>{onUpdateHandler()}}></input>}
            {!updateState && <input className="button" value='Save' type='button' onClick={()=>{onSaveHandler(data.ItemName)}}></input>}
        </div>
    )
}
export default CardItem;