import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { lessons, lessonById } from './lessons.js'
import { labs } from './labs.js'
import questions from './generated/questions.json'
import documents from './generated/documents.json'
import AlgorithmLibrary, { algorithmCount } from './AlgorithmLibrary.jsx'
import { conceptGuides } from './content/concepts.js'
import { glossary } from './content/glossary.js'

const examDate = new Date('2026-10-09T00:00:00+05:30')
const javaDiagnostic = 'J001 J007 J015 J022 J029 J034 J039 J043 J050 J055 J061 J066 J071 J076 J082 J087 J092 J097 J101 J107 J111 J116 J121 J126 J131 J136 J152 J044 J056 J067'.split(' ')
const daaDiagnostic = 'Q1 Q7 Q21 Q27 Q32 Q37 Q43 Q49 Q55 Q60 Q65 Q70 Q77 Q83 Q92 Q98 Q103 Q108 Q112 Q117 Q123 Q128 Q136 Q142 Q156 Q161 Q166 Q181 Q191 Q196'.split(' ')
const questionById = Object.fromEntries(questions.map((q) => [q.id, q]))
const sourceByPath = Object.fromEntries(documents.map((d) => [d.path, d]))

function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function getRoute() {
  const hash = decodeURIComponent(window.location.hash || '#/home')
  const parts = hash.replace(/^#\//, '').split('/')
  if (parts[0] === 'learn' && lessonById[parts[1]]) return { page: 'learn', id: parts[1] }
  if (parts[0] === 'library' && parts[1]) return { page: 'library', id: parts.slice(1).join('/') }
  if (parts[0] === 'algorithms') return { page: 'algorithms', id: parts[1] }
  if (['home', 'learn', 'practice', 'library', 'terms'].includes(parts[0])) return { page: parts[0] }
  return { page: 'home' }
}

function go(page, id) {
  window.location.hash = `#/${page}${id ? `/${encodeURIComponent(id)}` : ''}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function rangeIds(token) {
  const matched = token.match(/^([JQ])(\d+)(?:-([JQ])(\d+))?$/)
  if (!matched) return []
  const [, prefix, start, endPrefix, end] = matched
  if (endPrefix && endPrefix !== prefix) return []
  const first = Number(start)
  const last = end ? Number(end) : first
  return Array.from({ length: last - first + 1 }, (_, offset) => prefix === 'J' ? `J${String(first + offset).padStart(3, '0')}` : `Q${first + offset}`)
}

function lessonQuestions(lesson) {
  return [...new Set(lesson.quiz.flatMap(rangeIds))].map((id) => questionById[id]).filter(Boolean)
}

function Markdown({ children, onDocumentLink }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    a({ href = '', children: label }) {
      const name = href.split('#')[0]
      const found = documents.find((d) => d.path === name || d.name === name)
      if (found && onDocumentLink) {
        return <a href={`#/library/${encodeURIComponent(found.path)}`} onClick={(event) => { event.preventDefault(); onDocumentLink(found.path) }}>{label}</a>
      }
      return <a href={href} target="_blank" rel="noreferrer">{label}</a>
    },
  }}>{children}</ReactMarkdown>
}

let mermaidReady
function MermaidDiagram({ code, id }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(false)
  useEffect(() => {
    let live = true
    setSvg('')
    setError(false)
    const draw = async () => {
      try {
        if (!mermaidReady) {
          mermaidReady = import('mermaid').then(({ default: mermaid }) => {
            mermaid.initialize({
              startOnLoad: false,
              securityLevel: 'strict',
              theme: 'base',
              themeVariables: {
                primaryColor: '#e4f2f2', primaryTextColor: '#15263c', primaryBorderColor: '#3d8a91',
                lineColor: '#58808d', secondaryColor: '#f4eddb', tertiaryColor: '#eef2f7',
                fontFamily: 'Arial, sans-serif',
              },
              flowchart: { curve: 'basis', htmlLabels: false },
            })
            return mermaid
          })
        }
        const mermaid = await mermaidReady
        const result = await mermaid.render(`diagram-${id.replace(/[^a-z0-9]/g, '-')}`, code)
        if (live) setSvg(result.svg)
      } catch {
        if (live) setError(true)
      }
    }
    draw()
    return () => { live = false }
  }, [code, id])
  if (error) return <div className="diagram-error">Diagram unavailable. Reload this topic or use the rule and source notes.</div>
  return <div className="mermaid-stage" aria-label="Concept flowchart" dangerouslySetInnerHTML={{ __html: svg }} />
}

function ArrayVisual({ visual }) {
  return <div className="array-visual">
    {visual.rows.map((item) => <div className="array-row" key={item.label}>
      <div className="array-label">{item.label}</div>
      <div className="array-cells">{item.values.map((value, index) => <div key={index} className={`array-cell ${item.active?.includes(index) ? 'active' : ''} ${item.settled?.includes(index) ? 'settled' : ''} ${value === null ? 'empty' : ''}`}>
        <span>{value === null ? '·' : value}</span><small>{index}</small>
      </div>)}</div>
    </div>)}
    {visual.extra ? <div className="visual-extra">{visual.extra}</div> : null}
  </div>
}

const graphNodes = { A: [62, 110], B: [178, 52], C: [178, 172], D: [300, 72], E: [300, 172], F: [416, 110] }
const dijkstraEdges = [['A', 'B', '4'], ['A', 'C', '1'], ['C', 'B', '2'], ['B', 'D', '1'], ['C', 'D', '5']]
const bfsEdges = [['A', 'B', ''], ['A', 'C', ''], ['B', 'D', ''], ['C', 'E', ''], ['D', 'F', ''], ['E', 'F', '']]
function GraphVisual({ visual }) {
  const isBfs = visual.graph === 'bfs'
  const edges = isBfs ? bfsEdges : dijkstraEdges
  const nodes = isBfs ? ['A', 'B', 'C', 'D', 'E', 'F'] : ['A', 'B', 'C', 'D']
  return <div className="graph-visual">
    <svg viewBox="0 0 480 230" role="img" aria-label={isBfs ? 'BFS graph and current frontier' : 'Weighted graph and tentative shortest distances'}>
      {edges.map(([from, to, weight]) => {
        const [x1, y1] = graphNodes[from]; const [x2, y2] = graphNodes[to]
        return <g key={`${from}${to}`}><line x1={x1} y1={y1} x2={x2} y2={y2} className="graph-edge" />{weight ? <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5} className="graph-weight">{weight}</text> : null}</g>
      })}
      {nodes.map((node) => {
        const [x, y] = graphNodes[node]
        const state = node === visual.current ? 'current' : visual.frontier?.includes(node) ? 'frontier' : visual.visited?.includes(node) ? 'visited' : ''
        return <g key={node}><circle cx={x} cy={y} r="22" className={`graph-node ${state}`} /><text x={x} y={y + 5} textAnchor="middle" className="graph-node-text">{node}</text>{visual.distances ? <text x={x} y={y + 39} textAnchor="middle" className="graph-distance">{visual.distances[node]}</text> : null}</g>
      })}
    </svg>
    {isBfs ? <div className="queue-line"><span>Queue</span>{visual.queue.length ? visual.queue.map((node, index) => <b key={`${node}-${index}`}>{node}</b>) : <em>empty</em>}</div> : <div className="queue-line"><span>Settled</span>{visual.visited.length ? visual.visited.map((node) => <b key={node}>{node}</b>) : <em>none</em>}</div>}
  </div>
}

function EdgeVisual({ visual }) {
  const edges = [['AB', 1], ['BC', 2], ['AC', 3], ['CD', 4], ['BD', 5]]
  return <div className="edge-visual"><div className="edge-list">{edges.map(([edge, weight]) => <div key={edge} className={`edge-pill ${visual.selected.includes(edge) ? 'accepted' : ''} ${visual.rejected?.includes(edge) ? 'rejected' : ''} ${visual.active === edge ? 'active' : ''}`}>{edge}<strong>{weight}</strong></div>)}</div><div className="edge-summary"><span>Components <b>{visual.components}</b></span><span>Tree weight <b>{visual.weight}</b></span></div></div>
}

function BoardVisual({ visual }) {
  return <div className="board-visual"><div className="chess-board" role="img" aria-label={`4 by 4 chessboard with queens at columns ${visual.queens.join(', ')}`}>
    {Array.from({ length: 16 }, (_, index) => {
      const r = Math.floor(index / 4); const c = index % 4
      const queen = visual.queens[r] === c
      const trial = visual.active?.[0] === r && visual.active?.[1] === c
      return <div key={index} className={`chess-square ${(r + c) % 2 ? 'dark' : ''} ${trial ? visual.conflict ? 'conflict' : 'trial' : ''}`}>{queen ? '♛' : trial && visual.conflict ? '×' : ''}</div>
    })}
  </div><div className="board-note">Columns: {visual.queens.length ? visual.queens.join(' → ') : 'none yet'}</div></div>
}

function StageVisual({ visual }) {
  if (visual.type === 'arrays') return <ArrayVisual visual={visual} />
  if (visual.type === 'graph') return <GraphVisual visual={visual} />
  if (visual.type === 'edges') return <EdgeVisual visual={visual} />
  if (visual.type === 'board') return <BoardVisual visual={visual} />
  if (visual.type === 'stack') return <div className="stack-visual"><div className="stack-caption">Active call stack</div>{visual.calls.map((call, index) => <div className="stack-frame" key={`${call}-${index}`} style={{ marginLeft: `${index * 24}px` }}>{call}</div>)}<div className="visual-extra">latest return = {visual.result}</div></div>
  if (visual.type === 'items') return <div className="item-visual"><div className="item-list">{visual.items.map(([weight, value, ratio], index) => <div key={index} className={`item-card ${visual.active === index ? 'active' : ''} ${visual.done?.includes(index) ? 'done' : ''}`}><b>Item {index + 1}</b><strong>{weight}</strong><span>{value}</span><small>value / kg = {ratio}</small></div>)}</div><div className="visual-extra">{visual.total}</div></div>
  return null
}

function Lab({ labId }) {
  const lab = labs[labId]
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  useEffect(() => { setStep(0); setPlaying(false) }, [labId])
  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => setStep((current) => {
      if (current >= lab.frames.length - 1) { setPlaying(false); return current }
      return current + 1
    }), 1500 / speed)
    return () => window.clearInterval(timer)
  }, [playing, speed, lab.frames.length])
  const frame = lab.frames[step]
  return <section className="lab-shell" aria-label={`${lab.title} interactive lab`}>
    <div className="lab-heading"><div><span className="section-kicker">Interactive lab</span><h3>{lab.title}</h3><p>{lab.caption}</p></div><span className="frame-counter">{step + 1} / {lab.frames.length}</span></div>
    <div className="lab-stage"><div className="stage-topline"><b>{frame.label}</b><span>{frame.visual.extra || ''}</span></div><StageVisual visual={frame.visual} /></div>
    <div className="lab-explanation" aria-live="polite"><span>Notice</span><p>{frame.thought}</p></div>
    <div className="lab-controls">
      <button type="button" className="icon-button" onClick={() => { setPlaying(false); setStep(0) }} aria-label="Reset lab" title="Reset">↺</button>
      <button type="button" className="icon-button" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)) }} disabled={step === 0} aria-label="Previous step" title="Previous step">←</button>
      <button type="button" className="primary-button play-button" onClick={() => { if (step === lab.frames.length - 1) setStep(0); setPlaying((v) => !v) }}>{playing ? 'Pause' : step === lab.frames.length - 1 ? 'Replay' : 'Play'}</button>
      <button type="button" className="icon-button" onClick={() => { setPlaying(false); setStep((s) => Math.min(lab.frames.length - 1, s + 1)) }} disabled={step === lab.frames.length - 1} aria-label="Next step" title="Next step">→</button>
      <label className="speed-control">Speed <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option></select></label>
    </div>
    <input className="timeline" type="range" min="0" max={lab.frames.length - 1} value={step} onChange={(event) => { setPlaying(false); setStep(Number(event.target.value)) }} aria-label="Choose animation step" />
  </section>
}

function TopicCard({ lesson, done }) {
  return <a className="topic-card" href={`#/learn/${lesson.id}`}>
    <div className="topic-card-top"><span className={`lane lane-${lesson.lane.toLowerCase()}`}>{lesson.lane}</span><span>{lesson.days}</span></div>
    <h3>{lesson.title}</h3><p>{lesson.summary}</p>
    <div className="topic-card-bottom"><span>{lesson.lab ? 'Step lab + diagram' : 'Diagram + questions'}</span><b>{done ? 'Revisit' : 'Explore'} <span aria-hidden="true">↗</span></b></div>
  </a>
}

function ConceptExplanation({ id }) {
  const guide = conceptGuides[id]
  if (!guide) return null
  return <section className="guide-panel concept-explanation"><span className="section-kicker">Understand before memorizing</span><h2>{guide.heading}</h2><p>{guide.explain}</p><div className="why-box"><h3>A concrete example</h3><p>{guide.example}</p></div><h3>Why the rule holds</h3><p>{guide.why}</p><h3>Procedure for a paper trace</h3><ol className="plain-steps">{guide.steps.map((s,i)=><li key={i}>{s}</li>)}</ol><p className="scope-note">{guide.limit}</p>{guide.problems?.length ? <div className="related-problems">{guide.problems.map(n=><a key={n} href={`#/algorithms/${n}`}>LC {n} guide →</a>)}</div>:null}</section>
}

function Terms() {
  const [search,setSearch]=useState('')
  return <div className="page"><div className="page-intro"><span className="section-kicker">Plain-language glossary</span><h1>Give each term a concrete meaning.</h1><p>These terms keep the same meaning throughout the guides. Examples connect each definition to a state you can trace.</p></div><label className="search-field"><span className="sr-only">Search terms</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a technical term…" /></label><dl className="glossary-grid">{glossary.filter(g=>`${g.term} ${g.meaning}`.toLowerCase().includes(search.toLowerCase())).map(g=><div key={g.term}><dt>{g.term}</dt><dd>{g.meaning}</dd><dd className="term-example">{g.example}</dd></div>)}</dl></div>
}

function Home({ completed, attempts, onStartQuiz }) {
  const remaining = Math.ceil((examDate.getTime() - Date.now()) / 86400000)
  const routeIds = ['prefix', 'recursion', 'quicksort', 'merge', 'greedy', 'language']
  const route = routeIds.map((id) => lessonById[id])
  const correct = Object.values(attempts).filter((a) => a.lastCorrect).length
  return <div className="page home-page">
    <div className="hero"><div className="hero-copy"><span className="hero-tag">DAA exam workbench</span><h1>Understand the move.<br />Remember the rule.</h1><p>Watch algorithms change state, then answer the exact kind of question your exam asks.</p><div className="hero-actions"><button className="primary-button" onClick={() => go('algorithms', '238')}>Start with Product Except Self</button><button className="secondary-button" onClick={() => onStartQuiz('java-diagnostic')}>Try 30 Java MCQs</button></div><div className="hero-facts"><span><strong>{algorithmCount}</strong> problem guides</span><span><strong>{questions.length}</strong> questions</span><span><strong>offline</strong> after opening</span></div></div><div className="hero-art" aria-hidden="true"><div className="art-title">Partition in motion</div><div className="art-values"><span>60</span><span>50</span><span className="art-swap">20</span><span>70</span><span className="art-pivot">30</span></div><div className="art-line" /><div className="art-values art-result"><span className="art-good">20</span><span className="art-pivot">30</span><span>60</span><span>70</span><span>50</span></div><div className="art-caption">Pivot placed. The rest still needs work.</div></div></div>
    <div className="overview-row"><div className="overview-card exam-card"><span className="section-kicker">Exam route</span><strong>{remaining > 0 ? `${remaining} days to 9 Oct` : 'Revision remains open'}</strong><p>Focus first on coding foundations and the Java diagnostic.</p></div><div className="overview-card"><span className="section-kicker">Your progress</span><strong>{completed.filter(x=>!x.startsWith("lc-")).length} / {lessons.length} topics</strong><p>{correct} questions last answered correctly. Progress stays on this device.</p></div></div>
    <section className="section-block"><div className="section-head"><div><span className="section-kicker">First pass</span><h2>Learn these before the long bank</h2><p>A practical route through the announced coding areas, with MCQ-only depth nearby.</p></div><a className="text-button" href="#/learn">See all topics ↗</a></div><div className="route-list">{route.map((lesson, index) => <a className="route-item" key={lesson.id} href={`#/learn/${lesson.id}`}><span className="route-num">{String(index + 1).padStart(2, '0')}</span><div><b>{lesson.title}</b><small>{lesson.summary}</small></div><span className="route-meta">{completed.includes(lesson.id) ? 'Studied' : `${lesson.minutes} min`}</span><span aria-hidden="true">↗</span></a>)}</div></section>
    <section className="section-block practice-feature"><div><span className="section-kicker">Practice from your notes</span><h2>30 questions. 30 minutes.</h2><p>The Java diagnostic follows the 30 IDs named in your hard MCQ bank. Review explanations immediately after each attempt.</p></div><button className="primary-button" onClick={() => onStartQuiz('java-diagnostic')}>Start Java diagnostic</button></section>
  </div>
}

function LearnIndex({ completed }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const visible = lessons.filter((lesson) => (filter === 'All' || lesson.lane === filter) && `${lesson.title} ${lesson.summary} ${lesson.days}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="page"><div className="page-intro"><span className="section-kicker">Visual syllabus</span><h1>Choose a concept to move through</h1><p>Every topic has a compact rule, an exam trap, a diagram, and linked practice. Key algorithms have step controls.</p></div><div className="filter-toolbar"><div className="chip-group">{['All', 'Coding', 'MCQ', 'Exam'].map((lane) => <button key={lane} className={`filter-chip ${filter === lane ? 'selected' : ''}`} onClick={() => setFilter(lane)}>{lane}</button>)}</div><label className="search-field"><span className="sr-only">Search topics</span><input name="topic-search" autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search concepts…" /></label></div><div className="topic-grid">{visible.map((lesson) => <TopicCard key={lesson.id} lesson={lesson} done={completed.includes(lesson.id)} />)}</div>{visible.length === 0 ? <p className="empty-state">No topics match. Try a broader term.</p> : null}</div>
}

function LessonPage({ lesson, completed, onToggle, onStartQuiz }) {
  const related = lessonQuestions(lesson)
  return <div className="page lesson-page"><a className="back-link" href="#/learn">← All topics</a><div className="lesson-intro"><div><div className="lesson-meta"><span className={`lane lane-${lesson.lane.toLowerCase()}`}>{lesson.lane}</span><span>{lesson.days}</span><span>{lesson.minutes} min</span></div><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><button className={`mark-button ${completed.includes(lesson.id) ? 'marked' : ''}`} onClick={() => onToggle(lesson.id)}>{completed.includes(lesson.id) ? '✓ Studied' : 'Mark studied'}</button></div>
    <div className="lesson-layout"><div className="lesson-main"><ConceptExplanation id={lesson.id} /><div className="rule-panel"><div><span>The rule</span><p>{lesson.rule}</p></div><div><span>Exam trap</span><p>{lesson.trap}</p></div></div>{lesson.lab ? <Lab labId={lesson.lab} /> : null}<section className="diagram-panel"><div className="section-head"><div><span className="section-kicker">Flowchart</span><h2>How the idea moves</h2></div></div><MermaidDiagram code={lesson.diagram} id={lesson.id} /></section></div><aside className="lesson-side"><div className="side-panel"><span className="section-kicker">Keep in mind</span><ul>{lesson.points.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="side-panel"><span className="section-kicker">Apply it</span><p>{related.length} matching questions from your banks.</p><button className="primary-button full-width" onClick={() => onStartQuiz(`topic:${lesson.id}`)}>Practice this topic</button></div><div className="side-panel"><span className="section-kicker">Check the source</span><div className="source-links">{lesson.sources.map((name) => <a key={name} href={`#/library/${encodeURIComponent(name)}`}>{name} ↗</a>)}</div></div></aside></div>
  </div>
}

function makeQuizList(mode) {
  if (mode === 'java-diagnostic') return javaDiagnostic.map((id) => questionById[id]).filter(Boolean)
  if (mode === 'daa-diagnostic') return daaDiagnostic.map((id) => questionById[id]).filter(Boolean)
  if (mode === 'java-all') return questions.filter((q) => q.bank === 'java')
  if (mode === 'daa-all') return questions.filter((q) => q.bank === 'daa')
  if (mode.startsWith('topic:')) return lessonQuestions(lessonById[mode.slice(6)] || lessons[0])
  return []
}

function Quiz({ mode, setMode, attempts, onAttempt }) {
  const list = useMemo(() => makeQuizList(mode), [mode])
  const [index, setIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [seconds, setSeconds] = useState(1800)
  const allAnswered = list.length > 0 && Object.keys(responses).length === list.length
  useEffect(() => { setIndex(0); setResponses({}); setSeconds(1800) }, [mode])
  useEffect(() => {
    if (!mode.includes('diagnostic') || allAnswered || seconds === 0) return undefined
    const interval = window.setInterval(() => setSeconds((time) => Math.max(0, time - 1)), 1000)
    return () => window.clearInterval(interval)
  }, [mode, allAnswered, seconds === 0])
  const question = list[index]
  const title = mode.startsWith('topic:') ? `${lessonById[mode.slice(6)]?.title || 'Topic'} practice` : mode === 'java-diagnostic' ? 'Java diagnostic' : mode === 'daa-diagnostic' ? 'DAA diagnostic' : mode === 'java-all' ? 'Java code bank' : 'DAA concept bank'
  if (!question) return null
  const choice = responses[question.id] || ''
  const revealed = Boolean(choice)
  const answered = Object.keys(responses).length
  const correct = Object.entries(responses).filter(([id, selected]) => questionById[id]?.answer === selected).length
  const answer = (selected) => {
    if (!selected || responses[question.id]) return
    setResponses((current) => ({ ...current, [question.id]: selected }))
    onAttempt(question.id, selected === question.answer)
  }
  const next = () => { if (index < list.length - 1) { setIndex(index + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const previous = () => { if (index > 0) setIndex(index - 1) }
  return <div className="quiz-wrap">
    <div className="quiz-header"><div><button className="back-link" onClick={() => setMode('')}>← Practice modes</button><span className="section-kicker">{title}</span><h2>{question.id} — {question.title}</h2><p>{question.topic}</p></div><div className="quiz-metrics"><span>{index + 1} / {list.length}</span>{mode.includes('diagnostic') ? <strong className={seconds < 300 ? 'time-low' : ''}>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</strong> : null}</div></div>
    <div className="quiz-jump"><label>Jump to question <select aria-label="Jump to question" value={index} onChange={e=>setIndex(Number(e.target.value))}>{list.map((q,i)=><option key={q.id} value={i}>{q.id} · {q.title}</option>)}</select></label><button className="text-button" onClick={()=>{setResponses({});setIndex(0);setSeconds(1800)}}>Restart this round</button></div>
    <div className="quiz-progress"><span style={{ width: `${(answered / list.length) * 100}%` }} /></div>
    <article className="question-card"><div className="question-body"><Markdown>{question.prompt}</Markdown></div><div className="answer-options">{Object.entries(question.options).map(([letter, value]) => <button key={letter} className={`answer-option ${choice === letter ? 'chosen' : ''} ${revealed && letter === question.answer ? 'correct' : ''} ${revealed && choice === letter && choice !== question.answer ? 'wrong' : ''}`} onClick={() => answer(letter)} disabled={revealed}><span className="option-letter">{letter}</span><div><Markdown>{value}</Markdown></div></button>)}</div>{revealed ? <div className={`explanation ${choice === question.answer ? 'is-correct' : 'is-wrong'}`} aria-live="polite"><strong>{choice === question.answer ? 'Correct' : `Answer: ${question.answer}`}</strong><h3>Why this answer follows</h3><p className="answer-value">{question.answer}: {question.options[question.answer]}</p><Markdown>{question.explanation}</Markdown>{question.execution ? <details className="execution-detail"><summary>Check the Java reference behavior</summary>{question.execution.expected ? <><p>This output is for the exact snippet above. Different inputs can produce different results.</p><pre>{question.execution.expected}</pre></> : question.execution.mode === 'nonterminating' ? <p>This snippet does not reach its stopping condition. Review its call arguments without running it.</p> : question.execution.mode === 'compile_error' ? <p>This declaration fails to compile. It has no runtime output.</p> : <p>The snippet throws {question.execution.mode.split(':')[1]}. It does not complete normally.</p>}</details> : null}<a href="#/terms">Look up a technical term →</a></div> : <p className="quiz-hint">Choose an option to reveal the explanation.</p>}</article>
    <div className="quiz-nav"><button className="secondary-button" onClick={previous} disabled={index === 0}>Previous</button><div>{answered} answered · {correct} correct</div><button className="primary-button" onClick={next} disabled={index === list.length - 1}>Next question</button></div>
    {allAnswered && index === list.length - 1 ? <div className="quiz-result" aria-live="polite"><span className="section-kicker">Round complete</span><strong>{correct} / {list.length} correct</strong><p>Revisit missed questions with Previous, or choose another practice mode.</p><button className="secondary-button" onClick={() => setMode('')}>Choose another mode</button></div> : null}
    {mode.includes('diagnostic') && seconds === 0 && !allAnswered ? <p className="time-message">30 minutes reached. Finish the remaining questions for review.</p> : null}
  </div>
}

function Practice({ mode, setMode, attempts, onAttempt }) {
  if (mode) return <div className="page"><Quiz mode={mode} setMode={setMode} attempts={attempts} onAttempt={onAttempt} /></div>
  const attempted = Object.keys(attempts).length
  return <div className="page"><div className="page-intro"><span className="section-kicker">Active recall</span><h1>Test what the diagram taught</h1><p>All 410 questions are included. Start with a 30-question diagnostic, then target a bank or a topic. Explanations appear after your choice.</p></div><div className="practice-stat">{attempted} / {questions.length} distinct questions attempted on this device</div><div className="mode-grid"><button className="mode-card feature-mode" onClick={() => setMode('java-diagnostic')}><span className="lane lane-exam">Start here</span><h2>Java diagnostic</h2><p>30 code-analysis questions from the primary bank. The timer starts at 30 minutes.</p><b>Start diagnostic ↗</b></button><button className="mode-card" onClick={() => setMode('daa-diagnostic')}><span className="lane lane-mcq">Concepts</span><h2>DAA diagnostic</h2><p>30 questions across lecture concepts and algorithm assumptions.</p><b>Start diagnostic ↗</b></button><button className="mode-card" onClick={() => setMode('java-all')}><span className="lane lane-exam">160 questions</span><h2>Java code bank</h2><p>Output, intermediate states, bugs, complexity and repair.</p><b>Open bank ↗</b></button><button className="mode-card" onClick={() => setMode('daa-all')}><span className="lane lane-mcq">250 questions</span><h2>DAA concept bank</h2><p>Scenario questions across Days 1–27 and marked extensions.</p><b>Open bank ↗</b></button></div><div className="practice-note"><strong>Exam scope from the source notes</strong><p>Coding focuses on recursion, arrays/strings and greedy. Graphs, trees and the other DAA topics receive MCQ-depth practice. The actual 30 exam MCQs span subjects beyond this DAA package.</p></div></div>
}

function Library({ id }) {
  const [search, setSearch] = useState('')
  const selected = id ? sourceByPath[id] || documents.find((d) => d.name === id) : null
  const visible = documents.filter((doc) => `${doc.name} ${doc.path}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="page"><div className="page-intro"><span className="section-kicker">Source library</span><h1>Look up the exact detail</h1><p>These original source files preserve the notes, code, and validation evidence. Their wording is unchanged. Use the rewritten guides for study explanations.</p></div><div className="library-layout"><aside className="library-list"><label className="search-field"><span className="sr-only">Search source files</span><input name="source-search" autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a source file…" /></label><div>{visible.map((doc) => <a className={`library-item ${selected?.path === doc.path ? 'selected' : ''}`} key={doc.path} href={`#/library/${encodeURIComponent(doc.path)}`}><b>{doc.name}</b><small>{doc.path}</small></a>)}</div></aside><article className="document-panel">{selected ? <><div className="document-heading"><span className="section-kicker">{selected.type}</span><h2>{selected.name}</h2><p>{selected.path}</p></div>{selected.type === 'notes' ? <div className="document-content"><Markdown onDocumentLink={(path) => go('library', path)}>{selected.content}</Markdown></div> : <pre className="source-code"><code>{selected.content}</code></pre>}</> : <div className="library-placeholder"><div className="placeholder-glyph">⌁</div><h2>Choose a file</h2><p>Start with FS_START_HERE.md or open a source directly from a lesson.</p><a className="secondary-button" href="#/library/FS_START_HERE.md">Open start guide</a></div>}</article></div></div>
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const [completed, setCompleted] = useState(() => readStored('algorithm-atlas-completed-v1', []))
  const [attempts, setAttempts] = useState(() => readStored('algorithm-atlas-attempts-v1', {}))
  const [quizMode, setQuizMode] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  useEffect(() => { const update = () => { setRoute(getRoute()); setMobileNav(false); window.scrollTo({ top: 0, behavior: 'instant' }) }; window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  useEffect(() => { try { localStorage.setItem('algorithm-atlas-completed-v1', JSON.stringify(completed)) } catch {} }, [completed])
  useEffect(() => { try { localStorage.setItem('algorithm-atlas-attempts-v1', JSON.stringify(attempts)) } catch {} }, [attempts])
  const toggle = (id) => setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const attempt = (id, correct) => setAttempts((current) => ({ ...current, [id]: { count: (current[id]?.count || 0) + 1, lastCorrect: correct } }))
  const startQuiz = (mode) => { setQuizMode(mode); go('practice') }
  const nav = [['home', 'Overview'], ['learn', 'Learn visually'], ['algorithms', 'Problem library'], ['practice', 'Practice'], ['terms', 'Glossary'], ['library', 'Source library']]
  return <div className="app-shell"><a className="skip-link" href="#main">Skip to content</a><aside className={`sidebar ${mobileNav ? 'open' : ''}`}><a className="brand" href="#/home"><div className="brand-mark"><span /><span /><span /></div><div><strong>Algorithm Atlas</strong><small>DAA visual revision</small></div></a><div className="nav-heading">Workspace</div><nav aria-label="Main navigation">{nav.map(([page, label]) => <a key={page} href={`#/${page}`} className={`nav-item ${route.page === page ? 'active' : ''}`} aria-current={route.page === page ? 'page' : undefined}><span className={`nav-symbol nav-${page}`} aria-hidden="true" />{label}</a>)}</nav><div className="sidebar-bottom"><div className="offline-card"><span className="offline-dot" />Ready offline<p>Everything needed for study is in this build.</p></div><div className="sidebar-foot">Built from DS notes · transcripts omitted</div></div></aside><div className="main-shell"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav((v) => !v)} aria-label="Toggle menu">☰</button><div className="topbar-crumb">DS <span>/</span> {route.page === 'learn' && route.id ? lessonById[route.id].title : nav.find(([page]) => page === route.page)?.[1]}</div><div className="topbar-right"><span className="date-pill">Exam focus · 9 Oct 2026</span><span className="profile-dot">A</span></div></header><main id="main">{route.page === 'home' ? <Home completed={completed} attempts={attempts} onStartQuiz={startQuiz} /> : null}{route.page === 'learn' && !route.id ? <LearnIndex completed={completed} /> : null}{route.page === 'learn' && route.id ? <LessonPage lesson={lessonById[route.id]} completed={completed} onToggle={toggle} onStartQuiz={startQuiz} /> : null}{route.page === 'practice' ? <Practice mode={quizMode} setMode={setQuizMode} attempts={attempts} onAttempt={attempt} /> : null}{route.page === 'algorithms' ? <AlgorithmLibrary id={route.id} completed={completed} onToggle={toggle} /> : null}{route.page === 'terms' ? <Terms /> : null}{route.page === 'library' ? <Library id={route.id} /> : null}</main></div>{mobileNav ? <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileNav(false)} /> : null}</div>
}
