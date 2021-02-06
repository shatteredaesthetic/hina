export async function sequenceEqual(source, other) {
  const it1 = source[Symbol.asyncIterator]();
  const it2 = other[Symbol.asyncIterator]();
  let next1, next2;
  while (!(next1 = await it1.next()).done) {
    if (
      !(
        !(next2 = await it2.next()).done &&
        (await comparer(next1.value, next2.value))
      )
    ) {
      return false;
    }
  }
  return !!(await it2.next()).done;
}

async function comparerAsync(x, y) {
  return (
    x === y ||
    (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y))
  );
}

export async function hasNext(t, source, expected) {
  const { done, value } = await source.next();
  t.notOk(done, "should not be done");
  t.equals(value, expected, "values should be equal");
}

export async function noNext(t, source) {
  const next = await source.next();
  t.ok(next.done, "should be done");
}

export function delayValue(item, delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res(item);
    }, delay);
  });
}
