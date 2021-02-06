# Hina

> **Hina** is a goddess with many different stories throughout the Polynesian islands. One story suggests that she is a guardian of travelers, and one can earn her favor and honor her with any 2 sided object, such as a coin.

## API

### `ap(val, iter)`

A function that takes an AsyncIterator `iter` of functions and applies it to the `val`, and yields the result.

###### Example:

```js
async function test() {
  const it = ap(3, fromIter([(x) => x + 1, (x) => x * 2, (x) => x / 3]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   4
   6
   1
*/
```

###### Arguments:

- <dt>`val: any`</dt><dd>the value to apply to each function from the iterator</dd>
- <dt>`iter: asyncIterator`</dt><dd>iterator of functions `any => any`</dd>

###### Returns:

_AsyncIterator_

### `map(fn, iter)`

A function that takes an AsyncIterator `iter` of items and maps `fn` over it, yielding the result.

###### Example:

```js
async function test() {
  const it = map((x) => x + 1, fromIter([1, 2, 3]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   2
   3
   4
*/
```

###### Arguments:

- <dt>`fn: any => any`</dt><dd>function to transform every value of `iter`</dd>
- <dt>`iter: asyncIterator`</dt><dd>iterator of values</dd>

###### Returns:

_AsyncIterator_

### `mapIndex(fn, iter)`

A function that takes an AsyncIterator `iter` of items and maps `fn` over it, yielding it. `fn` takes that item and an index.

###### Example:

```js
async function test() {
  const it = mapIndex((x, i) => x + i, fromIter([1, 2, 3]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   1
   3
   5
*/
```

###### Arguments:

- <dt>`fn: (any, idx) => any`</dt><dd>a function that takes a value and an index</dd>
- <dt>`iter: asyncIterator`</dt><dd>interator of values</dd>

###### Returns:

_AsyncIterator_

### `flatMap(fn, iter)`

###### Example:

```js
```

###### Arguments:

- <dt>`fn: any => any`</dt><dd>function to transform every value of inner `iter`</dd>
- <dt>`iter: asyncIterator`</dt><dd>iterator of values</dd>

###### Returns:

_AsyncIterator_

### `filter(pred, iter)`

A function that takes an AsyncIterator `iter` of items, applies it to `pred`. If true, it yields the item.

###### Example:

```js
async function test() {
  const it = filter((x) => x % 2 === 0, fromIter([1, 2, 3, 4, 5]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   2
   4
*/
```

###### Arguments:

- <dt>`pred: any => Bool`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `fold(fn, init, iter)`

###### Example:

```js
async function test() {
  const it = fold((acc, x) => acc + x, 0, fromIter([1, 2, 3]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   1
   3
   6
*/
```

###### Arguments:

- <dt>`fn: (acc, any) => any`</dt><dd></dd>
- <dt>`init: any`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `takeN(num, iter)`

A function that takes an AsyncIterator `iter` of items, and only yields `num` numbers of them.

###### Example:

```js
async function test() {
  const it = takeN(3, fromIter([1, 2, 3, 4, 5, 6]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   1
   2
   3
*/
```

###### Arguments:

- <dt>`num: Number`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `dropN(num, iter)`

A function that takes an AsyncIterator `iter` of items, and only yields them after `num` items.

###### Example:

```js
async function test() {
  const it = dropN(3, fromIter([1, 2, 3, 4, 5, 6]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   4
   5
   6
*/
```

###### Arguments:

- <dt>`num: Number`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `skipRepeats(iter)`

A function that can take an AsyncIterator or an Iterator and returns only values that haven't been yielded before. It creates a set spread across time.

###### Example:

```js
async function test() {
  const it = skipRepeats(fromIter([1, 1, 2, 3, 3, 3]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   1
   2
   3
*/
```

###### Arguments:

- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `delay(ms, iter)`

A function that takes an AsyncIterable `iter` and yields each item delayed by `ms`.

###### Example:

```js
async function test() {
  const it = delay(200, fromIter([1, 2, 3]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
 *after 200ms* 1
 *after 400ms* 2z
 *after 600ms* 3
 */
```

###### Arguments:

- <dt>`ms: Number`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `throttle(ms, iter)`

A function that takes an AsyncIterable `iter` yields an item, waiting `ms` until yielding again.

###### Example:

```js
const delayVal = (ms, item) =>
  new Promise((res) => setTimeout(() => res(item), ms));

async function* xs() {
  yield delayVal(200, 1);
  yield delayVal(200, 2);
  yield delayVal(200, 3);
  yield delayVal(200, 4);
}
async function test() {
  it = throttle(300, xs());
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   1
   3
*/
```

###### Arguments:

- <dt>`ms: Number`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `debounce(ms, iter)`

A function that takes an AsyncIterable `iter` and

###### Example:

```js
const delayVal = (ms, item) =>
  new Promise((res) => setTimeout(() => res(item), ms));

async function* xs() {
  yield delayVal(200, 1);
  yield delayVal(400, 2);
  yield delayVal(200, 3);
}
async function test() {
  it = debounce(300, xs());
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   1
   3
*/
```

###### Arguments:

- <dt>`ms: Number`</dt><dd></dd>
- <dt>`iter: asyncIterator`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `constant(val)`

###### Example:

```js
async function test() {
  const it = constant(3);
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   3
   3
   3
*/
```

###### Arguments:

- <dt>`val; any`</dt><dd></dd>

###### Returns:

_AsyncIterator_

### `pipeA(...fns)(iter)`

###### Example:

```js
async function test() {
  const xf = pipeA(
    filter((x) => x % 2 === 0),
    map((x) => x ** 2),
    fold((a, b) => a + b, 0)
  );
  const it = xf(fromIter([1, 2, 3, 4, 5, 6, 7, 8]));
  for await (const x of it) console.log(x);
}
test();
/* Logs:
   4
   20
   56
   120
*/
```

###### Arguments:

- <dt></dt><dd></dd>
- <dt></dt><dd></dd>

###### Returns:

_AsyncIterator_
