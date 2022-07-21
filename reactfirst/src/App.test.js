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

//assertions
describe('something truthy and falsy', () => { 
  test('true to be true', () => { 
    expect(true).toBeTruthy(); 
  }); 
  test('false to be false', () => { 
    expect(false).toBeFalsy(); 
  }); 
});