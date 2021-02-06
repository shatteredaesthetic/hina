import test from "tape";
import * as O from "../src/index.mjs";
import * as H from "./utils.mjs";

test("map", async (t) => {
  t.plan(9);
  const ch = O.map((x) => x + 1, [1, 2, 3, 4]);
  let i = 0;
  await H.hasNext(t, ch, 2);
  await H.hasNext(t, ch, 3);
  await H.hasNext(t, ch, 4);
  await H.hasNext(t, ch, 5);
  await H.noNext(t, ch);
});

test("filter", async (t) => {
  t.plan(5);
  const ch = O.filter((x) => x % 2 === 0, [1, 2, 3, 4]);
  await H.hasNext(t, ch, 2);
  await H.hasNext(t, ch, 4);
  await H.noNext(t, ch);
});

test("mapIndex", async (t) => {
  t.plan(9);
  const ch = O.mapIndex((x, i) => `${x}${"!".repeat(i)}`, "cats");
  await H.hasNext(t, ch, "c");
  await H.hasNext(t, ch, "a!");
  await H.hasNext(t, ch, "t!!");
  await H.hasNext(t, ch, "s!!!");
  await H.noNext(t, ch);
});

test("flatMap", async (t) => {
  t.plan(13);
  const ch = O.flatMap((s) => `${s}!`, [
    ["a", "a"],
    ["b", "b"],
    ["c", "c"],
  ]);
  await H.hasNext(t, ch, "a!");
  await H.hasNext(t, ch, "a!");
  await H.hasNext(t, ch, "b!");
  await H.hasNext(t, ch, "b!");
  await H.hasNext(t, ch, "c!");
  await H.hasNext(t, ch, "c!");
  await H.noNext(t, ch);
});

test("ap", async (t) => {
  t.plan(7);
  const ch = O.ap(4, [(x) => x + 1, (x) => x * 2, (x) => x - 1]);
  await H.hasNext(t, ch, 5);
  await H.hasNext(t, ch, 8);
  await H.hasNext(t, ch, 3);
  await H.noNext(t, ch);
});

test("fold", async (t) => {
  t.plan(4);
  let i = 0;
  for await (const msg of O.fold((a, x) => x + a, 0, [1, 2, 3, 4])) {
    if (i === 0) t.equals(msg, 1, "fold should accumulate values");
    if (i === 1) t.equals(msg, 3, "fold should accumulate values");
    if (i === 2) t.equals(msg, 6, "fold should accumulate values");
    if (i === 3) t.equals(msg, 10, "fold should accumulate values");
    ++i;
  }
});

test("takeN", async (t) => {
  t.plan(7);
  const ch = O.takeN(3, [1, 2, 3, 4, 5, 6]);
  await H.hasNext(t, ch, 1);
  await H.hasNext(t, ch, 2);
  await H.hasNext(t, ch, 3);
  await H.noNext(t, ch);
});

test("dropN", async (t) => {
  t.plan(7);
  const ch = O.dropN(3, [1, 2, 3, 4, 5, 6]);
  await H.hasNext(t, ch, 4);
  await H.hasNext(t, ch, 5);
  await H.hasNext(t, ch, 6);
  await H.noNext(t, ch);
});

test("constant", async (t) => {
  t.plan(8);
  const ch = O.constant(3);
  await H.hasNext(t, ch, 3);
  await H.hasNext(t, ch, 3);
  await H.hasNext(t, ch, 3);
  await H.hasNext(t, ch, 3);
});

test("pipeA", async (t) => {
  t.plan(9);
  const ch = O.pipeA(
    O.filter((x) => x % 2 === 0),
    O.map((x) => x ** 2),
    O.fold((a, b) => a + b, 0)
  )([1, 2, 3, 4, 5, 6, 7, 8]);
  await H.hasNext(t, ch, 4);
  await H.hasNext(t, ch, 20);
  await H.hasNext(t, ch, 56);
  await H.hasNext(t, ch, 120);
  await H.noNext(t, ch);
});

test("skipRepeats", async (t) => {
  t.plan(7);
  const ch = O.skipRepeats([1, 1, 2, 3, 3]);
  await H.hasNext(t, ch, 1);
  await H.hasNext(t, ch, 2);
  await H.hasNext(t, ch, 3);
  await H.noNext(t, ch);
});

test("throttle", async (t) => {
  t.plan(12);
  let xs = async function* () {
    yield H.delayValue(1, 100);
    yield H.delayValue(2, 100);
    yield H.delayValue(3, 100);
  };
  let it = O.throttle(50, xs());
  await H.hasNext(t, it, 1);
  await H.hasNext(t, it, 2);
  await H.hasNext(t, it, 3);
  await H.noNext(t, it);

  xs = async function* () {
    yield H.delayValue(1, 200);
    yield H.delayValue(2, 200);
    yield H.delayValue(3, 200);
    yield H.delayValue(4, 200);
  };
  it = O.throttle(300, xs());
  await H.hasNext(t, it, 1);
  await H.hasNext(t, it, 3);
  await H.noNext(t, it);
});

test("debounce", async (t) => {
  t.plan(12);
  let xs = async function* () {
    yield H.delayValue(1, 100);
    yield H.delayValue(2, 100);
    yield H.delayValue(3, 100);
  };
  let it = O.debounce(50, xs());
  await H.hasNext(t, it, 1);
  await H.hasNext(t, it, 2);
  await H.hasNext(t, it, 3);
  await H.noNext(t, it);

  xs = async function* () {
    yield H.delayValue(1, 200);
    yield H.delayValue(2, 400);
    yield H.delayValue(3, 200);
  };
  it = O.debounce(300, xs());
  await H.hasNext(t, it, 1);
  await H.hasNext(t, it, 3);
  await H.noNext(t, it);
});

// test("delay", async (t) => {});
