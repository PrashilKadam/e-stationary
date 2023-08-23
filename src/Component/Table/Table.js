function Table({data,column}){    
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        {column.map((item,index)=><TableHeadItem item={item} key={Math.random()}></TableHeadItem>)}
                    </tr>
                </thead>
                <tbody>
                {data.map((item)=><TableRow item={item} column={column} key={Math.random()}/>)}
                </tbody>
            </table>
        </div>
    );

    
}
const TableRow=({item,column})=>{
    
    return<tr>
        {column.map((columnItem)=>{
            return <td key={Math.random()}>{item[`${columnItem.value}`]}</td>
        })}
    </tr>
}

const TableHeadItem=({item})=>
    <th>{item.heading}</th>

export default Table;