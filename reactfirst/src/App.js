import React from 'react';
import './App.css';


//reducer function
const storiesReducer = (state, action)=>{
 switch(action.type){
  case 'STORIES_FETCH_INIT':
    return{
      ...state,
      isLoading: true,
      isError: false
    };
    case 'STORIES_FETCH_SUCCESS':
    return{
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload      
    };
    case 'STORIES_FETCH_FAILURE':
    return{
      ...state,
      isLoading: false,
      isError: true
    };
    case 'REMOVE_STORY':
    return{
      ...state,
      data: state.data.filter(
        (story)=> action.payload.objectID !== story.objectID
      )
    };
    default:
      throw new Error();
 }
}

const App = () =>{
  // const initialStories = [ 
  //   { title: 'React',
  //    url: 'https://reactjs.org/',
  //     author: 'Jordan Walke',
  //     num_comments: 3,
  //     points: 4,
  //     objectID: 0,
  //  },
  //   { title: 'Redux',
  //    url: 'https://redux.js.org/',
  //     author: 'Dan Abramov, Andrew Clark',
  //      num_comments: 2,
  //       points: 5,
  //        objectID: 1,
  //  },
  // ];
  const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','react');
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
      data:[], 
      isLoading:false, 
      isError:false
    }
  );

  // const getAsyncStories = ()=>
  //  new Promise((resolve)=>
  //   setTimeout(
  //     ()=> resolve({data:{stories: initialStories}}),
  //     2000
  //     )
  //  );
  

  React.useEffect(()=>{
    if(!searchTerm) return;
   dispatchStories({type:'STORIES_FETCH_INIT'});

    fetch(`${API_ENDPOINT}${searchTerm}`).then((response)=>response.json())
   .then((result)=>{
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.hits
      });
    }).catch(()=>
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    );
  },[searchTerm]);


  const handleRemoveStory = (item)=>{

      dispatchStories({
        type: "REMOVE_STORY",
        payload: item
      });
  }

  const handleSearch = (event)=>{
    setSearchTerm(event.target.value);
  };

  // const searchedStories = stories.data.filter(function(story){
  //   return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // });

return(
    <div className="App">
    <InputWithLable 
      type={"text"}
      isFocused
      onInputChange={handleSearch}
      initVal={searchTerm} 
      label={'Search'}>
        <strong>Search:</strong>
      </InputWithLable>

    {stories.isError && <p>Something Went wrong.</p>}  
    {(stories.isLoading ? (<p>loading...</p>) : 
    ( <List list={stories.data}  onRemoveItem = {handleRemoveStory}/>) 
    )}
   
    </div>
)}

const useSemiPersistentState = (key,initialState)=>{

  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialState
  );

  React.useEffect(()=>{
    localStorage.setItem(key,value);
    console.log("useeffect");
  },[key,value]);
  
  return [value,setValue];
};

const List  = ({list, onRemoveItem}) =>( 
     <ul>{
      
      list.map((item)=> (
          <Item  key = {item.objectID} item={item} onRemoveItem = {onRemoveItem} />
      ))}
      </ul>
);


const Item = ({item, onRemoveItem})=>{

  return(
  <li>
  <a href = {item.url}>{item.title}</a><br></br>
  <span>author:{item.author}</span><br></br>
  <span>comment:{item.num_comments}</span><br></br>
  <span>points:{item.points}</span>
  <span>
    <button
    type="button" 
    onClick={()=>{
       onRemoveItem(item);
      }
    }>X</button>
  </span>
</li>
);
};
const InputWithLable  = ({initVal, onInputChange, label, type='text', children,isFocused,}) => {

  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  },[isFocused]); 

  return(
  <>
    <label htmlFor={label}>{children}</label>
    <input id={label}
      ref={inputRef}
      type={type}
      onChange={onInputChange} 
      value={initVal}/>
    <p>{initVal}</p>
  </>
  );
};
export default App;
