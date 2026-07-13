export default function Section({ id, num, title, sub, children }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <div className="section__head">
          {num && <span className="section__num">{num}</span>}
          <div>
            <h2 className="section__title">{title}</h2>
            {sub && <p className="section__sub">{sub}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}
