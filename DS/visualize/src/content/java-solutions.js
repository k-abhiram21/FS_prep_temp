// Individually tested reference methods. Other guides provide explicit Java construction plans.
export const javaSolutions = {
  1: `static int[] twoSum(int[] a, int target) {
    Map<Long,Integer> seen = new HashMap<>();
    for (int i=0; i<a.length; i++) {
        Integer previous = seen.get((long)target-a[i]);
        if (previous != null) return new int[]{previous,i};
        seen.put((long)a[i],i);
    }
    return new int[]{-1,-1};
}`,
  3: `static int longestUnique(String s) {
    Map<Character,Integer> last = new HashMap<>();
    int left=0, best=0;
    for (int right=0; right<s.length(); right++) {
        char c=s.charAt(right);
        left=Math.max(left,last.getOrDefault(c,-1)+1);
        last.put(c,right);
        best=Math.max(best,right-left+1);
    }
    return best;
}`,
  11: `static long maxArea(int[] a) {
    int left=0, right=a.length-1; long best=0;
    while (left<right) {
        best=Math.max(best,(long)(right-left)*Math.min(a[left],a[right]));
        if (a[left]<=a[right]) left++; else right--;
    }
    return best;
}`,
  14: `static String commonPrefix(String[] a) {
    if (a.length==0) return "";
    for (int j=0; j<a[0].length(); j++) {
        for (int i=1; i<a.length; i++) {
            if (j==a[i].length() || a[i].charAt(j)!=a[0].charAt(j))
                return a[0].substring(0,j);
        }
    }
    return a[0];
}`,
  26: `static int deduplicate(int[] a) {
    int write=0;
    for (int x:a) if (write==0 || a[write-1]!=x) a[write++]=x;
    return write;
}`,
  27: `static int removeValue(int[] a,int value) {
    int write=0;
    for (int x:a) if (x!=value) a[write++]=x;
    return write;
}`,
  50: `static double power(double x,int n) {
    long exponent=n;
    if (exponent<0) { x=1/x; exponent=-exponent; }
    double result=1;
    while (exponent>0) {
        if ((exponent&1)==1) result*=x;
        x*=x; exponent/=2;
    }
    return result;
}`,
  53: `static long maxSubarray(int[] a) {
    if (a.length==0) throw new IllegalArgumentException("Nonempty input required");
    long ending=a[0], best=a[0];
    for (int i=1;i<a.length;i++) {
        ending=Math.max((long)a[i],ending+a[i]);
        best=Math.max(best,ending);
    }
    return best;
}`,
  55: `static boolean canJump(int[] a) {
    long farthest=0;
    for (int i=0;i<a.length;i++) {
        if (i>farthest) return false;
        farthest=Math.max(farthest,(long)i+a[i]);
        if (farthest>=a.length-1) return true;
    }
    return a.length==0;
}`,
  78: `static List<List<Integer>> subsets(int[] a) {
    List<List<Integer>> out=new ArrayList<>();
    subsetsAt(a,0,new ArrayList<>(),out);
    return out;
}
static void subsetsAt(int[] a,int i,List<Integer> path,List<List<Integer>> out) {
    if (i==a.length) { out.add(new ArrayList<>(path)); return; }
    subsetsAt(a,i+1,path,out);
    path.add(a[i]);
    subsetsAt(a,i+1,path,out);
    path.remove(path.size()-1);
}`,
  88: `static void mergeInto(int[] a,int m,int[] b,int n) {
    int i=m-1,j=n-1,k=m+n-1;
    while (j>=0) {
        if (i>=0 && a[i]>b[j]) a[k--]=a[i--];
        else a[k--]=b[j--];
    }
}`,
  121: `static long stockOne(int[] prices) {
    if (prices.length==0) return 0;
    long minimum=prices[0],best=0;
    for (int x:prices) {
        best=Math.max(best,(long)x-minimum);
        minimum=Math.min(minimum,x);
    }
    return best;
}`,
  122: `static long stockUnlimited(int[] prices) {
    long result=0;
    for (int i=1;i<prices.length;i++)
        result+=Math.max(0L,(long)prices[i]-prices[i-1]);
    return result;
}`,
  169: `static int majority(int[] a) {
    int candidate=0,count=0;
    for (int x:a) {
        if (count==0) candidate=x;
        count+=x==candidate?1:-1;
    }
    int frequency=0;
    for (int x:a) if (x==candidate) frequency++;
    if (frequency<=a.length/2) throw new IllegalArgumentException("No majority");
    return candidate;
}`,
  189: `static void reverseRange(int[] a,int left,int right) {
    while (left<right) { int t=a[left]; a[left++]=a[right]; a[right--]=t; }
}
static void rotate(int[] a,int k) {
    if (a.length==0) return;
    k%=a.length;
    reverseRange(a,0,a.length-1);
    reverseRange(a,0,k-1);
    reverseRange(a,k,a.length-1);
}`,
  238: `static long[] productExceptSelf(int[] a) {
    long[] out=new long[a.length]; long prefix=1;
    for (int i=0;i<a.length;i++) { out[i]=prefix; prefix*=a[i]; }
    long suffix=1;
    for (int i=a.length-1;i>=0;i--) { out[i]*=suffix; suffix*=a[i]; }
    return out;
}`,
  283: `static void moveZeroes(int[] a) {
    int write=0;
    for (int x:a) if (x!=0) a[write++]=x;
    while (write<a.length) a[write++]=0;
}`,
  344: `static void reverseChars(char[] a) {
    int left=0,right=a.length-1;
    while(left<right) { char t=a[left]; a[left++]=a[right]; a[right--]=t; }
}`,
  435: `static int minimumRemovals(int[][] intervals) {
    if (intervals.length==0) return 0;
    Arrays.sort(intervals,(a,b)->Integer.compare(a[1],b[1]));
    int kept=0; long end=Long.MIN_VALUE;
    for (int[] interval:intervals) {
        if (interval[0]>=end) { kept++; end=interval[1]; }
    }
    return intervals.length-kept;
}`,
  455: `static int assignCookies(int[] demand,int[] cookies) {
    Arrays.sort(demand); Arrays.sort(cookies);
    int child=0;
    for (int cookie:cookies) {
        if (child<demand.length && cookie>=demand[child]) child++;
    }
    return child;
}`,
  560: `static long subarraySum(int[] a,long target) {
    Map<Long,Long> count=new HashMap<>(); count.put(0L,1L);
    long prefix=0,answer=0;
    for (int x:a) {
        prefix+=x;
        answer+=count.getOrDefault(prefix-target,0L);
        count.merge(prefix,1L,Long::sum);
    }
    return answer;
}`,
  670: `static int maximumSwap(int value) {
    char[] digits=Integer.toString(value).toCharArray();
    int[] last=new int[10]; Arrays.fill(last,-1);
    for(int i=0;i<digits.length;i++) last[digits[i]-'0']=i;
    for(int i=0;i<digits.length;i++) {
        for(int d=9;d>digits[i]-'0';d--) if(last[d]>i) {
            char t=digits[i]; digits[i]=digits[last[d]]; digits[last[d]]=t;
            return Integer.parseInt(new String(digits));
        }
    }
    return value;
}`,
  875: `static int minEatingSpeed(int[] piles,int h) {
    int lo=1,hi=Arrays.stream(piles).max().orElse(1);
    while(lo<hi) {
        int mid=lo+(hi-lo)/2; long hours=0;
        for(int p:piles) hours+=((long)p+mid-1)/mid;
        if(hours<=h) hi=mid; else lo=mid+1;
    }
    return lo;
}`,
  912: `static void mergeSort(int[] a) { sortRange(a,new int[a.length],0,a.length); }
static void sortRange(int[] a,int[] buffer,int lo,int hi) {
    if(hi-lo<2) return;
    int mid=lo+(hi-lo)/2;
    sortRange(a,buffer,lo,mid); sortRange(a,buffer,mid,hi);
    int i=lo,j=mid,k=lo;
    while(i<mid || j<hi) {
        if(j==hi || (i<mid && a[i]<=a[j])) buffer[k++]=a[i++];
        else buffer[k++]=a[j++];
    }
    System.arraycopy(buffer,lo,a,lo,hi-lo);
}`,
}
