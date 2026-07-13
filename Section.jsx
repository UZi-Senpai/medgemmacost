export default function Callout({ variant = 'gradient', icon = 'i', title, children }) {
  const glyphs = { info: 'i', tip: '✓', warn: '!', danger: '✕', good: '✓', idea: '★' }
  return (
    <div className={`callout callout--${variant}`}>
      <div className="callout__icon">{glyphs[icon] || icon}</div>
      <div>
        {title && <strong>{title}</strong>}
        {children}
      </div>
    </div>
  )
}
