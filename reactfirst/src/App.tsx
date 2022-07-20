import React from 'react';
import axios from 'axios';
import { ReactComponent as Check } from './check.svg';
import './App.css';

//custom story type
type Story = { 
  objectID: string; 
  url: string; 
  title: string; 
  author: string; 
  num_comments: number; 
  points: number; 
};

const getSumComments = (stories:StoriesState) => 
  { console.log('C'); 
  return stories.data.reduce( 
    (result, value) => result + value.num_comments, 
    0 
    ); 
  };

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};
// type StoriesAction = {
//   type: string;
//   payload: any;
// };
interface StoriesFetchInitAction{
  type: 'STORIES_FETCH_INIT';
}
interface StoriesFetchSuccessAction{
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}
interface StoriesFetchFailureAction{
  type: 'STORIES_FETCH_FAILURE';
}
interface StroiesRemoveAction{
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction = 
| StoriesFetchInitAction
| StoriesFetchSuccessAction
| StoriesFetchFailureAction
| StroiesRemoveAction;
//reducer function
const storiesReducer = (
  state: StoriesState, 
  action: StoriesAction
)=>{
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

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>)=> void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>)=> void;
}
const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}:SearchFormProps)=>(
  <form  onSubmit={onSearchSubmit} className="search-form">
      <InputWithLable 
        type={"text"}
        isFocused
        onInputChange={onSearchInput}
        initVal={searchTerm} 
        label={'Search'}>
          <strong>Search:</strong>
        </InputWithLable>

        <button 
          type ="submit"
          disabled={!searchTerm}
          className="button button_large"
        >
          Submit
        </button>
    </form>
)


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
  console.log("B:APP");
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
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }

  const handleFetchStories = React.useCallback(()=>{
    if(!searchTerm) return;
   dispatchStories({type:'STORIES_FETCH_INIT'});

    axios(url)
   .then((result)=>{
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      });
    }).catch(()=>
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    );
  } 
  ,[url]);

  React.useEffect(()=>{
    handleFetchStories();
  },[handleFetchStories]);


  const handleRemoveStory = React.useCallback(
    (item: Story)=>{

      dispatchStories({
        type: "REMOVE_STORY",
        payload: item
      });
  }
  ,[]);

  // const searchedStories = stories.data.filter(function(story){
  //   return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // });
const sumComments = React.useMemo(
  ()=>getSumComments(stories),
  [stories]
)
return(
    <div className="App container">
      <h1 className='headline-primary'>My Hacker Stories with {sumComments} comments</h1>
    <SearchForm 
      searchTerm={searchTerm} 
      onSearchInput={handleSearch} 
      onSearchSubmit={handleSearchSubmit}
      />
    

    {stories.isError && <p>Something Went wrong.</p>}  
    {(stories.isLoading ? (<p>loading...</p>) : 
    ( <List list={stories.data}  onRemoveItem = {handleRemoveStory}/>) 
    )}
   
    </div>
)}

const useSemiPersistentState = (
  //argument type
  key:string, initialState:string
  //return type of the function first state and 
  //second updater funciton only take a string as 
  //an argument and return nothing:
  
  ):[string,(newValue:string)=>void]=>{
  var isMounted = React.useRef(false);

  var [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialState
  );

  React.useEffect(()=>{
   if(!isMounted.current){
    isMounted.current = true;
    // console.log("initial state, avoide render");
   }else{
    localStorage.setItem(key,value);
    // console.log("stored localStorage rendered");
   }
  },[key,value]);
  
  return [value,setValue];
};

type Stories = Array<Story>;
type ListProps = {
  list: Stories;
  onRemoveItem: (item:Story)=>void;
}
const List  = React.memo(
  ({list, onRemoveItem}: ListProps) => ( 
      <ul>{
        
        list.map((item)=> (
            <Item  key = {item.objectID} item={item} onRemoveItem = {onRemoveItem} />
        ))}
        </ul>
  )
);  
//custom story type
// type Story = { 
//   objectID: string; 
//   url: string; 
//   title: string; 
//   author: string; 
//   num_comments: number; 
//   points: number; 
// };
type ItemProps = {
  item:Story;
  onRemoveItem: (item:Story)=>void;
}

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
      <Check height="18px" width="18px"/>
      </button>
  </span>
</li>
);
};

type InputWithLableProps = {
  initVal: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  //telling compiler type property is optional by giving question mark
  type?: string;
  isFocused?: boolean;
  children: React.ReactNode;
}
const InputWithLable  = ({
  initVal, 
  onInputChange, 
  label, 
  type='text', 
  children,
  isFocused,
}:InputWithLableProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  },[isFocused]); 

  return(
  <>
    <label htmlFor={label} className="label">{children}</label>
    <input id={label}
      ref={inputRef}
      type={type}
      onChange={onInputChange} 
      value={initVal}
      className="input"
      />
  </> 
  );
};
export default App;
