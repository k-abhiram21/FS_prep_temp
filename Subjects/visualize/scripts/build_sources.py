"""Extract the selected college sources. Keep every original file intact."""
import hashlib, json, pathlib, zipfile, xml.etree.ElementTree as ET
from pypdf import PdfReader

site = pathlib.Path(__file__).resolve().parents[1]
repo = site.parents[1]
entries = [
    ('se-unit1', 'SE', 'SE/Unit-1 Software Engineering (1).pdf', list(range(15,56)), 'Process models, Agile and DevOps; viewer pages 15–55.'),
    ('se-unit2', 'SE', 'SE/Unit-2 Understanding Requirements.pdf', list(range(30,51))+list(range(57,67)), 'Git and GitHub; viewer pages 30–50 and 57–66.'),
    ('wt-async', 'WT', 'WT/UNIT III.pdf', list(range(15,30)), 'Callbacks, promises and async/await; viewer pages 15–29.'),
    ('wt-json', 'WT', 'WT/Unit 1_MongoDB.pdf', [8], 'Introductory JSON; viewer page 8. Other MongoDB chapters are outside this site.'),
    ('cn-unit1', 'CN', 'CN/CN_UNIT_1_NOTES.docx', None, 'OSI, Physical Layer and part of Data Link Layer. The preserved text also contains extra college topics.'),
    ('cn-unit2', 'CN', 'CN/CN UNIT-2 NOTES.docx', None, 'Flow/error control and medium access. Use the linked lessons to select the test topics.'),
    ('ai-part1', 'AI', 'AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf', list(range(16,55)), 'ANN foundations, training and TensorFlow; viewer pages 16–54.'),
    ('ai-part2', 'AI', 'AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf', list(range(2,22)), 'Regression and classification; viewer pages 2–21.'),
    ('ai-regression', 'AI', 'AI/SUPERVISED_LEARNING_REGRESSION.pdf', [2,3]+list(range(14,20)), 'Linear and logistic regression; viewer pages 2–3 and 14–19.')
]
sources=[]
for key,subject,relative,pages,scope in entries:
    path=repo/relative
    raw=path.read_bytes()
    if pages:
        reader=PdfReader(path)
        missing=[p for p in pages if p>len(reader.pages)]
        if missing: raise ValueError((relative,missing,len(reader.pages)))
        text='\n\n'.join(f'--- Viewer page {p} ---\n{reader.pages[p-1].extract_text() or "[No extractable text]"}' for p in pages)
    else:
        with zipfile.ZipFile(path) as z:
            root=ET.fromstring(z.read('word/document.xml'))
        ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        text='\n'.join(''.join(t.text or '' for t in p.findall('.//w:t',ns)) for p in root.findall('.//w:p',ns))
    sources.append(dict(id=key,subject=subject,path=relative,name=path.name,scope=scope,text=text,sha256=hashlib.sha256(raw).hexdigest()))
example_dir=repo/'WT/examples'
for path in sorted(example_dir.rglob('*')):
    if path.suffix not in ('.js','.html'):continue
    key='wt-example-'+str(len(sources))
    sources.append(dict(id=key,subject='WT',path=path.relative_to(repo).as_posix(),name=path.name,scope='Original class example; examples can have random outcomes. Teaching traces use fixed inputs.',text=path.read_text(encoding='utf-8-sig'),sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
(site/'src').mkdir(exist_ok=True)
(site/'src'/'sources.json').write_text(json.dumps(sources,ensure_ascii=False),encoding='utf-8')
print(f'Extracted {len(sources)} sources; {sum(len(s["text"]) for s in sources):,} text characters.')
