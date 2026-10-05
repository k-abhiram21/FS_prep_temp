#!/usr/bin/env python3
"""Repeatable structural checks, selected independent MCQ oracles, C++/Java runs.
Run from any directory. No downloads or submissions. Binaries use TemporaryDirectory.
"""
from pathlib import Path
import collections,itertools,json,math,os,re,subprocess,tempfile
DS=Path(__file__).resolve().parents[1]
data=json.loads((DS/'validation/mcq_index.json').read_text())
qs=data['questions'];new=[q for q in qs if 'legacy' not in q];bytitle={q['title']:q for q in new}
assert len(qs)==data['count']==250
assert [q['id'] for q in qs]==list(range(1,251))
assert len(bytitle)==len(new)==220
assert len(set(data['diagnostic']))==30
for q in new:
    assert len(set(q['options']))==4
    assert q['options']['ABCD'.index(q['answer'])]==q['correct']
text=(DS/'FS_DAA_MCQ_Bank.md').read_text()
assert len(re.findall(r'^### Q\d+ — ',text,re.M))==250
assert text.count('<details>')==text.count('</details>')==250
assert len(re.findall(r'^A\. ',text,re.M))==250
solved={int(x) for x in re.findall(r'^\| (\d+) \|',(DS/'LeetCode_Solved_Inventory.md').read_text(),re.M)}
assert len(solved)==144
rows=re.findall(r'^\| (\d+) \| (.+?) \| (Solved|New) \|', (DS/'FS_LeetCode_Practice.md').read_text(),re.M)
assert len(rows)==len({i for i,_,_ in rows})==71
for i,_,status in rows:assert (int(i) in solved)==(status=='Solved')
for d in range(11,28):
    t=(DS/f'sources/Day_{d:02}_Transcript.txt').read_text()
    assert 'Captions: auto-generated' in t and len(re.findall(r'^\[',t,re.M))>400
# Check file targets in all newly produced user documents, without requiring external URLs.
for p in list(DS.glob('FS_*.md')):
    # C++ lambdas such as [](args) are code, not Markdown links.
    prose=re.sub(r'```.*?```|~~~.*?~~~','',p.read_text(),flags=re.S)
    prose=re.sub(r'`[^`]*`','',prose)
    for target in re.findall(r'\]\(([^)]+)\)',prose):
        if target.startswith(('http:','https:','#','mailto:')):continue
        local=target.split('#')[0].split(':')[0].strip('<>')
        if local:assert (p.parent/local).exists(),(p.name,target)
checked=[]
def answer(title,expected):
    assert bytitle[title]['correct']==expected,(title,bytitle[title]['correct'],expected)
    checked.append(title)
answer('One zero versus two',str([math.prod([v for j,v in enumerate([2,0,4,0]) if j!=i]) for i in range(4)]).replace(' ',''))
a=[2,3,4,5];answer('Prefix observation',str([math.prod(a[:i]) for i in range(4)]).replace(' ',''))
answer('Repeated letters',str(len(set(itertools.permutations('AABC')))))
def fc(n):return 1 if n<=1 else 1+fc(n-1)+fc(n-2)
answer('Fibonacci call counter',str(fc(5)))
def ways(n,m):return 1 if n==0 else (0 if n<0 else sum(ways(n-i,m) for i in range(1,m+1)))
answer('Ways at zero',str(ways(4,2)));answer('Generalized jumps',str(ways(4,3)))
def partition(a,first=False):
    a=a[:]
    if first:
        i=len(a)-1;p=a[0]
        for j in range(len(a)-1,0,-1):
            if a[j]>p:a[i],a[j]=a[j],a[i];i-=1
        a[i],a[0]=a[0],a[i]
    else:
        i=0;p=a[-1]
        for j in range(len(a)-1):
            if a[j]<p:a[i],a[j]=a[j],a[i];i+=1
        a[i],a[-1]=a[-1],a[i]
    return a,i
state,i=partition([60,50,20,70,30]);answer('Exact partition state',f"{str(state).replace(' ','')}, pivot index{i}")
state,i=partition([30,50,20,70,60],True);answer('Low-pivot mirror partition',f"{str(state).replace(' ','')}, i={i}")
c=0;candidate=None
for v in [1,2,2,2,1,1,1,1,1,2]:
    if not c:candidate=v
    c+=1 if v==candidate else -1
answer('Vote counter is not frequency',f'({candidate},{c})')
answer('Before final merge',str(sorted([6,5,4])+sorted([3,2,1])).replace(' ',''))
def power_calls(n,double=False):return 1 if n==0 else 1+(2 if double else 1)*power_calls(n//2,double)
answer('Count single-half calls',str(power_calls(13)));answer('Power side-effect count',str(power_calls(8,True)))
def count_trace(a,target,lo,hi,calls):
    calls[0]+=1
    if lo>hi:return 0
    if a[hi]<target or a[lo]>target:return 0
    if a[lo]==target and a[hi]==target:return hi-lo+1
    if lo==hi:return 0
    mid=(lo+hi)//2
    return count_trace(a,target,lo,mid,calls)+count_trace(a,target,mid+1,hi,calls)
calls=[0];result=count_trace([1,2,2,2,4],2,0,4,calls);answer('Sorted occurrence shortcuts',f'({result},{calls[0]})')
piles=[30,11,23,4,20];hours=lambda k:sum(math.ceil(p/k) for p in piles)
answer('Hours trace',str(hours(22)));answer('First feasible speed',str(next(k for k in range(1,31) if hours(k)<=6)))
lo,hi=1,11;speeds=[]
while lo<hi:
    mid=(lo+hi)//2;speeds.append(mid)
    if sum(math.ceil(p/mid) for p in [3,6,7,11])<=8:hi=mid
    else:lo=mid+1
answer('Koko binary-search log',','.join(map(str,speeds))+f'; return{lo}')
words=['gene','genesis','general'];prefix=os.path.commonprefix(words);answer('Exact prefix',prefix)
answer('Multiset preserves duplicates',str(__import__('statistics').median([1,2,2,3])))
answer('Even partition result',str(__import__('statistics').median([1,3,2,4])))
answer('Optimal fractional value','240') # Independently enumerated in C++ oracle below.
# Exact change DP contrasts with denomination greedy.
dp=[0]+[999]*7
for x in range(1,8):dp[x]=min(1+dp[x-c] for c in [1,3,4,5] if c<=x)
amount=7;greedy=0
for c in [5,4,3,1]:greedy+=amount//c;amount%=c
answer('Class coin counterexample',f'({greedy},{dp[7]})')
def stock(prices,unlimited=False):
    # DP on day,holding,remaining sells; zero terminal for flat, -inf for holding.
    from functools import lru_cache
    @lru_cache(None)
    def f(day,hold,left):
        if day==len(prices):return -10**9 if hold else 0
        best=f(day+1,hold,left)
        if hold and left:best=max(best,prices[day]+f(day+1,False,left-1))
        if not hold and left:best=max(best,-prices[day]+f(day+1,True,left))
        return best
    return f(0,False,len(prices) if unlimited else 1)
prices=[7,1,5,3,6,4];answer('One versus unlimited',f'({stock(prices)},{stock(prices,True)})')
answer('Summing rises',str(stock([1,2,2,5,3,4],True)))
def subset_product(a):return min(math.prod(a[i] for i in range(len(a)) if mask>>i&1) for mask in range(1,1<<len(a)))
for title,a in [('Even negatives',[-2,-3,4]),('Zeros do not force zero',[-1,0]),('All positives',[2,3,5]),('Even negative units',[-1,-1]),('Integers are an assumption',[-10,0.2])]:answer(title,str(subset_product(a)).removesuffix('.0'))
def swap(s):return max([s]+[s[:i]+s[j]+s[i+1:j]+s[i]+s[j+1:] for i in range(len(s)) for j in range(i+1,len(s))])
answer('Tie chooses rightmost',swap('1993'));answer('Only one exchange',swap('84725'))
# Tiny graph oracle via Floyd-Warshall, independent of Dijkstra.
dist=[[math.inf]*5 for _ in range(5)]
for i in range(5):dist[i][i]=0
for u,v,w in [(0,1,6),(0,2,5),(0,4,13),(1,2,12),(1,3,9),(1,4,5)]:dist[u][v]=dist[v][u]=w
for k in range(5):
 for i in range(5):
  for j in range(5):dist[i][j]=min(dist[i][j],dist[i][k]+dist[k][j])
assert dist[2]==[5,11,0,20,16]
# Independent grid component offsets for count/area/distinct-shape question.
grid=[[1,1,0,1],[0,0,0,0],[1,1,0,1]];seen=set();shapes=[]
for r in range(3):
 for c in range(4):
  if not grid[r][c] or (r,c) in seen:continue
  comp=[];pending=[(r,c)];seen.add((r,c))
  while pending:
   x,y=pending.pop();comp.append((x-r,y-c))
   for u,v in [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
    if 0<=u<3 and 0<=v<4 and grid[u][v] and (u,v) not in seen:seen.add((u,v));pending.append((u,v))
  shapes.append(tuple(sorted(comp)))
answer('Three objectives',f'({len(shapes)},{max(map(len,shapes))},{len(set(shapes))})')
def queens(n):return sum(all(abs(p[i]-p[j])!=j-i for i in range(n) for j in range(i+1,n)) for p in itertools.permutations(range(n)))
answer('Four queens count',str(queens(4)));answer('Five queens count',str(queens(5)))
def gold(grid):
 R,C=len(grid),len(grid[0])
 def dfs(r,c,seen):
  best=0
  for x,y in [(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
   if 0<=x<R and 0<=y<C and grid[x][y]>0 and (x,y) not in seen:best=max(best,dfs(x,y,seen|{(x,y)}))
  return grid[r][c]+best
 return max(dfs(r,c,{(r,c)}) for r in range(R) for c in range(C) if grid[r][c]>0)
answer('Component sum is not path sum',str(gold([[0,1,0],[1,1,1],[0,1,0]])))
answer('Simple gold trace',str(gold([[0,6,0],[5,8,7],[0,9,0]])))
W=[(0,0),(2,0)];B=[(1,0),(-2,0)]
cost=lambda p:sum(abs(W[i][0]-B[j][0])+abs(W[i][1]-B[j][1]) for i,j in enumerate(p))
answer('Nearest-pair counterexample',f'({cost((0,1))},{min(cost(p) for p in itertools.permutations(range(2)))})')
answer('Complete assignments',str(len(list(itertools.permutations(range(3),2)))))
answer('Reflected three-bit sequence',str([i^(i>>1) for i in range(8)]).replace(' ',''))
answer('XOR neighbour',str(3^(1<<1)))
answer('Arrangement count',str(sum(all(v%p==0 or p%v==0 for p,v in enumerate(a,1)) for a in itertools.permutations([1,2]))))
# Compile valid snippet traces rather than executing deliberately UB/infinite snippets.
cpp=r'''#include <iostream>
#include <string>
#include <vector>
using namespace std;
void B(int); void A(int n){if(n<=0)return;cout<<"A"<<n<<" ";B(n-1);}void B(int n){if(n<=0)return;cout<<"B"<<n<<" ";A(n-2);}
void headtail(int n){if(!n)return;cout<<n;headtail(n-1);cout<<n;}
int main(){A(5);cout<<"\n";headtail(3);cout<<"\n";int x=2;double y=1/x;cout<<y<<"\n";}
'''
java=r'''public class FSChecks {
static int calls=0; static int f(int n){calls++;if(n==0)return 0;return f(n-1)+1;}
static class Node {int val;Node left,right;Node(int v){val=v;}}
public static void main(String[] args){
String s="abc";s.concat("d");System.out.println(s);
StringBuilder a=new StringBuilder("ab"),b=a;b.append("c");System.out.println(a);
System.out.println(new String("ab")==new String("ab"));
System.out.println(-3/2);System.out.println((double)((2+3)/2));
f(2);f(1);System.out.println(calls);
Node root=new Node(1);root.left=new Node(2);root.right=new Node(3);
java.util.ArrayDeque<Node> q=new java.util.ArrayDeque<>();q.add(root);long sum=0;
for(int i=0;i<q.size();i++){Node x=q.remove();sum+=x.val;if(x.left!=null)q.add(x.left);if(x.right!=null)q.add(x.right);}
System.out.println(sum+","+q.peek().val);
int p=2_000_000_000,k=2_000_000_000;System.out.println((p+k-1)/k);System.out.println(((long)p+k-1)/k);
}}
'''
with tempfile.TemporaryDirectory(prefix='fs-checks-') as tmp:
 t=Path(tmp);exe=t/'references'
 subprocess.run(['g++','-std=c++17','-O1','-g','-Wall','-Wextra','-Wpedantic','-Werror','-fsanitize=address,undefined',str(DS/'validation/fs_gap_checks.cpp'),'-o',str(exe)],check=True)
 env=os.environ.copy();env['ASAN_OPTIONS']='detect_leaks=0' # LeakSanitizer cannot run under this host's ptrace.
 subprocess.run([str(exe)],check=True,env=env)
 (t/'traces.cpp').write_text(cpp)
 subprocess.run(['g++','-std=c++17','-Wall','-Wextra','-Werror',str(t/'traces.cpp'),'-o',str(t/'traces')],check=True)
 out=subprocess.check_output([str(t/'traces')],text=True).splitlines();assert out==['A5 B4 A2 B1 ','321123','0'],out
 (t/'FSChecks.java').write_text(java)
 subprocess.run(['javac',str(t/'FSChecks.java')],check=True)
 out=subprocess.check_output(['java','-cp',str(t),'FSChecks'],text=True).splitlines();assert out==['abc','abc','false','-1','2.0','5','3,3','0','1'],out
print(f'PASS: 250 MCQ structures, 71 unique LC mappings, 17 caption files, local links; {len(checked)} selected answer oracles; compiled C++/Java traces.')
