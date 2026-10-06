import { javaSolutions } from '../src/content/java-solutions.js'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
const temp=await mkdtemp(resolve(tmpdir(),'atlas-java-'))
if (!temp.startsWith(resolve(tmpdir(),'atlas-java-'))) throw new Error('Unexpected verification directory')
const executable=(name)=>process.env.JAVA_HOME ? resolve(process.env.JAVA_HOME,'bin',`${name}${process.platform==='win32'?'.exe':''}`) : name
const checks=`
static int checks=0;
static void check(boolean value) { checks++; if(!value) throw new AssertionError("Check "+checks); }
static long bruteSum(int[] a,int target) { long answer=0; for(int i=0;i<a.length;i++){long s=0;for(int j=i;j<a.length;j++){s+=a[j];if(s==target)answer++;}} return answer; }
static long bruteMax(int[] a) { long best=Long.MIN_VALUE; for(int i=0;i<a.length;i++){long s=0;for(int j=i;j<a.length;j++){s+=a[j];best=Math.max(best,s);}} return best; }
public static void main(String[] args) {
 check(Arrays.equals(twoSum(new int[]{2,7,11,15},9),new int[]{0,1}));
 check(Arrays.equals(twoSum(new int[]{3,3},6),new int[]{0,1}));
 check(longestUnique("abcabcbb")==3); check(longestUnique("abba")==2); check(longestUnique("")==0);
 check(maxArea(new int[]{1,8,6,2,5,4,8,3,7})==49);
 check(commonPrefix(new String[]{"flower","flow","flight"}).equals("fl"));
 check(commonPrefix(new String[]{"","a"}).equals(""));
 int[] d={1,1,2};check(deduplicate(d)==2 && d[0]==1 && d[1]==2);
 check(deduplicate(new int[]{})==0);
 int[] r={3,2,2,3};check(removeValue(r,3)==2 && r[0]==2 && r[1]==2);
 check(power(2,-3)==0.125);check(power(1,Integer.MIN_VALUE)==1);
 check(canJump(new int[]{2,3,1,1,4}));check(!canJump(new int[]{3,2,1,0,4}));
 List<List<Integer>> sets=subsets(new int[]{1,2});check(sets.size()==4);check(new HashSet<>(sets).size()==4);
 int[] a={1,2,3,0,0,0};mergeInto(a,3,new int[]{2,5,6},3);check(Arrays.equals(a,new int[]{1,2,2,3,5,6}));
 check(stockOne(new int[]{7,1,5,3,6,4})==5);check(stockUnlimited(new int[]{7,1,5,3,6,4})==7);
 check(majority(new int[]{2,2,1,1,1,2,2})==2);
 int[] rotation={1,2,3,4,5};rotate(rotation,7);check(Arrays.equals(rotation,new int[]{4,5,1,2,3}));
 check(Arrays.equals(productExceptSelf(new int[]{2,3,4,5}),new long[]{60,40,30,24}));
 check(Arrays.equals(productExceptSelf(new int[]{0,3,0}),new long[]{0,0,0}));
 int[] z={0,1,0,3,12};moveZeroes(z);check(Arrays.equals(z,new int[]{1,3,12,0,0}));
 char[] text="hello".toCharArray();reverseChars(text);check(new String(text).equals("olleh"));
 check(minimumRemovals(new int[][]{{1,2},{2,3},{3,4},{1,3}})==1);
 check(assignCookies(new int[]{1,2,3},new int[]{1,1})==1);
 check(maximumSwap(1993)==9913);check(maximumSwap(9973)==9973);
 check(minEatingSpeed(new int[]{3,6,7,11},8)==4);
 check(minEatingSpeed(new int[]{Integer.MAX_VALUE},1)==Integer.MAX_VALUE);
 Random random=new Random(20261006);
 for(int trial=0;trial<1000;trial++) {
   int[] x=new int[1+random.nextInt(12)];for(int i=0;i<x.length;i++)x[i]=random.nextInt(11)-5;
   check(subarraySum(x,2)==bruteSum(x,2));check(maxSubarray(x)==bruteMax(x));
   int[] sorted=x.clone();Arrays.sort(sorted);int[] actual=x.clone();mergeSort(actual);check(Arrays.equals(actual,sorted));
   long[] products=productExceptSelf(x);for(int i=0;i<x.length;i++){long p=1;for(int j=0;j<x.length;j++)if(i!=j)p*=x[j];check(products[i]==p);}
 }
 System.out.println("PASS: ${Object.keys(javaSolutions).length} Java reference method groups; "+checks+" checks");
}`
try {
  const source=`import java.util.*; public class AtlasChecks {\n${Object.values(javaSolutions).join('\n')}\n${checks}\n}`
  await writeFile(resolve(temp,'AtlasChecks.java'),source)
  for(const [name,args] of [['javac',['--release','17','-d',temp,resolve(temp,'AtlasChecks.java')]],['java',['-cp',temp,'AtlasChecks']]]) {
    const r=spawnSync(executable(name),args,{encoding:'utf8',windowsHide:true,timeout:60000})
    if(r.error || r.status!==0) throw new Error(r.error?.message || r.stderr || r.stdout)
    if(r.stdout) process.stdout.write(r.stdout)
  }
} finally { await rm(temp,{recursive:true,force:true}) }
