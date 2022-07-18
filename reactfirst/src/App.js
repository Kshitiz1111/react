import React from 'react';
import './App.css';




const App = () =>{
  const initialStories = [ 
    { title: 'React',
     url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
   },
    { title: 'Redux',
     url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
       num_comments: 2,
        points: 5,
         objectID: 1,
   },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','react');
  const [stories, setStories] = React.useState([]);

  const getAsyncStories = ()=>
   new Promise((resolve)=>
    setTimeout(
      ()=> resolve({data:{stories: initialStories}}),
      2000
      )
   );
  

  React.useEffect(()=>{
    getAsyncStories().then(result=>{
      setStories(result.data.stories);
    })
  },[]);


  const handleRemoveStory = (item)=>{
    const newStories = stories.filter(
      (story)=> item.objectID !== story.objectID
      );
      setStories(newStories);
  }

  const handleSearch = (event)=>{
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(function(story){
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  });

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

    <List list={searchedStories}  onRemoveItem = {handleRemoveStory}/>
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
