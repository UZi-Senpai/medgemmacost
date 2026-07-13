/**
 * DataTable — renders a markdown-style table definition.
 *
 * props:
 *  - columns: [{ key, label, render?, pill? }]
 *  - rows: [{ key: value | node }]
 *  - highlight: (row, colKey) => 'good' | 'best' | 'warn' | 'danger' | 'neon' | undefined
 *  - caption: optional text under the table
 */
export default function DataTable({ columns, rows, highlight, caption }) {
  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((c) => {
                  const val = row[c.key]
                  const tone = highlight && highlight(row, c.key)
                  const content = c.render ? c.render(val, row) : val
                  return (
                    <td key={c.key}>
                      {tone ? (
                        <span className={`pill pill--${tone}`}>{content}</span>
                      ) : (
                        content
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className="table-caption">{caption}</p>}
    </>
  )
}
