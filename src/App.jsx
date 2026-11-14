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
    org: 'carv',
    href: 'https://carv.io',
    title: 'community moderator',
    when: 'feb 2024 – jan 2026',
    points: [
      'providing community support for global and regional users.',
      'grew the indonesia discord into a top 3 carv community, inside a 230k member network.',
      'ran daily live events such as game nights, quizzes, and campaign streams on twitch.',
      'sometimes creating tools for carv community xoxo.',
    ],
  },
  {
    org: 'anitya',
    href: 'https://anitya.space',
    title: 'ambassador',
    when: 'aug 2025 – sep 2025',
    points: [
      'designed a 3D gamified experience inside the anitya app.',
      'posted about the ecosystem on x.',
    ],
  },
];

const software = [
  { name: 'areyouai', href: 'https://github.com/AganFebro/areyouai', note: 'chatroom for ai agents' },
  { name: 'paylazor', href: 'https://github.com/AganFebro/paylazor', note: 'lazorkit solana checkout widget' },
  { name: 'fhast', href: 'https://github.com/AganFebro/fhast', note: 'download manager for windows and linux' },
  { name: 'neoland', href: 'https://github.com/AganFebro/neoland', note: 'nft marketplace on carv svm' },
  { name: 'forge ocr', href: 'https://github.com/AganFebro/forge-ocr', note: 'experimental ocr and auto-mining helper for roblox' },
  { name: 'kwitansi digital', href: 'https://github.com/AganFebro/Kwitansi-Digital', note: 'android app for printing receipts' },
  { name: 'youtube automation', href: 'https://github.com/AganFebro/yt-automation', note: 'youtube video automation using whisk api' },
  { name: 'kust widget', href: 'https://github.com/AganFebro/kust-widget', note: 'windows widget engine in rust' },
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
        <Link to="/notes">[ notes ]</Link>
      </p>

      <Textmode text={art} />
      <p className="nfo-kicker">NFO</p>

      <dl className="nfo-fields">
        <Field label="Handle">call me "febro"</Field>
        <Field label="Role">scripting, automation, even things like community management :)</Field>
        <Field label="Scene">web3 and software development</Field>
        <Field label="Active">.... yes?</Field>
        <Field label="Languages">indonesia and english</Field>
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
          well... im febrian, sometimes called by `febro` by my friends. i do a lot of tinkering with software, ai and crypto stuff.
          idk what else to write here but here's my fav music{' '}
          <a href="https://www.youtube.com/watch?v=55Qv-CuDl-4" target="_blank" rel="noopener noreferrer">東京スカパラダイスオーケストラ / めくれたオレンジ</a>
          {' '}(guess my music taste).
        </p>
      </section>

      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading">Roles</h2>
        <ol className="nfo-roles">
          {roles.map((role) => (
            <li key={role.org}>
              <a href={role.href} target="_blank" rel="noopener noreferrer">{role.org}</a>
              {` as ${role.title} in ${role.when}`}
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="software-heading">
        <h2 id="software-heading">software stuff</h2>
        <ul className="nfo-also">
          {software.map((item) => (
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
              <Link to={`/notes/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
