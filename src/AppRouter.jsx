import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import App from './App.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogPost from './pages/BlogPost.jsx';

function LegacyNoteRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/notes/${slug}` : '/notes'} replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/notes" element={<BlogList />} />
      <Route path="/notes/:slug" element={<BlogPost />} />
      <Route path="/blog" element={<LegacyNoteRedirect />} />
      <Route path="/blog/:slug" element={<LegacyNoteRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
