import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import Home from '@/pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Jobs from './pages/Jobs'

const appRouter= createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '/jobs',
    element: <Jobs/>,
  },
])

function App() {

  return (
    <>
      
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
