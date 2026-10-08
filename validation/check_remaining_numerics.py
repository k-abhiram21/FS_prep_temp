#!/usr/bin/env python3
"""Independent numeric calculations compared with the actual CN/AI answer text.
Not a proof of every prose claim. Uses only the Python standard library.
"""
from pathlib import Path
import math,re
ROOT=Path(__file__).resolve().parents[1]
answers={}
for subject in ['CN','AI']:
    md=(ROOT/subject/f'FS_{subject}_Hard_MCQ_Bank.md').read_text()
    for identity,body in re.findall(r'^### ('+subject+r'\d{3})[^\n]*\n(.*?)(?=^### '+subject+r'\d{3}|\Z)',md,re.M|re.S):
        answers[identity]=re.search(r'\*\*Correct: [ABCD] — (.*?)\*\*',body)[1]
count=0
def check(identity,phrase):
    global count
    assert phrase in answers[identity],(identity,phrase,answers[identity])
    count+=1
check('CN013',f'{2000*int(math.log2(16)):,} bit/s')
check('CN014',f'{2*3000*int(math.log2(8))//1000} kb/s')
check('CN015',f'{int(1e6*math.log2(1+15)/1e6)} Mb/s')
check('CN016',f'log₂({int(1+10**(30/10))})')
check('CN018',f'{int((1000*8/2e6+200e3/2e8)*1000)} ms')
check('CN020',f'{int(2*(1000*8/1e6+0.001)*1000)} ms')
check('CN021',f'{int(10e6*0.020):,} bits')
check('CN029',f'{4+2*6} ms')
# Insert a zero after a data run of five ones, without processing the delimiter.
bits='01111110';stuffed=[];run=0
for bit in bits:
    stuffed.append(bit);run=run+1 if bit=='1' else 0
    if run==5:stuffed.append('0');run=0
check('CN031',''.join(stuffed))
check('CN036',f'Detect up to {4-1} errors, or correct up to {(4-1)//2} error')
r=next(r for r in range(1,20) if 2**r>=11+r+1)
check('CN037',str(r)+',')
# Hamming positions indexed one-based; compute each parity from its coverage mask.
word=[0,0,0,1,0,0,1,1]
for parity in [1,2,4]:word[parity]=sum(word[i] for i in range(1,8) if i&parity)%2
check('CN038',''.join(map(str,word[1:])))
check('CN039',f'Position {0*1+1*2+1*4}.')
sum_words=0xf0+0x30
while sum_words>0xff:sum_words=(sum_words&0xff)+(sum_words>>8)
check('CN041',f'{(~sum_words)&0xff:02X} hex')
def mod_poly(dividend,divisor):
    while dividend and dividend.bit_length()>=divisor.bit_length():
        dividend^=divisor<<(dividend.bit_length()-divisor.bit_length())
    return dividend
message=int('1101',2);generator=int('1011',2);degree=generator.bit_length()-1
remainder=mod_poly(message<<degree,generator);codeword=(message<<degree)|remainder
assert mod_poly(codeword,generator)==0
check('CN044',f'{codeword:07b}')
# Exhaustively check the burst guarantee for this generator on an 8-bit codeword span.
for length in range(1,degree+1):
    for burst in range(1<<(length-1),1<<length):
        if burst&1:
            for shift in range(9-length):assert mod_poly(burst<<shift,generator)!=0
check('CN049','5/6')
check('CN052',f'{round(100*2/(2+2*9))}%')
check('CN053',f'{math.ceil((2+2*9)/2)} frames')
check('CN056',str(2**3-1)+'.')
check('CN057',str(2**3//2)+'.')
check('CN058',','.join(str((6+i)%8) for i in range(4)))
check('CN064','1/(2e) atG=0.5')
check('CN067',f'{int(10e6*2*25e-6)} bits')
check('CN070',f'{64-14-4-20} bytes')
check('AI003',f'{sum((p-y)**2 for p,y in zip([2,5],[1,3]))/2}.')
check('AI005',f'{10**2}/{9+10**2}')
# Estimate gradients by central differences, independently of the stated derivative formulas.
def derivative(f,x):return (f(x+1e-5)-f(x-1e-5))/(2e-5)
f=lambda w:sum((w*x-y)**2 for x,y in zip([1,2],[2,4]))/2
check('AI006','−'+str(round(-derivative(f,0)))+'.')
wgrad=derivative(lambda w:(2*w-1)**2,0)
bgrad=derivative(lambda b:(b-1)**2,0)
check('AI007',f'w={round(-0.1*wgrad,1)},b={round(-0.1*bgrad,1)}')
wnew=1-1.1*derivative(lambda w:w*w,1)
check('AI008',f'−{round(-wnew,1)}');check('AI008',str(round(wnew*wnew,2)))
check('AI012','−'+str(int(-(1-12/4)))+'.')
check('AI017',f'{30/(30+10):.2f} and{30/(30+20):.2f}')
assert math.isclose(2*1*0.5/(1+0.5),2/3)
check('AI019','2/3')
check('AI020',f'{20}/{20+15}')
check('AI024',f'{-math.log(0.01):.3f} versus{-math.log(0.4):.3f}')
z=sum(x*w for x,w in zip([2,-1],[3,4]))-1
check('AI031',f'z={z}, output{max(0,z)}')
check('AI034',f'{3*4+4+4*2+2}.')
check('AI036',f'{round(derivative(lambda w:(4*w*2)**2,3))}.')
check('AI040',f'{5*math.ceil(100/32)}.')
print(f'PASS: {count} selected numeric answers checked; Hamming/CRC construction and burst checks passed.')
