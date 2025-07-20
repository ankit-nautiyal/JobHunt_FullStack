import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Home from '@/pages/Home'
import Jobs from '@/pages/Jobs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'


function App() {

  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Navbar />

          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/jobs' element={<Jobs />}></Route>
              {/* <Route path='browse/' element={<browse/>}></Route> */}
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App


