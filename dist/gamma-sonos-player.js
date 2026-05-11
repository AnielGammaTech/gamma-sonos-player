/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, Z = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), it = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = it.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && it.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (n) => new yt(typeof n == "string" ? n : n + "", void 0, X), ft = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new yt(e, n, X);
}, At = (n, t) => {
  if (Z) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = B.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, rt = Z ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Pt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: St, getOwnPropertyDescriptor: It, getOwnPropertyNames: Tt, getOwnPropertySymbols: qt, getPrototypeOf: Rt } = Object, k = globalThis, at = k.trustedTypes, Mt = at ? at.emptyScript : "", H = k.reactiveElementPolyfillSupport, z = (n, t) => n, K = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Mt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, vt = (n, t) => !Et(n, t), nt = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: vt };
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
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && St(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const c = i == null ? void 0 : i.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = Rt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, s = [...Tt(e), ...qt(e)];
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
      for (const i of s) e.unshift(rt(i));
    } else t !== void 0 && e.push(rt(t));
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
    return At(t, this.constructor.elementStyles), t;
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
      const a = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : K).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), o = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : K;
      this._$Em = i;
      const l = o.fromAttribute(e, c.type);
      this[i] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var a;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? vt)(r, e) || s.useDefault && s.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
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
        const { wrapped: c } = a, o = this[r];
        c !== !0 || this._$AL.has(r) || o === void 0 || this.C(r, void 0, a, o);
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[z("elementProperties")] = /* @__PURE__ */ new Map(), T[z("finalized")] = /* @__PURE__ */ new Map(), H == null || H({ ReactiveElement: T }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, ot = (n) => n, Q = N.trustedTypes, ct = Q ? Q.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, _t = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + w, Ct = `<${xt}>`, S = document, L = () => S.createComment(""), j = (n) => n === null || typeof n != "object" && typeof n != "function", tt = Array.isArray, zt = (n) => tt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", F = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ut = />/g, P = RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, ht = /"/g, $t = /^(?:script|style|textarea|title)$/i, Nt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), u = Nt(1), R = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function wt(n, t) {
  if (!tt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(t) : t;
}
const Lt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = C;
  for (let c = 0; c < e; c++) {
    const o = n[c];
    let l, p, h = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, p = a.exec(o), p !== null); ) m = a.lastIndex, a === C ? p[1] === "!--" ? a = lt : p[1] !== void 0 ? a = ut : p[2] !== void 0 ? ($t.test(p[2]) && (i = RegExp("</" + p[2], "g")), a = P) : p[3] !== void 0 && (a = P) : a === P ? p[0] === ">" ? (a = i ?? C, h = -1) : p[1] === void 0 ? h = -2 : (h = a.lastIndex - p[2].length, l = p[1], a = p[3] === void 0 ? P : p[3] === '"' ? ht : dt) : a === ht || a === dt ? a = P : a === lt || a === ut ? a = C : (a = P, i = void 0);
    const g = a === P && n[c + 1].startsWith("/>") ? " " : "";
    r += a === C ? o + Ct : h >= 0 ? (s.push(l), o.slice(0, h) + _t + o.slice(h) + w + g) : o + w + (h === -2 ? c : g);
  }
  return [wt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const c = t.length - 1, o = this.parts, [l, p] = Lt(t, e);
    if (this.el = U.createElement(l, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = A.nextNode()) !== null && o.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(_t)) {
          const m = p[a++], g = i.getAttribute(h).split(w), b = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: r, name: b[2], strings: g, ctor: b[1] === "." ? Ut : b[1] === "?" ? Ot : b[1] === "@" ? Gt : V }), i.removeAttribute(h);
        } else h.startsWith(w) && (o.push({ type: 6, index: r }), i.removeAttribute(h));
        if ($t.test(i.tagName)) {
          const h = i.textContent.split(w), m = h.length - 1;
          if (m > 0) {
            i.textContent = Q ? Q.emptyScript : "";
            for (let g = 0; g < m; g++) i.append(h[g], L()), A.nextNode(), o.push({ type: 2, index: ++r });
            i.append(h[m], L());
          }
        }
      } else if (i.nodeType === 8) if (i.data === xt) o.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(w, h + 1)) !== -1; ) o.push({ type: 7, index: r }), h += w.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function M(n, t, e = n, s) {
  var a, c;
  if (t === R) return t;
  let i = s !== void 0 ? (a = e._$Co) == null ? void 0 : a[s] : e._$Cl;
  const r = j(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = M(n, i._$AS(n, t.values), i, s)), t;
}
class jt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    A.currentNode = i;
    let r = A.nextNode(), a = 0, c = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let l;
        o.type === 2 ? l = new O(r, r.nextSibling, this, t) : o.type === 1 ? l = new o.ctor(r, o.name, o.strings, this, t) : o.type === 6 && (l = new Bt(r, this, t)), this._$AV.push(l), o = s[++c];
      }
      a !== (o == null ? void 0 : o.index) && (r = A.nextNode(), a++);
    }
    return A.currentNode = S, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = M(this, t, e), j(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(wt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const a = new jt(i, this), c = a.u(this.options);
      a.p(e), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new O(this.O(L()), this.O(L()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = ot(t).nextSibling;
      ot(t).remove(), t = i;
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
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = M(this, t, e, 0), a = !j(t) || t !== this._$AH && t !== R, a && (this._$AH = t);
    else {
      const c = t;
      let o, l;
      for (t = r[0], o = 0; o < r.length - 1; o++) l = M(this, c[s + o], e, o), l === R && (l = this._$AH[o]), a || (a = !j(l) || l !== this._$AH[o]), l === d ? t = d : t !== d && (t += (l ?? "") + r[o + 1]), this._$AH[o] = l;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ot extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Gt extends V {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? d) === R) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
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
const D = N.litHtmlPolyfillSupport;
D == null || D(U, O), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Qt = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new O(t.insertBefore(L(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qt(e, this.renderRoot, this.renderOptions);
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
var bt;
q._$litElement$ = !0, q.finalized = !0, (bt = E.litElementHydrateSupport) == null || bt.call(E, { LitElement: q });
const W = E.litElementPolyfillSupport;
W == null || W({ LitElement: q });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
const f = {
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
}, Vt = 524288, G = "gamma-sonos-player:last-player", mt = "gamma-sonos-player:playback-memory", gt = "gamma-sonos-player:favorites";
function $(n, t) {
  if (typeof n == "number" && Number.isFinite(n))
    return n;
  const e = Number(n);
  return Number.isFinite(e) ? e : t;
}
function x(n) {
  return !n || n.state === "unavailable" || n.state === "unknown";
}
function Ht(n) {
  return !!($(n == null ? void 0 : n.attributes.supported_features, 0) & Vt) || Array.isArray(n == null ? void 0 : n.attributes.group_members);
}
function v(n) {
  const t = String((n == null ? void 0 : n.attributes.app_id) ?? "").toLowerCase(), e = String((n == null ? void 0 : n.attributes.platform) ?? "").toLowerCase(), s = String((n == null ? void 0 : n.attributes.source) ?? "").toLowerCase(), i = Array.isArray(n == null ? void 0 : n.attributes.source_list) ? n.attributes.source_list.join(" ").toLowerCase() : "";
  return (n == null ? void 0 : n.attributes.mass_player_type) === "player" || !!(n != null && n.attributes.active_queue) || t.includes("music_assistant") || e.includes("music_assistant") || s.includes("music assistant") || i.includes("music assistant");
}
function I(n) {
  return n.replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function Ft(n, t) {
  n.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    })
  );
}
const et = class et extends q {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.albumTracks = [], this.albumLoading = !1, this.albumError = "", this.playlistTracks = [], this.playlistLoading = !1, this.playlistError = "", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "", this.playbackMemory = {}, this.transportPending = !1, this.favoriteItems = [], this.searchRequestId = 0, this.albumRequestId = 0, this.playlistRequestId = 0, this.lastQueueSignature = "";
  }
  static get styles() {
    return ft`
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
        gap: clamp(8px, 1.8vw, 12px);
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
        gap: 10px;
        grid-template-columns: minmax(0, 1fr) auto;
        justify-content: initial;
      }

      .title {
        display: grid;
        gap: 2px;
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
        justify-self: end;
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
        max-width: 150px;
        min-width: 0;
        outline: 0;
        overflow: hidden;
        text-overflow: ellipsis;
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
        align-items: end;
        display: grid;
        gap: 8px;
        justify-items: end;
        min-width: 0;
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
        align-self: end;
        color: var(--primary-text-color, #f4f7fb);
        display: block;
        font-size: 12px;
        font-weight: 720;
        line-height: 1.2;
        max-width: min(310px, 48vw);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .next-up span {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.05em;
        margin-right: 5px;
        text-transform: uppercase;
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
    this.config = { ...f, ...t }, this.selectedEntityId = this.config.entity || window.localStorage.getItem(G) || "", this.playbackMemory = this.readPlaybackMemory(), this.favoriteItems = this.readFavoriteItems(), this.style.setProperty(
      "--gamma-sonos-width",
      this.config.fill_container ? "100%" : this.config.width ?? f.width
    ), this.style.setProperty("--gamma-sonos-height", this.config.height ?? f.height), this.style.setProperty(
      "--gamma-sonos-background",
      this.config.background ?? f.background
    ), this.style.setProperty(
      "--gamma-sonos-accent",
      this.config.accent_color ?? f.accent_color
    );
  }
  updated() {
    this.rememberPlaybackState(), this.scheduleQueueRefreshForPlayback();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.searchTimer), window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer);
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
    return t.trim().toLowerCase().replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b(ma|mass)\b/g, "").replace(/\b(sonos|music assistant|speaker|player)\b/g, "").replace(/\s+/g, " ").trim();
  }
  preferredRoomPlayer(t, e) {
    return v(e) && !v(t) || !x(e) && x(t) ? e : t;
  }
  dedupeRoomPlayers(t) {
    const e = /* @__PURE__ */ new Map();
    return t.forEach((s) => {
      const i = this.roomKey(s), r = e.get(i);
      e.set(i, r ? this.preferredRoomPlayer(r, s) : s);
    }), [...e.values()];
  }
  get allPlayers() {
    const t = [
      ...this.config.entities ?? [],
      ...this.config.music_assistant_entities ?? []
    ];
    if (t.length > 0) {
      const e = t.map((i) => {
        var r;
        return (r = this.hass) == null ? void 0 : r.states[i];
      }).filter((i) => !!i), s = e.map((i) => this.matchingMusicAssistantPlayer(i)).filter((i) => !!i);
      return this.dedupeRoomPlayers(this.dedupePlayers([...e, ...s]));
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
    var t, e, s, i;
    return String(
      ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture) || ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture_local) || ((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_image_url) || ((i = this.activeMemory) == null ? void 0 : i.artwork) || ""
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
    return Math.round($((t = this.activePlayer) == null ? void 0 : t.attributes.volume_level, 0) * 100);
  }
  get progressPercent() {
    var i, r, a;
    const t = $((i = this.playbackPlayer) == null ? void 0 : i.attributes.media_duration, 0);
    let e = $((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const s = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (t <= 0 || e < 0)
      return 0;
    if (this.isPlaying && s) {
      const c = Date.parse(s);
      Number.isFinite(c) && (e += Math.max(0, (Date.now() - c) / 1e3));
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
  get groupMembers() {
    var e;
    const t = (e = this.activePlayer) == null ? void 0 : e.attributes.group_members;
    return Array.isArray(t) ? t : [this.activeEntityId].filter(Boolean);
  }
  get groupablePlayers() {
    const t = v(this.activePlayer), e = /* @__PURE__ */ new Set();
    return this.allPlayers.filter((s) => {
      const i = this.matchingMusicAssistantPlayer(s), r = Ht(s) || v(s) || !!i, a = t && i ? i.entity_id : s.entity_id;
      return !r || e.has(a) ? !1 : (e.add(a), !0);
    });
  }
  matchingMusicAssistantPlayer(t) {
    if (!t)
      return;
    if (v(t))
      return t;
    const [, e = ""] = t.entity_id.split("."), s = [
      `media_player.${e}_2`,
      `media_player.ma_${e}`,
      `media_player.mass_${e}`,
      `media_player.${e}_music_assistant`
    ], i = this.normalizedRoomName(String(t.attributes.friendly_name ?? t.entity_id));
    return this.mediaPlayers.find((r) => s.includes(r.entity_id) && v(r)) ?? this.mediaPlayers.find((r) => v(r) && this.normalizedRoomName(String(r.attributes.friendly_name ?? r.entity_id)) === i);
  }
  resolveGroupPlayers(t, e) {
    const s = [t, ...e], i = s.some((o) => v(o)), r = s.some((o) => !v(o));
    if (!i || !r)
      return { anchor: t, members: e };
    const a = this.matchingMusicAssistantPlayer(t), c = e.map((o) => this.matchingMusicAssistantPlayer(o)).filter((o) => !!o);
    return a ? {
      anchor: a,
      members: c.filter((o) => o.entity_id !== a.entity_id)
    } : {
      anchor: t,
      members: [],
      error: `Use the Music Assistant version of ${t.attributes.friendly_name ?? t.entity_id} as the main speaker for mixed groups.`
    };
  }
  service(t, e, s, i) {
    var r;
    return (r = this.hass) == null ? void 0 : r.callService(t, e, s, i);
  }
  mediaService(t, e = {}, s = this.activeEntityId) {
    var r;
    const i = (r = this.hass) == null ? void 0 : r.states[s];
    if (!(!s || x(i)))
      return this.service("media_player", t, e, {
        entity_id: s
      });
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
      t.catch((s) => {
        this.playbackError = s instanceof Error ? s.message : "Playback control failed.";
      }).finally(e);
      return;
    }
    window.setTimeout(e, 650);
  }
  transportService(t) {
    var a;
    if (this.transportPending)
      return;
    const e = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer, s = (e == null ? void 0 : e.entity_id) ?? this.playbackEntityId;
    if (!s || x((a = this.hass) == null ? void 0 : a.states[s]))
      return;
    this.transportPending = !0;
    const i = this.service("media_player", t, {}, {
      entity_id: s
    }), r = () => {
      this.transportPending = !1, t === "media_next_track" && this.refreshQueueAfterPlayback();
    };
    if (i && typeof i.then == "function") {
      i.catch((c) => {
        this.playbackError = c instanceof Error ? c.message : "Playback control failed.";
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
    var s;
    const e = (s = this.hass) == null ? void 0 : s.states[t];
    !e || x(e) || this.service("media_player", "volume_mute", {
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
    const t = this.activePlayer, e = this.pendingGroupIds.filter((c) => c !== this.activeEntityId).map((c) => {
      var o;
      return (o = this.hass) == null ? void 0 : o.states[c];
    }).filter((c) => c ? this.groupablePlayers.some((o) => o.entity_id === c.entity_id) : !1);
    if (!t || e.length === 0)
      return;
    const s = this.resolveGroupPlayers(t, e);
    if (s.error) {
      this.groupError = s.error;
      return;
    }
    const i = s.members.map((c) => c.entity_id).filter((c, o, l) => c !== s.anchor.entity_id && l.indexOf(c) === o);
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
      this.selectedEntityId = s.anchor.entity_id, this.selectedGroupIds = [s.anchor.entity_id, ...i], this.pendingGroupIds = [], window.localStorage.setItem(G, s.anchor.entity_id);
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
    const t = this.selectedGroupIds.map((o) => {
      var l;
      return (l = this.hass) == null ? void 0 : l.states[o];
    }).find((o) => o ? o.entity_id !== this.playbackEntityId : !1), e = this.playbackPlayer, s = ((a = this.matchingMusicAssistantPlayer(e)) == null ? void 0 : a.entity_id) ?? this.playbackEntityId, i = ((c = this.matchingMusicAssistantPlayer(t)) == null ? void 0 : c.entity_id) ?? (t == null ? void 0 : t.entity_id);
    if (!i || !s)
      return;
    const r = this.service("music_assistant", "transfer_queue", {
      source_player: s,
      auto_play: !0
    }, {
      entity_id: i
    });
    r && typeof r.then == "function" && r.catch(() => {
      const o = e, l = String((o == null ? void 0 : o.attributes.media_content_id) ?? ""), p = String((o == null ? void 0 : o.attributes.media_content_type) ?? "music");
      if (!l) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      this.service("music_assistant", "play_media", {
        media_id: l,
        media_type: p,
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
    const t = this.groupMembers.map((s) => this.service("media_player", "unjoin", {}, { entity_id: s })).filter((s) => !!(s && typeof s.then == "function")), e = () => {
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
    const e = this.service("media_player", "unjoin", {}, { entity_id: t }), s = () => {
      this.selectedGroupIds = this.selectedGroupIds.filter((i) => i !== t), this.pendingGroupIds = this.pendingGroupIds.filter((i) => i !== t), this.groupPending = !1;
    };
    if (e && typeof e.then == "function") {
      e.finally(s);
      return;
    }
    window.setTimeout(s, 700);
  }
  musicAssistantSearchData(t, e = {}) {
    var i;
    const s = {
      name: t,
      limit: $(this.config.search_limit, f.search_limit),
      library_only: !!(this.config.library_only ?? f.library_only),
      ...e
    };
    return this.config.music_assistant_config_entry_id && (s.config_entry_id = this.config.music_assistant_config_entry_id), !s.media_type && ((i = this.config.search_media_types) != null && i.length) && (s.media_type = this.config.search_media_types), s;
  }
  async fetchMusicAssistantSearch(t) {
    var s;
    if (!((s = this.hass) != null && s.callWS))
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
    var r;
    if (!((r = this.hass) != null && r.callWS) || !t.uri)
      return [];
    const s = this.queueTargetEntityId() || this.activeEntityId;
    if (!s)
      return [];
    const i = await this.hass.callWS({
      type: "media_player/browse_media",
      entity_id: s,
      media_content_id: t.uri,
      media_content_type: e
    });
    return this.extractBrowseTracks(i, t);
  }
  async searchAlbumTracks(t) {
    const e = t.name ?? "", s = this.itemArtist(t), i = s || e;
    if (!i)
      return [];
    const r = this.musicAssistantSearchData(i, {
      album: e,
      limit: Math.max(40, $(this.config.search_limit, f.search_limit)),
      media_type: ["track"]
    });
    return s && (r.artist = s), this.fetchMusicAssistantSearch(r).then((a) => a.filter((c) => (c.media_type || c.type) === "track"));
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
    var o;
    const s = [], i = e.name ?? "", r = this.itemArtist(e), a = e.image || e.thumb || ((o = e.album) == null ? void 0 : o.image) || "", c = (l, p = 0) => {
      if (typeof l != "object" || !l)
        return;
      const h = l, m = this.normalizedMediaType(
        h.media_content_type || h.media_class,
        "track"
      ), g = String(h.media_content_id ?? ""), b = String(h.title ?? h.name ?? ""), _ = Array.isArray(h.children) ? h.children : [];
      p > 0 && !!g && !!b && (m === "track" || String(h.media_class ?? "").toLowerCase().includes("track") || h.can_play && !h.can_expand && m !== "album") && s.push({
        name: b,
        uri: g,
        media_type: "track",
        type: "track",
        artist: r,
        album: i ? { name: i, image: a } : e.album,
        image: String(h.thumbnail ?? h.image ?? a) || void 0
      }), _.forEach((kt) => c(kt, p + 1));
    };
    return c(t), s;
  }
  extractSearchResults(t) {
    const s = t.response ?? t, i = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return i.forEach((a) => {
      const c = s[a];
      Array.isArray(c) && c.forEach((o) => {
        typeof o == "object" && o && r.push(this.normalizeSearchItem(o, a === "tracks" ? "track" : a.slice(0, -1)));
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
      artist: String(t.artist ?? t.media_artist ?? (i == null ? void 0 : i.map((c) => c.name).filter(Boolean).join(", ")) ?? ""),
      album: s,
      image: a || void 0
    };
  }
  queueTargetEntityId() {
    const t = this.matchingMusicAssistantPlayer(this.activePlayer);
    return t && !x(t) ? t.entity_id : "";
  }
  queueServiceAttempts(t) {
    var s, i;
    const e = String(((i = (s = this.hass) == null ? void 0 : s.states[t]) == null ? void 0 : i.attributes.active_queue) ?? "");
    return [
      {
        domain: "mass_queue",
        service: "get_queue_items",
        data: { entity: t, limit: 40, limit_before: 0, limit_after: 40 }
      },
      {
        domain: "music_assistant",
        service: "get_queue",
        data: { entity_id: t }
      },
      ...e ? [
        {
          domain: "mass_queue",
          service: "get_queue_items",
          data: { entity: t, queue_id: e, limit: 40, limit_before: 0, limit_after: 40 }
        },
        {
          domain: "music_assistant",
          service: "get_queue",
          data: { queue_id: e }
        }
      ] : []
    ];
  }
  async refreshQueue(t = {}) {
    var s;
    const e = this.queueTargetEntityId();
    if (!e || !((s = this.hass) != null && s.callWS)) {
      this.queueItems = [], this.queueError = e ? "Queue responses are not available in this Home Assistant view." : "Queue is only available for Music Assistant speaker entities.";
      return;
    }
    t.silent || (this.queueLoading = !0), this.queueError = "";
    try {
      const i = [];
      for (const r of this.queueServiceAttempts(e))
        try {
          const a = await this.hass.callWS({
            type: "call_service",
            domain: r.domain,
            service: r.service,
            service_data: r.data,
            return_response: !0
          }), c = this.extractQueueItems(a, e);
          if (r.domain === "mass_queue" && (i.length = 0), c.length > 0) {
            this.queueItems = c;
            return;
          }
        } catch (a) {
          i.push(a instanceof Error ? a.message : `${r.domain}.${r.service} failed.`);
        }
      this.queueItems = [], this.queueError = i.length > 0 ? i[i.length - 1] : "Queue is empty or unavailable for this Music Assistant player.";
    } finally {
      t.silent || (this.queueLoading = !1);
    }
  }
  extractQueueItems(t, e = "") {
    const s = this.responsePayload(t), i = this.queueResponseRoots(s, e);
    for (const r of i) {
      const a = this.normalizeQueueItem(this.valueAtPath(r, ["current_item"])), c = [
        Array.isArray(r) ? r : void 0,
        this.valueAtPath(r, ["next_items"]),
        this.valueAtPath(r, ["upcoming_items"]),
        this.valueAtPath(r, ["items"]),
        this.valueAtPath(r, ["queue_items"]),
        this.valueAtPath(r, ["queue"]),
        this.valueAtPath(r, ["next_item"])
      ];
      for (const o of c) {
        const l = this.queueItemsFromUnknown(o).filter((p) => !a || !this.sameQueueItem(p, a));
        if (l.length > 0)
          return this.dedupeQueueItems(l);
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
    ), c = String(s.uri ?? e.uri ?? e.media_id ?? e.media_content_id ?? ""), o = this.normalizedMediaType(s.media_type ?? e.media_type ?? e.type, "track"), l = String(
      s.image ?? e.image ?? e.thumbnail ?? e.entity_picture ?? e.media_image ?? e.local_image_encoded ?? (i == null ? void 0 : i.image) ?? ""
    );
    if (!(!a && !c))
      return {
        name: a || c,
        uri: c || void 0,
        media_type: o,
        type: o,
        artists: r,
        artist: String(s.artist ?? e.artist ?? e.media_artist ?? ""),
        album: i,
        image: l || void 0,
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
  playSearchResult(t, e, s = {}) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const i = t.uri || t.name;
    if (!i)
      return;
    const r = e ?? this.config.enqueue_mode ?? f.enqueue_mode, a = (r === "next" || r === "add") && !this.isPlaying ? "play" : r, c = this.matchingMusicAssistantPlayer(this.activePlayer) ?? this.activePlayer, o = (c == null ? void 0 : c.entity_id) ?? this.activeEntityId;
    this.playbackPending = !0, window.localStorage.setItem(G, o), this.selectedEntityId = o;
    const l = t.media_type || t.type || "track", p = {
      media_id: i,
      media_type: l,
      enqueue: a
    }, h = this.itemArtist(t), m = this.itemAlbum(t);
    h && !String(i).includes("://") && (l === "track" || l === "album") && (p.artist = h), m && !String(i).includes("://") && l === "track" && (p.album = m), s.startRadio && a === "play" && l === "track" && h && (p.radio_mode = !0);
    const g = this.service("music_assistant", "play_media", p, {
      entity_id: o
    });
    if (g && typeof g.then == "function") {
      g.catch(async (b) => {
        if (p.radio_mode) {
          const _ = { ...p };
          delete _.radio_mode;
          try {
            const y = this.service("music_assistant", "play_media", _, {
              entity_id: o
            });
            y && typeof y.then == "function" && await y;
            return;
          } catch (y) {
            this.playbackError = y instanceof Error ? y.message : "Music Assistant playback failed.";
            return;
          }
        }
        if (a === "next") {
          const _ = this.service("music_assistant", "play_media", {
            media_id: i,
            media_type: l,
            enqueue: "add"
          }, {
            entity_id: o
          });
          return _ && typeof _.then == "function" ? _.catch((y) => {
            this.playbackError = y instanceof Error ? y.message : "Music Assistant queue add failed.";
          }) : void 0;
        }
        this.playbackError = b instanceof Error ? b.message : "Music Assistant playback failed.";
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
    const e = t.queue_item_id, s = this.queueTargetEntityId();
    if (!e || !s || this.playbackPending) {
      this.playSearchResult(t, "play");
      return;
    }
    this.playbackPending = !0, this.playbackError = "";
    const i = this.service("mass_queue", "play_queue_item", {
      entity: s,
      queue_item_id: e
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
    const t = this.allPlayers, e = this.currentlyPlayingPlayers;
    if (t.length < 2)
      return d;
    const s = e.length > 0 ? e : [this.activePlayer].filter((i) => !!i);
    return u`
      <div class="rooms">
        <span class="now-label">${e.length > 0 ? "Playing in" : "Selected room"}</span>
        <div class="now-row">
          <div class="now-speakers">
            ${s.map(
      (i) => u`
                <span class="now-chip">
                  ${i.attributes.friendly_name ?? I(i.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
        </div>
      </div>
    `;
  }
  renderPlayerPicker(t) {
    return u`
      <label class="player-picker">
        <ha-icon .icon=${"mdi:speaker"}></ha-icon>
        <select
          .value=${this.activeEntityId}
          @change=${(e) => {
      var a;
      const s = e.target.value, i = (a = this.hass) == null ? void 0 : a.states[s];
      this.selectedEntityId = s, window.localStorage.setItem(G, s);
      const r = i == null ? void 0 : i.attributes.group_members;
      this.selectedGroupIds = Array.isArray(r) ? [...r] : [s], this.pendingGroupIds = [], this.queueItems = [], this.queueError = "", this.activeTab === "queue" && this.refreshQueue();
    }}
        >
          ${t.map(
      (e) => u`
              <option
                .value=${e.entity_id}
                ?selected=${e.entity_id === this.activeEntityId}
              >
                ${e.attributes.friendly_name ?? I(e.entity_id.split(".")[1])}
              </option>
            `
    )}
        </select>
      </label>
    `;
  }
  renderTopControls() {
    const t = this.queueItems[0];
    return u`
      <div class="top-controls">
        ${this.allPlayers.length > 1 ? this.renderPlayerPicker(this.allPlayers) : d}
        ${t ? u`
              <div class="next-up">
                <span>Next</span>${t.name ?? t.uri ?? "Queue item"}
              </div>
            ` : d}
      </div>
    `;
  }
  renderMiniPlayer(t, e, s) {
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
  renderGrouping() {
    const t = this.groupablePlayers;
    if (!this.config.show_grouping || t.length < 2)
      return d;
    const e = t.some((r) => r.entity_id === this.activeEntityId) || !!this.matchingMusicAssistantPlayer(this.activePlayer), s = this.pendingGroupIds.filter((r) => {
      var c;
      const a = (c = this.hass) == null ? void 0 : c.states[r];
      return r !== this.activeEntityId && t.some((o) => o.entity_id === (a == null ? void 0 : a.entity_id));
    }).length, i = this.selectedGroupIds.filter(
      (r) => r !== this.playbackEntityId
    ).length;
    return u`
      <section class="grouping">
        <span class="section-title">Choose Speakers</span>
        ${this.groupError ? u`<div class="error">${this.groupError}</div>` : d}
        <div class="group-row">
          ${t.map((r) => {
      const a = this.selectedGroupIds.includes(r.entity_id) || this.groupMembers.includes(r.entity_id), c = this.pendingGroupIds.includes(r.entity_id), o = a || c, l = r.entity_id === this.activeEntityId;
      return u`
	              <button
	                class="group-chip ${o ? "active" : ""} ${l ? "anchor" : ""}"
	                ?disabled=${l || this.groupPending}
                  title=${l ? "Current room" : o ? "Remove from selection" : "Add to selection"}
                @click=${() => this.toggleGroupSelection(r.entity_id)}
              >
                <span class="group-check">${o ? "✓" : ""}</span>
                <span class="group-name">
                  ${r.attributes.friendly_name ?? I(r.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${l ? "This room" : a ? "In group" : c ? "Selected" : "Available"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action continue"
            ?disabled=${this.groupPending || i !== 1}
            title="Move the current music to the selected speaker"
            @click=${this.continueInSelectedRoom}
          >
            <span class="group-check">▶</span>
            <span class="group-name">Move Music</span>
            <span class="group-status">${i === 1 ? "To selected speaker" : "Select one speaker"}</span>
          </button>
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !e || s === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Add Selected</span>
            <span class="group-status">
              ${e ? `${s} selected` : "Cannot group this speaker"}
            </span>
          </button>
          <button
            class="group-chip action ungroup"
            ?disabled=${this.groupPending}
            title="Remove this speaker from its group"
            @click=${this.ungroupActive}
          >
            <span class="group-check">×</span>
            <span class="group-name">Remove Room</span>
            <span class="group-status">This speaker</span>
          </button>
          <button
            class="group-chip action clear"
            ?disabled=${this.groupPending}
            title="Clear the whole group"
            @click=${this.ungroupAll}
          >
            <span class="group-check">×</span>
            <span class="group-name">Clear Group</span>
            <span class="group-status">All speakers</span>
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
    return t.length <= 1 ? d : u`
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
    ) : d}
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
  renderNowPlaying(t, e, s) {
    const i = this.artworkUrl;
    return u`
      <section class="now-view">
        <div class="now-artwork ${i ? "has-art" : ""}" aria-label="Current album artwork">
          ${i ? u`<img src=${i} alt="" loading="eager" decoding="async" />` : u`<span class="artwork-empty">No artwork</span>`}
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
        ${this.queueLoading ? u`<div class="hint">Loading queue...</div>` : d}
        ${this.queueError ? u`<div class="error">${this.queueError}</div>` : d}
        ${!this.queueLoading && this.queueItems.length === 0 && !this.queueError ? u`<div class="hint">Queue is empty or unavailable for this speaker.</div>` : d}
        ${this.queueItems.length > 0 ? u`
              <div class="queue-list">
                ${this.queueItems.map((t) => this.renderQueueItem(t))}
              </div>
            ` : d}
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
        ${this.searchError ? u`<div class="error">${this.searchError}</div>` : d}
        ${this.playbackError ? u`<div class="error">${this.playbackError}</div>` : d}
        ${this.searching ? u`<div class="hint">Searching...</div>` : d}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.browserView === "playlist" ? this.renderPlaylistView() : this.renderResults() : d}
        ${this.config.show_queue_hint ? u`<div class="hint">Tap a result to start playback, or use Next to queue it after the current song.</div>` : d}
      </section>
    ` : d;
  }
  itemsByType(t) {
    return this.searchResults.filter((e) => (e.media_type || e.type) === t);
  }
  renderFavorites() {
    return this.favoriteItems.length === 0 ? d : u`
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
      return d;
    const a = i ? e.slice(0, $(this.config.search_limit, f.search_limit)) : e;
    return u`
      <section class="result-section">
        <span class="section-header">${t}</span>
        ${a.map((c) => this.renderResultItem(c, s, r))}
      </section>
    `;
  }
  renderArtistView() {
    const t = this.selectedArtist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query;
    return u`
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
    return u`
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
          ${t ? u`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(t, "play")}
                >
                  Play Album
                </button>
              ` : d}
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "";
    }}>
            Back
          </button>
        </div>
        ${this.albumLoading ? u`<div class="hint">Loading album tracks...</div>` : d}
        ${this.albumError ? u`<div class="error">${this.albumError}</div>` : d}
        ${this.renderResultSection("Songs", i, "play", !1, "album")}
      </div>
    `;
  }
  renderPlaylistView() {
    const t = this.selectedPlaylist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query;
    return u`
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
          ${t ? u`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(t, "play")}
                >
                  Play Playlist
                </button>
              ` : d}
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedPlaylist = void 0, this.playlistTracks = [], this.playlistError = "";
    }}>
            Back
          </button>
        </div>
        ${this.playlistLoading ? u`<div class="hint">Loading playlist tracks...</div>` : d}
        ${this.playlistError ? u`<div class="error">${this.playlistError}</div>` : d}
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
      const e = x(t), s = Math.round($(t.attributes.volume_level, 0) * 100);
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
            ` : d}
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
  renderResultItem(t, e = "play", s = "search") {
    var l, p, h;
    const i = t.artist || ((l = t.artists) == null ? void 0 : l.map((m) => m.name).filter(Boolean).join(", ")) || ((p = t.album) == null ? void 0 : p.name) || t.media_type || t.type || "", r = t.image || t.thumb || ((h = t.album) == null ? void 0 : h.image) || "", a = this.isFavorite(t), c = () => this.playSearchResult(t, "play", {
      startRadio: this.shouldStartRadioForContext(t, s)
    });
    return u`
      <div class="result clickable" @click=${e === "artist" ? () => this.openArtist(t) : e === "album" ? () => this.openAlbum(t) : e === "playlist" ? () => this.openPlaylist(t) : c}>
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
          ${e === "artist" || e === "album" || e === "playlist" ? d : u`
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(m) => {
      m.stopPropagation(), c();
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
    var i, r, a;
    const e = t.artist || ((i = t.artists) == null ? void 0 : i.map((c) => c.name).filter(Boolean).join(", ")) || ((r = t.album) == null ? void 0 : r.name) || t.media_type || t.type || "", s = t.image || t.thumb || ((a = t.album) == null ? void 0 : a.image) || "";
    return u`
      <div class="result clickable" @click=${() => this.playQueueItem(t)}>
        <div
          class="result-art"
          style=${s ? `background-image: url("${s}")` : ""}
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
                  @click=${(c) => {
      c.stopPropagation(), this.playQueueItem(t);
    }}
                >
                  Play
                </button>
              </span>
            ` : d}
      </div>
    `;
  }
  render() {
    var o;
    if (!this.config)
      return u``;
    const t = this.playbackPlayer, e = this.activePlayer, s = this.activeMemory, i = x(e), r = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", a = (t == null ? void 0 : t.attributes.media_title) || (s == null ? void 0 : s.title) || "No music selected", c = (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || (s == null ? void 0 : s.artist) || "Ready";
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
            <div class="title">
              <span class="name">${this.config.name || this.activeName || "Sonos"}</span>
              <span class="state">${i ? "Unavailable" : I((t == null ? void 0 : t.state) ?? "idle")}</span>
            </div>
            ${this.renderTopControls()}
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(a, c, i)}
          <div class="volume-row">
            <button class="icon-button" ?disabled=${i} @click=${this.toggleMute}>
              <ha-icon .icon=${(o = this.isPlaying ? this.playbackPlayer : this.activePlayer) != null && o.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${i}
              @change=${(l) => this.setVolume(l.target.value)}
            />
            <span class="state">${this.volume}%</span>
          </div>
	          ${this.renderTabs()}
	          ${this.activeTab === "now" ? this.renderNowPlaying(a, c, i) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.renderSpeakers()}
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
  favoriteItems: { state: !0 }
};
let Y = et;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", Y);
const st = class st extends q {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return ft`
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
    Object.keys(e).forEach((s) => {
      const i = s;
      e[i] === "" && delete e[i];
    }), this.config = e, Ft(this, e);
  }
  valueChanged(t) {
    var i;
    const e = t.target, s = t;
    e.configValue && this.updateConfig({
      [e.configValue]: e.checked !== void 0 ? e.checked : ((i = s.detail) == null ? void 0 : i.value) ?? e.value
    });
  }
  renderEntityPicker(t, e, s = !1) {
    return u`
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
    return u`
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
    return u`
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
    return u`
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
    return u`
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
st.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let J = st;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", J);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
