const row = (label, values, active = [], settled = []) => ({ label, values, active, settled })
const arrays = (rows, extra = '') => ({ type: 'arrays', rows, extra })

export const labs = {
  prefix: {
    title: 'Exclusive products', caption: 'Input [2, 3, 4, 5]',
    frames: [
      { label: 'Start', thought: 'The answer begins empty. Prefix and suffix both start at 1.', visual: arrays([row('Input', [2, 3, 4, 5]), row('Answer', [null, null, null, null])], 'prefix = 1') },
      { label: 'Write prefix at 0', thought: 'Write 1 before multiplying by 2.', visual: arrays([row('Input', [2, 3, 4, 5], [0]), row('Answer', [1, null, null, null], [0])], 'prefix becomes 2') },
      { label: 'Write prefix at 1', thought: 'Everything left of index 1 multiplies to 2.', visual: arrays([row('Input', [2, 3, 4, 5], [1]), row('Answer', [1, 2, null, null], [1])], 'prefix becomes 6') },
      { label: 'Write prefix at 2', thought: 'The exclusive left product is 2 × 3 = 6.', visual: arrays([row('Input', [2, 3, 4, 5], [2]), row('Answer', [1, 2, 6, null], [2])], 'prefix becomes 24') },
      { label: 'Write prefix at 3', thought: 'The left pass ends at [1, 2, 6, 24].', visual: arrays([row('Input', [2, 3, 4, 5], [3]), row('Answer', [1, 2, 6, 24], [3])], 'suffix = 1') },
      { label: 'Right pass at 3', thought: 'No values are right of index 3, so multiply by 1.', visual: arrays([row('Input', [2, 3, 4, 5], [3]), row('Answer', [1, 2, 6, 24], [3])], 'suffix becomes 5') },
      { label: 'Right pass at 2', thought: 'Multiply 6 by the suffix 5.', visual: arrays([row('Input', [2, 3, 4, 5], [2]), row('Answer', [1, 2, 30, 24], [2])], 'suffix becomes 20') },
      { label: 'Right pass at 1', thought: 'Multiply 2 by 4 × 5 = 20.', visual: arrays([row('Input', [2, 3, 4, 5], [1]), row('Answer', [1, 40, 30, 24], [1])], 'suffix becomes 60') },
      { label: 'Right pass at 0', thought: 'Multiply 1 by 3 × 4 × 5 = 60. Done.', visual: arrays([row('Input', [2, 3, 4, 5], [0]), row('Answer', [60, 40, 30, 24], [0])], 'final answer') },
    ],
  },
  recursion: {
    title: 'Call frames', caption: 'fib(3), with fib(0)=0 and fib(1)=1',
    frames: [
      { label: 'Call fib(3)', thought: 'One active frame; it needs fib(2) and fib(1).', visual: { type: 'stack', calls: ['fib(3)'], result: '—' } },
      { label: 'Call fib(2)', thought: 'fib(3) pauses while fib(2) runs.', visual: { type: 'stack', calls: ['fib(3)', 'fib(2)'], result: '—' } },
      { label: 'Base fib(1)', thought: 'A base call returns 1 immediately.', visual: { type: 'stack', calls: ['fib(3)', 'fib(2)', 'fib(1) → 1'], result: '1' } },
      { label: 'Base fib(0)', thought: 'The other child of fib(2) returns 0.', visual: { type: 'stack', calls: ['fib(3)', 'fib(2)', 'fib(0) → 0'], result: '0' } },
      { label: 'Return fib(2)', thought: 'fib(2) returns 1 + 0 = 1; its frame is removed.', visual: { type: 'stack', calls: ['fib(3)', 'fib(2) → 1'], result: '1' } },
      { label: 'Call second fib(1)', thought: 'fib(3) now evaluates its second child.', visual: { type: 'stack', calls: ['fib(3)', 'fib(1) → 1'], result: '1' } },
      { label: 'Return fib(3)', thought: 'fib(3) returns 1 + 1 = 2.', visual: { type: 'stack', calls: ['fib(3) → 2'], result: '2' } },
    ],
  },
  quicksort: {
    title: 'Lomuto partition', caption: 'Last pivot 30; strict less-than',
    frames: [
      { label: 'Pick pivot', thought: 'i=0; values before i are the smaller region.', visual: arrays([row('Array', [60, 50, 20, 70, 30], [4])], 'pivot = 30, i = 0') },
      { label: 'Scan 60', thought: '60 is not less than 30, so i stays 0.', visual: arrays([row('Array', [60, 50, 20, 70, 30], [0, 4])], 'j = 0, i = 0') },
      { label: 'Scan 50', thought: '50 is not less than 30; keep scanning.', visual: arrays([row('Array', [60, 50, 20, 70, 30], [1, 4])], 'j = 1, i = 0') },
      { label: 'Swap 20 left', thought: '20 < 30, so swap indices 0 and 2, then i becomes 1.', visual: arrays([row('Array', [20, 50, 60, 70, 30], [0, 2, 4], [0])], 'j = 2, i = 1') },
      { label: 'Scan 70', thought: '70 stays in the at-least-pivot region.', visual: arrays([row('Array', [20, 50, 60, 70, 30], [3, 4], [0])], 'j = 3, i = 1') },
      { label: 'Place pivot', thought: 'Swap 50 and 30. Pivot 30 is now final at index 1; the rest is not sorted.', visual: arrays([row('Array', [20, 30, 60, 70, 50], [1], [0, 1])], 'pivot index = 1') },
    ],
  },
  merge: {
    title: 'Final merge', caption: 'State after both recursive halves finish',
    frames: [
      { label: 'Before merge', thought: 'The array is [4,5,6,1,2,3], not the original descending order.', visual: arrays([row('Left', [4, 5, 6]), row('Right', [1, 2, 3]), row('Merged', [null, null, null, null, null, null])], 'compare left 4 and right 1') },
      { label: 'Take 1', thought: '1 is smaller, so advance only the right pointer.', visual: arrays([row('Left', [4, 5, 6], [0]), row('Right', [1, 2, 3], [0]), row('Merged', [1, null, null, null, null, null], [0])], 'next: 4 vs 2') },
      { label: 'Take 2', thought: 'The right half still has the smaller head.', visual: arrays([row('Left', [4, 5, 6], [0]), row('Right', [1, 2, 3], [1]), row('Merged', [1, 2, null, null, null, null], [1])], 'next: 4 vs 3') },
      { label: 'Take 3', thought: 'The right half is now exhausted.', visual: arrays([row('Left', [4, 5, 6], [0]), row('Right', [1, 2, 3], [2]), row('Merged', [1, 2, 3, null, null, null], [2])], 'drain left') },
      { label: 'Drain left', thought: 'Copy 4, 5, 6 in order.', visual: arrays([row('Left', [4, 5, 6]), row('Right', [1, 2, 3]), row('Merged', [1, 2, 3, 4, 5, 6], [], [0, 1, 2, 3, 4, 5])], 'sorted') },
    ],
  },
  binary: {
    title: 'First occurrence', caption: 'Lower bound of 2 in [1, 2, 2, 2, 4]',
    frames: [
      { label: 'Interval [0,5)', thought: 'The answer lies somewhere in this half-open interval.', visual: arrays([row('Array', [1, 2, 2, 2, 4])], 'lo = 0, hi = 5') },
      { label: 'Test mid 2', thought: 'a[2]=2 is enough; keep the left half including mid.', visual: arrays([row('Array', [1, 2, 2, 2, 4], [2])], 'lo = 0, hi = 2') },
      { label: 'Test mid 1', thought: 'a[1]=2; keep searching left for an earlier 2.', visual: arrays([row('Array', [1, 2, 2, 2, 4], [1])], 'lo = 0, hi = 1') },
      { label: 'Test mid 0', thought: 'a[0]=1<2, so discard it.', visual: arrays([row('Array', [1, 2, 2, 2, 4], [0])], 'lo = 1, hi = 1') },
      { label: 'Answer', thought: 'The first value ≥2 is at index 1.', visual: arrays([row('Array', [1, 2, 2, 2, 4], [1], [1])], 'lower bound = 1') },
    ],
  },
  koko: {
    title: 'First feasible speed', caption: 'Piles [30,11,23,4,20], h = 6',
    frames: [
      { label: 'Test 15', thought: 'Hours: 2+1+2+1+2 = 8. Too slow.', visual: arrays([row('Piles', [30, 11, 23, 4, 20]), row('Hours', [2, 1, 2, 1, 2])], 'speed 15 → 8 hours; search [16,30]') },
      { label: 'Test 23', thought: 'Hours: 2+1+1+1+1 = 6. Feasible; try smaller.', visual: arrays([row('Piles', [30, 11, 23, 4, 20]), row('Hours', [2, 1, 1, 1, 1])], 'speed 23 → 6 hours; search [16,23]') },
      { label: 'Test 19', thought: 'Hours total 8; reject this and every lower speed.', visual: arrays([row('Piles', [30, 11, 23, 4, 20]), row('Hours', [2, 1, 2, 1, 2])], 'speed 19 → 8 hours; search [20,23]') },
      { label: 'Test 21', thought: 'Hours total 7; still too slow.', visual: arrays([row('Piles', [30, 11, 23, 4, 20]), row('Hours', [2, 1, 2, 1, 1])], 'speed 21 → 7 hours; search [22,23]') },
      { label: 'Test 22', thought: 'Hours total 7; speed 22 is not feasible.', visual: arrays([row('Piles', [30, 11, 23, 4, 20]), row('Hours', [2, 1, 2, 1, 1])], 'speed 22 → 7 hours; search [23,23]') },
      { label: 'Answer 23', thought: '23 is feasible and 22 is not, so it is the minimum.', visual: arrays([row('Piles', [30, 11, 23, 4, 20]), row('Hours', [2, 1, 1, 1, 1], [], [0, 1, 2, 3, 4])], 'minimum speed = 23') },
    ],
  },
  greedy: {
    title: 'Fractional knapsack', caption: 'Capacity 50; items sorted by value/weight',
    frames: [
      { label: 'Sort by density', thought: 'Ratios are 6, 5, 4. Choose in this order.', visual: { type: 'items', items: [['10 kg', '60 value', '6'], ['20 kg', '100 value', '5'], ['30 kg', '120 value', '4']], active: -1, total: '0 / 50 kg · value 0' } },
      { label: 'Take first', thought: 'Take all 10 kg of the highest-density item.', visual: { type: 'items', items: [['10 kg', '60 value', '6'], ['20 kg', '100 value', '5'], ['30 kg', '120 value', '4']], active: 0, done: [0], total: '10 / 50 kg · value 60' } },
      { label: 'Take second', thought: 'Take all 20 kg of the next item.', visual: { type: 'items', items: [['10 kg', '60 value', '6'], ['20 kg', '100 value', '5'], ['30 kg', '120 value', '4']], active: 1, done: [0, 1], total: '30 / 50 kg · value 160' } },
      { label: 'Take fraction', thought: 'Only 20 kg remains: take 2/3 of the last item for value 80.', visual: { type: 'items', items: [['10 kg', '60 value', '6'], ['20 kg', '100 value', '5'], ['20 of 30 kg', '80 value', '4']], active: 2, done: [0, 1, 2], total: '50 / 50 kg · value 240' } },
    ],
  },
  coins: {
    title: 'Largest coin is not enough', caption: 'Amount 7, denominations {1, 3, 4, 5}',
    frames: [
      { label: 'Start at 7', thought: 'The greedy rule takes the largest coin no larger than the remaining amount.', visual: arrays([row('Coins', [1, 3, 4, 5]), row('Greedy', [null, null, null]), row('Better', [null, null])], 'remaining = 7') },
      { label: 'Take 5', thought: 'Largest affordable coin is 5; 2 remains.', visual: arrays([row('Coins', [1, 3, 4, 5], [3]), row('Greedy', [5, null, null], [0]), row('Better', [null, null])], 'remaining = 2') },
      { label: 'Take 1 twice', thought: 'Greedy finishes with 5 + 1 + 1, using three coins.', visual: arrays([row('Coins', [1, 3, 4, 5], [0]), row('Greedy', [5, 1, 1], [], [0, 1, 2]), row('Better', [null, null])], 'greedy count = 3') },
      { label: 'Try 3 + 4', thought: 'A different first choice reaches 7 in only two coins, so this greedy rule fails here.', visual: arrays([row('Coins', [1, 3, 4, 5], [1, 2]), row('Greedy', [5, 1, 1]), row('Better', [3, 4], [], [0, 1])], 'better count = 2') },
    ],
  },
  dijkstra: {
    title: 'Shortest path labels', caption: 'Source A; all weights nonnegative',
    frames: [
      { label: 'Start at A', thought: 'A has distance 0; the others start at infinity.', visual: { type: 'graph', current: 'A', frontier: ['A'], visited: [], distances: { A: 0, B: '∞', C: '∞', D: '∞' } } },
      { label: 'Relax from A', thought: 'Tentative B=4 and C=1.', visual: { type: 'graph', current: 'A', frontier: ['B', 'C'], visited: ['A'], distances: { A: 0, B: 4, C: 1, D: '∞' } } },
      { label: 'Settle C', thought: 'C is nearest. Via C, B improves to 3 and D becomes 6.', visual: { type: 'graph', current: 'C', frontier: ['B', 'D'], visited: ['A', 'C'], distances: { A: 0, B: 3, C: 1, D: 6 } } },
      { label: 'Settle B', thought: 'B=3. Edge B→D improves D to 4.', visual: { type: 'graph', current: 'B', frontier: ['D'], visited: ['A', 'C', 'B'], distances: { A: 0, B: 3, C: 1, D: 4 } } },
      { label: 'Settle D', thought: 'All reachable vertices are finalized.', visual: { type: 'graph', current: 'D', frontier: [], visited: ['A', 'B', 'C', 'D'], distances: { A: 0, B: 3, C: 1, D: 4 } } },
    ],
  },
  kruskal: {
    title: 'Cycle decisions', caption: 'Sorted edges AB1, BC2, AC3, CD4, BD5',
    frames: [
      { label: 'Start', thought: 'Every vertex is its own DSU component.', visual: { type: 'edges', selected: [], active: '', components: 'A | B | C | D', weight: 0 } },
      { label: 'Accept AB', thought: 'Different roots; join A and B.', visual: { type: 'edges', selected: ['AB'], active: 'AB', components: 'AB | C | D', weight: 1 } },
      { label: 'Accept BC', thought: 'B and C have different roots; join them.', visual: { type: 'edges', selected: ['AB', 'BC'], active: 'BC', components: 'ABC | D', weight: 3 } },
      { label: 'Reject AC', thought: 'A and C already share a root; AC would make a cycle.', visual: { type: 'edges', selected: ['AB', 'BC'], rejected: ['AC'], active: 'AC', components: 'ABC | D', weight: 3 } },
      { label: 'Accept CD', thought: 'D joins the tree. We have V−1 edges.', visual: { type: 'edges', selected: ['AB', 'BC', 'CD'], rejected: ['AC'], active: 'CD', components: 'ABCD', weight: 7 } },
    ],
  },
  bfs: {
    title: 'Queue frontier', caption: 'Start A; neighbour order B before C',
    frames: [
      { label: 'Discover A', thought: 'Mark A when it enters the queue.', visual: { type: 'graph', graph: 'bfs', current: 'A', frontier: ['A'], visited: ['A'], queue: ['A'] } },
      { label: 'Expand A', thought: 'Dequeue A. Enqueue B and C, marking both now.', visual: { type: 'graph', graph: 'bfs', current: 'A', frontier: ['B', 'C'], visited: ['A', 'B', 'C'], queue: ['B', 'C'] } },
      { label: 'Expand B', thought: 'Discover D after B; C remains ahead in the queue.', visual: { type: 'graph', graph: 'bfs', current: 'B', frontier: ['C', 'D'], visited: ['A', 'B', 'C', 'D'], queue: ['C', 'D'] } },
      { label: 'Expand C', thought: 'Discover E. Queue order is D then E.', visual: { type: 'graph', graph: 'bfs', current: 'C', frontier: ['D', 'E'], visited: ['A', 'B', 'C', 'D', 'E'], queue: ['D', 'E'] } },
      { label: 'Expand D', thought: 'Discover F; it is three edges from A.', visual: { type: 'graph', graph: 'bfs', current: 'D', frontier: ['E', 'F'], visited: ['A', 'B', 'C', 'D', 'E', 'F'], queue: ['E', 'F'] } },
      { label: 'Finish', thought: 'E also touches F, but F was marked when enqueued, so it is not added twice.', visual: { type: 'graph', graph: 'bfs', current: 'F', frontier: [], visited: ['A', 'B', 'C', 'D', 'E', 'F'], queue: [] } },
    ],
  },
  queens: {
    title: 'Place and undo', caption: 'One 4-queens solution, columns by row',
    frames: [
      { label: 'Empty board', thought: 'Try one queen in each row.', visual: { type: 'board', queens: [], active: null } },
      { label: 'Row 0 → col 1', thought: 'Column 1 is safe on an empty board.', visual: { type: 'board', queens: [1], active: [0, 1] } },
      { label: 'Row 1 → col 3', thought: 'Column 3 avoids the column and diagonal of row 0.', visual: { type: 'board', queens: [1, 3], active: [1, 3] } },
      { label: 'Reject col 1', thought: 'A trial in column 1 of row 2 conflicts with row 0; leave it empty.', visual: { type: 'board', queens: [1, 3], active: [2, 1], conflict: true } },
      { label: 'Row 2 → col 0', thought: 'Column 0 is safe.', visual: { type: 'board', queens: [1, 3, 0], active: [2, 0] } },
      { label: 'Row 3 → col 2', thought: 'All four queens are placed with no shared column or diagonal.', visual: { type: 'board', queens: [1, 3, 0, 2], active: [3, 2] } },
    ],
  },
}
