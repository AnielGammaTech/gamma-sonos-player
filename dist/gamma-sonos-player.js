/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, Y = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), te = /* @__PURE__ */ new WeakMap();
let he = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Y && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = te.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && te.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (n) => new he(typeof n == "string" ? n : n + "", void 0, Z), ge = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new he(t, n, Z);
}, xe = (n, e) => {
  if (Y) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = O.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, n.appendChild(s);
  }
}, se = Y ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return _e(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $e, defineProperty: we, getOwnPropertyDescriptor: ke, getOwnPropertyNames: Ae, getOwnPropertySymbols: Pe, getPrototypeOf: Se } = Object, v = globalThis, ie = v.trustedTypes, Ee = ie ? ie.emptyScript : "", V = v.reactiveElementPolyfillSupport, M = (n, e) => n, W = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Ee : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, me = (n, e) => !$e(n, e), re = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = re) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && we(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = ke(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const c = i == null ? void 0 : i.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? re;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const e = Se(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const t = this.properties, s = [...Ae(t), ...Pe(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(se(i));
    } else e !== void 0 && t.push(se(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var r;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : W).toAttribute(t, s.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, a;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), o = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : W;
      this._$Em = i;
      const d = o.fromAttribute(t, c.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    var a;
    if (e !== void 0) {
      const c = this.constructor;
      if (i === !1 && (r = this[e]), s ?? (s = c.getPropertyOptions(e)), !((s.hasChanged ?? me)(r, t) || s.useDefault && s.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(c._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: r }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: c } = a, o = this[r];
        c !== !0 || this._$AL.has(r) || o === void 0 || this.C(r, void 0, a, o);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[M("elementProperties")] = /* @__PURE__ */ new Map(), S[M("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: S }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, ae = (n) => n, L = T.trustedTypes, ne = L ? L.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, be = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + y, Ie = `<${fe}>`, A = document, R = () => A.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", J = Array.isArray, qe = (n) => J(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", H = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oe = /-->/g, ce = />/g, _ = RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), le = /'/g, ue = /"/g, ye = /^(?:script|style|textarea|title)$/i, Ce = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), l = Ce(1), I = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), de = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function ve(n, e) {
  if (!J(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ne !== void 0 ? ne.createHTML(e) : e;
}
const Me = (n, e) => {
  const t = n.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = C;
  for (let c = 0; c < t; c++) {
    const o = n[c];
    let d, h, p = -1, g = 0;
    for (; g < o.length && (a.lastIndex = g, h = a.exec(o), h !== null); ) g = a.lastIndex, a === C ? h[1] === "!--" ? a = oe : h[1] !== void 0 ? a = ce : h[2] !== void 0 ? (ye.test(h[2]) && (i = RegExp("</" + h[2], "g")), a = _) : h[3] !== void 0 && (a = _) : a === _ ? h[0] === ">" ? (a = i ?? C, p = -1) : h[1] === void 0 ? p = -2 : (p = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? _ : h[3] === '"' ? ue : le) : a === ue || a === le ? a = _ : a === oe || a === ce ? a = C : (a = _, i = void 0);
    const f = a === _ && n[c + 1].startsWith("/>") ? " " : "";
    r += a === C ? o + Ie : p >= 0 ? (s.push(d), o.slice(0, p) + be + o.slice(p) + y + f) : o + y + (p === -2 ? c : f);
  }
  return [ve(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const c = e.length - 1, o = this.parts, [d, h] = Me(e, t);
    if (this.el = N.createElement(d, s), w.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = w.nextNode()) !== null && o.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(be)) {
          const g = h[a++], f = i.getAttribute(p).split(y), G = /([.?@])?(.*)/.exec(g);
          o.push({ type: 1, index: r, name: G[2], strings: f, ctor: G[1] === "." ? Re : G[1] === "?" ? Ue : G[1] === "@" ? Ne : B }), i.removeAttribute(p);
        } else p.startsWith(y) && (o.push({ type: 6, index: r }), i.removeAttribute(p));
        if (ye.test(i.tagName)) {
          const p = i.textContent.split(y), g = p.length - 1;
          if (g > 0) {
            i.textContent = L ? L.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(p[f], R()), w.nextNode(), o.push({ type: 2, index: ++r });
            i.append(p[g], R());
          }
        }
      } else if (i.nodeType === 8) if (i.data === fe) o.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(y, p + 1)) !== -1; ) o.push({ type: 7, index: r }), p += y.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = A.createElement("template");
    return s.innerHTML = e, s;
  }
}
function q(n, e, t = n, s) {
  var a, c;
  if (e === I) return e;
  let i = s !== void 0 ? (a = t._$Co) == null ? void 0 : a[s] : t._$Cl;
  const r = U(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = q(n, i._$AS(n, e.values), i, s)), e;
}
class Te {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? A).importNode(t, !0);
    w.currentNode = i;
    let r = w.nextNode(), a = 0, c = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new z(r, r.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(r, o.name, o.strings, this, e) : o.type === 6 && (d = new ze(r, this, e)), this._$AV.push(d), o = s[++c];
      }
      a !== (o == null ? void 0 : o.index) && (r = w.nextNode(), a++);
    }
    return w.currentNode = A, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class z {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = q(this, e, t), U(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = N.createElement(ve(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const a = new Te(i, this), c = a.u(this.options);
      a.p(t), this.T(c), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = de.get(e.strings);
    return t === void 0 && de.set(e.strings, t = new N(e)), t;
  }
  k(e) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const r of e) i === t.length ? t.push(s = new z(this.O(R()), this.O(R()), this, this.options)) : s = t[i], s._$AI(r), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = ae(e).nextSibling;
      ae(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, t = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = q(this, e, t, 0), a = !U(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
    else {
      const c = e;
      let o, d;
      for (e = r[0], o = 0; o < r.length - 1; o++) d = q(this, c[s + o], t, o), d === I && (d = this._$AH[o]), a || (a = !U(d) || d !== this._$AH[o]), d === u ? e = u : e !== u && (e += (d ?? "") + r[o + 1]), this._$AH[o] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Re extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Ue extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Ne extends B {
  constructor(e, t, s, i, r) {
    super(e, t, s, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = q(this, e, t, 0) ?? u) === I) return;
    const s = this._$AH, i = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ze {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const Q = T.litHtmlPolyfillSupport;
Q == null || Q(N, z), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.2");
const Ge = (n, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = i = new z(e.insertBefore(R(), r), r, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class E extends S {
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
var pe;
E._$litElement$ = !0, E.finalized = !0, (pe = k.litElementHydrateSupport) == null || pe.call(k, { LitElement: E });
const D = k.litElementPolyfillSupport;
D == null || D({ LitElement: E });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
const m = {
  width: "100%",
  height: "auto",
  fill_container: !0,
  compact: !1,
  enqueue_mode: "next",
  search_limit: 5,
  library_only: !1,
  show_grouping: !0,
  show_search: !0,
  show_queue_hint: !0,
  background: "#101722",
  accent_color: "#39d98a"
}, je = 524288, j = "gamma-sonos-player:last-player";
function $(n, e) {
  if (typeof n == "number" && Number.isFinite(n))
    return n;
  const t = Number(n);
  return Number.isFinite(t) ? t : e;
}
function x(n) {
  return !n || n.state === "unavailable" || n.state === "unknown";
}
function Oe(n) {
  return !!($(n == null ? void 0 : n.attributes.supported_features, 0) & je) || Array.isArray(n == null ? void 0 : n.attributes.group_members);
}
function b(n) {
  const e = String((n == null ? void 0 : n.attributes.app_id) ?? "").toLowerCase(), t = String((n == null ? void 0 : n.attributes.platform) ?? "").toLowerCase(), s = String((n == null ? void 0 : n.attributes.source) ?? "").toLowerCase(), i = Array.isArray(n == null ? void 0 : n.attributes.source_list) ? n.attributes.source_list.join(" ").toLowerCase() : "";
  return (n == null ? void 0 : n.attributes.mass_player_type) === "player" || !!(n != null && n.attributes.active_queue) || e.includes("music_assistant") || t.includes("music_assistant") || s.includes("music assistant") || i.includes("music assistant");
}
function P(n) {
  return n.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Le(n, e) {
  n.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
const X = class X extends E {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "";
  }
  static get styles() {
    return ge`
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
        display: grid;
        gap: clamp(8px, 1.8vw, 12px);
        min-height: var(--gamma-sonos-height);
        overflow: hidden;
        padding: clamp(12px, 2.6vw, 16px);
        position: relative;
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
        padding: 7px;
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
        gap: 10px;
        justify-content: space-between;
      }

      .title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .name {
        font-size: clamp(18px, 3.8vw, 24px);
        font-weight: 750;
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 13px;
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
        align-items: stretch;
        background: transparent;
        border: 0;
        border-radius: 0;
        display: grid;
        gap: 6px;
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
        font-size: 12px;
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
        font-size: 13px;
        font-weight: 750;
        min-height: 26px;
        padding: 0 9px;
      }

      .player-picker {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        display: inline-flex;
        gap: 6px;
        justify-self: start;
        min-width: 0;
        padding: 4px 8px;
      }

      .player-picker select {
        appearance: none;
        background: transparent;
        border: 0;
        color: var(--primary-text-color, #f4f7fb);
        font: inherit;
        font-size: 12px;
        font-weight: 750;
        max-width: 260px;
        min-width: 0;
        outline: 0;
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
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

      .group-chip.anchor {
        background: rgb(255 255 255 / 5%);
        border-color: rgb(255 255 255 / 8%);
        color: var(--secondary-text-color, #b7c0ce);
        opacity: 0.72;
      }

      .group-chip.anchor .group-check {
        background: transparent;
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, rgb(255 255 255 / 10%));
        color: var(--gamma-sonos-accent);
      }

      .group-chip.action {
        align-items: center;
        border-radius: 18px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 14%),
          0 12px 24px rgb(0 0 0 / 16%);
        color: var(--primary-text-color, #f4f7fb);
        gap: 8px;
        min-height: 64px;
        padding: 10px 12px;
      }

      .group-chip.action.continue {
        background:
          radial-gradient(circle at 18% 50%, rgb(138 176 255 / 34%), transparent 28%),
          linear-gradient(135deg, rgb(42 65 108 / 86%), rgb(31 38 58 / 92%));
        border-color: rgb(138 176 255 / 58%);
      }

      .group-chip.action.group {
        background:
          radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--gamma-sonos-accent) 42%, transparent), transparent 28%),
          linear-gradient(135deg, color-mix(in srgb, var(--gamma-sonos-accent) 30%, #15251d), rgb(24 42 32 / 94%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 62%, transparent);
      }

      .group-chip.action.ungroup {
        background:
          radial-gradient(circle at 18% 50%, rgb(255 179 107 / 32%), transparent 28%),
          linear-gradient(135deg, rgb(82 58 39 / 88%), rgb(48 38 33 / 94%));
        border-color: rgb(255 179 107 / 60%);
      }

      .group-chip.action.clear {
        background:
          radial-gradient(circle at 18% 50%, rgb(255 111 111 / 32%), transparent 28%),
          linear-gradient(135deg, rgb(83 40 46 / 88%), rgb(50 34 39 / 94%));
        border-color: rgb(255 139 139 / 60%);
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
        border: 0;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 32%),
          0 8px 16px rgb(0 0 0 / 18%);
        font-size: 18px;
        font-weight: 900;
        height: 34px;
        width: 34px;
      }

      .group-chip.action .group-name {
        font-size: 13px;
        font-weight: 850;
      }

      .group-chip.action .group-status {
        color: rgb(255 255 255 / 68%);
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
        gap: 10px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .group-actions .continue,
      .group-actions .group {
        grid-column: span 1;
      }

      .group-actions .ungroup,
      .group-actions .clear {
        min-height: 54px;
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

      .session-strip {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        min-width: 0;
      }

      .session-chip {
        align-items: center;
        background: rgb(255 255 255 / 4%);
        border: 1px solid rgb(255 255 255 / 7%);
        border-radius: 999px;
        display: inline-flex;
        gap: 6px;
        min-height: 26px;
        min-width: 0;
        padding: 0 9px;
      }

      .session-chip span {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .session-chip strong {
        color: var(--primary-text-color, #f4f7fb);
        font-size: 11px;
        font-weight: 780;
        max-width: 120px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      entities: t.filter((s) => s.startsWith("media_player."))
    };
  }
  static async getConfigElement() {
    return document.createElement("gamma-sonos-player-card-editor");
  }
  setConfig(e) {
    this.config = { ...m, ...e }, this.selectedEntityId = this.config.entity || window.localStorage.getItem(j) || "", this.style.setProperty(
      "--gamma-sonos-width",
      this.config.fill_container ? "100%" : this.config.width ?? m.width
    ), this.style.setProperty("--gamma-sonos-height", this.config.height ?? m.height), this.style.setProperty(
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
    var e;
    return Object.values(((e = this.hass) == null ? void 0 : e.states) ?? {}).filter((t) => !!t).filter((t) => t.entity_id.startsWith("media_player."));
  }
  isDiscoverablePlayer(e) {
    const t = String(e.attributes.platform ?? "").toLowerCase(), s = String(e.attributes.device_class ?? "").toLowerCase(), i = String(e.attributes.icon ?? "").toLowerCase(), r = String(e.attributes.source ?? "").toLowerCase();
    return s === "speaker" || i.includes("speaker") || r.includes("music assistant") || e.attributes.mass_player_type === "player" || t.includes("sonos") || t.includes("music_assistant") || e.entity_id.includes("sonos") || e.entity_id.includes("music_assistant");
  }
  dedupePlayers(e) {
    const t = /* @__PURE__ */ new Set();
    return e.filter((s) => t.has(s.entity_id) ? !1 : (t.add(s.entity_id), !0));
  }
  roomKey(e) {
    return String(e.attributes.friendly_name ?? e.entity_id).trim().toLowerCase().replace(/\s+/g, " ");
  }
  preferredRoomPlayer(e, t) {
    return b(t) && !b(e) || !x(t) && x(e) ? t : e;
  }
  dedupeRoomPlayers(e) {
    const t = /* @__PURE__ */ new Map();
    return e.forEach((s) => {
      const i = this.roomKey(s), r = t.get(i);
      t.set(i, r ? this.preferredRoomPlayer(r, s) : s);
    }), [...t.values()];
  }
  get allPlayers() {
    const e = [
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? []
    ];
    if (e.length > 0) {
      const t = e.map((i) => {
        var r;
        return (r = this.hass) == null ? void 0 : r.states[i];
      }).filter((i) => !!i), s = t.map((i) => this.matchingMusicAssistantPlayer(i)).filter((i) => !!i);
      return this.dedupeRoomPlayers(this.dedupePlayers([...t, ...s]));
    }
    return this.dedupeRoomPlayers(this.mediaPlayers.filter((t) => this.isDiscoverablePlayer(t)));
  }
  get currentlyPlayingPlayer() {
    return this.allPlayers.find((e) => e.state === "playing");
  }
  get activePlayer() {
    var s;
    const e = (s = this.hass) == null ? void 0 : s.states[this.selectedEntityId], t = this.currentlyPlayingPlayer;
    return t && (e == null ? void 0 : e.state) !== "playing" ? t : e ?? t ?? this.allPlayers[0];
  }
  get activeEntityId() {
    var e;
    return ((e = this.activePlayer) == null ? void 0 : e.entity_id) ?? this.selectedEntityId;
  }
  get playbackPlayer() {
    return this.currentlyPlayingPlayer;
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
    var e, t, s;
    return String(
      ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture) || ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture_local) || ((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_image_url) || ""
    );
  }
  get isPlaying() {
    var e;
    return ((e = this.playbackPlayer) == null ? void 0 : e.state) === "playing";
  }
  get volume() {
    const e = this.isPlaying ? this.playbackPlayer : this.activePlayer;
    return Math.round($(e == null ? void 0 : e.attributes.volume_level, 0) * 100);
  }
  get progressPercent() {
    var i, r, a;
    const e = $((i = this.playbackPlayer) == null ? void 0 : i.attributes.media_duration, 0);
    let t = $((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const s = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (e <= 0 || t < 0)
      return 0;
    if (this.isPlaying && s) {
      const c = Date.parse(s);
      Number.isFinite(c) && (t += Math.max(0, (Date.now() - c) / 1e3));
    }
    return Math.max(0, Math.min(100, t / e * 100));
  }
  get groupMembers() {
    var t;
    const e = (t = this.activePlayer) == null ? void 0 : t.attributes.group_members;
    return Array.isArray(e) ? e : [this.activeEntityId].filter(Boolean);
  }
  get groupablePlayers() {
    const e = b(this.activePlayer), t = /* @__PURE__ */ new Set();
    return this.allPlayers.filter((s) => {
      const i = this.matchingMusicAssistantPlayer(s), r = Oe(s) || b(s) || !!i, a = e && i ? i.entity_id : s.entity_id;
      return !r || t.has(a) ? !1 : (t.add(a), !0);
    });
  }
  matchingMusicAssistantPlayer(e) {
    if (!e)
      return;
    if (b(e))
      return e;
    const [, t = ""] = e.entity_id.split("."), s = `media_player.${t}_2`, i = String(e.attributes.friendly_name ?? "").trim().toLowerCase();
    return this.mediaPlayers.find((r) => r.entity_id === s && b(r)) ?? this.mediaPlayers.find((r) => b(r) && String(r.attributes.friendly_name ?? "").trim().toLowerCase() === i);
  }
  resolveGroupPlayers(e, t) {
    const s = [e, ...t], i = s.some((o) => b(o)), r = s.some((o) => !b(o));
    if (!i || !r)
      return { anchor: e, members: t };
    const a = this.matchingMusicAssistantPlayer(e), c = t.map((o) => this.matchingMusicAssistantPlayer(o)).filter((o) => !!o);
    return a ? {
      anchor: a,
      members: c.filter((o) => o.entity_id !== a.entity_id)
    } : {
      anchor: e,
      members: [],
      error: `Use the Music Assistant version of ${e.attributes.friendly_name ?? e.entity_id} as the main speaker for mixed groups.`
    };
  }
  service(e, t, s, i) {
    var r;
    return (r = this.hass) == null ? void 0 : r.callService(e, t, s, i);
  }
  mediaService(e, t = {}, s = this.activeEntityId) {
    var r;
    const i = (r = this.hass) == null ? void 0 : r.states[s];
    !s || x(i) || this.service("media_player", e, t, {
      entity_id: s
    });
  }
  playPause() {
    this.mediaService(
      this.isPlaying ? "media_pause" : "media_play",
      {},
      this.isPlaying ? this.playbackEntityId : this.activeEntityId
    );
  }
  transportService(e) {
    const t = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer;
    this.mediaService(e, {}, (t == null ? void 0 : t.entity_id) ?? this.playbackEntityId);
  }
  setVolume(e) {
    this.setPlayerVolume(this.isPlaying ? this.playbackEntityId : this.activeEntityId, e);
  }
  setPlayerVolume(e, t) {
    e && this.service("media_player", "volume_set", {
      volume_level: Math.max(0, Math.min(1, Number(t) / 100))
    }, {
      entity_id: e
    });
  }
  toggleMute() {
    this.togglePlayerMute(this.activeEntityId);
  }
  togglePlayerMute(e) {
    var s;
    const t = (s = this.hass) == null ? void 0 : s.states[e];
    !t || x(t) || this.service("media_player", "volume_mute", {
      is_volume_muted: !t.attributes.is_volume_muted
    }, {
      entity_id: e
    });
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
    const e = this.activePlayer, t = this.pendingGroupIds.filter((c) => c !== this.activeEntityId).map((c) => {
      var o;
      return (o = this.hass) == null ? void 0 : o.states[c];
    }).filter((c) => c ? this.groupablePlayers.some((o) => o.entity_id === c.entity_id) : !1);
    if (!e || t.length === 0)
      return;
    const s = this.resolveGroupPlayers(e, t);
    if (s.error) {
      this.groupError = s.error;
      return;
    }
    const i = s.members.map((c) => c.entity_id).filter((c, o, d) => c !== s.anchor.entity_id && d.indexOf(c) === o);
    if (i.length === 0) {
      this.groupError = "Those selected speakers cannot be grouped with this main speaker.";
      return;
    }
    this.groupPending = !0;
    const r = this.service("media_player", "join", {
      group_members: i
    }, {
      entity_id: s.anchor.entity_id
    }), a = () => {
      this.selectedEntityId = s.anchor.entity_id, this.selectedGroupIds = [s.anchor.entity_id, ...i], this.pendingGroupIds = [], window.localStorage.setItem(j, s.anchor.entity_id);
    };
    if (r && typeof r.then == "function") {
      r.then(a).catch((c) => {
        this.groupError = c instanceof Error ? c.message : "Grouping failed.";
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
    var a, c;
    this.groupError = "", this.playbackError = "";
    const e = this.selectedGroupIds.map((o) => {
      var d;
      return (d = this.hass) == null ? void 0 : d.states[o];
    }).find((o) => o ? o.entity_id !== this.playbackEntityId : !1), t = this.playbackPlayer, s = ((a = this.matchingMusicAssistantPlayer(t)) == null ? void 0 : a.entity_id) ?? this.playbackEntityId, i = ((c = this.matchingMusicAssistantPlayer(e)) == null ? void 0 : c.entity_id) ?? (e == null ? void 0 : e.entity_id);
    if (!i || !s)
      return;
    const r = this.service("music_assistant", "transfer_queue", {
      source_player: s,
      auto_play: !0
    }, {
      entity_id: i
    });
    r && typeof r.then == "function" && r.catch(() => {
      const o = t, d = String((o == null ? void 0 : o.attributes.media_content_id) ?? ""), h = String((o == null ? void 0 : o.attributes.media_content_type) ?? "music");
      if (!d) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      this.service("music_assistant", "play_media", {
        media_id: d,
        media_type: h,
        enqueue: "play"
      }, {
        entity_id: i
      });
    });
  }
  ungroupActive() {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const e = this.service("media_player", "unjoin", {}, {
      entity_id: this.activeEntityId
    }), t = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    if (e && typeof e.then == "function") {
      e.finally(t);
      return;
    }
    window.setTimeout(t, 700);
  }
  ungroupAll() {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const e = this.groupMembers.map((s) => this.service("media_player", "unjoin", {}, { entity_id: s })).filter((s) => !!(s && typeof s.then == "function")), t = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    if (e.length > 0) {
      Promise.allSettled(e).finally(t);
      return;
    }
    window.setTimeout(t, 700);
  }
  removeFromGroup(e) {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const t = this.service("media_player", "unjoin", {}, { entity_id: e }), s = () => {
      this.selectedGroupIds = this.selectedGroupIds.filter((i) => i !== e), this.pendingGroupIds = this.pendingGroupIds.filter((i) => i !== e), this.groupPending = !1;
    };
    if (t && typeof t.then == "function") {
      t.finally(s);
      return;
    }
    window.setTimeout(s, 700);
  }
  async searchMusicAssistant(e = !1) {
    var s, i, r;
    const t = this.query.trim();
    if (!t || !((s = this.hass) != null && s.callWS)) {
      (i = this.hass) != null && i.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    this.searching = !0, this.searchError = "";
    try {
      const a = {
        name: t,
        limit: $(this.config.search_limit, m.search_limit),
        library_only: !!(this.config.library_only ?? m.library_only)
      };
      this.config.music_assistant_config_entry_id && (a.config_entry_id = this.config.music_assistant_config_entry_id), (r = this.config.search_media_types) != null && r.length && (a.media_type = this.config.search_media_types);
      const c = await this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: a,
        return_response: !0
      });
      this.searchResults = this.extractSearchResults(c), e || (this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0);
    } catch (a) {
      this.searchError = a instanceof Error ? a.message : "Search failed";
    } finally {
      this.searching = !1;
    }
  }
  openArtist(e) {
    this.selectedArtist = e, this.selectedAlbum = void 0, this.browserView = "artist", this.query = e.name ?? this.query, this.searchMusicAssistant(!0);
  }
  openAlbum(e) {
    this.selectedAlbum = e, this.selectedArtist = void 0, this.browserView = "album", this.query = e.name ?? this.query, this.searchMusicAssistant(!0);
  }
  extractSearchResults(e) {
    const s = e.response ?? e, i = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return i.forEach((a) => {
      const c = s[a];
      Array.isArray(c) && c.forEach((o) => {
        typeof o == "object" && o && r.push({
          ...o,
          media_type: a === "tracks" ? "track" : a.slice(0, -1)
        });
      });
    }), r;
  }
  queueTargetEntityId() {
    const e = this.matchingMusicAssistantPlayer(this.activePlayer);
    return e && !x(e) ? e.entity_id : "";
  }
  queueServiceAttempts(e) {
    var s, i;
    const t = String(((i = (s = this.hass) == null ? void 0 : s.states[e]) == null ? void 0 : i.attributes.active_queue) ?? "");
    return [
      {
        domain: "mass_queue",
        service: "get_queue_items",
        data: { entity: e, limit: 40, limit_before: 0, limit_after: 40 }
      },
      {
        domain: "music_assistant",
        service: "get_queue",
        data: { entity_id: e }
      },
      ...t ? [
        {
          domain: "mass_queue",
          service: "get_queue_items",
          data: { entity: e, queue_id: t, limit: 40, limit_before: 0, limit_after: 40 }
        },
        {
          domain: "music_assistant",
          service: "get_queue",
          data: { queue_id: t }
        }
      ] : []
    ];
  }
  async refreshQueue() {
    var t;
    const e = this.queueTargetEntityId();
    if (!e || !((t = this.hass) != null && t.callWS)) {
      this.queueItems = [], this.queueError = e ? "Queue responses are not available in this Home Assistant view." : "Queue is only available for Music Assistant speaker entities.";
      return;
    }
    this.queueLoading = !0, this.queueError = "";
    try {
      const s = [];
      for (const i of this.queueServiceAttempts(e))
        try {
          const r = await this.hass.callWS({
            type: "call_service",
            domain: i.domain,
            service: i.service,
            service_data: i.data,
            return_response: !0
          }), a = this.extractQueueItems(r);
          if (i.domain === "mass_queue" && (s.length = 0), a.length > 0) {
            this.queueItems = a;
            return;
          }
        } catch (r) {
          s.push(r instanceof Error ? r.message : `${i.domain}.${i.service} failed.`);
        }
      this.queueItems = [], this.queueError = s.length > 0 ? s[s.length - 1] : "Queue is empty or unavailable for this Music Assistant player.";
    } finally {
      this.queueLoading = !1;
    }
  }
  extractQueueItems(e) {
    const t = this.responsePayload(e), s = [
      this.valueAtPath(t, ["items"]),
      this.valueAtPath(t, ["queue"]),
      this.valueAtPath(t, ["queue_items"]),
      this.valueAtPath(t, ["next_items"]),
      this.valueAtPath(t, ["upcoming_items"]),
      this.valueAtPath(t, ["response", "items"]),
      this.valueAtPath(t, ["response", "queue"]),
      this.valueAtPath(t, ["response", "queue_items"]),
      this.valueAtPath(t, ["response", "next_items"]),
      this.valueAtPath(t, ["response", "upcoming_items"]),
      t
    ];
    for (const i of s) {
      const r = this.queueItemsFromUnknown(i);
      if (r.length > 0)
        return this.dedupeQueueItems(r);
    }
    return [];
  }
  responsePayload(e) {
    return typeof e == "object" && e && "response" in e ? e.response ?? e : e;
  }
  valueAtPath(e, t) {
    return t.reduce((s, i) => {
      if (!(typeof s != "object" || !s))
        return s[i];
    }, e);
  }
  queueItemsFromUnknown(e) {
    if (Array.isArray(e))
      return e.map((t) => this.normalizeQueueItem(t)).filter((t) => !!t);
    if (typeof e == "object" && e) {
      const t = e, s = ["items", "queue", "queue_items", "next_items", "upcoming_items"];
      for (const i of s) {
        const r = this.queueItemsFromUnknown(t[i]);
        if (r.length > 0)
          return r;
      }
      for (const i of Object.values(t)) {
        const r = this.queueItemsFromUnknown(i);
        if (r.length > 0)
          return r;
      }
    }
    return [];
  }
  normalizeQueueItem(e) {
    if (typeof e != "object" || !e)
      return;
    const t = e, s = (typeof t.media_item == "object" && t.media_item ? t.media_item : void 0) ?? (typeof t.item == "object" && t.item ? t.item : void 0) ?? t, i = typeof s.album == "object" && s.album ? s.album : void 0, r = Array.isArray(s.artists) ? s.artists : void 0, a = String(
      s.name ?? t.name ?? t.title ?? t.media_title ?? ""
    ), c = String(s.uri ?? t.uri ?? t.media_id ?? t.media_content_id ?? ""), o = String(s.media_type ?? t.media_type ?? t.type ?? "track"), d = String(
      s.image ?? t.image ?? t.thumbnail ?? t.entity_picture ?? t.media_image ?? t.local_image_encoded ?? (i == null ? void 0 : i.image) ?? ""
    );
    if (!(!a && !c))
      return {
        name: a || c,
        uri: c || void 0,
        media_type: o,
        type: o,
        artists: r,
        artist: String(s.artist ?? t.artist ?? t.media_artist ?? ""),
        album: i,
        image: d || void 0,
        queue_item_id: String(t.queue_item_id ?? s.queue_item_id ?? "")
      };
  }
  dedupeQueueItems(e) {
    const t = /* @__PURE__ */ new Set();
    return e.filter((s) => {
      const i = `${s.uri ?? ""}:${s.name ?? ""}:${s.artist ?? ""}`;
      return t.has(i) ? !1 : (t.add(i), !0);
    });
  }
  playSearchResult(e, t) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const s = e.uri || e.name;
    if (!s)
      return;
    const i = t ?? this.config.enqueue_mode ?? m.enqueue_mode, r = t === "next" ? "next" : this.isPlaying || i !== "next" ? i : "play", a = this.matchingMusicAssistantPlayer(this.activePlayer) ?? this.activePlayer, c = (a == null ? void 0 : a.entity_id) ?? this.activeEntityId;
    this.playbackPending = !0, window.localStorage.setItem(j, c), this.selectedEntityId = c;
    const o = this.service("music_assistant", "play_media", {
      media_id: s,
      media_type: e.media_type || e.type,
      enqueue: r
    }, {
      entity_id: c
    });
    if (o && typeof o.then == "function") {
      o.catch((d) => {
        if (r === "next") {
          const h = this.service("music_assistant", "play_media", {
            media_id: s,
            media_type: e.media_type || e.type,
            enqueue: "add"
          }, {
            entity_id: c
          });
          return h && typeof h.then == "function" ? h.catch((p) => {
            this.playbackError = p instanceof Error ? p.message : "Music Assistant queue add failed.";
          }) : void 0;
        }
        this.playbackError = d instanceof Error ? d.message : "Music Assistant playback failed.";
      }).finally(() => {
        this.playbackPending = !1, (r === "next" || this.activeTab === "queue") && this.refreshQueue();
      });
      return;
    }
    window.setTimeout(() => {
      this.playbackPending = !1, (r === "next" || this.activeTab === "queue") && this.refreshQueue();
    }, 900);
  }
  playQueueItem(e) {
    const t = e.queue_item_id, s = this.queueTargetEntityId();
    if (!t || !s || this.playbackPending) {
      this.playSearchResult(e, "play");
      return;
    }
    this.playbackPending = !0, this.playbackError = "";
    const i = this.service("mass_queue", "play_queue_item", {
      entity: s,
      queue_item_id: t
    });
    if (i && typeof i.then == "function") {
      i.catch((r) => {
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
    const e = this.allPlayers, t = this.playbackPlayer;
    if (e.length < 2 && !t)
      return u;
    const s = t ? this.groupMembers.map((i) => {
      var r;
      return (r = this.hass) == null ? void 0 : r.states[i];
    }).filter((i) => !!(i && i.state === "playing")) : [];
    return l`
      <div class="rooms">
        ${s.length > 0 ? l`<span class="now-label">Playing in</span>` : u}
        <div class="now-row">
          <div class="now-speakers">
            ${s.map(
      (i) => l`
                <span class="now-chip">
                  ${i.attributes.friendly_name ?? P(i.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
          ${e.length > 1 ? this.renderPlayerPicker(e) : u}
        </div>
      </div>
    `;
  }
  renderPlayerPicker(e) {
    return l`
      <label class="player-picker">
        <ha-icon .icon=${"mdi:speaker"}></ha-icon>
        <select
          .value=${this.activeEntityId}
          @change=${(t) => {
      var a;
      const s = t.target.value, i = (a = this.hass) == null ? void 0 : a.states[s];
      this.selectedEntityId = s, window.localStorage.setItem(j, s);
      const r = i == null ? void 0 : i.attributes.group_members;
      this.selectedGroupIds = Array.isArray(r) ? [...r] : [s], this.pendingGroupIds = [], this.queueItems = [], this.queueError = "", this.activeTab === "queue" && this.refreshQueue();
    }}
        >
          ${e.map(
      (t) => l`
              <option
                .value=${t.entity_id}
                ?selected=${t.entity_id === this.activeEntityId}
              >
                ${t.attributes.friendly_name ?? P(t.entity_id.split(".")[1])}
              </option>
            `
    )}
        </select>
      </label>
    `;
  }
  renderSessionStrip() {
    var i, r, a;
    const e = String(
      ((i = this.activePlayer) == null ? void 0 : i.attributes.source) || ((r = this.activePlayer) == null ? void 0 : r.attributes.app_id) || ((a = this.activePlayer) == null ? void 0 : a.attributes.active_queue) || "Ready"
    ), t = Math.max(1, this.groupMembers.length), s = this.queueItems.length > 0 ? `${this.queueItems.length} items` : "Open queue";
    return l`
      <div class="session-strip">
        <div class="session-chip">
          <span>Source</span>
          <strong>${e}</strong>
        </div>
        <div class="session-chip">
          <span>Group</span>
          <strong>${t > 1 ? `${t} rooms` : "Solo"}</strong>
        </div>
        <div class="session-chip">
          <span>Queue</span>
          <strong>${s}</strong>
        </div>
      </div>
    `;
  }
  renderMiniPlayer(e, t, s) {
    return l`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork"></div>
        <div class="mini-meta">
          <span class="track">${e}</span>
          <span class="artist">${t}</span>
        </div>
        <div class="mini-controls">
          <button
            class="icon-button"
            ?disabled=${s}
            @click=${() => this.transportService("media_previous_track")}
          >
            <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
          </button>
          <button class="play-button" ?disabled=${s} @click=${this.playPause}>
            <ha-icon .icon=${this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${s}
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
      return u;
    const t = e.some((r) => r.entity_id === this.activeEntityId) || !!this.matchingMusicAssistantPlayer(this.activePlayer), s = this.pendingGroupIds.filter((r) => {
      var c;
      const a = (c = this.hass) == null ? void 0 : c.states[r];
      return r !== this.activeEntityId && e.some((o) => o.entity_id === (a == null ? void 0 : a.entity_id));
    }).length, i = this.selectedGroupIds.filter(
      (r) => r !== this.playbackEntityId
    ).length;
    return l`
      <section class="grouping">
        <span class="section-title">Select Speakers To Group With ${this.activeName}</span>
        ${this.groupError ? l`<div class="error">${this.groupError}</div>` : u}
        <div class="group-row">
          ${e.map((r) => {
      const a = this.selectedGroupIds.includes(r.entity_id) || this.groupMembers.includes(r.entity_id), c = this.pendingGroupIds.includes(r.entity_id), o = a || c, d = r.entity_id === this.activeEntityId;
      return l`
	              <button
	                class="group-chip ${o ? "active" : ""} ${d ? "anchor" : ""}"
	                ?disabled=${d || this.groupPending}
                @click=${() => this.toggleGroupSelection(r.entity_id)}
              >
                <span class="group-check">${o ? "✓" : ""}</span>
                <span class="group-name">
                  ${r.attributes.friendly_name ?? P(r.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${d ? "Selected room" : a ? "In group" : c ? "Selected" : "Tap to select"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action continue"
            ?disabled=${this.groupPending || i !== 1}
            @click=${this.continueInSelectedRoom}
          >
            <span class="group-check">▶</span>
            <span class="group-name">Continue Here</span>
            <span class="group-status">Move current queue</span>
          </button>
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !t || s === 0}
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">
              ${t ? `Group ${s} Speakers` : "Selected Speaker Cannot Group"}
            </span>
            <span class="group-status">
              ${t ? "Apply selection" : "Pick a group-capable main speaker"}
            </span>
          </button>
          <button class="group-chip action ungroup" ?disabled=${this.groupPending} @click=${this.ungroupActive}>
            <span class="group-check">×</span>
            <span class="group-name">Ungroup Current</span>
            <span class="group-status">Break group</span>
          </button>
          <button class="group-chip action clear" ?disabled=${this.groupPending} @click=${this.ungroupAll}>
            <span class="group-check">×</span>
            <span class="group-name">Ungroup All</span>
            <span class="group-status">Remove all rooms</span>
          </button>
        </div>
      </section>
    `;
  }
  renderCurrentGroup() {
    const e = this.groupMembers.map((t) => {
      var s;
      return (s = this.hass) == null ? void 0 : s.states[t];
    }).filter((t) => !!t);
    return e.length <= 1 ? u : l`
      <section class="current-group">
        <button
          class="section-toggle"
          @click=${() => {
      this.showCurrentGroup = !this.showCurrentGroup;
    }}
        >
          <span>Current Group (${e.length})</span>
          <ha-icon .icon=${this.showCurrentGroup ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.showCurrentGroup ? e.map(
      (t) => l`
                <div class="current-member">
                  <span class="speaker-name">
                    ${t.attributes.friendly_name ?? P(t.entity_id.split(".")[1])}
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
    ) : u}
      </section>
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
  renderNowPlaying(e, t, s) {
    const i = this.artworkUrl;
    return l`
      <section class="now-view">
        <div class="now-artwork ${i ? "has-art" : ""}" aria-label="Current album artwork">
          ${i ? l`<img src=${i} alt="" loading="eager" decoding="async" />` : l`<span class="artwork-empty">No artwork</span>`}
        </div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(Math.round(this.progressPercent))}>
          <div class="progress-fill" style=${`width: ${this.progressPercent}%`}></div>
        </div>
        <div class="metadata">
          <span class="track">${e}</span>
          <span class="artist">${t}</span>
        </div>
        <div class="controls">
          <button
            class="icon-button"
            ?disabled=${s}
            @click=${() => this.transportService("media_previous_track")}
          >
            <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
          </button>
          <button class="play-button" ?disabled=${s} @click=${this.playPause}>
            <ha-icon .icon=${this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${s}
            @click=${() => this.transportService("media_next_track")}
          >
            <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
          </button>
        </div>
      </section>
    `;
  }
  renderQueue() {
    return l`
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
        ${this.queueLoading ? l`<div class="hint">Loading queue...</div>` : u}
        ${this.queueError ? l`<div class="error">${this.queueError}</div>` : u}
        ${!this.queueLoading && this.queueItems.length === 0 && !this.queueError ? l`<div class="hint">Queue is empty or unavailable for this speaker.</div>` : u}
        ${this.queueItems.length > 0 ? l`
              <div class="queue-list">
                ${this.queueItems.map((e) => this.renderQueueItem(e))}
              </div>
            ` : u}
      </section>
    `;
  }
  renderSearch() {
    return this.config.show_search ? l`
      <section class="search">
        <span class="section-title">Music Assistant Search</span>
        <div class="search-row">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Search songs, albums, artists, playlists"
            @input=${(e) => {
      this.query = e.target.value;
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
        ${this.searchError ? l`<div class="error">${this.searchError}</div>` : u}
        ${this.playbackError ? l`<div class="error">${this.playbackError}</div>` : u}
        ${this.searching ? l`<div class="hint">Searching...</div>` : u}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.renderResults() : u}
        ${this.config.show_queue_hint ? l`<div class="hint">Tap a result to add it next with Music Assistant.</div>` : u}
      </section>
    ` : u;
  }
  itemsByType(e) {
    return this.searchResults.filter((t) => (t.media_type || t.type) === e);
  }
  renderResultSection(e, t, s = "play") {
    return t.length === 0 ? u : l`
      <section class="result-section">
        <span class="section-header">${e}</span>
        ${t.slice(0, $(this.config.search_limit, m.search_limit)).map((i) => this.renderResultItem(i, s))}
      </section>
    `;
  }
  renderArtistView() {
    const e = this.selectedArtist, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", s = (e == null ? void 0 : e.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${t ? `background-image: url("${t}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${s}</span>
            <span class="result-sub">Artist</span>
          </div>
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedArtist = void 0;
    }}>
            Back
          </button>
        </div>
        ${this.renderResultSection("Songs", this.itemsByType("track"))}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album")}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"))}
      </div>
    `;
  }
  renderAlbumView() {
    const e = this.selectedAlbum, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", s = (e == null ? void 0 : e.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${t ? `background-image: url("${t}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${s}</span>
            <span class="result-sub">Album</span>
          </div>
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedAlbum = void 0;
    }}>
            Back
          </button>
        </div>
        ${this.renderResultSection("Songs", this.itemsByType("track"))}
      </div>
    `;
  }
  renderSpeakers() {
    return l`
      <section class="speakers">
        ${this.renderCurrentGroup()}
        ${this.renderGrouping()}
        <button
          class="section-toggle"
          @click=${() => {
      this.showVolumeMixer = !this.showVolumeMixer;
    }}
        >
          <span>Speaker Volume</span>
          <ha-icon .icon=${this.showVolumeMixer ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.showVolumeMixer ? l`
              <div class="speaker-list">
                ${this.allPlayers.map((e) => {
      const t = x(e), s = Math.round($(e.attributes.volume_level, 0) * 100);
      return l`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${e.attributes.friendly_name ?? P(e.entity_id.split(".")[1])}
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
                        @change=${(i) => this.setPlayerVolume(
        e.entity_id,
        i.target.value
      )}
                      />
                      <span class="state">${s}%</span>
                    </div>
                  `;
    })}
              </div>
            ` : u}
      </section>
    `;
  }
  renderResults() {
    return l`
      <div class="results">
        ${this.renderResultSection("Artists", this.itemsByType("artist"), "artist")}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album")}
        ${this.renderResultSection("Songs", this.itemsByType("track"))}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"))}
        ${this.renderResultSection("Radio", this.itemsByType("radio"))}
        ${this.renderResultSection("Podcasts", this.itemsByType("podcast"))}
      </div>
    `;
  }
  renderResultItem(e, t = "play") {
    var r, a, c;
    const s = e.artist || ((r = e.artists) == null ? void 0 : r.map((o) => o.name).filter(Boolean).join(", ")) || ((a = e.album) == null ? void 0 : a.name) || e.media_type || e.type || "", i = e.image || e.thumb || ((c = e.album) == null ? void 0 : c.image) || "";
    return l`
            <div
              class="result ${t === "artist" || t === "album" ? "clickable" : ""}"
              @click=${t === "artist" ? () => this.openArtist(e) : t === "album" ? () => this.openAlbum(e) : () => this.playSearchResult(e, "play")}
            >
              <div
                class="result-art"
                style=${i ? `background-image: url("${i}")` : ""}
              ></div>
              <div class="result-main">
                <span class="result-name">${e.name ?? e.uri ?? "Untitled"}</span>
                <span class="result-sub">${s}</span>
              </div>
              ${t === "artist" || t === "album" ? u : l`
                    <span class="result-actions">
                      <button
                        class="now"
                        ?disabled=${this.playbackPending}
                        @click=${(o) => {
      o.stopPropagation(), this.playSearchResult(e, "play");
    }}
                      >
                        Now
                      </button>
                      <button
                        ?disabled=${this.playbackPending}
                        @click=${(o) => {
      o.stopPropagation(), this.playSearchResult(e, "next");
    }}
                      >
                        Next
                      </button>
                    </span>
                  `}
            </div>
          `;
  }
  renderQueueItem(e) {
    var i, r, a;
    const t = e.artist || ((i = e.artists) == null ? void 0 : i.map((c) => c.name).filter(Boolean).join(", ")) || ((r = e.album) == null ? void 0 : r.name) || e.media_type || e.type || "", s = e.image || e.thumb || ((a = e.album) == null ? void 0 : a.image) || "";
    return l`
      <div class="result clickable" @click=${() => this.playQueueItem(e)}>
        <div
          class="result-art"
          style=${s ? `background-image: url("${s}")` : ""}
        ></div>
        <div class="result-main">
          <span class="result-name">${e.name ?? e.uri ?? "Untitled"}</span>
          <span class="result-sub">${t}</span>
        </div>
        ${e.uri ? l`
              <span class="result-actions">
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(c) => {
      c.stopPropagation(), this.playQueueItem(e);
    }}
                >
                  Play
                </button>
              </span>
            ` : u}
      </div>
    `;
  }
  render() {
    var c;
    if (!this.config)
      return l``;
    const e = this.playbackPlayer, t = this.activePlayer, s = x(t), i = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", r = (e == null ? void 0 : e.attributes.media_title) || "No music selected", a = (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || "Ready";
    return l`
      <ha-card>
        <div
          class="player ${this.config.compact ? "compact" : ""} ${this.isPlaying ? "playing" : ""} ${this.activeTab === "now" ? "now-active" : ""}"
          style="
            --gamma-sonos-cover: ${i};
            --gamma-sonos-artwork: ${i};
          "
        >
          <div class="topbar">
            <div class="title">
              <span class="name">${this.config.name || this.activeName || "Sonos"}</span>
              <span class="state">${s ? "Unavailable" : P((e == null ? void 0 : e.state) ?? "idle")}</span>
            </div>
          </div>
          ${this.renderRooms()}
          ${this.renderSessionStrip()}
          ${this.renderMiniPlayer(r, a, s)}
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
              @change=${(o) => this.setVolume(o.target.value)}
            />
            <span class="state">${this.volume}%</span>
          </div>
	          ${this.renderTabs()}
	          ${this.activeTab === "now" ? this.renderNowPlaying(r, a, s) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.renderSpeakers()}
        </div>
      </ha-card>
    `;
  }
};
X.properties = {
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
  showVolumeMixer: { state: !0 },
  showCurrentGroup: { state: !0 },
  groupError: { state: !0 },
  queueItems: { state: !0 },
  queueLoading: { state: !0 },
  queueError: { state: !0 }
};
let F = X;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", F);
const ee = class ee extends E {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return ge`
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
    Object.keys(t).forEach((s) => {
      const i = s;
      t[i] === "" && delete t[i];
    }), this.config = t, Le(this, t);
  }
  valueChanged(e) {
    var i;
    const t = e.target, s = e;
    t.configValue && this.updateConfig({
      [t.configValue]: t.checked !== void 0 ? t.checked : ((i = s.detail) == null ? void 0 : i.value) ?? t.value
    });
  }
  renderEntityPicker(e, t, s = !1) {
    return l`
      <ha-selector
        .hass=${this.hass}
        .label=${e}
        .selector=${{ entity: { domain: "media_player", multiple: s } }}
        .value=${this.config[t] ?? (s ? [] : "")}
        .configValue=${t}
        @value-changed=${this.valueChanged}
      ></ha-selector>
    `;
  }
  renderTextInput(e, t, s = "") {
    return l`
      <ha-textfield
        .label=${e}
        .placeholder=${s}
        .value=${this.config[t] ?? ""}
        .configValue=${t}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderNumberInput(e, t, s = "") {
    return l`
      <ha-textfield
        type="number"
        .label=${e}
        .placeholder=${s}
        .value=${this.config[t] ?? ""}
        .configValue=${t}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderSwitch(e, t, s) {
    return l`
      <label class="switch-row">
        <ha-switch
          .checked=${!!(this.config[t] ?? s)}
          .configValue=${t}
          @change=${this.valueChanged}
        ></ha-switch>
        <span>${e}</span>
      </label>
    `;
  }
  renderSelect(e, t, s, i) {
    return l`
      <ha-select
        .label=${e}
        .value=${this.config[t] ?? i}
        .configValue=${t}
        @selected=${this.valueChanged}
        @closed=${(r) => r.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        ${s.map(
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
          ${this.renderEntityPicker("Players", "entities", !0)}
          <div class="grid">
            ${this.renderTextInput("Name", "name", "Music")}
            ${this.renderTextInput(
      "Music Assistant Config Entry ID",
      "music_assistant_config_entry_id",
      "01KQ..."
    )}
            ${this.renderSelect("Enqueue Mode", "enqueue_mode", ["next", "play", "replace", "replace_next", "add"], "next")}
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
ee.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let K = ee;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", K);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
