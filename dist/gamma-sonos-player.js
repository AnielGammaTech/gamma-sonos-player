/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, F = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (F && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (r) => new lt(typeof r == "string" ? r : r + "", void 0, Z), ft = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1], r[0]);
  return new lt(e, r, Z);
}, bt = (r, t) => {
  if (F) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = z.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, X = F ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _t, defineProperty: vt, getOwnPropertyDescriptor: $t, getOwnPropertyNames: yt, getOwnPropertySymbols: xt, getPrototypeOf: wt } = Object, _ = globalThis, Y = _.trustedTypes, At = Y ? Y.emptyScript : "", G = _.reactiveElementPolyfillSupport, k = (r, t) => r, V = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? At : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, ht = (r, t) => !_t(r, t), tt = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && vt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = $t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const c = i == null ? void 0 : i.call(this);
      a == null || a.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = wt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, s = [...yt(e), ...xt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(X(i));
    } else t !== void 0 && e.push(X(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return bt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var a;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : V).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), o = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((a = c.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? c.converter : V;
      this._$Em = i;
      const d = o.fromAttribute(e, c.type);
      this[i] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, a) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (a = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? ht)(a, e) || s.useDefault && s.reflect && a === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: a }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, n] of this._$Ep) this[a] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, n] of i) {
        const { wrapped: c } = n, o = this[a];
        c !== !0 || this._$AL.has(a) || o === void 0 || this.C(a, void 0, n, o);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[k("elementProperties")] = /* @__PURE__ */ new Map(), w[k("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: w }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, et = (r) => r, j = P.trustedTypes, st = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, dt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + b, Et = `<${ut}>`, x = document, M = () => x.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", J = Array.isArray, St = (r) => J(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, rt = />/g, v = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, nt = /"/g, pt = /^(?:script|style|textarea|title)$/i, kt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = kt(1), A = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), $ = x.createTreeWalker(x, 129);
function gt(r, t) {
  if (!J(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st !== void 0 ? st.createHTML(t) : t;
}
const Pt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = S;
  for (let c = 0; c < e; c++) {
    const o = r[c];
    let d, u, h = -1, g = 0;
    for (; g < o.length && (n.lastIndex = g, u = n.exec(o), u !== null); ) g = n.lastIndex, n === S ? u[1] === "!--" ? n = it : u[1] !== void 0 ? n = rt : u[2] !== void 0 ? (pt.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = v) : u[3] !== void 0 && (n = v) : n === v ? u[0] === ">" ? (n = i ?? S, h = -1) : u[1] === void 0 ? h = -2 : (h = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? v : u[3] === '"' ? nt : at) : n === nt || n === at ? n = v : n === it || n === rt ? n = S : (n = v, i = void 0);
    const m = n === v && r[c + 1].startsWith("/>") ? " " : "";
    a += n === S ? o + Et : h >= 0 ? (s.push(d), o.slice(0, h) + dt + o.slice(h) + b + m) : o + b + (h === -2 ? c : m);
  }
  return [gt(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const c = t.length - 1, o = this.parts, [d, u] = Pt(t, e);
    if (this.el = R.createElement(d, s), $.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = $.nextNode()) !== null && o.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(dt)) {
          const g = u[n++], m = i.getAttribute(h).split(b), I = /([.?@])?(.*)/.exec(g);
          o.push({ type: 1, index: a, name: I[2], strings: m, ctor: I[1] === "." ? Mt : I[1] === "?" ? Ut : I[1] === "@" ? Rt : L }), i.removeAttribute(h);
        } else h.startsWith(b) && (o.push({ type: 6, index: a }), i.removeAttribute(h));
        if (pt.test(i.tagName)) {
          const h = i.textContent.split(b), g = h.length - 1;
          if (g > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let m = 0; m < g; m++) i.append(h[m], M()), $.nextNode(), o.push({ type: 2, index: ++a });
            i.append(h[g], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ut) o.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(b, h + 1)) !== -1; ) o.push({ type: 7, index: a }), h += b.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  var n, c;
  if (t === A) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const a = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class Ct {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    $.currentNode = i;
    let a = $.nextNode(), n = 0, c = 0, o = s[0];
    for (; o !== void 0; ) {
      if (n === o.index) {
        let d;
        o.type === 2 ? d = new T(a, a.nextSibling, this, t) : o.type === 1 ? d = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (d = new Tt(a, this, t)), this._$AV.push(d), o = s[++c];
      }
      n !== (o == null ? void 0 : o.index) && (a = $.nextNode(), n++);
    }
    return $.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), U(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(gt(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(e);
    else {
      const n = new Ct(i, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new T(this.O(M()), this.O(M()), this, this.options)) : s = e[i], s._$AI(a), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = et(t).nextSibling;
      et(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, a) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = l;
  }
  _$AI(t, e = this, s, i) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = E(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const c = t;
      let o, d;
      for (t = a[0], o = 0; o < a.length - 1; o++) d = E(this, c[s + o], e, o), d === A && (d = this._$AH[o]), n || (n = !U(d) || d !== this._$AH[o]), d === l ? t = l : t !== l && (t += (d ?? "") + a[o + 1]), this._$AH[o] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Ut extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Rt extends L {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? l) === A) return;
    const s = this._$AH, i = t === l && s !== l || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== l && (s === l || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Tt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const q = P.litHtmlPolyfillSupport;
q == null || q(R, T), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const It = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new T(t.insertBefore(M(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class C extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = It(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return A;
  }
}
var ct;
C._$litElement$ = !0, C.finalized = !0, (ct = y.litElementHydrateSupport) == null || ct.call(y, { LitElement: C });
const B = y.litElementPolyfillSupport;
B == null || B({ LitElement: C });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.2");
const f = {
  width: "420px",
  height: "620px",
  enqueue_mode: "next",
  search_limit: 8,
  show_grouping: !0,
  show_search: !0,
  show_queue_hint: !0,
  background: "#101722",
  accent_color: "#39d98a"
};
function N(r, t) {
  if (typeof r == "number" && Number.isFinite(r))
    return r;
  const e = Number(r);
  return Number.isFinite(e) ? e : t;
}
function O(r) {
  return !r || r.state === "unavailable" || r.state === "unknown";
}
function H(r) {
  return r.replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
const K = class K extends C {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "search", this.query = "", this.searching = !1, this.searchError = "", this.searchResults = [], this.selectedGroupIds = [];
  }
  static get styles() {
    return ft`
      :host {
        --gamma-sonos-width: 420px;
        --gamma-sonos-height: 620px;
        --gamma-sonos-background: #101722;
        --gamma-sonos-accent: #39d98a;

        display: block;
        max-width: var(--gamma-sonos-width);
        width: 100%;
      }

      ha-card {
        background: transparent;
        border: 0;
        box-shadow: none;
      }

      .player {
        background:
          radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent), transparent 38%),
          radial-gradient(circle at 16% 18%, rgb(255 255 255 / 7%), transparent 32%),
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--gamma-sonos-background) 92%, #ffffff 8%),
            color-mix(in srgb, var(--gamma-sonos-background) 92%, #000000 14%)
          );
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 20%, transparent);
        border-radius: 22px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 9%),
          0 18px 36px rgb(0 0 0 / 28%),
          0 0 54px color-mix(in srgb, var(--gamma-sonos-accent) 9%, transparent);
        box-sizing: border-box;
        color: var(--primary-text-color, #f4f7fb);
        display: grid;
        gap: 14px;
        min-height: var(--gamma-sonos-height);
        overflow: hidden;
        padding: 18px;
        position: relative;
        width: 100%;
      }

      .player::before {
        background-image: var(--gamma-sonos-artwork);
        background-position: center;
        background-size: cover;
        content: '';
        filter: blur(28px) saturate(1.2);
        inset: -34px;
        opacity: 0.18;
        position: absolute;
      }

      .player > * {
        position: relative;
        z-index: 1;
      }

      .topbar,
      .rooms,
      .tabs,
      .controls,
      .volume-row,
      .group-row,
      .search-row,
      .result,
      .speaker-row {
        align-items: center;
        display: flex;
      }

      .topbar {
        gap: 10px;
        justify-content: space-between;
      }

      .title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .name {
        font-size: 16px;
        font-weight: 750;
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        line-height: 1.2;
      }

      .rooms,
      .tabs {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        padding: 3px;
      }

      .rooms {
        gap: 4px;
        overflow-x: auto;
      }

      .room,
      .tabs button,
      .icon-button,
      .play-button,
      .group-chip,
      .result button {
        appearance: none;
        border: 0;
        color: inherit;
        cursor: pointer;
        font: inherit;
      }

      .room,
      .tabs button {
        background: transparent;
        border-radius: 999px;
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        font-weight: 700;
        min-height: 28px;
        padding: 0 10px;
        white-space: nowrap;
      }

      .room.active,
      .tabs button.active,
      .group-chip.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 20%, transparent);
        color: var(--primary-text-color, #f4f7fb);
        box-shadow: 0 0 18px color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
      }

      .artwork {
        aspect-ratio: 1;
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 70%),
          rgb(255 255 255 / 5%);
        background-image: var(--gamma-sonos-cover);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 18px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 12%),
          0 14px 28px rgb(0 0 0 / 24%);
        justify-self: center;
        max-width: 250px;
        width: 68%;
      }

      .metadata {
        display: grid;
        gap: 5px;
        text-align: center;
      }

      .track {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.12;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .artist {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 14px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .controls {
        gap: 14px;
        justify-content: center;
      }

      .icon-button,
      .play-button {
        align-items: center;
        background: rgb(255 255 255 / 7%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        display: inline-flex;
        justify-content: center;
      }

      .icon-button {
        height: 44px;
        width: 44px;
      }

      .play-button {
        background:
          radial-gradient(circle, color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent), transparent 74%),
          rgb(255 255 255 / 8%);
        box-shadow: 0 0 24px color-mix(in srgb, var(--gamma-sonos-accent) 18%, transparent);
        height: 58px;
        width: 58px;
      }

      ha-icon {
        --mdc-icon-size: 22px;
      }

      .play-button ha-icon {
        --mdc-icon-size: 28px;
      }

      .volume-row {
        gap: 10px;
      }

      input[type='range'] {
        accent-color: var(--gamma-sonos-accent);
        flex: 1;
      }

      .tabs {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grouping,
      .search,
      .speakers {
        display: grid;
        gap: 10px;
      }

      .section-title {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .group-row {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .group-chip {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-grid;
        font-size: 12px;
        font-weight: 700;
        gap: 3px;
        grid-template-columns: auto minmax(0, 1fr);
        min-height: 48px;
        padding: 8px 10px;
        text-align: left;
      }

      .group-check {
        align-items: center;
        background: rgb(255 255 255 / 7%);
        border: 1px solid rgb(255 255 255 / 12%);
        border-radius: 999px;
        display: inline-flex;
        height: 22px;
        justify-content: center;
        width: 22px;
      }

      .group-chip.active .group-check {
        background: var(--gamma-sonos-accent);
        color: #06100b;
      }

      .group-name,
      .group-status {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .group-status {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 750;
        grid-column: 2;
        text-transform: uppercase;
      }

      .group-actions {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
      }

      .speaker-list {
        display: grid;
        gap: 8px;
      }

      .speaker-row {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 14px;
        gap: 10px;
        padding: 8px;
      }

      .speaker-name {
        flex: 0 0 112px;
        font-size: 12px;
        font-weight: 750;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .search-row {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        gap: 8px;
        padding: 8px;
      }

      input[type='search'] {
        background: transparent;
        border: 0;
        color: var(--primary-text-color, #f4f7fb);
        flex: 1;
        font: inherit;
        min-width: 0;
        outline: 0;
      }

      .results {
        display: grid;
        gap: 8px;
        max-height: 156px;
        overflow: auto;
      }

      .result {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        gap: 10px;
        min-width: 0;
        padding: 8px;
      }

      .result-main {
        display: grid;
        flex: 1;
        gap: 2px;
        min-width: 0;
      }

      .result-name,
      .result-sub {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-name {
        font-size: 13px;
        font-weight: 750;
      }

      .result-sub {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
      }

      .result button {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border-radius: 999px;
        font-size: 12px;
        font-weight: 750;
        min-height: 30px;
        padding: 0 10px;
      }

      .hint,
      .error {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        line-height: 1.25;
        text-align: center;
      }

      .error {
        color: #ffb3ad;
      }

      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
    `;
  }
  static getStubConfig(t, e) {
    return {
      entities: e.filter((s) => s.startsWith("media_player."))
    };
  }
  setConfig(t) {
    var e, s;
    this.config = { ...f, ...t }, this.selectedEntityId = this.config.entity || ((e = this.config.entities) == null ? void 0 : e[0]) || ((s = this.config.music_assistant_entities) == null ? void 0 : s[0]) || "", this.style.setProperty("--gamma-sonos-width", this.config.width ?? f.width), this.style.setProperty("--gamma-sonos-height", this.config.height ?? f.height), this.style.setProperty(
      "--gamma-sonos-background",
      this.config.background ?? f.background
    ), this.style.setProperty(
      "--gamma-sonos-accent",
      this.config.accent_color ?? f.accent_color
    );
  }
  getCardSize() {
    return 8;
  }
  get allPlayers() {
    var e;
    const t = [
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? []
    ];
    return t.length > 0 ? t.map((s) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[s];
    }).filter((s) => !!s) : Object.values(((e = this.hass) == null ? void 0 : e.states) ?? {}).filter((s) => !!s).filter((s) => s.entity_id.startsWith("media_player.")).filter((s) => {
      const i = String(s.attributes.platform ?? "").toLowerCase(), a = String(s.attributes.device_class ?? "").toLowerCase(), n = String(s.attributes.icon ?? "").toLowerCase(), c = String(s.attributes.source ?? "").toLowerCase();
      return a === "speaker" || n.includes("speaker") || c.includes("music assistant") || s.attributes.mass_player_type === "player" || i.includes("sonos") || i.includes("music_assistant") || s.entity_id.includes("sonos") || s.entity_id.includes("music_assistant");
    });
  }
  get activePlayer() {
    var t;
    return ((t = this.hass) == null ? void 0 : t.states[this.selectedEntityId]) ?? this.allPlayers[0];
  }
  get activeEntityId() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.entity_id) ?? this.selectedEntityId;
  }
  get activeName() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.attributes.friendly_name) ?? this.activeEntityId;
  }
  get artworkUrl() {
    var t, e, s;
    return String(
      ((t = this.activePlayer) == null ? void 0 : t.attributes.entity_picture) || ((e = this.activePlayer) == null ? void 0 : e.attributes.entity_picture_local) || ((s = this.activePlayer) == null ? void 0 : s.attributes.media_image_url) || ""
    );
  }
  get isPlaying() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.state) === "playing";
  }
  get volume() {
    var t;
    return Math.round(N((t = this.activePlayer) == null ? void 0 : t.attributes.volume_level, 0) * 100);
  }
  get groupMembers() {
    var e;
    const t = (e = this.activePlayer) == null ? void 0 : e.attributes.group_members;
    return Array.isArray(t) ? t : [this.activeEntityId].filter(Boolean);
  }
  service(t, e, s) {
    var i;
    (i = this.hass) == null || i.callService(t, e, s);
  }
  mediaService(t, e = {}) {
    !this.activeEntityId || O(this.activePlayer) || this.service("media_player", t, {
      entity_id: this.activeEntityId,
      ...e
    });
  }
  playPause() {
    this.mediaService(this.isPlaying ? "media_pause" : "media_play");
  }
  setVolume(t) {
    this.setPlayerVolume(this.activeEntityId, t);
  }
  setPlayerVolume(t, e) {
    t && this.service("media_player", "volume_set", {
      entity_id: t,
      volume_level: Math.max(0, Math.min(1, Number(e) / 100))
    });
  }
  toggleMute() {
    this.togglePlayerMute(this.activeEntityId);
  }
  togglePlayerMute(t) {
    var s;
    const e = (s = this.hass) == null ? void 0 : s.states[t];
    !e || O(e) || this.service("media_player", "volume_mute", {
      entity_id: t,
      is_volume_muted: !e.attributes.is_volume_muted
    });
  }
  toggleGroupSelection(t) {
    if (this.selectedGroupIds.includes(t)) {
      this.selectedGroupIds = this.selectedGroupIds.filter((e) => e !== t);
      return;
    }
    this.selectedGroupIds = [...this.selectedGroupIds, t];
  }
  groupSelected() {
    !this.activeEntityId || this.selectedGroupIds.length === 0 || this.service("media_player", "join", {
      entity_id: this.activeEntityId,
      group_members: this.selectedGroupIds.filter((t) => t !== this.activeEntityId)
    });
  }
  ungroupActive() {
    this.mediaService("unjoin"), this.selectedGroupIds = [];
  }
  async searchMusicAssistant() {
    var e, s;
    const t = this.query.trim();
    if (!t || !((e = this.hass) != null && e.callWS)) {
      (s = this.hass) != null && s.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    this.searching = !0, this.searchError = "";
    try {
      if (!this.config.music_assistant_config_entry_id) {
        this.searchError = "Add music_assistant_config_entry_id to this card config.";
        return;
      }
      const i = await this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: {
          config_entry_id: this.config.music_assistant_config_entry_id,
          name: t,
          media_type: ["track", "album", "artist", "playlist"],
          limit: N(this.config.search_limit, f.search_limit)
        },
        return_response: !0
      });
      this.searchResults = this.extractSearchResults(i);
    } catch (i) {
      this.searchError = i instanceof Error ? i.message : "Search failed";
    } finally {
      this.searching = !1;
    }
  }
  extractSearchResults(t) {
    const s = t.response ?? t, i = ["tracks", "albums", "artists", "playlists"], a = [];
    return i.forEach((n) => {
      const c = s[n];
      Array.isArray(c) && c.forEach((o) => {
        typeof o == "object" && o && a.push({
          ...o,
          media_type: n === "tracks" ? "track" : n.slice(0, -1)
        });
      });
    }), a.slice(0, N(this.config.search_limit, f.search_limit));
  }
  playSearchResult(t) {
    const e = t.uri || t.name;
    e && this.service("music_assistant", "play_media", {
      entity_id: this.activeEntityId,
      media_id: e,
      media_type: t.media_type || t.type,
      enqueue: this.config.enqueue_mode ?? f.enqueue_mode
    });
  }
  renderRooms() {
    const t = this.allPlayers;
    return t.length < 2 ? l : p`
      <div class="rooms" aria-label="Players">
        ${t.map(
      (e) => p`
            <button
              class="room ${e.entity_id === this.activeEntityId ? "active" : ""}"
              @click=${() => {
        this.selectedEntityId = e.entity_id;
        const s = e.attributes.group_members;
        this.selectedGroupIds = Array.isArray(s) ? [...s] : [e.entity_id];
      }}
            >
              ${e.attributes.friendly_name ?? H(e.entity_id.split(".")[1])}
            </button>
          `
    )}
      </div>
    `;
  }
  renderGrouping() {
    return !this.config.show_grouping || this.allPlayers.length < 2 ? l : p`
      <section class="grouping">
        <span class="section-title">Select Speakers To Group With ${this.activeName}</span>
        <div class="group-row">
          ${this.allPlayers.map((t) => {
      const e = this.selectedGroupIds.includes(t.entity_id) || this.groupMembers.includes(t.entity_id), s = t.entity_id === this.activeEntityId;
      return p`
              <button
                class="group-chip ${e ? "active" : ""}"
                ?disabled=${s}
                @click=${() => this.toggleGroupSelection(t.entity_id)}
              >
                <span class="group-check">${e ? "✓" : ""}</span>
                <span class="group-name">
                  ${t.attributes.friendly_name ?? H(t.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${s ? "Main speaker" : e ? "Selected" : "Tap to select"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip active"
            ?disabled=${this.selectedGroupIds.filter((t) => t !== this.activeEntityId).length === 0}
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">
              Group ${this.selectedGroupIds.filter((t) => t !== this.activeEntityId).length} Speakers
            </span>
            <span class="group-status">Apply selection</span>
          </button>
          <button class="group-chip" @click=${this.ungroupActive}>
            <span class="group-check">×</span>
            <span class="group-name">Ungroup Current</span>
            <span class="group-status">Break group</span>
          </button>
        </div>
      </section>
    `;
  }
  renderTabs() {
    return p`
      <div class="tabs" aria-label="Player panels">
        <button
          class=${this.activeTab === "search" ? "active" : ""}
          @click=${() => {
      this.activeTab = "search";
    }}
        >
          Search
        </button>
        <button
          class=${this.activeTab === "speakers" ? "active" : ""}
          @click=${() => {
      this.activeTab = "speakers";
    }}
        >
          Speakers
        </button>
      </div>
    `;
  }
  renderSearch() {
    return this.config.show_search ? p`
      <section class="search">
        <span class="section-title">Music Assistant Search</span>
        <div class="search-row">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Search songs, albums, artists, playlists"
            @input=${(t) => {
      this.query = t.target.value;
    }}
            @keydown=${(t) => {
      t.key === "Enter" && this.searchMusicAssistant();
    }}
          />
          <button
            class="icon-button"
            title="Search"
            @click=${() => this.searchMusicAssistant()}
          >
            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          </button>
        </div>
        ${this.searchError ? p`<div class="error">${this.searchError}</div>` : l}
        ${this.searching ? p`<div class="hint">Searching...</div>` : l}
        ${this.searchResults.length > 0 ? this.renderResults() : l}
        ${this.config.show_queue_hint ? p`<div class="hint">Tap a result to add it next with Music Assistant.</div>` : l}
      </section>
    ` : l;
  }
  renderSpeakers() {
    return p`
      <section class="speakers">
        ${this.renderGrouping()}
        <span class="section-title">Speaker Volume</span>
        <div class="speaker-list">
          ${this.allPlayers.map((t) => {
      const e = O(t), s = Math.round(N(t.attributes.volume_level, 0) * 100);
      return p`
              <div class="speaker-row">
                <span class="speaker-name">
                  ${t.attributes.friendly_name ?? H(t.entity_id.split(".")[1])}
                </span>
                <button
                  class="icon-button"
                  ?disabled=${e}
                  @click=${() => this.togglePlayerMute(t.entity_id)}
                >
                  <ha-icon .icon=${t.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(s)}
                  ?disabled=${e}
                  @change=${(i) => this.setPlayerVolume(
        t.entity_id,
        i.target.value
      )}
                />
                <span class="state">${s}%</span>
              </div>
            `;
    })}
        </div>
      </section>
    `;
  }
  renderResults() {
    return p`
      <div class="results">
        ${this.searchResults.map((t) => {
      var s, i;
      const e = t.artist || ((s = t.artists) == null ? void 0 : s.map((a) => a.name).filter(Boolean).join(", ")) || ((i = t.album) == null ? void 0 : i.name) || t.media_type || t.type || "";
      return p`
            <div class="result">
              <div class="result-main">
                <span class="result-name">${t.name ?? t.uri ?? "Untitled"}</span>
                <span class="result-sub">${e}</span>
              </div>
              <button @click=${() => this.playSearchResult(t)}>Next</button>
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    if (!this.config)
      return p``;
    const t = this.activePlayer, e = O(t), s = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", i = (t == null ? void 0 : t.attributes.media_title) || "No music selected", a = (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || "Ready";
    return p`
      <ha-card>
        <div
          class="player"
          style="
            --gamma-sonos-cover: ${s};
            --gamma-sonos-artwork: ${s};
          "
        >
          <div class="topbar">
            <div class="title">
              <span class="name">${this.config.name || this.activeName || "Sonos"}</span>
              <span class="state">${e ? "Unavailable" : H((t == null ? void 0 : t.state) ?? "idle")}</span>
            </div>
          </div>
          ${this.renderRooms()}
          <div class="artwork" aria-label="Artwork"></div>
          <div class="metadata">
            <span class="track">${i}</span>
            <span class="artist">${a}</span>
          </div>
          <div class="controls">
            <button class="icon-button" ?disabled=${e} @click=${() => this.mediaService("media_previous_track")}>
              <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
            </button>
            <button class="play-button" ?disabled=${e} @click=${this.playPause}>
              <ha-icon .icon=${this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
            </button>
            <button class="icon-button" ?disabled=${e} @click=${() => this.mediaService("media_next_track")}>
              <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
            </button>
          </div>
          <div class="volume-row">
            <button class="icon-button" ?disabled=${e} @click=${this.toggleMute}>
              <ha-icon .icon=${t != null && t.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${e}
              @change=${(n) => this.setVolume(n.target.value)}
            />
            <span class="state">${this.volume}%</span>
          </div>
          ${this.renderTabs()}
          ${this.activeTab === "search" ? this.renderSearch() : this.renderSpeakers()}
        </div>
      </ha-card>
    `;
  }
};
K.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  selectedEntityId: { state: !0 },
  activeTab: { state: !0 },
  query: { state: !0 },
  searching: { state: !0 },
  searchError: { state: !0 },
  searchResults: { state: !0 },
  selectedGroupIds: { state: !0 }
};
let W = K;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", W);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
