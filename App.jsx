import Layout from './components/Layout.jsx';
import Home from './pages/home.jsx';

import { Profile } from './pages/Profile.jsx';
import Search from './pages/search.jsx';
import { Upload } from './pages/Upload.jsx';
import { Watch } from './pages/Watch.jsx';
import { Routes, Route } from "react-router-dom";
import WatchHistory from './pages/WatchHistory.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/history" element={<WatchHistory />} />
      </Routes>
    </Layout>
  );
}

export default App;
