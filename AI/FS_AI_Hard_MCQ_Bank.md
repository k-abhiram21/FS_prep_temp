# Artificial Intelligence: 70 hard MCQs

**For the 9 October 2026 FS screening test.** Original practice, prepared 8 October. One best answer per question. These are study selections, not predicted exam questions. Read the hidden explanations to learn the rule and the closest traps.

[All compact banks and coverage audit](../FS_Remaining_Subjects_Learning_Map.md)

## How to use

Work in blocks of 10–15. First choose an answer without opening the explanation; then explain why the other choices fail. For code, record each state change before guessing. The four mixed sets below use every question once: three sets of 20 and one of 10. Set sizes are for revision, not exam subject weights.

**Assumptions:** losses and averaging conventions are stated; logarithms in cross-entropy are natural. Positive class is class1, and matrix axes are stated. TensorFlow code uses 2.16.1, `tf.keras`, eager mode, CPU, and fresh state per block; default floating tensors are float32. Random initialization is replaced by fixed initializers where exact outputs matter. The bank focuses on the four announced topics, not CNN/RNN architecture extras.

## Coverage

| Topic | Questions |
|---|---|
| Regression, fitting and generalization | [AI001](#ai001)–[AI014](#ai014) (14) |
| Classification, losses and evaluation | [AI015](#ai015)–[AI030](#ai030) (16) |
| ANN forward passes, gradients and training behavior | [AI031](#ai031)–[AI046](#ai046) (16) |
| TensorFlow and Keras code contracts | [AI047](#ai047)–[AI070](#ai070) (24) |

## Mixed revision sets

**Set 1:** [AI027](#ai027), [AI029](#ai029), [AI011](#ai011), [AI042](#ai042), [AI012](#ai012), [AI055](#ai055), [AI024](#ai024), [AI003](#ai003), [AI060](#ai060), [AI001](#ai001), [AI039](#ai039), [AI007](#ai007), [AI038](#ai038), [AI004](#ai004), [AI017](#ai017), [AI031](#ai031), [AI025](#ai025), [AI052](#ai052), [AI056](#ai056), [AI054](#ai054).

**Set 2:** [AI014](#ai014), [AI006](#ai006), [AI009](#ai009), [AI053](#ai053), [AI062](#ai062), [AI020](#ai020), [AI044](#ai044), [AI010](#ai010), [AI061](#ai061), [AI063](#ai063), [AI041](#ai041), [AI049](#ai049), [AI036](#ai036), [AI069](#ai069), [AI059](#ai059), [AI021](#ai021), [AI065](#ai065), [AI040](#ai040), [AI019](#ai019), [AI005](#ai005).

**Set 3:** [AI018](#ai018), [AI058](#ai058), [AI070](#ai070), [AI067](#ai067), [AI030](#ai030), [AI035](#ai035), [AI051](#ai051), [AI034](#ai034), [AI046](#ai046), [AI033](#ai033), [AI048](#ai048), [AI045](#ai045), [AI015](#ai015), [AI032](#ai032), [AI002](#ai002), [AI026](#ai026), [AI008](#ai008), [AI023](#ai023), [AI047](#ai047), [AI043](#ai043).

**Set 4:** [AI066](#ai066), [AI013](#ai013), [AI057](#ai057), [AI050](#ai050), [AI022](#ai022), [AI064](#ai064), [AI037](#ai037), [AI016](#ai016), [AI028](#ai028), [AI068](#ai068).


## Regression, fitting and generalization

<a id="ai001"></a>
### AI001 — Numerical labels are not automatically regression

Targets are IDs0,1,2 for three unordered product categories. A model predicts one category. What is the correct task description?

A. Binary classification because the encoding starts at0.

B. Regression with MSE necessarily represents the category relationships correctly.

C. Regression because all targets are integers.

D. Multiclass classification; numeric encoding does not make category distances meaningful.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Multiclass classification; numeric encoding does not make category distances meaningful.**

Task meaning determines regression versus classification. Label IDs stand for categories rather than a measured numerical quantity.

**Why the other choices fail:** Number of classes is three; arbitrary numeric IDs do not define an ordered metric space.

**Rule/source:** [Regression].

</details>

<a id="ai002"></a>
### AI002 — A model linear in its parameters

Model ŷ=w₀+w₁x+w₂x² is fitted by least squares. Which statement is accurate?

A. It must use a sigmoid to represent x².

B. It cannot be fitted with linear-regression methods because x² occurs.

C. It is a classifier because it has multiple weights.

D. It is linear in the learned parameters even though its curve is nonlinear in x.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — It is linear in the learned parameters even though its curve is nonlinear in x.**

Treat x and x² as features; the output is an affine combination of their coefficients. Linear-in-parameters and linear-in-original-input differ.

**Why the other choices fail:** Feature transformation does not by itself change the output task or require an activation.

**Rule/source:** [Regression].

</details>

<a id="ai003"></a>
### AI003 — MSE versus a half-MSE

Targets[1,3], predictions[2,5]. Define MSE=(1/n)Σ(ŷ−y)². What is the loss?

A. 2.5.

B. 5.

C. 1.25.

D. 1.5.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2.5.**

Errors are 1 and 2; squares sum to 5 and division by 2 gives 2.5.

**Why the other choices fail:** Five is the sum,1.25 uses an additional half, and 1.5 is MAE. Read the explicitly defined reduction.

**Rule/source:** [Regression].

</details>

<a id="ai004"></a>
### AI004 — Units of error metrics

A house-price target is in rupees. Which units apply to MSE and RMSE?

A. Both:unitless.

B. Both:rupees.

C. MSE:rupees²; RMSE:rupees.

D. MSE:rupees; RMSE:rupees².

<details>
<summary>Answer and reasoning</summary>

**Correct: C — MSE:rupees²; RMSE:rupees.**

Squaring the error squares its units; the final square root restores the original units.

**Why the other choices fail:** Normalization may change interpretation, but no normalization was specified.

**Rule/source:** [Regression].

</details>

<a id="ai005"></a>
### AI005 — Outlier impact

Nine predictions have error1; one has error10. What fraction of total squared error comes from the large error?

A. 100/109, about91.7%.

B. 1/10, exactly10%.

C. 10/109, about9.2%.

D. 10/19, about52.6%.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 100/109, about91.7%.**

Squared contributions are nine 1 s and one 100. MSE gives the same contribution fraction because its common averaging factor cancels.

**Why the other choices fail:** Counting examples or unsquared errors answers different questions.

**Rule/source:** [Regression].

</details>

<a id="ai006"></a>
### AI006 — Gradient with two examples

For ŷ=wx, x=[1,2], y=[2,4], w=0, loss=mean((wx−y)²). What is dL/dw?

A. 10.

B. −6.

C. −5.

D. −10.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — −10.**

dL/dw=(2/2)[(−2)×1+(−4)×2]=−10. Averaging and the derivative’s factor 2 both matter.

**Why the other choices fail:** A half-MSE would give−5; dropping feature multiplication or reversing error sign gives other values.

**Rule/source:** [Regression].

</details>

<a id="ai007"></a>
### AI007 — Simultaneous parameter updates

One sample x=2,y=1, w=b=0. Loss=(wx+b−y)² and learning rate0.1. Compute gradients at the old state and update w,b together. New values?

A. w=0.4,b=0.04.

B. w=0.2,b=0.1.

C. w=0.4,b=0.2.

D. w=−0.4,b=−0.2.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — w=0.4,b=0.2.**

Old error=−1, so gradients are 2×(−1)×2=−4 and 2×(−1)=−2. Subtracting 0.1 times each gives 0.4 and 0.2.

**Why the other choices fail:** Sequentially recomputing b’s gradient after changing w is a different update; the factor 2 and descent sign matter.

**Rule/source:** [Regression].

</details>

<a id="ai008"></a>
### AI008 — Too-large step

For L(w)=w² at w=1, learning rate1.1, plain gradient descent makes what change?

A. w becomes0 and loss falls to0.

B. w becomes−1.2 and loss rises from1 to1.44.

C. Loss must fall because the gradient was computed exactly.

D. w becomes1.2 and loss rises to1.44.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — w becomes−1.2 and loss rises from1 to1.44.**

Gradient=2. Update 1−1.1×2=−1.2 overshoots across the minimum; squared loss increases.

**Why the other choices fail:** A locally downhill direction does not guarantee improvement for an arbitrarily large finite step.

**Rule/source:** [Regression].

</details>

<a id="ai009"></a>
### AI009 — Scaling and optimization

A feature is measured in metres, then changed to millimetres. What is the strongest general claim?

A. Scaling alone guarantees improved test accuracy.

B. Equivalent predictions can require rescaled weights; optimizer conditioning and suitable learning rate may change.

C. Feature units cannot affect gradient magnitudes.

D. Every trained model must retain identical coefficient values.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Equivalent predictions can require rescaled weights; optimizer conditioning and suitable learning rate may change.**

Input scaling changes the parameterization and gradients. It can aid optimization without proving better generalization.

**Why the other choices fail:** Prediction equivalence is not coefficient equality, and optimization benefit is not a universal accuracy guarantee.

**Rule/source:** [Regression].

</details>

<a id="ai010"></a>
### AI010 — Leakage through preprocessing

A scaler’s mean and variance are fitted on train+test before the model is trained only on train. What is wrong?

A. The scaler must instead be fitted separately on every test example.

B. Scaling turns regression into classification.

C. Nothing; leakage needs access to test labels.

D. Test-distribution information influenced preprocessing; fit it using training data only.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Test-distribution information influenced preprocessing; fit it using training data only.**

Leakage can use feature information as well as labels. Apply the training-fitted transformation unchanged to validation/test data.

**Why the other choices fail:** Independent test refitting changes the representation contract and is not the normal remedy.

**Rule/source:** [Regression].

</details>

<a id="ai011"></a>
### AI011 — Validation is not an untouched test

A team picks the best of100 models using one test set and reports that set’s score as final. Which assessment fits?

A. The remedy is to choose the lowest-scoring model.

B. Choosing more candidates guarantees the score is more reliable.

C. It remains unbiased because fitting never saw test labels directly.

D. Repeated model selection makes that set a validation resource; a fresh held-out test is needed for final assessment.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Repeated model selection makes that set a validation resource; a fresh held-out test is needed for final assessment.**

Selection learns information from scores. Searching many candidates can overfit the evaluation set even without gradient training on it.

**Why the other choices fail:** Changing the selection direction does not restore independence; more trials can increase selection bias.

**Rule/source:** [Regression].

</details>

<a id="ai012"></a>
### AI012 — R² can be negative

On a held-out set, squared-error sum=12 and total squared deviation from that set’s target mean=4. R² is?

A. 3.

B. −2.

C. 0.75.

D. 0.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — −2.**

R²=1−SSE/SST=1−12/4=−2. The predictions are worse under this metric than that mean baseline.

**Why the other choices fail:** Held-out R² is not necessarily between 0 and 1. Do not clip it or invert the ratio.

**Rule/source:** [Regression].

</details>

<a id="ai013"></a>
### AI013 — Regularization changes objective

A fit minimizes mean squared error+λΣwᵢ² with λ>0 and bias excluded. What does increasing λ directly do?

A. It necessarily sets every weight exactly to zero.

B. It penalizes the bias even though it is excluded.

C. It increases the cost of large penalized weights; it need not improve validation loss.

D. It directly guarantees lower training MSE.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — It increases the cost of large penalized weights; it need not improve validation loss.**

L2 adds a smooth size penalty; fitting balances data loss and penalty. Generalization still depends on data and the chosen strength.

**Why the other choices fail:** Objective reduction is not the same as unpenalized error reduction. Exact sparsity is not L2’s general behavior.

**Rule/source:** [Regression].

</details>

<a id="ai014"></a>
### AI014 — Correlated inputs and identifiability

Two regression features are identical in every training example. Predictions depend on w₁+w₂. What follows?

A. The data uniquely determines each coefficient without an added constraint.

B. Different coefficient pairs with the same sum can give identical training predictions.

C. Classification loss is required to make the columns different.

D. Gradient descent cannot calculate any derivative.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Different coefficient pairs with the same sum can give identical training predictions.**

The duplicate columns create non-identifiability. A regularizer or constraint can select among equivalent representations.

**Why the other choices fail:** Gradients still exist; changing the loss type does not create missing independent information.

**Rule/source:** [Regression].

</details>

## Classification, losses and evaluation

<a id="ai015"></a>
### AI015 — Sigmoid and threshold

A binary model emits logit0; prediction is sigmoid(logit)≥0.5. What class and probability result?

A. Class1 with probability0.5.

B. Class1 with probability1.

C. Class0 with probability0.

D. Class0 with probability0.5.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Class1 with probability0.5.**

sigmoid(0)=1/(1+1)=0.5. The specified ≥ comparison assigns the boundary to 1.

**Why the other choices fail:** Class labels depend on the threshold’s equality rule; a zero logit is not a zero probability.

**Rule/source:** [Classification].

</details>

<a id="ai016"></a>
### AI016 — Changing the threshold

On fixed binary scores, raise the positive threshold from0.4 to0.8. What is guaranteed?

A. The predicted-positive set cannot grow; true positives and false positives cannot increase.

B. Accuracy must improve.

C. Recall must strictly increase.

D. Precision must strictly increase.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The predicted-positive set cannot grow; true positives and false positives cannot increase.**

The new positive set is a subset of the old set. Recall is nonincreasing when positives exist, while precision and accuracy have no monotonic guarantee.

**Why the other choices fail:** Ratios can behave differently from counts; no strict change is guaranteed if no score crosses the threshold.

**Rule/source:** [Classification].

</details>

<a id="ai017"></a>
### AI017 — Precision versus recall counts

Positive class counts:TP=30,FP=10,FN=20,TN=40. Precision and recall are?

A. 0.75 and0.80.

B. 0.70 and0.60.

C. 0.60 and0.75.

D. 0.75 and0.60.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 0.75 and0.60.**

Precision=TP/(TP+FP)=30/40; recall=TP/(TP+FN)=30/50.

**Why the other choices fail:** Accuracy is 70/100. Reversing denominators swaps what each metric asks.

**Rule/source:** [Classification].

</details>

<a id="ai018"></a>
### AI018 — Imbalanced accuracy

A dataset has990 negatives and10 positives. A model predicts negative for every case. What is accurate?

A. Accuracy99%, positive recall0%; accuracy alone hides failure on positives.

B. The model must be useful for detecting positives.

C. Recall99% because most labels are correct.

D. Precision99% and recall99%.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Accuracy99%, positive recall0%; accuracy alone hides failure on positives.**

TN=990,FN=10,TP=FP=0. No actual positive is found; positive precision has a zero denominator and needs an explicit convention.

**Why the other choices fail:** Accuracy is not recall, and an undefined precision ratio must not be casually called 99%.

**Rule/source:** [Classification].

</details>

<a id="ai019"></a>
### AI019 — F1 numerical case

Precision=1, recall=0.5. What is F1?

A. 0.75.

B. 0.5.

C. 1.5.

D. 2/3.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 2/3.**

F1=2 PR/(P+R)=1/1.5=2/3. It is the harmonic, not arithmetic, mean.

**Why the other choices fail:** F1 cannot exceed 1 for valid nonnegative precision/recall; the lower value is not itself the combined metric.

**Rule/source:** [Classification].

</details>

<a id="ai020"></a>
### AI020 — Confusion-matrix axes

Rows are actual classes[0,1], columns predicted[0,1]. Matrix is [[80,5],[15,20]]. Positive recall?

A. 20/25.

B. 80/85.

C. 20/35.

D. 100/120.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 20/35.**

Actual-positive row has FN15 andTP20, so recall 20/(15+20).

**Why the other choices fail:** 20/25 is precision,80/85 is specificity, and 100/120 is accuracy. Axis conventions must be read.

**Rule/source:** [Classification].

</details>

<a id="ai021"></a>
### AI021 — Independent labels need independent outputs

A photo can contain both cat and dog. Which output/loss pairing fits?

A. Two-class softmax forcing probabilities to sum to1.

B. A regression loss must be used because two outputs are needed.

C. One sigmoid because there are only two labels.

D. Two independent sigmoid outputs and binary cross-entropy per label.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Two independent sigmoid outputs and binary cross-entropy per label.**

This is multilabel classification: both labels can be present. Separate probabilities allow simultaneous positives.

**Why the other choices fail:** Softmax suits mutually exclusive classes; one sigmoid represents one binary target, not both independently.

**Rule/source:** [Classification].

</details>

<a id="ai022"></a>
### AI022 — Sparse versus one-hot targets

There are3 mutually exclusive classes. Targets are [2,0,1], one integer ID per example. Which common Keras loss fits?

A. SparseCategoricalCrossentropy with outputs having3 class scores per example.

B. BinaryCrossentropy with one scalar predicting all3 unordered categories.

C. CategoricalCrossentropy expecting those IDs as one-hot vectors.

D. MeanSquaredError is the only accepted loss.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — SparseCategoricalCrossentropy with outputs having3 class scores per example.**

Sparse categorical loss accepts integer class IDs. Categorical loss normally uses a per-class target distribution such as one-hot vectors.

**Why the other choices fail:** Sparse refers to target representation, not necessarily sparse input tensors or sparse weights.

**Rule/source:** [Classification].

</details>

<a id="ai023"></a>
### AI023 — Logits contract

A binary layer emits raw real-valued logits without sigmoid. Which BCE configuration matches?

A. BinaryCrossentropy(from_logits=False) because the values are numeric.

B. BinaryCrossentropy(from_logits=True).

C. Apply sigmoid and still declare the result raw logits.

D. Use a threshold before the loss to preserve the gradient.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — BinaryCrossentropy(from_logits=True).**

The flag tells the loss how to interpret predictions. Raw logits require the logits path; probabilities require the probability path.

**Why the other choices fail:** A numeric dtype does not imply probabilities. Thresholding usually destroys the useful smooth training signal.

**Rule/source:** [Classification].

</details>

<a id="ai024"></a>
### AI024 — Confident wrong versus uncertain wrong

For one positive label y=1, compare predictionsp=0.01 andp=0.4 using BCE=−ln(p). Which is correct?

A. Both have equal loss because both are below0.5.

B. The losses are−0.01 and−0.4.

C. 0.01 has larger loss; approximately4.605 versus0.916.

D. 0.4 has larger loss because it is closer to the threshold.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 0.01 has larger loss; approximately4.605 versus0.916.**

Cross-entropy measures probability confidence, not only the thresholded class. Logarithms sharply penalize confidently wrong predictions.

**Why the other choices fail:** Classification accuracy can tie while training losses differ; negative log is not the negative probability.

**Rule/source:** [Classification].

</details>

<a id="ai025"></a>
### AI025 — Softmax shift invariance

Add100 to every logit in a single multiclass vector. In exact arithmetic, how do its softmax probabilities change?

A. The class probabilities no longer sum to1.

B. They remain the same.

C. Each probability increases by100.

D. The largest class becomes probability1 by definition.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — They remain the same.**

The common factor e¹⁰⁰ cancels between numerator and denominator. Stable implementations exploit this by subtracting the maximum.

**Why the other choices fail:** Raw exponentiation can overflow in finite arithmetic; the mathematical identity does not guarantee every naive implementation is safe.

**Rule/source:** [Classification].

</details>

<a id="ai026"></a>
### AI026 — Same ranking, different calibration

A model changes scores while preserving every example’s rank. What distinction matters?

A. Ranking metrics may stay the same while threshold decisions and probability calibration change.

B. Calibration only checks ranking and cannot change.

C. Every accuracy score at every fixed threshold stays identical.

D. All loss values must stay identical.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Ranking metrics may stay the same while threshold decisions and probability calibration change.**

Ordering, decision threshold and probability meaning are separate. A monotone transform can preserve ranking but move values across a threshold.

**Why the other choices fail:** Probabilistic losses and calibration use the actual values, not only their order.

**Rule/source:** [Classification].

</details>

<a id="ai027"></a>
### AI027 — Training accuracy versus loss

An epoch leaves all predicted class IDs unchanged but increases probabilities assigned to the true labels. What can happen?

A. Accuracy remains equal while cross-entropy decreases.

B. Cross-entropy cannot change without a class-label change.

C. The model cannot update parameters in this situation.

D. Accuracy must increase because probabilities improve.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Accuracy remains equal while cross-entropy decreases.**

Accuracy counts threshold/argmax decisions. Cross-entropy also observes confidence in the correct target.

**Why the other choices fail:** A discrete metric can plateau while a differentiable objective improves.

**Rule/source:** [Classification].

</details>

<a id="ai028"></a>
### AI028 — High recall use case

Missing a positive disease case is very costly; extra follow-up checks are acceptable. Which evaluation focus fits the stated costs?

A. Prioritize recall while examining the false-positive burden and a suitable threshold.

B. Prioritize true negatives only, regardless of missed positives.

C. Choose any model with high overall accuracy.

D. Demand precision1 without considering recall tradeoffs.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Prioritize recall while examining the false-positive burden and a suitable threshold.**

Recall asks how many actual positives are found. The useful operating point depends on costs rather than one universally best metric.

**Why the other choices fail:** Perfect precision may discard many positives; imbalance can hide misses in accuracy.

**Rule/source:** [Classification].

</details>

<a id="ai029"></a>
### AI029 — Multiclass versus regression boundary

A model predicts an ordered rating1–5 as mutually exclusive classes. What must be made explicit when assessing errors?

A. Accuracy automatically charges four times more for1→5 than1→2.

B. Ordered categories always forbid a classification formulation.

C. Ordinary class accuracy treats all wrong labels equally; a distance-sensitive metric requires an additional ordinal/numeric interpretation.

D. A softmax cannot output five classes.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Ordinary class accuracy treats all wrong labels equally; a distance-sensitive metric requires an additional ordinal/numeric interpretation.**

Classification can model ordered labels, but its basic accuracy ignores how far a wrong category is from the target.

**Why the other choices fail:** Task formulation and metric choice are distinct; order is not automatically part of an accuracy score.

**Rule/source:** [Classification].

</details>

<a id="ai030"></a>
### AI030 — Zero predicted positives

TP=FP=0 but actual positives exist. Which statement is defensible without a library-specific zero-division convention?

A. Both are mathematically undefined.

B. Positive precision has an undefined0/0 denominator; positive recall is0.

C. Precision is0.5 because no decision was made.

D. Precision is mathematically1 and recall is0.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Positive precision has an undefined0/0 denominator; positive recall is0.**

Precision divides by predicted positives, of which there are none. Recall divides by a nonzero actual-positive count and has zero numerator.

**Why the other choices fail:** Libraries may report 0 or another value by convention; distinguish that policy from the raw mathematical ratio.

**Rule/source:** [Classification].

</details>

## ANN forward passes, gradients and training behavior

<a id="ai031"></a>
### AI031 — Neuron calculation

x=[2,−1],w=[3,4],b=−1 with ReLU. What are preactivation z and output?

A. z=−1, output0.

B. z=1, output0.5.

C. z=2, output2.

D. z=1, output1.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — z=1, output1.**

z=2×3+(−1)×4−1=1; ReLU=max(0,z)=1.

**Why the other choices fail:** Include the bias once and apply the stated activation. A sigmoid output is a different neuron.

**Rule/source:** [AI notes].

</details>

<a id="ai032"></a>
### AI032 — Perceptron on XOR

A single affine-threshold neuron receives raw binary inputs. Can it represent XOR exactly?

A. Yes, with a sufficiently large learning rate.

B. No; XOR is not linearly separable in the raw input plane.

C. Yes, by changing only its bias.

D. No neural network with hidden nonlinear units can represent XOR.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — No; XOR is not linearly separable in the raw input plane.**

XOR’s opposite-corner positives cannot be separated from its negatives by one line. A suitable nonlinear hidden representation can solve it.

**Why the other choices fail:** Optimization settings cannot enlarge the single affine decision-boundary family.

**Rule/source:** [AI notes].

</details>

<a id="ai033"></a>
### AI033 — Linear hidden layers collapse

A network uses only affine Dense layers and no nonlinear activations. Which claim is accurate?

A. The biases alone guarantee nonlinear representational power.

B. Every extra layer creates a new nonlinear decision boundary.

C. Their composition is still affine, regardless of the number of such layers.

D. It cannot compute any regression prediction.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Their composition is still affine, regardless of the number of such layers.**

W₂(W₁x+b₁)+b₂=(W₂W₁)x+(W₂b₁+b₂). Depth without nonlinearity does not create a general nonlinear map.

**Why the other choices fail:** Affine functions can still fit regression/classification tasks; representational limitation is not inability to predict.

**Rule/source:** [AI notes].

</details>

<a id="ai034"></a>
### AI034 — Parameter count with biases

Dense network:3 inputs→4 hidden units→2 outputs, biases in both layers. Parameter count?

A. 26.

B. 24.

C. 20.

D. 32.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 26.**

First layer 3×4+4=16; second 4×2+2=10; total 26. Activation functions here add no learned parameters.

**Why the other choices fail:** Count both matrices and both bias vectors; batch size does not multiply stored weights.

**Rule/source:** [AI notes].

</details>

<a id="ai035"></a>
### AI035 — Batch size does not duplicate weights

A Dense layer maps5 features to3 units with bias. Batch size changes from8 to64. What changes?

A. The feature dimension becomes64.

B. Output shape changes from(8,3) to(64,3); parameter count stays18.

C. The layer gains64 biases.

D. Parameter count changes from144 to1152.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Output shape changes from(8,3) to(64,3); parameter count stays18.**

The same 5×3 weight matrix and 3 biases are shared across examples. Batch size changes the leading dimension.

**Why the other choices fail:** Batch dimension, input-feature dimension and trainable parameter count are different quantities.

**Rule/source:** [AI notes].

</details>

<a id="ai036"></a>
### AI036 — Chain rule numerical trace

For x=2, h=w₁x, ŷ=w₂h, w₁=3,w₂=4, target0, loss=(ŷ−0)². What is dL/dw₁?

A. 384.

B. 192.

C. 24.

D. 48.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 384.**

h=6,ŷ=24. dL/dŷ=48, dŷ/dh=4, dh/dw₁=2. Multiply 48×4×2=384.

**Why the other choices fail:** Backpropagation multiplies local derivatives; the loss derivative alone is not the weight derivative.

**Rule/source:** [AI notes].

</details>

<a id="ai037"></a>
### AI037 — Backpropagation versus update

A gradient is computed for every weight but no optimizer step is applied. What has happened?

A. Backpropagation automatically applies the learning rate.

B. The forward pass is impossible without an optimizer.

C. Derivative computation occurred; weights need not have changed.

D. The model has necessarily completed one training update.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Derivative computation occurred; weights need not have changed.**

Backpropagation evaluates derivatives. The optimizer separately uses them to modify parameters.

**Why the other choices fail:** A gradient value is not an assignment; inference and loss calculation can run without training updates.

**Rule/source:** [AI notes].

</details>

<a id="ai038"></a>
### AI038 — ReLU negative-side gradient

At preactivationz=−2, ReLU is used and upstream derivative is5. What derivative flows to z?

A. 0.

B. 5.

C. −10.

D. 1.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 0.**

ReLU is constant 0 on its negative branch, so its local derivative is 0; multiplying by upstream 5 still gives 0.

**Why the other choices fail:** The upstream derivative alone does not bypass the activation derivative. The nondifferentiable pointz=0 is not this case.

**Rule/source:** [AI notes].

</details>

<a id="ai039"></a>
### AI039 — Sigmoid saturation

A hidden sigmoid has an input of very large positive magnitude. Why can learning through it be slow?

A. The output becomes a negative number.

B. The derivative grows without bound as output approaches1.

C. Every optimizer necessarily corrects saturation in one step.

D. Its local derivativeσ(z)(1−σ(z)) is near0.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Its local derivativeσ(z)(1−σ(z)) is near0.**

When σ≈1,1−σ≈0; backpropagated gradients can become small through that path.

**Why the other choices fail:** Saturation concerns derivatives, not negative outputs or an optimizer guarantee.

**Rule/source:** [AI notes].

</details>

<a id="ai040"></a>
### AI040 — Epochs with a partial batch

There are100 training samples, batch size32, remainder kept. Five full epochs, one optimizer step per batch. How many steps?

A. 500.

B. 20.

C. 16.

D. 15.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 20.**

Each epoch has batches 32,32,32,4, hence 4 steps. Five epochs give 20.

**Why the other choices fail:** Floor division drops a batch that is explicitly kept; steps and individual examples are not the same unit.

**Rule/source:** [AI notes].

</details>

<a id="ai041"></a>
### AI041 — Shuffling after a sorted split

A dataset is ordered by class; the last20% becomes validation. Shuffling only the training split afterward guarantees what?

A. It moves validation examples into training.

B. It eliminates all leakage and imbalance.

C. It makes validation representative automatically.

D. It changes training order but does not repair a class-biased validation split.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — It changes training order but does not repair a class-biased validation split.**

Split membership was already chosen. Training shuffling affects batch order, not the composition of the validation set.

**Why the other choices fail:** Data partitioning and within-partition ordering are distinct operations.

**Rule/source:** [AI notes].

</details>

<a id="ai042"></a>
### AI042 — Dropout at inference

A dropout layer was used during training. Which ordinary inference behavior fits inverted dropout?

A. Dropout is inactive; training-time surviving activations were scaled to preserve expectation.

B. The same random training mask must be reused forever.

C. Every output is multiplied by the dropout rate at inference.

D. Dropout introduces a learned weight for every dropped value.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Dropout is inactive; training-time surviving activations were scaled to preserve expectation.**

Training samples random masks and scales surviving values by 1/(1−rate). Standard inference uses the unmasked activation.

**Why the other choices fail:** Dropout is not a trainable weight matrix or a fixed pruning scheme.

**Rule/source:** [AI notes].

</details>

<a id="ai043"></a>
### AI043 — BatchNorm modes

A BatchNorm layer is called with training=True versus training=False under ordinary settings. What key distinction matters?

A. BatchNorm has no state because normalization is arithmetic.

B. Training uses current batch statistics and updates moving statistics; inference uses the stored moving statistics.

C. Inference always recomputes mean from all future test samples.

D. Both calls necessarily normalize using only the current batch.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Training uses current batch statistics and updates moving statistics; inference uses the stored moving statistics.**

BatchNorm combines learned scale/offset with stored statistics. Mode changes which statistics are used.

**Why the other choices fail:** Numerical output can depend on mode even without an optimizer step.

**Rule/source:** [Keras BatchNorm].

</details>

<a id="ai044"></a>
### AI044 — Overfit versus underfit evidence

Training loss is low and keeps falling; validation loss begins rising on the same task and metric. Which diagnosis best fits?

A. Underfitting is proved because training loss falls.

B. Growing overfitting is plausible; early stopping should monitor held-out validation behavior.

C. The test set should choose every stopping epoch.

D. More epochs must eventually improve validation loss.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Growing overfitting is plausible; early stopping should monitor held-out validation behavior.**

The widening train/validation gap suggests fitting training-specific patterns. It is evidence, not a proof against every data-quality alternative.

**Why the other choices fail:** Training progress alone does not guarantee generalization; test-guided stopping leaks selection information.

**Rule/source:** [AI notes].

</details>

<a id="ai045"></a>
### AI045 — Regularization versus dropout semantics

L2 regularization and dropout both appear in training. Which comparison is correct?

A. Both delete the same weights permanently.

B. L2 adds a weight-size penalty; dropout randomly masks activations during training.

C. Both directly guarantee an improvement on every test set.

D. L2 changes only batch size, while dropout changes only learning rate.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — L2 adds a weight-size penalty; dropout randomly masks activations during training.**

Their mechanisms differ even when both can reduce overfitting. Hyperparameters require validation.

**Why the other choices fail:** Neither is universal permanent pruning or a guaranteed accuracy improvement.

**Rule/source:** [Regularization].

</details>

<a id="ai046"></a>
### AI046 — Symmetry at identical initialization

Two hidden units have identical incoming weights and biases and identical downstream connections. Deterministic gradient descent trains them on the same batches. What can go wrong?

A. Their gradients must have opposite signs.

B. Identical initialization guarantees maximum diversity.

C. They can remain symmetric and learn the same representation.

D. Any bias automatically breaks symmetry even when the biases are identical.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — They can remain symmetric and learn the same representation.**

Identical computations and gradient paths can keep updates identical. Asymmetric initialization helps units learn different features.

**Why the other choices fail:** A deterministic symmetric setup does not spontaneously guarantee diverse units.

**Rule/source:** [AI notes].

</details>

## TensorFlow and Keras code contracts

<a id="ai047"></a>
### AI047 — Rank versus element count

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.constant([[1,2,3],[4,5,6]])
print(int(tf.rank(x)),x.shape.as_list(),int(tf.size(x)))
```

A. 2 [6] 6

B. 3 [2, 3] 6

C. 2 [2, 3] 6

D. 6 [2, 3] 2

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 2 [2, 3] 6**

Rank counts axes; shape gives each axis length; size counts all entries.

**Why the other choices fail:** A matrix’s rows or total entries are not its rank. reshape would change shape without changing size.

**Rule/source:** [TF tensors].

</details>

<a id="ai048"></a>
### AI048 — Broadcasting columns and rows

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
a=tf.constant([[1],[2]])
b=tf.constant([[10,20,30]])
print((a+b).numpy().tolist())
```

A. [[11], [22]]

B. [[11, 22, 33]]

C. [[11, 21, 31], [12, 22, 32]]

D. InvalidArgumentError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [[11, 21, 31], [12, 22, 32]]**

Shapes(2,1) and(1,3) broadcast to(2,3), repeating singleton axes conceptually.

**Why the other choices fail:** Broadcasting aligns trailing dimensions; it is not pairwise zip of flattened values.

**Rule/source:** [TF tensors].

</details>

<a id="ai049"></a>
### AI049 — Accidental pairwise error matrix

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
pred=tf.constant([[1.],[2.]])
y=tf.constant([1.,2.])
print((pred-y).shape.as_list(),float(tf.reduce_mean((pred-y)**2)))
```

A. [2, 1] 0.0

B. [2, 2] 0.5

C. [2] 0.0

D. InvalidArgumentError

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [2, 2] 0.5**

(2,1) minus(2,) broadcasts to(2,2):[[0,−1],[1,0]]. Mean squared error is 2/4=0.5.

**Why the other choices fail:** Matched batch counts do not imply matched tensor shapes. Reshape y to(2,1) for the intended aligned residuals.

**Rule/source:** [TF tensors].

</details>

<a id="ai050"></a>
### AI050 — Elementwise versus matmul

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
a=tf.constant([[1,2],[3,4]])
b=tf.constant([[5,6],[7,8]])
print((a*b).numpy().tolist())
print(tf.matmul(a,b).numpy().tolist())
```

A. [[19, 22], [43, 50]] / [[5, 12], [21, 32]]

B. Both results are [[19, 22], [43, 50]].

C. Both results are [[5, 12], [21, 32]].

D. [[5, 12], [21, 32]] / [[19, 22], [43, 50]]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [[5, 12], [21, 32]] / [[19, 22], [43, 50]]**

* multiplies corresponding entries; matmul uses row-by-column sums.

**Why the other choices fail:** Compatible shapes alone do not make these operators equivalent.

**Rule/source:** [TF tensors].

</details>

<a id="ai051"></a>
### AI051 — Reshape preserves traversal values

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.constant([[1,2,3],[4,5,6]])
print(tf.reshape(x,[3,2]).numpy().tolist())
```

A. [[1, 2, 3], [4, 5, 6]]

B. InvalidArgumentError

C. [[1, 2], [3, 4], [5, 6]]

D. [[1, 4], [2, 5], [3, 6]]

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [[1, 2], [3, 4], [5, 6]]**

reshape preserves flattened order and repartitions into the requested compatible shape.

**Why the other choices fail:** Transpose changes axis order and yields the first distractor; reshape is not transpose.

**Rule/source:** [TF tensors].

</details>

<a id="ai052"></a>
### AI052 — Reduction axis

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.constant([[1,2,3],[4,5,6]])
print(tf.reduce_sum(x,axis=0).numpy().tolist(),tf.reduce_sum(x,axis=1).numpy().tolist())
```

A. [6, 15] [5, 7, 9]

B. [1, 2, 3] [4, 5, 6]

C. 21 21

D. [5, 7, 9] [6, 15]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [5, 7, 9] [6, 15]**

axis 0 collapses rows, leaving column totals. axis 1 collapses columns, leaving row totals.

**Why the other choices fail:** Axis names refer to the dimension being reduced, not the shape of the result.

**Rule/source:** [TF tensors].

</details>

<a id="ai053"></a>
### AI053 — No implicit mixed tensor cast

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
a=tf.constant([1,2],dtype=tf.int32)
b=tf.constant([1.,2.],dtype=tf.float32)
print((a+b).numpy())
```

A. [2. 4.]

B. [2 4]

C. Compilation fails.

D. InvalidArgumentError

<details>
<summary>Answer and reasoning</summary>

**Correct: D — InvalidArgumentError**

These TensorFlow Add inputs have mismatched dtypes and are not implicitly promoted like ordinary Python numeric operands.

**Why the other choices fail:** Cast explicitly when appropriate; identical shapes do not fix incompatible types.

**Rule/source:** [TF tensors].

</details>

<a id="ai054"></a>
### AI054 — Compile configures, it does not train

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
m=tf.keras.Sequential([tf.keras.Input(shape=(1,)),tf.keras.layers.Dense(1,use_bias=False,kernel_initializer="ones")])
before=float(m.get_weights()[0][0,0])
m.compile(optimizer="sgd",loss="mse")
print(before,float(m.get_weights()[0][0,0]))
```

A. 1.0 1.0

B. 1.0 0.0

C. Compilation fails.

D. 1.0 0.99

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 1.0 1.0**

compile configures the optimizer, loss and metrics; it does not run fit or apply a gradient update. The already-built layer retains its weight.

**Why the other choices fail:** Compilation in Keras is not Java compilation or an automatic training epoch.

**Rule/source:** [TF training].

</details>

<a id="ai055"></a>
### AI055 — Gradient computes but does not update

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
w=tf.Variable(3.)
with tf.GradientTape() as t:
    y=w*w
g=t.gradient(y,w)
print(float(y),float(g),float(w))
```

A. 9.0 6.0 3.0

B. 9.0 3.0 3.0

C. None

D. 9.0 6.0 -3.0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 9.0 6.0 3.0**

Differentiating w² yields 2 w=6. The variable stays 3 because no assignment or optimizer update occurs.

**Why the other choices fail:** The gradient is not the new weight or the output divided by weight.

**Rule/source:** [TF tape].

</details>

<a id="ai056"></a>
### AI056 — A constant needs watching

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.constant(3.)
with tf.GradientTape() as t:
    y=x*x
print(t.gradient(y,x))
```

A. None

B. RuntimeError

C. 6.0

D. 0.0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — None**

A constant is not automatically watched. With no recorded dependency from a watched x, the requested gradient is None.

**Why the other choices fail:** None signals missing gradient connectivity/recording here, not a numerical zero derivative.

**Rule/source:** [TF tape].

</details>

<a id="ai057"></a>
### AI057 — Watch a constant explicitly

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.constant(3.)
with tf.GradientTape() as t:
    t.watch(x)
    y=x*x
print(float(t.gradient(y,x)))
```

A. None

B. 3.0

C. 6.0

D. 9.0

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 6.0**

watch registers the floating tensor before the operations. The tape records the square and yields 2 x.

**Why the other choices fail:** Watching after the computation would not retroactively record its missing path.

**Rule/source:** [TF tape].

</details>

<a id="ai058"></a>
### AI058 — Compute inside the tape

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.Variable(3.)
y=x*x
with tf.GradientTape() as t:
    z=y+1
print(t.gradient(z,x))
```

A. 0.0

B. None

C. 7.0

D. 6.0

<details>
<summary>Answer and reasoning</summary>

**Correct: B — None**

The dependence of y on x was computed outside the tape. Entering a tape around z does not replay that prior square.

**Why the other choices fail:** A Variable’s type alone cannot restore an unrecorded computation.

**Rule/source:** [TF tape].

</details>

<a id="ai059"></a>
### AI059 — Disconnected is not zero

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.Variable(2.);y=tf.Variable(3.)
with tf.GradientTape() as t:
    z=x*x
g=t.gradient(z,[x,y])
print(float(g[0]),g[1])
```

A. 4.0 0.0

B. None None

C. 4.0 None

D. 2.0 3.0

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 4.0 None**

x participates and has derivative 4; y has no path to z and gets None under the default unconnected policy.

**Why the other choices fail:** A connected zero derivative and an unconnected source are different tape outcomes.

**Rule/source:** [TF tape].

</details>

<a id="ai060"></a>
### AI060 — Dataset remainder policy

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
d=tf.data.Dataset.range(5)
options=tf.data.Options()
options.threading.private_threadpool_size=1
a=d.batch(2).with_options(options)
b=d.batch(2,drop_remainder=True).with_options(options)
print([x.numpy().tolist() for x in a])
print([x.numpy().tolist() for x in b])
```

A. [[0, 1], [2, 3], [4]] / [[0, 1], [2, 3]]

B. [[0, 1], [2, 3]] / [[0, 1], [2, 3], [4]]

C. Both have exactly three full-size batches.

D. Both have exactly two batches.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [[0, 1], [2, 3], [4]] / [[0, 1], [2, 3]]**

Default batching keeps a smaller final batch. drop_remainder=True omits it, changing both step count and examples used.

**Why the other choices fail:** Ceiling versus floor step counts reflect a policy, not a disagreement about division.

**Rule/source:** [TF training].

</details>

<a id="ai061"></a>
### AI061 — Vector targets are summed for gradient

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.Variable([1.,2.])
with tf.GradientTape() as t:
    y=x*x
print(t.gradient(y,x).numpy().tolist())
```

A. [1.0, 2.0]

B. [2.0, 4.0]

C. [[2.0, 0.0], [0.0, 4.0]]

D. 6.0

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [2.0, 4.0]**

gradient of a nonscalar target uses the sum of its components by default. Differentiating x₀²+x₁² gives[2,4].

**Why the other choices fail:** A full Jacobian is a different API and shape; gradient is not a scalar sum of the resulting derivative vector.

**Rule/source:** [TF tape].

</details>

<a id="ai062"></a>
### AI062 — Stop one branch’s gradient

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.Variable(3.)
with tf.GradientTape() as t:
    y=x*tf.stop_gradient(x)
print(float(t.gradient(y,x)))
```

A. 3.0

B. 6.0

C. 0.0

D. None

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 3.0**

The stopped factor has value 3 but contributes no derivative; the unstopped x contributes 1×3.

**Why the other choices fail:** stop_gradient blocks a path, not the numerical value or all other paths from x.

**Rule/source:** [TF tape].

</details>

<a id="ai063"></a>
### AI063 — Reuse an ordinary tape

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.Variable(2.)
with tf.GradientTape() as t:
    y=x*x
t.gradient(y,x)
t.gradient(y,x)
```

A. Second call returnsNone.

B. Both calls return4.0.

C. Second call returns0.0.

D. RuntimeError

<details>
<summary>Answer and reasoning</summary>

**Correct: D — RuntimeError**

A default nonpersistent tape releases its resources after one gradient call. Use persistent=True for repeated calls.

**Why the other choices fail:** Reusing an already-consumed tape is not the same as asking for an unconnected gradient.

**Rule/source:** [TF tape].

</details>

<a id="ai064"></a>
### AI064 — Keep a tape for two targets

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
x=tf.Variable(2.)
with tf.GradientTape(persistent=True) as t:
    a=x*x
    b=a*x
print(float(t.gradient(a,x)),float(t.gradient(b,x)))
```

A. 4.0 12.0

B. 2.0 4.0

C. RuntimeError

D. 4.0 8.0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 4.0 12.0**

Persistent recording supports both gradient calls. Derivatives of x² andx³ at 2 are 4 and 12.

**Why the other choices fail:** The derivative of the cube is not its value, and the second call is valid on a persistent tape.

**Rule/source:** [TF tape].

</details>

<a id="ai065"></a>
### AI065 — Dense fixed parameters

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
d=tf.keras.layers.Dense(2,kernel_initializer="ones",bias_initializer="zeros")
y=d(tf.constant([[1.,2.,3.],[4.,5.,6.]]))
print(y.numpy().tolist(),d.count_params())
```

A. [[1.0, 2.0], [4.0, 5.0]] 8

B. [[6.0, 6.0], [15.0, 15.0]] 8

C. [[6.0, 15.0]] 6

D. [[6.0, 6.0], [15.0, 15.0]] 16

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [[6.0, 6.0], [15.0, 15.0]] 8**

Three features connect to two units:6 weights+2 biases. An all-one kernel sums each row for both units.

**Why the other choices fail:** Parameter count is independent of two examples; Dense does not simply truncate input features.

**Rule/source:** [TF Dense].

</details>

<a id="ai066"></a>
### AI066 — Fit versus evaluate versus predict

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
m=tf.keras.Sequential([tf.keras.Input(shape=(1,)),tf.keras.layers.Dense(1,use_bias=False,kernel_initializer="zeros")])
m.compile(optimizer=tf.keras.optimizers.SGD(0.5),loss="mse")
x=tf.constant([[1.]])
y=tf.constant([[2.]])
m.fit(x,y,batch_size=1,epochs=1,verbose=0)
a=m.predict(x,verbose=0)
e=m.evaluate(x,y,verbose=0)
print(a.tolist(),round(float(e),6),float(m.get_weights()[0][0,0]))
```

A. [[2.0]] 0.0 2.0

B. [[0.0]] 4.0 0.0

C. [[2.0]] 0.0 0.0

D. [[1.0]] 1.0 1.0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [[2.0]] 0.0 2.0**

fit applies one gradient step: old derivative−4 and rate 0.5 change w from 0 to 2. predict returns outputs; evaluate measures loss and does not train further.

**Why the other choices fail:** The three methods have different jobs. Predictions do not require targets, whereas supervised loss evaluation does.

**Rule/source:** [TF training].

</details>

<a id="ai067"></a>
### AI067 — Flatten has no weights

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
f=tf.keras.layers.Flatten()
y=f(tf.zeros([2,3,4]))
print(y.shape.as_list(),f.count_params())
```

A. [2, 12] 12

B. [2, 3, 4] 0

C. [2, 12] 0

D. [24] 0

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [2, 12] 0**

Flatten preserves the batch dimension and combines remaining dimensions. It rearranges shape without trainable parameters.

**Why the other choices fail:** Flatten is not a Dense layer, and the batch dimension is not merged here.

**Rule/source:** [TF Dense].

</details>

<a id="ai068"></a>
### AI068 — Sparse loss and perfect logit tie

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
v=loss(tf.constant([0,2]),tf.constant([[0.,0.,0.],[0.,0.,0.]]))
print(round(float(v),6))
```

A. 3.0

B. 0.693147

C. 0.0

D. 1.098612

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1.098612**

Each equal-logit row gives probability 1/3 to every class, so mean loss=−ln(1/3)=ln 3.

**Why the other choices fail:** A correct class index alone does not imply certainty. Binary ln 2 and the class count are different quantities.

**Rule/source:** [TF losses].

</details>

<a id="ai069"></a>
### AI069 — Dropout inference with an explicit mode

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
d=tf.keras.layers.Dropout(0.5)
x=tf.constant([[2.,4.]])
print(d(x,training=False).numpy().tolist(),d.count_params())
```

A. [[1.0, 2.0]] 0

B. [[2.0, 4.0]] 0

C. Random output; no exact answer is possible.

D. [[4.0, 8.0]] 2

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [[2.0, 4.0]] 0**

Explicit inference mode disables random masking. Dropout has no learned parameters.

**Why the other choices fail:** Training randomness is irrelevant for training=False. Inverted-dropout scaling is applied during training, not as an extra inference division.

**Rule/source:** [TF Dropout].

</details>

<a id="ai070"></a>
### AI070 — An optimizer step really mutates

What happens in TensorFlow 2 eager execution? Read the shape, dtype and tape scope carefully.

```python
import tensorflow as tf
w=tf.Variable(2.)
with tf.GradientTape() as t:
    loss=(w-1.)**2
g=t.gradient(loss,w)
tf.keras.optimizers.SGD(learning_rate=0.25).apply_gradients([(g,w)])
print(float(w))
```

A. 1.5

B. 2.0

C. 0.5

D. 1.75

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 1.5**

Gradient=2(w−1)=2. Plain SGD subtracts 0.25×2, producing 1.5.

**Why the other choices fail:** Unlike a tape-only call, apply_gradients updates the variable. The factor 2 belongs to the stated squared loss.

**Rule/source:** [TF training].

</details>

## Sources

[AI notes]: FS_Revision_Notes.md
[Regression]: https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent
[Classification]: https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall
[Regularization]: https://developers.google.com/machine-learning/crash-course/overfitting/regularization
[ANN activations]: https://developers.google.com/machine-learning/crash-course/neural-networks/activation-functions
[TF tensors]: https://www.tensorflow.org/guide/tensor
[TF tape]: https://www.tensorflow.org/guide/autodiff
[TF training]: https://www.tensorflow.org/guide/keras/training_with_built_in_methods
[TF Dense]: https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense
[TF losses]: https://www.tensorflow.org/api_docs/python/tf/keras/losses/SparseCategoricalCrossentropy
[TF Dropout]: https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dropout
[Keras BatchNorm]: https://keras.io/api/layers/normalization_layers/batch_normalization/
