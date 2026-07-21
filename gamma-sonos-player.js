/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, ee = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), ne = /* @__PURE__ */ new WeakMap();
let we = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qe = (o) => new we(typeof o == "string" ? o : o + "", void 0, te), _e = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new we(t, o, te);
}, Ie = (o, e) => {
  if (ee) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = V.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, o.appendChild(s);
  }
}, oe = ee ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return qe(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Te, defineProperty: Me, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Ce, getOwnPropertySymbols: ze, getPrototypeOf: Ne } = Object, $ = globalThis, ce = $.trustedTypes, Le = ce ? ce.emptyScript : "", H = $.reactiveElementPolyfillSupport, N = (o, e) => o, J = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Le : null;
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
} }, $e = (o, e) => !Te(o, e), le = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: $e };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let I = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = le) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Me(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = Re(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const n = i == null ? void 0 : i.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Ne(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const t = this.properties, s = [...Ce(t), ...ze(t)];
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
      for (const i of s) t.unshift(oe(i));
    } else e !== void 0 && t.push(oe(e));
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
    return Ie(e, this.constructor.elementStyles), e;
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
      const a = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : J).toAttribute(t, s.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, a;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : J;
      this._$Em = i;
      const u = c.fromAttribute(t, n.type);
      this[i] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    var a;
    if (e !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[e]), s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? $e)(r, t) || s.useDefault && s.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
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
        const { wrapped: n } = a, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
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
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[N("elementProperties")] = /* @__PURE__ */ new Map(), I[N("finalized")] = /* @__PURE__ */ new Map(), H == null || H({ ReactiveElement: I }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, ue = (o) => o, G = L.trustedTypes, de = G ? G.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ke = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Pe = "?" + _, je = `<${Pe}>`, S = document, O = () => S.createComment(""), U = (o) => o === null || typeof o != "object" && typeof o != "function", se = Array.isArray, Oe = (o) => se(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, pe = />/g, P = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, ge = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Ue = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), l = Ue(1), M = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function Ee(o, e) {
  if (!se(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(e) : e;
}
const Be = (o, e) => {
  const t = o.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = C;
  for (let n = 0; n < t; n++) {
    const c = o[n];
    let u, d, h = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, d = a.exec(c), d !== null); ) m = a.lastIndex, a === C ? d[1] === "!--" ? a = he : d[1] !== void 0 ? a = pe : d[2] !== void 0 ? (Ae.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = P) : d[3] !== void 0 && (a = P) : a === P ? d[0] === ">" ? (a = i ?? C, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, u = d[1], a = d[3] === void 0 ? P : d[3] === '"' ? ge : me) : a === ge || a === me ? a = P : a === he || a === pe ? a = C : (a = P, i = void 0);
    const b = a === P && o[n + 1].startsWith("/>") ? " " : "";
    r += a === C ? c + je : h >= 0 ? (s.push(u), c.slice(0, h) + ke + c.slice(h) + _ + b) : c + _ + (h === -2 ? n : b);
  }
  return [Ee(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class B {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const n = e.length - 1, c = this.parts, [u, d] = Be(e, t);
    if (this.el = B.createElement(u, s), A.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = A.nextNode()) !== null && c.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ke)) {
          const m = d[a++], b = i.getAttribute(h).split(_), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: r, name: f[2], strings: b, ctor: f[1] === "." ? Ve : f[1] === "?" ? Ge : f[1] === "@" ? Fe : F }), i.removeAttribute(h);
        } else h.startsWith(_) && (c.push({ type: 6, index: r }), i.removeAttribute(h));
        if (Ae.test(i.tagName)) {
          const h = i.textContent.split(_), m = h.length - 1;
          if (m > 0) {
            i.textContent = G ? G.emptyScript : "";
            for (let b = 0; b < m; b++) i.append(h[b], O()), A.nextNode(), c.push({ type: 2, index: ++r });
            i.append(h[m], O());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Pe) c.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(_, h + 1)) !== -1; ) c.push({ type: 7, index: r }), h += _.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = S.createElement("template");
    return s.innerHTML = e, s;
  }
}
function R(o, e, t = o, s) {
  var a, n;
  if (e === M) return e;
  let i = s !== void 0 ? (a = t._$Co) == null ? void 0 : a[s] : t._$Cl;
  const r = U(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = R(o, i._$AS(o, e.values), i, s)), e;
}
class Qe {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? S).importNode(t, !0);
    A.currentNode = i;
    let r = A.nextNode(), a = 0, n = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let u;
        c.type === 2 ? u = new Q(r, r.nextSibling, this, e) : c.type === 1 ? u = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (u = new He(r, this, e)), this._$AV.push(u), c = s[++n];
      }
      a !== (c == null ? void 0 : c.index) && (r = A.nextNode(), a++);
    }
    return A.currentNode = S, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class Q {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = R(this, e, t), U(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Oe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = B.createElement(Ee(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const a = new Qe(i, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = be.get(e.strings);
    return t === void 0 && be.set(e.strings, t = new B(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const r of e) i === t.length ? t.push(s = new Q(this.O(O()), this.O(O()), this, this.options)) : s = t[i], s._$AI(r), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = ue(e).nextSibling;
      ue(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = R(this, e, t, 0), a = !U(e) || e !== this._$AH && e !== M, a && (this._$AH = e);
    else {
      const n = e;
      let c, u;
      for (e = r[0], c = 0; c < r.length - 1; c++) u = R(this, n[s + c], t, c), u === M && (u = this._$AH[c]), a || (a = !U(u) || u !== this._$AH[c]), u === p ? e = p : e !== p && (e += (u ?? "") + r[c + 1]), this._$AH[c] = u;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ve extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Ge extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Fe extends F {
  constructor(e, t, s, i, r) {
    super(e, t, s, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = R(this, e, t, 0) ?? p) === M) return;
    const s = this._$AH, i = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class He {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    R(this, e);
  }
}
const K = L.litHtmlPolyfillSupport;
K == null || K(B, Q), (L.litHtmlVersions ?? (L.litHtmlVersions = [])).push("3.3.2");
const De = (o, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = i = new Q(e.insertBefore(O(), r), r, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class T extends I {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = De(t, this.renderRoot, this.renderOptions);
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
var xe;
T._$litElement$ = !0, T.finalized = !0, (xe = E.litElementHydrateSupport) == null || xe.call(E, { LitElement: T });
const W = E.litElementPolyfillSupport;
W == null || W({ LitElement: T });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
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
  show_queue_hint: !0,
  background: "#101722",
  accent_color: "#39d98a"
}, Ke = 524288, z = "gamma-sonos-player:last-player", ye = "gamma-sonos-player:playback-memory", fe = "gamma-sonos-player:favorites", We = 1e4, Y = 12e3, Ye = 2 * 6e4, Je = 5 * 6e4, Ze = 30, Xe = 15e3;
function x(o, e) {
  if (typeof o == "number" && Number.isFinite(o))
    return o;
  const t = Number(o);
  return Number.isFinite(t) ? t : e;
}
function g(o) {
  return !o || o.state === "unavailable" || o.state === "unknown";
}
function et(o) {
  return !!(x(o == null ? void 0 : o.attributes.supported_features, 0) & Ke) || Array.isArray(o == null ? void 0 : o.attributes.group_members);
}
function y(o) {
  const e = String((o == null ? void 0 : o.attributes.app_id) ?? "").toLowerCase(), t = String((o == null ? void 0 : o.attributes.platform) ?? "").toLowerCase(), s = String((o == null ? void 0 : o.attributes.source) ?? "").toLowerCase(), i = Array.isArray(o == null ? void 0 : o.attributes.source_list) ? o.attributes.source_list.join(" ").toLowerCase() : "";
  return (o == null ? void 0 : o.attributes.mass_player_type) === "player" || !!(o != null && o.attributes.active_queue) || e.includes("music_assistant") || t.includes("music_assistant") || s.includes("music assistant") || i.includes("music assistant");
}
function ve(o) {
  return !y(o) && Array.isArray(o == null ? void 0 : o.attributes.group_members);
}
function w(o) {
  return o.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function j(o) {
  return o.trim().toLowerCase().replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b(ma|mass)\b/g, "").replace(/\b(sonos|music assistant|speaker|player)\b/g, "").replace(/\s+/g, " ").trim();
}
function tt(o, e) {
  o.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    })
  );
}
const ie = class ie extends T {
  constructor() {
    super(...arguments), this.selectedEntityId = "", this.activeTab = "now", this.query = "", this.searching = !1, this.searchError = "", this.playbackError = "", this.playbackStatus = "", this.playbackSlow = !1, this.searchResults = [], this.selectedGroupIds = [], this.pendingGroupIds = [], this.playbackPending = !1, this.groupPending = !1, this.browserView = "results", this.albumTracks = [], this.albumLoading = !1, this.albumError = "", this.playlistTracks = [], this.playlistLoading = !1, this.playlistError = "", this.showVolumeMixer = !1, this.showCurrentGroup = !1, this.groupError = "", this.queueItems = [], this.queueLoading = !1, this.queueError = "", this.playbackMemory = {}, this.transportPending = !1, this.favoriteItems = [], this.transferTargetEntityId = "", this.initialTabResolved = !1, this.searchRequestId = 0, this.albumRequestId = 0, this.playlistRequestId = 0, this.lastInitialQueueEntityId = "", this.lastQueueSignature = "", this.queueRequestId = 0, this.cachedMediaPlayers = [], this.cachedAllPlayers = [], this.cachedPlayerConfigKey = "", this.searchCache = /* @__PURE__ */ new Map(), this.browseCache = /* @__PURE__ */ new Map(), this.volumeOverrides = /* @__PURE__ */ new Map(), this.volumeCommitTimers = /* @__PURE__ */ new Map(), this.volumeResetTimers = /* @__PURE__ */ new Map();
  }
  static get styles() {
    return _e`
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
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .grouping,
      .search,
      .speakers,
      .queue {
        display: grid;
        gap: 8px;
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
  static getStubConfig(e, t) {
    return {
      entities: t.filter((s) => s.startsWith("media_player."))
    };
  }
  static async getConfigElement() {
    return document.createElement("gamma-sonos-player-card-editor");
  }
  setConfig(e) {
    this.config = { ...v, ...e }, this.selectedEntityId = this.config.entity || this.readStorage(z) || "", this.cachedPlayerConfigKey = "", this.playbackMemory = this.readPlaybackMemory(), this.favoriteItems = this.readFavoriteItems(), this.style.setProperty(
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
      var e, t;
      (t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("input[type='search']")) == null || t.focus();
    }, 0))), this.isPlaying && (this.playbackStatus || this.playbackSlow) && (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.searchTimer), window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), window.clearTimeout(this.playbackFeedbackTimer), window.clearInterval(this.progressTimer), window.cancelAnimationFrame(this.volumeRenderFrame ?? 0), this.progressTimer = void 0, this.volumeRenderFrame = void 0, this.searchRequestId += 1, this.albumRequestId += 1, this.playlistRequestId += 1, this.queueRequestId += 1, this.volumeCommitTimers.forEach((e) => window.clearTimeout(e)), this.volumeResetTimers.forEach((e) => window.clearTimeout(e)), this.volumeCommitTimers.clear(), this.volumeResetTimers.clear();
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
    return e !== this.cachedStates && (this.cachedStates = e, this.cachedMediaPlayers = Object.values(e ?? {}).filter((s) => !!s).filter((s) => s.entity_id.startsWith("media_player.")), this.cachedAllPlayers = [], this.cachedPlayerConfigKey = ""), this.cachedMediaPlayers;
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
    return this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id));
  }
  normalizedRoomName(e) {
    return j(e);
  }
  preferredRoomPlayer(e, t) {
    return e.entity_id === this.selectedEntityId || t.entity_id === this.selectedEntityId ? t.entity_id === this.selectedEntityId ? t : e : g(e) !== g(t) ? g(e) ? t : e : y(t) && !y(e) ? t : e;
  }
  dedupeRoomPlayers(e) {
    const t = /* @__PURE__ */ new Map();
    return e.forEach((s) => {
      const i = this.roomKey(s), r = t.get(i);
      t.set(i, r ? this.preferredRoomPlayer(r, s) : s);
    }), [...t.values()];
  }
  get allPlayers() {
    var i;
    const e = (i = this.config.entities) != null && i.length ? this.config.entities : this.config.music_assistant_entities ?? [], t = [
      this.selectedEntityId,
      e.join("\0"),
      (this.config.music_assistant_entities ?? []).join("\0")
    ].join("");
    if (this.mediaPlayers, this.cachedAllPlayers.length > 0 && this.cachedPlayerConfigKey === t)
      return this.cachedAllPlayers;
    let s;
    if (e.length > 0) {
      const r = e.map((a) => {
        var n;
        return (n = this.hass) == null ? void 0 : n.states[a];
      }).filter((a) => !!a);
      s = this.dedupePlayers(r.map((a) => this.matchingMusicAssistantPlayer(a) ?? a));
    } else
      s = this.dedupeRoomPlayers(this.cachedMediaPlayers.filter((r) => this.isDiscoverablePlayer(r)));
    return this.cachedPlayerConfigKey = t, this.cachedAllPlayers = s, s;
  }
  get currentlyPlayingPlayer() {
    return this.allPlayers.find((e) => e.state === "playing");
  }
  get currentlyPlayingPlayers() {
    return this.dedupeRoomPlayers(this.allPlayers.filter((e) => e.state === "playing"));
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
  get artworkUrl() {
    var e, t, s, i, r, a, n, c;
    return String(
      ((e = this.playbackPlayer) == null ? void 0 : e.attributes.entity_picture) || ((t = this.playbackPlayer) == null ? void 0 : t.attributes.entity_picture_local) || ((s = this.playbackPlayer) == null ? void 0 : s.attributes.media_image_url) || ((i = this.optimisticPlaybackItem) == null ? void 0 : i.image) || ((r = this.optimisticPlaybackItem) == null ? void 0 : r.thumb) || ((n = (a = this.optimisticPlaybackItem) == null ? void 0 : a.album) == null ? void 0 : n.image) || ((c = this.activeMemory) == null ? void 0 : c.artwork) || ""
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
    var i;
    const e = this.volumeEntityId, t = (i = this.hass) == null ? void 0 : i.states[e], s = Math.round(x(t == null ? void 0 : t.attributes.volume_level, 0) * 100);
    return this.volumeOverrides.get(e) ?? s;
  }
  get volumeEntityId() {
    return this.isPlaying ? this.playbackEntityId : this.activeEntityId;
  }
  get progressPercent() {
    var i, r, a;
    const e = x((i = this.playbackPlayer) == null ? void 0 : i.attributes.media_duration, 0);
    let t = x((r = this.playbackPlayer) == null ? void 0 : r.attributes.media_position, 0);
    const s = String(((a = this.playbackPlayer) == null ? void 0 : a.attributes.media_position_updated_at) ?? "");
    if (e <= 0 || t < 0)
      return 0;
    if (this.isPlaying && s) {
      const n = Date.parse(s);
      Number.isFinite(n) && (t += Math.max(0, (Date.now() - n) / 1e3));
    }
    return Math.max(0, Math.min(100, t / e * 100));
  }
  get hasProgress() {
    var e;
    return x((e = this.playbackPlayer) == null ? void 0 : e.attributes.media_duration, 0) > 0;
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
  async withTimeout(e, t, s) {
    let i;
    const r = new Promise((a, n) => {
      i = window.setTimeout(() => n(new Error(s)), t);
    });
    try {
      return await Promise.race([e, r]);
    } finally {
      window.clearTimeout(i);
    }
  }
  cacheKey(e) {
    return JSON.stringify(
      Object.keys(e).sort().reduce((t, s) => (t[s] = e[s], t), {})
    );
  }
  cachedItems(e, t) {
    const s = e.get(t);
    if (s) {
      if (s.expiresAt <= Date.now()) {
        e.delete(t);
        return;
      }
      return e.delete(t), e.set(t, s), s.items;
    }
  }
  cacheItems(e, t, s, i) {
    for (e.delete(t), e.set(t, { expiresAt: Date.now() + i, items: s }); e.size > Ze; ) {
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
    const t = e.media_type || e.type || "track", s = this.itemArtist(e).toLowerCase(), i = String(e.name ?? "").toLowerCase(), r = String(e.uri ?? "").toLowerCase();
    return `${t}:${r || `${i}:${s}`}`;
  }
  isFavorite(e) {
    const t = this.favoriteKey(e);
    return this.favoriteItems.some((s) => this.favoriteKey(s) === t);
  }
  normalizedFavorite(e) {
    var s;
    const t = e.media_type || e.type || "track";
    return {
      name: e.name,
      uri: e.uri,
      media_type: t,
      type: t,
      artists: e.artists,
      artist: this.itemArtist(e),
      album: e.album,
      image: e.image || e.thumb || ((s = e.album) == null ? void 0 : s.image),
      thumb: e.thumb
    };
  }
  toggleFavorite(e) {
    const t = this.favoriteKey(e), i = this.favoriteItems.some((r) => this.favoriteKey(r) === t) ? this.favoriteItems.filter((r) => this.favoriteKey(r) !== t) : [this.normalizedFavorite(e), ...this.favoriteItems.filter((r) => this.favoriteKey(r) !== t)];
    this.favoriteItems = i.slice(0, 60), this.writeFavoriteItems(this.favoriteItems);
  }
  rememberPlaybackState() {
    const e = this.activePlayer, t = String((e == null ? void 0 : e.attributes.media_title) ?? ""), s = String(
      (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || ""
    ), i = String(
      (e == null ? void 0 : e.attributes.entity_picture) || (e == null ? void 0 : e.attributes.entity_picture_local) || (e == null ? void 0 : e.attributes.media_image_url) || ""
    );
    if (!e || !t && !i)
      return;
    const r = this.playbackMemory[e.entity_id];
    if (r && r.title === t && r.artist === s && r.artwork === i && r.state === e.state)
      return;
    const a = {
      ...this.playbackMemory,
      [e.entity_id]: {
        title: t,
        artist: s,
        artwork: i,
        state: e.state,
        updatedAt: Date.now()
      }
    };
    this.playbackMemory = a, this.writePlaybackMemory(a);
  }
  scheduleQueueRefreshForPlayback() {
    var i;
    const e = this.playbackPlayer, t = this.queueTargetEntityId();
    if (!e || e.state !== "playing" || !t || !((i = this.hass) != null && i.callWS))
      return;
    const s = [
      t,
      e.attributes.media_content_id,
      e.attributes.media_title
    ].join(":");
    s !== this.lastQueueSignature && (this.lastQueueSignature = s, window.clearTimeout(this.queueRefreshTimer), this.queueRefreshTimer = window.setTimeout(() => {
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
    var i;
    const e = (i = this.activePlayer) == null ? void 0 : i.attributes.group_members;
    if (Array.isArray(e) && e.length > 0)
      return e;
    const t = this.nativeSonosMatch(this.activePlayer), s = t == null ? void 0 : t.attributes.group_members;
    if (Array.isArray(s) && s.length > 1) {
      const r = s.map((a) => {
        var n;
        return (n = this.hass) == null ? void 0 : n.states[a];
      }).map((a) => {
        var c;
        const n = j(String(
          (a == null ? void 0 : a.attributes.friendly_name) ?? (a == null ? void 0 : a.entity_id) ?? ""
        ));
        return (c = this.allPlayers.find((u) => j(String(u.attributes.friendly_name ?? u.entity_id)) === n)) == null ? void 0 : c.entity_id;
      }).filter((a) => !!a);
      if (r.length > 1)
        return r;
    }
    return this.selectedGroupIds.includes(this.activeEntityId) && this.selectedGroupIds.length > 1 ? this.selectedGroupIds : [this.activeEntityId].filter(Boolean);
  }
  nativeSonosMatch(e) {
    if (!e)
      return;
    if (ve(e))
      return e;
    const t = this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id));
    return this.mediaPlayers.find((s) => ve(s) && this.normalizedRoomName(String(s.attributes.friendly_name ?? s.entity_id)) === t);
  }
  isSonosBackedPlayer(e) {
    return !!this.nativeSonosMatch(e);
  }
  get groupablePlayers() {
    const e = this.activePlayer, t = this.isSonosBackedPlayer(e), s = /* @__PURE__ */ new Set();
    return t ? this.allPlayers.filter((i) => {
      if (g(i) || !this.isSonosBackedPlayer(i))
        return !1;
      const r = this.matchingMusicAssistantPlayer(i), a = et(i) || y(i) || !!r, n = (r == null ? void 0 : r.entity_id) ?? i.entity_id;
      return !a || s.has(n) ? !1 : (s.add(n), !0);
    }) : [];
  }
  matchingMusicAssistantPlayer(e) {
    if (!e)
      return;
    const t = new Set(this.config.music_assistant_entities ?? []), s = (n) => t.has(n.entity_id);
    if (!g(e) && (y(e) || s(e)))
      return e;
    const [, i = ""] = e.entity_id.split("."), r = [
      `media_player.${i}_2`,
      `media_player.ma_${i}`,
      `media_player.mass_${i}`,
      `media_player.${i}_music_assistant`
    ], a = this.normalizedRoomName(String(e.attributes.friendly_name ?? e.entity_id));
    return this.mediaPlayers.find((n) => !g(n) && r.includes(n.entity_id) && (y(n) || s(n))) ?? this.mediaPlayers.find((n) => !g(n) && (y(n) || s(n)) && this.normalizedRoomName(String(n.attributes.friendly_name ?? n.entity_id)) === a);
  }
  resolveGroupPlayers(e, t) {
    const s = [e, ...t];
    if (!s.every((u) => this.isSonosBackedPlayer(u)))
      return {
        anchor: e,
        members: [],
        error: "Sonos speakers can only be grouped with other Sonos speakers."
      };
    const r = s.some((u) => y(u)), a = s.some((u) => !y(u));
    if (!r || !a)
      return { anchor: e, members: t };
    const n = this.matchingMusicAssistantPlayer(e), c = t.map((u) => this.matchingMusicAssistantPlayer(u)).filter((u) => !!u);
    if (!n)
      return {
        anchor: e,
        members: [],
        error: `Use the Music Assistant version of ${e.attributes.friendly_name ?? e.entity_id} as the main speaker for mixed groups.`
      };
    if (c.length !== t.length) {
      const u = t.filter((d) => !this.matchingMusicAssistantPlayer(d)).map((d) => d.attributes.friendly_name ?? w(d.entity_id.split(".")[1]));
      return {
        anchor: n,
        members: [],
        error: `Music Assistant is unavailable for ${u.join(", ")}. Choose speakers from the same system instead.`
      };
    }
    return {
      anchor: n,
      members: c.filter((u) => u.entity_id !== n.entity_id)
    };
  }
  service(e, t, s, i) {
    const r = this.hass;
    if (!r)
      return Promise.reject(new Error("Home Assistant is not connected."));
    try {
      return this.withTimeout(
        Promise.resolve(r.callService(e, t, s, i)),
        We,
        `${e}.${t} timed out. Check the speaker connection and try again.`
      );
    } catch (a) {
      return Promise.reject(a);
    }
  }
  mediaService(e, t = {}, s = this.activeEntityId) {
    var r;
    const i = (r = this.hass) == null ? void 0 : r.states[s];
    return !s || g(i) ? Promise.reject(new Error("That speaker is unavailable.")) : this.service("media_player", e, t, {
      entity_id: s
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
    var i;
    if (this.transportPending)
      return;
    const t = this.matchingMusicAssistantPlayer(this.playbackPlayer) ?? this.playbackPlayer ?? this.activePlayer, s = (t == null ? void 0 : t.entity_id) ?? this.playbackEntityId;
    !s || g((i = this.hass) == null ? void 0 : i.states[s]) || (this.transportPending = !0, this.service("media_player", e, {}, {
      entity_id: s
    }).catch((r) => {
      this.playbackError = this.errorMessage(r, "Playback control failed.");
    }).finally(() => {
      this.transportPending = !1, e === "media_next_track" && this.refreshQueueAfterPlayback();
    }));
  }
  setVolume(e) {
    this.setPlayerVolume(this.volumeEntityId, e, !0);
  }
  setPlayerVolume(e, t, s = !1) {
    if (!e)
      return;
    const i = Math.max(0, Math.min(100, Number(t)));
    if (Number.isFinite(i)) {
      if (this.volumeOverrides.set(e, i), this.scheduleVolumeRender(), window.clearTimeout(this.volumeCommitTimers.get(e)), !s) {
        const r = window.setTimeout(() => {
          this.volumeCommitTimers.delete(e), this.commitPlayerVolume(e, i);
        }, 140);
        this.volumeCommitTimers.set(e, r);
        return;
      }
      this.volumeCommitTimers.delete(e), this.commitPlayerVolume(e, i);
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
    } catch (s) {
      this.playbackError = this.errorMessage(s, "Volume control failed.");
    } finally {
      window.clearTimeout(this.volumeResetTimers.get(e));
      const s = window.setTimeout(() => {
        this.volumeResetTimers.delete(e), this.volumeOverrides.delete(e), this.requestUpdate();
      }, 1500);
      this.volumeResetTimers.set(e, s);
    }
  }
  reconcileVolumeOverrides() {
    this.volumeOverrides.forEach((e, t) => {
      var r;
      const s = (r = this.hass) == null ? void 0 : r.states[t], i = Math.round(x(s == null ? void 0 : s.attributes.volume_level, -1) * 100);
      i >= 0 && Math.abs(i - e) <= 1 && (this.volumeOverrides.delete(t), window.clearTimeout(this.volumeResetTimers.get(t)), this.volumeResetTimers.delete(t));
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
    var s;
    const t = (s = this.hass) == null ? void 0 : s.states[e];
    !t || g(t) || (this.playbackError = "", this.service("media_player", "volume_mute", {
      is_volume_muted: !t.attributes.is_volume_muted
    }, {
      entity_id: e
    }).catch((i) => {
      this.playbackError = this.errorMessage(i, "Mute control failed.");
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
      var h;
      return (h = this.hass) == null ? void 0 : h.states[d];
    }).filter((d) => d ? this.groupablePlayers.some((h) => h.entity_id === d.entity_id) : !1);
    if (!e || t.length === 0)
      return;
    const s = this.resolveGroupPlayers(e, t);
    if (s.error) {
      this.groupError = s.error;
      return;
    }
    const i = s.members.map((d) => d.entity_id).filter((d, h, m) => d !== s.anchor.entity_id && m.indexOf(d) === h);
    if (i.length === 0) {
      this.groupError = "Those selected speakers cannot be grouped with this main speaker.";
      return;
    }
    const r = this.selectedEntityId, a = [...this.selectedGroupIds], n = [...this.pendingGroupIds], c = this.activeEntityId, u = t.map((d) => d.entity_id);
    this.groupPending = !0, this.selectedGroupIds = [c, ...u], this.pendingGroupIds = [], this.service("media_player", "join", {
      group_members: i
    }, {
      entity_id: s.anchor.entity_id
    }).then(() => {
      this.writeStorage(z, c);
    }).catch((d) => {
      this.selectedEntityId = r, this.selectedGroupIds = a, this.pendingGroupIds = n, this.groupError = this.errorMessage(d, "Grouping failed.");
    }).finally(() => {
      this.groupPending = !1;
    });
  }
  continueInSelectedRoom() {
    var n, c, u;
    this.groupError = "", this.playbackError = "";
    const e = (n = this.hass) == null ? void 0 : n.states[this.transferTargetEntityId];
    if (!e || g(e) || e.entity_id === this.playbackEntityId || e.entity_id === this.activeEntityId) {
      this.groupError = "Choose one available speaker to move the music to.";
      return;
    }
    const t = e.entity_id, s = this.playbackPlayer, i = ((c = this.matchingMusicAssistantPlayer(s)) == null ? void 0 : c.entity_id) ?? this.playbackEntityId, r = ((u = this.matchingMusicAssistantPlayer(e)) == null ? void 0 : u.entity_id) ?? (e == null ? void 0 : e.entity_id);
    if (!r || !i)
      return;
    const a = () => {
      this.selectedEntityId = t, this.pendingGroupIds = [], this.transferTargetEntityId = "", this.queueItems = [], this.queueError = "", this.lastInitialQueueEntityId = "", this.writeStorage(z, t), this.refreshQueueAfterPlayback();
    };
    this.groupPending = !0, this.service("music_assistant", "transfer_queue", {
      source_player: i,
      auto_play: !0
    }, {
      entity_id: r
    }).then(a).catch(async () => {
      const d = s, h = String((d == null ? void 0 : d.attributes.media_content_id) ?? ""), m = String((d == null ? void 0 : d.attributes.media_content_type) ?? "music");
      if (!h) {
        this.playbackError = "That queue is not available anymore. Pick a song from search to start this room.";
        return;
      }
      try {
        await this.service("music_assistant", "play_media", {
          media_id: h,
          media_type: m,
          enqueue: "play"
        }, {
          entity_id: r
        }), a();
      } catch (b) {
        this.playbackError = this.errorMessage(b, "Playback transfer failed.");
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
    const e = this.groupMembers.map((s) => this.service("media_player", "unjoin", {}, { entity_id: s })), t = () => {
      this.selectedGroupIds = [], this.pendingGroupIds = [], this.groupPending = !1;
    };
    Promise.allSettled(e).then((s) => {
      s.some((i) => i.status === "rejected") && (this.groupError = "Some speakers could not leave the group. Try them individually.");
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
    var i;
    const s = {
      name: e,
      limit: x(this.config.search_limit, v.search_limit),
      library_only: !!(this.config.library_only ?? v.library_only),
      ...t
    };
    return this.config.music_assistant_config_entry_id && (s.config_entry_id = this.config.music_assistant_config_entry_id), !s.media_type && ((i = this.config.search_media_types) != null && i.length) && (s.media_type = this.config.search_media_types), s;
  }
  async fetchMusicAssistantSearch(e) {
    var a;
    if (!((a = this.hass) != null && a.callWS))
      throw new Error("This Home Assistant frontend does not expose service responses here.");
    const t = this.cacheKey(e), s = this.cachedItems(this.searchCache, t);
    if (s)
      return s;
    const i = await this.withTimeout(
      this.hass.callWS({
        type: "call_service",
        domain: "music_assistant",
        service: "search",
        service_data: e,
        return_response: !0
      }),
      Y,
      "Music search timed out. Check Music Assistant and try again."
    ), r = this.extractSearchResults(i);
    return this.cacheItems(this.searchCache, t, r, Ye), r;
  }
  async searchMusicAssistant(e = !1) {
    var i, r;
    const t = this.query.trim();
    if (!t || !((i = this.hass) != null && i.callWS)) {
      (r = this.hass) != null && r.callWS || (this.searchError = "This Home Assistant frontend does not expose service responses here.");
      return;
    }
    const s = ++this.searchRequestId;
    this.searching = !0, this.searchError = "";
    try {
      const a = await this.fetchMusicAssistantSearch(this.musicAssistantSearchData(t));
      if (s !== this.searchRequestId)
        return;
      this.searchResults = a, e || (this.browserView = "results", this.selectedArtist = void 0, this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "", this.playlistTracks = [], this.playlistError = "");
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
      let s = [];
      try {
        s = await this.browseMediaTracks(e, "album");
      } catch {
        s = [];
      }
      if (s.length === 0 && (s = await this.searchAlbumTracks(e)), t !== this.albumRequestId)
        return;
      this.albumTracks = this.dedupeQueueItems(s), this.albumTracks.length === 0 && (this.albumError = "No tracks found for this album.");
    } catch (s) {
      t === this.albumRequestId && (this.albumError = s instanceof Error ? s.message : "Album tracks are unavailable.");
    } finally {
      t === this.albumRequestId && (this.albumLoading = !1);
    }
  }
  async browseMediaTracks(e, t) {
    var c;
    if (!((c = this.hass) != null && c.callWS) || !e.uri)
      return [];
    const s = this.queueTargetEntityId() || this.activeEntityId;
    if (!s)
      return [];
    const i = `${s}:${t}:${e.uri}`, r = this.cachedItems(this.browseCache, i);
    if (r)
      return r;
    const a = await this.withTimeout(
      this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: s,
        media_content_id: e.uri,
        media_content_type: t
      }),
      Y,
      `Loading this ${t} timed out. Try again.`
    ), n = this.extractBrowseTracks(a, e);
    return this.cacheItems(this.browseCache, i, n, Je), n;
  }
  async searchAlbumTracks(e) {
    const t = e.name ?? "", s = this.itemArtist(e), i = s || t;
    if (!i)
      return [];
    const r = this.musicAssistantSearchData(i, {
      album: t,
      limit: Math.max(40, x(this.config.search_limit, v.search_limit)),
      media_type: ["track"]
    });
    return s && (r.artist = s), this.fetchMusicAssistantSearch(r).then((a) => a.filter((n) => (n.media_type || n.type) === "track"));
  }
  async loadPlaylistTracks(e) {
    const t = ++this.playlistRequestId;
    this.playlistTracks = [], this.playlistError = "", this.playlistLoading = !0;
    try {
      const s = await this.browseMediaTracks(e, "playlist");
      if (t !== this.playlistRequestId)
        return;
      this.playlistTracks = this.dedupeQueueItems(s), this.playlistTracks.length === 0 && (this.playlistError = "No tracks found for this playlist.");
    } catch (s) {
      t === this.playlistRequestId && (this.playlistError = s instanceof Error ? s.message : "Playlist tracks are unavailable.");
    } finally {
      t === this.playlistRequestId && (this.playlistLoading = !1);
    }
  }
  extractBrowseTracks(e, t) {
    var c;
    const s = [], i = t.name ?? "", r = this.itemArtist(t), a = t.image || t.thumb || ((c = t.album) == null ? void 0 : c.image) || "", n = (u, d = 0) => {
      if (typeof u != "object" || !u)
        return;
      const h = u, m = this.normalizedMediaType(
        h.media_content_type || h.media_class,
        "track"
      ), b = String(h.media_content_id ?? ""), f = String(h.title ?? h.name ?? ""), q = Array.isArray(h.children) ? h.children : [];
      d > 0 && !!b && !!f && (m === "track" || String(h.media_class ?? "").toLowerCase().includes("track") || h.can_play && !h.can_expand && m !== "album") && s.push({
        name: f,
        uri: b,
        media_type: "track",
        type: "track",
        artist: r,
        album: i ? { name: i, image: a } : t.album,
        image: String(h.thumbnail ?? h.image ?? a) || void 0
      }), q.forEach((k) => n(k, d + 1));
    };
    return n(e), s;
  }
  extractSearchResults(e) {
    const s = e.response ?? e, i = ["tracks", "albums", "artists", "playlists", "radio", "podcasts"], r = [];
    return i.forEach((a) => {
      const n = s[a];
      Array.isArray(n) && n.forEach((c) => {
        typeof c == "object" && c && r.push(this.normalizeSearchItem(c, a === "tracks" ? "track" : a.slice(0, -1)));
      });
    }), r;
  }
  normalizedMediaType(e, t) {
    const s = String(e ?? "").toLowerCase();
    return s.includes("album") ? "album" : s.includes("artist") ? "artist" : s.includes("playlist") ? "playlist" : s.includes("radio") ? "radio" : s.includes("podcast") ? "podcast" : s.includes("track") || s.includes("song") ? "track" : t;
  }
  normalizeSearchItem(e, t) {
    const s = typeof e.album == "object" && e.album ? e.album : void 0, i = Array.isArray(e.artists) ? e.artists : void 0, r = this.normalizedMediaType(e.media_type ?? e.type, t), a = String(
      e.image ?? e.thumb ?? e.thumbnail ?? e.image_url ?? e.uri_image ?? (s == null ? void 0 : s.image) ?? ""
    );
    return {
      ...e,
      name: String(e.name ?? e.title ?? e.media_title ?? e.uri ?? ""),
      uri: String(e.uri ?? e.media_id ?? e.media_content_id ?? "") || void 0,
      media_type: r,
      type: r,
      artists: i,
      artist: String(e.artist ?? e.media_artist ?? (i == null ? void 0 : i.map((n) => n.name).filter(Boolean).join(", ")) ?? ""),
      album: s,
      image: a || void 0
    };
  }
  queueTargetEntityId() {
    const e = this.matchingMusicAssistantPlayer(this.activePlayer);
    return e && !g(e) ? e.entity_id : "";
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
    var i;
    const t = this.queueTargetEntityId(), s = ++this.queueRequestId;
    if (!t || !((i = this.hass) != null && i.callWS)) {
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
              target: { entity_id: t },
              return_response: !0
            }),
            Y,
            "Queue refresh timed out. Check Music Assistant and try again."
          );
          if (s !== this.queueRequestId || t !== this.queueTargetEntityId())
            return;
          a = !0;
          const u = this.extractQueueItems(c, t);
          if (u.length > 0) {
            this.queueItems = u, this.queueError = "";
            return;
          }
        } catch (c) {
          if (s !== this.queueRequestId)
            return;
          r.push(c instanceof Error ? c.message : `${n.domain}.${n.service} failed.`);
        }
      if (s !== this.queueRequestId || t !== this.queueTargetEntityId())
        return;
      this.queueItems = [], this.queueError = a ? "" : r.length > 0 ? "Could not load this speaker’s queue. Retry in a moment." : "Queue is empty or unavailable for this Music Assistant player.";
    } finally {
      s === this.queueRequestId && (this.queueLoading = !1);
    }
  }
  extractQueueItems(e, t = "") {
    const s = this.responsePayload(e), i = this.queueResponseRoots(s, t);
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
        const u = this.queueItemsFromUnknown(c).filter((d) => !a || !this.sameQueueItem(d, a));
        if (u.length > 0)
          return this.dedupeQueueItems(u);
      }
    }
    return [];
  }
  queueResponseRoots(e, t) {
    const s = [e];
    if (typeof e == "object" && e) {
      const i = e;
      t && i[t] && s.unshift(i[t]), Object.entries(i).forEach(([r, a]) => {
        (r.startsWith("media_player.") || typeof a == "object" && a && ("current_item" in a || "next_item" in a || "queue_items" in a || "items" in a)) && s.push(a);
      });
    }
    return s.filter((i, r, a) => a.indexOf(i) === r);
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
      const t = e, s = ["next_items", "upcoming_items", "items", "queue_items", "queue", "next_item"];
      for (const r of s) {
        const a = this.queueItemsFromUnknown(t[r]);
        if (a.length > 0)
          return a;
      }
      const i = this.normalizeQueueItem(t);
      if (i)
        return [i];
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
    const s = (typeof t.media_item == "object" && t.media_item ? t.media_item : void 0) ?? (typeof t.item == "object" && t.item ? t.item : void 0) ?? t, i = typeof s.album == "object" && s.album ? s.album : void 0, r = Array.isArray(s.artists) ? s.artists : void 0, a = String(
      s.name ?? t.name ?? t.title ?? t.media_title ?? ""
    ), n = String(s.uri ?? t.uri ?? t.media_id ?? t.media_content_id ?? ""), c = this.normalizedMediaType(s.media_type ?? t.media_type ?? t.type, "track"), u = String(
      s.image ?? t.image ?? t.thumbnail ?? t.entity_picture ?? t.media_image ?? t.local_image_encoded ?? (i == null ? void 0 : i.image) ?? ""
    );
    if (!(!a && !n))
      return {
        name: a || n,
        uri: n || void 0,
        media_type: c,
        type: c,
        artists: r,
        artist: String(s.artist ?? t.artist ?? t.media_artist ?? ""),
        album: i,
        image: u || void 0,
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
  sameQueueItem(e, t) {
    return e.queue_item_id && t.queue_item_id ? e.queue_item_id === t.queue_item_id : e.uri && t.uri ? e.uri === t.uri : !!(e.name && t.name && e.name === t.name && (e.artist ?? "") === (t.artist ?? ""));
  }
  itemArtist(e) {
    var t;
    return String(
      e.artist || ((t = e.artists) == null ? void 0 : t.map((s) => s.name).filter(Boolean).join(", ")) || ""
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
    }, Xe);
  }
  retryLastPlayback() {
    const e = this.lastPlaybackRequest;
    !e || this.playbackPending || this.playSearchResult(e.item, e.enqueue);
  }
  playSearchResult(e, t) {
    if (this.playbackPending)
      return;
    this.playbackError = "";
    const s = e.uri || e.name;
    if (!s)
      return;
    const i = t ?? this.config.enqueue_mode ?? v.enqueue_mode, r = (i === "next" || i === "add") && !this.isPlaying ? "play" : i, a = this.matchingMusicAssistantPlayer(this.activePlayer), n = (a == null ? void 0 : a.entity_id) ?? "", c = this.activeEntityId;
    if (!a || !n) {
      this.playbackError = `No Music Assistant player matches ${this.activeName || "the selected speaker"}. Add its Music Assistant entity in the card settings.`;
      return;
    }
    this.playbackPending = !0, this.writeStorage(z, c), this.lastPlaybackRequest = { item: e, enqueue: t };
    const u = String(a.attributes.friendly_name ?? this.activeName ?? "speaker"), d = r !== "next" && r !== "add";
    d ? this.startPlaybackFeedback(e, u) : (this.clearPlaybackFeedback(), this.playbackStatus = `Adding ${e.name ?? "item"} to the queue…`);
    const h = e.media_type || e.type || "track", m = {
      media_id: s,
      media_type: h,
      enqueue: r
    }, b = this.itemArtist(e), f = this.itemAlbum(e);
    b && !String(s).includes("://") && (h === "track" || h === "album") && (m.artist = b), f && !String(s).includes("://") && h === "track" && (m.album = f), (async () => {
      let q = !1;
      try {
        await this.service("music_assistant", "play_media", m, {
          entity_id: n
        }), q = !0;
      } catch (ae) {
        if (r === "next")
          try {
            await this.service("music_assistant", "play_media", {
              media_id: s,
              media_type: h,
              enqueue: "add"
            }, {
              entity_id: n
            }), q = !0;
          } catch (k) {
            this.playbackError = this.errorMessage(k, "Music Assistant queue add failed.");
          }
        else if (e.uri && e.name) {
          const k = {
            media_id: e.name,
            media_type: h,
            enqueue: r
          };
          b && (h === "track" || h === "album") && (k.artist = b), f && h === "track" && (k.album = f);
          try {
            await this.service("music_assistant", "play_media", k, {
              entity_id: n
            }), q = !0;
          } catch (Se) {
            this.playbackError = `Could not play ${e.name} on ${a.attributes.friendly_name ?? n}: ${this.errorMessage(Se, "no playable result was found")}`;
          }
        } else
          this.playbackError = `Could not play this item on ${a.attributes.friendly_name ?? n}: ${this.errorMessage(ae, "Music Assistant playback failed.")}`;
      } finally {
        this.playbackPending = !1, q ? d && !this.isPlaying ? this.playbackStatus = `Connecting to ${u}…` : d || (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0) : (this.clearPlaybackFeedback(), this.optimisticPlaybackItem = void 0), this.refreshQueueAfterPlayback();
      }
    })();
  }
  queueSearchResult(e) {
    this.playSearchResult(e, "add");
  }
  playQueueItem(e) {
    const t = e.queue_item_id, s = this.queueTargetEntityId();
    if (!t || !s || this.playbackPending) {
      this.playSearchResult(e, "play");
      return;
    }
    this.playbackPending = !0, this.playbackError = "", this.service("mass_queue", "play_queue_item", {
      entity: s,
      queue_item_id: t
    }).catch((i) => {
      this.playbackError = this.errorMessage(i, "Queue item playback failed.");
    }).finally(() => {
      this.playbackPending = !1, this.refreshQueueAfterPlayback();
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
    const s = e.attributes.friendly_name ?? w(e.entity_id.split(".")[1]);
    return t.filter((r) => (r.attributes.friendly_name ?? w(r.entity_id.split(".")[1])).trim().toLowerCase() === s.trim().toLowerCase()).length < 2 ? s : y(e) ? `${s} (Music Assistant)` : Array.isArray(e.attributes.group_members) ? `${s} (Sonos)` : `${s} (${e.entity_id.split(".")[1]})`;
  }
  playerQuickStatus(e) {
    return g(e) ? "Offline" : e.state === "playing" ? "Playing" : e.state === "paused" ? "Paused" : e.state === "buffering" ? "Connecting" : "Ready";
  }
  selectPlayer(e) {
    var i;
    const t = (i = this.hass) == null ? void 0 : i.states[e];
    this.selectedEntityId = e, this.writeStorage(z, e);
    const s = t == null ? void 0 : t.attributes.group_members;
    this.selectedGroupIds = Array.isArray(s) ? [...s] : [e], this.pendingGroupIds = [], this.transferTargetEntityId = "", this.queueItems = [], this.queueError = "", this.queueLoading = !1, this.queueRequestId += 1, this.lastQueueSignature = "", this.lastInitialQueueEntityId = "", window.clearTimeout(this.queueRefreshTimer), window.clearTimeout(this.queueRefreshRetryTimer), window.clearTimeout(this.initialQueueRefreshTimer), this.activeTab === "queue" && this.refreshQueue();
  }
  renderPlayerPicker(e, t = !1) {
    return l`
      <div class="room-picker ${t ? "header-picker" : ""}" role="tablist" aria-label="Music Assistant speakers">
        ${e.map((s) => {
      const i = s.entity_id === this.activeEntityId, r = this.playerQuickStatus(s);
      return l`
            <button
              class="room-option ${i ? "active" : ""} ${g(s) ? "offline" : ""}"
              role="tab"
              aria-selected=${String(i)}
              title=${`${this.playerPickerLabel(s, e)} — ${r}`}
              @click=${() => this.selectPlayer(s.entity_id)}
            >
              <span class="room-status-dot" aria-hidden="true"></span>
              <span class="room-option-copy">
                <span class="room-option-name">${this.playerPickerLabel(s, e)}</span>
                <span class="room-option-status">${r}</span>
              </span>
            </button>
          `;
    })}
      </div>
    `;
  }
  renderHeaderIdentity() {
    const e = this.allPlayers;
    return l`
      <div class="title">
        ${e.length > 1 ? this.renderPlayerPicker(e, !0) : l`<span class="name">${this.activeName || "Sonos"}</span>`}
      </div>
    `;
  }
  renderTopControls(e, t) {
    return l`
      <div class="top-controls">
        <span class="header-state">${e ? "Unavailable" : w((t == null ? void 0 : t.state) ?? "idle")}</span>
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
    const e = this.allPlayers.filter((t) => t.entity_id !== this.activeEntityId && t.entity_id !== this.playbackEntityId && !g(t) && !!this.matchingMusicAssistantPlayer(t));
    return e.length === 0 ? p : l`
      <section class="transfer-panel">
        <span class="section-title">Move Music</span>
        <div class="transfer-row">
          <select
            aria-label="Move music to speaker"
            .value=${this.transferTargetEntityId}
            @change=${(t) => {
      this.transferTargetEntityId = t.target.value;
    }}
          >
            <option value="">Choose a speaker</option>
            ${e.map((t) => l`
              <option value=${t.entity_id}>
                ${t.attributes.friendly_name ?? w(t.entity_id.split(".")[1])}
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
    const e = this.groupablePlayers;
    if (!this.config.show_grouping || e.length < 2)
      return p;
    const t = e.some((a) => a.entity_id === this.activeEntityId) || !!this.matchingMusicAssistantPlayer(this.activePlayer), s = this.pendingGroupIds.filter((a) => {
      var c;
      const n = (c = this.hass) == null ? void 0 : c.states[a];
      return a !== this.activeEntityId && e.some((u) => u.entity_id === (n == null ? void 0 : n.entity_id));
    }).length, i = this.groupMembers.length, r = i > 1;
    return l`
      <section class="grouping">
        <span class="section-title">Group Sonos</span>
        ${this.groupError ? l`<div class="error">${this.groupError}</div>` : p}
        <div class="group-row">
          ${e.map((a) => {
      const n = this.selectedGroupIds.includes(a.entity_id) || this.groupMembers.includes(a.entity_id), c = this.pendingGroupIds.includes(a.entity_id), u = n || c, d = a.entity_id === this.activeEntityId;
      return l`
	              <button
	                class="group-chip ${u ? "active" : ""} ${d ? "anchor" : ""}"
	                ?disabled=${d || this.groupPending}
                  title=${d ? "Current room" : u ? "Remove from selection" : "Add to selection"}
                @click=${() => this.toggleGroupSelection(a.entity_id)}
              >
                <span class="group-check">${u ? "✓" : ""}</span>
                <span class="group-name">
                  ${a.attributes.friendly_name ?? w(a.entity_id.split(".")[1])}
                </span>
                <span class="group-status">${d ? "This room" : n ? "In group" : c ? "Selected" : "Available"}</span>
              </button>
            `;
    })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !t || s === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Group Selected</span>
            <span class="group-status">
              ${t ? `${s} room${s === 1 ? "" : "s"}` : "Cannot group this speaker"}
            </span>
          </button>
          <button
            class="group-chip action ungroup"
            ?disabled=${this.groupPending || !r}
            title="Make this room leave the current speaker group"
            @click=${this.ungroupActive}
          >
            <span class="group-check">×</span>
            <span class="group-name">Leave Group</span>
            <span class="group-status">${r ? "This room only" : "No group active"}</span>
          </button>
          <button
            class="group-chip action clear"
            ?disabled=${this.groupPending || !r}
            title="Ungroup every room in the current speaker group"
            @click=${this.ungroupAll}
          >
            <span class="group-check">×</span>
            <span class="group-name">Ungroup All</span>
            <span class="group-status">${r ? `${i} rooms` : "No group active"}</span>
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
    ) : p}
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
          ${this.queueItems.length > 0 ? l`<span class="tab-count">${Math.min(this.queueItems.length, 99)}</span>` : p}
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
    const i = this.artworkUrl, r = !i && e === "No music selected";
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
                ` : p}
            <div class="metadata">
              <span class="track">${e}</span>
              <span class="artist">${r ? "Browse Music Assistant or choose a room" : t}</span>
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
          ${r ? p : this.renderUpNextPreview()}
        </div>
      </section>
    `;
  }
  renderUpNextPreview() {
    const e = this.queueItems.slice(0, 3);
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
                ${e.map((t, s) => this.renderQueueItem(t, s, !0))}
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
      this.activeTab = "search";
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
    const s = String(
      (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || ((a = this.activeMemory) == null ? void 0 : a.artist) || ""
    ), i = this.artworkUrl;
    return l`
      <div class="queue-current">
        <div class="queue-current-art" style=${i ? `background-image: url("${i}")` : ""}>
          ${i ? p : l`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </div>
        <span class="queue-current-meta">
          <span class="queue-now-label">Now playing</span>
          <span class="queue-current-title">${t}</span>
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
        ${this.searchError ? l`<div class="error">${this.searchError}</div>` : p}
        ${this.searching ? l`<div class="hint">Searching...</div>` : p}
        ${this.searchResults.length > 0 ? this.browserView === "artist" ? this.renderArtistView() : this.browserView === "album" ? this.renderAlbumView() : this.browserView === "playlist" ? this.renderPlaylistView() : this.renderResults() : p}
        ${this.config.show_queue_hint ? l`<div class="hint">Tap a song to play it, or choose Play next to add it to the queue.</div>` : p}
      </section>
    ` : p;
  }
  itemsByType(e) {
    return this.searchResults.filter((t) => (t.media_type || t.type) === e);
  }
  renderFavorites() {
    return this.favoriteItems.length === 0 ? p : l`
      <section class="favorites">
        <span class="section-header">Favorites</span>
        ${this.favoriteItems.map((e) => {
      const t = e.media_type || e.type || "track", s = t === "artist" ? "artist" : t === "album" ? "album" : t === "playlist" ? "playlist" : "play";
      return this.renderResultItem(e, s, "favorites");
    })}
      </section>
    `;
  }
  renderResultSection(e, t, s = "play", i = !0, r = "search") {
    if (t.length === 0)
      return p;
    const a = i ? t.slice(0, x(this.config.search_limit, v.search_limit)) : t;
    return l`
      <section class="result-section">
        <span class="section-header">${e}</span>
        ${a.map((n) => this.renderResultItem(n, s, r))}
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
        ${this.renderResultSection("Songs", this.itemsByType("track"), "play", !0, "artist")}
        ${this.renderResultSection("Albums", this.itemsByType("album"), "album", !0, "artist")}
        ${this.renderResultSection("Playlists", this.itemsByType("playlist"), "playlist", !0, "artist")}
      </div>
    `;
  }
  renderAlbumView() {
    const e = this.selectedAlbum, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", s = (e == null ? void 0 : e.name) ?? this.query, i = this.albumTracks.length > 0 ? this.albumTracks : this.itemsByType("track").filter((r) => !s || this.itemAlbum(r).toLowerCase() === s.toLowerCase());
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
          ${e ? l`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(e, "play")}
                >
                  Play Album
                </button>
              ` : p}
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedAlbum = void 0, this.selectedPlaylist = void 0, this.albumTracks = [], this.albumError = "";
    }}>
            Back
          </button>
        </div>
        ${this.albumLoading ? l`<div class="hint">Loading album tracks...</div>` : p}
        ${this.albumError ? l`<div class="error">${this.albumError}</div>` : p}
        ${this.renderResultSection("Songs", i, "play", !1, "album")}
      </div>
    `;
  }
  renderPlaylistView() {
    const e = this.selectedPlaylist, t = (e == null ? void 0 : e.image) || (e == null ? void 0 : e.thumb) || "", s = (e == null ? void 0 : e.name) ?? this.query;
    return l`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${t ? `background-image: url("${t}")` : ""}
          ></div>
          <div class="result-main">
            <span class="result-name">${s}</span>
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
          <button class="small-action" @click=${() => {
      this.browserView = "results", this.selectedPlaylist = void 0, this.playlistTracks = [], this.playlistError = "";
    }}>
            Back
          </button>
        </div>
        ${this.playlistLoading ? l`<div class="hint">Loading playlist tracks...</div>` : p}
        ${this.playlistError ? l`<div class="error">${this.playlistError}</div>` : p}
        ${this.renderResultSection("Songs", this.playlistTracks, "play", !1, "playlist")}
      </div>
    `;
  }
  renderSpeakers() {
    return l`
      <section class="speakers">
        ${this.renderCurrentGroup()}
        ${this.renderTransferPlayback()}
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
        ${this.showVolumeMixer ? l`
              <div class="speaker-list">
                ${this.allPlayers.map((e) => {
      const t = g(e), s = Math.round(x(e.attributes.volume_level, 0) * 100), i = this.volumeOverrides.get(e.entity_id) ?? s;
      return l`
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
                        .value=${String(i)}
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
                      <span class="state">${i}%</span>
                    </div>
                  `;
    })}
              </div>
            ` : p}
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
  renderResultItem(e, t = "play", s = "search") {
    var u, d, h;
    const i = e.artist || ((u = e.artists) == null ? void 0 : u.map((m) => m.name).filter(Boolean).join(", ")) || ((d = e.album) == null ? void 0 : d.name) || e.media_type || e.type || "", r = e.image || e.thumb || ((h = e.album) == null ? void 0 : h.image) || "", a = this.isFavorite(e), n = () => this.playSearchResult(e, "play");
    return l`
      <div class="result clickable" @click=${t === "artist" ? () => this.openArtist(e) : t === "album" ? () => this.openAlbum(e) : t === "playlist" ? () => this.openPlaylist(e) : n}>
        <div
          class="result-art"
          style=${r ? `background-image: url("${r}")` : ""}
        ></div>
        <div class="result-main">
          <span class="result-name">${e.name ?? e.uri ?? "Untitled"}</span>
          <span class="result-sub">${i}</span>
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
      m.stopPropagation(), n();
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
  renderQueueItem(e, t = 0, s = !1) {
    var n, c, u;
    const i = e.artist || ((n = e.artists) == null ? void 0 : n.map((d) => d.name).filter(Boolean).join(", ")) || ((c = e.album) == null ? void 0 : c.name) || e.media_type || e.type || "", r = e.image || e.thumb || ((u = e.album) == null ? void 0 : u.image) || "", a = e.name ?? e.uri ?? "Untitled";
    return l`
      <button
        class="queue-item ${s ? "compact" : ""}"
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
          <span class="queue-item-subtitle">${i || "Music Assistant"}</span>
        </span>
        <span class="queue-play" aria-hidden="true">
          <ha-icon .icon=${"mdi:play"}></ha-icon>
        </span>
      </button>
    `;
  }
  render() {
    var u;
    if (!this.config)
      return l``;
    const e = this.playbackPlayer, t = this.activePlayer, s = this.activeMemory, i = this.optimisticPlaybackItem, r = g(t), a = this.artworkUrl ? `url("${this.artworkUrl}")` : "none", n = (e == null ? void 0 : e.attributes.media_title) || (i == null ? void 0 : i.name) || (s == null ? void 0 : s.title) || "No music selected", c = (e == null ? void 0 : e.attributes.media_artist) || (e == null ? void 0 : e.attributes.media_album_name) || (e == null ? void 0 : e.attributes.source) || (i ? this.itemArtist(i) : "") || (s == null ? void 0 : s.artist) || "Ready";
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
            ${this.renderTopControls(r, e)}
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(n, c, r)}
          <div class="volume-row">
            <button class="icon-button" aria-label="Mute speaker" ?disabled=${r} @click=${this.toggleMute}>
              <ha-icon .icon=${(u = this.isPlaying ? this.playbackPlayer : this.activePlayer) != null && u.attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${r}
              aria-label="Speaker volume"
              @input=${(d) => {
      const h = this.updateVolumeLabel(d);
      this.setPlayerVolume(this.volumeEntityId, h);
    }}
              @change=${(d) => this.setVolume(this.updateVolumeLabel(d))}
            />
            <span class="state">${this.volume}%</span>
          </div>
          ${this.renderPlaybackFeedback()}
          ${this.renderTabs()}
          <div class="tab-content">
            ${this.activeTab === "now" ? this.renderNowPlaying(n, c, r) : this.activeTab === "search" ? this.renderSearch() : this.activeTab === "queue" ? this.renderQueue() : this.renderSpeakers()}
          </div>
        </div>
      </ha-card>
    `;
  }
};
ie.properties = {
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
  transferTargetEntityId: { state: !0 }
};
let Z = ie;
customElements.get("gamma-sonos-player-card") || customElements.define("gamma-sonos-player-card", Z);
const re = class re extends T {
  constructor() {
    super(...arguments), this.config = {};
  }
  static get styles() {
    return _e`
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
  setConfig(e) {
    this.config = { ...e };
  }
  updateConfig(e) {
    const t = { ...this.config, ...e };
    Object.keys(t).forEach((s) => {
      const i = s;
      t[i] === "" && delete t[i];
    }), this.config = t, tt(this, t);
  }
  autoConfigureMusicAssistantPlayers() {
    var a;
    const t = Object.values(((a = this.hass) == null ? void 0 : a.states) ?? {}).filter((n) => !!n).filter((n) => y(n) && !g(n)), s = this.config.entities ?? [], r = (s.length > 0 ? s.map((n) => {
      var d, h;
      const c = (d = this.hass) == null ? void 0 : d.states[n];
      if (!c || g(c) || y(c))
        return n;
      const u = j(String(c.attributes.friendly_name ?? c.entity_id));
      return ((h = t.find((m) => j(String(m.attributes.friendly_name ?? m.entity_id)) === u)) == null ? void 0 : h.entity_id) ?? n;
    }) : t.map((n) => n.entity_id)).filter((n, c, u) => u.indexOf(n) === c);
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
      var c;
      const s = (c = this.hass) == null ? void 0 : c.states[t], i = g(s), r = !!(s && y(s) && !i), a = r ? "Ready" : i ? "Offline" : "Needs MA", n = r ? "ready" : i ? "offline" : "needs-ma";
      return l`
            <div class="setup-player">
              <span class="setup-player-name">${(s == null ? void 0 : s.attributes.friendly_name) ?? w(t.split(".")[1] ?? t)}</span>
              <span class="setup-badge ${n}">${a}</span>
            </div>
          `;
    })}
      </div>
    `;
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
            ${this.renderSwitch("Library Only", "library_only", !1)}
          </div>
        </section>
      </div>
    `;
  }
};
re.properties = {
  hass: { attribute: !1 },
  config: { state: !0 }
};
let X = re;
customElements.get("gamma-sonos-player-card-editor") || customElements.define("gamma-sonos-player-card-editor", X);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: !0,
  type: "gamma-sonos-player-card",
  name: "Gamma Sonos Player",
  description: "A Sonos and Music Assistant player card with search and grouping."
});
//# sourceMappingURL=gamma-sonos-player.js.map
