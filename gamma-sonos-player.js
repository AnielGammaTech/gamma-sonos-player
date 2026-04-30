/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, F = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), K = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (F && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (r) => new ht(typeof r == "string" ? r : r + "", void 0, G), ft = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ht(e, r, G);
}, _t = (r, t) => {
  if (F) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = H.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Q = F ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return gt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: $t, getOwnPropertyDescriptor: bt, getOwnPropertyNames: yt, getOwnPropertySymbols: xt, getPrototypeOf: At } = Object, v = globalThis, X = v.trustedTypes, wt = X ? X.emptyScript : "", I = v.reactiveElementPolyfillSupport, P = (r, t) => r, W = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? wt : null;
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
} }, lt = (r, t) => !vt(r, t), Y = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: lt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && $t(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const c = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = At(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
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
      for (const i of s) e.unshift(Q(i));
    } else t !== void 0 && e.push(Q(t));
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
    return _t(t, this.constructor.elementStyles), t;
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
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : W).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : W;
      this._$Em = i;
      const d = a.fromAttribute(e, c.type);
      this[i] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (o = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? lt)(o, e) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: c } = n, a = this[o];
        c !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[P("elementProperties")] = /* @__PURE__ */ new Map(), A[P("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: A }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, tt = (r) => r, T = k.trustedTypes, et = T ? T.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, dt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + _, Et = `<${ut}>`, x = document, C = () => x.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", Z = Array.isArray, St = (r) => Z(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", q = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, $ = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, ot = /"/g, pt = /^(?:script|style|textarea|title)$/i, Pt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Pt(1), w = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function mt(r, t) {
  if (!Z(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const kt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = S;
  for (let c = 0; c < e; c++) {
    const a = r[c];
    let d, u, l = -1, g = 0;
    for (; g < a.length && (n.lastIndex = g, u = n.exec(a), u !== null); ) g = n.lastIndex, n === S ? u[1] === "!--" ? n = st : u[1] !== void 0 ? n = it : u[2] !== void 0 ? (pt.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = $) : u[3] !== void 0 && (n = $) : n === $ ? u[0] === ">" ? (n = i ?? S, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? $ : u[3] === '"' ? ot : rt) : n === ot || n === rt ? n = $ : n === st || n === it ? n = S : (n = $, i = void 0);
    const f = n === $ && r[c + 1].startsWith("/>") ? " " : "";
    o += n === S ? a + Et : l >= 0 ? (s.push(d), a.slice(0, l) + dt + a.slice(l) + _ + f) : a + _ + (l === -2 ? c : f);
  }
  return [mt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [d, u] = kt(t, e);
    if (this.el = R.createElement(d, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = b.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(dt)) {
          const g = u[n++], f = i.getAttribute(l).split(_), O = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: O[2], strings: f, ctor: O[1] === "." ? Ct : O[1] === "?" ? Ut : O[1] === "@" ? Rt : z }), i.removeAttribute(l);
        } else l.startsWith(_) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (pt.test(i.tagName)) {
          const l = i.textContent.split(_), g = l.length - 1;
          if (g > 0) {
            i.textContent = T ? T.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(l[f], C()), b.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[g], C());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ut) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(_, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += _.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  var n, c;
  if (t === w) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class Mt {
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
    b.currentNode = i;
    let o = b.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new N(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Nt(o, this, t)), this._$AV.push(d), a = s[++c];
      }
      n !== (a == null ? void 0 : a.index) && (o = b.nextNode(), n++);
    }
    return b.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = E(this, t, e), U(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(mt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new Mt(i, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new N(this.O(C()), this.O(C()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = tt(t).nextSibling;
      tt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
    else {
      const c = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = E(this, c[s + a], e, a), d === w && (d = this._$AH[a]), n || (n = !U(d) || d !== this._$AH[a]), d === h ? t = h : t !== h && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Ut extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Rt extends z {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? h) === w) return;
    const s = this._$AH, i = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
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
const j = k.litHtmlPolyfillSupport;
j == null || j(R, N), (k.litHtmlVersions ?? (k.litHtmlVersions = [])).push("3.3.2");
const Ot = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new N(t.insertBefore(C(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class M extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(e, this.renderRoot, this.renderOptions);
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
    return w;
  }
}
var ct;
M._$litElement$ = !0, M.finalized = !0, (ct = y.litElementHydrateSupport) == null || ct.call(y, { LitElement: M });
const D = y.litElementPolyfillSupport;
D == null || D({ LitElement: M });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.2");
const m = {
  width: "420px",
  height: "620px",
  provider_mode: "music_assistant",
  enqueue_mode: "replace",
  search_limit: 8,
  show_grouping: !0,
  show_search: !0,
  show_source_toggle: !0,
  show_queue_hint: !0,
  background: "#101722",
  accent_color: "#39d98a"
};
function L(r, t) {
  if (typeof r == "number" && Number.isFinite(r))
    return r;
  const e = Number(r);
  return Number.isFinite(e) ? e : t;
}
function at(r) {
  return !r || r.state === "unavailable" || r.state === "unknown";
}
function B(r) {
  return r.replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
const J = class J extends M {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.providerMode = m.provider_mode, this.query = "", this.searching = !1, this.searchError = "", this.searchResults = [];
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
      .provider,
      .controls,
      .volume-row,
      .group-row,
      .search-row,
      .result {
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
      .provider {
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
      .provider button,
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
      .provider button {
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
      .provider button.active,
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

      .provider {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grouping,
      .search {
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
        flex-wrap: wrap;
        gap: 8px;
      }

      .group-chip {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        font-weight: 700;
        min-height: 32px;
        padding: 0 10px;
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
    this.config = { ...m, ...t }, this.providerMode = this.config.provider_mode ?? m.provider_mode, this.selectedEntityId = this.config.entity || ((e = this.config.entities) == null ? void 0 : e[0]) || ((s = this.config.music_assistant_entities) == null ? void 0 : s[0]) || "", this.style.setProperty("--gamma-sonos-width", this.config.width ?? m.width), this.style.setProperty("--gamma-sonos-height", this.config.height ?? m.height), this.style.setProperty(
      "--gamma-sonos-background",
      this.config.background ?? m.background
    ), this.style.setProperty(
      "--gamma-sonos-accent",
      this.config.accent_color ?? m.accent_color
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
      const i = String(s.attributes.platform ?? "").toLowerCase();
      return i.includes("sonos") || i.includes("music_assistant") || s.entity_id.includes("sonos") || s.entity_id.includes("music_assistant");
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
    var t, e;
    return String(
      ((t = this.activePlayer) == null ? void 0 : t.attributes.entity_picture) || ((e = this.activePlayer) == null ? void 0 : e.attributes.media_image_url) || ""
    );
  }
  get isPlaying() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.state) === "playing";
  }
  get volume() {
    var t;
    return Math.round(L((t = this.activePlayer) == null ? void 0 : t.attributes.volume_level, 0) * 100);
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
    !this.activeEntityId || at(this.activePlayer) || this.service("media_player", t, {
      entity_id: this.activeEntityId,
      ...e
    });
  }
  playPause() {
    this.mediaService(this.isPlaying ? "media_pause" : "media_play");
  }
  setVolume(t) {
    this.mediaService("volume_set", {
      volume_level: Math.max(0, Math.min(1, Number(t) / 100))
    });
  }
  toggleMute() {
    var t;
    this.mediaService("volume_mute", {
      is_volume_muted: !((t = this.activePlayer) != null && t.attributes.is_volume_muted)
    });
  }
  toggleGroupMember(t) {
    if (!(!this.activeEntityId || t === this.activeEntityId)) {
      if (this.groupMembers.includes(t)) {
        this.service("media_player", "unjoin", { entity_id: t });
        return;
      }
      this.service("media_player", "join", {
        entity_id: this.activeEntityId,
        group_members: [t]
      });
    }
  }
  ungroupActive() {
    this.mediaService("unjoin");
  }
  playDirect() {
    const t = this.query.trim();
    if (t) {
      if (this.providerMode === "music_assistant") {
        this.service(
          "music_assistant",
          "play_media",
          {
            media_id: t,
            enqueue: this.config.enqueue_mode ?? m.enqueue_mode
          }
        );
        return;
      }
      this.mediaService("play_media", {
        media_content_id: t,
        media_content_type: "music",
        enqueue: this.config.enqueue_mode ?? m.enqueue_mode
      });
    }
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
      const i = await this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: {
          name: t,
          limit: L(this.config.search_limit, m.search_limit)
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
    const s = t.response ?? t, i = ["tracks", "albums", "artists", "playlists", "radio"], o = [];
    return i.forEach((n) => {
      const c = s[n];
      Array.isArray(c) && c.forEach((a) => {
        typeof a == "object" && a && o.push({
          ...a,
          media_type: n === "tracks" ? "track" : n.slice(0, -1)
        });
      });
    }), o.slice(0, L(this.config.search_limit, m.search_limit));
  }
  playSearchResult(t) {
    const e = t.uri || t.name;
    e && this.service("music_assistant", "play_media", {
      entity_id: this.activeEntityId,
      media_id: e,
      media_type: t.media_type || t.type,
      enqueue: this.config.enqueue_mode ?? m.enqueue_mode
    });
  }
  renderRooms() {
    const t = this.allPlayers;
    return t.length < 2 ? h : p`
      <div class="rooms" aria-label="Players">
        ${t.map(
      (e) => p`
            <button
              class="room ${e.entity_id === this.activeEntityId ? "active" : ""}"
              @click=${() => {
        this.selectedEntityId = e.entity_id;
      }}
            >
              ${e.attributes.friendly_name ?? B(e.entity_id.split(".")[1])}
            </button>
          `
    )}
      </div>
    `;
  }
  renderProviderToggle() {
    return this.config.show_source_toggle ? p`
      <div class="provider" aria-label="Playback provider">
        <button
          class=${this.providerMode === "music_assistant" ? "active" : ""}
          @click=${() => {
      this.providerMode = "music_assistant";
    }}
        >
          Music Assistant
        </button>
        <button
          class=${this.providerMode === "sonos" ? "active" : ""}
          @click=${() => {
      this.providerMode = "sonos";
    }}
        >
          Sonos/Spotify URI
        </button>
      </div>
    ` : h;
  }
  renderGrouping() {
    return !this.config.show_grouping || this.allPlayers.length < 2 ? h : p`
      <section class="grouping">
        <span class="section-title">Group</span>
        <div class="group-row">
          ${this.allPlayers.map(
      (t) => p`
              <button
                class="group-chip ${this.groupMembers.includes(t.entity_id) ? "active" : ""}"
                ?disabled=${t.entity_id === this.activeEntityId}
                @click=${() => this.toggleGroupMember(t.entity_id)}
              >
                ${t.attributes.friendly_name ?? B(t.entity_id.split(".")[1])}
              </button>
            `
    )}
          <button class="group-chip" @click=${this.ungroupActive}>Ungroup</button>
        </div>
      </section>
    `;
  }
  renderSearch() {
    return this.config.show_search ? p`
      <section class="search">
        <span class="section-title">Search / Play</span>
        <div class="search-row">
          <ha-icon .icon=${this.providerMode === "music_assistant" ? "mdi:magnify" : "mdi:spotify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder=${this.providerMode === "music_assistant" ? "Search Music Assistant" : "Paste Spotify/Sonos URI or link"}
            @input=${(t) => {
      this.query = t.target.value;
    }}
            @keydown=${(t) => {
      t.key === "Enter" && (this.providerMode === "music_assistant" ? this.searchMusicAssistant() : this.playDirect());
    }}
          />
          <button
            class="icon-button"
            title=${this.providerMode === "music_assistant" ? "Search" : "Play URI"}
            @click=${() => this.providerMode === "music_assistant" ? this.searchMusicAssistant() : this.playDirect()}
          >
            <ha-icon .icon=${this.providerMode === "music_assistant" ? "mdi:magnify" : "mdi:play"}></ha-icon>
          </button>
        </div>
        ${this.searchError ? p`<div class="error">${this.searchError}</div>` : h}
        ${this.searching ? p`<div class="hint">Searching...</div>` : h}
        ${this.searchResults.length > 0 ? this.renderResults() : h}
        ${this.config.show_queue_hint && this.providerMode === "music_assistant" ? p`<div class="hint">Music Assistant results play with enqueue mode: ${this.config.enqueue_mode}</div>` : h}
      </section>
    ` : h;
  }
  renderResults() {
    return p`
      <div class="results">
        ${this.searchResults.map((t) => {
      var s, i;
      const e = t.artist || ((s = t.artists) == null ? void 0 : s.map((o) => o.name).filter(Boolean).join(", ")) || ((i = t.album) == null ? void 0 : i.name) || t.media_type || t.type || "";
      return p`
            <div class="result">
              <div class="result-main">
                <span class="result-name">${t.name ?? t.uri ?? "Untitled"}</span>
                <span class="result-sub">${e}</span>
              </div>
              <button @click=${() => this.playSearchResult(t)}>Play</button>
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    if (!this.config)
      return p``;
    const t = this.activePlayer, e = at(t), s = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", i = (t == null ? void 0 : t.attributes.media_title) || "No music selected", o = (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || "Ready";
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
              <span class="state">${e ? "Unavailable" : B((t == null ? void 0 : t.state) ?? "idle")}</span>
            </div>
          </div>
          ${this.renderRooms()}
          <div class="artwork" aria-label="Artwork"></div>
          <div class="metadata">
            <span class="track">${i}</span>
            <span class="artist">${o}</span>
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
          ${this.renderProviderToggle()}
          ${this.renderGrouping()}
          ${this.renderSearch()}
        </div>
      </ha-card>
    `;
  }
};
J.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  selectedEntityId: { state: !0 },
  providerMode: { state: !0 },
  query: { state: !0 },
  searching: { state: !0 },
  searchError: { state: !0 },
  searchResults: { state: !0 }
};
let V = J;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", V);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
