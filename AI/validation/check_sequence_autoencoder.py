#!/usr/bin/env python3
"""Check the supplement's structure and execute code extracted from its Markdown.

TensorFlow is optional; use --tf-python with an existing CPU environment.
These checks verify arithmetic/runtime claims, not every prose claim or distractor.
"""
import argparse
import collections
import contextlib
import io
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile

AI = Path(__file__).resolve().parents[1]
BANK = AI / 'FS_AI_Sequence_Autoencoder_Supplement.md'
INDEX = Path(__file__).with_name('sequence_mcq_checks.json')


def read_questions():
    md = BANK.read_text()
    body = md.split('<!-- AI-EXTRA-MCQ-START -->')[1].split('<!-- AI-EXTRA-MCQ-END -->')[0]
    chunks = re.findall(r'^### (AIX\d{3})[^\n]*\n(.*?)(?=^### AIX\d{3}|\Z)', body, re.M | re.S)
    meta = json.loads(INDEX.read_text())
    assert [key for key, _ in chunks] == [f'AIX{n:03}' for n in range(1, 41)]
    assert len(meta) == body.count('<details>') == body.count('</details>') == 40
    refs = dict(re.findall(r'^\[([^\]]+)\]: (.+)$', md, re.M))
    distribution = collections.Counter()
    executable = []
    answers = {}
    for item, (key, chunk) in zip(meta, chunks):
        assert item['id'] == key
        options = dict(re.findall(r'^([ABCD])\. (.+)$', chunk, re.M))
        assert len(options) == len(set(options.values())) == 4, key
        correct = re.search(r'\*\*Correct: ([ABCD]) — (.*?)\*\*', chunk)
        assert correct and options[correct[1]] == correct[2], key
        answers[key] = correct[2]
        distribution[correct[1]] += 1
        assert chunk.index('<details>') > chunk.index('D. '), key
        wrong = re.findall(r'^- \*\*([ABCD]):\*\* .+', chunk, re.M)
        assert set(wrong) == set('ABCD') - {correct[1]} and len(wrong) == 3, key
        source = re.search(r'\*\*Source:\*\* \[([^\]]+)\]', chunk)
        assert source and source[1] in refs, key
        codes = re.findall(r'```python\n(.*?)\n```', chunk, re.S)
        assert len(codes) == bool(item['engine']), key
        if codes:
            assert item['engine'] in ('python', 'tensorflow'), key
            assert item['expected'] in correct[2], key
            executable.append(dict(item, code=codes[0]))
    diagnostic = re.search(r'^\*\*Diagnostic:\*\* (.+)$', body, re.M)[1]
    ids = re.findall(r'\[(AIX\d{3})\]', diagnostic)
    assert len(ids) == len(set(ids)) == 12 and set(ids) <= set(answers)
    assert min(distribution.values()) >= 5, distribution
    print('Structure: 40 questions; 120 wrong-option explanations; distribution', dict(sorted(distribution.items())))
    return executable, answers


def numerical_checks(answers):
    """Independently recompute closed-form results, including values without code."""
    u, d = 4, 3
    assert str(u * d + u * u + u) in answers['AIX001']
    forward = lambda w: w * (w * 1 + 2) + 3
    step = 1e-5
    derivative = (forward(2 + step) - forward(2 - step)) / (2 * step)
    assert math.isclose(derivative, 6, rel_tol=1e-8)
    assert answers['AIX003'] == f'{float(forward(2))} {float(round(derivative))}'
    assert math.isclose(0.5 ** 20, 1 / 2 ** 20)
    cell = 0.5 * 2 + 0.25 * (-0.8)
    assert f'c={cell:.1f},h={0.5 * math.tanh(cell):.4f}.' == answers['AIX012']
    assert math.isclose(0.9 ** 100, 2.6561398887587544e-5, rel_tol=1e-12)
    assert answers['AIX017'] == f'0.5 {0.5 * math.tanh(0.5):.6f}'
    assert answers['AIX022'] == str(round(0.75 * 2 + 0.25 * (-0.4), 6))
    assert answers['AIX025'] == f'{3*u*(d+u+1)} {3*u*(d+u+2)}'
    rows = [[(0-1)**2, (1-3)**2], [(1-1)**2, (1-1)**2]]
    scores = [sum(row)/len(row) for row in rows]
    assert answers['AIX033'] == f'{scores} {sum(scores)/len(scores)}'
    assert answers['AIX037'] == str(round(1 + math.sqrt(4) * (-0.5), 6))
    assert answers['AIX039'].endswith(str(4*2+2+2*4+4))
    print('Numerics: recurrent gradient, retention products, gates, parameters, losses and VAE scale passed')


def check_python(questions):
    selected = [q for q in questions if q['engine'] == 'python']
    with tempfile.TemporaryDirectory(prefix='fs-ai-sequence-') as temp:
        for q in selected:
            path = Path(temp) / (q['id'] + '.py')
            path.write_text(q['code'])
            result = subprocess.run([sys.executable, str(path)], text=True, capture_output=True, timeout=10)
            assert result.returncode == 0, (q['id'], result.stderr)
            assert result.stdout.strip() == q['expected'], (q['id'], result.stdout, q['expected'])
    print(f'Python: {len(selected)} Markdown examples passed')


def check_tensorflow(questions):
    os.environ.update(TF_CPP_MIN_LOG_LEVEL='3', TF_NUM_INTRAOP_THREADS='1',
                      TF_NUM_INTEROP_THREADS='1', OMP_NUM_THREADS='1', CUDA_VISIBLE_DEVICES='-1')
    import tensorflow as tf
    selected = [q for q in questions if q['engine'] == 'tensorflow']
    for q in selected:
        out = io.StringIO()
        with contextlib.redirect_stdout(out):
            exec(compile(q['code'], q['id'], 'exec'), {'__name__': '__main__'})
        assert out.getvalue().strip() == q['expected'], (q['id'], out.getvalue(), q['expected'])
    print(f'TensorFlow {tf.__version__}; Keras {tf.keras.__version__}: {len(selected)} Markdown examples passed')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--tf-python')
    parser.add_argument('--tf-worker', action='store_true', help=argparse.SUPPRESS)
    args = parser.parse_args()
    questions, answers = read_questions()
    if args.tf_worker:
        check_tensorflow(questions)
        return
    numerical_checks(answers)
    check_python(questions)
    if args.tf_python:
        subprocess.run([args.tf_python, str(Path(__file__).resolve()), '--tf-worker'], check=True, timeout=180)
    else:
        print('TensorFlow not executed: supply --tf-python to run the 10 remaining examples')


if __name__ == '__main__':
    main()
