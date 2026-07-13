import Nav from './components/Nav.jsx'
import Section from './components/Section.jsx'
import DataTable from './components/DataTable.jsx'
import Callout from './components/Callout.jsx'
import BreakEvenCalculator from './components/BreakEvenCalculator.jsx'

export default function App() {
  return (
    <div id="top">
      <Nav />

      {/* ---------------- HERO ---------------- */}
      <header className="hero">
        <div className="wrap">
          <span className="hero__eyebrow">
            <span className="dot" /> Hosting guide · July 2026
          </span>
          <h1>
            Run <span className="grad">MedGemma</span> anywhere.<br />
            Cloud vs. your own hardware.
          </h1>
          <p className="lead">
            A practical, no-nonsense breakdown of VRAM math, real GPU pricing, and the
            rent-vs-buy math — so you can pick the cheapest path to serve MedGemma 4B or 27B.
          </p>
          <div className="hero__meta">
            <span className="chip">⚡ Two model sizes · 4B &amp; 27B</span>
            <span className="chip">💾 Built on Gemma 3</span>
            <span className="chip">💲 Prices current-but-approximate</span>
          </div>

          <div className="hero__stats">
            <div className="stat">
              <div className="stat__num">~3 GB</div>
              <div className="stat__label">VRAM for 4B at Q4 — runs on a laptop</div>
            </div>
            <div className="stat">
              <div className="stat__num">1× 24 GB</div>
              <div className="stat__label">Card fits 27B at Q4 (RTX 3090 / 4090 / L4)</div>
            </div>
            <div className="stat">
              <div className="stat__num">$0.70/hr</div>
              <div className="stat__label">Rent an L4 on Koyeb — free when idle</div>
            </div>
            <div className="stat">
              <div className="stat__num">~$1,800</div>
              <div className="stat__label">Used RTX 3090 box — break-even in ~1–7 mo</div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- 1. SUMMARY ---------------- */}
      <Section id="summary" num="01" title="Summary" sub="The 30-second version.">
        <div className="prose">
          <ul>
            <li><strong>MedGemma is open-weight</strong> — free to download and run yourself. Two sizes: <strong>4B</strong> (small) and <strong>27B</strong> (large, higher quality). Both built on Gemma 3.</li>
            <li>The deciding factor for hardware is <strong>GPU memory (VRAM)</strong> — the model must fit inside it.</li>
            <li><strong>4B</strong> runs on almost anything. <strong>27B</strong> at normal compression fits on <strong>one 24 GB card</strong>.</li>
            <li><strong>Rent</strong> (by the hour, ideally scale-to-zero) for testing or occasional use. <strong>Buy</strong> a GPU box for steady use or to keep data in-house.</li>
          </ul>
        </div>
      </Section>

      {/* ---------------- 2. GLOSSARY ---------------- */}
      <Section id="glossary" num="02" title="Glossary" sub="Five terms that unlock the rest of this guide.">
        <DataTable
          columns={[
            { key: 'term', label: 'Term' },
            { key: 'meaning', label: 'Meaning' },
          ]}
          rows={[
            { term: <strong>VRAM</strong>, meaning: 'Graphics-card memory. The model must fit inside it. Most important number.' },
            { term: <strong>Quantization (Q4 / Q8 / FP16)</strong>, meaning: <>Compression. <strong>Q4</strong> = smallest, minor quality loss (normal choice). <strong>Q8</strong> = near-perfect. <strong>FP16</strong> = full size, no loss.</> },
            { term: <strong>KV cache</strong>, meaning: 'Extra memory used while processing long inputs. Budget spare VRAM for it.' },
            { term: <strong>Scale-to-zero</strong>, meaning: 'Server shuts off when idle, so idle time is free.' },
            { term: <strong>On-demand</strong>, meaning: 'Rent by the hour; pay whether busy or not.' },
          ]}
        />
      </Section>

      {/* ---------------- 3. VRAM ---------------- */}
      <Section id="vram" num="03" title="How VRAM is calculated" sub="The rule of thumb behind every number below.">
        <Callout variant="gradient" icon="idea" title="Rule of thumb">
          <p>~<strong>2 GB of memory per 1 billion parameters</strong> at full precision (FP16).</p>
        </Callout>

        <div className="grid cols-3" style={{ marginTop: 22 }}>
          <div className="card">
            <span className="tag pill pill--neon">FP16</span>
            <h3>Full precision</h3>
            <p>2 GB × params. No loss. Biggest footprint.</p>
          </div>
          <div className="card">
            <span className="tag pill pill--best">Q8</span>
            <h3>Half size</h3>
            <p>≈ FP16 ÷ 2. Near-perfect quality.</p>
          </div>
          <div className="card">
            <span className="tag pill pill--good">Q4</span>
            <h3>Quarter size</h3>
            <p>≈ FP16 ÷ 4. Minor loss — the normal choice.</p>
          </div>
        </div>

        <Callout variant="warn" icon="warn" title="Don't forget overhead">
          <p>Add <strong>~1–2 GB</strong> for KV cache and runtime overhead — more for very long inputs.</p>
        </Callout>

        <h3 style={{ marginTop: 34 }}>MedGemma 4B</h3>
        <DataTable
          columns={[
            { key: 'precision', label: 'Precision' },
            { key: 'calc', label: 'Calculation' },
            { key: 'weights', label: 'Weights' },
            { key: 'overhead', label: '+ overhead' },
            { key: 'total', label: 'Total needed' },
          ]}
          rows={[
            { precision: <strong>FP16</strong>, calc: <span className="num">4 × 2 GB</span>, weights: <span className="num">~8 GB</span>, overhead: <span className="num">+1.5 GB</span>, total: <strong>~9.5 GB</strong> },
            { precision: <strong>Q8</strong>, calc: <span className="num">8 ÷ 2</span>, weights: <span className="num">~4 GB</span>, overhead: <span className="num">+1.5 GB</span>, total: <strong>~5.5 GB</strong> },
            { precision: <strong>Q4</strong>, calc: <span className="num">8 ÷ 4</span>, weights: <span className="num">~2 GB</span>, overhead: <span className="num">+1 GB</span>, total: <strong>~3 GB</strong> },
          ]}
          highlight={(row, key) => (key === 'total' ? 'neon' : undefined)}
        />

        <h3 style={{ marginTop: 34 }}>MedGemma 27B</h3>
        <DataTable
          columns={[
            { key: 'precision', label: 'Precision' },
            { key: 'calc', label: 'Calculation' },
            { key: 'weights', label: 'Weights' },
            { key: 'overhead', label: '+ overhead' },
            { key: 'total', label: 'Total needed' },
          ]}
          rows={[
            { precision: <strong>FP16</strong>, calc: <span className="num">27 × 2 GB</span>, weights: <span className="num">~54 GB</span>, overhead: <span className="num">+2 GB</span>, total: <strong>~56 GB</strong> },
            { precision: <strong>Q8</strong>, calc: <span className="num">54 ÷ 2</span>, weights: <span className="num">~27 GB</span>, overhead: <span className="num">+2 GB</span>, total: <strong>~29 GB</strong> },
            { precision: <strong>Q4</strong>, calc: <span className="num">54 ÷ 4</span>, weights: <span className="num">~14–16 GB</span>, overhead: <span className="num">+2 GB</span>, total: <strong>~16–18 GB</strong> },
          ]}
          highlight={(row, key) => (key === 'total' ? 'neon' : undefined)}
        />

        <h3 style={{ marginTop: 34 }}>What fits where</h3>
        <DataTable
          columns={[
            { key: 'model', label: 'Model + precision' },
            { key: 'memory', label: 'Memory' },
            { key: 'card', label: 'Minimum card' },
          ]}
          rows={[
            { model: <strong>4B (any)</strong>, memory: <span className="num">3–10 GB</span>, card: 'Almost any modern GPU / laptop' },
            { model: <strong>27B Q4</strong>, memory: <span className="num">~16–18 GB</span>, card: 'One 24 GB card (RTX 3090 / 4090 / L4)' },
            { model: <strong>27B Q8</strong>, memory: <span className="num">~29 GB</span>, card: 'RTX 5090 (32 GB) or a 48 GB pro card' },
            { model: <strong>27B FP16</strong>, memory: <span className="num">~56 GB</span>, card: 'Data-center card (A100 / H100 80 GB)' },
          ]}
        />
      </Section>

      {/* ---------------- 4. RENT ---------------- */}
      <Section id="rent" num="04" title="Option A — Rent it (online)" sub="Three styles, three trade-offs.">
        <h3>The three styles</h3>
        <DataTable
          columns={[
            { key: 'style', label: 'Style' },
            { key: 'you', label: 'You do' },
            { key: 'best', label: 'Best for' },
            { key: 'downside', label: 'Downside' },
          ]}
          rows={[
            { style: <strong>Managed model (Google Vertex AI)</strong>, you: 'One-click deploy of official MedGemma', best: 'Sensitive-data workloads', downside: 'Priciest; Google-tied' },
            { style: <strong>Serverless GPU (Koyeb, RunPod, Modal)</strong>, you: 'Upload model; autoscales & idles off', best: 'Bursty / test traffic', downside: 'Cold start after idle' },
            { style: <strong>Raw GPU machine (RunPod, Lambda, Vast)</strong>, you: 'Install & run it yourself', best: 'Cheapest hourly compute', downside: 'You manage everything' },
          ]}
        />

        <h3 style={{ marginTop: 34 }}>Koyeb pricing <span className="pill pill--good" style={{ marginLeft: 8 }}>serverless · per-second · scale-to-zero</span></h3>
        <DataTable
          columns={[
            { key: 'gpu', label: 'GPU' },
            { key: 'mem', label: 'Memory' },
            { key: 'price', label: 'Price/hr' },
            { key: 'fits', label: 'Fits' },
          ]}
          rows={[
            { gpu: 'RTX-4000 Ada', mem: <span className="num">20 GB</span>, price: <strong>$0.50</strong>, fits: '4B; tight 27B-Q4' },
            { gpu: <strong>L4</strong>, mem: <span className="num">24 GB</span>, price: <strong>$0.70</strong>, fits: '4B; 27B Q4' },
            { gpu: 'RTX-A6000', mem: <span className="num">48 GB</span>, price: <strong>$0.75</strong>, fits: '27B Q8' },
            { gpu: 'L40S', mem: <span className="num">48 GB</span>, price: <strong>$1.20</strong>, fits: '27B Q8 (faster)' },
            { gpu: 'A100', mem: <span className="num">80 GB</span>, price: <strong>$1.60</strong>, fits: '27B FP16' },
            { gpu: 'H100', mem: <span className="num">80 GB</span>, price: <strong>$2.50</strong>, fits: '27B FP16 (fastest)' },
          ]}
          highlight={(row) => {
            if (row.gpu === 'L4' || (typeof row.gpu === 'object')) return 'best'
          }}
          caption="L4 at $0.70/hr is the sweet spot for 27B-Q4 testing — and it's free when idle."
        />

        <h3 style={{ marginTop: 34 }}>Same GPU, other providers (hourly)</h3>
        <DataTable
          columns={[
            { key: 'gpu', label: 'GPU' },
            { key: 'runpod', label: 'RunPod' },
            { key: 'lambda', label: 'Lambda' },
            { key: 'koyeb', label: 'Koyeb' },
            { key: 'spot', label: 'Cheapest spot' },
          ]}
          rows={[
            { gpu: <strong>RTX 4090 (24 GB)</strong>, runpod: '~$0.34', lambda: '—', koyeb: '—', spot: '~$0.34' },
            { gpu: <strong>L4 (24 GB)</strong>, runpod: '—', lambda: '—', koyeb: '$0.70', spot: '—' },
            { gpu: <strong>A100 (80 GB)</strong>, runpod: '$1.19–1.99', lambda: '$1.99', koyeb: '$1.60', spot: '~$0.60' },
            { gpu: <strong>H100 (80 GB)</strong>, runpod: '$1.99–2.69', lambda: '$3.29', koyeb: '$2.50', spot: '~$1.03–1.50' },
          ]}
          highlight={(row, key) => (key === 'spot' ? 'good' : undefined)}
        />

        <h3 style={{ marginTop: 34 }}>Monthly cost calculation (always-on)</h3>
        <Callout variant="gradient" icon="i" title="Formula">
          <p>price/hr × <strong>730 hours</strong> ≈ monthly cost (24/7).</p>
        </Callout>
        <DataTable
          columns={[
            { key: 'gpu', label: 'GPU' },
            { key: 'price', label: 'Price/hr' },
            { key: 'monthly', label: 'Monthly (× 730)' },
          ]}
          rows={[
            { gpu: 'L4 / RTX 4090 (24 GB)', price: <span className="num">$0.34–0.70</span>, monthly: <strong>$250–510</strong> },
            { gpu: 'L40S (48 GB)', price: <span className="num">$1.20</span>, monthly: <strong>$875</strong> },
            { gpu: 'A100 (80 GB)', price: <span className="num">$1.60</span>, monthly: <strong>$1,170</strong> },
            { gpu: 'H100 (80 GB)', price: <span className="num">$2.50</span>, monthly: <strong>$1,825</strong> },
          ]}
          highlight={(row, key) => (key === 'monthly' ? 'neon' : undefined)}
        />
        <p className="table-caption">
          With scale-to-zero, multiply by the fraction of the month the model is actually working.
          Example: L4 at $0.70/hr used 2 hrs/day ≈ 60 hrs/month ≈ <strong>~$42/month</strong>.
        </p>
      </Section>

      {/* ---------------- 5. BUY ---------------- */}
      <Section id="buy" num="05" title="Option B — Buy it (own hardware)" sub="Cards that run 27B at Q4, plus silent Mac options.">
        <h3>Cards that run 27B at Q4</h3>
        <DataTable
          columns={[
            { key: 'setup', label: 'Setup' },
            { key: 'cost', label: 'Card cost' },
            { key: 'notes', label: 'Notes' },
          ]}
          rows={[
            { setup: <strong>Used RTX 3090 (24 GB)</strong>, cost: <span className="num">$700–900</span>, notes: <span className="pill pill--best">Best value</span>, },
            { setup: 'RTX 4090 (24 GB)', cost: <span className="num">$1,600–2,000</span>, notes: 'Faster, new.' },
            { setup: 'RTX 5090 (32 GB)', cost: <span className="num">$2,000–2,500</span>, notes: 'Also fits 27B Q8.' },
            { setup: 'AMD RX 7900 XTX (24 GB)', cost: <span className="num">$800–900</span>, notes: 'Cheaper; needs Linux/ROCm setup.' },
            { setup: <strong>Full desktop build</strong>, cost: <span className="num">$2,000–4,000 total</span>, notes: 'Card + rest of PC.' },
          ]}
        />
        <p className="table-caption">For 4B only, you likely already own a capable GPU — near-zero added cost.</p>

        <div className="grid cols-2" style={{ marginTop: 28 }}>
          <div className="card">
            <span className="tag pill pill--neon">Silent</span>
            <h3>Quiet all-in-one: Apple Mac (unified memory)</h3>
            <DataTable
              columns={[
                { key: 'machine', label: 'Machine' },
                { key: 'cost', label: 'Cost' },
                { key: 'notes', label: 'Notes' },
              ]}
              rows={[
                { machine: <strong>Mac Mini M4 Pro (48 GB)</strong>, cost: <span className="num">~$2,000</span>, notes: 'Runs 27B, silent, low power' },
                { machine: 'Mac Studio (64 GB+)', cost: <span className="num">$2,500–4,000</span>, notes: 'Extra headroom' },
              ]}
            />
          </div>
          <div className="card">
            <span className="tag pill pill--warn">Heavy scale only</span>
            <h3>Data-center grade</h3>
            <DataTable
              columns={[
                { key: 'hw', label: 'Hardware' },
                { key: 'cost', label: 'Cost' },
                { key: 'reality', label: 'Reality check' },
              ]}
              rows={[
                { hw: <strong>A100 80 GB</strong>, cost: <span className="num">$15,000–18,000</span>, reality: 'Overkill for one model' },
                { hw: <strong>H100 80 GB</strong>, cost: <span className="num">$25,000+</span>, reality: 'Only at real scale' },
                { hw: '8×H100 server', cost: <span className="num">~$300,000</span>, reality: 'Not for single-model use' },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* ---------------- 6. CALCULATOR ---------------- */}
      <Section id="calculator" num="06" title="Rent vs. buy — break-even calculator" sub="Drag the slider. Watch the verdict flip in real time.">
        <Callout variant="gradient" icon="i" title="Formula">
          <p>hardware cost ÷ (rental price/hr × 730) = months to break even (if run 24/7).</p>
        </Callout>
        <BreakEvenCalculator />

        <div className="versus" style={{ marginTop: 28 }}>
          <div className="vs-col">
            <h3><span className="pill pill--good">Rent</span> Spiky / occasional load</h3>
            <ul>
              <li>Scale-to-zero is cheapest when usage is bursty.</li>
              <li>No upfront capital, no maintenance.</li>
              <li>Ideal for testing, demos, and CI workloads.</li>
            </ul>
          </div>
          <div className="vs-col">
            <h3><span className="pill pill--best">Buy</span> Steady load / data stays local</h3>
            <ul>
              <li>One 24 GB box (used RTX 3090) breaks even in ~1–7 months at heavy use.</li>
              <li>Data never leaves your premises — better for compliance.</li>
              <li>Predictable monthly power cost instead of metered compute.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------- 7. PRIVACY ---------------- */}
      <Section id="privacy" num="07" title="Data-privacy note" sub="It's a medical model — where the data lives matters.">
        <div className="grid cols-3">
          <div className="card">
            <span className="tag pill pill--best">Own hardware</span>
            <h3>Data stays on-prem</h3>
            <p>Data never leaves your premises — the strongest default for regulated workloads.</p>
          </div>
          <div className="card">
            <span className="tag pill pill--neon">Google Vertex AI</span>
            <h3>Cloud with a DPA</h3>
            <p>Cloud option that can sign a formal data-handling agreement for sensitive data.</p>
          </div>
          <div className="card">
            <span className="tag pill pill--warn">Cheap marketplaces</span>
            <h3>Testing only</h3>
            <p>Fine for testing on synthetic data — not for regulated real-world data.</p>
          </div>
        </div>
      </Section>

      {/* ---------------- FINAL ---------------- */}
      <section className="section">
        <div className="wrap">
          <div className="final">
            <span className="hero__eyebrow" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>
              <span className="dot" style={{ background: '#fff', boxShadow: 'none' }} /> One-line answer
            </span>
            <h2>The short version</h2>
            <p>
              <span className="kbd">4B</span> runs on almost any GPU.
              <span className="kbd">27B</span> fits on <span className="kbd">one 24 GB card</span>.
              Rent an <span className="kbd">L4 on Koyeb (~$0.70/hr, free when idle)</span> for testing;
              buy a <span className="kbd">used RTX 3090 box (~$1,800)</span> for steady use.
            </p>
            <div className="final__actions">
              <a className="btn-on-light" href="#calculator">Open the calculator ↑</a>
              <a className="btn-ghost-light" href="#top">Back to top ↑</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <div className="wrap footer__inner">
          <p>
            <strong>MedGemma Hosting Guide</strong> · Prepared July 2026.
            GPU prices move fast — treat figures as current-but-approximate and re-check before committing.
          </p>
          <p>Built with React + Vite · <a href="#top">↑ top</a></p>
        </div>
      </footer>
    </div>
  )
}
