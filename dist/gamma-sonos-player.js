/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, te = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), ne = /* @__PURE__ */ new WeakMap();
let $e = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (te && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Le = (c) => new $e(typeof c == "string" ? c : c + "", void 0, ie), Pe = (c, ...e) => {
  const t = c.length === 1 ? c[0] : e.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + c[r + 1], c[0]);
  return new $e(t, c, ie);
}, Ne = (c, e) => {
  if (te) c.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = Q.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, c.appendChild(i);
  }
}, oe = te ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Le(t);
})(c) : c;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: je, defineProperty: Be, getOwnPropertyDescriptor: Ue, getOwnPropertyNames: Ve, getOwnPropertySymbols: Oe, getPrototypeOf: Ge } = Object, P = globalThis, ce = P.trustedTypes, Qe = ce ? ce.emptyScript : "", D = P.reactiveElementPolyfillSupport, N = (c, e) => c, J = { toAttribute(c, e) {
  switch (e) {
    case Boolean:
      c = c ? Qe : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, e) {
  let t = c;
  switch (e) {
    case Boolean:
      t = c !== null;
      break;
    case Number:
      t = c === null ? null : Number(c);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(c);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ae = (c, e) => !je(c, e), le = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: Ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let I = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = le) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Be(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = Ue(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const o = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const t = this.properties, i = [...Ve(t), ...Oe(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(oe(s));
    } else e !== void 0 && t.push(oe(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ne(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var r;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : J).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : J;
      this._$Em = s;
      const u = n.fromAttribute(t, o.type);
      this[s] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? Ae)(r, t) || i.useDefault && i.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
        const { wrapped: o } = a, n = this[r];
        o !== !0 || this._$AL.has(r) || n === void 0 || this.C(r, void 0, a, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[N("elementProperties")] = /* @__PURE__ */ new Map(), I[N("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: I }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, de = (c) => c, F = j.trustedTypes, ue = F ? F.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, Se = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + $, Fe = `<${Ee}>`, q = document, B = () => q.createComment(""), U = (c) => c === null || typeof c != "object" && typeof c != "function", se = Array.isArray, He = (c) => se(c) || typeof (c == null ? void 0 : c[Symbol.iterator]) == "function", W = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, he = />/g, S = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, ge = /"/g, Te = /^(?:script|style|textarea|title)$/i, De = (c) => (e, ...t) => ({ _$litType$: c, strings: e, values: t }), l = De(1), M = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), E = q.createTreeWalker(q, 129);
function qe(c, e) {
  if (!se(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const We = (c, e) => {
  const t = c.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = z;
  for (let o = 0; o < t; o++) {
    const n = c[o];
    let u, h, d = -1, m = 0;
    for (; m < n.length && (a.lastIndex = m, h = a.exec(n), h !== null); ) m = a.lastIndex, a === z ? h[1] === "!--" ? a = pe : h[1] !== void 0 ? a = he : h[2] !== void 0 ? (Te.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = S) : h[3] !== void 0 && (a = S) : a === S ? h[0] === ">" ? (a = s ?? z, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, u = h[1], a = h[3] === void 0 ? S : h[3] === '"' ? ge : me) : a === ge || a === me ? a = S : a === pe || a === he ? a = z : (a = S, s = void 0);
    const g = a === S && c[o + 1].startsWith("/>") ? " " : "";
    r += a === z ? n + Fe : d >= 0 ? (i.push(u), n.slice(0, d) + Se + n.slice(d) + $ + g) : n + $ + (d === -2 ? o : g);
  }
  return [qe(c, r + (c[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, n = this.parts, [u, h] = We(e, t);
    if (this.el = V.createElement(u, i), E.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = E.nextNode()) !== null && n.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Se)) {
          const m = h[a++], g = s.getAttribute(d).split($), b = /([.?@])?(.*)/.exec(m);
          n.push({ type: 1, index: r, name: b[2], strings: g, ctor: b[1] === "." ? Ye : b[1] === "?" ? Je : b[1] === "@" ? Ze : H }), s.removeAttribute(d);
        } else d.startsWith($) && (n.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Te.test(s.tagName)) {
          const d = s.textContent.split($), m = d.length - 1;
          if (m > 0) {
            s.textContent = F ? F.emptyScript : "";
            for (let g = 0; g < m; g++) s.append(d[g], B()), E.nextNode(), n.push({ type: 2, index: ++r });
            s.append(d[m], B());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) n.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf($, d + 1)) !== -1; ) n.push({ type: 7, index: r }), d += $.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = q.createElement("template");
    return i.innerHTML = e, i;
  }
}
function C(c, e, t = c, i) {
  var a, o;
  if (e === M) return e;
  let s = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const r = U(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), r === void 0 ? s = void 0 : (s = new r(c), s._$AT(c, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = C(c, s._$AS(c, e.values), s, i)), e;
}
class Ke {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? q).importNode(t, !0);
    E.currentNode = s;
    let r = E.nextNode(), a = 0, o = 0, n = i[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let u;
        n.type === 2 ? u = new O(r, r.nextSibling, this, e) : n.type === 1 ? u = new n.ctor(r, n.name, n.strings, this, e) : n.type === 6 && (u = new Xe(r, this, e)), this._$AV.push(u), n = i[++o];
      }
      a !== (n == null ? void 0 : n.index) && (r = E.nextNode(), a++);
    }
    return E.currentNode = q, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class O {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = C(this, e, t), U(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : He(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = V.createElement(qe(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(t);
    else {
      const a = new Ke(s, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = be.get(e.strings);
    return t === void 0 && be.set(e.strings, t = new V(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const r of e) s === t.length ? t.push(i = new O(this.O(B()), this.O(B()), this, this.options)) : i = t[s], i._$AI(r), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = de(e).nextSibling;
      de(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, t = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = C(this, e, t, 0), a = !U(e) || e !== this._$AH && e !== M, a && (this._$AH = e);
    else {
      const o = e;
      let n, u;
      for (e = r[0], n = 0; n < r.length - 1; n++) u = C(this, o[i + n], t, n), u === M && (u = this._$AH[n]), a || (a = !U(u) || u !== this._$AH[n]), u === p ? e = p : e !== p && (e += (u ?? "") + r[n + 1]), this._$AH[n] = u;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ye extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Je extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Ze extends H {
  constructor(e, t, i, s, r) {
    super(e, t, i, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? p) === M) return;
    const i = this._$AH, s = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Xe {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const K = j.litHtmlPolyfillSupport;
K == null || K(V, O), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.3.2");
const et = (c, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new O(e.insertBefore(B(), r), r, void 0, t ?? {});
  }
  return s._$AI(c), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
class R extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = et(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return M;
  }
}
var _e;
R._$litElement$ = !0, R.finalized = !0, (_e = T.litElementHydrateSupport) == null || _e.call(T, { LitElement: R });
const Y = T.litElementPolyfillSupport;
Y == null || Y({ LitElement: R });
(T.litElementVersions ?? (T.litElementVersions = [])).push("4.2.2");
const k = {
  width: "100%",
  height: "auto",
  fill_container: !0,
  compact: !1,
  enqueue_mode: "next",
  search_limit: 5,
  library_only: !1,
  show_grouping: !0,
  show_search: !0,
  show_party: !0,
  show_queue_hint: !0,
  background: "#101722",
  accent_color: "#39d98a"
}, tt = 524288, L = "gamma-sonos-player:last-player", ye = "gamma-sonos-player:playback-memory", fe = "gamma-sonos-player:favorites", it = 1e4, G = 12e3, st = 2 * 6e4, xe = 5 * 6e4, rt = 30, at = 15e3, Ie = "rest_command.party_screen_start", Re = "rest_command.party_screen_stop", Me = "https://music.anieflix.com/#/party", Ce = "Lanai AppleTV", nt = [
  { id: "lanai", name: "Lanai Apple TV" },
  { id: "bedroom", name: "Bedroom Apple TV" }
];
function v(c, e) {
  if (typeof c == "number" && Number.isFinite(c))
    return c;
  const t = Number(c);
  return Number.isFinite(t) ? t : e;
}
function y(c) {
  return !c || c.state === "unavailable" || c.state === "unknown";
}
function ve(c) {
  return !!(v(c == null ? void 0 : c.attributes.supported_features, 0) & tt) || Array.isArray(c == null ? void 0 : c.attributes.group_members);
}
function w(c) {
  const e = String((c == null ? void 0 : c.attributes.app_id) ?? "").toLowerCase(), t = String((c == null ? void 0 : c.attributes.platform) ?? "").toLowerCase(), i = String((c == null ? void 0 : c.attributes.source) ?? "").toLowerCase(), s = Array.isArray(c == null ? void 0 : c.attributes.source_list) ? c.attributes.source_list.join(" ").toLowerCase() : "";
  return (c == null ? void 0 : c.attributes.mass_player_type) === "player" || c != null && c.attributes.active_queue || e.includes("music_assistant") || t.includes("music_assistant") ? !0 : t.includes("sonos") || Array.isArray(c == null ? void 0 : c.attributes.group_members) ? !1 : i.includes("music assistant") || s.includes("music assistant");
}
function we(c) {
  return !w(c) && Array.isArray(c == null ? void 0 : c.attributes.group_members);
}
function x(c) {
  return c.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Z(c) {
  return c.trim().toLowerCase().replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b(ma|mass)\b/g, "").replace(/\b(sonos|music assistant|speaker|player)\b/g, "").replace(/\s+/g, " ").trim();
}
function ke(c) {
  return (c.media_type || c.type) !== "playlist" ? !1 : /^infinite mix(?:\s*\(.*\))?$/i.test(String(c.name ?? "").trim());
}
function ot(c, e) {
  c.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
const re = class re extends R {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.playbackStatus = "", this.playbackSlow = !1, this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.browserHistory = [], this.albumTracks = [], this.albumLoading = !1, this.albumError = "", this.playlistTracks = [], this.playlistLoading = !1, this.playlistError = "", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "", this.playbackMemory = {}, this.transportPending = !1, this.favoriteItems = [], this.libraryItems = {
      playlist: [],
      album: [],
      artist: [],
      track: []
    }, this.libraryLoading = !1, this.libraryError = "", this.libraryLoaded = !1, this.libraryRequestId = 0, this.transferTargetEntityId = "", this.partyPending = !1, this.partyStatus = "", this.partyError = "", this.partyTargetId = "lanai", this.initialTabResolved = !1, this.searchRequestId = 0, this.albumRequestId = 0, this.playlistRequestId = 0, this.lastInitialQueueEntityId = "", this.lastQueueSignature = "", this.queueRequestId = 0, this.cachedMediaPlayers = [], this.cachedAllPlayers = [], this.cachedPlayerConfigKey = "", this.searchCache = /* @__PURE__ */ new Map(), this.searchInflight = /* @__PURE__ */ new Map(), this.browseCache = /* @__PURE__ */ new Map(), this.queueRefreshes = /* @__PURE__ */ new Map(), this.volumeOverrides = /* @__PURE__ */ new Map(), this.volumeCommitTimers = /* @__PURE__ */ new Map(), this.volumeResetTimers = /* @__PURE__ */ new Map(), this.artworkCacheRequests = /* @__PURE__ */ new Map();
  }
  static get styles() {
    return Pe`
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
        box-sizing: border-box;
        display: block;
        box-shadow: none;
        min-width: 0;
        width: 100%;
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
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 12px;
        display: grid;
        overflow: hidden;
        place-items: center;
      }

      .mini-art img {
        grid-area: 1 / 1;
        height: 100%;
        object-fit: cover;
        width: 100%;
        z-index: 1;
      }

      .mini-art ha-icon {
        --mdc-icon-size: 22px;
        color: var(--secondary-text-color, #b7c0ce);
        grid-area: 1 / 1;
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
        gap: 12px;
        min-height: 0;
      }

      .now-layout {
        align-items: start;
        display: grid;
        gap: 14px;
        min-width: 0;
      }

      .now-primary {
        display: grid;
        gap: 10px;
        justify-items: center;
        min-width: 0;
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
        max-width: min(280px, 76%);
        opacity: 1;
        position: relative;
        width: min(280px, 76%);
        transition:
          box-shadow 180ms ease,
          border-color 180ms ease,
          opacity 180ms ease;
      }

      .now-artwork.empty {
        background:
          radial-gradient(circle at 50% 36%, color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent), transparent 42%),
          linear-gradient(145deg, rgb(255 255 255 / 6%), rgb(255 255 255 / 2%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 18%, rgb(255 255 255 / 8%));
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 10%),
          0 14px 28px rgb(0 0 0 / 18%);
        width: min(250px, 64%);
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
        flex-direction: column;
        font-size: 13px;
        font-weight: 800;
        gap: 10px;
        height: 100%;
        justify-content: center;
      }

      .artwork-empty ha-icon {
        --mdc-icon-size: 44px;
        color: color-mix(in srgb, var(--gamma-sonos-accent) 62%, #ffffff 38%);
        filter: drop-shadow(0 0 18px color-mix(in srgb, var(--gamma-sonos-accent) 28%, transparent));
      }

      .empty-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
      }

      .empty-actions .small-action {
        align-items: center;
        display: inline-flex;
        gap: 6px;
        min-height: 34px;
        padding: 0 13px;
      }

      .empty-actions .primary {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 22%, transparent);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent);
      }

      .empty-actions ha-icon {
        --mdc-icon-size: 17px;
      }

      .now-view .metadata {
        width: 100%;
      }

      .up-next-card {
        align-content: start;
        align-self: start;
        background:
          linear-gradient(145deg, rgb(255 255 255 / 7%), rgb(255 255 255 / 3%)),
          color-mix(in srgb, var(--gamma-sonos-background) 94%, #000000 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 18px;
        box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
        box-sizing: border-box;
        display: grid;
        gap: 10px;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
        padding: 12px;
        width: 100%;
      }

      .up-next-header,
      .queue-title-row {
        align-items: center;
        display: flex;
        gap: 8px;
        justify-content: space-between;
        min-width: 0;
      }

      .up-next-title,
      .queue-title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .eyebrow {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 850;
        letter-spacing: 0.09em;
        text-transform: uppercase;
      }

      .up-next-heading,
      .queue-heading {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 16px;
        font-weight: 850;
        line-height: 1.1;
      }

      .queue-count {
        align-items: center;
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        display: inline-flex;
        flex: 0 0 auto;
        font-size: 10px;
        font-weight: 850;
        height: 22px;
        justify-content: center;
        min-width: 22px;
        padding: 0 6px;
      }

      .queue-preview-list {
        box-sizing: border-box;
        display: grid;
        gap: 6px;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
        width: 100%;
      }

      .queue-empty {
        align-items: center;
        background: rgb(255 255 255 / 4%);
        border: 1px dashed rgb(255 255 255 / 12%);
        border-radius: 14px;
        color: var(--secondary-text-color, #b7c0ce);
        display: grid;
        gap: 7px;
        justify-items: center;
        min-height: 116px;
        padding: 14px;
        text-align: center;
      }

      .queue-empty ha-icon {
        --mdc-icon-size: 26px;
        color: color-mix(in srgb, var(--gamma-sonos-accent) 60%, #ffffff 40%);
      }

      .queue-empty strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 13px;
      }

      .queue-empty span {
        font-size: 11px;
        line-height: 1.3;
      }

      .queue-empty-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: center;
      }

      .queue-empty-actions .small-action {
        min-height: 30px;
      }

      @container (min-width: 620px) {
        .now-layout.with-queue {
          grid-template-columns: minmax(300px, 1fr) minmax(220px, 0.62fr);
        }

        .now-layout.with-queue .now-artwork {
          max-width: min(270px, 88%);
          width: min(270px, 88%);
        }

        .now-layout.with-queue .progress-cluster {
          width: min(320px, 92%);
        }
      }

      .progress-cluster {
        display: grid;
        gap: 5px;
        width: min(340px, 88%);
      }

      .progress {
        background: rgb(255 255 255 / 13%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        height: 6px;
        overflow: hidden;
        width: 100%;
      }

      .progress-fill {
        background: color-mix(in srgb, var(--primary-text-color, #f4f7fb) 58%, var(--gamma-sonos-accent) 42%);
        border-radius: inherit;
        box-shadow: 0 0 14px rgb(255 255 255 / 16%);
        height: 100%;
        min-width: 0;
        transition: width 180ms ease;
      }

      .progress-time {
        color: var(--secondary-text-color, #b7c0ce);
        display: flex;
        font-size: 10px;
        font-variant-numeric: tabular-nums;
        font-weight: 650;
        justify-content: space-between;
        padding: 0 2px;
      }

      @keyframes gamma-sonos-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes gamma-sonos-live-pulse {
        0%,
        100% {
          opacity: 0.72;
          transform: scale(0.82);
        }

        50% {
          opacity: 1;
          transform: scale(1.18);
        }
      }

      @keyframes gamma-sonos-equalizer {
        0%,
        100% {
          transform: scaleY(0.3);
        }

        50% {
          transform: scaleY(1);
        }
      }

      @keyframes gamma-sonos-room-glow {
        0%,
        100% {
          box-shadow: 0 0 0 color-mix(in srgb, var(--gamma-sonos-accent) 0%, transparent);
        }

        50% {
          box-shadow: 0 0 14px color-mix(in srgb, var(--gamma-sonos-accent) 12%, transparent);
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
        gap: 8px;
        grid-template-columns: minmax(0, 1fr);
        justify-content: initial;
      }

      .header-identity {
        align-items: center;
        display: grid;
        gap: 10px;
        grid-template-columns: minmax(190px, 260px) minmax(0, 1fr);
        min-width: 0;
      }

      .title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .playing-rooms {
        align-items: center;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-flex;
        gap: 7px;
        justify-self: end;
        max-width: 100%;
        min-width: 0;
        text-align: left;
      }

      .playing-rooms > i {
        animation: gamma-sonos-live-pulse 1.8s ease-in-out infinite;
        background: var(--gamma-sonos-accent);
        border-radius: 999px;
        box-shadow: 0 0 7px color-mix(in srgb, var(--gamma-sonos-accent) 65%, transparent);
        flex: 0 0 auto;
        height: 6px;
        width: 6px;
      }

      .playing-rooms.idle > i {
        animation: none;
        background: #7f8793;
        box-shadow: none;
      }

      .playing-rooms-copy {
        display: grid;
        gap: 1px;
        min-width: 0;
      }

      .playing-rooms small,
      .playing-rooms strong {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .playing-rooms small {
        font-size: 7px;
        font-weight: 800;
        letter-spacing: 0.07em;
        text-transform: uppercase;
      }

      .playing-rooms strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 9.5px;
        font-weight: 800;
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
        align-items: center;
        background: transparent;
        border-radius: 999px;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-flex;
        font-size: 12px;
        font-weight: 700;
        gap: 5px;
        justify-content: center;
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

      .player-select {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 11%);
        border-radius: 999px;
        box-sizing: border-box;
        box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
        color: var(--primary-text-color, #f4f7fb);
        cursor: pointer;
        display: grid;
        gap: 6px;
        grid-template-columns: 7px minmax(0, 1fr) 14px;
        max-width: min(210px, 100%);
        min-height: 31px;
        min-width: 0;
        padding: 2px 7px 2px 9px;
        position: relative;
        transition: border-color 140ms ease, background 140ms ease;
        width: 100%;
      }

      .player-select:hover,
      .player-select:focus-within {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 11%, rgb(255 255 255 / 6%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 42%, transparent);
      }

      .player-select-dot {
        background: var(--gamma-sonos-accent);
        border-radius: 999px;
        box-shadow: 0 0 9px color-mix(in srgb, var(--gamma-sonos-accent) 62%, transparent);
        height: 7px;
        width: 7px;
      }

      .player-select-dot.offline {
        background: #7f8793;
        box-shadow: none;
      }

      .player-select-copy {
        display: grid;
        gap: 0;
        min-width: 0;
      }

      .player-select-name {
        font-size: 11px;
        font-weight: 800;
        line-height: 1.15;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .player-select-status {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 7px;
        font-weight: 760;
        letter-spacing: 0.07em;
        line-height: 1.1;
        text-transform: uppercase;
      }

      .player-select > ha-icon {
        --mdc-icon-size: 14px;
        color: var(--secondary-text-color, #b7c0ce);
      }

      .player-select select {
        appearance: none;
        cursor: pointer;
        inset: 0;
        opacity: 0;
        position: absolute;
        width: 100%;
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

      .now-context {
        align-items: center;
        color: var(--secondary-text-color, #b7c0ce);
        display: flex;
        flex-wrap: wrap;
        font-size: 10px;
        font-weight: 720;
        gap: 6px;
        justify-content: center;
        letter-spacing: 0.025em;
      }

      .now-context > span:not(:last-child)::after {
        color: rgb(255 255 255 / 28%);
        content: '·';
        margin-left: 6px;
      }

      .playback-state {
        align-items: center;
        display: inline-flex;
        gap: 5px;
      }

      .playback-state::before {
        background: #7f8793;
        border-radius: 999px;
        content: '';
        height: 6px;
        width: 6px;
      }

      .playback-state.active::before {
        background: var(--gamma-sonos-accent);
        box-shadow: 0 0 8px color-mix(in srgb, var(--gamma-sonos-accent) 58%, transparent);
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

      .volume-row.primary,
      .volume-row.compact {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        box-sizing: border-box;
        padding: 5px 8px 5px 6px;
      }

      .volume-row.primary {
        width: min(340px, 92%);
      }

      .volume-row.compact {
        width: 100%;
      }

      .volume-row .volume-button {
        box-shadow: none;
        height: 32px;
        width: 32px;
      }

      .volume-row .volume-button ha-icon {
        --mdc-icon-size: 18px;
      }

      .volume-value {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
        font-variant-numeric: tabular-nums;
        font-weight: 750;
        min-width: 28px;
        text-align: right;
      }

      .volume-value::after {
        content: '%';
      }

      input[type='range'] {
        accent-color: var(--gamma-sonos-accent);
        flex: 1;
        min-width: 0;
      }

      .tabs {
        display: grid;
        grid-auto-columns: minmax(0, 1fr);
        grid-auto-flow: column;
      }

      .tabs button {
        gap: 6px;
        min-width: 0;
        padding: 0 8px;
        position: relative;
      }

      .tabs button ha-icon {
        --mdc-icon-size: 17px;
        color: currentColor;
        filter: none;
      }

      .grouping,
      .search,
      .speakers,
      .queue,
      .party {
        display: grid;
        gap: 8px;
      }

      .party-hero {
        background:
          radial-gradient(circle at 85% 10%, color-mix(in srgb, var(--gamma-sonos-accent) 28%, transparent), transparent 46%),
          rgb(255 255 255 / 5%);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 28%, rgb(255 255 255 / 8%));
        border-radius: 16px;
        display: grid;
        gap: 12px;
        padding: 16px;
      }

      .party-heading {
        align-items: center;
        display: grid;
        gap: 12px;
        grid-template-columns: auto minmax(0, 1fr);
      }

      .party-icon {
        align-items: center;
        background: color-mix(in srgb, var(--gamma-sonos-accent) 22%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 35%, transparent);
        border-radius: 14px;
        display: inline-flex;
        height: 48px;
        justify-content: center;
        width: 48px;
      }

      .party-icon ha-icon {
        --mdc-icon-size: 27px;
      }

      .party-copy {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .party-title {
        font-size: 18px;
        font-weight: 850;
      }

      .party-target,
      .party-description {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        line-height: 1.4;
      }

      .party-tv-picker {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        display: grid;
        gap: 10px;
        grid-template-columns: auto minmax(0, 1fr) auto;
        min-height: 58px;
        padding: 8px 10px;
      }

      .party-tv-picker > ha-icon {
        --mdc-icon-size: 25px;
        color: var(--gamma-sonos-accent);
      }

      .party-tv-copy {
        display: grid;
        gap: 1px;
        min-width: 0;
      }

      .party-tv-copy strong {
        font-size: 13px;
      }

      .party-tv-copy small {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
      }

      .party-tv-picker select {
        appearance: none;
        background:
          linear-gradient(45deg, transparent 50%, currentColor 50%) right 15px top 50% / 6px 6px no-repeat,
          linear-gradient(135deg, currentColor 50%, transparent 50%) right 10px top 50% / 6px 6px no-repeat,
          rgb(255 255 255 / 7%);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 28%, rgb(255 255 255 / 10%));
        border-radius: 11px;
        color: var(--primary-text-color, #f4f7fb);
        font: inherit;
        font-size: 12px;
        font-weight: 750;
        max-width: 190px;
        min-height: 38px;
        padding: 0 32px 0 12px;
      }

      .party-actions {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
      }

      .party-action {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 13px;
        color: var(--primary-text-color, #f4f7fb);
        display: inline-flex;
        font: inherit;
        font-size: 13px;
        font-weight: 800;
        gap: 8px;
        justify-content: center;
        min-height: 46px;
        padding: 0 12px;
      }

      .party-action.start {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 25%, transparent);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 42%, transparent);
      }

      .party-action.stop {
        border-color: rgb(255 143 133 / 25%);
      }

      .party-feedback {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 11%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 22%, transparent);
        border-radius: 11px;
        color: var(--primary-text-color, #f4f7fb);
        font-size: 12px;
        font-weight: 700;
        padding: 9px 11px;
      }

      .tab-content {
        min-height: 0;
        overflow-x: hidden;
        overflow-y: visible;
      }

      .playback-feedback {
        align-items: center;
        background: color-mix(in srgb, var(--gamma-sonos-accent) 12%, rgb(255 255 255 / 5%));
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 26%, transparent);
        border-radius: 12px;
        display: grid;
        gap: 8px;
        grid-template-columns: auto minmax(0, 1fr) auto;
        min-height: 42px;
        padding: 7px 10px;
      }

      .playback-feedback.failed {
        background: rgb(255 116 104 / 9%);
        border-color: rgb(255 143 133 / 28%);
      }

      .playback-feedback > ha-icon {
        --mdc-icon-size: 19px;
      }

      .playback-feedback:not(.failed):not(.slow) > ha-icon {
        animation: gamma-sonos-spin 900ms linear infinite;
      }

      .playback-feedback > span:not(.feedback-actions) {
        font-size: 12px;
        font-weight: 700;
        line-height: 1.3;
      }

      .feedback-actions {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: end;
      }

      .transfer-panel {
        align-items: center;
        display: grid;
        gap: 6px;
        grid-template-columns: auto minmax(0, 1fr) auto;
      }

      .transfer-label {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 9px;
        font-weight: 850;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .transfer-panel select {
        appearance: none;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        font: inherit;
        font-size: 10px;
        min-height: 32px;
        min-width: 0;
        padding: 0 9px;
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

      .speaker-workspace-heading {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .speaker-heading-line {
        align-items: center;
        display: flex;
        gap: 9px;
        justify-content: space-between;
        min-width: 0;
      }

      .speaker-heading-line > strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: clamp(17px, 3vw, 21px);
        line-height: 1.05;
      }

      .speaker-workspace-heading small {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 9.5px;
      }

      .speaker-main-label {
        align-items: center;
        background: color-mix(in srgb, var(--gamma-sonos-accent) 11%, rgb(255 255 255 / 5%));
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 25%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        display: inline-flex;
        flex: 0 0 auto;
        font-size: 9px;
        font-weight: 800;
        gap: 5px;
        max-width: 58%;
        min-height: 24px;
        overflow: hidden;
        padding: 0 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .speaker-main-label i {
        background: var(--gamma-sonos-accent);
        border-radius: 999px;
        box-shadow: 0 0 7px color-mix(in srgb, var(--gamma-sonos-accent) 64%, transparent);
        flex: 0 0 auto;
        height: 5px;
        width: 5px;
      }

      .speaker-grid {
        display: grid;
        gap: 6px;
        grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
      }

      .speaker-tile {
        background: linear-gradient(145deg, rgb(255 255 255 / 6%), rgb(255 255 255 / 3%));
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 12px;
        display: grid;
        gap: 7px;
        grid-template-columns: 34px minmax(0, 1fr) auto auto;
        min-height: 52px;
        min-width: 0;
        padding: 6px 7px;
        transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;
      }

      .speaker-tile:hover {
        border-color: rgb(255 255 255 / 16%);
        transform: translateY(-1px);
      }

      .speaker-tile.playing,
      .speaker-tile.grouped,
      .speaker-tile.selected {
        background:
          radial-gradient(circle at 10% 0%, color-mix(in srgb, var(--gamma-sonos-accent) 18%, transparent), transparent 48%),
          rgb(255 255 255 / 5%);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent);
      }

      .speaker-tile.playing {
        animation: gamma-sonos-room-glow 2.6s ease-in-out infinite;
      }

      .speaker-tile.offline {
        opacity: 0.55;
      }

      .speaker-select {
        align-items: center;
        appearance: none;
        align-self: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 12%);
        border-radius: 10px;
        color: inherit;
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        height: 34px;
        justify-content: center;
        padding: 0;
        width: 34px;
      }

      .speaker-select:disabled {
        opacity: 1;
      }

      .speaker-select-mark {
        align-items: center;
        display: inline-flex;
        justify-content: center;
      }

      .speaker-select-mark ha-icon {
        --mdc-icon-size: 17px;
      }

      .speaker-tile.grouped .speaker-select-mark,
      .speaker-tile.selected .speaker-select-mark {
        color: #07110c;
      }

      .speaker-tile.grouped .speaker-select,
      .speaker-tile.selected .speaker-select {
        background: var(--gamma-sonos-accent);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 78%, #ffffff 22%);
      }

      .speaker-tile-copy {
        align-self: center;
        display: grid;
        gap: 1px;
        min-width: 0;
      }

      .speaker-tile-copy strong,
      .speaker-tile-copy small {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .speaker-tile-copy strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 11.5px;
        font-weight: 850;
      }

      .speaker-tile-copy small {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 8.5px;
      }

      .speaker-state-badge {
        align-self: center;
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 7.5px;
        font-weight: 850;
        grid-column: 3;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .speaker-tile-copy small {
        align-items: center;
        display: inline-flex;
        gap: 4px;
      }

      .speaker-playing-indicator {
        align-items: end;
        display: inline-flex;
        flex: 0 0 auto;
        gap: 1.5px;
        height: 8px;
        width: 10px;
      }

      .speaker-playing-indicator i {
        animation: gamma-sonos-equalizer 760ms ease-in-out infinite;
        background: var(--gamma-sonos-accent);
        border-radius: 999px;
        box-shadow: 0 0 6px color-mix(in srgb, var(--gamma-sonos-accent) 55%, transparent);
        height: 100%;
        transform: scaleY(0.3);
        transform-origin: center bottom;
        width: 2px;
      }

      .speaker-playing-indicator i:nth-child(2) {
        animation-delay: -380ms;
      }

      .speaker-playing-indicator i:nth-child(3) {
        animation-delay: -190ms;
      }

      .speaker-room-action {
        align-items: center;
        appearance: none;
        align-self: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        color: var(--gamma-sonos-accent);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-size: 8px;
        font-weight: 800;
        grid-column: 4;
        justify-content: center;
        min-height: 28px;
        padding: 0 8px;
        white-space: nowrap;
      }

      .speaker-room-action:disabled {
        color: var(--secondary-text-color, #b7c0ce);
      }

      .speaker-selection-bar {
        align-items: center;
        background: color-mix(in srgb, var(--gamma-sonos-accent) 9%, rgb(255 255 255 / 4%));
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-radius: 12px;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        padding: 7px 8px;
      }

      .speaker-selection-copy {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .speaker-selection-copy strong {
        font-size: 11px;
      }

      .speaker-selection-copy small {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 8.5px;
      }

      .speaker-selection-actions {
        display: flex;
        flex: 0 0 auto;
        gap: 6px;
      }

      .speaker-selection-actions .small-action {
        align-items: center;
        display: inline-flex;
        gap: 5px;
        white-space: nowrap;
      }

      .speaker-selection-actions ha-icon {
        --mdc-icon-size: 15px;
      }

      .speaker-selection-actions .primary {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 38%, transparent);
      }

      .speaker-selection-actions .danger {
        border-color: rgb(255 139 139 / 25%);
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

      .browse-heading,
      .library-shelf-heading {
        align-items: center;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        min-width: 0;
      }

      .browse-heading > span {
        display: grid;
        gap: 2px;
      }

      .browse-heading strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: clamp(18px, 3vw, 24px);
        line-height: 1.05;
      }

      .browse-heading .small-action {
        align-items: center;
        display: inline-flex;
        gap: 5px;
      }

      .browse-heading .small-action ha-icon {
        --mdc-icon-size: 15px;
      }

      .browse-heading .small-action:disabled ha-icon,
      .library-loading ha-icon {
        animation: gamma-sonos-spin 900ms linear infinite;
      }

      .library-home {
        display: grid;
        gap: 16px;
      }

      .library-shelf {
        display: grid;
        gap: 8px;
        min-width: 0;
      }

      .library-shelf-heading strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 13px;
        font-weight: 850;
      }

      .library-shelf-heading span {
        align-items: center;
        background: rgb(255 255 255 / 7%);
        border-radius: 999px;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-flex;
        font-size: 9px;
        font-weight: 850;
        height: 20px;
        justify-content: center;
        min-width: 20px;
        padding: 0 5px;
      }

      .library-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(82px, 1fr));
        min-width: 0;
      }

      .library-card {
        appearance: none;
        background: transparent;
        border: 0;
        color: inherit;
        cursor: pointer;
        display: grid;
        font: inherit;
        gap: 6px;
        min-width: 0;
        padding: 0;
        text-align: left;
      }

      .library-art {
        aspect-ratio: 1;
        background:
          radial-gradient(circle at 32% 18%, color-mix(in srgb, var(--gamma-sonos-accent) 17%, transparent), transparent 48%),
          rgb(255 255 255 / 5%);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 13px;
        box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%);
        display: grid;
        overflow: hidden;
        place-items: center;
        position: relative;
        transition: border-color 140ms ease, transform 140ms ease;
      }

      .library-card:hover .library-art {
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 45%, transparent);
        transform: translateY(-2px);
      }

      .library-art > ha-icon {
        --mdc-icon-size: 30px;
        color: color-mix(in srgb, var(--gamma-sonos-accent) 54%, #ffffff 46%);
      }

      .library-play {
        align-items: center;
        backdrop-filter: blur(10px);
        background: color-mix(in srgb, var(--gamma-sonos-accent) 68%, rgb(10 16 24 / 50%));
        border-radius: 999px;
        bottom: 7px;
        box-shadow: 0 5px 14px rgb(0 0 0 / 30%);
        display: inline-flex;
        height: 28px;
        justify-content: center;
        position: absolute;
        right: 7px;
        width: 28px;
      }

      .library-play ha-icon {
        --mdc-icon-size: 16px;
        color: #07110c;
      }

      .library-card-copy {
        display: grid;
        gap: 1px;
        min-width: 0;
        padding: 0 2px;
      }

      .library-card-copy strong,
      .library-card-copy small {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .library-card-copy strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 11px;
        font-weight: 800;
      }

      .library-card-copy small {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 9px;
      }

      .library-loading,
      .library-empty {
        align-items: center;
        background: rgb(255 255 255 / 4%);
        border: 1px dashed rgb(255 255 255 / 11%);
        border-radius: 15px;
        color: var(--secondary-text-color, #b7c0ce);
        display: flex;
        font-size: 12px;
        gap: 10px;
        min-height: 72px;
        padding: 12px;
      }

      .library-empty > ha-icon {
        --mdc-icon-size: 28px;
        color: var(--gamma-sonos-accent);
      }

      .library-empty > span {
        display: grid;
        gap: 2px;
      }

      .library-empty strong {
        color: var(--primary-text-color, #f4f7fb);
      }

      .library-empty small {
        line-height: 1.35;
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
        overflow: visible;
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
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 16px;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        min-width: 0;
        padding: 10px 12px;
      }

      .queue-list {
        display: grid;
        gap: 7px;
        max-height: 420px;
        overflow: auto;
        padding-right: 2px;
      }

      .queue-current {
        align-items: center;
        background:
          linear-gradient(145deg, color-mix(in srgb, var(--gamma-sonos-accent) 13%, transparent), rgb(255 255 255 / 3%));
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 22%, rgb(255 255 255 / 7%));
        border-radius: 16px;
        display: grid;
        gap: 10px;
        grid-template-columns: 50px minmax(0, 1fr) auto;
        min-width: 0;
        padding: 9px;
      }

      .queue-current-art,
      .queue-item-art {
        aspect-ratio: 1;
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 68%),
          rgb(255 255 255 / 6%);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 10px;
        display: grid;
        place-items: center;
      }

      .queue-current-art {
        height: 50px;
        width: 50px;
      }

      .queue-current-art ha-icon,
      .queue-item-art ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color, #b7c0ce);
      }

      .queue-current-meta,
      .queue-item-meta {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .queue-now-label {
        color: var(--gamma-sonos-accent);
        font-size: 9px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .queue-current-title,
      .queue-item-title,
      .queue-item-subtitle {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .queue-current-title,
      .queue-item-title {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 13px;
        font-weight: 800;
      }

      .queue-item-subtitle {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10.5px;
      }

      .playing-pulse {
        background: var(--gamma-sonos-accent);
        border-radius: 999px;
        box-shadow: 0 0 14px color-mix(in srgb, var(--gamma-sonos-accent) 70%, transparent);
        height: 8px;
        margin-right: 6px;
        width: 8px;
      }

      .queue-item {
        align-items: center;
        appearance: none;
        background: rgb(255 255 255 / 4%);
        border: 1px solid rgb(255 255 255 / 7%);
        border-radius: 13px;
        box-sizing: border-box;
        color: inherit;
        cursor: pointer;
        display: grid;
        font: inherit;
        gap: 8px;
        grid-template-columns: 24px 42px minmax(0, 1fr) 32px;
        max-width: 100%;
        min-width: 0;
        padding: 7px;
        text-align: left;
        transition:
          background 140ms ease,
          border-color 140ms ease,
          transform 140ms ease;
        width: 100%;
      }

      .queue-item:hover {
        background: rgb(255 255 255 / 7%);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 24%, rgb(255 255 255 / 8%));
      }

      .queue-item:active {
        transform: scale(0.992);
      }

      .queue-item.compact {
        background: rgb(255 255 255 / 3%);
        border-radius: 11px;
        grid-template-columns: 20px 36px minmax(0, 1fr) 28px;
        padding: 6px;
      }

      .queue-position {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-variant-numeric: tabular-nums;
        font-weight: 850;
        text-align: center;
      }

      .queue-item-art {
        height: 42px;
        width: 42px;
      }

      .queue-item.compact .queue-item-art {
        height: 36px;
        width: 36px;
      }

      .queue-play {
        align-items: center;
        appearance: none;
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 22%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        cursor: pointer;
        display: inline-flex;
        height: 30px;
        justify-content: center;
        padding: 0;
        width: 30px;
      }

      .queue-item.compact .queue-play {
        height: 28px;
        width: 28px;
      }

      .queue-play ha-icon {
        --mdc-icon-size: 15px;
      }

      .queue-toolbar-actions {
        align-items: center;
        display: inline-flex;
        flex: 0 0 auto;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: flex-end;
        max-width: 100%;
      }

      .tab-count {
        align-items: center;
        background: rgb(255 255 255 / 10%);
        border-radius: 999px;
        display: inline-flex;
        font-size: 9px;
        height: 17px;
        justify-content: center;
        min-width: 17px;
        padding: 0 4px;
      }

      .tabs button.active .tab-count {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 30%, transparent);
      }

      @container (max-width: 520px) {
        .player {
          border-radius: 18px;
          padding: 11px;
        }

        .player-select {
          max-width: min(210px, 100%);
        }

        .library-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .tabs button {
          flex-direction: column;
          font-size: 9px;
          gap: 1px;
          line-height: 1;
          min-height: 42px;
          padding: 3px 2px;
        }

        .tabs button ha-icon {
          --mdc-icon-size: 18px;
        }

        .tab-count {
          position: absolute;
          transform: translate(16px, -8px);
        }

        .now-layout {
          gap: 12px;
        }

        .now-artwork {
          max-width: min(230px, 72vw);
          width: min(230px, 72vw);
        }

        .now-artwork.has-art::before {
          inset: -18px;
          opacity: 0.42;
        }

        .track {
          font-size: clamp(19px, 6.2vw, 24px);
        }

        .up-next-card {
          border-radius: 15px;
          padding: 10px;
          width: 100%;
        }

        .up-next-header,
        .queue-title-row,
        .queue-header {
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .queue-toolbar-actions {
          margin-left: auto;
        }

        .volume-row.primary {
          width: min(330px, 100%);
        }

        .mini-player {
          grid-template-columns: 42px minmax(0, 1fr) auto;
          min-height: 56px;
        }

        .mini-controls .icon-button {
          display: none;
        }

        .mini-controls .play-button {
          height: 42px;
          width: 42px;
        }
      }

      @container (max-width: 400px) {
        .header-identity {
          align-items: stretch;
          grid-template-columns: 1fr;
        }

        .playing-rooms {
          justify-self: start;
        }

        .transfer-panel {
          grid-template-columns: minmax(0, 1fr) auto;
        }

        .transfer-label {
          grid-column: 1 / -1;
        }

        .speaker-selection-bar {
          align-items: stretch;
          flex-direction: column;
        }

        .speaker-selection-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          width: 100%;
        }

        .speaker-selection-actions .small-action {
          justify-content: center;
        }

        .speaker-grid {
          grid-template-columns: 1fr;
        }

        .speaker-heading-line {
          align-items: flex-start;
        }

        .speaker-main-label {
          max-width: 54%;
        }
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

        .tabs button {
          padding: 0 6px;
        }

        .queue-item {
          gap: 6px;
          grid-template-columns: 20px 36px minmax(0, 1fr) 30px;
        }

        .queue-item-art {
          height: 36px;
          width: 36px;
        }

        .queue-current {
          grid-template-columns: 42px minmax(0, 1fr) auto;
        }

        .queue-current-art {
          height: 42px;
          width: 42px;
        }
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

      @media (prefers-reduced-motion: reduce) {
        .playing-rooms > i,
        .speaker-playing-indicator i,
        .speaker-tile.playing {
          animation: none;
        }

        .speaker-playing-indicator i {
          transform: scaleY(0.72);
        }
      }
    `;
  }
  static getStubConfig(e, t) {
    return {
      entities: t.filter((i) => i.startsWith("media_player."))
    };
  }
  static async getConfigElement() {
    return document.createElement("gamma-sonos-player-card-editor");
  }
  setConfig(e) {
    this.config = { ...k, ...e }, this.selectedEntityId = this.config.entity || this.readStorage(L) || "", this.cachedPlayerConfigKey = "", this.playbackMemory = this.readPlaybackMemory(), this.favoriteItems = this.readFavoriteItems(), this.style.setProperty(
      "--gamma-sonos-width",
      this.config.fill_container ? "100%" : this.config.width ?? k.width
    ), this.style.setProperty("--gamma-sonos-height", this.config.height ?? k.height), this.style.setProperty(
      "--gamma-sonos-background",
      this.config.background ?? k.background
    ), this.style.setProperty(
      "--gamma-sonos-accent",
      this.config.accent_color ?? k.accent_color
    );
  }
  shouldUpdate(e) {
    if (!this.config || !e.has("hass") || e.size > 1)
      return !0;
    const t = e.get("hass"), i = this.hass, s = [...new Set([
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? [],
      this.config.entity ?? "",
      this.selectedEntityId
    ].filter(Boolean))];
    if (!t || !i || s.length === 0 || t.callService !== i.callService || t.callWS !== i.callWS)
      return !0;
    const r = new Set(s);
    return s.forEach((a) => {
      [t.states[a], i.states[a]].forEach((o) => {
        const n = o == null ? void 0 : o.attributes.group_members;
        Array.isArray(n) && n.forEach((u) => r.add(u));
      });
    }), [...r].some((a) => t.states[a] !== i.states[a]);
  }
  updated() {
    this.config && (this.reconcileVolumeOverrides(), this.rememberPlaybackState(), this.scheduleInitialQueueRefresh(), this.scheduleQueueRefreshForPlayback(), this.syncProgressTimer(), this.initialTabResolved || (this.initialTabResolved = !0, this.activeTab = "now"), this.isPlaying && (this.playbackStatus || this.playbackSlow) && (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.searchTimer), window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), window.clearTimeout(this.playbackFeedbackTimer), window.clearInterval(this.progressTimer), window.cancelAnimationFrame(this.volumeRenderFrame ?? 0), this.progressTimer = void 0, this.volumeRenderFrame = void 0, this.searchRequestId += 1, this.albumRequestId += 1, this.playlistRequestId += 1, this.libraryRequestId += 1, this.queueRequestId += 1, this.volumeCommitTimers.forEach((e) => window.clearTimeout(e)), this.volumeResetTimers.forEach((e) => window.clearTimeout(e)), this.volumeCommitTimers.clear(), this.volumeResetTimers.clear(), this.artworkCacheRequests.clear(), this.searchInflight.clear(), this.queueRefreshes.clear();
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
    const e = (t = this.hass) == null ? void 0 : t.states;
    return e !== this.cachedStates && (this.cachedStates = e, this.cachedMediaPlayers = Object.values(e ?? {}).filter((i) => !!i).filter((i) => i.entity_id.startsWith("media_player.")), this.cachedAllPlayers = [], this.cachedPlayerConfigKey = ""), this.cachedMediaPlayers;
  }
  isDiscoverablePlayer(e) {
    const t = String(e.attributes.platform ?? "").toLowerCase(), i = String(e.attributes.device_class ?? "").toLowerCase(), s = String(e.attributes.icon ?? "").toLowerCase(), r = String(e.attributes.source ?? "").toLowerCase();
    return i === "speaker" || s.includes("speaker") || r.includes("music assistant") || e.attributes.mass_player_type === "player" || t.includes("sonos") || t.includes("music_assistant") || e.entity_id.includes("sonos") || e.entity_id.includes("music_assistant");
  }
  dedupePlayers(e) {
    const t = /* @__PURE__ */ new Set();
    return e.filter((i) => t.has(i.entity_id) ? !1 : (t.add(i.entity_id), !0));
  }
  roomKey(e) {
    return this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id));
  }
  normalizedRoomName(e) {
    return Z(e);
  }
  preferredRoomPlayer(e, t) {
    if (e.entity_id === this.selectedEntityId || t.entity_id === this.selectedEntityId)
      return t.entity_id === this.selectedEntityId ? t : e;
    if (e.state === "playing" != (t.state === "playing"))
      return t.state === "playing" ? t : e;
    if (y(e) !== y(t))
      return y(e) ? t : e;
    const i = !!(e.attributes.media_title || e.attributes.entity_picture || e.attributes.entity_picture_local || e.attributes.media_image_url), s = !!(t.attributes.media_title || t.attributes.entity_picture || t.attributes.entity_picture_local || t.attributes.media_image_url);
    return i !== s ? s ? t : e : w(t) && !w(e) ? t : e;
  }
  dedupeRoomPlayers(e) {
    const t = /* @__PURE__ */ new Map();
    return e.forEach((i) => {
      const s = this.roomKey(i), r = t.get(s);
      t.set(s, r ? this.preferredRoomPlayer(r, i) : i);
    }), [...t.values()];
  }
  get allPlayers() {
    const e = [.../* @__PURE__ */ new Set([
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? []
    ])];
    if (e.length > 0)
      return this.dedupeRoomPlayers(e.map((s) => {
        var r;
        return (r = this.hass) == null ? void 0 : r.states[s];
      }).filter((s) => !!s));
    const t = [
      this.selectedEntityId,
      e.join("\0"),
      (this.config.music_assistant_entities ?? []).join("\0")
    ].join("");
    if (this.mediaPlayers, this.cachedAllPlayers.length > 0 && this.cachedPlayerConfigKey === t)
      return this.cachedAllPlayers;
    const i = this.dedupeRoomPlayers(
      this.cachedMediaPlayers.filter((s) => this.isDiscoverablePlayer(s))
    );
    return this.cachedPlayerConfigKey = t, this.cachedAllPlayers = i, i;
  }
  get currentlyPlayingPlayer() {
    return this.allPlayers.find((e) => e.state === "playing");
  }
  get currentlyPlayingPlayers() {
    return this.dedupeRoomPlayers(this.allPlayers.filter((e) => e.state === "playing"));
  }
  get playingRoomPlayers() {
    const e = this.currentlyPlayingPlayers, t = this.playbackPlayer;
    if (!t || t.state !== "playing")
      return e;
    const i = Array.isArray(t.attributes.group_members) ? t.attributes.group_members : [], s = this.nativeSonosMatch(t), r = Array.isArray(s == null ? void 0 : s.attributes.group_members) ? s.attributes.group_members : [], o = (r.length > i.length ? r : i).map((n) => this.visibleRoomEntityId(n)).map((n) => this.allPlayers.find((u) => u.entity_id === n)).filter((n) => !!n);
    return this.dedupeRoomPlayers([...e, ...o]);
  }
  get activePlayer() {
    return this.allPlayers.find((t) => t.entity_id === this.selectedEntityId) ?? this.currentlyPlayingPlayer ?? this.allPlayers[0];
  }
  get activeEntityId() {
    var e;
    return ((e = this.activePlayer) == null ? void 0 : e.entity_id) ?? this.selectedEntityId;
  }
  get playbackPlayer() {
    const e = this.activePlayer;
    return e && (e.state === "playing" || e.attributes.media_title || e.attributes.entity_picture || e.attributes.entity_picture_local) ? e : void 0;
  }
  get playbackEntityId() {
    var e;
    return ((e = this.playbackPlayer) == null ? void 0 : e.entity_id) ?? this.activeEntityId;
  }
  get activeName() {
    var e;
    return ((e = this.activePlayer) == null ? void 0 : e.attributes.friendly_name) ?? this.activeEntityId;
  }
  isEphemeralArtworkUrl(e) {
    return e.includes("/api/media_player_proxy/");
  }
  get artworkUrl() {
    var o, n, u, h, d, m, g, b, f, A;
    const e = String(
      ((o = this.playbackPlayer) == null ? void 0 : o.attributes.entity_picture) || ((n = this.playbackPlayer) == null ? void 0 : n.attributes.entity_picture_local) || ((u = this.playbackPlayer) == null ? void 0 : u.attributes.media_image_url) || ""
    );
    if (e)
      return e;
    const t = String(
      ((h = this.optimisticPlaybackItem) == null ? void 0 : h.image) || ((d = this.optimisticPlaybackItem) == null ? void 0 : d.thumb) || ((g = (m = this.optimisticPlaybackItem) == null ? void 0 : m.album) == null ? void 0 : g.image) || ""
    );
    if (t)
      return t;
    const i = String(((b = this.activeMemory) == null ? void 0 : b.title) ?? "").trim().toLowerCase(), s = i ? this.queueItems.find((_) => String(_.name ?? "").trim().toLowerCase() === i) : void 0, r = String(
      (s == null ? void 0 : s.image) || (s == null ? void 0 : s.thumb) || ((f = s == null ? void 0 : s.album) == null ? void 0 : f.image) || ""
    );
    if (r)
      return r;
    const a = String(((A = this.activeMemory) == null ? void 0 : A.artwork) ?? "");
    return this.isEphemeralArtworkUrl(a) ? "" : a;
  }
  get isPlaying() {
    var e;
    return ((e = this.playbackPlayer) == null ? void 0 : e.state) === "playing";
  }
  get activeMemory() {
    return this.playbackMemory[this.activeEntityId];
  }
  get volume() {
    var s;
    const e = this.volumeEntityId, t = (s = this.hass) == null ? void 0 : s.states[e], i = Math.round(v(t == null ? void 0 : t.attributes.volume_level, 0) * 100);
    return this.volumeOverrides.get(e) ?? i;
  }
  get volumeEntityId() {
    return this.isPlaying ? this.playbackEntityId : this.activeEntityId;
  }
  get progressPositionSeconds() {
    var s, r, a;
    const e = v((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_duration, 0);
    let t = v((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const i = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (e <= 0 || t < 0)
      return 0;
    if (this.isPlaying && i) {
      const o = Date.parse(i);
      Number.isFinite(o) && (t += Math.max(0, (Date.now() - o) / 1e3));
    }
    return Math.max(0, Math.min(e, t));
  }
  get progressDurationSeconds() {
    var e;
    return Math.max(0, v((e = this.playbackPlayer) == null ? void 0 : e.attributes.media_duration, 0));
  }
  get progressPercent() {
    const e = this.progressDurationSeconds;
    return e > 0 ? Math.max(0, Math.min(100, this.progressPositionSeconds / e * 100)) : 0;
  }
  get hasProgress() {
    return this.progressDurationSeconds > 0;
  }
  formatDuration(e) {
    const t = Math.max(0, Math.floor(e)), i = Math.floor(t / 60), s = t % 60;
    return `${i}:${String(s).padStart(2, "0")}`;
  }
  readStorage(e) {
    try {
      return window.localStorage.getItem(e) ?? "";
    } catch {
      return "";
    }
  }
  writeStorage(e, t) {
    try {
      window.localStorage.setItem(e, t);
    } catch {
    }
  }
  errorMessage(e, t) {
    return e instanceof Error && e.message ? e.message : t;
  }
  async withTimeout(e, t, i) {
    let s;
    const r = new Promise((a, o) => {
      s = window.setTimeout(() => o(new Error(i)), t);
    });
    try {
      return await Promise.race([e, r]);
    } finally {
      window.clearTimeout(s);
    }
  }
  cacheKey(e) {
    return JSON.stringify(
      Object.keys(e).sort().reduce((t, i) => (t[i] = e[i], t), {})
    );
  }
  cachedItems(e, t) {
    const i = e.get(t);
    if (i) {
      if (i.expiresAt <= Date.now()) {
        e.delete(t);
        return;
      }
      return e.delete(t), e.set(t, i), i.items;
    }
  }
  cacheItems(e, t, i, s) {
    for (e.delete(t), e.set(t, { expiresAt: Date.now() + s, items: i }); e.size > rt; ) {
      const r = e.keys().next().value;
      if (!r)
        break;
      e.delete(r);
    }
  }
  syncProgressTimer() {
    const e = this.isConnected && this.activeTab === "now" && this.isPlaying && this.hasProgress;
    if (e && this.progressTimer === void 0) {
      this.progressTimer = window.setInterval(() => this.requestUpdate(), 1e3);
      return;
    }
    !e && this.progressTimer !== void 0 && (window.clearInterval(this.progressTimer), this.progressTimer = void 0);
  }
  readPlaybackMemory() {
    try {
      const e = JSON.parse(this.readStorage(ye) || "{}");
      return typeof e == "object" && e ? e : {};
    } catch {
      return {};
    }
  }
  writePlaybackMemory(e) {
    this.writeStorage(ye, JSON.stringify(e));
  }
  readFavoriteItems() {
    try {
      const e = JSON.parse(this.readStorage(fe) || "[]");
      return Array.isArray(e) ? e.map((t) => typeof t == "object" && t ? t : void 0).filter((t) => !!(t != null && t.name || t != null && t.uri)).slice(0, 60) : [];
    } catch {
      return [];
    }
  }
  writeFavoriteItems(e) {
    this.writeStorage(fe, JSON.stringify(e.slice(0, 60)));
  }
  favoriteKey(e) {
    const t = e.media_type || e.type || "track", i = this.itemArtist(e).toLowerCase(), s = String(e.name ?? "").toLowerCase(), r = String(e.uri ?? "").toLowerCase();
    return `${t}:${r || `${s}:${i}`}`;
  }
  isFavorite(e) {
    const t = this.favoriteKey(e);
    return this.favoriteItems.some((i) => this.favoriteKey(i) === t);
  }
  normalizedFavorite(e) {
    var i;
    const t = e.media_type || e.type || "track";
    return {
      name: e.name,
      uri: e.uri,
      media_type: t,
      type: t,
      artists: e.artists,
      artist: this.itemArtist(e),
      album: e.album,
      image: e.image || e.thumb || ((i = e.album) == null ? void 0 : i.image),
      thumb: e.thumb
    };
  }
  toggleFavorite(e) {
    const t = this.favoriteKey(e), s = this.favoriteItems.some((r) => this.favoriteKey(r) === t) ? this.favoriteItems.filter((r) => this.favoriteKey(r) !== t) : [this.normalizedFavorite(e), ...this.favoriteItems.filter((r) => this.favoriteKey(r) !== t)];
    this.favoriteItems = s.slice(0, 60), this.writeFavoriteItems(this.favoriteItems);
  }
  artworkDataUrl(e) {
    return new Promise((t, i) => {
      const s = new FileReader();
      s.onload = () => t(typeof s.result == "string" ? s.result : ""), s.onerror = () => i(s.error ?? new Error("Artwork could not be cached.")), s.readAsDataURL(e);
    });
  }
  cachePlaybackArtwork(e, t, i) {
    !i || this.artworkCacheRequests.get(e) === i || (this.artworkCacheRequests.set(e, i), fetch(i).then((s) => {
      if (!s.ok)
        throw new Error("Artwork request failed.");
      return s.blob();
    }).then((s) => {
      if (!s.type.startsWith("image/") || s.size > 1e6)
        throw new Error("Artwork is not cacheable.");
      return this.artworkDataUrl(s);
    }).then((s) => {
      const r = this.playbackMemory[e];
      if (!s || (r == null ? void 0 : r.title) !== t || r.artworkSource !== i)
        return;
      const a = {
        ...this.playbackMemory,
        [e]: {
          ...r,
          artwork: s
        }
      };
      this.playbackMemory = a, this.writePlaybackMemory(a);
    }).catch(() => {
    }).finally(() => {
      this.artworkCacheRequests.get(e) === i && this.artworkCacheRequests.delete(e);
    }));
  }
  rememberPlaybackState() {
    var u;
    const e = this.activePlayer, t = String((e == null ? void 0 : e.attributes.media_title) ?? ""), i = String(
      (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || ""
    ), s = String(
      (e == null ? void 0 : e.attributes.entity_picture) || (e == null ? void 0 : e.attributes.entity_picture_local) || (e == null ? void 0 : e.attributes.media_image_url) || ""
    );
    if (!e || !t && !s)
      return;
    const r = this.playbackMemory[e.entity_id], a = (r == null ? void 0 : r.artworkSource) === s && ((u = r.artwork) != null && u.startsWith("data:image/")) ? r.artwork : "", o = s ? this.isEphemeralArtworkUrl(s) ? a : s : this.isEphemeralArtworkUrl(String((r == null ? void 0 : r.artwork) ?? "")) ? "" : r == null ? void 0 : r.artwork;
    if (r && r.title === t && r.artist === i && r.artwork === o && r.artworkSource === s && r.state === e.state) {
      s && this.isEphemeralArtworkUrl(s) && !a && this.cachePlaybackArtwork(e.entity_id, t, s);
      return;
    }
    const n = {
      ...this.playbackMemory,
      [e.entity_id]: {
        title: t,
        artist: i,
        artwork: o,
        artworkSource: s,
        state: e.state,
        updatedAt: Date.now()
      }
    };
    this.playbackMemory = n, this.writePlaybackMemory(n), s && this.isEphemeralArtworkUrl(s) && !a && this.cachePlaybackArtwork(e.entity_id, t, s);
  }
  scheduleQueueRefreshForPlayback() {
    var s;
    const e = this.playbackPlayer, t = this.queueTargetEntityId();
    if (!e || e.state !== "playing" || !t || !((s = this.hass) != null && s.callWS))
      return;
    const i = [
      t,
      e.attributes.media_content_id,
      e.attributes.media_title
    ].join(":");
    i !== this.lastQueueSignature && (this.lastQueueSignature = i, window.clearTimeout(this.queueRefreshTimer), this.queueRefreshTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: !0 });
    }, 700));
  }
  scheduleInitialQueueRefresh() {
    var t;
    const e = this.queueTargetEntityId();
    !e || !((t = this.hass) != null && t.callWS) || this.queueLoading || this.lastInitialQueueEntityId !== e && (this.lastInitialQueueEntityId = e, window.clearTimeout(this.initialQueueRefreshTimer), this.initialQueueRefreshTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: !0 });
    }, 500));
  }
  get groupAnchor() {
    return this.isSonosBackedPlayer(this.activePlayer) || this.matchingMusicAssistantPlayer(this.activePlayer) ? this.activePlayer : this.currentlyPlayingPlayers.find((e) => this.isSonosBackedPlayer(e) || !!this.matchingMusicAssistantPlayer(e)) ?? this.allPlayers.find((e) => this.isSonosBackedPlayer(e) || !!this.matchingMusicAssistantPlayer(e));
  }
  get groupServiceMembers() {
    const e = this.groupAnchor, t = Array.isArray(e == null ? void 0 : e.attributes.group_members) ? e.attributes.group_members : [], i = this.nativeSonosMatch(e), s = Array.isArray(i == null ? void 0 : i.attributes.group_members) ? i.attributes.group_members : [];
    return s.length > t.length ? s : t.length > 0 ? t : s.length > 0 ? s : e && this.selectedGroupIds.includes(e.entity_id) && this.selectedGroupIds.length > 1 ? this.selectedGroupIds : [e == null ? void 0 : e.entity_id].filter((r) => !!r);
  }
  visibleRoomEntityId(e) {
    var r, a;
    const t = this.allPlayers.find((o) => o.entity_id === e);
    if (t)
      return t.entity_id;
    const i = (r = this.hass) == null ? void 0 : r.states[e], s = this.normalizedRoomName(String(
      (i == null ? void 0 : i.attributes.friendly_name) ?? (i == null ? void 0 : i.entity_id) ?? e
    ));
    return ((a = this.allPlayers.find((o) => this.roomKey(o) === s)) == null ? void 0 : a.entity_id) ?? e;
  }
  get groupMembers() {
    return [...new Set(this.groupServiceMembers.map((e) => this.visibleRoomEntityId(e)))];
  }
  serviceGroupEntityId(e) {
    var s;
    const t = (s = this.hass) == null ? void 0 : s.states[e], i = this.normalizedRoomName(String(
      (t == null ? void 0 : t.attributes.friendly_name) ?? (t == null ? void 0 : t.entity_id) ?? e
    ));
    return this.groupServiceMembers.find((r) => {
      var o;
      const a = (o = this.hass) == null ? void 0 : o.states[r];
      return this.normalizedRoomName(String(
        (a == null ? void 0 : a.attributes.friendly_name) ?? (a == null ? void 0 : a.entity_id) ?? r
      )) === i;
    }) ?? e;
  }
  nativeSonosMatch(e) {
    if (!e)
      return;
    if (we(e))
      return e;
    const t = this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id)), i = [.../* @__PURE__ */ new Set([
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? []
    ])];
    return (i.length > 0 ? i.map((r) => {
      var a;
      return (a = this.hass) == null ? void 0 : a.states[r];
    }).filter((r) => !!r) : this.mediaPlayers).find((r) => we(r) && this.normalizedRoomName(String(r.attributes.friendly_name ?? r.entity_id)) === t);
  }
  isSonosBackedPlayer(e) {
    return !!this.nativeSonosMatch(e);
  }
  get groupablePlayers() {
    const e = this.groupAnchor, t = this.isSonosBackedPlayer(e), i = this.matchingMusicAssistantPlayer(e), s = this.isMusicAssistantEntity(e) || !t, r = /* @__PURE__ */ new Set();
    return !t && !i ? [] : this.allPlayers.filter((a) => {
      if (y(a))
        return !1;
      const o = this.matchingMusicAssistantPlayer(a), n = this.nativeSonosMatch(a), u = s ? o : n, h = !!u && (s || ve(a) || ve(n)), d = (u == null ? void 0 : u.entity_id) ?? a.entity_id;
      return !h || r.has(d) ? !1 : (r.add(d), !0);
    });
  }
  matchingMusicAssistantPlayer(e) {
    if (!e)
      return;
    const t = new Set(this.config.music_assistant_entities ?? []), i = (n) => t.has(n.entity_id);
    if (!y(e) && (w(e) || i(e)))
      return e;
    const [, s = ""] = e.entity_id.split("."), r = [
      `media_player.${s}_2`,
      `media_player.ma_${s}`,
      `media_player.mass_${s}`,
      `media_player.${s}_music_assistant`
    ], a = this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id)), o = t.size > 0 ? [...t].map((n) => {
      var u;
      return (u = this.hass) == null ? void 0 : u.states[n];
    }).filter((n) => !!n) : this.mediaPlayers;
    return o.find((n) => !y(n) && r.includes(n.entity_id) && (w(n) || i(n))) ?? o.find((n) => !y(n) && (w(n) || i(n)) && this.normalizedRoomName(String(n.attributes.friendly_name ?? n.entity_id)) === a);
  }
  isMusicAssistantEntity(e) {
    return !!(e && (w(e) || (this.config.music_assistant_entities ?? []).includes(e.entity_id)));
  }
  resolveGroupPlayers(e, t) {
    const i = [e, ...t], s = i.some((n) => this.isMusicAssistantEntity(n)), r = i.map((n) => this.nativeSonosMatch(n));
    if (!s && r.every((n) => !!n))
      return {
        anchor: r[0],
        members: r.slice(1)
      };
    const a = i.map((n) => this.matchingMusicAssistantPlayer(n));
    if (a.every((n) => !!n))
      return {
        anchor: a[0],
        members: a.slice(1).filter((n) => n.entity_id !== a[0].entity_id)
      };
    const o = i.filter((n) => !this.matchingMusicAssistantPlayer(n)).map((n) => n.attributes.friendly_name ?? x(n.entity_id.split(".")[1]));
    return {
      anchor: e,
      members: [],
      error: `Grouping is unavailable for ${o.join(", ")}. Add the matching Music Assistant players in the card settings.`
    };
  }
  service(e, t, i, s) {
    const r = this.hass;
    if (!r)
      return Promise.reject(new Error("Home Assistant is not connected."));
    try {
      return this.withTimeout(
        Promise.resolve(r.callService(e, t, i, s)),
        it,
        `${e}.${t} timed out. Check the speaker connection and try again.`
      );
    } catch (a) {
      return Promise.reject(a);
    }
  }
  mediaService(e, t = {}, i = this.activeEntityId) {
    var r;
    const s = (r = this.hass) == null ? void 0 : r.states[i];
    return !i || y(s) ? Promise.reject(new Error("That speaker is unavailable.")) : this.service("media_player", e, t, {
      entity_id: i
    });
  }
  playPause() {
    this.playbackPending || (this.playbackError = "", this.playbackPending = !0, this.mediaService(
      this.isPlaying ? "media_pause" : "media_play",
      {},
      this.isPlaying ? this.playbackEntityId : this.activeEntityId
    ).catch((e) => {
      this.playbackError = this.errorMessage(e, "Playback control failed.");
    }).finally(() => {
      this.playbackPending = !1;
    }));
  }
  transportService(e) {
    var s;
    if (this.transportPending)
      return;
    const t = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer, i = (t == null ? void 0 : t.entity_id) ?? this.playbackEntityId;
    !i || y((s = this.hass) == null ? void 0 : s.states[i]) || (this.transportPending = !0, this.service("media_player", e, {}, {
      entity_id: i
    }).catch((r) => {
      this.playbackError = this.errorMessage(r, "Playback control failed.");
    }).finally(() => {
      this.transportPending = !1, e === "media_next_track" && this.refreshQueueAfterPlayback();
    }));
  }
  setVolume(e) {
    this.setPlayerVolume(this.volumeEntityId, e, !0);
  }
  setPlayerVolume(e, t, i = !1) {
    if (!e)
      return;
    const s = Math.max(0, Math.min(100, Number(t)));
    if (Number.isFinite(s)) {
      if (this.volumeOverrides.set(e, s), this.scheduleVolumeRender(), window.clearTimeout(this.volumeCommitTimers.get(e)), !i) {
        const r = window.setTimeout(() => {
          this.volumeCommitTimers.delete(e), this.commitPlayerVolume(e, s);
        }, 140);
        this.volumeCommitTimers.set(e, r);
        return;
      }
      this.volumeCommitTimers.delete(e), this.commitPlayerVolume(e, s);
    }
  }
  async commitPlayerVolume(e, t) {
    this.playbackError = "";
    try {
      await this.service("media_player", "volume_set", {
        volume_level: t / 100
      }, {
        entity_id: e
      });
    } catch (i) {
      this.playbackError = this.errorMessage(i, "Volume control failed.");
    } finally {
      window.clearTimeout(this.volumeResetTimers.get(e));
      const i = window.setTimeout(() => {
        this.volumeResetTimers.delete(e), this.volumeOverrides.delete(e), this.requestUpdate();
      }, 1500);
      this.volumeResetTimers.set(e, i);
    }
  }
  reconcileVolumeOverrides() {
    this.volumeOverrides.forEach((e, t) => {
      var r;
      const i = (r = this.hass) == null ? void 0 : r.states[t], s = Math.round(v(i == null ? void 0 : i.attributes.volume_level, -1) * 100);
      s >= 0 && Math.abs(s - e) <= 1 && (this.volumeOverrides.delete(t), window.clearTimeout(this.volumeResetTimers.get(t)), this.volumeResetTimers.delete(t));
    });
  }
  scheduleVolumeRender() {
    this.volumeRenderFrame === void 0 && (this.volumeRenderFrame = window.requestAnimationFrame(() => {
      this.volumeRenderFrame = void 0, this.requestUpdate();
    }));
  }
  updateVolumeLabel(e) {
    return e.target.value;
  }
  toggleMute() {
    this.togglePlayerMute(this.activeEntityId);
  }
  togglePlayerMute(e) {
    var i;
    const t = (i = this.hass) == null ? void 0 : i.states[e];
    !t || y(t) || (this.playbackError = "", this.service("media_player", "volume_mute", {
      is_volume_muted: !t.attributes.is_volume_muted
    }, {
      entity_id: e
    }).catch((s) => {
      this.playbackError = this.errorMessage(s, "Mute control failed.");
    }));
  }
  toggleGroupSelection(e) {
    if (this.groupError = "", this.pendingGroupIds.includes(e)) {
      this.pendingGroupIds = this.pendingGroupIds.filter((t) => t !== e);
      return;
    }
    this.pendingGroupIds = [...this.pendingGroupIds, e];
  }
  groupSelected() {
    this.groupError = "";
    const e = this.groupAnchor, t = (e == null ? void 0 : e.entity_id) ?? "";
    if (this.groupPending || !t || this.pendingGroupIds.length === 0)
      return;
    const i = this.pendingGroupIds.filter((d) => d !== t).map((d) => {
      var m;
      return (m = this.hass) == null ? void 0 : m.states[d];
    }).filter((d) => d ? this.groupablePlayers.some((m) => m.entity_id === d.entity_id) : !1);
    if (!e || i.length === 0)
      return;
    const s = this.resolveGroupPlayers(e, i);
    if (s.error) {
      this.groupError = s.error;
      return;
    }
    const r = s.members.map((d) => d.entity_id).filter((d, m, g) => d !== s.anchor.entity_id && g.indexOf(d) === m);
    if (r.length === 0) {
      this.groupError = "Those selected speakers cannot be grouped with this main speaker.";
      return;
    }
    const a = this.selectedEntityId, o = [...this.selectedGroupIds], n = [...this.pendingGroupIds], u = t, h = [.../* @__PURE__ */ new Set([
      ...this.groupMembers.filter((d) => d !== u),
      ...i.map((d) => d.entity_id)
    ])];
    this.groupPending = !0, this.selectedGroupIds = [u, ...h], this.service("media_player", "join", {
      group_members: r
    }, {
      entity_id: s.anchor.entity_id
    }).then(() => {
      this.pendingGroupIds = [], this.writeStorage(L, u);
    }).catch((d) => {
      this.selectedEntityId = a, this.selectedGroupIds = o, this.pendingGroupIds = n, this.groupError = this.errorMessage(d, "Grouping failed.");
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  continueInSelectedRoom() {
    var o, n, u;
    this.groupError = "", this.playbackError = "";
    const e = (o = this.hass) == null ? void 0 : o.states[this.transferTargetEntityId];
    if (!e || y(e) || e.entity_id === this.playbackEntityId || e.entity_id === this.activeEntityId) {
      this.groupError = "Choose one available speaker to move the music to.";
      return;
    }
    const t = e.entity_id, i = this.playbackPlayer, s = ((n = this.matchingMusicAssistantPlayer(i)) == null ? void 0 : n.entity_id) ?? this.playbackEntityId, r = ((u = this.matchingMusicAssistantPlayer(e)) == null ? void 0 : u.entity_id) ?? (e == null ? void 0 : e.entity_id);
    if (!r || !s)
      return;
    const a = () => {
      this.selectedEntityId = t, this.pendingGroupIds = [], this.transferTargetEntityId = "", this.queueItems = [], this.queueError = "", this.lastInitialQueueEntityId = "", this.writeStorage(L, t), this.refreshQueueAfterPlayback();
    };
    this.groupPending = !0, this.service("music_assistant", "transfer_queue", {
      source_player: s,
      auto_play: !0
    }, {
      entity_id: r
    }).then(a).catch(async () => {
      const h = i, d = String((h == null ? void 0 : h.attributes.media_content_id) ?? ""), m = String((h == null ? void 0 : h.attributes.media_content_type) ?? "music");
      if (!d) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      try {
        await this.service("music_assistant", "play_media", {
          media_id: d,
          media_type: m,
          enqueue: "play"
        }, {
          entity_id: r
        }), a();
      } catch (g) {
        this.playbackError = this.errorMessage(g, "Playback transfer failed.");
      }
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  ungroupActive() {
    var t;
    const e = (t = this.groupAnchor) == null ? void 0 : t.entity_id;
    this.groupPending || !e || (this.groupError = "", this.groupPending = !0, this.service("media_player", "unjoin", {}, {
      entity_id: e
    }).then(() => {
      this.selectedGroupIds = [], this.pendingGroupIds = [];
    }).catch((i) => {
      this.groupError = this.errorMessage(i, "Could not leave the speaker group.");
    }).finally(() => {
      this.groupPending = !1;
    }));
  }
  ungroupAll() {
    if (this.groupPending)
      return;
    this.groupError = "", this.groupPending = !0;
    const e = this.groupServiceMembers.map((i) => this.service("media_player", "unjoin", {}, { entity_id: i })), t = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    Promise.allSettled(e).then((i) => {
      i.some((s) => s.status === "rejected") && (this.groupError = "Some speakers could not leave the group. Try them individually.");
    }).finally(t);
  }
  removeFromGroup(e) {
    if (this.groupPending)
      return;
    const t = this.serviceGroupEntityId(e);
    this.groupError = "", this.groupPending = !0, this.service("media_player", "unjoin", {}, { entity_id: t }).then(() => {
      this.selectedGroupIds = this.selectedGroupIds.filter((i) => i !== e), this.pendingGroupIds = this.pendingGroupIds.filter((i) => i !== e);
    }).catch((i) => {
      this.groupError = this.errorMessage(i, "Could not remove that speaker.");
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  musicAssistantSearchData(e, t = {}) {
    var s;
    const i = {
      name: e,
      limit: v(this.config.search_limit, k.search_limit),
      library_only: !!(this.config.library_only ?? k.library_only),
      ...t
    };
    return this.config.music_assistant_config_entry_id && (i.config_entry_id = this.config.music_assistant_config_entry_id), !i.media_type && ((s = this.config.search_media_types) != null && s.length) && (i.media_type = this.config.search_media_types), i;
  }
  async fetchMusicAssistantSearch(e) {
    var a;
    if (!((a = this.hass) != null && a.callWS))
      throw new Error("This Home Assistant frontend does not expose service responses here.");
    const t = this.cacheKey(e), i = this.cachedItems(this.searchCache, t);
    if (i)
      return i;
    const s = this.searchInflight.get(t);
    if (s)
      return s;
    const r = this.withTimeout(
      this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: e,
        return_response: !0
      }),
      G,
      "Music search timed out. Check Music Assistant and try again."
    ).then((o) => {
      const n = this.extractSearchResults(o);
      return this.cacheItems(this.searchCache, t, n, st), n;
    });
    this.searchInflight.set(t, r);
    try {
      return await r;
    } finally {
      this.searchInflight.get(t) === r && this.searchInflight.delete(t);
    }
  }
  async fetchMusicAssistantLibrary(e) {
    var h;
    if (!((h = this.hass) != null && h.callWS))
      throw new Error("This Home Assistant frontend does not expose action responses here.");
    if (!this.config.music_assistant_config_entry_id)
      throw new Error("Add music_assistant_config_entry_id to this card to load your library.");
    const t = {
      config_entry_id: this.config.music_assistant_config_entry_id,
      media_type: e,
      limit: e === "track" ? 8 : 12,
      offset: 0,
      order_by: "timestamp_added_desc"
    }, i = `library:${this.cacheKey(t)}`, s = this.cachedItems(this.browseCache, i);
    if (s)
      return s;
    const r = await this.withTimeout(
      this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "get_library",
        service_data: t,
        return_response: !0
      }),
      G,
      `Loading your ${e}s timed out. Try again.`
    ), o = r.response ?? r, u = (Array.isArray(o.items) ? o.items : []).filter((d) => typeof d == "object" && !!d).map((d) => this.normalizeSearchItem(d, e)).filter((d) => !ke(d));
    return this.cacheItems(this.browseCache, i, u, xe), u;
  }
  async loadMusicLibrary(e = !1) {
    if (this.libraryLoading || this.libraryLoaded && !e)
      return;
    e && [...this.browseCache.keys()].filter((i) => i.startsWith("library:")).forEach((i) => this.browseCache.delete(i));
    const t = ++this.libraryRequestId;
    this.libraryLoading = !0, this.libraryError = "";
    try {
      const [i, s, r] = await Promise.all([
        this.fetchMusicAssistantLibrary("playlist"),
        this.fetchMusicAssistantLibrary("album"),
        this.fetchMusicAssistantLibrary("artist")
      ]);
      if (t !== this.libraryRequestId)
        return;
      this.libraryItems = {
        playlist: i,
        album: s,
        artist: r,
        track: []
      }, this.libraryLoaded = !0;
    } catch (i) {
      t === this.libraryRequestId && (this.libraryError = this.errorMessage(i, "Your Music Assistant library could not be loaded."));
    } finally {
      t === this.libraryRequestId && (this.libraryLoading = !1);
    }
  }
  async searchMusicAssistant(e = !1) {
    var s, r;
    window.clearTimeout(this.searchTimer), this.searchTimer = void 0;
    const t = this.query.trim();
    if (!t || !((s = this.hass) != null && s.callWS)) {
      (r = this.hass) != null && r.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    const i = ++this.searchRequestId;
    this.searching = !0, this.searchError = "";
    try {
      const a = await this.fetchMusicAssistantSearch(this.musicAssistantSearchData(t));
      if (i !== this.searchRequestId)
        return;
      this.searchResults = a, e || (this.browserHistory = [], this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "");
    } catch (a) {
      i === this.searchRequestId && (this.searchError = a instanceof Error ? a.message : "Search failed");
    } finally {
      i === this.searchRequestId && (this.searching = !1);
    }
  }
  scheduleSearch() {
    if (window.clearTimeout(this.searchTimer), this.query.trim().length < 2) {
      this.searchRequestId += 1, this.searching = !1, this.searchError = "", this.query.trim() || (this.searchResults = [], this.browserView = "results");
      return;
    }
    this.searchTimer = window.setTimeout(() => {
      this.searchMusicAssistant();
    }, 250);
  }
  saveBrowserState() {
    this.browserHistory = [
      ...this.browserHistory.slice(-5),
      {
        view: this.browserView,
        query: this.query,
        searchResults: [...this.searchResults],
        selectedArtist: this.selectedArtist,
        selectedAlbum: this.selectedAlbum,
        selectedPlaylist: this.selectedPlaylist
      }
    ];
  }
  restoreBrowserState() {
    const e = this.browserHistory[this.browserHistory.length - 1];
    if (this.browserHistory = this.browserHistory.slice(0, -1), this.albumRequestId += 1, this.playlistRequestId += 1, this.albumLoading = !1, this.playlistLoading = !1, this.albumTracks = [], this.playlistTracks = [], this.albumError = "", this.playlistError = "", !e) {
      this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0;
      return;
    }
    this.browserView = e.view, this.query = e.query, this.searchResults = e.searchResults, this.selectedArtist = e.selectedArtist, this.selectedAlbum = e.selectedAlbum, this.selectedPlaylist = e.selectedPlaylist;
  }
  openArtist(e) {
    this.saveBrowserState(), this.selectedArtist = e, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "", this.browserView = "artist", this.query = e.name ?? this.query, this.searchMusicAssistant(!0);
  }
  openAlbum(e) {
    this.saveBrowserState(), this.selectedAlbum = e, this.selectedArtist = void 0, this.selectedPlaylist = void 0, this.browserView = "album", this.loadAlbumTracks(e);
  }
  openPlaylist(e) {
    this.saveBrowserState(), this.selectedPlaylist = e, this.selectedArtist = void 0, this.selectedAlbum = void 0, this.browserView = "playlist", this.loadPlaylistTracks(e);
  }
  async loadAlbumTracks(e) {
    const t = ++this.albumRequestId;
    this.albumTracks = [], this.albumError = "", this.albumLoading = !0;
    try {
      let i = [];
      try {
        i = await this.browseMediaTracks(e, "album");
      } catch {
        i = [];
      }
      if (i.length === 0 && (i = await this.searchAlbumTracks(e)), t !== this.albumRequestId)
        return;
      this.albumTracks = this.dedupeQueueItems(i), this.albumTracks.length === 0 && (this.albumError = "No tracks found for this album.");
    } catch (i) {
      t === this.albumRequestId && (this.albumError = i instanceof Error ? i.message : "Album tracks are unavailable.");
    } finally {
      t === this.albumRequestId && (this.albumLoading = !1);
    }
  }
  async browseMediaTracks(e, t) {
    var n;
    if (!((n = this.hass) != null && n.callWS) || !e.uri)
      return [];
    const i = this.queueTargetEntityId() || this.activeEntityId;
    if (!i)
      return [];
    const s = `${i}:${t}:${e.uri}`, r = this.cachedItems(this.browseCache, s);
    if (r)
      return r;
    const a = await this.withTimeout(
      this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: i,
        media_content_id: e.uri,
        media_content_type: t
      }),
      G,
      `Loading this ${t} timed out. Try again.`
    ), o = this.extractBrowseTracks(a, e);
    return this.cacheItems(this.browseCache, s, o, xe), o;
  }
  async searchAlbumTracks(e) {
    const t = e.name ?? "", i = this.itemArtist(e), s = i || t;
    if (!s)
      return [];
    const r = this.musicAssistantSearchData(s, {
      album: t,
      limit: Math.max(40, v(this.config.search_limit, k.search_limit)),
      media_type: ["track"]
    });
    return i && (r.artist = i), this.fetchMusicAssistantSearch(r).then((a) => a.filter((o) => (o.media_type || o.type) === "track"));
  }
  async loadPlaylistTracks(e) {
    const t = ++this.playlistRequestId;
    this.playlistTracks = [], this.playlistError = "", this.playlistLoading = !0;
    try {
      const i = await this.browseMediaTracks(e, "playlist");
      if (t !== this.playlistRequestId)
        return;
      this.playlistTracks = this.dedupeQueueItems(i), this.playlistTracks.length === 0 && (this.playlistError = "No tracks found for this playlist.");
    } catch (i) {
      t === this.playlistRequestId && (this.playlistError = i instanceof Error ? i.message : "Playlist tracks are unavailable.");
    } finally {
      t === this.playlistRequestId && (this.playlistLoading = !1);
    }
  }
  extractBrowseTracks(e, t) {
    var n;
    const i = [], s = t.name ?? "", r = this.itemArtist(t), a = t.image || t.thumb || ((n = t.album) == null ? void 0 : n.image) || "", o = (u, h = 0) => {
      if (typeof u != "object" || !u)
        return;
      const d = u, m = this.normalizedMediaType(
        d.media_content_type || d.media_class,
        "track"
      ), g = String(d.media_content_id ?? ""), b = String(d.title ?? d.name ?? ""), f = Array.isArray(d.children) ? d.children : [];
      h > 0 && !!g && !!b && (m === "track" || String(d.media_class ?? "").toLowerCase().includes("track") || d.can_play && !d.can_expand && m !== "album") && i.push({
        name: b,
        uri: g,
        media_type: "track",
        type: "track",
        artist: r,
        album: s ? { name: s, image: a } : t.album,
        image: String(d.thumbnail ?? d.image ?? a) || void 0
      }), f.forEach((_) => o(_, h + 1));
    };
    return o(e), i;
  }
  extractSearchResults(e) {
    const i = e.response ?? e, s = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return s.forEach((a) => {
      const o = i[a];
      Array.isArray(o) && o.forEach((n) => {
        typeof n == "object" && n && r.push(this.normalizeSearchItem(n, a === "tracks" ? "track" : a.slice(0, -1)));
      });
    }), r.filter((a) => !ke(a));
  }
  normalizedMediaType(e, t) {
    const i = String(e ?? "").toLowerCase();
    return i.includes("album") ? "album" : i.includes("artist") ? "artist" : i.includes("playlist") ? "playlist" : i.includes("radio") ? "radio" : i.includes("podcast") ? "podcast" : i.includes("track") || i.includes("song") ? "track" : t;
  }
  normalizeSearchItem(e, t) {
    const i = typeof e.album == "object" && e.album ? e.album : void 0, s = Array.isArray(e.artists) ? e.artists : void 0, r = this.normalizedMediaType(e.media_type ?? e.type, t), a = String(
      e.image ?? e.thumb ?? e.thumbnail ?? e.image_url ?? e.uri_image ?? (i == null ? void 0 : i.image) ?? ""
    );
    return {
      ...e,
      name: String(e.name ?? e.title ?? e.media_title ?? e.uri ?? ""),
      uri: String(e.uri ?? e.media_id ?? e.media_content_id ?? "") || void 0,
      media_type: r,
      type: r,
      artists: s,
      artist: String(e.artist ?? e.media_artist ?? (s == null ? void 0 : s.map((o) => o.name).filter(Boolean).join(", ")) ?? ""),
      album: i,
      image: a || void 0
    };
  }
  queueTargetEntityId() {
    const e = this.matchingMusicAssistantPlayer(this.activePlayer);
    return e && !y(e) ? e.entity_id : "";
  }
  queueServiceAttempts(e) {
    return [
      {
        domain: "music_assistant",
        service: "get_queue",
        data: {}
      }
    ];
  }
  async refreshQueue(e = {}) {
    var a;
    const t = this.queueTargetEntityId();
    if (!t || !((a = this.hass) != null && a.callWS)) {
      this.queueItems = [], this.queueLoading = !1, this.queueError = t ? "Queue responses are not available in this Home Assistant view." : "Queue is only available for Music Assistant speaker entities.";
      return;
    }
    const i = this.queueRefreshes.get(t);
    if (i) {
      e.silent || (this.queueLoading = !0);
      try {
        await i;
      } finally {
        e.silent || (this.queueLoading = !1);
      }
      return;
    }
    const s = ++this.queueRequestId, r = this.performQueueRefresh(t, s, e);
    this.queueRefreshes.set(t, r);
    try {
      await r;
    } finally {
      this.queueRefreshes.get(t) === r && this.queueRefreshes.delete(t);
    }
  }
  async performQueueRefresh(e, t, i) {
    var r;
    const s = (r = this.hass) == null ? void 0 : r.callWS;
    if (s) {
      i.silent || (this.queueLoading = !0), this.queueError = "";
      try {
        const a = [];
        let o = !1;
        for (const n of this.queueServiceAttempts(e))
          try {
            const u = await this.withTimeout(
              s({
                type: "call_service",
                domain: n.domain,
                service: n.service,
                service_data: n.data,
                target: { entity_id: e },
                return_response: !0
              }),
              G,
              "Queue refresh timed out. Check Music Assistant and try again."
            );
            if (t !== this.queueRequestId || e !== this.queueTargetEntityId())
              return;
            o = !0;
            const h = this.extractQueueItems(u, e);
            if (h.length > 0) {
              this.queueItems = h, this.queueError = "";
              return;
            }
          } catch (u) {
            if (t !== this.queueRequestId)
              return;
            a.push(u instanceof Error ? u.message : `${n.domain}.${n.service} failed.`);
          }
        if (t !== this.queueRequestId || e !== this.queueTargetEntityId())
          return;
        this.queueItems = [], this.queueError = o ? "" : a.length > 0 ? "Could not load this speaker’s queue. Retry in a moment." : "Queue is empty or unavailable for this Music Assistant player.";
      } finally {
        t === this.queueRequestId && (this.queueLoading = !1);
      }
    }
  }
  extractQueueItems(e, t = "") {
    const i = this.responsePayload(e), s = this.queueResponseRoots(i, t);
    for (const r of s) {
      const a = this.normalizeQueueItem(this.valueAtPath(r, ["current_item"])), o = [
        Array.isArray(r) ? r : void 0,
        this.valueAtPath(r, ["next_items"]),
        this.valueAtPath(r, ["upcoming_items"]),
        this.valueAtPath(r, ["items"]),
        this.valueAtPath(r, ["queue_items"]),
        this.valueAtPath(r, ["queue"]),
        this.valueAtPath(r, ["next_item"])
      ];
      for (const n of o) {
        const u = this.queueItemsFromUnknown(n).filter((h) => !a || !this.sameQueueItem(h, a));
        if (u.length > 0)
          return this.dedupeQueueItems(u);
      }
    }
    return [];
  }
  queueResponseRoots(e, t) {
    const i = [e];
    if (typeof e == "object" && e) {
      const s = e;
      t && s[t] && i.unshift(s[t]), Object.entries(s).forEach(([r, a]) => {
        (r.startsWith("media_player.") || typeof a == "object" && a && ("current_item" in a || "next_item" in a || "queue_items" in a || "items" in a)) && i.push(a);
      });
    }
    return i.filter((s, r, a) => a.indexOf(s) === r);
  }
  responsePayload(e) {
    return typeof e == "object" && e && "response" in e ? e.response ?? e : e;
  }
  valueAtPath(e, t) {
    return t.reduce((i, s) => {
      if (!(typeof i != "object" || !i))
        return i[s];
    }, e);
  }
  queueItemsFromUnknown(e) {
    if (Array.isArray(e))
      return e.map((t) => this.normalizeQueueItem(t)).filter((t) => !!t);
    if (typeof e == "object" && e) {
      const t = e, i = ["next_items", "upcoming_items", "items", "queue_items", "queue", "next_item"];
      for (const r of i) {
        const a = this.queueItemsFromUnknown(t[r]);
        if (a.length > 0)
          return a;
      }
      const s = this.normalizeQueueItem(t);
      if (s)
        return [s];
      for (const r of Object.values(t)) {
        const a = this.queueItemsFromUnknown(r);
        if (a.length > 0)
          return a;
      }
    }
    return [];
  }
  isQueueContainer(e) {
    return !!(e.current_item || e.next_item || e.next_items || e.upcoming_items || e.queue_items || e.items || e.active_queue || e.entity_id && e.attributes);
  }
  normalizeQueueItem(e) {
    if (typeof e != "object" || !e)
      return;
    const t = e;
    if (this.isQueueContainer(t))
      return;
    const i = (typeof t.media_item == "object" && t.media_item ? t.media_item : void 0) ?? (typeof t.item == "object" && t.item ? t.item : void 0) ?? t, s = typeof i.album == "object" && i.album ? i.album : void 0, r = Array.isArray(i.artists) ? i.artists : void 0, a = String(
      i.name ?? t.name ?? t.title ?? t.media_title ?? ""
    ), o = String(i.uri ?? t.uri ?? t.media_id ?? t.media_content_id ?? ""), n = this.normalizedMediaType(i.media_type ?? t.media_type ?? t.type, "track"), u = String(
      i.image ?? t.image ?? t.thumbnail ?? t.entity_picture ?? t.media_image ?? t.local_image_encoded ?? (s == null ? void 0 : s.image) ?? ""
    );
    if (!(!a && !o))
      return {
        name: a || o,
        uri: o || void 0,
        media_type: n,
        type: n,
        artists: r,
        artist: String(i.artist ?? t.artist ?? t.media_artist ?? ""),
        album: s,
        image: u || void 0,
        queue_item_id: String(t.queue_item_id ?? i.queue_item_id ?? "")
      };
  }
  dedupeQueueItems(e) {
    const t = /* @__PURE__ */ new Set();
    return e.filter((i) => {
      const s = `${i.uri ?? ""}:${i.name ?? ""}:${i.artist ?? ""}`;
      return t.has(s) ? !1 : (t.add(s), !0);
    });
  }
  sameQueueItem(e, t) {
    return e.queue_item_id && t.queue_item_id ? e.queue_item_id === t.queue_item_id : e.uri && t.uri ? e.uri === t.uri : !!(e.name && t.name && e.name === t.name && (e.artist ?? "") === (t.artist ?? ""));
  }
  itemArtist(e) {
    var t;
    return String(
      e.artist || ((t = e.artists) == null ? void 0 : t.map((i) => i.name).filter(Boolean).join(", ")) || ""
    );
  }
  itemAlbum(e) {
    var t;
    return String(((t = e.album) == null ? void 0 : t.name) ?? "");
  }
  refreshQueueAfterPlayback() {
    window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer);
    const e = this.activeTab !== "queue";
    this.queueRefreshTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: e }).then(() => {
        this.queueError && (this.queueRefreshRetryTimer = window.setTimeout(() => {
          this.refreshQueue({ silent: !0 });
        }, 1200));
      });
    }, 500);
  }
  clearPlaybackFeedback() {
    window.clearTimeout(this.playbackFeedbackTimer), this.playbackFeedbackTimer = void 0, this.playbackStatus = "", this.playbackSlow = !1;
  }
  startPlaybackFeedback(e, t) {
    this.optimisticPlaybackItem = e, this.playbackSlow = !1, this.playbackStatus = `Starting on ${t}…`, window.clearTimeout(this.playbackFeedbackTimer), this.playbackFeedbackTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.clearPlaybackFeedback();
        return;
      }
      this.playbackSlow = !0, this.playbackStatus = `${t} is taking longer than expected to connect.`;
    }, at);
  }
  retryLastPlayback() {
    const e = this.lastPlaybackRequest;
    !e || this.playbackPending || this.playSearchResult(e.item, e.enqueue);
  }
  playSearchResult(e, t) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const i = e.uri || e.name;
    if (!i)
      return;
    const s = t ?? this.config.enqueue_mode ?? k.enqueue_mode, r = (s === "next" || s === "add") && !this.isPlaying ? "play" : s, a = this.matchingMusicAssistantPlayer(this.activePlayer), o = (a == null ? void 0 : a.entity_id) ?? "", n = this.activeEntityId;
    if (!a || !o) {
      this.playbackError = `No Music Assistant player matches ${this.activeName || "the selected speaker"}. Add its Music Assistant entity in the card settings.`;
      return;
    }
    this.playbackPending = !0, this.writeStorage(L, n), this.lastPlaybackRequest = { item: e, enqueue: t };
    const u = String(a.attributes.friendly_name ?? this.activeName ?? "speaker"), h = r !== "next" && r !== "add";
    h ? this.startPlaybackFeedback(e, u) : (this.clearPlaybackFeedback(), this.playbackStatus = `Adding ${e.name ?? "item"} to the queue…`);
    const d = e.media_type || e.type || "track", m = {
      media_id: i,
      media_type: d,
      enqueue: r
    }, g = this.itemArtist(e), b = this.itemAlbum(e);
    g && !String(i).includes("://") && (d === "track" || d === "album") && (m.artist = g), b && !String(i).includes("://") && d === "track" && (m.album = b), (async () => {
      let f = !1;
      try {
        await this.service("music_assistant", "play_media", m, {
          entity_id: o
        }), f = !0;
      } catch (A) {
        if (r === "next")
          try {
            await this.service("music_assistant", "play_media", {
              media_id: i,
              media_type: d,
              enqueue: "add"
            }, {
              entity_id: o
            }), f = !0;
          } catch (_) {
            this.playbackError = this.errorMessage(_, "Music Assistant queue add failed.");
          }
        else if (e.uri && e.name) {
          const _ = {
            media_id: e.name,
            media_type: d,
            enqueue: r
          };
          g && (d === "track" || d === "album") && (_.artist = g), b && d === "track" && (_.album = b);
          try {
            await this.service("music_assistant", "play_media", _, {
              entity_id: o
            }), f = !0;
          } catch (ze) {
            this.playbackError = `Could not play ${e.name} on ${a.attributes.friendly_name ?? o}: ${this.errorMessage(ze, "no playable result was found")}`;
          }
        } else
          this.playbackError = `Could not play this item on ${a.attributes.friendly_name ?? o}: ${this.errorMessage(A, "Music Assistant playback failed.")}`;
      } finally {
        this.playbackPending = !1, f ? h && !this.isPlaying ? this.playbackStatus = `Connecting to ${u}…` : h || (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0) : (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0), f && this.refreshQueueAfterPlayback();
      }
    })();
  }
  queueSearchResult(e) {
    this.playSearchResult(e, "add");
  }
  playQueueItem(e) {
    const t = e.queue_item_id, i = this.queueTargetEntityId();
    if (!t || !i || this.playbackPending) {
      this.playSearchResult(e, "play");
      return;
    }
    this.playbackPending = !0, this.playbackError = "", this.service("mass_queue", "play_queue_item", {
      entity: i,
      queue_item_id: t
    }).then(() => {
      this.refreshQueueAfterPlayback();
    }).catch((s) => {
      this.playbackError = this.errorMessage(s, "Queue item playback failed.");
    }).finally(() => {
      this.playbackPending = !1;
    });
  }
  renderRooms() {
    const e = this.currentlyPlayingPlayers;
    return e.length < 2 ? p : l`
      <div class="rooms">
        <span class="now-label">Playing in</span>
        <div class="now-row">
          <div class="now-speakers">
            ${e.map(
      (t) => l`
                <span class="now-chip">
                  ${t.attributes.friendly_name ?? x(t.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
        </div>
      </div>
    `;
  }
  playerPickerLabel(e, t) {
    const i = e.attributes.friendly_name ?? x(e.entity_id.split(".")[1]);
    return t.filter((r) => (r.attributes.friendly_name ?? x(r.entity_id.split(".")[1])).trim().toLowerCase() === i.trim().toLowerCase()).length < 2 ? i : w(e) ? `${i} (Music Assistant)` : Array.isArray(e.attributes.group_members) ? `${i} (Sonos)` : `${i} (${e.entity_id.split(".")[1]})`;
  }
  playerQuickStatus(e) {
    return y(e) ? "Offline" : e.state === "playing" ? "Playing" : e.state === "paused" ? "Paused" : e.state === "buffering" ? "Connecting" : "Ready";
  }
  selectPlayer(e) {
    var s;
    const t = (s = this.hass) == null ? void 0 : s.states[e];
    this.selectedEntityId = e, this.writeStorage(L, e);
    const i = t == null ? void 0 : t.attributes.group_members;
    this.selectedGroupIds = Array.isArray(i) ? [...i] : [e], this.pendingGroupIds = [], this.transferTargetEntityId = "", this.queueItems = [], this.queueError = "", this.queueLoading = !1, this.queueRequestId += 1, this.lastQueueSignature = "", this.lastInitialQueueEntityId = "", window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), this.activeTab === "queue" && this.refreshQueue();
  }
  renderPlayerPicker(e) {
    const t = this.activePlayer ?? e[0];
    if (!t)
      return l``;
    const i = this.playerQuickStatus(t);
    return l`
      <label class="player-select">
        <span class="player-select-dot ${y(t) ? "offline" : ""}" aria-hidden="true"></span>
        <span class="player-select-copy">
          <span class="player-select-name">${this.playerPickerLabel(t, e)}</span>
          <span class="player-select-status">${i}</span>
        </span>
        <ha-icon .icon=${"mdi:chevron-down"} aria-hidden="true"></ha-icon>
        <select
          aria-label="Choose Music Assistant speaker"
          .value=${t.entity_id}
          @change=${(s) => {
      this.selectPlayer(s.currentTarget.value);
    }}
        >
          ${e.map((s) => l`
            <option value=${s.entity_id}>
              ${this.playerPickerLabel(s, e)} — ${this.playerQuickStatus(s)}
            </option>
          `)}
        </select>
      </label>
    `;
  }
  renderHeaderIdentity() {
    const e = this.allPlayers, i = this.playingRoomPlayers.map((s) => s.attributes.friendly_name ?? x(s.entity_id.split(".")[1]));
    return l`
      <div class="header-identity">
        <div class="title">
          ${e.length > 1 ? this.renderPlayerPicker(e) : l`<span class="name">${this.activeName || "Sonos"}</span>`}
        </div>
        ${i.length > 0 ? l`
              <span class="playing-rooms" title=${i.join(", ")}>
                <i></i>
                <span class="playing-rooms-copy">
                  <small>Playing in</small>
                  <strong>${i.join(", ")}</strong>
                </span>
              </span>
            ` : l`
              <span class="playing-rooms idle">
                <i></i>
                <span class="playing-rooms-copy">
                  <small>Playback</small>
                  <strong>Nothing playing</strong>
                </span>
              </span>
            `}
      </div>
    `;
  }
  renderMiniPlayer(e, t, i) {
    const s = this.artworkUrl;
    return l`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork">
          <ha-icon .icon=${"mdi:music-note"}></ha-icon>
          ${s ? l`
                <img
                  src=${s}
                  alt=""
                  loading="eager"
                  decoding="async"
                  @error=${(r) => {
      r.currentTarget.hidden = !0;
    }}
                />
              ` : p}
        </div>
        <div class="mini-meta">
          <span class="track">${e}</span>
          <span class="artist">${t}</span>
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
  renderPlaybackFeedback() {
    if (!this.playbackStatus && !this.playbackError)
      return p;
    const e = this.playbackError || this.playbackStatus;
    return l`
      <div class="playback-feedback ${this.playbackError ? "failed" : ""} ${this.playbackSlow ? "slow" : ""}" role=${this.playbackError ? "alert" : "status"}>
        <ha-icon .icon=${this.playbackError ? "mdi:alert-circle-outline" : this.playbackSlow ? "mdi:clock-outline" : "mdi:loading"}></ha-icon>
        <span>${e}</span>
        <span class="feedback-actions">
          ${(this.playbackSlow || this.playbackError) && this.lastPlaybackRequest ? l`<button class="small-action" @click=${this.retryLastPlayback}>Retry</button>` : p}
          ${this.playbackError ? l`<button class="small-action" @click=${() => {
      this.activeTab = "speakers";
    }}>Choose speaker</button>` : p}
        </span>
      </div>
    `;
  }
  renderTransferPlayback() {
    const e = this.allPlayers.filter((t) => t.entity_id !== this.activeEntityId && t.entity_id !== this.playbackEntityId && !y(t) && !!this.matchingMusicAssistantPlayer(t));
    return e.length === 0 ? p : l`
      <section class="transfer-panel">
        <span class="transfer-label">Move music</span>
        <select
          aria-label="Move music to speaker"
          .value=${this.transferTargetEntityId}
          @change=${(t) => {
      this.transferTargetEntityId = t.target.value;
    }}
        >
          <option value="">Choose room</option>
          ${e.map((t) => l`
            <option value=${t.entity_id}>
              ${t.attributes.friendly_name ?? x(t.entity_id.split(".")[1])}
            </option>
          `)}
        </select>
        <button
          class="small-action primary"
          ?disabled=${this.groupPending || !this.transferTargetEntityId}
          @click=${this.continueInSelectedRoom}
        >
          Move
        </button>
      </section>
    `;
  }
  renderGrouping() {
    const e = this.groupablePlayers, t = this.groupAnchor, i = (t == null ? void 0 : t.entity_id) ?? "";
    if (!this.config.show_grouping || e.length < 2)
      return p;
    const s = e.some((n) => n.entity_id === i) || !!this.matchingMusicAssistantPlayer(t), r = this.pendingGroupIds.filter((n) => {
      var h;
      const u = (h = this.hass) == null ? void 0 : h.states[n];
      return n !== i && e.some((d) => d.entity_id === (u == null ? void 0 : u.entity_id));
    }).length, a = this.groupMembers.length, o = a > 1;
    return l`
      <section class="grouping">
        <span class="section-title">Group Sonos${t ? ` · ${t.attributes.friendly_name ?? "Main speaker"}` : ""}</span>
        ${this.groupError ? l`<div class="error">${this.groupError}</div>` : p}
        <div class="group-row">
          ${e.map((n) => {
      const u = this.selectedGroupIds.includes(n.entity_id) || this.groupMembers.includes(n.entity_id), h = this.pendingGroupIds.includes(n.entity_id), d = u || h, m = n.entity_id === i;
      return l`
	              <button
	                class="group-chip ${d ? "active" : ""} ${m ? "anchor" : ""}"
	                ?disabled=${m || this.groupPending}
                  title=${m ? "Current room" : d ? "Remove from selection" : "Add to selection"}
                @click=${() => this.toggleGroupSelection(n.entity_id)}
              >
                <span class="group-check">${d ? "✓" : ""}</span>
                <span class="group-name">
                  ${n.attributes.friendly_name ?? x(n.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${m ? "This room" : u ? "In group" : h ? "Selected" : "Available"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !s || r === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Group Selected</span>
            <span class="group-status">
              ${s ? `${r} room${r === 1 ? "" : "s"}` : "Cannot group this speaker"}
            </span>
          </button>
          <button
            class="group-chip action ungroup"
            ?disabled=${this.groupPending || !o}
            title="Make this room leave the current speaker group"
            @click=${this.ungroupActive}
          >
            <span class="group-check">×</span>
            <span class="group-name">Leave Group</span>
            <span class="group-status">${o ? "This room only" : "No group active"}</span>
          </button>
          <button
            class="group-chip action clear"
            ?disabled=${this.groupPending || !o}
            title="Ungroup every room in the current speaker group"
            @click=${this.ungroupAll}
          >
            <span class="group-check">×</span>
            <span class="group-name">Ungroup All</span>
            <span class="group-status">${o ? `${a} rooms` : "No group active"}</span>
          </button>
        </div>
      </section>
    `;
  }
  renderCurrentGroup() {
    const e = this.groupMembers.map((t) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[t];
    }).filter((t) => !!t);
    return e.length <= 1 ? p : l`
      <section class="current-group">
        <button
          class="section-toggle"
          @click=${() => {
      this.showCurrentGroup = !this.showCurrentGroup;
    }}
        >
          <span>Playing Together (${e.length})</span>
          <ha-icon .icon=${this.showCurrentGroup ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.showCurrentGroup ? e.map(
      (t) => l`
                <div class="current-member">
                  <span class="speaker-name">
                    ${t.attributes.friendly_name ?? x(t.entity_id.split(".")[1])}
                  </span>
                  <button
                    class="small-action"
                    ?disabled=${this.groupPending || t.entity_id === this.activeEntityId}
                    @click=${() => this.removeFromGroup(t.entity_id)}
                  >
                    Remove
                  </button>
                </div>
              `
    ) : p}
      </section>
    `;
  }
  renderVolumeControl(e = "primary") {
    var i;
    const t = y(this.activePlayer);
    return l`
      <div class="volume-row ${e}" aria-label="Speaker volume control">
        <button
          class="icon-button volume-button"
          aria-label="Mute speaker"
          ?disabled=${t}
          @click=${this.toggleMute}
        >
          <ha-icon .icon=${(i = this.isPlaying ? this.playbackPlayer : this.activePlayer) != null && i.attributes.is_volume_muted ? "mdi:volume-off" : this.volume < 35 ? "mdi:volume-low" : "mdi:volume-high"}></ha-icon>
        </button>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(this.volume)}
          ?disabled=${t}
          aria-label="Speaker volume"
          @input=${(s) => {
      const r = this.updateVolumeLabel(s);
      this.setPlayerVolume(this.volumeEntityId, r);
    }}
          @change=${(s) => this.setVolume(this.updateVolumeLabel(s))}
        />
        <span class="volume-value">${this.volume}</span>
      </div>
    `;
  }
  renderTabs() {
    return l`
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
          <ha-icon .icon=${"mdi:music-circle"}></ha-icon>
          <span>Now</span>
        </button>
        <button
          class=${this.activeTab === "search" ? "active" : ""}
          @click=${() => {
      this.activeTab = "search", this.loadMusicLibrary();
    }}
        >
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <span>Browse</span>
        </button>
        <button
          class=${this.activeTab === "queue" ? "active" : ""}
          @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}
        >
          <ha-icon .icon=${"mdi:playlist-music"}></ha-icon>
          <span>Queue</span>
          ${this.queueItems.length > 0 ? l`<span class="tab-count">${Math.min(this.queueItems.length, 99)}</span>` : p}
        </button>
        <button
          class=${this.activeTab === "speakers" ? "active" : ""}
          @click=${() => {
      this.activeTab = "speakers";
    }}
        >
          <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
          <span>Speakers</span>
        </button>
        ${this.config.show_party ? l`
              <button
                class=${this.activeTab === "party" ? "active" : ""}
                @click=${() => {
      this.activeTab = "party";
    }}
              >
                <ha-icon .icon=${"mdi:party-popper"}></ha-icon>
                <span>Party</span>
              </button>
            ` : p}
      </div>
    `;
  }
  renderNowPlaying(e, t, i) {
    var n, u;
    const s = this.artworkUrl, r = !s && e === "No music selected", a = String(
      ((n = this.playbackPlayer) == null ? void 0 : n.attributes.source) || ((u = this.playbackPlayer) == null ? void 0 : u.attributes.app_name) || ""
    ), o = Math.max(0, this.progressDurationSeconds - this.progressPositionSeconds);
    return l`
      <section class="now-view ${r ? "empty" : ""}">
        <div class="now-layout ${r ? "" : "with-queue"}">
          <div class="now-primary">
            <div class="now-artwork ${s ? "has-art" : "empty"}" aria-label="Current album artwork">
              ${s ? l`<img src=${s} alt="" loading="eager" decoding="async" />` : l`
                    <span class="artwork-empty">
                      <ha-icon .icon=${"mdi:music-note"}></ha-icon>
                      <span>${r ? "Ready to play" : "Artwork unavailable"}</span>
                    </span>
                  `}
            </div>
            <div class="metadata">
              <span class="now-context">
                <span class="playback-state ${this.isPlaying ? "active" : ""}">
                  ${this.isPlaying ? "Playing" : this.activePlayer ? this.playerQuickStatus(this.activePlayer) : "Offline"}
                </span>
                <span>${this.activeName}</span>
                ${a ? l`<span>${a}</span>` : p}
              </span>
              <span class="track">${e}</span>
              <span class="artist">${r ? "Browse Music Assistant or choose a room" : t}</span>
            </div>
            ${this.hasProgress ? l`
                  <div class="progress-cluster">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(Math.round(this.progressPercent))}>
                      <div class="progress-fill" style=${`width: ${this.progressPercent}%`}></div>
                    </div>
                    <div class="progress-time">
                      <span>${this.formatDuration(this.progressPositionSeconds)}</span>
                      <span>−${this.formatDuration(o)}</span>
                    </div>
                  </div>
                ` : p}
            ${r ? l`
                  <div class="empty-actions">
                    ${this.config.show_search ? l`
                          <button class="small-action primary" @click=${() => {
      this.activeTab = "search", this.loadMusicLibrary();
    }}>
                            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
                            Browse music
                          </button>
                        ` : p}
                    ${this.config.show_grouping ? l`
                          <button class="small-action" @click=${() => {
      this.activeTab = "speakers";
    }}>
                            <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                            Speakers
                          </button>
                        ` : p}
                  </div>
                ` : p}
            <div class="controls">
              <button
                class="icon-button"
                aria-label="Previous track"
                ?disabled=${i || this.transportPending}
                @click=${() => this.transportService("media_previous_track")}
              >
                <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
              </button>
              <button
                class="play-button ${this.playbackPending ? "loading" : ""}"
                aria-label=${this.isPlaying ? "Pause" : "Play"}
                ?disabled=${i || this.playbackPending}
                @click=${this.playPause}
              >
                <ha-icon .icon=${this.playbackPending ? "mdi:loading" : this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
              </button>
              <button
                class="icon-button"
                aria-label="Next track"
                ?disabled=${i || this.transportPending}
                @click=${() => this.transportService("media_next_track")}
              >
                <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
              </button>
            </div>
            ${this.renderVolumeControl("primary")}
          </div>
          ${r ? p : this.renderUpNextPreview()}
        </div>
      </section>
    `;
  }
  renderUpNextPreview() {
    const e = this.queueItems.slice(0, 2);
    return l`
      <aside class="up-next-card" aria-label="Upcoming queue">
        <div class="up-next-header">
          <span class="up-next-title">
            <span class="eyebrow">Queue</span>
            <span class="up-next-heading">Up Next</span>
          </span>
          <span class="queue-toolbar-actions">
            ${this.queueItems.length > 0 ? l`<span class="queue-count">${this.queueItems.length}</span>` : p}
            <button class="small-action" @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}>
              View all
            </button>
          </span>
        </div>
        ${this.queueLoading && e.length === 0 ? l`<div class="hint">Loading what’s next…</div>` : p}
        ${e.length > 0 ? l`
              <div class="queue-preview-list">
                ${e.map((t, i) => this.renderQueueItem(t, i, !0))}
              </div>
            ` : p}
        ${!this.queueLoading && e.length === 0 ? l`
              <div class="queue-empty">
                <ha-icon .icon=${this.queueError ? "mdi:playlist-alert" : "mdi:playlist-plus"}></ha-icon>
                <strong>${this.queueError ? "Queue unavailable" : "Nothing queued yet"}</strong>
                <span>${this.queueError ? this.queueError : "Browse for music and choose Play next to line up a song."}</span>
                <div class="queue-empty-actions">
                  ${this.queueError ? l`<button class="small-action" @click=${() => this.refreshQueue()}>Retry</button>` : p}
                  ${this.config.show_search ? l`<button class="small-action" @click=${() => {
      this.activeTab = "search", this.loadMusicLibrary();
    }}>Browse music</button>` : p}
                </div>
              </div>
            ` : p}
      </aside>
    `;
  }
  renderQueue() {
    return l`
      <section class="queue">
        <div class="queue-header">
          <span class="queue-title">
            <span class="eyebrow">Music Assistant</span>
            <span class="queue-heading">Up Next</span>
          </span>
          <span class="queue-toolbar-actions">
            ${this.queueItems.length > 0 ? l`<span class="queue-count">${this.queueItems.length}</span>` : p}
            ${this.config.show_search ? l`
                  <button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>
                    Add music
                  </button>
                ` : p}
            <button
              class="small-action"
              ?disabled=${this.queueLoading}
              @click=${() => this.refreshQueue()}
            >
              Refresh
            </button>
          </span>
        </div>
        ${this.renderQueueCurrent()}
        ${this.queueLoading ? l`<div class="hint">Loading queue...</div>` : p}
        ${!this.queueLoading && this.queueItems.length === 0 ? l`
              <div class="queue-empty">
                <ha-icon .icon=${this.queueError ? "mdi:playlist-alert" : "mdi:playlist-plus"}></ha-icon>
                <strong>${this.queueError ? "Queue unavailable" : "Your queue is open"}</strong>
                <span>${this.queueError ? this.queueError : "Find something in Browse and choose Play next to add it here."}</span>
                <div class="queue-empty-actions">
                  ${this.queueError ? l`<button class="small-action" @click=${() => this.refreshQueue()}>Retry</button>` : p}
                  ${this.config.show_search ? l`<button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>Browse music</button>` : p}
                </div>
              </div>
            ` : p}
        ${this.queueItems.length > 0 ? l`
              <div class="queue-list">
                ${this.queueItems.map((e, t) => this.renderQueueItem(e, t))}
              </div>
            ` : p}
      </section>
    `;
  }
  renderQueueCurrent() {
    var r, a;
    const e = this.playbackPlayer, t = String((e == null ? void 0 : e.attributes.media_title) ?? ((r = this.activeMemory) == null ? void 0 : r.title) ?? "");
    if (!t)
      return p;
    const i = String(
      (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || ((a = this.activeMemory) == null ? void 0 : a.artist) || ""
    ), s = this.artworkUrl;
    return l`
      <div class="queue-current">
        <div class="queue-current-art" style=${s ? `background-image: url("${s}")` : ""}>
          ${s ? p : l`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </div>
        <span class="queue-current-meta">
          <span class="queue-now-label">Now playing</span>
          <span class="queue-current-title">${t}</span>
          <span class="queue-item-subtitle">${i}</span>
        </span>
        <span class="playing-pulse" aria-label=${this.isPlaying ? "Playing" : "Paused"}></span>
      </div>
    `;
  }
  renderSearch() {
    if (!this.config.show_search)
      return p;
    const e = !this.query.trim() && this.browserView === "results";
    return l`
      <section class="search">
        <div class="browse-heading">
          <span>
            <span class="eyebrow">Music Assistant</span>
            <strong>Your Library</strong>
          </span>
          <button
            class="small-action"
            title="Refresh library"
            ?disabled=${this.libraryLoading}
            @click=${() => this.loadMusicLibrary(!0)}
          >
            <ha-icon .icon=${this.libraryLoading ? "mdi:loading" : "mdi:refresh"}></ha-icon>
            Refresh
          </button>
        </div>
        <div class="search-row">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Find songs, albums, artists, playlists"
            @input=${(t) => {
      this.query = t.target.value, this.browserView !== "results" && (this.browserHistory = [], this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0), this.scheduleSearch();
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
        ${e ? this.renderLibraryHome() : p}
        ${e ? this.renderFavorites() : p}
        ${this.libraryError && e ? l`<div class="error">${this.libraryError}</div>` : p}
        ${this.searchError ? l`<div class="error">${this.searchError}</div>` : p}
        ${this.searching ? l`<div class="hint">Searching...</div>` : p}
        ${this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.browserView === "playlist" ? this.renderPlaylistView() : this.searchResults.length > 0 ? this.renderResults() : p}
        ${this.config.show_queue_hint ? l`<div class="hint">Tap a song to play it, or choose Play next to add it to the queue.</div>` : p}
      </section>
    `;
  }
  renderLibraryHome() {
    const e = Object.values(this.libraryItems).reduce((t, i) => t + i.length, 0);
    return this.libraryLoading && e === 0 ? l`
        <div class="library-loading">
          <ha-icon .icon=${"mdi:loading"}></ha-icon>
          <span>Loading playlists, albums, and artists…</span>
        </div>
      ` : (!this.libraryLoaded && !this.libraryError && this.loadMusicLibrary(), this.libraryLoaded && e === 0 ? l`
        <div class="library-empty">
          <ha-icon .icon=${"mdi:bookshelf"}></ha-icon>
          <span>
            <strong>Your library is empty</strong>
            <small>Add or favorite music in Music Assistant, then refresh this view.</small>
          </span>
        </div>
      ` : l`
      <div class="library-home">
        ${this.renderLibraryShelf("Playlists", "playlist", "mdi:playlist-music", 6)}
        ${this.renderLibraryShelf("Recently added albums", "album", "mdi:album", 6)}
        ${this.renderLibraryShelf("Artists", "artist", "mdi:account-music", 6)}
      </div>
    `);
  }
  renderLibraryShelf(e, t, i, s) {
    const r = this.libraryItems[t].slice(0, s);
    return r.length === 0 ? p : l`
      <section class="library-shelf">
        <div class="library-shelf-heading">
          <strong>${e}</strong>
          <span>${this.libraryItems[t].length}</span>
        </div>
        <div class="library-grid">
          ${r.map((a) => this.renderLibraryCard(a, i))}
        </div>
      </section>
    `;
  }
  renderLibraryCard(e, t) {
    var o;
    const i = e.media_type || e.type || "track", s = e.image || e.thumb || ((o = e.album) == null ? void 0 : o.image) || "", r = this.itemArtist(e) || x(i);
    return l`
      <button class="library-card" @click=${i === "artist" ? () => this.openArtist(e) : i === "album" ? () => this.openAlbum(e) : i === "playlist" ? () => this.playSearchResult(e, "play") : () => this.playSearchResult(e, "play")} title=${e.name ?? "Open"}>
        <span class="library-art" style=${s ? `background-image: url("${s}")` : ""}>
          ${s ? p : l`<ha-icon .icon=${t}></ha-icon>`}
          ${i === "track" || i === "playlist" ? l`<span class="library-play"><ha-icon .icon=${"mdi:play"}></ha-icon></span>` : p}
        </span>
        <span class="library-card-copy">
          <strong>${e.name ?? e.uri ?? "Untitled"}</strong>
          <small>${r}</small>
        </span>
      </button>
    `;
  }
  itemsByType(e) {
    return this.searchResults.filter((t) => (t.media_type || t.type) === e);
  }
  renderFavorites() {
    return this.favoriteItems.length === 0 ? p : l`
      <section class="favorites">
        <span class="section-header">Favorites</span>
        ${this.favoriteItems.map((e) => {
      const t = e.media_type || e.type || "track", i = t === "artist" ? "artist" : t === "album" ? "album" : t === "playlist" ? "playlist" : "play";
      return this.renderResultItem(e, i, "favorites");
    })}
      </section>
    `;
  }
  renderResultSection(e, t, i = "play", s = !0, r = "search") {
    if (t.length === 0)
      return p;
    const a = s ? t.slice(0, v(this.config.search_limit, k.search_limit)) : t;
    return l`
      <section class="result-section">
        <span class="section-header">${e}</span>
        ${a.map((o) => this.renderResultItem(o, i, r))}
      </section>
    `;
  }
  renderArtistView() {
    const e = this.selectedArtist, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", i = (e == null ? void 0 : e.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${t ? `background-image: url("${t}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${i}</span>
            <span class="result-sub">Artist</span>
          </div>
          <button class="small-action" @click=${() => this.restoreBrowserState()}>
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
    const e = this.selectedAlbum, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", i = (e == null ? void 0 : e.name) ?? this.query, s = this.albumTracks.length > 0 ? this.albumTracks : this.itemsByType("track").filter((r) => !i || this.itemAlbum(r).toLowerCase() === i.toLowerCase());
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${t ? `background-image: url("${t}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${i}</span>
            <span class="result-sub">Album</span>
          </div>
          ${e ? l`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(e, "play")}
                >
                  Play Album
                </button>
              ` : p}
          <button class="small-action" @click=${() => this.restoreBrowserState()}>
            Back
          </button>
        </div>
        ${this.albumLoading ? l`<div class="hint">Loading album tracks...</div>` : p}
        ${this.albumError ? l`<div class="error">${this.albumError}</div>` : p}
        ${this.renderResultSection("Songs", s, "play", !1, "album")}
      </div>
    `;
  }
  renderPlaylistView() {
    const e = this.selectedPlaylist, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", i = (e == null ? void 0 : e.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${t ? `background-image: url("${t}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${i}</span>
            <span class="result-sub">Playlist</span>
          </div>
          ${e ? l`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(e, "play")}
                >
                  Play Playlist
                </button>
              ` : p}
          <button class="small-action" @click=${() => this.restoreBrowserState()}>
            Back
          </button>
        </div>
        ${this.playlistLoading ? l`<div class="hint">Loading playlist tracks...</div>` : p}
        ${this.playlistError ? l`<div class="error">${this.playlistError}</div>` : p}
        ${this.renderResultSection("Songs", this.playlistTracks, "play", !1, "playlist")}
      </div>
    `;
  }
  configuredService(e, t) {
    const i = (e || t).trim(), s = i.indexOf(".");
    if (s <= 0 || s === i.length - 1)
      throw new Error(`Invalid Home Assistant action: ${i}`);
    return [i.slice(0, s), i.slice(s + 1)];
  }
  get partyTargets() {
    const e = Array.isArray(this.config.party_targets) ? this.config.party_targets.filter((t) => (t == null ? void 0 : t.id) && (t == null ? void 0 : t.name)) : [];
    return e.length > 0 ? e : nt.map((t, i) => ({
      ...t,
      name: i === 0 && this.config.party_screen_name || t.name
    }));
  }
  get selectedPartyTarget() {
    return this.partyTargets.find((e) => e.id === this.partyTargetId) ?? this.partyTargets[0] ?? { id: "lanai", name: Ce };
  }
  runPartyAction(e) {
    if (!this.partyPending) {
      this.partyPending = !0, this.partyError = "", this.partyStatus = e === "start" ? "Connecting the Party screen..." : "Stopping the Party screen...";
      try {
        const t = e === "start" ? this.config.party_start_service : this.config.party_stop_service, i = e === "start" ? Ie : Re, [s, r] = this.configuredService(t, i), a = this.selectedPartyTarget;
        this.service(s, r, e === "start" ? { target: a.id } : void 0).then(() => {
          this.partyStatus = e === "start" ? `Party screen sent to ${a.name}.` : "Party screen stopped.";
        }).catch((o) => {
          this.partyError = this.errorMessage(o, `Could not ${e} the Party screen.`), this.partyStatus = "";
        }).finally(() => {
          this.partyPending = !1;
        });
      } catch (t) {
        this.partyError = this.errorMessage(t, `Could not ${e} the Party screen.`), this.partyStatus = "", this.partyPending = !1;
      }
    }
  }
  openPartyDashboard() {
    const e = this.config.party_dashboard_url || Me;
    window.open(e, "_blank", "noopener,noreferrer");
  }
  renderParty() {
    const e = this.selectedPartyTarget;
    return l`
      <section class="party">
        <div class="party-hero">
          <div class="party-heading">
            <span class="party-icon"><ha-icon .icon=${"mdi:party-popper"}></ha-icon></span>
            <span class="party-copy">
              <span class="party-title">Party on TV</span>
              <span class="party-target">Choose where to show the Party screen</span>
            </span>
          </div>
          <label class="party-tv-picker">
            <ha-icon .icon=${"mdi:apple"}></ha-icon>
            <span class="party-tv-copy">
              <strong>${e.name}</strong>
              <small>Apple TV display</small>
            </span>
            <select
              aria-label="Party Apple TV"
              .value=${e.id}
              ?disabled=${this.partyPending}
              @change=${(t) => {
      this.partyTargetId = t.target.value, this.partyStatus = "", this.partyError = "";
    }}
            >
              ${this.partyTargets.map((t) => l`
                <option value=${t.id}>${t.name}</option>
              `)}
            </select>
          </label>
          <span class="party-description">
            Show Music Assistant's live Party queue and guest QR code on the TV. This does not start or change the music.
          </span>
          <div class="party-actions">
            <button
              class="party-action start"
              ?disabled=${this.partyPending}
              @click=${() => this.runPartyAction("start")}
            >
              <ha-icon .icon=${this.partyPending ? "mdi:loading" : "mdi:television-play"}></ha-icon>
              ${this.partyPending ? "Connecting..." : "Show on TV"}
            </button>
            <button
              class="party-action stop"
              ?disabled=${this.partyPending}
              @click=${() => this.runPartyAction("stop")}
            >
              <ha-icon .icon=${"mdi:stop-circle-outline"}></ha-icon>
              Stop TV Screen
            </button>
            <button class="party-action" @click=${this.openPartyDashboard}>
              <ha-icon .icon=${"mdi:open-in-new"}></ha-icon>
              Open Dashboard
            </button>
          </div>
          ${this.partyStatus ? l`<div class="party-feedback">${this.partyStatus}</div>` : p}
          ${this.partyError ? l`<div class="error">${this.partyError}</div>` : p}
        </div>
      </section>
    `;
  }
  renderSpeakers() {
    const e = this.groupAnchor, t = (e == null ? void 0 : e.entity_id) ?? "", i = String((e == null ? void 0 : e.attributes.friendly_name) ?? this.activeName ?? "Choose a room"), s = new Set(this.groupMembers), r = this.pendingGroupIds.filter((h) => h !== t).length, a = s.size, o = Math.max(1, a) + r, n = this.allPlayers.filter((h) => h.state === "playing").length, u = this.config.show_grouping && this.groupablePlayers.length > 1;
    return l`
      <section class="speakers">
        <div class="speaker-workspace-heading">
          <span class="speaker-heading-line">
            <strong>Speakers</strong>
            <span class="speaker-main-label"><i></i>${i} · Main</span>
          </span>
          <small>${this.allPlayers.length} rooms · ${n} playing · ${a > 1 ? `${a} together` : "playing solo"}</small>
        </div>

        ${this.groupError ? l`<div class="error">${this.groupError}</div>` : p}
        ${u ? l`
              <div class="speaker-selection-bar">
                <span class="speaker-selection-copy">
                  <strong>${r > 0 ? `${o} rooms selected` : a > 1 ? `${a} rooms together` : "Choose rooms to group"}</strong>
                  <small>${r > 0 ? "Apply when ready" : "Tap + to select"} · ${i} is main</small>
                </span>
                <span class="speaker-selection-actions">
                  ${r > 0 ? l`
                        <button class="small-action" @click=${() => {
      this.pendingGroupIds = [];
    }}>Clear</button>
                      ` : p}
                  ${r > 0 ? l`
                        <button
                          class="small-action primary speaker-apply"
                          ?disabled=${this.groupPending}
                          @click=${this.groupSelected}
                        >
                          <ha-icon .icon=${this.groupPending ? "mdi:loading" : "mdi:speaker-multiple"}></ha-icon>
                          ${this.groupPending ? "Applying…" : `Apply ${o}`}
                        </button>
                      ` : p}
                  ${a > 1 ? l`
                        <button
                          class="small-action danger"
                          ?disabled=${this.groupPending}
                          @click=${this.ungroupAll}
                        >Ungroup all</button>
                      ` : p}
                </span>
              </div>
            ` : p}

        <div class="speaker-grid">
          ${this.allPlayers.map((h) => this.renderSpeakerCard(h, t, s))}
        </div>

        ${this.renderTransferPlayback()}
        <button
          class="section-toggle"
          @click=${() => {
      this.showVolumeMixer = !this.showVolumeMixer;
    }}
        >
          <span>Speaker Volumes</span>
          <ha-icon .icon=${this.showVolumeMixer ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.showVolumeMixer ? l`
              <div class="speaker-list">
                ${this.allPlayers.map((h) => {
      const d = y(h), m = Math.round(v(h.attributes.volume_level, 0) * 100), g = this.volumeOverrides.get(h.entity_id) ?? m;
      return l`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${h.attributes.friendly_name ?? x(h.entity_id.split(".")[1])}
                      </span>
                      <button
                        class="icon-button"
                        ?disabled=${d}
                        @click=${() => this.togglePlayerMute(h.entity_id)}
                      >
                        <ha-icon .icon=${h.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        .value=${String(g)}
                        ?disabled=${d}
                        aria-label=${`${h.attributes.friendly_name ?? h.entity_id} volume`}
                        @input=${(b) => {
        const f = this.updateVolumeLabel(b);
        this.setPlayerVolume(h.entity_id, f);
      }}
                        @change=${(b) => {
        const f = this.updateVolumeLabel(b);
        this.setPlayerVolume(h.entity_id, f, !0);
      }}
                      />
                      <span class="state">${g}%</span>
                    </div>
                  `;
    })}
              </div>
            ` : p}
      </section>
    `;
  }
  renderSpeakerCard(e, t, i) {
    const s = y(e), r = e.entity_id === t, a = i.has(e.entity_id), o = this.pendingGroupIds.includes(e.entity_id), n = this.groupablePlayers.some((A) => A.entity_id === e.entity_id), u = e.state === "playing", h = String(e.attributes.media_title ?? ""), d = Math.round(v(e.attributes.volume_level, 0) * 100), m = s ? "Offline" : u ? h || "Playing" : e.state === "paused" ? h || "Paused" : a ? "Grouped" : "Ready", g = r ? "Main" : a ? "Together" : o ? "Selected" : "", b = String(
      e.attributes.friendly_name ?? x(e.entity_id.split(".")[1])
    ), f = e.attributes.is_volume_muted ? "Muted" : `${d}%`;
    return l`
      <article class="speaker-tile ${u ? "playing" : ""} ${a ? "grouped" : ""} ${o ? "selected" : ""} ${s ? "offline" : ""}">
        <button
          class="speaker-select"
          ?disabled=${this.groupPending || r || a || !n}
          aria-label=${r ? `${b} is the main room` : a ? `${b} is already grouped` : n ? `${o ? "Remove" : "Add"} ${b}` : `${b} is controlled separately`}
          @click=${() => this.toggleGroupSelection(e.entity_id)}
        >
          <span class="speaker-select-mark">
            <ha-icon .icon=${r ? "mdi:home-sound-out" : a || o ? "mdi:check" : n ? "mdi:plus" : "mdi:speaker"}></ha-icon>
          </span>
        </button>
        <span class="speaker-tile-copy">
          <strong>${b}</strong>
          <small>
            ${u ? l`
                  <span class="speaker-playing-indicator" aria-hidden="true">
                    <i></i><i></i><i></i>
                  </span>
                ` : p}
            ${m} · ${f}
          </small>
        </span>
        ${g ? l`<span class="speaker-state-badge">${g}</span>` : p}
        ${r ? p : l`
              <button
                class="speaker-room-action"
                ?disabled=${s || this.groupPending}
                @click=${() => a ? this.removeFromGroup(e.entity_id) : this.selectPlayer(e.entity_id)}
              >${a ? "Remove" : "Control"}</button>
            `}
      </article>
    `;
  }
  renderResults() {
    return l`
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
  renderResultItem(e, t = "play", i = "search") {
    var u, h, d;
    const s = e.artist || ((u = e.artists) == null ? void 0 : u.map((m) => m.name).filter(Boolean).join(", ")) || ((h = e.album) == null ? void 0 : h.name) || e.media_type || e.type || "", r = e.image || e.thumb || ((d = e.album) == null ? void 0 : d.image) || "", a = this.isFavorite(e), o = () => this.playSearchResult(e, "play");
    return l`
      <div class="result clickable" @click=${t === "artist" ? () => this.openArtist(e) : t === "album" ? () => this.openAlbum(e) : t === "playlist" ? () => this.openPlaylist(e) : o}>
        <div
          class="result-art"
          style=${r ? `background-image: url("${r}")` : ""}
        ></div>
        <div class="result-main">
          <span class="result-name">${e.name ?? e.uri ?? "Untitled"}</span>
          <span class="result-sub">${s}</span>
        </div>
        <span class="result-actions">
          <button
            class="favorite-toggle ${a ? "active" : ""}"
            title=${a ? "Remove favorite" : "Favorite"}
            @click=${(m) => {
      m.stopPropagation(), this.toggleFavorite(e);
    }}
          >
            <ha-icon .icon=${a ? "mdi:star" : "mdi:star-outline"}></ha-icon>
          </button>
          ${t === "artist" || t === "album" || t === "playlist" ? p : l`
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), o();
    }}
                >
                  Play
                </button>
                <button
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), this.queueSearchResult(e);
    }}
                >
                  Play next
                </button>
              `}
        </span>
      </div>
    `;
  }
  renderQueueItem(e, t = 0, i = !1) {
    var o, n, u;
    const s = e.artist || ((o = e.artists) == null ? void 0 : o.map((h) => h.name).filter(Boolean).join(", ")) || ((n = e.album) == null ? void 0 : n.name) || e.media_type || e.type || "", r = e.image || e.thumb || ((u = e.album) == null ? void 0 : u.image) || "", a = e.name ?? e.uri ?? "Untitled";
    return l`
      <button
        class="queue-item ${i ? "compact" : ""}"
        type="button"
        aria-label=${`Play ${a}`}
        ?disabled=${this.playbackPending}
        @click=${() => this.playQueueItem(e)}
      >
        <span class="queue-position">${t + 1}</span>
        <span class="queue-item-art" style=${r ? `background-image: url("${r}")` : ""}>
          ${r ? p : l`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </span>
        <span class="queue-item-meta">
          <span class="queue-item-title">${a}</span>
          <span class="queue-item-subtitle">${s || "Music Assistant"}</span>
        </span>
        <span class="queue-play" aria-hidden="true">
          <ha-icon .icon=${"mdi:play"}></ha-icon>
        </span>
      </button>
    `;
  }
  render() {
    if (!this.config)
      return l``;
    const e = this.playbackPlayer, t = this.activePlayer, i = this.activeMemory, s = this.optimisticPlaybackItem, r = y(t), a = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", o = (e == null ? void 0 : e.attributes.media_title) || (s == null ? void 0 : s.name) || (i == null ? void 0 : i.title) || "No music selected", n = (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || (s ? this.itemArtist(s) : "") || (i == null ? void 0 : i.artist) || "Ready";
    return l`
      <ha-card>
        <div
          class="player ${this.config.compact ? "compact" : ""} ${this.isPlaying ? "playing" : ""} ${this.playbackPending || this.transportPending ? "pending" : ""} ${this.activeTab === "now" ? "now-active" : ""}"
          style="
            --gamma-sonos-cover: ${a};
            --gamma-sonos-artwork: ${a};
          "
        >
          <div class="topbar">
            ${this.renderHeaderIdentity()}
          </div>
          ${this.activeTab === "now" ? p : this.renderMiniPlayer(o, n, r)}
          ${this.activeTab === "now" ? p : this.renderVolumeControl("compact")}
          ${this.renderPlaybackFeedback()}
          ${this.renderTabs()}
          <div class="tab-content">
            ${this.activeTab === "now" ? this.renderNowPlaying(o, n, r) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.activeTab === "party" ? this.renderParty() : this.renderSpeakers()}
          </div>
        </div>
      </ha-card>
    `;
  }
};
re.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  selectedEntityId: { state: !0 },
  activeTab: { state: !0 },
  query: { state: !0 },
  searching: { state: !0 },
  searchError: { state: !0 },
  playbackError: { state: !0 },
  playbackStatus: { state: !0 },
  playbackSlow: { state: !0 },
  optimisticPlaybackItem: { state: !0 },
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
  libraryItems: { state: !0 },
  libraryLoading: { state: !0 },
  libraryError: { state: !0 },
  transferTargetEntityId: { state: !0 },
  partyPending: { state: !0 },
  partyStatus: { state: !0 },
  partyError: { state: !0 },
  partyTargetId: { state: !0 }
};
let X = re;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", X);
const ae = class ae extends R {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return Pe`
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

      .setup-tools,
      .setup-status {
        display: grid;
        gap: 8px;
      }

      .setup-button {
        appearance: none;
        background: var(--primary-color);
        border: 0;
        border-radius: 10px;
        color: var(--text-primary-color, #ffffff);
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 40px;
        padding: 0 14px;
      }

      .setup-hint {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.35;
      }

      .setup-player {
        align-items: center;
        background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
        border-radius: 9px;
        display: flex;
        gap: 8px;
        justify-content: space-between;
        min-height: 34px;
        padding: 0 10px;
      }

      .setup-player-name {
        color: var(--primary-text-color);
        font-size: 12px;
        font-weight: 650;
      }

      .setup-badge {
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        padding: 4px 8px;
        text-transform: uppercase;
      }

      .setup-badge.ready {
        background: rgb(71 179 108 / 18%);
        color: #73d997;
      }

      .setup-badge.offline,
      .setup-badge.needs-ma {
        background: rgb(224 102 102 / 16%);
        color: #ffaaa4;
      }

      .color-controls {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .color-control {
        align-items: center;
        background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
        border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
        border-radius: 10px;
        display: grid;
        gap: 8px;
        grid-template-columns: 42px minmax(0, 1fr);
        padding: 8px;
      }

      .color-control input[type='color'] {
        appearance: none;
        background: transparent;
        border: 0;
        cursor: pointer;
        height: 38px;
        padding: 0;
        width: 42px;
      }

      .color-control input[type='color']::-webkit-color-swatch-wrapper {
        padding: 0;
      }

      .color-control input[type='color']::-webkit-color-swatch {
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 22%, transparent);
        border-radius: 9px;
      }

      .color-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }

      .color-preset {
        align-items: center;
        appearance: none;
        background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
        border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-size: 11px;
        font-weight: 700;
        gap: 6px;
        min-height: 32px;
        padding: 0 10px 0 5px;
      }

      .color-preset i {
        background: linear-gradient(135deg, var(--preset-background), var(--preset-accent));
        border: 1px solid rgb(255 255 255 / 20%);
        border-radius: 999px;
        height: 20px;
        width: 20px;
      }

      @media (max-width: 520px) {
        .color-controls {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
  setConfig(e) {
    this.config = { ...e };
  }
  updateConfig(e) {
    const t = { ...this.config, ...e };
    Object.keys(t).forEach((i) => {
      const s = i;
      t[s] === "" && delete t[s];
    }), this.config = t, ot(this, t);
  }
  autoConfigureMusicAssistantPlayers() {
    var a;
    const t = Object.values(((a = this.hass) == null ? void 0 : a.states) ?? {}).filter((o) => !!o).filter((o) => w(o) && !y(o)), i = this.config.entities ?? [], r = (i.length > 0 ? i.map((o) => {
      var h, d;
      const n = (h = this.hass) == null ? void 0 : h.states[o];
      if (!n || y(n) || w(n))
        return o;
      const u = Z(String(n.attributes.friendly_name ?? n.entity_id));
      return ((d = t.find((m) => Z(String(m.attributes.friendly_name ?? m.entity_id)) === u)) == null ? void 0 : d.entity_id) ?? o;
    }) : t.map((o) => o.entity_id)).filter((o, n, u) => u.indexOf(o) === n);
    this.updateConfig({
      entities: r,
      music_assistant_entities: r
    });
  }
  renderSetupStatus() {
    const e = this.config.entities ?? [];
    return e.length === 0 ? p : l`
      <div class="setup-status">
        ${e.map((t) => {
      var n;
      const i = (n = this.hass) == null ? void 0 : n.states[t], s = y(i), r = !!(i && w(i) && !s), a = r ? "Ready" : s ? "Offline" : "Needs MA", o = r ? "ready" : s ? "offline" : "needs-ma";
      return l`
            <div class="setup-player">
              <span class="setup-player-name">${(i == null ? void 0 : i.attributes.friendly_name) ?? x(t.split(".")[1] ?? t)}</span>
              <span class="setup-badge ${o}">${a}</span>
            </div>
          `;
    })}
      </div>
    `;
  }
  valueChanged(e) {
    var s;
    const t = e.target, i = e;
    t.configValue && this.updateConfig({
      [t.configValue]: t.checked !== void 0 ? t.checked : ((s = i.detail) == null ? void 0 : s.value) ?? t.value
    });
  }
  renderEntityPicker(e, t, i = !1) {
    return l`
      <ha-selector
        .hass=${this.hass}
        .label=${e}
        .selector=${{ entity: { domain: "media_player", multiple: i } }}
        .value=${this.config[t] ?? (i ? [] : "")}
        .configValue=${t}
        @value-changed=${this.valueChanged}
      ></ha-selector>
    `;
  }
  renderTextInput(e, t, i = "") {
    return l`
      <ha-textfield
        .label=${e}
        .placeholder=${i}
        .value=${this.config[t] ?? ""}
        .configValue=${t}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderNumberInput(e, t, i = "") {
    return l`
      <ha-textfield
        type="number"
        .label=${e}
        .placeholder=${i}
        .value=${this.config[t] ?? ""}
        .configValue=${t}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderSwitch(e, t, i) {
    return l`
      <label class="switch-row">
        <ha-switch
          .checked=${!!(this.config[t] ?? i)}
          .configValue=${t}
          @change=${this.valueChanged}
        ></ha-switch>
        <span>${e}</span>
      </label>
    `;
  }
  renderSelect(e, t, i, s) {
    return l`
      <ha-select
        .label=${e}
        .value=${this.config[t] ?? s}
        .configValue=${t}
        @selected=${this.valueChanged}
        @closed=${(r) => r.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        ${i.map(
      (r) => l`
            <mwc-list-item .value=${r}>${r}</mwc-list-item>
          `
    )}
      </ha-select>
    `;
  }
  render() {
    return l`
      <div class="editor">
        <section class="section">
          <h3>Main</h3>
          <div class="setup-tools">
            <button class="setup-button" @click=${this.autoConfigureMusicAssistantPlayers}>
              Use Music Assistant players
            </button>
            <span class="setup-hint">Automatically replaces native Sonos and Google entities with their Music Assistant players.</span>
          </div>
          ${this.renderEntityPicker("Players", "entities", !0)}
          ${this.renderSetupStatus()}
          <div class="grid">
            ${this.renderTextInput("Name", "name", "Music")}
            ${this.renderTextInput(
      "Music Assistant Config Entry ID",
      "music_assistant_config_entry_id",
      "01KQ..."
    )}
            ${this.renderSelect("Enqueue Mode", "enqueue_mode", ["play", "next", "replace", "replace_next", "add"], "next")}
            ${this.renderNumberInput("Search Limit", "search_limit", "8")}
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
            ${this.renderSwitch("Show Party", "show_party", !0)}
            ${this.renderSwitch("Library Only", "library_only", !1)}
          </div>
        </section>

        <section class="section">
          <h3>Party Screen</h3>
          <div class="grid">
            ${this.renderTextInput(
      "Start Action",
      "party_start_service",
      Ie
    )}
            ${this.renderTextInput(
      "Stop Action",
      "party_stop_service",
      Re
    )}
            ${this.renderTextInput(
      "Party Dashboard URL",
      "party_dashboard_url",
      Me
    )}
            ${this.renderTextInput(
      "TV Name",
      "party_screen_name",
      Ce
    )}
          </div>
        </section>
      </div>
    `;
  }
};
ae.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let ee = ae;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", ee);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
