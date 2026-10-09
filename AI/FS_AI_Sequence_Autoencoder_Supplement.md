# AI supplement: RNN, LSTM, GRU and autoencoders

Added **9 October 2026**, after your report that these topics appeared in the screening test despite not being listed separately in the notice. This records your report, not an independently obtained exam paper. The earlier guide followed the announced four AI headings too narrowly for the questions you encountered.

[Main AI guide](FS_Revision_Notes.md) · [Original 70-question bank](FS_AI_Hard_MCQ_Bank.md) · [All subject banks](../FS_Remaining_Subjects_Learning_Map.md)

**ai explnation due to lack of material** — original short explanations and practice. The files currently in `AI/` give only brief architecture mentions: [Unit I Part 1](KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf), PDF viewer page 59, names RNN/LSTM for sequences and autoencoders for anomaly detection. It does not teach their gates or training details. The other two PDFs do not provide dedicated RNN/LSTM/GRU/autoencoder chapters. Primary papers and official implementation references below fill that gap.

Read the short notes first, then attempt **40 MCQs**. Answers explain the rule and every wrong choice. The supplement focuses on the four topics you recalled; it does not treat other architectures as confirmed exam content.

## 1. RNN: reuse a state across a sequence

A **Recurrent Neural Network** processes an ordered sequence, such as words or sensor readings. At step t it combines the current input xₜ with a state hₜ₋₁ carrying information from earlier steps:

```text
hₜ = tanh(Wxₜ + Uhₜ₋₁ + b)
```

W, U and b are shared across time. The **state changes at each step; the weights do not become a new parameter set at each step**. A separate output layer can turn h into a class score, number or vocabulary distribution. A state is a learned summary, not a guaranteed lossless record of every earlier input.

**Tiny trace:** replace tanh with a linear activation and use hₜ = 2hₜ₋₁+xₜ, h₀=0. Inputs [1,2,3] give states [1,4,11]. Reversing the input gives [3,8,17]. Order matters even though the same weights are reused.

| Task | Typical output arrangement |
|---|---|
| Sentiment of a complete sentence | Many inputs → one final classification. |
| Tag each word | Many inputs → one output per input step. |
| Translate a sentence | Encoder → decoder; output length can differ from input length. |
| Generate a sequence | Feed earlier generated outputs into later steps. Training may use the true previous target: **teacher forcing**. |

**Backpropagation Through Time (BPTT)** applies the chain rule through the unrolled steps and sums contributions to shared weights. Repeated derivative products can shrink (**vanishing gradients**) or grow (**exploding gradients**). Gradient clipping limits large gradients; it does not restore an already tiny gradient. Truncated BPTT cuts the gradient history after a selected span; carrying the numerical state onward does not restore the cut gradient path. [Sequence-modeling textbook, §§10.2 and 10.7][seqbook], [TensorFlow RNN guide][rnn].

**Bidirectional** RNNs process both directions. This helps when the complete input is available, such as labeling an already received sentence. It creates look-ahead if applied to a forecasting decision whose future input values are unavailable. Reversing a single RNN is not the same as using two directions. [Bidirectional API][bidir], [forecasting/data-split guide][forecast].

## 2. LSTM: separate retained memory from exposed output

**Long Short-Term Memory** is a gated RNN. A common modern LSTM has a cell state c and hidden/output state h. With elementwise multiplication `⊙`:

```text
fₜ = sigmoid(Wf xₜ + Uf hₜ₋₁ + bf)   forget/retain gate
iₜ = sigmoid(Wi xₜ + Ui hₜ₋₁ + bi)  input/write gate
gₜ = tanh(Wg xₜ + Ug hₜ₋₁ + bg)     candidate content
oₜ = sigmoid(Wo xₜ + Uo hₜ₋₁ + bo)  output/exposure gate
cₜ = fₜ ⊙ cₜ₋₁ + iₜ ⊙ gₜ
hₜ = oₜ ⊙ tanh(cₜ)
```

Sigmoid gates are soft values between 0 and 1, not discrete if-statements. Exact 0/1 gate values in hand questions represent idealized limiting cases or supplied numerical values.

- **Forget gate:** controls retained old cell content. f≈1 preserves it; f≈0 removes that direct contribution.
- **Input gate:** controls how much candidate content is written. The candidate itself is not a fourth sigmoid gate.
- **Output gate:** controls exposure through h. o≈0 can hide memory while c still stores it.

**Worked step:** cₜ₋₁=2, f=0.5, i=0.25, g=−0.8, o=0.5. Then cₜ=1−0.2=0.8 and hₜ=0.5 tanh(0.8)≈0.3320. Cell state and hidden state need not match.

Along the **direct cell-state path**, holding gate/candidate values fixed, ∂cₜ/∂cₜ₋₁=fₜ. Values near 1 can preserve a gradient over many steps. This is not the full derivative through every gate dependency and does not guarantee perfect long-term memory or eliminate every vanishing/exploding gradient. The original 1997 LSTM and later forget-gate variants differ; exam equations here use the modern form above. [LSTM API][lstm], [versioned cell equations][lstmcode], [original LSTM paper][original-lstm].

## 3. GRU: combine memory and output in one state

A **Gated Recurrent Unit** usually has one recurrent state h and two sigmoid gates: update z and reset r. One common convention is:

```text
rₜ = sigmoid(Wr xₜ + Ur hₜ₋₁ + br)
zₜ = sigmoid(Wz xₜ + Uz hₜ₋₁ + bz)
gₜ = tanh(Wg xₜ + Ug(rₜ ⊙ hₜ₋₁) + bg)
hₜ = zₜ ⊙ hₜ₋₁ + (1−zₜ) ⊙ gₜ
```

Here **z near 1 keeps the old state**, while z near 0 prefers the candidate. Some sources define the complementary gate and reverse those roles. Read the equation before memorizing what “high update” means. The reset gate controls old-state influence **inside the candidate computation**. Setting r=0 does not necessarily zero the final h, because its update path can still retain old h.

**Worked step:** hₜ₋₁=2, z=0.75, g=−0.4 gives hₜ=1.5−0.1=1.4 under this convention.

**Implementation trap:** reset-before and reset-after matrix multiplication need not be equivalent for a vector state. Keras `reset_after=True` uses the latter convention and separate input/recurrent biases. “GRU has fewer parameters than LSTM” is ordinarily true for equal input/hidden widths under the standard configurations below; it is not a universal claim about differently sized models or predictive accuracy. [GRU paper, §2.3][cho], [GRU API][gru], [versioned GRU implementation][grucode].

## 4. Shapes, states and parameter counts

Keras recurrent input normally has shape **(batch B, time T, features d)**. A cell handles one step; an RNN layer repeatedly applies its cell.

| Setting | Result |
|---|---|
| `return_sequences=False` | Last output per example: (B,u). |
| `return_sequences=True` | Output at each step: (B,T,u). Needed when passing a sequence into another ordinary recurrent layer. |
| LSTM `return_state=True` | Output plus final h and final c. It does not return every cₜ. |
| GRU/SimpleRNN `return_state=True` | Output plus one final state. |
| `stateful=False` | Starts with a fresh state per call unless an initial state is explicitly supplied; still recurrent within each sequence. |
| `stateful=True` | Carries state from batch slot i to slot i in the next call. Preserve sequence alignment and reset between unrelated streams. It does not itself preserve BPTT graphs across calls. |
| Masking | A supported RNN skips masked steps for state updates. Padding with zero values alone is not equivalent to supplying a mask. |

Parameter counts below exclude an output head, peepholes and projection variants:

| Layer, input width d, hidden width u | Trainable parameter count |
|---|---:|
| SimpleRNN, one bias vector | u(d+u+1) |
| LSTM, four affine transforms with biases | 4u(d+u+1) |
| GRU, `reset_after=False`, biases enabled | 3u(d+u+1) |
| Keras GRU, `reset_after=True`, biases enabled | 3u(d+u+2) |

For d=3,u=4 the counts are 32,128,96,108. Sequence length and batch size affect work/activation storage, not these shared parameter counts. One dense recurrent layer takes roughly O(T(du+u²)) arithmetic per example for fixed gate count; full BPTT stores step-dependent activations, unlike just keeping a final inference state. [SimpleRNN][simple], [LSTM][lstm], [GRU][gru], [masking][mask].

## 5. Autoencoder: learn a representation by reconstruction

An **autoencoder** has an encoder f producing latent code z and a decoder g producing reconstruction x̂:

```text
x → encoder → z → decoder → x̂
loss compares x̂ with the reconstruction target
```

For a plain autoencoder, the target is x itself. It needs no external class labels for that objective; “unsupervised” does not mean “no target or loss.” It is also often described as self-supervised. Encoder/decoder names alone do not make a model an autoencoder: translation normally targets a different sentence. [TensorFlow autoencoder introduction][ae], [autoencoder textbook chapter][aebook].

| Variant | Essential distinction |
|---|---|
| Undercomplete | Latent dimension is smaller than input dimension. A bottleneck constrains copying; it does not guarantee useful features or perfect reconstruction. |
| Overcomplete | Latent dimension is at least the input dimension. Without suitable constraints, a high-capacity model can learn an unhelpful identity map. |
| Sparse | Penalizes/limits latent activations; not synonymous with a small latent dimension or sparse weights. |
| Denoising | Corrupted input x̃ → clean target x. Learning to copy x̃ is a different objective. |
| Contractive | Penalizes encoder sensitivity to input changes, commonly through its Jacobian. Different from adding input noise. |
| Variational (VAE) | Encoder represents a distribution, often mean μ and log variance; sample z=μ+σ⊙ε. Training balances reconstruction with a KL term to a prior. |

**VAE caution:** an ordinary deterministic AE has no general guarantee that arbitrary random latent values decode sensibly. A VAE explicitly trains a distributional latent model. Reparameterization moves randomness into ε so derivatives can flow through μ and σ. The usual minimized negative-ELBO is expected negative log-likelihood plus a nonnegative KL divergence; exact reduction/scaling must be stated. Do not call a latent sampling distribution a softmax class probability. [VAE paper][vae], [official VAE example][vaeexample], [denoising paper][denoise].

**Linear AE versus PCA:** with centered data, a rank-k linear encoder/decoder, squared reconstruction error and a global optimum, the reconstructed subspace can match the PCA principal subspace. The latent coordinates/weights need not equal unique orthonormal PCA axes. Nonlinear or differently constrained AEs do not inherit this equivalence. [Textbook §14.1][aebook].

**Anomaly detection:** fit reconstruction mainly to representative normal data, then score each example by reconstruction error. High error is a signal, not proof of an anomaly; anomalies can also reconstruct well. Choose the threshold using a suitable training/validation policy, never repeatedly tune on final test labels. Scaling and the reduction axes change the score. Raising a “score > threshold” cutoff cannot increase the set flagged as anomalous. [Official example][ae].

**Loss trap:** x=(0,1), x̂=(1,3) gives squared errors (1,4), sum 5 and mean 2.5. A batch of such errors reduced over **all axes** yields one number; reducing only feature axes preserves one score per example. Match decoder range to the data: sigmoid fits values in [0,1], whereas an unconstrained real target generally needs an appropriate unrestricted output. A small MSE is not a calibrated anomaly probability.

## 6. Fast comparison and revision route

| Feature | Simple RNN | LSTM | GRU | Autoencoder |
|---|---|---|---|---|
| Main idea | Reuse sequence state | Gated cell memory plus output | Gated single state | Encode and reconstruct |
| Standard states | h | h,c | h | Latent code; can itself use recurrent layers |
| Named sigmoid gates | None in vanilla form | Input, forget, output | Update, reset | Architecture-dependent |
| Common use | Sequential prediction | Longer temporal dependencies | Sequential prediction with fewer standard transforms | Representation learning, denoising, anomaly scoring |
| Common trap | Shared weights ≠ independent steps | Hiding output ≠ erasing memory | Gate convention can reverse | Low reconstruction loss ≠ guaranteed useful representation |

A recurrent autoencoder can combine these ideas: RNN/LSTM/GRU layers encode and reconstruct a sequence. Architecture and training objective are different axes; “LSTM” and “autoencoder” are not mutually exclusive labels.

Start with the 12-question diagnostic below. Then attempt the other questions in blocks of 8–10. Recompute the numerical ones and trace each state before opening the answer. These are original practice questions, not reconstructed exam items.

<!-- AI-EXTRA-MCQ-START -->

## 7. Forty hard MCQs

**Execution assumptions:** each Python block is independent. TensorFlow blocks use TensorFlow CPU 2.16.1 with Keras 3.15.1, eager mode. Exact-output cases set weights or inspect only shapes/counts. `/` in choices separates output lines. Gate arithmetic follows the explicitly supplied convention; no random training outcomes are assumed.

**Diagnostic:** [AIX001](#aix001), [AIX003](#aix003), [AIX005](#aix005), [AIX009](#aix009), [AIX011](#aix011), [AIX013](#aix013), [AIX016](#aix016), [AIX021](#aix021), [AIX023](#aix023), [AIX029](#aix029), [AIX033](#aix033), [AIX039](#aix039).

| Topic | Questions |
|---|---|
| RNN and sequence behavior | AIX001–010 |
| LSTM memory and API | AIX011–020 |
| GRU conventions and API | AIX021–028 |
| Autoencoders and variants | AIX029–040 |

<a id="aix001"></a>
### AIX001 — Longer sequence, same weights

A biased SimpleRNN has input width 3 and hidden width 4. Only sequence length changes from 10 to 100. What changes?

A. Parameter count stays 32; the number of recurrent step computations increases.

B. Parameter count grows from 320 to 3200.

C. Hidden width becomes 100 because it stores every step separately.

D. Each step becomes independent because weights are shared.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Parameter count stays 32; the number of recurrent step computations increases.**

The matrices have 3×4 and 4×4 entries, plus 4 biases: 32 total. The same objects are reused at each time step.

**Why the other choices fail:**

- **B:** These counts multiply parameters by time as if every step had a separate layer.
- **C:** Time and hidden-feature axes have different meanings.
- **D:** Shared parameters still act on a state influenced by earlier inputs.

**Source:** [simple].

</details>

<a id="aix002"></a>
### AIX002 — Ordered state trace

What does this fresh Python script print?

```python
h=0
out=[]
for x in [1,2,3]:
    h=2*h+x
    out.append(h)
print(out)
```

A. [1, 4, 11]

B. [1, 2, 3]

C. [3, 8, 17]

D. [1, 3, 6]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [1, 4, 11]**

Each iteration doubles the old state before adding the new input: 1, then 4, then 11.

**Why the other choices fail:**

- **B:** This discards the recurrent term.
- **C:** This is the trace for the reversed input, not the given order.
- **D:** This uses coefficient 1 instead of 2 on the old state.

**Source:** [rnn].

</details>

<a id="aix003"></a>
### AIX003 — Gradient of a shared recurrent weight

In TensorFlow eager mode, what are the final state and derivative printed below?

```python
import tensorflow as tf
w=tf.Variable(2.)
with tf.GradientTape() as tape:
    h=tf.constant(0.)
    for x in [1.,2.,3.]:
        h=w*h+x
g=tape.gradient(h,w)
print(float(h),float(g))
```

A. 11.0 4.0

B. 11.0 1.0

C. 11.0 11.0

D. 11.0 6.0

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 11.0 6.0**

Unrolling gives h₃=w²+2w+3, so dh₃/dw=2w+2=6 at w=2. Contributions through earlier uses of the shared variable matter.

**Why the other choices fail:**

- **A:** This omits one dependency through the earlier state.
- **B:** There is more than the direct last-step dependence.
- **C:** A derivative is not the forward value.

**Source:** [rnn].

</details>

<a id="aix004"></a>
### AIX004 — Clipping is not gradient restoration

On one explicitly isolated backpropagation path, every local derivative is 0.5 for 20 steps. What can gradient-norm clipping at 1 do to its already-small product?

A. The product is 2⁻²⁰; upper-bound clipping does not enlarge it.

B. The product is 10 because the derivatives add.

C. A small product proves the model cannot learn any parameter at any step.

D. Clipping changes the product to 1 automatically.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The product is 2⁻²⁰; upper-bound clipping does not enlarge it.**

Chain-rule factors multiply on this path. Clipping caps a large gradient norm; it does not rescale every smaller gradient upward.

**Why the other choices fail:**

- **B:** Adding applies to separate path contributions, not serial derivatives on one path.
- **C:** Other paths and shorter dependencies can still supply gradients.
- **D:** The stated upper clipping threshold is not a minimum norm.

**Source:** [original-lstm].

</details>

<a id="aix005"></a>
### AIX005 — Full sequence plus final state

What does the following TensorFlow/Keras code print?

```python
import tensorflow as tf
r=tf.keras.layers.SimpleRNN(4,return_sequences=True,return_state=True)
y,h=r(tf.zeros([2,5,3]))
print(y.shape.as_list(),h.shape.as_list(),r.count_params())
```

A. [2, 5, 4] [2, 4] 32

B. [2, 5, 3] [2, 4] 32

C. [2, 4] [2, 5, 4] 32

D. [2, 5, 4] [2, 4] 160

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [2, 5, 4] [2, 4] 32**

return_sequences preserves the time axis; return_state adds the final state. Parameter count is 4(3+4+1)=32.

**Why the other choices fail:**

- **B:** Output feature width is units=4, not input width 3.
- **C:** The sequence and final-state outputs are reversed.
- **D:** Time steps do not duplicate the weights.

**Source:** [simple].

</details>

<a id="aix006"></a>
### AIX006 — Stateful calls and explicit reset

The code uses a linear one-unit state h←x+h. What is printed?

```python
import tensorflow as tf
r=tf.keras.layers.SimpleRNN(1,activation="linear",use_bias=False,
    kernel_initializer="ones",recurrent_initializer="ones",stateful=True)
a=float(r(tf.constant([[[1.]]]))[0,0])
b=float(r(tf.constant([[[2.]]]))[0,0])
r.reset_states()
c=float(r(tf.constant([[[2.]]]))[0,0])
print(a,b,c)
```

A. 1.0 1.0 1.0

B. 1.0 3.0 5.0

C. 1.0 2.0 2.0

D. 1.0 3.0 2.0

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1.0 3.0 2.0**

The second call starts from the retained state 1 and adds 2. reset_states clears that memory before the third call.

**Why the other choices fail:**

- **A:** Weights, input values and state are different quantities.
- **B:** The reset means the third call does not keep state 3.
- **C:** This ignores stateful=True on the second call.

**Source:** [rnn].

</details>

<a id="aix007"></a>
### AIX007 — A zero input can still change state

Compare processing two steps [1,0] with and without an explicit mask on the second step. What is printed?

```python
import tensorflow as tf
r=tf.keras.layers.SimpleRNN(1,activation="linear",kernel_initializer="ones",
    recurrent_initializer="ones",bias_initializer="ones")
x=tf.constant([[[1.],[0.]]])
a=float(r(x)[0,0])
b=float(r(x,mask=tf.constant([[True,False]]))[0,0])
print(a,b)
```

A. 2.0 2.0

B. 3.0 0.0

C. 3.0 2.0

D. 2.0 3.0

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 3.0 2.0**

Without masking, h₁=1+0+1=2 and h₂=0+2+1=3. Masking the second step retains h₁=2.

**Why the other choices fail:**

- **A:** A zero input does not suppress the bias or recurrent calculation.
- **B:** Ignoring a step retains state rather than replacing it with zero.
- **D:** The masked and unmasked results are reversed.

**Source:** [mask].

</details>

<a id="aix008"></a>
### AIX008 — Carried state with truncated gradients

Training carries an RNN’s numerical state between chunks but deliberately stops the gradient at each chunk boundary. Which statement holds?

A. Stopping a gradient sets the forward state value to zero.

B. The recurrent parameters must be different in every chunk.

C. Carrying state automatically rebuilds the complete BPTT graph.

D. Later predictions can use carried information, while gradient credit does not cross the cut boundary.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Later predictions can use carried information, while gradient credit does not cross the cut boundary.**

A numerical value can be available for forward computation without a differentiable connection to its earlier creation.

**Why the other choices fail:**

- **A:** A stop-gradient cuts derivatives, not forward values.
- **B:** The same shared parameters can be trained in successive chunks.
- **C:** State values and recorded computation graphs are separate.

**Source:** [rnn].

</details>

<a id="aix009"></a>
### AIX009 — Bidirectional forecasting leak

A bidirectional RNN predicts a label at time t using a window containing measured inputs after t. Deployment requires a prediction at t before those future measurements arrive. What is wrong?

A. Evaluation gave the model future information unavailable at that deployment decision.

B. Weight sharing prevents any use of future measurements.

C. Changing only return_sequences=False guarantees causality.

D. All bidirectional models are invalid even for complete-sentence labeling.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Evaluation gave the model future information unavailable at that deployment decision.**

A backward branch can convey later inputs into the representation at t. Validity depends on what is available at prediction time.

**Why the other choices fail:**

- **B:** Shared weights do not restrict which time positions are observed.
- **C:** Output shape does not remove a future-dependent input path.
- **D:** Completed-input tasks may legitimately use both directions.

**Source:** [bidir].

</details>

<a id="aix010"></a>
### AIX010 — Teacher forcing versus generation

A decoder sees the true previous token during teacher-forced training but its own previous prediction during generation. What is the relevant difference?

A. Teacher forcing guarantees error-free generation.

B. A wrong generated token can change later inputs; training and inference histories differ.

C. The true next token must also be supplied during ordinary generation.

D. The training target is the model’s hidden state rather than the desired token.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A wrong generated token can change later inputs; training and inference histories differ.**

The decoder learns conditional predictions with a supplied history. At generation, its imperfect outputs become part of that history.

**Why the other choices fail:**

- **A:** Supervised histories do not guarantee identical free-running behavior.
- **C:** The desired future output is unknown during generation.
- **D:** Hidden state is internal; the target normally encodes the desired output token.

**Source:** [seqbook].

</details>

<a id="aix011"></a>
### AIX011 — Cell state can survive a hidden output

In the modern LSTM equations, f=1,i=0,o=0 and c_previous=3 are supplied idealized gate values. What follows?

A. c=3 and h=0; retained memory need not be visible in the current output.

B. c=3 and h=3 because memory equals output.

C. c=0 and h=0 because output is closed.

D. c=0 and h=3 because input is closed.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — c=3 and h=0; retained memory need not be visible in the current output.**

c=f×c_previous+i×candidate retains 3. h=o×tanh(c) is zero. The output gate does not directly erase c.

**Why the other choices fail:**

- **B:** Hidden output applies tanh and the output gate.
- **C:** The output gate is not the forget gate.
- **D:** Closing the input stops new writing, not old retention.

**Source:** [lstmcode].

</details>

<a id="aix012"></a>
### AIX012 — Numerical cell and hidden update

Given c_previous=2,f=0.5,i=0.25,g=−0.8,o=0.5, what are c and h approximately?

A. c=−0.2,h=−0.0987.

B. c=0.8,h=0.4.

C. c=0.8,h=0.3320.

D. c=1.2,h=0.4168.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — c=0.8,h=0.3320.**

c=0.5×2+0.25×(−0.8)=0.8. h=0.5×tanh(0.8)≈0.3320.

**Why the other choices fail:**

- **A:** This omits retained old memory.
- **B:** This omits the tanh on the cell value.
- **D:** The candidate contribution is negative, not positive.

**Source:** [lstmcode].

</details>

<a id="aix013"></a>
### AIX013 — Three gates, four transforms

Why does a standard biased LSTM use 4u(d+u+1) parameters even though it names three sigmoid gates?

A. The cell state stores a fourth independent trainable copy of all weights.

B. The fourth transform is always a softmax classifier.

C. The time dimension contributes exactly one extra matrix.

D. It also learns an affine transform for the candidate content, commonly followed by tanh.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — It also learns an affine transform for the candidate content, commonly followed by tanh.**

Input, forget, output and candidate each need input/recurrent transforms and biases. The candidate is not another sigmoid gate.

**Why the other choices fail:**

- **A:** Runtime state values are not additional parameter matrices.
- **B:** A classifier head is optional and excluded from this count.
- **C:** Step count does not explain the fourth transform.

**Source:** [lstmcode].

</details>

<a id="aix014"></a>
### AIX014 — Direct cell gradient versus full derivative

Treat f,i,g as externally fixed at one step. For c=f*c_previous+i*g, what is the direct derivative with respect to c_previous?

A. o*tanh(c) because the state equals the output.

B. f proves the full recurrent derivative has no other terms.

C. 1 regardless of f.

D. f; this isolated result is not a guarantee about every path in a full LSTM.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — f; this isolated result is not a guarantee about every path in a full LSTM.**

The direct linear retention term has derivative f. In a full network gate/candidate values and other states can introduce additional dependencies.

**Why the other choices fail:**

- **A:** That expression defines h, not the derivative of c.
- **B:** Holding gates fixed is a stated local simplification.
- **C:** A partially closed forget gate reduces this direct factor.

**Source:** [lstmcode].

</details>

<a id="aix015"></a>
### AIX015 — Retaining a tiny derivative product

Along only the direct cell path, every supplied forget value is 0.9 for 100 steps. The product is about 2.66×10⁻⁵. What does this illustrate?

A. Even moderately high retention can yield a small long-range product; LSTM does not guarantee nonvanishing gradients.

B. LSTM forget values are always exactly 1 after training.

C. The product describes the total derivative of every possible path.

D. Any positive forget gate guarantees the product stays 1.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Even moderately high retention can yield a small long-range product; LSTM does not guarantee nonvanishing gradients.**

The isolated product is 0.9¹⁰⁰. LSTM provides a controllable additive route, not a universal perfect-memory theorem.

**Why the other choices fail:**

- **B:** Sigmoid gates are learned and input-dependent.
- **C:** Other derivative paths were explicitly excluded.
- **D:** Repeated factors below 1 can decay.

**Source:** [original-lstm].

</details>

<a id="aix016"></a>
### AIX016 — Returned LSTM outputs are not four gates

What shapes and parameter count are printed?

```python
import tensorflow as tf
r=tf.keras.layers.LSTM(4,return_sequences=True,return_state=True)
y,h,c=r(tf.zeros([2,5,3]))
print(y.shape.as_list(),h.shape.as_list(),c.shape.as_list(),r.count_params())
```

A. [2, 5, 4] [2, 4] [2, 4] 640

B. [2, 5, 4] [2, 4] [2, 4] 128

C. [2, 4] [2, 4] [2, 4] 32

D. [2, 5, 4] [2, 5, 4] [2, 5, 4] 128

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [2, 5, 4] [2, 4] [2, 4] 128**

The outputs are the full sequence of h values plus final h and final c. Count 4×4×(3+4+1)=128.

**Why the other choices fail:**

- **A:** Sequence length does not multiply parameters.
- **C:** return_sequences preserves time; an LSTM has four transforms.
- **D:** return_state supplies final states, not their full time histories.

**Source:** [lstm].

</details>

<a id="aix017"></a>
### AIX017 — All-zero weights with a nonzero cell

With these explicit initializers and initial states, what is printed?

```python
import tensorflow as tf
r=tf.keras.layers.LSTM(1,kernel_initializer="zeros",recurrent_initializer="zeros",
    bias_initializer="zeros",unit_forget_bias=False,return_state=True)
y,h,c=r(tf.zeros([1,1,1]),initial_state=[tf.zeros([1,1]),tf.ones([1,1])])
print(round(float(c[0,0]),6),round(float(h[0,0]),6))
```

A. 0.0 0.0

B. 1.0 0.761594

C. 0.5 0.5

D. 0.5 0.231059

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 0.5 0.231059**

All gate preactivations are 0, so f=i=o=0.5; candidate=0. c=0.5×1=0.5 and h=0.5×tanh(0.5)≈0.231059.

**Why the other choices fail:**

- **A:** Zero kernels do not remove the supplied cell state before the forget gate acts.
- **B:** Sigmoid(0) is 0.5, not 1.
- **C:** The hidden state applies tanh and the output gate.

**Source:** [lstmcode].

</details>

<a id="aix018"></a>
### AIX018 — Forget bias is a starting preference

Keras LSTM uses unit_forget_bias=True. What does that setting normally do?

A. Permanently sets every forget-gate output to 1.

B. Initializes the forget-gate bias with an added 1; the gate remains learned and input-dependent.

C. Adds 1 to the cell state at every step.

D. Removes the forget gate from backpropagation.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Initializes the forget-gate bias with an added 1; the gate remains learned and input-dependent.**

A bias affects the gate preactivation. For otherwise zero preactivation, sigmoid(1)≈0.731 rather than exactly 1.

**Why the other choices fail:**

- **A:** A finite sigmoid input is not an exact forced-open gate.
- **C:** Bias addition occurs in the gate calculation, not as an unconditional cell increment.
- **D:** The gate parameters remain trainable under ordinary settings.

**Source:** [lstmcode].

</details>

<a id="aix019"></a>
### AIX019 — Recurrent stack needs a time axis

An LSTM returns only its last output with shape(B,8). That tensor is passed directly to a second ordinary LSTM expecting(B,T,features). What repair preserves the intended stepwise stack?

A. Set the first layer stateful=True and leave its output rank unchanged.

B. Make the first LSTM return_sequences=True.

C. Only set return_state=True on the first layer.

D. Increase the first units value toT.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Make the first LSTM return_sequences=True.**

The second recurrent layer needs a sequence, so preserve the first layer’s time axis. Its feature width becomes 8.

**Why the other choices fail:**

- **A:** Cross-call state retention does not repair an incompatible tensor rank.
- **C:** A list of final states is not the full sequence tensor.
- **D:** Width does not create a time dimension.

**Source:** [rnn].

</details>

<a id="aix020"></a>
### AIX020 — LSTM is not tied to classification

Which configuration fits a real-valued next-sample forecast from an LSTM representation?

A. The presence of sigmoid gates requires binary cross-entropy on all targets.

B. A suitable real-valued output head and regression loss; the recurrent cell does not force a class task.

C. Every LSTM output must use a vocabulary softmax.

D. The cell state itself is always a calibrated class probability.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A suitable real-valued output head and regression loss; the recurrent cell does not force a class task.**

Internal gates govern memory. A separate head and target contract determine the prediction task and loss.

**Why the other choices fail:**

- **A:** Gate activations do not dictate the supervised target type.
- **C:** Softmax is appropriate for selected class tasks, not all sequence problems.
- **D:** Cell values are memory coordinates, not inherently probabilities.

**Source:** [forecast].

</details>

<a id="aix021"></a>
### AIX021 — Update-gate convention

Use h=z*h_previous+(1−z)*g. At z=1, what happens?

A. h equals the previous state; candidate content is ignored in that update.

B. The meaning is impossible to determine even with the equation.

C. h equals g because update always means overwrite.

D. h becomes 0 regardless of the previous state.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — h equals the previous state; candidate content is ignored in that update.**

Substitute z=1 into the supplied expression. Another source can name 1−z its update gate, so the equation decides the direction.

**Why the other choices fail:**

- **B:** An explicit formula removes the naming ambiguity.
- **C:** That interpretation applies to the complementary convention.
- **D:** There is a retained old-state term.

**Source:** [cho].

</details>

<a id="aix022"></a>
### AIX022 — Numerical gated interpolation

What does this fresh Python script print?

```python
old=2.0
z=0.75
candidate=-0.4
print(round(z*old+(1-z)*candidate,6))
```

A. -0.4

B. 0.2

C. 1.5

D. 1.4

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1.4**

The retained contribution is 0.75×2=1.5; the new contribution is 0.25×(−0.4)=−0.1; sum 1.4.

**Why the other choices fail:**

- **A:** This drops the retained contribution.
- **B:** This reverses the z and 1−z coefficients.
- **C:** This drops the candidate contribution.

**Source:** [cho].

</details>

<a id="aix023"></a>
### AIX023 — Reset does not necessarily erase final state

A GRU candidate drops its old-state contribution when r=0. Under h=z*h_previous+(1−z)*g, can h still depend on old state?

A. Only if a separate LSTM cell state is also present.

B. No; reset always clears the final state and every dependency.

C. Yes, through the retained z*h_previous term and possibly through gate computations.

D. No; the update gate is applied before any old value can be read.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Yes, through the retained z*h_previous term and possibly through gate computations.**

The reset gate changes candidate construction. The final interpolation and gate dependencies are separate paths.

**Why the other choices fail:**

- **A:** A GRU does not require a separate c state.
- **B:** Clearing one path does not erase every path.
- **D:** The stated formula explicitly includes old state.

**Source:** [cho].

</details>

<a id="aix024"></a>
### AIX024 — Reset before or after a matrix

Use row-vector multiplication. Compare (h⊙r)U against (hU)⊙r for the given arrays. What is printed?

```python
h=[1.,1.];r=[0.,1.];U=[[1.,2.],[3.,4.]]
def mul(v): return [sum(v[i]*U[i][j] for i in range(2)) for j in range(2)]
before=mul([h[i]*r[i] for i in range(2)])
after=[v*r[j] for j,v in enumerate(mul(h))]
print(before,after)
```

A. [0.0, 6.0] [0.0, 6.0]

B. [3.0, 4.0] [0.0, 6.0]

C. [0.0, 6.0] [3.0, 4.0]

D. [3.0, 4.0] [3.0, 4.0]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [3.0, 4.0] [0.0, 6.0]**

The first expression zeroes h’s first coordinate before mixing. The second mixes both coordinates first, then zeroes the first result. Matrix mixing and elementwise gating need not commute.

**Why the other choices fail:**

- **A:** This treats a pre-mixing gate as though it acted on output coordinates.
- **C:** This reverses which operation is performed first.
- **D:** This treats a post-mixing gate as though it acted on the original coordinates.

**Source:** [grucode].

</details>

<a id="aix025"></a>
### AIX025 — Bias layout changes parameter count

What does this TensorFlow/Keras code print?

```python
import tensorflow as tf
a=tf.keras.layers.GRU(4,reset_after=False)
b=tf.keras.layers.GRU(4,reset_after=True)
a(tf.zeros([2,5,3]));b(tf.zeros([2,5,3]))
print(a.count_params(),b.count_params())
```

A. 128 108

B. 96 96

C. 108 96

D. 96 108

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 96 108**

With d=3,u=4 there are 3u(d+u)=84 matrix parameters. reset_before adds 12 biases; reset_after adds 24.

**Why the other choices fail:**

- **A:** 128 is the standard LSTM count, with four transforms.
- **B:** The reset-after implementation has two bias vectors per packed gate group.
- **C:** The single/double bias assignments are reversed.

**Source:** [gru].

</details>

<a id="aix026"></a>
### AIX026 — A GRU returns one state

What does the code print?

```python
import tensorflow as tf
r=tf.keras.layers.GRU(4,return_sequences=True,return_state=True)
values=r(tf.zeros([2,5,3]))
y,h=values
print(y.shape.as_list(),h.shape.as_list(),len(values))
```

A. [2, 4] [2, 4] 2

B. [2, 5, 4] [2, 4] 3

C. [2, 5, 4] [2, 4] 2

D. [2, 5, 4] [2, 5, 4] 2

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [2, 5, 4] [2, 4] 2**

The list contains full output sequence and final h. Standard GRU has no separate LSTM-style cell state.

**Why the other choices fail:**

- **A:** return_sequences=True retains all time positions in y.
- **B:** An LSTM would return output plus h and c.
- **D:** return_state returns the last state, not every step’s state.

**Source:** [gru].

</details>

<a id="aix027"></a>
### AIX027 — Fewer transforms is not an accuracy theorem

Both standard layers use input width 3 and hidden width 4. Which GRU/LSTM comparison is justified?

A. Fewer gates means GRU cannot retain information over many steps.

B. LSTM always trains faster because it has more gates.

C. The usual GRU has fewer affine transforms and parameters; which predicts better requires evaluation.

D. GRU always achieves higher accuracy because it is smaller.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The usual GRU has fewer affine transforms and parameters; which predicts better requires evaluation.**

GRU usually uses three transform groups versus LSTM’s four. Parameter count alone cannot determine runtime or generalization on every task.

**Why the other choices fail:**

- **A:** The update path can retain information.
- **B:** Hardware and workload affect time; adding gates does not prove speed.
- **D:** Smaller size is not an accuracy guarantee.

**Source:** [gru].

</details>

<a id="aix028"></a>
### AIX028 — Gate values are not extra learned vectors per time

A GRU has fixed learned gate matrices, but zₜ varies over a sentence. Why?

A. A shared parameter forces its activation output to be constant.

B. Gate outputs are computed from current input and old state, using shared parameters.

C. The optimizer must create a new matrix at every inference step.

D. zₜ is a dataset label supplied with each word.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Gate outputs are computed from current input and old state, using shared parameters.**

Parameters define a function. Different inputs/states can produce different gate values without any inference-time parameter update.

**Why the other choices fail:**

- **A:** A fixed function need not return the same result for different arguments.
- **C:** Inference generally reuses the existing matrices.
- **D:** Gate values are internal computed activations.

**Source:** [cho].

</details>

<a id="aix029"></a>
### AIX029 — Where the target comes from

A plain autoencoder is trained without class labels. Which loss contract still applies?

A. Its target must be the next unrelated training example.

B. Compare the reconstruction with the input-derived target; absence of class labels does not mean absence of targets.

C. Always compare its latent code with an externally supplied class ID.

D. There is no loss because the task is unsupervised.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Compare the reconstruction with the input-derived target; absence of class labels does not mean absence of targets.**

The reconstruction objective supplies supervision from the data itself. Class labels are not required for this objective.

**Why the other choices fail:**

- **A:** An unrelated target does not define ordinary self-reconstruction.
- **C:** A class target would define an additional/different task.
- **D:** Reconstruction gives a numerical training signal.

**Source:** [ae].

</details>

<a id="aix030"></a>
### AIX030 — Undercomplete does not promise losslessness

An AE maps 100 real-valued features into a 10-dimensional code. Which claim is safest?

A. It cannot reconstruct any input because the decoder has fewer inputs.

B. A 10-dimensional bottleneck implies its latent coordinates are the first 10 raw features.

C. It is guaranteed to recover every possible 100-dimensional input exactly.

D. It constrains the representation; exact reconstruction of arbitrary 100-dimensional data is not guaranteed.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — It constrains the representation; exact reconstruction of arbitrary 100-dimensional data is not guaranteed.**

A bottleneck can exploit lower-dimensional structure, but arbitrary information cannot simply be assumed to survive. A learned decoder can expand a code into a larger vector.

**Why the other choices fail:**

- **A:** Expansion in output dimension is possible even when complete information recovery is not.
- **B:** The encoder learns a transform, not necessarily coordinate selection.
- **C:** A dimension limit is not a universal lossless guarantee.

**Source:** [aebook].

</details>

<a id="aix031"></a>
### AIX031 — Overcomplete identity trap

An unconstrained high-capacity AE has a latent code wider than its input and very low training reconstruction error. What has not been established?

A. That it learned useful transferable structure instead of an identity-like mapping.

B. That backpropagation can optimize reconstruction loss.

C. That its decoder output can have the same dimension as its input.

D. That the training error was low, as already stated.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — That it learned useful transferable structure instead of an identity-like mapping.**

Capacity to copy can minimize reconstruction without learning the desired representation. Constraints and held-out/downstream evaluation matter.

**Why the other choices fail:**

- **B:** Reconstruction is a differentiable training objective under ordinary choices.
- **C:** Matching output shape is compatible with an AE.
- **D:** The reported training error is a premise, not the unresolved claim.

**Source:** [aebook].

</details>

<a id="aix032"></a>
### AIX032 — Denoising input and target

You have clean data x and corrupted copies x̃. Which pairing trains a denoising AE?

A. Input noise alone, target arbitrary class IDs.

B. Input x̃, target x̃.

C. Input x, target x̃.

D. Input x̃, target x.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Input x̃, target x.**

Training asks the network to remove the corruption. Clean targets define the desired reconstruction.

**Why the other choices fail:**

- **A:** That is a different task and loses the intended correspondence.
- **B:** That can reward copying the corruption.
- **C:** That teaches corruption rather than removing it.

**Source:** [denoise].

</details>

<a id="aix033"></a>
### AIX033 — Per-example reconstruction error

What does this TensorFlow code print?

```python
import tensorflow as tf
x=tf.constant([[0.,1.],[1.,1.]])
y=tf.constant([[1.,3.],[1.,1.]])
e=(y-x)**2
print(tf.reduce_mean(e,axis=1).numpy().tolist(),float(tf.reduce_mean(e)))
```

A. [1.25] 1.25

B. [2.5, 0.0] 1.25

C. [5.0, 0.0] 2.5

D. [1.0, 4.0] 2.5

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [2.5, 0.0] 1.25**

Squared errors are[[1,4],[0,0]]. Feature-wise means give[2.5,0]; the mean over all four entries is 1.25.

**Why the other choices fail:**

- **A:** A global mean discards the per-example scores.
- **C:** This uses sums despite reduce_mean.
- **D:** Those are one row’s squared errors, not one mean per example.

**Source:** [ae].

</details>

<a id="aix034"></a>
### AIX034 — Decoder range must fit targets

An AE reconstructs unscaled values that can be−3 or 20. Its final activation is sigmoid. What limitation follows?

A. Sigmoid automatically rescales the targets before computing loss.

B. A large hidden layer makes sigmoid output 20.

C. The output is restricted to (0,1) for finite logits, so those target values cannot be reconstructed exactly.

D. Using MSE removes the output activation’s range restriction.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The output is restricted to (0,1) for finite logits, so those target values cannot be reconstructed exactly.**

The decoder’s range is part of the model contract. Scale targets appropriately or use a suitable unrestricted output.

**Why the other choices fail:**

- **A:** Target preprocessing is a separate action.
- **B:** Capacity does not change the sigmoid range.
- **D:** Changing the loss does not change the prediction function’s range.

**Source:** [ae].

</details>

<a id="aix035"></a>
### AIX035 — Sparse is not necessarily narrow

An AE uses a latent vector wider than the input but penalizes latent activations. Which conclusion is valid?

A. Sparse activation penalties imply every weight matrix is sparse.

B. It can be a sparse overcomplete autoencoder; sparsity and dimensionality are different constraints.

C. Sparse always means fewer latent dimensions than input dimensions.

D. Overcomplete prevents adding any useful regularizer.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — It can be a sparse overcomplete autoencoder; sparsity and dimensionality are different constraints.**

A wide representation can still activate only a small subset for an example. Activation sparsity does not require a small coordinate count.

**Why the other choices fail:**

- **A:** Penalizing activations is not identical to penalizing weight support.
- **C:** The number of coordinates differs from their activity.
- **D:** Regularization is one way to make high capacity useful.

**Source:** [aebook].

</details>

<a id="aix036"></a>
### AIX036 — PCA equivalence needs assumptions

Centered data, rank-k linear encoder/decoder, squared reconstruction loss, global optimum. Which comparison with PCA is accurate?

A. Latent weights must equal one unique PCA basis.

B. The reconstructed principal subspace can agree, while latent axes/weights need not equal unique orthonormal PCA components.

C. A linear AE necessarily has perfect reconstruction for any k.

D. Every nonlinear AE with any loss is exactly PCA.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The reconstructed principal subspace can agree, while latent axes/weights need not equal unique orthonormal PCA components.**

Equivalent factorizations can span the same optimal subspace. The stated linear/squared-error assumptions are essential.

**Why the other choices fail:**

- **A:** Subspace agreement does not uniquely identify a coordinate basis.
- **C:** Rank reduction generally loses information outside the chosen subspace.
- **D:** Nonlinearity and a different objective change the problem.

**Source:** [aebook].

</details>

<a id="aix037"></a>
### AIX037 — A VAE samples while keeping a gradient route

A VAE uses μ=1, log variance=ln 4 and sampled ε=−0.5. Under z=μ+exp(0.5*logvar)*ε, what does this code print?

```python
import math
mu=1.;logvar=math.log(4.);eps=-0.5
z=mu+math.exp(0.5*logvar)*eps
print(round(z,6))
```

A. 1.0

B. 0.0

C. 0.5

D. -1.0

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 0.0**

Variance is 4, so standard deviation is 2. z=1+2×(−0.5)=0. Reparameterization places randomness in ε while μ and scale remain differentiable functions.

**Why the other choices fail:**

- **A:** This omits the random contribution entirely.
- **C:** This omits the standard-deviation multiplier.
- **D:** This uses variance 4 as though it were standard deviation.

**Source:** [vae].

</details>

<a id="aix038"></a>
### AIX038 — KL zero and reconstruction quality

For a standard VAE objective, q(z|x) equals the chosen prior for an example, so its KL term is 0. What is established?

A. Only that this KL term vanishes; the reconstruction term can still be large.

B. The latent code must retain all class-relevant information.

C. The input must be reconstructed perfectly.

D. Every loss term must be negative because it is an ELBO.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Only that this KL term vanishes; the reconstruction term can still be large.**

The minimized negative-ELBO has distinct reconstruction and KL terms. Prior matching alone does not guarantee informative latents or a good decoder.

**Why the other choices fail:**

- **B:** The posterior can ignore input information.
- **C:** The decoder likelihood can still fit poorly.
- **D:** Sign depends on the stated objective; the usual KL is nonnegative.

**Source:** [vaeexample].

</details>

<a id="aix039"></a>
### AIX039 — Small AE parameter count

What does the TensorFlow/Keras code print?

```python
import tensorflow as tf
e=tf.keras.layers.Dense(2)
d=tf.keras.layers.Dense(4)
z=e(tf.zeros([3,4]));out=d(z)
print(z.shape.as_list(),out.shape.as_list(),e.count_params()+d.count_params())
```

A. [3, 2] [3, 4] 66

B. [3, 4] [3, 2] 22

C. [3, 2] [3, 4] 16

D. [3, 2] [3, 4] 22

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [3, 2] [3, 4] 22**

Encoder 4→2 has 8 weights+2 biases=10. Decoder 2→4 has 8+4=12. Total 22, reused across all three examples.

**Why the other choices fail:**

- **A:** Batch size does not multiply learned parameter count.
- **B:** Encoder and reconstruction feature widths are reversed.
- **C:** This counts only matrix entries and omits biases.

**Source:** [ae].

</details>

<a id="aix040"></a>
### AIX040 — Threshold direction and uncertainty

An anomaly detector flags an example when reconstruction error > threshold. Raising the threshold on fixed scores does what?

A. Guarantees every unflagged example is normal.

B. Cannot increase the flagged set; high error still is not proof of an anomaly.

C. Must increase recall of true anomalies.

D. Makes every reconstructed input a calibrated probability.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Cannot increase the flagged set; high error still is not proof of an anomaly.**

A larger cutoff makes flagging harder. Reconstruction behavior depends on training coverage, capacity and data; some anomalies reconstruct well and some normal cases reconstruct poorly.

**Why the other choices fail:**

- **A:** Low error can also occur for anomalies.
- **C:** The set of detected true anomalies cannot grow on fixed scores.
- **D:** Error is a score, not automatically a probability.

**Source:** [ae].

</details>

<!-- AI-EXTRA-MCQ-END -->

## 8. Targeted sources

Primary sources checked on 9 October 2026. Read the guide/API pages first; the papers supply provenance and equations, not a requirement to read each paper in full.

| Source | Most useful part |
|---|---|
| [TensorFlow RNN guide][rnn], [masking guide][mask], [forecasting guide][forecast] | Shapes, state handling, padding and chronological split/forecast contracts. |
| [SimpleRNN][simple], [LSTM][lstm], [GRU][gru], [Bidirectional][bidir] APIs | Exact return values, defaults and constraints. |
| [Versioned LSTM][lstmcode] and [GRU][grucode] source | Gate packing, state updates and bias layout for the executed Keras baseline. |
| [Deep Learning, chapter 10][seqbook] | BPTT, teacher forcing, long-term gradient problems and clipping. |
| [Hochreiter & Schmidhuber (1997)][original-lstm] | Original LSTM motivation; the modern forget-gate form is a later variant. |
| [Cho et al. (2014), §2.3][cho] | GRU reset/update equations and encoder-decoder task. |
| [TensorFlow autoencoders][ae] and [Deep Learning, chapter 14][aebook] | Reconstruction, denoising, anomaly scoring, capacity, sparsity and linear-AE/PCA distinction. |
| [Vincent et al. (2010)][denoise] | Why corrupted inputs paired with clean targets learn denoising features. |
| [Kingma & Welling (2013/2014)][vae], [Keras VAE example][vaeexample] | Reparameterization and the reconstruction/KL objective. |

## 9. Validation

Verified on **9 October 2026**: all 40 question structures and 120 wrong-option explanations passed; all four standalone Python and ten TensorFlow examples matched their answers using TensorFlow CPU **2.16.1** and Keras **3.15.1**. Closed-form calculations for recurrent gradients, gates, parameter counts, losses and VAE scale also passed.

Run `python3 AI/validation/check_sequence_autoencoder.py` for structure, four standalone Python calculations and numerical checks. Supply `--tf-python /path/to/tensorflow-env/bin/python` to execute the ten TensorFlow examples. The checker reads code directly from this Markdown. Numerical/runtime checks do not mechanically prove all explanatory claims.

[seqbook]: https://www.deeplearningbook.org/contents/rnn
[rnn]: https://www.tensorflow.org/guide/keras/working_with_rnns
[simple]: https://keras.io/api/layers/recurrent_layers/simple_rnn/
[lstm]: https://keras.io/api/layers/recurrent_layers/lstm/
[gru]: https://keras.io/api/layers/recurrent_layers/gru/
[bidir]: https://keras.io/api/layers/recurrent_layers/bidirectional/
[mask]: https://www.tensorflow.org/guide/keras/understanding_masking_and_padding
[forecast]: https://www.tensorflow.org/tutorials/structured_data/time_series
[lstmcode]: https://github.com/keras-team/keras/blob/v3.15.1/keras/src/layers/rnn/lstm.py
[grucode]: https://github.com/keras-team/keras/blob/v3.15.1/keras/src/layers/rnn/gru.py
[original-lstm]: https://www.bioinf.jku.at/publications/older/2604.pdf
[cho]: https://arxiv.org/abs/1406.1078
[ae]: https://www.tensorflow.org/tutorials/generative/autoencoder
[aebook]: https://www.deeplearningbook.org/contents/autoencoders.html
[denoise]: https://www.jmlr.org/papers/v11/vincent10a.html
[vae]: https://arxiv.org/abs/1312.6114
[vaeexample]: https://keras.io/examples/generative/vae/
