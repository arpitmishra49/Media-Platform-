import './App.css'
import Layout from './components/Layout.jsx';
import { Home } from './pages/home';

import { Profile } from './pages/Profile.jsx'
import { Upload } from './pages/Upload.jsx'
import { Watch } from './pages/Watch'
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Layout>    
   
  )
}

export default App