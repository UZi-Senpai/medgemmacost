const links = [
  { href: '#summary', label: 'Summary' },
  { href: '#glossary', label: 'Glossary' },
  { href: '#vram', label: 'VRAM' },
  { href: '#rent', label: 'Rent' },
  { href: '#buy', label: 'Buy' },
  { href: '#calculator', label: 'Break-even' },
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="brand" href="#top" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="brand__mark">M</span>
          <span className="brand__name">MedGemma<span> · Hosting Guide</span></span>
        </a>
        <nav className="nav__links hide-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a className="nav__cta" href="#calculator">Break-even calc →</a>
      </div>
    </header>
  )
}
