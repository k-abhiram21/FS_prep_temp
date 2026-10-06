// Explicit branch conditions and stopping states; sequential actions do not imply parallel execution.
export const conceptFlows = {
  strings: `flowchart TD
 A["Read a and b"] --> B{"b equals 0?"}
 B -->|Yes| C["Return a"]
 B -->|No| D["Save r = a mod b"]
 D --> E["Set a = b, then b = r"]
 E --> B`,
  quicksort: `flowchart TD
 A["Save last pivot; set i and j to low"] --> B{"j is before pivot?"}
 B -->|No| G["Swap pivot with a at i"]
 G --> H["Sort both intervals excluding i"]
 B -->|Yes| C{"a at j is smaller than pivot?"}
 C -->|Yes| D["Swap a at i and j; advance i"]
 C -->|No| E["Leave this value in the other region"]
 D --> F["Advance j"]
 E --> F
 F --> B`,
  majority: `flowchart TD
 A["Set count to 0"] --> B{"Another value remains?"}
 B -->|No| G["Count candidate occurrences if existence is not promised"]
 B -->|Yes| C{"Count equals 0?"}
 C -->|Yes| D["Choose current value as candidate"]
 C -->|No| E["Keep candidate"]
 D --> F["Add 1 for equality; subtract 1 otherwise"]
 E --> F
 F --> B`,
  power: `flowchart TD
 A["Widen exponent; normalize negative exponent with reciprocal"] --> B["Call power on nonnegative exponent"]
 B --> C{"Exponent equals 0?"}
 C -->|Yes| D["Return 1"]
 C -->|No| E["Calculate half-power once"]
 E --> F{"Exponent is odd?"}
 F -->|Yes| G["Return half squared times base"]
 F -->|No| H["Return half squared"]`,
  merge: `flowchart TD
 A["Read interval"] --> B{"At most one value?"}
 B -->|Yes| C["Return the interval"]
 B -->|No| D["Split; recursively finish both halves"]
 D --> E["Compare the two remaining heads"]
 E --> F["Emit smaller head; choose left on equality"]
 F --> G{"Both halves still have values?"}
 G -->|Yes| E
 G -->|No| H["Copy the remaining values; write result back"]`,
  binary: `flowchart TD
 A["Set half-open range lo=0, hi=n"] --> B{"lo is smaller than hi?"}
 B -->|No| C["Return lower-bound index lo"]
 B -->|Yes| D["Calculate mid safely"]
 D --> E{"a at mid is at least target?"}
 E -->|Yes| F["Set hi=mid"]
 E -->|No| G["Set lo=mid+1"]
 F --> B
 G --> B`,
  koko: `flowchart TD
 A["Set speed range 1 through maximum pile"] --> B{"lo is smaller than hi?"}
 B -->|No| G["Return smallest feasible speed lo"]
 B -->|Yes| C["Choose mid; sum per-pile ceiling hours"]
 C --> D{"Total hours fit h?"}
 D -->|Yes| E["Set hi=mid"]
 D -->|No| F["Set lo=mid+1"]
 E --> B
 F --> B`,
  lcp: `flowchart TD
 A["Find shortest length L; set column i=0"] --> B{"i is below L?"}
 B -->|No| G["Return prefix of length L"]
 B -->|Yes| C["Compare this column across all strings"]
 C --> D{"All characters agree?"}
 D -->|No| E["Return prefix before i"]
 D -->|Yes| F["Advance i"]
 F --> B`,
  greedy: `flowchart TD
 A["Sort fractional items by decreasing value per weight"] --> B{"Capacity and items remain?"}
 B -->|No| F["Return total value"]
 B -->|Yes| C{"Best remaining item fits?"}
 C -->|Yes| D["Take it all; subtract its weight"]
 D --> B
 C -->|No| E["Take remaining-capacity fraction"]
 E --> F`,
  dijkstra: `flowchart TD
 A["Source distance=0; other distances=infinity"] --> B["Select smallest reachable unsettled distance"]
 B --> C{"A reachable vertex exists?"}
 C -->|No| F["Return distances; unreachable values stay infinity"]
 C -->|Yes| D["Finalize that vertex"]
 D --> E["Relax each edge with source distance plus weight"]
 E --> B`,
  mst: `flowchart TD
 A["Sort edges; initialize separate DSU sets"] --> B{"Edges remain and accepted count below V-1?"}
 B -->|No| G["Return tree if connected; otherwise report forest"]
 B -->|Yes| C["Read next edge; find endpoint roots"]
 C --> D{"Roots differ?"}
 D -->|Yes| E["Accept edge; unite roots; increase accepted count"]
 D -->|No| F["Reject cycle edge"]
 E --> B
 F --> B`,
  bfs: `flowchart TD
 A["Mark start; append it to queue"] --> B{"Queue is empty?"}
 B -->|Yes| G["Return traversal results"]
 B -->|No| C["Remove front vertex"]
 C --> D["Inspect each neighbor in the stated order"]
 D --> E{"Neighbor is unvisited?"}
 E -->|Yes| F["Mark neighbor; append it at the back"]
 E -->|No| H["Do not enqueue again"]
 F --> I{"More neighbors remain?"}
 H --> I
 I -->|Yes| D
 I -->|No| B`,
  trees: `flowchart TD
 A["Check subtree"] --> B{"Node is null?"}
 B -->|Yes| C["Return height 0"]
 B -->|No| D["Get left height or failure"]
 D --> E{"Left failed?"}
 E -->|Yes| H["Return failure"]
 E -->|No| F["Get right height or failure"]
 F --> G{"Right failed or height difference above 1?"}
 G -->|Yes| H
 G -->|No| I["Return 1 plus the larger height"]`,
  backtracking: `flowchart TD
 A["Enter current search state"] --> B{"State is complete?"}
 B -->|Yes| C["Copy completed result; return"]
 B -->|No| D{"Another candidate remains?"}
 D -->|No| E["Return to caller"]
 D -->|Yes| F{"Candidate is permitted?"}
 F -->|No| D
 F -->|Yes| G["Apply choice; recurse"]
 G --> H["Undo this choice"]
 H --> D`,
  generators: `flowchart TD
 A["Parse one factor with nesting-aware state"] --> B["Concatenate it with current prefix set"]
 B --> C{"Next token at this level?"}
 C -->|Adjacent factor| A
 C -->|Comma| D["Union current product; reset prefix to empty string"]
 D --> A
 C -->|End or matching brace| E["Union final product; return deduplicated set"]`,
  stock: `flowchart TD
 A["Read the trading rules"] --> B{"At most one trade?"}
 B -->|Yes| C["Track minimum earlier price and best sale gain"]
 B -->|No| D{"Unlimited trades without fees or cooldown?"}
 D -->|Yes| E["Sum positive adjacent differences"]
 D -->|No| F["Derive states for the changed contract"]
 C --> G["Return optional-trade profit"]
 E --> G`,
  maxswap: `flowchart TD
 A["Record rightmost occurrence of each digit"] --> B{"Another position remains?"}
 B -->|No| F["Return unchanged number"]
 B -->|Yes| C{"A larger digit occurs later?"}
 C -->|Yes| D["Swap with rightmost largest digit; return"]
 C -->|No| E["Advance to next position"]
 E --> B`,
  islands: `flowchart TD
 A["Begin grid scan"] --> B{"Another cell remains?"}
 B -->|No| F["Return the requested component property"]
 B -->|Yes| C{"Cell is unvisited land?"}
 C -->|Yes| D["Flood and mark its four-direction component"]
 D --> E["Update count, area, or normalized shape as requested"]
 E --> B
 C -->|No| B`,
  hamiltonian: `flowchart TD
 A["Fix start; enter current path"] --> B{"All vertices are selected?"}
 B -->|Yes| C["Return whether the closing edge exists"]
 B -->|No| D{"Another unused adjacent candidate remains?"}
 D -->|No| E["Return failure"]
 D -->|Yes| F["Add candidate; recursively search"]
 F --> G{"Child found a cycle?"}
 G -->|Yes| H["Return success with the stored witness"]
 G -->|No| I["Remove candidate"]
 I --> D`,
  campus: `flowchart TD
 A["Enter next-worker state"] --> B{"All workers assigned?"}
 B -->|Yes| C["Return completion cost 0"]
 B -->|No| D["Try every unused bike"]
 D --> E["Mark bike; add distance and recursive completion cost"]
 E --> F["Unmark bike; retain the smallest total"]
 F --> G{"Another unused-bike choice remains?"}
 G -->|Yes| D
 G -->|No| H["Return the minimum total"]`,
}
