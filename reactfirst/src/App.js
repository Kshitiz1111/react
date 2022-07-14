import React from 'react';
import './App.css';




const App = () =>{
  const stories = [ 
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

  const [searchTerm, setSearchTerm] = React.useState('React');

  const eventHandler = (event)=>{
    setSearchTerm(event.target.value)
  };

  const searchedStories = stories.filter(function(story){
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  });

return(
    <div className="App">
    <Search onSearch={eventHandler} initVal={searchTerm}/>

    <List list={searchedStories}/>
    </div>
)}


const List  = (props) =>( 
     <ul>{
      
        props.list.map((item)=> (
          <Item  key = {item.objectID} item = {item} />
      ))}
      </ul>
);


const Item = (props)=>(
  <li>
  <a href = {props.item.url}>{props.item.title}</a><br></br>
  <span>author:{props.item.author}</span><br></br>
  <span>comment:{props.item.num_comments}</span><br></br>
  <span>points:{props.item.points}</span>

</li>
);

const Search  = (props) => {

return(
    <div>
      <label htmlFor='search'>Search</label>
      <input id="search" type="text" onChange={props.onSearch} value={props.initVal}></input>
      <p>{props.att}</p>
    </div>
);
}
export default App;
