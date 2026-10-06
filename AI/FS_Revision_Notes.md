# Artificial Intelligence: FS revision notes

For the screening test on **9 October 2026**. Scope: Regression · Classification · TensorFlow · ANN.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Visual study website](../Subjects/visualize/README.md)

## How to use these notes

Decide what the target means. Then calculate a neuron output and a loss by hand. Finally trace training, evaluation, and the TensorFlow/Keras calls that perform those steps.

Read the quick table first. For each topic, cover the result and work through the example. Explain the MCQ trap in your own words. Finish with the short self-check at the end.

**Teaching provenance: ai explnation due to lack of material.** These are AI-authored explanations and examples, not verbatim college notes. Each topic identifies whether the selected college material covers it, covers it partly, or lacks a focused explanation. The label does not mean that every underlying topic is missing. The writing uses short, direct explanations inspired by ASD-STE100, with technical terms explained through concrete steps.

The notice gives topic names, not an exact question distribution. These notes are revision aids and do not predict the test paper.

## Quick recall

| Topic | Explain it this way |
|---|---|
| Regression / classification | Predict a numerical quantity / predict a category. Numeric category IDs still represent classes. |
| Linear neuron | Compute z = sum(w_i*x_i) + b, then apply the chosen activation. |
| MSE | Square each prediction error, sum the squares, then divide by the number of examples. |
| Logistic regression | A classification model despite its name. A threshold converts a score into a class decision. |
| ReLU / sigmoid / softmax | max(0,z) / a value between 0 and 1 / a normalized vector across classes. |
| Dense parameters | input_count × unit_count + unit_count, when each unit has a bias. |
| Training | Forward prediction → loss → backpropagated gradients → optimizer update. |
| Epoch / batch | One pass over the training dataset / a group used for a training step. |
| Validation / test | Validation guides choices. A held-out test set estimates performance after those choices. |
| Precision / recall | TP/(TP+FP) / TP/(TP+FN). Check for a zero denominator. |

## Reading order

1. Data, targets and learning tasks
2. Regression and mean squared error
3. Classification and logistic regression
4. An artificial neuron
5. Activation functions and output contracts
6. ANN layers and parameter counts
7. Loss, gradients and parameter updates
8. TensorFlow and Keras workflow
9. Accuracy, confusion matrices and overfitting

## 1. Data, targets and learning tasks

**Main idea:** Decide what the output means before choosing a model.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Supervised learning uses examples with inputs and known target values. The model learns a mapping that should also work on unseen examples.

Regression predicts a numerical quantity, such as a price. Classification predicts a category, such as spam or not spam.

A category can be stored as a number. A label 0 or 1 does not automatically make the task regression.

Split data before fitting data-dependent preprocessing. Fit transformations on training data, then apply them to validation and test data.

### Worked example

```text
Input: hours studied
Regression target: predicted examination score
Classification target: pass or fail
```

**Result and interpretation:** The meaning of the target determines the learning task.

### Follow the steps

1. **Define output:** Choose score or pass/fail. These contracts need different prediction interpretations.
2. **Split examples:** Create separate training, validation and test sets. Preserve unseen examples for evaluation.
3. **Fit on training data:** Learn parameters and preprocessing from training examples. Avoid using future evaluation information.
4. **Evaluate:** Compare predictions with unseen targets. Training success alone is insufficient.

**Why this works:** The target contract determines appropriate outputs, losses, and evaluation. Numeric storage alone does not specify the task.

**MCQ trap:** Repeatedly selecting a model based on test results leaks information from the test set. Keep a final test set for a later evaluation.

| Distinction | Meaning |
|---|---|
| Feature | An input used to make a prediction. |
| Target / label | The known outcome used during supervised training. |
| Training set | Examples used to fit parameters. |
| Validation / test | Model selection feedback / later evaluation of the selected model. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>); [SUPERVISED_LEARNING_REGRESSION.pdf](<../AI/SUPERVISED_LEARNING_REGRESSION.pdf>).

## 2. Regression and mean squared error

**Main idea:** Calculate a prediction and measure its numerical error.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A simple linear regression model predicts y-hat = w x + b. The weight controls the slope, and the bias controls the intercept.

The residual is the difference between an actual target and its prediction. Mean squared error averages the squared residuals.

Squaring prevents positive and negative errors from canceling. It also makes large residuals contribute more strongly than small ones.

### Worked example

```text
Actual: [10, 20, 30]
Predicted: [8, 22, 29]
Residuals: [2, -2, 1]
MSE = (4 + 4 + 1) / 3
```

**Result and interpretation:** MSE = 3.

### Follow the steps

1. **Predict:** The model outputs 8, 22, 29. Compare predictions with the matching targets.
2. **Subtract:** Residuals are 2, -2, 1. Use the same actual-minus-predicted convention throughout.
3. **Square:** Squared residuals are 4, 4, 1. Signs no longer cancel.
4. **Average:** 9 / 3 = 3. Divide by the number of predictions.

**Why this works:** The average uses squared magnitudes rather than signed differences. Every selected squared error contributes a nonnegative amount.

**MCQ trap:** A linear output is common for unrestricted numerical predictions. MSE is a loss value, not an accuracy percentage, and has squared target units.

| Distinction | Meaning |
|---|---|
| Weight w | Changes prediction as x changes. |
| Bias b | Shifts the prediction even when x is zero. |
| MSE | Average squared numerical error. |
| MAE | Average absolute numerical error. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>); [SUPERVISED_LEARNING_REGRESSION.pdf](<../AI/SUPERVISED_LEARNING_REGRESSION.pdf>).

**Official references:** [TensorFlow: regression](https://www.tensorflow.org/tutorials/keras/regression).

## 3. Classification and logistic regression

**Main idea:** Distinguish a score, a probability and a class decision.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A classifier predicts categories. Binary classification has two alternatives. Multiclass classification selects among more than two mutually exclusive classes.

Binary logistic regression applies a sigmoid to a linear score. Despite its name, it is normally used for classification.

A threshold converts a probability into a class decision. A threshold of 0.5 is common, but the costs of different errors can justify another threshold.

For mutually exclusive classes, softmax can normalize scores into values that sum to one. Multilabel tasks can instead use separate sigmoid outputs.

### Worked example

```text
P(spam) = 0.70
Rule: predict spam if probability ≥ 0.50
Prediction: spam
```

**Result and interpretation:** The 0.70 score becomes a class only after applying the decision rule.

### Follow the steps

1. **Read features:** An email is represented by numeric features. The text must be converted into usable inputs.
2. **Calculate a score:** The model computes a weighted score. Weights and bias define this calculation.
3. **Apply sigmoid:** The estimated spam probability is 0.70. Map the score into the interval between 0 and 1.
4. **Apply the threshold:** 0.70 ≥ 0.50, so predict spam. The threshold creates the discrete decision.

**Why this works:** The model estimates a score from features. The decision rule connects that score to the required output category.

**MCQ trap:** A high score is not a guarantee that this particular prediction is correct. Threshold choice and probability calibration are separate concerns.

| Distinction | Meaning |
|---|---|
| Binary | Choose between two classes. |
| Multiclass | Choose one of several mutually exclusive classes. |
| Multilabel | Several labels can be true for the same example. |
| Logistic regression | A classification model based on a transformed linear score. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>); [SUPERVISED_LEARNING_REGRESSION.pdf](<../AI/SUPERVISED_LEARNING_REGRESSION.pdf>).

**Official references:** [TensorFlow: classification](https://www.tensorflow.org/tutorials/keras/classification).

## 4. An artificial neuron

**Main idea:** Multiply, add a bias, then apply an activation.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

An artificial neuron combines inputs using weights, adds a bias, and applies an activation function.

The pre-activation value is z = sum(w_i x_i) + b. The output is f(z). The activation determines how the combined value becomes an output.

Weights are learned parameters. A negative weight reduces the weighted sum for a positive input, but its practical effect depends on the other inputs.

### Worked example

```text
x = [2, 3]; w = [0.5, -1]; b = 1
z = 2 × 0.5 + 3 × (-1) + 1 = -1
ReLU(z) = max(0, -1)
```

**Result and interpretation:** The neuron output is 0 when its activation is ReLU.

### Follow the steps

1. **Multiply:** Contributions are 1 and -3. Use the corresponding input and weight pairs.
2. **Sum:** The weighted sum is -2. Combine all contributions.
3. **Add bias:** z = -2 + 1 = -1. The bias shifts the sum.
4. **Activate:** ReLU(-1) = 0. The negative input is mapped to zero.

**Why this works:** Each multiplication measures one input’s contribution. The bias shifts the combined value; the activation then transforms it.

**MCQ trap:** Do not apply the activation separately to each input in this neuron formula. Also, a biological-neuron analogy does not describe every implementation detail.

| Distinction | Meaning |
|---|---|
| Input | A feature or an output from an earlier layer. |
| Weight | A multiplier learned during training. |
| Bias | An added learned offset. |
| Activation | The function applied to the combined value. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf>).

## 5. Activation functions and output contracts

**Main idea:** Choose the function by the required behavior.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

ReLU returns max(0, z). Sigmoid returns a value between 0 and 1. tanh returns a value between -1 and 1.

Nonlinear hidden activations allow a network to represent relationships that stacked linear transformations alone cannot represent.

Output choices depend on the task. Linear outputs are common for regression, sigmoid for binary probability, and softmax for mutually exclusive classes.

### Worked example

```text
z = [-2, 0, 3]
ReLU(z) = [0, 0, 3]
For equal softmax scores [0, 0], outputs are [0.5, 0.5].
```

**Result and interpretation:** Activation changes the representation; the chosen output contract determines its interpretation.

### Follow the steps

1. **Read hidden score:** z = -2. This value was produced by weights and a bias.
2. **Apply ReLU:** The hidden output becomes 0. A negative score is suppressed.
3. **Build output scores:** The final layer produces equal scores [0, 0]. These are two class scores in a separate output example.
4. **Apply softmax:** Probabilities become [0.5, 0.5]. The normalized outputs sum to one.

**Why this works:** Composition of linear transformations remains linear. A nonlinear transformation changes the family of relationships that the network can express.

**MCQ trap:** Softmax is not the usual choice for independent multilabel decisions. Loss functions must agree with whether the model returns probabilities or raw logits.

| Distinction | Meaning |
|---|---|
| ReLU | Zero for a negative input; identity for a positive input. |
| Sigmoid | One bounded output, often for binary probability. |
| Softmax | Normalize a vector for mutually exclusive classes. |
| Linear | No activation transformation; useful for unrestricted numerical output. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf>); [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>).

## 6. ANN layers and parameter counts

**Main idea:** Follow shapes and count weights before training.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

An artificial neural network connects layers of units. A Dense layer connects each input feature to each unit in that layer.

With n inputs and m units, a Dense layer has n × m weights. With one bias per unit, it also has m biases.

The total is (n + 1) × m when biases are enabled. The batch dimension counts examples; it does not multiply the number of model parameters.

### Worked example

```text
Dense layer: 3 input features, 4 units
Weights = 3 × 4 = 12
Biases = 4
Total trainable parameters = 16
```

**Result and interpretation:** Each example produces four outputs from this layer.

### Follow the steps

1. **Read input shape:** One example has 3 features. Count features independently of batch size.
2. **Connect units:** Each of 4 units receives all 3 features. The layer needs 12 weights.
3. **Add biases:** Each unit has one bias. There are 4 more parameters.
4. **Count and output:** 16 parameters; 4 outputs per example. Weights are shared across the batch.

**Why this works:** Every output unit needs one weight for each input plus its own bias. The same learned parameters are reused for every example in a batch.

**MCQ trap:** Flatten changes shape without learning Dense weights. More parameters can increase capacity but do not guarantee better unseen-data performance.

| Distinction | Meaning |
|---|---|
| Input layer | Supplies features. |
| Hidden layer | Builds intermediate representations. |
| Output layer | Produces predictions with the task’s shape. |
| Batch dimension | The number of examples processed together. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf>); [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>).

## 7. Loss, gradients and parameter updates

**Main idea:** Separate measuring error from changing parameters.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Forward propagation calculates a prediction from the current parameters. A loss compares that prediction with the training target.

Backpropagation calculates gradients through the network using the chain rule. An optimizer uses those gradients to update parameters.

A gradient describes how the loss changes locally with a parameter. Gradient descent subtracts a learning-rate-scaled gradient.

For one squared-error example, prediction is w x. The chain rule combines the loss change per prediction with the prediction change per weight.

An epoch is one pass through the training data. A batch is a group of examples used for an update in mini-batch training.

### Worked example

```text
x = 1; target = 0.5; w = 2; bias = 0
prediction = w × x = 2
loss = (prediction - target)² = 2.25
gradient = 2 × (prediction - target) × x = 3
learning rate = 0.1
w_new = 2 - 0.1 × 3
```

**Result and interpretation:** w_new = 1.7.

### Follow the steps

1. **Forward pass:** With x = 1 and w = 2, prediction is 2. The bias is zero in this one-weight example.
2. **Measure loss:** Target is 0.5; squared loss is 2.25. Square the difference 2 - 0.5.
3. **Calculate gradient:** The gradient for w is 2 × (2 - 0.5) × 1 = 3. The chain rule multiplies 2 × prediction error by the input x.
4. **Update:** w becomes 1.7. Subtract 0.1 × 3 from the old weight.

**Why this works:** The positive gradient says a small increase in w would increase the local loss. Subtracting the gradient moves in the opposite local direction.

**MCQ trap:** A large learning rate can overshoot. An update is not guaranteed to reduce every individual example’s loss or find the global best solution.

| Distinction | Meaning |
|---|---|
| Forward pass | Produce predictions. |
| Loss | Measure disagreement with targets. |
| Backpropagation | Calculate gradients. |
| Optimizer | Apply a parameter-update rule. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf>); [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>).

**Official references:** [TensorFlow: automatic differentiation](https://www.tensorflow.org/guide/autodiff).

## 8. TensorFlow and Keras workflow

**Main idea:** Distinguish model setup, training, evaluation and prediction.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

TensorFlow provides tensor operations and tools for automatic differentiation. A tensor has a shape and a data type.

tf.keras provides higher-level model building and training interfaces. Sequential arranges layers in a sequence.

compile configures the optimizer, loss, and metrics. fit trains on provided examples. evaluate reports metrics on supplied data. predict produces outputs.

GradientTape records suitable operations to calculate derivatives. TensorFlow code here is conceptual Python; this website does not run a TensorFlow runtime.

### Worked example

```text
import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.Input(shape=(3,)),
    tf.keras.layers.Dense(4, activation="relu"),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer="adam", loss="mse")
# model.fit(x_train, y_train, epochs=5)
# model.evaluate(x_test, y_test)
```

**Result and interpretation:** This model maps three features to one regression output. Training needs compatible numeric arrays.

### Follow the steps

1. **Build:** Create layers for 3 features and 1 output. The model structure determines compatible shapes.
2. **Compile:** Configure Adam and MSE. No training examples are processed by this configuration step.
3. **Fit:** Update parameters using training examples. Targets must match the output contract.
4. **Evaluate and predict:** Measure unseen-data performance, then use outputs. Metrics and raw predictions are different results.

**Why this works:** The layer shapes specify the calculation. compile selects how to measure and update it. fit performs updates; prediction alone does not train the model.

**MCQ trap:** For cross-entropy, match from_logits to the actual output representation. This example uses a linear regression output and MSE, not a classification output.

| Distinction | Meaning |
|---|---|
| Tensor | An array-like numerical value with shape and dtype. |
| compile | Configure training choices. |
| fit | Perform training with supplied data. |
| evaluate / predict | Report metrics / produce model outputs. |

**College sources:** [KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf>); [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>).

**Official references:** [TensorFlow: classification](https://www.tensorflow.org/tutorials/keras/classification); [TensorFlow: automatic differentiation](https://www.tensorflow.org/guide/autodiff).

## 9. Accuracy, confusion matrices and overfitting

**Main idea:** Check unseen behavior and the cost of errors.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Accuracy is the fraction of correct predictions. It can be misleading when one class is much more common than another.

Precision is TP/(TP + FP). Recall is TP/(TP + FN). State which class is treated as positive before interpreting these values.

Overfitting occurs when the model fits training-specific patterns that do not generalize well. Compare training and validation behavior rather than training performance alone.

Regularization, suitable model capacity, better data, and early stopping can help. No single method guarantees generalization.

### Worked example

```text
100 emails: 90 not spam, 10 spam
Predict not spam for every email
Correct = 90; accuracy = 90%
Spam recall = 0 / 10 = 0
```

**Result and interpretation:** High accuracy can coexist with failure to detect every spam email.

### Follow the steps

1. **Count classes:** There are 90 negatives and 10 positives. Treat spam as the positive class.
2. **Predict all negative:** All 10 positive examples are missed. There are no positive predictions.
3. **Calculate accuracy:** 90 / 100 = 90%. Most examples belong to the negative class.
4. **Calculate recall:** TP = 0; FN = 10; recall = 0. The classifier detects no spam despite high accuracy.

**Why this works:** The common negative class dominates the correct-count total. A class-specific metric reveals the failures hidden by the overall percentage.

**MCQ trap:** When a denominator is zero, a precision or recall value needs an explicit handling convention. The test set must remain separate from repeated model selection.

| Distinction | Meaning |
|---|---|
| TP / FP | Positive prediction that is correct / incorrect. |
| FN | A true positive-class example predicted negative. |
| Precision | Of predicted positives, how many are actually positive? |
| Recall | Of actual positives, how many were found? |

**College sources:** [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>); [SUPERVISED_LEARNING_REGRESSION.pdf](<../AI/SUPERVISED_LEARNING_REGRESSION.pdf>).

## Hand calculations to practise once

**ai explnation due to lack of material** — worked revision examples using the college topics.

1. **Neuron:** x = [2, 3], w = [0.5, -1], b = 1. Compute z = 1 - 3 + 1 = -1. With ReLU, the output is 0.
2. **MSE:** targets [10, 20, 30], predictions [8, 22, 29]. Errors are [2, -2, 1]. MSE = (4 + 4 + 1)/3 = 3. Its units are the target units squared.
3. **Dense layer:** 3 inputs, 4 units, one bias per unit. Parameters = 3×4 + 4 = 16. The batch size does not change this count.
4. **One training step:** x = 1, target = 0.5, w = 2, b = 0. Prediction = 2; squared loss = 2.25. The weight gradient is 2(2-0.5)×1 = 3. At learning rate 0.1, the new weight is 2-0.1×3 = 1.7. This example updates the weight while holding the bias fixed.
5. **Metrics:** TP = 8, FP = 2, FN = 4, TN = 6. Precision = 8/10 = 0.8. Recall = 8/12 ≈ 0.667. Accuracy = (8+6)/20 = 0.7.

A high accuracy can hide poor detection of a rare class. If 90 of 100 examples are negative, always predicting negative gives 90% accuracy and zero recall for the positive class.

## Self-check: one question per topic

**ai explnation due to lack of material** — original revision questions, not past-paper questions. Try them before opening the answer. The full website provides four questions per topic.

### 1. Data, targets and learning tasks

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

### 2. Regression and mean squared error

For y-hat = 2x + 3 and x = 4, what is the prediction?

- **A.** 8
- **B.** 7
- **C.** 14
- **D.** 11

<details>
<summary>Answer and explanation</summary>

**D. 11**

Multiply the input 4 by the weight 2 to obtain 8, then add bias 3. The prediction is 11. The actual target would be needed separately to calculate a prediction error.

</details>

### 3. Classification and logistic regression

Why is logistic regression normally a classification method?

- **A.** Its name guarantees a continuous-value target
- **B.** It has no learned parameters
- **C.** It only predicts network bandwidth
- **D.** It transforms a linear score into a probability used for a class decision

<details>
<summary>Answer and explanation</summary>

**D. It transforms a linear score into a probability used for a class decision**

The usual binary logistic model applies sigmoid to a linear score. A threshold then selects a category. The method’s historical name does not determine the target meaning; the output contract does.

</details>

### 4. An artificial neuron

For x = [2,3], w = [0.5,-1], b = 1, what is z?

- **A.** 0
- **B.** 1
- **C.** -2
- **D.** -1

<details>
<summary>Answer and explanation</summary>

**D. -1**

The contributions are 2 × 0.5 = 1 and 3 × (-1) = -3. Their sum is -2. Adding bias 1 produces z = -1. Activation is a separate next step.

</details>

### 5. Activation functions and output contracts

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

### 6. ANN layers and parameter counts

A Dense layer has 3 input features, 4 units, and biases. How many parameters are there?

- **A.** 12
- **B.** 4
- **C.** 7
- **D.** 16

<details>
<summary>Answer and explanation</summary>

**D. 16**

Each of four units has three input weights, giving 12 weights. Each also has one bias, giving four more parameters. The total is 16.

</details>

### 7. Loss, gradients and parameter updates

w = 2, gradient = 3, learning rate = 0.1. What is one gradient-descent update?

- **A.** 2.3
- **B.** 0.6
- **C.** 3.1
- **D.** 1.7

<details>
<summary>Answer and explanation</summary>

**D. 1.7**

Gradient descent subtracts the learning-rate-scaled gradient. Compute 2 - 0.1 × 3 = 1.7. Adding the gradient would move in the opposite local direction from this descent rule.

</details>

### 8. TensorFlow and Keras workflow

Which Keras method performs training updates on supplied examples?

- **A.** compile
- **B.** predict
- **C.** summary
- **D.** fit

<details>
<summary>Answer and explanation</summary>

**D. fit**

fit runs the training procedure using data and targets. compile configures its loss, optimizer, and metrics. predict produces outputs without the ordinary training update loop.

</details>

### 9. Accuracy, confusion matrices and overfitting

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

## Source reading targets

- [KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf>) — Regression and classification; viewer pages 2–21.
- [SUPERVISED_LEARNING_REGRESSION.pdf](<../AI/SUPERVISED_LEARNING_REGRESSION.pdf>) — Linear and logistic regression; viewer pages 2–3 and 14–19.
- [KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf](<../AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf>) — ANN foundations, training and TensorFlow; viewer pages 16–54.

College files can include material outside the announced topics. Read the selected sections. The examples above use fixed inputs for explanation; some original class examples use random outcomes.
