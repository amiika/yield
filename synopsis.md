# Synopsis of the Yield Language

Yield is a **concatenative, stack-based** live coding language. Instead of writing `2 + 3 or add(2, 3)`, you push values onto a shared data stack and then apply an operator: `2 3 +` using Reverse Polish Notation (RPN). Yield takes inspiration from concatenative languages like Forth and Joy as well as modern live coding notations like TidalCycles and Ziffers. All processing happens in a same thread with excessive yielding, manipulating same dictioqry and global stacks asynchronously without any sense of safety. The implementation of the language relies heavily on AI driven development, utilizing automated testing and multiple models like Gemini, Claude and Copilot.

The language has only one data structure: the stack. Programs themselves are just lists of operations, called **quotations**, written inside parentheses like `(dup *)`. These quotations can be treated as data or executed by special operators called **combinators**. This approach eliminates the need for named function arguments, leading to a simple and powerful algebra.

There is no difference between data and code. You can define new words in the language's dictionary. The `=` operator is for defining data, while the `=>` operator is for defining executable functions. For example, `(dup *) square =>` creates a new `square` operator that you can use immediately.

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
```

## Data Types of Yield

The data types of Yield are divided into simple and aggregate types. The simple types are integers, floating-point numbers, characters, and booleans. Literals of any type are pushed onto the default stack or hid away in the shadow state.

### Aggregate Types

Stacks are ordered sequence of zero or more values of any type. Literals are written inside parentheses, like `(peter paul mary)` or `(42 true 1.5)`. Lists can contain mixtures of types, including other lists.

Many operators work across aggregate types. For example, `concat` joins two lists or two strings.

```
(1 2 3) (4 5 6) concat  # -> (1 2 3 4 5 6)
```

## Quotations and Combinators

Lists are a special case of **quoted programs**. A quotation can be treated as passive data (a list) or be executed as an active program. The parentheses prevent immediate execution.

A **combinator** is an operator that expects a quotation on the stack and executes it in a specific way. One of the most common is `map`, which applies a quoted program to each element of a list.

```
(1 2 3 4) (dup *) map  # -> (1 4 9 16)
```

## State, Functions, and Evolution

Mainstream functional languages are based on the lambda calculus, using lambda abstraction and application, which requires an environment to map formal parameters to actual parameters. Yield, like Joy and Forth, eliminates the need for an environment.

### Defining Data with `=` and Functions with `=>`

A key design principle in Yield is the explicit separation of data and function definitions.
*   **Use `=` to define data:** The `=` (`popto`) operator assigns a value to a name. If you assign a quotation, it's stored as a list. When you use the name, the list is pushed to the stack.
*   **Use `=>` to define functions:** The `=>` (`quote`) operator defines a quotation as an executable word. When you use the name, the program inside the quotation is executed immediately. This includes special definitions like generators.

```
# Define a new FUNCTION 'square' that duplicates and multiplies
(dup *) square =>

# Use it
5 square  # -> 25

# Define a DATA variable 'my_list'
(1 2 3) my_list =
my_list # -> (1 2 3) is pushed to the stack
```

This creates a simple, powerful system where everything is data that can be manipulated until a combinator or the interpreter itself executes it.

### Evolving shadow states with `yield`

Yield provides a disciplined way to modify a state variable through the `yield` combinator. This operator acts as a generator: it applies a program to a variable, and then pushes the **new** value to the stack.

### Yield the stack

```
1 2 (1 +) yield
```

A generators can be also defined as functions, using the syntax `(STATE PROGRAM yield) name =>`. The `STATE` can be a reference to an existing variable or an inline anonymous value. Functions really just generators that takes data as input, and => is just a shorthand for iterate-combinator.

### Generator with an Existing State Variable
You can create a state variable first using `=` and then define a generator that operates on it. This is clear and explicit.
```
# 1. Initialize a state variable to 0
0 :state =

# 2. Define the generator as an executable function with =>
(:state (succ) yield) next =>

# 3. Call the word multiple times
next next next  # Stack -> 1 2 3
```

### Generator with an Anonymous (Private) State
For self-contained generators, you can define the initial state directly within the definition. This state is private to the generator and cannot be accessed from the outside.
```
# The state '1' is now part of the definition itself.
(1 (succ) yield) counter =>

counter counter # Stack -> 2 3
```
