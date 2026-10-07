# Artificial Intelligence: complete FS study guide

**Study this file directly. No prior college-note reading is required.** It teaches the announced regression, classification, TensorFlow, and artificial neural network topics. Read the concepts, calculate the worked examples, and answer the included MCQs. You do not need to install TensorFlow to study its code and workflow here.

Test: **9 October 2026**. [Other subject guides](../FS_SUBJECT_NOTES.md).

**ai explnation due to lack of material** — explanations and added examples are AI-authored. The selected college AI units cover the main topics; this guide supplies the background and intermediate steps needed to study them directly.

## 1. Start with data, features, and targets

A **model** is a calculation used to make predictions. In **machine learning**, training adjusts that calculation using examples instead of manually specifying every decision.

A **sample** is one example. A **feature** is an input value describing that example. A **target**, or label, is the known answer used in supervised training.

| Sample | Feature: study hours | Feature: attendance % | Target: score |
|---|---|---|---|
| Student A | 2 | 80 | 55 |
| Student B | 4 | 90 | 75 |

The model receives hours and attendance and predicts score. Training compares predictions with known scores. The unknown score is not supplied as an input for the prediction task.

**Supervised learning** uses known target examples. **Unsupervised learning** seeks structure without supplied target labels. The announced regression and classification topics primarily concern supervised prediction.

### Parameters and hyperparameters

- A **parameter** is a value learned during training, such as a weight or bias.
- A **hyperparameter** is a chosen setting, such as learning rate, layer width, or batch size.

A model learns the weights. The training setup chooses how quickly and how often to update them.

### Regression versus classification

| Task | Desired result | Example |
|---|---|---|
| Regression | A numerical quantity | Predict score, temperature, price. |
| Classification | A category or categories | Predict spam/not spam or digit class. |

A class represented by a number is still a category. Predicting the digit label 7 is classification; estimating a temperature of 7 degrees is regression. Decide from the target's meaning, not its storage type.

## 2. Data splitting and preparation

Use separate data for different decisions:

1. **Training set:** fit the learned parameters.
2. **Validation set:** compare settings or decide when to stop training.
3. **Test set:** assess the selected model on held-out examples.

If you repeatedly choose models using test results, that set has become part of your selection process and is no longer an independent final check.

**Data leakage** occurs when unavailable or held-out information influences training. Example: computing a normalization rule using the entire dataset before splitting can expose test information. Split first, fit learned preprocessing on training data, then apply the same rule to validation/test data.

**Scaling** puts features on useful numerical ranges. For example, values in millions can dominate poorly scaled numerical training alongside values between 0 and 1. Scaling can help optimization; it does not create useful information or guarantee better results.

Other preparation can include handling missing values and encoding categories. Keep the same feature meanings and order when making predictions.

## 3. Regression: produce a numerical prediction

For one input, linear regression uses:

```text
prediction = w × x + b
```

x is the feature, w is its weight or slope, b is an offset called bias. The model learns w and b from data. With several features, add their weighted contributions.

**Example:** w = 3, b = 2, x = 5. Prediction = 3×5+2 = 17. Increasing x by one increases the prediction by 3 for this fixed model.

“Linear” describes how the prediction depends on the coefficients in the specified model. A single linear-output neuron can implement this regression calculation. It does not need a probability output.

### Mean squared error, MSE

A **prediction error** is the difference between prediction and target. A **loss** measures disagreement. For N numerical targets:

```text
MSE = sum of (prediction − target)^2 / N
```

| Target | Prediction | Difference | Squared difference |
|---|---|---|---|
| 10 | 8 | −2 | 4 |
| 20 | 22 | 2 | 4 |
| 30 | 29 | −1 | 1 |

MSE = (4+4+1)/3 = **3**. Squaring prevents positive and negative errors from cancelling and makes larger errors more influential. MSE has the target units squared.

**MAE**, mean absolute error, averages absolute differences. Here MAE = (2+2+1)/3 = 5/3. **RMSE** is the square root of MSE, here √3, and has the original target units.

Lower loss on the same evaluation task generally means closer predictions under that measure. Different datasets, target scales, or loss definitions need care before comparing numerical loss values.

## 4. Classification: produce a category decision

### Three types of class task

- **Binary:** one of two classes, such as spam/not spam.
- **Multiclass:** one mutually exclusive class among several, such as one digit from 0–9.
- **Multilabel:** several labels can apply together, such as an image containing both a cat and a car.

A model can produce scores or probability estimates before selecting labels. A **threshold** is a chosen decision boundary.

### Logistic regression

Despite its name, logistic regression is a classification model. For a binary task:

```text
z = w × x + b
p = sigmoid(z) = 1 / (1 + exp(−z))
```

`exp` is the exponential function. Sigmoid converts a finite numerical score z to a value strictly between 0 and 1. With threshold 0.5, choose the positive class when p ≥ 0.5.

If p = 0.7, that rule predicts positive. If the selected threshold is 0.8, the same score predicts negative. The threshold is a decision choice; it is not the learning rate.

A score described as a probability estimate can still be poorly calibrated. A prediction is evidence from a model, not certainty about the world.

### Classification loss

For a binary probability p and target y equal to 0 or 1, binary cross-entropy is:

```text
−[y ln(p) + (1−y) ln(1−p)]
```

`ln` is the natural logarithm. For y = 1, it simplifies to −ln(p). A correct-class probability of 0.8 gives loss about 0.223; 0.2 gives about 1.609. Assigning low probability to the actual class receives a larger penalty.

Accuracy counts final correct labels. Loss can also distinguish how confident the scores are. Two models can have the same accuracy and different cross-entropy losses.

For multiclass tasks, **categorical cross-entropy** commonly expects encoded class vectors; **sparse categorical cross-entropy** commonly expects integer class IDs. Use the loss that matches the target representation.

## 5. A neuron: weighted sum followed by an activation

An **artificial neuron** combines input values with learned weights, adds a bias, and applies a chosen activation function:

```text
z = w1×x1 + w2×x2 + ... + b
output = activation(z)
```

The **bias** shifts the calculation independently of the feature values. It allows an offset even when every input is zero. A weight's contribution depends on both its value and the feature scale; a large weight alone does not prove causal importance.

### Calculate one neuron

Inputs x = [2,3], weights w = [0.5,−1], bias b = 1:

1. First contribution: 2×0.5 = 1.
2. Second contribution: 3×(−1) = −3.
3. Add the bias: z = 1−3+1 = −1.
4. With ReLU activation, output = max(0,−1) = **0**.

The weighted sum and activated output are different quantities. Do not apply the activation separately to each input unless the model explicitly says so.

### Basic neuron models

A threshold neuron outputs a class according to whether z reaches a threshold. A classical **McCulloch–Pitts** model uses a fixed logical threshold setup. A **perceptron** can adjust weights from classification examples.

For a simple 0/1 perceptron convention, a weight update can be `w_i ← w_i + learning_rate × (target−prediction) × x_i`. The exact update depends on the stated label and threshold convention.

A single linear decision boundary cannot solve XOR on the four binary input pairs: the two positive cases lie on opposite corners. A suitable hidden-layer network with nonlinear activations can form more complex boundaries.

## 6. Activation functions: match the output to the task

An **activation function** transforms z. Nonlinear hidden activations let a network represent relationships that a stack of purely linear layers cannot.

| Activation | Calculation or range | Typical role |
|---|---|---|
| Linear | Output z; unbounded | Numerical regression output. |
| ReLU | max(0,z) | Hidden layers. |
| Leaky ReLU | z when nonnegative; a small slope times z when negative | Retain a small response/gradient for negative inputs. |
| Sigmoid | 1/(1+exp(−z)); between 0 and 1 | Binary or independent multilabel outputs. |
| tanh | Between −1 and 1 | A nonlinear activation centered around zero. |
| Softmax | exp(z_i)/sum(exp(z_j)) | A normalized distribution across mutually exclusive classes. |

At z = 0, sigmoid gives 0.5; tanh gives 0; ReLU gives 0. For two equal softmax scores `[0,0]`, each output is `1/(1+1) = 0.5`. Softmax probabilities sum to 1 across that class axis; independent sigmoid outputs need not.

**Linear-layer trap:** if h = A×x+a and output = B×h+b, substitution gives `(B×A)×x + (B×a+b)`. Without an intervening nonlinearity, this is still one linear-plus-offset calculation.

### Output and loss contracts

A **logit** is a raw classification score before probability conversion.

| Task | Common output setup | Common loss |
|---|---|---|
| Numerical regression | One linear output per numerical target | MSE or MAE |
| Binary classification | One sigmoid probability | Binary cross-entropy |
| Multiclass classification | Softmax vector over classes | Categorical or sparse categorical cross-entropy |
| Multilabel classification | Independent sigmoid per label | Binary cross-entropy per label |

Some loss implementations can accept raw logits instead. If `from_logits=True`, supply logits; if false, supply the required probability representation. Do not apply a probability activation and then falsely declare its output to be raw logits. [TensorFlow binary cross-entropy reference](https://www.tensorflow.org/api_docs/python/tf/keras/losses/BinaryCrossentropy).

## 7. ANN architecture and parameter counts

An **Artificial Neural Network**, ANN, connects neurons in layers:

```text
Input features → hidden representations → output prediction
```

An **input layer** supplies features. A **hidden layer** makes intermediate outputs. The **output layer** has the form required by the task. A feedforward network moves information forward through these connections.

A **Dense**, or fully connected, layer connects each input to every unit in that layer. With n inputs and m units:

```text
weights = n×m
biases = m, when one bias per unit is enabled
total = (n+1)×m
```

**Example:** three input features → four hidden units → one output:

- Hidden layer: 3×4 weights + 4 biases = 16 parameters.
- Output layer: 4×1 weights + 1 bias = 5 parameters.
- Model total = **21 trainable parameters** with these biases enabled.

For a batch of 32 examples, the same 21 parameters are reused. Batch size does not multiply parameter count. The hidden output shape is `(32,4)`; final output shape is `(32,1)`.

**Flatten** changes shape, for example a 2×2 input into four values. It does not itself introduce Dense weights. More parameters increase possible model flexibility; they do not guarantee better performance on unseen data.

## 8. Training: prediction, loss, gradient, update

Training repeats four distinct steps:

1. **Forward propagation:** calculate predictions with the current parameters.
2. **Loss calculation:** compare predictions with known targets.
3. **Backpropagation:** calculate how parameter changes locally affect the loss.
4. **Optimizer update:** change parameters using those gradients and an update rule.

A **gradient** collects derivatives: local rates of loss change with respect to parameters. A positive derivative means a small increase in that parameter locally increases the loss. Gradient descent moves in the opposite direction:

```text
new parameter = old parameter − learning_rate × gradient
```

**Backpropagation calculates gradients. The optimizer applies updates.** In some informal descriptions both are grouped as “training,” but their jobs differ.

### One complete numerical update

Use one input x = 1, target y = 0.5, weight w = 2, and bias fixed at 0. Define loss as squared error for this example.

```text
prediction = w×x = 2
error = prediction−target = 1.5
loss = error² = 2.25
```

The loss changes at rate `2×error` with respect to prediction. The prediction changes at rate x with respect to w. The chain rule multiplies those rates:

```text
gradient for w = 2×error×x = 2×1.5×1 = 3
learning rate = 0.1
new w = 2−0.1×3 = 1.7
```

With bias still fixed at zero, the new prediction is 1.7 and the new squared loss is `(1.7−0.5)² = 1.44`. This particular step improves the loss. Updating a trainable bias as well would require its own gradient and would produce a different prediction.

A very large learning rate can overshoot and increase the loss. A small rate can make progress slow. General neural-network optimization is not guaranteed to find the global best solution.

### Batch, iteration, and epoch

A **batch** is a group of examples used for a training step. An **iteration** here means one optimizer step. An **epoch** is one pass through the training dataset.

| Gradient method | Examples used per update |
|---|---|
| Batch gradient descent | Entire training dataset. |
| Stochastic gradient descent | One example. |
| Mini-batch gradient descent | A smaller group of examples. |

For 100 samples and batch size 32, an ordinary full pass has batches of 32,32,32,4: four steps per epoch when the remainder is kept. Five epochs then have 20 steps. Dropping the remainder would change the count.

An optimizer such as Adam uses a more detailed update rule than plain gradient descent. It still depends on the calculated gradients. No optimizer choice guarantees success.

## 9. TensorFlow: tensors, shapes, and gradients

**TensorFlow** provides numerical operations and automatic differentiation. **Keras** provides higher-level model and training interfaces, including `tf.keras`.

A **tensor** is a numerical value with a shape and a data type, or dtype. Its **rank** is the number of axes, not the number of entries.

| Example | Rank | Shape |
|---|---|---|
| Scalar 5 | 0 | `()` |
| Vector [1,2,3] | 1 | `(3,)` |
| Matrix with two rows and three columns | 2 | `(2,3)` |
| Batch of 32 examples, each with 3 features | 2 | `(32,3)` |

`tf.constant` creates a tensor value. `tf.Variable` stores a value that can be updated and is commonly used for learned parameters. Compatible dtype and shape matter for operations; a shape does not describe what the data means by itself.

### Read an automatic-differentiation example

```python
import tensorflow as tf
w = tf.Variable(3.0)
with tf.GradientTape() as tape:
    value = w * w
slope = tape.gradient(value, w)
# value is 9.0; slope is 6.0.
```

`GradientTape` records suitable operations. The derivative of w² is 2w, so at w = 3 the gradient is 6. This code computes a derivative; it does not apply a training update.

Tensor multiplication with `*` is elementwise for compatible tensors. Matrix multiplication, such as `tf.matmul`, combines rows and columns. Those operations generally produce different results.

## 10. Keras: build, compile, fit, evaluate, predict

```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(3,)),
    tf.keras.layers.Dense(4, activation="relu"),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer="adam", loss="mse")

x_train = tf.constant([[0.,0.,0.], [1.,0.,0.],
                       [0.,0.,1.], [1.,1.,1.]])
y_train = tf.constant([[0.], [2.], [1.], [3.]])
x_test = tf.constant([[2.,0.,0.], [2.,1.,1.]])
y_test = tf.constant([[4.], [5.]])

model.fit(x_train, y_train, epochs=2, batch_size=2, verbose=0)
test_loss = model.evaluate(x_test, y_test, verbose=0)
predictions = model.predict(x_test, verbose=0)
```

Read the code in this order:

1. **Build:** each example has three features. Dense(4) produces four hidden outputs. Dense(1) produces one numerical regression prediction. Its default activation is linear.
2. **Compile:** choose the optimizer and loss. This configures training; it does not learn from the dataset.
3. **Fit:** train using the four supplied training examples. Two batches per epoch and two epochs give four update steps in this example.
4. **Evaluate:** compare predictions with targets for the two separate test examples and report loss.
5. **Predict:** return the numerical outputs for those examples, with shape `(2,1)`.

The model has the 21 parameters calculated in section 7. `shape=(3,)` describes one example; it excludes the batch axis.

These tiny arrays demonstrate the workflow. They do not establish that two epochs produce accurate predictions, and exact outputs depend on initialization and training. Reading this code is sufficient for its MCQ concepts; running a training project is not a prerequisite here.

## 11. Evaluation: examine the right mistakes

Choose one class as **positive**. For spam detection, let positive mean spam:

| Actual class | Predicted positive | Predicted negative |
|---|---|---|
| Positive | True positive, TP | False negative, FN |
| Negative | False positive, FP | True negative, TN |

TP: spam correctly detected. FP: ordinary email incorrectly called spam. FN: spam missed. TN: ordinary email correctly rejected as spam.

```text
Accuracy  = (TP+TN)/(TP+TN+FP+FN)
Precision = TP/(TP+FP)
Recall    = TP/(TP+FN)
F1        = 2TP/(2TP+FP+FN)
```

**Precision:** of the positive predictions, how many are actually positive? **Recall:** of the actual positive examples, how many were found? F1 combines precision and recall using their harmonic mean when defined.

For TP=8, FP=2, FN=4, TN=6:

- Accuracy = 14/20 = 0.7.
- Precision = 8/10 = 0.8.
- Recall = 8/12 ≈ 0.667.
- F1 = 16/22 ≈ 0.727.

Check a denominator before dividing. A zero denominator needs an explicit convention; it does not yield an ordinary fraction automatically.

### Class imbalance

Suppose 90 of 100 emails are ordinary and 10 are spam. Predicting ordinary for every email gives 90% accuracy but zero spam recall. A high overall score can hide complete failure on a rare class.

Use the metric relevant to the cost of errors. Missing urgent disease cases raises a recall concern; falsely blocking legitimate mail raises a precision concern. This is a task decision rather than a universal best metric.

### Underfitting and overfitting

**Underfitting:** the model fails to capture useful patterns, often producing poor training and validation performance. **Overfitting:** the model captures training-specific patterns that do not transfer well.

If training loss keeps falling while validation loss rises, investigate overfitting. Training performance alone cannot establish generalization, meaning useful performance on new examples.

Possible remedies:

- **More representative data:** improve evidence about the actual task.
- **Suitable model size:** reduce unnecessary flexibility when appropriate.
- **Regularization:** penalize or constrain overly complex parameter choices, such as with weight penalties.
- **Dropout:** randomly omit selected activations during training to reduce some dependencies.
- **Early stopping:** stop based on validation behavior instead of continuing to improve only training loss.

These methods can help; none guarantees generalization. Preserve an independent test set for final assessment.

## Final recall sheet

- A feature is input; a target is the known training answer.
- Regression predicts a quantity; classification predicts categories, even with numeric class IDs.
- Parameters are learned; hyperparameters are selected settings.
- Split before fitting learned preprocessing. Training fits, validation selects, test assesses.
- Linear prediction: weighted inputs plus bias. MSE averages squared errors.
- Logistic regression is classification. Threshold converts a score into a class decision.
- Neuron: weighted sum, then activation. Nonlinear hidden activations increase representational ability.
- Dense(n inputs, m units) has nm+m parameters when biases are enabled.
- Forward calculates predictions; loss measures disagreement; backprop calculates gradients; optimizer updates.
- Tensor rank counts axes. Shape describes axis lengths; dtype describes numerical type.
- Compile configures; fit trains; evaluate reports loss/metrics; predict returns outputs.
- Match logits/probabilities, output shape, target representation, and loss.
- Precision counts FP in its denominator; recall counts FN. Check class imbalance and zero denominators.
- Good training performance alone is not evidence of good unseen-data performance.

## Included MCQ practice

Calculate each answer before opening its explanation. Every tested concept is explained above.

<!-- FS-MCQ-START -->

**ai explnation due to lack of material** — original study questions, not past-paper questions. There are 15 questions in this file.

### Question 1

A model predicts pass or fail, stored as 0 or 1. What task is described?

- **A.** Regression merely because labels are numbers
- **B.** Unsupervised learning in every case
- **C.** A communication-channel code
- **D.** Classification

<details>
<summary>Answer and explanation</summary>

**D. Classification**

The values represent categories. Numeric encoding does not change the target’s meaning. Predicting a numerical score would instead be regression; predicting its pass/fail category is classification.

</details>

### Question 2

Actual values are [10,20,30], predictions are [8,22,29]. What is MSE?

- **A.** 3
- **B.** 1/3
- **C.** 9
- **D.** 0

<details>
<summary>Answer and explanation</summary>

**A. 3**

The residuals are 2, -2, and 1. Their squares are 4, 4, and 1, totaling 9. Divide by three examples to get MSE 3. Signed residual cancellation is not the MSE operation.

</details>

### Question 3

Which output arrangement is typical for several mutually exclusive classes?

- **A.** A Hamming parity bit
- **B.** Softmax over the class scores
- **C.** One unrestricted regression number with no decision rule
- **D.** A required Set object

<details>
<summary>Answer and explanation</summary>

**B. Softmax over the class scores**

Softmax normalizes the class-score vector into values that sum to one. Selecting a class then uses a decision rule such as the largest value. Independent multilabel decisions often use separate sigmoid outputs instead.

</details>

### Question 4

Which order matches the stated neuron formula?

- **A.** Add the learning rate to every input and stop
- **B.** Count epochs before doing any multiplication
- **C.** Multiply inputs by weights, sum, add bias, apply activation
- **D.** Apply activation to the class label, then delete inputs

<details>
<summary>Answer and explanation</summary>

**C. Multiply inputs by weights, sum, add bias, apply activation**

The pre-activation sum combines weighted inputs and bias. The activation transforms that combined value. Applying the activation separately to each raw input would define a different calculation.

</details>

### Question 5

What is ReLU applied to [-2,0,3]?

- **A.** [-2,0,3]
- **B.** [2,0,3]
- **C.** [0.5,0.5,0.5]
- **D.** [0,0,3]

<details>
<summary>Answer and explanation</summary>

**D. [0,0,3]**

ReLU keeps each positive input and maps each negative input to zero. At zero it outputs zero. It is not absolute value, so -2 does not become 2.

</details>

### Question 6

Does increasing the batch size multiply a Dense layer’s learned parameter count?

- **A.** No; examples reuse the same weights and biases
- **B.** Yes, every example permanently adds new weights
- **C.** Only for a batch of two
- **D.** The batch size is always the number of classes

<details>
<summary>Answer and explanation</summary>

**A. No; examples reuse the same weights and biases**

The batch contains more examples, not more model units. Each example uses the same parameter values. Intermediate tensor sizes can change with batch size while the learned parameter count remains fixed.

</details>

### Question 7

What is an epoch?

- **A.** One test example in every model
- **B.** One pass through the training examples
- **C.** Always one parameter update
- **D.** One class label

<details>
<summary>Answer and explanation</summary>

**B. One pass through the training examples**

An epoch covers the training data once. With mini-batches, that pass can include many updates. Batch size and training-set size determine how examples are grouped during the pass.

</details>

### Question 8

A model has one linear numerical output and uses MSE. Which task is this example configured for?

- **A.** JSON serialization
- **B.** Stop-and-Wait acknowledgment
- **C.** Regression
- **D.** Mutually exclusive ten-class classification

<details>
<summary>Answer and explanation</summary>

**C. Regression**

The output represents one unrestricted numerical prediction, and MSE measures its numerical error against a target. A ten-class classifier would need an appropriate class-output contract and matching loss.

</details>

### Question 9

A dataset has 90 negative and 10 positive examples. Always predicting negative gives what accuracy and positive recall?

- **A.** 100% accuracy, 1 recall
- **B.** 10% accuracy, 1 recall
- **C.** 0% accuracy, 0.9 recall
- **D.** 90% accuracy, 0 recall

<details>
<summary>Answer and explanation</summary>

**D. 90% accuracy, 0 recall**

Ninety negative predictions are correct, so accuracy is 90/100. None of the ten positives is found, so recall is 0/10. The common class hides the complete positive-class failure in the overall accuracy.

</details>

### Question 10

An ANN has 3 inputs, Dense(4), and Dense(1), with a bias per unit. How many trainable parameters are present?

- **A.** 16
- **B.** 20
- **C.** 32 times the number of examples
- **D.** 21

<details>
<summary>Answer and explanation</summary>

**D. 21**

The hidden layer has 3×4+4 = 16. The output layer has 4×1+1 = 5. Add the layers: 21. Every example reuses these parameters; changing batch size changes the amount of data processed together, not the number of weights.

</details>

### Question 11

In the guide's one-weight example, w=2, gradient=3, and learning rate=0.1. What is the updated weight?

- **A.** 1.7
- **B.** 2.3
- **C.** 0.3
- **D.** 3.0

<details>
<summary>Answer and explanation</summary>

**A. 1.7**

Gradient descent subtracts the scaled gradient: 2−0.1×3 = 1.7. The gradient is a local loss sensitivity, not the new parameter. The example holds the bias fixed; updating a trainable bias would be a separate calculation.

</details>

### Question 12

What does model.compile configure?

- **A.** The number of test answers already known
- **B.** The optimizer, loss, and selected metrics
- **C.** A completed fit of all weights to training examples
- **D.** Only held-out predictions

<details>
<summary>Answer and explanation</summary>

**B. The optimizer, loss, and selected metrics**

Compile selects how training and reporting will work. It does not itself fit the training dataset. Fit performs parameter updates; evaluate measures supplied-data loss/metrics; predict returns output values.

</details>

### Question 13

A binary model outputs sigmoid probabilities. Which ordinary BinaryCrossentropy setting matches them?

- **A.** The setting never depends on the output
- **B.** Use integer class IDs as the sigmoid input
- **C.** from_logits=False
- **D.** from_logits=True

<details>
<summary>Answer and explanation</summary>

**C. from_logits=False**

A sigmoid output is a probability representation, not a raw logit. The loss must be told which representation it receives. A logits-based setup can instead omit the output sigmoid and use from_logits=True.

</details>

### Question 14

For 100 samples and batch size 32, with the remainder kept, how many optimizer steps occur in one ordinary epoch?

- **A.** 3
- **B.** 32
- **C.** 100
- **D.** 4

<details>
<summary>Answer and explanation</summary>

**D. 4**

The batches contain 32,32,32,4 examples. Each batch gives one step, so there are four. An epoch is one pass over the dataset, not one batch. A setup that drops the incomplete batch would have a different count.

</details>

### Question 15

Which preparation helps preserve an independent assessment?

- **A.** Split data first; fit learned preprocessing on training data
- **B.** Use test labels to select every model repeatedly
- **C.** Normalize using every held-out sample before splitting
- **D.** Report only training accuracy

<details>
<summary>Answer and explanation</summary>

**A. Split data first; fit learned preprocessing on training data**

Learning preprocessing from held-out data can leak information into the training workflow. Fit such rules using training data and apply them to other sets. Validation guides selection; the final test set should remain separate from repeated choices.

</details>

<!-- FS-MCQ-END -->

## Optional source references

These record the guide's basis. They are optional for this study route.

- [College Unit I Part 1](KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf): neurons and ANN, pages 16–33; loss, gradients and backpropagation, 34–49; TensorFlow, 52–54.
- [College Unit I Part 2](KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf): regression, pages 2–10; classification and model workflow, 10–21.
- [Earlier supervised-learning notes](SUPERVISED_LEARNING_REGRESSION.pdf): linear/logistic distinctions and metrics.
- [TensorFlow: regression](https://www.tensorflow.org/tutorials/keras/regression), [classification](https://www.tensorflow.org/tutorials/keras/classification), [automatic differentiation](https://www.tensorflow.org/guide/autodiff).
- [TensorFlow: training and evaluation methods](https://www.tensorflow.org/guide/keras/training_with_built_in_methods).
