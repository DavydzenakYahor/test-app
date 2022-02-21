import './App.css';
import LayoutComponent from './components/Layout/LayoutComponent';
import { BrowserRouter, Routes,Navigate,Route } from 'react-router-dom';
import UserContextProvider from './UserContext/UserContext';
import PostsComponent from './components/pages/Posts/Posts';
import Albums from './components/pages/Albums/Albums';
import Photos from './components/pages/Photos/Photos';
import Todos from './components/pages/Todos/Todos';
import UserPage from './components/pages/Users/Users';


const RoutesItem = () => {
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LayoutComponent/>} />
          <Route index element={<LayoutComponent/>} />
          <Route path='posts' element={<PostsComponent/>} />
          <Route path='albums' element={<Albums/>} />
          <Route path='albums/:id' element={<Photos/>} />
          <Route path='todos' element={<Todos/>} />
          <Route path='users' element={<UserPage/>} />
       
      </Routes>
    </BrowserRouter>
  )
}

function App() {

  return(
    <UserContextProvider>
        <RoutesItem/>
    </UserContextProvider>
   
  )

}

export default App;
