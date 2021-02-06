"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipRepeats = skipRepeats;
exports.constant = constant;
exports.debounce = exports.throttle = exports.delay = exports.dropN = exports.takeN = exports.fold = exports.filter = exports.flatMap = exports.mapIndex = exports.map = exports.ap = exports.pipeA = exports.sleep = void 0;

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : (...more) => curry(fn, ...args, ...more);
}

function defer() {
  let resolve, reject;
  const target = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    target,
    resolve,
    reject
  };
}

function _map(_x, _x2) {
  return _map2.apply(this, arguments);
}

function _map2() {
  _map2 = _wrapAsyncGenerator(function* (fn, iter) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(iter), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
        const val = _value;
        yield fn(val);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          yield _awaitAsyncGenerator(_iterator.return());
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return _map2.apply(this, arguments);
}

function _mapIndex(_x3, _x4) {
  return _mapIndex2.apply(this, arguments);
}

function _mapIndex2() {
  _mapIndex2 = _wrapAsyncGenerator(function* (fn, iter) {
    let index = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;

    var _iteratorError2;

    try {
      for (var _iterator2 = _asyncIterator(iter), _step2, _value2; _step2 = yield _awaitAsyncGenerator(_iterator2.next()), _iteratorNormalCompletion2 = _step2.done, _value2 = yield _awaitAsyncGenerator(_step2.value), !_iteratorNormalCompletion2; _iteratorNormalCompletion2 = true) {
        const val = _value2;
        yield fn(val, index);
        ++index;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          yield _awaitAsyncGenerator(_iterator2.return());
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
  return _mapIndex2.apply(this, arguments);
}

function _flatMap(_x5, _x6) {
  return _flatMap2.apply(this, arguments);
}

function _flatMap2() {
  _flatMap2 = _wrapAsyncGenerator(function* (fn, iter) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;

    var _iteratorError3;

    try {
      for (var _iterator3 = _asyncIterator(iter), _step3, _value3; _step3 = yield _awaitAsyncGenerator(_iterator3.next()), _iteratorNormalCompletion3 = _step3.done, _value3 = yield _awaitAsyncGenerator(_step3.value), !_iteratorNormalCompletion3; _iteratorNormalCompletion3 = true) {
        const inner = _value3;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;

        var _iteratorError4;

        try {
          for (var _iterator4 = _asyncIterator(inner), _step4, _value4; _step4 = yield _awaitAsyncGenerator(_iterator4.next()), _iteratorNormalCompletion4 = _step4.done, _value4 = yield _awaitAsyncGenerator(_step4.value), !_iteratorNormalCompletion4; _iteratorNormalCompletion4 = true) {
            const val = _value4;
            yield fn(val);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              yield _awaitAsyncGenerator(_iterator4.return());
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          yield _awaitAsyncGenerator(_iterator3.return());
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  });
  return _flatMap2.apply(this, arguments);
}

function _filter(_x7, _x8) {
  return _filter2.apply(this, arguments);
}

function _filter2() {
  _filter2 = _wrapAsyncGenerator(function* (pred, iter) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;

    var _iteratorError5;

    try {
      for (var _iterator5 = _asyncIterator(iter), _step5, _value5; _step5 = yield _awaitAsyncGenerator(_iterator5.next()), _iteratorNormalCompletion5 = _step5.done, _value5 = yield _awaitAsyncGenerator(_step5.value), !_iteratorNormalCompletion5; _iteratorNormalCompletion5 = true) {
        const val = _value5;
        if (pred(val)) yield val;
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          yield _awaitAsyncGenerator(_iterator5.return());
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  });
  return _filter2.apply(this, arguments);
}

function _ap(_x9, _x10) {
  return _ap2.apply(this, arguments);
}

function _ap2() {
  _ap2 = _wrapAsyncGenerator(function* (val, iter) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;

    var _iteratorError6;

    try {
      for (var _iterator6 = _asyncIterator(iter), _step6, _value6; _step6 = yield _awaitAsyncGenerator(_iterator6.next()), _iteratorNormalCompletion6 = _step6.done, _value6 = yield _awaitAsyncGenerator(_step6.value), !_iteratorNormalCompletion6; _iteratorNormalCompletion6 = true) {
        const fn = _value6;
        yield fn(val);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
          yield _awaitAsyncGenerator(_iterator6.return());
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  });
  return _ap2.apply(this, arguments);
}

function _fold(_x11, _x12, _x13) {
  return _fold2.apply(this, arguments);
}

function _fold2() {
  _fold2 = _wrapAsyncGenerator(function* (fn, acc, iter) {
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;

    var _iteratorError7;

    try {
      for (var _iterator7 = _asyncIterator(iter), _step7, _value7; _step7 = yield _awaitAsyncGenerator(_iterator7.next()), _iteratorNormalCompletion7 = _step7.done, _value7 = yield _awaitAsyncGenerator(_step7.value), !_iteratorNormalCompletion7; _iteratorNormalCompletion7 = true) {
        const val = _value7;
        acc = fn(acc, val);
        yield acc;
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
          yield _awaitAsyncGenerator(_iterator7.return());
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  });
  return _fold2.apply(this, arguments);
}

function _takeN(_x14, _x15) {
  return _takeN2.apply(this, arguments);
}

function _takeN2() {
  _takeN2 = _wrapAsyncGenerator(function* (num, iter) {
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;

    var _iteratorError8;

    try {
      for (var _iterator8 = _asyncIterator(iter), _step8, _value8; _step8 = yield _awaitAsyncGenerator(_iterator8.next()), _iteratorNormalCompletion8 = _step8.done, _value8 = yield _awaitAsyncGenerator(_step8.value), !_iteratorNormalCompletion8; _iteratorNormalCompletion8 = true) {
        const val = _value8;

        if (!!num) {
          --num;
          yield val;
        }
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
          yield _awaitAsyncGenerator(_iterator8.return());
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  });
  return _takeN2.apply(this, arguments);
}

function _dropN(_x16, _x17) {
  return _dropN2.apply(this, arguments);
}

function _dropN2() {
  _dropN2 = _wrapAsyncGenerator(function* (num, iter) {
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;

    var _iteratorError9;

    try {
      for (var _iterator9 = _asyncIterator(iter), _step9, _value9; _step9 = yield _awaitAsyncGenerator(_iterator9.next()), _iteratorNormalCompletion9 = _step9.done, _value9 = yield _awaitAsyncGenerator(_step9.value), !_iteratorNormalCompletion9; _iteratorNormalCompletion9 = true) {
        const val = _value9;

        if (!!num) {
          --num;
          continue;
        } else {
          yield val;
        }
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
          yield _awaitAsyncGenerator(_iterator9.return());
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  });
  return _dropN2.apply(this, arguments);
}

function skipRepeats(_x18) {
  return _skipRepeats.apply(this, arguments);
}

function _skipRepeats() {
  _skipRepeats = _wrapAsyncGenerator(function* (iter) {
    const library = new Set();
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;

    var _iteratorError10;

    try {
      for (var _iterator10 = _asyncIterator(iter), _step10, _value10; _step10 = yield _awaitAsyncGenerator(_iterator10.next()), _iteratorNormalCompletion10 = _step10.done, _value10 = yield _awaitAsyncGenerator(_step10.value), !_iteratorNormalCompletion10; _iteratorNormalCompletion10 = true) {
        const val = _value10;

        if (!library.has(val)) {
          library.add(val);
          yield val;
        }
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
          yield _awaitAsyncGenerator(_iterator10.return());
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
    }

    library.clear();
  });
  return _skipRepeats.apply(this, arguments);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.sleep = sleep;

function _delay(_x19, _x20) {
  return _delay2.apply(this, arguments);
}

function _delay2() {
  _delay2 = _wrapAsyncGenerator(function* (ms, iter) {
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;

    var _iteratorError11;

    try {
      for (var _iterator11 = _asyncIterator(iter), _step11, _value11; _step11 = yield _awaitAsyncGenerator(_iterator11.next()), _iteratorNormalCompletion11 = _step11.done, _value11 = yield _awaitAsyncGenerator(_step11.value), !_iteratorNormalCompletion11; _iteratorNormalCompletion11 = true) {
        const val = _value11;
        yield _awaitAsyncGenerator(sleep(ms));
        yield val;
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
          yield _awaitAsyncGenerator(_iterator11.return());
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }
  });
  return _delay2.apply(this, arguments);
}

function _throttle(_x21, _x22) {
  return _throttle2.apply(this, arguments);
}

function _throttle2() {
  _throttle2 = _wrapAsyncGenerator(function* (amt, iter) {
    let transmit = true;
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;

    var _iteratorError12;

    try {
      for (var _iterator12 = _asyncIterator(iter), _step12, _value12; _step12 = yield _awaitAsyncGenerator(_iterator12.next()), _iteratorNormalCompletion12 = _step12.done, _value12 = yield _awaitAsyncGenerator(_step12.value), !_iteratorNormalCompletion12; _iteratorNormalCompletion12 = true) {
        const val = _value12;

        if (transmit) {
          transmit = false;
          sleep(amt).then(() => {
            transmit = true;
          });
          yield val;
        }
      }
    } catch (err) {
      _didIteratorError12 = true;
      _iteratorError12 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
          yield _awaitAsyncGenerator(_iterator12.return());
        }
      } finally {
        if (_didIteratorError12) {
          throw _iteratorError12;
        }
      }
    }
  });
  return _throttle2.apply(this, arguments);
}

function _debounce(amt, iter) {
  return {
    [Symbol.asyncIterator]() {
      return _wrapAsyncGenerator(function* () {
        let done = false;
        let {
          promise,
          resolve,
          reject
        } = defer();

        (async () => {
          let id;

          const emit = val => {
            id = null;
            resolve(val);
            ({
              promise,
              resolve,
              reject
            } = defer());
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
      })();
    }

  }[Symbol.asyncIterator]();
}

function constant(x) {
  return {
    [Symbol.asyncIterator]() {
      return _wrapAsyncGenerator(function* () {
        while (true) yield x;
      })();
    }

  }[Symbol.asyncIterator]();
}

const pipeA = (...fns) => iter => fns.reduce((acc, fn) => fn(acc), iter);

exports.pipeA = pipeA;
const ap = curry(_ap);
exports.ap = ap;
const map = curry(_map);
exports.map = map;
const mapIndex = curry(_mapIndex);
exports.mapIndex = mapIndex;
const flatMap = curry(_flatMap);
exports.flatMap = flatMap;
const filter = curry(_filter);
exports.filter = filter;
const fold = curry(_fold);
exports.fold = fold;
const takeN = curry(_takeN);
exports.takeN = takeN;
const dropN = curry(_dropN);
exports.dropN = dropN;
const delay = curry(_delay);
exports.delay = delay;
const throttle = curry(_throttle);
exports.throttle = throttle;
const debounce = curry(_debounce);
exports.debounce = debounce;