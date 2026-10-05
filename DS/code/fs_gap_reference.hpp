#ifndef FS_GAP_REFERENCE_HPP
#define FS_GAP_REFERENCE_HPP
// C++17 teaching references. Contracts: DS/FS_Coding_Gap_Practice.md.
#include <algorithm>
#include <climits>
#include <cmath>
#include <functional>
#include <numeric>
#include <optional>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>
namespace fs {
inline int partitionLast(std::vector<int>& a, int lo, int hi) {
    int pivot=a.at(hi), i=lo;
    for(int j=lo;j<hi;++j) if(a[j]<pivot) std::swap(a[i++],a[j]);
    std::swap(a[i],a[hi]); return i;
}
inline int partitionFirst(std::vector<int>& a, int lo, int hi) {
    int pivot=a.at(lo), i=hi;
    for(int j=hi;j>lo;--j) if(a[j]>pivot) std::swap(a[i--],a[j]);
    std::swap(a[i],a[lo]); return i;
}
inline void quickSort(std::vector<int>& a,int lo,int hi) {
    if(lo>=hi) return;
    int p=partitionLast(a,lo,hi);
    quickSort(a,lo,p-1); quickSort(a,p+1,hi);
}
inline void mergeSort(std::vector<int>& a) {
    std::vector<int> buffer(a.size());
    std::function<void(int,int)> sort=[&](int lo,int hi) {
        if(lo>=hi) return;
        int mid=lo+(hi-lo)/2; sort(lo,mid);sort(mid+1,hi);
        int i=lo,j=mid+1,k=lo;
        while(i<=mid && j<=hi) buffer[k++]=(a[i]<=a[j]?a[i++]:a[j++]);
        while(i<=mid) buffer[k++]=a[i++];
        while(j<=hi) buffer[k++]=a[j++];
        for(int t=lo;t<=hi;++t) a[t]=buffer[t];
    };
    sort(0,static_cast<int>(a.size())-1);
}
inline std::optional<int> majorityDivideConquer(const std::vector<int>& a) {
    if(a.empty()) return std::nullopt;
    std::function<int(int,int)> candidate=[&](int lo,int hi) {
        if(lo==hi) return a[lo];
        int mid=lo+(hi-lo)/2, x=candidate(lo,mid), y=candidate(mid+1,hi);
        if(x==y) return x;
        int cx=0,cy=0;
        for(int i=lo;i<=hi;++i) {cx+=a[i]==x;cy+=a[i]==y;}
        return cx>cy?x:y; // Tie convention does not prove a majority.
    };
    int x=candidate(0,static_cast<int>(a.size())-1);
    return std::count(a.begin(),a.end(),x)>static_cast<long long>(a.size()/2)
        ?std::optional<int>(x):std::nullopt;
}
inline std::optional<int> majorityVote(const std::vector<int>& a) {
    int x=0,count=0;
    for(int v:a) {if(count==0)x=v;count+=(v==x?1:-1);}
    return std::count(a.begin(),a.end(),x)>static_cast<long long>(a.size()/2)
        ?std::optional<int>(x):std::nullopt;
}
inline double power(double x,int n) {
    if(x==0 && n<0) throw std::invalid_argument("zero to negative power");
    long long e=n;
    if(e<0) {x=1.0/x;e=-e;}
    std::function<double(long long)> rec=[&](long long k)->double {
        if(k==0)return 1.0;
        double t=rec(k/2);
        return k%2?t*t*x:t*t;
    };
    return rec(e);
}
inline std::string longestCommonPrefix(const std::vector<std::string>& words) {
    if(words.empty())return "";
    std::size_t len=words[0].size();
    for(const auto& w:words)len=std::min(len,w.size());
    std::size_t i=0;
    for(;i<len;++i) for(const auto& w:words)
        if(w[i]!=words[0][i])return words[0].substr(0,i);
    return words[0].substr(0,i);
}
struct Item {long long value,weight;};
struct KnapsackResult {double value=0;std::vector<double> fractions;};
inline KnapsackResult fractionalKnapsack(const std::vector<Item>& items,long long capacity) {
    if(items.size()>200 || capacity<0 || capacity>1000000)
        throw std::invalid_argument("capacity/item-count contract");
    for(auto x:items) if(x.value<0 || x.value>1000000 || x.weight<=0 || x.weight>1000000)
        throw std::invalid_argument("item contract");
    std::vector<int> order(items.size());std::iota(order.begin(),order.end(),0);
    // Products <= 10^12 under this contract; no floating comparison/truncation.
    std::stable_sort(order.begin(),order.end(),[&](int i,int j){
        return items[i].value*items[j].weight>items[j].value*items[i].weight;
    });
    KnapsackResult out;out.fractions.resize(items.size());
    for(int i:order) {
        if(capacity==0)break;
        if(items[i].value==0)continue;
        long long used=std::min(capacity,items[i].weight);
        out.fractions[i]=static_cast<double>(used)/items[i].weight;
        out.value+=out.fractions[i]*items[i].value;capacity-=used;
    }
    return out;
}
struct CoinResult {std::vector<std::pair<long long,long long>> counts;long long leftover;};
inline CoinResult greedyCoins(std::vector<long long> coins,long long amount) {
    if(amount<0)throw std::invalid_argument("negative amount");
    for(auto c:coins)if(c<=0)throw std::invalid_argument("nonpositive coin");
    std::sort(coins.begin(),coins.end(),std::greater<long long>());
    coins.erase(std::unique(coins.begin(),coins.end()),coins.end());
    CoinResult out;
    for(auto c:coins){out.counts.push_back({c,amount/c});amount%=c;}
    out.leftover=amount;return out; // No arbitrary-denomination optimality claim.
}
inline long long minimumSubsetProduct(const std::vector<int>& a) {
    if(a.empty()||a.size()>12)throw std::invalid_argument("1..12 elements required");
    int neg=0,zeros=0,closest=INT_MIN,smallest=INT_MAX;
    long long product=1;
    for(int v:a) {
        if(v < -10 || v > 10)throw std::invalid_argument("values -10..10 required");
        if(v==0){++zeros;continue;}
        product*=v;
        if(v<0){++neg;closest=std::max(closest,v);}
        else smallest=std::min(smallest,v);
    }
    if(neg==0)return zeros?0:smallest;
    if(neg%2==0)product/=closest;
    return product;
}
inline std::vector<std::pair<int,int>> selectActivities(std::vector<std::pair<int,int>> a) {
    for(auto [s,e]:a)if(s>=e)throw std::invalid_argument("nonempty half-open interval required");
    std::stable_sort(a.begin(),a.end(),[](auto x,auto y){return x.second<y.second;});
    std::vector<std::pair<int,int>> out;
    for(auto x:a)if(out.empty()||x.first>=out.back().second)out.push_back(x);
    return out;
}
inline std::string maximumSwapDigits(std::string s) {
    if(s.empty()||s.find_first_not_of("0123456789")!=std::string::npos || (s.size()>1&&s[0]=='0'))
        throw std::invalid_argument("canonical nonnegative decimal required");
    std::vector<int> best(s.size());int last=static_cast<int>(s.size())-1;
    best[last]=last;
    for(int i=last-1;i>=0;--i) best[i]=(s[i]>s[best[i+1]]?i:best[i+1]);
    for(int i=0;i<=last;++i)if(s[i]<s[best[i]]){std::swap(s[i],s[best[i]]);break;}
    return s;
}
inline std::vector<std::string> expandFlatChoices(const std::vector<std::string>& groups) {
    if(groups.size()>8)throw std::invalid_argument("at most 8 groups");
    for(const auto& g:groups) {
        if(g.empty()||g.size()>4)throw std::invalid_argument("1..4 choices per group");
        std::string t=g;std::sort(t.begin(),t.end());
        if(std::adjacent_find(t.begin(),t.end())!=t.end())throw std::invalid_argument("duplicate choice");
    }
    std::vector<std::string> out;std::string current;
    std::function<void(std::size_t)> rec=[&](std::size_t i){
        if(i==groups.size()){out.push_back(current);return;}
        for(char c:groups[i]){current.push_back(c);rec(i+1);current.pop_back();}
    };rec(0);std::sort(out.begin(),out.end());return out;
}
inline std::vector<std::string> abbreviations(const std::string& word) {
    if(word.size()>12 || word.find_first_not_of("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")!=std::string::npos)
        throw std::invalid_argument("alphabetic word length <=12");
    std::vector<std::string> out;
    std::function<void(std::size_t,int,std::string)> rec=[&](std::size_t i,int pending,std::string path){
        if(i==word.size()){if(pending)path+=std::to_string(pending);out.push_back(path);return;}
        rec(i+1,pending+1,path);
        if(pending)path+=std::to_string(pending);
        rec(i+1,0,path+word[i]);
    };rec(0,0,"");return out;
}
inline std::vector<int> reflectedGray(int n) {
    if(n<1||n>16)throw std::invalid_argument("1..16 bits required");
    std::vector<int> out;out.reserve(1<<n);
    for(int i=0;i<(1<<n);++i) out.push_back(i^(i>>1));
    return out;
}
}
#endif
