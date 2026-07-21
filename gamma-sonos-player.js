/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, et = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Mt = (o) => new _t(typeof o == "string" ? o : o + "", void 0, st), $t = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new _t(e, o, st);
}, Ct = (o, t) => {
  if (et) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = G.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, ct = et ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Mt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: Lt, getOwnPropertyDescriptor: Nt, getOwnPropertyNames: jt, getOwnPropertySymbols: Ut, getPrototypeOf: Ot } = Object, $ = globalThis, lt = $.trustedTypes, Vt = lt ? lt.emptyScript : "", H = $.reactiveElementPolyfillSupport, L = (o, t) => o, J = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Vt : null;
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
} }, kt = (o, t) => !zt(o, t), ut = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Lt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Nt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const n = i == null ? void 0 : i.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = Ot(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, s = [...jt(e), ...Ut(e)];
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
      for (const i of s) e.unshift(ct(i));
    } else t !== void 0 && e.push(ct(t));
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
    return Ct(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : J).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : J;
      this._$Em = i;
      const d = c.fromAttribute(e, n.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var a;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? kt)(r, e) || s.useDefault && s.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: n } = a, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[L("elementProperties")] = /* @__PURE__ */ new Map(), q[L("finalized")] = /* @__PURE__ */ new Map(), H == null || H({ ReactiveElement: q }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, dt = (o) => o, Q = N.trustedTypes, ht = Q ? Q.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Pt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + _, Bt = `<${At}>`, E = document, U = () => E.createComment(""), O = (o) => o === null || typeof o != "object" && typeof o != "function", it = Array.isArray, Gt = (o) => it(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, mt = />/g, P = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, bt = /"/g, St = /^(?:script|style|textarea|title)$/i, Qt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), l = Qt(1), R = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function Et(o, t) {
  if (!it(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Ft = (o, t) => {
  const e = o.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = C;
  for (let n = 0; n < e; n++) {
    const c = o[n];
    let d, p, u = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, p = a.exec(c), p !== null); ) m = a.lastIndex, a === C ? p[1] === "!--" ? a = pt : p[1] !== void 0 ? a = mt : p[2] !== void 0 ? (St.test(p[2]) && (i = RegExp("</" + p[2], "g")), a = P) : p[3] !== void 0 && (a = P) : a === P ? p[0] === ">" ? (a = i ?? C, u = -1) : p[1] === void 0 ? u = -2 : (u = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? P : p[3] === '"' ? bt : gt) : a === bt || a === gt ? a = P : a === pt || a === mt ? a = C : (a = P, i = void 0);
    const g = a === P && o[n + 1].startsWith("/>") ? " " : "";
    r += a === C ? c + Bt : u >= 0 ? (s.push(d), c.slice(0, u) + Pt + c.slice(u) + _ + g) : c + _ + (u === -2 ? n : g);
  }
  return [Et(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class V {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const n = t.length - 1, c = this.parts, [d, p] = Ft(t, e);
    if (this.el = V.createElement(d, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = A.nextNode()) !== null && c.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Pt)) {
          const m = p[a++], g = i.getAttribute(u).split(_), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: r, name: f[2], strings: g, ctor: f[1] === "." ? Dt : f[1] === "?" ? Kt : f[1] === "@" ? Wt : F }), i.removeAttribute(u);
        } else u.startsWith(_) && (c.push({ type: 6, index: r }), i.removeAttribute(u));
        if (St.test(i.tagName)) {
          const u = i.textContent.split(_), m = u.length - 1;
          if (m > 0) {
            i.textContent = Q ? Q.emptyScript : "";
            for (let g = 0; g < m; g++) i.append(u[g], U()), A.nextNode(), c.push({ type: 2, index: ++r });
            i.append(u[m], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === At) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(_, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
}
function M(o, t, e = o, s) {
  var a, n;
  if (t === R) return t;
  let i = s !== void 0 ? (a = e._$Co) == null ? void 0 : a[s] : e._$Cl;
  const r = O(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = M(o, i._$AS(o, t.values), i, s)), t;
}
class Ht {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    A.currentNode = i;
    let r = A.nextNode(), a = 0, n = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let d;
        c.type === 2 ? d = new B(r, r.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (d = new Yt(r, this, t)), this._$AV.push(d), c = s[++n];
      }
      a !== (c == null ? void 0 : c.index) && (r = A.nextNode(), a++);
    }
    return A.currentNode = E, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class B {
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
    t = M(this, t, e), O(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = V.createElement(Et(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const a = new Ht(i, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new B(this.O(U()), this.O(U()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = dt(t).nextSibling;
      dt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = M(this, t, e, 0), a = !O(t) || t !== this._$AH && t !== R, a && (this._$AH = t);
    else {
      const n = t;
      let c, d;
      for (t = r[0], c = 0; c < r.length - 1; c++) d = M(this, n[s + c], e, c), d === R && (d = this._$AH[c]), a || (a = !O(d) || d !== this._$AH[c]), d === h ? t = h : t !== h && (t += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Kt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Wt extends F {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? h) === R) return;
    const s = this._$AH, i = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const K = N.litHtmlPolyfillSupport;
K == null || K(V, B), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Jt = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new B(t.insertBefore(U(), r), r, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
class I extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
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
var wt;
I._$litElement$ = !0, I.finalized = !0, (wt = S.litElementHydrateSupport) == null || wt.call(S, { LitElement: I });
const W = S.litElementPolyfillSupport;
W == null || W({ LitElement: I });
(S.litElementVersions ?? (S.litElementVersions = [])).push("4.2.2");
const v = {
  width: "100%",
  height: "auto",
  fill_container: !0,
  compact: !1,
  enqueue_mode: "play",
  search_limit: 5,
  library_only: !1,
  show_grouping: !0,
  show_search: !0,
  show_party: !0,
  show_queue_hint: !0,
  background: "#101722",
  accent_color: "#39d98a"
}, Zt = 524288, z = "gamma-sonos-player:last-player", ft = "gamma-sonos-player:playback-memory", vt = "gamma-sonos-player:favorites", Xt = 1e4, Y = 12e3, te = 2 * 6e4, ee = 5 * 6e4, se = 30, ie = 15e3, Tt = "rest_command.party_screen_start", qt = "rest_command.party_screen_stop", It = "https://music.anieflix.com/#/party", Z = "Lanai AppleTV";
function x(o, t) {
  if (typeof o == "number" && Number.isFinite(o))
    return o;
  const e = Number(o);
  return Number.isFinite(e) ? e : t;
}
function b(o) {
  return !o || o.state === "unavailable" || o.state === "unknown";
}
function re(o) {
  return !!(x(o == null ? void 0 : o.attributes.supported_features, 0) & Zt) || Array.isArray(o == null ? void 0 : o.attributes.group_members);
}
function y(o) {
  const t = String((o == null ? void 0 : o.attributes.app_id) ?? "").toLowerCase(), e = String((o == null ? void 0 : o.attributes.platform) ?? "").toLowerCase(), s = String((o == null ? void 0 : o.attributes.source) ?? "").toLowerCase(), i = Array.isArray(o == null ? void 0 : o.attributes.source_list) ? o.attributes.source_list.join(" ").toLowerCase() : "";
  return (o == null ? void 0 : o.attributes.mass_player_type) === "player" || !!(o != null && o.attributes.active_queue) || t.includes("music_assistant") || e.includes("music_assistant") || s.includes("music assistant") || i.includes("music assistant");
}
function xt(o) {
  return !y(o) && Array.isArray(o == null ? void 0 : o.attributes.group_members);
}
function w(o) {
  return o.replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function j(o) {
  return o.trim().toLowerCase().replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b(ma|mass)\b/g, "").replace(/\b(sonos|music assistant|speaker|player)\b/g, "").replace(/\s+/g, " ").trim();
}
function ae(o, t) {
  o.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    })
  );
}
const rt = class rt extends I {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.playbackStatus = "", this.playbackSlow = !1, this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.albumTracks = [], this.albumLoading = !1, this.albumError = "", this.playlistTracks = [], this.playlistLoading = !1, this.playlistError = "", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "", this.playbackMemory = {}, this.transportPending = !1, this.favoriteItems = [], this.transferTargetEntityId = "", this.partyPending = !1, this.partyStatus = "", this.partyError = "", this.initialTabResolved = !1, this.searchRequestId = 0, this.albumRequestId = 0, this.playlistRequestId = 0, this.lastInitialQueueEntityId = "", this.lastQueueSignature = "", this.queueRequestId = 0, this.cachedMediaPlayers = [], this.cachedAllPlayers = [], this.cachedPlayerConfigKey = "", this.searchCache = /* @__PURE__ */ new Map(), this.browseCache = /* @__PURE__ */ new Map(), this.volumeOverrides = /* @__PURE__ */ new Map(), this.volumeCommitTimers = /* @__PURE__ */ new Map(), this.volumeResetTimers = /* @__PURE__ */ new Map();
  }
  static get styles() {
    return $t`
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
        grid-template-columns: minmax(0, 1fr) auto;
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

      .room-picker {
        display: flex;
        gap: 7px;
        min-width: 0;
        overflow-x: auto;
        padding: 2px 1px 5px;
        scrollbar-width: none;
      }

      .room-picker::-webkit-scrollbar {
        display: none;
      }

      .header-picker {
        width: 100%;
      }

      .room-option {
        align-items: center;
        appearance: none;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 13px;
        color: var(--primary-text-color, #f4f7fb);
        cursor: pointer;
        display: inline-grid;
        flex: 0 0 auto;
        font: inherit;
        gap: 7px;
        grid-template-columns: 9px minmax(0, 1fr);
        min-height: 44px;
        min-width: 112px;
        padding: 6px 10px;
        text-align: left;
      }

      .room-option.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 17%, rgb(255 255 255 / 5%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 42%, transparent);
      }

      .room-status-dot {
        background: #79dc9c;
        border-radius: 999px;
        box-shadow: 0 0 8px rgb(121 220 156 / 48%);
        height: 8px;
        width: 8px;
      }

      .room-option.active .room-status-dot {
        background: var(--gamma-sonos-accent);
      }

      .room-option.offline .room-status-dot {
        background: #7f8793;
        box-shadow: none;
      }

      .room-option-copy {
        display: grid;
        gap: 1px;
        min-width: 0;
      }

      .room-option-name {
        font-size: 12px;
        font-weight: 800;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .room-option-status {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 9px;
        font-weight: 750;
        text-transform: uppercase;
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
        grid-template-columns: repeat(auto-fit, minmax(62px, 1fr));
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
        max-height: min(58vh, 590px);
        min-height: 0;
        overflow-x: hidden;
        overflow-y: auto;
        padding-right: 2px;
        scrollbar-width: thin;
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
        display: grid;
        gap: 7px;
      }

      .transfer-row {
        align-items: center;
        display: grid;
        gap: 8px;
        grid-template-columns: minmax(0, 1fr) auto;
      }

      .transfer-row select {
        appearance: none;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 11px;
        color: var(--primary-text-color, #f4f7fb);
        font: inherit;
        font-size: 12px;
        min-height: 38px;
        min-width: 0;
        padding: 0 10px;
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

        .room-option {
          min-width: 100px;
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
  static getStubConfig(t, e) {
    return {
      entities: e.filter((s) => s.startsWith("media_player."))
    };
  }
  static async getConfigElement() {
    return document.createElement("gamma-sonos-player-card-editor");
  }
  setConfig(t) {
    this.config = { ...v, ...t }, this.selectedEntityId = this.config.entity || this.readStorage(z) || "", this.cachedPlayerConfigKey = "", this.playbackMemory = this.readPlaybackMemory(), this.favoriteItems = this.readFavoriteItems(), this.style.setProperty(
      "--gamma-sonos-width",
      this.config.fill_container ? "100%" : this.config.width ?? v.width
    ), this.style.setProperty("--gamma-sonos-height", this.config.height ?? v.height), this.style.setProperty(
      "--gamma-sonos-background",
      this.config.background ?? v.background
    ), this.style.setProperty(
      "--gamma-sonos-accent",
      this.config.accent_color ?? v.accent_color
    );
  }
  updated() {
    this.config && (this.reconcileVolumeOverrides(), this.rememberPlaybackState(), this.scheduleInitialQueueRefresh(), this.scheduleQueueRefreshForPlayback(), this.syncProgressTimer(), this.initialTabResolved || (this.initialTabResolved = !0, !this.isPlaying && this.config.show_search && (this.activeTab = "search", window.setTimeout(() => {
      var t, e;
      (e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("input[type='search']")) == null || e.focus();
    }, 0))), this.isPlaying && (this.playbackStatus || this.playbackSlow) && (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.searchTimer), window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), window.clearTimeout(this.playbackFeedbackTimer), window.clearInterval(this.progressTimer), window.cancelAnimationFrame(this.volumeRenderFrame ?? 0), this.progressTimer = void 0, this.volumeRenderFrame = void 0, this.searchRequestId += 1, this.albumRequestId += 1, this.playlistRequestId += 1, this.queueRequestId += 1, this.volumeCommitTimers.forEach((t) => window.clearTimeout(t)), this.volumeResetTimers.forEach((t) => window.clearTimeout(t)), this.volumeCommitTimers.clear(), this.volumeResetTimers.clear();
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
    const t = (e = this.hass) == null ? void 0 : e.states;
    return t !== this.cachedStates && (this.cachedStates = t, this.cachedMediaPlayers = Object.values(t ?? {}).filter((s) => !!s).filter((s) => s.entity_id.startsWith("media_player.")), this.cachedAllPlayers = [], this.cachedPlayerConfigKey = ""), this.cachedMediaPlayers;
  }
  isDiscoverablePlayer(t) {
    const e = String(t.attributes.platform ?? "").toLowerCase(), s = String(t.attributes.device_class ?? "").toLowerCase(), i = String(t.attributes.icon ?? "").toLowerCase(), r = String(t.attributes.source ?? "").toLowerCase();
    return s === "speaker" || i.includes("speaker") || r.includes("music assistant") || t.attributes.mass_player_type === "player" || e.includes("sonos") || e.includes("music_assistant") || t.entity_id.includes("sonos") || t.entity_id.includes("music_assistant");
  }
  dedupePlayers(t) {
    const e = /* @__PURE__ */ new Set();
    return t.filter((s) => e.has(s.entity_id) ? !1 : (e.add(s.entity_id), !0));
  }
  roomKey(t) {
    return this.normalizedRoomName(String(t.attributes.friendly_name ?? t.entity_id));
  }
  normalizedRoomName(t) {
    return j(t);
  }
  preferredRoomPlayer(t, e) {
    return t.entity_id === this.selectedEntityId || e.entity_id === this.selectedEntityId ? e.entity_id === this.selectedEntityId ? e : t : b(t) !== b(e) ? b(t) ? e : t : y(e) && !y(t) ? e : t;
  }
  dedupeRoomPlayers(t) {
    const e = /* @__PURE__ */ new Map();
    return t.forEach((s) => {
      const i = this.roomKey(s), r = e.get(i);
      e.set(i, r ? this.preferredRoomPlayer(r, s) : s);
    }), [...e.values()];
  }
  get allPlayers() {
    var i;
    const t = (i = this.config.entities) != null && i.length ? this.config.entities : this.config.music_assistant_entities ?? [], e = [
      this.selectedEntityId,
      t.join("\0"),
      (this.config.music_assistant_entities ?? []).join("\0")
    ].join("");
    if (this.mediaPlayers, this.cachedAllPlayers.length > 0 && this.cachedPlayerConfigKey === e)
      return this.cachedAllPlayers;
    let s;
    if (t.length > 0) {
      const r = t.map((a) => {
        var n;
        return (n = this.hass) == null ? void 0 : n.states[a];
      }).filter((a) => !!a);
      s = this.dedupePlayers(r.map((a) => this.matchingMusicAssistantPlayer(a) ?? a));
    } else
      s = this.dedupeRoomPlayers(this.cachedMediaPlayers.filter((r) => this.isDiscoverablePlayer(r)));
    return this.cachedPlayerConfigKey = e, this.cachedAllPlayers = s, s;
  }
  get currentlyPlayingPlayer() {
    return this.allPlayers.find((t) => t.state === "playing");
  }
  get currentlyPlayingPlayers() {
    return this.dedupeRoomPlayers(this.allPlayers.filter((t) => t.state === "playing"));
  }
  get activePlayer() {
    return this.allPlayers.find((e) => e.entity_id === this.selectedEntityId) ?? this.currentlyPlayingPlayer ?? this.allPlayers[0];
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
    var t, e, s, i, r, a, n, c;
    return String(
      ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture) || ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture_local) || ((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_image_url) || ((i = this.optimisticPlaybackItem) == null ? void 0 : i.image) || ((r = this.optimisticPlaybackItem) == null ? void 0 : r.thumb) || ((n = (a = this.optimisticPlaybackItem) == null ? void 0 : a.album) == null ? void 0 : n.image) || ((c = this.activeMemory) == null ? void 0 : c.artwork) || ""
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
    var i;
    const t = this.volumeEntityId, e = (i = this.hass) == null ? void 0 : i.states[t], s = Math.round(x(e == null ? void 0 : e.attributes.volume_level, 0) * 100);
    return this.volumeOverrides.get(t) ?? s;
  }
  get volumeEntityId() {
    return this.isPlaying ? this.playbackEntityId : this.activeEntityId;
  }
  get progressPercent() {
    var i, r, a;
    const t = x((i = this.playbackPlayer) == null ? void 0 : i.attributes.media_duration, 0);
    let e = x((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const s = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (t <= 0 || e < 0)
      return 0;
    if (this.isPlaying && s) {
      const n = Date.parse(s);
      Number.isFinite(n) && (e += Math.max(0, (Date.now() - n) / 1e3));
    }
    return Math.max(0, Math.min(100, e / t * 100));
  }
  get hasProgress() {
    var t;
    return x((t = this.playbackPlayer) == null ? void 0 : t.attributes.media_duration, 0) > 0;
  }
  readStorage(t) {
    try {
      return window.localStorage.getItem(t) ?? "";
    } catch {
      return "";
    }
  }
  writeStorage(t, e) {
    try {
      window.localStorage.setItem(t, e);
    } catch {
    }
  }
  errorMessage(t, e) {
    return t instanceof Error && t.message ? t.message : e;
  }
  async withTimeout(t, e, s) {
    let i;
    const r = new Promise((a, n) => {
      i = window.setTimeout(() => n(new Error(s)), e);
    });
    try {
      return await Promise.race([t, r]);
    } finally {
      window.clearTimeout(i);
    }
  }
  cacheKey(t) {
    return JSON.stringify(
      Object.keys(t).sort().reduce((e, s) => (e[s] = t[s], e), {})
    );
  }
  cachedItems(t, e) {
    const s = t.get(e);
    if (s) {
      if (s.expiresAt <= Date.now()) {
        t.delete(e);
        return;
      }
      return t.delete(e), t.set(e, s), s.items;
    }
  }
  cacheItems(t, e, s, i) {
    for (t.delete(e), t.set(e, { expiresAt: Date.now() + i, items: s }); t.size > se; ) {
      const r = t.keys().next().value;
      if (!r)
        break;
      t.delete(r);
    }
  }
  syncProgressTimer() {
    const t = this.isConnected && this.activeTab === "now" && this.isPlaying && this.hasProgress;
    if (t && this.progressTimer === void 0) {
      this.progressTimer = window.setInterval(() => this.requestUpdate(), 1e3);
      return;
    }
    !t && this.progressTimer !== void 0 && (window.clearInterval(this.progressTimer), this.progressTimer = void 0);
  }
  readPlaybackMemory() {
    try {
      const t = JSON.parse(this.readStorage(ft) || "{}");
      return typeof t == "object" && t ? t : {};
    } catch {
      return {};
    }
  }
  writePlaybackMemory(t) {
    this.writeStorage(ft, JSON.stringify(t));
  }
  readFavoriteItems() {
    try {
      const t = JSON.parse(this.readStorage(vt) || "[]");
      return Array.isArray(t) ? t.map((e) => typeof e == "object" && e ? e : void 0).filter((e) => !!(e != null && e.name || e != null && e.uri)).slice(0, 60) : [];
    } catch {
      return [];
    }
  }
  writeFavoriteItems(t) {
    this.writeStorage(vt, JSON.stringify(t.slice(0, 60)));
  }
  favoriteKey(t) {
    const e = t.media_type || t.type || "track", s = this.itemArtist(t).toLowerCase(), i = String(t.name ?? "").toLowerCase(), r = String(t.uri ?? "").toLowerCase();
    return `${e}:${r || `${i}:${s}`}`;
  }
  isFavorite(t) {
    const e = this.favoriteKey(t);
    return this.favoriteItems.some((s) => this.favoriteKey(s) === e);
  }
  normalizedFavorite(t) {
    var s;
    const e = t.media_type || t.type || "track";
    return {
      name: t.name,
      uri: t.uri,
      media_type: e,
      type: e,
      artists: t.artists,
      artist: this.itemArtist(t),
      album: t.album,
      image: t.image || t.thumb || ((s = t.album) == null ? void 0 : s.image),
      thumb: t.thumb
    };
  }
  toggleFavorite(t) {
    const e = this.favoriteKey(t), i = this.favoriteItems.some((r) => this.favoriteKey(r) === e) ? this.favoriteItems.filter((r) => this.favoriteKey(r) !== e) : [this.normalizedFavorite(t), ...this.favoriteItems.filter((r) => this.favoriteKey(r) !== e)];
    this.favoriteItems = i.slice(0, 60), this.writeFavoriteItems(this.favoriteItems);
  }
  rememberPlaybackState() {
    const t = this.activePlayer, e = String((t == null ? void 0 : t.attributes.media_title) ?? ""), s = String(
      (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || ""
    ), i = String(
      (t == null ? void 0 : t.attributes.entity_picture) || (t == null ? void 0 : t.attributes.entity_picture_local) || (t == null ? void 0 : t.attributes.media_image_url) || ""
    );
    if (!t || !e && !i)
      return;
    const r = this.playbackMemory[t.entity_id];
    if (r && r.title === e && r.artist === s && r.artwork === i && r.state === t.state)
      return;
    const a = {
      ...this.playbackMemory,
      [t.entity_id]: {
        title: e,
        artist: s,
        artwork: i,
        state: t.state,
        updatedAt: Date.now()
      }
    };
    this.playbackMemory = a, this.writePlaybackMemory(a);
  }
  scheduleQueueRefreshForPlayback() {
    var i;
    const t = this.playbackPlayer, e = this.queueTargetEntityId();
    if (!t || t.state !== "playing" || !e || !((i = this.hass) != null && i.callWS))
      return;
    const s = [
      e,
      t.attributes.media_content_id,
      t.attributes.media_title
    ].join(":");
    s !== this.lastQueueSignature && (this.lastQueueSignature = s, window.clearTimeout(this.queueRefreshTimer), this.queueRefreshTimer = window.setTimeout(() => {
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
  get sonosGroupAnchor() {
    return this.isSonosBackedPlayer(this.activePlayer) ? this.activePlayer : this.currentlyPlayingPlayers.find((t) => this.isSonosBackedPlayer(t)) ?? this.allPlayers.find((t) => this.isSonosBackedPlayer(t));
  }
  get groupMembers() {
    const t = this.sonosGroupAnchor, e = t == null ? void 0 : t.attributes.group_members;
    if (Array.isArray(e) && e.length > 0)
      return e;
    const s = this.nativeSonosMatch(t), i = s == null ? void 0 : s.attributes.group_members;
    if (Array.isArray(i) && i.length > 1) {
      const r = i.map((a) => {
        var n;
        return (n = this.hass) == null ? void 0 : n.states[a];
      }).map((a) => {
        var c;
        const n = j(String(
          (a == null ? void 0 : a.attributes.friendly_name) ?? (a == null ? void 0 : a.entity_id) ?? ""
        ));
        return (c = this.allPlayers.find((d) => j(String(d.attributes.friendly_name ?? d.entity_id)) === n)) == null ? void 0 : c.entity_id;
      }).filter((a) => !!a);
      if (r.length > 1)
        return r;
    }
    return t && this.selectedGroupIds.includes(t.entity_id) && this.selectedGroupIds.length > 1 ? this.selectedGroupIds : [t == null ? void 0 : t.entity_id].filter((r) => !!r);
  }
  nativeSonosMatch(t) {
    if (!t)
      return;
    if (xt(t))
      return t;
    const e = this.normalizedRoomName(String(t.attributes.friendly_name ?? t.entity_id));
    return this.mediaPlayers.find((s) => xt(s) && this.normalizedRoomName(String(s.attributes.friendly_name ?? s.entity_id)) === e);
  }
  isSonosBackedPlayer(t) {
    return !!this.nativeSonosMatch(t);
  }
  get groupablePlayers() {
    const t = this.sonosGroupAnchor, e = this.isSonosBackedPlayer(t), s = /* @__PURE__ */ new Set();
    return e ? this.allPlayers.filter((i) => {
      if (b(i) || !this.isSonosBackedPlayer(i))
        return !1;
      const r = this.matchingMusicAssistantPlayer(i), a = re(i) || y(i) || !!r, n = (r == null ? void 0 : r.entity_id) ?? i.entity_id;
      return !a || s.has(n) ? !1 : (s.add(n), !0);
    }) : [];
  }
  matchingMusicAssistantPlayer(t) {
    if (!t)
      return;
    const e = new Set(this.config.music_assistant_entities ?? []), s = (n) => e.has(n.entity_id);
    if (!b(t) && (y(t) || s(t)))
      return t;
    const [, i = ""] = t.entity_id.split("."), r = [
      `media_player.${i}_2`,
      `media_player.ma_${i}`,
      `media_player.mass_${i}`,
      `media_player.${i}_music_assistant`
    ], a = this.normalizedRoomName(String(t.attributes.friendly_name ?? t.entity_id));
    return this.mediaPlayers.find((n) => !b(n) && r.includes(n.entity_id) && (y(n) || s(n))) ?? this.mediaPlayers.find((n) => !b(n) && (y(n) || s(n)) && this.normalizedRoomName(String(n.attributes.friendly_name ?? n.entity_id)) === a);
  }
  resolveGroupPlayers(t, e) {
    const s = [t, ...e];
    if (!s.every((d) => this.isSonosBackedPlayer(d)))
      return {
        anchor: t,
        members: [],
        error: "Sonos speakers can only be grouped with other Sonos speakers."
      };
    const r = s.some((d) => y(d)), a = s.some((d) => !y(d));
    if (!r || !a)
      return { anchor: t, members: e };
    const n = this.matchingMusicAssistantPlayer(t), c = e.map((d) => this.matchingMusicAssistantPlayer(d)).filter((d) => !!d);
    if (!n)
      return {
        anchor: t,
        members: [],
        error: `Use the Music Assistant version of ${t.attributes.friendly_name ?? t.entity_id} as the main speaker for mixed groups.`
      };
    if (c.length !== e.length) {
      const d = e.filter((p) => !this.matchingMusicAssistantPlayer(p)).map((p) => p.attributes.friendly_name ?? w(p.entity_id.split(".")[1]));
      return {
        anchor: n,
        members: [],
        error: `Music Assistant is unavailable for ${d.join(", ")}. Choose speakers from the same system instead.`
      };
    }
    return {
      anchor: n,
      members: c.filter((d) => d.entity_id !== n.entity_id)
    };
  }
  service(t, e, s, i) {
    const r = this.hass;
    if (!r)
      return Promise.reject(new Error("Home Assistant is not connected."));
    try {
      return this.withTimeout(
        Promise.resolve(r.callService(t, e, s, i)),
        Xt,
        `${t}.${e} timed out. Check the speaker connection and try again.`
      );
    } catch (a) {
      return Promise.reject(a);
    }
  }
  mediaService(t, e = {}, s = this.activeEntityId) {
    var r;
    const i = (r = this.hass) == null ? void 0 : r.states[s];
    return !s || b(i) ? Promise.reject(new Error("That speaker is unavailable.")) : this.service("media_player", t, e, {
      entity_id: s
    });
  }
  playPause() {
    this.playbackPending || (this.playbackError = "", this.playbackPending = !0, this.mediaService(
      this.isPlaying ? "media_pause" : "media_play",
      {},
      this.isPlaying ? this.playbackEntityId : this.activeEntityId
    ).catch((t) => {
      this.playbackError = this.errorMessage(t, "Playback control failed.");
    }).finally(() => {
      this.playbackPending = !1;
    }));
  }
  transportService(t) {
    var i;
    if (this.transportPending)
      return;
    const e = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer, s = (e == null ? void 0 : e.entity_id) ?? this.playbackEntityId;
    !s || b((i = this.hass) == null ? void 0 : i.states[s]) || (this.transportPending = !0, this.service("media_player", t, {}, {
      entity_id: s
    }).catch((r) => {
      this.playbackError = this.errorMessage(r, "Playback control failed.");
    }).finally(() => {
      this.transportPending = !1, t === "media_next_track" && this.refreshQueueAfterPlayback();
    }));
  }
  setVolume(t) {
    this.setPlayerVolume(this.volumeEntityId, t, !0);
  }
  setPlayerVolume(t, e, s = !1) {
    if (!t)
      return;
    const i = Math.max(0, Math.min(100, Number(e)));
    if (Number.isFinite(i)) {
      if (this.volumeOverrides.set(t, i), this.scheduleVolumeRender(), window.clearTimeout(this.volumeCommitTimers.get(t)), !s) {
        const r = window.setTimeout(() => {
          this.volumeCommitTimers.delete(t), this.commitPlayerVolume(t, i);
        }, 140);
        this.volumeCommitTimers.set(t, r);
        return;
      }
      this.volumeCommitTimers.delete(t), this.commitPlayerVolume(t, i);
    }
  }
  async commitPlayerVolume(t, e) {
    this.playbackError = "";
    try {
      await this.service("media_player", "volume_set", {
        volume_level: e / 100
      }, {
        entity_id: t
      });
    } catch (s) {
      this.playbackError = this.errorMessage(s, "Volume control failed.");
    } finally {
      window.clearTimeout(this.volumeResetTimers.get(t));
      const s = window.setTimeout(() => {
        this.volumeResetTimers.delete(t), this.volumeOverrides.delete(t), this.requestUpdate();
      }, 1500);
      this.volumeResetTimers.set(t, s);
    }
  }
  reconcileVolumeOverrides() {
    this.volumeOverrides.forEach((t, e) => {
      var r;
      const s = (r = this.hass) == null ? void 0 : r.states[e], i = Math.round(x(s == null ? void 0 : s.attributes.volume_level, -1) * 100);
      i >= 0 && Math.abs(i - t) <= 1 && (this.volumeOverrides.delete(e), window.clearTimeout(this.volumeResetTimers.get(e)), this.volumeResetTimers.delete(e));
    });
  }
  scheduleVolumeRender() {
    this.volumeRenderFrame === void 0 && (this.volumeRenderFrame = window.requestAnimationFrame(() => {
      this.volumeRenderFrame = void 0, this.requestUpdate();
    }));
  }
  updateVolumeLabel(t) {
    return t.target.value;
  }
  toggleMute() {
    this.togglePlayerMute(this.activeEntityId);
  }
  togglePlayerMute(t) {
    var s;
    const e = (s = this.hass) == null ? void 0 : s.states[t];
    !e || b(e) || (this.playbackError = "", this.service("media_player", "volume_mute", {
      is_volume_muted: !e.attributes.is_volume_muted
    }, {
      entity_id: t
    }).catch((i) => {
      this.playbackError = this.errorMessage(i, "Mute control failed.");
    }));
  }
  toggleGroupSelection(t) {
    if (this.groupError = "", this.pendingGroupIds.includes(t)) {
      this.pendingGroupIds = this.pendingGroupIds.filter((e) => e !== t);
      return;
    }
    this.pendingGroupIds = [...this.pendingGroupIds, t];
  }
  groupSelected() {
    this.groupError = "";
    const t = this.sonosGroupAnchor, e = (t == null ? void 0 : t.entity_id) ?? "";
    if (this.groupPending || !e || this.pendingGroupIds.length === 0)
      return;
    const s = this.pendingGroupIds.filter((u) => u !== e).map((u) => {
      var m;
      return (m = this.hass) == null ? void 0 : m.states[u];
    }).filter((u) => u ? this.groupablePlayers.some((m) => m.entity_id === u.entity_id) : !1);
    if (!t || s.length === 0)
      return;
    const i = this.resolveGroupPlayers(t, s);
    if (i.error) {
      this.groupError = i.error;
      return;
    }
    const r = i.members.map((u) => u.entity_id).filter((u, m, g) => u !== i.anchor.entity_id && g.indexOf(u) === m);
    if (r.length === 0) {
      this.groupError = "Those selected speakers cannot be grouped with this main speaker.";
      return;
    }
    const a = this.selectedEntityId, n = [...this.selectedGroupIds], c = [...this.pendingGroupIds], d = e, p = s.map((u) => u.entity_id);
    this.groupPending = !0, this.selectedGroupIds = [d, ...p], this.pendingGroupIds = [], this.service("media_player", "join", {
      group_members: r
    }, {
      entity_id: i.anchor.entity_id
    }).then(() => {
      this.writeStorage(z, d);
    }).catch((u) => {
      this.selectedEntityId = a, this.selectedGroupIds = n, this.pendingGroupIds = c, this.groupError = this.errorMessage(u, "Grouping failed.");
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  continueInSelectedRoom() {
    var n, c, d;
    this.groupError = "", this.playbackError = "";
    const t = (n = this.hass) == null ? void 0 : n.states[this.transferTargetEntityId];
    if (!t || b(t) || t.entity_id === this.playbackEntityId || t.entity_id === this.activeEntityId) {
      this.groupError = "Choose one available speaker to move the music to.";
      return;
    }
    const e = t.entity_id, s = this.playbackPlayer, i = ((c = this.matchingMusicAssistantPlayer(s)) == null ? void 0 : c.entity_id) ?? this.playbackEntityId, r = ((d = this.matchingMusicAssistantPlayer(t)) == null ? void 0 : d.entity_id) ?? (t == null ? void 0 : t.entity_id);
    if (!r || !i)
      return;
    const a = () => {
      this.selectedEntityId = e, this.pendingGroupIds = [], this.transferTargetEntityId = "", this.queueItems = [], this.queueError = "", this.lastInitialQueueEntityId = "", this.writeStorage(z, e), this.refreshQueueAfterPlayback();
    };
    this.groupPending = !0, this.service("music_assistant", "transfer_queue", {
      source_player: i,
      auto_play: !0
    }, {
      entity_id: r
    }).then(a).catch(async () => {
      const p = s, u = String((p == null ? void 0 : p.attributes.media_content_id) ?? ""), m = String((p == null ? void 0 : p.attributes.media_content_type) ?? "music");
      if (!u) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      try {
        await this.service("music_assistant", "play_media", {
          media_id: u,
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
    var e;
    const t = (e = this.sonosGroupAnchor) == null ? void 0 : e.entity_id;
    this.groupPending || !t || (this.groupPending = !0, this.service("media_player", "unjoin", {}, {
      entity_id: t
    }).then(() => {
      this.selectedGroupIds = [], this.pendingGroupIds = [];
    }).catch((s) => {
      this.groupError = this.errorMessage(s, "Could not leave the speaker group.");
    }).finally(() => {
      this.groupPending = !1;
    }));
  }
  ungroupAll() {
    if (this.groupPending)
      return;
    this.groupPending = !0;
    const t = this.groupMembers.map((s) => this.service("media_player", "unjoin", {}, { entity_id: s })), e = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    Promise.allSettled(t).then((s) => {
      s.some((i) => i.status === "rejected") && (this.groupError = "Some speakers could not leave the group. Try them individually.");
    }).finally(e);
  }
  removeFromGroup(t) {
    this.groupPending || (this.groupPending = !0, this.service("media_player", "unjoin", {}, { entity_id: t }).then(() => {
      this.selectedGroupIds = this.selectedGroupIds.filter((e) => e !== t), this.pendingGroupIds = this.pendingGroupIds.filter((e) => e !== t);
    }).catch((e) => {
      this.groupError = this.errorMessage(e, "Could not remove that speaker.");
    }).finally(() => {
      this.groupPending = !1;
    }));
  }
  musicAssistantSearchData(t, e = {}) {
    var i;
    const s = {
      name: t,
      limit: x(this.config.search_limit, v.search_limit),
      library_only: !!(this.config.library_only ?? v.library_only),
      ...e
    };
    return this.config.music_assistant_config_entry_id && (s.config_entry_id = this.config.music_assistant_config_entry_id), !s.media_type && ((i = this.config.search_media_types) != null && i.length) && (s.media_type = this.config.search_media_types), s;
  }
  async fetchMusicAssistantSearch(t) {
    var a;
    if (!((a = this.hass) != null && a.callWS))
      throw new Error("This Home Assistant frontend does not expose service responses here.");
    const e = this.cacheKey(t), s = this.cachedItems(this.searchCache, e);
    if (s)
      return s;
    const i = await this.withTimeout(
      this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: t,
        return_response: !0
      }),
      Y,
      "Music search timed out. Check Music Assistant and try again."
    ), r = this.extractSearchResults(i);
    return this.cacheItems(this.searchCache, e, r, te), r;
  }
  async searchMusicAssistant(t = !1) {
    var i, r;
    const e = this.query.trim();
    if (!e || !((i = this.hass) != null && i.callWS)) {
      (r = this.hass) != null && r.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    const s = ++this.searchRequestId;
    this.searching = !0, this.searchError = "";
    try {
      const a = await this.fetchMusicAssistantSearch(this.musicAssistantSearchData(e));
      if (s !== this.searchRequestId)
        return;
      this.searchResults = a, t || (this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "");
    } catch (a) {
      s === this.searchRequestId && (this.searchError = a instanceof Error ? a.message : "Search failed");
    } finally {
      s === this.searchRequestId && (this.searching = !1);
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
      let s = [];
      try {
        s = await this.browseMediaTracks(t, "album");
      } catch {
        s = [];
      }
      if (s.length === 0 && (s = await this.searchAlbumTracks(t)), e !== this.albumRequestId)
        return;
      this.albumTracks = this.dedupeQueueItems(s), this.albumTracks.length === 0 && (this.albumError = "No tracks found for this album.");
    } catch (s) {
      e === this.albumRequestId && (this.albumError = s instanceof Error ? s.message : "Album tracks are unavailable.");
    } finally {
      e === this.albumRequestId && (this.albumLoading = !1);
    }
  }
  async browseMediaTracks(t, e) {
    var c;
    if (!((c = this.hass) != null && c.callWS) || !t.uri)
      return [];
    const s = this.queueTargetEntityId() || this.activeEntityId;
    if (!s)
      return [];
    const i = `${s}:${e}:${t.uri}`, r = this.cachedItems(this.browseCache, i);
    if (r)
      return r;
    const a = await this.withTimeout(
      this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: s,
        media_content_id: t.uri,
        media_content_type: e
      }),
      Y,
      `Loading this ${e} timed out. Try again.`
    ), n = this.extractBrowseTracks(a, t);
    return this.cacheItems(this.browseCache, i, n, ee), n;
  }
  async searchAlbumTracks(t) {
    const e = t.name ?? "", s = this.itemArtist(t), i = s || e;
    if (!i)
      return [];
    const r = this.musicAssistantSearchData(i, {
      album: e,
      limit: Math.max(40, x(this.config.search_limit, v.search_limit)),
      media_type: ["track"]
    });
    return s && (r.artist = s), this.fetchMusicAssistantSearch(r).then((a) => a.filter((n) => (n.media_type || n.type) === "track"));
  }
  async loadPlaylistTracks(t) {
    const e = ++this.playlistRequestId;
    this.playlistTracks = [], this.playlistError = "", this.playlistLoading = !0;
    try {
      const s = await this.browseMediaTracks(t, "playlist");
      if (e !== this.playlistRequestId)
        return;
      this.playlistTracks = this.dedupeQueueItems(s), this.playlistTracks.length === 0 && (this.playlistError = "No tracks found for this playlist.");
    } catch (s) {
      e === this.playlistRequestId && (this.playlistError = s instanceof Error ? s.message : "Playlist tracks are unavailable.");
    } finally {
      e === this.playlistRequestId && (this.playlistLoading = !1);
    }
  }
  extractBrowseTracks(t, e) {
    var c;
    const s = [], i = e.name ?? "", r = this.itemArtist(e), a = e.image || e.thumb || ((c = e.album) == null ? void 0 : c.image) || "", n = (d, p = 0) => {
      if (typeof d != "object" || !d)
        return;
      const u = d, m = this.normalizedMediaType(
        u.media_content_type || u.media_class,
        "track"
      ), g = String(u.media_content_id ?? ""), f = String(u.title ?? u.name ?? ""), T = Array.isArray(u.children) ? u.children : [];
      p > 0 && !!g && !!f && (m === "track" || String(u.media_class ?? "").toLowerCase().includes("track") || u.can_play && !u.can_expand && m !== "album") && s.push({
        name: f,
        uri: g,
        media_type: "track",
        type: "track",
        artist: r,
        album: i ? { name: i, image: a } : e.album,
        image: String(u.thumbnail ?? u.image ?? a) || void 0
      }), T.forEach((k) => n(k, p + 1));
    };
    return n(t), s;
  }
  extractSearchResults(t) {
    const s = t.response ?? t, i = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return i.forEach((a) => {
      const n = s[a];
      Array.isArray(n) && n.forEach((c) => {
        typeof c == "object" && c && r.push(this.normalizeSearchItem(c, a === "tracks" ? "track" : a.slice(0, -1)));
      });
    }), r;
  }
  normalizedMediaType(t, e) {
    const s = String(t ?? "").toLowerCase();
    return s.includes("album") ? "album" : s.includes("artist") ? "artist" : s.includes("playlist") ? "playlist" : s.includes("radio") ? "radio" : s.includes("podcast") ? "podcast" : s.includes("track") || s.includes("song") ? "track" : e;
  }
  normalizeSearchItem(t, e) {
    const s = typeof t.album == "object" && t.album ? t.album : void 0, i = Array.isArray(t.artists) ? t.artists : void 0, r = this.normalizedMediaType(t.media_type ?? t.type, e), a = String(
      t.image ?? t.thumb ?? t.thumbnail ?? t.image_url ?? t.uri_image ?? (s == null ? void 0 : s.image) ?? ""
    );
    return {
      ...t,
      name: String(t.name ?? t.title ?? t.media_title ?? t.uri ?? ""),
      uri: String(t.uri ?? t.media_id ?? t.media_content_id ?? "") || void 0,
      media_type: r,
      type: r,
      artists: i,
      artist: String(t.artist ?? t.media_artist ?? (i == null ? void 0 : i.map((n) => n.name).filter(Boolean).join(", ")) ?? ""),
      album: s,
      image: a || void 0
    };
  }
  queueTargetEntityId() {
    const t = this.matchingMusicAssistantPlayer(this.activePlayer);
    return t && !b(t) ? t.entity_id : "";
  }
  queueServiceAttempts(t) {
    return [
      {
        domain: "music_assistant",
        service: "get_queue",
        data: {}
      }
    ];
  }
  async refreshQueue(t = {}) {
    var i;
    const e = this.queueTargetEntityId(), s = ++this.queueRequestId;
    if (!e || !((i = this.hass) != null && i.callWS)) {
      this.queueItems = [], this.queueLoading = !1, this.queueError = e ? "Queue responses are not available in this Home Assistant view." : "Queue is only available for Music Assistant speaker entities.";
      return;
    }
    t.silent || (this.queueLoading = !0), this.queueError = "";
    try {
      const r = [];
      let a = !1;
      for (const n of this.queueServiceAttempts(e))
        try {
          const c = await this.withTimeout(
            this.hass.callWS({
              type: "call_service",
              domain: n.domain,
              service: n.service,
              service_data: n.data,
              target: { entity_id: e },
              return_response: !0
            }),
            Y,
            "Queue refresh timed out. Check Music Assistant and try again."
          );
          if (s !== this.queueRequestId || e !== this.queueTargetEntityId())
            return;
          a = !0;
          const d = this.extractQueueItems(c, e);
          if (d.length > 0) {
            this.queueItems = d, this.queueError = "";
            return;
          }
        } catch (c) {
          if (s !== this.queueRequestId)
            return;
          r.push(c instanceof Error ? c.message : `${n.domain}.${n.service} failed.`);
        }
      if (s !== this.queueRequestId || e !== this.queueTargetEntityId())
        return;
      this.queueItems = [], this.queueError = a ? "" : r.length > 0 ? "Could not load this speaker’s queue. Retry in a moment." : "Queue is empty or unavailable for this Music Assistant player.";
    } finally {
      s === this.queueRequestId && (this.queueLoading = !1);
    }
  }
  extractQueueItems(t, e = "") {
    const s = this.responsePayload(t), i = this.queueResponseRoots(s, e);
    for (const r of i) {
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
    const s = [t];
    if (typeof t == "object" && t) {
      const i = t;
      e && i[e] && s.unshift(i[e]), Object.entries(i).forEach(([r, a]) => {
        (r.startsWith("media_player.") || typeof a == "object" && a && ("current_item" in a || "next_item" in a || "queue_items" in a || "items" in a)) && s.push(a);
      });
    }
    return s.filter((i, r, a) => a.indexOf(i) === r);
  }
  responsePayload(t) {
    return typeof t == "object" && t && "response" in t ? t.response ?? t : t;
  }
  valueAtPath(t, e) {
    return e.reduce((s, i) => {
      if (!(typeof s != "object" || !s))
        return s[i];
    }, t);
  }
  queueItemsFromUnknown(t) {
    if (Array.isArray(t))
      return t.map((e) => this.normalizeQueueItem(e)).filter((e) => !!e);
    if (typeof t == "object" && t) {
      const e = t, s = ["next_items", "upcoming_items", "items", "queue_items", "queue", "next_item"];
      for (const r of s) {
        const a = this.queueItemsFromUnknown(e[r]);
        if (a.length > 0)
          return a;
      }
      const i = this.normalizeQueueItem(e);
      if (i)
        return [i];
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
    const s = (typeof e.media_item == "object" && e.media_item ? e.media_item : void 0) ?? (typeof e.item == "object" && e.item ? e.item : void 0) ?? e, i = typeof s.album == "object" && s.album ? s.album : void 0, r = Array.isArray(s.artists) ? s.artists : void 0, a = String(
      s.name ?? e.name ?? e.title ?? e.media_title ?? ""
    ), n = String(s.uri ?? e.uri ?? e.media_id ?? e.media_content_id ?? ""), c = this.normalizedMediaType(s.media_type ?? e.media_type ?? e.type, "track"), d = String(
      s.image ?? e.image ?? e.thumbnail ?? e.entity_picture ?? e.media_image ?? e.local_image_encoded ?? (i == null ? void 0 : i.image) ?? ""
    );
    if (!(!a && !n))
      return {
        name: a || n,
        uri: n || void 0,
        media_type: c,
        type: c,
        artists: r,
        artist: String(s.artist ?? e.artist ?? e.media_artist ?? ""),
        album: i,
        image: d || void 0,
        queue_item_id: String(e.queue_item_id ?? s.queue_item_id ?? "")
      };
  }
  dedupeQueueItems(t) {
    const e = /* @__PURE__ */ new Set();
    return t.filter((s) => {
      const i = `${s.uri ?? ""}:${s.name ?? ""}:${s.artist ?? ""}`;
      return e.has(i) ? !1 : (e.add(i), !0);
    });
  }
  sameQueueItem(t, e) {
    return t.queue_item_id && e.queue_item_id ? t.queue_item_id === e.queue_item_id : t.uri && e.uri ? t.uri === e.uri : !!(t.name && e.name && t.name === e.name && (t.artist ?? "") === (e.artist ?? ""));
  }
  itemArtist(t) {
    var e;
    return String(
      t.artist || ((e = t.artists) == null ? void 0 : e.map((s) => s.name).filter(Boolean).join(", ")) || ""
    );
  }
  itemAlbum(t) {
    var e;
    return String(((e = t.album) == null ? void 0 : e.name) ?? "");
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
  clearPlaybackFeedback() {
    window.clearTimeout(this.playbackFeedbackTimer), this.playbackFeedbackTimer = void 0, this.playbackStatus = "", this.playbackSlow = !1;
  }
  startPlaybackFeedback(t, e) {
    this.optimisticPlaybackItem = t, this.playbackSlow = !1, this.playbackStatus = `Starting on ${e}…`, window.clearTimeout(this.playbackFeedbackTimer), this.playbackFeedbackTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.clearPlaybackFeedback();
        return;
      }
      this.playbackSlow = !0, this.playbackStatus = `${e} is taking longer than expected to connect.`;
    }, ie);
  }
  retryLastPlayback() {
    const t = this.lastPlaybackRequest;
    !t || this.playbackPending || this.playSearchResult(t.item, t.enqueue);
  }
  playSearchResult(t, e) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const s = t.uri || t.name;
    if (!s)
      return;
    const i = e ?? this.config.enqueue_mode ?? v.enqueue_mode, r = (i === "next" || i === "add") && !this.isPlaying ? "play" : i, a = this.matchingMusicAssistantPlayer(this.activePlayer), n = (a == null ? void 0 : a.entity_id) ?? "", c = this.activeEntityId;
    if (!a || !n) {
      this.playbackError = `No Music Assistant player matches ${this.activeName || "the selected speaker"}. Add its Music Assistant entity in the card settings.`;
      return;
    }
    this.playbackPending = !0, this.writeStorage(z, c), this.lastPlaybackRequest = { item: t, enqueue: e };
    const d = String(a.attributes.friendly_name ?? this.activeName ?? "speaker"), p = r !== "next" && r !== "add";
    p ? this.startPlaybackFeedback(t, d) : (this.clearPlaybackFeedback(), this.playbackStatus = `Adding ${t.name ?? "item"} to the queue…`);
    const u = t.media_type || t.type || "track", m = {
      media_id: s,
      media_type: u,
      enqueue: r
    }, g = this.itemArtist(t), f = this.itemAlbum(t);
    g && !String(s).includes("://") && (u === "track" || u === "album") && (m.artist = g), f && !String(s).includes("://") && u === "track" && (m.album = f), (async () => {
      let T = !1;
      try {
        await this.service("music_assistant", "play_media", m, {
          entity_id: n
        }), T = !0;
      } catch (nt) {
        if (r === "next")
          try {
            await this.service("music_assistant", "play_media", {
              media_id: s,
              media_type: u,
              enqueue: "add"
            }, {
              entity_id: n
            }), T = !0;
          } catch (k) {
            this.playbackError = this.errorMessage(k, "Music Assistant queue add failed.");
          }
        else if (t.uri && t.name) {
          const k = {
            media_id: t.name,
            media_type: u,
            enqueue: r
          };
          g && (u === "track" || u === "album") && (k.artist = g), f && u === "track" && (k.album = f);
          try {
            await this.service("music_assistant", "play_media", k, {
              entity_id: n
            }), T = !0;
          } catch (Rt) {
            this.playbackError = `Could not play ${t.name} on ${a.attributes.friendly_name ?? n}: ${this.errorMessage(Rt, "no playable result was found")}`;
          }
        } else
          this.playbackError = `Could not play this item on ${a.attributes.friendly_name ?? n}: ${this.errorMessage(nt, "Music Assistant playback failed.")}`;
      } finally {
        this.playbackPending = !1, T ? p && !this.isPlaying ? this.playbackStatus = `Connecting to ${d}…` : p || (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0) : (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0), this.refreshQueueAfterPlayback();
      }
    })();
  }
  queueSearchResult(t) {
    this.playSearchResult(t, "add");
  }
  playQueueItem(t) {
    const e = t.queue_item_id, s = this.queueTargetEntityId();
    if (!e || !s || this.playbackPending) {
      this.playSearchResult(t, "play");
      return;
    }
    this.playbackPending = !0, this.playbackError = "", this.service("mass_queue", "play_queue_item", {
      entity: s,
      queue_item_id: e
    }).catch((i) => {
      this.playbackError = this.errorMessage(i, "Queue item playback failed.");
    }).finally(() => {
      this.playbackPending = !1, this.refreshQueueAfterPlayback();
    });
  }
  renderRooms() {
    const t = this.currentlyPlayingPlayers;
    return t.length < 2 ? h : l`
      <div class="rooms">
        <span class="now-label">Playing in</span>
        <div class="now-row">
          <div class="now-speakers">
            ${t.map(
      (e) => l`
                <span class="now-chip">
                  ${e.attributes.friendly_name ?? w(e.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
        </div>
      </div>
    `;
  }
  playerPickerLabel(t, e) {
    const s = t.attributes.friendly_name ?? w(t.entity_id.split(".")[1]);
    return e.filter((r) => (r.attributes.friendly_name ?? w(r.entity_id.split(".")[1])).trim().toLowerCase() === s.trim().toLowerCase()).length < 2 ? s : y(t) ? `${s} (Music Assistant)` : Array.isArray(t.attributes.group_members) ? `${s} (Sonos)` : `${s} (${t.entity_id.split(".")[1]})`;
  }
  playerQuickStatus(t) {
    return b(t) ? "Offline" : t.state === "playing" ? "Playing" : t.state === "paused" ? "Paused" : t.state === "buffering" ? "Connecting" : "Ready";
  }
  selectPlayer(t) {
    var i;
    const e = (i = this.hass) == null ? void 0 : i.states[t];
    this.selectedEntityId = t, this.writeStorage(z, t);
    const s = e == null ? void 0 : e.attributes.group_members;
    this.selectedGroupIds = Array.isArray(s) ? [...s] : [t], this.pendingGroupIds = [], this.transferTargetEntityId = "", this.queueItems = [], this.queueError = "", this.queueLoading = !1, this.queueRequestId += 1, this.lastQueueSignature = "", this.lastInitialQueueEntityId = "", window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), this.activeTab === "queue" && this.refreshQueue();
  }
  renderPlayerPicker(t, e = !1) {
    return l`
      <div class="room-picker ${e ? "header-picker" : ""}" role="tablist" aria-label="Music Assistant speakers">
        ${t.map((s) => {
      const i = s.entity_id === this.activeEntityId, r = this.playerQuickStatus(s);
      return l`
            <button
              class="room-option ${i ? "active" : ""} ${b(s) ? "offline" : ""}"
              role="tab"
              aria-selected=${String(i)}
              title=${`${this.playerPickerLabel(s, t)} — ${r}`}
              @click=${() => this.selectPlayer(s.entity_id)}
            >
              <span class="room-status-dot" aria-hidden="true"></span>
              <span class="room-option-copy">
                <span class="room-option-name">${this.playerPickerLabel(s, t)}</span>
                <span class="room-option-status">${r}</span>
              </span>
            </button>
          `;
    })}
      </div>
    `;
  }
  renderHeaderIdentity() {
    const t = this.allPlayers;
    return l`
      <div class="title">
        ${t.length > 1 ? this.renderPlayerPicker(t, !0) : l`<span class="name">${this.activeName || "Sonos"}</span>`}
      </div>
    `;
  }
  renderTopControls(t, e) {
    return l`
      <div class="top-controls">
        <span class="header-state">${t ? "Unavailable" : w((e == null ? void 0 : e.state) ?? "idle")}</span>
      </div>
    `;
  }
  renderMiniPlayer(t, e, s) {
    return l`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork"></div>
        <div class="mini-meta">
          <span class="track">${t}</span>
          <span class="artist">${e}</span>
        </div>
        <div class="mini-controls">
          <button
            class="icon-button"
            ?disabled=${s || this.transportPending}
            @click=${() => this.transportService("media_previous_track")}
          >
            <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
          </button>
          <button
            class="play-button ${this.playbackPending ? "loading" : ""}"
            ?disabled=${s || this.playbackPending}
            @click=${this.playPause}
          >
            <ha-icon .icon=${this.playbackPending ? "mdi:loading" : this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${s || this.transportPending}
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
      return h;
    const t = this.playbackError || this.playbackStatus;
    return l`
      <div class="playback-feedback ${this.playbackError ? "failed" : ""} ${this.playbackSlow ? "slow" : ""}" role=${this.playbackError ? "alert" : "status"}>
        <ha-icon .icon=${this.playbackError ? "mdi:alert-circle-outline" : this.playbackSlow ? "mdi:clock-outline" : "mdi:loading"}></ha-icon>
        <span>${t}</span>
        <span class="feedback-actions">
          ${(this.playbackSlow || this.playbackError) && this.lastPlaybackRequest ? l`<button class="small-action" @click=${this.retryLastPlayback}>Retry</button>` : h}
          ${this.playbackError ? l`<button class="small-action" @click=${() => {
      this.activeTab = "speakers";
    }}>Choose speaker</button>` : h}
        </span>
      </div>
    `;
  }
  renderTransferPlayback() {
    const t = this.allPlayers.filter((e) => e.entity_id !== this.activeEntityId && e.entity_id !== this.playbackEntityId && !b(e) && !!this.matchingMusicAssistantPlayer(e));
    return t.length === 0 ? h : l`
      <section class="transfer-panel">
        <span class="section-title">Move Music</span>
        <div class="transfer-row">
          <select
            aria-label="Move music to speaker"
            .value=${this.transferTargetEntityId}
            @change=${(e) => {
      this.transferTargetEntityId = e.target.value;
    }}
          >
            <option value="">Choose a speaker</option>
            ${t.map((e) => l`
              <option value=${e.entity_id}>
                ${e.attributes.friendly_name ?? w(e.entity_id.split(".")[1])}
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
        </div>
      </section>
    `;
  }
  renderGrouping() {
    const t = this.groupablePlayers, e = this.sonosGroupAnchor, s = (e == null ? void 0 : e.entity_id) ?? "";
    if (!this.config.show_grouping || t.length < 2)
      return h;
    const i = t.some((c) => c.entity_id === s) || !!this.matchingMusicAssistantPlayer(e), r = this.pendingGroupIds.filter((c) => {
      var p;
      const d = (p = this.hass) == null ? void 0 : p.states[c];
      return c !== s && t.some((u) => u.entity_id === (d == null ? void 0 : d.entity_id));
    }).length, a = this.groupMembers.length, n = a > 1;
    return l`
      <section class="grouping">
        <span class="section-title">Group Sonos${e ? ` · ${e.attributes.friendly_name ?? "Main speaker"}` : ""}</span>
        ${this.groupError ? l`<div class="error">${this.groupError}</div>` : h}
        <div class="group-row">
          ${t.map((c) => {
      const d = this.selectedGroupIds.includes(c.entity_id) || this.groupMembers.includes(c.entity_id), p = this.pendingGroupIds.includes(c.entity_id), u = d || p, m = c.entity_id === s;
      return l`
	              <button
	                class="group-chip ${u ? "active" : ""} ${m ? "anchor" : ""}"
	                ?disabled=${m || this.groupPending}
                  title=${m ? "Current room" : u ? "Remove from selection" : "Add to selection"}
                @click=${() => this.toggleGroupSelection(c.entity_id)}
              >
                <span class="group-check">${u ? "✓" : ""}</span>
                <span class="group-name">
                  ${c.attributes.friendly_name ?? w(c.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${m ? "This room" : d ? "In group" : p ? "Selected" : "Available"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !i || r === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Group Selected</span>
            <span class="group-status">
              ${i ? `${r} room${r === 1 ? "" : "s"}` : "Cannot group this speaker"}
            </span>
          </button>
          <button
            class="group-chip action ungroup"
            ?disabled=${this.groupPending || !n}
            title="Make this room leave the current speaker group"
            @click=${this.ungroupActive}
          >
            <span class="group-check">×</span>
            <span class="group-name">Leave Group</span>
            <span class="group-status">${n ? "This room only" : "No group active"}</span>
          </button>
          <button
            class="group-chip action clear"
            ?disabled=${this.groupPending || !n}
            title="Ungroup every room in the current speaker group"
            @click=${this.ungroupAll}
          >
            <span class="group-check">×</span>
            <span class="group-name">Ungroup All</span>
            <span class="group-status">${n ? `${a} rooms` : "No group active"}</span>
          </button>
        </div>
      </section>
    `;
  }
  renderCurrentGroup() {
    const t = this.groupMembers.map((e) => {
      var s;
      return (s = this.hass) == null ? void 0 : s.states[e];
    }).filter((e) => !!e);
    return t.length <= 1 ? h : l`
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
      (e) => l`
                <div class="current-member">
                  <span class="speaker-name">
                    ${e.attributes.friendly_name ?? w(e.entity_id.split(".")[1])}
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
          Browse
        </button>
        <button
          class=${this.activeTab === "queue" ? "active" : ""}
          @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}
        >
          Queue
          ${this.queueItems.length > 0 ? l`<span class="tab-count">${Math.min(this.queueItems.length, 99)}</span>` : h}
        </button>
        <button
          class=${this.activeTab === "speakers" ? "active" : ""}
          @click=${() => {
      this.activeTab = "speakers";
    }}
        >
          Speakers
        </button>
        ${this.config.show_party ? l`
              <button
                class=${this.activeTab === "party" ? "active" : ""}
                @click=${() => {
      this.activeTab = "party";
    }}
              >
                Party
              </button>
            ` : h}
      </div>
    `;
  }
  renderNowPlaying(t, e, s) {
    const i = this.artworkUrl, r = !i && t === "No music selected";
    return l`
      <section class="now-view ${r ? "empty" : ""}">
        <div class="now-layout ${r ? "" : "with-queue"}">
          <div class="now-primary">
            <div class="now-artwork ${i ? "has-art" : "empty"}" aria-label="Current album artwork">
              ${i ? l`<img src=${i} alt="" loading="eager" decoding="async" />` : l`
                    <span class="artwork-empty">
                      <ha-icon .icon=${"mdi:music-note"}></ha-icon>
                      <span>${r ? "Ready to play" : "Artwork unavailable"}</span>
                    </span>
                  `}
            </div>
            ${this.hasProgress ? l`
                  <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(Math.round(this.progressPercent))}>
                    <div class="progress-fill" style=${`width: ${this.progressPercent}%`}></div>
                  </div>
                ` : h}
            <div class="metadata">
              <span class="track">${t}</span>
              <span class="artist">${r ? "Browse Music Assistant or choose a room" : e}</span>
            </div>
            ${r ? l`
                  <div class="empty-actions">
                    ${this.config.show_search ? l`
                          <button class="small-action primary" @click=${() => {
      this.activeTab = "search";
    }}>
                            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
                            Browse music
                          </button>
                        ` : h}
                    ${this.config.show_grouping ? l`
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
                ?disabled=${s || this.transportPending}
                @click=${() => this.transportService("media_previous_track")}
              >
                <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
              </button>
              <button
                class="play-button ${this.playbackPending ? "loading" : ""}"
                aria-label=${this.isPlaying ? "Pause" : "Play"}
                ?disabled=${s || this.playbackPending}
                @click=${this.playPause}
              >
                <ha-icon .icon=${this.playbackPending ? "mdi:loading" : this.isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
              </button>
              <button
                class="icon-button"
                aria-label="Next track"
                ?disabled=${s || this.transportPending}
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
    const t = this.queueItems.slice(0, 3);
    return l`
      <aside class="up-next-card" aria-label="Upcoming queue">
        <div class="up-next-header">
          <span class="up-next-title">
            <span class="eyebrow">Queue</span>
            <span class="up-next-heading">Up Next</span>
          </span>
          <span class="queue-toolbar-actions">
            ${this.queueItems.length > 0 ? l`<span class="queue-count">${this.queueItems.length}</span>` : h}
            <button class="small-action" @click=${() => {
      this.activeTab = "queue", this.refreshQueue();
    }}>
              View all
            </button>
          </span>
        </div>
        ${this.queueLoading && t.length === 0 ? l`<div class="hint">Loading what’s next…</div>` : h}
        ${t.length > 0 ? l`
              <div class="queue-preview-list">
                ${t.map((e, s) => this.renderQueueItem(e, s, !0))}
              </div>
            ` : h}
        ${!this.queueLoading && t.length === 0 ? l`
              <div class="queue-empty">
                <ha-icon .icon=${this.queueError ? "mdi:playlist-alert" : "mdi:playlist-plus"}></ha-icon>
                <strong>${this.queueError ? "Queue unavailable" : "Nothing queued yet"}</strong>
                <span>${this.queueError ? this.queueError : "Browse for music and choose Play next to line up a song."}</span>
                <div class="queue-empty-actions">
                  ${this.queueError ? l`<button class="small-action" @click=${() => this.refreshQueue()}>Retry</button>` : h}
                  ${this.config.show_search ? l`<button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>Browse music</button>` : h}
                </div>
              </div>
            ` : h}
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
            ${this.queueItems.length > 0 ? l`<span class="queue-count">${this.queueItems.length}</span>` : h}
            ${this.config.show_search ? l`
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
        ${this.queueLoading ? l`<div class="hint">Loading queue...</div>` : h}
        ${!this.queueLoading && this.queueItems.length === 0 ? l`
              <div class="queue-empty">
                <ha-icon .icon=${this.queueError ? "mdi:playlist-alert" : "mdi:playlist-plus"}></ha-icon>
                <strong>${this.queueError ? "Queue unavailable" : "Your queue is open"}</strong>
                <span>${this.queueError ? this.queueError : "Find something in Browse and choose Play next to add it here."}</span>
                <div class="queue-empty-actions">
                  ${this.queueError ? l`<button class="small-action" @click=${() => this.refreshQueue()}>Retry</button>` : h}
                  ${this.config.show_search ? l`<button class="small-action" @click=${() => {
      this.activeTab = "search";
    }}>Browse music</button>` : h}
                </div>
              </div>
            ` : h}
        ${this.queueItems.length > 0 ? l`
              <div class="queue-list">
                ${this.queueItems.map((t, e) => this.renderQueueItem(t, e))}
              </div>
            ` : h}
      </section>
    `;
  }
  renderQueueCurrent() {
    var r, a;
    const t = this.playbackPlayer, e = String((t == null ? void 0 : t.attributes.media_title) ?? ((r = this.activeMemory) == null ? void 0 : r.title) ?? "");
    if (!e)
      return h;
    const s = String(
      (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || ((a = this.activeMemory) == null ? void 0 : a.artist) || ""
    ), i = this.artworkUrl;
    return l`
      <div class="queue-current">
        <div class="queue-current-art" style=${i ? `background-image: url("${i}")` : ""}>
          ${i ? h : l`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </div>
        <span class="queue-current-meta">
          <span class="queue-now-label">Now playing</span>
          <span class="queue-current-title">${e}</span>
          <span class="queue-item-subtitle">${s}</span>
        </span>
        <span class="playing-pulse" aria-label=${this.isPlaying ? "Playing" : "Paused"}></span>
      </div>
    `;
  }
  renderSearch() {
    return this.config.show_search ? l`
      <section class="search">
        <span class="section-title">Browse Music Assistant</span>
        <div class="search-row">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Find songs, albums, artists, playlists"
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
        ${this.searchError ? l`<div class="error">${this.searchError}</div>` : h}
        ${this.searching ? l`<div class="hint">Searching...</div>` : h}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.browserView === "playlist" ? this.renderPlaylistView() : this.renderResults() : h}
        ${this.config.show_queue_hint ? l`<div class="hint">Tap a song to play it, or choose Play next to add it to the queue.</div>` : h}
      </section>
    ` : h;
  }
  itemsByType(t) {
    return this.searchResults.filter((e) => (e.media_type || e.type) === t);
  }
  renderFavorites() {
    return this.favoriteItems.length === 0 ? h : l`
      <section class="favorites">
        <span class="section-header">Favorites</span>
        ${this.favoriteItems.map((t) => {
      const e = t.media_type || t.type || "track", s = e === "artist" ? "artist" : e === "album" ? "album" : e === "playlist" ? "playlist" : "play";
      return this.renderResultItem(t, s, "favorites");
    })}
      </section>
    `;
  }
  renderResultSection(t, e, s = "play", i = !0, r = "search") {
    if (e.length === 0)
      return h;
    const a = i ? e.slice(0, x(this.config.search_limit, v.search_limit)) : e;
    return l`
      <section class="result-section">
        <span class="section-header">${t}</span>
        ${a.map((n) => this.renderResultItem(n, s, r))}
      </section>
    `;
  }
  renderArtistView() {
    const t = this.selectedArtist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${e ? `background-image: url("${e}")` : ""}
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
        ${this.renderResultSection("Songs", this.itemsByType("track"), "play", !0, "artist")}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album", !0, "artist")}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"), "playlist", !0, "artist")}
      </div>
    `;
  }
  renderAlbumView() {
    const t = this.selectedAlbum, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query, i = this.albumTracks.length > 0 ? this.albumTracks : this.itemsByType("track").filter((r) => !s || this.itemAlbum(r).toLowerCase() === s.toLowerCase());
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${e ? `background-image: url("${e}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${s}</span>
            <span class="result-sub">Album</span>
          </div>
          ${t ? l`
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
        ${this.albumLoading ? l`<div class="hint">Loading album tracks...</div>` : h}
        ${this.albumError ? l`<div class="error">${this.albumError}</div>` : h}
        ${this.renderResultSection("Songs", i, "play", !1, "album")}
      </div>
    `;
  }
  renderPlaylistView() {
    const t = this.selectedPlaylist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${e ? `background-image: url("${e}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${s}</span>
            <span class="result-sub">Playlist</span>
          </div>
          ${t ? l`
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
        ${this.playlistLoading ? l`<div class="hint">Loading playlist tracks...</div>` : h}
        ${this.playlistError ? l`<div class="error">${this.playlistError}</div>` : h}
        ${this.renderResultSection("Songs", this.playlistTracks, "play", !1, "playlist")}
      </div>
    `;
  }
  configuredService(t, e) {
    const s = (t || e).trim(), i = s.indexOf(".");
    if (i <= 0 || i === s.length - 1)
      throw new Error(`Invalid Home Assistant action: ${s}`);
    return [s.slice(0, i), s.slice(i + 1)];
  }
  runPartyAction(t) {
    if (!this.partyPending) {
      this.partyPending = !0, this.partyError = "", this.partyStatus = t === "start" ? "Connecting the Party screen..." : "Stopping the Party screen...";
      try {
        const e = t === "start" ? this.config.party_start_service : this.config.party_stop_service, s = t === "start" ? Tt : qt, [i, r] = this.configuredService(e, s);
        this.service(i, r).then(() => {
          this.partyStatus = t === "start" ? `Party screen sent to ${this.config.party_screen_name || Z}.` : "Party screen stopped.";
        }).catch((a) => {
          this.partyError = this.errorMessage(a, `Could not ${t} the Party screen.`), this.partyStatus = "";
        }).finally(() => {
          this.partyPending = !1;
        });
      } catch (e) {
        this.partyError = this.errorMessage(e, `Could not ${t} the Party screen.`), this.partyStatus = "", this.partyPending = !1;
      }
    }
  }
  openPartyDashboard() {
    const t = this.config.party_dashboard_url || It;
    window.open(t, "_blank", "noopener,noreferrer");
  }
  renderParty() {
    const t = this.config.party_screen_name || Z;
    return l`
      <section class="party">
        <div class="party-hero">
          <div class="party-heading">
            <span class="party-icon"><ha-icon .icon=${"mdi:party-popper"}></ha-icon></span>
            <span class="party-copy">
              <span class="party-title">Party on TV</span>
              <span class="party-target">Screen: ${t}</span>
            </span>
          </div>
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
          ${this.partyStatus ? l`<div class="party-feedback">${this.partyStatus}</div>` : h}
          ${this.partyError ? l`<div class="error">${this.partyError}</div>` : h}
        </div>
      </section>
    `;
  }
  renderSpeakers() {
    return l`
      <section class="speakers">
        ${this.renderCurrentGroup()}
        ${this.renderGrouping()}
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
                ${this.allPlayers.map((t) => {
      const e = b(t), s = Math.round(x(t.attributes.volume_level, 0) * 100), i = this.volumeOverrides.get(t.entity_id) ?? s;
      return l`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${t.attributes.friendly_name ?? w(t.entity_id.split(".")[1])}
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
                        aria-label=${`${t.attributes.friendly_name ?? t.entity_id} volume`}
                        @input=${(r) => {
        const a = this.updateVolumeLabel(r);
        this.setPlayerVolume(t.entity_id, a);
      }}
                        @change=${(r) => {
        const a = this.updateVolumeLabel(r);
        this.setPlayerVolume(t.entity_id, a, !0);
      }}
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
  renderResultItem(t, e = "play", s = "search") {
    var d, p, u;
    const i = t.artist || ((d = t.artists) == null ? void 0 : d.map((m) => m.name).filter(Boolean).join(", ")) || ((p = t.album) == null ? void 0 : p.name) || t.media_type || t.type || "", r = t.image || t.thumb || ((u = t.album) == null ? void 0 : u.image) || "", a = this.isFavorite(t), n = () => this.playSearchResult(t, "play");
    return l`
      <div class="result clickable" @click=${e === "artist" ? () => this.openArtist(t) : e === "album" ? () => this.openAlbum(t) : e === "playlist" ? () => this.openPlaylist(t) : n}>
        <div
          class="result-art"
          style=${r ? `background-image: url("${r}")` : ""}
        ></div>
        <div class="result-main">
          <span class="result-name">${t.name ?? t.uri ?? "Untitled"}</span>
          <span class="result-sub">${i}</span>
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
          ${e === "artist" || e === "album" || e === "playlist" ? h : l`
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), n();
    }}
                >
                  Play
                </button>
                <button
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), this.queueSearchResult(t);
    }}
                >
                  Play next
                </button>
              `}
        </span>
      </div>
    `;
  }
  renderQueueItem(t, e = 0, s = !1) {
    var n, c, d;
    const i = t.artist || ((n = t.artists) == null ? void 0 : n.map((p) => p.name).filter(Boolean).join(", ")) || ((c = t.album) == null ? void 0 : c.name) || t.media_type || t.type || "", r = t.image || t.thumb || ((d = t.album) == null ? void 0 : d.image) || "", a = t.name ?? t.uri ?? "Untitled";
    return l`
      <button
        class="queue-item ${s ? "compact" : ""}"
        type="button"
        aria-label=${`Play ${a}`}
        ?disabled=${this.playbackPending}
        @click=${() => this.playQueueItem(t)}
      >
        <span class="queue-position">${e + 1}</span>
        <span class="queue-item-art" style=${r ? `background-image: url("${r}")` : ""}>
          ${r ? h : l`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </span>
        <span class="queue-item-meta">
          <span class="queue-item-title">${a}</span>
          <span class="queue-item-subtitle">${i || "Music Assistant"}</span>
        </span>
        <span class="queue-play" aria-hidden="true">
          <ha-icon .icon=${"mdi:play"}></ha-icon>
        </span>
      </button>
    `;
  }
  render() {
    var d;
    if (!this.config)
      return l``;
    const t = this.playbackPlayer, e = this.activePlayer, s = this.activeMemory, i = this.optimisticPlaybackItem, r = b(e), a = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", n = (t == null ? void 0 : t.attributes.media_title) || (i == null ? void 0 : i.name) || (s == null ? void 0 : s.title) || "No music selected", c = (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || (i ? this.itemArtist(i) : "") || (s == null ? void 0 : s.artist) || "Ready";
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
            ${this.renderTopControls(r, t)}
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(n, c, r)}
          <div class="volume-row">
            <button class="icon-button" aria-label="Mute speaker" ?disabled=${r} @click=${this.toggleMute}>
              <ha-icon .icon=${(d = this.isPlaying ? this.playbackPlayer : this.activePlayer) != null && d.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${r}
              aria-label="Speaker volume"
              @input=${(p) => {
      const u = this.updateVolumeLabel(p);
      this.setPlayerVolume(this.volumeEntityId, u);
    }}
              @change=${(p) => this.setVolume(this.updateVolumeLabel(p))}
            />
            <span class="state">${this.volume}%</span>
          </div>
          ${this.renderPlaybackFeedback()}
          ${this.renderTabs()}
          <div class="tab-content">
            ${this.activeTab === "now" ? this.renderNowPlaying(n, c, r) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.activeTab === "party" ? this.renderParty() : this.renderSpeakers()}
          </div>
        </div>
      </ha-card>
    `;
  }
};
rt.properties = {
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
  transferTargetEntityId: { state: !0 },
  partyPending: { state: !0 },
  partyStatus: { state: !0 },
  partyError: { state: !0 }
};
let X = rt;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", X);
const at = class at extends I {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return $t`
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
    `;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  updateConfig(t) {
    const e = { ...this.config, ...t };
    Object.keys(e).forEach((s) => {
      const i = s;
      e[i] === "" && delete e[i];
    }), this.config = e, ae(this, e);
  }
  autoConfigureMusicAssistantPlayers() {
    var a;
    const e = Object.values(((a = this.hass) == null ? void 0 : a.states) ?? {}).filter((n) => !!n).filter((n) => y(n) && !b(n)), s = this.config.entities ?? [], r = (s.length > 0 ? s.map((n) => {
      var p, u;
      const c = (p = this.hass) == null ? void 0 : p.states[n];
      if (!c || b(c) || y(c))
        return n;
      const d = j(String(c.attributes.friendly_name ?? c.entity_id));
      return ((u = e.find((m) => j(String(m.attributes.friendly_name ?? m.entity_id)) === d)) == null ? void 0 : u.entity_id) ?? n;
    }) : e.map((n) => n.entity_id)).filter((n, c, d) => d.indexOf(n) === c);
    this.updateConfig({
      entities: r,
      music_assistant_entities: r
    });
  }
  renderSetupStatus() {
    const t = this.config.entities ?? [];
    return t.length === 0 ? h : l`
      <div class="setup-status">
        ${t.map((e) => {
      var c;
      const s = (c = this.hass) == null ? void 0 : c.states[e], i = b(s), r = !!(s && y(s) && !i), a = r ? "Ready" : i ? "Offline" : "Needs MA", n = r ? "ready" : i ? "offline" : "needs-ma";
      return l`
            <div class="setup-player">
              <span class="setup-player-name">${(s == null ? void 0 : s.attributes.friendly_name) ?? w(e.split(".")[1] ?? e)}</span>
              <span class="setup-badge ${n}">${a}</span>
            </div>
          `;
    })}
      </div>
    `;
  }
  valueChanged(t) {
    var i;
    const e = t.target, s = t;
    e.configValue && this.updateConfig({
      [e.configValue]: e.checked !== void 0 ? e.checked : ((i = s.detail) == null ? void 0 : i.value) ?? e.value
    });
  }
  renderEntityPicker(t, e, s = !1) {
    return l`
      <ha-selector
        .hass=${this.hass}
        .label=${t}
        .selector=${{ entity: { domain: "media_player", multiple: s } }}
        .value=${this.config[e] ?? (s ? [] : "")}
        .configValue=${e}
        @value-changed=${this.valueChanged}
      ></ha-selector>
    `;
  }
  renderTextInput(t, e, s = "") {
    return l`
      <ha-textfield
        .label=${t}
        .placeholder=${s}
        .value=${this.config[e] ?? ""}
        .configValue=${e}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderNumberInput(t, e, s = "") {
    return l`
      <ha-textfield
        type="number"
        .label=${t}
        .placeholder=${s}
        .value=${this.config[e] ?? ""}
        .configValue=${e}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }
  renderSwitch(t, e, s) {
    return l`
      <label class="switch-row">
        <ha-switch
          .checked=${!!(this.config[e] ?? s)}
          .configValue=${e}
          @change=${this.valueChanged}
        ></ha-switch>
        <span>${t}</span>
      </label>
    `;
  }
  renderSelect(t, e, s, i) {
    return l`
      <ha-select
        .label=${t}
        .value=${this.config[e] ?? i}
        .configValue=${e}
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
      Tt
    )}
            ${this.renderTextInput(
      "Stop Action",
      "party_stop_service",
      qt
    )}
            ${this.renderTextInput(
      "Party Dashboard URL",
      "party_dashboard_url",
      It
    )}
            ${this.renderTextInput(
      "TV Name",
      "party_screen_name",
      Z
    )}
          </div>
        </section>
      </div>
    `;
  }
};
at.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let tt = at;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", tt);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
