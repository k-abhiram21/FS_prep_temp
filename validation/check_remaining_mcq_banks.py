#!/usr/bin/env python3
"""Validate bank structure and execute code extracted from the actual Markdown.
No claim to mechanically prove prose, asymptotic arguments, or distractor uniqueness.
Requires Java 17+ and Python 3.10+; TensorFlow checks are explicitly optional.
"""
import argparse, collections, contextlib, io, json, os, pathlib, re, subprocess, sys, tempfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
INDEX=ROOT/'validation/remaining_mcq_checks.json'
def read_banks():
    data=json.loads(INDEX.read_text()); checks=[]
    for prefix,bank in data.items():
        md=(ROOT/bank['path']).read_text()
        chunks=re.findall(r'^### ('+prefix+r'\d{3})[^\n]*\n(.*?)(?=^### '+prefix+r'\d{3}|\Z)',md,re.M|re.S)
        assert len(chunks)==70==len(bank['questions']),prefix
        assert [i for i,_ in chunks]==[f'{prefix}{n:03}' for n in range(1,71)]
        assert md.count('<details>')==md.count('</details>')==70
        refs=dict(re.findall(r'^\[([^\]]+)\]: (.+)$',md,re.M))
        answers=collections.Counter()
        for meta,(identity,body) in zip(bank['questions'],chunks):
            assert meta['id']==identity
            options=dict(re.findall(r'^([ABCD])\. (.+)$',body,re.M))
            assert len(options)==4 and len(set(options.values()))==4,identity
            chosen=re.search(r'\*\*Correct: ([ABCD]) — (.*?)\*\*',body)
            assert chosen and options[chosen[1]]==chosen[2],identity
            assert body.index('<details>')>body.index('D. '),identity
            assert '**Why the other choices fail:**' in body,identity
            source=re.search(r'\*\*Rule/source:\*\* \[([^\]]+)\]',body)
            assert source and source[1] in refs,identity
            answers[chosen[1]]+=1
            codes=re.findall(r'```(?:java|python)\n(.*?)\n```',body,re.S)
            assert len(codes)==(1 if meta['lang'] else 0),identity
            if codes: checks.append(dict(meta,code=codes[0]))
        assert min(answers.values())>=10,(prefix,answers)
        sets=re.search(r'## Mixed revision sets\n(.*?)\n## ',md,re.S)[1]
        ids=re.findall(r'\[('+prefix+r'\d{3})\]',sets)
        assert len(ids)==len(set(ids))==70,prefix
        for name,target in refs.items():
            if not target.startswith('https://'): assert (ROOT/bank['path']).parent.joinpath(target).exists(),target
        print(prefix,': 70 questions; answer distribution',dict(sorted(answers.items())))
    return checks

def check_python(qs):
    counts=collections.Counter()
    with tempfile.TemporaryDirectory(prefix='fs-mcq-python-') as temp:
        for q in qs:
            f=pathlib.Path(temp)/(q['id']+'.py');f.write_text(q['code'])
            r=subprocess.run([sys.executable,'-W','ignore',str(f)],capture_output=True,text=True,timeout=5)
            verify(q,r)
            counts[q['mode']]+=1
    return counts

def verify(q,r):
    assert r.stdout.strip()==(q['expected'] or '').strip(),(q['id'],'output',q['expected'],r.stdout,r.stderr[-500:])
    if q['mode'].startswith('exception:'):
        error=q['mode'].split(':')[1]
        assert r.returncode and error in r.stderr,(q['id'],'exception',r.stderr)
    else: assert r.returncode==0,(q['id'],r.stderr)

def check_java(qs):
    counts=collections.Counter()
    with tempfile.TemporaryDirectory(prefix='fs-mcq-java-') as temp:
        files={}
        for q in qs:
            f=pathlib.Path(temp)/(q['id']+'.java')
            f.write_text(q['code'].replace('public class Main','public class '+q['id']))
            files[q['id']]=f
        valid=[str(files[q['id']]) for q in qs if q['mode']!='compile_error']
        r=subprocess.run(['javac','--release','17','-d',temp,*valid],capture_output=True,text=True,timeout=90)
        assert r.returncode==0,r.stderr
        for q in qs:
            if q['mode']=='compile_error':
                r=subprocess.run(['javac','--release','17',str(files[q['id']])],capture_output=True,text=True,timeout=15)
                assert r.returncode!=0,(q['id'],'unexpected compile success')
            elif q['mode']=='nonterminating':
                counts['compile-only nonterminating']+=1;continue
            else:
                r=subprocess.run(['java','-cp',temp,q['id']],capture_output=True,text=True,timeout=5)
                verify(q,r)
            counts[q['mode']]+=1
    return counts

def tf_worker(qs):
    # Called in the requested TensorFlow Python, using one backend with fresh per-question namespaces.
    os.environ.update(TF_CPP_MIN_LOG_LEVEL='3',TF_NUM_INTRAOP_THREADS='1',TF_NUM_INTEROP_THREADS='1',OMP_NUM_THREADS='1',CUDA_VISIBLE_DEVICES='-1')
    import tensorflow as tf
    counts=collections.Counter()
    for q in qs:
        out=io.StringIO();error=None
        with contextlib.redirect_stdout(out):
            try: exec(compile(q['code'],q['id'],'exec'),{'__name__':'__main__'})
            except Exception as e: error=e
        assert out.getvalue().strip()==(q['expected'] or '').strip(),(q['id'],q['expected'],out.getvalue(),error)
        if q['mode'].startswith('exception:'):
            assert error and type(error).__name__==q['mode'].split(':')[1],(q['id'],error)
        else: assert error is None,(q['id'],error)
        counts[q['mode']]+=1
    print('TensorFlow',tf.__version__,'Keras',tf.keras.__version__,dict(counts))

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--tf-python');parser.add_argument('--tf-worker',action='store_true');args=parser.parse_args()
    checks=read_banks()
    if args.tf_worker:
        tf_worker([q for q in checks if q['lang']=='tensorflow']);return
    print('Java:',dict(check_java([q for q in checks if q['lang']=='java'])))
    print('Python',sys.version.split()[0],':',dict(check_python([q for q in checks if q['lang']=='python'])))
    if args.tf_python:
        r=subprocess.run([args.tf_python,str(pathlib.Path(__file__).resolve()),'--tf-worker'],cwd=ROOT,text=True,capture_output=True,timeout=180)
        print(r.stdout);assert r.returncode==0,r.stderr
    else: print('SKIP: 24 TensorFlow snippets; supply --tf-python to execute them.')
    print('PASS: structure and requested executable checks. Prose/proofs require human review.')
if __name__=='__main__': main()
