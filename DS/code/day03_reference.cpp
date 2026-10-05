// Day 3: recursion and arrays/strings only. Read after attempting the worksheet.
// No standalone primality implementation: study that via notes and MCQ snippets.
// Build: g++ -std=c++17 -O2 -Wall -Wextra -pedantic day03_reference.cpp -o /tmp/daa_day03
// Commands on stdin: gcd K x1 ... xK | check DIGITS | recursive DIGITS |
//                   generate N | intersection DIGITS
// Examples: gcd 4 10 20 50 77 ; check 689 ; generate 3

#include <algorithm>
#include <array>
#include <iostream>
#include <limits>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace day03 {
using ll = long long;

// LLONG_MIN cannot be negated in this signed type; reject it explicitly.
ll magnitude(ll x) {
    if (x == std::numeric_limits<ll>::min())
        throw std::invalid_argument("minimum signed 64-bit input is unsupported");
    return x < 0 ? -x : x;
}

ll gcdNonnegative(ll a, ll b) {
    if (b == 0) return a;
    return gcdNonnegative(b, a % b);
}

ll gcdRecursive(ll a, ll b) {
    return gcdNonnegative(magnitude(a), magnitude(b));
}

ll gcdIterative(ll a, ll b) {
    a = magnitude(a);
    b = magnitude(b);
    while (b != 0) {
        const ll remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

// Convention: an empty array / all-zero array has GCD 0.
ll gcdArray(const std::vector<ll>& values) {
    ll result = 0;
    for (ll x : values) {
        result = gcdRecursive(result, x);
        if (result == 1) return 1;
    }
    return result;
}

constexpr std::array<int, 10> rotation = {0,1,-1,-1,-1,-1,9,-1,8,6};

// Public string convention: canonical nonnegative decimal representation.
bool canonicalDigits(const std::string& s) {
    if (s.empty() || (s.size() > 1 && s.front() == '0')) return false;
    for (char c : s)
        if (c < '0' || c > '9') return false;
    return true;
}

bool isStrobogrammatic(const std::string& s) {
    if (!canonicalDigits(s)) return false;
    std::size_t left = 0, right = s.size() - 1;
    while (left <= right) {
        const int mapped = rotation[s[left] - '0'];
        if (mapped < 0 || mapped != s[right] - '0') return false;
        // Avoid decrementing an unsigned zero after the centre is checked.
        if (left == right) break;
        ++left;
        --right;
    }
    return true;
}

// Half-open interval [left,right) avoids negative/unsigned boundary indexes.
bool checkRecursive(const std::string& s, std::size_t left, std::size_t right) {
    if (left >= right) return true;
    const int mapped = rotation[s[left] - '0'];
    if (mapped < 0 || mapped != s[right - 1] - '0') return false;
    return checkRecursive(s, left + 1, right - 1);
}

bool isStrobogrammaticRecursive(const std::string& s) {
    return canonicalDigits(s) && checkRecursive(s, 0, s.size());
}

std::vector<std::string> build(int remaining, int total) {
    if (remaining == 0) return {""}; // ONE empty middle, not zero middles
    if (remaining == 1) return {"0", "1", "8"};
    const auto middles = build(remaining - 2, total);
    constexpr std::array<std::pair<char,char>, 5> pairs = {{
        {'0','0'}, {'1','1'}, {'6','9'}, {'8','8'}, {'9','6'}
    }};
    std::vector<std::string> answer;
    for (const auto& middle : middles) {
        for (const auto& pair : pairs) {
            if (remaining == total && pair.first == '0') continue;
            answer.push_back(std::string(1, pair.first) + middle + pair.second);
        }
    }
    return answer;
}

std::vector<std::string> generateStrobogrammatic(int digits) {
    // Demo guard for exponential output; not a restriction of the concept.
    if (digits < 1 || digits > 8)
        throw std::invalid_argument("reference enumeration supports 1..8 digits");
    auto answer = build(digits, digits);
    std::sort(answer.begin(), answer.end());
    return answer;
}

// Optional strings transfer: palindrome AND strobogrammatic in a single scan.
bool isStrobogrammaticPalindrome(const std::string& s) {
    if (!canonicalDigits(s)) return false;
    for (std::size_t left = 0; left < (s.size() + 1) / 2; ++left) {
        const char c = s[left];
        if ((c != '0' && c != '1' && c != '8') || c != s[s.size()-1-left])
            return false;
    }
    return true;
}
} // namespace day03

#ifndef DAY03_NO_MAIN
int main() {
    std::string command;
    if (!(std::cin >> command)) return 1;
    try {
        if (command == "gcd") {
            int count;
            if (!(std::cin >> count) || count < 0) return 1;
            std::vector<day03::ll> values;
            for (int i = 0; i < count; ++i) {
                day03::ll x;
                if (!(std::cin >> x)) return 1;
                values.push_back(x);
            }
            std::cout << day03::gcdArray(values) << '\n';
        } else if (command == "generate") {
            int digits;
            if (!(std::cin >> digits)) return 1;
            for (const auto& s : day03::generateStrobogrammatic(digits))
                std::cout << s << '\n';
        } else if (command == "check" || command == "recursive" || command == "intersection") {
            std::string s;
            if (!(std::cin >> s)) return 1;
            bool result;
            if (command == "check") result = day03::isStrobogrammatic(s);
            else if (command == "recursive") result = day03::isStrobogrammaticRecursive(s);
            else result = day03::isStrobogrammaticPalindrome(s);
            std::cout << std::boolalpha << result << '\n';
        } else {
            std::cerr << "Unknown command\n";
            return 1;
        }
    } catch (const std::exception& error) {
        std::cerr << error.what() << '\n';
        return 1;
    }
}
#endif
