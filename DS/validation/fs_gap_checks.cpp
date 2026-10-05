#include "../code/fs_gap_reference.hpp"
#include <cassert>
#include <iostream>
#include <map>
#include <random>
#include <set>
using namespace fs;
long long bruteProduct(const std::vector<int>& a){
    long long best=LLONG_MAX;
    for(int mask=1;mask<(1<<a.size());++mask){long long p=1;for(unsigned i=0;i<a.size();++i)if(mask&(1<<i))p*=a[i];best=std::min(best,p);}return best;
}
std::string bruteSwap(std::string s){std::string best=s;for(unsigned i=0;i<s.size();++i)for(unsigned j=i+1;j<s.size();++j){auto t=s;std::swap(t[i],t[j]);best=std::max(best,t);}return best;}
int main(){
    std::mt19937 rng(20261005);
    std::vector<int> p={60,50,20,70,30};assert(partitionLast(p,0,4)==1);assert((p==std::vector<int>{20,30,60,70,50}));
    for(int k=0;k<2000;++k){
        int n=rng()%35;std::vector<int>a(n);for(int&x:a)x=static_cast<int>(rng()%11)-5;
        auto sorted=a;std::sort(sorted.begin(),sorted.end());auto b=a,c=a;
        quickSort(b,0,n-1);mergeSort(c);assert(b==sorted&&c==sorted);
        if(n){auto d=a;int pivot=d[0],i=partitionFirst(d,0,n-1);assert(d[i]==pivot);for(int j=0;j<i;++j)assert(d[j]<=pivot);for(int j=i+1;j<n;++j)assert(d[j]>pivot);auto perm=d;std::sort(perm.begin(),perm.end());assert(perm==sorted);}
        std::map<int,int> counts;for(int x:a)++counts[x];std::optional<int> majority;for(auto[x,f]:counts)if(f>n/2)majority=x;
        assert(majorityVote(a)==majority);assert(majorityDivideConquer(a)==majority);
        if(n && n<=12)assert(minimumSubsetProduct(a)==bruteProduct(a));
    }
    // Exhaustive small sign/zero cases; independent subset oracle.
    for(int n=1;n<=6;++n){int total=1;for(int i=0;i<n;++i)total*=5;for(int code=0;code<total;++code){int x=code;std::vector<int>a(n);for(int&i:a){i=x%5-2;x/=5;}assert(minimumSubsetProduct(a)==bruteProduct(a));}}
    for(int n=0;n<10000;++n)assert(maximumSwapDigits(std::to_string(n))==bruteSwap(std::to_string(n)));
    assert(maximumSwapDigits("1993")=="9913");assert(maximumSwapDigits("84725")=="87425");
    for(int e=-20;e<=20;++e){double got=power(1.25,e),want=std::pow(1.25,e);assert(std::abs(got-want)<=1e-10*std::max(1.0,std::abs(want)));}
    assert(power(1,INT_MIN)==1);assert(power(-2,3)==-8);
    bool rejected=false;try{power(0,-1);}catch(const std::invalid_argument&){rejected=true;}assert(rejected);
    assert(longestCommonPrefix({"gene","genesis","general"})=="gene");assert(longestCommonPrefix({"","abc"}).empty());assert(longestCommonPrefix({}).empty());
    auto bag=fractionalKnapsack({{60,10},{100,20},{120,30}},50);assert(std::abs(bag.value-240)<1e-10);assert(std::abs(bag.fractions[2]-2.0/3)<1e-10);
    assert(fractionalKnapsack({{10,4},{9,3}},3).value==9);assert(fractionalKnapsack({},10).value==0);
    // Fractional optimum oracle: all whole-item subsets and one fractional item.
    for(int t=0;t<250;++t){std::vector<Item>a(5);for(auto& i:a){i.value=rng()%20;i.weight=1+rng()%10;}int cap=rng()%25;double best=0;
        for(int mask=0;mask<32;++mask){int w=0;double value=0;for(int i=0;i<5;++i)if(mask&(1<<i)){w+=a[i].weight;value+=a[i].value;}if(w>cap)continue;best=std::max(best,value);for(int i=0;i<5;++i)if(!(mask&(1<<i)))best=std::max(best,value+a[i].value*std::min(1.0,static_cast<double>(cap-w)/a[i].weight));}
        assert(std::abs(fractionalKnapsack(a,cap).value-best)<1e-8);
    }
    std::vector<long long> coins={1,2,5,10,20,50,100};std::vector<int> dp(501,9999);dp[0]=0;
    for(int amount=0;amount<=500;++amount){if(amount)for(auto c:coins)if(c<=amount)dp[amount]=std::min(dp[amount],1+dp[amount-c]);auto out=greedyCoins(coins,amount);long long count=0;for(auto[c,k]:out.counts)count+=k;assert(!out.leftover && count==dp[amount]);}
    auto counter=greedyCoins({1,3,4,5},7);long long count=0;for(auto[c,k]:counter.counts)count+=k;assert(count==3);assert(greedyCoins({4,6},5).leftover==1);
    // Brute subsets oracle for activity cardinality, including negative starts/ties.
    for(int t=0;t<300;++t){std::vector<std::pair<int,int>>a;for(int i=0;i<7;++i){int s=static_cast<int>(rng()%15)-5;a.push_back({s,s+1+static_cast<int>(rng()%7)});}int best=0;
        for(int mask=0;mask<128;++mask){std::vector<std::pair<int,int>>b;for(int i=0;i<7;++i)if(mask&(1<<i))b.push_back(a[i]);std::sort(b.begin(),b.end());bool valid=true;for(unsigned i=1;i<b.size();++i)if(b[i].first<b[i-1].second)valid=false;if(valid)best=std::max(best,static_cast<int>(b.size()));}assert(selectActivities(a).size()==static_cast<unsigned>(best));
    }
    assert((expandFlatChoices({"ab","c","de"})==std::vector<std::string>{"acd","ace","bcd","bce"}));assert((expandFlatChoices({})==std::vector<std::string>{""}));
    std::set<std::string> ant={"ANT","AN1","A1T","A2","1NT","1N1","2T","3"};auto ab=abbreviations("ANT");assert(std::set<std::string>(ab.begin(),ab.end())==ant);assert(abbreviations("").size()==1);
    for(int n=1;n<=12;++n){auto a=abbreviations(std::string(n,'a'));assert(a.size()==static_cast<unsigned>(1<<n));assert(std::set<std::string>(a.begin(),a.end()).size()==a.size());}
    for(int n=1;n<=16;++n){auto g=reflectedGray(n);assert(g.size()==static_cast<unsigned>(1<<n));assert(std::set<int>(g.begin(),g.end()).size()==g.size());for(unsigned i=0;i<g.size();++i){int diff=g[i]^g[(i+1)%g.size()];assert(diff>0&&(diff&(diff-1))==0);assert(g[i]>=0&&g[i]<(1<<n));}}
    std::cout<<"C++ references: sorting/partition, majority, exhaustive product, swap oracle, power, LCP, fractional oracle, coins, activity oracle, generators PASS\n";
}
