import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { marked } from 'marked';
import { formatPostDate, getPostBySlug, resolvePostAssetUrl } from '../lib/posts.js';

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function injectDemoEmbeds(markdown, post) {
  return markdown.replace(/::demo\[(.+?)\]\((.+?)\)/g, (_match, title, source) => {
    const resolvedSource = resolvePostAssetUrl(post.sourcePath, source.trim());
    const safeTitle = escapeHtml(title.trim());
    const safeSource = escapeHtml(resolvedSource);

    return `
<section class="demo-embed">
  <div class="demo-embed__header">
    <span class="demo-embed__label">Live demo</span>
    <a class="demo-embed__link" href="${safeSource}" target="_blank" rel="noreferrer">Buka tab baru</a>
  </div>
  <iframe class="demo-embed__frame" src="${safeSource}" title="${safeTitle}" loading="lazy"></iframe>
</section>`;
  });
}

function rewriteEmbeddedAssetUrls(html, post) {
  const parsedDocument = new DOMParser().parseFromString(html, 'text/html');
  const attributesToResolve = ['src', 'href', 'poster'];

  for (const attributeName of attributesToResolve) {
    const elements = parsedDocument.querySelectorAll(`[${attributeName}]`);

    for (const element of elements) {
      const currentValue = element.getAttribute(attributeName);

      if (!currentValue) {
        continue;
      }

      const resolvedValue = resolvePostAssetUrl(post.sourcePath, currentValue);

      if (resolvedValue !== currentValue) {
        element.setAttribute(attributeName, resolvedValue);
      }
    }
  }

  return parsedDocument.body.innerHTML;
}

export default function BlogPost() {
  const { slug } = useParams();

  const post = useMemo(() => {
    const matchedPost = getPostBySlug(slug);

    if (!matchedPost) {
      return null;
    }

    const enhancedMarkdown = injectDemoEmbeds(matchedPost.content, matchedPost);
    const rawHtml = marked.parse(enhancedMarkdown);

    return {
      ...matchedPost,
      html: rewriteEmbeddedAssetUrls(rawHtml, matchedPost),
    };
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main className="nfo">
      <p className="nfo-nav">
        <Link to="/blog">[ notes ]</Link>
        <Link to="/">[ home ]</Link>
      </p>
      <p className="nfo-crumb">febro.one / notes / {post.slug}</p>

      <article>
        {post.coverImage ? <img src={post.coverImage} alt="" className="nfo-cover" /> : null}
        <time className="nfo-meta" dateTime={post.date}>{formatPostDate(post.date)}</time>
        <h1>{post.title}</h1>
        {post.description ? <p className="nfo-lead">{post.description}</p> : null}
        <div className="nfo-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
