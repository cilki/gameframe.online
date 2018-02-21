!(function () {
  Function && Function.prototype && Function.prototype.bind && (/MSIE [678]/.test(navigator.userAgent) || (window.__twttr && window.__twttr.widgets && window.__twttr.widgets.loaded && window.twttr.widgets.load && window.twttr.widgets.load(), window.__twttr && window.__twttr.widgets && window.__twttr.widgets.init || !(function (t) {
    function e(n) {
      if (r[n]) return r[n].exports;
      const i = r[n] = {
        exports: {},
        id: n,
        loaded: !1,
      };
      return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
    }
    const n = window.__twttrll;
    window.__twttrll = function (r, o) {
      for (var s, a, u = 0, c = []; u < r.length; u++) a = r[u], i[a] && c.push(...i[a]), i[a] = 0;
      for (s in o) t[s] = o[s];
      for (n && n(r, o); c.length;) c.shift().call(null, null, e);
    };
    var r = {},
      i = {
        0: 0,
      };
    return e.e = function (t, e) {}, e.e = function (t, n) {
      if (i[t] === 0) return n.call(null, null, e);
      if (void 0 !== i[t]) i[t].push(n);
      else {
        i[t] = [n];
        let r = document.getElementsByTagName('head')[0],
          o = document.createElement('script');
        o.type = 'text/javascript', o.charset = 'utf-8', o.async = !0, o.onerror = function () {
          const e = i[t];
          for (o.onerror = null, delete i[t]; e.length;) e.shift().call(null, new Error('failed to load chunk'));
        }, o.src = `${e.p}js/${{
          1: 'dm_button',
          2: 'button',
          3: 'grid',
          4: 'moment',
          5: 'periscope_on_air',
          6: 'timeline',
          7: 'tweet',
        }[t] || t}.${{
          1: 'c6be4b2e80c5f8e8ea3a14f6031d5829',
          2: '5f64a1a5864e1229f84c8defd65341b4',
          3: '28ed9083c7eb70add286e541edcb7ac7',
          4: '82306bfd82e986c393a514bd23f90dd6',
          5: '0cdb0ae4b31c4540cd5320b38ab17c3f',
          6: '25e3f797ea5047ab5a8d06fd6ee7f701',
          7: '3f0c77e9c86dd5bae672ba9948814692',
        }[t]}.js`, r.appendChild(o);
      }
    }, e.m = t, e.c = r, e.p = 'https://platform.twitter.com/', e(0);
  }([function (t, e, n) {
    let r,
      i = n(1),
      o = n(9),
      s = n(14),
      a = n(16),
      u = n(18),
      c = n(19),
      d = n(30),
      f = n(32),
      l = n(261),
      h = n(272),
      p = n(273),
      m = n(240),
      v = '_e';
    n(274), m.emitter.trigger(m.START), u.set('widgets.init', !0), a.set('init', !0), p(), r = new i(), s.exposeReadyPromise(r.promise, a.base, v), a.set('widgets', l), a.set('widgets.load', f.load), a.set('events', d), h(() => {
      r.resolve(a.base), c.attachTo(o), f.loadPage();
    });
  }, function (t, e, n) {
    function r() {
      const t = this;
      this.promise = new i(((e, n) => {
        t.resolve = e, t.reject = n;
      }));
    }
    var i = n(2);
    t.exports = r;
  }, function (t, e, n) {
    let r = n(3).Promise,
      i = n(7),
      o = n(8);
    t.exports = o.hasPromiseSupport() ? i.Promise : r;
  }, function (t, e, n) {
    let r;
    (function (t) {
      /*!
             * @overview es6-promise - a tiny implementation of Promises/A+.
             * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
             * @license   Licensed under MIT license
             *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
             * @version   2.3.0
             */
      (function () {
        function i(t) {
          return typeof t === 'function' || typeof t === 'object' && t !== null;
        }

        function o(t) {
          return typeof t === 'function';
        }

        function s(t) {
          return typeof t === 'object' && t !== null;
        }

        function a(t) {
          V = t;
        }

        function u(t) {
          K = t;
        }

        function c() {
          let t = process.nextTick,
            e = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
          return Array.isArray(e) && e[1] === '0' && e[2] === '10' && (t = setImmediate),
          function () {
            t(p);
          };
        }

        function d() {
          return function () {
            H(p);
          };
        }

        function f() {
          let t = 0,
            e = new Z(p),
            n = document.createTextNode('');
          return e.observe(n, {
            characterData: !0,
          }),
          function () {
            n.data = t = ++t % 2;
          };
        }

        function l() {
          const t = new MessageChannel();
          return t.port1.onmessage = p,
          function () {
            t.port2.postMessage(0);
          };
        }

        function h() {
          return function () {
            setTimeout(p, 1);
          };
        }

        function p() {
          for (let t = 0; t < Q; t += 2) {
            let e = et[t],
              n = et[t + 1];
            e(n), et[t] = void 0, et[t + 1] = void 0;
          }
          Q = 0;
        }

        function m() {
          try {
            const t = n(5);
            return H = t.runOnLoop || t.runOnContext, d();
          } catch (t) {
            return h();
          }
        }

        function v() {}

        function g() {
          return new TypeError('You cannot resolve a promise with itself');
        }

        function w() {
          return new TypeError('A promises callback cannot return that same promise.');
        }

        function y(t) {
          try {
            return t.then;
          } catch (t) {
            return ot.error = t, ot;
          }
        }

        function b(t, e, n, r) {
          try {
            t.call(e, n, r);
          } catch (t) {
            return t;
          }
        }

        function _(t, e, n) {
          K((t) => {
            let r = !1,
              i = b(n, e, (n) => {
                r || (r = !0, e !== n ? A(t, n) : T(t, n));
              }, (e) => {
                r || (r = !0, I(t, e));
              }, `Settle: ${t._label || ' unknown promise'}`);
            !r && i && (r = !0, I(t, i));
          }, t);
        }

        function E(t, e) {
          e._state === rt ? T(t, e._result) : e._state === it ? I(t, e._result) : S(e, void 0, (e) => {
            A(t, e);
          }, (e) => {
            I(t, e);
          });
        }

        function x(t, e) {
          if (e.constructor === t.constructor) E(t, e);
          else {
            const n = y(e);
            n === ot ? I(t, ot.error) : void 0 === n ? T(t, e) : o(n) ? _(t, e, n) : T(t, e);
          }
        }

        function A(t, e) {
          t === e ? I(t, g()) : i(e) ? x(t, e) : T(t, e);
        }

        function C(t) {
          t._onerror && t._onerror(t._result), R(t);
        }

        function T(t, e) {
          t._state === nt && (t._result = e, t._state = rt, t._subscribers.length !== 0 && K(R, t));
        }

        function I(t, e) {
          t._state === nt && (t._state = it, t._result = e, K(C, t));
        }

        function S(t, e, n, r) {
          let i = t._subscribers,
            o = i.length;
          t._onerror = null, i[o] = e, i[o + rt] = n, i[o + it] = r, o === 0 && t._state && K(R, t);
        }

        function R(t) {
          let e = t._subscribers,
            n = t._state;
          if (e.length !== 0) {
            for (var r, i, o = t._result, s = 0; s < e.length; s += 3) r = e[s], i = e[s + n], r ? j(n, r, i, o) : i(o);
            t._subscribers.length = 0;
          }
        }

        function P() {
          this.error = null;
        }

        function N(t, e) {
          try {
            return t(e);
          } catch (t) {
            return st.error = t, st;
          }
        }

        function j(t, e, n, r) {
          let i,
            s,
            a,
            u,
            c = o(n);
          if (c) {
            if (i = N(n, r), i === st ? (u = !0, s = i.error, i = null) : a = !0, e === i) return void I(e, w());
          } else i = r, a = !0;
          e._state !== nt || (c && a ? A(e, i) : u ? I(e, s) : t === rt ? T(e, i) : t === it && I(e, i));
        }

        function k(t, e) {
          try {
            e((e) => {
              A(t, e);
            }, (e) => {
              I(t, e);
            });
          } catch (e) {
            I(t, e);
          }
        }

        function L(t, e) {
          const n = this;
          n._instanceConstructor = t, n.promise = new t(v), n._validateInput(e) ? (n._input = e, n.length = e.length, n._remaining = e.length, n._init(), n.length === 0 ? T(n.promise, n._result) : (n.length = n.length || 0, n._enumerate(), n._remaining === 0 && T(n.promise, n._result))) : I(n.promise, n._validationError());
        }

        function O(t) {
          return new at(this, t).promise;
        }

        function D(t) {
          function e(t) {
            A(i, t);
          }

          function n(t) {
            I(i, t);
          }
          var r = this,
            i = new r(v);
          if (!$(t)) return I(i, new TypeError('You must pass an array to race.')), i;
          for (let o = t.length, s = 0; i._state === nt && s < o; s++) S(r.resolve(t[s]), void 0, e, n);
          return i;
        }

        function z(t) {
          const e = this;
          if (t && typeof t === 'object' && t.constructor === e) return t;
          const n = new e(v);
          return A(n, t), n;
        }

        function B(t) {
          let e = this,
            n = new e(v);
          return I(n, t), n;
        }

        function F() {
          throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
        }

        function M() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }

        function U(t) {
          this._id = lt++, this._state = void 0, this._result = void 0, this._subscribers = [], v !== t && (o(t) || F(), this instanceof U || M(), k(this, t));
        }

        function q() {
          let t;
          if (typeof global !== 'undefined') t = global;
          else if (typeof self !== 'undefined') t = self;
          else {
            try {
              t = Function('return this')();
            } catch (t) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
            }
          }
          const e = t.Promise;
          e && Object.prototype.toString.call(e.resolve()) === '[object Promise]' && !e.cast || (t.Promise = ht);
        }
        let W;
        W = Array.isArray ? Array.isArray : function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };
        var H,
          V,
          G,
          $ = W,
          Q = 0,
          K = ({}.toString, function (t, e) {
            et[Q] = t, et[Q + 1] = e, Q += 2, Q === 2 && (V ? V(p) : G());
          }),
          J = typeof window !== 'undefined' ? window : void 0,
          Y = J || {},
          Z = Y.MutationObserver || Y.WebKitMutationObserver,
          X = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]',
          tt = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined',
          et = new Array(1e3);
        G = X ? c() : Z ? f() : tt ? l() : void 0 === J ? m() : h();
        var nt = void 0,
          rt = 1,
          it = 2,
          ot = new P(),
          st = new P();
        L.prototype._validateInput = function (t) {
          return $(t);
        }, L.prototype._validationError = function () {
          return new Error('Array Methods must be provided an Array');
        }, L.prototype._init = function () {
          this._result = new Array(this.length);
        };
        var at = L;
        L.prototype._enumerate = function () {
          for (let t = this, e = t.length, n = t.promise, r = t._input, i = 0; n._state === nt && i < e; i++) t._eachEntry(r[i], i);
        }, L.prototype._eachEntry = function (t, e) {
          let n = this,
            r = n._instanceConstructor;
          s(t) ? t.constructor === r && t._state !== nt ? (t._onerror = null, n._settledAt(t._state, e, t._result)) : n._willSettleAt(r.resolve(t), e) : (n._remaining--, n._result[e] = t);
        }, L.prototype._settledAt = function (t, e, n) {
          let r = this,
            i = r.promise;
          i._state === nt && (r._remaining--, t === it ? I(i, n) : r._result[e] = n), r._remaining === 0 && T(i, r._result);
        }, L.prototype._willSettleAt = function (t, e) {
          const n = this;
          S(t, void 0, (t) => {
            n._settledAt(rt, e, t);
          }, (t) => {
            n._settledAt(it, e, t);
          });
        };
        var ut = O,
          ct = D,
          dt = z,
          ft = B,
          lt = 0,
          ht = U;
        U.all = ut, U.race = ct, U.resolve = dt, U.reject = ft, U._setScheduler = a, U._setAsap = u, U._asap = K, U.prototype = {
          constructor: U,
          then(t, e) {
            let n = this,
              r = n._state;
            if (r === rt && !t || r === it && !e) return this;
            let i = new this.constructor(v),
              o = n._result;
            if (r) {
              const s = arguments[r - 1];
              K(() => {
                j(r, i, s, o);
              });
            } else S(n, i, t, e);
            return i;
          },
          catch(t) {
            return this.then(null, t);
          },
        };
        let pt = q,
          mt = {
            Promise: ht,
            polyfill: pt,
          };
        n(6).amd ? (r = function () {
          return mt;
        }.call(e, n, e, t), !(void 0 !== r && (t.exports = r))) : typeof t !== 'undefined' && t.exports && (t.exports = mt);
      }).call(this);
    }).call(e, n(4)(t));
  }, function (t, e) {
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t;
    };
  }, function (t, e) {}, function (t, e) {
    t.exports = function () {
      throw new Error('define cannot be used indirect');
    };
  }, function (t, e) {
    t.exports = window;
  }, function (t, e, n) {
    function r(t) {
      return t = t || w, t.devicePixelRatio ? t.devicePixelRatio >= 1.5 : !!t.matchMedia && t.matchMedia('only screen and (min-resolution: 144dpi)').matches;
    }

    function i(t) {
      return t = t || b, /(Trident|MSIE|Edge[\/ ]?\d)/.test(t);
    }

    function o(t) {
      return t = t || b, /MSIE 9/.test(t);
    }

    function s(t) {
      return t = t || b, /MSIE 10/.test(t);
    }

    function a(t) {
      return t = t || b, /(iPad|iPhone|iPod)/.test(t);
    }

    function u(t) {
      return t = t || b, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(t);
    }

    function c(t, e) {
      return t = t || w, e = e || b, t.postMessage && !(i(e) && t.opener);
    }

    function d(t, e, n) {
      return t = t || w, e = e || g, n = n || b, 'ontouchstart' in t || /Opera Mini/.test(n) || e.msMaxTouchPoints > 0;
    }

    function f() {
      const t = v.body.style;
      return void 0 !== t.transition || void 0 !== t.webkitTransition || void 0 !== t.mozTransition || void 0 !== t.oTransition || void 0 !== t.msTransition;
    }

    function l() {
      return !!w.IntersectionObserver;
    }

    function h() {
      return !!(w.Promise && w.Promise.resolve && w.Promise.reject && w.Promise.all && w.Promise.race && (function () {
        let t;
        return new w.Promise(((e) => {
          t = e;
        })), y.isType('function', t);
      }()));
    }

    function p() {
      return w.performance && w.performance.getEntriesByType;
    }

    function m() {
      try {
        return w.localStorage.setItem('local_storage_support_test', 'true'), typeof w.localStorage !== 'undefined';
      } catch (t) {
        return !1;
      }
    }
    var v = n(9),
      g = (n(10), n(13)),
      w = n(7),
      y = n(12),
      b = g.userAgent;
    t.exports = {
      retina: r,
      anyIE: i,
      ie9: o,
      ie10: s,
      ios: a,
      android: u,
      canPostMessage: c,
      touch: d,
      cssTransitions: f,
      hasPromiseSupport: h,
      hasIntersectionObserverSupport: l,
      hasPerformanceInformation: p,
      hasLocalStorageSupport: m,
    };
  }, function (t, e) {
    t.exports = document;
  }, function (t, e, n) {
    function r() {
      c('info', l.toRealArray(arguments));
    }

    function i() {
      c('warn', l.toRealArray(arguments));
    }

    function o() {
      c('error', l.toRealArray(arguments));
    }

    function s(t) {
      m && (p[t] = u());
    }

    function a(t) {
      let e;
      m && (p[t] ? (e = u(), r('_twitter', t, e - p[t])) : o('timeEnd() called before time() for id: ', t));
    }

    function u() {
      return f.performance && +f.performance.now() || +new Date();
    }

    function c(t, e) {
      if (f[h] && f[h][t]) {
        switch (e.length) {
          case 1:
            f[h][t](e[0]);
            break;
          case 2:
            f[h][t](e[0], e[1]);
            break;
          case 3:
            f[h][t](e[0], e[1], e[2]);
            break;
          case 4:
            f[h][t](e[0], e[1], e[2], e[3]);
            break;
          case 5:
            f[h][t](e[0], e[1], e[2], e[3], e[4]);
            break;
          default:
            e.length !== 0 && f[h].warn && f[h].warn(`too many params passed to logger.${t}`);
        }
      }
    }
    var d = n(11),
      f = n(7),
      l = n(12),
      h = ['con', 'sole'].join(''),
      p = {},
      m = l.contains(d.href, 'tw_debug=true');
    t.exports = {
      info: r,
      warn: i,
      error: o,
      time: s,
      timeEnd: a,
    };
  }, function (t, e) {
    t.exports = location;
  }, function (t, e, n) {
    function r(t) {
      return f(arguments).slice(1).forEach((e) => {
        o(e, (e, n) => {
          t[e] = n;
        });
      }), t;
    }

    function i(t) {
      return o(t, (e, n) => {
        u(n) && (i(n), c(n) && delete t[e]), void 0 !== n && n !== null && n !== '' || delete t[e];
      }), t;
    }

    function o(t, e) {
      let n;
      for (n in t) t.hasOwnProperty && !t.hasOwnProperty(n) || e(n, t[n]);
      return t;
    }

    function s(t) {
      return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function a(t, e) {
      return t == s(e);
    }

    function u(t) {
      return t === Object(t);
    }

    function c(t) {
      let e;
      if (!u(t)) return !1;
      if (Object.keys) return !Object.keys(t).length;
      for (e in t) { if (t.hasOwnProperty(e)) return !1; }
      return !0;
    }

    function d(t, e) {
      h.setTimeout(() => {
        t.call(e || null);
      }, 0);
    }

    function f(t) {
      return t ? Array.prototype.slice.call(t) : [];
    }

    function l(t, e) {
      return !(!t || !t.indexOf) && t.indexOf(e) > -1;
    }
    var h = n(7);
    t.exports = {
      aug: r,
      async: d,
      compact: i,
      contains: l,
      forIn: o,
      isObject: u,
      isEmptyObject: c,
      toType: s,
      isType: a,
      toRealArray: f,
    };
  }, function (t, e) {
    t.exports = navigator;
  }, function (t, e, n) {
    function r(t, e, n) {
      e.ready = i(t.then, t), n && Array.isArray(e[n]) && (e[n].forEach(i(t.then, t)), delete e[n]);
    }
    var i = n(15);
    t.exports = {
      exposeReadyPromise: r,
    };
  }, function (t, e, n) {
    const r = n(12);
    t.exports = function (t, e) {
      const n = Array.prototype.slice.call(arguments, 2);
      return function () {
        const i = r.toRealArray(arguments);
        return t.apply(e, n.concat(i));
      };
    };
  }, function (t, e, n) {
    const r = n(17);
    t.exports = new r('twttr');
  }, function (t, e, n) {
    function r(t) {
      return a.isType('string', t) ? t.split('.') : a.isType('array', t) ? t : [];
    }

    function i(t, e) {
      let n = r(e),
        i = n.slice(0, -1);
      return i.reduce((t, e, n) => {
        if (t[e] = t[e] || {}, !a.isObject(t[e])) throw new Error(`${i.slice(0, n + 1).join('.')} is already defined with a value.`);
        return t[e];
      }, t);
    }

    function o(t, e) {
      e = e || s, e[t] = e[t] || {}, Object.defineProperty(this, 'base', {
        value: e[t],
      }), Object.defineProperty(this, 'name', {
        value: t,
      });
    }
    var s = n(7),
      a = n(12);
    a.aug(o.prototype, {
      get(t) {
        const e = r(t);
        return e.reduce((t, e) => {
          if (a.isObject(t)) return t[e];
        }, this.base);
      },
      set(t, e, n) {
        let o = r(t),
          s = i(this.base, t),
          a = o.slice(-1);
        return n && a in s ? s[a] : s[a] = e;
      },
      init(t, e) {
        return this.set(t, e, !0);
      },
      unset(t) {
        let e = r(t),
          n = this.get(e.slice(0, -1));
        n && delete n[e.slice(-1)];
      },
      aug(t) {
        let e = this.get(t),
          n = a.toRealArray(arguments).slice(1);
        if (e = typeof e !== 'undefined' ? e : {}, n.unshift(e), !n.every(a.isObject)) throw new Error('Cannot augment non-object.');
        return this.set(t, a.aug.apply(null, n));
      },
      call(t) {
        let e = this.get(t),
          n = a.toRealArray(arguments).slice(1);
        if (!a.isType('function', e)) throw new Error(`Function ${t}does not exist.`);
        return e(...n);
      },
      fullPath(t) {
        const e = r(t);
        return e.unshift(this.name), e.join('.');
      },
    }), t.exports = o;
  }, function (t, e, n) {
    const r = n(17);
    t.exports = new r('__twttr');
  }, function (t, e, n) {
    function r(t) {
      let e = s.href,
        n = `original_referer=${e}`;
      return [t, n].join(t.indexOf('?') == -1 ? '?' : '&');
    }

    function i(t) {
      let e,
        n;
      t.altKey || t.metaKey || t.shiftKey || (e = u.closest(t => t.tagName === 'A' || t.tagName === 'AREA', t.target), e && d.isIntentURL(e.href) && (n = r(e.href), n = n.replace(/^http[:]/, 'https:'), n = n.replace(/^\/\//, 'https://'), c.open(n, e), a.preventDefault(t)));
    }

    function o(t) {
      t.addEventListener('click', i, !1);
    }
    var s = n(11),
      a = n(20),
      u = n(22),
      c = n(23),
      d = n(24);
    t.exports = {
      attachTo: o,
    };
  }, function (t, e, n) {
    function r(t) {
      const e = t.getAttribute('data-twitter-event-id');
      return e || (t.setAttribute('data-twitter-event-id', ++g), g);
    }

    function i(t, e, n) {
      let r = 0,
        i = t && t.length || 0;
      for (r = 0; r < i; r++) { if (t[r].call(e, n, e), n.ceaseImmediately) return !1; }
    }

    function o(t, e, n) {
      for (var r = n || t.target || t.srcElement, s = m.list(r).map(t => `.${t}`), a = s.concat(r.tagName), u = 0, c = a.length; u < c; u++) { if (i(e[a[u]], r, t) === !1) return; }
      t.cease || r !== this && o.call(this, t, e, r.parentElement || r.parentNode);
    }

    function s(t, e, n, r) {
      function i(r) {
        o.call(t, r, n[e]);
      }
      a(t, i, e, r), t.addEventListener(e, i, !1);
    }

    function a(t, e, n, r) {
      t.id && (w[t.id] = w[t.id] || [], w[t.id].push({
        el: t,
        listener: e,
        type: n,
        rootId: r,
      }));
    }

    function u(t) {
      const e = w[t];
      e && (e.forEach((t) => {
        t.el.removeEventListener(t.type, t.listener, !1), delete v[t.rootId];
      }), delete w[t]);
    }

    function c(t, e, n, i) {
      const o = r(t);
      v[o] = v[o] || {}, v[o][e] || (v[o][e] = {}, s(t, e, v[o], o)), v[o][e][n] = v[o][e][n] || [], v[o][e][n].push(i);
    }

    function d(t, e, n) {
      let i = r(e),
        s = v[i] && v[i];
      o.call(e, {
        target: n,
      }, s[t]);
    }

    function f(t) {
      return h(t), l(t), !1;
    }

    function l(t) {
      t && t.preventDefault ? t.preventDefault() : t.returnValue = !1;
    }

    function h(t) {
      t && (t.cease = !0) && t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
    }

    function p(t) {
      t && (t.ceaseImmediately = !0, h(t), t.stopImmediatePropagation());
    }
    var m = n(21),
      v = {},
      g = -1,
      w = {};
    t.exports = {
      stop: f,
      stopPropagation: h,
      stopImmediatePropagation: p,
      preventDefault: l,
      delegate: c,
      simulate: d,
      removeDelegatesForWidget: u,
    };
  }, function (t, e, n) {
    function r(t) {
      return new RegExp(`\\b${t}\\b`, 'g');
    }

    function i(t, e) {
      return t.classList ? void t.classList.add(e) : void (r(e).test(t.className) || (t.className += ` ${e}`));
    }

    function o(t, e) {
      return t.classList ? void t.classList.remove(e) : void (t.className = t.className.replace(r(e), ' '));
    }

    function s(t, e, n) {
      return void 0 === n && t.classList && t.classList.toggle ? t.classList.toggle(e, n) : (n ? i(t, e) : o(t, e), n);
    }

    function a(t, e, n) {
      return t.classList && u(t, e) ? (o(t, e), void i(t, n)) : void (t.className = t.className.replace(r(e), n));
    }

    function u(t, e) {
      return t.classList ? t.classList.contains(e) : d.contains(c(t), e);
    }

    function c(t) {
      return d.toRealArray(t.classList ? t.classList : t.className.match(f));
    }
    var d = n(12),
      f = /\b([\w-_]+)\b/g;
    t.exports = {
      add: i,
      remove: o,
      replace: a,
      toggle: s,
      present: u,
      list: c,
    };
  }, function (t, e, n) {
    function r(t) {
      const e = t.charAt(0);
      return e === '.' ? function (e) {
        const n = e.className ? e.className.split(/\s+/) : [];
        return o.contains(n, t.slice(1));
      } : e === '#' ? function (e) {
        return e.id === t.slice(1);
      } : function (e) {
        return e.tagName === t.toUpperCase();
      };
    }

    function i(t, e, n) {
      let s;
      if (e) return n = n || e && e.ownerDocument, s = o.isType('function', t) ? t : r(t), e === n ? s(e) ? e : void 0 : s(e) ? e : i(s, e.parentNode, n);
    }
    var o = n(12);
    t.exports = {
      closest: i,
    };
  }, function (t, e, n) {
    function r(t, e) {
      u.open(t, {}, e);
    }

    function i(t, e) {
      const n = d.decodeURL(e);
      switch (t) {
        case 'favorite':
        case 'like':
          return {
            tweet_id: n.tweet_id,
          };
        case 'follow':
          return {
            screen_name: n.screen_name,
            user_id: n.user_id,
          };
        case 'retweet':
          return {
            source_tweet_id: n.tweet_id,
          };
        default:
          return {};
      }
    }

    function o(t, e, n) {
      const o = (a.intentType(t) || '').toLowerCase();
      a.isTwitterURL(t) && (r(t, n), e && c.trigger('click', {
        target: e,
        region: 'intent',
        type: 'click',
        data: {},
      }), e && f[o] && f[o].forEach((n) => {
          c.trigger(n, {
            target: e,
            region: 'intent',
            type: n,
            data: i(o, t),
          });
        }));
    }

    function s(t) {
      this.srcEl = [], this.element = t;
    }
    var a = n(24),
      u = n(27),
      c = n(30),
      d = n(25),
      f = {
        favorite: ['favorite', 'like'],
        follow: ['follow'],
        like: ['favorite', 'like'],
        retweet: ['retweet'],
        tweet: ['tweet'],
      };
    s.open = o, t.exports = s;
  }, function (t, e, n) {
    function r(t) {
      return typeof t === 'string' && C.test(t) && RegExp.$1.length <= 20;
    }

    function i(t) {
      if (r(t)) return RegExp.$1;
    }

    function o(t, e) {
      const n = A.decodeURL(t);
      if (e = e || !1, n.screen_name = i(t), n.screen_name) return A.url(`https://twitter.com/intent/${e ? 'follow' : 'user'}`, n);
    }

    function s(t) {
      return o(t, !0);
    }

    function a(t) {
      return typeof t === 'string' && R.test(t);
    }

    function u(t, e) {
      if (e = void 0 === e || e, a(t)) return (e ? '#' : '') + RegExp.$1;
    }

    function c(t) {
      return D.test(t) || z.test(t);
    }

    function d(t) {
      return typeof t === 'string' && T.test(t);
    }

    function f(t) {
      return d(t) && RegExp.$1;
    }

    function l(t) {
      return I.test(t);
    }

    function h(t) {
      return S.test(t);
    }

    function p(t) {
      return P.test(t);
    }

    function m(t) {
      return F.test(t);
    }

    function v(t) {
      return M.test(t);
    }

    function g(t) {
      return j.test(t) && RegExp.$1;
    }

    function w(t) {
      return N.test(t) && RegExp.$1;
    }

    function y(t) {
      return P.test(t) && RegExp.$1;
    }

    function b(t) {
      return k.test(t) && RegExp.$1;
    }

    function _(t) {
      return !!L.test(t) && {
        ownerScreenName: RegExp.$1,
        slug: RegExp.$2,
      };
    }

    function E(t) {
      return !!O.test(t) && {
        ownerScreenName: RegExp.$1,
        slug: RegExp.$2,
      };
    }

    function x(t) {
      return B.test(t) && RegExp.$1;
    }
    var A = n(25),
      C = /(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,
      T = /(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,
      I = /^http(s?):\/\/(\w+\.)*twitter\.com([:\/]|$)/i,
      S = /^http(s?):\/\/pbs\.twimg\.com\//,
      R = /^#?([^.,<>!\s\/#\-()'"]+)$/,
      P = /twitter\.com(?::\d{2,4})?\/intent\/(\w+)/,
      N = /^https?:\/\/(?:www\.)?twitter\.com\/\w+\/timelines\/(\d+)/i,
      j = /^https?:\/\/(?:www\.)?twitter\.com\/i\/moments\/(\d+)/i,
      k = /^https?:\/\/(?:www\.)?twitter\.com\/(\w+)\/(?:likes|favorites)/i,
      L = /^https?:\/\/(?:www\.)?twitter\.com\/(\w+)\/lists\/([\w-]+)/i,
      O = /^https?:\/\/(?:www\.)?twitter\.com\/(\w+)\/([\w-]+)/i,
      D = /^https?:\/\/(?:www\.)?twitter\.com\/hashtag\/([\w-]+)/i,
      z = /^https?:\/\/(?:www\.)?twitter\.com\/search/i,
      B = /^https?:\/\/(?:www\.)?twitter\.com\/i\/live\/(\d+)/i,
      F = /^https?:\/\/syndication\.twitter\.com\/settings/i,
      M = /^https?:\/\/(localhost|platform)\.twitter\.com(?::\d+)?\/widgets\/widget_iframe\.(.+)/i;
    t.exports = {
      isHashTag: a,
      hashTag: u,
      isSearchUrl: c,
      isScreenName: r,
      screenName: i,
      isStatus: d,
      status: f,
      intentForProfileURL: o,
      intentForFollowURL: s,
      isTwitterURL: l,
      isTwimgURL: h,
      isIntentURL: p,
      isSettingsURL: m,
      isWidgetIframeURL: v,
      regexen: {
        profile: C,
      },
      momentId: g,
      collectionId: w,
      intentType: y,
      likesScreenName: b,
      listScreenNameAndSlug: _,
      listLegacyScreenNameAndSlug: E,
      eventId: x,
    };
  }, function (t, e, n) {
    function r(t) {
      return encodeURIComponent(t).replace(/\+/g, '%2B').replace(/'/g, '%27');
    }

    function i(t) {
      return decodeURIComponent(t);
    }

    function o(t) {
      const e = [];
      return d.forIn(t, (t, n) => {
        const i = r(t);
        d.isType('array', n) || (n = [n]), n.forEach((t) => {
          c.hasValue(t) && e.push(`${i}=${r(t)}`);
        });
      }), e.sort().join('&');
    }

    function s(t) {
      let e,
        n = {};
      return t ? (e = t.split('&'), e.forEach((t) => {
        let e = t.split('='),
          r = i(e[0]),
          o = i(e[1]);
        if (e.length == 2) return d.isType('array', n[r]) ? void n[r].push(o) : r in n ? (n[r] = [n[r]], void n[r].push(o)) : void (n[r] = o);
      }), n) : {};
    }

    function a(t, e) {
      const n = o(e);
      return n.length > 0 ? d.contains(t, '?') ? `${t}&${o(e)}` : `${t}?${o(e)}` : t;
    }

    function u(t) {
      const e = t && t.split('?');
      return e.length == 2 ? s(e[1]) : {};
    }
    var c = n(26),
      d = n(12);
    t.exports = {
      url: a,
      decodeURL: u,
      decode: s,
      encode: o,
      encodePart: r,
      decodePart: i,
    };
  }, function (t, e, n) {
    function r(t) {
      return void 0 !== t && t !== null && t !== '';
    }

    function i(t) {
      return a(t) && t % 1 === 0;
    }

    function o(t) {
      return m.toType(t) === 'string';
    }

    function s(t) {
      return a(t) && !i(t);
    }

    function a(t) {
      return r(t) && !isNaN(t);
    }

    function u(t) {
      return r(t) && m.toType(t) == 'array';
    }

    function c(t) {
      return m.contains(g, t);
    }

    function d(t) {
      return m.contains(v, t);
    }

    function f(t) {
      return !!r(t) && (!!d(t) || !c(t) && !!t);
    }

    function l(t) {
      if (a(t)) return t;
    }

    function h(t) {
      if (s(t)) return t;
    }

    function p(t) {
      if (i(t)) return parseInt(t, 10);
    }
    var m = n(12),
      v = [!0, 1, '1', 'on', 'ON', 'true', 'TRUE', 'yes', 'YES'],
      g = [!1, 0, '0', 'off', 'OFF', 'false', 'FALSE', 'no', 'NO'];
    t.exports = {
      hasValue: r,
      isInt: i,
      isFloat: s,
      isNumber: a,
      isString: o,
      isArray: u,
      isTruthValue: d,
      isFalseValue: c,
      asInt: p,
      asFloat: h,
      asNumber: l,
      asBoolean: f,
    };
  }, function (t, e, n) {
    function r(t) {
      const e = [];
      return m.forIn(t, (t, n) => {
        e.push(`${t}=${n}`);
      }), e.join(',');
    }

    function i() {
      return v + p.generate();
    }

    function o(t, e) {
      function n(t) {
        return Math.round(t / 2);
      }
      return t > e ? {
        coordinate: 0,
        size: e,
      } : {
        coordinate: n(e) - n(t),
        size: t,
      };
    }

    function s(t, e, n) {
      let i,
        s;
      e = a.parse(e), n = n || {}, i = o(e.width, n.width || g), e.left = i.coordinate, e.width = i.size, s = o(e.height, n.height || w), e.top = s.coordinate, e.height = s.size, this.win = t, this.features = r(e);
    }
    var a,
      u = n(7),
      c = n(28),
      d = n(20),
      f = n(22),
      l = n(8),
      h = n(24),
      p = n(29),
      m = n(12),
      v = 'intent_',
      g = u.screen.width,
      w = u.screen.height;
    a = (new c()).defaults({
      width: 550,
      height: 520,
      personalbar: '0',
      toolbar: '0',
      location: '1',
      scrollbars: '1',
      resizable: '1',
    }), s.prototype.open = function (t, e) {
      let n = e && e.type == 'click' && f.closest('a', e.target),
        r = e && (e.altKey || e.metaKey || e.shiftKey),
        o = n && (l.ios() || l.android());
      if (h.isTwitterURL(t)) return r || o ? this : (this.name = i(), this.popup = this.win.open(t, this.name, this.features), e && d.preventDefault(e), this);
    }, s.open = function (t, e, n) {
      const r = new s(u, e);
      return r.open(t, n);
    }, t.exports = s;
  }, function (t, e, n) {
    function r(t) {
      return function (e) {
        return o.hasValue(e[t]);
      };
    }

    function i() {
      this.assertions = [], this._defaults = {};
    }
    var o = n(26),
      s = n(12);
    i.prototype.assert = function (t, e) {
      return this.assertions.push({
        fn: t,
        msg: e || 'assertion failed',
      }), this;
    }, i.prototype.defaults = function (t) {
      return this._defaults = t || this._defaults, this;
    }, i.prototype.require = function (t) {
      const e = this;
      return t = Array.isArray(t) ? t : s.toRealArray(arguments), t.forEach((t) => {
        e.assert(r(t), `required: ${t}`);
      }), this;
    }, i.prototype.parse = function (t) {
      let e,
        n;
      if (e = s.aug({}, this._defaults, t || {}), n = this.assertions.reduce((t, n) => n.fn(e) || t.push(n.msg), t, []), n.length > 0) throw new Error(n.join('\n'));
      return e;
    }, t.exports = i;
  }, function (t, e) {
    function n() {
      return i + String(+new Date()) + Math.floor(1e5 * Math.random()) + o++;
    }

    function r() {
      return i + String(s++);
    }
    var i = 'i',
      o = 0,
      s = 0;
    t.exports = {
      generate: n,
      deterministic: r,
    };
  }, function (t, e, n) {
    function r() {
      return i.get('events') || {};
    }
    var i = n(16),
      o = n(31),
      s = n(12);
    t.exports = s.aug(r(), o.Emitter);
  }, function (t, e, n) {
    function r() {
      return i.aug(() => {}, s);
    }
    var i = n(12),
      o = n(15),
      s = {
        bind(t, e) {
          return this._handlers = this._handlers || {}, this._handlers[t] = this._handlers[t] || [], this._handlers[t].push(e);
        },
        unbind(t, e) {
          let n;
          this._handlers && this._handlers[t] && (e ? (n = this._handlers[t].indexOf(e), n >= 0 && this._handlers[t].splice(n, 1)) : this._handlers[t] = []);
        },
        trigger(t, e) {
          const n = this._handlers && this._handlers[t];
          e = e || {}, e.type = t, n && n.forEach(function (t) {
            i.async(o(t, this, e));
          });
        },
      };
    t.exports = {
      Emitter: s,
      makeEmitter: r,
    };
  }, function (t, e, n) {
    function r(t) {
      return t.reduce((t, e) => t.concat(w.reduce((t, n) => t.concat(n(e)), [])), []);
    }

    function i() {
      const t = f.val('widgets:autoload') || !0;
      return !m.isFalseValue(t) && (m.isTruthValue(t) ? a.body : a.querySelectorAll(t));
    }

    function o(t) {
      let e;
      return t = t || a.body, t = t.length ? v.toRealArray(t) : [t], h.pause(), e = c.allResolved(r(t).map(t => d.addWidget(t))).then((t) => {
        p.trigger('loaded', {
          widgets: t,
        }), y.emitter.trigger(y.ALL_WIDGETS_RENDERED, {
          widgets: t,
        });
      }), c.always(e, () => {
        h.resume();
      }), e;
    }

    function s() {
      const t = i();
      return g.load(), t === !1 ? u.resolve() : (l.set('widgets.loaded', !0), o(t));
    }
    var a = n(9),
      u = n(2),
      c = n(33),
      d = n(34),
      f = n(41),
      l = n(18),
      h = n(42),
      p = n(30),
      m = n(26),
      v = n(12),
      g = n(73),
      w = n(78),
      y = n(240);
    t.exports = {
      load: o,
      loadPage: s,
      _getPageLoadTarget: i,
    };
  }, function (t, e, n) {
    function r(t, e) {
      return t.then(e, e);
    }

    function i(t) {
      let e;
      return t = t || [], e = t.length, t = t.filter(a), e ? e !== t.length ? c.reject('non-Promise passed to .some') : new c(((e, n) => {
        function r() {
          i += 1, i === t.length && n();
        }
        var i = 0;
        t.forEach((t) => {
          t.then(e, r);
        });
      })) : c.reject('no promises passed to .some');
    }

    function o(t) {
      let e;
      return void 0 === t ? c.reject(new Error('undefined is not an object')) : Array.isArray(t) ? (e = t.length, e ? new c(((n, r) => {
        function i() {
          s += 1, s === e && (u.length === 0 ? r() : n(u));
        }

        function o(t) {
          u.push(t), i();
        }
        var s = 0,
          u = [];
        t.forEach((t) => {
          a(t) ? t.then(o, i) : o(t);
        });
      })) : c.resolve([])) : c.reject(new Error('Type error'));
    }

    function s(t) {
      function e() {}
      return c.all((t || []).map(t => r(t, e)));
    }

    function a(t) {
      return t instanceof c;
    }

    function u(t, e) {
      const n = new d();
      return setTimeout(() => {
        n.reject(new Error('Promise timed out'));
      }, e), t.then((t) => {
        n.resolve(t);
      }, (t) => {
        n.reject(t);
      }), n.promise;
    }
    var c = n(2),
      d = n(1);
    t.exports = {
      always: r,
      allResolved: o,
      some: i,
      isPromise: a,
      allSettled: s,
      timeout: u,
    };
  }, function (t, e, n) {
    function r(t) {
      return t.reduce((t, e) => t[e.className] = t[e.className] || [], t[e.className].push(e), t, {});
    }

    function i(t) {
      let e = t.map(s.fromRawTask),
        n = r(e);
      f.forIn(n, (t, e) => {
        c.allSettled(e.map(t => t.initialize())).then(() => {
          e.forEach((t) => {
            u.all([t.hydrate(), t.insertIntoDom()]).then(d(t.render, t)).then(d(t.success, t), d(t.fail, t));
          });
        });
      });
    }

    function o(t) {
      return l.add(t);
    }
    var s = n(35),
      a = n(39),
      u = n(2),
      c = n(33),
      d = n(15),
      f = n(12),
      l = new a(i);
    t.exports = {
      addWidget: o,
    };
  }, function (t, e, n) {
    function r(t) {
      const e = t.srcEl || t.targetEl;
      return e.ownerDocument.defaultView;
    }

    function i(t, e) {
      this._widget = null, this._sandbox = null, this._hydrated = !1, this._insertedIntoDom = !1, this._Sandbox = t.Sandbox, this._factory = t.factory, this._widgetParams = t.parameters, this._resolve = e, this._className = t.className, this._renderedClassName = `${t.className}-rendered`, this._errorClassName = `${t.className}-error`, this._srcEl = t.srcEl, this._targetGlobal = r(t), this._insertionStrategy = function (e) {
        let n = t.srcEl,
          r = t.targetEl;
        n ? r.insertBefore(e, n) : r.appendChild(e);
      };
    }
    let o = n(21),
      s = n(36),
      a = n(30),
      u = n(38),
      c = n(2),
      d = n(33);
    i.fromRawTask = function (t) {
      return new i(t.input, t.taskDoneDeferred.resolve);
    }, i.prototype.initialize = function () {
      let t = this,
        e = new this._Sandbox(this._targetGlobal);
      return this._factory(this._widgetParams, e).then(n => t._widget = n, t._sandbox = e, n);
    }, i.prototype.insertIntoDom = function () {
      const t = this;
      return this._widget ? this._sandbox.insert(this._widget.id, {
        class: [this._className, this._renderedClassName].join(' '),
      }, null, this._insertionStrategy).then(() => {
        t._insertedIntoDom = !0;
      }) : c.reject(new Error('cannot insert widget into DOM before it is initialized'));
    }, i.prototype.hydrate = function () {
      const t = this;
      return this._widget ? this._widget.hydrate().then(() => {
        t._hydrated = !0;
      }) : c.reject(new Error('cannot hydrate widget before it is initialized'));
    }, i.prototype.render = function () {
      function t() {
        r._sandbox.onResize(() => r._widget.resize().then(() => {
          a.trigger('resize', {
            target: r._sandbox.sandboxEl,
          });
        }));
      }

      function e() {
        return u(r._srcEl).then(() => r._sandbox.sandboxEl);
      }

      function n(t) {
        return u(r._sandbox.sandboxEl).then(() => c.reject(t));
      }
      var r = this;
      return this._hydrated ? this._insertedIntoDom ? r._widget.render(r._sandbox).then(() => t(), r._widget.show()).then(e, n) : n(new Error('cannot render widget before DOM insertion')) : n(new Error('cannot render widget before hydration'));
    }, i.prototype.fail = function () {
      const t = this;
      return this._srcEl ? d.always(s.write(() => {
        o.add(t._srcEl, t._errorClassName);
      }), () => {
        a.trigger('rendered', {
          target: t._srcEl,
        }), t._resolve(t._srcEl);
      }) : (t._resolve(), c.resolve());
    }, i.prototype.success = function () {
      a.trigger('rendered', {
        target: this._sandbox.sandboxEl,
      }), this._resolve(this._sandbox.sandboxEl);
    }, t.exports = i;
  }, function (t, e, n) {
    function r(t, e) {
      return function () {
        try {
          e.resolve(t.call(this));
        } catch (t) {
          e.reject(t);
        }
      };
    }

    function i(t, e) {
      t.call(e);
    }

    function o(t, e) {
      const n = new c();
      return u.read(r(t, n), e), n.promise;
    }

    function s(t, e) {
      const n = new c();
      return u.write(r(t, n), e), n.promise;
    }

    function a(t, e, n) {
      const i = new c();
      return d.isType('function', t) && (n = e, e = t, t = 1), u.defer(t, r(e, i), n), i.promise;
    }
    var u = n(37),
      c = n(1),
      d = n(12);
    t.exports = {
      sync: i,
      read: o,
      write: s,
      defer: a,
    };
  }, function (t, e, n) {
    let r;
    !(function () {
      function i() {
        this.frames = [], this.lastId = 0, this.raf = o, this.batch = {
          hash: {},
          read: [],
          write: [],
          mode: null,
        };
      }
      var o = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
        return window.setTimeout(t, 1e3 / 60);
      };
      i.prototype.read = function (t, e) {
        let n = this.add('read', t, e),
          r = n.id;
        this.batch.read.push(n.id);
        const i = this.batch.mode === 'reading' || this.batch.scheduled;
        return i ? r : (this.scheduleBatch(), r);
      }, i.prototype.write = function (t, e) {
        let n = this.add('write', t, e),
          r = this.batch.mode,
          i = n.id;
        this.batch.write.push(n.id);
        const o = r === 'writing' || r === 'reading' || this.batch.scheduled;
        return o ? i : (this.scheduleBatch(), i);
      }, i.prototype.defer = function (t, e, n) {
        typeof t === 'function' && (n = e, e = t, t = 1);
        let r = this,
          i = t - 1;
        return this.schedule(i, () => {
          r.run({
            fn: e,
            ctx: n,
          });
        });
      }, i.prototype.clear = function (t) {
        if (typeof t === 'function') return this.clearFrame(t);
        t = Number(t);
        const e = this.batch.hash[t];
        if (e) {
          let n = this.batch[e.type],
            r = n.indexOf(t);
          delete this.batch.hash[t], ~r && n.splice(r, 1);
        }
      }, i.prototype.clearFrame = function (t) {
        const e = this.frames.indexOf(t);
        ~e && this.frames.splice(e, 1);
      }, i.prototype.scheduleBatch = function () {
        const t = this;
        this.schedule(0, () => {
          t.batch.scheduled = !1, t.runBatch();
        }), this.batch.scheduled = !0;
      }, i.prototype.uniqueId = function () {
        return ++this.lastId;
      }, i.prototype.flush = function (t) {
        for (var e; e = t.shift();) this.run(this.batch.hash[e]);
      }, i.prototype.runBatch = function () {
        try {
          this.batch.mode = 'reading', this.flush(this.batch.read), this.batch.mode = 'writing', this.flush(this.batch.write), this.batch.mode = null;
        } catch (t) {
          throw this.runBatch(), t;
        }
      }, i.prototype.add = function (t, e, n) {
        const r = this.uniqueId();
        return this.batch.hash[r] = {
          id: r,
          fn: e,
          ctx: n,
          type: t,
        };
      }, i.prototype.run = function (t) {
        let e = t.ctx || this,
          n = t.fn;
        if (delete this.batch.hash[t.id], !this.onError) return n.call(e);
        try {
          n.call(e);
        } catch (t) {
          this.onError(t);
        }
      }, i.prototype.loop = function () {
        function t() {
          const e = n.frames.shift();
          n.frames.length ? r(t) : n.looping = !1, e && e();
        }
        var e,
          n = this,
          r = this.raf,
          i = !1,
          o = 500;
        this.looping || (e = setTimeout(() => {
          i = !0, t();
        }, o), r(() => {
            i || (clearTimeout(e), t());
          }), this.looping = !0);
      }, i.prototype.schedule = function (t, e) {
        return this.frames[t] ? this.schedule(t + 1, e) : (this.loop(), this.frames[t] = e);
      };
      const s = new i();
      typeof t !== 'undefined' && t.exports ? t.exports = s : (r = function () {
        return s;
      }.call(e, n, e, t), !(void 0 !== r && (t.exports = r)));
    }());
  }, function (t, e, n) {
    function r(t) {
      return i.write(() => {
        t && t.parentNode && t.parentNode.removeChild(t);
      });
    }
    var i = n(36);
    t.exports = r;
  }, function (t, e, n) {
    function r(t) {
      this._inputsQueue = [], this._task = t, this._hasFlushBeenScheduled = !1;
    }
    let i = n(1),
      o = n(40),
      s = n(15);
    r.prototype.add = function (t) {
      const e = new i();
      return this._inputsQueue.push({
        input: t,
        taskDoneDeferred: e,
      }), this._hasFlushBeenScheduled || (this._hasFlushBeenScheduled = !0, o(s(this._flush, this))), e.promise;
    }, r.prototype._flush = function () {
      try {
        this._task.call(null, this._inputsQueue);
      } catch (t) {
        this._inputsQueue.forEach((e) => {
          e.taskDoneDeferred.reject(t);
        });
      }
      this._inputsQueue = [], this._hasFlushBeenScheduled = !1;
    }, t.exports = r;
  }, function (t, e, n) {
    const r = n(3).Promise;
    t.exports = r._asap;
  }, function (t, e, n) {
    function r(t) {
      let e,
        n,
        r,
        i = 0;
      for (o = {}, t = t || s, e = t.getElementsByTagName('meta'); e[i]; i++) n = e[i], /^twitter:/.test(n.name) && (r = n.name.replace(/^twitter:/, ''), o[r] = n.content);
    }

    function i(t) {
      return o[t];
    }
    var o,
      s = n(9);
    r(), t.exports = {
      init: r,
      val: i,
    };
  }, function (t, e, n) {
    function r(t) {
      t.forEach((t) => {
        let e = t.input.namespace,
          n = t.input.data,
          r = t.input.offsite,
          i = t.input.version;
        f.clientEvent(e, n, r, i), t.taskDoneDeferred.resolve();
      });
    }

    function i(t) {
      function e() {
        t.forEach((t) => {
          t.taskDoneDeferred.resolve();
        });
      }

      function n() {
        t.forEach((t) => {
          t.taskDoneDeferred.reject();
        });
      }
      d.init(), t.forEach((t) => {
        let e = t.input.namespace,
          n = t.input.data,
          r = t.input.offsite,
          i = t.input.version;
        d.clientEvent(e, n, r, i);
      }), d.flush().then(e, n);
    }

    function o(t) {
      let e,
        n,
        o;
      if (t.length !== 0) {
        if (t.length === 1) return r(t);
        e = c(t, t => l.noticeSeen(t.input.namespace)), n = e.true, o = e.false, n && n.length > 0 && r(n.slice(0, 1)), o && (o.length === 1 ? r : i)(o);
      }
    }

    function s(t, e, n, r) {
      return p.add({
        namespace: t,
        data: e,
        offsite: n,
        version: r,
      });
    }

    function a() {
      p.pause();
    }

    function u() {
      p.resume();
    }
    var c = n(43),
      d = n(44),
      f = n(71),
      l = n(50),
      h = n(72),
      p = new h(o);
    t.exports = {
      scribe: s,
      pause: a,
      resume: u,
    };
  }, function (t, e) {
    function n(t, e) {
      return t.reduce((t, n) => {
        const r = e(n);
        return t[r] = t[r] || [], t[r].push(n), t;
      }, {});
    }
    t.exports = n;
  }, function (t, e, n) {
    function r() {
      function t(t) {
        p.body.appendChild(t);
      }
      return R ? P.promise : (h = new E(m), h.insert('rufous-sandbox', null, {
        display: 'none',
      }, t).then(() => {
        h.setTitle('Twitter analytics iframe'), f = c(), l = d(), P.resolve([f, l]);
      }), R = !0, P.promise);
    }

    function i(t, e) {
      let n,
        r,
        i;
      _.isObject(t) && _.isObject(e) && (i = b.flattenClientEventPayload(t, e), n = f.firstChild, n.value = +(+n.value || i.dnt || 0), r = h.createElement('input'), r.type = 'hidden', r.name = 'l', r.value = b.stringify(i), f.appendChild(r));
    }

    function o(t, e) {
      let n = !_.isObject(t),
        r = !!e && !_.isObject(e),
        i = n || r;
      return i;
    }

    function s(t, e, n, r) {
      o(t, e) || (A && A(arguments), P.promise.then(() => {
        i(b.formatClientEventNamespace(t), b.formatClientEventData(e, n, r));
      }));
    }

    function a() {
      return P.promise.then(() => {
        let t;
        return f.children.length <= 2 ? y.reject() : (t = y.all([h.doc.body.appendChild(f), h.doc.body.appendChild(l)]).then((t) => {
          let e = t[0],
            n = t[1];
          return n.addEventListener('load', () => {
            u(e, n)();
          }), e.submit(), t;
        }), f = c(), l = d(), t);
      });
    }

    function u(t, e) {
      return function () {
        const n = t.parentNode;
        n && (n.removeChild(t), n.removeChild(e));
      };
    }

    function c() {
      let t = h.createElement('form'),
        e = h.createElement('input'),
        n = h.createElement('input');
      return S++, t.action = b.CLIENT_EVENT_ENDPOINT, t.method = 'POST', t.target = T + S, t.id = I + S, e.type = 'hidden', e.name = 'dnt', e.value = g.enabled(), n.type = 'hidden', n.name = 'tfw_redirect', n.value = b.RUFOUS_REDIRECT, t.appendChild(e), t.appendChild(n), t;
    }

    function d() {
      const t = T + S;
      return v({
        id: t,
        name: t,
        width: 0,
        height: 0,
        border: 0,
      }, {
        display: 'none',
      }, h.doc);
    }
    var f,
      l,
      h,
      p = n(9),
      m = n(7),
      v = n(45),
      g = n(46),
      w = n(1),
      y = n(2),
      b = n(50),
      _ = n(12),
      E = n(53),
      x = n(18),
      A = x.get('scribeCallback'),
      C = `${Math.floor(1e3 * Math.random())}_`,
      T = `rufous-frame-${C}-`,
      I = `rufous-form-${C}-`,
      S = 0,
      R = !1,
      P = new w();
    t.exports = {
      clientEvent: s,
      flush: a,
      init: r,
    };
  }, function (t, e, n) {
    let r = n(9),
      i = n(12);
    t.exports = function (t, e, n) {
      let o;
      if (n = n || r, t = t || {}, e = e || {}, t.name) {
        try {
          o = n.createElement(`<iframe name="${t.name}"></iframe>`);
        } catch (e) {
          o = n.createElement('iframe'), o.name = t.name;
        }
        delete t.name;
      } else o = n.createElement('iframe');
      return t.id && (o.id = t.id, delete t.id), o.allowtransparency = 'true', o.scrolling = 'no', o.setAttribute('frameBorder', 0), o.setAttribute('allowTransparency', !0), i.forIn(t, (t, e) => {
        o.setAttribute(t, e);
      }), i.forIn(e, (t, e) => {
        o.style[t] = e;
      }), o;
    };
  }, function (t, e, n) {
    function r() {
      f = !0;
    }

    function i(t, e) {
      return !!f || (!!c.asBoolean(d.val('dnt')) || (!!u.isUrlSensitive(e || s.host) || (!(!a.isFramed() || !u.isUrlSensitive(a.rootDocumentLocation())) || (t = l.test(t || o.referrer) && RegExp.$1, !(!t || !u.isUrlSensitive(t))))));
    }
    var o = n(9),
      s = n(11),
      a = n(47),
      u = n(49),
      c = n(26),
      d = n(41),
      f = !1,
      l = /https?:\/\/([^\/]+).*/i;
    t.exports = {
      setOn: r,
      enabled: i,
    };
  }, function (t, e, n) {
    function r(t) {
      return t && u.isType('string', t) && (c = t), c;
    }

    function i() {
      return d;
    }

    function o() {
      return c !== d;
    }
    var s = n(11),
      a = n(48),
      u = n(12),
      c = a.getCanonicalURL() || s.href,
      d = c;
    t.exports = {
      isFramed: o,
      rootDocumentLocation: r,
      currentDocumentLocation: i,
    };
  }, function (t, e, n) {
    function r(t, e) {
      let n,
        r;
      return e = e || a, /^https?:\/\//.test(t) ? t : /^\/\//.test(t) ? e.protocol + t : (n = e.host + (e.port.length ? `:${e.port}` : ''), t.indexOf('/') !== 0 && (r = e.pathname.split('/'), r.pop(), r.push(t), t = `/${r.join('/')}`), [e.protocol, '//', n, t].join(''));
    }

    function i() {
      for (var t, e = s.getElementsByTagName('link'), n = 0; e[n]; n++) { if (t = e[n], t.rel == 'canonical') return r(t.href); }
    }

    function o() {
      for (var t, e, n, r = s.getElementsByTagName('a'), i = s.getElementsByTagName('link'), o = [r, i], a = 0, c = 0, d = /\bme\b/; t = o[a]; a++) {
        for (c = 0; e = t[c]; c++) { if (d.test(e.rel) && (n = u.screenName(e.href))) return n; }
      }
    }
    var s = n(9),
      a = n(11),
      u = n(24);
    t.exports = {
      absolutize: r,
      getCanonicalURL: i,
      getScreenNameFromPage: o,
    };
  }, function (t, e, n) {
    function r(t) {
      return t in a ? a[t] : a[t] = s.test(t);
    }

    function i() {
      return r(o.host);
    }
    var o = n(11),
      s = /^[^#?]*\.(gov|mil)(:\d+)?([#?].*)?$/i,
      a = {};
    t.exports = {
      isUrlSensitive: r,
      isHostPageSensitive: i,
    };
  }, function (t, e, n) {
    function r(t, e) {
      let n;
      return e = e || {}, t && t.nodeType === Node.ELEMENT_NODE ? (n = t.getAttribute('data-scribe'), n && n.split(' ').forEach((t) => {
        let n = t.trim().split(':'),
          r = n[0],
          i = n[1];
        r && i && !e[r] && (e[r] = i);
      }), r(t.parentNode, e)) : e;
    }

    function i(t) {
      return m.aug({
        client: 'tfw',
      }, t || {});
    }

    function o(t, e, n) {
      const r = t && t.widget_origin || l.referrer;
      return t = s('tfw_client_event', t, r), t.client_version = w, t.format_version = void 0 !== n ? n : 1, e || (t.widget_origin = r), t;
    }

    function s(t, e, n) {
      return e = e || {}, m.aug({}, e, {
        _category_: t,
        triggered_on: e.triggered_on || +new Date(),
        dnt: p.enabled(n),
      });
    }

    function a(t, e) {
      const n = {};
      return e = e || {}, e.association_namespace = i(t), n[E] = e, n;
    }

    function u(t, e) {
      return m.aug({}, e, {
        event_namespace: t,
      });
    }

    function c(t) {
      return t.element === 'notice' && t.action === 'seen';
    }

    function d(t) {
      let e,
        n = Array.prototype.toJSON;
      return delete Array.prototype.toJSON, e = h.stringify(t), n && (Array.prototype.toJSON = n), e;
    }

    function f(t) {
      let e,
        n,
        r,
        i,
        o,
        s;
      return t.item_ids && t.item_ids.length > 1 ? (e = Math.floor(t.item_ids.length / 2), n = t.item_ids.slice(0, e), r = {}, i = t.item_ids.slice(e), o = {}, n.forEach((e) => {
        r[e] = t.item_details[e];
      }), i.forEach((e) => {
          o[e] = t.item_details[e];
        }), s = [m.aug({}, t, {
          item_ids: n,
          item_details: r,
        }), m.aug({}, t, {
          item_ids: i,
          item_details: o,
        })]) : [t];
    }
    var l = n(9),
      h = n(51),
      p = n(46),
      m = n(12),
      v = n(52),
      g = n(18),
      w = v.version,
      y = g.get('clientEventEndpoint') || 'https://syndication.twitter.com/i/jot',
      b = 'https://syndication.twitter.com/i/jot/syndication',
      _ = 'https://platform.twitter.com/jot.html',
      E = 1;
    t.exports = {
      extractTermsFromDOM: r,
      flattenClientEventPayload: u,
      formatGenericEventData: s,
      formatClientEventData: o,
      formatClientEventNamespace: i,
      formatTweetAssociation: a,
      noticeSeen: c,
      splitLogEntry: f,
      stringify: d,
      AUDIENCE_ENDPOINT: b,
      CLIENT_EVENT_ENDPOINT: y,
      RUFOUS_REDIRECT: _,
    };
  }, function (t, e, n) {
    let r = n(7),
      i = r.JSON;
    t.exports = {
      stringify: i.stringify || i.encode,
      parse: i.parse || i.decode,
    };
  }, function (t, e) {
    t.exports = {
      version: '85b189a:1517984532609',
    };
  }, function (t, e, n) {
    let r = n(54),
      i = n(63);
    t.exports = r.build([i]);
  }, function (t, e, n) {
    let r = n(55),
      i = n(58),
      o = n(15);
    r = Object.create(r), r.build = o(r.build, null, i), t.exports = r;
  }, function (t, e, n) {
    function r() {
      return a.toRealArray(arguments);
    }

    function i(t, e, n) {
      const r = new t();
      return e = s(o(e || [])), e.forEach((t) => {
        t.call(null, r);
      }), r.build(n);
    }
    var o = n(56),
      s = n(57),
      a = n(12);
    t.exports = {
      couple: r,
      build: i,
    };
  }, function (t, e, n) {
    function r(t) {
      let e = [];
      return t.forEach((t) => {
        const n = i.isType('array', t) ? r(t) : [t];
        e = e.concat(n);
      }), e;
    }
    var i = n(12);
    t.exports = r;
  }, function (t, e) {
    function n(t) {
      return t.filter((e, n) => t.indexOf(e) === n);
    }
    t.exports = n;
  }, function (t, e, n) {
    function r() {
      i.apply(this, arguments);
    }
    var i = n(59),
      o = n(12),
      s = n(62);
    r.prototype = Object.create(i.prototype), o.aug(r.prototype, {
      factory: s,
    }), t.exports = r;
  }, function (t, e, n) {
    function r(t, e, n) {
      const r = this[e];
      if (!r) throw new Error(`${e} does not exist`);
      this[e] = t(r, n);
    }

    function i() {
      this.Component = this.factory(), this._adviceArgs = [], this._lastArgs = [];
    }
    let o = n(60),
      s = n(12),
      a = n(61);
    s.aug(i.prototype, {
      factory: a,
      build(t) {
        const e = this;
        this.Component;
        return s.aug(this.Component.prototype.boundParams, t), this._adviceArgs.concat(this._lastArgs).forEach((t) => {
          r.apply(e.Component.prototype, t);
        }), delete this._lastArgs, delete this._adviceArgs, this.Component;
      },
      params(t) {
        const e = this.Component.prototype.paramConfigs;
        t = t || {}, this.Component.prototype.paramConfigs = s.aug({}, t, e);
      },
      define(t, e) {
        if (t in this.Component.prototype) throw new Error(`${t} has previously been defined`);
        this.override(t, e);
      },
      defineStatic(t, e) {
        this.Component[t] = e;
      },
      override(t, e) {
        this.Component.prototype[t] = e;
      },
      defineProperty(t, e) {
        if (t in this.Component.prototype) throw new Error(`${t} has previously been defined`);
        this.overrideProperty(t, e);
      },
      overrideProperty(t, e) {
        const n = s.aug({
          configurable: !0,
        }, e);
        Object.defineProperty(this.Component.prototype, t, n);
      },
      before(t, e) {
        this._adviceArgs.push([o.before, t, e]);
      },
      after(t, e) {
        this._adviceArgs.push([o.after, t, e]);
      },
      around(t, e) {
        this._adviceArgs.push([o.around, t, e]);
      },
      last(t, e) {
        this._lastArgs.push([o.after, t, e]);
      },
    }), t.exports = i;
  }, function (t, e, n) {
    function r(t, e) {
      return function () {
        let n,
          r = this,
          i = arguments;
        return n = e.apply(this, arguments), s.isPromise(n) ? n.then(() => t.apply(r, i)) : t.apply(this, arguments);
      };
    }

    function i(t, e) {
      return function () {
        function n(t, e) {
          return s.isPromise(e) ? e.then(() => t) : t;
        }
        let r,
          i = this,
          o = arguments;
        return r = t.apply(this, arguments), s.isPromise(r) ? r.then(t => n(t, e.apply(i, o))) : n(r, e.apply(this, arguments));
      };
    }

    function o(t, e) {
      return function () {
        const n = a.toRealArray(arguments);
        return n.unshift(u(t, this)), e.apply(this, n);
      };
    }
    var s = n(33),
      a = n(12),
      u = n(15);
    t.exports = {
      before: r,
      after: i,
      around: o,
    };
  }, function (t, e, n) {
    function r() {
      return !0;
    }

    function i(t) {
      return t;
    }

    function o(t, e, n) {
      let r = null;
      return t.some((t) => {
        if (t = a.isType('function', t) ? t() : t, e(t)) return r = n(t), !0;
      }), r;
    }

    function s() {
      function t(t) {
        const e = this;
        t = t || {}, this.params = Object.keys(this.paramConfigs).reduce((n, s) => {
          let a = [],
            u = e.boundParams,
            c = e.paramConfigs[s],
            d = c.validate || r,
            f = c.transform || i;
          if (s in u && a.push(u[s]), s in t && a.push(t[s]), a = 'fallback' in c ? a.concat(c.fallback) : a, n[s] = o(a, d, f), c.required && n[s] == null) throw new Error(`${s} is a required parameter`);
          return n;
        }, {}), this.initialize();
      }
      return a.aug(t.prototype, {
        paramConfigs: {},
        boundParams: {},
        initialize() {},
      }), t;
    }
    var a = n(12);
    t.exports = s;
  }, function (t, e, n) {
    function r() {
      function t(t) {
        e.apply(this, arguments), Object.defineProperty(this, 'targetGlobal', {
          value: t,
        });
      }
      var e = s();
      return t.prototype = Object.create(e.prototype), u.aug(t.prototype, {
        id: null,
        initialized: !1,
        width: 0,
        height: 0,
        sandboxEl: null,
        insert() {
          return a.reject();
        },
        onResize() {},
        addClass(t) {
          const e = this.sandboxEl;
          return t = Array.isArray(t) ? t : [t], o.write(() => {
            t.forEach((t) => {
              i.add(e, t);
            });
          });
        },
        removeClass(t) {
          const e = this.sandboxEl;
          return t = Array.isArray(t) ? t : [t], o.write(() => {
            t.forEach((t) => {
              i.remove(e, t);
            });
          });
        },
        styleSelf(t) {
          const e = this;
          return o.write(() => {
            u.forIn(t, (t, n) => {
              e.sandboxEl.style[t] = n;
            });
          });
        },
      }), t;
    }
    var i = n(21),
      o = n(36),
      s = n(61),
      a = n(2),
      u = n(12);
    t.exports = r;
  }, function (t, e, n) {
    function r(t, e, n, r) {
      return e = y.aug({
        id: t,
      }, x, e), n = y.aug({}, A, n), m(e, n, r);
    }

    function i(t) {
      try {
        t.contentWindow.document;
      } catch (t) {
        return w.reject(t);
      }
      return w.resolve(t);
    }

    function o(t, e, n, i, o) {
      let s = new g(),
        u = _.generate(),
        d = r(t, e, n, o);
      return b.set(['sandbox', u], () => {
        let t = d.contentWindow.document,
          e = '<!DOCTYPE html><html><head></head><body></body></html>';
        c.write(() => {
          t.write(e);
        }).then(() => {
          t.close(), s.resolve(d);
        });
      }), d.src = ['javascript:', 'document.write("");', 'try { window.parent.document; }', `catch (e) { document.domain="${a.domain}"; }`, `window.parent.${b.fullPath(['sandbox', u])}();`].join(''), d.addEventListener('error', s.reject, !1), c.write(() => {
        i.parentNode.replaceChild(d, i);
      }), s.promise;
    }

    function s(t) {
      t.overrideProperty('id', {
        get() {
          return this.sandboxEl && this.sandboxEl.id;
        },
      }), t.overrideProperty('initialized', {
        get() {
          return !!this.win;
        },
      }), t.overrideProperty('width', {
        get() {
          return this._width;
        },
      }), t.overrideProperty('height', {
        get() {
          return this._height;
        },
      }), t.overrideProperty('sandboxEl', {
        get() {
          return this.iframeEl;
        },
      }), t.defineProperty('iframeEl', {
        get() {
          return this._iframe;
        },
      }), t.defineProperty('rootEl', {
        get() {
          return this.doc && this.doc.documentElement;
        },
      }), t.defineProperty('widgetEl', {
        get() {
          return this.doc && this.doc.body.firstElementChild;
        },
      }), t.defineProperty('win', {
        get() {
          return this.iframeEl && this.iframeEl.contentWindow;
        },
      }), t.defineProperty('doc', {
        get() {
          return this.win && this.win.document;
        },
      }), t.define('_updateCachedDimensions', function () {
        const t = this;
        return c.read(() => {
          let e,
            n = v(t.sandboxEl);
          t.sandboxEl.style.visibility == 'visible' ? t._width = n.width : (e = v(t.sandboxEl.parentElement).width, t._width = Math.min(n.width, e)), t._height = n.height;
        });
      }), t.define('_setTargetToBlank', function () {
        const t = this.createElement('base');
        t.target = '_blank', this.doc.head.appendChild(t);
      }), t.define('_didResize', function () {
        let t = this,
          e = this._resizeHandlers.slice(0);
        return this._updateCachedDimensions().then(() => {
          e.forEach((e) => {
            e(t);
          });
        });
      }), t.define('setTitle', function (t) {
        this.iframeEl.title = t;
      }), t.override('createElement', function (t) {
        return this.doc.createElement(t);
      }), t.override('createFragment', function () {
        return this.doc.createDocumentFragment();
      }), t.override('htmlToElement', function (t) {
        let e;
        return e = this.createElement('div'), e.innerHTML = t, e.firstElementChild;
      }), t.override('hasSelectedText', function () {
        return !!d.getSelectedText(this.win);
      }), t.override('addRootClass', function (t) {
        const e = this.rootEl;
        return t = Array.isArray(t) ? t : [t], this.initialized ? c.write(() => {
          t.forEach((t) => {
            u.add(e, t);
          });
        }) : w.reject(new Error('sandbox not initialized'));
      }), t.override('removeRootClass', function (t) {
        const e = this.rootEl;
        return t = Array.isArray(t) ? t : [t], this.initialized ? c.write(() => {
          t.forEach((t) => {
            u.remove(e, t);
          });
        }) : w.reject(new Error('sandbox not initialized'));
      }), t.override('hasRootClass', function (t) {
        return u.present(this.rootEl, t);
      }), t.define('addStyleSheet', function (t, e) {
        let n,
          r = new g();
        return this.initialized ? (n = this.createElement('link'), n.type = 'text/css', n.rel = 'stylesheet', n.href = t, n.addEventListener('load', r.resolve, !1), n.addEventListener('error', r.reject, !1), c.write(E(e, null, n)).then(() => l(t).then(r.resolve, r.reject), r.promise)) : w.reject(new Error('sandbox not initialized'));
      }), t.override('prependStyleSheet', function (t) {
        const e = this.doc;
        return this.addStyleSheet(t, (t) => {
          const n = e.head.firstElementChild;
          return n ? e.head.insertBefore(t, n) : e.head.appendChild(t);
        });
      }), t.override('appendStyleSheet', function (t) {
        const e = this.doc;
        return this.addStyleSheet(t, t => e.head.appendChild(t));
      }), t.define('addCss', function (t, e) {
        let n;
        return h.inlineStyle() ? (n = this.createElement('style'), n.type = 'text/css', n.appendChild(this.doc.createTextNode(t)), c.write(E(e, null, n))) : w.resolve();
      }), t.override('prependCss', function (t) {
        const e = this.doc;
        return this.addCss(t, (t) => {
          const n = e.head.firstElementChild;
          return n ? e.head.insertBefore(t, n) : e.head.appendChild(t);
        });
      }), t.override('appendCss', function (t) {
        const e = this.doc;
        return this.addCss(t, t => e.head.appendChild(t));
      }), t.override('makeVisible', function () {
        const t = this;
        return this.styleSelf(C).then(() => {
          t._updateCachedDimensions();
        });
      }), t.override('injectWidgetEl', function (t) {
        const e = this;
        return this.initialized ? this.widgetEl ? w.reject(new Error('widget already injected')) : c.write(() => {
          e.doc.body.appendChild(t);
        }) : w.reject(new Error('sandbox not initialized'));
      }), t.override('matchHeightToContent', function () {
        let t,
          e = this;
        return c.read(() => {
          t = e.widgetEl ? v(e.widgetEl).height : 0;
        }), c.write(() => {
          e.sandboxEl.style.height = `${t}px`;
        }).then(() => e._updateCachedDimensions());
      }), t.override('matchWidthToContent', function () {
        let t,
          e = this;
        return c.read(() => {
          t = e.widgetEl ? v(e.widgetEl).width : 0;
        }), c.write(() => {
          e.sandboxEl.style.width = `${t}px`;
        }).then(() => e._updateCachedDimensions());
      }), t.after('initialize', function () {
        this._iframe = null, this._width = this._height = 0, this._resizeHandlers = [];
      }), t.override('insert', function (t, e, n, s) {
        let a = this,
          u = new g(),
          d = this.targetGlobal.document,
          f = r(t, e, n, d);
        return c.write(E(s, null, f)), f.addEventListener('load', () => {
          i(f).then(null, E(o, null, t, e, n, f, d)).then(u.resolve, u.reject);
        }, !1), f.addEventListener('error', u.reject, !1), u.promise.then((t) => {
          const e = p(a._didResize, S, a);
          return a._iframe = t, a.win.addEventListener('resize', e, !1), w.all([a._setTargetToBlank(), a.addRootClass(T), a.prependCss(I)]);
        });
      }), t.override('onResize', function (t) {
        this._resizeHandlers.push(t);
      }), t.after('styleSelf', function () {
        return this._updateCachedDimensions();
      });
    }
    var a = n(9),
      u = n(21),
      c = n(36),
      d = n(64),
      f = n(54),
      l = n(65),
      h = n(66),
      p = n(67),
      m = n(45),
      v = (n(10), n(68)),
      g = n(1),
      w = n(2),
      y = n(12),
      b = n(18),
      _ = n(29),
      E = n(15),
      x = {
        allowfullscreen: 'true',
      },
      A = {
        position: 'absolute',
        visibility: 'hidden',
        display: 'block',
        width: '0px',
        height: '0px',
        padding: '0',
        border: 'none',
      },
      C = {
        position: 'static',
        visibility: 'visible',
      },
      T = 'SandboxRoot',
      I = '.SandboxRoot { display: none; }',
      S = 50;
    t.exports = f.couple(n(69), s);
  }, function (t, e, n) {
    function r(t) {
      return t = t || o, t.getSelection && t.getSelection();
    }

    function i(t) {
      const e = r(t);
      return e ? e.toString() : '';
    }
    var o = n(7);
    t.exports = {
      getSelection: r,
      getSelectedText: i,
    };
  }, function (t, e, n) {
    function r(t) {
      let e = new s(),
        n = i.createElement('img');
      return n.onload = n.onerror = function () {
        o.setTimeout(e.resolve, 50);
      }, n.src = t, o.setTimeout(e.reject, a), e.promise;
    }
    var i = n(9),
      o = n(7),
      s = n(1),
      a = 2e4;
    t.exports = r;
  }, function (t, e, n) {
    function r() {
      return h + l.generate();
    }

    function i() {
      let t = r(),
        e = a.createElement('div'),
        n = a.createElement('style'),
        i = `.${t} { visibility: hidden; }`;
      return !!a.body && (f.asBoolean(c.val('widgets:csp')) && (o = !1), void 0 !== o ? o : (e.style.display = 'none', s.add(e, t), n.type = 'text/css', n.appendChild(a.createTextNode(i)), a.body.appendChild(n), a.body.appendChild(e), o = u.getComputedStyle(e).visibility === 'hidden', d(e), d(n), o));
    }
    var o,
      s = n(21),
      a = n(9),
      u = n(7),
      c = n(41),
      d = n(38),
      f = n(26),
      l = n(29),
      h = 'csptest';
    t.exports = {
      inlineStyle: i,
    };
  }, function (t, e, n) {
    function r(t, e, n) {
      function r() {
        let a = n || this,
          u = arguments,
          c = +new Date();
        return i.clearTimeout(o), c - s > e ? (s = c, void t.apply(a, u)) : void (o = i.setTimeout(() => {
          r.apply(a, u);
        }, e));
      }
      var o,
        s = 0;
      return n = n || null, r;
    }
    var i = n(7);
    t.exports = r;
  }, function (t, e) {
    function n(t) {
      const e = t.getBoundingClientRect();
      return {
        width: e.width,
        height: e.height,
      };
    }
    t.exports = n;
  }, function (t, e, n) {
    function r(t) {
      t.define('createElement', i), t.define('createFragment', i), t.define('htmlToElement', i), t.define('hasSelectedText', i), t.define('addRootClass', i), t.define('removeRootClass', i), t.define('hasRootClass', i), t.define('prependStyleSheet', i), t.define('appendStyleSheet', i), t.define('prependCss', i), t.define('appendCss', i), t.define('makeVisible', i), t.define('injectWidgetEl', i), t.define('matchHeightToContent', i), t.define('matchWidthToContent', i);
    }
    var i = n(70);
    t.exports = r;
  }, function (t, e) {
    function n() {
      throw new Error('unimplemented method');
    }
    t.exports = n;
  }, function (t, e, n) {
    function r(t, e, n) {
      return i(t, e, n, 2);
    }

    function i(t, e, n, r) {
      let i = !v.isObject(t),
        o = !!e && !v.isObject(e);
      i || o || (w && w(arguments), s(m.formatClientEventNamespace(t), m.formatClientEventData(e, n, r), m.CLIENT_EVENT_ENDPOINT));
    }

    function o(t, e, n, r) {
      const o = m.extractTermsFromDOM(t.target || t.srcElement);
      o.action = r || 'click', i(o, e, n);
    }

    function s(t, e, n) {
      let r,
        i;
      n && v.isObject(t) && v.isObject(e) && (r = m.flattenClientEventPayload(t, e), i = {
        l: m.stringify(r),
      }, m.noticeSeen(t) && (i.notice_seen = !0), r.dnt && (i.dnt = 1), l(p.url(n, i)));
    }

    function a(t, e, n, r) {
      let i,
        o = !v.isObject(t),
        s = !!e && !v.isObject(e);
      if (!o && !s) return i = m.flattenClientEventPayload(m.formatClientEventNamespace(t), m.formatClientEventData(e, n, r)), u(i);
    }

    function u(t) {
      return b.push(t), b;
    }

    function c() {
      let t,
        e;
      return b.length > 1 && a({
        page: 'widgets_js',
        component: 'scribe_pixel',
        action: 'batch_log',
      }, {}), t = b, b = [], e = t.reduce((e, n, r) => {
        let i = e.length,
          o = i && e[i - 1],
          s = r + 1 == t.length;
        return s && n.event_namespace && n.event_namespace.action == 'batch_log' && (n.message = [`entries:${r}`, `requests:${i}`].join('/')), d(n).forEach((t) => {
          const n = f(t);
          (!o || o.urlLength + n > y) && (o = {
            urlLength: E,
            items: [],
          }, e.push(o)), o.urlLength += n, o.items.push(t);
        }), e;
      }, []), e.map((t) => {
        const e = {
          l: t.items,
        };
        return h.enabled() && (e.dnt = 1), l(p.url(m.CLIENT_EVENT_ENDPOINT, e));
      });
    }

    function d(t) {
      return Array.isArray(t) || (t = [t]), t.reduce((t, e) => {
        let n,
          r = m.stringify(e),
          i = f(r);
        return E + i < y ? t = t.concat(r) : (n = m.splitLogEntry(e), n.length > 1 && (t = t.concat(d(n)))), t;
      }, []);
    }

    function f(t) {
      return encodeURIComponent(t).length + 3;
    }

    function l(t) {
      const e = new Image();
      return e.src = t;
    }
    var h = n(46),
      p = n(25),
      m = n(50),
      v = n(12),
      g = n(18),
      w = g.get('scribeCallback'),
      y = 2083,
      b = [],
      _ = p.url(m.CLIENT_EVENT_ENDPOINT, {
        dnt: 0,
        l: '',
      }),
      E = encodeURIComponent(_).length;
    t.exports = {
      _enqueueRawObject: u,
      scribe: s,
      clientEvent: i,
      clientEvent2: r,
      enqueueClientEvent: a,
      flushClientEvents: c,
      interaction: o,
    };
  }, function (t, e, n) {
    function r(t, e) {
      this._inputsQueue = [], this._task = t, this._isPaused = !1, this._flushDelay = e && e.flushDelay || s, this._pauseLength = e && e.pauseLength || a, this._flushTimeout = void 0;
    }
    var i = n(1),
      o = n(15),
      s = 100,
      a = 3e3;
    r.prototype.add = function (t) {
      const e = new i();
      return this._inputsQueue.push({
        input: t,
        taskDoneDeferred: e,
      }), this._scheduleFlush(), e.promise;
    }, r.prototype._scheduleFlush = function () {
      this._isPaused || (clearTimeout(this._flushTimeout), this._flushTimeout = setTimeout(o(this._flush, this), this._flushDelay));
    }, r.prototype._flush = function () {
      try {
        this._task.call(null, this._inputsQueue);
      } catch (t) {
        this._inputsQueue.forEach((e) => {
          e.taskDoneDeferred.reject(t);
        });
      }
      this._inputsQueue = [], this._flushTimeout = void 0;
    }, r.prototype.pause = function (t) {
      clearTimeout(this._flushTimeout), this._isPaused = !0, !t && this._pauseLength && setTimeout(o(this.resume, this), this._pauseLength);
    }, r.prototype.resume = function () {
      this._isPaused = !1, this._scheduleFlush();
    }, t.exports = r;
  }, function (t, e, n) {
    function r() {
      d.load();
    }

    function i() {
      return c().then(t => Object.keys(t));
    }

    function o(t) {
      return c().then((e) => {
        if (!e[t]) throw new Error('Experiment not found');
        return e[t];
      });
    }

    function s(t) {
      return d.settingsLoaded().then(e => e[t]);
    }

    function a() {
      return s('isBucketed');
    }

    function u() {
      return s('shouldObtainCookieConsent');
    }

    function c() {
      return s('experiments');
    }
    var d = n(74);
    t.exports = {
      isBucketed: a,
      shouldObtainCookieConsent: u,
      getExperiments: c,
      getExperiment: o,
      getExperimentKeys: i,
      load: r,
    };
  }, function (t, e, n) {
    function r() {
      let t,
        e,
        n,
        r;
      return s = new u(), p.ie9() || p.ie10() || f.protocol !== 'http:' && f.protocol !== 'https:' ? void s.resolve(i()) : (t = {
        origin: f.origin,
      }, e = l.url(m.resourceBaseUrl + m.widgetIframeHtmlPath, t), n = function (t) {
          let n;
          if (e.substr(0, t.origin.length) === t.origin) {
            try {
              n = d.parse(t.data), n.namespace === v.settings && s.resolve(i(n.settings));
            } catch (t) {}
          }
        }, h.addEventListener('message', n), r = a({
          src: e,
        }, {
          display: 'none',
        }), void c.body.appendChild(r));
    }

    function i(t) {
      let e = {
          is_bucketed: !1,
          should_obtain_cookie_consent: !0,
          experiments: {},
        },
        n = t || e;
      return new g(n.is_bucketed, n.should_obtain_cookie_consent, n.experiments);
    }

    function o() {
      const t = new u();
      return s.promise.then((e) => {
        t.resolve(e);
      }).catch((e) => {
        t.reject(e);
      }), t.promise;
    }
    var s,
      a = n(45),
      u = n(1),
      c = n(9),
      d = n(51),
      f = n(11),
      l = n(25),
      h = n(7),
      p = n(8),
      m = n(75),
      v = n(76),
      g = (n(10), n(77));
    t.exports = {
      load: r,
      settingsLoaded: o,
    };
  }, function (t, e) {
    t.exports = {
      tweetButtonHtmlPath: '/widgets/tweet_button.36c0c29c73929bf937f4c70adb1a29e4.{{lang}}.html',
      followButtonHtmlPath: '/widgets/follow_button.36c0c29c73929bf937f4c70adb1a29e4.{{lang}}.html',
      hubHtmlPath: '/widgets/hub.html',
      widgetIframeHtmlPath: '/widgets/widget_iframe.36c0c29c73929bf937f4c70adb1a29e4.html',
      resourceBaseUrl: 'https://platform.twitter.com',
    };
  }, function (t, e) {
    t.exports = {
      settings: 'twttr.settings',
    };
  }, function (t, e) {
    function n(t, e, n) {
      this.isBucketed = t, this.shouldObtainCookieConsent = e, this.experiments = n || {};
    }
    t.exports = n;
  }, function (t, e, n) {
    t.exports = [n(79), n(112), n(127), n(161), n(172), n(178), n(223), n(242), n(247)];
  }, function (t, e, n) {
    function r(t) {
      let e = t.getAttribute('data-show-screen-name'),
        n = u(t),
        r = t.getAttribute('href'),
        i = t.getAttribute('data-screen-name'),
        c = e ? s.asBoolean(e) : null,
        d = t.getAttribute('data-size'),
        f = o.decodeURL(r),
        l = f.recipient_id,
        h = t.getAttribute('data-text') || f.text,
        p = t.getAttribute('data-welcome-message-id') || f.welcomeMessageId;
      return a.aug(n, {
        screenName: i,
        showScreenName: c,
        size: d,
        text: h,
        userId: l,
        welcomeMessageId: p,
      });
    }

    function i(t) {
      const e = c(t, f);
      return e.map(t => d(r(t), t.parentNode, t));
    }
    var o = n(25),
      s = n(26),
      a = n(12),
      u = n(80),
      c = n(82)(),
      d = n(85),
      f = 'a.twitter-dm-button';
    t.exports = i;
  }, function (t, e, n) {
    function r(t) {
      let e = t.href && t.href.split('?')[1],
        n = e ? s.decode(e) : {},
        r = {
          lang: u(t),
          width: t.getAttribute('data-width') || t.getAttribute('width'),
          height: t.getAttribute('data-height') || t.getAttribute('height'),
          related: t.getAttribute('data-related'),
          partner: t.getAttribute('data-partner'),
        };
      return o.asBoolean(t.getAttribute('data-dnt')) && i.setOn(), a.forIn(r, (t, e) => {
        const r = n[t];
        n[t] = o.hasValue(r) ? r : e;
      }), a.compact(n);
    }
    var i = n(46),
      o = n(26),
      s = n(25),
      a = n(12),
      u = n(81);
    t.exports = r;
  }, function (t, e, n) {
    function r(t) {
      let e;
      if (t) return e = t.lang || t.getAttribute('data-lang'), i.isType('string', e) ? e : r(t.parentElement);
    }
    var i = n(12);
    t.exports = r;
  }, function (t, e, n) {
    let r = n(83),
      i = n(29);
    t.exports = function () {
      const t = `data-twitter-extracted-${i.generate()}`;
      return function (e, n) {
        function i(e) {
          return !e.hasAttribute(t);
        }

        function o(e) {
          return e.setAttribute(t, 'true'), e;
        }
        return r(e, n).filter(i).map(o);
      };
    };
  }, function (t, e, n) {
    function r(t, e) {
      return o(t, e) ? [t] : i.toRealArray(t.querySelectorAll(e));
    }
    var i = n(12),
      o = n(84);
    t.exports = r;
  }, function (t, e, n) {
    function r(t, e) {
      if (s) return s.call(t, e);
    }
    var i = n(7),
      o = i.HTMLElement,
      s = o.prototype.matches || o.prototype.matchesSelector || o.prototype.webkitMatchesSelector || o.prototype.mozMatchesSelector || o.prototype.msMatchesSelector || o.prototype.oMatchesSelector;
    t.exports = r;
  }, function (t, e, n) {
    function r(t, e, n) {
      return new i(o, s, 'twitter-dm-button', t, e, n);
    }
    var i = n(86),
      o = n(87),
      s = n(108);
    t.exports = r;
  }, function (t, e) {
    function n(t, e, n, r, i, o) {
      this.factory = t, this.Sandbox = e, this.srcEl = o, this.targetEl = i, this.parameters = r, this.className = n;
    }
    n.prototype.destroy = function () {
      this.srcEl = this.targetEl = null;
    }, t.exports = n;
  }, function (t, e, n) {
    function r(t, e) {
      const r = new i();
      return n.e(1, (i, o) => {
        let s;
        if (i) return r.reject(i);
        try {
          s = n(88), r.resolve(new s(t, e));
        } catch (t) {
          r.reject(t);
        }
      }), r.promise;
    }
    var i = n(1);
    t.exports = r;
  }, , function (t, e, n) {
      let r = n(55),
        i = n(90),
        o = n(15);
      r = Object.create(r), r.build = o(r.build, null, i), t.exports = r;
    }, function (t, e, n) {
      function r() {
        i.apply(this, arguments), this.Widget = this.Component;
      }
      var i = n(59),
        o = n(12),
        s = n(91);
      r.prototype = Object.create(i.prototype), o.aug(r.prototype, {
        factory: s,
        build() {
          const t = i.prototype.build.apply(this, arguments);
          return t;
        },
        selectors(t) {
          const e = this.Widget.prototype.selectors;
          t = t || {}, this.Widget.prototype.selectors = o.aug({}, t, e);
        },
      }), t.exports = r;
    }, function (t, e, n) {
      function r() {
        function t(t, n) {
          e.apply(this, arguments), this.id = d + c(), this.sandbox = n;
        }
        var e = s();
        return t.prototype = Object.create(e.prototype), a.aug(t.prototype, {
          selectors: {},
          hydrate() {
            return i.resolve();
          },
          prepForInsertion() {},
          render() {
            return i.resolve();
          },
          show() {
            return i.resolve();
          },
          resize() {
            return i.resolve();
          },
          select(t, e) {
            return arguments.length === 1 && (e = t, t = this.el), t ? (e = this.selectors[e] || e, a.toRealArray(t.querySelectorAll(e))) : [];
          },
          selectOne() {
            return this.select.apply(this, arguments)[0];
          },
          selectLast() {
            return this.select.apply(this, arguments).pop();
          },
          on(t, e, n) {
            function r(t) {
              a.addEventListener(t, n, !1);
            }

            function i(t) {
              o.delegate(a, t, s, n);
            }
            var s,
              a = this.el;
            this.el && (t = (t || '').split(/\s+/), arguments.length === 2 ? n = e : s = e, s = this.selectors[s] || s, n = u(n, this), t.forEach(s ? i : r));
          },
        }), t;
      }
      var i = n(2),
        o = n(20),
        s = n(61),
        a = n(12),
        u = n(15),
        c = n(92),
        d = 'twitter-widget-';
      t.exports = r;
    }, function (t, e) {
      function n() {
        return String(r++);
      }
      var r = 0;
      t.exports = n;
    }, , function (t, e, n) {
      function r(t) {
        return t === 'dark' ? 'dark' : 'light';
      }

      function i(t, e, n) {
        let i,
          o;
        return n = r(n), i = a.isRtlLang(e) ? 'rtl' : 'ltr', o = [t, u.css, n, i, 'css'].join('.'), `${d.resourceBaseUrl}/css/${o}`;
      }

      function o() {
        return `${d.resourceBaseUrl}/css/${['periscope_on_air', u.css, 'css'].join('.')}`;
      }

      function s() {
        return `${d.resourceBaseUrl}/css/${['dm_button', u.css, 'css'].join('.')}`;
      }
      var a = n(95),
        u = n(98),
        c = n(15),
        d = n(75);
      t.exports = {
        dmButton: s,
        tweet: c(i, null, 'tweet'),
        timeline: c(i, null, 'timeline'),
        video: c(i, null, 'video'),
        moment: c(i, null, 'moment'),
        grid: c(i, null, 'grid'),
        periscopeOnAir: o,
      };
    }, function (t, e, n) {
      function r(t) {
        return t = String(t).toLowerCase(), o.contains(a, t);
      }

      function i(t) {
        return t = (t || '').toLowerCase(), t = t.replace('_', '-'), s(t) ? t : (t = t.replace(/-.*/, ''), s(t) ? t : 'en');
      }
      var o = n(12),
        s = n(96),
        a = ['ar', 'fa', 'he', 'ur'];
      t.exports = {
        isRtlLang: r,
        matchLanguage: i,
      };
    }, function (t, e, n) {
      function r(t) {
        return t === 'en' || i.contains(o, t);
      }
      var i = n(12),
        o = n(97);
      t.exports = r;
    }, function (t, e) {
      t.exports = ['hi', 'zh-cn', 'fr', 'zh-tw', 'msa', 'fil', 'fi', 'sv', 'pl', 'ja', 'ko', 'de', 'it', 'pt', 'es', 'ru', 'id', 'tr', 'da', 'no', 'nl', 'hu', 'fa', 'ar', 'ur', 'he', 'th', 'cs', 'uk', 'vi', 'ro', 'bn', 'el', 'en-gb', 'gu', 'kn', 'mr', 'ta', 'bg', 'ca', 'hr', 'sr', 'sk'];
    }, function (t, e) {
      t.exports = {
        css: 'b7949fc5ae6443c45d48eb17624f02ee',
      };
    }, , function (t, e, n) {
      function r(t) {
        t.define('injectRefUrlParams', (t) => {
          t.getAttribute(s) || (t.setAttribute(s, !0), t.href = i(t.href));
        }), t.after('render', function () {
          this.on('click', 'A', function (t, e) {
            o.isTwitterURL(e.href) && this.injectRefUrlParams(e);
          });
        });
      }
      var i = n(101),
        o = n(24),
        s = 'data-url-ref-attrs-injected';
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        return i.url(t, {
          ref_src: s,
          ref_url: o.rootDocumentLocation(),
        });
      }
      var i = n(25),
        o = n(47),
        s = 'twsrc^tfw';
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        t.params({
          partner: {
            fallback: u(c.val, c, 'partner'),
          },
        }), t.define('scribeItems', () => ({})), t.define('scribeNamespace', () => ({
          client: 'tfw',
        })), t.define('scribeData', function () {
          return {
            widget_origin: s.rootDocumentLocation(),
            widget_frame: s.isFramed() && s.currentDocumentLocation(),
            widget_partner: this.params.partner,
            widget_site_screen_name: f(c.val('site')),
            widget_site_user_id: d.asNumber(c.val('site:id')),
            widget_creator_screen_name: f(c.val('creator')),
            widget_creator_user_id: d.asNumber(c.val('creator:id')),
          };
        }), t.define('scribe', function (t, e, n) {
          t = a.aug(this.scribeNamespace(), t || {}), e = a.aug(this.scribeData(), e || {}), i.scribe(t, e, !1, n);
        }), t.define('scribeInteraction', function (t, e, n) {
          const r = o.extractTermsFromDOM(t.target);
          r.action = t.type, this.scribe(r, e, n);
        });
      }
      var i = n(42),
        o = n(50),
        s = n(47),
        a = n(12),
        u = n(15),
        c = n(41),
        d = n(26),
        f = n(103);
      t.exports = r;
    }, function (t, e) {
      function n(t) {
        return t && t[0] === '@' ? t.substr(1) : t;
      }
      t.exports = n;
    }, , function (t, e, n) {
      function r(t) {
        let e;
        if (t) {
          return e = a([t]), {
            item_ids: Object.keys(e),
            item_details: e,
          };
        }
      }

      function i(t) {
        t.selectors({
          tweetIdInfo: '.js-tweetIdInfo',
        }), t.define('scribeClickInteraction', function (t, e) {
          const n = o.closest(this.selectors.tweetIdInfo, e, this.el);
          this.scribeInteraction(t, r(n));
        }), t.after('render', function () {
          this.on('click', 'A', this.scribeClickInteraction), this.on('click', 'BUTTON', this.scribeClickInteraction);
        });
      }
      var o = n(22),
        s = n(89),
        a = n(106);
      t.exports = s.couple(n(102), i);
    }, function (t, e, n) {
      function r(t) {
        return t ? (t = Array.isArray(t) ? t : [t], t.reduce((t, e) => {
          let n = e.getAttribute('data-tweet-id'),
            r = e.getAttribute('data-rendered-tweet-id') || n;
          return n === r ? t[r] = {
            item_type: i.TWEET,
          } : n && (t[r] = {
            item_type: i.RETWEET,
            target_type: i.TWEET,
            target_id: n,
          }), t;
        }, {})) : {};
      }
      var i = n(107);
      t.exports = r;
    }, function (t, e) {
      t.exports = {
        TWEET: 0,
        RETWEET: 10,
        CUSTOM_TIMELINE: 17,
        LIVE_VIDEO_EVENT: 28,
      };
    }, function (t, e, n) {
      let r = n(109),
        i = n(53);
      t.exports = r.isSupported() ? r : i;
    }, function (t, e, n) {
      let r = n(54),
        i = n(110);
      t.exports = r.build([i]);
    }, function (t, e, n) {
      function r(t) {
        t.defineStatic('isSupported', () => !!o.HTMLElement.prototype.createShadowRoot && l.inlineStyle() && !h.android()), t.overrideProperty('id', {
          get() {
            return this.sandboxEl && this.sandboxEl.id;
          },
        }), t.overrideProperty('initialized', {
          get() {
            return !!this._shadowHost;
          },
        }), t.overrideProperty('width', {
          get() {
            return this._width;
          },
        }), t.overrideProperty('height', {
          get() {
            return this._height;
          },
        }), t.overrideProperty('sandboxEl', {
          get() {
            return this._shadowHost;
          },
        }), t.define('_updateCachedDimensions', function () {
          const t = this;
          return u.read(() => {
            let e,
              n = p(t.sandboxEl);
            t.sandboxEl.style.visibility == 'visible' ? t._width = n.width : (e = p(t.sandboxEl.parentElement).width, t._width = Math.min(n.width, e)), t._height = n.height;
          });
        }), t.define('_didResize', function () {
          let t = this,
            e = this._resizeHandlers.slice(0);
          return this._updateCachedDimensions().then(() => {
            e.forEach((e) => {
              e(t);
            });
          });
        }), t.override('createElement', function (t) {
          return this.targetGlobal.document.createElement(t);
        }), t.override('createFragment', function () {
          return this.targetGlobal.document.createDocumentFragment();
        }), t.override('htmlToElement', function (t) {
          let e;
          return e = this.createElement('div'), e.innerHTML = t, e.firstElementChild;
        }), t.override('hasSelectedText', function () {
          return !!c.getSelectedText(this.targetGlobal);
        }), t.override('addRootClass', function (t) {
          const e = this._shadowRootBody;
          return t = Array.isArray(t) ? t : [t], this.initialized ? u.write(() => {
            t.forEach((t) => {
              s.add(e, t);
            });
          }) : g.reject(new Error('sandbox not initialized'));
        }), t.override('removeRootClass', function (t) {
          const e = this._shadowRootBody;
          return t = Array.isArray(t) ? t : [t], this.initialized ? u.write(() => {
            t.forEach((t) => {
              s.remove(e, t);
            });
          }) : g.reject(new Error('sandbox not initialized'));
        }), t.override('hasRootClass', function (t) {
          return s.present(this._shadowRootBody, t);
        }), t.override('addStyleSheet', function (t, e) {
          return this.addCss(`@import url("${t}");`, e).then(() => f(t));
        }), t.override('prependStyleSheet', function (t) {
          const e = this._shadowRoot;
          return this.addStyleSheet(t, (t) => {
            const n = e.firstElementChild;
            return n ? e.insertBefore(t, n) : e.appendChild(t);
          });
        }), t.override('appendStyleSheet', function (t) {
          const e = this._shadowRoot;
          return this.addStyleSheet(t, t => e.appendChild(t));
        }), t.override('addCss', function (t, e) {
          let n;
          return this.initialized ? l.inlineStyle() ? (n = this.createElement('style'), n.type = 'text/css', n.appendChild(this.targetGlobal.document.createTextNode(t)), u.write(m(e, null, n))) : g.resolve() : g.reject(new Error('sandbox not initialized'));
        }), t.override('prependCss', function (t) {
          const e = this._shadowRoot;
          return this.addCss(t, (t) => {
            const n = e.firstElementChild;
            return n ? e.insertBefore(t, n) : e.appendChild(t);
          });
        }), t.override('appendCss', function (t) {
          const e = this._shadowRoot;
          return this.addCss(t, t => e.appendChild(t));
        }), t.override('makeVisible', function () {
          return this.styleSelf(_);
        }), t.override('injectWidgetEl', function (t) {
          function e() {
            const t = v(n._didResize, y, n);
            new i(n._shadowRootBody, t);
          }
          var n = this;
          return this.initialized ? this._shadowRootBody.firstElementChild ? g.reject(new Error('widget already injected')) : u.write(() => {
            n._shadowRootBody.appendChild(t);
          }).then(() => n._updateCachedDimensions()).then(e) : g.reject(new Error('sandbox not initialized'));
        }), t.override('matchHeightToContent', () => g.resolve()), t.override('matchWidthToContent', () => g.resolve()), t.override('insert', function (t, e, n, r) {
          let i = this.targetGlobal.document,
            o = this._shadowHost = i.createElement(E),
            s = this._shadowRoot = o.createShadowRoot(),
            c = this._shadowRootBody = i.createElement('div');
          return w.forIn(e || {}, (t, e) => {
            o.setAttribute(t, e);
          }), o.id = t, s.appendChild(c), a.delegate(c, 'click', 'A', (t, e) => {
            e.hasAttribute('target') || e.setAttribute('target', '_blank');
          }), g.all([this.styleSelf(b), this.addRootClass(x), this.prependCss(A), u.write(r.bind(null, o))]);
        }), t.override('onResize', function (t) {
          this._resizeHandlers.push(t);
        }), t.after('initialize', function () {
          this._shadowHost = this._shadowRoot = this._shadowRootBody = null, this._width = this._height = 0, this._resizeHandlers = [];
        }), t.after('styleSelf', function () {
          return this._updateCachedDimensions();
        });
      }
      var i = n(111),
        o = n(7),
        s = n(21),
        a = n(20),
        u = n(36),
        c = n(64),
        d = n(54),
        f = n(65),
        l = n(66),
        h = n(8),
        p = n(68),
        m = n(15),
        v = n(67),
        g = n(2),
        w = n(12),
        y = 50,
        b = {
          position: 'absolute',
          visibility: 'hidden',
          display: 'block',
          transform: 'rotate(0deg)',
        },
        _ = {
          position: 'static',
          visibility: 'visible',
        },
        E = 'twitterwidget',
        x = 'SandboxRoot',
        A = '.SandboxRoot { display: none; }';
      t.exports = d.couple(n(69), r);
    }, function (t, e) {
      !(function () {
        var e = function (t, n) {
          function r() {
            this.q = [], this.add = function (t) {
              this.q.push(t);
            };
            let t,
              e;
            this.call = function () {
              for (t = 0, e = this.q.length; t < e; t++) this.q[t].call();
            };
          }

          function i(t, e) {
            return t.currentStyle ? t.currentStyle[e] : window.getComputedStyle ? window.getComputedStyle(t, null).getPropertyValue(e) : t.style[e];
          }

          function o(t, e) {
            if (t.resizedAttached) {
              if (t.resizedAttached) return void t.resizedAttached.add(e);
            } else t.resizedAttached = new r(), t.resizedAttached.add(e);
            t.resizeSensor = document.createElement('div'), t.resizeSensor.className = 'resize-sensor';
            let n = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;',
              o = 'position: absolute; left: 0; top: 0; transition: 0s;';
            t.resizeSensor.style.cssText = n, t.resizeSensor.innerHTML = `<div class="resize-sensor-expand" style="${n}"><div style="${o}"></div></div><div class="resize-sensor-shrink" style="${n}"><div style="${o} width: 200%; height: 200%"></div></div>`, t.appendChild(t.resizeSensor), {
              fixed: 1,
              absolute: 1,
            }[i(t, 'position')] || (t.style.position = 'relative');
            let s,
              a,
              u = t.resizeSensor.childNodes[0],
              c = u.childNodes[0],
              d = t.resizeSensor.childNodes[1],
              f = (d.childNodes[0], function () {
                c.style.width = `${u.offsetWidth + 10}px`, c.style.height = `${u.offsetHeight + 10}px`, u.scrollLeft = u.scrollWidth, u.scrollTop = u.scrollHeight, d.scrollLeft = d.scrollWidth, d.scrollTop = d.scrollHeight, s = t.offsetWidth, a = t.offsetHeight;
              });
            f();
            let l = function () {
                t.resizedAttached && t.resizedAttached.call();
              },
              h = function (t, e, n) {
                t.attachEvent ? t.attachEvent(`on${e}`, n) : t.addEventListener(e, n);
              },
              p = function () {
                t.offsetWidth == s && t.offsetHeight == a || l(), f();
              };
            h(u, 'scroll', p), h(d, 'scroll', p);
          }
          let s = Object.prototype.toString.call(t),
            a = s === '[object Array]' || s === '[object NodeList]' || s === '[object HTMLCollection]' || typeof jQuery !== 'undefined' && t instanceof jQuery || typeof Elements !== 'undefined' && t instanceof Elements;
          if (a) { for (let u = 0, c = t.length; u < c; u++) o(t[u], n); } else o(t, n);
          this.detach = function () {
            if (a) { for (let n = 0, r = t.length; n < r; n++) e.detach(t[n]); } else e.detach(t);
          };
        };
        e.detach = function (t) {
          t.resizeSensor && (t.removeChild(t.resizeSensor), delete t.resizeSensor, delete t.resizedAttached);
        }, typeof t !== 'undefined' && typeof t.exports !== 'undefined' ? t.exports = e : window.ResizeSensor = e;
      }());
    }, function (t, e, n) {
      function r(t) {
        let e = a(t),
          n = {
            screenName: o.screenName(t.href),
            showScreenName: t.getAttribute('data-show-screen-name') !== 'false',
            showCount: t.getAttribute('data-show-count') !== 'false',
            size: t.getAttribute('data-size'),
            count: t.getAttribute('data-count'),
            preview: t.getAttribute('data-preview'),
          };
        return s.forIn(n, (t, n) => {
          const r = e[t];
          e[t] = d.hasValue(r) ? r : n;
        }), e.screenName = e.screenName || e.screen_name, e;
      }

      function i(t) {
        const e = u(t, f);
        return e.map(t => c(r(t), t.parentNode, t));
      }
      var o = n(24),
        s = n(12),
        a = n(80),
        u = n(82)(),
        c = n(113),
        d = n(26),
        f = 'a.twitter-follow-button';
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'twitter-follow-button', t, e, n);
      }
      var i = n(86),
        o = n(114),
        s = n(119);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(2, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(115), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , , function (t, e, n) {
      function r(t) {
        t.define('widgetDataAttributes', () => ({})), t.define('setDataAttributes', function () {
          const t = this.sandbox.sandboxEl;
          o.forIn(this.widgetDataAttributes(), (e, n) => {
            i.hasValue(n) && t.setAttribute(`data-${e}`, n);
          });
        }), t.after('render', function () {
          this.setDataAttributes();
        });
      }
      var i = n(26),
        o = n(12);
      t.exports = r;
    }, function (t, e, n) {
      let r = n(54),
        i = n(120);
      t.exports = r.build([i]);
    }, function (t, e, n) {
      function r(t) {
        t.overrideProperty('id', {
          get() {
            return this.sandboxEl && this.sandboxEl.id;
          },
        }), t.overrideProperty('initialized', {
          get() {
            return !!this.iframeEl;
          },
        }), t.overrideProperty('width', {
          get() {
            return this._width;
          },
        }), t.overrideProperty('height', {
          get() {
            return this._height;
          },
        }), t.overrideProperty('sandboxEl', {
          get() {
            return this.iframeEl;
          },
        }), t.defineProperty('iframeEl', {
          get() {
            return this._iframe;
          },
        }), t.define('updateCachedDimensions', function () {
          const t = this;
          return this.initialized ? i.read(() => {
            t._width = t.sandboxEl.offsetWidth, t._height = t.sandboxEl.offsetHeight;
          }) : c.resolve();
        }), t.define('setTitle', function (t) {
          this.iframeEl.title = t;
        }), t.define('makeVisible', function () {
          return this.styleSelf(h);
        }), t.define('didResize', function () {
          let t = this,
            e = t._resizeHandlers.length > 0;
          return this.updateCachedDimensions().then(() => {
            e && t._resizeHandlers.forEach((e) => {
              e(t);
            });
          });
        }), t.define('loadDocument', function (t) {
          const e = new u();
          return this.initialized ? this.iframeEl.src ? c.reject(new Error('widget already loaded')) : (this.iframeEl.addEventListener('load', e.resolve, !1), this.iframeEl.addEventListener('error', e.reject, !1), this.iframeEl.src = t, e.promise) : c.reject(new Error('sandbox not initialized'));
        }), t.after('initialize', function () {
          this._iframe = null, this._width = this._height = 0, this._resizeHandlers = [];
        }), t.override('insert', function (t, e, n, r) {
          const o = this;
          return e = f.aug({
            id: t,
          }, e), n = f.aug({}, l, n), this._iframe = a(e, n), p[t] = this, this.onResize(s(() => {
            o.makeVisible();
          })), i.write(d(r, null, this._iframe));
        }), t.override('onResize', function (t) {
          this._resizeHandlers.push(t);
        }), t.after('styleSelf', function () {
          return this.updateCachedDimensions();
        });
      }
      var i = n(36),
        o = n(121),
        s = n(126),
        a = n(45),
        u = n(1),
        c = n(2),
        d = n(15),
        f = n(12),
        l = {
          position: 'absolute',
          visibility: 'hidden',
          width: '0px',
          height: '0px',
        },
        h = {
          position: 'static',
          visibility: 'visible',
        },
        p = {};
      o((t, e, n) => {
        const r = p[t];
        if (r) {
          return e = e || 1, n = n || 1, r.styleSelf({
            width: `${e}px`,
            height: `${n}px`,
          }).then(() => {
            r.didResize();
          });
        }
      }), t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        (new o()).attachReceiver(new s.Receiver(i, 'twttr.button')).bind('twttr.private.trigger', function (t, e) {
          const n = c(this);
          a.trigger(t, {
            target: n,
            region: e,
            type: t,
            data: {},
          });
        }).bind('twttr.private.resizeButton', function (e) {
          let n = c(this),
            r = n && n.id,
            i = u.asInt(e.width),
            o = u.asInt(e.height);
          r && void 0 !== i && void 0 !== o && t(r, i, o);
        });
      }
      var i = n(7),
        o = n(122),
        s = n(124),
        a = n(30),
        u = n(26),
        c = n(125);
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        this.registry = t || {};
      }

      function i(t) {
        return h.isType('string', t) ? f.parse(t) : t;
      }

      function o(t) {
        let e,
          n,
          r;
        return !!h.isObject(t) && (e = t.jsonrpc === v, n = h.isType('string', t.method), r = !('id' in t) || s(t.id), e && n && r);
      }

      function s(t) {
        let e,
          n,
          r;
        return e = h.isType('string', t), n = h.isType('number', t), r = t === null, e || n || r;
      }

      function a(t) {
        return h.isObject(t) && !h.isType('function', t);
      }

      function u(t, e) {
        return {
          jsonrpc: v,
          id: t,
          result: e,
        };
      }

      function c(t, e) {
        return {
          jsonrpc: v,
          id: s(t) ? t : null,
          error: e,
        };
      }

      function d(t) {
        return p.all(t).then(t => t = t.filter(t => void 0 !== t), t.length ? t : void 0);
      }
      var f = n(51),
        l = n(123),
        h = n(12),
        p = n(2),
        m = n(33),
        v = '2.0';
      r.prototype._invoke = function (t, e) {
        let n,
          r,
          i;
        n = this.registry[t.method], r = t.params || [], r = h.isType('array', r) ? r : [r];
        try {
          i = n.apply(e.source || null, r);
        } catch (t) {
          i = p.reject(t.message);
        }
        return m.isPromise(i) ? i : p.resolve(i);
      }, r.prototype._processRequest = function (t, e) {
        function n(e) {
          return u(t.id, e);
        }

        function r() {
          return c(t.id, l.INTERNAL_ERROR);
        }
        let i;
        return o(t) ? (i = 'params' in t && !a(t.params) ? p.resolve(c(t.id, l.INVALID_PARAMS)) : this.registry[t.method] ? this._invoke(t, {
          source: e,
        }).then(n, r) : p.resolve(c(t.id, l.METHOD_NOT_FOUND)), t.id != null ? i : p.resolve()) : p.resolve(c(t.id, l.INVALID_REQUEST));
      }, r.prototype.attachReceiver = function (t) {
        return t.attachTo(this), this;
      }, r.prototype.bind = function (t, e) {
        return this.registry[t] = e, this;
      }, r.prototype.receive = function (t, e) {
        let n,
          r,
          o,
          s = this;
        try {
          t = i(t);
        } catch (t) {
          return p.resolve(c(null, l.PARSE_ERROR));
        }
        return e = e || null, n = h.isType('array', t), r = n ? t : [t], o = r.map(t => s._processRequest(t, e)), n ? d(o) : o[0];
      }, t.exports = r;
    }, function (t, e) {
      t.exports = {
        PARSE_ERROR: {
          code: -32700,
          message: 'Parse error',
        },
        INVALID_REQUEST: {
          code: -32600,
          message: 'Invalid Request',
        },
        INVALID_PARAMS: {
          code: -32602,
          message: 'Invalid params',
        },
        METHOD_NOT_FOUND: {
          code: -32601,
          message: 'Method not found',
        },
        INTERNAL_ERROR: {
          code: -32603,
          message: 'Internal error',
        },
      };
    }, function (t, e, n) {
      function r(t, e, n) {
        let r;
        t && t.postMessage && (g ? r = (n || '') + f.stringify(e) : n ? (r = {}, r[n] = e) : r = e, t.postMessage(r, '*'));
      }

      function i(t) {
        return p.isType('string', t) ? t : 'JSONRPC';
      }

      function o(t, e) {
        return e ? p.isType('string', t) && t.indexOf(e) === 0 ? t.substring(e.length) : t[e] ? t[e] : void 0 : t;
      }

      function s(t, e) {
        const n = t.document;
        this.filter = i(e), this.server = null, this.isTwitterFrame = m.isTwitterURL(n.location.href), t.addEventListener('message', v(this._onMessage, this), !1);
      }

      function a(t, e) {
        this.pending = {}, this.target = t, this.isTwitterHost = m.isTwitterURL(c.href), this.filter = i(e), d.addEventListener('message', v(this._onMessage, this), !1);
      }

      function u(t) {
        return arguments.length > 0 && (g = !!t), g;
      }
      var c = n(11),
        d = n(7),
        f = n(51),
        l = n(1),
        h = n(8),
        p = n(12),
        m = n(24),
        v = n(15),
        g = h.ie9();
      p.aug(s.prototype, {
        _onMessage(t) {
          let e,
            n = this;
          this.server && (this.isTwitterFrame && !m.isTwitterURL(t.origin) || (e = o(t.data, this.filter), e && this.server.receive(e, t.source).then((e) => {
            e && r(t.source, e, n.filter);
          })));
        },
        attachTo(t) {
          this.server = t;
        },
        detach() {
          this.server = null;
        },
      }), p.aug(a.prototype, {
        _processResponse(t) {
          const e = this.pending[t.id];
          e && (e.resolve(t), delete this.pending[t.id]);
        },
        _onMessage(t) {
          let e;
          if ((!this.isTwitterHost || m.isTwitterURL(t.origin)) && (e = o(t.data, this.filter))) {
            if (p.isType('string', e)) {
              try {
                e = f.parse(e);
              } catch (t) {
                return;
              }
            }
            e = p.isType('array', e) ? e : [e], e.forEach(v(this._processResponse, this));
          }
        },
        send(t) {
          const e = new l();
          return t.id ? this.pending[t.id] = e : e.resolve(), r(this.target, t, this.filter), e.promise;
        },
      }), t.exports = {
        Receiver: s,
        Dispatcher: a,
        _stringifyPayload: u,
      };
    }, function (t, e, n) {
      function r(t) {
        for (var e, n = i.getElementsByTagName('iframe'), r = 0; n[r]; r++) { if (e = n[r], e.contentWindow === t) return e; }
      }
      var i = n(9);
      t.exports = r;
    }, function (t, e) {
      function n(t) {
        let e,
          n = !1;
        return function () {
          return n ? e : (n = !0, e = t.apply(this, arguments));
        };
      }
      t.exports = n;
    }, function (t, e, n) {
      function r(t) {
        let e = u(t),
          n = {
            collectionId: a.collectionId(t.href),
            chrome: t.getAttribute('data-chrome'),
            limit: t.getAttribute('data-limit'),
          };
        return s.forIn(n, (t, n) => {
          const r = e[t];
          e[t] = o.hasValue(r) ? r : n;
        }), e;
      }

      function i(t) {
        const e = c(t, f);
        return e.map(t => d(r(t), t.parentNode, t));
      }
      var o = n(26),
        s = n(12),
        a = n(24),
        u = n(80),
        c = n(82)(),
        d = n(128),
        f = 'a.twitter-grid';
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'twitter-grid', t, e, n);
      }
      var i = n(86),
        o = n(129),
        s = n(53);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(3, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(130), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , , function (t, e, n) {
      function r(t) {
        if (t) return t.replace(/[^\w$]/g, '_');
      }

      function i() {
        return f + l++;
      }

      function o(t, e, n, o) {
        let f,
          l,
          h;
        return o = r(o || i()), f = a.fullPath(['callbacks', o]), l = s.createElement('script'), h = new u(), e = c.aug({}, e, {
          callback: f,
          suppress_response_codes: !0,
        }), a.set(['callbacks', o], (t) => {
          let e,
            r;
          e = n(t || !1), t = e.resp, r = e.success, r ? h.resolve(t) : h.reject(t), l.onload = l.onreadystatechange = null, l.parentNode && l.parentNode.removeChild(l), a.unset(['callbacks', o]);
        }), l.onerror = function () {
          h.reject(new Error(`failed to fetch ${l.src}`));
        }, l.src = d.url(t, e), l.async = 'async', s.body.appendChild(l), h.promise;
      }
      var s = n(9),
        a = n(18),
        u = n(1),
        c = n(12),
        d = n(25),
        f = 'cb',
        l = 0;
      t.exports = {
        fetch: o,
      };
    }, function (t, e, n) {
      function r(t) {
        let e,
          n;
        return e = t.headers && t.headers.status, n = t && !t.error && e === 200, !n && t.headers && t.headers.message && i.warn(t.headers.message), {
          success: n,
          resp: t,
        };
      }
      var i = n(10);
      t.exports = r;
    }, function (t, e) {
      function n() {
        const t = (new Date()).toString().match(/(GMT[+-]?\d+)/);
        return t && t[0] || 'GMT';
      }
      t.exports = {
        getTimezoneOffset: n,
      };
    }, function (t, e) {
      function n() {
        const t = 9e5;
        return Math.floor(+new Date() / t);
      }
      t.exports = n;
    }, function (t, e, n) {
      function r() {
        w.init('backendHost', b);
      }

      function i() {
        w.unset('backendHost', b);
      }

      function o(t) {
        const e = t || [];
        return e.unshift('cookie/consent'), p(E(), e);
      }

      function s(t) {
        const e = t || [];
        return e.unshift('settings'), p(E(), e);
      }

      function a(t) {
        const e = t || [];
        return e.unshift('video/event'), p(_(), e);
      }

      function u(t) {
        const e = t || [];
        return e.unshift('grid/collection'), p(_(), e);
      }

      function c(t) {
        const e = t || [];
        return e.unshift('moments'), p(_(), e);
      }

      function d(t) {
        const e = t || [];
        return e.unshift('timeline'), p(_(), e);
      }

      function f(t) {
        const e = t || [];
        return e.unshift('widgets/timelines'), p(_(), e);
      }

      function l(t) {
        const e = t || [];
        return e.unshift('tweets.json'), p(_(), e);
      }

      function h(t) {
        const e = t || [];
        return e.unshift('widgets/video'), p(_(), e);
      }

      function p(t, e) {
        const n = [t];
        return e.forEach((t) => {
          n.push(m(t));
        }), n.join('/');
      }

      function m(t) {
        let e = (t || '').toString(),
          n = v(e) ? 1 : 0,
          r = g(e) ? -1 : void 0;
        return e.slice(n, r);
      }

      function v(t) {
        return t.slice(0, 1) === '/';
      }

      function g(t) {
        return t.slice(-1) === '/';
      }
      var w = n(18),
        y = 'https://cdn.syndication.twimg.com',
        b = 'https://syndication.twitter.com',
        _ = function () {
          return w.get('backendHost') || y;
        },
        E = function () {
          return w.get('settingsSvcHost') || b;
        };
      t.exports = {
        cookieConsent: o,
        disableCDN: r,
        enableCDN: i,
        eventVideo: a,
        grid: u,
        moment: c,
        settings: s,
        timeline: d,
        timelinePreconfigured: f,
        tweetBatch: l,
        video: h,
      };
    }, function (t, e, n) {
      let r = n(9),
        i = n(26),
        o = r.createElement('div');
      t.exports = function (t) {
        return i.isNumber(t) && (t += 'px'), o.style.width = '', o.style.width = t, o.style.width || null;
      };
    }, function (t, e, n) {
      function r(t) {
        t.after('prepForInsertion', function (t) {
          o.sizeIframes(t, this.sandbox.width, s, i.sync);
        }), t.after('resize', function () {
          o.sizeIframes(this.el, this.sandbox.width, s, i.write);
        });
      }
      var i = n(36),
        o = n(140),
        s = 375;
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        t.getAttribute('data-image') ? s(t, e) : u(t, e);
      }

      function i(t) {
        const e = t.split(' ');
        this.url = decodeURIComponent(e[0].trim()), this.width = +e[1].replace(/w$/, '').trim();
      }

      function o(t, e, n) {
        let r,
          o,
          s,
          u,
          c;
        if (o = a(t), s = e.split(',').map(t => new i(t.trim())), n) { for (c = 0; c < s.length; c++) s[c].url === n && (r = s[c]); }
        return u = s.reduce((t, e) => (e.width < t.width && e.width >= o ? e : t), s[0]), r && r.width > u.width ? r : u;
      }

      function s(t, e) {
        let n,
          r,
          i,
          o,
          s;
        n = y.decodeURL(t.src).name, r = n && b(R, (t) => {
          if (S[t] === n) return t;
        }), o = a(e) || 680, r >= o || (i = t.getAttribute('data-image'), s = b(R, (t) => {
          if (t >= o) return t;
        }) || 4096, t.src = y.url(i, {
            format: 'jpg',
            name: S[s],
          }));
      }

      function a(t) {
        return v.devicePixelRatio ? t * v.devicePixelRatio : t;
      }

      function u(t, e) {
        let n,
          r = t.getAttribute('data-srcset'),
          i = t.src;
        r && (n = o(e, r, i), t.src = n.url);
      }

      function c(t, e) {
        e = void 0 !== e ? !!e : _.retina(), g.toRealArray(t.getElementsByTagName('IMG')).forEach((t) => {
          let n = t.getAttribute('data-src-1x') || t.getAttribute('src'),
            r = t.getAttribute('data-src-2x');
          e && r ? t.src = r : n && (t.src = n);
        });
      }

      function d(t, e, n) {
        t && (g.toRealArray(t.querySelectorAll('.NaturalImage-image')).forEach((t) => {
          n(() => {
            r(t, e);
          });
        }), g.toRealArray(t.querySelectorAll('.CroppedImage-image')).forEach((t) => {
            n(() => {
              r(t, e / 2);
            });
          }), g.toRealArray(t.querySelectorAll('img.autosized-media')).forEach((t) => {
            n(() => {
              r(t, e), t.removeAttribute('width'), t.removeAttribute('height');
            });
          }));
      }

      function f(t, e, n, r) {
        t && g.toRealArray(t.querySelectorAll('iframe.autosized-media, .wvp-player-container')).forEach((t) => {
          const i = h(t.getAttribute('data-width'), t.getAttribute('data-height'), E.effectiveWidth(t.parentElement) || e, n);
          r(() => {
            t.setAttribute('width', i.width), t.setAttribute('height', i.height), x.present(t, 'wvp-player-container') ? (t.style.width = i.width, t.style.height = i.height) : (t.width = i.width, t.height = i.height);
          });
        });
      }

      function l(t, e, n, r) {
        d(t, e, r), f(t, e, n, r);
      }

      function h(t, e, n, r, i, o) {
        return n = n || t, r = r || e, i = i || 0, o = o || 0, t > n && (e *= n / t, t = n), e > r && (t *= r / e, e = r), t < i && (e *= i / t, t = i), e < o && (t *= o / e, e = o), {
          width: Math.floor(t),
          height: Math.floor(e),
        };
      }

      function p(t, e, n, r) {
        g.toRealArray(t.querySelectorAll(e)).forEach((t) => {
          let e = t.getAttribute('style') || t.getAttribute('data-style'),
            i = r.test(e) && RegExp.$1;
          i && (t.setAttribute('data-csp-fix', !0), t.style[n] = i);
        });
      }

      function m(t) {
        w.inlineStyle() || (p(t, '.MediaCard-widthConstraint', 'maxWidth', A), p(t, '.MediaCard-mediaContainer', 'paddingBottom', I), p(t, '.CroppedImage-image', 'top', C), p(t, '.CroppedImage-image', 'left', T));
      }
      var v = n(7),
        g = n(12),
        w = n(66),
        y = n(25),
        b = n(141),
        _ = n(8),
        E = n(142),
        x = n(21),
        A = /max-width:\s*([\d.]+px)/,
        C = /top:\s*(-?[\d.]+%)/,
        T = /left:\s*(-?[\d.]+%)/,
        I = /padding-bottom:\s*([\d.]+%)/,
        S = {
          64: 'tiny',
          120: '120x120',
          240: '240x240',
          360: '360x360',
          680: 'small',
          900: '900x900',
          1200: 'medium',
          2048: 'large',
          4096: '4096x4096',
        },
        R = Object.keys(S).sort((t, e) => t - e);
      t.exports = {
        scaleDimensions: h,
        retinize: c,
        setSrcForImgs: d,
        sizeIframes: f,
        constrainMedia: l,
        fixMediaCardLayout: m,
        __setSrcFromSet: u,
        __setSrcFromImage: s,
        __setImageSrc: r,
      };
    }, function (t, e) {
      t.exports = function (t, e, n) {
        for (var r, i = 0; i < t.length; i++) { if (r = e.call(n, t[i], i, t)) return r; }
      };
    }, function (t, e) {
      function n(t) {
        return t && t.nodeType === 1 ? t.offsetWidth || n(t.parentNode) : 0;
      }
      t.exports = {
        effectiveWidth: n,
      };
    }, function (t, e, n) {
      function r(t) {
        return t.replace(/-(.)/g, (t, e) => e.toUpperCase());
      }

      function i(t) {
        return (t || '').split(';').reduce((t, e) => {
          let n,
            i;
          return c.test(e.trim()) && (n = RegExp.$1, i = RegExp.$2, t[r(n)] = i), t;
        }, {});
      }

      function o(t) {
        const e = i(t.getAttribute('data-style'));
        Object.keys(e).length !== 0 && (t.setAttribute('data-csp-fix', 'true'), u.forIn(e, (e, n) => {
          t.style[e] = n;
        }));
      }

      function s(t) {
        t.selectors({
          cspForcedStyle: '.js-cspForcedStyle',
        }), t.after('prepForInsertion', function (t) {
          a.inlineStyle() || this.select(t, 'cspForcedStyle').forEach(o);
        });
      }
      var a = n(66),
        u = (n(10), n(12)),
        c = /^([a-zA-Z-]+):\s*(.+)$/;
      t.exports = s;
    }, function (t, e, n) {
      function r(t) {
        t.after('prepForInsertion', (t) => {
          i.retinize(t);
        });
      }
      var i = n(140);
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        t.after('prepForInsertion', function (t) {
          o.setSrcForImgs(t, this.sandbox.width, i.sync);
        }), t.after('resize', function () {
          o.setSrcForImgs(this.el, this.sandbox.width, i.write);
        });
      }
      var i = n(36),
        o = n(140);
      t.exports = r;
    }, function (t, e) {
      function n(t) {
        t.after('render', function () {
          const t = this.el.getAttribute(r);
          t && this.sandbox.setTitle && this.sandbox.setTitle(t);
        });
      }
      var r = 'data-iframe-title';
      t.exports = n;
    }, function (t, e, n) {
      function r(t) {
        return t.every(a.isInt);
      }

      function i(t) {
        const e = t.map(t => ({
          size: +t,
          className: u + t,
        })).sort((t, e) => t.size - e.size);
        return e.unshift({
          size: 0,
          className: c,
        }), e;
      }

      function o(t) {
        t.params({
          breakpoints: {
            required: !0,
            validate: r,
            transform: i,
          },
        }), t.define('getClassForWidth', function (t) {
          let e,
            n,
            r;
          for (n = this.params.breakpoints.length - 1; n >= 0; n--) {
            if (r = this.params.breakpoints[n], t > r.size) {
              e = r.className;
              break;
            }
          }
          return e;
        }), t.after('initialize', function () {
          this.allBreakpoints = this.params.breakpoints.map(t => t.className);
        }), t.define('recalculateBreakpoints', function () {
          const t = this.getClassForWidth(this.sandbox.width);
          return t && this.sandbox.hasRootClass(t) ? s.resolve() : s.all([this.sandbox.removeRootClass(this.allBreakpoints), this.sandbox.addRootClass(t)]);
        }), t.after('render', function () {
          return this.recalculateBreakpoints();
        }), t.after('resize', function () {
          return this.recalculateBreakpoints();
        });
      }
      var s = n(2),
        a = n(26),
        u = 'env-bp-',
        c = `${u}min`;
      t.exports = o;
    }, , function (t, e, n) {
      function r(t, e, n) {
        let r,
          i = new u(),
          o = a(t, n);
        if (o) return (r = d.createPlayerForTweet(o.element, e, o.options)) ? (i.resolve(r), i.promise) : i.reject(new Error('unable to create tweet video player'));
      }

      function i(t, e, n) {
        let r,
          i = new u(),
          o = a(t, n);
        return o ? (r = d.createPlayerForLiveVideo(o.element, e, o.options), r.on('ready', () => {
          r.playPreview(), i.resolve(r);
        }), i.promise) : i.reject(new Error('unable to initialize event video player'));
      }

      function o(t) {
        let e = t.querySelector('.wvp-player-container'),
          n = e && d.findPlayerForElement(e);
        if (n) return n.teardown();
      }

      function s(t) {
        return d.findPlayerForElement(t);
      }

      function a(t, e) {
        let n,
          r;
        if (e = e || {}, r = {
          scribeContext: e.scribeContext || {
            client: 'tfw',
          },
          languageCode: e.languageCode,
          hideControls: e.hideControls || !1,
          addTwitterBranding: e.addBranding || !1,
          widgetOrigin: e.widgetOrigin,
          borderRadius: e.borderRadius,
        }, n = c(t, '.wvp-player-container'), n.length > 0) {
          return f && d.setBaseUrl(f), {
            element: n[0],
            options: r,
          };
        }
      }
      var u = n(1),
        c = n(83),
        d = n(150),
        f = null;
      t.exports = {
        insertForTweet: r,
        insertForEvent: i,
        remove: o,
        find: s,
      };
    }, function (t, e, n) {
      let r;
      !(function (i, o) {
        r = function () {
          return i.TwitterVideoPlayer = o();
        }.call(e, n, e, t), !(void 0 !== r && (t.exports = r));
      }(this, () => {
        function t(t) {
          if (t && t.data && t.data.params && t.data.params[0]) {
            let e = t.data.params[0],
              n = t.data.id;
            if (e && e.context && e.context === 'TwitterVideoPlayer') {
              const r = e.playerId;
              delete e.playerId, delete e.context;
              const i = a[r];
              i && i.processMessage(t.data.method, e, n);
            }
          }
        }

        function e(t, e, n) {
          let r = Object.keys(n).filter(t => n[t] != null).map((t) => {
            const e = n[t];
            return `${encodeURIComponent(t)}=${encodeURIComponent(e)}`;
          }).join('&');
          return r && (r = `?${r}`), t + e + r;
        }

        function n(n, i, o, u, c) {
          let d = n.ownerDocument,
            f = d.defaultView;
          f.addEventListener('message', t), this.playerId = s++;
          const l = {
            embed_source: 'clientlib',
            player_id: this.playerId,
            rpc_init: 1,
          };
          if (this.scribeParams = {}, this.scribeParams.suppressScribing = u && u.suppressScribing, !this.scribeParams.suppressScribing) {
            if (!u.scribeContext) throw 'video_player: Missing scribe context';
            if (!u.scribeContext.client) throw 'video_player: Scribe context missing client property';
            this.scribeParams.client = u.scribeContext.client, this.scribeParams.page = u.scribeContext.page, this.scribeParams.section = u.scribeContext.section, this.scribeParams.component = u.scribeContext.component;
          }
          this.scribeParams.debugScribe = u && u.scribeContext && u.scribeContext.debugScribing, this.scribeParams.scribeUrl = u && u.scribeContext && u.scribeContext.scribeUrl, this.promotedLogParams = u.promotedContext, this.adRequestCallback = u.adRequestCallback, u.languageCode && (l.language_code = u.languageCode), this.scribeParams.client === 'tfw' && (l.use_syndication_guest_id = !0);
          const h = e(r, i, l);
          return this.videoIframe = document.createElement('iframe'), this.videoIframe.setAttribute('src', h), this.videoIframe.setAttribute('allowfullscreen', ''), this.videoIframe.setAttribute('id', o), this.videoIframe.setAttribute('style', 'width: 100%; height: 100%; position: absolute; top: 0; left: 0;'), this.domElement = n, this.domElement.appendChild(this.videoIframe), a[this.playerId] = this, this.eventCallbacks = {}, this.emitEvent = function (t, e) {
            const n = this.eventCallbacks[t];
            typeof n !== 'undefined' && n.forEach((t) => {
              t.apply(this.playerInterface, [e]);
            });
          }, this.jsonRpc = function (t) {
            const e = this.videoIframe.contentWindow;
            t.jsonrpc = '2.0', e && e.postMessage && e.postMessage(JSON.stringify(t), '*');
          }, this.jsonRpcCall = function (t, e) {
            this.jsonRpc({
              method: t,
              params: e,
            });
          }, this.jsonRpcResult = function (t, e) {
            this.jsonRpc({
              result: t,
              id: e,
            });
          }, this.processMessage = function (t, e, n) {
            switch (t) {
              case 'requestPlayerConfig':
                this.jsonRpcResult({
                  scribeParams: this.scribeParams,
                  promotedLogParams: this.promotedLogParams,
                  squareCorners: u.squareCorners,
                  borderRadius: u.borderRadius,
                  hideControls: u.hideControls,
                  embedded: u.addTwitterBranding,
                  widgetOrigin: u.widgetOrigin,
                  ignoreFineGrainGeoblocking: u.ignoreFineGrainGeoblocking,
                }, n);
                break;
              case 'videoPlayerAdStart':
                this.emitEvent('adStart', e);
                break;
              case 'videoPlayerAdEnd':
                this.emitEvent('adEnd', e);
                break;
              case 'videoPlayerPlay':
                this.emitEvent('play', e);
                break;
              case 'videoPlayerPause':
                this.emitEvent('pause', e);
                break;
              case 'videoPlayerMute':
                this.emitEvent('mute', e);
                break;
              case 'videoPlayerUnmute':
                this.emitEvent('unmute', e);
                break;
              case 'videoPlayerPlaybackComplete':
                this.emitEvent('playbackComplete', e);
                break;
              case 'videoPlayerReady':
                this.emitEvent('ready', e);
                break;
              case 'videoView':
                this.emitEvent('view', e);
                break;
              case 'debugLoggingEvent':
                this.emitEvent('logged', e);
                break;
              case 'requestDynamicAd':
                typeof this.adRequestCallback === 'function' ? this.jsonRpcResult(this.adRequestCallback(), n) : this.jsonRpcResult({}, n);
                break;
              case 'videoPlayerError':
                e && e.error_category === 'NO_COOKIES_ERROR' ? this.emitEvent('noCookiesError', e) : e && e.error_category === 'GEOBLOCK_ERROR' && this.emitEvent('geoblockError', e);
            }
          }, this.playerInterface = {
            on: function (t, e) {
              return typeof this.eventCallbacks[t] === 'undefined' && (this.eventCallbacks[t] = []), this.eventCallbacks[t].push(e), this.playerInterface;
            }.bind(this),
            off: function (t, e) {
              if (typeof e === 'undefined') delete this.eventCallbacks[t];
              else {
                const n = this.eventCallbacks[t];
                if (typeof n !== 'undefined') {
                  const r = n.indexOf(e);
                  r > -1 && n.splice(r, 1);
                }
              }
              return this.playerInterface;
            }.bind(this),
            play: function () {
              return this.jsonRpcCall('play'), this.playerInterface;
            }.bind(this),
            pause: function () {
              return this.jsonRpcCall('pause'), this.playerInterface;
            }.bind(this),
            mute: function () {
              return this.jsonRpcCall('mute'), this.playerInterface;
            }.bind(this),
            unmute: function () {
              return this.jsonRpcCall('unmute'), this.playerInterface;
            }.bind(this),
            playPreview: function () {
              return this.jsonRpcCall('autoPlayPreview'), this.playerInterface;
            }.bind(this),
            pausePreview: function () {
              return this.jsonRpcCall('autoPlayPreviewStop'), this.playerInterface;
            }.bind(this),
            updatePosition: function (t) {
              return this.jsonRpcCall('updatePosition', [t]), this.playerInterface;
            }.bind(this),
            updateLayoutBreakpoint: function (t) {
              return this.jsonRpcCall('updateLayoutBreakpoint', [t]), this.playerInterface;
            }.bind(this),
            enterFullScreen: function () {
              return this.jsonRpcCall('enterFullScreen'), this.playerInterface;
            }.bind(this),
            exitFullScreen: function () {
              return this.jsonRpcCall('exitFullScreen'), this.playerInterface;
            }.bind(this),
            teardown: function () {
              this.eventCallbacks = {}, n.removeChild(this.videoIframe), this.videoIframe = void 0, delete a[this.playerId];
            }.bind(this),
          }, this.playerInterface;
        }
        var r = 'https://twitter.com',
          i = /^https?:\/\/([a-zA-Z0-9]+\.)*twitter.com(:\d+)?$/,
          o = {
            suppressScribing: !1,
            squareCorners: !1,
            hideControls: !1,
            addTwitterBranding: !1,
          },
          s = 0,
          a = {};
        return {
          setBaseUrl(t) {
            i.test(t) ? r = t : window.console.error(`newBaseUrl ${t} not allowed`);
          },
          createPlayerForTweet(t, e, r) {
            let i = `/i/videos/tweet/${e}`,
              s = `player_tweet_${e}`;
            return new n(t, i, s, r || o);
          },
          createPlayerForDm(t, e, r) {
            let i = `/i/videos/dm/${e}`,
              s = `player_dm_${e}`;
            return new n(t, i, s, r || o);
          },
          createPlayerForLiveVideo(t, e, r) {
            let i = `/i/videos/live_video/${e}`,
              s = `player_live_video_${e}`;
            return new n(t, i, s, r || o);
          },
          findPlayerForElement(t) {
            for (const e in a) {
              if (a.hasOwnProperty(e)) {
                let n = a[e];
                if (n && n.domElement === t) return n.playerInterface;
              }
            }
            return null;
          },
        };
      }));
    }, function (t, e, n) {
      function r(t) {
        t.selectors({
          clickToOpen: '.js-clickToOpenTarget',
        }), t.define('shouldOpenTarget', function (t) {
          let e = i.closest('A', t.target, this.el),
            n = i.closest('BUTTON', t.target, this.el),
            r = this.sandbox.hasSelectedText();
          return !e && !n && !r;
        }), t.define('openTarget', function (t, e) {
          const n = e && e.getAttribute(u);
          n && (o(n), this.scribeOpenClick(t));
        }), t.define('attemptToOpenTarget', function (t, e) {
          this.shouldOpenTarget(t) && this.openTarget(t, e);
        }), t.define('scribeOpenClick', function (t) {
          let e = a.extractTermsFromDOM(t.target),
            n = {
              associations: a.formatTweetAssociation(e),
            };
          this.scribe({
            section: 'chrome',
            action: 'click',
          }, n);
        }), t.after('render', function () {
          this.on('click', 'clickToOpen', this.attemptToOpenTarget);
        });
      }
      var i = n(22),
        o = n(152),
        s = n(89),
        a = n(50),
        u = 'data-click-to-open-target';
      t.exports = s.couple(n(102), r);
    }, function (t, e, n) {
      function r(t) {
        s.isTwitterURL(t) && (t = o(t)), i.open(t);
      }
      var i = n(7),
        o = n(101),
        s = n(24);
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        t.params({
          productName: {
            required: !0,
          },
          dataSource: {
            required: !1,
          },
          related: {
            required: !1,
          },
          partner: {
            fallback: d(o.val, o, 'partner'),
          },
        }), t.selectors({
          timeline: '.timeline',
          tweetIdInfo: '.js-tweetIdInfo',
        }), t.define('injectWebIntentParams', function (t) {
          let e = i.closest(this.selectors.timeline, t, this.el),
            n = i.closest(this.selectors.tweetIdInfo, t, this.el);
          t.getAttribute(f) || (t.setAttribute(f, !0), t.href = u.url(t.href, {
            tw_w: this.params.dataSource && this.params.dataSource.id,
            tw_i: n && n.getAttribute('data-tweet-id'),
            tw_p: this.params.productName,
            related: this.params.related,
            partner: this.params.partner,
            query: e && e.getAttribute('data-search-query'),
            profile_id: e && e.getAttribute('data-profile-id'),
            original_referer: a.rootDocumentLocation(),
          }));
        }), t.after('render', function () {
          this.on('click', 'A', function (t, e) {
            c.isIntentURL(e.href) && (this.injectWebIntentParams(e), s.open(e.href, this.sandbox.sandboxEl, t));
          });
        });
      }
      var i = n(22),
        o = n(41),
        s = n(23),
        a = n(47),
        u = n(25),
        c = n(24),
        d = n(15),
        f = 'data-url-params-injected';
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        t.before('render', function () {
          i.ios() && this.sandbox.addRootClass('env-ios'), i.ie9() && this.sandbox.addRootClass('ie9'), i.touch() && this.sandbox.addRootClass('is-touch');
        });
      }
      var i = n(8);
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        t.params({
          pageForAudienceImpression: {
            required: !0,
          },
        }), t.before('hydrate', function () {
          i.scribeAudienceImpression(this.params.pageForAudienceImpression);
        });
      }
      var i = n(156);
      t.exports = r;
    }, function (t, e, n) {
      function r() {
        return d.formatGenericEventData('syndicated_impression', {});
      }

      function i() {
        u('tweet');
      }

      function o() {
        u('timeline');
      }

      function s() {
        u('video');
      }

      function a() {
        u('partnertweet');
      }

      function u(t) {
        f.isHostPageSensitive() || l[t] || (l[t] = !0, c.scribe(d.formatClientEventNamespace({
          page: t,
          action: 'impression',
        }), r(), d.AUDIENCE_ENDPOINT));
      }
      var c = n(71),
        d = n(50),
        f = n(49),
        l = {};
      t.exports = {
        scribeAudienceImpression: u,
        scribePartnerTweetAudienceImpression: a,
        scribeTweetAudienceImpression: i,
        scribeTimelineAudienceImpression: o,
        scribeVideoAudienceImpression: s,
      };
    }, function (t, e, n) {
      function r(t) {
        let e = {
            action: 'dimensions',
          },
          n = new o(s);
        t.after('show', function () {
          let t,
            r,
            i;
          n.nextBoolean() && (t = this.sandbox.width, r = this.sandbox.height, i = {
            widget_width: t,
            widget_height: r,
          }, this.scribe(e, i));
        });
      }
      var i = n(89),
        o = n(158),
        s = 1;
      t.exports = i.couple(n(102), r);
    }, function (t, e) {
      function n(t) {
        this.percentage = t;
      }
      n.prototype.nextBoolean = function () {
        return 100 * Math.random() < this.percentage;
      }, t.exports = n;
    }, , function (t, e, n) {
      function r(t) {
        const e = {
          transparent: !1,
          hideBorder: !1,
          hideHeader: !1,
          hideFooter: !1,
          hideScrollBar: !1,
        };
        return t = t || '', i.contains(t, 'transparent') && (e.transparent = !0), i.contains(t, 'noborders') && (e.hideBorder = !0), i.contains(t, 'noheader') && (e.hideHeader = !0), i.contains(t, 'nofooter') && (e.hideFooter = !0), i.contains(t, 'noscrollbar') && (e.hideScrollBar = !0), e;
      }
      var i = n(12);
      t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        let e = u(t),
          n = {
            momentId: a.momentId(t.href),
            chrome: t.getAttribute('data-chrome'),
            limit: t.getAttribute('data-limit'),
          };
        return s.forIn(n, (t, n) => {
          const r = e[t];
          e[t] = o.hasValue(r) ? r : n;
        }), e;
      }

      function i(t) {
        const e = c(t, f);
        return e.map(t => d(r(t), t.parentNode, t));
      }
      var o = n(26),
        s = n(12),
        a = n(24),
        u = n(80),
        c = n(82)(),
        d = n(162),
        f = 'a.twitter-moment';
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'twitter-moment', t, e, n);
      }
      var i = n(86),
        o = n(163),
        s = n(53);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(4, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(164), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , , function (t, e, n) {
      function r(t) {
        t.selectors({
          inViewportMarker: '.js-inViewportScribingTarget',
        }), t.define('scribeInViewportSeen', function (t, e) {
          const n = i.extractTermsFromDOM(t);
          n.action = 'seen',
          this.scribe(n, e, s.version);
        }), t.after('show', function () {
          let t = this.selectors.inViewportMarker,
            e = this.select(t);
          e.forEach(function (t) {
            t && a.inViewportOnce(t, this.sandbox.sandboxEl, () => {
              this.scribeInViewportSeen(t, this.scribeItems());
            });
          }, this);
        });
      }
      var i = n(50),
        o = n(89),
        s = n(52),
        a = n(168);
      t.exports = o.couple(n(102), r);
    }, function (t, e, n) {
      let r = n(169),
        i = n(67),
        o = n(170),
        s = n(7),
        a = n(8),
        u = 50,
        c = function (t) {
          return (s.requestIdleCallback || s.requestAnimationFrame || function (t) {
            t();
          })(t);
        },
        d = function () {
          this.observers = [];
        };
      d.prototype._register = function (t, e, n) {
        let i,
          u = this;
        return a.hasIntersectionObserverSupport() ? (i = new s.IntersectionObserver(((t) => {
          t.forEach((t) => {
            t.intersectionRatio >= 1 && (c(n), u._unregister(i));
          });
        }), {
          threshold: 1,
        }), i.observe(t), i) : (i = {
          update(o, s) {
            r(t, {
              viewportWidth: o,
              viewportHeight: s,
              sandboxEl: e,
            }) && (n(), u._unregister(i));
          },
        }, this.observers.push(i), this.observers.length === 1 && (this.unlisten = o.addScrollListener(this._onViewportChange.bind(this))), this._onViewportChange(), i);
      }, d.prototype._unregister = function (t) {
        let e;
        a.hasIntersectionObserverSupport() && t instanceof s.IntersectionObserver ? t.disconnect() : (e = this.observers.indexOf(t), e > -1 && (this.observers.splice(e, 1), this.observers.length === 0 && this.unlisten && this.unlisten()));
      }, d.prototype._onViewportChange = function () {
        i(c(() => {
          this._notify(o.getWidth(), o.getHeight());
        }), u, this);
      }, d.prototype._notify = function (t, e) {
        this.observers.forEach((n) => {
          n.update(t, e);
        });
      }, d.prototype.inViewportOnce = function (t, e, n) {
        return this._register(t, e, n);
      }, t.exports = new d();
    }, function (t, e, n) {
      function r(t, e) {
        let n,
          r,
          s,
          a;
        return e = e || {}, r = e.viewportWidth || o.innerWidth, n = e.viewportHeight || o.innerHeight, s = t.getBoundingClientRect(), t.ownerDocument !== i && e.sandboxEl && (a = e.sandboxEl.getBoundingClientRect(), s = {
          top: s.top + a.top,
          bottom: s.bottom + a.top,
          left: s.left + a.left,
          right: s.right + a.left,
        }), s.top >= 0 && s.left >= 0 && s.bottom <= n && s.right <= r;
      }
      var i = n(9),
        o = n(7);
      t.exports = r;
    }, function (t, e, n) {
      let r = n(7),
        i = {
          _addListener(t, e) {
            let n,
              i = function () {
                e();
              };
            return r.addEventListener(t, i), n = function () {
              r.removeEventListener(t, i);
            };
          },
          addScrollListener(t) {
            return this._addListener('scroll', t);
          },
          getHeight() {
            return r.innerHeight;
          },
          getWidth() {
            return r.innerWidth;
          },
        };
      t.exports = i;
    }, , function (t, e, n) {
      function r(t) {
        let e = s(t),
          n = t.getAttribute('href'),
          r = t.getAttribute('data-size'),
          i = d.exec(n)[1];
        return o.aug(e, {
          username: i,
          size: r,
        });
      }

      function i(t) {
        const e = a(t, c);
        return e.map(t => u(r(t), t.parentNode, t));
      }
      var o = n(12),
        s = n(80),
        a = n(82)(),
        u = n(173),
        c = 'a.periscope-on-air',
        d = /^https?:\/\/(?:www\.)?(?:periscope|pscp)\.tv\/@?([a-zA-Z0-9_]+)\/?$/i;
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'periscope-on-air', t, e, n);
      }
      var i = n(86),
        o = n(174),
        s = n(53);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(5, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(175), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , , function (t, e, n) {
      function r(t) {
        let e = c(t),
          n = t.getAttribute('data-show-replies'),
          r = {
            widgetId: t.getAttribute('data-widget-id'),
            chrome: t.getAttribute('data-chrome'),
            tweetLimit: t.getAttribute('data-tweet-limit'),
            ariaLive: t.getAttribute('data-aria-polite'),
            theme: t.getAttribute('data-theme'),
            linkColor: t.getAttribute('data-link-color'),
            borderColor: t.getAttribute('data-border-color'),
            showReplies: n ? o.asBoolean(n) : null,
            profileScreenName: t.getAttribute('data-screen-name'),
            profileUserId: t.getAttribute('data-user-id'),
            favoritesScreenName: t.getAttribute('data-favorites-screen-name'),
            favoritesUserId: t.getAttribute('data-favorites-user-id'),
            likesScreenName: t.getAttribute('data-likes-screen-name'),
            likesUserId: t.getAttribute('data-likes-user-id'),
            listOwnerScreenName: t.getAttribute('data-list-owner-screen-name'),
            listOwnerUserId: t.getAttribute('data-list-owner-id'),
            listId: t.getAttribute('data-list-id'),
            listSlug: t.getAttribute('data-list-slug'),
            customTimelineId: t.getAttribute('data-custom-timeline-id'),
            staticContent: t.getAttribute('data-static-content'),
            url: t.href,
          };
        return r = s.aug(r, e), r.dataSource = a(r), r.useLegacyDefaults = r.dataSource instanceof u, r;
      }

      function i(t) {
        const e = d(t, l);
        return e.map(t => f(r(t), t.parentNode, t));
      }
      var o = n(26),
        s = n(12),
        a = n(179),
        u = n(194),
        c = n(80),
        d = n(82)(),
        f = n(196),
        l = 'a.twitter-timeline,div.twitter-timeline';
      t.exports = i;
    }, function (t, e, n) {
      function r(t) {
        let e,
          n;
        return e = (`${t.sourceType}`).toLowerCase(), n = p[e], n ? new n(t) : null;
      }

      function i(t) {
        return s(m, (e) => {
          try {
            return new e(t);
          } catch (t) {}
        });
      }

      function o(t) {
        return t ? r(t) || i(t) : null;
      }
      var s = n(141),
        a = n(180),
        u = n(184),
        c = n(186),
        d = n(188),
        f = n(190),
        l = n(192),
        h = n(194),
        p = {
          collection: a,
          event: u,
          likes: c,
          list: d,
          profile: l,
          widget: h,
          url: i,
        },
        m = [h, l, c, a, d, u, f];
      t.exports = o;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(183)]);
    }, function (t, e, n) {
      let r = n(55),
        i = n(59),
        o = n(15);
      r = Object.create(r), r.build = o(r.build, null, i), t.exports = r;
    }, function (t, e, n) {
      function r(t) {
        if (!t || !t.headers) throw new Error('unexpected response schema');
        return {
          html: t.body,
          config: t.config,
          pollInterval: 1e3 * parseInt(t.headers.xPolling, 10) || null,
          maxCursorPosition: t.headers.maxPosition,
          minCursorPosition: t.headers.minPosition,
        };
      }

      function i(t) {
        if (t && t.headers) throw new Error(t.headers.status);
        throw t instanceof Error ? t : new Error(t);
      }

      function o(t) {
        t.params({
          instanceId: {
            required: !0,
            fallback: p.deterministic,
          },
          lang: {
            required: !0,
            transform: d.matchLanguage,
            fallback: 'en',
          },
          tweetLimit: {
            transform: h.asInt,
          },
        }), t.defineProperty('endpoint', {
          get() {
            throw new Error('endpoint not specified');
          },
        }), t.defineProperty('pollEndpoint', {
          get() {
            return this.endpoint;
          },
        }), t.define('cbId', function (t) {
          const e = t ? '_new' : '_old';
          return `tl_${this.params.instanceId}_${this.id}${e}`;
        }), t.define('queryParams', function () {
          return {
            lang: this.params.lang,
            tz: f.getTimezoneOffset(),
            t: s(),
            domain: c.host,
            tweet_limit: this.params.tweetLimit,
            dnt: l.enabled(),
          };
        }), t.define('fetch', function () {
          return a.fetch(this.endpoint, this.queryParams(), u, this.cbId()).then(r, i);
        }), t.define('poll', function (t, e) {
          let n,
            o;
          return t = t || {}, n = {
            since_id: t.sinceId,
            max_id: t.maxId,
            min_position: t.minPosition,
            max_position: t.maxPosition,
          }, o = m.aug(this.queryParams(), n), a.fetch(this.pollEndpoint, o, u, this.cbId(e)).then(r, i);
        });
      }
      var s = n(136),
        a = n(133),
        u = n(134),
        c = n(11),
        d = n(95),
        f = n(135),
        l = n(46),
        h = n(26),
        p = n(29),
        m = n(12);
      t.exports = o;
    }, function (t, e, n) {
      function r(t, e) {
        return o.collectionId(t) || e;
      }

      function i(t) {
        t.params({
          id: {},
          url: {},
        }), t.overrideProperty('id', {
          get() {
            const t = r(this.params.url, this.params.id);
            return u + t;
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return a.timeline(['collection']);
          },
        }), t.around('queryParams', function (t) {
          return s.aug(t(), {
            collection_id: r(this.params.url, this.params.id),
          });
        }), t.before('initialize', function () {
          if (!r(this.params.url, this.params.id)) throw new Error('one of url or id is required');
        });
      }
      var o = n(24),
        s = n(12),
        a = n(137),
        u = 'collection:';
      t.exports = i;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(185)]);
    }, function (t, e, n) {
      function r(t, e) {
        return o.eventId(t) || e;
      }

      function i(t) {
        t.params({
          id: {},
          url: {},
        }), t.overrideProperty('id', {
          get() {
            const t = r(this.params.url, this.params.id);
            return u + t;
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return a.timeline(['event']);
          },
        }), t.around('queryParams', function (t) {
          return s.aug(t(), {
            event_id: r(this.params.url, this.params.id),
          });
        }), t.before('initialize', function () {
          if (!r(this.params.url, this.params.id)) throw new Error('one of url or id is required');
        });
      }
      var o = n(24),
        s = n(12),
        a = n(137),
        u = 'event:';
      t.exports = i;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(187)]);
    }, function (t, e, n) {
      function r(t) {
        return o.likesScreenName(t.url) || t.screenName;
      }

      function i(t) {
        t.params({
          screenName: {},
          userId: {},
          url: {},
        }), t.overrideProperty('id', {
          get() {
            const t = r(this.params) || this.params.userId;
            return u + t;
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return a.timeline(['likes']);
          },
        }), t.define('_getLikesQueryParam', function () {
          const t = r(this.params);
          return t ? {
            screen_name: t,
          } : {
            user_id: this.params.userId,
          };
        }), t.around('queryParams', function (t) {
          return s.aug(t(), this._getLikesQueryParam());
        }), t.before('initialize', function () {
          if (!r(this.params) && !this.params.userId) throw new Error('screen name or user id is required');
        });
      }
      var o = n(24),
        s = n(12),
        a = n(137),
        u = 'likes:';
      t.exports = i;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(189)]);
    }, function (t, e, n) {
      function r(t) {
        const e = o.listScreenNameAndSlug(t.url) || t;
        return s.compact({
          screen_name: e.ownerScreenName,
          user_id: e.ownerUserId,
          list_slug: e.slug,
        });
      }

      function i(t) {
        t.params({
          id: {},
          ownerScreenName: {},
          ownerUserId: {},
          slug: {},
          url: {},
        }), t.overrideProperty('id', {
          get() {
            let t,
              e,
              n;
            return this.params.id ? u + this.params.id : (t = r(this.params), e = t && t.list_slug.replace(/-/g, '_'), n = t && (t.screen_name || t.user_id), `${u}${n}:${e}`);
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return a.timeline(['list']);
          },
        }), t.define('_getListQueryParam', function () {
          return this.params.id ? {
            list_id: this.params.id,
          } : r(this.params);
        }), t.around('queryParams', function (t) {
          return s.aug(t(), this._getListQueryParam());
        }), t.before('initialize', function () {
          const t = r(this.params);
          if (s.isEmptyObject(t) && !this.params.id) throw new Error('qualified slug or list id required');
        });
      }
      var o = n(24),
        s = n(12),
        a = n(137),
        u = 'list:';
      t.exports = i;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(191)]);
    }, function (t, e, n) {
      function r(t) {
        t.params({
          previewParams: {
            required: !0,
            validate: i.isObject,
          },
        }), t.overrideProperty('id', {
          get() {
            return 'preview';
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return o.timelinePreconfigured(['preview']);
          },
        }), t.override('queryParams', function () {
          return this.params.previewParams;
        });
      }
      var i = n(26),
        o = n(137);
      t.exports = r;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(193)]);
    }, function (t, e, n) {
      function r(t, e) {
        return o.screenName(t) || e;
      }

      function i(t) {
        t.params({
          showReplies: {
            fallback: !1,
            transform: s.asBoolean,
          },
          screenName: {},
          userId: {},
          url: {},
        }), t.overrideProperty('id', {
          get() {
            const t = r(this.params.url, this.params.screenName);
            return c + (t || this.params.userId);
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return u.timeline(['profile']);
          },
        }), t.define('_getProfileQueryParam', function () {
          let t = r(this.params.url, this.params.screenName),
            e = t ? {
              screen_name: t,
            } : {
              user_id: this.params.userId,
            };
          return a.aug(e, {
            with_replies: this.params.showReplies ? 'true' : 'false',
          });
        }), t.around('queryParams', function (t) {
          return a.aug(t(), this._getProfileQueryParam());
        }), t.before('initialize', function () {
          const t = r(this.params.url, this.params.screenName);
          if (!t && !this.params.userId) throw new Error('screen name or user id is required');
        });
      }
      var o = n(24),
        s = n(26),
        a = n(12),
        u = n(137),
        c = 'profile:';
      t.exports = i;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(182), n(195)]);
    }, function (t, e, n) {
      function r(t) {
        t.params({
          widgetId: {
            required: !0,
          },
          profileShowReplies: {
            fallback: !1,
            transform: i.asBoolean,
          },
          showReplies: {
            fallback: !1,
            transform: i.asBoolean,
          },
          profileScreenName: {},
          screenName: {},
          profileUserId: {},
          userId: {},
          favoritesScreenName: {},
          favoritesUserId: {},
          listOwnerScreenName: {},
          listOwnerUserId: {},
          listOwnerId: {},
          listId: {},
          listSlug: {},
          customTimelineId: {},
          previewParams: {},
        }), t.overrideProperty('id', {
          get() {
            return this.params.widgetId;
          },
        }), t.overrideProperty('endpoint', {
          get() {
            return s.timelinePreconfigured([this.params.widgetId]);
          },
        }), t.overrideProperty('pollEndpoint', {
          get() {
            return s.timelinePreconfigured(['paged', this.params.widgetId]);
          },
        }), t.define('_getWidgetQueryParams', function () {
          let t = this.params.profileScreenName || this.params.screenName,
            e = this.params.profileUserId || this.params.userId,
            n = this.params.profileShowReplies || this.params.showReplies,
            r = this.params.listOwnerUserId || this.params.listOwnerId;
          return t || e ? {
            override_type: 'user',
            override_id: e,
            override_name: t,
            with_replies: n ? 'true' : 'false',
          } : this.params.favoritesScreenName || this.params.favoritesUserId ? {
            override_type: 'favorites',
            override_id: this.params.favoritesUserId,
            override_name: this.params.favoritesScreenName,
          } : this.params.listOwnerScreenName || r || this.params.listId || this.params.listSlug ? {
            override_type: 'list',
            override_owner_id: r,
            override_owner_name: this.params.listOwnerScreenName,
            override_id: this.params.listId,
            override_name: this.params.listSlug,
          } : this.params.customTimelineId ? {
            override_type: 'custom',
            override_id: this.params.customTimelineId,
          } : void 0;
        }), t.around('queryParams', function (t) {
          return o.aug(t(), this._getWidgetQueryParams());
        });
      }
      var i = n(26),
        o = n(12),
        s = n(137);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'twitter-timeline', t, e, n);
      }
      var i = n(86),
        o = n(197),
        s = n(53);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(6, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(198), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , function (t, e, n) {
      function r(t) {
        let e = u(t),
          n = t.getElementsByTagName('A'),
          r = n && n[n.length - 1],
          i = r && s.status(r.href),
          c = t.getAttribute('data-conversation'),
          d = c == 'none' || c == 'hidden' || o.present(t, 'tw-hide-thread'),
          f = t.getAttribute('data-cards'),
          h = f == 'none' || f == 'hidden' || o.present(t, 'tw-hide-media'),
          p = t.getAttribute('data-align') || t.getAttribute('align'),
          m = t.getAttribute('data-link-color'),
          v = t.getAttribute('data-theme');
        return !p && l.test(t.className) && (p = RegExp.$1), a.aug(e, {
          tweetId: i,
          hideThread: d,
          hideCard: h,
          align: p,
          linkColor: m,
          theme: v,
        });
      }

      function i(t) {
        const e = c(t, f);
        return e.map(t => d(r(t), t.parentNode, t));
      }
      var o = n(21),
        s = n(24),
        a = n(12),
        u = n(80),
        c = n(82)(),
        d = n(224),
        f = 'blockquote.twitter-tweet',
        l = /\btw-align-(left|right|center)\b/;
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'twitter-tweet', t, e, n);
      }
      var i = n(86),
        o = n(225),
        s = n(108);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(7, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(226), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , , , function (t, e, n) {
      function r(t) {
        return t.input.lang || v;
      }

      function i(t, e) {
        let n = {
          ids: [],
          lang: t,
          tz: h.getTimezoneOffset(),
        };
        return n = e.reduce((t, e) => t.ids.push(e.input.id), t, n), n.ids = n.ids.sort().join(','), n;
      }

      function o(t, e) {
        t.forEach((t) => {
          const n = e[t.input.id];
          n ? t.taskDoneDeferred.resolve(n) : t.taskDoneDeferred.reject(new Error('not found'));
        });
      }

      function s(t) {
        t.forEach((t) => {
          t.taskDoneDeferred.reject(new Error('request failed'));
        });
      }

      function a(t, e) {
        const n = f(e, r);
        p.forIn(n, (e, n) => {
          let r = i(e, n),
            a = m(o, null, n),
            u = m(s, null, n);
          d.fetch(t, r, c).then(a, u);
        });
      }

      function u(t) {
        this.requestQueue = new l(m(a, null, t));
      }
      var c = n(231),
        d = n(133),
        f = n(43),
        l = n(39),
        h = n(135),
        p = n(12),
        m = n(15),
        v = 'en';
      u.prototype.fetch = function (t, e) {
        return this.requestQueue.add({
          id: t,
          lang: e,
        });
      }, t.exports = u;
    }, function (t, e) {
      function n(t) {
        return {
          success: !0,
          resp: t,
        };
      }
      t.exports = n;
    }, , , , , , , , function (t, e, n) {
      function r() {
        a++, i();
      }

      function i() {
        o && o.length === a && (s.emitter.trigger(s.ALL_WIDGETS_AND_IMAGES_LOADED, o), o = null);
      }
      var o,
        s = n(240),
        a = 0;
      s.emitter.bind(s.ALL_WIDGETS_RENDERED, (t) => {
        o = t.widgets, i();
      }), t.exports = {
        reportImagesLoadForAWidget: r,
      };
    }, function (t, e, n) {
      let r = n(31),
        i = r.makeEmitter();
      t.exports = {
        emitter: i,
        START: 'start',
        ALL_WIDGETS_RENDERED: 'all_widgets_rendered',
        ALL_WIDGETS_AND_IMAGES_LOADED: 'all_widgets_and_images_loaded',
      };
    }, , function (t, e, n) {
      function r(t) {
        let e = a(t),
          n = {
            screenName: t.getAttribute('data-button-screen-name'),
            text: t.getAttribute('data-text'),
            type: t.getAttribute('data-type'),
            size: t.getAttribute('data-size'),
            url: t.getAttribute('data-url'),
            hashtags: t.getAttribute('data-hashtags'),
            via: t.getAttribute('data-via'),
            buttonHashtag: t.getAttribute('data-button-hashtag'),
          };
        return s.forIn(n, (t, n) => {
          const r = e[t];
          e[t] = d.hasValue(r) ? r : n;
        }), e.screenName = e.screenName || e.screen_name, e.buttonHashtag = e.buttonHashtag || e.button_hashtag || e.hashtag, o.present(t, l) && (e.type = 'hashtag'), o.present(t, h) && (e.type = 'mention'), e;
      }

      function i(t) {
        const e = u(t, f);
        return e.map(t => c(r(t), t.parentNode, t));
      }
      var o = n(21),
        s = n(12),
        a = n(80),
        u = n(82)(),
        c = n(243),
        d = n(26),
        f = 'a.twitter-share-button, a.twitter-mention-button, a.twitter-hashtag-button',
        l = 'twitter-hashtag-button',
        h = 'twitter-mention-button';
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        let r = t && t.type || 'share',
          a = r == 'hashtag' ? 'twitter-hashtag-button' : r == 'mention' ? 'twitter-mention-button' : 'twitter-share-button';
        return new i(o, s, a, t, e, n);
      }
      var i = n(86),
        o = n(244),
        s = n(119);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(2, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(245), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , function (t, e, n) {
      function r(t) {
        let e = s(t),
          n = t.getElementsByTagName('A'),
          r = n && n[n.length - 1],
          i = {
            url: r.href,
          };
        return i = o.aug({}, i, o.compact(e)), i.dataSource = c(i), i;
      }

      function i(t) {
        const e = a(t, d);
        return e.map(t => u(r(t), t.parentNode, t));
      }
      var o = n(12),
        s = n(80),
        a = n(82)(),
        u = n(248),
        c = n(253),
        d = 'blockquote.twitter-video';
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e, n) {
        return new i(o, s, 'twitter-video', t, e, n);
      }
      var i = n(86),
        o = n(249),
        s = n(252);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        const r = new i();
        return n.e(7, (i, o) => {
          let s;
          if (i) return r.reject(i);
          try {
            s = n(250), r.resolve(new s(t, e));
          } catch (t) {
            r.reject(t);
          }
        }), r.promise;
      }
      var i = n(1);
      t.exports = r;
    }, , , function (t, e, n) {
      function r(t) {
        t.overrideProperty('sandboxEl', {
          get() {
            return this._constrainingWrapper;
          },
        }), t.override('makeVisible', function () {
          const t = this.iframeEl;
          return i.write(() => {
            t.style.visibility = 'visible';
          });
        }), t.define('setWrapperSize', function (t, e) {
          let n = this,
            r = t / e,
            o = `${100 / r}%`,
            s = `${u * r}px`;
          return i.write(() => {
            n._constrainingWrapper.style.maxWidth = s, n._iframeWrapper.style.paddingBottom = o;
          });
        }), t.after('initialize', function () {
          this._constrainingWrapper = this._iframeWrapper = null;
        }), t.around('insert', function (t, e, n, r, i) {
          let o = this.targetGlobal.document,
            s = this._constrainingWrapper = o.createElement('div'),
            u = this._iframeWrapper = o.createElement('div');
          return s.id = e, s.className = (n || {}).class, s.style.minWidth = `${a}px`, s.style.position = 'relative', s.style.margin = c, u.style.position = 'relative', u.style.height = '0px', s.appendChild(u), t(void 0, null, null, (t) => {
            t.style.position = 'absolute', t.style.top = '0px', t.style.bottom = '0px', t.style.width = '100%', t.style.height = '100%', u.appendChild(t), i(s);
          });
        });
      }
      var i = n(36),
        o = n(54),
        s = n(63),
        a = 320,
        u = 500,
        c = '10px 0px';
      t.exports = o.build([s, r]);
    }, function (t, e, n) {
      function r(t) {
        let e,
          n;
        return e = (`${t.sourceType}`).toLowerCase(), n = a[e], n ? new n(t) : null;
      }

      function i(t) {
        return s(Object.keys(a), (e) => {
          const n = a[e];
          try {
            return new n(t);
          } catch (t) {}
        });
      }

      function o(t) {
        return t ? r(t) || i(t) : null;
      }
      var s = n(141),
        a = n(254);
      t.exports = o;
    }, function (t, e, n) {
      let r = n(255),
        i = n(258);
      t.exports = {
        tweet: r,
        event: i,
      };
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(256), n(257)]);
    }, function (t, e, n) {
      function r(t) {
        t.params({
          lang: {
            required: !0,
            transform: i.matchLanguage,
            fallback: 'en',
          },
        }), t.defineProperty('identifier', {
          get() {
            throw new Error('identifier not specified');
          },
        }), t.defineProperty('name', {
          get() {
            throw new Error('name not specified');
          },
        }), t.defineProperty('scribeItemType', {
          get() {
            throw new Error('scribeItemType not specified');
          },
        }), t.define('fetch', () => {
          throw new Error('fetch not specified');
        });
      }
      var i = n(95);
      t.exports = r;
    }, function (t, e, n) {
      function r(t, e) {
        return e || o.status(t);
      }

      function i(t) {
        t.params({
          id: {},
          url: {},
        }), t.overrideProperty('identifier', {
          get() {
            return r(this.params.url, this.params.id);
          },
        }), t.override('fetch', function () {
          return u.fetch(this.identifier, this.params.lang);
        }), t.overrideProperty('scribeItemType', {
          get() {
            return c.TWEET;
          },
        }), t.overrideProperty('name', {
          get() {
            return 'tweet';
          },
        }), t.before('initialize', function () {
          if (!r(this.params.url, this.params.id)) throw new Error('one of url or id is required');
        });
      }
      var o = n(24),
        s = n(137),
        a = n(230),
        u = new a(s.video()),
        c = n(107);
      t.exports = i;
    }, function (t, e, n) {
      const r = n(181);
      t.exports = r.build([n(256), n(259)]);
    }, function (t, e, n) {
      function r(t, e) {
        return o.eventId(t) || e;
      }

      function i(t) {
        t.params({
          id: {},
          url: {},
        }), t.overrideProperty('identifier', {
          get() {
            return r(this.params.url, this.params.id);
          },
        }), t.override('fetch', function () {
          const t = {
            lang: this.params.lang,
            event_id: this.identifier,
          };
          return s.fetch(a.eventVideo(), t);
        }), t.overrideProperty('scribeItemType', {
          get() {
            return u.LIVE_VIDEO_EVENT;
          },
        }), t.overrideProperty('name', {
          get() {
            return 'event';
          },
        }), t.before('initialize', function () {
          if (!r(this.params.url, this.params.id)) throw new Error('one of url or id is required');
        });
      }
      var o = n(24),
        s = n(260),
        a = n(137),
        u = n(107);
      t.exports = i;
    }, function (t, e, n) {
      function r(t, e) {
        return a.fetch(t, e, i).then(o, s);
      }

      function i(t) {
        return {
          success: !t.error,
          resp: t,
        };
      }

      function o(t) {
        return t.data.html;
      }

      function s(t) {
        return u.reject(t.error.detail);
      }
      var a = n(133),
        u = n(2);
      t.exports = {
        fetch: r,
      };
    }, function (t, e, n) {
      const r = n(12);
      t.exports = r.aug({}, n(262), n(264), n(265), n(266), n(267), n(268), n(269), n(270), n(271));
    }, function (t, e, n) {
      let r = n(85),
        i = n(263),
        o = i(['userId'], {}, r);
      t.exports = {
        createDMButton: o,
      };
    }, function (t, e, n) {
      function r(t, e, n) {
        let r;
        return t = t || [], e = e || {}, r = `ƒ(${t.join(', ')}, target, [options]);`,
        function () {
          let c,
            d,
            f,
            l,
            h = Array.prototype.slice.apply(arguments, [0, t.length]),
            p = Array.prototype.slice.apply(arguments, [t.length]);
          return p.forEach((t) => {
            if (t) return t.nodeType === Node.ELEMENT_NODE ? void (f = t) : u.isType('function', t) ? void (c = t) : void (u.isType('object', t) && (d = t));
          }), h.length !== t.length || p.length === 0 ? (c && u.async(() => {
            c(!1);
          }), i.reject(new Error(`Not enough parameters. Expected: ${r}`))) : f ? (d = u.aug({}, d || {}, e), t.forEach((t) => {
            d[t] = h.shift();
          }), a.asBoolean(d.dnt) && s.setOn(), l = o.addWidget(n(d, f)), c && l.then(c, () => {
              c(!1);
            }), l) : (c && u.async(() => {
            c(!1);
          }), i.reject(new Error(`No target element specified. Expected: ${r}`)));
        };
      }
      var i = n(2),
        o = n(34),
        s = n(46),
        a = n(26),
        u = n(12);
      t.exports = r;
    }, function (t, e, n) {
      let r = n(113),
        i = n(263),
        o = i(['screenName'], {}, r);
      t.exports = {
        createFollowButton: o,
      };
    }, function (t, e, n) {
      let r = n(128),
        i = n(263),
        o = i(['collectionId'], {}, r);
      t.exports = {
        createGridFromCollection: o,
      };
    }, function (t, e, n) {
      let r = n(162),
        i = n(263),
        o = i(['momentId'], {}, r);
      t.exports = {
        createMoment: o,
      };
    }, function (t, e, n) {
      let r = n(173),
        i = n(263),
        o = i(['username'], {}, r);
      t.exports = {
        createPeriscopeOnAirButton: o,
      };
    }, function (t, e, n) {
      function r(t) {
        let e,
          n = a.toRealArray(arguments).slice(1);
        return a.isObject(t) || u.isString(t) ? (t = t || {}, n.forEach((t) => {
          a.isType('object', t) && (e = t, i(e));
        }), e || (e = {}, n.push(e)), u.isString(t) && (t = a.aug({}, e, {
            sourceType: 'widget',
            widgetId: t,
          })), t.lang = e.lang, t.tweetLimit = e.tweetLimit, t.showReplies = e.showReplies, e.dataSource = c(t), e.useLegacyDefaults = e.dataSource instanceof d, h.apply(this, n)) : p.reject('data source must be a string or an object.');
      }

      function i(t) {
        t.ariaLive = t.ariaPolite;
      }
      var o = n(11),
        s = n(24),
        a = n(12),
        u = n(26),
        c = n(179),
        d = n(194),
        f = n(196),
        l = n(263),
        h = l([], {}, f),
        p = n(2),
        m = {
          createTimeline: r,
        };
      s.isTwitterURL(o.href) && (m.createTimelinePreview = function (t, e, n) {
        const r = {
          previewParams: t,
          useLegacyDefaults: !0,
          isPreviewTimeline: !0,
        };
        return r.dataSource = c(r), h(e, r, n);
      }), t.exports = m;
    }, function (t, e, n) {
      function r(t) {
        return function () {
          return i.toRealArray(arguments).slice(1).forEach((t) => {
            i.isType('object', t) && (t.hideCard = t.cards == 'none' || t.cards == 'hidden', t.hideThread = t.conversation == 'none' || t.conversation == 'hidden');
          }), t.apply(this, arguments);
        };
      }
      var i = n(12),
        o = n(224),
        s = n(263),
        a = r(s(['tweetId'], {}, o));
      t.exports = {
        createTweet: a,
        createTweetEmbed: a,
      };
    }, function (t, e, n) {
      function r(t) {
        return function () {
          return i.toRealArray(arguments).slice(1).forEach((t) => {
            i.isType('object', t) && (t.screenName = t.screenName || t.screen_name, t.buttonHashtag = t.buttonHashtag || t.button_hashtag || t.hashtag);
          }), t.apply(this, arguments);
        };
      }
      var i = n(12),
        o = n(243),
        s = n(263),
        a = s(['url'], {
          type: 'share',
        }, o),
        u = s(['buttonHashtag'], {
          type: 'hashtag',
        }, o),
        c = s(['screenName'], {
          type: 'mention',
        }, o);
      t.exports = {
        createShareButton: r(a),
        createHashtagButton: r(u),
        createMentionButton: r(c),
      };
    }, function (t, e, n) {
      function r(t) {
        let e,
          n = s.toRealArray(arguments).slice(1),
          r = t || {};
        return n.forEach((t) => {
          s.isType('object', t) && (e = t);
        }), e || (e = {}, n.push(e)), (a.isString(t) || a.isNumber(t)) && (r = {
          sourceType: 'tweet',
          id: t,
        }), r.lang = e.lang, e.dataSource = u(r), c.apply(this, n);
      }
      var i = n(248),
        o = n(263),
        s = n(12),
        a = n(26),
        u = n(253),
        c = o([], {}, i);
      t.exports = {
        createVideo: r,
      };
    }, function (t, e, n) {
      function r() {
        let t,
          e;
        for (c = 1, t = 0, e = d.length; t < e; t++) d[t]();
      }
      var i,
        o,
        s,
        a = n(9),
        u = n(7),
        c = 0,
        d = [],
        f = !1,
        l = a.createElement('a');
      /^loade|c/.test(a.readyState) && (c = 1), a.addEventListener && a.addEventListener('DOMContentLoaded', o = function () {
        a.removeEventListener('DOMContentLoaded', o, f), r();
      }, f), l.doScroll && a.attachEvent('onreadystatechange', i = function () {
        /^c/.test(a.readyState) && (a.detachEvent('onreadystatechange', i), r());
      }), s = l.doScroll ? function (t) {
        u.self != u.top ? c ? t() : d.push(t) : !(function () {
          try {
            l.doScroll('left');
          } catch (e) {
            return setTimeout(() => {
              s(t);
            }, 50);
          }
          t();
        }());
      } : function (t) {
        c ? t() : d.push(t);
      }, t.exports = s;
    }, function (t, e, n) {
      let r = n(52),
        i = n(18);
      t.exports = function () {
        i.set('buildVersion', r.version);
      };
    }, function (t, e, n) {
      n(275), n(239), n(279);
    }, function (t, e, n) {
      let r = n(276),
        i = n(240),
        o = n(278),
        s = new r();
      i.emitter.bind(i.START, () => {
        s.start();
      }), i.emitter.bind(i.ALL_WIDGETS_RENDERED, () => {
        s.end(), o(s.duration(), {
          action: 'render',
        });
      });
    }, function (t, e, n) {
      function r() {}
      const i = n(277);
      r.prototype.start = function () {
        this._startTime = i();
      }, r.prototype.end = function () {
        this._duration = i() - this._startTime;
      }, r.prototype.duration = function () {
        return this._duration;
      }, t.exports = r;
    }, function (t, e, n) {
      const r = n(7);
      t.exports = function () {
        return r.performance && r.performance.now ? r.performance.now() : Date.now();
      };
    }, function (t, e, n) {
      let r = n(42),
        i = n(47),
        o = n(12);
      t.exports = function (t, e) {
        let n = {
            widget_origin: i.rootDocumentLocation(),
            widget_frame: i.isFramed() ? i.currentDocumentLocation() : null,
            duration_ms: t,
          },
          s = o.aug(e, {
            page: 'page',
            component: 'performance',
          });
        r.scribe(s, n);
      };
    }, function (t, e, n) {
      function r(t, e, n) {
        const r = Object.keys(t).reduce((e, r) => (n(r) ? e + t[r] : e), 0);
        a(r, {
          element: e,
          action: 'resource',
        });
      }

      function i(t) {
        return t.performance.getEntriesByType('resource').filter(t => c.isTwimgURL(t.name) || c.isTwitterURL(t.name)).reduce((t, e) => t[e.name] = e.duration, t, {});
      }

      function o(t) {
        return t.reduce((t, e) => f.aug(t, i(e.contentDocument.defaultView)), {});
      }
      var s = n(240),
        a = n(278),
        u = n(280),
        c = n(24),
        d = n(7),
        f = n(12),
        l = n(8),
        h = n(109);
      s.emitter.bind(s.ALL_WIDGETS_AND_IMAGES_LOADED, (t) => {
        let e,
          n,
          s = [];
        l.hasPerformanceInformation() && (e = i(d), h.isSupported() || (s = o(t)), n = f.aug({}, e, s), Object.keys(u).forEach((t) => {
          r(n, t, u[t]);
        }));
      });
    }, function (t, e, n) {
      let r = n(24),
        i = {
          all() {
            return !0;
          },
          image(t) {
            return r.isTwimgURL(t);
          },
          settings(t) {
            return r.isSettingsURL(t);
          },
          widget_iframe(t) {
            return r.isWidgetIframeURL(t);
          },
        };
      t.exports = i;
    }]))));
}());
