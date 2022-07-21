// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//suit and cases test//
// describe('something truthy and falsy', () => { 
//   it('true to be true', () => { 
//     expect(true).toBe(true); 
//   }); 
//   it('false to be false', () => { 
//     expect(false).toBe(false); 
//   }); 
// });

// //assertions
// describe('something truthy and falsy', () => { 
//   test('true to be true', () => { 
//     expect(true).toBeTruthy(); 
//   }); 
//   test('false to be false', () => { 
//     expect(false).toBeFalsy(); 
//   }); 
// });
import * as React from 'react';

import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLable,
  } from './App';

import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  };

  const storyTwo = {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
    };

    const stories = [storyOne, storyTwo];
    

// describe('storiesReducer',()=>{
//   test('removes a story from all stories', ()=>{
//     const action = { type: 'STORIES_FETCH_FAILURE', };
//     const state = { data: [], isLoading: false, isError: true };

//     const newState = storiesReducer(state,action);
//     const expectedState = {
//       data: [],
//       isLoading: false,
//       isError: true,
//       };

//     expect(newState).toStrictEqual(expectedState);
//   });
// });

// describe('Item', () => {
//   test('renders all properties', () => {
//     render(<Item item={storyOne} />);
//     screen.debug();
//   });
// });

describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={storyOne} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});