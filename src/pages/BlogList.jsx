import { Link } from 'react-router-dom';
import { formatPostDate, getAllPosts } from '../lib/posts.js';

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <main className="nfo">
      <p className="nfo-nav">
        <Link to="/">[ home ]</Link>
      </p>
      <p className="nfo-crumb">febro / notes</p>
      <h1>Notes</h1>

      {posts.length === 0 ? <p>No posts yet.</p> : null}

      <ul className="nfo-index">
        {posts.map((post) => (
          <li key={post.slug}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <Link to={`/notes/${post.slug}`}>{post.title}</Link>
            {post.description ? <span className="nfo-meta">{post.description}</span> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
