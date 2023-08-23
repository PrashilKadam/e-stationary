import './CustomerView.css'

import Item from './Item';
import { useEffect, useState } from 'react';
import { database, auth } from '../../../firebase'
import { onValue, ref } from 'firebase/database'
import { Link, useHistory } from 'react-router-dom';
import CustNavBar from '../CustNavBAr/CustNavBar';
import {useAuth} from './../../../Context/AuthContext'
// import { onAuthStateChanged } from 'firebase/auth';


function CustomerView() {
    let history = useHistory()
    const {currentUser}= useAuth()
    const [stocks, setStocks] = useState([]);
    useEffect(() => {
        getStocksAvail();
        
        
    },[]);

    function getStocksAvail(){
        onValue(ref(database, 'stocks'), (snapshot)=>{
            let piles= [];
            snapshot.forEach((childsnapshot)=>{
                piles.push(childsnapshot.val());
            })
            setStocks(piles);
        })
    }
    return (
        <div>
            <div>
                <CustNavBar></CustNavBar>
            </div>
            <div id="itembody">
                {stocks.map((item)=><Item data={item} key={Math.random() }></Item>)}
            </div>
            
        </div>
    )
}
export default CustomerView;