import { Link } from 'react-router-dom';
import art from '../ascii-text-art.txt?raw';
import Textmode from './components/Textmode.jsx';
import { formatPostDate, getAllPosts } from './lib/posts.js';

const links = [
  { label: 'X', href: 'https://twitter.com/febroriginal' },
  { label: 'Discord', href: 'https://discord.com/users/335738604901105667' },
  { label: 'Telegram', href: 'https://t.me/febri555' },
  { label: 'YouTube', href: 'https://www.youtube.com/@febroeth' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/febrian-a-aa5253256/' },
  { label: 'GitHub', href: 'https://github.com/AganFebro' },
];

const roles = [
  {
    org: 'CARV',
    href: 'https://carv.io',
    title: 'Community moderator',
    when: 'Feb 2024 – Jan 2026',
    points: [
      'Product support for global and regional users, including escalations.',
      'Grew the Indonesia Discord into a top 3 CARV community, inside a 230k member network.',
      'Ran daily live events: game nights, quizzes, and campaign streams on Twitch.',
      'Built the small ops tools around that: surveys, tournament registration, edited gaming videos.',
    ],
  },
  {
    org: 'Anitya',
    href: 'https://anitya.space',
    title: 'Ambassador',
    when: 'Aug 2025 – Sep 2025',
    points: [
      'Designed a 3D gamified experience inside the Anitya app.',
      'Posted about the ecosystem on X.',
    ],
  },
];

const builds = [
  {
    name: 'areyouai',
    meta: 'Go, Next.js',
    href: 'https://github.com/AganFebro/areyouai',
    copy: 'Agents find each other and talk in rooms. Turn-based engine, SSE streaming, recovery if the process dies.',
  },
  {
    name: 'Paylazor',
    meta: 'npm, Solana',
    href: 'https://github.com/AganFebro/paylazor',
    copy: 'Checkout widget for “Pay with Solana (USDC)”. Passkey wallets, gasless transactions.',
  },
  {
    name: 'fhast',
    meta: 'Rust',
    href: 'https://github.com/AganFebro/fhast',
    copy: 'Download manager. Windows app, terminal UI, CLI, and a Chrome extension. Resume, retry, SQLite.',
  },
  {
    name: 'NEOLAND',
    meta: 'Hackathon, winner',
    href: 'https://github.com/AganFebro/neoland',
    copy: 'NFT marketplace on CARV SVM. 3rd team’s choice, 1st community favorite.',
  },
];

const also = [
  { name: 'Forge OCR', href: 'https://github.com/AganFebro/forge-ocr', note: 'OCR and auto-mining helper for Roblox' },
  { name: 'Kwitansi Digital', href: 'https://github.com/AganFebro/Kwitansi-Digital', note: 'Android app for printing receipts' },
  { name: 'CARV Survey', href: 'https://github.com/AganFebro/CARV-Survey', note: 'Feedback after community activations' },
  { name: 'Gaming Leaderboard', href: 'https://github.com/AganFebro/CARV-Gaming-Leaderboard', note: 'Tournament board' },
  { name: 'Flask Web', href: 'https://github.com/AganFebro/flask-web', note: 'Notes and money tracking' },
  { name: 'Youtube Automation', href: 'https://github.com/AganFebro/yt-automation', note: 'ffmpeg, n8n, whisk-api' },
  { name: 'Kust Widget', href: 'https://github.com/AganFebro/kust-widget', note: 'Widget engine in Rust' },
  { name: 'Openclaw bridge', href: 'https://github.com/AganFebro/openclaw-opencode-bridge', note: 'Openclaw driving Opencode' },
];

function Field({ label, children }) {
  return (
    <div className="nfo-field">
      <dt><span>{label}</span></dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function App() {
  const posts = getAllPosts();

  return (
    <main className="nfo">
      <p className="nfo-nav">
        <Link to="/blog">[ notes ]</Link>
      </p>

      <Textmode text={art} />
      <h1>Febrian Avien Wibowo</h1>
      <p className="nfo-kicker">febro.one / personal release</p>

      <dl className="nfo-fields">
        <Field label="Handle">febro</Field>
        <Field label="Role">Community moderator</Field>
        <Field label="Scene">Web3 communities, tools</Field>
        <Field label="Active">Feb 2024 – Jan 2026</Field>
        <Field label="Languages">Indonesian, native. English, fluent.</Field>
        <Field label="Contact">
          <span className="nfo-links">
            {links.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            ))}
          </span>
        </Field>
      </dl>

      <section aria-labelledby="notes-release">
        <h2 id="notes-release">Release notes</h2>
        <p>
          Two years running live rooms at CARV. The Indonesia Discord grew into a top 3 community inside a 230k member network. I also build the tools those rooms actually use.
        </p>
      </section>

      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading">Roles</h2>
        <ol className="nfo-roles">
          {roles.map((role) => (
            <li key={role.org}>
              <a href={role.href} target="_blank" rel="noopener noreferrer">{role.org}</a>
              {` — ${role.title} — ${role.when}`}
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="files-heading">
        <h2 id="files-heading">File_id.diz</h2>
        <ul className="nfo-files">
          {builds.map((item) => (
            <li key={item.name}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a>
              <span className="nfo-meta">{item.meta}</span>
              <span className="nfo-copy">{item.copy}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="also-heading">
        <h2 id="also-heading">Also</h2>
        <ul className="nfo-also">
          {also.map((item) => (
            <li key={item.name}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a>
              <span>{item.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="notes-heading">
        <h2 id="notes-heading">Notes</h2>
        <ul className="nfo-index">
          {posts.map((post) => (
            <li key={post.slug}>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
