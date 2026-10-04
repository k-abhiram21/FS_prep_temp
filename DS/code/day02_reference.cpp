#include <algorithm>
#include <string>
#include <unordered_set>
#include <vector>

using namespace std;

long long fibIterative(int n) {
    if (n <= 0) return 0;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = a + b;
        a = b;
        b = next;
    }
    return b;
}

long long fibState(int remaining, long long a = 0, long long b = 1) {
    if (remaining == 0) return a;
    return fibState(remaining - 1, b, a + b);
}

long long climbStairs(int n) {
    if (n <= 1) return 1;
    long long one = 1, two = 1; // ways(0), ways(1)
    for (int step = 2; step <= n; ++step) {
        long long current = one + two;
        one = two;
        two = current;
    }
    return two;
}

long long countWaysMemo(int remaining, int maxJump, vector<long long>& memo) {
    if (remaining == 0) return 1;
    if (remaining < 0) return 0;
    long long& answer = memo[remaining];
    if (answer != -1) return answer;
    answer = 0;
    for (int jump = 1; jump <= maxJump; ++jump)
        answer += countWaysMemo(remaining - jump, maxJump, memo);
    return answer;
}

long long countWays(int n, int maxJump) {
    if (n < 0 || maxJump <= 0) return 0;
    vector<long long> memo(n + 1, -1);
    return countWaysMemo(n, maxJump, memo);
}

void reverseInPlace(string& s) {
    int left = 0, right = static_cast<int>(s.size()) - 1;
    while (left < right) {
        swap(s[left], s[right]);
        ++left;
        --right;
    }
}

int digitSquareSum(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

bool isHappy(int n) {
    if (n <= 0) return false;
    unordered_set<int> seen;
    while (n != 1 && !seen.count(n)) {
        seen.insert(n);
        n = digitSquareSum(n);
    }
    return n == 1;
}
