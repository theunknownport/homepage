import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Photo from './pages/Photo';
import Video from './pages/Video';
import Audio from './pages/Audio';
import ComputerScience from './pages/ComputerScience';
import CaseStudySxcloutVision from './pages/CaseStudySxcloutVision';
import CaseStudyJublasurium from './pages/CaseStudyJublasurium';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout component wraps all routes inside it */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/video" element={<Video />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/computer-science" element={<ComputerScience />} />
          <Route path="/case-study-sxclout-vision" element={<CaseStudySxcloutVision />} />
          <Route path="/case-study-jublasurium" element={<CaseStudyJublasurium />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;