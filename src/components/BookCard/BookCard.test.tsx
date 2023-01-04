import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import BookCard from './BookCard'
import { mockedBooks } from "../../store/books";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("should contain an image ,compobox, 5 options, button, two paragraphs ", async () => {
   render(<Provider store={store}>
        <Router>
            <BookCard book={mockedBooks[0]} onChangeSelf={()=>{}}></BookCard>
        </Router>
    </Provider>)
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument();
    // const paragraph = screen.getByTestId("title")
    // expect(paragraph).toBeInTheDocument();
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument();
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(5);
    const user = userEvent.setup();
    //const option = screen.getByRole('option', { name: 'Read' }) as HTMLOptionElement
    //await user.selectOptions(select, option)
    //option = screen.getByRole('option', { name: 'Read' }) as HTMLOptionElement
    //expect(option.selected).toBe(true)

})
test("changeShelfMock should be called when changing the shelf in the options (read, currently reading, want to read, none)", async ()=>{
    const changeShelfMock = jest.fn();
    render(<Provider store={store}>
         <Router>
             <BookCard book={mockedBooks[0]} onChangeSelf={changeShelfMock}></BookCard>
         </Router>
     </Provider>)
   
     const select = screen.getByRole("combobox")
     const user = await userEvent.setup();
     let option = await screen.getByRole('option', { name: 'Read' }) as HTMLOptionElement
     await user.selectOptions(select, option);
     option = await screen.getByRole('option', { name: 'Read' }) as HTMLOptionElement
     expect(changeShelfMock).toBeCalledTimes(1);
})

// test("should navigate", async () => {
//     render(<Provider store={store}>
//         <Router>
//             <BookCard book={books[0]} onChangeSelf={() => {
//                 console.log("asas")
//             }}></BookCard>
//         </Router>
//     </Provider>)
//  const mockImpl = jest.fn().mockImplementation((to: any) => {
//     console.log('mocked to ', to);
//   });
  
//   const mockedUsedNavigate = jest.fn();
  
//   jest.mock('react-router-dom', () => ({
//       ...jest.requireActual('react-router-dom'),
//       useNavigate: mockedUsedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
//     }));
//     const mockedUseNavigatee = jest.fn() as jest.MockedFunction<typeof useNavigate>;
//     mockedUsedNavigate.mockImplementationOnce(() => mockImpl);
//     const user = await userEvent.setup();
//     const button = await screen.getByRole("button")
//     await expect(button).toBeInTheDocument();
//     await user.click(button);
//     expect(mockedUseNavigatee).toHaveBeenCalledTimes(1)

// })