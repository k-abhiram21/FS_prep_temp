#!/usr/bin/env python3
from pathlib import Path
import random,re,subprocess,tempfile
DS=Path(__file__).resolve().parents[1];src=DS/'code/exam_io'
def run(cmd,stdin=''):
 r=subprocess.run(cmd,input=stdin,text=True,capture_output=True,timeout=10)
 assert r.returncode==0,(cmd,r.stdout,r.stderr)
 return r.stdout
with tempfile.TemporaryDirectory(prefix='fs-exam-io-') as tmp:
 p=Path(tmp)
 run(['javac','--release','17','-d',tmp,str(src/'MainTokens.java'),str(src/'MainLines.java')])
 for name in ['tokens','lines']:run(['g++','-std=c++17','-O2','-Wall','-Wextra','-Wpedantic','-Werror',str(src/(name+'.cpp')),'-o',str(p/name)])
 def tokens(text,want):
  assert run(['java','-cp',tmp,'MainTokens'],text)==want
  assert run([str(p/'tokens')],text)==want
 for text,want in [('', ''),('0\n',''),('3\n4\n1 2\n3 4\n0\n3\n-5 0 7\n','10\n0\n2\n'),('1\n1\n-9223372036854775808\n','-9223372036854775808\n'),('1\n1\n9223372036854775807\n','9223372036854775807\n')]:tokens(text,want)
 rng=random.Random(20261005);cases=[[rng.randint(-10000,10000) for _ in range(rng.randrange(25))] for _ in range(120)]
 items=[str(len(cases))]
 for a in cases:items.append(str(len(a)));items.extend(map(str,a))
 separators=[' ','\n','\t','\n\n',' \n'];inp=''.join(x+rng.choice(separators) for x in items);tokens(inp,''.join(str(sum(a))+'\n' for a in cases))
 for lines,newline in [(['red blue','','  x ','\tq'],'\n'),(['','x','  y'],'\r\n'),([], '\n')]:
  text=str(len(lines))+newline+newline.join(lines)+(newline if lines else '')
  want=''.join(f'{len(x)}|{x}\n' for x in lines)
  assert run(['java','-cp',tmp,'MainLines'],text)==want
  assert run([str(p/'lines')],text)==want
 # Compile the complete one-array programs displayed in the guide itself.
 md=(DS/'FS_Java_CPP_Exam_Revision.md').read_text()
 for lang in ['java','cpp']:
  code=re.search(r'```'+lang+r'\n(.*?)\n```',md,re.S).group(1)
  file=p/('Main.java' if lang=='java' else 'guide.cpp');file.write_text(code)
  if lang=='java':run(['javac','--release','17','-d',tmp,str(file)]);cmd=['java','-cp',tmp,'Main']
  else:run(['g++','-std=c++17','-Wall','-Wextra','-Werror',str(file),'-o',str(p/'guide')]);cmd=[str(p/'guide')]
  assert run(cmd,'4\n1 -2 3 4\n')=='6\n'
 # Meaningful boundary/regression checks for the existing state Fibonacci reference.
 (p/'day02check.cpp').write_text('#include "'+str(DS/'code/day02_reference.cpp')+'"\n#include <cassert>\nint main(){for(int n=0;n<=92;++n)assert(fibState(n)==fibIterative(n));assert(fibState(92)==7540113804746346429LL);bool bad=false;try{fibState(-1);}catch(const std::invalid_argument&){bad=true;}assert(bad);}\n')
 run(['g++','-std=c++17','-Wall','-Wextra','-Werror','-fsanitize=undefined',str(p/'day02check.cpp'),'-o',str(p/'day02check')]);assert run([str(p/'day02check')])==''
 # Compile the exact six newly displayed C++ Day 1 counterparts, not rewritten copies.
 day1=(DS/'Day_01_Notes.md').read_text()
 fragments=re.findall(r'\*\*C\+\+ coding counterpart\*\*[^\n]*\n\n```cpp\n(.*?)\n```',day1,re.S)
 assert len(fragments)==6
 checks=r'''int main(){
 assert(factorial(0)==1 && factorial(4)==24 && factorial(20)==2432902008176640000LL);
 assert(fib(0)==0 && fib(5)==5 && fib(10)==55);
 std::ostringstream out;auto old=std::cout.rdbuf(out.rdbuf());
 head(3);assert(out.str()=="1 2 3 ");out.str("");
 tail(3);assert(out.str()=="3 2 1 ");out.str("");
 A(10);assert(out.str()=="10 9 4 3 1 ");out.str("");
 calls=0;tree(2);assert(out.str()=="2 1 1 " && calls==7);
 std::cout.rdbuf(old);
 }'''
 (p/'counterparts.cpp').write_text('#include <iostream>\n#include <sstream>\n#include <stdexcept>\n#include <cassert>\n'+'\n'.join(fragments)+'\n'+checks)
 run(['g++','-std=c++17','-Wall','-Wextra','-Werror',str(p/'counterparts.cpp'),'-o',str(p/'counterparts')]);assert run([str(p/'counterparts')])==''
 # Actual fragment-method checks from the sheet's parsing/container cases.
 java=r'''import java.util.*;public class MethodChecks {public static void main(String[] x){
 String clean=" 10  -2\t30 ".trim();String[] f=clean.split("\\s+");assert Arrays.equals(f,new String[]{"10","-2","30"});
 assert "a,b,,".split(",",-1).length==4;assert "a.b.c".split("\\.").length==3;
 List<Integer> a=new ArrayList<>(Arrays.asList(1,2,1));a.remove(1);a.remove(Integer.valueOf(1));assert a.equals(Arrays.asList(1));
 Map<String,List<Integer>> m=new HashMap<>();m.computeIfAbsent("x",k->new ArrayList<>()).add(1);assert m.get("x").size()==1;
 int[][] g={{1,2},{3}};int[][] cp=new int[g.length][];for(int i=0;i<g.length;i++)cp[i]=g[i].clone();cp[0][0]=9;assert g[0][0]==1;
 Integer x1=1000,x2=1000;Integer one=1;Long longOne=1L;assert x1.equals(x2);assert !one.equals(longOne);assert one.longValue()==longOne.longValue();
 StringBuilder b=new StringBuilder("abc");b.append(12).append('!');b.setCharAt(0,'X');b.insert(1,"_");b.delete(1,2);b.deleteCharAt(b.length()-1);b.reverse();assert b.toString().equals("21cbX");
 System.out.println("methods PASS");}}'''
 (p/'MethodChecks.java').write_text(java);run(['javac','--release','17','-d',tmp,str(p/'MethodChecks.java')]);assert run(['java','-ea','-cp',tmp,'MethodChecks'])=='methods PASS\n'
 print('PASS: paired token/line programs, 120 randomized cases, EOF/CRLF/empty lines/extreme longs, guide programs/selected methods, six exact C++ counterparts, Fibonacci0..92 with UB sanitizer.')
