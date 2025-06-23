---
title: Rust Iterator Adaptors
subtitle: Knowing your `find` from your `filter`
published: 2025-06-16
---

I love Rust, and one of my favourite things about it is the way it pushes you to
rethink loops and containers. Gone are the traditional `for` loops of C++ and
Python, and in their place you get gloriously unreadable code like:

```rust
fn compact(filesystem: &[usize]) -> Vec<usize> {
    let len = filesystem.iter().filter(not_space).count();
    let mut rev_iter = filesystem.iter().rev().filter(not_space);
    filesystem
        .iter()
        .scan(filesystem.iter().rev().filter(not_space), |rev_iter, x| {
            if not_space(&x) {
                Some(*x)
            } else {
                Some(*rev_iter.next().unwrap_or(&SPACE)) // unwrap should never fail
            }
        })
        .take(len)
        .enumerate()
        .map(|(idx, val)| idx * val)
        .sum()
}
```

That's something I wrote for [Day 9 of Advent of Code 2024](https://adventofcode.com/2024/day/9),
and looking back at it, I have no idea what any of it is doing. All of those
chained functions are collectively known as _iterator adaptors_, and they allow
you to perform transformations over collections of data. While I wouldn't
recommend writing anything like this in any production code, it's very useful to
at least understand what each component is doing, as, when used appropriately,
iterator adaptors can lead to really expressive and performant code.

Here I've sketched out a cheat-sheet for some of the most useful iterator
adaptors and when you might want to use them. I may also return to this blog
post and make edits in future if I come across any new tricks.

## The Basics: `map`, `filter`, and Friends

`map` is probably my most used adaptor, and it allows you to apply a transformation
function over each element:

```rust
let xs: Vec<usize> = vec![1, 2, 3];
let ys: Vec<usize> = xs.iter().map(|x: &usize| x + 1).collect();
// Result: [2, 3, 4]
```

I've included type information here to help with clarity. Some things to note:

- For a container filled with type `T`, `.iter()` creates an iterator over type `&T`.
- `.collect()` writes the output of the iterator adaptor chain into a new container.
  
If we don't need the contents of `xs` after this step, we could instead use
`.into_iter()` to get an iterator directly over `T`. As this takes ownership of the
contents of `xs`, it will not be usable in any subsequent lines of code.

The second most common adaptor is `filter`, which returns elements from an iterator
only if some predicate is satisfied:

```rust
let xs: Vec<usize> = vec![1, 2, 3];
let ys: Vec<&usize> = xs.iter().filter(|x: &&usize| *x % 2 == 0).collect();
// Result: [&2]
```

Already things are getting a little weird. Let's break that down:

- The predicate function for `filter` takes the output of the previous adaptor
  by reference, so rather than taking `&usize`, it instead takes `&&usize`.
- We therefore need to dereference `x` inside the predicate function.
- As `filter` passes on its inputs directly, the resulting type is still `&usize`,
  not `usize` as we saw with `map`.

A useful utility for converting `&T` to `T` is `.copied()`:

```rust
let xs: Vec<usize> = vec![1, 2, 3];
let ys: Vec<usize> = xs.iter()
                       .filter(|x: &&usize| *x % 2 == 0)
                       .copied()
                       .collect();
// Result: [2]
```

`.cloned()` works similarly, and should be used when dealing with structs that
can be cloned but not copied.

There's also a special adaptor `filter_map` that combines both `map` and
`filter`. The function it takes is one that returns a type `Option<T>`, 
and anything that evaluates to `None` is discarded:

```rust
let xs: Vec<usize> = vec![1, 2, 3];
let ys: Vec<usize> = xs.iter()
                       .filter_map(|x: &usize| {
                           if x % 2 == 0 {
                               Some(x * 2)
                           } else {
                               None
                           }
                        })
                       .collect();
// Result: [4]
```

Anything that evaluates to `Some(n)` to converted to `n`, while anything that
evaluates to `None` is filtered out. The example above would perhaps be better
written as separate `filter` and `map` calls, but `filter_map` can be really
useful whenever a mapping function returns an `Option` or `Result`. In the
latter case, the function `.ok()` can be used to convert the `Result` to an
option:

```rust
iter.filter_map(|x| return_result_type(x).ok())
```

This can be much cleaner than the equivalent using plain `filter` and `map`:

```rust
iter.map(|x| return_result_type(x))
    .filter(|x| x.is_ok())
    .map(|x| x.unwrap())
```

The next useful adaptor we'll look at is `find`: a variant of `filter` that
stops on finding the first element:

```rust
let xs: Vec<usize> = vec![1, 2, 3];
let ys: &usize = xs.iter()
                   .find(|x: &&usize| *x % 2 == 0)
                   .unwrap();
// Result: &2
```

`iter.find(f)` is equivalent to `iter.filter(f).next()`. There's also 
`iter.find_map(f)`, which is equivalent to `iter.filter_map(f).next()`.

Moving on, the `take` function will continue with some iteration for a set
number of steps:

```rust
let sentence = "The quick brown fox jumped over the lazy dog";
let words: String = sentence
    .split(' ')
    .take(4)
    .collect::<Vec<_>>()
    .join(" ");
// Result: "The quick brown fox"
```

The `.split(' ')` call here returns an iterator over each word, and
`.take(4)` will stop after returning 4 values. We're then collecting
this into a `Vec` before using `.join(" ")` to convert back to a String.

`take_while` is very similar, except that it will continue while some
predicate returns true:

```rust
let sentence = "The quick brown fox jumped over the lazy dog";
let words: String = sentence
    .split(' ')
    .take_while(|s: &&str| !(*s).contains('z'))
    .collect::<Vec<_>>()
    .join(" ");
// Result: "The quick brown fox jumped over the"
```

Similar to `filter_map`, `map_while` is a function that combines a `map`
with `take_while`, and will continue while the mapping function returns
`Some(...)`:

```rust
let sentence = "The quick brown fox jumped over the lazy dog";
let words: String = sentence
    .split(' ')
    .map_while(|s: &str| {
        if s.contains('z') {
            None
        } else {
            Some(s.to_uppercase())  
        }
    })
    .collect::<Vec<_>>()
    .join(" ");
// Result: "THE QUICK BROWN FOX JUMPED OVER THE"
```

Finally, the last basic adaptor we'll look at is `.rev()`, which allows you to
iterate over a container backwards:

```rust
let xs: Vec<usize> = vec![1, 2, 3];
let ys: Vec<usize> = xs.iter().rev().copied().collect();
// Result: [3, 2, 1]
```

Note that this is only implemented for types implementing `DoubleEndedIterator`,
so while this should work fine when iterating over `Vec` or similar containers,
it may not work for all data structures and certainly won't for iterators that
generate data dynamically.

## Chaining and Zipping

A number of functions exist for combining iterators into longer iterators, or for
iterating over multiple data structures simultaneously. We'll start with `chain`,
which allows you to stitch two iterators together:

```rust
let xs: Vec<usize> = vec![0, 1, 2];
let ys: Vec<usize> = vec![3, 4, 5];
let zs: Vec<usize> = xs.iter()
                        .chain(ys.iter())
                        .copied()
                        .collect();
// Result: [0, 1, 2, 3, 4, 5]
```

There is a performance penalty to using `chain`, so it should be used sparingly.
A nice companion to `chain` is `once`, which creates an iterator over a single
value:

```rust
use std::iter::once;
let xs: Vec<usize> = vec![0, 1, 2];
let ys: Vec<usize> = xs.iter()
                       .chain(once(&3))
                       .copied()
                       .collect();
// Result: [0, 1, 2, 3]
```

If you have an iterator over iterables, this can be reduced into a single
iteration using `flatten`:

```rust
let xs: Vec<Vec<usize>> = vec![vec![0, 1], vec![2, 3]];
let ys: Vec<&usize> = xs.iter().flatten().collect();
// Result: [0, 1, 2, 3]
```

`flat_map` is another `map` variant that can be handy for situations where
each iteration creates new iterables:

```rust
let xs: Vec<usize> = vec![0, 1, 2];
let ys: Vec<usize> = xs.iter()
                       .flat_map(|x| {
                           let y = 3 * x;
                           [y, y + 1, y + 2]
                       })
                       .collect();
// Result: [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

If you want to iterate over two different containers at once, you can do so with
`zip`:

```rust
let xs: Vec<usize> = vec![0, 2, 4];
let ys: Vec<usize> = vec![1, 3, 5];
let zs: Vec<(&usize, &usize)> = xs.iter()
                                  .zip(ys.iter())
                                  .collect();
// Result: [(&0, &1), (&2, &3), (&4, &5)]
```

`enumerate` is similar to `zip`, but the zipped iterator instead counts the
iteration count as it goes:

```rust
let xs: Vec<usize> = vec![10, 11, 12];
let zs: Vec<(usize, &usize)> = xs.iter()
                                 .enumerate()
                                 .collect();
// Result: [(0, &10), (1, &11), (2, &12)]
```

Note that the count is the _first_ element of the tuple, not the second as
you'll see in the equivalent Python function.

## Reductions

A number of adaptors exist to reduce the dimensionality of data:

```rust
let xs: Vec<usize> = vec![1, 2, 3, 4, 5];
let min: Option<&usize> = xs.iter().min();  // Some(1)
let max: Option<&usize> = xs.iter().max();  // Some(5)
let sum: usize = xs.iter().sum();           // 15
let prod: usize = xs.iter().product();      // 120
let count: usize: xs.iter().count();        // 5
```

The functions `min` and `max` return an `Option` type, and will return `None` if
the iterator is empty. `sum` and `product` instead start with an implicit first
element of `0` and `1` respectively.

You can also reduce boolean data:

```rust
let xs: Vec<usize> = vec![1, 2, 3, 4, 5];
let any: bool = xs.iter().any(|&x| x > 3); // true
let all: bool = xs.iter().all(|&x| x > 3); // false
```

These functions are short circuiting, meaning `any` will exit early as soon as
it encounters a `true` outcome and `all` will exit early as soon as it
encounters a `false` outcome. Note that this means `any` will return `false` on
an empty iterator while `all` will return `true`.

To make a more general reduction we can use the functions `fold` and `reduce`.
Both are very similar, but `fold` requires the provision of an initial value,
while `reduce` uses the first element:

```rust
let xs: Vec<usize> = vec![1, 2, 3, 4, 5];
let fold: usize = xs.iter().fold(10, |acc, &x| acc + x)
// Result: 25
let reduce: Option<usize> = xs.into_iter()
                              .reduce(|acc, x| acc + 2 * x);
// Result: Some(29), so the first element is not multiplied by 2!
```

Similarly to `min` and `max`, `fold` returns `None` if the iterator is
empty.

Finally, we'll look at `scan`, which is similar to `fold` in that it maintains
an internal state, but it returns another iterator instead of performing a
reduction. This can used for things like cumulative products:

```rust
let xs: Vec<usize> = vec![1, 2, 3, 4, 5];
let scan: Vec<usize> = xs.iter()
                         .scan(1, |state, &x|{
                             let result = *state * x;
                             *state = result;
                             Some(result)
                         })
                        .collect();
// Result: [1, 2, 6, 24, 120]
```

## Peekable

Sometimes it's useful to know what's coming next in an iterator before committing
to the next element. An example I ran into recently was accounting for different
line ending characters while iterating through a string in a scenario where
`string.lines()` wasn't appropriate:

```rust
let paragraph = "Foo\nBar\rBaz\r\n";
let mut newlines = 0;
let mut it = paragraph.chars().peekable();
while let Some(c) = it.next() {
    match c {
        '\r' => {
            // Handle CRLF
            if let Some('\n') = it.peek() {
                continue;
            }
            // Handle CR
            newlines += 1;
        },
        '\n' => {
            // Handle LF
            newlines += 1;
        },
        _ => {
            // Non-newline, do nothing!
        }
    }
}
// Result: newlines == 3
```

To handle all three possible line ending types, we need to recognise `\r\n` as a
single character. The method here peeks ahead on finding a `\r` and does not advance
the iterator forward. On the next iteration, the `\n` will be captured as usual and
recognised as a standard line ending.

As with the chaining methods earlier, there's a performance penalty to using peekable
iterators, so I recommend using them sparingly.

## Advanced Topics

That just about covers all of the standard iterator tricks I'm aware of! For
more complicated iterator manipulation, I recommend checking out the
[`itertools`](https://docs.rs/itertools/latest/itertools/index.html) crate. Some
highlights include:

- `.tuple_windows()`, which allows you to iterate over a window:

```rust
use itertools::Itertools;
let mut it = (0..5).tuple_windows::<(_, _, _)>();
assert_eq!(Some((0, 1, 2)), it.next());
assert_eq!(Some((1, 2, 3)), it.next());
assert_eq!(Some((2, 3, 4)), it.next());
```

- `.permutations()`, which is similar to Python's `itertools.permutations()`:

```rust
use itertools::Itertools;
let mut it = (0..3).permutations(2);
assert_eq!(Some(vec![0, 1]), it.next());
assert_eq!(Some(vec![0, 2]), it.next());
assert_eq!(Some(vec![1, 0]), it.next());
assert_eq!(Some(vec![1, 2]), it.next());
assert_eq!(Some(vec![2, 0]), it.next());
assert_eq!(Some(vec![2, 1]), it.next());
```

- `.unique()`, which filters elements that have already been encountered:

```rust
let xs: Vec<usize> = vec![0, 1, 0, 2, 0, 3];
let ys: Vec<usize> = xs.into_iter().unique().collect();
// Result: [0, 1, 2, 3]
```

Another crate definitely worth checking out is
[`rayon`](https://docs.rs/rayon/latest/rayon/), which provides parallel versions
of most standard iterator adaptors:

```rust
use rayon::prelude::*;
let xs: Vec<usize> = vec![0, 1, 2, 3, 4, 5, 6];
let ys: Vec<usize> = xs.into_par_iter()
                       .map(|x| x + 1)
                       .collect();
// Result: [1, 2, 3, 4, 5, 6, 7]
```

Typically, the only difference is that `.par_iter()` is used in place of `.iter()`
and `.into_par_iter()` is used in place of `.into_iter()`. The number of threads
used can be chosen by setting the environment variable `RAYON_NUM_THREADS`.
