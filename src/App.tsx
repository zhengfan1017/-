
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DogWalkList } from './pages/DogWalkList';
import { PublishDogWalk } from './pages/PublishDogWalk';

export default function App() {
  return (
    &lt;Router&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;DogWalkList /&gt;} /&gt;
        &lt;Route path="/publish" element={&lt;PublishDogWalk /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Router&gt;
  );
}

