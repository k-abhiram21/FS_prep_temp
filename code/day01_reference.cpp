// DAA Day 1: reference solutions and executable checks.
// Read after attempting the worksheet. This is not a judge-specific submission.
// Assumes products/sums fit in signed 64-bit integers.
// Build: g++ -std=c++17 -O2 -Wall -Wextra -pedantic day01_reference.cpp -o /tmp/daa_day01

#include <cassert>
#include <functional>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <vector>

using std::vector;
using ll = long long;

vector<ll> productBrute(const vector<ll>& a) {
    vector<ll> result(a.size(), 1);
    for (std::size_t i = 0; i < a.size(); ++i)
        for (std::size_t j = 0; j < a.size(); ++j)
            if (j != i) result[i] *= a[j];
    return result;
}

// Lecture method: Theta(n) time; Theta(n) auxiliary memory.
vector<ll> productExceptSelf(const vector<ll>& a) {
    const int n = static_cast<int>(a.size());
    if (n == 0) return {};
    vector<ll> left(n, 1), right(n, 1), answer(n);
    for (int i = 1; i < n; ++i)
        left[i] = left[i - 1] * a[i - 1];
    for (int i = n - 2; i >= 0; --i)
        right[i] = right[i + 1] * a[i + 1];
    for (int i = 0; i < n; ++i)
        answer[i] = left[i] * right[i];
    return answer;
}

// Extension: Theta(n) time; Theta(1) auxiliary memory, excluding output.
vector<ll> productOutputReuse(const vector<ll>& a) {
    const int n = static_cast<int>(a.size());
    vector<ll> answer(n, 1);
    ll prefix = 1;
    for (int i = 0; i < n; ++i) {
        answer[i] = prefix;
        if (i + 1 < n) prefix *= a[i]; // no unused full-array product
    }
    ll suffix = 1;
    for (int i = n - 1; i >= 0; --i) {
        answer[i] *= suffix;
        if (i > 0) suffix *= a[i];
    }
    return answer;
}

ll factorial(int n) {
    if (n < 0 || n > 20)
        throw std::invalid_argument("factorial requires 0 <= n <= 20");
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

ll fibNaive(int n) {
    if (n < 0 || n > 30)
        throw std::invalid_argument("naive demo is limited to 0 <= n <= 30");
    if (n < 2) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);
}

ll fibMemo(int n) {
    if (n < 0 || n > 92)
        throw std::invalid_argument("64-bit Fibonacci requires 0 <= n <= 92");
    vector<ll> memo(n + 1, -1);
    std::function<ll(int)> solve = [&](int k) -> ll {
        if (k < 2) return k;
        if (memo[k] != -1) return memo[k];
        return memo[k] = solve(k - 1) + solve(k - 2);
    };
    return solve(n);
}

// Small-input lecture demonstration. Overshooting contributes zero ways.
ll waysRecursive(int n) {
    if (n > 20)
        throw std::invalid_argument("naive staircase demo is limited to n <= 20");
    if (n < 0) return 0;
    if (n == 0) return 1;
    return waysRecursive(n - 1) + waysRecursive(n - 2);
}

// Efficient recursive version: cache by number of remaining steps.
ll waysMemo(int n) {
    if (n < 0 || n > 91)
        throw std::invalid_argument("64-bit staircase requires 0 <= n <= 91");
    vector<ll> memo(n + 1, -1);
    std::function<ll(int)> solve = [&](int k) -> ll {
        if (k < 0) return 0;
        if (k == 0) return 1;
        if (memo[k] != -1) return memo[k];
        return memo[k] = solve(k - 1) + solve(k - 2);
    };
    return solve(n);
}

ll waysIterative(int n) {
    if (n < 0 || n > 91)
        throw std::invalid_argument("64-bit staircase requires 0 <= n <= 91");
    if (n <= 1) return 1;
    ll previousTwo = 1; // W(0)
    ll previousOne = 1; // W(1)
    for (int step = 2; step <= n; ++step) {
        const ll current = previousOne + previousTwo;
        previousTwo = previousOne;
        previousOne = current;
    }
    return previousOne;
}

ll sumFrom(const vector<ll>& a, std::size_t i = 0) {
    if (i >= a.size()) return 0;
    return a[i] + sumFrom(a, i + 1);
}

void head(int n, std::ostream& out) {
    if (n <= 0) return;
    head(n - 1, out);
    out << n << ' ';
}

void tail(int n, std::ostream& out) {
    if (n <= 0) return;
    out << n << ' ';
    tail(n - 1, out);
}

// A single shared counter, analogous to the lecture's Java static field.
static int count = 0;
void tree(int n, std::ostream& out) {
    ++count;
    if (n <= 0) return;
    out << n << ' ';
    tree(n - 1, out);
    tree(n - 1, out);
}

void B(int n, std::ostream& out);
void A(int n, std::ostream& out) {
    if (n <= 0) return;
    out << n << ' ';
    B(n - 1, out);
}
void B(int n, std::ostream& out) {
    if (n <= 0) return;
    out << n << ' ';
    A(n / 2, out);
}

int main() {
    const vector<ll> example = {3, 2, 1, 4, 5};
    assert((productExceptSelf(example) == vector<ll>{40, 60, 120, 30, 24}));
    assert((productExceptSelf({2, 0, 4}) == vector<ll>{0, 8, 0}));
    assert((productExceptSelf({0, 2, 0}) == vector<ll>{0, 0, 0}));
    assert((productExceptSelf({-1, 2, -3, 4}) == vector<ll>{-24, 12, -8, 6}));
    assert((productExceptSelf({2, 2, 3}) == vector<ll>{6, 6, 4}));

    // Independent brute-force oracle for all arrays of length 0..6 over -2..2.
    int arraysChecked = 0;
    for (int length = 0; length <= 6; ++length) {
        vector<ll> a(length);
        std::function<void(int)> enumerate = [&](int i) {
            if (i == length) {
                const auto expected = productBrute(a);
                assert(productExceptSelf(a) == expected);
                assert(productOutputReuse(a) == expected);
                ++arraysChecked;
                return;
            }
            for (ll value = -2; value <= 2; ++value) {
                a[i] = value;
                enumerate(i + 1);
            }
        };
        enumerate(0);
    }
    ll iterativeFactorial = 1;
    for (int n = 0; n <= 20; ++n) {
        if (n > 0) iterativeFactorial *= n;
        assert(factorial(n) == iterativeFactorial);
    }
    for (int n = 0; n <= 20; ++n)
        assert(fibNaive(n) == fibMemo(n));
    for (int n = 0; n <= 15; ++n)
        assert(waysRecursive(n) == waysMemo(n));
    for (int n = 0; n <= 91; ++n) {
        assert(waysMemo(n) == waysIterative(n));
        assert(waysMemo(n) == fibMemo(n + 1));
    }
    assert(waysMemo(10) == 89);
    assert(sumFrom({3, -2, 5, 0}) == 6);
    assert(sumFrom({}) == 0);

    std::ostringstream h, t, branches, indirect;
    head(4, h);
    tail(4, t);
    count = 0;
    tree(2, branches);
    assert(h.str() == "1 2 3 4 ");
    assert(t.str() == "4 3 2 1 ");
    assert(branches.str() == "2 1 1 " && count == 7);
    A(10, indirect);
    assert(indirect.str() == "10 9 4 3 1 ");

    std::cout << "Product: ";
    for (ll value : productExceptSelf(example)) std::cout << value << ' ';
    std::cout << "\nFactorial(4): " << factorial(4)
              << "\nFibonacci(6): " << fibMemo(6)
              << "\nStaircase(10): " << waysMemo(10)
              << "\nHead(4): " << h.str()
              << "\nTail(4): " << t.str()
              << "\nTree(2): " << branches.str() << "(calls=" << count << ')'
              << "\nIndirect A(10): " << indirect.str()
              << "\nChecks passed; product arrays checked: " << arraysChecked << '\n';
}
