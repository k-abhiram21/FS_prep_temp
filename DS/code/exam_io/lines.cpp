#include <iostream>
#include <limits>
#include <string>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if(!(cin>>n))return 0;
    cin.ignore(numeric_limits<streamsize>::max(),'\n');
    for(int i=0;i<n;++i) {
        string line;
        if(!getline(cin,line))return 1;
        if(!line.empty() && line.back()=='\r')line.pop_back(); // CRLF input.
        cout<<line.size()<<'|'<<line<<'\n'; // Byte length; ASCII pairing contract.
    }
}
