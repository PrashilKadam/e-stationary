import { database , auth} from "../../../firebase"
import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useAuth } from "../../../Context/AuthContext"
import CartItem from "./CartItem"
import { onAuthStateChanged } from "firebase/auth"
function CartTable(user){
    const {currentUser}= useAuth();
    const [data, setData] = useState([])

    useEffect(() => {
        console.log(user)
        onValue(ref(database, ""+ user.data.uid+'/cart/'), (snapshot) => {
            if(snapshot.exists()){
            let cartlist = [];
            snapshot.forEach(childsnapshot => {
                cartlist.push(childsnapshot.val())
            })
            setData(cartlist);
            console.log(cartlist)
        }else{
            setData([]);
            //window.location.href='/customer'
        }
        })
    },[user])
    const column=[
        {heading: 'Item Name', value: 'itemName'},
        {heading: 'Price', value: 'itemPrice'},
        {heading: 'Quantity', value: 'itemQuantity'},
        {heading: 'Total', value: 'itemTotal'},
        
    ]

    return(
        <>
        <div>
            <table>
                <thead>
                   
                    <tr>
                        {column.map((item,index)=><HeadItem item={item} key={index}></HeadItem>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item)=><Row item={item} column={column} key={Math.random()}></Row>)}
                </tbody>
            </table>
        </div>
        </>
    )
}

const Row=({item,column})=>{
    return<tr>
        {column.map((columnItem)=>{
            if(columnItem.heading=='Total'){
                return <td key={Math.random()}>₹ {item[`${columnItem.value}`]}</td>
            }else{
                return <td key={Math.random()}>{item[`${columnItem.value}`]}</td>
            }
            
        })}
    </tr>
}

const HeadItem=({item})=>
    <th>{item.heading}</th>

export default CartTable;