function curry(fn, ...args) {
  return fn.length <= args.length
    ? fn(...args)
    : (...more) => curry(fn, ...args, ...more);
}

function defer() {
  let resolve, reject;
  const target = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { target, resolve, reject };
}

async function* _map(fn, iter) {
  for await (const val of iter) yield fn(val);
}

async function* _mapIndex(fn, iter) {
  let index = 0;
  for await (const val of iter) {
    yield fn(val, index);
    ++index;
  }
}

async function* _flatMap(fn, iter) {
  for await (const inner of iter) {
    for await (const val of inner) yield fn(val);
  }
}

async function* _filter(pred, iter) {
  for await (const val of iter) {
    if (pred(val)) yield val;
  }
}

async function* _ap(val, iter) {
  for await (const fn of iter) yield fn(val);
}

async function* _fold(fn, acc, iter) {
  for await (const val of iter) {
    acc = fn(acc, val);
    yield acc;
  }
}

async function* _takeN(num, iter) {
  for await (const val of iter) {
    if (!!num) {
      --num;
      yield val;
    }
  }
}

async function* _dropN(num, iter) {
  for await (const val of iter) {
    if (!!num) {
      --num;
      continue;
    } else {
      yield val;
    }
  }
}

export async function* skipRepeats(iter) {
  const library = new Set();
  for await (const val of iter) {
    if (!library.has(val)) {
      library.add(val);
      yield val;
    }
  }
  library.clear();
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* _delay(ms, iter) {
  for await (const val of iter) {
    await sleep(ms);
    yield val;
  }
}

async function* _throttle(amt, iter) {
  let transmit = true;
  for await (const val of iter) {
    if (transmit) {
      transmit = false;
      sleep(amt).then(() => {
        transmit = true;
      });
      yield val;
    }
  }
}

function _debounce(amt, iter) {
  return {
    async *[Symbol.asyncIterator]() {
      let done = false;
      let { promise, resolve, reject } = defer();
      (async () => {
        let id;
        const emit = (val) => {
          id = null;
          resolve(val);
          ({ promise, resolve, reject } = defer());
        };
        try {
          let result;
          while (!done && !(result = await iter.next()).done) {
            if (id) clearTimeout(id);
            id = setTimeout(emit, amt, result.value);
          }
        } catch (e) {
          reject(e);
        }
        done = true;
      })();
      while (!done) yield promise;
    },
  }[Symbol.asyncIterator]();
}

export function constant(x) {
  return {
    async *[Symbol.asyncIterator]() {
      while (true) yield x;
    },
  }[Symbol.asyncIterator]();
}

export const pipeA = (...fns) => (iter) =>
  fns.reduce((acc, fn) => fn(acc), iter);

export const ap = curry(_ap);
export const map = curry(_map);
export const mapIndex = curry(_mapIndex);
export const flatMap = curry(_flatMap);
export const filter = curry(_filter);
export const fold = curry(_fold);
export const takeN = curry(_takeN);
export const dropN = curry(_dropN);
export const delay = curry(_delay);
export const throttle = curry(_throttle);
export const debounce = curry(_debounce);
