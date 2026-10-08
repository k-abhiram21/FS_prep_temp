# Computer Networks: complete FS study guide

**Study this file directly. No prior college-note reading is required.** It teaches the announced OSI model, Physical Layer, and Data Link Layer. Read the explanations, work through the binary examples, then answer the included MCQs. Physical Layer is broad in the notice, so the signal and capacity basics are included here.

Test: **9 October 2026**. [Other subject guides](../FS_SUBJECT_NOTES.md).

**ai explnation due to lack of material** — explanations and worked calculations are AI-authored. College CN notes cover the main layer, media, framing, error-control, and access topics. Signal encoding, capacity, and added calculations supply focused teaching where the selected material is incomplete.


**Deep practice:** [70 hard MCQs with hidden explanations](FS_CN_Hard_MCQ_Bank.md) · [coverage and source-gap map](../FS_Remaining_Subjects_Learning_Map.md)

## 1. Start with what crosses a link

A **network** connects devices so they can exchange data. A **link** is a connection between neighboring devices. A **medium** carries its signals, such as copper, optical fiber, or wireless propagation.

A **bit** is a binary value, 0 or 1. Eight bits form a byte. A bit is information; an electrical or optical signal is its physical representation. Devices agree on rules, called **protocols**, for interpreting the exchange.

Binary positions have values 1,2,4,8,... from right to left. Thus `110` means 4+2+0 = 6. A value written as bits is different from its number of bits: `110` has three bits but represents six.

A network conversation can cross several links. A **frame** is the Data Link unit for one link. A **packet** is the Network-layer unit that can be routed across links. A frame can carry a packet as its **payload**, meaning the data it transports for the next higher layer.

## 2. OSI: seven layers and their jobs

The **Open Systems Interconnection**, or OSI, model separates communication responsibilities. Number the layers from the bottom.

| Layer | Main job | Recognizing clue |
|---|---|---|
| 7. Application | Services used by applications | Web requests, mail services, file transfer. |
| 6. Presentation | Represent data in an agreed form | Encoding formats, compression, encryption in the textbook mapping. |
| 5. Session | Organize a dialogue | Establish, manage, or resume a session. |
| 4. Transport | End-to-end transport between application processes | Segmentation, ports, reliability where the protocol provides it. |
| 3. Network | Deliver across networks | Logical addressing and routing, such as IP forwarding. |
| 2. Data Link | Deliver frames on a link | Framing, MAC addresses, link access and error handling. |
| 1. Physical | Transmit signals representing bits | Cables, signal levels, timing, connectors. |

Bottom to top: **Physical → Data Link → Network → Transport → Session → Presentation → Application**. The top three commonly describe data; Transport uses terms such as segment or datagram; Network uses packet; Data Link uses frame; Physical transmits signals carrying bits.

The model explains responsibilities. Actual protocols and devices can combine functions from several layers. For example, a link does not necessarily implement reliable retransmission just because error handling is a Data Link responsibility.

### Encapsulation and decapsulation

**Encapsulation** adds control information as data moves down the stack:

```text
Application data
  → transport header + data
  → network header + transport unit
  → link header + packet + link trailer
  → physical signals
```

A **header** goes before payload; a **trailer** goes after it. Control fields can identify addresses, lengths, or error checks. At receipt, **decapsulation** processes the corresponding information upward.

### Follow a packet through a router

Suppose a computer sends to a server through a router:

1. The first frame uses the computer's source link address and the router's next-hop link address.
2. The router receives that frame and processes its link information.
3. It examines the packet's destination and selects an outgoing link.
4. It constructs a new frame appropriate for that link.

The destination MAC on the first Ethernet link identifies the next hop, not necessarily the final server. IP addresses identify the routed endpoints in this ordinary example; forwarding fields such as TTL can change. Address translation can also alter addresses, so “every packet bit is unchanged” is too strong.

### Devices

| Device | Primary textbook role |
|---|---|
| Repeater / active hub | Layer 1: regenerate or distribute signals. |
| Bridge / ordinary Ethernet switch | Layer 2: forward based on MAC addresses. |
| Router | Layer 3: forward based on network addresses. |

A switch learns source MAC locations from frames. It forwards a known destination toward the appropriate port. Unknown destinations and broadcasts may be flooded to other appropriate ports. This differs from a hub that repeats signals without inspecting destination addresses.

## 3. Physical Layer: direction, media, and signal quality

### Direction of communication

| Mode | Meaning | Example |
|---|---|---|
| Simplex | Data travels in one direction. | A one-way broadcast. |
| Half duplex | Both directions are supported, at different times. | A push-to-talk exchange. |
| Full duplex | Both directions operate simultaneously. | A suitable two-way link. |

Full duplex does not imply unlimited speed. Direction and capacity describe different properties.

### Guided and unguided media

**Guided media** constrain signals to a physical path. **Unguided media** use wireless propagation.

| Medium | Representation and main distinction |
|---|---|
| Twisted pair | Electrical signals over twisted copper conductors; twisting helps reduce interference. |
| Coaxial cable | Electrical signals with a central conductor and surrounding shielding. |
| Optical fiber | Light through a guided optical path; immune to ordinary electromagnetic interference on copper conductors. |
| Wireless | Electromagnetic propagation without a dedicated cable path; performance depends on propagation and interference. |

Single-mode fiber supports one main propagation mode; multimode fiber supports several modes and can have greater modal dispersion. These names describe how light propagates, not whether data is analog or digital.

Three impairments to recognize:

- **Attenuation:** signal strength decreases along the path.
- **Distortion:** components arrive differently, changing the signal shape.
- **Noise:** unwanted energy affects the received signal.

A digital repeater regenerates suitable received bits into a fresh signal. It does not recover information already decoded incorrectly simply by strengthening it.

## 4. Signals, encoding, and bit rate

An **analog signal** varies continuously over its range. A **digital signal representation** uses selected distinguishable levels or transitions. Digital data can be transmitted using either suitable digital line signals or a modulated carrier.

**Line coding** maps data bits to signal levels or transitions. **Modulation** maps information onto a carrier signal.

| Idea | What varies |
|---|---|
| Simple NRZ line coding | Use selected levels over bit intervals; the exact level convention must be stated. |
| Manchester coding | Include a transition in the middle of each bit interval, which helps recover timing. |
| ASK | Carrier amplitude. |
| FSK | Carrier frequency. |
| PSK | Carrier phase. |
| QAM | A combination of carrier amplitude and phase. |

Manchester transition-to-bit conventions differ. If the question defines 0 as high-to-low and 1 as low-to-high, use that definition. A different convention reverses the mapping.

**Bit rate** counts bits per second. **Symbol rate**, in baud, counts transmitted signal choices per second. With M distinguishable choices used to encode fixed-length groups, each symbol can represent `log2(M)` bits when M is a power of two.

**Example:** 4 choices represent 2 bits per symbol. At 1000 symbols/s, the raw mapping carries 2000 bits/s. This does not imply 2000 useful application bits/s after framing and other overhead.

### Capacity formulas: units and assumptions first

**Bandwidth B** is a frequency range in hertz in these formulas. It is different from a bit rate in bits/s.

| Model | Formula |
|---|---|
| Ideal noiseless low-pass channel, M signal levels | `maximum bit rate = 2B log2(M)` |
| Channel with additive white Gaussian noise | `capacity C = B log2(1 + S/N)` |
| Power signal-to-noise ratio in decibels | `SNR_dB = 10 log10(S/N)` |

S is signal power; N is noise power. The Shannon formula uses a **linear ratio**, not decibels.

**Nyquist example:** B = 3000 Hz and M = 4. Since log2(4) = 2, the noiseless bound is `2 × 3000 × 2 = 12,000 bits/s`.

`log2(M)` asks which power of 2 gives M. Since 2² = 4, log2(4) = 2; since 2³ = 8, log2(8) = 3.

**Shannon example:** B = 3000 Hz and SNR = 30 dB. Convert first: `S/N = 10^(30/10) = 1000`. Then `C = 3000 log2(1001) ≈ 29,902 bits/s`. Substituting 30 directly into the Shannon logarithm would be wrong.

If an exercise imposes both a finite-level and noise constraint, respect both applicable bounds. Capacity is an ideal model's bound, not a promise of measured application throughput.

### Transmission delay versus propagation delay

- **Transmission delay:** time to put L bits onto a link of rate R; `L/R` seconds.
- **Propagation delay:** time for the signal to travel distance d at speed v; `d/v` seconds.

For 1000 bytes on a 1 Mbit/s link, L = 8000 bits. Transmission takes `8000/1,000,000 = 0.008 s = 8 ms`. Do not treat 1000 bytes as 1000 bits.

Increasing link rate reduces transmission time. It does not directly reduce the propagation time over the same medium and distance.

## 5. Multiplexing: share one physical link

**Multiplexing** combines streams on one link. A multiplexer combines them; a demultiplexer separates them using the agreed allocation.

| Method | Separation |
|---|---|
| Frequency-division multiplexing, FDM | Different frequency bands; guard bands can separate adjacent channels. |
| Time-division multiplexing, TDM | Different time slots. |
| Wavelength-division multiplexing, WDM | Different optical wavelengths. |

For fixed TDM, a frame can contain `[A slot][B slot][C slot]`. The receiver uses the slot position to identify the source. If B is idle, its reserved slot can be wasted. **Statistical TDM** assigns slots to active sources and needs a way to identify them.

Multiplexing is the resource-separation method. It is different from a contention rule such as listening and retrying after a collision.

## 6. Data Link Layer: four different problems

| Problem | What must be controlled |
|---|---|
| Framing | Where each frame starts and ends. |
| Flow control | How much the receiver can accept without being overwhelmed. |
| Error control | Damaged, missing, or duplicate frames. |
| Medium access control, MAC | Which transmitter can use a shared medium. |

The sender being too fast for the receiver is a flow problem. Two stations sending on one shared medium at the same time is an access problem. A flipped bit is an error problem.

### Framing and stuffing

Frame boundaries can use a length field, special delimiter bytes, delimiter bit patterns, or suitable coding conventions. A **delimiter** marks a boundary. If a payload contains the delimiter pattern, the receiver needs a way to distinguish it from the real boundary.

**Byte stuffing:** insert an escape marker before reserved bytes inside the payload. The receiver removes the added escape marker according to the agreed rule.

**Bit stuffing:** in the usual HDLC-style rule, insert 0 after every sequence of five consecutive payload 1s. The receiver removes the stuffed 0. Apply the rule to the payload stream rather than modifying the boundary flag itself.

```text
Payload:  111111
On link:  1111101

The inserted 0 separates the first five 1s from the sixth.
```

Stuffing makes boundaries unambiguous. It does not correct damaged data. It also adds transmission overhead.

## 7. Error detection: parity, checksum, and CRC

**Detection** identifies evidence of corruption. **Correction** recovers the intended data. A check that reports no error does not guarantee that every possible error pattern was absent.

### Parity

With **even parity**, choose a check bit so the total number of 1s is even. With odd parity, make it odd.

Data `1011` has three 1s. Its even-parity bit is 1, producing four 1s. A single flipped bit changes parity and is detected. Two flipped bits can preserve parity and escape this check.

One parity bit alone does not identify which bit changed.

### One's-complement checksum: a small worked example

Use 4-bit words here to keep the arithmetic visible. Actual protocols can use different word sizes.

```text
Word 1: 1001 = 9
Word 2: 1100 = 12
Sum:    10101 = 21
```

1. Fold the overflow carry back into the low four bits: `0101 + 1 = 0110`.
2. Complement each bit: checksum `1001`.
3. The receiver adds both words and the checksum: 9+12+9 = 30, or `11110`.
4. Fold the carry: `1110 + 1 = 1111`. All ones is the passing result in this convention.

Some changed data can still produce the same checksum. Detection strength depends on the check and error pattern.

### Cyclic redundancy check, CRC

CRC treats bits as polynomial coefficients and performs binary division using **XOR**, with no carries or borrowing. XOR produces 1 where bits differ and 0 where they match.

For generator `1011`, its degree r is 3. With data `1101`:

1. Append r zeros: `1101000`.
2. Align the generator with the current leftmost 1 and XOR.
3. Continue until only the last r remainder positions remain.

```text
1101000 XOR 1011000 = 0110000
0110000 XOR 0101100 = 0011100
0011100 XOR 0010110 = 0001010
0001010 XOR 0001011 = 0000001
Remainder = 001
Transmitted codeword = data + remainder = 1101001
```

Dividing `1101001` by `1011` gives remainder `000`. The receiver checks the received codeword with the same generator. A nonzero remainder signals a detected error.

The appended remainder is 3 bits, not the generator's 4-bit length. CRC is an error-detection technique in this use; it does not automatically locate and repair a bit. An undetected error pattern can still produce zero remainder.

## 8. Hamming code: locate one flipped bit

A **codeword** contains data plus redundant check bits. To protect m data bits, choose the smallest r satisfying:

```text
2^r >= m + r + 1
```

There must be enough check outcomes to distinguish every single-bit location plus the no-error case. For m = 4: r = 2 fails because 4 < 7; r = 3 works because 8 >= 8.

### Build an even-parity (7,4) example

Number positions **1 through 7 from left to right in this example**. Check bits go at powers of two: 1, 2, 4. Put data `1011` into positions 3, 5, 6, 7.

| Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Role | p1 | p2 | data | p4 | data | data | data |
| Value | ? | ? | 1 | ? | 0 | 1 | 1 |

- p1 checks positions 1,3,5,7. The data bits contain two 1s; choose p1 = 0.
- p2 checks 2,3,6,7. The data bits contain three 1s; choose p2 = 1.
- p4 checks 4,5,6,7. The data bits contain two 1s; choose p4 = 0.

Codeword: **0110011**.

Suppose position 6 flips to 0, giving **0110001**. Recheck each group:

- Group 1 remains even: s1 = 0.
- Group 2 is odd: s2 = 1.
- Group 4 is odd: s4 = 1.

The **syndrome** is the combined check result. Read it as s4 s2 s1 = `110`, binary 6. Under the single-error assumption, flip position 6 back.

Ordinary Hamming has minimum distance 3: it corrects one bit, or detects up to two in a detection-only use. Its ordinary single-error decoder can miscorrect a two-bit error. Adding an overall parity bit supports the familiar **SECDED** scheme: single-error correction and double-error detection. State the error assumptions before interpreting a syndrome.

## 9. Flow control and Stop-and-Wait ARQ

**Flow control** prevents the sender from overwhelming the receiver. **ARQ**, Automatic Repeat reQuest, uses acknowledgments and retransmissions to recover from loss or damage.

An **ACK** confirms receipt according to the protocol. A **NAK** can report a problem. A **timeout** occurs when an expected response has not arrived in time; it is not proof that the data frame itself was lost.

### Stop-and-Wait

The sender allows one unacknowledged frame at a time:

```text
Send frame → wait for ACK → send next frame
                 |
             timeout → retry
```

In Stop-and-Wait ARQ, sequence numbers often alternate 0 and 1.

**Lost ACK trace:**

1. Sender sends frame 0.
2. Receiver accepts it once and sends ACK, but ACK is lost.
3. Sender times out and retries frame 0.
4. Receiver recognizes the duplicate, avoids a second delivery, and sends another ACK.

Without the sequence check, one transmitted message could be delivered twice.

Stop-and-Wait wastes capacity on links where waiting is long compared with frame transmission. Ignoring ACK transmission and processing, utilization is approximately:

```text
frame transmission time / (frame transmission time + 2 × propagation time)
```

For transmission time 8 ms and one-way propagation 20 ms: `8/(8+40) = 1/6 ≈ 16.7%`. These assumptions are part of the answer.

## 10. Sliding windows: Go-Back-N versus Selective Repeat

A **window** limits the frames allowed to remain outstanding. **Pipelining** sends several before earlier ACKs return. The window slides forward when acknowledgments permit new sends.

| Rule | Go-Back-N, standard textbook model | Selective Repeat |
|---|---|---|
| Receiver handling | Accept in order; discard later out-of-order frames. | Buffer acceptable out-of-order frames. |
| Acknowledgments | Cumulative progress. | Individual accepted frames. |
| Recovery | Retransmit from the missing frame through the outstanding suffix. | Retransmit missing/damaged frames. |
| Receiver storage | Less | More buffering and tracking. |

**Loss trace:** send 0,1,2,3; lose 1. Go-Back-N discards 2 and 3 and retries 1,2,3. Selective Repeat retains 2 and 3 and retries 1. Delivery to the higher layer remains ordered in this standard comparison.

With k sequence bits, there are `2^k` sequence values. Standard maximum sender window for GBN is `2^k−1`, with receiver window 1. Equal sender/receiver SR windows can each be at most `2^(k−1)`.

For k = 3: sequence values 0–7; GBN sender limit 7; equal SR window limit 4. These bounds avoid confusing old duplicates with new frames after wraparound.

An ACK number can mean the last received frame or the next expected frame. Use the convention stated by the question.

**Piggybacking:** attach an ACK for one direction to an outgoing data frame in the other direction. It reduces separate control traffic. If no outgoing data arrives soon enough, a protocol can send a separate ACK rather than wait indefinitely.

## 11. Medium access: share the channel

A **collision** occurs when overlapping transmissions interfere on a shared medium. **Backoff** means waiting before retrying, often using a random delay.

### ALOHA

Pure ALOHA starts at arbitrary times. Slotted ALOHA permits starts only at agreed slot boundaries.

For a frame duration T, the ideal collision-vulnerable interval is 2T for pure ALOHA and T for slotted ALOHA. Under the standard ideal traffic model, their maximum normalized throughputs are:

- Pure: `1/(2e) ≈ 18.4%`.
- Slotted: `1/e ≈ 36.8%`.

These percentages describe the model's useful-transmission fraction, not a guarantee for every real network.

### CSMA: sense before sending

**Carrier Sense Multiple Access** listens first. Sensing still cannot prevent all collisions because a remote station's signal takes time to arrive.

- **1-persistent:** if idle, transmit; if busy, keep listening until idle.
- **Nonpersistent:** if busy, wait for a selected delay before sensing again.
- **p-persistent:** on a suitable slotted channel, transmit with probability p when idle; otherwise defer to another slot.

### CSMA/CD and CSMA/CA

**Collision Detection**, CD, applies to suitable shared half-duplex Ethernet: sense, transmit, detect a collision, stop the damaged transmission, and back off. Two stations can both hear idle before either signal reaches the other.

**Collision Avoidance**, CA, is associated with wireless LAN access. It uses sensing, waiting/backoff, and ACKs; optional RTS/CTS exchanges help manage some hidden-station situations. A hidden station cannot directly hear another contender even though both can reach the receiver.

Modern switched full-duplex Ethernet has separate simultaneous directions and does not use ordinary CSMA/CD collision recovery. CA reduces collision risk; it cannot guarantee none.

## 12. Ethernet frame facts

Ethernet is associated with **IEEE 802.3**. Wi-Fi is associated with **IEEE 802.11**. An ordinary Ethernet MAC address is 48 bits, or 6 bytes.

For a conventional **untagged Ethernet frame**, use this exam layout:

```text
Destination MAC (6) | Source MAC (6) | Type/Length (2)
| Payload and padding (46–1500) | FCS (4)
```

Lengths in that diagram are bytes. **FCS**, Frame Check Sequence, is an error-detection field using CRC. The minimum is 64 bytes and the conventional maximum is 1518 bytes, counted from destination address through FCS. Preamble and start-frame delimiter are excluded from those counts. Padding fills a payload shorter than the required minimum.

VLAN tags and jumbo-frame configurations change relevant size limits; use the frame type stated in the question. The copied source's “Standard Ethernet 1 Mbps” line appears to be a transcription error; classic standard Ethernet is 10 Mbps, with Fast Ethernet at 100 Mbps. [Cisco Ethernet reference](https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html).

## Final recall sheet

- Physical: signals/bits. Data Link: frames/local addresses. Network: routed packets.
- A router replaces link framing for the outgoing link; the next-hop MAC can differ from the final destination.
- Transmission delay = bits/rate; propagation delay = distance/signal speed.
- Simplex: one direction. Half duplex: alternate directions. Full duplex: simultaneous.
- FDM: frequency. TDM: time. WDM: optical wavelength.
- Nyquist needs noiseless assumptions; Shannon needs linear S/N. Convert dB first.
- Stuffing protects boundaries; parity/checksum/CRC detect errors.
- CRC remainder length equals generator degree.
- Hamming uses positions 1,2,4,...; interpret syndrome under the error model.
- Stop-and-Wait: one outstanding frame; sequence numbers prevent duplicate delivery.
- GBN retries a suffix; SR buffers and selectively retries.
- CD detects shared-medium collisions; CA reduces collision risk.
- Ordinary untagged Ethernet: 48-bit MAC, 64–1518-byte frame including FCS and excluding preamble/SFD.

## Included MCQ practice

Attempt each question before opening its explanation. Use the calculations above to repair mistakes.

<!-- FS-MCQ-START -->

**ai explnation due to lack of material** — original study questions, not past-paper questions. There are 15 questions in this file.

### Question 1

Which OSI layer is primarily responsible for logical addressing and routing?

- **A.** Presentation
- **B.** Physical
- **C.** Session
- **D.** Network

<details>
<summary>Answer and explanation</summary>

**D. Network**

Routing concerns forwarding toward a logical network destination. That is primarily the Network Layer responsibility. The Data Link Layer handles delivery across an individual link, and the Physical Layer carries signals.

</details>

### Question 2

Host A reaches Host B through a router. On the first Ethernet link, which destination normally belongs in the frame?

- **A.** The next-hop router interface’s MAC address
- **B.** Always Host B’s remote MAC address
- **C.** The user’s email address
- **D.** The application function name

<details>
<summary>Answer and explanation</summary>

**A. The next-hop router interface’s MAC address**

The first frame must reach the next device on the local link. The network packet carries the destination information used for routing toward Host B. Link and network addressing solve different delivery tasks.

</details>

### Question 3

A push-to-talk link allows each side to transmit, but only one at a time. Which mode is described?

- **A.** No possible communication mode
- **B.** Half duplex
- **C.** Simplex
- **D.** Full duplex

<details>
<summary>Answer and explanation</summary>

**B. Half duplex**

Both directions are possible, so it is not simplex. They cannot operate simultaneously in this described link, so it is half duplex rather than full duplex.

</details>

### Question 4

A fixed TDM frame contains A, B, C slots. How does the receiver identify B’s data in this example?

- **A.** By reading a Git hash
- **B.** By dropping the second slot always
- **C.** By its agreed slot position
- **D.** By whichever item finishes last

<details>
<summary>Answer and explanation</summary>

**C. By its agreed slot position**

The sender and receiver share a fixed-slot schedule. The B position identifies B’s stream. This example does not need completion-order guessing because the positions already provide the separation rule.

</details>

### Question 5

A system sends 1000 symbols/s and each symbol represents 2 bits. What is its stated bit rate?

- **A.** 500 bits/s
- **B.** 1000 bits/s
- **C.** 1000 hertz in every interpretation
- **D.** 2000 bits/s

<details>
<summary>Answer and explanation</summary>

**D. 2000 bits/s**

Multiply symbol rate by represented bits per symbol for this stated mapping. The result is 2000 bits/s. Keep symbol count, bit count, and frequency bandwidth as different quantities.

</details>

### Question 6

What is the main purpose of payload stuffing?

- **A.** Prevent payload patterns from being confused with frame boundaries
- **B.** Correct every damaged bit
- **C.** Increase the number of usable application bytes without overhead
- **D.** Select the shortest network route

<details>
<summary>Answer and explanation</summary>

**A. Prevent payload patterns from being confused with frame boundaries**

Stuffing protects the boundary interpretation. It adds overhead to encode special payload patterns safely. Detection or correction of corruption needs a separate check or code; stuffing alone does not provide those guarantees.

</details>

### Question 7

A CRC generator has degree 3. How many zeros are appended to the data before generating the remainder?

- **A.** The number of data bits always
- **B.** 3
- **C.** 1
- **D.** 4

<details>
<summary>Answer and explanation</summary>

**B. 3**

The remainder has room for at most three lower-degree coefficients. Append three zeros, divide by the generator, and use the resulting remainder as check bits. The degree is one less than the generator’s bit length.

</details>

### Question 8

In a common Hamming(7,4) arrangement, which positions hold parity bits?

- **A.** 1, 3, 5, 7
- **B.** Every position
- **C.** 1, 2, 4
- **D.** 3, 5, 7

<details>
<summary>Answer and explanation</summary>

**C. 1, 2, 4**

Powers-of-two positions hold the parity bits in the common indexing convention. The remaining positions carry the four data bits. State the convention before constructing or checking the complete bit pattern.

</details>

### Question 9

An ACK is lost after the receiver delivers frame 0. The sender retries frame 0. What should the receiver do?

- **A.** Deliver the same payload again without checking
- **B.** Assume frame 1 has arrived
- **C.** Reset all application data
- **D.** Recognize the duplicate, acknowledge it, and avoid redelivery

<details>
<summary>Answer and explanation</summary>

**D. Recognize the duplicate, acknowledge it, and avoid redelivery**

The receiver already accepted frame 0 and expects the next sequence number. The repeated frame 0 is a duplicate. Acknowledging it can allow the sender to recover without delivering the same application data twice.

</details>

### Question 10

For the same loss, what can Selective Repeat do with correctly received frames 2 and 3?

- **A.** Buffer them and resend only missing frame 1
- **B.** Always discard them like standard Go-Back-N
- **C.** Deliver a missing frame 1 without receiving it
- **D.** Disable sequence numbers

<details>
<summary>Answer and explanation</summary>

**A. Buffer them and resend only missing frame 1**

Selective Repeat retains acceptable out-of-order frames. It can request or await retransmission of the missing frame without repeating those saved frames. This requires receiver state and an adequate sequence-number space.

</details>

### Question 11

Under ideal textbook assumptions, which maximum throughput is larger?

- **A.** Pure ALOHA at about 73.6%
- **B.** Slotted ALOHA at about 36.8%
- **C.** Pure ALOHA at about 50%
- **D.** Both are always 100%

<details>
<summary>Answer and explanation</summary>

**B. Slotted ALOHA at about 36.8%**

The ideal maxima are 1/e for slotted ALOHA and 1/(2e) for pure ALOHA. Slot boundaries reduce the vulnerable overlap interval. These model maxima do not guarantee a particular real deployment’s throughput.

</details>

### Question 12

A 1000-byte frame is placed on a 1 Mbit/s link. Ignoring overhead outside the stated length, what is transmission delay?

- **A.** 1 ms
- **B.** 1000 s
- **C.** It equals propagation delay for every distance
- **D.** 8 ms

<details>
<summary>Answer and explanation</summary>

**D. 8 ms**

Convert bytes to bits: 1000×8 = 8000 bits. Divide by 1,000,000 bits/s: 0.008 s, or 8 ms. Propagation delay uses distance divided by signal speed and is a separate quantity.

</details>

### Question 13

Using four-bit one's-complement arithmetic, words 1001 and 1100 have sum 10101. What checksum follows carry folding and complementation?

- **A.** 1001
- **B.** 0110
- **C.** 10101
- **D.** 0000

<details>
<summary>Answer and explanation</summary>

**A. 1001**

Fold the overflow carry into the low four bits: 0101+1 = 0110. Complement all four bits to get 1001. The folded sum and the transmitted checksum are different values; do not stop before the complement step.

</details>

### Question 14

For data 1101 and generator 1011, the CRC remainder in the guide is 001. Which codeword is transmitted?

- **A.** 10111101
- **B.** 1101001
- **C.** 1101000
- **D.** 0011101

<details>
<summary>Answer and explanation</summary>

**B. 1101001**

The generator has degree 3, so the check field has three bits. Replace the three appended zero positions with the calculated remainder: data 1101 followed by 001. The receiver divides this combined codeword by the same generator.

</details>

### Question 15

A Hamming check gives s1=0, s2=1, s4=1 under the single-bit-error assumption and the guide's position convention. Which position is corrected?

- **A.** 4
- **B.** No error can be present
- **C.** 6
- **D.** 3

<details>
<summary>Answer and explanation</summary>

**C. 6**

Read the syndrome as s4 s2 s1 = 110, binary 6. Flip that position under the single-error assumption. Reading the checks in the opposite order would give the wrong location. Multiple errors can invalidate the ordinary correction interpretation.

</details>

<!-- FS-MCQ-END -->

## Optional source references

These record the basis of this guide. You can study the guide without opening them.

- [College CN Unit 1](<CN_UNIT_1_NOTES.docx>): OSI, media, multiplexing, devices, framing and error checks.
- [College CN Unit 2](<CN UNIT-2 NOTES.docx>): flow control, ARQ, medium access, Ethernet.
- [MIT: Physical Layer](https://fab.cba.mit.edu/classes/865.24/topics/computing/comms/phy.html).
- [MIT: error-correction teaching](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c1/c1s1/).
- [Cisco: Ethernet frame and FCS fields](https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9600-series-switches/217413-understand-why-fcs-errors-input-errors.html).
