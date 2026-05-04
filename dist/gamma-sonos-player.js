/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Z = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), et = /* @__PURE__ */ new WeakMap();
let ut = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (a) => new ut(typeof a == "string" ? a : a + "", void 0, J), gt = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, i, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + a[r + 1], a[0]);
  return new ut(e, a, J);
}, _t = (a, t) => {
  if (Z) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = V.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, a.appendChild(s);
  }
}, st = Z ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $t(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xt, defineProperty: wt, getOwnPropertyDescriptor: kt, getOwnPropertyNames: At, getOwnPropertySymbols: Pt, getPrototypeOf: Et } = Object, v = globalThis, it = v.trustedTypes, St = it ? it.emptyScript : "", j = v.reactiveElementPolyfillSupport, T = (a, t) => a, F = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? St : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch {
        e = null;
      }
  }
  return e;
} }, mt = (a, t) => !xt(a, t), rt = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = rt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && wt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const c = i == null ? void 0 : i.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Et(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...At(e), ...Pt(e)];
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
      for (const i of s) e.unshift(st(i));
    } else t !== void 0 && e.push(st(t));
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
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : F).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), o = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : F;
      this._$Em = i;
      const l = o.fromAttribute(e, c.type);
      this[i] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? mt)(r, e) || s.useDefault && s.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: c } = n, o = this[r];
        c !== !0 || this._$AL.has(r) || o === void 0 || this.C(r, void 0, n, o);
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[T("elementProperties")] = /* @__PURE__ */ new Map(), P[T("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: P }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, at = (a) => a, H = R.trustedTypes, nt = H ? H.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, bt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + y, Ct = `<${ft}>`, w = document, N = () => w.createComment(""), U = (a) => a === null || typeof a != "object" && typeof a != "function", Q = Array.isArray, It = (a) => Q(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", q = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, ct = />/g, $ = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, dt = /"/g, yt = /^(?:script|style|textarea|title)$/i, Mt = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), d = Mt(1), S = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), _ = w.createTreeWalker(w, 129);
function vt(a, t) {
  if (!Q(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const Tt = (a, t) => {
  const e = a.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = I;
  for (let c = 0; c < e; c++) {
    const o = a[c];
    let l, u, h = -1, g = 0;
    for (; g < o.length && (n.lastIndex = g, u = n.exec(o), u !== null); ) g = n.lastIndex, n === I ? u[1] === "!--" ? n = ot : u[1] !== void 0 ? n = ct : u[2] !== void 0 ? (yt.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = $) : u[3] !== void 0 && (n = $) : n === $ ? u[0] === ">" ? (n = i ?? I, h = -1) : u[1] === void 0 ? h = -2 : (h = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? $ : u[3] === '"' ? dt : lt) : n === dt || n === lt ? n = $ : n === ot || n === ct ? n = I : (n = $, i = void 0);
    const f = n === $ && a[c + 1].startsWith("/>") ? " " : "";
    r += n === I ? o + Ct : h >= 0 ? (s.push(l), o.slice(0, h) + bt + o.slice(h) + y + f) : o + y + (h === -2 ? c : f);
  }
  return [vt(a, r + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const c = t.length - 1, o = this.parts, [l, u] = Tt(t, e);
    if (this.el = z.createElement(l, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = _.nextNode()) !== null && o.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(bt)) {
          const g = u[n++], f = i.getAttribute(h).split(y), O = /([.?@])?(.*)/.exec(g);
          o.push({ type: 1, index: r, name: O[2], strings: f, ctor: O[1] === "." ? Nt : O[1] === "?" ? Ut : O[1] === "@" ? zt : L }), i.removeAttribute(h);
        } else h.startsWith(y) && (o.push({ type: 6, index: r }), i.removeAttribute(h));
        if (yt.test(i.tagName)) {
          const h = i.textContent.split(y), g = h.length - 1;
          if (g > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(h[f], N()), _.nextNode(), o.push({ type: 2, index: ++r });
            i.append(h[g], N());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ft) o.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(y, h + 1)) !== -1; ) o.push({ type: 7, index: r }), h += y.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(a, t, e = a, s) {
  var n, c;
  if (t === S) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const r = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), r === void 0 ? i = void 0 : (i = new r(a), i._$AT(a, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = C(a, i._$AS(a, t.values), i, s)), t;
}
class Rt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    _.currentNode = i;
    let r = _.nextNode(), n = 0, c = 0, o = s[0];
    for (; o !== void 0; ) {
      if (n === o.index) {
        let l;
        o.type === 2 ? l = new G(r, r.nextSibling, this, t) : o.type === 1 ? l = new o.ctor(r, o.name, o.strings, this, t) : o.type === 6 && (l = new Gt(r, this, t)), this._$AV.push(l), o = s[++c];
      }
      n !== (o == null ? void 0 : o.index) && (r = _.nextNode(), n++);
    }
    return _.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = C(this, t, e), U(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : It(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(vt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const n = new Rt(i, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new G(this.O(N()), this.O(N()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = at(t).nextSibling;
      at(t).remove(), t = i;
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
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = C(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== S, n && (this._$AH = t);
    else {
      const c = t;
      let o, l;
      for (t = r[0], o = 0; o < r.length - 1; o++) l = C(this, c[s + o], e, o), l === S && (l = this._$AH[o]), n || (n = !U(l) || l !== this._$AH[o]), l === p ? t = p : t !== p && (t += (l ?? "") + r[o + 1]), this._$AH[o] = l;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Nt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ut extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class zt extends L {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? p) === S) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const D = R.litHtmlPolyfillSupport;
D == null || D(z, G), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
const Ot = (a, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new G(t.insertBefore(N(), r), r, void 0, e ?? {});
  }
  return i._$AI(a), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class E extends P {
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
    return S;
  }
}
var ht;
E._$litElement$ = !0, E.finalized = !0, (ht = x.litElementHydrateSupport) == null || ht.call(x, { LitElement: E });
const W = x.litElementPolyfillSupport;
W == null || W({ LitElement: E });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
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
}, Bt = 524288, B = "gamma-sonos-player:last-player";
function M(a, t) {
  if (typeof a == "number" && Number.isFinite(a))
    return a;
  const e = Number(a);
  return Number.isFinite(e) ? e : t;
}
function k(a) {
  return !a || a.state === "unavailable" || a.state === "unknown";
}
function Vt(a) {
  return !!(M(a == null ? void 0 : a.attributes.supported_features, 0) & Bt) || Array.isArray(a == null ? void 0 : a.attributes.group_members);
}
function b(a) {
  const t = String((a == null ? void 0 : a.attributes.app_id) ?? "").toLowerCase(), e = String((a == null ? void 0 : a.attributes.platform) ?? "").toLowerCase(), s = String((a == null ? void 0 : a.attributes.source) ?? "").toLowerCase(), i = Array.isArray(a == null ? void 0 : a.attributes.source_list) ? a.attributes.source_list.join(" ").toLowerCase() : "";
  return (a == null ? void 0 : a.attributes.mass_player_type) === "player" || !!(a != null && a.attributes.active_queue) || t.includes("music_assistant") || e.includes("music_assistant") || s.includes("music assistant") || i.includes("music assistant");
}
function A(a) {
  return a.replace(/_/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function Ht(a, t) {
  a.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    })
  );
}
const X = class X extends E {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.showVolumeMixer = !1, this.groupError = "";
  }
  static get styles() {
    return gt`
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
          0 18px 34px rgb(0 0 0 / 24%);
        isolation: isolate;
        max-width: min(340px, 76%);
        position: relative;
        width: min(340px, 76%);
      }

      .player.playing .now-artwork {
        border-color: rgb(255 255 255 / 14%);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 16%),
          0 22px 46px rgb(0 0 0 / 30%);
      }

      .player.playing .now-artwork::before {
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

      .player.playing .now-artwork::after {
        background:
          linear-gradient(180deg, rgb(255 255 255 / 8%), transparent 26%),
          radial-gradient(circle at 50% 115%, rgb(0 0 0 / 34%), transparent 56%);
        border-radius: inherit;
        content: '';
        inset: 0;
        pointer-events: none;
        position: absolute;
        z-index: 1;
      }

      .now-view .metadata {
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
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
        margin-bottom: -2px;
        text-transform: uppercase;
      }

      .now-chip {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        font-size: 12px;
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
        grid-template-columns: repeat(3, minmax(0, 1fr));
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
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
    this.config = { ...m, ...t }, this.selectedEntityId = this.config.entity || window.localStorage.getItem(B) || "", this.style.setProperty(
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
    return String(t.attributes.friendly_name ?? t.entity_id).trim().toLowerCase().replace(/\s+/g, " ");
  }
  preferredRoomPlayer(t, e) {
    return b(e) && !b(t) || !k(e) && k(t) ? e : t;
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
  get activePlayer() {
    var t;
    return ((t = this.hass) == null ? void 0 : t.states[this.selectedEntityId]) ?? this.allPlayers[0];
  }
  get activeEntityId() {
    var t;
    return ((t = this.activePlayer) == null ? void 0 : t.entity_id) ?? this.selectedEntityId;
  }
  get playbackPlayer() {
    return this.activePlayer;
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
    var t, e, s, i, r, n;
    return String(
      ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture) || ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture_local) || ((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_image_url) || ((i = this.activePlayer) == null ? void 0 : i.attributes.entity_picture) || ((r = this.activePlayer) == null ? void 0 : r.attributes.entity_picture_local) || ((n = this.activePlayer) == null ? void 0 : n.attributes.media_image_url) || ""
    );
  }
  get isPlaying() {
    var t;
    return ((t = this.playbackPlayer) == null ? void 0 : t.state) === "playing";
  }
  get volume() {
    const t = this.isPlaying ? this.playbackPlayer : this.activePlayer;
    return Math.round(M(t == null ? void 0 : t.attributes.volume_level, 0) * 100);
  }
  get groupMembers() {
    var e;
    const t = (e = this.activePlayer) == null ? void 0 : e.attributes.group_members;
    return Array.isArray(t) ? t : [this.activeEntityId].filter(Boolean);
  }
  get groupablePlayers() {
    const t = b(this.activePlayer), e = /* @__PURE__ */ new Set();
    return this.allPlayers.filter((s) => {
      const i = this.matchingMusicAssistantPlayer(s), r = Vt(s) || b(s) || !!i, n = t && i ? i.entity_id : s.entity_id;
      return !r || e.has(n) ? !1 : (e.add(n), !0);
    });
  }
  matchingMusicAssistantPlayer(t) {
    if (!t)
      return;
    if (b(t))
      return t;
    const [, e = ""] = t.entity_id.split("."), s = `media_player.${e}_2`, i = String(t.attributes.friendly_name ?? "").trim().toLowerCase();
    return this.mediaPlayers.find((r) => r.entity_id === s && b(r)) ?? this.mediaPlayers.find((r) => b(r) && String(r.attributes.friendly_name ?? "").trim().toLowerCase() === i);
  }
  resolveGroupPlayers(t, e) {
    const s = [t, ...e], i = s.some((o) => b(o)), r = s.some((o) => !b(o));
    if (!i || !r)
      return { anchor: t, members: e };
    const n = this.matchingMusicAssistantPlayer(t), c = e.map((o) => this.matchingMusicAssistantPlayer(o)).filter((o) => !!o);
    return n ? {
      anchor: n,
      members: c.filter((o) => o.entity_id !== n.entity_id)
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
    !s || k(i) || this.service("media_player", t, e, {
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
  transportService(t) {
    const e = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer;
    this.mediaService(t, {}, (e == null ? void 0 : e.entity_id) ?? this.playbackEntityId);
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
    !e || k(e) || this.service("media_player", "volume_mute", {
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
    }), n = () => {
      this.selectedEntityId = s.anchor.entity_id, this.selectedGroupIds = [s.anchor.entity_id, ...i], this.pendingGroupIds = [], window.localStorage.setItem(B, s.anchor.entity_id);
    };
    if (r && typeof r.then == "function") {
      r.then(n).catch((c) => {
        this.groupError = c instanceof Error ? c.message : "Grouping failed.";
      }).finally(() => {
        this.groupPending = !1;
      });
      return;
    }
    n(), window.setTimeout(() => {
      this.groupPending = !1;
    }, 700);
  }
  continueInSelectedRoom() {
    var n, c;
    this.groupError = "", this.playbackError = "";
    const t = this.selectedGroupIds.map((o) => {
      var l;
      return (l = this.hass) == null ? void 0 : l.states[o];
    }).find((o) => o ? o.entity_id !== this.playbackEntityId : !1), e = this.playbackPlayer, s = ((n = this.matchingMusicAssistantPlayer(e)) == null ? void 0 : n.entity_id) ?? this.playbackEntityId, i = ((c = this.matchingMusicAssistantPlayer(t)) == null ? void 0 : c.entity_id) ?? (t == null ? void 0 : t.entity_id);
    if (!i || !s)
      return;
    const r = this.service("music_assistant", "transfer_queue", {
      source_player: s,
      auto_play: !0
    }, {
      entity_id: i
    });
    r && typeof r.then == "function" && r.catch(() => {
      const o = e, l = String((o == null ? void 0 : o.attributes.media_content_id) ?? ""), u = String((o == null ? void 0 : o.attributes.media_content_type) ?? "music");
      if (!l) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      this.service("music_assistant", "play_media", {
        media_id: l,
        media_type: u,
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
  async searchMusicAssistant(t = !1) {
    var s, i, r;
    const e = this.query.trim();
    if (!e || !((s = this.hass) != null && s.callWS)) {
      (i = this.hass) != null && i.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    this.searching = !0, this.searchError = "";
    try {
      const n = {
        name: e,
        limit: M(this.config.search_limit, m.search_limit),
        library_only: !!(this.config.library_only ?? m.library_only)
      };
      this.config.music_assistant_config_entry_id && (n.config_entry_id = this.config.music_assistant_config_entry_id), (r = this.config.search_media_types) != null && r.length && (n.media_type = this.config.search_media_types);
      const c = await this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: n,
        return_response: !0
      });
      this.searchResults = this.extractSearchResults(c), t || (this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0);
    } catch (n) {
      this.searchError = n instanceof Error ? n.message : "Search failed";
    } finally {
      this.searching = !1;
    }
  }
  openArtist(t) {
    this.selectedArtist = t, this.selectedAlbum = void 0, this.browserView = "artist", this.query = t.name ?? this.query, this.searchMusicAssistant(!0);
  }
  openAlbum(t) {
    this.selectedAlbum = t, this.selectedArtist = void 0, this.browserView = "album", this.query = t.name ?? this.query, this.searchMusicAssistant(!0);
  }
  extractSearchResults(t) {
    const s = t.response ?? t, i = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return i.forEach((n) => {
      const c = s[n];
      Array.isArray(c) && c.forEach((o) => {
        typeof o == "object" && o && r.push({
          ...o,
          media_type: n === "tracks" ? "track" : n.slice(0, -1)
        });
      });
    }), r;
  }
  playSearchResult(t, e) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const s = t.uri || t.name;
    if (!s)
      return;
    const i = e ?? this.config.enqueue_mode ?? m.enqueue_mode, r = this.isPlaying || i !== "next" ? i : "play", n = this.matchingMusicAssistantPlayer(this.activePlayer) ?? this.activePlayer, c = (n == null ? void 0 : n.entity_id) ?? this.activeEntityId;
    this.playbackPending = !0, window.localStorage.setItem(B, c), this.selectedEntityId = c;
    const o = this.service("music_assistant", "play_media", {
      media_id: s,
      media_type: t.media_type || t.type,
      enqueue: r
    }, {
      entity_id: c
    });
    if (o && typeof o.then == "function") {
      o.catch((l) => {
        this.playbackError = l instanceof Error ? l.message : "Music Assistant playback failed.";
      }).finally(() => {
        this.playbackPending = !1;
      });
      return;
    }
    window.setTimeout(() => {
      this.playbackPending = !1;
    }, 900);
  }
  renderRooms() {
    const t = this.allPlayers;
    if (t.length < 2)
      return p;
    const e = [this.activePlayer].filter(
      (s) => !!s
    );
    return d`
      <div class="rooms">
        <span class="now-label">Now Playing On</span>
        <div class="now-row">
          <div class="now-speakers">
            ${e.map(
      (s) => d`
                <span class="now-chip">
                  ${s.attributes.friendly_name ?? A(s.entity_id.split(".")[1])}
                </span>
              `
    )}
          </div>
          <label class="player-picker">
            <ha-icon .icon=${"mdi:speaker"}></ha-icon>
            <select
              .value=${this.activeEntityId}
              @change=${(s) => {
      var c;
      const i = s.target.value, r = (c = this.hass) == null ? void 0 : c.states[i];
      this.selectedEntityId = i, window.localStorage.setItem(B, i);
      const n = r == null ? void 0 : r.attributes.group_members;
      this.selectedGroupIds = Array.isArray(n) ? [...n] : [i], this.pendingGroupIds = [];
    }}
            >
              ${t.map(
      (s) => d`
                  <option .value=${s.entity_id}>
                    ${s.attributes.friendly_name ?? A(s.entity_id.split(".")[1])}
                  </option>
                `
    )}
            </select>
          </label>
        </div>
      </div>
    `;
  }
  renderMiniPlayer(t, e, s) {
    return d`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork"></div>
        <div class="mini-meta">
          <span class="track">${t}</span>
          <span class="artist">${e}</span>
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
    const t = this.groupablePlayers;
    if (!this.config.show_grouping || t.length < 2)
      return p;
    const e = t.some((r) => r.entity_id === this.activeEntityId) || !!this.matchingMusicAssistantPlayer(this.activePlayer), s = this.pendingGroupIds.filter((r) => {
      var c;
      const n = (c = this.hass) == null ? void 0 : c.states[r];
      return r !== this.activeEntityId && t.some((o) => o.entity_id === (n == null ? void 0 : n.entity_id));
    }).length, i = this.selectedGroupIds.filter(
      (r) => r !== this.playbackEntityId
    ).length;
    return d`
      <section class="grouping">
        <span class="section-title">Select Speakers To Group With ${this.activeName}</span>
        ${this.groupError ? d`<div class="error">${this.groupError}</div>` : p}
        <div class="group-row">
          ${t.map((r) => {
      const n = this.selectedGroupIds.includes(r.entity_id) || this.groupMembers.includes(r.entity_id), c = this.pendingGroupIds.includes(r.entity_id), o = n || c, l = r.entity_id === this.activeEntityId;
      return d`
	              <button
	                class="group-chip ${o ? "active" : ""}"
	                ?disabled=${l || this.groupPending}
                @click=${() => this.toggleGroupSelection(r.entity_id)}
              >
                <span class="group-check">${o ? "✓" : ""}</span>
                <span class="group-name">
                  ${r.attributes.friendly_name ?? A(r.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${l ? "Main speaker" : n ? "In group" : c ? "Selected" : "Tap to select"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip active"
            ?disabled=${this.groupPending || i !== 1}
            @click=${this.continueInSelectedRoom}
          >
            <span class="group-check">▶</span>
            <span class="group-name">Continue Here</span>
            <span class="group-status">Move current queue</span>
          </button>
          <button
            class="group-chip active"
            ?disabled=${this.groupPending || !e || s === 0}
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">
              ${e ? `Group ${s} Speakers` : "Selected Speaker Cannot Group"}
            </span>
            <span class="group-status">
              ${e ? "Apply selection" : "Pick a group-capable main speaker"}
            </span>
          </button>
          <button class="group-chip" ?disabled=${this.groupPending} @click=${this.ungroupActive}>
            <span class="group-check">×</span>
            <span class="group-name">Ungroup Current</span>
            <span class="group-status">Break group</span>
          </button>
          <button class="group-chip" ?disabled=${this.groupPending} @click=${this.ungroupAll}>
            <span class="group-check">×</span>
            <span class="group-name">Ungroup All</span>
            <span class="group-status">Remove all rooms</span>
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
    return t.length === 0 ? p : d`
      <section class="current-group">
        <span class="section-title">Current Group</span>
        ${t.map(
      (e) => d`
            <div class="current-member">
              <span class="speaker-name">
                ${e.attributes.friendly_name ?? A(e.entity_id.split(".")[1])}
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
    )}
      </section>
    `;
  }
  renderTabs() {
    return d`
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
    return d`
      <section class="now-view">
        <div class="now-artwork" aria-label="Current album artwork"></div>
        <div class="metadata">
          <span class="track">${t}</span>
          <span class="artist">${e}</span>
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
  renderSearch() {
    return this.config.show_search ? d`
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
        ${this.searchError ? d`<div class="error">${this.searchError}</div>` : p}
        ${this.playbackError ? d`<div class="error">${this.playbackError}</div>` : p}
        ${this.searching ? d`<div class="hint">Searching...</div>` : p}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.renderResults() : p}
        ${this.config.show_queue_hint ? d`<div class="hint">Tap a result to add it next with Music Assistant.</div>` : p}
      </section>
    ` : p;
  }
  itemsByType(t) {
    return this.searchResults.filter((e) => (e.media_type || e.type) === t);
  }
  renderResultSection(t, e, s = "play") {
    return e.length === 0 ? p : d`
      <section class="result-section">
        <span class="section-header">${t}</span>
        ${e.slice(0, M(this.config.search_limit, m.search_limit)).map((i) => this.renderResultItem(i, s))}
      </section>
    `;
  }
  renderArtistView() {
    const t = this.selectedArtist, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query;
    return d`
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
        ${this.renderResultSection("Songs", this.itemsByType("track"))}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album")}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"))}
      </div>
    `;
  }
  renderAlbumView() {
    const t = this.selectedAlbum, e = (t == null ? void 0 : t.image) || (t == null ? void 0 : t.thumb) || "", s = (t == null ? void 0 : t.name) ?? this.query;
    return d`
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
    return d`
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
        ${this.showVolumeMixer ? d`
              <div class="speaker-list">
                ${this.allPlayers.map((t) => {
      const e = k(t), s = Math.round(M(t.attributes.volume_level, 0) * 100);
      return d`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${t.attributes.friendly_name ?? A(t.entity_id.split(".")[1])}
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
            ` : p}
      </section>
    `;
  }
  renderResults() {
    return d`
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
  renderResultItem(t, e = "play") {
    var r, n, c;
    const s = t.artist || ((r = t.artists) == null ? void 0 : r.map((o) => o.name).filter(Boolean).join(", ")) || ((n = t.album) == null ? void 0 : n.name) || t.media_type || t.type || "", i = t.image || t.thumb || ((c = t.album) == null ? void 0 : c.image) || "";
    return d`
            <div
              class="result ${e === "artist" || e === "album" ? "clickable" : ""}"
              @click=${e === "artist" ? () => this.openArtist(t) : e === "album" ? () => this.openAlbum(t) : () => this.playSearchResult(t, "play")}
            >
              <div
                class="result-art"
                style=${i ? `background-image: url("${i}")` : ""}
              ></div>
              <div class="result-main">
                <span class="result-name">${t.name ?? t.uri ?? "Untitled"}</span>
                <span class="result-sub">${s}</span>
              </div>
              ${e === "artist" || e === "album" ? p : d`
                    <span class="result-actions">
                      <button
                        class="now"
                        ?disabled=${this.playbackPending}
                        @click=${(o) => {
      o.stopPropagation(), this.playSearchResult(t, "play");
    }}
                      >
                        Now
                      </button>
                      <button
                        ?disabled=${this.playbackPending}
                        @click=${(o) => {
      o.stopPropagation(), this.playSearchResult(t, "next");
    }}
                      >
                        Next
                      </button>
                    </span>
                  `}
            </div>
          `;
  }
  render() {
    var c;
    if (!this.config)
      return d``;
    const t = this.playbackPlayer, e = this.activePlayer, s = k(e), i = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", r = (t == null ? void 0 : t.attributes.media_title) || "No music selected", n = (t == null ? void 0 : t.attributes.media_artist) || (t == null ? void 0 : t.attributes.media_album_name) || (t == null ? void 0 : t.attributes.source) || "Ready";
    return d`
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
              <span class="state">${s ? "Unavailable" : A((t == null ? void 0 : t.state) ?? "idle")}</span>
            </div>
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(r, n, s)}
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
	          ${this.activeTab === "now" ? this.renderNowPlaying(r, n, s) : this.activeTab === "search" ? this.renderSearch() : this.renderSpeakers()}
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
  groupError: { state: !0 }
};
let K = X;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", K);
const tt = class tt extends E {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return gt`
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
    }), this.config = e, Ht(this, e);
  }
  valueChanged(t) {
    var i;
    const e = t.target, s = t;
    e.configValue && this.updateConfig({
      [e.configValue]: e.checked !== void 0 ? e.checked : ((i = s.detail) == null ? void 0 : i.value) ?? e.value
    });
  }
  renderEntityPicker(t, e, s = !1) {
    return d`
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
    return d`
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
    return d`
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
    return d`
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
    return d`
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
      (r) => d`
            <mwc-list-item .value=${r}>${r}</mwc-list-item>
          `
    )}
      </ha-select>
    `;
  }
  render() {
    return d`
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
tt.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let Y = tt;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", Y);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
