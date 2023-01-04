import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '../src/store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { Search } from './Pages/Search/Search';
import { RootLayout } from './Pages/RootLayout';
import { BookDetails } from './components/BookDetails/BookDetails';
import { getBook } from './store/booksSlice';

const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children: [
      {index:true, element:<Home/>},
      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/:id",
        element:<BookDetails/>,
        loader:(data)=>{
          let x = store.dispatch(getBook({id:data.params.id}));
          return x;
        }
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
);

