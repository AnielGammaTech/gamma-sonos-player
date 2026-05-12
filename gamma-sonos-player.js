/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, Z = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), st = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (o) => new ft(typeof o == "string" ? o : o + "", void 0, X), bt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new ft(e, o, X);
}, Pt = (o, t) => {
  if (Z) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = G.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, rt = Z ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return At(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: St, getOwnPropertyDescriptor: It, getOwnPropertyNames: Tt, getOwnPropertySymbols: qt, getPrototypeOf: Rt } = Object, k = globalThis, at = k.trustedTypes, Mt = at ? at.emptyScript : "", H = k.reactiveElementPolyfillSupport, L = (o, t) => o, K = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Mt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, vt = (o, t) => !Et(o, t), nt = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let T = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && St(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = Rt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...Tt(e), ...qt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(rt(s));
    } else t !== void 0 && e.push(rt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Pt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : K).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, a;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : K;
      this._$Em = s;
      const d = c.fromAttribute(e, n.type);
      this[s] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var a;
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = n.getPropertyOptions(t)), !((i.hasChanged ?? vt)(r, e) || i.useDefault && i.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: n } = a, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[L("elementProperties")] = /* @__PURE__ */ new Map(), T[L("finalized")] = /* @__PURE__ */ new Map(), H == null || H({ ReactiveElement: T }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, ot = (o) => o, B = z.trustedTypes, ct = B ? B.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, _t = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + $, Ct = `<${xt}>`, S = document, U = () => S.createComment(""), j = (o) => o === null || typeof o != "object" && typeof o != "function", tt = Array.isArray, Nt = (o) => tt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", F = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ut = />/g, A = RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, ht = /"/g, wt = /^(?:script|style|textarea|title)$/i, Lt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), u = Lt(1), R = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), P = S.createTreeWalker(S, 129);
function $t(o, t) {
  if (!tt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(t) : t;
}
const zt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = C;
  for (let n = 0; n < e; n++) {
    const c = o[n];
    let d, p, l = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, p = a.exec(c), p !== null); ) m = a.lastIndex, a === C ? p[1] === "!--" ? a = lt : p[1] !== void 0 ? a = ut : p[2] !== void 0 ? (wt.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = A) : p[3] !== void 0 && (a = A) : a === A ? p[0] === ">" ? (a = s ?? C, l = -1) : p[1] === void 0 ? l = -2 : (l = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? A : p[3] === '"' ? ht : dt) : a === ht || a === dt ? a = A : a === lt || a === ut ? a = C : (a = A, s = void 0);
    const g = a === A && o[n + 1].startsWith("/>") ? " " : "";
    r += a === C ? c + Ct : l >= 0 ? (i.push(d), c.slice(0, l) + _t + c.slice(l) + $ + g) : c + $ + (l === -2 ? n : g);
  }
  return [$t(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Q {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const n = t.length - 1, c = this.parts, [d, p] = zt(t, e);
    if (this.el = Q.createElement(d, i), P.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = P.nextNode()) !== null && c.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(_t)) {
          const m = p[a++], g = s.getAttribute(l).split($), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: r, name: f[2], strings: g, ctor: f[1] === "." ? jt : f[1] === "?" ? Qt : f[1] === "@" ? Ot : V }), s.removeAttribute(l);
        } else l.startsWith($) && (c.push({ type: 6, index: r }), s.removeAttribute(l));
        if (wt.test(s.tagName)) {
          const l = s.textContent.split($), m = l.length - 1;
          if (m > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let g = 0; g < m; g++) s.append(l[g], U()), P.nextNode(), c.push({ type: 2, index: ++r });
            s.append(l[m], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === xt) c.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = s.data.indexOf($, l + 1)) !== -1; ) c.push({ type: 7, index: r }), l += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function M(o, t, e = o, i) {
  var a, n;
  if (t === R) return t;
  let s = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const r = j(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), r === void 0 ? s = void 0 : (s = new r(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = M(o, s._$AS(o, t.values), s, i)), t;
}
class Ut {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    P.currentNode = s;
    let r = P.nextNode(), a = 0, n = 0, c = i[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let d;
        c.type === 2 ? d = new O(r, r.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (d = new Gt(r, this, t)), this._$AV.push(d), c = i[++n];
      }
      a !== (c == null ? void 0 : c.index) && (r = P.nextNode(), a++);
    }
    return P.currentNode = S, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = M(this, t, e), j(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Q.createElement($t(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const a = new Ut(s, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new Q(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new O(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = ot(t).nextSibling;
      ot(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = M(this, t, e, 0), a = !j(t) || t !== this._$AH && t !== R, a && (this._$AH = t);
    else {
      const n = t;
      let c, d;
      for (t = r[0], c = 0; c < r.length - 1; c++) d = M(this, n[i + c], e, c), d === R && (d = this._$AH[c]), a || (a = !j(d) || d !== this._$AH[c]), d === h ? t = h : t !== h && (t += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Qt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Ot extends V {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? h) === R) return;
    const i = this._$AH, s = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== h && (i === h || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const D = z.litHtmlPolyfillSupport;
D == null || D(Q, O), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.2");
const Bt = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new O(t.insertBefore(U(), r), r, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class q extends T {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var yt;
q._$litElement$ = !0, q.finalized = !0, (yt = E.litElementHydrateSupport) == null || yt.call(E, { LitElement: q });
const W = E.litElementPolyfillSupport;
W == null || W({ LitElement: q });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
const y = {
  width: "100%",
  height: "auto",
  fill_container: !0,
  compact: !1,
  enqueue_mode: "play",
  search_limit: 5,
  library_only: !1,
  show_grouping: !0,
  show_search: !0,
  show_queue_hint: !0,
  live_activity_enabled: !0,
  live_activity_auto_update: !1,
  live_activity_tag: "gamma-sonos-player",
  background: "#101722",
  accent_color: "#39d98a"
}, Vt = 524288, N = "gamma-sonos-player:last-player", mt = "gamma-sonos-player:playback-memory", gt = "gamma-sonos-player:favorites";
function _(o, t) {
  if (typeof o == "number" && Number.isFinite(o))
    return o;
  const e = Number(o);
  return Number.isFinite(e) ? e : t;
}
function w(o) {
  return !o || o.state === "unavailable" || o.state === "unknown";
}
function Ht(o) {
  return !!(_(o == null ? void 0 : o.attributes.supported_features, 0) & Vt) || Array.isArray(o == null ? void 0 : o.attributes.group_members);
}
function v(o) {
  const t = String((o == null ? void 0 : o.attributes.app_id) ?? "").toLowerCase(), e = String((o == null ? void 0 : o.attributes.platform) ?? "").toLowerCase(), i = String((o == null ? void 0 : o.attributes.source) ?? "").toLowerCase(), s = Array.isArray(o == null ? void 0 : o.attributes.source_list) ? o.attributes.source_list.join(" ").toLowerCase() : "";
  return (o == null ? void 0 : o.attributes.mass_player_type) === "player" || !!(o != null && o.attributes.active_queue) || t.includes("music_assistant") || e.includes("music_assistant") || i.includes("music assistant") || s.includes("music assistant");
}
function I(o) {
  return o.replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function Ft(o, t) {
  o.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    })
  );
}
const et = class et extends q {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.albumTracks = [], this.albumLoading = !1, this.albumError = "", this.playlistTracks = [], this.playlistLoading = !1, this.playlistError = "", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "", this.playbackMemory = {}, this.transportPending = !1, this.favoriteItems = [], this.searchRequestId = 0, this.albumRequestId = 0, this.playlistRequestId = 0, this.lastInitialQueueEntityId = "", this.lastQueueSignature = "", this.liveActivityPending = !1, this.liveActivityError = "", this.lastLiveActivitySignature = "";
  }
  static get styles() {
    return bt`
      :host {
        --gamma-sonos-width: 420px;
        --gamma-sonos-height: 620px;
        --gamma-sonos-background: #101722;
        --gamma-sonos-accent: #39d98a;

        display: block;
        box-sizing: border-box;
        width: var(--gamma-sonos-width);
        min-width: 0;
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
        container-type: inline-size;
        display: grid;
        gap: clamp(7px, 1.5vw, 10px);
        min-height: var(--gamma-sonos-height);
        overflow: hidden;
        padding: clamp(12px, 2.6vw, 16px);
        position: relative;
        transition:
          border-color 180ms ease,
          box-shadow 180ms ease,
          background 180ms ease;
        width: 100%;
        max-width: 100%;
        min-width: 0;
      }

      .player.compact {
        gap: 10px;
      }

      .player.compact .artwork {
        max-width: min(190px, 62%);
        width: min(190px, 62%);
      }

      .player.compact .rooms {
        padding-bottom: 5px;
      }

      .player.compact .track {
        font-size: clamp(16px, 4.2vw, 20px);
      }

      .mini-player {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 14px;
        display: grid;
        gap: 10px;
        grid-template-columns: 48px minmax(0, 1fr) auto;
        min-height: 64px;
        padding: 7px;
        transition:
          background 160ms ease,
          border-color 160ms ease,
          opacity 160ms ease;
      }

      .player.now-active .mini-player {
        display: none;
      }

      .mini-art {
        aspect-ratio: 1;
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 70%),
          rgb(255 255 255 / 5%);
        background-image: var(--gamma-sonos-cover);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 12px;
      }

      .mini-meta {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .mini-controls {
        align-items: center;
        display: inline-flex;
        gap: 8px;
      }

      .now-view {
        display: grid;
        gap: 10px;
        justify-items: center;
        min-height: 0;
      }

      .now-artwork {
        aspect-ratio: 1;
        background-color: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 18px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 12%),
          0 18px 34px rgb(0 0 0 / 24%);
        isolation: isolate;
        filter: none;
        max-width: min(340px, 76%);
        opacity: 1;
        position: relative;
        width: min(340px, 76%);
        transition:
          box-shadow 180ms ease,
          border-color 180ms ease,
          opacity 180ms ease;
      }

      .now-artwork img {
        border-radius: inherit;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: relative;
        width: 100%;
        z-index: 1;
      }

      .player.playing .now-artwork {
        border-color: rgb(255 255 255 / 14%);
        filter: none;
        opacity: 1;
        box-shadow:
          0 22px 46px rgb(0 0 0 / 30%);
      }

      .now-artwork.has-art::before {
        background-image: var(--gamma-sonos-cover);
        background-position: center;
        background-size: cover;
        border-radius: inherit;
        content: '';
        filter: blur(28px) saturate(1.35);
        inset: -28px;
        opacity: 0.54;
        pointer-events: none;
        position: absolute;
        transform: scale(1.02);
        z-index: -1;
      }

      .artwork-empty {
        align-items: center;
        color: var(--secondary-text-color, #b7c0ce);
        display: flex;
        font-size: 12px;
        font-weight: 750;
        height: 100%;
        justify-content: center;
      }

      .now-view .metadata {
        width: 100%;
      }

      .progress {
        background: rgb(255 255 255 / 13%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        height: 6px;
        overflow: hidden;
        width: min(340px, 76%);
      }

      .progress-fill {
        background: color-mix(in srgb, var(--primary-text-color, #f4f7fb) 58%, var(--gamma-sonos-accent) 42%);
        border-radius: inherit;
        box-shadow: 0 0 14px rgb(255 255 255 / 16%);
        height: 100%;
        min-width: 0;
        transition: width 180ms ease;
      }

      @keyframes gamma-sonos-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .play-button.loading ha-icon {
        animation: gamma-sonos-spin 900ms linear infinite;
      }

      .play-button.loading,
      .play-button.loading:disabled {
        opacity: 1;
      }

      .player::before {
        background:
          radial-gradient(circle at 22% 0%, color-mix(in srgb, var(--gamma-sonos-accent) 18%, transparent), transparent 38%),
          linear-gradient(180deg, rgb(255 255 255 / 4%), transparent 42%);
        content: '';
        inset: 0;
        opacity: 0.42;
        position: absolute;
      }

      .player > * {
        position: relative;
        z-index: 1;
      }

      .topbar,
      .rooms,
      .now-row,
      .now-speakers,
      .tabs,
      .controls,
      .volume-row,
      .group-row,
      .search-row,
      .result,
      .speaker-row {
        align-items: center;
        display: flex;
        min-width: 0;
      }

      .topbar {
        align-items: start;
        display: grid;
        gap: 8px 12px;
        grid-template-columns: minmax(120px, 0.8fr) minmax(0, 1.2fr);
        justify-content: initial;
      }

      .title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .state-line {
        align-items: center;
        display: flex;
        gap: 8px;
        min-width: 0;
      }

      .name {
        font-size: 18px;
        font-weight: 750;
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }

      .state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 13px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .rooms,
      .tabs {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        padding: 3px;
      }

      .rooms {
        align-items: stretch;
        background: transparent;
        border: 0;
        border-radius: 0;
        display: grid;
        gap: 4px;
        grid-template-columns: 1fr;
        padding: 0;
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

      .now-row {
        gap: 8px;
        justify-content: space-between;
        min-width: 0;
      }

      .now-speakers {
        flex-wrap: wrap;
        gap: 6px;
        min-width: 0;
      }

      .now-label {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 650;
        letter-spacing: 0;
        margin-bottom: -2px;
        text-transform: none;
      }

      .now-chip {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        font-size: 12px;
        font-weight: 750;
        min-height: 22px;
        padding: 0 8px;
      }

      .player-picker {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        display: inline-flex;
        gap: 6px;
        justify-self: end;
        min-width: 0;
        padding: 4px 8px;
      }

      .header-picker {
        border-color: rgb(255 255 255 / 11%);
        justify-self: start;
        max-width: 100%;
        min-height: 32px;
        padding: 5px 9px;
      }

      .player-picker select {
        appearance: none;
        background: transparent;
        border: 0;
        color: var(--primary-text-color, #f4f7fb);
        font: inherit;
        font-size: 12px;
        font-weight: 750;
        max-width: 150px;
        min-width: 0;
        outline: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-picker select {
        font-size: 17px;
        font-weight: 800;
        max-width: 170px;
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
        max-width: min(250px, 72%);
        width: min(250px, 72%);
      }

      .metadata {
        display: grid;
        gap: 4px;
        text-align: center;
      }

      .track {
        font-size: clamp(20px, 4.8vw, 28px);
        font-weight: 800;
        line-height: 1.12;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .artist {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: clamp(13px, 3.3vw, 16px);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .controls {
        gap: 12px;
        justify-content: center;
      }

      .icon-button,
      .play-button {
        align-items: center;
        background:
          radial-gradient(circle at 36% 28%, rgb(255 255 255 / 12%), transparent 28%),
          linear-gradient(145deg, rgb(255 255 255 / 8%), rgb(0 0 0 / 12%));
        border: 1px solid rgb(255 255 255 / 11%);
        border-radius: 999px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 14%),
          inset 0 -10px 18px rgb(0 0 0 / 10%),
          0 10px 20px rgb(0 0 0 / 16%);
        display: inline-flex;
        justify-content: center;
        transition:
          box-shadow 140ms ease,
          transform 140ms ease,
          background 140ms ease;
      }

      .icon-button {
        height: clamp(36px, 8.5vw, 42px);
        width: clamp(36px, 8.5vw, 42px);
      }

      .play-button {
        background:
          radial-gradient(circle at 38% 30%, rgb(255 255 255 / 18%), transparent 28%),
          radial-gradient(circle, color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent), transparent 72%),
          linear-gradient(145deg, color-mix(in srgb, var(--gamma-sonos-accent) 18%, #ffffff 5%), rgb(0 0 0 / 13%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 42%, transparent);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 16%),
          inset 0 -12px 20px rgb(0 0 0 / 12%),
          0 0 28px color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent),
          0 12px 24px rgb(0 0 0 / 20%);
        height: clamp(48px, 11vw, 56px);
        width: clamp(48px, 11vw, 56px);
      }

      .icon-button:active,
      .play-button:active {
        transform: scale(0.96);
      }

      ha-icon {
        --mdc-icon-size: 22px;
        color: color-mix(in srgb, var(--primary-text-color, #f4f7fb) 90%, var(--gamma-sonos-accent) 10%);
        filter: drop-shadow(0 0 8px rgb(255 255 255 / 10%));
      }

      .play-button ha-icon {
        --mdc-icon-size: 28px;
        color: #ffffff;
        filter: drop-shadow(0 0 10px color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent));
      }

      .volume-row {
        gap: 9px;
        min-width: 0;
      }

      input[type='range'] {
        accent-color: var(--gamma-sonos-accent);
        flex: 1;
        min-width: 0;
      }

      .tabs {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .grouping,
      .search,
      .speakers,
      .queue {
        display: grid;
        gap: 8px;
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
        gap: 6px;
        grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
      }

      .group-chip {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-grid;
        font-size: 12px;
        font-weight: 700;
        gap: 2px 7px;
        grid-template-columns: auto minmax(0, 1fr);
        min-height: 42px;
        padding: 7px 8px;
        text-align: left;
      }

      .group-check {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 12%);
        border-radius: 999px;
        display: inline-flex;
        font-size: 12px;
        font-weight: 850;
        height: 22px;
        justify-content: center;
        width: 22px;
      }

      .group-chip.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 10%, rgb(255 255 255 / 5%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent);
        color: var(--primary-text-color, #f4f7fb);
        box-shadow: none;
      }

      .group-chip.active .group-check {
        background: var(--gamma-sonos-accent);
        color: #06100b;
      }

      .group-chip.anchor {
        background: rgb(255 255 255 / 5%);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 22%, rgb(255 255 255 / 8%));
        color: var(--primary-text-color, #f4f7fb);
        opacity: 0.78;
      }

      .group-chip.anchor .group-check {
        background: transparent;
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, rgb(255 255 255 / 10%));
        color: var(--gamma-sonos-accent);
      }

      .group-chip.action {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border-color: rgb(255 255 255 / 9%);
        border-radius: 12px;
        box-shadow: none;
        color: var(--primary-text-color, #f4f7fb);
        gap: 2px 7px;
        min-height: 44px;
        padding: 7px 8px;
      }

      .group-chip.action.continue {
        border-color: rgb(138 176 255 / 30%);
      }

      .group-chip.action.group {
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 36%, transparent);
      }

      .group-chip.action.ungroup {
        border-color: rgb(255 179 107 / 30%);
      }

      .group-chip.action.clear {
        border-color: rgb(255 139 139 / 30%);
      }

      .group-chip.action.continue .group-check {
        background: linear-gradient(145deg, #b8ccff, #769dff);
        color: #07111f;
      }

      .group-chip.action.group .group-check {
        background: linear-gradient(145deg, color-mix(in srgb, var(--gamma-sonos-accent) 72%, #ffffff), var(--gamma-sonos-accent));
        color: #06100b;
      }

      .group-chip.action.ungroup .group-check,
      .group-chip.action.clear .group-check {
        background: linear-gradient(145deg, rgb(255 255 255 / 20%), rgb(0 0 0 / 12%));
        color: #ffffff;
      }

      .group-chip.action .group-check {
        box-shadow: none;
        font-size: 14px;
        font-weight: 900;
        height: 26px;
        width: 26px;
      }

      .group-chip.action .group-name {
        font-size: 12px;
        font-weight: 850;
      }

      .group-chip.action .group-status {
        color: var(--secondary-text-color, #b7c0ce);
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
        font-size: 9.5px;
        font-weight: 750;
        grid-column: 2;
        text-transform: uppercase;
      }

      .group-actions {
        display: grid;
        gap: 6px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .group-actions .continue,
      .group-actions .group {
        grid-column: span 1;
      }

      .group-actions .ungroup,
      .group-actions .clear {
        min-height: 44px;
      }

      .speaker-list {
        display: grid;
        gap: 8px;
      }

      .section-toggle {
        align-items: center;
        appearance: none;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        color: var(--primary-text-color, #f4f7fb);
        cursor: pointer;
        display: flex;
        font: inherit;
        font-size: 13px;
        font-weight: 800;
        justify-content: space-between;
        letter-spacing: 0.04em;
        min-height: 42px;
        padding: 0 12px;
        text-transform: uppercase;
      }

      .speaker-row {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 14px;
        gap: 10px;
        padding: 8px;
      }

      .speaker-name {
        flex: 0 0 min(112px, 36%);
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
        min-width: 0;
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
        gap: 12px;
        max-height: 420px;
        overflow: auto;
      }

      .favorites {
        display: grid;
        gap: 7px;
      }

      .result-section {
        display: grid;
        gap: 7px;
      }

      .section-header {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .result {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        gap: 10px;
        min-width: 0;
        padding: 8px;
      }

      .result.clickable {
        cursor: pointer;
      }

      .result.clickable:active {
        transform: scale(0.992);
      }

      .result-art {
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 68%),
          rgb(255 255 255 / 6%);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 8px;
        flex: 0 0 auto;
        height: 42px;
        width: 42px;
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

      .result-actions button {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border-radius: 999px;
        font-size: 12px;
        font-weight: 750;
        min-height: 30px;
        padding: 0 10px;
      }

      .result-actions {
        display: inline-flex;
        flex: 0 0 auto;
        gap: 6px;
      }

      .result-actions .now {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 28%, transparent);
        color: var(--primary-text-color, #f4f7fb);
      }

      .result-actions .favorite-toggle,
      .favorite-toggle {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        display: inline-flex;
        height: 30px;
        justify-content: center;
        min-height: 30px;
        padding: 0;
        width: 30px;
      }

      .favorite-toggle ha-icon {
        --mdc-icon-size: 16px;
      }

      .favorite-toggle.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 30%, transparent);
      }

      .artist-header {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 16px;
        display: flex;
        gap: 12px;
        padding: 10px;
      }

      .artist-header .result-art {
        height: 64px;
        width: 64px;
      }

      .current-group {
        display: grid;
        gap: 8px;
      }

      .current-member {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        display: flex;
        gap: 8px;
        justify-content: space-between;
        padding: 8px 10px;
      }

      .queue-header {
        align-items: center;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        min-width: 0;
      }

      .queue-list {
        display: grid;
        gap: 8px;
        max-height: 420px;
        overflow: auto;
      }

      .top-controls {
        align-items: start;
        display: grid;
        gap: 4px;
        justify-items: end;
        min-width: 0;
      }

      .header-state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        font-weight: 650;
        line-height: 1.1;
        max-width: 100%;
        overflow: hidden;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @container (max-width: 340px) {
        .topbar {
          gap: 6px;
        }

        .name {
          font-size: 16px;
        }

        .state {
          font-size: 12px;
        }

        .top-controls {
          gap: 6px;
        }

        .player-picker {
          gap: 4px;
          padding: 4px 6px;
        }

        .player-picker select {
          max-width: 88px;
        }
      }

      .next-up {
        color: var(--primary-text-color, #f4f7fb);
        display: grid;
        font-size: 12px;
        font-weight: 720;
        gap: 2px;
        justify-items: end;
        line-height: 1.15;
        max-width: min(270px, 100%);
        min-width: 0;
        overflow: hidden;
        text-align: right;
      }

      .next-up .next-title {
        color: var(--primary-text-color, #f4f7fb);
        display: block;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      .next-up .next-label {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .live-activity-row {
        display: inline-flex;
        gap: 8px;
        justify-content: center;
        width: 100%;
      }

      .small-action {
        appearance: none;
        background: rgb(255 255 255 / 7%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        color: inherit;
        cursor: pointer;
        font: inherit;
        font-size: 12px;
        font-weight: 750;
        min-height: 28px;
        padding: 0 10px;
      }

      .live-action {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 18%, rgb(255 255 255 / 7%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 28%, rgb(255 255 255 / 10%));
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
      entities: e.filter((i) => i.startsWith("media_player."))
    };
  }
  static async getConfigElement() {
    return document.createElement("gamma-sonos-player-card-editor");
  }
  setConfig(t) {
    this.config = { ...y, ...t }, this.selectedEntityId = this.config.entity || window.localStorage.getItem(N) || "", this.playbackMemory = this.readPlaybackMemory(), this.favoriteItems = this.readFavoriteItems(), this.style.setProperty(
      "--gamma-sonos-width",
      this.config.fill_container ? "100%" : this.config.width ?? y.width
    ), this.style.setProperty("--gamma-sonos-height", this.config.height ?? y.height), this.style.setProperty(
      "--gamma-sonos-background",
      this.config.background ?? y.background
    ), this.style.setProperty(
      "--gamma-sonos-accent",
      this.config.accent_color ?? y.accent_color
    );
  }
  updated() {
    this.rememberPlaybackState(), this.scheduleInitialQueueRefresh(), this.scheduleQueueRefreshForPlayback(), this.scheduleLiveActivityUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.searchTimer), window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), window.clearTimeout(this.liveActivityUpdateTimer);
  }
  getCardSize() {
    return 8;
  }
  getGridOptions() {
    return {
      rows: 7,
      columns: 6,
      min_rows: 5,
      max_rows: 12,
      min_columns: 4,
      max_columns: 12
    };
  }
  get mediaPlayers() {
    var t;
    return Object.values(((t = this.hass) == null ? void 0 : t.states) ?? {}).filter((e) => !!e).filter((e) => e.entity_id.startsWith("media_player."));
  }
  isDiscoverablePlayer(t) {
    const e = String(t.attributes.platform ?? "").toLowerCase(), i = String(t.attributes.device_class ?? "").toLowerCase(), s = String(t.attributes.icon ?? "").toLowerCase(), r = String(t.attributes.source ?? "").toLowerCase();
    return i === "speaker" || s.includes("speaker") || r.includes("music assistant") || t.attributes.mass_player_type === "player" || e.includes("sonos") || e.includes("music_assistant") || t.entity_id.includes("sonos") || t.entity_id.includes("music_assistant");
  }
  dedupePlayers(t) {
    const e = /* @__PURE__ */ new Set();
    return t.filter((i) => e.has(i.entity_id) ? !1 : (e.add(i.entity_id), !0));
  }
  roomKey(t) {
    return this.normalizedRoomName(String(t.attributes.friendly_name ?? t.entity_id));
  }
  normalizedRoomName(t) {
    return t.trim().toLowerCase().replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b(ma|mass)\b/g, "").replace(/\b(sonos|music assistant|speaker|player)\b/g, "").replace(/\s+/g, " ").trim();
  }
  preferredRoomPlayer(t, e) {
    return v(e) && !v(t) || !w(e) && w(t) ? e : t;
  }
  dedupeRoomPlayers(t) {
    const e = /* @__PURE__ */ new Map();
    return t.forEach((i) => {
      const s = this.roomKey(i), r = e.get(s);
      e.set(s, r ? this.preferredRoomPlayer(r, i) : i);
    }), [...e.values()];
  }
  get allPlayers() {
    const t = [
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? []
    ];
    if (t.length > 0) {
      const e = t.map((s) => {
        var r;
        return (r = this.hass) == null ? void 0 : r.states[s];
      }).filter((s) => !!s), i = e.map((s) => this.matchingMusicAssistantPlayer(s)).filter((s) => !!s);
      return this.dedupeRoomPlayers(this.dedupePlayers([...e, ...i]));
    }
    return this.dedupeRoomPlayers(this.mediaPlayers.filter((e) => this.isDiscoverablePlayer(e)));
  }
  get currentlyPlayingPlayer() {
    return this.allPlayers.find((t) => t.state === "playing");
  }
  get currentlyPlayingPlayers() {
    return this.allPlayers.filter((t) => t.state === "playing");
  }
  get activePlayer() {
    var e;
    return ((e = this.hass) == null ? void 0 : e.states[this.selectedEntityId]) ?? this.currentlyPlayingPlayer ?? this.allPlayers[0];
  }
  get activeEntityId() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.entity_id) ?? this.selectedEntityId;
  }
  get playbackPlayer() {
    const t = this.activePlayer;
    return t && (t.state === "playing" || t.attributes.media_title || t.attributes.entity_picture || t.attributes.entity_picture_local) ? t : void 0;
  }
  get playbackEntityId() {
    var t;
    return ((t = this.playbackPlayer) == null ? void 0 : t.entity_id) ?? this.activeEntityId;
  }
  get activeName() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.attributes.friendly_name) ?? this.activeEntityId;
  }
  get artworkUrl() {
    var t, e, i, s;
    return String(
      ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture) || ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture_local) || ((i = this.playbackPlayer) == null ? void 0 : i.attributes.media_image_url) || ((s = this.activeMemory) == null ? void 0 : s.artwork) || ""
    );
  }
  get isPlaying() {
    var t;
    return ((t = this.playbackPlayer) == null ? void 0 : t.state) === "playing";
  }
  get activeMemory() {
    return this.playbackMemory[this.activeEntityId];
  }
  get volume() {
    var t;
    return Math.round(_((t = this.activePlayer) == null ? void 0 : t.attributes.volume_level, 0) * 100);
  }
  get progressPercent() {
    var s, r, a;
    const t = _((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_duration, 0);
    let e = _((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const i = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (t <= 0 || e < 0)
      return 0;
    if (this.isPlaying && i) {
      const n = Date.parse(i);
      Number.isFinite(n) && (e += Math.max(0, (Date.now() - n) / 1e3));
    }
    return Math.max(0, Math.min(100, e / t * 100));
  }
  readPlaybackMemory() {
    try {
      const t = JSON.parse(window.localStorage.getItem(mt) || "{}");
      return typeof t == "object" && t ? t : {};
    } catch {
      return {};
    }
  }
  writePlaybackMemory(t) {
    try {
      window.localStorage.setItem(mt, JSON.stringify(t));
    } catch {
    }
  }
  readFavoriteItems() {
    try {
      const t = JSON.parse(window.localStorage.getItem(gt) || "[]");
      return Array.isArray(t) ? t.map((e) => typeof e == "object" && e ? e : void 0).filter((e) => !!(e != null && e.name || e != null && e.uri)).slice(0, 60) : [];
    } catch {
      return [];
    }
  }
  writeFavoriteItems(t) {
    try {
      window.localStorage.setItem(gt, JSON.stringify(t.slice(0, 60)));
    } catch {
    }
  }
  favoriteKey(t) {
    const e = t.media_type || t.type || "track", i = this.itemArtist(t).toLowerCase(), s = String(t.name ?? "").toLowerCase(), r = String(t.uri ?? "").toLowerCase();
    return `${e}:${r || `${s}:${i}`}`;
  }
  isFavorite(t) {
    const e = this.favoriteKey(t);
    return this.favoriteItems.some((i) => this.favoriteKey(i) === e);
  }
  normalizedFavorite(t) {
    var i;
    const e = t.media_type || t.type || "track";
    return {
      name: t.name,
      uri: t.uri,
      media_type: e,
      type: e,
      artists: t.artists,
      artist: this.itemArtist(t),
      album: t.album,
      image: t.image || t.thumb || ((i = t.album) == null ? void 0 : i.image),
      thumb: t.thumb
    };
  }
  toggleFavorite(t) {
    const e = this.favoriteKey(t), s = this.favoriteItems.some((r) => this.favoriteKey(r) === e) ? this.favoriteItems.filter((r) => this.favoriteKey(r) !== e) : [this.normalizedFavorite(t), ...this.favoriteItems.filter((r) => this.favoriteKey(r) !== e)];
    this.favoriteItems = s.slice(0, 60), this.writeFavoriteItems(this.favoriteItems);
  }
  rememberPlaybackState() {
    const t = this.activePlayer, e = String((t == null ? void 0 : t.attributes.media_title) ?? ""), i = String(
      (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || ""
    ), s = String(
      (t == null ? void 0 : t.attributes.entity_picture) || (t == null ? void 0 : t.attributes.entity_picture_local) || (t == null ? void 0 : t.attributes.media_image_url) || ""
    );
    if (!t || !e && !s)
      return;
    const r = this.playbackMemory[t.entity_id];
    if (r && r.title === e && r.artist === i && r.artwork === s && r.state === t.state)
      return;
    const a = {
      ...this.playbackMemory,
      [t.entity_id]: {
        title: e,
        artist: i,
        artwork: s,
        state: t.state,
        updatedAt: Date.now()
      }
    };
    this.playbackMemory = a, this.writePlaybackMemory(a);
  }
  scheduleQueueRefreshForPlayback() {
    var s;
    const t = this.playbackPlayer, e = this.queueTargetEntityId();
    if (!t || t.state !== "playing" || !e || !((s = this.hass) != null && s.callWS))
      return;
    const i = [
      e,
      t.attributes.media_content_id,
      t.attributes.media_title
    ].join(":");
    i !== this.lastQueueSignature && (this.lastQueueSignature = i, window.clearTimeout(this.queueRefreshTimer), this.queueRefreshTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: !0 });
    }, 700));
  }
  scheduleInitialQueueRefresh() {
    var e;
    const t = this.queueTargetEntityId();
    !t || !((e = this.hass) != null && e.callWS) || this.queueLoading || this.lastInitialQueueEntityId !== t && (this.lastInitialQueueEntityId = t, window.clearTimeout(this.initialQueueRefreshTimer), this.initialQueueRefreshTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: !0 });
    }, 500));
  }
  get groupMembers() {
    var e;
    const t = (e = this.activePlayer) == null ? void 0 : e.attributes.group_members;
    return Array.isArray(t) ? t : [this.activeEntityId].filter(Boolean);
  }
  get groupablePlayers() {
    const t = v(this.activePlayer), e = /* @__PURE__ */ new Set();
    return this.allPlayers.filter((i) => {
      const s = this.matchingMusicAssistantPlayer(i), r = Ht(i) || v(i) || !!s, a = t && s ? s.entity_id : i.entity_id;
      return !r || e.has(a) ? !1 : (e.add(a), !0);
    });
  }
  matchingMusicAssistantPlayer(t) {
    if (!t)
      return;
    if (v(t))
      return t;
    const [, e = ""] = t.entity_id.split("."), i = [
      `media_player.${e}_2`,
      `media_player.ma_${e}`,
      `media_player.mass_${e}`,
      `media_player.${e}_music_assistant`
    ], s = this.normalizedRoomName(String(t.attributes.friendly_name ?? t.entity_id));
    return this.mediaPlayers.find((r) => i.includes(r.entity_id) && v(r)) ?? this.mediaPlayers.find((r) => v(r) && this.normalizedRoomName(String(r.attributes.friendly_name ?? r.entity_id)) === s);
  }
  resolveGroupPlayers(t, e) {
    const i = [t, ...e], s = i.some((c) => v(c)), r = i.some((c) => !v(c));
    if (!s || !r)
      return { anchor: t, members: e };
    const a = this.matchingMusicAssistantPlayer(t), n = e.map((c) => this.matchingMusicAssistantPlayer(c)).filter((c) => !!c);
    return a ? {
      anchor: a,
      members: n.filter((c) => c.entity_id !== a.entity_id)
    } : {
      anchor: t,
      members: [],
      error: `Use the Music Assistant version of ${t.attributes.friendly_name ?? t.entity_id} as the main speaker for mixed groups.`
    };
  }
  service(t, e, i, s) {
    var r;
    return (r = this.hass) == null ? void 0 : r.callService(t, e, i, s);
  }
  mediaService(t, e = {}, i = this.activeEntityId) {
    var r;
    const s = (r = this.hass) == null ? void 0 : r.states[i];
    if (!(!i || w(s)))
      return this.service("media_player", t, e, {
        entity_id: i
      });
  }
  liveActivityNotifyService() {
    var e;
    return (((e = this.config.live_activity_notify_service) == null ? void 0 : e.trim()) ?? "").replace(/^notify\./, "");
  }
  liveActivityTag() {
    var e;
    return (((e = this.config.live_activity_tag) == null ? void 0 : e.trim()) || y.live_activity_tag).replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 64) || "gamma-sonos-player";
  }
  liveActivityMessage(t, e) {
    const i = this.activeName || "Music";
    return t === "No music selected" ? `${i} is ready` : e && e !== "Ready" ? `${t} — ${e} • ${i}` : `${t} • ${i}`;
  }
  liveActivityPayload(t, e) {
    var a;
    const i = Math.round(_((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_duration, 0));
    let s = Math.round(this.progressPercent / 100 * i);
    (!Number.isFinite(s) || s < 0) && (s = 0);
    const r = this.isPlaying ? "PLAY" : t === "No music selected" ? "IDLE" : "PAUSE";
    return {
      tag: this.liveActivityTag(),
      title: this.config.name || this.activeName || "Music",
      message: this.liveActivityMessage(t, e),
      critical_text: r,
      progress: i > 0 ? s : void 0,
      progress_max: i > 0 ? i : void 0,
      notification_icon: this.isPlaying ? "mdi:music-circle" : "mdi:speaker",
      notification_icon_color: this.config.accent_color ?? y.accent_color
    };
  }
  sendLiveActivity(t, e) {
    const i = this.liveActivityNotifyService();
    if (!i || this.liveActivityPending) {
      i || (this.liveActivityError = "Set live_activity_notify_service to your iPhone notify service.");
      return;
    }
    this.liveActivityPending = !0, this.liveActivityError = "";
    const s = this.liveActivityPayload(t, e), r = this.service("notify", i, {
      title: s.title,
      message: String(s.message ?? "Music status"),
      data: {
        command: "live_activity",
        live_update: !0,
        ...s
      }
    }), a = () => {
      this.liveActivityPending = !1;
    };
    if (r && typeof r.then == "function") {
      r.catch((n) => {
        this.liveActivityError = n instanceof Error ? n.message : "Live Activity update failed.";
      }).finally(a);
      return;
    }
    window.setTimeout(a, 600);
  }
  endLiveActivity() {
    const t = this.liveActivityNotifyService();
    if (!t || this.liveActivityPending) {
      t || (this.liveActivityError = "Set live_activity_notify_service to your iPhone notify service.");
      return;
    }
    this.liveActivityPending = !0, this.liveActivityError = "", this.lastLiveActivitySignature = "";
    const e = this.service("notify", t, {
      message: "end_live_activity",
      data: {
        command: "end_live_activity",
        tag: this.liveActivityTag()
      }
    }), i = () => {
      this.liveActivityPending = !1;
    };
    if (e && typeof e.then == "function") {
      e.catch((s) => {
        this.liveActivityError = s instanceof Error ? s.message : "Live Activity end failed.";
      }).finally(i);
      return;
    }
    window.setTimeout(i, 600);
  }
  scheduleLiveActivityUpdate() {
    if (!this.config.live_activity_enabled || !this.config.live_activity_auto_update)
      return;
    const t = this.liveActivityNotifyService(), e = this.playbackPlayer;
    if (!t || !e)
      return;
    const i = [
      this.activeEntityId,
      e.state,
      e.attributes.media_title,
      e.attributes.media_artist,
      Math.round(this.progressPercent / 5)
    ].join(":");
    i !== this.lastLiveActivitySignature && (this.lastLiveActivitySignature = i, window.clearTimeout(this.liveActivityUpdateTimer), this.liveActivityUpdateTimer = window.setTimeout(() => {
      var a, n;
      const s = e.attributes.media_title || ((a = this.activeMemory) == null ? void 0 : a.title) || "No music selected", r = e.attributes.media_artist || e.attributes.media_album_name || e.attributes.source || ((n = this.activeMemory) == null ? void 0 : n.artist) || "Ready";
      this.sendLiveActivity(s, r);
    }, 900));
  }
  renderLiveActivityControls(t, e) {
    if (!this.config.live_activity_enabled)
      return h;
    const i = this.liveActivityNotifyService();
    return u`
      <div class="live-activity-row">
        <button
          class="small-action live-action"
          ?disabled=${!i || this.liveActivityPending}
          title=${i ? "Update iPhone Live Activity" : "Configure live_activity_notify_service"}
          @click=${() => this.sendLiveActivity(t, e)}
        >
          ${this.liveActivityPending ? "Updating…" : "Update iPhone Live"}
        </button>
      </div>
      ${this.liveActivityError ? u`<div class="error">${this.liveActivityError}</div>` : h}
      <div class="hint">Shows song, artist, volume, playback state, and progress on iOS. Album art needs a custom HA iOS widget because the stock Live Activity payload has no artwork field.</div>
    `;
  }
  playPause() {
    if (this.playbackPending)
      return;
    this.playbackError = "", this.playbackPending = !0;
    const t = this.mediaService(
      this.isPlaying ? "media_pause" : "media_play",
      {},
      this.isPlaying ? this.playbackEntityId : this.activeEntityId
    ), e = () => {
      this.playbackPending = !1;
    };
    if (t && typeof t.then == "function") {
      t.catch((i) => {
        this.playbackError = i instanceof Error ? i.message : "Playback control failed.";
      }).finally(e);
      return;
    }
    window.setTimeout(e, 650);
  }
  transportService(t) {
    var a;
    if (this.transportPending)
      return;
    const e = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer, i = (e == null ? void 0 : e.entity_id) ?? this.playbackEntityId;
    if (!i || w((a = this.hass) == null ? void 0 : a.states[i]))
      return;
    this.transportPending = !0;
    const s = this.service("media_player", t, {}, {
      entity_id: i
    }), r = () => {
      this.transportPending = !1, t === "media_next_track" && this.refreshQueueAfterPlayback();
    };
    if (s && typeof s.then == "function") {
      s.catch((n) => {
        this.playbackError = n instanceof Error ? n.message : "Playback control failed.";
      }).finally(r);
      return;
    }
    window.setTimeout(r, 650);
  }
  setVolume(t) {
    this.setPlayerVolume(this.isPlaying ? this.playbackEntityId : this.activeEntityId, t);
  }
  setPlayerVolume(t, e) {
    t && this.service("media_player", "volume_set", {
      volume_level: Math.max(0, Math.min(1, Number(e) / 100))
    }, {
      entity_id: t
    });
  }
  toggleMute() {
    this.togglePlayerMute(this.activeEntityId);
  }
  togglePlayerMute(t) {
    var i;
    const e = (i = this.hass) == null ? void 0 : i.states[t];
    !e || w(e) || this.service("media_player", "volume_mute", {
      is_volume_muted: !e.attributes.is_volume_muted
    }, {
      entity_id: t
    });
  }
  toggleGroupSelection(t) {
    if (this.groupError = "", this.pendingGroupIds.includes(t)) {
      this.pendingGroupIds = this.pendingGroupIds.filter((e) => e !== t);
      return;
    }
    this.pendingGroupIds = [...this.pendingGroupIds, t];
  }
  groupSelected() {
    if (this.groupError = "", this.groupPending || !this.activeEntityId || this.pendingGroupIds.length === 0)
      return;
    const t = this.activePlayer, e = this.pendingGroupIds.filter((n) => n !== this.activeEntityId).map((n) => {
      var c;
      return (c = this.hass) == null ? void 0 : c.states[n];
    }).filter((n) => n ? this.groupablePlayers.some((c) => c.entity_id === n.entity_id) : !1);
    if (!t || e.length === 0)
      return;
    const i = this.resolveGroupPlayers(t, e);
    if (i.error) {
      this.groupError = i.error;
      return;
    }
    const s = i.members.map((n) => n.entity_id).filter((n, c, d) => n !== i.anchor.entity_id && d.indexOf(n) === c);
    if (s.length === 0) {
      this.groupError = "Those selected speakers cannot be grouped with this main speaker.";
      return;
    }
    this.groupPending = !0;
    const r = this.service("media_player", "join", {
      group_members: s
    }, {
      entity_id: i.anchor.entity_id
    }), a = () => {
      this.selectedEntityId = i.anchor.entity_id, this.selectedGroupIds = [i.anchor.entity_id, ...s], this.pendingGroupIds = [], window.localStorage.setItem(N, i.anchor.entity_id);
    };
    if (r && typeof r.then == "function") {
      r.then(a).catch((n) => {
        this.groupError = n instanceof Error ? n.message : "Grouping failed.";
      }).finally(() => {
        this.groupPending = !1;
      });
      return;
    }
    a(), window.setTimeout(() => {
      this.groupPending = !1;
    }, 700);
  }
  continueInSelectedRoom() {
    var d, p;
    this.groupError = "", this.playbackError = "";
    const t = this.pendingGroupIds.map((l) => {
      var m;
      return (m = this.hass) == null ? void 0 : m.states[l];
    }).filter((l) => l ? l.entity_id !== this.playbackEntityId && l.entity_id !== this.activeEntityId : !1);
    if (t.length !== 1) {
      this.groupError = "Select exactly one room to transfer playback.";
      return;
    }
    const e = t[0], i = this.playbackPlayer, s = ((d = this.matchingMusicAssistantPlayer(i)) == null ? void 0 : d.entity_id) ?? this.playbackEntityId, r = ((p = this.matchingMusicAssistantPlayer(e)) == null ? void 0 : p.entity_id) ?? (e == null ? void 0 : e.entity_id);
    if (!r || !s)
      return;
    this.groupPending = !0;
    const a = this.service("music_assistant", "transfer_queue", {
      source_player: s,
      auto_play: !0
    }, {
      entity_id: r
    }), n = () => {
      this.selectedEntityId = r, this.pendingGroupIds = [], this.queueItems = [], this.queueError = "", this.lastInitialQueueEntityId = "", window.localStorage.setItem(N, r), this.refreshQueueAfterPlayback();
    }, c = () => {
      this.groupPending = !1;
    };
    if (a && typeof a.then == "function") {
      a.then(n).catch(() => {
        const l = i, m = String((l == null ? void 0 : l.attributes.media_content_id) ?? ""), g = String((l == null ? void 0 : l.attributes.media_content_type) ?? "music");
        if (!m) {
          this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
          return;
        }
        this.service("music_assistant", "play_media", {
          media_id: m,
          media_type: g,
          enqueue: "play"
        }, {
          entity_id: r
        }), n();
      }).finally(c);
      return;
    }
    n(), window.setTimeout(c, 700);
  }
  ungroupActive() {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const t = this.service("media_player", "unjoin", {}, {
      entity_id: this.activeEntityId
    }), e = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    if (t && typeof t.then == "function") {
      t.finally(e);
      return;
    }
    window.setTimeout(e, 700);
  }
  ungroupAll() {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const t = this.groupMembers.map((i) => this.service("media_player", "unjoin", {}, { entity_id: i })).filter((i) => !!(i && typeof i.then == "function")), e = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    if (t.length > 0) {
      Promise.allSettled(t).finally(e);
      return;
    }
    window.setTimeout(e, 700);
  }
  removeFromGroup(t) {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const e = this.service("media_player", "unjoin", {}, { entity_id: t }), i = () => {
      this.selectedGroupIds = this.selectedGroupIds.filter((s) => s !== t), this.pendingGroupIds = this.pendingGroupIds.filter((s) => s !== t), this.groupPending = !1;
    };
    if (e && typeof e.then == "function") {
      e.finally(i);
      return;
    }
    window.setTimeout(i, 700);
  }
  musicAssistantSearchData(t, e = {}) {
    var s;
    const i = {
      name: t,
      limit: _(this.config.search_limit, y.search_limit),
      library_only: !!(this.config.library_only ?? y.library_only),
      ...e
    };
    return this.config.music_assistant_config_entry_id && (i.config_entry_id = this.config.music_assistant_config_entry_id), !i.media_type && ((s = this.config.search_media_types) != null && s.length) && (i.media_type = this.config.search_media_types), i;
  }
  async fetchMusicAssistantSearch(t) {
    var i;
    if (!((i = this.hass) != null && i.callWS))
      throw new Error("This Home Assistant frontend does not expose service responses here.");
    const e = await this.hass.callWS({
      type: "call_service",
      domain: "music_assistant",
      service: "search",
      service_data: t,
      return_response: !0
    });
    return this.extractSearchResults(e);
  }
  async searchMusicAssistant(t = !1) {
    var s, r;
    const e = this.query.trim();
    if (!e || !((s = this.hass) != null && s.callWS)) {
      (r = this.hass) != null && r.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    const i = ++this.searchRequestId;
    this.searching = !0, this.searchError = "";
    try {
      const a = await this.fetchMusicAssistantSearch(this.musicAssistantSearchData(e));
      if (i !== this.searchRequestId)
        return;
      this.searchResults = a, t || (this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "");
    } catch (a) {
      i === this.searchRequestId && (this.searchError = a instanceof Error ? a.message : "Search failed");
    } finally {
      i === this.searchRequestId && (this.searching = !1);
    }
  }
  scheduleSearch() {
    if (window.clearTimeout(this.searchTimer), this.query.trim().length < 2) {
      this.searching = !1;
      return;
    }
    this.searchTimer = window.setTimeout(() => {
      this.searchMusicAssistant();
    }, 350);
  }
  openArtist(t) {
    this.selectedArtist = t, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "", this.browserView = "artist", this.query = t.name ?? this.query, this.searchMusicAssistant(!0);
  }
  openAlbum(t) {
    this.selectedAlbum = t, this.selectedArtist = void 0, this.selectedPlaylist = void 0, this.browserView = "album", this.query = t.name ?? this.query, this.loadAlbumTracks(t);
  }
  openPlaylist(t) {
    this.selectedPlaylist = t, this.selectedArtist = void 0, this.selectedAlbum = void 0, this.browserView = "playlist", this.query = t.name ?? this.query, this.loadPlaylistTracks(t);
  }
  async loadAlbumTracks(t) {
    const e = ++this.albumRequestId;
    this.albumTracks = [], this.albumError = "", this.albumLoading = !0;
    try {
      let i = [];
      try {
        i = await this.browseMediaTracks(t, "album");
      } catch {
        i = [];
      }
      if (i.length === 0 && (i = await this.searchAlbumTracks(t)), e !== this.albumRequestId)
        return;
      this.albumTracks = this.dedupeQueueItems(i), this.albumTracks.length === 0 && (this.albumError = "No tracks found for this album.");
    } catch (i) {
      e === this.albumRequestId && (this.albumError = i instanceof Error ? i.message : "Album tracks are unavailable.");
    } finally {
      e === this.albumRequestId && (this.albumLoading = !1);
    }
  }
  async browseMediaTracks(t, e) {
    var r;
    if (!((r = this.hass) != null && r.callWS) || !t.uri)
      return [];
    const i = this.queueTargetEntityId() || this.activeEntityId;
    if (!i)
      return [];
    const s = await this.hass.callWS({
      type: "media_player/browse_media",
      entity_id: i,
      media_content_id: t.uri,
      media_content_type: e
    });
    return this.extractBrowseTracks(s, t);
  }
  async searchAlbumTracks(t) {
    const e = t.name ?? "", i = this.itemArtist(t), s = i || e;
    if (!s)
      return [];
    const r = this.musicAssistantSearchData(s, {
      album: e,
      limit: Math.max(40, _(this.config.search_limit, y.search_limit)),
      media_type: ["track"]
    });
    return i && (r.artist = i), this.fetchMusicAssistantSearch(r).then((a) => a.filter((n) => (n.media_type || n.type) === "track"));
  }
  async loadPlaylistTracks(t) {
    const e = ++this.playlistRequestId;
    this.playlistTracks = [], this.playlistError = "", this.playlistLoading = !0;
    try {
      const i = await this.browseMediaTracks(t, "playlist");
      if (e !== this.playlistRequestId)
        return;
      this.playlistTracks = this.dedupeQueueItems(i), this.playlistTracks.length === 0 && (this.playlistError = "No tracks found for this playlist.");
    } catch (i) {
      e === this.playlistRequestId && (this.playlistError = i instanceof Error ? i.message : "Playlist tracks are unavailable.");
    } finally {
      e === this.playlistRequestId && (this.playlistLoading = !1);
    }
  }
  extractBrowseTracks(t, e) {
    var c;
    const i = [], s = e.name ?? "", r = this.itemArtist(e), a = e.image || e.thumb || ((c = e.album) == null ? void 0 : c.image) || "", n = (d, p = 0) => {
      if (typeof d != "object" || !d)
        return;
      const l = d, m = this.normalizedMediaType(
        l.media_content_type || l.media_class,
        "track"
      ), g = String(l.media_content_id ?? ""), f = String(l.title ?? l.name ?? ""), x = Array.isArray(l.children) ? l.children : [];
      p > 0 && !!g && !!f && (m === "track" || String(l.media_class ?? "").toLowerCase().includes("track") || l.can_play && !l.can_expand && m !== "album") && i.push({
        name: f,
        uri: g,
        media_type: "track",
        type: "track",
        artist: r,
        album: s ? { name: s, image: a } : e.album,
        image: String(l.thumbnail ?? l.image ?? a) || void 0
      }), x.forEach((kt) => n(kt, p + 1));
    };
    return n(t), i;
  }
  extractSearchResults(t) {
    const i = t.response ?? t, s = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return s.forEach((a) => {
      const n = i[a];
      Array.isArray(n) && n.forEach((c) => {
        typeof c == "object" && c && r.push(this.normalizeSearchItem(c, a === "tracks" ? "track" : a.slice(0, -1)));
      });
    }), r;
  }
  normalizedMediaType(t, e) {
    const i = String(t ?? "").toLowerCase();
    return i.includes("album") ? "album" : i.includes("artist") ? "artist" : i.includes("playlist") ? "playlist" : i.includes("radio") ? "radio" : i.includes("podcast") ? "podcast" : i.includes("track") || i.includes("song") ? "track" : e;
  }
  normalizeSearchItem(t, e) {
    const i = typeof t.album == "object" && t.album ? t.album : void 0, s = Array.isArray(t.artists) ? t.artists : void 0, r = this.normalizedMediaType(t.media_type ?? t.type, e), a = String(
      t.image ?? t.thumb ?? t.thumbnail ?? t.image_url ?? t.uri_image ?? (i == null ? void 0 : i.image) ?? ""
    );
    return {
      ...t,
      name: String(t.name ?? t.title ?? t.media_title ?? t.uri ?? ""),
      uri: String(t.uri ?? t.media_id ?? t.media_content_id ?? "") || void 0,
      media_type: r,
      type: r,
      artists: s,
      artist: String(t.artist ?? t.media_artist ?? (s == null ? void 0 : s.map((n) => n.name).filter(Boolean).join(", ")) ?? ""),
      album: i,
      image: a || void 0
    };
  }
  queueTargetEntityId() {
    const t = this.matchingMusicAssistantPlayer(this.activePlayer);
    return t && !w(t) ? t.entity_id : "";
  }
  queueServiceAttempts(t) {
    return [
      {
        domain: "music_assistant",
        service: "get_queue",
        data: { entity_id: t }
      }
    ];
  }
  async refreshQueue(t = {}) {
    var i;
    const e = this.queueTargetEntityId();
    if (!e || !((i = this.hass) != null && i.callWS)) {
      this.queueItems = [], this.queueError = e ? "Queue responses are not available in this Home Assistant view." : "Queue is only available for Music Assistant speaker entities.";
      return;
    }
    t.silent || (this.queueLoading = !0), this.queueError = "";
    try {
      const s = [];
      let r = !1;
      for (const a of this.queueServiceAttempts(e))
        try {
          const n = await this.hass.callWS({
            type: "call_service",
            domain: a.domain,
            service: a.service,
            service_data: a.data,
            return_response: !0
          });
          r = !0;
          const c = this.extractQueueItems(n, e);
          if (c.length > 0) {
            this.queueItems = c, this.queueError = "";
            return;
          }
        } catch (n) {
          s.push(n instanceof Error ? n.message : `${a.domain}.${a.service} failed.`);
        }
      this.queueItems = [], this.queueError = r ? "" : s.length > 0 ? s[s.length - 1] : "Queue is empty or unavailable for this Music Assistant player.";
    } finally {
      t.silent || (this.queueLoading = !1);
    }
  }
  extractQueueItems(t, e = "") {
    const i = this.responsePayload(t), s = this.queueResponseRoots(i, e);
    for (const r of s) {
      const a = this.normalizeQueueItem(this.valueAtPath(r, ["current_item"])), n = [
        Array.isArray(r) ? r : void 0,
        this.valueAtPath(r, ["next_items"]),
        this.valueAtPath(r, ["upcoming_items"]),
        this.valueAtPath(r, ["items"]),
        this.valueAtPath(r, ["queue_items"]),
        this.valueAtPath(r, ["queue"]),
        this.valueAtPath(r, ["next_item"])
      ];
      for (const c of n) {
        const d = this.queueItemsFromUnknown(c).filter((p) => !a || !this.sameQueueItem(p, a));
        if (d.length > 0)
          return this.dedupeQueueItems(d);
      }
    }
    return [];
  }
  queueResponseRoots(t, e) {
    const i = [t];
    if (typeof t == "object" && t) {
      const s = t;
      e && s[e] && i.unshift(s[e]), Object.entries(s).forEach(([r, a]) => {
        (r.startsWith("media_player.") || typeof a == "object" && a && ("current_item" in a || "next_item" in a || "queue_items" in a || "items" in a)) && i.push(a);
      });
    }
    return i.filter((s, r, a) => a.indexOf(s) === r);
  }
  responsePayload(t) {
    return typeof t == "object" && t && "response" in t ? t.response ?? t : t;
  }
  valueAtPath(t, e) {
    return e.reduce((i, s) => {
      if (!(typeof i != "object" || !i))
        return i[s];
    }, t);
  }
  queueItemsFromUnknown(t) {
    if (Array.isArray(t))
      return t.map((e) => this.normalizeQueueItem(e)).filter((e) => !!e);
    if (typeof t == "object" && t) {
      const e = t, i = ["next_items", "upcoming_items", "items", "queue_items", "queue", "next_item"];
      for (const r of i) {
        const a = this.queueItemsFromUnknown(e[r]);
        if (a.length > 0)
          return a;
      }
      const s = this.normalizeQueueItem(e);
      if (s)
        return [s];
      for (const r of Object.values(e)) {
        const a = this.queueItemsFromUnknown(r);
        if (a.length > 0)
          return a;
      }
    }
    return [];
  }
  isQueueContainer(t) {
    return !!(t.current_item || t.next_item || t.next_items || t.upcoming_items || t.queue_items || t.items || t.active_queue || t.entity_id && t.attributes);
  }
  normalizeQueueItem(t) {
    if (typeof t != "object" || !t)
      return;
    const e = t;
    if (this.isQueueContainer(e))
      return;
    const i = (typeof e.media_item == "object" && e.media_item ? e.media_item : void 0) ?? (typeof e.item == "object" && e.item ? e.item : void 0) ?? e, s = typeof i.album == "object" && i.album ? i.album : void 0, r = Array.isArray(i.artists) ? i.artists : void 0, a = String(
      i.name ?? e.name ?? e.title ?? e.media_title ?? ""
    ), n = String(i.uri ?? e.uri ?? e.media_id ?? e.media_content_id ?? ""), c = this.normalizedMediaType(i.media_type ?? e.media_type ?? e.type, "track"), d = String(
      i.image ?? e.image ?? e.thumbnail ?? e.entity_picture ?? e.media_image ?? e.local_image_encoded ?? (s == null ? void 0 : s.image) ?? ""
    );
    if (!(!a && !n))
      return {
        name: a || n,
        uri: n || void 0,
        media_type: c,
        type: c,
        artists: r,
        artist: String(i.artist ?? e.artist ?? e.media_artist ?? ""),
        album: s,
        image: d || void 0,
        queue_item_id: String(e.queue_item_id ?? i.queue_item_id ?? "")
      };
  }
  dedupeQueueItems(t) {
    const e = /* @__PURE__ */ new Set();
    return t.filter((i) => {
      const s = `${i.uri ?? ""}:${i.name ?? ""}:${i.artist ?? ""}`;
      return e.has(s) ? !1 : (e.add(s), !0);
    });
  }
  sameQueueItem(t, e) {
    return t.queue_item_id && e.queue_item_id ? t.queue_item_id === e.queue_item_id : t.uri && e.uri ? t.uri === e.uri : !!(t.name && e.name && t.name === e.name && (t.artist ?? "") === (e.artist ?? ""));
  }
  itemArtist(t) {
    var e;
    return String(
      t.artist || ((e = t.artists) == null ? void 0 : e.map((i) => i.name).filter(Boolean).join(", ")) || ""
    );
  }
  itemAlbum(t) {
    var e;
    return String(((e = t.album) == null ? void 0 : e.name) ?? "");
  }
  shouldStartRadioForContext(t, e) {
    return (t.media_type || t.type || "track") === "track" && e !== "album" && e !== "playlist" && !!this.itemArtist(t);
  }
  refreshQueueAfterPlayback() {
    window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer);
    const t = this.activeTab !== "queue";
    this.queueRefreshTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: t });
    }, 600), this.queueRefreshRetryTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: !0 });
    }, 1800);
  }
  playSearchResult(t, e, i = {}) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const s = t.uri || t.name;
    if (!s)
      return;
    const r = e ?? this.config.enqueue_mode ?? y.enqueue_mode, a = (r === "next" || r === "add") && !this.isPlaying ? "play" : r, n = this.matchingMusicAssistantPlayer(this.activePlayer) ?? this.activePlayer, c = (n == null ? void 0 : n.entity_id) ?? this.activeEntityId;
    this.playbackPending = !0, window.localStorage.setItem(N, c), this.selectedEntityId = c;
    const d = t.media_type || t.type || "track", p = {
      media_id: s,
      media_type: d,
      enqueue: a
    }, l = this.itemArtist(t), m = this.itemAlbum(t);
    l && !String(s).includes("://") && (d === "track" || d === "album") && (p.artist = l), m && !String(s).includes("://") && d === "track" && (p.album = m), i.startRadio && a === "play" && d === "track" && l && (p.radio_mode = !0);
    const g = this.service("music_assistant", "play_media", p, {
      entity_id: c
    });
    if (g && typeof g.then == "function") {
      g.catch(async (f) => {
        if (p.radio_mode) {
          const x = { ...p };
          delete x.radio_mode;
          try {
            const b = this.service("music_assistant", "play_media", x, {
              entity_id: c
            });
            b && typeof b.then == "function" && await b;
            return;
          } catch (b) {
            this.playbackError = b instanceof Error ? b.message : "Music Assistant playback failed.";
            return;
          }
        }
        if (a === "next") {
          const x = this.service("music_assistant", "play_media", {
            media_id: s,
            media_type: d,
            enqueue: "add"
          }, {
            entity_id: c
          });
          return x && typeof x.then == "function" ? x.catch((b) => {
            this.playbackError = b instanceof Error ? b.message : "Music Assistant queue add failed.";
          }) : void 0;
        }
        this.playbackError = f instanceof Error ? f.message : "Music Assistant playback failed.";
      }).finally(() => {
        this.playbackPending = !1, this.refreshQueueAfterPlayback();
      });
      return;
    }
    window.setTimeout(() => {
      this.playbackPending = !1, this.refreshQueueAfterPlayback();
    }, 900);
  }
  queueSearchResult(t) {
    this.playSearchResult(t, "add", { startRadio: !1 });
  }
  playQueueItem(t) {
    const e = t.queue_item_id, i = this.queueTargetEntityId();
    if (!e || !i || this.playbackPending) {
      this.playSearchResult(t, "play");
      return;
    }
    this.playbackPending = !0, this.playbackError = "";
    const s = this.service("mass_queue", "play_queue_item", {
      entity: i,
      queue_item_id: e
    });
    if (s && typeof s.then == "function") {
      s.catch((r) => {
        this.playbackError = r instanceof Error ? r.message : "Queue item playback failed.";
      }).finally(() => {
        this.playbackPending = !1, window.setTimeout(() => this.refreshQueue(), 500);
      });
      return;
    }
    window.setTimeout(() => {
      this.playbackPending = !1, this.refreshQueue();
    }, 900);
  }
  renderRooms() {
    const t = this.currentlyPlayingPlayers;
    return t.length < 2 ? h : u`
      <div class="rooms">
        <span class="now-label">Playing in</span>
        <div class="now-row">
          <div class="now-speakers">
            ${t.map(
      (e) => u`
                <span class="now-chip">
                  ${e.attributes.friendly_name ?? I(e.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
        </div>
      </div>
    `;
  }
  renderPlayerPicker(t, e = !1) {
    return u`
      <label class="player-picker ${e ? "header-picker" : ""}">
        <ha-icon .icon=${"mdi:speaker"}></ha-icon>
        <select
          .value=${this.activeEntityId}
          @change=${(i) => {
      var n;
      const s = i.target.value, r = (n = this.hass) == null ? void 0 : n.states[s];
      this.selectedEntityId = s, window.localStorage.setItem(N, s);
      const a = r == null ? void 0 : r.attributes.group_members;
      this.selectedGroupIds = Array.isArray(a) ? [...a] : [s], this.pendingGroupIds = [], this.queueItems = [], this.queueError = "", this.lastInitialQueueEntityId = "", this.activeTab === "queue" && this.refreshQueue();
    }}
        >
          ${t.map(
      (i) => u`
              <option
                .value=${i.entity_id}
                ?selected=${i.entity_id === this.activeEntityId}
              >
                ${i.attributes.friendly_name ?? I(i.entity_id.split(".")[1])}
              </option>
            `
    )}
        </select>
      </label>
    `;
  }
  renderHeaderIdentity() {
    const t = this.allPlayers;
    return u`
      <div class="title">
        ${t.length > 1 ? this.renderPlayerPicker(t, !0) : u`<span class="name">${this.activeName || "Sonos"}</span>`}
      </div>
    `;
  }
  renderTopControls(t, e) {
    return u`
      <div class="top-controls">
        <span class="header-state">${t ? "Unavailable" : I((e == null ? void 0 : e.state) ?? "idle")}</span>
        ${this.renderNextUp()}
      </div>
    `;
  }
  renderNextUp() {
    const t = this.queueItems[0];
    return t ? u`
      <span class="next-up">
        <span class="next-label">Next</span>
        <span class="next-title">${t.name ?? t.uri ?? "Queue item"}</span>
      </span>
    ` : h;
  }
  renderMiniPlayer(t, e, i) {
    return u`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork"></div>
        <div class="mini-meta">
          <span class="track">${t}</span>
          <span class="artist">${e}</span>
        </div>
        <div class="mini-controls">
          <button
            class="icon-button"
            ?disabled=${i || this.transportPending}
            @click=${() => this.transportService("media_previous_track")}
          >
            <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
          </button>
          <button
            class="play-button ${this.playbackPending ? "loading" : ""}"
            ?disabled=${i || this.playbackPending}
            @click=${this.playPause}
          >
            <ha-icon .icon=${this.playbackPending ? "mdi:loading" : this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${i || this.transportPending}
            @click=${() => this.transportService("media_next_track")}
          >
            <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
          </button>
        </div>
      </section>
    `;
  }
  renderGrouping() {
    const t = this.groupablePlayers;
    if (!this.config.show_grouping || t.length < 2)
      return h;
    const e = t.some((n) => n.entity_id === this.activeEntityId) || !!this.matchingMusicAssistantPlayer(this.activePlayer), i = this.pendingGroupIds.filter((n) => {
      var d;
      const c = (d = this.hass) == null ? void 0 : d.states[n];
      return n !== this.activeEntityId && t.some((p) => p.entity_id === (c == null ? void 0 : c.entity_id));
    }).length, s = this.pendingGroupIds.filter((n) => {
      var d;
      const c = (d = this.hass) == null ? void 0 : d.states[n];
      return !!(c && n !== this.activeEntityId && n !== this.playbackEntityId && t.some((p) => p.entity_id === c.entity_id));
    }).length, r = this.groupMembers.length, a = r > 1;
    return u`
      <section class="grouping">
        <span class="section-title">Choose Speakers</span>
        ${this.groupError ? u`<div class="error">${this.groupError}</div>` : h}
        <div class="group-row">
          ${t.map((n) => {
      const c = this.selectedGroupIds.includes(n.entity_id) || this.groupMembers.includes(n.entity_id), d = this.pendingGroupIds.includes(n.entity_id), p = c || d, l = n.entity_id === this.activeEntityId;
      return u`
	              <button
	                class="group-chip ${p ? "active" : ""} ${l ? "anchor" : ""}"
	                ?disabled=${l || this.groupPending}
                  title=${l ? "Current room" : p ? "Remove from selection" : "Add to selection"}
                @click=${() => this.toggleGroupSelection(n.entity_id)}
              >
                <span class="group-check">${p ? "✓" : ""}</span>
                <span class="group-name">
                  ${n.attributes.friendly_name ?? I(n.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${l ? "This room" : c ? "In group" : d ? "Selected" : "Available"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action continue"
            ?disabled=${this.groupPending || s !== 1}
            title="Transfer the current queue to one selected speaker"
            @click=${this.continueInSelectedRoom}
          >
            <span class="group-check">▶</span>
            <span class="group-name">Transfer Playback</span>
            <span class="group-status">${s === 1 ? "Move current queue" : "Select 1 room"}</span>
          </button>
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !e || i === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Group Selected</span>
            <span class="group-status">
              ${e ? `${i} room${i === 1 ? "" : "s"}` : "Cannot group this speaker"}
            </span>
          </button>
          <button
            class="group-chip action ungroup"
            ?disabled=${this.groupPending || !a}
            title="Make this room leave the current speaker group"
            @click=${this.ungroupActive}
          >
            <span class="group-check">×</span>
            <span class="group-name">Leave Group</span>
            <span class="group-status">${a ? "This room only" : "No group active"}</span>
          </button>
          <button
            class="group-chip action clear"
            ?disabled=${this.groupPending || !a}
            title="Ungroup every room in the current speaker group"
            @click=${this.ungroupAll}
          >
            <span class="group-check">×</span>
            <span class="group-name">Ungroup All</span>
            <span class="group-status">${a ? `${r} rooms` : "No group active"}</span>
          </button>
        </div>
      </section>
    `;
  }
  renderCurrentGroup() {
    const t = this.groupMembers.map((e) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[e];
    }).filter((e) => !!e);
    return t.length <= 1 ? h : u`
      <section class="current-group">
        <button
          class="section-toggle"
          @click=${() => {
      this.showCurrentGroup = !this.showCurrentGroup;
    }}
        >
          <span>Playing Together (${t.length})</span>
          <ha-icon .icon=${this.showCurrentGroup ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.showCurrentGroup ? t.map(
      (e) => u`
                <div class="current-member">
                  <span class="speaker-name">
                    ${e.attributes.friendly_name ?? I(e.entity_id.split(".")[1])}
                  </span>
                  <button
                    class="small-action"
                    ?disabled=${this.groupPending || e.entity_id === this.activeEntityId}
                    @click=${() => this.removeFromGroup(e.entity_id)}
                  >
                    Remove
                  </button>
                </div>
              `
    ) : h}
      </section>
    `;
  }
  renderTabs() {
    return u`
      <div
        class="tabs"
        aria-label="Player panels"
      >
        <button
          class=${this.activeTab === "now" ? "active" : ""}
          @click=${() => {
      this.activeTab = "now";
    }}
        >
          Now
        </button>
        <button
          class=${this.activeTab === "search" ? "active" : ""}
          @click=${() => {
      this.activeTab = "search";
    }}
        >
          Search
        </button>
        <button
          class=${this.activeTab === "queue" ? "active" : ""}
          @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}
        >
          Queue
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
  renderNowPlaying(t, e, i) {
    const s = this.artworkUrl;
    return u`
      <section class="now-view">
        <div class="now-artwork ${s ? "has-art" : ""}" aria-label="Current album artwork">
          ${s ? u`<img src=${s} alt="" loading="eager" decoding="async" />` : u`<span class="artwork-empty">No artwork</span>`}
        </div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(Math.round(this.progressPercent))}>
          <div class="progress-fill" style=${`width: ${this.progressPercent}%`}></div>
        </div>
        <div class="metadata">
          <span class="track">${t}</span>
          <span class="artist">${e}</span>
        </div>
        <div class="controls">
          <button
            class="icon-button"
            ?disabled=${i || this.transportPending}
            @click=${() => this.transportService("media_previous_track")}
          >
            <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
          </button>
          <button
            class="play-button ${this.playbackPending ? "loading" : ""}"
            ?disabled=${i || this.playbackPending}
            @click=${this.playPause}
          >
            <ha-icon .icon=${this.playbackPending ? "mdi:loading" : this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${i || this.transportPending}
            @click=${() => this.transportService("media_next_track")}
          >
            <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
          </button>
        </div>
        ${this.renderLiveActivityControls(t, e)}
      </section>
    `;
  }
  renderQueue() {
    return u`
      <section class="queue">
        <div class="queue-header">
          <span class="section-title">Queue</span>
          <button
            class="small-action"
            ?disabled=${this.queueLoading}
            @click=${() => this.refreshQueue()}
          >
            Refresh
          </button>
        </div>
        ${this.queueLoading ? u`<div class="hint">Loading queue...</div>` : h}
        ${this.queueError ? u`<div class="error">${this.queueError}</div>` : h}
        ${!this.queueLoading && this.queueItems.length === 0 && !this.queueError ? u`<div class="hint">Queue is empty or unavailable for this speaker.</div>` : h}
        ${this.queueItems.length > 0 ? u`
              <div class="queue-list">
                ${this.queueItems.map((t) => this.renderQueueItem(t))}
              </div>
            ` : h}
      </section>
    `;
  }
  renderSearch() {
    return this.config.show_search ? u`
      <section class="search">
        <span class="section-title">Music Assistant Search</span>
        <div class="search-row">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Search songs, albums, artists, playlists"
            @input=${(t) => {
      this.query = t.target.value, this.scheduleSearch();
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
        ${this.renderFavorites()}
        ${this.searchError ? u`<div class="error">${this.searchError}</div>` : h}
        ${this.playbackError ? u`<div class="error">${this.playbackError}</div>` : h}
        ${this.searching ? u`<div class="hint">Searching...</div>` : h}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.browserView === "playlist" ? this.renderPlaylistView() : this.renderResults() : h}
        ${this.config.show_queue_hint ? u`<div class="hint">Tap a result to start playback, or use Next to queue it after the current song.</div>` : h}
      </section>
    ` : h;
  }
  itemsByType(t) {
    return this.searchResults.filter((e) => (e.media_type || e.type) === t);
  }
  renderFavorites() {
    return this.favoriteItems.length === 0 ? h : u`
      <section class="favorites">
        <span class="section-header">Favorites</span>
        ${this.favoriteItems.map((t) => {
      const e = t.media_type || t.type || "track", i = e === "artist" ? "artist" : e === "album" ? "album" : e === "playlist" ? "playlist" : "play";
      return this.renderResultItem(t, i, "favorites");
    })}
      </section>
    `;
  }
  renderResultSection(t, e, i = "play", s = !0, r = "search") {
    if (e.length === 0)
      return h;
    const a = s ? e.slice(0, _(this.config.search_limit, y.search_limit)) : e;
    return u`
      <section class="result-section">
        <span class="section-header">${t}</span>
        ${a.map((n) => this.renderResultItem(n, i, r))}
      </section>
    `;
  }
  renderArtistView() {
    const t = this.selectedArtist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", i = (t == null ? void 0 : t.name) ?? this.query;
    return u`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${e ? `background-image: url("${e}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${i}</span>
            <span class="result-sub">Artist</span>
          </div>
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedArtist = void 0;
    }}>
            Back
          </button>
        </div>
        ${this.renderResultSection("Songs", this.itemsByType("track"), "play", !0, "artist")}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album", !0, "artist")}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"), "playlist", !0, "artist")}
      </div>
    `;
  }
  renderAlbumView() {
    const t = this.selectedAlbum, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", i = (t == null ? void 0 : t.name) ?? this.query, s = this.albumTracks.length > 0 ? this.albumTracks : this.itemsByType("track").filter((r) => !i || this.itemAlbum(r).toLowerCase() === i.toLowerCase());
    return u`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${e ? `background-image: url("${e}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${i}</span>
            <span class="result-sub">Album</span>
          </div>
          ${t ? u`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(t, "play")}
                >
                  Play Album
                </button>
              ` : h}
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "";
    }}>
            Back
          </button>
        </div>
        ${this.albumLoading ? u`<div class="hint">Loading album tracks...</div>` : h}
        ${this.albumError ? u`<div class="error">${this.albumError}</div>` : h}
        ${this.renderResultSection("Songs", s, "play", !1, "album")}
      </div>
    `;
  }
  renderPlaylistView() {
    const t = this.selectedPlaylist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", i = (t == null ? void 0 : t.name) ?? this.query;
    return u`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${e ? `background-image: url("${e}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${i}</span>
            <span class="result-sub">Playlist</span>
          </div>
          ${t ? u`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(t, "play")}
                >
                  Play Playlist
                </button>
              ` : h}
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedPlaylist = void 0, this.playlistTracks = [], this.playlistError = "";
    }}>
            Back
          </button>
        </div>
        ${this.playlistLoading ? u`<div class="hint">Loading playlist tracks...</div>` : h}
        ${this.playlistError ? u`<div class="error">${this.playlistError}</div>` : h}
        ${this.renderResultSection("Songs", this.playlistTracks, "play", !1, "playlist")}
      </div>
    `;
  }
  renderSpeakers() {
    return u`
      <section class="speakers">
        ${this.renderCurrentGroup()}
        ${this.renderGrouping()}
        <button
          class="section-toggle"
          @click=${() => {
      this.showVolumeMixer = !this.showVolumeMixer;
    }}
        >
          <span>Speaker Volumes</span>
          <ha-icon .icon=${this.showVolumeMixer ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.showVolumeMixer ? u`
              <div class="speaker-list">
                ${this.allPlayers.map((t) => {
      const e = w(t), i = Math.round(_(t.attributes.volume_level, 0) * 100);
      return u`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${t.attributes.friendly_name ?? I(t.entity_id.split(".")[1])}
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
                        .value=${String(i)}
                        ?disabled=${e}
                        @change=${(s) => this.setPlayerVolume(
        t.entity_id,
        s.target.value
      )}
                      />
                      <span class="state">${i}%</span>
                    </div>
                  `;
    })}
              </div>
            ` : h}
      </section>
    `;
  }
  renderResults() {
    return u`
      <div class="results">
        ${this.renderResultSection("Artists", this.itemsByType("artist"), "artist")}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album")}
        ${this.renderResultSection("Songs", this.itemsByType("track"))}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"), "playlist")}
        ${this.renderResultSection("Radio", this.itemsByType("radio"))}
        ${this.renderResultSection("Podcasts", this.itemsByType("podcast"))}
      </div>
    `;
  }
  renderResultItem(t, e = "play", i = "search") {
    var d, p, l;
    const s = t.artist || ((d = t.artists) == null ? void 0 : d.map((m) => m.name).filter(Boolean).join(", ")) || ((p = t.album) == null ? void 0 : p.name) || t.media_type || t.type || "", r = t.image || t.thumb || ((l = t.album) == null ? void 0 : l.image) || "", a = this.isFavorite(t), n = () => this.playSearchResult(t, "play", {
      startRadio: this.shouldStartRadioForContext(t, i)
    });
    return u`
      <div class="result clickable" @click=${e === "artist" ? () => this.openArtist(t) : e === "album" ? () => this.openAlbum(t) : e === "playlist" ? () => this.openPlaylist(t) : n}>
        <div
          class="result-art"
          style=${r ? `background-image: url("${r}")` : ""}
        ></div>
        <div class="result-main">
          <span class="result-name">${t.name ?? t.uri ?? "Untitled"}</span>
          <span class="result-sub">${s}</span>
        </div>
        <span class="result-actions">
          <button
            class="favorite-toggle ${a ? "active" : ""}"
            title=${a ? "Remove favorite" : "Favorite"}
            @click=${(m) => {
      m.stopPropagation(), this.toggleFavorite(t);
    }}
          >
            <ha-icon .icon=${a ? "mdi:star" : "mdi:star-outline"}></ha-icon>
          </button>
          ${e === "artist" || e === "album" || e === "playlist" ? h : u`
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), n();
    }}
                >
                  Now
                </button>
                <button
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), this.queueSearchResult(t);
    }}
                >
                  Next
                </button>
              `}
        </span>
      </div>
    `;
  }
  renderQueueItem(t) {
    var s, r, a;
    const e = t.artist || ((s = t.artists) == null ? void 0 : s.map((n) => n.name).filter(Boolean).join(", ")) || ((r = t.album) == null ? void 0 : r.name) || t.media_type || t.type || "", i = t.image || t.thumb || ((a = t.album) == null ? void 0 : a.image) || "";
    return u`
      <div class="result clickable" @click=${() => this.playQueueItem(t)}>
        <div
          class="result-art"
          style=${i ? `background-image: url("${i}")` : ""}
        ></div>
        <div class="result-main">
          <span class="result-name">${t.name ?? t.uri ?? "Untitled"}</span>
          <span class="result-sub">${e}</span>
        </div>
        ${t.uri ? u`
              <span class="result-actions">
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(n) => {
      n.stopPropagation(), this.playQueueItem(t);
    }}
                >
                  Play
                </button>
              </span>
            ` : h}
      </div>
    `;
  }
  render() {
    var c;
    if (!this.config)
      return u``;
    const t = this.playbackPlayer, e = this.activePlayer, i = this.activeMemory, s = w(e), r = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", a = (t == null ? void 0 : t.attributes.media_title) || (i == null ? void 0 : i.title) || "No music selected", n = (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || (i == null ? void 0 : i.artist) || "Ready";
    return u`
      <ha-card>
        <div
          class="player ${this.config.compact ? "compact" : ""} ${this.isPlaying ? "playing" : ""} ${this.playbackPending || this.transportPending ? "pending" : ""} ${this.activeTab === "now" ? "now-active" : ""}"
          style="
            --gamma-sonos-cover: ${r};
            --gamma-sonos-artwork: ${r};
          "
        >
          <div class="topbar">
            ${this.renderHeaderIdentity()}
            ${this.renderTopControls(s, t)}
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(a, n, s)}
          <div class="volume-row">
            <button class="icon-button" ?disabled=${s} @click=${this.toggleMute}>
              <ha-icon .icon=${(c = this.isPlaying ? this.playbackPlayer : this.activePlayer) != null && c.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${s}
              @change=${(d) => this.setVolume(d.target.value)}
            />
            <span class="state">${this.volume}%</span>
          </div>
	          ${this.renderTabs()}
	          ${this.activeTab === "now" ? this.renderNowPlaying(a, n, s) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.renderSpeakers()}
        </div>
      </ha-card>
    `;
  }
};
et.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  selectedEntityId: { state: !0 },
  activeTab: { state: !0 },
  query: { state: !0 },
  searching: { state: !0 },
  searchError: { state: !0 },
  playbackError: { state: !0 },
  searchResults: { state: !0 },
  selectedGroupIds: { state: !0 },
  pendingGroupIds: { state: !0 },
  playbackPending: { state: !0 },
  groupPending: { state: !0 },
  browserView: { state: !0 },
  selectedArtist: { state: !0 },
  selectedAlbum: { state: !0 },
  selectedPlaylist: { state: !0 },
  albumTracks: { state: !0 },
  albumLoading: { state: !0 },
  albumError: { state: !0 },
  playlistTracks: { state: !0 },
  playlistLoading: { state: !0 },
  playlistError: { state: !0 },
  showVolumeMixer: { state: !0 },
  showCurrentGroup: { state: !0 },
  groupError: { state: !0 },
  queueItems: { state: !0 },
  queueLoading: { state: !0 },
  queueError: { state: !0 },
  playbackMemory: { state: !0 },
  transportPending: { state: !0 },
  favoriteItems: { state: !0 },
  liveActivityPending: { state: !0 },
  liveActivityError: { state: !0 }
};
let Y = et;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", Y);
const it = class it extends q {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return bt`
      .editor {
        display: grid;
        gap: 14px;
      }

      .section {
        background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
        border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
        border-radius: 10px;
        display: grid;
        gap: 10px;
        padding: 14px;
      }

      .grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      }

      .switch-row {
        align-items: center;
        color: var(--primary-text-color);
        display: inline-flex;
        gap: 8px;
        min-height: 34px;
      }

      ha-selector,
      ha-textfield,
      ha-select {
        width: 100%;
      }

      h3 {
        color: var(--primary-text-color);
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0;
        margin: 0;
      }
    `;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  updateConfig(t) {
    const e = { ...this.config, ...t };
    Object.keys(e).forEach((i) => {
      const s = i;
      e[s] === "" && delete e[s];
    }), this.config = e, Ft(this, e);
  }
  valueChanged(t) {
    var s;
    const e = t.target, i = t;
    e.configValue && this.updateConfig({
      [e.configValue]: e.checked !== void 0 ? e.checked : ((s = i.detail) == null ? void 0 : s.value) ?? e.value
    });
  }
  renderEntityPicker(t, e, i = !1) {
    return u`
      <ha-selector
        .hass=${this.hass}
        .label=${t}
        .selector=${{ entity: { domain: "media_player", multiple: i } }}
        .value=${this.config[e] ?? (i ? [] : "")}
        .configValue=${e}
        @value-changed=${this.valueChanged}
      ></ha-selector>
    `;
  }
  renderTextInput(t, e, i = "") {
    return u`
      <ha-textfield
        .label=${t}
        .placeholder=${i}
        .value=${this.config[e] ?? ""}
        .configValue=${e}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderNumberInput(t, e, i = "") {
    return u`
      <ha-textfield
        type="number"
        .label=${t}
        .placeholder=${i}
        .value=${this.config[e] ?? ""}
        .configValue=${e}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderSwitch(t, e, i) {
    return u`
      <label class="switch-row">
        <ha-switch
          .checked=${!!(this.config[e] ?? i)}
          .configValue=${e}
          @change=${this.valueChanged}
        ></ha-switch>
        <span>${t}</span>
      </label>
    `;
  }
  renderSelect(t, e, i, s) {
    return u`
      <ha-select
        .label=${t}
        .value=${this.config[e] ?? s}
        .configValue=${e}
        @selected=${this.valueChanged}
        @closed=${(r) => r.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        ${i.map(
      (r) => u`
            <mwc-list-item .value=${r}>${r}</mwc-list-item>
          `
    )}
      </ha-select>
    `;
  }
  render() {
    return u`
      <div class="editor">
        <section class="section">
          <h3>Main</h3>
          ${this.renderEntityPicker("Players", "entities", !0)}
          <div class="grid">
            ${this.renderTextInput("Name", "name", "Music")}
            ${this.renderTextInput(
      "Music Assistant Config Entry ID",
      "music_assistant_config_entry_id",
      "01KQ..."
    )}
            ${this.renderSelect("Enqueue Mode", "enqueue_mode", ["play", "next", "replace", "replace_next", "add"], "play")}
            ${this.renderNumberInput("Search Limit", "search_limit", "8")}
            ${this.renderTextInput("iOS Notify Service", "live_activity_notify_service", "notify.mobile_app_aniels_iphone")}
            ${this.renderTextInput("Live Activity Tag", "live_activity_tag", "gamma-sonos-player")}
          </div>
        </section>

        <section class="section">
          <h3>Layout</h3>
          <div class="grid">
            ${this.renderTextInput("Width", "width", "100%")}
            ${this.renderTextInput("Height", "height", "auto")}
            ${this.renderTextInput("Background", "background", "#101722")}
            ${this.renderTextInput("Accent Color", "accent_color", "#39d98a")}
          </div>
          <div class="grid">
            ${this.renderSwitch("Fill Container", "fill_container", !1)}
            ${this.renderSwitch("Compact Layout", "compact", !1)}
            ${this.renderSwitch("Show Search", "show_search", !0)}
            ${this.renderSwitch("Show Grouping", "show_grouping", !0)}
            ${this.renderSwitch("Library Only", "library_only", !1)}
            ${this.renderSwitch("iOS Live Activity", "live_activity_enabled", !0)}
            ${this.renderSwitch("Auto-update Live Activity", "live_activity_auto_update", !1)}
          </div>
        </section>
      </div>
    `;
  }
};
it.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let J = it;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", J);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
