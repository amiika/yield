# Synopsis of the Yield Language

Yield is a **concatenative, stack-based** programming language. Instead of writing `add(2, 3)`, you push values onto a shared data stack and then apply an operator: `2 3 +`. This is called Reverse Polish Notation (RPN), and it's used for everything in Yield.

The language has only one data structure: the stack. Programs themselves are just lists of operations, called **quotations**, written inside square brackets like `[dup *]`. These quotations can be treated as data or executed by special operators called **combinators**. This approach eliminates the need for named function arguments, leading to a simple and powerful algebra.

There is no difference between data and code. You can define new words in the language's dictionary using the `=` operator. For example, `[dup *] square =` creates a new `square` operator that you can use immediately.

While purely functional, Yield introduces a powerful `yield` combinator. This allows for creating stateful generators in a controlled way, making it easy to build sequences, state machines, and other evolving systems with simple, composable blocks.

## Introduction

To add two integers, say 2 and 3, you type the program:

```
1 1 + # + is add operator
```

Press debug (?) to see it in action. This is how it works: the numeral `2` is pushed onto a stack. Then, `3` is pushed on top of that. Finally, the `+` operator pops the two integers, adds them, and pushes their sum, 5, back onto the stack. The notation is ordinary postfix, also known as Reverse Polish Notation.

To compute the square of the sum of 2 and 3, the sum has to be multiplied by itself.

```
2 3 + dup *
```

After the sum is computed, the stack contains the integer 5. The `dup` operator pushes another copy of 5 onto the stack. Then the multiplication operator `*` replaces the two 5s with their product, 25.

Yield is a spiritual successor of Forth and Joy programming languages in both concatenative and functional realms. The language keeps true to the dynamic powers of Forth allowing redefinition of everything in good and evil:
```
world hello =
hello # -> world
2 1 = # 1 is 2
1 1 + # 1 + 1 is 4
- + = # + is -
1 1 + # 1 + 1 is now 0
```

## Data Types of Yield

The data types of Yield are divided into simple and aggregate types. The simple types are integers, floating-point numbers, characters, and booleans. Literals of any type are pushed onto the default stack or hid away in the shadow state.

### Aggregate Types

Stacks are ordered sequence of zero or more values of any type. Literals are written inside square brackets, like `[peter paul mary]` or `[42 true {2 5}]`. Lists can contain mixtures of types, including other lists.

Many operators work across aggregate types. For example, `concat` joins two lists or two strings.

```
[1 2 3] [4 5 6] concat  # -> [1 2 3 4 5 6]
```

## Quotations and Combinators

Lists are a special case of **quoted programs**. A quotation can be treated as passive data (a list) or be executed as an active program. The square brackets prevent immediate execution.

A **combinator** is an operator that expects a quotation on the stack and executes it in a specific way. One of the most common is `map`, which applies a quoted program to each element of a list.

```
[1 2 3 4] [dup *] map  # -> [1 4 9 16]
```

## State, Functions, and Evolution

Mainstream functional languages are based on the lambda calculus, using lambda abstraction and application, which requires an environment to map formal parameters to actual parameters. Yield, like Joy and Forth, eliminates the need for an environment.

### Defining Words with `=`

New functions (called "words") are defined by assigning a quotation to a name. The `=` operator (`popto`) performs this assignment. Since there are no formal parameters, a word's definition is simply the sequence of operations it performs on the stack.

```
# Define a new word 'square' that duplicates and multiplies
[dup *] square =

# Use it
5 square  # -> 25
```

This creates a simple, powerful system where everything is data that can be manipulated until a combinator or the interpreter itself executes it.

### Evolving shadow stacks with `yield`

While Yield is purely functional, it provides a disciplined way to modify the shadow stack through the `yield` combinator. This operator acts as a generator: it applies a program to update a state variable, and then pushes the **new** value to the stack.

Here, we define a simple counter. `state` holds the current value. Each call to `next` increments the state and then yields the new value.

```
# 1. Initialize a state variable to 0
0 state =

# 2. Define the incrementing logic
[succ] combinator =

# 3. Define a word that evolves the state
[combinator state yield] next =

# 4. Call the word multiple times
next next next  # Stack -> 1 2 3
```

Yielding generator combinators can also be defined inline:
```
[[swap dup *] [1 2] yield] boop =
[boop] 3 times
```

This pattern can be used to generate number sequences like Fibonacci, or to manage any kind of evolving state in a controlled, composable manner.

## Recursive Combinators

The `ifte` (if-then-else) combinator enables conditional execution, which is the basis for recursion. Here is a recursive definition of factorial:

```
[ [0 ==] [pop 1] [dup 1 - factorial *] ifte ] factorial =
```

Yield (like Joy) provides powerful recursive combinators like `linrec` (linear recursion) that encapsulate common recursive patterns, often removing the need for an explicit named definition.

```
# Anonymous factorial using linrec
5 [[null?] [succ] [dup pred] [*] linrec] i
```