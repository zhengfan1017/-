import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DogWalkList } from './pages/DogWalkList';
import { PublishDogWalk } from './pages/PublishDogWalk';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DogWalkList />} />
        <Route path="/publish" element={<PublishDogWalk />} />
      </Routes>
    </Router>
  );
}
