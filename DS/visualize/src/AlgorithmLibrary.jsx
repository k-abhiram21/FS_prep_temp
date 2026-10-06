import { useEffect, useMemo, useState } from 'react'
import problems from './generated/algorithms.json'
import { javaSolutions } from './content/java-solutions.js'
import { javaGuidance } from './content/java-guidance.js'

export const algorithmCount = problems.length
const priorityNames = { P1: 'First coding pass', P2: 'Next coding pass', D: 'Quick diagnostic', B: 'Broader coding', M: 'Paper trace first', L: 'Advanced extension', Later: 'Later revision' }
const priorities = Object.keys(priorityNames)
export function CriticalDecision({ decision, id }) {
  const binaryQuestion=/^(Is|Does|Do|Are|Have|Has|Did|Can|Will)\b/.test(decision.test)
  const [narrow,setNarrow]=useState(()=>window.matchMedia('(max-width:650px)').matches)
  useEffect(()=>{
    const media=window.matchMedia('(max-width:650px)')
    const update=()=>setNarrow(media.matches)
    media.addEventListener('change',update)
    return ()=>media.removeEventListener('change',update)
  },[])
  const wrap = (text, width=34) => {
    const lines = []; let current = ''
    for (const word of text.split(' ')) {
      if (current.length + word.length > width) { lines.push(current); current = word }
      else current += `${current ? ' ' : ''}${word}`
    }
    if (current) lines.push(current)
    return lines
  }
  const label = (text,x,y,width=34) => wrap(text,width).map((line,i,lines) => <tspan key={i} x={x} y={y+(i-(lines.length-1)/2)*19}>{line}</tspan>)
  return <figure className="decision-figure"><svg className={narrow?'is-narrow':''} viewBox={narrow?'0 0 370 470':'0 0 740 310'} role="img" aria-labelledby={`decision-title-${id} decision-desc-${id}`}>
    <title id={`decision-title-${id}`}>{decision.test}</title><desc id={`decision-desc-${id}`}>First outcome: {decision.yes} Alternative outcome: {decision.no}</desc>
    <defs><marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="currentColor" /></marker></defs>
    {narrow ? <>
    <path className="decision-line" d="M20 72 H8 V240 H29" markerEnd={`url(#arrow-${id})`} />
    <path className="decision-line" d="M350 72 H362 V395 H341" markerEnd={`url(#arrow-${id})`} />
    <polygon className="decision-test" points="185,8 350,72 185,136 20,72" />
    <text className="decision-label" textAnchor="middle">{label(decision.test,185,76,29)}</text>
    <text x="20" y="175" className="decision-branch">{binaryQuestion?'Yes':'First case'}</text>
    <text x="345" y="325" textAnchor="end" className="decision-branch">{binaryQuestion?'No':'Other case'}</text>
    <rect x="30" y="190" width="310" height="100" rx="12" className="decision-action" />
    <rect x="30" y="345" width="310" height="100" rx="12" className="decision-action alternate" />
    <text className="decision-label" textAnchor="middle">{label(decision.yes,185,244,31)}</text>
    <text className="decision-label" textAnchor="middle">{label(decision.no,185,399,31)}</text>
    </> : <>
    <path className="decision-line" d="M370 136 V160 H185 V193" markerEnd={`url(#arrow-${id})`} />
    <path className="decision-line" d="M370 160 H555 V193" markerEnd={`url(#arrow-${id})`} />
    <polygon className="decision-test" points="370,8 572,72 370,136 168,72" />
    <text className="decision-label" textAnchor="middle">{label(decision.test,370,76,36)}</text>
    <text x="200" y="179" className="decision-branch">{binaryQuestion?'Yes':'First case'}</text><text x="535" y="179" textAnchor="end" className="decision-branch">{binaryQuestion?'No':'Other case'}</text>
    <rect x="20" y="195" width="330" height="100" rx="12" className="decision-action" /><rect x="390" y="195" width="330" height="100" rx="12" className="decision-action alternate" />
    <text className="decision-label" textAnchor="middle">{label(decision.yes,185,249)}</text><text className="decision-label" textAnchor="middle">{label(decision.no,555,249)}</text>
    </>}
  </svg><figcaption>The diagram isolates one important decision. The numbered procedure gives the complete method.</figcaption></figure>
}

function WorkedTrace({ problem }) {
  const [step,setStep] = useState(0)
  useEffect(() => setStep(0), [problem.id])
  const frame = problem.trace[step]
  return <section className="walkthrough-panel" aria-label="Worked example"><div className="section-head"><div><span className="section-kicker">Worked example</span><h2>See why the state changes</h2></div><span>{step+1} / {problem.trace.length}</span></div><p className="example-contract">{problem.example}</p><div className="trace-state" aria-live="polite"><span>State {step+1}</span><strong>{frame.state}</strong><p>{frame.reason}</p></div><div className="trace-dots">{problem.trace.map((f,i) => <button aria-label={`Example step ${i+1}`} aria-current={i===step ? 'step' : undefined} className={i===step ? 'selected' : ''} key={i} onClick={() => setStep(i)}>{i+1}</button>)}</div><div className="trace-nav"><button className="secondary-button" onClick={() => setStep(Math.max(0,step-1))} disabled={step===0}>Previous state</button><button className="primary-button" onClick={() => setStep(Math.min(problem.trace.length-1,step+1))} disabled={step===problem.trace.length-1}>Next state</button></div></section>
}

function ProblemGuide({ problem, studied, onToggle }) {
  const [section,setSection] = useState('explain')
  const [copied,setCopied] = useState(false)
  useEffect(() => { setSection('explain'); setCopied(false) }, [problem.id])
  const code = javaSolutions[problem.id]
  const guidance = javaGuidance[problem.pattern]
  return <><a className="back-link" href="#/algorithms">← All problem guides</a><div className="problem-heading"><div><div className="lesson-meta"><span className="lane lane-coding">LC {problem.id}</span><span>{problem.pattern}</span><span>{priorityNames[problem.priority]}</span></div><h1>{problem.name}</h1><p>{problem.task}</p></div><button className={`mark-button ${studied ? 'marked' : ''}`} onClick={() => onToggle(`lc-${problem.id}`)}>{studied ? '✓ Studied' : 'Mark studied'}</button></div><div className="problem-tabs" role="tablist" aria-label="Problem guide sections">{[['explain','Understand'],['trace','Worked trace'],['java','Java plan']].map(([id,name]) => <button id={`tab-${id}`} role="tab" aria-selected={section===id} aria-controls={`panel-${id}`} className={section===id ? 'selected' : ''} key={id} onClick={() => setSection(id)} onKeyDown={event => { if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) { event.preventDefault(); const ids=['explain','trace','java']; const next=event.key==='Home' ? 0 : event.key==='End' ? 2 : (ids.indexOf(section)+(event.key==='ArrowRight'?1:2))%3; setSection(ids[next]); document.getElementById(`tab-${ids[next]}`)?.focus() } }} tabIndex={section===id ? 0 : -1}>{name}</button>)}</div>
  <div role="tabpanel" id={`panel-${section}`} aria-labelledby={`tab-${section}`}>
  {section==='explain' ? <div className="problem-layout"><div><section className="guide-panel"><span className="section-kicker">Start with a direct method</span><h2>What repeated work can we remove?</h2><p>{problem.baseline}</p><div className="why-box"><h3>Why this method works</h3><p>{problem.why}</p></div></section><section className="guide-panel"><span className="section-kicker">Procedure</span><h2>Build the algorithm one step at a time</h2><ol className="algorithm-steps">{problem.steps.map((step,i) => <li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{step}</p></li>)}</ol></section><section className="guide-panel"><span className="section-kicker">Decision flow</span><h2>The comparison that controls the next move</h2><CriticalDecision decision={problem.decision} id={`lc-${problem.id}`} /></section></div><aside className="problem-aside"><section className="cost-panel"><span className="section-kicker">Cost and assumptions</span><h3>{problem.time}</h3><p>{problem.space}</p><small>n usually means input length. The guide defines other variables where needed. Output storage is listed separately.</small></section><section className="guide-panel edge-case"><h3>Where an answer can go wrong</h3><p>{problem.edge}</p></section><section className="guide-panel"><h3>Check the contract</h3><p>{problem.relation}. Priority is a revision recommendation. It does not predict the test.</p><p>{problem.reportedSolved ? 'Your pasted inventory reports this problem as solved.' : 'This problem was absent from your pasted solved inventory.'}</p><a href={problem.url} target="_blank" rel="noreferrer">Open the original task ↗</a></section><button className="primary-button full-width" onClick={() => setSection('trace')}>Trace the example →</button></aside></div> : null}
  {section==='trace' ? <WorkedTrace problem={problem} /> : null}
  {section==='java' ? <section className="guide-panel java-panel"><span className="section-kicker">Java implementation</span><h2>{code ? 'A method you can compile and test' : 'Translate the procedure into Java'}</h2>{code ? <><p>Add <code>import java.util.*;</code> above a class. Place these static methods inside it, including any helpers shown below.</p><p>These are local reference signatures. Adapt the class and method signature to the judge. The examples were checked with Java 17.</p><pre><code>{code}</code></pre><button className="secondary-button" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true) } catch { setCopied(false) } }}>{copied ? 'Copied' : 'Copy Java method'}</button></> : <><p>This guide provides a construction plan. It does not contain a complete Java implementation for this problem.</p><ol className="plain-steps">{problem.steps.map((step,i) => <li key={i}>{step}</li>)}</ol></>}{guidance ? <div className="java-construction"><h3>Choose the Java state and collection types</h3><p>{guidance.setup}</p><ol className="plain-steps">{guidance.steps.map((step,i)=><li key={i}>{step}</li>)}</ol></div> : null}<div className="why-box"><h3>Check before submitting</h3><p>{problem.edge}</p><p>Use <code>Integer.compare</code> for integer comparators. Use <code>long</code> before arithmetic that can exceed <code>int</code>.</p><p>Use <code>ArrayDeque</code> for stacks and queues. Copy mutable result paths before later changes.</p></div></section> : null}
  </div></>
}

export default function AlgorithmLibrary({ id,completed,onToggle }) {
  const [search,setSearch] = useState('')
  const [pattern,setPattern] = useState('All')
  const [priority,setPriority] = useState('All')
  const [status,setStatus] = useState('All')
  const patterns = [...new Set(problems.map(p=>p.pattern))].sort()
  const selected = problems.find(p=>String(p.id)===id)
  const visible = useMemo(() => problems.filter(p => (pattern==='All'||p.pattern===pattern) && (priority==='All'||p.priority===priority) && (status==='All'||(status==='Studied'?completed.includes(`lc-${p.id}`):!completed.includes(`lc-${p.id}`))) && `${p.id} ${p.name} ${p.pattern} ${p.task}`.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>priorities.indexOf(a.priority)-priorities.indexOf(b.priority)||a.id-b.id), [search,pattern,priority,status,completed])
  if (id && !selected) return <div className="page"><h1>Problem guide not found</h1><p>This library contains the problems recorded in your repository.</p><a href="#/algorithms">Open all guides →</a></div>
  if (selected) return <div className="page algorithm-page"><ProblemGuide problem={selected} studied={completed.includes(`lc-${selected.id}`)} onToggle={onToggle} /></div>
  return <div className="page"><div className="page-intro"><span className="section-kicker">Algorithm library · Java study route</span><h1>Learn the reason behind every move.</h1><p>All {problems.length} problems from your solved inventory and practice pool have a procedure, a decision diagram, and a worked trace.</p></div><div className="library-summary"><div><strong>144</strong><span>Reported solved</span></div><div><strong>29</strong><span>Added practice</span></div><div><strong>{completed.filter(x=>x.startsWith('lc-')).length}</strong><span>Guides studied</span></div><a href="#/algorithms/238">Suggested first guide: Product Except Self →</a></div><div className="algorithm-filters"><label>Find a problem<input aria-label="Search problems" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, LC number, or method…" /></label><label>Method<select value={pattern} onChange={e=>setPattern(e.target.value)}><option>All</option>{patterns.map(p=><option key={p}>{p}</option>)}</select></label><label>Study priority<select value={priority} onChange={e=>setPriority(e.target.value)}><option value="All">All priorities</option>{priorities.map(p=><option value={p} key={p}>{priorityNames[p]}</option>)}</select></label><label>Progress<select value={status} onChange={e=>setStatus(e.target.value)}>{['All','Not studied','Studied'].map(p=><option key={p}>{p}</option>)}</select></label></div><p className="result-count">{visible.length} matching guides · Each diagram shows a critical decision. Each trace uses a fixed example.</p><div className="algorithm-grid">{visible.map(p=><a className="algorithm-card" key={p.id} href={`#/algorithms/${p.id}`}><div><span className="problem-number">LC {p.id}</span><span className={`priority-badge priority-${p.priority}`}>{p.priority}</span></div><h2>{p.name}</h2><p>{p.task}</p><footer><span>{p.pattern}</span><b>{completed.includes(`lc-${p.id}`)?'✓ Studied':'Open guide →'}</b></footer></a>)}</div>{!visible.length?<p className="empty-state">No matching problems. Clear a filter or use a different search term.</p>:null}</div>
}
