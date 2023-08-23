import './ListItem.css'
import CardItem from './CardItem';
function ListItem({ list }) {
    
    return (
        <div>
            {list.map((item) => <CardItem data={item} key={Math.random()}></CardItem>)}
        </div>
    );
}
export default ListItem;