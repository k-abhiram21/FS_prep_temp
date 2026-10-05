#!/usr/bin/env python3
"""Compile every standalone Java MCQ. Run all bounded snippets, match outputs/errors.
Compile-only: explicitly nonterminating cases. Complexity proofs remain explanatory.
"""
from pathlib import Path
import collections,json,re,subprocess,tempfile,time
DS=Path(__file__).resolve().parents[1]
data=json.loads((DS/'validation/java_mcq_index.json').read_text());qs=data['questions']
assert data['count']==len(qs)==160
assert [q['id'] for q in qs]==list(range(1,len(qs)+1))
md=(DS/'FS_Java_Hard_MCQ_Bank.md').read_text()
assert md.count('```java')==len(qs) and md.count('<details>')==md.count('</details>')==len(qs)
assert '```cpp' not in md
blocks=re.findall(r'^### J\d{3}[^\n]*\n(.*?)(?=^### J\d{3}|\Z)',md,re.M|re.S)
assert len(blocks)==len(qs)
assert len(data['diagnostic'])==len(set(data['diagnostic']))==30
for q in qs:
 assert len(set(q['options']))==4 and q['options']['ABCD'.index(q['answer'])]==q['correct']
 assert 'public class Main' in q['code'] and 'public static void main' in q['code']
 block=blocks[q['id']-1]
 assert re.search(r'```java\n(.*?)\n```',block,re.S).group(1).rstrip('\n')==q['code'].rstrip('\n')
 for label,option in zip('ABCD',q['options']):assert label+'. '+option.replace('\n',' / ') in block
 assert '**'+q['answer']+'. '+q['correct'].replace('\n',' / ')+'**' in block
failures=[];counts=collections.Counter();started=time.monotonic()
with tempfile.TemporaryDirectory(prefix='fs-java-bank-') as temp:
 p=Path(temp);files=[]
 for q in qs:
  name=f"J{q['id']:03}";file=p/(name+'.java');file.write_text(q['code'].replace('public class Main','public class '+name))
  if q['mode']!='compile_error':files.append(str(file))
 compiled=subprocess.run(['javac','--release','17','-d',temp]+files,text=True,capture_output=True,timeout=60)
 if compiled.returncode:raise AssertionError(compiled.stderr)
 for q in qs:
  name=f"J{q['id']:03}";mode=q['mode']
  if mode=='compile_error':
   r=subprocess.run(['javac','--release','17',str(p/(name+'.java'))],text=True,capture_output=True,timeout=10)
   if r.returncode==0:failures.append((name,'expected compilation failure','compiled'))
   counts['verified compilation failures']+=1;continue
  if mode=='nonterminating':counts['compile-only nonterminating']+=1;continue
  r=subprocess.run(['java','-cp',temp,name],text=True,capture_output=True,timeout=3)
  out=r.stdout.strip();expected=(q['expected'] or '').strip()
  if mode.startswith('exception:'):
   ex=mode.split(':',1)[1]
   if r.returncode==0 or ('java.lang.'+ex not in r.stderr and 'java.util.'+ex not in r.stderr) or out!=expected:
    failures.append((name,q['title'],{'expected':expected,'stdout':out,'stderr':r.stderr[:300]}))
   counts['verified exception snippets']+=1
  else:
   if r.returncode!=0 or out!=expected:failures.append((name,q['title'],{'expected':expected,'stdout':out,'stderr':r.stderr[:300]}))
   counts['verified bounded outputs']+=1
 print(json.dumps({'counts':dict(counts),'failures':failures,'elapsed_seconds':round(time.monotonic()-started,2)},indent=2))
 if failures:raise SystemExit(1)
print('PASS: every Java-bank snippet compiled as intended; all bounded outputs/exceptions matched.')
