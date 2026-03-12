function tN(e, t) {
  for (var n = 0; n < t.length; n++) {
    const a = t[n];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const u in a)
        if (u !== "default" && !(u in e)) {
          const o = Object.getOwnPropertyDescriptor(a, u);
          o &&
            Object.defineProperty(
              e,
              u,
              o.get ? o : { enumerable: !0, get: () => a[u] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const u of document.querySelectorAll('link[rel="modulepreload"]')) a(u);
  new MutationObserver((u) => {
    for (const o of u)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(u) {
    const o = {};
    return (
      u.integrity && (o.integrity = u.integrity),
      u.referrerPolicy && (o.referrerPolicy = u.referrerPolicy),
      u.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : u.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function a(u) {
    if (u.ep) return;
    u.ep = !0;
    const o = n(u);
    fetch(u.href, o);
  }
})();
function Pa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var ph = { exports: {} },
  Nu = {};
var Ex;
function nN() {
  if (Ex) return Nu;
  Ex = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.fragment");
  function n(a, u, o) {
    var s = null;
    if (
      (o !== void 0 && (s = "" + o),
      u.key !== void 0 && (s = "" + u.key),
      "key" in u)
    ) {
      o = {};
      for (var f in u) f !== "key" && (o[f] = u[f]);
    } else o = u;
    return (
      (u = o.ref),
      { $$typeof: e, type: a, key: s, ref: u !== void 0 ? u : null, props: o }
    );
  }
  return ((Nu.Fragment = t), (Nu.jsx = n), (Nu.jsxs = n), Nu);
}
var jx;
function rN() {
  return (jx || ((jx = 1), (ph.exports = nN())), ph.exports);
}
var j = rN(),
  gh = { exports: {} },
  be = {};
var Tx;
function aN() {
  if (Tx) return be;
  Tx = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    u = Symbol.for("react.profiler"),
    o = Symbol.for("react.consumer"),
    s = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    d = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    m = Symbol.for("react.lazy"),
    p = Symbol.for("react.activity"),
    g = Symbol.iterator;
  function b(P) {
    return P === null || typeof P != "object"
      ? null
      : ((P = (g && P[g]) || P["@@iterator"]),
        typeof P == "function" ? P : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    _ = Object.assign,
    O = {};
  function E(P, G, te) {
    ((this.props = P),
      (this.context = G),
      (this.refs = O),
      (this.updater = te || S));
  }
  ((E.prototype.isReactComponent = {}),
    (E.prototype.setState = function (P, G) {
      if (typeof P != "object" && typeof P != "function" && P != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, P, G, "setState");
    }),
    (E.prototype.forceUpdate = function (P) {
      this.updater.enqueueForceUpdate(this, P, "forceUpdate");
    }));
  function C() {}
  C.prototype = E.prototype;
  function T(P, G, te) {
    ((this.props = P),
      (this.context = G),
      (this.refs = O),
      (this.updater = te || S));
  }
  var D = (T.prototype = new C());
  ((D.constructor = T), _(D, E.prototype), (D.isPureReactComponent = !0));
  var M = Array.isArray;
  function z() {}
  var U = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty;
  function F(P, G, te) {
    var ie = te.ref;
    return {
      $$typeof: e,
      type: P,
      key: G,
      ref: ie !== void 0 ? ie : null,
      props: te,
    };
  }
  function ae(P, G) {
    return F(P.type, G, P.props);
  }
  function ne(P) {
    return typeof P == "object" && P !== null && P.$$typeof === e;
  }
  function K(P) {
    var G = { "=": "=0", ":": "=2" };
    return (
      "$" +
      P.replace(/[=:]/g, function (te) {
        return G[te];
      })
    );
  }
  var q = /\/+/g;
  function re(P, G) {
    return typeof P == "object" && P !== null && P.key != null
      ? K("" + P.key)
      : G.toString(36);
  }
  function ce(P) {
    switch (P.status) {
      case "fulfilled":
        return P.value;
      case "rejected":
        throw P.reason;
      default:
        switch (
          (typeof P.status == "string"
            ? P.then(z, z)
            : ((P.status = "pending"),
              P.then(
                function (G) {
                  P.status === "pending" &&
                    ((P.status = "fulfilled"), (P.value = G));
                },
                function (G) {
                  P.status === "pending" &&
                    ((P.status = "rejected"), (P.reason = G));
                },
              )),
          P.status)
        ) {
          case "fulfilled":
            return P.value;
          case "rejected":
            throw P.reason;
        }
    }
    throw P;
  }
  function L(P, G, te, ie, pe) {
    var xe = typeof P;
    (xe === "undefined" || xe === "boolean") && (P = null);
    var Ee = !1;
    if (P === null) Ee = !0;
    else
      switch (xe) {
        case "bigint":
        case "string":
        case "number":
          Ee = !0;
          break;
        case "object":
          switch (P.$$typeof) {
            case e:
            case t:
              Ee = !0;
              break;
            case m:
              return ((Ee = P._init), L(Ee(P._payload), G, te, ie, pe));
          }
      }
    if (Ee)
      return (
        (pe = pe(P)),
        (Ee = ie === "" ? "." + re(P, 0) : ie),
        M(pe)
          ? ((te = ""),
            Ee != null && (te = Ee.replace(q, "$&/") + "/"),
            L(pe, G, te, "", function (le) {
              return le;
            }))
          : pe != null &&
            (ne(pe) &&
              (pe = ae(
                pe,
                te +
                  (pe.key == null || (P && P.key === pe.key)
                    ? ""
                    : ("" + pe.key).replace(q, "$&/") + "/") +
                  Ee,
              )),
            G.push(pe)),
        1
      );
    Ee = 0;
    var Ue = ie === "" ? "." : ie + ":";
    if (M(P))
      for (var ee = 0; ee < P.length; ee++)
        ((ie = P[ee]), (xe = Ue + re(ie, ee)), (Ee += L(ie, G, te, xe, pe)));
    else if (((ee = b(P)), typeof ee == "function"))
      for (P = ee.call(P), ee = 0; !(ie = P.next()).done; )
        ((ie = ie.value),
          (xe = Ue + re(ie, ee++)),
          (Ee += L(ie, G, te, xe, pe)));
    else if (xe === "object") {
      if (typeof P.then == "function") return L(ce(P), G, te, ie, pe);
      throw (
        (G = String(P)),
        Error(
          "Objects are not valid as a React child (found: " +
            (G === "[object Object]"
              ? "object with keys {" + Object.keys(P).join(", ") + "}"
              : G) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return Ee;
  }
  function W(P, G, te) {
    if (P == null) return P;
    var ie = [],
      pe = 0;
    return (
      L(P, ie, "", "", function (xe) {
        return G.call(te, xe, pe++);
      }),
      ie
    );
  }
  function ue(P) {
    if (P._status === -1) {
      var G = P._result;
      ((G = G()),
        G.then(
          function (te) {
            (P._status === 0 || P._status === -1) &&
              ((P._status = 1), (P._result = te));
          },
          function (te) {
            (P._status === 0 || P._status === -1) &&
              ((P._status = 2), (P._result = te));
          },
        ),
        P._status === -1 && ((P._status = 0), (P._result = G)));
    }
    if (P._status === 1) return P._result.default;
    throw P._result;
  }
  var oe =
      typeof reportError == "function"
        ? reportError
        : function (P) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var G = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof P == "object" &&
                  P !== null &&
                  typeof P.message == "string"
                    ? String(P.message)
                    : String(P),
                error: P,
              });
              if (!window.dispatchEvent(G)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", P);
              return;
            }
            console.error(P);
          },
    he = {
      map: W,
      forEach: function (P, G, te) {
        W(
          P,
          function () {
            G.apply(this, arguments);
          },
          te,
        );
      },
      count: function (P) {
        var G = 0;
        return (
          W(P, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (P) {
        return (
          W(P, function (G) {
            return G;
          }) || []
        );
      },
      only: function (P) {
        if (!ne(P))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return P;
      },
    };
  return (
    (be.Activity = p),
    (be.Children = he),
    (be.Component = E),
    (be.Fragment = n),
    (be.Profiler = u),
    (be.PureComponent = T),
    (be.StrictMode = a),
    (be.Suspense = d),
    (be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U),
    (be.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (P) {
        return U.H.useMemoCache(P);
      },
    }),
    (be.cache = function (P) {
      return function () {
        return P.apply(null, arguments);
      };
    }),
    (be.cacheSignal = function () {
      return null;
    }),
    (be.cloneElement = function (P, G, te) {
      if (P == null)
        throw Error(
          "The argument must be a React element, but you passed " + P + ".",
        );
      var ie = _({}, P.props),
        pe = P.key;
      if (G != null)
        for (xe in (G.key !== void 0 && (pe = "" + G.key), G))
          !V.call(G, xe) ||
            xe === "key" ||
            xe === "__self" ||
            xe === "__source" ||
            (xe === "ref" && G.ref === void 0) ||
            (ie[xe] = G[xe]);
      var xe = arguments.length - 2;
      if (xe === 1) ie.children = te;
      else if (1 < xe) {
        for (var Ee = Array(xe), Ue = 0; Ue < xe; Ue++)
          Ee[Ue] = arguments[Ue + 2];
        ie.children = Ee;
      }
      return F(P.type, pe, ie);
    }),
    (be.createContext = function (P) {
      return (
        (P = {
          $$typeof: s,
          _currentValue: P,
          _currentValue2: P,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (P.Provider = P),
        (P.Consumer = { $$typeof: o, _context: P }),
        P
      );
    }),
    (be.createElement = function (P, G, te) {
      var ie,
        pe = {},
        xe = null;
      if (G != null)
        for (ie in (G.key !== void 0 && (xe = "" + G.key), G))
          V.call(G, ie) &&
            ie !== "key" &&
            ie !== "__self" &&
            ie !== "__source" &&
            (pe[ie] = G[ie]);
      var Ee = arguments.length - 2;
      if (Ee === 1) pe.children = te;
      else if (1 < Ee) {
        for (var Ue = Array(Ee), ee = 0; ee < Ee; ee++)
          Ue[ee] = arguments[ee + 2];
        pe.children = Ue;
      }
      if (P && P.defaultProps)
        for (ie in ((Ee = P.defaultProps), Ee))
          pe[ie] === void 0 && (pe[ie] = Ee[ie]);
      return F(P, xe, pe);
    }),
    (be.createRef = function () {
      return { current: null };
    }),
    (be.forwardRef = function (P) {
      return { $$typeof: f, render: P };
    }),
    (be.isValidElement = ne),
    (be.lazy = function (P) {
      return { $$typeof: m, _payload: { _status: -1, _result: P }, _init: ue };
    }),
    (be.memo = function (P, G) {
      return { $$typeof: h, type: P, compare: G === void 0 ? null : G };
    }),
    (be.startTransition = function (P) {
      var G = U.T,
        te = {};
      U.T = te;
      try {
        var ie = P(),
          pe = U.S;
        (pe !== null && pe(te, ie),
          typeof ie == "object" &&
            ie !== null &&
            typeof ie.then == "function" &&
            ie.then(z, oe));
      } catch (xe) {
        oe(xe);
      } finally {
        (G !== null && te.types !== null && (G.types = te.types), (U.T = G));
      }
    }),
    (be.unstable_useCacheRefresh = function () {
      return U.H.useCacheRefresh();
    }),
    (be.use = function (P) {
      return U.H.use(P);
    }),
    (be.useActionState = function (P, G, te) {
      return U.H.useActionState(P, G, te);
    }),
    (be.useCallback = function (P, G) {
      return U.H.useCallback(P, G);
    }),
    (be.useContext = function (P) {
      return U.H.useContext(P);
    }),
    (be.useDebugValue = function () {}),
    (be.useDeferredValue = function (P, G) {
      return U.H.useDeferredValue(P, G);
    }),
    (be.useEffect = function (P, G) {
      return U.H.useEffect(P, G);
    }),
    (be.useEffectEvent = function (P) {
      return U.H.useEffectEvent(P);
    }),
    (be.useId = function () {
      return U.H.useId();
    }),
    (be.useImperativeHandle = function (P, G, te) {
      return U.H.useImperativeHandle(P, G, te);
    }),
    (be.useInsertionEffect = function (P, G) {
      return U.H.useInsertionEffect(P, G);
    }),
    (be.useLayoutEffect = function (P, G) {
      return U.H.useLayoutEffect(P, G);
    }),
    (be.useMemo = function (P, G) {
      return U.H.useMemo(P, G);
    }),
    (be.useOptimistic = function (P, G) {
      return U.H.useOptimistic(P, G);
    }),
    (be.useReducer = function (P, G, te) {
      return U.H.useReducer(P, G, te);
    }),
    (be.useRef = function (P) {
      return U.H.useRef(P);
    }),
    (be.useState = function (P) {
      return U.H.useState(P);
    }),
    (be.useSyncExternalStore = function (P, G, te) {
      return U.H.useSyncExternalStore(P, G, te);
    }),
    (be.useTransition = function () {
      return U.H.useTransition();
    }),
    (be.version = "19.2.4"),
    be
  );
}
var Mx;
function Tl() {
  return (Mx || ((Mx = 1), (gh.exports = aN())), gh.exports);
}
var w = Tl();
const iN = Pa(w),
  lN = tN({ __proto__: null, default: iN }, [w]);
var bh = { exports: {} },
  Pu = {},
  xh = { exports: {} },
  Sh = {};
var Cx;
function uN() {
  return (
    Cx ||
      ((Cx = 1),
      (function (e) {
        function t(L, W) {
          var ue = L.length;
          L.push(W);
          e: for (; 0 < ue; ) {
            var oe = (ue - 1) >>> 1,
              he = L[oe];
            if (0 < u(he, W)) ((L[oe] = W), (L[ue] = he), (ue = oe));
            else break e;
          }
        }
        function n(L) {
          return L.length === 0 ? null : L[0];
        }
        function a(L) {
          if (L.length === 0) return null;
          var W = L[0],
            ue = L.pop();
          if (ue !== W) {
            L[0] = ue;
            e: for (var oe = 0, he = L.length, P = he >>> 1; oe < P; ) {
              var G = 2 * (oe + 1) - 1,
                te = L[G],
                ie = G + 1,
                pe = L[ie];
              if (0 > u(te, ue))
                ie < he && 0 > u(pe, te)
                  ? ((L[oe] = pe), (L[ie] = ue), (oe = ie))
                  : ((L[oe] = te), (L[G] = ue), (oe = G));
              else if (ie < he && 0 > u(pe, ue))
                ((L[oe] = pe), (L[ie] = ue), (oe = ie));
              else break e;
            }
          }
          return W;
        }
        function u(L, W) {
          var ue = L.sortIndex - W.sortIndex;
          return ue !== 0 ? ue : L.id - W.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var o = performance;
          e.unstable_now = function () {
            return o.now();
          };
        } else {
          var s = Date,
            f = s.now();
          e.unstable_now = function () {
            return s.now() - f;
          };
        }
        var d = [],
          h = [],
          m = 1,
          p = null,
          g = 3,
          b = !1,
          S = !1,
          _ = !1,
          O = !1,
          E = typeof setTimeout == "function" ? setTimeout : null,
          C = typeof clearTimeout == "function" ? clearTimeout : null,
          T = typeof setImmediate < "u" ? setImmediate : null;
        function D(L) {
          for (var W = n(h); W !== null; ) {
            if (W.callback === null) a(h);
            else if (W.startTime <= L)
              (a(h), (W.sortIndex = W.expirationTime), t(d, W));
            else break;
            W = n(h);
          }
        }
        function M(L) {
          if (((_ = !1), D(L), !S))
            if (n(d) !== null) ((S = !0), z || ((z = !0), K()));
            else {
              var W = n(h);
              W !== null && ce(M, W.startTime - L);
            }
        }
        var z = !1,
          U = -1,
          V = 5,
          F = -1;
        function ae() {
          return O ? !0 : !(e.unstable_now() - F < V);
        }
        function ne() {
          if (((O = !1), z)) {
            var L = e.unstable_now();
            F = L;
            var W = !0;
            try {
              e: {
                ((S = !1), _ && ((_ = !1), C(U), (U = -1)), (b = !0));
                var ue = g;
                try {
                  t: {
                    for (
                      D(L), p = n(d);
                      p !== null && !(p.expirationTime > L && ae());
                    ) {
                      var oe = p.callback;
                      if (typeof oe == "function") {
                        ((p.callback = null), (g = p.priorityLevel));
                        var he = oe(p.expirationTime <= L);
                        if (((L = e.unstable_now()), typeof he == "function")) {
                          ((p.callback = he), D(L), (W = !0));
                          break t;
                        }
                        (p === n(d) && a(d), D(L));
                      } else a(d);
                      p = n(d);
                    }
                    if (p !== null) W = !0;
                    else {
                      var P = n(h);
                      (P !== null && ce(M, P.startTime - L), (W = !1));
                    }
                  }
                  break e;
                } finally {
                  ((p = null), (g = ue), (b = !1));
                }
                W = void 0;
              }
            } finally {
              W ? K() : (z = !1);
            }
          }
        }
        var K;
        if (typeof T == "function")
          K = function () {
            T(ne);
          };
        else if (typeof MessageChannel < "u") {
          var q = new MessageChannel(),
            re = q.port2;
          ((q.port1.onmessage = ne),
            (K = function () {
              re.postMessage(null);
            }));
        } else
          K = function () {
            E(ne, 0);
          };
        function ce(L, W) {
          U = E(function () {
            L(e.unstable_now());
          }, W);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (L) {
            L.callback = null;
          }),
          (e.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (V = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return g;
          }),
          (e.unstable_next = function (L) {
            switch (g) {
              case 1:
              case 2:
              case 3:
                var W = 3;
                break;
              default:
                W = g;
            }
            var ue = g;
            g = W;
            try {
              return L();
            } finally {
              g = ue;
            }
          }),
          (e.unstable_requestPaint = function () {
            O = !0;
          }),
          (e.unstable_runWithPriority = function (L, W) {
            switch (L) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                L = 3;
            }
            var ue = g;
            g = L;
            try {
              return W();
            } finally {
              g = ue;
            }
          }),
          (e.unstable_scheduleCallback = function (L, W, ue) {
            var oe = e.unstable_now();
            switch (
              (typeof ue == "object" && ue !== null
                ? ((ue = ue.delay),
                  (ue = typeof ue == "number" && 0 < ue ? oe + ue : oe))
                : (ue = oe),
              L)
            ) {
              case 1:
                var he = -1;
                break;
              case 2:
                he = 250;
                break;
              case 5:
                he = 1073741823;
                break;
              case 4:
                he = 1e4;
                break;
              default:
                he = 5e3;
            }
            return (
              (he = ue + he),
              (L = {
                id: m++,
                callback: W,
                priorityLevel: L,
                startTime: ue,
                expirationTime: he,
                sortIndex: -1,
              }),
              ue > oe
                ? ((L.sortIndex = ue),
                  t(h, L),
                  n(d) === null &&
                    L === n(h) &&
                    (_ ? (C(U), (U = -1)) : (_ = !0), ce(M, ue - oe)))
                : ((L.sortIndex = he),
                  t(d, L),
                  S || b || ((S = !0), z || ((z = !0), K()))),
              L
            );
          }),
          (e.unstable_shouldYield = ae),
          (e.unstable_wrapCallback = function (L) {
            var W = g;
            return function () {
              var ue = g;
              g = W;
              try {
                return L.apply(this, arguments);
              } finally {
                g = ue;
              }
            };
          }));
      })(Sh)),
    Sh
  );
}
var Dx;
function oN() {
  return (Dx || ((Dx = 1), (xh.exports = uN())), xh.exports);
}
var wh = { exports: {} },
  Ht = {};
var Nx;
function cN() {
  if (Nx) return Ht;
  Nx = 1;
  var e = Tl();
  function t(d) {
    var h = "https://react.dev/errors/" + d;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var m = 2; m < arguments.length; m++)
        h += "&args[]=" + encodeURIComponent(arguments[m]);
    }
    return (
      "Minified React error #" +
      d +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function n() {}
  var a = {
      d: {
        f: n,
        r: function () {
          throw Error(t(522));
        },
        D: n,
        C: n,
        L: n,
        m: n,
        X: n,
        S: n,
        M: n,
      },
      p: 0,
      findDOMNode: null,
    },
    u = Symbol.for("react.portal");
  function o(d, h, m) {
    var p =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: u,
      key: p == null ? null : "" + p,
      children: d,
      containerInfo: h,
      implementation: m,
    };
  }
  var s = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(d, h) {
    if (d === "font") return "";
    if (typeof h == "string") return h === "use-credentials" ? h : "";
  }
  return (
    (Ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a),
    (Ht.createPortal = function (d, h) {
      var m =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(t(299));
      return o(d, h, null, m);
    }),
    (Ht.flushSync = function (d) {
      var h = s.T,
        m = a.p;
      try {
        if (((s.T = null), (a.p = 2), d)) return d();
      } finally {
        ((s.T = h), (a.p = m), a.d.f());
      }
    }),
    (Ht.preconnect = function (d, h) {
      typeof d == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        a.d.C(d, h));
    }),
    (Ht.prefetchDNS = function (d) {
      typeof d == "string" && a.d.D(d);
    }),
    (Ht.preinit = function (d, h) {
      if (typeof d == "string" && h && typeof h.as == "string") {
        var m = h.as,
          p = f(m, h.crossOrigin),
          g = typeof h.integrity == "string" ? h.integrity : void 0,
          b = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        m === "style"
          ? a.d.S(d, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: p,
              integrity: g,
              fetchPriority: b,
            })
          : m === "script" &&
            a.d.X(d, {
              crossOrigin: p,
              integrity: g,
              fetchPriority: b,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
      }
    }),
    (Ht.preinitModule = function (d, h) {
      if (typeof d == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var m = f(h.as, h.crossOrigin);
            a.d.M(d, {
              crossOrigin: m,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
          }
        } else h == null && a.d.M(d);
    }),
    (Ht.preload = function (d, h) {
      if (
        typeof d == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var m = h.as,
          p = f(m, h.crossOrigin);
        a.d.L(d, m, {
          crossOrigin: p,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        });
      }
    }),
    (Ht.preloadModule = function (d, h) {
      if (typeof d == "string")
        if (h) {
          var m = f(h.as, h.crossOrigin);
          a.d.m(d, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: m,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          });
        } else a.d.m(d);
    }),
    (Ht.requestFormReset = function (d) {
      a.d.r(d);
    }),
    (Ht.unstable_batchedUpdates = function (d, h) {
      return d(h);
    }),
    (Ht.useFormState = function (d, h, m) {
      return s.H.useFormState(d, h, m);
    }),
    (Ht.useFormStatus = function () {
      return s.H.useHostTransitionStatus();
    }),
    (Ht.version = "19.2.4"),
    Ht
  );
}
var Px;
function SA() {
  if (Px) return wh.exports;
  Px = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return (e(), (wh.exports = cN()), wh.exports);
}
var zx;
function sN() {
  if (zx) return Pu;
  zx = 1;
  var e = oN(),
    t = Tl(),
    n = SA();
  function a(r) {
    var i = "https://react.dev/errors/" + r;
    if (1 < arguments.length) {
      i += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        i += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      r +
      "; visit " +
      i +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function u(r) {
    return !(!r || (r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11));
  }
  function o(r) {
    var i = r,
      l = r;
    if (r.alternate) for (; i.return; ) i = i.return;
    else {
      r = i;
      do ((i = r), (i.flags & 4098) !== 0 && (l = i.return), (r = i.return));
      while (r);
    }
    return i.tag === 3 ? l : null;
  }
  function s(r) {
    if (r.tag === 13) {
      var i = r.memoizedState;
      if (
        (i === null && ((r = r.alternate), r !== null && (i = r.memoizedState)),
        i !== null)
      )
        return i.dehydrated;
    }
    return null;
  }
  function f(r) {
    if (r.tag === 31) {
      var i = r.memoizedState;
      if (
        (i === null && ((r = r.alternate), r !== null && (i = r.memoizedState)),
        i !== null)
      )
        return i.dehydrated;
    }
    return null;
  }
  function d(r) {
    if (o(r) !== r) throw Error(a(188));
  }
  function h(r) {
    var i = r.alternate;
    if (!i) {
      if (((i = o(r)), i === null)) throw Error(a(188));
      return i !== r ? null : r;
    }
    for (var l = r, c = i; ; ) {
      var v = l.return;
      if (v === null) break;
      var y = v.alternate;
      if (y === null) {
        if (((c = v.return), c !== null)) {
          l = c;
          continue;
        }
        break;
      }
      if (v.child === y.child) {
        for (y = v.child; y; ) {
          if (y === l) return (d(v), r);
          if (y === c) return (d(v), i);
          y = y.sibling;
        }
        throw Error(a(188));
      }
      if (l.return !== c.return) ((l = v), (c = y));
      else {
        for (var x = !1, A = v.child; A; ) {
          if (A === l) {
            ((x = !0), (l = v), (c = y));
            break;
          }
          if (A === c) {
            ((x = !0), (c = v), (l = y));
            break;
          }
          A = A.sibling;
        }
        if (!x) {
          for (A = y.child; A; ) {
            if (A === l) {
              ((x = !0), (l = y), (c = v));
              break;
            }
            if (A === c) {
              ((x = !0), (c = y), (l = v));
              break;
            }
            A = A.sibling;
          }
          if (!x) throw Error(a(189));
        }
      }
      if (l.alternate !== c) throw Error(a(190));
    }
    if (l.tag !== 3) throw Error(a(188));
    return l.stateNode.current === l ? r : i;
  }
  function m(r) {
    var i = r.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return r;
    for (r = r.child; r !== null; ) {
      if (((i = m(r)), i !== null)) return i;
      r = r.sibling;
    }
    return null;
  }
  var p = Object.assign,
    g = Symbol.for("react.element"),
    b = Symbol.for("react.transitional.element"),
    S = Symbol.for("react.portal"),
    _ = Symbol.for("react.fragment"),
    O = Symbol.for("react.strict_mode"),
    E = Symbol.for("react.profiler"),
    C = Symbol.for("react.consumer"),
    T = Symbol.for("react.context"),
    D = Symbol.for("react.forward_ref"),
    M = Symbol.for("react.suspense"),
    z = Symbol.for("react.suspense_list"),
    U = Symbol.for("react.memo"),
    V = Symbol.for("react.lazy"),
    F = Symbol.for("react.activity"),
    ae = Symbol.for("react.memo_cache_sentinel"),
    ne = Symbol.iterator;
  function K(r) {
    return r === null || typeof r != "object"
      ? null
      : ((r = (ne && r[ne]) || r["@@iterator"]),
        typeof r == "function" ? r : null);
  }
  var q = Symbol.for("react.client.reference");
  function re(r) {
    if (r == null) return null;
    if (typeof r == "function")
      return r.$$typeof === q ? null : r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case _:
        return "Fragment";
      case E:
        return "Profiler";
      case O:
        return "StrictMode";
      case M:
        return "Suspense";
      case z:
        return "SuspenseList";
      case F:
        return "Activity";
    }
    if (typeof r == "object")
      switch (r.$$typeof) {
        case S:
          return "Portal";
        case T:
          return r.displayName || "Context";
        case C:
          return (r._context.displayName || "Context") + ".Consumer";
        case D:
          var i = r.render;
          return (
            (r = r.displayName),
            r ||
              ((r = i.displayName || i.name || ""),
              (r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")),
            r
          );
        case U:
          return (
            (i = r.displayName || null),
            i !== null ? i : re(r.type) || "Memo"
          );
        case V:
          ((i = r._payload), (r = r._init));
          try {
            return re(r(i));
          } catch {}
      }
    return null;
  }
  var ce = Array.isArray,
    L = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ue = { pending: !1, data: null, method: null, action: null },
    oe = [],
    he = -1;
  function P(r) {
    return { current: r };
  }
  function G(r) {
    0 > he || ((r.current = oe[he]), (oe[he] = null), he--);
  }
  function te(r, i) {
    (he++, (oe[he] = r.current), (r.current = i));
  }
  var ie = P(null),
    pe = P(null),
    xe = P(null),
    Ee = P(null);
  function Ue(r, i) {
    switch ((te(xe, i), te(pe, r), te(ie, null), i.nodeType)) {
      case 9:
      case 11:
        r = (r = i.documentElement) && (r = r.namespaceURI) ? Z1(r) : 0;
        break;
      default:
        if (((r = i.tagName), (i = i.namespaceURI)))
          ((i = Z1(i)), (r = Q1(i, r)));
        else
          switch (r) {
            case "svg":
              r = 1;
              break;
            case "math":
              r = 2;
              break;
            default:
              r = 0;
          }
    }
    (G(ie), te(ie, r));
  }
  function ee() {
    (G(ie), G(pe), G(xe));
  }
  function le(r) {
    r.memoizedState !== null && te(Ee, r);
    var i = ie.current,
      l = Q1(i, r.type);
    i !== l && (te(pe, r), te(ie, l));
  }
  function Oe(r) {
    (pe.current === r && (G(ie), G(pe)),
      Ee.current === r && (G(Ee), (Tu._currentValue = ue)));
  }
  var J, jt;
  function De(r) {
    if (J === void 0)
      try {
        throw Error();
      } catch (l) {
        var i = l.stack.trim().match(/\n( *(at )?)/);
        ((J = (i && i[1]) || ""),
          (jt =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      J +
      r +
      jt
    );
  }
  var Tt = !1;
  function Mt(r, i) {
    if (!r || Tt) return "";
    Tt = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function () {
          try {
            if (i) {
              var Q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Q.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Q, []);
                } catch (Y) {
                  var I = Y;
                }
                Reflect.construct(r, [], Q);
              } else {
                try {
                  Q.call();
                } catch (Y) {
                  I = Y;
                }
                r.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                I = Y;
              }
              (Q = r()) &&
                typeof Q.catch == "function" &&
                Q.catch(function () {});
            }
          } catch (Y) {
            if (Y && I && typeof Y.stack == "string") return [Y.stack, I.stack];
          }
          return [null, null];
        },
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var v = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name",
      );
      v &&
        v.configurable &&
        Object.defineProperty(c.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var y = c.DetermineComponentFrameRoot(),
        x = y[0],
        A = y[1];
      if (x && A) {
        var N = x.split(`
`),
          H = A.split(`
`);
        for (
          v = c = 0;
          c < N.length && !N[c].includes("DetermineComponentFrameRoot");
        )
          c++;
        for (; v < H.length && !H[v].includes("DetermineComponentFrameRoot"); )
          v++;
        if (c === N.length || v === H.length)
          for (
            c = N.length - 1, v = H.length - 1;
            1 <= c && 0 <= v && N[c] !== H[v];
          )
            v--;
        for (; 1 <= c && 0 <= v; c--, v--)
          if (N[c] !== H[v]) {
            if (c !== 1 || v !== 1)
              do
                if ((c--, v--, 0 > v || N[c] !== H[v])) {
                  var X =
                    `
` + N[c].replace(" at new ", " at ");
                  return (
                    r.displayName &&
                      X.includes("<anonymous>") &&
                      (X = X.replace("<anonymous>", r.displayName)),
                    X
                  );
                }
              while (1 <= c && 0 <= v);
            break;
          }
      }
    } finally {
      ((Tt = !1), (Error.prepareStackTrace = l));
    }
    return (l = r ? r.displayName || r.name : "") ? De(l) : "";
  }
  function hr(r, i) {
    switch (r.tag) {
      case 26:
      case 27:
      case 5:
        return De(r.type);
      case 16:
        return De("Lazy");
      case 13:
        return r.child !== i && i !== null
          ? De("Suspense Fallback")
          : De("Suspense");
      case 19:
        return De("SuspenseList");
      case 0:
      case 15:
        return Mt(r.type, !1);
      case 11:
        return Mt(r.type.render, !1);
      case 1:
        return Mt(r.type, !0);
      case 31:
        return De("Activity");
      default:
        return "";
    }
  }
  function ql(r) {
    try {
      var i = "",
        l = null;
      do ((i += hr(r, l)), (l = r), (r = r.return));
      while (r);
      return i;
    } catch (c) {
      return (
        `
Error generating stack: ` +
        c.message +
        `
` +
        c.stack
      );
    }
  }
  var nd = Object.prototype.hasOwnProperty,
    rd = e.unstable_scheduleCallback,
    ad = e.unstable_cancelCallback,
    PM = e.unstable_shouldYield,
    zM = e.unstable_requestPaint,
    fn = e.unstable_now,
    kM = e.unstable_getCurrentPriorityLevel,
    jg = e.unstable_ImmediatePriority,
    Tg = e.unstable_UserBlockingPriority,
    No = e.unstable_NormalPriority,
    RM = e.unstable_LowPriority,
    Mg = e.unstable_IdlePriority,
    LM = e.log,
    UM = e.unstable_setDisableYieldValue,
    Bl = null,
    dn = null;
  function ea(r) {
    if (
      (typeof LM == "function" && UM(r),
      dn && typeof dn.setStrictMode == "function")
    )
      try {
        dn.setStrictMode(Bl, r);
      } catch {}
  }
  var vn = Math.clz32 ? Math.clz32 : HM,
    qM = Math.log,
    BM = Math.LN2;
  function HM(r) {
    return ((r >>>= 0), r === 0 ? 32 : (31 - ((qM(r) / BM) | 0)) | 0);
  }
  var Po = 256,
    zo = 262144,
    ko = 4194304;
  function La(r) {
    var i = r & 42;
    if (i !== 0) return i;
    switch (r & -r) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return r & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return r & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return r;
    }
  }
  function Ro(r, i, l) {
    var c = r.pendingLanes;
    if (c === 0) return 0;
    var v = 0,
      y = r.suspendedLanes,
      x = r.pingedLanes;
    r = r.warmLanes;
    var A = c & 134217727;
    return (
      A !== 0
        ? ((c = A & ~y),
          c !== 0
            ? (v = La(c))
            : ((x &= A),
              x !== 0
                ? (v = La(x))
                : l || ((l = A & ~r), l !== 0 && (v = La(l)))))
        : ((A = c & ~y),
          A !== 0
            ? (v = La(A))
            : x !== 0
              ? (v = La(x))
              : l || ((l = c & ~r), l !== 0 && (v = La(l)))),
      v === 0
        ? 0
        : i !== 0 &&
            i !== v &&
            (i & y) === 0 &&
            ((y = v & -v),
            (l = i & -i),
            y >= l || (y === 32 && (l & 4194048) !== 0))
          ? i
          : v
    );
  }
  function Hl(r, i) {
    return (r.pendingLanes & ~(r.suspendedLanes & ~r.pingedLanes) & i) === 0;
  }
  function IM(r, i) {
    switch (r) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return i + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Cg() {
    var r = ko;
    return ((ko <<= 1), (ko & 62914560) === 0 && (ko = 4194304), r);
  }
  function id(r) {
    for (var i = [], l = 0; 31 > l; l++) i.push(r);
    return i;
  }
  function Il(r, i) {
    ((r.pendingLanes |= i),
      i !== 268435456 &&
        ((r.suspendedLanes = 0), (r.pingedLanes = 0), (r.warmLanes = 0)));
  }
  function $M(r, i, l, c, v, y) {
    var x = r.pendingLanes;
    ((r.pendingLanes = l),
      (r.suspendedLanes = 0),
      (r.pingedLanes = 0),
      (r.warmLanes = 0),
      (r.expiredLanes &= l),
      (r.entangledLanes &= l),
      (r.errorRecoveryDisabledLanes &= l),
      (r.shellSuspendCounter = 0));
    var A = r.entanglements,
      N = r.expirationTimes,
      H = r.hiddenUpdates;
    for (l = x & ~l; 0 < l; ) {
      var X = 31 - vn(l),
        Q = 1 << X;
      ((A[X] = 0), (N[X] = -1));
      var I = H[X];
      if (I !== null)
        for (H[X] = null, X = 0; X < I.length; X++) {
          var Y = I[X];
          Y !== null && (Y.lane &= -536870913);
        }
      l &= ~Q;
    }
    (c !== 0 && Dg(r, c, 0),
      y !== 0 && v === 0 && r.tag !== 0 && (r.suspendedLanes |= y & ~(x & ~i)));
  }
  function Dg(r, i, l) {
    ((r.pendingLanes |= i), (r.suspendedLanes &= ~i));
    var c = 31 - vn(i);
    ((r.entangledLanes |= i),
      (r.entanglements[c] = r.entanglements[c] | 1073741824 | (l & 261930)));
  }
  function Ng(r, i) {
    var l = (r.entangledLanes |= i);
    for (r = r.entanglements; l; ) {
      var c = 31 - vn(l),
        v = 1 << c;
      ((v & i) | (r[c] & i) && (r[c] |= i), (l &= ~v));
    }
  }
  function Pg(r, i) {
    var l = i & -i;
    return (
      (l = (l & 42) !== 0 ? 1 : ld(l)),
      (l & (r.suspendedLanes | i)) !== 0 ? 0 : l
    );
  }
  function ld(r) {
    switch (r) {
      case 2:
        r = 1;
        break;
      case 8:
        r = 4;
        break;
      case 32:
        r = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        r = 128;
        break;
      case 268435456:
        r = 134217728;
        break;
      default:
        r = 0;
    }
    return r;
  }
  function ud(r) {
    return (
      (r &= -r),
      2 < r ? (8 < r ? ((r & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function zg() {
    var r = W.p;
    return r !== 0 ? r : ((r = window.event), r === void 0 ? 32 : bx(r.type));
  }
  function kg(r, i) {
    var l = W.p;
    try {
      return ((W.p = r), i());
    } finally {
      W.p = l;
    }
  }
  var ta = Math.random().toString(36).slice(2),
    Ct = "__reactFiber$" + ta,
    Wt = "__reactProps$" + ta,
    Ai = "__reactContainer$" + ta,
    od = "__reactEvents$" + ta,
    YM = "__reactListeners$" + ta,
    KM = "__reactHandles$" + ta,
    Rg = "__reactResources$" + ta,
    $l = "__reactMarker$" + ta;
  function cd(r) {
    (delete r[Ct], delete r[Wt], delete r[od], delete r[YM], delete r[KM]);
  }
  function Ei(r) {
    var i = r[Ct];
    if (i) return i;
    for (var l = r.parentNode; l; ) {
      if ((i = l[Ai] || l[Ct])) {
        if (
          ((l = i.alternate),
          i.child !== null || (l !== null && l.child !== null))
        )
          for (r = rx(r); r !== null; ) {
            if ((l = r[Ct])) return l;
            r = rx(r);
          }
        return i;
      }
      ((r = l), (l = r.parentNode));
    }
    return null;
  }
  function ji(r) {
    if ((r = r[Ct] || r[Ai])) {
      var i = r.tag;
      if (
        i === 5 ||
        i === 6 ||
        i === 13 ||
        i === 31 ||
        i === 26 ||
        i === 27 ||
        i === 3
      )
        return r;
    }
    return null;
  }
  function Yl(r) {
    var i = r.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return r.stateNode;
    throw Error(a(33));
  }
  function Ti(r) {
    var i = r[Rg];
    return (
      i ||
        (i = r[Rg] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      i
    );
  }
  function bt(r) {
    r[$l] = !0;
  }
  var Lg = new Set(),
    Ug = {};
  function Ua(r, i) {
    (Mi(r, i), Mi(r + "Capture", i));
  }
  function Mi(r, i) {
    for (Ug[r] = i, r = 0; r < i.length; r++) Lg.add(i[r]);
  }
  var GM = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    qg = {},
    Bg = {};
  function XM(r) {
    return nd.call(Bg, r)
      ? !0
      : nd.call(qg, r)
        ? !1
        : GM.test(r)
          ? (Bg[r] = !0)
          : ((qg[r] = !0), !1);
  }
  function Lo(r, i, l) {
    if (XM(i))
      if (l === null) r.removeAttribute(i);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            r.removeAttribute(i);
            return;
          case "boolean":
            var c = i.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              r.removeAttribute(i);
              return;
            }
        }
        r.setAttribute(i, "" + l);
      }
  }
  function Uo(r, i, l) {
    if (l === null) r.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          r.removeAttribute(i);
          return;
      }
      r.setAttribute(i, "" + l);
    }
  }
  function mr(r, i, l, c) {
    if (c === null) r.removeAttribute(l);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          r.removeAttribute(l);
          return;
      }
      r.setAttributeNS(i, l, "" + c);
    }
  }
  function En(r) {
    switch (typeof r) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return r;
      case "object":
        return r;
      default:
        return "";
    }
  }
  function Hg(r) {
    var i = r.type;
    return (
      (r = r.nodeName) &&
      r.toLowerCase() === "input" &&
      (i === "checkbox" || i === "radio")
    );
  }
  function VM(r, i, l) {
    var c = Object.getOwnPropertyDescriptor(r.constructor.prototype, i);
    if (
      !r.hasOwnProperty(i) &&
      typeof c < "u" &&
      typeof c.get == "function" &&
      typeof c.set == "function"
    ) {
      var v = c.get,
        y = c.set;
      return (
        Object.defineProperty(r, i, {
          configurable: !0,
          get: function () {
            return v.call(this);
          },
          set: function (x) {
            ((l = "" + x), y.call(this, x));
          },
        }),
        Object.defineProperty(r, i, { enumerable: c.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (x) {
            l = "" + x;
          },
          stopTracking: function () {
            ((r._valueTracker = null), delete r[i]);
          },
        }
      );
    }
  }
  function sd(r) {
    if (!r._valueTracker) {
      var i = Hg(r) ? "checked" : "value";
      r._valueTracker = VM(r, i, "" + r[i]);
    }
  }
  function Ig(r) {
    if (!r) return !1;
    var i = r._valueTracker;
    if (!i) return !0;
    var l = i.getValue(),
      c = "";
    return (
      r && (c = Hg(r) ? (r.checked ? "true" : "false") : r.value),
      (r = c),
      r !== l ? (i.setValue(r), !0) : !1
    );
  }
  function qo(r) {
    if (
      ((r = r || (typeof document < "u" ? document : void 0)), typeof r > "u")
    )
      return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  var ZM = /[\n"\\]/g;
  function jn(r) {
    return r.replace(ZM, function (i) {
      return "\\" + i.charCodeAt(0).toString(16) + " ";
    });
  }
  function fd(r, i, l, c, v, y, x, A) {
    ((r.name = ""),
      x != null &&
      typeof x != "function" &&
      typeof x != "symbol" &&
      typeof x != "boolean"
        ? (r.type = x)
        : r.removeAttribute("type"),
      i != null
        ? x === "number"
          ? ((i === 0 && r.value === "") || r.value != i) &&
            (r.value = "" + En(i))
          : r.value !== "" + En(i) && (r.value = "" + En(i))
        : (x !== "submit" && x !== "reset") || r.removeAttribute("value"),
      i != null
        ? dd(r, x, En(i))
        : l != null
          ? dd(r, x, En(l))
          : c != null && r.removeAttribute("value"),
      v == null && y != null && (r.defaultChecked = !!y),
      v != null &&
        (r.checked = v && typeof v != "function" && typeof v != "symbol"),
      A != null &&
      typeof A != "function" &&
      typeof A != "symbol" &&
      typeof A != "boolean"
        ? (r.name = "" + En(A))
        : r.removeAttribute("name"));
  }
  function $g(r, i, l, c, v, y, x, A) {
    if (
      (y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean" &&
        (r.type = y),
      i != null || l != null)
    ) {
      if (!((y !== "submit" && y !== "reset") || i != null)) {
        sd(r);
        return;
      }
      ((l = l != null ? "" + En(l) : ""),
        (i = i != null ? "" + En(i) : l),
        A || i === r.value || (r.value = i),
        (r.defaultValue = i));
    }
    ((c = c ?? v),
      (c = typeof c != "function" && typeof c != "symbol" && !!c),
      (r.checked = A ? r.checked : !!c),
      (r.defaultChecked = !!c),
      x != null &&
        typeof x != "function" &&
        typeof x != "symbol" &&
        typeof x != "boolean" &&
        (r.name = x),
      sd(r));
  }
  function dd(r, i, l) {
    (i === "number" && qo(r.ownerDocument) === r) ||
      r.defaultValue === "" + l ||
      (r.defaultValue = "" + l);
  }
  function Ci(r, i, l, c) {
    if (((r = r.options), i)) {
      i = {};
      for (var v = 0; v < l.length; v++) i["$" + l[v]] = !0;
      for (l = 0; l < r.length; l++)
        ((v = i.hasOwnProperty("$" + r[l].value)),
          r[l].selected !== v && (r[l].selected = v),
          v && c && (r[l].defaultSelected = !0));
    } else {
      for (l = "" + En(l), i = null, v = 0; v < r.length; v++) {
        if (r[v].value === l) {
          ((r[v].selected = !0), c && (r[v].defaultSelected = !0));
          return;
        }
        i !== null || r[v].disabled || (i = r[v]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function Yg(r, i, l) {
    if (
      i != null &&
      ((i = "" + En(i)), i !== r.value && (r.value = i), l == null)
    ) {
      r.defaultValue !== i && (r.defaultValue = i);
      return;
    }
    r.defaultValue = l != null ? "" + En(l) : "";
  }
  function Kg(r, i, l, c) {
    if (i == null) {
      if (c != null) {
        if (l != null) throw Error(a(92));
        if (ce(c)) {
          if (1 < c.length) throw Error(a(93));
          c = c[0];
        }
        l = c;
      }
      (l == null && (l = ""), (i = l));
    }
    ((l = En(i)),
      (r.defaultValue = l),
      (c = r.textContent),
      c === l && c !== "" && c !== null && (r.value = c),
      sd(r));
  }
  function Di(r, i) {
    if (i) {
      var l = r.firstChild;
      if (l && l === r.lastChild && l.nodeType === 3) {
        l.nodeValue = i;
        return;
      }
    }
    r.textContent = i;
  }
  var QM = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Gg(r, i, l) {
    var c = i.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? c
        ? r.setProperty(i, "")
        : i === "float"
          ? (r.cssFloat = "")
          : (r[i] = "")
      : c
        ? r.setProperty(i, l)
        : typeof l != "number" || l === 0 || QM.has(i)
          ? i === "float"
            ? (r.cssFloat = l)
            : (r[i] = ("" + l).trim())
          : (r[i] = l + "px");
  }
  function Xg(r, i, l) {
    if (i != null && typeof i != "object") throw Error(a(62));
    if (((r = r.style), l != null)) {
      for (var c in l)
        !l.hasOwnProperty(c) ||
          (i != null && i.hasOwnProperty(c)) ||
          (c.indexOf("--") === 0
            ? r.setProperty(c, "")
            : c === "float"
              ? (r.cssFloat = "")
              : (r[c] = ""));
      for (var v in i)
        ((c = i[v]), i.hasOwnProperty(v) && l[v] !== c && Gg(r, v, c));
    } else for (var y in i) i.hasOwnProperty(y) && Gg(r, y, i[y]);
  }
  function vd(r) {
    if (r.indexOf("-") === -1) return !1;
    switch (r) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var WM = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    FM =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Bo(r) {
    return FM.test("" + r)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : r;
  }
  function yr() {}
  var hd = null;
  function md(r) {
    return (
      (r = r.target || r.srcElement || window),
      r.correspondingUseElement && (r = r.correspondingUseElement),
      r.nodeType === 3 ? r.parentNode : r
    );
  }
  var Ni = null,
    Pi = null;
  function Vg(r) {
    var i = ji(r);
    if (i && (r = i.stateNode)) {
      var l = r[Wt] || null;
      e: switch (((r = i.stateNode), i.type)) {
        case "input":
          if (
            (fd(
              r,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (i = l.name),
            l.type === "radio" && i != null)
          ) {
            for (l = r; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + jn("" + i) + '"][type="radio"]',
              ),
                i = 0;
              i < l.length;
              i++
            ) {
              var c = l[i];
              if (c !== r && c.form === r.form) {
                var v = c[Wt] || null;
                if (!v) throw Error(a(90));
                fd(
                  c,
                  v.value,
                  v.defaultValue,
                  v.defaultValue,
                  v.checked,
                  v.defaultChecked,
                  v.type,
                  v.name,
                );
              }
            }
            for (i = 0; i < l.length; i++)
              ((c = l[i]), c.form === r.form && Ig(c));
          }
          break e;
        case "textarea":
          Yg(r, l.value, l.defaultValue);
          break e;
        case "select":
          ((i = l.value), i != null && Ci(r, !!l.multiple, i, !1));
      }
    }
  }
  var yd = !1;
  function Zg(r, i, l) {
    if (yd) return r(i, l);
    yd = !0;
    try {
      var c = r(i);
      return c;
    } finally {
      if (
        ((yd = !1),
        (Ni !== null || Pi !== null) &&
          (jc(), Ni && ((i = Ni), (r = Pi), (Pi = Ni = null), Vg(i), r)))
      )
        for (i = 0; i < r.length; i++) Vg(r[i]);
    }
  }
  function Kl(r, i) {
    var l = r.stateNode;
    if (l === null) return null;
    var c = l[Wt] || null;
    if (c === null) return null;
    l = c[i];
    e: switch (i) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((c = !c.disabled) ||
          ((r = r.type),
          (c = !(
            r === "button" ||
            r === "input" ||
            r === "select" ||
            r === "textarea"
          ))),
          (r = !c));
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (l && typeof l != "function") throw Error(a(231, i, typeof l));
    return l;
  }
  var pr = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    pd = !1;
  if (pr)
    try {
      var Gl = {};
      (Object.defineProperty(Gl, "passive", {
        get: function () {
          pd = !0;
        },
      }),
        window.addEventListener("test", Gl, Gl),
        window.removeEventListener("test", Gl, Gl));
    } catch {
      pd = !1;
    }
  var na = null,
    gd = null,
    Ho = null;
  function Qg() {
    if (Ho) return Ho;
    var r,
      i = gd,
      l = i.length,
      c,
      v = "value" in na ? na.value : na.textContent,
      y = v.length;
    for (r = 0; r < l && i[r] === v[r]; r++);
    var x = l - r;
    for (c = 1; c <= x && i[l - c] === v[y - c]; c++);
    return (Ho = v.slice(r, 1 < c ? 1 - c : void 0));
  }
  function Io(r) {
    var i = r.keyCode;
    return (
      "charCode" in r
        ? ((r = r.charCode), r === 0 && i === 13 && (r = 13))
        : (r = i),
      r === 10 && (r = 13),
      32 <= r || r === 13 ? r : 0
    );
  }
  function $o() {
    return !0;
  }
  function Wg() {
    return !1;
  }
  function Ft(r) {
    function i(l, c, v, y, x) {
      ((this._reactName = l),
        (this._targetInst = v),
        (this.type = c),
        (this.nativeEvent = y),
        (this.target = x),
        (this.currentTarget = null));
      for (var A in r)
        r.hasOwnProperty(A) && ((l = r[A]), (this[A] = l ? l(y) : y[A]));
      return (
        (this.isDefaultPrevented = (
          y.defaultPrevented != null ? y.defaultPrevented : y.returnValue === !1
        )
          ? $o
          : Wg),
        (this.isPropagationStopped = Wg),
        this
      );
    }
    return (
      p(i.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = $o));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = $o));
        },
        persist: function () {},
        isPersistent: $o,
      }),
      i
    );
  }
  var qa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (r) {
        return r.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Yo = Ft(qa),
    Xl = p({}, qa, { view: 0, detail: 0 }),
    JM = Ft(Xl),
    bd,
    xd,
    Vl,
    Ko = p({}, Xl, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: wd,
      button: 0,
      buttons: 0,
      relatedTarget: function (r) {
        return r.relatedTarget === void 0
          ? r.fromElement === r.srcElement
            ? r.toElement
            : r.fromElement
          : r.relatedTarget;
      },
      movementX: function (r) {
        return "movementX" in r
          ? r.movementX
          : (r !== Vl &&
              (Vl && r.type === "mousemove"
                ? ((bd = r.screenX - Vl.screenX), (xd = r.screenY - Vl.screenY))
                : (xd = bd = 0),
              (Vl = r)),
            bd);
      },
      movementY: function (r) {
        return "movementY" in r ? r.movementY : xd;
      },
    }),
    Fg = Ft(Ko),
    eC = p({}, Ko, { dataTransfer: 0 }),
    tC = Ft(eC),
    nC = p({}, Xl, { relatedTarget: 0 }),
    Sd = Ft(nC),
    rC = p({}, qa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    aC = Ft(rC),
    iC = p({}, qa, {
      clipboardData: function (r) {
        return "clipboardData" in r ? r.clipboardData : window.clipboardData;
      },
    }),
    lC = Ft(iC),
    uC = p({}, qa, { data: 0 }),
    Jg = Ft(uC),
    oC = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    cC = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    sC = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function fC(r) {
    var i = this.nativeEvent;
    return i.getModifierState
      ? i.getModifierState(r)
      : (r = sC[r])
        ? !!i[r]
        : !1;
  }
  function wd() {
    return fC;
  }
  var dC = p({}, Xl, {
      key: function (r) {
        if (r.key) {
          var i = oC[r.key] || r.key;
          if (i !== "Unidentified") return i;
        }
        return r.type === "keypress"
          ? ((r = Io(r)), r === 13 ? "Enter" : String.fromCharCode(r))
          : r.type === "keydown" || r.type === "keyup"
            ? cC[r.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: wd,
      charCode: function (r) {
        return r.type === "keypress" ? Io(r) : 0;
      },
      keyCode: function (r) {
        return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
      },
      which: function (r) {
        return r.type === "keypress"
          ? Io(r)
          : r.type === "keydown" || r.type === "keyup"
            ? r.keyCode
            : 0;
      },
    }),
    vC = Ft(dC),
    hC = p({}, Ko, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    e0 = Ft(hC),
    mC = p({}, Xl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: wd,
    }),
    yC = Ft(mC),
    pC = p({}, qa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    gC = Ft(pC),
    bC = p({}, Ko, {
      deltaX: function (r) {
        return "deltaX" in r
          ? r.deltaX
          : "wheelDeltaX" in r
            ? -r.wheelDeltaX
            : 0;
      },
      deltaY: function (r) {
        return "deltaY" in r
          ? r.deltaY
          : "wheelDeltaY" in r
            ? -r.wheelDeltaY
            : "wheelDelta" in r
              ? -r.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    xC = Ft(bC),
    SC = p({}, qa, { newState: 0, oldState: 0 }),
    wC = Ft(SC),
    OC = [9, 13, 27, 32],
    Od = pr && "CompositionEvent" in window,
    Zl = null;
  pr && "documentMode" in document && (Zl = document.documentMode);
  var _C = pr && "TextEvent" in window && !Zl,
    t0 = pr && (!Od || (Zl && 8 < Zl && 11 >= Zl)),
    n0 = " ",
    r0 = !1;
  function a0(r, i) {
    switch (r) {
      case "keyup":
        return OC.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function i0(r) {
    return (
      (r = r.detail),
      typeof r == "object" && "data" in r ? r.data : null
    );
  }
  var zi = !1;
  function AC(r, i) {
    switch (r) {
      case "compositionend":
        return i0(i);
      case "keypress":
        return i.which !== 32 ? null : ((r0 = !0), n0);
      case "textInput":
        return ((r = i.data), r === n0 && r0 ? null : r);
      default:
        return null;
    }
  }
  function EC(r, i) {
    if (zi)
      return r === "compositionend" || (!Od && a0(r, i))
        ? ((r = Qg()), (Ho = gd = na = null), (zi = !1), r)
        : null;
    switch (r) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || (i.ctrlKey && i.altKey)) {
          if (i.char && 1 < i.char.length) return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return t0 && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var jC = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function l0(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i === "input" ? !!jC[r.type] : i === "textarea";
  }
  function u0(r, i, l, c) {
    (Ni ? (Pi ? Pi.push(c) : (Pi = [c])) : (Ni = c),
      (i = zc(i, "onChange")),
      0 < i.length &&
        ((l = new Yo("onChange", "change", null, l, c)),
        r.push({ event: l, listeners: i })));
  }
  var Ql = null,
    Wl = null;
  function TC(r) {
    $1(r, 0);
  }
  function Go(r) {
    var i = Yl(r);
    if (Ig(i)) return r;
  }
  function o0(r, i) {
    if (r === "change") return i;
  }
  var c0 = !1;
  if (pr) {
    var _d;
    if (pr) {
      var Ad = "oninput" in document;
      if (!Ad) {
        var s0 = document.createElement("div");
        (s0.setAttribute("oninput", "return;"),
          (Ad = typeof s0.oninput == "function"));
      }
      _d = Ad;
    } else _d = !1;
    c0 = _d && (!document.documentMode || 9 < document.documentMode);
  }
  function f0() {
    Ql && (Ql.detachEvent("onpropertychange", d0), (Wl = Ql = null));
  }
  function d0(r) {
    if (r.propertyName === "value" && Go(Wl)) {
      var i = [];
      (u0(i, Wl, r, md(r)), Zg(TC, i));
    }
  }
  function MC(r, i, l) {
    r === "focusin"
      ? (f0(), (Ql = i), (Wl = l), Ql.attachEvent("onpropertychange", d0))
      : r === "focusout" && f0();
  }
  function CC(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown")
      return Go(Wl);
  }
  function DC(r, i) {
    if (r === "click") return Go(i);
  }
  function NC(r, i) {
    if (r === "input" || r === "change") return Go(i);
  }
  function PC(r, i) {
    return (r === i && (r !== 0 || 1 / r === 1 / i)) || (r !== r && i !== i);
  }
  var hn = typeof Object.is == "function" ? Object.is : PC;
  function Fl(r, i) {
    if (hn(r, i)) return !0;
    if (
      typeof r != "object" ||
      r === null ||
      typeof i != "object" ||
      i === null
    )
      return !1;
    var l = Object.keys(r),
      c = Object.keys(i);
    if (l.length !== c.length) return !1;
    for (c = 0; c < l.length; c++) {
      var v = l[c];
      if (!nd.call(i, v) || !hn(r[v], i[v])) return !1;
    }
    return !0;
  }
  function v0(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function h0(r, i) {
    var l = v0(r);
    r = 0;
    for (var c; l; ) {
      if (l.nodeType === 3) {
        if (((c = r + l.textContent.length), r <= i && c >= i))
          return { node: l, offset: i - r };
        r = c;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = v0(l);
    }
  }
  function m0(r, i) {
    return r && i
      ? r === i
        ? !0
        : r && r.nodeType === 3
          ? !1
          : i && i.nodeType === 3
            ? m0(r, i.parentNode)
            : "contains" in r
              ? r.contains(i)
              : r.compareDocumentPosition
                ? !!(r.compareDocumentPosition(i) & 16)
                : !1
      : !1;
  }
  function y0(r) {
    r =
      r != null &&
      r.ownerDocument != null &&
      r.ownerDocument.defaultView != null
        ? r.ownerDocument.defaultView
        : window;
    for (var i = qo(r.document); i instanceof r.HTMLIFrameElement; ) {
      try {
        var l = typeof i.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) r = i.contentWindow;
      else break;
      i = qo(r.document);
    }
    return i;
  }
  function Ed(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return (
      i &&
      ((i === "input" &&
        (r.type === "text" ||
          r.type === "search" ||
          r.type === "tel" ||
          r.type === "url" ||
          r.type === "password")) ||
        i === "textarea" ||
        r.contentEditable === "true")
    );
  }
  var zC = pr && "documentMode" in document && 11 >= document.documentMode,
    ki = null,
    jd = null,
    Jl = null,
    Td = !1;
  function p0(r, i, l) {
    var c =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Td ||
      ki == null ||
      ki !== qo(c) ||
      ((c = ki),
      "selectionStart" in c && Ed(c)
        ? (c = { start: c.selectionStart, end: c.selectionEnd })
        : ((c = (
            (c.ownerDocument && c.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (c = {
            anchorNode: c.anchorNode,
            anchorOffset: c.anchorOffset,
            focusNode: c.focusNode,
            focusOffset: c.focusOffset,
          })),
      (Jl && Fl(Jl, c)) ||
        ((Jl = c),
        (c = zc(jd, "onSelect")),
        0 < c.length &&
          ((i = new Yo("onSelect", "select", null, i, l)),
          r.push({ event: i, listeners: c }),
          (i.target = ki))));
  }
  function Ba(r, i) {
    var l = {};
    return (
      (l[r.toLowerCase()] = i.toLowerCase()),
      (l["Webkit" + r] = "webkit" + i),
      (l["Moz" + r] = "moz" + i),
      l
    );
  }
  var Ri = {
      animationend: Ba("Animation", "AnimationEnd"),
      animationiteration: Ba("Animation", "AnimationIteration"),
      animationstart: Ba("Animation", "AnimationStart"),
      transitionrun: Ba("Transition", "TransitionRun"),
      transitionstart: Ba("Transition", "TransitionStart"),
      transitioncancel: Ba("Transition", "TransitionCancel"),
      transitionend: Ba("Transition", "TransitionEnd"),
    },
    Md = {},
    g0 = {};
  pr &&
    ((g0 = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ri.animationend.animation,
      delete Ri.animationiteration.animation,
      delete Ri.animationstart.animation),
    "TransitionEvent" in window || delete Ri.transitionend.transition);
  function Ha(r) {
    if (Md[r]) return Md[r];
    if (!Ri[r]) return r;
    var i = Ri[r],
      l;
    for (l in i) if (i.hasOwnProperty(l) && l in g0) return (Md[r] = i[l]);
    return r;
  }
  var b0 = Ha("animationend"),
    x0 = Ha("animationiteration"),
    S0 = Ha("animationstart"),
    kC = Ha("transitionrun"),
    RC = Ha("transitionstart"),
    LC = Ha("transitioncancel"),
    w0 = Ha("transitionend"),
    O0 = new Map(),
    Cd =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Cd.push("scrollEnd");
  function Yn(r, i) {
    (O0.set(r, i), Ua(i, [r]));
  }
  var Xo =
      typeof reportError == "function"
        ? reportError
        : function (r) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var i = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof r == "object" &&
                  r !== null &&
                  typeof r.message == "string"
                    ? String(r.message)
                    : String(r),
                error: r,
              });
              if (!window.dispatchEvent(i)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", r);
              return;
            }
            console.error(r);
          },
    Tn = [],
    Li = 0,
    Dd = 0;
  function Vo() {
    for (var r = Li, i = (Dd = Li = 0); i < r; ) {
      var l = Tn[i];
      Tn[i++] = null;
      var c = Tn[i];
      Tn[i++] = null;
      var v = Tn[i];
      Tn[i++] = null;
      var y = Tn[i];
      if (((Tn[i++] = null), c !== null && v !== null)) {
        var x = c.pending;
        (x === null ? (v.next = v) : ((v.next = x.next), (x.next = v)),
          (c.pending = v));
      }
      y !== 0 && _0(l, v, y);
    }
  }
  function Zo(r, i, l, c) {
    ((Tn[Li++] = r),
      (Tn[Li++] = i),
      (Tn[Li++] = l),
      (Tn[Li++] = c),
      (Dd |= c),
      (r.lanes |= c),
      (r = r.alternate),
      r !== null && (r.lanes |= c));
  }
  function Nd(r, i, l, c) {
    return (Zo(r, i, l, c), Qo(r));
  }
  function Ia(r, i) {
    return (Zo(r, null, null, i), Qo(r));
  }
  function _0(r, i, l) {
    r.lanes |= l;
    var c = r.alternate;
    c !== null && (c.lanes |= l);
    for (var v = !1, y = r.return; y !== null; )
      ((y.childLanes |= l),
        (c = y.alternate),
        c !== null && (c.childLanes |= l),
        y.tag === 22 &&
          ((r = y.stateNode), r === null || r._visibility & 1 || (v = !0)),
        (r = y),
        (y = y.return));
    return r.tag === 3
      ? ((y = r.stateNode),
        v &&
          i !== null &&
          ((v = 31 - vn(l)),
          (r = y.hiddenUpdates),
          (c = r[v]),
          c === null ? (r[v] = [i]) : c.push(i),
          (i.lane = l | 536870912)),
        y)
      : null;
  }
  function Qo(r) {
    if (50 < Su) throw ((Su = 0), (Hv = null), Error(a(185)));
    for (var i = r.return; i !== null; ) ((r = i), (i = r.return));
    return r.tag === 3 ? r.stateNode : null;
  }
  var Ui = {};
  function UC(r, i, l, c) {
    ((this.tag = r),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = i),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = c),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function mn(r, i, l, c) {
    return new UC(r, i, l, c);
  }
  function Pd(r) {
    return ((r = r.prototype), !(!r || !r.isReactComponent));
  }
  function gr(r, i) {
    var l = r.alternate;
    return (
      l === null
        ? ((l = mn(r.tag, i, r.key, r.mode)),
          (l.elementType = r.elementType),
          (l.type = r.type),
          (l.stateNode = r.stateNode),
          (l.alternate = r),
          (r.alternate = l))
        : ((l.pendingProps = i),
          (l.type = r.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = r.flags & 65011712),
      (l.childLanes = r.childLanes),
      (l.lanes = r.lanes),
      (l.child = r.child),
      (l.memoizedProps = r.memoizedProps),
      (l.memoizedState = r.memoizedState),
      (l.updateQueue = r.updateQueue),
      (i = r.dependencies),
      (l.dependencies =
        i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }),
      (l.sibling = r.sibling),
      (l.index = r.index),
      (l.ref = r.ref),
      (l.refCleanup = r.refCleanup),
      l
    );
  }
  function A0(r, i) {
    r.flags &= 65011714;
    var l = r.alternate;
    return (
      l === null
        ? ((r.childLanes = 0),
          (r.lanes = i),
          (r.child = null),
          (r.subtreeFlags = 0),
          (r.memoizedProps = null),
          (r.memoizedState = null),
          (r.updateQueue = null),
          (r.dependencies = null),
          (r.stateNode = null))
        : ((r.childLanes = l.childLanes),
          (r.lanes = l.lanes),
          (r.child = l.child),
          (r.subtreeFlags = 0),
          (r.deletions = null),
          (r.memoizedProps = l.memoizedProps),
          (r.memoizedState = l.memoizedState),
          (r.updateQueue = l.updateQueue),
          (r.type = l.type),
          (i = l.dependencies),
          (r.dependencies =
            i === null
              ? null
              : { lanes: i.lanes, firstContext: i.firstContext })),
      r
    );
  }
  function Wo(r, i, l, c, v, y) {
    var x = 0;
    if (((c = r), typeof r == "function")) Pd(r) && (x = 1);
    else if (typeof r == "string")
      x = $D(r, l, ie.current)
        ? 26
        : r === "html" || r === "head" || r === "body"
          ? 27
          : 5;
    else
      e: switch (r) {
        case F:
          return ((r = mn(31, l, i, v)), (r.elementType = F), (r.lanes = y), r);
        case _:
          return $a(l.children, v, y, i);
        case O:
          ((x = 8), (v |= 24));
          break;
        case E:
          return (
            (r = mn(12, l, i, v | 2)),
            (r.elementType = E),
            (r.lanes = y),
            r
          );
        case M:
          return ((r = mn(13, l, i, v)), (r.elementType = M), (r.lanes = y), r);
        case z:
          return ((r = mn(19, l, i, v)), (r.elementType = z), (r.lanes = y), r);
        default:
          if (typeof r == "object" && r !== null)
            switch (r.$$typeof) {
              case T:
                x = 10;
                break e;
              case C:
                x = 9;
                break e;
              case D:
                x = 11;
                break e;
              case U:
                x = 14;
                break e;
              case V:
                ((x = 16), (c = null));
                break e;
            }
          ((x = 29),
            (l = Error(a(130, r === null ? "null" : typeof r, ""))),
            (c = null));
      }
    return (
      (i = mn(x, l, i, v)),
      (i.elementType = r),
      (i.type = c),
      (i.lanes = y),
      i
    );
  }
  function $a(r, i, l, c) {
    return ((r = mn(7, r, c, i)), (r.lanes = l), r);
  }
  function zd(r, i, l) {
    return ((r = mn(6, r, null, i)), (r.lanes = l), r);
  }
  function E0(r) {
    var i = mn(18, null, null, 0);
    return ((i.stateNode = r), i);
  }
  function kd(r, i, l) {
    return (
      (i = mn(4, r.children !== null ? r.children : [], r.key, i)),
      (i.lanes = l),
      (i.stateNode = {
        containerInfo: r.containerInfo,
        pendingChildren: null,
        implementation: r.implementation,
      }),
      i
    );
  }
  var j0 = new WeakMap();
  function Mn(r, i) {
    if (typeof r == "object" && r !== null) {
      var l = j0.get(r);
      return l !== void 0
        ? l
        : ((i = { value: r, source: i, stack: ql(i) }), j0.set(r, i), i);
    }
    return { value: r, source: i, stack: ql(i) };
  }
  var qi = [],
    Bi = 0,
    Fo = null,
    eu = 0,
    Cn = [],
    Dn = 0,
    ra = null,
    Fn = 1,
    Jn = "";
  function br(r, i) {
    ((qi[Bi++] = eu), (qi[Bi++] = Fo), (Fo = r), (eu = i));
  }
  function T0(r, i, l) {
    ((Cn[Dn++] = Fn), (Cn[Dn++] = Jn), (Cn[Dn++] = ra), (ra = r));
    var c = Fn;
    r = Jn;
    var v = 32 - vn(c) - 1;
    ((c &= ~(1 << v)), (l += 1));
    var y = 32 - vn(i) + v;
    if (30 < y) {
      var x = v - (v % 5);
      ((y = (c & ((1 << x) - 1)).toString(32)),
        (c >>= x),
        (v -= x),
        (Fn = (1 << (32 - vn(i) + v)) | (l << v) | c),
        (Jn = y + r));
    } else ((Fn = (1 << y) | (l << v) | c), (Jn = r));
  }
  function Rd(r) {
    r.return !== null && (br(r, 1), T0(r, 1, 0));
  }
  function Ld(r) {
    for (; r === Fo; )
      ((Fo = qi[--Bi]), (qi[Bi] = null), (eu = qi[--Bi]), (qi[Bi] = null));
    for (; r === ra; )
      ((ra = Cn[--Dn]),
        (Cn[Dn] = null),
        (Jn = Cn[--Dn]),
        (Cn[Dn] = null),
        (Fn = Cn[--Dn]),
        (Cn[Dn] = null));
  }
  function M0(r, i) {
    ((Cn[Dn++] = Fn),
      (Cn[Dn++] = Jn),
      (Cn[Dn++] = ra),
      (Fn = i.id),
      (Jn = i.overflow),
      (ra = r));
  }
  var Dt = null,
    Ve = null,
    Me = !1,
    aa = null,
    Nn = !1,
    Ud = Error(a(519));
  function ia(r) {
    var i = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (tu(Mn(i, r)), Ud);
  }
  function C0(r) {
    var i = r.stateNode,
      l = r.type,
      c = r.memoizedProps;
    switch (((i[Ct] = r), (i[Wt] = c), l)) {
      case "dialog":
        (Ae("cancel", i), Ae("close", i));
        break;
      case "iframe":
      case "object":
      case "embed":
        Ae("load", i);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ou.length; l++) Ae(Ou[l], i);
        break;
      case "source":
        Ae("error", i);
        break;
      case "img":
      case "image":
      case "link":
        (Ae("error", i), Ae("load", i));
        break;
      case "details":
        Ae("toggle", i);
        break;
      case "input":
        (Ae("invalid", i),
          $g(
            i,
            c.value,
            c.defaultValue,
            c.checked,
            c.defaultChecked,
            c.type,
            c.name,
            !0,
          ));
        break;
      case "select":
        Ae("invalid", i);
        break;
      case "textarea":
        (Ae("invalid", i), Kg(i, c.value, c.defaultValue, c.children));
    }
    ((l = c.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      i.textContent === "" + l ||
      c.suppressHydrationWarning === !0 ||
      X1(i.textContent, l)
        ? (c.popover != null && (Ae("beforetoggle", i), Ae("toggle", i)),
          c.onScroll != null && Ae("scroll", i),
          c.onScrollEnd != null && Ae("scrollend", i),
          c.onClick != null && (i.onclick = yr),
          (i = !0))
        : (i = !1),
      i || ia(r, !0));
  }
  function D0(r) {
    for (Dt = r.return; Dt; )
      switch (Dt.tag) {
        case 5:
        case 31:
        case 13:
          Nn = !1;
          return;
        case 27:
        case 3:
          Nn = !0;
          return;
        default:
          Dt = Dt.return;
      }
  }
  function Hi(r) {
    if (r !== Dt) return !1;
    if (!Me) return (D0(r), (Me = !0), !1);
    var i = r.tag,
      l;
    if (
      ((l = i !== 3 && i !== 27) &&
        ((l = i === 5) &&
          ((l = r.type),
          (l =
            !(l !== "form" && l !== "button") || nh(r.type, r.memoizedProps))),
        (l = !l)),
      l && Ve && ia(r),
      D0(r),
      i === 13)
    ) {
      if (((r = r.memoizedState), (r = r !== null ? r.dehydrated : null), !r))
        throw Error(a(317));
      Ve = nx(r);
    } else if (i === 31) {
      if (((r = r.memoizedState), (r = r !== null ? r.dehydrated : null), !r))
        throw Error(a(317));
      Ve = nx(r);
    } else
      i === 27
        ? ((i = Ve), ba(r.type) ? ((r = uh), (uh = null), (Ve = r)) : (Ve = i))
        : (Ve = Dt ? zn(r.stateNode.nextSibling) : null);
    return !0;
  }
  function Ya() {
    ((Ve = Dt = null), (Me = !1));
  }
  function qd() {
    var r = aa;
    return (
      r !== null &&
        (nn === null ? (nn = r) : nn.push.apply(nn, r), (aa = null)),
      r
    );
  }
  function tu(r) {
    aa === null ? (aa = [r]) : aa.push(r);
  }
  var Bd = P(null),
    Ka = null,
    xr = null;
  function la(r, i, l) {
    (te(Bd, i._currentValue), (i._currentValue = l));
  }
  function Sr(r) {
    ((r._currentValue = Bd.current), G(Bd));
  }
  function Hd(r, i, l) {
    for (; r !== null; ) {
      var c = r.alternate;
      if (
        ((r.childLanes & i) !== i
          ? ((r.childLanes |= i), c !== null && (c.childLanes |= i))
          : c !== null && (c.childLanes & i) !== i && (c.childLanes |= i),
        r === l)
      )
        break;
      r = r.return;
    }
  }
  function Id(r, i, l, c) {
    var v = r.child;
    for (v !== null && (v.return = r); v !== null; ) {
      var y = v.dependencies;
      if (y !== null) {
        var x = v.child;
        y = y.firstContext;
        e: for (; y !== null; ) {
          var A = y;
          y = v;
          for (var N = 0; N < i.length; N++)
            if (A.context === i[N]) {
              ((y.lanes |= l),
                (A = y.alternate),
                A !== null && (A.lanes |= l),
                Hd(y.return, l, r),
                c || (x = null));
              break e;
            }
          y = A.next;
        }
      } else if (v.tag === 18) {
        if (((x = v.return), x === null)) throw Error(a(341));
        ((x.lanes |= l),
          (y = x.alternate),
          y !== null && (y.lanes |= l),
          Hd(x, l, r),
          (x = null));
      } else x = v.child;
      if (x !== null) x.return = v;
      else
        for (x = v; x !== null; ) {
          if (x === r) {
            x = null;
            break;
          }
          if (((v = x.sibling), v !== null)) {
            ((v.return = x.return), (x = v));
            break;
          }
          x = x.return;
        }
      v = x;
    }
  }
  function Ii(r, i, l, c) {
    r = null;
    for (var v = i, y = !1; v !== null; ) {
      if (!y) {
        if ((v.flags & 524288) !== 0) y = !0;
        else if ((v.flags & 262144) !== 0) break;
      }
      if (v.tag === 10) {
        var x = v.alternate;
        if (x === null) throw Error(a(387));
        if (((x = x.memoizedProps), x !== null)) {
          var A = v.type;
          hn(v.pendingProps.value, x.value) ||
            (r !== null ? r.push(A) : (r = [A]));
        }
      } else if (v === Ee.current) {
        if (((x = v.alternate), x === null)) throw Error(a(387));
        x.memoizedState.memoizedState !== v.memoizedState.memoizedState &&
          (r !== null ? r.push(Tu) : (r = [Tu]));
      }
      v = v.return;
    }
    (r !== null && Id(i, r, l, c), (i.flags |= 262144));
  }
  function Jo(r) {
    for (r = r.firstContext; r !== null; ) {
      if (!hn(r.context._currentValue, r.memoizedValue)) return !0;
      r = r.next;
    }
    return !1;
  }
  function Ga(r) {
    ((Ka = r),
      (xr = null),
      (r = r.dependencies),
      r !== null && (r.firstContext = null));
  }
  function Nt(r) {
    return N0(Ka, r);
  }
  function ec(r, i) {
    return (Ka === null && Ga(r), N0(r, i));
  }
  function N0(r, i) {
    var l = i._currentValue;
    if (((i = { context: i, memoizedValue: l, next: null }), xr === null)) {
      if (r === null) throw Error(a(308));
      ((xr = i),
        (r.dependencies = { lanes: 0, firstContext: i }),
        (r.flags |= 524288));
    } else xr = xr.next = i;
    return l;
  }
  var qC =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var r = [],
              i = (this.signal = {
                aborted: !1,
                addEventListener: function (l, c) {
                  r.push(c);
                },
              });
            this.abort = function () {
              ((i.aborted = !0),
                r.forEach(function (l) {
                  return l();
                }));
            };
          },
    BC = e.unstable_scheduleCallback,
    HC = e.unstable_NormalPriority,
    ut = {
      $$typeof: T,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function $d() {
    return { controller: new qC(), data: new Map(), refCount: 0 };
  }
  function nu(r) {
    (r.refCount--,
      r.refCount === 0 &&
        BC(HC, function () {
          r.controller.abort();
        }));
  }
  var ru = null,
    Yd = 0,
    $i = 0,
    Yi = null;
  function IC(r, i) {
    if (ru === null) {
      var l = (ru = []);
      ((Yd = 0),
        ($i = Xv()),
        (Yi = {
          status: "pending",
          value: void 0,
          then: function (c) {
            l.push(c);
          },
        }));
    }
    return (Yd++, i.then(P0, P0), i);
  }
  function P0() {
    if (--Yd === 0 && ru !== null) {
      Yi !== null && (Yi.status = "fulfilled");
      var r = ru;
      ((ru = null), ($i = 0), (Yi = null));
      for (var i = 0; i < r.length; i++) (0, r[i])();
    }
  }
  function $C(r, i) {
    var l = [],
      c = {
        status: "pending",
        value: null,
        reason: null,
        then: function (v) {
          l.push(v);
        },
      };
    return (
      r.then(
        function () {
          ((c.status = "fulfilled"), (c.value = i));
          for (var v = 0; v < l.length; v++) (0, l[v])(i);
        },
        function (v) {
          for (c.status = "rejected", c.reason = v, v = 0; v < l.length; v++)
            (0, l[v])(void 0);
        },
      ),
      c
    );
  }
  var z0 = L.S;
  L.S = function (r, i) {
    ((p1 = fn()),
      typeof i == "object" &&
        i !== null &&
        typeof i.then == "function" &&
        IC(r, i),
      z0 !== null && z0(r, i));
  };
  var Xa = P(null);
  function Kd() {
    var r = Xa.current;
    return r !== null ? r : Ye.pooledCache;
  }
  function tc(r, i) {
    i === null ? te(Xa, Xa.current) : te(Xa, i.pool);
  }
  function k0() {
    var r = Kd();
    return r === null ? null : { parent: ut._currentValue, pool: r };
  }
  var Ki = Error(a(460)),
    Gd = Error(a(474)),
    nc = Error(a(542)),
    rc = { then: function () {} };
  function R0(r) {
    return ((r = r.status), r === "fulfilled" || r === "rejected");
  }
  function L0(r, i, l) {
    switch (
      ((l = r[l]),
      l === void 0 ? r.push(i) : l !== i && (i.then(yr, yr), (i = l)),
      i.status)
    ) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw ((r = i.reason), q0(r), r);
      default:
        if (typeof i.status == "string") i.then(yr, yr);
        else {
          if (((r = Ye), r !== null && 100 < r.shellSuspendCounter))
            throw Error(a(482));
          ((r = i),
            (r.status = "pending"),
            r.then(
              function (c) {
                if (i.status === "pending") {
                  var v = i;
                  ((v.status = "fulfilled"), (v.value = c));
                }
              },
              function (c) {
                if (i.status === "pending") {
                  var v = i;
                  ((v.status = "rejected"), (v.reason = c));
                }
              },
            ));
        }
        switch (i.status) {
          case "fulfilled":
            return i.value;
          case "rejected":
            throw ((r = i.reason), q0(r), r);
        }
        throw ((Za = i), Ki);
    }
  }
  function Va(r) {
    try {
      var i = r._init;
      return i(r._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function"
        ? ((Za = l), Ki)
        : l;
    }
  }
  var Za = null;
  function U0() {
    if (Za === null) throw Error(a(459));
    var r = Za;
    return ((Za = null), r);
  }
  function q0(r) {
    if (r === Ki || r === nc) throw Error(a(483));
  }
  var Gi = null,
    au = 0;
  function ac(r) {
    var i = au;
    return ((au += 1), Gi === null && (Gi = []), L0(Gi, r, i));
  }
  function iu(r, i) {
    ((i = i.props.ref), (r.ref = i !== void 0 ? i : null));
  }
  function ic(r, i) {
    throw i.$$typeof === g
      ? Error(a(525))
      : ((r = Object.prototype.toString.call(i)),
        Error(
          a(
            31,
            r === "[object Object]"
              ? "object with keys {" + Object.keys(i).join(", ") + "}"
              : r,
          ),
        ));
  }
  function B0(r) {
    function i(R, k) {
      if (r) {
        var B = R.deletions;
        B === null ? ((R.deletions = [k]), (R.flags |= 16)) : B.push(k);
      }
    }
    function l(R, k) {
      if (!r) return null;
      for (; k !== null; ) (i(R, k), (k = k.sibling));
      return null;
    }
    function c(R) {
      for (var k = new Map(); R !== null; )
        (R.key !== null ? k.set(R.key, R) : k.set(R.index, R), (R = R.sibling));
      return k;
    }
    function v(R, k) {
      return ((R = gr(R, k)), (R.index = 0), (R.sibling = null), R);
    }
    function y(R, k, B) {
      return (
        (R.index = B),
        r
          ? ((B = R.alternate),
            B !== null
              ? ((B = B.index), B < k ? ((R.flags |= 67108866), k) : B)
              : ((R.flags |= 67108866), k))
          : ((R.flags |= 1048576), k)
      );
    }
    function x(R) {
      return (r && R.alternate === null && (R.flags |= 67108866), R);
    }
    function A(R, k, B, Z) {
      return k === null || k.tag !== 6
        ? ((k = zd(B, R.mode, Z)), (k.return = R), k)
        : ((k = v(k, B)), (k.return = R), k);
    }
    function N(R, k, B, Z) {
      var me = B.type;
      return me === _
        ? X(R, k, B.props.children, Z, B.key)
        : k !== null &&
            (k.elementType === me ||
              (typeof me == "object" &&
                me !== null &&
                me.$$typeof === V &&
                Va(me) === k.type))
          ? ((k = v(k, B.props)), iu(k, B), (k.return = R), k)
          : ((k = Wo(B.type, B.key, B.props, null, R.mode, Z)),
            iu(k, B),
            (k.return = R),
            k);
    }
    function H(R, k, B, Z) {
      return k === null ||
        k.tag !== 4 ||
        k.stateNode.containerInfo !== B.containerInfo ||
        k.stateNode.implementation !== B.implementation
        ? ((k = kd(B, R.mode, Z)), (k.return = R), k)
        : ((k = v(k, B.children || [])), (k.return = R), k);
    }
    function X(R, k, B, Z, me) {
      return k === null || k.tag !== 7
        ? ((k = $a(B, R.mode, Z, me)), (k.return = R), k)
        : ((k = v(k, B)), (k.return = R), k);
    }
    function Q(R, k, B) {
      if (
        (typeof k == "string" && k !== "") ||
        typeof k == "number" ||
        typeof k == "bigint"
      )
        return ((k = zd("" + k, R.mode, B)), (k.return = R), k);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case b:
            return (
              (B = Wo(k.type, k.key, k.props, null, R.mode, B)),
              iu(B, k),
              (B.return = R),
              B
            );
          case S:
            return ((k = kd(k, R.mode, B)), (k.return = R), k);
          case V:
            return ((k = Va(k)), Q(R, k, B));
        }
        if (ce(k) || K(k))
          return ((k = $a(k, R.mode, B, null)), (k.return = R), k);
        if (typeof k.then == "function") return Q(R, ac(k), B);
        if (k.$$typeof === T) return Q(R, ec(R, k), B);
        ic(R, k);
      }
      return null;
    }
    function I(R, k, B, Z) {
      var me = k !== null ? k.key : null;
      if (
        (typeof B == "string" && B !== "") ||
        typeof B == "number" ||
        typeof B == "bigint"
      )
        return me !== null ? null : A(R, k, "" + B, Z);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case b:
            return B.key === me ? N(R, k, B, Z) : null;
          case S:
            return B.key === me ? H(R, k, B, Z) : null;
          case V:
            return ((B = Va(B)), I(R, k, B, Z));
        }
        if (ce(B) || K(B)) return me !== null ? null : X(R, k, B, Z, null);
        if (typeof B.then == "function") return I(R, k, ac(B), Z);
        if (B.$$typeof === T) return I(R, k, ec(R, B), Z);
        ic(R, B);
      }
      return null;
    }
    function Y(R, k, B, Z, me) {
      if (
        (typeof Z == "string" && Z !== "") ||
        typeof Z == "number" ||
        typeof Z == "bigint"
      )
        return ((R = R.get(B) || null), A(k, R, "" + Z, me));
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case b:
            return (
              (R = R.get(Z.key === null ? B : Z.key) || null),
              N(k, R, Z, me)
            );
          case S:
            return (
              (R = R.get(Z.key === null ? B : Z.key) || null),
              H(k, R, Z, me)
            );
          case V:
            return ((Z = Va(Z)), Y(R, k, B, Z, me));
        }
        if (ce(Z) || K(Z))
          return ((R = R.get(B) || null), X(k, R, Z, me, null));
        if (typeof Z.then == "function") return Y(R, k, B, ac(Z), me);
        if (Z.$$typeof === T) return Y(R, k, B, ec(k, Z), me);
        ic(k, Z);
      }
      return null;
    }
    function fe(R, k, B, Z) {
      for (
        var me = null, Pe = null, de = k, we = (k = 0), Te = null;
        de !== null && we < B.length;
        we++
      ) {
        de.index > we ? ((Te = de), (de = null)) : (Te = de.sibling);
        var ze = I(R, de, B[we], Z);
        if (ze === null) {
          de === null && (de = Te);
          break;
        }
        (r && de && ze.alternate === null && i(R, de),
          (k = y(ze, k, we)),
          Pe === null ? (me = ze) : (Pe.sibling = ze),
          (Pe = ze),
          (de = Te));
      }
      if (we === B.length) return (l(R, de), Me && br(R, we), me);
      if (de === null) {
        for (; we < B.length; we++)
          ((de = Q(R, B[we], Z)),
            de !== null &&
              ((k = y(de, k, we)),
              Pe === null ? (me = de) : (Pe.sibling = de),
              (Pe = de)));
        return (Me && br(R, we), me);
      }
      for (de = c(de); we < B.length; we++)
        ((Te = Y(de, R, we, B[we], Z)),
          Te !== null &&
            (r &&
              Te.alternate !== null &&
              de.delete(Te.key === null ? we : Te.key),
            (k = y(Te, k, we)),
            Pe === null ? (me = Te) : (Pe.sibling = Te),
            (Pe = Te)));
      return (
        r &&
          de.forEach(function (_a) {
            return i(R, _a);
          }),
        Me && br(R, we),
        me
      );
    }
    function ge(R, k, B, Z) {
      if (B == null) throw Error(a(151));
      for (
        var me = null,
          Pe = null,
          de = k,
          we = (k = 0),
          Te = null,
          ze = B.next();
        de !== null && !ze.done;
        we++, ze = B.next()
      ) {
        de.index > we ? ((Te = de), (de = null)) : (Te = de.sibling);
        var _a = I(R, de, ze.value, Z);
        if (_a === null) {
          de === null && (de = Te);
          break;
        }
        (r && de && _a.alternate === null && i(R, de),
          (k = y(_a, k, we)),
          Pe === null ? (me = _a) : (Pe.sibling = _a),
          (Pe = _a),
          (de = Te));
      }
      if (ze.done) return (l(R, de), Me && br(R, we), me);
      if (de === null) {
        for (; !ze.done; we++, ze = B.next())
          ((ze = Q(R, ze.value, Z)),
            ze !== null &&
              ((k = y(ze, k, we)),
              Pe === null ? (me = ze) : (Pe.sibling = ze),
              (Pe = ze)));
        return (Me && br(R, we), me);
      }
      for (de = c(de); !ze.done; we++, ze = B.next())
        ((ze = Y(de, R, we, ze.value, Z)),
          ze !== null &&
            (r &&
              ze.alternate !== null &&
              de.delete(ze.key === null ? we : ze.key),
            (k = y(ze, k, we)),
            Pe === null ? (me = ze) : (Pe.sibling = ze),
            (Pe = ze)));
      return (
        r &&
          de.forEach(function (eN) {
            return i(R, eN);
          }),
        Me && br(R, we),
        me
      );
    }
    function $e(R, k, B, Z) {
      if (
        (typeof B == "object" &&
          B !== null &&
          B.type === _ &&
          B.key === null &&
          (B = B.props.children),
        typeof B == "object" && B !== null)
      ) {
        switch (B.$$typeof) {
          case b:
            e: {
              for (var me = B.key; k !== null; ) {
                if (k.key === me) {
                  if (((me = B.type), me === _)) {
                    if (k.tag === 7) {
                      (l(R, k.sibling),
                        (Z = v(k, B.props.children)),
                        (Z.return = R),
                        (R = Z));
                      break e;
                    }
                  } else if (
                    k.elementType === me ||
                    (typeof me == "object" &&
                      me !== null &&
                      me.$$typeof === V &&
                      Va(me) === k.type)
                  ) {
                    (l(R, k.sibling),
                      (Z = v(k, B.props)),
                      iu(Z, B),
                      (Z.return = R),
                      (R = Z));
                    break e;
                  }
                  l(R, k);
                  break;
                } else i(R, k);
                k = k.sibling;
              }
              B.type === _
                ? ((Z = $a(B.props.children, R.mode, Z, B.key)),
                  (Z.return = R),
                  (R = Z))
                : ((Z = Wo(B.type, B.key, B.props, null, R.mode, Z)),
                  iu(Z, B),
                  (Z.return = R),
                  (R = Z));
            }
            return x(R);
          case S:
            e: {
              for (me = B.key; k !== null; ) {
                if (k.key === me)
                  if (
                    k.tag === 4 &&
                    k.stateNode.containerInfo === B.containerInfo &&
                    k.stateNode.implementation === B.implementation
                  ) {
                    (l(R, k.sibling),
                      (Z = v(k, B.children || [])),
                      (Z.return = R),
                      (R = Z));
                    break e;
                  } else {
                    l(R, k);
                    break;
                  }
                else i(R, k);
                k = k.sibling;
              }
              ((Z = kd(B, R.mode, Z)), (Z.return = R), (R = Z));
            }
            return x(R);
          case V:
            return ((B = Va(B)), $e(R, k, B, Z));
        }
        if (ce(B)) return fe(R, k, B, Z);
        if (K(B)) {
          if (((me = K(B)), typeof me != "function")) throw Error(a(150));
          return ((B = me.call(B)), ge(R, k, B, Z));
        }
        if (typeof B.then == "function") return $e(R, k, ac(B), Z);
        if (B.$$typeof === T) return $e(R, k, ec(R, B), Z);
        ic(R, B);
      }
      return (typeof B == "string" && B !== "") ||
        typeof B == "number" ||
        typeof B == "bigint"
        ? ((B = "" + B),
          k !== null && k.tag === 6
            ? (l(R, k.sibling), (Z = v(k, B)), (Z.return = R), (R = Z))
            : (l(R, k), (Z = zd(B, R.mode, Z)), (Z.return = R), (R = Z)),
          x(R))
        : l(R, k);
    }
    return function (R, k, B, Z) {
      try {
        au = 0;
        var me = $e(R, k, B, Z);
        return ((Gi = null), me);
      } catch (de) {
        if (de === Ki || de === nc) throw de;
        var Pe = mn(29, de, null, R.mode);
        return ((Pe.lanes = Z), (Pe.return = R), Pe);
      }
    };
  }
  var Qa = B0(!0),
    H0 = B0(!1),
    ua = !1;
  function Xd(r) {
    r.updateQueue = {
      baseState: r.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Vd(r, i) {
    ((r = r.updateQueue),
      i.updateQueue === r &&
        (i.updateQueue = {
          baseState: r.baseState,
          firstBaseUpdate: r.firstBaseUpdate,
          lastBaseUpdate: r.lastBaseUpdate,
          shared: r.shared,
          callbacks: null,
        }));
  }
  function oa(r) {
    return { lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function ca(r, i, l) {
    var c = r.updateQueue;
    if (c === null) return null;
    if (((c = c.shared), (Le & 2) !== 0)) {
      var v = c.pending;
      return (
        v === null ? (i.next = i) : ((i.next = v.next), (v.next = i)),
        (c.pending = i),
        (i = Qo(r)),
        _0(r, null, l),
        i
      );
    }
    return (Zo(r, c, i, l), Qo(r));
  }
  function lu(r, i, l) {
    if (
      ((i = i.updateQueue), i !== null && ((i = i.shared), (l & 4194048) !== 0))
    ) {
      var c = i.lanes;
      ((c &= r.pendingLanes), (l |= c), (i.lanes = l), Ng(r, l));
    }
  }
  function Zd(r, i) {
    var l = r.updateQueue,
      c = r.alternate;
    if (c !== null && ((c = c.updateQueue), l === c)) {
      var v = null,
        y = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var x = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          (y === null ? (v = y = x) : (y = y.next = x), (l = l.next));
        } while (l !== null);
        y === null ? (v = y = i) : (y = y.next = i);
      } else v = y = i;
      ((l = {
        baseState: c.baseState,
        firstBaseUpdate: v,
        lastBaseUpdate: y,
        shared: c.shared,
        callbacks: c.callbacks,
      }),
        (r.updateQueue = l));
      return;
    }
    ((r = l.lastBaseUpdate),
      r === null ? (l.firstBaseUpdate = i) : (r.next = i),
      (l.lastBaseUpdate = i));
  }
  var Qd = !1;
  function uu() {
    if (Qd) {
      var r = Yi;
      if (r !== null) throw r;
    }
  }
  function ou(r, i, l, c) {
    Qd = !1;
    var v = r.updateQueue;
    ua = !1;
    var y = v.firstBaseUpdate,
      x = v.lastBaseUpdate,
      A = v.shared.pending;
    if (A !== null) {
      v.shared.pending = null;
      var N = A,
        H = N.next;
      ((N.next = null), x === null ? (y = H) : (x.next = H), (x = N));
      var X = r.alternate;
      X !== null &&
        ((X = X.updateQueue),
        (A = X.lastBaseUpdate),
        A !== x &&
          (A === null ? (X.firstBaseUpdate = H) : (A.next = H),
          (X.lastBaseUpdate = N)));
    }
    if (y !== null) {
      var Q = v.baseState;
      ((x = 0), (X = H = N = null), (A = y));
      do {
        var I = A.lane & -536870913,
          Y = I !== A.lane;
        if (Y ? (je & I) === I : (c & I) === I) {
          (I !== 0 && I === $i && (Qd = !0),
            X !== null &&
              (X = X.next =
                {
                  lane: 0,
                  tag: A.tag,
                  payload: A.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var fe = r,
              ge = A;
            I = i;
            var $e = l;
            switch (ge.tag) {
              case 1:
                if (((fe = ge.payload), typeof fe == "function")) {
                  Q = fe.call($e, Q, I);
                  break e;
                }
                Q = fe;
                break e;
              case 3:
                fe.flags = (fe.flags & -65537) | 128;
              case 0:
                if (
                  ((fe = ge.payload),
                  (I = typeof fe == "function" ? fe.call($e, Q, I) : fe),
                  I == null)
                )
                  break e;
                Q = p({}, Q, I);
                break e;
              case 2:
                ua = !0;
            }
          }
          ((I = A.callback),
            I !== null &&
              ((r.flags |= 64),
              Y && (r.flags |= 8192),
              (Y = v.callbacks),
              Y === null ? (v.callbacks = [I]) : Y.push(I)));
        } else
          ((Y = {
            lane: I,
            tag: A.tag,
            payload: A.payload,
            callback: A.callback,
            next: null,
          }),
            X === null ? ((H = X = Y), (N = Q)) : (X = X.next = Y),
            (x |= I));
        if (((A = A.next), A === null)) {
          if (((A = v.shared.pending), A === null)) break;
          ((Y = A),
            (A = Y.next),
            (Y.next = null),
            (v.lastBaseUpdate = Y),
            (v.shared.pending = null));
        }
      } while (!0);
      (X === null && (N = Q),
        (v.baseState = N),
        (v.firstBaseUpdate = H),
        (v.lastBaseUpdate = X),
        y === null && (v.shared.lanes = 0),
        (ha |= x),
        (r.lanes = x),
        (r.memoizedState = Q));
    }
  }
  function I0(r, i) {
    if (typeof r != "function") throw Error(a(191, r));
    r.call(i);
  }
  function $0(r, i) {
    var l = r.callbacks;
    if (l !== null)
      for (r.callbacks = null, r = 0; r < l.length; r++) I0(l[r], i);
  }
  var Xi = P(null),
    lc = P(0);
  function Y0(r, i) {
    ((r = Cr), te(lc, r), te(Xi, i), (Cr = r | i.baseLanes));
  }
  function Wd() {
    (te(lc, Cr), te(Xi, Xi.current));
  }
  function Fd() {
    ((Cr = lc.current), G(Xi), G(lc));
  }
  var yn = P(null),
    Pn = null;
  function sa(r) {
    var i = r.alternate;
    (te(it, it.current & 1),
      te(yn, r),
      Pn === null &&
        (i === null || Xi.current !== null || i.memoizedState !== null) &&
        (Pn = r));
  }
  function Jd(r) {
    (te(it, it.current), te(yn, r), Pn === null && (Pn = r));
  }
  function K0(r) {
    r.tag === 22
      ? (te(it, it.current), te(yn, r), Pn === null && (Pn = r))
      : fa();
  }
  function fa() {
    (te(it, it.current), te(yn, yn.current));
  }
  function pn(r) {
    (G(yn), Pn === r && (Pn = null), G(it));
  }
  var it = P(0);
  function uc(r) {
    for (var i = r; i !== null; ) {
      if (i.tag === 13) {
        var l = i.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || ih(l) || lh(l)))
          return i;
      } else if (
        i.tag === 19 &&
        (i.memoizedProps.revealOrder === "forwards" ||
          i.memoizedProps.revealOrder === "backwards" ||
          i.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          i.memoizedProps.revealOrder === "together")
      ) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        ((i.child.return = i), (i = i.child));
        continue;
      }
      if (i === r) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === r) return null;
        i = i.return;
      }
      ((i.sibling.return = i.return), (i = i.sibling));
    }
    return null;
  }
  var wr = 0,
    Se = null,
    He = null,
    ot = null,
    oc = !1,
    Vi = !1,
    Wa = !1,
    cc = 0,
    cu = 0,
    Zi = null,
    YC = 0;
  function tt() {
    throw Error(a(321));
  }
  function ev(r, i) {
    if (i === null) return !1;
    for (var l = 0; l < i.length && l < r.length; l++)
      if (!hn(r[l], i[l])) return !1;
    return !0;
  }
  function tv(r, i, l, c, v, y) {
    return (
      (wr = y),
      (Se = i),
      (i.memoizedState = null),
      (i.updateQueue = null),
      (i.lanes = 0),
      (L.H = r === null || r.memoizedState === null ? Tb : yv),
      (Wa = !1),
      (y = l(c, v)),
      (Wa = !1),
      Vi && (y = X0(i, l, c, v)),
      G0(r),
      y
    );
  }
  function G0(r) {
    L.H = du;
    var i = He !== null && He.next !== null;
    if (((wr = 0), (ot = He = Se = null), (oc = !1), (cu = 0), (Zi = null), i))
      throw Error(a(300));
    r === null ||
      ct ||
      ((r = r.dependencies), r !== null && Jo(r) && (ct = !0));
  }
  function X0(r, i, l, c) {
    Se = r;
    var v = 0;
    do {
      if ((Vi && (Zi = null), (cu = 0), (Vi = !1), 25 <= v))
        throw Error(a(301));
      if (((v += 1), (ot = He = null), r.updateQueue != null)) {
        var y = r.updateQueue;
        ((y.lastEffect = null),
          (y.events = null),
          (y.stores = null),
          y.memoCache != null && (y.memoCache.index = 0));
      }
      ((L.H = Mb), (y = i(l, c)));
    } while (Vi);
    return y;
  }
  function KC() {
    var r = L.H,
      i = r.useState()[0];
    return (
      (i = typeof i.then == "function" ? su(i) : i),
      (r = r.useState()[0]),
      (He !== null ? He.memoizedState : null) !== r && (Se.flags |= 1024),
      i
    );
  }
  function nv() {
    var r = cc !== 0;
    return ((cc = 0), r);
  }
  function rv(r, i, l) {
    ((i.updateQueue = r.updateQueue), (i.flags &= -2053), (r.lanes &= ~l));
  }
  function av(r) {
    if (oc) {
      for (r = r.memoizedState; r !== null; ) {
        var i = r.queue;
        (i !== null && (i.pending = null), (r = r.next));
      }
      oc = !1;
    }
    ((wr = 0), (ot = He = Se = null), (Vi = !1), (cu = cc = 0), (Zi = null));
  }
  function Kt() {
    var r = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ot === null ? (Se.memoizedState = ot = r) : (ot = ot.next = r), ot);
  }
  function lt() {
    if (He === null) {
      var r = Se.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = He.next;
    var i = ot === null ? Se.memoizedState : ot.next;
    if (i !== null) ((ot = i), (He = r));
    else {
      if (r === null)
        throw Se.alternate === null ? Error(a(467)) : Error(a(310));
      ((He = r),
        (r = {
          memoizedState: He.memoizedState,
          baseState: He.baseState,
          baseQueue: He.baseQueue,
          queue: He.queue,
          next: null,
        }),
        ot === null ? (Se.memoizedState = ot = r) : (ot = ot.next = r));
    }
    return ot;
  }
  function sc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function su(r) {
    var i = cu;
    return (
      (cu += 1),
      Zi === null && (Zi = []),
      (r = L0(Zi, r, i)),
      (i = Se),
      (ot === null ? i.memoizedState : ot.next) === null &&
        ((i = i.alternate),
        (L.H = i === null || i.memoizedState === null ? Tb : yv)),
      r
    );
  }
  function fc(r) {
    if (r !== null && typeof r == "object") {
      if (typeof r.then == "function") return su(r);
      if (r.$$typeof === T) return Nt(r);
    }
    throw Error(a(438, String(r)));
  }
  function iv(r) {
    var i = null,
      l = Se.updateQueue;
    if ((l !== null && (i = l.memoCache), i == null)) {
      var c = Se.alternate;
      c !== null &&
        ((c = c.updateQueue),
        c !== null &&
          ((c = c.memoCache),
          c != null &&
            (i = {
              data: c.data.map(function (v) {
                return v.slice();
              }),
              index: 0,
            })));
    }
    if (
      (i == null && (i = { data: [], index: 0 }),
      l === null && ((l = sc()), (Se.updateQueue = l)),
      (l.memoCache = i),
      (l = i.data[i.index]),
      l === void 0)
    )
      for (l = i.data[i.index] = Array(r), c = 0; c < r; c++) l[c] = ae;
    return (i.index++, l);
  }
  function Or(r, i) {
    return typeof i == "function" ? i(r) : i;
  }
  function dc(r) {
    var i = lt();
    return lv(i, He, r);
  }
  function lv(r, i, l) {
    var c = r.queue;
    if (c === null) throw Error(a(311));
    c.lastRenderedReducer = l;
    var v = r.baseQueue,
      y = c.pending;
    if (y !== null) {
      if (v !== null) {
        var x = v.next;
        ((v.next = y.next), (y.next = x));
      }
      ((i.baseQueue = v = y), (c.pending = null));
    }
    if (((y = r.baseState), v === null)) r.memoizedState = y;
    else {
      i = v.next;
      var A = (x = null),
        N = null,
        H = i,
        X = !1;
      do {
        var Q = H.lane & -536870913;
        if (Q !== H.lane ? (je & Q) === Q : (wr & Q) === Q) {
          var I = H.revertLane;
          if (I === 0)
            (N !== null &&
              (N = N.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: H.action,
                  hasEagerState: H.hasEagerState,
                  eagerState: H.eagerState,
                  next: null,
                }),
              Q === $i && (X = !0));
          else if ((wr & I) === I) {
            ((H = H.next), I === $i && (X = !0));
            continue;
          } else
            ((Q = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null,
            }),
              N === null ? ((A = N = Q), (x = y)) : (N = N.next = Q),
              (Se.lanes |= I),
              (ha |= I));
          ((Q = H.action),
            Wa && l(y, Q),
            (y = H.hasEagerState ? H.eagerState : l(y, Q)));
        } else
          ((I = {
            lane: Q,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null,
          }),
            N === null ? ((A = N = I), (x = y)) : (N = N.next = I),
            (Se.lanes |= Q),
            (ha |= Q));
        H = H.next;
      } while (H !== null && H !== i);
      if (
        (N === null ? (x = y) : (N.next = A),
        !hn(y, r.memoizedState) && ((ct = !0), X && ((l = Yi), l !== null)))
      )
        throw l;
      ((r.memoizedState = y),
        (r.baseState = x),
        (r.baseQueue = N),
        (c.lastRenderedState = y));
    }
    return (v === null && (c.lanes = 0), [r.memoizedState, c.dispatch]);
  }
  function uv(r) {
    var i = lt(),
      l = i.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = r;
    var c = l.dispatch,
      v = l.pending,
      y = i.memoizedState;
    if (v !== null) {
      l.pending = null;
      var x = (v = v.next);
      do ((y = r(y, x.action)), (x = x.next));
      while (x !== v);
      (hn(y, i.memoizedState) || (ct = !0),
        (i.memoizedState = y),
        i.baseQueue === null && (i.baseState = y),
        (l.lastRenderedState = y));
    }
    return [y, c];
  }
  function V0(r, i, l) {
    var c = Se,
      v = lt(),
      y = Me;
    if (y) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = i();
    var x = !hn((He || v).memoizedState, l);
    if (
      (x && ((v.memoizedState = l), (ct = !0)),
      (v = v.queue),
      sv(W0.bind(null, c, v, r), [r]),
      v.getSnapshot !== i || x || (ot !== null && ot.memoizedState.tag & 1))
    ) {
      if (
        ((c.flags |= 2048),
        Qi(9, { destroy: void 0 }, Q0.bind(null, c, v, l, i), null),
        Ye === null)
      )
        throw Error(a(349));
      y || (wr & 127) !== 0 || Z0(c, i, l);
    }
    return l;
  }
  function Z0(r, i, l) {
    ((r.flags |= 16384),
      (r = { getSnapshot: i, value: l }),
      (i = Se.updateQueue),
      i === null
        ? ((i = sc()), (Se.updateQueue = i), (i.stores = [r]))
        : ((l = i.stores), l === null ? (i.stores = [r]) : l.push(r)));
  }
  function Q0(r, i, l, c) {
    ((i.value = l), (i.getSnapshot = c), F0(i) && J0(r));
  }
  function W0(r, i, l) {
    return l(function () {
      F0(i) && J0(r);
    });
  }
  function F0(r) {
    var i = r.getSnapshot;
    r = r.value;
    try {
      var l = i();
      return !hn(r, l);
    } catch {
      return !0;
    }
  }
  function J0(r) {
    var i = Ia(r, 2);
    i !== null && rn(i, r, 2);
  }
  function ov(r) {
    var i = Kt();
    if (typeof r == "function") {
      var l = r;
      if (((r = l()), Wa)) {
        ea(!0);
        try {
          l();
        } finally {
          ea(!1);
        }
      }
    }
    return (
      (i.memoizedState = i.baseState = r),
      (i.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Or,
        lastRenderedState: r,
      }),
      i
    );
  }
  function eb(r, i, l, c) {
    return ((r.baseState = l), lv(r, He, typeof c == "function" ? c : Or));
  }
  function GC(r, i, l, c, v) {
    if (mc(r)) throw Error(a(485));
    if (((r = i.action), r !== null)) {
      var y = {
        payload: v,
        action: r,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (x) {
          y.listeners.push(x);
        },
      };
      (L.T !== null ? l(!0) : (y.isTransition = !1),
        c(y),
        (l = i.pending),
        l === null
          ? ((y.next = i.pending = y), tb(i, y))
          : ((y.next = l.next), (i.pending = l.next = y)));
    }
  }
  function tb(r, i) {
    var l = i.action,
      c = i.payload,
      v = r.state;
    if (i.isTransition) {
      var y = L.T,
        x = {};
      L.T = x;
      try {
        var A = l(v, c),
          N = L.S;
        (N !== null && N(x, A), nb(r, i, A));
      } catch (H) {
        cv(r, i, H);
      } finally {
        (y !== null && x.types !== null && (y.types = x.types), (L.T = y));
      }
    } else
      try {
        ((y = l(v, c)), nb(r, i, y));
      } catch (H) {
        cv(r, i, H);
      }
  }
  function nb(r, i, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (c) {
            rb(r, i, c);
          },
          function (c) {
            return cv(r, i, c);
          },
        )
      : rb(r, i, l);
  }
  function rb(r, i, l) {
    ((i.status = "fulfilled"),
      (i.value = l),
      ab(i),
      (r.state = l),
      (i = r.pending),
      i !== null &&
        ((l = i.next),
        l === i ? (r.pending = null) : ((l = l.next), (i.next = l), tb(r, l))));
  }
  function cv(r, i, l) {
    var c = r.pending;
    if (((r.pending = null), c !== null)) {
      c = c.next;
      do ((i.status = "rejected"), (i.reason = l), ab(i), (i = i.next));
      while (i !== c);
    }
    r.action = null;
  }
  function ab(r) {
    r = r.listeners;
    for (var i = 0; i < r.length; i++) (0, r[i])();
  }
  function ib(r, i) {
    return i;
  }
  function lb(r, i) {
    if (Me) {
      var l = Ye.formState;
      if (l !== null) {
        e: {
          var c = Se;
          if (Me) {
            if (Ve) {
              t: {
                for (var v = Ve, y = Nn; v.nodeType !== 8; ) {
                  if (!y) {
                    v = null;
                    break t;
                  }
                  if (((v = zn(v.nextSibling)), v === null)) {
                    v = null;
                    break t;
                  }
                }
                ((y = v.data), (v = y === "F!" || y === "F" ? v : null));
              }
              if (v) {
                ((Ve = zn(v.nextSibling)), (c = v.data === "F!"));
                break e;
              }
            }
            ia(c);
          }
          c = !1;
        }
        c && (i = l[0]);
      }
    }
    return (
      (l = Kt()),
      (l.memoizedState = l.baseState = i),
      (c = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ib,
        lastRenderedState: i,
      }),
      (l.queue = c),
      (l = Ab.bind(null, Se, c)),
      (c.dispatch = l),
      (c = ov(!1)),
      (y = mv.bind(null, Se, !1, c.queue)),
      (c = Kt()),
      (v = { state: i, dispatch: null, action: r, pending: null }),
      (c.queue = v),
      (l = GC.bind(null, Se, v, y, l)),
      (v.dispatch = l),
      (c.memoizedState = r),
      [i, l, !1]
    );
  }
  function ub(r) {
    var i = lt();
    return ob(i, He, r);
  }
  function ob(r, i, l) {
    if (
      ((i = lv(r, i, ib)[0]),
      (r = dc(Or)[0]),
      typeof i == "object" && i !== null && typeof i.then == "function")
    )
      try {
        var c = su(i);
      } catch (x) {
        throw x === Ki ? nc : x;
      }
    else c = i;
    i = lt();
    var v = i.queue,
      y = v.dispatch;
    return (
      l !== i.memoizedState &&
        ((Se.flags |= 2048),
        Qi(9, { destroy: void 0 }, XC.bind(null, v, l), null)),
      [c, y, r]
    );
  }
  function XC(r, i) {
    r.action = i;
  }
  function cb(r) {
    var i = lt(),
      l = He;
    if (l !== null) return ob(i, l, r);
    (lt(), (i = i.memoizedState), (l = lt()));
    var c = l.queue.dispatch;
    return ((l.memoizedState = r), [i, c, !1]);
  }
  function Qi(r, i, l, c) {
    return (
      (r = { tag: r, create: l, deps: c, inst: i, next: null }),
      (i = Se.updateQueue),
      i === null && ((i = sc()), (Se.updateQueue = i)),
      (l = i.lastEffect),
      l === null
        ? (i.lastEffect = r.next = r)
        : ((c = l.next), (l.next = r), (r.next = c), (i.lastEffect = r)),
      r
    );
  }
  function sb() {
    return lt().memoizedState;
  }
  function vc(r, i, l, c) {
    var v = Kt();
    ((Se.flags |= r),
      (v.memoizedState = Qi(
        1 | i,
        { destroy: void 0 },
        l,
        c === void 0 ? null : c,
      )));
  }
  function hc(r, i, l, c) {
    var v = lt();
    c = c === void 0 ? null : c;
    var y = v.memoizedState.inst;
    He !== null && c !== null && ev(c, He.memoizedState.deps)
      ? (v.memoizedState = Qi(i, y, l, c))
      : ((Se.flags |= r), (v.memoizedState = Qi(1 | i, y, l, c)));
  }
  function fb(r, i) {
    vc(8390656, 8, r, i);
  }
  function sv(r, i) {
    hc(2048, 8, r, i);
  }
  function VC(r) {
    Se.flags |= 4;
    var i = Se.updateQueue;
    if (i === null) ((i = sc()), (Se.updateQueue = i), (i.events = [r]));
    else {
      var l = i.events;
      l === null ? (i.events = [r]) : l.push(r);
    }
  }
  function db(r) {
    var i = lt().memoizedState;
    return (
      VC({ ref: i, nextImpl: r }),
      function () {
        if ((Le & 2) !== 0) throw Error(a(440));
        return i.impl.apply(void 0, arguments);
      }
    );
  }
  function vb(r, i) {
    return hc(4, 2, r, i);
  }
  function hb(r, i) {
    return hc(4, 4, r, i);
  }
  function mb(r, i) {
    if (typeof i == "function") {
      r = r();
      var l = i(r);
      return function () {
        typeof l == "function" ? l() : i(null);
      };
    }
    if (i != null)
      return (
        (r = r()),
        (i.current = r),
        function () {
          i.current = null;
        }
      );
  }
  function yb(r, i, l) {
    ((l = l != null ? l.concat([r]) : null), hc(4, 4, mb.bind(null, i, r), l));
  }
  function fv() {}
  function pb(r, i) {
    var l = lt();
    i = i === void 0 ? null : i;
    var c = l.memoizedState;
    return i !== null && ev(i, c[1]) ? c[0] : ((l.memoizedState = [r, i]), r);
  }
  function gb(r, i) {
    var l = lt();
    i = i === void 0 ? null : i;
    var c = l.memoizedState;
    if (i !== null && ev(i, c[1])) return c[0];
    if (((c = r()), Wa)) {
      ea(!0);
      try {
        r();
      } finally {
        ea(!1);
      }
    }
    return ((l.memoizedState = [c, i]), c);
  }
  function dv(r, i, l) {
    return l === void 0 || ((wr & 1073741824) !== 0 && (je & 261930) === 0)
      ? (r.memoizedState = i)
      : ((r.memoizedState = l), (r = b1()), (Se.lanes |= r), (ha |= r), l);
  }
  function bb(r, i, l, c) {
    return hn(l, i)
      ? l
      : Xi.current !== null
        ? ((r = dv(r, l, c)), hn(r, i) || (ct = !0), r)
        : (wr & 42) === 0 || ((wr & 1073741824) !== 0 && (je & 261930) === 0)
          ? ((ct = !0), (r.memoizedState = l))
          : ((r = b1()), (Se.lanes |= r), (ha |= r), i);
  }
  function xb(r, i, l, c, v) {
    var y = W.p;
    W.p = y !== 0 && 8 > y ? y : 8;
    var x = L.T,
      A = {};
    ((L.T = A), mv(r, !1, i, l));
    try {
      var N = v(),
        H = L.S;
      if (
        (H !== null && H(A, N),
        N !== null && typeof N == "object" && typeof N.then == "function")
      ) {
        var X = $C(N, c);
        fu(r, i, X, xn(r));
      } else fu(r, i, c, xn(r));
    } catch (Q) {
      fu(r, i, { then: function () {}, status: "rejected", reason: Q }, xn());
    } finally {
      ((W.p = y),
        x !== null && A.types !== null && (x.types = A.types),
        (L.T = x));
    }
  }
  function ZC() {}
  function vv(r, i, l, c) {
    if (r.tag !== 5) throw Error(a(476));
    var v = Sb(r).queue;
    xb(
      r,
      v,
      i,
      ue,
      l === null
        ? ZC
        : function () {
            return (wb(r), l(c));
          },
    );
  }
  function Sb(r) {
    var i = r.memoizedState;
    if (i !== null) return i;
    i = {
      memoizedState: ue,
      baseState: ue,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Or,
        lastRenderedState: ue,
      },
      next: null,
    };
    var l = {};
    return (
      (i.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Or,
          lastRenderedState: l,
        },
        next: null,
      }),
      (r.memoizedState = i),
      (r = r.alternate),
      r !== null && (r.memoizedState = i),
      i
    );
  }
  function wb(r) {
    var i = Sb(r);
    (i.next === null && (i = r.alternate.memoizedState),
      fu(r, i.next.queue, {}, xn()));
  }
  function hv() {
    return Nt(Tu);
  }
  function Ob() {
    return lt().memoizedState;
  }
  function _b() {
    return lt().memoizedState;
  }
  function QC(r) {
    for (var i = r.return; i !== null; ) {
      switch (i.tag) {
        case 24:
        case 3:
          var l = xn();
          r = oa(l);
          var c = ca(i, r, l);
          (c !== null && (rn(c, i, l), lu(c, i, l)),
            (i = { cache: $d() }),
            (r.payload = i));
          return;
      }
      i = i.return;
    }
  }
  function WC(r, i, l) {
    var c = xn();
    ((l = {
      lane: c,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      mc(r)
        ? Eb(i, l)
        : ((l = Nd(r, i, l, c)), l !== null && (rn(l, r, c), jb(l, i, c))));
  }
  function Ab(r, i, l) {
    var c = xn();
    fu(r, i, l, c);
  }
  function fu(r, i, l, c) {
    var v = {
      lane: c,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (mc(r)) Eb(i, v);
    else {
      var y = r.alternate;
      if (
        r.lanes === 0 &&
        (y === null || y.lanes === 0) &&
        ((y = i.lastRenderedReducer), y !== null)
      )
        try {
          var x = i.lastRenderedState,
            A = y(x, l);
          if (((v.hasEagerState = !0), (v.eagerState = A), hn(A, x)))
            return (Zo(r, i, v, 0), Ye === null && Vo(), !1);
        } catch {}
      if (((l = Nd(r, i, v, c)), l !== null))
        return (rn(l, r, c), jb(l, i, c), !0);
    }
    return !1;
  }
  function mv(r, i, l, c) {
    if (
      ((c = {
        lane: 2,
        revertLane: Xv(),
        gesture: null,
        action: c,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      mc(r))
    ) {
      if (i) throw Error(a(479));
    } else ((i = Nd(r, l, c, 2)), i !== null && rn(i, r, 2));
  }
  function mc(r) {
    var i = r.alternate;
    return r === Se || (i !== null && i === Se);
  }
  function Eb(r, i) {
    Vi = oc = !0;
    var l = r.pending;
    (l === null ? (i.next = i) : ((i.next = l.next), (l.next = i)),
      (r.pending = i));
  }
  function jb(r, i, l) {
    if ((l & 4194048) !== 0) {
      var c = i.lanes;
      ((c &= r.pendingLanes), (l |= c), (i.lanes = l), Ng(r, l));
    }
  }
  var du = {
    readContext: Nt,
    use: fc,
    useCallback: tt,
    useContext: tt,
    useEffect: tt,
    useImperativeHandle: tt,
    useLayoutEffect: tt,
    useInsertionEffect: tt,
    useMemo: tt,
    useReducer: tt,
    useRef: tt,
    useState: tt,
    useDebugValue: tt,
    useDeferredValue: tt,
    useTransition: tt,
    useSyncExternalStore: tt,
    useId: tt,
    useHostTransitionStatus: tt,
    useFormState: tt,
    useActionState: tt,
    useOptimistic: tt,
    useMemoCache: tt,
    useCacheRefresh: tt,
  };
  du.useEffectEvent = tt;
  var Tb = {
      readContext: Nt,
      use: fc,
      useCallback: function (r, i) {
        return ((Kt().memoizedState = [r, i === void 0 ? null : i]), r);
      },
      useContext: Nt,
      useEffect: fb,
      useImperativeHandle: function (r, i, l) {
        ((l = l != null ? l.concat([r]) : null),
          vc(4194308, 4, mb.bind(null, i, r), l));
      },
      useLayoutEffect: function (r, i) {
        return vc(4194308, 4, r, i);
      },
      useInsertionEffect: function (r, i) {
        vc(4, 2, r, i);
      },
      useMemo: function (r, i) {
        var l = Kt();
        i = i === void 0 ? null : i;
        var c = r();
        if (Wa) {
          ea(!0);
          try {
            r();
          } finally {
            ea(!1);
          }
        }
        return ((l.memoizedState = [c, i]), c);
      },
      useReducer: function (r, i, l) {
        var c = Kt();
        if (l !== void 0) {
          var v = l(i);
          if (Wa) {
            ea(!0);
            try {
              l(i);
            } finally {
              ea(!1);
            }
          }
        } else v = i;
        return (
          (c.memoizedState = c.baseState = v),
          (r = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: r,
            lastRenderedState: v,
          }),
          (c.queue = r),
          (r = r.dispatch = WC.bind(null, Se, r)),
          [c.memoizedState, r]
        );
      },
      useRef: function (r) {
        var i = Kt();
        return ((r = { current: r }), (i.memoizedState = r));
      },
      useState: function (r) {
        r = ov(r);
        var i = r.queue,
          l = Ab.bind(null, Se, i);
        return ((i.dispatch = l), [r.memoizedState, l]);
      },
      useDebugValue: fv,
      useDeferredValue: function (r, i) {
        var l = Kt();
        return dv(l, r, i);
      },
      useTransition: function () {
        var r = ov(!1);
        return (
          (r = xb.bind(null, Se, r.queue, !0, !1)),
          (Kt().memoizedState = r),
          [!1, r]
        );
      },
      useSyncExternalStore: function (r, i, l) {
        var c = Se,
          v = Kt();
        if (Me) {
          if (l === void 0) throw Error(a(407));
          l = l();
        } else {
          if (((l = i()), Ye === null)) throw Error(a(349));
          (je & 127) !== 0 || Z0(c, i, l);
        }
        v.memoizedState = l;
        var y = { value: l, getSnapshot: i };
        return (
          (v.queue = y),
          fb(W0.bind(null, c, y, r), [r]),
          (c.flags |= 2048),
          Qi(9, { destroy: void 0 }, Q0.bind(null, c, y, l, i), null),
          l
        );
      },
      useId: function () {
        var r = Kt(),
          i = Ye.identifierPrefix;
        if (Me) {
          var l = Jn,
            c = Fn;
          ((l = (c & ~(1 << (32 - vn(c) - 1))).toString(32) + l),
            (i = "_" + i + "R_" + l),
            (l = cc++),
            0 < l && (i += "H" + l.toString(32)),
            (i += "_"));
        } else ((l = YC++), (i = "_" + i + "r_" + l.toString(32) + "_"));
        return (r.memoizedState = i);
      },
      useHostTransitionStatus: hv,
      useFormState: lb,
      useActionState: lb,
      useOptimistic: function (r) {
        var i = Kt();
        i.memoizedState = i.baseState = r;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (i.queue = l),
          (i = mv.bind(null, Se, !0, l)),
          (l.dispatch = i),
          [r, i]
        );
      },
      useMemoCache: iv,
      useCacheRefresh: function () {
        return (Kt().memoizedState = QC.bind(null, Se));
      },
      useEffectEvent: function (r) {
        var i = Kt(),
          l = { impl: r };
        return (
          (i.memoizedState = l),
          function () {
            if ((Le & 2) !== 0) throw Error(a(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    yv = {
      readContext: Nt,
      use: fc,
      useCallback: pb,
      useContext: Nt,
      useEffect: sv,
      useImperativeHandle: yb,
      useInsertionEffect: vb,
      useLayoutEffect: hb,
      useMemo: gb,
      useReducer: dc,
      useRef: sb,
      useState: function () {
        return dc(Or);
      },
      useDebugValue: fv,
      useDeferredValue: function (r, i) {
        var l = lt();
        return bb(l, He.memoizedState, r, i);
      },
      useTransition: function () {
        var r = dc(Or)[0],
          i = lt().memoizedState;
        return [typeof r == "boolean" ? r : su(r), i];
      },
      useSyncExternalStore: V0,
      useId: Ob,
      useHostTransitionStatus: hv,
      useFormState: ub,
      useActionState: ub,
      useOptimistic: function (r, i) {
        var l = lt();
        return eb(l, He, r, i);
      },
      useMemoCache: iv,
      useCacheRefresh: _b,
    };
  yv.useEffectEvent = db;
  var Mb = {
    readContext: Nt,
    use: fc,
    useCallback: pb,
    useContext: Nt,
    useEffect: sv,
    useImperativeHandle: yb,
    useInsertionEffect: vb,
    useLayoutEffect: hb,
    useMemo: gb,
    useReducer: uv,
    useRef: sb,
    useState: function () {
      return uv(Or);
    },
    useDebugValue: fv,
    useDeferredValue: function (r, i) {
      var l = lt();
      return He === null ? dv(l, r, i) : bb(l, He.memoizedState, r, i);
    },
    useTransition: function () {
      var r = uv(Or)[0],
        i = lt().memoizedState;
      return [typeof r == "boolean" ? r : su(r), i];
    },
    useSyncExternalStore: V0,
    useId: Ob,
    useHostTransitionStatus: hv,
    useFormState: cb,
    useActionState: cb,
    useOptimistic: function (r, i) {
      var l = lt();
      return He !== null
        ? eb(l, He, r, i)
        : ((l.baseState = r), [r, l.queue.dispatch]);
    },
    useMemoCache: iv,
    useCacheRefresh: _b,
  };
  Mb.useEffectEvent = db;
  function pv(r, i, l, c) {
    ((i = r.memoizedState),
      (l = l(c, i)),
      (l = l == null ? i : p({}, i, l)),
      (r.memoizedState = l),
      r.lanes === 0 && (r.updateQueue.baseState = l));
  }
  var gv = {
    enqueueSetState: function (r, i, l) {
      r = r._reactInternals;
      var c = xn(),
        v = oa(c);
      ((v.payload = i),
        l != null && (v.callback = l),
        (i = ca(r, v, c)),
        i !== null && (rn(i, r, c), lu(i, r, c)));
    },
    enqueueReplaceState: function (r, i, l) {
      r = r._reactInternals;
      var c = xn(),
        v = oa(c);
      ((v.tag = 1),
        (v.payload = i),
        l != null && (v.callback = l),
        (i = ca(r, v, c)),
        i !== null && (rn(i, r, c), lu(i, r, c)));
    },
    enqueueForceUpdate: function (r, i) {
      r = r._reactInternals;
      var l = xn(),
        c = oa(l);
      ((c.tag = 2),
        i != null && (c.callback = i),
        (i = ca(r, c, l)),
        i !== null && (rn(i, r, l), lu(i, r, l)));
    },
  };
  function Cb(r, i, l, c, v, y, x) {
    return (
      (r = r.stateNode),
      typeof r.shouldComponentUpdate == "function"
        ? r.shouldComponentUpdate(c, y, x)
        : i.prototype && i.prototype.isPureReactComponent
          ? !Fl(l, c) || !Fl(v, y)
          : !0
    );
  }
  function Db(r, i, l, c) {
    ((r = i.state),
      typeof i.componentWillReceiveProps == "function" &&
        i.componentWillReceiveProps(l, c),
      typeof i.UNSAFE_componentWillReceiveProps == "function" &&
        i.UNSAFE_componentWillReceiveProps(l, c),
      i.state !== r && gv.enqueueReplaceState(i, i.state, null));
  }
  function Fa(r, i) {
    var l = i;
    if ("ref" in i) {
      l = {};
      for (var c in i) c !== "ref" && (l[c] = i[c]);
    }
    if ((r = r.defaultProps)) {
      l === i && (l = p({}, l));
      for (var v in r) l[v] === void 0 && (l[v] = r[v]);
    }
    return l;
  }
  function Nb(r) {
    Xo(r);
  }
  function Pb(r) {
    console.error(r);
  }
  function zb(r) {
    Xo(r);
  }
  function yc(r, i) {
    try {
      var l = r.onUncaughtError;
      l(i.value, { componentStack: i.stack });
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  function kb(r, i, l) {
    try {
      var c = r.onCaughtError;
      c(l.value, {
        componentStack: l.stack,
        errorBoundary: i.tag === 1 ? i.stateNode : null,
      });
    } catch (v) {
      setTimeout(function () {
        throw v;
      });
    }
  }
  function bv(r, i, l) {
    return (
      (l = oa(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        yc(r, i);
      }),
      l
    );
  }
  function Rb(r) {
    return ((r = oa(r)), (r.tag = 3), r);
  }
  function Lb(r, i, l, c) {
    var v = l.type.getDerivedStateFromError;
    if (typeof v == "function") {
      var y = c.value;
      ((r.payload = function () {
        return v(y);
      }),
        (r.callback = function () {
          kb(i, l, c);
        }));
    }
    var x = l.stateNode;
    x !== null &&
      typeof x.componentDidCatch == "function" &&
      (r.callback = function () {
        (kb(i, l, c),
          typeof v != "function" &&
            (ma === null ? (ma = new Set([this])) : ma.add(this)));
        var A = c.stack;
        this.componentDidCatch(c.value, {
          componentStack: A !== null ? A : "",
        });
      });
  }
  function FC(r, i, l, c, v) {
    if (
      ((l.flags |= 32768),
      c !== null && typeof c == "object" && typeof c.then == "function")
    ) {
      if (
        ((i = l.alternate),
        i !== null && Ii(i, l, v, !0),
        (l = yn.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Pn === null ? Tc() : l.alternate === null && nt === 0 && (nt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = v),
              c === rc
                ? (l.flags |= 16384)
                : ((i = l.updateQueue),
                  i === null ? (l.updateQueue = new Set([c])) : i.add(c),
                  Yv(r, c, v)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              c === rc
                ? (l.flags |= 16384)
                : ((i = l.updateQueue),
                  i === null
                    ? ((i = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([c]),
                      }),
                      (l.updateQueue = i))
                    : ((l = i.retryQueue),
                      l === null ? (i.retryQueue = new Set([c])) : l.add(c)),
                  Yv(r, c, v)),
              !1
            );
        }
        throw Error(a(435, l.tag));
      }
      return (Yv(r, c, v), Tc(), !1);
    }
    if (Me)
      return (
        (i = yn.current),
        i !== null
          ? ((i.flags & 65536) === 0 && (i.flags |= 256),
            (i.flags |= 65536),
            (i.lanes = v),
            c !== Ud && ((r = Error(a(422), { cause: c })), tu(Mn(r, l))))
          : (c !== Ud && ((i = Error(a(423), { cause: c })), tu(Mn(i, l))),
            (r = r.current.alternate),
            (r.flags |= 65536),
            (v &= -v),
            (r.lanes |= v),
            (c = Mn(c, l)),
            (v = bv(r.stateNode, c, v)),
            Zd(r, v),
            nt !== 4 && (nt = 2)),
        !1
      );
    var y = Error(a(520), { cause: c });
    if (
      ((y = Mn(y, l)),
      xu === null ? (xu = [y]) : xu.push(y),
      nt !== 4 && (nt = 2),
      i === null)
    )
      return !0;
    ((c = Mn(c, l)), (l = i));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (r = v & -v),
            (l.lanes |= r),
            (r = bv(l.stateNode, c, r)),
            Zd(l, r),
            !1
          );
        case 1:
          if (
            ((i = l.type),
            (y = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof i.getDerivedStateFromError == "function" ||
                (y !== null &&
                  typeof y.componentDidCatch == "function" &&
                  (ma === null || !ma.has(y)))))
          )
            return (
              (l.flags |= 65536),
              (v &= -v),
              (l.lanes |= v),
              (v = Rb(v)),
              Lb(v, r, l, c),
              Zd(l, v),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var xv = Error(a(461)),
    ct = !1;
  function Pt(r, i, l, c) {
    i.child = r === null ? H0(i, null, l, c) : Qa(i, r.child, l, c);
  }
  function Ub(r, i, l, c, v) {
    l = l.render;
    var y = i.ref;
    if ("ref" in c) {
      var x = {};
      for (var A in c) A !== "ref" && (x[A] = c[A]);
    } else x = c;
    return (
      Ga(i),
      (c = tv(r, i, l, x, y, v)),
      (A = nv()),
      r !== null && !ct
        ? (rv(r, i, v), _r(r, i, v))
        : (Me && A && Rd(i), (i.flags |= 1), Pt(r, i, c, v), i.child)
    );
  }
  function qb(r, i, l, c, v) {
    if (r === null) {
      var y = l.type;
      return typeof y == "function" &&
        !Pd(y) &&
        y.defaultProps === void 0 &&
        l.compare === null
        ? ((i.tag = 15), (i.type = y), Bb(r, i, y, c, v))
        : ((r = Wo(l.type, null, c, i, i.mode, v)),
          (r.ref = i.ref),
          (r.return = i),
          (i.child = r));
    }
    if (((y = r.child), !Tv(r, v))) {
      var x = y.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Fl), l(x, c) && r.ref === i.ref)
      )
        return _r(r, i, v);
    }
    return (
      (i.flags |= 1),
      (r = gr(y, c)),
      (r.ref = i.ref),
      (r.return = i),
      (i.child = r)
    );
  }
  function Bb(r, i, l, c, v) {
    if (r !== null) {
      var y = r.memoizedProps;
      if (Fl(y, c) && r.ref === i.ref)
        if (((ct = !1), (i.pendingProps = c = y), Tv(r, v)))
          (r.flags & 131072) !== 0 && (ct = !0);
        else return ((i.lanes = r.lanes), _r(r, i, v));
    }
    return Sv(r, i, l, c, v);
  }
  function Hb(r, i, l, c) {
    var v = c.children,
      y = r !== null ? r.memoizedState : null;
    if (
      (r === null &&
        i.stateNode === null &&
        (i.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      c.mode === "hidden")
    ) {
      if ((i.flags & 128) !== 0) {
        if (((y = y !== null ? y.baseLanes | l : l), r !== null)) {
          for (c = i.child = r.child, v = 0; c !== null; )
            ((v = v | c.lanes | c.childLanes), (c = c.sibling));
          c = v & ~y;
        } else ((c = 0), (i.child = null));
        return Ib(r, i, y, l, c);
      }
      if ((l & 536870912) !== 0)
        ((i.memoizedState = { baseLanes: 0, cachePool: null }),
          r !== null && tc(i, y !== null ? y.cachePool : null),
          y !== null ? Y0(i, y) : Wd(),
          K0(i));
      else
        return (
          (c = i.lanes = 536870912),
          Ib(r, i, y !== null ? y.baseLanes | l : l, l, c)
        );
    } else
      y !== null
        ? (tc(i, y.cachePool), Y0(i, y), fa(), (i.memoizedState = null))
        : (r !== null && tc(i, null), Wd(), fa());
    return (Pt(r, i, v, l), i.child);
  }
  function vu(r, i) {
    return (
      (r !== null && r.tag === 22) ||
        i.stateNode !== null ||
        (i.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      i.sibling
    );
  }
  function Ib(r, i, l, c, v) {
    var y = Kd();
    return (
      (y = y === null ? null : { parent: ut._currentValue, pool: y }),
      (i.memoizedState = { baseLanes: l, cachePool: y }),
      r !== null && tc(i, null),
      Wd(),
      K0(i),
      r !== null && Ii(r, i, c, !0),
      (i.childLanes = v),
      null
    );
  }
  function pc(r, i) {
    return (
      (i = bc({ mode: i.mode, children: i.children }, r.mode)),
      (i.ref = r.ref),
      (r.child = i),
      (i.return = r),
      i
    );
  }
  function $b(r, i, l) {
    return (
      Qa(i, r.child, null, l),
      (r = pc(i, i.pendingProps)),
      (r.flags |= 2),
      pn(i),
      (i.memoizedState = null),
      r
    );
  }
  function JC(r, i, l) {
    var c = i.pendingProps,
      v = (i.flags & 128) !== 0;
    if (((i.flags &= -129), r === null)) {
      if (Me) {
        if (c.mode === "hidden")
          return ((r = pc(i, c)), (i.lanes = 536870912), vu(null, r));
        if (
          (Jd(i),
          (r = Ve)
            ? ((r = tx(r, Nn)),
              (r = r !== null && r.data === "&" ? r : null),
              r !== null &&
                ((i.memoizedState = {
                  dehydrated: r,
                  treeContext: ra !== null ? { id: Fn, overflow: Jn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = E0(r)),
                (l.return = i),
                (i.child = l),
                (Dt = i),
                (Ve = null)))
            : (r = null),
          r === null)
        )
          throw ia(i);
        return ((i.lanes = 536870912), null);
      }
      return pc(i, c);
    }
    var y = r.memoizedState;
    if (y !== null) {
      var x = y.dehydrated;
      if ((Jd(i), v))
        if (i.flags & 256) ((i.flags &= -257), (i = $b(r, i, l)));
        else if (i.memoizedState !== null)
          ((i.child = r.child), (i.flags |= 128), (i = null));
        else throw Error(a(558));
      else if (
        (ct || Ii(r, i, l, !1), (v = (l & r.childLanes) !== 0), ct || v)
      ) {
        if (
          ((c = Ye),
          c !== null && ((x = Pg(c, l)), x !== 0 && x !== y.retryLane))
        )
          throw ((y.retryLane = x), Ia(r, x), rn(c, r, x), xv);
        (Tc(), (i = $b(r, i, l)));
      } else
        ((r = y.treeContext),
          (Ve = zn(x.nextSibling)),
          (Dt = i),
          (Me = !0),
          (aa = null),
          (Nn = !1),
          r !== null && M0(i, r),
          (i = pc(i, c)),
          (i.flags |= 4096));
      return i;
    }
    return (
      (r = gr(r.child, { mode: c.mode, children: c.children })),
      (r.ref = i.ref),
      (i.child = r),
      (r.return = i),
      r
    );
  }
  function gc(r, i) {
    var l = i.ref;
    if (l === null) r !== null && r.ref !== null && (i.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(a(284));
      (r === null || r.ref !== l) && (i.flags |= 4194816);
    }
  }
  function Sv(r, i, l, c, v) {
    return (
      Ga(i),
      (l = tv(r, i, l, c, void 0, v)),
      (c = nv()),
      r !== null && !ct
        ? (rv(r, i, v), _r(r, i, v))
        : (Me && c && Rd(i), (i.flags |= 1), Pt(r, i, l, v), i.child)
    );
  }
  function Yb(r, i, l, c, v, y) {
    return (
      Ga(i),
      (i.updateQueue = null),
      (l = X0(i, c, l, v)),
      G0(r),
      (c = nv()),
      r !== null && !ct
        ? (rv(r, i, y), _r(r, i, y))
        : (Me && c && Rd(i), (i.flags |= 1), Pt(r, i, l, y), i.child)
    );
  }
  function Kb(r, i, l, c, v) {
    if ((Ga(i), i.stateNode === null)) {
      var y = Ui,
        x = l.contextType;
      (typeof x == "object" && x !== null && (y = Nt(x)),
        (y = new l(c, y)),
        (i.memoizedState =
          y.state !== null && y.state !== void 0 ? y.state : null),
        (y.updater = gv),
        (i.stateNode = y),
        (y._reactInternals = i),
        (y = i.stateNode),
        (y.props = c),
        (y.state = i.memoizedState),
        (y.refs = {}),
        Xd(i),
        (x = l.contextType),
        (y.context = typeof x == "object" && x !== null ? Nt(x) : Ui),
        (y.state = i.memoizedState),
        (x = l.getDerivedStateFromProps),
        typeof x == "function" && (pv(i, l, x, c), (y.state = i.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof y.getSnapshotBeforeUpdate == "function" ||
          (typeof y.UNSAFE_componentWillMount != "function" &&
            typeof y.componentWillMount != "function") ||
          ((x = y.state),
          typeof y.componentWillMount == "function" && y.componentWillMount(),
          typeof y.UNSAFE_componentWillMount == "function" &&
            y.UNSAFE_componentWillMount(),
          x !== y.state && gv.enqueueReplaceState(y, y.state, null),
          ou(i, c, y, v),
          uu(),
          (y.state = i.memoizedState)),
        typeof y.componentDidMount == "function" && (i.flags |= 4194308),
        (c = !0));
    } else if (r === null) {
      y = i.stateNode;
      var A = i.memoizedProps,
        N = Fa(l, A);
      y.props = N;
      var H = y.context,
        X = l.contextType;
      ((x = Ui), typeof X == "object" && X !== null && (x = Nt(X)));
      var Q = l.getDerivedStateFromProps;
      ((X =
        typeof Q == "function" ||
        typeof y.getSnapshotBeforeUpdate == "function"),
        (A = i.pendingProps !== A),
        X ||
          (typeof y.UNSAFE_componentWillReceiveProps != "function" &&
            typeof y.componentWillReceiveProps != "function") ||
          ((A || H !== x) && Db(i, y, c, x)),
        (ua = !1));
      var I = i.memoizedState;
      ((y.state = I),
        ou(i, c, y, v),
        uu(),
        (H = i.memoizedState),
        A || I !== H || ua
          ? (typeof Q == "function" && (pv(i, l, Q, c), (H = i.memoizedState)),
            (N = ua || Cb(i, l, N, c, I, H, x))
              ? (X ||
                  (typeof y.UNSAFE_componentWillMount != "function" &&
                    typeof y.componentWillMount != "function") ||
                  (typeof y.componentWillMount == "function" &&
                    y.componentWillMount(),
                  typeof y.UNSAFE_componentWillMount == "function" &&
                    y.UNSAFE_componentWillMount()),
                typeof y.componentDidMount == "function" &&
                  (i.flags |= 4194308))
              : (typeof y.componentDidMount == "function" &&
                  (i.flags |= 4194308),
                (i.memoizedProps = c),
                (i.memoizedState = H)),
            (y.props = c),
            (y.state = H),
            (y.context = x),
            (c = N))
          : (typeof y.componentDidMount == "function" && (i.flags |= 4194308),
            (c = !1)));
    } else {
      ((y = i.stateNode),
        Vd(r, i),
        (x = i.memoizedProps),
        (X = Fa(l, x)),
        (y.props = X),
        (Q = i.pendingProps),
        (I = y.context),
        (H = l.contextType),
        (N = Ui),
        typeof H == "object" && H !== null && (N = Nt(H)),
        (A = l.getDerivedStateFromProps),
        (H =
          typeof A == "function" ||
          typeof y.getSnapshotBeforeUpdate == "function") ||
          (typeof y.UNSAFE_componentWillReceiveProps != "function" &&
            typeof y.componentWillReceiveProps != "function") ||
          ((x !== Q || I !== N) && Db(i, y, c, N)),
        (ua = !1),
        (I = i.memoizedState),
        (y.state = I),
        ou(i, c, y, v),
        uu());
      var Y = i.memoizedState;
      x !== Q ||
      I !== Y ||
      ua ||
      (r !== null && r.dependencies !== null && Jo(r.dependencies))
        ? (typeof A == "function" && (pv(i, l, A, c), (Y = i.memoizedState)),
          (X =
            ua ||
            Cb(i, l, X, c, I, Y, N) ||
            (r !== null && r.dependencies !== null && Jo(r.dependencies)))
            ? (H ||
                (typeof y.UNSAFE_componentWillUpdate != "function" &&
                  typeof y.componentWillUpdate != "function") ||
                (typeof y.componentWillUpdate == "function" &&
                  y.componentWillUpdate(c, Y, N),
                typeof y.UNSAFE_componentWillUpdate == "function" &&
                  y.UNSAFE_componentWillUpdate(c, Y, N)),
              typeof y.componentDidUpdate == "function" && (i.flags |= 4),
              typeof y.getSnapshotBeforeUpdate == "function" &&
                (i.flags |= 1024))
            : (typeof y.componentDidUpdate != "function" ||
                (x === r.memoizedProps && I === r.memoizedState) ||
                (i.flags |= 4),
              typeof y.getSnapshotBeforeUpdate != "function" ||
                (x === r.memoizedProps && I === r.memoizedState) ||
                (i.flags |= 1024),
              (i.memoizedProps = c),
              (i.memoizedState = Y)),
          (y.props = c),
          (y.state = Y),
          (y.context = N),
          (c = X))
        : (typeof y.componentDidUpdate != "function" ||
            (x === r.memoizedProps && I === r.memoizedState) ||
            (i.flags |= 4),
          typeof y.getSnapshotBeforeUpdate != "function" ||
            (x === r.memoizedProps && I === r.memoizedState) ||
            (i.flags |= 1024),
          (c = !1));
    }
    return (
      (y = c),
      gc(r, i),
      (c = (i.flags & 128) !== 0),
      y || c
        ? ((y = i.stateNode),
          (l =
            c && typeof l.getDerivedStateFromError != "function"
              ? null
              : y.render()),
          (i.flags |= 1),
          r !== null && c
            ? ((i.child = Qa(i, r.child, null, v)),
              (i.child = Qa(i, null, l, v)))
            : Pt(r, i, l, v),
          (i.memoizedState = y.state),
          (r = i.child))
        : (r = _r(r, i, v)),
      r
    );
  }
  function Gb(r, i, l, c) {
    return (Ya(), (i.flags |= 256), Pt(r, i, l, c), i.child);
  }
  var wv = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Ov(r) {
    return { baseLanes: r, cachePool: k0() };
  }
  function _v(r, i, l) {
    return ((r = r !== null ? r.childLanes & ~l : 0), i && (r |= bn), r);
  }
  function Xb(r, i, l) {
    var c = i.pendingProps,
      v = !1,
      y = (i.flags & 128) !== 0,
      x;
    if (
      ((x = y) ||
        (x =
          r !== null && r.memoizedState === null ? !1 : (it.current & 2) !== 0),
      x && ((v = !0), (i.flags &= -129)),
      (x = (i.flags & 32) !== 0),
      (i.flags &= -33),
      r === null)
    ) {
      if (Me) {
        if (
          (v ? sa(i) : fa(),
          (r = Ve)
            ? ((r = tx(r, Nn)),
              (r = r !== null && r.data !== "&" ? r : null),
              r !== null &&
                ((i.memoizedState = {
                  dehydrated: r,
                  treeContext: ra !== null ? { id: Fn, overflow: Jn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = E0(r)),
                (l.return = i),
                (i.child = l),
                (Dt = i),
                (Ve = null)))
            : (r = null),
          r === null)
        )
          throw ia(i);
        return (lh(r) ? (i.lanes = 32) : (i.lanes = 536870912), null);
      }
      var A = c.children;
      return (
        (c = c.fallback),
        v
          ? (fa(),
            (v = i.mode),
            (A = bc({ mode: "hidden", children: A }, v)),
            (c = $a(c, v, l, null)),
            (A.return = i),
            (c.return = i),
            (A.sibling = c),
            (i.child = A),
            (c = i.child),
            (c.memoizedState = Ov(l)),
            (c.childLanes = _v(r, x, l)),
            (i.memoizedState = wv),
            vu(null, c))
          : (sa(i), Av(i, A))
      );
    }
    var N = r.memoizedState;
    if (N !== null && ((A = N.dehydrated), A !== null)) {
      if (y)
        i.flags & 256
          ? (sa(i), (i.flags &= -257), (i = Ev(r, i, l)))
          : i.memoizedState !== null
            ? (fa(), (i.child = r.child), (i.flags |= 128), (i = null))
            : (fa(),
              (A = c.fallback),
              (v = i.mode),
              (c = bc({ mode: "visible", children: c.children }, v)),
              (A = $a(A, v, l, null)),
              (A.flags |= 2),
              (c.return = i),
              (A.return = i),
              (c.sibling = A),
              (i.child = c),
              Qa(i, r.child, null, l),
              (c = i.child),
              (c.memoizedState = Ov(l)),
              (c.childLanes = _v(r, x, l)),
              (i.memoizedState = wv),
              (i = vu(null, c)));
      else if ((sa(i), lh(A))) {
        if (((x = A.nextSibling && A.nextSibling.dataset), x)) var H = x.dgst;
        ((x = H),
          (c = Error(a(419))),
          (c.stack = ""),
          (c.digest = x),
          tu({ value: c, source: null, stack: null }),
          (i = Ev(r, i, l)));
      } else if (
        (ct || Ii(r, i, l, !1), (x = (l & r.childLanes) !== 0), ct || x)
      ) {
        if (
          ((x = Ye),
          x !== null && ((c = Pg(x, l)), c !== 0 && c !== N.retryLane))
        )
          throw ((N.retryLane = c), Ia(r, c), rn(x, r, c), xv);
        (ih(A) || Tc(), (i = Ev(r, i, l)));
      } else
        ih(A)
          ? ((i.flags |= 192), (i.child = r.child), (i = null))
          : ((r = N.treeContext),
            (Ve = zn(A.nextSibling)),
            (Dt = i),
            (Me = !0),
            (aa = null),
            (Nn = !1),
            r !== null && M0(i, r),
            (i = Av(i, c.children)),
            (i.flags |= 4096));
      return i;
    }
    return v
      ? (fa(),
        (A = c.fallback),
        (v = i.mode),
        (N = r.child),
        (H = N.sibling),
        (c = gr(N, { mode: "hidden", children: c.children })),
        (c.subtreeFlags = N.subtreeFlags & 65011712),
        H !== null ? (A = gr(H, A)) : ((A = $a(A, v, l, null)), (A.flags |= 2)),
        (A.return = i),
        (c.return = i),
        (c.sibling = A),
        (i.child = c),
        vu(null, c),
        (c = i.child),
        (A = r.child.memoizedState),
        A === null
          ? (A = Ov(l))
          : ((v = A.cachePool),
            v !== null
              ? ((N = ut._currentValue),
                (v = v.parent !== N ? { parent: N, pool: N } : v))
              : (v = k0()),
            (A = { baseLanes: A.baseLanes | l, cachePool: v })),
        (c.memoizedState = A),
        (c.childLanes = _v(r, x, l)),
        (i.memoizedState = wv),
        vu(r.child, c))
      : (sa(i),
        (l = r.child),
        (r = l.sibling),
        (l = gr(l, { mode: "visible", children: c.children })),
        (l.return = i),
        (l.sibling = null),
        r !== null &&
          ((x = i.deletions),
          x === null ? ((i.deletions = [r]), (i.flags |= 16)) : x.push(r)),
        (i.child = l),
        (i.memoizedState = null),
        l);
  }
  function Av(r, i) {
    return (
      (i = bc({ mode: "visible", children: i }, r.mode)),
      (i.return = r),
      (r.child = i)
    );
  }
  function bc(r, i) {
    return ((r = mn(22, r, null, i)), (r.lanes = 0), r);
  }
  function Ev(r, i, l) {
    return (
      Qa(i, r.child, null, l),
      (r = Av(i, i.pendingProps.children)),
      (r.flags |= 2),
      (i.memoizedState = null),
      r
    );
  }
  function Vb(r, i, l) {
    r.lanes |= i;
    var c = r.alternate;
    (c !== null && (c.lanes |= i), Hd(r.return, i, l));
  }
  function jv(r, i, l, c, v, y) {
    var x = r.memoizedState;
    x === null
      ? (r.memoizedState = {
          isBackwards: i,
          rendering: null,
          renderingStartTime: 0,
          last: c,
          tail: l,
          tailMode: v,
          treeForkCount: y,
        })
      : ((x.isBackwards = i),
        (x.rendering = null),
        (x.renderingStartTime = 0),
        (x.last = c),
        (x.tail = l),
        (x.tailMode = v),
        (x.treeForkCount = y));
  }
  function Zb(r, i, l) {
    var c = i.pendingProps,
      v = c.revealOrder,
      y = c.tail;
    c = c.children;
    var x = it.current,
      A = (x & 2) !== 0;
    if (
      (A ? ((x = (x & 1) | 2), (i.flags |= 128)) : (x &= 1),
      te(it, x),
      Pt(r, i, c, l),
      (c = Me ? eu : 0),
      !A && r !== null && (r.flags & 128) !== 0)
    )
      e: for (r = i.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && Vb(r, l, i);
        else if (r.tag === 19) Vb(r, l, i);
        else if (r.child !== null) {
          ((r.child.return = r), (r = r.child));
          continue;
        }
        if (r === i) break e;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === i) break e;
          r = r.return;
        }
        ((r.sibling.return = r.return), (r = r.sibling));
      }
    switch (v) {
      case "forwards":
        for (l = i.child, v = null; l !== null; )
          ((r = l.alternate),
            r !== null && uc(r) === null && (v = l),
            (l = l.sibling));
        ((l = v),
          l === null
            ? ((v = i.child), (i.child = null))
            : ((v = l.sibling), (l.sibling = null)),
          jv(i, !1, v, l, y, c));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, v = i.child, i.child = null; v !== null; ) {
          if (((r = v.alternate), r !== null && uc(r) === null)) {
            i.child = v;
            break;
          }
          ((r = v.sibling), (v.sibling = l), (l = v), (v = r));
        }
        jv(i, !0, l, null, y, c);
        break;
      case "together":
        jv(i, !1, null, null, void 0, c);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function _r(r, i, l) {
    if (
      (r !== null && (i.dependencies = r.dependencies),
      (ha |= i.lanes),
      (l & i.childLanes) === 0)
    )
      if (r !== null) {
        if ((Ii(r, i, l, !1), (l & i.childLanes) === 0)) return null;
      } else return null;
    if (r !== null && i.child !== r.child) throw Error(a(153));
    if (i.child !== null) {
      for (
        r = i.child, l = gr(r, r.pendingProps), i.child = l, l.return = i;
        r.sibling !== null;
      )
        ((r = r.sibling),
          (l = l.sibling = gr(r, r.pendingProps)),
          (l.return = i));
      l.sibling = null;
    }
    return i.child;
  }
  function Tv(r, i) {
    return (r.lanes & i) !== 0
      ? !0
      : ((r = r.dependencies), !!(r !== null && Jo(r)));
  }
  function eD(r, i, l) {
    switch (i.tag) {
      case 3:
        (Ue(i, i.stateNode.containerInfo),
          la(i, ut, r.memoizedState.cache),
          Ya());
        break;
      case 27:
      case 5:
        le(i);
        break;
      case 4:
        Ue(i, i.stateNode.containerInfo);
        break;
      case 10:
        la(i, i.type, i.memoizedProps.value);
        break;
      case 31:
        if (i.memoizedState !== null) return ((i.flags |= 128), Jd(i), null);
        break;
      case 13:
        var c = i.memoizedState;
        if (c !== null)
          return c.dehydrated !== null
            ? (sa(i), (i.flags |= 128), null)
            : (l & i.child.childLanes) !== 0
              ? Xb(r, i, l)
              : (sa(i), (r = _r(r, i, l)), r !== null ? r.sibling : null);
        sa(i);
        break;
      case 19:
        var v = (r.flags & 128) !== 0;
        if (
          ((c = (l & i.childLanes) !== 0),
          c || (Ii(r, i, l, !1), (c = (l & i.childLanes) !== 0)),
          v)
        ) {
          if (c) return Zb(r, i, l);
          i.flags |= 128;
        }
        if (
          ((v = i.memoizedState),
          v !== null &&
            ((v.rendering = null), (v.tail = null), (v.lastEffect = null)),
          te(it, it.current),
          c)
        )
          break;
        return null;
      case 22:
        return ((i.lanes = 0), Hb(r, i, l, i.pendingProps));
      case 24:
        la(i, ut, r.memoizedState.cache);
    }
    return _r(r, i, l);
  }
  function Qb(r, i, l) {
    if (r !== null)
      if (r.memoizedProps !== i.pendingProps) ct = !0;
      else {
        if (!Tv(r, l) && (i.flags & 128) === 0) return ((ct = !1), eD(r, i, l));
        ct = (r.flags & 131072) !== 0;
      }
    else ((ct = !1), Me && (i.flags & 1048576) !== 0 && T0(i, eu, i.index));
    switch (((i.lanes = 0), i.tag)) {
      case 16:
        e: {
          var c = i.pendingProps;
          if (((r = Va(i.elementType)), (i.type = r), typeof r == "function"))
            Pd(r)
              ? ((c = Fa(r, c)), (i.tag = 1), (i = Kb(null, i, r, c, l)))
              : ((i.tag = 0), (i = Sv(null, i, r, c, l)));
          else {
            if (r != null) {
              var v = r.$$typeof;
              if (v === D) {
                ((i.tag = 11), (i = Ub(null, i, r, c, l)));
                break e;
              } else if (v === U) {
                ((i.tag = 14), (i = qb(null, i, r, c, l)));
                break e;
              }
            }
            throw ((i = re(r) || r), Error(a(306, i, "")));
          }
        }
        return i;
      case 0:
        return Sv(r, i, i.type, i.pendingProps, l);
      case 1:
        return ((c = i.type), (v = Fa(c, i.pendingProps)), Kb(r, i, c, v, l));
      case 3:
        e: {
          if ((Ue(i, i.stateNode.containerInfo), r === null))
            throw Error(a(387));
          c = i.pendingProps;
          var y = i.memoizedState;
          ((v = y.element), Vd(r, i), ou(i, c, null, l));
          var x = i.memoizedState;
          if (
            ((c = x.cache),
            la(i, ut, c),
            c !== y.cache && Id(i, [ut], l, !0),
            uu(),
            (c = x.element),
            y.isDehydrated)
          )
            if (
              ((y = { element: c, isDehydrated: !1, cache: x.cache }),
              (i.updateQueue.baseState = y),
              (i.memoizedState = y),
              i.flags & 256)
            ) {
              i = Gb(r, i, c, l);
              break e;
            } else if (c !== v) {
              ((v = Mn(Error(a(424)), i)), tu(v), (i = Gb(r, i, c, l)));
              break e;
            } else
              for (
                r = i.stateNode.containerInfo,
                  r.nodeType === 9
                    ? (r = r.body)
                    : (r = r.nodeName === "HTML" ? r.ownerDocument.body : r),
                  Ve = zn(r.firstChild),
                  Dt = i,
                  Me = !0,
                  aa = null,
                  Nn = !0,
                  l = H0(i, null, c, l),
                  i.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((Ya(), c === v)) {
              i = _r(r, i, l);
              break e;
            }
            Pt(r, i, c, l);
          }
          i = i.child;
        }
        return i;
      case 26:
        return (
          gc(r, i),
          r === null
            ? (l = ux(i.type, null, i.pendingProps, null))
              ? (i.memoizedState = l)
              : Me ||
                ((l = i.type),
                (r = i.pendingProps),
                (c = kc(xe.current).createElement(l)),
                (c[Ct] = i),
                (c[Wt] = r),
                zt(c, l, r),
                bt(c),
                (i.stateNode = c))
            : (i.memoizedState = ux(
                i.type,
                r.memoizedProps,
                i.pendingProps,
                r.memoizedState,
              )),
          null
        );
      case 27:
        return (
          le(i),
          r === null &&
            Me &&
            ((c = i.stateNode = ax(i.type, i.pendingProps, xe.current)),
            (Dt = i),
            (Nn = !0),
            (v = Ve),
            ba(i.type) ? ((uh = v), (Ve = zn(c.firstChild))) : (Ve = v)),
          Pt(r, i, i.pendingProps.children, l),
          gc(r, i),
          r === null && (i.flags |= 4194304),
          i.child
        );
      case 5:
        return (
          r === null &&
            Me &&
            ((v = c = Ve) &&
              ((c = CD(c, i.type, i.pendingProps, Nn)),
              c !== null
                ? ((i.stateNode = c),
                  (Dt = i),
                  (Ve = zn(c.firstChild)),
                  (Nn = !1),
                  (v = !0))
                : (v = !1)),
            v || ia(i)),
          le(i),
          (v = i.type),
          (y = i.pendingProps),
          (x = r !== null ? r.memoizedProps : null),
          (c = y.children),
          nh(v, y) ? (c = null) : x !== null && nh(v, x) && (i.flags |= 32),
          i.memoizedState !== null &&
            ((v = tv(r, i, KC, null, null, l)), (Tu._currentValue = v)),
          gc(r, i),
          Pt(r, i, c, l),
          i.child
        );
      case 6:
        return (
          r === null &&
            Me &&
            ((r = l = Ve) &&
              ((l = DD(l, i.pendingProps, Nn)),
              l !== null
                ? ((i.stateNode = l), (Dt = i), (Ve = null), (r = !0))
                : (r = !1)),
            r || ia(i)),
          null
        );
      case 13:
        return Xb(r, i, l);
      case 4:
        return (
          Ue(i, i.stateNode.containerInfo),
          (c = i.pendingProps),
          r === null ? (i.child = Qa(i, null, c, l)) : Pt(r, i, c, l),
          i.child
        );
      case 11:
        return Ub(r, i, i.type, i.pendingProps, l);
      case 7:
        return (Pt(r, i, i.pendingProps, l), i.child);
      case 8:
        return (Pt(r, i, i.pendingProps.children, l), i.child);
      case 12:
        return (Pt(r, i, i.pendingProps.children, l), i.child);
      case 10:
        return (
          (c = i.pendingProps),
          la(i, i.type, c.value),
          Pt(r, i, c.children, l),
          i.child
        );
      case 9:
        return (
          (v = i.type._context),
          (c = i.pendingProps.children),
          Ga(i),
          (v = Nt(v)),
          (c = c(v)),
          (i.flags |= 1),
          Pt(r, i, c, l),
          i.child
        );
      case 14:
        return qb(r, i, i.type, i.pendingProps, l);
      case 15:
        return Bb(r, i, i.type, i.pendingProps, l);
      case 19:
        return Zb(r, i, l);
      case 31:
        return JC(r, i, l);
      case 22:
        return Hb(r, i, l, i.pendingProps);
      case 24:
        return (
          Ga(i),
          (c = Nt(ut)),
          r === null
            ? ((v = Kd()),
              v === null &&
                ((v = Ye),
                (y = $d()),
                (v.pooledCache = y),
                y.refCount++,
                y !== null && (v.pooledCacheLanes |= l),
                (v = y)),
              (i.memoizedState = { parent: c, cache: v }),
              Xd(i),
              la(i, ut, v))
            : ((r.lanes & l) !== 0 && (Vd(r, i), ou(i, null, null, l), uu()),
              (v = r.memoizedState),
              (y = i.memoizedState),
              v.parent !== c
                ? ((v = { parent: c, cache: c }),
                  (i.memoizedState = v),
                  i.lanes === 0 &&
                    (i.memoizedState = i.updateQueue.baseState = v),
                  la(i, ut, c))
                : ((c = y.cache),
                  la(i, ut, c),
                  c !== v.cache && Id(i, [ut], l, !0))),
          Pt(r, i, i.pendingProps.children, l),
          i.child
        );
      case 29:
        throw i.pendingProps;
    }
    throw Error(a(156, i.tag));
  }
  function Ar(r) {
    r.flags |= 4;
  }
  function Mv(r, i, l, c, v) {
    if (((i = (r.mode & 32) !== 0) && (i = !1), i)) {
      if (((r.flags |= 16777216), (v & 335544128) === v))
        if (r.stateNode.complete) r.flags |= 8192;
        else if (O1()) r.flags |= 8192;
        else throw ((Za = rc), Gd);
    } else r.flags &= -16777217;
  }
  function Wb(r, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
      r.flags &= -16777217;
    else if (((r.flags |= 16777216), !dx(i)))
      if (O1()) r.flags |= 8192;
      else throw ((Za = rc), Gd);
  }
  function xc(r, i) {
    (i !== null && (r.flags |= 4),
      r.flags & 16384 &&
        ((i = r.tag !== 22 ? Cg() : 536870912), (r.lanes |= i), (el |= i)));
  }
  function hu(r, i) {
    if (!Me)
      switch (r.tailMode) {
        case "hidden":
          i = r.tail;
          for (var l = null; i !== null; )
            (i.alternate !== null && (l = i), (i = i.sibling));
          l === null ? (r.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = r.tail;
          for (var c = null; l !== null; )
            (l.alternate !== null && (c = l), (l = l.sibling));
          c === null
            ? i || r.tail === null
              ? (r.tail = null)
              : (r.tail.sibling = null)
            : (c.sibling = null);
      }
  }
  function Ze(r) {
    var i = r.alternate !== null && r.alternate.child === r.child,
      l = 0,
      c = 0;
    if (i)
      for (var v = r.child; v !== null; )
        ((l |= v.lanes | v.childLanes),
          (c |= v.subtreeFlags & 65011712),
          (c |= v.flags & 65011712),
          (v.return = r),
          (v = v.sibling));
    else
      for (v = r.child; v !== null; )
        ((l |= v.lanes | v.childLanes),
          (c |= v.subtreeFlags),
          (c |= v.flags),
          (v.return = r),
          (v = v.sibling));
    return ((r.subtreeFlags |= c), (r.childLanes = l), i);
  }
  function tD(r, i, l) {
    var c = i.pendingProps;
    switch ((Ld(i), i.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ze(i), null);
      case 1:
        return (Ze(i), null);
      case 3:
        return (
          (l = i.stateNode),
          (c = null),
          r !== null && (c = r.memoizedState.cache),
          i.memoizedState.cache !== c && (i.flags |= 2048),
          Sr(ut),
          ee(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (r === null || r.child === null) &&
            (Hi(i)
              ? Ar(i)
              : r === null ||
                (r.memoizedState.isDehydrated && (i.flags & 256) === 0) ||
                ((i.flags |= 1024), qd())),
          Ze(i),
          null
        );
      case 26:
        var v = i.type,
          y = i.memoizedState;
        return (
          r === null
            ? (Ar(i),
              y !== null ? (Ze(i), Wb(i, y)) : (Ze(i), Mv(i, v, null, c, l)))
            : y
              ? y !== r.memoizedState
                ? (Ar(i), Ze(i), Wb(i, y))
                : (Ze(i), (i.flags &= -16777217))
              : ((r = r.memoizedProps),
                r !== c && Ar(i),
                Ze(i),
                Mv(i, v, r, c, l)),
          null
        );
      case 27:
        if (
          (Oe(i),
          (l = xe.current),
          (v = i.type),
          r !== null && i.stateNode != null)
        )
          r.memoizedProps !== c && Ar(i);
        else {
          if (!c) {
            if (i.stateNode === null) throw Error(a(166));
            return (Ze(i), null);
          }
          ((r = ie.current),
            Hi(i) ? C0(i) : ((r = ax(v, c, l)), (i.stateNode = r), Ar(i)));
        }
        return (Ze(i), null);
      case 5:
        if ((Oe(i), (v = i.type), r !== null && i.stateNode != null))
          r.memoizedProps !== c && Ar(i);
        else {
          if (!c) {
            if (i.stateNode === null) throw Error(a(166));
            return (Ze(i), null);
          }
          if (((y = ie.current), Hi(i))) C0(i);
          else {
            var x = kc(xe.current);
            switch (y) {
              case 1:
                y = x.createElementNS("http://www.w3.org/2000/svg", v);
                break;
              case 2:
                y = x.createElementNS("http://www.w3.org/1998/Math/MathML", v);
                break;
              default:
                switch (v) {
                  case "svg":
                    y = x.createElementNS("http://www.w3.org/2000/svg", v);
                    break;
                  case "math":
                    y = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      v,
                    );
                    break;
                  case "script":
                    ((y = x.createElement("div")),
                      (y.innerHTML = "<script><\/script>"),
                      (y = y.removeChild(y.firstChild)));
                    break;
                  case "select":
                    ((y =
                      typeof c.is == "string"
                        ? x.createElement("select", { is: c.is })
                        : x.createElement("select")),
                      c.multiple
                        ? (y.multiple = !0)
                        : c.size && (y.size = c.size));
                    break;
                  default:
                    y =
                      typeof c.is == "string"
                        ? x.createElement(v, { is: c.is })
                        : x.createElement(v);
                }
            }
            ((y[Ct] = i), (y[Wt] = c));
            e: for (x = i.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6) y.appendChild(x.stateNode);
              else if (x.tag !== 4 && x.tag !== 27 && x.child !== null) {
                ((x.child.return = x), (x = x.child));
                continue;
              }
              if (x === i) break e;
              for (; x.sibling === null; ) {
                if (x.return === null || x.return === i) break e;
                x = x.return;
              }
              ((x.sibling.return = x.return), (x = x.sibling));
            }
            i.stateNode = y;
            e: switch ((zt(y, v, c), v)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                c = !!c.autoFocus;
                break e;
              case "img":
                c = !0;
                break e;
              default:
                c = !1;
            }
            c && Ar(i);
          }
        }
        return (
          Ze(i),
          Mv(i, i.type, r === null ? null : r.memoizedProps, i.pendingProps, l),
          null
        );
      case 6:
        if (r && i.stateNode != null) r.memoizedProps !== c && Ar(i);
        else {
          if (typeof c != "string" && i.stateNode === null) throw Error(a(166));
          if (((r = xe.current), Hi(i))) {
            if (
              ((r = i.stateNode),
              (l = i.memoizedProps),
              (c = null),
              (v = Dt),
              v !== null)
            )
              switch (v.tag) {
                case 27:
                case 5:
                  c = v.memoizedProps;
              }
            ((r[Ct] = i),
              (r = !!(
                r.nodeValue === l ||
                (c !== null && c.suppressHydrationWarning === !0) ||
                X1(r.nodeValue, l)
              )),
              r || ia(i, !0));
          } else
            ((r = kc(r).createTextNode(c)), (r[Ct] = i), (i.stateNode = r));
        }
        return (Ze(i), null);
      case 31:
        if (((l = i.memoizedState), r === null || r.memoizedState !== null)) {
          if (((c = Hi(i)), l !== null)) {
            if (r === null) {
              if (!c) throw Error(a(318));
              if (
                ((r = i.memoizedState),
                (r = r !== null ? r.dehydrated : null),
                !r)
              )
                throw Error(a(557));
              r[Ct] = i;
            } else
              (Ya(),
                (i.flags & 128) === 0 && (i.memoizedState = null),
                (i.flags |= 4));
            (Ze(i), (r = !1));
          } else
            ((l = qd()),
              r !== null &&
                r.memoizedState !== null &&
                (r.memoizedState.hydrationErrors = l),
              (r = !0));
          if (!r) return i.flags & 256 ? (pn(i), i) : (pn(i), null);
          if ((i.flags & 128) !== 0) throw Error(a(558));
        }
        return (Ze(i), null);
      case 13:
        if (
          ((c = i.memoizedState),
          r === null ||
            (r.memoizedState !== null && r.memoizedState.dehydrated !== null))
        ) {
          if (((v = Hi(i)), c !== null && c.dehydrated !== null)) {
            if (r === null) {
              if (!v) throw Error(a(318));
              if (
                ((v = i.memoizedState),
                (v = v !== null ? v.dehydrated : null),
                !v)
              )
                throw Error(a(317));
              v[Ct] = i;
            } else
              (Ya(),
                (i.flags & 128) === 0 && (i.memoizedState = null),
                (i.flags |= 4));
            (Ze(i), (v = !1));
          } else
            ((v = qd()),
              r !== null &&
                r.memoizedState !== null &&
                (r.memoizedState.hydrationErrors = v),
              (v = !0));
          if (!v) return i.flags & 256 ? (pn(i), i) : (pn(i), null);
        }
        return (
          pn(i),
          (i.flags & 128) !== 0
            ? ((i.lanes = l), i)
            : ((l = c !== null),
              (r = r !== null && r.memoizedState !== null),
              l &&
                ((c = i.child),
                (v = null),
                c.alternate !== null &&
                  c.alternate.memoizedState !== null &&
                  c.alternate.memoizedState.cachePool !== null &&
                  (v = c.alternate.memoizedState.cachePool.pool),
                (y = null),
                c.memoizedState !== null &&
                  c.memoizedState.cachePool !== null &&
                  (y = c.memoizedState.cachePool.pool),
                y !== v && (c.flags |= 2048)),
              l !== r && l && (i.child.flags |= 8192),
              xc(i, i.updateQueue),
              Ze(i),
              null)
        );
      case 4:
        return (ee(), r === null && Wv(i.stateNode.containerInfo), Ze(i), null);
      case 10:
        return (Sr(i.type), Ze(i), null);
      case 19:
        if ((G(it), (c = i.memoizedState), c === null)) return (Ze(i), null);
        if (((v = (i.flags & 128) !== 0), (y = c.rendering), y === null))
          if (v) hu(c, !1);
          else {
            if (nt !== 0 || (r !== null && (r.flags & 128) !== 0))
              for (r = i.child; r !== null; ) {
                if (((y = uc(r)), y !== null)) {
                  for (
                    i.flags |= 128,
                      hu(c, !1),
                      r = y.updateQueue,
                      i.updateQueue = r,
                      xc(i, r),
                      i.subtreeFlags = 0,
                      r = l,
                      l = i.child;
                    l !== null;
                  )
                    (A0(l, r), (l = l.sibling));
                  return (
                    te(it, (it.current & 1) | 2),
                    Me && br(i, c.treeForkCount),
                    i.child
                  );
                }
                r = r.sibling;
              }
            c.tail !== null &&
              fn() > Ac &&
              ((i.flags |= 128), (v = !0), hu(c, !1), (i.lanes = 4194304));
          }
        else {
          if (!v)
            if (((r = uc(y)), r !== null)) {
              if (
                ((i.flags |= 128),
                (v = !0),
                (r = r.updateQueue),
                (i.updateQueue = r),
                xc(i, r),
                hu(c, !0),
                c.tail === null &&
                  c.tailMode === "hidden" &&
                  !y.alternate &&
                  !Me)
              )
                return (Ze(i), null);
            } else
              2 * fn() - c.renderingStartTime > Ac &&
                l !== 536870912 &&
                ((i.flags |= 128), (v = !0), hu(c, !1), (i.lanes = 4194304));
          c.isBackwards
            ? ((y.sibling = i.child), (i.child = y))
            : ((r = c.last),
              r !== null ? (r.sibling = y) : (i.child = y),
              (c.last = y));
        }
        return c.tail !== null
          ? ((r = c.tail),
            (c.rendering = r),
            (c.tail = r.sibling),
            (c.renderingStartTime = fn()),
            (r.sibling = null),
            (l = it.current),
            te(it, v ? (l & 1) | 2 : l & 1),
            Me && br(i, c.treeForkCount),
            r)
          : (Ze(i), null);
      case 22:
      case 23:
        return (
          pn(i),
          Fd(),
          (c = i.memoizedState !== null),
          r !== null
            ? (r.memoizedState !== null) !== c && (i.flags |= 8192)
            : c && (i.flags |= 8192),
          c
            ? (l & 536870912) !== 0 &&
              (i.flags & 128) === 0 &&
              (Ze(i), i.subtreeFlags & 6 && (i.flags |= 8192))
            : Ze(i),
          (l = i.updateQueue),
          l !== null && xc(i, l.retryQueue),
          (l = null),
          r !== null &&
            r.memoizedState !== null &&
            r.memoizedState.cachePool !== null &&
            (l = r.memoizedState.cachePool.pool),
          (c = null),
          i.memoizedState !== null &&
            i.memoizedState.cachePool !== null &&
            (c = i.memoizedState.cachePool.pool),
          c !== l && (i.flags |= 2048),
          r !== null && G(Xa),
          null
        );
      case 24:
        return (
          (l = null),
          r !== null && (l = r.memoizedState.cache),
          i.memoizedState.cache !== l && (i.flags |= 2048),
          Sr(ut),
          Ze(i),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, i.tag));
  }
  function nD(r, i) {
    switch ((Ld(i), i.tag)) {
      case 1:
        return (
          (r = i.flags),
          r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
        );
      case 3:
        return (
          Sr(ut),
          ee(),
          (r = i.flags),
          (r & 65536) !== 0 && (r & 128) === 0
            ? ((i.flags = (r & -65537) | 128), i)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Oe(i), null);
      case 31:
        if (i.memoizedState !== null) {
          if ((pn(i), i.alternate === null)) throw Error(a(340));
          Ya();
        }
        return (
          (r = i.flags),
          r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
        );
      case 13:
        if (
          (pn(i), (r = i.memoizedState), r !== null && r.dehydrated !== null)
        ) {
          if (i.alternate === null) throw Error(a(340));
          Ya();
        }
        return (
          (r = i.flags),
          r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
        );
      case 19:
        return (G(it), null);
      case 4:
        return (ee(), null);
      case 10:
        return (Sr(i.type), null);
      case 22:
      case 23:
        return (
          pn(i),
          Fd(),
          r !== null && G(Xa),
          (r = i.flags),
          r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
        );
      case 24:
        return (Sr(ut), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fb(r, i) {
    switch ((Ld(i), i.tag)) {
      case 3:
        (Sr(ut), ee());
        break;
      case 26:
      case 27:
      case 5:
        Oe(i);
        break;
      case 4:
        ee();
        break;
      case 31:
        i.memoizedState !== null && pn(i);
        break;
      case 13:
        pn(i);
        break;
      case 19:
        G(it);
        break;
      case 10:
        Sr(i.type);
        break;
      case 22:
      case 23:
        (pn(i), Fd(), r !== null && G(Xa));
        break;
      case 24:
        Sr(ut);
    }
  }
  function mu(r, i) {
    try {
      var l = i.updateQueue,
        c = l !== null ? l.lastEffect : null;
      if (c !== null) {
        var v = c.next;
        l = v;
        do {
          if ((l.tag & r) === r) {
            c = void 0;
            var y = l.create,
              x = l.inst;
            ((c = y()), (x.destroy = c));
          }
          l = l.next;
        } while (l !== v);
      }
    } catch (A) {
      Be(i, i.return, A);
    }
  }
  function da(r, i, l) {
    try {
      var c = i.updateQueue,
        v = c !== null ? c.lastEffect : null;
      if (v !== null) {
        var y = v.next;
        c = y;
        do {
          if ((c.tag & r) === r) {
            var x = c.inst,
              A = x.destroy;
            if (A !== void 0) {
              ((x.destroy = void 0), (v = i));
              var N = l,
                H = A;
              try {
                H();
              } catch (X) {
                Be(v, N, X);
              }
            }
          }
          c = c.next;
        } while (c !== y);
      }
    } catch (X) {
      Be(i, i.return, X);
    }
  }
  function Jb(r) {
    var i = r.updateQueue;
    if (i !== null) {
      var l = r.stateNode;
      try {
        $0(i, l);
      } catch (c) {
        Be(r, r.return, c);
      }
    }
  }
  function e1(r, i, l) {
    ((l.props = Fa(r.type, r.memoizedProps)), (l.state = r.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (c) {
      Be(r, i, c);
    }
  }
  function yu(r, i) {
    try {
      var l = r.ref;
      if (l !== null) {
        switch (r.tag) {
          case 26:
          case 27:
          case 5:
            var c = r.stateNode;
            break;
          case 30:
            c = r.stateNode;
            break;
          default:
            c = r.stateNode;
        }
        typeof l == "function" ? (r.refCleanup = l(c)) : (l.current = c);
      }
    } catch (v) {
      Be(r, i, v);
    }
  }
  function er(r, i) {
    var l = r.ref,
      c = r.refCleanup;
    if (l !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (v) {
          Be(r, i, v);
        } finally {
          ((r.refCleanup = null),
            (r = r.alternate),
            r != null && (r.refCleanup = null));
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (v) {
          Be(r, i, v);
        }
      else l.current = null;
  }
  function t1(r) {
    var i = r.type,
      l = r.memoizedProps,
      c = r.stateNode;
    try {
      e: switch (i) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && c.focus();
          break e;
        case "img":
          l.src ? (c.src = l.src) : l.srcSet && (c.srcset = l.srcSet);
      }
    } catch (v) {
      Be(r, r.return, v);
    }
  }
  function Cv(r, i, l) {
    try {
      var c = r.stateNode;
      (_D(c, r.type, l, i), (c[Wt] = i));
    } catch (v) {
      Be(r, r.return, v);
    }
  }
  function n1(r) {
    return (
      r.tag === 5 ||
      r.tag === 3 ||
      r.tag === 26 ||
      (r.tag === 27 && ba(r.type)) ||
      r.tag === 4
    );
  }
  function Dv(r) {
    e: for (;;) {
      for (; r.sibling === null; ) {
        if (r.return === null || n1(r.return)) return null;
        r = r.return;
      }
      for (
        r.sibling.return = r.return, r = r.sibling;
        r.tag !== 5 && r.tag !== 6 && r.tag !== 18;
      ) {
        if (
          (r.tag === 27 && ba(r.type)) ||
          r.flags & 2 ||
          r.child === null ||
          r.tag === 4
        )
          continue e;
        ((r.child.return = r), (r = r.child));
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function Nv(r, i, l) {
    var c = r.tag;
    if (c === 5 || c === 6)
      ((r = r.stateNode),
        i
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(r, i)
          : ((i =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            i.appendChild(r),
            (l = l._reactRootContainer),
            l != null || i.onclick !== null || (i.onclick = yr)));
    else if (
      c !== 4 &&
      (c === 27 && ba(r.type) && ((l = r.stateNode), (i = null)),
      (r = r.child),
      r !== null)
    )
      for (Nv(r, i, l), r = r.sibling; r !== null; )
        (Nv(r, i, l), (r = r.sibling));
  }
  function Sc(r, i, l) {
    var c = r.tag;
    if (c === 5 || c === 6)
      ((r = r.stateNode), i ? l.insertBefore(r, i) : l.appendChild(r));
    else if (
      c !== 4 &&
      (c === 27 && ba(r.type) && (l = r.stateNode), (r = r.child), r !== null)
    )
      for (Sc(r, i, l), r = r.sibling; r !== null; )
        (Sc(r, i, l), (r = r.sibling));
  }
  function r1(r) {
    var i = r.stateNode,
      l = r.memoizedProps;
    try {
      for (var c = r.type, v = i.attributes; v.length; )
        i.removeAttributeNode(v[0]);
      (zt(i, c, l), (i[Ct] = r), (i[Wt] = l));
    } catch (y) {
      Be(r, r.return, y);
    }
  }
  var Er = !1,
    st = !1,
    Pv = !1,
    a1 = typeof WeakSet == "function" ? WeakSet : Set,
    xt = null;
  function rD(r, i) {
    if (((r = r.containerInfo), (eh = Ic), (r = y0(r)), Ed(r))) {
      if ("selectionStart" in r)
        var l = { start: r.selectionStart, end: r.selectionEnd };
      else
        e: {
          l = ((l = r.ownerDocument) && l.defaultView) || window;
          var c = l.getSelection && l.getSelection();
          if (c && c.rangeCount !== 0) {
            l = c.anchorNode;
            var v = c.anchorOffset,
              y = c.focusNode;
            c = c.focusOffset;
            try {
              (l.nodeType, y.nodeType);
            } catch {
              l = null;
              break e;
            }
            var x = 0,
              A = -1,
              N = -1,
              H = 0,
              X = 0,
              Q = r,
              I = null;
            t: for (;;) {
              for (
                var Y;
                Q !== l || (v !== 0 && Q.nodeType !== 3) || (A = x + v),
                  Q !== y || (c !== 0 && Q.nodeType !== 3) || (N = x + c),
                  Q.nodeType === 3 && (x += Q.nodeValue.length),
                  (Y = Q.firstChild) !== null;
              )
                ((I = Q), (Q = Y));
              for (;;) {
                if (Q === r) break t;
                if (
                  (I === l && ++H === v && (A = x),
                  I === y && ++X === c && (N = x),
                  (Y = Q.nextSibling) !== null)
                )
                  break;
                ((Q = I), (I = Q.parentNode));
              }
              Q = Y;
            }
            l = A === -1 || N === -1 ? null : { start: A, end: N };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      th = { focusedElem: r, selectionRange: l }, Ic = !1, xt = i;
      xt !== null;
    )
      if (
        ((i = xt), (r = i.child), (i.subtreeFlags & 1028) !== 0 && r !== null)
      )
        ((r.return = i), (xt = r));
      else
        for (; xt !== null; ) {
          switch (((i = xt), (y = i.alternate), (r = i.flags), i.tag)) {
            case 0:
              if (
                (r & 4) !== 0 &&
                ((r = i.updateQueue),
                (r = r !== null ? r.events : null),
                r !== null)
              )
                for (l = 0; l < r.length; l++)
                  ((v = r[l]), (v.ref.impl = v.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((r & 1024) !== 0 && y !== null) {
                ((r = void 0),
                  (l = i),
                  (v = y.memoizedProps),
                  (y = y.memoizedState),
                  (c = l.stateNode));
                try {
                  var fe = Fa(l.type, v);
                  ((r = c.getSnapshotBeforeUpdate(fe, y)),
                    (c.__reactInternalSnapshotBeforeUpdate = r));
                } catch (ge) {
                  Be(l, l.return, ge);
                }
              }
              break;
            case 3:
              if ((r & 1024) !== 0) {
                if (
                  ((r = i.stateNode.containerInfo), (l = r.nodeType), l === 9)
                )
                  ah(r);
                else if (l === 1)
                  switch (r.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ah(r);
                      break;
                    default:
                      r.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((r & 1024) !== 0) throw Error(a(163));
          }
          if (((r = i.sibling), r !== null)) {
            ((r.return = i.return), (xt = r));
            break;
          }
          xt = i.return;
        }
  }
  function i1(r, i, l) {
    var c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Tr(r, l), c & 4 && mu(5, l));
        break;
      case 1:
        if ((Tr(r, l), c & 4))
          if (((r = l.stateNode), i === null))
            try {
              r.componentDidMount();
            } catch (x) {
              Be(l, l.return, x);
            }
          else {
            var v = Fa(l.type, i.memoizedProps);
            i = i.memoizedState;
            try {
              r.componentDidUpdate(v, i, r.__reactInternalSnapshotBeforeUpdate);
            } catch (x) {
              Be(l, l.return, x);
            }
          }
        (c & 64 && Jb(l), c & 512 && yu(l, l.return));
        break;
      case 3:
        if ((Tr(r, l), c & 64 && ((r = l.updateQueue), r !== null))) {
          if (((i = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                i = l.child.stateNode;
                break;
              case 1:
                i = l.child.stateNode;
            }
          try {
            $0(r, i);
          } catch (x) {
            Be(l, l.return, x);
          }
        }
        break;
      case 27:
        i === null && c & 4 && r1(l);
      case 26:
      case 5:
        (Tr(r, l), i === null && c & 4 && t1(l), c & 512 && yu(l, l.return));
        break;
      case 12:
        Tr(r, l);
        break;
      case 31:
        (Tr(r, l), c & 4 && o1(r, l));
        break;
      case 13:
        (Tr(r, l),
          c & 4 && c1(r, l),
          c & 64 &&
            ((r = l.memoizedState),
            r !== null &&
              ((r = r.dehydrated),
              r !== null && ((l = dD.bind(null, l)), ND(r, l)))));
        break;
      case 22:
        if (((c = l.memoizedState !== null || Er), !c)) {
          ((i = (i !== null && i.memoizedState !== null) || st), (v = Er));
          var y = st;
          ((Er = c),
            (st = i) && !y ? Mr(r, l, (l.subtreeFlags & 8772) !== 0) : Tr(r, l),
            (Er = v),
            (st = y));
        }
        break;
      case 30:
        break;
      default:
        Tr(r, l);
    }
  }
  function l1(r) {
    var i = r.alternate;
    (i !== null && ((r.alternate = null), l1(i)),
      (r.child = null),
      (r.deletions = null),
      (r.sibling = null),
      r.tag === 5 && ((i = r.stateNode), i !== null && cd(i)),
      (r.stateNode = null),
      (r.return = null),
      (r.dependencies = null),
      (r.memoizedProps = null),
      (r.memoizedState = null),
      (r.pendingProps = null),
      (r.stateNode = null),
      (r.updateQueue = null));
  }
  var Fe = null,
    Jt = !1;
  function jr(r, i, l) {
    for (l = l.child; l !== null; ) (u1(r, i, l), (l = l.sibling));
  }
  function u1(r, i, l) {
    if (dn && typeof dn.onCommitFiberUnmount == "function")
      try {
        dn.onCommitFiberUnmount(Bl, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (st || er(l, i),
          jr(r, i, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        st || er(l, i);
        var c = Fe,
          v = Jt;
        (ba(l.type) && ((Fe = l.stateNode), (Jt = !1)),
          jr(r, i, l),
          Au(l.stateNode),
          (Fe = c),
          (Jt = v));
        break;
      case 5:
        st || er(l, i);
      case 6:
        if (
          ((c = Fe),
          (v = Jt),
          (Fe = null),
          jr(r, i, l),
          (Fe = c),
          (Jt = v),
          Fe !== null)
        )
          if (Jt)
            try {
              (Fe.nodeType === 9
                ? Fe.body
                : Fe.nodeName === "HTML"
                  ? Fe.ownerDocument.body
                  : Fe
              ).removeChild(l.stateNode);
            } catch (y) {
              Be(l, i, y);
            }
          else
            try {
              Fe.removeChild(l.stateNode);
            } catch (y) {
              Be(l, i, y);
            }
        break;
      case 18:
        Fe !== null &&
          (Jt
            ? ((r = Fe),
              J1(
                r.nodeType === 9
                  ? r.body
                  : r.nodeName === "HTML"
                    ? r.ownerDocument.body
                    : r,
                l.stateNode,
              ),
              ol(r))
            : J1(Fe, l.stateNode));
        break;
      case 4:
        ((c = Fe),
          (v = Jt),
          (Fe = l.stateNode.containerInfo),
          (Jt = !0),
          jr(r, i, l),
          (Fe = c),
          (Jt = v));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (da(2, l, i), st || da(4, l, i), jr(r, i, l));
        break;
      case 1:
        (st ||
          (er(l, i),
          (c = l.stateNode),
          typeof c.componentWillUnmount == "function" && e1(l, i, c)),
          jr(r, i, l));
        break;
      case 21:
        jr(r, i, l);
        break;
      case 22:
        ((st = (c = st) || l.memoizedState !== null), jr(r, i, l), (st = c));
        break;
      default:
        jr(r, i, l);
    }
  }
  function o1(r, i) {
    if (
      i.memoizedState === null &&
      ((r = i.alternate), r !== null && ((r = r.memoizedState), r !== null))
    ) {
      r = r.dehydrated;
      try {
        ol(r);
      } catch (l) {
        Be(i, i.return, l);
      }
    }
  }
  function c1(r, i) {
    if (
      i.memoizedState === null &&
      ((r = i.alternate),
      r !== null &&
        ((r = r.memoizedState), r !== null && ((r = r.dehydrated), r !== null)))
    )
      try {
        ol(r);
      } catch (l) {
        Be(i, i.return, l);
      }
  }
  function aD(r) {
    switch (r.tag) {
      case 31:
      case 13:
      case 19:
        var i = r.stateNode;
        return (i === null && (i = r.stateNode = new a1()), i);
      case 22:
        return (
          (r = r.stateNode),
          (i = r._retryCache),
          i === null && (i = r._retryCache = new a1()),
          i
        );
      default:
        throw Error(a(435, r.tag));
    }
  }
  function wc(r, i) {
    var l = aD(r);
    i.forEach(function (c) {
      if (!l.has(c)) {
        l.add(c);
        var v = vD.bind(null, r, c);
        c.then(v, v);
      }
    });
  }
  function en(r, i) {
    var l = i.deletions;
    if (l !== null)
      for (var c = 0; c < l.length; c++) {
        var v = l[c],
          y = r,
          x = i,
          A = x;
        e: for (; A !== null; ) {
          switch (A.tag) {
            case 27:
              if (ba(A.type)) {
                ((Fe = A.stateNode), (Jt = !1));
                break e;
              }
              break;
            case 5:
              ((Fe = A.stateNode), (Jt = !1));
              break e;
            case 3:
            case 4:
              ((Fe = A.stateNode.containerInfo), (Jt = !0));
              break e;
          }
          A = A.return;
        }
        if (Fe === null) throw Error(a(160));
        (u1(y, x, v),
          (Fe = null),
          (Jt = !1),
          (y = v.alternate),
          y !== null && (y.return = null),
          (v.return = null));
      }
    if (i.subtreeFlags & 13886)
      for (i = i.child; i !== null; ) (s1(i, r), (i = i.sibling));
  }
  var Kn = null;
  function s1(r, i) {
    var l = r.alternate,
      c = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (en(i, r),
          tn(r),
          c & 4 && (da(3, r, r.return), mu(3, r), da(5, r, r.return)));
        break;
      case 1:
        (en(i, r),
          tn(r),
          c & 512 && (st || l === null || er(l, l.return)),
          c & 64 &&
            Er &&
            ((r = r.updateQueue),
            r !== null &&
              ((c = r.callbacks),
              c !== null &&
                ((l = r.shared.hiddenCallbacks),
                (r.shared.hiddenCallbacks = l === null ? c : l.concat(c))))));
        break;
      case 26:
        var v = Kn;
        if (
          (en(i, r),
          tn(r),
          c & 512 && (st || l === null || er(l, l.return)),
          c & 4)
        ) {
          var y = l !== null ? l.memoizedState : null;
          if (((c = r.memoizedState), l === null))
            if (c === null)
              if (r.stateNode === null) {
                e: {
                  ((c = r.type),
                    (l = r.memoizedProps),
                    (v = v.ownerDocument || v));
                  t: switch (c) {
                    case "title":
                      ((y = v.getElementsByTagName("title")[0]),
                        (!y ||
                          y[$l] ||
                          y[Ct] ||
                          y.namespaceURI === "http://www.w3.org/2000/svg" ||
                          y.hasAttribute("itemprop")) &&
                          ((y = v.createElement(c)),
                          v.head.insertBefore(
                            y,
                            v.querySelector("head > title"),
                          )),
                        zt(y, c, l),
                        (y[Ct] = r),
                        bt(y),
                        (c = y));
                      break e;
                    case "link":
                      var x = sx("link", "href", v).get(c + (l.href || ""));
                      if (x) {
                        for (var A = 0; A < x.length; A++)
                          if (
                            ((y = x[A]),
                            y.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              y.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              y.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              y.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            x.splice(A, 1);
                            break t;
                          }
                      }
                      ((y = v.createElement(c)),
                        zt(y, c, l),
                        v.head.appendChild(y));
                      break;
                    case "meta":
                      if (
                        (x = sx("meta", "content", v).get(
                          c + (l.content || ""),
                        ))
                      ) {
                        for (A = 0; A < x.length; A++)
                          if (
                            ((y = x[A]),
                            y.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              y.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              y.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              y.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              y.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            x.splice(A, 1);
                            break t;
                          }
                      }
                      ((y = v.createElement(c)),
                        zt(y, c, l),
                        v.head.appendChild(y));
                      break;
                    default:
                      throw Error(a(468, c));
                  }
                  ((y[Ct] = r), bt(y), (c = y));
                }
                r.stateNode = c;
              } else fx(v, r.type, r.stateNode);
            else r.stateNode = cx(v, c, r.memoizedProps);
          else
            y !== c
              ? (y === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : y.count--,
                c === null
                  ? fx(v, r.type, r.stateNode)
                  : cx(v, c, r.memoizedProps))
              : c === null &&
                r.stateNode !== null &&
                Cv(r, r.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (en(i, r),
          tn(r),
          c & 512 && (st || l === null || er(l, l.return)),
          l !== null && c & 4 && Cv(r, r.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if (
          (en(i, r),
          tn(r),
          c & 512 && (st || l === null || er(l, l.return)),
          r.flags & 32)
        ) {
          v = r.stateNode;
          try {
            Di(v, "");
          } catch (fe) {
            Be(r, r.return, fe);
          }
        }
        (c & 4 &&
          r.stateNode != null &&
          ((v = r.memoizedProps), Cv(r, v, l !== null ? l.memoizedProps : v)),
          c & 1024 && (Pv = !0));
        break;
      case 6:
        if ((en(i, r), tn(r), c & 4)) {
          if (r.stateNode === null) throw Error(a(162));
          ((c = r.memoizedProps), (l = r.stateNode));
          try {
            l.nodeValue = c;
          } catch (fe) {
            Be(r, r.return, fe);
          }
        }
        break;
      case 3:
        if (
          ((Uc = null),
          (v = Kn),
          (Kn = Rc(i.containerInfo)),
          en(i, r),
          (Kn = v),
          tn(r),
          c & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ol(i.containerInfo);
          } catch (fe) {
            Be(r, r.return, fe);
          }
        Pv && ((Pv = !1), f1(r));
        break;
      case 4:
        ((c = Kn),
          (Kn = Rc(r.stateNode.containerInfo)),
          en(i, r),
          tn(r),
          (Kn = c));
        break;
      case 12:
        (en(i, r), tn(r));
        break;
      case 31:
        (en(i, r),
          tn(r),
          c & 4 &&
            ((c = r.updateQueue),
            c !== null && ((r.updateQueue = null), wc(r, c))));
        break;
      case 13:
        (en(i, r),
          tn(r),
          r.child.flags & 8192 &&
            (r.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (_c = fn()),
          c & 4 &&
            ((c = r.updateQueue),
            c !== null && ((r.updateQueue = null), wc(r, c))));
        break;
      case 22:
        v = r.memoizedState !== null;
        var N = l !== null && l.memoizedState !== null,
          H = Er,
          X = st;
        if (
          ((Er = H || v),
          (st = X || N),
          en(i, r),
          (st = X),
          (Er = H),
          tn(r),
          c & 8192)
        )
          e: for (
            i = r.stateNode,
              i._visibility = v ? i._visibility & -2 : i._visibility | 1,
              v && (l === null || N || Er || st || Ja(r)),
              l = null,
              i = r;
            ;
          ) {
            if (i.tag === 5 || i.tag === 26) {
              if (l === null) {
                N = l = i;
                try {
                  if (((y = N.stateNode), v))
                    ((x = y.style),
                      typeof x.setProperty == "function"
                        ? x.setProperty("display", "none", "important")
                        : (x.display = "none"));
                  else {
                    A = N.stateNode;
                    var Q = N.memoizedProps.style,
                      I =
                        Q != null && Q.hasOwnProperty("display")
                          ? Q.display
                          : null;
                    A.style.display =
                      I == null || typeof I == "boolean" ? "" : ("" + I).trim();
                  }
                } catch (fe) {
                  Be(N, N.return, fe);
                }
              }
            } else if (i.tag === 6) {
              if (l === null) {
                N = i;
                try {
                  N.stateNode.nodeValue = v ? "" : N.memoizedProps;
                } catch (fe) {
                  Be(N, N.return, fe);
                }
              }
            } else if (i.tag === 18) {
              if (l === null) {
                N = i;
                try {
                  var Y = N.stateNode;
                  v ? ex(Y, !0) : ex(N.stateNode, !1);
                } catch (fe) {
                  Be(N, N.return, fe);
                }
              }
            } else if (
              ((i.tag !== 22 && i.tag !== 23) ||
                i.memoizedState === null ||
                i === r) &&
              i.child !== null
            ) {
              ((i.child.return = i), (i = i.child));
              continue;
            }
            if (i === r) break e;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === r) break e;
              (l === i && (l = null), (i = i.return));
            }
            (l === i && (l = null),
              (i.sibling.return = i.return),
              (i = i.sibling));
          }
        c & 4 &&
          ((c = r.updateQueue),
          c !== null &&
            ((l = c.retryQueue),
            l !== null && ((c.retryQueue = null), wc(r, l))));
        break;
      case 19:
        (en(i, r),
          tn(r),
          c & 4 &&
            ((c = r.updateQueue),
            c !== null && ((r.updateQueue = null), wc(r, c))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (en(i, r), tn(r));
    }
  }
  function tn(r) {
    var i = r.flags;
    if (i & 2) {
      try {
        for (var l, c = r.return; c !== null; ) {
          if (n1(c)) {
            l = c;
            break;
          }
          c = c.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var v = l.stateNode,
              y = Dv(r);
            Sc(r, y, v);
            break;
          case 5:
            var x = l.stateNode;
            l.flags & 32 && (Di(x, ""), (l.flags &= -33));
            var A = Dv(r);
            Sc(r, A, x);
            break;
          case 3:
          case 4:
            var N = l.stateNode.containerInfo,
              H = Dv(r);
            Nv(r, H, N);
            break;
          default:
            throw Error(a(161));
        }
      } catch (X) {
        Be(r, r.return, X);
      }
      r.flags &= -3;
    }
    i & 4096 && (r.flags &= -4097);
  }
  function f1(r) {
    if (r.subtreeFlags & 1024)
      for (r = r.child; r !== null; ) {
        var i = r;
        (f1(i),
          i.tag === 5 && i.flags & 1024 && i.stateNode.reset(),
          (r = r.sibling));
      }
  }
  function Tr(r, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; ) (i1(r, i.alternate, i), (i = i.sibling));
  }
  function Ja(r) {
    for (r = r.child; r !== null; ) {
      var i = r;
      switch (i.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (da(4, i, i.return), Ja(i));
          break;
        case 1:
          er(i, i.return);
          var l = i.stateNode;
          (typeof l.componentWillUnmount == "function" && e1(i, i.return, l),
            Ja(i));
          break;
        case 27:
          Au(i.stateNode);
        case 26:
        case 5:
          (er(i, i.return), Ja(i));
          break;
        case 22:
          i.memoizedState === null && Ja(i);
          break;
        case 30:
          Ja(i);
          break;
        default:
          Ja(i);
      }
      r = r.sibling;
    }
  }
  function Mr(r, i, l) {
    for (l = l && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
      var c = i.alternate,
        v = r,
        y = i,
        x = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          (Mr(v, y, l), mu(4, y));
          break;
        case 1:
          if (
            (Mr(v, y, l),
            (c = y),
            (v = c.stateNode),
            typeof v.componentDidMount == "function")
          )
            try {
              v.componentDidMount();
            } catch (H) {
              Be(c, c.return, H);
            }
          if (((c = y), (v = c.updateQueue), v !== null)) {
            var A = c.stateNode;
            try {
              var N = v.shared.hiddenCallbacks;
              if (N !== null)
                for (v.shared.hiddenCallbacks = null, v = 0; v < N.length; v++)
                  I0(N[v], A);
            } catch (H) {
              Be(c, c.return, H);
            }
          }
          (l && x & 64 && Jb(y), yu(y, y.return));
          break;
        case 27:
          r1(y);
        case 26:
        case 5:
          (Mr(v, y, l), l && c === null && x & 4 && t1(y), yu(y, y.return));
          break;
        case 12:
          Mr(v, y, l);
          break;
        case 31:
          (Mr(v, y, l), l && x & 4 && o1(v, y));
          break;
        case 13:
          (Mr(v, y, l), l && x & 4 && c1(v, y));
          break;
        case 22:
          (y.memoizedState === null && Mr(v, y, l), yu(y, y.return));
          break;
        case 30:
          break;
        default:
          Mr(v, y, l);
      }
      i = i.sibling;
    }
  }
  function zv(r, i) {
    var l = null;
    (r !== null &&
      r.memoizedState !== null &&
      r.memoizedState.cachePool !== null &&
      (l = r.memoizedState.cachePool.pool),
      (r = null),
      i.memoizedState !== null &&
        i.memoizedState.cachePool !== null &&
        (r = i.memoizedState.cachePool.pool),
      r !== l && (r != null && r.refCount++, l != null && nu(l)));
  }
  function kv(r, i) {
    ((r = null),
      i.alternate !== null && (r = i.alternate.memoizedState.cache),
      (i = i.memoizedState.cache),
      i !== r && (i.refCount++, r != null && nu(r)));
  }
  function Gn(r, i, l, c) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) (d1(r, i, l, c), (i = i.sibling));
  }
  function d1(r, i, l, c) {
    var v = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Gn(r, i, l, c), v & 2048 && mu(9, i));
        break;
      case 1:
        Gn(r, i, l, c);
        break;
      case 3:
        (Gn(r, i, l, c),
          v & 2048 &&
            ((r = null),
            i.alternate !== null && (r = i.alternate.memoizedState.cache),
            (i = i.memoizedState.cache),
            i !== r && (i.refCount++, r != null && nu(r))));
        break;
      case 12:
        if (v & 2048) {
          (Gn(r, i, l, c), (r = i.stateNode));
          try {
            var y = i.memoizedProps,
              x = y.id,
              A = y.onPostCommit;
            typeof A == "function" &&
              A(
                x,
                i.alternate === null ? "mount" : "update",
                r.passiveEffectDuration,
                -0,
              );
          } catch (N) {
            Be(i, i.return, N);
          }
        } else Gn(r, i, l, c);
        break;
      case 31:
        Gn(r, i, l, c);
        break;
      case 13:
        Gn(r, i, l, c);
        break;
      case 23:
        break;
      case 22:
        ((y = i.stateNode),
          (x = i.alternate),
          i.memoizedState !== null
            ? y._visibility & 2
              ? Gn(r, i, l, c)
              : pu(r, i)
            : y._visibility & 2
              ? Gn(r, i, l, c)
              : ((y._visibility |= 2),
                Wi(r, i, l, c, (i.subtreeFlags & 10256) !== 0 || !1)),
          v & 2048 && zv(x, i));
        break;
      case 24:
        (Gn(r, i, l, c), v & 2048 && kv(i.alternate, i));
        break;
      default:
        Gn(r, i, l, c);
    }
  }
  function Wi(r, i, l, c, v) {
    for (
      v = v && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child;
      i !== null;
    ) {
      var y = r,
        x = i,
        A = l,
        N = c,
        H = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          (Wi(y, x, A, N, v), mu(8, x));
          break;
        case 23:
          break;
        case 22:
          var X = x.stateNode;
          (x.memoizedState !== null
            ? X._visibility & 2
              ? Wi(y, x, A, N, v)
              : pu(y, x)
            : ((X._visibility |= 2), Wi(y, x, A, N, v)),
            v && H & 2048 && zv(x.alternate, x));
          break;
        case 24:
          (Wi(y, x, A, N, v), v && H & 2048 && kv(x.alternate, x));
          break;
        default:
          Wi(y, x, A, N, v);
      }
      i = i.sibling;
    }
  }
  function pu(r, i) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) {
        var l = r,
          c = i,
          v = c.flags;
        switch (c.tag) {
          case 22:
            (pu(l, c), v & 2048 && zv(c.alternate, c));
            break;
          case 24:
            (pu(l, c), v & 2048 && kv(c.alternate, c));
            break;
          default:
            pu(l, c);
        }
        i = i.sibling;
      }
  }
  var gu = 8192;
  function Fi(r, i, l) {
    if (r.subtreeFlags & gu)
      for (r = r.child; r !== null; ) (v1(r, i, l), (r = r.sibling));
  }
  function v1(r, i, l) {
    switch (r.tag) {
      case 26:
        (Fi(r, i, l),
          r.flags & gu &&
            r.memoizedState !== null &&
            YD(l, Kn, r.memoizedState, r.memoizedProps));
        break;
      case 5:
        Fi(r, i, l);
        break;
      case 3:
      case 4:
        var c = Kn;
        ((Kn = Rc(r.stateNode.containerInfo)), Fi(r, i, l), (Kn = c));
        break;
      case 22:
        r.memoizedState === null &&
          ((c = r.alternate),
          c !== null && c.memoizedState !== null
            ? ((c = gu), (gu = 16777216), Fi(r, i, l), (gu = c))
            : Fi(r, i, l));
        break;
      default:
        Fi(r, i, l);
    }
  }
  function h1(r) {
    var i = r.alternate;
    if (i !== null && ((r = i.child), r !== null)) {
      i.child = null;
      do ((i = r.sibling), (r.sibling = null), (r = i));
      while (r !== null);
    }
  }
  function bu(r) {
    var i = r.deletions;
    if ((r.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var c = i[l];
          ((xt = c), y1(c, r));
        }
      h1(r);
    }
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; ) (m1(r), (r = r.sibling));
  }
  function m1(r) {
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        (bu(r), r.flags & 2048 && da(9, r, r.return));
        break;
      case 3:
        bu(r);
        break;
      case 12:
        bu(r);
        break;
      case 22:
        var i = r.stateNode;
        r.memoizedState !== null &&
        i._visibility & 2 &&
        (r.return === null || r.return.tag !== 13)
          ? ((i._visibility &= -3), Oc(r))
          : bu(r);
        break;
      default:
        bu(r);
    }
  }
  function Oc(r) {
    var i = r.deletions;
    if ((r.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var c = i[l];
          ((xt = c), y1(c, r));
        }
      h1(r);
    }
    for (r = r.child; r !== null; ) {
      switch (((i = r), i.tag)) {
        case 0:
        case 11:
        case 15:
          (da(8, i, i.return), Oc(i));
          break;
        case 22:
          ((l = i.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), Oc(i)));
          break;
        default:
          Oc(i);
      }
      r = r.sibling;
    }
  }
  function y1(r, i) {
    for (; xt !== null; ) {
      var l = xt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          da(8, l, i);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var c = l.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          nu(l.memoizedState.cache);
      }
      if (((c = l.child), c !== null)) ((c.return = l), (xt = c));
      else
        e: for (l = r; xt !== null; ) {
          c = xt;
          var v = c.sibling,
            y = c.return;
          if ((l1(c), c === l)) {
            xt = null;
            break e;
          }
          if (v !== null) {
            ((v.return = y), (xt = v));
            break e;
          }
          xt = y;
        }
    }
  }
  var iD = {
      getCacheForType: function (r) {
        var i = Nt(ut),
          l = i.data.get(r);
        return (l === void 0 && ((l = r()), i.data.set(r, l)), l);
      },
      cacheSignal: function () {
        return Nt(ut).controller.signal;
      },
    },
    lD = typeof WeakMap == "function" ? WeakMap : Map,
    Le = 0,
    Ye = null,
    _e = null,
    je = 0,
    qe = 0,
    gn = null,
    va = !1,
    Ji = !1,
    Rv = !1,
    Cr = 0,
    nt = 0,
    ha = 0,
    ei = 0,
    Lv = 0,
    bn = 0,
    el = 0,
    xu = null,
    nn = null,
    Uv = !1,
    _c = 0,
    p1 = 0,
    Ac = 1 / 0,
    Ec = null,
    ma = null,
    vt = 0,
    ya = null,
    tl = null,
    Dr = 0,
    qv = 0,
    Bv = null,
    g1 = null,
    Su = 0,
    Hv = null;
  function xn() {
    return (Le & 2) !== 0 && je !== 0 ? je & -je : L.T !== null ? Xv() : zg();
  }
  function b1() {
    if (bn === 0)
      if ((je & 536870912) === 0 || Me) {
        var r = zo;
        ((zo <<= 1), (zo & 3932160) === 0 && (zo = 262144), (bn = r));
      } else bn = 536870912;
    return ((r = yn.current), r !== null && (r.flags |= 32), bn);
  }
  function rn(r, i, l) {
    (((r === Ye && (qe === 2 || qe === 9)) || r.cancelPendingCommit !== null) &&
      (nl(r, 0), pa(r, je, bn, !1)),
      Il(r, l),
      ((Le & 2) === 0 || r !== Ye) &&
        (r === Ye &&
          ((Le & 2) === 0 && (ei |= l), nt === 4 && pa(r, je, bn, !1)),
        tr(r)));
  }
  function x1(r, i, l) {
    if ((Le & 6) !== 0) throw Error(a(327));
    var c = (!l && (i & 127) === 0 && (i & r.expiredLanes) === 0) || Hl(r, i),
      v = c ? cD(r, i) : $v(r, i, !0),
      y = c;
    do {
      if (v === 0) {
        Ji && !c && pa(r, i, 0, !1);
        break;
      } else {
        if (((l = r.current.alternate), y && !uD(l))) {
          ((v = $v(r, i, !1)), (y = !1));
          continue;
        }
        if (v === 2) {
          if (((y = i), r.errorRecoveryDisabledLanes & y)) var x = 0;
          else
            ((x = r.pendingLanes & -536870913),
              (x = x !== 0 ? x : x & 536870912 ? 536870912 : 0));
          if (x !== 0) {
            i = x;
            e: {
              var A = r;
              v = xu;
              var N = A.current.memoizedState.isDehydrated;
              if ((N && (nl(A, x).flags |= 256), (x = $v(A, x, !1)), x !== 2)) {
                if (Rv && !N) {
                  ((A.errorRecoveryDisabledLanes |= y), (ei |= y), (v = 4));
                  break e;
                }
                ((y = nn),
                  (nn = v),
                  y !== null &&
                    (nn === null ? (nn = y) : nn.push.apply(nn, y)));
              }
              v = x;
            }
            if (((y = !1), v !== 2)) continue;
          }
        }
        if (v === 1) {
          (nl(r, 0), pa(r, i, 0, !0));
          break;
        }
        e: {
          switch (((c = r), (y = v), y)) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((i & 4194048) !== i) break;
            case 6:
              pa(c, i, bn, !va);
              break e;
            case 2:
              nn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((i & 62914560) === i && ((v = _c + 300 - fn()), 10 < v)) {
            if ((pa(c, i, bn, !va), Ro(c, 0, !0) !== 0)) break e;
            ((Dr = i),
              (c.timeoutHandle = W1(
                S1.bind(
                  null,
                  c,
                  l,
                  nn,
                  Ec,
                  Uv,
                  i,
                  bn,
                  ei,
                  el,
                  va,
                  y,
                  "Throttled",
                  -0,
                  0,
                ),
                v,
              )));
            break e;
          }
          S1(c, l, nn, Ec, Uv, i, bn, ei, el, va, y, null, -0, 0);
        }
      }
      break;
    } while (!0);
    tr(r);
  }
  function S1(r, i, l, c, v, y, x, A, N, H, X, Q, I, Y) {
    if (
      ((r.timeoutHandle = -1),
      (Q = i.subtreeFlags),
      Q & 8192 || (Q & 16785408) === 16785408)
    ) {
      ((Q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: yr,
      }),
        v1(i, y, Q));
      var fe =
        (y & 62914560) === y ? _c - fn() : (y & 4194048) === y ? p1 - fn() : 0;
      if (((fe = KD(Q, fe)), fe !== null)) {
        ((Dr = y),
          (r.cancelPendingCommit = fe(
            M1.bind(null, r, i, y, l, c, v, x, A, N, X, Q, null, I, Y),
          )),
          pa(r, y, x, !H));
        return;
      }
    }
    M1(r, i, y, l, c, v, x, A, N);
  }
  function uD(r) {
    for (var i = r; ; ) {
      var l = i.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        i.flags & 16384 &&
        ((l = i.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var c = 0; c < l.length; c++) {
          var v = l[c],
            y = v.getSnapshot;
          v = v.value;
          try {
            if (!hn(y(), v)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = i.child), i.subtreeFlags & 16384 && l !== null))
        ((l.return = i), (i = l));
      else {
        if (i === r) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === r) return !0;
          i = i.return;
        }
        ((i.sibling.return = i.return), (i = i.sibling));
      }
    }
    return !0;
  }
  function pa(r, i, l, c) {
    ((i &= ~Lv),
      (i &= ~ei),
      (r.suspendedLanes |= i),
      (r.pingedLanes &= ~i),
      c && (r.warmLanes |= i),
      (c = r.expirationTimes));
    for (var v = i; 0 < v; ) {
      var y = 31 - vn(v),
        x = 1 << y;
      ((c[y] = -1), (v &= ~x));
    }
    l !== 0 && Dg(r, l, i);
  }
  function jc() {
    return (Le & 6) === 0 ? (wu(0), !1) : !0;
  }
  function Iv() {
    if (_e !== null) {
      if (qe === 0) var r = _e.return;
      else ((r = _e), (xr = Ka = null), av(r), (Gi = null), (au = 0), (r = _e));
      for (; r !== null; ) (Fb(r.alternate, r), (r = r.return));
      _e = null;
    }
  }
  function nl(r, i) {
    var l = r.timeoutHandle;
    (l !== -1 && ((r.timeoutHandle = -1), jD(l)),
      (l = r.cancelPendingCommit),
      l !== null && ((r.cancelPendingCommit = null), l()),
      (Dr = 0),
      Iv(),
      (Ye = r),
      (_e = l = gr(r.current, null)),
      (je = i),
      (qe = 0),
      (gn = null),
      (va = !1),
      (Ji = Hl(r, i)),
      (Rv = !1),
      (el = bn = Lv = ei = ha = nt = 0),
      (nn = xu = null),
      (Uv = !1),
      (i & 8) !== 0 && (i |= i & 32));
    var c = r.entangledLanes;
    if (c !== 0)
      for (r = r.entanglements, c &= i; 0 < c; ) {
        var v = 31 - vn(c),
          y = 1 << v;
        ((i |= r[v]), (c &= ~y));
      }
    return ((Cr = i), Vo(), l);
  }
  function w1(r, i) {
    ((Se = null),
      (L.H = du),
      i === Ki || i === nc
        ? ((i = U0()), (qe = 3))
        : i === Gd
          ? ((i = U0()), (qe = 4))
          : (qe =
              i === xv
                ? 8
                : i !== null &&
                    typeof i == "object" &&
                    typeof i.then == "function"
                  ? 6
                  : 1),
      (gn = i),
      _e === null && ((nt = 1), yc(r, Mn(i, r.current))));
  }
  function O1() {
    var r = yn.current;
    return r === null
      ? !0
      : (je & 4194048) === je
        ? Pn === null
        : (je & 62914560) === je || (je & 536870912) !== 0
          ? r === Pn
          : !1;
  }
  function _1() {
    var r = L.H;
    return ((L.H = du), r === null ? du : r);
  }
  function A1() {
    var r = L.A;
    return ((L.A = iD), r);
  }
  function Tc() {
    ((nt = 4),
      va || ((je & 4194048) !== je && yn.current !== null) || (Ji = !0),
      ((ha & 134217727) === 0 && (ei & 134217727) === 0) ||
        Ye === null ||
        pa(Ye, je, bn, !1));
  }
  function $v(r, i, l) {
    var c = Le;
    Le |= 2;
    var v = _1(),
      y = A1();
    ((Ye !== r || je !== i) && ((Ec = null), nl(r, i)), (i = !1));
    var x = nt;
    e: do
      try {
        if (qe !== 0 && _e !== null) {
          var A = _e,
            N = gn;
          switch (qe) {
            case 8:
              (Iv(), (x = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              yn.current === null && (i = !0);
              var H = qe;
              if (((qe = 0), (gn = null), rl(r, A, N, H), l && Ji)) {
                x = 0;
                break e;
              }
              break;
            default:
              ((H = qe), (qe = 0), (gn = null), rl(r, A, N, H));
          }
        }
        (oD(), (x = nt));
        break;
      } catch (X) {
        w1(r, X);
      }
    while (!0);
    return (
      i && r.shellSuspendCounter++,
      (xr = Ka = null),
      (Le = c),
      (L.H = v),
      (L.A = y),
      _e === null && ((Ye = null), (je = 0), Vo()),
      x
    );
  }
  function oD() {
    for (; _e !== null; ) E1(_e);
  }
  function cD(r, i) {
    var l = Le;
    Le |= 2;
    var c = _1(),
      v = A1();
    Ye !== r || je !== i
      ? ((Ec = null), (Ac = fn() + 500), nl(r, i))
      : (Ji = Hl(r, i));
    e: do
      try {
        if (qe !== 0 && _e !== null) {
          i = _e;
          var y = gn;
          t: switch (qe) {
            case 1:
              ((qe = 0), (gn = null), rl(r, i, y, 1));
              break;
            case 2:
            case 9:
              if (R0(y)) {
                ((qe = 0), (gn = null), j1(i));
                break;
              }
              ((i = function () {
                ((qe !== 2 && qe !== 9) || Ye !== r || (qe = 7), tr(r));
              }),
                y.then(i, i));
              break e;
            case 3:
              qe = 7;
              break e;
            case 4:
              qe = 5;
              break e;
            case 7:
              R0(y)
                ? ((qe = 0), (gn = null), j1(i))
                : ((qe = 0), (gn = null), rl(r, i, y, 7));
              break;
            case 5:
              var x = null;
              switch (_e.tag) {
                case 26:
                  x = _e.memoizedState;
                case 5:
                case 27:
                  var A = _e;
                  if (x ? dx(x) : A.stateNode.complete) {
                    ((qe = 0), (gn = null));
                    var N = A.sibling;
                    if (N !== null) _e = N;
                    else {
                      var H = A.return;
                      H !== null ? ((_e = H), Mc(H)) : (_e = null);
                    }
                    break t;
                  }
              }
              ((qe = 0), (gn = null), rl(r, i, y, 5));
              break;
            case 6:
              ((qe = 0), (gn = null), rl(r, i, y, 6));
              break;
            case 8:
              (Iv(), (nt = 6));
              break e;
            default:
              throw Error(a(462));
          }
        }
        sD();
        break;
      } catch (X) {
        w1(r, X);
      }
    while (!0);
    return (
      (xr = Ka = null),
      (L.H = c),
      (L.A = v),
      (Le = l),
      _e !== null ? 0 : ((Ye = null), (je = 0), Vo(), nt)
    );
  }
  function sD() {
    for (; _e !== null && !PM(); ) E1(_e);
  }
  function E1(r) {
    var i = Qb(r.alternate, r, Cr);
    ((r.memoizedProps = r.pendingProps), i === null ? Mc(r) : (_e = i));
  }
  function j1(r) {
    var i = r,
      l = i.alternate;
    switch (i.tag) {
      case 15:
      case 0:
        i = Yb(l, i, i.pendingProps, i.type, void 0, je);
        break;
      case 11:
        i = Yb(l, i, i.pendingProps, i.type.render, i.ref, je);
        break;
      case 5:
        av(i);
      default:
        (Fb(l, i), (i = _e = A0(i, Cr)), (i = Qb(l, i, Cr)));
    }
    ((r.memoizedProps = r.pendingProps), i === null ? Mc(r) : (_e = i));
  }
  function rl(r, i, l, c) {
    ((xr = Ka = null), av(i), (Gi = null), (au = 0));
    var v = i.return;
    try {
      if (FC(r, v, i, l, je)) {
        ((nt = 1), yc(r, Mn(l, r.current)), (_e = null));
        return;
      }
    } catch (y) {
      if (v !== null) throw ((_e = v), y);
      ((nt = 1), yc(r, Mn(l, r.current)), (_e = null));
      return;
    }
    i.flags & 32768
      ? (Me || c === 1
          ? (r = !0)
          : Ji || (je & 536870912) !== 0
            ? (r = !1)
            : ((va = r = !0),
              (c === 2 || c === 9 || c === 3 || c === 6) &&
                ((c = yn.current),
                c !== null && c.tag === 13 && (c.flags |= 16384))),
        T1(i, r))
      : Mc(i);
  }
  function Mc(r) {
    var i = r;
    do {
      if ((i.flags & 32768) !== 0) {
        T1(i, va);
        return;
      }
      r = i.return;
      var l = tD(i.alternate, i, Cr);
      if (l !== null) {
        _e = l;
        return;
      }
      if (((i = i.sibling), i !== null)) {
        _e = i;
        return;
      }
      _e = i = r;
    } while (i !== null);
    nt === 0 && (nt = 5);
  }
  function T1(r, i) {
    do {
      var l = nD(r.alternate, r);
      if (l !== null) {
        ((l.flags &= 32767), (_e = l));
        return;
      }
      if (
        ((l = r.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !i && ((r = r.sibling), r !== null))
      ) {
        _e = r;
        return;
      }
      _e = r = l;
    } while (r !== null);
    ((nt = 6), (_e = null));
  }
  function M1(r, i, l, c, v, y, x, A, N) {
    r.cancelPendingCommit = null;
    do Cc();
    while (vt !== 0);
    if ((Le & 6) !== 0) throw Error(a(327));
    if (i !== null) {
      if (i === r.current) throw Error(a(177));
      if (
        ((y = i.lanes | i.childLanes),
        (y |= Dd),
        $M(r, l, y, x, A, N),
        r === Ye && ((_e = Ye = null), (je = 0)),
        (tl = i),
        (ya = r),
        (Dr = l),
        (qv = y),
        (Bv = v),
        (g1 = c),
        (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
          ? ((r.callbackNode = null),
            (r.callbackPriority = 0),
            hD(No, function () {
              return (z1(), null);
            }))
          : ((r.callbackNode = null), (r.callbackPriority = 0)),
        (c = (i.flags & 13878) !== 0),
        (i.subtreeFlags & 13878) !== 0 || c)
      ) {
        ((c = L.T), (L.T = null), (v = W.p), (W.p = 2), (x = Le), (Le |= 4));
        try {
          rD(r, i, l);
        } finally {
          ((Le = x), (W.p = v), (L.T = c));
        }
      }
      ((vt = 1), C1(), D1(), N1());
    }
  }
  function C1() {
    if (vt === 1) {
      vt = 0;
      var r = ya,
        i = tl,
        l = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var c = W.p;
        W.p = 2;
        var v = Le;
        Le |= 4;
        try {
          s1(i, r);
          var y = th,
            x = y0(r.containerInfo),
            A = y.focusedElem,
            N = y.selectionRange;
          if (
            x !== A &&
            A &&
            A.ownerDocument &&
            m0(A.ownerDocument.documentElement, A)
          ) {
            if (N !== null && Ed(A)) {
              var H = N.start,
                X = N.end;
              if ((X === void 0 && (X = H), "selectionStart" in A))
                ((A.selectionStart = H),
                  (A.selectionEnd = Math.min(X, A.value.length)));
              else {
                var Q = A.ownerDocument || document,
                  I = (Q && Q.defaultView) || window;
                if (I.getSelection) {
                  var Y = I.getSelection(),
                    fe = A.textContent.length,
                    ge = Math.min(N.start, fe),
                    $e = N.end === void 0 ? ge : Math.min(N.end, fe);
                  !Y.extend && ge > $e && ((x = $e), ($e = ge), (ge = x));
                  var R = h0(A, ge),
                    k = h0(A, $e);
                  if (
                    R &&
                    k &&
                    (Y.rangeCount !== 1 ||
                      Y.anchorNode !== R.node ||
                      Y.anchorOffset !== R.offset ||
                      Y.focusNode !== k.node ||
                      Y.focusOffset !== k.offset)
                  ) {
                    var B = Q.createRange();
                    (B.setStart(R.node, R.offset),
                      Y.removeAllRanges(),
                      ge > $e
                        ? (Y.addRange(B), Y.extend(k.node, k.offset))
                        : (B.setEnd(k.node, k.offset), Y.addRange(B)));
                  }
                }
              }
            }
            for (Q = [], Y = A; (Y = Y.parentNode); )
              Y.nodeType === 1 &&
                Q.push({ element: Y, left: Y.scrollLeft, top: Y.scrollTop });
            for (
              typeof A.focus == "function" && A.focus(), A = 0;
              A < Q.length;
              A++
            ) {
              var Z = Q[A];
              ((Z.element.scrollLeft = Z.left), (Z.element.scrollTop = Z.top));
            }
          }
          ((Ic = !!eh), (th = eh = null));
        } finally {
          ((Le = v), (W.p = c), (L.T = l));
        }
      }
      ((r.current = i), (vt = 2));
    }
  }
  function D1() {
    if (vt === 2) {
      vt = 0;
      var r = ya,
        i = tl,
        l = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var c = W.p;
        W.p = 2;
        var v = Le;
        Le |= 4;
        try {
          i1(r, i.alternate, i);
        } finally {
          ((Le = v), (W.p = c), (L.T = l));
        }
      }
      vt = 3;
    }
  }
  function N1() {
    if (vt === 4 || vt === 3) {
      ((vt = 0), zM());
      var r = ya,
        i = tl,
        l = Dr,
        c = g1;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
        ? (vt = 5)
        : ((vt = 0), (tl = ya = null), P1(r, r.pendingLanes));
      var v = r.pendingLanes;
      if (
        (v === 0 && (ma = null),
        ud(l),
        (i = i.stateNode),
        dn && typeof dn.onCommitFiberRoot == "function")
      )
        try {
          dn.onCommitFiberRoot(Bl, i, void 0, (i.current.flags & 128) === 128);
        } catch {}
      if (c !== null) {
        ((i = L.T), (v = W.p), (W.p = 2), (L.T = null));
        try {
          for (var y = r.onRecoverableError, x = 0; x < c.length; x++) {
            var A = c[x];
            y(A.value, { componentStack: A.stack });
          }
        } finally {
          ((L.T = i), (W.p = v));
        }
      }
      ((Dr & 3) !== 0 && Cc(),
        tr(r),
        (v = r.pendingLanes),
        (l & 261930) !== 0 && (v & 42) !== 0
          ? r === Hv
            ? Su++
            : ((Su = 0), (Hv = r))
          : (Su = 0),
        wu(0));
    }
  }
  function P1(r, i) {
    (r.pooledCacheLanes &= i) === 0 &&
      ((i = r.pooledCache), i != null && ((r.pooledCache = null), nu(i)));
  }
  function Cc() {
    return (C1(), D1(), N1(), z1());
  }
  function z1() {
    if (vt !== 5) return !1;
    var r = ya,
      i = qv;
    qv = 0;
    var l = ud(Dr),
      c = L.T,
      v = W.p;
    try {
      ((W.p = 32 > l ? 32 : l), (L.T = null), (l = Bv), (Bv = null));
      var y = ya,
        x = Dr;
      if (((vt = 0), (tl = ya = null), (Dr = 0), (Le & 6) !== 0))
        throw Error(a(331));
      var A = Le;
      if (
        ((Le |= 4),
        m1(y.current),
        d1(y, y.current, x, l),
        (Le = A),
        wu(0, !1),
        dn && typeof dn.onPostCommitFiberRoot == "function")
      )
        try {
          dn.onPostCommitFiberRoot(Bl, y);
        } catch {}
      return !0;
    } finally {
      ((W.p = v), (L.T = c), P1(r, i));
    }
  }
  function k1(r, i, l) {
    ((i = Mn(l, i)),
      (i = bv(r.stateNode, i, 2)),
      (r = ca(r, i, 2)),
      r !== null && (Il(r, 2), tr(r)));
  }
  function Be(r, i, l) {
    if (r.tag === 3) k1(r, r, l);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          k1(i, r, l);
          break;
        } else if (i.tag === 1) {
          var c = i.stateNode;
          if (
            typeof i.type.getDerivedStateFromError == "function" ||
            (typeof c.componentDidCatch == "function" &&
              (ma === null || !ma.has(c)))
          ) {
            ((r = Mn(l, r)),
              (l = Rb(2)),
              (c = ca(i, l, 2)),
              c !== null && (Lb(l, c, i, r), Il(c, 2), tr(c)));
            break;
          }
        }
        i = i.return;
      }
  }
  function Yv(r, i, l) {
    var c = r.pingCache;
    if (c === null) {
      c = r.pingCache = new lD();
      var v = new Set();
      c.set(i, v);
    } else ((v = c.get(i)), v === void 0 && ((v = new Set()), c.set(i, v)));
    v.has(l) ||
      ((Rv = !0), v.add(l), (r = fD.bind(null, r, i, l)), i.then(r, r));
  }
  function fD(r, i, l) {
    var c = r.pingCache;
    (c !== null && c.delete(i),
      (r.pingedLanes |= r.suspendedLanes & l),
      (r.warmLanes &= ~l),
      Ye === r &&
        (je & l) === l &&
        (nt === 4 || (nt === 3 && (je & 62914560) === je && 300 > fn() - _c)
          ? (Le & 2) === 0 && nl(r, 0)
          : (Lv |= l),
        el === je && (el = 0)),
      tr(r));
  }
  function R1(r, i) {
    (i === 0 && (i = Cg()), (r = Ia(r, i)), r !== null && (Il(r, i), tr(r)));
  }
  function dD(r) {
    var i = r.memoizedState,
      l = 0;
    (i !== null && (l = i.retryLane), R1(r, l));
  }
  function vD(r, i) {
    var l = 0;
    switch (r.tag) {
      case 31:
      case 13:
        var c = r.stateNode,
          v = r.memoizedState;
        v !== null && (l = v.retryLane);
        break;
      case 19:
        c = r.stateNode;
        break;
      case 22:
        c = r.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    (c !== null && c.delete(i), R1(r, l));
  }
  function hD(r, i) {
    return rd(r, i);
  }
  var Dc = null,
    al = null,
    Kv = !1,
    Nc = !1,
    Gv = !1,
    ga = 0;
  function tr(r) {
    (r !== al &&
      r.next === null &&
      (al === null ? (Dc = al = r) : (al = al.next = r)),
      (Nc = !0),
      Kv || ((Kv = !0), yD()));
  }
  function wu(r, i) {
    if (!Gv && Nc) {
      Gv = !0;
      do
        for (var l = !1, c = Dc; c !== null; ) {
          if (r !== 0) {
            var v = c.pendingLanes;
            if (v === 0) var y = 0;
            else {
              var x = c.suspendedLanes,
                A = c.pingedLanes;
              ((y = (1 << (31 - vn(42 | r) + 1)) - 1),
                (y &= v & ~(x & ~A)),
                (y = y & 201326741 ? (y & 201326741) | 1 : y ? y | 2 : 0));
            }
            y !== 0 && ((l = !0), B1(c, y));
          } else
            ((y = je),
              (y = Ro(
                c,
                c === Ye ? y : 0,
                c.cancelPendingCommit !== null || c.timeoutHandle !== -1,
              )),
              (y & 3) === 0 || Hl(c, y) || ((l = !0), B1(c, y)));
          c = c.next;
        }
      while (l);
      Gv = !1;
    }
  }
  function mD() {
    L1();
  }
  function L1() {
    Nc = Kv = !1;
    var r = 0;
    ga !== 0 && ED() && (r = ga);
    for (var i = fn(), l = null, c = Dc; c !== null; ) {
      var v = c.next,
        y = U1(c, i);
      (y === 0
        ? ((c.next = null),
          l === null ? (Dc = v) : (l.next = v),
          v === null && (al = l))
        : ((l = c), (r !== 0 || (y & 3) !== 0) && (Nc = !0)),
        (c = v));
    }
    ((vt !== 0 && vt !== 5) || wu(r), ga !== 0 && (ga = 0));
  }
  function U1(r, i) {
    for (
      var l = r.suspendedLanes,
        c = r.pingedLanes,
        v = r.expirationTimes,
        y = r.pendingLanes & -62914561;
      0 < y;
    ) {
      var x = 31 - vn(y),
        A = 1 << x,
        N = v[x];
      (N === -1
        ? ((A & l) === 0 || (A & c) !== 0) && (v[x] = IM(A, i))
        : N <= i && (r.expiredLanes |= A),
        (y &= ~A));
    }
    if (
      ((i = Ye),
      (l = je),
      (l = Ro(
        r,
        r === i ? l : 0,
        r.cancelPendingCommit !== null || r.timeoutHandle !== -1,
      )),
      (c = r.callbackNode),
      l === 0 ||
        (r === i && (qe === 2 || qe === 9)) ||
        r.cancelPendingCommit !== null)
    )
      return (
        c !== null && c !== null && ad(c),
        (r.callbackNode = null),
        (r.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Hl(r, l)) {
      if (((i = l & -l), i === r.callbackPriority)) return i;
      switch ((c !== null && ad(c), ud(l))) {
        case 2:
        case 8:
          l = Tg;
          break;
        case 32:
          l = No;
          break;
        case 268435456:
          l = Mg;
          break;
        default:
          l = No;
      }
      return (
        (c = q1.bind(null, r)),
        (l = rd(l, c)),
        (r.callbackPriority = i),
        (r.callbackNode = l),
        i
      );
    }
    return (
      c !== null && c !== null && ad(c),
      (r.callbackPriority = 2),
      (r.callbackNode = null),
      2
    );
  }
  function q1(r, i) {
    if (vt !== 0 && vt !== 5)
      return ((r.callbackNode = null), (r.callbackPriority = 0), null);
    var l = r.callbackNode;
    if (Cc() && r.callbackNode !== l) return null;
    var c = je;
    return (
      (c = Ro(
        r,
        r === Ye ? c : 0,
        r.cancelPendingCommit !== null || r.timeoutHandle !== -1,
      )),
      c === 0
        ? null
        : (x1(r, c, i),
          U1(r, fn()),
          r.callbackNode != null && r.callbackNode === l
            ? q1.bind(null, r)
            : null)
    );
  }
  function B1(r, i) {
    if (Cc()) return null;
    x1(r, i, !0);
  }
  function yD() {
    TD(function () {
      (Le & 6) !== 0 ? rd(jg, mD) : L1();
    });
  }
  function Xv() {
    if (ga === 0) {
      var r = $i;
      (r === 0 && ((r = Po), (Po <<= 1), (Po & 261888) === 0 && (Po = 256)),
        (ga = r));
    }
    return ga;
  }
  function H1(r) {
    return r == null || typeof r == "symbol" || typeof r == "boolean"
      ? null
      : typeof r == "function"
        ? r
        : Bo("" + r);
  }
  function I1(r, i) {
    var l = i.ownerDocument.createElement("input");
    return (
      (l.name = i.name),
      (l.value = i.value),
      r.id && l.setAttribute("form", r.id),
      i.parentNode.insertBefore(l, i),
      (r = new FormData(r)),
      l.parentNode.removeChild(l),
      r
    );
  }
  function pD(r, i, l, c, v) {
    if (i === "submit" && l && l.stateNode === v) {
      var y = H1((v[Wt] || null).action),
        x = c.submitter;
      x &&
        ((i = (i = x[Wt] || null)
          ? H1(i.formAction)
          : x.getAttribute("formAction")),
        i !== null && ((y = i), (x = null)));
      var A = new Yo("action", "action", null, c, v);
      r.push({
        event: A,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (c.defaultPrevented) {
                if (ga !== 0) {
                  var N = x ? I1(v, x) : new FormData(v);
                  vv(
                    l,
                    { pending: !0, data: N, method: v.method, action: y },
                    null,
                    N,
                  );
                }
              } else
                typeof y == "function" &&
                  (A.preventDefault(),
                  (N = x ? I1(v, x) : new FormData(v)),
                  vv(
                    l,
                    { pending: !0, data: N, method: v.method, action: y },
                    y,
                    N,
                  ));
            },
            currentTarget: v,
          },
        ],
      });
    }
  }
  for (var Vv = 0; Vv < Cd.length; Vv++) {
    var Zv = Cd[Vv],
      gD = Zv.toLowerCase(),
      bD = Zv[0].toUpperCase() + Zv.slice(1);
    Yn(gD, "on" + bD);
  }
  (Yn(b0, "onAnimationEnd"),
    Yn(x0, "onAnimationIteration"),
    Yn(S0, "onAnimationStart"),
    Yn("dblclick", "onDoubleClick"),
    Yn("focusin", "onFocus"),
    Yn("focusout", "onBlur"),
    Yn(kC, "onTransitionRun"),
    Yn(RC, "onTransitionStart"),
    Yn(LC, "onTransitionCancel"),
    Yn(w0, "onTransitionEnd"),
    Mi("onMouseEnter", ["mouseout", "mouseover"]),
    Mi("onMouseLeave", ["mouseout", "mouseover"]),
    Mi("onPointerEnter", ["pointerout", "pointerover"]),
    Mi("onPointerLeave", ["pointerout", "pointerover"]),
    Ua(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Ua(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Ua("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ua(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ua(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ua(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Ou =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    xD = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ou),
    );
  function $1(r, i) {
    i = (i & 4) !== 0;
    for (var l = 0; l < r.length; l++) {
      var c = r[l],
        v = c.event;
      c = c.listeners;
      e: {
        var y = void 0;
        if (i)
          for (var x = c.length - 1; 0 <= x; x--) {
            var A = c[x],
              N = A.instance,
              H = A.currentTarget;
            if (((A = A.listener), N !== y && v.isPropagationStopped()))
              break e;
            ((y = A), (v.currentTarget = H));
            try {
              y(v);
            } catch (X) {
              Xo(X);
            }
            ((v.currentTarget = null), (y = N));
          }
        else
          for (x = 0; x < c.length; x++) {
            if (
              ((A = c[x]),
              (N = A.instance),
              (H = A.currentTarget),
              (A = A.listener),
              N !== y && v.isPropagationStopped())
            )
              break e;
            ((y = A), (v.currentTarget = H));
            try {
              y(v);
            } catch (X) {
              Xo(X);
            }
            ((v.currentTarget = null), (y = N));
          }
      }
    }
  }
  function Ae(r, i) {
    var l = i[od];
    l === void 0 && (l = i[od] = new Set());
    var c = r + "__bubble";
    l.has(c) || (Y1(i, r, 2, !1), l.add(c));
  }
  function Qv(r, i, l) {
    var c = 0;
    (i && (c |= 4), Y1(l, r, c, i));
  }
  var Pc = "_reactListening" + Math.random().toString(36).slice(2);
  function Wv(r) {
    if (!r[Pc]) {
      ((r[Pc] = !0),
        Lg.forEach(function (l) {
          l !== "selectionchange" && (xD.has(l) || Qv(l, !1, r), Qv(l, !0, r));
        }));
      var i = r.nodeType === 9 ? r : r.ownerDocument;
      i === null || i[Pc] || ((i[Pc] = !0), Qv("selectionchange", !1, i));
    }
  }
  function Y1(r, i, l, c) {
    switch (bx(i)) {
      case 2:
        var v = VD;
        break;
      case 8:
        v = ZD;
        break;
      default:
        v = dh;
    }
    ((l = v.bind(null, i, l, r)),
      (v = void 0),
      !pd ||
        (i !== "touchstart" && i !== "touchmove" && i !== "wheel") ||
        (v = !0),
      c
        ? v !== void 0
          ? r.addEventListener(i, l, { capture: !0, passive: v })
          : r.addEventListener(i, l, !0)
        : v !== void 0
          ? r.addEventListener(i, l, { passive: v })
          : r.addEventListener(i, l, !1));
  }
  function Fv(r, i, l, c, v) {
    var y = c;
    if ((i & 1) === 0 && (i & 2) === 0 && c !== null)
      e: for (;;) {
        if (c === null) return;
        var x = c.tag;
        if (x === 3 || x === 4) {
          var A = c.stateNode.containerInfo;
          if (A === v) break;
          if (x === 4)
            for (x = c.return; x !== null; ) {
              var N = x.tag;
              if ((N === 3 || N === 4) && x.stateNode.containerInfo === v)
                return;
              x = x.return;
            }
          for (; A !== null; ) {
            if (((x = Ei(A)), x === null)) return;
            if (((N = x.tag), N === 5 || N === 6 || N === 26 || N === 27)) {
              c = y = x;
              continue e;
            }
            A = A.parentNode;
          }
        }
        c = c.return;
      }
    Zg(function () {
      var H = y,
        X = md(l),
        Q = [];
      e: {
        var I = O0.get(r);
        if (I !== void 0) {
          var Y = Yo,
            fe = r;
          switch (r) {
            case "keypress":
              if (Io(l) === 0) break e;
            case "keydown":
            case "keyup":
              Y = vC;
              break;
            case "focusin":
              ((fe = "focus"), (Y = Sd));
              break;
            case "focusout":
              ((fe = "blur"), (Y = Sd));
              break;
            case "beforeblur":
            case "afterblur":
              Y = Sd;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Y = Fg;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Y = tC;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Y = yC;
              break;
            case b0:
            case x0:
            case S0:
              Y = aC;
              break;
            case w0:
              Y = gC;
              break;
            case "scroll":
            case "scrollend":
              Y = JM;
              break;
            case "wheel":
              Y = xC;
              break;
            case "copy":
            case "cut":
            case "paste":
              Y = lC;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Y = e0;
              break;
            case "toggle":
            case "beforetoggle":
              Y = wC;
          }
          var ge = (i & 4) !== 0,
            $e = !ge && (r === "scroll" || r === "scrollend"),
            R = ge ? (I !== null ? I + "Capture" : null) : I;
          ge = [];
          for (var k = H, B; k !== null; ) {
            var Z = k;
            if (
              ((B = Z.stateNode),
              (Z = Z.tag),
              (Z !== 5 && Z !== 26 && Z !== 27) ||
                B === null ||
                R === null ||
                ((Z = Kl(k, R)), Z != null && ge.push(_u(k, Z, B))),
              $e)
            )
              break;
            k = k.return;
          }
          0 < ge.length &&
            ((I = new Y(I, fe, null, l, X)),
            Q.push({ event: I, listeners: ge }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (
            ((I = r === "mouseover" || r === "pointerover"),
            (Y = r === "mouseout" || r === "pointerout"),
            I &&
              l !== hd &&
              (fe = l.relatedTarget || l.fromElement) &&
              (Ei(fe) || fe[Ai]))
          )
            break e;
          if (
            (Y || I) &&
            ((I =
              X.window === X
                ? X
                : (I = X.ownerDocument)
                  ? I.defaultView || I.parentWindow
                  : window),
            Y
              ? ((fe = l.relatedTarget || l.toElement),
                (Y = H),
                (fe = fe ? Ei(fe) : null),
                fe !== null &&
                  (($e = o(fe)),
                  (ge = fe.tag),
                  fe !== $e || (ge !== 5 && ge !== 27 && ge !== 6)) &&
                  (fe = null))
              : ((Y = null), (fe = H)),
            Y !== fe)
          ) {
            if (
              ((ge = Fg),
              (Z = "onMouseLeave"),
              (R = "onMouseEnter"),
              (k = "mouse"),
              (r === "pointerout" || r === "pointerover") &&
                ((ge = e0),
                (Z = "onPointerLeave"),
                (R = "onPointerEnter"),
                (k = "pointer")),
              ($e = Y == null ? I : Yl(Y)),
              (B = fe == null ? I : Yl(fe)),
              (I = new ge(Z, k + "leave", Y, l, X)),
              (I.target = $e),
              (I.relatedTarget = B),
              (Z = null),
              Ei(X) === H &&
                ((ge = new ge(R, k + "enter", fe, l, X)),
                (ge.target = B),
                (ge.relatedTarget = $e),
                (Z = ge)),
              ($e = Z),
              Y && fe)
            )
              t: {
                for (ge = SD, R = Y, k = fe, B = 0, Z = R; Z; Z = ge(Z)) B++;
                Z = 0;
                for (var me = k; me; me = ge(me)) Z++;
                for (; 0 < B - Z; ) ((R = ge(R)), B--);
                for (; 0 < Z - B; ) ((k = ge(k)), Z--);
                for (; B--; ) {
                  if (R === k || (k !== null && R === k.alternate)) {
                    ge = R;
                    break t;
                  }
                  ((R = ge(R)), (k = ge(k)));
                }
                ge = null;
              }
            else ge = null;
            (Y !== null && K1(Q, I, Y, ge, !1),
              fe !== null && $e !== null && K1(Q, $e, fe, ge, !0));
          }
        }
        e: {
          if (
            ((I = H ? Yl(H) : window),
            (Y = I.nodeName && I.nodeName.toLowerCase()),
            Y === "select" || (Y === "input" && I.type === "file"))
          )
            var Pe = o0;
          else if (l0(I))
            if (c0) Pe = NC;
            else {
              Pe = CC;
              var de = MC;
            }
          else
            ((Y = I.nodeName),
              !Y ||
              Y.toLowerCase() !== "input" ||
              (I.type !== "checkbox" && I.type !== "radio")
                ? H && vd(H.elementType) && (Pe = o0)
                : (Pe = DC));
          if (Pe && (Pe = Pe(r, H))) {
            u0(Q, Pe, l, X);
            break e;
          }
          (de && de(r, I, H),
            r === "focusout" &&
              H &&
              I.type === "number" &&
              H.memoizedProps.value != null &&
              dd(I, "number", I.value));
        }
        switch (((de = H ? Yl(H) : window), r)) {
          case "focusin":
            (l0(de) || de.contentEditable === "true") &&
              ((ki = de), (jd = H), (Jl = null));
            break;
          case "focusout":
            Jl = jd = ki = null;
            break;
          case "mousedown":
            Td = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Td = !1), p0(Q, l, X));
            break;
          case "selectionchange":
            if (zC) break;
          case "keydown":
          case "keyup":
            p0(Q, l, X);
        }
        var we;
        if (Od)
          e: {
            switch (r) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          zi
            ? a0(r, l) && (Te = "onCompositionEnd")
            : r === "keydown" &&
              l.keyCode === 229 &&
              (Te = "onCompositionStart");
        (Te &&
          (t0 &&
            l.locale !== "ko" &&
            (zi || Te !== "onCompositionStart"
              ? Te === "onCompositionEnd" && zi && (we = Qg())
              : ((na = X),
                (gd = "value" in na ? na.value : na.textContent),
                (zi = !0))),
          (de = zc(H, Te)),
          0 < de.length &&
            ((Te = new Jg(Te, r, null, l, X)),
            Q.push({ event: Te, listeners: de }),
            we
              ? (Te.data = we)
              : ((we = i0(l)), we !== null && (Te.data = we)))),
          (we = _C ? AC(r, l) : EC(r, l)) &&
            ((Te = zc(H, "onBeforeInput")),
            0 < Te.length &&
              ((de = new Jg("onBeforeInput", "beforeinput", null, l, X)),
              Q.push({ event: de, listeners: Te }),
              (de.data = we))),
          pD(Q, r, H, l, X));
      }
      $1(Q, i);
    });
  }
  function _u(r, i, l) {
    return { instance: r, listener: i, currentTarget: l };
  }
  function zc(r, i) {
    for (var l = i + "Capture", c = []; r !== null; ) {
      var v = r,
        y = v.stateNode;
      if (
        ((v = v.tag),
        (v !== 5 && v !== 26 && v !== 27) ||
          y === null ||
          ((v = Kl(r, l)),
          v != null && c.unshift(_u(r, v, y)),
          (v = Kl(r, i)),
          v != null && c.push(_u(r, v, y))),
        r.tag === 3)
      )
        return c;
      r = r.return;
    }
    return [];
  }
  function SD(r) {
    if (r === null) return null;
    do r = r.return;
    while (r && r.tag !== 5 && r.tag !== 27);
    return r || null;
  }
  function K1(r, i, l, c, v) {
    for (var y = i._reactName, x = []; l !== null && l !== c; ) {
      var A = l,
        N = A.alternate,
        H = A.stateNode;
      if (((A = A.tag), N !== null && N === c)) break;
      ((A !== 5 && A !== 26 && A !== 27) ||
        H === null ||
        ((N = H),
        v
          ? ((H = Kl(l, y)), H != null && x.unshift(_u(l, H, N)))
          : v || ((H = Kl(l, y)), H != null && x.push(_u(l, H, N)))),
        (l = l.return));
    }
    x.length !== 0 && r.push({ event: i, listeners: x });
  }
  var wD = /\r\n?/g,
    OD = /\u0000|\uFFFD/g;
  function G1(r) {
    return (typeof r == "string" ? r : "" + r)
      .replace(
        wD,
        `
`,
      )
      .replace(OD, "");
  }
  function X1(r, i) {
    return ((i = G1(i)), G1(r) === i);
  }
  function Ie(r, i, l, c, v, y) {
    switch (l) {
      case "children":
        typeof c == "string"
          ? i === "body" || (i === "textarea" && c === "") || Di(r, c)
          : (typeof c == "number" || typeof c == "bigint") &&
            i !== "body" &&
            Di(r, "" + c);
        break;
      case "className":
        Uo(r, "class", c);
        break;
      case "tabIndex":
        Uo(r, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Uo(r, l, c);
        break;
      case "style":
        Xg(r, c, y);
        break;
      case "data":
        if (i !== "object") {
          Uo(r, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (i !== "a" || l !== "href")) {
          r.removeAttribute(l);
          break;
        }
        if (
          c == null ||
          typeof c == "function" ||
          typeof c == "symbol" ||
          typeof c == "boolean"
        ) {
          r.removeAttribute(l);
          break;
        }
        ((c = Bo("" + c)), r.setAttribute(l, c));
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          r.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof y == "function" &&
            (l === "formAction"
              ? (i !== "input" && Ie(r, i, "name", v.name, v, null),
                Ie(r, i, "formEncType", v.formEncType, v, null),
                Ie(r, i, "formMethod", v.formMethod, v, null),
                Ie(r, i, "formTarget", v.formTarget, v, null))
              : (Ie(r, i, "encType", v.encType, v, null),
                Ie(r, i, "method", v.method, v, null),
                Ie(r, i, "target", v.target, v, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          r.removeAttribute(l);
          break;
        }
        ((c = Bo("" + c)), r.setAttribute(l, c));
        break;
      case "onClick":
        c != null && (r.onclick = yr);
        break;
      case "onScroll":
        c != null && Ae("scroll", r);
        break;
      case "onScrollEnd":
        c != null && Ae("scrollend", r);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c)) throw Error(a(61));
          if (((l = c.__html), l != null)) {
            if (v.children != null) throw Error(a(60));
            r.innerHTML = l;
          }
        }
        break;
      case "multiple":
        r.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        r.muted = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          c == null ||
          typeof c == "function" ||
          typeof c == "boolean" ||
          typeof c == "symbol"
        ) {
          r.removeAttribute("xlink:href");
          break;
        }
        ((l = Bo("" + c)),
          r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        c != null && typeof c != "function" && typeof c != "symbol"
          ? r.setAttribute(l, "" + c)
          : r.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        c && typeof c != "function" && typeof c != "symbol"
          ? r.setAttribute(l, "")
          : r.removeAttribute(l);
        break;
      case "capture":
      case "download":
        c === !0
          ? r.setAttribute(l, "")
          : c !== !1 &&
              c != null &&
              typeof c != "function" &&
              typeof c != "symbol"
            ? r.setAttribute(l, c)
            : r.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        !isNaN(c) &&
        1 <= c
          ? r.setAttribute(l, c)
          : r.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c)
          ? r.removeAttribute(l)
          : r.setAttribute(l, c);
        break;
      case "popover":
        (Ae("beforetoggle", r), Ae("toggle", r), Lo(r, "popover", c));
        break;
      case "xlinkActuate":
        mr(r, "http://www.w3.org/1999/xlink", "xlink:actuate", c);
        break;
      case "xlinkArcrole":
        mr(r, "http://www.w3.org/1999/xlink", "xlink:arcrole", c);
        break;
      case "xlinkRole":
        mr(r, "http://www.w3.org/1999/xlink", "xlink:role", c);
        break;
      case "xlinkShow":
        mr(r, "http://www.w3.org/1999/xlink", "xlink:show", c);
        break;
      case "xlinkTitle":
        mr(r, "http://www.w3.org/1999/xlink", "xlink:title", c);
        break;
      case "xlinkType":
        mr(r, "http://www.w3.org/1999/xlink", "xlink:type", c);
        break;
      case "xmlBase":
        mr(r, "http://www.w3.org/XML/1998/namespace", "xml:base", c);
        break;
      case "xmlLang":
        mr(r, "http://www.w3.org/XML/1998/namespace", "xml:lang", c);
        break;
      case "xmlSpace":
        mr(r, "http://www.w3.org/XML/1998/namespace", "xml:space", c);
        break;
      case "is":
        Lo(r, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = WM.get(l) || l), Lo(r, l, c));
    }
  }
  function Jv(r, i, l, c, v, y) {
    switch (l) {
      case "style":
        Xg(r, c, y);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c)) throw Error(a(61));
          if (((l = c.__html), l != null)) {
            if (v.children != null) throw Error(a(60));
            r.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof c == "string"
          ? Di(r, c)
          : (typeof c == "number" || typeof c == "bigint") && Di(r, "" + c);
        break;
      case "onScroll":
        c != null && Ae("scroll", r);
        break;
      case "onScrollEnd":
        c != null && Ae("scrollend", r);
        break;
      case "onClick":
        c != null && (r.onclick = yr);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ug.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((v = l.endsWith("Capture")),
              (i = l.slice(2, v ? l.length - 7 : void 0)),
              (y = r[Wt] || null),
              (y = y != null ? y[l] : null),
              typeof y == "function" && r.removeEventListener(i, y, v),
              typeof c == "function")
            ) {
              (typeof y != "function" &&
                y !== null &&
                (l in r
                  ? (r[l] = null)
                  : r.hasAttribute(l) && r.removeAttribute(l)),
                r.addEventListener(i, c, v));
              break e;
            }
            l in r
              ? (r[l] = c)
              : c === !0
                ? r.setAttribute(l, "")
                : Lo(r, l, c);
          }
    }
  }
  function zt(r, i, l) {
    switch (i) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Ae("error", r), Ae("load", r));
        var c = !1,
          v = !1,
          y;
        for (y in l)
          if (l.hasOwnProperty(y)) {
            var x = l[y];
            if (x != null)
              switch (y) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  v = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, i));
                default:
                  Ie(r, i, y, x, l, null);
              }
          }
        (v && Ie(r, i, "srcSet", l.srcSet, l, null),
          c && Ie(r, i, "src", l.src, l, null));
        return;
      case "input":
        Ae("invalid", r);
        var A = (y = x = v = null),
          N = null,
          H = null;
        for (c in l)
          if (l.hasOwnProperty(c)) {
            var X = l[c];
            if (X != null)
              switch (c) {
                case "name":
                  v = X;
                  break;
                case "type":
                  x = X;
                  break;
                case "checked":
                  N = X;
                  break;
                case "defaultChecked":
                  H = X;
                  break;
                case "value":
                  y = X;
                  break;
                case "defaultValue":
                  A = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null) throw Error(a(137, i));
                  break;
                default:
                  Ie(r, i, c, X, l, null);
              }
          }
        $g(r, y, A, N, H, x, v, !1);
        return;
      case "select":
        (Ae("invalid", r), (c = x = y = null));
        for (v in l)
          if (l.hasOwnProperty(v) && ((A = l[v]), A != null))
            switch (v) {
              case "value":
                y = A;
                break;
              case "defaultValue":
                x = A;
                break;
              case "multiple":
                c = A;
              default:
                Ie(r, i, v, A, l, null);
            }
        ((i = y),
          (l = x),
          (r.multiple = !!c),
          i != null ? Ci(r, !!c, i, !1) : l != null && Ci(r, !!c, l, !0));
        return;
      case "textarea":
        (Ae("invalid", r), (y = v = c = null));
        for (x in l)
          if (l.hasOwnProperty(x) && ((A = l[x]), A != null))
            switch (x) {
              case "value":
                c = A;
                break;
              case "defaultValue":
                v = A;
                break;
              case "children":
                y = A;
                break;
              case "dangerouslySetInnerHTML":
                if (A != null) throw Error(a(91));
                break;
              default:
                Ie(r, i, x, A, l, null);
            }
        Kg(r, c, v, y);
        return;
      case "option":
        for (N in l)
          l.hasOwnProperty(N) &&
            ((c = l[N]), c != null) &&
            (N === "selected"
              ? (r.selected =
                  c && typeof c != "function" && typeof c != "symbol")
              : Ie(r, i, N, c, l, null));
        return;
      case "dialog":
        (Ae("beforetoggle", r),
          Ae("toggle", r),
          Ae("cancel", r),
          Ae("close", r));
        break;
      case "iframe":
      case "object":
        Ae("load", r);
        break;
      case "video":
      case "audio":
        for (c = 0; c < Ou.length; c++) Ae(Ou[c], r);
        break;
      case "image":
        (Ae("error", r), Ae("load", r));
        break;
      case "details":
        Ae("toggle", r);
        break;
      case "embed":
      case "source":
      case "link":
        (Ae("error", r), Ae("load", r));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in l)
          if (l.hasOwnProperty(H) && ((c = l[H]), c != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, i));
              default:
                Ie(r, i, H, c, l, null);
            }
        return;
      default:
        if (vd(i)) {
          for (X in l)
            l.hasOwnProperty(X) &&
              ((c = l[X]), c !== void 0 && Jv(r, i, X, c, l, void 0));
          return;
        }
    }
    for (A in l)
      l.hasOwnProperty(A) && ((c = l[A]), c != null && Ie(r, i, A, c, l, null));
  }
  function _D(r, i, l, c) {
    switch (i) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var v = null,
          y = null,
          x = null,
          A = null,
          N = null,
          H = null,
          X = null;
        for (Y in l) {
          var Q = l[Y];
          if (l.hasOwnProperty(Y) && Q != null)
            switch (Y) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                N = Q;
              default:
                c.hasOwnProperty(Y) || Ie(r, i, Y, null, c, Q);
            }
        }
        for (var I in c) {
          var Y = c[I];
          if (((Q = l[I]), c.hasOwnProperty(I) && (Y != null || Q != null)))
            switch (I) {
              case "type":
                y = Y;
                break;
              case "name":
                v = Y;
                break;
              case "checked":
                H = Y;
                break;
              case "defaultChecked":
                X = Y;
                break;
              case "value":
                x = Y;
                break;
              case "defaultValue":
                A = Y;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null) throw Error(a(137, i));
                break;
              default:
                Y !== Q && Ie(r, i, I, Y, c, Q);
            }
        }
        fd(r, x, A, N, H, X, y, v);
        return;
      case "select":
        Y = x = A = I = null;
        for (y in l)
          if (((N = l[y]), l.hasOwnProperty(y) && N != null))
            switch (y) {
              case "value":
                break;
              case "multiple":
                Y = N;
              default:
                c.hasOwnProperty(y) || Ie(r, i, y, null, c, N);
            }
        for (v in c)
          if (
            ((y = c[v]),
            (N = l[v]),
            c.hasOwnProperty(v) && (y != null || N != null))
          )
            switch (v) {
              case "value":
                I = y;
                break;
              case "defaultValue":
                A = y;
                break;
              case "multiple":
                x = y;
              default:
                y !== N && Ie(r, i, v, y, c, N);
            }
        ((i = A),
          (l = x),
          (c = Y),
          I != null
            ? Ci(r, !!l, I, !1)
            : !!c != !!l &&
              (i != null ? Ci(r, !!l, i, !0) : Ci(r, !!l, l ? [] : "", !1)));
        return;
      case "textarea":
        Y = I = null;
        for (A in l)
          if (
            ((v = l[A]),
            l.hasOwnProperty(A) && v != null && !c.hasOwnProperty(A))
          )
            switch (A) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ie(r, i, A, null, c, v);
            }
        for (x in c)
          if (
            ((v = c[x]),
            (y = l[x]),
            c.hasOwnProperty(x) && (v != null || y != null))
          )
            switch (x) {
              case "value":
                I = v;
                break;
              case "defaultValue":
                Y = v;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(a(91));
                break;
              default:
                v !== y && Ie(r, i, x, v, c, y);
            }
        Yg(r, I, Y);
        return;
      case "option":
        for (var fe in l)
          ((I = l[fe]),
            l.hasOwnProperty(fe) &&
              I != null &&
              !c.hasOwnProperty(fe) &&
              (fe === "selected"
                ? (r.selected = !1)
                : Ie(r, i, fe, null, c, I)));
        for (N in c)
          ((I = c[N]),
            (Y = l[N]),
            c.hasOwnProperty(N) &&
              I !== Y &&
              (I != null || Y != null) &&
              (N === "selected"
                ? (r.selected =
                    I && typeof I != "function" && typeof I != "symbol")
                : Ie(r, i, N, I, c, Y)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ge in l)
          ((I = l[ge]),
            l.hasOwnProperty(ge) &&
              I != null &&
              !c.hasOwnProperty(ge) &&
              Ie(r, i, ge, null, c, I));
        for (H in c)
          if (
            ((I = c[H]),
            (Y = l[H]),
            c.hasOwnProperty(H) && I !== Y && (I != null || Y != null))
          )
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (I != null) throw Error(a(137, i));
                break;
              default:
                Ie(r, i, H, I, c, Y);
            }
        return;
      default:
        if (vd(i)) {
          for (var $e in l)
            ((I = l[$e]),
              l.hasOwnProperty($e) &&
                I !== void 0 &&
                !c.hasOwnProperty($e) &&
                Jv(r, i, $e, void 0, c, I));
          for (X in c)
            ((I = c[X]),
              (Y = l[X]),
              !c.hasOwnProperty(X) ||
                I === Y ||
                (I === void 0 && Y === void 0) ||
                Jv(r, i, X, I, c, Y));
          return;
        }
    }
    for (var R in l)
      ((I = l[R]),
        l.hasOwnProperty(R) &&
          I != null &&
          !c.hasOwnProperty(R) &&
          Ie(r, i, R, null, c, I));
    for (Q in c)
      ((I = c[Q]),
        (Y = l[Q]),
        !c.hasOwnProperty(Q) ||
          I === Y ||
          (I == null && Y == null) ||
          Ie(r, i, Q, I, c, Y));
  }
  function V1(r) {
    switch (r) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function AD() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var r = 0, i = 0, l = performance.getEntriesByType("resource"), c = 0;
        c < l.length;
        c++
      ) {
        var v = l[c],
          y = v.transferSize,
          x = v.initiatorType,
          A = v.duration;
        if (y && A && V1(x)) {
          for (x = 0, A = v.responseEnd, c += 1; c < l.length; c++) {
            var N = l[c],
              H = N.startTime;
            if (H > A) break;
            var X = N.transferSize,
              Q = N.initiatorType;
            X &&
              V1(Q) &&
              ((N = N.responseEnd), (x += X * (N < A ? 1 : (A - H) / (N - H))));
          }
          if ((--c, (i += (8 * (y + x)) / (v.duration / 1e3)), r++, 10 < r))
            break;
        }
      }
      if (0 < r) return i / r / 1e6;
    }
    return navigator.connection &&
      ((r = navigator.connection.downlink), typeof r == "number")
      ? r
      : 5;
  }
  var eh = null,
    th = null;
  function kc(r) {
    return r.nodeType === 9 ? r : r.ownerDocument;
  }
  function Z1(r) {
    switch (r) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Q1(r, i) {
    if (r === 0)
      switch (i) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return r === 1 && i === "foreignObject" ? 0 : r;
  }
  function nh(r, i) {
    return (
      r === "textarea" ||
      r === "noscript" ||
      typeof i.children == "string" ||
      typeof i.children == "number" ||
      typeof i.children == "bigint" ||
      (typeof i.dangerouslySetInnerHTML == "object" &&
        i.dangerouslySetInnerHTML !== null &&
        i.dangerouslySetInnerHTML.__html != null)
    );
  }
  var rh = null;
  function ED() {
    var r = window.event;
    return r && r.type === "popstate"
      ? r === rh
        ? !1
        : ((rh = r), !0)
      : ((rh = null), !1);
  }
  var W1 = typeof setTimeout == "function" ? setTimeout : void 0,
    jD = typeof clearTimeout == "function" ? clearTimeout : void 0,
    F1 = typeof Promise == "function" ? Promise : void 0,
    TD =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof F1 < "u"
          ? function (r) {
              return F1.resolve(null).then(r).catch(MD);
            }
          : W1;
  function MD(r) {
    setTimeout(function () {
      throw r;
    });
  }
  function ba(r) {
    return r === "head";
  }
  function J1(r, i) {
    var l = i,
      c = 0;
    do {
      var v = l.nextSibling;
      if ((r.removeChild(l), v && v.nodeType === 8))
        if (((l = v.data), l === "/$" || l === "/&")) {
          if (c === 0) {
            (r.removeChild(v), ol(i));
            return;
          }
          c--;
        } else if (
          l === "$" ||
          l === "$?" ||
          l === "$~" ||
          l === "$!" ||
          l === "&"
        )
          c++;
        else if (l === "html") Au(r.ownerDocument.documentElement);
        else if (l === "head") {
          ((l = r.ownerDocument.head), Au(l));
          for (var y = l.firstChild; y; ) {
            var x = y.nextSibling,
              A = y.nodeName;
            (y[$l] ||
              A === "SCRIPT" ||
              A === "STYLE" ||
              (A === "LINK" && y.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(y),
              (y = x));
          }
        } else l === "body" && Au(r.ownerDocument.body);
      l = v;
    } while (l);
    ol(i);
  }
  function ex(r, i) {
    var l = r;
    r = 0;
    do {
      var c = l.nextSibling;
      if (
        (l.nodeType === 1
          ? i
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (i
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        c && c.nodeType === 8)
      )
        if (((l = c.data), l === "/$")) {
          if (r === 0) break;
          r--;
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || r++;
      l = c;
    } while (l);
  }
  function ah(r) {
    var i = r.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var l = i;
      switch (((i = i.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (ah(l), cd(l));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      r.removeChild(l);
    }
  }
  function CD(r, i, l, c) {
    for (; r.nodeType === 1; ) {
      var v = l;
      if (r.nodeName.toLowerCase() !== i.toLowerCase()) {
        if (!c && (r.nodeName !== "INPUT" || r.type !== "hidden")) break;
      } else if (c) {
        if (!r[$l])
          switch (i) {
            case "meta":
              if (!r.hasAttribute("itemprop")) break;
              return r;
            case "link":
              if (
                ((y = r.getAttribute("rel")),
                y === "stylesheet" && r.hasAttribute("data-precedence"))
              )
                break;
              if (
                y !== v.rel ||
                r.getAttribute("href") !==
                  (v.href == null || v.href === "" ? null : v.href) ||
                r.getAttribute("crossorigin") !==
                  (v.crossOrigin == null ? null : v.crossOrigin) ||
                r.getAttribute("title") !== (v.title == null ? null : v.title)
              )
                break;
              return r;
            case "style":
              if (r.hasAttribute("data-precedence")) break;
              return r;
            case "script":
              if (
                ((y = r.getAttribute("src")),
                (y !== (v.src == null ? null : v.src) ||
                  r.getAttribute("type") !== (v.type == null ? null : v.type) ||
                  r.getAttribute("crossorigin") !==
                    (v.crossOrigin == null ? null : v.crossOrigin)) &&
                  y &&
                  r.hasAttribute("async") &&
                  !r.hasAttribute("itemprop"))
              )
                break;
              return r;
            default:
              return r;
          }
      } else if (i === "input" && r.type === "hidden") {
        var y = v.name == null ? null : "" + v.name;
        if (v.type === "hidden" && r.getAttribute("name") === y) return r;
      } else return r;
      if (((r = zn(r.nextSibling)), r === null)) break;
    }
    return null;
  }
  function DD(r, i, l) {
    if (i === "") return null;
    for (; r.nodeType !== 3; )
      if (
        ((r.nodeType !== 1 || r.nodeName !== "INPUT" || r.type !== "hidden") &&
          !l) ||
        ((r = zn(r.nextSibling)), r === null)
      )
        return null;
    return r;
  }
  function tx(r, i) {
    for (; r.nodeType !== 8; )
      if (
        ((r.nodeType !== 1 || r.nodeName !== "INPUT" || r.type !== "hidden") &&
          !i) ||
        ((r = zn(r.nextSibling)), r === null)
      )
        return null;
    return r;
  }
  function ih(r) {
    return r.data === "$?" || r.data === "$~";
  }
  function lh(r) {
    return (
      r.data === "$!" ||
      (r.data === "$?" && r.ownerDocument.readyState !== "loading")
    );
  }
  function ND(r, i) {
    var l = r.ownerDocument;
    if (r.data === "$~") r._reactRetry = i;
    else if (r.data !== "$?" || l.readyState !== "loading") i();
    else {
      var c = function () {
        (i(), l.removeEventListener("DOMContentLoaded", c));
      };
      (l.addEventListener("DOMContentLoaded", c), (r._reactRetry = c));
    }
  }
  function zn(r) {
    for (; r != null; r = r.nextSibling) {
      var i = r.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (
          ((i = r.data),
          i === "$" ||
            i === "$!" ||
            i === "$?" ||
            i === "$~" ||
            i === "&" ||
            i === "F!" ||
            i === "F")
        )
          break;
        if (i === "/$" || i === "/&") return null;
      }
    }
    return r;
  }
  var uh = null;
  function nx(r) {
    r = r.nextSibling;
    for (var i = 0; r; ) {
      if (r.nodeType === 8) {
        var l = r.data;
        if (l === "/$" || l === "/&") {
          if (i === 0) return zn(r.nextSibling);
          i--;
        } else
          (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") ||
            i++;
      }
      r = r.nextSibling;
    }
    return null;
  }
  function rx(r) {
    r = r.previousSibling;
    for (var i = 0; r; ) {
      if (r.nodeType === 8) {
        var l = r.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (i === 0) return r;
          i--;
        } else (l !== "/$" && l !== "/&") || i++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  function ax(r, i, l) {
    switch (((i = kc(l)), r)) {
      case "html":
        if (((r = i.documentElement), !r)) throw Error(a(452));
        return r;
      case "head":
        if (((r = i.head), !r)) throw Error(a(453));
        return r;
      case "body":
        if (((r = i.body), !r)) throw Error(a(454));
        return r;
      default:
        throw Error(a(451));
    }
  }
  function Au(r) {
    for (var i = r.attributes; i.length; ) r.removeAttributeNode(i[0]);
    cd(r);
  }
  var kn = new Map(),
    ix = new Set();
  function Rc(r) {
    return typeof r.getRootNode == "function"
      ? r.getRootNode()
      : r.nodeType === 9
        ? r
        : r.ownerDocument;
  }
  var Nr = W.d;
  W.d = { f: PD, r: zD, D: kD, C: RD, L: LD, m: UD, X: BD, S: qD, M: HD };
  function PD() {
    var r = Nr.f(),
      i = jc();
    return r || i;
  }
  function zD(r) {
    var i = ji(r);
    i !== null && i.tag === 5 && i.type === "form" ? wb(i) : Nr.r(r);
  }
  var il = typeof document > "u" ? null : document;
  function lx(r, i, l) {
    var c = il;
    if (c && typeof i == "string" && i) {
      var v = jn(i);
      ((v = 'link[rel="' + r + '"][href="' + v + '"]'),
        typeof l == "string" && (v += '[crossorigin="' + l + '"]'),
        ix.has(v) ||
          (ix.add(v),
          (r = { rel: r, crossOrigin: l, href: i }),
          c.querySelector(v) === null &&
            ((i = c.createElement("link")),
            zt(i, "link", r),
            bt(i),
            c.head.appendChild(i))));
    }
  }
  function kD(r) {
    (Nr.D(r), lx("dns-prefetch", r, null));
  }
  function RD(r, i) {
    (Nr.C(r, i), lx("preconnect", r, i));
  }
  function LD(r, i, l) {
    Nr.L(r, i, l);
    var c = il;
    if (c && r && i) {
      var v = 'link[rel="preload"][as="' + jn(i) + '"]';
      i === "image" && l && l.imageSrcSet
        ? ((v += '[imagesrcset="' + jn(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (v += '[imagesizes="' + jn(l.imageSizes) + '"]'))
        : (v += '[href="' + jn(r) + '"]');
      var y = v;
      switch (i) {
        case "style":
          y = ll(r);
          break;
        case "script":
          y = ul(r);
      }
      kn.has(y) ||
        ((r = p(
          {
            rel: "preload",
            href: i === "image" && l && l.imageSrcSet ? void 0 : r,
            as: i,
          },
          l,
        )),
        kn.set(y, r),
        c.querySelector(v) !== null ||
          (i === "style" && c.querySelector(Eu(y))) ||
          (i === "script" && c.querySelector(ju(y))) ||
          ((i = c.createElement("link")),
          zt(i, "link", r),
          bt(i),
          c.head.appendChild(i)));
    }
  }
  function UD(r, i) {
    Nr.m(r, i);
    var l = il;
    if (l && r) {
      var c = i && typeof i.as == "string" ? i.as : "script",
        v =
          'link[rel="modulepreload"][as="' + jn(c) + '"][href="' + jn(r) + '"]',
        y = v;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          y = ul(r);
      }
      if (
        !kn.has(y) &&
        ((r = p({ rel: "modulepreload", href: r }, i)),
        kn.set(y, r),
        l.querySelector(v) === null)
      ) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ju(y))) return;
        }
        ((c = l.createElement("link")),
          zt(c, "link", r),
          bt(c),
          l.head.appendChild(c));
      }
    }
  }
  function qD(r, i, l) {
    Nr.S(r, i, l);
    var c = il;
    if (c && r) {
      var v = Ti(c).hoistableStyles,
        y = ll(r);
      i = i || "default";
      var x = v.get(y);
      if (!x) {
        var A = { loading: 0, preload: null };
        if ((x = c.querySelector(Eu(y)))) A.loading = 5;
        else {
          ((r = p({ rel: "stylesheet", href: r, "data-precedence": i }, l)),
            (l = kn.get(y)) && oh(r, l));
          var N = (x = c.createElement("link"));
          (bt(N),
            zt(N, "link", r),
            (N._p = new Promise(function (H, X) {
              ((N.onload = H), (N.onerror = X));
            })),
            N.addEventListener("load", function () {
              A.loading |= 1;
            }),
            N.addEventListener("error", function () {
              A.loading |= 2;
            }),
            (A.loading |= 4),
            Lc(x, i, c));
        }
        ((x = { type: "stylesheet", instance: x, count: 1, state: A }),
          v.set(y, x));
      }
    }
  }
  function BD(r, i) {
    Nr.X(r, i);
    var l = il;
    if (l && r) {
      var c = Ti(l).hoistableScripts,
        v = ul(r),
        y = c.get(v);
      y ||
        ((y = l.querySelector(ju(v))),
        y ||
          ((r = p({ src: r, async: !0 }, i)),
          (i = kn.get(v)) && ch(r, i),
          (y = l.createElement("script")),
          bt(y),
          zt(y, "link", r),
          l.head.appendChild(y)),
        (y = { type: "script", instance: y, count: 1, state: null }),
        c.set(v, y));
    }
  }
  function HD(r, i) {
    Nr.M(r, i);
    var l = il;
    if (l && r) {
      var c = Ti(l).hoistableScripts,
        v = ul(r),
        y = c.get(v);
      y ||
        ((y = l.querySelector(ju(v))),
        y ||
          ((r = p({ src: r, async: !0, type: "module" }, i)),
          (i = kn.get(v)) && ch(r, i),
          (y = l.createElement("script")),
          bt(y),
          zt(y, "link", r),
          l.head.appendChild(y)),
        (y = { type: "script", instance: y, count: 1, state: null }),
        c.set(v, y));
    }
  }
  function ux(r, i, l, c) {
    var v = (v = xe.current) ? Rc(v) : null;
    if (!v) throw Error(a(446));
    switch (r) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((i = ll(l.href)),
            (l = Ti(v).hoistableStyles),
            (c = l.get(i)),
            c ||
              ((c = { type: "style", instance: null, count: 0, state: null }),
              l.set(i, c)),
            c)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          r = ll(l.href);
          var y = Ti(v).hoistableStyles,
            x = y.get(r);
          if (
            (x ||
              ((v = v.ownerDocument || v),
              (x = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              y.set(r, x),
              (y = v.querySelector(Eu(r))) &&
                !y._p &&
                ((x.instance = y), (x.state.loading = 5)),
              kn.has(r) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                kn.set(r, l),
                y || ID(v, r, l, x.state))),
            i && c === null)
          )
            throw Error(a(528, ""));
          return x;
        }
        if (i && c !== null) throw Error(a(529, ""));
        return null;
      case "script":
        return (
          (i = l.async),
          (l = l.src),
          typeof l == "string" &&
          i &&
          typeof i != "function" &&
          typeof i != "symbol"
            ? ((i = ul(l)),
              (l = Ti(v).hoistableScripts),
              (c = l.get(i)),
              c ||
                ((c = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(i, c)),
              c)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(a(444, r));
    }
  }
  function ll(r) {
    return 'href="' + jn(r) + '"';
  }
  function Eu(r) {
    return 'link[rel="stylesheet"][' + r + "]";
  }
  function ox(r) {
    return p({}, r, { "data-precedence": r.precedence, precedence: null });
  }
  function ID(r, i, l, c) {
    r.querySelector('link[rel="preload"][as="style"][' + i + "]")
      ? (c.loading = 1)
      : ((i = r.createElement("link")),
        (c.preload = i),
        i.addEventListener("load", function () {
          return (c.loading |= 1);
        }),
        i.addEventListener("error", function () {
          return (c.loading |= 2);
        }),
        zt(i, "link", l),
        bt(i),
        r.head.appendChild(i));
  }
  function ul(r) {
    return '[src="' + jn(r) + '"]';
  }
  function ju(r) {
    return "script[async]" + r;
  }
  function cx(r, i, l) {
    if ((i.count++, i.instance === null))
      switch (i.type) {
        case "style":
          var c = r.querySelector('style[data-href~="' + jn(l.href) + '"]');
          if (c) return ((i.instance = c), bt(c), c);
          var v = p({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (c = (r.ownerDocument || r).createElement("style")),
            bt(c),
            zt(c, "style", v),
            Lc(c, l.precedence, r),
            (i.instance = c)
          );
        case "stylesheet":
          v = ll(l.href);
          var y = r.querySelector(Eu(v));
          if (y) return ((i.state.loading |= 4), (i.instance = y), bt(y), y);
          ((c = ox(l)),
            (v = kn.get(v)) && oh(c, v),
            (y = (r.ownerDocument || r).createElement("link")),
            bt(y));
          var x = y;
          return (
            (x._p = new Promise(function (A, N) {
              ((x.onload = A), (x.onerror = N));
            })),
            zt(y, "link", c),
            (i.state.loading |= 4),
            Lc(y, l.precedence, r),
            (i.instance = y)
          );
        case "script":
          return (
            (y = ul(l.src)),
            (v = r.querySelector(ju(y)))
              ? ((i.instance = v), bt(v), v)
              : ((c = l),
                (v = kn.get(y)) && ((c = p({}, l)), ch(c, v)),
                (r = r.ownerDocument || r),
                (v = r.createElement("script")),
                bt(v),
                zt(v, "link", c),
                r.head.appendChild(v),
                (i.instance = v))
          );
        case "void":
          return null;
        default:
          throw Error(a(443, i.type));
      }
    else
      i.type === "stylesheet" &&
        (i.state.loading & 4) === 0 &&
        ((c = i.instance), (i.state.loading |= 4), Lc(c, l.precedence, r));
    return i.instance;
  }
  function Lc(r, i, l) {
    for (
      var c = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        v = c.length ? c[c.length - 1] : null,
        y = v,
        x = 0;
      x < c.length;
      x++
    ) {
      var A = c[x];
      if (A.dataset.precedence === i) y = A;
      else if (y !== v) break;
    }
    y
      ? y.parentNode.insertBefore(r, y.nextSibling)
      : ((i = l.nodeType === 9 ? l.head : l), i.insertBefore(r, i.firstChild));
  }
  function oh(r, i) {
    (r.crossOrigin == null && (r.crossOrigin = i.crossOrigin),
      r.referrerPolicy == null && (r.referrerPolicy = i.referrerPolicy),
      r.title == null && (r.title = i.title));
  }
  function ch(r, i) {
    (r.crossOrigin == null && (r.crossOrigin = i.crossOrigin),
      r.referrerPolicy == null && (r.referrerPolicy = i.referrerPolicy),
      r.integrity == null && (r.integrity = i.integrity));
  }
  var Uc = null;
  function sx(r, i, l) {
    if (Uc === null) {
      var c = new Map(),
        v = (Uc = new Map());
      v.set(l, c);
    } else ((v = Uc), (c = v.get(l)), c || ((c = new Map()), v.set(l, c)));
    if (c.has(r)) return c;
    for (
      c.set(r, null), l = l.getElementsByTagName(r), v = 0;
      v < l.length;
      v++
    ) {
      var y = l[v];
      if (
        !(
          y[$l] ||
          y[Ct] ||
          (r === "link" && y.getAttribute("rel") === "stylesheet")
        ) &&
        y.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var x = y.getAttribute(i) || "";
        x = r + x;
        var A = c.get(x);
        A ? A.push(y) : c.set(x, [y]);
      }
    }
    return c;
  }
  function fx(r, i, l) {
    ((r = r.ownerDocument || r),
      r.head.insertBefore(
        l,
        i === "title" ? r.querySelector("head > title") : null,
      ));
  }
  function $D(r, i, l) {
    if (l === 1 || i.itemProp != null) return !1;
    switch (r) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof i.precedence != "string" ||
          typeof i.href != "string" ||
          i.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof i.rel != "string" ||
          typeof i.href != "string" ||
          i.href === "" ||
          i.onLoad ||
          i.onError
        )
          break;
        return i.rel === "stylesheet"
          ? ((r = i.disabled), typeof i.precedence == "string" && r == null)
          : !0;
      case "script":
        if (
          i.async &&
          typeof i.async != "function" &&
          typeof i.async != "symbol" &&
          !i.onLoad &&
          !i.onError &&
          i.src &&
          typeof i.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function dx(r) {
    return !(r.type === "stylesheet" && (r.state.loading & 3) === 0);
  }
  function YD(r, i, l, c) {
    if (
      l.type === "stylesheet" &&
      (typeof c.media != "string" || matchMedia(c.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var v = ll(c.href),
          y = i.querySelector(Eu(v));
        if (y) {
          ((i = y._p),
            i !== null &&
              typeof i == "object" &&
              typeof i.then == "function" &&
              (r.count++, (r = qc.bind(r)), i.then(r, r)),
            (l.state.loading |= 4),
            (l.instance = y),
            bt(y));
          return;
        }
        ((y = i.ownerDocument || i),
          (c = ox(c)),
          (v = kn.get(v)) && oh(c, v),
          (y = y.createElement("link")),
          bt(y));
        var x = y;
        ((x._p = new Promise(function (A, N) {
          ((x.onload = A), (x.onerror = N));
        })),
          zt(y, "link", c),
          (l.instance = y));
      }
      (r.stylesheets === null && (r.stylesheets = new Map()),
        r.stylesheets.set(l, i),
        (i = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (r.count++,
          (l = qc.bind(r)),
          i.addEventListener("load", l),
          i.addEventListener("error", l)));
    }
  }
  var sh = 0;
  function KD(r, i) {
    return (
      r.stylesheets && r.count === 0 && Hc(r, r.stylesheets),
      0 < r.count || 0 < r.imgCount
        ? function (l) {
            var c = setTimeout(function () {
              if ((r.stylesheets && Hc(r, r.stylesheets), r.unsuspend)) {
                var y = r.unsuspend;
                ((r.unsuspend = null), y());
              }
            }, 6e4 + i);
            0 < r.imgBytes && sh === 0 && (sh = 62500 * AD());
            var v = setTimeout(
              function () {
                if (
                  ((r.waitingForImages = !1),
                  r.count === 0 &&
                    (r.stylesheets && Hc(r, r.stylesheets), r.unsuspend))
                ) {
                  var y = r.unsuspend;
                  ((r.unsuspend = null), y());
                }
              },
              (r.imgBytes > sh ? 50 : 800) + i,
            );
            return (
              (r.unsuspend = l),
              function () {
                ((r.unsuspend = null), clearTimeout(c), clearTimeout(v));
              }
            );
          }
        : null
    );
  }
  function qc() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Hc(this, this.stylesheets);
      else if (this.unsuspend) {
        var r = this.unsuspend;
        ((this.unsuspend = null), r());
      }
    }
  }
  var Bc = null;
  function Hc(r, i) {
    ((r.stylesheets = null),
      r.unsuspend !== null &&
        (r.count++,
        (Bc = new Map()),
        i.forEach(GD, r),
        (Bc = null),
        qc.call(r)));
  }
  function GD(r, i) {
    if (!(i.state.loading & 4)) {
      var l = Bc.get(r);
      if (l) var c = l.get(null);
      else {
        ((l = new Map()), Bc.set(r, l));
        for (
          var v = r.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            y = 0;
          y < v.length;
          y++
        ) {
          var x = v[y];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") &&
            (l.set(x.dataset.precedence, x), (c = x));
        }
        c && l.set(null, c);
      }
      ((v = i.instance),
        (x = v.getAttribute("data-precedence")),
        (y = l.get(x) || c),
        y === c && l.set(null, v),
        l.set(x, v),
        this.count++,
        (c = qc.bind(this)),
        v.addEventListener("load", c),
        v.addEventListener("error", c),
        y
          ? y.parentNode.insertBefore(v, y.nextSibling)
          : ((r = r.nodeType === 9 ? r.head : r),
            r.insertBefore(v, r.firstChild)),
        (i.state.loading |= 4));
    }
  }
  var Tu = {
    $$typeof: T,
    Provider: null,
    Consumer: null,
    _currentValue: ue,
    _currentValue2: ue,
    _threadCount: 0,
  };
  function XD(r, i, l, c, v, y, x, A, N) {
    ((this.tag = 1),
      (this.containerInfo = r),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = id(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = id(0)),
      (this.hiddenUpdates = id(null)),
      (this.identifierPrefix = c),
      (this.onUncaughtError = v),
      (this.onCaughtError = y),
      (this.onRecoverableError = x),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = N),
      (this.incompleteTransitions = new Map()));
  }
  function vx(r, i, l, c, v, y, x, A, N, H, X, Q) {
    return (
      (r = new XD(r, i, l, x, N, H, X, Q, A)),
      (i = 1),
      y === !0 && (i |= 24),
      (y = mn(3, null, null, i)),
      (r.current = y),
      (y.stateNode = r),
      (i = $d()),
      i.refCount++,
      (r.pooledCache = i),
      i.refCount++,
      (y.memoizedState = { element: c, isDehydrated: l, cache: i }),
      Xd(y),
      r
    );
  }
  function hx(r) {
    return r ? ((r = Ui), r) : Ui;
  }
  function mx(r, i, l, c, v, y) {
    ((v = hx(v)),
      c.context === null ? (c.context = v) : (c.pendingContext = v),
      (c = oa(i)),
      (c.payload = { element: l }),
      (y = y === void 0 ? null : y),
      y !== null && (c.callback = y),
      (l = ca(r, c, i)),
      l !== null && (rn(l, r, i), lu(l, r, i)));
  }
  function yx(r, i) {
    if (((r = r.memoizedState), r !== null && r.dehydrated !== null)) {
      var l = r.retryLane;
      r.retryLane = l !== 0 && l < i ? l : i;
    }
  }
  function fh(r, i) {
    (yx(r, i), (r = r.alternate) && yx(r, i));
  }
  function px(r) {
    if (r.tag === 13 || r.tag === 31) {
      var i = Ia(r, 67108864);
      (i !== null && rn(i, r, 67108864), fh(r, 67108864));
    }
  }
  function gx(r) {
    if (r.tag === 13 || r.tag === 31) {
      var i = xn();
      i = ld(i);
      var l = Ia(r, i);
      (l !== null && rn(l, r, i), fh(r, i));
    }
  }
  var Ic = !0;
  function VD(r, i, l, c) {
    var v = L.T;
    L.T = null;
    var y = W.p;
    try {
      ((W.p = 2), dh(r, i, l, c));
    } finally {
      ((W.p = y), (L.T = v));
    }
  }
  function ZD(r, i, l, c) {
    var v = L.T;
    L.T = null;
    var y = W.p;
    try {
      ((W.p = 8), dh(r, i, l, c));
    } finally {
      ((W.p = y), (L.T = v));
    }
  }
  function dh(r, i, l, c) {
    if (Ic) {
      var v = vh(c);
      if (v === null) (Fv(r, i, c, $c, l), xx(r, c));
      else if (WD(v, r, i, l, c)) c.stopPropagation();
      else if ((xx(r, c), i & 4 && -1 < QD.indexOf(r))) {
        for (; v !== null; ) {
          var y = ji(v);
          if (y !== null)
            switch (y.tag) {
              case 3:
                if (((y = y.stateNode), y.current.memoizedState.isDehydrated)) {
                  var x = La(y.pendingLanes);
                  if (x !== 0) {
                    var A = y;
                    for (A.pendingLanes |= 2, A.entangledLanes |= 2; x; ) {
                      var N = 1 << (31 - vn(x));
                      ((A.entanglements[1] |= N), (x &= ~N));
                    }
                    (tr(y), (Le & 6) === 0 && ((Ac = fn() + 500), wu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((A = Ia(y, 2)), A !== null && rn(A, y, 2), jc(), fh(y, 2));
            }
          if (((y = vh(c)), y === null && Fv(r, i, c, $c, l), y === v)) break;
          v = y;
        }
        v !== null && c.stopPropagation();
      } else Fv(r, i, c, null, l);
    }
  }
  function vh(r) {
    return ((r = md(r)), hh(r));
  }
  var $c = null;
  function hh(r) {
    if ((($c = null), (r = Ei(r)), r !== null)) {
      var i = o(r);
      if (i === null) r = null;
      else {
        var l = i.tag;
        if (l === 13) {
          if (((r = s(i)), r !== null)) return r;
          r = null;
        } else if (l === 31) {
          if (((r = f(i)), r !== null)) return r;
          r = null;
        } else if (l === 3) {
          if (i.stateNode.current.memoizedState.isDehydrated)
            return i.tag === 3 ? i.stateNode.containerInfo : null;
          r = null;
        } else i !== r && (r = null);
      }
    }
    return (($c = r), null);
  }
  function bx(r) {
    switch (r) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (kM()) {
          case jg:
            return 2;
          case Tg:
            return 8;
          case No:
          case RM:
            return 32;
          case Mg:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var mh = !1,
    xa = null,
    Sa = null,
    wa = null,
    Mu = new Map(),
    Cu = new Map(),
    Oa = [],
    QD =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function xx(r, i) {
    switch (r) {
      case "focusin":
      case "focusout":
        xa = null;
        break;
      case "dragenter":
      case "dragleave":
        Sa = null;
        break;
      case "mouseover":
      case "mouseout":
        wa = null;
        break;
      case "pointerover":
      case "pointerout":
        Mu.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cu.delete(i.pointerId);
    }
  }
  function Du(r, i, l, c, v, y) {
    return r === null || r.nativeEvent !== y
      ? ((r = {
          blockedOn: i,
          domEventName: l,
          eventSystemFlags: c,
          nativeEvent: y,
          targetContainers: [v],
        }),
        i !== null && ((i = ji(i)), i !== null && px(i)),
        r)
      : ((r.eventSystemFlags |= c),
        (i = r.targetContainers),
        v !== null && i.indexOf(v) === -1 && i.push(v),
        r);
  }
  function WD(r, i, l, c, v) {
    switch (i) {
      case "focusin":
        return ((xa = Du(xa, r, i, l, c, v)), !0);
      case "dragenter":
        return ((Sa = Du(Sa, r, i, l, c, v)), !0);
      case "mouseover":
        return ((wa = Du(wa, r, i, l, c, v)), !0);
      case "pointerover":
        var y = v.pointerId;
        return (Mu.set(y, Du(Mu.get(y) || null, r, i, l, c, v)), !0);
      case "gotpointercapture":
        return (
          (y = v.pointerId),
          Cu.set(y, Du(Cu.get(y) || null, r, i, l, c, v)),
          !0
        );
    }
    return !1;
  }
  function Sx(r) {
    var i = Ei(r.target);
    if (i !== null) {
      var l = o(i);
      if (l !== null) {
        if (((i = l.tag), i === 13)) {
          if (((i = s(l)), i !== null)) {
            ((r.blockedOn = i),
              kg(r.priority, function () {
                gx(l);
              }));
            return;
          }
        } else if (i === 31) {
          if (((i = f(l)), i !== null)) {
            ((r.blockedOn = i),
              kg(r.priority, function () {
                gx(l);
              }));
            return;
          }
        } else if (i === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function Yc(r) {
    if (r.blockedOn !== null) return !1;
    for (var i = r.targetContainers; 0 < i.length; ) {
      var l = vh(r.nativeEvent);
      if (l === null) {
        l = r.nativeEvent;
        var c = new l.constructor(l.type, l);
        ((hd = c), l.target.dispatchEvent(c), (hd = null));
      } else return ((i = ji(l)), i !== null && px(i), (r.blockedOn = l), !1);
      i.shift();
    }
    return !0;
  }
  function wx(r, i, l) {
    Yc(r) && l.delete(i);
  }
  function FD() {
    ((mh = !1),
      xa !== null && Yc(xa) && (xa = null),
      Sa !== null && Yc(Sa) && (Sa = null),
      wa !== null && Yc(wa) && (wa = null),
      Mu.forEach(wx),
      Cu.forEach(wx));
  }
  function Kc(r, i) {
    r.blockedOn === i &&
      ((r.blockedOn = null),
      mh ||
        ((mh = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, FD)));
  }
  var Gc = null;
  function Ox(r) {
    Gc !== r &&
      ((Gc = r),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        Gc === r && (Gc = null);
        for (var i = 0; i < r.length; i += 3) {
          var l = r[i],
            c = r[i + 1],
            v = r[i + 2];
          if (typeof c != "function") {
            if (hh(c || l) === null) continue;
            break;
          }
          var y = ji(l);
          y !== null &&
            (r.splice(i, 3),
            (i -= 3),
            vv(y, { pending: !0, data: v, method: l.method, action: c }, c, v));
        }
      }));
  }
  function ol(r) {
    function i(N) {
      return Kc(N, r);
    }
    (xa !== null && Kc(xa, r),
      Sa !== null && Kc(Sa, r),
      wa !== null && Kc(wa, r),
      Mu.forEach(i),
      Cu.forEach(i));
    for (var l = 0; l < Oa.length; l++) {
      var c = Oa[l];
      c.blockedOn === r && (c.blockedOn = null);
    }
    for (; 0 < Oa.length && ((l = Oa[0]), l.blockedOn === null); )
      (Sx(l), l.blockedOn === null && Oa.shift());
    if (((l = (r.ownerDocument || r).$$reactFormReplay), l != null))
      for (c = 0; c < l.length; c += 3) {
        var v = l[c],
          y = l[c + 1],
          x = v[Wt] || null;
        if (typeof y == "function") x || Ox(l);
        else if (x) {
          var A = null;
          if (y && y.hasAttribute("formAction")) {
            if (((v = y), (x = y[Wt] || null))) A = x.formAction;
            else if (hh(v) !== null) continue;
          } else A = x.action;
          (typeof A == "function" ? (l[c + 1] = A) : (l.splice(c, 3), (c -= 3)),
            Ox(l));
        }
      }
  }
  function _x() {
    function r(y) {
      y.canIntercept &&
        y.info === "react-transition" &&
        y.intercept({
          handler: function () {
            return new Promise(function (x) {
              return (v = x);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function i() {
      (v !== null && (v(), (v = null)), c || setTimeout(l, 20));
    }
    function l() {
      if (!c && !navigation.transition) {
        var y = navigation.currentEntry;
        y &&
          y.url != null &&
          navigation.navigate(y.url, {
            state: y.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var c = !1,
        v = null;
      return (
        navigation.addEventListener("navigate", r),
        navigation.addEventListener("navigatesuccess", i),
        navigation.addEventListener("navigateerror", i),
        setTimeout(l, 100),
        function () {
          ((c = !0),
            navigation.removeEventListener("navigate", r),
            navigation.removeEventListener("navigatesuccess", i),
            navigation.removeEventListener("navigateerror", i),
            v !== null && (v(), (v = null)));
        }
      );
    }
  }
  function yh(r) {
    this._internalRoot = r;
  }
  ((Xc.prototype.render = yh.prototype.render =
    function (r) {
      var i = this._internalRoot;
      if (i === null) throw Error(a(409));
      var l = i.current,
        c = xn();
      mx(l, c, r, i, null, null);
    }),
    (Xc.prototype.unmount = yh.prototype.unmount =
      function () {
        var r = this._internalRoot;
        if (r !== null) {
          this._internalRoot = null;
          var i = r.containerInfo;
          (mx(r.current, 2, null, r, null, null), jc(), (i[Ai] = null));
        }
      }));
  function Xc(r) {
    this._internalRoot = r;
  }
  Xc.prototype.unstable_scheduleHydration = function (r) {
    if (r) {
      var i = zg();
      r = { blockedOn: null, target: r, priority: i };
      for (var l = 0; l < Oa.length && i !== 0 && i < Oa[l].priority; l++);
      (Oa.splice(l, 0, r), l === 0 && Sx(r));
    }
  };
  var Ax = t.version;
  if (Ax !== "19.2.4") throw Error(a(527, Ax, "19.2.4"));
  W.findDOMNode = function (r) {
    var i = r._reactInternals;
    if (i === void 0)
      throw typeof r.render == "function"
        ? Error(a(188))
        : ((r = Object.keys(r).join(",")), Error(a(268, r)));
    return (
      (r = h(i)),
      (r = r !== null ? m(r) : null),
      (r = r === null ? null : r.stateNode),
      r
    );
  };
  var JD = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.2.4",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vc.isDisabled && Vc.supportsFiber)
      try {
        ((Bl = Vc.inject(JD)), (dn = Vc));
      } catch {}
  }
  return (
    (Pu.createRoot = function (r, i) {
      if (!u(r)) throw Error(a(299));
      var l = !1,
        c = "",
        v = Nb,
        y = Pb,
        x = zb;
      return (
        i != null &&
          (i.unstable_strictMode === !0 && (l = !0),
          i.identifierPrefix !== void 0 && (c = i.identifierPrefix),
          i.onUncaughtError !== void 0 && (v = i.onUncaughtError),
          i.onCaughtError !== void 0 && (y = i.onCaughtError),
          i.onRecoverableError !== void 0 && (x = i.onRecoverableError)),
        (i = vx(r, 1, !1, null, null, l, c, null, v, y, x, _x)),
        (r[Ai] = i.current),
        Wv(r),
        new yh(i)
      );
    }),
    (Pu.hydrateRoot = function (r, i, l) {
      if (!u(r)) throw Error(a(299));
      var c = !1,
        v = "",
        y = Nb,
        x = Pb,
        A = zb,
        N = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (c = !0),
          l.identifierPrefix !== void 0 && (v = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (y = l.onUncaughtError),
          l.onCaughtError !== void 0 && (x = l.onCaughtError),
          l.onRecoverableError !== void 0 && (A = l.onRecoverableError),
          l.formState !== void 0 && (N = l.formState)),
        (i = vx(r, 1, !0, i, l ?? null, c, v, N, y, x, A, _x)),
        (i.context = hx(null)),
        (l = i.current),
        (c = xn()),
        (c = ld(c)),
        (v = oa(c)),
        (v.callback = null),
        ca(l, v, c),
        (l = c),
        (i.current.lanes = l),
        Il(i, l),
        tr(i),
        (r[Ai] = i.current),
        Wv(r),
        new Xc(i)
      );
    }),
    (Pu.version = "19.2.4"),
    Pu
  );
}
var kx;
function fN() {
  if (kx) return bh.exports;
  kx = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return (e(), (bh.exports = sN()), bh.exports);
}
var dN = fN();
const wA = (...e) =>
  e
    .filter((t, n, a) => !!t && t.trim() !== "" && a.indexOf(t) === n)
    .join(" ")
    .trim();
const vN = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const hN = (e) =>
  e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, n, a) =>
    a ? a.toUpperCase() : n.toLowerCase(),
  );
const Rx = (e) => {
  const t = hN(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
var mN = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const yN = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
  return !1;
};
const pN = w.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: a,
      className: u = "",
      children: o,
      iconNode: s,
      ...f
    },
    d,
  ) =>
    w.createElement(
      "svg",
      {
        ref: d,
        ...mN,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: a ? (Number(n) * 24) / Number(t) : n,
        className: wA("lucide", u),
        ...(!o && !yN(f) && { "aria-hidden": "true" }),
        ...f,
      },
      [
        ...s.map(([h, m]) => w.createElement(h, m)),
        ...(Array.isArray(o) ? o : [o]),
      ],
    ),
);
const on = (e, t) => {
  const n = w.forwardRef(({ className: a, ...u }, o) =>
    w.createElement(pN, {
      ref: o,
      iconNode: t,
      className: wA(`lucide-${vN(Rx(e))}`, `lucide-${e}`, a),
      ...u,
    }),
  );
  return ((n.displayName = Rx(e)), n);
};
const gN = [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        key: "11g9vi",
      },
    ],
  ],
  ys = on("bell", gN);
const bN = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
    ],
    ["path", { d: "M3 10h18", key: "8toen8" }],
    ["path", { d: "M8 14h.01", key: "6423bh" }],
    ["path", { d: "M12 14h.01", key: "1etili" }],
    ["path", { d: "M16 14h.01", key: "1gbofw" }],
    ["path", { d: "M8 18h.01", key: "lrp35t" }],
    ["path", { d: "M12 18h.01", key: "mhygvu" }],
    ["path", { d: "M16 18h.01", key: "kzsmim" }],
  ],
  OA = on("calendar-days", bN);
const xN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  _A = on("circle-check", xN);
const SN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 6v6h4", key: "135r8i" }],
  ],
  AA = on("clock-3", SN);
const wN = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M8 13h2", key: "yr2amv" }],
    ["path", { d: "M14 13h2", key: "un5t4a" }],
    ["path", { d: "M8 17h2", key: "2yhykz" }],
    ["path", { d: "M14 17h2", key: "10kma7" }],
  ],
  bl = on("file-spreadsheet", wN);
const ON = [
    ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
    [
      "path",
      {
        d: "M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2",
        key: "1urifu",
      },
    ],
    ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }],
  ],
  df = on("folder-clock", ON);
const _N = [
    [
      "path",
      {
        d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
        key: "sc7q7i",
      },
    ],
  ],
  AN = on("funnel", _N);
const EN = [
    [
      "rect",
      { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" },
    ],
    [
      "rect",
      { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" },
    ],
    [
      "rect",
      { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" },
    ],
    [
      "rect",
      { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" },
    ],
  ],
  vf = on("layout-dashboard", EN);
const jN = [
    ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
    [
      "rect",
      { x: "3", y: "10", width: "18", height: "12", rx: "2", key: "6s8ecr" },
    ],
    ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3", key: "1pqi11" }],
  ],
  hf = on("lock-keyhole", jN);
const TN = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  MN = on("log-out", TN);
const CN = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }],
  ],
  DN = on("menu", CN);
const NN = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "M12 8v4", key: "1got3b" }],
    ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ],
  EA = on("shield-alert", NN);
const PN = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
    ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
    ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }],
  ],
  zN = on("user-plus", PN);
const kN = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ],
  Jm = on("users", kN);
function jA(e) {
  var t,
    n,
    a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var u = e.length;
      for (t = 0; t < u; t++)
        e[t] && (n = jA(e[t])) && (a && (a += " "), (a += n));
    } else for (n in e) e[n] && (a && (a += " "), (a += n));
  return a;
}
function Ge() {
  for (var e, t, n = 0, a = "", u = arguments.length; n < u; n++)
    (e = arguments[n]) && (t = jA(e)) && (a && (a += " "), (a += t));
  return a;
}
var RN = [
  "dangerouslySetInnerHTML",
  "onCopy",
  "onCopyCapture",
  "onCut",
  "onCutCapture",
  "onPaste",
  "onPasteCapture",
  "onCompositionEnd",
  "onCompositionEndCapture",
  "onCompositionStart",
  "onCompositionStartCapture",
  "onCompositionUpdate",
  "onCompositionUpdateCapture",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onChange",
  "onChangeCapture",
  "onBeforeInput",
  "onBeforeInputCapture",
  "onInput",
  "onInputCapture",
  "onReset",
  "onResetCapture",
  "onSubmit",
  "onSubmitCapture",
  "onInvalid",
  "onInvalidCapture",
  "onLoad",
  "onLoadCapture",
  "onError",
  "onErrorCapture",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyPressCapture",
  "onKeyUp",
  "onKeyUpCapture",
  "onAbort",
  "onAbortCapture",
  "onCanPlay",
  "onCanPlayCapture",
  "onCanPlayThrough",
  "onCanPlayThroughCapture",
  "onDurationChange",
  "onDurationChangeCapture",
  "onEmptied",
  "onEmptiedCapture",
  "onEncrypted",
  "onEncryptedCapture",
  "onEnded",
  "onEndedCapture",
  "onLoadedData",
  "onLoadedDataCapture",
  "onLoadedMetadata",
  "onLoadedMetadataCapture",
  "onLoadStart",
  "onLoadStartCapture",
  "onPause",
  "onPauseCapture",
  "onPlay",
  "onPlayCapture",
  "onPlaying",
  "onPlayingCapture",
  "onProgress",
  "onProgressCapture",
  "onRateChange",
  "onRateChangeCapture",
  "onSeeked",
  "onSeekedCapture",
  "onSeeking",
  "onSeekingCapture",
  "onStalled",
  "onStalledCapture",
  "onSuspend",
  "onSuspendCapture",
  "onTimeUpdate",
  "onTimeUpdateCapture",
  "onVolumeChange",
  "onVolumeChangeCapture",
  "onWaiting",
  "onWaitingCapture",
  "onAuxClick",
  "onAuxClickCapture",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onContextMenuCapture",
  "onDoubleClick",
  "onDoubleClickCapture",
  "onDrag",
  "onDragCapture",
  "onDragEnd",
  "onDragEndCapture",
  "onDragEnter",
  "onDragEnterCapture",
  "onDragExit",
  "onDragExitCapture",
  "onDragLeave",
  "onDragLeaveCapture",
  "onDragOver",
  "onDragOverCapture",
  "onDragStart",
  "onDragStartCapture",
  "onDrop",
  "onDropCapture",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseMoveCapture",
  "onMouseOut",
  "onMouseOutCapture",
  "onMouseOver",
  "onMouseOverCapture",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onSelectCapture",
  "onTouchCancel",
  "onTouchCancelCapture",
  "onTouchEnd",
  "onTouchEndCapture",
  "onTouchMove",
  "onTouchMoveCapture",
  "onTouchStart",
  "onTouchStartCapture",
  "onPointerDown",
  "onPointerDownCapture",
  "onPointerMove",
  "onPointerMoveCapture",
  "onPointerUp",
  "onPointerUpCapture",
  "onPointerCancel",
  "onPointerCancelCapture",
  "onPointerEnter",
  "onPointerEnterCapture",
  "onPointerLeave",
  "onPointerLeaveCapture",
  "onPointerOver",
  "onPointerOverCapture",
  "onPointerOut",
  "onPointerOutCapture",
  "onGotPointerCapture",
  "onGotPointerCaptureCapture",
  "onLostPointerCapture",
  "onLostPointerCaptureCapture",
  "onScroll",
  "onScrollCapture",
  "onWheel",
  "onWheelCapture",
  "onAnimationStart",
  "onAnimationStartCapture",
  "onAnimationEnd",
  "onAnimationEndCapture",
  "onAnimationIteration",
  "onAnimationIterationCapture",
  "onTransitionEnd",
  "onTransitionEndCapture",
];
function Vy(e) {
  if (typeof e != "string") return !1;
  var t = RN;
  return t.includes(e);
}
var LN = [
    "aria-activedescendant",
    "aria-atomic",
    "aria-autocomplete",
    "aria-busy",
    "aria-checked",
    "aria-colcount",
    "aria-colindex",
    "aria-colspan",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-disabled",
    "aria-errormessage",
    "aria-expanded",
    "aria-flowto",
    "aria-haspopup",
    "aria-hidden",
    "aria-invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-level",
    "aria-live",
    "aria-modal",
    "aria-multiline",
    "aria-multiselectable",
    "aria-orientation",
    "aria-owns",
    "aria-placeholder",
    "aria-posinset",
    "aria-pressed",
    "aria-readonly",
    "aria-relevant",
    "aria-required",
    "aria-roledescription",
    "aria-rowcount",
    "aria-rowindex",
    "aria-rowspan",
    "aria-selected",
    "aria-setsize",
    "aria-sort",
    "aria-valuemax",
    "aria-valuemin",
    "aria-valuenow",
    "aria-valuetext",
    "className",
    "color",
    "height",
    "id",
    "lang",
    "max",
    "media",
    "method",
    "min",
    "name",
    "style",
    "target",
    "width",
    "role",
    "tabIndex",
    "accentHeight",
    "accumulate",
    "additive",
    "alignmentBaseline",
    "allowReorder",
    "alphabetic",
    "amplitude",
    "arabicForm",
    "ascent",
    "attributeName",
    "attributeType",
    "autoReverse",
    "azimuth",
    "baseFrequency",
    "baselineShift",
    "baseProfile",
    "bbox",
    "begin",
    "bias",
    "by",
    "calcMode",
    "capHeight",
    "clip",
    "clipPath",
    "clipPathUnits",
    "clipRule",
    "colorInterpolation",
    "colorInterpolationFilters",
    "colorProfile",
    "colorRendering",
    "contentScriptType",
    "contentStyleType",
    "cursor",
    "cx",
    "cy",
    "d",
    "decelerate",
    "descent",
    "diffuseConstant",
    "direction",
    "display",
    "divisor",
    "dominantBaseline",
    "dur",
    "dx",
    "dy",
    "edgeMode",
    "elevation",
    "enableBackground",
    "end",
    "exponent",
    "externalResourcesRequired",
    "fill",
    "fillOpacity",
    "fillRule",
    "filter",
    "filterRes",
    "filterUnits",
    "floodColor",
    "floodOpacity",
    "focusable",
    "fontFamily",
    "fontSize",
    "fontSizeAdjust",
    "fontStretch",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "format",
    "from",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyphName",
    "glyphOrientationHorizontal",
    "glyphOrientationVertical",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "hanging",
    "horizAdvX",
    "horizOriginX",
    "href",
    "ideographic",
    "imageRendering",
    "in2",
    "in",
    "intercept",
    "k1",
    "k2",
    "k3",
    "k4",
    "k",
    "kernelMatrix",
    "kernelUnitLength",
    "kerning",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "letterSpacing",
    "lightingColor",
    "limitingConeAngle",
    "local",
    "markerEnd",
    "markerHeight",
    "markerMid",
    "markerStart",
    "markerUnits",
    "markerWidth",
    "mask",
    "maskContentUnits",
    "maskUnits",
    "mathematical",
    "mode",
    "numOctaves",
    "offset",
    "opacity",
    "operator",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "overlinePosition",
    "overlineThickness",
    "paintOrder",
    "panose1",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointerEvents",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "r",
    "radius",
    "refX",
    "refY",
    "renderingIntent",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "restart",
    "result",
    "rotate",
    "rx",
    "ry",
    "seed",
    "shapeRendering",
    "slope",
    "spacing",
    "specularConstant",
    "specularExponent",
    "speed",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stemh",
    "stemv",
    "stitchTiles",
    "stopColor",
    "stopOpacity",
    "strikethroughPosition",
    "strikethroughThickness",
    "string",
    "stroke",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textAnchor",
    "textDecoration",
    "textLength",
    "textRendering",
    "to",
    "transform",
    "u1",
    "u2",
    "underlinePosition",
    "underlineThickness",
    "unicode",
    "unicodeBidi",
    "unicodeRange",
    "unitsPerEm",
    "vAlphabetic",
    "values",
    "vectorEffect",
    "version",
    "vertAdvY",
    "vertOriginX",
    "vertOriginY",
    "vHanging",
    "vIdeographic",
    "viewTarget",
    "visibility",
    "vMathematical",
    "widths",
    "wordSpacing",
    "writingMode",
    "x1",
    "x2",
    "x",
    "xChannelSelector",
    "xHeight",
    "xlinkActuate",
    "xlinkArcrole",
    "xlinkHref",
    "xlinkRole",
    "xlinkShow",
    "xlinkTitle",
    "xlinkType",
    "xmlBase",
    "xmlLang",
    "xmlns",
    "xmlnsXlink",
    "xmlSpace",
    "y1",
    "y2",
    "y",
    "yChannelSelector",
    "z",
    "zoomAndPan",
    "ref",
    "key",
    "angle",
  ],
  UN = new Set(LN);
function TA(e) {
  return typeof e != "string" ? !1 : UN.has(e);
}
function MA(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function sr(e) {
  if (typeof e != "object" || e === null) return {};
  var t = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) &&
      (TA(n) || MA(n)) &&
      (t[n] = e[n]);
  return t;
}
function mf(e) {
  if (e == null) return null;
  if (w.isValidElement(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return sr(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? sr(e) : null;
}
function Vt(e) {
  var t = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) &&
      (TA(n) || MA(n) || Vy(n)) &&
      (t[n] = e[n]);
  return t;
}
function qN(e) {
  return e == null
    ? null
    : w.isValidElement(e)
      ? Vt(e.props)
      : typeof e == "object" && !Array.isArray(e)
        ? Vt(e)
        : null;
}
var BN = [
  "children",
  "width",
  "height",
  "viewBox",
  "className",
  "style",
  "title",
  "desc",
];
function ey() {
  return (
    (ey = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    ey.apply(null, arguments)
  );
}
function HN(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = IN(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function IN(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var CA = w.forwardRef((e, t) => {
    var {
        children: n,
        width: a,
        height: u,
        viewBox: o,
        className: s,
        style: f,
        title: d,
        desc: h,
      } = e,
      m = HN(e, BN),
      p = o || { width: a, height: u, x: 0, y: 0 },
      g = Ge("recharts-surface", s);
    return w.createElement(
      "svg",
      ey({}, Vt(m), {
        className: g,
        width: a,
        height: u,
        style: f,
        viewBox: ""
          .concat(p.x, " ")
          .concat(p.y, " ")
          .concat(p.width, " ")
          .concat(p.height),
        ref: t,
      }),
      w.createElement("title", null, d),
      w.createElement("desc", null, h),
      n,
    );
  }),
  $N = ["children", "className"];
function ty() {
  return (
    (ty = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    ty.apply(null, arguments)
  );
}
function YN(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = KN(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function KN(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var qr = w.forwardRef((e, t) => {
    var { children: n, className: a } = e,
      u = YN(e, $N),
      o = Ge("recharts-layer", a);
    return w.createElement("g", ty({ className: o }, Vt(u), { ref: t }), n);
  }),
  DA = SA(),
  GN = w.createContext(null);
function Xe(e) {
  return function () {
    return e;
  };
}
const NA = Math.cos,
  ps = Math.sin,
  Wn = Math.sqrt,
  gs = Math.PI,
  yf = 2 * gs,
  ny = Math.PI,
  ry = 2 * ny,
  ii = 1e-6,
  XN = ry - ii;
function PA(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function VN(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return PA;
  const n = 10 ** t;
  return function (a) {
    this._ += a[0];
    for (let u = 1, o = a.length; u < o; ++u)
      this._ += Math.round(arguments[u] * n) / n + a[u];
  };
}
class ZN {
  constructor(t) {
    ((this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = t == null ? PA : VN(t)));
  }
  moveTo(t, n) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(t, n) {
    this._append`L${(this._x1 = +t)},${(this._y1 = +n)}`;
  }
  quadraticCurveTo(t, n, a, u) {
    this._append`Q${+t},${+n},${(this._x1 = +a)},${(this._y1 = +u)}`;
  }
  bezierCurveTo(t, n, a, u, o, s) {
    this
      ._append`C${+t},${+n},${+a},${+u},${(this._x1 = +o)},${(this._y1 = +s)}`;
  }
  arcTo(t, n, a, u, o) {
    if (((t = +t), (n = +n), (a = +a), (u = +u), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      f = this._y1,
      d = a - t,
      h = u - n,
      m = s - t,
      p = f - n,
      g = m * m + p * p;
    if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = n)}`;
    else if (g > ii)
      if (!(Math.abs(p * d - h * m) > ii) || !o)
        this._append`L${(this._x1 = t)},${(this._y1 = n)}`;
      else {
        let b = a - s,
          S = u - f,
          _ = d * d + h * h,
          O = b * b + S * S,
          E = Math.sqrt(_),
          C = Math.sqrt(g),
          T = o * Math.tan((ny - Math.acos((_ + g - O) / (2 * E * C))) / 2),
          D = T / C,
          M = T / E;
        (Math.abs(D - 1) > ii && this._append`L${t + D * m},${n + D * p}`,
          this
            ._append`A${o},${o},0,0,${+(p * b > m * S)},${(this._x1 = t + M * d)},${(this._y1 = n + M * h)}`);
      }
  }
  arc(t, n, a, u, o, s) {
    if (((t = +t), (n = +n), (a = +a), (s = !!s), a < 0))
      throw new Error(`negative radius: ${a}`);
    let f = a * Math.cos(u),
      d = a * Math.sin(u),
      h = t + f,
      m = n + d,
      p = 1 ^ s,
      g = s ? u - o : o - u;
    (this._x1 === null
      ? this._append`M${h},${m}`
      : (Math.abs(this._x1 - h) > ii || Math.abs(this._y1 - m) > ii) &&
        this._append`L${h},${m}`,
      a &&
        (g < 0 && (g = (g % ry) + ry),
        g > XN
          ? this
              ._append`A${a},${a},0,1,${p},${t - f},${n - d}A${a},${a},0,1,${p},${(this._x1 = h)},${(this._y1 = m)}`
          : g > ii &&
            this
              ._append`A${a},${a},0,${+(g >= ny)},${p},${(this._x1 = t + a * Math.cos(o))},${(this._y1 = n + a * Math.sin(o))}`));
  }
  rect(t, n, a, u) {
    this
      ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}h${(a = +a)}v${+u}h${-a}Z`;
  }
  toString() {
    return this._;
  }
}
function Zy(e) {
  let t = 3;
  return (
    (e.digits = function (n) {
      if (!arguments.length) return t;
      if (n == null) t = null;
      else {
        const a = Math.floor(n);
        if (!(a >= 0)) throw new RangeError(`invalid digits: ${n}`);
        t = a;
      }
      return e;
    }),
    () => new ZN(t)
  );
}
function Qy(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function zA(e) {
  this._context = e;
}
zA.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    ((this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  },
};
function pf(e) {
  return new zA(e);
}
function kA(e) {
  return e[0];
}
function RA(e) {
  return e[1];
}
function LA(e, t) {
  var n = Xe(!0),
    a = null,
    u = pf,
    o = null,
    s = Zy(f);
  ((e = typeof e == "function" ? e : e === void 0 ? kA : Xe(e)),
    (t = typeof t == "function" ? t : t === void 0 ? RA : Xe(t)));
  function f(d) {
    var h,
      m = (d = Qy(d)).length,
      p,
      g = !1,
      b;
    for (a == null && (o = u((b = s()))), h = 0; h <= m; ++h)
      (!(h < m && n((p = d[h]), h, d)) === g &&
        ((g = !g) ? o.lineStart() : o.lineEnd()),
        g && o.point(+e(p, h, d), +t(p, h, d)));
    if (b) return ((o = null), b + "" || null);
  }
  return (
    (f.x = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : Xe(+d)), f)
        : e;
    }),
    (f.y = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : Xe(+d)), f)
        : t;
    }),
    (f.defined = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : Xe(!!d)), f)
        : n;
    }),
    (f.curve = function (d) {
      return arguments.length ? ((u = d), a != null && (o = u(a)), f) : u;
    }),
    (f.context = function (d) {
      return arguments.length
        ? (d == null ? (a = o = null) : (o = u((a = d))), f)
        : a;
    }),
    f
  );
}
function Zc(e, t, n) {
  var a = null,
    u = Xe(!0),
    o = null,
    s = pf,
    f = null,
    d = Zy(h);
  ((e = typeof e == "function" ? e : e === void 0 ? kA : Xe(+e)),
    (t = typeof t == "function" ? t : Xe(t === void 0 ? 0 : +t)),
    (n = typeof n == "function" ? n : n === void 0 ? RA : Xe(+n)));
  function h(p) {
    var g,
      b,
      S,
      _ = (p = Qy(p)).length,
      O,
      E = !1,
      C,
      T = new Array(_),
      D = new Array(_);
    for (o == null && (f = s((C = d()))), g = 0; g <= _; ++g) {
      if (!(g < _ && u((O = p[g]), g, p)) === E)
        if ((E = !E)) ((b = g), f.areaStart(), f.lineStart());
        else {
          for (f.lineEnd(), f.lineStart(), S = g - 1; S >= b; --S)
            f.point(T[S], D[S]);
          (f.lineEnd(), f.areaEnd());
        }
      E &&
        ((T[g] = +e(O, g, p)),
        (D[g] = +t(O, g, p)),
        f.point(a ? +a(O, g, p) : T[g], n ? +n(O, g, p) : D[g]));
    }
    if (C) return ((f = null), C + "" || null);
  }
  function m() {
    return LA().defined(u).curve(s).context(o);
  }
  return (
    (h.x = function (p) {
      return arguments.length
        ? ((e = typeof p == "function" ? p : Xe(+p)), (a = null), h)
        : e;
    }),
    (h.x0 = function (p) {
      return arguments.length
        ? ((e = typeof p == "function" ? p : Xe(+p)), h)
        : e;
    }),
    (h.x1 = function (p) {
      return arguments.length
        ? ((a = p == null ? null : typeof p == "function" ? p : Xe(+p)), h)
        : a;
    }),
    (h.y = function (p) {
      return arguments.length
        ? ((t = typeof p == "function" ? p : Xe(+p)), (n = null), h)
        : t;
    }),
    (h.y0 = function (p) {
      return arguments.length
        ? ((t = typeof p == "function" ? p : Xe(+p)), h)
        : t;
    }),
    (h.y1 = function (p) {
      return arguments.length
        ? ((n = p == null ? null : typeof p == "function" ? p : Xe(+p)), h)
        : n;
    }),
    (h.lineX0 = h.lineY0 =
      function () {
        return m().x(e).y(t);
      }),
    (h.lineY1 = function () {
      return m().x(e).y(n);
    }),
    (h.lineX1 = function () {
      return m().x(a).y(t);
    }),
    (h.defined = function (p) {
      return arguments.length
        ? ((u = typeof p == "function" ? p : Xe(!!p)), h)
        : u;
    }),
    (h.curve = function (p) {
      return arguments.length ? ((s = p), o != null && (f = s(o)), h) : s;
    }),
    (h.context = function (p) {
      return arguments.length
        ? (p == null ? (o = f = null) : (f = s((o = p))), h)
        : o;
    }),
    h
  );
}
class UA {
  constructor(t, n) {
    ((this._context = t), (this._x = n));
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    ((this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  }
  point(t, n) {
    switch (((t = +t), (n = +n), this._point)) {
      case 0: {
        ((this._point = 1),
          this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n));
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x
          ? this._context.bezierCurveTo(
              (this._x0 = (this._x0 + t) / 2),
              this._y0,
              this._x0,
              n,
              t,
              n,
            )
          : this._context.bezierCurveTo(
              this._x0,
              (this._y0 = (this._y0 + n) / 2),
              t,
              this._y0,
              t,
              n,
            );
        break;
      }
    }
    ((this._x0 = t), (this._y0 = n));
  }
}
function QN(e) {
  return new UA(e, !0);
}
function WN(e) {
  return new UA(e, !1);
}
const Wy = {
    draw(e, t) {
      const n = Wn(t / gs);
      (e.moveTo(n, 0), e.arc(0, 0, n, 0, yf));
    },
  },
  FN = {
    draw(e, t) {
      const n = Wn(t / 5) / 2;
      (e.moveTo(-3 * n, -n),
        e.lineTo(-n, -n),
        e.lineTo(-n, -3 * n),
        e.lineTo(n, -3 * n),
        e.lineTo(n, -n),
        e.lineTo(3 * n, -n),
        e.lineTo(3 * n, n),
        e.lineTo(n, n),
        e.lineTo(n, 3 * n),
        e.lineTo(-n, 3 * n),
        e.lineTo(-n, n),
        e.lineTo(-3 * n, n),
        e.closePath());
    },
  },
  qA = Wn(1 / 3),
  JN = qA * 2,
  eP = {
    draw(e, t) {
      const n = Wn(t / JN),
        a = n * qA;
      (e.moveTo(0, -n),
        e.lineTo(a, 0),
        e.lineTo(0, n),
        e.lineTo(-a, 0),
        e.closePath());
    },
  },
  tP = {
    draw(e, t) {
      const n = Wn(t),
        a = -n / 2;
      e.rect(a, a, n, n);
    },
  },
  nP = 0.8908130915292852,
  BA = ps(gs / 10) / ps((7 * gs) / 10),
  rP = ps(yf / 10) * BA,
  aP = -NA(yf / 10) * BA,
  iP = {
    draw(e, t) {
      const n = Wn(t * nP),
        a = rP * n,
        u = aP * n;
      (e.moveTo(0, -n), e.lineTo(a, u));
      for (let o = 1; o < 5; ++o) {
        const s = (yf * o) / 5,
          f = NA(s),
          d = ps(s);
        (e.lineTo(d * n, -f * n), e.lineTo(f * a - d * u, d * a + f * u));
      }
      e.closePath();
    },
  },
  Oh = Wn(3),
  lP = {
    draw(e, t) {
      const n = -Wn(t / (Oh * 3));
      (e.moveTo(0, n * 2),
        e.lineTo(-Oh * n, -n),
        e.lineTo(Oh * n, -n),
        e.closePath());
    },
  },
  Rn = -0.5,
  Ln = Wn(3) / 2,
  ay = 1 / Wn(12),
  uP = (ay / 2 + 1) * 3,
  oP = {
    draw(e, t) {
      const n = Wn(t / uP),
        a = n / 2,
        u = n * ay,
        o = a,
        s = n * ay + n,
        f = -o,
        d = s;
      (e.moveTo(a, u),
        e.lineTo(o, s),
        e.lineTo(f, d),
        e.lineTo(Rn * a - Ln * u, Ln * a + Rn * u),
        e.lineTo(Rn * o - Ln * s, Ln * o + Rn * s),
        e.lineTo(Rn * f - Ln * d, Ln * f + Rn * d),
        e.lineTo(Rn * a + Ln * u, Rn * u - Ln * a),
        e.lineTo(Rn * o + Ln * s, Rn * s - Ln * o),
        e.lineTo(Rn * f + Ln * d, Rn * d - Ln * f),
        e.closePath());
    },
  };
function cP(e, t) {
  let n = null,
    a = Zy(u);
  ((e = typeof e == "function" ? e : Xe(e || Wy)),
    (t = typeof t == "function" ? t : Xe(t === void 0 ? 64 : +t)));
  function u() {
    let o;
    if (
      (n || (n = o = a()),
      e.apply(this, arguments).draw(n, +t.apply(this, arguments)),
      o)
    )
      return ((n = null), o + "" || null);
  }
  return (
    (u.type = function (o) {
      return arguments.length
        ? ((e = typeof o == "function" ? o : Xe(o)), u)
        : e;
    }),
    (u.size = function (o) {
      return arguments.length
        ? ((t = typeof o == "function" ? o : Xe(+o)), u)
        : t;
    }),
    (u.context = function (o) {
      return arguments.length ? ((n = o ?? null), u) : n;
    }),
    u
  );
}
function bs() {}
function xs(e, t, n) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + n) / 6,
  );
}
function HA(e) {
  this._context = e;
}
HA.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        xs(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    ((this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        ((this._point = 3),
          this._context.lineTo(
            (5 * this._x0 + this._x1) / 6,
            (5 * this._y0 + this._y1) / 6,
          ));
      default:
        xs(this, e, t);
        break;
    }
    ((this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t));
  },
};
function sP(e) {
  return new HA(e);
}
function IA(e) {
  this._context = e;
}
IA.prototype = {
  areaStart: bs,
  areaEnd: bs,
  lineStart: function () {
    ((this._x0 =
      this._x1 =
      this._x2 =
      this._x3 =
      this._x4 =
      this._y0 =
      this._y1 =
      this._y2 =
      this._y3 =
      this._y4 =
        NaN),
      (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        (this._context.moveTo(this._x2, this._y2), this._context.closePath());
        break;
      }
      case 2: {
        (this._context.moveTo(
          (this._x2 + 2 * this._x3) / 3,
          (this._y2 + 2 * this._y3) / 3,
        ),
          this._context.lineTo(
            (this._x3 + 2 * this._x2) / 3,
            (this._y3 + 2 * this._y2) / 3,
          ),
          this._context.closePath());
        break;
      }
      case 3: {
        (this.point(this._x2, this._y2),
          this.point(this._x3, this._y3),
          this.point(this._x4, this._y4));
        break;
      }
    }
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1), (this._x2 = e), (this._y2 = t));
        break;
      case 1:
        ((this._point = 2), (this._x3 = e), (this._y3 = t));
        break;
      case 2:
        ((this._point = 3),
          (this._x4 = e),
          (this._y4 = t),
          this._context.moveTo(
            (this._x0 + 4 * this._x1 + e) / 6,
            (this._y0 + 4 * this._y1 + t) / 6,
          ));
        break;
      default:
        xs(this, e, t);
        break;
    }
    ((this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t));
  },
};
function fP(e) {
  return new IA(e);
}
function $A(e) {
  this._context = e;
}
$A.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0));
  },
  lineEnd: function () {
    ((this._line || (this._line !== 0 && this._point === 3)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var n = (this._x0 + 4 * this._x1 + e) / 6,
          a = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(n, a) : this._context.moveTo(n, a);
        break;
      case 3:
        this._point = 4;
      default:
        xs(this, e, t);
        break;
    }
    ((this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t));
  },
};
function dP(e) {
  return new $A(e);
}
function YA(e) {
  this._context = e;
}
YA.prototype = {
  areaStart: bs,
  areaEnd: bs,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    this._point && this._context.closePath();
  },
  point: function (e, t) {
    ((e = +e),
      (t = +t),
      this._point
        ? this._context.lineTo(e, t)
        : ((this._point = 1), this._context.moveTo(e, t)));
  },
};
function vP(e) {
  return new YA(e);
}
function Lx(e) {
  return e < 0 ? -1 : 1;
}
function Ux(e, t, n) {
  var a = e._x1 - e._x0,
    u = t - e._x1,
    o = (e._y1 - e._y0) / (a || (u < 0 && -0)),
    s = (n - e._y1) / (u || (a < 0 && -0)),
    f = (o * u + s * a) / (a + u);
  return (
    (Lx(o) + Lx(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(f)) || 0
  );
}
function qx(e, t) {
  var n = e._x1 - e._x0;
  return n ? ((3 * (e._y1 - e._y0)) / n - t) / 2 : t;
}
function _h(e, t, n) {
  var a = e._x0,
    u = e._y0,
    o = e._x1,
    s = e._y1,
    f = (o - a) / 3;
  e._context.bezierCurveTo(a + f, u + f * t, o - f, s - f * n, o, s);
}
function Ss(e) {
  this._context = e;
}
Ss.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
      (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        _h(this, this._t0, qx(this, this._t0));
        break;
    }
    ((this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    var n = NaN;
    if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
      switch (this._point) {
        case 0:
          ((this._point = 1),
            this._line
              ? this._context.lineTo(e, t)
              : this._context.moveTo(e, t));
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          ((this._point = 3), _h(this, qx(this, (n = Ux(this, e, t))), n));
          break;
        default:
          _h(this, this._t0, (n = Ux(this, e, t)));
          break;
      }
      ((this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t),
        (this._t0 = n));
    }
  },
};
function KA(e) {
  this._context = new GA(e);
}
(KA.prototype = Object.create(Ss.prototype)).point = function (e, t) {
  Ss.prototype.point.call(this, t, e);
};
function GA(e) {
  this._context = e;
}
GA.prototype = {
  moveTo: function (e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function (e, t, n, a, u, o) {
    this._context.bezierCurveTo(t, e, a, n, o, u);
  },
};
function hP(e) {
  return new Ss(e);
}
function mP(e) {
  return new KA(e);
}
function XA(e) {
  this._context = e;
}
XA.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x = []), (this._y = []));
  },
  lineEnd: function () {
    var e = this._x,
      t = this._y,
      n = e.length;
    if (n)
      if (
        (this._line
          ? this._context.lineTo(e[0], t[0])
          : this._context.moveTo(e[0], t[0]),
        n === 2)
      )
        this._context.lineTo(e[1], t[1]);
      else
        for (var a = Bx(e), u = Bx(t), o = 0, s = 1; s < n; ++o, ++s)
          this._context.bezierCurveTo(
            a[0][o],
            u[0][o],
            a[1][o],
            u[1][o],
            e[s],
            t[s],
          );
    ((this._line || (this._line !== 0 && n === 1)) && this._context.closePath(),
      (this._line = 1 - this._line),
      (this._x = this._y = null));
  },
  point: function (e, t) {
    (this._x.push(+e), this._y.push(+t));
  },
};
function Bx(e) {
  var t,
    n = e.length - 1,
    a,
    u = new Array(n),
    o = new Array(n),
    s = new Array(n);
  for (u[0] = 0, o[0] = 2, s[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t)
    ((u[t] = 1), (o[t] = 4), (s[t] = 4 * e[t] + 2 * e[t + 1]));
  for (
    u[n - 1] = 2, o[n - 1] = 7, s[n - 1] = 8 * e[n - 1] + e[n], t = 1;
    t < n;
    ++t
  )
    ((a = u[t] / o[t - 1]), (o[t] -= a), (s[t] -= a * s[t - 1]));
  for (u[n - 1] = s[n - 1] / o[n - 1], t = n - 2; t >= 0; --t)
    u[t] = (s[t] - u[t + 1]) / o[t];
  for (o[n - 1] = (e[n] + u[n - 1]) / 2, t = 0; t < n - 1; ++t)
    o[t] = 2 * e[t + 1] - u[t + 1];
  return [u, o];
}
function yP(e) {
  return new XA(e);
}
function gf(e, t) {
  ((this._context = e), (this._t = t));
}
gf.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x = this._y = NaN), (this._point = 0));
  },
  lineEnd: function () {
    (0 < this._t &&
      this._t < 1 &&
      this._point === 2 &&
      this._context.lineTo(this._x, this._y),
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
      this._line >= 0 &&
        ((this._t = 1 - this._t), (this._line = 1 - this._line)));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0)
          (this._context.lineTo(this._x, t), this._context.lineTo(e, t));
        else {
          var n = this._x * (1 - this._t) + e * this._t;
          (this._context.lineTo(n, this._y), this._context.lineTo(n, t));
        }
        break;
      }
    }
    ((this._x = e), (this._y = t));
  },
};
function pP(e) {
  return new gf(e, 0.5);
}
function gP(e) {
  return new gf(e, 0);
}
function bP(e) {
  return new gf(e, 1);
}
function mi(e, t) {
  if ((s = e.length) > 1)
    for (var n = 1, a, u, o = e[t[0]], s, f = o.length; n < s; ++n)
      for (u = o, o = e[t[n]], a = 0; a < f; ++a)
        o[a][1] += o[a][0] = isNaN(u[a][1]) ? u[a][0] : u[a][1];
}
function iy(e) {
  for (var t = e.length, n = new Array(t); --t >= 0; ) n[t] = t;
  return n;
}
function xP(e, t) {
  return e[t];
}
function SP(e) {
  const t = [];
  return ((t.key = e), t);
}
function wP() {
  var e = Xe([]),
    t = iy,
    n = mi,
    a = xP;
  function u(o) {
    var s = Array.from(e.apply(this, arguments), SP),
      f,
      d = s.length,
      h = -1,
      m;
    for (const p of o)
      for (f = 0, ++h; f < d; ++f)
        (s[f][h] = [0, +a(p, s[f].key, h, o)]).data = p;
    for (f = 0, m = Qy(t(s)); f < d; ++f) s[m[f]].index = f;
    return (n(s, m), s);
  }
  return (
    (u.keys = function (o) {
      return arguments.length
        ? ((e = typeof o == "function" ? o : Xe(Array.from(o))), u)
        : e;
    }),
    (u.value = function (o) {
      return arguments.length
        ? ((a = typeof o == "function" ? o : Xe(+o)), u)
        : a;
    }),
    (u.order = function (o) {
      return arguments.length
        ? ((t =
            o == null ? iy : typeof o == "function" ? o : Xe(Array.from(o))),
          u)
        : t;
    }),
    (u.offset = function (o) {
      return arguments.length ? ((n = o ?? mi), u) : n;
    }),
    u
  );
}
function OP(e, t) {
  if ((a = e.length) > 0) {
    for (var n, a, u = 0, o = e[0].length, s; u < o; ++u) {
      for (s = n = 0; n < a; ++n) s += e[n][u][1] || 0;
      if (s) for (n = 0; n < a; ++n) e[n][u][1] /= s;
    }
    mi(e, t);
  }
}
function _P(e, t) {
  if ((u = e.length) > 0) {
    for (var n = 0, a = e[t[0]], u, o = a.length; n < o; ++n) {
      for (var s = 0, f = 0; s < u; ++s) f += e[s][n][1] || 0;
      a[n][1] += a[n][0] = -f / 2;
    }
    mi(e, t);
  }
}
function AP(e, t) {
  if (!(!((s = e.length) > 0) || !((o = (u = e[t[0]]).length) > 0))) {
    for (var n = 0, a = 1, u, o, s; a < o; ++a) {
      for (var f = 0, d = 0, h = 0; f < s; ++f) {
        for (
          var m = e[t[f]],
            p = m[a][1] || 0,
            g = m[a - 1][1] || 0,
            b = (p - g) / 2,
            S = 0;
          S < f;
          ++S
        ) {
          var _ = e[t[S]],
            O = _[a][1] || 0,
            E = _[a - 1][1] || 0;
          b += O - E;
        }
        ((d += p), (h += b * p));
      }
      ((u[a - 1][1] += u[a - 1][0] = n), d && (n -= h / d));
    }
    ((u[a - 1][1] += u[a - 1][0] = n), mi(e, t));
  }
}
var Ah = {},
  Eh = {},
  Hx;
function EP() {
  return (
    Hx ||
      ((Hx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return n === "__proto__";
        }
        e.isUnsafeProperty = t;
      })(Eh)),
    Eh
  );
}
var jh = {},
  Ix;
function VA() {
  return (
    Ix ||
      ((Ix = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          switch (typeof n) {
            case "number":
            case "symbol":
              return !1;
            case "string":
              return n.includes(".") || n.includes("[") || n.includes("]");
          }
        }
        e.isDeepKey = t;
      })(jh)),
    jh
  );
}
var Th = {},
  $x;
function Fy() {
  return (
    $x ||
      (($x = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return typeof n == "string" || typeof n == "symbol"
            ? n
            : Object.is(n?.valueOf?.(), -0)
              ? "-0"
              : String(n);
        }
        e.toKey = t;
      })(Th)),
    Th
  );
}
var Mh = {},
  Ch = {},
  Yx;
function jP() {
  return (
    Yx ||
      ((Yx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          if (n == null) return "";
          if (typeof n == "string") return n;
          if (Array.isArray(n)) return n.map(t).join(",");
          const a = String(n);
          return a === "0" && Object.is(Number(n), -0) ? "-0" : a;
        }
        e.toString = t;
      })(Ch)),
    Ch
  );
}
var Kx;
function Jy() {
  return (
    Kx ||
      ((Kx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = jP(),
          n = Fy();
        function a(u) {
          if (Array.isArray(u)) return u.map(n.toKey);
          if (typeof u == "symbol") return [u];
          u = t.toString(u);
          const o = [],
            s = u.length;
          if (s === 0) return o;
          let f = 0,
            d = "",
            h = "",
            m = !1;
          for (u.charCodeAt(0) === 46 && (o.push(""), f++); f < s; ) {
            const p = u[f];
            (h
              ? p === "\\" && f + 1 < s
                ? (f++, (d += u[f]))
                : p === h
                  ? (h = "")
                  : (d += p)
              : m
                ? p === '"' || p === "'"
                  ? (h = p)
                  : p === "]"
                    ? ((m = !1), o.push(d), (d = ""))
                    : (d += p)
                : p === "["
                  ? ((m = !0), d && (o.push(d), (d = "")))
                  : p === "."
                    ? d && (o.push(d), (d = ""))
                    : (d += p),
              f++);
          }
          return (d && o.push(d), o);
        }
        e.toPath = a;
      })(Mh)),
    Mh
  );
}
var Gx;
function ep() {
  return (
    Gx ||
      ((Gx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = EP(),
          n = VA(),
          a = Fy(),
          u = Jy();
        function o(f, d, h) {
          if (f == null) return h;
          switch (typeof d) {
            case "string": {
              if (t.isUnsafeProperty(d)) return h;
              const m = f[d];
              return m === void 0
                ? n.isDeepKey(d)
                  ? o(f, u.toPath(d), h)
                  : h
                : m;
            }
            case "number":
            case "symbol": {
              typeof d == "number" && (d = a.toKey(d));
              const m = f[d];
              return m === void 0 ? h : m;
            }
            default: {
              if (Array.isArray(d)) return s(f, d, h);
              if (
                (Object.is(d?.valueOf(), -0) ? (d = "-0") : (d = String(d)),
                t.isUnsafeProperty(d))
              )
                return h;
              const m = f[d];
              return m === void 0 ? h : m;
            }
          }
        }
        function s(f, d, h) {
          if (d.length === 0) return h;
          let m = f;
          for (let p = 0; p < d.length; p++) {
            if (m == null || t.isUnsafeProperty(d[p])) return h;
            m = m[d[p]];
          }
          return m === void 0 ? h : m;
        }
        e.get = o;
      })(Ah)),
    Ah
  );
}
var Dh, Xx;
function TP() {
  return (Xx || ((Xx = 1), (Dh = ep().get)), Dh);
}
var MP = TP();
const bf = Pa(MP);
var CP = 4;
function Ma(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : CP,
    n = 10 ** t,
    a = Math.round(e * n) / n;
  return Object.is(a, -0) ? 0 : a;
}
function at(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1;
    a < t;
    a++
  )
    n[a - 1] = arguments[a];
  return e.reduce((u, o, s) => {
    var f = n[s - 1];
    return typeof f == "string"
      ? u + f + o
      : f !== void 0
        ? u + Ma(f) + o
        : u + o;
  }, "");
}
var qn = (e) => (e === 0 ? 0 : e > 0 ? 1 : -1),
  Br = (e) => typeof e == "number" && e != +e,
  yi = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1,
  ve = (e) => (typeof e == "number" || e instanceof Number) && !Br(e),
  fr = (e) => ve(e) || typeof e == "string",
  DP = 0,
  Qu = (e) => {
    var t = ++DP;
    return "".concat(e || "").concat(t);
  },
  Na = function (t, n) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!ve(t) && typeof t != "string") return a;
    var o;
    if (yi(t)) {
      if (n == null) return a;
      var s = t.indexOf("%");
      o = (n * parseFloat(t.slice(0, s))) / 100;
    } else o = +t;
    return (Br(o) && (o = a), u && n != null && o > n && (o = n), o);
  },
  ZA = (e) => {
    if (!Array.isArray(e)) return !1;
    for (var t = e.length, n = {}, a = 0; a < t; a++)
      if (!n[String(e[a])]) n[String(e[a])] = !0;
      else return !0;
    return !1;
  };
function an(e, t, n) {
  return ve(e) && ve(t) ? Ma(e + n * (t - e)) : t;
}
function QA(e, t, n) {
  if (!(!e || !e.length))
    return e.find((a) => a && (typeof t == "function" ? t(a) : bf(a, t)) === n);
}
var Ot = (e) => e === null || typeof e > "u",
  ho = (e) =>
    Ot(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function ln(e) {
  return e != null;
}
function wi() {}
var NP = ["type", "size", "sizeType"];
function ly() {
  return (
    (ly = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    ly.apply(null, arguments)
  );
}
function Vx(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function Zx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Vx(Object(n), !0).forEach(function (a) {
          PP(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Vx(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function PP(e, t, n) {
  return (
    (t = zP(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function zP(e) {
  var t = kP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function kP(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function RP(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = LP(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function LP(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var WA = {
    symbolCircle: Wy,
    symbolCross: FN,
    symbolDiamond: eP,
    symbolSquare: tP,
    symbolStar: iP,
    symbolTriangle: lP,
    symbolWye: oP,
  },
  UP = Math.PI / 180,
  qP = (e) => {
    var t = "symbol".concat(ho(e));
    return WA[t] || Wy;
  },
  BP = (e, t, n) => {
    if (t === "area") return e;
    switch (n) {
      case "cross":
        return (5 * e * e) / 9;
      case "diamond":
        return (0.5 * e * e) / Math.sqrt(3);
      case "square":
        return e * e;
      case "star": {
        var a = 18 * UP;
        return (
          1.25 * e * e * (Math.tan(a) - Math.tan(a * 2) * Math.tan(a) ** 2)
        );
      }
      case "triangle":
        return (Math.sqrt(3) * e * e) / 4;
      case "wye":
        return ((21 - 10 * Math.sqrt(3)) * e * e) / 8;
      default:
        return (Math.PI * e * e) / 4;
    }
  },
  HP = (e, t) => {
    WA["symbol".concat(ho(e))] = t;
  },
  FA = (e) => {
    var { type: t = "circle", size: n = 64, sizeType: a = "area" } = e,
      u = RP(e, NP),
      o = Zx(Zx({}, u), {}, { type: t, size: n, sizeType: a }),
      s = "circle";
    typeof t == "string" && (s = t);
    var f = () => {
        var g = qP(s),
          b = cP()
            .type(g)
            .size(BP(n, a, s)),
          S = b();
        if (S !== null) return S;
      },
      { className: d, cx: h, cy: m } = o,
      p = Vt(o);
    return ve(h) && ve(m) && ve(n)
      ? w.createElement(
          "path",
          ly({}, p, {
            className: Ge("recharts-symbols", d),
            transform: "translate(".concat(h, ", ").concat(m, ")"),
            d: f(),
          }),
        )
      : null;
  };
FA.registerSymbol = HP;
var JA = (e) => "radius" in e && "startAngle" in e && "endAngle" in e,
  tp = (e, t) => {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var n = e;
    if (
      (w.isValidElement(e) && (n = e.props),
      typeof n != "object" && typeof n != "function")
    )
      return null;
    var a = {};
    return (
      Object.keys(n).forEach((u) => {
        Vy(u) && typeof n[u] == "function" && (a[u] = (o) => n[u](n, o));
      }),
      a
    );
  },
  IP = (e, t, n) => (a) => (e(t, n, a), null),
  $P = (e, t, n) => {
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return null;
    var a = null;
    return (
      Object.keys(e).forEach((u) => {
        var o = e[u];
        Vy(u) &&
          typeof o == "function" &&
          (a || (a = {}), (a[u] = IP(o, t, n)));
      }),
      a
    );
  };
function Qx(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function YP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Qx(Object(n), !0).forEach(function (a) {
          KP(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Qx(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function KP(e, t, n) {
  return (
    (t = GP(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function GP(e) {
  var t = XP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function XP(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function cn(e, t) {
  var n = YP({}, e),
    a = t,
    u = Object.keys(t),
    o = u.reduce(
      (s, f) => (s[f] === void 0 && a[f] !== void 0 && (s[f] = a[f]), s),
      n,
    );
  return o;
}
var Nh = {},
  Ph = {},
  Wx;
function VP() {
  return (
    Wx ||
      ((Wx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n, a) {
          const u = new Map();
          for (let o = 0; o < n.length; o++) {
            const s = n[o],
              f = a(s, o, n);
            u.has(f) || u.set(f, s);
          }
          return Array.from(u.values());
        }
        e.uniqBy = t;
      })(Ph)),
    Ph
  );
}
var zh = {},
  Fx;
function ZP() {
  return (
    Fx ||
      ((Fx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n, a) {
          return function (...u) {
            return n.apply(this, u.slice(0, a));
          };
        }
        e.ary = t;
      })(zh)),
    zh
  );
}
var kh = {},
  Jx;
function eE() {
  return (
    Jx ||
      ((Jx = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return n;
        }
        e.identity = t;
      })(kh)),
    kh
  );
}
var Rh = {},
  Lh = {},
  Uh = {},
  eS;
function QP() {
  return (
    eS ||
      ((eS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return Number.isSafeInteger(n) && n >= 0;
        }
        e.isLength = t;
      })(Uh)),
    Uh
  );
}
var tS;
function tE() {
  return (
    tS ||
      ((tS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = QP();
        function n(a) {
          return a != null && typeof a != "function" && t.isLength(a.length);
        }
        e.isArrayLike = n;
      })(Lh)),
    Lh
  );
}
var qh = {},
  nS;
function WP() {
  return (
    nS ||
      ((nS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return typeof n == "object" && n !== null;
        }
        e.isObjectLike = t;
      })(qh)),
    qh
  );
}
var rS;
function FP() {
  return (
    rS ||
      ((rS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = tE(),
          n = WP();
        function a(u) {
          return n.isObjectLike(u) && t.isArrayLike(u);
        }
        e.isArrayLikeObject = a;
      })(Rh)),
    Rh
  );
}
var Bh = {},
  Hh = {},
  aS;
function JP() {
  return (
    aS ||
      ((aS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = ep();
        function n(a) {
          return function (u) {
            return t.get(u, a);
          };
        }
        e.property = n;
      })(Hh)),
    Hh
  );
}
var Ih = {},
  $h = {},
  Yh = {},
  Kh = {},
  iS;
function nE() {
  return (
    iS ||
      ((iS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return n !== null && (typeof n == "object" || typeof n == "function");
        }
        e.isObject = t;
      })(Kh)),
    Kh
  );
}
var Gh = {},
  lS;
function rE() {
  return (
    lS ||
      ((lS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return n == null || (typeof n != "object" && typeof n != "function");
        }
        e.isPrimitive = t;
      })(Gh)),
    Gh
  );
}
var Xh = {},
  uS;
function aE() {
  return (
    uS ||
      ((uS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n, a) {
          return n === a || (Number.isNaN(n) && Number.isNaN(a));
        }
        e.isEqualsSameValueZero = t;
      })(Xh)),
    Xh
  );
}
var oS;
function ez() {
  return (
    oS ||
      ((oS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = nE(),
          n = rE(),
          a = aE();
        function u(m, p, g) {
          return typeof g != "function"
            ? u(m, p, () => {})
            : o(
                m,
                p,
                function b(S, _, O, E, C, T) {
                  const D = g(S, _, O, E, C, T);
                  return D !== void 0 ? !!D : o(S, _, b, T);
                },
                new Map(),
              );
        }
        function o(m, p, g, b) {
          if (p === m) return !0;
          switch (typeof p) {
            case "object":
              return s(m, p, g, b);
            case "function":
              return Object.keys(p).length > 0
                ? o(m, { ...p }, g, b)
                : a.isEqualsSameValueZero(m, p);
            default:
              return t.isObject(m)
                ? typeof p == "string"
                  ? p === ""
                  : !0
                : a.isEqualsSameValueZero(m, p);
          }
        }
        function s(m, p, g, b) {
          if (p == null) return !0;
          if (Array.isArray(p)) return d(m, p, g, b);
          if (p instanceof Map) return f(m, p, g, b);
          if (p instanceof Set) return h(m, p, g, b);
          const S = Object.keys(p);
          if (m == null || n.isPrimitive(m)) return S.length === 0;
          if (S.length === 0) return !0;
          if (b?.has(p)) return b.get(p) === m;
          b?.set(p, m);
          try {
            for (let _ = 0; _ < S.length; _++) {
              const O = S[_];
              if (
                (!n.isPrimitive(m) && !(O in m)) ||
                (p[O] === void 0 && m[O] !== void 0) ||
                (p[O] === null && m[O] !== null) ||
                !g(m[O], p[O], O, m, p, b)
              )
                return !1;
            }
            return !0;
          } finally {
            b?.delete(p);
          }
        }
        function f(m, p, g, b) {
          if (p.size === 0) return !0;
          if (!(m instanceof Map)) return !1;
          for (const [S, _] of p.entries()) {
            const O = m.get(S);
            if (g(O, _, S, m, p, b) === !1) return !1;
          }
          return !0;
        }
        function d(m, p, g, b) {
          if (p.length === 0) return !0;
          if (!Array.isArray(m)) return !1;
          const S = new Set();
          for (let _ = 0; _ < p.length; _++) {
            const O = p[_];
            let E = !1;
            for (let C = 0; C < m.length; C++) {
              if (S.has(C)) continue;
              const T = m[C];
              let D = !1;
              if ((g(T, O, _, m, p, b) && (D = !0), D)) {
                (S.add(C), (E = !0));
                break;
              }
            }
            if (!E) return !1;
          }
          return !0;
        }
        function h(m, p, g, b) {
          return p.size === 0
            ? !0
            : m instanceof Set
              ? d([...m], [...p], g, b)
              : !1;
        }
        ((e.isMatchWith = u), (e.isSetMatch = h));
      })(Yh)),
    Yh
  );
}
var cS;
function iE() {
  return (
    cS ||
      ((cS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = ez();
        function n(a, u) {
          return t.isMatchWith(a, u, () => {});
        }
        e.isMatch = n;
      })($h)),
    $h
  );
}
var Vh = {},
  Zh = {},
  Qh = {},
  sS;
function tz() {
  return (
    sS ||
      ((sS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return Object.getOwnPropertySymbols(n).filter((a) =>
            Object.prototype.propertyIsEnumerable.call(n, a),
          );
        }
        e.getSymbols = t;
      })(Qh)),
    Qh
  );
}
var Wh = {},
  fS;
function np() {
  return (
    fS ||
      ((fS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return n == null
            ? n === void 0
              ? "[object Undefined]"
              : "[object Null]"
            : Object.prototype.toString.call(n);
        }
        e.getTag = t;
      })(Wh)),
    Wh
  );
}
var Fh = {},
  dS;
function lE() {
  return (
    dS ||
      ((dS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = "[object RegExp]",
          n = "[object String]",
          a = "[object Number]",
          u = "[object Boolean]",
          o = "[object Arguments]",
          s = "[object Symbol]",
          f = "[object Date]",
          d = "[object Map]",
          h = "[object Set]",
          m = "[object Array]",
          p = "[object Function]",
          g = "[object ArrayBuffer]",
          b = "[object Object]",
          S = "[object Error]",
          _ = "[object DataView]",
          O = "[object Uint8Array]",
          E = "[object Uint8ClampedArray]",
          C = "[object Uint16Array]",
          T = "[object Uint32Array]",
          D = "[object BigUint64Array]",
          M = "[object Int8Array]",
          z = "[object Int16Array]",
          U = "[object Int32Array]",
          V = "[object BigInt64Array]",
          F = "[object Float32Array]",
          ae = "[object Float64Array]";
        ((e.argumentsTag = o),
          (e.arrayBufferTag = g),
          (e.arrayTag = m),
          (e.bigInt64ArrayTag = V),
          (e.bigUint64ArrayTag = D),
          (e.booleanTag = u),
          (e.dataViewTag = _),
          (e.dateTag = f),
          (e.errorTag = S),
          (e.float32ArrayTag = F),
          (e.float64ArrayTag = ae),
          (e.functionTag = p),
          (e.int16ArrayTag = z),
          (e.int32ArrayTag = U),
          (e.int8ArrayTag = M),
          (e.mapTag = d),
          (e.numberTag = a),
          (e.objectTag = b),
          (e.regexpTag = t),
          (e.setTag = h),
          (e.stringTag = n),
          (e.symbolTag = s),
          (e.uint16ArrayTag = C),
          (e.uint32ArrayTag = T),
          (e.uint8ArrayTag = O),
          (e.uint8ClampedArrayTag = E));
      })(Fh)),
    Fh
  );
}
var Jh = {},
  vS;
function nz() {
  return (
    vS ||
      ((vS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return ArrayBuffer.isView(n) && !(n instanceof DataView);
        }
        e.isTypedArray = t;
      })(Jh)),
    Jh
  );
}
var hS;
function uE() {
  return (
    hS ||
      ((hS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = tz(),
          n = np(),
          a = lE(),
          u = rE(),
          o = nz();
        function s(m, p) {
          return f(m, void 0, m, new Map(), p);
        }
        function f(m, p, g, b = new Map(), S = void 0) {
          const _ = S?.(m, p, g, b);
          if (_ !== void 0) return _;
          if (u.isPrimitive(m)) return m;
          if (b.has(m)) return b.get(m);
          if (Array.isArray(m)) {
            const O = new Array(m.length);
            b.set(m, O);
            for (let E = 0; E < m.length; E++) O[E] = f(m[E], E, g, b, S);
            return (
              Object.hasOwn(m, "index") && (O.index = m.index),
              Object.hasOwn(m, "input") && (O.input = m.input),
              O
            );
          }
          if (m instanceof Date) return new Date(m.getTime());
          if (m instanceof RegExp) {
            const O = new RegExp(m.source, m.flags);
            return ((O.lastIndex = m.lastIndex), O);
          }
          if (m instanceof Map) {
            const O = new Map();
            b.set(m, O);
            for (const [E, C] of m) O.set(E, f(C, E, g, b, S));
            return O;
          }
          if (m instanceof Set) {
            const O = new Set();
            b.set(m, O);
            for (const E of m) O.add(f(E, void 0, g, b, S));
            return O;
          }
          if (typeof Buffer < "u" && Buffer.isBuffer(m)) return m.subarray();
          if (o.isTypedArray(m)) {
            const O = new (Object.getPrototypeOf(m).constructor)(m.length);
            b.set(m, O);
            for (let E = 0; E < m.length; E++) O[E] = f(m[E], E, g, b, S);
            return O;
          }
          if (
            m instanceof ArrayBuffer ||
            (typeof SharedArrayBuffer < "u" && m instanceof SharedArrayBuffer)
          )
            return m.slice(0);
          if (m instanceof DataView) {
            const O = new DataView(
              m.buffer.slice(0),
              m.byteOffset,
              m.byteLength,
            );
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          if (typeof File < "u" && m instanceof File) {
            const O = new File([m], m.name, { type: m.type });
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          if (typeof Blob < "u" && m instanceof Blob) {
            const O = new Blob([m], { type: m.type });
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          if (m instanceof Error) {
            const O = structuredClone(m);
            return (
              b.set(m, O),
              (O.message = m.message),
              (O.name = m.name),
              (O.stack = m.stack),
              (O.cause = m.cause),
              (O.constructor = m.constructor),
              d(O, m, g, b, S),
              O
            );
          }
          if (m instanceof Boolean) {
            const O = new Boolean(m.valueOf());
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          if (m instanceof Number) {
            const O = new Number(m.valueOf());
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          if (m instanceof String) {
            const O = new String(m.valueOf());
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          if (typeof m == "object" && h(m)) {
            const O = Object.create(Object.getPrototypeOf(m));
            return (b.set(m, O), d(O, m, g, b, S), O);
          }
          return m;
        }
        function d(m, p, g = m, b, S) {
          const _ = [...Object.keys(p), ...t.getSymbols(p)];
          for (let O = 0; O < _.length; O++) {
            const E = _[O],
              C = Object.getOwnPropertyDescriptor(m, E);
            (C == null || C.writable) && (m[E] = f(p[E], E, g, b, S));
          }
        }
        function h(m) {
          switch (n.getTag(m)) {
            case a.argumentsTag:
            case a.arrayTag:
            case a.arrayBufferTag:
            case a.dataViewTag:
            case a.booleanTag:
            case a.dateTag:
            case a.float32ArrayTag:
            case a.float64ArrayTag:
            case a.int8ArrayTag:
            case a.int16ArrayTag:
            case a.int32ArrayTag:
            case a.mapTag:
            case a.numberTag:
            case a.objectTag:
            case a.regexpTag:
            case a.setTag:
            case a.stringTag:
            case a.symbolTag:
            case a.uint8ArrayTag:
            case a.uint8ClampedArrayTag:
            case a.uint16ArrayTag:
            case a.uint32ArrayTag:
              return !0;
            default:
              return !1;
          }
        }
        ((e.cloneDeepWith = s),
          (e.cloneDeepWithImpl = f),
          (e.copyProperties = d));
      })(Zh)),
    Zh
  );
}
var mS;
function rz() {
  return (
    mS ||
      ((mS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = uE();
        function n(a) {
          return t.cloneDeepWithImpl(a, void 0, a, new Map(), void 0);
        }
        e.cloneDeep = n;
      })(Vh)),
    Vh
  );
}
var yS;
function az() {
  return (
    yS ||
      ((yS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = iE(),
          n = rz();
        function a(u) {
          return ((u = n.cloneDeep(u)), (o) => t.isMatch(o, u));
        }
        e.matches = a;
      })(Ih)),
    Ih
  );
}
var em = {},
  tm = {},
  nm = {},
  pS;
function iz() {
  return (
    pS ||
      ((pS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = uE(),
          n = np(),
          a = lE();
        function u(o, s) {
          return t.cloneDeepWith(o, (f, d, h, m) => {
            const p = s?.(f, d, h, m);
            if (p !== void 0) return p;
            if (typeof o == "object") {
              if (
                n.getTag(o) === a.objectTag &&
                typeof o.constructor != "function"
              ) {
                const g = {};
                return (m.set(o, g), t.copyProperties(g, o, h, m), g);
              }
              switch (Object.prototype.toString.call(o)) {
                case a.numberTag:
                case a.stringTag:
                case a.booleanTag: {
                  const g = new o.constructor(o?.valueOf());
                  return (t.copyProperties(g, o), g);
                }
                case a.argumentsTag: {
                  const g = {};
                  return (
                    t.copyProperties(g, o),
                    (g.length = o.length),
                    (g[Symbol.iterator] = o[Symbol.iterator]),
                    g
                  );
                }
                default:
                  return;
              }
            }
          });
        }
        e.cloneDeepWith = u;
      })(nm)),
    nm
  );
}
var gS;
function lz() {
  return (
    gS ||
      ((gS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = iz();
        function n(a) {
          return t.cloneDeepWith(a);
        }
        e.cloneDeep = n;
      })(tm)),
    tm
  );
}
var rm = {},
  am = {},
  bS;
function oE() {
  return (
    bS ||
      ((bS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = /^(?:0|[1-9]\d*)$/;
        function n(a, u = Number.MAX_SAFE_INTEGER) {
          switch (typeof a) {
            case "number":
              return Number.isInteger(a) && a >= 0 && a < u;
            case "symbol":
              return !1;
            case "string":
              return t.test(a);
          }
        }
        e.isIndex = n;
      })(am)),
    am
  );
}
var im = {},
  xS;
function uz() {
  return (
    xS ||
      ((xS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = np();
        function n(a) {
          return (
            a !== null &&
            typeof a == "object" &&
            t.getTag(a) === "[object Arguments]"
          );
        }
        e.isArguments = n;
      })(im)),
    im
  );
}
var SS;
function oz() {
  return (
    SS ||
      ((SS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = VA(),
          n = oE(),
          a = uz(),
          u = Jy();
        function o(s, f) {
          let d;
          if (
            (Array.isArray(f)
              ? (d = f)
              : typeof f == "string" && t.isDeepKey(f) && s?.[f] == null
                ? (d = u.toPath(f))
                : (d = [f]),
            d.length === 0)
          )
            return !1;
          let h = s;
          for (let m = 0; m < d.length; m++) {
            const p = d[m];
            if (
              (h == null || !Object.hasOwn(h, p)) &&
              !(
                (Array.isArray(h) || a.isArguments(h)) &&
                n.isIndex(p) &&
                p < h.length
              )
            )
              return !1;
            h = h[p];
          }
          return !0;
        }
        e.has = o;
      })(rm)),
    rm
  );
}
var wS;
function cz() {
  return (
    wS ||
      ((wS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = iE(),
          n = Fy(),
          a = lz(),
          u = ep(),
          o = oz();
        function s(f, d) {
          switch (typeof f) {
            case "object": {
              Object.is(f?.valueOf(), -0) && (f = "-0");
              break;
            }
            case "number": {
              f = n.toKey(f);
              break;
            }
          }
          return (
            (d = a.cloneDeep(d)),
            function (h) {
              const m = u.get(h, f);
              return m === void 0
                ? o.has(h, f)
                : d === void 0
                  ? m === void 0
                  : t.isMatch(m, d);
            }
          );
        }
        e.matchesProperty = s;
      })(em)),
    em
  );
}
var OS;
function sz() {
  return (
    OS ||
      ((OS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = eE(),
          n = JP(),
          a = az(),
          u = cz();
        function o(s) {
          if (s == null) return t.identity;
          switch (typeof s) {
            case "function":
              return s;
            case "object":
              return Array.isArray(s) && s.length === 2
                ? u.matchesProperty(s[0], s[1])
                : a.matches(s);
            case "string":
            case "symbol":
            case "number":
              return n.property(s);
          }
        }
        e.iteratee = o;
      })(Bh)),
    Bh
  );
}
var _S;
function fz() {
  return (
    _S ||
      ((_S = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = VP(),
          n = ZP(),
          a = eE(),
          u = FP(),
          o = sz();
        function s(f, d = a.identity) {
          return u.isArrayLikeObject(f)
            ? t.uniqBy(Array.from(f), n.ary(o.iteratee(d), 1))
            : [];
        }
        e.uniqBy = s;
      })(Nh)),
    Nh
  );
}
var lm, AS;
function dz() {
  return (AS || ((AS = 1), (lm = fz().uniqBy)), lm);
}
var vz = dz();
const ES = Pa(vz);
function hz(e, t, n) {
  return t === !0 ? ES(e, n) : typeof t == "function" ? ES(e, t) : e;
}
var um = { exports: {} },
  om = {},
  cm = { exports: {} },
  sm = {};
var jS;
function mz() {
  if (jS) return sm;
  jS = 1;
  var e = Tl();
  function t(p, g) {
    return (p === g && (p !== 0 || 1 / p === 1 / g)) || (p !== p && g !== g);
  }
  var n = typeof Object.is == "function" ? Object.is : t,
    a = e.useState,
    u = e.useEffect,
    o = e.useLayoutEffect,
    s = e.useDebugValue;
  function f(p, g) {
    var b = g(),
      S = a({ inst: { value: b, getSnapshot: g } }),
      _ = S[0].inst,
      O = S[1];
    return (
      o(
        function () {
          ((_.value = b), (_.getSnapshot = g), d(_) && O({ inst: _ }));
        },
        [p, b, g],
      ),
      u(
        function () {
          return (
            d(_) && O({ inst: _ }),
            p(function () {
              d(_) && O({ inst: _ });
            })
          );
        },
        [p],
      ),
      s(b),
      b
    );
  }
  function d(p) {
    var g = p.getSnapshot;
    p = p.value;
    try {
      var b = g();
      return !n(p, b);
    } catch {
      return !0;
    }
  }
  function h(p, g) {
    return g();
  }
  var m =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? h
      : f;
  return (
    (sm.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : m),
    sm
  );
}
var TS;
function yz() {
  return (TS || ((TS = 1), (cm.exports = mz())), cm.exports);
}
var MS;
function pz() {
  if (MS) return om;
  MS = 1;
  var e = Tl(),
    t = yz();
  function n(h, m) {
    return (h === m && (h !== 0 || 1 / h === 1 / m)) || (h !== h && m !== m);
  }
  var a = typeof Object.is == "function" ? Object.is : n,
    u = t.useSyncExternalStore,
    o = e.useRef,
    s = e.useEffect,
    f = e.useMemo,
    d = e.useDebugValue;
  return (
    (om.useSyncExternalStoreWithSelector = function (h, m, p, g, b) {
      var S = o(null);
      if (S.current === null) {
        var _ = { hasValue: !1, value: null };
        S.current = _;
      } else _ = S.current;
      S = f(
        function () {
          function E(z) {
            if (!C) {
              if (((C = !0), (T = z), (z = g(z)), b !== void 0 && _.hasValue)) {
                var U = _.value;
                if (b(U, z)) return (D = U);
              }
              return (D = z);
            }
            if (((U = D), a(T, z))) return U;
            var V = g(z);
            return b !== void 0 && b(U, V) ? ((T = z), U) : ((T = z), (D = V));
          }
          var C = !1,
            T,
            D,
            M = p === void 0 ? null : p;
          return [
            function () {
              return E(m());
            },
            M === null
              ? void 0
              : function () {
                  return E(M());
                },
          ];
        },
        [m, p, g, b],
      );
      var O = u(h, S[0], S[1]);
      return (
        s(
          function () {
            ((_.hasValue = !0), (_.value = O));
          },
          [O],
        ),
        d(O),
        O
      );
    }),
    om
  );
}
var CS;
function gz() {
  return (CS || ((CS = 1), (um.exports = pz())), um.exports);
}
var bz = gz(),
  rp = w.createContext(null),
  xz = (e) => e,
  dt = () => {
    var e = w.useContext(rp);
    return e ? e.store.dispatch : xz;
  },
  fs = () => {},
  Sz = () => fs,
  wz = (e, t) => e === t;
function ye(e) {
  var t = w.useContext(rp),
    n = w.useMemo(
      () =>
        t
          ? (a) => {
              if (a != null) return e(a);
            }
          : fs,
      [t, e],
    );
  return bz.useSyncExternalStoreWithSelector(
    t ? t.subscription.addNestedSub : Sz,
    t ? t.store.getState : fs,
    t ? t.store.getState : fs,
    n,
    wz,
  );
}
function Oz(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function _z(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function Az(
  e,
  t = "expected all items to be functions, instead received the following types: ",
) {
  if (!e.every((n) => typeof n == "function")) {
    const n = e
      .map((a) =>
        typeof a == "function" ? `function ${a.name || "unnamed"}()` : typeof a,
      )
      .join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var DS = (e) => (Array.isArray(e) ? e : [e]);
function Ez(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    Az(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: ",
    ),
    t
  );
}
function jz(e, t) {
  const n = [],
    { length: a } = e;
  for (let u = 0; u < a; u++) n.push(e[u].apply(null, t));
  return n;
}
var Tz = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Mz = typeof WeakRef < "u" ? WeakRef : Tz,
  Cz = 0,
  NS = 1;
function Qc() {
  return { s: Cz, v: void 0, o: null, p: null };
}
function cE(e, t = {}) {
  let n = Qc();
  const { resultEqualityCheck: a } = t;
  let u,
    o = 0;
  function s() {
    let f = n;
    const { length: d } = arguments;
    for (let p = 0, g = d; p < g; p++) {
      const b = arguments[p];
      if (typeof b == "function" || (typeof b == "object" && b !== null)) {
        let S = f.o;
        S === null && (f.o = S = new WeakMap());
        const _ = S.get(b);
        _ === void 0 ? ((f = Qc()), S.set(b, f)) : (f = _);
      } else {
        let S = f.p;
        S === null && (f.p = S = new Map());
        const _ = S.get(b);
        _ === void 0 ? ((f = Qc()), S.set(b, f)) : (f = _);
      }
    }
    const h = f;
    let m;
    if (f.s === NS) m = f.v;
    else if (((m = e.apply(null, arguments)), o++, a)) {
      const p = u?.deref?.() ?? u;
      (p != null && a(p, m) && ((m = p), o !== 0 && o--),
        (u =
          (typeof m == "object" && m !== null) || typeof m == "function"
            ? new Mz(m)
            : m));
    }
    return ((h.s = NS), (h.v = m), m);
  }
  return (
    (s.clearCache = () => {
      ((n = Qc()), s.resetResultsCount());
    }),
    (s.resultsCount = () => o),
    (s.resetResultsCount = () => {
      o = 0;
    }),
    s
  );
}
function Dz(e, ...t) {
  const n = typeof e == "function" ? { memoize: e, memoizeOptions: t } : e,
    a = (...u) => {
      let o = 0,
        s = 0,
        f,
        d = {},
        h = u.pop();
      (typeof h == "object" && ((d = h), (h = u.pop())),
        Oz(
          h,
          `createSelector expects an output function after the inputs, but received: [${typeof h}]`,
        ));
      const m = { ...n, ...d },
        {
          memoize: p,
          memoizeOptions: g = [],
          argsMemoize: b = cE,
          argsMemoizeOptions: S = [],
        } = m,
        _ = DS(g),
        O = DS(S),
        E = Ez(u),
        C = p(
          function () {
            return (o++, h.apply(null, arguments));
          },
          ..._,
        ),
        T = b(
          function () {
            s++;
            const M = jz(E, arguments);
            return ((f = C.apply(null, M)), f);
          },
          ...O,
        );
      return Object.assign(T, {
        resultFunc: h,
        memoizedResultFunc: C,
        dependencies: E,
        dependencyRecomputations: () => s,
        resetDependencyRecomputations: () => {
          s = 0;
        },
        lastResult: () => f,
        recomputations: () => o,
        resetRecomputations: () => {
          o = 0;
        },
        memoize: p,
        argsMemoize: b,
      });
    };
  return (Object.assign(a, { withTypes: () => a }), a);
}
var $ = Dz(cE),
  Nz = Object.assign(
    (e, t = $) => {
      _z(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const n = Object.keys(e),
        a = n.map((o) => e[o]);
      return t(a, (...o) => o.reduce((s, f, d) => ((s[n[d]] = f), s), {}));
    },
    { withTypes: () => Nz },
  ),
  fm = {},
  dm = {},
  vm = {},
  PS;
function Pz() {
  return (
    PS ||
      ((PS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(a) {
          return typeof a == "symbol"
            ? 1
            : a === null
              ? 2
              : a === void 0
                ? 3
                : a !== a
                  ? 4
                  : 0;
        }
        const n = (a, u, o) => {
          if (a !== u) {
            const s = t(a),
              f = t(u);
            if (s === f && s === 0) {
              if (a < u) return o === "desc" ? 1 : -1;
              if (a > u) return o === "desc" ? -1 : 1;
            }
            return o === "desc" ? f - s : s - f;
          }
          return 0;
        };
        e.compareValues = n;
      })(vm)),
    vm
  );
}
var hm = {},
  mm = {},
  zS;
function sE() {
  return (
    zS ||
      ((zS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          return typeof n == "symbol" || n instanceof Symbol;
        }
        e.isSymbol = t;
      })(mm)),
    mm
  );
}
var kS;
function zz() {
  return (
    kS ||
      ((kS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = sE(),
          n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          a = /^\w*$/;
        function u(o, s) {
          return Array.isArray(o)
            ? !1
            : typeof o == "number" ||
                typeof o == "boolean" ||
                o == null ||
                t.isSymbol(o)
              ? !0
              : (typeof o == "string" && (a.test(o) || !n.test(o))) ||
                (s != null && Object.hasOwn(s, o));
        }
        e.isKey = u;
      })(hm)),
    hm
  );
}
var RS;
function kz() {
  return (
    RS ||
      ((RS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = Pz(),
          n = zz(),
          a = Jy();
        function u(o, s, f, d) {
          if (o == null) return [];
          ((f = d ? void 0 : f),
            Array.isArray(o) || (o = Object.values(o)),
            Array.isArray(s) || (s = s == null ? [null] : [s]),
            s.length === 0 && (s = [null]),
            Array.isArray(f) || (f = f == null ? [] : [f]),
            (f = f.map((b) => String(b))));
          const h = (b, S) => {
              let _ = b;
              for (let O = 0; O < S.length && _ != null; ++O) _ = _[S[O]];
              return _;
            },
            m = (b, S) =>
              S == null || b == null
                ? S
                : typeof b == "object" && "key" in b
                  ? Object.hasOwn(S, b.key)
                    ? S[b.key]
                    : h(S, b.path)
                  : typeof b == "function"
                    ? b(S)
                    : Array.isArray(b)
                      ? h(S, b)
                      : typeof S == "object"
                        ? S[b]
                        : S,
            p = s.map(
              (b) => (
                Array.isArray(b) && b.length === 1 && (b = b[0]),
                b == null ||
                typeof b == "function" ||
                Array.isArray(b) ||
                n.isKey(b)
                  ? b
                  : { key: b, path: a.toPath(b) }
              ),
            );
          return o
            .map((b) => ({ original: b, criteria: p.map((S) => m(S, b)) }))
            .slice()
            .sort((b, S) => {
              for (let _ = 0; _ < p.length; _++) {
                const O = t.compareValues(b.criteria[_], S.criteria[_], f[_]);
                if (O !== 0) return O;
              }
              return 0;
            })
            .map((b) => b.original);
        }
        e.orderBy = u;
      })(dm)),
    dm
  );
}
var ym = {},
  LS;
function Rz() {
  return (
    LS ||
      ((LS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n, a = 1) {
          const u = [],
            o = Math.floor(a),
            s = (f, d) => {
              for (let h = 0; h < f.length; h++) {
                const m = f[h];
                Array.isArray(m) && d < o ? s(m, d + 1) : u.push(m);
              }
            };
          return (s(n, 0), u);
        }
        e.flatten = t;
      })(ym)),
    ym
  );
}
var pm = {},
  US;
function fE() {
  return (
    US ||
      ((US = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = oE(),
          n = tE(),
          a = nE(),
          u = aE();
        function o(s, f, d) {
          return a.isObject(d) &&
            ((typeof f == "number" &&
              n.isArrayLike(d) &&
              t.isIndex(f) &&
              f < d.length) ||
              (typeof f == "string" && f in d))
            ? u.isEqualsSameValueZero(d[f], s)
            : !1;
        }
        e.isIterateeCall = o;
      })(pm)),
    pm
  );
}
var qS;
function Lz() {
  return (
    qS ||
      ((qS = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = kz(),
          n = Rz(),
          a = fE();
        function u(o, ...s) {
          const f = s.length;
          return (
            f > 1 && a.isIterateeCall(o, s[0], s[1])
              ? (s = [])
              : f > 2 && a.isIterateeCall(s[0], s[1], s[2]) && (s = [s[0]]),
            t.orderBy(o, n.flatten(s), ["asc"])
          );
        }
        e.sortBy = u;
      })(fm)),
    fm
  );
}
var gm, BS;
function Uz() {
  return (BS || ((BS = 1), (gm = Lz().sortBy)), gm);
}
var qz = Uz();
const xf = Pa(qz);
var dE = (e) => e.legend.settings,
  Bz = (e) => e.legend.size,
  Hz = (e) => e.legend.payload;
$([Hz, dE], (e, t) => {
  var { itemSorter: n } = t,
    a = e.flat(1);
  return n ? xf(a, n) : a;
});
var Wc = 1;
function Iz() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    [t, n] = w.useState({ height: 0, left: 0, top: 0, width: 0 }),
    a = w.useCallback(
      (u) => {
        if (u != null) {
          var o = u.getBoundingClientRect(),
            s = { height: o.height, left: o.left, top: o.top, width: o.width };
          (Math.abs(s.height - t.height) > Wc ||
            Math.abs(s.left - t.left) > Wc ||
            Math.abs(s.top - t.top) > Wc ||
            Math.abs(s.width - t.width) > Wc) &&
            n({ height: s.height, left: s.left, top: s.top, width: s.width });
        }
      },
      [t.width, t.height, t.top, t.left, ...e],
    );
  return [t, a];
}
function kt(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var $z = (typeof Symbol == "function" && Symbol.observable) || "@@observable",
  HS = $z,
  bm = () => Math.random().toString(36).substring(7).split("").join("."),
  Yz = {
    INIT: `@@redux/INIT${bm()}`,
    REPLACE: `@@redux/REPLACE${bm()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${bm()}`,
  },
  ws = Yz;
function ap(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function vE(e, t, n) {
  if (typeof e != "function") throw new Error(kt(2));
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(kt(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(kt(1));
    return n(vE)(e, t);
  }
  let a = e,
    u = t,
    o = new Map(),
    s = o,
    f = 0,
    d = !1;
  function h() {
    s === o &&
      ((s = new Map()),
      o.forEach((O, E) => {
        s.set(E, O);
      }));
  }
  function m() {
    if (d) throw new Error(kt(3));
    return u;
  }
  function p(O) {
    if (typeof O != "function") throw new Error(kt(4));
    if (d) throw new Error(kt(5));
    let E = !0;
    h();
    const C = f++;
    return (
      s.set(C, O),
      function () {
        if (E) {
          if (d) throw new Error(kt(6));
          ((E = !1), h(), s.delete(C), (o = null));
        }
      }
    );
  }
  function g(O) {
    if (!ap(O)) throw new Error(kt(7));
    if (typeof O.type > "u") throw new Error(kt(8));
    if (typeof O.type != "string") throw new Error(kt(17));
    if (d) throw new Error(kt(9));
    try {
      ((d = !0), (u = a(u, O)));
    } finally {
      d = !1;
    }
    return (
      (o = s).forEach((C) => {
        C();
      }),
      O
    );
  }
  function b(O) {
    if (typeof O != "function") throw new Error(kt(10));
    ((a = O), g({ type: ws.REPLACE }));
  }
  function S() {
    const O = p;
    return {
      subscribe(E) {
        if (typeof E != "object" || E === null) throw new Error(kt(11));
        function C() {
          const D = E;
          D.next && D.next(m());
        }
        return (C(), { unsubscribe: O(C) });
      },
      [HS]() {
        return this;
      },
    };
  }
  return (
    g({ type: ws.INIT }),
    { dispatch: g, subscribe: p, getState: m, replaceReducer: b, [HS]: S }
  );
}
function Kz(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, { type: ws.INIT }) > "u") throw new Error(kt(12));
    if (typeof n(void 0, { type: ws.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(kt(13));
  });
}
function hE(e) {
  const t = Object.keys(e),
    n = {};
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    typeof e[s] == "function" && (n[s] = e[s]);
  }
  const a = Object.keys(n);
  let u;
  try {
    Kz(n);
  } catch (o) {
    u = o;
  }
  return function (s = {}, f) {
    if (u) throw u;
    let d = !1;
    const h = {};
    for (let m = 0; m < a.length; m++) {
      const p = a[m],
        g = n[p],
        b = s[p],
        S = g(b, f);
      if (typeof S > "u") throw (f && f.type, new Error(kt(14)));
      ((h[p] = S), (d = d || S !== b));
    }
    return ((d = d || a.length !== Object.keys(s).length), d ? h : s);
  };
}
function Os(...e) {
  return e.length === 0
    ? (t) => t
    : e.length === 1
      ? e[0]
      : e.reduce(
          (t, n) =>
            (...a) =>
              t(n(...a)),
        );
}
function Gz(...e) {
  return (t) => (n, a) => {
    const u = t(n, a);
    let o = () => {
      throw new Error(kt(15));
    };
    const s = { getState: u.getState, dispatch: (d, ...h) => o(d, ...h) },
      f = e.map((d) => d(s));
    return ((o = Os(...f)(u.dispatch)), { ...u, dispatch: o });
  };
}
function mE(e) {
  return ap(e) && "type" in e && typeof e.type == "string";
}
var yE = Symbol.for("immer-nothing"),
  IS = Symbol.for("immer-draftable"),
  Zt = Symbol.for("immer-state");
function Xn(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var wn = Object,
  Ol = wn.getPrototypeOf,
  _s = "constructor",
  Sf = "prototype",
  uy = "configurable",
  As = "enumerable",
  ds = "writable",
  Wu = "value",
  Hr = (e) => !!e && !!e[Zt];
function Qn(e) {
  return e ? pE(e) || Of(e) || !!e[IS] || !!e[_s]?.[IS] || _f(e) || Af(e) : !1;
}
var Xz = wn[Sf][_s].toString(),
  $S = new WeakMap();
function pE(e) {
  if (!e || !ip(e)) return !1;
  const t = Ol(e);
  if (t === null || t === wn[Sf]) return !0;
  const n = wn.hasOwnProperty.call(t, _s) && t[_s];
  if (n === Object) return !0;
  if (!yl(n)) return !1;
  let a = $S.get(n);
  return (
    a === void 0 && ((a = Function.toString.call(n)), $S.set(n, a)),
    a === Xz
  );
}
function wf(e, t, n = !0) {
  mo(e) === 0
    ? (n ? Reflect.ownKeys(e) : wn.keys(e)).forEach((u) => {
        t(u, e[u], e);
      })
    : e.forEach((a, u) => t(u, a, e));
}
function mo(e) {
  const t = e[Zt];
  return t ? t.type_ : Of(e) ? 1 : _f(e) ? 2 : Af(e) ? 3 : 0;
}
var YS = (e, t, n = mo(e)) =>
    n === 2 ? e.has(t) : wn[Sf].hasOwnProperty.call(e, t),
  oy = (e, t, n = mo(e)) => (n === 2 ? e.get(t) : e[t]),
  Es = (e, t, n, a = mo(e)) => {
    a === 2 ? e.set(t, n) : a === 3 ? e.add(n) : (e[t] = n);
  };
function Vz(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var Of = Array.isArray,
  _f = (e) => e instanceof Map,
  Af = (e) => e instanceof Set,
  ip = (e) => typeof e == "object",
  yl = (e) => typeof e == "function",
  xm = (e) => typeof e == "boolean";
function Zz(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Pr = (e) => e.copy_ || e.base_,
  lp = (e) => (e.modified_ ? e.copy_ : e.base_);
function cy(e, t) {
  if (_f(e)) return new Map(e);
  if (Af(e)) return new Set(e);
  if (Of(e)) return Array[Sf].slice.call(e);
  const n = pE(e);
  if (t === !0 || (t === "class_only" && !n)) {
    const a = wn.getOwnPropertyDescriptors(e);
    delete a[Zt];
    let u = Reflect.ownKeys(a);
    for (let o = 0; o < u.length; o++) {
      const s = u[o],
        f = a[s];
      (f[ds] === !1 && ((f[ds] = !0), (f[uy] = !0)),
        (f.get || f.set) &&
          (a[s] = { [uy]: !0, [ds]: !0, [As]: f[As], [Wu]: e[s] }));
    }
    return wn.create(Ol(e), a);
  } else {
    const a = Ol(e);
    if (a !== null && n) return { ...e };
    const u = wn.create(a);
    return wn.assign(u, e);
  }
}
function up(e, t = !1) {
  return (
    Ef(e) ||
      Hr(e) ||
      !Qn(e) ||
      (mo(e) > 1 &&
        wn.defineProperties(e, { set: Fc, add: Fc, clear: Fc, delete: Fc }),
      wn.freeze(e),
      t &&
        wf(
          e,
          (n, a) => {
            up(a, !0);
          },
          !1,
        )),
    e
  );
}
function Qz() {
  Xn(2);
}
var Fc = { [Wu]: Qz };
function Ef(e) {
  return e === null || !ip(e) ? !0 : wn.isFrozen(e);
}
var js = "MapSet",
  sy = "Patches",
  KS = "ArrayMethods",
  gE = {};
function pi(e) {
  const t = gE[e];
  return (t || Xn(0, e), t);
}
var GS = (e) => !!gE[e],
  Fu,
  bE = () => Fu,
  Wz = (e, t) => ({
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
    handledSet_: new Set(),
    processedForPatches_: new Set(),
    mapSetPlugin_: GS(js) ? pi(js) : void 0,
    arrayMethodsPlugin_: GS(KS) ? pi(KS) : void 0,
  });
function XS(e, t) {
  t &&
    ((e.patchPlugin_ = pi(sy)),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function fy(e) {
  (dy(e), e.drafts_.forEach(Fz), (e.drafts_ = null));
}
function dy(e) {
  e === Fu && (Fu = e.parent_);
}
var VS = (e) => (Fu = Wz(Fu, e));
function Fz(e) {
  const t = e[Zt];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function ZS(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  if (e !== void 0 && e !== n) {
    (n[Zt].modified_ && (fy(t), Xn(4)), Qn(e) && (e = QS(t, e)));
    const { patchPlugin_: u } = t;
    u && u.generateReplacementPatches_(n[Zt].base_, e, t);
  } else e = QS(t, n);
  return (
    Jz(t, e, !0),
    fy(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== yE ? e : void 0
  );
}
function QS(e, t) {
  if (Ef(t)) return t;
  const n = t[Zt];
  if (!n) return Ts(t, e.handledSet_, e);
  if (!jf(n, e)) return t;
  if (!n.modified_) return n.base_;
  if (!n.finalized_) {
    const { callbacks_: a } = n;
    if (a) for (; a.length > 0; ) a.pop()(e);
    wE(n, e);
  }
  return n.copy_;
}
function Jz(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && up(t, n);
}
function xE(e) {
  ((e.finalized_ = !0), e.scope_.unfinalizedDrafts_--);
}
var jf = (e, t) => e.scope_ === t,
  ek = [];
function SE(e, t, n, a) {
  const u = Pr(e),
    o = e.type_;
  if (a !== void 0 && oy(u, a, o) === t) {
    Es(u, a, n, o);
    return;
  }
  if (!e.draftLocations_) {
    const f = (e.draftLocations_ = new Map());
    wf(u, (d, h) => {
      if (Hr(h)) {
        const m = f.get(h) || [];
        (m.push(d), f.set(h, m));
      }
    });
  }
  const s = e.draftLocations_.get(t) ?? ek;
  for (const f of s) Es(u, f, n, o);
}
function tk(e, t, n) {
  e.callbacks_.push(function (u) {
    const o = t;
    if (!o || !jf(o, u)) return;
    u.mapSetPlugin_?.fixSetContents(o);
    const s = lp(o);
    (SE(e, o.draft_ ?? o, s, n), wE(o, u));
  });
}
function wE(e, t) {
  if (
    e.modified_ &&
    !e.finalized_ &&
    (e.type_ === 3 ||
      (e.type_ === 1 && e.allIndicesReassigned_) ||
      (e.assigned_?.size ?? 0) > 0)
  ) {
    const { patchPlugin_: a } = t;
    if (a) {
      const u = a.getPath(e);
      u && a.generatePatches_(e, u, t);
    }
    xE(e);
  }
}
function nk(e, t, n) {
  const { scope_: a } = e;
  if (Hr(n)) {
    const u = n[Zt];
    jf(u, a) &&
      u.callbacks_.push(function () {
        vs(e);
        const s = lp(u);
        SE(e, n, s, t);
      });
  } else
    Qn(n) &&
      e.callbacks_.push(function () {
        const o = Pr(e);
        e.type_ === 3
          ? o.has(n) && Ts(n, a.handledSet_, a)
          : oy(o, t, e.type_) === n &&
            a.drafts_.length > 1 &&
            (e.assigned_.get(t) ?? !1) === !0 &&
            e.copy_ &&
            Ts(oy(e.copy_, t, e.type_), a.handledSet_, a);
      });
}
function Ts(e, t, n) {
  return (
    (!n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1) ||
      Hr(e) ||
      t.has(e) ||
      !Qn(e) ||
      Ef(e) ||
      (t.add(e),
      wf(e, (a, u) => {
        if (Hr(u)) {
          const o = u[Zt];
          if (jf(o, n)) {
            const s = lp(o);
            (Es(e, a, s, e.type_), xE(o));
          }
        } else Qn(u) && Ts(u, t, n);
      })),
    e
  );
}
function rk(e, t) {
  const n = Of(e),
    a = {
      type_: n ? 1 : 0,
      scope_: t ? t.scope_ : bE(),
      modified_: !1,
      finalized_: !1,
      assigned_: void 0,
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
      callbacks_: void 0,
    };
  let u = a,
    o = Ms;
  n && ((u = [a]), (o = Ju));
  const { revoke: s, proxy: f } = Proxy.revocable(u, o);
  return ((a.draft_ = f), (a.revoke_ = s), [f, a]);
}
var Ms = {
    get(e, t) {
      if (t === Zt) return e;
      let n = e.scope_.arrayMethodsPlugin_;
      const a = e.type_ === 1 && typeof t == "string";
      if (a && n?.isArrayOperationMethod(t))
        return n.createMethodInterceptor(e, t);
      const u = Pr(e);
      if (!YS(u, t, e.type_)) return ak(e, u, t);
      const o = u[t];
      if (
        e.finalized_ ||
        !Qn(o) ||
        (a &&
          e.operationMethod &&
          n?.isMutatingArrayMethod(e.operationMethod) &&
          Zz(t))
      )
        return o;
      if (o === Sm(e.base_, t)) {
        vs(e);
        const s = e.type_ === 1 ? +t : t,
          f = hy(e.scope_, o, e, s);
        return (e.copy_[s] = f);
      }
      return o;
    },
    has(e, t) {
      return t in Pr(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Pr(e));
    },
    set(e, t, n) {
      const a = OE(Pr(e), t);
      if (a?.set) return (a.set.call(e.draft_, n), !0);
      if (!e.modified_) {
        const u = Sm(Pr(e), t),
          o = u?.[Zt];
        if (o && o.base_ === n)
          return ((e.copy_[t] = n), e.assigned_.set(t, !1), !0);
        if (Vz(n, u) && (n !== void 0 || YS(e.base_, t, e.type_))) return !0;
        (vs(e), vy(e));
      }
      return (
        (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), e.assigned_.set(t, !0), nk(e, t, n)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        vs(e),
        Sm(e.base_, t) !== void 0 || t in e.base_
          ? (e.assigned_.set(t, !1), vy(e))
          : e.assigned_.delete(t),
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = Pr(e),
        a = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        a && {
          [ds]: !0,
          [uy]: e.type_ !== 1 || t !== "length",
          [As]: a[As],
          [Wu]: n[t],
        }
      );
    },
    defineProperty() {
      Xn(11);
    },
    getPrototypeOf(e) {
      return Ol(e.base_);
    },
    setPrototypeOf() {
      Xn(12);
    },
  },
  Ju = {};
for (let e in Ms) {
  let t = Ms[e];
  Ju[e] = function () {
    const n = arguments;
    return ((n[0] = n[0][0]), t.apply(this, n));
  };
}
Ju.deleteProperty = function (e, t) {
  return Ju.set.call(this, e, t, void 0);
};
Ju.set = function (e, t, n) {
  return Ms.set.call(this, e[0], t, n, e[0]);
};
function Sm(e, t) {
  const n = e[Zt];
  return (n ? Pr(n) : e)[t];
}
function ak(e, t, n) {
  const a = OE(t, n);
  return a ? (Wu in a ? a[Wu] : a.get?.call(e.draft_)) : void 0;
}
function OE(e, t) {
  if (!(t in e)) return;
  let n = Ol(e);
  for (; n; ) {
    const a = Object.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = Ol(n);
  }
}
function vy(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && vy(e.parent_));
}
function vs(e) {
  e.copy_ ||
    ((e.assigned_ = new Map()),
    (e.copy_ = cy(e.base_, e.scope_.immer_.useStrictShallowCopy_)));
}
var ik = class {
  constructor(t) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.useStrictIteration_ = !1),
      (this.produce = (n, a, u) => {
        if (yl(n) && !yl(a)) {
          const s = a;
          a = n;
          const f = this;
          return function (h = s, ...m) {
            return f.produce(h, (p) => a.call(this, p, ...m));
          };
        }
        (yl(a) || Xn(6), u !== void 0 && !yl(u) && Xn(7));
        let o;
        if (Qn(n)) {
          const s = VS(this),
            f = hy(s, n, void 0);
          let d = !0;
          try {
            ((o = a(f)), (d = !1));
          } finally {
            d ? fy(s) : dy(s);
          }
          return (XS(s, u), ZS(o, s));
        } else if (!n || !ip(n)) {
          if (
            ((o = a(n)),
            o === void 0 && (o = n),
            o === yE && (o = void 0),
            this.autoFreeze_ && up(o, !0),
            u)
          ) {
            const s = [],
              f = [];
            (pi(sy).generateReplacementPatches_(n, o, {
              patches_: s,
              inversePatches_: f,
            }),
              u(s, f));
          }
          return o;
        } else Xn(1, n);
      }),
      (this.produceWithPatches = (n, a) => {
        if (yl(n))
          return (f, ...d) => this.produceWithPatches(f, (h) => n(h, ...d));
        let u, o;
        return [
          this.produce(n, a, (f, d) => {
            ((u = f), (o = d));
          }),
          u,
          o,
        ];
      }),
      xm(t?.autoFreeze) && this.setAutoFreeze(t.autoFreeze),
      xm(t?.useStrictShallowCopy) &&
        this.setUseStrictShallowCopy(t.useStrictShallowCopy),
      xm(t?.useStrictIteration) &&
        this.setUseStrictIteration(t.useStrictIteration));
  }
  createDraft(t) {
    (Qn(t) || Xn(8), Hr(t) && (t = Bn(t)));
    const n = VS(this),
      a = hy(n, t, void 0);
    return ((a[Zt].isManual_ = !0), dy(n), a);
  }
  finishDraft(t, n) {
    const a = t && t[Zt];
    (!a || !a.isManual_) && Xn(9);
    const { scope_: u } = a;
    return (XS(u, n), ZS(void 0, u));
  }
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  setUseStrictIteration(t) {
    this.useStrictIteration_ = t;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(t, n) {
    let a;
    for (a = n.length - 1; a >= 0; a--) {
      const o = n[a];
      if (o.path.length === 0 && o.op === "replace") {
        t = o.value;
        break;
      }
    }
    a > -1 && (n = n.slice(a + 1));
    const u = pi(sy).applyPatches_;
    return Hr(t) ? u(t, n) : this.produce(t, (o) => u(o, n));
  }
};
function hy(e, t, n, a) {
  const [u, o] = _f(t)
    ? pi(js).proxyMap_(t, n)
    : Af(t)
      ? pi(js).proxySet_(t, n)
      : rk(t, n);
  return (
    (n?.scope_ ?? bE()).drafts_.push(u),
    (o.callbacks_ = n?.callbacks_ ?? []),
    (o.key_ = a),
    n && a !== void 0
      ? tk(n, o, a)
      : o.callbacks_.push(function (d) {
          d.mapSetPlugin_?.fixSetContents(o);
          const { patchPlugin_: h } = d;
          o.modified_ && h && h.generatePatches_(o, [], d);
        }),
    u
  );
}
function Bn(e) {
  return (Hr(e) || Xn(10, e), _E(e));
}
function _E(e) {
  if (!Qn(e) || Ef(e)) return e;
  const t = e[Zt];
  let n,
    a = !0;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0),
      (n = cy(e, t.scope_.immer_.useStrictShallowCopy_)),
      (a = t.scope_.immer_.shouldUseStrictIteration()));
  } else n = cy(e, !0);
  return (
    wf(
      n,
      (u, o) => {
        Es(n, u, _E(o));
      },
      a,
    ),
    t && (t.finalized_ = !1),
    n
  );
}
var lk = new ik(),
  AE = lk.produce;
function EE(e) {
  return ({ dispatch: n, getState: a }) =>
    (u) =>
    (o) =>
      typeof o == "function" ? o(n, a, e) : u(o);
}
var uk = EE(),
  ok = EE,
  ck =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? Os
              : Os.apply(null, arguments);
        };
function _n(e, t) {
  function n(...a) {
    if (t) {
      let u = t(...a);
      if (!u) throw new Error(On(0));
      return {
        type: e,
        payload: u.payload,
        ...("meta" in u && { meta: u.meta }),
        ...("error" in u && { error: u.error }),
      };
    }
    return { type: e, payload: a[0] };
  }
  return (
    (n.toString = () => `${e}`),
    (n.type = e),
    (n.match = (a) => mE(a) && a.type === e),
    n
  );
}
var jE = class Ku extends Array {
  constructor(...t) {
    (super(...t), Object.setPrototypeOf(this, Ku.prototype));
  }
  static get [Symbol.species]() {
    return Ku;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0])
      ? new Ku(...t[0].concat(this))
      : new Ku(...t.concat(this));
  }
};
function WS(e) {
  return Qn(e) ? AE(e, () => {}) : e;
}
function Jc(e, t, n) {
  return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function sk(e) {
  return typeof e == "boolean";
}
var fk = () =>
    function (t) {
      const {
        thunk: n = !0,
        immutableCheck: a = !0,
        serializableCheck: u = !0,
        actionCreatorCheck: o = !0,
      } = t ?? {};
      let s = new jE();
      return (n && (sk(n) ? s.push(uk) : s.push(ok(n.extraArgument))), s);
    },
  TE = "RTK_autoBatch",
  Qe = () => (e) => ({ payload: e, meta: { [TE]: !0 } }),
  FS = (e) => (t) => {
    setTimeout(t, e);
  },
  ME =
    (e = { type: "raf" }) =>
    (t) =>
    (...n) => {
      const a = t(...n);
      let u = !0,
        o = !1,
        s = !1;
      const f = new Set(),
        d =
          e.type === "tick"
            ? queueMicrotask
            : e.type === "raf"
              ? typeof window < "u" && window.requestAnimationFrame
                ? window.requestAnimationFrame
                : FS(10)
              : e.type === "callback"
                ? e.queueNotification
                : FS(e.timeout),
        h = () => {
          ((s = !1), o && ((o = !1), f.forEach((m) => m())));
        };
      return Object.assign({}, a, {
        subscribe(m) {
          const p = () => u && m(),
            g = a.subscribe(p);
          return (
            f.add(m),
            () => {
              (g(), f.delete(m));
            }
          );
        },
        dispatch(m) {
          try {
            return (
              (u = !m?.meta?.[TE]),
              (o = !u),
              o && (s || ((s = !0), d(h))),
              a.dispatch(m)
            );
          } finally {
            u = !0;
          }
        },
      });
    },
  dk = (e) =>
    function (n) {
      const { autoBatch: a = !0 } = n ?? {};
      let u = new jE(e);
      return (a && u.push(ME(typeof a == "object" ? a : void 0)), u);
    };
function vk(e) {
  const t = fk(),
    {
      reducer: n = void 0,
      middleware: a,
      devTools: u = !0,
      preloadedState: o = void 0,
      enhancers: s = void 0,
    } = e || {};
  let f;
  if (typeof n == "function") f = n;
  else if (ap(n)) f = hE(n);
  else throw new Error(On(1));
  let d;
  typeof a == "function" ? (d = a(t)) : (d = t());
  let h = Os;
  u && (h = ck({ trace: !1, ...(typeof u == "object" && u) }));
  const m = Gz(...d),
    p = dk(m);
  let g = typeof s == "function" ? s(p) : p();
  const b = h(...g);
  return vE(f, o, b);
}
function CE(e) {
  const t = {},
    n = [];
  let a;
  const u = {
    addCase(o, s) {
      const f = typeof o == "string" ? o : o.type;
      if (!f) throw new Error(On(28));
      if (f in t) throw new Error(On(29));
      return ((t[f] = s), u);
    },
    addAsyncThunk(o, s) {
      return (
        s.pending && (t[o.pending.type] = s.pending),
        s.rejected && (t[o.rejected.type] = s.rejected),
        s.fulfilled && (t[o.fulfilled.type] = s.fulfilled),
        s.settled && n.push({ matcher: o.settled, reducer: s.settled }),
        u
      );
    },
    addMatcher(o, s) {
      return (n.push({ matcher: o, reducer: s }), u);
    },
    addDefaultCase(o) {
      return ((a = o), u);
    },
  };
  return (e(u), [t, n, a]);
}
function hk(e) {
  return typeof e == "function";
}
function mk(e, t) {
  let [n, a, u] = CE(t),
    o;
  if (hk(e)) o = () => WS(e());
  else {
    const f = WS(e);
    o = () => f;
  }
  function s(f = o(), d) {
    let h = [
      n[d.type],
      ...a.filter(({ matcher: m }) => m(d)).map(({ reducer: m }) => m),
    ];
    return (
      h.filter((m) => !!m).length === 0 && (h = [u]),
      h.reduce((m, p) => {
        if (p)
          if (Hr(m)) {
            const b = p(m, d);
            return b === void 0 ? m : b;
          } else {
            if (Qn(m)) return AE(m, (g) => p(g, d));
            {
              const g = p(m, d);
              if (g === void 0) {
                if (m === null) return m;
                throw Error(
                  "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return g;
            }
          }
        return m;
      }, f)
    );
  }
  return ((s.getInitialState = o), s);
}
var yk = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  pk = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += yk[(Math.random() * 64) | 0];
    return t;
  },
  gk = Symbol.for("rtk-slice-createasyncthunk");
function bk(e, t) {
  return `${e}/${t}`;
}
function xk({ creators: e } = {}) {
  const t = e?.asyncThunk?.[gk];
  return function (a) {
    const { name: u, reducerPath: o = u } = a;
    if (!u) throw new Error(On(11));
    const s =
        (typeof a.reducers == "function" ? a.reducers(wk()) : a.reducers) || {},
      f = Object.keys(s),
      d = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      h = {
        addCase(T, D) {
          const M = typeof T == "string" ? T : T.type;
          if (!M) throw new Error(On(12));
          if (M in d.sliceCaseReducersByType) throw new Error(On(13));
          return ((d.sliceCaseReducersByType[M] = D), h);
        },
        addMatcher(T, D) {
          return (d.sliceMatchers.push({ matcher: T, reducer: D }), h);
        },
        exposeAction(T, D) {
          return ((d.actionCreators[T] = D), h);
        },
        exposeCaseReducer(T, D) {
          return ((d.sliceCaseReducersByName[T] = D), h);
        },
      };
    f.forEach((T) => {
      const D = s[T],
        M = {
          reducerName: T,
          type: bk(u, T),
          createNotation: typeof a.reducers == "function",
        };
      _k(D) ? Ek(M, D, h, t) : Ok(M, D, h);
    });
    function m() {
      const [T = {}, D = [], M = void 0] =
          typeof a.extraReducers == "function"
            ? CE(a.extraReducers)
            : [a.extraReducers],
        z = { ...T, ...d.sliceCaseReducersByType };
      return mk(a.initialState, (U) => {
        for (let V in z) U.addCase(V, z[V]);
        for (let V of d.sliceMatchers) U.addMatcher(V.matcher, V.reducer);
        for (let V of D) U.addMatcher(V.matcher, V.reducer);
        M && U.addDefaultCase(M);
      });
    }
    const p = (T) => T,
      g = new Map(),
      b = new WeakMap();
    let S;
    function _(T, D) {
      return (S || (S = m()), S(T, D));
    }
    function O() {
      return (S || (S = m()), S.getInitialState());
    }
    function E(T, D = !1) {
      function M(U) {
        let V = U[T];
        return (typeof V > "u" && D && (V = Jc(b, M, O)), V);
      }
      function z(U = p) {
        const V = Jc(g, D, () => new WeakMap());
        return Jc(V, U, () => {
          const F = {};
          for (const [ae, ne] of Object.entries(a.selectors ?? {}))
            F[ae] = Sk(ne, U, () => Jc(b, U, O), D);
          return F;
        });
      }
      return {
        reducerPath: T,
        getSelectors: z,
        get selectors() {
          return z(M);
        },
        selectSlice: M,
      };
    }
    const C = {
      name: u,
      reducer: _,
      actions: d.actionCreators,
      caseReducers: d.sliceCaseReducersByName,
      getInitialState: O,
      ...E(o),
      injectInto(T, { reducerPath: D, ...M } = {}) {
        const z = D ?? o;
        return (
          T.inject({ reducerPath: z, reducer: _ }, M),
          { ...C, ...E(z, !0) }
        );
      },
    };
    return C;
  };
}
function Sk(e, t, n, a) {
  function u(o, ...s) {
    let f = t(o);
    return (typeof f > "u" && a && (f = n()), e(f, ...s));
  }
  return ((u.unwrapped = e), u);
}
var Yt = xk();
function wk() {
  function e(t, n) {
    return { _reducerDefinitionType: "asyncThunk", payloadCreator: t, ...n };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(t) {
        return Object.assign(
          {
            [t.name](...n) {
              return t(...n);
            },
          }[t.name],
          { _reducerDefinitionType: "reducer" },
        );
      },
      preparedReducer(t, n) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: t,
          reducer: n,
        };
      },
      asyncThunk: e,
    }
  );
}
function Ok({ type: e, reducerName: t, createNotation: n }, a, u) {
  let o, s;
  if ("reducer" in a) {
    if (n && !Ak(a)) throw new Error(On(17));
    ((o = a.reducer), (s = a.prepare));
  } else o = a;
  u.addCase(e, o)
    .exposeCaseReducer(t, o)
    .exposeAction(t, s ? _n(e, s) : _n(e));
}
function _k(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Ak(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Ek({ type: e, reducerName: t }, n, a, u) {
  if (!u) throw new Error(On(18));
  const {
      payloadCreator: o,
      fulfilled: s,
      pending: f,
      rejected: d,
      settled: h,
      options: m,
    } = n,
    p = u(e, o, m);
  (a.exposeAction(t, p),
    s && a.addCase(p.fulfilled, s),
    f && a.addCase(p.pending, f),
    d && a.addCase(p.rejected, d),
    h && a.addMatcher(p.settled, h),
    a.exposeCaseReducer(t, {
      fulfilled: s || es,
      pending: f || es,
      rejected: d || es,
      settled: h || es,
    }));
}
function es() {}
var jk = "task",
  DE = "listener",
  NE = "completed",
  op = "cancelled",
  Tk = `task-${op}`,
  Mk = `task-${NE}`,
  my = `${DE}-${op}`,
  Ck = `${DE}-${NE}`,
  Tf = class {
    constructor(e) {
      ((this.code = e), (this.message = `${jk} ${op} (reason: ${e})`));
    }
    name = "TaskAbortError";
    message;
  },
  cp = (e, t) => {
    if (typeof e != "function") throw new TypeError(On(32));
  },
  Cs = () => {},
  PE = (e, t = Cs) => (e.catch(t), e),
  zE = (e, t) => (
    e.addEventListener("abort", t, { once: !0 }),
    () => e.removeEventListener("abort", t)
  ),
  di = (e) => {
    if (e.aborted) throw new Tf(e.reason);
  };
function kE(e, t) {
  let n = Cs;
  return new Promise((a, u) => {
    const o = () => u(new Tf(e.reason));
    if (e.aborted) {
      o();
      return;
    }
    ((n = zE(e, o)), t.finally(() => n()).then(a, u));
  }).finally(() => {
    n = Cs;
  });
}
var Dk = async (e, t) => {
    try {
      return (await Promise.resolve(), { status: "ok", value: await e() });
    } catch (n) {
      return { status: n instanceof Tf ? "cancelled" : "rejected", error: n };
    } finally {
      t?.();
    }
  },
  Ds = (e) => (t) => PE(kE(e, t).then((n) => (di(e), n))),
  RE = (e) => {
    const t = Ds(e);
    return (n) => t(new Promise((a) => setTimeout(a, n)));
  },
  { assign: xl } = Object,
  JS = {},
  Mf = "listenerMiddleware",
  Nk = (e, t) => {
    const n = (a) => zE(e, () => a.abort(e.reason));
    return (a, u) => {
      cp(a);
      const o = new AbortController();
      n(o);
      const s = Dk(
        async () => {
          (di(e), di(o.signal));
          const f = await a({
            pause: Ds(o.signal),
            delay: RE(o.signal),
            signal: o.signal,
          });
          return (di(o.signal), f);
        },
        () => o.abort(Mk),
      );
      return (
        u?.autoJoin && t.push(s.catch(Cs)),
        {
          result: Ds(e)(s),
          cancel() {
            o.abort(Tk);
          },
        }
      );
    };
  },
  Pk = (e, t) => {
    const n = async (a, u) => {
      di(t);
      let o = () => {};
      const f = [
        new Promise((d, h) => {
          let m = e({
            predicate: a,
            effect: (p, g) => {
              (g.unsubscribe(), d([p, g.getState(), g.getOriginalState()]));
            },
          });
          o = () => {
            (m(), h());
          };
        }),
      ];
      u != null && f.push(new Promise((d) => setTimeout(d, u, null)));
      try {
        const d = await kE(t, Promise.race(f));
        return (di(t), d);
      } finally {
        o();
      }
    };
    return (a, u) => PE(n(a, u));
  },
  LE = (e) => {
    let { type: t, actionCreator: n, matcher: a, predicate: u, effect: o } = e;
    if (t) u = _n(t).match;
    else if (n) ((t = n.type), (u = n.match));
    else if (a) u = a;
    else if (!u) throw new Error(On(21));
    return (cp(o), { predicate: u, type: t, effect: o });
  },
  UE = xl(
    (e) => {
      const { type: t, predicate: n, effect: a } = LE(e);
      return {
        id: pk(),
        effect: a,
        type: t,
        predicate: n,
        pending: new Set(),
        unsubscribe: () => {
          throw new Error(On(22));
        },
      };
    },
    { withTypes: () => UE },
  ),
  ew = (e, t) => {
    const { type: n, effect: a, predicate: u } = LE(t);
    return Array.from(e.values()).find(
      (o) =>
        (typeof n == "string" ? o.type === n : o.predicate === u) &&
        o.effect === a,
    );
  },
  yy = (e) => {
    e.pending.forEach((t) => {
      t.abort(my);
    });
  },
  zk = (e, t) => () => {
    for (const n of t.keys()) yy(n);
    e.clear();
  },
  tw = (e, t, n) => {
    try {
      e(t, n);
    } catch (a) {
      setTimeout(() => {
        throw a;
      }, 0);
    }
  },
  qE = xl(_n(`${Mf}/add`), { withTypes: () => qE }),
  kk = _n(`${Mf}/removeAll`),
  BE = xl(_n(`${Mf}/remove`), { withTypes: () => BE }),
  Rk = (...e) => {
    console.error(`${Mf}/error`, ...e);
  },
  yo = (e = {}) => {
    const t = new Map(),
      n = new Map(),
      a = (b) => {
        const S = n.get(b) ?? 0;
        n.set(b, S + 1);
      },
      u = (b) => {
        const S = n.get(b) ?? 1;
        S === 1 ? n.delete(b) : n.set(b, S - 1);
      },
      { extra: o, onError: s = Rk } = e;
    cp(s);
    const f = (b) => (
        (b.unsubscribe = () => t.delete(b.id)),
        t.set(b.id, b),
        (S) => {
          (b.unsubscribe(), S?.cancelActive && yy(b));
        }
      ),
      d = (b) => {
        const S = ew(t, b) ?? UE(b);
        return f(S);
      };
    xl(d, { withTypes: () => d });
    const h = (b) => {
      const S = ew(t, b);
      return (S && (S.unsubscribe(), b.cancelActive && yy(S)), !!S);
    };
    xl(h, { withTypes: () => h });
    const m = async (b, S, _, O) => {
        const E = new AbortController(),
          C = Pk(d, E.signal),
          T = [];
        try {
          (b.pending.add(E),
            a(b),
            await Promise.resolve(
              b.effect(
                S,
                xl({}, _, {
                  getOriginalState: O,
                  condition: (D, M) => C(D, M).then(Boolean),
                  take: C,
                  delay: RE(E.signal),
                  pause: Ds(E.signal),
                  extra: o,
                  signal: E.signal,
                  fork: Nk(E.signal, T),
                  unsubscribe: b.unsubscribe,
                  subscribe: () => {
                    t.set(b.id, b);
                  },
                  cancelActiveListeners: () => {
                    b.pending.forEach((D, M, z) => {
                      D !== E && (D.abort(my), z.delete(D));
                    });
                  },
                  cancel: () => {
                    (E.abort(my), b.pending.delete(E));
                  },
                  throwIfCancelled: () => {
                    di(E.signal);
                  },
                }),
              ),
            ));
        } catch (D) {
          D instanceof Tf || tw(s, D, { raisedBy: "effect" });
        } finally {
          (await Promise.all(T), E.abort(Ck), u(b), b.pending.delete(E));
        }
      },
      p = zk(t, n);
    return {
      middleware: (b) => (S) => (_) => {
        if (!mE(_)) return S(_);
        if (qE.match(_)) return d(_.payload);
        if (kk.match(_)) {
          p();
          return;
        }
        if (BE.match(_)) return h(_.payload);
        let O = b.getState();
        const E = () => {
          if (O === JS) throw new Error(On(23));
          return O;
        };
        let C;
        try {
          if (((C = S(_)), t.size > 0)) {
            const T = b.getState(),
              D = Array.from(t.values());
            for (const M of D) {
              let z = !1;
              try {
                z = M.predicate(_, T, O);
              } catch (U) {
                ((z = !1), tw(s, U, { raisedBy: "predicate" }));
              }
              z && m(M, _, b, E);
            }
          }
        } finally {
          O = JS;
        }
        return C;
      },
      startListening: d,
      stopListening: h,
      clearListeners: p,
    };
  };
function On(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Lk = {
    layoutType: "horizontal",
    width: 0,
    height: 0,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    scale: 1,
  },
  HE = Yt({
    name: "chartLayout",
    initialState: Lk,
    reducers: {
      setLayout(e, t) {
        e.layoutType = t.payload;
      },
      setChartSize(e, t) {
        ((e.width = t.payload.width), (e.height = t.payload.height));
      },
      setMargin(e, t) {
        var n, a, u, o;
        ((e.margin.top = (n = t.payload.top) !== null && n !== void 0 ? n : 0),
          (e.margin.right =
            (a = t.payload.right) !== null && a !== void 0 ? a : 0),
          (e.margin.bottom =
            (u = t.payload.bottom) !== null && u !== void 0 ? u : 0),
          (e.margin.left =
            (o = t.payload.left) !== null && o !== void 0 ? o : 0));
      },
      setScale(e, t) {
        e.scale = t.payload;
      },
    },
  }),
  { setMargin: Uk, setLayout: qk, setChartSize: Bk, setScale: Hk } = HE.actions,
  Ik = HE.reducer;
function IE(e, t, n) {
  return Array.isArray(e) && e && t + n !== 0 ? e.slice(t, n + 1) : e;
}
function ke(e) {
  return Number.isFinite(e);
}
function dr(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function nw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function pl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? nw(Object(n), !0).forEach(function (a) {
          $k(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : nw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function $k(e, t, n) {
  return (
    (t = Yk(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Yk(e) {
  var t = Kk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Kk(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function qt(e, t, n) {
  return Ot(e) || Ot(t)
    ? n
    : fr(t)
      ? bf(e, t, n)
      : typeof t == "function"
        ? t(e)
        : n;
}
var Gk = (e, t, n) => {
    if (t && n) {
      var { width: a, height: u } = n,
        { align: o, verticalAlign: s, layout: f } = t;
      if (
        (f === "vertical" || (f === "horizontal" && s === "middle")) &&
        o !== "center" &&
        ve(e[o])
      )
        return pl(pl({}, e), {}, { [o]: e[o] + (a || 0) });
      if (
        (f === "horizontal" || (f === "vertical" && o === "center")) &&
        s !== "middle" &&
        ve(e[s])
      )
        return pl(pl({}, e), {}, { [s]: e[s] + (u || 0) });
    }
    return e;
  },
  Gr = (e, t) =>
    (e === "horizontal" && t === "xAxis") ||
    (e === "vertical" && t === "yAxis") ||
    (e === "centric" && t === "angleAxis") ||
    (e === "radial" && t === "radiusAxis"),
  $E = (e, t, n, a) => {
    if (a) return e.map((f) => f.coordinate);
    var u,
      o,
      s = e.map(
        (f) => (
          f.coordinate === t && (u = !0),
          f.coordinate === n && (o = !0),
          f.coordinate
        ),
      );
    return (u || s.push(t), o || s.push(n), s);
  },
  YE = (e, t, n) => {
    if (!e) return null;
    var {
      duplicateDomain: a,
      type: u,
      range: o,
      scale: s,
      realScaleType: f,
      isCategorical: d,
      categoricalDomain: h,
      tickCount: m,
      ticks: p,
      niceTicks: g,
      axisType: b,
    } = e;
    if (!s) return null;
    var S = f === "scaleBand" && s.bandwidth ? s.bandwidth() / 2 : 2,
      _ = u === "category" && s.bandwidth ? s.bandwidth() / S : 0;
    if (
      ((_ =
        b === "angleAxis" && o && o.length >= 2 ? qn(o[0] - o[1]) * 2 * _ : _),
      p || g)
    ) {
      var O = (p || g || [])
        .map((E, C) => {
          var T = a ? a.indexOf(E) : E,
            D = s.map(T);
          return ke(D)
            ? { coordinate: D + _, value: E, offset: _, index: C }
            : null;
        })
        .filter(ln);
      return O;
    }
    return d && h
      ? h
          .map((E, C) => {
            var T = s.map(E);
            return ke(T)
              ? { coordinate: T + _, value: E, index: C, offset: _ }
              : null;
          })
          .filter(ln)
      : s.ticks && m != null
        ? s
            .ticks(m)
            .map((E, C) => {
              var T = s.map(E);
              return ke(T)
                ? { coordinate: T + _, value: E, index: C, offset: _ }
                : null;
            })
            .filter(ln)
        : s
            .domain()
            .map((E, C) => {
              var T = s.map(E);
              return ke(T)
                ? {
                    coordinate: T + _,
                    value: a ? a[E] : E,
                    index: C,
                    offset: _,
                  }
                : null;
            })
            .filter(ln);
  },
  Xk = (e) => {
    var t,
      n = e.length;
    if (!(n <= 0)) {
      var a = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
      if (!(a == null || a <= 0))
        for (var u = 0; u < a; ++u)
          for (var o = 0, s = 0, f = 0; f < n; ++f) {
            var d = e[f],
              h = d?.[u];
            if (h != null) {
              var m = h[1],
                p = h[0],
                g = Br(m) ? p : m;
              g >= 0
                ? ((h[0] = o), (o += g), (h[1] = o))
                : ((h[0] = s), (s += g), (h[1] = s));
            }
          }
    }
  },
  Vk = (e) => {
    var t,
      n = e.length;
    if (!(n <= 0)) {
      var a = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
      if (!(a == null || a <= 0))
        for (var u = 0; u < a; ++u)
          for (var o = 0, s = 0; s < n; ++s) {
            var f = e[s],
              d = f?.[u];
            if (d != null) {
              var h = Br(d[1]) ? d[0] : d[1];
              h >= 0
                ? ((d[0] = o), (o += h), (d[1] = o))
                : ((d[0] = 0), (d[1] = 0));
            }
          }
    }
  },
  Zk = {
    sign: Xk,
    expand: OP,
    none: mi,
    silhouette: _P,
    wiggle: AP,
    positive: Vk,
  },
  Qk = (e, t, n) => {
    var a,
      u = (a = Zk[n]) !== null && a !== void 0 ? a : mi,
      o = wP()
        .keys(t)
        .value((f, d) => Number(qt(f, d, 0)))
        .order(iy)
        .offset(u),
      s = o(e);
    return (
      s.forEach((f, d) => {
        f.forEach((h, m) => {
          var p = qt(e[m], t[d], 0);
          Array.isArray(p) &&
            p.length === 2 &&
            ve(p[0]) &&
            ve(p[1]) &&
            ((h[0] = p[0]), (h[1] = p[1]));
        });
      }),
      s
    );
  };
function rw(e) {
  var { axis: t, ticks: n, bandSize: a, entry: u, index: o, dataKey: s } = e;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !Ot(u[t.dataKey])) {
      var f = QA(n, "value", u[t.dataKey]);
      if (f) return f.coordinate + a / 2;
    }
    return n != null && n[o] ? n[o].coordinate + a / 2 : null;
  }
  var d = qt(u, Ot(s) ? t.dataKey : s),
    h = t.scale.map(d);
  return ve(h) ? h : null;
}
var Wk = (e) => {
    var t = e.flat(2).filter(ve);
    return [Math.min(...t), Math.max(...t)];
  },
  Fk = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]],
  Jk = (e, t, n) => {
    if (e != null)
      return Fk(
        Object.keys(e).reduce(
          (a, u) => {
            var o = e[u];
            if (!o) return a;
            var { stackedData: s } = o,
              f = s.reduce(
                (d, h) => {
                  var m = IE(h, t, n),
                    p = Wk(m);
                  return !ke(p[0]) || !ke(p[1])
                    ? d
                    : [Math.min(d[0], p[0]), Math.max(d[1], p[1])];
                },
                [1 / 0, -1 / 0],
              );
            return [Math.min(f[0], a[0]), Math.max(f[1], a[1])];
          },
          [1 / 0, -1 / 0],
        ),
      );
  },
  aw = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  iw = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Ns = (e, t, n) => {
    if (e && e.scale && e.scale.bandwidth) {
      var a = e.scale.bandwidth();
      if (!n || a > 0) return a;
    }
    if (e && t && t.length >= 2) {
      for (
        var u = xf(t, (m) => m.coordinate), o = 1 / 0, s = 1, f = u.length;
        s < f;
        s++
      ) {
        var d = u[s],
          h = u[s - 1];
        o = Math.min((d?.coordinate || 0) - (h?.coordinate || 0), o);
      }
      return o === 1 / 0 ? 0 : o;
    }
    return n ? void 0 : 0;
  };
function lw(e) {
  var {
    tooltipEntrySettings: t,
    dataKey: n,
    payload: a,
    value: u,
    name: o,
  } = e;
  return pl(pl({}, t), {}, { dataKey: n, payload: a, value: u, name: o });
}
function KE(e, t) {
  if (e) return String(e);
  if (typeof t == "string") return t;
}
var e3 = (e, t) => {
    if (t === "horizontal") return e.relativeX;
    if (t === "vertical") return e.relativeY;
  },
  t3 = (e, t) => (t === "centric" ? e.angle : e.radius),
  Xr = (e) => e.layout.width,
  Vr = (e) => e.layout.height,
  n3 = (e) => e.layout.scale,
  GE = (e) => e.layout.margin,
  Cf = $(
    (e) => e.cartesianAxis.xAxis,
    (e) => Object.values(e),
  ),
  Df = $(
    (e) => e.cartesianAxis.yAxis,
    (e) => Object.values(e),
  ),
  r3 = "data-recharts-item-index",
  a3 = "data-recharts-item-id",
  po = 60;
function uw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function ts(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? uw(Object(n), !0).forEach(function (a) {
          i3(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : uw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function i3(e, t, n) {
  return (
    (t = l3(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function l3(e) {
  var t = u3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function u3(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var o3 = (e) => e.brush.height;
function c3(e) {
  var t = Df(e);
  return t.reduce((n, a) => {
    if (a.orientation === "left" && !a.mirror && !a.hide) {
      var u = typeof a.width == "number" ? a.width : po;
      return n + u;
    }
    return n;
  }, 0);
}
function s3(e) {
  var t = Df(e);
  return t.reduce((n, a) => {
    if (a.orientation === "right" && !a.mirror && !a.hide) {
      var u = typeof a.width == "number" ? a.width : po;
      return n + u;
    }
    return n;
  }, 0);
}
function f3(e) {
  var t = Cf(e);
  return t.reduce(
    (n, a) =>
      a.orientation === "top" && !a.mirror && !a.hide ? n + a.height : n,
    0,
  );
}
function d3(e) {
  var t = Cf(e);
  return t.reduce(
    (n, a) =>
      a.orientation === "bottom" && !a.mirror && !a.hide ? n + a.height : n,
    0,
  );
}
var Bt = $(
    [Xr, Vr, GE, o3, c3, s3, f3, d3, dE, Bz],
    (e, t, n, a, u, o, s, f, d, h) => {
      var m = { left: (n.left || 0) + u, right: (n.right || 0) + o },
        p = { top: (n.top || 0) + s, bottom: (n.bottom || 0) + f },
        g = ts(ts({}, p), m),
        b = g.bottom;
      ((g.bottom += a), (g = Gk(g, d, h)));
      var S = e - g.left - g.right,
        _ = t - g.top - g.bottom;
      return ts(
        ts({ brushBottom: b }, g),
        {},
        { width: Math.max(S, 0), height: Math.max(_, 0) },
      );
    },
  ),
  v3 = $(Bt, (e) => ({
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height,
  })),
  XE = $(Xr, Vr, (e, t) => ({ x: 0, y: 0, width: e, height: t })),
  h3 = w.createContext(null),
  sn = () => w.useContext(h3) != null,
  Nf = (e) => e.brush,
  Pf = $([Nf, Bt, GE], (e, t, n) => ({
    height: e.height,
    x: ve(e.x) ? e.x : t.left,
    y: ve(e.y) ? e.y : t.top + t.height + t.brushBottom - (n?.bottom || 0),
    width: ve(e.width) ? e.width : t.width,
  })),
  wm = {},
  Om = {},
  _m = {},
  ow;
function m3() {
  return (
    ow ||
      ((ow = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n, a, { signal: u, edges: o } = {}) {
          let s,
            f = null;
          const d = o != null && o.includes("leading"),
            h = o == null || o.includes("trailing"),
            m = () => {
              f !== null && (n.apply(s, f), (s = void 0), (f = null));
            },
            p = () => {
              (h && m(), _());
            };
          let g = null;
          const b = () => {
              (g != null && clearTimeout(g),
                (g = setTimeout(() => {
                  ((g = null), p());
                }, a)));
            },
            S = () => {
              g !== null && (clearTimeout(g), (g = null));
            },
            _ = () => {
              (S(), (s = void 0), (f = null));
            },
            O = () => {
              m();
            },
            E = function (...C) {
              if (u?.aborted) return;
              ((s = this), (f = C));
              const T = g == null;
              (b(), d && T && m());
            };
          return (
            (E.schedule = b),
            (E.cancel = _),
            (E.flush = O),
            u?.addEventListener("abort", _, { once: !0 }),
            E
          );
        }
        e.debounce = t;
      })(_m)),
    _m
  );
}
var cw;
function y3() {
  return (
    cw ||
      ((cw = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = m3();
        function n(a, u = 0, o = {}) {
          typeof o != "object" && (o = {});
          const { leading: s = !1, trailing: f = !0, maxWait: d } = o,
            h = Array(2);
          (s && (h[0] = "leading"), f && (h[1] = "trailing"));
          let m,
            p = null;
          const g = t.debounce(
              function (..._) {
                ((m = a.apply(this, _)), (p = null));
              },
              u,
              { edges: h },
            ),
            b = function (..._) {
              return d != null &&
                (p === null && (p = Date.now()), Date.now() - p >= d)
                ? ((m = a.apply(this, _)),
                  (p = Date.now()),
                  g.cancel(),
                  g.schedule(),
                  m)
                : (g.apply(this, _), m);
            },
            S = () => (g.flush(), m);
          return ((b.cancel = g.cancel), (b.flush = S), b);
        }
        e.debounce = n;
      })(Om)),
    Om
  );
}
var sw;
function p3() {
  return (
    sw ||
      ((sw = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = y3();
        function n(a, u = 0, o = {}) {
          const { leading: s = !0, trailing: f = !0 } = o;
          return t.debounce(a, u, { leading: s, maxWait: u, trailing: f });
        }
        e.throttle = n;
      })(wm)),
    wm
  );
}
var Am, fw;
function g3() {
  return (fw || ((fw = 1), (Am = p3().throttle)), Am);
}
var b3 = g3();
const x3 = Pa(b3);
var Ps = function (t, n) {
    for (
      var a = arguments.length, u = new Array(a > 2 ? a - 2 : 0), o = 2;
      o < a;
      o++
    )
      u[o - 2] = arguments[o];
    if (
      typeof console < "u" &&
      console.warn &&
      (n === void 0 &&
        console.warn("LogUtils requires an error message argument"),
      !t)
    )
      if (n === void 0)
        console.warn(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
        );
      else {
        var s = 0;
        console.warn(n.replace(/%s/g, () => u[s++]));
      }
  },
  lr = {
    width: "100%",
    height: "100%",
    debounce: 0,
    minWidth: 0,
    initialDimension: { width: -1, height: -1 },
  },
  VE = (e, t, n) => {
    var {
        width: a = lr.width,
        height: u = lr.height,
        aspect: o,
        maxHeight: s,
      } = n,
      f = yi(a) ? e : Number(a),
      d = yi(u) ? t : Number(u);
    return (
      o &&
        o > 0 &&
        (f ? (d = f / o) : d && (f = d * o),
        s && d != null && d > s && (d = s)),
      { calculatedWidth: f, calculatedHeight: d }
    );
  },
  S3 = { width: 0, height: 0, overflow: "visible" },
  w3 = { width: 0, overflowX: "visible" },
  O3 = { height: 0, overflowY: "visible" },
  _3 = {},
  A3 = (e) => {
    var { width: t, height: n } = e,
      a = yi(t),
      u = yi(n);
    return a && u ? S3 : a ? w3 : u ? O3 : _3;
  };
function E3(e) {
  var { width: t, height: n, aspect: a } = e,
    u = t,
    o = n;
  return (
    u === void 0 && o === void 0
      ? ((u = lr.width), (o = lr.height))
      : u === void 0
        ? (u = a && a > 0 ? void 0 : lr.width)
        : o === void 0 && (o = a && a > 0 ? void 0 : lr.height),
    { width: u, height: o }
  );
}
function py() {
  return (
    (py = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    py.apply(null, arguments)
  );
}
function dw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function vw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? dw(Object(n), !0).forEach(function (a) {
          j3(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : dw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function j3(e, t, n) {
  return (
    (t = T3(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function T3(e) {
  var t = M3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function M3(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZE = w.createContext(lr.initialDimension);
function C3(e) {
  return dr(e.width) && dr(e.height);
}
function QE(e) {
  var { children: t, width: n, height: a } = e,
    u = w.useMemo(() => ({ width: n, height: a }), [n, a]);
  return C3(u) ? w.createElement(ZE.Provider, { value: u }, t) : null;
}
var sp = () => w.useContext(ZE),
  D3 = w.forwardRef((e, t) => {
    var {
        aspect: n,
        initialDimension: a = lr.initialDimension,
        width: u,
        height: o,
        minWidth: s = lr.minWidth,
        minHeight: f,
        maxHeight: d,
        children: h,
        debounce: m = lr.debounce,
        id: p,
        className: g,
        onResize: b,
        style: S = {},
      } = e,
      _ = w.useRef(null),
      O = w.useRef();
    ((O.current = b), w.useImperativeHandle(t, () => _.current));
    var [E, C] = w.useState({
        containerWidth: a.width,
        containerHeight: a.height,
      }),
      T = w.useCallback((V, F) => {
        C((ae) => {
          var ne = Math.round(V),
            K = Math.round(F);
          return ae.containerWidth === ne && ae.containerHeight === K
            ? ae
            : { containerWidth: ne, containerHeight: K };
        });
      }, []);
    w.useEffect(() => {
      if (_.current == null || typeof ResizeObserver > "u") return wi;
      var V = (K) => {
        var q,
          re = K[0];
        if (re != null) {
          var { width: ce, height: L } = re.contentRect;
          (T(ce, L),
            (q = O.current) === null || q === void 0 || q.call(O, ce, L));
        }
      };
      m > 0 && (V = x3(V, m, { trailing: !0, leading: !1 }));
      var F = new ResizeObserver(V),
        { width: ae, height: ne } = _.current.getBoundingClientRect();
      return (
        T(ae, ne),
        F.observe(_.current),
        () => {
          F.disconnect();
        }
      );
    }, [T, m]);
    var { containerWidth: D, containerHeight: M } = E;
    Ps(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
    var { calculatedWidth: z, calculatedHeight: U } = VE(D, M, {
      width: u,
      height: o,
      aspect: n,
      maxHeight: d,
    });
    return (
      Ps(
        (z != null && z > 0) || (U != null && U > 0),
        `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
        z,
        U,
        u,
        o,
        s,
        f,
        n,
      ),
      w.createElement(
        "div",
        {
          id: p ? "".concat(p) : void 0,
          className: Ge("recharts-responsive-container", g),
          style: vw(
            vw({}, S),
            {},
            { width: u, height: o, minWidth: s, minHeight: f, maxHeight: d },
          ),
          ref: _,
        },
        w.createElement(
          "div",
          { style: A3({ width: u, height: o }) },
          w.createElement(QE, { width: z, height: U }, h),
        ),
      )
    );
  }),
  N3 = w.forwardRef((e, t) => {
    var n = sp();
    if (dr(n.width) && dr(n.height)) return e.children;
    var { width: a, height: u } = E3({
        width: e.width,
        height: e.height,
        aspect: e.aspect,
      }),
      { calculatedWidth: o, calculatedHeight: s } = VE(void 0, void 0, {
        width: a,
        height: u,
        aspect: e.aspect,
        maxHeight: e.maxHeight,
      });
    return ve(o) && ve(s)
      ? w.createElement(QE, { width: o, height: s }, e.children)
      : w.createElement(D3, py({}, e, { width: a, height: u, ref: t }));
  });
function fp(e) {
  if (e)
    return {
      x: e.x,
      y: e.y,
      upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
      lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
      width: e.width,
      height: e.height,
    };
}
var zf = () => {
    var e,
      t = sn(),
      n = ye(v3),
      a = ye(Pf),
      u = (e = ye(Nf)) === null || e === void 0 ? void 0 : e.padding;
    return !t || !a || !u
      ? n
      : {
          width: a.width - u.left - u.right,
          height: a.height - u.top - u.bottom,
          x: u.left,
          y: u.top,
        };
  },
  P3 = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    brushBottom: 0,
  },
  WE = () => {
    var e;
    return (e = ye(Bt)) !== null && e !== void 0 ? e : P3;
  },
  FE = () => ye(Xr),
  JE = () => ye(Vr),
  et = (e) => e.layout.layoutType,
  Ml = () => ye(et),
  e2 = () => {
    var e = Ml();
    if (e === "horizontal" || e === "vertical") return e;
  },
  t2 = (e) => {
    var t = e.layout.layoutType;
    if (t === "centric" || t === "radial") return t;
  },
  z3 = () => {
    var e = Ml();
    return e !== void 0;
  },
  go = (e) => {
    var t = dt(),
      n = sn(),
      { width: a, height: u } = e,
      o = sp(),
      s = a,
      f = u;
    return (
      o && ((s = o.width > 0 ? o.width : a), (f = o.height > 0 ? o.height : u)),
      w.useEffect(() => {
        !n && dr(s) && dr(f) && t(Bk({ width: s, height: f }));
      }, [t, n, s, f]),
      null
    );
  },
  n2 = Symbol.for("immer-nothing"),
  hw = Symbol.for("immer-draftable"),
  An = Symbol.for("immer-state");
function Vn(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var eo = Object.getPrototypeOf;
function _l(e) {
  return !!e && !!e[An];
}
function gi(e) {
  return e
    ? r2(e) ||
        Array.isArray(e) ||
        !!e[hw] ||
        !!e.constructor?.[hw] ||
        bo(e) ||
        Rf(e)
    : !1;
}
var k3 = Object.prototype.constructor.toString(),
  mw = new WeakMap();
function r2(e) {
  if (!e || typeof e != "object") return !1;
  const t = Object.getPrototypeOf(e);
  if (t === null || t === Object.prototype) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  if (n === Object) return !0;
  if (typeof n != "function") return !1;
  let a = mw.get(n);
  return (
    a === void 0 && ((a = Function.toString.call(n)), mw.set(n, a)),
    a === k3
  );
}
function zs(e, t, n = !0) {
  kf(e) === 0
    ? (n ? Reflect.ownKeys(e) : Object.keys(e)).forEach((u) => {
        t(u, e[u], e);
      })
    : e.forEach((a, u) => t(u, a, e));
}
function kf(e) {
  const t = e[An];
  return t ? t.type_ : Array.isArray(e) ? 1 : bo(e) ? 2 : Rf(e) ? 3 : 0;
}
function gy(e, t) {
  return kf(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function a2(e, t, n) {
  const a = kf(e);
  a === 2 ? e.set(t, n) : a === 3 ? e.add(n) : (e[t] = n);
}
function R3(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function bo(e) {
  return e instanceof Map;
}
function Rf(e) {
  return e instanceof Set;
}
function li(e) {
  return e.copy_ || e.base_;
}
function by(e, t) {
  if (bo(e)) return new Map(e);
  if (Rf(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = r2(e);
  if (t === !0 || (t === "class_only" && !n)) {
    const a = Object.getOwnPropertyDescriptors(e);
    delete a[An];
    let u = Reflect.ownKeys(a);
    for (let o = 0; o < u.length; o++) {
      const s = u[o],
        f = a[s];
      (f.writable === !1 && ((f.writable = !0), (f.configurable = !0)),
        (f.get || f.set) &&
          (a[s] = {
            configurable: !0,
            writable: !0,
            enumerable: f.enumerable,
            value: e[s],
          }));
    }
    return Object.create(eo(e), a);
  } else {
    const a = eo(e);
    if (a !== null && n) return { ...e };
    const u = Object.create(a);
    return Object.assign(u, e);
  }
}
function dp(e, t = !1) {
  return (
    Lf(e) ||
      _l(e) ||
      !gi(e) ||
      (kf(e) > 1 &&
        Object.defineProperties(e, { set: ns, add: ns, clear: ns, delete: ns }),
      Object.freeze(e),
      t && Object.values(e).forEach((n) => dp(n, !0))),
    e
  );
}
function L3() {
  Vn(2);
}
var ns = { value: L3 };
function Lf(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var U3 = {};
function bi(e) {
  const t = U3[e];
  return (t || Vn(0, e), t);
}
var to;
function i2() {
  return to;
}
function q3(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function yw(e, t) {
  t &&
    (bi("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function xy(e) {
  (Sy(e), e.drafts_.forEach(B3), (e.drafts_ = null));
}
function Sy(e) {
  e === to && (to = e.parent_);
}
function pw(e) {
  return (to = q3(to, e));
}
function B3(e) {
  const t = e[An];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function gw(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[An].modified_ && (xy(t), Vn(4)),
        gi(e) && ((e = ks(t, e)), t.parent_ || Rs(t, e)),
        t.patches_ &&
          bi("Patches").generateReplacementPatches_(
            n[An].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = ks(t, n, [])),
    xy(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== n2 ? e : void 0
  );
}
function ks(e, t, n) {
  if (Lf(t)) return t;
  const a = e.immer_.shouldUseStrictIteration(),
    u = t[An];
  if (!u) return (zs(t, (o, s) => bw(e, u, t, o, s, n), a), t);
  if (u.scope_ !== e) return t;
  if (!u.modified_) return (Rs(e, u.base_, !0), u.base_);
  if (!u.finalized_) {
    ((u.finalized_ = !0), u.scope_.unfinalizedDrafts_--);
    const o = u.copy_;
    let s = o,
      f = !1;
    (u.type_ === 3 && ((s = new Set(o)), o.clear(), (f = !0)),
      zs(s, (d, h) => bw(e, u, o, d, h, n, f), a),
      Rs(e, o, !1),
      n &&
        e.patches_ &&
        bi("Patches").generatePatches_(u, n, e.patches_, e.inversePatches_));
  }
  return u.copy_;
}
function bw(e, t, n, a, u, o, s) {
  if (u == null || (typeof u != "object" && !s)) return;
  const f = Lf(u);
  if (!(f && !s)) {
    if (_l(u)) {
      const d =
          o && t && t.type_ !== 3 && !gy(t.assigned_, a) ? o.concat(a) : void 0,
        h = ks(e, u, d);
      if ((a2(n, a, h), _l(h))) e.canAutoFreeze_ = !1;
      else return;
    } else s && n.add(u);
    if (gi(u) && !f) {
      if (
        (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) ||
        (t && t.base_ && t.base_[a] === u && f)
      )
        return;
      (ks(e, u),
        (!t || !t.scope_.parent_) &&
          typeof a != "symbol" &&
          (bo(n)
            ? n.has(a)
            : Object.prototype.propertyIsEnumerable.call(n, a)) &&
          Rs(e, u));
    }
  }
}
function Rs(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && dp(t, n);
}
function H3(e, t) {
  const n = Array.isArray(e),
    a = {
      type_: n ? 1 : 0,
      scope_: t ? t.scope_ : i2(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let u = a,
    o = vp;
  n && ((u = [a]), (o = no));
  const { revoke: s, proxy: f } = Proxy.revocable(u, o);
  return ((a.draft_ = f), (a.revoke_ = s), f);
}
var vp = {
    get(e, t) {
      if (t === An) return e;
      const n = li(e);
      if (!gy(n, t)) return I3(e, n, t);
      const a = n[t];
      return e.finalized_ || !gi(a)
        ? a
        : a === Em(e.base_, t)
          ? (jm(e), (e.copy_[t] = Oy(a, e)))
          : a;
    },
    has(e, t) {
      return t in li(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(li(e));
    },
    set(e, t, n) {
      const a = l2(li(e), t);
      if (a?.set) return (a.set.call(e.draft_, n), !0);
      if (!e.modified_) {
        const u = Em(li(e), t),
          o = u?.[An];
        if (o && o.base_ === n)
          return ((e.copy_[t] = n), (e.assigned_[t] = !1), !0);
        if (R3(n, u) && (n !== void 0 || gy(e.base_, t))) return !0;
        (jm(e), wy(e));
      }
      return (
        (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        Em(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), jm(e), wy(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = li(e),
        a = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        a && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: a.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      Vn(11);
    },
    getPrototypeOf(e) {
      return eo(e.base_);
    },
    setPrototypeOf() {
      Vn(12);
    },
  },
  no = {};
zs(vp, (e, t) => {
  no[e] = function () {
    return ((arguments[0] = arguments[0][0]), t.apply(this, arguments));
  };
});
no.deleteProperty = function (e, t) {
  return no.set.call(this, e, t, void 0);
};
no.set = function (e, t, n) {
  return vp.set.call(this, e[0], t, n, e[0]);
};
function Em(e, t) {
  const n = e[An];
  return (n ? li(n) : e)[t];
}
function I3(e, t, n) {
  const a = l2(t, n);
  return a ? ("value" in a ? a.value : a.get?.call(e.draft_)) : void 0;
}
function l2(e, t) {
  if (!(t in e)) return;
  let n = eo(e);
  for (; n; ) {
    const a = Object.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = eo(n);
  }
}
function wy(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && wy(e.parent_));
}
function jm(e) {
  e.copy_ || (e.copy_ = by(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var $3 = class {
  constructor(e) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.useStrictIteration_ = !0),
      (this.produce = (t, n, a) => {
        if (typeof t == "function" && typeof n != "function") {
          const o = n;
          n = t;
          const s = this;
          return function (d = o, ...h) {
            return s.produce(d, (m) => n.call(this, m, ...h));
          };
        }
        (typeof n != "function" && Vn(6),
          a !== void 0 && typeof a != "function" && Vn(7));
        let u;
        if (gi(t)) {
          const o = pw(this),
            s = Oy(t, void 0);
          let f = !0;
          try {
            ((u = n(s)), (f = !1));
          } finally {
            f ? xy(o) : Sy(o);
          }
          return (yw(o, a), gw(u, o));
        } else if (!t || typeof t != "object") {
          if (
            ((u = n(t)),
            u === void 0 && (u = t),
            u === n2 && (u = void 0),
            this.autoFreeze_ && dp(u, !0),
            a)
          ) {
            const o = [],
              s = [];
            (bi("Patches").generateReplacementPatches_(t, u, o, s), a(o, s));
          }
          return u;
        } else Vn(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (s, ...f) => this.produceWithPatches(s, (d) => t(d, ...f));
        let a, u;
        return [
          this.produce(t, n, (s, f) => {
            ((a = s), (u = f));
          }),
          a,
          u,
        ];
      }),
      typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze),
      typeof e?.useStrictShallowCopy == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy),
      typeof e?.useStrictIteration == "boolean" &&
        this.setUseStrictIteration(e.useStrictIteration));
  }
  createDraft(e) {
    (gi(e) || Vn(8), _l(e) && (e = Y3(e)));
    const t = pw(this),
      n = Oy(e, void 0);
    return ((n[An].isManual_ = !0), Sy(t), n);
  }
  finishDraft(e, t) {
    const n = e && e[An];
    (!n || !n.isManual_) && Vn(9);
    const { scope_: a } = n;
    return (yw(a, t), gw(void 0, a));
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const u = t[n];
      if (u.path.length === 0 && u.op === "replace") {
        e = u.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const a = bi("Patches").applyPatches_;
    return _l(e) ? a(e, t) : this.produce(e, (u) => a(u, t));
  }
};
function Oy(e, t) {
  const n = bo(e)
    ? bi("MapSet").proxyMap_(e, t)
    : Rf(e)
      ? bi("MapSet").proxySet_(e, t)
      : H3(e, t);
  return ((t ? t.scope_ : i2()).drafts_.push(n), n);
}
function Y3(e) {
  return (_l(e) || Vn(10, e), u2(e));
}
function u2(e) {
  if (!gi(e) || Lf(e)) return e;
  const t = e[An];
  let n,
    a = !0;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0),
      (n = by(e, t.scope_.immer_.useStrictShallowCopy_)),
      (a = t.scope_.immer_.shouldUseStrictIteration()));
  } else n = by(e, !0);
  return (
    zs(
      n,
      (u, o) => {
        a2(n, u, u2(o));
      },
      a,
    ),
    t && (t.finalized_ = !1),
    n
  );
}
var K3 = new $3();
K3.produce;
var G3 = {
    settings: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "middle",
      itemSorter: "value",
    },
    size: { width: 0, height: 0 },
    payload: [],
  },
  o2 = Yt({
    name: "legend",
    initialState: G3,
    reducers: {
      setLegendSize(e, t) {
        ((e.size.width = t.payload.width), (e.size.height = t.payload.height));
      },
      setLegendSettings(e, t) {
        ((e.settings.align = t.payload.align),
          (e.settings.layout = t.payload.layout),
          (e.settings.verticalAlign = t.payload.verticalAlign),
          (e.settings.itemSorter = t.payload.itemSorter));
      },
      addLegendPayload: {
        reducer(e, t) {
          e.payload.push(t.payload);
        },
        prepare: Qe(),
      },
      replaceLegendPayload: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload,
            u = Bn(e).payload.indexOf(n);
          u > -1 && (e.payload[u] = a);
        },
        prepare: Qe(),
      },
      removeLegendPayload: {
        reducer(e, t) {
          var n = Bn(e).payload.indexOf(t.payload);
          n > -1 && e.payload.splice(n, 1);
        },
        prepare: Qe(),
      },
    },
  }),
  {
    setLegendSize: $$,
    setLegendSettings: Y$,
    addLegendPayload: X3,
    replaceLegendPayload: V3,
    removeLegendPayload: Z3,
  } = o2.actions,
  Q3 = o2.reducer,
  Tm = { exports: {} },
  Mm = {};
var xw;
function W3() {
  if (xw) return Mm;
  xw = 1;
  var e = Tl();
  function t(d, h) {
    return (d === h && (d !== 0 || 1 / d === 1 / h)) || (d !== d && h !== h);
  }
  var n = typeof Object.is == "function" ? Object.is : t,
    a = e.useSyncExternalStore,
    u = e.useRef,
    o = e.useEffect,
    s = e.useMemo,
    f = e.useDebugValue;
  return (
    (Mm.useSyncExternalStoreWithSelector = function (d, h, m, p, g) {
      var b = u(null);
      if (b.current === null) {
        var S = { hasValue: !1, value: null };
        b.current = S;
      } else S = b.current;
      b = s(
        function () {
          function O(M) {
            if (!E) {
              if (((E = !0), (C = M), (M = p(M)), g !== void 0 && S.hasValue)) {
                var z = S.value;
                if (g(z, M)) return (T = z);
              }
              return (T = M);
            }
            if (((z = T), n(C, M))) return z;
            var U = p(M);
            return g !== void 0 && g(z, U) ? ((C = M), z) : ((C = M), (T = U));
          }
          var E = !1,
            C,
            T,
            D = m === void 0 ? null : m;
          return [
            function () {
              return O(h());
            },
            D === null
              ? void 0
              : function () {
                  return O(D());
                },
          ];
        },
        [h, m, p, g],
      );
      var _ = a(d, b[0], b[1]);
      return (
        o(
          function () {
            ((S.hasValue = !0), (S.value = _));
          },
          [_],
        ),
        f(_),
        _
      );
    }),
    Mm
  );
}
var Sw;
function F3() {
  return (Sw || ((Sw = 1), (Tm.exports = W3())), Tm.exports);
}
F3();
function J3(e) {
  e();
}
function eR() {
  let e = null,
    t = null;
  return {
    clear() {
      ((e = null), (t = null));
    },
    notify() {
      J3(() => {
        let n = e;
        for (; n; ) (n.callback(), (n = n.next));
      });
    },
    get() {
      const n = [];
      let a = e;
      for (; a; ) (n.push(a), (a = a.next));
      return n;
    },
    subscribe(n) {
      let a = !0;
      const u = (t = { callback: n, next: null, prev: t });
      return (
        u.prev ? (u.prev.next = u) : (e = u),
        function () {
          !a ||
            e === null ||
            ((a = !1),
            u.next ? (u.next.prev = u.prev) : (t = u.prev),
            u.prev ? (u.prev.next = u.next) : (e = u.next));
        }
      );
    },
  };
}
var ww = { notify() {}, get: () => [] };
function tR(e, t) {
  let n,
    a = ww,
    u = 0,
    o = !1;
  function s(_) {
    m();
    const O = a.subscribe(_);
    let E = !1;
    return () => {
      E || ((E = !0), O(), p());
    };
  }
  function f() {
    a.notify();
  }
  function d() {
    S.onStateChange && S.onStateChange();
  }
  function h() {
    return o;
  }
  function m() {
    (u++, n || ((n = e.subscribe(d)), (a = eR())));
  }
  function p() {
    (u--, n && u === 0 && (n(), (n = void 0), a.clear(), (a = ww)));
  }
  function g() {
    o || ((o = !0), m());
  }
  function b() {
    o && ((o = !1), p());
  }
  const S = {
    addNestedSub: s,
    notifyNestedSubs: f,
    handleChangeWrapper: d,
    isSubscribed: h,
    trySubscribe: g,
    tryUnsubscribe: b,
    getListeners: () => a,
  };
  return S;
}
var nR = () =>
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  rR = nR(),
  aR = () => typeof navigator < "u" && navigator.product === "ReactNative",
  iR = aR(),
  lR = () => (rR || iR ? w.useLayoutEffect : w.useEffect),
  uR = lR();
function Ow(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function oR(e, t) {
  if (Ow(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const n = Object.keys(e),
    a = Object.keys(t);
  if (n.length !== a.length) return !1;
  for (let u = 0; u < n.length; u++)
    if (!Object.prototype.hasOwnProperty.call(t, n[u]) || !Ow(e[n[u]], t[n[u]]))
      return !1;
  return !0;
}
var cR = Symbol.for("react-redux-context"),
  sR = typeof globalThis < "u" ? globalThis : {};
function fR() {
  if (!w.createContext) return {};
  const e = (sR[cR] ??= new Map());
  let t = e.get(w.createContext);
  return (t || ((t = w.createContext(null)), e.set(w.createContext, t)), t);
}
var dR = fR();
function vR(e) {
  const { children: t, context: n, serverState: a, store: u } = e,
    o = w.useMemo(() => {
      const d = tR(u);
      return {
        store: u,
        subscription: d,
        getServerState: a ? () => a : void 0,
      };
    }, [u, a]),
    s = w.useMemo(() => u.getState(), [u]);
  uR(() => {
    const { subscription: d } = o;
    return (
      (d.onStateChange = d.notifyNestedSubs),
      d.trySubscribe(),
      s !== u.getState() && d.notifyNestedSubs(),
      () => {
        (d.tryUnsubscribe(), (d.onStateChange = void 0));
      }
    );
  }, [o, s]);
  const f = n || dR;
  return w.createElement(f.Provider, { value: o }, t);
}
var hR = vR,
  mR = new Set([
    "axisLine",
    "tickLine",
    "activeBar",
    "activeDot",
    "activeLabel",
    "activeShape",
    "allowEscapeViewBox",
    "background",
    "cursor",
    "dot",
    "label",
    "line",
    "margin",
    "padding",
    "position",
    "shape",
    "style",
    "tick",
    "wrapperStyle",
    "radius",
    "throttledEvents",
  ]);
function yR(e, t) {
  return e == null && t == null
    ? !0
    : typeof e == "number" && typeof t == "number"
      ? e === t || (e !== e && t !== t)
      : e === t;
}
function Uf(e, t) {
  var n = new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var a of n)
    if (mR.has(a)) {
      if (e[a] == null && t[a] == null) continue;
      if (!oR(e[a], t[a])) return !1;
    } else if (!yR(e[a], t[a])) return !1;
  return !0;
}
function _y() {
  return (
    (_y = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    _y.apply(null, arguments)
  );
}
function _w(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function zu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? _w(Object(n), !0).forEach(function (a) {
          pR(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : _w(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function pR(e, t, n) {
  return (
    (t = gR(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function gR(e) {
  var t = bR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bR(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function xR(e) {
  return Array.isArray(e) && fr(e[0]) && fr(e[1]) ? e.join(" ~ ") : e;
}
var cl = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap",
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000",
  },
  labelStyle: {},
  accessibilityLayer: !1,
};
function SR(e, t) {
  return t == null ? e : xf(e, t);
}
var wR = (e) => {
    var {
        separator: t = cl.separator,
        contentStyle: n,
        itemStyle: a,
        labelStyle: u = cl.labelStyle,
        payload: o,
        formatter: s,
        itemSorter: f,
        wrapperClassName: d,
        labelClassName: h,
        label: m,
        labelFormatter: p,
        accessibilityLayer: g = cl.accessibilityLayer,
      } = e,
      b = () => {
        if (o && o.length) {
          var M = { padding: 0, margin: 0 },
            z = SR(o, f),
            U = z.map((V, F) => {
              if (V.type === "none") return null;
              var ae = V.formatter || s || xR,
                { value: ne, name: K } = V,
                q = ne,
                re = K;
              if (ae) {
                var ce = ae(ne, K, V, F, o);
                if (Array.isArray(ce)) [q, re] = ce;
                else if (ce != null) q = ce;
                else return null;
              }
              var L = zu(
                zu({}, cl.itemStyle),
                {},
                { color: V.color || cl.itemStyle.color },
                a,
              );
              return w.createElement(
                "li",
                {
                  className: "recharts-tooltip-item",
                  key: "tooltip-item-".concat(F),
                  style: L,
                },
                fr(re)
                  ? w.createElement(
                      "span",
                      { className: "recharts-tooltip-item-name" },
                      re,
                    )
                  : null,
                fr(re)
                  ? w.createElement(
                      "span",
                      { className: "recharts-tooltip-item-separator" },
                      t,
                    )
                  : null,
                w.createElement(
                  "span",
                  { className: "recharts-tooltip-item-value" },
                  q,
                ),
                w.createElement(
                  "span",
                  { className: "recharts-tooltip-item-unit" },
                  V.unit || "",
                ),
              );
            });
          return w.createElement(
            "ul",
            { className: "recharts-tooltip-item-list", style: M },
            U,
          );
        }
        return null;
      },
      S = zu(zu({}, cl.contentStyle), n),
      _ = zu({ margin: 0 }, u),
      O = !Ot(m),
      E = O ? m : "",
      C = Ge("recharts-default-tooltip", d),
      T = Ge("recharts-tooltip-label", h);
    O && p && o !== void 0 && o !== null && (E = p(m, o));
    var D = g ? { role: "status", "aria-live": "assertive" } : {};
    return w.createElement(
      "div",
      _y({ className: C, style: S }, D),
      w.createElement(
        "p",
        { className: T, style: _ },
        w.isValidElement(E) ? E : "".concat(E),
      ),
      b(),
    );
  },
  ku = "recharts-tooltip-wrapper",
  OR = { visibility: "hidden" };
function _R(e) {
  var { coordinate: t, translateX: n, translateY: a } = e;
  return Ge(ku, {
    ["".concat(ku, "-right")]: ve(n) && t && ve(t.x) && n >= t.x,
    ["".concat(ku, "-left")]: ve(n) && t && ve(t.x) && n < t.x,
    ["".concat(ku, "-bottom")]: ve(a) && t && ve(t.y) && a >= t.y,
    ["".concat(ku, "-top")]: ve(a) && t && ve(t.y) && a < t.y,
  });
}
function Aw(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: n,
    key: a,
    offset: u,
    position: o,
    reverseDirection: s,
    tooltipDimension: f,
    viewBox: d,
    viewBoxDimension: h,
  } = e;
  if (o && ve(o[a])) return o[a];
  var m = n[a] - f - (u > 0 ? u : 0),
    p = n[a] + u;
  if (t[a]) return s[a] ? m : p;
  var g = d[a];
  if (g == null) return 0;
  if (s[a]) {
    var b = m,
      S = g;
    return b < S ? Math.max(p, g) : Math.max(m, g);
  }
  if (h == null) return 0;
  var _ = p + f,
    O = g + h;
  return _ > O ? Math.max(m, g) : Math.max(p, g);
}
function AR(e) {
  var { translateX: t, translateY: n, useTranslate3d: a } = e;
  return {
    transform: a
      ? "translate3d(".concat(t, "px, ").concat(n, "px, 0)")
      : "translate(".concat(t, "px, ").concat(n, "px)"),
  };
}
function ER(e) {
  var {
      allowEscapeViewBox: t,
      coordinate: n,
      offsetTop: a,
      offsetLeft: u,
      position: o,
      reverseDirection: s,
      tooltipBox: f,
      useTranslate3d: d,
      viewBox: h,
    } = e,
    m,
    p,
    g;
  return (
    f.height > 0 && f.width > 0 && n
      ? ((p = Aw({
          allowEscapeViewBox: t,
          coordinate: n,
          key: "x",
          offset: u,
          position: o,
          reverseDirection: s,
          tooltipDimension: f.width,
          viewBox: h,
          viewBoxDimension: h.width,
        })),
        (g = Aw({
          allowEscapeViewBox: t,
          coordinate: n,
          key: "y",
          offset: a,
          position: o,
          reverseDirection: s,
          tooltipDimension: f.height,
          viewBox: h,
          viewBoxDimension: h.height,
        })),
        (m = AR({ translateX: p, translateY: g, useTranslate3d: d })))
      : (m = OR),
    {
      cssProperties: m,
      cssClasses: _R({ translateX: p, translateY: g, coordinate: n }),
    }
  );
}
var jR = () =>
    !(
      typeof window < "u" &&
      window.document &&
      window.document.createElement &&
      window.setTimeout
    ),
  xo = { isSsr: jR() };
function c2() {
  var [e, t] = w.useState(() =>
    xo.isSsr || !window.matchMedia
      ? !1
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return (
    w.useEffect(() => {
      if (window.matchMedia) {
        var n = window.matchMedia("(prefers-reduced-motion: reduce)"),
          a = () => {
            t(n.matches);
          };
        return (
          n.addEventListener("change", a),
          () => {
            n.removeEventListener("change", a);
          }
        );
      }
    }, []),
    e
  );
}
function Ew(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function sl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ew(Object(n), !0).forEach(function (a) {
          TR(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ew(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function TR(e, t, n) {
  return (
    (t = MR(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function MR(e) {
  var t = CR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function CR(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function DR(e) {
  if (
    !(e.prefersReducedMotion && e.isAnimationActive === "auto") &&
    e.isAnimationActive &&
    e.active
  )
    return "transform "
      .concat(e.animationDuration, "ms ")
      .concat(e.animationEasing);
}
function NR(e) {
  var t,
    n,
    a,
    u,
    o,
    s,
    f = c2(),
    [d, h] = w.useState(() => ({
      dismissed: !1,
      dismissedAtCoordinate: { x: 0, y: 0 },
    }));
  (w.useEffect(() => {
    var S = (_) => {
      if (_.key === "Escape") {
        var O, E, C, T;
        h({
          dismissed: !0,
          dismissedAtCoordinate: {
            x:
              (O =
                (E = e.coordinate) === null || E === void 0 ? void 0 : E.x) !==
                null && O !== void 0
                ? O
                : 0,
            y:
              (C =
                (T = e.coordinate) === null || T === void 0 ? void 0 : T.y) !==
                null && C !== void 0
                ? C
                : 0,
          },
        });
      }
    };
    return (
      document.addEventListener("keydown", S),
      () => {
        document.removeEventListener("keydown", S);
      }
    );
  }, [
    (t = e.coordinate) === null || t === void 0 ? void 0 : t.x,
    (n = e.coordinate) === null || n === void 0 ? void 0 : n.y,
  ]),
    d.dismissed &&
      (((a = (u = e.coordinate) === null || u === void 0 ? void 0 : u.x) !==
        null && a !== void 0
        ? a
        : 0) !== d.dismissedAtCoordinate.x ||
        ((o = (s = e.coordinate) === null || s === void 0 ? void 0 : s.y) !==
          null && o !== void 0
          ? o
          : 0) !== d.dismissedAtCoordinate.y) &&
      h(sl(sl({}, d), {}, { dismissed: !1 })));
  var { cssClasses: m, cssProperties: p } = ER({
      allowEscapeViewBox: e.allowEscapeViewBox,
      coordinate: e.coordinate,
      offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
      offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
      position: e.position,
      reverseDirection: e.reverseDirection,
      tooltipBox: {
        height: e.lastBoundingBox.height,
        width: e.lastBoundingBox.width,
      },
      useTranslate3d: e.useTranslate3d,
      viewBox: e.viewBox,
    }),
    g = e.hasPortalFromProps
      ? {}
      : sl(
          sl(
            {
              transition: DR({
                prefersReducedMotion: f,
                isAnimationActive: e.isAnimationActive,
                active: e.active,
                animationDuration: e.animationDuration,
                animationEasing: e.animationEasing,
              }),
            },
            p,
          ),
          {},
          { pointerEvents: "none", position: "absolute", top: 0, left: 0 },
        ),
    b = sl(
      sl({}, g),
      {},
      {
        visibility:
          !d.dismissed && e.active && e.hasPayload ? "visible" : "hidden",
      },
      e.wrapperStyle,
    );
  return w.createElement(
    "div",
    {
      xmlns: "http://www.w3.org/1999/xhtml",
      tabIndex: -1,
      className: m,
      style: b,
      ref: e.innerRef,
    },
    e.children,
  );
}
var PR = w.memo(NR),
  s2 = () => {
    var e;
    return (e = ye((t) => t.rootProps.accessibilityLayer)) !== null &&
      e !== void 0
      ? e
      : !0;
  };
function Ay() {
  return (
    (Ay = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Ay.apply(null, arguments)
  );
}
function jw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function Tw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? jw(Object(n), !0).forEach(function (a) {
          zR(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : jw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function zR(e, t, n) {
  return (
    (t = kR(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function kR(e) {
  var t = RR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function RR(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Mw = {
    curveBasisClosed: fP,
    curveBasisOpen: dP,
    curveBasis: sP,
    curveBumpX: QN,
    curveBumpY: WN,
    curveLinearClosed: vP,
    curveLinear: pf,
    curveMonotoneX: hP,
    curveMonotoneY: mP,
    curveNatural: yP,
    curveStep: pP,
    curveStepAfter: bP,
    curveStepBefore: gP,
  },
  Ls = (e) => ke(e.x) && ke(e.y),
  Cw = (e) => e.base != null && Ls(e.base) && Ls(e),
  Ru = (e) => e.x,
  Lu = (e) => e.y,
  LR = (e, t) => {
    if (typeof e == "function") return e;
    var n = "curve".concat(ho(e));
    if ((n === "curveMonotone" || n === "curveBump") && t) {
      var a = Mw["".concat(n).concat(t === "vertical" ? "Y" : "X")];
      if (a) return a;
    }
    return Mw[n] || pf;
  },
  Dw = { connectNulls: !1, type: "linear" },
  UR = (e) => {
    var {
        type: t = Dw.type,
        points: n = [],
        baseLine: a,
        layout: u,
        connectNulls: o = Dw.connectNulls,
      } = e,
      s = LR(t, u),
      f = o ? n.filter(Ls) : n;
    if (Array.isArray(a)) {
      var d,
        h = n.map((S, _) => Tw(Tw({}, S), {}, { base: a[_] }));
      u === "vertical"
        ? (d = Zc()
            .y(Lu)
            .x1(Ru)
            .x0((S) => S.base.x))
        : (d = Zc()
            .x(Ru)
            .y1(Lu)
            .y0((S) => S.base.y));
      var m = d.defined(Cw).curve(s),
        p = o ? h.filter(Cw) : h;
      return m(p);
    }
    var g;
    u === "vertical" && ve(a)
      ? (g = Zc().y(Lu).x1(Ru).x0(a))
      : ve(a)
        ? (g = Zc().x(Ru).y1(Lu).y0(a))
        : (g = LA().x(Ru).y(Lu));
    var b = g.defined(Ls).curve(s);
    return b(f);
  },
  f2 = (e) => {
    var { className: t, points: n, path: a, pathRef: u } = e,
      o = Ml();
    if ((!n || !n.length) && !a) return null;
    var s = {
        type: e.type,
        points: e.points,
        baseLine: e.baseLine,
        layout: e.layout || o,
        connectNulls: e.connectNulls,
      },
      f = n && n.length ? UR(s) : a;
    return w.createElement(
      "path",
      Ay({}, sr(e), tp(e), {
        className: Ge("recharts-curve", t),
        d: f === null ? void 0 : f,
        ref: u,
      }),
    );
  },
  qR = ["x", "y", "top", "left", "width", "height", "className"];
function Ey() {
  return (
    (Ey = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Ey.apply(null, arguments)
  );
}
function Nw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function BR(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Nw(Object(n), !0).forEach(function (a) {
          HR(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Nw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function HR(e, t, n) {
  return (
    (t = IR(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function IR(e) {
  var t = $R(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $R(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function YR(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = KR(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function KR(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var GR = (e, t, n, a, u, o) =>
    "M"
      .concat(e, ",")
      .concat(u, "v")
      .concat(a, "M")
      .concat(o, ",")
      .concat(t, "h")
      .concat(n),
  XR = (e) => {
    var {
        x: t = 0,
        y: n = 0,
        top: a = 0,
        left: u = 0,
        width: o = 0,
        height: s = 0,
        className: f,
      } = e,
      d = YR(e, qR),
      h = BR({ x: t, y: n, top: a, left: u, width: o, height: s }, d);
    return !ve(t) || !ve(n) || !ve(o) || !ve(s) || !ve(a) || !ve(u)
      ? null
      : w.createElement(
          "path",
          Ey({}, Vt(h), {
            className: Ge("recharts-cross", f),
            d: GR(t, n, o, s, a, u),
          }),
        );
  };
function VR(e, t, n, a) {
  var u = a / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - u : n.left + 0.5,
    y: e === "horizontal" ? n.top + 0.5 : t.y - u,
    width: e === "horizontal" ? a : n.width - 1,
    height: e === "horizontal" ? n.height - 1 : a,
  };
}
function Pw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function zw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Pw(Object(n), !0).forEach(function (a) {
          ZR(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Pw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function ZR(e, t, n) {
  return (
    (t = QR(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function QR(e) {
  var t = WR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function WR(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var FR = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())),
  d2 = (e, t, n) =>
    e.map((a) => "".concat(FR(a), " ").concat(t, "ms ").concat(n)).join(","),
  JR = (e, t) =>
    [Object.keys(e), Object.keys(t)].reduce((n, a) =>
      n.filter((u) => a.includes(u)),
    ),
  ro = (e, t) =>
    Object.keys(t).reduce((n, a) => zw(zw({}, n), {}, { [a]: e(a, t[a]) }), {});
function kw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? kw(Object(n), !0).forEach(function (a) {
          e4(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : kw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function e4(e, t, n) {
  return (
    (t = t4(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function t4(e) {
  var t = n4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function n4(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Us = (e, t, n) => e + (t - e) * n,
  jy = (e) => {
    var { from: t, to: n } = e;
    return t !== n;
  },
  v2 = (e, t, n) => {
    var a = ro((u, o) => {
      if (jy(o)) {
        var [s, f] = e(o.from, o.to, o.velocity);
        return yt(yt({}, o), {}, { from: s, velocity: f });
      }
      return o;
    }, t);
    return n < 1
      ? ro(
          (u, o) =>
            jy(o) && a[u] != null
              ? yt(
                  yt({}, o),
                  {},
                  {
                    velocity: Us(o.velocity, a[u].velocity, n),
                    from: Us(o.from, a[u].from, n),
                  },
                )
              : o,
          t,
        )
      : v2(e, a, n - 1);
  };
function r4(e, t, n, a, u, o) {
  var s,
    f = a.reduce(
      (g, b) =>
        yt(yt({}, g), {}, { [b]: { from: e[b], velocity: 0, to: t[b] } }),
      {},
    ),
    d = () => ro((g, b) => b.from, f),
    h = () => !Object.values(f).filter(jy).length,
    m = null,
    p = (g) => {
      s || (s = g);
      var b = g - s,
        S = b / n.dt;
      ((f = v2(n, f, S)),
        u(yt(yt(yt({}, e), t), d())),
        (s = g),
        h() || (m = o.setTimeout(p)));
    };
  return () => (
    (m = o.setTimeout(p)),
    () => {
      var g;
      (g = m) === null || g === void 0 || g();
    }
  );
}
function a4(e, t, n, a, u, o, s) {
  var f = null,
    d = u.reduce((p, g) => {
      var b = e[g],
        S = t[g];
      return b == null || S == null ? p : yt(yt({}, p), {}, { [g]: [b, S] });
    }, {}),
    h,
    m = (p) => {
      h || (h = p);
      var g = (p - h) / a,
        b = ro((_, O) => Us(...O, n(g)), d);
      if ((o(yt(yt(yt({}, e), t), b)), g < 1)) f = s.setTimeout(m);
      else {
        var S = ro((_, O) => Us(...O, n(1)), d);
        o(yt(yt(yt({}, e), t), S));
      }
    };
  return () => (
    (f = s.setTimeout(m)),
    () => {
      var p;
      (p = f) === null || p === void 0 || p();
    }
  );
}
const i4 = (e, t, n, a, u, o) => {
  var s = JR(e, t);
  return n == null
    ? () => (u(yt(yt({}, e), t)), () => {})
    : n.isStepper === !0
      ? r4(e, t, n, s, u, o)
      : a4(e, t, n, a, s, u, o);
};
var qs = 1e-4,
  h2 = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1],
  m2 = (e, t) => e.map((n, a) => n * t ** a).reduce((n, a) => n + a),
  Rw = (e, t) => (n) => {
    var a = h2(e, t);
    return m2(a, n);
  },
  l4 = (e, t) => (n) => {
    var a = h2(e, t),
      u = [...a.map((o, s) => o * s).slice(1), 0];
    return m2(u, n);
  },
  u4 = (e) => {
    var t,
      n = e.split("(");
    if (n.length !== 2 || n[0] !== "cubic-bezier") return null;
    var a =
      (t = n[1]) === null ||
      t === void 0 ||
      (t = t.split(")")[0]) === null ||
      t === void 0
        ? void 0
        : t.split(",");
    if (a == null || a.length !== 4) return null;
    var u = a.map((o) => parseFloat(o));
    return [u[0], u[1], u[2], u[3]];
  },
  o4 = function () {
    for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++)
      n[a] = arguments[a];
    if (n.length === 1)
      switch (n[0]) {
        case "linear":
          return [0, 0, 1, 1];
        case "ease":
          return [0.25, 0.1, 0.25, 1];
        case "ease-in":
          return [0.42, 0, 1, 1];
        case "ease-out":
          return [0.42, 0, 0.58, 1];
        case "ease-in-out":
          return [0, 0, 0.58, 1];
        default: {
          var u = u4(n[0]);
          if (u) return u;
        }
      }
    return n.length === 4 ? n : [0, 0, 1, 1];
  },
  c4 = (e, t, n, a) => {
    var u = Rw(e, n),
      o = Rw(t, a),
      s = l4(e, n),
      f = (h) => (h > 1 ? 1 : h < 0 ? 0 : h),
      d = (h) => {
        for (var m = h > 1 ? 1 : h, p = m, g = 0; g < 8; ++g) {
          var b = u(p) - m,
            S = s(p);
          if (Math.abs(b - m) < qs || S < qs) return o(p);
          p = f(p - b / S);
        }
        return o(p);
      };
    return ((d.isStepper = !1), d);
  },
  Lw = function () {
    return c4(...o4(...arguments));
  },
  s4 = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      { stiff: n = 100, damping: a = 8, dt: u = 17 } = t,
      o = (s, f, d) => {
        var h = -(s - f) * n,
          m = d * a,
          p = d + ((h - m) * u) / 1e3,
          g = (d * u) / 1e3 + s;
        return Math.abs(g - f) < qs && Math.abs(p) < qs ? [f, 0] : [g, p];
      };
    return ((o.isStepper = !0), (o.dt = u), o);
  },
  f4 = (e) => {
    if (typeof e == "string")
      switch (e) {
        case "ease":
        case "ease-in-out":
        case "ease-out":
        case "ease-in":
        case "linear":
          return Lw(e);
        case "spring":
          return s4();
        default:
          if (e.split("(")[0] === "cubic-bezier") return Lw(e);
      }
    return typeof e == "function" ? e : null;
  };
function d4(e) {
  var t,
    n = () => null,
    a = !1,
    u = null,
    o = (s) => {
      if (!a) {
        if (Array.isArray(s)) {
          if (!s.length) return;
          var f = s,
            [d, ...h] = f;
          if (typeof d == "number") {
            u = e.setTimeout(o.bind(null, h), d);
            return;
          }
          (o(d), (u = e.setTimeout(o.bind(null, h))));
          return;
        }
        (typeof s == "string" && ((t = s), n(t)),
          typeof s == "object" && ((t = s), n(t)),
          typeof s == "function" && s());
      }
    };
  return {
    stop: () => {
      a = !0;
    },
    start: (s) => {
      ((a = !1), u && (u(), (u = null)), o(s));
    },
    subscribe: (s) => (
      (n = s),
      () => {
        n = () => null;
      }
    ),
    getTimeoutController: () => e,
  };
}
class v4 {
  setTimeout(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      a = performance.now(),
      u = null,
      o = (s) => {
        s - a >= n
          ? t(s)
          : typeof requestAnimationFrame == "function" &&
            (u = requestAnimationFrame(o));
      };
    return (
      (u = requestAnimationFrame(o)),
      () => {
        u != null && cancelAnimationFrame(u);
      }
    );
  }
}
function h4() {
  return d4(new v4());
}
var m4 = w.createContext(h4);
function y4(e, t) {
  var n = w.useContext(m4);
  return w.useMemo(() => t ?? n(e), [e, t, n]);
}
var p4 = {
    begin: 0,
    duration: 1e3,
    easing: "ease",
    isActive: !0,
    canBegin: !0,
    onAnimationEnd: () => {},
    onAnimationStart: () => {},
  },
  Uw = { t: 0 },
  Cm = { t: 1 };
function hp(e) {
  var t = cn(e, p4),
    {
      isActive: n,
      canBegin: a,
      duration: u,
      easing: o,
      begin: s,
      onAnimationEnd: f,
      onAnimationStart: d,
      children: h,
    } = t,
    m = c2(),
    p = n === "auto" ? !xo.isSsr && !m : n,
    g = y4(t.animationId, t.animationManager),
    [b, S] = w.useState(p ? Uw : Cm),
    _ = w.useRef(null);
  return (
    w.useEffect(() => {
      p || S(Cm);
    }, [p]),
    w.useEffect(() => {
      if (!p || !a) return wi;
      var O = i4(Uw, Cm, f4(o), u, S, g.getTimeoutController()),
        E = () => {
          _.current = O();
        };
      return (
        g.start([d, s, E, u, f]),
        () => {
          (g.stop(), _.current && _.current(), f());
        }
      );
    }, [p, a, u, o, s, d, f, g]),
    h(b.t)
  );
}
function mp(e) {
  var t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : "animation-",
    n = w.useRef(Qu(t)),
    a = w.useRef(e);
  return (a.current !== e && ((n.current = Qu(t)), (a.current = e)), n.current);
}
var g4 = ["radius"],
  b4 = ["radius"],
  qw,
  Bw,
  Hw,
  Iw,
  $w,
  Yw,
  Kw,
  Gw,
  Xw,
  Vw;
function Zw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function Qw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Zw(Object(n), !0).forEach(function (a) {
          x4(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Zw(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function x4(e, t, n) {
  return (
    (t = S4(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function S4(e) {
  var t = w4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function w4(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bs() {
  return (
    (Bs = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Bs.apply(null, arguments)
  );
}
function Ww(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = O4(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function O4(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function nr(e, t) {
  return (
    t || (t = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
    )
  );
}
var Fw = (e, t, n, a, u) => {
    var o = Ma(n),
      s = Ma(a),
      f = Math.min(Math.abs(o) / 2, Math.abs(s) / 2),
      d = s >= 0 ? 1 : -1,
      h = o >= 0 ? 1 : -1,
      m = (s >= 0 && o >= 0) || (s < 0 && o < 0) ? 1 : 0,
      p;
    if (f > 0 && Array.isArray(u)) {
      for (var g = [0, 0, 0, 0], b = 0, S = 4; b < S; b++) {
        var _,
          O = (_ = u[b]) !== null && _ !== void 0 ? _ : 0;
        g[b] = O > f ? f : O;
      }
      ((p = at(qw || (qw = nr(["M", ",", ""])), e, t + d * g[0])),
        g[0] > 0 &&
          (p += at(
            Bw || (Bw = nr(["A ", ",", ",0,0,", ",", ",", ""])),
            g[0],
            g[0],
            m,
            e + h * g[0],
            t,
          )),
        (p += at(Hw || (Hw = nr(["L ", ",", ""])), e + n - h * g[1], t)),
        g[1] > 0 &&
          (p += at(
            Iw ||
              (Iw = nr([
                "A ",
                ",",
                ",0,0,",
                `,
        `,
                ",",
                "",
              ])),
            g[1],
            g[1],
            m,
            e + n,
            t + d * g[1],
          )),
        (p += at($w || ($w = nr(["L ", ",", ""])), e + n, t + a - d * g[2])),
        g[2] > 0 &&
          (p += at(
            Yw ||
              (Yw = nr([
                "A ",
                ",",
                ",0,0,",
                `,
        `,
                ",",
                "",
              ])),
            g[2],
            g[2],
            m,
            e + n - h * g[2],
            t + a,
          )),
        (p += at(Kw || (Kw = nr(["L ", ",", ""])), e + h * g[3], t + a)),
        g[3] > 0 &&
          (p += at(
            Gw ||
              (Gw = nr([
                "A ",
                ",",
                ",0,0,",
                `,
        `,
                ",",
                "",
              ])),
            g[3],
            g[3],
            m,
            e,
            t + a - d * g[3],
          )),
        (p += "Z"));
    } else if (f > 0 && u === +u && u > 0) {
      var E = Math.min(f, u);
      p = at(
        Xw ||
          (Xw = nr([
            "M ",
            ",",
            `
            A `,
            ",",
            ",0,0,",
            ",",
            ",",
            `
            L `,
            ",",
            `
            A `,
            ",",
            ",0,0,",
            ",",
            ",",
            `
            L `,
            ",",
            `
            A `,
            ",",
            ",0,0,",
            ",",
            ",",
            `
            L `,
            ",",
            `
            A `,
            ",",
            ",0,0,",
            ",",
            ",",
            " Z",
          ])),
        e,
        t + d * E,
        E,
        E,
        m,
        e + h * E,
        t,
        e + n - h * E,
        t,
        E,
        E,
        m,
        e + n,
        t + d * E,
        e + n,
        t + a - d * E,
        E,
        E,
        m,
        e + n - h * E,
        t + a,
        e + h * E,
        t + a,
        E,
        E,
        m,
        e,
        t + a - d * E,
      );
    } else
      p = at(
        Vw || (Vw = nr(["M ", ",", " h ", " v ", " h ", " Z"])),
        e,
        t,
        n,
        a,
        -n,
      );
    return p;
  },
  Jw = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease",
  },
  y2 = (e) => {
    var t = cn(e, Jw),
      n = w.useRef(null),
      [a, u] = w.useState(-1);
    w.useEffect(() => {
      if (n.current && n.current.getTotalLength)
        try {
          var W = n.current.getTotalLength();
          W && u(W);
        } catch {}
    }, []);
    var { x: o, y: s, width: f, height: d, radius: h, className: m } = t,
      {
        animationEasing: p,
        animationDuration: g,
        animationBegin: b,
        isAnimationActive: S,
        isUpdateAnimationActive: _,
      } = t,
      O = w.useRef(f),
      E = w.useRef(d),
      C = w.useRef(o),
      T = w.useRef(s),
      D = w.useMemo(
        () => ({ x: o, y: s, width: f, height: d, radius: h }),
        [o, s, f, d, h],
      ),
      M = mp(D, "rectangle-");
    if (o !== +o || s !== +s || f !== +f || d !== +d || f === 0 || d === 0)
      return null;
    var z = Ge("recharts-rectangle", m);
    if (!_) {
      var U = Vt(t),
        { radius: V } = U,
        F = Ww(U, g4);
      return w.createElement(
        "path",
        Bs({}, F, {
          x: Ma(o),
          y: Ma(s),
          width: Ma(f),
          height: Ma(d),
          radius: typeof h == "number" ? h : void 0,
          className: z,
          d: Fw(o, s, f, d, h),
        }),
      );
    }
    var ae = O.current,
      ne = E.current,
      K = C.current,
      q = T.current,
      re = "0px ".concat(a === -1 ? 1 : a, "px"),
      ce = "".concat(a, "px ").concat(a, "px"),
      L = d2(
        ["strokeDasharray"],
        g,
        typeof p == "string" ? p : Jw.animationEasing,
      );
    return w.createElement(
      hp,
      {
        animationId: M,
        key: M,
        canBegin: a > 0,
        duration: g,
        easing: p,
        isActive: _,
        begin: b,
      },
      (W) => {
        var ue = an(ae, f, W),
          oe = an(ne, d, W),
          he = an(K, o, W),
          P = an(q, s, W);
        n.current &&
          ((O.current = ue),
          (E.current = oe),
          (C.current = he),
          (T.current = P));
        var G;
        S
          ? W > 0
            ? (G = { transition: L, strokeDasharray: ce })
            : (G = { strokeDasharray: re })
          : (G = { strokeDasharray: ce });
        var te = Vt(t),
          { radius: ie } = te,
          pe = Ww(te, b4);
        return w.createElement(
          "path",
          Bs({}, pe, {
            radius: typeof h == "number" ? h : void 0,
            className: z,
            d: Fw(he, P, ue, oe, h),
            ref: n,
            style: Qw(Qw({}, G), t.style),
          }),
        );
      },
    );
  };
function eO(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function tO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? eO(Object(n), !0).forEach(function (a) {
          _4(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : eO(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function _4(e, t, n) {
  return (
    (t = A4(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function A4(e) {
  var t = E4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function E4(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Hs = Math.PI / 180,
  j4 = (e) => (e * 180) / Math.PI,
  Ut = (e, t, n, a) => ({
    x: e + Math.cos(-Hs * a) * n,
    y: t + Math.sin(-Hs * a) * n,
  }),
  T4 = function (t, n) {
    var a =
      arguments.length > 2 && arguments[2] !== void 0
        ? arguments[2]
        : { top: 0, right: 0, bottom: 0, left: 0 };
    return (
      Math.min(
        Math.abs(t - (a.left || 0) - (a.right || 0)),
        Math.abs(n - (a.top || 0) - (a.bottom || 0)),
      ) / 2
    );
  },
  M4 = (e, t) => {
    var { x: n, y: a } = e,
      { x: u, y: o } = t;
    return Math.sqrt((n - u) ** 2 + (a - o) ** 2);
  },
  C4 = (e, t) => {
    var { x: n, y: a } = e,
      { cx: u, cy: o } = t,
      s = M4({ x: n, y: a }, { x: u, y: o });
    if (s <= 0) return { radius: s, angle: 0 };
    var f = (n - u) / s,
      d = Math.acos(f);
    return (
      a > o && (d = 2 * Math.PI - d),
      { radius: s, angle: j4(d), angleInRadian: d }
    );
  },
  D4 = (e) => {
    var { startAngle: t, endAngle: n } = e,
      a = Math.floor(t / 360),
      u = Math.floor(n / 360),
      o = Math.min(a, u);
    return { startAngle: t - o * 360, endAngle: n - o * 360 };
  },
  N4 = (e, t) => {
    var { startAngle: n, endAngle: a } = t,
      u = Math.floor(n / 360),
      o = Math.floor(a / 360),
      s = Math.min(u, o);
    return e + s * 360;
  },
  P4 = (e, t) => {
    var { relativeX: n, relativeY: a } = e,
      { radius: u, angle: o } = C4({ x: n, y: a }, t),
      { innerRadius: s, outerRadius: f } = t;
    if (u < s || u > f || u === 0) return null;
    var { startAngle: d, endAngle: h } = D4(t),
      m = o,
      p;
    if (d <= h) {
      for (; m > h; ) m -= 360;
      for (; m < d; ) m += 360;
      p = m >= d && m <= h;
    } else {
      for (; m > d; ) m -= 360;
      for (; m < h; ) m += 360;
      p = m >= h && m <= d;
    }
    return p ? tO(tO({}, t), {}, { radius: u, angle: N4(m, t) }) : null;
  };
function p2(e) {
  var { cx: t, cy: n, radius: a, startAngle: u, endAngle: o } = e,
    s = Ut(t, n, a, u),
    f = Ut(t, n, a, o);
  return {
    points: [s, f],
    cx: t,
    cy: n,
    radius: a,
    startAngle: u,
    endAngle: o,
  };
}
var nO, rO, aO, iO, lO, uO, oO;
function Ty() {
  return (
    (Ty = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Ty.apply(null, arguments)
  );
}
function oi(e, t) {
  return (
    t || (t = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
    )
  );
}
var z4 = (e, t) => {
    var n = qn(t - e),
      a = Math.min(Math.abs(t - e), 359.999);
    return n * a;
  },
  rs = (e) => {
    var {
        cx: t,
        cy: n,
        radius: a,
        angle: u,
        sign: o,
        isExternal: s,
        cornerRadius: f,
        cornerIsExternal: d,
      } = e,
      h = f * (s ? 1 : -1) + a,
      m = Math.asin(f / h) / Hs,
      p = d ? u : u + o * m,
      g = Ut(t, n, h, p),
      b = Ut(t, n, a, p),
      S = d ? u - o * m : u,
      _ = Ut(t, n, h * Math.cos(m * Hs), S);
    return { center: g, circleTangency: b, lineTangency: _, theta: m };
  },
  g2 = (e) => {
    var {
        cx: t,
        cy: n,
        innerRadius: a,
        outerRadius: u,
        startAngle: o,
        endAngle: s,
      } = e,
      f = z4(o, s),
      d = o + f,
      h = Ut(t, n, u, o),
      m = Ut(t, n, u, d),
      p = at(
        nO ||
          (nO = oi([
            "M ",
            ",",
            `
    A `,
            ",",
            `,0,
    `,
            ",",
            `,
    `,
            ",",
            `
  `,
          ])),
        h.x,
        h.y,
        u,
        u,
        +(Math.abs(f) > 180),
        +(o > d),
        m.x,
        m.y,
      );
    if (a > 0) {
      var g = Ut(t, n, a, o),
        b = Ut(t, n, a, d);
      p += at(
        rO ||
          (rO = oi([
            "L ",
            ",",
            `
            A `,
            ",",
            `,0,
            `,
            ",",
            `,
            `,
            ",",
            " Z",
          ])),
        b.x,
        b.y,
        a,
        a,
        +(Math.abs(f) > 180),
        +(o <= d),
        g.x,
        g.y,
      );
    } else p += at(aO || (aO = oi(["L ", ",", " Z"])), t, n);
    return p;
  },
  k4 = (e) => {
    var {
        cx: t,
        cy: n,
        innerRadius: a,
        outerRadius: u,
        cornerRadius: o,
        forceCornerRadius: s,
        cornerIsExternal: f,
        startAngle: d,
        endAngle: h,
      } = e,
      m = qn(h - d),
      {
        circleTangency: p,
        lineTangency: g,
        theta: b,
      } = rs({
        cx: t,
        cy: n,
        radius: u,
        angle: d,
        sign: m,
        cornerRadius: o,
        cornerIsExternal: f,
      }),
      {
        circleTangency: S,
        lineTangency: _,
        theta: O,
      } = rs({
        cx: t,
        cy: n,
        radius: u,
        angle: h,
        sign: -m,
        cornerRadius: o,
        cornerIsExternal: f,
      }),
      E = f ? Math.abs(d - h) : Math.abs(d - h) - b - O;
    if (E < 0)
      return s
        ? at(
            iO ||
              (iO = oi([
                "M ",
                ",",
                `
        a`,
                ",",
                ",0,0,1,",
                `,0
        a`,
                ",",
                ",0,0,1,",
                `,0
      `,
              ])),
            g.x,
            g.y,
            o,
            o,
            o * 2,
            o,
            o,
            -o * 2,
          )
        : g2({
            cx: t,
            cy: n,
            innerRadius: a,
            outerRadius: u,
            startAngle: d,
            endAngle: h,
          });
    var C = at(
      lO ||
        (lO = oi([
          "M ",
          ",",
          `
    A`,
          ",",
          ",0,0,",
          ",",
          ",",
          `
    A`,
          ",",
          ",0,",
          ",",
          ",",
          ",",
          `
    A`,
          ",",
          ",0,0,",
          ",",
          ",",
          `
  `,
        ])),
      g.x,
      g.y,
      o,
      o,
      +(m < 0),
      p.x,
      p.y,
      u,
      u,
      +(E > 180),
      +(m < 0),
      S.x,
      S.y,
      o,
      o,
      +(m < 0),
      _.x,
      _.y,
    );
    if (a > 0) {
      var {
          circleTangency: T,
          lineTangency: D,
          theta: M,
        } = rs({
          cx: t,
          cy: n,
          radius: a,
          angle: d,
          sign: m,
          isExternal: !0,
          cornerRadius: o,
          cornerIsExternal: f,
        }),
        {
          circleTangency: z,
          lineTangency: U,
          theta: V,
        } = rs({
          cx: t,
          cy: n,
          radius: a,
          angle: h,
          sign: -m,
          isExternal: !0,
          cornerRadius: o,
          cornerIsExternal: f,
        }),
        F = f ? Math.abs(d - h) : Math.abs(d - h) - M - V;
      if (F < 0 && o === 0)
        return "".concat(C, "L").concat(t, ",").concat(n, "Z");
      C += at(
        uO ||
          (uO = oi([
            "L",
            ",",
            `
      A`,
            ",",
            ",0,0,",
            ",",
            ",",
            `
      A`,
            ",",
            ",0,",
            ",",
            ",",
            ",",
            `
      A`,
            ",",
            ",0,0,",
            ",",
            ",",
            "Z",
          ])),
        U.x,
        U.y,
        o,
        o,
        +(m < 0),
        z.x,
        z.y,
        a,
        a,
        +(F > 180),
        +(m > 0),
        T.x,
        T.y,
        o,
        o,
        +(m < 0),
        D.x,
        D.y,
      );
    } else C += at(oO || (oO = oi(["L", ",", "Z"])), t, n);
    return C;
  },
  R4 = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1,
  },
  b2 = (e) => {
    var t = cn(e, R4),
      {
        cx: n,
        cy: a,
        innerRadius: u,
        outerRadius: o,
        cornerRadius: s,
        forceCornerRadius: f,
        cornerIsExternal: d,
        startAngle: h,
        endAngle: m,
        className: p,
      } = t;
    if (o < u || h === m) return null;
    var g = Ge("recharts-sector", p),
      b = o - u,
      S = Na(s, b, 0, !0),
      _;
    return (
      S > 0 && Math.abs(h - m) < 360
        ? (_ = k4({
            cx: n,
            cy: a,
            innerRadius: u,
            outerRadius: o,
            cornerRadius: Math.min(S, b / 2),
            forceCornerRadius: f,
            cornerIsExternal: d,
            startAngle: h,
            endAngle: m,
          }))
        : (_ = g2({
            cx: n,
            cy: a,
            innerRadius: u,
            outerRadius: o,
            startAngle: h,
            endAngle: m,
          })),
      w.createElement("path", Ty({}, Vt(t), { className: g, d: _ }))
    );
  };
function L4(e, t, n) {
  if (e === "horizontal")
    return [
      { x: t.x, y: n.top },
      { x: t.x, y: n.top + n.height },
    ];
  if (e === "vertical")
    return [
      { x: n.left, y: t.y },
      { x: n.left + n.width, y: t.y },
    ];
  if (JA(t)) {
    if (e === "centric") {
      var { cx: a, cy: u, innerRadius: o, outerRadius: s, angle: f } = t,
        d = Ut(a, u, o, f),
        h = Ut(a, u, s, f);
      return [
        { x: d.x, y: d.y },
        { x: h.x, y: h.y },
      ];
    }
    return p2(t);
  }
}
var Dm = {},
  Nm = {},
  Pm = {},
  cO;
function U4() {
  return (
    cO ||
      ((cO = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = sE();
        function n(a) {
          return t.isSymbol(a) ? NaN : Number(a);
        }
        e.toNumber = n;
      })(Pm)),
    Pm
  );
}
var sO;
function q4() {
  return (
    sO ||
      ((sO = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = U4();
        function n(a) {
          return a
            ? ((a = t.toNumber(a)),
              a === 1 / 0 || a === -1 / 0
                ? (a < 0 ? -1 : 1) * Number.MAX_VALUE
                : a === a
                  ? a
                  : 0)
            : a === 0
              ? a
              : 0;
        }
        e.toFinite = n;
      })(Nm)),
    Nm
  );
}
var fO;
function B4() {
  return (
    fO ||
      ((fO = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        const t = fE(),
          n = q4();
        function a(u, o, s) {
          (s &&
            typeof s != "number" &&
            t.isIterateeCall(u, o, s) &&
            (o = s = void 0),
            (u = n.toFinite(u)),
            o === void 0 ? ((o = u), (u = 0)) : (o = n.toFinite(o)),
            (s = s === void 0 ? (u < o ? 1 : -1) : n.toFinite(s)));
          const f = Math.max(Math.ceil((o - u) / (s || 1)), 0),
            d = new Array(f);
          for (let h = 0; h < f; h++) ((d[h] = u), (u += s));
          return d;
        }
        e.range = a;
      })(Dm)),
    Dm
  );
}
var zm, dO;
function H4() {
  return (dO || ((dO = 1), (zm = B4().range)), zm);
}
var I4 = H4();
const x2 = Pa(I4);
var za = (e) => e.chartData,
  $4 = $([za], (e) => {
    var t = e.chartData != null ? e.chartData.length - 1 : 0;
    return {
      chartData: e.chartData,
      computedData: e.computedData,
      dataEndIndex: t,
      dataStartIndex: 0,
    };
  }),
  yp = (e, t, n, a) => (a ? $4(e) : za(e));
function or(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, n] = e;
    if (ke(t) && ke(n)) return !0;
  }
  return !1;
}
function vO(e, t, n) {
  return n ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function S2(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var [n, a] = e,
      u,
      o;
    if (ke(n)) u = n;
    else if (typeof n == "function") return;
    if (ke(a)) o = a;
    else if (typeof a == "function") return;
    var s = [u, o];
    if (or(s)) return s;
  }
}
function Y4(e, t, n) {
  if (!(!n && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var a = e(t, n);
        if (or(a)) return vO(a, t, n);
      } catch {}
    if (Array.isArray(e) && e.length === 2) {
      var [u, o] = e,
        s,
        f;
      if (u === "auto") t != null && (s = Math.min(...t));
      else if (ve(u)) s = u;
      else if (typeof u == "function")
        try {
          t != null && (s = u(t?.[0]));
        } catch {}
      else if (typeof u == "string" && aw.test(u)) {
        var d = aw.exec(u);
        if (d == null || d[1] == null || t == null) s = void 0;
        else {
          var h = +d[1];
          s = t[0] - h;
        }
      } else s = t?.[0];
      if (o === "auto") t != null && (f = Math.max(...t));
      else if (ve(o)) f = o;
      else if (typeof o == "function")
        try {
          t != null && (f = o(t?.[1]));
        } catch {}
      else if (typeof o == "string" && iw.test(o)) {
        var m = iw.exec(o);
        if (m == null || m[1] == null || t == null) f = void 0;
        else {
          var p = +m[1];
          f = t[1] + p;
        }
      } else f = t?.[1];
      var g = [s, f];
      if (or(g)) return t == null ? g : vO(g, t, n);
    }
  }
}
var Cl = 1e9,
  K4 = {
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
  },
  gp,
  Je = !0,
  In = "[DecimalError] ",
  vi = In + "Invalid argument: ",
  pp = In + "Exponent out of range: ",
  Dl = Math.floor,
  ui = Math.pow,
  G4 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Sn,
  wt = 1e7,
  We = 7,
  w2 = 9007199254740991,
  Is = Dl(w2 / We),
  se = {};
se.absoluteValue = se.abs = function () {
  var e = new this.constructor(this);
  return (e.s && (e.s = 1), e);
};
se.comparedTo = se.cmp = function (e) {
  var t,
    n,
    a,
    u,
    o = this;
  if (((e = new o.constructor(e)), o.s !== e.s)) return o.s || -e.s;
  if (o.e !== e.e) return (o.e > e.e) ^ (o.s < 0) ? 1 : -1;
  for (a = o.d.length, u = e.d.length, t = 0, n = a < u ? a : u; t < n; ++t)
    if (o.d[t] !== e.d[t]) return (o.d[t] > e.d[t]) ^ (o.s < 0) ? 1 : -1;
  return a === u ? 0 : (a > u) ^ (o.s < 0) ? 1 : -1;
};
se.decimalPlaces = se.dp = function () {
  var e = this,
    t = e.d.length - 1,
    n = (t - e.e) * We;
  if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) n--;
  return n < 0 ? 0 : n;
};
se.dividedBy = se.div = function (e) {
  return Lr(this, new this.constructor(e));
};
se.dividedToIntegerBy = se.idiv = function (e) {
  var t = this,
    n = t.constructor;
  return Ke(Lr(t, new n(e), 0, 1), n.precision);
};
se.equals = se.eq = function (e) {
  return !this.cmp(e);
};
se.exponent = function () {
  return ft(this);
};
se.greaterThan = se.gt = function (e) {
  return this.cmp(e) > 0;
};
se.greaterThanOrEqualTo = se.gte = function (e) {
  return this.cmp(e) >= 0;
};
se.isInteger = se.isint = function () {
  return this.e > this.d.length - 2;
};
se.isNegative = se.isneg = function () {
  return this.s < 0;
};
se.isPositive = se.ispos = function () {
  return this.s > 0;
};
se.isZero = function () {
  return this.s === 0;
};
se.lessThan = se.lt = function (e) {
  return this.cmp(e) < 0;
};
se.lessThanOrEqualTo = se.lte = function (e) {
  return this.cmp(e) < 1;
};
se.logarithm = se.log = function (e) {
  var t,
    n = this,
    a = n.constructor,
    u = a.precision,
    o = u + 5;
  if (e === void 0) e = new a(10);
  else if (((e = new a(e)), e.s < 1 || e.eq(Sn))) throw Error(In + "NaN");
  if (n.s < 1) throw Error(In + (n.s ? "NaN" : "-Infinity"));
  return n.eq(Sn)
    ? new a(0)
    : ((Je = !1), (t = Lr(ao(n, o), ao(e, o), o)), (Je = !0), Ke(t, u));
};
se.minus = se.sub = function (e) {
  var t = this;
  return (
    (e = new t.constructor(e)),
    t.s == e.s ? A2(t, e) : O2(t, ((e.s = -e.s), e))
  );
};
se.modulo = se.mod = function (e) {
  var t,
    n = this,
    a = n.constructor,
    u = a.precision;
  if (((e = new a(e)), !e.s)) throw Error(In + "NaN");
  return n.s
    ? ((Je = !1), (t = Lr(n, e, 0, 1).times(e)), (Je = !0), n.minus(t))
    : Ke(new a(n), u);
};
se.naturalExponential = se.exp = function () {
  return _2(this);
};
se.naturalLogarithm = se.ln = function () {
  return ao(this);
};
se.negated = se.neg = function () {
  var e = new this.constructor(this);
  return ((e.s = -e.s || 0), e);
};
se.plus = se.add = function (e) {
  var t = this;
  return (
    (e = new t.constructor(e)),
    t.s == e.s ? O2(t, e) : A2(t, ((e.s = -e.s), e))
  );
};
se.precision = se.sd = function (e) {
  var t,
    n,
    a,
    u = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(vi + e);
  if (
    ((t = ft(u) + 1), (a = u.d.length - 1), (n = a * We + 1), (a = u.d[a]), a)
  ) {
    for (; a % 10 == 0; a /= 10) n--;
    for (a = u.d[0]; a >= 10; a /= 10) n++;
  }
  return e && t > n ? t : n;
};
se.squareRoot = se.sqrt = function () {
  var e,
    t,
    n,
    a,
    u,
    o,
    s,
    f = this,
    d = f.constructor;
  if (f.s < 1) {
    if (!f.s) return new d(0);
    throw Error(In + "NaN");
  }
  for (
    e = ft(f),
      Je = !1,
      u = Math.sqrt(+f),
      u == 0 || u == 1 / 0
        ? ((t = ur(f.d)),
          (t.length + e) % 2 == 0 && (t += "0"),
          (u = Math.sqrt(t)),
          (e = Dl((e + 1) / 2) - (e < 0 || e % 2)),
          u == 1 / 0
            ? (t = "5e" + e)
            : ((t = u.toExponential()),
              (t = t.slice(0, t.indexOf("e") + 1) + e)),
          (a = new d(t)))
        : (a = new d(u.toString())),
      n = d.precision,
      u = s = n + 3;
    ;
  )
    if (
      ((o = a),
      (a = o.plus(Lr(f, o, s + 2)).times(0.5)),
      ur(o.d).slice(0, s) === (t = ur(a.d)).slice(0, s))
    ) {
      if (((t = t.slice(s - 3, s + 1)), u == s && t == "4999")) {
        if ((Ke(o, n + 1, 0), o.times(o).eq(f))) {
          a = o;
          break;
        }
      } else if (t != "9999") break;
      s += 4;
    }
  return ((Je = !0), Ke(a, n));
};
se.times = se.mul = function (e) {
  var t,
    n,
    a,
    u,
    o,
    s,
    f,
    d,
    h,
    m = this,
    p = m.constructor,
    g = m.d,
    b = (e = new p(e)).d;
  if (!m.s || !e.s) return new p(0);
  for (
    e.s *= m.s,
      n = m.e + e.e,
      d = g.length,
      h = b.length,
      d < h && ((o = g), (g = b), (b = o), (s = d), (d = h), (h = s)),
      o = [],
      s = d + h,
      a = s;
    a--;
  )
    o.push(0);
  for (a = h; --a >= 0; ) {
    for (t = 0, u = d + a; u > a; )
      ((f = o[u] + b[a] * g[u - a - 1] + t),
        (o[u--] = (f % wt) | 0),
        (t = (f / wt) | 0));
    o[u] = ((o[u] + t) % wt) | 0;
  }
  for (; !o[--s]; ) o.pop();
  return (
    t ? ++n : o.shift(),
    (e.d = o),
    (e.e = n),
    Je ? Ke(e, p.precision) : e
  );
};
se.toDecimalPlaces = se.todp = function (e, t) {
  var n = this,
    a = n.constructor;
  return (
    (n = new a(n)),
    e === void 0
      ? n
      : (vr(e, 0, Cl),
        t === void 0 ? (t = a.rounding) : vr(t, 0, 8),
        Ke(n, e + ft(n) + 1, t))
  );
};
se.toExponential = function (e, t) {
  var n,
    a = this,
    u = a.constructor;
  return (
    e === void 0
      ? (n = xi(a, !0))
      : (vr(e, 0, Cl),
        t === void 0 ? (t = u.rounding) : vr(t, 0, 8),
        (a = Ke(new u(a), e + 1, t)),
        (n = xi(a, !0, e + 1))),
    n
  );
};
se.toFixed = function (e, t) {
  var n,
    a,
    u = this,
    o = u.constructor;
  return e === void 0
    ? xi(u)
    : (vr(e, 0, Cl),
      t === void 0 ? (t = o.rounding) : vr(t, 0, 8),
      (a = Ke(new o(u), e + ft(u) + 1, t)),
      (n = xi(a.abs(), !1, e + ft(a) + 1)),
      u.isneg() && !u.isZero() ? "-" + n : n);
};
se.toInteger = se.toint = function () {
  var e = this,
    t = e.constructor;
  return Ke(new t(e), ft(e) + 1, t.rounding);
};
se.toNumber = function () {
  return +this;
};
se.toPower = se.pow = function (e) {
  var t,
    n,
    a,
    u,
    o,
    s,
    f = this,
    d = f.constructor,
    h = 12,
    m = +(e = new d(e));
  if (!e.s) return new d(Sn);
  if (((f = new d(f)), !f.s)) {
    if (e.s < 1) throw Error(In + "Infinity");
    return f;
  }
  if (f.eq(Sn)) return f;
  if (((a = d.precision), e.eq(Sn))) return Ke(f, a);
  if (((t = e.e), (n = e.d.length - 1), (s = t >= n), (o = f.s), s)) {
    if ((n = m < 0 ? -m : m) <= w2) {
      for (
        u = new d(Sn), t = Math.ceil(a / We + 4), Je = !1;
        n % 2 && ((u = u.times(f)), mO(u.d, t)), (n = Dl(n / 2)), n !== 0;
      )
        ((f = f.times(f)), mO(f.d, t));
      return ((Je = !0), e.s < 0 ? new d(Sn).div(u) : Ke(u, a));
    }
  } else if (o < 0) throw Error(In + "NaN");
  return (
    (o = o < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1),
    (f.s = 1),
    (Je = !1),
    (u = e.times(ao(f, a + h))),
    (Je = !0),
    (u = _2(u)),
    (u.s = o),
    u
  );
};
se.toPrecision = function (e, t) {
  var n,
    a,
    u = this,
    o = u.constructor;
  return (
    e === void 0
      ? ((n = ft(u)), (a = xi(u, n <= o.toExpNeg || n >= o.toExpPos)))
      : (vr(e, 1, Cl),
        t === void 0 ? (t = o.rounding) : vr(t, 0, 8),
        (u = Ke(new o(u), e, t)),
        (n = ft(u)),
        (a = xi(u, e <= n || n <= o.toExpNeg, e))),
    a
  );
};
se.toSignificantDigits = se.tosd = function (e, t) {
  var n = this,
    a = n.constructor;
  return (
    e === void 0
      ? ((e = a.precision), (t = a.rounding))
      : (vr(e, 1, Cl), t === void 0 ? (t = a.rounding) : vr(t, 0, 8)),
    Ke(new a(n), e, t)
  );
};
se.toString =
  se.valueOf =
  se.val =
  se.toJSON =
  se[Symbol.for("nodejs.util.inspect.custom")] =
    function () {
      var e = this,
        t = ft(e),
        n = e.constructor;
      return xi(e, t <= n.toExpNeg || t >= n.toExpPos);
    };
function O2(e, t) {
  var n,
    a,
    u,
    o,
    s,
    f,
    d,
    h,
    m = e.constructor,
    p = m.precision;
  if (!e.s || !t.s) return (t.s || (t = new m(e)), Je ? Ke(t, p) : t);
  if (
    ((d = e.d),
    (h = t.d),
    (s = e.e),
    (u = t.e),
    (d = d.slice()),
    (o = s - u),
    o)
  ) {
    for (
      o < 0
        ? ((a = d), (o = -o), (f = h.length))
        : ((a = h), (u = s), (f = d.length)),
        s = Math.ceil(p / We),
        f = s > f ? s + 1 : f + 1,
        o > f && ((o = f), (a.length = 1)),
        a.reverse();
      o--;
    )
      a.push(0);
    a.reverse();
  }
  for (
    f = d.length,
      o = h.length,
      f - o < 0 && ((o = f), (a = h), (h = d), (d = a)),
      n = 0;
    o;
  )
    ((n = ((d[--o] = d[o] + h[o] + n) / wt) | 0), (d[o] %= wt));
  for (n && (d.unshift(n), ++u), f = d.length; d[--f] == 0; ) d.pop();
  return ((t.d = d), (t.e = u), Je ? Ke(t, p) : t);
}
function vr(e, t, n) {
  if (e !== ~~e || e < t || e > n) throw Error(vi + e);
}
function ur(e) {
  var t,
    n,
    a,
    u = e.length - 1,
    o = "",
    s = e[0];
  if (u > 0) {
    for (o += s, t = 1; t < u; t++)
      ((a = e[t] + ""), (n = We - a.length), n && (o += Ea(n)), (o += a));
    ((s = e[t]), (a = s + ""), (n = We - a.length), n && (o += Ea(n)));
  } else if (s === 0) return "0";
  for (; s % 10 === 0; ) s /= 10;
  return o + s;
}
var Lr = (function () {
  function e(a, u) {
    var o,
      s = 0,
      f = a.length;
    for (a = a.slice(); f--; )
      ((o = a[f] * u + s), (a[f] = (o % wt) | 0), (s = (o / wt) | 0));
    return (s && a.unshift(s), a);
  }
  function t(a, u, o, s) {
    var f, d;
    if (o != s) d = o > s ? 1 : -1;
    else
      for (f = d = 0; f < o; f++)
        if (a[f] != u[f]) {
          d = a[f] > u[f] ? 1 : -1;
          break;
        }
    return d;
  }
  function n(a, u, o) {
    for (var s = 0; o--; )
      ((a[o] -= s), (s = a[o] < u[o] ? 1 : 0), (a[o] = s * wt + a[o] - u[o]));
    for (; !a[0] && a.length > 1; ) a.shift();
  }
  return function (a, u, o, s) {
    var f,
      d,
      h,
      m,
      p,
      g,
      b,
      S,
      _,
      O,
      E,
      C,
      T,
      D,
      M,
      z,
      U,
      V,
      F = a.constructor,
      ae = a.s == u.s ? 1 : -1,
      ne = a.d,
      K = u.d;
    if (!a.s) return new F(a);
    if (!u.s) throw Error(In + "Division by zero");
    for (
      d = a.e - u.e,
        U = K.length,
        M = ne.length,
        b = new F(ae),
        S = b.d = [],
        h = 0;
      K[h] == (ne[h] || 0);
    )
      ++h;
    if (
      (K[h] > (ne[h] || 0) && --d,
      o == null
        ? (C = o = F.precision)
        : s
          ? (C = o + (ft(a) - ft(u)) + 1)
          : (C = o),
      C < 0)
    )
      return new F(0);
    if (((C = (C / We + 2) | 0), (h = 0), U == 1))
      for (m = 0, K = K[0], C++; (h < M || m) && C--; h++)
        ((T = m * wt + (ne[h] || 0)), (S[h] = (T / K) | 0), (m = (T % K) | 0));
    else {
      for (
        m = (wt / (K[0] + 1)) | 0,
          m > 1 &&
            ((K = e(K, m)), (ne = e(ne, m)), (U = K.length), (M = ne.length)),
          D = U,
          _ = ne.slice(0, U),
          O = _.length;
        O < U;
      )
        _[O++] = 0;
      ((V = K.slice()), V.unshift(0), (z = K[0]), K[1] >= wt / 2 && ++z);
      do
        ((m = 0),
          (f = t(K, _, U, O)),
          f < 0
            ? ((E = _[0]),
              U != O && (E = E * wt + (_[1] || 0)),
              (m = (E / z) | 0),
              m > 1
                ? (m >= wt && (m = wt - 1),
                  (p = e(K, m)),
                  (g = p.length),
                  (O = _.length),
                  (f = t(p, _, g, O)),
                  f == 1 && (m--, n(p, U < g ? V : K, g)))
                : (m == 0 && (f = m = 1), (p = K.slice())),
              (g = p.length),
              g < O && p.unshift(0),
              n(_, p, O),
              f == -1 &&
                ((O = _.length),
                (f = t(K, _, U, O)),
                f < 1 && (m++, n(_, U < O ? V : K, O))),
              (O = _.length))
            : f === 0 && (m++, (_ = [0])),
          (S[h++] = m),
          f && _[0] ? (_[O++] = ne[D] || 0) : ((_ = [ne[D]]), (O = 1)));
      while ((D++ < M || _[0] !== void 0) && C--);
    }
    return (S[0] || S.shift(), (b.e = d), Ke(b, s ? o + ft(b) + 1 : o));
  };
})();
function _2(e, t) {
  var n,
    a,
    u,
    o,
    s,
    f,
    d = 0,
    h = 0,
    m = e.constructor,
    p = m.precision;
  if (ft(e) > 16) throw Error(pp + ft(e));
  if (!e.s) return new m(Sn);
  for (Je = !1, f = p, s = new m(0.03125); e.abs().gte(0.1); )
    ((e = e.times(s)), (h += 5));
  for (
    a = ((Math.log(ui(2, h)) / Math.LN10) * 2 + 5) | 0,
      f += a,
      n = u = o = new m(Sn),
      m.precision = f;
    ;
  ) {
    if (
      ((u = Ke(u.times(e), f)),
      (n = n.times(++d)),
      (s = o.plus(Lr(u, n, f))),
      ur(s.d).slice(0, f) === ur(o.d).slice(0, f))
    ) {
      for (; h--; ) o = Ke(o.times(o), f);
      return ((m.precision = p), t == null ? ((Je = !0), Ke(o, p)) : o);
    }
    o = s;
  }
}
function ft(e) {
  for (var t = e.e * We, n = e.d[0]; n >= 10; n /= 10) t++;
  return t;
}
function km(e, t, n) {
  if (t > e.LN10.sd())
    throw (
      (Je = !0),
      n && (e.precision = n),
      Error(In + "LN10 precision limit exceeded")
    );
  return Ke(new e(e.LN10), t);
}
function Ea(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function ao(e, t) {
  var n,
    a,
    u,
    o,
    s,
    f,
    d,
    h,
    m,
    p = 1,
    g = 10,
    b = e,
    S = b.d,
    _ = b.constructor,
    O = _.precision;
  if (b.s < 1) throw Error(In + (b.s ? "NaN" : "-Infinity"));
  if (b.eq(Sn)) return new _(0);
  if ((t == null ? ((Je = !1), (h = O)) : (h = t), b.eq(10)))
    return (t == null && (Je = !0), km(_, h));
  if (
    ((h += g),
    (_.precision = h),
    (n = ur(S)),
    (a = n.charAt(0)),
    (o = ft(b)),
    Math.abs(o) < 15e14)
  ) {
    for (; (a < 7 && a != 1) || (a == 1 && n.charAt(1) > 3); )
      ((b = b.times(e)), (n = ur(b.d)), (a = n.charAt(0)), p++);
    ((o = ft(b)),
      a > 1 ? ((b = new _("0." + n)), o++) : (b = new _(a + "." + n.slice(1))));
  } else
    return (
      (d = km(_, h + 2, O).times(o + "")),
      (b = ao(new _(a + "." + n.slice(1)), h - g).plus(d)),
      (_.precision = O),
      t == null ? ((Je = !0), Ke(b, O)) : b
    );
  for (
    f = s = b = Lr(b.minus(Sn), b.plus(Sn), h), m = Ke(b.times(b), h), u = 3;
    ;
  ) {
    if (
      ((s = Ke(s.times(m), h)),
      (d = f.plus(Lr(s, new _(u), h))),
      ur(d.d).slice(0, h) === ur(f.d).slice(0, h))
    )
      return (
        (f = f.times(2)),
        o !== 0 && (f = f.plus(km(_, h + 2, O).times(o + ""))),
        (f = Lr(f, new _(p), h)),
        (_.precision = O),
        t == null ? ((Je = !0), Ke(f, O)) : f
      );
    ((f = d), (u += 2));
  }
}
function hO(e, t) {
  var n, a, u;
  for (
    (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (a = t.search(/e/i)) > 0
        ? (n < 0 && (n = a), (n += +t.slice(a + 1)), (t = t.substring(0, a)))
        : n < 0 && (n = t.length),
      a = 0;
    t.charCodeAt(a) === 48;
  )
    ++a;
  for (u = t.length; t.charCodeAt(u - 1) === 48; ) --u;
  if (((t = t.slice(a, u)), t)) {
    if (
      ((u -= a),
      (n = n - a - 1),
      (e.e = Dl(n / We)),
      (e.d = []),
      (a = (n + 1) % We),
      n < 0 && (a += We),
      a < u)
    ) {
      for (a && e.d.push(+t.slice(0, a)), u -= We; a < u; )
        e.d.push(+t.slice(a, (a += We)));
      ((t = t.slice(a)), (a = We - t.length));
    } else a -= u;
    for (; a--; ) t += "0";
    if ((e.d.push(+t), Je && (e.e > Is || e.e < -Is))) throw Error(pp + n);
  } else ((e.s = 0), (e.e = 0), (e.d = [0]));
  return e;
}
function Ke(e, t, n) {
  var a,
    u,
    o,
    s,
    f,
    d,
    h,
    m,
    p = e.d;
  for (s = 1, o = p[0]; o >= 10; o /= 10) s++;
  if (((a = t - s), a < 0)) ((a += We), (u = t), (h = p[(m = 0)]));
  else {
    if (((m = Math.ceil((a + 1) / We)), (o = p.length), m >= o)) return e;
    for (h = o = p[m], s = 1; o >= 10; o /= 10) s++;
    ((a %= We), (u = a - We + s));
  }
  if (
    (n !== void 0 &&
      ((o = ui(10, s - u - 1)),
      (f = ((h / o) % 10) | 0),
      (d = t < 0 || p[m + 1] !== void 0 || h % o),
      (d =
        n < 4
          ? (f || d) && (n == 0 || n == (e.s < 0 ? 3 : 2))
          : f > 5 ||
            (f == 5 &&
              (n == 4 ||
                d ||
                (n == 6 &&
                  ((a > 0 ? (u > 0 ? h / ui(10, s - u) : 0) : p[m - 1]) % 10) &
                    1) ||
                n == (e.s < 0 ? 8 : 7))))),
    t < 1 || !p[0])
  )
    return (
      d
        ? ((o = ft(e)),
          (p.length = 1),
          (t = t - o - 1),
          (p[0] = ui(10, (We - (t % We)) % We)),
          (e.e = Dl(-t / We) || 0))
        : ((p.length = 1), (p[0] = e.e = e.s = 0)),
      e
    );
  if (
    (a == 0
      ? ((p.length = m), (o = 1), m--)
      : ((p.length = m + 1),
        (o = ui(10, We - a)),
        (p[m] = u > 0 ? (((h / ui(10, s - u)) % ui(10, u)) | 0) * o : 0)),
    d)
  )
    for (;;)
      if (m == 0) {
        (p[0] += o) == wt && ((p[0] = 1), ++e.e);
        break;
      } else {
        if (((p[m] += o), p[m] != wt)) break;
        ((p[m--] = 0), (o = 1));
      }
  for (a = p.length; p[--a] === 0; ) p.pop();
  if (Je && (e.e > Is || e.e < -Is)) throw Error(pp + ft(e));
  return e;
}
function A2(e, t) {
  var n,
    a,
    u,
    o,
    s,
    f,
    d,
    h,
    m,
    p,
    g = e.constructor,
    b = g.precision;
  if (!e.s || !t.s)
    return (t.s ? (t.s = -t.s) : (t = new g(e)), Je ? Ke(t, b) : t);
  if (
    ((d = e.d),
    (p = t.d),
    (a = t.e),
    (h = e.e),
    (d = d.slice()),
    (s = h - a),
    s)
  ) {
    for (
      m = s < 0,
        m
          ? ((n = d), (s = -s), (f = p.length))
          : ((n = p), (a = h), (f = d.length)),
        u = Math.max(Math.ceil(b / We), f) + 2,
        s > u && ((s = u), (n.length = 1)),
        n.reverse(),
        u = s;
      u--;
    )
      n.push(0);
    n.reverse();
  } else {
    for (u = d.length, f = p.length, m = u < f, m && (f = u), u = 0; u < f; u++)
      if (d[u] != p[u]) {
        m = d[u] < p[u];
        break;
      }
    s = 0;
  }
  for (
    m && ((n = d), (d = p), (p = n), (t.s = -t.s)),
      f = d.length,
      u = p.length - f;
    u > 0;
    --u
  )
    d[f++] = 0;
  for (u = p.length; u > s; ) {
    if (d[--u] < p[u]) {
      for (o = u; o && d[--o] === 0; ) d[o] = wt - 1;
      (--d[o], (d[u] += wt));
    }
    d[u] -= p[u];
  }
  for (; d[--f] === 0; ) d.pop();
  for (; d[0] === 0; d.shift()) --a;
  return d[0] ? ((t.d = d), (t.e = a), Je ? Ke(t, b) : t) : new g(0);
}
function xi(e, t, n) {
  var a,
    u = ft(e),
    o = ur(e.d),
    s = o.length;
  return (
    t
      ? (n && (a = n - s) > 0
          ? (o = o.charAt(0) + "." + o.slice(1) + Ea(a))
          : s > 1 && (o = o.charAt(0) + "." + o.slice(1)),
        (o = o + (u < 0 ? "e" : "e+") + u))
      : u < 0
        ? ((o = "0." + Ea(-u - 1) + o), n && (a = n - s) > 0 && (o += Ea(a)))
        : u >= s
          ? ((o += Ea(u + 1 - s)),
            n && (a = n - u - 1) > 0 && (o = o + "." + Ea(a)))
          : ((a = u + 1) < s && (o = o.slice(0, a) + "." + o.slice(a)),
            n && (a = n - s) > 0 && (u + 1 === s && (o += "."), (o += Ea(a)))),
    e.s < 0 ? "-" + o : o
  );
}
function mO(e, t) {
  if (e.length > t) return ((e.length = t), !0);
}
function E2(e) {
  var t, n, a;
  function u(o) {
    var s = this;
    if (!(s instanceof u)) return new u(o);
    if (((s.constructor = u), o instanceof u)) {
      ((s.s = o.s), (s.e = o.e), (s.d = (o = o.d) ? o.slice() : o));
      return;
    }
    if (typeof o == "number") {
      if (o * 0 !== 0) throw Error(vi + o);
      if (o > 0) s.s = 1;
      else if (o < 0) ((o = -o), (s.s = -1));
      else {
        ((s.s = 0), (s.e = 0), (s.d = [0]));
        return;
      }
      if (o === ~~o && o < 1e7) {
        ((s.e = 0), (s.d = [o]));
        return;
      }
      return hO(s, o.toString());
    } else if (typeof o != "string") throw Error(vi + o);
    if (
      (o.charCodeAt(0) === 45 ? ((o = o.slice(1)), (s.s = -1)) : (s.s = 1),
      G4.test(o))
    )
      hO(s, o);
    else throw Error(vi + o);
  }
  if (
    ((u.prototype = se),
    (u.ROUND_UP = 0),
    (u.ROUND_DOWN = 1),
    (u.ROUND_CEIL = 2),
    (u.ROUND_FLOOR = 3),
    (u.ROUND_HALF_UP = 4),
    (u.ROUND_HALF_DOWN = 5),
    (u.ROUND_HALF_EVEN = 6),
    (u.ROUND_HALF_CEIL = 7),
    (u.ROUND_HALF_FLOOR = 8),
    (u.clone = E2),
    (u.config = u.set = X4),
    e === void 0 && (e = {}),
    e)
  )
    for (
      a = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0;
      t < a.length;
    )
      e.hasOwnProperty((n = a[t++])) || (e[n] = this[n]);
  return (u.config(e), u);
}
function X4(e) {
  if (!e || typeof e != "object") throw Error(In + "Object expected");
  var t,
    n,
    a,
    u = [
      "precision",
      1,
      Cl,
      "rounding",
      0,
      8,
      "toExpNeg",
      -1 / 0,
      0,
      "toExpPos",
      0,
      1 / 0,
    ];
  for (t = 0; t < u.length; t += 3)
    if ((a = e[(n = u[t])]) !== void 0)
      if (Dl(a) === a && a >= u[t + 1] && a <= u[t + 2]) this[n] = a;
      else throw Error(vi + n + ": " + a);
  if ((a = e[(n = "LN10")]) !== void 0)
    if (a == Math.LN10) this[n] = new this(a);
    else throw Error(vi + n + ": " + a);
  return this;
}
var gp = E2(K4);
Sn = new gp(1);
const Ce = gp;
function j2(e) {
  var t;
  return (
    e === 0
      ? (t = 1)
      : (t = Math.floor(new Ce(e).abs().log(10).toNumber()) + 1),
    t
  );
}
function T2(e, t, n) {
  for (var a = new Ce(e), u = 0, o = []; a.lt(t) && u < 1e5; )
    (o.push(a.toNumber()), (a = a.add(n)), u++);
  return o;
}
var M2 = (e) => {
    var [t, n] = e,
      [a, u] = [t, n];
    return (t > n && ([a, u] = [n, t]), [a, u]);
  },
  bp = (e, t, n) => {
    if (e.lte(0)) return new Ce(0);
    var a = j2(e.toNumber()),
      u = new Ce(10).pow(a),
      o = e.div(u),
      s = a !== 1 ? 0.05 : 0.1,
      f = new Ce(Math.ceil(o.div(s).toNumber())).add(n).mul(s),
      d = f.mul(u);
    return t ? new Ce(d.toNumber()) : new Ce(Math.ceil(d.toNumber()));
  },
  C2 = (e, t, n) => {
    var a;
    if (e.lte(0)) return new Ce(0);
    var u = [1, 2, 2.5, 5],
      o = e.toNumber(),
      s = Math.floor(new Ce(o).abs().log(10).toNumber()),
      f = new Ce(10).pow(s),
      d = e.div(f).toNumber(),
      h = u.findIndex((b) => b >= d - 1e-10);
    if ((h === -1 && ((f = f.mul(10)), (h = 0)), (h += n), h >= u.length)) {
      var m = Math.floor(h / u.length);
      ((h %= u.length), (f = f.mul(new Ce(10).pow(m))));
    }
    var p = (a = u[h]) !== null && a !== void 0 ? a : 1,
      g = new Ce(p).mul(f);
    return t ? g : new Ce(Math.ceil(g.toNumber()));
  },
  V4 = (e, t, n) => {
    var a = new Ce(1),
      u = new Ce(e);
    if (!u.isint() && n) {
      var o = Math.abs(e);
      o < 1
        ? ((a = new Ce(10).pow(j2(e) - 1)),
          (u = new Ce(Math.floor(u.div(a).toNumber())).mul(a)))
        : o > 1 && (u = new Ce(Math.floor(e)));
    } else
      e === 0
        ? (u = new Ce(Math.floor((t - 1) / 2)))
        : n || (u = new Ce(Math.floor(e)));
    for (var s = Math.floor((t - 1) / 2), f = [], d = 0; d < t; d++)
      f.push(u.add(new Ce(d - s).mul(a)).toNumber());
    return f;
  },
  D2 = function (t, n, a, u) {
    var o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0,
      s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : bp;
    if (!Number.isFinite((n - t) / (a - 1)))
      return { step: new Ce(0), tickMin: new Ce(0), tickMax: new Ce(0) };
    var f = s(new Ce(n).sub(t).div(a - 1), u, o),
      d;
    t <= 0 && n >= 0
      ? (d = new Ce(0))
      : ((d = new Ce(t).add(n).div(2)), (d = d.sub(new Ce(d).mod(f))));
    var h = Math.ceil(d.sub(t).div(f).toNumber()),
      m = Math.ceil(new Ce(n).sub(d).div(f).toNumber()),
      p = h + m + 1;
    return p > a
      ? D2(t, n, a, u, o + 1, s)
      : (p < a &&
          ((m = n > 0 ? m + (a - p) : m), (h = n > 0 ? h : h + (a - p))),
        {
          step: f,
          tickMin: d.sub(new Ce(h).mul(f)),
          tickMax: d.add(new Ce(m).mul(f)),
        });
  },
  yO = function (t) {
    var [n, a] = t,
      u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
      o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
      s =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto",
      f = Math.max(u, 2),
      [d, h] = M2([n, a]);
    if (d === -1 / 0 || h === 1 / 0) {
      var m =
        h === 1 / 0
          ? [d, ...Array(u - 1).fill(1 / 0)]
          : [...Array(u - 1).fill(-1 / 0), h];
      return n > a ? m.reverse() : m;
    }
    if (d === h) return V4(d, u, o);
    var p = s === "snap125" ? C2 : bp,
      { step: g, tickMin: b, tickMax: S } = D2(d, h, f, o, 0, p),
      _ = T2(b, S.add(new Ce(0.1).mul(g)), g);
    return n > a ? _.reverse() : _;
  },
  pO = function (t, n) {
    var [a, u] = t,
      o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
      s =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto",
      [f, d] = M2([a, u]);
    if (f === -1 / 0 || d === 1 / 0) return [a, u];
    if (f === d) return [f];
    var h = s === "snap125" ? C2 : bp,
      m = Math.max(n, 2),
      p = h(new Ce(d).sub(f).div(m - 1), o, 0),
      g = [...T2(new Ce(f), new Ce(d), p), d];
    return (
      o === !1 && (g = g.map((b) => Math.round(b))),
      a > u ? g.reverse() : g
    );
  },
  Z4 = (e) => e.rootProps.barCategoryGap,
  qf = (e) => e.rootProps.stackOffset,
  N2 = (e) => e.rootProps.reverseStackOrder,
  xp = (e) => e.options.chartName,
  Sp = (e) => e.rootProps.syncId,
  P2 = (e) => e.rootProps.syncMethod,
  wp = (e) => e.options.eventEmitter,
  Gt = {
    grid: -100,
    barBackground: -50,
    area: 100,
    cursorRectangle: 200,
    bar: 300,
    line: 400,
    axis: 500,
    scatter: 600,
    activeBar: 1e3,
    cursorLine: 1100,
    activeDot: 1200,
    label: 2e3,
  },
  ti = {
    allowDecimals: !1,
    allowDataOverflow: !1,
    angleAxisId: 0,
    reversed: !1,
    scale: "auto",
    tick: !0,
    type: "auto",
  },
  rr = {
    allowDataOverflow: !1,
    allowDecimals: !1,
    allowDuplicatedCategory: !0,
    includeHidden: !1,
    radiusAxisId: 0,
    reversed: !1,
    scale: "auto",
    tick: !0,
    tickCount: 5,
    type: "auto",
  },
  Bf = (e, t) => {
    if (!(!e || !t)) return e != null && e.reversed ? [t[1], t[0]] : t;
  };
function Hf(e, t, n) {
  if (n !== "auto") return n;
  if (e != null) return Gr(e, t) ? "category" : "number";
}
function gO(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function $s(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? gO(Object(n), !0).forEach(function (a) {
          Q4(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : gO(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function Q4(e, t, n) {
  return (
    (t = W4(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function W4(e) {
  var t = F4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function F4(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bO = {
    allowDataOverflow: ti.allowDataOverflow,
    allowDecimals: ti.allowDecimals,
    allowDuplicatedCategory: !1,
    dataKey: void 0,
    domain: void 0,
    id: ti.angleAxisId,
    includeHidden: !1,
    name: void 0,
    reversed: ti.reversed,
    scale: ti.scale,
    tick: ti.tick,
    tickCount: void 0,
    ticks: void 0,
    type: ti.type,
    unit: void 0,
    niceTicks: "auto",
  },
  xO = {
    allowDataOverflow: rr.allowDataOverflow,
    allowDecimals: rr.allowDecimals,
    allowDuplicatedCategory: rr.allowDuplicatedCategory,
    dataKey: void 0,
    domain: void 0,
    id: rr.radiusAxisId,
    includeHidden: rr.includeHidden,
    name: void 0,
    reversed: rr.reversed,
    scale: rr.scale,
    tick: rr.tick,
    tickCount: rr.tickCount,
    ticks: void 0,
    type: rr.type,
    unit: void 0,
    niceTicks: "auto",
  },
  J4 = (e, t) => {
    if (t != null) return e.polarAxis.angleAxis[t];
  },
  Op = $([J4, t2], (e, t) => {
    var n;
    if (e != null) return e;
    var a =
      (n = Hf(t, "angleAxis", bO.type)) !== null && n !== void 0
        ? n
        : "category";
    return $s($s({}, bO), {}, { type: a });
  }),
  e6 = (e, t) => e.polarAxis.radiusAxis[t],
  _p = $([e6, t2], (e, t) => {
    var n;
    if (e != null) return e;
    var a =
      (n = Hf(t, "radiusAxis", xO.type)) !== null && n !== void 0
        ? n
        : "category";
    return $s($s({}, xO), {}, { type: a });
  }),
  If = (e) => e.polarOptions,
  Ap = $([Xr, Vr, Bt], T4),
  z2 = $([If, Ap], (e, t) => {
    if (e != null) return Na(e.innerRadius, t, 0);
  }),
  k2 = $([If, Ap], (e, t) => {
    if (e != null) return Na(e.outerRadius, t, t * 0.8);
  }),
  t6 = (e) => {
    if (e == null) return [0, 0];
    var { startAngle: t, endAngle: n } = e;
    return [t, n];
  },
  R2 = $([If], t6);
$([Op, R2], Bf);
var L2 = $([Ap, z2, k2], (e, t, n) => {
  if (!(e == null || t == null || n == null)) return [t, n];
});
$([_p, L2], Bf);
var U2 = $([et, If, z2, k2, Xr, Vr], (e, t, n, a, u, o) => {
    if (
      !(
        (e !== "centric" && e !== "radial") ||
        t == null ||
        n == null ||
        a == null
      )
    ) {
      var { cx: s, cy: f, startAngle: d, endAngle: h } = t;
      return {
        cx: Na(s, u, u / 2),
        cy: Na(f, o, o / 2),
        innerRadius: n,
        outerRadius: a,
        startAngle: d,
        endAngle: h,
        clockWise: !1,
      };
    }
  }),
  _t = (e, t) => t,
  $f = (e, t, n) => n;
function q2(e) {
  return e?.id;
}
function B2(e, t, n) {
  var { chartData: a = [] } = t,
    { allowDuplicatedCategory: u, dataKey: o } = n,
    s = new Map();
  return (
    e.forEach((f) => {
      var d,
        h = (d = f.data) !== null && d !== void 0 ? d : a;
      if (!(h == null || h.length === 0)) {
        var m = q2(f);
        h.forEach((p, g) => {
          var b = o == null || u ? g : String(qt(p, o, null)),
            S = qt(p, f.dataKey, 0),
            _;
          (s.has(b) ? (_ = s.get(b)) : (_ = {}),
            Object.assign(_, { [m]: S }),
            s.set(b, _));
        });
      }
    }),
    Array.from(s.values())
  );
}
function Ep(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var Yf = (e, t) =>
  e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function Kf(e, t) {
  return Array.isArray(e) &&
    Array.isArray(t) &&
    e.length === 0 &&
    t.length === 0
    ? !0
    : e === t;
}
function n6(e, t) {
  if (e.length === t.length) {
    for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  return !1;
}
var At = (e) => {
    var t = et(e);
    return t === "horizontal"
      ? "xAxis"
      : t === "vertical"
        ? "yAxis"
        : t === "centric"
          ? "angleAxis"
          : "radiusAxis";
  },
  Nl = (e) => e.tooltip.settings.axisId;
function jp(e) {
  if (e != null) {
    var t = e.ticks,
      n = e.bandwidth,
      a = e.range(),
      u = [Math.min(...a), Math.max(...a)];
    return {
      domain: () => e.domain(),
      range: (function (o) {
        function s() {
          return o.apply(this, arguments);
        }
        return (
          (s.toString = function () {
            return o.toString();
          }),
          s
        );
      })(() => u),
      rangeMin: () => u[0],
      rangeMax: () => u[1],
      isInRange(o) {
        var s = u[0],
          f = u[1];
        return s <= f ? o >= s && o <= f : o >= f && o <= s;
      },
      bandwidth: n ? () => n.call(e) : void 0,
      ticks: t ? (o) => t.call(e, o) : void 0,
      map: (o, s) => {
        var f = e(o);
        if (f != null) {
          if (e.bandwidth && s !== null && s !== void 0 && s.position) {
            var d = e.bandwidth();
            switch (s.position) {
              case "middle":
                f += d / 2;
                break;
              case "end":
                f += d;
                break;
            }
          }
          return f;
        }
      },
    };
  }
}
var r6 = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!or(t)) {
          for (var n, a, u = 0; u < t.length; u++) {
            var o = t[u];
            ke(o) &&
              ((n === void 0 || o < n) && (n = o),
              (a === void 0 || o > a) && (a = o));
          }
          return n !== void 0 && a !== void 0 ? [n, a] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function Ca(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
      ? -1
      : e > t
        ? 1
        : e >= t
          ? 0
          : NaN;
}
function a6(e, t) {
  return e == null || t == null
    ? NaN
    : t < e
      ? -1
      : t > e
        ? 1
        : t >= e
          ? 0
          : NaN;
}
function Tp(e) {
  let t, n, a;
  e.length !== 2
    ? ((t = Ca), (n = (f, d) => Ca(e(f), d)), (a = (f, d) => e(f) - d))
    : ((t = e === Ca || e === a6 ? e : i6), (n = e), (a = e));
  function u(f, d, h = 0, m = f.length) {
    if (h < m) {
      if (t(d, d) !== 0) return m;
      do {
        const p = (h + m) >>> 1;
        n(f[p], d) < 0 ? (h = p + 1) : (m = p);
      } while (h < m);
    }
    return h;
  }
  function o(f, d, h = 0, m = f.length) {
    if (h < m) {
      if (t(d, d) !== 0) return m;
      do {
        const p = (h + m) >>> 1;
        n(f[p], d) <= 0 ? (h = p + 1) : (m = p);
      } while (h < m);
    }
    return h;
  }
  function s(f, d, h = 0, m = f.length) {
    const p = u(f, d, h, m - 1);
    return p > h && a(f[p - 1], d) > -a(f[p], d) ? p - 1 : p;
  }
  return { left: u, center: s, right: o };
}
function i6() {
  return 0;
}
function H2(e) {
  return e === null ? NaN : +e;
}
function* l6(e, t) {
  for (let n of e) n != null && (n = +n) >= n && (yield n);
}
const u6 = Tp(Ca),
  So = u6.right;
Tp(H2).center;
class SO extends Map {
  constructor(t, n = s6) {
    if (
      (super(),
      Object.defineProperties(this, {
        _intern: { value: new Map() },
        _key: { value: n },
      }),
      t != null)
    )
      for (const [a, u] of t) this.set(a, u);
  }
  get(t) {
    return super.get(wO(this, t));
  }
  has(t) {
    return super.has(wO(this, t));
  }
  set(t, n) {
    return super.set(o6(this, t), n);
  }
  delete(t) {
    return super.delete(c6(this, t));
  }
}
function wO({ _intern: e, _key: t }, n) {
  const a = t(n);
  return e.has(a) ? e.get(a) : n;
}
function o6({ _intern: e, _key: t }, n) {
  const a = t(n);
  return e.has(a) ? e.get(a) : (e.set(a, n), n);
}
function c6({ _intern: e, _key: t }, n) {
  const a = t(n);
  return (e.has(a) && ((n = e.get(a)), e.delete(a)), n);
}
function s6(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function f6(e = Ca) {
  if (e === Ca) return I2;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, n) => {
    const a = e(t, n);
    return a || a === 0 ? a : (e(n, n) === 0) - (e(t, t) === 0);
  };
}
function I2(e, t) {
  return (
    (e == null || !(e >= e)) - (t == null || !(t >= t)) ||
    (e < t ? -1 : e > t ? 1 : 0)
  );
}
const d6 = Math.sqrt(50),
  v6 = Math.sqrt(10),
  h6 = Math.sqrt(2);
function Ys(e, t, n) {
  const a = (t - e) / Math.max(0, n),
    u = Math.floor(Math.log10(a)),
    o = a / Math.pow(10, u),
    s = o >= d6 ? 10 : o >= v6 ? 5 : o >= h6 ? 2 : 1;
  let f, d, h;
  return (
    u < 0
      ? ((h = Math.pow(10, -u) / s),
        (f = Math.round(e * h)),
        (d = Math.round(t * h)),
        f / h < e && ++f,
        d / h > t && --d,
        (h = -h))
      : ((h = Math.pow(10, u) * s),
        (f = Math.round(e / h)),
        (d = Math.round(t / h)),
        f * h < e && ++f,
        d * h > t && --d),
    d < f && 0.5 <= n && n < 2 ? Ys(e, t, n * 2) : [f, d, h]
  );
}
function My(e, t, n) {
  if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
  if (e === t) return [e];
  const a = t < e,
    [u, o, s] = a ? Ys(t, e, n) : Ys(e, t, n);
  if (!(o >= u)) return [];
  const f = o - u + 1,
    d = new Array(f);
  if (a)
    if (s < 0) for (let h = 0; h < f; ++h) d[h] = (o - h) / -s;
    else for (let h = 0; h < f; ++h) d[h] = (o - h) * s;
  else if (s < 0) for (let h = 0; h < f; ++h) d[h] = (u + h) / -s;
  else for (let h = 0; h < f; ++h) d[h] = (u + h) * s;
  return d;
}
function Cy(e, t, n) {
  return ((t = +t), (e = +e), (n = +n), Ys(e, t, n)[2]);
}
function Dy(e, t, n) {
  ((t = +t), (e = +e), (n = +n));
  const a = t < e,
    u = a ? Cy(t, e, n) : Cy(e, t, n);
  return (a ? -1 : 1) * (u < 0 ? 1 / -u : u);
}
function OO(e, t) {
  let n;
  for (const a of e)
    a != null && (n < a || (n === void 0 && a >= a)) && (n = a);
  return n;
}
function _O(e, t) {
  let n;
  for (const a of e)
    a != null && (n > a || (n === void 0 && a >= a)) && (n = a);
  return n;
}
function $2(e, t, n = 0, a = 1 / 0, u) {
  if (
    ((t = Math.floor(t)),
    (n = Math.floor(Math.max(0, n))),
    (a = Math.floor(Math.min(e.length - 1, a))),
    !(n <= t && t <= a))
  )
    return e;
  for (u = u === void 0 ? I2 : f6(u); a > n; ) {
    if (a - n > 600) {
      const d = a - n + 1,
        h = t - n + 1,
        m = Math.log(d),
        p = 0.5 * Math.exp((2 * m) / 3),
        g = 0.5 * Math.sqrt((m * p * (d - p)) / d) * (h - d / 2 < 0 ? -1 : 1),
        b = Math.max(n, Math.floor(t - (h * p) / d + g)),
        S = Math.min(a, Math.floor(t + ((d - h) * p) / d + g));
      $2(e, t, b, S, u);
    }
    const o = e[t];
    let s = n,
      f = a;
    for (Uu(e, n, t), u(e[a], o) > 0 && Uu(e, n, a); s < f; ) {
      for (Uu(e, s, f), ++s, --f; u(e[s], o) < 0; ) ++s;
      for (; u(e[f], o) > 0; ) --f;
    }
    (u(e[n], o) === 0 ? Uu(e, n, f) : (++f, Uu(e, f, a)),
      f <= t && (n = f + 1),
      t <= f && (a = f - 1));
  }
  return e;
}
function Uu(e, t, n) {
  const a = e[t];
  ((e[t] = e[n]), (e[n] = a));
}
function m6(e, t, n) {
  if (((e = Float64Array.from(l6(e))), !(!(a = e.length) || isNaN((t = +t))))) {
    if (t <= 0 || a < 2) return _O(e);
    if (t >= 1) return OO(e);
    var a,
      u = (a - 1) * t,
      o = Math.floor(u),
      s = OO($2(e, o).subarray(0, o + 1)),
      f = _O(e.subarray(o + 1));
    return s + (f - s) * (u - o);
  }
}
function y6(e, t, n = H2) {
  if (!(!(a = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || a < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[a - 1], a - 1, e);
    var a,
      u = (a - 1) * t,
      o = Math.floor(u),
      s = +n(e[o], o, e),
      f = +n(e[o + 1], o + 1, e);
    return s + (f - s) * (u - o);
  }
}
function p6(e, t, n) {
  ((e = +e),
    (t = +t),
    (n = (u = arguments.length) < 2 ? ((t = e), (e = 0), 1) : u < 3 ? 1 : +n));
  for (
    var a = -1, u = Math.max(0, Math.ceil((t - e) / n)) | 0, o = new Array(u);
    ++a < u;
  )
    o[a] = e + a * n;
  return o;
}
function $n(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Zr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      (this.domain(e),
        typeof t == "function" ? this.interpolator(t) : this.range(t));
      break;
    }
  }
  return this;
}
const Ny = Symbol("implicit");
function Mp() {
  var e = new SO(),
    t = [],
    n = [],
    a = Ny;
  function u(o) {
    let s = e.get(o);
    if (s === void 0) {
      if (a !== Ny) return a;
      e.set(o, (s = t.push(o) - 1));
    }
    return n[s % n.length];
  }
  return (
    (u.domain = function (o) {
      if (!arguments.length) return t.slice();
      ((t = []), (e = new SO()));
      for (const s of o) e.has(s) || e.set(s, t.push(s) - 1);
      return u;
    }),
    (u.range = function (o) {
      return arguments.length ? ((n = Array.from(o)), u) : n.slice();
    }),
    (u.unknown = function (o) {
      return arguments.length ? ((a = o), u) : a;
    }),
    (u.copy = function () {
      return Mp(t, n).unknown(a);
    }),
    $n.apply(u, arguments),
    u
  );
}
function Cp() {
  var e = Mp().unknown(void 0),
    t = e.domain,
    n = e.range,
    a = 0,
    u = 1,
    o,
    s,
    f = !1,
    d = 0,
    h = 0,
    m = 0.5;
  delete e.unknown;
  function p() {
    var g = t().length,
      b = u < a,
      S = b ? u : a,
      _ = b ? a : u;
    ((o = (_ - S) / Math.max(1, g - d + h * 2)),
      f && (o = Math.floor(o)),
      (S += (_ - S - o * (g - d)) * m),
      (s = o * (1 - d)),
      f && ((S = Math.round(S)), (s = Math.round(s))));
    var O = p6(g).map(function (E) {
      return S + o * E;
    });
    return n(b ? O.reverse() : O);
  }
  return (
    (e.domain = function (g) {
      return arguments.length ? (t(g), p()) : t();
    }),
    (e.range = function (g) {
      return arguments.length
        ? (([a, u] = g), (a = +a), (u = +u), p())
        : [a, u];
    }),
    (e.rangeRound = function (g) {
      return (([a, u] = g), (a = +a), (u = +u), (f = !0), p());
    }),
    (e.bandwidth = function () {
      return s;
    }),
    (e.step = function () {
      return o;
    }),
    (e.round = function (g) {
      return arguments.length ? ((f = !!g), p()) : f;
    }),
    (e.padding = function (g) {
      return arguments.length ? ((d = Math.min(1, (h = +g))), p()) : d;
    }),
    (e.paddingInner = function (g) {
      return arguments.length ? ((d = Math.min(1, g)), p()) : d;
    }),
    (e.paddingOuter = function (g) {
      return arguments.length ? ((h = +g), p()) : h;
    }),
    (e.align = function (g) {
      return arguments.length ? ((m = Math.max(0, Math.min(1, g))), p()) : m;
    }),
    (e.copy = function () {
      return Cp(t(), [a, u]).round(f).paddingInner(d).paddingOuter(h).align(m);
    }),
    $n.apply(p(), arguments)
  );
}
function Y2(e) {
  var t = e.copy;
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return Y2(t());
    }),
    e
  );
}
function g6() {
  return Y2(Cp.apply(null, arguments).paddingInner(1));
}
function Dp(e, t, n) {
  ((e.prototype = t.prototype = n), (n.constructor = e));
}
function K2(e, t) {
  var n = Object.create(e.prototype);
  for (var a in t) n[a] = t[a];
  return n;
}
function wo() {}
var io = 0.7,
  Ks = 1 / io,
  Sl = "\\s*([+-]?\\d+)\\s*",
  lo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  cr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  b6 = /^#([0-9a-f]{3,8})$/,
  x6 = new RegExp(`^rgb\\(${Sl},${Sl},${Sl}\\)$`),
  S6 = new RegExp(`^rgb\\(${cr},${cr},${cr}\\)$`),
  w6 = new RegExp(`^rgba\\(${Sl},${Sl},${Sl},${lo}\\)$`),
  O6 = new RegExp(`^rgba\\(${cr},${cr},${cr},${lo}\\)$`),
  _6 = new RegExp(`^hsl\\(${lo},${cr},${cr}\\)$`),
  A6 = new RegExp(`^hsla\\(${lo},${cr},${cr},${lo}\\)$`),
  AO = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Dp(wo, uo, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: EO,
  formatHex: EO,
  formatHex8: E6,
  formatHsl: j6,
  formatRgb: jO,
  toString: jO,
});
function EO() {
  return this.rgb().formatHex();
}
function E6() {
  return this.rgb().formatHex8();
}
function j6() {
  return G2(this).formatHsl();
}
function jO() {
  return this.rgb().formatRgb();
}
function uo(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = b6.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? TO(t)
          : n === 3
            ? new un(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? as(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : n === 4
                ? as(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = x6.exec(e))
        ? new un(t[1], t[2], t[3], 1)
        : (t = S6.exec(e))
          ? new un(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = w6.exec(e))
            ? as(t[1], t[2], t[3], t[4])
            : (t = O6.exec(e))
              ? as(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = _6.exec(e))
                ? DO(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = A6.exec(e))
                  ? DO(t[1], t[2] / 100, t[3] / 100, t[4])
                  : AO.hasOwnProperty(e)
                    ? TO(AO[e])
                    : e === "transparent"
                      ? new un(NaN, NaN, NaN, 0)
                      : null
  );
}
function TO(e) {
  return new un((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function as(e, t, n, a) {
  return (a <= 0 && (e = t = n = NaN), new un(e, t, n, a));
}
function T6(e) {
  return (
    e instanceof wo || (e = uo(e)),
    e ? ((e = e.rgb()), new un(e.r, e.g, e.b, e.opacity)) : new un()
  );
}
function Py(e, t, n, a) {
  return arguments.length === 1 ? T6(e) : new un(e, t, n, a ?? 1);
}
function un(e, t, n, a) {
  ((this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +a));
}
Dp(
  un,
  Py,
  K2(wo, {
    brighter(e) {
      return (
        (e = e == null ? Ks : Math.pow(Ks, e)),
        new un(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? io : Math.pow(io, e)),
        new un(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new un(hi(this.r), hi(this.g), hi(this.b), Gs(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: MO,
    formatHex: MO,
    formatHex8: M6,
    formatRgb: CO,
    toString: CO,
  }),
);
function MO() {
  return `#${ci(this.r)}${ci(this.g)}${ci(this.b)}`;
}
function M6() {
  return `#${ci(this.r)}${ci(this.g)}${ci(this.b)}${ci((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function CO() {
  const e = Gs(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${hi(this.r)}, ${hi(this.g)}, ${hi(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Gs(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function hi(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ci(e) {
  return ((e = hi(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function DO(e, t, n, a) {
  return (
    a <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new Zn(e, t, n, a)
  );
}
function G2(e) {
  if (e instanceof Zn) return new Zn(e.h, e.s, e.l, e.opacity);
  if ((e instanceof wo || (e = uo(e)), !e)) return new Zn();
  if (e instanceof Zn) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    a = e.b / 255,
    u = Math.min(t, n, a),
    o = Math.max(t, n, a),
    s = NaN,
    f = o - u,
    d = (o + u) / 2;
  return (
    f
      ? (t === o
          ? (s = (n - a) / f + (n < a) * 6)
          : n === o
            ? (s = (a - t) / f + 2)
            : (s = (t - n) / f + 4),
        (f /= d < 0.5 ? o + u : 2 - o - u),
        (s *= 60))
      : (f = d > 0 && d < 1 ? 0 : s),
    new Zn(s, f, d, e.opacity)
  );
}
function C6(e, t, n, a) {
  return arguments.length === 1 ? G2(e) : new Zn(e, t, n, a ?? 1);
}
function Zn(e, t, n, a) {
  ((this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +a));
}
Dp(
  Zn,
  C6,
  K2(wo, {
    brighter(e) {
      return (
        (e = e == null ? Ks : Math.pow(Ks, e)),
        new Zn(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? io : Math.pow(io, e)),
        new Zn(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        a = n + (n < 0.5 ? n : 1 - n) * t,
        u = 2 * n - a;
      return new un(
        Rm(e >= 240 ? e - 240 : e + 120, u, a),
        Rm(e, u, a),
        Rm(e < 120 ? e + 240 : e - 120, u, a),
        this.opacity,
      );
    },
    clamp() {
      return new Zn(NO(this.h), is(this.s), is(this.l), Gs(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = Gs(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${NO(this.h)}, ${is(this.s) * 100}%, ${is(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function NO(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function is(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Rm(e, t, n) {
  return (
    (e < 60
      ? t + ((n - t) * e) / 60
      : e < 180
        ? n
        : e < 240
          ? t + ((n - t) * (240 - e)) / 60
          : t) * 255
  );
}
const Np = (e) => () => e;
function D6(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function N6(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (a) {
      return Math.pow(e + a * t, n);
    }
  );
}
function P6(e) {
  return (e = +e) == 1
    ? X2
    : function (t, n) {
        return n - t ? N6(t, n, e) : Np(isNaN(t) ? n : t);
      };
}
function X2(e, t) {
  var n = t - e;
  return n ? D6(e, n) : Np(isNaN(e) ? t : e);
}
const PO = (function e(t) {
  var n = P6(t);
  function a(u, o) {
    var s = n((u = Py(u)).r, (o = Py(o)).r),
      f = n(u.g, o.g),
      d = n(u.b, o.b),
      h = X2(u.opacity, o.opacity);
    return function (m) {
      return (
        (u.r = s(m)),
        (u.g = f(m)),
        (u.b = d(m)),
        (u.opacity = h(m)),
        u + ""
      );
    };
  }
  return ((a.gamma = e), a);
})(1);
function z6(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0,
    a = t.slice(),
    u;
  return function (o) {
    for (u = 0; u < n; ++u) a[u] = e[u] * (1 - o) + t[u] * o;
    return a;
  };
}
function k6(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function R6(e, t) {
  var n = t ? t.length : 0,
    a = e ? Math.min(n, e.length) : 0,
    u = new Array(a),
    o = new Array(n),
    s;
  for (s = 0; s < a; ++s) u[s] = Pl(e[s], t[s]);
  for (; s < n; ++s) o[s] = t[s];
  return function (f) {
    for (s = 0; s < a; ++s) o[s] = u[s](f);
    return o;
  };
}
function L6(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (a) {
      return (n.setTime(e * (1 - a) + t * a), n);
    }
  );
}
function Xs(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function U6(e, t) {
  var n = {},
    a = {},
    u;
  ((e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {}));
  for (u in t) u in e ? (n[u] = Pl(e[u], t[u])) : (a[u] = t[u]);
  return function (o) {
    for (u in n) a[u] = n[u](o);
    return a;
  };
}
var zy = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Lm = new RegExp(zy.source, "g");
function q6(e) {
  return function () {
    return e;
  };
}
function B6(e) {
  return function (t) {
    return e(t) + "";
  };
}
function H6(e, t) {
  var n = (zy.lastIndex = Lm.lastIndex = 0),
    a,
    u,
    o,
    s = -1,
    f = [],
    d = [];
  for (e = e + "", t = t + ""; (a = zy.exec(e)) && (u = Lm.exec(t)); )
    ((o = u.index) > n &&
      ((o = t.slice(n, o)), f[s] ? (f[s] += o) : (f[++s] = o)),
      (a = a[0]) === (u = u[0])
        ? f[s]
          ? (f[s] += u)
          : (f[++s] = u)
        : ((f[++s] = null), d.push({ i: s, x: Xs(a, u) })),
      (n = Lm.lastIndex));
  return (
    n < t.length && ((o = t.slice(n)), f[s] ? (f[s] += o) : (f[++s] = o)),
    f.length < 2
      ? d[0]
        ? B6(d[0].x)
        : q6(t)
      : ((t = d.length),
        function (h) {
          for (var m = 0, p; m < t; ++m) f[(p = d[m]).i] = p.x(h);
          return f.join("");
        })
  );
}
function Pl(e, t) {
  var n = typeof t,
    a;
  return t == null || n === "boolean"
    ? Np(t)
    : (n === "number"
        ? Xs
        : n === "string"
          ? (a = uo(t))
            ? ((t = a), PO)
            : H6
          : t instanceof uo
            ? PO
            : t instanceof Date
              ? L6
              : k6(t)
                ? z6
                : Array.isArray(t)
                  ? R6
                  : (typeof t.valueOf != "function" &&
                        typeof t.toString != "function") ||
                      isNaN(t)
                    ? U6
                    : Xs)(e, t);
}
function Pp(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
function I6(e, t) {
  t === void 0 && ((t = e), (e = Pl));
  for (
    var n = 0, a = t.length - 1, u = t[0], o = new Array(a < 0 ? 0 : a);
    n < a;
  )
    o[n] = e(u, (u = t[++n]));
  return function (s) {
    var f = Math.max(0, Math.min(a - 1, Math.floor((s *= a))));
    return o[f](s - f);
  };
}
function $6(e) {
  return function () {
    return e;
  };
}
function Vs(e) {
  return +e;
}
var zO = [0, 1];
function Xt(e) {
  return e;
}
function ky(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : $6(isNaN(t) ? NaN : 0.5);
}
function Y6(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (a) {
      return Math.max(e, Math.min(t, a));
    }
  );
}
function K6(e, t, n) {
  var a = e[0],
    u = e[1],
    o = t[0],
    s = t[1];
  return (
    u < a ? ((a = ky(u, a)), (o = n(s, o))) : ((a = ky(a, u)), (o = n(o, s))),
    function (f) {
      return o(a(f));
    }
  );
}
function G6(e, t, n) {
  var a = Math.min(e.length, t.length) - 1,
    u = new Array(a),
    o = new Array(a),
    s = -1;
  for (
    e[a] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++s < a;
  )
    ((u[s] = ky(e[s], e[s + 1])), (o[s] = n(t[s], t[s + 1])));
  return function (f) {
    var d = So(e, f, 1, a) - 1;
    return o[d](u[d](f));
  };
}
function Oo(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function Gf() {
  var e = zO,
    t = zO,
    n = Pl,
    a,
    u,
    o,
    s = Xt,
    f,
    d,
    h;
  function m() {
    var g = Math.min(e.length, t.length);
    return (
      s !== Xt && (s = Y6(e[0], e[g - 1])),
      (f = g > 2 ? G6 : K6),
      (d = h = null),
      p
    );
  }
  function p(g) {
    return g == null || isNaN((g = +g))
      ? o
      : (d || (d = f(e.map(a), t, n)))(a(s(g)));
  }
  return (
    (p.invert = function (g) {
      return s(u((h || (h = f(t, e.map(a), Xs)))(g)));
    }),
    (p.domain = function (g) {
      return arguments.length ? ((e = Array.from(g, Vs)), m()) : e.slice();
    }),
    (p.range = function (g) {
      return arguments.length ? ((t = Array.from(g)), m()) : t.slice();
    }),
    (p.rangeRound = function (g) {
      return ((t = Array.from(g)), (n = Pp), m());
    }),
    (p.clamp = function (g) {
      return arguments.length ? ((s = g ? !0 : Xt), m()) : s !== Xt;
    }),
    (p.interpolate = function (g) {
      return arguments.length ? ((n = g), m()) : n;
    }),
    (p.unknown = function (g) {
      return arguments.length ? ((o = g), p) : o;
    }),
    function (g, b) {
      return ((a = g), (u = b), m());
    }
  );
}
function zp() {
  return Gf()(Xt, Xt);
}
function X6(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function Zs(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"),
    a = e.slice(0, n);
  return [a.length > 1 ? a[0] + a.slice(2) : a, +e.slice(n + 1)];
}
function Al(e) {
  return ((e = Zs(Math.abs(e))), e ? e[1] : NaN);
}
function V6(e, t) {
  return function (n, a) {
    for (
      var u = n.length, o = [], s = 0, f = e[0], d = 0;
      u > 0 &&
      f > 0 &&
      (d + f + 1 > a && (f = Math.max(1, a - d)),
      o.push(n.substring((u -= f), u + f)),
      !((d += f + 1) > a));
    )
      f = e[(s = (s + 1) % e.length)];
    return o.reverse().join(t);
  };
}
function Z6(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (n) {
      return e[+n];
    });
  };
}
var Q6 =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function oo(e) {
  if (!(t = Q6.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new kp({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
oo.prototype = kp.prototype;
function kp(e) {
  ((this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + ""));
}
kp.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
    (this.trim ? "~" : "") +
    this.type
  );
};
function W6(e) {
  e: for (var t = e.length, n = 1, a = -1, u; n < t; ++n)
    switch (e[n]) {
      case ".":
        a = u = n;
        break;
      case "0":
        (a === 0 && (a = n), (u = n));
        break;
      default:
        if (!+e[n]) break e;
        a > 0 && (a = 0);
        break;
    }
  return a > 0 ? e.slice(0, a) + e.slice(u + 1) : e;
}
var Qs;
function F6(e, t) {
  var n = Zs(e, t);
  if (!n) return ((Qs = void 0), e.toPrecision(t));
  var a = n[0],
    u = n[1],
    o = u - (Qs = Math.max(-8, Math.min(8, Math.floor(u / 3))) * 3) + 1,
    s = a.length;
  return o === s
    ? a
    : o > s
      ? a + new Array(o - s + 1).join("0")
      : o > 0
        ? a.slice(0, o) + "." + a.slice(o)
        : "0." + new Array(1 - o).join("0") + Zs(e, Math.max(0, t + o - 1))[0];
}
function kO(e, t) {
  var n = Zs(e, t);
  if (!n) return e + "";
  var a = n[0],
    u = n[1];
  return u < 0
    ? "0." + new Array(-u).join("0") + a
    : a.length > u + 1
      ? a.slice(0, u + 1) + "." + a.slice(u + 1)
      : a + new Array(u - a.length + 2).join("0");
}
const RO = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: X6,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => kO(e * 100, t),
  r: kO,
  s: F6,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function LO(e) {
  return e;
}
var UO = Array.prototype.map,
  qO = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ];
function J6(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? LO
        : V6(UO.call(e.grouping, Number), e.thousands + ""),
    n = e.currency === void 0 ? "" : e.currency[0] + "",
    a = e.currency === void 0 ? "" : e.currency[1] + "",
    u = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? LO : Z6(UO.call(e.numerals, String)),
    s = e.percent === void 0 ? "%" : e.percent + "",
    f = e.minus === void 0 ? "−" : e.minus + "",
    d = e.nan === void 0 ? "NaN" : e.nan + "";
  function h(p, g) {
    p = oo(p);
    var b = p.fill,
      S = p.align,
      _ = p.sign,
      O = p.symbol,
      E = p.zero,
      C = p.width,
      T = p.comma,
      D = p.precision,
      M = p.trim,
      z = p.type;
    (z === "n"
      ? ((T = !0), (z = "g"))
      : RO[z] || (D === void 0 && (D = 12), (M = !0), (z = "g")),
      (E || (b === "0" && S === "=")) && ((E = !0), (b = "0"), (S = "=")));
    var U =
        (g && g.prefix !== void 0 ? g.prefix : "") +
        (O === "$"
          ? n
          : O === "#" && /[boxX]/.test(z)
            ? "0" + z.toLowerCase()
            : ""),
      V =
        (O === "$" ? a : /[%p]/.test(z) ? s : "") +
        (g && g.suffix !== void 0 ? g.suffix : ""),
      F = RO[z],
      ae = /[defgprs%]/.test(z);
    D =
      D === void 0
        ? 6
        : /[gprs]/.test(z)
          ? Math.max(1, Math.min(21, D))
          : Math.max(0, Math.min(20, D));
    function ne(K) {
      var q = U,
        re = V,
        ce,
        L,
        W;
      if (z === "c") ((re = F(K) + re), (K = ""));
      else {
        K = +K;
        var ue = K < 0 || 1 / K < 0;
        if (
          ((K = isNaN(K) ? d : F(Math.abs(K), D)),
          M && (K = W6(K)),
          ue && +K == 0 && _ !== "+" && (ue = !1),
          (q =
            (ue ? (_ === "(" ? _ : f) : _ === "-" || _ === "(" ? "" : _) + q),
          (re =
            (z === "s" && !isNaN(K) && Qs !== void 0 ? qO[8 + Qs / 3] : "") +
            re +
            (ue && _ === "(" ? ")" : "")),
          ae)
        ) {
          for (ce = -1, L = K.length; ++ce < L; )
            if (((W = K.charCodeAt(ce)), 48 > W || W > 57)) {
              ((re = (W === 46 ? u + K.slice(ce + 1) : K.slice(ce)) + re),
                (K = K.slice(0, ce)));
              break;
            }
        }
      }
      T && !E && (K = t(K, 1 / 0));
      var oe = q.length + K.length + re.length,
        he = oe < C ? new Array(C - oe + 1).join(b) : "";
      switch (
        (T &&
          E &&
          ((K = t(he + K, he.length ? C - re.length : 1 / 0)), (he = "")),
        S)
      ) {
        case "<":
          K = q + K + re + he;
          break;
        case "=":
          K = q + he + K + re;
          break;
        case "^":
          K = he.slice(0, (oe = he.length >> 1)) + q + K + re + he.slice(oe);
          break;
        default:
          K = he + q + K + re;
          break;
      }
      return o(K);
    }
    return (
      (ne.toString = function () {
        return p + "";
      }),
      ne
    );
  }
  function m(p, g) {
    var b = Math.max(-8, Math.min(8, Math.floor(Al(g) / 3))) * 3,
      S = Math.pow(10, -b),
      _ = h(((p = oo(p)), (p.type = "f"), p), { suffix: qO[8 + b / 3] });
    return function (O) {
      return _(S * O);
    };
  }
  return { format: h, formatPrefix: m };
}
var ls, Rp, V2;
e5({ thousands: ",", grouping: [3], currency: ["$", ""] });
function e5(e) {
  return ((ls = J6(e)), (Rp = ls.format), (V2 = ls.formatPrefix), ls);
}
function t5(e) {
  return Math.max(0, -Al(Math.abs(e)));
}
function n5(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(Al(t) / 3))) * 3 - Al(Math.abs(e)),
  );
}
function r5(e, t) {
  return (
    (e = Math.abs(e)),
    (t = Math.abs(t) - e),
    Math.max(0, Al(t) - Al(e)) + 1
  );
}
function Z2(e, t, n, a) {
  var u = Dy(e, t, n),
    o;
  switch (((a = oo(a ?? ",f")), a.type)) {
    case "s": {
      var s = Math.max(Math.abs(e), Math.abs(t));
      return (
        a.precision == null && !isNaN((o = n5(u, s))) && (a.precision = o),
        V2(a, s)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      a.precision == null &&
        !isNaN((o = r5(u, Math.max(Math.abs(e), Math.abs(t))))) &&
        (a.precision = o - (a.type === "e"));
      break;
    }
    case "f":
    case "%": {
      a.precision == null &&
        !isNaN((o = t5(u))) &&
        (a.precision = o - (a.type === "%") * 2);
      break;
    }
  }
  return Rp(a);
}
function ka(e) {
  var t = e.domain;
  return (
    (e.ticks = function (n) {
      var a = t();
      return My(a[0], a[a.length - 1], n ?? 10);
    }),
    (e.tickFormat = function (n, a) {
      var u = t();
      return Z2(u[0], u[u.length - 1], n ?? 10, a);
    }),
    (e.nice = function (n) {
      n == null && (n = 10);
      var a = t(),
        u = 0,
        o = a.length - 1,
        s = a[u],
        f = a[o],
        d,
        h,
        m = 10;
      for (
        f < s && ((h = s), (s = f), (f = h), (h = u), (u = o), (o = h));
        m-- > 0;
      ) {
        if (((h = Cy(s, f, n)), h === d)) return ((a[u] = s), (a[o] = f), t(a));
        if (h > 0) ((s = Math.floor(s / h) * h), (f = Math.ceil(f / h) * h));
        else if (h < 0)
          ((s = Math.ceil(s * h) / h), (f = Math.floor(f * h) / h));
        else break;
        d = h;
      }
      return e;
    }),
    e
  );
}
function Q2() {
  var e = zp();
  return (
    (e.copy = function () {
      return Oo(e, Q2());
    }),
    $n.apply(e, arguments),
    ka(e)
  );
}
function W2(e) {
  var t;
  function n(a) {
    return a == null || isNaN((a = +a)) ? t : a;
  }
  return (
    (n.invert = n),
    (n.domain = n.range =
      function (a) {
        return arguments.length ? ((e = Array.from(a, Vs)), n) : e.slice();
      }),
    (n.unknown = function (a) {
      return arguments.length ? ((t = a), n) : t;
    }),
    (n.copy = function () {
      return W2(e).unknown(t);
    }),
    (e = arguments.length ? Array.from(e, Vs) : [0, 1]),
    ka(n)
  );
}
function F2(e, t) {
  e = e.slice();
  var n = 0,
    a = e.length - 1,
    u = e[n],
    o = e[a],
    s;
  return (
    o < u && ((s = n), (n = a), (a = s), (s = u), (u = o), (o = s)),
    (e[n] = t.floor(u)),
    (e[a] = t.ceil(o)),
    e
  );
}
function BO(e) {
  return Math.log(e);
}
function HO(e) {
  return Math.exp(e);
}
function a5(e) {
  return -Math.log(-e);
}
function i5(e) {
  return -Math.exp(-e);
}
function l5(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function u5(e) {
  return e === 10 ? l5 : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function o5(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) ||
        (e === 2 && Math.log2) ||
        ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function IO(e) {
  return (t, n) => -e(-t, n);
}
function Lp(e) {
  const t = e(BO, HO),
    n = t.domain;
  let a = 10,
    u,
    o;
  function s() {
    return (
      (u = o5(a)),
      (o = u5(a)),
      n()[0] < 0 ? ((u = IO(u)), (o = IO(o)), e(a5, i5)) : e(BO, HO),
      t
    );
  }
  return (
    (t.base = function (f) {
      return arguments.length ? ((a = +f), s()) : a;
    }),
    (t.domain = function (f) {
      return arguments.length ? (n(f), s()) : n();
    }),
    (t.ticks = (f) => {
      const d = n();
      let h = d[0],
        m = d[d.length - 1];
      const p = m < h;
      p && ([h, m] = [m, h]);
      let g = u(h),
        b = u(m),
        S,
        _;
      const O = f == null ? 10 : +f;
      let E = [];
      if (!(a % 1) && b - g < O) {
        if (((g = Math.floor(g)), (b = Math.ceil(b)), h > 0)) {
          for (; g <= b; ++g)
            for (S = 1; S < a; ++S)
              if (((_ = g < 0 ? S / o(-g) : S * o(g)), !(_ < h))) {
                if (_ > m) break;
                E.push(_);
              }
        } else
          for (; g <= b; ++g)
            for (S = a - 1; S >= 1; --S)
              if (((_ = g > 0 ? S / o(-g) : S * o(g)), !(_ < h))) {
                if (_ > m) break;
                E.push(_);
              }
        E.length * 2 < O && (E = My(h, m, O));
      } else E = My(g, b, Math.min(b - g, O)).map(o);
      return p ? E.reverse() : E;
    }),
    (t.tickFormat = (f, d) => {
      if (
        (f == null && (f = 10),
        d == null && (d = a === 10 ? "s" : ","),
        typeof d != "function" &&
          (!(a % 1) && (d = oo(d)).precision == null && (d.trim = !0),
          (d = Rp(d))),
        f === 1 / 0)
      )
        return d;
      const h = Math.max(1, (a * f) / t.ticks().length);
      return (m) => {
        let p = m / o(Math.round(u(m)));
        return (p * a < a - 0.5 && (p *= a), p <= h ? d(m) : "");
      };
    }),
    (t.nice = () =>
      n(
        F2(n(), {
          floor: (f) => o(Math.floor(u(f))),
          ceil: (f) => o(Math.ceil(u(f))),
        }),
      )),
    t
  );
}
function J2() {
  const e = Lp(Gf()).domain([1, 10]);
  return (
    (e.copy = () => Oo(e, J2()).base(e.base())),
    $n.apply(e, arguments),
    e
  );
}
function $O(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function YO(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Up(e) {
  var t = 1,
    n = e($O(t), YO(t));
  return (
    (n.constant = function (a) {
      return arguments.length ? e($O((t = +a)), YO(t)) : t;
    }),
    ka(n)
  );
}
function ej() {
  var e = Up(Gf());
  return (
    (e.copy = function () {
      return Oo(e, ej()).constant(e.constant());
    }),
    $n.apply(e, arguments)
  );
}
function KO(e) {
  return function (t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function c5(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function s5(e) {
  return e < 0 ? -e * e : e * e;
}
function qp(e) {
  var t = e(Xt, Xt),
    n = 1;
  function a() {
    return n === 1 ? e(Xt, Xt) : n === 0.5 ? e(c5, s5) : e(KO(n), KO(1 / n));
  }
  return (
    (t.exponent = function (u) {
      return arguments.length ? ((n = +u), a()) : n;
    }),
    ka(t)
  );
}
function Bp() {
  var e = qp(Gf());
  return (
    (e.copy = function () {
      return Oo(e, Bp()).exponent(e.exponent());
    }),
    $n.apply(e, arguments),
    e
  );
}
function f5() {
  return Bp.apply(null, arguments).exponent(0.5);
}
function GO(e) {
  return Math.sign(e) * e * e;
}
function d5(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function tj() {
  var e = zp(),
    t = [0, 1],
    n = !1,
    a;
  function u(o) {
    var s = d5(e(o));
    return isNaN(s) ? a : n ? Math.round(s) : s;
  }
  return (
    (u.invert = function (o) {
      return e.invert(GO(o));
    }),
    (u.domain = function (o) {
      return arguments.length ? (e.domain(o), u) : e.domain();
    }),
    (u.range = function (o) {
      return arguments.length
        ? (e.range((t = Array.from(o, Vs)).map(GO)), u)
        : t.slice();
    }),
    (u.rangeRound = function (o) {
      return u.range(o).round(!0);
    }),
    (u.round = function (o) {
      return arguments.length ? ((n = !!o), u) : n;
    }),
    (u.clamp = function (o) {
      return arguments.length ? (e.clamp(o), u) : e.clamp();
    }),
    (u.unknown = function (o) {
      return arguments.length ? ((a = o), u) : a;
    }),
    (u.copy = function () {
      return tj(e.domain(), t).round(n).clamp(e.clamp()).unknown(a);
    }),
    $n.apply(u, arguments),
    ka(u)
  );
}
function nj() {
  var e = [],
    t = [],
    n = [],
    a;
  function u() {
    var s = 0,
      f = Math.max(1, t.length);
    for (n = new Array(f - 1); ++s < f; ) n[s - 1] = y6(e, s / f);
    return o;
  }
  function o(s) {
    return s == null || isNaN((s = +s)) ? a : t[So(n, s)];
  }
  return (
    (o.invertExtent = function (s) {
      var f = t.indexOf(s);
      return f < 0
        ? [NaN, NaN]
        : [f > 0 ? n[f - 1] : e[0], f < n.length ? n[f] : e[e.length - 1]];
    }),
    (o.domain = function (s) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let f of s) f != null && !isNaN((f = +f)) && e.push(f);
      return (e.sort(Ca), u());
    }),
    (o.range = function (s) {
      return arguments.length ? ((t = Array.from(s)), u()) : t.slice();
    }),
    (o.unknown = function (s) {
      return arguments.length ? ((a = s), o) : a;
    }),
    (o.quantiles = function () {
      return n.slice();
    }),
    (o.copy = function () {
      return nj().domain(e).range(t).unknown(a);
    }),
    $n.apply(o, arguments)
  );
}
function rj() {
  var e = 0,
    t = 1,
    n = 1,
    a = [0.5],
    u = [0, 1],
    o;
  function s(d) {
    return d != null && d <= d ? u[So(a, d, 0, n)] : o;
  }
  function f() {
    var d = -1;
    for (a = new Array(n); ++d < n; )
      a[d] = ((d + 1) * t - (d - n) * e) / (n + 1);
    return s;
  }
  return (
    (s.domain = function (d) {
      return arguments.length
        ? (([e, t] = d), (e = +e), (t = +t), f())
        : [e, t];
    }),
    (s.range = function (d) {
      return arguments.length
        ? ((n = (u = Array.from(d)).length - 1), f())
        : u.slice();
    }),
    (s.invertExtent = function (d) {
      var h = u.indexOf(d);
      return h < 0
        ? [NaN, NaN]
        : h < 1
          ? [e, a[0]]
          : h >= n
            ? [a[n - 1], t]
            : [a[h - 1], a[h]];
    }),
    (s.unknown = function (d) {
      return (arguments.length && (o = d), s);
    }),
    (s.thresholds = function () {
      return a.slice();
    }),
    (s.copy = function () {
      return rj().domain([e, t]).range(u).unknown(o);
    }),
    $n.apply(ka(s), arguments)
  );
}
function aj() {
  var e = [0.5],
    t = [0, 1],
    n,
    a = 1;
  function u(o) {
    return o != null && o <= o ? t[So(e, o, 0, a)] : n;
  }
  return (
    (u.domain = function (o) {
      return arguments.length
        ? ((e = Array.from(o)), (a = Math.min(e.length, t.length - 1)), u)
        : e.slice();
    }),
    (u.range = function (o) {
      return arguments.length
        ? ((t = Array.from(o)), (a = Math.min(e.length, t.length - 1)), u)
        : t.slice();
    }),
    (u.invertExtent = function (o) {
      var s = t.indexOf(o);
      return [e[s - 1], e[s]];
    }),
    (u.unknown = function (o) {
      return arguments.length ? ((n = o), u) : n;
    }),
    (u.copy = function () {
      return aj().domain(e).range(t).unknown(n);
    }),
    $n.apply(u, arguments)
  );
}
const Um = new Date(),
  qm = new Date();
function pt(e, t, n, a) {
  function u(o) {
    return (e((o = arguments.length === 0 ? new Date() : new Date(+o))), o);
  }
  return (
    (u.floor = (o) => (e((o = new Date(+o))), o)),
    (u.ceil = (o) => (e((o = new Date(o - 1))), t(o, 1), e(o), o)),
    (u.round = (o) => {
      const s = u(o),
        f = u.ceil(o);
      return o - s < f - o ? s : f;
    }),
    (u.offset = (o, s) => (
      t((o = new Date(+o)), s == null ? 1 : Math.floor(s)),
      o
    )),
    (u.range = (o, s, f) => {
      const d = [];
      if (
        ((o = u.ceil(o)),
        (f = f == null ? 1 : Math.floor(f)),
        !(o < s) || !(f > 0))
      )
        return d;
      let h;
      do (d.push((h = new Date(+o))), t(o, f), e(o));
      while (h < o && o < s);
      return d;
    }),
    (u.filter = (o) =>
      pt(
        (s) => {
          if (s >= s) for (; e(s), !o(s); ) s.setTime(s - 1);
        },
        (s, f) => {
          if (s >= s)
            if (f < 0) for (; ++f <= 0; ) for (; t(s, -1), !o(s); );
            else for (; --f >= 0; ) for (; t(s, 1), !o(s); );
        },
      )),
    n &&
      ((u.count = (o, s) => (
        Um.setTime(+o),
        qm.setTime(+s),
        e(Um),
        e(qm),
        Math.floor(n(Um, qm))
      )),
      (u.every = (o) => (
        (o = Math.floor(o)),
        !isFinite(o) || !(o > 0)
          ? null
          : o > 1
            ? u.filter(
                a ? (s) => a(s) % o === 0 : (s) => u.count(0, s) % o === 0,
              )
            : u
      ))),
    u
  );
}
const Ws = pt(
  () => {},
  (e, t) => {
    e.setTime(+e + t);
  },
  (e, t) => t - e,
);
Ws.every = (e) => (
  (e = Math.floor(e)),
  !isFinite(e) || !(e > 0)
    ? null
    : e > 1
      ? pt(
          (t) => {
            t.setTime(Math.floor(t / e) * e);
          },
          (t, n) => {
            t.setTime(+t + n * e);
          },
          (t, n) => (n - t) / e,
        )
      : Ws
);
Ws.range;
const kr = 1e3,
  Hn = kr * 60,
  Rr = Hn * 60,
  Ir = Rr * 24,
  Hp = Ir * 7,
  XO = Ir * 30,
  Bm = Ir * 365,
  si = pt(
    (e) => {
      e.setTime(e - e.getMilliseconds());
    },
    (e, t) => {
      e.setTime(+e + t * kr);
    },
    (e, t) => (t - e) / kr,
    (e) => e.getUTCSeconds(),
  );
si.range;
const Ip = pt(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * kr);
  },
  (e, t) => {
    e.setTime(+e + t * Hn);
  },
  (e, t) => (t - e) / Hn,
  (e) => e.getMinutes(),
);
Ip.range;
const $p = pt(
  (e) => {
    e.setUTCSeconds(0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Hn);
  },
  (e, t) => (t - e) / Hn,
  (e) => e.getUTCMinutes(),
);
$p.range;
const Yp = pt(
  (e) => {
    e.setTime(
      e - e.getMilliseconds() - e.getSeconds() * kr - e.getMinutes() * Hn,
    );
  },
  (e, t) => {
    e.setTime(+e + t * Rr);
  },
  (e, t) => (t - e) / Rr,
  (e) => e.getHours(),
);
Yp.range;
const Kp = pt(
  (e) => {
    e.setUTCMinutes(0, 0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Rr);
  },
  (e, t) => (t - e) / Rr,
  (e) => e.getUTCHours(),
);
Kp.range;
const _o = pt(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Hn) / Ir,
  (e) => e.getDate() - 1,
);
_o.range;
const Xf = pt(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Ir,
  (e) => e.getUTCDate() - 1,
);
Xf.range;
const ij = pt(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Ir,
  (e) => Math.floor(e / Ir),
);
ij.range;
function Oi(e) {
  return pt(
    (t) => {
      (t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
        t.setHours(0, 0, 0, 0));
    },
    (t, n) => {
      t.setDate(t.getDate() + n * 7);
    },
    (t, n) =>
      (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Hn) / Hp,
  );
}
const Vf = Oi(0),
  Fs = Oi(1),
  v5 = Oi(2),
  h5 = Oi(3),
  El = Oi(4),
  m5 = Oi(5),
  y5 = Oi(6);
Vf.range;
Fs.range;
v5.range;
h5.range;
El.range;
m5.range;
y5.range;
function _i(e) {
  return pt(
    (t) => {
      (t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
        t.setUTCHours(0, 0, 0, 0));
    },
    (t, n) => {
      t.setUTCDate(t.getUTCDate() + n * 7);
    },
    (t, n) => (n - t) / Hp,
  );
}
const Zf = _i(0),
  Js = _i(1),
  p5 = _i(2),
  g5 = _i(3),
  jl = _i(4),
  b5 = _i(5),
  x5 = _i(6);
Zf.range;
Js.range;
p5.range;
g5.range;
jl.range;
b5.range;
x5.range;
const Gp = pt(
  (e) => {
    (e.setDate(1), e.setHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setMonth(e.getMonth() + t);
  },
  (e, t) =>
    t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
  (e) => e.getMonth(),
);
Gp.range;
const Xp = pt(
  (e) => {
    (e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t);
  },
  (e, t) =>
    t.getUTCMonth() -
    e.getUTCMonth() +
    (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
  (e) => e.getUTCMonth(),
);
Xp.range;
const $r = pt(
  (e) => {
    (e.setMonth(0, 1), e.setHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear(),
);
$r.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : pt(
        (t) => {
          (t.setFullYear(Math.floor(t.getFullYear() / e) * e),
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0));
        },
        (t, n) => {
          t.setFullYear(t.getFullYear() + n * e);
        },
      );
$r.range;
const Yr = pt(
  (e) => {
    (e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear(),
);
Yr.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : pt(
        (t) => {
          (t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0));
        },
        (t, n) => {
          t.setUTCFullYear(t.getUTCFullYear() + n * e);
        },
      );
Yr.range;
function lj(e, t, n, a, u, o) {
  const s = [
    [si, 1, kr],
    [si, 5, 5 * kr],
    [si, 15, 15 * kr],
    [si, 30, 30 * kr],
    [o, 1, Hn],
    [o, 5, 5 * Hn],
    [o, 15, 15 * Hn],
    [o, 30, 30 * Hn],
    [u, 1, Rr],
    [u, 3, 3 * Rr],
    [u, 6, 6 * Rr],
    [u, 12, 12 * Rr],
    [a, 1, Ir],
    [a, 2, 2 * Ir],
    [n, 1, Hp],
    [t, 1, XO],
    [t, 3, 3 * XO],
    [e, 1, Bm],
  ];
  function f(h, m, p) {
    const g = m < h;
    g && ([h, m] = [m, h]);
    const b = p && typeof p.range == "function" ? p : d(h, m, p),
      S = b ? b.range(h, +m + 1) : [];
    return g ? S.reverse() : S;
  }
  function d(h, m, p) {
    const g = Math.abs(m - h) / p,
      b = Tp(([, , O]) => O).right(s, g);
    if (b === s.length) return e.every(Dy(h / Bm, m / Bm, p));
    if (b === 0) return Ws.every(Math.max(Dy(h, m, p), 1));
    const [S, _] = s[g / s[b - 1][2] < s[b][2] / g ? b - 1 : b];
    return S.every(_);
  }
  return [f, d];
}
const [S5, w5] = lj(Yr, Xp, Zf, ij, Kp, $p),
  [O5, _5] = lj($r, Gp, Vf, _o, Yp, Ip);
function Hm(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return (t.setFullYear(e.y), t);
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Im(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return (t.setUTCFullYear(e.y), t);
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function qu(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function A5(e) {
  var t = e.dateTime,
    n = e.date,
    a = e.time,
    u = e.periods,
    o = e.days,
    s = e.shortDays,
    f = e.months,
    d = e.shortMonths,
    h = Bu(u),
    m = Hu(u),
    p = Bu(o),
    g = Hu(o),
    b = Bu(s),
    S = Hu(s),
    _ = Bu(f),
    O = Hu(f),
    E = Bu(d),
    C = Hu(d),
    T = {
      a: W,
      A: ue,
      b: oe,
      B: he,
      c: null,
      d: JO,
      e: JO,
      f: V5,
      g: a8,
      G: l8,
      H: K5,
      I: G5,
      j: X5,
      L: uj,
      m: Z5,
      M: Q5,
      p: P,
      q: G,
      Q: n_,
      s: r_,
      S: W5,
      u: F5,
      U: J5,
      V: e8,
      w: t8,
      W: n8,
      x: null,
      X: null,
      y: r8,
      Y: i8,
      Z: u8,
      "%": t_,
    },
    D = {
      a: te,
      A: ie,
      b: pe,
      B: xe,
      c: null,
      d: e_,
      e: e_,
      f: f8,
      g: S8,
      G: O8,
      H: o8,
      I: c8,
      j: s8,
      L: cj,
      m: d8,
      M: v8,
      p: Ee,
      q: Ue,
      Q: n_,
      s: r_,
      S: h8,
      u: m8,
      U: y8,
      V: p8,
      w: g8,
      W: b8,
      x: null,
      X: null,
      y: x8,
      Y: w8,
      Z: _8,
      "%": t_,
    },
    M = {
      a: ae,
      A: ne,
      b: K,
      B: q,
      c: re,
      d: WO,
      e: WO,
      f: H5,
      g: QO,
      G: ZO,
      H: FO,
      I: FO,
      j: L5,
      L: B5,
      m: R5,
      M: U5,
      p: F,
      q: k5,
      Q: $5,
      s: Y5,
      S: q5,
      u: C5,
      U: D5,
      V: N5,
      w: M5,
      W: P5,
      x: ce,
      X: L,
      y: QO,
      Y: ZO,
      Z: z5,
      "%": I5,
    };
  ((T.x = z(n, T)),
    (T.X = z(a, T)),
    (T.c = z(t, T)),
    (D.x = z(n, D)),
    (D.X = z(a, D)),
    (D.c = z(t, D)));
  function z(ee, le) {
    return function (Oe) {
      var J = [],
        jt = -1,
        De = 0,
        Tt = ee.length,
        Mt,
        hr,
        ql;
      for (Oe instanceof Date || (Oe = new Date(+Oe)); ++jt < Tt; )
        ee.charCodeAt(jt) === 37 &&
          (J.push(ee.slice(De, jt)),
          (hr = VO[(Mt = ee.charAt(++jt))]) != null
            ? (Mt = ee.charAt(++jt))
            : (hr = Mt === "e" ? " " : "0"),
          (ql = le[Mt]) && (Mt = ql(Oe, hr)),
          J.push(Mt),
          (De = jt + 1));
      return (J.push(ee.slice(De, jt)), J.join(""));
    };
  }
  function U(ee, le) {
    return function (Oe) {
      var J = qu(1900, void 0, 1),
        jt = V(J, ee, (Oe += ""), 0),
        De,
        Tt;
      if (jt != Oe.length) return null;
      if ("Q" in J) return new Date(J.Q);
      if ("s" in J) return new Date(J.s * 1e3 + ("L" in J ? J.L : 0));
      if (
        (le && !("Z" in J) && (J.Z = 0),
        "p" in J && (J.H = (J.H % 12) + J.p * 12),
        J.m === void 0 && (J.m = "q" in J ? J.q : 0),
        "V" in J)
      ) {
        if (J.V < 1 || J.V > 53) return null;
        ("w" in J || (J.w = 1),
          "Z" in J
            ? ((De = Im(qu(J.y, 0, 1))),
              (Tt = De.getUTCDay()),
              (De = Tt > 4 || Tt === 0 ? Js.ceil(De) : Js(De)),
              (De = Xf.offset(De, (J.V - 1) * 7)),
              (J.y = De.getUTCFullYear()),
              (J.m = De.getUTCMonth()),
              (J.d = De.getUTCDate() + ((J.w + 6) % 7)))
            : ((De = Hm(qu(J.y, 0, 1))),
              (Tt = De.getDay()),
              (De = Tt > 4 || Tt === 0 ? Fs.ceil(De) : Fs(De)),
              (De = _o.offset(De, (J.V - 1) * 7)),
              (J.y = De.getFullYear()),
              (J.m = De.getMonth()),
              (J.d = De.getDate() + ((J.w + 6) % 7))));
      } else
        ("W" in J || "U" in J) &&
          ("w" in J || (J.w = "u" in J ? J.u % 7 : "W" in J ? 1 : 0),
          (Tt =
            "Z" in J
              ? Im(qu(J.y, 0, 1)).getUTCDay()
              : Hm(qu(J.y, 0, 1)).getDay()),
          (J.m = 0),
          (J.d =
            "W" in J
              ? ((J.w + 6) % 7) + J.W * 7 - ((Tt + 5) % 7)
              : J.w + J.U * 7 - ((Tt + 6) % 7)));
      return "Z" in J
        ? ((J.H += (J.Z / 100) | 0), (J.M += J.Z % 100), Im(J))
        : Hm(J);
    };
  }
  function V(ee, le, Oe, J) {
    for (var jt = 0, De = le.length, Tt = Oe.length, Mt, hr; jt < De; ) {
      if (J >= Tt) return -1;
      if (((Mt = le.charCodeAt(jt++)), Mt === 37)) {
        if (
          ((Mt = le.charAt(jt++)),
          (hr = M[Mt in VO ? le.charAt(jt++) : Mt]),
          !hr || (J = hr(ee, Oe, J)) < 0)
        )
          return -1;
      } else if (Mt != Oe.charCodeAt(J++)) return -1;
    }
    return J;
  }
  function F(ee, le, Oe) {
    var J = h.exec(le.slice(Oe));
    return J ? ((ee.p = m.get(J[0].toLowerCase())), Oe + J[0].length) : -1;
  }
  function ae(ee, le, Oe) {
    var J = b.exec(le.slice(Oe));
    return J ? ((ee.w = S.get(J[0].toLowerCase())), Oe + J[0].length) : -1;
  }
  function ne(ee, le, Oe) {
    var J = p.exec(le.slice(Oe));
    return J ? ((ee.w = g.get(J[0].toLowerCase())), Oe + J[0].length) : -1;
  }
  function K(ee, le, Oe) {
    var J = E.exec(le.slice(Oe));
    return J ? ((ee.m = C.get(J[0].toLowerCase())), Oe + J[0].length) : -1;
  }
  function q(ee, le, Oe) {
    var J = _.exec(le.slice(Oe));
    return J ? ((ee.m = O.get(J[0].toLowerCase())), Oe + J[0].length) : -1;
  }
  function re(ee, le, Oe) {
    return V(ee, t, le, Oe);
  }
  function ce(ee, le, Oe) {
    return V(ee, n, le, Oe);
  }
  function L(ee, le, Oe) {
    return V(ee, a, le, Oe);
  }
  function W(ee) {
    return s[ee.getDay()];
  }
  function ue(ee) {
    return o[ee.getDay()];
  }
  function oe(ee) {
    return d[ee.getMonth()];
  }
  function he(ee) {
    return f[ee.getMonth()];
  }
  function P(ee) {
    return u[+(ee.getHours() >= 12)];
  }
  function G(ee) {
    return 1 + ~~(ee.getMonth() / 3);
  }
  function te(ee) {
    return s[ee.getUTCDay()];
  }
  function ie(ee) {
    return o[ee.getUTCDay()];
  }
  function pe(ee) {
    return d[ee.getUTCMonth()];
  }
  function xe(ee) {
    return f[ee.getUTCMonth()];
  }
  function Ee(ee) {
    return u[+(ee.getUTCHours() >= 12)];
  }
  function Ue(ee) {
    return 1 + ~~(ee.getUTCMonth() / 3);
  }
  return {
    format: function (ee) {
      var le = z((ee += ""), T);
      return (
        (le.toString = function () {
          return ee;
        }),
        le
      );
    },
    parse: function (ee) {
      var le = U((ee += ""), !1);
      return (
        (le.toString = function () {
          return ee;
        }),
        le
      );
    },
    utcFormat: function (ee) {
      var le = z((ee += ""), D);
      return (
        (le.toString = function () {
          return ee;
        }),
        le
      );
    },
    utcParse: function (ee) {
      var le = U((ee += ""), !0);
      return (
        (le.toString = function () {
          return ee;
        }),
        le
      );
    },
  };
}
var VO = { "-": "", _: " ", 0: "0" },
  Et = /^\s*\d+/,
  E5 = /^%/,
  j5 = /[\\^$*+?|[\]().{}]/g;
function Re(e, t, n) {
  var a = e < 0 ? "-" : "",
    u = (a ? -e : e) + "",
    o = u.length;
  return a + (o < n ? new Array(n - o + 1).join(t) + u : u);
}
function T5(e) {
  return e.replace(j5, "\\$&");
}
function Bu(e) {
  return new RegExp("^(?:" + e.map(T5).join("|") + ")", "i");
}
function Hu(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function M5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 1));
  return a ? ((e.w = +a[0]), n + a[0].length) : -1;
}
function C5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 1));
  return a ? ((e.u = +a[0]), n + a[0].length) : -1;
}
function D5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.U = +a[0]), n + a[0].length) : -1;
}
function N5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.V = +a[0]), n + a[0].length) : -1;
}
function P5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.W = +a[0]), n + a[0].length) : -1;
}
function ZO(e, t, n) {
  var a = Et.exec(t.slice(n, n + 4));
  return a ? ((e.y = +a[0]), n + a[0].length) : -1;
}
function QO(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.y = +a[0] + (+a[0] > 68 ? 1900 : 2e3)), n + a[0].length) : -1;
}
function z5(e, t, n) {
  var a = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return a
    ? ((e.Z = a[1] ? 0 : -(a[2] + (a[3] || "00"))), n + a[0].length)
    : -1;
}
function k5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 1));
  return a ? ((e.q = a[0] * 3 - 3), n + a[0].length) : -1;
}
function R5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.m = a[0] - 1), n + a[0].length) : -1;
}
function WO(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.d = +a[0]), n + a[0].length) : -1;
}
function L5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 3));
  return a ? ((e.m = 0), (e.d = +a[0]), n + a[0].length) : -1;
}
function FO(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.H = +a[0]), n + a[0].length) : -1;
}
function U5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.M = +a[0]), n + a[0].length) : -1;
}
function q5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 2));
  return a ? ((e.S = +a[0]), n + a[0].length) : -1;
}
function B5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 3));
  return a ? ((e.L = +a[0]), n + a[0].length) : -1;
}
function H5(e, t, n) {
  var a = Et.exec(t.slice(n, n + 6));
  return a ? ((e.L = Math.floor(a[0] / 1e3)), n + a[0].length) : -1;
}
function I5(e, t, n) {
  var a = E5.exec(t.slice(n, n + 1));
  return a ? n + a[0].length : -1;
}
function $5(e, t, n) {
  var a = Et.exec(t.slice(n));
  return a ? ((e.Q = +a[0]), n + a[0].length) : -1;
}
function Y5(e, t, n) {
  var a = Et.exec(t.slice(n));
  return a ? ((e.s = +a[0]), n + a[0].length) : -1;
}
function JO(e, t) {
  return Re(e.getDate(), t, 2);
}
function K5(e, t) {
  return Re(e.getHours(), t, 2);
}
function G5(e, t) {
  return Re(e.getHours() % 12 || 12, t, 2);
}
function X5(e, t) {
  return Re(1 + _o.count($r(e), e), t, 3);
}
function uj(e, t) {
  return Re(e.getMilliseconds(), t, 3);
}
function V5(e, t) {
  return uj(e, t) + "000";
}
function Z5(e, t) {
  return Re(e.getMonth() + 1, t, 2);
}
function Q5(e, t) {
  return Re(e.getMinutes(), t, 2);
}
function W5(e, t) {
  return Re(e.getSeconds(), t, 2);
}
function F5(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function J5(e, t) {
  return Re(Vf.count($r(e) - 1, e), t, 2);
}
function oj(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? El(e) : El.ceil(e);
}
function e8(e, t) {
  return ((e = oj(e)), Re(El.count($r(e), e) + ($r(e).getDay() === 4), t, 2));
}
function t8(e) {
  return e.getDay();
}
function n8(e, t) {
  return Re(Fs.count($r(e) - 1, e), t, 2);
}
function r8(e, t) {
  return Re(e.getFullYear() % 100, t, 2);
}
function a8(e, t) {
  return ((e = oj(e)), Re(e.getFullYear() % 100, t, 2));
}
function i8(e, t) {
  return Re(e.getFullYear() % 1e4, t, 4);
}
function l8(e, t) {
  var n = e.getDay();
  return (
    (e = n >= 4 || n === 0 ? El(e) : El.ceil(e)),
    Re(e.getFullYear() % 1e4, t, 4)
  );
}
function u8(e) {
  var t = e.getTimezoneOffset();
  return (
    (t > 0 ? "-" : ((t *= -1), "+")) +
    Re((t / 60) | 0, "0", 2) +
    Re(t % 60, "0", 2)
  );
}
function e_(e, t) {
  return Re(e.getUTCDate(), t, 2);
}
function o8(e, t) {
  return Re(e.getUTCHours(), t, 2);
}
function c8(e, t) {
  return Re(e.getUTCHours() % 12 || 12, t, 2);
}
function s8(e, t) {
  return Re(1 + Xf.count(Yr(e), e), t, 3);
}
function cj(e, t) {
  return Re(e.getUTCMilliseconds(), t, 3);
}
function f8(e, t) {
  return cj(e, t) + "000";
}
function d8(e, t) {
  return Re(e.getUTCMonth() + 1, t, 2);
}
function v8(e, t) {
  return Re(e.getUTCMinutes(), t, 2);
}
function h8(e, t) {
  return Re(e.getUTCSeconds(), t, 2);
}
function m8(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function y8(e, t) {
  return Re(Zf.count(Yr(e) - 1, e), t, 2);
}
function sj(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? jl(e) : jl.ceil(e);
}
function p8(e, t) {
  return (
    (e = sj(e)),
    Re(jl.count(Yr(e), e) + (Yr(e).getUTCDay() === 4), t, 2)
  );
}
function g8(e) {
  return e.getUTCDay();
}
function b8(e, t) {
  return Re(Js.count(Yr(e) - 1, e), t, 2);
}
function x8(e, t) {
  return Re(e.getUTCFullYear() % 100, t, 2);
}
function S8(e, t) {
  return ((e = sj(e)), Re(e.getUTCFullYear() % 100, t, 2));
}
function w8(e, t) {
  return Re(e.getUTCFullYear() % 1e4, t, 4);
}
function O8(e, t) {
  var n = e.getUTCDay();
  return (
    (e = n >= 4 || n === 0 ? jl(e) : jl.ceil(e)),
    Re(e.getUTCFullYear() % 1e4, t, 4)
  );
}
function _8() {
  return "+0000";
}
function t_() {
  return "%";
}
function n_(e) {
  return +e;
}
function r_(e) {
  return Math.floor(+e / 1e3);
}
var fl, fj, dj;
A8({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
});
function A8(e) {
  return (
    (fl = A5(e)),
    (fj = fl.format),
    fl.parse,
    (dj = fl.utcFormat),
    fl.utcParse,
    fl
  );
}
function E8(e) {
  return new Date(e);
}
function j8(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function Vp(e, t, n, a, u, o, s, f, d, h) {
  var m = zp(),
    p = m.invert,
    g = m.domain,
    b = h(".%L"),
    S = h(":%S"),
    _ = h("%I:%M"),
    O = h("%I %p"),
    E = h("%a %d"),
    C = h("%b %d"),
    T = h("%B"),
    D = h("%Y");
  function M(z) {
    return (
      d(z) < z
        ? b
        : f(z) < z
          ? S
          : s(z) < z
            ? _
            : o(z) < z
              ? O
              : a(z) < z
                ? u(z) < z
                  ? E
                  : C
                : n(z) < z
                  ? T
                  : D
    )(z);
  }
  return (
    (m.invert = function (z) {
      return new Date(p(z));
    }),
    (m.domain = function (z) {
      return arguments.length ? g(Array.from(z, j8)) : g().map(E8);
    }),
    (m.ticks = function (z) {
      var U = g();
      return e(U[0], U[U.length - 1], z ?? 10);
    }),
    (m.tickFormat = function (z, U) {
      return U == null ? M : h(U);
    }),
    (m.nice = function (z) {
      var U = g();
      return (
        (!z || typeof z.range != "function") &&
          (z = t(U[0], U[U.length - 1], z ?? 10)),
        z ? g(F2(U, z)) : m
      );
    }),
    (m.copy = function () {
      return Oo(m, Vp(e, t, n, a, u, o, s, f, d, h));
    }),
    m
  );
}
function T8() {
  return $n.apply(
    Vp(O5, _5, $r, Gp, Vf, _o, Yp, Ip, si, fj).domain([
      new Date(2e3, 0, 1),
      new Date(2e3, 0, 2),
    ]),
    arguments,
  );
}
function M8() {
  return $n.apply(
    Vp(S5, w5, Yr, Xp, Zf, Xf, Kp, $p, si, dj).domain([
      Date.UTC(2e3, 0, 1),
      Date.UTC(2e3, 0, 2),
    ]),
    arguments,
  );
}
function Qf() {
  var e = 0,
    t = 1,
    n,
    a,
    u,
    o,
    s = Xt,
    f = !1,
    d;
  function h(p) {
    return p == null || isNaN((p = +p))
      ? d
      : s(
          u === 0
            ? 0.5
            : ((p = (o(p) - n) * u), f ? Math.max(0, Math.min(1, p)) : p),
        );
  }
  ((h.domain = function (p) {
    return arguments.length
      ? (([e, t] = p),
        (n = o((e = +e))),
        (a = o((t = +t))),
        (u = n === a ? 0 : 1 / (a - n)),
        h)
      : [e, t];
  }),
    (h.clamp = function (p) {
      return arguments.length ? ((f = !!p), h) : f;
    }),
    (h.interpolator = function (p) {
      return arguments.length ? ((s = p), h) : s;
    }));
  function m(p) {
    return function (g) {
      var b, S;
      return arguments.length ? (([b, S] = g), (s = p(b, S)), h) : [s(0), s(1)];
    };
  }
  return (
    (h.range = m(Pl)),
    (h.rangeRound = m(Pp)),
    (h.unknown = function (p) {
      return arguments.length ? ((d = p), h) : d;
    }),
    function (p) {
      return (
        (o = p),
        (n = p(e)),
        (a = p(t)),
        (u = n === a ? 0 : 1 / (a - n)),
        h
      );
    }
  );
}
function Ra(e, t) {
  return t
    .domain(e.domain())
    .interpolator(e.interpolator())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function vj() {
  var e = ka(Qf()(Xt));
  return (
    (e.copy = function () {
      return Ra(e, vj());
    }),
    Zr.apply(e, arguments)
  );
}
function hj() {
  var e = Lp(Qf()).domain([1, 10]);
  return (
    (e.copy = function () {
      return Ra(e, hj()).base(e.base());
    }),
    Zr.apply(e, arguments)
  );
}
function mj() {
  var e = Up(Qf());
  return (
    (e.copy = function () {
      return Ra(e, mj()).constant(e.constant());
    }),
    Zr.apply(e, arguments)
  );
}
function Zp() {
  var e = qp(Qf());
  return (
    (e.copy = function () {
      return Ra(e, Zp()).exponent(e.exponent());
    }),
    Zr.apply(e, arguments)
  );
}
function C8() {
  return Zp.apply(null, arguments).exponent(0.5);
}
function yj() {
  var e = [],
    t = Xt;
  function n(a) {
    if (a != null && !isNaN((a = +a)))
      return t((So(e, a, 1) - 1) / (e.length - 1));
  }
  return (
    (n.domain = function (a) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let u of a) u != null && !isNaN((u = +u)) && e.push(u);
      return (e.sort(Ca), n);
    }),
    (n.interpolator = function (a) {
      return arguments.length ? ((t = a), n) : t;
    }),
    (n.range = function () {
      return e.map((a, u) => t(u / (e.length - 1)));
    }),
    (n.quantiles = function (a) {
      return Array.from({ length: a + 1 }, (u, o) => m6(e, o / a));
    }),
    (n.copy = function () {
      return yj(t).domain(e);
    }),
    Zr.apply(n, arguments)
  );
}
function Wf() {
  var e = 0,
    t = 0.5,
    n = 1,
    a = 1,
    u,
    o,
    s,
    f,
    d,
    h = Xt,
    m,
    p = !1,
    g;
  function b(_) {
    return isNaN((_ = +_))
      ? g
      : ((_ = 0.5 + ((_ = +m(_)) - o) * (a * _ < a * o ? f : d)),
        h(p ? Math.max(0, Math.min(1, _)) : _));
  }
  ((b.domain = function (_) {
    return arguments.length
      ? (([e, t, n] = _),
        (u = m((e = +e))),
        (o = m((t = +t))),
        (s = m((n = +n))),
        (f = u === o ? 0 : 0.5 / (o - u)),
        (d = o === s ? 0 : 0.5 / (s - o)),
        (a = o < u ? -1 : 1),
        b)
      : [e, t, n];
  }),
    (b.clamp = function (_) {
      return arguments.length ? ((p = !!_), b) : p;
    }),
    (b.interpolator = function (_) {
      return arguments.length ? ((h = _), b) : h;
    }));
  function S(_) {
    return function (O) {
      var E, C, T;
      return arguments.length
        ? (([E, C, T] = O), (h = I6(_, [E, C, T])), b)
        : [h(0), h(0.5), h(1)];
    };
  }
  return (
    (b.range = S(Pl)),
    (b.rangeRound = S(Pp)),
    (b.unknown = function (_) {
      return arguments.length ? ((g = _), b) : g;
    }),
    function (_) {
      return (
        (m = _),
        (u = _(e)),
        (o = _(t)),
        (s = _(n)),
        (f = u === o ? 0 : 0.5 / (o - u)),
        (d = o === s ? 0 : 0.5 / (s - o)),
        (a = o < u ? -1 : 1),
        b
      );
    }
  );
}
function pj() {
  var e = ka(Wf()(Xt));
  return (
    (e.copy = function () {
      return Ra(e, pj());
    }),
    Zr.apply(e, arguments)
  );
}
function gj() {
  var e = Lp(Wf()).domain([0.1, 1, 10]);
  return (
    (e.copy = function () {
      return Ra(e, gj()).base(e.base());
    }),
    Zr.apply(e, arguments)
  );
}
function bj() {
  var e = Up(Wf());
  return (
    (e.copy = function () {
      return Ra(e, bj()).constant(e.constant());
    }),
    Zr.apply(e, arguments)
  );
}
function Qp() {
  var e = qp(Wf());
  return (
    (e.copy = function () {
      return Ra(e, Qp()).exponent(e.exponent());
    }),
    Zr.apply(e, arguments)
  );
}
function D8() {
  return Qp.apply(null, arguments).exponent(0.5);
}
const Gu = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      scaleBand: Cp,
      scaleDiverging: pj,
      scaleDivergingLog: gj,
      scaleDivergingPow: Qp,
      scaleDivergingSqrt: D8,
      scaleDivergingSymlog: bj,
      scaleIdentity: W2,
      scaleImplicit: Ny,
      scaleLinear: Q2,
      scaleLog: J2,
      scaleOrdinal: Mp,
      scalePoint: g6,
      scalePow: Bp,
      scaleQuantile: nj,
      scaleQuantize: rj,
      scaleRadial: tj,
      scaleSequential: vj,
      scaleSequentialLog: hj,
      scaleSequentialPow: Zp,
      scaleSequentialQuantile: yj,
      scaleSequentialSqrt: C8,
      scaleSequentialSymlog: mj,
      scaleSqrt: f5,
      scaleSymlog: ej,
      scaleThreshold: aj,
      scaleTime: T8,
      scaleUtc: M8,
      tickFormat: Z2,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function N8(e) {
  if (e in Gu) return Gu[e]();
  var t = "scale".concat(ho(e));
  if (t in Gu) return Gu[t]();
}
function a_(e, t, n) {
  if (typeof e == "function") return e.copy().domain(t).range(n);
  if (e != null) {
    var a = N8(e);
    if (a != null) return (a.domain(t).range(n), a);
  }
}
function Wp(e, t, n, a) {
  if (!(n == null || a == null))
    return typeof e.scale == "function" ? a_(e.scale, n, a) : a_(t, n, a);
}
function P8(e) {
  return "scale".concat(ho(e));
}
function z8(e) {
  return P8(e) in Gu;
}
var xj = (e, t, n) => {
  if (e != null) {
    var { scale: a, type: u } = e;
    if (a === "auto")
      return u === "category" &&
        n &&
        (n.indexOf("LineChart") >= 0 ||
          n.indexOf("AreaChart") >= 0 ||
          (n.indexOf("ComposedChart") >= 0 && !t))
        ? "point"
        : u === "category"
          ? "band"
          : "linear";
    if (typeof a == "string") return z8(a) ? a : "point";
  }
};
function k8(e, t) {
  for (var n = 0, a = e.length, u = e[0] < e[e.length - 1]; n < a; ) {
    var o = Math.floor((n + a) / 2);
    (u ? e[o] < t : e[o] > t) ? (n = o + 1) : (a = o);
  }
  return n;
}
function Sj(e, t) {
  if (e) {
    var n = t ?? e.domain(),
      a = n.map((o) => {
        var s;
        return (s = e(o)) !== null && s !== void 0 ? s : 0;
      }),
      u = e.range();
    if (!(n.length === 0 || u.length < 2))
      return (o) => {
        var s,
          f,
          d = k8(a, o);
        if (d <= 0) return n[0];
        if (d >= n.length) return n[n.length - 1];
        var h = (s = a[d - 1]) !== null && s !== void 0 ? s : 0,
          m = (f = a[d]) !== null && f !== void 0 ? f : 0;
        return Math.abs(o - h) <= Math.abs(o - m) ? n[d - 1] : n[d];
      };
  }
}
function R8(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function"
      ? e.invert.bind(e)
      : Sj(e, void 0);
}
function i_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function ef(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? i_(Object(n), !0).forEach(function (a) {
          L8(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : i_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function L8(e, t, n) {
  return (
    (t = U8(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function U8(e) {
  var t = q8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function q8(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ry = [0, "auto"],
  ht = {
    allowDataOverflow: !1,
    allowDecimals: !0,
    allowDuplicatedCategory: !0,
    angle: 0,
    dataKey: void 0,
    domain: void 0,
    height: 30,
    hide: !0,
    id: 0,
    includeHidden: !1,
    interval: "preserveEnd",
    minTickGap: 5,
    mirror: !1,
    name: void 0,
    orientation: "bottom",
    padding: { left: 0, right: 0 },
    reversed: !1,
    scale: "auto",
    tick: !0,
    tickCount: 5,
    tickFormatter: void 0,
    ticks: void 0,
    type: "category",
    unit: void 0,
    niceTicks: "auto",
  },
  wj = (e, t) => e.cartesianAxis.xAxis[t],
  Qr = (e, t) => {
    var n = wj(e, t);
    return n ?? ht;
  },
  mt = {
    allowDataOverflow: !1,
    allowDecimals: !0,
    allowDuplicatedCategory: !0,
    angle: 0,
    dataKey: void 0,
    domain: Ry,
    hide: !0,
    id: 0,
    includeHidden: !1,
    interval: "preserveEnd",
    minTickGap: 5,
    mirror: !1,
    name: void 0,
    orientation: "left",
    padding: { top: 0, bottom: 0 },
    reversed: !1,
    scale: "auto",
    tick: !0,
    tickCount: 5,
    tickFormatter: void 0,
    ticks: void 0,
    type: "number",
    unit: void 0,
    niceTicks: "auto",
    width: po,
  },
  Oj = (e, t) => e.cartesianAxis.yAxis[t],
  Wr = (e, t) => {
    var n = Oj(e, t);
    return n ?? mt;
  },
  B8 = {
    domain: [0, "auto"],
    includeHidden: !1,
    reversed: !1,
    allowDataOverflow: !1,
    allowDuplicatedCategory: !1,
    dataKey: void 0,
    id: 0,
    name: "",
    range: [64, 64],
    scale: "auto",
    type: "number",
    unit: "",
  },
  Fp = (e, t) => {
    var n = e.cartesianAxis.zAxis[t];
    return n ?? B8;
  },
  Qt = (e, t, n) => {
    switch (t) {
      case "xAxis":
        return Qr(e, n);
      case "yAxis":
        return Wr(e, n);
      case "zAxis":
        return Fp(e, n);
      case "angleAxis":
        return Op(e, n);
      case "radiusAxis":
        return _p(e, n);
      default:
        throw new Error("Unexpected axis type: ".concat(t));
    }
  },
  H8 = (e, t, n) => {
    switch (t) {
      case "xAxis":
        return Qr(e, n);
      case "yAxis":
        return Wr(e, n);
      default:
        throw new Error("Unexpected axis type: ".concat(t));
    }
  },
  Ao = (e, t, n) => {
    switch (t) {
      case "xAxis":
        return Qr(e, n);
      case "yAxis":
        return Wr(e, n);
      case "angleAxis":
        return Op(e, n);
      case "radiusAxis":
        return _p(e, n);
      default:
        throw new Error("Unexpected axis type: ".concat(t));
    }
  },
  _j = (e) =>
    e.graphicalItems.cartesianItems.some((t) => t.type === "bar") ||
    e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function Aj(e, t) {
  return (n) => {
    switch (e) {
      case "xAxis":
        return "xAxisId" in n && n.xAxisId === t;
      case "yAxis":
        return "yAxisId" in n && n.yAxisId === t;
      case "zAxis":
        return "zAxisId" in n && n.zAxisId === t;
      case "angleAxis":
        return "angleAxisId" in n && n.angleAxisId === t;
      case "radiusAxis":
        return "radiusAxisId" in n && n.radiusAxisId === t;
      default:
        return !1;
    }
  };
}
var Ej = (e) => e.graphicalItems.cartesianItems,
  I8 = $([_t, $f], Aj),
  jj = (e, t, n) =>
    e.filter(n).filter((a) => (t?.includeHidden === !0 ? !0 : !a.hide)),
  Eo = $([Ej, Qt, I8], jj, { memoizeOptions: { resultEqualityCheck: Kf } }),
  Tj = $([Eo], (e) =>
    e.filter((t) => t.type === "area" || t.type === "bar").filter(Ep),
  ),
  Mj = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0),
  $8 = $([Eo], Mj),
  Cj = (e) =>
    e
      .map((t) => t.data)
      .filter(Boolean)
      .flat(1),
  Y8 = $([Eo], Cj, { memoizeOptions: { resultEqualityCheck: Kf } }),
  Dj = (e, t) => {
    var { chartData: n = [], dataStartIndex: a, dataEndIndex: u } = t;
    return e.length > 0 ? e : n.slice(a, u + 1);
  },
  Jp = $([Y8, yp], Dj),
  Nj = (e, t, n) =>
    t?.dataKey != null
      ? e.map((a) => ({ value: qt(a, t.dataKey) }))
      : n.length > 0
        ? n
            .map((a) => a.dataKey)
            .flatMap((a) => e.map((u) => ({ value: qt(u, a) })))
        : e.map((a) => ({ value: a })),
  jo = $([Jp, Qt, Eo], Nj);
function wl(e) {
  if (fr(e) || e instanceof Date) {
    var t = Number(e);
    if (ke(t)) return t;
  }
}
function l_(e) {
  if (Array.isArray(e)) {
    var t = [wl(e[0]), wl(e[1])];
    return or(t) ? t : void 0;
  }
  var n = wl(e);
  if (n != null) return [n, n];
}
function Kr(e) {
  return e.map(wl).filter(ln);
}
function K8(e, t) {
  var n = wl(e),
    a = wl(t);
  return n == null && a == null ? 0 : n == null ? -1 : a == null ? 1 : n - a;
}
var G8 = $([jo], (e) => e?.map((t) => t.value).sort(K8));
function Pj(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function X8(e, t, n) {
  return !n || typeof t != "number" || Br(t)
    ? []
    : n.length
      ? Kr(
          n.flatMap((a) => {
            var u = qt(e, a.dataKey),
              o,
              s;
            if (
              (Array.isArray(u) ? ([o, s] = u) : (o = s = u),
              !(!ke(o) || !ke(s)))
            )
              return [t - o, t + s];
          }),
        )
      : [];
}
var gt = (e) => {
    var t = At(e),
      n = Nl(e);
    return Ao(e, t, n);
  },
  To = $([gt], (e) => e?.dataKey),
  V8 = $([Tj, yp, gt], B2),
  zj = (e, t, n, a) => {
    var u = {},
      o = t.reduce((s, f) => {
        if (f.stackId == null) return s;
        var d = s[f.stackId];
        return (d == null && (d = []), d.push(f), (s[f.stackId] = d), s);
      }, u);
    return Object.fromEntries(
      Object.entries(o).map((s) => {
        var [f, d] = s,
          h = a ? [...d].reverse() : d,
          m = h.map(q2);
        return [f, { stackedData: Qk(e, m, n), graphicalItems: h }];
      }),
    );
  },
  Z8 = $([V8, Tj, qf, N2], zj),
  kj = (e, t, n, a) => {
    var { dataStartIndex: u, dataEndIndex: o } = t;
    if (a == null && n !== "zAxis") {
      var s = Jk(e, u, o);
      if (!(s != null && s[0] === 0 && s[1] === 0)) return s;
    }
  },
  Q8 = $([Qt], (e) => e.allowDataOverflow),
  eg = (e) => {
    var t;
    if (e == null || !("domain" in e)) return Ry;
    if (e.domain != null) return e.domain;
    if ("ticks" in e && e.ticks != null) {
      if (e.type === "number") {
        var n = Kr(e.ticks);
        return [Math.min(...n), Math.max(...n)];
      }
      if (e.type === "category") return e.ticks.map(String);
    }
    return (t = e?.domain) !== null && t !== void 0 ? t : Ry;
  },
  Rj = $([Qt], eg),
  Lj = $([Rj, Q8], S2),
  W8 = $([Z8, za, _t, Lj], kj, { memoizeOptions: { resultEqualityCheck: Yf } }),
  tg = (e) => e.errorBars,
  F8 = (e, t, n) =>
    e
      .flatMap((a) => t[a.id])
      .filter(Boolean)
      .filter((a) => Pj(n, a)),
  tf = function () {
    for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++)
      n[a] = arguments[a];
    var u = n.filter(Boolean);
    if (u.length !== 0) {
      var o = u.flat(),
        s = Math.min(...o),
        f = Math.max(...o);
      return [s, f];
    }
  },
  Uj = (e, t, n, a, u) => {
    var o, s;
    if (
      (n.length > 0 &&
        e.forEach((f) => {
          n.forEach((d) => {
            var h,
              m,
              p =
                (h = a[d.id]) === null || h === void 0
                  ? void 0
                  : h.filter((E) => Pj(u, E)),
              g = qt(
                f,
                (m = t.dataKey) !== null && m !== void 0 ? m : d.dataKey,
              ),
              b = X8(f, g, p);
            if (b.length >= 2) {
              var S = Math.min(...b),
                _ = Math.max(...b);
              ((o == null || S < o) && (o = S),
                (s == null || _ > s) && (s = _));
            }
            var O = l_(g);
            O != null &&
              ((o = o == null ? O[0] : Math.min(o, O[0])),
              (s = s == null ? O[1] : Math.max(s, O[1])));
          });
        }),
      t?.dataKey != null &&
        e.forEach((f) => {
          var d = l_(qt(f, t.dataKey));
          d != null &&
            ((o = o == null ? d[0] : Math.min(o, d[0])),
            (s = s == null ? d[1] : Math.max(s, d[1])));
        }),
      ke(o) && ke(s))
    )
      return [o, s];
  },
  J8 = $([Jp, Qt, $8, tg, _t], Uj, {
    memoizeOptions: { resultEqualityCheck: Yf },
  });
function eL(e) {
  var { value: t } = e;
  if (fr(t) || t instanceof Date) return t;
}
var tL = (e, t, n) => {
    var a = e.map(eL).filter((u) => u != null);
    return n && (t.dataKey == null || (t.allowDuplicatedCategory && ZA(a)))
      ? x2(0, e.length)
      : t.allowDuplicatedCategory
        ? a
        : Array.from(new Set(a));
  },
  qj = (e) => e.referenceElements.dots,
  zl = (e, t, n) =>
    e
      .filter((a) => a.ifOverflow === "extendDomain")
      .filter((a) => (t === "xAxis" ? a.xAxisId === n : a.yAxisId === n)),
  nL = $([qj, _t, $f], zl),
  Bj = (e) => e.referenceElements.areas,
  rL = $([Bj, _t, $f], zl),
  Hj = (e) => e.referenceElements.lines,
  aL = $([Hj, _t, $f], zl),
  Ij = (e, t) => {
    if (e != null) {
      var n = Kr(e.map((a) => (t === "xAxis" ? a.x : a.y)));
      if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
    }
  },
  iL = $(nL, _t, Ij),
  $j = (e, t) => {
    if (e != null) {
      var n = Kr(
        e.flatMap((a) => [
          t === "xAxis" ? a.x1 : a.y1,
          t === "xAxis" ? a.x2 : a.y2,
        ]),
      );
      if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
    }
  },
  lL = $([rL, _t], $j);
function uL(e) {
  var t;
  if (e.x != null) return Kr([e.x]);
  var n = (t = e.segment) === null || t === void 0 ? void 0 : t.map((a) => a.x);
  return n == null || n.length === 0 ? [] : Kr(n);
}
function oL(e) {
  var t;
  if (e.y != null) return Kr([e.y]);
  var n = (t = e.segment) === null || t === void 0 ? void 0 : t.map((a) => a.y);
  return n == null || n.length === 0 ? [] : Kr(n);
}
var Yj = (e, t) => {
    if (e != null) {
      var n = e.flatMap((a) => (t === "xAxis" ? uL(a) : oL(a)));
      if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
    }
  },
  cL = $([aL, _t], Yj),
  sL = $(iL, cL, lL, (e, t, n) => tf(e, n, t)),
  Kj = (e, t, n, a, u, o, s, f) => {
    if (n != null) return n;
    var d =
        (s === "vertical" && f === "xAxis") ||
        (s === "horizontal" && f === "yAxis"),
      h = d ? tf(a, o, u) : tf(o, u);
    return Y4(t, h, e.allowDataOverflow);
  },
  fL = $([Qt, Rj, Lj, W8, J8, sL, et, _t], Kj, {
    memoizeOptions: { resultEqualityCheck: Yf },
  }),
  dL = [0, 1],
  Gj = (e, t, n, a, u, o, s) => {
    if (!((e == null || n == null || n.length === 0) && s === void 0)) {
      var { dataKey: f, type: d } = e,
        h = Gr(t, o);
      if (h && f == null) {
        var m;
        return x2(0, (m = n?.length) !== null && m !== void 0 ? m : 0);
      }
      return d === "category" ? tL(a, e, h) : u === "expand" ? dL : s;
    }
  },
  ng = $([Qt, et, Jp, jo, qf, _t, fL], Gj),
  kl = $([Qt, _j, xp], xj),
  Xj = (e, t, n) => {
    var { niceTicks: a } = t;
    if (a !== "none") {
      var u = eg(t),
        o = Array.isArray(u) && (u[0] === "auto" || u[1] === "auto");
      if (
        (a === "snap125" || a === "adaptive") &&
        t != null &&
        t.tickCount &&
        or(e)
      ) {
        if (o) return yO(e, t.tickCount, t.allowDecimals, a);
        if (t.type === "number") return pO(e, t.tickCount, t.allowDecimals, a);
      }
      if (a === "auto" && n === "linear" && t != null && t.tickCount) {
        if (o && or(e)) return yO(e, t.tickCount, t.allowDecimals, "adaptive");
        if (t.type === "number" && or(e))
          return pO(e, t.tickCount, t.allowDecimals, "adaptive");
      }
    }
  },
  rg = $([ng, Ao, kl], Xj),
  Vj = (e, t, n, a) => {
    if (
      a !== "angleAxis" &&
      e?.type === "number" &&
      or(t) &&
      Array.isArray(n) &&
      n.length > 0
    ) {
      var u,
        o,
        s = t[0],
        f = (u = n[0]) !== null && u !== void 0 ? u : 0,
        d = t[1],
        h = (o = n[n.length - 1]) !== null && o !== void 0 ? o : 0;
      return [Math.min(s, f), Math.max(d, h)];
    }
    return t;
  },
  vL = $([Qt, ng, rg, _t], Vj),
  hL = $(jo, Qt, (e, t) => {
    if (!(!t || t.type !== "number")) {
      var n = 1 / 0,
        a = Array.from(Kr(e.map((p) => p.value))).sort((p, g) => p - g),
        u = a[0],
        o = a[a.length - 1];
      if (u == null || o == null) return 1 / 0;
      var s = o - u;
      if (s === 0) return 1 / 0;
      for (var f = 0; f < a.length - 1; f++) {
        var d = a[f],
          h = a[f + 1];
        if (!(d == null || h == null)) {
          var m = h - d;
          n = Math.min(n, m);
        }
      }
      return n / s;
    }
  }),
  Zj = $(
    hL,
    et,
    Z4,
    Bt,
    (e, t, n, a, u) => u,
    (e, t, n, a, u) => {
      if (!ke(e)) return 0;
      var o = t === "vertical" ? a.height : a.width;
      if (u === "gap") return (e * o) / 2;
      if (u === "no-gap") {
        var s = Na(n, e * o),
          f = (e * o) / 2;
        return f - s - ((f - s) / o) * s;
      }
      return 0;
    },
  ),
  mL = (e, t, n) => {
    var a = Qr(e, t);
    return a == null || typeof a.padding != "string"
      ? 0
      : Zj(e, "xAxis", t, n, a.padding);
  },
  yL = (e, t, n) => {
    var a = Wr(e, t);
    return a == null || typeof a.padding != "string"
      ? 0
      : Zj(e, "yAxis", t, n, a.padding);
  },
  pL = $(Qr, mL, (e, t) => {
    var n, a;
    if (e == null) return { left: 0, right: 0 };
    var { padding: u } = e;
    return typeof u == "string"
      ? { left: t, right: t }
      : {
          left: ((n = u.left) !== null && n !== void 0 ? n : 0) + t,
          right: ((a = u.right) !== null && a !== void 0 ? a : 0) + t,
        };
  }),
  gL = $(Wr, yL, (e, t) => {
    var n, a;
    if (e == null) return { top: 0, bottom: 0 };
    var { padding: u } = e;
    return typeof u == "string"
      ? { top: t, bottom: t }
      : {
          top: ((n = u.top) !== null && n !== void 0 ? n : 0) + t,
          bottom: ((a = u.bottom) !== null && a !== void 0 ? a : 0) + t,
        };
  }),
  bL = $([Bt, pL, Pf, Nf, (e, t, n) => n], (e, t, n, a, u) => {
    var { padding: o } = a;
    return u
      ? [o.left, n.width - o.right]
      : [e.left + t.left, e.left + e.width - t.right];
  }),
  xL = $([Bt, et, gL, Pf, Nf, (e, t, n) => n], (e, t, n, a, u, o) => {
    var { padding: s } = u;
    return o
      ? [a.height - s.bottom, s.top]
      : t === "horizontal"
        ? [e.top + e.height - n.bottom, e.top + n.top]
        : [e.top + n.top, e.top + e.height - n.bottom];
  }),
  Mo = (e, t, n, a) => {
    var u;
    switch (t) {
      case "xAxis":
        return bL(e, n, a);
      case "yAxis":
        return xL(e, n, a);
      case "zAxis":
        return (u = Fp(e, n)) === null || u === void 0 ? void 0 : u.range;
      case "angleAxis":
        return R2(e);
      case "radiusAxis":
        return L2(e, n);
      default:
        return;
    }
  },
  Qj = $([Qt, Mo], Bf),
  SL = $([kl, vL], r6),
  ag = $([Qt, kl, SL, Qj], Wp),
  Wj = (e, t, n, a) => {
    if (!(n == null || n.dataKey == null)) {
      var { type: u, scale: o } = n,
        s = Gr(e, a);
      if (s && (u === "number" || o !== "auto")) return t.map((f) => f.value);
    }
  },
  ig = $([et, jo, Ao, _t], Wj),
  Ff = $([ag], jp);
$([ag], R8);
$([ag, G8], Sj);
$([Eo, tg, _t], F8);
function Fj(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var Jf = (e, t) => t,
  ed = (e, t, n) => n,
  wL = $(Cf, Jf, ed, (e, t, n) =>
    e
      .filter((a) => a.orientation === t)
      .filter((a) => a.mirror === n)
      .sort(Fj),
  ),
  OL = $(Df, Jf, ed, (e, t, n) =>
    e
      .filter((a) => a.orientation === t)
      .filter((a) => a.mirror === n)
      .sort(Fj),
  ),
  Jj = (e, t) => ({ width: e.width, height: t.height }),
  _L = (e, t) => {
    var n = typeof t.width == "number" ? t.width : po;
    return { width: n, height: e.height };
  },
  AL = $(Bt, Qr, Jj),
  EL = (e, t, n) => {
    switch (t) {
      case "top":
        return e.top;
      case "bottom":
        return n - e.bottom;
      default:
        return 0;
    }
  },
  jL = (e, t, n) => {
    switch (t) {
      case "left":
        return e.left;
      case "right":
        return n - e.right;
      default:
        return 0;
    }
  },
  TL = $(Vr, Bt, wL, Jf, ed, (e, t, n, a, u) => {
    var o = {},
      s;
    return (
      n.forEach((f) => {
        var d = Jj(t, f);
        s == null && (s = EL(t, a, e));
        var h = (a === "top" && !u) || (a === "bottom" && u);
        ((o[f.id] = s - Number(h) * d.height), (s += (h ? -1 : 1) * d.height));
      }),
      o
    );
  }),
  ML = $(Xr, Bt, OL, Jf, ed, (e, t, n, a, u) => {
    var o = {},
      s;
    return (
      n.forEach((f) => {
        var d = _L(t, f);
        s == null && (s = jL(t, a, e));
        var h = (a === "left" && !u) || (a === "right" && u);
        ((o[f.id] = s - Number(h) * d.width), (s += (h ? -1 : 1) * d.width));
      }),
      o
    );
  }),
  CL = (e, t) => {
    var n = Qr(e, t);
    if (n != null) return TL(e, n.orientation, n.mirror);
  },
  DL = $([Bt, Qr, CL, (e, t) => t], (e, t, n, a) => {
    if (t != null) {
      var u = n?.[a];
      return u == null ? { x: e.left, y: 0 } : { x: e.left, y: u };
    }
  }),
  NL = (e, t) => {
    var n = Wr(e, t);
    if (n != null) return ML(e, n.orientation, n.mirror);
  },
  PL = $([Bt, Wr, NL, (e, t) => t], (e, t, n, a) => {
    if (t != null) {
      var u = n?.[a];
      return u == null ? { x: 0, y: e.top } : { x: u, y: e.top };
    }
  }),
  zL = $(Bt, Wr, (e, t) => {
    var n = typeof t.width == "number" ? t.width : po;
    return { width: n, height: e.height };
  }),
  eT = (e, t, n, a) => {
    if (n != null) {
      var { allowDuplicatedCategory: u, type: o, dataKey: s } = n,
        f = Gr(e, a),
        d = t.map((h) => h.value);
      if (s && f && o === "category" && u && ZA(d)) return d;
    }
  },
  lg = $([et, jo, Qt, _t], eT),
  u_ = $([et, H8, kl, Ff, lg, ig, Mo, rg, _t], (e, t, n, a, u, o, s, f, d) => {
    if (t != null) {
      var h = Gr(e, d);
      return {
        angle: t.angle,
        interval: t.interval,
        minTickGap: t.minTickGap,
        orientation: t.orientation,
        tick: t.tick,
        tickCount: t.tickCount,
        tickFormatter: t.tickFormatter,
        ticks: t.ticks,
        type: t.type,
        unit: t.unit,
        axisType: d,
        categoricalDomain: o,
        duplicateDomain: u,
        isCategorical: h,
        niceTicks: f,
        range: s,
        realScaleType: n,
        scale: a,
      };
    }
  }),
  kL = (e, t, n, a, u, o, s, f, d) => {
    if (!(t == null || a == null)) {
      var h = Gr(e, d),
        { type: m, ticks: p, tickCount: g } = t,
        b =
          n === "scaleBand" && typeof a.bandwidth == "function"
            ? a.bandwidth() / 2
            : 2,
        S = m === "category" && a.bandwidth ? a.bandwidth() / b : 0;
      S =
        d === "angleAxis" && o != null && o.length >= 2
          ? qn(o[0] - o[1]) * 2 * S
          : S;
      var _ = p || u;
      return _
        ? _.map((O, E) => {
            var C = s ? s.indexOf(O) : O,
              T = a.map(C);
            return ke(T)
              ? { index: E, coordinate: T + S, value: O, offset: S }
              : null;
          }).filter(ln)
        : h && f
          ? f
              .map((O, E) => {
                var C = a.map(O);
                return ke(C)
                  ? { coordinate: C + S, value: O, index: E, offset: S }
                  : null;
              })
              .filter(ln)
          : a.ticks
            ? a
                .ticks(g)
                .map((O, E) => {
                  var C = a.map(O);
                  return ke(C)
                    ? { coordinate: C + S, value: O, index: E, offset: S }
                    : null;
                })
                .filter(ln)
            : a
                .domain()
                .map((O, E) => {
                  var C = a.map(O);
                  return ke(C)
                    ? {
                        coordinate: C + S,
                        value: s ? s[O] : O,
                        index: E,
                        offset: S,
                      }
                    : null;
                })
                .filter(ln);
    }
  },
  tT = $([et, Ao, kl, Ff, rg, Mo, lg, ig, _t], kL),
  RL = (e, t, n, a, u, o, s) => {
    if (!(t == null || n == null || a == null || a[0] === a[1])) {
      var f = Gr(e, s),
        { tickCount: d } = t,
        h = 0;
      return (
        (h = s === "angleAxis" && a?.length >= 2 ? qn(a[0] - a[1]) * 2 * h : h),
        f && o
          ? o
              .map((m, p) => {
                var g = n.map(m);
                return ke(g)
                  ? { coordinate: g + h, value: m, index: p, offset: h }
                  : null;
              })
              .filter(ln)
          : n.ticks
            ? n
                .ticks(d)
                .map((m, p) => {
                  var g = n.map(m);
                  return ke(g)
                    ? { coordinate: g + h, value: m, index: p, offset: h }
                    : null;
                })
                .filter(ln)
            : n
                .domain()
                .map((m, p) => {
                  var g = n.map(m);
                  return ke(g)
                    ? {
                        coordinate: g + h,
                        value: u ? u[m] : m,
                        index: p,
                        offset: h,
                      }
                    : null;
                })
                .filter(ln)
      );
    }
  },
  nT = $([et, Ao, Ff, Mo, lg, ig, _t], RL),
  rT = $(Qt, Ff, (e, t) => {
    if (!(e == null || t == null)) return ef(ef({}, e), {}, { scale: t });
  }),
  LL = $([Qt, kl, ng, Qj], Wp),
  UL = $([LL], jp);
$(
  (e, t, n) => Fp(e, n),
  UL,
  (e, t) => {
    if (!(e == null || t == null)) return ef(ef({}, e), {}, { scale: t });
  },
);
var qL = $([et, Cf, Df], (e, t, n) => {
    switch (e) {
      case "horizontal":
        return t.some((a) => a.reversed) ? "right-to-left" : "left-to-right";
      case "vertical":
        return n.some((a) => a.reversed) ? "bottom-to-top" : "top-to-bottom";
      case "centric":
      case "radial":
        return "left-to-right";
      default:
        return;
    }
  }),
  BL = (e, t, n) => {
    var a;
    return (a = e.renderedTicks[t]) === null || a === void 0 ? void 0 : a[n];
  };
$([BL], (e) => {
  if (!(!e || e.length === 0))
    return (t) => {
      var n,
        a = 1 / 0,
        u = e[0];
      for (var o of e) {
        var s = Math.abs(o.coordinate - t);
        s < a && ((a = s), (u = o));
      }
      return (n = u) === null || n === void 0 ? void 0 : n.value;
    };
});
var aT = (e) => e.options.defaultTooltipEventType,
  iT = (e) => e.options.validateTooltipEventTypes;
function lT(e, t, n) {
  if (e == null) return t;
  var a = e ? "axis" : "item";
  return n == null ? t : n.includes(a) ? a : t;
}
function ug(e, t) {
  var n = aT(e),
    a = iT(e);
  return lT(t, n, a);
}
function HL(e) {
  return ye((t) => ug(t, e));
}
var uT = (e, t) => {
    var n,
      a = Number(t);
    if (!(Br(a) || t == null))
      return a >= 0
        ? e == null || (n = e[a]) === null || n === void 0
          ? void 0
          : n.value
        : void 0;
  },
  IL = (e) => e.tooltip.settings,
  Ta = {
    active: !1,
    index: null,
    dataKey: void 0,
    graphicalItemId: void 0,
    coordinate: void 0,
  },
  $L = {
    itemInteraction: { click: Ta, hover: Ta },
    axisInteraction: { click: Ta, hover: Ta },
    keyboardInteraction: Ta,
    syncInteraction: {
      active: !1,
      index: null,
      dataKey: void 0,
      label: void 0,
      coordinate: void 0,
      sourceViewBox: void 0,
      graphicalItemId: void 0,
    },
    tooltipItemPayloads: [],
    settings: {
      shared: void 0,
      trigger: "hover",
      axisId: 0,
      active: !1,
      defaultIndex: void 0,
    },
  },
  oT = Yt({
    name: "tooltip",
    initialState: $L,
    reducers: {
      addTooltipEntrySettings: {
        reducer(e, t) {
          e.tooltipItemPayloads.push(t.payload);
        },
        prepare: Qe(),
      },
      replaceTooltipEntrySettings: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload,
            u = Bn(e).tooltipItemPayloads.indexOf(n);
          u > -1 && (e.tooltipItemPayloads[u] = a);
        },
        prepare: Qe(),
      },
      removeTooltipEntrySettings: {
        reducer(e, t) {
          var n = Bn(e).tooltipItemPayloads.indexOf(t.payload);
          n > -1 && e.tooltipItemPayloads.splice(n, 1);
        },
        prepare: Qe(),
      },
      setTooltipSettingsState(e, t) {
        e.settings = t.payload;
      },
      setActiveMouseOverItemIndex(e, t) {
        ((e.syncInteraction.active = !1),
          (e.keyboardInteraction.active = !1),
          (e.itemInteraction.hover.active = !0),
          (e.itemInteraction.hover.index = t.payload.activeIndex),
          (e.itemInteraction.hover.dataKey = t.payload.activeDataKey),
          (e.itemInteraction.hover.graphicalItemId =
            t.payload.activeGraphicalItemId),
          (e.itemInteraction.hover.coordinate = t.payload.activeCoordinate));
      },
      mouseLeaveChart(e) {
        ((e.itemInteraction.hover.active = !1),
          (e.axisInteraction.hover.active = !1));
      },
      mouseLeaveItem(e) {
        e.itemInteraction.hover.active = !1;
      },
      setActiveClickItemIndex(e, t) {
        ((e.syncInteraction.active = !1),
          (e.itemInteraction.click.active = !0),
          (e.keyboardInteraction.active = !1),
          (e.itemInteraction.click.index = t.payload.activeIndex),
          (e.itemInteraction.click.dataKey = t.payload.activeDataKey),
          (e.itemInteraction.click.graphicalItemId =
            t.payload.activeGraphicalItemId),
          (e.itemInteraction.click.coordinate = t.payload.activeCoordinate));
      },
      setMouseOverAxisIndex(e, t) {
        ((e.syncInteraction.active = !1),
          (e.axisInteraction.hover.active = !0),
          (e.keyboardInteraction.active = !1),
          (e.axisInteraction.hover.index = t.payload.activeIndex),
          (e.axisInteraction.hover.dataKey = t.payload.activeDataKey),
          (e.axisInteraction.hover.coordinate = t.payload.activeCoordinate));
      },
      setMouseClickAxisIndex(e, t) {
        ((e.syncInteraction.active = !1),
          (e.keyboardInteraction.active = !1),
          (e.axisInteraction.click.active = !0),
          (e.axisInteraction.click.index = t.payload.activeIndex),
          (e.axisInteraction.click.dataKey = t.payload.activeDataKey),
          (e.axisInteraction.click.coordinate = t.payload.activeCoordinate));
      },
      setSyncInteraction(e, t) {
        e.syncInteraction = t.payload;
      },
      setKeyboardInteraction(e, t) {
        ((e.keyboardInteraction.active = t.payload.active),
          (e.keyboardInteraction.index = t.payload.activeIndex),
          (e.keyboardInteraction.coordinate = t.payload.activeCoordinate));
      },
    },
  }),
  {
    addTooltipEntrySettings: YL,
    replaceTooltipEntrySettings: KL,
    removeTooltipEntrySettings: GL,
    setTooltipSettingsState: XL,
    setActiveMouseOverItemIndex: VL,
    mouseLeaveItem: K$,
    mouseLeaveChart: cT,
    setActiveClickItemIndex: G$,
    setMouseOverAxisIndex: sT,
    setMouseClickAxisIndex: ZL,
    setSyncInteraction: Ly,
    setKeyboardInteraction: nf,
  } = oT.actions,
  QL = oT.reducer;
function o_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function us(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? o_(Object(n), !0).forEach(function (a) {
          WL(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : o_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function WL(e, t, n) {
  return (
    (t = FL(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function FL(e) {
  var t = JL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JL(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eU(e, t, n) {
  return t === "axis"
    ? n === "click"
      ? e.axisInteraction.click
      : e.axisInteraction.hover
    : n === "click"
      ? e.itemInteraction.click
      : e.itemInteraction.hover;
}
function tU(e) {
  return e.index != null;
}
var fT = (e, t, n, a) => {
  if (t == null) return Ta;
  var u = eU(e, t, n);
  if (u == null) return Ta;
  if (u.active) return u;
  if (e.keyboardInteraction.active) return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var o = e.settings.active === !0;
  if (tU(u)) {
    if (o) return us(us({}, u), {}, { active: !0 });
  } else if (a != null)
    return {
      active: !0,
      coordinate: void 0,
      dataKey: void 0,
      index: a,
      graphicalItemId: void 0,
    };
  return us(us({}, Ta), {}, { coordinate: u.coordinate });
};
function nU(e) {
  if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var n = Number(e);
  return Number.isFinite(n) ? n : void 0;
}
function rU(e, t) {
  var n = nU(e),
    a = t[0],
    u = t[1];
  if (n === void 0) return !1;
  var o = Math.min(a, u),
    s = Math.max(a, u);
  return n >= o && n <= s;
}
function aU(e, t, n) {
  if (n == null || t == null) return !0;
  var a = qt(e, t);
  return a == null || !or(n) ? !0 : rU(a, n);
}
var og = (e, t, n, a) => {
    var u = e?.index;
    if (u == null) return null;
    var o = Number(u);
    if (!ke(o)) return u;
    var s = 0,
      f = 1 / 0;
    t.length > 0 && (f = t.length - 1);
    var d = Math.max(s, Math.min(o, f)),
      h = t[d];
    return h == null || aU(h, n, a) ? String(d) : null;
  },
  dT = (e, t, n, a, u, o, s) => {
    if (o != null) {
      var f = s[0],
        d = f?.getPosition(o);
      if (d != null) return d;
      var h = u?.[Number(o)];
      if (h)
        return n === "horizontal"
          ? { x: h.coordinate, y: (a.top + t) / 2 }
          : { x: (a.left + e) / 2, y: h.coordinate };
    }
  },
  vT = (e, t, n, a) => {
    if (t === "axis") return e.tooltipItemPayloads;
    if (e.tooltipItemPayloads.length === 0) return [];
    var u;
    if (
      (n === "hover"
        ? (u = e.itemInteraction.hover.graphicalItemId)
        : (u = e.itemInteraction.click.graphicalItemId),
      e.syncInteraction.active && u == null)
    )
      return e.tooltipItemPayloads;
    if (u == null && a != null) {
      var o = e.tooltipItemPayloads[0];
      return o != null ? [o] : [];
    }
    return e.tooltipItemPayloads.filter((s) => {
      var f;
      return (
        ((f = s.settings) === null || f === void 0
          ? void 0
          : f.graphicalItemId) === u
      );
    });
  },
  hT = (e) => e.options.tooltipPayloadSearcher,
  Rl = (e) => e.tooltip;
function c_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function s_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? c_(Object(n), !0).forEach(function (a) {
          iU(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : c_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function iU(e, t, n) {
  return (
    (t = lU(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function lU(e) {
  var t = uU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function uU(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function oU(e) {
  if (typeof e == "string" || typeof e == "number") return e;
}
function cU(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function sU(e) {
  if (typeof e == "string" || typeof e == "number") return e;
  if (typeof e == "function") return (t) => e(t);
}
function f_(e) {
  if (typeof e == "string") return e;
}
function fU(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? oU(e.name) : void 0,
      n = "unit" in e ? cU(e.unit) : void 0,
      a = "dataKey" in e ? sU(e.dataKey) : void 0,
      u = "payload" in e ? e.payload : void 0,
      o = "color" in e ? f_(e.color) : void 0,
      s = "fill" in e ? f_(e.fill) : void 0;
    return { name: t, unit: n, dataKey: a, payload: u, color: o, fill: s };
  }
}
function dU(e, t) {
  return e ?? t;
}
var mT = (e, t, n, a, u, o, s) => {
    if (!(t == null || o == null)) {
      var {
          chartData: f,
          computedData: d,
          dataStartIndex: h,
          dataEndIndex: m,
        } = n,
        p = [];
      return e.reduce((g, b) => {
        var S,
          { dataDefinedOnItem: _, settings: O } = b,
          E = dU(_, f),
          C = Array.isArray(E) ? IE(E, h, m) : E,
          T = (S = O?.dataKey) !== null && S !== void 0 ? S : a,
          D = O?.nameKey,
          M;
        if (
          (a && Array.isArray(C) && !Array.isArray(C[0]) && s === "axis"
            ? (M = QA(C, a, u))
            : (M = o(C, t, d, D)),
          Array.isArray(M))
        )
          M.forEach((U) => {
            var V,
              F,
              ae = fU(U),
              ne = ae?.name,
              K = ae?.dataKey,
              q = ae?.payload,
              re = s_(
                s_({}, O),
                {},
                {
                  name: ne,
                  unit: ae?.unit,
                  color:
                    (V = ae?.color) !== null && V !== void 0 ? V : O?.color,
                  fill: (F = ae?.fill) !== null && F !== void 0 ? F : O?.fill,
                },
              );
            g.push(
              lw({
                tooltipEntrySettings: re,
                dataKey: K,
                payload: q,
                value: qt(q, K),
                name: ne == null ? void 0 : String(ne),
              }),
            );
          });
        else {
          var z;
          g.push(
            lw({
              tooltipEntrySettings: O,
              dataKey: T,
              payload: M,
              value: qt(M, T),
              name: (z = qt(M, D)) !== null && z !== void 0 ? z : O?.name,
            }),
          );
        }
        return g;
      }, p);
    }
  },
  cg = $([gt, _j, xp], xj),
  vU = $(
    [
      (e) => e.graphicalItems.cartesianItems,
      (e) => e.graphicalItems.polarItems,
    ],
    (e, t) => [...e, ...t],
  ),
  hU = $([At, Nl], Aj),
  Ll = $([vU, gt, hU], jj, { memoizeOptions: { resultEqualityCheck: Kf } }),
  mU = $([Ll], (e) => e.filter(Ep)),
  yU = $([Ll], Cj, { memoizeOptions: { resultEqualityCheck: Kf } }),
  Ul = $([yU, za], Dj),
  pU = $([mU, za, gt], B2),
  sg = $([Ul, gt, Ll], Nj),
  yT = $([gt], eg),
  gU = $([gt], (e) => e.allowDataOverflow),
  pT = $([yT, gU], S2),
  bU = $([Ll], (e) => e.filter(Ep)),
  xU = $([pU, bU, qf, N2], zj),
  SU = $([xU, za, At, pT], kj),
  wU = $([Ll], Mj),
  OU = $([Ul, gt, wU, tg, At], Uj, {
    memoizeOptions: { resultEqualityCheck: Yf },
  }),
  _U = $([qj, At, Nl], zl),
  AU = $([_U, At], Ij),
  EU = $([Bj, At, Nl], zl),
  jU = $([EU, At], $j),
  TU = $([Hj, At, Nl], zl),
  MU = $([TU, At], Yj),
  CU = $([AU, MU, jU], tf),
  DU = $([gt, yT, pT, SU, OU, CU, et, At], Kj),
  Co = $([gt, et, Ul, sg, qf, At, DU], Gj),
  NU = $([Co, gt, cg], Xj),
  PU = $([gt, Co, NU, At], Vj),
  gT = (e) => {
    var t = At(e),
      n = Nl(e),
      a = !1;
    return Mo(e, t, n, a);
  },
  bT = $([gt, gT], Bf),
  zU = $([gt, cg, PU, bT], Wp),
  xT = $([zU], jp),
  kU = $([et, sg, gt, At], eT),
  RU = $([et, sg, gt, At], Wj),
  LU = (e, t, n, a, u, o, s, f) => {
    if (t) {
      var { type: d } = t,
        h = Gr(e, f);
      if (a) {
        var m = n === "scaleBand" && a.bandwidth ? a.bandwidth() / 2 : 2,
          p = d === "category" && a.bandwidth ? a.bandwidth() / m : 0;
        return (
          (p =
            f === "angleAxis" && u != null && u?.length >= 2
              ? qn(u[0] - u[1]) * 2 * p
              : p),
          h && s
            ? s
                .map((g, b) => {
                  var S = a.map(g);
                  return ke(S)
                    ? { coordinate: S + p, value: g, index: b, offset: p }
                    : null;
                })
                .filter(ln)
            : a
                .domain()
                .map((g, b) => {
                  var S = a.map(g);
                  return ke(S)
                    ? {
                        coordinate: S + p,
                        value: o ? o[g] : g,
                        index: b,
                        offset: p,
                      }
                    : null;
                })
                .filter(ln)
        );
      }
    }
  },
  Fr = $([et, gt, cg, xT, gT, kU, RU, At], LU),
  fg = $([aT, iT, IL], (e, t, n) => lT(n.shared, e, t)),
  ST = (e) => e.tooltip.settings.trigger,
  dg = (e) => e.tooltip.settings.defaultIndex,
  Do = $([Rl, fg, ST, dg], fT),
  co = $([Do, Ul, To, Co], og),
  wT = $([Fr, co], uT),
  UU = $([Do], (e) => {
    if (e) return e.dataKey;
  }),
  qU = $([Do], (e) => {
    if (e) return e.graphicalItemId;
  }),
  OT = $([Rl, fg, ST, dg], vT),
  BU = $([Xr, Vr, et, Bt, Fr, dg, OT], dT),
  HU = $([Do, BU], (e, t) => (e != null && e.coordinate ? e.coordinate : t)),
  IU = $([Do], (e) => {
    var t;
    return (t = e?.active) !== null && t !== void 0 ? t : !1;
  }),
  $U = $([OT, co, za, To, wT, hT, fg], mT),
  YU = $([$U], (e) => {
    if (e != null) {
      var t = e.map((n) => n.payload).filter((n) => n != null);
      return Array.from(new Set(t));
    }
  });
function d_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function v_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? d_(Object(n), !0).forEach(function (a) {
          KU(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : d_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function KU(e, t, n) {
  return (
    (t = GU(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function GU(e) {
  var t = XU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function XU(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var VU = () => ye(gt),
  ZU = () => {
    var e = VU(),
      t = ye(Fr),
      n = ye(xT);
    return Ns(!e || !n ? void 0 : v_(v_({}, e), {}, { scale: n }), t);
  };
function h_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? h_(Object(n), !0).forEach(function (a) {
          QU(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : h_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function QU(e, t, n) {
  return (
    (t = WU(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function WU(e) {
  var t = FU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function FU(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var JU = (e, t, n, a) => {
    var u = t.find((o) => o && o.index === n);
    if (u) {
      if (e === "horizontal") return { x: u.coordinate, y: a.relativeY };
      if (e === "vertical") return { x: a.relativeX, y: u.coordinate };
    }
    return { x: 0, y: 0 };
  },
  eq = (e, t, n, a) => {
    var u = t.find((h) => h && h.index === n);
    if (u) {
      if (e === "centric") {
        var o = u.coordinate,
          { radius: s } = a;
        return dl(
          dl(dl({}, a), Ut(a.cx, a.cy, s, o)),
          {},
          { angle: o, radius: s },
        );
      }
      var f = u.coordinate,
        { angle: d } = a;
      return dl(
        dl(dl({}, a), Ut(a.cx, a.cy, f, d)),
        {},
        { angle: d, radius: f },
      );
    }
    return {
      angle: 0,
      clockWise: !1,
      cx: 0,
      cy: 0,
      endAngle: 0,
      innerRadius: 0,
      outerRadius: 0,
      radius: 0,
      startAngle: 0,
      x: 0,
      y: 0,
    };
  };
function tq(e, t) {
  var { relativeX: n, relativeY: a } = e;
  return (
    n >= t.left && n <= t.left + t.width && a >= t.top && a <= t.top + t.height
  );
}
var _T = (e, t, n, a, u) => {
    var o,
      s = (o = t?.length) !== null && o !== void 0 ? o : 0;
    if (s <= 1 || e == null) return 0;
    if (
      a === "angleAxis" &&
      u != null &&
      Math.abs(Math.abs(u[1] - u[0]) - 360) <= 1e-6
    )
      for (var f = 0; f < s; f++) {
        var d,
          h,
          m,
          p,
          g,
          b =
            f > 0
              ? (d = n[f - 1]) === null || d === void 0
                ? void 0
                : d.coordinate
              : (h = n[s - 1]) === null || h === void 0
                ? void 0
                : h.coordinate,
          S = (m = n[f]) === null || m === void 0 ? void 0 : m.coordinate,
          _ =
            f >= s - 1
              ? (p = n[0]) === null || p === void 0
                ? void 0
                : p.coordinate
              : (g = n[f + 1]) === null || g === void 0
                ? void 0
                : g.coordinate,
          O = void 0;
        if (!(b == null || S == null || _ == null))
          if (qn(S - b) !== qn(_ - S)) {
            var E = [];
            if (qn(_ - S) === qn(u[1] - u[0])) {
              O = _;
              var C = S + u[1] - u[0];
              ((E[0] = Math.min(C, (C + b) / 2)),
                (E[1] = Math.max(C, (C + b) / 2)));
            } else {
              O = b;
              var T = _ + u[1] - u[0];
              ((E[0] = Math.min(S, (T + S) / 2)),
                (E[1] = Math.max(S, (T + S) / 2)));
            }
            var D = [Math.min(S, (O + S) / 2), Math.max(S, (O + S) / 2)];
            if ((e > D[0] && e <= D[1]) || (e >= E[0] && e <= E[1])) {
              var M;
              return (M = n[f]) === null || M === void 0 ? void 0 : M.index;
            }
          } else {
            var z = Math.min(b, _),
              U = Math.max(b, _);
            if (e > (z + S) / 2 && e <= (U + S) / 2) {
              var V;
              return (V = n[f]) === null || V === void 0 ? void 0 : V.index;
            }
          }
      }
    else if (t)
      for (var F = 0; F < s; F++) {
        var ae = t[F];
        if (ae != null) {
          var ne = t[F + 1],
            K = t[F - 1];
          if (
            (F === 0 &&
              ne != null &&
              e <= (ae.coordinate + ne.coordinate) / 2) ||
            (F === s - 1 &&
              K != null &&
              e > (ae.coordinate + K.coordinate) / 2) ||
            (F > 0 &&
              F < s - 1 &&
              K != null &&
              ne != null &&
              e > (ae.coordinate + K.coordinate) / 2 &&
              e <= (ae.coordinate + ne.coordinate) / 2)
          )
            return ae.index;
        }
      }
    return -1;
  },
  nq = () => ye(xp),
  vg = (e, t) => t,
  AT = (e, t, n) => n,
  hg = (e, t, n, a) => a,
  rq = $(Fr, (e) => xf(e, (t) => t.coordinate)),
  mg = $([Rl, vg, AT, hg], fT),
  yg = $([mg, Ul, To, Co], og),
  aq = (e, t, n) => {
    if (t != null) {
      var a = Rl(e);
      return t === "axis"
        ? n === "hover"
          ? a.axisInteraction.hover.dataKey
          : a.axisInteraction.click.dataKey
        : n === "hover"
          ? a.itemInteraction.hover.dataKey
          : a.itemInteraction.click.dataKey;
    }
  },
  ET = $([Rl, vg, AT, hg], vT),
  rf = $([Xr, Vr, et, Bt, Fr, hg, ET], dT),
  iq = $([mg, rf], (e, t) => {
    var n;
    return (n = e.coordinate) !== null && n !== void 0 ? n : t;
  }),
  jT = $([Fr, yg], uT),
  lq = $([ET, yg, za, To, jT, hT, vg], mT),
  uq = $([mg, yg], (e, t) => ({
    isActive: e.active && t != null,
    activeIndex: t,
  })),
  oq = (e, t, n, a, u, o, s) => {
    if (!(!e || !n || !a || !u) && tq(e, s)) {
      var f = e3(e, t),
        d = _T(f, o, u, n, a),
        h = JU(t, u, d, e);
      return { activeIndex: String(d), activeCoordinate: h };
    }
  },
  cq = (e, t, n, a, u, o, s) => {
    if (!(!e || !a || !u || !o || !n)) {
      var f = P4(e, n);
      if (f) {
        var d = t3(f, t),
          h = _T(d, s, o, a, u),
          m = eq(t, o, h, f);
        return { activeIndex: String(h), activeCoordinate: m };
      }
    }
  },
  sq = (e, t, n, a, u, o, s, f) => {
    if (!(!e || !t || !a || !u || !o))
      return t === "horizontal" || t === "vertical"
        ? oq(e, t, a, u, o, s, f)
        : cq(e, t, n, a, u, o, s);
  },
  fq = $(
    (e) => e.zIndex.zIndexMap,
    (e, t) => t,
    (e, t, n) => n,
    (e, t, n) => {
      if (t != null) {
        var a = e[t];
        if (a != null) return n ? a.panoramaElement : a.element;
      }
    },
  ),
  dq = $(
    (e) => e.zIndex.zIndexMap,
    (e) => {
      var t = Object.keys(e)
          .map((a) => parseInt(a, 10))
          .concat(Object.values(Gt)),
        n = Array.from(new Set(t));
      return n.sort((a, u) => a - u);
    },
    { memoizeOptions: { resultEqualityCheck: n6 } },
  );
function m_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function y_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? m_(Object(n), !0).forEach(function (a) {
          vq(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : m_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function vq(e, t, n) {
  return (
    (t = hq(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function hq(e) {
  var t = mq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function mq(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var yq = {},
  pq = {
    zIndexMap: Object.values(Gt).reduce(
      (e, t) =>
        y_(
          y_({}, e),
          {},
          { [t]: { element: void 0, panoramaElement: void 0, consumers: 0 } },
        ),
      yq,
    ),
  },
  gq = new Set(Object.values(Gt));
function bq(e) {
  return gq.has(e);
}
var TT = Yt({
    name: "zIndex",
    initialState: pq,
    reducers: {
      registerZIndexPortal: {
        reducer: (e, t) => {
          var { zIndex: n } = t.payload;
          e.zIndexMap[n]
            ? (e.zIndexMap[n].consumers += 1)
            : (e.zIndexMap[n] = {
                consumers: 1,
                element: void 0,
                panoramaElement: void 0,
              });
        },
        prepare: Qe(),
      },
      unregisterZIndexPortal: {
        reducer: (e, t) => {
          var { zIndex: n } = t.payload;
          e.zIndexMap[n] &&
            ((e.zIndexMap[n].consumers -= 1),
            e.zIndexMap[n].consumers <= 0 && !bq(n) && delete e.zIndexMap[n]);
        },
        prepare: Qe(),
      },
      registerZIndexPortalElement: {
        reducer: (e, t) => {
          var { zIndex: n, element: a, isPanorama: u } = t.payload;
          e.zIndexMap[n]
            ? u
              ? (e.zIndexMap[n].panoramaElement = a)
              : (e.zIndexMap[n].element = a)
            : (e.zIndexMap[n] = {
                consumers: 0,
                element: u ? void 0 : a,
                panoramaElement: u ? a : void 0,
              });
        },
        prepare: Qe(),
      },
      unregisterZIndexPortalElement: {
        reducer: (e, t) => {
          var { zIndex: n } = t.payload;
          e.zIndexMap[n] &&
            (t.payload.isPanorama
              ? (e.zIndexMap[n].panoramaElement = void 0)
              : (e.zIndexMap[n].element = void 0));
        },
        prepare: Qe(),
      },
    },
  }),
  {
    registerZIndexPortal: xq,
    unregisterZIndexPortal: Sq,
    registerZIndexPortalElement: wq,
    unregisterZIndexPortalElement: Oq,
  } = TT.actions,
  _q = TT.reducer;
function Jr(e) {
  var { zIndex: t, children: n } = e,
    a = z3(),
    u = a && t !== void 0 && t !== 0,
    o = sn(),
    s = dt();
  w.useLayoutEffect(
    () =>
      u
        ? (s(xq({ zIndex: t })),
          () => {
            s(Sq({ zIndex: t }));
          })
        : wi,
    [s, t, u],
  );
  var f = ye((d) => fq(d, t, o));
  return u ? (f ? DA.createPortal(n, f) : null) : n;
}
function Uy() {
  return (
    (Uy = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Uy.apply(null, arguments)
  );
}
function p_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function os(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? p_(Object(n), !0).forEach(function (a) {
          Aq(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : p_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function Aq(e, t, n) {
  return (
    (t = Eq(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Eq(e) {
  var t = jq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jq(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Tq(e) {
  var { cursor: t, cursorComp: n, cursorProps: a } = e;
  return w.isValidElement(t) ? w.cloneElement(t, a) : w.createElement(n, a);
}
function Mq(e) {
  var t,
    {
      coordinate: n,
      payload: a,
      index: u,
      offset: o,
      tooltipAxisBandSize: s,
      layout: f,
      cursor: d,
      tooltipEventType: h,
      chartName: m,
    } = e,
    p = n,
    g = a,
    b = u;
  if (!d || !p || (m !== "ScatterChart" && h !== "axis")) return null;
  var S, _, O;
  if (m === "ScatterChart") ((S = p), (_ = XR), (O = Gt.cursorLine));
  else if (m === "BarChart")
    ((S = VR(f, p, o, s)), (_ = y2), (O = Gt.cursorRectangle));
  else if (f === "radial" && JA(p)) {
    var { cx: E, cy: C, radius: T, startAngle: D, endAngle: M } = p2(p);
    ((S = {
      cx: E,
      cy: C,
      startAngle: D,
      endAngle: M,
      innerRadius: T,
      outerRadius: T,
    }),
      (_ = b2),
      (O = Gt.cursorLine));
  } else ((S = { points: L4(f, p, o) }), (_ = f2), (O = Gt.cursorLine));
  var z = typeof d == "object" && "className" in d ? d.className : void 0,
    U = os(
      os(os(os({ stroke: "#ccc", pointerEvents: "none" }, o), S), mf(d)),
      {},
      {
        payload: g,
        payloadIndex: b,
        className: Ge("recharts-tooltip-cursor", z),
      },
    );
  return w.createElement(
    Jr,
    { zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : O },
    w.createElement(Tq, { cursor: d, cursorComp: _, cursorProps: U }),
  );
}
function Cq(e) {
  var t = ZU(),
    n = WE(),
    a = Ml(),
    u = nq();
  return t == null || n == null || a == null || u == null
    ? null
    : w.createElement(
        Mq,
        Uy({}, e, {
          offset: n,
          layout: a,
          tooltipAxisBandSize: t,
          chartName: u,
        }),
      );
}
var MT = w.createContext(null),
  Dq = () => w.useContext(MT),
  $m = { exports: {} },
  g_;
function Nq() {
  return (
    g_ ||
      ((g_ = 1),
      (function (e) {
        var t = Object.prototype.hasOwnProperty,
          n = "~";
        function a() {}
        Object.create &&
          ((a.prototype = Object.create(null)), new a().__proto__ || (n = !1));
        function u(d, h, m) {
          ((this.fn = d), (this.context = h), (this.once = m || !1));
        }
        function o(d, h, m, p, g) {
          if (typeof m != "function")
            throw new TypeError("The listener must be a function");
          var b = new u(m, p || d, g),
            S = n ? n + h : h;
          return (
            d._events[S]
              ? d._events[S].fn
                ? (d._events[S] = [d._events[S], b])
                : d._events[S].push(b)
              : ((d._events[S] = b), d._eventsCount++),
            d
          );
        }
        function s(d, h) {
          --d._eventsCount === 0 ? (d._events = new a()) : delete d._events[h];
        }
        function f() {
          ((this._events = new a()), (this._eventsCount = 0));
        }
        ((f.prototype.eventNames = function () {
          var h = [],
            m,
            p;
          if (this._eventsCount === 0) return h;
          for (p in (m = this._events))
            t.call(m, p) && h.push(n ? p.slice(1) : p);
          return Object.getOwnPropertySymbols
            ? h.concat(Object.getOwnPropertySymbols(m))
            : h;
        }),
          (f.prototype.listeners = function (h) {
            var m = n ? n + h : h,
              p = this._events[m];
            if (!p) return [];
            if (p.fn) return [p.fn];
            for (var g = 0, b = p.length, S = new Array(b); g < b; g++)
              S[g] = p[g].fn;
            return S;
          }),
          (f.prototype.listenerCount = function (h) {
            var m = n ? n + h : h,
              p = this._events[m];
            return p ? (p.fn ? 1 : p.length) : 0;
          }),
          (f.prototype.emit = function (h, m, p, g, b, S) {
            var _ = n ? n + h : h;
            if (!this._events[_]) return !1;
            var O = this._events[_],
              E = arguments.length,
              C,
              T;
            if (O.fn) {
              switch ((O.once && this.removeListener(h, O.fn, void 0, !0), E)) {
                case 1:
                  return (O.fn.call(O.context), !0);
                case 2:
                  return (O.fn.call(O.context, m), !0);
                case 3:
                  return (O.fn.call(O.context, m, p), !0);
                case 4:
                  return (O.fn.call(O.context, m, p, g), !0);
                case 5:
                  return (O.fn.call(O.context, m, p, g, b), !0);
                case 6:
                  return (O.fn.call(O.context, m, p, g, b, S), !0);
              }
              for (T = 1, C = new Array(E - 1); T < E; T++)
                C[T - 1] = arguments[T];
              O.fn.apply(O.context, C);
            } else {
              var D = O.length,
                M;
              for (T = 0; T < D; T++)
                switch (
                  (O[T].once && this.removeListener(h, O[T].fn, void 0, !0), E)
                ) {
                  case 1:
                    O[T].fn.call(O[T].context);
                    break;
                  case 2:
                    O[T].fn.call(O[T].context, m);
                    break;
                  case 3:
                    O[T].fn.call(O[T].context, m, p);
                    break;
                  case 4:
                    O[T].fn.call(O[T].context, m, p, g);
                    break;
                  default:
                    if (!C)
                      for (M = 1, C = new Array(E - 1); M < E; M++)
                        C[M - 1] = arguments[M];
                    O[T].fn.apply(O[T].context, C);
                }
            }
            return !0;
          }),
          (f.prototype.on = function (h, m, p) {
            return o(this, h, m, p, !1);
          }),
          (f.prototype.once = function (h, m, p) {
            return o(this, h, m, p, !0);
          }),
          (f.prototype.removeListener = function (h, m, p, g) {
            var b = n ? n + h : h;
            if (!this._events[b]) return this;
            if (!m) return (s(this, b), this);
            var S = this._events[b];
            if (S.fn)
              S.fn === m &&
                (!g || S.once) &&
                (!p || S.context === p) &&
                s(this, b);
            else {
              for (var _ = 0, O = [], E = S.length; _ < E; _++)
                (S[_].fn !== m ||
                  (g && !S[_].once) ||
                  (p && S[_].context !== p)) &&
                  O.push(S[_]);
              O.length
                ? (this._events[b] = O.length === 1 ? O[0] : O)
                : s(this, b);
            }
            return this;
          }),
          (f.prototype.removeAllListeners = function (h) {
            var m;
            return (
              h
                ? ((m = n ? n + h : h), this._events[m] && s(this, m))
                : ((this._events = new a()), (this._eventsCount = 0)),
              this
            );
          }),
          (f.prototype.off = f.prototype.removeListener),
          (f.prototype.addListener = f.prototype.on),
          (f.prefixed = n),
          (f.EventEmitter = f),
          (e.exports = f));
      })($m)),
    $m.exports
  );
}
var Pq = Nq();
const zq = Pa(Pq);
var so = new zq(),
  qy = "recharts.syncEvent.tooltip",
  b_ = "recharts.syncEvent.brush",
  kq = (e, t) => {
    if (t && Array.isArray(e)) {
      var n = Number.parseInt(t, 10);
      if (!Br(n)) return e[n];
    }
  },
  Rq = {
    chartName: "",
    tooltipPayloadSearcher: () => {},
    eventEmitter: void 0,
    defaultTooltipEventType: "axis",
  },
  CT = Yt({
    name: "options",
    initialState: Rq,
    reducers: {
      createEventEmitter: (e) => {
        e.eventEmitter == null &&
          (e.eventEmitter = Symbol("rechartsEventEmitter"));
      },
    },
  }),
  Lq = CT.reducer,
  { createEventEmitter: Uq } = CT.actions;
function qq(e) {
  return e.tooltip.syncInteraction;
}
var Bq = {
    chartData: void 0,
    computedData: void 0,
    dataStartIndex: 0,
    dataEndIndex: 0,
  },
  DT = Yt({
    name: "chartData",
    initialState: Bq,
    reducers: {
      setChartData(e, t) {
        if (((e.chartData = t.payload), t.payload == null)) {
          ((e.dataStartIndex = 0), (e.dataEndIndex = 0));
          return;
        }
        t.payload.length > 0 &&
          e.dataEndIndex !== t.payload.length - 1 &&
          (e.dataEndIndex = t.payload.length - 1);
      },
      setComputedData(e, t) {
        e.computedData = t.payload;
      },
      setDataStartEndIndexes(e, t) {
        var { startIndex: n, endIndex: a } = t.payload;
        (n != null && (e.dataStartIndex = n),
          a != null && (e.dataEndIndex = a));
      },
    },
  }),
  {
    setChartData: x_,
    setDataStartEndIndexes: Hq,
    setComputedData: X$,
  } = DT.actions,
  Iq = DT.reducer,
  $q = ["x", "y"];
function S_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function vl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? S_(Object(n), !0).forEach(function (a) {
          Yq(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : S_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function Yq(e, t, n) {
  return (
    (t = Kq(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Kq(e) {
  var t = Gq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Gq(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Xq(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = Vq(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function Vq(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function Zq() {
  var e = ye(Sp),
    t = ye(wp),
    n = dt(),
    a = ye(P2),
    u = ye(Fr),
    o = Ml(),
    s = zf(),
    f = ye((d) => d.rootProps.className);
  w.useEffect(() => {
    if (e == null) return wi;
    var d = (h, m, p) => {
      if (t !== p && e === h) {
        if (a === "index") {
          var g;
          if (
            s &&
            m !== null &&
            m !== void 0 &&
            (g = m.payload) !== null &&
            g !== void 0 &&
            g.coordinate &&
            m.payload.sourceViewBox
          ) {
            var b = m.payload.coordinate,
              { x: S, y: _ } = b,
              O = Xq(b, $q),
              { x: E, y: C, width: T, height: D } = m.payload.sourceViewBox,
              M = vl(
                vl({}, O),
                {},
                {
                  x: s.x + (T ? (S - E) / T : 0) * s.width,
                  y: s.y + (D ? (_ - C) / D : 0) * s.height,
                },
              );
            n(
              vl(
                vl({}, m),
                {},
                { payload: vl(vl({}, m.payload), {}, { coordinate: M }) },
              ),
            );
          } else n(m);
          return;
        }
        if (u != null) {
          var z;
          if (typeof a == "function") {
            var U = {
                activeTooltipIndex:
                  m.payload.index == null ? void 0 : Number(m.payload.index),
                isTooltipActive: m.payload.active,
                activeIndex:
                  m.payload.index == null ? void 0 : Number(m.payload.index),
                activeLabel: m.payload.label,
                activeDataKey: m.payload.dataKey,
                activeCoordinate: m.payload.coordinate,
              },
              V = a(u, U);
            z = u[V];
          } else
            a === "value" &&
              (z = u.find((L) => String(L.value) === m.payload.label));
          var { coordinate: F } = m.payload;
          if (z == null || m.payload.active === !1 || F == null || s == null) {
            n(
              Ly({
                active: !1,
                coordinate: void 0,
                dataKey: void 0,
                index: null,
                label: void 0,
                sourceViewBox: void 0,
                graphicalItemId: void 0,
              }),
            );
            return;
          }
          var { x: ae, y: ne } = F,
            K = Math.min(ae, s.x + s.width),
            q = Math.min(ne, s.y + s.height),
            re = {
              x: o === "horizontal" ? z.coordinate : K,
              y: o === "horizontal" ? q : z.coordinate,
            },
            ce = Ly({
              active: m.payload.active,
              coordinate: re,
              dataKey: m.payload.dataKey,
              index: String(z.index),
              label: m.payload.label,
              sourceViewBox: m.payload.sourceViewBox,
              graphicalItemId: m.payload.graphicalItemId,
            });
          n(ce);
        }
      }
    };
    return (
      so.on(qy, d),
      () => {
        so.off(qy, d);
      }
    );
  }, [f, n, t, e, a, u, o, s]);
}
function Qq() {
  var e = ye(Sp),
    t = ye(wp),
    n = dt();
  w.useEffect(() => {
    if (e == null) return wi;
    var a = (u, o, s) => {
      t !== s && e === u && n(Hq(o));
    };
    return (
      so.on(b_, a),
      () => {
        so.off(b_, a);
      }
    );
  }, [n, t, e]);
}
function Wq() {
  var e = dt();
  (w.useEffect(() => {
    e(Uq());
  }, [e]),
    Zq(),
    Qq());
}
function Fq(e, t, n, a, u, o) {
  var s = ye((S) => aq(S, e, t)),
    f = ye(qU),
    d = ye(wp),
    h = ye(Sp),
    m = ye(P2),
    p = ye(qq),
    g = p?.active,
    b = zf();
  w.useEffect(() => {
    if (!g && h != null && d != null) {
      var S = Ly({
        active: o,
        coordinate: n,
        dataKey: s,
        index: u,
        label: typeof a == "number" ? String(a) : a,
        sourceViewBox: b,
        graphicalItemId: f,
      });
      so.emit(qy, h, S, d);
    }
  }, [g, n, s, f, u, a, d, h, m, o, b]);
}
function w_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function O_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? w_(Object(n), !0).forEach(function (a) {
          Jq(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : w_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function Jq(e, t, n) {
  return (
    (t = eB(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function eB(e) {
  var t = tB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function tB(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nB(e) {
  return e.dataKey;
}
function rB(e, t) {
  return w.isValidElement(e)
    ? w.cloneElement(e, t)
    : typeof e == "function"
      ? w.createElement(e, t)
      : w.createElement(wR, t);
}
var __ = [],
  aB = {
    allowEscapeViewBox: { x: !1, y: !1 },
    animationDuration: 400,
    animationEasing: "ease",
    axisId: 0,
    contentStyle: {},
    cursor: !0,
    filterNull: !0,
    includeHidden: !1,
    isAnimationActive: "auto",
    itemSorter: "name",
    itemStyle: {},
    labelStyle: {},
    offset: 10,
    reverseDirection: { x: !1, y: !1 },
    separator: " : ",
    trigger: "hover",
    useTranslate3d: !1,
    wrapperStyle: {},
  };
function iB(e) {
  var t,
    n,
    a = cn(e, aB),
    {
      active: u,
      allowEscapeViewBox: o,
      animationDuration: s,
      animationEasing: f,
      content: d,
      filterNull: h,
      isAnimationActive: m,
      offset: p,
      payloadUniqBy: g,
      position: b,
      reverseDirection: S,
      useTranslate3d: _,
      wrapperStyle: O,
      cursor: E,
      shared: C,
      trigger: T,
      defaultIndex: D,
      portal: M,
      axisId: z,
    } = a,
    U = dt(),
    V = typeof D == "number" ? String(D) : D;
  w.useEffect(() => {
    U(XL({ shared: C, trigger: T, axisId: z, active: u, defaultIndex: V }));
  }, [U, C, T, z, u, V]);
  var F = zf(),
    ae = s2(),
    ne = HL(C),
    { activeIndex: K, isActive: q } =
      (t = ye((Ue) => uq(Ue, ne, T, V))) !== null && t !== void 0 ? t : {},
    re = ye((Ue) => lq(Ue, ne, T, V)),
    ce = ye((Ue) => jT(Ue, ne, T, V)),
    L = ye((Ue) => iq(Ue, ne, T, V)),
    W = re,
    ue = Dq(),
    oe = (n = u ?? q) !== null && n !== void 0 ? n : !1,
    [he, P] = Iz([W, oe]),
    G = ne === "axis" ? ce : void 0;
  Fq(ne, T, L, G, K, oe);
  var te = M ?? ue;
  if (te == null || F == null || ne == null) return null;
  var ie = W ?? __;
  (oe || (ie = __),
    h &&
      ie.length &&
      (ie = hz(
        ie.filter(
          (Ue) => Ue.value != null && (Ue.hide !== !0 || a.includeHidden),
        ),
        g,
        nB,
      )));
  var pe = ie.length > 0,
    xe = O_(
      O_({}, a),
      {},
      {
        payload: ie,
        label: G,
        active: oe,
        activeIndex: K,
        coordinate: L,
        accessibilityLayer: ae,
      },
    ),
    Ee = w.createElement(
      PR,
      {
        allowEscapeViewBox: o,
        animationDuration: s,
        animationEasing: f,
        isAnimationActive: m,
        active: oe,
        coordinate: L,
        hasPayload: pe,
        offset: p,
        position: b,
        reverseDirection: S,
        useTranslate3d: _,
        viewBox: F,
        wrapperStyle: O,
        lastBoundingBox: he,
        innerRef: P,
        hasPortalFromProps: !!M,
      },
      rB(d, xe),
    );
  return w.createElement(
    w.Fragment,
    null,
    DA.createPortal(Ee, te),
    oe &&
      w.createElement(Cq, {
        cursor: E,
        tooltipEventType: ne,
        coordinate: L,
        payload: ie,
        index: K,
      }),
  );
}
function lB(e, t, n) {
  return (
    (t = uB(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function uB(e) {
  var t = oB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function oB(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class cB {
  constructor(t) {
    (lB(this, "cache", new Map()), (this.maxSize = t));
  }
  get(t) {
    var n = this.cache.get(t);
    return (n !== void 0 && (this.cache.delete(t), this.cache.set(t, n)), n);
  }
  set(t, n) {
    if (this.cache.has(t)) this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var a = this.cache.keys().next().value;
      a != null && this.cache.delete(a);
    }
    this.cache.set(t, n);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function A_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function sB(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? A_(Object(n), !0).forEach(function (a) {
          fB(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : A_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function fB(e, t, n) {
  return (
    (t = dB(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function dB(e) {
  var t = vB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vB(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hB = { cacheSize: 2e3, enableCache: !0 },
  NT = sB({}, hB),
  E_ = new cB(NT.cacheSize),
  mB = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre",
  },
  j_ = "recharts_measurement_span";
function yB(e, t) {
  var n = t.fontSize || "",
    a = t.fontFamily || "",
    u = t.fontWeight || "",
    o = t.fontStyle || "",
    s = t.letterSpacing || "",
    f = t.textTransform || "";
  return ""
    .concat(e, "|")
    .concat(n, "|")
    .concat(a, "|")
    .concat(u, "|")
    .concat(o, "|")
    .concat(s, "|")
    .concat(f);
}
var T_ = (e, t) => {
    try {
      var n = document.getElementById(j_);
      (n ||
        ((n = document.createElement("span")),
        n.setAttribute("id", j_),
        n.setAttribute("aria-hidden", "true"),
        document.body.appendChild(n)),
        Object.assign(n.style, mB, t),
        (n.textContent = "".concat(e)));
      var a = n.getBoundingClientRect();
      return { width: a.width, height: a.height };
    } catch {
      return { width: 0, height: 0 };
    }
  },
  Vu = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || xo.isSsr) return { width: 0, height: 0 };
    if (!NT.enableCache) return T_(t, n);
    var a = yB(t, n),
      u = E_.get(a);
    if (u) return u;
    var o = T_(t, n);
    return (E_.set(a, o), o);
  },
  PT;
function pB(e, t, n) {
  return (
    (t = gB(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function gB(e) {
  var t = bB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bB(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var M_ = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  C_ = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  xB = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/,
  SB = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  wB = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1,
  },
  OB = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function _B(e) {
  return OB.includes(e);
}
var gl = "NaN";
function AB(e, t) {
  return e * wB[t];
}
class Rt {
  static parse(t) {
    var n,
      [, a, u] = (n = SB.exec(t)) !== null && n !== void 0 ? n : [];
    return a == null ? Rt.NaN : new Rt(parseFloat(a), u ?? "");
  }
  constructor(t, n) {
    ((this.num = t),
      (this.unit = n),
      (this.num = t),
      (this.unit = n),
      Br(t) && (this.unit = ""),
      n !== "" && !xB.test(n) && ((this.num = NaN), (this.unit = "")),
      _B(n) && ((this.num = AB(t, n)), (this.unit = "px")));
  }
  add(t) {
    return this.unit !== t.unit
      ? new Rt(NaN, "")
      : new Rt(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit
      ? new Rt(NaN, "")
      : new Rt(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit
      ? new Rt(NaN, "")
      : new Rt(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit
      ? new Rt(NaN, "")
      : new Rt(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Br(this.num);
  }
}
PT = Rt;
pB(Rt, "NaN", new PT(NaN, ""));
function zT(e) {
  if (e == null || e.includes(gl)) return gl;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var n,
      [, a, u, o] = (n = M_.exec(t)) !== null && n !== void 0 ? n : [],
      s = Rt.parse(a ?? ""),
      f = Rt.parse(o ?? ""),
      d = u === "*" ? s.multiply(f) : s.divide(f);
    if (d.isNaN()) return gl;
    t = t.replace(M_, d.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var h,
      [, m, p, g] = (h = C_.exec(t)) !== null && h !== void 0 ? h : [],
      b = Rt.parse(m ?? ""),
      S = Rt.parse(g ?? ""),
      _ = p === "+" ? b.add(S) : b.subtract(S);
    if (_.isNaN()) return gl;
    t = t.replace(C_, _.toString());
  }
  return t;
}
var D_ = /\(([^()]*)\)/;
function EB(e) {
  for (var t = e, n; (n = D_.exec(t)) != null; ) {
    var [, a] = n;
    t = t.replace(D_, zT(a));
  }
  return t;
}
function jB(e) {
  var t = e.replace(/\s+/g, "");
  return ((t = EB(t)), (t = zT(t)), t);
}
function TB(e) {
  try {
    return jB(e);
  } catch {
    return gl;
  }
}
function Ym(e) {
  var t = TB(e.slice(5, -1));
  return t === gl ? "" : t;
}
var MB = [
    "x",
    "y",
    "lineHeight",
    "capHeight",
    "fill",
    "scaleToFit",
    "textAnchor",
    "verticalAnchor",
  ],
  CB = ["dx", "dy", "angle", "className", "breakAll"];
function By() {
  return (
    (By = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    By.apply(null, arguments)
  );
}
function N_(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = DB(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function DB(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var kT = /[ \f\n\r\t\v\u2028\u2029]+/,
  RT = (e) => {
    var { children: t, breakAll: n, style: a } = e;
    try {
      var u = [];
      Ot(t) ||
        (n ? (u = t.toString().split("")) : (u = t.toString().split(kT)));
      var o = u.map((f) => ({ word: f, width: Vu(f, a).width })),
        s = n ? 0 : Vu(" ", a).width;
      return { wordsWithComputedWidth: o, spaceWidth: s };
    } catch {
      return null;
    }
  };
function LT(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function NB(e) {
  return (
    Ot(e) ||
    typeof e == "string" ||
    typeof e == "number" ||
    typeof e == "boolean"
  );
}
var UT = (e, t, n, a) =>
    e.reduce((u, o) => {
      var { word: s, width: f } = o,
        d = u[u.length - 1];
      if (d && f != null && (t == null || a || d.width + f + n < Number(t)))
        (d.words.push(s), (d.width += f + n));
      else {
        var h = { words: [s], width: f };
        u.push(h);
      }
      return u;
    }, []),
  qT = (e) => e.reduce((t, n) => (t.width > n.width ? t : n)),
  PB = "…",
  P_ = (e, t, n, a, u, o, s, f) => {
    var d = e.slice(0, t),
      h = RT({ breakAll: n, style: a, children: d + PB });
    if (!h) return [!1, []];
    var m = UT(h.wordsWithComputedWidth, o, s, f),
      p = m.length > u || qT(m).width > Number(o);
    return [p, m];
  },
  zB = (e, t, n, a, u) => {
    var { maxLines: o, children: s, style: f, breakAll: d } = e,
      h = ve(o),
      m = String(s),
      p = UT(t, a, n, u);
    if (!h || u) return p;
    var g = p.length > o || qT(p).width > Number(a);
    if (!g) return p;
    for (var b = 0, S = m.length - 1, _ = 0, O; b <= S && _ <= m.length - 1; ) {
      var E = Math.floor((b + S) / 2),
        C = E - 1,
        [T, D] = P_(m, C, d, f, o, a, n, u),
        [M] = P_(m, E, d, f, o, a, n, u);
      if ((!T && !M && (b = E + 1), T && M && (S = E - 1), !T && M)) {
        O = D;
        break;
      }
      _++;
    }
    return O || p;
  },
  z_ = (e) => {
    var t = Ot(e) ? [] : e.toString().split(kT);
    return [{ words: t, width: void 0 }];
  },
  kB = (e) => {
    var {
      width: t,
      scaleToFit: n,
      children: a,
      style: u,
      breakAll: o,
      maxLines: s,
    } = e;
    if ((t || n) && !xo.isSsr) {
      var f,
        d,
        h = RT({ breakAll: o, children: a, style: u });
      if (h) {
        var { wordsWithComputedWidth: m, spaceWidth: p } = h;
        ((f = m), (d = p));
      } else return z_(a);
      return zB(
        { breakAll: o, children: a, maxLines: s, style: u },
        f,
        d,
        t,
        !!n,
      );
    }
    return z_(a);
  },
  BT = "#808080",
  RB = {
    angle: 0,
    breakAll: !1,
    capHeight: "0.71em",
    fill: BT,
    lineHeight: "1em",
    scaleToFit: !1,
    textAnchor: "start",
    verticalAnchor: "end",
    x: 0,
    y: 0,
  },
  pg = w.forwardRef((e, t) => {
    var n = cn(e, RB),
      {
        x: a,
        y: u,
        lineHeight: o,
        capHeight: s,
        fill: f,
        scaleToFit: d,
        textAnchor: h,
        verticalAnchor: m,
      } = n,
      p = N_(n, MB),
      g = w.useMemo(
        () =>
          kB({
            breakAll: p.breakAll,
            children: p.children,
            maxLines: p.maxLines,
            scaleToFit: d,
            style: p.style,
            width: p.width,
          }),
        [p.breakAll, p.children, p.maxLines, d, p.style, p.width],
      ),
      { dx: b, dy: S, angle: _, className: O, breakAll: E } = p,
      C = N_(p, CB);
    if (!fr(a) || !fr(u) || g.length === 0) return null;
    var T = Number(a) + (ve(b) ? b : 0),
      D = Number(u) + (ve(S) ? S : 0);
    if (!ke(T) || !ke(D)) return null;
    var M;
    switch (m) {
      case "start":
        M = Ym("calc(".concat(s, ")"));
        break;
      case "middle":
        M = Ym(
          "calc("
            .concat((g.length - 1) / 2, " * -")
            .concat(o, " + (")
            .concat(s, " / 2))"),
        );
        break;
      default:
        M = Ym("calc(".concat(g.length - 1, " * -").concat(o, ")"));
        break;
    }
    var z = [],
      U = g[0];
    if (d && U != null) {
      var V = U.width,
        { width: F } = p;
      z.push("scale(".concat(ve(F) && ve(V) ? F / V : 1, ")"));
    }
    return (
      _ && z.push("rotate(".concat(_, ", ").concat(T, ", ").concat(D, ")")),
      z.length && (C.transform = z.join(" ")),
      w.createElement(
        "text",
        By({}, Vt(C), {
          ref: t,
          x: T,
          y: D,
          className: Ge("recharts-text", O),
          textAnchor: h,
          fill: f.includes("url") ? BT : f,
        }),
        g.map((ae, ne) => {
          var K = ae.words.join(E ? "" : " ");
          return w.createElement(
            "tspan",
            { x: T, dy: ne === 0 ? M : o, key: "".concat(K, "-").concat(ne) },
            K,
          );
        }),
      )
    );
  });
pg.displayName = "Text";
function k_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function ar(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? k_(Object(n), !0).forEach(function (a) {
          LB(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : k_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function LB(e, t, n) {
  return (
    (t = UB(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function UB(e) {
  var t = qB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function qB(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var BB = (e) => {
    var { viewBox: t, position: n, offset: a = 0, parentViewBox: u } = e,
      { x: o, y: s, height: f, upperWidth: d, lowerWidth: h } = fp(t),
      m = o,
      p = o + (d - h) / 2,
      g = (m + p) / 2,
      b = (d + h) / 2,
      S = m + d / 2,
      _ = f >= 0 ? 1 : -1,
      O = _ * a,
      E = _ > 0 ? "end" : "start",
      C = _ > 0 ? "start" : "end",
      T = d >= 0 ? 1 : -1,
      D = T * a,
      M = T > 0 ? "end" : "start",
      z = T > 0 ? "start" : "end",
      U = u;
    if (n === "top") {
      var V = {
        x: m + d / 2,
        y: s - O,
        horizontalAnchor: "middle",
        verticalAnchor: E,
      };
      return (U && ((V.height = Math.max(s - U.y, 0)), (V.width = d)), V);
    }
    if (n === "bottom") {
      var F = {
        x: p + h / 2,
        y: s + f + O,
        horizontalAnchor: "middle",
        verticalAnchor: C,
      };
      return (
        U &&
          ((F.height = Math.max(U.y + U.height - (s + f), 0)), (F.width = h)),
        F
      );
    }
    if (n === "left") {
      var ae = {
        x: g - D,
        y: s + f / 2,
        horizontalAnchor: M,
        verticalAnchor: "middle",
      };
      return (U && ((ae.width = Math.max(ae.x - U.x, 0)), (ae.height = f)), ae);
    }
    if (n === "right") {
      var ne = {
        x: g + b + D,
        y: s + f / 2,
        horizontalAnchor: z,
        verticalAnchor: "middle",
      };
      return (
        U && ((ne.width = Math.max(U.x + U.width - ne.x, 0)), (ne.height = f)),
        ne
      );
    }
    var K = U ? { width: b, height: f } : {};
    return n === "insideLeft"
      ? ar(
          {
            x: g + D,
            y: s + f / 2,
            horizontalAnchor: z,
            verticalAnchor: "middle",
          },
          K,
        )
      : n === "insideRight"
        ? ar(
            {
              x: g + b - D,
              y: s + f / 2,
              horizontalAnchor: M,
              verticalAnchor: "middle",
            },
            K,
          )
        : n === "insideTop"
          ? ar(
              {
                x: m + d / 2,
                y: s + O,
                horizontalAnchor: "middle",
                verticalAnchor: C,
              },
              K,
            )
          : n === "insideBottom"
            ? ar(
                {
                  x: p + h / 2,
                  y: s + f - O,
                  horizontalAnchor: "middle",
                  verticalAnchor: E,
                },
                K,
              )
            : n === "insideTopLeft"
              ? ar(
                  {
                    x: m + D,
                    y: s + O,
                    horizontalAnchor: z,
                    verticalAnchor: C,
                  },
                  K,
                )
              : n === "insideTopRight"
                ? ar(
                    {
                      x: m + d - D,
                      y: s + O,
                      horizontalAnchor: M,
                      verticalAnchor: C,
                    },
                    K,
                  )
                : n === "insideBottomLeft"
                  ? ar(
                      {
                        x: p + D,
                        y: s + f - O,
                        horizontalAnchor: z,
                        verticalAnchor: E,
                      },
                      K,
                    )
                  : n === "insideBottomRight"
                    ? ar(
                        {
                          x: p + h - D,
                          y: s + f - O,
                          horizontalAnchor: M,
                          verticalAnchor: E,
                        },
                        K,
                      )
                    : n &&
                        typeof n == "object" &&
                        (ve(n.x) || yi(n.x)) &&
                        (ve(n.y) || yi(n.y))
                      ? ar(
                          {
                            x: o + Na(n.x, b),
                            y: s + Na(n.y, f),
                            horizontalAnchor: "end",
                            verticalAnchor: "end",
                          },
                          K,
                        )
                      : ar(
                          {
                            x: S,
                            y: s + f / 2,
                            horizontalAnchor: "middle",
                            verticalAnchor: "middle",
                          },
                          K,
                        );
  },
  HB = ["labelRef"],
  IB = ["content"];
function R_(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = $B(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function $B(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function L_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function Xu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? L_(Object(n), !0).forEach(function (a) {
          YB(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : L_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function YB(e, t, n) {
  return (
    (t = KB(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function KB(e) {
  var t = GB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function GB(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function zr() {
  return (
    (zr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    zr.apply(null, arguments)
  );
}
var HT = w.createContext(null),
  XB = (e) => {
    var {
        x: t,
        y: n,
        upperWidth: a,
        lowerWidth: u,
        width: o,
        height: s,
        children: f,
      } = e,
      d = w.useMemo(
        () => ({
          x: t,
          y: n,
          upperWidth: a,
          lowerWidth: u,
          width: o,
          height: s,
        }),
        [t, n, a, u, o, s],
      );
    return w.createElement(HT.Provider, { value: d }, f);
  },
  IT = () => {
    var e = w.useContext(HT),
      t = zf();
    return e || (t ? fp(t) : void 0);
  },
  VB = w.createContext(null),
  ZB = () => {
    var e = w.useContext(VB),
      t = ye(U2);
    return e || t;
  },
  QB = (e) => {
    var { value: t, formatter: n } = e,
      a = Ot(e.children) ? t : e.children;
    return typeof n == "function" ? n(a) : a;
  },
  gg = (e) => e != null && typeof e == "function",
  WB = (e, t) => {
    var n = qn(t - e),
      a = Math.min(Math.abs(t - e), 360);
    return n * a;
  },
  FB = (e, t, n, a, u) => {
    var { offset: o, className: s } = e,
      {
        cx: f,
        cy: d,
        innerRadius: h,
        outerRadius: m,
        startAngle: p,
        endAngle: g,
        clockWise: b,
      } = u,
      S = (h + m) / 2,
      _ = WB(p, g),
      O = _ >= 0 ? 1 : -1,
      E,
      C;
    switch (t) {
      case "insideStart":
        ((E = p + O * o), (C = b));
        break;
      case "insideEnd":
        ((E = g - O * o), (C = !b));
        break;
      case "end":
        ((E = g + O * o), (C = b));
        break;
      default:
        throw new Error("Unsupported position ".concat(t));
    }
    C = _ <= 0 ? C : !C;
    var T = Ut(f, d, S, E),
      D = Ut(f, d, S, E + (C ? 1 : -1) * 359),
      M = "M"
        .concat(T.x, ",")
        .concat(
          T.y,
          `
    A`,
        )
        .concat(S, ",")
        .concat(S, ",0,1,")
        .concat(
          C ? 0 : 1,
          `,
    `,
        )
        .concat(D.x, ",")
        .concat(D.y),
      z = Ot(e.id) ? Qu("recharts-radial-line-") : e.id;
    return w.createElement(
      "text",
      zr({}, a, {
        dominantBaseline: "central",
        className: Ge("recharts-radial-bar-label", s),
      }),
      w.createElement("defs", null, w.createElement("path", { id: z, d: M })),
      w.createElement("textPath", { xlinkHref: "#".concat(z) }, n),
    );
  },
  JB = (e, t, n) => {
    var {
        cx: a,
        cy: u,
        innerRadius: o,
        outerRadius: s,
        startAngle: f,
        endAngle: d,
      } = e,
      h = (f + d) / 2;
    if (n === "outside") {
      var { x: m, y: p } = Ut(a, u, s + t, h);
      return {
        x: m,
        y: p,
        textAnchor: m >= a ? "start" : "end",
        verticalAnchor: "middle",
      };
    }
    if (n === "center")
      return { x: a, y: u, textAnchor: "middle", verticalAnchor: "middle" };
    if (n === "centerTop")
      return { x: a, y: u, textAnchor: "middle", verticalAnchor: "start" };
    if (n === "centerBottom")
      return { x: a, y: u, textAnchor: "middle", verticalAnchor: "end" };
    var g = (o + s) / 2,
      { x: b, y: S } = Ut(a, u, g, h);
    return { x: b, y: S, textAnchor: "middle", verticalAnchor: "middle" };
  },
  hs = (e) => e != null && "cx" in e && ve(e.cx),
  e9 = {
    angle: 0,
    offset: 5,
    zIndex: Gt.label,
    position: "middle",
    textBreakAll: !1,
  };
function t9(e) {
  if (!hs(e)) return e;
  var { cx: t, cy: n, outerRadius: a } = e,
    u = a * 2;
  return {
    x: t - a,
    y: n - a,
    width: u,
    upperWidth: u,
    lowerWidth: u,
    height: u,
  };
}
function ja(e) {
  var t = cn(e, e9),
    {
      viewBox: n,
      parentViewBox: a,
      position: u,
      value: o,
      children: s,
      content: f,
      className: d = "",
      textBreakAll: h,
      labelRef: m,
    } = t,
    p = ZB(),
    g = IT(),
    b = u === "center" ? g : (p ?? g),
    S,
    _,
    O;
  n == null ? (S = b) : hs(n) ? (S = n) : (S = fp(n));
  var E = t9(S);
  if (!S || (Ot(o) && Ot(s) && !w.isValidElement(f) && typeof f != "function"))
    return null;
  var C = Xu(Xu({}, t), {}, { viewBox: S });
  if (w.isValidElement(f)) {
    var { labelRef: T } = C,
      D = R_(C, HB);
    return w.cloneElement(f, D);
  }
  if (typeof f == "function") {
    var { content: M } = C,
      z = R_(C, IB);
    if (((_ = w.createElement(f, z)), w.isValidElement(_))) return _;
  } else _ = QB(t);
  var U = Vt(t);
  if (hs(S)) {
    if (u === "insideStart" || u === "insideEnd" || u === "end")
      return FB(t, u, _, U, S);
    O = JB(S, t.offset, t.position);
  } else {
    if (!E) return null;
    var V = BB({
      viewBox: E,
      position: u,
      offset: t.offset,
      parentViewBox: hs(a) ? void 0 : a,
    });
    O = Xu(
      Xu(
        {
          x: V.x,
          y: V.y,
          textAnchor: V.horizontalAnchor,
          verticalAnchor: V.verticalAnchor,
        },
        V.width !== void 0 ? { width: V.width } : {},
      ),
      V.height !== void 0 ? { height: V.height } : {},
    );
  }
  return w.createElement(
    Jr,
    { zIndex: t.zIndex },
    w.createElement(
      pg,
      zr({ ref: m, className: Ge("recharts-label", d) }, U, O, {
        textAnchor: LT(U.textAnchor) ? U.textAnchor : O.textAnchor,
        breakAll: h,
      }),
      _,
    ),
  );
}
ja.displayName = "Label";
var n9 = (e, t, n) => {
  if (!e) return null;
  var a = { viewBox: t, labelRef: n };
  return e === !0
    ? w.createElement(ja, zr({ key: "label-implicit" }, a))
    : fr(e)
      ? w.createElement(ja, zr({ key: "label-implicit", value: e }, a))
      : w.isValidElement(e)
        ? e.type === ja
          ? w.cloneElement(e, Xu({ key: "label-implicit" }, a))
          : w.createElement(ja, zr({ key: "label-implicit", content: e }, a))
        : gg(e)
          ? w.createElement(ja, zr({ key: "label-implicit", content: e }, a))
          : e && typeof e == "object"
            ? w.createElement(ja, zr({}, e, { key: "label-implicit" }, a))
            : null;
};
function r9(e) {
  var { label: t, labelRef: n } = e,
    a = IT();
  return n9(t, a, n) || null;
}
var a9 = ["valueAccessor"],
  i9 = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function af() {
  return (
    (af = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    af.apply(null, arguments)
  );
}
function U_(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = l9(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function l9(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var u9 = (e) => {
    var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
    if (NB(t)) return t;
  },
  $T = w.createContext(void 0),
  o9 = $T.Provider,
  YT = w.createContext(void 0);
YT.Provider;
function c9() {
  return w.useContext($T);
}
function s9() {
  return w.useContext(YT);
}
function ms(e) {
  var { valueAccessor: t = u9 } = e,
    n = U_(e, a9),
    { dataKey: a, clockWise: u, id: o, textBreakAll: s, zIndex: f } = n,
    d = U_(n, i9),
    h = c9(),
    m = s9(),
    p = h || m;
  return !p || !p.length
    ? null
    : w.createElement(
        Jr,
        { zIndex: f ?? Gt.label },
        w.createElement(
          qr,
          { className: "recharts-label-list" },
          p.map((g, b) => {
            var S,
              _ = Ot(a) ? t(g, b) : qt(g.payload, a),
              O = Ot(o) ? {} : { id: "".concat(o, "-").concat(b) };
            return w.createElement(
              ja,
              af({ key: "label-".concat(b) }, Vt(g), d, O, {
                fill: (S = n.fill) !== null && S !== void 0 ? S : g.fill,
                parentViewBox: g.parentViewBox,
                value: _,
                textBreakAll: s,
                viewBox: g.viewBox,
                index: b,
                zIndex: 0,
              }),
            );
          }),
        ),
      );
}
ms.displayName = "LabelList";
function f9(e) {
  var { label: t } = e;
  return t
    ? t === !0
      ? w.createElement(ms, { key: "labelList-implicit" })
      : w.isValidElement(t) || gg(t)
        ? w.createElement(ms, { key: "labelList-implicit", content: t })
        : typeof t == "object"
          ? w.createElement(
              ms,
              af({ key: "labelList-implicit" }, t, { type: String(t.type) }),
            )
          : null
    : null;
}
function Hy() {
  return (
    (Hy = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Hy.apply(null, arguments)
  );
}
var KT = (e) => {
    var { cx: t, cy: n, r: a, className: u } = e,
      o = Ge("recharts-dot", u);
    return ve(t) && ve(n) && ve(a)
      ? w.createElement(
          "circle",
          Hy({}, sr(e), tp(e), { className: o, cx: t, cy: n, r: a }),
        )
      : null;
  },
  d9 = { radiusAxis: {}, angleAxis: {} },
  GT = Yt({
    name: "polarAxis",
    initialState: d9,
    reducers: {
      addRadiusAxis(e, t) {
        e.radiusAxis[t.payload.id] = t.payload;
      },
      removeRadiusAxis(e, t) {
        delete e.radiusAxis[t.payload.id];
      },
      addAngleAxis(e, t) {
        e.angleAxis[t.payload.id] = t.payload;
      },
      removeAngleAxis(e, t) {
        delete e.angleAxis[t.payload.id];
      },
    },
  }),
  {
    addRadiusAxis: V$,
    removeRadiusAxis: Z$,
    addAngleAxis: Q$,
    removeAngleAxis: W$,
  } = GT.actions,
  v9 = GT.reducer;
function h9(e) {
  return e &&
    typeof e == "object" &&
    "className" in e &&
    typeof e.className == "string"
    ? e.className
    : "";
}
var XT = (e) =>
    e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0,
  Km = {},
  q_;
function m9() {
  return (
    q_ ||
      ((q_ = 1),
      (function (e) {
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
        function t(n) {
          if (typeof n != "object" || n == null) return !1;
          if (Object.getPrototypeOf(n) === null) return !0;
          if (Object.prototype.toString.call(n) !== "[object Object]") {
            const u = n[Symbol.toStringTag];
            return u == null ||
              !Object.getOwnPropertyDescriptor(n, Symbol.toStringTag)?.writable
              ? !1
              : n.toString() === `[object ${u}]`;
          }
          let a = n;
          for (; Object.getPrototypeOf(a) !== null; )
            a = Object.getPrototypeOf(a);
          return Object.getPrototypeOf(n) === a;
        }
        e.isPlainObject = t;
      })(Km)),
    Km
  );
}
var Gm, B_;
function y9() {
  return (B_ || ((B_ = 1), (Gm = m9().isPlainObject)), Gm);
}
var p9 = y9();
const g9 = Pa(p9);
var H_, I_, $_, Y_, K_;
function G_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function X_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? G_(Object(n), !0).forEach(function (a) {
          b9(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : G_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function b9(e, t, n) {
  return (
    (t = x9(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function x9(e) {
  var t = S9(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function S9(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function lf() {
  return (
    (lf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    lf.apply(null, arguments)
  );
}
function Iu(e, t) {
  return (
    t || (t = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
    )
  );
}
var V_ = (e, t, n, a, u) => {
    var o = n - a,
      s;
    return (
      (s = at(H_ || (H_ = Iu(["M ", ",", ""])), e, t)),
      (s += at(I_ || (I_ = Iu(["L ", ",", ""])), e + n, t)),
      (s += at($_ || ($_ = Iu(["L ", ",", ""])), e + n - o / 2, t + u)),
      (s += at(Y_ || (Y_ = Iu(["L ", ",", ""])), e + n - o / 2 - a, t + u)),
      (s += at(K_ || (K_ = Iu(["L ", ",", " Z"])), e, t)),
      s
    );
  },
  w9 = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease",
  },
  O9 = (e) => {
    var t = cn(e, w9),
      { x: n, y: a, upperWidth: u, lowerWidth: o, height: s, className: f } = t,
      {
        animationEasing: d,
        animationDuration: h,
        animationBegin: m,
        isUpdateAnimationActive: p,
      } = t,
      g = w.useRef(null),
      [b, S] = w.useState(-1),
      _ = w.useRef(u),
      O = w.useRef(o),
      E = w.useRef(s),
      C = w.useRef(n),
      T = w.useRef(a),
      D = mp(e, "trapezoid-");
    if (
      (w.useEffect(() => {
        if (g.current && g.current.getTotalLength)
          try {
            var re = g.current.getTotalLength();
            re && S(re);
          } catch {}
      }, []),
      n !== +n ||
        a !== +a ||
        u !== +u ||
        o !== +o ||
        s !== +s ||
        (u === 0 && o === 0) ||
        s === 0)
    )
      return null;
    var M = Ge("recharts-trapezoid", f);
    if (!p)
      return w.createElement(
        "g",
        null,
        w.createElement(
          "path",
          lf({}, Vt(t), { className: M, d: V_(n, a, u, o, s) }),
        ),
      );
    var z = _.current,
      U = O.current,
      V = E.current,
      F = C.current,
      ae = T.current,
      ne = "0px ".concat(b === -1 ? 1 : b, "px"),
      K = "".concat(b, "px ").concat(b, "px"),
      q = d2(["strokeDasharray"], h, d);
    return w.createElement(
      hp,
      {
        animationId: D,
        key: D,
        canBegin: b > 0,
        duration: h,
        easing: d,
        isActive: p,
        begin: m,
      },
      (re) => {
        var ce = an(z, u, re),
          L = an(U, o, re),
          W = an(V, s, re),
          ue = an(F, n, re),
          oe = an(ae, a, re);
        g.current &&
          ((_.current = ce),
          (O.current = L),
          (E.current = W),
          (C.current = ue),
          (T.current = oe));
        var he =
          re > 0
            ? { transition: q, strokeDasharray: K }
            : { strokeDasharray: ne };
        return w.createElement(
          "path",
          lf({}, Vt(t), {
            className: M,
            d: V_(ue, oe, ce, L, W),
            ref: g,
            style: X_(X_({}, he), t.style),
          }),
        );
      },
    );
  },
  _9 = ["option", "shapeType", "activeClassName", "inActiveClassName"];
function A9(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = E9(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function E9(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function Z_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function uf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Z_(Object(n), !0).forEach(function (a) {
          j9(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Z_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function j9(e, t, n) {
  return (
    (t = T9(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function T9(e) {
  var t = M9(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function M9(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function C9(e, t) {
  return uf(uf({}, t), e);
}
function D9(e, t) {
  return e === "symbols";
}
function Q_(e) {
  var { shapeType: t, elementProps: n } = e;
  switch (t) {
    case "rectangle":
      return w.createElement(y2, n);
    case "trapezoid":
      return w.createElement(O9, n);
    case "sector":
      return w.createElement(b2, n);
    case "symbols":
      if (D9(t)) return w.createElement(FA, n);
      break;
    case "curve":
      return w.createElement(f2, n);
    default:
      return null;
  }
}
function N9(e) {
  return w.isValidElement(e) ? e.props : e;
}
function P9(e) {
  var {
      option: t,
      shapeType: n,
      activeClassName: a = "recharts-active-shape",
      inActiveClassName: u = "recharts-shape",
    } = e,
    o = A9(e, _9),
    s;
  if (w.isValidElement(t)) s = w.cloneElement(t, uf(uf({}, o), N9(t)));
  else if (typeof t == "function") s = t(o, o.index);
  else if (g9(t) && typeof t != "boolean") {
    var f = C9(t, o);
    s = w.createElement(Q_, { shapeType: n, elementProps: f });
  } else {
    var d = o;
    s = w.createElement(Q_, { shapeType: n, elementProps: d });
  }
  return o.isActive
    ? w.createElement(qr, { className: a }, s)
    : w.createElement(qr, { className: u }, s);
}
function z9(e) {
  var { tooltipEntrySettings: t } = e,
    n = dt(),
    a = sn(),
    u = w.useRef(null);
  return (
    w.useLayoutEffect(() => {
      a ||
        (u.current === null
          ? n(YL(t))
          : u.current !== t && n(KL({ prev: u.current, next: t })),
        (u.current = t));
    }, [t, n, a]),
    w.useLayoutEffect(
      () => () => {
        u.current && (n(GL(u.current)), (u.current = null));
      },
      [n],
    ),
    null
  );
}
function k9(e) {
  var { legendPayload: t } = e,
    n = dt(),
    a = sn(),
    u = w.useRef(null);
  return (
    w.useLayoutEffect(() => {
      a ||
        (u.current === null
          ? n(X3(t))
          : u.current !== t && n(V3({ prev: u.current, next: t })),
        (u.current = t));
    }, [n, a, t]),
    w.useLayoutEffect(
      () => () => {
        u.current && (n(Z3(u.current)), (u.current = null));
      },
      [n],
    ),
    null
  );
}
var Xm,
  R9 = () => {
    var [e] = w.useState(() => Qu("uid-"));
    return e;
  },
  L9 = (Xm = lN.useId) !== null && Xm !== void 0 ? Xm : R9;
function U9(e, t) {
  var n = L9();
  return t || (e ? "".concat(e, "-").concat(n) : n);
}
var q9 = w.createContext(void 0),
  B9 = (e) => {
    var { id: t, type: n, children: a } = e,
      u = U9("recharts-".concat(n), t);
    return w.createElement(q9.Provider, { value: u }, a(u));
  },
  H9 = { cartesianItems: [], polarItems: [] },
  VT = Yt({
    name: "graphicalItems",
    initialState: H9,
    reducers: {
      addCartesianGraphicalItem: {
        reducer(e, t) {
          e.cartesianItems.push(t.payload);
        },
        prepare: Qe(),
      },
      replaceCartesianGraphicalItem: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload,
            u = Bn(e).cartesianItems.indexOf(n);
          u > -1 && (e.cartesianItems[u] = a);
        },
        prepare: Qe(),
      },
      removeCartesianGraphicalItem: {
        reducer(e, t) {
          var n = Bn(e).cartesianItems.indexOf(t.payload);
          n > -1 && e.cartesianItems.splice(n, 1);
        },
        prepare: Qe(),
      },
      addPolarGraphicalItem: {
        reducer(e, t) {
          e.polarItems.push(t.payload);
        },
        prepare: Qe(),
      },
      removePolarGraphicalItem: {
        reducer(e, t) {
          var n = Bn(e).polarItems.indexOf(t.payload);
          n > -1 && e.polarItems.splice(n, 1);
        },
        prepare: Qe(),
      },
      replacePolarGraphicalItem: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload,
            u = Bn(e).polarItems.indexOf(n);
          u > -1 && (e.polarItems[u] = a);
        },
        prepare: Qe(),
      },
    },
  }),
  {
    addCartesianGraphicalItem: I9,
    replaceCartesianGraphicalItem: $9,
    removeCartesianGraphicalItem: Y9,
    addPolarGraphicalItem: F$,
    removePolarGraphicalItem: J$,
    replacePolarGraphicalItem: eY,
  } = VT.actions,
  K9 = VT.reducer,
  G9 = (e) => {
    var t = dt(),
      n = w.useRef(null);
    return (
      w.useLayoutEffect(() => {
        (n.current === null
          ? t(I9(e))
          : n.current !== e && t($9({ prev: n.current, next: e })),
          (n.current = e));
      }, [t, e]),
      w.useLayoutEffect(
        () => () => {
          n.current && (t(Y9(n.current)), (n.current = null));
        },
        [t],
      ),
      null
    );
  },
  X9 = w.memo(G9),
  V9 = ["points"];
function W_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function Vm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? W_(Object(n), !0).forEach(function (a) {
          Z9(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : W_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function Z9(e, t, n) {
  return (
    (t = Q9(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Q9(e) {
  var t = W9(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function W9(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function of() {
  return (
    (of = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    of.apply(null, arguments)
  );
}
function F9(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = J9(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function J9(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function e7(e) {
  var { option: t, dotProps: n, className: a } = e;
  if (w.isValidElement(t)) return w.cloneElement(t, n);
  if (typeof t == "function") return t(n);
  var u = Ge(a, typeof t != "boolean" ? t.className : ""),
    o = n ?? {},
    { points: s } = o,
    f = F9(o, V9);
  return w.createElement(KT, of({}, f, { className: u }));
}
function t7(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function n7(e) {
  var {
    points: t,
    dot: n,
    className: a,
    dotClassName: u,
    dataKey: o,
    baseProps: s,
    needClip: f,
    clipPathId: d,
    zIndex: h = Gt.scatter,
  } = e;
  if (!t7(t, n)) return null;
  var m = XT(n),
    p = qN(n),
    g = t.map((S, _) => {
      var O,
        E,
        C = Vm(
          Vm(Vm({ r: 3 }, s), p),
          {},
          {
            index: _,
            cx: (O = S.x) !== null && O !== void 0 ? O : void 0,
            cy: (E = S.y) !== null && E !== void 0 ? E : void 0,
            dataKey: o,
            value: S.value,
            payload: S.payload,
            points: t,
          },
        );
      return w.createElement(e7, {
        key: "dot-".concat(_),
        option: n,
        dotProps: C,
        className: u,
      });
    }),
    b = {};
  return (
    f &&
      d != null &&
      (b.clipPath = "url(#clipPath-".concat(m ? "" : "dots-").concat(d, ")")),
    w.createElement(
      Jr,
      { zIndex: h },
      w.createElement(qr, of({ className: a }, b), g),
    )
  );
}
function F_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function J_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? F_(Object(n), !0).forEach(function (a) {
          r7(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : F_(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function r7(e, t, n) {
  return (
    (t = a7(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function a7(e) {
  var t = i7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function i7(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var l7 = { xAxis: {}, yAxis: {}, zAxis: {} },
  ZT = Yt({
    name: "cartesianAxis",
    initialState: l7,
    reducers: {
      addXAxis: {
        reducer(e, t) {
          e.xAxis[t.payload.id] = t.payload;
        },
        prepare: Qe(),
      },
      replaceXAxis: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload;
          e.xAxis[n.id] !== void 0 &&
            (n.id !== a.id && delete e.xAxis[n.id], (e.xAxis[a.id] = a));
        },
        prepare: Qe(),
      },
      removeXAxis: {
        reducer(e, t) {
          delete e.xAxis[t.payload.id];
        },
        prepare: Qe(),
      },
      addYAxis: {
        reducer(e, t) {
          e.yAxis[t.payload.id] = t.payload;
        },
        prepare: Qe(),
      },
      replaceYAxis: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload;
          e.yAxis[n.id] !== void 0 &&
            (n.id !== a.id && delete e.yAxis[n.id], (e.yAxis[a.id] = a));
        },
        prepare: Qe(),
      },
      removeYAxis: {
        reducer(e, t) {
          delete e.yAxis[t.payload.id];
        },
        prepare: Qe(),
      },
      addZAxis: {
        reducer(e, t) {
          e.zAxis[t.payload.id] = t.payload;
        },
        prepare: Qe(),
      },
      replaceZAxis: {
        reducer(e, t) {
          var { prev: n, next: a } = t.payload;
          e.zAxis[n.id] !== void 0 &&
            (n.id !== a.id && delete e.zAxis[n.id], (e.zAxis[a.id] = a));
        },
        prepare: Qe(),
      },
      removeZAxis: {
        reducer(e, t) {
          delete e.zAxis[t.payload.id];
        },
        prepare: Qe(),
      },
      updateYAxisWidth(e, t) {
        var { id: n, width: a } = t.payload,
          u = e.yAxis[n];
        if (u) {
          var o,
            s = u.widthHistory || [];
          if (
            s.length === 3 &&
            s[0] === s[2] &&
            a === s[1] &&
            a !== u.width &&
            Math.abs(a - ((o = s[0]) !== null && o !== void 0 ? o : 0)) <= 1
          )
            return;
          var f = [...s, a].slice(-3);
          e.yAxis[n] = J_(J_({}, u), {}, { width: a, widthHistory: f });
        }
      },
    },
  }),
  {
    addXAxis: u7,
    replaceXAxis: o7,
    removeXAxis: c7,
    addYAxis: s7,
    replaceYAxis: f7,
    removeYAxis: d7,
    addZAxis: tY,
    replaceZAxis: nY,
    removeZAxis: rY,
    updateYAxisWidth: v7,
  } = ZT.actions,
  h7 = ZT.reducer,
  m7 = $([Bt], (e) => ({
    top: e.top,
    bottom: e.bottom,
    left: e.left,
    right: e.right,
  })),
  y7 = $([m7, Xr, Vr], (e, t, n) => {
    if (!(!e || t == null || n == null))
      return {
        x: e.left,
        y: e.top,
        width: Math.max(0, t - e.left - e.right),
        height: Math.max(0, n - e.top - e.bottom),
      };
  }),
  bg = () => ye(y7),
  p7 = () => ye(YU);
function eA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function Zm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? eA(Object(n), !0).forEach(function (a) {
          g7(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : eA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function g7(e, t, n) {
  return (
    (t = b7(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function b7(e) {
  var t = x7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function x7(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var S7 = (e) => {
  var {
    point: t,
    childIndex: n,
    mainColor: a,
    activeDot: u,
    dataKey: o,
    clipPath: s,
  } = e;
  if (u === !1 || t.x == null || t.y == null) return null;
  var f = {
      index: n,
      dataKey: o,
      cx: t.x,
      cy: t.y,
      r: 4,
      fill: a ?? "none",
      strokeWidth: 2,
      stroke: "#fff",
      payload: t.payload,
      value: t.value,
    },
    d = Zm(Zm(Zm({}, f), mf(u)), tp(u)),
    h;
  return (
    w.isValidElement(u)
      ? (h = w.cloneElement(u, d))
      : typeof u == "function"
        ? (h = u(d))
        : (h = w.createElement(KT, d)),
    w.createElement(qr, { className: "recharts-active-dot", clipPath: s }, h)
  );
};
function w7(e) {
  var {
      points: t,
      mainColor: n,
      activeDot: a,
      itemDataKey: u,
      clipPath: o,
      zIndex: s = Gt.activeDot,
    } = e,
    f = ye(co),
    d = p7();
  if (t == null || d == null) return null;
  var h = t.find((m) => d.includes(m.payload));
  return Ot(h)
    ? null
    : w.createElement(
        Jr,
        { zIndex: s },
        w.createElement(S7, {
          point: h,
          childIndex: Number(f),
          mainColor: n,
          dataKey: u,
          activeDot: a,
          clipPath: o,
        }),
      );
}
var O7 = (e) => {
    var { chartData: t } = e,
      n = dt(),
      a = sn();
    return (
      w.useEffect(
        () =>
          a
            ? () => {}
            : (n(x_(t)),
              () => {
                n(x_(void 0));
              }),
        [t, n, a],
      ),
      null
    );
  },
  tA = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  QT = Yt({
    name: "brush",
    initialState: tA,
    reducers: {
      setBrushSettings(e, t) {
        return t.payload == null ? tA : t.payload;
      },
    },
  }),
  { setBrushSettings: aY } = QT.actions,
  _7 = QT.reducer;
function A7(e) {
  return ((e % 180) + 180) % 180;
}
var E7 = function (t) {
    var { width: n, height: a } = t,
      u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      o = A7(u),
      s = (o * Math.PI) / 180,
      f = Math.atan(a / n),
      d = s > f && s < Math.PI - f ? a / Math.sin(s) : n / Math.cos(s);
    return Math.abs(d);
  },
  j7 = { dots: [], areas: [], lines: [] },
  WT = Yt({
    name: "referenceElements",
    initialState: j7,
    reducers: {
      addDot: (e, t) => {
        e.dots.push(t.payload);
      },
      removeDot: (e, t) => {
        var n = Bn(e).dots.findIndex((a) => a === t.payload);
        n !== -1 && e.dots.splice(n, 1);
      },
      addArea: (e, t) => {
        e.areas.push(t.payload);
      },
      removeArea: (e, t) => {
        var n = Bn(e).areas.findIndex((a) => a === t.payload);
        n !== -1 && e.areas.splice(n, 1);
      },
      addLine: (e, t) => {
        e.lines.push(t.payload);
      },
      removeLine: (e, t) => {
        var n = Bn(e).lines.findIndex((a) => a === t.payload);
        n !== -1 && e.lines.splice(n, 1);
      },
    },
  }),
  {
    addDot: iY,
    removeDot: lY,
    addArea: uY,
    removeArea: oY,
    addLine: cY,
    removeLine: sY,
  } = WT.actions,
  T7 = WT.reducer,
  M7 = w.createContext(void 0),
  C7 = (e) => {
    var { children: t } = e,
      [n] = w.useState("".concat(Qu("recharts"), "-clip")),
      a = bg();
    if (a == null) return null;
    var { x: u, y: o, width: s, height: f } = a;
    return w.createElement(
      M7.Provider,
      { value: n },
      w.createElement(
        "defs",
        null,
        w.createElement(
          "clipPath",
          { id: n },
          w.createElement("rect", { x: u, y: o, height: f, width: s }),
        ),
      ),
      t,
    );
  };
function FT(e, t) {
  if (t < 1) return [];
  if (t === 1) return e;
  for (var n = [], a = 0; a < e.length; a += t) {
    var u = e[a];
    u !== void 0 && n.push(u);
  }
  return n;
}
function D7(e, t, n) {
  var a = { width: e.width + t.width, height: e.height + t.height };
  return E7(a, n);
}
function N7(e, t, n) {
  var a = n === "width",
    { x: u, y: o, width: s, height: f } = e;
  return t === 1
    ? { start: a ? u : o, end: a ? u + s : o + f }
    : { start: a ? u + s : o + f, end: a ? u : o };
}
function fo(e, t, n, a, u) {
  if (e * t < e * a || e * t > e * u) return !1;
  var o = n();
  return e * (t - (e * o) / 2 - a) >= 0 && e * (t + (e * o) / 2 - u) <= 0;
}
function P7(e, t) {
  return FT(e, t + 1);
}
function z7(e, t, n, a, u) {
  for (
    var o = (a || []).slice(),
      { start: s, end: f } = t,
      d = 0,
      h = 1,
      m = s,
      p = function () {
        var S = a?.[d];
        if (S === void 0) return { v: FT(a, h) };
        var _ = d,
          O,
          E = () => (O === void 0 && (O = n(S, _)), O),
          C = S.coordinate,
          T = d === 0 || fo(e, C, E, m, f);
        (T || ((d = 0), (m = s), (h += 1)),
          T && ((m = C + e * (E() / 2 + u)), (d += h)));
      },
      g;
    h <= o.length;
  )
    if (((g = p()), g)) return g.v;
  return [];
}
function k7(e, t, n, a, u) {
  var o = (a || []).slice(),
    s = o.length;
  if (s === 0) return [];
  for (var { start: f, end: d } = t, h = 1; h <= s; h++) {
    for (
      var m = (s - 1) % h,
        p = f,
        g = !0,
        b = function () {
          var D = a[_];
          if (D == null) return 0;
          var M = _,
            z,
            U = () => (z === void 0 && (z = n(D, M)), z),
            V = D.coordinate,
            F = _ === m || fo(e, V, U, p, d);
          if (!F) return ((g = !1), 1);
          F && (p = V + e * (U() / 2 + u));
        },
        S,
        _ = m;
      _ < s && ((S = b()), !(S !== 0 && S === 1));
      _ += h
    );
    if (g) {
      for (var O = [], E = m; E < s; E += h) {
        var C = a[E];
        C != null && O.push(C);
      }
      return O;
    }
  }
  return [];
}
function nA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function It(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? nA(Object(n), !0).forEach(function (a) {
          R7(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : nA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function R7(e, t, n) {
  return (
    (t = L7(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function L7(e) {
  var t = U7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function U7(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function q7(e, t, n, a, u) {
  for (
    var o = (a || []).slice(),
      s = o.length,
      { start: f } = t,
      { end: d } = t,
      h = function (g) {
        var b = o[g];
        if (b == null) return 1;
        var S = b,
          _,
          O = () => (_ === void 0 && (_ = n(b, g)), _);
        if (g === s - 1) {
          var E = e * (S.coordinate + (e * O()) / 2 - d);
          o[g] = S = It(
            It({}, S),
            {},
            { tickCoord: E > 0 ? S.coordinate - E * e : S.coordinate },
          );
        } else o[g] = S = It(It({}, S), {}, { tickCoord: S.coordinate });
        if (S.tickCoord != null) {
          var C = fo(e, S.tickCoord, O, f, d);
          C &&
            ((d = S.tickCoord - e * (O() / 2 + u)),
            (o[g] = It(It({}, S), {}, { isShow: !0 })));
        }
      },
      m = s - 1;
    m >= 0;
    m--
  )
    h(m);
  return o;
}
function B7(e, t, n, a, u, o) {
  var s = (a || []).slice(),
    f = s.length,
    { start: d, end: h } = t;
  if (o) {
    var m = a[f - 1];
    if (m != null) {
      var p = n(m, f - 1),
        g = e * (m.coordinate + (e * p) / 2 - h);
      if (
        ((s[f - 1] = m =
          It(
            It({}, m),
            {},
            { tickCoord: g > 0 ? m.coordinate - g * e : m.coordinate },
          )),
        m.tickCoord != null)
      ) {
        var b = fo(e, m.tickCoord, () => p, d, h);
        b &&
          ((h = m.tickCoord - e * (p / 2 + u)),
          (s[f - 1] = It(It({}, m), {}, { isShow: !0 })));
      }
    }
  }
  for (
    var S = o ? f - 1 : f,
      _ = function (C) {
        var T = s[C];
        if (T == null) return 1;
        var D = T,
          M,
          z = () => (M === void 0 && (M = n(T, C)), M);
        if (C === 0) {
          var U = e * (D.coordinate - (e * z()) / 2 - d);
          s[C] = D = It(
            It({}, D),
            {},
            { tickCoord: U < 0 ? D.coordinate - U * e : D.coordinate },
          );
        } else s[C] = D = It(It({}, D), {}, { tickCoord: D.coordinate });
        if (D.tickCoord != null) {
          var V = fo(e, D.tickCoord, z, d, h);
          V &&
            ((d = D.tickCoord + e * (z() / 2 + u)),
            (s[C] = It(It({}, D), {}, { isShow: !0 })));
        }
      },
      O = 0;
    O < S;
    O++
  )
    _(O);
  return s;
}
function xg(e, t, n) {
  var {
    tick: a,
    ticks: u,
    viewBox: o,
    minTickGap: s,
    orientation: f,
    interval: d,
    tickFormatter: h,
    unit: m,
    angle: p,
  } = e;
  if (!u || !u.length || !a) return [];
  if (ve(d) || xo.isSsr) {
    var g;
    return (g = P7(u, ve(d) ? d : 0)) !== null && g !== void 0 ? g : [];
  }
  var b = [],
    S = f === "top" || f === "bottom" ? "width" : "height",
    _ =
      m && S === "width"
        ? Vu(m, { fontSize: t, letterSpacing: n })
        : { width: 0, height: 0 },
    O = (M, z) => {
      var U = typeof h == "function" ? h(M.value, z) : M.value;
      return S === "width"
        ? D7(Vu(U, { fontSize: t, letterSpacing: n }), _, p)
        : Vu(U, { fontSize: t, letterSpacing: n })[S];
    },
    E = u[0],
    C = u[1],
    T =
      u.length >= 2 && E != null && C != null
        ? qn(C.coordinate - E.coordinate)
        : 1,
    D = N7(o, T, S);
  return d === "equidistantPreserveStart"
    ? z7(T, D, O, u, s)
    : d === "equidistantPreserveEnd"
      ? k7(T, D, O, u, s)
      : (d === "preserveStart" || d === "preserveStartEnd"
          ? (b = B7(T, D, O, u, s, d === "preserveStartEnd"))
          : (b = q7(T, D, O, u, s)),
        b.filter((M) => M.isShow));
}
var H7 = (e) => {
    var {
        ticks: t,
        label: n,
        labelGapWithTick: a = 5,
        tickSize: u = 0,
        tickMargin: o = 0,
      } = e,
      s = 0;
    if (t) {
      Array.from(t).forEach((m) => {
        if (m) {
          var p = m.getBoundingClientRect();
          p.width > s && (s = p.width);
        }
      });
      var f = n ? n.getBoundingClientRect().width : 0,
        d = u + o,
        h = s + d + f + (n ? a : 0);
      return Math.round(h);
    }
    return 0;
  },
  I7 = { xAxis: {}, yAxis: {} },
  JT = Yt({
    name: "renderedTicks",
    initialState: I7,
    reducers: {
      setRenderedTicks: (e, t) => {
        var { axisType: n, axisId: a, ticks: u } = t.payload;
        e[n][a] = u;
      },
      removeRenderedTicks: (e, t) => {
        var { axisType: n, axisId: a } = t.payload;
        delete e[n][a];
      },
    },
  }),
  { setRenderedTicks: $7, removeRenderedTicks: Y7 } = JT.actions,
  K7 = JT.reducer,
  G7 = [
    "axisLine",
    "width",
    "height",
    "className",
    "hide",
    "ticks",
    "axisType",
    "axisId",
  ];
function X7(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = V7(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function V7(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function Si() {
  return (
    (Si = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Si.apply(null, arguments)
  );
}
function rA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function rt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? rA(Object(n), !0).forEach(function (a) {
          Z7(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : rA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function Z7(e, t, n) {
  return (
    (t = Q7(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Q7(e) {
  var t = W7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function W7(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ur = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
  orientation: "bottom",
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
  zIndex: Gt.axis,
};
function F7(e) {
  var {
    x: t,
    y: n,
    width: a,
    height: u,
    orientation: o,
    mirror: s,
    axisLine: f,
    otherSvgProps: d,
  } = e;
  if (!f) return null;
  var h = rt(rt(rt({}, d), sr(f)), {}, { fill: "none" });
  if (o === "top" || o === "bottom") {
    var m = +((o === "top" && !s) || (o === "bottom" && s));
    h = rt(rt({}, h), {}, { x1: t, y1: n + m * u, x2: t + a, y2: n + m * u });
  } else {
    var p = +((o === "left" && !s) || (o === "right" && s));
    h = rt(rt({}, h), {}, { x1: t + p * a, y1: n, x2: t + p * a, y2: n + u });
  }
  return w.createElement(
    "line",
    Si({}, h, {
      className: Ge("recharts-cartesian-axis-line", bf(f, "className")),
    }),
  );
}
function J7(e, t, n, a, u, o, s, f, d) {
  var h,
    m,
    p,
    g,
    b,
    S,
    _ = f ? -1 : 1,
    O = e.tickSize || s,
    E = ve(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (o) {
    case "top":
      ((h = m = e.coordinate),
        (g = n + +!f * u),
        (p = g - _ * O),
        (S = p - _ * d),
        (b = E));
      break;
    case "left":
      ((p = g = e.coordinate),
        (m = t + +!f * a),
        (h = m - _ * O),
        (b = h - _ * d),
        (S = E));
      break;
    case "right":
      ((p = g = e.coordinate),
        (m = t + +f * a),
        (h = m + _ * O),
        (b = h + _ * d),
        (S = E));
      break;
    default:
      ((h = m = e.coordinate),
        (g = n + +f * u),
        (p = g + _ * O),
        (S = p + _ * d),
        (b = E));
      break;
  }
  return { line: { x1: h, y1: p, x2: m, y2: g }, tick: { x: b, y: S } };
}
function eH(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function tH(e, t) {
  switch (e) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return t ? "start" : "end";
    default:
      return t ? "end" : "start";
  }
}
function nH(e) {
  var { option: t, tickProps: n, value: a } = e,
    u,
    o = Ge(n.className, "recharts-cartesian-axis-tick-value");
  if (w.isValidElement(t))
    u = w.cloneElement(t, rt(rt({}, n), {}, { className: o }));
  else if (typeof t == "function") u = t(rt(rt({}, n), {}, { className: o }));
  else {
    var s = "recharts-cartesian-axis-tick-value";
    (typeof t != "boolean" && (s = Ge(s, h9(t))),
      (u = w.createElement(pg, Si({}, n, { className: s }), a)));
  }
  return u;
}
function rH(e) {
  var { ticks: t, axisType: n, axisId: a } = e,
    u = dt();
  return (
    w.useEffect(() => {
      if (a == null || n == null) return wi;
      var o = t.map((s) => ({
        value: s.value,
        coordinate: s.coordinate,
        offset: s.offset,
        index: s.index,
      }));
      return (
        u($7({ ticks: o, axisId: a, axisType: n })),
        () => {
          u(Y7({ axisId: a, axisType: n }));
        }
      );
    }, [u, t, a, n]),
    null
  );
}
var aH = w.forwardRef((e, t) => {
    var {
        ticks: n = [],
        tick: a,
        tickLine: u,
        stroke: o,
        tickFormatter: s,
        unit: f,
        padding: d,
        tickTextProps: h,
        orientation: m,
        mirror: p,
        x: g,
        y: b,
        width: S,
        height: _,
        tickSize: O,
        tickMargin: E,
        fontSize: C,
        letterSpacing: T,
        getTicksConfig: D,
        events: M,
        axisType: z,
        axisId: U,
      } = e,
      V = xg(rt(rt({}, D), {}, { ticks: n }), C, T),
      F = sr(D),
      ae = mf(a),
      ne = LT(F.textAnchor) ? F.textAnchor : eH(m, p),
      K = tH(m, p),
      q = {};
    typeof u == "object" && (q = u);
    var re = rt(rt({}, F), {}, { fill: "none" }, q),
      ce = V.map((ue) => rt({ entry: ue }, J7(ue, g, b, S, _, m, O, p, E))),
      L = ce.map((ue) => {
        var { entry: oe, line: he } = ue;
        return w.createElement(
          qr,
          {
            className: "recharts-cartesian-axis-tick",
            key: "tick-"
              .concat(oe.value, "-")
              .concat(oe.coordinate, "-")
              .concat(oe.tickCoord),
          },
          u &&
            w.createElement(
              "line",
              Si({}, re, he, {
                className: Ge(
                  "recharts-cartesian-axis-tick-line",
                  bf(u, "className"),
                ),
              }),
            ),
        );
      }),
      W = ce.map((ue, oe) => {
        var he,
          P,
          { entry: G, tick: te } = ue,
          ie = rt(
            rt(
              rt(
                rt({ verticalAnchor: K }, F),
                {},
                { textAnchor: ne, stroke: "none", fill: o },
                te,
              ),
              {},
              {
                index: oe,
                payload: G,
                visibleTicksCount: V.length,
                tickFormatter: s,
                padding: d,
              },
              h,
            ),
            {},
            {
              angle:
                (he = (P = h?.angle) !== null && P !== void 0 ? P : F.angle) !==
                  null && he !== void 0
                  ? he
                  : 0,
            },
          ),
          pe = rt(rt({}, ie), ae);
        return w.createElement(
          qr,
          Si(
            {
              className: "recharts-cartesian-axis-tick-label",
              key: "tick-label-"
                .concat(G.value, "-")
                .concat(G.coordinate, "-")
                .concat(G.tickCoord),
            },
            $P(M, G, oe),
          ),
          a &&
            w.createElement(nH, {
              option: a,
              tickProps: pe,
              value: ""
                .concat(typeof s == "function" ? s(G.value, oe) : G.value)
                .concat(f || ""),
            }),
        );
      });
    return w.createElement(
      "g",
      {
        className: "recharts-cartesian-axis-ticks recharts-".concat(
          z,
          "-ticks",
        ),
      },
      w.createElement(rH, { ticks: V, axisId: U, axisType: z }),
      W.length > 0 &&
        w.createElement(
          Jr,
          { zIndex: Gt.label },
          w.createElement(
            "g",
            {
              className: "recharts-cartesian-axis-tick-labels recharts-".concat(
                z,
                "-tick-labels",
              ),
              ref: t,
            },
            W,
          ),
        ),
      L.length > 0 &&
        w.createElement(
          "g",
          {
            className: "recharts-cartesian-axis-tick-lines recharts-".concat(
              z,
              "-tick-lines",
            ),
          },
          L,
        ),
    );
  }),
  iH = w.forwardRef((e, t) => {
    var {
        axisLine: n,
        width: a,
        height: u,
        className: o,
        hide: s,
        ticks: f,
        axisType: d,
        axisId: h,
      } = e,
      m = X7(e, G7),
      [p, g] = w.useState(""),
      [b, S] = w.useState(""),
      _ = w.useRef(null);
    w.useImperativeHandle(t, () => ({
      getCalculatedWidth: () => {
        var E;
        return H7({
          ticks: _.current,
          label: (E = e.labelRef) === null || E === void 0 ? void 0 : E.current,
          labelGapWithTick: 5,
          tickSize: e.tickSize,
          tickMargin: e.tickMargin,
        });
      },
    }));
    var O = w.useCallback(
      (E) => {
        if (E) {
          var C = E.getElementsByClassName(
            "recharts-cartesian-axis-tick-value",
          );
          _.current = C;
          var T = C[0];
          if (T) {
            var D = window.getComputedStyle(T),
              M = D.fontSize,
              z = D.letterSpacing;
            (M !== p || z !== b) && (g(M), S(z));
          }
        }
      },
      [p, b],
    );
    return s || (a != null && a <= 0) || (u != null && u <= 0)
      ? null
      : w.createElement(
          Jr,
          { zIndex: e.zIndex },
          w.createElement(
            qr,
            { className: Ge("recharts-cartesian-axis", o) },
            w.createElement(F7, {
              x: e.x,
              y: e.y,
              width: a,
              height: u,
              orientation: e.orientation,
              mirror: e.mirror,
              axisLine: n,
              otherSvgProps: sr(e),
            }),
            w.createElement(aH, {
              ref: O,
              axisType: d,
              events: m,
              fontSize: p,
              getTicksConfig: e,
              height: e.height,
              letterSpacing: b,
              mirror: e.mirror,
              orientation: e.orientation,
              padding: e.padding,
              stroke: e.stroke,
              tick: e.tick,
              tickFormatter: e.tickFormatter,
              tickLine: e.tickLine,
              tickMargin: e.tickMargin,
              tickSize: e.tickSize,
              tickTextProps: e.tickTextProps,
              ticks: f,
              unit: e.unit,
              width: e.width,
              x: e.x,
              y: e.y,
              axisId: h,
            }),
            w.createElement(
              XB,
              {
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height,
                lowerWidth: e.width,
                upperWidth: e.width,
              },
              w.createElement(r9, { label: e.label, labelRef: e.labelRef }),
              e.children,
            ),
          ),
        );
  }),
  Sg = w.forwardRef((e, t) => {
    var n = cn(e, Ur);
    return w.createElement(iH, Si({}, n, { ref: t }));
  });
Sg.displayName = "CartesianAxis";
var lH = ["x1", "y1", "x2", "y2", "key"],
  uH = ["offset"],
  oH = ["xAxisId", "yAxisId"],
  cH = ["xAxisId", "yAxisId"];
function aA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function $t(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? aA(Object(n), !0).forEach(function (a) {
          sH(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : aA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function sH(e, t, n) {
  return (
    (t = fH(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function fH(e) {
  var t = dH(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dH(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fi() {
  return (
    (fi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    fi.apply(null, arguments)
  );
}
function cf(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = vH(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function vH(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var hH = (e) => {
  var { fill: t } = e;
  if (!t || t === "none") return null;
  var { fillOpacity: n, x: a, y: u, width: o, height: s, ry: f } = e;
  return w.createElement("rect", {
    x: a,
    y: u,
    ry: f,
    width: o,
    height: s,
    stroke: "none",
    fill: t,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg",
  });
};
function eM(e) {
  var { option: t, lineItemProps: n } = e,
    a;
  if (w.isValidElement(t)) a = w.cloneElement(t, n);
  else if (typeof t == "function") a = t(n);
  else {
    var u,
      { x1: o, y1: s, x2: f, y2: d, key: h } = n,
      m = cf(n, lH),
      p = (u = sr(m)) !== null && u !== void 0 ? u : {},
      { offset: g } = p,
      b = cf(p, uH);
    a = w.createElement(
      "line",
      fi({}, b, { x1: o, y1: s, x2: f, y2: d, fill: "none", key: h }),
    );
  }
  return a;
}
function mH(e) {
  var { x: t, width: n, horizontal: a = !0, horizontalPoints: u } = e;
  if (!a || !u || !u.length) return null;
  var { xAxisId: o, yAxisId: s } = e,
    f = cf(e, oH),
    d = u.map((h, m) => {
      var p = $t(
        $t({}, f),
        {},
        { x1: t, y1: h, x2: t + n, y2: h, key: "line-".concat(m), index: m },
      );
      return w.createElement(eM, {
        key: "line-".concat(m),
        option: a,
        lineItemProps: p,
      });
    });
  return w.createElement(
    "g",
    { className: "recharts-cartesian-grid-horizontal" },
    d,
  );
}
function yH(e) {
  var { y: t, height: n, vertical: a = !0, verticalPoints: u } = e;
  if (!a || !u || !u.length) return null;
  var { xAxisId: o, yAxisId: s } = e,
    f = cf(e, cH),
    d = u.map((h, m) => {
      var p = $t(
        $t({}, f),
        {},
        { x1: h, y1: t, x2: h, y2: t + n, key: "line-".concat(m), index: m },
      );
      return w.createElement(eM, {
        option: a,
        lineItemProps: p,
        key: "line-".concat(m),
      });
    });
  return w.createElement(
    "g",
    { className: "recharts-cartesian-grid-vertical" },
    d,
  );
}
function pH(e) {
  var {
    horizontalFill: t,
    fillOpacity: n,
    x: a,
    y: u,
    width: o,
    height: s,
    horizontalPoints: f,
    horizontal: d = !0,
  } = e;
  if (!d || !t || !t.length || f == null) return null;
  var h = f.map((p) => Math.round(p + u - u)).sort((p, g) => p - g);
  u !== h[0] && h.unshift(0);
  var m = h.map((p, g) => {
    var b = h[g + 1],
      S = b == null,
      _ = S ? u + s - p : b - p;
    if (_ <= 0) return null;
    var O = g % t.length;
    return w.createElement("rect", {
      key: "react-".concat(g),
      y: p,
      x: a,
      height: _,
      width: o,
      stroke: "none",
      fill: t[O],
      fillOpacity: n,
      className: "recharts-cartesian-grid-bg",
    });
  });
  return w.createElement(
    "g",
    { className: "recharts-cartesian-gridstripes-horizontal" },
    m,
  );
}
function gH(e) {
  var {
    vertical: t = !0,
    verticalFill: n,
    fillOpacity: a,
    x: u,
    y: o,
    width: s,
    height: f,
    verticalPoints: d,
  } = e;
  if (!t || !n || !n.length) return null;
  var h = d.map((p) => Math.round(p + u - u)).sort((p, g) => p - g);
  u !== h[0] && h.unshift(0);
  var m = h.map((p, g) => {
    var b = h[g + 1],
      S = b == null,
      _ = S ? u + s - p : b - p;
    if (_ <= 0) return null;
    var O = g % n.length;
    return w.createElement("rect", {
      key: "react-".concat(g),
      x: p,
      y: o,
      width: _,
      height: f,
      stroke: "none",
      fill: n[O],
      fillOpacity: a,
      className: "recharts-cartesian-grid-bg",
    });
  });
  return w.createElement(
    "g",
    { className: "recharts-cartesian-gridstripes-vertical" },
    m,
  );
}
var bH = (e, t) => {
    var { xAxis: n, width: a, height: u, offset: o } = e;
    return $E(
      xg(
        $t(
          $t($t({}, Ur), n),
          {},
          { ticks: YE(n), viewBox: { x: 0, y: 0, width: a, height: u } },
        ),
      ),
      o.left,
      o.left + o.width,
      t,
    );
  },
  xH = (e, t) => {
    var { yAxis: n, width: a, height: u, offset: o } = e;
    return $E(
      xg(
        $t(
          $t($t({}, Ur), n),
          {},
          { ticks: YE(n), viewBox: { x: 0, y: 0, width: a, height: u } },
        ),
      ),
      o.top,
      o.top + o.height,
      t,
    );
  },
  SH = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: [],
    xAxisId: 0,
    yAxisId: 0,
    syncWithTicks: !1,
    zIndex: Gt.grid,
  };
function tM(e) {
  var t = FE(),
    n = JE(),
    a = WE(),
    u = $t(
      $t({}, cn(e, SH)),
      {},
      {
        x: ve(e.x) ? e.x : a.left,
        y: ve(e.y) ? e.y : a.top,
        width: ve(e.width) ? e.width : a.width,
        height: ve(e.height) ? e.height : a.height,
      },
    ),
    {
      xAxisId: o,
      yAxisId: s,
      x: f,
      y: d,
      width: h,
      height: m,
      syncWithTicks: p,
      horizontalValues: g,
      verticalValues: b,
    } = u,
    S = sn(),
    _ = ye((F) => u_(F, "xAxis", o, S)),
    O = ye((F) => u_(F, "yAxis", s, S));
  if (!dr(h) || !dr(m) || !ve(f) || !ve(d)) return null;
  var E = u.verticalCoordinatesGenerator || bH,
    C = u.horizontalCoordinatesGenerator || xH,
    { horizontalPoints: T, verticalPoints: D } = u;
  if ((!T || !T.length) && typeof C == "function") {
    var M = g && g.length,
      z = C(
        {
          yAxis: O ? $t($t({}, O), {}, { ticks: M ? g : O.ticks }) : void 0,
          width: t ?? h,
          height: n ?? m,
          offset: a,
        },
        M ? !0 : p,
      );
    (Ps(
      Array.isArray(z),
      "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(
        typeof z,
        "]",
      ),
    ),
      Array.isArray(z) && (T = z));
  }
  if ((!D || !D.length) && typeof E == "function") {
    var U = b && b.length,
      V = E(
        {
          xAxis: _ ? $t($t({}, _), {}, { ticks: U ? b : _.ticks }) : void 0,
          width: t ?? h,
          height: n ?? m,
          offset: a,
        },
        U ? !0 : p,
      );
    (Ps(
      Array.isArray(V),
      "verticalCoordinatesGenerator should return Array but instead it returned [".concat(
        typeof V,
        "]",
      ),
    ),
      Array.isArray(V) && (D = V));
  }
  return w.createElement(
    Jr,
    { zIndex: u.zIndex },
    w.createElement(
      "g",
      { className: "recharts-cartesian-grid" },
      w.createElement(hH, {
        fill: u.fill,
        fillOpacity: u.fillOpacity,
        x: u.x,
        y: u.y,
        width: u.width,
        height: u.height,
        ry: u.ry,
      }),
      w.createElement(pH, fi({}, u, { horizontalPoints: T })),
      w.createElement(gH, fi({}, u, { verticalPoints: D })),
      w.createElement(
        mH,
        fi({}, u, { offset: a, horizontalPoints: T, xAxis: _, yAxis: O }),
      ),
      w.createElement(
        yH,
        fi({}, u, { offset: a, verticalPoints: D, xAxis: _, yAxis: O }),
      ),
    ),
  );
}
tM.displayName = "CartesianGrid";
var wH = {},
  nM = Yt({
    name: "errorBars",
    initialState: wH,
    reducers: {
      addErrorBar: (e, t) => {
        var { itemId: n, errorBar: a } = t.payload;
        (e[n] || (e[n] = []), e[n].push(a));
      },
      replaceErrorBar: (e, t) => {
        var { itemId: n, prev: a, next: u } = t.payload;
        e[n] &&
          (e[n] = e[n].map((o) =>
            o.dataKey === a.dataKey && o.direction === a.direction ? u : o,
          ));
      },
      removeErrorBar: (e, t) => {
        var { itemId: n, errorBar: a } = t.payload;
        e[n] &&
          (e[n] = e[n].filter(
            (u) => u.dataKey !== a.dataKey || u.direction !== a.direction,
          ));
      },
    },
  }),
  { addErrorBar: fY, replaceErrorBar: dY, removeErrorBar: vY } = nM.actions,
  OH = nM.reducer,
  _H = ["children"];
function AH(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = EH(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function EH(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var jH = {
    data: [],
    xAxisId: "xAxis-0",
    yAxisId: "yAxis-0",
    dataPointFormatter: () => ({ x: 0, y: 0, value: 0 }),
    errorBarOffset: 0,
  },
  TH = w.createContext(jH);
function MH(e) {
  var { children: t } = e,
    n = AH(e, _H);
  return w.createElement(TH.Provider, { value: n }, t);
}
function rM(e, t) {
  var n,
    a,
    u = ye((h) => Qr(h, e)),
    o = ye((h) => Wr(h, t)),
    s =
      (n = u?.allowDataOverflow) !== null && n !== void 0
        ? n
        : ht.allowDataOverflow,
    f =
      (a = o?.allowDataOverflow) !== null && a !== void 0
        ? a
        : mt.allowDataOverflow,
    d = s || f;
  return { needClip: d, needClipX: s, needClipY: f };
}
function CH(e) {
  var { xAxisId: t, yAxisId: n, clipPathId: a } = e,
    u = bg(),
    { needClipX: o, needClipY: s, needClip: f } = rM(t, n);
  if (!f || !u) return null;
  var { x: d, y: h, width: m, height: p } = u;
  return w.createElement(
    "clipPath",
    { id: "clipPath-".concat(a) },
    w.createElement("rect", {
      x: o ? d : d - m / 2,
      y: s ? h : h - p / 2,
      width: o ? m : m * 2,
      height: s ? p : p * 2,
    }),
  );
}
var aM = (e, t, n, a) => rT(e, "xAxis", t, a),
  iM = (e, t, n, a) => nT(e, "xAxis", t, a),
  lM = (e, t, n, a) => rT(e, "yAxis", n, a),
  uM = (e, t, n, a) => nT(e, "yAxis", n, a),
  DH = $([et, aM, lM, iM, uM], (e, t, n, a, u) =>
    Gr(e, "xAxis") ? Ns(t, a, !1) : Ns(n, u, !1),
  ),
  NH = (e, t, n, a, u) => u;
function PH(e) {
  return e.type === "line";
}
var zH = $([Ej, NH], (e, t) => e.filter(PH).find((n) => n.id === t)),
  kH = $([et, aM, lM, iM, uM, zH, DH, yp], (e, t, n, a, u, o, s, f) => {
    var { chartData: d, dataStartIndex: h, dataEndIndex: m } = f;
    if (
      !(
        o == null ||
        t == null ||
        n == null ||
        a == null ||
        u == null ||
        a.length === 0 ||
        u.length === 0 ||
        s == null ||
        (e !== "horizontal" && e !== "vertical")
      )
    ) {
      var { dataKey: p, data: g } = o,
        b;
      if (
        (g != null && g.length > 0 ? (b = g) : (b = d?.slice(h, m + 1)),
        b != null)
      )
        return nI({
          layout: e,
          xAxis: t,
          yAxis: n,
          xAxisTicks: a,
          yAxisTicks: u,
          dataKey: p,
          bandSize: s,
          displayedData: b,
        });
    }
  });
function RH(e) {
  var t = mf(e),
    n = 3,
    a = 2;
  if (t != null) {
    var { r: u, strokeWidth: o } = t,
      s = Number(u),
      f = Number(o);
    return (
      (Number.isNaN(s) || s < 0) && (s = n),
      (Number.isNaN(f) || f < 0) && (f = a),
      { r: s, strokeWidth: f }
    );
  }
  return { r: n, strokeWidth: a };
}
var LH = ["id"],
  UH = ["type", "layout", "connectNulls", "needClip", "shape"],
  qH = [
    "activeDot",
    "animateNewValues",
    "animationBegin",
    "animationDuration",
    "animationEasing",
    "connectNulls",
    "dot",
    "hide",
    "isAnimationActive",
    "label",
    "legendType",
    "xAxisId",
    "yAxisId",
    "id",
  ];
function vo() {
  return (
    (vo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    vo.apply(null, arguments)
  );
}
function iA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function ir(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? iA(Object(n), !0).forEach(function (a) {
          BH(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : iA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function BH(e, t, n) {
  return (
    (t = HH(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function HH(e) {
  var t = IH(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function IH(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wg(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = $H(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function $H(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var YH = (e) => {
    var { dataKey: t, name: n, stroke: a, legendType: u, hide: o } = e;
    return [
      {
        inactive: o,
        dataKey: t,
        type: u,
        color: a,
        value: KE(n, t),
        payload: e,
      },
    ];
  },
  KH = w.memo((e) => {
    var {
        dataKey: t,
        data: n,
        stroke: a,
        strokeWidth: u,
        fill: o,
        name: s,
        hide: f,
        unit: d,
        tooltipType: h,
        id: m,
      } = e,
      p = {
        dataDefinedOnItem: n,
        getPosition: wi,
        settings: {
          stroke: a,
          strokeWidth: u,
          fill: o,
          dataKey: t,
          nameKey: void 0,
          name: KE(s, t),
          hide: f,
          type: h,
          color: a,
          unit: d,
          graphicalItemId: m,
        },
      };
    return w.createElement(z9, { tooltipEntrySettings: p });
  }),
  oM = (e, t) => "".concat(t, "px ").concat(e, "px");
function GH(e, t) {
  for (var n = e.length % 2 !== 0 ? [...e, 0] : e, a = [], u = 0; u < t; ++u)
    a.push(...n);
  return a;
}
var XH = (e, t, n) => {
  var a = n.reduce((g, b) => g + b, 0);
  if (!a) return oM(t, e);
  for (
    var u = Math.floor(e / a), o = e % a, s = [], f = 0, d = 0;
    f < n.length;
    d += (h = n[f]) !== null && h !== void 0 ? h : 0, ++f
  ) {
    var h,
      m = n[f];
    if (m != null && d + m > o) {
      s = [...n.slice(0, f), o - d];
      break;
    }
  }
  var p = s.length % 2 === 0 ? [0, t] : [t];
  return [...GH(n, u), ...s, ...p].map((g) => "".concat(g, "px")).join(", ");
};
function VH(e) {
  var { clipPathId: t, points: n, props: a } = e,
    { dot: u, dataKey: o, needClip: s } = a,
    { id: f } = a,
    d = wg(a, LH),
    h = sr(d);
  return w.createElement(n7, {
    points: n,
    dot: u,
    className: "recharts-line-dots",
    dotClassName: "recharts-line-dot",
    dataKey: o,
    baseProps: h,
    needClip: s,
    clipPathId: t,
  });
}
function ZH(e) {
  var { showLabels: t, children: n, points: a } = e,
    u = w.useMemo(
      () =>
        a?.map((o) => {
          var s,
            f,
            d = {
              x: (s = o.x) !== null && s !== void 0 ? s : 0,
              y: (f = o.y) !== null && f !== void 0 ? f : 0,
              width: 0,
              lowerWidth: 0,
              upperWidth: 0,
              height: 0,
            };
          return ir(
            ir({}, d),
            {},
            {
              value: o.value,
              payload: o.payload,
              viewBox: d,
              parentViewBox: void 0,
              fill: void 0,
            },
          );
        }),
      [a],
    );
  return w.createElement(o9, { value: t ? u : void 0 }, n);
}
function lA(e) {
  var {
      clipPathId: t,
      pathRef: n,
      points: a,
      strokeDasharray: u,
      props: o,
    } = e,
    { type: s, layout: f, connectNulls: d, needClip: h, shape: m } = o,
    p = wg(o, UH),
    g = ir(
      ir({}, Vt(p)),
      {},
      {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: h ? "url(#clipPath-".concat(t, ")") : void 0,
        points: a,
        type: s,
        layout: f,
        connectNulls: d,
        strokeDasharray: u ?? o.strokeDasharray,
      },
    );
  return w.createElement(
    w.Fragment,
    null,
    a?.length > 1 &&
      w.createElement(
        P9,
        vo({ shapeType: "curve", option: m }, g, { pathRef: n }),
      ),
    w.createElement(VH, { points: a, clipPathId: t, props: o }),
  );
}
function QH(e) {
  try {
    return (e && e.getTotalLength && e.getTotalLength()) || 0;
  } catch {
    return 0;
  }
}
function WH(e) {
  var {
      clipPathId: t,
      props: n,
      pathRef: a,
      previousPointsRef: u,
      longestAnimatedLengthRef: o,
    } = e,
    {
      points: s,
      strokeDasharray: f,
      isAnimationActive: d,
      animationBegin: h,
      animationDuration: m,
      animationEasing: p,
      animateNewValues: g,
      width: b,
      height: S,
      onAnimationEnd: _,
      onAnimationStart: O,
    } = n,
    E = u.current,
    C = mp(s, "recharts-line-"),
    T = w.useRef(C),
    [D, M] = w.useState(!1),
    z = !D,
    U = w.useCallback(() => {
      (typeof _ == "function" && _(), M(!1));
    }, [_]),
    V = w.useCallback(() => {
      (typeof O == "function" && O(), M(!0));
    }, [O]),
    F = QH(a.current),
    ae = w.useRef(0);
  T.current !== C && ((ae.current = o.current), (T.current = C));
  var ne = ae.current;
  return w.createElement(
    ZH,
    { points: s, showLabels: z },
    n.children,
    w.createElement(
      hp,
      {
        animationId: C,
        begin: h,
        duration: m,
        isActive: d,
        easing: p,
        onAnimationEnd: U,
        onAnimationStart: V,
        key: C,
      },
      (K) => {
        var q = an(ne, F + ne, K),
          re = Math.min(q, F),
          ce;
        if (d)
          if (f) {
            var L = ""
              .concat(f)
              .split(/[,\s]+/gim)
              .map((oe) => parseFloat(oe));
            ce = XH(re, F, L);
          } else ce = oM(F, re);
        else ce = f == null ? void 0 : String(f);
        if (
          (K > 0 &&
            F > 0 &&
            ((u.current = s), (o.current = Math.max(o.current, re))),
          E)
        ) {
          var W = E.length / s.length,
            ue =
              K === 1
                ? s
                : s.map((oe, he) => {
                    var P = Math.floor(he * W);
                    if (E[P]) {
                      var G = E[P];
                      return ir(
                        ir({}, oe),
                        {},
                        { x: an(G.x, oe.x, K), y: an(G.y, oe.y, K) },
                      );
                    }
                    return g
                      ? ir(
                          ir({}, oe),
                          {},
                          { x: an(b * 2, oe.x, K), y: an(S / 2, oe.y, K) },
                        )
                      : ir(ir({}, oe), {}, { x: oe.x, y: oe.y });
                  });
          return (
            (u.current = ue),
            w.createElement(lA, {
              props: n,
              points: ue,
              clipPathId: t,
              pathRef: a,
              strokeDasharray: ce,
            })
          );
        }
        return w.createElement(lA, {
          props: n,
          points: s,
          clipPathId: t,
          pathRef: a,
          strokeDasharray: ce,
        });
      },
    ),
    w.createElement(f9, { label: n.label }),
  );
}
function FH(e) {
  var { clipPathId: t, props: n } = e,
    a = w.useRef(null),
    u = w.useRef(0),
    o = w.useRef(null);
  return w.createElement(WH, {
    props: n,
    clipPathId: t,
    previousPointsRef: a,
    longestAnimatedLengthRef: u,
    pathRef: o,
  });
}
var JH = (e, t) => {
  var n, a;
  return {
    x: (n = e.x) !== null && n !== void 0 ? n : void 0,
    y: (a = e.y) !== null && a !== void 0 ? a : void 0,
    value: e.value,
    errorVal: qt(e.payload, t),
  };
};
class eI extends w.Component {
  render() {
    var {
      hide: t,
      dot: n,
      points: a,
      className: u,
      xAxisId: o,
      yAxisId: s,
      top: f,
      left: d,
      width: h,
      height: m,
      id: p,
      needClip: g,
      zIndex: b,
    } = this.props;
    if (t) return null;
    var S = Ge("recharts-line", u),
      _ = p,
      { r: O, strokeWidth: E } = RH(n),
      C = XT(n),
      T = O * 2 + E,
      D = g ? "url(#clipPath-".concat(C ? "" : "dots-").concat(_, ")") : void 0;
    return w.createElement(
      Jr,
      { zIndex: b },
      w.createElement(
        qr,
        { className: S },
        g &&
          w.createElement(
            "defs",
            null,
            w.createElement(CH, { clipPathId: _, xAxisId: o, yAxisId: s }),
            !C &&
              w.createElement(
                "clipPath",
                { id: "clipPath-dots-".concat(_) },
                w.createElement("rect", {
                  x: d - T / 2,
                  y: f - T / 2,
                  width: h + T,
                  height: m + T,
                }),
              ),
          ),
        w.createElement(
          MH,
          {
            xAxisId: o,
            yAxisId: s,
            data: a,
            dataPointFormatter: JH,
            errorBarOffset: 0,
          },
          w.createElement(FH, { props: this.props, clipPathId: _ }),
        ),
      ),
      w.createElement(w7, {
        activeDot: this.props.activeDot,
        points: a,
        mainColor: this.props.stroke,
        itemDataKey: this.props.dataKey,
        clipPath: D,
      }),
    );
  }
}
var cM = {
  activeDot: !0,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: !1,
  dot: !0,
  fill: "#fff",
  hide: !1,
  isAnimationActive: "auto",
  label: !1,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: Gt.line,
  type: "linear",
};
function tI(e) {
  var t = cn(e, cM),
    {
      activeDot: n,
      animateNewValues: a,
      animationBegin: u,
      animationDuration: o,
      animationEasing: s,
      connectNulls: f,
      dot: d,
      hide: h,
      isAnimationActive: m,
      label: p,
      legendType: g,
      xAxisId: b,
      yAxisId: S,
      id: _,
    } = t,
    O = wg(t, qH),
    { needClip: E } = rM(b, S),
    C = bg(),
    T = Ml(),
    D = sn(),
    M = ye((ae) => kH(ae, b, S, D, _));
  if ((T !== "horizontal" && T !== "vertical") || M == null || C == null)
    return null;
  var { height: z, width: U, x: V, y: F } = C;
  return w.createElement(
    eI,
    vo({}, O, {
      id: _,
      connectNulls: f,
      dot: d,
      activeDot: n,
      animateNewValues: a,
      animationBegin: u,
      animationDuration: o,
      animationEasing: s,
      isAnimationActive: m,
      hide: h,
      label: p,
      legendType: g,
      xAxisId: b,
      yAxisId: S,
      points: M,
      layout: T,
      height: z,
      width: U,
      left: V,
      top: F,
      needClip: E,
    }),
  );
}
function nI(e) {
  var {
    layout: t,
    xAxis: n,
    yAxis: a,
    xAxisTicks: u,
    yAxisTicks: o,
    dataKey: s,
    bandSize: f,
    displayedData: d,
  } = e;
  return d
    .map((h, m) => {
      var p = qt(h, s);
      if (t === "horizontal") {
        var g = rw({ axis: n, ticks: u, bandSize: f, entry: h, index: m }),
          b = Ot(p) ? null : a.scale.map(p);
        return { x: g, y: b ?? null, value: p, payload: h };
      }
      var S = Ot(p) ? null : n.scale.map(p),
        _ = rw({ axis: a, ticks: o, bandSize: f, entry: h, index: m });
      return S == null || _ == null
        ? null
        : { x: S, y: _, value: p, payload: h };
    })
    .filter(Boolean);
}
function rI(e) {
  var t = cn(e, cM),
    n = sn();
  return w.createElement(B9, { id: t.id, type: "line" }, (a) =>
    w.createElement(
      w.Fragment,
      null,
      w.createElement(k9, { legendPayload: YH(t) }),
      w.createElement(KH, {
        dataKey: t.dataKey,
        data: t.data,
        stroke: t.stroke,
        strokeWidth: t.strokeWidth,
        fill: t.fill,
        name: t.name,
        hide: t.hide,
        unit: t.unit,
        tooltipType: t.tooltipType,
        id: a,
      }),
      w.createElement(X9, {
        type: "line",
        id: a,
        data: t.data,
        xAxisId: t.xAxisId,
        yAxisId: t.yAxisId,
        zAxisId: 0,
        dataKey: t.dataKey,
        hide: t.hide,
        isPanorama: n,
      }),
      w.createElement(tI, vo({}, t, { id: a })),
    ),
  );
}
var sM = w.memo(rI, Uf);
sM.displayName = "Line";
var aI = ["domain", "range"],
  iI = ["domain", "range"];
function uA(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = lI(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function lI(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function oA(e, t) {
  return e === t
    ? !0
    : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2
      ? e[0] === t[0] && e[1] === t[1]
      : !1;
}
function fM(e, t) {
  if (e === t) return !0;
  var { domain: n, range: a } = e,
    u = uA(e, aI),
    { domain: o, range: s } = t,
    f = uA(t, iI);
  return !oA(n, o) || !oA(a, s) ? !1 : Uf(u, f);
}
var uI = ["type"],
  oI = ["dangerouslySetInnerHTML", "ticks", "scale"],
  cI = ["id", "scale"];
function Iy() {
  return (
    (Iy = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Iy.apply(null, arguments)
  );
}
function cA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function sA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? cA(Object(n), !0).forEach(function (a) {
          sI(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : cA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function sI(e, t, n) {
  return (
    (t = fI(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function fI(e) {
  var t = dI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dI(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $y(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = vI(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function vI(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function hI(e) {
  var t = dt(),
    n = w.useRef(null),
    a = e2(),
    { type: u } = e,
    o = $y(e, uI),
    s = Hf(a, "xAxis", u),
    f = w.useMemo(() => {
      if (s != null) return sA(sA({}, o), {}, { type: s });
    }, [o, s]);
  return (
    w.useLayoutEffect(() => {
      f != null &&
        (n.current === null
          ? t(u7(f))
          : n.current !== f && t(o7({ prev: n.current, next: f })),
        (n.current = f));
    }, [f, t]),
    w.useLayoutEffect(
      () => () => {
        n.current && (t(c7(n.current)), (n.current = null));
      },
      [t],
    ),
    null
  );
}
var mI = (e) => {
    var { xAxisId: t, className: n } = e,
      a = ye(XE),
      u = sn(),
      o = "xAxis",
      s = ye((E) => tT(E, o, t, u)),
      f = ye((E) => AL(E, t)),
      d = ye((E) => DL(E, t)),
      h = ye((E) => wj(E, t));
    if (f == null || d == null || h == null) return null;
    var { dangerouslySetInnerHTML: m, ticks: p, scale: g } = e,
      b = $y(e, oI),
      { id: S, scale: _ } = h,
      O = $y(h, cI);
    return w.createElement(
      Sg,
      Iy({}, b, O, {
        x: d.x,
        y: d.y,
        width: f.width,
        height: f.height,
        className: Ge("recharts-".concat(o, " ").concat(o), n),
        viewBox: a,
        ticks: s,
        axisType: o,
        axisId: t,
      }),
    );
  },
  yI = {
    allowDataOverflow: ht.allowDataOverflow,
    allowDecimals: ht.allowDecimals,
    allowDuplicatedCategory: ht.allowDuplicatedCategory,
    angle: ht.angle,
    axisLine: Ur.axisLine,
    height: ht.height,
    hide: !1,
    includeHidden: ht.includeHidden,
    interval: ht.interval,
    label: !1,
    minTickGap: ht.minTickGap,
    mirror: ht.mirror,
    orientation: ht.orientation,
    padding: ht.padding,
    reversed: ht.reversed,
    scale: ht.scale,
    tick: ht.tick,
    tickCount: ht.tickCount,
    tickLine: Ur.tickLine,
    tickSize: Ur.tickSize,
    type: ht.type,
    niceTicks: ht.niceTicks,
    xAxisId: 0,
  },
  pI = (e) => {
    var t = cn(e, yI);
    return w.createElement(
      w.Fragment,
      null,
      w.createElement(hI, {
        allowDataOverflow: t.allowDataOverflow,
        allowDecimals: t.allowDecimals,
        allowDuplicatedCategory: t.allowDuplicatedCategory,
        angle: t.angle,
        dataKey: t.dataKey,
        domain: t.domain,
        height: t.height,
        hide: t.hide,
        id: t.xAxisId,
        includeHidden: t.includeHidden,
        interval: t.interval,
        minTickGap: t.minTickGap,
        mirror: t.mirror,
        name: t.name,
        orientation: t.orientation,
        padding: t.padding,
        reversed: t.reversed,
        scale: t.scale,
        tick: t.tick,
        tickCount: t.tickCount,
        tickFormatter: t.tickFormatter,
        ticks: t.ticks,
        type: t.type,
        unit: t.unit,
        niceTicks: t.niceTicks,
      }),
      w.createElement(mI, t),
    );
  },
  dM = w.memo(pI, fM);
dM.displayName = "XAxis";
var gI = ["type"],
  bI = ["dangerouslySetInnerHTML", "ticks", "scale"],
  xI = ["id", "scale"];
function Yy() {
  return (
    (Yy = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Yy.apply(null, arguments)
  );
}
function fA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function dA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? fA(Object(n), !0).forEach(function (a) {
          SI(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : fA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function SI(e, t, n) {
  return (
    (t = wI(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function wI(e) {
  var t = OI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OI(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ky(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = _I(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function _I(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function AI(e) {
  var t = dt(),
    n = w.useRef(null),
    a = e2(),
    { type: u } = e,
    o = Ky(e, gI),
    s = Hf(a, "yAxis", u),
    f = w.useMemo(() => {
      if (s != null) return dA(dA({}, o), {}, { type: s });
    }, [s, o]);
  return (
    w.useLayoutEffect(() => {
      f != null &&
        (n.current === null
          ? t(s7(f))
          : n.current !== f && t(f7({ prev: n.current, next: f })),
        (n.current = f));
    }, [f, t]),
    w.useLayoutEffect(
      () => () => {
        n.current && (t(d7(n.current)), (n.current = null));
      },
      [t],
    ),
    null
  );
}
function EI(e) {
  var { yAxisId: t, className: n, width: a, label: u } = e,
    o = w.useRef(null),
    s = w.useRef(null),
    f = ye(XE),
    d = sn(),
    h = dt(),
    m = "yAxis",
    p = ye((z) => zL(z, t)),
    g = ye((z) => PL(z, t)),
    b = ye((z) => tT(z, m, t, d)),
    S = ye((z) => Oj(z, t));
  if (
    (w.useLayoutEffect(() => {
      if (!(a !== "auto" || !p || gg(u) || w.isValidElement(u) || S == null)) {
        var z = o.current;
        if (z) {
          var U = z.getCalculatedWidth();
          Math.round(p.width) !== Math.round(U) && h(v7({ id: t, width: U }));
        }
      }
    }, [b, p, h, u, t, a, S]),
    p == null || g == null || S == null)
  )
    return null;
  var { dangerouslySetInnerHTML: _, ticks: O, scale: E } = e,
    C = Ky(e, bI),
    { id: T, scale: D } = S,
    M = Ky(S, xI);
  return w.createElement(
    Sg,
    Yy({}, C, M, {
      ref: o,
      labelRef: s,
      x: g.x,
      y: g.y,
      tickTextProps: a === "auto" ? { width: void 0 } : { width: a },
      width: p.width,
      height: p.height,
      className: Ge("recharts-".concat(m, " ").concat(m), n),
      viewBox: f,
      ticks: b,
      axisType: m,
      axisId: t,
    }),
  );
}
var jI = {
    allowDataOverflow: mt.allowDataOverflow,
    allowDecimals: mt.allowDecimals,
    allowDuplicatedCategory: mt.allowDuplicatedCategory,
    angle: mt.angle,
    axisLine: Ur.axisLine,
    hide: !1,
    includeHidden: mt.includeHidden,
    interval: mt.interval,
    label: !1,
    minTickGap: mt.minTickGap,
    mirror: mt.mirror,
    orientation: mt.orientation,
    padding: mt.padding,
    reversed: mt.reversed,
    scale: mt.scale,
    tick: mt.tick,
    tickCount: mt.tickCount,
    tickLine: Ur.tickLine,
    tickSize: Ur.tickSize,
    type: mt.type,
    niceTicks: mt.niceTicks,
    width: mt.width,
    yAxisId: 0,
  },
  TI = (e) => {
    var t = cn(e, jI);
    return w.createElement(
      w.Fragment,
      null,
      w.createElement(AI, {
        interval: t.interval,
        id: t.yAxisId,
        scale: t.scale,
        type: t.type,
        domain: t.domain,
        allowDataOverflow: t.allowDataOverflow,
        dataKey: t.dataKey,
        allowDuplicatedCategory: t.allowDuplicatedCategory,
        allowDecimals: t.allowDecimals,
        tickCount: t.tickCount,
        padding: t.padding,
        includeHidden: t.includeHidden,
        reversed: t.reversed,
        ticks: t.ticks,
        width: t.width,
        orientation: t.orientation,
        mirror: t.mirror,
        hide: t.hide,
        unit: t.unit,
        name: t.name,
        angle: t.angle,
        minTickGap: t.minTickGap,
        tick: t.tick,
        tickFormatter: t.tickFormatter,
        niceTicks: t.niceTicks,
      }),
      w.createElement(EI, t),
    );
  },
  vM = w.memo(TI, fM);
vM.displayName = "YAxis";
var MI = (e, t) => t,
  Og = $([MI, et, U2, At, bT, Fr, rq, Bt], sq);
function CI(e) {
  return (
    "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function"
  );
}
function _g(e) {
  var t = e.currentTarget.getBoundingClientRect(),
    n,
    a;
  if (CI(e)) {
    var u = e.currentTarget.getBBox();
    ((n = u.width > 0 ? t.width / u.width : 1),
      (a = u.height > 0 ? t.height / u.height : 1));
  } else {
    var o = e.currentTarget;
    ((n = o.offsetWidth > 0 ? t.width / o.offsetWidth : 1),
      (a = o.offsetHeight > 0 ? t.height / o.offsetHeight : 1));
  }
  var s = (f, d) => ({
    relativeX: Math.round((f - t.left) / n),
    relativeY: Math.round((d - t.top) / a),
  });
  return "touches" in e
    ? Array.from(e.touches).map((f) => s(f.clientX, f.clientY))
    : s(e.clientX, e.clientY);
}
var hM = _n("mouseClick"),
  mM = yo();
mM.startListening({
  actionCreator: hM,
  effect: (e, t) => {
    var n = e.payload,
      a = Og(t.getState(), _g(n));
    a?.activeIndex != null &&
      t.dispatch(
        ZL({
          activeIndex: a.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: a.activeCoordinate,
        }),
      );
  },
});
var Gy = _n("mouseMove"),
  yM = yo(),
  hl = null,
  ni = null,
  Qm = null;
yM.startListening({
  actionCreator: Gy,
  effect: (e, t) => {
    var n = e.payload,
      a = t.getState(),
      { throttleDelay: u, throttledEvents: o } = a.eventSettings,
      s = o === "all" || o?.includes("mousemove");
    (hl !== null && (cancelAnimationFrame(hl), (hl = null)),
      ni !== null &&
        (typeof u != "number" || !s) &&
        (clearTimeout(ni), (ni = null)),
      (Qm = _g(n)));
    var f = () => {
      var d = t.getState(),
        h = ug(d, d.tooltip.settings.shared);
      if (!Qm) {
        ((hl = null), (ni = null));
        return;
      }
      if (h === "axis") {
        var m = Og(d, Qm);
        m?.activeIndex != null
          ? t.dispatch(
              sT({
                activeIndex: m.activeIndex,
                activeDataKey: void 0,
                activeCoordinate: m.activeCoordinate,
              }),
            )
          : t.dispatch(cT());
      }
      ((hl = null), (ni = null));
    };
    if (!s) {
      f();
      return;
    }
    u === "raf"
      ? (hl = requestAnimationFrame(f))
      : typeof u == "number" && ni === null && (ni = setTimeout(f, u));
  },
});
function DI(e, t) {
  return t instanceof HTMLElement
    ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">')
    : t === window
      ? "global.window"
      : e === "children" && typeof t == "object" && t !== null
        ? "<<CHILDREN>>"
        : t;
}
var vA = {
    accessibilityLayer: !0,
    barCategoryGap: "10%",
    barGap: 4,
    barSize: void 0,
    className: void 0,
    maxBarSize: void 0,
    stackOffset: "none",
    syncId: void 0,
    syncMethod: "index",
    baseValue: void 0,
    reverseStackOrder: !1,
  },
  pM = Yt({
    name: "rootProps",
    initialState: vA,
    reducers: {
      updateOptions: (e, t) => {
        var n;
        ((e.accessibilityLayer = t.payload.accessibilityLayer),
          (e.barCategoryGap = t.payload.barCategoryGap),
          (e.barGap =
            (n = t.payload.barGap) !== null && n !== void 0 ? n : vA.barGap),
          (e.barSize = t.payload.barSize),
          (e.maxBarSize = t.payload.maxBarSize),
          (e.stackOffset = t.payload.stackOffset),
          (e.syncId = t.payload.syncId),
          (e.syncMethod = t.payload.syncMethod),
          (e.className = t.payload.className),
          (e.baseValue = t.payload.baseValue),
          (e.reverseStackOrder = t.payload.reverseStackOrder));
      },
    },
  }),
  NI = pM.reducer,
  { updateOptions: PI } = pM.actions,
  zI = null,
  kI = {
    updatePolarOptions: (e, t) =>
      e === null
        ? t.payload
        : ((e.startAngle = t.payload.startAngle),
          (e.endAngle = t.payload.endAngle),
          (e.cx = t.payload.cx),
          (e.cy = t.payload.cy),
          (e.innerRadius = t.payload.innerRadius),
          (e.outerRadius = t.payload.outerRadius),
          e),
  },
  gM = Yt({ name: "polarOptions", initialState: zI, reducers: kI }),
  { updatePolarOptions: hY } = gM.actions,
  RI = gM.reducer,
  bM = _n("keyDown"),
  xM = _n("focus"),
  SM = _n("blur"),
  td = yo(),
  ml = null,
  ri = null,
  cs = null;
td.startListening({
  actionCreator: bM,
  effect: (e, t) => {
    ((cs = e.payload), ml !== null && (cancelAnimationFrame(ml), (ml = null)));
    var n = t.getState(),
      { throttleDelay: a, throttledEvents: u } = n.eventSettings,
      o = u === "all" || u.includes("keydown");
    ri !== null &&
      (typeof a != "number" || !o) &&
      (clearTimeout(ri), (ri = null));
    var s = () => {
      try {
        var f = t.getState(),
          d = f.rootProps.accessibilityLayer !== !1;
        if (!d) return;
        var { keyboardInteraction: h } = f.tooltip,
          m = cs;
        if (m !== "ArrowRight" && m !== "ArrowLeft" && m !== "Enter") return;
        var p = og(h, Ul(f), To(f), Co(f)),
          g = p == null ? -1 : Number(p);
        if (!Number.isFinite(g) || g < 0) return;
        var b = Fr(f);
        if (m === "Enter") {
          var S = rf(f, "axis", "hover", String(h.index));
          t.dispatch(
            nf({
              active: !h.active,
              activeIndex: h.index,
              activeCoordinate: S,
            }),
          );
          return;
        }
        var _ = qL(f),
          O = _ === "left-to-right" ? 1 : -1,
          E = m === "ArrowRight" ? 1 : -1,
          C = g + E * O;
        if (b == null || C >= b.length || C < 0) return;
        var T = rf(f, "axis", "hover", String(C));
        t.dispatch(
          nf({ active: !0, activeIndex: C.toString(), activeCoordinate: T }),
        );
      } finally {
        ((ml = null), (ri = null));
      }
    };
    if (!o) {
      s();
      return;
    }
    a === "raf"
      ? (ml = requestAnimationFrame(s))
      : typeof a == "number" &&
        ri === null &&
        (s(),
        (cs = null),
        (ri = setTimeout(() => {
          cs ? s() : ((ri = null), (ml = null));
        }, a)));
  },
});
td.startListening({
  actionCreator: xM,
  effect: (e, t) => {
    var n = t.getState(),
      a = n.rootProps.accessibilityLayer !== !1;
    if (a) {
      var { keyboardInteraction: u } = n.tooltip;
      if (!u.active && u.index == null) {
        var o = "0",
          s = rf(n, "axis", "hover", String(o));
        t.dispatch(nf({ active: !0, activeIndex: o, activeCoordinate: s }));
      }
    }
  },
});
td.startListening({
  actionCreator: SM,
  effect: (e, t) => {
    var n = t.getState(),
      a = n.rootProps.accessibilityLayer !== !1;
    if (a) {
      var { keyboardInteraction: u } = n.tooltip;
      u.active &&
        t.dispatch(
          nf({
            active: !1,
            activeIndex: u.index,
            activeCoordinate: u.coordinate,
          }),
        );
    }
  },
});
function wM(e) {
  e.persist();
  var { currentTarget: t } = e;
  return new Proxy(e, {
    get: (n, a) => {
      if (a === "currentTarget") return t;
      var u = Reflect.get(n, a);
      return typeof u == "function" ? u.bind(n) : u;
    },
  });
}
var Un = _n("externalEvent"),
  OM = yo(),
  ss = new Map(),
  $u = new Map(),
  Wm = new Map();
OM.startListening({
  actionCreator: Un,
  effect: (e, t) => {
    var { handler: n, reactEvent: a } = e.payload;
    if (n != null) {
      var u = a.type,
        o = wM(a);
      Wm.set(u, { handler: n, reactEvent: o });
      var s = ss.get(u);
      s !== void 0 && (cancelAnimationFrame(s), ss.delete(u));
      var f = t.getState(),
        { throttleDelay: d, throttledEvents: h } = f.eventSettings,
        m = h,
        p = m === "all" || m?.includes(u),
        g = $u.get(u);
      g !== void 0 &&
        (typeof d != "number" || !p) &&
        (clearTimeout(g), $u.delete(u));
      var b = () => {
        var O = Wm.get(u);
        try {
          if (!O) return;
          var { handler: E, reactEvent: C } = O,
            T = t.getState(),
            D = {
              activeCoordinate: HU(T),
              activeDataKey: UU(T),
              activeIndex: co(T),
              activeLabel: wT(T),
              activeTooltipIndex: co(T),
              isTooltipActive: IU(T),
            };
          E && E(D, C);
        } finally {
          (ss.delete(u), $u.delete(u), Wm.delete(u));
        }
      };
      if (!p) {
        b();
        return;
      }
      if (d === "raf") {
        var S = requestAnimationFrame(b);
        ss.set(u, S);
      } else if (typeof d == "number") {
        if (!$u.has(u)) {
          b();
          var _ = setTimeout(b, d);
          $u.set(u, _);
        }
      } else b();
    }
  },
});
var LI = $([Rl], (e) => e.tooltipItemPayloads),
  UI = $([LI, (e, t) => t, (e, t, n) => n], (e, t, n) => {
    if (t != null) {
      var a = e.find((o) => o.settings.graphicalItemId === n);
      if (a != null) {
        var { getPosition: u } = a;
        if (u != null) return u(t);
      }
    }
  }),
  _M = _n("touchMove"),
  AM = yo(),
  ai = null,
  Aa = null,
  hA = null,
  Yu = null;
AM.startListening({
  actionCreator: _M,
  effect: (e, t) => {
    var n = e.payload;
    if (!(n.touches == null || n.touches.length === 0)) {
      Yu = wM(n);
      var a = t.getState(),
        { throttleDelay: u, throttledEvents: o } = a.eventSettings,
        s = o === "all" || o.includes("touchmove");
      (ai !== null && (cancelAnimationFrame(ai), (ai = null)),
        Aa !== null &&
          (typeof u != "number" || !s) &&
          (clearTimeout(Aa), (Aa = null)),
        (hA = Array.from(n.touches).map((d) =>
          _g({
            clientX: d.clientX,
            clientY: d.clientY,
            currentTarget: n.currentTarget,
          }),
        )));
      var f = () => {
        if (Yu != null) {
          var d = t.getState(),
            h = ug(d, d.tooltip.settings.shared);
          if (h === "axis") {
            var m,
              p = (m = hA) === null || m === void 0 ? void 0 : m[0];
            if (p == null) {
              ((ai = null), (Aa = null));
              return;
            }
            var g = Og(d, p);
            g?.activeIndex != null &&
              t.dispatch(
                sT({
                  activeIndex: g.activeIndex,
                  activeDataKey: void 0,
                  activeCoordinate: g.activeCoordinate,
                }),
              );
          } else if (h === "item") {
            var b,
              S = Yu.touches[0];
            if (document.elementFromPoint == null || S == null) return;
            var _ = document.elementFromPoint(S.clientX, S.clientY);
            if (!_ || !_.getAttribute) return;
            var O = _.getAttribute(r3),
              E =
                (b = _.getAttribute(a3)) !== null && b !== void 0 ? b : void 0,
              C = Ll(d).find((M) => M.id === E);
            if (O == null || C == null || E == null) return;
            var { dataKey: T } = C,
              D = UI(d, O, E);
            t.dispatch(
              VL({
                activeDataKey: T,
                activeIndex: O,
                activeCoordinate: D,
                activeGraphicalItemId: E,
              }),
            );
          }
          ((ai = null), (Aa = null));
        }
      };
      if (!s) {
        f();
        return;
      }
      u === "raf"
        ? (ai = requestAnimationFrame(f))
        : typeof u == "number" &&
          Aa === null &&
          (f(),
          (Yu = null),
          (Aa = setTimeout(() => {
            Yu ? f() : ((Aa = null), (ai = null));
          }, u)));
    }
  },
});
var EM = {
    throttleDelay: "raf",
    throttledEvents: [
      "mousemove",
      "touchmove",
      "pointermove",
      "scroll",
      "wheel",
    ],
  },
  jM = Yt({
    name: "eventSettings",
    initialState: EM,
    reducers: {
      setEventSettings: (e, t) => {
        (t.payload.throttleDelay != null &&
          (e.throttleDelay = t.payload.throttleDelay),
          t.payload.throttledEvents != null &&
            (e.throttledEvents = t.payload.throttledEvents));
      },
    },
  }),
  { setEventSettings: qI } = jM.actions,
  BI = jM.reducer,
  HI = hE({
    brush: _7,
    cartesianAxis: h7,
    chartData: Iq,
    errorBars: OH,
    eventSettings: BI,
    graphicalItems: K9,
    layout: Ik,
    legend: Q3,
    options: Lq,
    polarAxis: v9,
    polarOptions: RI,
    referenceElements: T7,
    renderedTicks: K7,
    rootProps: NI,
    tooltip: QL,
    zIndex: _q,
  }),
  II = function (t) {
    var n =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
    return vk({
      reducer: HI,
      preloadedState: t,
      middleware: (a) => {
        var u;
        return a({
          serializableCheck: !1,
          immutableCheck: !["commonjs", "es6", "production"].includes(
            (u = "es6") !== null && u !== void 0 ? u : "",
          ),
        }).concat([
          mM.middleware,
          yM.middleware,
          td.middleware,
          OM.middleware,
          AM.middleware,
        ]);
      },
      enhancers: (a) => {
        var u = a;
        return (
          typeof a == "function" && (u = a()),
          u.concat(ME({ type: "raf" }))
        );
      },
      devTools: { serialize: { replacer: DI }, name: "recharts-".concat(n) },
    });
  };
function $I(e) {
  var { preloadedState: t, children: n, reduxStoreName: a } = e,
    u = sn(),
    o = w.useRef(null);
  if (u) return n;
  o.current == null && (o.current = II(t, a));
  var s = rp;
  return w.createElement(hR, { context: s, store: o.current }, n);
}
function YI(e) {
  var { layout: t, margin: n } = e,
    a = dt(),
    u = sn();
  return (
    w.useEffect(() => {
      u || (a(qk(t)), a(Uk(n)));
    }, [a, u, t, n]),
    null
  );
}
var KI = w.memo(YI, Uf);
function GI(e) {
  var t = dt();
  return (
    w.useEffect(() => {
      t(PI(e));
    }, [t, e]),
    null
  );
}
var XI = (e) => {
    var t = dt();
    return (
      w.useEffect(() => {
        t(qI(e));
      }, [t, e]),
      null
    );
  },
  VI = w.memo(XI, Uf);
function mA(e) {
  var { zIndex: t, isPanorama: n } = e,
    a = w.useRef(null),
    u = dt();
  return (
    w.useLayoutEffect(
      () => (
        a.current && u(wq({ zIndex: t, element: a.current, isPanorama: n })),
        () => {
          u(Oq({ zIndex: t, isPanorama: n }));
        }
      ),
      [u, t, n],
    ),
    w.createElement("g", {
      tabIndex: -1,
      ref: a,
      className: "recharts-zIndex-layer_".concat(t),
    })
  );
}
function yA(e) {
  var { children: t, isPanorama: n } = e,
    a = ye(dq);
  if (!a || a.length === 0) return t;
  var u = a.filter((s) => s < 0),
    o = a.filter((s) => s > 0);
  return w.createElement(
    w.Fragment,
    null,
    u.map((s) => w.createElement(mA, { key: s, zIndex: s, isPanorama: n })),
    t,
    o.map((s) => w.createElement(mA, { key: s, zIndex: s, isPanorama: n })),
  );
}
var ZI = ["children"];
function QI(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = WI(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function WI(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
function sf() {
  return (
    (sf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    sf.apply(null, arguments)
  );
}
var FI = { width: "100%", height: "100%", display: "block" },
  JI = w.forwardRef((e, t) => {
    var n = FE(),
      a = JE(),
      u = s2();
    if (!dr(n) || !dr(a)) return null;
    var { children: o, otherAttributes: s, title: f, desc: d } = e,
      h,
      m;
    return (
      s != null &&
        (typeof s.tabIndex == "number"
          ? (h = s.tabIndex)
          : (h = u ? 0 : void 0),
        typeof s.role == "string"
          ? (m = s.role)
          : (m = u ? "application" : void 0)),
      w.createElement(
        CA,
        sf({}, s, {
          title: f,
          desc: d,
          role: m,
          tabIndex: h,
          width: n,
          height: a,
          style: FI,
          ref: t,
        }),
        o,
      )
    );
  }),
  e$ = (e) => {
    var { children: t } = e,
      n = ye(Pf);
    if (!n) return null;
    var { width: a, height: u, y: o, x: s } = n;
    return w.createElement(CA, { width: a, height: u, x: s, y: o }, t);
  },
  pA = w.forwardRef((e, t) => {
    var { children: n } = e,
      a = QI(e, ZI),
      u = sn();
    return u
      ? w.createElement(e$, null, w.createElement(yA, { isPanorama: !0 }, n))
      : w.createElement(
          JI,
          sf({ ref: t }, a),
          w.createElement(yA, { isPanorama: !1 }, n),
        );
  });
function t$() {
  var e = dt(),
    [t, n] = w.useState(null),
    a = ye(n3);
  return (
    w.useEffect(() => {
      if (t != null) {
        var u = t.getBoundingClientRect(),
          o = u.width / t.offsetWidth;
        ke(o) && o !== a && e(Hk(o));
      }
    }, [t, e, a]),
    n
  );
}
function gA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function n$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? gA(Object(n), !0).forEach(function (a) {
          r$(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : gA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function r$(e, t, n) {
  return (
    (t = a$(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function a$(e) {
  var t = i$(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function i$(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Da() {
  return (
    (Da = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Da.apply(null, arguments)
  );
}
var l$ = () => (Wq(), null);
function ff(e) {
  if (typeof e == "number") return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}
var u$ = w.forwardRef((e, t) => {
    var n,
      a,
      u = w.useRef(null),
      [o, s] = w.useState({
        containerWidth: ff(
          (n = e.style) === null || n === void 0 ? void 0 : n.width,
        ),
        containerHeight: ff(
          (a = e.style) === null || a === void 0 ? void 0 : a.height,
        ),
      }),
      f = w.useCallback((h, m) => {
        s((p) => {
          var g = Math.round(h),
            b = Math.round(m);
          return p.containerWidth === g && p.containerHeight === b
            ? p
            : { containerWidth: g, containerHeight: b };
        });
      }, []),
      d = w.useCallback(
        (h) => {
          if (
            (typeof t == "function" && t(h),
            h != null && typeof ResizeObserver < "u")
          ) {
            var { width: m, height: p } = h.getBoundingClientRect();
            f(m, p);
            var g = (S) => {
                var _ = S[0];
                if (_ != null) {
                  var { width: O, height: E } = _.contentRect;
                  f(O, E);
                }
              },
              b = new ResizeObserver(g);
            (b.observe(h), (u.current = b));
          }
        },
        [t, f],
      );
    return (
      w.useEffect(
        () => () => {
          var h = u.current;
          h?.disconnect();
        },
        [f],
      ),
      w.createElement(
        w.Fragment,
        null,
        w.createElement(go, {
          width: o.containerWidth,
          height: o.containerHeight,
        }),
        w.createElement("div", Da({ ref: d }, e)),
      )
    );
  }),
  o$ = w.forwardRef((e, t) => {
    var { width: n, height: a } = e,
      [u, o] = w.useState({ containerWidth: ff(n), containerHeight: ff(a) }),
      s = w.useCallback((d, h) => {
        o((m) => {
          var p = Math.round(d),
            g = Math.round(h);
          return m.containerWidth === p && m.containerHeight === g
            ? m
            : { containerWidth: p, containerHeight: g };
        });
      }, []),
      f = w.useCallback(
        (d) => {
          if ((typeof t == "function" && t(d), d != null)) {
            var { width: h, height: m } = d.getBoundingClientRect();
            s(h, m);
          }
        },
        [t, s],
      );
    return w.createElement(
      w.Fragment,
      null,
      w.createElement(go, {
        width: u.containerWidth,
        height: u.containerHeight,
      }),
      w.createElement("div", Da({ ref: f }, e)),
    );
  }),
  c$ = w.forwardRef((e, t) => {
    var { width: n, height: a } = e;
    return w.createElement(
      w.Fragment,
      null,
      w.createElement(go, { width: n, height: a }),
      w.createElement("div", Da({ ref: t }, e)),
    );
  }),
  s$ = w.forwardRef((e, t) => {
    var { width: n, height: a } = e;
    return typeof n == "string" || typeof a == "string"
      ? w.createElement(o$, Da({}, e, { ref: t }))
      : typeof n == "number" && typeof a == "number"
        ? w.createElement(c$, Da({}, e, { width: n, height: a, ref: t }))
        : w.createElement(
            w.Fragment,
            null,
            w.createElement(go, { width: n, height: a }),
            w.createElement("div", Da({ ref: t }, e)),
          );
  });
function f$(e) {
  return e ? u$ : s$;
}
var d$ = w.forwardRef((e, t) => {
    var {
        children: n,
        className: a,
        height: u,
        onClick: o,
        onContextMenu: s,
        onDoubleClick: f,
        onMouseDown: d,
        onMouseEnter: h,
        onMouseLeave: m,
        onMouseMove: p,
        onMouseUp: g,
        onTouchEnd: b,
        onTouchMove: S,
        onTouchStart: _,
        style: O,
        width: E,
        responsive: C,
        dispatchTouchEvents: T = !0,
      } = e,
      D = w.useRef(null),
      M = dt(),
      [z, U] = w.useState(null),
      [V, F] = w.useState(null),
      ae = t$(),
      ne = sp(),
      K = ne?.width > 0 ? ne.width : E,
      q = ne?.height > 0 ? ne.height : u,
      re = w.useCallback(
        (le) => {
          (ae(le),
            typeof t == "function" && t(le),
            U(le),
            F(le),
            le != null && (D.current = le));
        },
        [ae, t, U, F],
      ),
      ce = w.useCallback(
        (le) => {
          (M(hM(le)), M(Un({ handler: o, reactEvent: le })));
        },
        [M, o],
      ),
      L = w.useCallback(
        (le) => {
          (M(Gy(le)), M(Un({ handler: h, reactEvent: le })));
        },
        [M, h],
      ),
      W = w.useCallback(
        (le) => {
          (M(cT()), M(Un({ handler: m, reactEvent: le })));
        },
        [M, m],
      ),
      ue = w.useCallback(
        (le) => {
          (M(Gy(le)), M(Un({ handler: p, reactEvent: le })));
        },
        [M, p],
      ),
      oe = w.useCallback(() => {
        M(xM());
      }, [M]),
      he = w.useCallback(() => {
        M(SM());
      }, [M]),
      P = w.useCallback(
        (le) => {
          M(bM(le.key));
        },
        [M],
      ),
      G = w.useCallback(
        (le) => {
          M(Un({ handler: s, reactEvent: le }));
        },
        [M, s],
      ),
      te = w.useCallback(
        (le) => {
          M(Un({ handler: f, reactEvent: le }));
        },
        [M, f],
      ),
      ie = w.useCallback(
        (le) => {
          M(Un({ handler: d, reactEvent: le }));
        },
        [M, d],
      ),
      pe = w.useCallback(
        (le) => {
          M(Un({ handler: g, reactEvent: le }));
        },
        [M, g],
      ),
      xe = w.useCallback(
        (le) => {
          M(Un({ handler: _, reactEvent: le }));
        },
        [M, _],
      ),
      Ee = w.useCallback(
        (le) => {
          (T && M(_M(le)), M(Un({ handler: S, reactEvent: le })));
        },
        [M, T, S],
      ),
      Ue = w.useCallback(
        (le) => {
          M(Un({ handler: b, reactEvent: le }));
        },
        [M, b],
      ),
      ee = f$(C);
    return w.createElement(
      MT.Provider,
      { value: z },
      w.createElement(
        GN.Provider,
        { value: V },
        w.createElement(
          ee,
          {
            width: K ?? O?.width,
            height: q ?? O?.height,
            className: Ge("recharts-wrapper", a),
            style: n$(
              { position: "relative", cursor: "default", width: K, height: q },
              O,
            ),
            onClick: ce,
            onContextMenu: G,
            onDoubleClick: te,
            onFocus: oe,
            onBlur: he,
            onKeyDown: P,
            onMouseDown: ie,
            onMouseEnter: L,
            onMouseLeave: W,
            onMouseMove: ue,
            onMouseUp: pe,
            onTouchEnd: Ue,
            onTouchMove: Ee,
            onTouchStart: xe,
            ref: re,
          },
          w.createElement(l$, null),
          n,
        ),
      ),
    );
  }),
  v$ = [
    "width",
    "height",
    "responsive",
    "children",
    "className",
    "style",
    "compact",
    "title",
    "desc",
  ];
function h$(e, t) {
  if (e == null) return {};
  var n,
    a,
    u = m$(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      ((n = o[a]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (u[n] = e[n]));
  }
  return u;
}
function m$(e, t) {
  if (e == null) return {};
  var n = {};
  for (var a in e)
    if ({}.hasOwnProperty.call(e, a)) {
      if (t.indexOf(a) !== -1) continue;
      n[a] = e[a];
    }
  return n;
}
var y$ = w.forwardRef((e, t) => {
  var {
      width: n,
      height: a,
      responsive: u,
      children: o,
      className: s,
      style: f,
      compact: d,
      title: h,
      desc: m,
    } = e,
    p = h$(e, v$),
    g = sr(p);
  return d
    ? w.createElement(
        w.Fragment,
        null,
        w.createElement(go, { width: n, height: a }),
        w.createElement(pA, { otherAttributes: g, title: h, desc: m }, o),
      )
    : w.createElement(
        d$,
        {
          className: s,
          style: f,
          width: n,
          height: a,
          responsive: u ?? !1,
          onClick: e.onClick,
          onMouseLeave: e.onMouseLeave,
          onMouseEnter: e.onMouseEnter,
          onMouseMove: e.onMouseMove,
          onMouseDown: e.onMouseDown,
          onMouseUp: e.onMouseUp,
          onContextMenu: e.onContextMenu,
          onDoubleClick: e.onDoubleClick,
          onTouchStart: e.onTouchStart,
          onTouchMove: e.onTouchMove,
          onTouchEnd: e.onTouchEnd,
        },
        w.createElement(
          pA,
          { otherAttributes: g, title: h, desc: m, ref: t },
          w.createElement(C7, null, o),
        ),
      );
});
function Xy() {
  return (
    (Xy = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    Xy.apply(null, arguments)
  );
}
function bA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t &&
      (a = a.filter(function (u) {
        return Object.getOwnPropertyDescriptor(e, u).enumerable;
      })),
      n.push.apply(n, a));
  }
  return n;
}
function p$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? bA(Object(n), !0).forEach(function (a) {
          g$(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : bA(Object(n)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
          });
  }
  return e;
}
function g$(e, t, n) {
  return (
    (t = b$(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function b$(e) {
  var t = x$(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function x$(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var S$ = { top: 5, right: 5, bottom: 5, left: 5 },
  w$ = p$(
    {
      accessibilityLayer: !0,
      barCategoryGap: "10%",
      barGap: 4,
      layout: "horizontal",
      margin: S$,
      responsive: !1,
      reverseStackOrder: !1,
      stackOffset: "none",
      syncMethod: "index",
    },
    EM,
  ),
  O$ = w.forwardRef(function (t, n) {
    var a,
      u = cn(t.categoricalChartProps, w$),
      {
        chartName: o,
        defaultTooltipEventType: s,
        validateTooltipEventTypes: f,
        tooltipPayloadSearcher: d,
        categoricalChartProps: h,
      } = t,
      m = {
        chartName: o,
        defaultTooltipEventType: s,
        validateTooltipEventTypes: f,
        tooltipPayloadSearcher: d,
        eventEmitter: void 0,
      };
    return w.createElement(
      $I,
      {
        preloadedState: { options: m },
        reduxStoreName: (a = h.id) !== null && a !== void 0 ? a : o,
      },
      w.createElement(O7, { chartData: h.data }),
      w.createElement(KI, { layout: u.layout, margin: u.margin }),
      w.createElement(VI, {
        throttleDelay: u.throttleDelay,
        throttledEvents: u.throttledEvents,
      }),
      w.createElement(GI, {
        baseValue: u.baseValue,
        accessibilityLayer: u.accessibilityLayer,
        barCategoryGap: u.barCategoryGap,
        maxBarSize: u.maxBarSize,
        stackOffset: u.stackOffset,
        barGap: u.barGap,
        barSize: u.barSize,
        syncId: u.syncId,
        syncMethod: u.syncMethod,
        className: u.className,
        reverseStackOrder: u.reverseStackOrder,
      }),
      w.createElement(y$, Xy({}, u, { ref: n })),
    );
  }),
  _$ = ["axis"],
  A$ = w.forwardRef((e, t) =>
    w.createElement(O$, {
      chartName: "LineChart",
      defaultTooltipEventType: "axis",
      validateTooltipEventTypes: _$,
      tooltipPayloadSearcher: kq,
      categoricalChartProps: e,
      ref: t,
    }),
  );
const E$ = [
    { key: "dashboard", label: "Dashboard", icon: vf },
    { key: "members", label: "Members", icon: Jm },
    { key: "approvals", label: "Approvals", icon: _A },
    { key: "compliance", label: "Missing Days", icon: EA },
    { key: "reports", label: "Reports", icon: bl },
    { key: "settings", label: "Settings", icon: hf },
  ],
  j$ = [
    { key: "dashboard", label: "Dashboard", icon: vf },
    { key: "workspace", label: "Workspace", icon: df },
    { key: "history", label: "History", icon: OA },
    { key: "requests", label: "Requests", icon: ys },
    { key: "settings", label: "Settings", icon: hf },
  ];
async function St(e, t = {}) {
  const n = await fetch(e, {
      credentials: "same-origin",
      headers: {
        ...(t.body ? { "Content-Type": "application/json" } : {}),
        ...(t.headers || {}),
      },
      ...t,
    }),
    u = (n.headers.get("content-type") || "").includes("application/json")
      ? await n.json()
      : null;
  if (!n.ok)
    throw new Error(u?.detail || u?.message || `Request failed: ${n.status}`);
  return u;
}
function TM(e) {
  return e === "lead" ? E$ : j$;
}
function xA(e) {
  const t = window.location.hash.replace(/^#\/?/, ""),
    n = TM(e);
  return n.find((a) => a.key === t)?.key || n[0].key;
}
function T$(e) {
  const [t, n] = w.useState(xA(e));
  return (
    w.useEffect(() => {
      const u = () => n(xA(e));
      return (
        window.addEventListener("hashchange", u),
        u(),
        () => window.removeEventListener("hashchange", u)
      );
    }, [e]),
    [
      t,
      (u) => {
        ((window.location.hash = u), n(u));
      },
    ]
  );
}
function MM() {
  const [e, t] = w.useState(new Date());
  return (
    w.useEffect(() => {
      const n = window.setInterval(() => t(new Date()), 1e3);
      return () => window.clearInterval(n);
    }, []),
    e
  );
}
function M$() {
  const [e, t] = w.useState([]);
  return {
    toasts: e,
    pushToast: (a, u, o) => {
      const s = `${Date.now()}-${Math.random()}`;
      (t((f) => [...f, { id: s, type: a, title: u, message: o }]),
        window.setTimeout(() => {
          t((f) => f.filter((d) => d.id !== s));
        }, 4200));
    },
    removeToast: (a) => t((u) => u.filter((o) => o.id !== a)),
  };
}
function Ag(e) {
  return new Intl.DateTimeFormat(void 0, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(e);
}
function C$(e) {
  return new Intl.DateTimeFormat(void 0, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(e);
}
function D$(e) {
  return new Intl.DateTimeFormat(void 0, {
    month: "short",
    day: "numeric",
  }).format(new Date(e));
}
function N$(e) {
  return new Date(e).toLocaleString();
}
function Fm() {
  return new Date().getHours() < 12 ? "AM" : "PM";
}
function Eg() {
  return j.jsx("div", {
    className: "loading-screen",
    children: j.jsxs("div", {
      className: "loading-card",
      children: [
        j.jsx("div", { className: "loading-spinner" }),
        j.jsx("h2", { children: "Loading workspace" }),
        j.jsx("p", {
          children: "Preparing the latest team data and dashboard state.",
        }),
      ],
    }),
  });
}
function P$({ toasts: e, removeToast: t }) {
  return j.jsx("div", {
    className: "toast-stack",
    children: e.map((n) =>
      j.jsxs(
        "div",
        {
          className: `toast toast-${n.type}`,
          children: [
            j.jsxs("div", {
              className: "toast-copy-wrap",
              children: [
                j.jsx("strong", { children: n.title }),
                j.jsx("span", { children: n.message }),
              ],
            }),
            j.jsx("button", {
              className: "ghost-button",
              onClick: () => t(n.id),
              children: "Close",
            }),
          ],
        },
        n.id,
      ),
    ),
  });
}
function z$({
  session: e,
  view: t,
  setView: n,
  onLogout: a,
  open: u,
  setOpen: o,
}) {
  const s = TM(e.role);
  return j.jsxs("aside", {
    className: `sidebar ${u ? "sidebar-open" : ""}`,
    children: [
      j.jsxs("div", {
        className: "sidebar-brand",
        children: [
          j.jsx("div", { className: "brand-pill", children: "IN" }),
          j.jsxs("div", {
            children: [
              j.jsx("div", { className: "brand-title", children: e.app_title }),
              j.jsx("div", {
                className: "brand-subtitle",
                children: "Daily tracker workspace",
              }),
            ],
          }),
        ],
      }),
      j.jsxs("div", {
        className: "sidebar-user",
        children: [
          j.jsx("div", {
            className: "sidebar-user-role",
            children: e.role === "lead" ? "Team Lead" : "Team Member",
          }),
          j.jsxs("div", {
            className: "sidebar-user-name",
            children: [e.user.first_name, " ", e.user.last_name || ""],
          }),
          j.jsx("div", {
            className: "sidebar-user-email",
            children: e.user.email,
          }),
        ],
      }),
      j.jsx("nav", {
        className: "sidebar-nav",
        children: s.map((f) => {
          const d = f.icon;
          return j.jsxs(
            "button",
            {
              className: `sidebar-link ${t === f.key ? "sidebar-link-active" : ""}`,
              onClick: () => {
                (n(f.key), window.innerWidth < 1100 && o(!1));
              },
              children: [
                j.jsx(d, { size: 18 }),
                j.jsx("span", { children: f.label }),
              ],
            },
            f.key,
          );
        }),
      }),
      j.jsxs("button", {
        className: "sidebar-logout",
        onClick: a,
        children: [
          j.jsx(MN, { size: 16 }),
          j.jsx("span", { children: "Logout" }),
        ],
      }),
    ],
  });
}
function CM({ title: e, copy: t, onMenuToggle: n }) {
  return j.jsx("header", {
    className: "topbar",
    children: j.jsxs("div", {
      className: "topbar-main",
      children: [
        j.jsx("button", {
          className: "menu-button",
          onClick: n,
          "aria-label": "Toggle sidebar",
          children: j.jsx(DN, { size: 18 }),
        }),
        j.jsxs("div", {
          children: [j.jsx("h1", { children: e }), j.jsx("p", { children: t })],
        }),
      ],
    }),
  });
}
function DM({ title: e, copy: t, meta: n }) {
  return j.jsxs("section", {
    className: "hero-card",
    children: [
      j.jsxs("div", {
        children: [
          j.jsx("div", {
            className: "hero-kicker",
            children: "Operational workspace",
          }),
          j.jsx("h2", { children: e }),
          j.jsx("p", { children: t }),
        ],
      }),
      j.jsx("div", {
        className: "hero-meta-grid",
        children: n.map((a) =>
          j.jsxs(
            "div",
            {
              className: "hero-meta-card",
              children: [
                j.jsx("span", { children: a.label }),
                j.jsx("strong", { children: a.value }),
              ],
            },
            a.label,
          ),
        ),
      }),
    ],
  });
}
function Lt({ icon: e, title: t, copy: n, children: a, tag: u }) {
  return j.jsxs("section", {
    className: "section-card",
    children: [
      j.jsxs("div", {
        className: "section-head",
        children: [
          j.jsxs("div", {
            className: "section-head-main",
            children: [
              j.jsx("div", {
                className: "section-icon",
                children: j.jsx(e, { size: 18 }),
              }),
              j.jsxs("div", {
                children: [
                  j.jsx("h3", { children: t }),
                  j.jsx("p", { children: n }),
                ],
              }),
            ],
          }),
          u ? j.jsx("span", { className: "tag-pill", children: u }) : null,
        ],
      }),
      a,
    ],
  });
}
function k$({ items: e }) {
  return j.jsx("div", {
    className: "stat-grid",
    children: e.map((t) => {
      const n = t.icon;
      return j.jsxs(
        "div",
        {
          className: "stat-card",
          children: [
            j.jsx("div", {
              className: "stat-icon",
              children: j.jsx(n, { size: 18 }),
            }),
            j.jsxs("div", {
              children: [
                j.jsx("span", { children: t.label }),
                j.jsx("strong", { children: t.value }),
                j.jsx("p", { children: t.note }),
              ],
            }),
          ],
        },
        t.label,
      );
    }),
  });
}
function R$({ now: e }) {
  const t = e.getFullYear(),
    n = e.getMonth(),
    a = e.getDate(),
    u = new Date(t, n, 1).getDay(),
    o = new Date(t, n + 1, 0).getDate(),
    s = [];
  for (let f = 0; f < u; f += 1) s.push(null);
  for (let f = 1; f <= o; f += 1) s.push(f);
  for (; s.length % 7 !== 0; ) s.push(null);
  return j.jsxs("div", {
    className: "calendar-card",
    children: [
      j.jsxs("div", {
        className: "calendar-head",
        children: [
          j.jsx("strong", {
            children: new Intl.DateTimeFormat(void 0, {
              month: "long",
              year: "numeric",
            }).format(e),
          }),
          j.jsx("span", { children: Ag(e) }),
        ],
      }),
      j.jsx("div", {
        className: "calendar-grid calendar-grid-labels",
        children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((f) =>
          j.jsx("div", { className: "calendar-label", children: f }, f),
        ),
      }),
      j.jsx("div", {
        className: "calendar-grid",
        children: s.map((f, d) =>
          j.jsx(
            "div",
            {
              className: `calendar-cell ${f === a ? "calendar-today" : ""} ${f ? "calendar-filled" : "calendar-empty"}`,
              children: f || "",
            },
            `${f ?? "blank"}-${d}`,
          ),
        ),
      }),
    ],
  });
}
function L$({ trend: e }) {
  return j.jsx("div", {
    className: "chart-shell",
    children: j.jsx(N3, {
      width: "100%",
      height: 260,
      children: j.jsxs(A$, {
        data: e,
        children: [
          j.jsx(tM, {
            stroke: "#dbe4ef",
            strokeDasharray: "3 3",
            vertical: !1,
          }),
          j.jsx(dM, {
            dataKey: "date",
            tickFormatter: D$,
            stroke: "#778399",
            tickLine: !1,
            axisLine: !1,
          }),
          j.jsx(vM, {
            allowDecimals: !1,
            stroke: "#778399",
            tickLine: !1,
            axisLine: !1,
          }),
          j.jsx(iB, {
            formatter: (t) => [`${t} entries`, "Entries"],
            labelFormatter: (t) => Ag(new Date(t)),
            contentStyle: {
              borderRadius: "16px",
              border: "1px solid #dbe4ef",
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
            },
          }),
          j.jsx(sM, {
            type: "monotone",
            dataKey: "count",
            stroke: "#2563eb",
            strokeWidth: 3,
            dot: { r: 4, fill: "#2563eb" },
            activeDot: { r: 6 },
          }),
        ],
      }),
    }),
  });
}
function NM({ title: e, copy: t, now: n, stats: a, trend: u, insights: o }) {
  return j.jsxs("div", {
    className: "page-stack",
    children: [
      j.jsx(Lt, {
        icon: vf,
        title: e,
        copy: t,
        children: j.jsxs("div", {
          className: "dashboard-grid",
          children: [
            j.jsxs("div", {
              className: "clock-card",
              children: [
                j.jsxs("div", {
                  className: "clock-row",
                  children: [
                    j.jsx(AA, { size: 18 }),
                    j.jsx("span", { children: "Current time" }),
                  ],
                }),
                j.jsx("strong", { children: C$(n) }),
                j.jsx("p", { children: Ag(n) }),
              ],
            }),
            j.jsx(R$, { now: n }),
          ],
        }),
      }),
      j.jsx(k$, { items: a }),
      j.jsx(Lt, {
        icon: bl,
        title: "Entry trend",
        copy: "A simple line chart showing tracked entries over the last seven days.",
        children: j.jsx(L$, {
          trend: u.map((s) => ({ ...s, count: s.count || 0 })),
        }),
      }),
      j.jsx("div", {
        className: "insight-grid",
        children: o.map((s) =>
          j.jsxs(
            "div",
            {
              className: "insight-card",
              children: [
                j.jsx("strong", { children: s.title }),
                j.jsx("p", { children: s.copy }),
              ],
            },
            s.title,
          ),
        ),
      }),
    ],
  });
}
function Zu({ columns: e, rows: t, emptyMessage: n }) {
  return t.length
    ? j.jsx("div", {
        className: "table-wrap",
        children: j.jsxs("table", {
          className: "data-table",
          children: [
            j.jsx("thead", {
              children: j.jsx("tr", {
                children: e.map((a) =>
                  j.jsx("th", { children: a.label }, a.key),
                ),
              }),
            }),
            j.jsx("tbody", {
              children: t.map((a, u) =>
                j.jsx(
                  "tr",
                  {
                    children: e.map((o) =>
                      j.jsx("td", { children: o.render(a) }, o.key),
                    ),
                  },
                  a.id || u,
                ),
              ),
            }),
          ],
        }),
      })
    : j.jsx("div", { className: "empty-box", children: n });
}
function Ne({ label: e, children: t }) {
  return j.jsxs("label", {
    className: "form-field",
    children: [j.jsx("span", { children: e }), t],
  });
}
function U$({
  data: e,
  formState: t,
  setFormState: n,
  working: a,
  onSubmit: u,
  onReset: o,
}) {
  return j.jsxs(Lt, {
    icon: df,
    title: e.is_requesting_missing_day
      ? "Missed day request"
      : e.is_editing
        ? "End-of-day update"
        : "Morning entry",
    copy: "The form only shows the fields needed for the current workflow step.",
    tag: t.date,
    children: [
      e.is_editing
        ? j.jsxs("div", {
            className: "summary-box",
            children: [
              j.jsx("strong", { children: "Morning entry summary" }),
              j.jsxs("p", { children: ["Plan: ", t.plan || "-"] }),
              j.jsxs("p", { children: ["ETA: ", t.eta || "-"] }),
              j.jsxs("p", { children: ["Client: ", t.client_name || "-"] }),
            ],
          })
        : null,
      j.jsxs("div", {
        className: "form-grid",
        children: [
          e.is_editing
            ? null
            : j.jsxs(j.Fragment, {
                children: [
                  j.jsx(Ne, {
                    label: "Date",
                    children: j.jsx("input", {
                      className: "field-input",
                      type: "date",
                      value: t.date,
                      onChange: (s) => n({ ...t, date: s.target.value }),
                    }),
                  }),
                  j.jsx(Ne, {
                    label: "ETA",
                    children: j.jsx("input", {
                      className: "field-input",
                      value: t.eta,
                      onChange: (s) => n({ ...t, eta: s.target.value }),
                    }),
                  }),
                  j.jsx(Ne, {
                    label: "Client",
                    children: j.jsx("input", {
                      className: "field-input",
                      value: t.client_name,
                      onChange: (s) => n({ ...t, client_name: s.target.value }),
                    }),
                  }),
                  j.jsx(Ne, {
                    label: "Morning plan",
                    children: j.jsx("textarea", {
                      className: "field-input field-textarea",
                      value: t.plan,
                      onChange: (s) => n({ ...t, plan: s.target.value }),
                    }),
                  }),
                  j.jsx(Ne, {
                    label: "Category",
                    children: j.jsxs("div", {
                      className: "checkbox-row",
                      children: [
                        j.jsxs("label", {
                          className: "checkbox-pill",
                          children: [
                            j.jsx("input", {
                              type: "checkbox",
                              checked: !!t.is_corporate,
                              onChange: (s) =>
                                n({ ...t, is_corporate: s.target.checked }),
                            }),
                            j.jsx("span", { children: "Corporate" }),
                          ],
                        }),
                        j.jsxs("label", {
                          className: "checkbox-pill",
                          children: [
                            j.jsx("input", {
                              type: "checkbox",
                              checked: !!t.is_university,
                              onChange: (s) =>
                                n({ ...t, is_university: s.target.checked }),
                            }),
                            j.jsx("span", { children: "University" }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
          e.is_editing || e.is_requesting_missing_day
            ? j.jsxs(j.Fragment, {
                children: [
                  j.jsx(Ne, {
                    label: "Extra work",
                    children: j.jsx("textarea", {
                      className: "field-input field-textarea",
                      value: t.extra_work,
                      onChange: (s) => n({ ...t, extra_work: s.target.value }),
                    }),
                  }),
                  j.jsx(Ne, {
                    label: "Challenges",
                    children: j.jsx("textarea", {
                      className: "field-input field-textarea",
                      value: t.challenges,
                      onChange: (s) => n({ ...t, challenges: s.target.value }),
                    }),
                  }),
                  j.jsx(Ne, {
                    label: "Proof of work",
                    children: j.jsx("textarea", {
                      className: "field-input field-textarea",
                      value: t.proof_of_work,
                      onChange: (s) =>
                        n({ ...t, proof_of_work: s.target.value }),
                    }),
                  }),
                ],
              })
            : null,
          e.is_requesting_missing_day || (e.is_editing && t.date < e.today)
            ? j.jsx(Ne, {
                label: "Reason for late submission",
                children: j.jsx("textarea", {
                  className: "field-input field-textarea",
                  value: t.request_reason,
                  onChange: (s) => n({ ...t, request_reason: s.target.value }),
                }),
              })
            : null,
        ],
      }),
      j.jsxs("div", {
        className: "action-row",
        children: [
          j.jsx("button", {
            className: "primary-button",
            disabled: a,
            onClick: u,
            children: e.is_requesting_missing_day
              ? "Submit request"
              : e.is_editing
                ? "Save end-of-day update"
                : "Save morning entry",
          }),
          e.is_editing || e.is_requesting_missing_day
            ? j.jsx("button", {
                className: "secondary-button",
                onClick: o,
                children: "Back to new entry",
              })
            : null,
        ],
      }),
    ],
  });
}
function q$({
  session: e,
  pushToast: t,
  view: n,
  setView: a,
  onMenuToggle: u,
}) {
  const o = MM(),
    [s, f] = w.useState(null),
    [d, h] = w.useState(!0),
    [m, p] = w.useState(!1),
    [g, b] = w.useState({ member_name: "", update_date: "" }),
    [S, _] = w.useState({ team_name: e.user.team_name || "" }),
    [O, E] = w.useState({ first_name: "", last_name: "", email: "" }),
    [C, T] = w.useState({
      current_password: "",
      new_password: "",
      confirm_password: "",
    }),
    [D, M] = w.useState(null),
    [z, U] = w.useState(!1),
    V = async (q = g) => {
      h(!0);
      try {
        const re = new URLSearchParams();
        (q.member_name && re.set("member_name", q.member_name),
          q.update_date && re.set("update_date", q.update_date));
        const ce = await St(`/api/admin/dashboard?${re.toString()}`);
        (f(ce), b(ce.filters || q), _({ team_name: ce.user.team_name || "" }));
      } catch (re) {
        t("error", "Dashboard error", re.message);
      } finally {
        h(!1);
      }
    };
  w.useEffect(() => {
    V();
  }, []);
  const F = async (q, re, ce) => {
      p(!0);
      try {
        const L = await q();
        (t("success", re, L.message || "Done."),
          ce && (await ce(L)),
          await V());
      } catch (L) {
        t("error", "Action failed", L.message);
      } finally {
        p(!1);
      }
    },
    ae = async (q) => {
      a("reports");
      try {
        M(await St(`/api/admin/reports/${q}`));
      } catch (re) {
        t("error", "Unable to open report", re.message);
      }
    };
  if (d && !s) return j.jsx(Eg, {});
  const ne = [
    {
      icon: ys,
      label: "Pending requests",
      value: s.pending_requests.length,
      note: "Awaiting lead action",
    },
    {
      icon: bl,
      label: "Total entries",
      value: s.total_entries,
      note: "All team updates recorded so far",
    },
    {
      icon: Jm,
      label: "Team members",
      value: s.team_members.length,
      note: "Accounts managed by this lead",
    },
  ];
  let K = null;
  return (
    n === "dashboard"
      ? (K = j.jsx(NM, {
          title: "Team insights",
          copy: "A calm dashboard view focused on pending requests, total entries, current time, calendar, and entry movement.",
          now: o,
          stats: ne,
          trend: s.entry_trend,
          insights: [
            {
              title: "Pending approvals",
              copy: s.pending_requests.length
                ? `${s.pending_requests.length} requests are ready for review.`
                : "There are no approval requests waiting now.",
            },
            {
              title: "Reporting status",
              copy: s.reports.length
                ? `${s.reports.length} finalized reports are available to reopen.`
                : "No finalized weekly reports yet.",
            },
            {
              title: "Missing day watch",
              copy: s.missing_days.length
                ? `${s.missing_days.length} missing-day issues need attention.`
                : "No recent missing-day alerts.",
            },
          ],
        }))
      : n === "members"
        ? (K = j.jsx(Lt, {
            icon: Jm,
            title: "Team members",
            copy: "Member accounts, status, and quick password controls.",
            tag: `${s.team_members.length} members`,
            children: j.jsx("div", {
              className: "tile-grid",
              children: s.team_members.map((q) =>
                j.jsxs(
                  "div",
                  {
                    className: "member-tile",
                    children: [
                      j.jsxs("div", {
                        className: "tile-head",
                        children: [
                          j.jsxs("div", {
                            children: [
                              j.jsxs("strong", {
                                children: [
                                  q.first_name,
                                  " ",
                                  q.last_name || "",
                                ],
                              }),
                              j.jsx("span", { children: q.email }),
                            ],
                          }),
                          j.jsx("span", {
                            className: `status-chip ${q.is_active ? "status-success" : "status-danger"}`,
                            children: q.is_active ? "Active" : "Disabled",
                          }),
                        ],
                      }),
                      j.jsxs("div", {
                        className: "action-row",
                        children: [
                          j.jsx("button", {
                            className: "secondary-button",
                            onClick: () =>
                              F(
                                () =>
                                  St(
                                    `/api/admin/users/${q.id}/reset-password`,
                                    { method: "POST" },
                                  ),
                                "Password reset",
                              ),
                            children: "Reset password",
                          }),
                          j.jsx("button", {
                            className: q.is_active
                              ? "danger-button"
                              : "primary-button",
                            onClick: () =>
                              F(
                                () =>
                                  St(`/api/admin/users/${q.id}/toggle`, {
                                    method: "POST",
                                  }),
                                "Member updated",
                              ),
                            children: q.is_active ? "Disable" : "Enable",
                          }),
                        ],
                      }),
                    ],
                  },
                  q.id,
                ),
              ),
            }),
          }))
        : n === "approvals"
          ? (K = j.jsx(Lt, {
              icon: _A,
              title: "Pending approvals",
              copy: "Late submissions and missed-day requests waiting for review.",
              tag: `${s.pending_requests.length} pending`,
              children: j.jsx(Zu, {
                emptyMessage: "No approval requests are waiting right now.",
                rows: s.pending_requests,
                columns: [
                  { key: "date", label: "Date", render: (q) => q.date },
                  {
                    key: "member",
                    label: "Member",
                    render: (q) =>
                      j.jsxs("div", {
                        className: "table-cell-stack",
                        children: [
                          j.jsx("strong", { children: q.member_name }),
                          j.jsx("span", { children: q.email }),
                        ],
                      }),
                  },
                  {
                    key: "type",
                    label: "Type",
                    render: (q) =>
                      j.jsx("span", {
                        className: "status-chip status-info",
                        children: q.request_type.replaceAll("_", " "),
                      }),
                  },
                  { key: "reason", label: "Reason", render: (q) => q.reason },
                  {
                    key: "actions",
                    label: "Actions",
                    render: (q) =>
                      j.jsxs("div", {
                        className: "action-row",
                        children: [
                          j.jsx("button", {
                            className: "primary-button",
                            onClick: () =>
                              F(
                                () =>
                                  St(`/api/admin/requests/${q.id}/approve`, {
                                    method: "POST",
                                  }),
                                "Request approved",
                              ),
                            children: "Approve",
                          }),
                          j.jsx("button", {
                            className: "secondary-button",
                            onClick: () =>
                              F(
                                () =>
                                  St(`/api/admin/requests/${q.id}/reject`, {
                                    method: "POST",
                                  }),
                                "Request rejected",
                              ),
                            children: "Reject",
                          }),
                        ],
                      }),
                  },
                ],
              }),
            }))
          : n === "compliance"
            ? (K = j.jsx(Lt, {
                icon: EA,
                title: "Missing days",
                copy: "Recent workday-level compliance issues across the team.",
                tag: `${s.missing_days.length} flagged`,
                children: j.jsx(Zu, {
                  emptyMessage: "No missing-day issues found.",
                  rows: s.missing_days,
                  columns: [
                    { key: "date", label: "Date", render: (q) => q.date },
                    {
                      key: "member",
                      label: "Member",
                      render: (q) => q.member_name,
                    },
                    { key: "email", label: "Email", render: (q) => q.email },
                    {
                      key: "actions",
                      label: "Actions",
                      render: (q) =>
                        j.jsxs("div", {
                          className: "action-row",
                          children: [
                            j.jsx("button", {
                              className: "secondary-button",
                              onClick: () =>
                                F(
                                  () =>
                                    St("/api/admin/missing-days/leave", {
                                      method: "POST",
                                      body: JSON.stringify({
                                        user_id: q.member_id,
                                        missing_date: q.date,
                                      }),
                                    }),
                                  "Leave marked",
                                ),
                              children: "Mark leave",
                            }),
                            j.jsx("button", {
                              className: "primary-button",
                              onClick: () =>
                                F(
                                  () =>
                                    St("/api/admin/missing-days/warning", {
                                      method: "POST",
                                      body: JSON.stringify({
                                        user_id: q.member_id,
                                        missing_date: q.date,
                                      }),
                                    }),
                                  "Warning sent",
                                ),
                              children: "Raise warning",
                            }),
                          ],
                        }),
                    },
                  ],
                }),
              }))
            : n === "reports"
              ? (K = j.jsxs("div", {
                  className: "page-stack",
                  children: [
                    j.jsxs(Lt, {
                      icon: bl,
                      title: "Generate weekly report",
                      copy: "Create a new draft report from the selected weekly range.",
                      children: [
                        j.jsxs("div", {
                          className: "inline-form-row",
                          children: [
                            j.jsx(Ne, {
                              label: "Week start",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "date",
                                value: D?.week_start || s.week_start,
                                onChange: (q) =>
                                  M((re) => ({
                                    ...(re || {}),
                                    week_start: q.target.value,
                                    week_end: re?.week_end || s.week_end,
                                  })),
                              }),
                            }),
                            j.jsx(Ne, {
                              label: "Week end",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "date",
                                value: D?.week_end || s.week_end,
                                onChange: (q) =>
                                  M((re) => ({
                                    ...(re || {}),
                                    week_start: re?.week_start || s.week_start,
                                    week_end: q.target.value,
                                  })),
                              }),
                            }),
                          ],
                        }),
                        j.jsx("div", {
                          className: "action-row",
                          children: j.jsx("button", {
                            className: "primary-button",
                            disabled: z,
                            onClick: async () => {
                              U(!0);
                              try {
                                const q = await St(
                                  "/api/admin/reports/generate",
                                  {
                                    method: "POST",
                                    body: JSON.stringify({
                                      week_start: D?.week_start || s.week_start,
                                      week_end: D?.week_end || s.week_end,
                                    }),
                                  },
                                );
                                (t("success", "Report generated", q.message),
                                  await V(),
                                  await ae(q.report_id));
                              } catch (q) {
                                t(
                                  "error",
                                  "Report generation failed",
                                  q.message,
                                );
                              } finally {
                                U(!1);
                              }
                            },
                            children: z ? "Generating..." : "Generate report",
                          }),
                        }),
                      ],
                    }),
                    j.jsxs(Lt, {
                      icon: AN,
                      title: "Daily updates",
                      copy: "Filter the submitted updates before reporting.",
                      children: [
                        j.jsxs("div", {
                          className: "inline-form-row",
                          children: [
                            j.jsx(Ne, {
                              label: "Member or email",
                              children: j.jsx("input", {
                                className: "field-input",
                                value: g.member_name,
                                onChange: (q) =>
                                  b({ ...g, member_name: q.target.value }),
                              }),
                            }),
                            j.jsx(Ne, {
                              label: "Date",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "date",
                                value: g.update_date,
                                onChange: (q) =>
                                  b({ ...g, update_date: q.target.value }),
                              }),
                            }),
                          ],
                        }),
                        j.jsx("div", {
                          className: "action-row",
                          children: j.jsx("button", {
                            className: "secondary-button",
                            onClick: () => V(g),
                            children: "Apply filter",
                          }),
                        }),
                        j.jsx(Zu, {
                          emptyMessage:
                            "No updates matched the current filter.",
                          rows: s.updates,
                          columns: [
                            {
                              key: "date",
                              label: "Date",
                              render: (q) => q.date,
                            },
                            {
                              key: "member",
                              label: "Member",
                              render: (q) =>
                                j.jsxs("div", {
                                  className: "table-cell-stack",
                                  children: [
                                    j.jsx("strong", {
                                      children: q.member_name,
                                    }),
                                    j.jsx("span", { children: q.email }),
                                  ],
                                }),
                            },
                            {
                              key: "plan",
                              label: "Plan",
                              render: (q) => q.plan || "-",
                            },
                            {
                              key: "eta",
                              label: "ETA",
                              render: (q) => q.eta || "-",
                            },
                            {
                              key: "client",
                              label: "Client",
                              render: (q) => q.client_name || "-",
                            },
                            {
                              key: "proof",
                              label: "Proof",
                              render: (q) => q.proof_of_work || "-",
                            },
                          ],
                        }),
                      ],
                    }),
                    j.jsx(Lt, {
                      icon: df,
                      title: "Saved reports",
                      copy: "Open an existing report or download the finalized PDF.",
                      children: j.jsx("div", {
                        className: "tile-grid",
                        children: s.reports.map((q) =>
                          j.jsxs(
                            "div",
                            {
                              className: "member-tile",
                              children: [
                                j.jsx("div", {
                                  className: "tile-head",
                                  children: j.jsxs("div", {
                                    children: [
                                      j.jsxs("strong", {
                                        children: [
                                          q.week_start,
                                          " to ",
                                          q.week_end,
                                        ],
                                      }),
                                      j.jsx("span", {
                                        children: N$(q.generated_at),
                                      }),
                                    ],
                                  }),
                                }),
                                j.jsxs("div", {
                                  className: "action-row",
                                  children: [
                                    j.jsx("button", {
                                      className: "primary-button",
                                      onClick: () => ae(q.id),
                                      children: "Open",
                                    }),
                                    j.jsx("a", {
                                      className: "secondary-link",
                                      href: `/admin/reports/${q.id}/download`,
                                      children: "Download PDF",
                                    }),
                                  ],
                                }),
                              ],
                            },
                            q.id,
                          ),
                        ),
                      }),
                    }),
                    D?.id
                      ? j.jsxs(Lt, {
                          icon: bl,
                          title: "Report editor",
                          copy: "Refine the AI draft before finalizing it.",
                          tag: `${D.week_start} to ${D.week_end}`,
                          children: [
                            j.jsxs("div", {
                              className: "form-grid",
                              children: [
                                j.jsx(Ne, {
                                  label: "Team summary",
                                  children: j.jsx("textarea", {
                                    className: "field-input field-textarea",
                                    value: D.team_summary || "",
                                    onChange: (q) =>
                                      M({ ...D, team_summary: q.target.value }),
                                  }),
                                }),
                                D.rows?.map((q, re) =>
                                  j.jsxs(
                                    "div",
                                    {
                                      className: "report-row-card",
                                      children: [
                                        j.jsx(Ne, {
                                          label: "Member",
                                          children: j.jsx("input", {
                                            className: "field-input",
                                            value: q.member_name || "",
                                            onChange: (ce) => {
                                              const L = D.rows.slice();
                                              ((L[re] = {
                                                ...q,
                                                member_name: ce.target.value,
                                              }),
                                                M({ ...D, rows: L }));
                                            },
                                          }),
                                        }),
                                        j.jsx(Ne, {
                                          label: "Activity",
                                          children: j.jsx("textarea", {
                                            className:
                                              "field-input field-textarea",
                                            value: q.activity_summary || "",
                                            onChange: (ce) => {
                                              const L = D.rows.slice();
                                              ((L[re] = {
                                                ...q,
                                                activity_summary:
                                                  ce.target.value,
                                              }),
                                                M({ ...D, rows: L }));
                                            },
                                          }),
                                        }),
                                        j.jsx(Ne, {
                                          label: "Extra work",
                                          children: j.jsx("textarea", {
                                            className:
                                              "field-input field-textarea",
                                            value: q.extra_work_summary || "",
                                            onChange: (ce) => {
                                              const L = D.rows.slice();
                                              ((L[re] = {
                                                ...q,
                                                extra_work_summary:
                                                  ce.target.value,
                                              }),
                                                M({ ...D, rows: L }));
                                            },
                                          }),
                                        }),
                                        j.jsx(Ne, {
                                          label: "Challenges",
                                          children: j.jsx("textarea", {
                                            className:
                                              "field-input field-textarea",
                                            value: q.challenges_summary || "",
                                            onChange: (ce) => {
                                              const L = D.rows.slice();
                                              ((L[re] = {
                                                ...q,
                                                challenges_summary:
                                                  ce.target.value,
                                              }),
                                                M({ ...D, rows: L }));
                                            },
                                          }),
                                        }),
                                        j.jsx(Ne, {
                                          label: "Manager notes",
                                          children: j.jsx("textarea", {
                                            className:
                                              "field-input field-textarea",
                                            value: q.manager_notes || "",
                                            onChange: (ce) => {
                                              const L = D.rows.slice();
                                              ((L[re] = {
                                                ...q,
                                                manager_notes: ce.target.value,
                                              }),
                                                M({ ...D, rows: L }));
                                            },
                                          }),
                                        }),
                                        j.jsx(Ne, {
                                          label: "Next week action plan",
                                          children: j.jsx("textarea", {
                                            className:
                                              "field-input field-textarea",
                                            value:
                                              q.next_week_action_plan || "",
                                            onChange: (ce) => {
                                              const L = D.rows.slice();
                                              ((L[re] = {
                                                ...q,
                                                next_week_action_plan:
                                                  ce.target.value,
                                              }),
                                                M({ ...D, rows: L }));
                                            },
                                          }),
                                        }),
                                      ],
                                    },
                                    `${q.member_name}-${re}`,
                                  ),
                                ),
                                j.jsx(Ne, {
                                  label: "Overall challenges",
                                  children: j.jsx("textarea", {
                                    className: "field-input field-textarea",
                                    value: D.overall_challenges || "",
                                    onChange: (q) =>
                                      M({
                                        ...D,
                                        overall_challenges: q.target.value,
                                      }),
                                  }),
                                }),
                                j.jsx(Ne, {
                                  label: "Bottleneck risk",
                                  children: j.jsx("textarea", {
                                    className: "field-input field-textarea",
                                    value: D.bottleneck_risk || "",
                                    onChange: (q) =>
                                      M({
                                        ...D,
                                        bottleneck_risk: q.target.value,
                                      }),
                                  }),
                                }),
                              ],
                            }),
                            j.jsxs("div", {
                              className: "action-row",
                              children: [
                                j.jsx("button", {
                                  className: "primary-button",
                                  disabled: z,
                                  onClick: async () => {
                                    U(!0);
                                    try {
                                      const q = await St(
                                        `/api/admin/reports/${D.id}/save`,
                                        {
                                          method: "POST",
                                          body: JSON.stringify(D),
                                        },
                                      );
                                      (t(
                                        "success",
                                        "Report finalized",
                                        q.message,
                                      ),
                                        await V(),
                                        window.open(
                                          q.download_url,
                                          "_blank",
                                          "noopener,noreferrer",
                                        ));
                                    } catch (q) {
                                      t("error", "Save failed", q.message);
                                    } finally {
                                      U(!1);
                                    }
                                  },
                                  children: z
                                    ? "Saving..."
                                    : "Save and finalize",
                                }),
                                D.download_url
                                  ? j.jsx("a", {
                                      className: "secondary-link",
                                      href: D.download_url,
                                      children: "Download PDF",
                                    })
                                  : null,
                              ],
                            }),
                          ],
                        })
                      : null,
                  ],
                }))
              : (K = j.jsxs("div", {
                  className: "page-stack",
                  children: [
                    j.jsxs(Lt, {
                      icon: vf,
                      title: "Team identity",
                      copy: "Update the team name used across the workspace.",
                      children: [
                        j.jsx(Ne, {
                          label: "Team name",
                          children: j.jsx("input", {
                            className: "field-input",
                            value: S.team_name,
                            onChange: (q) => _({ team_name: q.target.value }),
                          }),
                        }),
                        j.jsx("div", {
                          className: "action-row",
                          children: j.jsx("button", {
                            className: "primary-button",
                            disabled: m,
                            onClick: () =>
                              F(
                                () =>
                                  St("/api/admin/team-name", {
                                    method: "POST",
                                    body: JSON.stringify(S),
                                  }),
                                "Team updated",
                              ),
                            children: "Update team name",
                          }),
                        }),
                      ],
                    }),
                    j.jsxs(Lt, {
                      icon: zN,
                      title: "Add team member",
                      copy: "New users get their first name as the default password.",
                      children: [
                        j.jsxs("div", {
                          className: "inline-form-row",
                          children: [
                            j.jsx(Ne, {
                              label: "First name",
                              children: j.jsx("input", {
                                className: "field-input",
                                value: O.first_name,
                                onChange: (q) =>
                                  E({ ...O, first_name: q.target.value }),
                              }),
                            }),
                            j.jsx(Ne, {
                              label: "Last name",
                              children: j.jsx("input", {
                                className: "field-input",
                                value: O.last_name,
                                onChange: (q) =>
                                  E({ ...O, last_name: q.target.value }),
                              }),
                            }),
                            j.jsx(Ne, {
                              label: "Email",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "email",
                                value: O.email,
                                onChange: (q) =>
                                  E({ ...O, email: q.target.value }),
                              }),
                            }),
                          ],
                        }),
                        j.jsx("div", {
                          className: "action-row",
                          children: j.jsx("button", {
                            className: "primary-button",
                            disabled: m,
                            onClick: () =>
                              F(
                                () =>
                                  St("/api/admin/users", {
                                    method: "POST",
                                    body: JSON.stringify(O),
                                  }),
                                "Member added",
                                async () =>
                                  E({
                                    first_name: "",
                                    last_name: "",
                                    email: "",
                                  }),
                              ),
                            children: "Create member",
                          }),
                        }),
                      ],
                    }),
                    j.jsxs(Lt, {
                      icon: hf,
                      title: "Lead password",
                      copy: "Keep the team lead account secure.",
                      children: [
                        j.jsxs("div", {
                          className: "inline-form-row",
                          children: [
                            j.jsx(Ne, {
                              label: "Current password",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "password",
                                value: C.current_password,
                                onChange: (q) =>
                                  T({ ...C, current_password: q.target.value }),
                              }),
                            }),
                            j.jsx(Ne, {
                              label: "New password",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "password",
                                value: C.new_password,
                                onChange: (q) =>
                                  T({ ...C, new_password: q.target.value }),
                              }),
                            }),
                            j.jsx(Ne, {
                              label: "Confirm password",
                              children: j.jsx("input", {
                                className: "field-input",
                                type: "password",
                                value: C.confirm_password,
                                onChange: (q) =>
                                  T({ ...C, confirm_password: q.target.value }),
                              }),
                            }),
                          ],
                        }),
                        j.jsx("div", {
                          className: "action-row",
                          children: j.jsx("button", {
                            className: "primary-button",
                            disabled: m,
                            onClick: () =>
                              F(
                                () =>
                                  St("/api/admin/change-password", {
                                    method: "POST",
                                    body: JSON.stringify(C),
                                  }),
                                "Password updated",
                                async () =>
                                  T({
                                    current_password: "",
                                    new_password: "",
                                    confirm_password: "",
                                  }),
                              ),
                            children: "Update password",
                          }),
                        }),
                      ],
                    }),
                  ],
                })),
    j.jsxs("main", {
      className: "workspace-main",
      children: [
        j.jsx(CM, {
          title: "Admin dashboard",
          copy: "Professional, minimal, and dashboard-first with clean operational sections.",
          onMenuToggle: u,
        }),
        j.jsx(DM, {
          title: `${e.user.first_name} ${e.user.last_name || ""}`,
          copy: "Manage members, exceptions, reporting, and compliance from one organized workspace.",
          meta: [
            { label: "Team", value: e.user.team_name || "Team Daily Tracker" },
            { label: "Email", value: e.user.email },
          ],
        }),
        K,
      ],
    })
  );
}
function B$({
  session: e,
  pushToast: t,
  view: n,
  setView: a,
  onMenuToggle: u,
}) {
  const o = MM(),
    [s, f] = w.useState(null),
    [d, h] = w.useState(!0),
    [m, p] = w.useState(!1),
    [g, b] = w.useState(""),
    [S, _] = w.useState(null),
    [O, E] = w.useState({
      current_password: "",
      new_password: "",
      confirm_password: "",
    }),
    C = async (M = {}) => {
      h(!0);
      try {
        const z = new URLSearchParams();
        (M.edit_date && z.set("edit_date", M.edit_date),
          M.request_date && z.set("request_date", M.request_date));
        const U = await St(`/api/member/dashboard?${z.toString()}`);
        (f(U),
          _({ ...(U.form_data || {}), date: U.form_data?.date || U.today }));
      } catch (z) {
        t("error", "Dashboard error", z.message);
      } finally {
        h(!1);
      }
    };
  if (
    (w.useEffect(() => {
      const M = new URLSearchParams(window.location.search);
      C({
        edit_date: M.get("edit_date") || "",
        request_date: M.get("request_date") || "",
      });
    }, []),
    d && !s)
  )
    return j.jsx(Eg, {});
  const T = [
    {
      icon: ys,
      label: "Pending requests",
      value: s.pending_requests.length,
      note: "Awaiting TL review",
    },
    {
      icon: bl,
      label: "Total entries",
      value: s.total_entries,
      note: "Your submitted daily updates",
    },
    {
      icon: AA,
      label: "Current period",
      value: Fm(),
      note: "Local time based AM/PM context",
    },
  ];
  let D = null;
  return (
    n === "dashboard"
      ? (D = j.jsx(NM, {
          title: "Today at a glance",
          copy: "A clean dashboard focused on requests, entry volume, current time, calendar context, and entry trend.",
          now: o,
          stats: T,
          trend: s.entry_trend,
          insights: [
            {
              title: "Current day period",
              copy:
                Fm() === "AM"
                  ? "Morning planning time is currently active."
                  : "Post-noon and end-of-day work is currently active.",
            },
            {
              title: "Request status",
              copy: s.pending_requests.length
                ? `${s.pending_requests.length} requests are pending review.`
                : "No pending requests at the moment.",
            },
            {
              title: "Entry history",
              copy: s.total_entries
                ? `${s.total_entries} entries have been logged so far.`
                : "No entries logged yet for this account.",
            },
          ],
        }))
      : n === "workspace"
        ? (D = j.jsx(U$, {
            data: s,
            formState: S,
            setFormState: _,
            working: m,
            onReset: async () => {
              (a("workspace"), await C());
            },
            onSubmit: async () => {
              p(!0);
              try {
                const M = await St("/api/member/daily-update", {
                  method: "POST",
                  body: JSON.stringify({
                    entry_date: S.date,
                    plan: S.plan,
                    extra_work: S.extra_work,
                    challenges: S.challenges,
                    eta: S.eta,
                    proof_of_work: S.proof_of_work,
                    client_name: S.client_name,
                    request_reason: S.request_reason,
                    is_corporate: !!S.is_corporate,
                    is_university: !!S.is_university,
                  }),
                });
                (t("success", "Saved", M.message),
                  M.next?.edit_date
                    ? (a("workspace"), await C({ edit_date: M.next.edit_date }))
                    : M.next?.view === "requests"
                      ? (a("requests"), await C())
                      : (a("history"), await C()));
              } catch (M) {
                t("error", "Save failed", M.message);
              } finally {
                p(!1);
              }
            },
          }))
        : n === "history"
          ? (D = j.jsx(Lt, {
              icon: OA,
              title: "History",
              copy: "A clear table of recent entries with direct edit access.",
              tag: `${s.recent_updates.length} recent`,
              children: j.jsx(Zu, {
                emptyMessage:
                  "No entries yet. Start by adding a morning entry.",
                rows: s.recent_updates,
                columns: [
                  { key: "date", label: "Date", render: (M) => M.date },
                  { key: "plan", label: "Plan", render: (M) => M.plan || "-" },
                  { key: "eta", label: "ETA", render: (M) => M.eta || "-" },
                  {
                    key: "extra",
                    label: "Extra work",
                    render: (M) => M.extra_work || "-",
                  },
                  {
                    key: "proof",
                    label: "Proof",
                    render: (M) => M.proof_of_work || "-",
                  },
                  {
                    key: "actions",
                    label: "Actions",
                    render: (M) =>
                      j.jsx("button", {
                        className: "secondary-button",
                        onClick: async () => {
                          (a("workspace"), await C({ edit_date: M.date }));
                        },
                        children: "Open edit mode",
                      }),
                  },
                ],
              }),
            }))
          : n === "requests"
            ? (D = j.jsxs("div", {
                className: "page-stack",
                children: [
                  j.jsxs(Lt, {
                    icon: ys,
                    title: "Missed previous day",
                    copy: "Open a previous-day request when a full day was missed.",
                    children: [
                      j.jsx(Ne, {
                        label: "Date",
                        children: j.jsx("input", {
                          className: "field-input",
                          type: "date",
                          max: s.today,
                          value: g,
                          onChange: (M) => b(M.target.value),
                        }),
                      }),
                      j.jsx("div", {
                        className: "action-row",
                        children: j.jsx("button", {
                          className: "primary-button",
                          onClick: async () => {
                            if (!g) {
                              t(
                                "error",
                                "Missing date",
                                "Select the missed date first.",
                              );
                              return;
                            }
                            (a("workspace"), await C({ request_date: g }));
                          },
                          children: "Open request",
                        }),
                      }),
                    ],
                  }),
                  j.jsx(Lt, {
                    icon: df,
                    title: "Pending requests",
                    copy: "Requests that are still awaiting team-lead review.",
                    children: j.jsx(Zu, {
                      emptyMessage: "No pending requests right now.",
                      rows: s.pending_requests,
                      columns: [
                        { key: "date", label: "Date", render: (M) => M.date },
                        {
                          key: "type",
                          label: "Request type",
                          render: (M) => M.request_type.replaceAll("_", " "),
                        },
                        {
                          key: "status",
                          label: "Status",
                          render: () => "Awaiting TL approval",
                        },
                      ],
                    }),
                  }),
                ],
              }))
            : (D = j.jsxs(Lt, {
                icon: hf,
                title: "Password settings",
                copy: "Update your member password.",
                children: [
                  j.jsxs("div", {
                    className: "inline-form-row",
                    children: [
                      j.jsx(Ne, {
                        label: "Current password",
                        children: j.jsx("input", {
                          className: "field-input",
                          type: "password",
                          value: O.current_password,
                          onChange: (M) =>
                            E({ ...O, current_password: M.target.value }),
                        }),
                      }),
                      j.jsx(Ne, {
                        label: "New password",
                        children: j.jsx("input", {
                          className: "field-input",
                          type: "password",
                          value: O.new_password,
                          onChange: (M) =>
                            E({ ...O, new_password: M.target.value }),
                        }),
                      }),
                      j.jsx(Ne, {
                        label: "Confirm password",
                        children: j.jsx("input", {
                          className: "field-input",
                          type: "password",
                          value: O.confirm_password,
                          onChange: (M) =>
                            E({ ...O, confirm_password: M.target.value }),
                        }),
                      }),
                    ],
                  }),
                  j.jsx("div", {
                    className: "action-row",
                    children: j.jsx("button", {
                      className: "primary-button",
                      disabled: m,
                      onClick: async () => {
                        p(!0);
                        try {
                          const M = await St("/api/member/change-password", {
                            method: "POST",
                            body: JSON.stringify(O),
                          });
                          (t("success", "Password updated", M.message),
                            E({
                              current_password: "",
                              new_password: "",
                              confirm_password: "",
                            }));
                        } catch (M) {
                          t("error", "Password update failed", M.message);
                        } finally {
                          p(!1);
                        }
                      },
                      children: "Update password",
                    }),
                  }),
                ],
              })),
    j.jsxs("main", {
      className: "workspace-main",
      children: [
        j.jsx(CM, {
          title: "Member workspace",
          onMenuToggle: u,
        }),
        j.jsx(DM, {
          title: `${e.user.first_name} ${e.user.last_name || ""}`,
          copy: `${e.user.team_name || "Your team"} - ${e.user.email}`,
          meta: [
            { label: "Current period", value: Fm() },
            {
              label: "Pending requests",
              value: String(s.pending_requests.length),
            },
          ],
        }),
        D,
      ],
    })
  );
}
function H$() {
  const [e, t] = w.useState(null),
    [n, a] = w.useState(!0),
    { toasts: u, pushToast: o, removeToast: s } = M$(),
    [f, d] = T$(e?.role || "member");
  (w.useEffect(() => {
    let m = !0;
    return (
      St("/api/session")
        .then((p) => {
          m && (t(p), (document.title = p.app_title));
        })
        .catch(() => {
          window.location.href = "/login";
        }),
      () => {
        m = !1;
      }
    );
  }, []),
    w.useEffect(() => {
      const m = window.matchMedia("(max-width: 1100px)"),
        p = () => a(!m.matches);
      return (
        p(),
        m.addEventListener("change", p),
        () => m.removeEventListener("change", p)
      );
    }, []));
  const h = async () => {
    try {
      await St("/api/logout", { method: "POST" });
    } finally {
      window.location.href = "/login";
    }
  };
  return e
    ? j.jsxs("div", {
        className: "app-shell",
        children: [
          j.jsx(z$, {
            session: e,
            view: f,
            setView: d,
            onLogout: h,
            open: n,
            setOpen: a,
          }),
          j.jsx("div", {
            className: "app-content",
            children:
              e.role === "lead"
                ? j.jsx(q$, {
                    session: e,
                    pushToast: o,
                    view: f,
                    setView: d,
                    onMenuToggle: () => a((m) => !m),
                  })
                : j.jsx(B$, {
                    session: e,
                    pushToast: o,
                    view: f,
                    setView: d,
                    onMenuToggle: () => a((m) => !m),
                  }),
          }),
          j.jsx(P$, { toasts: u, removeToast: s }),
        ],
      })
    : j.jsx(Eg, {});
}
dN.createRoot(document.getElementById("root")).render(
  j.jsx(w.StrictMode, { children: j.jsx(H$, {}) }),
);
