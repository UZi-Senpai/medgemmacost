import { useMemo, useState } from 'react'

const HOURS_PER_MONTH = 730

// Rental reference points (price/hr) used by the calculator
const RENTAL_OPTIONS = [
  { id: 'rtx4090', label: 'RTX 4090 (24 GB) — RunPod spot', rate: 0.34 },
  { id: 'l4', label: 'L4 (24 GB) — Koyeb', rate: 0.7 },
  { id: 'l40s', label: 'L40S (48 GB) — Koyeb', rate: 1.2 },
  { id: 'a100', label: 'A100 (80 GB) — Koyeb', rate: 1.6 },
  { id: 'h100', label: 'H100 (80 GB) — Koyeb', rate: 2.5 },
]

const PRESET_BUILDS = [
  { id: 'used3090', label: 'Used RTX 3090 box (~$1,800)', cost: 1800 },
  { id: 'new4090', label: 'New RTX 4090 box (~$3,200)', cost: 3200 },
  { id: 'macm4pro', label: 'Mac Mini M4 Pro 48 GB (~$2,000)', cost: 2000 },
]

export default function BreakEvenCalculator() {
  const [rentalId, setRentalId] = useState(RENTAL_OPTIONS[0].id)
  const [buildId, setBuildId] = useState(PRESET_BUILDS[0].id)
  const [hardwareCost, setHardwareCost] = useState(1800)
  const [hoursPerDay, setHoursPerDay] = useState(24) // 24 = always-on

  const rental = RENTAL_OPTIONS.find((r) => r.id === rentalId)

  // When the user picks a preset build, sync the cost field
  const onBuildChange = (id) => {
    setBuildId(id)
    const preset = PRESET_BUILDS.find((p) => p.id === id)
    if (preset) setHardwareCost(preset.cost)
  }

  const calc = useMemo(() => {
    const monthlyHours = (hoursPerDay / 24) * HOURS_PER_MONTH
    const monthlyCost = rental.rate * monthlyHours
    const yearlyCost = monthlyCost * 12
    const breakEvenMonths = monthlyCost > 0 ? hardwareCost / monthlyCost : Infinity
    return {
      monthlyHours: Math.round(monthlyHours),
      monthlyCost,
      yearlyCost,
      breakEvenMonths,
    }
  }, [rental, hoursPerDay, hardwareCost])

  const fmt = (n) =>
    isFinite(n)
      ? n.toLocaleString(undefined, { maximumFractionDigits: n >= 100 ? 0 : 1 })
      : '∞'
  const money = (n) => `$${fmt(n)}`

  const verdict =
    calc.breakEvenMonths <= 3
      ? { tone: 'good', text: 'Buying pays off fast — hardware makes sense at this usage.' }
      : calc.breakEvenMonths <= 8
      ? { tone: 'warn', text: 'Borderline. Buy only if you expect steady, multi-month usage.' }
      : { tone: 'danger', text: 'Renting wins. With this little usage, scale-to-zero is far cheaper.' }

  return (
    <div className="calc">
      <div className="calc__grid">
        <div>
          <label htmlFor="rental">Compare against renting</label>
          <select id="rental" value={rentalId} onChange={(e) => setRentalId(e.target.value)}>
            {RENTAL_OPTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} — ${r.rate.toFixed(2)}/hr
              </option>
            ))}
          </select>

          <label htmlFor="build">Hardware you'd buy</label>
          <select id="build" value={buildId} onChange={(e) => onBuildChange(e.target.value)}>
            {PRESET_BUILDS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>

          <label htmlFor="cost">Hardware cost (USD)</label>
          <input
            id="cost"
            type="number"
            min="0"
            step="50"
            value={hardwareCost}
            onChange={(e) => {
              setHardwareCost(Number(e.target.value) || 0)
              setBuildId('custom')
            }}
          />

          <label htmlFor="hours">
            Usage: <strong style={{ color: 'var(--text)' }}>{hoursPerDay} hrs / day</strong>
          </label>
          <div className="calc__range-wrap">
            <input
              id="hours"
              type="range"
              min="0"
              max="24"
              step="1"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
            />
            <span className="calc__range-val">
              {hoursPerDay === 24 ? '24/7' : `${hoursPerDay}h`}
            </span>
          </div>
        </div>

        <div className="calc__result">
          <div className="sub">Break-even in</div>
          <div className="big">{fmt(calc.breakEvenMonths)} mo</div>
          <div className="sub">until the hardware pays for itself</div>

          <div className="calc__rows">
            <div className="calc__row">
              <span>Monthly rental cost</span>
              <b>{money(calc.monthlyCost)}</b>
            </div>
            <div className="calc__row">
              <span>Yearly rental cost</span>
              <b>{money(calc.yearlyCost)}</b>
            </div>
            <div className="calc__row">
              <span>Hours billed / month</span>
              <b>{calc.monthlyHours} hrs</b>
            </div>
            <div className={`calc__row pill pill--${verdict.tone}`} style={{ border: 'none' }}>
              <span>{verdict.text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
