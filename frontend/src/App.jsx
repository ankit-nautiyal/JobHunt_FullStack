import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import CompanyCreate from '@/components/admin/CompanyCreate';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import Home from '@/pages/Home';
import JobsPage from '@/pages/JobsPage';
import Browse from '@/pages/Browse';
import Profile from '@/pages/Profile';
import JobDescription from '@/pages/JobDescription';
import Companies from '@/pages/admin/Companies';
import CompanySetup from '@/pages/admin/CompanySetup';
import AdminJobs from '@/pages/admin/AdminJobs';
import PostJob from '@/pages/admin/PostJob';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';



function App() {

  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Navbar />

          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/jobs' element={<JobsPage />}></Route>
              <Route path='browse/' element={<Browse />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='jobs/:id/description' element={<JobDescription />}></Route>
              <Route path='browse/:id/description' element={<JobDescription />}></Route>

              //FOR ADMIN/RECRUITER
              <Route path='admin/companies' element={<Companies />}></Route>
              <Route path='admin/companies/create' element={<CompanyCreate />}></Route>
              <Route path='admin/companies/:id' element={<CompanySetup />}></Route>
              <Route path='admin/jobs' element={<AdminJobs />}></Route>
              <Route path='admin/jobs/create' element={<PostJob />}></Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App


