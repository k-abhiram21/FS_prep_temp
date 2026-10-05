#include <iostream>
#include <vector>
using namespace std;
long long solve(const vector<long long>& a) {
    long long sum=0;
    for(long long x:a) sum+=x; // Contract: sum fits signed 64-bit.
    return sum;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    if(!(cin>>t)) return 0;
    while(t--) {
        int n;cin>>n;
        vector<long long>a(n);
        for(auto& x:a)cin>>x;
        cout<<solve(a)<<'\n';
    }
}
