import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import { onValue, ref } from 'firebase/database'
import { auth, database } from '../../firebase'
import { useAuth } from '../../Context/AuthContext';
import './Homepage.css'
import { useHistory } from 'react-router-dom';
import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import Item from './CustomerPage/Item';
import NavBar from '../NavBar/NavBar';
import ItemPage from './ItemPageDisp/ItemPage';
function Homepage() {
    const {loginIn, currentUser} = useAuth()
    const [Rows, setRows] = useState([]);
    const [stocks, setStocks] = useState([]);
    useEffect(() => {
        getStocksAvail();
        onValue(ref(database, 'stocks'), (snapshot) => {
            let records = [];
            snapshot.forEach((childsnapshot) => {
                records.push(childsnapshot.val());
            })
            setRows(records);
        })
    }, [])
    function getStocksAvail(){
        onValue(ref(database, 'stocks'), (snapshot)=>{
            let piles= [];
            snapshot.forEach((childsnapshot)=>{
                piles.push(childsnapshot.val());
            })
            setStocks(piles);
        })
    }

    const column = [
        { heading: 'Full Name', value: 'ItemName' },
        { heading: 'Price', value: 'ItemPrice' },
        { heading: 'Quantity', value: 'ItemQuantity' }
    ]
    let history = useHistory()
    async function LoginwithGoogle(){
        let email = await loginIn();
        console.log(email)
        if(email=='mrunalmisale26@gmail.com' || email== '20102099.suhas.murthy@gmail.com'){
            history.push('./shop')
        }else{
            history.push('./customer')
        }
    }

    async function SignOut(){
        await signOut(auth);
        console.log("Sign Out Successful.")
    }

    return (
        <>
        <NavBar ></NavBar>
        <div id='homegrid'>
            {/* <Table data={Rows} column={column}></Table> */}
            <div style={{textAlign:'center',height:'50px'}} id="homegrid1">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"></link>
            <h3>For Exploring our Products :<br></br><br></br><button id="signin" onClick={LoginwithGoogle}><i class="fab fa-google fa-1x"></i> Sign in with Google </button></h3>

            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}
            {/* <button onClick={SignOut}><i class="fa fa-sign-out" aria-hidden="true"></i>Sign Out</button> */}
            </div>
            <div id="homegrid2">
            <div id="itembody">
                {stocks.map((item)=><ItemPage data={item} key={Math.random() }></ItemPage>)}
            </div>
            </div>
            </div>
        </>
    );
}
export default Homepage;