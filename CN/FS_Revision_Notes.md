# Computer Networks: FS revision notes

For the screening test on **9 October 2026**. Scope: OSI model · Physical Layer · Data Link Layer.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Visual study website](../Subjects/visualize/README.md)

## How to use these notes

Learn the layer responsibilities first. Then distinguish physical transmission from frame delivery. For error control, write what the receiver accepts and what the sender retransmits after a loss.

Read the quick table first. For each topic, cover the result and work through the example. Explain the MCQ trap in your own words. Finish with the short self-check at the end.

**Teaching provenance: ai explnation due to lack of material.** These are AI-authored explanations and examples, not verbatim college notes. Each topic identifies whether the selected college material covers it, covers it partly, or lacks a focused explanation. The label does not mean that every underlying topic is missing. The writing uses short, direct explanations inspired by ASD-STE100, with technical terms explained through concrete steps.

The notice gives topic names, not an exact question distribution. These notes are revision aids and do not predict the test paper.

## Quick recall

| Topic | Explain it this way |
|---|---|
| OSI, bottom to top | Physical → Data Link → Network → Transport → Session → Presentation → Application. |
| Units and addresses | Bits at Physical; frames and link addresses at Data Link; packets and logical addresses at Network. |
| Simplex / half / full duplex | One direction / both directions at different times / both directions simultaneously. |
| FDM / TDM / WDM | Separate frequency bands / time slots / optical wavelengths. |
| Stuffing | Prevent payload contents from being mistaken for frame boundaries. It does not correct errors. |
| Parity / CRC | Detect certain error patterns. Detection is different from correcting the damaged bit. |
| Hamming | For m data bits, choose r check bits with 2^r ≥ m+r+1. Ordinary Hamming corrects one bit. |
| Stop-and-Wait ARQ | One outstanding frame. Sequence numbers let the receiver reject a retry as a duplicate. |
| GBN / Selective Repeat | GBN discards out-of-order frames and retries a suffix. SR buffers and retries missing frames. |
| CSMA/CD / CSMA/CA | Detect collisions on shared half-duplex Ethernet / reduce collision risk on wireless links. |

## Reading order

1. The seven OSI layers
2. Encapsulation and local delivery
3. Media and direction of transmission
4. Multiplexing: sharing one link
5. Signals, encoding and capacity
6. Framing and stuffing
7. Parity, checksum and CRC
8. Hamming code and single-bit correction
9. Stop-and-Wait ARQ
10. Go-Back-N and Selective Repeat
11. ALOHA, CSMA/CD and CSMA/CA

## 1. The seven OSI layers

**Main idea:** Locate a responsibility before naming its layer.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

The OSI model separates networking responsibilities into seven layers. It is a reference model, not a guarantee that every protocol has a perfect one-layer mapping.

From the top, the layers are Application, Presentation, Session, Transport, Network, Data Link, and Physical.

For exam questions, identify the responsibility: application services, representation, sessions, end-to-end transport, routing, local frames, or signals.

### Worked example

```text
User data → application handling → representation → session control
→ transport units → network packets → local frames → signals
```

**Result and interpretation:** On receipt, the destination processes corresponding information upward.

### Follow the steps

1. **Application data:** A user message is prepared. The top layers handle the application and its representation.
2. **Transport and Network:** Transport units are carried in network packets. End-to-end transport and routing have different responsibilities.
3. **Data Link:** A packet is carried in a local frame. The frame belongs to one link.
4. **Physical:** Signals carry the frame’s bits. The medium transports physical signals.

**Why this works:** Each layer offers services to the layer above while using services below. This separation makes responsibilities easier to reason about.

**MCQ trap:** A router is primarily associated with Layer 3 forwarding. A bridge or ordinary Ethernet switch is primarily associated with Layer 2 forwarding. Real devices can have additional functions.

| Distinction | Meaning |
|---|---|
| Application / Presentation / Session | Application services / data representation / dialogue control. |
| Transport | End-to-end transport services, such as segmentation and reliability where provided. |
| Network | Logical addressing and routing. |
| Data Link / Physical | Local-link frames / signals and transmission. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 2. Encapsulation and local delivery

**Main idea:** Distinguish the end-to-end packet from each link’s frame.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Encapsulation adds control information around data as it moves down the stack. Decapsulation processes that information as data moves up.

A routed packet can cross several links. At a router, the incoming link frame is processed and a new outgoing link frame is constructed.

A MAC address identifies a link-layer interface within its addressing system. An IP address supports network-layer addressing. These roles are different.

### Worked example

```text
Host A → Router → Host B
Link 1 frame destination: router interface
Link 2 frame destination: Host B interface
```

**Result and interpretation:** The next-hop frame destination changes between links.

### Follow the steps

1. **Build first frame:** A addresses the local frame to the router. Host B is reached through a next hop.
2. **Receive at router:** Process the incoming frame. The local-link delivery has completed.
3. **Route the packet:** Select the outgoing interface and next hop. Use network-layer forwarding information.
4. **Build next frame:** Construct a frame for the next link. Local-link control information is replaced.

**Why this works:** A link frame only needs to reach the next device on that link. Routing determines the next step toward the network destination.

**MCQ trap:** Do not claim that a packet remains byte-for-byte unchanged at a router. Fields such as IPv4 TTL change; address translation can also change addresses.

| Distinction | Meaning |
|---|---|
| Hub / repeater | Primarily Physical Layer signal handling. |
| Bridge / ordinary switch | Primarily forwards local frames using link addresses. |
| Router | Primarily forwards packets using network-layer information. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 3. Media and direction of transmission

**Main idea:** Separate the medium from the communication mode.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Guided media carry signals through a physical path, such as twisted pair, coaxial cable, or optical fiber. Unguided media use wireless propagation.

Simplex permits transmission in one direction. Half duplex permits both directions at different times. Full duplex permits both directions at the same time.

The communication mode describes direction and timing. It does not by itself identify the cable type or application protocol.

### Worked example

```text
One-way broadcast: simplex
Push-to-talk exchange: half duplex
Simultaneous two-way conversation: full duplex
```

**Result and interpretation:** The important test is whether both sides can transmit at the same time.

### Follow the steps

1. **Identify the channel:** Two stations share a half-duplex link. Both directions are supported.
2. **A transmits:** B receives while A sends. The shared channel is used in one direction.
3. **Change direction:** A stops before B sends. The example permits a direction change.
4. **B transmits:** A receives B’s response. The stations do not transmit simultaneously.

**Why this works:** A shared use of time or physical paths constrains transmission. The mode tells you which simultaneous actions the link supports.

**MCQ trap:** Full duplex does not mean each direction has unlimited capacity. Optical fiber avoids electrical interference but still has physical limits.

| Distinction | Meaning |
|---|---|
| Twisted pair | Electrical signals on twisted conductors. |
| Coaxial cable | Electrical signals with a central conductor and shielding. |
| Optical fiber | Light through a guided optical path. |
| Wireless | Electromagnetic propagation without a dedicated cable path. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 4. Multiplexing: sharing one link

**Main idea:** Track which resource separates the users.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Multiplexing combines several signals or data streams on one link. The receiver uses the agreed separation to recover them.

Frequency-division multiplexing separates frequency bands. Time-division multiplexing separates time slots. Wavelength-division multiplexing separates optical wavelengths.

In synchronous TDM, a fixed slot can remain allocated when its source is idle. Statistical TDM can allocate capacity to active sources.

### Worked example

```text
TDM frame: [A slot][B slot][C slot]
A sends a1, B sends b1, C sends c1
Receiver assigns each slot to its configured source.
```

**Result and interpretation:** The slot position identifies the source in this fixed-slot example.

### Follow the steps

1. **Separate sources:** A has a1; B has b1; C has c1. Each source produces independent data.
2. **Assign slots:** The order is A, B, C. The sender and receiver share the schedule.
3. **Transmit one stream:** Send [a1][b1][c1]. Use one link in successive time slots.
4. **Demultiplex:** Recover a1 for A, b1 for B, c1 for C. Interpret each slot using the agreed schedule.

**Why this works:** An agreed schedule prevents the receiver from mixing the sources. The same principle applies to separated frequency bands or wavelengths.

**MCQ trap:** Do not confuse multiplexing with a specific medium-access contention rule. An FDM channel does not require users to alternate fixed time slots.

| Distinction | Meaning |
|---|---|
| FDM | Different frequency bands. |
| TDM | Different time slots. |
| WDM | Different optical wavelengths. |
| Statistical TDM | Capacity assigned according to active traffic. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 5. Signals, encoding and capacity

**Main idea:** Use units and assumptions before applying a formula.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

Bit rate counts bits per second. Symbol rate counts transmitted symbols per second. One symbol can represent more than one bit.

Line coding represents bits using signal levels or transitions. Manchester coding uses a middle-of-bit transition; state the convention before mapping a transition to 0 or 1.

For an ideal noiseless low-pass channel, the textbook Nyquist bound is 2B log2(M) bits/s. B is bandwidth in hertz; M is the number of distinguishable signal levels.

For a bandwidth-limited AWGN channel, Shannon capacity is B log2(1 + S/N). S/N must be a linear power ratio, not a decibel value.

### Worked example

```text
B = 3000 Hz; S/N = 15
C = 3000 × log2(16)
C = 12000 bits/s
```

**Result and interpretation:** 12 kbit/s is the theoretical capacity for these stated Shannon-model inputs.

### Follow the steps

1. **State the model:** Use the bandwidth-limited AWGN capacity formula. Do not mix ideal-noiseless and noisy-channel assumptions.
2. **Read the units:** B = 3000 Hz; S/N = 15, linear. A decibel input would need conversion.
3. **Calculate:** log2(1 + 15) = 4. Compute the logarithm before multiplying.
4. **Interpret:** C = 12000 bits/s. This is a model bound, not measured application throughput.

**Why this works:** The logarithm counts the available information under the model. More bandwidth or a better signal-to-noise ratio can increase this bound.

**MCQ trap:** Actual throughput includes coding and protocol constraints. Capacity is not a promise of application speed. This supplement is possible Physical Layer coverage, not confirmed exam emphasis.

| Distinction | Meaning |
|---|---|
| Bit rate | Bits per second. |
| Symbol rate | Symbols per second. |
| SNR in dB | 10 log10(S/N); convert before substitution. |
| Encoding convention | For this lesson, Manchester 0 is high-to-low; 1 is low-to-high. |

**Official references:** [MIT: Physical Layer](https://fab.cba.mit.edu/classes/865.24/topics/computing/comms/phy.html); [MIT OCW: digital communication notes](https://ocw.mit.edu/courses/6-451-principles-of-digital-communication-ii-spring-2005/bb895c1dee9ce0b39d6846e0aa984981_MIT6_451S05_FullLecNotes.pdf).

## 6. Framing and stuffing

**Main idea:** Keep payload patterns distinct from frame boundaries.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Framing marks where a link-layer frame starts and ends. Without a boundary rule, a receiver cannot reliably separate adjacent variable-length frames.

Byte stuffing escapes special data bytes. Bit stuffing can insert a 0 after five consecutive data 1 bits so the payload cannot imitate the flag.

The receiver reverses the stuffing rule. Stuffing protects interpretation of boundaries; it does not by itself detect or correct every transmission error.

### Worked example

```text
Data bits: 111111
After five consecutive 1 bits, insert 0
Stuffed data: 1111101
```

**Result and interpretation:** The inserted 0 is removed when the receiver decodes the stuffed payload.

### Follow the steps

1. **Read data:** The payload is 111111. This trace contains six consecutive 1 bits.
2. **Count five 1 bits:** The transmitted prefix is 11111. The stuffing threshold has been reached.
3. **Insert a 0:** The transmitted prefix is 111110. Break the run before sending the next data bit.
4. **Send the last bit:** Stuffed payload is 1111101. The receiver removes the inserted 0 to recover the data.

**Why this works:** The inserted bit breaks the special run within payload data. A separately transmitted flag remains distinguishable under the protocol rule.

**MCQ trap:** Count consecutive data 1 bits correctly, and restart the count after a 0. Do not apply payload stuffing to the boundary flag itself.

| Distinction | Meaning |
|---|---|
| Framing | Identify the limits of a frame. |
| Byte stuffing | Escape special bytes inside payload data. |
| Bit stuffing | Insert bits according to a payload rule. |
| Error detection | Use redundancy to identify certain corruptions. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 7. Parity, checksum and CRC

**Main idea:** Detection means an error is noticed, not repaired.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Error detection adds redundant information so the receiver can check certain changes. The guarantees depend on the code and the error pattern.

Even parity makes the total count of 1 bits even. It detects any odd number of flipped bits, but can miss an even number.

A checksum combines data using a defined arithmetic rule. A CRC uses polynomial division over binary values, where subtraction is XOR.

For CRC generation, append zeros equal to the generator degree, divide, and append the remainder. A nonzero receiver remainder indicates a detected error.

### Worked example

```text
Data = 1011; generator = 1011
Append three zeros: 1011000
Divide with XOR: remainder 000
Codeword = 1011000
```

**Result and interpretation:** A zero remainder means the check found no error; it does not prove that every bit is correct.

### Follow the steps

1. **Choose generator:** Generator bits are 1011; degree is 3. The leading term determines the appended-zero count.
2. **Extend data:** 1011 becomes 1011000. Append three zeros before division.
3. **Divide with XOR:** The remainder is 000. This chosen example is exactly divisible.
4. **Append the remainder:** Transmit codeword 1011000. The receiver repeats the agreed check.

**Why this works:** Valid codewords satisfy a relation. Some corruptions violate it and are detected. Other corruptions can turn one valid codeword into another.

**MCQ trap:** Do not call CRC a correction method. State the generator and bit convention before doing a numerical trace.

| Distinction | Meaning |
|---|---|
| Parity | A small check with limited error-pattern coverage. |
| Checksum | Arithmetic redundancy defined by a checksum scheme. |
| CRC | A polynomial-based detection check. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 8. Hamming code and single-bit correction

**Main idea:** Use the syndrome to locate an error under a stated limit.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Hamming codes use parity checks at selected positions. Under the single-bit error assumption, the failed checks identify the bit position.

For m data bits, choose r check bits so 2^r ≥ m + r + 1. The syndrome must represent every single-bit position and the no-error result.

An ordinary distance-3 Hamming code corrects one bit. An extended Hamming code with overall parity supports single-error correction and double-error detection.

### Worked example

```text
m = 4
r = 2: 4 < 7, insufficient
r = 3: 8 ≥ 8, sufficient
Hamming(7,4) has four data bits and three check bits.
```

**Result and interpretation:** Three check bits are sufficient for the standard single-error-correcting arrangement.

### Follow the steps

1. **Count data:** m = 4. The payload has four data bits.
2. **Try two checks:** 2^2 = 4; m + r + 1 = 7. There are not enough syndrome outcomes.
3. **Try three checks:** 2^3 = 8; m + r + 1 = 8. The inequality now holds.
4. **Use seven positions:** Four data bits plus three check bits. This is the Hamming(7,4) size.

**Why this works:** The check results form a binary syndrome. With exactly one flipped bit, that syndrome matches the parity-check column for its position.

**MCQ trap:** If multiple bits can be wrong, blindly flipping the syndrome position can miscorrect. State the code variant and error assumption.

| Distinction | Meaning |
|---|---|
| Parity positions | In a common arrangement, positions 1, 2 and 4 hold check bits. |
| Syndrome | Combined parity-check results. |
| Ordinary Hamming | Distance 3; single-bit correction. |
| Extended Hamming | Extra overall parity; SECDED behavior. |

**College sources:** [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>).

## 9. Stop-and-Wait ARQ

**Main idea:** Retry without delivering the same frame twice.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Flow control limits how much data a sender can have outstanding. Error control handles lost or damaged data, often using acknowledgments and retries.

Stop-and-Wait sends one frame and waits for its acknowledgment. A timeout can cause the sender to transmit that frame again.

Sequence numbers let the receiver distinguish a new frame from a duplicate. Alternating 0 and 1 is sufficient for the usual Stop-and-Wait model.

### Worked example

```text
Send frame 0 → receiver accepts it
ACK is lost → sender times out
Send frame 0 again → receiver recognizes a duplicate
Receiver acknowledges without delivering the payload twice.
```

**Result and interpretation:** A retry can be necessary even when the first data frame arrived successfully.

### Follow the steps

1. **Send frame 0:** The sender has one outstanding frame. It waits for an acknowledgment.
2. **Accept frame:** The receiver delivers the payload once. It now expects the next sequence number.
3. **Lose ACK:** The sender times out and retries frame 0. The sender has not confirmed success.
4. **Handle duplicate:** The receiver acknowledges but does not redeliver. The sequence number identifies the retry.

**Why this works:** The sender cannot distinguish a lost frame from a lost acknowledgment using silence alone. The sequence number prevents duplicate application delivery.

**MCQ trap:** A timeout means the sender did not obtain the expected acknowledgment in time. It does not prove which message was lost.

| Distinction | Meaning |
|---|---|
| Flow control | Avoid overrunning the receiver. |
| Error control | Recover from loss or detected corruption. |
| ACK | Confirm reception according to the protocol. |
| Sequence number | Distinguish data instances and duplicates. |

**College sources:** [CN UNIT-2 NOTES.docx](<../CN/CN UNIT-2 NOTES.docx>).

## 10. Go-Back-N and Selective Repeat

**Main idea:** Compare what is retried after a missing frame.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A sliding window allows several frames to be outstanding. This can keep a link busy while acknowledgments are in transit.

In the standard Go-Back-N model, the receiver accepts frames in order and discards out-of-order frames. The sender retransmits from the missing frame onward.

Selective Repeat can buffer acceptable out-of-order frames and retransmit only the missing or damaged frames.

With k-bit sequence numbers, textbook limits are at most 2^k − 1 for the Go-Back-N sender window and at most 2^(k−1) for equal Selective Repeat windows.

### Worked example

```text
Frames 0, 1, 2, 3 are sent; frame 1 is lost
GBN: frames 2 and 3 are discarded; resend 1, 2, 3
SR: buffer 2 and 3; resend 1
```

**Result and interpretation:** The retransmission and buffering rules distinguish the protocols.

### Follow the steps

1. **Send a window:** Frames 0, 1, 2, 3 are transmitted. Several frames are outstanding.
2. **Lose frame 1:** Frame 0 arrives; frame 1 does not. The receiver has a gap.
3. **Receive later frames:** GBN discards 2 and 3; SR can buffer them. The receiver rule determines useful saved work.
4. **Recover:** GBN resends 1–3; SR resends 1. This trace uses the usual textbook variants.

**Why this works:** Selective Repeat uses more receiver state to avoid repeating correctly received frames. Sequence-space limits prevent old frames from being confused with new ones.

**MCQ trap:** State whether an ACK number means the last received frame or the next expected frame. Both conventions exist; do not mix them in a trace.

| Distinction | Meaning |
|---|---|
| Go-Back-N | Cumulative acknowledgment and in-order acceptance in the standard model. |
| Selective Repeat | Separate acknowledgment/buffering of acceptable frames. |
| Window | The allowed range of outstanding sequence numbers. |

**College sources:** [CN UNIT-2 NOTES.docx](<../CN/CN UNIT-2 NOTES.docx>).

## 11. ALOHA, CSMA/CD and CSMA/CA

**Main idea:** Choose a rule for sharing a medium.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A shared medium needs a rule for competing transmitters. ALOHA sends without first sensing the channel; a collision can require a random retry.

Slotted ALOHA allows starts only at slot boundaries. Under its ideal textbook model, its maximum throughput is 1/e, about 36.8%. Pure ALOHA reaches 1/(2e), about 18.4%.

CSMA senses before sending. CSMA/CD detects collisions during transmission on suitable shared half-duplex Ethernet. CSMA/CA uses avoidance techniques for wireless access.

Sensing does not eliminate every collision. Propagation delay and hidden stations can prevent a sender from knowing the complete current situation.

### Worked example

```text
A and B sense an idle shared half-duplex link
Both start before either signal reaches the other
A collision occurs
CSMA/CD stations stop and use backoff.
```

**Result and interpretation:** Two stations can each observe idle yet still collide.

### Follow the steps

1. **Sense:** A and B each observe idle. Neither has yet received the other’s signal.
2. **Transmit:** Both stations begin sending. Carrier sensing alone did not serialize the starts.
3. **Detect collision:** The shared half-duplex signals overlap. This example uses CSMA/CD-capable shared Ethernet.
4. **Back off:** Stop and retry after selected delays. The random delays reduce repeated simultaneous attempts.

**Why this works:** The channel information reaches a station after propagation delay. A retry delay reduces the chance that competing stations restart together.

**MCQ trap:** Modern switched full-duplex Ethernet does not use collision detection for ordinary frame transmission. CSMA/CA reduces collision risk; it cannot guarantee none.

| Distinction | Meaning |
|---|---|
| Pure ALOHA | Send at arbitrary times; larger collision-vulnerable interval. |
| Slotted ALOHA | Start at slot boundaries. |
| CSMA/CD | Sense, transmit, detect collision, stop and back off. |
| CSMA/CA | Use sensing, waiting/backoff and acknowledgments; RTS/CTS can be optional. |

**College sources:** [CN UNIT-2 NOTES.docx](<../CN/CN UNIT-2 NOTES.docx>).

## Numerical questions: keep the assumptions visible

**ai explnation due to lack of material** — short revision aid for the calculations explained in the lessons.

| Quantity | Formula | What to check first |
|---|---|---|
| Ideal noiseless low-pass bit-rate bound | `2B log2(M)` bits/s | B is bandwidth in Hz; M is the number of signal levels. |
| AWGN channel-capacity bound | `B log2(1 + S/N)` bits/s | S/N must be a linear power ratio, not a dB value. |
| Power SNR in dB | `10 log10(S/N)` | Convert back with `S/N = 10^(dB/10)`. |
| Hamming check-bit count | `2^r >= m+r+1` | Try the smallest nonnegative r that satisfies it. |
| Go-Back-N sender window | At most `2^k - 1` | k is the sequence-number bit count; standard receiver window is 1. |
| Selective Repeat window | At most `2^(k-1)` | This bound assumes equal sender and receiver windows. |

Example: B = 3000 Hz and SNR = 30 dB. First compute S/N = 1000. The Shannon bound is `3000 × log2(1001) ≈ 29,902 bits/s`. Do not substitute 30 directly inside the logarithm.

For k = 3, the sequence numbers are 0–7. The standard maximum GBN sender window is 7. Equal SR windows can each be at most 4. These limits prevent old and new frames from becoming ambiguous after wraparound.

Treat capacity results as bounds under the stated channel model. They are not a promise of application throughput. Physical Layer is broad in the notice; signal formulas are a marked supplement because the selected college pack does not give a focused treatment.

## Self-check: one question per topic

**ai explnation due to lack of material** — original revision questions, not past-paper questions. Try them before opening the answer. The full website provides four questions per topic.

### 1. The seven OSI layers

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

### 2. Encapsulation and local delivery

A router forwards a packet onto another link. What normally happens to the link frame?

- **A.** The incoming frame must remain identical forever
- **B.** The router removes every network address permanently
- **C.** Only the application layer can forward it
- **D.** The router constructs a new frame for the outgoing link

<details>
<summary>Answer and explanation</summary>

**D. The router constructs a new frame for the outgoing link**

A frame supports one local-link delivery. The router processes the incoming frame, forwards the packet, and constructs suitable outgoing link information. The next-hop MAC destination can therefore differ between links.

</details>

### 3. Media and direction of transmission

Which mode allows simultaneous transmission in both directions?

- **A.** Half duplex
- **B.** Simplex
- **C.** A fixed JSON mode
- **D.** Full duplex

<details>
<summary>Answer and explanation</summary>

**D. Full duplex**

Full duplex supports both directions at the same time. Half duplex supports both directions at different times. Simplex supports only one direction. None of these labels by itself identifies the physical cable.

</details>

### 4. Multiplexing: sharing one link

Which resource separates channels in FDM?

- **A.** Only time slots
- **B.** Git branch names
- **C.** Array indices in JSON
- **D.** Frequency bands

<details>
<summary>Answer and explanation</summary>

**D. Frequency bands**

Frequency-division multiplexing assigns separated frequency bands. Time-division multiplexing assigns slots, while wavelength-division multiplexing assigns optical wavelengths. Identify the actual separation resource in the question.

</details>

### 5. Signals, encoding and capacity

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

### 6. Framing and stuffing

With a 0 inserted after five consecutive data 1 bits, what is the stuffed form of 111111?

- **A.** 1111110
- **B.** 0111111
- **C.** 1111011
- **D.** 1111101

<details>
<summary>Answer and explanation</summary>

**D. 1111101**

Send the first five 1 bits, insert 0, then send the remaining data 1. The inserted 0 breaks the run. The receiver removes it using the same agreed stuffing rule.

</details>

### 7. Parity, checksum and CRC

Even parity is used. Which corruption can it fail to detect?

- **A.** Exactly one flipped bit
- **B.** Exactly three flipped bits
- **C.** Every odd number of flips
- **D.** Two flipped bits

<details>
<summary>Answer and explanation</summary>

**D. Two flipped bits**

Two flips preserve whether the total count of 1 bits is even. Any odd number changes that parity and is detected. Parity does not identify and correct the flipped positions.

</details>

### 8. Hamming code and single-bit correction

For 4 data bits, what is the smallest r satisfying 2^r ≥ 4 + r + 1?

- **A.** 1
- **B.** 2
- **C.** 4
- **D.** 3

<details>
<summary>Answer and explanation</summary>

**D. 3**

At r = 2, 4 is smaller than 7. At r = 3, 8 equals 8, so the inequality first holds. The standard arrangement therefore uses four data positions and three check positions.

</details>

### 9. Stop-and-Wait ARQ

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

### 10. Go-Back-N and Selective Repeat

Frames 0–3 are sent and frame 1 is lost. Under standard Go-Back-N, what is resent after the relevant timeout?

- **A.** Only 0
- **B.** Only 3
- **C.** No frame can be resent
- **D.** 1, 2, 3

<details>
<summary>Answer and explanation</summary>

**D. 1, 2, 3**

The standard Go-Back-N receiver discards later out-of-order frames. Recovery goes back to the missing frame and resends the outstanding suffix. Selective Repeat uses different buffering and retransmission rules.

</details>

### 11. ALOHA, CSMA/CD and CSMA/CA

Why can CSMA stations collide even after both sense idle?

- **A.** Sensing always encrypts the signal
- **B.** An idle channel cannot transmit data
- **C.** The MAC addresses must be identical
- **D.** Each station can start before the other signal reaches it

<details>
<summary>Answer and explanation</summary>

**D. Each station can start before the other signal reaches it**

Propagation takes time. Each station can observe idle before hearing the other’s new transmission. Carrier sensing reduces collision probability but cannot provide instantaneous knowledge of every station.

</details>

## Source reading targets

- [CN_UNIT_1_NOTES.docx](<../CN/CN_UNIT_1_NOTES.docx>) — OSI, Physical Layer and part of Data Link Layer. The preserved text also contains extra college topics.
- [CN UNIT-2 NOTES.docx](<../CN/CN UNIT-2 NOTES.docx>) — Flow/error control and medium access. Use the linked lessons to select the test topics.

College files can include material outside the announced topics. Read the selected sections. The examples above use fixed inputs for explanation; some original class examples use random outcomes.
