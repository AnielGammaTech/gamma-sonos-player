/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, J = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), ie = /* @__PURE__ */ new WeakMap();
let be = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (J && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ie.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ie.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (o) => new be(typeof o == "string" ? o : o + "", void 0, Z), ye = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new be(t, o, Z);
}, Ae = (o, e) => {
  if (J) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = O.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, o.appendChild(i);
  }
}, se = J ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Pe(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ee, defineProperty: qe, getOwnPropertyDescriptor: Se, getOwnPropertyNames: Ie, getOwnPropertySymbols: Te, getPrototypeOf: Me } = Object, $ = globalThis, re = $.trustedTypes, Re = re ? re.emptyScript : "", G = $.reactiveElementPolyfillSupport, C = (o, e) => o, K = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Re : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, fe = (o, e) => !Ee(o, e), ae = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let q = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ae) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && qe(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = Se(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = Me(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, i = [...Ie(t), ...Te(t)];
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
      for (const s of i) t.unshift(se(s));
    } else e !== void 0 && t.push(se(e));
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
    return Ae(e, this.constructor.elementStyles), e;
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
      const a = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : K).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : K;
      this._$Em = s;
      const l = c.fromAttribute(t, n.type);
      this[s] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    var a;
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? fe)(r, t) || i.useDefault && i.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
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
        const { wrapped: n } = a, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[C("elementProperties")] = /* @__PURE__ */ new Map(), q[C("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: q }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, ne = (o) => o, V = z.trustedTypes, oe = V ? V.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ve = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, xe = "?" + _, Ce = `<${xe}>`, E = document, N = () => E.createComment(""), L = (o) => o === null || typeof o != "object" && typeof o != "function", X = Array.isArray, ze = (o) => X(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, le = />/g, k = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ue = /'/g, de = /"/g, we = /^(?:script|style|textarea|title)$/i, Ne = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), u = Ne(1), I = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), P = E.createTreeWalker(E, 129);
function _e(o, e) {
  if (!X(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return oe !== void 0 ? oe.createHTML(e) : e;
}
const Le = (o, e) => {
  const t = o.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = M;
  for (let n = 0; n < t; n++) {
    const c = o[n];
    let l, d, p = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, d = a.exec(c), d !== null); ) m = a.lastIndex, a === M ? d[1] === "!--" ? a = ce : d[1] !== void 0 ? a = le : d[2] !== void 0 ? (we.test(d[2]) && (s = RegExp("</" + d[2], "g")), a = k) : d[3] !== void 0 && (a = k) : a === k ? d[0] === ">" ? (a = s ?? M, p = -1) : d[1] === void 0 ? p = -2 : (p = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? k : d[3] === '"' ? de : ue) : a === de || a === ue ? a = k : a === ce || a === le ? a = M : (a = k, s = void 0);
    const g = a === k && o[n + 1].startsWith("/>") ? " " : "";
    r += a === M ? c + Ce : p >= 0 ? (i.push(l), c.slice(0, p) + ve + c.slice(p) + _ + g) : c + _ + (p === -2 ? n : g);
  }
  return [_e(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const n = e.length - 1, c = this.parts, [l, d] = Le(e, t);
    if (this.el = j.createElement(l, i), P.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = P.nextNode()) !== null && c.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(ve)) {
          const m = d[a++], g = s.getAttribute(p).split(_), x = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: r, name: x[2], strings: g, ctor: x[1] === "." ? Ue : x[1] === "?" ? Oe : x[1] === "@" ? Ve : Q }), s.removeAttribute(p);
        } else p.startsWith(_) && (c.push({ type: 6, index: r }), s.removeAttribute(p));
        if (we.test(s.tagName)) {
          const p = s.textContent.split(_), m = p.length - 1;
          if (m > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let g = 0; g < m; g++) s.append(p[g], N()), P.nextNode(), c.push({ type: 2, index: ++r });
            s.append(p[m], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === xe) c.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(_, p + 1)) !== -1; ) c.push({ type: 7, index: r }), p += _.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function T(o, e, t = o, i) {
  var a, n;
  if (e === I) return e;
  let s = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const r = L(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), r === void 0 ? s = void 0 : (s = new r(o), s._$AT(o, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = T(o, s._$AS(o, e.values), s, i)), e;
}
class je {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? E).importNode(t, !0);
    P.currentNode = s;
    let r = P.nextNode(), a = 0, n = 0, c = i[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new U(r, r.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (l = new Qe(r, this, e)), this._$AV.push(l), c = i[++n];
      }
      a !== (c == null ? void 0 : c.index) && (r = P.nextNode(), a++);
    }
    return P.currentNode = E, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class U {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = T(this, e, t), L(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && L(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(_e(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(t);
    else {
      const a = new je(s, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = he.get(e.strings);
    return t === void 0 && he.set(e.strings, t = new j(e)), t;
  }
  k(e) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const r of e) s === t.length ? t.push(i = new U(this.O(N()), this.O(N()), this, this.options)) : i = t[s], i._$AI(r), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = ne(e).nextSibling;
      ne(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = T(this, e, t, 0), a = !L(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
    else {
      const n = e;
      let c, l;
      for (e = r[0], c = 0; c < r.length - 1; c++) l = T(this, n[i + c], t, c), l === I && (l = this._$AH[c]), a || (a = !L(l) || l !== this._$AH[c]), l === h ? e = h : e !== h && (e += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ue extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Oe extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Ve extends Q {
  constructor(e, t, i, s, r) {
    super(e, t, i, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = T(this, e, t, 0) ?? h) === I) return;
    const i = this._$AH, s = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== h && (i === h || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Qe {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    T(this, e);
  }
}
const H = z.litHtmlPolyfillSupport;
H == null || H(j, U), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.2");
const Ge = (o, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new U(e.insertBefore(N(), r), r, void 0, t ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class S extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ge(t, this.renderRoot, this.renderOptions);
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
    return I;
  }
}
var ge;
S._$litElement$ = !0, S.finalized = !0, (ge = A.litElementHydrateSupport) == null || ge.call(A, { LitElement: S });
const F = A.litElementPolyfillSupport;
F == null || F({ LitElement: S });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
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
  background: "#101722",
  accent_color: "#39d98a"
}, Be = 524288, R = "gamma-sonos-player:last-player", pe = "gamma-sonos-player:playback-memory", me = "gamma-sonos-player:favorites", He = 1e4, D = 12e3, Fe = 2 * 6e4, De = 5 * 6e4, Ke = 30;
function v(o, e) {
  if (typeof o == "number" && Number.isFinite(o))
    return o;
  const t = Number(o);
  return Number.isFinite(t) ? t : e;
}
function b(o) {
  return !o || o.state === "unavailable" || o.state === "unknown";
}
function We(o) {
  return !!(v(o == null ? void 0 : o.attributes.supported_features, 0) & Be) || Array.isArray(o == null ? void 0 : o.attributes.group_members);
}
function f(o) {
  const e = String((o == null ? void 0 : o.attributes.app_id) ?? "").toLowerCase(), t = String((o == null ? void 0 : o.attributes.platform) ?? "").toLowerCase(), i = String((o == null ? void 0 : o.attributes.source) ?? "").toLowerCase(), s = Array.isArray(o == null ? void 0 : o.attributes.source_list) ? o.attributes.source_list.join(" ").toLowerCase() : "";
  return (o == null ? void 0 : o.attributes.mass_player_type) === "player" || !!(o != null && o.attributes.active_queue) || e.includes("music_assistant") || t.includes("music_assistant") || i.includes("music assistant") || s.includes("music assistant");
}
function w(o) {
  return o.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Ye(o, e) {
  o.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
const ee = class ee extends S {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.albumTracks = [], this.albumLoading = !1, this.albumError = "", this.playlistTracks = [], this.playlistLoading = !1, this.playlistError = "", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "", this.playbackMemory = {}, this.transportPending = !1, this.favoriteItems = [], this.searchRequestId = 0, this.albumRequestId = 0, this.playlistRequestId = 0, this.lastInitialQueueEntityId = "", this.lastQueueSignature = "", this.queueRequestId = 0, this.cachedMediaPlayers = [], this.cachedAllPlayers = [], this.cachedPlayerConfigKey = "", this.searchCache = /* @__PURE__ */ new Map(), this.browseCache = /* @__PURE__ */ new Map(), this.volumeOverrides = /* @__PURE__ */ new Map(), this.volumeCommitTimers = /* @__PURE__ */ new Map(), this.volumeResetTimers = /* @__PURE__ */ new Map();
  }
  static get styles() {
    return ye`
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
        max-width: min(340px, 76%);
        opacity: 1;
        position: relative;
        width: min(340px, 76%);
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
        align-self: stretch;
        background:
          linear-gradient(145deg, rgb(255 255 255 / 7%), rgb(255 255 255 / 3%)),
          color-mix(in srgb, var(--gamma-sonos-background) 94%, #000000 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 18px;
        box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
        display: grid;
        gap: 10px;
        min-width: 0;
        padding: 12px;
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
        display: grid;
        gap: 6px;
        min-width: 0;
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
          grid-template-columns: minmax(260px, 0.92fr) minmax(280px, 1.08fr);
        }

        .now-layout.with-queue .now-artwork {
          max-width: min(300px, 88%);
          width: min(300px, 88%);
        }

        .now-layout.with-queue .progress {
          width: min(300px, 88%);
        }
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
        color: inherit;
        cursor: pointer;
        display: grid;
        font: inherit;
        gap: 8px;
        grid-template-columns: 24px 42px minmax(0, 1fr) 32px;
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
        gap: 6px;
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
    this.config = { ...y, ...e }, this.selectedEntityId = this.config.entity || this.readStorage(R) || "", this.cachedPlayerConfigKey = "", this.playbackMemory = this.readPlaybackMemory(), this.favoriteItems = this.readFavoriteItems(), this.style.setProperty(
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
    this.config && (this.reconcileVolumeOverrides(), this.rememberPlaybackState(), this.scheduleInitialQueueRefresh(), this.scheduleQueueRefreshForPlayback(), this.syncProgressTimer());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.searchTimer), window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), window.clearInterval(this.progressTimer), window.cancelAnimationFrame(this.volumeRenderFrame ?? 0), this.progressTimer = void 0, this.volumeRenderFrame = void 0, this.searchRequestId += 1, this.albumRequestId += 1, this.playlistRequestId += 1, this.queueRequestId += 1, this.volumeCommitTimers.forEach((e) => window.clearTimeout(e)), this.volumeResetTimers.forEach((e) => window.clearTimeout(e)), this.volumeCommitTimers.clear(), this.volumeResetTimers.clear();
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
    return e.trim().toLowerCase().replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b(ma|mass)\b/g, "").replace(/\b(sonos|music assistant|speaker|player)\b/g, "").replace(/\s+/g, " ").trim();
  }
  preferredRoomPlayer(e, t) {
    return e.entity_id === this.selectedEntityId || t.entity_id === this.selectedEntityId ? t.entity_id === this.selectedEntityId ? t : e : b(e) !== b(t) ? b(e) ? t : e : f(t) && !f(e) ? t : e;
  }
  dedupeRoomPlayers(e) {
    const t = /* @__PURE__ */ new Map();
    return e.forEach((i) => {
      const s = this.roomKey(i), r = t.get(s);
      t.set(s, r ? this.preferredRoomPlayer(r, i) : i);
    }), [...t.values()];
  }
  get allPlayers() {
    var s;
    const e = (s = this.config.entities) != null && s.length ? this.config.entities : this.config.music_assistant_entities ?? [], t = [
      this.selectedEntityId,
      e.join("\0"),
      (this.config.music_assistant_entities ?? []).join("\0")
    ].join("");
    if (this.mediaPlayers, this.cachedAllPlayers.length > 0 && this.cachedPlayerConfigKey === t)
      return this.cachedAllPlayers;
    let i;
    return e.length > 0 ? i = this.dedupePlayers(e.map((r) => {
      var a;
      return (a = this.hass) == null ? void 0 : a.states[r];
    }).filter((r) => !!r)) : i = this.dedupeRoomPlayers(this.cachedMediaPlayers.filter((r) => this.isDiscoverablePlayer(r))), this.cachedPlayerConfigKey = t, this.cachedAllPlayers = i, i;
  }
  get currentlyPlayingPlayer() {
    return this.allPlayers.find((e) => e.state === "playing");
  }
  get currentlyPlayingPlayers() {
    return this.allPlayers.filter((e) => e.state === "playing");
  }
  get activePlayer() {
    var t;
    return ((t = this.hass) == null ? void 0 : t.states[this.selectedEntityId]) ?? this.currentlyPlayingPlayer ?? this.allPlayers[0];
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
  get artworkUrl() {
    var e, t, i, s;
    return String(
      ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture) || ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture_local) || ((i = this.playbackPlayer) == null ? void 0 : i.attributes.media_image_url) || ((s = this.activeMemory) == null ? void 0 : s.artwork) || ""
    );
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
  get progressPercent() {
    var s, r, a;
    const e = v((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_duration, 0);
    let t = v((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const i = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (e <= 0 || t < 0)
      return 0;
    if (this.isPlaying && i) {
      const n = Date.parse(i);
      Number.isFinite(n) && (t += Math.max(0, (Date.now() - n) / 1e3));
    }
    return Math.max(0, Math.min(100, t / e * 100));
  }
  get hasProgress() {
    var e;
    return v((e = this.playbackPlayer) == null ? void 0 : e.attributes.media_duration, 0) > 0;
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
    const r = new Promise((a, n) => {
      s = window.setTimeout(() => n(new Error(i)), t);
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
    for (e.delete(t), e.set(t, { expiresAt: Date.now() + s, items: i }); e.size > Ke; ) {
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
      const e = JSON.parse(this.readStorage(pe) || "{}");
      return typeof e == "object" && e ? e : {};
    } catch {
      return {};
    }
  }
  writePlaybackMemory(e) {
    this.writeStorage(pe, JSON.stringify(e));
  }
  readFavoriteItems() {
    try {
      const e = JSON.parse(this.readStorage(me) || "[]");
      return Array.isArray(e) ? e.map((t) => typeof t == "object" && t ? t : void 0).filter((t) => !!(t != null && t.name || t != null && t.uri)).slice(0, 60) : [];
    } catch {
      return [];
    }
  }
  writeFavoriteItems(e) {
    this.writeStorage(me, JSON.stringify(e.slice(0, 60)));
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
  rememberPlaybackState() {
    const e = this.activePlayer, t = String((e == null ? void 0 : e.attributes.media_title) ?? ""), i = String(
      (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || ""
    ), s = String(
      (e == null ? void 0 : e.attributes.entity_picture) || (e == null ? void 0 : e.attributes.entity_picture_local) || (e == null ? void 0 : e.attributes.media_image_url) || ""
    );
    if (!e || !t && !s)
      return;
    const r = this.playbackMemory[e.entity_id];
    if (r && r.title === t && r.artist === i && r.artwork === s && r.state === e.state)
      return;
    const a = {
      ...this.playbackMemory,
      [e.entity_id]: {
        title: t,
        artist: i,
        artwork: s,
        state: e.state,
        updatedAt: Date.now()
      }
    };
    this.playbackMemory = a, this.writePlaybackMemory(a);
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
  get groupMembers() {
    var t;
    const e = (t = this.activePlayer) == null ? void 0 : t.attributes.group_members;
    return Array.isArray(e) ? e : [this.activeEntityId].filter(Boolean);
  }
  get groupablePlayers() {
    const e = f(this.activePlayer), t = /* @__PURE__ */ new Set();
    return this.allPlayers.filter((i) => {
      if (b(i))
        return !1;
      const s = this.matchingMusicAssistantPlayer(i), r = We(i) || f(i) || !!s, a = e && s ? s.entity_id : i.entity_id;
      return !r || t.has(a) ? !1 : (t.add(a), !0);
    });
  }
  matchingMusicAssistantPlayer(e) {
    if (!e)
      return;
    const t = new Set(this.config.music_assistant_entities ?? []), i = (n) => t.has(n.entity_id);
    if (!b(e) && (f(e) || i(e)))
      return e;
    const [, s = ""] = e.entity_id.split("."), r = [
      `media_player.${s}_2`,
      `media_player.ma_${s}`,
      `media_player.mass_${s}`,
      `media_player.${s}_music_assistant`
    ], a = this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id));
    return this.mediaPlayers.find((n) => !b(n) && r.includes(n.entity_id) && (f(n) || i(n))) ?? this.mediaPlayers.find((n) => !b(n) && (f(n) || i(n)) && this.normalizedRoomName(String(n.attributes.friendly_name ?? n.entity_id)) === a);
  }
  resolveGroupPlayers(e, t) {
    const i = [e, ...t], s = i.some((c) => f(c)), r = i.some((c) => !f(c));
    if (!s || !r)
      return { anchor: e, members: t };
    const a = this.matchingMusicAssistantPlayer(e), n = t.map((c) => this.matchingMusicAssistantPlayer(c)).filter((c) => !!c);
    if (!a)
      return {
        anchor: e,
        members: [],
        error: `Use the Music Assistant version of ${e.attributes.friendly_name ?? e.entity_id} as the main speaker for mixed groups.`
      };
    if (n.length !== t.length) {
      const c = t.filter((l) => !this.matchingMusicAssistantPlayer(l)).map((l) => l.attributes.friendly_name ?? w(l.entity_id.split(".")[1]));
      return {
        anchor: a,
        members: [],
        error: `Music Assistant is unavailable for ${c.join(", ")}. Choose speakers from the same system instead.`
      };
    }
    return {
      anchor: a,
      members: n.filter((c) => c.entity_id !== a.entity_id)
    };
  }
  service(e, t, i, s) {
    const r = this.hass;
    if (!r)
      return Promise.reject(new Error("Home Assistant is not connected."));
    try {
      return this.withTimeout(
        Promise.resolve(r.callService(e, t, i, s)),
        He,
        `${e}.${t} timed out. Check the speaker connection and try again.`
      );
    } catch (a) {
      return Promise.reject(a);
    }
  }
  mediaService(e, t = {}, i = this.activeEntityId) {
    var r;
    const s = (r = this.hass) == null ? void 0 : r.states[i];
    return !i || b(s) ? Promise.reject(new Error("That speaker is unavailable.")) : this.service("media_player", e, t, {
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
    !i || b((s = this.hass) == null ? void 0 : s.states[i]) || (this.transportPending = !0, this.service("media_player", e, {}, {
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
    !t || b(t) || (this.playbackError = "", this.service("media_player", "volume_mute", {
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
    if (this.groupError = "", this.groupPending || !this.activeEntityId || this.pendingGroupIds.length === 0)
      return;
    const e = this.activePlayer, t = this.pendingGroupIds.filter((d) => d !== this.activeEntityId).map((d) => {
      var p;
      return (p = this.hass) == null ? void 0 : p.states[d];
    }).filter((d) => d ? this.groupablePlayers.some((p) => p.entity_id === d.entity_id) : !1);
    if (!e || t.length === 0)
      return;
    const i = this.resolveGroupPlayers(e, t);
    if (i.error) {
      this.groupError = i.error;
      return;
    }
    const s = i.members.map((d) => d.entity_id).filter((d, p, m) => d !== i.anchor.entity_id && m.indexOf(d) === p);
    if (s.length === 0) {
      this.groupError = "Those selected speakers cannot be grouped with this main speaker.";
      return;
    }
    const r = this.selectedEntityId, a = [...this.selectedGroupIds], n = [...this.pendingGroupIds], c = this.activeEntityId, l = t.map((d) => d.entity_id);
    this.groupPending = !0, this.selectedGroupIds = [c, ...l], this.pendingGroupIds = [], this.service("media_player", "join", {
      group_members: s
    }, {
      entity_id: i.anchor.entity_id
    }).then(() => {
      this.writeStorage(R, c);
    }).catch((d) => {
      this.selectedEntityId = r, this.selectedGroupIds = a, this.pendingGroupIds = n, this.groupError = this.errorMessage(d, "Grouping failed.");
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  continueInSelectedRoom() {
    var n, c;
    this.groupError = "", this.playbackError = "";
    const e = this.pendingGroupIds.map((l) => {
      var d;
      return (d = this.hass) == null ? void 0 : d.states[l];
    }).filter((l) => l ? l.entity_id !== this.playbackEntityId && l.entity_id !== this.activeEntityId : !1);
    if (e.length !== 1) {
      this.groupError = "Select exactly one room to transfer playback.";
      return;
    }
    const t = e[0], i = this.playbackPlayer, s = ((n = this.matchingMusicAssistantPlayer(i)) == null ? void 0 : n.entity_id) ?? this.playbackEntityId, r = ((c = this.matchingMusicAssistantPlayer(t)) == null ? void 0 : c.entity_id) ?? (t == null ? void 0 : t.entity_id);
    if (!r || !s)
      return;
    const a = () => {
      this.selectedEntityId = r, this.pendingGroupIds = [], this.queueItems = [], this.queueError = "", this.lastInitialQueueEntityId = "", this.writeStorage(R, r), this.refreshQueueAfterPlayback();
    };
    this.groupPending = !0, this.service("music_assistant", "transfer_queue", {
      source_player: s,
      auto_play: !0
    }, {
      entity_id: r
    }).then(a).catch(async () => {
      const l = i, d = String((l == null ? void 0 : l.attributes.media_content_id) ?? ""), p = String((l == null ? void 0 : l.attributes.media_content_type) ?? "music");
      if (!d) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      try {
        await this.service("music_assistant", "play_media", {
          media_id: d,
          media_type: p,
          enqueue: "play"
        }, {
          entity_id: r
        }), a();
      } catch (m) {
        this.playbackError = this.errorMessage(m, "Playback transfer failed.");
      }
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  ungroupActive() {
    this.groupPending || (this.groupPending = !0, this.service("media_player", "unjoin", {}, {
      entity_id: this.activeEntityId
    }).then(() => {
      this.selectedGroupIds = [], this.pendingGroupIds = [];
    }).catch((e) => {
      this.groupError = this.errorMessage(e, "Could not leave the speaker group.");
    }).finally(() => {
      this.groupPending = !1;
    }));
  }
  ungroupAll() {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const e = this.groupMembers.map((i) => this.service("media_player", "unjoin", {}, { entity_id: i })), t = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    Promise.allSettled(e).then((i) => {
      i.some((s) => s.status === "rejected") && (this.groupError = "Some speakers could not leave the group. Try them individually.");
    }).finally(t);
  }
  removeFromGroup(e) {
    this.groupPending || (this.groupPending = !0, this.service("media_player", "unjoin", {}, { entity_id: e }).then(() => {
      this.selectedGroupIds = this.selectedGroupIds.filter((t) => t !== e), this.pendingGroupIds = this.pendingGroupIds.filter((t) => t !== e);
    }).catch((t) => {
      this.groupError = this.errorMessage(t, "Could not remove that speaker.");
    }).finally(() => {
      this.groupPending = !1;
    }));
  }
  musicAssistantSearchData(e, t = {}) {
    var s;
    const i = {
      name: e,
      limit: v(this.config.search_limit, y.search_limit),
      library_only: !!(this.config.library_only ?? y.library_only),
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
    const s = await this.withTimeout(
      this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: e,
        return_response: !0
      }),
      D,
      "Music search timed out. Check Music Assistant and try again."
    ), r = this.extractSearchResults(s);
    return this.cacheItems(this.searchCache, t, r, Fe), r;
  }
  async searchMusicAssistant(e = !1) {
    var s, r;
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
      this.searchResults = a, e || (this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "");
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
    }, 350);
  }
  openArtist(e) {
    this.selectedArtist = e, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "", this.browserView = "artist", this.query = e.name ?? this.query, this.searchMusicAssistant(!0);
  }
  openAlbum(e) {
    this.selectedAlbum = e, this.selectedArtist = void 0, this.selectedPlaylist = void 0, this.browserView = "album", this.query = e.name ?? this.query, this.loadAlbumTracks(e);
  }
  openPlaylist(e) {
    this.selectedPlaylist = e, this.selectedArtist = void 0, this.selectedAlbum = void 0, this.browserView = "playlist", this.query = e.name ?? this.query, this.loadPlaylistTracks(e);
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
    var c;
    if (!((c = this.hass) != null && c.callWS) || !e.uri)
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
      D,
      `Loading this ${t} timed out. Try again.`
    ), n = this.extractBrowseTracks(a, e);
    return this.cacheItems(this.browseCache, s, n, De), n;
  }
  async searchAlbumTracks(e) {
    const t = e.name ?? "", i = this.itemArtist(e), s = i || t;
    if (!s)
      return [];
    const r = this.musicAssistantSearchData(s, {
      album: t,
      limit: Math.max(40, v(this.config.search_limit, y.search_limit)),
      media_type: ["track"]
    });
    return i && (r.artist = i), this.fetchMusicAssistantSearch(r).then((a) => a.filter((n) => (n.media_type || n.type) === "track"));
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
    var c;
    const i = [], s = t.name ?? "", r = this.itemArtist(t), a = t.image || t.thumb || ((c = t.album) == null ? void 0 : c.image) || "", n = (l, d = 0) => {
      if (typeof l != "object" || !l)
        return;
      const p = l, m = this.normalizedMediaType(
        p.media_content_type || p.media_class,
        "track"
      ), g = String(p.media_content_id ?? ""), x = String(p.title ?? p.name ?? ""), $e = Array.isArray(p.children) ? p.children : [];
      d > 0 && !!g && !!x && (m === "track" || String(p.media_class ?? "").toLowerCase().includes("track") || p.can_play && !p.can_expand && m !== "album") && i.push({
        name: x,
        uri: g,
        media_type: "track",
        type: "track",
        artist: r,
        album: s ? { name: s, image: a } : t.album,
        image: String(p.thumbnail ?? p.image ?? a) || void 0
      }), $e.forEach((ke) => n(ke, d + 1));
    };
    return n(e), i;
  }
  extractSearchResults(e) {
    const i = e.response ?? e, s = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return s.forEach((a) => {
      const n = i[a];
      Array.isArray(n) && n.forEach((c) => {
        typeof c == "object" && c && r.push(this.normalizeSearchItem(c, a === "tracks" ? "track" : a.slice(0, -1)));
      });
    }), r;
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
      artist: String(e.artist ?? e.media_artist ?? (s == null ? void 0 : s.map((n) => n.name).filter(Boolean).join(", ")) ?? ""),
      album: i,
      image: a || void 0
    };
  }
  queueTargetEntityId() {
    const e = this.matchingMusicAssistantPlayer(this.activePlayer);
    return e && !b(e) ? e.entity_id : "";
  }
  queueServiceAttempts(e) {
    return [
      {
        domain: "music_assistant",
        service: "get_queue",
        data: { entity_id: e }
      }
    ];
  }
  async refreshQueue(e = {}) {
    var s;
    const t = this.queueTargetEntityId(), i = ++this.queueRequestId;
    if (!t || !((s = this.hass) != null && s.callWS)) {
      this.queueItems = [], this.queueLoading = !1, this.queueError = t ? "Queue responses are not available in this Home Assistant view." : "Queue is only available for Music Assistant speaker entities.";
      return;
    }
    e.silent || (this.queueLoading = !0), this.queueError = "";
    try {
      const r = [];
      let a = !1;
      for (const n of this.queueServiceAttempts(t))
        try {
          const c = await this.withTimeout(
            this.hass.callWS({
              type: "call_service",
              domain: n.domain,
              service: n.service,
              service_data: n.data,
              return_response: !0
            }),
            D,
            "Queue refresh timed out. Check Music Assistant and try again."
          );
          if (i !== this.queueRequestId || t !== this.queueTargetEntityId())
            return;
          a = !0;
          const l = this.extractQueueItems(c, t);
          if (l.length > 0) {
            this.queueItems = l, this.queueError = "";
            return;
          }
        } catch (c) {
          if (i !== this.queueRequestId)
            return;
          r.push(c instanceof Error ? c.message : `${n.domain}.${n.service} failed.`);
        }
      if (i !== this.queueRequestId || t !== this.queueTargetEntityId())
        return;
      this.queueItems = [], this.queueError = a ? "" : r.length > 0 ? r[r.length - 1] : "Queue is empty or unavailable for this Music Assistant player.";
    } finally {
      i === this.queueRequestId && (this.queueLoading = !1);
    }
  }
  extractQueueItems(e, t = "") {
    const i = this.responsePayload(e), s = this.queueResponseRoots(i, t);
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
        const l = this.queueItemsFromUnknown(c).filter((d) => !a || !this.sameQueueItem(d, a));
        if (l.length > 0)
          return this.dedupeQueueItems(l);
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
    ), n = String(i.uri ?? t.uri ?? t.media_id ?? t.media_content_id ?? ""), c = this.normalizedMediaType(i.media_type ?? t.media_type ?? t.type, "track"), l = String(
      i.image ?? t.image ?? t.thumbnail ?? t.entity_picture ?? t.media_image ?? t.local_image_encoded ?? (s == null ? void 0 : s.image) ?? ""
    );
    if (!(!a && !n))
      return {
        name: a || n,
        uri: n || void 0,
        media_type: c,
        type: c,
        artists: r,
        artist: String(i.artist ?? t.artist ?? t.media_artist ?? ""),
        album: s,
        image: l || void 0,
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
      this.refreshQueue({ silent: e });
    }, 600), this.queueRefreshRetryTimer = window.setTimeout(() => {
      this.refreshQueue({ silent: !0 });
    }, 1800);
  }
  playSearchResult(e, t) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const i = e.uri || e.name;
    if (!i)
      return;
    const s = t ?? this.config.enqueue_mode ?? y.enqueue_mode, r = (s === "next" || s === "add") && !this.isPlaying ? "play" : s, a = this.matchingMusicAssistantPlayer(this.activePlayer), n = (a == null ? void 0 : a.entity_id) ?? "";
    if (!a || !n) {
      this.playbackError = `No Music Assistant player matches ${this.activeName || "the selected speaker"}. Add its Music Assistant entity in the card settings.`;
      return;
    }
    this.playbackPending = !0, this.writeStorage(R, n), this.selectedEntityId = n;
    const c = e.media_type || e.type || "track", l = {
      media_id: i,
      media_type: c,
      enqueue: r
    }, d = this.itemArtist(e), p = this.itemAlbum(e);
    d && !String(i).includes("://") && (c === "track" || c === "album") && (l.artist = d), p && !String(i).includes("://") && c === "track" && (l.album = p), this.service("music_assistant", "play_media", l, {
      entity_id: n
    }).catch(async (m) => {
      if (r === "next") {
        try {
          await this.service("music_assistant", "play_media", {
            media_id: i,
            media_type: c,
            enqueue: "add"
          }, {
            entity_id: n
          });
        } catch (g) {
          this.playbackError = this.errorMessage(g, "Music Assistant queue add failed.");
        }
        return;
      }
      if (e.uri && e.name) {
        const g = {
          media_id: e.name,
          media_type: c,
          enqueue: r
        };
        d && (c === "track" || c === "album") && (g.artist = d), p && c === "track" && (g.album = p);
        try {
          await this.service("music_assistant", "play_media", g, {
            entity_id: n
          });
          return;
        } catch (x) {
          this.playbackError = `Could not play ${e.name} on ${a.attributes.friendly_name ?? n}: ${this.errorMessage(x, "no playable result was found")}`;
          return;
        }
      }
      this.playbackError = `Could not play this item on ${a.attributes.friendly_name ?? n}: ${this.errorMessage(m, "Music Assistant playback failed.")}`;
    }).finally(() => {
      this.playbackPending = !1, this.refreshQueueAfterPlayback();
    });
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
    }).catch((s) => {
      this.playbackError = this.errorMessage(s, "Queue item playback failed.");
    }).finally(() => {
      this.playbackPending = !1, this.refreshQueueAfterPlayback();
    });
  }
  renderRooms() {
    const e = this.currentlyPlayingPlayers;
    return e.length < 2 ? h : u`
      <div class="rooms">
        <span class="now-label">Playing in</span>
        <div class="now-row">
          <div class="now-speakers">
            ${e.map(
      (t) => u`
                <span class="now-chip">
                  ${t.attributes.friendly_name ?? w(t.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
        </div>
      </div>
    `;
  }
  playerPickerLabel(e, t) {
    const i = e.attributes.friendly_name ?? w(e.entity_id.split(".")[1]);
    return t.filter((r) => (r.attributes.friendly_name ?? w(r.entity_id.split(".")[1])).trim().toLowerCase() === i.trim().toLowerCase()).length < 2 ? i : f(e) ? `${i} (Music Assistant)` : Array.isArray(e.attributes.group_members) ? `${i} (Sonos)` : `${i} (${e.entity_id.split(".")[1]})`;
  }
  renderPlayerPicker(e, t = !1) {
    return u`
      <label class="player-picker ${t ? "header-picker" : ""}">
        <ha-icon .icon=${"mdi:speaker"}></ha-icon>
        <select
          .value=${this.activeEntityId}
          @change=${(i) => {
      var n;
      const s = i.target.value, r = (n = this.hass) == null ? void 0 : n.states[s];
      this.selectedEntityId = s, this.writeStorage(R, s);
      const a = r == null ? void 0 : r.attributes.group_members;
      this.selectedGroupIds = Array.isArray(a) ? [...a] : [s], this.pendingGroupIds = [], this.queueItems = [], this.queueError = "", this.queueLoading = !1, this.queueRequestId += 1, this.lastQueueSignature = "", this.lastInitialQueueEntityId = "", window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), this.activeTab === "queue" && this.refreshQueue();
    }}
        >
          ${e.map(
      (i) => u`
              <option
                .value=${i.entity_id}
                ?selected=${i.entity_id === this.activeEntityId}
              >
                ${this.playerPickerLabel(i, e)}
              </option>
            `
    )}
        </select>
      </label>
    `;
  }
  renderHeaderIdentity() {
    const e = this.allPlayers;
    return u`
      <div class="title">
        ${e.length > 1 ? this.renderPlayerPicker(e, !0) : u`<span class="name">${this.activeName || "Sonos"}</span>`}
      </div>
    `;
  }
  renderTopControls(e, t) {
    return u`
      <div class="top-controls">
        <span class="header-state">${e ? "Unavailable" : w((t == null ? void 0 : t.state) ?? "idle")}</span>
      </div>
    `;
  }
  renderMiniPlayer(e, t, i) {
    return u`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork"></div>
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
  renderGrouping() {
    const e = this.groupablePlayers;
    if (!this.config.show_grouping || e.length < 2)
      return h;
    const t = e.some((n) => n.entity_id === this.activeEntityId) || !!this.matchingMusicAssistantPlayer(this.activePlayer), i = this.pendingGroupIds.filter((n) => {
      var l;
      const c = (l = this.hass) == null ? void 0 : l.states[n];
      return n !== this.activeEntityId && e.some((d) => d.entity_id === (c == null ? void 0 : c.entity_id));
    }).length, s = this.pendingGroupIds.filter((n) => {
      var l;
      const c = (l = this.hass) == null ? void 0 : l.states[n];
      return !!(c && n !== this.activeEntityId && n !== this.playbackEntityId && e.some((d) => d.entity_id === c.entity_id));
    }).length, r = this.groupMembers.length, a = r > 1;
    return u`
      <section class="grouping">
        <span class="section-title">Choose Speakers</span>
        ${this.groupError ? u`<div class="error">${this.groupError}</div>` : h}
        <div class="group-row">
          ${e.map((n) => {
      const c = this.selectedGroupIds.includes(n.entity_id) || this.groupMembers.includes(n.entity_id), l = this.pendingGroupIds.includes(n.entity_id), d = c || l, p = n.entity_id === this.activeEntityId;
      return u`
	              <button
	                class="group-chip ${d ? "active" : ""} ${p ? "anchor" : ""}"
	                ?disabled=${p || this.groupPending}
                  title=${p ? "Current room" : d ? "Remove from selection" : "Add to selection"}
                @click=${() => this.toggleGroupSelection(n.entity_id)}
              >
                <span class="group-check">${d ? "✓" : ""}</span>
                <span class="group-name">
                  ${n.attributes.friendly_name ?? w(n.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${p ? "This room" : c ? "In group" : l ? "Selected" : "Available"}</span>
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
            ?disabled=${this.groupPending || !t || i === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Group Selected</span>
            <span class="group-status">
              ${t ? `${i} room${i === 1 ? "" : "s"}` : "Cannot group this speaker"}
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
    const e = this.groupMembers.map((t) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[t];
    }).filter((t) => !!t);
    return e.length <= 1 ? h : u`
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
      (t) => u`
                <div class="current-member">
                  <span class="speaker-name">
                    ${t.attributes.friendly_name ?? w(t.entity_id.split(".")[1])}
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
          Browse
        </button>
        <button
          class=${this.activeTab === "queue" ? "active" : ""}
          @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}
        >
          Queue
          ${this.queueItems.length > 0 ? u`<span class="tab-count">${Math.min(this.queueItems.length, 99)}</span>` : h}
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
  renderNowPlaying(e, t, i) {
    const s = this.artworkUrl, r = !s && e === "No music selected";
    return u`
      <section class="now-view ${r ? "empty" : ""}">
        <div class="now-layout ${r ? "" : "with-queue"}">
          <div class="now-primary">
            <div class="now-artwork ${s ? "has-art" : "empty"}" aria-label="Current album artwork">
              ${s ? u`<img src=${s} alt="" loading="eager" decoding="async" />` : u`
                    <span class="artwork-empty">
                      <ha-icon .icon=${"mdi:music-note"}></ha-icon>
                      <span>${r ? "Ready to play" : "Artwork unavailable"}</span>
                    </span>
                  `}
            </div>
            ${this.hasProgress ? u`
                  <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(Math.round(this.progressPercent))}>
                    <div class="progress-fill" style=${`width: ${this.progressPercent}%`}></div>
                  </div>
                ` : h}
            <div class="metadata">
              <span class="track">${e}</span>
              <span class="artist">${r ? "Browse Music Assistant or choose a room" : t}</span>
            </div>
            ${r ? u`
                  <div class="empty-actions">
                    ${this.config.show_search ? u`
                          <button class="small-action primary" @click=${() => {
      this.activeTab = "search";
    }}>
                            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
                            Browse music
                          </button>
                        ` : h}
                    ${this.config.show_grouping ? u`
                          <button class="small-action" @click=${() => {
      this.activeTab = "speakers";
    }}>
                            <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                            Speakers
                          </button>
                        ` : h}
                  </div>
                ` : h}
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
          </div>
          ${r ? h : this.renderUpNextPreview()}
        </div>
      </section>
    `;
  }
  renderUpNextPreview() {
    const e = this.queueItems.slice(0, 3);
    return u`
      <aside class="up-next-card" aria-label="Upcoming queue">
        <div class="up-next-header">
          <span class="up-next-title">
            <span class="eyebrow">Queue</span>
            <span class="up-next-heading">Up Next</span>
          </span>
          <span class="queue-toolbar-actions">
            ${this.queueItems.length > 0 ? u`<span class="queue-count">${this.queueItems.length}</span>` : h}
            <button class="small-action" @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}>
              View all
            </button>
          </span>
        </div>
        ${this.queueLoading && e.length === 0 ? u`<div class="hint">Loading what’s next…</div>` : h}
        ${e.length > 0 ? u`
              <div class="queue-preview-list">
                ${e.map((t, i) => this.renderQueueItem(t, i, !0))}
              </div>
            ` : h}
        ${!this.queueLoading && e.length === 0 ? u`
              <div class="queue-empty">
                <ha-icon .icon=${this.queueError ? "mdi:playlist-alert" : "mdi:playlist-plus"}></ha-icon>
                <strong>${this.queueError ? "Queue unavailable" : "Nothing queued yet"}</strong>
                <span>${this.queueError ? this.queueError : "Browse for music and use Next to line up a song."}</span>
                <div class="queue-empty-actions">
                  ${this.queueError ? u`<button class="small-action" @click=${() => this.refreshQueue()}>Retry</button>` : h}
                  ${this.config.show_search ? u`<button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>Browse music</button>` : h}
                </div>
              </div>
            ` : h}
      </aside>
    `;
  }
  renderQueue() {
    return u`
      <section class="queue">
        <div class="queue-header">
          <span class="queue-title">
            <span class="eyebrow">Music Assistant</span>
            <span class="queue-heading">Up Next</span>
          </span>
          <span class="queue-toolbar-actions">
            ${this.queueItems.length > 0 ? u`<span class="queue-count">${this.queueItems.length}</span>` : h}
            ${this.config.show_search ? u`
                  <button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>
                    Add music
                  </button>
                ` : h}
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
        ${this.queueLoading ? u`<div class="hint">Loading queue...</div>` : h}
        ${!this.queueLoading && this.queueItems.length === 0 ? u`
              <div class="queue-empty">
                <ha-icon .icon=${this.queueError ? "mdi:playlist-alert" : "mdi:playlist-plus"}></ha-icon>
                <strong>${this.queueError ? "Queue unavailable" : "Your queue is open"}</strong>
                <span>${this.queueError ? this.queueError : "Find something in Browse and tap Next to add it here."}</span>
                <div class="queue-empty-actions">
                  ${this.queueError ? u`<button class="small-action" @click=${() => this.refreshQueue()}>Retry</button>` : h}
                  ${this.config.show_search ? u`<button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>Browse music</button>` : h}
                </div>
              </div>
            ` : h}
        ${this.queueItems.length > 0 ? u`
              <div class="queue-list">
                ${this.queueItems.map((e, t) => this.renderQueueItem(e, t))}
              </div>
            ` : h}
      </section>
    `;
  }
  renderQueueCurrent() {
    var r, a;
    const e = this.playbackPlayer, t = String((e == null ? void 0 : e.attributes.media_title) ?? ((r = this.activeMemory) == null ? void 0 : r.title) ?? "");
    if (!t)
      return h;
    const i = String(
      (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || ((a = this.activeMemory) == null ? void 0 : a.artist) || ""
    ), s = this.artworkUrl;
    return u`
      <div class="queue-current">
        <div class="queue-current-art" style=${s ? `background-image: url("${s}")` : ""}>
          ${s ? h : u`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
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
    return this.config.show_search ? u`
      <section class="search">
        <span class="section-title">Browse Music Assistant</span>
        <div class="search-row">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Find songs, albums, artists, playlists"
            @input=${(e) => {
      this.query = e.target.value, this.scheduleSearch();
    }}
            @keydown=${(e) => {
      e.key === "Enter" && this.searchMusicAssistant();
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
        ${this.searching ? u`<div class="hint">Searching...</div>` : h}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.browserView === "playlist" ? this.renderPlaylistView() : this.renderResults() : h}
        ${this.config.show_queue_hint ? u`<div class="hint">Tap a result to play it now, or use Next to add it to Up Next.</div>` : h}
      </section>
    ` : h;
  }
  itemsByType(e) {
    return this.searchResults.filter((t) => (t.media_type || t.type) === e);
  }
  renderFavorites() {
    return this.favoriteItems.length === 0 ? h : u`
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
      return h;
    const a = s ? t.slice(0, v(this.config.search_limit, y.search_limit)) : t;
    return u`
      <section class="result-section">
        <span class="section-header">${e}</span>
        ${a.map((n) => this.renderResultItem(n, i, r))}
      </section>
    `;
  }
  renderArtistView() {
    const e = this.selectedArtist, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", i = (e == null ? void 0 : e.name) ?? this.query;
    return u`
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
    const e = this.selectedAlbum, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", i = (e == null ? void 0 : e.name) ?? this.query, s = this.albumTracks.length > 0 ? this.albumTracks : this.itemsByType("track").filter((r) => !i || this.itemAlbum(r).toLowerCase() === i.toLowerCase());
    return u`
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
          ${e ? u`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(e, "play")}
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
    const e = this.selectedPlaylist, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", i = (e == null ? void 0 : e.name) ?? this.query;
    return u`
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
          ${e ? u`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(e, "play")}
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
                ${this.allPlayers.map((e) => {
      const t = b(e), i = Math.round(v(e.attributes.volume_level, 0) * 100), s = this.volumeOverrides.get(e.entity_id) ?? i;
      return u`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${e.attributes.friendly_name ?? w(e.entity_id.split(".")[1])}
                      </span>
                      <button
                        class="icon-button"
                        ?disabled=${t}
                        @click=${() => this.togglePlayerMute(e.entity_id)}
                      >
                        <ha-icon .icon=${e.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        .value=${String(s)}
                        ?disabled=${t}
                        aria-label=${`${e.attributes.friendly_name ?? e.entity_id} volume`}
                        @input=${(r) => {
        const a = this.updateVolumeLabel(r);
        this.setPlayerVolume(e.entity_id, a);
      }}
                        @change=${(r) => {
        const a = this.updateVolumeLabel(r);
        this.setPlayerVolume(e.entity_id, a, !0);
      }}
                      />
                      <span class="state">${s}%</span>
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
  renderResultItem(e, t = "play", i = "search") {
    var l, d, p;
    const s = e.artist || ((l = e.artists) == null ? void 0 : l.map((m) => m.name).filter(Boolean).join(", ")) || ((d = e.album) == null ? void 0 : d.name) || e.media_type || e.type || "", r = e.image || e.thumb || ((p = e.album) == null ? void 0 : p.image) || "", a = this.isFavorite(e), n = () => this.playSearchResult(e, "play");
    return u`
      <div class="result clickable" @click=${t === "artist" ? () => this.openArtist(e) : t === "album" ? () => this.openAlbum(e) : t === "playlist" ? () => this.openPlaylist(e) : n}>
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
          ${t === "artist" || t === "album" || t === "playlist" ? h : u`
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
      m.stopPropagation(), this.queueSearchResult(e);
    }}
                >
                  Next
                </button>
              `}
        </span>
      </div>
    `;
  }
  renderQueueItem(e, t = 0, i = !1) {
    var n, c, l;
    const s = e.artist || ((n = e.artists) == null ? void 0 : n.map((d) => d.name).filter(Boolean).join(", ")) || ((c = e.album) == null ? void 0 : c.name) || e.media_type || e.type || "", r = e.image || e.thumb || ((l = e.album) == null ? void 0 : l.image) || "", a = e.name ?? e.uri ?? "Untitled";
    return u`
      <button
        class="queue-item ${i ? "compact" : ""}"
        type="button"
        aria-label=${`Play ${a}`}
        ?disabled=${this.playbackPending}
        @click=${() => this.playQueueItem(e)}
      >
        <span class="queue-position">${t + 1}</span>
        <span class="queue-item-art" style=${r ? `background-image: url("${r}")` : ""}>
          ${r ? h : u`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
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
    var c;
    if (!this.config)
      return u``;
    const e = this.playbackPlayer, t = this.activePlayer, i = this.activeMemory, s = b(t), r = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", a = (e == null ? void 0 : e.attributes.media_title) || (i == null ? void 0 : i.title) || "No music selected", n = (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || (i == null ? void 0 : i.artist) || "Ready";
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
            ${this.renderTopControls(s, e)}
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(a, n, s)}
          <div class="volume-row">
            <button class="icon-button" aria-label="Mute speaker" ?disabled=${s} @click=${this.toggleMute}>
              <ha-icon .icon=${(c = this.isPlaying ? this.playbackPlayer : this.activePlayer) != null && c.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${s}
              aria-label="Speaker volume"
              @input=${(l) => {
      const d = this.updateVolumeLabel(l);
      this.setPlayerVolume(this.volumeEntityId, d);
    }}
              @change=${(l) => this.setVolume(this.updateVolumeLabel(l))}
            />
            <span class="state">${this.volume}%</span>
          </div>
          ${this.playbackError ? u`<div class="error" role="alert">${this.playbackError}</div>` : h}
          ${this.renderTabs()}
          ${this.activeTab === "now" ? this.renderNowPlaying(a, n, s) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.renderSpeakers()}
        </div>
      </ha-card>
    `;
  }
};
ee.properties = {
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
  favoriteItems: { state: !0 }
};
let W = ee;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", W);
const te = class te extends S {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return ye`
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
  setConfig(e) {
    this.config = { ...e };
  }
  updateConfig(e) {
    const t = { ...this.config, ...e };
    Object.keys(t).forEach((i) => {
      const s = i;
      t[s] === "" && delete t[s];
    }), this.config = t, Ye(this, t);
  }
  valueChanged(e) {
    var s;
    const t = e.target, i = e;
    t.configValue && this.updateConfig({
      [t.configValue]: t.checked !== void 0 ? t.checked : ((s = i.detail) == null ? void 0 : s.value) ?? t.value
    });
  }
  renderEntityPicker(e, t, i = !1) {
    return u`
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
    return u`
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
    return u`
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
    return u`
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
    return u`
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
          </div>
        </section>
      </div>
    `;
  }
};
te.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let Y = te;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", Y);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
