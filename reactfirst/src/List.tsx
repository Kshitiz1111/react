import React from "react";
import { sortBy } from 'lodash';
type Story = { 
    objectID: string; 
    url: string; 
    title: string; 
    author: string; 
    num_comments: number; 
    points: number; 
  };
type Stories = Array<Story>;
type ListProps = {
  list: Stories;
  onRemoveItem: (item:Story)=>void;
}

type ItemProps = {
    item:Story;
    onRemoveItem: (item:Story)=>void;
  }

const SORTS:any = {
    NONE: (list:Stories) => list,
    TITLE: (list:Stories) => sortBy(list, 'title'),
    AUTHOR: (list:Stories) => sortBy(list, 'author'),
    COMMENT: (list:Stories) => sortBy(list, 'num_comments').reverse(),
    POINT: (list:Stories) => sortBy(list, 'points').reverse(),
};

const List  = React.memo(({list, onRemoveItem}: ListProps) => {
    const [sort, setSort] = React.useState('NONE');

    const handleSort = (sortKey:string)=>{
        setSort(sortKey);
    };
    const sortFunction = SORTS[sort as keyof any];
    const sortedList = sortFunction(list);

    return( 
        <div>
            <div>
                <span>
                    <button type="button" onClick={() => handleSort('TITLE')}>
                        Title
                    </button>
                </span>
                <span>
                    <button type="button" onClick={() => handleSort('AUTHOR')}>
                        Author
                    </button>
                </span>
                <span>
                    <button type="button" onClick={() => handleSort('COMMENT')}>
                        COMMENT
                    </button>
                </span>
                <span>
                    <button type="button" onClick={() => handleSort('POINT')}>
                        POINT
                    </button>
                </span>
            </div>
            <ul>{
            
            sortedList.map((item:Story)=> (
                <Item  key = {item.objectID} item={item} onRemoveItem = {onRemoveItem} />
            ))}
            </ul>
        </div>
    )
});  


  const Item = ({item, onRemoveItem}: ItemProps)=>{
    return(
    <li className='item'>
    <span style={{ width: '40%' }}>
    <a href = {item.url} >{item.title}</a>
    </span>
    
    <span style={{ width: '30%' }}>author:{item.author}</span>
    <span style={{ width: '10%' }}>comment:{item.num_comments}</span>
    <span style={{ width: '10%' }}>points:{item.points}</span>
    <span style={{ width: '10%' }}>
      <button
      type="button" 
      onClick={()=>{
         onRemoveItem(item);
        }}
        className="button button_small"
        >
        {/* <Check height="18px" width="18px"/> */}
        </button>
    </span>
  </li>
  );
  };

  export {List};