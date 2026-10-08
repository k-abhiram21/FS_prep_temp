# Computer Networks: 70 hard MCQs

**For the 9 October 2026 FS screening test.** Original practice, prepared 8 October. One best answer per question. These are study selections, not predicted exam questions. Read the hidden explanations to learn the rule and the closest traps.

[All compact banks and coverage audit](../FS_Remaining_Subjects_Learning_Map.md)

## How to use

Work in blocks of 10–15. First choose an answer without opening the explanation; then explain why the other choices fail. For code, record each state change before guessing. The four mixed sets below use every question once: three sets of 20 and one of 10. Set sizes are for revision, not exam subject weights.

**Assumptions:** decimal rates (1 Mb/s = 10⁶ bit/s); bytes contain 8 bits. Ignore processing, queueing, ACK transmission and errors only when stated. OSI is a reference model. ACK numbers and timer behavior are defined in each protocol trace. Textbook checksum examples deliberately use 8-bit words; real Internet checksums use 16-bit words.

## Coverage

| Topic | Questions |
|---|---|
| OSI and encapsulation | [CN001](#cn001)–[CN012](#cn012) (12) |
| Physical signals, capacity, delay and multiplexing | [CN013](#cn013)–[CN030](#cn030) (18) |
| Framing, error detection and correction | [CN031](#cn031)–[CN050](#cn050) (20) |
| ARQ, windows, medium access and Ethernet | [CN051](#cn051)–[CN070](#cn070) (20) |

## Mixed revision sets

**Set 1:** [CN007](#cn007), [CN056](#cn056), [CN016](#cn016), [CN061](#cn061), [CN026](#cn026), [CN058](#cn058), [CN049](#cn049), [CN013](#cn013), [CN027](#cn027), [CN070](#cn070), [CN033](#cn033), [CN017](#cn017), [CN064](#cn064), [CN002](#cn002), [CN009](#cn009), [CN045](#cn045), [CN039](#cn039), [CN025](#cn025), [CN012](#cn012), [CN020](#cn020).

**Set 2:** [CN043](#cn043), [CN024](#cn024), [CN053](#cn053), [CN059](#cn059), [CN005](#cn005), [CN018](#cn018), [CN014](#cn014), [CN050](#cn050), [CN021](#cn021), [CN048](#cn048), [CN032](#cn032), [CN044](#cn044), [CN054](#cn054), [CN069](#cn069), [CN040](#cn040), [CN063](#cn063), [CN015](#cn015), [CN067](#cn067), [CN031](#cn031), [CN042](#cn042).

**Set 3:** [CN065](#cn065), [CN066](#cn066), [CN001](#cn001), [CN004](#cn004), [CN046](#cn046), [CN035](#cn035), [CN028](#cn028), [CN047](#cn047), [CN036](#cn036), [CN003](#cn003), [CN057](#cn057), [CN022](#cn022), [CN008](#cn008), [CN019](#cn019), [CN051](#cn051), [CN068](#cn068), [CN037](#cn037), [CN055](#cn055), [CN029](#cn029), [CN006](#cn006).

**Set 4:** [CN060](#cn060), [CN023](#cn023), [CN052](#cn052), [CN041](#cn041), [CN011](#cn011), [CN034](#cn034), [CN062](#cn062), [CN030](#cn030), [CN010](#cn010), [CN038](#cn038).


## OSI and encapsulation

<a id="cn001"></a>
### CN001 — A frame across a router

A sends to B through router R on two Ethernet LANs. No NAT or tunneling. Which header relationship is correct?

A. The outgoing frame has R’s outgoing MAC and B’s MAC; the IP destinations still name B.

B. The outgoing IP destination becomes R because R sends the frame.

C. The destination MAC must name B even on the first LAN.

D. R forwards the incoming frame unchanged because the IP destination stays B.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The outgoing frame has R’s outgoing MAC and B’s MAC; the IP destinations still name B.**

Frames address a local link; routers remove one link header and build another for the next hop. The destination IP identifies the final host.

**Why the other choices fail:** An unchanged IP destination does not preserve a frame. A first-hop MAC names the next-hop router. Router forwarding can also change fields such as TTL.

**Rule/source:** [CN notes].

</details>

<a id="cn002"></a>
### CN002 — Reliability at two layers

A link uses ARQ and catches corruption. Does this prove application data arrives reliably across five routers?

A. No; local recovery does not guarantee end-to-end delivery.

B. Yes, provided all frames have MAC addresses.

C. Yes, because a reliable first link makes all later links reliable.

D. No, because error detection belongs only to Transport.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — No; local recovery does not guarantee end-to-end delivery.**

Link recovery covers its own hop. Later loss, routing failures or endpoint failures can still prevent delivery.

**Why the other choices fail:** Local and end-to-end scopes differ. Addressing does not supply delivery guarantees, and error detection can occur at several layers.

**Rule/source:** [CN notes].

</details>

<a id="cn003"></a>
### CN003 — A process rather than a host

Two browser connections on one host receive replies through the same NIC. Which distinction chiefly lets Transport deliver data to the right socket?

A. The host MAC address alone.

B. Transport endpoint information such as ports, together with protocol and addresses.

C. The OSI layer number stored in every Ethernet payload.

D. The signal voltage on the cable.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Transport endpoint information such as ports, together with protocol and addresses.**

A host can run many processes. Transport demultiplexing uses endpoint information; a connection can be identified by a tuple, not a port alone.

**Why the other choices fail:** MAC identifies a local interface, voltage encodes bits, and Ethernet need not contain a literal OSI-layer-number field.

**Rule/source:** [CN notes].

</details>

<a id="cn004"></a>
### CN004 — Encryption placement

A question says “encryption is always implemented only at Presentation.” Which correction is strongest?

A. A VPN cannot encrypt network traffic because it is below Presentation.

B. Presentation is its textbook association; real protocols can encrypt at different layers.

C. TLS must therefore be a pure Presentation implementation with no other role.

D. Encryption proves a protocol has exactly seven separate modules.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Presentation is its textbook association; real protocols can encrypt at different layers.**

OSI describes responsibilities, not a compulsory implementation layout. Link security, TLS and network tunnels apply protection at different scopes.

**Why the other choices fail:** A textbook mapping is not an exclusive placement rule or a claim about module count.

**Rule/source:** [CN notes].

</details>

<a id="cn005"></a>
### CN005 — Switch forwarding boundary

An ordinary Ethernet bridge receives a valid unicast frame with an unknown destination MAC. Which behavior best matches learning bridges?

A. Learn the destination on the incoming port and unicast there.

B. Replace destination MAC with the bridge MAC before flooding.

C. Discard because every destination must already be learned.

D. Learn the source on the incoming port and flood eligible other ports in that VLAN.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Learn the source on the incoming port and flood eligible other ports in that VLAN.**

Source learning records where a sender was seen. Unknown unicast flooding lets traffic reach an as-yet unknown destination.

**Why the other choices fail:** Destination learning from the incoming frame is unjustified; ordinary bridging neither requires a prefilled table nor rewrites the destination to itself.

**Rule/source:** [CN notes].

</details>

<a id="cn006"></a>
### CN006 — Router versus repeater

A device regenerates received signals without choosing routes or examining frame destinations. Which function is demonstrated?

A. Data-link switching because bits contain an address.

B. Physical-layer repetition.

C. Transport segmentation because signal shape is restored.

D. Network routing because it connects two segments.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Physical-layer repetition.**

Regeneration restores signal representation. The fact that payload bits encode headers does not mean the device interprets them.

**Why the other choices fail:** Connectivity alone is insufficient evidence of routing or switching; segmentation is a different operation.

**Rule/source:** [CN notes].

</details>

<a id="cn007"></a>
### CN007 — Peer communication illusion

In the OSI model, the two Data Link layers are described as peers. How does actual transmission occur?

A. Each uses its local lower-layer service; signals cross the medium.

B. The two link-layer modules bypass Physical to exchange abstract frames.

C. Data Link can call the remote Transport layer directly.

D. Every peer layer owns a separate physical wire.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Each uses its local lower-layer service; signals cross the medium.**

Peer protocols define logical interaction. Locally, service access passes down the stack and bits travel physically.

**Why the other choices fail:** Logical peers are not a separate direct channel or a remote function-call mechanism.

**Rule/source:** [CN notes].

</details>

<a id="cn008"></a>
### CN008 — Header and payload interpretation

A router parses an IP header carried inside Ethernet. To Ethernet, what is the IP packet?

A. An Ethernet trailer because it follows the MAC fields.

B. A Transport segment by definition.

C. Payload, even though IP itself has a header and payload.

D. Only an IP payload with its header removed.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Payload, even though IP itself has a header and payload.**

Encapsulation is relative: the whole upper-layer PDU can be lower-layer payload. A header at one layer is data at another.

**Why the other choices fail:** Payload does not mean header-free at every nested layer; position after one header does not make something a trailer.

**Rule/source:** [CN notes].

</details>

<a id="cn009"></a>
### CN009 — Service versus protocol

Layer N offers reliable delivery to layer N+1 and exchanges ACK messages with its remote peer. Which distinction is correct?

A. ACK messages define the interface between all adjacent layers.

B. Reliable delivery is the service offered upward; ACK rules are part of the peer protocol.

C. A protocol is only a local API and never a peer agreement.

D. A service must describe the exact wire encoding of ACKs.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Reliable delivery is the service offered upward; ACK rules are part of the peer protocol.**

A service specifies what a user receives; a protocol specifies how peers cooperate to provide it.

**Why the other choices fail:** Adjacent-layer interfaces and remote peer exchanges have different roles; a service need not reveal its implementation.

**Rule/source:** [CN notes].

</details>

<a id="cn010"></a>
### CN010 — Broadcast domains

Two Ethernet LANs are connected by an ordinary router with no bridging. A layer-2 broadcast originates on LAN1. What follows?

A. It becomes an IP packet automatically and reaches every LAN.

B. The router floods it because broadcast ignores layer boundaries.

C. The router does not ordinarily forward that Ethernet broadcast frame onto LAN2.

D. Every switch port must form a separate broadcast domain.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The router does not ordinarily forward that Ethernet broadcast frame onto LAN2.**

A routed boundary separates ordinary link-layer broadcasts. Switch ports in the same VLAN usually share a broadcast domain.

**Why the other choices fail:** Broadcast is scoped; routing is not automatic conversion, and collision domains are not the same as broadcast domains.

**Rule/source:** [CN notes].

</details>

<a id="cn011"></a>
### CN011 — Layer names versus guarantees

A device checks a CRC and drops damaged frames, but never sends ACKs. Which claim is justified?

A. It violates Data Link because every link protocol must use ARQ.

B. It provides error detection; this alone does not provide retransmission or reliable delivery.

C. It provides error correction because damaged data is discarded.

D. It proves errors cannot escape to the receiver.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — It provides error detection; this alone does not provide retransmission or reliable delivery.**

Detection, correction and recovery are separate. A CRC can identify many corruption patterns without reconstructing data.

**Why the other choices fail:** Dropping is not correcting. ARQ is not mandatory, and a finite detection code can have undetected patterns.

**Rule/source:** [CN notes].

</details>

<a id="cn012"></a>
### CN012 — Application versus Application layer

A video app decodes pixels and uses TCP underneath. Which reasoning is sound?

A. Decoding pixels proves TCP provides Presentation services.

B. Every line of its code must belong to OSI Application.

C. TCP becomes Application because the app calls it.

D. The application program can perform functions associated with several OSI layers.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The application program can perform functions associated with several OSI layers.**

Software components and conceptual layers do not have a one-to-one mapping. The called protocol keeps its own responsibilities.

**Why the other choices fail:** Program identity does not relabel protocol roles or force all code into one conceptual layer.

**Rule/source:** [CN notes].

</details>

## Physical signals, capacity, delay and multiplexing

<a id="cn013"></a>
### CN013 — Baud is not bit rate

A noiseless link sends 2,000 symbols/s with 16 distinct symbols. Ignoring coding overhead, what is its bit rate?

A. 4,000 bit/s.

B. 2,000 bit/s.

C. 32,000 bit/s.

D. 8,000 bit/s.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 8,000 bit/s.**

Each symbol carries log₂16 = 4 bits; multiply by 2,000 symbols/s.

**Why the other choices fail:** Baud counts symbols, not bits. Multiplying by 16 or using log₂ of the baud rate confuses the quantities.

**Rule/source:** [MIT networks].

</details>

<a id="cn014"></a>
### CN014 — Nyquist boundary

A noiseless low-pass channel has bandwidth 3 kHz and 8 signal levels. Under the textbook Nyquist bound, maximum rate is?

A. 24 kb/s.

B. 6 kb/s.

C. 9 kb/s.

D. 18 kb/s.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 18 kb/s.**

C = 2 B log₂M = 2×3,000×3 = 18,000 bit/s.

**Why the other choices fail:** The factor two matters; levels contribute logarithmically. Nyquist here assumes the stated ideal noiseless channel.

**Rule/source:** [MIT networks].

</details>

<a id="cn015"></a>
### CN015 — SNR units

A noisy channel has B = 1 MHz and SNR = 15 as a linear power ratio. Shannon capacity is?

A. 4 Mb/s.

B. 1 Mb/s.

C. 15 Mb/s.

D. About 5 Mb/s after treating 15 as dB.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 4 Mb/s.**

C = B log₂(1+SNR) = 10⁶ log₂16 = 4×10⁶ bit/s.

**Why the other choices fail:** Do not use a linear SNR as a dB value, multiply B by SNR, or drop the logarithm.

**Rule/source:** [MIT networks].

</details>

<a id="cn016"></a>
### CN016 — Convert decibels first

B = 1 MHz, SNR = 30 dB. Which Shannon expression is correct?

A. 10⁶ log₂(30) bit/s.

B. 10⁶ log₂(31) bit/s.

C. 30×10⁶ bit/s.

D. 10⁶ log₂(1001) bit/s.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 10⁶ log₂(1001) bit/s.**

Power SNR in dB is 10 log₁₀(S/N). Thus 30 dB means a linear ratio of 1,000; Shannon uses 1+1,000.

**Why the other choices fail:** The formula requires the linear ratio, not its dB label. The additive one is part of the bound.

**Rule/source:** [MIT networks].

</details>

<a id="cn017"></a>
### CN017 — More levels under noise

A designer increases the signal alphabet on a link whose bandwidth and SNR stay fixed. Which conclusion is safe?

A. Shannon doubles whenever the alphabet doubles.

B. Any number of levels can achieve an arbitrarily large reliable rate.

C. Both limits rise in direct proportion to the number of symbols.

D. The noiseless Nyquist bound rises, but the Shannon limit does not.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The noiseless Nyquist bound rises, but the Shannon limit does not.**

Nyquist counts information per ideal symbol. Shannon limits reliable information using bandwidth and noise; adding levels does not remove noise.

**Why the other choices fail:** Closer levels can be harder to distinguish. Alphabet size is not a free increase in channel capacity.

**Rule/source:** [MIT networks].

</details>

<a id="cn018"></a>
### CN018 — Sending a frame versus moving a bit

A 1,000-byte frame crosses a 2 Mb/s link spanning 200 km. Signal speed is 2×10⁸ m/s. Time until its last bit arrives, with no other delay?

A. 4.001 ms.

B. 4 ms.

C. 5 ms.

D. 1 ms.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 5 ms.**

Transmission = 8,000/(2×10⁶) = 4 ms; propagation = 200,000/(2×10⁸) = 1 ms. Last-bit arrival adds both.

**Why the other choices fail:** One choice omits propagation, another omits serialization, and mixing km with metres creates the unit error.

**Rule/source:** [MIT networks].

</details>

<a id="cn019"></a>
### CN019 — Rate change alone

If link rate doubles but frame size, path length and signal speed stay fixed, which delay changes?

A. Only propagation halves.

B. Both stay fixed because distance is fixed.

C. Transmission delay halves; propagation delay stays fixed.

D. Both delays halve.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Transmission delay halves; propagation delay stays fixed.**

L/R depends on rate. d/v depends on path length and propagation speed.

**Why the other choices fail:** Bit rate is not the speed of an individual signal through the medium; distance is not the only delay input.

**Rule/source:** [MIT networks].

</details>

<a id="cn020"></a>
### CN020 — Store-and-forward two hops

A 1,000-byte frame traverses two 1 Mb/s links with 1 ms propagation each. A store-and-forward relay waits for the whole frame. Last-bit arrival time?

A. 9 ms.

B. 16 ms.

C. 10 ms.

D. 18 ms.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 18 ms.**

Each hop needs 8 ms serialization and 1 ms propagation. With whole-frame waiting, both hop costs add: 2×9 ms.

**Why the other choices fail:** Ten ms assumes overlap incompatible with the given relay. Sixteen omits propagation; nine counts one hop.

**Rule/source:** [MIT networks].

</details>

<a id="cn021"></a>
### CN021 — Bits in flight

At 10 Mb/s and one-way propagation delay 20 ms, how many transmitted bits can be in the cable?

A. 200 bits.

B. 400,000 bits.

C. 200,000 bits.

D. 20,000 bits.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 200,000 bits.**

One-way bandwidth-delay product = 10⁷×0.020 = 200,000 bits.

**Why the other choices fail:** Round-trip product would double this, but the question asks one-way bits in flight. Milliseconds must become seconds.

**Rule/source:** [MIT networks].

</details>

<a id="cn022"></a>
### CN022 — Duplex and rate wording

A full-duplex link supports 100 Mb/s in each direction. Which interpretation is valid?

A. One endpoint must wait until the other finishes.

B. Each individual direction becomes 200 Mb/s.

C. Each direction is forced down to 50 Mb/s when both send.

D. Both directions can send simultaneously at up to 100 Mb/s each.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Both directions can send simultaneously at up to 100 Mb/s each.**

Full duplex permits simultaneous two-way transmission. The stated per-direction rate is unchanged.

**Why the other choices fail:** Half duplex requires turns. Summed bidirectional throughput is not the rate of one direction.

**Rule/source:** [MIT networks].

</details>

<a id="cn023"></a>
### CN023 — Manchester representation

For a Manchester scheme with one mandatory middle transition per bit, which comparison is correct?

A. It doubles information per bit period without more bandwidth.

B. It needs no synchronization because no transitions occur.

C. It aids clock recovery and uses more signal transitions than a simple NRZ representation.

D. It represents a bit only by the absolute voltage, never transitions.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — It aids clock recovery and uses more signal transitions than a simple NRZ representation.**

The middle transition carries timing information. Different conventions reverse which transition represents 0 or 1; the convention must be stated for exact decoding.

**Why the other choices fail:** Transition direction and voltage-level encoding differ. Extra transitions are not free extra payload information.

**Rule/source:** [MIT networks].

</details>

<a id="cn024"></a>
### CN024 — Long runs with NRZ

A receiver using simple NRZ has a long run of identical bits. Why can decoding become difficult without added measures?

A. NRZ inherently corrects any timing slip with parity.

B. Repeated bits consume zero transmission time.

C. The receiver can infer the run length without a clock.

D. Few transitions can make clock recovery difficult.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Few transitions can make clock recovery difficult.**

A receiver must identify bit boundaries even when the level does not change. Scrambling or suitable coding can improve transition density.

**Why the other choices fail:** A stable voltage still occupies bit periods. NRZ alone does not supply error-correction redundancy.

**Rule/source:** [MIT networks].

</details>

<a id="cn025"></a>
### CN025 — Frequency versus time division

Four continuously active sources each need a distinct simultaneous frequency band. Which mechanism and cost match?

A. FDM; guard bands carry useful source data by definition.

B. FDM; guard bands can reduce usable spectrum.

C. WDM; every source must use the same optical wavelength.

D. TDM; every source uses the whole link simultaneously.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — FDM; guard bands can reduce usable spectrum.**

Frequency-division multiplexing separates bands in frequency. Guard regions reduce interference but occupy bandwidth.

**Why the other choices fail:** TDM separates time slots. Optical WDM uses distinct wavelengths, and guards are overhead.

**Rule/source:** [MIT networks].

</details>

<a id="cn026"></a>
### CN026 — Fixed slots and an idle source

Synchronous TDM assigns four equal slots per cycle. One source is idle and slots cannot be reassigned. What happens?

A. All active sources automatically receive a third of link capacity.

B. Its reserved slots can remain unused while active sources retain their original slots.

C. The idle source’s slots become a new physical frequency band.

D. The cycle loses its timing boundaries.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Its reserved slots can remain unused while active sources retain their original slots.**

Fixed slot allocation can waste capacity when a source is idle. Statistical allocation could reclaim it, but is not the stated scheme.

**Why the other choices fail:** Do not silently replace fixed TDM with statistical multiplexing or FDM.

**Rule/source:** [MIT networks].

</details>

<a id="cn027"></a>
### CN027 — Attenuation versus distortion

A signal is weaker but otherwise keeps its shape; another signal’s frequency components are delayed differently. Which pairing fits?

A. Both are jitter because all impairments vary arrival time.

B. First distortion; second only reduced power.

C. First noise; second attenuation.

D. First attenuation; second distortion.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — First attenuation; second distortion.**

Attenuation is loss of strength. Unequal changes across components can distort the waveform. Added unwanted energy is noise.

**Why the other choices fail:** These mechanisms can coexist, but the described effects identify different impairments.

**Rule/source:** [MIT networks].

</details>

<a id="cn028"></a>
### CN028 — Fiber immunity boundary

Why is fiber often selected near strong electromagnetic interference?

A. Optical signals have no attenuation at any distance.

B. Fiber makes all propagation delays zero.

C. Optical links cannot suffer connector loss or bit errors.

D. Information travels optically, so the fiber path resists electromagnetic pickup.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Information travels optically, so the fiber path resists electromagnetic pickup.**

Immunity to electromagnetic pickup is a useful property, not immunity to every impairment.

**Why the other choices fail:** Attenuation, connector loss, dispersion, equipment limits and errors can still matter.

**Rule/source:** [MIT networks].

</details>

<a id="cn029"></a>
### CN029 — A delay budget with an ACK

A frame needs 4 ms transmission and 6 ms one-way propagation. ACK transmission is negligible and receiver ACKs immediately after the entire frame. Stop-and-wait cycle time?

A. 10 ms.

B. 16 ms.

C. 12 ms.

D. 20 ms.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 16 ms.**

Sender serializes for 4 ms, the last bit propagates 6 ms, and the ACK propagates back 6 ms: 4+12.

**Why the other choices fail:** Ten omits the return trip; twenty duplicates data serialization; twelve omits it entirely.

**Rule/source:** [MIT networks].

</details>

<a id="cn030"></a>
### CN030 — Capacity is not a speed guarantee

A channel’s Shannon bound is 10 Mb/s. A student says “every code achieves reliable 10 Mb/s.” Best correction?

A. It counts only the number of physical wires.

B. It guarantees 10 Mb/s for uncoded symbols at any noise level.

C. It is exactly the propagation speed of the cable.

D. Capacity is an ideal information limit; a particular finite code and implementation need not attain it.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Capacity is an ideal information limit; a particular finite code and implementation need not attain it.**

Coding, block length, error target and implementation constraints affect achievable operation. The bound alone does not specify a working code.

**Why the other choices fail:** A capacity bound is not a promise about every modulation or implementation.

**Rule/source:** [MIT networks].

</details>

## Framing, error detection and correction

<a id="cn031"></a>
### CN031 — Stuffing the flag-like run

HDLC-style bit stuffing inserts 0 after each five consecutive data 1s. What does data 01111110 become before flags are added?

A. 01111110.

B. 011111100.

C. 011111010.

D. 011110110.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 011111010.**

Copy the initial 0, five 1 s, inserted 0, the remaining 1 and final 0. The inserted bit prevents data from imitating a flag.

**Why the other choices fail:** Stuff after five 1 s, not after the entire byte. Flags themselves are not treated as ordinary payload for this rule.

**Rule/source:** [MIT link].

</details>

<a id="cn032"></a>
### CN032 — Destuff before checking the code

An HDLC-style receiver sees stuffed bits. At what stage should it check the frame FCS?

A. Before finding frame boundaries, using all bits including flags.

B. Before destuffing because the inserted bits are protected payload.

C. After deleting every zero in the received stream.

D. After removing transparency stuffing from the frame contents.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — After removing transparency stuffing from the frame contents.**

Sender framing transparency is applied after forming frame/FCS contents; receiver reverses transparency to recover those contents.

**Why the other choices fail:** Not every zero is stuffed, and flags delimit the frame rather than becoming ordinary FCS input.

**Rule/source:** [MIT link].

</details>

<a id="cn033"></a>
### CN033 — Byte transparency

Toy byte framing uses FLAG=F and ESC=E; encode each payload F or E as E followed by that original byte. Payload A F E B becomes?

A. F A E F E B F.

B. F E A E F E E E B F.

C. F A E F E E B F including boundary flags.

D. F A F E B F.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — F A E F E E B F including boundary flags.**

Only reserved payload bytes receive an escape; the opening and closing F delimiters remain unescaped.

**Why the other choices fail:** Missing one escape confuses payload with control. Escaping all ordinary bytes is not the given rule.

**Rule/source:** [MIT link].

</details>

<a id="cn034"></a>
### CN034 — A damaged length field

A byte-count framing protocol trusts its length field. The count is corrupted but payload bytes are intact. What can fail?

A. Only payload values change; boundaries remain certain.

B. A count field replaces the need for any error detection.

C. The receiver can lose frame boundaries and misinterpret later bytes.

D. The next byte always restores alignment automatically.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The receiver can lose frame boundaries and misinterpret later bytes.**

Length-based framing depends on interpreting the count correctly. A bad count can consume bytes from another frame or terminate early.

**Why the other choices fail:** Payload integrity alone does not protect its framing metadata or guarantee resynchronization.

**Rule/source:** [MIT link].

</details>

<a id="cn035"></a>
### CN035 — Two parity errors

A frame uses one overall even-parity bit. Exactly two data bits flip. What is the outcome for parity?

A. It fails because every nonzero error count changes parity.

B. The parity check passes, although the data is corrupt.

C. It corrects one bit and detects the other.

D. It always identifies both flipped positions.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The parity check passes, although the data is corrupt.**

Two flips preserve the parity of the number of 1 s. Single parity detects odd numbers of flips, not every corruption.

**Why the other choices fail:** Detection of odd parity changes is not localization or correction.

**Rule/source:** [MIT link].

</details>

<a id="cn036"></a>
### CN036 — A code-distance promise

A code has minimum Hamming distance 4. Which guarantee follows?

A. Detect only 1 error because four codewords exist.

B. Correct every pattern of 3 errors.

C. Correct every pattern of 2 errors.

D. Detect up to 3 errors, or correct up to 1 error under standard bounded-distance decoding.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Detect up to 3 errors, or correct up to 1 error under standard bounded-distance decoding.**

Detection needs dmin ≥ e+1; correction needs dmin ≥ 2 t+1. With dmin=4, e=3 and t=1 are guaranteed.

**Why the other choices fail:** Distance is the smallest bit difference between valid words, not the count of codewords. Larger correction requires more separation.

**Rule/source:** [MIT link].

</details>

<a id="cn037"></a>
### CN037 — Required Hamming parity bits

For a shortened single-error-correcting Hamming code with 11 data bits, minimum parity-bit count r satisfies which result?

A. 4, since 2⁴ ≥ 11+4+1.

B. 5, because every data bit needs a parity partner.

C. 11, because duplication is mandatory.

D. 3, since 2³ exceeds the parity count.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 4, since 2⁴ ≥ 11+4+1.**

The syndrome must distinguish no error and each one-bit error among m+r positions: 2ʳ ≥ m+r+1.

**Why the other choices fail:** Three gives only eight syndromes for fifteen positions plus no error. A Hamming code uses overlapping checks, not full duplication.

**Rule/source:** [MIT link].

</details>

<a id="cn038"></a>
### CN038 — Even Hamming checks

Positions 1,2,4 are parity bits in Hamming(7,4). Data at 3,5,6,7 is 1,0,1,1. With even parity, codeword positions 1→7 are?

A. 0110011.

B. 0111011.

C. 1110011.

D. 1010011.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 0110011.**

p 1 checks 1,3,5,7: data XOR=0. p 2 checks 2,3,6,7: XOR=1. p 4 checks 4,5,6,7: XOR=0.

**Why the other choices fail:** Compute each overlapping parity group independently; using odd parity or one global check changes these bits.

**Rule/source:** [MIT link].

</details>

<a id="cn039"></a>
### CN039 — Syndrome bit order

For Hamming(7,4), failed checks are s1=0, s2=1, s4=1. Assume exactly one flipped bit. Which position should be corrected?

A. Position 4.

B. No error because one check passed.

C. Position 6.

D. Position 3.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Position 6.**

Interpret the syndrome as s 4 s 2 s 1 = 110₂ = 6. Its value names the position included in those failed parity groups.

**Why the other choices fail:** Reversing syndrome order gives the wrong index. A passed check does not cancel failed checks.

**Rule/source:** [MIT link].

</details>

<a id="cn040"></a>
### CN040 — Plain Hamming versus SECDED

A plain Hamming(7,4) decoder sees a nonzero syndrome. May it conclude there was exactly one error?

A. Yes; Hamming(7,4) corrects two errors without extra parity.

B. Yes; every nonzero syndrome proves one flipped bit.

C. Only under a stated single-error assumption; two-bit errors can produce a misleading syndrome.

D. No; a single flipped bit always has zero syndrome.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Only under a stated single-error assumption; two-bit errors can produce a misleading syndrome.**

Distance 3 gives single-error correction, but a two-error word can look like a different one-error case. Extended overall parity supports SECDED.

**Why the other choices fail:** Syndrome is evidence of failed checks, not an unrestricted error-count measurement.

**Rule/source:** [MIT link].

</details>

<a id="cn041"></a>
### CN041 — Small checksum arithmetic

Use 8-bit one’s-complement addition. Data words are F0 and 30 hex. What checksum is appended?

A. DF hex.

B. DE hex.

C. E0 hex.

D. 20 hex.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — DE hex.**

F0+30=120 hex. Fold carry: 20+1=21. Complement all 8 bits: DE. At the receiver, 21+DE=FF.

**Why the other choices fail:** Discarding the carry gives DF. A two’s-complement negation gives a different result; raw sum is not the checksum.

**Rule/source:** [MIT link].

</details>

<a id="cn042"></a>
### CN042 — Compensating corruption

One’s-complement checksum words change from (10,20) to (11,19), with no overflow. Which result is possible?

A. The checksum is unchanged while the data is corrupted.

B. The checksum tells which word was incremented.

C. Every change of any word must change the checksum.

D. The two changes automatically repair the original data.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The checksum is unchanged while the data is corrupted.**

Both sums are 30. A sum-based check can miss compensating changes.

**Why the other choices fail:** A check value is not a complete encoding of every word or a correction procedure.

**Rule/source:** [MIT link].

</details>

<a id="cn043"></a>
### CN043 — CRC division operator

A CRC computes a polynomial remainder over GF(2). Which arithmetic belongs in the division?

A. XOR subtraction with no carries or borrows.

B. Ordinary base-2 subtraction with borrow.

C. Decimal division of the bit string as a number.

D. Addition of bit positions without reduction modulo two.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — XOR subtraction with no carries or borrows.**

GF(2) coefficients are 0 or 1; addition and subtraction both use XOR. Polynomial degree governs the division.

**Why the other choices fail:** Integer remainder is a different algebra. Carries and borrows do not belong to GF(2) polynomial arithmetic.

**Rule/source:** [MIT link].

</details>

<a id="cn044"></a>
### CN044 — CRC worked remainder

Data 1101 and generator 1011 (degree 3). Append three zeros and divide by XOR. What transmitted codeword results?

A. 1101011.

B. 1101000.

C. 1101001.

D. 1101101.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 1101001.**

1101000 divided by 1011 leaves remainder 001. Replace the three appended zeros with 001; 1101001 divides with remainder zero.

**Why the other choices fail:** Append the remainder, not the data’s last bits or the generator. The all-zero append is only an intermediate dividend.

**Rule/source:** [MIT link].

</details>

<a id="cn045"></a>
### CN045 — CRC passing is conditional

A receiver gets CRC remainder zero. Which conclusion is justified?

A. CRC has corrected every error in the codeword.

B. The bits are mathematically guaranteed unchanged.

C. No error was detected by this generator; a nonzero error polynomial divisible by it could pass.

D. The receiver knows the original payload without reading it.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — No error was detected by this generator; a nonzero error polynomial divisible by it could pass.**

If E(x) is divisible by G(x), a corrupted codeword can still have zero syndrome. CRC supplies detection rather than reconstruction.

**Why the other choices fail:** Passing a finite check is not absolute integrity or correction.

**Rule/source:** [MIT link].

</details>

<a id="cn046"></a>
### CN046 — Burst-error guarantee

A CRC generator has degree r and nonzero constant term. Which textbook guarantee applies?

A. Every burst of any length is detected.

B. Every burst of r+1 bits always passes.

C. Every burst error of length at most r is detected.

D. Exactly r errors are always corrected.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Every burst error of length at most r is detected.**

A burst of length ≤r has a nonzero polynomial of degree <r after factoring out its position; it cannot be divisible by the degree-r generator.

**Why the other choices fail:** Longer bursts may pass or fail depending on their pattern; detection is not correction.

**Rule/source:** [MIT link].

</details>

<a id="cn047"></a>
### CN047 — Odd numbers of errors

A CRC generator contains the factor (x+1). What additional detection property follows?

A. It corrects every odd number of flips.

B. It detects every error pattern with an odd number of flipped bits.

C. It detects only adjacent flipped bits.

D. It necessarily misses all even numbers of flips.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — It detects every error pattern with an odd number of flipped bits.**

At x=1, a polynomial with an odd number of nonzero coefficients evaluates to 1 in GF(2), so it cannot contain x+1.

**Why the other choices fail:** Even patterns are not all missed; this factor supplies a guarantee for odd patterns, without decoding the original.

**Rule/source:** [MIT link].

</details>

<a id="cn048"></a>
### CN048 — Detection versus ARQ decision

A damaged frame fails its CRC. The protocol retransmits after a timeout without a NAK. Is a NAK required for recovery?

A. No; CRC itself sends a corrected payload.

B. Yes; CRC guarantees every damaged frame is acknowledged.

C. Yes; a timeout cannot imply possible loss.

D. No; missing ACKs and timeouts can trigger retransmission.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — No; missing ACKs and timeouts can trigger retransmission.**

Error detection tells the receiver something is wrong. Recovery rules can use positive ACKs and sender timers without negative ACKs.

**Why the other choices fail:** CRC and ARQ have different jobs; explicit negative feedback is optional in many designs.

**Rule/source:** [MIT link].

</details>

<a id="cn049"></a>
### CN049 — Overhead lowers payload efficiency

A data-link frame has 100 bytes payload and 20 bytes header/trailer. Ignoring all other costs, payload efficiency is?

A. 5/6, about 83.3%.

B. 120%.

C. 100%, because headers carry useful control.

D. 20%.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 5/6, about 83.3%.**

Useful payload fraction is 100/(100+20). Control is necessary but excluded by the stated payload-efficiency definition.

**Why the other choices fail:** Overhead/payload is not payload/total, and useful control does not make it application payload.

**Rule/source:** [MIT link].

</details>

<a id="cn050"></a>
### CN050 — Error-correction overhead tradeoff

Two codes protect the same payload: code X detects errors for ARQ; code Y can correct selected patterns. Which claim is sound?

A. Y can avoid retransmission for errors within its correction ability, but does not guarantee all patterns are repaired.

B. X must use more parity bits than any correcting code.

C. Y needs no redundancy because decoding creates missing information.

D. Correction eliminates propagation delay and channel noise.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Y can avoid retransmission for errors within its correction ability, but does not guarantee all patterns are repaired.**

Forward error correction uses redundancy to distinguish selected corrupted words. Its benefit depends on code distance and channel conditions.

**Why the other choices fail:** Neither unlimited correction nor a universal overhead comparison follows from the labels alone.

**Rule/source:** [MIT link].

</details>

## ARQ, windows, medium access and Ethernet

<a id="cn051"></a>
### CN051 — Lost ACK in alternating-bit ARQ

Receiver delivers frame 0, sends ACK0, then expects frame1. ACK0 is lost. Sender retransmits frame0. Receiver should?

A. Discard it without replying, forcing permanent timeout.

B. Accept it as frame1 because it arrived later.

C. Discard the duplicate payload and resend ACK0.

D. Deliver frame0 again and move its expectation to 0.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Discard the duplicate payload and resend ACK0.**

Sequence numbers distinguish a retransmission from new data. Repeating the ACK allows the sender to recover from ACK loss without duplicate delivery.

**Why the other choices fail:** Arrival time does not assign sequence identity. Ignoring all duplicates loses an opportunity to recover.

**Rule/source:** [CN notes].

</details>

<a id="cn052"></a>
### CN052 — Stop-and-wait utilization

Frame transmission is 2 ms and one-way propagation is 9 ms. Immediate negligible-size ACKs, no loss. Link utilization for data transmission is?

A. 50%.

B. 100%.

C. 10%.

D. 18.2%.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 10%.**

Cycle = Ttx+2 Tprop = 20 ms; useful sending time=2 ms. U=2/20=0.1.

**Why the other choices fail:** Using one-way delay yields 2/11. A full-duplex link does not by itself keep a stop-and-wait sender busy.

**Rule/source:** [CN notes].

</details>

<a id="cn053"></a>
### CN053 — Window to keep the sender busy

Ttx=2 ms, one-way propagation=9 ms, negligible ACK time, no loss. What minimum window allows continuous frame sending?

A. 18 frames.

B. 10 frames.

C. 9 frames.

D. 5 frames.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 10 frames.**

The first ACK arrives 2+18=20 ms after starting frame 1. Sending ten frames covers that cycle: W≥ceil(1+2 Tprop/Ttx)=10.

**Why the other choices fail:** Use round-trip propagation plus serialization of the acknowledged frame, not just one-way delay.

**Rule/source:** [CN notes].

</details>

<a id="cn054"></a>
### CN054 — GBN retransmission set

GBN sender has sent 0,1,2,3. Receiver expects 0; frame0 arrives, frame1 is lost, 2 and 3 arrive. Receiver discards out-of-order frames. Timer for oldest unACKed frame1 expires. Retransmit?

A. 0,1,2,3.

B. Only 2 and 3.

C. Only 1.

D. 1,2,3.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1,2,3.**

GBN goes back to the oldest unacknowledged frame and resends all outstanding frames. Frame 0 has already been cumulatively acknowledged.

**Why the other choices fail:** Only 1 is selective-repeat behavior with buffering. Already acknowledged 0 and received-but-discarded later frames have different states.

**Rule/source:** [CN notes].

</details>

<a id="cn055"></a>
### CN055 — SR arrival is not delivery

Selective Repeat starts expecting0, accepts individually numbered frames and buffers out of order. It receives 0,2,3,1. What is delivered after the final arrival?

A. Only1; buffered2 and3 must be retransmitted.

B. 3,2,1 because buffered frames form a stack.

C. Nothing until a new frame4 arrives.

D. 1,2,3 in order; 0 was already delivered.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1,2,3 in order; 0 was already delivered.**

Receiving 1 fills the earliest hole, so a contiguous prefix through 3 can now be delivered. ACKing 2 or 3 earlier need not mean delivering them earlier.

**Why the other choices fail:** Separate accepted/buffered from delivered. The stated protocol already retained 2 and 3.

**Rule/source:** [CN notes].

</details>

<a id="cn056"></a>
### CN056 — GBN sequence-number limit

A textbook GBN sender uses 3-bit sequence numbers; receiver window is1. Maximum sender window under the usual ambiguity-avoidance rule?

A. 8.

B. 7.

C. 3.

D. 4.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 7.**

With sequence space 2³=8, GBN’s standard sender limit is 2³−1=7. A full-size window could confuse old and new cycles after ACK loss.

**Why the other choices fail:** Four is the symmetric SR bound; three is the bit count, not the window capacity.

**Rule/source:** [CN notes].

</details>

<a id="cn057"></a>
### CN057 — SR sequence-number limit

Textbook SR uses 3-bit numbers and equal sender/receiver windows. Maximum safe window under the standard wraparound rule?

A. 8.

B. 7.

C. 4.

D. 3.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 4.**

Equal SR windows must occupy at most half the sequence space: W≤2^(m−1)=4.

**Why the other choices fail:** GBN’s 7-frame rule relies on a different receiver behavior; the entire sequence space is unsafe for equal SR windows.

**Rule/source:** [CN notes].

</details>

<a id="cn058"></a>
### CN058 — Wrapping an SR window

With modulo8 numbering and SR window size4, receiver window begins at6. Which new frame numbers lie in its window?

A. 2,3,4,5.

B. 6,7,0,1.

C. 6,7 only.

D. 6,7,8,9 as transmitted sequence values.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 6,7,0,1.**

Sequence numbers wrap modulo 8. Window positions are 6,7,0,1 even though linear comparisons would fail at the boundary.

**Why the other choices fail:** Do not treat unsigned sequence values as an unbounded counter. Old-window duplicates require different handling.

**Rule/source:** [CN notes].

</details>

<a id="cn059"></a>
### CN059 — Cumulative ACK meaning

For this GBN variant ACK k means “next expected is k.” Sender has sent0–4 and receives ACK3. Which frames are cumulatively acknowledged?

A. 0,1,2.

B. Only2.

C. Only3.

D. 0,1,2,3.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 0,1,2.**

Next expected 3 means the in-order prefix through 2 has arrived. The definition controls the off-by-one boundary.

**Why the other choices fail:** Other texts use ACK=last accepted; do not import that convention into this explicit one.

**Rule/source:** [CN notes].

</details>

<a id="cn060"></a>
### CN060 — An individual ACK

In this SR variant ACK k confirms only frame k. Frames1,2,3 are outstanding and ACK3 arrives. What follows?

A. Frame3 is acknowledged; frames1 and2 may still need recovery.

B. The send window must advance past3 immediately even if1 is missing.

C. Frame3 cannot be acknowledged before1 by definition.

D. All frames through3 are acknowledged.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Frame3 is acknowledged; frames1 and2 may still need recovery.**

Individual acknowledgement is different from cumulative acknowledgement. A gap can prevent the base from advancing despite later successes.

**Why the other choices fail:** SR can accept out of order; cumulative interpretation and unconditional base movement are not valid here.

**Rule/source:** [CN notes].

</details>

<a id="cn061"></a>
### CN061 — Premature timeout

No frame or ACK is lost, but the timeout is shorter than the real ACK turnaround. Which effect can occur?

A. Guaranteed payload corruption because timers change bits.

B. Unnecessary retransmissions, handled as duplicates by a correct ARQ receiver.

C. Reliable delivery with no duplicate traffic by definition.

D. A larger sequence-number field is never needed for duplicate handling.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Unnecessary retransmissions, handled as duplicates by a correct ARQ receiver.**

Timeout is suspicion of loss, not proof. Delay variation can produce redundant sends; sequence rules protect delivery semantics.

**Why the other choices fail:** Timers cannot distinguish delay from loss with certainty and do not edit payload bits.

**Rule/source:** [CN notes].

</details>

<a id="cn062"></a>
### CN062 — Piggyback direction

A data frame travels B→A while acknowledging an earlier A→B frame. Which description is correct?

A. The ACK travels A→B alongside the original frame being acknowledged.

B. An ACK can wait indefinitely for reverse data without any timeout rule.

C. Piggybacking requires no acknowledgement field.

D. The ACK rides on reverse-direction data relative to the frame it acknowledges.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The ACK rides on reverse-direction data relative to the frame it acknowledges.**

Piggybacking reuses traffic already traveling back to the original sender. If no suitable traffic appears soon, a separate ACK may be needed.

**Why the other choices fail:** Do not reverse the acknowledgement direction. Unlimited waiting can stall or provoke retransmissions.

**Rule/source:** [CN notes].

</details>

<a id="cn063"></a>
### CN063 — Pure versus slotted ALOHA

Equal-length frames take T seconds; ignore capture. Why does slotted ALOHA reduce the vulnerable interval?

A. Aligned starts reduce it from2T toT.

B. It listens before sending and makes collisions impossible.

C. It places each station permanently in its own collision-free slot.

D. It increases frame duration to2T.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Aligned starts reduce it from2T toT.**

In pure ALOHA, a start within T before or after yours can overlap. Slots constrain starts to boundaries, so only the same slot overlaps.

**Why the other choices fail:** Random-access slots are not reserved TDMA slots, and slotted ALOHA does not become carrier sensing.

**Rule/source:** [CN notes].

</details>

<a id="cn064"></a>
### CN064 — ALOHA maximum throughput

Under the textbook Poisson model, S=G e^(−2G) for pure ALOHA and S=G e^(−G) for slotted. Which maxima fit?

A. Pure:1/(2e) atG=0.5; slotted:1/e atG=1.

B. Pure:1 atG=1; slotted:2 atG=2.

C. Pure:1/(2e) atG=1; slotted:1/e atG=0.5.

D. Both:1/e atG=1.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Pure:1/(2e) atG=0.5; slotted:1/e atG=1.**

Differentiate: pure derivative e^(−2 G)(1−2 G), slotted derivative e^(−G)(1−G). Offered load includes retransmissions.

**Why the other choices fail:** The optimal loads differ; successful throughput cannot be inferred by copying G or swapping stationary points.

**Rule/source:** [CN notes].

</details>

<a id="cn065"></a>
### CN065 — Carrier sensing still collides

Two CSMA stations far apart both sense an idle medium and begin transmitting. Why can a collision still occur?

A. Carrier sensing guarantees no collision, so the premise is impossible.

B. Only an IP address conflict can cause this event.

C. Propagation delay can keep one station unaware of the other’s new transmission.

D. CSMA never checks whether the channel is busy.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Propagation delay can keep one station unaware of the other’s new transmission.**

Sensing is local. Another signal takes time to arrive, creating a vulnerable interval even with sensing.

**Why the other choices fail:** Carrier detection does not imply instantaneous knowledge everywhere on a shared medium.

**Rule/source:** [CN notes].

</details>

<a id="cn066"></a>
### CN066 — Persistence rules

A station finds the medium busy. Under textbook 1-persistent versus nonpersistent CSMA, which distinction is correct?

A. 1-persistent gives up forever; nonpersistent senses continuously.

B. Nonpersistent assigns fixed slots without sensing.

C. 1-persistent keeps sensing and transmits when idle; nonpersistent waits a random interval before sensing again.

D. Both transmit immediately into a busy channel.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 1-persistent keeps sensing and transmits when idle; nonpersistent waits a random interval before sensing again.**

Persistence specifies behavior around busy/idle observations. Continuous eager attempts can cause contenders to transmit together when the channel clears.

**Why the other choices fail:** These are CSMA strategies, not permanent failure, deliberate busy transmission or TDMA.

**Rule/source:** [CN notes].

</details>

<a id="cn067"></a>
### CN067 — Collision detection minimum frame

In a simplified half-duplex CSMA/CD network, bit rate=10 Mb/s and maximum one-way propagation=25 μs. Ignoring repeaters/jam, minimum transmission length to detect worst-case collision?

A. 1,000 bits.

B. 50 bits.

C. 500 bits.

D. 250 bits.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 500 bits.**

Sender must still transmit after a signal can travel to the far end and a collision indication return:2τ=50 μs. R×2τ=500 bits.

**Why the other choices fail:** One-way travel is insufficient. This is a simplified timing calculation, not a claim about the Ethernet standard’s exact minimum frame size.

**Rule/source:** [CN notes].

</details>

<a id="cn068"></a>
### CN068 — Full-duplex Ethernet

Two endpoints use a properly configured switched full-duplex Ethernet link. Which statement fits?

A. They can transmit simultaneously; normal operation does not use CSMA/CD collision arbitration.

B. Full duplex removes frame CRC checking.

C. Every simultaneous transmission collides.

D. CSMA/CD is required because Ethernet has MAC addresses.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — They can transmit simultaneously; normal operation does not use CSMA/CD collision arbitration.**

A full-duplex point-to-point link has separate send/receive paths, so classic shared-medium collisions are absent.

**Why the other choices fail:** Duplex affects medium contention, not whether link framing or error detection exists.

**Rule/source:** [CN notes].

</details>

<a id="cn069"></a>
### CN069 — Wireless hidden terminal

A and C cannot hear each other but both reach B. What problem and partial mitigation fit?

A. Hidden terminals; RTS/CTS can reduce some collisions by reserving access around B.

B. Exposed terminals; higher transmit rate alone guarantees a cure.

C. RTS/CTS is bit-error correction that reconstructs damaged payload.

D. No collision can occur because A and C are out of range.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Hidden terminals; RTS/CTS can reduce some collisions by reserving access around B.**

Local carrier sensing misses transmissions outside hearing range. Coordination through the receiver can help but control frames can also collide.

**Why the other choices fail:** Out-of-range senders can interfere at a shared receiver. RTS/CTS addresses access coordination, not payload coding.

**Rule/source:** [CN notes].

</details>

<a id="cn070"></a>
### CN070 — Ethernet minimum payload boundary

An ordinary untagged Ethernet MAC frame has14 bytes header,4 bytes FCS, and a minimum64-byte size from destination MAC through FCS. A20-byte payload needs how much padding?

A. No padding because preamble fills the minimum.

B. 44 bytes.

C. 46 bytes.

D. 26 bytes.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 26 bytes.**

Minimum payload+pad=64−14−4=46 bytes; padding=46−20=26. Preamble/SFD and interframe gap are excluded from this stated frame size.

**Why the other choices fail:** Distinguish minimum data-field size from added padding, and frame bytes from physical overhead.

**Rule/source:** [CN notes].

</details>

## Sources

[CN notes]: FS_Revision_Notes.md
[MIT networks]: https://ocw.mit.edu/courses/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/pages/readings/
[MIT link]: https://ocw.mit.edu/courses/6-263j-data-communication-networks-fall-2002/pages/lecture-notes/
[PPP framing]: https://www.rfc-editor.org/rfc/rfc1662.html
[Internet checksum]: https://www.rfc-editor.org/rfc/rfc1071.html
