// Here's the code I used to make it: https://github.com/davidfitzgibbon/basement-vercel

const Ud = function () {
	const e = document.createElement("link").relList;
	if (e && e.supports && e.supports("modulepreload")) return;
	for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
	new MutationObserver((i) => {
		for (const r of i)
			if (r.type === "childList")
				for (const o of r.addedNodes)
					o.tagName === "LINK" && o.rel === "modulepreload" && n(o);
	}).observe(document, { childList: !0, subtree: !0 });
	function t(i) {
		const r = {};
		return (
			i.integrity && (r.integrity = i.integrity),
			i.referrerpolicy && (r.referrerPolicy = i.referrerpolicy),
			i.crossorigin === "use-credentials"
				? (r.credentials = "include")
				: i.crossorigin === "anonymous"
				? (r.credentials = "omit")
				: (r.credentials = "same-origin"),
			r
		);
	}
	function n(i) {
		if (i.ep) return;
		i.ep = !0;
		const r = t(i);
		fetch(i.href, r);
	}
};
Ud();
/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */ const po = "137",
	jn = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 },
	$n = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 },
	Ah = 0,
	wa = 1,
	Ch = 2,
	Hd = 3,
	Gd = 0,
	rl = 1,
	Rh = 2,
	qi = 3,
	ai = 0,
	lt = 1,
	In = 2,
	sl = 1,
	kd = 2,
	fn = 0,
	Zi = 1,
	ro = 2,
	Sa = 3,
	Ta = 4,
	Lh = 5,
	Qn = 100,
	Ph = 101,
	Dh = 102,
	Ea = 103,
	Aa = 104,
	Ih = 200,
	Fh = 201,
	Bh = 202,
	zh = 203,
	ol = 204,
	al = 205,
	Nh = 206,
	Oh = 207,
	Uh = 208,
	Hh = 209,
	Gh = 210,
	kh = 0,
	Vh = 1,
	Wh = 2,
	so = 3,
	qh = 4,
	Xh = 5,
	Yh = 6,
	Zh = 7,
	jr = 0,
	Jh = 1,
	jh = 2,
	pn = 0,
	$h = 1,
	Kh = 2,
	Qh = 3,
	ll = 4,
	eu = 5,
	mo = 300,
	mi = 301,
	gi = 302,
	Ir = 303,
	Fr = 304,
	ur = 306,
	$r = 307,
	Br = 1e3,
	wt = 1001,
	zr = 1002,
	et = 1003,
	oo = 1004,
	Vd = 1004,
	ao = 1005,
	Wd = 1005,
	Ye = 1006,
	cl = 1007,
	qd = 1007,
	xi = 1008,
	Xd = 1008,
	mn = 1009,
	tu = 1010,
	nu = 1011,
	$i = 1012,
	iu = 1013,
	Rr = 1014,
	dn = 1015,
	ii = 1016,
	ru = 1017,
	su = 1018,
	ri = 1020,
	ou = 1021,
	au = 1022,
	ct = 1023,
	lu = 1024,
	cu = 1025,
	Ln = 1026,
	li = 1027,
	hu = 1028,
	uu = 1029,
	du = 1030,
	fu = 1031,
	pu = 1033,
	Ks = 33776,
	Qs = 33777,
	eo = 33778,
	to = 33779,
	Ca = 35840,
	Ra = 35841,
	La = 35842,
	Pa = 35843,
	mu = 36196,
	Da = 37492,
	Ia = 37496,
	Fa = 37808,
	Ba = 37809,
	za = 37810,
	Na = 37811,
	Oa = 37812,
	Ua = 37813,
	Ha = 37814,
	Ga = 37815,
	ka = 37816,
	Va = 37817,
	Wa = 37818,
	qa = 37819,
	Xa = 37820,
	Ya = 37821,
	Za = 36492,
	gu = 2200,
	xu = 2201,
	yu = 2202,
	Nr = 2300,
	Or = 2301,
	no = 2302,
	ei = 2400,
	ti = 2401,
	Ur = 2402,
	go = 2500,
	hl = 2501,
	vu = 0,
	Yd = 1,
	Zd = 2,
	gn = 3e3,
	$e = 3001,
	_u = 3200,
	bu = 3201,
	yi = 0,
	Mu = 1,
	Jd = 0,
	io = 7680,
	jd = 7681,
	$d = 7682,
	Kd = 7683,
	Qd = 34055,
	ef = 34056,
	tf = 5386,
	nf = 512,
	rf = 513,
	sf = 514,
	of = 515,
	af = 516,
	lf = 517,
	cf = 518,
	wu = 519,
	Ki = 35044,
	Qi = 35048,
	hf = 35040,
	uf = 35045,
	df = 35049,
	ff = 35041,
	pf = 35046,
	mf = 35050,
	gf = 35042,
	xf = "100",
	Ja = "300 es",
	lo = 1035;
class bn {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		const n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		if (this._listeners === void 0) return !1;
		const n = this._listeners;
		return n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		if (this._listeners === void 0) return;
		const i = this._listeners[e];
		if (i !== void 0) {
			const r = i.indexOf(t);
			r !== -1 && i.splice(r, 1);
		}
	}
	dispatchEvent(e) {
		if (this._listeners === void 0) return;
		const n = this._listeners[e.type];
		if (n !== void 0) {
			e.target = this;
			const i = n.slice(0);
			for (let r = 0, o = i.length; r < o; r++) i[r].call(this, e);
			e.target = null;
		}
	}
}
const bt = [];
for (let s = 0; s < 256; s++) bt[s] = (s < 16 ? "0" : "") + s.toString(16);
let cs = 1234567;
const si = Math.PI / 180,
	Hr = 180 / Math.PI;
function It() {
	const s = (Math.random() * 4294967295) | 0,
		e = (Math.random() * 4294967295) | 0,
		t = (Math.random() * 4294967295) | 0,
		n = (Math.random() * 4294967295) | 0;
	return (
		bt[s & 255] +
		bt[(s >> 8) & 255] +
		bt[(s >> 16) & 255] +
		bt[(s >> 24) & 255] +
		"-" +
		bt[e & 255] +
		bt[(e >> 8) & 255] +
		"-" +
		bt[((e >> 16) & 15) | 64] +
		bt[(e >> 24) & 255] +
		"-" +
		bt[(t & 63) | 128] +
		bt[(t >> 8) & 255] +
		"-" +
		bt[(t >> 16) & 255] +
		bt[(t >> 24) & 255] +
		bt[n & 255] +
		bt[(n >> 8) & 255] +
		bt[(n >> 16) & 255] +
		bt[(n >> 24) & 255]
	).toUpperCase();
}
function Mt(s, e, t) {
	return Math.max(e, Math.min(t, s));
}
function ul(s, e) {
	return ((s % e) + e) % e;
}
function yf(s, e, t, n, i) {
	return n + ((s - e) * (i - n)) / (t - e);
}
function vf(s, e, t) {
	return s !== e ? (t - s) / (e - s) : 0;
}
function Lr(s, e, t) {
	return (1 - t) * s + t * e;
}
function _f(s, e, t, n) {
	return Lr(s, e, 1 - Math.exp(-t * n));
}
function bf(s, e = 1) {
	return e - Math.abs(ul(s, e * 2) - e);
}
function Mf(s, e, t) {
	return s <= e
		? 0
		: s >= t
		? 1
		: ((s = (s - e) / (t - e)), s * s * (3 - 2 * s));
}
function wf(s, e, t) {
	return s <= e
		? 0
		: s >= t
		? 1
		: ((s = (s - e) / (t - e)), s * s * s * (s * (s * 6 - 15) + 10));
}
function Sf(s, e) {
	return s + Math.floor(Math.random() * (e - s + 1));
}
function Tf(s, e) {
	return s + Math.random() * (e - s);
}
function Ef(s) {
	return s * (0.5 - Math.random());
}
function Af(s) {
	return (
		s !== void 0 && (cs = s % 2147483647),
		(cs = (cs * 16807) % 2147483647),
		(cs - 1) / 2147483646
	);
}
function Cf(s) {
	return s * si;
}
function Rf(s) {
	return s * Hr;
}
function ja(s) {
	return (s & (s - 1)) === 0 && s !== 0;
}
function Su(s) {
	return Math.pow(2, Math.ceil(Math.log(s) / Math.LN2));
}
function Tu(s) {
	return Math.pow(2, Math.floor(Math.log(s) / Math.LN2));
}
function Lf(s, e, t, n, i) {
	const r = Math.cos,
		o = Math.sin,
		a = r(t / 2),
		l = o(t / 2),
		c = r((e + n) / 2),
		h = o((e + n) / 2),
		u = r((e - n) / 2),
		d = o((e - n) / 2),
		f = r((n - e) / 2),
		m = o((n - e) / 2);
	switch (i) {
		case "XYX":
			s.set(a * h, l * u, l * d, a * c);
			break;
		case "YZY":
			s.set(l * d, a * h, l * u, a * c);
			break;
		case "ZXZ":
			s.set(l * u, l * d, a * h, a * c);
			break;
		case "XZX":
			s.set(a * h, l * m, l * f, a * c);
			break;
		case "YXY":
			s.set(l * f, a * h, l * m, a * c);
			break;
		case "ZYZ":
			s.set(l * m, l * f, a * h, a * c);
			break;
		default:
			console.warn(
				"THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
					i
			);
	}
}
var $l = Object.freeze({
	__proto__: null,
	DEG2RAD: si,
	RAD2DEG: Hr,
	generateUUID: It,
	clamp: Mt,
	euclideanModulo: ul,
	mapLinear: yf,
	inverseLerp: vf,
	lerp: Lr,
	damp: _f,
	pingpong: bf,
	smoothstep: Mf,
	smootherstep: wf,
	randInt: Sf,
	randFloat: Tf,
	randFloatSpread: Ef,
	seededRandom: Af,
	degToRad: Cf,
	radToDeg: Rf,
	isPowerOfTwo: ja,
	ceilPowerOfTwo: Su,
	floorPowerOfTwo: Tu,
	setQuaternionFromProperEuler: Lf
});
class G {
	constructor(e = 0, t = 0) {
		(this.x = e), (this.y = t);
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return (this.x = e), (this.y = t), this;
	}
	setScalar(e) {
		return (this.x = e), (this.y = e), this;
	}
	setX(e) {
		return (this.x = e), this;
	}
	setY(e) {
		return (this.y = e), this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default:
				throw new Error("index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0:
				return this.x;
			case 1:
				return this.y;
			default:
				throw new Error("index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return (this.x = e.x), (this.y = e.y), this;
	}
	add(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
			  ),
			  this.addVectors(e, t))
			: ((this.x += e.x), (this.y += e.y), this);
	}
	addScalar(e) {
		return (this.x += e), (this.y += e), this;
	}
	addVectors(e, t) {
		return (this.x = e.x + t.x), (this.y = e.y + t.y), this;
	}
	addScaledVector(e, t) {
		return (this.x += e.x * t), (this.y += e.y * t), this;
	}
	sub(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
			  ),
			  this.subVectors(e, t))
			: ((this.x -= e.x), (this.y -= e.y), this);
	}
	subScalar(e) {
		return (this.x -= e), (this.y -= e), this;
	}
	subVectors(e, t) {
		return (this.x = e.x - t.x), (this.y = e.y - t.y), this;
	}
	multiply(e) {
		return (this.x *= e.x), (this.y *= e.y), this;
	}
	multiplyScalar(e) {
		return (this.x *= e), (this.y *= e), this;
	}
	divide(e) {
		return (this.x /= e.x), (this.y /= e.y), this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		const t = this.x,
			n = this.y,
			i = e.elements;
		return (
			(this.x = i[0] * t + i[3] * n + i[6]),
			(this.y = i[1] * t + i[4] * n + i[7]),
			this
		);
	}
	min(e) {
		return (
			(this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this
		);
	}
	max(e) {
		return (
			(this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this
		);
	}
	clamp(e, t) {
		return (
			(this.x = Math.max(e.x, Math.min(t.x, this.x))),
			(this.y = Math.max(e.y, Math.min(t.y, this.y))),
			this
		);
	}
	clampScalar(e, t) {
		return (
			(this.x = Math.max(e, Math.min(t, this.x))),
			(this.y = Math.max(e, Math.min(t, this.y))),
			this
		);
	}
	clampLength(e, t) {
		const n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
	}
	floor() {
		return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
	}
	ceil() {
		return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
	}
	round() {
		return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
	}
	roundToZero() {
		return (
			(this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
			(this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
			this
		);
	}
	negate() {
		return (this.x = -this.x), (this.y = -this.y), this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		const t = this.x - e.x,
			n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this;
	}
	lerpVectors(e, t, n) {
		return (
			(this.x = e.x + (t.x - e.x) * n), (this.y = e.y + (t.y - e.y) * n), this
		);
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return (this.x = e[t]), (this.y = e[t + 1]), this;
	}
	toArray(e = [], t = 0) {
		return (e[t] = this.x), (e[t + 1] = this.y), e;
	}
	fromBufferAttribute(e, t, n) {
		return (
			n !== void 0 &&
				console.warn(
					"THREE.Vector2: offset has been removed from .fromBufferAttribute()."
				),
			(this.x = e.getX(t)),
			(this.y = e.getY(t)),
			this
		);
	}
	rotateAround(e, t) {
		const n = Math.cos(t),
			i = Math.sin(t),
			r = this.x - e.x,
			o = this.y - e.y;
		return (this.x = r * n - o * i + e.x), (this.y = r * i + o * n + e.y), this;
	}
	random() {
		return (this.x = Math.random()), (this.y = Math.random()), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}
G.prototype.isVector2 = !0;
class mt {
	constructor() {
		(this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
			arguments.length > 0 &&
				console.error(
					"THREE.Matrix3: the constructor no longer reads arguments. use .set() instead."
				);
	}
	set(e, t, n, i, r, o, a, l, c) {
		const h = this.elements;
		return (
			(h[0] = e),
			(h[1] = i),
			(h[2] = a),
			(h[3] = t),
			(h[4] = r),
			(h[5] = l),
			(h[6] = n),
			(h[7] = o),
			(h[8] = c),
			this
		);
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		const t = this.elements,
			n = e.elements;
		return (
			(t[0] = n[0]),
			(t[1] = n[1]),
			(t[2] = n[2]),
			(t[3] = n[3]),
			(t[4] = n[4]),
			(t[5] = n[5]),
			(t[6] = n[6]),
			(t[7] = n[7]),
			(t[8] = n[8]),
			this
		);
	}
	extractBasis(e, t, n) {
		return (
			e.setFromMatrix3Column(this, 0),
			t.setFromMatrix3Column(this, 1),
			n.setFromMatrix3Column(this, 2),
			this
		);
	}
	setFromMatrix4(e) {
		const t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		const n = e.elements,
			i = t.elements,
			r = this.elements,
			o = n[0],
			a = n[3],
			l = n[6],
			c = n[1],
			h = n[4],
			u = n[7],
			d = n[2],
			f = n[5],
			m = n[8],
			x = i[0],
			y = i[3],
			g = i[6],
			p = i[1],
			M = i[4],
			v = i[7],
			_ = i[2],
			E = i[5],
			A = i[8];
		return (
			(r[0] = o * x + a * p + l * _),
			(r[3] = o * y + a * M + l * E),
			(r[6] = o * g + a * v + l * A),
			(r[1] = c * x + h * p + u * _),
			(r[4] = c * y + h * M + u * E),
			(r[7] = c * g + h * v + u * A),
			(r[2] = d * x + f * p + m * _),
			(r[5] = d * y + f * M + m * E),
			(r[8] = d * g + f * v + m * A),
			this
		);
	}
	multiplyScalar(e) {
		const t = this.elements;
		return (
			(t[0] *= e),
			(t[3] *= e),
			(t[6] *= e),
			(t[1] *= e),
			(t[4] *= e),
			(t[7] *= e),
			(t[2] *= e),
			(t[5] *= e),
			(t[8] *= e),
			this
		);
	}
	determinant() {
		const e = this.elements,
			t = e[0],
			n = e[1],
			i = e[2],
			r = e[3],
			o = e[4],
			a = e[5],
			l = e[6],
			c = e[7],
			h = e[8];
		return t * o * h - t * a * c - n * r * h + n * a * l + i * r * c - i * o * l;
	}
	invert() {
		const e = this.elements,
			t = e[0],
			n = e[1],
			i = e[2],
			r = e[3],
			o = e[4],
			a = e[5],
			l = e[6],
			c = e[7],
			h = e[8],
			u = h * o - a * c,
			d = a * l - h * r,
			f = c * r - o * l,
			m = t * u + n * d + i * f;
		if (m === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		const x = 1 / m;
		return (
			(e[0] = u * x),
			(e[1] = (i * c - h * n) * x),
			(e[2] = (a * n - i * o) * x),
			(e[3] = d * x),
			(e[4] = (h * t - i * l) * x),
			(e[5] = (i * r - a * t) * x),
			(e[6] = f * x),
			(e[7] = (n * l - c * t) * x),
			(e[8] = (o * t - n * r) * x),
			this
		);
	}
	transpose() {
		let e;
		const t = this.elements;
		return (
			(e = t[1]),
			(t[1] = t[3]),
			(t[3] = e),
			(e = t[2]),
			(t[2] = t[6]),
			(t[6] = e),
			(e = t[5]),
			(t[5] = t[7]),
			(t[7] = e),
			this
		);
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		const t = this.elements;
		return (
			(e[0] = t[0]),
			(e[1] = t[3]),
			(e[2] = t[6]),
			(e[3] = t[1]),
			(e[4] = t[4]),
			(e[5] = t[7]),
			(e[6] = t[2]),
			(e[7] = t[5]),
			(e[8] = t[8]),
			this
		);
	}
	setUvTransform(e, t, n, i, r, o, a) {
		const l = Math.cos(r),
			c = Math.sin(r);
		return (
			this.set(
				n * l,
				n * c,
				-n * (l * o + c * a) + o + e,
				-i * c,
				i * l,
				-i * (-c * o + l * a) + a + t,
				0,
				0,
				1
			),
			this
		);
	}
	scale(e, t) {
		const n = this.elements;
		return (
			(n[0] *= e),
			(n[3] *= e),
			(n[6] *= e),
			(n[1] *= t),
			(n[4] *= t),
			(n[7] *= t),
			this
		);
	}
	rotate(e) {
		const t = Math.cos(e),
			n = Math.sin(e),
			i = this.elements,
			r = i[0],
			o = i[3],
			a = i[6],
			l = i[1],
			c = i[4],
			h = i[7];
		return (
			(i[0] = t * r + n * l),
			(i[3] = t * o + n * c),
			(i[6] = t * a + n * h),
			(i[1] = -n * r + t * l),
			(i[4] = -n * o + t * c),
			(i[7] = -n * a + t * h),
			this
		);
	}
	translate(e, t) {
		const n = this.elements;
		return (
			(n[0] += e * n[2]),
			(n[3] += e * n[5]),
			(n[6] += e * n[8]),
			(n[1] += t * n[2]),
			(n[4] += t * n[5]),
			(n[7] += t * n[8]),
			this
		);
	}
	equals(e) {
		const t = this.elements,
			n = e.elements;
		for (let i = 0; i < 9; i++) if (t[i] !== n[i]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		const n = this.elements;
		return (
			(e[t] = n[0]),
			(e[t + 1] = n[1]),
			(e[t + 2] = n[2]),
			(e[t + 3] = n[3]),
			(e[t + 4] = n[4]),
			(e[t + 5] = n[5]),
			(e[t + 6] = n[6]),
			(e[t + 7] = n[7]),
			(e[t + 8] = n[8]),
			e
		);
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}
mt.prototype.isMatrix3 = !0;
function Eu(s) {
	for (let e = s.length - 1; e >= 0; --e) if (s[e] > 65535) return !0;
	return !1;
}
const Pf = {
	Int8Array,
	Uint8Array,
	Uint8ClampedArray,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
};
function Xi(s, e) {
	return new Pf[s](e);
}
function Gr(s) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", s);
}
const Au = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	},
	Ut = { h: 0, s: 0, l: 0 },
	hs = { h: 0, s: 0, l: 0 };
function ko(s, e, t) {
	return (
		t < 0 && (t += 1),
		t > 1 && (t -= 1),
		t < 1 / 6
			? s + (e - s) * 6 * t
			: t < 1 / 2
			? e
			: t < 2 / 3
			? s + (e - s) * 6 * (2 / 3 - t)
			: s
	);
}
function Ji(s) {
	return s < 0.04045
		? s * 0.0773993808
		: Math.pow(s * 0.9478672986 + 0.0521327014, 2.4);
}
function Vo(s) {
	return s < 0.0031308 ? s * 12.92 : 1.055 * Math.pow(s, 0.41666) - 0.055;
}
class re {
	constructor(e, t, n) {
		return t === void 0 && n === void 0 ? this.set(e) : this.setRGB(e, t, n);
	}
	set(e) {
		return (
			e && e.isColor
				? this.copy(e)
				: typeof e == "number"
				? this.setHex(e)
				: typeof e == "string" && this.setStyle(e),
			this
		);
	}
	setScalar(e) {
		return (this.r = e), (this.g = e), (this.b = e), this;
	}
	setHex(e) {
		return (
			(e = Math.floor(e)),
			(this.r = ((e >> 16) & 255) / 255),
			(this.g = ((e >> 8) & 255) / 255),
			(this.b = (e & 255) / 255),
			this
		);
	}
	setRGB(e, t, n) {
		return (this.r = e), (this.g = t), (this.b = n), this;
	}
	setHSL(e, t, n) {
		if (((e = ul(e, 1)), (t = Mt(t, 0, 1)), (n = Mt(n, 0, 1)), t === 0))
			this.r = this.g = this.b = n;
		else {
			const i = n <= 0.5 ? n * (1 + t) : n + t - n * t,
				r = 2 * n - i;
			(this.r = ko(r, i, e + 1 / 3)),
				(this.g = ko(r, i, e)),
				(this.b = ko(r, i, e - 1 / 3));
		}
		return this;
	}
	setStyle(e) {
		function t(i) {
			i !== void 0 &&
				parseFloat(i) < 1 &&
				console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
		}
		let n;
		if ((n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e))) {
			let i;
			const r = n[1],
				o = n[2];
			switch (r) {
				case "rgb":
				case "rgba":
					if (
						(i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
							o
						))
					)
						return (
							(this.r = Math.min(255, parseInt(i[1], 10)) / 255),
							(this.g = Math.min(255, parseInt(i[2], 10)) / 255),
							(this.b = Math.min(255, parseInt(i[3], 10)) / 255),
							t(i[4]),
							this
						);
					if (
						(i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
							o
						))
					)
						return (
							(this.r = Math.min(100, parseInt(i[1], 10)) / 100),
							(this.g = Math.min(100, parseInt(i[2], 10)) / 100),
							(this.b = Math.min(100, parseInt(i[3], 10)) / 100),
							t(i[4]),
							this
						);
					break;
				case "hsl":
				case "hsla":
					if (
						(i = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
							o
						))
					) {
						const a = parseFloat(i[1]) / 360,
							l = parseInt(i[2], 10) / 100,
							c = parseInt(i[3], 10) / 100;
						return t(i[4]), this.setHSL(a, l, c);
					}
					break;
			}
		} else if ((n = /^\#([A-Fa-f\d]+)$/.exec(e))) {
			const i = n[1],
				r = i.length;
			if (r === 3)
				return (
					(this.r = parseInt(i.charAt(0) + i.charAt(0), 16) / 255),
					(this.g = parseInt(i.charAt(1) + i.charAt(1), 16) / 255),
					(this.b = parseInt(i.charAt(2) + i.charAt(2), 16) / 255),
					this
				);
			if (r === 6)
				return (
					(this.r = parseInt(i.charAt(0) + i.charAt(1), 16) / 255),
					(this.g = parseInt(i.charAt(2) + i.charAt(3), 16) / 255),
					(this.b = parseInt(i.charAt(4) + i.charAt(5), 16) / 255),
					this
				);
		}
		return e && e.length > 0 ? this.setColorName(e) : this;
	}
	setColorName(e) {
		const t = Au[e.toLowerCase()];
		return (
			t !== void 0
				? this.setHex(t)
				: console.warn("THREE.Color: Unknown color " + e),
			this
		);
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return (this.r = e.r), (this.g = e.g), (this.b = e.b), this;
	}
	copySRGBToLinear(e) {
		return (this.r = Ji(e.r)), (this.g = Ji(e.g)), (this.b = Ji(e.b)), this;
	}
	copyLinearToSRGB(e) {
		return (this.r = Vo(e.r)), (this.g = Vo(e.g)), (this.b = Vo(e.b)), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex() {
		return ((this.r * 255) << 16) ^ ((this.g * 255) << 8) ^ ((this.b * 255) << 0);
	}
	getHexString() {
		return ("000000" + this.getHex().toString(16)).slice(-6);
	}
	getHSL(e) {
		const t = this.r,
			n = this.g,
			i = this.b,
			r = Math.max(t, n, i),
			o = Math.min(t, n, i);
		let a, l;
		const c = (o + r) / 2;
		if (o === r) (a = 0), (l = 0);
		else {
			const h = r - o;
			switch (((l = c <= 0.5 ? h / (r + o) : h / (2 - r - o)), r)) {
				case t:
					a = (n - i) / h + (n < i ? 6 : 0);
					break;
				case n:
					a = (i - t) / h + 2;
					break;
				case i:
					a = (t - n) / h + 4;
					break;
			}
			a /= 6;
		}
		return (e.h = a), (e.s = l), (e.l = c), e;
	}
	getStyle() {
		return (
			"rgb(" +
			((this.r * 255) | 0) +
			"," +
			((this.g * 255) | 0) +
			"," +
			((this.b * 255) | 0) +
			")"
		);
	}
	offsetHSL(e, t, n) {
		return (
			this.getHSL(Ut),
			(Ut.h += e),
			(Ut.s += t),
			(Ut.l += n),
			this.setHSL(Ut.h, Ut.s, Ut.l),
			this
		);
	}
	add(e) {
		return (this.r += e.r), (this.g += e.g), (this.b += e.b), this;
	}
	addColors(e, t) {
		return (this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this;
	}
	addScalar(e) {
		return (this.r += e), (this.g += e), (this.b += e), this;
	}
	sub(e) {
		return (
			(this.r = Math.max(0, this.r - e.r)),
			(this.g = Math.max(0, this.g - e.g)),
			(this.b = Math.max(0, this.b - e.b)),
			this
		);
	}
	multiply(e) {
		return (this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this;
	}
	multiplyScalar(e) {
		return (this.r *= e), (this.g *= e), (this.b *= e), this;
	}
	lerp(e, t) {
		return (
			(this.r += (e.r - this.r) * t),
			(this.g += (e.g - this.g) * t),
			(this.b += (e.b - this.b) * t),
			this
		);
	}
	lerpColors(e, t, n) {
		return (
			(this.r = e.r + (t.r - e.r) * n),
			(this.g = e.g + (t.g - e.g) * n),
			(this.b = e.b + (t.b - e.b) * n),
			this
		);
	}
	lerpHSL(e, t) {
		this.getHSL(Ut), e.getHSL(hs);
		const n = Lr(Ut.h, hs.h, t),
			i = Lr(Ut.s, hs.s, t),
			r = Lr(Ut.l, hs.l, t);
		return this.setHSL(n, i, r), this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return (this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this;
	}
	toArray(e = [], t = 0) {
		return (e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e;
	}
	fromBufferAttribute(e, t) {
		return (
			(this.r = e.getX(t)),
			(this.g = e.getY(t)),
			(this.b = e.getZ(t)),
			e.normalized === !0 && ((this.r /= 255), (this.g /= 255), (this.b /= 255)),
			this
		);
	}
	toJSON() {
		return this.getHex();
	}
}
re.NAMES = Au;
re.prototype.isColor = !0;
re.prototype.r = 1;
re.prototype.g = 1;
re.prototype.b = 1;
let Ei;
class Nn {
	static getDataURL(e) {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement == "undefined")
			return e.src;
		let t;
		if (e instanceof HTMLCanvasElement) t = e;
		else {
			Ei === void 0 && (Ei = Gr("canvas")),
				(Ei.width = e.width),
				(Ei.height = e.height);
			const n = Ei.getContext("2d");
			e instanceof ImageData
				? n.putImageData(e, 0, 0)
				: n.drawImage(e, 0, 0, e.width, e.height),
				(t = Ei);
		}
		return t.width > 2048 || t.height > 2048
			? (console.warn(
					"THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
					e
			  ),
			  t.toDataURL("image/jpeg", 0.6))
			: t.toDataURL("image/png");
	}
	static sRGBToLinear(e) {
		if (
			(typeof HTMLImageElement != "undefined" && e instanceof HTMLImageElement) ||
			(typeof HTMLCanvasElement != "undefined" &&
				e instanceof HTMLCanvasElement) ||
			(typeof ImageBitmap != "undefined" && e instanceof ImageBitmap)
		) {
			const t = Gr("canvas");
			(t.width = e.width), (t.height = e.height);
			const n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			const i = n.getImageData(0, 0, e.width, e.height),
				r = i.data;
			for (let o = 0; o < r.length; o++) r[o] = Ji(r[o] / 255) * 255;
			return n.putImageData(i, 0, 0), t;
		} else if (e.data) {
			const t = e.data.slice(0);
			for (let n = 0; n < t.length; n++)
				t instanceof Uint8Array || t instanceof Uint8ClampedArray
					? (t[n] = Math.floor(Ji(t[n] / 255) * 255))
					: (t[n] = Ji(t[n]));
			return { data: t, width: e.width, height: e.height };
		} else
			return (
				console.warn(
					"THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."
				),
				e
			);
	}
}
let Df = 0;
class dt extends bn {
	constructor(
		e = dt.DEFAULT_IMAGE,
		t = dt.DEFAULT_MAPPING,
		n = wt,
		i = wt,
		r = Ye,
		o = xi,
		a = ct,
		l = mn,
		c = 1,
		h = gn
	) {
		super(),
			Object.defineProperty(this, "id", { value: Df++ }),
			(this.uuid = It()),
			(this.name = ""),
			(this.image = e),
			(this.mipmaps = []),
			(this.mapping = t),
			(this.wrapS = n),
			(this.wrapT = i),
			(this.magFilter = r),
			(this.minFilter = o),
			(this.anisotropy = c),
			(this.format = a),
			(this.internalFormat = null),
			(this.type = l),
			(this.offset = new G(0, 0)),
			(this.repeat = new G(1, 1)),
			(this.center = new G(0, 0)),
			(this.rotation = 0),
			(this.matrixAutoUpdate = !0),
			(this.matrix = new mt()),
			(this.generateMipmaps = !0),
			(this.premultiplyAlpha = !1),
			(this.flipY = !0),
			(this.unpackAlignment = 4),
			(this.encoding = h),
			(this.userData = {}),
			(this.version = 0),
			(this.onUpdate = null),
			(this.isRenderTargetTexture = !1),
			(this.needsPMREMUpdate = !1);
	}
	updateMatrix() {
		this.matrix.setUvTransform(
			this.offset.x,
			this.offset.y,
			this.repeat.x,
			this.repeat.y,
			this.rotation,
			this.center.x,
			this.center.y
		);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return (
			(this.name = e.name),
			(this.image = e.image),
			(this.mipmaps = e.mipmaps.slice(0)),
			(this.mapping = e.mapping),
			(this.wrapS = e.wrapS),
			(this.wrapT = e.wrapT),
			(this.magFilter = e.magFilter),
			(this.minFilter = e.minFilter),
			(this.anisotropy = e.anisotropy),
			(this.format = e.format),
			(this.internalFormat = e.internalFormat),
			(this.type = e.type),
			this.offset.copy(e.offset),
			this.repeat.copy(e.repeat),
			this.center.copy(e.center),
			(this.rotation = e.rotation),
			(this.matrixAutoUpdate = e.matrixAutoUpdate),
			this.matrix.copy(e.matrix),
			(this.generateMipmaps = e.generateMipmaps),
			(this.premultiplyAlpha = e.premultiplyAlpha),
			(this.flipY = e.flipY),
			(this.unpackAlignment = e.unpackAlignment),
			(this.encoding = e.encoding),
			(this.userData = JSON.parse(JSON.stringify(e.userData))),
			this
		);
	}
	toJSON(e) {
		const t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		const n = {
			metadata: { version: 4.5, type: "Texture", generator: "Texture.toJSON" },
			uuid: this.uuid,
			name: this.name,
			mapping: this.mapping,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			type: this.type,
			encoding: this.encoding,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		if (this.image !== void 0) {
			const i = this.image;
			if (
				(i.uuid === void 0 && (i.uuid = It()), !t && e.images[i.uuid] === void 0)
			) {
				let r;
				if (Array.isArray(i)) {
					r = [];
					for (let o = 0, a = i.length; o < a; o++)
						i[o].isDataTexture ? r.push(Wo(i[o].image)) : r.push(Wo(i[o]));
				} else r = Wo(i);
				e.images[i.uuid] = { uuid: i.uuid, url: r };
			}
			n.image = i.uuid;
		}
		return (
			JSON.stringify(this.userData) !== "{}" && (n.userData = this.userData),
			t || (e.textures[this.uuid] = n),
			n
		);
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(e) {
		if (this.mapping !== mo) return e;
		if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
			switch (this.wrapS) {
				case Br:
					e.x = e.x - Math.floor(e.x);
					break;
				case wt:
					e.x = e.x < 0 ? 0 : 1;
					break;
				case zr:
					Math.abs(Math.floor(e.x) % 2) === 1
						? (e.x = Math.ceil(e.x) - e.x)
						: (e.x = e.x - Math.floor(e.x));
					break;
			}
		if (e.y < 0 || e.y > 1)
			switch (this.wrapT) {
				case Br:
					e.y = e.y - Math.floor(e.y);
					break;
				case wt:
					e.y = e.y < 0 ? 0 : 1;
					break;
				case zr:
					Math.abs(Math.floor(e.y) % 2) === 1
						? (e.y = Math.ceil(e.y) - e.y)
						: (e.y = e.y - Math.floor(e.y));
					break;
			}
		return this.flipY && (e.y = 1 - e.y), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}
dt.DEFAULT_IMAGE = void 0;
dt.DEFAULT_MAPPING = mo;
dt.prototype.isTexture = !0;
function Wo(s) {
	return (typeof HTMLImageElement != "undefined" &&
		s instanceof HTMLImageElement) ||
		(typeof HTMLCanvasElement != "undefined" && s instanceof HTMLCanvasElement) ||
		(typeof ImageBitmap != "undefined" && s instanceof ImageBitmap)
		? Nn.getDataURL(s)
		: s.data
		? {
				data: Array.prototype.slice.call(s.data),
				width: s.width,
				height: s.height,
				type: s.data.constructor.name
		  }
		: (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
class We {
	constructor(e = 0, t = 0, n = 0, i = 1) {
		(this.x = e), (this.y = t), (this.z = n), (this.w = i);
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, i) {
		return (this.x = e), (this.y = t), (this.z = n), (this.w = i), this;
	}
	setScalar(e) {
		return (this.x = e), (this.y = e), (this.z = e), (this.w = e), this;
	}
	setX(e) {
		return (this.x = e), this;
	}
	setY(e) {
		return (this.y = e), this;
	}
	setZ(e) {
		return (this.z = e), this;
	}
	setW(e) {
		return (this.w = e), this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default:
				throw new Error("index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			case 3:
				return this.w;
			default:
				throw new Error("index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return (
			(this.x = e.x),
			(this.y = e.y),
			(this.z = e.z),
			(this.w = e.w !== void 0 ? e.w : 1),
			this
		);
	}
	add(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
			  ),
			  this.addVectors(e, t))
			: ((this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this);
	}
	addScalar(e) {
		return (this.x += e), (this.y += e), (this.z += e), (this.w += e), this;
	}
	addVectors(e, t) {
		return (
			(this.x = e.x + t.x),
			(this.y = e.y + t.y),
			(this.z = e.z + t.z),
			(this.w = e.w + t.w),
			this
		);
	}
	addScaledVector(e, t) {
		return (
			(this.x += e.x * t),
			(this.y += e.y * t),
			(this.z += e.z * t),
			(this.w += e.w * t),
			this
		);
	}
	sub(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
			  ),
			  this.subVectors(e, t))
			: ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this);
	}
	subScalar(e) {
		return (this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this;
	}
	subVectors(e, t) {
		return (
			(this.x = e.x - t.x),
			(this.y = e.y - t.y),
			(this.z = e.z - t.z),
			(this.w = e.w - t.w),
			this
		);
	}
	multiply(e) {
		return (
			(this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this
		);
	}
	multiplyScalar(e) {
		return (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this;
	}
	applyMatrix4(e) {
		const t = this.x,
			n = this.y,
			i = this.z,
			r = this.w,
			o = e.elements;
		return (
			(this.x = o[0] * t + o[4] * n + o[8] * i + o[12] * r),
			(this.y = o[1] * t + o[5] * n + o[9] * i + o[13] * r),
			(this.z = o[2] * t + o[6] * n + o[10] * i + o[14] * r),
			(this.w = o[3] * t + o[7] * n + o[11] * i + o[15] * r),
			this
		);
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		const t = Math.sqrt(1 - e.w * e.w);
		return (
			t < 1e-4
				? ((this.x = 1), (this.y = 0), (this.z = 0))
				: ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
			this
		);
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, i, r;
		const l = e.elements,
			c = l[0],
			h = l[4],
			u = l[8],
			d = l[1],
			f = l[5],
			m = l[9],
			x = l[2],
			y = l[6],
			g = l[10];
		if (
			Math.abs(h - d) < 0.01 &&
			Math.abs(u - x) < 0.01 &&
			Math.abs(m - y) < 0.01
		) {
			if (
				Math.abs(h + d) < 0.1 &&
				Math.abs(u + x) < 0.1 &&
				Math.abs(m + y) < 0.1 &&
				Math.abs(c + f + g - 3) < 0.1
			)
				return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			const M = (c + 1) / 2,
				v = (f + 1) / 2,
				_ = (g + 1) / 2,
				E = (h + d) / 4,
				A = (u + x) / 4,
				D = (m + y) / 4;
			return (
				M > v && M > _
					? M < 0.01
						? ((n = 0), (i = 0.707106781), (r = 0.707106781))
						: ((n = Math.sqrt(M)), (i = E / n), (r = A / n))
					: v > _
					? v < 0.01
						? ((n = 0.707106781), (i = 0), (r = 0.707106781))
						: ((i = Math.sqrt(v)), (n = E / i), (r = D / i))
					: _ < 0.01
					? ((n = 0.707106781), (i = 0.707106781), (r = 0))
					: ((r = Math.sqrt(_)), (n = A / r), (i = D / r)),
				this.set(n, i, r, t),
				this
			);
		}
		let p = Math.sqrt((y - m) * (y - m) + (u - x) * (u - x) + (d - h) * (d - h));
		return (
			Math.abs(p) < 0.001 && (p = 1),
			(this.x = (y - m) / p),
			(this.y = (u - x) / p),
			(this.z = (d - h) / p),
			(this.w = Math.acos((c + f + g - 1) / 2)),
			this
		);
	}
	min(e) {
		return (
			(this.x = Math.min(this.x, e.x)),
			(this.y = Math.min(this.y, e.y)),
			(this.z = Math.min(this.z, e.z)),
			(this.w = Math.min(this.w, e.w)),
			this
		);
	}
	max(e) {
		return (
			(this.x = Math.max(this.x, e.x)),
			(this.y = Math.max(this.y, e.y)),
			(this.z = Math.max(this.z, e.z)),
			(this.w = Math.max(this.w, e.w)),
			this
		);
	}
	clamp(e, t) {
		return (
			(this.x = Math.max(e.x, Math.min(t.x, this.x))),
			(this.y = Math.max(e.y, Math.min(t.y, this.y))),
			(this.z = Math.max(e.z, Math.min(t.z, this.z))),
			(this.w = Math.max(e.w, Math.min(t.w, this.w))),
			this
		);
	}
	clampScalar(e, t) {
		return (
			(this.x = Math.max(e, Math.min(t, this.x))),
			(this.y = Math.max(e, Math.min(t, this.y))),
			(this.z = Math.max(e, Math.min(t, this.z))),
			(this.w = Math.max(e, Math.min(t, this.w))),
			this
		);
	}
	clampLength(e, t) {
		const n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
	}
	floor() {
		return (
			(this.x = Math.floor(this.x)),
			(this.y = Math.floor(this.y)),
			(this.z = Math.floor(this.z)),
			(this.w = Math.floor(this.w)),
			this
		);
	}
	ceil() {
		return (
			(this.x = Math.ceil(this.x)),
			(this.y = Math.ceil(this.y)),
			(this.z = Math.ceil(this.z)),
			(this.w = Math.ceil(this.w)),
			this
		);
	}
	round() {
		return (
			(this.x = Math.round(this.x)),
			(this.y = Math.round(this.y)),
			(this.z = Math.round(this.z)),
			(this.w = Math.round(this.w)),
			this
		);
	}
	roundToZero() {
		return (
			(this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
			(this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
			(this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
			(this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
			this
		);
	}
	negate() {
		return (
			(this.x = -this.x),
			(this.y = -this.y),
			(this.z = -this.z),
			(this.w = -this.w),
			this
		);
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(
			this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		);
	}
	manhattanLength() {
		return (
			Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
		);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return (
			(this.x += (e.x - this.x) * t),
			(this.y += (e.y - this.y) * t),
			(this.z += (e.z - this.z) * t),
			(this.w += (e.w - this.w) * t),
			this
		);
	}
	lerpVectors(e, t, n) {
		return (
			(this.x = e.x + (t.x - e.x) * n),
			(this.y = e.y + (t.y - e.y) * n),
			(this.z = e.z + (t.z - e.z) * n),
			(this.w = e.w + (t.w - e.w) * n),
			this
		);
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return (
			(this.x = e[t]),
			(this.y = e[t + 1]),
			(this.z = e[t + 2]),
			(this.w = e[t + 3]),
			this
		);
	}
	toArray(e = [], t = 0) {
		return (
			(e[t] = this.x),
			(e[t + 1] = this.y),
			(e[t + 2] = this.z),
			(e[t + 3] = this.w),
			e
		);
	}
	fromBufferAttribute(e, t, n) {
		return (
			n !== void 0 &&
				console.warn(
					"THREE.Vector4: offset has been removed from .fromBufferAttribute()."
				),
			(this.x = e.getX(t)),
			(this.y = e.getY(t)),
			(this.z = e.getZ(t)),
			(this.w = e.getW(t)),
			this
		);
	}
	random() {
		return (
			(this.x = Math.random()),
			(this.y = Math.random()),
			(this.z = Math.random()),
			(this.w = Math.random()),
			this
		);
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}
We.prototype.isVector4 = !0;
class ut extends bn {
	constructor(e, t, n = {}) {
		super(),
			(this.width = e),
			(this.height = t),
			(this.depth = 1),
			(this.scissor = new We(0, 0, e, t)),
			(this.scissorTest = !1),
			(this.viewport = new We(0, 0, e, t)),
			(this.texture = new dt(
				void 0,
				n.mapping,
				n.wrapS,
				n.wrapT,
				n.magFilter,
				n.minFilter,
				n.format,
				n.type,
				n.anisotropy,
				n.encoding
			)),
			(this.texture.isRenderTargetTexture = !0),
			(this.texture.image = { width: e, height: t, depth: 1 }),
			(this.texture.generateMipmaps =
				n.generateMipmaps !== void 0 ? n.generateMipmaps : !1),
			(this.texture.internalFormat =
				n.internalFormat !== void 0 ? n.internalFormat : null),
			(this.texture.minFilter = n.minFilter !== void 0 ? n.minFilter : Ye),
			(this.depthBuffer = n.depthBuffer !== void 0 ? n.depthBuffer : !0),
			(this.stencilBuffer = n.stencilBuffer !== void 0 ? n.stencilBuffer : !1),
			(this.depthTexture = n.depthTexture !== void 0 ? n.depthTexture : null);
	}
	setTexture(e) {
		(e.image = { width: this.width, height: this.height, depth: this.depth }),
			(this.texture = e);
	}
	setSize(e, t, n = 1) {
		(this.width !== e || this.height !== t || this.depth !== n) &&
			((this.width = e),
			(this.height = t),
			(this.depth = n),
			(this.texture.image.width = e),
			(this.texture.image.height = t),
			(this.texture.image.depth = n),
			this.dispose()),
			this.viewport.set(0, 0, e, t),
			this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return (
			(this.width = e.width),
			(this.height = e.height),
			(this.depth = e.depth),
			this.viewport.copy(e.viewport),
			(this.texture = e.texture.clone()),
			(this.texture.image = Object.assign({}, e.texture.image)),
			(this.depthBuffer = e.depthBuffer),
			(this.stencilBuffer = e.stencilBuffer),
			(this.depthTexture = e.depthTexture),
			this
		);
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}
ut.prototype.isWebGLRenderTarget = !0;
class Cu extends ut {
	constructor(e, t, n) {
		super(e, t);
		const i = this.texture;
		this.texture = [];
		for (let r = 0; r < n; r++) this.texture[r] = i.clone();
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			(this.width = e), (this.height = t), (this.depth = n);
			for (let i = 0, r = this.texture.length; i < r; i++)
				(this.texture[i].image.width = e),
					(this.texture[i].image.height = t),
					(this.texture[i].image.depth = n);
			this.dispose();
		}
		return this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t), this;
	}
	copy(e) {
		this.dispose(),
			(this.width = e.width),
			(this.height = e.height),
			(this.depth = e.depth),
			this.viewport.set(0, 0, this.width, this.height),
			this.scissor.set(0, 0, this.width, this.height),
			(this.depthBuffer = e.depthBuffer),
			(this.stencilBuffer = e.stencilBuffer),
			(this.depthTexture = e.depthTexture),
			(this.texture.length = 0);
		for (let t = 0, n = e.texture.length; t < n; t++)
			this.texture[t] = e.texture[t].clone();
		return this;
	}
}
Cu.prototype.isWebGLMultipleRenderTargets = !0;
class xo extends ut {
	constructor(e, t, n = {}) {
		super(e, t, n),
			(this.samples = 4),
			(this.ignoreDepthForMultisampleCopy =
				n.ignoreDepth !== void 0 ? n.ignoreDepth : !0),
			(this.useRenderToTexture =
				n.useRenderToTexture !== void 0 ? n.useRenderToTexture : !1),
			(this.useRenderbuffer = this.useRenderToTexture === !1);
	}
	copy(e) {
		return (
			super.copy.call(this, e),
			(this.samples = e.samples),
			(this.useRenderToTexture = e.useRenderToTexture),
			(this.useRenderbuffer = e.useRenderbuffer),
			this
		);
	}
}
xo.prototype.isWebGLMultisampleRenderTarget = !0;
class gt {
	constructor(e = 0, t = 0, n = 0, i = 1) {
		(this._x = e), (this._y = t), (this._z = n), (this._w = i);
	}
	static slerp(e, t, n, i) {
		return (
			console.warn(
				"THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."
			),
			n.slerpQuaternions(e, t, i)
		);
	}
	static slerpFlat(e, t, n, i, r, o, a) {
		let l = n[i + 0],
			c = n[i + 1],
			h = n[i + 2],
			u = n[i + 3];
		const d = r[o + 0],
			f = r[o + 1],
			m = r[o + 2],
			x = r[o + 3];
		if (a === 0) {
			(e[t + 0] = l), (e[t + 1] = c), (e[t + 2] = h), (e[t + 3] = u);
			return;
		}
		if (a === 1) {
			(e[t + 0] = d), (e[t + 1] = f), (e[t + 2] = m), (e[t + 3] = x);
			return;
		}
		if (u !== x || l !== d || c !== f || h !== m) {
			let y = 1 - a;
			const g = l * d + c * f + h * m + u * x,
				p = g >= 0 ? 1 : -1,
				M = 1 - g * g;
			if (M > Number.EPSILON) {
				const _ = Math.sqrt(M),
					E = Math.atan2(_, g * p);
				(y = Math.sin(y * E) / _), (a = Math.sin(a * E) / _);
			}
			const v = a * p;
			if (
				((l = l * y + d * v),
				(c = c * y + f * v),
				(h = h * y + m * v),
				(u = u * y + x * v),
				y === 1 - a)
			) {
				const _ = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
				(l *= _), (c *= _), (h *= _), (u *= _);
			}
		}
		(e[t] = l), (e[t + 1] = c), (e[t + 2] = h), (e[t + 3] = u);
	}
	static multiplyQuaternionsFlat(e, t, n, i, r, o) {
		const a = n[i],
			l = n[i + 1],
			c = n[i + 2],
			h = n[i + 3],
			u = r[o],
			d = r[o + 1],
			f = r[o + 2],
			m = r[o + 3];
		return (
			(e[t] = a * m + h * u + l * f - c * d),
			(e[t + 1] = l * m + h * d + c * u - a * f),
			(e[t + 2] = c * m + h * f + a * d - l * u),
			(e[t + 3] = h * m - a * u - l * d - c * f),
			e
		);
	}
	get x() {
		return this._x;
	}
	set x(e) {
		(this._x = e), this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		(this._y = e), this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		(this._z = e), this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		(this._w = e), this._onChangeCallback();
	}
	set(e, t, n, i) {
		return (
			(this._x = e),
			(this._y = t),
			(this._z = n),
			(this._w = i),
			this._onChangeCallback(),
			this
		);
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return (
			(this._x = e.x),
			(this._y = e.y),
			(this._z = e.z),
			(this._w = e.w),
			this._onChangeCallback(),
			this
		);
	}
	setFromEuler(e, t) {
		if (!(e && e.isEuler))
			throw new Error(
				"THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order."
			);
		const n = e._x,
			i = e._y,
			r = e._z,
			o = e._order,
			a = Math.cos,
			l = Math.sin,
			c = a(n / 2),
			h = a(i / 2),
			u = a(r / 2),
			d = l(n / 2),
			f = l(i / 2),
			m = l(r / 2);
		switch (o) {
			case "XYZ":
				(this._x = d * h * u + c * f * m),
					(this._y = c * f * u - d * h * m),
					(this._z = c * h * m + d * f * u),
					(this._w = c * h * u - d * f * m);
				break;
			case "YXZ":
				(this._x = d * h * u + c * f * m),
					(this._y = c * f * u - d * h * m),
					(this._z = c * h * m - d * f * u),
					(this._w = c * h * u + d * f * m);
				break;
			case "ZXY":
				(this._x = d * h * u - c * f * m),
					(this._y = c * f * u + d * h * m),
					(this._z = c * h * m + d * f * u),
					(this._w = c * h * u - d * f * m);
				break;
			case "ZYX":
				(this._x = d * h * u - c * f * m),
					(this._y = c * f * u + d * h * m),
					(this._z = c * h * m - d * f * u),
					(this._w = c * h * u + d * f * m);
				break;
			case "YZX":
				(this._x = d * h * u + c * f * m),
					(this._y = c * f * u + d * h * m),
					(this._z = c * h * m - d * f * u),
					(this._w = c * h * u - d * f * m);
				break;
			case "XZY":
				(this._x = d * h * u - c * f * m),
					(this._y = c * f * u - d * h * m),
					(this._z = c * h * m + d * f * u),
					(this._w = c * h * u + d * f * m);
				break;
			default:
				console.warn(
					"THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o
				);
		}
		return t !== !1 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		const n = t / 2,
			i = Math.sin(n);
		return (
			(this._x = e.x * i),
			(this._y = e.y * i),
			(this._z = e.z * i),
			(this._w = Math.cos(n)),
			this._onChangeCallback(),
			this
		);
	}
	setFromRotationMatrix(e) {
		const t = e.elements,
			n = t[0],
			i = t[4],
			r = t[8],
			o = t[1],
			a = t[5],
			l = t[9],
			c = t[2],
			h = t[6],
			u = t[10],
			d = n + a + u;
		if (d > 0) {
			const f = 0.5 / Math.sqrt(d + 1);
			(this._w = 0.25 / f),
				(this._x = (h - l) * f),
				(this._y = (r - c) * f),
				(this._z = (o - i) * f);
		} else if (n > a && n > u) {
			const f = 2 * Math.sqrt(1 + n - a - u);
			(this._w = (h - l) / f),
				(this._x = 0.25 * f),
				(this._y = (i + o) / f),
				(this._z = (r + c) / f);
		} else if (a > u) {
			const f = 2 * Math.sqrt(1 + a - n - u);
			(this._w = (r - c) / f),
				(this._x = (i + o) / f),
				(this._y = 0.25 * f),
				(this._z = (l + h) / f);
		} else {
			const f = 2 * Math.sqrt(1 + u - n - a);
			(this._w = (o - i) / f),
				(this._x = (r + c) / f),
				(this._y = (l + h) / f),
				(this._z = 0.25 * f);
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return (
			n < Number.EPSILON
				? ((n = 0),
				  Math.abs(e.x) > Math.abs(e.z)
						? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = n))
						: ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = n)))
				: ((this._x = e.y * t.z - e.z * t.y),
				  (this._y = e.z * t.x - e.x * t.z),
				  (this._z = e.x * t.y - e.y * t.x),
				  (this._w = n)),
			this.normalize()
		);
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(Mt(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		const n = this.angleTo(e);
		if (n === 0) return this;
		const i = Math.min(1, t / n);
		return this.slerp(e, i), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return (
			(this._x *= -1),
			(this._y *= -1),
			(this._z *= -1),
			this._onChangeCallback(),
			this
		);
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return (
			this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
		);
	}
	length() {
		return Math.sqrt(
			this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
		);
	}
	normalize() {
		let e = this.length();
		return (
			e === 0
				? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
				: ((e = 1 / e),
				  (this._x = this._x * e),
				  (this._y = this._y * e),
				  (this._z = this._z * e),
				  (this._w = this._w * e)),
			this._onChangeCallback(),
			this
		);
	}
	multiply(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
			  ),
			  this.multiplyQuaternions(e, t))
			: this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		const n = e._x,
			i = e._y,
			r = e._z,
			o = e._w,
			a = t._x,
			l = t._y,
			c = t._z,
			h = t._w;
		return (
			(this._x = n * h + o * a + i * c - r * l),
			(this._y = i * h + o * l + r * a - n * c),
			(this._z = r * h + o * c + n * l - i * a),
			(this._w = o * h - n * a - i * l - r * c),
			this._onChangeCallback(),
			this
		);
	}
	slerp(e, t) {
		if (t === 0) return this;
		if (t === 1) return this.copy(e);
		const n = this._x,
			i = this._y,
			r = this._z,
			o = this._w;
		let a = o * e._w + n * e._x + i * e._y + r * e._z;
		if (
			(a < 0
				? ((this._w = -e._w),
				  (this._x = -e._x),
				  (this._y = -e._y),
				  (this._z = -e._z),
				  (a = -a))
				: this.copy(e),
			a >= 1)
		)
			return (this._w = o), (this._x = n), (this._y = i), (this._z = r), this;
		const l = 1 - a * a;
		if (l <= Number.EPSILON) {
			const f = 1 - t;
			return (
				(this._w = f * o + t * this._w),
				(this._x = f * n + t * this._x),
				(this._y = f * i + t * this._y),
				(this._z = f * r + t * this._z),
				this.normalize(),
				this._onChangeCallback(),
				this
			);
		}
		const c = Math.sqrt(l),
			h = Math.atan2(c, a),
			u = Math.sin((1 - t) * h) / c,
			d = Math.sin(t * h) / c;
		return (
			(this._w = o * u + this._w * d),
			(this._x = n * u + this._x * d),
			(this._y = i * u + this._y * d),
			(this._z = r * u + this._z * d),
			this._onChangeCallback(),
			this
		);
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		const e = Math.random(),
			t = Math.sqrt(1 - e),
			n = Math.sqrt(e),
			i = 2 * Math.PI * Math.random(),
			r = 2 * Math.PI * Math.random();
		return this.set(
			t * Math.cos(i),
			n * Math.sin(r),
			n * Math.cos(r),
			t * Math.sin(i)
		);
	}
	equals(e) {
		return (
			e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
		);
	}
	fromArray(e, t = 0) {
		return (
			(this._x = e[t]),
			(this._y = e[t + 1]),
			(this._z = e[t + 2]),
			(this._w = e[t + 3]),
			this._onChangeCallback(),
			this
		);
	}
	toArray(e = [], t = 0) {
		return (
			(e[t] = this._x),
			(e[t + 1] = this._y),
			(e[t + 2] = this._z),
			(e[t + 3] = this._w),
			e
		);
	}
	fromBufferAttribute(e, t) {
		return (
			(this._x = e.getX(t)),
			(this._y = e.getY(t)),
			(this._z = e.getZ(t)),
			(this._w = e.getW(t)),
			this
		);
	}
	_onChange(e) {
		return (this._onChangeCallback = e), this;
	}
	_onChangeCallback() {}
}
gt.prototype.isQuaternion = !0;
class w {
	constructor(e = 0, t = 0, n = 0) {
		(this.x = e), (this.y = t), (this.z = n);
	}
	set(e, t, n) {
		return (
			n === void 0 && (n = this.z), (this.x = e), (this.y = t), (this.z = n), this
		);
	}
	setScalar(e) {
		return (this.x = e), (this.y = e), (this.z = e), this;
	}
	setX(e) {
		return (this.x = e), this;
	}
	setY(e) {
		return (this.y = e), this;
	}
	setZ(e) {
		return (this.z = e), this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default:
				throw new Error("index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			default:
				throw new Error("index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
	}
	add(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
			  ),
			  this.addVectors(e, t))
			: ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
	}
	addScalar(e) {
		return (this.x += e), (this.y += e), (this.z += e), this;
	}
	addVectors(e, t) {
		return (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this;
	}
	addScaledVector(e, t) {
		return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this;
	}
	sub(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
			  ),
			  this.subVectors(e, t))
			: ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
	}
	subScalar(e) {
		return (this.x -= e), (this.y -= e), (this.z -= e), this;
	}
	subVectors(e, t) {
		return (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this;
	}
	multiply(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
			  ),
			  this.multiplyVectors(e, t))
			: ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
	}
	multiplyScalar(e) {
		return (this.x *= e), (this.y *= e), (this.z *= e), this;
	}
	multiplyVectors(e, t) {
		return (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this;
	}
	applyEuler(e) {
		return (
			(e && e.isEuler) ||
				console.error(
					"THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."
				),
			this.applyQuaternion(Kl.setFromEuler(e))
		);
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(Kl.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		const t = this.x,
			n = this.y,
			i = this.z,
			r = e.elements;
		return (
			(this.x = r[0] * t + r[3] * n + r[6] * i),
			(this.y = r[1] * t + r[4] * n + r[7] * i),
			(this.z = r[2] * t + r[5] * n + r[8] * i),
			this
		);
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		const t = this.x,
			n = this.y,
			i = this.z,
			r = e.elements,
			o = 1 / (r[3] * t + r[7] * n + r[11] * i + r[15]);
		return (
			(this.x = (r[0] * t + r[4] * n + r[8] * i + r[12]) * o),
			(this.y = (r[1] * t + r[5] * n + r[9] * i + r[13]) * o),
			(this.z = (r[2] * t + r[6] * n + r[10] * i + r[14]) * o),
			this
		);
	}
	applyQuaternion(e) {
		const t = this.x,
			n = this.y,
			i = this.z,
			r = e.x,
			o = e.y,
			a = e.z,
			l = e.w,
			c = l * t + o * i - a * n,
			h = l * n + a * t - r * i,
			u = l * i + r * n - o * t,
			d = -r * t - o * n - a * i;
		return (
			(this.x = c * l + d * -r + h * -a - u * -o),
			(this.y = h * l + d * -o + u * -r - c * -a),
			(this.z = u * l + d * -a + c * -o - h * -r),
			this
		);
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(
			e.projectionMatrix
		);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(
			e.matrixWorld
		);
	}
	transformDirection(e) {
		const t = this.x,
			n = this.y,
			i = this.z,
			r = e.elements;
		return (
			(this.x = r[0] * t + r[4] * n + r[8] * i),
			(this.y = r[1] * t + r[5] * n + r[9] * i),
			(this.z = r[2] * t + r[6] * n + r[10] * i),
			this.normalize()
		);
	}
	divide(e) {
		return (this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return (
			(this.x = Math.min(this.x, e.x)),
			(this.y = Math.min(this.y, e.y)),
			(this.z = Math.min(this.z, e.z)),
			this
		);
	}
	max(e) {
		return (
			(this.x = Math.max(this.x, e.x)),
			(this.y = Math.max(this.y, e.y)),
			(this.z = Math.max(this.z, e.z)),
			this
		);
	}
	clamp(e, t) {
		return (
			(this.x = Math.max(e.x, Math.min(t.x, this.x))),
			(this.y = Math.max(e.y, Math.min(t.y, this.y))),
			(this.z = Math.max(e.z, Math.min(t.z, this.z))),
			this
		);
	}
	clampScalar(e, t) {
		return (
			(this.x = Math.max(e, Math.min(t, this.x))),
			(this.y = Math.max(e, Math.min(t, this.y))),
			(this.z = Math.max(e, Math.min(t, this.z))),
			this
		);
	}
	clampLength(e, t) {
		const n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
	}
	floor() {
		return (
			(this.x = Math.floor(this.x)),
			(this.y = Math.floor(this.y)),
			(this.z = Math.floor(this.z)),
			this
		);
	}
	ceil() {
		return (
			(this.x = Math.ceil(this.x)),
			(this.y = Math.ceil(this.y)),
			(this.z = Math.ceil(this.z)),
			this
		);
	}
	round() {
		return (
			(this.x = Math.round(this.x)),
			(this.y = Math.round(this.y)),
			(this.z = Math.round(this.z)),
			this
		);
	}
	roundToZero() {
		return (
			(this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
			(this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
			(this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
			this
		);
	}
	negate() {
		return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return (
			(this.x += (e.x - this.x) * t),
			(this.y += (e.y - this.y) * t),
			(this.z += (e.z - this.z) * t),
			this
		);
	}
	lerpVectors(e, t, n) {
		return (
			(this.x = e.x + (t.x - e.x) * n),
			(this.y = e.y + (t.y - e.y) * n),
			(this.z = e.z + (t.z - e.z) * n),
			this
		);
	}
	cross(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."
			  ),
			  this.crossVectors(e, t))
			: this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		const n = e.x,
			i = e.y,
			r = e.z,
			o = t.x,
			a = t.y,
			l = t.z;
		return (
			(this.x = i * l - r * a),
			(this.y = r * o - n * l),
			(this.z = n * a - i * o),
			this
		);
	}
	projectOnVector(e) {
		const t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		const n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return qo.copy(this).projectOnVector(e), this.sub(qo);
	}
	reflect(e) {
		return this.sub(qo.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		const t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		const n = this.dot(e) / t;
		return Math.acos(Mt(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		const t = this.x - e.x,
			n = this.y - e.y,
			i = this.z - e.z;
		return t * t + n * n + i * i;
	}
	manhattanDistanceTo(e) {
		return (
			Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
		);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		const i = Math.sin(t) * e;
		return (
			(this.x = i * Math.sin(n)),
			(this.y = Math.cos(t) * e),
			(this.z = i * Math.cos(n)),
			this
		);
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return (
			(this.x = e * Math.sin(t)), (this.y = n), (this.z = e * Math.cos(t)), this
		);
	}
	setFromMatrixPosition(e) {
		const t = e.elements;
		return (this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this;
	}
	setFromMatrixScale(e) {
		const t = this.setFromMatrixColumn(e, 0).length(),
			n = this.setFromMatrixColumn(e, 1).length(),
			i = this.setFromMatrixColumn(e, 2).length();
		return (this.x = t), (this.y = n), (this.z = i), this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this;
	}
	toArray(e = [], t = 0) {
		return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e;
	}
	fromBufferAttribute(e, t, n) {
		return (
			n !== void 0 &&
				console.warn(
					"THREE.Vector3: offset has been removed from .fromBufferAttribute()."
				),
			(this.x = e.getX(t)),
			(this.y = e.getY(t)),
			(this.z = e.getZ(t)),
			this
		);
	}
	random() {
		return (
			(this.x = Math.random()),
			(this.y = Math.random()),
			(this.z = Math.random()),
			this
		);
	}
	randomDirection() {
		const e = (Math.random() - 0.5) * 2,
			t = Math.random() * Math.PI * 2,
			n = Math.sqrt(1 - e ** 2);
		return (
			(this.x = n * Math.cos(t)), (this.y = n * Math.sin(t)), (this.z = e), this
		);
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}
w.prototype.isVector3 = !0;
const qo = new w(),
	Kl = new gt();
class Bt {
	constructor(
		e = new w(1 / 0, 1 / 0, 1 / 0),
		t = new w(-1 / 0, -1 / 0, -1 / 0)
	) {
		(this.min = e), (this.max = t);
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		let t = 1 / 0,
			n = 1 / 0,
			i = 1 / 0,
			r = -1 / 0,
			o = -1 / 0,
			a = -1 / 0;
		for (let l = 0, c = e.length; l < c; l += 3) {
			const h = e[l],
				u = e[l + 1],
				d = e[l + 2];
			h < t && (t = h),
				u < n && (n = u),
				d < i && (i = d),
				h > r && (r = h),
				u > o && (o = u),
				d > a && (a = d);
		}
		return this.min.set(t, n, i), this.max.set(r, o, a), this;
	}
	setFromBufferAttribute(e) {
		let t = 1 / 0,
			n = 1 / 0,
			i = 1 / 0,
			r = -1 / 0,
			o = -1 / 0,
			a = -1 / 0;
		for (let l = 0, c = e.count; l < c; l++) {
			const h = e.getX(l),
				u = e.getY(l),
				d = e.getZ(l);
			h < t && (t = h),
				u < n && (n = u),
				d < i && (i = d),
				h > r && (r = h),
				u > o && (o = u),
				d > a && (a = d);
		}
		return this.min.set(t, n, i), this.max.set(r, o, a), this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		const n = kn.copy(t).multiplyScalar(0.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return (
			(this.min.x = this.min.y = this.min.z = 1 / 0),
			(this.max.x = this.max.y = this.max.z = -1 / 0),
			this
		);
	}
	isEmpty() {
		return (
			this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
		);
	}
	getCenter(e) {
		return this.isEmpty()
			? e.set(0, 0, 0)
			: e.addVectors(this.min, this.max).multiplyScalar(0.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		const n = e.geometry;
		if (n !== void 0)
			if (t && n.attributes != null && n.attributes.position !== void 0) {
				const r = n.attributes.position;
				for (let o = 0, a = r.count; o < a; o++)
					kn.fromBufferAttribute(r, o).applyMatrix4(e.matrixWorld),
						this.expandByPoint(kn);
			} else
				n.boundingBox === null && n.computeBoundingBox(),
					Xo.copy(n.boundingBox),
					Xo.applyMatrix4(e.matrixWorld),
					this.union(Xo);
		const i = e.children;
		for (let r = 0, o = i.length; r < o; r++) this.expandByObject(i[r], t);
		return this;
	}
	containsPoint(e) {
		return !(
			e.x < this.min.x ||
			e.x > this.max.x ||
			e.y < this.min.y ||
			e.y > this.max.y ||
			e.z < this.min.z ||
			e.z > this.max.z
		);
	}
	containsBox(e) {
		return (
			this.min.x <= e.min.x &&
			e.max.x <= this.max.x &&
			this.min.y <= e.min.y &&
			e.max.y <= this.max.y &&
			this.min.z <= e.min.z &&
			e.max.z <= this.max.z
		);
	}
	getParameter(e, t) {
		return t.set(
			(e.x - this.min.x) / (this.max.x - this.min.x),
			(e.y - this.min.y) / (this.max.y - this.min.y),
			(e.z - this.min.z) / (this.max.z - this.min.z)
		);
	}
	intersectsBox(e) {
		return !(
			e.max.x < this.min.x ||
			e.min.x > this.max.x ||
			e.max.y < this.min.y ||
			e.min.y > this.max.y ||
			e.max.z < this.min.z ||
			e.min.z > this.max.z
		);
	}
	intersectsSphere(e) {
		return (
			this.clampPoint(e.center, kn),
			kn.distanceToSquared(e.center) <= e.radius * e.radius
		);
	}
	intersectsPlane(e) {
		let t, n;
		return (
			e.normal.x > 0
				? ((t = e.normal.x * this.min.x), (n = e.normal.x * this.max.x))
				: ((t = e.normal.x * this.max.x), (n = e.normal.x * this.min.x)),
			e.normal.y > 0
				? ((t += e.normal.y * this.min.y), (n += e.normal.y * this.max.y))
				: ((t += e.normal.y * this.max.y), (n += e.normal.y * this.min.y)),
			e.normal.z > 0
				? ((t += e.normal.z * this.min.z), (n += e.normal.z * this.max.z))
				: ((t += e.normal.z * this.max.z), (n += e.normal.z * this.min.z)),
			t <= -e.constant && n >= -e.constant
		);
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(vr),
			us.subVectors(this.max, vr),
			Ai.subVectors(e.a, vr),
			Ci.subVectors(e.b, vr),
			Ri.subVectors(e.c, vr),
			Mn.subVectors(Ci, Ai),
			wn.subVectors(Ri, Ci),
			Vn.subVectors(Ai, Ri);
		let t = [
			0,
			-Mn.z,
			Mn.y,
			0,
			-wn.z,
			wn.y,
			0,
			-Vn.z,
			Vn.y,
			Mn.z,
			0,
			-Mn.x,
			wn.z,
			0,
			-wn.x,
			Vn.z,
			0,
			-Vn.x,
			-Mn.y,
			Mn.x,
			0,
			-wn.y,
			wn.x,
			0,
			-Vn.y,
			Vn.x,
			0
		];
		return !Yo(t, Ai, Ci, Ri, us) ||
			((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !Yo(t, Ai, Ci, Ri, us))
			? !1
			: (ds.crossVectors(Mn, wn), (t = [ds.x, ds.y, ds.z]), Yo(t, Ai, Ci, Ri, us));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return kn.copy(e).clamp(this.min, this.max).sub(e).length();
	}
	getBoundingSphere(e) {
		return (
			this.getCenter(e.center), (e.radius = this.getSize(kn).length() * 0.5), e
		);
	}
	intersect(e) {
		return (
			this.min.max(e.min),
			this.max.min(e.max),
			this.isEmpty() && this.makeEmpty(),
			this
		);
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty()
			? this
			: (on[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
			  on[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
			  on[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
			  on[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
			  on[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
			  on[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
			  on[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
			  on[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
			  this.setFromPoints(on),
			  this);
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
}
Bt.prototype.isBox3 = !0;
const on = [
		new w(),
		new w(),
		new w(),
		new w(),
		new w(),
		new w(),
		new w(),
		new w()
	],
	kn = new w(),
	Xo = new Bt(),
	Ai = new w(),
	Ci = new w(),
	Ri = new w(),
	Mn = new w(),
	wn = new w(),
	Vn = new w(),
	vr = new w(),
	us = new w(),
	ds = new w(),
	Wn = new w();
function Yo(s, e, t, n, i) {
	for (let r = 0, o = s.length - 3; r <= o; r += 3) {
		Wn.fromArray(s, r);
		const a = i.x * Math.abs(Wn.x) + i.y * Math.abs(Wn.y) + i.z * Math.abs(Wn.z),
			l = e.dot(Wn),
			c = t.dot(Wn),
			h = n.dot(Wn);
		if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a) return !1;
	}
	return !0;
}
const If = new Bt(),
	Ql = new w(),
	fs = new w(),
	Zo = new w();
class On {
	constructor(e = new w(), t = -1) {
		(this.center = e), (this.radius = t);
	}
	set(e, t) {
		return this.center.copy(e), (this.radius = t), this;
	}
	setFromPoints(e, t) {
		const n = this.center;
		t !== void 0 ? n.copy(t) : If.setFromPoints(e).getCenter(n);
		let i = 0;
		for (let r = 0, o = e.length; r < o; r++)
			i = Math.max(i, n.distanceToSquared(e[r]));
		return (this.radius = Math.sqrt(i)), this;
	}
	copy(e) {
		return this.center.copy(e.center), (this.radius = e.radius), this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), (this.radius = -1), this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		const t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		const n = this.center.distanceToSquared(e);
		return (
			t.copy(e),
			n > this.radius * this.radius &&
				(t.sub(this.center).normalize(),
				t.multiplyScalar(this.radius).add(this.center)),
			t
		);
	}
	getBoundingBox(e) {
		return this.isEmpty()
			? (e.makeEmpty(), e)
			: (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return (
			this.center.applyMatrix4(e),
			(this.radius = this.radius * e.getMaxScaleOnAxis()),
			this
		);
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		Zo.subVectors(e, this.center);
		const t = Zo.lengthSq();
		if (t > this.radius * this.radius) {
			const n = Math.sqrt(t),
				i = (n - this.radius) * 0.5;
			this.center.add(Zo.multiplyScalar(i / n)), (this.radius += i);
		}
		return this;
	}
	union(e) {
		return (
			this.center.equals(e.center) === !0
				? fs.set(0, 0, 1).multiplyScalar(e.radius)
				: fs.subVectors(e.center, this.center).normalize().multiplyScalar(e.radius),
			this.expandByPoint(Ql.copy(e.center).add(fs)),
			this.expandByPoint(Ql.copy(e.center).sub(fs)),
			this
		);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
const an = new w(),
	Jo = new w(),
	ps = new w(),
	Sn = new w(),
	jo = new w(),
	ms = new w(),
	$o = new w();
class Un {
	constructor(e = new w(), t = new w(0, 0, -1)) {
		(this.origin = e), (this.direction = t);
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.direction).multiplyScalar(e).add(this.origin);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, an)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		const n = t.dot(this.direction);
		return n < 0
			? t.copy(this.origin)
			: t.copy(this.direction).multiplyScalar(n).add(this.origin);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		const t = an.subVectors(e, this.origin).dot(this.direction);
		return t < 0
			? this.origin.distanceToSquared(e)
			: (an.copy(this.direction).multiplyScalar(t).add(this.origin),
			  an.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, i) {
		Jo.copy(e).add(t).multiplyScalar(0.5),
			ps.copy(t).sub(e).normalize(),
			Sn.copy(this.origin).sub(Jo);
		const r = e.distanceTo(t) * 0.5,
			o = -this.direction.dot(ps),
			a = Sn.dot(this.direction),
			l = -Sn.dot(ps),
			c = Sn.lengthSq(),
			h = Math.abs(1 - o * o);
		let u, d, f, m;
		if (h > 0)
			if (((u = o * l - a), (d = o * a - l), (m = r * h), u >= 0))
				if (d >= -m)
					if (d <= m) {
						const x = 1 / h;
						(u *= x),
							(d *= x),
							(f = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * l) + c);
					} else
						(d = r),
							(u = Math.max(0, -(o * d + a))),
							(f = -u * u + d * (d + 2 * l) + c);
				else
					(d = -r),
						(u = Math.max(0, -(o * d + a))),
						(f = -u * u + d * (d + 2 * l) + c);
			else
				d <= -m
					? ((u = Math.max(0, -(-o * r + a))),
					  (d = u > 0 ? -r : Math.min(Math.max(-r, -l), r)),
					  (f = -u * u + d * (d + 2 * l) + c))
					: d <= m
					? ((u = 0), (d = Math.min(Math.max(-r, -l), r)), (f = d * (d + 2 * l) + c))
					: ((u = Math.max(0, -(o * r + a))),
					  (d = u > 0 ? r : Math.min(Math.max(-r, -l), r)),
					  (f = -u * u + d * (d + 2 * l) + c));
		else
			(d = o > 0 ? -r : r),
				(u = Math.max(0, -(o * d + a))),
				(f = -u * u + d * (d + 2 * l) + c);
		return (
			n && n.copy(this.direction).multiplyScalar(u).add(this.origin),
			i && i.copy(ps).multiplyScalar(d).add(Jo),
			f
		);
	}
	intersectSphere(e, t) {
		an.subVectors(e.center, this.origin);
		const n = an.dot(this.direction),
			i = an.dot(an) - n * n,
			r = e.radius * e.radius;
		if (i > r) return null;
		const o = Math.sqrt(r - i),
			a = n - o,
			l = n + o;
		return a < 0 && l < 0 ? null : a < 0 ? this.at(l, t) : this.at(a, t);
	}
	intersectsSphere(e) {
		return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		const t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		const n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		const n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		const t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, i, r, o, a, l;
		const c = 1 / this.direction.x,
			h = 1 / this.direction.y,
			u = 1 / this.direction.z,
			d = this.origin;
		return (
			c >= 0
				? ((n = (e.min.x - d.x) * c), (i = (e.max.x - d.x) * c))
				: ((n = (e.max.x - d.x) * c), (i = (e.min.x - d.x) * c)),
			h >= 0
				? ((r = (e.min.y - d.y) * h), (o = (e.max.y - d.y) * h))
				: ((r = (e.max.y - d.y) * h), (o = (e.min.y - d.y) * h)),
			n > o ||
			r > i ||
			((r > n || n !== n) && (n = r),
			(o < i || i !== i) && (i = o),
			u >= 0
				? ((a = (e.min.z - d.z) * u), (l = (e.max.z - d.z) * u))
				: ((a = (e.max.z - d.z) * u), (l = (e.min.z - d.z) * u)),
			n > l || a > i) ||
			((a > n || n !== n) && (n = a), (l < i || i !== i) && (i = l), i < 0)
				? null
				: this.at(n >= 0 ? n : i, t)
		);
	}
	intersectsBox(e) {
		return this.intersectBox(e, an) !== null;
	}
	intersectTriangle(e, t, n, i, r) {
		jo.subVectors(t, e), ms.subVectors(n, e), $o.crossVectors(jo, ms);
		let o = this.direction.dot($o),
			a;
		if (o > 0) {
			if (i) return null;
			a = 1;
		} else if (o < 0) (a = -1), (o = -o);
		else return null;
		Sn.subVectors(this.origin, e);
		const l = a * this.direction.dot(ms.crossVectors(Sn, ms));
		if (l < 0) return null;
		const c = a * this.direction.dot(jo.cross(Sn));
		if (c < 0 || l + c > o) return null;
		const h = -a * Sn.dot($o);
		return h < 0 ? null : this.at(h / o, r);
	}
	applyMatrix4(e) {
		return (
			this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
		);
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
class pe {
	constructor() {
		(this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
			arguments.length > 0 &&
				console.error(
					"THREE.Matrix4: the constructor no longer reads arguments. use .set() instead."
				);
	}
	set(e, t, n, i, r, o, a, l, c, h, u, d, f, m, x, y) {
		const g = this.elements;
		return (
			(g[0] = e),
			(g[4] = t),
			(g[8] = n),
			(g[12] = i),
			(g[1] = r),
			(g[5] = o),
			(g[9] = a),
			(g[13] = l),
			(g[2] = c),
			(g[6] = h),
			(g[10] = u),
			(g[14] = d),
			(g[3] = f),
			(g[7] = m),
			(g[11] = x),
			(g[15] = y),
			this
		);
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new pe().fromArray(this.elements);
	}
	copy(e) {
		const t = this.elements,
			n = e.elements;
		return (
			(t[0] = n[0]),
			(t[1] = n[1]),
			(t[2] = n[2]),
			(t[3] = n[3]),
			(t[4] = n[4]),
			(t[5] = n[5]),
			(t[6] = n[6]),
			(t[7] = n[7]),
			(t[8] = n[8]),
			(t[9] = n[9]),
			(t[10] = n[10]),
			(t[11] = n[11]),
			(t[12] = n[12]),
			(t[13] = n[13]),
			(t[14] = n[14]),
			(t[15] = n[15]),
			this
		);
	}
	copyPosition(e) {
		const t = this.elements,
			n = e.elements;
		return (t[12] = n[12]), (t[13] = n[13]), (t[14] = n[14]), this;
	}
	setFromMatrix3(e) {
		const t = e.elements;
		return (
			this.set(
				t[0],
				t[3],
				t[6],
				0,
				t[1],
				t[4],
				t[7],
				0,
				t[2],
				t[5],
				t[8],
				0,
				0,
				0,
				0,
				1
			),
			this
		);
	}
	extractBasis(e, t, n) {
		return (
			e.setFromMatrixColumn(this, 0),
			t.setFromMatrixColumn(this, 1),
			n.setFromMatrixColumn(this, 2),
			this
		);
	}
	makeBasis(e, t, n) {
		return (
			this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1),
			this
		);
	}
	extractRotation(e) {
		const t = this.elements,
			n = e.elements,
			i = 1 / Li.setFromMatrixColumn(e, 0).length(),
			r = 1 / Li.setFromMatrixColumn(e, 1).length(),
			o = 1 / Li.setFromMatrixColumn(e, 2).length();
		return (
			(t[0] = n[0] * i),
			(t[1] = n[1] * i),
			(t[2] = n[2] * i),
			(t[3] = 0),
			(t[4] = n[4] * r),
			(t[5] = n[5] * r),
			(t[6] = n[6] * r),
			(t[7] = 0),
			(t[8] = n[8] * o),
			(t[9] = n[9] * o),
			(t[10] = n[10] * o),
			(t[11] = 0),
			(t[12] = 0),
			(t[13] = 0),
			(t[14] = 0),
			(t[15] = 1),
			this
		);
	}
	makeRotationFromEuler(e) {
		(e && e.isEuler) ||
			console.error(
				"THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order."
			);
		const t = this.elements,
			n = e.x,
			i = e.y,
			r = e.z,
			o = Math.cos(n),
			a = Math.sin(n),
			l = Math.cos(i),
			c = Math.sin(i),
			h = Math.cos(r),
			u = Math.sin(r);
		if (e.order === "XYZ") {
			const d = o * h,
				f = o * u,
				m = a * h,
				x = a * u;
			(t[0] = l * h),
				(t[4] = -l * u),
				(t[8] = c),
				(t[1] = f + m * c),
				(t[5] = d - x * c),
				(t[9] = -a * l),
				(t[2] = x - d * c),
				(t[6] = m + f * c),
				(t[10] = o * l);
		} else if (e.order === "YXZ") {
			const d = l * h,
				f = l * u,
				m = c * h,
				x = c * u;
			(t[0] = d + x * a),
				(t[4] = m * a - f),
				(t[8] = o * c),
				(t[1] = o * u),
				(t[5] = o * h),
				(t[9] = -a),
				(t[2] = f * a - m),
				(t[6] = x + d * a),
				(t[10] = o * l);
		} else if (e.order === "ZXY") {
			const d = l * h,
				f = l * u,
				m = c * h,
				x = c * u;
			(t[0] = d - x * a),
				(t[4] = -o * u),
				(t[8] = m + f * a),
				(t[1] = f + m * a),
				(t[5] = o * h),
				(t[9] = x - d * a),
				(t[2] = -o * c),
				(t[6] = a),
				(t[10] = o * l);
		} else if (e.order === "ZYX") {
			const d = o * h,
				f = o * u,
				m = a * h,
				x = a * u;
			(t[0] = l * h),
				(t[4] = m * c - f),
				(t[8] = d * c + x),
				(t[1] = l * u),
				(t[5] = x * c + d),
				(t[9] = f * c - m),
				(t[2] = -c),
				(t[6] = a * l),
				(t[10] = o * l);
		} else if (e.order === "YZX") {
			const d = o * l,
				f = o * c,
				m = a * l,
				x = a * c;
			(t[0] = l * h),
				(t[4] = x - d * u),
				(t[8] = m * u + f),
				(t[1] = u),
				(t[5] = o * h),
				(t[9] = -a * h),
				(t[2] = -c * h),
				(t[6] = f * u + m),
				(t[10] = d - x * u);
		} else if (e.order === "XZY") {
			const d = o * l,
				f = o * c,
				m = a * l,
				x = a * c;
			(t[0] = l * h),
				(t[4] = -u),
				(t[8] = c * h),
				(t[1] = d * u + x),
				(t[5] = o * h),
				(t[9] = f * u - m),
				(t[2] = m * u - f),
				(t[6] = a * h),
				(t[10] = x * u + d);
		}
		return (
			(t[3] = 0),
			(t[7] = 0),
			(t[11] = 0),
			(t[12] = 0),
			(t[13] = 0),
			(t[14] = 0),
			(t[15] = 1),
			this
		);
	}
	makeRotationFromQuaternion(e) {
		return this.compose(Ff, e, Bf);
	}
	lookAt(e, t, n) {
		const i = this.elements;
		return (
			Pt.subVectors(e, t),
			Pt.lengthSq() === 0 && (Pt.z = 1),
			Pt.normalize(),
			Tn.crossVectors(n, Pt),
			Tn.lengthSq() === 0 &&
				(Math.abs(n.z) === 1 ? (Pt.x += 1e-4) : (Pt.z += 1e-4),
				Pt.normalize(),
				Tn.crossVectors(n, Pt)),
			Tn.normalize(),
			gs.crossVectors(Pt, Tn),
			(i[0] = Tn.x),
			(i[4] = gs.x),
			(i[8] = Pt.x),
			(i[1] = Tn.y),
			(i[5] = gs.y),
			(i[9] = Pt.y),
			(i[2] = Tn.z),
			(i[6] = gs.z),
			(i[10] = Pt.z),
			this
		);
	}
	multiply(e, t) {
		return t !== void 0
			? (console.warn(
					"THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
			  ),
			  this.multiplyMatrices(e, t))
			: this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		const n = e.elements,
			i = t.elements,
			r = this.elements,
			o = n[0],
			a = n[4],
			l = n[8],
			c = n[12],
			h = n[1],
			u = n[5],
			d = n[9],
			f = n[13],
			m = n[2],
			x = n[6],
			y = n[10],
			g = n[14],
			p = n[3],
			M = n[7],
			v = n[11],
			_ = n[15],
			E = i[0],
			A = i[4],
			D = i[8],
			H = i[12],
			I = i[1],
			b = i[5],
			L = i[9],
			F = i[13],
			B = i[2],
			O = i[6],
			N = i[10],
			X = i[14],
			Q = i[3],
			ae = i[7],
			Z = i[11],
			K = i[15];
		return (
			(r[0] = o * E + a * I + l * B + c * Q),
			(r[4] = o * A + a * b + l * O + c * ae),
			(r[8] = o * D + a * L + l * N + c * Z),
			(r[12] = o * H + a * F + l * X + c * K),
			(r[1] = h * E + u * I + d * B + f * Q),
			(r[5] = h * A + u * b + d * O + f * ae),
			(r[9] = h * D + u * L + d * N + f * Z),
			(r[13] = h * H + u * F + d * X + f * K),
			(r[2] = m * E + x * I + y * B + g * Q),
			(r[6] = m * A + x * b + y * O + g * ae),
			(r[10] = m * D + x * L + y * N + g * Z),
			(r[14] = m * H + x * F + y * X + g * K),
			(r[3] = p * E + M * I + v * B + _ * Q),
			(r[7] = p * A + M * b + v * O + _ * ae),
			(r[11] = p * D + M * L + v * N + _ * Z),
			(r[15] = p * H + M * F + v * X + _ * K),
			this
		);
	}
	multiplyScalar(e) {
		const t = this.elements;
		return (
			(t[0] *= e),
			(t[4] *= e),
			(t[8] *= e),
			(t[12] *= e),
			(t[1] *= e),
			(t[5] *= e),
			(t[9] *= e),
			(t[13] *= e),
			(t[2] *= e),
			(t[6] *= e),
			(t[10] *= e),
			(t[14] *= e),
			(t[3] *= e),
			(t[7] *= e),
			(t[11] *= e),
			(t[15] *= e),
			this
		);
	}
	determinant() {
		const e = this.elements,
			t = e[0],
			n = e[4],
			i = e[8],
			r = e[12],
			o = e[1],
			a = e[5],
			l = e[9],
			c = e[13],
			h = e[2],
			u = e[6],
			d = e[10],
			f = e[14],
			m = e[3],
			x = e[7],
			y = e[11],
			g = e[15];
		return (
			m *
				(+r * l * u - i * c * u - r * a * d + n * c * d + i * a * f - n * l * f) +
			x *
				(+t * l * f - t * c * d + r * o * d - i * o * f + i * c * h - r * l * h) +
			y *
				(+t * c * u - t * a * f - r * o * u + n * o * f + r * a * h - n * c * h) +
			g * (-i * a * h - t * l * u + t * a * d + i * o * u - n * o * d + n * l * h)
		);
	}
	transpose() {
		const e = this.elements;
		let t;
		return (
			(t = e[1]),
			(e[1] = e[4]),
			(e[4] = t),
			(t = e[2]),
			(e[2] = e[8]),
			(e[8] = t),
			(t = e[6]),
			(e[6] = e[9]),
			(e[9] = t),
			(t = e[3]),
			(e[3] = e[12]),
			(e[12] = t),
			(t = e[7]),
			(e[7] = e[13]),
			(e[13] = t),
			(t = e[11]),
			(e[11] = e[14]),
			(e[14] = t),
			this
		);
	}
	setPosition(e, t, n) {
		const i = this.elements;
		return (
			e.isVector3
				? ((i[12] = e.x), (i[13] = e.y), (i[14] = e.z))
				: ((i[12] = e), (i[13] = t), (i[14] = n)),
			this
		);
	}
	invert() {
		const e = this.elements,
			t = e[0],
			n = e[1],
			i = e[2],
			r = e[3],
			o = e[4],
			a = e[5],
			l = e[6],
			c = e[7],
			h = e[8],
			u = e[9],
			d = e[10],
			f = e[11],
			m = e[12],
			x = e[13],
			y = e[14],
			g = e[15],
			p = u * y * c - x * d * c + x * l * f - a * y * f - u * l * g + a * d * g,
			M = m * d * c - h * y * c - m * l * f + o * y * f + h * l * g - o * d * g,
			v = h * x * c - m * u * c + m * a * f - o * x * f - h * a * g + o * u * g,
			_ = m * u * l - h * x * l - m * a * d + o * x * d + h * a * y - o * u * y,
			E = t * p + n * M + i * v + r * _;
		if (E === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		const A = 1 / E;
		return (
			(e[0] = p * A),
			(e[1] =
				(x * d * r - u * y * r - x * i * f + n * y * f + u * i * g - n * d * g) *
				A),
			(e[2] =
				(a * y * r - x * l * r + x * i * c - n * y * c - a * i * g + n * l * g) *
				A),
			(e[3] =
				(u * l * r - a * d * r - u * i * c + n * d * c + a * i * f - n * l * f) *
				A),
			(e[4] = M * A),
			(e[5] =
				(h * y * r - m * d * r + m * i * f - t * y * f - h * i * g + t * d * g) *
				A),
			(e[6] =
				(m * l * r - o * y * r - m * i * c + t * y * c + o * i * g - t * l * g) *
				A),
			(e[7] =
				(o * d * r - h * l * r + h * i * c - t * d * c - o * i * f + t * l * f) *
				A),
			(e[8] = v * A),
			(e[9] =
				(m * u * r - h * x * r - m * n * f + t * x * f + h * n * g - t * u * g) *
				A),
			(e[10] =
				(o * x * r - m * a * r + m * n * c - t * x * c - o * n * g + t * a * g) *
				A),
			(e[11] =
				(h * a * r - o * u * r - h * n * c + t * u * c + o * n * f - t * a * f) *
				A),
			(e[12] = _ * A),
			(e[13] =
				(h * x * i - m * u * i + m * n * d - t * x * d - h * n * y + t * u * y) *
				A),
			(e[14] =
				(m * a * i - o * x * i - m * n * l + t * x * l + o * n * y - t * a * y) *
				A),
			(e[15] =
				(o * u * i - h * a * i + h * n * l - t * u * l - o * n * d + t * a * d) *
				A),
			this
		);
	}
	scale(e) {
		const t = this.elements,
			n = e.x,
			i = e.y,
			r = e.z;
		return (
			(t[0] *= n),
			(t[4] *= i),
			(t[8] *= r),
			(t[1] *= n),
			(t[5] *= i),
			(t[9] *= r),
			(t[2] *= n),
			(t[6] *= i),
			(t[10] *= r),
			(t[3] *= n),
			(t[7] *= i),
			(t[11] *= r),
			this
		);
	}
	getMaxScaleOnAxis() {
		const e = this.elements,
			t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
			n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
			i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, i));
	}
	makeTranslation(e, t, n) {
		return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		const t = Math.cos(e),
			n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		const t = Math.cos(e),
			n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		const t = Math.cos(e),
			n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		const n = Math.cos(t),
			i = Math.sin(t),
			r = 1 - n,
			o = e.x,
			a = e.y,
			l = e.z,
			c = r * o,
			h = r * a;
		return (
			this.set(
				c * o + n,
				c * a - i * l,
				c * l + i * a,
				0,
				c * a + i * l,
				h * a + n,
				h * l - i * o,
				0,
				c * l - i * a,
				h * l + i * o,
				r * l * l + n,
				0,
				0,
				0,
				0,
				1
			),
			this
		);
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, i, r, o) {
		return this.set(1, n, r, 0, e, 1, o, 0, t, i, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		const i = this.elements,
			r = t._x,
			o = t._y,
			a = t._z,
			l = t._w,
			c = r + r,
			h = o + o,
			u = a + a,
			d = r * c,
			f = r * h,
			m = r * u,
			x = o * h,
			y = o * u,
			g = a * u,
			p = l * c,
			M = l * h,
			v = l * u,
			_ = n.x,
			E = n.y,
			A = n.z;
		return (
			(i[0] = (1 - (x + g)) * _),
			(i[1] = (f + v) * _),
			(i[2] = (m - M) * _),
			(i[3] = 0),
			(i[4] = (f - v) * E),
			(i[5] = (1 - (d + g)) * E),
			(i[6] = (y + p) * E),
			(i[7] = 0),
			(i[8] = (m + M) * A),
			(i[9] = (y - p) * A),
			(i[10] = (1 - (d + x)) * A),
			(i[11] = 0),
			(i[12] = e.x),
			(i[13] = e.y),
			(i[14] = e.z),
			(i[15] = 1),
			this
		);
	}
	decompose(e, t, n) {
		const i = this.elements;
		let r = Li.set(i[0], i[1], i[2]).length();
		const o = Li.set(i[4], i[5], i[6]).length(),
			a = Li.set(i[8], i[9], i[10]).length();
		this.determinant() < 0 && (r = -r),
			(e.x = i[12]),
			(e.y = i[13]),
			(e.z = i[14]),
			Ht.copy(this);
		const c = 1 / r,
			h = 1 / o,
			u = 1 / a;
		return (
			(Ht.elements[0] *= c),
			(Ht.elements[1] *= c),
			(Ht.elements[2] *= c),
			(Ht.elements[4] *= h),
			(Ht.elements[5] *= h),
			(Ht.elements[6] *= h),
			(Ht.elements[8] *= u),
			(Ht.elements[9] *= u),
			(Ht.elements[10] *= u),
			t.setFromRotationMatrix(Ht),
			(n.x = r),
			(n.y = o),
			(n.z = a),
			this
		);
	}
	makePerspective(e, t, n, i, r, o) {
		o === void 0 &&
			console.warn(
				"THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs."
			);
		const a = this.elements,
			l = (2 * r) / (t - e),
			c = (2 * r) / (n - i),
			h = (t + e) / (t - e),
			u = (n + i) / (n - i),
			d = -(o + r) / (o - r),
			f = (-2 * o * r) / (o - r);
		return (
			(a[0] = l),
			(a[4] = 0),
			(a[8] = h),
			(a[12] = 0),
			(a[1] = 0),
			(a[5] = c),
			(a[9] = u),
			(a[13] = 0),
			(a[2] = 0),
			(a[6] = 0),
			(a[10] = d),
			(a[14] = f),
			(a[3] = 0),
			(a[7] = 0),
			(a[11] = -1),
			(a[15] = 0),
			this
		);
	}
	makeOrthographic(e, t, n, i, r, o) {
		const a = this.elements,
			l = 1 / (t - e),
			c = 1 / (n - i),
			h = 1 / (o - r),
			u = (t + e) * l,
			d = (n + i) * c,
			f = (o + r) * h;
		return (
			(a[0] = 2 * l),
			(a[4] = 0),
			(a[8] = 0),
			(a[12] = -u),
			(a[1] = 0),
			(a[5] = 2 * c),
			(a[9] = 0),
			(a[13] = -d),
			(a[2] = 0),
			(a[6] = 0),
			(a[10] = -2 * h),
			(a[14] = -f),
			(a[3] = 0),
			(a[7] = 0),
			(a[11] = 0),
			(a[15] = 1),
			this
		);
	}
	equals(e) {
		const t = this.elements,
			n = e.elements;
		for (let i = 0; i < 16; i++) if (t[i] !== n[i]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		const n = this.elements;
		return (
			(e[t] = n[0]),
			(e[t + 1] = n[1]),
			(e[t + 2] = n[2]),
			(e[t + 3] = n[3]),
			(e[t + 4] = n[4]),
			(e[t + 5] = n[5]),
			(e[t + 6] = n[6]),
			(e[t + 7] = n[7]),
			(e[t + 8] = n[8]),
			(e[t + 9] = n[9]),
			(e[t + 10] = n[10]),
			(e[t + 11] = n[11]),
			(e[t + 12] = n[12]),
			(e[t + 13] = n[13]),
			(e[t + 14] = n[14]),
			(e[t + 15] = n[15]),
			e
		);
	}
}
pe.prototype.isMatrix4 = !0;
const Li = new w(),
	Ht = new pe(),
	Ff = new w(0, 0, 0),
	Bf = new w(1, 1, 1),
	Tn = new w(),
	gs = new w(),
	Pt = new w(),
	ec = new pe(),
	tc = new gt();
class vi {
	constructor(e = 0, t = 0, n = 0, i = vi.DefaultOrder) {
		(this._x = e), (this._y = t), (this._z = n), (this._order = i);
	}
	get x() {
		return this._x;
	}
	set x(e) {
		(this._x = e), this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		(this._y = e), this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		(this._z = e), this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		(this._order = e), this._onChangeCallback();
	}
	set(e, t, n, i = this._order) {
		return (
			(this._x = e),
			(this._y = t),
			(this._z = n),
			(this._order = i),
			this._onChangeCallback(),
			this
		);
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return (
			(this._x = e._x),
			(this._y = e._y),
			(this._z = e._z),
			(this._order = e._order),
			this._onChangeCallback(),
			this
		);
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		const i = e.elements,
			r = i[0],
			o = i[4],
			a = i[8],
			l = i[1],
			c = i[5],
			h = i[9],
			u = i[2],
			d = i[6],
			f = i[10];
		switch (t) {
			case "XYZ":
				(this._y = Math.asin(Mt(a, -1, 1))),
					Math.abs(a) < 0.9999999
						? ((this._x = Math.atan2(-h, f)), (this._z = Math.atan2(-o, r)))
						: ((this._x = Math.atan2(d, c)), (this._z = 0));
				break;
			case "YXZ":
				(this._x = Math.asin(-Mt(h, -1, 1))),
					Math.abs(h) < 0.9999999
						? ((this._y = Math.atan2(a, f)), (this._z = Math.atan2(l, c)))
						: ((this._y = Math.atan2(-u, r)), (this._z = 0));
				break;
			case "ZXY":
				(this._x = Math.asin(Mt(d, -1, 1))),
					Math.abs(d) < 0.9999999
						? ((this._y = Math.atan2(-u, f)), (this._z = Math.atan2(-o, c)))
						: ((this._y = 0), (this._z = Math.atan2(l, r)));
				break;
			case "ZYX":
				(this._y = Math.asin(-Mt(u, -1, 1))),
					Math.abs(u) < 0.9999999
						? ((this._x = Math.atan2(d, f)), (this._z = Math.atan2(l, r)))
						: ((this._x = 0), (this._z = Math.atan2(-o, c)));
				break;
			case "YZX":
				(this._z = Math.asin(Mt(l, -1, 1))),
					Math.abs(l) < 0.9999999
						? ((this._x = Math.atan2(-h, c)), (this._y = Math.atan2(-u, r)))
						: ((this._x = 0), (this._y = Math.atan2(a, f)));
				break;
			case "XZY":
				(this._z = Math.asin(-Mt(o, -1, 1))),
					Math.abs(o) < 0.9999999
						? ((this._x = Math.atan2(d, c)), (this._y = Math.atan2(a, r)))
						: ((this._x = Math.atan2(-h, f)), (this._y = 0));
				break;
			default:
				console.warn(
					"THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t
				);
		}
		return (this._order = t), n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return ec.makeRotationFromQuaternion(e), this.setFromRotationMatrix(ec, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return tc.setFromEuler(this), this.setFromQuaternion(tc, e);
	}
	equals(e) {
		return (
			e._x === this._x &&
			e._y === this._y &&
			e._z === this._z &&
			e._order === this._order
		);
	}
	fromArray(e) {
		return (
			(this._x = e[0]),
			(this._y = e[1]),
			(this._z = e[2]),
			e[3] !== void 0 && (this._order = e[3]),
			this._onChangeCallback(),
			this
		);
	}
	toArray(e = [], t = 0) {
		return (
			(e[t] = this._x),
			(e[t + 1] = this._y),
			(e[t + 2] = this._z),
			(e[t + 3] = this._order),
			e
		);
	}
	toVector3(e) {
		return e
			? e.set(this._x, this._y, this._z)
			: new w(this._x, this._y, this._z);
	}
	_onChange(e) {
		return (this._onChangeCallback = e), this;
	}
	_onChangeCallback() {}
}
vi.prototype.isEuler = !0;
vi.DefaultOrder = "XYZ";
vi.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
class yo {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = ((1 << e) | 0) >>> 0;
	}
	enable(e) {
		this.mask |= (1 << e) | 0;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= (1 << e) | 0;
	}
	disable(e) {
		this.mask &= ~((1 << e) | 0);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return (this.mask & ((1 << e) | 0)) !== 0;
	}
}
let zf = 0;
const nc = new w(),
	Pi = new gt(),
	ln = new pe(),
	xs = new w(),
	_r = new w(),
	Nf = new w(),
	Of = new gt(),
	ic = new w(1, 0, 0),
	rc = new w(0, 1, 0),
	sc = new w(0, 0, 1),
	Uf = { type: "added" },
	oc = { type: "removed" };
class Fe extends bn {
	constructor() {
		super(),
			Object.defineProperty(this, "id", { value: zf++ }),
			(this.uuid = It()),
			(this.name = ""),
			(this.type = "Object3D"),
			(this.parent = null),
			(this.children = []),
			(this.up = Fe.DefaultUp.clone());
		const e = new w(),
			t = new vi(),
			n = new gt(),
			i = new w(1, 1, 1);
		function r() {
			n.setFromEuler(t, !1);
		}
		function o() {
			t.setFromQuaternion(n, void 0, !1);
		}
		t._onChange(r),
			n._onChange(o),
			Object.defineProperties(this, {
				position: { configurable: !0, enumerable: !0, value: e },
				rotation: { configurable: !0, enumerable: !0, value: t },
				quaternion: { configurable: !0, enumerable: !0, value: n },
				scale: { configurable: !0, enumerable: !0, value: i },
				modelViewMatrix: { value: new pe() },
				normalMatrix: { value: new mt() }
			}),
			(this.matrix = new pe()),
			(this.matrixWorld = new pe()),
			(this.matrixAutoUpdate = Fe.DefaultMatrixAutoUpdate),
			(this.matrixWorldNeedsUpdate = !1),
			(this.layers = new yo()),
			(this.visible = !0),
			(this.castShadow = !1),
			(this.receiveShadow = !1),
			(this.frustumCulled = !0),
			(this.renderOrder = 0),
			(this.animations = []),
			(this.userData = {});
	}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(),
			this.matrix.premultiply(e),
			this.matrix.decompose(this.position, this.quaternion, this.scale);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return Pi.setFromAxisAngle(e, t), this.quaternion.multiply(Pi), this;
	}
	rotateOnWorldAxis(e, t) {
		return Pi.setFromAxisAngle(e, t), this.quaternion.premultiply(Pi), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(ic, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(rc, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(sc, e);
	}
	translateOnAxis(e, t) {
		return (
			nc.copy(e).applyQuaternion(this.quaternion),
			this.position.add(nc.multiplyScalar(t)),
			this
		);
	}
	translateX(e) {
		return this.translateOnAxis(ic, e);
	}
	translateY(e) {
		return this.translateOnAxis(rc, e);
	}
	translateZ(e) {
		return this.translateOnAxis(sc, e);
	}
	localToWorld(e) {
		return e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return e.applyMatrix4(ln.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? xs.copy(e) : xs.set(e, t, n);
		const i = this.parent;
		this.updateWorldMatrix(!0, !1),
			_r.setFromMatrixPosition(this.matrixWorld),
			this.isCamera || this.isLight
				? ln.lookAt(_r, xs, this.up)
				: ln.lookAt(xs, _r, this.up),
			this.quaternion.setFromRotationMatrix(ln),
			i &&
				(ln.extractRotation(i.matrixWorld),
				Pi.setFromRotationMatrix(ln),
				this.quaternion.premultiply(Pi.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
			return this;
		}
		return e === this
			? (console.error(
					"THREE.Object3D.add: object can't be added as a child of itself.",
					e
			  ),
			  this)
			: (e && e.isObject3D
					? (e.parent !== null && e.parent.remove(e),
					  (e.parent = this),
					  this.children.push(e),
					  e.dispatchEvent(Uf))
					: console.error(
							"THREE.Object3D.add: object not an instance of THREE.Object3D.",
							e
					  ),
			  this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
			return this;
		}
		const t = this.children.indexOf(e);
		return (
			t !== -1 &&
				((e.parent = null), this.children.splice(t, 1), e.dispatchEvent(oc)),
			this
		);
	}
	removeFromParent() {
		const e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		for (let e = 0; e < this.children.length; e++) {
			const t = this.children[e];
			(t.parent = null), t.dispatchEvent(oc);
		}
		return (this.children.length = 0), this;
	}
	attach(e) {
		return (
			this.updateWorldMatrix(!0, !1),
			ln.copy(this.matrixWorld).invert(),
			e.parent !== null &&
				(e.parent.updateWorldMatrix(!0, !1), ln.multiply(e.parent.matrixWorld)),
			e.applyMatrix4(ln),
			this.add(e),
			e.updateWorldMatrix(!1, !0),
			this
		);
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, i = this.children.length; n < i; n++) {
			const o = this.children[n].getObjectByProperty(e, t);
			if (o !== void 0) return o;
		}
	}
	getWorldPosition(e) {
		return (
			this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
		);
	}
	getWorldQuaternion(e) {
		return (
			this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_r, e, Nf), e
		);
	}
	getWorldScale(e) {
		return (
			this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_r, Of, e), e
		);
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		const t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	traverse(e) {
		e(this);
		const t = this.children;
		for (let n = 0, i = t.length; n < i; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		const t = this.children;
		for (let n = 0, i = t.length; n < i; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		const t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale),
			(this.matrixWorldNeedsUpdate = !0);
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(),
			(this.matrixWorldNeedsUpdate || e) &&
				(this.parent === null
					? this.matrixWorld.copy(this.matrix)
					: this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
				(this.matrixWorldNeedsUpdate = !1),
				(e = !0));
		const t = this.children;
		for (let n = 0, i = t.length; n < i; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t) {
		const n = this.parent;
		if (
			(e === !0 && n !== null && n.updateWorldMatrix(!0, !1),
			this.matrixAutoUpdate && this.updateMatrix(),
			this.parent === null
				? this.matrixWorld.copy(this.matrix)
				: this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
			t === !0)
		) {
			const i = this.children;
			for (let r = 0, o = i.length; r < o; r++) i[r].updateWorldMatrix(!1, !0);
		}
	}
	toJSON(e) {
		const t = e === void 0 || typeof e == "string",
			n = {};
		t &&
			((e = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {},
				skeletons: {},
				animations: {}
			}),
			(n.metadata = {
				version: 4.5,
				type: "Object",
				generator: "Object3D.toJSON"
			}));
		const i = {};
		(i.uuid = this.uuid),
			(i.type = this.type),
			this.name !== "" && (i.name = this.name),
			this.castShadow === !0 && (i.castShadow = !0),
			this.receiveShadow === !0 && (i.receiveShadow = !0),
			this.visible === !1 && (i.visible = !1),
			this.frustumCulled === !1 && (i.frustumCulled = !1),
			this.renderOrder !== 0 && (i.renderOrder = this.renderOrder),
			JSON.stringify(this.userData) !== "{}" && (i.userData = this.userData),
			(i.layers = this.layers.mask),
			(i.matrix = this.matrix.toArray()),
			this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1),
			this.isInstancedMesh &&
				((i.type = "InstancedMesh"),
				(i.count = this.count),
				(i.instanceMatrix = this.instanceMatrix.toJSON()),
				this.instanceColor !== null &&
					(i.instanceColor = this.instanceColor.toJSON()));
		function r(a, l) {
			return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid;
		}
		if (this.isScene)
			this.background &&
				(this.background.isColor
					? (i.background = this.background.toJSON())
					: this.background.isTexture &&
					  (i.background = this.background.toJSON(e).uuid)),
				this.environment &&
					this.environment.isTexture &&
					(i.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			i.geometry = r(e.geometries, this.geometry);
			const a = this.geometry.parameters;
			if (a !== void 0 && a.shapes !== void 0) {
				const l = a.shapes;
				if (Array.isArray(l))
					for (let c = 0, h = l.length; c < h; c++) {
						const u = l[c];
						r(e.shapes, u);
					}
				else r(e.shapes, l);
			}
		}
		if (
			(this.isSkinnedMesh &&
				((i.bindMode = this.bindMode),
				(i.bindMatrix = this.bindMatrix.toArray()),
				this.skeleton !== void 0 &&
					(r(e.skeletons, this.skeleton), (i.skeleton = this.skeleton.uuid))),
			this.material !== void 0)
		)
			if (Array.isArray(this.material)) {
				const a = [];
				for (let l = 0, c = this.material.length; l < c; l++)
					a.push(r(e.materials, this.material[l]));
				i.material = a;
			} else i.material = r(e.materials, this.material);
		if (this.children.length > 0) {
			i.children = [];
			for (let a = 0; a < this.children.length; a++)
				i.children.push(this.children[a].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			i.animations = [];
			for (let a = 0; a < this.animations.length; a++) {
				const l = this.animations[a];
				i.animations.push(r(e.animations, l));
			}
		}
		if (t) {
			const a = o(e.geometries),
				l = o(e.materials),
				c = o(e.textures),
				h = o(e.images),
				u = o(e.shapes),
				d = o(e.skeletons),
				f = o(e.animations);
			a.length > 0 && (n.geometries = a),
				l.length > 0 && (n.materials = l),
				c.length > 0 && (n.textures = c),
				h.length > 0 && (n.images = h),
				u.length > 0 && (n.shapes = u),
				d.length > 0 && (n.skeletons = d),
				f.length > 0 && (n.animations = f);
		}
		return (n.object = i), n;
		function o(a) {
			const l = [];
			for (const c in a) {
				const h = a[c];
				delete h.metadata, l.push(h);
			}
			return l;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (
			((this.name = e.name),
			this.up.copy(e.up),
			this.position.copy(e.position),
			(this.rotation.order = e.rotation.order),
			this.quaternion.copy(e.quaternion),
			this.scale.copy(e.scale),
			this.matrix.copy(e.matrix),
			this.matrixWorld.copy(e.matrixWorld),
			(this.matrixAutoUpdate = e.matrixAutoUpdate),
			(this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
			(this.layers.mask = e.layers.mask),
			(this.visible = e.visible),
			(this.castShadow = e.castShadow),
			(this.receiveShadow = e.receiveShadow),
			(this.frustumCulled = e.frustumCulled),
			(this.renderOrder = e.renderOrder),
			(this.userData = JSON.parse(JSON.stringify(e.userData))),
			t === !0)
		)
			for (let n = 0; n < e.children.length; n++) {
				const i = e.children[n];
				this.add(i.clone());
			}
		return this;
	}
}
Fe.DefaultUp = new w(0, 1, 0);
Fe.DefaultMatrixAutoUpdate = !0;
Fe.prototype.isObject3D = !0;
const Gt = new w(),
	cn = new w(),
	Ko = new w(),
	hn = new w(),
	Di = new w(),
	Ii = new w(),
	ac = new w(),
	Qo = new w(),
	ea = new w(),
	ta = new w();
class st {
	constructor(e = new w(), t = new w(), n = new w()) {
		(this.a = e), (this.b = t), (this.c = n);
	}
	static getNormal(e, t, n, i) {
		i.subVectors(n, t), Gt.subVectors(e, t), i.cross(Gt);
		const r = i.lengthSq();
		return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, i, r) {
		Gt.subVectors(i, t), cn.subVectors(n, t), Ko.subVectors(e, t);
		const o = Gt.dot(Gt),
			a = Gt.dot(cn),
			l = Gt.dot(Ko),
			c = cn.dot(cn),
			h = cn.dot(Ko),
			u = o * c - a * a;
		if (u === 0) return r.set(-2, -1, -1);
		const d = 1 / u,
			f = (c * l - a * h) * d,
			m = (o * h - a * l) * d;
		return r.set(1 - f - m, m, f);
	}
	static containsPoint(e, t, n, i) {
		return (
			this.getBarycoord(e, t, n, i, hn), hn.x >= 0 && hn.y >= 0 && hn.x + hn.y <= 1
		);
	}
	static getUV(e, t, n, i, r, o, a, l) {
		return (
			this.getBarycoord(e, t, n, i, hn),
			l.set(0, 0),
			l.addScaledVector(r, hn.x),
			l.addScaledVector(o, hn.y),
			l.addScaledVector(a, hn.z),
			l
		);
	}
	static isFrontFacing(e, t, n, i) {
		return Gt.subVectors(n, t), cn.subVectors(e, t), Gt.cross(cn).dot(i) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, i) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this;
	}
	setFromAttributeAndIndices(e, t, n, i) {
		return (
			this.a.fromBufferAttribute(e, t),
			this.b.fromBufferAttribute(e, n),
			this.c.fromBufferAttribute(e, i),
			this
		);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return (
			Gt.subVectors(this.c, this.b),
			cn.subVectors(this.a, this.b),
			Gt.cross(cn).length() * 0.5
		);
	}
	getMidpoint(e) {
		return e
			.addVectors(this.a, this.b)
			.add(this.c)
			.multiplyScalar(1 / 3);
	}
	getNormal(e) {
		return st.getNormal(this.a, this.b, this.c, e);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(e, t) {
		return st.getBarycoord(e, this.a, this.b, this.c, t);
	}
	getUV(e, t, n, i, r) {
		return st.getUV(e, this.a, this.b, this.c, t, n, i, r);
	}
	containsPoint(e) {
		return st.containsPoint(e, this.a, this.b, this.c);
	}
	isFrontFacing(e) {
		return st.isFrontFacing(this.a, this.b, this.c, e);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		const n = this.a,
			i = this.b,
			r = this.c;
		let o, a;
		Di.subVectors(i, n), Ii.subVectors(r, n), Qo.subVectors(e, n);
		const l = Di.dot(Qo),
			c = Ii.dot(Qo);
		if (l <= 0 && c <= 0) return t.copy(n);
		ea.subVectors(e, i);
		const h = Di.dot(ea),
			u = Ii.dot(ea);
		if (h >= 0 && u <= h) return t.copy(i);
		const d = l * u - h * c;
		if (d <= 0 && l >= 0 && h <= 0)
			return (o = l / (l - h)), t.copy(n).addScaledVector(Di, o);
		ta.subVectors(e, r);
		const f = Di.dot(ta),
			m = Ii.dot(ta);
		if (m >= 0 && f <= m) return t.copy(r);
		const x = f * c - l * m;
		if (x <= 0 && c >= 0 && m <= 0)
			return (a = c / (c - m)), t.copy(n).addScaledVector(Ii, a);
		const y = h * m - f * u;
		if (y <= 0 && u - h >= 0 && f - m >= 0)
			return (
				ac.subVectors(r, i),
				(a = (u - h) / (u - h + (f - m))),
				t.copy(i).addScaledVector(ac, a)
			);
		const g = 1 / (y + x + d);
		return (
			(o = x * g),
			(a = d * g),
			t.copy(n).addScaledVector(Di, o).addScaledVector(Ii, a)
		);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}
let Hf = 0;
class yt extends bn {
	constructor() {
		super(),
			Object.defineProperty(this, "id", { value: Hf++ }),
			(this.uuid = It()),
			(this.name = ""),
			(this.type = "Material"),
			(this.fog = !0),
			(this.blending = Zi),
			(this.side = ai),
			(this.vertexColors = !1),
			(this.opacity = 1),
			(this.transparent = !1),
			(this.blendSrc = ol),
			(this.blendDst = al),
			(this.blendEquation = Qn),
			(this.blendSrcAlpha = null),
			(this.blendDstAlpha = null),
			(this.blendEquationAlpha = null),
			(this.depthFunc = so),
			(this.depthTest = !0),
			(this.depthWrite = !0),
			(this.stencilWriteMask = 255),
			(this.stencilFunc = wu),
			(this.stencilRef = 0),
			(this.stencilFuncMask = 255),
			(this.stencilFail = io),
			(this.stencilZFail = io),
			(this.stencilZPass = io),
			(this.stencilWrite = !1),
			(this.clippingPlanes = null),
			(this.clipIntersection = !1),
			(this.clipShadows = !1),
			(this.shadowSide = null),
			(this.colorWrite = !0),
			(this.precision = null),
			(this.polygonOffset = !1),
			(this.polygonOffsetFactor = 0),
			(this.polygonOffsetUnits = 0),
			(this.dithering = !1),
			(this.alphaToCoverage = !1),
			(this.premultipliedAlpha = !1),
			(this.visible = !0),
			(this.toneMapped = !0),
			(this.userData = {}),
			(this.version = 0),
			(this._alphaTest = 0);
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, (this._alphaTest = e);
	}
	onBuild() {}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0)
			for (const t in e) {
				const n = e[t];
				if (n === void 0) {
					console.warn("THREE.Material: '" + t + "' parameter is undefined.");
					continue;
				}
				if (t === "shading") {
					console.warn(
						"THREE." +
							this.type +
							": .shading has been removed. Use the boolean .flatShading instead."
					),
						(this.flatShading = n === sl);
					continue;
				}
				const i = this[t];
				if (i === void 0) {
					console.warn(
						"THREE." + this.type + ": '" + t + "' is not a property of this material."
					);
					continue;
				}
				i && i.isColor
					? i.set(n)
					: i && i.isVector3 && n && n.isVector3
					? i.copy(n)
					: (this[t] = n);
			}
	}
	toJSON(e) {
		const t = e === void 0 || typeof e == "string";
		t && (e = { textures: {}, images: {} });
		const n = {
			metadata: { version: 4.5, type: "Material", generator: "Material.toJSON" }
		};
		(n.uuid = this.uuid),
			(n.type = this.type),
			this.name !== "" && (n.name = this.name),
			this.color && this.color.isColor && (n.color = this.color.getHex()),
			this.roughness !== void 0 && (n.roughness = this.roughness),
			this.metalness !== void 0 && (n.metalness = this.metalness),
			this.sheen !== void 0 && (n.sheen = this.sheen),
			this.sheenColor &&
				this.sheenColor.isColor &&
				(n.sheenColor = this.sheenColor.getHex()),
			this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness),
			this.emissive &&
				this.emissive.isColor &&
				(n.emissive = this.emissive.getHex()),
			this.emissiveIntensity &&
				this.emissiveIntensity !== 1 &&
				(n.emissiveIntensity = this.emissiveIntensity),
			this.specular &&
				this.specular.isColor &&
				(n.specular = this.specular.getHex()),
			this.specularIntensity !== void 0 &&
				(n.specularIntensity = this.specularIntensity),
			this.specularColor &&
				this.specularColor.isColor &&
				(n.specularColor = this.specularColor.getHex()),
			this.shininess !== void 0 && (n.shininess = this.shininess),
			this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat),
			this.clearcoatRoughness !== void 0 &&
				(n.clearcoatRoughness = this.clearcoatRoughness),
			this.clearcoatMap &&
				this.clearcoatMap.isTexture &&
				(n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
			this.clearcoatRoughnessMap &&
				this.clearcoatRoughnessMap.isTexture &&
				(n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
			this.clearcoatNormalMap &&
				this.clearcoatNormalMap.isTexture &&
				((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
				(n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
			this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid),
			this.matcap &&
				this.matcap.isTexture &&
				(n.matcap = this.matcap.toJSON(e).uuid),
			this.alphaMap &&
				this.alphaMap.isTexture &&
				(n.alphaMap = this.alphaMap.toJSON(e).uuid),
			this.lightMap &&
				this.lightMap.isTexture &&
				((n.lightMap = this.lightMap.toJSON(e).uuid),
				(n.lightMapIntensity = this.lightMapIntensity)),
			this.aoMap &&
				this.aoMap.isTexture &&
				((n.aoMap = this.aoMap.toJSON(e).uuid),
				(n.aoMapIntensity = this.aoMapIntensity)),
			this.bumpMap &&
				this.bumpMap.isTexture &&
				((n.bumpMap = this.bumpMap.toJSON(e).uuid), (n.bumpScale = this.bumpScale)),
			this.normalMap &&
				this.normalMap.isTexture &&
				((n.normalMap = this.normalMap.toJSON(e).uuid),
				(n.normalMapType = this.normalMapType),
				(n.normalScale = this.normalScale.toArray())),
			this.displacementMap &&
				this.displacementMap.isTexture &&
				((n.displacementMap = this.displacementMap.toJSON(e).uuid),
				(n.displacementScale = this.displacementScale),
				(n.displacementBias = this.displacementBias)),
			this.roughnessMap &&
				this.roughnessMap.isTexture &&
				(n.roughnessMap = this.roughnessMap.toJSON(e).uuid),
			this.metalnessMap &&
				this.metalnessMap.isTexture &&
				(n.metalnessMap = this.metalnessMap.toJSON(e).uuid),
			this.emissiveMap &&
				this.emissiveMap.isTexture &&
				(n.emissiveMap = this.emissiveMap.toJSON(e).uuid),
			this.specularMap &&
				this.specularMap.isTexture &&
				(n.specularMap = this.specularMap.toJSON(e).uuid),
			this.specularIntensityMap &&
				this.specularIntensityMap.isTexture &&
				(n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
			this.specularColorMap &&
				this.specularColorMap.isTexture &&
				(n.specularColorMap = this.specularColorMap.toJSON(e).uuid),
			this.envMap &&
				this.envMap.isTexture &&
				((n.envMap = this.envMap.toJSON(e).uuid),
				this.combine !== void 0 && (n.combine = this.combine)),
			this.envMapIntensity !== void 0 &&
				(n.envMapIntensity = this.envMapIntensity),
			this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity),
			this.refractionRatio !== void 0 &&
				(n.refractionRatio = this.refractionRatio),
			this.gradientMap &&
				this.gradientMap.isTexture &&
				(n.gradientMap = this.gradientMap.toJSON(e).uuid),
			this.transmission !== void 0 && (n.transmission = this.transmission),
			this.transmissionMap &&
				this.transmissionMap.isTexture &&
				(n.transmissionMap = this.transmissionMap.toJSON(e).uuid),
			this.thickness !== void 0 && (n.thickness = this.thickness),
			this.thicknessMap &&
				this.thicknessMap.isTexture &&
				(n.thicknessMap = this.thicknessMap.toJSON(e).uuid),
			this.attenuationDistance !== void 0 &&
				(n.attenuationDistance = this.attenuationDistance),
			this.attenuationColor !== void 0 &&
				(n.attenuationColor = this.attenuationColor.getHex()),
			this.size !== void 0 && (n.size = this.size),
			this.shadowSide !== null && (n.shadowSide = this.shadowSide),
			this.sizeAttenuation !== void 0 &&
				(n.sizeAttenuation = this.sizeAttenuation),
			this.blending !== Zi && (n.blending = this.blending),
			this.side !== ai && (n.side = this.side),
			this.vertexColors && (n.vertexColors = !0),
			this.opacity < 1 && (n.opacity = this.opacity),
			this.transparent === !0 && (n.transparent = this.transparent),
			(n.depthFunc = this.depthFunc),
			(n.depthTest = this.depthTest),
			(n.depthWrite = this.depthWrite),
			(n.colorWrite = this.colorWrite),
			(n.stencilWrite = this.stencilWrite),
			(n.stencilWriteMask = this.stencilWriteMask),
			(n.stencilFunc = this.stencilFunc),
			(n.stencilRef = this.stencilRef),
			(n.stencilFuncMask = this.stencilFuncMask),
			(n.stencilFail = this.stencilFail),
			(n.stencilZFail = this.stencilZFail),
			(n.stencilZPass = this.stencilZPass),
			this.rotation && this.rotation !== 0 && (n.rotation = this.rotation),
			this.polygonOffset === !0 && (n.polygonOffset = !0),
			this.polygonOffsetFactor !== 0 &&
				(n.polygonOffsetFactor = this.polygonOffsetFactor),
			this.polygonOffsetUnits !== 0 &&
				(n.polygonOffsetUnits = this.polygonOffsetUnits),
			this.linewidth && this.linewidth !== 1 && (n.linewidth = this.linewidth),
			this.dashSize !== void 0 && (n.dashSize = this.dashSize),
			this.gapSize !== void 0 && (n.gapSize = this.gapSize),
			this.scale !== void 0 && (n.scale = this.scale),
			this.dithering === !0 && (n.dithering = !0),
			this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
			this.alphaToCoverage === !0 && (n.alphaToCoverage = this.alphaToCoverage),
			this.premultipliedAlpha === !0 &&
				(n.premultipliedAlpha = this.premultipliedAlpha),
			this.wireframe === !0 && (n.wireframe = this.wireframe),
			this.wireframeLinewidth > 1 &&
				(n.wireframeLinewidth = this.wireframeLinewidth),
			this.wireframeLinecap !== "round" &&
				(n.wireframeLinecap = this.wireframeLinecap),
			this.wireframeLinejoin !== "round" &&
				(n.wireframeLinejoin = this.wireframeLinejoin),
			this.flatShading === !0 && (n.flatShading = this.flatShading),
			this.visible === !1 && (n.visible = !1),
			this.toneMapped === !1 && (n.toneMapped = !1),
			JSON.stringify(this.userData) !== "{}" && (n.userData = this.userData);
		function i(r) {
			const o = [];
			for (const a in r) {
				const l = r[a];
				delete l.metadata, o.push(l);
			}
			return o;
		}
		if (t) {
			const r = i(e.textures),
				o = i(e.images);
			r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o);
		}
		return n;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		(this.name = e.name),
			(this.fog = e.fog),
			(this.blending = e.blending),
			(this.side = e.side),
			(this.vertexColors = e.vertexColors),
			(this.opacity = e.opacity),
			(this.transparent = e.transparent),
			(this.blendSrc = e.blendSrc),
			(this.blendDst = e.blendDst),
			(this.blendEquation = e.blendEquation),
			(this.blendSrcAlpha = e.blendSrcAlpha),
			(this.blendDstAlpha = e.blendDstAlpha),
			(this.blendEquationAlpha = e.blendEquationAlpha),
			(this.depthFunc = e.depthFunc),
			(this.depthTest = e.depthTest),
			(this.depthWrite = e.depthWrite),
			(this.stencilWriteMask = e.stencilWriteMask),
			(this.stencilFunc = e.stencilFunc),
			(this.stencilRef = e.stencilRef),
			(this.stencilFuncMask = e.stencilFuncMask),
			(this.stencilFail = e.stencilFail),
			(this.stencilZFail = e.stencilZFail),
			(this.stencilZPass = e.stencilZPass),
			(this.stencilWrite = e.stencilWrite);
		const t = e.clippingPlanes;
		let n = null;
		if (t !== null) {
			const i = t.length;
			n = new Array(i);
			for (let r = 0; r !== i; ++r) n[r] = t[r].clone();
		}
		return (
			(this.clippingPlanes = n),
			(this.clipIntersection = e.clipIntersection),
			(this.clipShadows = e.clipShadows),
			(this.shadowSide = e.shadowSide),
			(this.colorWrite = e.colorWrite),
			(this.precision = e.precision),
			(this.polygonOffset = e.polygonOffset),
			(this.polygonOffsetFactor = e.polygonOffsetFactor),
			(this.polygonOffsetUnits = e.polygonOffsetUnits),
			(this.dithering = e.dithering),
			(this.alphaTest = e.alphaTest),
			(this.alphaToCoverage = e.alphaToCoverage),
			(this.premultipliedAlpha = e.premultipliedAlpha),
			(this.visible = e.visible),
			(this.toneMapped = e.toneMapped),
			(this.userData = JSON.parse(JSON.stringify(e.userData))),
			this
		);
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}
yt.prototype.isMaterial = !0;
class Nt extends yt {
	constructor(e) {
		super(),
			(this.type = "MeshBasicMaterial"),
			(this.color = new re(16777215)),
			(this.map = null),
			(this.lightMap = null),
			(this.lightMapIntensity = 1),
			(this.aoMap = null),
			(this.aoMapIntensity = 1),
			(this.specularMap = null),
			(this.alphaMap = null),
			(this.envMap = null),
			(this.combine = jr),
			(this.reflectivity = 1),
			(this.refractionRatio = 0.98),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.wireframeLinecap = "round"),
			(this.wireframeLinejoin = "round"),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			(this.map = e.map),
			(this.lightMap = e.lightMap),
			(this.lightMapIntensity = e.lightMapIntensity),
			(this.aoMap = e.aoMap),
			(this.aoMapIntensity = e.aoMapIntensity),
			(this.specularMap = e.specularMap),
			(this.alphaMap = e.alphaMap),
			(this.envMap = e.envMap),
			(this.combine = e.combine),
			(this.reflectivity = e.reflectivity),
			(this.refractionRatio = e.refractionRatio),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.wireframeLinecap = e.wireframeLinecap),
			(this.wireframeLinejoin = e.wireframeLinejoin),
			this
		);
	}
}
Nt.prototype.isMeshBasicMaterial = !0;
const Je = new w(),
	ys = new G();
class Oe {
	constructor(e, t, n) {
		if (Array.isArray(e))
			throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		(this.name = ""),
			(this.array = e),
			(this.itemSize = t),
			(this.count = e !== void 0 ? e.length / t : 0),
			(this.normalized = n === !0),
			(this.usage = Ki),
			(this.updateRange = { offset: 0, count: -1 }),
			(this.version = 0);
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return (this.usage = e), this;
	}
	copy(e) {
		return (
			(this.name = e.name),
			(this.array = new e.array.constructor(e.array)),
			(this.itemSize = e.itemSize),
			(this.count = e.count),
			(this.normalized = e.normalized),
			(this.usage = e.usage),
			this
		);
	}
	copyAt(e, t, n) {
		(e *= this.itemSize), (n *= t.itemSize);
		for (let i = 0, r = this.itemSize; i < r; i++)
			this.array[e + i] = t.array[n + i];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	copyColorsArray(e) {
		const t = this.array;
		let n = 0;
		for (let i = 0, r = e.length; i < r; i++) {
			let o = e[i];
			o === void 0 &&
				(console.warn(
					"THREE.BufferAttribute.copyColorsArray(): color is undefined",
					i
				),
				(o = new re())),
				(t[n++] = o.r),
				(t[n++] = o.g),
				(t[n++] = o.b);
		}
		return this;
	}
	copyVector2sArray(e) {
		const t = this.array;
		let n = 0;
		for (let i = 0, r = e.length; i < r; i++) {
			let o = e[i];
			o === void 0 &&
				(console.warn(
					"THREE.BufferAttribute.copyVector2sArray(): vector is undefined",
					i
				),
				(o = new G())),
				(t[n++] = o.x),
				(t[n++] = o.y);
		}
		return this;
	}
	copyVector3sArray(e) {
		const t = this.array;
		let n = 0;
		for (let i = 0, r = e.length; i < r; i++) {
			let o = e[i];
			o === void 0 &&
				(console.warn(
					"THREE.BufferAttribute.copyVector3sArray(): vector is undefined",
					i
				),
				(o = new w())),
				(t[n++] = o.x),
				(t[n++] = o.y),
				(t[n++] = o.z);
		}
		return this;
	}
	copyVector4sArray(e) {
		const t = this.array;
		let n = 0;
		for (let i = 0, r = e.length; i < r; i++) {
			let o = e[i];
			o === void 0 &&
				(console.warn(
					"THREE.BufferAttribute.copyVector4sArray(): vector is undefined",
					i
				),
				(o = new We())),
				(t[n++] = o.x),
				(t[n++] = o.y),
				(t[n++] = o.z),
				(t[n++] = o.w);
		}
		return this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2)
			for (let t = 0, n = this.count; t < n; t++)
				ys.fromBufferAttribute(this, t),
					ys.applyMatrix3(e),
					this.setXY(t, ys.x, ys.y);
		else if (this.itemSize === 3)
			for (let t = 0, n = this.count; t < n; t++)
				Je.fromBufferAttribute(this, t),
					Je.applyMatrix3(e),
					this.setXYZ(t, Je.x, Je.y, Je.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++)
			(Je.x = this.getX(t)),
				(Je.y = this.getY(t)),
				(Je.z = this.getZ(t)),
				Je.applyMatrix4(e),
				this.setXYZ(t, Je.x, Je.y, Je.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++)
			(Je.x = this.getX(t)),
				(Je.y = this.getY(t)),
				(Je.z = this.getZ(t)),
				Je.applyNormalMatrix(e),
				this.setXYZ(t, Je.x, Je.y, Je.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++)
			(Je.x = this.getX(t)),
				(Je.y = this.getY(t)),
				(Je.z = this.getZ(t)),
				Je.transformDirection(e),
				this.setXYZ(t, Je.x, Je.y, Je.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getX(e) {
		return this.array[e * this.itemSize];
	}
	setX(e, t) {
		return (this.array[e * this.itemSize] = t), this;
	}
	getY(e) {
		return this.array[e * this.itemSize + 1];
	}
	setY(e, t) {
		return (this.array[e * this.itemSize + 1] = t), this;
	}
	getZ(e) {
		return this.array[e * this.itemSize + 2];
	}
	setZ(e, t) {
		return (this.array[e * this.itemSize + 2] = t), this;
	}
	getW(e) {
		return this.array[e * this.itemSize + 3];
	}
	setW(e, t) {
		return (this.array[e * this.itemSize + 3] = t), this;
	}
	setXY(e, t, n) {
		return (
			(e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = n), this
		);
	}
	setXYZ(e, t, n, i) {
		return (
			(e *= this.itemSize),
			(this.array[e + 0] = t),
			(this.array[e + 1] = n),
			(this.array[e + 2] = i),
			this
		);
	}
	setXYZW(e, t, n, i, r) {
		return (
			(e *= this.itemSize),
			(this.array[e + 0] = t),
			(this.array[e + 1] = n),
			(this.array[e + 2] = i),
			(this.array[e + 3] = r),
			this
		);
	}
	onUpload(e) {
		return (this.onUploadCallback = e), this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		const e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.prototype.slice.call(this.array),
			normalized: this.normalized
		};
		return (
			this.name !== "" && (e.name = this.name),
			this.usage !== Ki && (e.usage = this.usage),
			(this.updateRange.offset !== 0 || this.updateRange.count !== -1) &&
				(e.updateRange = this.updateRange),
			e
		);
	}
}
Oe.prototype.isBufferAttribute = !0;
class Ru extends Oe {
	constructor(e, t, n) {
		super(new Int8Array(e), t, n);
	}
}
class Lu extends Oe {
	constructor(e, t, n) {
		super(new Uint8Array(e), t, n);
	}
}
class Pu extends Oe {
	constructor(e, t, n) {
		super(new Uint8ClampedArray(e), t, n);
	}
}
class Du extends Oe {
	constructor(e, t, n) {
		super(new Int16Array(e), t, n);
	}
}
class vo extends Oe {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}
class Iu extends Oe {
	constructor(e, t, n) {
		super(new Int32Array(e), t, n);
	}
}
class _o extends Oe {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}
class Fu extends Oe {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}
Fu.prototype.isFloat16BufferAttribute = !0;
class fe extends Oe {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}
class Bu extends Oe {
	constructor(e, t, n) {
		super(new Float64Array(e), t, n);
	}
}
let Gf = 0;
const zt = new pe(),
	na = new Fe(),
	Fi = new w(),
	Dt = new Bt(),
	br = new Bt(),
	xt = new w();
class Me extends bn {
	constructor() {
		super(),
			Object.defineProperty(this, "id", { value: Gf++ }),
			(this.uuid = It()),
			(this.name = ""),
			(this.type = "BufferGeometry"),
			(this.index = null),
			(this.attributes = {}),
			(this.morphAttributes = {}),
			(this.morphTargetsRelative = !1),
			(this.groups = []),
			(this.boundingBox = null),
			(this.boundingSphere = null),
			(this.drawRange = { start: 0, count: 1 / 0 }),
			(this.userData = {});
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return (
			Array.isArray(e)
				? (this.index = new (Eu(e) ? _o : vo)(e, 1))
				: (this.index = e),
			this
		);
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return (this.attributes[e] = t), this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({ start: e, count: t, materialIndex: n });
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		(this.drawRange.start = e), (this.drawRange.count = t);
	}
	applyMatrix4(e) {
		const t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), (t.needsUpdate = !0));
		const n = this.attributes.normal;
		if (n !== void 0) {
			const r = new mt().getNormalMatrix(e);
			n.applyNormalMatrix(r), (n.needsUpdate = !0);
		}
		const i = this.attributes.tangent;
		return (
			i !== void 0 && (i.transformDirection(e), (i.needsUpdate = !0)),
			this.boundingBox !== null && this.computeBoundingBox(),
			this.boundingSphere !== null && this.computeBoundingSphere(),
			this
		);
	}
	applyQuaternion(e) {
		return zt.makeRotationFromQuaternion(e), this.applyMatrix4(zt), this;
	}
	rotateX(e) {
		return zt.makeRotationX(e), this.applyMatrix4(zt), this;
	}
	rotateY(e) {
		return zt.makeRotationY(e), this.applyMatrix4(zt), this;
	}
	rotateZ(e) {
		return zt.makeRotationZ(e), this.applyMatrix4(zt), this;
	}
	translate(e, t, n) {
		return zt.makeTranslation(e, t, n), this.applyMatrix4(zt), this;
	}
	scale(e, t, n) {
		return zt.makeScale(e, t, n), this.applyMatrix4(zt), this;
	}
	lookAt(e) {
		return na.lookAt(e), na.updateMatrix(), this.applyMatrix4(na.matrix), this;
	}
	center() {
		return (
			this.computeBoundingBox(),
			this.boundingBox.getCenter(Fi).negate(),
			this.translate(Fi.x, Fi.y, Fi.z),
			this
		);
	}
	setFromPoints(e) {
		const t = [];
		for (let n = 0, i = e.length; n < i; n++) {
			const r = e[n];
			t.push(r.x, r.y, r.z || 0);
		}
		return this.setAttribute("position", new fe(t, 3)), this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new Bt());
		const e = this.attributes.position,
			t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			console.error(
				'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
				this
			),
				this.boundingBox.set(
					new w(-1 / 0, -1 / 0, -1 / 0),
					new w(1 / 0, 1 / 0, 1 / 0)
				);
			return;
		}
		if (e !== void 0) {
			if ((this.boundingBox.setFromBufferAttribute(e), t))
				for (let n = 0, i = t.length; n < i; n++) {
					const r = t[n];
					Dt.setFromBufferAttribute(r),
						this.morphTargetsRelative
							? (xt.addVectors(this.boundingBox.min, Dt.min),
							  this.boundingBox.expandByPoint(xt),
							  xt.addVectors(this.boundingBox.max, Dt.max),
							  this.boundingBox.expandByPoint(xt))
							: (this.boundingBox.expandByPoint(Dt.min),
							  this.boundingBox.expandByPoint(Dt.max));
				}
		} else this.boundingBox.makeEmpty();
		(isNaN(this.boundingBox.min.x) ||
			isNaN(this.boundingBox.min.y) ||
			isNaN(this.boundingBox.min.z)) &&
			console.error(
				'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
				this
			);
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new On());
		const e = this.attributes.position,
			t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			console.error(
				'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
				this
			),
				this.boundingSphere.set(new w(), 1 / 0);
			return;
		}
		if (e) {
			const n = this.boundingSphere.center;
			if ((Dt.setFromBufferAttribute(e), t))
				for (let r = 0, o = t.length; r < o; r++) {
					const a = t[r];
					br.setFromBufferAttribute(a),
						this.morphTargetsRelative
							? (xt.addVectors(Dt.min, br.min),
							  Dt.expandByPoint(xt),
							  xt.addVectors(Dt.max, br.max),
							  Dt.expandByPoint(xt))
							: (Dt.expandByPoint(br.min), Dt.expandByPoint(br.max));
				}
			Dt.getCenter(n);
			let i = 0;
			for (let r = 0, o = e.count; r < o; r++)
				xt.fromBufferAttribute(e, r), (i = Math.max(i, n.distanceToSquared(xt)));
			if (t)
				for (let r = 0, o = t.length; r < o; r++) {
					const a = t[r],
						l = this.morphTargetsRelative;
					for (let c = 0, h = a.count; c < h; c++)
						xt.fromBufferAttribute(a, c),
							l && (Fi.fromBufferAttribute(e, c), xt.add(Fi)),
							(i = Math.max(i, n.distanceToSquared(xt)));
				}
			(this.boundingSphere.radius = Math.sqrt(i)),
				isNaN(this.boundingSphere.radius) &&
					console.error(
						'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
						this
					);
		}
	}
	computeTangents() {
		const e = this.index,
			t = this.attributes;
		if (
			e === null ||
			t.position === void 0 ||
			t.normal === void 0 ||
			t.uv === void 0
		) {
			console.error(
				"THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"
			);
			return;
		}
		const n = e.array,
			i = t.position.array,
			r = t.normal.array,
			o = t.uv.array,
			a = i.length / 3;
		t.tangent === void 0 &&
			this.setAttribute("tangent", new Oe(new Float32Array(4 * a), 4));
		const l = t.tangent.array,
			c = [],
			h = [];
		for (let I = 0; I < a; I++) (c[I] = new w()), (h[I] = new w());
		const u = new w(),
			d = new w(),
			f = new w(),
			m = new G(),
			x = new G(),
			y = new G(),
			g = new w(),
			p = new w();
		function M(I, b, L) {
			u.fromArray(i, I * 3),
				d.fromArray(i, b * 3),
				f.fromArray(i, L * 3),
				m.fromArray(o, I * 2),
				x.fromArray(o, b * 2),
				y.fromArray(o, L * 2),
				d.sub(u),
				f.sub(u),
				x.sub(m),
				y.sub(m);
			const F = 1 / (x.x * y.y - y.x * x.y);
			!isFinite(F) ||
				(g.copy(d).multiplyScalar(y.y).addScaledVector(f, -x.y).multiplyScalar(F),
				p.copy(f).multiplyScalar(x.x).addScaledVector(d, -y.x).multiplyScalar(F),
				c[I].add(g),
				c[b].add(g),
				c[L].add(g),
				h[I].add(p),
				h[b].add(p),
				h[L].add(p));
		}
		let v = this.groups;
		v.length === 0 && (v = [{ start: 0, count: n.length }]);
		for (let I = 0, b = v.length; I < b; ++I) {
			const L = v[I],
				F = L.start,
				B = L.count;
			for (let O = F, N = F + B; O < N; O += 3) M(n[O + 0], n[O + 1], n[O + 2]);
		}
		const _ = new w(),
			E = new w(),
			A = new w(),
			D = new w();
		function H(I) {
			A.fromArray(r, I * 3), D.copy(A);
			const b = c[I];
			_.copy(b),
				_.sub(A.multiplyScalar(A.dot(b))).normalize(),
				E.crossVectors(D, b);
			const F = E.dot(h[I]) < 0 ? -1 : 1;
			(l[I * 4] = _.x),
				(l[I * 4 + 1] = _.y),
				(l[I * 4 + 2] = _.z),
				(l[I * 4 + 3] = F);
		}
		for (let I = 0, b = v.length; I < b; ++I) {
			const L = v[I],
				F = L.start,
				B = L.count;
			for (let O = F, N = F + B; O < N; O += 3)
				H(n[O + 0]), H(n[O + 1]), H(n[O + 2]);
		}
	}
	computeVertexNormals() {
		const e = this.index,
			t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0)
				(n = new Oe(new Float32Array(t.count * 3), 3)),
					this.setAttribute("normal", n);
			else for (let d = 0, f = n.count; d < f; d++) n.setXYZ(d, 0, 0, 0);
			const i = new w(),
				r = new w(),
				o = new w(),
				a = new w(),
				l = new w(),
				c = new w(),
				h = new w(),
				u = new w();
			if (e)
				for (let d = 0, f = e.count; d < f; d += 3) {
					const m = e.getX(d + 0),
						x = e.getX(d + 1),
						y = e.getX(d + 2);
					i.fromBufferAttribute(t, m),
						r.fromBufferAttribute(t, x),
						o.fromBufferAttribute(t, y),
						h.subVectors(o, r),
						u.subVectors(i, r),
						h.cross(u),
						a.fromBufferAttribute(n, m),
						l.fromBufferAttribute(n, x),
						c.fromBufferAttribute(n, y),
						a.add(h),
						l.add(h),
						c.add(h),
						n.setXYZ(m, a.x, a.y, a.z),
						n.setXYZ(x, l.x, l.y, l.z),
						n.setXYZ(y, c.x, c.y, c.z);
				}
			else
				for (let d = 0, f = t.count; d < f; d += 3)
					i.fromBufferAttribute(t, d + 0),
						r.fromBufferAttribute(t, d + 1),
						o.fromBufferAttribute(t, d + 2),
						h.subVectors(o, r),
						u.subVectors(i, r),
						h.cross(u),
						n.setXYZ(d + 0, h.x, h.y, h.z),
						n.setXYZ(d + 1, h.x, h.y, h.z),
						n.setXYZ(d + 2, h.x, h.y, h.z);
			this.normalizeNormals(), (n.needsUpdate = !0);
		}
	}
	merge(e, t) {
		if (!(e && e.isBufferGeometry)) {
			console.error(
				"THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",
				e
			);
			return;
		}
		t === void 0 &&
			((t = 0),
			console.warn(
				"THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."
			));
		const n = this.attributes;
		for (const i in n) {
			if (e.attributes[i] === void 0) continue;
			const o = n[i].array,
				a = e.attributes[i],
				l = a.array,
				c = a.itemSize * t,
				h = Math.min(l.length, o.length - c);
			for (let u = 0, d = c; u < h; u++, d++) o[d] = l[u];
		}
		return this;
	}
	normalizeNormals() {
		const e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++)
			xt.fromBufferAttribute(e, t), xt.normalize(), e.setXYZ(t, xt.x, xt.y, xt.z);
	}
	toNonIndexed() {
		function e(a, l) {
			const c = a.array,
				h = a.itemSize,
				u = a.normalized,
				d = new c.constructor(l.length * h);
			let f = 0,
				m = 0;
			for (let x = 0, y = l.length; x < y; x++) {
				a.isInterleavedBufferAttribute
					? (f = l[x] * a.data.stride + a.offset)
					: (f = l[x] * h);
				for (let g = 0; g < h; g++) d[m++] = c[f++];
			}
			return new Oe(d, h, u);
		}
		if (this.index === null)
			return (
				console.warn(
					"THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."
				),
				this
			);
		const t = new Me(),
			n = this.index.array,
			i = this.attributes;
		for (const a in i) {
			const l = i[a],
				c = e(l, n);
			t.setAttribute(a, c);
		}
		const r = this.morphAttributes;
		for (const a in r) {
			const l = [],
				c = r[a];
			for (let h = 0, u = c.length; h < u; h++) {
				const d = c[h],
					f = e(d, n);
				l.push(f);
			}
			t.morphAttributes[a] = l;
		}
		t.morphTargetsRelative = this.morphTargetsRelative;
		const o = this.groups;
		for (let a = 0, l = o.length; a < l; a++) {
			const c = o[a];
			t.addGroup(c.start, c.count, c.materialIndex);
		}
		return t;
	}
	toJSON() {
		const e = {
			metadata: {
				version: 4.5,
				type: "BufferGeometry",
				generator: "BufferGeometry.toJSON"
			}
		};
		if (
			((e.uuid = this.uuid),
			(e.type = this.type),
			this.name !== "" && (e.name = this.name),
			Object.keys(this.userData).length > 0 && (e.userData = this.userData),
			this.parameters !== void 0)
		) {
			const l = this.parameters;
			for (const c in l) l[c] !== void 0 && (e[c] = l[c]);
			return e;
		}
		e.data = { attributes: {} };
		const t = this.index;
		t !== null &&
			(e.data.index = {
				type: t.array.constructor.name,
				array: Array.prototype.slice.call(t.array)
			});
		const n = this.attributes;
		for (const l in n) {
			const c = n[l];
			e.data.attributes[l] = c.toJSON(e.data);
		}
		const i = {};
		let r = !1;
		for (const l in this.morphAttributes) {
			const c = this.morphAttributes[l],
				h = [];
			for (let u = 0, d = c.length; u < d; u++) {
				const f = c[u];
				h.push(f.toJSON(e.data));
			}
			h.length > 0 && ((i[l] = h), (r = !0));
		}
		r &&
			((e.data.morphAttributes = i),
			(e.data.morphTargetsRelative = this.morphTargetsRelative));
		const o = this.groups;
		o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
		const a = this.boundingSphere;
		return (
			a !== null &&
				(e.data.boundingSphere = { center: a.center.toArray(), radius: a.radius }),
			e
		);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		(this.index = null),
			(this.attributes = {}),
			(this.morphAttributes = {}),
			(this.groups = []),
			(this.boundingBox = null),
			(this.boundingSphere = null);
		const t = {};
		this.name = e.name;
		const n = e.index;
		n !== null && this.setIndex(n.clone(t));
		const i = e.attributes;
		for (const c in i) {
			const h = i[c];
			this.setAttribute(c, h.clone(t));
		}
		const r = e.morphAttributes;
		for (const c in r) {
			const h = [],
				u = r[c];
			for (let d = 0, f = u.length; d < f; d++) h.push(u[d].clone(t));
			this.morphAttributes[c] = h;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		const o = e.groups;
		for (let c = 0, h = o.length; c < h; c++) {
			const u = o[c];
			this.addGroup(u.start, u.count, u.materialIndex);
		}
		const a = e.boundingBox;
		a !== null && (this.boundingBox = a.clone());
		const l = e.boundingSphere;
		return (
			l !== null && (this.boundingSphere = l.clone()),
			(this.drawRange.start = e.drawRange.start),
			(this.drawRange.count = e.drawRange.count),
			(this.userData = e.userData),
			e.parameters !== void 0 &&
				(this.parameters = Object.assign({}, e.parameters)),
			this
		);
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}
Me.prototype.isBufferGeometry = !0;
const lc = new pe(),
	Bi = new Un(),
	ia = new On(),
	En = new w(),
	An = new w(),
	Cn = new w(),
	ra = new w(),
	sa = new w(),
	oa = new w(),
	vs = new w(),
	_s = new w(),
	bs = new w(),
	Ms = new G(),
	ws = new G(),
	Ss = new G(),
	aa = new w(),
	Ts = new w();
class je extends Fe {
	constructor(e = new Me(), t = new Nt()) {
		super(),
			(this.type = "Mesh"),
			(this.geometry = e),
			(this.material = t),
			this.updateMorphTargets();
	}
	copy(e) {
		return (
			super.copy(e),
			e.morphTargetInfluences !== void 0 &&
				(this.morphTargetInfluences = e.morphTargetInfluences.slice()),
			e.morphTargetDictionary !== void 0 &&
				(this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
			(this.material = e.material),
			(this.geometry = e.geometry),
			this
		);
	}
	updateMorphTargets() {
		const e = this.geometry;
		if (e.isBufferGeometry) {
			const t = e.morphAttributes,
				n = Object.keys(t);
			if (n.length > 0) {
				const i = t[n[0]];
				if (i !== void 0) {
					(this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
					for (let r = 0, o = i.length; r < o; r++) {
						const a = i[r].name || String(r);
						this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = r);
					}
				}
			}
		} else {
			const t = e.morphTargets;
			t !== void 0 &&
				t.length > 0 &&
				console.error(
					"THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
				);
		}
	}
	raycast(e, t) {
		const n = this.geometry,
			i = this.material,
			r = this.matrixWorld;
		if (
			i === void 0 ||
			(n.boundingSphere === null && n.computeBoundingSphere(),
			ia.copy(n.boundingSphere),
			ia.applyMatrix4(r),
			e.ray.intersectsSphere(ia) === !1) ||
			(lc.copy(r).invert(),
			Bi.copy(e.ray).applyMatrix4(lc),
			n.boundingBox !== null && Bi.intersectsBox(n.boundingBox) === !1)
		)
			return;
		let o;
		if (n.isBufferGeometry) {
			const a = n.index,
				l = n.attributes.position,
				c = n.morphAttributes.position,
				h = n.morphTargetsRelative,
				u = n.attributes.uv,
				d = n.attributes.uv2,
				f = n.groups,
				m = n.drawRange;
			if (a !== null)
				if (Array.isArray(i))
					for (let x = 0, y = f.length; x < y; x++) {
						const g = f[x],
							p = i[g.materialIndex],
							M = Math.max(g.start, m.start),
							v = Math.min(a.count, Math.min(g.start + g.count, m.start + m.count));
						for (let _ = M, E = v; _ < E; _ += 3) {
							const A = a.getX(_),
								D = a.getX(_ + 1),
								H = a.getX(_ + 2);
							(o = Es(this, p, e, Bi, l, c, h, u, d, A, D, H)),
								o &&
									((o.faceIndex = Math.floor(_ / 3)),
									(o.face.materialIndex = g.materialIndex),
									t.push(o));
						}
					}
				else {
					const x = Math.max(0, m.start),
						y = Math.min(a.count, m.start + m.count);
					for (let g = x, p = y; g < p; g += 3) {
						const M = a.getX(g),
							v = a.getX(g + 1),
							_ = a.getX(g + 2);
						(o = Es(this, i, e, Bi, l, c, h, u, d, M, v, _)),
							o && ((o.faceIndex = Math.floor(g / 3)), t.push(o));
					}
				}
			else if (l !== void 0)
				if (Array.isArray(i))
					for (let x = 0, y = f.length; x < y; x++) {
						const g = f[x],
							p = i[g.materialIndex],
							M = Math.max(g.start, m.start),
							v = Math.min(l.count, Math.min(g.start + g.count, m.start + m.count));
						for (let _ = M, E = v; _ < E; _ += 3) {
							const A = _,
								D = _ + 1,
								H = _ + 2;
							(o = Es(this, p, e, Bi, l, c, h, u, d, A, D, H)),
								o &&
									((o.faceIndex = Math.floor(_ / 3)),
									(o.face.materialIndex = g.materialIndex),
									t.push(o));
						}
					}
				else {
					const x = Math.max(0, m.start),
						y = Math.min(l.count, m.start + m.count);
					for (let g = x, p = y; g < p; g += 3) {
						const M = g,
							v = g + 1,
							_ = g + 2;
						(o = Es(this, i, e, Bi, l, c, h, u, d, M, v, _)),
							o && ((o.faceIndex = Math.floor(g / 3)), t.push(o));
					}
				}
		} else
			n.isGeometry &&
				console.error(
					"THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
				);
	}
}
je.prototype.isMesh = !0;
function kf(s, e, t, n, i, r, o, a) {
	let l;
	if (
		(e.side === lt
			? (l = n.intersectTriangle(o, r, i, !0, a))
			: (l = n.intersectTriangle(i, r, o, e.side !== In, a)),
		l === null)
	)
		return null;
	Ts.copy(a), Ts.applyMatrix4(s.matrixWorld);
	const c = t.ray.origin.distanceTo(Ts);
	return c < t.near || c > t.far
		? null
		: { distance: c, point: Ts.clone(), object: s };
}
function Es(s, e, t, n, i, r, o, a, l, c, h, u) {
	En.fromBufferAttribute(i, c),
		An.fromBufferAttribute(i, h),
		Cn.fromBufferAttribute(i, u);
	const d = s.morphTargetInfluences;
	if (r && d) {
		vs.set(0, 0, 0), _s.set(0, 0, 0), bs.set(0, 0, 0);
		for (let m = 0, x = r.length; m < x; m++) {
			const y = d[m],
				g = r[m];
			y !== 0 &&
				(ra.fromBufferAttribute(g, c),
				sa.fromBufferAttribute(g, h),
				oa.fromBufferAttribute(g, u),
				o
					? (vs.addScaledVector(ra, y),
					  _s.addScaledVector(sa, y),
					  bs.addScaledVector(oa, y))
					: (vs.addScaledVector(ra.sub(En), y),
					  _s.addScaledVector(sa.sub(An), y),
					  bs.addScaledVector(oa.sub(Cn), y)));
		}
		En.add(vs), An.add(_s), Cn.add(bs);
	}
	s.isSkinnedMesh &&
		(s.boneTransform(c, En), s.boneTransform(h, An), s.boneTransform(u, Cn));
	const f = kf(s, e, t, n, En, An, Cn, aa);
	if (f) {
		a &&
			(Ms.fromBufferAttribute(a, c),
			ws.fromBufferAttribute(a, h),
			Ss.fromBufferAttribute(a, u),
			(f.uv = st.getUV(aa, En, An, Cn, Ms, ws, Ss, new G()))),
			l &&
				(Ms.fromBufferAttribute(l, c),
				ws.fromBufferAttribute(l, h),
				Ss.fromBufferAttribute(l, u),
				(f.uv2 = st.getUV(aa, En, An, Cn, Ms, ws, Ss, new G())));
		const m = { a: c, b: h, c: u, normal: new w(), materialIndex: 0 };
		st.getNormal(En, An, Cn, m.normal), (f.face = m);
	}
	return f;
}
class xn extends Me {
	constructor(e = 1, t = 1, n = 1, i = 1, r = 1, o = 1) {
		super(),
			(this.type = "BoxGeometry"),
			(this.parameters = {
				width: e,
				height: t,
				depth: n,
				widthSegments: i,
				heightSegments: r,
				depthSegments: o
			});
		const a = this;
		(i = Math.floor(i)), (r = Math.floor(r)), (o = Math.floor(o));
		const l = [],
			c = [],
			h = [],
			u = [];
		let d = 0,
			f = 0;
		m("z", "y", "x", -1, -1, n, t, e, o, r, 0),
			m("z", "y", "x", 1, -1, n, t, -e, o, r, 1),
			m("x", "z", "y", 1, 1, e, n, t, i, o, 2),
			m("x", "z", "y", 1, -1, e, n, -t, i, o, 3),
			m("x", "y", "z", 1, -1, e, t, n, i, r, 4),
			m("x", "y", "z", -1, -1, e, t, -n, i, r, 5),
			this.setIndex(l),
			this.setAttribute("position", new fe(c, 3)),
			this.setAttribute("normal", new fe(h, 3)),
			this.setAttribute("uv", new fe(u, 2));
		function m(x, y, g, p, M, v, _, E, A, D, H) {
			const I = v / A,
				b = _ / D,
				L = v / 2,
				F = _ / 2,
				B = E / 2,
				O = A + 1,
				N = D + 1;
			let X = 0,
				Q = 0;
			const ae = new w();
			for (let Z = 0; Z < N; Z++) {
				const K = Z * b - F;
				for (let le = 0; le < O; le++) {
					const ge = le * I - L;
					(ae[x] = ge * p),
						(ae[y] = K * M),
						(ae[g] = B),
						c.push(ae.x, ae.y, ae.z),
						(ae[x] = 0),
						(ae[y] = 0),
						(ae[g] = E > 0 ? 1 : -1),
						h.push(ae.x, ae.y, ae.z),
						u.push(le / A),
						u.push(1 - Z / D),
						(X += 1);
				}
			}
			for (let Z = 0; Z < D; Z++)
				for (let K = 0; K < A; K++) {
					const le = d + K + O * Z,
						ge = d + K + O * (Z + 1),
						_e = d + (K + 1) + O * (Z + 1),
						V = d + (K + 1) + O * Z;
					l.push(le, ge, V), l.push(ge, _e, V), (Q += 6);
				}
			a.addGroup(f, Q, H), (f += Q), (d += X);
		}
	}
	static fromJSON(e) {
		return new xn(
			e.width,
			e.height,
			e.depth,
			e.widthSegments,
			e.heightSegments,
			e.depthSegments
		);
	}
}
function er(s) {
	const e = {};
	for (const t in s) {
		e[t] = {};
		for (const n in s[t]) {
			const i = s[t][n];
			i &&
			(i.isColor ||
				i.isMatrix3 ||
				i.isMatrix4 ||
				i.isVector2 ||
				i.isVector3 ||
				i.isVector4 ||
				i.isTexture ||
				i.isQuaternion)
				? (e[t][n] = i.clone())
				: Array.isArray(i)
				? (e[t][n] = i.slice())
				: (e[t][n] = i);
		}
	}
	return e;
}
function Tt(s) {
	const e = {};
	for (let t = 0; t < s.length; t++) {
		const n = er(s[t]);
		for (const i in n) e[i] = n[i];
	}
	return e;
}
const ci = { clone: er, merge: Tt };
var Vf = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
	Wf = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class ht extends yt {
	constructor(e) {
		super(),
			(this.type = "ShaderMaterial"),
			(this.defines = {}),
			(this.uniforms = {}),
			(this.vertexShader = Vf),
			(this.fragmentShader = Wf),
			(this.linewidth = 1),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.fog = !1),
			(this.lights = !1),
			(this.clipping = !1),
			(this.extensions = {
				derivatives: !1,
				fragDepth: !1,
				drawBuffers: !1,
				shaderTextureLOD: !1
			}),
			(this.defaultAttributeValues = {
				color: [1, 1, 1],
				uv: [0, 0],
				uv2: [0, 0]
			}),
			(this.index0AttributeName = void 0),
			(this.uniformsNeedUpdate = !1),
			(this.glslVersion = null),
			e !== void 0 &&
				(e.attributes !== void 0 &&
					console.error(
						"THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."
					),
				this.setValues(e));
	}
	copy(e) {
		return (
			super.copy(e),
			(this.fragmentShader = e.fragmentShader),
			(this.vertexShader = e.vertexShader),
			(this.uniforms = er(e.uniforms)),
			(this.defines = Object.assign({}, e.defines)),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.lights = e.lights),
			(this.clipping = e.clipping),
			(this.extensions = Object.assign({}, e.extensions)),
			(this.glslVersion = e.glslVersion),
			this
		);
	}
	toJSON(e) {
		const t = super.toJSON(e);
		(t.glslVersion = this.glslVersion), (t.uniforms = {});
		for (const i in this.uniforms) {
			const o = this.uniforms[i].value;
			o && o.isTexture
				? (t.uniforms[i] = { type: "t", value: o.toJSON(e).uuid })
				: o && o.isColor
				? (t.uniforms[i] = { type: "c", value: o.getHex() })
				: o && o.isVector2
				? (t.uniforms[i] = { type: "v2", value: o.toArray() })
				: o && o.isVector3
				? (t.uniforms[i] = { type: "v3", value: o.toArray() })
				: o && o.isVector4
				? (t.uniforms[i] = { type: "v4", value: o.toArray() })
				: o && o.isMatrix3
				? (t.uniforms[i] = { type: "m3", value: o.toArray() })
				: o && o.isMatrix4
				? (t.uniforms[i] = { type: "m4", value: o.toArray() })
				: (t.uniforms[i] = { value: o });
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines),
			(t.vertexShader = this.vertexShader),
			(t.fragmentShader = this.fragmentShader);
		const n = {};
		for (const i in this.extensions) this.extensions[i] === !0 && (n[i] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
}
ht.prototype.isShaderMaterial = !0;
class Kr extends Fe {
	constructor() {
		super(),
			(this.type = "Camera"),
			(this.matrixWorldInverse = new pe()),
			(this.projectionMatrix = new pe()),
			(this.projectionMatrixInverse = new pe());
	}
	copy(e, t) {
		return (
			super.copy(e, t),
			this.matrixWorldInverse.copy(e.matrixWorldInverse),
			this.projectionMatrix.copy(e.projectionMatrix),
			this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
			this
		);
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		const t = this.matrixWorld.elements;
		return e.set(-t[8], -t[9], -t[10]).normalize();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e),
			this.matrixWorldInverse.copy(this.matrixWorld).invert();
	}
	updateWorldMatrix(e, t) {
		super.updateWorldMatrix(e, t),
			this.matrixWorldInverse.copy(this.matrixWorld).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
Kr.prototype.isCamera = !0;
class pt extends Kr {
	constructor(e = 50, t = 1, n = 0.1, i = 2e3) {
		super(),
			(this.type = "PerspectiveCamera"),
			(this.fov = e),
			(this.zoom = 1),
			(this.near = n),
			(this.far = i),
			(this.focus = 10),
			(this.aspect = t),
			(this.view = null),
			(this.filmGauge = 35),
			(this.filmOffset = 0),
			this.updateProjectionMatrix();
	}
	copy(e, t) {
		return (
			super.copy(e, t),
			(this.fov = e.fov),
			(this.zoom = e.zoom),
			(this.near = e.near),
			(this.far = e.far),
			(this.focus = e.focus),
			(this.aspect = e.aspect),
			(this.view = e.view === null ? null : Object.assign({}, e.view)),
			(this.filmGauge = e.filmGauge),
			(this.filmOffset = e.filmOffset),
			this
		);
	}
	setFocalLength(e) {
		const t = (0.5 * this.getFilmHeight()) / e;
		(this.fov = Hr * 2 * Math.atan(t)), this.updateProjectionMatrix();
	}
	getFocalLength() {
		const e = Math.tan(si * 0.5 * this.fov);
		return (0.5 * this.getFilmHeight()) / e;
	}
	getEffectiveFOV() {
		return Hr * 2 * Math.atan(Math.tan(si * 0.5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	setViewOffset(e, t, n, i, r, o) {
		(this.aspect = e / t),
			this.view === null &&
				(this.view = {
					enabled: !0,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				}),
			(this.view.enabled = !0),
			(this.view.fullWidth = e),
			(this.view.fullHeight = t),
			(this.view.offsetX = n),
			(this.view.offsetY = i),
			(this.view.width = r),
			(this.view.height = o),
			this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		const e = this.near;
		let t = (e * Math.tan(si * 0.5 * this.fov)) / this.zoom,
			n = 2 * t,
			i = this.aspect * n,
			r = -0.5 * i;
		const o = this.view;
		if (this.view !== null && this.view.enabled) {
			const l = o.fullWidth,
				c = o.fullHeight;
			(r += (o.offsetX * i) / l),
				(t -= (o.offsetY * n) / c),
				(i *= o.width / l),
				(n *= o.height / c);
		}
		const a = this.filmOffset;
		a !== 0 && (r += (e * a) / this.getFilmWidth()),
			this.projectionMatrix.makePerspective(r, r + i, t, t - n, e, this.far),
			this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return (
			(t.object.fov = this.fov),
			(t.object.zoom = this.zoom),
			(t.object.near = this.near),
			(t.object.far = this.far),
			(t.object.focus = this.focus),
			(t.object.aspect = this.aspect),
			this.view !== null && (t.object.view = Object.assign({}, this.view)),
			(t.object.filmGauge = this.filmGauge),
			(t.object.filmOffset = this.filmOffset),
			t
		);
	}
}
pt.prototype.isPerspectiveCamera = !0;
const zi = 90,
	Ni = 1;
class bo extends Fe {
	constructor(e, t, n) {
		if ((super(), (this.type = "CubeCamera"), n.isWebGLCubeRenderTarget !== !0)) {
			console.error(
				"THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter."
			);
			return;
		}
		this.renderTarget = n;
		const i = new pt(zi, Ni, e, t);
		(i.layers = this.layers),
			i.up.set(0, -1, 0),
			i.lookAt(new w(1, 0, 0)),
			this.add(i);
		const r = new pt(zi, Ni, e, t);
		(r.layers = this.layers),
			r.up.set(0, -1, 0),
			r.lookAt(new w(-1, 0, 0)),
			this.add(r);
		const o = new pt(zi, Ni, e, t);
		(o.layers = this.layers),
			o.up.set(0, 0, 1),
			o.lookAt(new w(0, 1, 0)),
			this.add(o);
		const a = new pt(zi, Ni, e, t);
		(a.layers = this.layers),
			a.up.set(0, 0, -1),
			a.lookAt(new w(0, -1, 0)),
			this.add(a);
		const l = new pt(zi, Ni, e, t);
		(l.layers = this.layers),
			l.up.set(0, -1, 0),
			l.lookAt(new w(0, 0, 1)),
			this.add(l);
		const c = new pt(zi, Ni, e, t);
		(c.layers = this.layers),
			c.up.set(0, -1, 0),
			c.lookAt(new w(0, 0, -1)),
			this.add(c);
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		const n = this.renderTarget,
			[i, r, o, a, l, c] = this.children,
			h = e.xr.enabled,
			u = e.getRenderTarget();
		e.xr.enabled = !1;
		const d = n.texture.generateMipmaps;
		(n.texture.generateMipmaps = !1),
			e.setRenderTarget(n, 0),
			e.render(t, i),
			e.setRenderTarget(n, 1),
			e.render(t, r),
			e.setRenderTarget(n, 2),
			e.render(t, o),
			e.setRenderTarget(n, 3),
			e.render(t, a),
			e.setRenderTarget(n, 4),
			e.render(t, l),
			(n.texture.generateMipmaps = d),
			e.setRenderTarget(n, 5),
			e.render(t, c),
			e.setRenderTarget(u),
			(e.xr.enabled = h),
			(n.texture.needsPMREMUpdate = !0);
	}
}
class dr extends dt {
	constructor(e, t, n, i, r, o, a, l, c, h) {
		(e = e !== void 0 ? e : []),
			(t = t !== void 0 ? t : mi),
			super(e, t, n, i, r, o, a, l, c, h),
			(this.flipY = !1);
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}
dr.prototype.isCubeTexture = !0;
class Mo extends ut {
	constructor(e, t, n) {
		Number.isInteger(t) &&
			(console.warn(
				"THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"
			),
			(t = n)),
			super(e, e, t),
			(t = t || {}),
			(this.texture = new dr(
				void 0,
				t.mapping,
				t.wrapS,
				t.wrapT,
				t.magFilter,
				t.minFilter,
				t.format,
				t.type,
				t.anisotropy,
				t.encoding
			)),
			(this.texture.isRenderTargetTexture = !0),
			(this.texture.generateMipmaps =
				t.generateMipmaps !== void 0 ? t.generateMipmaps : !1),
			(this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : Ye);
	}
	fromEquirectangularTexture(e, t) {
		(this.texture.type = t.type),
			(this.texture.format = ct),
			(this.texture.encoding = t.encoding),
			(this.texture.generateMipmaps = t.generateMipmaps),
			(this.texture.minFilter = t.minFilter),
			(this.texture.magFilter = t.magFilter);
		const n = {
				uniforms: { tEquirect: { value: null } },
				vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
				fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
			},
			i = new xn(5, 5, 5),
			r = new ht({
				name: "CubemapFromEquirect",
				uniforms: er(n.uniforms),
				vertexShader: n.vertexShader,
				fragmentShader: n.fragmentShader,
				side: lt,
				blending: fn
			});
		r.uniforms.tEquirect.value = t;
		const o = new je(i, r),
			a = t.minFilter;
		return (
			t.minFilter === xi && (t.minFilter = Ye),
			new bo(1, 10, this).update(e, o),
			(t.minFilter = a),
			o.geometry.dispose(),
			o.material.dispose(),
			this
		);
	}
	clear(e, t, n, i) {
		const r = e.getRenderTarget();
		for (let o = 0; o < 6; o++) e.setRenderTarget(this, o), e.clear(t, n, i);
		e.setRenderTarget(r);
	}
}
Mo.prototype.isWebGLCubeRenderTarget = !0;
const la = new w(),
	qf = new w(),
	Xf = new mt();
class kt {
	constructor(e = new w(1, 0, 0), t = 0) {
		(this.normal = e), (this.constant = t);
	}
	set(e, t) {
		return this.normal.copy(e), (this.constant = t), this;
	}
	setComponents(e, t, n, i) {
		return this.normal.set(e, t, n), (this.constant = i), this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), (this.constant = -t.dot(this.normal)), this;
	}
	setFromCoplanarPoints(e, t, n) {
		const i = la.subVectors(n, t).cross(qf.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(i, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), (this.constant = e.constant), this;
	}
	normalize() {
		const e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), (this.constant *= e), this;
	}
	negate() {
		return (this.constant *= -1), this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e);
	}
	intersectLine(e, t) {
		const n = e.delta(la),
			i = this.normal.dot(n);
		if (i === 0)
			return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		const r = -(e.start.dot(this.normal) + this.constant) / i;
		return r < 0 || r > 1 ? null : t.copy(n).multiplyScalar(r).add(e.start);
	}
	intersectsLine(e) {
		const t = this.distanceToPoint(e.start),
			n = this.distanceToPoint(e.end);
		return (t < 0 && n > 0) || (n < 0 && t > 0);
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		const n = t || Xf.getNormalMatrix(e),
			i = this.coplanarPoint(la).applyMatrix4(e),
			r = this.normal.applyMatrix3(n).normalize();
		return (this.constant = -i.dot(r)), this;
	}
	translate(e) {
		return (this.constant -= e.dot(this.normal)), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
kt.prototype.isPlane = !0;
const Oi = new On(),
	As = new w();
class Qr {
	constructor(
		e = new kt(),
		t = new kt(),
		n = new kt(),
		i = new kt(),
		r = new kt(),
		o = new kt()
	) {
		this.planes = [e, t, n, i, r, o];
	}
	set(e, t, n, i, r, o) {
		const a = this.planes;
		return (
			a[0].copy(e),
			a[1].copy(t),
			a[2].copy(n),
			a[3].copy(i),
			a[4].copy(r),
			a[5].copy(o),
			this
		);
	}
	copy(e) {
		const t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e) {
		const t = this.planes,
			n = e.elements,
			i = n[0],
			r = n[1],
			o = n[2],
			a = n[3],
			l = n[4],
			c = n[5],
			h = n[6],
			u = n[7],
			d = n[8],
			f = n[9],
			m = n[10],
			x = n[11],
			y = n[12],
			g = n[13],
			p = n[14],
			M = n[15];
		return (
			t[0].setComponents(a - i, u - l, x - d, M - y).normalize(),
			t[1].setComponents(a + i, u + l, x + d, M + y).normalize(),
			t[2].setComponents(a + r, u + c, x + f, M + g).normalize(),
			t[3].setComponents(a - r, u - c, x - f, M - g).normalize(),
			t[4].setComponents(a - o, u - h, x - m, M - p).normalize(),
			t[5].setComponents(a + o, u + h, x + m, M + p).normalize(),
			this
		);
	}
	intersectsObject(e) {
		const t = e.geometry;
		return (
			t.boundingSphere === null && t.computeBoundingSphere(),
			Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),
			this.intersectsSphere(Oi)
		);
	}
	intersectsSprite(e) {
		return (
			Oi.center.set(0, 0, 0),
			(Oi.radius = 0.7071067811865476),
			Oi.applyMatrix4(e.matrixWorld),
			this.intersectsSphere(Oi)
		);
	}
	intersectsSphere(e) {
		const t = this.planes,
			n = e.center,
			i = -e.radius;
		for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(n) < i) return !1;
		return !0;
	}
	intersectsBox(e) {
		const t = this.planes;
		for (let n = 0; n < 6; n++) {
			const i = t[n];
			if (
				((As.x = i.normal.x > 0 ? e.max.x : e.min.x),
				(As.y = i.normal.y > 0 ? e.max.y : e.min.y),
				(As.z = i.normal.z > 0 ? e.max.z : e.min.z),
				i.distanceToPoint(As) < 0)
			)
				return !1;
		}
		return !0;
	}
	containsPoint(e) {
		const t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
function zu() {
	let s = null,
		e = !1,
		t = null,
		n = null;
	function i(r, o) {
		t(r, o), (n = s.requestAnimationFrame(i));
	}
	return {
		start: function () {
			e !== !0 && t !== null && ((n = s.requestAnimationFrame(i)), (e = !0));
		},
		stop: function () {
			s.cancelAnimationFrame(n), (e = !1);
		},
		setAnimationLoop: function (r) {
			t = r;
		},
		setContext: function (r) {
			s = r;
		}
	};
}
function Yf(s, e) {
	const t = e.isWebGL2,
		n = new WeakMap();
	function i(c, h) {
		const u = c.array,
			d = c.usage,
			f = s.createBuffer();
		s.bindBuffer(h, f), s.bufferData(h, u, d), c.onUploadCallback();
		let m = 5126;
		return (
			u instanceof Float32Array
				? (m = 5126)
				: u instanceof Float64Array
				? console.warn(
						"THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."
				  )
				: u instanceof Uint16Array
				? c.isFloat16BufferAttribute
					? t
						? (m = 5131)
						: console.warn(
								"THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."
						  )
					: (m = 5123)
				: u instanceof Int16Array
				? (m = 5122)
				: u instanceof Uint32Array
				? (m = 5125)
				: u instanceof Int32Array
				? (m = 5124)
				: u instanceof Int8Array
				? (m = 5120)
				: (u instanceof Uint8Array || u instanceof Uint8ClampedArray) && (m = 5121),
			{
				buffer: f,
				type: m,
				bytesPerElement: u.BYTES_PER_ELEMENT,
				version: c.version
			}
		);
	}
	function r(c, h, u) {
		const d = h.array,
			f = h.updateRange;
		s.bindBuffer(u, c),
			f.count === -1
				? s.bufferSubData(u, 0, d)
				: (t
						? s.bufferSubData(u, f.offset * d.BYTES_PER_ELEMENT, d, f.offset, f.count)
						: s.bufferSubData(
								u,
								f.offset * d.BYTES_PER_ELEMENT,
								d.subarray(f.offset, f.offset + f.count)
						  ),
				  (f.count = -1));
	}
	function o(c) {
		return c.isInterleavedBufferAttribute && (c = c.data), n.get(c);
	}
	function a(c) {
		c.isInterleavedBufferAttribute && (c = c.data);
		const h = n.get(c);
		h && (s.deleteBuffer(h.buffer), n.delete(c));
	}
	function l(c, h) {
		if (c.isGLBufferAttribute) {
			const d = n.get(c);
			(!d || d.version < c.version) &&
				n.set(c, {
					buffer: c.buffer,
					type: c.type,
					bytesPerElement: c.elementSize,
					version: c.version
				});
			return;
		}
		c.isInterleavedBufferAttribute && (c = c.data);
		const u = n.get(c);
		u === void 0
			? n.set(c, i(c, h))
			: u.version < c.version && (r(u.buffer, c, h), (u.version = c.version));
	}
	return { get: o, remove: a, update: l };
}
class Qt extends Me {
	constructor(e = 1, t = 1, n = 1, i = 1) {
		super(),
			(this.type = "PlaneGeometry"),
			(this.parameters = {
				width: e,
				height: t,
				widthSegments: n,
				heightSegments: i
			});
		const r = e / 2,
			o = t / 2,
			a = Math.floor(n),
			l = Math.floor(i),
			c = a + 1,
			h = l + 1,
			u = e / a,
			d = t / l,
			f = [],
			m = [],
			x = [],
			y = [];
		for (let g = 0; g < h; g++) {
			const p = g * d - o;
			for (let M = 0; M < c; M++) {
				const v = M * u - r;
				m.push(v, -p, 0), x.push(0, 0, 1), y.push(M / a), y.push(1 - g / l);
			}
		}
		for (let g = 0; g < l; g++)
			for (let p = 0; p < a; p++) {
				const M = p + c * g,
					v = p + c * (g + 1),
					_ = p + 1 + c * (g + 1),
					E = p + 1 + c * g;
				f.push(M, v, E), f.push(v, _, E);
			}
		this.setIndex(f),
			this.setAttribute("position", new fe(m, 3)),
			this.setAttribute("normal", new fe(x, 3)),
			this.setAttribute("uv", new fe(y, 2));
	}
	static fromJSON(e) {
		return new Qt(e.width, e.height, e.widthSegments, e.heightSegments);
	}
}
var Zf = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,
	Jf = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
	jf = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,
	$f = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
	Kf = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
	Qf = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
	ep = "vec3 transformed = vec3( position );",
	tp = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
	np = `vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,
	ip = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
	rp = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,
	sp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
	op = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
	ap = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
	lp = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
	cp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
	hp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,
	up = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,
	dp = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,
	fp = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 ) + 0.5;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		return texture2D( envMap, uv ).rgb;
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
	pp = `vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
	mp = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
	gp = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,
	xp = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
	yp = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
	vp = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	_p = `vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
	bp = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
	Mp = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
	wp = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
	Sp = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
	Tp = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
	Ep = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
	Ap = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
	Cp = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
	Rp = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
	Lp = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,
	Pp = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		lightMapIrradiance *= PI;
	#endif
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,
	Dp = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
	Ip = `vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,
	Fp = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
	Bp = `#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec;
			#ifdef ENVMAP_MODE_REFLECTION
				reflectVec = reflect( - viewDir, normal );
				reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			#else
				reflectVec = refract( - viewDir, normal, refractionRatio );
			#endif
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,
	zp = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
	Np = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,
	Op = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
	Up = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,
	Hp = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,
	Gp = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	vec3 FssEss = specularColor * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
	kp = `
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
	Vp = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
	Wp = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,
	qp = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
	Xp = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
	Yp = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,
	Zp = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,
	Jp = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
	jp = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
	$p = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
	Kp = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
	Qp = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
	em = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
	tm = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1, 2 ) * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,
	nm = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform vec2 morphTargetsTextureSize;
		vec3 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset, const in int stride ) {
			float texelIndex = float( vertexIndex * stride + offset );
			float y = floor( texelIndex / morphTargetsTextureSize.x );
			float x = texelIndex - y * morphTargetsTextureSize.x;
			vec3 morphUV = vec3( ( x + 0.5 ) / morphTargetsTextureSize.x, y / morphTargetsTextureSize.y, morphTargetIndex );
			return texture( morphTargetsTexture, morphUV ).xyz;
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,
	im = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			#ifndef USE_MORPHNORMALS
				if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 1 ) * morphTargetInfluences[ i ];
			#else
				if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 2 ) * morphTargetInfluences[ i ];
			#endif
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,
	rm = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,
	sm = `#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
	om = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
	am = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
	lm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
	cm = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,
	hm = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,
	um = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,
	dm = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,
	fm = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
	pm = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,
	mm = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
	gm = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
	xm = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
	ym = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
	vm = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
	_m = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
	bm = `#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,
	Mm = `#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
	wm = `#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,
	Sm = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
	Tm = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
	Em = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,
	Am = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
	Cm = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
	Rm = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
	Lm = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
	Pm = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
	Dm = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
	Im = `#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,
	Fm = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef TEXTURE_LOD_EXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,
	Bm = `#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,
	zm = `#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,
	Nm = `#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,
	Om = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,
	Um = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,
	Hm = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,
	Gm = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const km = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
	Vm = `uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,
	Wm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
	qm = `#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,
	Xm = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
	Ym = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,
	Zm = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
	Jm = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
	jm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
	$m = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,
	Km = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
	Qm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
	eg = `#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
	tg = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
	ng = `#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
	ig = `uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
	rg = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
	sg = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
	og = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
	ag = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
	lg = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
	cg = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
	hg = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
	ug = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
	dg = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
	fg = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
	pg = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
	mg = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
	gg = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
	xg = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,
	yg = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
	vg = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,
	Ie = {
		alphamap_fragment: Zf,
		alphamap_pars_fragment: Jf,
		alphatest_fragment: jf,
		alphatest_pars_fragment: $f,
		aomap_fragment: Kf,
		aomap_pars_fragment: Qf,
		begin_vertex: ep,
		beginnormal_vertex: tp,
		bsdfs: np,
		bumpmap_pars_fragment: ip,
		clipping_planes_fragment: rp,
		clipping_planes_pars_fragment: sp,
		clipping_planes_pars_vertex: op,
		clipping_planes_vertex: ap,
		color_fragment: lp,
		color_pars_fragment: cp,
		color_pars_vertex: hp,
		color_vertex: up,
		common: dp,
		cube_uv_reflection_fragment: fp,
		defaultnormal_vertex: pp,
		displacementmap_pars_vertex: mp,
		displacementmap_vertex: gp,
		emissivemap_fragment: xp,
		emissivemap_pars_fragment: yp,
		encodings_fragment: vp,
		encodings_pars_fragment: _p,
		envmap_fragment: bp,
		envmap_common_pars_fragment: Mp,
		envmap_pars_fragment: wp,
		envmap_pars_vertex: Sp,
		envmap_physical_pars_fragment: Bp,
		envmap_vertex: Tp,
		fog_vertex: Ep,
		fog_pars_vertex: Ap,
		fog_fragment: Cp,
		fog_pars_fragment: Rp,
		gradientmap_pars_fragment: Lp,
		lightmap_fragment: Pp,
		lightmap_pars_fragment: Dp,
		lights_lambert_vertex: Ip,
		lights_pars_begin: Fp,
		lights_toon_fragment: zp,
		lights_toon_pars_fragment: Np,
		lights_phong_fragment: Op,
		lights_phong_pars_fragment: Up,
		lights_physical_fragment: Hp,
		lights_physical_pars_fragment: Gp,
		lights_fragment_begin: kp,
		lights_fragment_maps: Vp,
		lights_fragment_end: Wp,
		logdepthbuf_fragment: qp,
		logdepthbuf_pars_fragment: Xp,
		logdepthbuf_pars_vertex: Yp,
		logdepthbuf_vertex: Zp,
		map_fragment: Jp,
		map_pars_fragment: jp,
		map_particle_fragment: $p,
		map_particle_pars_fragment: Kp,
		metalnessmap_fragment: Qp,
		metalnessmap_pars_fragment: em,
		morphnormal_vertex: tm,
		morphtarget_pars_vertex: nm,
		morphtarget_vertex: im,
		normal_fragment_begin: rm,
		normal_fragment_maps: sm,
		normal_pars_fragment: om,
		normal_pars_vertex: am,
		normal_vertex: lm,
		normalmap_pars_fragment: cm,
		clearcoat_normal_fragment_begin: hm,
		clearcoat_normal_fragment_maps: um,
		clearcoat_pars_fragment: dm,
		output_fragment: fm,
		packing: pm,
		premultiplied_alpha_fragment: mm,
		project_vertex: gm,
		dithering_fragment: xm,
		dithering_pars_fragment: ym,
		roughnessmap_fragment: vm,
		roughnessmap_pars_fragment: _m,
		shadowmap_pars_fragment: bm,
		shadowmap_pars_vertex: Mm,
		shadowmap_vertex: wm,
		shadowmask_pars_fragment: Sm,
		skinbase_vertex: Tm,
		skinning_pars_vertex: Em,
		skinning_vertex: Am,
		skinnormal_vertex: Cm,
		specularmap_fragment: Rm,
		specularmap_pars_fragment: Lm,
		tonemapping_fragment: Pm,
		tonemapping_pars_fragment: Dm,
		transmission_fragment: Im,
		transmission_pars_fragment: Fm,
		uv_pars_fragment: Bm,
		uv_pars_vertex: zm,
		uv_vertex: Nm,
		uv2_pars_fragment: Om,
		uv2_pars_vertex: Um,
		uv2_vertex: Hm,
		worldpos_vertex: Gm,
		background_vert: km,
		background_frag: Vm,
		cube_vert: Wm,
		cube_frag: qm,
		depth_vert: Xm,
		depth_frag: Ym,
		distanceRGBA_vert: Zm,
		distanceRGBA_frag: Jm,
		equirect_vert: jm,
		equirect_frag: $m,
		linedashed_vert: Km,
		linedashed_frag: Qm,
		meshbasic_vert: eg,
		meshbasic_frag: tg,
		meshlambert_vert: ng,
		meshlambert_frag: ig,
		meshmatcap_vert: rg,
		meshmatcap_frag: sg,
		meshnormal_vert: og,
		meshnormal_frag: ag,
		meshphong_vert: lg,
		meshphong_frag: cg,
		meshphysical_vert: hg,
		meshphysical_frag: ug,
		meshtoon_vert: dg,
		meshtoon_frag: fg,
		points_vert: pg,
		points_frag: mg,
		shadow_vert: gg,
		shadow_frag: xg,
		sprite_vert: yg,
		sprite_frag: vg
	},
	se = {
		common: {
			diffuse: { value: new re(16777215) },
			opacity: { value: 1 },
			map: { value: null },
			uvTransform: { value: new mt() },
			uv2Transform: { value: new mt() },
			alphaMap: { value: null },
			alphaTest: { value: 0 }
		},
		specularmap: { specularMap: { value: null } },
		envmap: {
			envMap: { value: null },
			flipEnvMap: { value: -1 },
			reflectivity: { value: 1 },
			ior: { value: 1.5 },
			refractionRatio: { value: 0.98 }
		},
		aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
		lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
		emissivemap: { emissiveMap: { value: null } },
		bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
		normalmap: {
			normalMap: { value: null },
			normalScale: { value: new G(1, 1) }
		},
		displacementmap: {
			displacementMap: { value: null },
			displacementScale: { value: 1 },
			displacementBias: { value: 0 }
		},
		roughnessmap: { roughnessMap: { value: null } },
		metalnessmap: { metalnessMap: { value: null } },
		gradientmap: { gradientMap: { value: null } },
		fog: {
			fogDensity: { value: 25e-5 },
			fogNear: { value: 1 },
			fogFar: { value: 2e3 },
			fogColor: { value: new re(16777215) }
		},
		lights: {
			ambientLightColor: { value: [] },
			lightProbe: { value: [] },
			directionalLights: { value: [], properties: { direction: {}, color: {} } },
			directionalLightShadows: {
				value: [],
				properties: {
					shadowBias: {},
					shadowNormalBias: {},
					shadowRadius: {},
					shadowMapSize: {}
				}
			},
			directionalShadowMap: { value: [] },
			directionalShadowMatrix: { value: [] },
			spotLights: {
				value: [],
				properties: {
					color: {},
					position: {},
					direction: {},
					distance: {},
					coneCos: {},
					penumbraCos: {},
					decay: {}
				}
			},
			spotLightShadows: {
				value: [],
				properties: {
					shadowBias: {},
					shadowNormalBias: {},
					shadowRadius: {},
					shadowMapSize: {}
				}
			},
			spotShadowMap: { value: [] },
			spotShadowMatrix: { value: [] },
			pointLights: {
				value: [],
				properties: { color: {}, position: {}, decay: {}, distance: {} }
			},
			pointLightShadows: {
				value: [],
				properties: {
					shadowBias: {},
					shadowNormalBias: {},
					shadowRadius: {},
					shadowMapSize: {},
					shadowCameraNear: {},
					shadowCameraFar: {}
				}
			},
			pointShadowMap: { value: [] },
			pointShadowMatrix: { value: [] },
			hemisphereLights: {
				value: [],
				properties: { direction: {}, skyColor: {}, groundColor: {} }
			},
			rectAreaLights: {
				value: [],
				properties: { color: {}, position: {}, width: {}, height: {} }
			},
			ltc_1: { value: null },
			ltc_2: { value: null }
		},
		points: {
			diffuse: { value: new re(16777215) },
			opacity: { value: 1 },
			size: { value: 1 },
			scale: { value: 1 },
			map: { value: null },
			alphaMap: { value: null },
			alphaTest: { value: 0 },
			uvTransform: { value: new mt() }
		},
		sprite: {
			diffuse: { value: new re(16777215) },
			opacity: { value: 1 },
			center: { value: new G(0.5, 0.5) },
			rotation: { value: 0 },
			map: { value: null },
			alphaMap: { value: null },
			alphaTest: { value: 0 },
			uvTransform: { value: new mt() }
		}
	},
	Vt = {
		basic: {
			uniforms: Tt([
				se.common,
				se.specularmap,
				se.envmap,
				se.aomap,
				se.lightmap,
				se.fog
			]),
			vertexShader: Ie.meshbasic_vert,
			fragmentShader: Ie.meshbasic_frag
		},
		lambert: {
			uniforms: Tt([
				se.common,
				se.specularmap,
				se.envmap,
				se.aomap,
				se.lightmap,
				se.emissivemap,
				se.fog,
				se.lights,
				{ emissive: { value: new re(0) } }
			]),
			vertexShader: Ie.meshlambert_vert,
			fragmentShader: Ie.meshlambert_frag
		},
		phong: {
			uniforms: Tt([
				se.common,
				se.specularmap,
				se.envmap,
				se.aomap,
				se.lightmap,
				se.emissivemap,
				se.bumpmap,
				se.normalmap,
				se.displacementmap,
				se.fog,
				se.lights,
				{
					emissive: { value: new re(0) },
					specular: { value: new re(1118481) },
					shininess: { value: 30 }
				}
			]),
			vertexShader: Ie.meshphong_vert,
			fragmentShader: Ie.meshphong_frag
		},
		standard: {
			uniforms: Tt([
				se.common,
				se.envmap,
				se.aomap,
				se.lightmap,
				se.emissivemap,
				se.bumpmap,
				se.normalmap,
				se.displacementmap,
				se.roughnessmap,
				se.metalnessmap,
				se.fog,
				se.lights,
				{
					emissive: { value: new re(0) },
					roughness: { value: 1 },
					metalness: { value: 0 },
					envMapIntensity: { value: 1 }
				}
			]),
			vertexShader: Ie.meshphysical_vert,
			fragmentShader: Ie.meshphysical_frag
		},
		toon: {
			uniforms: Tt([
				se.common,
				se.aomap,
				se.lightmap,
				se.emissivemap,
				se.bumpmap,
				se.normalmap,
				se.displacementmap,
				se.gradientmap,
				se.fog,
				se.lights,
				{ emissive: { value: new re(0) } }
			]),
			vertexShader: Ie.meshtoon_vert,
			fragmentShader: Ie.meshtoon_frag
		},
		matcap: {
			uniforms: Tt([
				se.common,
				se.bumpmap,
				se.normalmap,
				se.displacementmap,
				se.fog,
				{ matcap: { value: null } }
			]),
			vertexShader: Ie.meshmatcap_vert,
			fragmentShader: Ie.meshmatcap_frag
		},
		points: {
			uniforms: Tt([se.points, se.fog]),
			vertexShader: Ie.points_vert,
			fragmentShader: Ie.points_frag
		},
		dashed: {
			uniforms: Tt([
				se.common,
				se.fog,
				{ scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }
			]),
			vertexShader: Ie.linedashed_vert,
			fragmentShader: Ie.linedashed_frag
		},
		depth: {
			uniforms: Tt([se.common, se.displacementmap]),
			vertexShader: Ie.depth_vert,
			fragmentShader: Ie.depth_frag
		},
		normal: {
			uniforms: Tt([
				se.common,
				se.bumpmap,
				se.normalmap,
				se.displacementmap,
				{ opacity: { value: 1 } }
			]),
			vertexShader: Ie.meshnormal_vert,
			fragmentShader: Ie.meshnormal_frag
		},
		sprite: {
			uniforms: Tt([se.sprite, se.fog]),
			vertexShader: Ie.sprite_vert,
			fragmentShader: Ie.sprite_frag
		},
		background: {
			uniforms: { uvTransform: { value: new mt() }, t2D: { value: null } },
			vertexShader: Ie.background_vert,
			fragmentShader: Ie.background_frag
		},
		cube: {
			uniforms: Tt([se.envmap, { opacity: { value: 1 } }]),
			vertexShader: Ie.cube_vert,
			fragmentShader: Ie.cube_frag
		},
		equirect: {
			uniforms: { tEquirect: { value: null } },
			vertexShader: Ie.equirect_vert,
			fragmentShader: Ie.equirect_frag
		},
		distanceRGBA: {
			uniforms: Tt([
				se.common,
				se.displacementmap,
				{
					referencePosition: { value: new w() },
					nearDistance: { value: 1 },
					farDistance: { value: 1e3 }
				}
			]),
			vertexShader: Ie.distanceRGBA_vert,
			fragmentShader: Ie.distanceRGBA_frag
		},
		shadow: {
			uniforms: Tt([
				se.lights,
				se.fog,
				{ color: { value: new re(0) }, opacity: { value: 1 } }
			]),
			vertexShader: Ie.shadow_vert,
			fragmentShader: Ie.shadow_frag
		}
	};
Vt.physical = {
	uniforms: Tt([
		Vt.standard.uniforms,
		{
			clearcoat: { value: 0 },
			clearcoatMap: { value: null },
			clearcoatRoughness: { value: 0 },
			clearcoatRoughnessMap: { value: null },
			clearcoatNormalScale: { value: new G(1, 1) },
			clearcoatNormalMap: { value: null },
			sheen: { value: 0 },
			sheenColor: { value: new re(0) },
			sheenColorMap: { value: null },
			sheenRoughness: { value: 1 },
			sheenRoughnessMap: { value: null },
			transmission: { value: 0 },
			transmissionMap: { value: null },
			transmissionSamplerSize: { value: new G() },
			transmissionSamplerMap: { value: null },
			thickness: { value: 0 },
			thicknessMap: { value: null },
			attenuationDistance: { value: 0 },
			attenuationColor: { value: new re(0) },
			specularIntensity: { value: 1 },
			specularIntensityMap: { value: null },
			specularColor: { value: new re(1, 1, 1) },
			specularColorMap: { value: null }
		}
	]),
	vertexShader: Ie.meshphysical_vert,
	fragmentShader: Ie.meshphysical_frag
};
function _g(s, e, t, n, i, r) {
	const o = new re(0);
	let a = i === !0 ? 0 : 1,
		l,
		c,
		h = null,
		u = 0,
		d = null;
	function f(x, y) {
		let g = !1,
			p = y.isScene === !0 ? y.background : null;
		p && p.isTexture && (p = e.get(p));
		const M = s.xr,
			v = M.getSession && M.getSession();
		v && v.environmentBlendMode === "additive" && (p = null),
			p === null ? m(o, a) : p && p.isColor && (m(p, 1), (g = !0)),
			(s.autoClear || g) &&
				s.clear(s.autoClearColor, s.autoClearDepth, s.autoClearStencil),
			p && (p.isCubeTexture || p.mapping === ur)
				? (c === void 0 &&
						((c = new je(
							new xn(1, 1, 1),
							new ht({
								name: "BackgroundCubeMaterial",
								uniforms: er(Vt.cube.uniforms),
								vertexShader: Vt.cube.vertexShader,
								fragmentShader: Vt.cube.fragmentShader,
								side: lt,
								depthTest: !1,
								depthWrite: !1,
								fog: !1
							})
						)),
						c.geometry.deleteAttribute("normal"),
						c.geometry.deleteAttribute("uv"),
						(c.onBeforeRender = function (_, E, A) {
							this.matrixWorld.copyPosition(A.matrixWorld);
						}),
						Object.defineProperty(c.material, "envMap", {
							get: function () {
								return this.uniforms.envMap.value;
							}
						}),
						n.update(c)),
				  (c.material.uniforms.envMap.value = p),
				  (c.material.uniforms.flipEnvMap.value =
						p.isCubeTexture && p.isRenderTargetTexture === !1 ? -1 : 1),
				  (h !== p || u !== p.version || d !== s.toneMapping) &&
						((c.material.needsUpdate = !0),
						(h = p),
						(u = p.version),
						(d = s.toneMapping)),
				  x.unshift(c, c.geometry, c.material, 0, 0, null))
				: p &&
				  p.isTexture &&
				  (l === void 0 &&
						((l = new je(
							new Qt(2, 2),
							new ht({
								name: "BackgroundMaterial",
								uniforms: er(Vt.background.uniforms),
								vertexShader: Vt.background.vertexShader,
								fragmentShader: Vt.background.fragmentShader,
								side: ai,
								depthTest: !1,
								depthWrite: !1,
								fog: !1
							})
						)),
						l.geometry.deleteAttribute("normal"),
						Object.defineProperty(l.material, "map", {
							get: function () {
								return this.uniforms.t2D.value;
							}
						}),
						n.update(l)),
				  (l.material.uniforms.t2D.value = p),
				  p.matrixAutoUpdate === !0 && p.updateMatrix(),
				  l.material.uniforms.uvTransform.value.copy(p.matrix),
				  (h !== p || u !== p.version || d !== s.toneMapping) &&
						((l.material.needsUpdate = !0),
						(h = p),
						(u = p.version),
						(d = s.toneMapping)),
				  x.unshift(l, l.geometry, l.material, 0, 0, null));
	}
	function m(x, y) {
		t.buffers.color.setClear(x.r, x.g, x.b, y, r);
	}
	return {
		getClearColor: function () {
			return o;
		},
		setClearColor: function (x, y = 1) {
			o.set(x), (a = y), m(o, a);
		},
		getClearAlpha: function () {
			return a;
		},
		setClearAlpha: function (x) {
			(a = x), m(o, a);
		},
		render: f
	};
}
function bg(s, e, t, n) {
	const i = s.getParameter(34921),
		r = n.isWebGL2 ? null : e.get("OES_vertex_array_object"),
		o = n.isWebGL2 || r !== null,
		a = {},
		l = x(null);
	let c = l;
	function h(F, B, O, N, X) {
		let Q = !1;
		if (o) {
			const ae = m(N, O, B);
			c !== ae && ((c = ae), d(c.object)), (Q = y(N, X)), Q && g(N, X);
		} else {
			const ae = B.wireframe === !0;
			(c.geometry !== N.id || c.program !== O.id || c.wireframe !== ae) &&
				((c.geometry = N.id), (c.program = O.id), (c.wireframe = ae), (Q = !0));
		}
		F.isInstancedMesh === !0 && (Q = !0),
			X !== null && t.update(X, 34963),
			Q && (A(F, B, O, N), X !== null && s.bindBuffer(34963, t.get(X).buffer));
	}
	function u() {
		return n.isWebGL2 ? s.createVertexArray() : r.createVertexArrayOES();
	}
	function d(F) {
		return n.isWebGL2 ? s.bindVertexArray(F) : r.bindVertexArrayOES(F);
	}
	function f(F) {
		return n.isWebGL2 ? s.deleteVertexArray(F) : r.deleteVertexArrayOES(F);
	}
	function m(F, B, O) {
		const N = O.wireframe === !0;
		let X = a[F.id];
		X === void 0 && ((X = {}), (a[F.id] = X));
		let Q = X[B.id];
		Q === void 0 && ((Q = {}), (X[B.id] = Q));
		let ae = Q[N];
		return ae === void 0 && ((ae = x(u())), (Q[N] = ae)), ae;
	}
	function x(F) {
		const B = [],
			O = [],
			N = [];
		for (let X = 0; X < i; X++) (B[X] = 0), (O[X] = 0), (N[X] = 0);
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: B,
			enabledAttributes: O,
			attributeDivisors: N,
			object: F,
			attributes: {},
			index: null
		};
	}
	function y(F, B) {
		const O = c.attributes,
			N = F.attributes;
		let X = 0;
		for (const Q in N) {
			const ae = O[Q],
				Z = N[Q];
			if (ae === void 0 || ae.attribute !== Z || ae.data !== Z.data) return !0;
			X++;
		}
		return c.attributesNum !== X || c.index !== B;
	}
	function g(F, B) {
		const O = {},
			N = F.attributes;
		let X = 0;
		for (const Q in N) {
			const ae = N[Q],
				Z = {};
			(Z.attribute = ae), ae.data && (Z.data = ae.data), (O[Q] = Z), X++;
		}
		(c.attributes = O), (c.attributesNum = X), (c.index = B);
	}
	function p() {
		const F = c.newAttributes;
		for (let B = 0, O = F.length; B < O; B++) F[B] = 0;
	}
	function M(F) {
		v(F, 0);
	}
	function v(F, B) {
		const O = c.newAttributes,
			N = c.enabledAttributes,
			X = c.attributeDivisors;
		(O[F] = 1),
			N[F] === 0 && (s.enableVertexAttribArray(F), (N[F] = 1)),
			X[F] !== B &&
				((n.isWebGL2 ? s : e.get("ANGLE_instanced_arrays"))[
					n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"
				](F, B),
				(X[F] = B));
	}
	function _() {
		const F = c.newAttributes,
			B = c.enabledAttributes;
		for (let O = 0, N = B.length; O < N; O++)
			B[O] !== F[O] && (s.disableVertexAttribArray(O), (B[O] = 0));
	}
	function E(F, B, O, N, X, Q) {
		n.isWebGL2 === !0 && (O === 5124 || O === 5125)
			? s.vertexAttribIPointer(F, B, O, X, Q)
			: s.vertexAttribPointer(F, B, O, N, X, Q);
	}
	function A(F, B, O, N) {
		if (
			n.isWebGL2 === !1 &&
			(F.isInstancedMesh || N.isInstancedBufferGeometry) &&
			e.get("ANGLE_instanced_arrays") === null
		)
			return;
		p();
		const X = N.attributes,
			Q = O.getAttributes(),
			ae = B.defaultAttributeValues;
		for (const Z in Q) {
			const K = Q[Z];
			if (K.location >= 0) {
				let le = X[Z];
				if (
					(le === void 0 &&
						(Z === "instanceMatrix" && F.instanceMatrix && (le = F.instanceMatrix),
						Z === "instanceColor" && F.instanceColor && (le = F.instanceColor)),
					le !== void 0)
				) {
					const ge = le.normalized,
						_e = le.itemSize,
						V = t.get(le);
					if (V === void 0) continue;
					const Ne = V.buffer,
						ve = V.type,
						Ee = V.bytesPerElement;
					if (le.isInterleavedBufferAttribute) {
						const ue = le.data,
							Le = ue.stride,
							Te = le.offset;
						if (ue && ue.isInstancedInterleavedBuffer) {
							for (let j = 0; j < K.locationSize; j++)
								v(K.location + j, ue.meshPerAttribute);
							F.isInstancedMesh !== !0 &&
								N._maxInstanceCount === void 0 &&
								(N._maxInstanceCount = ue.meshPerAttribute * ue.count);
						} else for (let j = 0; j < K.locationSize; j++) M(K.location + j);
						s.bindBuffer(34962, Ne);
						for (let j = 0; j < K.locationSize; j++)
							E(
								K.location + j,
								_e / K.locationSize,
								ve,
								ge,
								Le * Ee,
								(Te + (_e / K.locationSize) * j) * Ee
							);
					} else {
						if (le.isInstancedBufferAttribute) {
							for (let ue = 0; ue < K.locationSize; ue++)
								v(K.location + ue, le.meshPerAttribute);
							F.isInstancedMesh !== !0 &&
								N._maxInstanceCount === void 0 &&
								(N._maxInstanceCount = le.meshPerAttribute * le.count);
						} else for (let ue = 0; ue < K.locationSize; ue++) M(K.location + ue);
						s.bindBuffer(34962, Ne);
						for (let ue = 0; ue < K.locationSize; ue++)
							E(
								K.location + ue,
								_e / K.locationSize,
								ve,
								ge,
								_e * Ee,
								(_e / K.locationSize) * ue * Ee
							);
					}
				} else if (ae !== void 0) {
					const ge = ae[Z];
					if (ge !== void 0)
						switch (ge.length) {
							case 2:
								s.vertexAttrib2fv(K.location, ge);
								break;
							case 3:
								s.vertexAttrib3fv(K.location, ge);
								break;
							case 4:
								s.vertexAttrib4fv(K.location, ge);
								break;
							default:
								s.vertexAttrib1fv(K.location, ge);
						}
				}
			}
		}
		_();
	}
	function D() {
		b();
		for (const F in a) {
			const B = a[F];
			for (const O in B) {
				const N = B[O];
				for (const X in N) f(N[X].object), delete N[X];
				delete B[O];
			}
			delete a[F];
		}
	}
	function H(F) {
		if (a[F.id] === void 0) return;
		const B = a[F.id];
		for (const O in B) {
			const N = B[O];
			for (const X in N) f(N[X].object), delete N[X];
			delete B[O];
		}
		delete a[F.id];
	}
	function I(F) {
		for (const B in a) {
			const O = a[B];
			if (O[F.id] === void 0) continue;
			const N = O[F.id];
			for (const X in N) f(N[X].object), delete N[X];
			delete O[F.id];
		}
	}
	function b() {
		L(), c !== l && ((c = l), d(c.object));
	}
	function L() {
		(l.geometry = null), (l.program = null), (l.wireframe = !1);
	}
	return {
		setup: h,
		reset: b,
		resetDefaultState: L,
		dispose: D,
		releaseStatesOfGeometry: H,
		releaseStatesOfProgram: I,
		initAttributes: p,
		enableAttribute: M,
		disableUnusedAttributes: _
	};
}
function Mg(s, e, t, n) {
	const i = n.isWebGL2;
	let r;
	function o(c) {
		r = c;
	}
	function a(c, h) {
		s.drawArrays(r, c, h), t.update(h, r, 1);
	}
	function l(c, h, u) {
		if (u === 0) return;
		let d, f;
		if (i) (d = s), (f = "drawArraysInstanced");
		else if (
			((d = e.get("ANGLE_instanced_arrays")),
			(f = "drawArraysInstancedANGLE"),
			d === null)
		) {
			console.error(
				"THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
			);
			return;
		}
		d[f](r, c, h, u), t.update(h, r, u);
	}
	(this.setMode = o), (this.render = a), (this.renderInstances = l);
}
function wg(s, e, t) {
	let n;
	function i() {
		if (n !== void 0) return n;
		if (e.has("EXT_texture_filter_anisotropic") === !0) {
			const A = e.get("EXT_texture_filter_anisotropic");
			n = s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else n = 0;
		return n;
	}
	function r(A) {
		if (A === "highp") {
			if (
				s.getShaderPrecisionFormat(35633, 36338).precision > 0 &&
				s.getShaderPrecisionFormat(35632, 36338).precision > 0
			)
				return "highp";
			A = "mediump";
		}
		return A === "mediump" &&
			s.getShaderPrecisionFormat(35633, 36337).precision > 0 &&
			s.getShaderPrecisionFormat(35632, 36337).precision > 0
			? "mediump"
			: "lowp";
	}
	const o =
		(typeof WebGL2RenderingContext != "undefined" &&
			s instanceof WebGL2RenderingContext) ||
		(typeof WebGL2ComputeRenderingContext != "undefined" &&
			s instanceof WebGL2ComputeRenderingContext);
	let a = t.precision !== void 0 ? t.precision : "highp";
	const l = r(a);
	l !== a &&
		(console.warn(
			"THREE.WebGLRenderer:",
			a,
			"not supported, using",
			l,
			"instead."
		),
		(a = l));
	const c = o || e.has("WEBGL_draw_buffers"),
		h = t.logarithmicDepthBuffer === !0,
		u = s.getParameter(34930),
		d = s.getParameter(35660),
		f = s.getParameter(3379),
		m = s.getParameter(34076),
		x = s.getParameter(34921),
		y = s.getParameter(36347),
		g = s.getParameter(36348),
		p = s.getParameter(36349),
		M = d > 0,
		v = o || e.has("OES_texture_float"),
		_ = M && v,
		E = o ? s.getParameter(36183) : 0;
	return {
		isWebGL2: o,
		drawBuffers: c,
		getMaxAnisotropy: i,
		getMaxPrecision: r,
		precision: a,
		logarithmicDepthBuffer: h,
		maxTextures: u,
		maxVertexTextures: d,
		maxTextureSize: f,
		maxCubemapSize: m,
		maxAttributes: x,
		maxVertexUniforms: y,
		maxVaryings: g,
		maxFragmentUniforms: p,
		vertexTextures: M,
		floatFragmentTextures: v,
		floatVertexTextures: _,
		maxSamples: E
	};
}
function Sg(s) {
	const e = this;
	let t = null,
		n = 0,
		i = !1,
		r = !1;
	const o = new kt(),
		a = new mt(),
		l = { value: null, needsUpdate: !1 };
	(this.uniform = l),
		(this.numPlanes = 0),
		(this.numIntersection = 0),
		(this.init = function (u, d, f) {
			const m = u.length !== 0 || d || n !== 0 || i;
			return (i = d), (t = h(u, f, 0)), (n = u.length), m;
		}),
		(this.beginShadows = function () {
			(r = !0), h(null);
		}),
		(this.endShadows = function () {
			(r = !1), c();
		}),
		(this.setState = function (u, d, f) {
			const m = u.clippingPlanes,
				x = u.clipIntersection,
				y = u.clipShadows,
				g = s.get(u);
			if (!i || m === null || m.length === 0 || (r && !y)) r ? h(null) : c();
			else {
				const p = r ? 0 : n,
					M = p * 4;
				let v = g.clippingState || null;
				(l.value = v), (v = h(m, d, M, f));
				for (let _ = 0; _ !== M; ++_) v[_] = t[_];
				(g.clippingState = v),
					(this.numIntersection = x ? this.numPlanes : 0),
					(this.numPlanes += p);
			}
		});
	function c() {
		l.value !== t && ((l.value = t), (l.needsUpdate = n > 0)),
			(e.numPlanes = n),
			(e.numIntersection = 0);
	}
	function h(u, d, f, m) {
		const x = u !== null ? u.length : 0;
		let y = null;
		if (x !== 0) {
			if (((y = l.value), m !== !0 || y === null)) {
				const g = f + x * 4,
					p = d.matrixWorldInverse;
				a.getNormalMatrix(p),
					(y === null || y.length < g) && (y = new Float32Array(g));
				for (let M = 0, v = f; M !== x; ++M, v += 4)
					o.copy(u[M]).applyMatrix4(p, a),
						o.normal.toArray(y, v),
						(y[v + 3] = o.constant);
			}
			(l.value = y), (l.needsUpdate = !0);
		}
		return (e.numPlanes = x), (e.numIntersection = 0), y;
	}
}
function Tg(s) {
	let e = new WeakMap();
	function t(o, a) {
		return a === Ir ? (o.mapping = mi) : a === Fr && (o.mapping = gi), o;
	}
	function n(o) {
		if (o && o.isTexture && o.isRenderTargetTexture === !1) {
			const a = o.mapping;
			if (a === Ir || a === Fr)
				if (e.has(o)) {
					const l = e.get(o).texture;
					return t(l, o.mapping);
				} else {
					const l = o.image;
					if (l && l.height > 0) {
						const c = new Mo(l.height / 2);
						return (
							c.fromEquirectangularTexture(s, o),
							e.set(o, c),
							o.addEventListener("dispose", i),
							t(c.texture, o.mapping)
						);
					} else return null;
				}
		}
		return o;
	}
	function i(o) {
		const a = o.target;
		a.removeEventListener("dispose", i);
		const l = e.get(a);
		l !== void 0 && (e.delete(a), l.dispose());
	}
	function r() {
		e = new WeakMap();
	}
	return { get: n, dispose: r };
}
class _i extends Kr {
	constructor(e = -1, t = 1, n = 1, i = -1, r = 0.1, o = 2e3) {
		super(),
			(this.type = "OrthographicCamera"),
			(this.zoom = 1),
			(this.view = null),
			(this.left = e),
			(this.right = t),
			(this.top = n),
			(this.bottom = i),
			(this.near = r),
			(this.far = o),
			this.updateProjectionMatrix();
	}
	copy(e, t) {
		return (
			super.copy(e, t),
			(this.left = e.left),
			(this.right = e.right),
			(this.top = e.top),
			(this.bottom = e.bottom),
			(this.near = e.near),
			(this.far = e.far),
			(this.zoom = e.zoom),
			(this.view = e.view === null ? null : Object.assign({}, e.view)),
			this
		);
	}
	setViewOffset(e, t, n, i, r, o) {
		this.view === null &&
			(this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}),
			(this.view.enabled = !0),
			(this.view.fullWidth = e),
			(this.view.fullHeight = t),
			(this.view.offsetX = n),
			(this.view.offsetY = i),
			(this.view.width = r),
			(this.view.height = o),
			this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		const e = (this.right - this.left) / (2 * this.zoom),
			t = (this.top - this.bottom) / (2 * this.zoom),
			n = (this.right + this.left) / 2,
			i = (this.top + this.bottom) / 2;
		let r = n - e,
			o = n + e,
			a = i + t,
			l = i - t;
		if (this.view !== null && this.view.enabled) {
			const c = (this.right - this.left) / this.view.fullWidth / this.zoom,
				h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			(r += c * this.view.offsetX),
				(o = r + c * this.view.width),
				(a -= h * this.view.offsetY),
				(l = a - h * this.view.height);
		}
		this.projectionMatrix.makeOrthographic(r, o, a, l, this.near, this.far),
			this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return (
			(t.object.zoom = this.zoom),
			(t.object.left = this.left),
			(t.object.right = this.right),
			(t.object.top = this.top),
			(t.object.bottom = this.bottom),
			(t.object.near = this.near),
			(t.object.far = this.far),
			this.view !== null && (t.object.view = Object.assign({}, this.view)),
			t
		);
	}
}
_i.prototype.isOrthographicCamera = !0;
class fr extends ht {
	constructor(e) {
		super(e), (this.type = "RawShaderMaterial");
	}
}
fr.prototype.isRawShaderMaterial = !0;
const ji = 4,
	Pn = 8,
	jt = Math.pow(2, Pn),
	Nu = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
	Ou = Pn - ji + 1 + Nu.length,
	Ui = 20,
	ca = new _i(),
	{ _lodPlanes: Mr, _sizeLods: cc, _sigmas: Cs } = Eg(),
	hc = new re();
let ha = null;
const Kn = (1 + Math.sqrt(5)) / 2,
	Hi = 1 / Kn,
	uc = [
		new w(1, 1, 1),
		new w(-1, 1, 1),
		new w(1, 1, -1),
		new w(-1, 1, -1),
		new w(0, Kn, Hi),
		new w(0, Kn, -Hi),
		new w(Hi, 0, Kn),
		new w(-Hi, 0, Kn),
		new w(Kn, Hi, 0),
		new w(-Kn, Hi, 0)
	];
class $a {
	constructor(e) {
		(this._renderer = e),
			(this._pingPongRenderTarget = null),
			(this._blurMaterial = Ag(Ui)),
			(this._equirectShader = null),
			(this._cubemapShader = null),
			this._compileMaterial(this._blurMaterial);
	}
	fromScene(e, t = 0, n = 0.1, i = 100) {
		ha = this._renderer.getRenderTarget();
		const r = this._allocateTargets();
		return (
			this._sceneToCubeUV(e, n, i, r),
			t > 0 && this._blur(r, 0, 0, t),
			this._applyPMREM(r),
			this._cleanup(r),
			r
		);
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapShader === null &&
			((this._cubemapShader = pc()), this._compileMaterial(this._cubemapShader));
	}
	compileEquirectangularShader() {
		this._equirectShader === null &&
			((this._equirectShader = fc()), this._compileMaterial(this._equirectShader));
	}
	dispose() {
		this._blurMaterial.dispose(),
			this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose(),
			this._cubemapShader !== null && this._cubemapShader.dispose(),
			this._equirectShader !== null && this._equirectShader.dispose();
		for (let e = 0; e < Mr.length; e++) Mr[e].dispose();
	}
	_cleanup(e) {
		this._renderer.setRenderTarget(ha),
			(e.scissorTest = !1),
			Rs(e, 0, 0, e.width, e.height);
	}
	_fromTexture(e, t) {
		ha = this._renderer.getRenderTarget();
		const n = t || this._allocateTargets(e);
		return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
	}
	_allocateTargets(e) {
		const t = {
				magFilter: Ye,
				minFilter: Ye,
				generateMipmaps: !1,
				type: ii,
				format: ct,
				encoding: gn,
				depthBuffer: !1
			},
			n = dc(t);
		return (
			(n.depthBuffer = !e),
			this._pingPongRenderTarget === null && (this._pingPongRenderTarget = dc(t)),
			n
		);
	}
	_compileMaterial(e) {
		const t = new je(Mr[0], e);
		this._renderer.compile(t, ca);
	}
	_sceneToCubeUV(e, t, n, i) {
		const a = new pt(90, 1, t, n),
			l = [1, -1, 1, 1, 1, 1],
			c = [1, 1, 1, -1, -1, -1],
			h = this._renderer,
			u = h.autoClear,
			d = h.toneMapping;
		h.getClearColor(hc), (h.toneMapping = pn), (h.autoClear = !1);
		const f = new Nt({
				name: "PMREM.Background",
				side: lt,
				depthWrite: !1,
				depthTest: !1
			}),
			m = new je(new xn(), f);
		let x = !1;
		const y = e.background;
		y
			? y.isColor && (f.color.copy(y), (e.background = null), (x = !0))
			: (f.color.copy(hc), (x = !0));
		for (let g = 0; g < 6; g++) {
			const p = g % 3;
			p === 0
				? (a.up.set(0, l[g], 0), a.lookAt(c[g], 0, 0))
				: p === 1
				? (a.up.set(0, 0, l[g]), a.lookAt(0, c[g], 0))
				: (a.up.set(0, l[g], 0), a.lookAt(0, 0, c[g])),
				Rs(i, p * jt, g > 2 ? jt : 0, jt, jt),
				h.setRenderTarget(i),
				x && h.render(m, a),
				h.render(e, a);
		}
		m.geometry.dispose(),
			m.material.dispose(),
			(h.toneMapping = d),
			(h.autoClear = u),
			(e.background = y);
	}
	_textureToCubeUV(e, t) {
		const n = this._renderer,
			i = e.mapping === mi || e.mapping === gi;
		i
			? (this._cubemapShader === null && (this._cubemapShader = pc()),
			  (this._cubemapShader.uniforms.flipEnvMap.value =
					e.isRenderTargetTexture === !1 ? -1 : 1))
			: this._equirectShader === null && (this._equirectShader = fc());
		const r = i ? this._cubemapShader : this._equirectShader,
			o = new je(Mr[0], r),
			a = r.uniforms;
		(a.envMap.value = e),
			i || a.texelSize.value.set(1 / e.image.width, 1 / e.image.height),
			Rs(t, 0, 0, 3 * jt, 2 * jt),
			n.setRenderTarget(t),
			n.render(o, ca);
	}
	_applyPMREM(e) {
		const t = this._renderer,
			n = t.autoClear;
		t.autoClear = !1;
		for (let i = 1; i < Ou; i++) {
			const r = Math.sqrt(Cs[i] * Cs[i] - Cs[i - 1] * Cs[i - 1]),
				o = uc[(i - 1) % uc.length];
			this._blur(e, i - 1, i, r, o);
		}
		t.autoClear = n;
	}
	_blur(e, t, n, i, r) {
		const o = this._pingPongRenderTarget;
		this._halfBlur(e, o, t, n, i, "latitudinal", r),
			this._halfBlur(o, e, n, n, i, "longitudinal", r);
	}
	_halfBlur(e, t, n, i, r, o, a) {
		const l = this._renderer,
			c = this._blurMaterial;
		o !== "latitudinal" &&
			o !== "longitudinal" &&
			console.error("blur direction must be either latitudinal or longitudinal!");
		const h = 3,
			u = new je(Mr[i], c),
			d = c.uniforms,
			f = cc[n] - 1,
			m = isFinite(r) ? Math.PI / (2 * f) : (2 * Math.PI) / (2 * Ui - 1),
			x = r / m,
			y = isFinite(r) ? 1 + Math.floor(h * x) : Ui;
		y > Ui &&
			console.warn(
				`sigmaRadians, ${r}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Ui}`
			);
		const g = [];
		let p = 0;
		for (let E = 0; E < Ui; ++E) {
			const A = E / x,
				D = Math.exp((-A * A) / 2);
			g.push(D), E === 0 ? (p += D) : E < y && (p += 2 * D);
		}
		for (let E = 0; E < g.length; E++) g[E] = g[E] / p;
		(d.envMap.value = e.texture),
			(d.samples.value = y),
			(d.weights.value = g),
			(d.latitudinal.value = o === "latitudinal"),
			a && (d.poleAxis.value = a),
			(d.dTheta.value = m),
			(d.mipInt.value = Pn - n);
		const M = cc[i],
			v = 3 * Math.max(0, jt - 2 * M),
			_ = (i === 0 ? 0 : 2 * jt) + 2 * M * (i > Pn - ji ? i - Pn + ji : 0);
		Rs(t, v, _, 3 * M, 2 * M), l.setRenderTarget(t), l.render(u, ca);
	}
}
function Eg() {
	const s = [],
		e = [],
		t = [];
	let n = Pn;
	for (let i = 0; i < Ou; i++) {
		const r = Math.pow(2, n);
		e.push(r);
		let o = 1 / r;
		i > Pn - ji ? (o = Nu[i - Pn + ji - 1]) : i === 0 && (o = 0), t.push(o);
		const a = 1 / (r - 1),
			l = -a / 2,
			c = 1 + a / 2,
			h = [l, l, c, l, c, c, l, l, c, c, l, c],
			u = 6,
			d = 6,
			f = 3,
			m = 2,
			x = 1,
			y = new Float32Array(f * d * u),
			g = new Float32Array(m * d * u),
			p = new Float32Array(x * d * u);
		for (let v = 0; v < u; v++) {
			const _ = ((v % 3) * 2) / 3 - 1,
				E = v > 2 ? 0 : -1,
				A = [
					_,
					E,
					0,
					_ + 2 / 3,
					E,
					0,
					_ + 2 / 3,
					E + 1,
					0,
					_,
					E,
					0,
					_ + 2 / 3,
					E + 1,
					0,
					_,
					E + 1,
					0
				];
			y.set(A, f * d * v), g.set(h, m * d * v);
			const D = [v, v, v, v, v, v];
			p.set(D, x * d * v);
		}
		const M = new Me();
		M.setAttribute("position", new Oe(y, f)),
			M.setAttribute("uv", new Oe(g, m)),
			M.setAttribute("faceIndex", new Oe(p, x)),
			s.push(M),
			n > ji && n--;
	}
	return { _lodPlanes: s, _sizeLods: e, _sigmas: t };
}
function dc(s) {
	const e = new ut(3 * jt, 3 * jt, s);
	return (
		(e.texture.mapping = ur),
		(e.texture.name = "PMREM.cubeUv"),
		(e.scissorTest = !0),
		e
	);
}
function Rs(s, e, t, n, i) {
	s.viewport.set(e, t, n, i), s.scissor.set(e, t, n, i);
}
function Ag(s) {
	const e = new Float32Array(s),
		t = new w(0, 1, 0);
	return new fr({
		name: "SphericalGaussianBlur",
		defines: { n: s },
		uniforms: {
			envMap: { value: null },
			samples: { value: 1 },
			weights: { value: e },
			latitudinal: { value: !1 },
			dTheta: { value: 0 },
			mipInt: { value: 0 },
			poleAxis: { value: t }
		},
		vertexShader: dl(),
		fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
		blending: fn,
		depthTest: !1,
		depthWrite: !1
	});
}
function fc() {
	const s = new G(1, 1);
	return new fr({
		name: "EquirectangularToCubeUV",
		uniforms: { envMap: { value: null }, texelSize: { value: s } },
		vertexShader: dl(),
		fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = texture2D ( envMap, uv ).rgb;
				uv.x += texelSize.x;
				vec3 tr = texture2D ( envMap, uv ).rgb;
				uv.y += texelSize.y;
				vec3 br = texture2D ( envMap, uv ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = texture2D ( envMap, uv ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

			}
		`,
		blending: fn,
		depthTest: !1,
		depthWrite: !1
	});
}
function pc() {
	return new fr({
		name: "CubemapToCubeUV",
		uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
		vertexShader: dl(),
		fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
		blending: fn,
		depthTest: !1,
		depthWrite: !1
	});
}
function dl() {
	return `

		precision mediump float;
		precision mediump int;

		attribute vec3 position;
		attribute vec2 uv;
		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function Cg(s) {
	let e = new WeakMap(),
		t = null;
	function n(a) {
		if (a && a.isTexture) {
			const l = a.mapping,
				c = l === Ir || l === Fr,
				h = l === mi || l === gi;
			if (c || h)
				if (a.isRenderTargetTexture && a.needsPMREMUpdate === !0) {
					a.needsPMREMUpdate = !1;
					let u = e.get(a);
					return (
						t === null && (t = new $a(s)),
						(u = c ? t.fromEquirectangular(a, u) : t.fromCubemap(a, u)),
						e.set(a, u),
						u.texture
					);
				} else {
					if (e.has(a)) return e.get(a).texture;
					{
						const u = a.image;
						if ((c && u && u.height > 0) || (h && u && i(u))) {
							t === null && (t = new $a(s));
							const d = c ? t.fromEquirectangular(a) : t.fromCubemap(a);
							return e.set(a, d), a.addEventListener("dispose", r), d.texture;
						} else return null;
					}
				}
		}
		return a;
	}
	function i(a) {
		let l = 0;
		const c = 6;
		for (let h = 0; h < c; h++) a[h] !== void 0 && l++;
		return l === c;
	}
	function r(a) {
		const l = a.target;
		l.removeEventListener("dispose", r);
		const c = e.get(l);
		c !== void 0 && (e.delete(l), c.dispose());
	}
	function o() {
		(e = new WeakMap()), t !== null && (t.dispose(), (t = null));
	}
	return { get: n, dispose: o };
}
function Rg(s) {
	const e = {};
	function t(n) {
		if (e[n] !== void 0) return e[n];
		let i;
		switch (n) {
			case "WEBGL_depth_texture":
				i =
					s.getExtension("WEBGL_depth_texture") ||
					s.getExtension("MOZ_WEBGL_depth_texture") ||
					s.getExtension("WEBKIT_WEBGL_depth_texture");
				break;
			case "EXT_texture_filter_anisotropic":
				i =
					s.getExtension("EXT_texture_filter_anisotropic") ||
					s.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
					s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
				break;
			case "WEBGL_compressed_texture_s3tc":
				i =
					s.getExtension("WEBGL_compressed_texture_s3tc") ||
					s.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
					s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
				break;
			case "WEBGL_compressed_texture_pvrtc":
				i =
					s.getExtension("WEBGL_compressed_texture_pvrtc") ||
					s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
				break;
			default:
				i = s.getExtension(n);
		}
		return (e[n] = i), i;
	}
	return {
		has: function (n) {
			return t(n) !== null;
		},
		init: function (n) {
			n.isWebGL2
				? t("EXT_color_buffer_float")
				: (t("WEBGL_depth_texture"),
				  t("OES_texture_float"),
				  t("OES_texture_half_float"),
				  t("OES_texture_half_float_linear"),
				  t("OES_standard_derivatives"),
				  t("OES_element_index_uint"),
				  t("OES_vertex_array_object"),
				  t("ANGLE_instanced_arrays")),
				t("OES_texture_float_linear"),
				t("EXT_color_buffer_half_float"),
				t("WEBGL_multisampled_render_to_texture");
		},
		get: function (n) {
			const i = t(n);
			return (
				i === null &&
					console.warn("THREE.WebGLRenderer: " + n + " extension not supported."),
				i
			);
		}
	};
}
function Lg(s, e, t, n) {
	const i = {},
		r = new WeakMap();
	function o(u) {
		const d = u.target;
		d.index !== null && e.remove(d.index);
		for (const m in d.attributes) e.remove(d.attributes[m]);
		d.removeEventListener("dispose", o), delete i[d.id];
		const f = r.get(d);
		f && (e.remove(f), r.delete(d)),
			n.releaseStatesOfGeometry(d),
			d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount,
			t.memory.geometries--;
	}
	function a(u, d) {
		return (
			i[d.id] === !0 ||
				(d.addEventListener("dispose", o), (i[d.id] = !0), t.memory.geometries++),
			d
		);
	}
	function l(u) {
		const d = u.attributes;
		for (const m in d) e.update(d[m], 34962);
		const f = u.morphAttributes;
		for (const m in f) {
			const x = f[m];
			for (let y = 0, g = x.length; y < g; y++) e.update(x[y], 34962);
		}
	}
	function c(u) {
		const d = [],
			f = u.index,
			m = u.attributes.position;
		let x = 0;
		if (f !== null) {
			const p = f.array;
			x = f.version;
			for (let M = 0, v = p.length; M < v; M += 3) {
				const _ = p[M + 0],
					E = p[M + 1],
					A = p[M + 2];
				d.push(_, E, E, A, A, _);
			}
		} else {
			const p = m.array;
			x = m.version;
			for (let M = 0, v = p.length / 3 - 1; M < v; M += 3) {
				const _ = M + 0,
					E = M + 1,
					A = M + 2;
				d.push(_, E, E, A, A, _);
			}
		}
		const y = new (Eu(d) ? _o : vo)(d, 1);
		y.version = x;
		const g = r.get(u);
		g && e.remove(g), r.set(u, y);
	}
	function h(u) {
		const d = r.get(u);
		if (d) {
			const f = u.index;
			f !== null && d.version < f.version && c(u);
		} else c(u);
		return r.get(u);
	}
	return { get: a, update: l, getWireframeAttribute: h };
}
function Pg(s, e, t, n) {
	const i = n.isWebGL2;
	let r;
	function o(d) {
		r = d;
	}
	let a, l;
	function c(d) {
		(a = d.type), (l = d.bytesPerElement);
	}
	function h(d, f) {
		s.drawElements(r, f, a, d * l), t.update(f, r, 1);
	}
	function u(d, f, m) {
		if (m === 0) return;
		let x, y;
		if (i) (x = s), (y = "drawElementsInstanced");
		else if (
			((x = e.get("ANGLE_instanced_arrays")),
			(y = "drawElementsInstancedANGLE"),
			x === null)
		) {
			console.error(
				"THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
			);
			return;
		}
		x[y](r, f, a, d * l, m), t.update(f, r, m);
	}
	(this.setMode = o),
		(this.setIndex = c),
		(this.render = h),
		(this.renderInstances = u);
}
function Dg(s) {
	const e = { geometries: 0, textures: 0 },
		t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
	function n(r, o, a) {
		switch ((t.calls++, o)) {
			case 4:
				t.triangles += a * (r / 3);
				break;
			case 1:
				t.lines += a * (r / 2);
				break;
			case 3:
				t.lines += a * (r - 1);
				break;
			case 2:
				t.lines += a * r;
				break;
			case 0:
				t.points += a * r;
				break;
			default:
				console.error("THREE.WebGLInfo: Unknown draw mode:", o);
				break;
		}
	}
	function i() {
		t.frame++, (t.calls = 0), (t.triangles = 0), (t.points = 0), (t.lines = 0);
	}
	return {
		memory: e,
		render: t,
		programs: null,
		autoReset: !0,
		reset: i,
		update: n
	};
}
class wo extends dt {
	constructor(e = null, t = 1, n = 1, i = 1) {
		super(null),
			(this.image = { data: e, width: t, height: n, depth: i }),
			(this.magFilter = et),
			(this.minFilter = et),
			(this.wrapR = wt),
			(this.generateMipmaps = !1),
			(this.flipY = !1),
			(this.unpackAlignment = 1);
	}
}
wo.prototype.isDataTexture2DArray = !0;
function Ig(s, e) {
	return s[0] - e[0];
}
function Fg(s, e) {
	return Math.abs(e[1]) - Math.abs(s[1]);
}
function mc(s, e) {
	let t = 1;
	const n = e.isInterleavedBufferAttribute ? e.data.array : e.array;
	n instanceof Int8Array
		? (t = 127)
		: n instanceof Int16Array
		? (t = 32767)
		: n instanceof Int32Array
		? (t = 2147483647)
		: console.error(
				"THREE.WebGLMorphtargets: Unsupported morph attribute data type: ",
				n
		  ),
		s.divideScalar(t);
}
function Bg(s, e, t) {
	const n = {},
		i = new Float32Array(8),
		r = new WeakMap(),
		o = new w(),
		a = [];
	for (let c = 0; c < 8; c++) a[c] = [c, 0];
	function l(c, h, u, d) {
		const f = c.morphTargetInfluences;
		if (e.isWebGL2 === !0) {
			const x = h.morphAttributes.position.length;
			let y = r.get(h);
			if (y === void 0 || y.count !== x) {
				let F = function () {
					b.dispose(), r.delete(h), h.removeEventListener("dispose", F);
				};
				var m = F;
				y !== void 0 && y.texture.dispose();
				const M = h.morphAttributes.normal !== void 0,
					v = h.morphAttributes.position,
					_ = h.morphAttributes.normal || [],
					E = h.attributes.position.count,
					A = M === !0 ? 2 : 1;
				let D = E * A,
					H = 1;
				D > e.maxTextureSize &&
					((H = Math.ceil(D / e.maxTextureSize)), (D = e.maxTextureSize));
				const I = new Float32Array(D * H * 4 * x),
					b = new wo(I, D, H, x);
				(b.format = ct), (b.type = dn), (b.needsUpdate = !0);
				const L = A * 4;
				for (let B = 0; B < x; B++) {
					const O = v[B],
						N = _[B],
						X = D * H * 4 * B;
					for (let Q = 0; Q < O.count; Q++) {
						o.fromBufferAttribute(O, Q), O.normalized === !0 && mc(o, O);
						const ae = Q * L;
						(I[X + ae + 0] = o.x),
							(I[X + ae + 1] = o.y),
							(I[X + ae + 2] = o.z),
							(I[X + ae + 3] = 0),
							M === !0 &&
								(o.fromBufferAttribute(N, Q),
								N.normalized === !0 && mc(o, N),
								(I[X + ae + 4] = o.x),
								(I[X + ae + 5] = o.y),
								(I[X + ae + 6] = o.z),
								(I[X + ae + 7] = 0));
					}
				}
				(y = { count: x, texture: b, size: new G(D, H) }),
					r.set(h, y),
					h.addEventListener("dispose", F);
			}
			let g = 0;
			for (let M = 0; M < f.length; M++) g += f[M];
			const p = h.morphTargetsRelative ? 1 : 1 - g;
			d.getUniforms().setValue(s, "morphTargetBaseInfluence", p),
				d.getUniforms().setValue(s, "morphTargetInfluences", f),
				d.getUniforms().setValue(s, "morphTargetsTexture", y.texture, t),
				d.getUniforms().setValue(s, "morphTargetsTextureSize", y.size);
		} else {
			const x = f === void 0 ? 0 : f.length;
			let y = n[h.id];
			if (y === void 0 || y.length !== x) {
				y = [];
				for (let _ = 0; _ < x; _++) y[_] = [_, 0];
				n[h.id] = y;
			}
			for (let _ = 0; _ < x; _++) {
				const E = y[_];
				(E[0] = _), (E[1] = f[_]);
			}
			y.sort(Fg);
			for (let _ = 0; _ < 8; _++)
				_ < x && y[_][1]
					? ((a[_][0] = y[_][0]), (a[_][1] = y[_][1]))
					: ((a[_][0] = Number.MAX_SAFE_INTEGER), (a[_][1] = 0));
			a.sort(Ig);
			const g = h.morphAttributes.position,
				p = h.morphAttributes.normal;
			let M = 0;
			for (let _ = 0; _ < 8; _++) {
				const E = a[_],
					A = E[0],
					D = E[1];
				A !== Number.MAX_SAFE_INTEGER && D
					? (g &&
							h.getAttribute("morphTarget" + _) !== g[A] &&
							h.setAttribute("morphTarget" + _, g[A]),
					  p &&
							h.getAttribute("morphNormal" + _) !== p[A] &&
							h.setAttribute("morphNormal" + _, p[A]),
					  (i[_] = D),
					  (M += D))
					: (g &&
							h.hasAttribute("morphTarget" + _) === !0 &&
							h.deleteAttribute("morphTarget" + _),
					  p &&
							h.hasAttribute("morphNormal" + _) === !0 &&
							h.deleteAttribute("morphNormal" + _),
					  (i[_] = 0));
			}
			const v = h.morphTargetsRelative ? 1 : 1 - M;
			d.getUniforms().setValue(s, "morphTargetBaseInfluence", v),
				d.getUniforms().setValue(s, "morphTargetInfluences", i);
		}
	}
	return { update: l };
}
function zg(s, e, t, n) {
	let i = new WeakMap();
	function r(l) {
		const c = n.render.frame,
			h = l.geometry,
			u = e.get(l, h);
		return (
			i.get(u) !== c && (e.update(u), i.set(u, c)),
			l.isInstancedMesh &&
				(l.hasEventListener("dispose", a) === !1 &&
					l.addEventListener("dispose", a),
				t.update(l.instanceMatrix, 34962),
				l.instanceColor !== null && t.update(l.instanceColor, 34962)),
			u
		);
	}
	function o() {
		i = new WeakMap();
	}
	function a(l) {
		const c = l.target;
		c.removeEventListener("dispose", a),
			t.remove(c.instanceMatrix),
			c.instanceColor !== null && t.remove(c.instanceColor);
	}
	return { update: r, dispose: o };
}
class fl extends dt {
	constructor(e = null, t = 1, n = 1, i = 1) {
		super(null),
			(this.image = { data: e, width: t, height: n, depth: i }),
			(this.magFilter = et),
			(this.minFilter = et),
			(this.wrapR = wt),
			(this.generateMipmaps = !1),
			(this.flipY = !1),
			(this.unpackAlignment = 1);
	}
}
fl.prototype.isDataTexture3D = !0;
const Uu = new dt(),
	Hu = new wo(),
	Gu = new fl(),
	ku = new dr(),
	gc = [],
	xc = [],
	yc = new Float32Array(16),
	vc = new Float32Array(9),
	_c = new Float32Array(4);
function pr(s, e, t) {
	const n = s[0];
	if (n <= 0 || n > 0) return s;
	const i = e * t;
	let r = gc[i];
	if ((r === void 0 && ((r = new Float32Array(i)), (gc[i] = r)), e !== 0)) {
		n.toArray(r, 0);
		for (let o = 1, a = 0; o !== e; ++o) (a += t), s[o].toArray(r, a);
	}
	return r;
}
function At(s, e) {
	if (s.length !== e.length) return !1;
	for (let t = 0, n = s.length; t < n; t++) if (s[t] !== e[t]) return !1;
	return !0;
}
function Et(s, e) {
	for (let t = 0, n = e.length; t < n; t++) s[t] = e[t];
}
function So(s, e) {
	let t = xc[e];
	t === void 0 && ((t = new Int32Array(e)), (xc[e] = t));
	for (let n = 0; n !== e; ++n) t[n] = s.allocateTextureUnit();
	return t;
}
function Ng(s, e) {
	const t = this.cache;
	t[0] !== e && (s.uniform1f(this.addr, e), (t[0] = e));
}
function Og(s, e) {
	const t = this.cache;
	if (e.x !== void 0)
		(t[0] !== e.x || t[1] !== e.y) &&
			(s.uniform2f(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
	else {
		if (At(t, e)) return;
		s.uniform2fv(this.addr, e), Et(t, e);
	}
}
function Ug(s, e) {
	const t = this.cache;
	if (e.x !== void 0)
		(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) &&
			(s.uniform3f(this.addr, e.x, e.y, e.z),
			(t[0] = e.x),
			(t[1] = e.y),
			(t[2] = e.z));
	else if (e.r !== void 0)
		(t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) &&
			(s.uniform3f(this.addr, e.r, e.g, e.b),
			(t[0] = e.r),
			(t[1] = e.g),
			(t[2] = e.b));
	else {
		if (At(t, e)) return;
		s.uniform3fv(this.addr, e), Et(t, e);
	}
}
function Hg(s, e) {
	const t = this.cache;
	if (e.x !== void 0)
		(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) &&
			(s.uniform4f(this.addr, e.x, e.y, e.z, e.w),
			(t[0] = e.x),
			(t[1] = e.y),
			(t[2] = e.z),
			(t[3] = e.w));
	else {
		if (At(t, e)) return;
		s.uniform4fv(this.addr, e), Et(t, e);
	}
}
function Gg(s, e) {
	const t = this.cache,
		n = e.elements;
	if (n === void 0) {
		if (At(t, e)) return;
		s.uniformMatrix2fv(this.addr, !1, e), Et(t, e);
	} else {
		if (At(t, n)) return;
		_c.set(n), s.uniformMatrix2fv(this.addr, !1, _c), Et(t, n);
	}
}
function kg(s, e) {
	const t = this.cache,
		n = e.elements;
	if (n === void 0) {
		if (At(t, e)) return;
		s.uniformMatrix3fv(this.addr, !1, e), Et(t, e);
	} else {
		if (At(t, n)) return;
		vc.set(n), s.uniformMatrix3fv(this.addr, !1, vc), Et(t, n);
	}
}
function Vg(s, e) {
	const t = this.cache,
		n = e.elements;
	if (n === void 0) {
		if (At(t, e)) return;
		s.uniformMatrix4fv(this.addr, !1, e), Et(t, e);
	} else {
		if (At(t, n)) return;
		yc.set(n), s.uniformMatrix4fv(this.addr, !1, yc), Et(t, n);
	}
}
function Wg(s, e) {
	const t = this.cache;
	t[0] !== e && (s.uniform1i(this.addr, e), (t[0] = e));
}
function qg(s, e) {
	const t = this.cache;
	At(t, e) || (s.uniform2iv(this.addr, e), Et(t, e));
}
function Xg(s, e) {
	const t = this.cache;
	At(t, e) || (s.uniform3iv(this.addr, e), Et(t, e));
}
function Yg(s, e) {
	const t = this.cache;
	At(t, e) || (s.uniform4iv(this.addr, e), Et(t, e));
}
function Zg(s, e) {
	const t = this.cache;
	t[0] !== e && (s.uniform1ui(this.addr, e), (t[0] = e));
}
function Jg(s, e) {
	const t = this.cache;
	At(t, e) || (s.uniform2uiv(this.addr, e), Et(t, e));
}
function jg(s, e) {
	const t = this.cache;
	At(t, e) || (s.uniform3uiv(this.addr, e), Et(t, e));
}
function $g(s, e) {
	const t = this.cache;
	At(t, e) || (s.uniform4uiv(this.addr, e), Et(t, e));
}
function Kg(s, e, t) {
	const n = this.cache,
		i = t.allocateTextureUnit();
	n[0] !== i && (s.uniform1i(this.addr, i), (n[0] = i)),
		t.safeSetTexture2D(e || Uu, i);
}
function Qg(s, e, t) {
	const n = this.cache,
		i = t.allocateTextureUnit();
	n[0] !== i && (s.uniform1i(this.addr, i), (n[0] = i)),
		t.setTexture3D(e || Gu, i);
}
function ex(s, e, t) {
	const n = this.cache,
		i = t.allocateTextureUnit();
	n[0] !== i && (s.uniform1i(this.addr, i), (n[0] = i)),
		t.safeSetTextureCube(e || ku, i);
}
function tx(s, e, t) {
	const n = this.cache,
		i = t.allocateTextureUnit();
	n[0] !== i && (s.uniform1i(this.addr, i), (n[0] = i)),
		t.setTexture2DArray(e || Hu, i);
}
function nx(s) {
	switch (s) {
		case 5126:
			return Ng;
		case 35664:
			return Og;
		case 35665:
			return Ug;
		case 35666:
			return Hg;
		case 35674:
			return Gg;
		case 35675:
			return kg;
		case 35676:
			return Vg;
		case 5124:
		case 35670:
			return Wg;
		case 35667:
		case 35671:
			return qg;
		case 35668:
		case 35672:
			return Xg;
		case 35669:
		case 35673:
			return Yg;
		case 5125:
			return Zg;
		case 36294:
			return Jg;
		case 36295:
			return jg;
		case 36296:
			return $g;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682:
			return Kg;
		case 35679:
		case 36299:
		case 36307:
			return Qg;
		case 35680:
		case 36300:
		case 36308:
		case 36293:
			return ex;
		case 36289:
		case 36303:
		case 36311:
		case 36292:
			return tx;
	}
}
function ix(s, e) {
	s.uniform1fv(this.addr, e);
}
function rx(s, e) {
	const t = pr(e, this.size, 2);
	s.uniform2fv(this.addr, t);
}
function sx(s, e) {
	const t = pr(e, this.size, 3);
	s.uniform3fv(this.addr, t);
}
function ox(s, e) {
	const t = pr(e, this.size, 4);
	s.uniform4fv(this.addr, t);
}
function ax(s, e) {
	const t = pr(e, this.size, 4);
	s.uniformMatrix2fv(this.addr, !1, t);
}
function lx(s, e) {
	const t = pr(e, this.size, 9);
	s.uniformMatrix3fv(this.addr, !1, t);
}
function cx(s, e) {
	const t = pr(e, this.size, 16);
	s.uniformMatrix4fv(this.addr, !1, t);
}
function hx(s, e) {
	s.uniform1iv(this.addr, e);
}
function ux(s, e) {
	s.uniform2iv(this.addr, e);
}
function dx(s, e) {
	s.uniform3iv(this.addr, e);
}
function fx(s, e) {
	s.uniform4iv(this.addr, e);
}
function px(s, e) {
	s.uniform1uiv(this.addr, e);
}
function mx(s, e) {
	s.uniform2uiv(this.addr, e);
}
function gx(s, e) {
	s.uniform3uiv(this.addr, e);
}
function xx(s, e) {
	s.uniform4uiv(this.addr, e);
}
function yx(s, e, t) {
	const n = e.length,
		i = So(t, n);
	s.uniform1iv(this.addr, i);
	for (let r = 0; r !== n; ++r) t.safeSetTexture2D(e[r] || Uu, i[r]);
}
function vx(s, e, t) {
	const n = e.length,
		i = So(t, n);
	s.uniform1iv(this.addr, i);
	for (let r = 0; r !== n; ++r) t.setTexture3D(e[r] || Gu, i[r]);
}
function _x(s, e, t) {
	const n = e.length,
		i = So(t, n);
	s.uniform1iv(this.addr, i);
	for (let r = 0; r !== n; ++r) t.safeSetTextureCube(e[r] || ku, i[r]);
}
function bx(s, e, t) {
	const n = e.length,
		i = So(t, n);
	s.uniform1iv(this.addr, i);
	for (let r = 0; r !== n; ++r) t.setTexture2DArray(e[r] || Hu, i[r]);
}
function Mx(s) {
	switch (s) {
		case 5126:
			return ix;
		case 35664:
			return rx;
		case 35665:
			return sx;
		case 35666:
			return ox;
		case 35674:
			return ax;
		case 35675:
			return lx;
		case 35676:
			return cx;
		case 5124:
		case 35670:
			return hx;
		case 35667:
		case 35671:
			return ux;
		case 35668:
		case 35672:
			return dx;
		case 35669:
		case 35673:
			return fx;
		case 5125:
			return px;
		case 36294:
			return mx;
		case 36295:
			return gx;
		case 36296:
			return xx;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682:
			return yx;
		case 35679:
		case 36299:
		case 36307:
			return vx;
		case 35680:
		case 36300:
		case 36308:
		case 36293:
			return _x;
		case 36289:
		case 36303:
		case 36311:
		case 36292:
			return bx;
	}
}
function wx(s, e, t) {
	(this.id = s),
		(this.addr = t),
		(this.cache = []),
		(this.setValue = nx(e.type));
}
function Vu(s, e, t) {
	(this.id = s),
		(this.addr = t),
		(this.cache = []),
		(this.size = e.size),
		(this.setValue = Mx(e.type));
}
Vu.prototype.updateCache = function (s) {
	const e = this.cache;
	s instanceof Float32Array &&
		e.length !== s.length &&
		(this.cache = new Float32Array(s.length)),
		Et(e, s);
};
function Wu(s) {
	(this.id = s), (this.seq = []), (this.map = {});
}
Wu.prototype.setValue = function (s, e, t) {
	const n = this.seq;
	for (let i = 0, r = n.length; i !== r; ++i) {
		const o = n[i];
		o.setValue(s, e[o.id], t);
	}
};
const ua = /(\w+)(\])?(\[|\.)?/g;
function bc(s, e) {
	s.seq.push(e), (s.map[e.id] = e);
}
function Sx(s, e, t) {
	const n = s.name,
		i = n.length;
	for (ua.lastIndex = 0; ; ) {
		const r = ua.exec(n),
			o = ua.lastIndex;
		let a = r[1];
		const l = r[2] === "]",
			c = r[3];
		if ((l && (a = a | 0), c === void 0 || (c === "[" && o + 2 === i))) {
			bc(t, c === void 0 ? new wx(a, s, e) : new Vu(a, s, e));
			break;
		} else {
			let u = t.map[a];
			u === void 0 && ((u = new Wu(a)), bc(t, u)), (t = u);
		}
	}
}
function Dn(s, e) {
	(this.seq = []), (this.map = {});
	const t = s.getProgramParameter(e, 35718);
	for (let n = 0; n < t; ++n) {
		const i = s.getActiveUniform(e, n),
			r = s.getUniformLocation(e, i.name);
		Sx(i, r, this);
	}
}
Dn.prototype.setValue = function (s, e, t, n) {
	const i = this.map[e];
	i !== void 0 && i.setValue(s, t, n);
};
Dn.prototype.setOptional = function (s, e, t) {
	const n = e[t];
	n !== void 0 && this.setValue(s, t, n);
};
Dn.upload = function (s, e, t, n) {
	for (let i = 0, r = e.length; i !== r; ++i) {
		const o = e[i],
			a = t[o.id];
		a.needsUpdate !== !1 && o.setValue(s, a.value, n);
	}
};
Dn.seqWithValue = function (s, e) {
	const t = [];
	for (let n = 0, i = s.length; n !== i; ++n) {
		const r = s[n];
		r.id in e && t.push(r);
	}
	return t;
};
function Mc(s, e, t) {
	const n = s.createShader(e);
	return s.shaderSource(n, t), s.compileShader(n), n;
}
let Tx = 0;
function Ex(s) {
	const e = s.split(`
`);
	for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
	return e.join(`
`);
}
function Ax(s) {
	switch (s) {
		case gn:
			return ["Linear", "( value )"];
		case $e:
			return ["sRGB", "( value )"];
		default:
			return (
				console.warn("THREE.WebGLProgram: Unsupported encoding:", s),
				["Linear", "( value )"]
			);
	}
}
function wc(s, e, t) {
	const n = s.getShaderParameter(e, 35713),
		i = s.getShaderInfoLog(e).trim();
	return n && i === ""
		? ""
		: t.toUpperCase() +
				`

` +
				i +
				`

` +
				Ex(s.getShaderSource(e));
}
function Cx(s, e) {
	const t = Ax(e);
	return "vec4 " + s + "( vec4 value ) { return LinearTo" + t[0] + t[1] + "; }";
}
function Rx(s, e) {
	let t;
	switch (e) {
		case $h:
			t = "Linear";
			break;
		case Kh:
			t = "Reinhard";
			break;
		case Qh:
			t = "OptimizedCineon";
			break;
		case ll:
			t = "ACESFilmic";
			break;
		case eu:
			t = "Custom";
			break;
		default:
			console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e),
				(t = "Linear");
	}
	return (
		"vec3 " + s + "( vec3 color ) { return " + t + "ToneMapping( color ); }"
	);
}
function Lx(s) {
	return [
		s.extensionDerivatives ||
		s.envMapCubeUV ||
		s.bumpMap ||
		s.tangentSpaceNormalMap ||
		s.clearcoatNormalMap ||
		s.flatShading ||
		s.shaderID === "physical"
			? "#extension GL_OES_standard_derivatives : enable"
			: "",
		(s.extensionFragDepth || s.logarithmicDepthBuffer) &&
		s.rendererExtensionFragDepth
			? "#extension GL_EXT_frag_depth : enable"
			: "",
		s.extensionDrawBuffers && s.rendererExtensionDrawBuffers
			? "#extension GL_EXT_draw_buffers : require"
			: "",
		(s.extensionShaderTextureLOD || s.envMap || s.transmission) &&
		s.rendererExtensionShaderTextureLod
			? "#extension GL_EXT_shader_texture_lod : enable"
			: ""
	].filter(Cr).join(`
`);
}
function Px(s) {
	const e = [];
	for (const t in s) {
		const n = s[t];
		n !== !1 && e.push("#define " + t + " " + n);
	}
	return e.join(`
`);
}
function Dx(s, e) {
	const t = {},
		n = s.getProgramParameter(e, 35721);
	for (let i = 0; i < n; i++) {
		const r = s.getActiveAttrib(e, i),
			o = r.name;
		let a = 1;
		r.type === 35674 && (a = 2),
			r.type === 35675 && (a = 3),
			r.type === 35676 && (a = 4),
			(t[o] = {
				type: r.type,
				location: s.getAttribLocation(e, o),
				locationSize: a
			});
	}
	return t;
}
function Cr(s) {
	return s !== "";
}
function Sc(s, e) {
	return s
		.replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
		.replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
		.replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
		.replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
		.replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
		.replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
		.replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
		.replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Tc(s, e) {
	return s
		.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
		.replace(
			/UNION_CLIPPING_PLANES/g,
			e.numClippingPlanes - e.numClipIntersection
		);
}
const Ix = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ka(s) {
	return s.replace(Ix, Fx);
}
function Fx(s, e) {
	const t = Ie[e];
	if (t === void 0) throw new Error("Can not resolve #include <" + e + ">");
	return Ka(t);
}
const Bx = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
	zx = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Ec(s) {
	return s.replace(zx, qu).replace(Bx, Nx);
}
function Nx(s, e, t, n) {
	return (
		console.warn(
			"WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."
		),
		qu(s, e, t, n)
	);
}
function qu(s, e, t, n) {
	let i = "";
	for (let r = parseInt(e); r < parseInt(t); r++)
		i += n
			.replace(/\[\s*i\s*\]/g, "[ " + r + " ]")
			.replace(/UNROLLED_LOOP_INDEX/g, r);
	return i;
}
function Ac(s) {
	let e =
		"precision " +
		s.precision +
		` float;
precision ` +
		s.precision +
		" int;";
	return (
		s.precision === "highp"
			? (e += `
#define HIGH_PRECISION`)
			: s.precision === "mediump"
			? (e += `
#define MEDIUM_PRECISION`)
			: s.precision === "lowp" &&
			  (e += `
#define LOW_PRECISION`),
		e
	);
}
function Ox(s) {
	let e = "SHADOWMAP_TYPE_BASIC";
	return (
		s.shadowMapType === rl
			? (e = "SHADOWMAP_TYPE_PCF")
			: s.shadowMapType === Rh
			? (e = "SHADOWMAP_TYPE_PCF_SOFT")
			: s.shadowMapType === qi && (e = "SHADOWMAP_TYPE_VSM"),
		e
	);
}
function Ux(s) {
	let e = "ENVMAP_TYPE_CUBE";
	if (s.envMap)
		switch (s.envMapMode) {
			case mi:
			case gi:
				e = "ENVMAP_TYPE_CUBE";
				break;
			case ur:
			case $r:
				e = "ENVMAP_TYPE_CUBE_UV";
				break;
		}
	return e;
}
function Hx(s) {
	let e = "ENVMAP_MODE_REFLECTION";
	if (s.envMap)
		switch (s.envMapMode) {
			case gi:
			case $r:
				e = "ENVMAP_MODE_REFRACTION";
				break;
		}
	return e;
}
function Gx(s) {
	let e = "ENVMAP_BLENDING_NONE";
	if (s.envMap)
		switch (s.combine) {
			case jr:
				e = "ENVMAP_BLENDING_MULTIPLY";
				break;
			case Jh:
				e = "ENVMAP_BLENDING_MIX";
				break;
			case jh:
				e = "ENVMAP_BLENDING_ADD";
				break;
		}
	return e;
}
function kx(s, e, t, n) {
	const i = s.getContext(),
		r = t.defines;
	let o = t.vertexShader,
		a = t.fragmentShader;
	const l = Ox(t),
		c = Ux(t),
		h = Hx(t),
		u = Gx(t),
		d = t.isWebGL2 ? "" : Lx(t),
		f = Px(r),
		m = i.createProgram();
	let x,
		y,
		g = t.glslVersion
			? "#version " +
			  t.glslVersion +
			  `
`
			: "";
	t.isRawShaderMaterial
		? ((x = [f].filter(Cr).join(`
`)),
		  x.length > 0 &&
				(x += `
`),
		  (y = [d, f].filter(Cr).join(`
`)),
		  y.length > 0 &&
				(y += `
`))
		: ((x = [
				Ac(t),
				"#define SHADER_NAME " + t.shaderName,
				f,
				t.instancing ? "#define USE_INSTANCING" : "",
				t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
				t.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
				"#define MAX_BONES " + t.maxBones,
				t.useFog && t.fog ? "#define USE_FOG" : "",
				t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
				t.map ? "#define USE_MAP" : "",
				t.envMap ? "#define USE_ENVMAP" : "",
				t.envMap ? "#define " + h : "",
				t.lightMap ? "#define USE_LIGHTMAP" : "",
				t.aoMap ? "#define USE_AOMAP" : "",
				t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
				t.bumpMap ? "#define USE_BUMPMAP" : "",
				t.normalMap ? "#define USE_NORMALMAP" : "",
				t.normalMap && t.objectSpaceNormalMap
					? "#define OBJECTSPACE_NORMALMAP"
					: "",
				t.normalMap && t.tangentSpaceNormalMap
					? "#define TANGENTSPACE_NORMALMAP"
					: "",
				t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
				t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
				t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
				t.displacementMap && t.supportsVertexTextures
					? "#define USE_DISPLACEMENTMAP"
					: "",
				t.specularMap ? "#define USE_SPECULARMAP" : "",
				t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "",
				t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "",
				t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
				t.metalnessMap ? "#define USE_METALNESSMAP" : "",
				t.alphaMap ? "#define USE_ALPHAMAP" : "",
				t.transmission ? "#define USE_TRANSMISSION" : "",
				t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
				t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
				t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "",
				t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "",
				t.vertexTangents ? "#define USE_TANGENT" : "",
				t.vertexColors ? "#define USE_COLOR" : "",
				t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
				t.vertexUvs ? "#define USE_UV" : "",
				t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
				t.flatShading ? "#define FLAT_SHADED" : "",
				t.skinning ? "#define USE_SKINNING" : "",
				t.useVertexTexture ? "#define BONE_TEXTURE" : "",
				t.morphTargets ? "#define USE_MORPHTARGETS" : "",
				t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
				t.morphTargets && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
				t.morphTargets && t.isWebGL2
					? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount
					: "",
				t.doubleSided ? "#define DOUBLE_SIDED" : "",
				t.flipSided ? "#define FLIP_SIDED" : "",
				t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
				t.shadowMapEnabled ? "#define " + l : "",
				t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
				t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
				t.logarithmicDepthBuffer && t.rendererExtensionFragDepth
					? "#define USE_LOGDEPTHBUF_EXT"
					: "",
				"uniform mat4 modelMatrix;",
				"uniform mat4 modelViewMatrix;",
				"uniform mat4 projectionMatrix;",
				"uniform mat4 viewMatrix;",
				"uniform mat3 normalMatrix;",
				"uniform vec3 cameraPosition;",
				"uniform bool isOrthographic;",
				"#ifdef USE_INSTANCING",
				"	attribute mat4 instanceMatrix;",
				"#endif",
				"#ifdef USE_INSTANCING_COLOR",
				"	attribute vec3 instanceColor;",
				"#endif",
				"attribute vec3 position;",
				"attribute vec3 normal;",
				"attribute vec2 uv;",
				"#ifdef USE_TANGENT",
				"	attribute vec4 tangent;",
				"#endif",
				"#if defined( USE_COLOR_ALPHA )",
				"	attribute vec4 color;",
				"#elif defined( USE_COLOR )",
				"	attribute vec3 color;",
				"#endif",
				"#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
				"	attribute vec3 morphTarget0;",
				"	attribute vec3 morphTarget1;",
				"	attribute vec3 morphTarget2;",
				"	attribute vec3 morphTarget3;",
				"	#ifdef USE_MORPHNORMALS",
				"		attribute vec3 morphNormal0;",
				"		attribute vec3 morphNormal1;",
				"		attribute vec3 morphNormal2;",
				"		attribute vec3 morphNormal3;",
				"	#else",
				"		attribute vec3 morphTarget4;",
				"		attribute vec3 morphTarget5;",
				"		attribute vec3 morphTarget6;",
				"		attribute vec3 morphTarget7;",
				"	#endif",
				"#endif",
				"#ifdef USE_SKINNING",
				"	attribute vec4 skinIndex;",
				"	attribute vec4 skinWeight;",
				"#endif",
				`
`
		  ].filter(Cr).join(`
`)),
		  (y = [
				d,
				Ac(t),
				"#define SHADER_NAME " + t.shaderName,
				f,
				t.useFog && t.fog ? "#define USE_FOG" : "",
				t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
				t.map ? "#define USE_MAP" : "",
				t.matcap ? "#define USE_MATCAP" : "",
				t.envMap ? "#define USE_ENVMAP" : "",
				t.envMap ? "#define " + c : "",
				t.envMap ? "#define " + h : "",
				t.envMap ? "#define " + u : "",
				t.lightMap ? "#define USE_LIGHTMAP" : "",
				t.aoMap ? "#define USE_AOMAP" : "",
				t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
				t.bumpMap ? "#define USE_BUMPMAP" : "",
				t.normalMap ? "#define USE_NORMALMAP" : "",
				t.normalMap && t.objectSpaceNormalMap
					? "#define OBJECTSPACE_NORMALMAP"
					: "",
				t.normalMap && t.tangentSpaceNormalMap
					? "#define TANGENTSPACE_NORMALMAP"
					: "",
				t.clearcoat ? "#define USE_CLEARCOAT" : "",
				t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
				t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
				t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
				t.specularMap ? "#define USE_SPECULARMAP" : "",
				t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "",
				t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "",
				t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
				t.metalnessMap ? "#define USE_METALNESSMAP" : "",
				t.alphaMap ? "#define USE_ALPHAMAP" : "",
				t.alphaTest ? "#define USE_ALPHATEST" : "",
				t.sheen ? "#define USE_SHEEN" : "",
				t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "",
				t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "",
				t.transmission ? "#define USE_TRANSMISSION" : "",
				t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
				t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
				t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
				t.vertexTangents ? "#define USE_TANGENT" : "",
				t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
				t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
				t.vertexUvs ? "#define USE_UV" : "",
				t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
				t.gradientMap ? "#define USE_GRADIENTMAP" : "",
				t.flatShading ? "#define FLAT_SHADED" : "",
				t.doubleSided ? "#define DOUBLE_SIDED" : "",
				t.flipSided ? "#define FLIP_SIDED" : "",
				t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
				t.shadowMapEnabled ? "#define " + l : "",
				t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
				t.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
				t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
				t.logarithmicDepthBuffer && t.rendererExtensionFragDepth
					? "#define USE_LOGDEPTHBUF_EXT"
					: "",
				(t.extensionShaderTextureLOD || t.envMap) &&
				t.rendererExtensionShaderTextureLod
					? "#define TEXTURE_LOD_EXT"
					: "",
				"uniform mat4 viewMatrix;",
				"uniform vec3 cameraPosition;",
				"uniform bool isOrthographic;",
				t.toneMapping !== pn ? "#define TONE_MAPPING" : "",
				t.toneMapping !== pn ? Ie.tonemapping_pars_fragment : "",
				t.toneMapping !== pn ? Rx("toneMapping", t.toneMapping) : "",
				t.dithering ? "#define DITHERING" : "",
				t.transparent ? "" : "#define OPAQUE",
				Ie.encodings_pars_fragment,
				Cx("linearToOutputTexel", t.outputEncoding),
				t.depthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
				`
`
		  ].filter(Cr).join(`
`))),
		(o = Ka(o)),
		(o = Sc(o, t)),
		(o = Tc(o, t)),
		(a = Ka(a)),
		(a = Sc(a, t)),
		(a = Tc(a, t)),
		(o = Ec(o)),
		(a = Ec(a)),
		t.isWebGL2 &&
			t.isRawShaderMaterial !== !0 &&
			((g = `#version 300 es
`),
			(x =
				[
					"precision mediump sampler2DArray;",
					"#define attribute in",
					"#define varying out",
					"#define texture2D texture"
				].join(`
`) +
				`
` +
				x),
			(y =
				[
					"#define varying in",
					t.glslVersion === Ja
						? ""
						: "layout(location = 0) out highp vec4 pc_fragColor;",
					t.glslVersion === Ja ? "" : "#define gl_FragColor pc_fragColor",
					"#define gl_FragDepthEXT gl_FragDepth",
					"#define texture2D texture",
					"#define textureCube texture",
					"#define texture2DProj textureProj",
					"#define texture2DLodEXT textureLod",
					"#define texture2DProjLodEXT textureProjLod",
					"#define textureCubeLodEXT textureLod",
					"#define texture2DGradEXT textureGrad",
					"#define texture2DProjGradEXT textureProjGrad",
					"#define textureCubeGradEXT textureGrad"
				].join(`
`) +
				`
` +
				y));
	const p = g + x + o,
		M = g + y + a,
		v = Mc(i, 35633, p),
		_ = Mc(i, 35632, M);
	if (
		(i.attachShader(m, v),
		i.attachShader(m, _),
		t.index0AttributeName !== void 0
			? i.bindAttribLocation(m, 0, t.index0AttributeName)
			: t.morphTargets === !0 && i.bindAttribLocation(m, 0, "position"),
		i.linkProgram(m),
		s.debug.checkShaderErrors)
	) {
		const D = i.getProgramInfoLog(m).trim(),
			H = i.getShaderInfoLog(v).trim(),
			I = i.getShaderInfoLog(_).trim();
		let b = !0,
			L = !0;
		if (i.getProgramParameter(m, 35714) === !1) {
			b = !1;
			const F = wc(i, v, "vertex"),
				B = wc(i, _, "fragment");
			console.error(
				"THREE.WebGLProgram: Shader Error " +
					i.getError() +
					" - VALIDATE_STATUS " +
					i.getProgramParameter(m, 35715) +
					`

Program Info Log: ` +
					D +
					`
` +
					F +
					`
` +
					B
			);
		} else
			D !== ""
				? console.warn("THREE.WebGLProgram: Program Info Log:", D)
				: (H === "" || I === "") && (L = !1);
		L &&
			(this.diagnostics = {
				runnable: b,
				programLog: D,
				vertexShader: { log: H, prefix: x },
				fragmentShader: { log: I, prefix: y }
			});
	}
	i.deleteShader(v), i.deleteShader(_);
	let E;
	this.getUniforms = function () {
		return E === void 0 && (E = new Dn(i, m)), E;
	};
	let A;
	return (
		(this.getAttributes = function () {
			return A === void 0 && (A = Dx(i, m)), A;
		}),
		(this.destroy = function () {
			n.releaseStatesOfProgram(this), i.deleteProgram(m), (this.program = void 0);
		}),
		(this.name = t.shaderName),
		(this.id = Tx++),
		(this.cacheKey = e),
		(this.usedTimes = 1),
		(this.program = m),
		(this.vertexShader = v),
		(this.fragmentShader = _),
		this
	);
}
let Vx = 0;
class Wx {
	constructor() {
		(this.shaderCache = new Map()), (this.materialCache = new Map());
	}
	update(e) {
		const t = e.vertexShader,
			n = e.fragmentShader,
			i = this._getShaderStage(t),
			r = this._getShaderStage(n),
			o = this._getShaderCacheForMaterial(e);
		return (
			o.has(i) === !1 && (o.add(i), i.usedTimes++),
			o.has(r) === !1 && (o.add(r), r.usedTimes++),
			this
		);
	}
	remove(e) {
		const t = this.materialCache.get(e);
		for (const n of t)
			n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderID(e) {
		return this._getShaderStage(e.vertexShader).id;
	}
	getFragmentShaderID(e) {
		return this._getShaderStage(e.fragmentShader).id;
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		const t = this.materialCache;
		return t.has(e) === !1 && t.set(e, new Set()), t.get(e);
	}
	_getShaderStage(e) {
		const t = this.shaderCache;
		if (t.has(e) === !1) {
			const n = new qx();
			t.set(e, n);
		}
		return t.get(e);
	}
}
class qx {
	constructor() {
		(this.id = Vx++), (this.usedTimes = 0);
	}
}
function Xx(s, e, t, n, i, r, o) {
	const a = new yo(),
		l = new Wx(),
		c = [],
		h = i.isWebGL2,
		u = i.logarithmicDepthBuffer,
		d = i.floatVertexTextures,
		f = i.maxVertexUniforms,
		m = i.vertexTextures;
	let x = i.precision;
	const y = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distanceRGBA",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function g(b) {
		const F = b.skeleton.bones;
		if (d) return 1024;
		{
			const O = Math.floor((f - 20) / 4),
				N = Math.min(O, F.length);
			return N < F.length
				? (console.warn(
						"THREE.WebGLRenderer: Skeleton has " +
							F.length +
							" bones. This GPU supports " +
							N +
							"."
				  ),
				  0)
				: N;
		}
	}
	function p(b, L, F, B, O) {
		const N = B.fog,
			X = b.isMeshStandardMaterial ? B.environment : null,
			Q = (b.isMeshStandardMaterial ? t : e).get(b.envMap || X),
			ae = y[b.type],
			Z = O.isSkinnedMesh ? g(O) : 0;
		b.precision !== null &&
			((x = i.getMaxPrecision(b.precision)),
			x !== b.precision &&
				console.warn(
					"THREE.WebGLProgram.getParameters:",
					b.precision,
					"not supported, using",
					x,
					"instead."
				));
		let K, le, ge, _e;
		if (ae) {
			const ue = Vt[ae];
			(K = ue.vertexShader), (le = ue.fragmentShader);
		} else
			(K = b.vertexShader),
				(le = b.fragmentShader),
				l.update(b),
				(ge = l.getVertexShaderID(b)),
				(_e = l.getFragmentShaderID(b));
		const V = s.getRenderTarget(),
			Ne = b.alphaTest > 0,
			ve = b.clearcoat > 0;
		return {
			isWebGL2: h,
			shaderID: ae,
			shaderName: b.type,
			vertexShader: K,
			fragmentShader: le,
			defines: b.defines,
			customVertexShaderID: ge,
			customFragmentShaderID: _e,
			isRawShaderMaterial: b.isRawShaderMaterial === !0,
			glslVersion: b.glslVersion,
			precision: x,
			instancing: O.isInstancedMesh === !0,
			instancingColor: O.isInstancedMesh === !0 && O.instanceColor !== null,
			supportsVertexTextures: m,
			outputEncoding:
				V === null
					? s.outputEncoding
					: V.isXRRenderTarget === !0
					? V.texture.encoding
					: gn,
			map: !!b.map,
			matcap: !!b.matcap,
			envMap: !!Q,
			envMapMode: Q && Q.mapping,
			envMapCubeUV: !!Q && (Q.mapping === ur || Q.mapping === $r),
			lightMap: !!b.lightMap,
			aoMap: !!b.aoMap,
			emissiveMap: !!b.emissiveMap,
			bumpMap: !!b.bumpMap,
			normalMap: !!b.normalMap,
			objectSpaceNormalMap: b.normalMapType === Mu,
			tangentSpaceNormalMap: b.normalMapType === yi,
			decodeVideoTexture:
				!!b.map && b.map.isVideoTexture === !0 && b.map.encoding === $e,
			clearcoat: ve,
			clearcoatMap: ve && !!b.clearcoatMap,
			clearcoatRoughnessMap: ve && !!b.clearcoatRoughnessMap,
			clearcoatNormalMap: ve && !!b.clearcoatNormalMap,
			displacementMap: !!b.displacementMap,
			roughnessMap: !!b.roughnessMap,
			metalnessMap: !!b.metalnessMap,
			specularMap: !!b.specularMap,
			specularIntensityMap: !!b.specularIntensityMap,
			specularColorMap: !!b.specularColorMap,
			transparent: b.transparent,
			alphaMap: !!b.alphaMap,
			alphaTest: Ne,
			gradientMap: !!b.gradientMap,
			sheen: b.sheen > 0,
			sheenColorMap: !!b.sheenColorMap,
			sheenRoughnessMap: !!b.sheenRoughnessMap,
			transmission: b.transmission > 0,
			transmissionMap: !!b.transmissionMap,
			thicknessMap: !!b.thicknessMap,
			combine: b.combine,
			vertexTangents:
				!!b.normalMap && !!O.geometry && !!O.geometry.attributes.tangent,
			vertexColors: b.vertexColors,
			vertexAlphas:
				b.vertexColors === !0 &&
				!!O.geometry &&
				!!O.geometry.attributes.color &&
				O.geometry.attributes.color.itemSize === 4,
			vertexUvs:
				!!b.map ||
				!!b.bumpMap ||
				!!b.normalMap ||
				!!b.specularMap ||
				!!b.alphaMap ||
				!!b.emissiveMap ||
				!!b.roughnessMap ||
				!!b.metalnessMap ||
				!!b.clearcoatMap ||
				!!b.clearcoatRoughnessMap ||
				!!b.clearcoatNormalMap ||
				!!b.displacementMap ||
				!!b.transmissionMap ||
				!!b.thicknessMap ||
				!!b.specularIntensityMap ||
				!!b.specularColorMap ||
				!!b.sheenColorMap ||
				!!b.sheenRoughnessMap,
			uvsVertexOnly:
				!(
					!!b.map ||
					!!b.bumpMap ||
					!!b.normalMap ||
					!!b.specularMap ||
					!!b.alphaMap ||
					!!b.emissiveMap ||
					!!b.roughnessMap ||
					!!b.metalnessMap ||
					!!b.clearcoatNormalMap ||
					b.transmission > 0 ||
					!!b.transmissionMap ||
					!!b.thicknessMap ||
					!!b.specularIntensityMap ||
					!!b.specularColorMap ||
					b.sheen > 0 ||
					!!b.sheenColorMap ||
					!!b.sheenRoughnessMap
				) && !!b.displacementMap,
			fog: !!N,
			useFog: b.fog,
			fogExp2: N && N.isFogExp2,
			flatShading: !!b.flatShading,
			sizeAttenuation: b.sizeAttenuation,
			logarithmicDepthBuffer: u,
			skinning: O.isSkinnedMesh === !0 && Z > 0,
			maxBones: Z,
			useVertexTexture: d,
			morphTargets: !!O.geometry && !!O.geometry.morphAttributes.position,
			morphNormals: !!O.geometry && !!O.geometry.morphAttributes.normal,
			morphTargetsCount:
				!!O.geometry && !!O.geometry.morphAttributes.position
					? O.geometry.morphAttributes.position.length
					: 0,
			numDirLights: L.directional.length,
			numPointLights: L.point.length,
			numSpotLights: L.spot.length,
			numRectAreaLights: L.rectArea.length,
			numHemiLights: L.hemi.length,
			numDirLightShadows: L.directionalShadowMap.length,
			numPointLightShadows: L.pointShadowMap.length,
			numSpotLightShadows: L.spotShadowMap.length,
			numClippingPlanes: o.numPlanes,
			numClipIntersection: o.numIntersection,
			dithering: b.dithering,
			shadowMapEnabled: s.shadowMap.enabled && F.length > 0,
			shadowMapType: s.shadowMap.type,
			toneMapping: b.toneMapped ? s.toneMapping : pn,
			physicallyCorrectLights: s.physicallyCorrectLights,
			premultipliedAlpha: b.premultipliedAlpha,
			doubleSided: b.side === In,
			flipSided: b.side === lt,
			depthPacking: b.depthPacking !== void 0 ? b.depthPacking : !1,
			index0AttributeName: b.index0AttributeName,
			extensionDerivatives: b.extensions && b.extensions.derivatives,
			extensionFragDepth: b.extensions && b.extensions.fragDepth,
			extensionDrawBuffers: b.extensions && b.extensions.drawBuffers,
			extensionShaderTextureLOD: b.extensions && b.extensions.shaderTextureLOD,
			rendererExtensionFragDepth: h || n.has("EXT_frag_depth"),
			rendererExtensionDrawBuffers: h || n.has("WEBGL_draw_buffers"),
			rendererExtensionShaderTextureLod: h || n.has("EXT_shader_texture_lod"),
			customProgramCacheKey: b.customProgramCacheKey()
		};
	}
	function M(b) {
		const L = [];
		if (
			(b.shaderID
				? L.push(b.shaderID)
				: (L.push(b.customVertexShaderID), L.push(b.customFragmentShaderID)),
			b.defines !== void 0)
		)
			for (const F in b.defines) L.push(F), L.push(b.defines[F]);
		return (
			b.isRawShaderMaterial === !1 && (v(L, b), _(L, b), L.push(s.outputEncoding)),
			L.push(b.customProgramCacheKey),
			L.join()
		);
	}
	function v(b, L) {
		b.push(L.precision),
			b.push(L.outputEncoding),
			b.push(L.envMapMode),
			b.push(L.combine),
			b.push(L.vertexUvs),
			b.push(L.fogExp2),
			b.push(L.sizeAttenuation),
			b.push(L.maxBones),
			b.push(L.morphTargetsCount),
			b.push(L.numDirLights),
			b.push(L.numPointLights),
			b.push(L.numSpotLights),
			b.push(L.numHemiLights),
			b.push(L.numRectAreaLights),
			b.push(L.numDirLightShadows),
			b.push(L.numPointLightShadows),
			b.push(L.numSpotLightShadows),
			b.push(L.shadowMapType),
			b.push(L.toneMapping),
			b.push(L.numClippingPlanes),
			b.push(L.numClipIntersection);
	}
	function _(b, L) {
		a.disableAll(),
			L.isWebGL2 && a.enable(0),
			L.supportsVertexTextures && a.enable(1),
			L.instancing && a.enable(2),
			L.instancingColor && a.enable(3),
			L.map && a.enable(4),
			L.matcap && a.enable(5),
			L.envMap && a.enable(6),
			L.envMapCubeUV && a.enable(7),
			L.lightMap && a.enable(8),
			L.aoMap && a.enable(9),
			L.emissiveMap && a.enable(10),
			L.bumpMap && a.enable(11),
			L.normalMap && a.enable(12),
			L.objectSpaceNormalMap && a.enable(13),
			L.tangentSpaceNormalMap && a.enable(14),
			L.clearcoat && a.enable(15),
			L.clearcoatMap && a.enable(16),
			L.clearcoatRoughnessMap && a.enable(17),
			L.clearcoatNormalMap && a.enable(18),
			L.displacementMap && a.enable(19),
			L.specularMap && a.enable(20),
			L.roughnessMap && a.enable(21),
			L.metalnessMap && a.enable(22),
			L.gradientMap && a.enable(23),
			L.alphaMap && a.enable(24),
			L.alphaTest && a.enable(25),
			L.vertexColors && a.enable(26),
			L.vertexAlphas && a.enable(27),
			L.vertexUvs && a.enable(28),
			L.vertexTangents && a.enable(29),
			L.uvsVertexOnly && a.enable(30),
			L.fog && a.enable(31),
			b.push(a.mask),
			a.disableAll(),
			L.useFog && a.enable(0),
			L.flatShading && a.enable(1),
			L.logarithmicDepthBuffer && a.enable(2),
			L.skinning && a.enable(3),
			L.useVertexTexture && a.enable(4),
			L.morphTargets && a.enable(5),
			L.morphNormals && a.enable(6),
			L.premultipliedAlpha && a.enable(7),
			L.shadowMapEnabled && a.enable(8),
			L.physicallyCorrectLights && a.enable(9),
			L.doubleSided && a.enable(10),
			L.flipSided && a.enable(11),
			L.depthPacking && a.enable(12),
			L.dithering && a.enable(13),
			L.specularIntensityMap && a.enable(14),
			L.specularColorMap && a.enable(15),
			L.transmission && a.enable(16),
			L.transmissionMap && a.enable(17),
			L.thicknessMap && a.enable(18),
			L.sheen && a.enable(19),
			L.sheenColorMap && a.enable(20),
			L.sheenRoughnessMap && a.enable(21),
			L.decodeVideoTexture && a.enable(22),
			L.transparent && a.enable(23),
			b.push(a.mask);
	}
	function E(b) {
		const L = y[b.type];
		let F;
		if (L) {
			const B = Vt[L];
			F = ci.clone(B.uniforms);
		} else F = b.uniforms;
		return F;
	}
	function A(b, L) {
		let F;
		for (let B = 0, O = c.length; B < O; B++) {
			const N = c[B];
			if (N.cacheKey === L) {
				(F = N), ++F.usedTimes;
				break;
			}
		}
		return F === void 0 && ((F = new kx(s, L, b, r)), c.push(F)), F;
	}
	function D(b) {
		if (--b.usedTimes === 0) {
			const L = c.indexOf(b);
			(c[L] = c[c.length - 1]), c.pop(), b.destroy();
		}
	}
	function H(b) {
		l.remove(b);
	}
	function I() {
		l.dispose();
	}
	return {
		getParameters: p,
		getProgramCacheKey: M,
		getUniforms: E,
		acquireProgram: A,
		releaseProgram: D,
		releaseShaderCache: H,
		programs: c,
		dispose: I
	};
}
function Yx() {
	let s = new WeakMap();
	function e(r) {
		let o = s.get(r);
		return o === void 0 && ((o = {}), s.set(r, o)), o;
	}
	function t(r) {
		s.delete(r);
	}
	function n(r, o, a) {
		s.get(r)[o] = a;
	}
	function i() {
		s = new WeakMap();
	}
	return { get: e, remove: t, update: n, dispose: i };
}
function Zx(s, e) {
	return s.groupOrder !== e.groupOrder
		? s.groupOrder - e.groupOrder
		: s.renderOrder !== e.renderOrder
		? s.renderOrder - e.renderOrder
		: s.material.id !== e.material.id
		? s.material.id - e.material.id
		: s.z !== e.z
		? s.z - e.z
		: s.id - e.id;
}
function Cc(s, e) {
	return s.groupOrder !== e.groupOrder
		? s.groupOrder - e.groupOrder
		: s.renderOrder !== e.renderOrder
		? s.renderOrder - e.renderOrder
		: s.z !== e.z
		? e.z - s.z
		: s.id - e.id;
}
function Rc() {
	const s = [];
	let e = 0;
	const t = [],
		n = [],
		i = [];
	function r() {
		(e = 0), (t.length = 0), (n.length = 0), (i.length = 0);
	}
	function o(u, d, f, m, x, y) {
		let g = s[e];
		return (
			g === void 0
				? ((g = {
						id: u.id,
						object: u,
						geometry: d,
						material: f,
						groupOrder: m,
						renderOrder: u.renderOrder,
						z: x,
						group: y
				  }),
				  (s[e] = g))
				: ((g.id = u.id),
				  (g.object = u),
				  (g.geometry = d),
				  (g.material = f),
				  (g.groupOrder = m),
				  (g.renderOrder = u.renderOrder),
				  (g.z = x),
				  (g.group = y)),
			e++,
			g
		);
	}
	function a(u, d, f, m, x, y) {
		const g = o(u, d, f, m, x, y);
		f.transmission > 0 ? n.push(g) : f.transparent === !0 ? i.push(g) : t.push(g);
	}
	function l(u, d, f, m, x, y) {
		const g = o(u, d, f, m, x, y);
		f.transmission > 0
			? n.unshift(g)
			: f.transparent === !0
			? i.unshift(g)
			: t.unshift(g);
	}
	function c(u, d) {
		t.length > 1 && t.sort(u || Zx),
			n.length > 1 && n.sort(d || Cc),
			i.length > 1 && i.sort(d || Cc);
	}
	function h() {
		for (let u = e, d = s.length; u < d; u++) {
			const f = s[u];
			if (f.id === null) break;
			(f.id = null),
				(f.object = null),
				(f.geometry = null),
				(f.material = null),
				(f.group = null);
		}
	}
	return {
		opaque: t,
		transmissive: n,
		transparent: i,
		init: r,
		push: a,
		unshift: l,
		finish: h,
		sort: c
	};
}
function Jx() {
	let s = new WeakMap();
	function e(n, i) {
		let r;
		return (
			s.has(n) === !1
				? ((r = new Rc()), s.set(n, [r]))
				: i >= s.get(n).length
				? ((r = new Rc()), s.get(n).push(r))
				: (r = s.get(n)[i]),
			r
		);
	}
	function t() {
		s = new WeakMap();
	}
	return { get: e, dispose: t };
}
function jx() {
	const s = {};
	return {
		get: function (e) {
			if (s[e.id] !== void 0) return s[e.id];
			let t;
			switch (e.type) {
				case "DirectionalLight":
					t = { direction: new w(), color: new re() };
					break;
				case "SpotLight":
					t = {
						position: new w(),
						direction: new w(),
						color: new re(),
						distance: 0,
						coneCos: 0,
						penumbraCos: 0,
						decay: 0
					};
					break;
				case "PointLight":
					t = { position: new w(), color: new re(), distance: 0, decay: 0 };
					break;
				case "HemisphereLight":
					t = { direction: new w(), skyColor: new re(), groundColor: new re() };
					break;
				case "RectAreaLight":
					t = {
						color: new re(),
						position: new w(),
						halfWidth: new w(),
						halfHeight: new w()
					};
					break;
			}
			return (s[e.id] = t), t;
		}
	};
}
function $x() {
	const s = {};
	return {
		get: function (e) {
			if (s[e.id] !== void 0) return s[e.id];
			let t;
			switch (e.type) {
				case "DirectionalLight":
					t = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new G()
					};
					break;
				case "SpotLight":
					t = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new G()
					};
					break;
				case "PointLight":
					t = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new G(),
						shadowCameraNear: 1,
						shadowCameraFar: 1e3
					};
					break;
			}
			return (s[e.id] = t), t;
		}
	};
}
let Kx = 0;
function Qx(s, e) {
	return (e.castShadow ? 1 : 0) - (s.castShadow ? 1 : 0);
}
function e0(s, e) {
	const t = new jx(),
		n = $x(),
		i = {
			version: 0,
			hash: {
				directionalLength: -1,
				pointLength: -1,
				spotLength: -1,
				rectAreaLength: -1,
				hemiLength: -1,
				numDirectionalShadows: -1,
				numPointShadows: -1,
				numSpotShadows: -1
			},
			ambient: [0, 0, 0],
			probe: [],
			directional: [],
			directionalShadow: [],
			directionalShadowMap: [],
			directionalShadowMatrix: [],
			spot: [],
			spotShadow: [],
			spotShadowMap: [],
			spotShadowMatrix: [],
			rectArea: [],
			rectAreaLTC1: null,
			rectAreaLTC2: null,
			point: [],
			pointShadow: [],
			pointShadowMap: [],
			pointShadowMatrix: [],
			hemi: []
		};
	for (let h = 0; h < 9; h++) i.probe.push(new w());
	const r = new w(),
		o = new pe(),
		a = new pe();
	function l(h, u) {
		let d = 0,
			f = 0,
			m = 0;
		for (let H = 0; H < 9; H++) i.probe[H].set(0, 0, 0);
		let x = 0,
			y = 0,
			g = 0,
			p = 0,
			M = 0,
			v = 0,
			_ = 0,
			E = 0;
		h.sort(Qx);
		const A = u !== !0 ? Math.PI : 1;
		for (let H = 0, I = h.length; H < I; H++) {
			const b = h[H],
				L = b.color,
				F = b.intensity,
				B = b.distance,
				O = b.shadow && b.shadow.map ? b.shadow.map.texture : null;
			if (b.isAmbientLight)
				(d += L.r * F * A), (f += L.g * F * A), (m += L.b * F * A);
			else if (b.isLightProbe)
				for (let N = 0; N < 9; N++)
					i.probe[N].addScaledVector(b.sh.coefficients[N], F);
			else if (b.isDirectionalLight) {
				const N = t.get(b);
				if ((N.color.copy(b.color).multiplyScalar(b.intensity * A), b.castShadow)) {
					const X = b.shadow,
						Q = n.get(b);
					(Q.shadowBias = X.bias),
						(Q.shadowNormalBias = X.normalBias),
						(Q.shadowRadius = X.radius),
						(Q.shadowMapSize = X.mapSize),
						(i.directionalShadow[x] = Q),
						(i.directionalShadowMap[x] = O),
						(i.directionalShadowMatrix[x] = b.shadow.matrix),
						v++;
				}
				(i.directional[x] = N), x++;
			} else if (b.isSpotLight) {
				const N = t.get(b);
				if (
					(N.position.setFromMatrixPosition(b.matrixWorld),
					N.color.copy(L).multiplyScalar(F * A),
					(N.distance = B),
					(N.coneCos = Math.cos(b.angle)),
					(N.penumbraCos = Math.cos(b.angle * (1 - b.penumbra))),
					(N.decay = b.decay),
					b.castShadow)
				) {
					const X = b.shadow,
						Q = n.get(b);
					(Q.shadowBias = X.bias),
						(Q.shadowNormalBias = X.normalBias),
						(Q.shadowRadius = X.radius),
						(Q.shadowMapSize = X.mapSize),
						(i.spotShadow[g] = Q),
						(i.spotShadowMap[g] = O),
						(i.spotShadowMatrix[g] = b.shadow.matrix),
						E++;
				}
				(i.spot[g] = N), g++;
			} else if (b.isRectAreaLight) {
				const N = t.get(b);
				N.color.copy(L).multiplyScalar(F),
					N.halfWidth.set(b.width * 0.5, 0, 0),
					N.halfHeight.set(0, b.height * 0.5, 0),
					(i.rectArea[p] = N),
					p++;
			} else if (b.isPointLight) {
				const N = t.get(b);
				if (
					(N.color.copy(b.color).multiplyScalar(b.intensity * A),
					(N.distance = b.distance),
					(N.decay = b.decay),
					b.castShadow)
				) {
					const X = b.shadow,
						Q = n.get(b);
					(Q.shadowBias = X.bias),
						(Q.shadowNormalBias = X.normalBias),
						(Q.shadowRadius = X.radius),
						(Q.shadowMapSize = X.mapSize),
						(Q.shadowCameraNear = X.camera.near),
						(Q.shadowCameraFar = X.camera.far),
						(i.pointShadow[y] = Q),
						(i.pointShadowMap[y] = O),
						(i.pointShadowMatrix[y] = b.shadow.matrix),
						_++;
				}
				(i.point[y] = N), y++;
			} else if (b.isHemisphereLight) {
				const N = t.get(b);
				N.skyColor.copy(b.color).multiplyScalar(F * A),
					N.groundColor.copy(b.groundColor).multiplyScalar(F * A),
					(i.hemi[M] = N),
					M++;
			}
		}
		p > 0 &&
			(e.isWebGL2 || s.has("OES_texture_float_linear") === !0
				? ((i.rectAreaLTC1 = se.LTC_FLOAT_1), (i.rectAreaLTC2 = se.LTC_FLOAT_2))
				: s.has("OES_texture_half_float_linear") === !0
				? ((i.rectAreaLTC1 = se.LTC_HALF_1), (i.rectAreaLTC2 = se.LTC_HALF_2))
				: console.error(
						"THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions."
				  )),
			(i.ambient[0] = d),
			(i.ambient[1] = f),
			(i.ambient[2] = m);
		const D = i.hash;
		(D.directionalLength !== x ||
			D.pointLength !== y ||
			D.spotLength !== g ||
			D.rectAreaLength !== p ||
			D.hemiLength !== M ||
			D.numDirectionalShadows !== v ||
			D.numPointShadows !== _ ||
			D.numSpotShadows !== E) &&
			((i.directional.length = x),
			(i.spot.length = g),
			(i.rectArea.length = p),
			(i.point.length = y),
			(i.hemi.length = M),
			(i.directionalShadow.length = v),
			(i.directionalShadowMap.length = v),
			(i.pointShadow.length = _),
			(i.pointShadowMap.length = _),
			(i.spotShadow.length = E),
			(i.spotShadowMap.length = E),
			(i.directionalShadowMatrix.length = v),
			(i.pointShadowMatrix.length = _),
			(i.spotShadowMatrix.length = E),
			(D.directionalLength = x),
			(D.pointLength = y),
			(D.spotLength = g),
			(D.rectAreaLength = p),
			(D.hemiLength = M),
			(D.numDirectionalShadows = v),
			(D.numPointShadows = _),
			(D.numSpotShadows = E),
			(i.version = Kx++));
	}
	function c(h, u) {
		let d = 0,
			f = 0,
			m = 0,
			x = 0,
			y = 0;
		const g = u.matrixWorldInverse;
		for (let p = 0, M = h.length; p < M; p++) {
			const v = h[p];
			if (v.isDirectionalLight) {
				const _ = i.directional[d];
				_.direction.setFromMatrixPosition(v.matrixWorld),
					r.setFromMatrixPosition(v.target.matrixWorld),
					_.direction.sub(r),
					_.direction.transformDirection(g),
					d++;
			} else if (v.isSpotLight) {
				const _ = i.spot[m];
				_.position.setFromMatrixPosition(v.matrixWorld),
					_.position.applyMatrix4(g),
					_.direction.setFromMatrixPosition(v.matrixWorld),
					r.setFromMatrixPosition(v.target.matrixWorld),
					_.direction.sub(r),
					_.direction.transformDirection(g),
					m++;
			} else if (v.isRectAreaLight) {
				const _ = i.rectArea[x];
				_.position.setFromMatrixPosition(v.matrixWorld),
					_.position.applyMatrix4(g),
					a.identity(),
					o.copy(v.matrixWorld),
					o.premultiply(g),
					a.extractRotation(o),
					_.halfWidth.set(v.width * 0.5, 0, 0),
					_.halfHeight.set(0, v.height * 0.5, 0),
					_.halfWidth.applyMatrix4(a),
					_.halfHeight.applyMatrix4(a),
					x++;
			} else if (v.isPointLight) {
				const _ = i.point[f];
				_.position.setFromMatrixPosition(v.matrixWorld),
					_.position.applyMatrix4(g),
					f++;
			} else if (v.isHemisphereLight) {
				const _ = i.hemi[y];
				_.direction.setFromMatrixPosition(v.matrixWorld),
					_.direction.transformDirection(g),
					_.direction.normalize(),
					y++;
			}
		}
	}
	return { setup: l, setupView: c, state: i };
}
function Lc(s, e) {
	const t = new e0(s, e),
		n = [],
		i = [];
	function r() {
		(n.length = 0), (i.length = 0);
	}
	function o(u) {
		n.push(u);
	}
	function a(u) {
		i.push(u);
	}
	function l(u) {
		t.setup(n, u);
	}
	function c(u) {
		t.setupView(n, u);
	}
	return {
		init: r,
		state: { lightsArray: n, shadowsArray: i, lights: t },
		setupLights: l,
		setupLightsView: c,
		pushLight: o,
		pushShadow: a
	};
}
function t0(s, e) {
	let t = new WeakMap();
	function n(r, o = 0) {
		let a;
		return (
			t.has(r) === !1
				? ((a = new Lc(s, e)), t.set(r, [a]))
				: o >= t.get(r).length
				? ((a = new Lc(s, e)), t.get(r).push(a))
				: (a = t.get(r)[o]),
			a
		);
	}
	function i() {
		t = new WeakMap();
	}
	return { get: n, dispose: i };
}
class To extends yt {
	constructor(e) {
		super(),
			(this.type = "MeshDepthMaterial"),
			(this.depthPacking = _u),
			(this.map = null),
			(this.alphaMap = null),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.fog = !1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.depthPacking = e.depthPacking),
			(this.map = e.map),
			(this.alphaMap = e.alphaMap),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			this
		);
	}
}
To.prototype.isMeshDepthMaterial = !0;
class Eo extends yt {
	constructor(e) {
		super(),
			(this.type = "MeshDistanceMaterial"),
			(this.referencePosition = new w()),
			(this.nearDistance = 1),
			(this.farDistance = 1e3),
			(this.map = null),
			(this.alphaMap = null),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.fog = !1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.referencePosition.copy(e.referencePosition),
			(this.nearDistance = e.nearDistance),
			(this.farDistance = e.farDistance),
			(this.map = e.map),
			(this.alphaMap = e.alphaMap),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			this
		);
	}
}
Eo.prototype.isMeshDistanceMaterial = !0;
const n0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
	i0 = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Xu(s, e, t) {
	let n = new Qr();
	const i = new G(),
		r = new G(),
		o = new We(),
		a = new To({ depthPacking: bu }),
		l = new Eo(),
		c = {},
		h = t.maxTextureSize,
		u = { 0: lt, 1: ai, 2: In },
		d = new ht({
			defines: { VSM_SAMPLES: 8 },
			uniforms: {
				shadow_pass: { value: null },
				resolution: { value: new G() },
				radius: { value: 4 }
			},
			vertexShader: n0,
			fragmentShader: i0
		}),
		f = d.clone();
	f.defines.HORIZONTAL_PASS = 1;
	const m = new Me();
	m.setAttribute(
		"position",
		new Oe(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3)
	);
	const x = new je(m, d),
		y = this;
	(this.enabled = !1),
		(this.autoUpdate = !0),
		(this.needsUpdate = !1),
		(this.type = rl),
		(this.render = function (v, _, E) {
			if (
				y.enabled === !1 ||
				(y.autoUpdate === !1 && y.needsUpdate === !1) ||
				v.length === 0
			)
				return;
			const A = s.getRenderTarget(),
				D = s.getActiveCubeFace(),
				H = s.getActiveMipmapLevel(),
				I = s.state;
			I.setBlending(fn),
				I.buffers.color.setClear(1, 1, 1, 1),
				I.buffers.depth.setTest(!0),
				I.setScissorTest(!1);
			for (let b = 0, L = v.length; b < L; b++) {
				const F = v[b],
					B = F.shadow;
				if (B === void 0) {
					console.warn("THREE.WebGLShadowMap:", F, "has no shadow.");
					continue;
				}
				if (B.autoUpdate === !1 && B.needsUpdate === !1) continue;
				i.copy(B.mapSize);
				const O = B.getFrameExtents();
				if (
					(i.multiply(O),
					r.copy(B.mapSize),
					(i.x > h || i.y > h) &&
						(i.x > h &&
							((r.x = Math.floor(h / O.x)), (i.x = r.x * O.x), (B.mapSize.x = r.x)),
						i.y > h &&
							((r.y = Math.floor(h / O.y)), (i.y = r.y * O.y), (B.mapSize.y = r.y))),
					B.map === null && !B.isPointLightShadow && this.type === qi)
				) {
					const X = { minFilter: Ye, magFilter: Ye, format: ct };
					(B.map = new ut(i.x, i.y, X)),
						(B.map.texture.name = F.name + ".shadowMap"),
						(B.mapPass = new ut(i.x, i.y, X)),
						B.camera.updateProjectionMatrix();
				}
				if (B.map === null) {
					const X = { minFilter: et, magFilter: et, format: ct };
					(B.map = new ut(i.x, i.y, X)),
						(B.map.texture.name = F.name + ".shadowMap"),
						B.camera.updateProjectionMatrix();
				}
				s.setRenderTarget(B.map), s.clear();
				const N = B.getViewportCount();
				for (let X = 0; X < N; X++) {
					const Q = B.getViewport(X);
					o.set(r.x * Q.x, r.y * Q.y, r.x * Q.z, r.y * Q.w),
						I.viewport(o),
						B.updateMatrices(F, X),
						(n = B.getFrustum()),
						M(_, E, B.camera, F, this.type);
				}
				!B.isPointLightShadow && this.type === qi && g(B, E), (B.needsUpdate = !1);
			}
			(y.needsUpdate = !1), s.setRenderTarget(A, D, H);
		});
	function g(v, _) {
		const E = e.update(x);
		d.defines.VSM_SAMPLES !== v.blurSamples &&
			((d.defines.VSM_SAMPLES = v.blurSamples),
			(f.defines.VSM_SAMPLES = v.blurSamples),
			(d.needsUpdate = !0),
			(f.needsUpdate = !0)),
			(d.uniforms.shadow_pass.value = v.map.texture),
			(d.uniforms.resolution.value = v.mapSize),
			(d.uniforms.radius.value = v.radius),
			s.setRenderTarget(v.mapPass),
			s.clear(),
			s.renderBufferDirect(_, null, E, d, x, null),
			(f.uniforms.shadow_pass.value = v.mapPass.texture),
			(f.uniforms.resolution.value = v.mapSize),
			(f.uniforms.radius.value = v.radius),
			s.setRenderTarget(v.map),
			s.clear(),
			s.renderBufferDirect(_, null, E, f, x, null);
	}
	function p(v, _, E, A, D, H, I) {
		let b = null;
		const L =
			A.isPointLight === !0 ? v.customDistanceMaterial : v.customDepthMaterial;
		if (
			(L !== void 0 ? (b = L) : (b = A.isPointLight === !0 ? l : a),
			(s.localClippingEnabled &&
				E.clipShadows === !0 &&
				E.clippingPlanes.length !== 0) ||
				(E.displacementMap && E.displacementScale !== 0) ||
				(E.alphaMap && E.alphaTest > 0))
		) {
			const F = b.uuid,
				B = E.uuid;
			let O = c[F];
			O === void 0 && ((O = {}), (c[F] = O));
			let N = O[B];
			N === void 0 && ((N = b.clone()), (O[B] = N)), (b = N);
		}
		return (
			(b.visible = E.visible),
			(b.wireframe = E.wireframe),
			I === qi
				? (b.side = E.shadowSide !== null ? E.shadowSide : E.side)
				: (b.side = E.shadowSide !== null ? E.shadowSide : u[E.side]),
			(b.alphaMap = E.alphaMap),
			(b.alphaTest = E.alphaTest),
			(b.clipShadows = E.clipShadows),
			(b.clippingPlanes = E.clippingPlanes),
			(b.clipIntersection = E.clipIntersection),
			(b.displacementMap = E.displacementMap),
			(b.displacementScale = E.displacementScale),
			(b.displacementBias = E.displacementBias),
			(b.wireframeLinewidth = E.wireframeLinewidth),
			(b.linewidth = E.linewidth),
			A.isPointLight === !0 &&
				b.isMeshDistanceMaterial === !0 &&
				(b.referencePosition.setFromMatrixPosition(A.matrixWorld),
				(b.nearDistance = D),
				(b.farDistance = H)),
			b
		);
	}
	function M(v, _, E, A, D) {
		if (v.visible === !1) return;
		if (
			v.layers.test(_.layers) &&
			(v.isMesh || v.isLine || v.isPoints) &&
			(v.castShadow || (v.receiveShadow && D === qi)) &&
			(!v.frustumCulled || n.intersectsObject(v))
		) {
			v.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse, v.matrixWorld);
			const b = e.update(v),
				L = v.material;
			if (Array.isArray(L)) {
				const F = b.groups;
				for (let B = 0, O = F.length; B < O; B++) {
					const N = F[B],
						X = L[N.materialIndex];
					if (X && X.visible) {
						const Q = p(v, b, X, A, E.near, E.far, D);
						s.renderBufferDirect(E, null, b, Q, v, N);
					}
				}
			} else if (L.visible) {
				const F = p(v, b, L, A, E.near, E.far, D);
				s.renderBufferDirect(E, null, b, F, v, null);
			}
		}
		const I = v.children;
		for (let b = 0, L = I.length; b < L; b++) M(I[b], _, E, A, D);
	}
}
function r0(s, e, t) {
	const n = t.isWebGL2;
	function i() {
		let P = !1;
		const de = new We();
		let ce = null;
		const Se = new We(0, 0, 0, 0);
		return {
			setMask: function (q) {
				ce !== q && !P && (s.colorMask(q, q, q, q), (ce = q));
			},
			setLocked: function (q) {
				P = q;
			},
			setClear: function (q, ye, ze, Qe, Lt) {
				Lt === !0 && ((q *= Qe), (ye *= Qe), (ze *= Qe)),
					de.set(q, ye, ze, Qe),
					Se.equals(de) === !1 && (s.clearColor(q, ye, ze, Qe), Se.copy(de));
			},
			reset: function () {
				(P = !1), (ce = null), Se.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let P = !1,
			de = null,
			ce = null,
			Se = null;
		return {
			setTest: function (q) {
				q ? V(2929) : Ne(2929);
			},
			setMask: function (q) {
				de !== q && !P && (s.depthMask(q), (de = q));
			},
			setFunc: function (q) {
				if (ce !== q) {
					if (q)
						switch (q) {
							case kh:
								s.depthFunc(512);
								break;
							case Vh:
								s.depthFunc(519);
								break;
							case Wh:
								s.depthFunc(513);
								break;
							case so:
								s.depthFunc(515);
								break;
							case qh:
								s.depthFunc(514);
								break;
							case Xh:
								s.depthFunc(518);
								break;
							case Yh:
								s.depthFunc(516);
								break;
							case Zh:
								s.depthFunc(517);
								break;
							default:
								s.depthFunc(515);
						}
					else s.depthFunc(515);
					ce = q;
				}
			},
			setLocked: function (q) {
				P = q;
			},
			setClear: function (q) {
				Se !== q && (s.clearDepth(q), (Se = q));
			},
			reset: function () {
				(P = !1), (de = null), (ce = null), (Se = null);
			}
		};
	}
	function o() {
		let P = !1,
			de = null,
			ce = null,
			Se = null,
			q = null,
			ye = null,
			ze = null,
			Qe = null,
			Lt = null;
		return {
			setTest: function (nt) {
				P || (nt ? V(2960) : Ne(2960));
			},
			setMask: function (nt) {
				de !== nt && !P && (s.stencilMask(nt), (de = nt));
			},
			setFunc: function (nt, Xt, rn) {
				(ce !== nt || Se !== Xt || q !== rn) &&
					(s.stencilFunc(nt, Xt, rn), (ce = nt), (Se = Xt), (q = rn));
			},
			setOp: function (nt, Xt, rn) {
				(ye !== nt || ze !== Xt || Qe !== rn) &&
					(s.stencilOp(nt, Xt, rn), (ye = nt), (ze = Xt), (Qe = rn));
			},
			setLocked: function (nt) {
				P = nt;
			},
			setClear: function (nt) {
				Lt !== nt && (s.clearStencil(nt), (Lt = nt));
			},
			reset: function () {
				(P = !1),
					(de = null),
					(ce = null),
					(Se = null),
					(q = null),
					(ye = null),
					(ze = null),
					(Qe = null),
					(Lt = null);
			}
		};
	}
	const a = new i(),
		l = new r(),
		c = new o();
	let h = {},
		u = {},
		d = new WeakMap(),
		f = [],
		m = null,
		x = !1,
		y = null,
		g = null,
		p = null,
		M = null,
		v = null,
		_ = null,
		E = null,
		A = !1,
		D = null,
		H = null,
		I = null,
		b = null,
		L = null;
	const F = s.getParameter(35661);
	let B = !1,
		O = 0;
	const N = s.getParameter(7938);
	N.indexOf("WebGL") !== -1
		? ((O = parseFloat(/^WebGL (\d)/.exec(N)[1])), (B = O >= 1))
		: N.indexOf("OpenGL ES") !== -1 &&
		  ((O = parseFloat(/^OpenGL ES (\d)/.exec(N)[1])), (B = O >= 2));
	let X = null,
		Q = {};
	const ae = s.getParameter(3088),
		Z = s.getParameter(2978),
		K = new We().fromArray(ae),
		le = new We().fromArray(Z);
	function ge(P, de, ce) {
		const Se = new Uint8Array(4),
			q = s.createTexture();
		s.bindTexture(P, q),
			s.texParameteri(P, 10241, 9728),
			s.texParameteri(P, 10240, 9728);
		for (let ye = 0; ye < ce; ye++)
			s.texImage2D(de + ye, 0, 6408, 1, 1, 0, 6408, 5121, Se);
		return q;
	}
	const _e = {};
	(_e[3553] = ge(3553, 3553, 1)),
		(_e[34067] = ge(34067, 34069, 6)),
		a.setClear(0, 0, 0, 1),
		l.setClear(1),
		c.setClear(0),
		V(2929),
		l.setFunc(so),
		te(!1),
		he(wa),
		V(2884),
		j(fn);
	function V(P) {
		h[P] !== !0 && (s.enable(P), (h[P] = !0));
	}
	function Ne(P) {
		h[P] !== !1 && (s.disable(P), (h[P] = !1));
	}
	function ve(P, de) {
		return u[P] !== de
			? (s.bindFramebuffer(P, de),
			  (u[P] = de),
			  n && (P === 36009 && (u[36160] = de), P === 36160 && (u[36009] = de)),
			  !0)
			: !1;
	}
	function Ee(P, de) {
		let ce = f,
			Se = !1;
		if (P)
			if (
				((ce = d.get(de)),
				ce === void 0 && ((ce = []), d.set(de, ce)),
				P.isWebGLMultipleRenderTargets)
			) {
				const q = P.texture;
				if (ce.length !== q.length || ce[0] !== 36064) {
					for (let ye = 0, ze = q.length; ye < ze; ye++) ce[ye] = 36064 + ye;
					(ce.length = q.length), (Se = !0);
				}
			} else ce[0] !== 36064 && ((ce[0] = 36064), (Se = !0));
		else ce[0] !== 1029 && ((ce[0] = 1029), (Se = !0));
		Se &&
			(t.isWebGL2
				? s.drawBuffers(ce)
				: e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce));
	}
	function ue(P) {
		return m !== P ? (s.useProgram(P), (m = P), !0) : !1;
	}
	const Le = { [Qn]: 32774, [Ph]: 32778, [Dh]: 32779 };
	if (n) (Le[Ea] = 32775), (Le[Aa] = 32776);
	else {
		const P = e.get("EXT_blend_minmax");
		P !== null && ((Le[Ea] = P.MIN_EXT), (Le[Aa] = P.MAX_EXT));
	}
	const Te = {
		[Ih]: 0,
		[Fh]: 1,
		[Bh]: 768,
		[ol]: 770,
		[Gh]: 776,
		[Uh]: 774,
		[Nh]: 772,
		[zh]: 769,
		[al]: 771,
		[Hh]: 775,
		[Oh]: 773
	};
	function j(P, de, ce, Se, q, ye, ze, Qe) {
		if (P === fn) {
			x === !0 && (Ne(3042), (x = !1));
			return;
		}
		if ((x === !1 && (V(3042), (x = !0)), P !== Lh)) {
			if (P !== y || Qe !== A) {
				if (
					((g !== Qn || v !== Qn) && (s.blendEquation(32774), (g = Qn), (v = Qn)),
					Qe)
				)
					switch (P) {
						case Zi:
							s.blendFuncSeparate(1, 771, 1, 771);
							break;
						case ro:
							s.blendFunc(1, 1);
							break;
						case Sa:
							s.blendFuncSeparate(0, 769, 0, 1);
							break;
						case Ta:
							s.blendFuncSeparate(0, 768, 0, 770);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", P);
							break;
					}
				else
					switch (P) {
						case Zi:
							s.blendFuncSeparate(770, 771, 1, 771);
							break;
						case ro:
							s.blendFunc(770, 1);
							break;
						case Sa:
							s.blendFuncSeparate(0, 769, 0, 1);
							break;
						case Ta:
							s.blendFunc(0, 768);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", P);
							break;
					}
				(p = null), (M = null), (_ = null), (E = null), (y = P), (A = Qe);
			}
			return;
		}
		(q = q || de),
			(ye = ye || ce),
			(ze = ze || Se),
			(de !== g || q !== v) &&
				(s.blendEquationSeparate(Le[de], Le[q]), (g = de), (v = q)),
			(ce !== p || Se !== M || ye !== _ || ze !== E) &&
				(s.blendFuncSeparate(Te[ce], Te[Se], Te[ye], Te[ze]),
				(p = ce),
				(M = Se),
				(_ = ye),
				(E = ze)),
			(y = P),
			(A = null);
	}
	function ie(P, de) {
		P.side === In ? Ne(2884) : V(2884);
		let ce = P.side === lt;
		de && (ce = !ce),
			te(ce),
			P.blending === Zi && P.transparent === !1
				? j(fn)
				: j(
						P.blending,
						P.blendEquation,
						P.blendSrc,
						P.blendDst,
						P.blendEquationAlpha,
						P.blendSrcAlpha,
						P.blendDstAlpha,
						P.premultipliedAlpha
				  ),
			l.setFunc(P.depthFunc),
			l.setTest(P.depthTest),
			l.setMask(P.depthWrite),
			a.setMask(P.colorWrite);
		const Se = P.stencilWrite;
		c.setTest(Se),
			Se &&
				(c.setMask(P.stencilWriteMask),
				c.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask),
				c.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)),
			we(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits),
			P.alphaToCoverage === !0 ? V(32926) : Ne(32926);
	}
	function te(P) {
		D !== P && (P ? s.frontFace(2304) : s.frontFace(2305), (D = P));
	}
	function he(P) {
		P !== Ah
			? (V(2884),
			  P !== H &&
					(P === wa
						? s.cullFace(1029)
						: P === Ch
						? s.cullFace(1028)
						: s.cullFace(1032)))
			: Ne(2884),
			(H = P);
	}
	function oe(P) {
		P !== I && (B && s.lineWidth(P), (I = P));
	}
	function we(P, de, ce) {
		P
			? (V(32823),
			  (b !== de || L !== ce) && (s.polygonOffset(de, ce), (b = de), (L = ce)))
			: Ne(32823);
	}
	function Ae(P) {
		P ? V(3089) : Ne(3089);
	}
	function Be(P) {
		P === void 0 && (P = 33984 + F - 1), X !== P && (s.activeTexture(P), (X = P));
	}
	function qe(P, de) {
		X === null && Be();
		let ce = Q[X];
		ce === void 0 && ((ce = { type: void 0, texture: void 0 }), (Q[X] = ce)),
			(ce.type !== P || ce.texture !== de) &&
				(s.bindTexture(P, de || _e[P]), (ce.type = P), (ce.texture = de));
	}
	function ke() {
		const P = Q[X];
		P !== void 0 &&
			P.type !== void 0 &&
			(s.bindTexture(P.type, null), (P.type = void 0), (P.texture = void 0));
	}
	function C() {
		try {
			s.compressedTexImage2D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function S() {
		try {
			s.texSubImage2D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function J() {
		try {
			s.texSubImage3D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function ne() {
		try {
			s.compressedTexSubImage2D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function xe() {
		try {
			s.texStorage2D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function Y() {
		try {
			s.texStorage3D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function be() {
		try {
			s.texImage2D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function R() {
		try {
			s.texImage3D.apply(s, arguments);
		} catch (P) {
			console.error("THREE.WebGLState:", P);
		}
	}
	function W(P) {
		K.equals(P) === !1 && (s.scissor(P.x, P.y, P.z, P.w), K.copy(P));
	}
	function ee(P) {
		le.equals(P) === !1 && (s.viewport(P.x, P.y, P.z, P.w), le.copy(P));
	}
	function me() {
		s.disable(3042),
			s.disable(2884),
			s.disable(2929),
			s.disable(32823),
			s.disable(3089),
			s.disable(2960),
			s.disable(32926),
			s.blendEquation(32774),
			s.blendFunc(1, 0),
			s.blendFuncSeparate(1, 0, 1, 0),
			s.colorMask(!0, !0, !0, !0),
			s.clearColor(0, 0, 0, 0),
			s.depthMask(!0),
			s.depthFunc(513),
			s.clearDepth(1),
			s.stencilMask(4294967295),
			s.stencilFunc(519, 0, 4294967295),
			s.stencilOp(7680, 7680, 7680),
			s.clearStencil(0),
			s.cullFace(1029),
			s.frontFace(2305),
			s.polygonOffset(0, 0),
			s.activeTexture(33984),
			s.bindFramebuffer(36160, null),
			n === !0 && (s.bindFramebuffer(36009, null), s.bindFramebuffer(36008, null)),
			s.useProgram(null),
			s.lineWidth(1),
			s.scissor(0, 0, s.canvas.width, s.canvas.height),
			s.viewport(0, 0, s.canvas.width, s.canvas.height),
			(h = {}),
			(X = null),
			(Q = {}),
			(u = {}),
			(d = new WeakMap()),
			(f = []),
			(m = null),
			(x = !1),
			(y = null),
			(g = null),
			(p = null),
			(M = null),
			(v = null),
			(_ = null),
			(E = null),
			(A = !1),
			(D = null),
			(H = null),
			(I = null),
			(b = null),
			(L = null),
			K.set(0, 0, s.canvas.width, s.canvas.height),
			le.set(0, 0, s.canvas.width, s.canvas.height),
			a.reset(),
			l.reset(),
			c.reset();
	}
	return {
		buffers: { color: a, depth: l, stencil: c },
		enable: V,
		disable: Ne,
		bindFramebuffer: ve,
		drawBuffers: Ee,
		useProgram: ue,
		setBlending: j,
		setMaterial: ie,
		setFlipSided: te,
		setCullFace: he,
		setLineWidth: oe,
		setPolygonOffset: we,
		setScissorTest: Ae,
		activeTexture: Be,
		bindTexture: qe,
		unbindTexture: ke,
		compressedTexImage2D: C,
		texImage2D: be,
		texImage3D: R,
		texStorage2D: xe,
		texStorage3D: Y,
		texSubImage2D: S,
		texSubImage3D: J,
		compressedTexSubImage2D: ne,
		scissor: W,
		viewport: ee,
		reset: me
	};
}
function s0(s, e, t, n, i, r, o) {
	const a = i.isWebGL2,
		l = i.maxTextures,
		c = i.maxCubemapSize,
		h = i.maxTextureSize,
		u = i.maxSamples,
		f = e.has("WEBGL_multisampled_render_to_texture")
			? e.get("WEBGL_multisampled_render_to_texture")
			: void 0,
		m = new WeakMap();
	let x,
		y = !1;
	try {
		y =
			typeof OffscreenCanvas != "undefined" &&
			new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function g(C, S) {
		return y ? new OffscreenCanvas(C, S) : Gr("canvas");
	}
	function p(C, S, J, ne) {
		let xe = 1;
		if (
			((C.width > ne || C.height > ne) && (xe = ne / Math.max(C.width, C.height)),
			xe < 1 || S === !0)
		)
			if (
				(typeof HTMLImageElement != "undefined" && C instanceof HTMLImageElement) ||
				(typeof HTMLCanvasElement != "undefined" &&
					C instanceof HTMLCanvasElement) ||
				(typeof ImageBitmap != "undefined" && C instanceof ImageBitmap)
			) {
				const Y = S ? Tu : Math.floor,
					be = Y(xe * C.width),
					R = Y(xe * C.height);
				x === void 0 && (x = g(be, R));
				const W = J ? g(be, R) : x;
				return (
					(W.width = be),
					(W.height = R),
					W.getContext("2d").drawImage(C, 0, 0, be, R),
					console.warn(
						"THREE.WebGLRenderer: Texture has been resized from (" +
							C.width +
							"x" +
							C.height +
							") to (" +
							be +
							"x" +
							R +
							")."
					),
					W
				);
			} else
				return (
					"data" in C &&
						console.warn(
							"THREE.WebGLRenderer: Image in DataTexture is too big (" +
								C.width +
								"x" +
								C.height +
								")."
						),
					C
				);
		return C;
	}
	function M(C) {
		return ja(C.width) && ja(C.height);
	}
	function v(C) {
		return a
			? !1
			: C.wrapS !== wt ||
					C.wrapT !== wt ||
					(C.minFilter !== et && C.minFilter !== Ye);
	}
	function _(C, S) {
		return C.generateMipmaps && S && C.minFilter !== et && C.minFilter !== Ye;
	}
	function E(C) {
		s.generateMipmap(C);
	}
	function A(C, S, J, ne, xe = !1) {
		if (a === !1) return S;
		if (C !== null) {
			if (s[C] !== void 0) return s[C];
			console.warn(
				"THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
					C +
					"'"
			);
		}
		let Y = S;
		return (
			S === 6403 &&
				(J === 5126 && (Y = 33326),
				J === 5131 && (Y = 33325),
				J === 5121 && (Y = 33321)),
			S === 33319 &&
				(J === 5126 && (Y = 33328),
				J === 5131 && (Y = 33327),
				J === 5121 && (Y = 33323)),
			S === 6408 &&
				(J === 5126 && (Y = 34836),
				J === 5131 && (Y = 34842),
				J === 5121 && (Y = ne === $e && xe === !1 ? 35907 : 32856),
				J === 32819 && (Y = 32854),
				J === 32820 && (Y = 32855)),
			(Y === 33325 ||
				Y === 33326 ||
				Y === 33327 ||
				Y === 33328 ||
				Y === 34842 ||
				Y === 34836) &&
				e.get("EXT_color_buffer_float"),
			Y
		);
	}
	function D(C, S, J) {
		return _(C, J) === !0 ||
			(C.isFramebufferTexture && C.minFilter !== et && C.minFilter !== Ye)
			? Math.log2(Math.max(S.width, S.height)) + 1
			: C.mipmaps !== void 0 && C.mipmaps.length > 0
			? C.mipmaps.length
			: C.isCompressedTexture && Array.isArray(C.image)
			? S.mipmaps.length
			: 1;
	}
	function H(C) {
		return C === et || C === oo || C === ao ? 9728 : 9729;
	}
	function I(C) {
		const S = C.target;
		S.removeEventListener("dispose", I),
			L(S),
			S.isVideoTexture && m.delete(S),
			o.memory.textures--;
	}
	function b(C) {
		const S = C.target;
		S.removeEventListener("dispose", b), F(S);
	}
	function L(C) {
		const S = n.get(C);
		S.__webglInit !== void 0 && (s.deleteTexture(S.__webglTexture), n.remove(C));
	}
	function F(C) {
		const S = C.texture,
			J = n.get(C),
			ne = n.get(S);
		if (!!C) {
			if (
				(ne.__webglTexture !== void 0 &&
					(s.deleteTexture(ne.__webglTexture), o.memory.textures--),
				C.depthTexture && C.depthTexture.dispose(),
				C.isWebGLCubeRenderTarget)
			)
				for (let xe = 0; xe < 6; xe++)
					s.deleteFramebuffer(J.__webglFramebuffer[xe]),
						J.__webglDepthbuffer && s.deleteRenderbuffer(J.__webglDepthbuffer[xe]);
			else
				s.deleteFramebuffer(J.__webglFramebuffer),
					J.__webglDepthbuffer && s.deleteRenderbuffer(J.__webglDepthbuffer),
					J.__webglMultisampledFramebuffer &&
						s.deleteFramebuffer(J.__webglMultisampledFramebuffer),
					J.__webglColorRenderbuffer &&
						s.deleteRenderbuffer(J.__webglColorRenderbuffer),
					J.__webglDepthRenderbuffer &&
						s.deleteRenderbuffer(J.__webglDepthRenderbuffer);
			if (C.isWebGLMultipleRenderTargets)
				for (let xe = 0, Y = S.length; xe < Y; xe++) {
					const be = n.get(S[xe]);
					be.__webglTexture &&
						(s.deleteTexture(be.__webglTexture), o.memory.textures--),
						n.remove(S[xe]);
				}
			n.remove(S), n.remove(C);
		}
	}
	let B = 0;
	function O() {
		B = 0;
	}
	function N() {
		const C = B;
		return (
			C >= l &&
				console.warn(
					"THREE.WebGLTextures: Trying to use " +
						C +
						" texture units while this GPU supports only " +
						l
				),
			(B += 1),
			C
		);
	}
	function X(C, S) {
		const J = n.get(C);
		if ((C.isVideoTexture && oe(C), C.version > 0 && J.__version !== C.version)) {
			const ne = C.image;
			if (ne === void 0)
				console.warn(
					"THREE.WebGLRenderer: Texture marked for update but image is undefined"
				);
			else if (ne.complete === !1)
				console.warn(
					"THREE.WebGLRenderer: Texture marked for update but image is incomplete"
				);
			else {
				V(J, C, S);
				return;
			}
		}
		t.activeTexture(33984 + S), t.bindTexture(3553, J.__webglTexture);
	}
	function Q(C, S) {
		const J = n.get(C);
		if (C.version > 0 && J.__version !== C.version) {
			V(J, C, S);
			return;
		}
		t.activeTexture(33984 + S), t.bindTexture(35866, J.__webglTexture);
	}
	function ae(C, S) {
		const J = n.get(C);
		if (C.version > 0 && J.__version !== C.version) {
			V(J, C, S);
			return;
		}
		t.activeTexture(33984 + S), t.bindTexture(32879, J.__webglTexture);
	}
	function Z(C, S) {
		const J = n.get(C);
		if (C.version > 0 && J.__version !== C.version) {
			Ne(J, C, S);
			return;
		}
		t.activeTexture(33984 + S), t.bindTexture(34067, J.__webglTexture);
	}
	const K = { [Br]: 10497, [wt]: 33071, [zr]: 33648 },
		le = {
			[et]: 9728,
			[oo]: 9984,
			[ao]: 9986,
			[Ye]: 9729,
			[cl]: 9985,
			[xi]: 9987
		};
	function ge(C, S, J) {
		if (
			(J
				? (s.texParameteri(C, 10242, K[S.wrapS]),
				  s.texParameteri(C, 10243, K[S.wrapT]),
				  (C === 32879 || C === 35866) && s.texParameteri(C, 32882, K[S.wrapR]),
				  s.texParameteri(C, 10240, le[S.magFilter]),
				  s.texParameteri(C, 10241, le[S.minFilter]))
				: (s.texParameteri(C, 10242, 33071),
				  s.texParameteri(C, 10243, 33071),
				  (C === 32879 || C === 35866) && s.texParameteri(C, 32882, 33071),
				  (S.wrapS !== wt || S.wrapT !== wt) &&
						console.warn(
							"THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."
						),
				  s.texParameteri(C, 10240, H(S.magFilter)),
				  s.texParameteri(C, 10241, H(S.minFilter)),
				  S.minFilter !== et &&
						S.minFilter !== Ye &&
						console.warn(
							"THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."
						)),
			e.has("EXT_texture_filter_anisotropic") === !0)
		) {
			const ne = e.get("EXT_texture_filter_anisotropic");
			if (
				(S.type === dn && e.has("OES_texture_float_linear") === !1) ||
				(a === !1 && S.type === ii && e.has("OES_texture_half_float_linear") === !1)
			)
				return;
			(S.anisotropy > 1 || n.get(S).__currentAnisotropy) &&
				(s.texParameterf(
					C,
					ne.TEXTURE_MAX_ANISOTROPY_EXT,
					Math.min(S.anisotropy, i.getMaxAnisotropy())
				),
				(n.get(S).__currentAnisotropy = S.anisotropy));
		}
	}
	function _e(C, S) {
		C.__webglInit === void 0 &&
			((C.__webglInit = !0),
			S.addEventListener("dispose", I),
			(C.__webglTexture = s.createTexture()),
			o.memory.textures++);
	}
	function V(C, S, J) {
		let ne = 3553;
		S.isDataTexture2DArray && (ne = 35866),
			S.isDataTexture3D && (ne = 32879),
			_e(C, S),
			t.activeTexture(33984 + J),
			t.bindTexture(ne, C.__webglTexture),
			s.pixelStorei(37440, S.flipY),
			s.pixelStorei(37441, S.premultiplyAlpha),
			s.pixelStorei(3317, S.unpackAlignment),
			s.pixelStorei(37443, 0);
		const xe = v(S) && M(S.image) === !1;
		let Y = p(S.image, xe, !1, h);
		Y = we(S, Y);
		const be = M(Y) || a,
			R = r.convert(S.format, S.encoding);
		let W = r.convert(S.type),
			ee = A(S.internalFormat, R, W, S.encoding, S.isVideoTexture);
		ge(ne, S, be);
		let me;
		const P = S.mipmaps,
			de = a && S.isVideoTexture !== !0,
			ce = C.__version === void 0,
			Se = D(S, Y, be);
		if (S.isDepthTexture)
			(ee = 6402),
				a
					? S.type === dn
						? (ee = 36012)
						: S.type === Rr
						? (ee = 33190)
						: S.type === ri
						? (ee = 35056)
						: (ee = 33189)
					: S.type === dn &&
					  console.error(
							"WebGLRenderer: Floating point depth texture requires WebGL2."
					  ),
				S.format === Ln &&
					ee === 6402 &&
					S.type !== $i &&
					S.type !== Rr &&
					(console.warn(
						"THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."
					),
					(S.type = $i),
					(W = r.convert(S.type))),
				S.format === li &&
					ee === 6402 &&
					((ee = 34041),
					S.type !== ri &&
						(console.warn(
							"THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."
						),
						(S.type = ri),
						(W = r.convert(S.type)))),
				de && ce
					? t.texStorage2D(3553, 1, ee, Y.width, Y.height)
					: t.texImage2D(3553, 0, ee, Y.width, Y.height, 0, R, W, null);
		else if (S.isDataTexture)
			if (P.length > 0 && be) {
				de && ce && t.texStorage2D(3553, Se, ee, P[0].width, P[0].height);
				for (let q = 0, ye = P.length; q < ye; q++)
					(me = P[q]),
						de
							? t.texSubImage2D(3553, 0, 0, 0, me.width, me.height, R, W, me.data)
							: t.texImage2D(3553, q, ee, me.width, me.height, 0, R, W, me.data);
				S.generateMipmaps = !1;
			} else
				de
					? (ce && t.texStorage2D(3553, Se, ee, Y.width, Y.height),
					  t.texSubImage2D(3553, 0, 0, 0, Y.width, Y.height, R, W, Y.data))
					: t.texImage2D(3553, 0, ee, Y.width, Y.height, 0, R, W, Y.data);
		else if (S.isCompressedTexture) {
			de && ce && t.texStorage2D(3553, Se, ee, P[0].width, P[0].height);
			for (let q = 0, ye = P.length; q < ye; q++)
				(me = P[q]),
					S.format !== ct
						? R !== null
							? de
								? t.compressedTexSubImage2D(
										3553,
										q,
										0,
										0,
										me.width,
										me.height,
										R,
										me.data
								  )
								: t.compressedTexImage2D(3553, q, ee, me.width, me.height, 0, me.data)
							: console.warn(
									"THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
							  )
						: de
						? t.texSubImage2D(3553, q, 0, 0, me.width, me.height, R, W, me.data)
						: t.texImage2D(3553, q, ee, me.width, me.height, 0, R, W, me.data);
		} else if (S.isDataTexture2DArray)
			de
				? (ce && t.texStorage3D(35866, Se, ee, Y.width, Y.height, Y.depth),
				  t.texSubImage3D(
						35866,
						0,
						0,
						0,
						0,
						Y.width,
						Y.height,
						Y.depth,
						R,
						W,
						Y.data
				  ))
				: t.texImage3D(35866, 0, ee, Y.width, Y.height, Y.depth, 0, R, W, Y.data);
		else if (S.isDataTexture3D)
			de
				? (ce && t.texStorage3D(32879, Se, ee, Y.width, Y.height, Y.depth),
				  t.texSubImage3D(
						32879,
						0,
						0,
						0,
						0,
						Y.width,
						Y.height,
						Y.depth,
						R,
						W,
						Y.data
				  ))
				: t.texImage3D(32879, 0, ee, Y.width, Y.height, Y.depth, 0, R, W, Y.data);
		else if (S.isFramebufferTexture)
			de && ce
				? t.texStorage2D(3553, Se, ee, Y.width, Y.height)
				: t.texImage2D(3553, 0, ee, Y.width, Y.height, 0, R, W, null);
		else if (P.length > 0 && be) {
			de && ce && t.texStorage2D(3553, Se, ee, P[0].width, P[0].height);
			for (let q = 0, ye = P.length; q < ye; q++)
				(me = P[q]),
					de
						? t.texSubImage2D(3553, q, 0, 0, R, W, me)
						: t.texImage2D(3553, q, ee, R, W, me);
			S.generateMipmaps = !1;
		} else
			de
				? (ce && t.texStorage2D(3553, Se, ee, Y.width, Y.height),
				  t.texSubImage2D(3553, 0, 0, 0, R, W, Y))
				: t.texImage2D(3553, 0, ee, R, W, Y);
		_(S, be) && E(ne), (C.__version = S.version), S.onUpdate && S.onUpdate(S);
	}
	function Ne(C, S, J) {
		if (S.image.length !== 6) return;
		_e(C, S),
			t.activeTexture(33984 + J),
			t.bindTexture(34067, C.__webglTexture),
			s.pixelStorei(37440, S.flipY),
			s.pixelStorei(37441, S.premultiplyAlpha),
			s.pixelStorei(3317, S.unpackAlignment),
			s.pixelStorei(37443, 0);
		const ne = S && (S.isCompressedTexture || S.image[0].isCompressedTexture),
			xe = S.image[0] && S.image[0].isDataTexture,
			Y = [];
		for (let q = 0; q < 6; q++)
			!ne && !xe
				? (Y[q] = p(S.image[q], !1, !0, c))
				: (Y[q] = xe ? S.image[q].image : S.image[q]),
				(Y[q] = we(S, Y[q]));
		const be = Y[0],
			R = M(be) || a,
			W = r.convert(S.format, S.encoding),
			ee = r.convert(S.type),
			me = A(S.internalFormat, W, ee, S.encoding),
			P = a && S.isVideoTexture !== !0,
			de = C.__version === void 0;
		let ce = D(S, be, R);
		ge(34067, S, R);
		let Se;
		if (ne) {
			P && de && t.texStorage2D(34067, ce, me, be.width, be.height);
			for (let q = 0; q < 6; q++) {
				Se = Y[q].mipmaps;
				for (let ye = 0; ye < Se.length; ye++) {
					const ze = Se[ye];
					S.format !== ct
						? W !== null
							? P
								? t.compressedTexSubImage2D(
										34069 + q,
										ye,
										0,
										0,
										ze.width,
										ze.height,
										W,
										ze.data
								  )
								: t.compressedTexImage2D(
										34069 + q,
										ye,
										me,
										ze.width,
										ze.height,
										0,
										ze.data
								  )
							: console.warn(
									"THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"
							  )
						: P
						? t.texSubImage2D(
								34069 + q,
								ye,
								0,
								0,
								ze.width,
								ze.height,
								W,
								ee,
								ze.data
						  )
						: t.texImage2D(34069 + q, ye, me, ze.width, ze.height, 0, W, ee, ze.data);
				}
			}
		} else {
			(Se = S.mipmaps),
				P &&
					de &&
					(Se.length > 0 && ce++,
					t.texStorage2D(34067, ce, me, Y[0].width, Y[0].height));
			for (let q = 0; q < 6; q++)
				if (xe) {
					P
						? t.texSubImage2D(
								34069 + q,
								0,
								0,
								0,
								Y[q].width,
								Y[q].height,
								W,
								ee,
								Y[q].data
						  )
						: t.texImage2D(
								34069 + q,
								0,
								me,
								Y[q].width,
								Y[q].height,
								0,
								W,
								ee,
								Y[q].data
						  );
					for (let ye = 0; ye < Se.length; ye++) {
						const Qe = Se[ye].image[q].image;
						P
							? t.texSubImage2D(
									34069 + q,
									ye + 1,
									0,
									0,
									Qe.width,
									Qe.height,
									W,
									ee,
									Qe.data
							  )
							: t.texImage2D(
									34069 + q,
									ye + 1,
									me,
									Qe.width,
									Qe.height,
									0,
									W,
									ee,
									Qe.data
							  );
					}
				} else {
					P
						? t.texSubImage2D(34069 + q, 0, 0, 0, W, ee, Y[q])
						: t.texImage2D(34069 + q, 0, me, W, ee, Y[q]);
					for (let ye = 0; ye < Se.length; ye++) {
						const ze = Se[ye];
						P
							? t.texSubImage2D(34069 + q, ye + 1, 0, 0, W, ee, ze.image[q])
							: t.texImage2D(34069 + q, ye + 1, me, W, ee, ze.image[q]);
					}
				}
		}
		_(S, R) && E(34067), (C.__version = S.version), S.onUpdate && S.onUpdate(S);
	}
	function ve(C, S, J, ne, xe) {
		const Y = r.convert(J.format, J.encoding),
			be = r.convert(J.type),
			R = A(J.internalFormat, Y, be, J.encoding);
		n.get(S).__hasExternalTextures ||
			(xe === 32879 || xe === 35866
				? t.texImage3D(xe, 0, R, S.width, S.height, S.depth, 0, Y, be, null)
				: t.texImage2D(xe, 0, R, S.width, S.height, 0, Y, be, null)),
			t.bindFramebuffer(36160, C),
			S.useRenderToTexture
				? f.framebufferTexture2DMultisampleEXT(
						36160,
						ne,
						xe,
						n.get(J).__webglTexture,
						0,
						he(S)
				  )
				: s.framebufferTexture2D(36160, ne, xe, n.get(J).__webglTexture, 0),
			t.bindFramebuffer(36160, null);
	}
	function Ee(C, S, J) {
		if ((s.bindRenderbuffer(36161, C), S.depthBuffer && !S.stencilBuffer)) {
			let ne = 33189;
			if (J || S.useRenderToTexture) {
				const xe = S.depthTexture;
				xe &&
					xe.isDepthTexture &&
					(xe.type === dn ? (ne = 36012) : xe.type === Rr && (ne = 33190));
				const Y = he(S);
				S.useRenderToTexture
					? f.renderbufferStorageMultisampleEXT(36161, Y, ne, S.width, S.height)
					: s.renderbufferStorageMultisample(36161, Y, ne, S.width, S.height);
			} else s.renderbufferStorage(36161, ne, S.width, S.height);
			s.framebufferRenderbuffer(36160, 36096, 36161, C);
		} else if (S.depthBuffer && S.stencilBuffer) {
			const ne = he(S);
			J && S.useRenderbuffer
				? s.renderbufferStorageMultisample(36161, ne, 35056, S.width, S.height)
				: S.useRenderToTexture
				? f.renderbufferStorageMultisampleEXT(36161, ne, 35056, S.width, S.height)
				: s.renderbufferStorage(36161, 34041, S.width, S.height),
				s.framebufferRenderbuffer(36160, 33306, 36161, C);
		} else {
			const ne = S.isWebGLMultipleRenderTargets === !0 ? S.texture[0] : S.texture,
				xe = r.convert(ne.format, ne.encoding),
				Y = r.convert(ne.type),
				be = A(ne.internalFormat, xe, Y, ne.encoding),
				R = he(S);
			J && S.useRenderbuffer
				? s.renderbufferStorageMultisample(36161, R, be, S.width, S.height)
				: S.useRenderToTexture
				? f.renderbufferStorageMultisampleEXT(36161, R, be, S.width, S.height)
				: s.renderbufferStorage(36161, be, S.width, S.height);
		}
		s.bindRenderbuffer(36161, null);
	}
	function ue(C, S) {
		if (S && S.isWebGLCubeRenderTarget)
			throw new Error("Depth Texture with cube render targets is not supported");
		if (
			(t.bindFramebuffer(36160, C),
			!(S.depthTexture && S.depthTexture.isDepthTexture))
		)
			throw new Error(
				"renderTarget.depthTexture must be an instance of THREE.DepthTexture"
			);
		(!n.get(S.depthTexture).__webglTexture ||
			S.depthTexture.image.width !== S.width ||
			S.depthTexture.image.height !== S.height) &&
			((S.depthTexture.image.width = S.width),
			(S.depthTexture.image.height = S.height),
			(S.depthTexture.needsUpdate = !0)),
			X(S.depthTexture, 0);
		const ne = n.get(S.depthTexture).__webglTexture,
			xe = he(S);
		if (S.depthTexture.format === Ln)
			S.useRenderToTexture
				? f.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, ne, 0, xe)
				: s.framebufferTexture2D(36160, 36096, 3553, ne, 0);
		else if (S.depthTexture.format === li)
			S.useRenderToTexture
				? f.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, ne, 0, xe)
				: s.framebufferTexture2D(36160, 33306, 3553, ne, 0);
		else throw new Error("Unknown depthTexture format");
	}
	function Le(C) {
		const S = n.get(C),
			J = C.isWebGLCubeRenderTarget === !0;
		if (C.depthTexture && !S.__autoAllocateDepthBuffer) {
			if (J)
				throw new Error("target.depthTexture not supported in Cube render targets");
			ue(S.__webglFramebuffer, C);
		} else if (J) {
			S.__webglDepthbuffer = [];
			for (let ne = 0; ne < 6; ne++)
				t.bindFramebuffer(36160, S.__webglFramebuffer[ne]),
					(S.__webglDepthbuffer[ne] = s.createRenderbuffer()),
					Ee(S.__webglDepthbuffer[ne], C, !1);
		} else
			t.bindFramebuffer(36160, S.__webglFramebuffer),
				(S.__webglDepthbuffer = s.createRenderbuffer()),
				Ee(S.__webglDepthbuffer, C, !1);
		t.bindFramebuffer(36160, null);
	}
	function Te(C, S, J) {
		const ne = n.get(C);
		S !== void 0 && ve(ne.__webglFramebuffer, C, C.texture, 36064, 3553),
			J !== void 0 && Le(C);
	}
	function j(C) {
		const S = C.texture,
			J = n.get(C),
			ne = n.get(S);
		C.addEventListener("dispose", b),
			C.isWebGLMultipleRenderTargets !== !0 &&
				(ne.__webglTexture === void 0 && (ne.__webglTexture = s.createTexture()),
				(ne.__version = S.version),
				o.memory.textures++);
		const xe = C.isWebGLCubeRenderTarget === !0,
			Y = C.isWebGLMultipleRenderTargets === !0,
			be = S.isDataTexture3D || S.isDataTexture2DArray,
			R = M(C) || a;
		if (xe) {
			J.__webglFramebuffer = [];
			for (let W = 0; W < 6; W++) J.__webglFramebuffer[W] = s.createFramebuffer();
		} else if (((J.__webglFramebuffer = s.createFramebuffer()), Y))
			if (i.drawBuffers) {
				const W = C.texture;
				for (let ee = 0, me = W.length; ee < me; ee++) {
					const P = n.get(W[ee]);
					P.__webglTexture === void 0 &&
						((P.__webglTexture = s.createTexture()), o.memory.textures++);
				}
			} else
				console.warn(
					"THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension."
				);
		else if (C.useRenderbuffer)
			if (a) {
				(J.__webglMultisampledFramebuffer = s.createFramebuffer()),
					(J.__webglColorRenderbuffer = s.createRenderbuffer()),
					s.bindRenderbuffer(36161, J.__webglColorRenderbuffer);
				const W = r.convert(S.format, S.encoding),
					ee = r.convert(S.type),
					me = A(S.internalFormat, W, ee, S.encoding),
					P = he(C);
				s.renderbufferStorageMultisample(36161, P, me, C.width, C.height),
					t.bindFramebuffer(36160, J.__webglMultisampledFramebuffer),
					s.framebufferRenderbuffer(36160, 36064, 36161, J.__webglColorRenderbuffer),
					s.bindRenderbuffer(36161, null),
					C.depthBuffer &&
						((J.__webglDepthRenderbuffer = s.createRenderbuffer()),
						Ee(J.__webglDepthRenderbuffer, C, !0)),
					t.bindFramebuffer(36160, null);
			} else
				console.warn(
					"THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2."
				);
		if (xe) {
			t.bindTexture(34067, ne.__webglTexture), ge(34067, S, R);
			for (let W = 0; W < 6; W++)
				ve(J.__webglFramebuffer[W], C, S, 36064, 34069 + W);
			_(S, R) && E(34067), t.unbindTexture();
		} else if (Y) {
			const W = C.texture;
			for (let ee = 0, me = W.length; ee < me; ee++) {
				const P = W[ee],
					de = n.get(P);
				t.bindTexture(3553, de.__webglTexture),
					ge(3553, P, R),
					ve(J.__webglFramebuffer, C, P, 36064 + ee, 3553),
					_(P, R) && E(3553);
			}
			t.unbindTexture();
		} else {
			let W = 3553;
			be &&
				(a
					? (W = S.isDataTexture3D ? 32879 : 35866)
					: console.warn(
							"THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2."
					  )),
				t.bindTexture(W, ne.__webglTexture),
				ge(W, S, R),
				ve(J.__webglFramebuffer, C, S, 36064, W),
				_(S, R) && E(W),
				t.unbindTexture();
		}
		C.depthBuffer && Le(C);
	}
	function ie(C) {
		const S = M(C) || a,
			J = C.isWebGLMultipleRenderTargets === !0 ? C.texture : [C.texture];
		for (let ne = 0, xe = J.length; ne < xe; ne++) {
			const Y = J[ne];
			if (_(Y, S)) {
				const be = C.isWebGLCubeRenderTarget ? 34067 : 3553,
					R = n.get(Y).__webglTexture;
				t.bindTexture(be, R), E(be), t.unbindTexture();
			}
		}
	}
	function te(C) {
		if (C.useRenderbuffer)
			if (a) {
				const S = C.width,
					J = C.height;
				let ne = 16384;
				const xe = [36064],
					Y = C.stencilBuffer ? 33306 : 36096;
				C.depthBuffer && xe.push(Y),
					C.ignoreDepthForMultisampleCopy ||
						(C.depthBuffer && (ne |= 256), C.stencilBuffer && (ne |= 1024));
				const be = n.get(C);
				t.bindFramebuffer(36008, be.__webglMultisampledFramebuffer),
					t.bindFramebuffer(36009, be.__webglFramebuffer),
					C.ignoreDepthForMultisampleCopy &&
						(s.invalidateFramebuffer(36008, [Y]),
						s.invalidateFramebuffer(36009, [Y])),
					s.blitFramebuffer(0, 0, S, J, 0, 0, S, J, ne, 9728),
					s.invalidateFramebuffer(36008, xe),
					t.bindFramebuffer(36008, null),
					t.bindFramebuffer(36009, be.__webglMultisampledFramebuffer);
			} else
				console.warn(
					"THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2."
				);
	}
	function he(C) {
		return a && (C.useRenderbuffer || C.useRenderToTexture)
			? Math.min(u, C.samples)
			: 0;
	}
	function oe(C) {
		const S = o.render.frame;
		m.get(C) !== S && (m.set(C, S), C.update());
	}
	function we(C, S) {
		const J = C.encoding,
			ne = C.format,
			xe = C.type;
		return (
			C.isCompressedTexture === !0 ||
				C.isVideoTexture === !0 ||
				C.format === lo ||
				(J !== gn &&
					(J === $e
						? a === !1
							? e.has("EXT_sRGB") === !0 && ne === ct
								? ((C.format = lo), (C.minFilter = Ye), (C.generateMipmaps = !1))
								: (S = Nn.sRGBToLinear(S))
							: (ne !== ct || xe !== mn) &&
							  console.warn(
									"THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."
							  )
						: console.error(
								"THREE.WebGLTextures: Unsupported texture encoding:",
								J
						  ))),
			S
		);
	}
	let Ae = !1,
		Be = !1;
	function qe(C, S) {
		C &&
			C.isWebGLRenderTarget &&
			(Ae === !1 &&
				(console.warn(
					"THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."
				),
				(Ae = !0)),
			(C = C.texture)),
			X(C, S);
	}
	function ke(C, S) {
		C &&
			C.isWebGLCubeRenderTarget &&
			(Be === !1 &&
				(console.warn(
					"THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."
				),
				(Be = !0)),
			(C = C.texture)),
			Z(C, S);
	}
	(this.allocateTextureUnit = N),
		(this.resetTextureUnits = O),
		(this.setTexture2D = X),
		(this.setTexture2DArray = Q),
		(this.setTexture3D = ae),
		(this.setTextureCube = Z),
		(this.rebindTextures = Te),
		(this.setupRenderTarget = j),
		(this.updateRenderTargetMipmap = ie),
		(this.updateMultisampleRenderTarget = te),
		(this.setupDepthRenderbuffer = Le),
		(this.setupFrameBufferTexture = ve),
		(this.safeSetTexture2D = qe),
		(this.safeSetTextureCube = ke);
}
function Yu(s, e, t) {
	const n = t.isWebGL2;
	function i(r, o = null) {
		let a;
		if (r === mn) return 5121;
		if (r === ru) return 32819;
		if (r === su) return 32820;
		if (r === tu) return 5120;
		if (r === nu) return 5122;
		if (r === $i) return 5123;
		if (r === iu) return 5124;
		if (r === Rr) return 5125;
		if (r === dn) return 5126;
		if (r === ii)
			return n
				? 5131
				: ((a = e.get("OES_texture_half_float")),
				  a !== null ? a.HALF_FLOAT_OES : null);
		if (r === ou) return 6406;
		if (r === ct) return 6408;
		if (r === lu) return 6409;
		if (r === cu) return 6410;
		if (r === Ln) return 6402;
		if (r === li) return 34041;
		if (r === hu) return 6403;
		if (r === au)
			return (
				console.warn(
					"THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"
				),
				6408
			);
		if (r === lo)
			return (a = e.get("EXT_sRGB")), a !== null ? a.SRGB_ALPHA_EXT : null;
		if (r === uu) return 36244;
		if (r === du) return 33319;
		if (r === fu) return 33320;
		if (r === pu) return 36249;
		if (r === Ks || r === Qs || r === eo || r === to)
			if (o === $e)
				if (((a = e.get("WEBGL_compressed_texture_s3tc_srgb")), a !== null)) {
					if (r === Ks) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
					if (r === Qs) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
					if (r === eo) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
					if (r === to) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
				} else return null;
			else if (((a = e.get("WEBGL_compressed_texture_s3tc")), a !== null)) {
				if (r === Ks) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if (r === Qs) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if (r === eo) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if (r === to) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
			} else return null;
		if (r === Ca || r === Ra || r === La || r === Pa)
			if (((a = e.get("WEBGL_compressed_texture_pvrtc")), a !== null)) {
				if (r === Ca) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if (r === Ra) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if (r === La) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if (r === Pa) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
			} else return null;
		if (r === mu)
			return (
				(a = e.get("WEBGL_compressed_texture_etc1")),
				a !== null ? a.COMPRESSED_RGB_ETC1_WEBGL : null
			);
		if (r === Da || r === Ia)
			if (((a = e.get("WEBGL_compressed_texture_etc")), a !== null)) {
				if (r === Da)
					return o === $e ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
				if (r === Ia)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
						: a.COMPRESSED_RGBA8_ETC2_EAC;
			} else return null;
		if (
			r === Fa ||
			r === Ba ||
			r === za ||
			r === Na ||
			r === Oa ||
			r === Ua ||
			r === Ha ||
			r === Ga ||
			r === ka ||
			r === Va ||
			r === Wa ||
			r === qa ||
			r === Xa ||
			r === Ya
		)
			if (((a = e.get("WEBGL_compressed_texture_astc")), a !== null)) {
				if (r === Fa)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
						: a.COMPRESSED_RGBA_ASTC_4x4_KHR;
				if (r === Ba)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
						: a.COMPRESSED_RGBA_ASTC_5x4_KHR;
				if (r === za)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
						: a.COMPRESSED_RGBA_ASTC_5x5_KHR;
				if (r === Na)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
						: a.COMPRESSED_RGBA_ASTC_6x5_KHR;
				if (r === Oa)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
						: a.COMPRESSED_RGBA_ASTC_6x6_KHR;
				if (r === Ua)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
						: a.COMPRESSED_RGBA_ASTC_8x5_KHR;
				if (r === Ha)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
						: a.COMPRESSED_RGBA_ASTC_8x6_KHR;
				if (r === Ga)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
						: a.COMPRESSED_RGBA_ASTC_8x8_KHR;
				if (r === ka)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
						: a.COMPRESSED_RGBA_ASTC_10x5_KHR;
				if (r === Va)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
						: a.COMPRESSED_RGBA_ASTC_10x6_KHR;
				if (r === Wa)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
						: a.COMPRESSED_RGBA_ASTC_10x8_KHR;
				if (r === qa)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
						: a.COMPRESSED_RGBA_ASTC_10x10_KHR;
				if (r === Xa)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
						: a.COMPRESSED_RGBA_ASTC_12x10_KHR;
				if (r === Ya)
					return o === $e
						? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
						: a.COMPRESSED_RGBA_ASTC_12x12_KHR;
			} else return null;
		if (r === Za)
			if (((a = e.get("EXT_texture_compression_bptc")), a !== null)) {
				if (r === Za)
					return o === $e
						? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
						: a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
			} else return null;
		if (r === ri)
			return n
				? 34042
				: ((a = e.get("WEBGL_depth_texture")),
				  a !== null ? a.UNSIGNED_INT_24_8_WEBGL : null);
	}
	return { convert: i };
}
class pl extends pt {
	constructor(e = []) {
		super(), (this.cameras = e);
	}
}
pl.prototype.isArrayCamera = !0;
class ni extends Fe {
	constructor() {
		super(), (this.type = "Group");
	}
}
ni.prototype.isGroup = !0;
const o0 = { type: "move" };
class da {
	constructor() {
		(this._targetRay = null), (this._grip = null), (this._hand = null);
	}
	getHandSpace() {
		return (
			this._hand === null &&
				((this._hand = new ni()),
				(this._hand.matrixAutoUpdate = !1),
				(this._hand.visible = !1),
				(this._hand.joints = {}),
				(this._hand.inputState = { pinching: !1 })),
			this._hand
		);
	}
	getTargetRaySpace() {
		return (
			this._targetRay === null &&
				((this._targetRay = new ni()),
				(this._targetRay.matrixAutoUpdate = !1),
				(this._targetRay.visible = !1),
				(this._targetRay.hasLinearVelocity = !1),
				(this._targetRay.linearVelocity = new w()),
				(this._targetRay.hasAngularVelocity = !1),
				(this._targetRay.angularVelocity = new w())),
			this._targetRay
		);
	}
	getGripSpace() {
		return (
			this._grip === null &&
				((this._grip = new ni()),
				(this._grip.matrixAutoUpdate = !1),
				(this._grip.visible = !1),
				(this._grip.hasLinearVelocity = !1),
				(this._grip.linearVelocity = new w()),
				(this._grip.hasAngularVelocity = !1),
				(this._grip.angularVelocity = new w())),
			this._grip
		);
	}
	dispatchEvent(e) {
		return (
			this._targetRay !== null && this._targetRay.dispatchEvent(e),
			this._grip !== null && this._grip.dispatchEvent(e),
			this._hand !== null && this._hand.dispatchEvent(e),
			this
		);
	}
	disconnect(e) {
		return (
			this.dispatchEvent({ type: "disconnected", data: e }),
			this._targetRay !== null && (this._targetRay.visible = !1),
			this._grip !== null && (this._grip.visible = !1),
			this._hand !== null && (this._hand.visible = !1),
			this
		);
	}
	update(e, t, n) {
		let i = null,
			r = null,
			o = null;
		const a = this._targetRay,
			l = this._grip,
			c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred")
			if (
				(a !== null &&
					((i = t.getPose(e.targetRaySpace, n)),
					i !== null &&
						(a.matrix.fromArray(i.transform.matrix),
						a.matrix.decompose(a.position, a.rotation, a.scale),
						i.linearVelocity
							? ((a.hasLinearVelocity = !0), a.linearVelocity.copy(i.linearVelocity))
							: (a.hasLinearVelocity = !1),
						i.angularVelocity
							? ((a.hasAngularVelocity = !0),
							  a.angularVelocity.copy(i.angularVelocity))
							: (a.hasAngularVelocity = !1),
						this.dispatchEvent(o0))),
				c && e.hand)
			) {
				o = !0;
				for (const x of e.hand.values()) {
					const y = t.getJointPose(x, n);
					if (c.joints[x.jointName] === void 0) {
						const p = new ni();
						(p.matrixAutoUpdate = !1),
							(p.visible = !1),
							(c.joints[x.jointName] = p),
							c.add(p);
					}
					const g = c.joints[x.jointName];
					y !== null &&
						(g.matrix.fromArray(y.transform.matrix),
						g.matrix.decompose(g.position, g.rotation, g.scale),
						(g.jointRadius = y.radius)),
						(g.visible = y !== null);
				}
				const h = c.joints["index-finger-tip"],
					u = c.joints["thumb-tip"],
					d = h.position.distanceTo(u.position),
					f = 0.02,
					m = 0.005;
				c.inputState.pinching && d > f + m
					? ((c.inputState.pinching = !1),
					  this.dispatchEvent({
							type: "pinchend",
							handedness: e.handedness,
							target: this
					  }))
					: !c.inputState.pinching &&
					  d <= f - m &&
					  ((c.inputState.pinching = !0),
					  this.dispatchEvent({
							type: "pinchstart",
							handedness: e.handedness,
							target: this
					  }));
			} else
				l !== null &&
					e.gripSpace &&
					((r = t.getPose(e.gripSpace, n)),
					r !== null &&
						(l.matrix.fromArray(r.transform.matrix),
						l.matrix.decompose(l.position, l.rotation, l.scale),
						r.linearVelocity
							? ((l.hasLinearVelocity = !0), l.linearVelocity.copy(r.linearVelocity))
							: (l.hasLinearVelocity = !1),
						r.angularVelocity
							? ((l.hasAngularVelocity = !0),
							  l.angularVelocity.copy(r.angularVelocity))
							: (l.hasAngularVelocity = !1)));
		return (
			a !== null && (a.visible = i !== null),
			l !== null && (l.visible = r !== null),
			c !== null && (c.visible = o !== null),
			this
		);
	}
}
class co extends dt {
	constructor(e, t, n, i, r, o, a, l, c, h) {
		if (((h = h !== void 0 ? h : Ln), h !== Ln && h !== li))
			throw new Error(
				"DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"
			);
		n === void 0 && h === Ln && (n = $i),
			n === void 0 && h === li && (n = ri),
			super(null, i, r, o, a, l, h, n, c),
			(this.image = { width: e, height: t }),
			(this.magFilter = a !== void 0 ? a : et),
			(this.minFilter = l !== void 0 ? l : et),
			(this.flipY = !1),
			(this.generateMipmaps = !1);
	}
}
co.prototype.isDepthTexture = !0;
class a0 extends bn {
	constructor(e, t) {
		super();
		const n = this;
		let i = null,
			r = 1,
			o = null,
			a = "local-floor";
		const l = e.extensions.has("WEBGL_multisampled_render_to_texture");
		let c = null,
			h = null,
			u = null,
			d = null,
			f = !1,
			m = null;
		const x = t.getContextAttributes();
		let y = null,
			g = null;
		const p = [],
			M = new Map(),
			v = new pt();
		v.layers.enable(1), (v.viewport = new We());
		const _ = new pt();
		_.layers.enable(2), (_.viewport = new We());
		const E = [v, _],
			A = new pl();
		A.layers.enable(1), A.layers.enable(2);
		let D = null,
			H = null;
		(this.cameraAutoUpdate = !0),
			(this.enabled = !1),
			(this.isPresenting = !1),
			(this.getController = function (Z) {
				let K = p[Z];
				return K === void 0 && ((K = new da()), (p[Z] = K)), K.getTargetRaySpace();
			}),
			(this.getControllerGrip = function (Z) {
				let K = p[Z];
				return K === void 0 && ((K = new da()), (p[Z] = K)), K.getGripSpace();
			}),
			(this.getHand = function (Z) {
				let K = p[Z];
				return K === void 0 && ((K = new da()), (p[Z] = K)), K.getHandSpace();
			});
		function I(Z) {
			const K = M.get(Z.inputSource);
			K && K.dispatchEvent({ type: Z.type, data: Z.inputSource });
		}
		function b() {
			M.forEach(function (Z, K) {
				Z.disconnect(K);
			}),
				M.clear(),
				(D = null),
				(H = null),
				e.setRenderTarget(y),
				(d = null),
				(u = null),
				(h = null),
				(i = null),
				(g = null),
				ae.stop(),
				(n.isPresenting = !1),
				n.dispatchEvent({ type: "sessionend" });
		}
		(this.setFramebufferScaleFactor = function (Z) {
			(r = Z),
				n.isPresenting === !0 &&
					console.warn(
						"THREE.WebXRManager: Cannot change framebuffer scale while presenting."
					);
		}),
			(this.setReferenceSpaceType = function (Z) {
				(a = Z),
					n.isPresenting === !0 &&
						console.warn(
							"THREE.WebXRManager: Cannot change reference space type while presenting."
						);
			}),
			(this.getReferenceSpace = function () {
				return o;
			}),
			(this.getBaseLayer = function () {
				return u !== null ? u : d;
			}),
			(this.getBinding = function () {
				return h;
			}),
			(this.getFrame = function () {
				return m;
			}),
			(this.getSession = function () {
				return i;
			}),
			(this.setSession = async function (Z) {
				if (((i = Z), i !== null)) {
					if (
						((y = e.getRenderTarget()),
						i.addEventListener("select", I),
						i.addEventListener("selectstart", I),
						i.addEventListener("selectend", I),
						i.addEventListener("squeeze", I),
						i.addEventListener("squeezestart", I),
						i.addEventListener("squeezeend", I),
						i.addEventListener("end", b),
						i.addEventListener("inputsourceschange", L),
						x.xrCompatible !== !0 && (await t.makeXRCompatible()),
						i.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1)
					) {
						const K = {
							antialias: i.renderState.layers === void 0 ? x.antialias : !0,
							alpha: x.alpha,
							depth: x.depth,
							stencil: x.stencil,
							framebufferScaleFactor: r
						};
						(d = new XRWebGLLayer(i, t, K)),
							i.updateRenderState({ baseLayer: d }),
							(g = new ut(d.framebufferWidth, d.framebufferHeight, {
								format: ct,
								type: mn,
								encoding: e.outputEncoding
							}));
					} else {
						f = x.antialias;
						let K = null,
							le = null,
							ge = null;
						x.depth &&
							((ge = x.stencil ? 35056 : 33190),
							(K = x.stencil ? li : Ln),
							(le = x.stencil ? ri : $i));
						const _e = {
							colorFormat: e.outputEncoding === $e ? 35907 : 32856,
							depthFormat: ge,
							scaleFactor: r
						};
						(h = new XRWebGLBinding(i, t)),
							(u = h.createProjectionLayer(_e)),
							i.updateRenderState({ layers: [u] }),
							f
								? (g = new xo(u.textureWidth, u.textureHeight, {
										format: ct,
										type: mn,
										depthTexture: new co(
											u.textureWidth,
											u.textureHeight,
											le,
											void 0,
											void 0,
											void 0,
											void 0,
											void 0,
											void 0,
											K
										),
										stencilBuffer: x.stencil,
										ignoreDepth: u.ignoreDepthValues,
										useRenderToTexture: l,
										encoding: e.outputEncoding
								  }))
								: (g = new ut(u.textureWidth, u.textureHeight, {
										format: ct,
										type: mn,
										depthTexture: new co(
											u.textureWidth,
											u.textureHeight,
											le,
											void 0,
											void 0,
											void 0,
											void 0,
											void 0,
											void 0,
											K
										),
										stencilBuffer: x.stencil,
										ignoreDepth: u.ignoreDepthValues,
										encoding: e.outputEncoding
								  }));
					}
					(g.isXRRenderTarget = !0),
						this.setFoveation(1),
						(o = await i.requestReferenceSpace(a)),
						ae.setContext(i),
						ae.start(),
						(n.isPresenting = !0),
						n.dispatchEvent({ type: "sessionstart" });
				}
			});
		function L(Z) {
			const K = i.inputSources;
			for (let le = 0; le < p.length; le++) M.set(K[le], p[le]);
			for (let le = 0; le < Z.removed.length; le++) {
				const ge = Z.removed[le],
					_e = M.get(ge);
				_e && (_e.dispatchEvent({ type: "disconnected", data: ge }), M.delete(ge));
			}
			for (let le = 0; le < Z.added.length; le++) {
				const ge = Z.added[le],
					_e = M.get(ge);
				_e && _e.dispatchEvent({ type: "connected", data: ge });
			}
		}
		const F = new w(),
			B = new w();
		function O(Z, K, le) {
			F.setFromMatrixPosition(K.matrixWorld),
				B.setFromMatrixPosition(le.matrixWorld);
			const ge = F.distanceTo(B),
				_e = K.projectionMatrix.elements,
				V = le.projectionMatrix.elements,
				Ne = _e[14] / (_e[10] - 1),
				ve = _e[14] / (_e[10] + 1),
				Ee = (_e[9] + 1) / _e[5],
				ue = (_e[9] - 1) / _e[5],
				Le = (_e[8] - 1) / _e[0],
				Te = (V[8] + 1) / V[0],
				j = Ne * Le,
				ie = Ne * Te,
				te = ge / (-Le + Te),
				he = te * -Le;
			K.matrixWorld.decompose(Z.position, Z.quaternion, Z.scale),
				Z.translateX(he),
				Z.translateZ(te),
				Z.matrixWorld.compose(Z.position, Z.quaternion, Z.scale),
				Z.matrixWorldInverse.copy(Z.matrixWorld).invert();
			const oe = Ne + te,
				we = ve + te,
				Ae = j - he,
				Be = ie + (ge - he),
				qe = ((Ee * ve) / we) * oe,
				ke = ((ue * ve) / we) * oe;
			Z.projectionMatrix.makePerspective(Ae, Be, qe, ke, oe, we);
		}
		function N(Z, K) {
			K === null
				? Z.matrixWorld.copy(Z.matrix)
				: Z.matrixWorld.multiplyMatrices(K.matrixWorld, Z.matrix),
				Z.matrixWorldInverse.copy(Z.matrixWorld).invert();
		}
		(this.updateCamera = function (Z) {
			if (i === null) return;
			(A.near = _.near = v.near = Z.near),
				(A.far = _.far = v.far = Z.far),
				(D !== A.near || H !== A.far) &&
					(i.updateRenderState({ depthNear: A.near, depthFar: A.far }),
					(D = A.near),
					(H = A.far));
			const K = Z.parent,
				le = A.cameras;
			N(A, K);
			for (let _e = 0; _e < le.length; _e++) N(le[_e], K);
			A.matrixWorld.decompose(A.position, A.quaternion, A.scale),
				Z.position.copy(A.position),
				Z.quaternion.copy(A.quaternion),
				Z.scale.copy(A.scale),
				Z.matrix.copy(A.matrix),
				Z.matrixWorld.copy(A.matrixWorld);
			const ge = Z.children;
			for (let _e = 0, V = ge.length; _e < V; _e++) ge[_e].updateMatrixWorld(!0);
			le.length === 2 ? O(A, v, _) : A.projectionMatrix.copy(v.projectionMatrix);
		}),
			(this.getCamera = function () {
				return A;
			}),
			(this.getFoveation = function () {
				if (u !== null) return u.fixedFoveation;
				if (d !== null) return d.fixedFoveation;
			}),
			(this.setFoveation = function (Z) {
				u !== null && (u.fixedFoveation = Z),
					d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = Z);
			});
		let X = null;
		function Q(Z, K) {
			if (((c = K.getViewerPose(o)), (m = K), c !== null)) {
				const ge = c.views;
				d !== null &&
					(e.setRenderTargetFramebuffer(g, d.framebuffer), e.setRenderTarget(g));
				let _e = !1;
				ge.length !== A.cameras.length && ((A.cameras.length = 0), (_e = !0));
				for (let V = 0; V < ge.length; V++) {
					const Ne = ge[V];
					let ve = null;
					if (d !== null) ve = d.getViewport(Ne);
					else {
						const ue = h.getViewSubImage(u, Ne);
						(ve = ue.viewport),
							V === 0 &&
								(e.setRenderTargetTextures(
									g,
									ue.colorTexture,
									u.ignoreDepthValues ? void 0 : ue.depthStencilTexture
								),
								e.setRenderTarget(g));
					}
					const Ee = E[V];
					Ee.matrix.fromArray(Ne.transform.matrix),
						Ee.projectionMatrix.fromArray(Ne.projectionMatrix),
						Ee.viewport.set(ve.x, ve.y, ve.width, ve.height),
						V === 0 && A.matrix.copy(Ee.matrix),
						_e === !0 && A.cameras.push(Ee);
				}
			}
			const le = i.inputSources;
			for (let ge = 0; ge < p.length; ge++) {
				const _e = p[ge],
					V = le[ge];
				_e.update(V, K, o);
			}
			X && X(Z, K), (m = null);
		}
		const ae = new zu();
		ae.setAnimationLoop(Q),
			(this.setAnimationLoop = function (Z) {
				X = Z;
			}),
			(this.dispose = function () {});
	}
}
function l0(s) {
	function e(g, p) {
		g.fogColor.value.copy(p.color),
			p.isFog
				? ((g.fogNear.value = p.near), (g.fogFar.value = p.far))
				: p.isFogExp2 && (g.fogDensity.value = p.density);
	}
	function t(g, p, M, v, _) {
		p.isMeshBasicMaterial
			? n(g, p)
			: p.isMeshLambertMaterial
			? (n(g, p), l(g, p))
			: p.isMeshToonMaterial
			? (n(g, p), h(g, p))
			: p.isMeshPhongMaterial
			? (n(g, p), c(g, p))
			: p.isMeshStandardMaterial
			? (n(g, p), p.isMeshPhysicalMaterial ? d(g, p, _) : u(g, p))
			: p.isMeshMatcapMaterial
			? (n(g, p), f(g, p))
			: p.isMeshDepthMaterial
			? (n(g, p), m(g, p))
			: p.isMeshDistanceMaterial
			? (n(g, p), x(g, p))
			: p.isMeshNormalMaterial
			? (n(g, p), y(g, p))
			: p.isLineBasicMaterial
			? (i(g, p), p.isLineDashedMaterial && r(g, p))
			: p.isPointsMaterial
			? o(g, p, M, v)
			: p.isSpriteMaterial
			? a(g, p)
			: p.isShadowMaterial
			? (g.color.value.copy(p.color), (g.opacity.value = p.opacity))
			: p.isShaderMaterial && (p.uniformsNeedUpdate = !1);
	}
	function n(g, p) {
		(g.opacity.value = p.opacity),
			p.color && g.diffuse.value.copy(p.color),
			p.emissive &&
				g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),
			p.map && (g.map.value = p.map),
			p.alphaMap && (g.alphaMap.value = p.alphaMap),
			p.specularMap && (g.specularMap.value = p.specularMap),
			p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest);
		const M = s.get(p).envMap;
		M &&
			((g.envMap.value = M),
			(g.flipEnvMap.value =
				M.isCubeTexture && M.isRenderTargetTexture === !1 ? -1 : 1),
			(g.reflectivity.value = p.reflectivity),
			(g.ior.value = p.ior),
			(g.refractionRatio.value = p.refractionRatio)),
			p.lightMap &&
				((g.lightMap.value = p.lightMap),
				(g.lightMapIntensity.value = p.lightMapIntensity)),
			p.aoMap &&
				((g.aoMap.value = p.aoMap), (g.aoMapIntensity.value = p.aoMapIntensity));
		let v;
		p.map
			? (v = p.map)
			: p.specularMap
			? (v = p.specularMap)
			: p.displacementMap
			? (v = p.displacementMap)
			: p.normalMap
			? (v = p.normalMap)
			: p.bumpMap
			? (v = p.bumpMap)
			: p.roughnessMap
			? (v = p.roughnessMap)
			: p.metalnessMap
			? (v = p.metalnessMap)
			: p.alphaMap
			? (v = p.alphaMap)
			: p.emissiveMap
			? (v = p.emissiveMap)
			: p.clearcoatMap
			? (v = p.clearcoatMap)
			: p.clearcoatNormalMap
			? (v = p.clearcoatNormalMap)
			: p.clearcoatRoughnessMap
			? (v = p.clearcoatRoughnessMap)
			: p.specularIntensityMap
			? (v = p.specularIntensityMap)
			: p.specularColorMap
			? (v = p.specularColorMap)
			: p.transmissionMap
			? (v = p.transmissionMap)
			: p.thicknessMap
			? (v = p.thicknessMap)
			: p.sheenColorMap
			? (v = p.sheenColorMap)
			: p.sheenRoughnessMap && (v = p.sheenRoughnessMap),
			v !== void 0 &&
				(v.isWebGLRenderTarget && (v = v.texture),
				v.matrixAutoUpdate === !0 && v.updateMatrix(),
				g.uvTransform.value.copy(v.matrix));
		let _;
		p.aoMap ? (_ = p.aoMap) : p.lightMap && (_ = p.lightMap),
			_ !== void 0 &&
				(_.isWebGLRenderTarget && (_ = _.texture),
				_.matrixAutoUpdate === !0 && _.updateMatrix(),
				g.uv2Transform.value.copy(_.matrix));
	}
	function i(g, p) {
		g.diffuse.value.copy(p.color), (g.opacity.value = p.opacity);
	}
	function r(g, p) {
		(g.dashSize.value = p.dashSize),
			(g.totalSize.value = p.dashSize + p.gapSize),
			(g.scale.value = p.scale);
	}
	function o(g, p, M, v) {
		g.diffuse.value.copy(p.color),
			(g.opacity.value = p.opacity),
			(g.size.value = p.size * M),
			(g.scale.value = v * 0.5),
			p.map && (g.map.value = p.map),
			p.alphaMap && (g.alphaMap.value = p.alphaMap),
			p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest);
		let _;
		p.map ? (_ = p.map) : p.alphaMap && (_ = p.alphaMap),
			_ !== void 0 &&
				(_.matrixAutoUpdate === !0 && _.updateMatrix(),
				g.uvTransform.value.copy(_.matrix));
	}
	function a(g, p) {
		g.diffuse.value.copy(p.color),
			(g.opacity.value = p.opacity),
			(g.rotation.value = p.rotation),
			p.map && (g.map.value = p.map),
			p.alphaMap && (g.alphaMap.value = p.alphaMap),
			p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest);
		let M;
		p.map ? (M = p.map) : p.alphaMap && (M = p.alphaMap),
			M !== void 0 &&
				(M.matrixAutoUpdate === !0 && M.updateMatrix(),
				g.uvTransform.value.copy(M.matrix));
	}
	function l(g, p) {
		p.emissiveMap && (g.emissiveMap.value = p.emissiveMap);
	}
	function c(g, p) {
		g.specular.value.copy(p.specular),
			(g.shininess.value = Math.max(p.shininess, 1e-4)),
			p.emissiveMap && (g.emissiveMap.value = p.emissiveMap),
			p.bumpMap &&
				((g.bumpMap.value = p.bumpMap),
				(g.bumpScale.value = p.bumpScale),
				p.side === lt && (g.bumpScale.value *= -1)),
			p.normalMap &&
				((g.normalMap.value = p.normalMap),
				g.normalScale.value.copy(p.normalScale),
				p.side === lt && g.normalScale.value.negate()),
			p.displacementMap &&
				((g.displacementMap.value = p.displacementMap),
				(g.displacementScale.value = p.displacementScale),
				(g.displacementBias.value = p.displacementBias));
	}
	function h(g, p) {
		p.gradientMap && (g.gradientMap.value = p.gradientMap),
			p.emissiveMap && (g.emissiveMap.value = p.emissiveMap),
			p.bumpMap &&
				((g.bumpMap.value = p.bumpMap),
				(g.bumpScale.value = p.bumpScale),
				p.side === lt && (g.bumpScale.value *= -1)),
			p.normalMap &&
				((g.normalMap.value = p.normalMap),
				g.normalScale.value.copy(p.normalScale),
				p.side === lt && g.normalScale.value.negate()),
			p.displacementMap &&
				((g.displacementMap.value = p.displacementMap),
				(g.displacementScale.value = p.displacementScale),
				(g.displacementBias.value = p.displacementBias));
	}
	function u(g, p) {
		(g.roughness.value = p.roughness),
			(g.metalness.value = p.metalness),
			p.roughnessMap && (g.roughnessMap.value = p.roughnessMap),
			p.metalnessMap && (g.metalnessMap.value = p.metalnessMap),
			p.emissiveMap && (g.emissiveMap.value = p.emissiveMap),
			p.bumpMap &&
				((g.bumpMap.value = p.bumpMap),
				(g.bumpScale.value = p.bumpScale),
				p.side === lt && (g.bumpScale.value *= -1)),
			p.normalMap &&
				((g.normalMap.value = p.normalMap),
				g.normalScale.value.copy(p.normalScale),
				p.side === lt && g.normalScale.value.negate()),
			p.displacementMap &&
				((g.displacementMap.value = p.displacementMap),
				(g.displacementScale.value = p.displacementScale),
				(g.displacementBias.value = p.displacementBias)),
			s.get(p).envMap && (g.envMapIntensity.value = p.envMapIntensity);
	}
	function d(g, p, M) {
		u(g, p),
			(g.ior.value = p.ior),
			p.sheen > 0 &&
				(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),
				(g.sheenRoughness.value = p.sheenRoughness),
				p.sheenColorMap && (g.sheenColorMap.value = p.sheenColorMap),
				p.sheenRoughnessMap && (g.sheenRoughnessMap.value = p.sheenRoughnessMap)),
			p.clearcoat > 0 &&
				((g.clearcoat.value = p.clearcoat),
				(g.clearcoatRoughness.value = p.clearcoatRoughness),
				p.clearcoatMap && (g.clearcoatMap.value = p.clearcoatMap),
				p.clearcoatRoughnessMap &&
					(g.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap),
				p.clearcoatNormalMap &&
					(g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),
					(g.clearcoatNormalMap.value = p.clearcoatNormalMap),
					p.side === lt && g.clearcoatNormalScale.value.negate())),
			p.transmission > 0 &&
				((g.transmission.value = p.transmission),
				(g.transmissionSamplerMap.value = M.texture),
				g.transmissionSamplerSize.value.set(M.width, M.height),
				p.transmissionMap && (g.transmissionMap.value = p.transmissionMap),
				(g.thickness.value = p.thickness),
				p.thicknessMap && (g.thicknessMap.value = p.thicknessMap),
				(g.attenuationDistance.value = p.attenuationDistance),
				g.attenuationColor.value.copy(p.attenuationColor)),
			(g.specularIntensity.value = p.specularIntensity),
			g.specularColor.value.copy(p.specularColor),
			p.specularIntensityMap &&
				(g.specularIntensityMap.value = p.specularIntensityMap),
			p.specularColorMap && (g.specularColorMap.value = p.specularColorMap);
	}
	function f(g, p) {
		p.matcap && (g.matcap.value = p.matcap),
			p.bumpMap &&
				((g.bumpMap.value = p.bumpMap),
				(g.bumpScale.value = p.bumpScale),
				p.side === lt && (g.bumpScale.value *= -1)),
			p.normalMap &&
				((g.normalMap.value = p.normalMap),
				g.normalScale.value.copy(p.normalScale),
				p.side === lt && g.normalScale.value.negate()),
			p.displacementMap &&
				((g.displacementMap.value = p.displacementMap),
				(g.displacementScale.value = p.displacementScale),
				(g.displacementBias.value = p.displacementBias));
	}
	function m(g, p) {
		p.displacementMap &&
			((g.displacementMap.value = p.displacementMap),
			(g.displacementScale.value = p.displacementScale),
			(g.displacementBias.value = p.displacementBias));
	}
	function x(g, p) {
		p.displacementMap &&
			((g.displacementMap.value = p.displacementMap),
			(g.displacementScale.value = p.displacementScale),
			(g.displacementBias.value = p.displacementBias)),
			g.referencePosition.value.copy(p.referencePosition),
			(g.nearDistance.value = p.nearDistance),
			(g.farDistance.value = p.farDistance);
	}
	function y(g, p) {
		p.bumpMap &&
			((g.bumpMap.value = p.bumpMap),
			(g.bumpScale.value = p.bumpScale),
			p.side === lt && (g.bumpScale.value *= -1)),
			p.normalMap &&
				((g.normalMap.value = p.normalMap),
				g.normalScale.value.copy(p.normalScale),
				p.side === lt && g.normalScale.value.negate()),
			p.displacementMap &&
				((g.displacementMap.value = p.displacementMap),
				(g.displacementScale.value = p.displacementScale),
				(g.displacementBias.value = p.displacementBias));
	}
	return { refreshFogUniforms: e, refreshMaterialUniforms: t };
}
function c0() {
	const s = Gr("canvas");
	return (s.style.display = "block"), s;
}
function Ze(s = {}) {
	const e = s.canvas !== void 0 ? s.canvas : c0(),
		t = s.context !== void 0 ? s.context : null,
		n = s.alpha !== void 0 ? s.alpha : !1,
		i = s.depth !== void 0 ? s.depth : !0,
		r = s.stencil !== void 0 ? s.stencil : !0,
		o = s.antialias !== void 0 ? s.antialias : !1,
		a = s.premultipliedAlpha !== void 0 ? s.premultipliedAlpha : !0,
		l = s.preserveDrawingBuffer !== void 0 ? s.preserveDrawingBuffer : !1,
		c = s.powerPreference !== void 0 ? s.powerPreference : "default",
		h =
			s.failIfMajorPerformanceCaveat !== void 0
				? s.failIfMajorPerformanceCaveat
				: !1;
	let u = null,
		d = null;
	const f = [],
		m = [];
	(this.domElement = e),
		(this.debug = { checkShaderErrors: !0 }),
		(this.autoClear = !0),
		(this.autoClearColor = !0),
		(this.autoClearDepth = !0),
		(this.autoClearStencil = !0),
		(this.sortObjects = !0),
		(this.clippingPlanes = []),
		(this.localClippingEnabled = !1),
		(this.outputEncoding = gn),
		(this.physicallyCorrectLights = !1),
		(this.toneMapping = pn),
		(this.toneMappingExposure = 1);
	const x = this;
	let y = !1,
		g = 0,
		p = 0,
		M = null,
		v = -1,
		_ = null;
	const E = new We(),
		A = new We();
	let D = null,
		H = e.width,
		I = e.height,
		b = 1,
		L = null,
		F = null;
	const B = new We(0, 0, H, I),
		O = new We(0, 0, H, I);
	let N = !1;
	const X = new Qr();
	let Q = !1,
		ae = !1,
		Z = null;
	const K = new pe(),
		le = new w(),
		ge = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		};
	function _e() {
		return M === null ? b : 1;
	}
	let V = t;
	function Ne(T, z) {
		for (let k = 0; k < T.length; k++) {
			const U = T[k],
				$ = e.getContext(U, z);
			if ($ !== null) return $;
		}
		return null;
	}
	try {
		const T = {
			alpha: !0,
			depth: i,
			stencil: r,
			antialias: o,
			premultipliedAlpha: a,
			preserveDrawingBuffer: l,
			powerPreference: c,
			failIfMajorPerformanceCaveat: h
		};
		if (
			("setAttribute" in e && e.setAttribute("data-engine", `three.js r${po}`),
			e.addEventListener("webglcontextlost", me, !1),
			e.addEventListener("webglcontextrestored", P, !1),
			V === null)
		) {
			const z = ["webgl2", "webgl", "experimental-webgl"];
			if ((x.isWebGL1Renderer === !0 && z.shift(), (V = Ne(z, T)), V === null))
				throw Ne(z)
					? new Error("Error creating WebGL context with your selected attributes.")
					: new Error("Error creating WebGL context.");
		}
		V.getShaderPrecisionFormat === void 0 &&
			(V.getShaderPrecisionFormat = function () {
				return { rangeMin: 1, rangeMax: 1, precision: 1 };
			});
	} catch (T) {
		throw (console.error("THREE.WebGLRenderer: " + T.message), T);
	}
	let ve,
		Ee,
		ue,
		Le,
		Te,
		j,
		ie,
		te,
		he,
		oe,
		we,
		Ae,
		Be,
		qe,
		ke,
		C,
		S,
		J,
		ne,
		xe,
		Y,
		be,
		R;
	function W() {
		(ve = new Rg(V)),
			(Ee = new wg(V, ve, s)),
			ve.init(Ee),
			(be = new Yu(V, ve, Ee)),
			(ue = new r0(V, ve, Ee)),
			(Le = new Dg()),
			(Te = new Yx()),
			(j = new s0(V, ve, ue, Te, Ee, be, Le)),
			(ie = new Tg(x)),
			(te = new Cg(x)),
			(he = new Yf(V, Ee)),
			(R = new bg(V, ve, he, Ee)),
			(oe = new Lg(V, he, Le, R)),
			(we = new zg(V, oe, he, Le)),
			(ne = new Bg(V, Ee, j)),
			(C = new Sg(Te)),
			(Ae = new Xx(x, ie, te, ve, Ee, R, C)),
			(Be = new l0(Te)),
			(qe = new Jx()),
			(ke = new t0(ve, Ee)),
			(J = new _g(x, ie, ue, we, n, a)),
			(S = new Xu(x, we, Ee)),
			(xe = new Mg(V, ve, Le, Ee)),
			(Y = new Pg(V, ve, Le, Ee)),
			(Le.programs = Ae.programs),
			(x.capabilities = Ee),
			(x.extensions = ve),
			(x.properties = Te),
			(x.renderLists = qe),
			(x.shadowMap = S),
			(x.state = ue),
			(x.info = Le);
	}
	W();
	const ee = new a0(x, V);
	(this.xr = ee),
		(this.getContext = function () {
			return V;
		}),
		(this.getContextAttributes = function () {
			return V.getContextAttributes();
		}),
		(this.forceContextLoss = function () {
			const T = ve.get("WEBGL_lose_context");
			T && T.loseContext();
		}),
		(this.forceContextRestore = function () {
			const T = ve.get("WEBGL_lose_context");
			T && T.restoreContext();
		}),
		(this.getPixelRatio = function () {
			return b;
		}),
		(this.setPixelRatio = function (T) {
			T !== void 0 && ((b = T), this.setSize(H, I, !1));
		}),
		(this.getSize = function (T) {
			return T.set(H, I);
		}),
		(this.setSize = function (T, z, k) {
			if (ee.isPresenting) {
				console.warn(
					"THREE.WebGLRenderer: Can't change size while VR device is presenting."
				);
				return;
			}
			(H = T),
				(I = z),
				(e.width = Math.floor(T * b)),
				(e.height = Math.floor(z * b)),
				k !== !1 && ((e.style.width = T + "px"), (e.style.height = z + "px")),
				this.setViewport(0, 0, T, z);
		}),
		(this.getDrawingBufferSize = function (T) {
			return T.set(H * b, I * b).floor();
		}),
		(this.setDrawingBufferSize = function (T, z, k) {
			(H = T),
				(I = z),
				(b = k),
				(e.width = Math.floor(T * k)),
				(e.height = Math.floor(z * k)),
				this.setViewport(0, 0, T, z);
		}),
		(this.getCurrentViewport = function (T) {
			return T.copy(E);
		}),
		(this.getViewport = function (T) {
			return T.copy(B);
		}),
		(this.setViewport = function (T, z, k, U) {
			T.isVector4 ? B.set(T.x, T.y, T.z, T.w) : B.set(T, z, k, U),
				ue.viewport(E.copy(B).multiplyScalar(b).floor());
		}),
		(this.getScissor = function (T) {
			return T.copy(O);
		}),
		(this.setScissor = function (T, z, k, U) {
			T.isVector4 ? O.set(T.x, T.y, T.z, T.w) : O.set(T, z, k, U),
				ue.scissor(A.copy(O).multiplyScalar(b).floor());
		}),
		(this.getScissorTest = function () {
			return N;
		}),
		(this.setScissorTest = function (T) {
			ue.setScissorTest((N = T));
		}),
		(this.setOpaqueSort = function (T) {
			L = T;
		}),
		(this.setTransparentSort = function (T) {
			F = T;
		}),
		(this.getClearColor = function (T) {
			return T.copy(J.getClearColor());
		}),
		(this.setClearColor = function () {
			J.setClearColor.apply(J, arguments);
		}),
		(this.getClearAlpha = function () {
			return J.getClearAlpha();
		}),
		(this.setClearAlpha = function () {
			J.setClearAlpha.apply(J, arguments);
		}),
		(this.clear = function (T, z, k) {
			let U = 0;
			(T === void 0 || T) && (U |= 16384),
				(z === void 0 || z) && (U |= 256),
				(k === void 0 || k) && (U |= 1024),
				V.clear(U);
		}),
		(this.clearColor = function () {
			this.clear(!0, !1, !1);
		}),
		(this.clearDepth = function () {
			this.clear(!1, !0, !1);
		}),
		(this.clearStencil = function () {
			this.clear(!1, !1, !0);
		}),
		(this.dispose = function () {
			e.removeEventListener("webglcontextlost", me, !1),
				e.removeEventListener("webglcontextrestored", P, !1),
				qe.dispose(),
				ke.dispose(),
				Te.dispose(),
				ie.dispose(),
				te.dispose(),
				we.dispose(),
				R.dispose(),
				Ae.dispose(),
				ee.dispose(),
				ee.removeEventListener("sessionstart", ze),
				ee.removeEventListener("sessionend", Qe),
				Z && (Z.dispose(), (Z = null)),
				Lt.stop();
		});
	function me(T) {
		T.preventDefault(),
			console.log("THREE.WebGLRenderer: Context Lost."),
			(y = !0);
	}
	function P() {
		console.log("THREE.WebGLRenderer: Context Restored."), (y = !1);
		const T = Le.autoReset,
			z = S.enabled,
			k = S.autoUpdate,
			U = S.needsUpdate,
			$ = S.type;
		W(),
			(Le.autoReset = T),
			(S.enabled = z),
			(S.autoUpdate = k),
			(S.needsUpdate = U),
			(S.type = $);
	}
	function de(T) {
		const z = T.target;
		z.removeEventListener("dispose", de), ce(z);
	}
	function ce(T) {
		Se(T), Te.remove(T);
	}
	function Se(T) {
		const z = Te.get(T).programs;
		z !== void 0 &&
			(z.forEach(function (k) {
				Ae.releaseProgram(k);
			}),
			T.isShaderMaterial && Ae.releaseShaderCache(T));
	}
	(this.renderBufferDirect = function (T, z, k, U, $, Ce) {
		z === null && (z = ge);
		const Re = $.isMesh && $.matrixWorld.determinant() < 0,
			De = zd(T, z, k, U, $);
		ue.setMaterial(U, Re);
		let Pe = k.index;
		const Xe = k.attributes.position;
		if (Pe === null) {
			if (Xe === void 0 || Xe.count === 0) return;
		} else if (Pe.count === 0) return;
		let Ue = 1;
		U.wireframe === !0 && ((Pe = oe.getWireframeAttribute(k)), (Ue = 2)),
			R.setup($, U, De, k, Pe);
		let Ge,
			it = xe;
		Pe !== null && ((Ge = he.get(Pe)), (it = Y), it.setIndex(Ge));
		const Gn = Pe !== null ? Pe.count : Xe.count,
			Ti = k.drawRange.start * Ue,
			Ve = k.drawRange.count * Ue,
			Yt = Ce !== null ? Ce.start * Ue : 0,
			ft = Ce !== null ? Ce.count * Ue : 1 / 0,
			Zt = Math.max(Ti, Yt),
			ls = Math.min(Gn, Ti + Ve, Yt + ft) - 1,
			Jt = Math.max(0, ls - Zt + 1);
		if (Jt !== 0) {
			if ($.isMesh)
				U.wireframe === !0
					? (ue.setLineWidth(U.wireframeLinewidth * _e()), it.setMode(1))
					: it.setMode(4);
			else if ($.isLine) {
				let sn = U.linewidth;
				sn === void 0 && (sn = 1),
					ue.setLineWidth(sn * _e()),
					$.isLineSegments
						? it.setMode(1)
						: $.isLineLoop
						? it.setMode(2)
						: it.setMode(3);
			} else $.isPoints ? it.setMode(0) : $.isSprite && it.setMode(4);
			if ($.isInstancedMesh) it.renderInstances(Zt, Jt, $.count);
			else if (k.isInstancedBufferGeometry) {
				const sn = Math.min(k.instanceCount, k._maxInstanceCount);
				it.renderInstances(Zt, Jt, sn);
			} else it.render(Zt, Jt);
		}
	}),
		(this.compile = function (T, z) {
			(d = ke.get(T)),
				d.init(),
				m.push(d),
				T.traverseVisible(function (k) {
					k.isLight &&
						k.layers.test(z.layers) &&
						(d.pushLight(k), k.castShadow && d.pushShadow(k));
				}),
				d.setupLights(x.physicallyCorrectLights),
				T.traverse(function (k) {
					const U = k.material;
					if (U)
						if (Array.isArray(U))
							for (let $ = 0; $ < U.length; $++) {
								const Ce = U[$];
								Go(Ce, T, k);
							}
						else Go(U, T, k);
				}),
				m.pop(),
				(d = null);
		});
	let q = null;
	function ye(T) {
		q && q(T);
	}
	function ze() {
		Lt.stop();
	}
	function Qe() {
		Lt.start();
	}
	const Lt = new zu();
	Lt.setAnimationLoop(ye),
		typeof window != "undefined" && Lt.setContext(window),
		(this.setAnimationLoop = function (T) {
			(q = T), ee.setAnimationLoop(T), T === null ? Lt.stop() : Lt.start();
		}),
		ee.addEventListener("sessionstart", ze),
		ee.addEventListener("sessionend", Qe),
		(this.render = function (T, z) {
			if (z !== void 0 && z.isCamera !== !0) {
				console.error(
					"THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
				);
				return;
			}
			if (y === !0) return;
			T.autoUpdate === !0 && T.updateMatrixWorld(),
				z.parent === null && z.updateMatrixWorld(),
				ee.enabled === !0 &&
					ee.isPresenting === !0 &&
					(ee.cameraAutoUpdate === !0 && ee.updateCamera(z), (z = ee.getCamera())),
				T.isScene === !0 && T.onBeforeRender(x, T, z, M),
				(d = ke.get(T, m.length)),
				d.init(),
				m.push(d),
				K.multiplyMatrices(z.projectionMatrix, z.matrixWorldInverse),
				X.setFromProjectionMatrix(K),
				(ae = this.localClippingEnabled),
				(Q = C.init(this.clippingPlanes, ae, z)),
				(u = qe.get(T, f.length)),
				u.init(),
				f.push(u),
				nt(T, z, 0, x.sortObjects),
				u.finish(),
				x.sortObjects === !0 && u.sort(L, F),
				Q === !0 && C.beginShadows();
			const k = d.state.shadowsArray;
			if (
				(S.render(k, T, z),
				Q === !0 && C.endShadows(),
				this.info.autoReset === !0 && this.info.reset(),
				J.render(u, T),
				d.setupLights(x.physicallyCorrectLights),
				z.isArrayCamera)
			) {
				const U = z.cameras;
				for (let $ = 0, Ce = U.length; $ < Ce; $++) {
					const Re = U[$];
					Xt(u, T, Re, Re.viewport);
				}
			} else Xt(u, T, z);
			M !== null &&
				(j.updateMultisampleRenderTarget(M), j.updateRenderTargetMipmap(M)),
				T.isScene === !0 && T.onAfterRender(x, T, z),
				ue.buffers.depth.setTest(!0),
				ue.buffers.depth.setMask(!0),
				ue.buffers.color.setMask(!0),
				ue.setPolygonOffset(!1),
				R.resetDefaultState(),
				(v = -1),
				(_ = null),
				m.pop(),
				m.length > 0 ? (d = m[m.length - 1]) : (d = null),
				f.pop(),
				f.length > 0 ? (u = f[f.length - 1]) : (u = null);
		});
	function nt(T, z, k, U) {
		if (T.visible === !1) return;
		if (T.layers.test(z.layers)) {
			if (T.isGroup) k = T.renderOrder;
			else if (T.isLOD) T.autoUpdate === !0 && T.update(z);
			else if (T.isLight) d.pushLight(T), T.castShadow && d.pushShadow(T);
			else if (T.isSprite) {
				if (!T.frustumCulled || X.intersectsSprite(T)) {
					U && le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);
					const Re = we.update(T),
						De = T.material;
					De.visible && u.push(T, Re, De, k, le.z, null);
				}
			} else if (
				(T.isMesh || T.isLine || T.isPoints) &&
				(T.isSkinnedMesh &&
					T.skeleton.frame !== Le.render.frame &&
					(T.skeleton.update(), (T.skeleton.frame = Le.render.frame)),
				!T.frustumCulled || X.intersectsObject(T))
			) {
				U && le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);
				const Re = we.update(T),
					De = T.material;
				if (Array.isArray(De)) {
					const Pe = Re.groups;
					for (let Xe = 0, Ue = Pe.length; Xe < Ue; Xe++) {
						const Ge = Pe[Xe],
							it = De[Ge.materialIndex];
						it && it.visible && u.push(T, Re, it, k, le.z, Ge);
					}
				} else De.visible && u.push(T, Re, De, k, le.z, null);
			}
		}
		const Ce = T.children;
		for (let Re = 0, De = Ce.length; Re < De; Re++) nt(Ce[Re], z, k, U);
	}
	function Xt(T, z, k, U) {
		const $ = T.opaque,
			Ce = T.transmissive,
			Re = T.transparent;
		d.setupLightsView(k),
			Ce.length > 0 && rn($, z, k),
			U && ue.viewport(E.copy(U)),
			$.length > 0 && as($, z, k),
			Ce.length > 0 && as(Ce, z, k),
			Re.length > 0 && as(Re, z, k);
	}
	function rn(T, z, k) {
		if (Z === null) {
			const Re = o === !0 && Ee.isWebGL2 === !0 ? xo : ut;
			Z = new Re(1024, 1024, {
				generateMipmaps: !0,
				type: be.convert(ii) !== null ? ii : mn,
				minFilter: xi,
				magFilter: et,
				wrapS: wt,
				wrapT: wt,
				useRenderToTexture: ve.has("WEBGL_multisampled_render_to_texture")
			});
		}
		const U = x.getRenderTarget();
		x.setRenderTarget(Z), x.clear();
		const $ = x.toneMapping;
		(x.toneMapping = pn),
			as(T, z, k),
			(x.toneMapping = $),
			j.updateMultisampleRenderTarget(Z),
			j.updateRenderTargetMipmap(Z),
			x.setRenderTarget(U);
	}
	function as(T, z, k) {
		const U = z.isScene === !0 ? z.overrideMaterial : null;
		for (let $ = 0, Ce = T.length; $ < Ce; $++) {
			const Re = T[$],
				De = Re.object,
				Pe = Re.geometry,
				Xe = U === null ? Re.material : U,
				Ue = Re.group;
			De.layers.test(k.layers) && Bd(De, z, k, Pe, Xe, Ue);
		}
	}
	function Bd(T, z, k, U, $, Ce) {
		T.onBeforeRender(x, z, k, U, $, Ce),
			T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, T.matrixWorld),
			T.normalMatrix.getNormalMatrix(T.modelViewMatrix),
			$.onBeforeRender(x, z, k, U, T, Ce),
			$.transparent === !0 && $.side === In
				? (($.side = lt),
				  ($.needsUpdate = !0),
				  x.renderBufferDirect(k, z, U, $, T, Ce),
				  ($.side = ai),
				  ($.needsUpdate = !0),
				  x.renderBufferDirect(k, z, U, $, T, Ce),
				  ($.side = In))
				: x.renderBufferDirect(k, z, U, $, T, Ce),
			T.onAfterRender(x, z, k, U, $, Ce);
	}
	function Go(T, z, k) {
		z.isScene !== !0 && (z = ge);
		const U = Te.get(T),
			$ = d.state.lights,
			Ce = d.state.shadowsArray,
			Re = $.state.version,
			De = Ae.getParameters(T, $.state, Ce, z, k),
			Pe = Ae.getProgramCacheKey(De);
		let Xe = U.programs;
		(U.environment = T.isMeshStandardMaterial ? z.environment : null),
			(U.fog = z.fog),
			(U.envMap = (T.isMeshStandardMaterial ? te : ie).get(
				T.envMap || U.environment
			)),
			Xe === void 0 &&
				(T.addEventListener("dispose", de), (Xe = new Map()), (U.programs = Xe));
		let Ue = Xe.get(Pe);
		if (Ue !== void 0) {
			if (U.currentProgram === Ue && U.lightsStateVersion === Re)
				return jl(T, De), Ue;
		} else
			(De.uniforms = Ae.getUniforms(T)),
				T.onBuild(k, De, x),
				T.onBeforeCompile(De, x),
				(Ue = Ae.acquireProgram(De, Pe)),
				Xe.set(Pe, Ue),
				(U.uniforms = De.uniforms);
		const Ge = U.uniforms;
		((!T.isShaderMaterial && !T.isRawShaderMaterial) || T.clipping === !0) &&
			(Ge.clippingPlanes = C.uniform),
			jl(T, De),
			(U.needsLights = Od(T)),
			(U.lightsStateVersion = Re),
			U.needsLights &&
				((Ge.ambientLightColor.value = $.state.ambient),
				(Ge.lightProbe.value = $.state.probe),
				(Ge.directionalLights.value = $.state.directional),
				(Ge.directionalLightShadows.value = $.state.directionalShadow),
				(Ge.spotLights.value = $.state.spot),
				(Ge.spotLightShadows.value = $.state.spotShadow),
				(Ge.rectAreaLights.value = $.state.rectArea),
				(Ge.ltc_1.value = $.state.rectAreaLTC1),
				(Ge.ltc_2.value = $.state.rectAreaLTC2),
				(Ge.pointLights.value = $.state.point),
				(Ge.pointLightShadows.value = $.state.pointShadow),
				(Ge.hemisphereLights.value = $.state.hemi),
				(Ge.directionalShadowMap.value = $.state.directionalShadowMap),
				(Ge.directionalShadowMatrix.value = $.state.directionalShadowMatrix),
				(Ge.spotShadowMap.value = $.state.spotShadowMap),
				(Ge.spotShadowMatrix.value = $.state.spotShadowMatrix),
				(Ge.pointShadowMap.value = $.state.pointShadowMap),
				(Ge.pointShadowMatrix.value = $.state.pointShadowMatrix));
		const it = Ue.getUniforms(),
			Gn = Dn.seqWithValue(it.seq, Ge);
		return (U.currentProgram = Ue), (U.uniformsList = Gn), Ue;
	}
	function jl(T, z) {
		const k = Te.get(T);
		(k.outputEncoding = z.outputEncoding),
			(k.instancing = z.instancing),
			(k.skinning = z.skinning),
			(k.morphTargets = z.morphTargets),
			(k.morphNormals = z.morphNormals),
			(k.morphTargetsCount = z.morphTargetsCount),
			(k.numClippingPlanes = z.numClippingPlanes),
			(k.numIntersection = z.numClipIntersection),
			(k.vertexAlphas = z.vertexAlphas),
			(k.vertexTangents = z.vertexTangents),
			(k.toneMapping = z.toneMapping);
	}
	function zd(T, z, k, U, $) {
		z.isScene !== !0 && (z = ge), j.resetTextureUnits();
		const Ce = z.fog,
			Re = U.isMeshStandardMaterial ? z.environment : null,
			De =
				M === null
					? x.outputEncoding
					: M.isXRRenderTarget === !0
					? M.texture.encoding
					: gn,
			Pe = (U.isMeshStandardMaterial ? te : ie).get(U.envMap || Re),
			Xe =
				U.vertexColors === !0 &&
				!!k.attributes.color &&
				k.attributes.color.itemSize === 4,
			Ue = !!U.normalMap && !!k.attributes.tangent,
			Ge = !!k.morphAttributes.position,
			it = !!k.morphAttributes.normal,
			Gn = k.morphAttributes.position ? k.morphAttributes.position.length : 0,
			Ti = U.toneMapped ? x.toneMapping : pn,
			Ve = Te.get(U),
			Yt = d.state.lights;
		if (Q === !0 && (ae === !0 || T !== _)) {
			const Ot = T === _ && U.id === v;
			C.setState(U, T, Ot);
		}
		let ft = !1;
		U.version === Ve.__version
			? ((Ve.needsLights && Ve.lightsStateVersion !== Yt.state.version) ||
					Ve.outputEncoding !== De ||
					($.isInstancedMesh && Ve.instancing === !1) ||
					(!$.isInstancedMesh && Ve.instancing === !0) ||
					($.isSkinnedMesh && Ve.skinning === !1) ||
					(!$.isSkinnedMesh && Ve.skinning === !0) ||
					Ve.envMap !== Pe ||
					(U.fog && Ve.fog !== Ce) ||
					(Ve.numClippingPlanes !== void 0 &&
						(Ve.numClippingPlanes !== C.numPlanes ||
							Ve.numIntersection !== C.numIntersection)) ||
					Ve.vertexAlphas !== Xe ||
					Ve.vertexTangents !== Ue ||
					Ve.morphTargets !== Ge ||
					Ve.morphNormals !== it ||
					Ve.toneMapping !== Ti ||
					(Ee.isWebGL2 === !0 && Ve.morphTargetsCount !== Gn)) &&
			  (ft = !0)
			: ((ft = !0), (Ve.__version = U.version));
		let Zt = Ve.currentProgram;
		ft === !0 && (Zt = Go(U, z, $));
		let ls = !1,
			Jt = !1,
			sn = !1;
		const St = Zt.getUniforms(),
			yr = Ve.uniforms;
		if (
			(ue.useProgram(Zt.program) && ((ls = !0), (Jt = !0), (sn = !0)),
			U.id !== v && ((v = U.id), (Jt = !0)),
			ls || _ !== T)
		) {
			if (
				(St.setValue(V, "projectionMatrix", T.projectionMatrix),
				Ee.logarithmicDepthBuffer &&
					St.setValue(V, "logDepthBufFC", 2 / (Math.log(T.far + 1) / Math.LN2)),
				_ !== T && ((_ = T), (Jt = !0), (sn = !0)),
				U.isShaderMaterial ||
					U.isMeshPhongMaterial ||
					U.isMeshToonMaterial ||
					U.isMeshStandardMaterial ||
					U.envMap)
			) {
				const Ot = St.map.cameraPosition;
				Ot !== void 0 && Ot.setValue(V, le.setFromMatrixPosition(T.matrixWorld));
			}
			(U.isMeshPhongMaterial ||
				U.isMeshToonMaterial ||
				U.isMeshLambertMaterial ||
				U.isMeshBasicMaterial ||
				U.isMeshStandardMaterial ||
				U.isShaderMaterial) &&
				St.setValue(V, "isOrthographic", T.isOrthographicCamera === !0),
				(U.isMeshPhongMaterial ||
					U.isMeshToonMaterial ||
					U.isMeshLambertMaterial ||
					U.isMeshBasicMaterial ||
					U.isMeshStandardMaterial ||
					U.isShaderMaterial ||
					U.isShadowMaterial ||
					$.isSkinnedMesh) &&
					St.setValue(V, "viewMatrix", T.matrixWorldInverse);
		}
		if ($.isSkinnedMesh) {
			St.setOptional(V, $, "bindMatrix"),
				St.setOptional(V, $, "bindMatrixInverse");
			const Ot = $.skeleton;
			Ot &&
				(Ee.floatVertexTextures
					? (Ot.boneTexture === null && Ot.computeBoneTexture(),
					  St.setValue(V, "boneTexture", Ot.boneTexture, j),
					  St.setValue(V, "boneTextureSize", Ot.boneTextureSize))
					: St.setOptional(V, Ot, "boneMatrices"));
		}
		return (
			!!k &&
				(k.morphAttributes.position !== void 0 ||
					k.morphAttributes.normal !== void 0) &&
				ne.update($, k, U, Zt),
			(Jt || Ve.receiveShadow !== $.receiveShadow) &&
				((Ve.receiveShadow = $.receiveShadow),
				St.setValue(V, "receiveShadow", $.receiveShadow)),
			Jt &&
				(St.setValue(V, "toneMappingExposure", x.toneMappingExposure),
				Ve.needsLights && Nd(yr, sn),
				Ce && U.fog && Be.refreshFogUniforms(yr, Ce),
				Be.refreshMaterialUniforms(yr, U, b, I, Z),
				Dn.upload(V, Ve.uniformsList, yr, j)),
			U.isShaderMaterial &&
				U.uniformsNeedUpdate === !0 &&
				(Dn.upload(V, Ve.uniformsList, yr, j), (U.uniformsNeedUpdate = !1)),
			U.isSpriteMaterial && St.setValue(V, "center", $.center),
			St.setValue(V, "modelViewMatrix", $.modelViewMatrix),
			St.setValue(V, "normalMatrix", $.normalMatrix),
			St.setValue(V, "modelMatrix", $.matrixWorld),
			Zt
		);
	}
	function Nd(T, z) {
		(T.ambientLightColor.needsUpdate = z),
			(T.lightProbe.needsUpdate = z),
			(T.directionalLights.needsUpdate = z),
			(T.directionalLightShadows.needsUpdate = z),
			(T.pointLights.needsUpdate = z),
			(T.pointLightShadows.needsUpdate = z),
			(T.spotLights.needsUpdate = z),
			(T.spotLightShadows.needsUpdate = z),
			(T.rectAreaLights.needsUpdate = z),
			(T.hemisphereLights.needsUpdate = z);
	}
	function Od(T) {
		return (
			T.isMeshLambertMaterial ||
			T.isMeshToonMaterial ||
			T.isMeshPhongMaterial ||
			T.isMeshStandardMaterial ||
			T.isShadowMaterial ||
			(T.isShaderMaterial && T.lights === !0)
		);
	}
	(this.getActiveCubeFace = function () {
		return g;
	}),
		(this.getActiveMipmapLevel = function () {
			return p;
		}),
		(this.getRenderTarget = function () {
			return M;
		}),
		(this.setRenderTargetTextures = function (T, z, k) {
			(Te.get(T.texture).__webglTexture = z),
				(Te.get(T.depthTexture).__webglTexture = k);
			const U = Te.get(T);
			(U.__hasExternalTextures = !0),
				U.__hasExternalTextures &&
					((U.__autoAllocateDepthBuffer = k === void 0),
					U.__autoAllocateDepthBuffer ||
						(T.useRenderToTexture &&
							(console.warn(
								"render-to-texture extension was disabled because an external texture was provided"
							),
							(T.useRenderToTexture = !1),
							(T.useRenderbuffer = !0))));
		}),
		(this.setRenderTargetFramebuffer = function (T, z) {
			const k = Te.get(T);
			(k.__webglFramebuffer = z), (k.__useDefaultFramebuffer = z === void 0);
		}),
		(this.setRenderTarget = function (T, z = 0, k = 0) {
			(M = T), (g = z), (p = k);
			let U = !0;
			if (T) {
				const Pe = Te.get(T);
				Pe.__useDefaultFramebuffer !== void 0
					? (ue.bindFramebuffer(36160, null), (U = !1))
					: Pe.__webglFramebuffer === void 0
					? j.setupRenderTarget(T)
					: Pe.__hasExternalTextures &&
					  j.rebindTextures(
							T,
							Te.get(T.texture).__webglTexture,
							Te.get(T.depthTexture).__webglTexture
					  );
			}
			let $ = null,
				Ce = !1,
				Re = !1;
			if (T) {
				const Pe = T.texture;
				(Pe.isDataTexture3D || Pe.isDataTexture2DArray) && (Re = !0);
				const Xe = Te.get(T).__webglFramebuffer;
				T.isWebGLCubeRenderTarget
					? (($ = Xe[z]), (Ce = !0))
					: T.useRenderbuffer
					? ($ = Te.get(T).__webglMultisampledFramebuffer)
					: ($ = Xe),
					E.copy(T.viewport),
					A.copy(T.scissor),
					(D = T.scissorTest);
			} else
				E.copy(B).multiplyScalar(b).floor(),
					A.copy(O).multiplyScalar(b).floor(),
					(D = N);
			if (
				(ue.bindFramebuffer(36160, $) &&
					Ee.drawBuffers &&
					U &&
					ue.drawBuffers(T, $),
				ue.viewport(E),
				ue.scissor(A),
				ue.setScissorTest(D),
				Ce)
			) {
				const Pe = Te.get(T.texture);
				V.framebufferTexture2D(36160, 36064, 34069 + z, Pe.__webglTexture, k);
			} else if (Re) {
				const Pe = Te.get(T.texture),
					Xe = z || 0;
				V.framebufferTextureLayer(36160, 36064, Pe.__webglTexture, k || 0, Xe);
			}
			v = -1;
		}),
		(this.readRenderTargetPixels = function (T, z, k, U, $, Ce, Re) {
			if (!(T && T.isWebGLRenderTarget)) {
				console.error(
					"THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."
				);
				return;
			}
			let De = Te.get(T).__webglFramebuffer;
			if ((T.isWebGLCubeRenderTarget && Re !== void 0 && (De = De[Re]), De)) {
				ue.bindFramebuffer(36160, De);
				try {
					const Pe = T.texture,
						Xe = Pe.format,
						Ue = Pe.type;
					if (Xe !== ct && be.convert(Xe) !== V.getParameter(35739)) {
						console.error(
							"THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."
						);
						return;
					}
					const Ge =
						Ue === ii &&
						(ve.has("EXT_color_buffer_half_float") ||
							(Ee.isWebGL2 && ve.has("EXT_color_buffer_float")));
					if (
						Ue !== mn &&
						be.convert(Ue) !== V.getParameter(35738) &&
						!(
							Ue === dn &&
							(Ee.isWebGL2 ||
								ve.has("OES_texture_float") ||
								ve.has("WEBGL_color_buffer_float"))
						) &&
						!Ge
					) {
						console.error(
							"THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."
						);
						return;
					}
					V.checkFramebufferStatus(36160) === 36053
						? z >= 0 &&
						  z <= T.width - U &&
						  k >= 0 &&
						  k <= T.height - $ &&
						  V.readPixels(z, k, U, $, be.convert(Xe), be.convert(Ue), Ce)
						: console.error(
								"THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."
						  );
				} finally {
					const Pe = M !== null ? Te.get(M).__webglFramebuffer : null;
					ue.bindFramebuffer(36160, Pe);
				}
			}
		}),
		(this.copyFramebufferToTexture = function (T, z, k = 0) {
			if (z.isFramebufferTexture !== !0) {
				console.error(
					"THREE.WebGLRenderer: copyFramebufferToTexture() can only be used with FramebufferTexture."
				);
				return;
			}
			const U = Math.pow(2, -k),
				$ = Math.floor(z.image.width * U),
				Ce = Math.floor(z.image.height * U);
			j.setTexture2D(z, 0),
				V.copyTexSubImage2D(3553, k, 0, 0, T.x, T.y, $, Ce),
				ue.unbindTexture();
		}),
		(this.copyTextureToTexture = function (T, z, k, U = 0) {
			const $ = z.image.width,
				Ce = z.image.height,
				Re = be.convert(k.format),
				De = be.convert(k.type);
			j.setTexture2D(k, 0),
				V.pixelStorei(37440, k.flipY),
				V.pixelStorei(37441, k.premultiplyAlpha),
				V.pixelStorei(3317, k.unpackAlignment),
				z.isDataTexture
					? V.texSubImage2D(3553, U, T.x, T.y, $, Ce, Re, De, z.image.data)
					: z.isCompressedTexture
					? V.compressedTexSubImage2D(
							3553,
							U,
							T.x,
							T.y,
							z.mipmaps[0].width,
							z.mipmaps[0].height,
							Re,
							z.mipmaps[0].data
					  )
					: V.texSubImage2D(3553, U, T.x, T.y, Re, De, z.image),
				U === 0 && k.generateMipmaps && V.generateMipmap(3553),
				ue.unbindTexture();
		}),
		(this.copyTextureToTexture3D = function (T, z, k, U, $ = 0) {
			if (x.isWebGL1Renderer) {
				console.warn(
					"THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2."
				);
				return;
			}
			const Ce = T.max.x - T.min.x + 1,
				Re = T.max.y - T.min.y + 1,
				De = T.max.z - T.min.z + 1,
				Pe = be.convert(U.format),
				Xe = be.convert(U.type);
			let Ue;
			if (U.isDataTexture3D) j.setTexture3D(U, 0), (Ue = 32879);
			else if (U.isDataTexture2DArray) j.setTexture2DArray(U, 0), (Ue = 35866);
			else {
				console.warn(
					"THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray."
				);
				return;
			}
			V.pixelStorei(37440, U.flipY),
				V.pixelStorei(37441, U.premultiplyAlpha),
				V.pixelStorei(3317, U.unpackAlignment);
			const Ge = V.getParameter(3314),
				it = V.getParameter(32878),
				Gn = V.getParameter(3316),
				Ti = V.getParameter(3315),
				Ve = V.getParameter(32877),
				Yt = k.isCompressedTexture ? k.mipmaps[0] : k.image;
			V.pixelStorei(3314, Yt.width),
				V.pixelStorei(32878, Yt.height),
				V.pixelStorei(3316, T.min.x),
				V.pixelStorei(3315, T.min.y),
				V.pixelStorei(32877, T.min.z),
				k.isDataTexture || k.isDataTexture3D
					? V.texSubImage3D(Ue, $, z.x, z.y, z.z, Ce, Re, De, Pe, Xe, Yt.data)
					: k.isCompressedTexture
					? (console.warn(
							"THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."
					  ),
					  V.compressedTexSubImage3D(Ue, $, z.x, z.y, z.z, Ce, Re, De, Pe, Yt.data))
					: V.texSubImage3D(Ue, $, z.x, z.y, z.z, Ce, Re, De, Pe, Xe, Yt),
				V.pixelStorei(3314, Ge),
				V.pixelStorei(32878, it),
				V.pixelStorei(3316, Gn),
				V.pixelStorei(3315, Ti),
				V.pixelStorei(32877, Ve),
				$ === 0 && U.generateMipmaps && V.generateMipmap(Ue),
				ue.unbindTexture();
		}),
		(this.initTexture = function (T) {
			j.setTexture2D(T, 0), ue.unbindTexture();
		}),
		(this.resetState = function () {
			(g = 0), (p = 0), (M = null), ue.reset(), R.reset();
		}),
		typeof __THREE_DEVTOOLS__ != "undefined" &&
			__THREE_DEVTOOLS__.dispatchEvent(
				new CustomEvent("observe", { detail: this })
			);
}
Ze.prototype.isWebGLRenderer = !0;
class Zu extends Ze {}
Zu.prototype.isWebGL1Renderer = !0;
class es {
	constructor(e, t = 25e-5) {
		(this.name = ""), (this.color = new re(e)), (this.density = t);
	}
	clone() {
		return new es(this.color, this.density);
	}
	toJSON() {
		return { type: "FogExp2", color: this.color.getHex(), density: this.density };
	}
}
es.prototype.isFogExp2 = !0;
class ts {
	constructor(e, t = 1, n = 1e3) {
		(this.name = ""), (this.color = new re(e)), (this.near = t), (this.far = n);
	}
	clone() {
		return new ts(this.color, this.near, this.far);
	}
	toJSON() {
		return {
			type: "Fog",
			color: this.color.getHex(),
			near: this.near,
			far: this.far
		};
	}
}
ts.prototype.isFog = !0;
class Ao extends Fe {
	constructor() {
		super(),
			(this.type = "Scene"),
			(this.background = null),
			(this.environment = null),
			(this.fog = null),
			(this.overrideMaterial = null),
			(this.autoUpdate = !0),
			typeof __THREE_DEVTOOLS__ != "undefined" &&
				__THREE_DEVTOOLS__.dispatchEvent(
					new CustomEvent("observe", { detail: this })
				);
	}
	copy(e, t) {
		return (
			super.copy(e, t),
			e.background !== null && (this.background = e.background.clone()),
			e.environment !== null && (this.environment = e.environment.clone()),
			e.fog !== null && (this.fog = e.fog.clone()),
			e.overrideMaterial !== null &&
				(this.overrideMaterial = e.overrideMaterial.clone()),
			(this.autoUpdate = e.autoUpdate),
			(this.matrixAutoUpdate = e.matrixAutoUpdate),
			this
		);
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), t;
	}
}
Ao.prototype.isScene = !0;
class bi {
	constructor(e, t) {
		(this.array = e),
			(this.stride = t),
			(this.count = e !== void 0 ? e.length / t : 0),
			(this.usage = Ki),
			(this.updateRange = { offset: 0, count: -1 }),
			(this.version = 0),
			(this.uuid = It());
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return (this.usage = e), this;
	}
	copy(e) {
		return (
			(this.array = new e.array.constructor(e.array)),
			(this.count = e.count),
			(this.stride = e.stride),
			(this.usage = e.usage),
			this
		);
	}
	copyAt(e, t, n) {
		(e *= this.stride), (n *= t.stride);
		for (let i = 0, r = this.stride; i < r; i++)
			this.array[e + i] = t.array[n + i];
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	clone(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {}),
			this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = It()),
			e.arrayBuffers[this.array.buffer._uuid] === void 0 &&
				(e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
		const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),
			n = new this.constructor(t, this.stride);
		return n.setUsage(this.usage), n;
	}
	onUpload(e) {
		return (this.onUploadCallback = e), this;
	}
	toJSON(e) {
		return (
			e.arrayBuffers === void 0 && (e.arrayBuffers = {}),
			this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = It()),
			e.arrayBuffers[this.array.buffer._uuid] === void 0 &&
				(e.arrayBuffers[this.array.buffer._uuid] = Array.prototype.slice.call(
					new Uint32Array(this.array.buffer)
				)),
			{
				uuid: this.uuid,
				buffer: this.array.buffer._uuid,
				type: this.array.constructor.name,
				stride: this.stride
			}
		);
	}
}
bi.prototype.isInterleavedBuffer = !0;
const ot = new w();
class Fn {
	constructor(e, t, n, i = !1) {
		(this.name = ""),
			(this.data = e),
			(this.itemSize = t),
			(this.offset = n),
			(this.normalized = i === !0);
	}
	get count() {
		return this.data.count;
	}
	get array() {
		return this.data.array;
	}
	set needsUpdate(e) {
		this.data.needsUpdate = e;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.data.count; t < n; t++)
			(ot.x = this.getX(t)),
				(ot.y = this.getY(t)),
				(ot.z = this.getZ(t)),
				ot.applyMatrix4(e),
				this.setXYZ(t, ot.x, ot.y, ot.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++)
			(ot.x = this.getX(t)),
				(ot.y = this.getY(t)),
				(ot.z = this.getZ(t)),
				ot.applyNormalMatrix(e),
				this.setXYZ(t, ot.x, ot.y, ot.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++)
			(ot.x = this.getX(t)),
				(ot.y = this.getY(t)),
				(ot.z = this.getZ(t)),
				ot.transformDirection(e),
				this.setXYZ(t, ot.x, ot.y, ot.z);
		return this;
	}
	setX(e, t) {
		return (this.data.array[e * this.data.stride + this.offset] = t), this;
	}
	setY(e, t) {
		return (this.data.array[e * this.data.stride + this.offset + 1] = t), this;
	}
	setZ(e, t) {
		return (this.data.array[e * this.data.stride + this.offset + 2] = t), this;
	}
	setW(e, t) {
		return (this.data.array[e * this.data.stride + this.offset + 3] = t), this;
	}
	getX(e) {
		return this.data.array[e * this.data.stride + this.offset];
	}
	getY(e) {
		return this.data.array[e * this.data.stride + this.offset + 1];
	}
	getZ(e) {
		return this.data.array[e * this.data.stride + this.offset + 2];
	}
	getW(e) {
		return this.data.array[e * this.data.stride + this.offset + 3];
	}
	setXY(e, t, n) {
		return (
			(e = e * this.data.stride + this.offset),
			(this.data.array[e + 0] = t),
			(this.data.array[e + 1] = n),
			this
		);
	}
	setXYZ(e, t, n, i) {
		return (
			(e = e * this.data.stride + this.offset),
			(this.data.array[e + 0] = t),
			(this.data.array[e + 1] = n),
			(this.data.array[e + 2] = i),
			this
		);
	}
	setXYZW(e, t, n, i, r) {
		return (
			(e = e * this.data.stride + this.offset),
			(this.data.array[e + 0] = t),
			(this.data.array[e + 1] = n),
			(this.data.array[e + 2] = i),
			(this.data.array[e + 3] = r),
			this
		);
	}
	clone(e) {
		if (e === void 0) {
			console.log(
				"THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data."
			);
			const t = [];
			for (let n = 0; n < this.count; n++) {
				const i = n * this.data.stride + this.offset;
				for (let r = 0; r < this.itemSize; r++) t.push(this.data.array[i + r]);
			}
			return new Oe(new this.array.constructor(t), this.itemSize, this.normalized);
		} else
			return (
				e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}),
				e.interleavedBuffers[this.data.uuid] === void 0 &&
					(e.interleavedBuffers[this.data.uuid] = this.data.clone(e)),
				new Fn(
					e.interleavedBuffers[this.data.uuid],
					this.itemSize,
					this.offset,
					this.normalized
				)
			);
	}
	toJSON(e) {
		if (e === void 0) {
			console.log(
				"THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data."
			);
			const t = [];
			for (let n = 0; n < this.count; n++) {
				const i = n * this.data.stride + this.offset;
				for (let r = 0; r < this.itemSize; r++) t.push(this.data.array[i + r]);
			}
			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: t,
				normalized: this.normalized
			};
		} else
			return (
				e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}),
				e.interleavedBuffers[this.data.uuid] === void 0 &&
					(e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)),
				{
					isInterleavedBufferAttribute: !0,
					itemSize: this.itemSize,
					data: this.data.uuid,
					offset: this.offset,
					normalized: this.normalized
				}
			);
	}
}
Fn.prototype.isInterleavedBufferAttribute = !0;
class Co extends yt {
	constructor(e) {
		super(),
			(this.type = "SpriteMaterial"),
			(this.color = new re(16777215)),
			(this.map = null),
			(this.alphaMap = null),
			(this.rotation = 0),
			(this.sizeAttenuation = !0),
			(this.transparent = !0),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			(this.map = e.map),
			(this.alphaMap = e.alphaMap),
			(this.rotation = e.rotation),
			(this.sizeAttenuation = e.sizeAttenuation),
			this
		);
	}
}
Co.prototype.isSpriteMaterial = !0;
let Gi;
const wr = new w(),
	ki = new w(),
	Vi = new w(),
	Wi = new G(),
	Sr = new G(),
	Ju = new pe(),
	Ls = new w(),
	Tr = new w(),
	Ps = new w(),
	Pc = new G(),
	fa = new G(),
	Dc = new G();
class Ro extends Fe {
	constructor(e) {
		if ((super(), (this.type = "Sprite"), Gi === void 0)) {
			Gi = new Me();
			const t = new Float32Array([
					-0.5,
					-0.5,
					0,
					0,
					0,
					0.5,
					-0.5,
					0,
					1,
					0,
					0.5,
					0.5,
					0,
					1,
					1,
					-0.5,
					0.5,
					0,
					0,
					1
				]),
				n = new bi(t, 5);
			Gi.setIndex([0, 1, 2, 0, 2, 3]),
				Gi.setAttribute("position", new Fn(n, 3, 0, !1)),
				Gi.setAttribute("uv", new Fn(n, 2, 3, !1));
		}
		(this.geometry = Gi),
			(this.material = e !== void 0 ? e : new Co()),
			(this.center = new G(0.5, 0.5));
	}
	raycast(e, t) {
		e.camera === null &&
			console.error(
				'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
			),
			ki.setFromMatrixScale(this.matrixWorld),
			Ju.copy(e.camera.matrixWorld),
			this.modelViewMatrix.multiplyMatrices(
				e.camera.matrixWorldInverse,
				this.matrixWorld
			),
			Vi.setFromMatrixPosition(this.modelViewMatrix),
			e.camera.isPerspectiveCamera &&
				this.material.sizeAttenuation === !1 &&
				ki.multiplyScalar(-Vi.z);
		const n = this.material.rotation;
		let i, r;
		n !== 0 && ((r = Math.cos(n)), (i = Math.sin(n)));
		const o = this.center;
		Ds(Ls.set(-0.5, -0.5, 0), Vi, o, ki, i, r),
			Ds(Tr.set(0.5, -0.5, 0), Vi, o, ki, i, r),
			Ds(Ps.set(0.5, 0.5, 0), Vi, o, ki, i, r),
			Pc.set(0, 0),
			fa.set(1, 0),
			Dc.set(1, 1);
		let a = e.ray.intersectTriangle(Ls, Tr, Ps, !1, wr);
		if (
			a === null &&
			(Ds(Tr.set(-0.5, 0.5, 0), Vi, o, ki, i, r),
			fa.set(0, 1),
			(a = e.ray.intersectTriangle(Ls, Ps, Tr, !1, wr)),
			a === null)
		)
			return;
		const l = e.ray.origin.distanceTo(wr);
		l < e.near ||
			l > e.far ||
			t.push({
				distance: l,
				point: wr.clone(),
				uv: st.getUV(wr, Ls, Tr, Ps, Pc, fa, Dc, new G()),
				face: null,
				object: this
			});
	}
	copy(e) {
		return (
			super.copy(e),
			e.center !== void 0 && this.center.copy(e.center),
			(this.material = e.material),
			this
		);
	}
}
Ro.prototype.isSprite = !0;
function Ds(s, e, t, n, i, r) {
	Wi.subVectors(s, t).addScalar(0.5).multiply(n),
		i !== void 0
			? ((Sr.x = r * Wi.x - i * Wi.y), (Sr.y = i * Wi.x + r * Wi.y))
			: Sr.copy(Wi),
		s.copy(e),
		(s.x += Sr.x),
		(s.y += Sr.y),
		s.applyMatrix4(Ju);
}
const Is = new w(),
	Ic = new w();
class ju extends Fe {
	constructor() {
		super(),
			(this._currentLevel = 0),
			(this.type = "LOD"),
			Object.defineProperties(this, {
				levels: { enumerable: !0, value: [] },
				isLOD: { value: !0 }
			}),
			(this.autoUpdate = !0);
	}
	copy(e) {
		super.copy(e, !1);
		const t = e.levels;
		for (let n = 0, i = t.length; n < i; n++) {
			const r = t[n];
			this.addLevel(r.object.clone(), r.distance);
		}
		return (this.autoUpdate = e.autoUpdate), this;
	}
	addLevel(e, t = 0) {
		t = Math.abs(t);
		const n = this.levels;
		let i;
		for (i = 0; i < n.length && !(t < n[i].distance); i++);
		return n.splice(i, 0, { distance: t, object: e }), this.add(e), this;
	}
	getCurrentLevel() {
		return this._currentLevel;
	}
	getObjectForDistance(e) {
		const t = this.levels;
		if (t.length > 0) {
			let n, i;
			for (n = 1, i = t.length; n < i && !(e < t[n].distance); n++);
			return t[n - 1].object;
		}
		return null;
	}
	raycast(e, t) {
		if (this.levels.length > 0) {
			Is.setFromMatrixPosition(this.matrixWorld);
			const i = e.ray.origin.distanceTo(Is);
			this.getObjectForDistance(i).raycast(e, t);
		}
	}
	update(e) {
		const t = this.levels;
		if (t.length > 1) {
			Is.setFromMatrixPosition(e.matrixWorld),
				Ic.setFromMatrixPosition(this.matrixWorld);
			const n = Is.distanceTo(Ic) / e.zoom;
			t[0].object.visible = !0;
			let i, r;
			for (i = 1, r = t.length; i < r && n >= t[i].distance; i++)
				(t[i - 1].object.visible = !1), (t[i].object.visible = !0);
			for (this._currentLevel = i - 1; i < r; i++) t[i].object.visible = !1;
		}
	}
	toJSON(e) {
		const t = super.toJSON(e);
		this.autoUpdate === !1 && (t.object.autoUpdate = !1), (t.object.levels = []);
		const n = this.levels;
		for (let i = 0, r = n.length; i < r; i++) {
			const o = n[i];
			t.object.levels.push({ object: o.object.uuid, distance: o.distance });
		}
		return t;
	}
}
const Fc = new w(),
	Bc = new We(),
	zc = new We(),
	h0 = new w(),
	Nc = new pe();
class Lo extends je {
	constructor(e, t) {
		super(e, t),
			(this.type = "SkinnedMesh"),
			(this.bindMode = "attached"),
			(this.bindMatrix = new pe()),
			(this.bindMatrixInverse = new pe());
	}
	copy(e) {
		return (
			super.copy(e),
			(this.bindMode = e.bindMode),
			this.bindMatrix.copy(e.bindMatrix),
			this.bindMatrixInverse.copy(e.bindMatrixInverse),
			(this.skeleton = e.skeleton),
			this
		);
	}
	bind(e, t) {
		(this.skeleton = e),
			t === void 0 &&
				(this.updateMatrixWorld(!0),
				this.skeleton.calculateInverses(),
				(t = this.matrixWorld)),
			this.bindMatrix.copy(t),
			this.bindMatrixInverse.copy(t).invert();
	}
	pose() {
		this.skeleton.pose();
	}
	normalizeSkinWeights() {
		const e = new We(),
			t = this.geometry.attributes.skinWeight;
		for (let n = 0, i = t.count; n < i; n++) {
			(e.x = t.getX(n)), (e.y = t.getY(n)), (e.z = t.getZ(n)), (e.w = t.getW(n));
			const r = 1 / e.manhattanLength();
			r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0),
				t.setXYZW(n, e.x, e.y, e.z, e.w);
		}
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e),
			this.bindMode === "attached"
				? this.bindMatrixInverse.copy(this.matrixWorld).invert()
				: this.bindMode === "detached"
				? this.bindMatrixInverse.copy(this.bindMatrix).invert()
				: console.warn(
						"THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode
				  );
	}
	boneTransform(e, t) {
		const n = this.skeleton,
			i = this.geometry;
		Bc.fromBufferAttribute(i.attributes.skinIndex, e),
			zc.fromBufferAttribute(i.attributes.skinWeight, e),
			Fc.copy(t).applyMatrix4(this.bindMatrix),
			t.set(0, 0, 0);
		for (let r = 0; r < 4; r++) {
			const o = zc.getComponent(r);
			if (o !== 0) {
				const a = Bc.getComponent(r);
				Nc.multiplyMatrices(n.bones[a].matrixWorld, n.boneInverses[a]),
					t.addScaledVector(h0.copy(Fc).applyMatrix4(Nc), o);
			}
		}
		return t.applyMatrix4(this.bindMatrixInverse);
	}
}
Lo.prototype.isSkinnedMesh = !0;
class Po extends Fe {
	constructor() {
		super(), (this.type = "Bone");
	}
}
Po.prototype.isBone = !0;
class oi extends dt {
	constructor(e = null, t = 1, n = 1, i, r, o, a, l, c = et, h = et, u, d) {
		super(null, o, a, l, c, h, i, r, u, d),
			(this.image = { data: e, width: t, height: n }),
			(this.magFilter = c),
			(this.minFilter = h),
			(this.generateMipmaps = !1),
			(this.flipY = !1),
			(this.unpackAlignment = 1);
	}
}
oi.prototype.isDataTexture = !0;
const Oc = new pe(),
	u0 = new pe();
class Do {
	constructor(e = [], t = []) {
		(this.uuid = It()),
			(this.bones = e.slice(0)),
			(this.boneInverses = t),
			(this.boneMatrices = null),
			(this.boneTexture = null),
			(this.boneTextureSize = 0),
			(this.frame = -1),
			this.init();
	}
	init() {
		const e = this.bones,
			t = this.boneInverses;
		if (((this.boneMatrices = new Float32Array(e.length * 16)), t.length === 0))
			this.calculateInverses();
		else if (e.length !== t.length) {
			console.warn(
				"THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."
			),
				(this.boneInverses = []);
			for (let n = 0, i = this.bones.length; n < i; n++)
				this.boneInverses.push(new pe());
		}
	}
	calculateInverses() {
		this.boneInverses.length = 0;
		for (let e = 0, t = this.bones.length; e < t; e++) {
			const n = new pe();
			this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(),
				this.boneInverses.push(n);
		}
	}
	pose() {
		for (let e = 0, t = this.bones.length; e < t; e++) {
			const n = this.bones[e];
			n && n.matrixWorld.copy(this.boneInverses[e]).invert();
		}
		for (let e = 0, t = this.bones.length; e < t; e++) {
			const n = this.bones[e];
			n &&
				(n.parent && n.parent.isBone
					? (n.matrix.copy(n.parent.matrixWorld).invert(),
					  n.matrix.multiply(n.matrixWorld))
					: n.matrix.copy(n.matrixWorld),
				n.matrix.decompose(n.position, n.quaternion, n.scale));
		}
	}
	update() {
		const e = this.bones,
			t = this.boneInverses,
			n = this.boneMatrices,
			i = this.boneTexture;
		for (let r = 0, o = e.length; r < o; r++) {
			const a = e[r] ? e[r].matrixWorld : u0;
			Oc.multiplyMatrices(a, t[r]), Oc.toArray(n, r * 16);
		}
		i !== null && (i.needsUpdate = !0);
	}
	clone() {
		return new Do(this.bones, this.boneInverses);
	}
	computeBoneTexture() {
		let e = Math.sqrt(this.bones.length * 4);
		(e = Su(e)), (e = Math.max(e, 4));
		const t = new Float32Array(e * e * 4);
		t.set(this.boneMatrices);
		const n = new oi(t, e, e, ct, dn);
		return (
			(n.needsUpdate = !0),
			(this.boneMatrices = t),
			(this.boneTexture = n),
			(this.boneTextureSize = e),
			this
		);
	}
	getBoneByName(e) {
		for (let t = 0, n = this.bones.length; t < n; t++) {
			const i = this.bones[t];
			if (i.name === e) return i;
		}
	}
	dispose() {
		this.boneTexture !== null &&
			(this.boneTexture.dispose(), (this.boneTexture = null));
	}
	fromJSON(e, t) {
		this.uuid = e.uuid;
		for (let n = 0, i = e.bones.length; n < i; n++) {
			const r = e.bones[n];
			let o = t[r];
			o === void 0 &&
				(console.warn("THREE.Skeleton: No bone found with UUID:", r),
				(o = new Po())),
				this.bones.push(o),
				this.boneInverses.push(new pe().fromArray(e.boneInverses[n]));
		}
		return this.init(), this;
	}
	toJSON() {
		const e = {
			metadata: { version: 4.5, type: "Skeleton", generator: "Skeleton.toJSON" },
			bones: [],
			boneInverses: []
		};
		e.uuid = this.uuid;
		const t = this.bones,
			n = this.boneInverses;
		for (let i = 0, r = t.length; i < r; i++) {
			const o = t[i];
			e.bones.push(o.uuid);
			const a = n[i];
			e.boneInverses.push(a.toArray());
		}
		return e;
	}
}
class hi extends Oe {
	constructor(e, t, n, i = 1) {
		typeof n == "number" &&
			((i = n),
			(n = !1),
			console.error(
				"THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument."
			)),
			super(e, t, n),
			(this.meshPerAttribute = i);
	}
	copy(e) {
		return super.copy(e), (this.meshPerAttribute = e.meshPerAttribute), this;
	}
	toJSON() {
		const e = super.toJSON();
		return (
			(e.meshPerAttribute = this.meshPerAttribute),
			(e.isInstancedBufferAttribute = !0),
			e
		);
	}
}
hi.prototype.isInstancedBufferAttribute = !0;
const Uc = new pe(),
	Hc = new pe(),
	Fs = [],
	Er = new je();
class Io extends je {
	constructor(e, t, n) {
		super(e, t),
			(this.instanceMatrix = new hi(new Float32Array(n * 16), 16)),
			(this.instanceColor = null),
			(this.count = n),
			(this.frustumCulled = !1);
	}
	copy(e) {
		return (
			super.copy(e),
			this.instanceMatrix.copy(e.instanceMatrix),
			e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()),
			(this.count = e.count),
			this
		);
	}
	getColorAt(e, t) {
		t.fromArray(this.instanceColor.array, e * 3);
	}
	getMatrixAt(e, t) {
		t.fromArray(this.instanceMatrix.array, e * 16);
	}
	raycast(e, t) {
		const n = this.matrixWorld,
			i = this.count;
		if (
			((Er.geometry = this.geometry),
			(Er.material = this.material),
			Er.material !== void 0)
		)
			for (let r = 0; r < i; r++) {
				this.getMatrixAt(r, Uc),
					Hc.multiplyMatrices(n, Uc),
					(Er.matrixWorld = Hc),
					Er.raycast(e, Fs);
				for (let o = 0, a = Fs.length; o < a; o++) {
					const l = Fs[o];
					(l.instanceId = r), (l.object = this), t.push(l);
				}
				Fs.length = 0;
			}
	}
	setColorAt(e, t) {
		this.instanceColor === null &&
			(this.instanceColor = new hi(
				new Float32Array(this.instanceMatrix.count * 3),
				3
			)),
			t.toArray(this.instanceColor.array, e * 3);
	}
	setMatrixAt(e, t) {
		t.toArray(this.instanceMatrix.array, e * 16);
	}
	updateMorphTargets() {}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}
Io.prototype.isInstancedMesh = !0;
class vt extends yt {
	constructor(e) {
		super(),
			(this.type = "LineBasicMaterial"),
			(this.color = new re(16777215)),
			(this.linewidth = 1),
			(this.linecap = "round"),
			(this.linejoin = "round"),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			(this.linewidth = e.linewidth),
			(this.linecap = e.linecap),
			(this.linejoin = e.linejoin),
			this
		);
	}
}
vt.prototype.isLineBasicMaterial = !0;
const Gc = new w(),
	kc = new w(),
	Vc = new pe(),
	pa = new Un(),
	Bs = new On();
class yn extends Fe {
	constructor(e = new Me(), t = new vt()) {
		super(),
			(this.type = "Line"),
			(this.geometry = e),
			(this.material = t),
			this.updateMorphTargets();
	}
	copy(e) {
		return (
			super.copy(e),
			(this.material = e.material),
			(this.geometry = e.geometry),
			this
		);
	}
	computeLineDistances() {
		const e = this.geometry;
		if (e.isBufferGeometry)
			if (e.index === null) {
				const t = e.attributes.position,
					n = [0];
				for (let i = 1, r = t.count; i < r; i++)
					Gc.fromBufferAttribute(t, i - 1),
						kc.fromBufferAttribute(t, i),
						(n[i] = n[i - 1]),
						(n[i] += Gc.distanceTo(kc));
				e.setAttribute("lineDistance", new fe(n, 1));
			} else
				console.warn(
					"THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
				);
		else
			e.isGeometry &&
				console.error(
					"THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
				);
		return this;
	}
	raycast(e, t) {
		const n = this.geometry,
			i = this.matrixWorld,
			r = e.params.Line.threshold,
			o = n.drawRange;
		if (
			(n.boundingSphere === null && n.computeBoundingSphere(),
			Bs.copy(n.boundingSphere),
			Bs.applyMatrix4(i),
			(Bs.radius += r),
			e.ray.intersectsSphere(Bs) === !1)
		)
			return;
		Vc.copy(i).invert(), pa.copy(e.ray).applyMatrix4(Vc);
		const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
			l = a * a,
			c = new w(),
			h = new w(),
			u = new w(),
			d = new w(),
			f = this.isLineSegments ? 2 : 1;
		if (n.isBufferGeometry) {
			const m = n.index,
				y = n.attributes.position;
			if (m !== null) {
				const g = Math.max(0, o.start),
					p = Math.min(m.count, o.start + o.count);
				for (let M = g, v = p - 1; M < v; M += f) {
					const _ = m.getX(M),
						E = m.getX(M + 1);
					if (
						(c.fromBufferAttribute(y, _),
						h.fromBufferAttribute(y, E),
						pa.distanceSqToSegment(c, h, d, u) > l)
					)
						continue;
					d.applyMatrix4(this.matrixWorld);
					const D = e.ray.origin.distanceTo(d);
					D < e.near ||
						D > e.far ||
						t.push({
							distance: D,
							point: u.clone().applyMatrix4(this.matrixWorld),
							index: M,
							face: null,
							faceIndex: null,
							object: this
						});
				}
			} else {
				const g = Math.max(0, o.start),
					p = Math.min(y.count, o.start + o.count);
				for (let M = g, v = p - 1; M < v; M += f) {
					if (
						(c.fromBufferAttribute(y, M),
						h.fromBufferAttribute(y, M + 1),
						pa.distanceSqToSegment(c, h, d, u) > l)
					)
						continue;
					d.applyMatrix4(this.matrixWorld);
					const E = e.ray.origin.distanceTo(d);
					E < e.near ||
						E > e.far ||
						t.push({
							distance: E,
							point: u.clone().applyMatrix4(this.matrixWorld),
							index: M,
							face: null,
							faceIndex: null,
							object: this
						});
				}
			}
		} else
			n.isGeometry &&
				console.error(
					"THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
				);
	}
	updateMorphTargets() {
		const e = this.geometry;
		if (e.isBufferGeometry) {
			const t = e.morphAttributes,
				n = Object.keys(t);
			if (n.length > 0) {
				const i = t[n[0]];
				if (i !== void 0) {
					(this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
					for (let r = 0, o = i.length; r < o; r++) {
						const a = i[r].name || String(r);
						this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = r);
					}
				}
			}
		} else {
			const t = e.morphTargets;
			t !== void 0 &&
				t.length > 0 &&
				console.error(
					"THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead."
				);
		}
	}
}
yn.prototype.isLine = !0;
const Wc = new w(),
	qc = new w();
class Rt extends yn {
	constructor(e, t) {
		super(e, t), (this.type = "LineSegments");
	}
	computeLineDistances() {
		const e = this.geometry;
		if (e.isBufferGeometry)
			if (e.index === null) {
				const t = e.attributes.position,
					n = [];
				for (let i = 0, r = t.count; i < r; i += 2)
					Wc.fromBufferAttribute(t, i),
						qc.fromBufferAttribute(t, i + 1),
						(n[i] = i === 0 ? 0 : n[i - 1]),
						(n[i + 1] = n[i] + Wc.distanceTo(qc));
				e.setAttribute("lineDistance", new fe(n, 1));
			} else
				console.warn(
					"THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
				);
		else
			e.isGeometry &&
				console.error(
					"THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
				);
		return this;
	}
}
Rt.prototype.isLineSegments = !0;
class ml extends yn {
	constructor(e, t) {
		super(e, t), (this.type = "LineLoop");
	}
}
ml.prototype.isLineLoop = !0;
class Mi extends yt {
	constructor(e) {
		super(),
			(this.type = "PointsMaterial"),
			(this.color = new re(16777215)),
			(this.map = null),
			(this.alphaMap = null),
			(this.size = 1),
			(this.sizeAttenuation = !0),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			(this.map = e.map),
			(this.alphaMap = e.alphaMap),
			(this.size = e.size),
			(this.sizeAttenuation = e.sizeAttenuation),
			this
		);
	}
}
Mi.prototype.isPointsMaterial = !0;
const Xc = new pe(),
	Qa = new Un(),
	zs = new On(),
	Ns = new w();
class ns extends Fe {
	constructor(e = new Me(), t = new Mi()) {
		super(),
			(this.type = "Points"),
			(this.geometry = e),
			(this.material = t),
			this.updateMorphTargets();
	}
	copy(e) {
		return (
			super.copy(e),
			(this.material = e.material),
			(this.geometry = e.geometry),
			this
		);
	}
	raycast(e, t) {
		const n = this.geometry,
			i = this.matrixWorld,
			r = e.params.Points.threshold,
			o = n.drawRange;
		if (
			(n.boundingSphere === null && n.computeBoundingSphere(),
			zs.copy(n.boundingSphere),
			zs.applyMatrix4(i),
			(zs.radius += r),
			e.ray.intersectsSphere(zs) === !1)
		)
			return;
		Xc.copy(i).invert(), Qa.copy(e.ray).applyMatrix4(Xc);
		const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
			l = a * a;
		if (n.isBufferGeometry) {
			const c = n.index,
				u = n.attributes.position;
			if (c !== null) {
				const d = Math.max(0, o.start),
					f = Math.min(c.count, o.start + o.count);
				for (let m = d, x = f; m < x; m++) {
					const y = c.getX(m);
					Ns.fromBufferAttribute(u, y), Yc(Ns, y, l, i, e, t, this);
				}
			} else {
				const d = Math.max(0, o.start),
					f = Math.min(u.count, o.start + o.count);
				for (let m = d, x = f; m < x; m++)
					Ns.fromBufferAttribute(u, m), Yc(Ns, m, l, i, e, t, this);
			}
		} else
			console.error(
				"THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
			);
	}
	updateMorphTargets() {
		const e = this.geometry;
		if (e.isBufferGeometry) {
			const t = e.morphAttributes,
				n = Object.keys(t);
			if (n.length > 0) {
				const i = t[n[0]];
				if (i !== void 0) {
					(this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
					for (let r = 0, o = i.length; r < o; r++) {
						const a = i[r].name || String(r);
						this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = r);
					}
				}
			}
		} else {
			const t = e.morphTargets;
			t !== void 0 &&
				t.length > 0 &&
				console.error(
					"THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead."
				);
		}
	}
}
ns.prototype.isPoints = !0;
function Yc(s, e, t, n, i, r, o) {
	const a = Qa.distanceSqToPoint(s);
	if (a < t) {
		const l = new w();
		Qa.closestPointToPoint(s, l), l.applyMatrix4(n);
		const c = i.ray.origin.distanceTo(l);
		if (c < i.near || c > i.far) return;
		r.push({
			distance: c,
			distanceToRay: Math.sqrt(a),
			point: l,
			index: e,
			face: null,
			object: o
		});
	}
}
class $u extends dt {
	constructor(e, t, n, i, r, o, a, l, c) {
		super(e, t, n, i, r, o, a, l, c),
			(this.minFilter = o !== void 0 ? o : Ye),
			(this.magFilter = r !== void 0 ? r : Ye),
			(this.generateMipmaps = !1);
		const h = this;
		function u() {
			(h.needsUpdate = !0), e.requestVideoFrameCallback(u);
		}
		"requestVideoFrameCallback" in e && e.requestVideoFrameCallback(u);
	}
	clone() {
		return new this.constructor(this.image).copy(this);
	}
	update() {
		const e = this.image;
		"requestVideoFrameCallback" in e === !1 &&
			e.readyState >= e.HAVE_CURRENT_DATA &&
			(this.needsUpdate = !0);
	}
}
$u.prototype.isVideoTexture = !0;
class Ku extends dt {
	constructor(e, t, n) {
		super({ width: e, height: t }),
			(this.format = n),
			(this.magFilter = et),
			(this.minFilter = et),
			(this.generateMipmaps = !1),
			(this.needsUpdate = !0);
	}
}
Ku.prototype.isFramebufferTexture = !0;
class gl extends dt {
	constructor(e, t, n, i, r, o, a, l, c, h, u, d) {
		super(null, o, a, l, c, h, i, r, u, d),
			(this.image = { width: t, height: n }),
			(this.mipmaps = e),
			(this.flipY = !1),
			(this.generateMipmaps = !1);
	}
}
gl.prototype.isCompressedTexture = !0;
class Qu extends dt {
	constructor(e, t, n, i, r, o, a, l, c) {
		super(e, t, n, i, r, o, a, l, c), (this.needsUpdate = !0);
	}
}
Qu.prototype.isCanvasTexture = !0;
class tr extends Me {
	constructor(e = 1, t = 8, n = 0, i = Math.PI * 2) {
		super(),
			(this.type = "CircleGeometry"),
			(this.parameters = {
				radius: e,
				segments: t,
				thetaStart: n,
				thetaLength: i
			}),
			(t = Math.max(3, t));
		const r = [],
			o = [],
			a = [],
			l = [],
			c = new w(),
			h = new G();
		o.push(0, 0, 0), a.push(0, 0, 1), l.push(0.5, 0.5);
		for (let u = 0, d = 3; u <= t; u++, d += 3) {
			const f = n + (u / t) * i;
			(c.x = e * Math.cos(f)),
				(c.y = e * Math.sin(f)),
				o.push(c.x, c.y, c.z),
				a.push(0, 0, 1),
				(h.x = (o[d] / e + 1) / 2),
				(h.y = (o[d + 1] / e + 1) / 2),
				l.push(h.x, h.y);
		}
		for (let u = 1; u <= t; u++) r.push(u, u + 1, 0);
		this.setIndex(r),
			this.setAttribute("position", new fe(o, 3)),
			this.setAttribute("normal", new fe(a, 3)),
			this.setAttribute("uv", new fe(l, 2));
	}
	static fromJSON(e) {
		return new tr(e.radius, e.segments, e.thetaStart, e.thetaLength);
	}
}
class vn extends Me {
	constructor(
		e = 1,
		t = 1,
		n = 1,
		i = 8,
		r = 1,
		o = !1,
		a = 0,
		l = Math.PI * 2
	) {
		super(),
			(this.type = "CylinderGeometry"),
			(this.parameters = {
				radiusTop: e,
				radiusBottom: t,
				height: n,
				radialSegments: i,
				heightSegments: r,
				openEnded: o,
				thetaStart: a,
				thetaLength: l
			});
		const c = this;
		(i = Math.floor(i)), (r = Math.floor(r));
		const h = [],
			u = [],
			d = [],
			f = [];
		let m = 0;
		const x = [],
			y = n / 2;
		let g = 0;
		p(),
			o === !1 && (e > 0 && M(!0), t > 0 && M(!1)),
			this.setIndex(h),
			this.setAttribute("position", new fe(u, 3)),
			this.setAttribute("normal", new fe(d, 3)),
			this.setAttribute("uv", new fe(f, 2));
		function p() {
			const v = new w(),
				_ = new w();
			let E = 0;
			const A = (t - e) / n;
			for (let D = 0; D <= r; D++) {
				const H = [],
					I = D / r,
					b = I * (t - e) + e;
				for (let L = 0; L <= i; L++) {
					const F = L / i,
						B = F * l + a,
						O = Math.sin(B),
						N = Math.cos(B);
					(_.x = b * O),
						(_.y = -I * n + y),
						(_.z = b * N),
						u.push(_.x, _.y, _.z),
						v.set(O, A, N).normalize(),
						d.push(v.x, v.y, v.z),
						f.push(F, 1 - I),
						H.push(m++);
				}
				x.push(H);
			}
			for (let D = 0; D < i; D++)
				for (let H = 0; H < r; H++) {
					const I = x[H][D],
						b = x[H + 1][D],
						L = x[H + 1][D + 1],
						F = x[H][D + 1];
					h.push(I, b, F), h.push(b, L, F), (E += 6);
				}
			c.addGroup(g, E, 0), (g += E);
		}
		function M(v) {
			const _ = m,
				E = new G(),
				A = new w();
			let D = 0;
			const H = v === !0 ? e : t,
				I = v === !0 ? 1 : -1;
			for (let L = 1; L <= i; L++)
				u.push(0, y * I, 0), d.push(0, I, 0), f.push(0.5, 0.5), m++;
			const b = m;
			for (let L = 0; L <= i; L++) {
				const B = (L / i) * l + a,
					O = Math.cos(B),
					N = Math.sin(B);
				(A.x = H * N),
					(A.y = y * I),
					(A.z = H * O),
					u.push(A.x, A.y, A.z),
					d.push(0, I, 0),
					(E.x = O * 0.5 + 0.5),
					(E.y = N * 0.5 * I + 0.5),
					f.push(E.x, E.y),
					m++;
			}
			for (let L = 0; L < i; L++) {
				const F = _ + L,
					B = b + L;
				v === !0 ? h.push(B, B + 1, F) : h.push(B + 1, B, F), (D += 3);
			}
			c.addGroup(g, D, v === !0 ? 1 : 2), (g += D);
		}
	}
	static fromJSON(e) {
		return new vn(
			e.radiusTop,
			e.radiusBottom,
			e.height,
			e.radialSegments,
			e.heightSegments,
			e.openEnded,
			e.thetaStart,
			e.thetaLength
		);
	}
}
class nr extends vn {
	constructor(e = 1, t = 1, n = 8, i = 1, r = !1, o = 0, a = Math.PI * 2) {
		super(0, e, t, n, i, r, o, a),
			(this.type = "ConeGeometry"),
			(this.parameters = {
				radius: e,
				height: t,
				radialSegments: n,
				heightSegments: i,
				openEnded: r,
				thetaStart: o,
				thetaLength: a
			});
	}
	static fromJSON(e) {
		return new nr(
			e.radius,
			e.height,
			e.radialSegments,
			e.heightSegments,
			e.openEnded,
			e.thetaStart,
			e.thetaLength
		);
	}
}
class en extends Me {
	constructor(e = [], t = [], n = 1, i = 0) {
		super(),
			(this.type = "PolyhedronGeometry"),
			(this.parameters = { vertices: e, indices: t, radius: n, detail: i });
		const r = [],
			o = [];
		a(i),
			c(n),
			h(),
			this.setAttribute("position", new fe(r, 3)),
			this.setAttribute("normal", new fe(r.slice(), 3)),
			this.setAttribute("uv", new fe(o, 2)),
			i === 0 ? this.computeVertexNormals() : this.normalizeNormals();
		function a(p) {
			const M = new w(),
				v = new w(),
				_ = new w();
			for (let E = 0; E < t.length; E += 3)
				f(t[E + 0], M), f(t[E + 1], v), f(t[E + 2], _), l(M, v, _, p);
		}
		function l(p, M, v, _) {
			const E = _ + 1,
				A = [];
			for (let D = 0; D <= E; D++) {
				A[D] = [];
				const H = p.clone().lerp(v, D / E),
					I = M.clone().lerp(v, D / E),
					b = E - D;
				for (let L = 0; L <= b; L++)
					L === 0 && D === E ? (A[D][L] = H) : (A[D][L] = H.clone().lerp(I, L / b));
			}
			for (let D = 0; D < E; D++)
				for (let H = 0; H < 2 * (E - D) - 1; H++) {
					const I = Math.floor(H / 2);
					H % 2 === 0
						? (d(A[D][I + 1]), d(A[D + 1][I]), d(A[D][I]))
						: (d(A[D][I + 1]), d(A[D + 1][I + 1]), d(A[D + 1][I]));
				}
		}
		function c(p) {
			const M = new w();
			for (let v = 0; v < r.length; v += 3)
				(M.x = r[v + 0]),
					(M.y = r[v + 1]),
					(M.z = r[v + 2]),
					M.normalize().multiplyScalar(p),
					(r[v + 0] = M.x),
					(r[v + 1] = M.y),
					(r[v + 2] = M.z);
		}
		function h() {
			const p = new w();
			for (let M = 0; M < r.length; M += 3) {
				(p.x = r[M + 0]), (p.y = r[M + 1]), (p.z = r[M + 2]);
				const v = y(p) / 2 / Math.PI + 0.5,
					_ = g(p) / Math.PI + 0.5;
				o.push(v, 1 - _);
			}
			m(), u();
		}
		function u() {
			for (let p = 0; p < o.length; p += 6) {
				const M = o[p + 0],
					v = o[p + 2],
					_ = o[p + 4],
					E = Math.max(M, v, _),
					A = Math.min(M, v, _);
				E > 0.9 &&
					A < 0.1 &&
					(M < 0.2 && (o[p + 0] += 1),
					v < 0.2 && (o[p + 2] += 1),
					_ < 0.2 && (o[p + 4] += 1));
			}
		}
		function d(p) {
			r.push(p.x, p.y, p.z);
		}
		function f(p, M) {
			const v = p * 3;
			(M.x = e[v + 0]), (M.y = e[v + 1]), (M.z = e[v + 2]);
		}
		function m() {
			const p = new w(),
				M = new w(),
				v = new w(),
				_ = new w(),
				E = new G(),
				A = new G(),
				D = new G();
			for (let H = 0, I = 0; H < r.length; H += 9, I += 6) {
				p.set(r[H + 0], r[H + 1], r[H + 2]),
					M.set(r[H + 3], r[H + 4], r[H + 5]),
					v.set(r[H + 6], r[H + 7], r[H + 8]),
					E.set(o[I + 0], o[I + 1]),
					A.set(o[I + 2], o[I + 3]),
					D.set(o[I + 4], o[I + 5]),
					_.copy(p).add(M).add(v).divideScalar(3);
				const b = y(_);
				x(E, I + 0, p, b), x(A, I + 2, M, b), x(D, I + 4, v, b);
			}
		}
		function x(p, M, v, _) {
			_ < 0 && p.x === 1 && (o[M] = p.x - 1),
				v.x === 0 && v.z === 0 && (o[M] = _ / 2 / Math.PI + 0.5);
		}
		function y(p) {
			return Math.atan2(p.z, -p.x);
		}
		function g(p) {
			return Math.atan2(-p.y, Math.sqrt(p.x * p.x + p.z * p.z));
		}
	}
	static fromJSON(e) {
		return new en(e.vertices, e.indices, e.radius, e.details);
	}
}
class ir extends en {
	constructor(e = 1, t = 0) {
		const n = (1 + Math.sqrt(5)) / 2,
			i = 1 / n,
			r = [
				-1,
				-1,
				-1,
				-1,
				-1,
				1,
				-1,
				1,
				-1,
				-1,
				1,
				1,
				1,
				-1,
				-1,
				1,
				-1,
				1,
				1,
				1,
				-1,
				1,
				1,
				1,
				0,
				-i,
				-n,
				0,
				-i,
				n,
				0,
				i,
				-n,
				0,
				i,
				n,
				-i,
				-n,
				0,
				-i,
				n,
				0,
				i,
				-n,
				0,
				i,
				n,
				0,
				-n,
				0,
				-i,
				n,
				0,
				-i,
				-n,
				0,
				i,
				n,
				0,
				i
			],
			o = [
				3,
				11,
				7,
				3,
				7,
				15,
				3,
				15,
				13,
				7,
				19,
				17,
				7,
				17,
				6,
				7,
				6,
				15,
				17,
				4,
				8,
				17,
				8,
				10,
				17,
				10,
				6,
				8,
				0,
				16,
				8,
				16,
				2,
				8,
				2,
				10,
				0,
				12,
				1,
				0,
				1,
				18,
				0,
				18,
				16,
				6,
				10,
				2,
				6,
				2,
				13,
				6,
				13,
				15,
				2,
				16,
				18,
				2,
				18,
				3,
				2,
				3,
				13,
				18,
				1,
				9,
				18,
				9,
				11,
				18,
				11,
				3,
				4,
				14,
				12,
				4,
				12,
				0,
				4,
				0,
				8,
				11,
				9,
				5,
				11,
				5,
				19,
				11,
				19,
				7,
				19,
				5,
				14,
				19,
				14,
				4,
				19,
				4,
				17,
				1,
				12,
				14,
				1,
				14,
				5,
				1,
				5,
				9
			];
		super(r, o, e, t),
			(this.type = "DodecahedronGeometry"),
			(this.parameters = { radius: e, detail: t });
	}
	static fromJSON(e) {
		return new ir(e.radius, e.detail);
	}
}
const Os = new w(),
	Us = new w(),
	ma = new w(),
	Hs = new st();
class xl extends Me {
	constructor(e = null, t = 1) {
		if (
			(super(),
			(this.type = "EdgesGeometry"),
			(this.parameters = { geometry: e, thresholdAngle: t }),
			e !== null)
		) {
			const i = Math.pow(10, 4),
				r = Math.cos(si * t),
				o = e.getIndex(),
				a = e.getAttribute("position"),
				l = o ? o.count : a.count,
				c = [0, 0, 0],
				h = ["a", "b", "c"],
				u = new Array(3),
				d = {},
				f = [];
			for (let m = 0; m < l; m += 3) {
				o
					? ((c[0] = o.getX(m)), (c[1] = o.getX(m + 1)), (c[2] = o.getX(m + 2)))
					: ((c[0] = m), (c[1] = m + 1), (c[2] = m + 2));
				const { a: x, b: y, c: g } = Hs;
				if (
					(x.fromBufferAttribute(a, c[0]),
					y.fromBufferAttribute(a, c[1]),
					g.fromBufferAttribute(a, c[2]),
					Hs.getNormal(ma),
					(u[0] = `${Math.round(x.x * i)},${Math.round(x.y * i)},${Math.round(
						x.z * i
					)}`),
					(u[1] = `${Math.round(y.x * i)},${Math.round(y.y * i)},${Math.round(
						y.z * i
					)}`),
					(u[2] = `${Math.round(g.x * i)},${Math.round(g.y * i)},${Math.round(
						g.z * i
					)}`),
					!(u[0] === u[1] || u[1] === u[2] || u[2] === u[0]))
				)
					for (let p = 0; p < 3; p++) {
						const M = (p + 1) % 3,
							v = u[p],
							_ = u[M],
							E = Hs[h[p]],
							A = Hs[h[M]],
							D = `${v}_${_}`,
							H = `${_}_${v}`;
						H in d && d[H]
							? (ma.dot(d[H].normal) <= r &&
									(f.push(E.x, E.y, E.z), f.push(A.x, A.y, A.z)),
							  (d[H] = null))
							: D in d || (d[D] = { index0: c[p], index1: c[M], normal: ma.clone() });
					}
			}
			for (const m in d)
				if (d[m]) {
					const { index0: x, index1: y } = d[m];
					Os.fromBufferAttribute(a, x),
						Us.fromBufferAttribute(a, y),
						f.push(Os.x, Os.y, Os.z),
						f.push(Us.x, Us.y, Us.z);
				}
			this.setAttribute("position", new fe(f, 3));
		}
	}
}
class Ft {
	constructor() {
		(this.type = "Curve"), (this.arcLengthDivisions = 200);
	}
	getPoint() {
		return console.warn("THREE.Curve: .getPoint() not implemented."), null;
	}
	getPointAt(e, t) {
		const n = this.getUtoTmapping(e);
		return this.getPoint(n, t);
	}
	getPoints(e = 5) {
		const t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return t;
	}
	getSpacedPoints(e = 5) {
		const t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
		return t;
	}
	getLength() {
		const e = this.getLengths();
		return e[e.length - 1];
	}
	getLengths(e = this.arcLengthDivisions) {
		if (
			this.cacheArcLengths &&
			this.cacheArcLengths.length === e + 1 &&
			!this.needsUpdate
		)
			return this.cacheArcLengths;
		this.needsUpdate = !1;
		const t = [];
		let n,
			i = this.getPoint(0),
			r = 0;
		t.push(0);
		for (let o = 1; o <= e; o++)
			(n = this.getPoint(o / e)), (r += n.distanceTo(i)), t.push(r), (i = n);
		return (this.cacheArcLengths = t), t;
	}
	updateArcLengths() {
		(this.needsUpdate = !0), this.getLengths();
	}
	getUtoTmapping(e, t) {
		const n = this.getLengths();
		let i = 0;
		const r = n.length;
		let o;
		t ? (o = t) : (o = e * n[r - 1]);
		let a = 0,
			l = r - 1,
			c;
		for (; a <= l; )
			if (((i = Math.floor(a + (l - a) / 2)), (c = n[i] - o), c < 0)) a = i + 1;
			else if (c > 0) l = i - 1;
			else {
				l = i;
				break;
			}
		if (((i = l), n[i] === o)) return i / (r - 1);
		const h = n[i],
			d = n[i + 1] - h,
			f = (o - h) / d;
		return (i + f) / (r - 1);
	}
	getTangent(e, t) {
		let i = e - 1e-4,
			r = e + 1e-4;
		i < 0 && (i = 0), r > 1 && (r = 1);
		const o = this.getPoint(i),
			a = this.getPoint(r),
			l = t || (o.isVector2 ? new G() : new w());
		return l.copy(a).sub(o).normalize(), l;
	}
	getTangentAt(e, t) {
		const n = this.getUtoTmapping(e);
		return this.getTangent(n, t);
	}
	computeFrenetFrames(e, t) {
		const n = new w(),
			i = [],
			r = [],
			o = [],
			a = new w(),
			l = new pe();
		for (let f = 0; f <= e; f++) {
			const m = f / e;
			i[f] = this.getTangentAt(m, new w());
		}
		(r[0] = new w()), (o[0] = new w());
		let c = Number.MAX_VALUE;
		const h = Math.abs(i[0].x),
			u = Math.abs(i[0].y),
			d = Math.abs(i[0].z);
		h <= c && ((c = h), n.set(1, 0, 0)),
			u <= c && ((c = u), n.set(0, 1, 0)),
			d <= c && n.set(0, 0, 1),
			a.crossVectors(i[0], n).normalize(),
			r[0].crossVectors(i[0], a),
			o[0].crossVectors(i[0], r[0]);
		for (let f = 1; f <= e; f++) {
			if (
				((r[f] = r[f - 1].clone()),
				(o[f] = o[f - 1].clone()),
				a.crossVectors(i[f - 1], i[f]),
				a.length() > Number.EPSILON)
			) {
				a.normalize();
				const m = Math.acos(Mt(i[f - 1].dot(i[f]), -1, 1));
				r[f].applyMatrix4(l.makeRotationAxis(a, m));
			}
			o[f].crossVectors(i[f], r[f]);
		}
		if (t === !0) {
			let f = Math.acos(Mt(r[0].dot(r[e]), -1, 1));
			(f /= e), i[0].dot(a.crossVectors(r[0], r[e])) > 0 && (f = -f);
			for (let m = 1; m <= e; m++)
				r[m].applyMatrix4(l.makeRotationAxis(i[m], f * m)),
					o[m].crossVectors(i[m], r[m]);
		}
		return { tangents: i, normals: r, binormals: o };
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return (this.arcLengthDivisions = e.arcLengthDivisions), this;
	}
	toJSON() {
		const e = {
			metadata: { version: 4.5, type: "Curve", generator: "Curve.toJSON" }
		};
		return (
			(e.arcLengthDivisions = this.arcLengthDivisions), (e.type = this.type), e
		);
	}
	fromJSON(e) {
		return (this.arcLengthDivisions = e.arcLengthDivisions), this;
	}
}
class is extends Ft {
	constructor(
		e = 0,
		t = 0,
		n = 1,
		i = 1,
		r = 0,
		o = Math.PI * 2,
		a = !1,
		l = 0
	) {
		super(),
			(this.type = "EllipseCurve"),
			(this.aX = e),
			(this.aY = t),
			(this.xRadius = n),
			(this.yRadius = i),
			(this.aStartAngle = r),
			(this.aEndAngle = o),
			(this.aClockwise = a),
			(this.aRotation = l);
	}
	getPoint(e, t) {
		const n = t || new G(),
			i = Math.PI * 2;
		let r = this.aEndAngle - this.aStartAngle;
		const o = Math.abs(r) < Number.EPSILON;
		for (; r < 0; ) r += i;
		for (; r > i; ) r -= i;
		r < Number.EPSILON && (o ? (r = 0) : (r = i)),
			this.aClockwise === !0 && !o && (r === i ? (r = -i) : (r = r - i));
		const a = this.aStartAngle + e * r;
		let l = this.aX + this.xRadius * Math.cos(a),
			c = this.aY + this.yRadius * Math.sin(a);
		if (this.aRotation !== 0) {
			const h = Math.cos(this.aRotation),
				u = Math.sin(this.aRotation),
				d = l - this.aX,
				f = c - this.aY;
			(l = d * h - f * u + this.aX), (c = d * u + f * h + this.aY);
		}
		return n.set(l, c);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.aX = e.aX),
			(this.aY = e.aY),
			(this.xRadius = e.xRadius),
			(this.yRadius = e.yRadius),
			(this.aStartAngle = e.aStartAngle),
			(this.aEndAngle = e.aEndAngle),
			(this.aClockwise = e.aClockwise),
			(this.aRotation = e.aRotation),
			this
		);
	}
	toJSON() {
		const e = super.toJSON();
		return (
			(e.aX = this.aX),
			(e.aY = this.aY),
			(e.xRadius = this.xRadius),
			(e.yRadius = this.yRadius),
			(e.aStartAngle = this.aStartAngle),
			(e.aEndAngle = this.aEndAngle),
			(e.aClockwise = this.aClockwise),
			(e.aRotation = this.aRotation),
			e
		);
	}
	fromJSON(e) {
		return (
			super.fromJSON(e),
			(this.aX = e.aX),
			(this.aY = e.aY),
			(this.xRadius = e.xRadius),
			(this.yRadius = e.yRadius),
			(this.aStartAngle = e.aStartAngle),
			(this.aEndAngle = e.aEndAngle),
			(this.aClockwise = e.aClockwise),
			(this.aRotation = e.aRotation),
			this
		);
	}
}
is.prototype.isEllipseCurve = !0;
class yl extends is {
	constructor(e, t, n, i, r, o) {
		super(e, t, n, n, i, r, o), (this.type = "ArcCurve");
	}
}
yl.prototype.isArcCurve = !0;
function vl() {
	let s = 0,
		e = 0,
		t = 0,
		n = 0;
	function i(r, o, a, l) {
		(s = r),
			(e = a),
			(t = -3 * r + 3 * o - 2 * a - l),
			(n = 2 * r - 2 * o + a + l);
	}
	return {
		initCatmullRom: function (r, o, a, l, c) {
			i(o, a, c * (a - r), c * (l - o));
		},
		initNonuniformCatmullRom: function (r, o, a, l, c, h, u) {
			let d = (o - r) / c - (a - r) / (c + h) + (a - o) / h,
				f = (a - o) / h - (l - o) / (h + u) + (l - a) / u;
			(d *= h), (f *= h), i(o, a, d, f);
		},
		calc: function (r) {
			const o = r * r,
				a = o * r;
			return s + e * r + t * o + n * a;
		}
	};
}
const Gs = new w(),
	ga = new vl(),
	xa = new vl(),
	ya = new vl();
class _l extends Ft {
	constructor(e = [], t = !1, n = "centripetal", i = 0.5) {
		super(),
			(this.type = "CatmullRomCurve3"),
			(this.points = e),
			(this.closed = t),
			(this.curveType = n),
			(this.tension = i);
	}
	getPoint(e, t = new w()) {
		const n = t,
			i = this.points,
			r = i.length,
			o = (r - (this.closed ? 0 : 1)) * e;
		let a = Math.floor(o),
			l = o - a;
		this.closed
			? (a += a > 0 ? 0 : (Math.floor(Math.abs(a) / r) + 1) * r)
			: l === 0 && a === r - 1 && ((a = r - 2), (l = 1));
		let c, h;
		this.closed || a > 0
			? (c = i[(a - 1) % r])
			: (Gs.subVectors(i[0], i[1]).add(i[0]), (c = Gs));
		const u = i[a % r],
			d = i[(a + 1) % r];
		if (
			(this.closed || a + 2 < r
				? (h = i[(a + 2) % r])
				: (Gs.subVectors(i[r - 1], i[r - 2]).add(i[r - 1]), (h = Gs)),
			this.curveType === "centripetal" || this.curveType === "chordal")
		) {
			const f = this.curveType === "chordal" ? 0.5 : 0.25;
			let m = Math.pow(c.distanceToSquared(u), f),
				x = Math.pow(u.distanceToSquared(d), f),
				y = Math.pow(d.distanceToSquared(h), f);
			x < 1e-4 && (x = 1),
				m < 1e-4 && (m = x),
				y < 1e-4 && (y = x),
				ga.initNonuniformCatmullRom(c.x, u.x, d.x, h.x, m, x, y),
				xa.initNonuniformCatmullRom(c.y, u.y, d.y, h.y, m, x, y),
				ya.initNonuniformCatmullRom(c.z, u.z, d.z, h.z, m, x, y);
		} else
			this.curveType === "catmullrom" &&
				(ga.initCatmullRom(c.x, u.x, d.x, h.x, this.tension),
				xa.initCatmullRom(c.y, u.y, d.y, h.y, this.tension),
				ya.initCatmullRom(c.z, u.z, d.z, h.z, this.tension));
		return n.set(ga.calc(l), xa.calc(l), ya.calc(l)), n;
	}
	copy(e) {
		super.copy(e), (this.points = []);
		for (let t = 0, n = e.points.length; t < n; t++) {
			const i = e.points[t];
			this.points.push(i.clone());
		}
		return (
			(this.closed = e.closed),
			(this.curveType = e.curveType),
			(this.tension = e.tension),
			this
		);
	}
	toJSON() {
		const e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			const i = this.points[t];
			e.points.push(i.toArray());
		}
		return (
			(e.closed = this.closed),
			(e.curveType = this.curveType),
			(e.tension = this.tension),
			e
		);
	}
	fromJSON(e) {
		super.fromJSON(e), (this.points = []);
		for (let t = 0, n = e.points.length; t < n; t++) {
			const i = e.points[t];
			this.points.push(new w().fromArray(i));
		}
		return (
			(this.closed = e.closed),
			(this.curveType = e.curveType),
			(this.tension = e.tension),
			this
		);
	}
}
_l.prototype.isCatmullRomCurve3 = !0;
function Zc(s, e, t, n, i) {
	const r = (n - e) * 0.5,
		o = (i - t) * 0.5,
		a = s * s,
		l = s * a;
	return (
		(2 * t - 2 * n + r + o) * l + (-3 * t + 3 * n - 2 * r - o) * a + r * s + t
	);
}
function d0(s, e) {
	const t = 1 - s;
	return t * t * e;
}
function f0(s, e) {
	return 2 * (1 - s) * s * e;
}
function p0(s, e) {
	return s * s * e;
}
function Pr(s, e, t, n) {
	return d0(s, e) + f0(s, t) + p0(s, n);
}
function m0(s, e) {
	const t = 1 - s;
	return t * t * t * e;
}
function g0(s, e) {
	const t = 1 - s;
	return 3 * t * t * s * e;
}
function x0(s, e) {
	return 3 * (1 - s) * s * s * e;
}
function y0(s, e) {
	return s * s * s * e;
}
function Dr(s, e, t, n, i) {
	return m0(s, e) + g0(s, t) + x0(s, n) + y0(s, i);
}
class Fo extends Ft {
	constructor(e = new G(), t = new G(), n = new G(), i = new G()) {
		super(),
			(this.type = "CubicBezierCurve"),
			(this.v0 = e),
			(this.v1 = t),
			(this.v2 = n),
			(this.v3 = i);
	}
	getPoint(e, t = new G()) {
		const n = t,
			i = this.v0,
			r = this.v1,
			o = this.v2,
			a = this.v3;
		return n.set(Dr(e, i.x, r.x, o.x, a.x), Dr(e, i.y, r.y, o.y, a.y)), n;
	}
	copy(e) {
		return (
			super.copy(e),
			this.v0.copy(e.v0),
			this.v1.copy(e.v1),
			this.v2.copy(e.v2),
			this.v3.copy(e.v3),
			this
		);
	}
	toJSON() {
		const e = super.toJSON();
		return (
			(e.v0 = this.v0.toArray()),
			(e.v1 = this.v1.toArray()),
			(e.v2 = this.v2.toArray()),
			(e.v3 = this.v3.toArray()),
			e
		);
	}
	fromJSON(e) {
		return (
			super.fromJSON(e),
			this.v0.fromArray(e.v0),
			this.v1.fromArray(e.v1),
			this.v2.fromArray(e.v2),
			this.v3.fromArray(e.v3),
			this
		);
	}
}
Fo.prototype.isCubicBezierCurve = !0;
class bl extends Ft {
	constructor(e = new w(), t = new w(), n = new w(), i = new w()) {
		super(),
			(this.type = "CubicBezierCurve3"),
			(this.v0 = e),
			(this.v1 = t),
			(this.v2 = n),
			(this.v3 = i);
	}
	getPoint(e, t = new w()) {
		const n = t,
			i = this.v0,
			r = this.v1,
			o = this.v2,
			a = this.v3;
		return (
			n.set(
				Dr(e, i.x, r.x, o.x, a.x),
				Dr(e, i.y, r.y, o.y, a.y),
				Dr(e, i.z, r.z, o.z, a.z)
			),
			n
		);
	}
	copy(e) {
		return (
			super.copy(e),
			this.v0.copy(e.v0),
			this.v1.copy(e.v1),
			this.v2.copy(e.v2),
			this.v3.copy(e.v3),
			this
		);
	}
	toJSON() {
		const e = super.toJSON();
		return (
			(e.v0 = this.v0.toArray()),
			(e.v1 = this.v1.toArray()),
			(e.v2 = this.v2.toArray()),
			(e.v3 = this.v3.toArray()),
			e
		);
	}
	fromJSON(e) {
		return (
			super.fromJSON(e),
			this.v0.fromArray(e.v0),
			this.v1.fromArray(e.v1),
			this.v2.fromArray(e.v2),
			this.v3.fromArray(e.v3),
			this
		);
	}
}
bl.prototype.isCubicBezierCurve3 = !0;
class rs extends Ft {
	constructor(e = new G(), t = new G()) {
		super(), (this.type = "LineCurve"), (this.v1 = e), (this.v2 = t);
	}
	getPoint(e, t = new G()) {
		const n = t;
		return (
			e === 1
				? n.copy(this.v2)
				: (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)),
			n
		);
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t) {
		const n = t || new G();
		return n.copy(this.v2).sub(this.v1).normalize(), n;
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		const e = super.toJSON();
		return (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e;
	}
	fromJSON(e) {
		return (
			super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
		);
	}
}
rs.prototype.isLineCurve = !0;
class ed extends Ft {
	constructor(e = new w(), t = new w()) {
		super(),
			(this.type = "LineCurve3"),
			(this.isLineCurve3 = !0),
			(this.v1 = e),
			(this.v2 = t);
	}
	getPoint(e, t = new w()) {
		const n = t;
		return (
			e === 1
				? n.copy(this.v2)
				: (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)),
			n
		);
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		const e = super.toJSON();
		return (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e;
	}
	fromJSON(e) {
		return (
			super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
		);
	}
}
class Bo extends Ft {
	constructor(e = new G(), t = new G(), n = new G()) {
		super(),
			(this.type = "QuadraticBezierCurve"),
			(this.v0 = e),
			(this.v1 = t),
			(this.v2 = n);
	}
	getPoint(e, t = new G()) {
		const n = t,
			i = this.v0,
			r = this.v1,
			o = this.v2;
		return n.set(Pr(e, i.x, r.x, o.x), Pr(e, i.y, r.y, o.y)), n;
	}
	copy(e) {
		return (
			super.copy(e),
			this.v0.copy(e.v0),
			this.v1.copy(e.v1),
			this.v2.copy(e.v2),
			this
		);
	}
	toJSON() {
		const e = super.toJSON();
		return (
			(e.v0 = this.v0.toArray()),
			(e.v1 = this.v1.toArray()),
			(e.v2 = this.v2.toArray()),
			e
		);
	}
	fromJSON(e) {
		return (
			super.fromJSON(e),
			this.v0.fromArray(e.v0),
			this.v1.fromArray(e.v1),
			this.v2.fromArray(e.v2),
			this
		);
	}
}
Bo.prototype.isQuadraticBezierCurve = !0;
class zo extends Ft {
	constructor(e = new w(), t = new w(), n = new w()) {
		super(),
			(this.type = "QuadraticBezierCurve3"),
			(this.v0 = e),
			(this.v1 = t),
			(this.v2 = n);
	}
	getPoint(e, t = new w()) {
		const n = t,
			i = this.v0,
			r = this.v1,
			o = this.v2;
		return (
			n.set(Pr(e, i.x, r.x, o.x), Pr(e, i.y, r.y, o.y), Pr(e, i.z, r.z, o.z)), n
		);
	}
	copy(e) {
		return (
			super.copy(e),
			this.v0.copy(e.v0),
			this.v1.copy(e.v1),
			this.v2.copy(e.v2),
			this
		);
	}
	toJSON() {
		const e = super.toJSON();
		return (
			(e.v0 = this.v0.toArray()),
			(e.v1 = this.v1.toArray()),
			(e.v2 = this.v2.toArray()),
			e
		);
	}
	fromJSON(e) {
		return (
			super.fromJSON(e),
			this.v0.fromArray(e.v0),
			this.v1.fromArray(e.v1),
			this.v2.fromArray(e.v2),
			this
		);
	}
}
zo.prototype.isQuadraticBezierCurve3 = !0;
class No extends Ft {
	constructor(e = []) {
		super(), (this.type = "SplineCurve"), (this.points = e);
	}
	getPoint(e, t = new G()) {
		const n = t,
			i = this.points,
			r = (i.length - 1) * e,
			o = Math.floor(r),
			a = r - o,
			l = i[o === 0 ? o : o - 1],
			c = i[o],
			h = i[o > i.length - 2 ? i.length - 1 : o + 1],
			u = i[o > i.length - 3 ? i.length - 1 : o + 2];
		return n.set(Zc(a, l.x, c.x, h.x, u.x), Zc(a, l.y, c.y, h.y, u.y)), n;
	}
	copy(e) {
		super.copy(e), (this.points = []);
		for (let t = 0, n = e.points.length; t < n; t++) {
			const i = e.points[t];
			this.points.push(i.clone());
		}
		return this;
	}
	toJSON() {
		const e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			const i = this.points[t];
			e.points.push(i.toArray());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), (this.points = []);
		for (let t = 0, n = e.points.length; t < n; t++) {
			const i = e.points[t];
			this.points.push(new G().fromArray(i));
		}
		return this;
	}
}
No.prototype.isSplineCurve = !0;
var Ml = Object.freeze({
	__proto__: null,
	ArcCurve: yl,
	CatmullRomCurve3: _l,
	CubicBezierCurve: Fo,
	CubicBezierCurve3: bl,
	EllipseCurve: is,
	LineCurve: rs,
	LineCurve3: ed,
	QuadraticBezierCurve: Bo,
	QuadraticBezierCurve3: zo,
	SplineCurve: No
});
class td extends Ft {
	constructor() {
		super(), (this.type = "CurvePath"), (this.curves = []), (this.autoClose = !1);
	}
	add(e) {
		this.curves.push(e);
	}
	closePath() {
		const e = this.curves[0].getPoint(0),
			t = this.curves[this.curves.length - 1].getPoint(1);
		e.equals(t) || this.curves.push(new rs(t, e));
	}
	getPoint(e, t) {
		const n = e * this.getLength(),
			i = this.getCurveLengths();
		let r = 0;
		for (; r < i.length; ) {
			if (i[r] >= n) {
				const o = i[r] - n,
					a = this.curves[r],
					l = a.getLength(),
					c = l === 0 ? 0 : 1 - o / l;
				return a.getPointAt(c, t);
			}
			r++;
		}
		return null;
	}
	getLength() {
		const e = this.getCurveLengths();
		return e[e.length - 1];
	}
	updateArcLengths() {
		(this.needsUpdate = !0), (this.cacheLengths = null), this.getCurveLengths();
	}
	getCurveLengths() {
		if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
			return this.cacheLengths;
		const e = [];
		let t = 0;
		for (let n = 0, i = this.curves.length; n < i; n++)
			(t += this.curves[n].getLength()), e.push(t);
		return (this.cacheLengths = e), e;
	}
	getSpacedPoints(e = 40) {
		const t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return this.autoClose && t.push(t[0]), t;
	}
	getPoints(e = 12) {
		const t = [];
		let n;
		for (let i = 0, r = this.curves; i < r.length; i++) {
			const o = r[i],
				a =
					o && o.isEllipseCurve
						? e * 2
						: o && (o.isLineCurve || o.isLineCurve3)
						? 1
						: o && o.isSplineCurve
						? e * o.points.length
						: e,
				l = o.getPoints(a);
			for (let c = 0; c < l.length; c++) {
				const h = l[c];
				(n && n.equals(h)) || (t.push(h), (n = h));
			}
		}
		return (
			this.autoClose &&
				t.length > 1 &&
				!t[t.length - 1].equals(t[0]) &&
				t.push(t[0]),
			t
		);
	}
	copy(e) {
		super.copy(e), (this.curves = []);
		for (let t = 0, n = e.curves.length; t < n; t++) {
			const i = e.curves[t];
			this.curves.push(i.clone());
		}
		return (this.autoClose = e.autoClose), this;
	}
	toJSON() {
		const e = super.toJSON();
		(e.autoClose = this.autoClose), (e.curves = []);
		for (let t = 0, n = this.curves.length; t < n; t++) {
			const i = this.curves[t];
			e.curves.push(i.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), (this.autoClose = e.autoClose), (this.curves = []);
		for (let t = 0, n = e.curves.length; t < n; t++) {
			const i = e.curves[t];
			this.curves.push(new Ml[i.type]().fromJSON(i));
		}
		return this;
	}
}
class kr extends td {
	constructor(e) {
		super(),
			(this.type = "Path"),
			(this.currentPoint = new G()),
			e && this.setFromPoints(e);
	}
	setFromPoints(e) {
		this.moveTo(e[0].x, e[0].y);
		for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
		return this;
	}
	moveTo(e, t) {
		return this.currentPoint.set(e, t), this;
	}
	lineTo(e, t) {
		const n = new rs(this.currentPoint.clone(), new G(e, t));
		return this.curves.push(n), this.currentPoint.set(e, t), this;
	}
	quadraticCurveTo(e, t, n, i) {
		const r = new Bo(this.currentPoint.clone(), new G(e, t), new G(n, i));
		return this.curves.push(r), this.currentPoint.set(n, i), this;
	}
	bezierCurveTo(e, t, n, i, r, o) {
		const a = new Fo(
			this.currentPoint.clone(),
			new G(e, t),
			new G(n, i),
			new G(r, o)
		);
		return this.curves.push(a), this.currentPoint.set(r, o), this;
	}
	splineThru(e) {
		const t = [this.currentPoint.clone()].concat(e),
			n = new No(t);
		return this.curves.push(n), this.currentPoint.copy(e[e.length - 1]), this;
	}
	arc(e, t, n, i, r, o) {
		const a = this.currentPoint.x,
			l = this.currentPoint.y;
		return this.absarc(e + a, t + l, n, i, r, o), this;
	}
	absarc(e, t, n, i, r, o) {
		return this.absellipse(e, t, n, n, i, r, o), this;
	}
	ellipse(e, t, n, i, r, o, a, l) {
		const c = this.currentPoint.x,
			h = this.currentPoint.y;
		return this.absellipse(e + c, t + h, n, i, r, o, a, l), this;
	}
	absellipse(e, t, n, i, r, o, a, l) {
		const c = new is(e, t, n, i, r, o, a, l);
		if (this.curves.length > 0) {
			const u = c.getPoint(0);
			u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
		}
		this.curves.push(c);
		const h = c.getPoint(1);
		return this.currentPoint.copy(h), this;
	}
	copy(e) {
		return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
	}
	toJSON() {
		const e = super.toJSON();
		return (e.currentPoint = this.currentPoint.toArray()), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
	}
}
class $t extends kr {
	constructor(e) {
		super(e), (this.uuid = It()), (this.type = "Shape"), (this.holes = []);
	}
	getPointsHoles(e) {
		const t = [];
		for (let n = 0, i = this.holes.length; n < i; n++)
			t[n] = this.holes[n].getPoints(e);
		return t;
	}
	extractPoints(e) {
		return { shape: this.getPoints(e), holes: this.getPointsHoles(e) };
	}
	copy(e) {
		super.copy(e), (this.holes = []);
		for (let t = 0, n = e.holes.length; t < n; t++) {
			const i = e.holes[t];
			this.holes.push(i.clone());
		}
		return this;
	}
	toJSON() {
		const e = super.toJSON();
		(e.uuid = this.uuid), (e.holes = []);
		for (let t = 0, n = this.holes.length; t < n; t++) {
			const i = this.holes[t];
			e.holes.push(i.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), (this.uuid = e.uuid), (this.holes = []);
		for (let t = 0, n = e.holes.length; t < n; t++) {
			const i = e.holes[t];
			this.holes.push(new kr().fromJSON(i));
		}
		return this;
	}
}
const v0 = {
	triangulate: function (s, e, t = 2) {
		const n = e && e.length,
			i = n ? e[0] * t : s.length;
		let r = nd(s, 0, i, t, !0);
		const o = [];
		if (!r || r.next === r.prev) return o;
		let a, l, c, h, u, d, f;
		if ((n && (r = S0(s, e, r, t)), s.length > 80 * t)) {
			(a = c = s[0]), (l = h = s[1]);
			for (let m = t; m < i; m += t)
				(u = s[m]),
					(d = s[m + 1]),
					u < a && (a = u),
					d < l && (l = d),
					u > c && (c = u),
					d > h && (h = d);
			(f = Math.max(c - a, h - l)), (f = f !== 0 ? 1 / f : 0);
		}
		return Vr(r, o, t, a, l, f), o;
	}
};
function nd(s, e, t, n, i) {
	let r, o;
	if (i === B0(s, e, t, n) > 0)
		for (r = e; r < t; r += n) o = Jc(r, s[r], s[r + 1], o);
	else for (r = t - n; r >= e; r -= n) o = Jc(r, s[r], s[r + 1], o);
	return o && Oo(o, o.next) && (qr(o), (o = o.next)), o;
}
function Bn(s, e) {
	if (!s) return s;
	e || (e = s);
	let t = s,
		n;
	do
		if (
			((n = !1), !t.steiner && (Oo(t, t.next) || tt(t.prev, t, t.next) === 0))
		) {
			if ((qr(t), (t = e = t.prev), t === t.next)) break;
			n = !0;
		} else t = t.next;
	while (n || t !== e);
	return e;
}
function Vr(s, e, t, n, i, r, o) {
	if (!s) return;
	!o && r && R0(s, n, i, r);
	let a = s,
		l,
		c;
	for (; s.prev !== s.next; ) {
		if (((l = s.prev), (c = s.next), r ? b0(s, n, i, r) : _0(s))) {
			e.push(l.i / t),
				e.push(s.i / t),
				e.push(c.i / t),
				qr(s),
				(s = c.next),
				(a = c.next);
			continue;
		}
		if (((s = c), s === a)) {
			o
				? o === 1
					? ((s = M0(Bn(s), e, t)), Vr(s, e, t, n, i, r, 2))
					: o === 2 && w0(s, e, t, n, i, r)
				: Vr(Bn(s), e, t, n, i, r, 1);
			break;
		}
	}
}
function _0(s) {
	const e = s.prev,
		t = s,
		n = s.next;
	if (tt(e, t, n) >= 0) return !1;
	let i = s.next.next;
	for (; i !== s.prev; ) {
		if (Yi(e.x, e.y, t.x, t.y, n.x, n.y, i.x, i.y) && tt(i.prev, i, i.next) >= 0)
			return !1;
		i = i.next;
	}
	return !0;
}
function b0(s, e, t, n) {
	const i = s.prev,
		r = s,
		o = s.next;
	if (tt(i, r, o) >= 0) return !1;
	const a = i.x < r.x ? (i.x < o.x ? i.x : o.x) : r.x < o.x ? r.x : o.x,
		l = i.y < r.y ? (i.y < o.y ? i.y : o.y) : r.y < o.y ? r.y : o.y,
		c = i.x > r.x ? (i.x > o.x ? i.x : o.x) : r.x > o.x ? r.x : o.x,
		h = i.y > r.y ? (i.y > o.y ? i.y : o.y) : r.y > o.y ? r.y : o.y,
		u = el(a, l, e, t, n),
		d = el(c, h, e, t, n);
	let f = s.prevZ,
		m = s.nextZ;
	for (; f && f.z >= u && m && m.z <= d; ) {
		if (
			(f !== s.prev &&
				f !== s.next &&
				Yi(i.x, i.y, r.x, r.y, o.x, o.y, f.x, f.y) &&
				tt(f.prev, f, f.next) >= 0) ||
			((f = f.prevZ),
			m !== s.prev &&
				m !== s.next &&
				Yi(i.x, i.y, r.x, r.y, o.x, o.y, m.x, m.y) &&
				tt(m.prev, m, m.next) >= 0)
		)
			return !1;
		m = m.nextZ;
	}
	for (; f && f.z >= u; ) {
		if (
			f !== s.prev &&
			f !== s.next &&
			Yi(i.x, i.y, r.x, r.y, o.x, o.y, f.x, f.y) &&
			tt(f.prev, f, f.next) >= 0
		)
			return !1;
		f = f.prevZ;
	}
	for (; m && m.z <= d; ) {
		if (
			m !== s.prev &&
			m !== s.next &&
			Yi(i.x, i.y, r.x, r.y, o.x, o.y, m.x, m.y) &&
			tt(m.prev, m, m.next) >= 0
		)
			return !1;
		m = m.nextZ;
	}
	return !0;
}
function M0(s, e, t) {
	let n = s;
	do {
		const i = n.prev,
			r = n.next.next;
		!Oo(i, r) &&
			id(i, n, n.next, r) &&
			Wr(i, r) &&
			Wr(r, i) &&
			(e.push(i.i / t),
			e.push(n.i / t),
			e.push(r.i / t),
			qr(n),
			qr(n.next),
			(n = s = r)),
			(n = n.next);
	} while (n !== s);
	return Bn(n);
}
function w0(s, e, t, n, i, r) {
	let o = s;
	do {
		let a = o.next.next;
		for (; a !== o.prev; ) {
			if (o.i !== a.i && D0(o, a)) {
				let l = rd(o, a);
				(o = Bn(o, o.next)),
					(l = Bn(l, l.next)),
					Vr(o, e, t, n, i, r),
					Vr(l, e, t, n, i, r);
				return;
			}
			a = a.next;
		}
		o = o.next;
	} while (o !== s);
}
function S0(s, e, t, n) {
	const i = [];
	let r, o, a, l, c;
	for (r = 0, o = e.length; r < o; r++)
		(a = e[r] * n),
			(l = r < o - 1 ? e[r + 1] * n : s.length),
			(c = nd(s, a, l, n, !1)),
			c === c.next && (c.steiner = !0),
			i.push(P0(c));
	for (i.sort(T0), r = 0; r < i.length; r++) E0(i[r], t), (t = Bn(t, t.next));
	return t;
}
function T0(s, e) {
	return s.x - e.x;
}
function E0(s, e) {
	if (((e = A0(s, e)), e)) {
		const t = rd(e, s);
		Bn(e, e.next), Bn(t, t.next);
	}
}
function A0(s, e) {
	let t = e;
	const n = s.x,
		i = s.y;
	let r = -1 / 0,
		o;
	do {
		if (i <= t.y && i >= t.next.y && t.next.y !== t.y) {
			const d = t.x + ((i - t.y) * (t.next.x - t.x)) / (t.next.y - t.y);
			if (d <= n && d > r) {
				if (((r = d), d === n)) {
					if (i === t.y) return t;
					if (i === t.next.y) return t.next;
				}
				o = t.x < t.next.x ? t : t.next;
			}
		}
		t = t.next;
	} while (t !== e);
	if (!o) return null;
	if (n === r) return o;
	const a = o,
		l = o.x,
		c = o.y;
	let h = 1 / 0,
		u;
	t = o;
	do
		n >= t.x &&
			t.x >= l &&
			n !== t.x &&
			Yi(i < c ? n : r, i, l, c, i < c ? r : n, i, t.x, t.y) &&
			((u = Math.abs(i - t.y) / (n - t.x)),
			Wr(t, s) &&
				(u < h || (u === h && (t.x > o.x || (t.x === o.x && C0(o, t))))) &&
				((o = t), (h = u))),
			(t = t.next);
	while (t !== a);
	return o;
}
function C0(s, e) {
	return tt(s.prev, s, e.prev) < 0 && tt(e.next, s, s.next) < 0;
}
function R0(s, e, t, n) {
	let i = s;
	do
		i.z === null && (i.z = el(i.x, i.y, e, t, n)),
			(i.prevZ = i.prev),
			(i.nextZ = i.next),
			(i = i.next);
	while (i !== s);
	(i.prevZ.nextZ = null), (i.prevZ = null), L0(i);
}
function L0(s) {
	let e,
		t,
		n,
		i,
		r,
		o,
		a,
		l,
		c = 1;
	do {
		for (t = s, s = null, r = null, o = 0; t; ) {
			for (o++, n = t, a = 0, e = 0; e < c && (a++, (n = n.nextZ), !!n); e++);
			for (l = c; a > 0 || (l > 0 && n); )
				a !== 0 && (l === 0 || !n || t.z <= n.z)
					? ((i = t), (t = t.nextZ), a--)
					: ((i = n), (n = n.nextZ), l--),
					r ? (r.nextZ = i) : (s = i),
					(i.prevZ = r),
					(r = i);
			t = n;
		}
		(r.nextZ = null), (c *= 2);
	} while (o > 1);
	return s;
}
function el(s, e, t, n, i) {
	return (
		(s = 32767 * (s - t) * i),
		(e = 32767 * (e - n) * i),
		(s = (s | (s << 8)) & 16711935),
		(s = (s | (s << 4)) & 252645135),
		(s = (s | (s << 2)) & 858993459),
		(s = (s | (s << 1)) & 1431655765),
		(e = (e | (e << 8)) & 16711935),
		(e = (e | (e << 4)) & 252645135),
		(e = (e | (e << 2)) & 858993459),
		(e = (e | (e << 1)) & 1431655765),
		s | (e << 1)
	);
}
function P0(s) {
	let e = s,
		t = s;
	do (e.x < t.x || (e.x === t.x && e.y < t.y)) && (t = e), (e = e.next);
	while (e !== s);
	return t;
}
function Yi(s, e, t, n, i, r, o, a) {
	return (
		(i - o) * (e - a) - (s - o) * (r - a) >= 0 &&
		(s - o) * (n - a) - (t - o) * (e - a) >= 0 &&
		(t - o) * (r - a) - (i - o) * (n - a) >= 0
	);
}
function D0(s, e) {
	return (
		s.next.i !== e.i &&
		s.prev.i !== e.i &&
		!I0(s, e) &&
		((Wr(s, e) &&
			Wr(e, s) &&
			F0(s, e) &&
			(tt(s.prev, s, e.prev) || tt(s, e.prev, e))) ||
			(Oo(s, e) && tt(s.prev, s, s.next) > 0 && tt(e.prev, e, e.next) > 0))
	);
}
function tt(s, e, t) {
	return (e.y - s.y) * (t.x - e.x) - (e.x - s.x) * (t.y - e.y);
}
function Oo(s, e) {
	return s.x === e.x && s.y === e.y;
}
function id(s, e, t, n) {
	const i = Vs(tt(s, e, t)),
		r = Vs(tt(s, e, n)),
		o = Vs(tt(t, n, s)),
		a = Vs(tt(t, n, e));
	return !!(
		(i !== r && o !== a) ||
		(i === 0 && ks(s, t, e)) ||
		(r === 0 && ks(s, n, e)) ||
		(o === 0 && ks(t, s, n)) ||
		(a === 0 && ks(t, e, n))
	);
}
function ks(s, e, t) {
	return (
		e.x <= Math.max(s.x, t.x) &&
		e.x >= Math.min(s.x, t.x) &&
		e.y <= Math.max(s.y, t.y) &&
		e.y >= Math.min(s.y, t.y)
	);
}
function Vs(s) {
	return s > 0 ? 1 : s < 0 ? -1 : 0;
}
function I0(s, e) {
	let t = s;
	do {
		if (
			t.i !== s.i &&
			t.next.i !== s.i &&
			t.i !== e.i &&
			t.next.i !== e.i &&
			id(t, t.next, s, e)
		)
			return !0;
		t = t.next;
	} while (t !== s);
	return !1;
}
function Wr(s, e) {
	return tt(s.prev, s, s.next) < 0
		? tt(s, e, s.next) >= 0 && tt(s, s.prev, e) >= 0
		: tt(s, e, s.prev) < 0 || tt(s, s.next, e) < 0;
}
function F0(s, e) {
	let t = s,
		n = !1;
	const i = (s.x + e.x) / 2,
		r = (s.y + e.y) / 2;
	do
		t.y > r != t.next.y > r &&
			t.next.y !== t.y &&
			i < ((t.next.x - t.x) * (r - t.y)) / (t.next.y - t.y) + t.x &&
			(n = !n),
			(t = t.next);
	while (t !== s);
	return n;
}
function rd(s, e) {
	const t = new tl(s.i, s.x, s.y),
		n = new tl(e.i, e.x, e.y),
		i = s.next,
		r = e.prev;
	return (
		(s.next = e),
		(e.prev = s),
		(t.next = i),
		(i.prev = t),
		(n.next = t),
		(t.prev = n),
		(r.next = n),
		(n.prev = r),
		n
	);
}
function Jc(s, e, t, n) {
	const i = new tl(s, e, t);
	return (
		n
			? ((i.next = n.next), (i.prev = n), (n.next.prev = i), (n.next = i))
			: ((i.prev = i), (i.next = i)),
		i
	);
}
function qr(s) {
	(s.next.prev = s.prev),
		(s.prev.next = s.next),
		s.prevZ && (s.prevZ.nextZ = s.nextZ),
		s.nextZ && (s.nextZ.prevZ = s.prevZ);
}
function tl(s, e, t) {
	(this.i = s),
		(this.x = e),
		(this.y = t),
		(this.prev = null),
		(this.next = null),
		(this.z = null),
		(this.prevZ = null),
		(this.nextZ = null),
		(this.steiner = !1);
}
function B0(s, e, t, n) {
	let i = 0;
	for (let r = e, o = t - n; r < t; r += n)
		(i += (s[o] - s[r]) * (s[r + 1] + s[o + 1])), (o = r);
	return i;
}
class Kt {
	static area(e) {
		const t = e.length;
		let n = 0;
		for (let i = t - 1, r = 0; r < t; i = r++)
			n += e[i].x * e[r].y - e[r].x * e[i].y;
		return n * 0.5;
	}
	static isClockWise(e) {
		return Kt.area(e) < 0;
	}
	static triangulateShape(e, t) {
		const n = [],
			i = [],
			r = [];
		jc(e), $c(n, e);
		let o = e.length;
		t.forEach(jc);
		for (let l = 0; l < t.length; l++) i.push(o), (o += t[l].length), $c(n, t[l]);
		const a = v0.triangulate(n, i);
		for (let l = 0; l < a.length; l += 3) r.push(a.slice(l, l + 3));
		return r;
	}
}
function jc(s) {
	const e = s.length;
	e > 2 && s[e - 1].equals(s[0]) && s.pop();
}
function $c(s, e) {
	for (let t = 0; t < e.length; t++) s.push(e[t].x), s.push(e[t].y);
}
class tn extends Me {
	constructor(
		e = new $t([
			new G(0.5, 0.5),
			new G(-0.5, 0.5),
			new G(-0.5, -0.5),
			new G(0.5, -0.5)
		]),
		t = {}
	) {
		super(),
			(this.type = "ExtrudeGeometry"),
			(this.parameters = { shapes: e, options: t }),
			(e = Array.isArray(e) ? e : [e]);
		const n = this,
			i = [],
			r = [];
		for (let a = 0, l = e.length; a < l; a++) {
			const c = e[a];
			o(c);
		}
		this.setAttribute("position", new fe(i, 3)),
			this.setAttribute("uv", new fe(r, 2)),
			this.computeVertexNormals();
		function o(a) {
			const l = [],
				c = t.curveSegments !== void 0 ? t.curveSegments : 12,
				h = t.steps !== void 0 ? t.steps : 1;
			let u = t.depth !== void 0 ? t.depth : 1,
				d = t.bevelEnabled !== void 0 ? t.bevelEnabled : !0,
				f = t.bevelThickness !== void 0 ? t.bevelThickness : 0.2,
				m = t.bevelSize !== void 0 ? t.bevelSize : f - 0.1,
				x = t.bevelOffset !== void 0 ? t.bevelOffset : 0,
				y = t.bevelSegments !== void 0 ? t.bevelSegments : 3;
			const g = t.extrudePath,
				p = t.UVGenerator !== void 0 ? t.UVGenerator : z0;
			t.amount !== void 0 &&
				(console.warn(
					"THREE.ExtrudeBufferGeometry: amount has been renamed to depth."
				),
				(u = t.amount));
			let M,
				v = !1,
				_,
				E,
				A,
				D;
			g &&
				((M = g.getSpacedPoints(h)),
				(v = !0),
				(d = !1),
				(_ = g.computeFrenetFrames(h, !1)),
				(E = new w()),
				(A = new w()),
				(D = new w())),
				d || ((y = 0), (f = 0), (m = 0), (x = 0));
			const H = a.extractPoints(c);
			let I = H.shape;
			const b = H.holes;
			if (!Kt.isClockWise(I)) {
				I = I.reverse();
				for (let j = 0, ie = b.length; j < ie; j++) {
					const te = b[j];
					Kt.isClockWise(te) && (b[j] = te.reverse());
				}
			}
			const F = Kt.triangulateShape(I, b),
				B = I;
			for (let j = 0, ie = b.length; j < ie; j++) {
				const te = b[j];
				I = I.concat(te);
			}
			function O(j, ie, te) {
				return (
					ie || console.error("THREE.ExtrudeGeometry: vec does not exist"),
					ie.clone().multiplyScalar(te).add(j)
				);
			}
			const N = I.length,
				X = F.length;
			function Q(j, ie, te) {
				let he, oe, we;
				const Ae = j.x - ie.x,
					Be = j.y - ie.y,
					qe = te.x - j.x,
					ke = te.y - j.y,
					C = Ae * Ae + Be * Be,
					S = Ae * ke - Be * qe;
				if (Math.abs(S) > Number.EPSILON) {
					const J = Math.sqrt(C),
						ne = Math.sqrt(qe * qe + ke * ke),
						xe = ie.x - Be / J,
						Y = ie.y + Ae / J,
						be = te.x - ke / ne,
						R = te.y + qe / ne,
						W = ((be - xe) * ke - (R - Y) * qe) / (Ae * ke - Be * qe);
					(he = xe + Ae * W - j.x), (oe = Y + Be * W - j.y);
					const ee = he * he + oe * oe;
					if (ee <= 2) return new G(he, oe);
					we = Math.sqrt(ee / 2);
				} else {
					let J = !1;
					Ae > Number.EPSILON
						? qe > Number.EPSILON && (J = !0)
						: Ae < -Number.EPSILON
						? qe < -Number.EPSILON && (J = !0)
						: Math.sign(Be) === Math.sign(ke) && (J = !0),
						J
							? ((he = -Be), (oe = Ae), (we = Math.sqrt(C)))
							: ((he = Ae), (oe = Be), (we = Math.sqrt(C / 2)));
				}
				return new G(he / we, oe / we);
			}
			const ae = [];
			for (
				let j = 0, ie = B.length, te = ie - 1, he = j + 1;
				j < ie;
				j++, te++, he++
			)
				te === ie && (te = 0),
					he === ie && (he = 0),
					(ae[j] = Q(B[j], B[te], B[he]));
			const Z = [];
			let K,
				le = ae.concat();
			for (let j = 0, ie = b.length; j < ie; j++) {
				const te = b[j];
				K = [];
				for (
					let he = 0, oe = te.length, we = oe - 1, Ae = he + 1;
					he < oe;
					he++, we++, Ae++
				)
					we === oe && (we = 0),
						Ae === oe && (Ae = 0),
						(K[he] = Q(te[he], te[we], te[Ae]));
				Z.push(K), (le = le.concat(K));
			}
			for (let j = 0; j < y; j++) {
				const ie = j / y,
					te = f * Math.cos((ie * Math.PI) / 2),
					he = m * Math.sin((ie * Math.PI) / 2) + x;
				for (let oe = 0, we = B.length; oe < we; oe++) {
					const Ae = O(B[oe], ae[oe], he);
					ve(Ae.x, Ae.y, -te);
				}
				for (let oe = 0, we = b.length; oe < we; oe++) {
					const Ae = b[oe];
					K = Z[oe];
					for (let Be = 0, qe = Ae.length; Be < qe; Be++) {
						const ke = O(Ae[Be], K[Be], he);
						ve(ke.x, ke.y, -te);
					}
				}
			}
			const ge = m + x;
			for (let j = 0; j < N; j++) {
				const ie = d ? O(I[j], le[j], ge) : I[j];
				v
					? (A.copy(_.normals[0]).multiplyScalar(ie.x),
					  E.copy(_.binormals[0]).multiplyScalar(ie.y),
					  D.copy(M[0]).add(A).add(E),
					  ve(D.x, D.y, D.z))
					: ve(ie.x, ie.y, 0);
			}
			for (let j = 1; j <= h; j++)
				for (let ie = 0; ie < N; ie++) {
					const te = d ? O(I[ie], le[ie], ge) : I[ie];
					v
						? (A.copy(_.normals[j]).multiplyScalar(te.x),
						  E.copy(_.binormals[j]).multiplyScalar(te.y),
						  D.copy(M[j]).add(A).add(E),
						  ve(D.x, D.y, D.z))
						: ve(te.x, te.y, (u / h) * j);
				}
			for (let j = y - 1; j >= 0; j--) {
				const ie = j / y,
					te = f * Math.cos((ie * Math.PI) / 2),
					he = m * Math.sin((ie * Math.PI) / 2) + x;
				for (let oe = 0, we = B.length; oe < we; oe++) {
					const Ae = O(B[oe], ae[oe], he);
					ve(Ae.x, Ae.y, u + te);
				}
				for (let oe = 0, we = b.length; oe < we; oe++) {
					const Ae = b[oe];
					K = Z[oe];
					for (let Be = 0, qe = Ae.length; Be < qe; Be++) {
						const ke = O(Ae[Be], K[Be], he);
						v ? ve(ke.x, ke.y + M[h - 1].y, M[h - 1].x + te) : ve(ke.x, ke.y, u + te);
					}
				}
			}
			_e(), V();
			function _e() {
				const j = i.length / 3;
				if (d) {
					let ie = 0,
						te = N * ie;
					for (let he = 0; he < X; he++) {
						const oe = F[he];
						Ee(oe[2] + te, oe[1] + te, oe[0] + te);
					}
					(ie = h + y * 2), (te = N * ie);
					for (let he = 0; he < X; he++) {
						const oe = F[he];
						Ee(oe[0] + te, oe[1] + te, oe[2] + te);
					}
				} else {
					for (let ie = 0; ie < X; ie++) {
						const te = F[ie];
						Ee(te[2], te[1], te[0]);
					}
					for (let ie = 0; ie < X; ie++) {
						const te = F[ie];
						Ee(te[0] + N * h, te[1] + N * h, te[2] + N * h);
					}
				}
				n.addGroup(j, i.length / 3 - j, 0);
			}
			function V() {
				const j = i.length / 3;
				let ie = 0;
				Ne(B, ie), (ie += B.length);
				for (let te = 0, he = b.length; te < he; te++) {
					const oe = b[te];
					Ne(oe, ie), (ie += oe.length);
				}
				n.addGroup(j, i.length / 3 - j, 1);
			}
			function Ne(j, ie) {
				let te = j.length;
				for (; --te >= 0; ) {
					const he = te;
					let oe = te - 1;
					oe < 0 && (oe = j.length - 1);
					for (let we = 0, Ae = h + y * 2; we < Ae; we++) {
						const Be = N * we,
							qe = N * (we + 1),
							ke = ie + he + Be,
							C = ie + oe + Be,
							S = ie + oe + qe,
							J = ie + he + qe;
						ue(ke, C, S, J);
					}
				}
			}
			function ve(j, ie, te) {
				l.push(j), l.push(ie), l.push(te);
			}
			function Ee(j, ie, te) {
				Le(j), Le(ie), Le(te);
				const he = i.length / 3,
					oe = p.generateTopUV(n, i, he - 3, he - 2, he - 1);
				Te(oe[0]), Te(oe[1]), Te(oe[2]);
			}
			function ue(j, ie, te, he) {
				Le(j), Le(ie), Le(he), Le(ie), Le(te), Le(he);
				const oe = i.length / 3,
					we = p.generateSideWallUV(n, i, oe - 6, oe - 3, oe - 2, oe - 1);
				Te(we[0]), Te(we[1]), Te(we[3]), Te(we[1]), Te(we[2]), Te(we[3]);
			}
			function Le(j) {
				i.push(l[j * 3 + 0]), i.push(l[j * 3 + 1]), i.push(l[j * 3 + 2]);
			}
			function Te(j) {
				r.push(j.x), r.push(j.y);
			}
		}
	}
	toJSON() {
		const e = super.toJSON(),
			t = this.parameters.shapes,
			n = this.parameters.options;
		return N0(t, n, e);
	}
	static fromJSON(e, t) {
		const n = [];
		for (let r = 0, o = e.shapes.length; r < o; r++) {
			const a = t[e.shapes[r]];
			n.push(a);
		}
		const i = e.options.extrudePath;
		return (
			i !== void 0 && (e.options.extrudePath = new Ml[i.type]().fromJSON(i)),
			new tn(n, e.options)
		);
	}
}
const z0 = {
	generateTopUV: function (s, e, t, n, i) {
		const r = e[t * 3],
			o = e[t * 3 + 1],
			a = e[n * 3],
			l = e[n * 3 + 1],
			c = e[i * 3],
			h = e[i * 3 + 1];
		return [new G(r, o), new G(a, l), new G(c, h)];
	},
	generateSideWallUV: function (s, e, t, n, i, r) {
		const o = e[t * 3],
			a = e[t * 3 + 1],
			l = e[t * 3 + 2],
			c = e[n * 3],
			h = e[n * 3 + 1],
			u = e[n * 3 + 2],
			d = e[i * 3],
			f = e[i * 3 + 1],
			m = e[i * 3 + 2],
			x = e[r * 3],
			y = e[r * 3 + 1],
			g = e[r * 3 + 2];
		return Math.abs(a - h) < Math.abs(o - c)
			? [new G(o, 1 - l), new G(c, 1 - u), new G(d, 1 - m), new G(x, 1 - g)]
			: [new G(a, 1 - l), new G(h, 1 - u), new G(f, 1 - m), new G(y, 1 - g)];
	}
};
function N0(s, e, t) {
	if (((t.shapes = []), Array.isArray(s)))
		for (let n = 0, i = s.length; n < i; n++) {
			const r = s[n];
			t.shapes.push(r.uuid);
		}
	else t.shapes.push(s.uuid);
	return (
		e.extrudePath !== void 0 && (t.options.extrudePath = e.extrudePath.toJSON()),
		t
	);
}
class zn extends en {
	constructor(e = 1, t = 0) {
		const n = (1 + Math.sqrt(5)) / 2,
			i = [
				-1,
				n,
				0,
				1,
				n,
				0,
				-1,
				-n,
				0,
				1,
				-n,
				0,
				0,
				-1,
				n,
				0,
				1,
				n,
				0,
				-1,
				-n,
				0,
				1,
				-n,
				n,
				0,
				-1,
				n,
				0,
				1,
				-n,
				0,
				-1,
				-n,
				0,
				1
			],
			r = [
				0,
				11,
				5,
				0,
				5,
				1,
				0,
				1,
				7,
				0,
				7,
				10,
				0,
				10,
				11,
				1,
				5,
				9,
				5,
				11,
				4,
				11,
				10,
				2,
				10,
				7,
				6,
				7,
				1,
				8,
				3,
				9,
				4,
				3,
				4,
				2,
				3,
				2,
				6,
				3,
				6,
				8,
				3,
				8,
				9,
				4,
				9,
				5,
				2,
				4,
				11,
				6,
				2,
				10,
				8,
				6,
				7,
				9,
				8,
				1
			];
		super(i, r, e, t),
			(this.type = "IcosahedronGeometry"),
			(this.parameters = { radius: e, detail: t });
	}
	static fromJSON(e) {
		return new zn(e.radius, e.detail);
	}
}
class rr extends Me {
	constructor(
		e = [new G(0, 0.5), new G(0.5, 0), new G(0, -0.5)],
		t = 12,
		n = 0,
		i = Math.PI * 2
	) {
		super(),
			(this.type = "LatheGeometry"),
			(this.parameters = { points: e, segments: t, phiStart: n, phiLength: i }),
			(t = Math.floor(t)),
			(i = Mt(i, 0, Math.PI * 2));
		const r = [],
			o = [],
			a = [],
			l = [],
			c = [],
			h = 1 / t,
			u = new w(),
			d = new G(),
			f = new w(),
			m = new w(),
			x = new w();
		let y = 0,
			g = 0;
		for (let p = 0; p <= e.length - 1; p++)
			switch (p) {
				case 0:
					(y = e[p + 1].x - e[p].x),
						(g = e[p + 1].y - e[p].y),
						(f.x = g * 1),
						(f.y = -y),
						(f.z = g * 0),
						x.copy(f),
						f.normalize(),
						l.push(f.x, f.y, f.z);
					break;
				case e.length - 1:
					l.push(x.x, x.y, x.z);
					break;
				default:
					(y = e[p + 1].x - e[p].x),
						(g = e[p + 1].y - e[p].y),
						(f.x = g * 1),
						(f.y = -y),
						(f.z = g * 0),
						m.copy(f),
						(f.x += x.x),
						(f.y += x.y),
						(f.z += x.z),
						f.normalize(),
						l.push(f.x, f.y, f.z),
						x.copy(m);
			}
		for (let p = 0; p <= t; p++) {
			const M = n + p * h * i,
				v = Math.sin(M),
				_ = Math.cos(M);
			for (let E = 0; E <= e.length - 1; E++) {
				(u.x = e[E].x * v),
					(u.y = e[E].y),
					(u.z = e[E].x * _),
					o.push(u.x, u.y, u.z),
					(d.x = p / t),
					(d.y = E / (e.length - 1)),
					a.push(d.x, d.y);
				const A = l[3 * E + 0] * v,
					D = l[3 * E + 1],
					H = l[3 * E + 0] * _;
				c.push(A, D, H);
			}
		}
		for (let p = 0; p < t; p++)
			for (let M = 0; M < e.length - 1; M++) {
				const v = M + p * e.length,
					_ = v,
					E = v + e.length,
					A = v + e.length + 1,
					D = v + 1;
				r.push(_, E, D), r.push(A, D, E);
			}
		this.setIndex(r),
			this.setAttribute("position", new fe(o, 3)),
			this.setAttribute("uv", new fe(a, 2)),
			this.setAttribute("normal", new fe(c, 3));
	}
	static fromJSON(e) {
		return new rr(e.points, e.segments, e.phiStart, e.phiLength);
	}
}
class ui extends en {
	constructor(e = 1, t = 0) {
		const n = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
			i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
		super(n, i, e, t),
			(this.type = "OctahedronGeometry"),
			(this.parameters = { radius: e, detail: t });
	}
	static fromJSON(e) {
		return new ui(e.radius, e.detail);
	}
}
class sr extends Me {
	constructor(e = 0.5, t = 1, n = 8, i = 1, r = 0, o = Math.PI * 2) {
		super(),
			(this.type = "RingGeometry"),
			(this.parameters = {
				innerRadius: e,
				outerRadius: t,
				thetaSegments: n,
				phiSegments: i,
				thetaStart: r,
				thetaLength: o
			}),
			(n = Math.max(3, n)),
			(i = Math.max(1, i));
		const a = [],
			l = [],
			c = [],
			h = [];
		let u = e;
		const d = (t - e) / i,
			f = new w(),
			m = new G();
		for (let x = 0; x <= i; x++) {
			for (let y = 0; y <= n; y++) {
				const g = r + (y / n) * o;
				(f.x = u * Math.cos(g)),
					(f.y = u * Math.sin(g)),
					l.push(f.x, f.y, f.z),
					c.push(0, 0, 1),
					(m.x = (f.x / t + 1) / 2),
					(m.y = (f.y / t + 1) / 2),
					h.push(m.x, m.y);
			}
			u += d;
		}
		for (let x = 0; x < i; x++) {
			const y = x * (n + 1);
			for (let g = 0; g < n; g++) {
				const p = g + y,
					M = p,
					v = p + n + 1,
					_ = p + n + 2,
					E = p + 1;
				a.push(M, v, E), a.push(v, _, E);
			}
		}
		this.setIndex(a),
			this.setAttribute("position", new fe(l, 3)),
			this.setAttribute("normal", new fe(c, 3)),
			this.setAttribute("uv", new fe(h, 2));
	}
	static fromJSON(e) {
		return new sr(
			e.innerRadius,
			e.outerRadius,
			e.thetaSegments,
			e.phiSegments,
			e.thetaStart,
			e.thetaLength
		);
	}
}
class di extends Me {
	constructor(
		e = new $t([new G(0, 0.5), new G(-0.5, -0.5), new G(0.5, -0.5)]),
		t = 12
	) {
		super(),
			(this.type = "ShapeGeometry"),
			(this.parameters = { shapes: e, curveSegments: t });
		const n = [],
			i = [],
			r = [],
			o = [];
		let a = 0,
			l = 0;
		if (Array.isArray(e) === !1) c(e);
		else
			for (let h = 0; h < e.length; h++)
				c(e[h]), this.addGroup(a, l, h), (a += l), (l = 0);
		this.setIndex(n),
			this.setAttribute("position", new fe(i, 3)),
			this.setAttribute("normal", new fe(r, 3)),
			this.setAttribute("uv", new fe(o, 2));
		function c(h) {
			const u = i.length / 3,
				d = h.extractPoints(t);
			let f = d.shape;
			const m = d.holes;
			Kt.isClockWise(f) === !1 && (f = f.reverse());
			for (let y = 0, g = m.length; y < g; y++) {
				const p = m[y];
				Kt.isClockWise(p) === !0 && (m[y] = p.reverse());
			}
			const x = Kt.triangulateShape(f, m);
			for (let y = 0, g = m.length; y < g; y++) {
				const p = m[y];
				f = f.concat(p);
			}
			for (let y = 0, g = f.length; y < g; y++) {
				const p = f[y];
				i.push(p.x, p.y, 0), r.push(0, 0, 1), o.push(p.x, p.y);
			}
			for (let y = 0, g = x.length; y < g; y++) {
				const p = x[y],
					M = p[0] + u,
					v = p[1] + u,
					_ = p[2] + u;
				n.push(M, v, _), (l += 3);
			}
		}
	}
	toJSON() {
		const e = super.toJSON(),
			t = this.parameters.shapes;
		return O0(t, e);
	}
	static fromJSON(e, t) {
		const n = [];
		for (let i = 0, r = e.shapes.length; i < r; i++) {
			const o = t[e.shapes[i]];
			n.push(o);
		}
		return new di(n, e.curveSegments);
	}
}
function O0(s, e) {
	if (((e.shapes = []), Array.isArray(s)))
		for (let t = 0, n = s.length; t < n; t++) {
			const i = s[t];
			e.shapes.push(i.uuid);
		}
	else e.shapes.push(s.uuid);
	return e;
}
class fi extends Me {
	constructor(
		e = 1,
		t = 32,
		n = 16,
		i = 0,
		r = Math.PI * 2,
		o = 0,
		a = Math.PI
	) {
		super(),
			(this.type = "SphereGeometry"),
			(this.parameters = {
				radius: e,
				widthSegments: t,
				heightSegments: n,
				phiStart: i,
				phiLength: r,
				thetaStart: o,
				thetaLength: a
			}),
			(t = Math.max(3, Math.floor(t))),
			(n = Math.max(2, Math.floor(n)));
		const l = Math.min(o + a, Math.PI);
		let c = 0;
		const h = [],
			u = new w(),
			d = new w(),
			f = [],
			m = [],
			x = [],
			y = [];
		for (let g = 0; g <= n; g++) {
			const p = [],
				M = g / n;
			let v = 0;
			g == 0 && o == 0 ? (v = 0.5 / t) : g == n && l == Math.PI && (v = -0.5 / t);
			for (let _ = 0; _ <= t; _++) {
				const E = _ / t;
				(u.x = -e * Math.cos(i + E * r) * Math.sin(o + M * a)),
					(u.y = e * Math.cos(o + M * a)),
					(u.z = e * Math.sin(i + E * r) * Math.sin(o + M * a)),
					m.push(u.x, u.y, u.z),
					d.copy(u).normalize(),
					x.push(d.x, d.y, d.z),
					y.push(E + v, 1 - M),
					p.push(c++);
			}
			h.push(p);
		}
		for (let g = 0; g < n; g++)
			for (let p = 0; p < t; p++) {
				const M = h[g][p + 1],
					v = h[g][p],
					_ = h[g + 1][p],
					E = h[g + 1][p + 1];
				(g !== 0 || o > 0) && f.push(M, v, E),
					(g !== n - 1 || l < Math.PI) && f.push(v, _, E);
			}
		this.setIndex(f),
			this.setAttribute("position", new fe(m, 3)),
			this.setAttribute("normal", new fe(x, 3)),
			this.setAttribute("uv", new fe(y, 2));
	}
	static fromJSON(e) {
		return new fi(
			e.radius,
			e.widthSegments,
			e.heightSegments,
			e.phiStart,
			e.phiLength,
			e.thetaStart,
			e.thetaLength
		);
	}
}
class or extends en {
	constructor(e = 1, t = 0) {
		const n = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
			i = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
		super(n, i, e, t),
			(this.type = "TetrahedronGeometry"),
			(this.parameters = { radius: e, detail: t });
	}
	static fromJSON(e) {
		return new or(e.radius, e.detail);
	}
}
class ar extends Me {
	constructor(e = 1, t = 0.4, n = 8, i = 6, r = Math.PI * 2) {
		super(),
			(this.type = "TorusGeometry"),
			(this.parameters = {
				radius: e,
				tube: t,
				radialSegments: n,
				tubularSegments: i,
				arc: r
			}),
			(n = Math.floor(n)),
			(i = Math.floor(i));
		const o = [],
			a = [],
			l = [],
			c = [],
			h = new w(),
			u = new w(),
			d = new w();
		for (let f = 0; f <= n; f++)
			for (let m = 0; m <= i; m++) {
				const x = (m / i) * r,
					y = (f / n) * Math.PI * 2;
				(u.x = (e + t * Math.cos(y)) * Math.cos(x)),
					(u.y = (e + t * Math.cos(y)) * Math.sin(x)),
					(u.z = t * Math.sin(y)),
					a.push(u.x, u.y, u.z),
					(h.x = e * Math.cos(x)),
					(h.y = e * Math.sin(x)),
					d.subVectors(u, h).normalize(),
					l.push(d.x, d.y, d.z),
					c.push(m / i),
					c.push(f / n);
			}
		for (let f = 1; f <= n; f++)
			for (let m = 1; m <= i; m++) {
				const x = (i + 1) * f + m - 1,
					y = (i + 1) * (f - 1) + m - 1,
					g = (i + 1) * (f - 1) + m,
					p = (i + 1) * f + m;
				o.push(x, y, p), o.push(y, g, p);
			}
		this.setIndex(o),
			this.setAttribute("position", new fe(a, 3)),
			this.setAttribute("normal", new fe(l, 3)),
			this.setAttribute("uv", new fe(c, 2));
	}
	static fromJSON(e) {
		return new ar(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
	}
}
class lr extends Me {
	constructor(e = 1, t = 0.4, n = 64, i = 8, r = 2, o = 3) {
		super(),
			(this.type = "TorusKnotGeometry"),
			(this.parameters = {
				radius: e,
				tube: t,
				tubularSegments: n,
				radialSegments: i,
				p: r,
				q: o
			}),
			(n = Math.floor(n)),
			(i = Math.floor(i));
		const a = [],
			l = [],
			c = [],
			h = [],
			u = new w(),
			d = new w(),
			f = new w(),
			m = new w(),
			x = new w(),
			y = new w(),
			g = new w();
		for (let M = 0; M <= n; ++M) {
			const v = (M / n) * r * Math.PI * 2;
			p(v, r, o, e, f),
				p(v + 0.01, r, o, e, m),
				y.subVectors(m, f),
				g.addVectors(m, f),
				x.crossVectors(y, g),
				g.crossVectors(x, y),
				x.normalize(),
				g.normalize();
			for (let _ = 0; _ <= i; ++_) {
				const E = (_ / i) * Math.PI * 2,
					A = -t * Math.cos(E),
					D = t * Math.sin(E);
				(u.x = f.x + (A * g.x + D * x.x)),
					(u.y = f.y + (A * g.y + D * x.y)),
					(u.z = f.z + (A * g.z + D * x.z)),
					l.push(u.x, u.y, u.z),
					d.subVectors(u, f).normalize(),
					c.push(d.x, d.y, d.z),
					h.push(M / n),
					h.push(_ / i);
			}
		}
		for (let M = 1; M <= n; M++)
			for (let v = 1; v <= i; v++) {
				const _ = (i + 1) * (M - 1) + (v - 1),
					E = (i + 1) * M + (v - 1),
					A = (i + 1) * M + v,
					D = (i + 1) * (M - 1) + v;
				a.push(_, E, D), a.push(E, A, D);
			}
		this.setIndex(a),
			this.setAttribute("position", new fe(l, 3)),
			this.setAttribute("normal", new fe(c, 3)),
			this.setAttribute("uv", new fe(h, 2));
		function p(M, v, _, E, A) {
			const D = Math.cos(M),
				H = Math.sin(M),
				I = (_ / v) * M,
				b = Math.cos(I);
			(A.x = E * (2 + b) * 0.5 * D),
				(A.y = E * (2 + b) * H * 0.5),
				(A.z = E * Math.sin(I) * 0.5);
		}
	}
	static fromJSON(e) {
		return new lr(
			e.radius,
			e.tube,
			e.tubularSegments,
			e.radialSegments,
			e.p,
			e.q
		);
	}
}
class cr extends Me {
	constructor(
		e = new zo(new w(-1, -1, 0), new w(-1, 1, 0), new w(1, 1, 0)),
		t = 64,
		n = 1,
		i = 8,
		r = !1
	) {
		super(),
			(this.type = "TubeGeometry"),
			(this.parameters = {
				path: e,
				tubularSegments: t,
				radius: n,
				radialSegments: i,
				closed: r
			});
		const o = e.computeFrenetFrames(t, r);
		(this.tangents = o.tangents),
			(this.normals = o.normals),
			(this.binormals = o.binormals);
		const a = new w(),
			l = new w(),
			c = new G();
		let h = new w();
		const u = [],
			d = [],
			f = [],
			m = [];
		x(),
			this.setIndex(m),
			this.setAttribute("position", new fe(u, 3)),
			this.setAttribute("normal", new fe(d, 3)),
			this.setAttribute("uv", new fe(f, 2));
		function x() {
			for (let M = 0; M < t; M++) y(M);
			y(r === !1 ? t : 0), p(), g();
		}
		function y(M) {
			h = e.getPointAt(M / t, h);
			const v = o.normals[M],
				_ = o.binormals[M];
			for (let E = 0; E <= i; E++) {
				const A = (E / i) * Math.PI * 2,
					D = Math.sin(A),
					H = -Math.cos(A);
				(l.x = H * v.x + D * _.x),
					(l.y = H * v.y + D * _.y),
					(l.z = H * v.z + D * _.z),
					l.normalize(),
					d.push(l.x, l.y, l.z),
					(a.x = h.x + n * l.x),
					(a.y = h.y + n * l.y),
					(a.z = h.z + n * l.z),
					u.push(a.x, a.y, a.z);
			}
		}
		function g() {
			for (let M = 1; M <= t; M++)
				for (let v = 1; v <= i; v++) {
					const _ = (i + 1) * (M - 1) + (v - 1),
						E = (i + 1) * M + (v - 1),
						A = (i + 1) * M + v,
						D = (i + 1) * (M - 1) + v;
					m.push(_, E, D), m.push(E, A, D);
				}
		}
		function p() {
			for (let M = 0; M <= t; M++)
				for (let v = 0; v <= i; v++) (c.x = M / t), (c.y = v / i), f.push(c.x, c.y);
		}
	}
	toJSON() {
		const e = super.toJSON();
		return (e.path = this.parameters.path.toJSON()), e;
	}
	static fromJSON(e) {
		return new cr(
			new Ml[e.path.type]().fromJSON(e.path),
			e.tubularSegments,
			e.radius,
			e.radialSegments,
			e.closed
		);
	}
}
class wl extends Me {
	constructor(e = null) {
		if (
			(super(),
			(this.type = "WireframeGeometry"),
			(this.parameters = { geometry: e }),
			e !== null)
		) {
			const t = [],
				n = new Set(),
				i = new w(),
				r = new w();
			if (e.index !== null) {
				const o = e.attributes.position,
					a = e.index;
				let l = e.groups;
				l.length === 0 && (l = [{ start: 0, count: a.count, materialIndex: 0 }]);
				for (let c = 0, h = l.length; c < h; ++c) {
					const u = l[c],
						d = u.start,
						f = u.count;
					for (let m = d, x = d + f; m < x; m += 3)
						for (let y = 0; y < 3; y++) {
							const g = a.getX(m + y),
								p = a.getX(m + ((y + 1) % 3));
							i.fromBufferAttribute(o, g),
								r.fromBufferAttribute(o, p),
								Kc(i, r, n) === !0 && (t.push(i.x, i.y, i.z), t.push(r.x, r.y, r.z));
						}
				}
			} else {
				const o = e.attributes.position;
				for (let a = 0, l = o.count / 3; a < l; a++)
					for (let c = 0; c < 3; c++) {
						const h = 3 * a + c,
							u = 3 * a + ((c + 1) % 3);
						i.fromBufferAttribute(o, h),
							r.fromBufferAttribute(o, u),
							Kc(i, r, n) === !0 && (t.push(i.x, i.y, i.z), t.push(r.x, r.y, r.z));
					}
			}
			this.setAttribute("position", new fe(t, 3));
		}
	}
}
function Kc(s, e, t) {
	const n = `${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,
		i = `${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;
	return t.has(n) === !0 || t.has(i) === !0 ? !1 : (t.add(n, i), !0);
}
var Qc = Object.freeze({
	__proto__: null,
	BoxGeometry: xn,
	BoxBufferGeometry: xn,
	CircleGeometry: tr,
	CircleBufferGeometry: tr,
	ConeGeometry: nr,
	ConeBufferGeometry: nr,
	CylinderGeometry: vn,
	CylinderBufferGeometry: vn,
	DodecahedronGeometry: ir,
	DodecahedronBufferGeometry: ir,
	EdgesGeometry: xl,
	ExtrudeGeometry: tn,
	ExtrudeBufferGeometry: tn,
	IcosahedronGeometry: zn,
	IcosahedronBufferGeometry: zn,
	LatheGeometry: rr,
	LatheBufferGeometry: rr,
	OctahedronGeometry: ui,
	OctahedronBufferGeometry: ui,
	PlaneGeometry: Qt,
	PlaneBufferGeometry: Qt,
	PolyhedronGeometry: en,
	PolyhedronBufferGeometry: en,
	RingGeometry: sr,
	RingBufferGeometry: sr,
	ShapeGeometry: di,
	ShapeBufferGeometry: di,
	SphereGeometry: fi,
	SphereBufferGeometry: fi,
	TetrahedronGeometry: or,
	TetrahedronBufferGeometry: or,
	TorusGeometry: ar,
	TorusBufferGeometry: ar,
	TorusKnotGeometry: lr,
	TorusKnotBufferGeometry: lr,
	TubeGeometry: cr,
	TubeBufferGeometry: cr,
	WireframeGeometry: wl
});
class Sl extends yt {
	constructor(e) {
		super(),
			(this.type = "ShadowMaterial"),
			(this.color = new re(0)),
			(this.transparent = !0),
			this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this;
	}
}
Sl.prototype.isShadowMaterial = !0;
class Uo extends yt {
	constructor(e) {
		super(),
			(this.defines = { STANDARD: "" }),
			(this.type = "MeshStandardMaterial"),
			(this.color = new re(16777215)),
			(this.roughness = 1),
			(this.metalness = 0),
			(this.map = null),
			(this.lightMap = null),
			(this.lightMapIntensity = 1),
			(this.aoMap = null),
			(this.aoMapIntensity = 1),
			(this.emissive = new re(0)),
			(this.emissiveIntensity = 1),
			(this.emissiveMap = null),
			(this.bumpMap = null),
			(this.bumpScale = 1),
			(this.normalMap = null),
			(this.normalMapType = yi),
			(this.normalScale = new G(1, 1)),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.roughnessMap = null),
			(this.metalnessMap = null),
			(this.alphaMap = null),
			(this.envMap = null),
			(this.envMapIntensity = 1),
			(this.refractionRatio = 0.98),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.wireframeLinecap = "round"),
			(this.wireframeLinejoin = "round"),
			(this.flatShading = !1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.defines = { STANDARD: "" }),
			this.color.copy(e.color),
			(this.roughness = e.roughness),
			(this.metalness = e.metalness),
			(this.map = e.map),
			(this.lightMap = e.lightMap),
			(this.lightMapIntensity = e.lightMapIntensity),
			(this.aoMap = e.aoMap),
			(this.aoMapIntensity = e.aoMapIntensity),
			this.emissive.copy(e.emissive),
			(this.emissiveMap = e.emissiveMap),
			(this.emissiveIntensity = e.emissiveIntensity),
			(this.bumpMap = e.bumpMap),
			(this.bumpScale = e.bumpScale),
			(this.normalMap = e.normalMap),
			(this.normalMapType = e.normalMapType),
			this.normalScale.copy(e.normalScale),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			(this.roughnessMap = e.roughnessMap),
			(this.metalnessMap = e.metalnessMap),
			(this.alphaMap = e.alphaMap),
			(this.envMap = e.envMap),
			(this.envMapIntensity = e.envMapIntensity),
			(this.refractionRatio = e.refractionRatio),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.wireframeLinecap = e.wireframeLinecap),
			(this.wireframeLinejoin = e.wireframeLinejoin),
			(this.flatShading = e.flatShading),
			this
		);
	}
}
Uo.prototype.isMeshStandardMaterial = !0;
class Tl extends Uo {
	constructor(e) {
		super(),
			(this.defines = { STANDARD: "", PHYSICAL: "" }),
			(this.type = "MeshPhysicalMaterial"),
			(this.clearcoatMap = null),
			(this.clearcoatRoughness = 0),
			(this.clearcoatRoughnessMap = null),
			(this.clearcoatNormalScale = new G(1, 1)),
			(this.clearcoatNormalMap = null),
			(this.ior = 1.5),
			Object.defineProperty(this, "reflectivity", {
				get: function () {
					return Mt((2.5 * (this.ior - 1)) / (this.ior + 1), 0, 1);
				},
				set: function (t) {
					this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
				}
			}),
			(this.sheenColor = new re(0)),
			(this.sheenColorMap = null),
			(this.sheenRoughness = 1),
			(this.sheenRoughnessMap = null),
			(this.transmissionMap = null),
			(this.thickness = 0),
			(this.thicknessMap = null),
			(this.attenuationDistance = 0),
			(this.attenuationColor = new re(1, 1, 1)),
			(this.specularIntensity = 1),
			(this.specularIntensityMap = null),
			(this.specularColor = new re(1, 1, 1)),
			(this.specularColorMap = null),
			(this._sheen = 0),
			(this._clearcoat = 0),
			(this._transmission = 0),
			this.setValues(e);
	}
	get sheen() {
		return this._sheen;
	}
	set sheen(e) {
		this._sheen > 0 != e > 0 && this.version++, (this._sheen = e);
	}
	get clearcoat() {
		return this._clearcoat;
	}
	set clearcoat(e) {
		this._clearcoat > 0 != e > 0 && this.version++, (this._clearcoat = e);
	}
	get transmission() {
		return this._transmission;
	}
	set transmission(e) {
		this._transmission > 0 != e > 0 && this.version++, (this._transmission = e);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.defines = { STANDARD: "", PHYSICAL: "" }),
			(this.clearcoat = e.clearcoat),
			(this.clearcoatMap = e.clearcoatMap),
			(this.clearcoatRoughness = e.clearcoatRoughness),
			(this.clearcoatRoughnessMap = e.clearcoatRoughnessMap),
			(this.clearcoatNormalMap = e.clearcoatNormalMap),
			this.clearcoatNormalScale.copy(e.clearcoatNormalScale),
			(this.ior = e.ior),
			(this.sheen = e.sheen),
			this.sheenColor.copy(e.sheenColor),
			(this.sheenColorMap = e.sheenColorMap),
			(this.sheenRoughness = e.sheenRoughness),
			(this.sheenRoughnessMap = e.sheenRoughnessMap),
			(this.transmission = e.transmission),
			(this.transmissionMap = e.transmissionMap),
			(this.thickness = e.thickness),
			(this.thicknessMap = e.thicknessMap),
			(this.attenuationDistance = e.attenuationDistance),
			this.attenuationColor.copy(e.attenuationColor),
			(this.specularIntensity = e.specularIntensity),
			(this.specularIntensityMap = e.specularIntensityMap),
			this.specularColor.copy(e.specularColor),
			(this.specularColorMap = e.specularColorMap),
			this
		);
	}
}
Tl.prototype.isMeshPhysicalMaterial = !0;
class El extends yt {
	constructor(e) {
		super(),
			(this.type = "MeshPhongMaterial"),
			(this.color = new re(16777215)),
			(this.specular = new re(1118481)),
			(this.shininess = 30),
			(this.map = null),
			(this.lightMap = null),
			(this.lightMapIntensity = 1),
			(this.aoMap = null),
			(this.aoMapIntensity = 1),
			(this.emissive = new re(0)),
			(this.emissiveIntensity = 1),
			(this.emissiveMap = null),
			(this.bumpMap = null),
			(this.bumpScale = 1),
			(this.normalMap = null),
			(this.normalMapType = yi),
			(this.normalScale = new G(1, 1)),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.specularMap = null),
			(this.alphaMap = null),
			(this.envMap = null),
			(this.combine = jr),
			(this.reflectivity = 1),
			(this.refractionRatio = 0.98),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.wireframeLinecap = "round"),
			(this.wireframeLinejoin = "round"),
			(this.flatShading = !1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			this.specular.copy(e.specular),
			(this.shininess = e.shininess),
			(this.map = e.map),
			(this.lightMap = e.lightMap),
			(this.lightMapIntensity = e.lightMapIntensity),
			(this.aoMap = e.aoMap),
			(this.aoMapIntensity = e.aoMapIntensity),
			this.emissive.copy(e.emissive),
			(this.emissiveMap = e.emissiveMap),
			(this.emissiveIntensity = e.emissiveIntensity),
			(this.bumpMap = e.bumpMap),
			(this.bumpScale = e.bumpScale),
			(this.normalMap = e.normalMap),
			(this.normalMapType = e.normalMapType),
			this.normalScale.copy(e.normalScale),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			(this.specularMap = e.specularMap),
			(this.alphaMap = e.alphaMap),
			(this.envMap = e.envMap),
			(this.combine = e.combine),
			(this.reflectivity = e.reflectivity),
			(this.refractionRatio = e.refractionRatio),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.wireframeLinecap = e.wireframeLinecap),
			(this.wireframeLinejoin = e.wireframeLinejoin),
			(this.flatShading = e.flatShading),
			this
		);
	}
}
El.prototype.isMeshPhongMaterial = !0;
class Al extends yt {
	constructor(e) {
		super(),
			(this.defines = { TOON: "" }),
			(this.type = "MeshToonMaterial"),
			(this.color = new re(16777215)),
			(this.map = null),
			(this.gradientMap = null),
			(this.lightMap = null),
			(this.lightMapIntensity = 1),
			(this.aoMap = null),
			(this.aoMapIntensity = 1),
			(this.emissive = new re(0)),
			(this.emissiveIntensity = 1),
			(this.emissiveMap = null),
			(this.bumpMap = null),
			(this.bumpScale = 1),
			(this.normalMap = null),
			(this.normalMapType = yi),
			(this.normalScale = new G(1, 1)),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.alphaMap = null),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.wireframeLinecap = "round"),
			(this.wireframeLinejoin = "round"),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			(this.map = e.map),
			(this.gradientMap = e.gradientMap),
			(this.lightMap = e.lightMap),
			(this.lightMapIntensity = e.lightMapIntensity),
			(this.aoMap = e.aoMap),
			(this.aoMapIntensity = e.aoMapIntensity),
			this.emissive.copy(e.emissive),
			(this.emissiveMap = e.emissiveMap),
			(this.emissiveIntensity = e.emissiveIntensity),
			(this.bumpMap = e.bumpMap),
			(this.bumpScale = e.bumpScale),
			(this.normalMap = e.normalMap),
			(this.normalMapType = e.normalMapType),
			this.normalScale.copy(e.normalScale),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			(this.alphaMap = e.alphaMap),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.wireframeLinecap = e.wireframeLinecap),
			(this.wireframeLinejoin = e.wireframeLinejoin),
			this
		);
	}
}
Al.prototype.isMeshToonMaterial = !0;
class Cl extends yt {
	constructor(e) {
		super(),
			(this.type = "MeshNormalMaterial"),
			(this.bumpMap = null),
			(this.bumpScale = 1),
			(this.normalMap = null),
			(this.normalMapType = yi),
			(this.normalScale = new G(1, 1)),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.fog = !1),
			(this.flatShading = !1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.bumpMap = e.bumpMap),
			(this.bumpScale = e.bumpScale),
			(this.normalMap = e.normalMap),
			(this.normalMapType = e.normalMapType),
			this.normalScale.copy(e.normalScale),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.flatShading = e.flatShading),
			this
		);
	}
}
Cl.prototype.isMeshNormalMaterial = !0;
class Rl extends yt {
	constructor(e) {
		super(),
			(this.type = "MeshLambertMaterial"),
			(this.color = new re(16777215)),
			(this.map = null),
			(this.lightMap = null),
			(this.lightMapIntensity = 1),
			(this.aoMap = null),
			(this.aoMapIntensity = 1),
			(this.emissive = new re(0)),
			(this.emissiveIntensity = 1),
			(this.emissiveMap = null),
			(this.specularMap = null),
			(this.alphaMap = null),
			(this.envMap = null),
			(this.combine = jr),
			(this.reflectivity = 1),
			(this.refractionRatio = 0.98),
			(this.wireframe = !1),
			(this.wireframeLinewidth = 1),
			(this.wireframeLinecap = "round"),
			(this.wireframeLinejoin = "round"),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			this.color.copy(e.color),
			(this.map = e.map),
			(this.lightMap = e.lightMap),
			(this.lightMapIntensity = e.lightMapIntensity),
			(this.aoMap = e.aoMap),
			(this.aoMapIntensity = e.aoMapIntensity),
			this.emissive.copy(e.emissive),
			(this.emissiveMap = e.emissiveMap),
			(this.emissiveIntensity = e.emissiveIntensity),
			(this.specularMap = e.specularMap),
			(this.alphaMap = e.alphaMap),
			(this.envMap = e.envMap),
			(this.combine = e.combine),
			(this.reflectivity = e.reflectivity),
			(this.refractionRatio = e.refractionRatio),
			(this.wireframe = e.wireframe),
			(this.wireframeLinewidth = e.wireframeLinewidth),
			(this.wireframeLinecap = e.wireframeLinecap),
			(this.wireframeLinejoin = e.wireframeLinejoin),
			this
		);
	}
}
Rl.prototype.isMeshLambertMaterial = !0;
class Ll extends yt {
	constructor(e) {
		super(),
			(this.defines = { MATCAP: "" }),
			(this.type = "MeshMatcapMaterial"),
			(this.color = new re(16777215)),
			(this.matcap = null),
			(this.map = null),
			(this.bumpMap = null),
			(this.bumpScale = 1),
			(this.normalMap = null),
			(this.normalMapType = yi),
			(this.normalScale = new G(1, 1)),
			(this.displacementMap = null),
			(this.displacementScale = 1),
			(this.displacementBias = 0),
			(this.alphaMap = null),
			(this.flatShading = !1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.defines = { MATCAP: "" }),
			this.color.copy(e.color),
			(this.matcap = e.matcap),
			(this.map = e.map),
			(this.bumpMap = e.bumpMap),
			(this.bumpScale = e.bumpScale),
			(this.normalMap = e.normalMap),
			(this.normalMapType = e.normalMapType),
			this.normalScale.copy(e.normalScale),
			(this.displacementMap = e.displacementMap),
			(this.displacementScale = e.displacementScale),
			(this.displacementBias = e.displacementBias),
			(this.alphaMap = e.alphaMap),
			(this.flatShading = e.flatShading),
			this
		);
	}
}
Ll.prototype.isMeshMatcapMaterial = !0;
class Pl extends vt {
	constructor(e) {
		super(),
			(this.type = "LineDashedMaterial"),
			(this.scale = 1),
			(this.dashSize = 3),
			(this.gapSize = 1),
			this.setValues(e);
	}
	copy(e) {
		return (
			super.copy(e),
			(this.scale = e.scale),
			(this.dashSize = e.dashSize),
			(this.gapSize = e.gapSize),
			this
		);
	}
}
Pl.prototype.isLineDashedMaterial = !0;
var U0 = Object.freeze({
	__proto__: null,
	ShadowMaterial: Sl,
	SpriteMaterial: Co,
	RawShaderMaterial: fr,
	ShaderMaterial: ht,
	PointsMaterial: Mi,
	MeshPhysicalMaterial: Tl,
	MeshStandardMaterial: Uo,
	MeshPhongMaterial: El,
	MeshToonMaterial: Al,
	MeshNormalMaterial: Cl,
	MeshLambertMaterial: Rl,
	MeshDepthMaterial: To,
	MeshDistanceMaterial: Eo,
	MeshBasicMaterial: Nt,
	MeshMatcapMaterial: Ll,
	LineDashedMaterial: Pl,
	LineBasicMaterial: vt,
	Material: yt
});
const Ke = {
	arraySlice: function (s, e, t) {
		return Ke.isTypedArray(s)
			? new s.constructor(s.subarray(e, t !== void 0 ? t : s.length))
			: s.slice(e, t);
	},
	convertArray: function (s, e, t) {
		return !s || (!t && s.constructor === e)
			? s
			: typeof e.BYTES_PER_ELEMENT == "number"
			? new e(s)
			: Array.prototype.slice.call(s);
	},
	isTypedArray: function (s) {
		return ArrayBuffer.isView(s) && !(s instanceof DataView);
	},
	getKeyframeOrder: function (s) {
		function e(i, r) {
			return s[i] - s[r];
		}
		const t = s.length,
			n = new Array(t);
		for (let i = 0; i !== t; ++i) n[i] = i;
		return n.sort(e), n;
	},
	sortedArray: function (s, e, t) {
		const n = s.length,
			i = new s.constructor(n);
		for (let r = 0, o = 0; o !== n; ++r) {
			const a = t[r] * e;
			for (let l = 0; l !== e; ++l) i[o++] = s[a + l];
		}
		return i;
	},
	flattenJSON: function (s, e, t, n) {
		let i = 1,
			r = s[0];
		for (; r !== void 0 && r[n] === void 0; ) r = s[i++];
		if (r === void 0) return;
		let o = r[n];
		if (o !== void 0)
			if (Array.isArray(o))
				do
					(o = r[n]),
						o !== void 0 && (e.push(r.time), t.push.apply(t, o)),
						(r = s[i++]);
				while (r !== void 0);
			else if (o.toArray !== void 0)
				do
					(o = r[n]),
						o !== void 0 && (e.push(r.time), o.toArray(t, t.length)),
						(r = s[i++]);
				while (r !== void 0);
			else
				do (o = r[n]), o !== void 0 && (e.push(r.time), t.push(o)), (r = s[i++]);
				while (r !== void 0);
	},
	subclip: function (s, e, t, n, i = 30) {
		const r = s.clone();
		r.name = e;
		const o = [];
		for (let l = 0; l < r.tracks.length; ++l) {
			const c = r.tracks[l],
				h = c.getValueSize(),
				u = [],
				d = [];
			for (let f = 0; f < c.times.length; ++f) {
				const m = c.times[f] * i;
				if (!(m < t || m >= n)) {
					u.push(c.times[f]);
					for (let x = 0; x < h; ++x) d.push(c.values[f * h + x]);
				}
			}
			u.length !== 0 &&
				((c.times = Ke.convertArray(u, c.times.constructor)),
				(c.values = Ke.convertArray(d, c.values.constructor)),
				o.push(c));
		}
		r.tracks = o;
		let a = 1 / 0;
		for (let l = 0; l < r.tracks.length; ++l)
			a > r.tracks[l].times[0] && (a = r.tracks[l].times[0]);
		for (let l = 0; l < r.tracks.length; ++l) r.tracks[l].shift(-1 * a);
		return r.resetDuration(), r;
	},
	makeClipAdditive: function (s, e = 0, t = s, n = 30) {
		n <= 0 && (n = 30);
		const i = t.tracks.length,
			r = e / n;
		for (let o = 0; o < i; ++o) {
			const a = t.tracks[o],
				l = a.ValueTypeName;
			if (l === "bool" || l === "string") continue;
			const c = s.tracks.find(function (g) {
				return g.name === a.name && g.ValueTypeName === l;
			});
			if (c === void 0) continue;
			let h = 0;
			const u = a.getValueSize();
			a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (h = u / 3);
			let d = 0;
			const f = c.getValueSize();
			c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (d = f / 3);
			const m = a.times.length - 1;
			let x;
			if (r <= a.times[0]) {
				const g = h,
					p = u - h;
				x = Ke.arraySlice(a.values, g, p);
			} else if (r >= a.times[m]) {
				const g = m * u + h,
					p = g + u - h;
				x = Ke.arraySlice(a.values, g, p);
			} else {
				const g = a.createInterpolant(),
					p = h,
					M = u - h;
				g.evaluate(r), (x = Ke.arraySlice(g.resultBuffer, p, M));
			}
			l === "quaternion" &&
				new gt().fromArray(x).normalize().conjugate().toArray(x);
			const y = c.times.length;
			for (let g = 0; g < y; ++g) {
				const p = g * f + d;
				if (l === "quaternion")
					gt.multiplyQuaternionsFlat(c.values, p, x, 0, c.values, p);
				else {
					const M = f - d * 2;
					for (let v = 0; v < M; ++v) c.values[p + v] -= x[v];
				}
			}
		}
		return (s.blendMode = hl), s;
	}
};
class _n {
	constructor(e, t, n, i) {
		(this.parameterPositions = e),
			(this._cachedIndex = 0),
			(this.resultBuffer = i !== void 0 ? i : new t.constructor(n)),
			(this.sampleValues = t),
			(this.valueSize = n),
			(this.settings = null),
			(this.DefaultSettings_ = {});
	}
	evaluate(e) {
		const t = this.parameterPositions;
		let n = this._cachedIndex,
			i = t[n],
			r = t[n - 1];
		e: {
			t: {
				let o;
				n: {
					i: if (!(e < i)) {
						for (let a = n + 2; ; ) {
							if (i === void 0) {
								if (e < r) break i;
								return (
									(n = t.length), (this._cachedIndex = n), this.afterEnd_(n - 1, e, r)
								);
							}
							if (n === a) break;
							if (((r = i), (i = t[++n]), e < i)) break t;
						}
						o = t.length;
						break n;
					}
					if (!(e >= r)) {
						const a = t[1];
						e < a && ((n = 2), (r = a));
						for (let l = n - 2; ; ) {
							if (r === void 0)
								return (this._cachedIndex = 0), this.beforeStart_(0, e, i);
							if (n === l) break;
							if (((i = r), (r = t[--n - 1]), e >= r)) break t;
						}
						(o = n), (n = 0);
						break n;
					}
					break e;
				}
				for (; n < o; ) {
					const a = (n + o) >>> 1;
					e < t[a] ? (o = a) : (n = a + 1);
				}
				if (((i = t[n]), (r = t[n - 1]), r === void 0))
					return (this._cachedIndex = 0), this.beforeStart_(0, e, i);
				if (i === void 0)
					return (
						(n = t.length), (this._cachedIndex = n), this.afterEnd_(n - 1, r, e)
					);
			}
			(this._cachedIndex = n), this.intervalChanged_(n, r, i);
		}
		return this.interpolate_(n, r, e, i);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		const t = this.resultBuffer,
			n = this.sampleValues,
			i = this.valueSize,
			r = e * i;
		for (let o = 0; o !== i; ++o) t[o] = n[r + o];
		return t;
	}
	interpolate_() {
		throw new Error("call to abstract method");
	}
	intervalChanged_() {}
}
_n.prototype.beforeStart_ = _n.prototype.copySampleValue_;
_n.prototype.afterEnd_ = _n.prototype.copySampleValue_;
class sd extends _n {
	constructor(e, t, n, i) {
		super(e, t, n, i),
			(this._weightPrev = -0),
			(this._offsetPrev = -0),
			(this._weightNext = -0),
			(this._offsetNext = -0),
			(this.DefaultSettings_ = { endingStart: ei, endingEnd: ei });
	}
	intervalChanged_(e, t, n) {
		const i = this.parameterPositions;
		let r = e - 2,
			o = e + 1,
			a = i[r],
			l = i[o];
		if (a === void 0)
			switch (this.getSettings_().endingStart) {
				case ti:
					(r = e), (a = 2 * t - n);
					break;
				case Ur:
					(r = i.length - 2), (a = t + i[r] - i[r + 1]);
					break;
				default:
					(r = e), (a = n);
			}
		if (l === void 0)
			switch (this.getSettings_().endingEnd) {
				case ti:
					(o = e), (l = 2 * n - t);
					break;
				case Ur:
					(o = 1), (l = n + i[1] - i[0]);
					break;
				default:
					(o = e - 1), (l = t);
			}
		const c = (n - t) * 0.5,
			h = this.valueSize;
		(this._weightPrev = c / (t - a)),
			(this._weightNext = c / (l - n)),
			(this._offsetPrev = r * h),
			(this._offsetNext = o * h);
	}
	interpolate_(e, t, n, i) {
		const r = this.resultBuffer,
			o = this.sampleValues,
			a = this.valueSize,
			l = e * a,
			c = l - a,
			h = this._offsetPrev,
			u = this._offsetNext,
			d = this._weightPrev,
			f = this._weightNext,
			m = (n - t) / (i - t),
			x = m * m,
			y = x * m,
			g = -d * y + 2 * d * x - d * m,
			p = (1 + d) * y + (-1.5 - 2 * d) * x + (-0.5 + d) * m + 1,
			M = (-1 - f) * y + (1.5 + f) * x + 0.5 * m,
			v = f * y - f * x;
		for (let _ = 0; _ !== a; ++_)
			r[_] = g * o[h + _] + p * o[c + _] + M * o[l + _] + v * o[u + _];
		return r;
	}
}
class Dl extends _n {
	constructor(e, t, n, i) {
		super(e, t, n, i);
	}
	interpolate_(e, t, n, i) {
		const r = this.resultBuffer,
			o = this.sampleValues,
			a = this.valueSize,
			l = e * a,
			c = l - a,
			h = (n - t) / (i - t),
			u = 1 - h;
		for (let d = 0; d !== a; ++d) r[d] = o[c + d] * u + o[l + d] * h;
		return r;
	}
}
class od extends _n {
	constructor(e, t, n, i) {
		super(e, t, n, i);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}
class qt {
	constructor(e, t, n, i) {
		if (e === void 0)
			throw new Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0)
			throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		(this.name = e),
			(this.times = Ke.convertArray(t, this.TimeBufferType)),
			(this.values = Ke.convertArray(n, this.ValueBufferType)),
			this.setInterpolation(i || this.DefaultInterpolation);
	}
	static toJSON(e) {
		const t = e.constructor;
		let n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: Ke.convertArray(e.times, Array),
				values: Ke.convertArray(e.values, Array)
			};
			const i = e.getInterpolation();
			i !== e.DefaultInterpolation && (n.interpolation = i);
		}
		return (n.type = e.ValueTypeName), n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new od(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Dl(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new sd(this.times, this.values, this.getValueSize(), e);
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case Nr:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case Or:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case no:
				t = this.InterpolantFactoryMethodSmooth;
				break;
		}
		if (t === void 0) {
			const n =
				"unsupported interpolation for " +
				this.ValueTypeName +
				" keyframe track named " +
				this.name;
			if (this.createInterpolant === void 0)
				if (e !== this.DefaultInterpolation)
					this.setInterpolation(this.DefaultInterpolation);
				else throw new Error(n);
			return console.warn("THREE.KeyframeTrack:", n), this;
		}
		return (this.createInterpolant = t), this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete:
				return Nr;
			case this.InterpolantFactoryMethodLinear:
				return Or;
			case this.InterpolantFactoryMethodSmooth:
				return no;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			const t = this.times;
			for (let n = 0, i = t.length; n !== i; ++n) t[n] += e;
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			const t = this.times;
			for (let n = 0, i = t.length; n !== i; ++n) t[n] *= e;
		}
		return this;
	}
	trim(e, t) {
		const n = this.times,
			i = n.length;
		let r = 0,
			o = i - 1;
		for (; r !== i && n[r] < e; ) ++r;
		for (; o !== -1 && n[o] > t; ) --o;
		if ((++o, r !== 0 || o !== i)) {
			r >= o && ((o = Math.max(o, 1)), (r = o - 1));
			const a = this.getValueSize();
			(this.times = Ke.arraySlice(n, r, o)),
				(this.values = Ke.arraySlice(this.values, r * a, o * a));
		}
		return this;
	}
	validate() {
		let e = !0;
		const t = this.getValueSize();
		t - Math.floor(t) !== 0 &&
			(console.error("THREE.KeyframeTrack: Invalid value size in track.", this),
			(e = !1));
		const n = this.times,
			i = this.values,
			r = n.length;
		r === 0 &&
			(console.error("THREE.KeyframeTrack: Track is empty.", this), (e = !1));
		let o = null;
		for (let a = 0; a !== r; a++) {
			const l = n[a];
			if (typeof l == "number" && isNaN(l)) {
				console.error(
					"THREE.KeyframeTrack: Time is not a valid number.",
					this,
					a,
					l
				),
					(e = !1);
				break;
			}
			if (o !== null && o > l) {
				console.error("THREE.KeyframeTrack: Out of order keys.", this, a, l, o),
					(e = !1);
				break;
			}
			o = l;
		}
		if (i !== void 0 && Ke.isTypedArray(i))
			for (let a = 0, l = i.length; a !== l; ++a) {
				const c = i[a];
				if (isNaN(c)) {
					console.error(
						"THREE.KeyframeTrack: Value is not a valid number.",
						this,
						a,
						c
					),
						(e = !1);
					break;
				}
			}
		return e;
	}
	optimize() {
		const e = Ke.arraySlice(this.times),
			t = Ke.arraySlice(this.values),
			n = this.getValueSize(),
			i = this.getInterpolation() === no,
			r = e.length - 1;
		let o = 1;
		for (let a = 1; a < r; ++a) {
			let l = !1;
			const c = e[a],
				h = e[a + 1];
			if (c !== h && (a !== 1 || c !== e[0]))
				if (i) l = !0;
				else {
					const u = a * n,
						d = u - n,
						f = u + n;
					for (let m = 0; m !== n; ++m) {
						const x = t[u + m];
						if (x !== t[d + m] || x !== t[f + m]) {
							l = !0;
							break;
						}
					}
				}
			if (l) {
				if (a !== o) {
					e[o] = e[a];
					const u = a * n,
						d = o * n;
					for (let f = 0; f !== n; ++f) t[d + f] = t[u + f];
				}
				++o;
			}
		}
		if (r > 0) {
			e[o] = e[r];
			for (let a = r * n, l = o * n, c = 0; c !== n; ++c) t[l + c] = t[a + c];
			++o;
		}
		return (
			o !== e.length
				? ((this.times = Ke.arraySlice(e, 0, o)),
				  (this.values = Ke.arraySlice(t, 0, o * n)))
				: ((this.times = e), (this.values = t)),
			this
		);
	}
	clone() {
		const e = Ke.arraySlice(this.times, 0),
			t = Ke.arraySlice(this.values, 0),
			n = this.constructor,
			i = new n(this.name, e, t);
		return (i.createInterpolant = this.createInterpolant), i;
	}
}
qt.prototype.TimeBufferType = Float32Array;
qt.prototype.ValueBufferType = Float32Array;
qt.prototype.DefaultInterpolation = Or;
class wi extends qt {}
wi.prototype.ValueTypeName = "bool";
wi.prototype.ValueBufferType = Array;
wi.prototype.DefaultInterpolation = Nr;
wi.prototype.InterpolantFactoryMethodLinear = void 0;
wi.prototype.InterpolantFactoryMethodSmooth = void 0;
class Il extends qt {}
Il.prototype.ValueTypeName = "color";
class Xr extends qt {}
Xr.prototype.ValueTypeName = "number";
class ad extends _n {
	constructor(e, t, n, i) {
		super(e, t, n, i);
	}
	interpolate_(e, t, n, i) {
		const r = this.resultBuffer,
			o = this.sampleValues,
			a = this.valueSize,
			l = (n - t) / (i - t);
		let c = e * a;
		for (let h = c + a; c !== h; c += 4) gt.slerpFlat(r, 0, o, c - a, o, c, l);
		return r;
	}
}
class mr extends qt {
	InterpolantFactoryMethodLinear(e) {
		return new ad(this.times, this.values, this.getValueSize(), e);
	}
}
mr.prototype.ValueTypeName = "quaternion";
mr.prototype.DefaultInterpolation = Or;
mr.prototype.InterpolantFactoryMethodSmooth = void 0;
class Si extends qt {}
Si.prototype.ValueTypeName = "string";
Si.prototype.ValueBufferType = Array;
Si.prototype.DefaultInterpolation = Nr;
Si.prototype.InterpolantFactoryMethodLinear = void 0;
Si.prototype.InterpolantFactoryMethodSmooth = void 0;
class Yr extends qt {}
Yr.prototype.ValueTypeName = "vector";
class Zr {
	constructor(e, t = -1, n, i = go) {
		(this.name = e),
			(this.tracks = n),
			(this.duration = t),
			(this.blendMode = i),
			(this.uuid = It()),
			this.duration < 0 && this.resetDuration();
	}
	static parse(e) {
		const t = [],
			n = e.tracks,
			i = 1 / (e.fps || 1);
		for (let o = 0, a = n.length; o !== a; ++o) t.push(G0(n[o]).scale(i));
		const r = new this(e.name, e.duration, t, e.blendMode);
		return (r.uuid = e.uuid), r;
	}
	static toJSON(e) {
		const t = [],
			n = e.tracks,
			i = {
				name: e.name,
				duration: e.duration,
				tracks: t,
				uuid: e.uuid,
				blendMode: e.blendMode
			};
		for (let r = 0, o = n.length; r !== o; ++r) t.push(qt.toJSON(n[r]));
		return i;
	}
	static CreateFromMorphTargetSequence(e, t, n, i) {
		const r = t.length,
			o = [];
		for (let a = 0; a < r; a++) {
			let l = [],
				c = [];
			l.push((a + r - 1) % r, a, (a + 1) % r), c.push(0, 1, 0);
			const h = Ke.getKeyframeOrder(l);
			(l = Ke.sortedArray(l, 1, h)),
				(c = Ke.sortedArray(c, 1, h)),
				!i && l[0] === 0 && (l.push(r), c.push(c[0])),
				o.push(
					new Xr(".morphTargetInfluences[" + t[a].name + "]", l, c).scale(1 / n)
				);
		}
		return new this(e, -1, o);
	}
	static findByName(e, t) {
		let n = e;
		if (!Array.isArray(e)) {
			const i = e;
			n = (i.geometry && i.geometry.animations) || i.animations;
		}
		for (let i = 0; i < n.length; i++) if (n[i].name === t) return n[i];
		return null;
	}
	static CreateClipsFromMorphTargetSequences(e, t, n) {
		const i = {},
			r = /^([\w-]*?)([\d]+)$/;
		for (let a = 0, l = e.length; a < l; a++) {
			const c = e[a],
				h = c.name.match(r);
			if (h && h.length > 1) {
				const u = h[1];
				let d = i[u];
				d || (i[u] = d = []), d.push(c);
			}
		}
		const o = [];
		for (const a in i) o.push(this.CreateFromMorphTargetSequence(a, i[a], t, n));
		return o;
	}
	static parseAnimation(e, t) {
		if (!e)
			return (
				console.error("THREE.AnimationClip: No animation in JSONLoader data."), null
			);
		const n = function (u, d, f, m, x) {
				if (f.length !== 0) {
					const y = [],
						g = [];
					Ke.flattenJSON(f, y, g, m), y.length !== 0 && x.push(new u(d, y, g));
				}
			},
			i = [],
			r = e.name || "default",
			o = e.fps || 30,
			a = e.blendMode;
		let l = e.length || -1;
		const c = e.hierarchy || [];
		for (let u = 0; u < c.length; u++) {
			const d = c[u].keys;
			if (!(!d || d.length === 0))
				if (d[0].morphTargets) {
					const f = {};
					let m;
					for (m = 0; m < d.length; m++)
						if (d[m].morphTargets)
							for (let x = 0; x < d[m].morphTargets.length; x++)
								f[d[m].morphTargets[x]] = -1;
					for (const x in f) {
						const y = [],
							g = [];
						for (let p = 0; p !== d[m].morphTargets.length; ++p) {
							const M = d[m];
							y.push(M.time), g.push(M.morphTarget === x ? 1 : 0);
						}
						i.push(new Xr(".morphTargetInfluence[" + x + "]", y, g));
					}
					l = f.length * (o || 1);
				} else {
					const f = ".bones[" + t[u].name + "]";
					n(Yr, f + ".position", d, "pos", i),
						n(mr, f + ".quaternion", d, "rot", i),
						n(Yr, f + ".scale", d, "scl", i);
				}
		}
		return i.length === 0 ? null : new this(r, l, i, a);
	}
	resetDuration() {
		const e = this.tracks;
		let t = 0;
		for (let n = 0, i = e.length; n !== i; ++n) {
			const r = this.tracks[n];
			t = Math.max(t, r.times[r.times.length - 1]);
		}
		return (this.duration = t), this;
	}
	trim() {
		for (let e = 0; e < this.tracks.length; e++)
			this.tracks[e].trim(0, this.duration);
		return this;
	}
	validate() {
		let e = !0;
		for (let t = 0; t < this.tracks.length; t++)
			e = e && this.tracks[t].validate();
		return e;
	}
	optimize() {
		for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
		return this;
	}
	clone() {
		const e = [];
		for (let t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone());
		return new this.constructor(this.name, this.duration, e, this.blendMode);
	}
	toJSON() {
		return this.constructor.toJSON(this);
	}
}
function H0(s) {
	switch (s.toLowerCase()) {
		case "scalar":
		case "double":
		case "float":
		case "number":
		case "integer":
			return Xr;
		case "vector":
		case "vector2":
		case "vector3":
		case "vector4":
			return Yr;
		case "color":
			return Il;
		case "quaternion":
			return mr;
		case "bool":
		case "boolean":
			return wi;
		case "string":
			return Si;
	}
	throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + s);
}
function G0(s) {
	if (s.type === void 0)
		throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
	const e = H0(s.type);
	if (s.times === void 0) {
		const t = [],
			n = [];
		Ke.flattenJSON(s.keys, t, n, "value"), (s.times = t), (s.values = n);
	}
	return e.parse !== void 0
		? e.parse(s)
		: new e(s.name, s.times, s.values, s.interpolation);
}
const pi = {
	enabled: !1,
	files: {},
	add: function (s, e) {
		this.enabled !== !1 && (this.files[s] = e);
	},
	get: function (s) {
		if (this.enabled !== !1) return this.files[s];
	},
	remove: function (s) {
		delete this.files[s];
	},
	clear: function () {
		this.files = {};
	}
};
class Fl {
	constructor(e, t, n) {
		const i = this;
		let r = !1,
			o = 0,
			a = 0,
			l;
		const c = [];
		(this.onStart = void 0),
			(this.onLoad = e),
			(this.onProgress = t),
			(this.onError = n),
			(this.itemStart = function (h) {
				a++, r === !1 && i.onStart !== void 0 && i.onStart(h, o, a), (r = !0);
			}),
			(this.itemEnd = function (h) {
				o++,
					i.onProgress !== void 0 && i.onProgress(h, o, a),
					o === a && ((r = !1), i.onLoad !== void 0 && i.onLoad());
			}),
			(this.itemError = function (h) {
				i.onError !== void 0 && i.onError(h);
			}),
			(this.resolveURL = function (h) {
				return l ? l(h) : h;
			}),
			(this.setURLModifier = function (h) {
				return (l = h), this;
			}),
			(this.addHandler = function (h, u) {
				return c.push(h, u), this;
			}),
			(this.removeHandler = function (h) {
				const u = c.indexOf(h);
				return u !== -1 && c.splice(u, 2), this;
			}),
			(this.getHandler = function (h) {
				for (let u = 0, d = c.length; u < d; u += 2) {
					const f = c[u],
						m = c[u + 1];
					if ((f.global && (f.lastIndex = 0), f.test(h))) return m;
				}
				return null;
			});
	}
}
const ld = new Fl();
class Ct {
	constructor(e) {
		(this.manager = e !== void 0 ? e : ld),
			(this.crossOrigin = "anonymous"),
			(this.withCredentials = !1),
			(this.path = ""),
			(this.resourcePath = ""),
			(this.requestHeader = {});
	}
	load() {}
	loadAsync(e, t) {
		const n = this;
		return new Promise(function (i, r) {
			n.load(e, i, t, r);
		});
	}
	parse() {}
	setCrossOrigin(e) {
		return (this.crossOrigin = e), this;
	}
	setWithCredentials(e) {
		return (this.withCredentials = e), this;
	}
	setPath(e) {
		return (this.path = e), this;
	}
	setResourcePath(e) {
		return (this.resourcePath = e), this;
	}
	setRequestHeader(e) {
		return (this.requestHeader = e), this;
	}
}
const un = {};
class nn extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		e === void 0 && (e = ""),
			this.path !== void 0 && (e = this.path + e),
			(e = this.manager.resolveURL(e));
		const r = pi.get(e);
		if (r !== void 0)
			return (
				this.manager.itemStart(e),
				setTimeout(() => {
					t && t(r), this.manager.itemEnd(e);
				}, 0),
				r
			);
		if (un[e] !== void 0) {
			un[e].push({ onLoad: t, onProgress: n, onError: i });
			return;
		}
		(un[e] = []), un[e].push({ onLoad: t, onProgress: n, onError: i });
		const o = new Request(e, {
				headers: new Headers(this.requestHeader),
				credentials: this.withCredentials ? "include" : "same-origin"
			}),
			a = this.mimeType,
			l = this.responseType;
		fetch(o)
			.then((c) => {
				if (c.status === 200 || c.status === 0) {
					if (
						(c.status === 0 &&
							console.warn("THREE.FileLoader: HTTP Status 0 received."),
						typeof ReadableStream == "undefined" || c.body.getReader === void 0)
					)
						return c;
					const h = un[e],
						u = c.body.getReader(),
						d = c.headers.get("Content-Length"),
						f = d ? parseInt(d) : 0,
						m = f !== 0;
					let x = 0;
					const y = new ReadableStream({
						start(g) {
							p();
							function p() {
								u.read().then(({ done: M, value: v }) => {
									if (M) g.close();
									else {
										x += v.byteLength;
										const _ = new ProgressEvent("progress", {
											lengthComputable: m,
											loaded: x,
											total: f
										});
										for (let E = 0, A = h.length; E < A; E++) {
											const D = h[E];
											D.onProgress && D.onProgress(_);
										}
										g.enqueue(v), p();
									}
								});
							}
						}
					});
					return new Response(y);
				} else
					throw Error(
						`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`
					);
			})
			.then((c) => {
				switch (l) {
					case "arraybuffer":
						return c.arrayBuffer();
					case "blob":
						return c.blob();
					case "document":
						return c.text().then((h) => new DOMParser().parseFromString(h, a));
					case "json":
						return c.json();
					default:
						if (a === void 0) return c.text();
						{
							const u = /charset="?([^;"\s]*)"?/i.exec(a),
								d = u && u[1] ? u[1].toLowerCase() : void 0,
								f = new TextDecoder(d);
							return c.arrayBuffer().then((m) => f.decode(m));
						}
				}
			})
			.then((c) => {
				pi.add(e, c);
				const h = un[e];
				delete un[e];
				for (let u = 0, d = h.length; u < d; u++) {
					const f = h[u];
					f.onLoad && f.onLoad(c);
				}
			})
			.catch((c) => {
				const h = un[e];
				if (h === void 0) throw (this.manager.itemError(e), c);
				delete un[e];
				for (let u = 0, d = h.length; u < d; u++) {
					const f = h[u];
					f.onError && f.onError(c);
				}
				this.manager.itemError(e);
			})
			.finally(() => {
				this.manager.itemEnd(e);
			}),
			this.manager.itemStart(e);
	}
	setResponseType(e) {
		return (this.responseType = e), this;
	}
	setMimeType(e) {
		return (this.mimeType = e), this;
	}
}
class k0 extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = this,
			o = new nn(this.manager);
		o.setPath(this.path),
			o.setRequestHeader(this.requestHeader),
			o.setWithCredentials(this.withCredentials),
			o.load(
				e,
				function (a) {
					try {
						t(r.parse(JSON.parse(a)));
					} catch (l) {
						i ? i(l) : console.error(l), r.manager.itemError(e);
					}
				},
				n,
				i
			);
	}
	parse(e) {
		const t = [];
		for (let n = 0; n < e.length; n++) {
			const i = Zr.parse(e[n]);
			t.push(i);
		}
		return t;
	}
}
class V0 extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = this,
			o = [],
			a = new gl(),
			l = new nn(this.manager);
		l.setPath(this.path),
			l.setResponseType("arraybuffer"),
			l.setRequestHeader(this.requestHeader),
			l.setWithCredentials(r.withCredentials);
		let c = 0;
		function h(u) {
			l.load(
				e[u],
				function (d) {
					const f = r.parse(d, !0);
					(o[u] = {
						width: f.width,
						height: f.height,
						format: f.format,
						mipmaps: f.mipmaps
					}),
						(c += 1),
						c === 6 &&
							(f.mipmapCount === 1 && (a.minFilter = Ye),
							(a.image = o),
							(a.format = f.format),
							(a.needsUpdate = !0),
							t && t(a));
				},
				n,
				i
			);
		}
		if (Array.isArray(e)) for (let u = 0, d = e.length; u < d; ++u) h(u);
		else
			l.load(
				e,
				function (u) {
					const d = r.parse(u, !0);
					if (d.isCubemap) {
						const f = d.mipmaps.length / d.mipmapCount;
						for (let m = 0; m < f; m++) {
							o[m] = { mipmaps: [] };
							for (let x = 0; x < d.mipmapCount; x++)
								o[m].mipmaps.push(d.mipmaps[m * d.mipmapCount + x]),
									(o[m].format = d.format),
									(o[m].width = d.width),
									(o[m].height = d.height);
						}
						a.image = o;
					} else
						(a.image.width = d.width),
							(a.image.height = d.height),
							(a.mipmaps = d.mipmaps);
					d.mipmapCount === 1 && (a.minFilter = Ye),
						(a.format = d.format),
						(a.needsUpdate = !0),
						t && t(a);
				},
				n,
				i
			);
		return a;
	}
}
class Jr extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		this.path !== void 0 && (e = this.path + e), (e = this.manager.resolveURL(e));
		const r = this,
			o = pi.get(e);
		if (o !== void 0)
			return (
				r.manager.itemStart(e),
				setTimeout(function () {
					t && t(o), r.manager.itemEnd(e);
				}, 0),
				o
			);
		const a = Gr("img");
		function l() {
			h(), pi.add(e, this), t && t(this), r.manager.itemEnd(e);
		}
		function c(u) {
			h(), i && i(u), r.manager.itemError(e), r.manager.itemEnd(e);
		}
		function h() {
			a.removeEventListener("load", l, !1), a.removeEventListener("error", c, !1);
		}
		return (
			a.addEventListener("load", l, !1),
			a.addEventListener("error", c, !1),
			e.substr(0, 5) !== "data:" &&
				this.crossOrigin !== void 0 &&
				(a.crossOrigin = this.crossOrigin),
			r.manager.itemStart(e),
			(a.src = e),
			a
		);
	}
}
class cd extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = new dr(),
			o = new Jr(this.manager);
		o.setCrossOrigin(this.crossOrigin), o.setPath(this.path);
		let a = 0;
		function l(c) {
			o.load(
				e[c],
				function (h) {
					(r.images[c] = h), a++, a === 6 && ((r.needsUpdate = !0), t && t(r));
				},
				void 0,
				i
			);
		}
		for (let c = 0; c < e.length; ++c) l(c);
		return r;
	}
}
class hd extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = this,
			o = new oi(),
			a = new nn(this.manager);
		return (
			a.setResponseType("arraybuffer"),
			a.setRequestHeader(this.requestHeader),
			a.setPath(this.path),
			a.setWithCredentials(r.withCredentials),
			a.load(
				e,
				function (l) {
					const c = r.parse(l);
					!c ||
						(c.image !== void 0
							? (o.image = c.image)
							: c.data !== void 0 &&
							  ((o.image.width = c.width),
							  (o.image.height = c.height),
							  (o.image.data = c.data)),
						(o.wrapS = c.wrapS !== void 0 ? c.wrapS : wt),
						(o.wrapT = c.wrapT !== void 0 ? c.wrapT : wt),
						(o.magFilter = c.magFilter !== void 0 ? c.magFilter : Ye),
						(o.minFilter = c.minFilter !== void 0 ? c.minFilter : Ye),
						(o.anisotropy = c.anisotropy !== void 0 ? c.anisotropy : 1),
						c.encoding !== void 0 && (o.encoding = c.encoding),
						c.flipY !== void 0 && (o.flipY = c.flipY),
						c.format !== void 0 && (o.format = c.format),
						c.type !== void 0 && (o.type = c.type),
						c.mipmaps !== void 0 && ((o.mipmaps = c.mipmaps), (o.minFilter = xi)),
						c.mipmapCount === 1 && (o.minFilter = Ye),
						c.generateMipmaps !== void 0 && (o.generateMipmaps = c.generateMipmaps),
						(o.needsUpdate = !0),
						t && t(o, c));
				},
				n,
				i
			),
			o
		);
	}
}
class ud extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = new dt(),
			o = new Jr(this.manager);
		return (
			o.setCrossOrigin(this.crossOrigin),
			o.setPath(this.path),
			o.load(
				e,
				function (a) {
					(r.image = a), (r.needsUpdate = !0), t !== void 0 && t(r);
				},
				n,
				i
			),
			r
		);
	}
}
class Wt extends Fe {
	constructor(e, t = 1) {
		super(),
			(this.type = "Light"),
			(this.color = new re(e)),
			(this.intensity = t);
	}
	dispose() {}
	copy(e) {
		return (
			super.copy(e), this.color.copy(e.color), (this.intensity = e.intensity), this
		);
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return (
			(t.object.color = this.color.getHex()),
			(t.object.intensity = this.intensity),
			this.groundColor !== void 0 &&
				(t.object.groundColor = this.groundColor.getHex()),
			this.distance !== void 0 && (t.object.distance = this.distance),
			this.angle !== void 0 && (t.object.angle = this.angle),
			this.decay !== void 0 && (t.object.decay = this.decay),
			this.penumbra !== void 0 && (t.object.penumbra = this.penumbra),
			this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()),
			t
		);
	}
}
Wt.prototype.isLight = !0;
class Bl extends Wt {
	constructor(e, t, n) {
		super(e, n),
			(this.type = "HemisphereLight"),
			this.position.copy(Fe.DefaultUp),
			this.updateMatrix(),
			(this.groundColor = new re(t));
	}
	copy(e) {
		return (
			Wt.prototype.copy.call(this, e), this.groundColor.copy(e.groundColor), this
		);
	}
}
Bl.prototype.isHemisphereLight = !0;
const eh = new pe(),
	th = new w(),
	nh = new w();
class zl {
	constructor(e) {
		(this.camera = e),
			(this.bias = 0),
			(this.normalBias = 0),
			(this.radius = 1),
			(this.blurSamples = 8),
			(this.mapSize = new G(512, 512)),
			(this.map = null),
			(this.mapPass = null),
			(this.matrix = new pe()),
			(this.autoUpdate = !0),
			(this.needsUpdate = !1),
			(this._frustum = new Qr()),
			(this._frameExtents = new G(1, 1)),
			(this._viewportCount = 1),
			(this._viewports = [new We(0, 0, 1, 1)]);
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(e) {
		const t = this.camera,
			n = this.matrix;
		th.setFromMatrixPosition(e.matrixWorld),
			t.position.copy(th),
			nh.setFromMatrixPosition(e.target.matrixWorld),
			t.lookAt(nh),
			t.updateMatrixWorld(),
			eh.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
			this._frustum.setFromProjectionMatrix(eh),
			n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
			n.multiply(t.projectionMatrix),
			n.multiply(t.matrixWorldInverse);
	}
	getViewport(e) {
		return this._viewports[e];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(e) {
		return (
			(this.camera = e.camera.clone()),
			(this.bias = e.bias),
			(this.radius = e.radius),
			this.mapSize.copy(e.mapSize),
			this
		);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		const e = {};
		return (
			this.bias !== 0 && (e.bias = this.bias),
			this.normalBias !== 0 && (e.normalBias = this.normalBias),
			this.radius !== 1 && (e.radius = this.radius),
			(this.mapSize.x !== 512 || this.mapSize.y !== 512) &&
				(e.mapSize = this.mapSize.toArray()),
			(e.camera = this.camera.toJSON(!1).object),
			delete e.camera.matrix,
			e
		);
	}
}
class dd extends zl {
	constructor() {
		super(new pt(50, 1, 0.5, 500)), (this.focus = 1);
	}
	updateMatrices(e) {
		const t = this.camera,
			n = Hr * 2 * e.angle * this.focus,
			i = this.mapSize.width / this.mapSize.height,
			r = e.distance || t.far;
		(n !== t.fov || i !== t.aspect || r !== t.far) &&
			((t.fov = n), (t.aspect = i), (t.far = r), t.updateProjectionMatrix()),
			super.updateMatrices(e);
	}
	copy(e) {
		return super.copy(e), (this.focus = e.focus), this;
	}
}
dd.prototype.isSpotLightShadow = !0;
class Nl extends Wt {
	constructor(e, t, n = 0, i = Math.PI / 3, r = 0, o = 1) {
		super(e, t),
			(this.type = "SpotLight"),
			this.position.copy(Fe.DefaultUp),
			this.updateMatrix(),
			(this.target = new Fe()),
			(this.distance = n),
			(this.angle = i),
			(this.penumbra = r),
			(this.decay = o),
			(this.shadow = new dd());
	}
	get power() {
		return this.intensity * Math.PI;
	}
	set power(e) {
		this.intensity = e / Math.PI;
	}
	dispose() {
		this.shadow.dispose();
	}
	copy(e) {
		return (
			super.copy(e),
			(this.distance = e.distance),
			(this.angle = e.angle),
			(this.penumbra = e.penumbra),
			(this.decay = e.decay),
			(this.target = e.target.clone()),
			(this.shadow = e.shadow.clone()),
			this
		);
	}
}
Nl.prototype.isSpotLight = !0;
const ih = new pe(),
	Ar = new w(),
	va = new w();
class fd extends zl {
	constructor() {
		super(new pt(90, 1, 0.5, 500)),
			(this._frameExtents = new G(4, 2)),
			(this._viewportCount = 6),
			(this._viewports = [
				new We(2, 1, 1, 1),
				new We(0, 1, 1, 1),
				new We(3, 1, 1, 1),
				new We(1, 1, 1, 1),
				new We(3, 0, 1, 1),
				new We(1, 0, 1, 1)
			]),
			(this._cubeDirections = [
				new w(1, 0, 0),
				new w(-1, 0, 0),
				new w(0, 0, 1),
				new w(0, 0, -1),
				new w(0, 1, 0),
				new w(0, -1, 0)
			]),
			(this._cubeUps = [
				new w(0, 1, 0),
				new w(0, 1, 0),
				new w(0, 1, 0),
				new w(0, 1, 0),
				new w(0, 0, 1),
				new w(0, 0, -1)
			]);
	}
	updateMatrices(e, t = 0) {
		const n = this.camera,
			i = this.matrix,
			r = e.distance || n.far;
		r !== n.far && ((n.far = r), n.updateProjectionMatrix()),
			Ar.setFromMatrixPosition(e.matrixWorld),
			n.position.copy(Ar),
			va.copy(n.position),
			va.add(this._cubeDirections[t]),
			n.up.copy(this._cubeUps[t]),
			n.lookAt(va),
			n.updateMatrixWorld(),
			i.makeTranslation(-Ar.x, -Ar.y, -Ar.z),
			ih.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse),
			this._frustum.setFromProjectionMatrix(ih);
	}
}
fd.prototype.isPointLightShadow = !0;
class Ol extends Wt {
	constructor(e, t, n = 0, i = 1) {
		super(e, t),
			(this.type = "PointLight"),
			(this.distance = n),
			(this.decay = i),
			(this.shadow = new fd());
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(e) {
		this.intensity = e / (4 * Math.PI);
	}
	dispose() {
		this.shadow.dispose();
	}
	copy(e) {
		return (
			super.copy(e),
			(this.distance = e.distance),
			(this.decay = e.decay),
			(this.shadow = e.shadow.clone()),
			this
		);
	}
}
Ol.prototype.isPointLight = !0;
class pd extends zl {
	constructor() {
		super(new _i(-5, 5, 5, -5, 0.5, 500));
	}
}
pd.prototype.isDirectionalLightShadow = !0;
class Ul extends Wt {
	constructor(e, t) {
		super(e, t),
			(this.type = "DirectionalLight"),
			this.position.copy(Fe.DefaultUp),
			this.updateMatrix(),
			(this.target = new Fe()),
			(this.shadow = new pd());
	}
	dispose() {
		this.shadow.dispose();
	}
	copy(e) {
		return (
			super.copy(e),
			(this.target = e.target.clone()),
			(this.shadow = e.shadow.clone()),
			this
		);
	}
}
Ul.prototype.isDirectionalLight = !0;
class Hl extends Wt {
	constructor(e, t) {
		super(e, t), (this.type = "AmbientLight");
	}
}
Hl.prototype.isAmbientLight = !0;
class Gl extends Wt {
	constructor(e, t, n = 10, i = 10) {
		super(e, t),
			(this.type = "RectAreaLight"),
			(this.width = n),
			(this.height = i);
	}
	get power() {
		return this.intensity * this.width * this.height * Math.PI;
	}
	set power(e) {
		this.intensity = e / (this.width * this.height * Math.PI);
	}
	copy(e) {
		return super.copy(e), (this.width = e.width), (this.height = e.height), this;
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return (t.object.width = this.width), (t.object.height = this.height), t;
	}
}
Gl.prototype.isRectAreaLight = !0;
class kl {
	constructor() {
		this.coefficients = [];
		for (let e = 0; e < 9; e++) this.coefficients.push(new w());
	}
	set(e) {
		for (let t = 0; t < 9; t++) this.coefficients[t].copy(e[t]);
		return this;
	}
	zero() {
		for (let e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0);
		return this;
	}
	getAt(e, t) {
		const n = e.x,
			i = e.y,
			r = e.z,
			o = this.coefficients;
		return (
			t.copy(o[0]).multiplyScalar(0.282095),
			t.addScaledVector(o[1], 0.488603 * i),
			t.addScaledVector(o[2], 0.488603 * r),
			t.addScaledVector(o[3], 0.488603 * n),
			t.addScaledVector(o[4], 1.092548 * (n * i)),
			t.addScaledVector(o[5], 1.092548 * (i * r)),
			t.addScaledVector(o[6], 0.315392 * (3 * r * r - 1)),
			t.addScaledVector(o[7], 1.092548 * (n * r)),
			t.addScaledVector(o[8], 0.546274 * (n * n - i * i)),
			t
		);
	}
	getIrradianceAt(e, t) {
		const n = e.x,
			i = e.y,
			r = e.z,
			o = this.coefficients;
		return (
			t.copy(o[0]).multiplyScalar(0.886227),
			t.addScaledVector(o[1], 2 * 0.511664 * i),
			t.addScaledVector(o[2], 2 * 0.511664 * r),
			t.addScaledVector(o[3], 2 * 0.511664 * n),
			t.addScaledVector(o[4], 2 * 0.429043 * n * i),
			t.addScaledVector(o[5], 2 * 0.429043 * i * r),
			t.addScaledVector(o[6], 0.743125 * r * r - 0.247708),
			t.addScaledVector(o[7], 2 * 0.429043 * n * r),
			t.addScaledVector(o[8], 0.429043 * (n * n - i * i)),
			t
		);
	}
	add(e) {
		for (let t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]);
		return this;
	}
	addScaledSH(e, t) {
		for (let n = 0; n < 9; n++)
			this.coefficients[n].addScaledVector(e.coefficients[n], t);
		return this;
	}
	scale(e) {
		for (let t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e);
		return this;
	}
	lerp(e, t) {
		for (let n = 0; n < 9; n++) this.coefficients[n].lerp(e.coefficients[n], t);
		return this;
	}
	equals(e) {
		for (let t = 0; t < 9; t++)
			if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
		return !0;
	}
	copy(e) {
		return this.set(e.coefficients);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	fromArray(e, t = 0) {
		const n = this.coefficients;
		for (let i = 0; i < 9; i++) n[i].fromArray(e, t + i * 3);
		return this;
	}
	toArray(e = [], t = 0) {
		const n = this.coefficients;
		for (let i = 0; i < 9; i++) n[i].toArray(e, t + i * 3);
		return e;
	}
	static getBasisAt(e, t) {
		const n = e.x,
			i = e.y,
			r = e.z;
		(t[0] = 0.282095),
			(t[1] = 0.488603 * i),
			(t[2] = 0.488603 * r),
			(t[3] = 0.488603 * n),
			(t[4] = 1.092548 * n * i),
			(t[5] = 1.092548 * i * r),
			(t[6] = 0.315392 * (3 * r * r - 1)),
			(t[7] = 1.092548 * n * r),
			(t[8] = 0.546274 * (n * n - i * i));
	}
}
kl.prototype.isSphericalHarmonics3 = !0;
class ss extends Wt {
	constructor(e = new kl(), t = 1) {
		super(void 0, t), (this.sh = e);
	}
	copy(e) {
		return super.copy(e), this.sh.copy(e.sh), this;
	}
	fromJSON(e) {
		return (this.intensity = e.intensity), this.sh.fromArray(e.sh), this;
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return (t.object.sh = this.sh.toArray()), t;
	}
}
ss.prototype.isLightProbe = !0;
class md extends Ct {
	constructor(e) {
		super(e), (this.textures = {});
	}
	load(e, t, n, i) {
		const r = this,
			o = new nn(r.manager);
		o.setPath(r.path),
			o.setRequestHeader(r.requestHeader),
			o.setWithCredentials(r.withCredentials),
			o.load(
				e,
				function (a) {
					try {
						t(r.parse(JSON.parse(a)));
					} catch (l) {
						i ? i(l) : console.error(l), r.manager.itemError(e);
					}
				},
				n,
				i
			);
	}
	parse(e) {
		const t = this.textures;
		function n(r) {
			return (
				t[r] === void 0 &&
					console.warn("THREE.MaterialLoader: Undefined texture", r),
				t[r]
			);
		}
		const i = new U0[e.type]();
		if (
			(e.uuid !== void 0 && (i.uuid = e.uuid),
			e.name !== void 0 && (i.name = e.name),
			e.color !== void 0 && i.color !== void 0 && i.color.setHex(e.color),
			e.roughness !== void 0 && (i.roughness = e.roughness),
			e.metalness !== void 0 && (i.metalness = e.metalness),
			e.sheen !== void 0 && (i.sheen = e.sheen),
			e.sheenColor !== void 0 && (i.sheenColor = new re().setHex(e.sheenColor)),
			e.sheenRoughness !== void 0 && (i.sheenRoughness = e.sheenRoughness),
			e.emissive !== void 0 &&
				i.emissive !== void 0 &&
				i.emissive.setHex(e.emissive),
			e.specular !== void 0 &&
				i.specular !== void 0 &&
				i.specular.setHex(e.specular),
			e.specularIntensity !== void 0 &&
				(i.specularIntensity = e.specularIntensity),
			e.specularColor !== void 0 &&
				i.specularColor !== void 0 &&
				i.specularColor.setHex(e.specularColor),
			e.shininess !== void 0 && (i.shininess = e.shininess),
			e.clearcoat !== void 0 && (i.clearcoat = e.clearcoat),
			e.clearcoatRoughness !== void 0 &&
				(i.clearcoatRoughness = e.clearcoatRoughness),
			e.transmission !== void 0 && (i.transmission = e.transmission),
			e.thickness !== void 0 && (i.thickness = e.thickness),
			e.attenuationDistance !== void 0 &&
				(i.attenuationDistance = e.attenuationDistance),
			e.attenuationColor !== void 0 &&
				i.attenuationColor !== void 0 &&
				i.attenuationColor.setHex(e.attenuationColor),
			e.fog !== void 0 && (i.fog = e.fog),
			e.flatShading !== void 0 && (i.flatShading = e.flatShading),
			e.blending !== void 0 && (i.blending = e.blending),
			e.combine !== void 0 && (i.combine = e.combine),
			e.side !== void 0 && (i.side = e.side),
			e.shadowSide !== void 0 && (i.shadowSide = e.shadowSide),
			e.opacity !== void 0 && (i.opacity = e.opacity),
			e.transparent !== void 0 && (i.transparent = e.transparent),
			e.alphaTest !== void 0 && (i.alphaTest = e.alphaTest),
			e.depthTest !== void 0 && (i.depthTest = e.depthTest),
			e.depthWrite !== void 0 && (i.depthWrite = e.depthWrite),
			e.colorWrite !== void 0 && (i.colorWrite = e.colorWrite),
			e.stencilWrite !== void 0 && (i.stencilWrite = e.stencilWrite),
			e.stencilWriteMask !== void 0 && (i.stencilWriteMask = e.stencilWriteMask),
			e.stencilFunc !== void 0 && (i.stencilFunc = e.stencilFunc),
			e.stencilRef !== void 0 && (i.stencilRef = e.stencilRef),
			e.stencilFuncMask !== void 0 && (i.stencilFuncMask = e.stencilFuncMask),
			e.stencilFail !== void 0 && (i.stencilFail = e.stencilFail),
			e.stencilZFail !== void 0 && (i.stencilZFail = e.stencilZFail),
			e.stencilZPass !== void 0 && (i.stencilZPass = e.stencilZPass),
			e.wireframe !== void 0 && (i.wireframe = e.wireframe),
			e.wireframeLinewidth !== void 0 &&
				(i.wireframeLinewidth = e.wireframeLinewidth),
			e.wireframeLinecap !== void 0 && (i.wireframeLinecap = e.wireframeLinecap),
			e.wireframeLinejoin !== void 0 &&
				(i.wireframeLinejoin = e.wireframeLinejoin),
			e.rotation !== void 0 && (i.rotation = e.rotation),
			e.linewidth !== 1 && (i.linewidth = e.linewidth),
			e.dashSize !== void 0 && (i.dashSize = e.dashSize),
			e.gapSize !== void 0 && (i.gapSize = e.gapSize),
			e.scale !== void 0 && (i.scale = e.scale),
			e.polygonOffset !== void 0 && (i.polygonOffset = e.polygonOffset),
			e.polygonOffsetFactor !== void 0 &&
				(i.polygonOffsetFactor = e.polygonOffsetFactor),
			e.polygonOffsetUnits !== void 0 &&
				(i.polygonOffsetUnits = e.polygonOffsetUnits),
			e.dithering !== void 0 && (i.dithering = e.dithering),
			e.alphaToCoverage !== void 0 && (i.alphaToCoverage = e.alphaToCoverage),
			e.premultipliedAlpha !== void 0 &&
				(i.premultipliedAlpha = e.premultipliedAlpha),
			e.visible !== void 0 && (i.visible = e.visible),
			e.toneMapped !== void 0 && (i.toneMapped = e.toneMapped),
			e.userData !== void 0 && (i.userData = e.userData),
			e.vertexColors !== void 0 &&
				(typeof e.vertexColors == "number"
					? (i.vertexColors = e.vertexColors > 0)
					: (i.vertexColors = e.vertexColors)),
			e.uniforms !== void 0)
		)
			for (const r in e.uniforms) {
				const o = e.uniforms[r];
				switch (((i.uniforms[r] = {}), o.type)) {
					case "t":
						i.uniforms[r].value = n(o.value);
						break;
					case "c":
						i.uniforms[r].value = new re().setHex(o.value);
						break;
					case "v2":
						i.uniforms[r].value = new G().fromArray(o.value);
						break;
					case "v3":
						i.uniforms[r].value = new w().fromArray(o.value);
						break;
					case "v4":
						i.uniforms[r].value = new We().fromArray(o.value);
						break;
					case "m3":
						i.uniforms[r].value = new mt().fromArray(o.value);
						break;
					case "m4":
						i.uniforms[r].value = new pe().fromArray(o.value);
						break;
					default:
						i.uniforms[r].value = o.value;
				}
			}
		if (
			(e.defines !== void 0 && (i.defines = e.defines),
			e.vertexShader !== void 0 && (i.vertexShader = e.vertexShader),
			e.fragmentShader !== void 0 && (i.fragmentShader = e.fragmentShader),
			e.extensions !== void 0)
		)
			for (const r in e.extensions) i.extensions[r] = e.extensions[r];
		if (
			(e.shading !== void 0 && (i.flatShading = e.shading === 1),
			e.size !== void 0 && (i.size = e.size),
			e.sizeAttenuation !== void 0 && (i.sizeAttenuation = e.sizeAttenuation),
			e.map !== void 0 && (i.map = n(e.map)),
			e.matcap !== void 0 && (i.matcap = n(e.matcap)),
			e.alphaMap !== void 0 && (i.alphaMap = n(e.alphaMap)),
			e.bumpMap !== void 0 && (i.bumpMap = n(e.bumpMap)),
			e.bumpScale !== void 0 && (i.bumpScale = e.bumpScale),
			e.normalMap !== void 0 && (i.normalMap = n(e.normalMap)),
			e.normalMapType !== void 0 && (i.normalMapType = e.normalMapType),
			e.normalScale !== void 0)
		) {
			let r = e.normalScale;
			Array.isArray(r) === !1 && (r = [r, r]),
				(i.normalScale = new G().fromArray(r));
		}
		return (
			e.displacementMap !== void 0 && (i.displacementMap = n(e.displacementMap)),
			e.displacementScale !== void 0 &&
				(i.displacementScale = e.displacementScale),
			e.displacementBias !== void 0 && (i.displacementBias = e.displacementBias),
			e.roughnessMap !== void 0 && (i.roughnessMap = n(e.roughnessMap)),
			e.metalnessMap !== void 0 && (i.metalnessMap = n(e.metalnessMap)),
			e.emissiveMap !== void 0 && (i.emissiveMap = n(e.emissiveMap)),
			e.emissiveIntensity !== void 0 &&
				(i.emissiveIntensity = e.emissiveIntensity),
			e.specularMap !== void 0 && (i.specularMap = n(e.specularMap)),
			e.specularIntensityMap !== void 0 &&
				(i.specularIntensityMap = n(e.specularIntensityMap)),
			e.specularColorMap !== void 0 &&
				(i.specularColorMap = n(e.specularColorMap)),
			e.envMap !== void 0 && (i.envMap = n(e.envMap)),
			e.envMapIntensity !== void 0 && (i.envMapIntensity = e.envMapIntensity),
			e.reflectivity !== void 0 && (i.reflectivity = e.reflectivity),
			e.refractionRatio !== void 0 && (i.refractionRatio = e.refractionRatio),
			e.lightMap !== void 0 && (i.lightMap = n(e.lightMap)),
			e.lightMapIntensity !== void 0 &&
				(i.lightMapIntensity = e.lightMapIntensity),
			e.aoMap !== void 0 && (i.aoMap = n(e.aoMap)),
			e.aoMapIntensity !== void 0 && (i.aoMapIntensity = e.aoMapIntensity),
			e.gradientMap !== void 0 && (i.gradientMap = n(e.gradientMap)),
			e.clearcoatMap !== void 0 && (i.clearcoatMap = n(e.clearcoatMap)),
			e.clearcoatRoughnessMap !== void 0 &&
				(i.clearcoatRoughnessMap = n(e.clearcoatRoughnessMap)),
			e.clearcoatNormalMap !== void 0 &&
				(i.clearcoatNormalMap = n(e.clearcoatNormalMap)),
			e.clearcoatNormalScale !== void 0 &&
				(i.clearcoatNormalScale = new G().fromArray(e.clearcoatNormalScale)),
			e.transmissionMap !== void 0 && (i.transmissionMap = n(e.transmissionMap)),
			e.thicknessMap !== void 0 && (i.thicknessMap = n(e.thicknessMap)),
			e.sheenColorMap !== void 0 && (i.sheenColorMap = n(e.sheenColorMap)),
			e.sheenRoughnessMap !== void 0 &&
				(i.sheenRoughnessMap = n(e.sheenRoughnessMap)),
			i
		);
	}
	setTextures(e) {
		return (this.textures = e), this;
	}
}
class ho {
	static decodeText(e) {
		if (typeof TextDecoder != "undefined") return new TextDecoder().decode(e);
		let t = "";
		for (let n = 0, i = e.length; n < i; n++) t += String.fromCharCode(e[n]);
		try {
			return decodeURIComponent(escape(t));
		} catch {
			return t;
		}
	}
	static extractUrlBase(e) {
		const t = e.lastIndexOf("/");
		return t === -1 ? "./" : e.substr(0, t + 1);
	}
	static resolveURL(e, t) {
		return typeof e != "string" || e === ""
			? ""
			: (/^https?:\/\//i.test(t) &&
					/^\//.test(e) &&
					(t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
			  /^(https?:)?\/\//i.test(e) ||
			  /^data:.*,.*$/i.test(e) ||
			  /^blob:.*$/i.test(e)
					? e
					: t + e);
	}
}
class Vl extends Me {
	constructor() {
		super(),
			(this.type = "InstancedBufferGeometry"),
			(this.instanceCount = 1 / 0);
	}
	copy(e) {
		return super.copy(e), (this.instanceCount = e.instanceCount), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		const e = super.toJSON(this);
		return (
			(e.instanceCount = this.instanceCount), (e.isInstancedBufferGeometry = !0), e
		);
	}
}
Vl.prototype.isInstancedBufferGeometry = !0;
class gd extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = this,
			o = new nn(r.manager);
		o.setPath(r.path),
			o.setRequestHeader(r.requestHeader),
			o.setWithCredentials(r.withCredentials),
			o.load(
				e,
				function (a) {
					try {
						t(r.parse(JSON.parse(a)));
					} catch (l) {
						i ? i(l) : console.error(l), r.manager.itemError(e);
					}
				},
				n,
				i
			);
	}
	parse(e) {
		const t = {},
			n = {};
		function i(f, m) {
			if (t[m] !== void 0) return t[m];
			const y = f.interleavedBuffers[m],
				g = r(f, y.buffer),
				p = Xi(y.type, g),
				M = new bi(p, y.stride);
			return (M.uuid = y.uuid), (t[m] = M), M;
		}
		function r(f, m) {
			if (n[m] !== void 0) return n[m];
			const y = f.arrayBuffers[m],
				g = new Uint32Array(y).buffer;
			return (n[m] = g), g;
		}
		const o = e.isInstancedBufferGeometry ? new Vl() : new Me(),
			a = e.data.index;
		if (a !== void 0) {
			const f = Xi(a.type, a.array);
			o.setIndex(new Oe(f, 1));
		}
		const l = e.data.attributes;
		for (const f in l) {
			const m = l[f];
			let x;
			if (m.isInterleavedBufferAttribute) {
				const y = i(e.data, m.data);
				x = new Fn(y, m.itemSize, m.offset, m.normalized);
			} else {
				const y = Xi(m.type, m.array),
					g = m.isInstancedBufferAttribute ? hi : Oe;
				x = new g(y, m.itemSize, m.normalized);
			}
			m.name !== void 0 && (x.name = m.name),
				m.usage !== void 0 && x.setUsage(m.usage),
				m.updateRange !== void 0 &&
					((x.updateRange.offset = m.updateRange.offset),
					(x.updateRange.count = m.updateRange.count)),
				o.setAttribute(f, x);
		}
		const c = e.data.morphAttributes;
		if (c)
			for (const f in c) {
				const m = c[f],
					x = [];
				for (let y = 0, g = m.length; y < g; y++) {
					const p = m[y];
					let M;
					if (p.isInterleavedBufferAttribute) {
						const v = i(e.data, p.data);
						M = new Fn(v, p.itemSize, p.offset, p.normalized);
					} else {
						const v = Xi(p.type, p.array);
						M = new Oe(v, p.itemSize, p.normalized);
					}
					p.name !== void 0 && (M.name = p.name), x.push(M);
				}
				o.morphAttributes[f] = x;
			}
		e.data.morphTargetsRelative && (o.morphTargetsRelative = !0);
		const u = e.data.groups || e.data.drawcalls || e.data.offsets;
		if (u !== void 0)
			for (let f = 0, m = u.length; f !== m; ++f) {
				const x = u[f];
				o.addGroup(x.start, x.count, x.materialIndex);
			}
		const d = e.data.boundingSphere;
		if (d !== void 0) {
			const f = new w();
			d.center !== void 0 && f.fromArray(d.center),
				(o.boundingSphere = new On(f, d.radius));
		}
		return (
			e.name && (o.name = e.name), e.userData && (o.userData = e.userData), o
		);
	}
}
class W0 extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = this,
			o = this.path === "" ? ho.extractUrlBase(e) : this.path;
		this.resourcePath = this.resourcePath || o;
		const a = new nn(this.manager);
		a.setPath(this.path),
			a.setRequestHeader(this.requestHeader),
			a.setWithCredentials(this.withCredentials),
			a.load(
				e,
				function (l) {
					let c = null;
					try {
						c = JSON.parse(l);
					} catch (u) {
						i !== void 0 && i(u),
							console.error("THREE:ObjectLoader: Can't parse " + e + ".", u.message);
						return;
					}
					const h = c.metadata;
					if (
						h === void 0 ||
						h.type === void 0 ||
						h.type.toLowerCase() === "geometry"
					) {
						console.error("THREE.ObjectLoader: Can't load " + e);
						return;
					}
					r.parse(c, t);
				},
				n,
				i
			);
	}
	async loadAsync(e, t) {
		const n = this,
			i = this.path === "" ? ho.extractUrlBase(e) : this.path;
		this.resourcePath = this.resourcePath || i;
		const r = new nn(this.manager);
		r.setPath(this.path),
			r.setRequestHeader(this.requestHeader),
			r.setWithCredentials(this.withCredentials);
		const o = await r.loadAsync(e, t),
			a = JSON.parse(o),
			l = a.metadata;
		if (l === void 0 || l.type === void 0 || l.type.toLowerCase() === "geometry")
			throw new Error("THREE.ObjectLoader: Can't load " + e);
		return await n.parseAsync(a);
	}
	parse(e, t) {
		const n = this.parseAnimations(e.animations),
			i = this.parseShapes(e.shapes),
			r = this.parseGeometries(e.geometries, i),
			o = this.parseImages(e.images, function () {
				t !== void 0 && t(c);
			}),
			a = this.parseTextures(e.textures, o),
			l = this.parseMaterials(e.materials, a),
			c = this.parseObject(e.object, r, l, a, n),
			h = this.parseSkeletons(e.skeletons, c);
		if ((this.bindSkeletons(c, h), t !== void 0)) {
			let u = !1;
			for (const d in o)
				if (o[d] instanceof HTMLImageElement) {
					u = !0;
					break;
				}
			u === !1 && t(c);
		}
		return c;
	}
	async parseAsync(e) {
		const t = this.parseAnimations(e.animations),
			n = this.parseShapes(e.shapes),
			i = this.parseGeometries(e.geometries, n),
			r = await this.parseImagesAsync(e.images),
			o = this.parseTextures(e.textures, r),
			a = this.parseMaterials(e.materials, o),
			l = this.parseObject(e.object, i, a, o, t),
			c = this.parseSkeletons(e.skeletons, l);
		return this.bindSkeletons(l, c), l;
	}
	parseShapes(e) {
		const t = {};
		if (e !== void 0)
			for (let n = 0, i = e.length; n < i; n++) {
				const r = new $t().fromJSON(e[n]);
				t[r.uuid] = r;
			}
		return t;
	}
	parseSkeletons(e, t) {
		const n = {},
			i = {};
		if (
			(t.traverse(function (r) {
				r.isBone && (i[r.uuid] = r);
			}),
			e !== void 0)
		)
			for (let r = 0, o = e.length; r < o; r++) {
				const a = new Do().fromJSON(e[r], i);
				n[a.uuid] = a;
			}
		return n;
	}
	parseGeometries(e, t) {
		const n = {};
		if (e !== void 0) {
			const i = new gd();
			for (let r = 0, o = e.length; r < o; r++) {
				let a;
				const l = e[r];
				switch (l.type) {
					case "BufferGeometry":
					case "InstancedBufferGeometry":
						a = i.parse(l);
						break;
					case "Geometry":
						console.error(
							"THREE.ObjectLoader: The legacy Geometry type is no longer supported."
						);
						break;
					default:
						l.type in Qc
							? (a = Qc[l.type].fromJSON(l, t))
							: console.warn(
									`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`
							  );
				}
				(a.uuid = l.uuid),
					l.name !== void 0 && (a.name = l.name),
					a.isBufferGeometry === !0 &&
						l.userData !== void 0 &&
						(a.userData = l.userData),
					(n[l.uuid] = a);
			}
		}
		return n;
	}
	parseMaterials(e, t) {
		const n = {},
			i = {};
		if (e !== void 0) {
			const r = new md();
			r.setTextures(t);
			for (let o = 0, a = e.length; o < a; o++) {
				const l = e[o];
				if (l.type === "MultiMaterial") {
					const c = [];
					for (let h = 0; h < l.materials.length; h++) {
						const u = l.materials[h];
						n[u.uuid] === void 0 && (n[u.uuid] = r.parse(u)), c.push(n[u.uuid]);
					}
					i[l.uuid] = c;
				} else
					n[l.uuid] === void 0 && (n[l.uuid] = r.parse(l)), (i[l.uuid] = n[l.uuid]);
			}
		}
		return i;
	}
	parseAnimations(e) {
		const t = {};
		if (e !== void 0)
			for (let n = 0; n < e.length; n++) {
				const i = e[n],
					r = Zr.parse(i);
				t[r.uuid] = r;
			}
		return t;
	}
	parseImages(e, t) {
		const n = this,
			i = {};
		let r;
		function o(l) {
			return (
				n.manager.itemStart(l),
				r.load(
					l,
					function () {
						n.manager.itemEnd(l);
					},
					void 0,
					function () {
						n.manager.itemError(l), n.manager.itemEnd(l);
					}
				)
			);
		}
		function a(l) {
			if (typeof l == "string") {
				const c = l,
					h = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c) ? c : n.resourcePath + c;
				return o(h);
			} else
				return l.data
					? { data: Xi(l.type, l.data), width: l.width, height: l.height }
					: null;
		}
		if (e !== void 0 && e.length > 0) {
			const l = new Fl(t);
			(r = new Jr(l)), r.setCrossOrigin(this.crossOrigin);
			for (let c = 0, h = e.length; c < h; c++) {
				const u = e[c],
					d = u.url;
				if (Array.isArray(d)) {
					i[u.uuid] = [];
					for (let f = 0, m = d.length; f < m; f++) {
						const x = d[f],
							y = a(x);
						y !== null &&
							(y instanceof HTMLImageElement
								? i[u.uuid].push(y)
								: i[u.uuid].push(new oi(y.data, y.width, y.height)));
					}
				} else {
					const f = a(u.url);
					f !== null && (i[u.uuid] = f);
				}
			}
		}
		return i;
	}
	async parseImagesAsync(e) {
		const t = this,
			n = {};
		let i;
		async function r(o) {
			if (typeof o == "string") {
				const a = o,
					l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(a) ? a : t.resourcePath + a;
				return await i.loadAsync(l);
			} else
				return o.data
					? { data: Xi(o.type, o.data), width: o.width, height: o.height }
					: null;
		}
		if (e !== void 0 && e.length > 0) {
			(i = new Jr(this.manager)), i.setCrossOrigin(this.crossOrigin);
			for (let o = 0, a = e.length; o < a; o++) {
				const l = e[o],
					c = l.url;
				if (Array.isArray(c)) {
					n[l.uuid] = [];
					for (let h = 0, u = c.length; h < u; h++) {
						const d = c[h],
							f = await r(d);
						f !== null &&
							(f instanceof HTMLImageElement
								? n[l.uuid].push(f)
								: n[l.uuid].push(new oi(f.data, f.width, f.height)));
					}
				} else {
					const h = await r(l.url);
					h !== null && (n[l.uuid] = h);
				}
			}
		}
		return n;
	}
	parseTextures(e, t) {
		function n(r, o) {
			return typeof r == "number"
				? r
				: (console.warn(
						"THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",
						r
				  ),
				  o[r]);
		}
		const i = {};
		if (e !== void 0)
			for (let r = 0, o = e.length; r < o; r++) {
				const a = e[r];
				a.image === void 0 &&
					console.warn('THREE.ObjectLoader: No "image" specified for', a.uuid),
					t[a.image] === void 0 &&
						console.warn("THREE.ObjectLoader: Undefined image", a.image);
				let l;
				const c = t[a.image];
				Array.isArray(c)
					? ((l = new dr(c)), c.length === 6 && (l.needsUpdate = !0))
					: (c && c.data ? (l = new oi(c.data, c.width, c.height)) : (l = new dt(c)),
					  c && (l.needsUpdate = !0)),
					(l.uuid = a.uuid),
					a.name !== void 0 && (l.name = a.name),
					a.mapping !== void 0 && (l.mapping = n(a.mapping, q0)),
					a.offset !== void 0 && l.offset.fromArray(a.offset),
					a.repeat !== void 0 && l.repeat.fromArray(a.repeat),
					a.center !== void 0 && l.center.fromArray(a.center),
					a.rotation !== void 0 && (l.rotation = a.rotation),
					a.wrap !== void 0 &&
						((l.wrapS = n(a.wrap[0], rh)), (l.wrapT = n(a.wrap[1], rh))),
					a.format !== void 0 && (l.format = a.format),
					a.type !== void 0 && (l.type = a.type),
					a.encoding !== void 0 && (l.encoding = a.encoding),
					a.minFilter !== void 0 && (l.minFilter = n(a.minFilter, sh)),
					a.magFilter !== void 0 && (l.magFilter = n(a.magFilter, sh)),
					a.anisotropy !== void 0 && (l.anisotropy = a.anisotropy),
					a.flipY !== void 0 && (l.flipY = a.flipY),
					a.premultiplyAlpha !== void 0 && (l.premultiplyAlpha = a.premultiplyAlpha),
					a.unpackAlignment !== void 0 && (l.unpackAlignment = a.unpackAlignment),
					a.userData !== void 0 && (l.userData = a.userData),
					(i[a.uuid] = l);
			}
		return i;
	}
	parseObject(e, t, n, i, r) {
		let o;
		function a(d) {
			return (
				t[d] === void 0 &&
					console.warn("THREE.ObjectLoader: Undefined geometry", d),
				t[d]
			);
		}
		function l(d) {
			if (d !== void 0) {
				if (Array.isArray(d)) {
					const f = [];
					for (let m = 0, x = d.length; m < x; m++) {
						const y = d[m];
						n[y] === void 0 &&
							console.warn("THREE.ObjectLoader: Undefined material", y),
							f.push(n[y]);
					}
					return f;
				}
				return (
					n[d] === void 0 &&
						console.warn("THREE.ObjectLoader: Undefined material", d),
					n[d]
				);
			}
		}
		function c(d) {
			return (
				i[d] === void 0 && console.warn("THREE.ObjectLoader: Undefined texture", d),
				i[d]
			);
		}
		let h, u;
		switch (e.type) {
			case "Scene":
				(o = new Ao()),
					e.background !== void 0 &&
						(Number.isInteger(e.background)
							? (o.background = new re(e.background))
							: (o.background = c(e.background))),
					e.environment !== void 0 && (o.environment = c(e.environment)),
					e.fog !== void 0 &&
						(e.fog.type === "Fog"
							? (o.fog = new ts(e.fog.color, e.fog.near, e.fog.far))
							: e.fog.type === "FogExp2" &&
							  (o.fog = new es(e.fog.color, e.fog.density)));
				break;
			case "PerspectiveCamera":
				(o = new pt(e.fov, e.aspect, e.near, e.far)),
					e.focus !== void 0 && (o.focus = e.focus),
					e.zoom !== void 0 && (o.zoom = e.zoom),
					e.filmGauge !== void 0 && (o.filmGauge = e.filmGauge),
					e.filmOffset !== void 0 && (o.filmOffset = e.filmOffset),
					e.view !== void 0 && (o.view = Object.assign({}, e.view));
				break;
			case "OrthographicCamera":
				(o = new _i(e.left, e.right, e.top, e.bottom, e.near, e.far)),
					e.zoom !== void 0 && (o.zoom = e.zoom),
					e.view !== void 0 && (o.view = Object.assign({}, e.view));
				break;
			case "AmbientLight":
				o = new Hl(e.color, e.intensity);
				break;
			case "DirectionalLight":
				o = new Ul(e.color, e.intensity);
				break;
			case "PointLight":
				o = new Ol(e.color, e.intensity, e.distance, e.decay);
				break;
			case "RectAreaLight":
				o = new Gl(e.color, e.intensity, e.width, e.height);
				break;
			case "SpotLight":
				o = new Nl(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
				break;
			case "HemisphereLight":
				o = new Bl(e.color, e.groundColor, e.intensity);
				break;
			case "LightProbe":
				o = new ss().fromJSON(e);
				break;
			case "SkinnedMesh":
				(h = a(e.geometry)),
					(u = l(e.material)),
					(o = new Lo(h, u)),
					e.bindMode !== void 0 && (o.bindMode = e.bindMode),
					e.bindMatrix !== void 0 && o.bindMatrix.fromArray(e.bindMatrix),
					e.skeleton !== void 0 && (o.skeleton = e.skeleton);
				break;
			case "Mesh":
				(h = a(e.geometry)), (u = l(e.material)), (o = new je(h, u));
				break;
			case "InstancedMesh":
				(h = a(e.geometry)), (u = l(e.material));
				const d = e.count,
					f = e.instanceMatrix,
					m = e.instanceColor;
				(o = new Io(h, u, d)),
					(o.instanceMatrix = new hi(new Float32Array(f.array), 16)),
					m !== void 0 &&
						(o.instanceColor = new hi(new Float32Array(m.array), m.itemSize));
				break;
			case "LOD":
				o = new ju();
				break;
			case "Line":
				o = new yn(a(e.geometry), l(e.material));
				break;
			case "LineLoop":
				o = new ml(a(e.geometry), l(e.material));
				break;
			case "LineSegments":
				o = new Rt(a(e.geometry), l(e.material));
				break;
			case "PointCloud":
			case "Points":
				o = new ns(a(e.geometry), l(e.material));
				break;
			case "Sprite":
				o = new Ro(l(e.material));
				break;
			case "Group":
				o = new ni();
				break;
			case "Bone":
				o = new Po();
				break;
			default:
				o = new Fe();
		}
		if (
			((o.uuid = e.uuid),
			e.name !== void 0 && (o.name = e.name),
			e.matrix !== void 0
				? (o.matrix.fromArray(e.matrix),
				  e.matrixAutoUpdate !== void 0 &&
						(o.matrixAutoUpdate = e.matrixAutoUpdate),
				  o.matrixAutoUpdate &&
						o.matrix.decompose(o.position, o.quaternion, o.scale))
				: (e.position !== void 0 && o.position.fromArray(e.position),
				  e.rotation !== void 0 && o.rotation.fromArray(e.rotation),
				  e.quaternion !== void 0 && o.quaternion.fromArray(e.quaternion),
				  e.scale !== void 0 && o.scale.fromArray(e.scale)),
			e.castShadow !== void 0 && (o.castShadow = e.castShadow),
			e.receiveShadow !== void 0 && (o.receiveShadow = e.receiveShadow),
			e.shadow &&
				(e.shadow.bias !== void 0 && (o.shadow.bias = e.shadow.bias),
				e.shadow.normalBias !== void 0 &&
					(o.shadow.normalBias = e.shadow.normalBias),
				e.shadow.radius !== void 0 && (o.shadow.radius = e.shadow.radius),
				e.shadow.mapSize !== void 0 && o.shadow.mapSize.fromArray(e.shadow.mapSize),
				e.shadow.camera !== void 0 &&
					(o.shadow.camera = this.parseObject(e.shadow.camera))),
			e.visible !== void 0 && (o.visible = e.visible),
			e.frustumCulled !== void 0 && (o.frustumCulled = e.frustumCulled),
			e.renderOrder !== void 0 && (o.renderOrder = e.renderOrder),
			e.userData !== void 0 && (o.userData = e.userData),
			e.layers !== void 0 && (o.layers.mask = e.layers),
			e.children !== void 0)
		) {
			const d = e.children;
			for (let f = 0; f < d.length; f++) o.add(this.parseObject(d[f], t, n, i, r));
		}
		if (e.animations !== void 0) {
			const d = e.animations;
			for (let f = 0; f < d.length; f++) {
				const m = d[f];
				o.animations.push(r[m]);
			}
		}
		if (e.type === "LOD") {
			e.autoUpdate !== void 0 && (o.autoUpdate = e.autoUpdate);
			const d = e.levels;
			for (let f = 0; f < d.length; f++) {
				const m = d[f],
					x = o.getObjectByProperty("uuid", m.object);
				x !== void 0 && o.addLevel(x, m.distance);
			}
		}
		return o;
	}
	bindSkeletons(e, t) {
		Object.keys(t).length !== 0 &&
			e.traverse(function (n) {
				if (n.isSkinnedMesh === !0 && n.skeleton !== void 0) {
					const i = t[n.skeleton];
					i === void 0
						? console.warn(
								"THREE.ObjectLoader: No skeleton found with UUID:",
								n.skeleton
						  )
						: n.bind(i, n.bindMatrix);
				}
			});
	}
	setTexturePath(e) {
		return (
			console.warn(
				"THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."
			),
			this.setResourcePath(e)
		);
	}
}
const q0 = {
		UVMapping: mo,
		CubeReflectionMapping: mi,
		CubeRefractionMapping: gi,
		EquirectangularReflectionMapping: Ir,
		EquirectangularRefractionMapping: Fr,
		CubeUVReflectionMapping: ur,
		CubeUVRefractionMapping: $r
	},
	rh = {
		RepeatWrapping: Br,
		ClampToEdgeWrapping: wt,
		MirroredRepeatWrapping: zr
	},
	sh = {
		NearestFilter: et,
		NearestMipmapNearestFilter: oo,
		NearestMipmapLinearFilter: ao,
		LinearFilter: Ye,
		LinearMipmapNearestFilter: cl,
		LinearMipmapLinearFilter: xi
	};
class xd extends Ct {
	constructor(e) {
		super(e),
			typeof createImageBitmap == "undefined" &&
				console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),
			typeof fetch == "undefined" &&
				console.warn("THREE.ImageBitmapLoader: fetch() not supported."),
			(this.options = { premultiplyAlpha: "none" });
	}
	setOptions(e) {
		return (this.options = e), this;
	}
	load(e, t, n, i) {
		e === void 0 && (e = ""),
			this.path !== void 0 && (e = this.path + e),
			(e = this.manager.resolveURL(e));
		const r = this,
			o = pi.get(e);
		if (o !== void 0)
			return (
				r.manager.itemStart(e),
				setTimeout(function () {
					t && t(o), r.manager.itemEnd(e);
				}, 0),
				o
			);
		const a = {};
		(a.credentials =
			this.crossOrigin === "anonymous" ? "same-origin" : "include"),
			(a.headers = this.requestHeader),
			fetch(e, a)
				.then(function (l) {
					return l.blob();
				})
				.then(function (l) {
					return createImageBitmap(
						l,
						Object.assign(r.options, { colorSpaceConversion: "none" })
					);
				})
				.then(function (l) {
					pi.add(e, l), t && t(l), r.manager.itemEnd(e);
				})
				.catch(function (l) {
					i && i(l), r.manager.itemError(e), r.manager.itemEnd(e);
				}),
			r.manager.itemStart(e);
	}
}
xd.prototype.isImageBitmapLoader = !0;
let Ws;
const Wl = {
	getContext: function () {
		return (
			Ws === void 0 &&
				(Ws = new (window.AudioContext || window.webkitAudioContext)()),
			Ws
		);
	},
	setContext: function (s) {
		Ws = s;
	}
};
class yd extends Ct {
	constructor(e) {
		super(e);
	}
	load(e, t, n, i) {
		const r = this,
			o = new nn(this.manager);
		o.setResponseType("arraybuffer"),
			o.setPath(this.path),
			o.setRequestHeader(this.requestHeader),
			o.setWithCredentials(this.withCredentials),
			o.load(
				e,
				function (a) {
					try {
						const l = a.slice(0);
						Wl.getContext().decodeAudioData(l, function (h) {
							t(h);
						});
					} catch (l) {
						i ? i(l) : console.error(l), r.manager.itemError(e);
					}
				},
				n,
				i
			);
	}
}
class vd extends ss {
	constructor(e, t, n = 1) {
		super(void 0, n);
		const i = new re().set(e),
			r = new re().set(t),
			o = new w(i.r, i.g, i.b),
			a = new w(r.r, r.g, r.b),
			l = Math.sqrt(Math.PI),
			c = l * Math.sqrt(0.75);
		this.sh.coefficients[0].copy(o).add(a).multiplyScalar(l),
			this.sh.coefficients[1].copy(o).sub(a).multiplyScalar(c);
	}
}
vd.prototype.isHemisphereLightProbe = !0;
class _d extends ss {
	constructor(e, t = 1) {
		super(void 0, t);
		const n = new re().set(e);
		this.sh.coefficients[0]
			.set(n.r, n.g, n.b)
			.multiplyScalar(2 * Math.sqrt(Math.PI));
	}
}
_d.prototype.isAmbientLightProbe = !0;
const oh = new pe(),
	ah = new pe(),
	qn = new pe();
class X0 {
	constructor() {
		(this.type = "StereoCamera"),
			(this.aspect = 1),
			(this.eyeSep = 0.064),
			(this.cameraL = new pt()),
			this.cameraL.layers.enable(1),
			(this.cameraL.matrixAutoUpdate = !1),
			(this.cameraR = new pt()),
			this.cameraR.layers.enable(2),
			(this.cameraR.matrixAutoUpdate = !1),
			(this._cache = {
				focus: null,
				fov: null,
				aspect: null,
				near: null,
				far: null,
				zoom: null,
				eyeSep: null
			});
	}
	update(e) {
		const t = this._cache;
		if (
			t.focus !== e.focus ||
			t.fov !== e.fov ||
			t.aspect !== e.aspect * this.aspect ||
			t.near !== e.near ||
			t.far !== e.far ||
			t.zoom !== e.zoom ||
			t.eyeSep !== this.eyeSep
		) {
			(t.focus = e.focus),
				(t.fov = e.fov),
				(t.aspect = e.aspect * this.aspect),
				(t.near = e.near),
				(t.far = e.far),
				(t.zoom = e.zoom),
				(t.eyeSep = this.eyeSep),
				qn.copy(e.projectionMatrix);
			const i = t.eyeSep / 2,
				r = (i * t.near) / t.focus,
				o = (t.near * Math.tan(si * t.fov * 0.5)) / t.zoom;
			let a, l;
			(ah.elements[12] = -i),
				(oh.elements[12] = i),
				(a = -o * t.aspect + r),
				(l = o * t.aspect + r),
				(qn.elements[0] = (2 * t.near) / (l - a)),
				(qn.elements[8] = (l + a) / (l - a)),
				this.cameraL.projectionMatrix.copy(qn),
				(a = -o * t.aspect - r),
				(l = o * t.aspect - r),
				(qn.elements[0] = (2 * t.near) / (l - a)),
				(qn.elements[8] = (l + a) / (l - a)),
				this.cameraR.projectionMatrix.copy(qn);
		}
		this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(ah),
			this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(oh);
	}
}
class ql {
	constructor(e = !0) {
		(this.autoStart = e),
			(this.startTime = 0),
			(this.oldTime = 0),
			(this.elapsedTime = 0),
			(this.running = !1);
	}
	start() {
		(this.startTime = lh()),
			(this.oldTime = this.startTime),
			(this.elapsedTime = 0),
			(this.running = !0);
	}
	stop() {
		this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
	}
	getElapsedTime() {
		return this.getDelta(), this.elapsedTime;
	}
	getDelta() {
		let e = 0;
		if (this.autoStart && !this.running) return this.start(), 0;
		if (this.running) {
			const t = lh();
			(e = (t - this.oldTime) / 1e3), (this.oldTime = t), (this.elapsedTime += e);
		}
		return e;
	}
}
function lh() {
	return (typeof performance == "undefined" ? Date : performance).now();
}
const Xn = new w(),
	ch = new gt(),
	Y0 = new w(),
	Yn = new w();
class Z0 extends Fe {
	constructor() {
		super(),
			(this.type = "AudioListener"),
			(this.context = Wl.getContext()),
			(this.gain = this.context.createGain()),
			this.gain.connect(this.context.destination),
			(this.filter = null),
			(this.timeDelta = 0),
			(this._clock = new ql());
	}
	getInput() {
		return this.gain;
	}
	removeFilter() {
		return (
			this.filter !== null &&
				(this.gain.disconnect(this.filter),
				this.filter.disconnect(this.context.destination),
				this.gain.connect(this.context.destination),
				(this.filter = null)),
			this
		);
	}
	getFilter() {
		return this.filter;
	}
	setFilter(e) {
		return (
			this.filter !== null
				? (this.gain.disconnect(this.filter),
				  this.filter.disconnect(this.context.destination))
				: this.gain.disconnect(this.context.destination),
			(this.filter = e),
			this.gain.connect(this.filter),
			this.filter.connect(this.context.destination),
			this
		);
	}
	getMasterVolume() {
		return this.gain.gain.value;
	}
	setMasterVolume(e) {
		return (
			this.gain.gain.setTargetAtTime(e, this.context.currentTime, 0.01), this
		);
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e);
		const t = this.context.listener,
			n = this.up;
		if (
			((this.timeDelta = this._clock.getDelta()),
			this.matrixWorld.decompose(Xn, ch, Y0),
			Yn.set(0, 0, -1).applyQuaternion(ch),
			t.positionX)
		) {
			const i = this.context.currentTime + this.timeDelta;
			t.positionX.linearRampToValueAtTime(Xn.x, i),
				t.positionY.linearRampToValueAtTime(Xn.y, i),
				t.positionZ.linearRampToValueAtTime(Xn.z, i),
				t.forwardX.linearRampToValueAtTime(Yn.x, i),
				t.forwardY.linearRampToValueAtTime(Yn.y, i),
				t.forwardZ.linearRampToValueAtTime(Yn.z, i),
				t.upX.linearRampToValueAtTime(n.x, i),
				t.upY.linearRampToValueAtTime(n.y, i),
				t.upZ.linearRampToValueAtTime(n.z, i);
		} else
			t.setPosition(Xn.x, Xn.y, Xn.z),
				t.setOrientation(Yn.x, Yn.y, Yn.z, n.x, n.y, n.z);
	}
}
class Xl extends Fe {
	constructor(e) {
		super(),
			(this.type = "Audio"),
			(this.listener = e),
			(this.context = e.context),
			(this.gain = this.context.createGain()),
			this.gain.connect(e.getInput()),
			(this.autoplay = !1),
			(this.buffer = null),
			(this.detune = 0),
			(this.loop = !1),
			(this.loopStart = 0),
			(this.loopEnd = 0),
			(this.offset = 0),
			(this.duration = void 0),
			(this.playbackRate = 1),
			(this.isPlaying = !1),
			(this.hasPlaybackControl = !0),
			(this.source = null),
			(this.sourceType = "empty"),
			(this._startedAt = 0),
			(this._progress = 0),
			(this._connected = !1),
			(this.filters = []);
	}
	getOutput() {
		return this.gain;
	}
	setNodeSource(e) {
		return (
			(this.hasPlaybackControl = !1),
			(this.sourceType = "audioNode"),
			(this.source = e),
			this.connect(),
			this
		);
	}
	setMediaElementSource(e) {
		return (
			(this.hasPlaybackControl = !1),
			(this.sourceType = "mediaNode"),
			(this.source = this.context.createMediaElementSource(e)),
			this.connect(),
			this
		);
	}
	setMediaStreamSource(e) {
		return (
			(this.hasPlaybackControl = !1),
			(this.sourceType = "mediaStreamNode"),
			(this.source = this.context.createMediaStreamSource(e)),
			this.connect(),
			this
		);
	}
	setBuffer(e) {
		return (
			(this.buffer = e),
			(this.sourceType = "buffer"),
			this.autoplay && this.play(),
			this
		);
	}
	play(e = 0) {
		if (this.isPlaying === !0) {
			console.warn("THREE.Audio: Audio is already playing.");
			return;
		}
		if (this.hasPlaybackControl === !1) {
			console.warn("THREE.Audio: this Audio has no playback control.");
			return;
		}
		this._startedAt = this.context.currentTime + e;
		const t = this.context.createBufferSource();
		return (
			(t.buffer = this.buffer),
			(t.loop = this.loop),
			(t.loopStart = this.loopStart),
			(t.loopEnd = this.loopEnd),
			(t.onended = this.onEnded.bind(this)),
			t.start(this._startedAt, this._progress + this.offset, this.duration),
			(this.isPlaying = !0),
			(this.source = t),
			this.setDetune(this.detune),
			this.setPlaybackRate(this.playbackRate),
			this.connect()
		);
	}
	pause() {
		if (this.hasPlaybackControl === !1) {
			console.warn("THREE.Audio: this Audio has no playback control.");
			return;
		}
		return (
			this.isPlaying === !0 &&
				((this._progress +=
					Math.max(this.context.currentTime - this._startedAt, 0) *
					this.playbackRate),
				this.loop === !0 &&
					(this._progress =
						this._progress % (this.duration || this.buffer.duration)),
				this.source.stop(),
				(this.source.onended = null),
				(this.isPlaying = !1)),
			this
		);
	}
	stop() {
		if (this.hasPlaybackControl === !1) {
			console.warn("THREE.Audio: this Audio has no playback control.");
			return;
		}
		return (
			(this._progress = 0),
			this.source.stop(),
			(this.source.onended = null),
			(this.isPlaying = !1),
			this
		);
	}
	connect() {
		if (this.filters.length > 0) {
			this.source.connect(this.filters[0]);
			for (let e = 1, t = this.filters.length; e < t; e++)
				this.filters[e - 1].connect(this.filters[e]);
			this.filters[this.filters.length - 1].connect(this.getOutput());
		} else this.source.connect(this.getOutput());
		return (this._connected = !0), this;
	}
	disconnect() {
		if (this.filters.length > 0) {
			this.source.disconnect(this.filters[0]);
			for (let e = 1, t = this.filters.length; e < t; e++)
				this.filters[e - 1].disconnect(this.filters[e]);
			this.filters[this.filters.length - 1].disconnect(this.getOutput());
		} else this.source.disconnect(this.getOutput());
		return (this._connected = !1), this;
	}
	getFilters() {
		return this.filters;
	}
	setFilters(e) {
		return (
			e || (e = []),
			this._connected === !0
				? (this.disconnect(), (this.filters = e.slice()), this.connect())
				: (this.filters = e.slice()),
			this
		);
	}
	setDetune(e) {
		if (((this.detune = e), this.source.detune !== void 0))
			return (
				this.isPlaying === !0 &&
					this.source.detune.setTargetAtTime(
						this.detune,
						this.context.currentTime,
						0.01
					),
				this
			);
	}
	getDetune() {
		return this.detune;
	}
	getFilter() {
		return this.getFilters()[0];
	}
	setFilter(e) {
		return this.setFilters(e ? [e] : []);
	}
	setPlaybackRate(e) {
		if (this.hasPlaybackControl === !1) {
			console.warn("THREE.Audio: this Audio has no playback control.");
			return;
		}
		return (
			(this.playbackRate = e),
			this.isPlaying === !0 &&
				this.source.playbackRate.setTargetAtTime(
					this.playbackRate,
					this.context.currentTime,
					0.01
				),
			this
		);
	}
	getPlaybackRate() {
		return this.playbackRate;
	}
	onEnded() {
		this.isPlaying = !1;
	}
	getLoop() {
		return this.hasPlaybackControl === !1
			? (console.warn("THREE.Audio: this Audio has no playback control."), !1)
			: this.loop;
	}
	setLoop(e) {
		if (this.hasPlaybackControl === !1) {
			console.warn("THREE.Audio: this Audio has no playback control.");
			return;
		}
		return (
			(this.loop = e),
			this.isPlaying === !0 && (this.source.loop = this.loop),
			this
		);
	}
	setLoopStart(e) {
		return (this.loopStart = e), this;
	}
	setLoopEnd(e) {
		return (this.loopEnd = e), this;
	}
	getVolume() {
		return this.gain.gain.value;
	}
	setVolume(e) {
		return (
			this.gain.gain.setTargetAtTime(e, this.context.currentTime, 0.01), this
		);
	}
}
const Zn = new w(),
	hh = new gt(),
	J0 = new w(),
	Jn = new w();
class j0 extends Xl {
	constructor(e) {
		super(e),
			(this.panner = this.context.createPanner()),
			(this.panner.panningModel = "HRTF"),
			this.panner.connect(this.gain);
	}
	getOutput() {
		return this.panner;
	}
	getRefDistance() {
		return this.panner.refDistance;
	}
	setRefDistance(e) {
		return (this.panner.refDistance = e), this;
	}
	getRolloffFactor() {
		return this.panner.rolloffFactor;
	}
	setRolloffFactor(e) {
		return (this.panner.rolloffFactor = e), this;
	}
	getDistanceModel() {
		return this.panner.distanceModel;
	}
	setDistanceModel(e) {
		return (this.panner.distanceModel = e), this;
	}
	getMaxDistance() {
		return this.panner.maxDistance;
	}
	setMaxDistance(e) {
		return (this.panner.maxDistance = e), this;
	}
	setDirectionalCone(e, t, n) {
		return (
			(this.panner.coneInnerAngle = e),
			(this.panner.coneOuterAngle = t),
			(this.panner.coneOuterGain = n),
			this
		);
	}
	updateMatrixWorld(e) {
		if (
			(super.updateMatrixWorld(e),
			this.hasPlaybackControl === !0 && this.isPlaying === !1)
		)
			return;
		this.matrixWorld.decompose(Zn, hh, J0), Jn.set(0, 0, 1).applyQuaternion(hh);
		const t = this.panner;
		if (t.positionX) {
			const n = this.context.currentTime + this.listener.timeDelta;
			t.positionX.linearRampToValueAtTime(Zn.x, n),
				t.positionY.linearRampToValueAtTime(Zn.y, n),
				t.positionZ.linearRampToValueAtTime(Zn.z, n),
				t.orientationX.linearRampToValueAtTime(Jn.x, n),
				t.orientationY.linearRampToValueAtTime(Jn.y, n),
				t.orientationZ.linearRampToValueAtTime(Jn.z, n);
		} else t.setPosition(Zn.x, Zn.y, Zn.z), t.setOrientation(Jn.x, Jn.y, Jn.z);
	}
}
class bd {
	constructor(e, t = 2048) {
		(this.analyser = e.context.createAnalyser()),
			(this.analyser.fftSize = t),
			(this.data = new Uint8Array(this.analyser.frequencyBinCount)),
			e.getOutput().connect(this.analyser);
	}
	getFrequencyData() {
		return this.analyser.getByteFrequencyData(this.data), this.data;
	}
	getAverageFrequency() {
		let e = 0;
		const t = this.getFrequencyData();
		for (let n = 0; n < t.length; n++) e += t[n];
		return e / t.length;
	}
}
class Md {
	constructor(e, t, n) {
		(this.binding = e), (this.valueSize = n);
		let i, r, o;
		switch (t) {
			case "quaternion":
				(i = this._slerp),
					(r = this._slerpAdditive),
					(o = this._setAdditiveIdentityQuaternion),
					(this.buffer = new Float64Array(n * 6)),
					(this._workIndex = 5);
				break;
			case "string":
			case "bool":
				(i = this._select),
					(r = this._select),
					(o = this._setAdditiveIdentityOther),
					(this.buffer = new Array(n * 5));
				break;
			default:
				(i = this._lerp),
					(r = this._lerpAdditive),
					(o = this._setAdditiveIdentityNumeric),
					(this.buffer = new Float64Array(n * 5));
		}
		(this._mixBufferRegion = i),
			(this._mixBufferRegionAdditive = r),
			(this._setIdentity = o),
			(this._origIndex = 3),
			(this._addIndex = 4),
			(this.cumulativeWeight = 0),
			(this.cumulativeWeightAdditive = 0),
			(this.useCount = 0),
			(this.referenceCount = 0);
	}
	accumulate(e, t) {
		const n = this.buffer,
			i = this.valueSize,
			r = e * i + i;
		let o = this.cumulativeWeight;
		if (o === 0) {
			for (let a = 0; a !== i; ++a) n[r + a] = n[a];
			o = t;
		} else {
			o += t;
			const a = t / o;
			this._mixBufferRegion(n, r, 0, a, i);
		}
		this.cumulativeWeight = o;
	}
	accumulateAdditive(e) {
		const t = this.buffer,
			n = this.valueSize,
			i = n * this._addIndex;
		this.cumulativeWeightAdditive === 0 && this._setIdentity(),
			this._mixBufferRegionAdditive(t, i, 0, e, n),
			(this.cumulativeWeightAdditive += e);
	}
	apply(e) {
		const t = this.valueSize,
			n = this.buffer,
			i = e * t + t,
			r = this.cumulativeWeight,
			o = this.cumulativeWeightAdditive,
			a = this.binding;
		if (
			((this.cumulativeWeight = 0), (this.cumulativeWeightAdditive = 0), r < 1)
		) {
			const l = t * this._origIndex;
			this._mixBufferRegion(n, i, l, 1 - r, t);
		}
		o > 0 && this._mixBufferRegionAdditive(n, i, this._addIndex * t, 1, t);
		for (let l = t, c = t + t; l !== c; ++l)
			if (n[l] !== n[l + t]) {
				a.setValue(n, i);
				break;
			}
	}
	saveOriginalState() {
		const e = this.binding,
			t = this.buffer,
			n = this.valueSize,
			i = n * this._origIndex;
		e.getValue(t, i);
		for (let r = n, o = i; r !== o; ++r) t[r] = t[i + (r % n)];
		this._setIdentity(),
			(this.cumulativeWeight = 0),
			(this.cumulativeWeightAdditive = 0);
	}
	restoreOriginalState() {
		const e = this.valueSize * 3;
		this.binding.setValue(this.buffer, e);
	}
	_setAdditiveIdentityNumeric() {
		const e = this._addIndex * this.valueSize,
			t = e + this.valueSize;
		for (let n = e; n < t; n++) this.buffer[n] = 0;
	}
	_setAdditiveIdentityQuaternion() {
		this._setAdditiveIdentityNumeric(),
			(this.buffer[this._addIndex * this.valueSize + 3] = 1);
	}
	_setAdditiveIdentityOther() {
		const e = this._origIndex * this.valueSize,
			t = this._addIndex * this.valueSize;
		for (let n = 0; n < this.valueSize; n++)
			this.buffer[t + n] = this.buffer[e + n];
	}
	_select(e, t, n, i, r) {
		if (i >= 0.5) for (let o = 0; o !== r; ++o) e[t + o] = e[n + o];
	}
	_slerp(e, t, n, i) {
		gt.slerpFlat(e, t, e, t, e, n, i);
	}
	_slerpAdditive(e, t, n, i, r) {
		const o = this._workIndex * r;
		gt.multiplyQuaternionsFlat(e, o, e, t, e, n),
			gt.slerpFlat(e, t, e, t, e, o, i);
	}
	_lerp(e, t, n, i, r) {
		const o = 1 - i;
		for (let a = 0; a !== r; ++a) {
			const l = t + a;
			e[l] = e[l] * o + e[n + a] * i;
		}
	}
	_lerpAdditive(e, t, n, i, r) {
		for (let o = 0; o !== r; ++o) {
			const a = t + o;
			e[a] = e[a] + e[n + o] * i;
		}
	}
}
const Yl = "\\[\\]\\.:\\/",
	$0 = new RegExp("[" + Yl + "]", "g"),
	Zl = "[^" + Yl + "]",
	K0 = "[^" + Yl.replace("\\.", "") + "]",
	Q0 = /((?:WC+[\/:])*)/.source.replace("WC", Zl),
	ey = /(WCOD+)?/.source.replace("WCOD", K0),
	ty = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Zl),
	ny = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Zl),
	iy = new RegExp("^" + Q0 + ey + ty + ny + "$"),
	ry = ["material", "materials", "bones"];
class sy {
	constructor(e, t, n) {
		const i = n || He.parseTrackName(t);
		(this._targetGroup = e), (this._bindings = e.subscribe_(t, i));
	}
	getValue(e, t) {
		this.bind();
		const n = this._targetGroup.nCachedObjects_,
			i = this._bindings[n];
		i !== void 0 && i.getValue(e, t);
	}
	setValue(e, t) {
		const n = this._bindings;
		for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i)
			n[i].setValue(e, t);
	}
	bind() {
		const e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
			e[t].bind();
	}
	unbind() {
		const e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
			e[t].unbind();
	}
}
class He {
	constructor(e, t, n) {
		(this.path = t),
			(this.parsedPath = n || He.parseTrackName(t)),
			(this.node = He.findNode(e, this.parsedPath.nodeName) || e),
			(this.rootNode = e),
			(this.getValue = this._getValue_unbound),
			(this.setValue = this._setValue_unbound);
	}
	static create(e, t, n) {
		return e && e.isAnimationObjectGroup
			? new He.Composite(e, t, n)
			: new He(e, t, n);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace($0, "");
	}
	static parseTrackName(e) {
		const t = iy.exec(e);
		if (!t) throw new Error("PropertyBinding: Cannot parse trackName: " + e);
		const n = {
				nodeName: t[2],
				objectName: t[3],
				objectIndex: t[4],
				propertyName: t[5],
				propertyIndex: t[6]
			},
			i = n.nodeName && n.nodeName.lastIndexOf(".");
		if (i !== void 0 && i !== -1) {
			const r = n.nodeName.substring(i + 1);
			ry.indexOf(r) !== -1 &&
				((n.nodeName = n.nodeName.substring(0, i)), (n.objectName = r));
		}
		if (n.propertyName === null || n.propertyName.length === 0)
			throw new Error(
				"PropertyBinding: can not parse propertyName from trackName: " + e
			);
		return n;
	}
	static findNode(e, t) {
		if (!t || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid)
			return e;
		if (e.skeleton) {
			const n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			const n = function (r) {
					for (let o = 0; o < r.length; o++) {
						const a = r[o];
						if (a.name === t || a.uuid === t) return a;
						const l = n(a.children);
						if (l) return l;
					}
					return null;
				},
				i = n(e.children);
			if (i) return i;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		const n = this.resolvedProperty;
		for (let i = 0, r = n.length; i !== r; ++i) e[t++] = n[i];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		(this.targetObject[this.propertyName] = e[t]),
			(this.targetObject.needsUpdate = !0);
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		(this.targetObject[this.propertyName] = e[t]),
			(this.targetObject.matrixWorldNeedsUpdate = !0);
	}
	_setValue_array(e, t) {
		const n = this.resolvedProperty;
		for (let i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		const n = this.resolvedProperty;
		for (let i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		const n = this.resolvedProperty;
		for (let i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		(this.resolvedProperty[this.propertyIndex] = e[t]),
			(this.targetObject.needsUpdate = !0);
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		(this.resolvedProperty[this.propertyIndex] = e[t]),
			(this.targetObject.matrixWorldNeedsUpdate = !0);
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), (this.targetObject.needsUpdate = !0);
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t),
			(this.targetObject.matrixWorldNeedsUpdate = !0);
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let e = this.node;
		const t = this.parsedPath,
			n = t.objectName,
			i = t.propertyName;
		let r = t.propertyIndex;
		if (
			(e ||
				((e = He.findNode(this.rootNode, t.nodeName) || this.rootNode),
				(this.node = e)),
			(this.getValue = this._getValue_unavailable),
			(this.setValue = this._setValue_unavailable),
			!e)
		) {
			console.error(
				"THREE.PropertyBinding: Trying to update node for track: " +
					this.path +
					" but it wasn't found."
			);
			return;
		}
		if (n) {
			let c = t.objectIndex;
			switch (n) {
				case "materials":
					if (!e.material) {
						console.error(
							"THREE.PropertyBinding: Can not bind to material as node does not have a material.",
							this
						);
						return;
					}
					if (!e.material.materials) {
						console.error(
							"THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
							this
						);
						return;
					}
					e = e.material.materials;
					break;
				case "bones":
					if (!e.skeleton) {
						console.error(
							"THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
							this
						);
						return;
					}
					e = e.skeleton.bones;
					for (let h = 0; h < e.length; h++)
						if (e[h].name === c) {
							c = h;
							break;
						}
					break;
				default:
					if (e[n] === void 0) {
						console.error(
							"THREE.PropertyBinding: Can not bind to objectName of node undefined.",
							this
						);
						return;
					}
					e = e[n];
			}
			if (c !== void 0) {
				if (e[c] === void 0) {
					console.error(
						"THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
						this,
						e
					);
					return;
				}
				e = e[c];
			}
		}
		const o = e[i];
		if (o === void 0) {
			const c = t.nodeName;
			console.error(
				"THREE.PropertyBinding: Trying to update property for track: " +
					c +
					"." +
					i +
					" but it wasn't found.",
				e
			);
			return;
		}
		let a = this.Versioning.None;
		(this.targetObject = e),
			e.needsUpdate !== void 0
				? (a = this.Versioning.NeedsUpdate)
				: e.matrixWorldNeedsUpdate !== void 0 &&
				  (a = this.Versioning.MatrixWorldNeedsUpdate);
		let l = this.BindingType.Direct;
		if (r !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!e.geometry) {
					console.error(
						"THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
						this
					);
					return;
				}
				if (e.geometry.isBufferGeometry) {
					if (!e.geometry.morphAttributes) {
						console.error(
							"THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
							this
						);
						return;
					}
					e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]);
				} else {
					console.error(
						"THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",
						this
					);
					return;
				}
			}
			(l = this.BindingType.ArrayElement),
				(this.resolvedProperty = o),
				(this.propertyIndex = r);
		} else
			o.fromArray !== void 0 && o.toArray !== void 0
				? ((l = this.BindingType.HasFromToArray), (this.resolvedProperty = o))
				: Array.isArray(o)
				? ((l = this.BindingType.EntireArray), (this.resolvedProperty = o))
				: (this.propertyName = i);
		(this.getValue = this.GetterByBindingType[l]),
			(this.setValue = this.SetterByBindingTypeAndVersioning[l][a]);
	}
	unbind() {
		(this.node = null),
			(this.getValue = this._getValue_unbound),
			(this.setValue = this._setValue_unbound);
	}
}
He.Composite = sy;
He.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
};
He.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
};
He.prototype.GetterByBindingType = [
	He.prototype._getValue_direct,
	He.prototype._getValue_array,
	He.prototype._getValue_arrayElement,
	He.prototype._getValue_toArray
];
He.prototype.SetterByBindingTypeAndVersioning = [
	[
		He.prototype._setValue_direct,
		He.prototype._setValue_direct_setNeedsUpdate,
		He.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		He.prototype._setValue_array,
		He.prototype._setValue_array_setNeedsUpdate,
		He.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		He.prototype._setValue_arrayElement,
		He.prototype._setValue_arrayElement_setNeedsUpdate,
		He.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		He.prototype._setValue_fromArray,
		He.prototype._setValue_fromArray_setNeedsUpdate,
		He.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
];
class wd {
	constructor() {
		(this.uuid = It()),
			(this._objects = Array.prototype.slice.call(arguments)),
			(this.nCachedObjects_ = 0);
		const e = {};
		this._indicesByUUID = e;
		for (let n = 0, i = arguments.length; n !== i; ++n) e[arguments[n].uuid] = n;
		(this._paths = []),
			(this._parsedPaths = []),
			(this._bindings = []),
			(this._bindingsIndicesByPath = {});
		const t = this;
		this.stats = {
			objects: {
				get total() {
					return t._objects.length;
				},
				get inUse() {
					return this.total - t.nCachedObjects_;
				}
			},
			get bindingsPerObject() {
				return t._bindings.length;
			}
		};
	}
	add() {
		const e = this._objects,
			t = this._indicesByUUID,
			n = this._paths,
			i = this._parsedPaths,
			r = this._bindings,
			o = r.length;
		let a,
			l = e.length,
			c = this.nCachedObjects_;
		for (let h = 0, u = arguments.length; h !== u; ++h) {
			const d = arguments[h],
				f = d.uuid;
			let m = t[f];
			if (m === void 0) {
				(m = l++), (t[f] = m), e.push(d);
				for (let x = 0, y = o; x !== y; ++x) r[x].push(new He(d, n[x], i[x]));
			} else if (m < c) {
				a = e[m];
				const x = --c,
					y = e[x];
				(t[y.uuid] = m), (e[m] = y), (t[f] = x), (e[x] = d);
				for (let g = 0, p = o; g !== p; ++g) {
					const M = r[g],
						v = M[x];
					let _ = M[m];
					(M[m] = v), _ === void 0 && (_ = new He(d, n[g], i[g])), (M[x] = _);
				}
			} else
				e[m] !== a &&
					console.error(
						"THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes."
					);
		}
		this.nCachedObjects_ = c;
	}
	remove() {
		const e = this._objects,
			t = this._indicesByUUID,
			n = this._bindings,
			i = n.length;
		let r = this.nCachedObjects_;
		for (let o = 0, a = arguments.length; o !== a; ++o) {
			const l = arguments[o],
				c = l.uuid,
				h = t[c];
			if (h !== void 0 && h >= r) {
				const u = r++,
					d = e[u];
				(t[d.uuid] = h), (e[h] = d), (t[c] = u), (e[u] = l);
				for (let f = 0, m = i; f !== m; ++f) {
					const x = n[f],
						y = x[u],
						g = x[h];
					(x[h] = y), (x[u] = g);
				}
			}
		}
		this.nCachedObjects_ = r;
	}
	uncache() {
		const e = this._objects,
			t = this._indicesByUUID,
			n = this._bindings,
			i = n.length;
		let r = this.nCachedObjects_,
			o = e.length;
		for (let a = 0, l = arguments.length; a !== l; ++a) {
			const c = arguments[a],
				h = c.uuid,
				u = t[h];
			if (u !== void 0)
				if ((delete t[h], u < r)) {
					const d = --r,
						f = e[d],
						m = --o,
						x = e[m];
					(t[f.uuid] = u), (e[u] = f), (t[x.uuid] = d), (e[d] = x), e.pop();
					for (let y = 0, g = i; y !== g; ++y) {
						const p = n[y],
							M = p[d],
							v = p[m];
						(p[u] = M), (p[d] = v), p.pop();
					}
				} else {
					const d = --o,
						f = e[d];
					d > 0 && (t[f.uuid] = u), (e[u] = f), e.pop();
					for (let m = 0, x = i; m !== x; ++m) {
						const y = n[m];
						(y[u] = y[d]), y.pop();
					}
				}
		}
		this.nCachedObjects_ = r;
	}
	subscribe_(e, t) {
		const n = this._bindingsIndicesByPath;
		let i = n[e];
		const r = this._bindings;
		if (i !== void 0) return r[i];
		const o = this._paths,
			a = this._parsedPaths,
			l = this._objects,
			c = l.length,
			h = this.nCachedObjects_,
			u = new Array(c);
		(i = r.length), (n[e] = i), o.push(e), a.push(t), r.push(u);
		for (let d = h, f = l.length; d !== f; ++d) {
			const m = l[d];
			u[d] = new He(m, e, t);
		}
		return u;
	}
	unsubscribe_(e) {
		const t = this._bindingsIndicesByPath,
			n = t[e];
		if (n !== void 0) {
			const i = this._paths,
				r = this._parsedPaths,
				o = this._bindings,
				a = o.length - 1,
				l = o[a],
				c = e[a];
			(t[c] = n),
				(o[n] = l),
				o.pop(),
				(r[n] = r[a]),
				r.pop(),
				(i[n] = i[a]),
				i.pop();
		}
	}
}
wd.prototype.isAnimationObjectGroup = !0;
class oy {
	constructor(e, t, n = null, i = t.blendMode) {
		(this._mixer = e),
			(this._clip = t),
			(this._localRoot = n),
			(this.blendMode = i);
		const r = t.tracks,
			o = r.length,
			a = new Array(o),
			l = { endingStart: ei, endingEnd: ei };
		for (let c = 0; c !== o; ++c) {
			const h = r[c].createInterpolant(null);
			(a[c] = h), (h.settings = l);
		}
		(this._interpolantSettings = l),
			(this._interpolants = a),
			(this._propertyBindings = new Array(o)),
			(this._cacheIndex = null),
			(this._byClipCacheIndex = null),
			(this._timeScaleInterpolant = null),
			(this._weightInterpolant = null),
			(this.loop = xu),
			(this._loopCount = -1),
			(this._startTime = null),
			(this.time = 0),
			(this.timeScale = 1),
			(this._effectiveTimeScale = 1),
			(this.weight = 1),
			(this._effectiveWeight = 1),
			(this.repetitions = 1 / 0),
			(this.paused = !1),
			(this.enabled = !0),
			(this.clampWhenFinished = !1),
			(this.zeroSlopeAtStart = !0),
			(this.zeroSlopeAtEnd = !0);
	}
	play() {
		return this._mixer._activateAction(this), this;
	}
	stop() {
		return this._mixer._deactivateAction(this), this.reset();
	}
	reset() {
		return (
			(this.paused = !1),
			(this.enabled = !0),
			(this.time = 0),
			(this._loopCount = -1),
			(this._startTime = null),
			this.stopFading().stopWarping()
		);
	}
	isRunning() {
		return (
			this.enabled &&
			!this.paused &&
			this.timeScale !== 0 &&
			this._startTime === null &&
			this._mixer._isActiveAction(this)
		);
	}
	isScheduled() {
		return this._mixer._isActiveAction(this);
	}
	startAt(e) {
		return (this._startTime = e), this;
	}
	setLoop(e, t) {
		return (this.loop = e), (this.repetitions = t), this;
	}
	setEffectiveWeight(e) {
		return (
			(this.weight = e),
			(this._effectiveWeight = this.enabled ? e : 0),
			this.stopFading()
		);
	}
	getEffectiveWeight() {
		return this._effectiveWeight;
	}
	fadeIn(e) {
		return this._scheduleFading(e, 0, 1);
	}
	fadeOut(e) {
		return this._scheduleFading(e, 1, 0);
	}
	crossFadeFrom(e, t, n) {
		if ((e.fadeOut(t), this.fadeIn(t), n)) {
			const i = this._clip.duration,
				r = e._clip.duration,
				o = r / i,
				a = i / r;
			e.warp(1, o, t), this.warp(a, 1, t);
		}
		return this;
	}
	crossFadeTo(e, t, n) {
		return e.crossFadeFrom(this, t, n);
	}
	stopFading() {
		const e = this._weightInterpolant;
		return (
			e !== null &&
				((this._weightInterpolant = null),
				this._mixer._takeBackControlInterpolant(e)),
			this
		);
	}
	setEffectiveTimeScale(e) {
		return (
			(this.timeScale = e),
			(this._effectiveTimeScale = this.paused ? 0 : e),
			this.stopWarping()
		);
	}
	getEffectiveTimeScale() {
		return this._effectiveTimeScale;
	}
	setDuration(e) {
		return (this.timeScale = this._clip.duration / e), this.stopWarping();
	}
	syncWith(e) {
		return (
			(this.time = e.time), (this.timeScale = e.timeScale), this.stopWarping()
		);
	}
	halt(e) {
		return this.warp(this._effectiveTimeScale, 0, e);
	}
	warp(e, t, n) {
		const i = this._mixer,
			r = i.time,
			o = this.timeScale;
		let a = this._timeScaleInterpolant;
		a === null &&
			((a = i._lendControlInterpolant()), (this._timeScaleInterpolant = a));
		const l = a.parameterPositions,
			c = a.sampleValues;
		return (l[0] = r), (l[1] = r + n), (c[0] = e / o), (c[1] = t / o), this;
	}
	stopWarping() {
		const e = this._timeScaleInterpolant;
		return (
			e !== null &&
				((this._timeScaleInterpolant = null),
				this._mixer._takeBackControlInterpolant(e)),
			this
		);
	}
	getMixer() {
		return this._mixer;
	}
	getClip() {
		return this._clip;
	}
	getRoot() {
		return this._localRoot || this._mixer._root;
	}
	_update(e, t, n, i) {
		if (!this.enabled) {
			this._updateWeight(e);
			return;
		}
		const r = this._startTime;
		if (r !== null) {
			const l = (e - r) * n;
			if (l < 0 || n === 0) return;
			(this._startTime = null), (t = n * l);
		}
		t *= this._updateTimeScale(e);
		const o = this._updateTime(t),
			a = this._updateWeight(e);
		if (a > 0) {
			const l = this._interpolants,
				c = this._propertyBindings;
			switch (this.blendMode) {
				case hl:
					for (let h = 0, u = l.length; h !== u; ++h)
						l[h].evaluate(o), c[h].accumulateAdditive(a);
					break;
				case go:
				default:
					for (let h = 0, u = l.length; h !== u; ++h)
						l[h].evaluate(o), c[h].accumulate(i, a);
			}
		}
	}
	_updateWeight(e) {
		let t = 0;
		if (this.enabled) {
			t = this.weight;
			const n = this._weightInterpolant;
			if (n !== null) {
				const i = n.evaluate(e)[0];
				(t *= i),
					e > n.parameterPositions[1] &&
						(this.stopFading(), i === 0 && (this.enabled = !1));
			}
		}
		return (this._effectiveWeight = t), t;
	}
	_updateTimeScale(e) {
		let t = 0;
		if (!this.paused) {
			t = this.timeScale;
			const n = this._timeScaleInterpolant;
			n !== null &&
				((t *= n.evaluate(e)[0]),
				e > n.parameterPositions[1] &&
					(this.stopWarping(), t === 0 ? (this.paused = !0) : (this.timeScale = t)));
		}
		return (this._effectiveTimeScale = t), t;
	}
	_updateTime(e) {
		const t = this._clip.duration,
			n = this.loop;
		let i = this.time + e,
			r = this._loopCount;
		const o = n === yu;
		if (e === 0) return r === -1 ? i : o && (r & 1) === 1 ? t - i : i;
		if (n === gu) {
			r === -1 && ((this._loopCount = 0), this._setEndings(!0, !0, !1));
			e: {
				if (i >= t) i = t;
				else if (i < 0) i = 0;
				else {
					this.time = i;
					break e;
				}
				this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
					(this.time = i),
					this._mixer.dispatchEvent({
						type: "finished",
						action: this,
						direction: e < 0 ? -1 : 1
					});
			}
		} else {
			if (
				(r === -1 &&
					(e >= 0
						? ((r = 0), this._setEndings(!0, this.repetitions === 0, o))
						: this._setEndings(this.repetitions === 0, !0, o)),
				i >= t || i < 0)
			) {
				const a = Math.floor(i / t);
				(i -= t * a), (r += Math.abs(a));
				const l = this.repetitions - r;
				if (l <= 0)
					this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
						(i = e > 0 ? t : 0),
						(this.time = i),
						this._mixer.dispatchEvent({
							type: "finished",
							action: this,
							direction: e > 0 ? 1 : -1
						});
				else {
					if (l === 1) {
						const c = e < 0;
						this._setEndings(c, !c, o);
					} else this._setEndings(!1, !1, o);
					(this._loopCount = r),
						(this.time = i),
						this._mixer.dispatchEvent({ type: "loop", action: this, loopDelta: a });
				}
			} else this.time = i;
			if (o && (r & 1) === 1) return t - i;
		}
		return i;
	}
	_setEndings(e, t, n) {
		const i = this._interpolantSettings;
		n
			? ((i.endingStart = ti), (i.endingEnd = ti))
			: (e
					? (i.endingStart = this.zeroSlopeAtStart ? ti : ei)
					: (i.endingStart = Ur),
			  t ? (i.endingEnd = this.zeroSlopeAtEnd ? ti : ei) : (i.endingEnd = Ur));
	}
	_scheduleFading(e, t, n) {
		const i = this._mixer,
			r = i.time;
		let o = this._weightInterpolant;
		o === null &&
			((o = i._lendControlInterpolant()), (this._weightInterpolant = o));
		const a = o.parameterPositions,
			l = o.sampleValues;
		return (a[0] = r), (l[0] = t), (a[1] = r + e), (l[1] = n), this;
	}
}
class Sd extends bn {
	constructor(e) {
		super(),
			(this._root = e),
			this._initMemoryManager(),
			(this._accuIndex = 0),
			(this.time = 0),
			(this.timeScale = 1);
	}
	_bindAction(e, t) {
		const n = e._localRoot || this._root,
			i = e._clip.tracks,
			r = i.length,
			o = e._propertyBindings,
			a = e._interpolants,
			l = n.uuid,
			c = this._bindingsByRootAndName;
		let h = c[l];
		h === void 0 && ((h = {}), (c[l] = h));
		for (let u = 0; u !== r; ++u) {
			const d = i[u],
				f = d.name;
			let m = h[f];
			if (m !== void 0) ++m.referenceCount, (o[u] = m);
			else {
				if (((m = o[u]), m !== void 0)) {
					m._cacheIndex === null &&
						(++m.referenceCount, this._addInactiveBinding(m, l, f));
					continue;
				}
				const x = t && t._propertyBindings[u].binding.parsedPath;
				(m = new Md(He.create(n, f, x), d.ValueTypeName, d.getValueSize())),
					++m.referenceCount,
					this._addInactiveBinding(m, l, f),
					(o[u] = m);
			}
			a[u].resultBuffer = m.buffer;
		}
	}
	_activateAction(e) {
		if (!this._isActiveAction(e)) {
			if (e._cacheIndex === null) {
				const n = (e._localRoot || this._root).uuid,
					i = e._clip.uuid,
					r = this._actionsByClip[i];
				this._bindAction(e, r && r.knownActions[0]),
					this._addInactiveAction(e, i, n);
			}
			const t = e._propertyBindings;
			for (let n = 0, i = t.length; n !== i; ++n) {
				const r = t[n];
				r.useCount++ === 0 && (this._lendBinding(r), r.saveOriginalState());
			}
			this._lendAction(e);
		}
	}
	_deactivateAction(e) {
		if (this._isActiveAction(e)) {
			const t = e._propertyBindings;
			for (let n = 0, i = t.length; n !== i; ++n) {
				const r = t[n];
				--r.useCount === 0 && (r.restoreOriginalState(), this._takeBackBinding(r));
			}
			this._takeBackAction(e);
		}
	}
	_initMemoryManager() {
		(this._actions = []),
			(this._nActiveActions = 0),
			(this._actionsByClip = {}),
			(this._bindings = []),
			(this._nActiveBindings = 0),
			(this._bindingsByRootAndName = {}),
			(this._controlInterpolants = []),
			(this._nActiveControlInterpolants = 0);
		const e = this;
		this.stats = {
			actions: {
				get total() {
					return e._actions.length;
				},
				get inUse() {
					return e._nActiveActions;
				}
			},
			bindings: {
				get total() {
					return e._bindings.length;
				},
				get inUse() {
					return e._nActiveBindings;
				}
			},
			controlInterpolants: {
				get total() {
					return e._controlInterpolants.length;
				},
				get inUse() {
					return e._nActiveControlInterpolants;
				}
			}
		};
	}
	_isActiveAction(e) {
		const t = e._cacheIndex;
		return t !== null && t < this._nActiveActions;
	}
	_addInactiveAction(e, t, n) {
		const i = this._actions,
			r = this._actionsByClip;
		let o = r[t];
		if (o === void 0)
			(o = { knownActions: [e], actionByRoot: {} }),
				(e._byClipCacheIndex = 0),
				(r[t] = o);
		else {
			const a = o.knownActions;
			(e._byClipCacheIndex = a.length), a.push(e);
		}
		(e._cacheIndex = i.length), i.push(e), (o.actionByRoot[n] = e);
	}
	_removeInactiveAction(e) {
		const t = this._actions,
			n = t[t.length - 1],
			i = e._cacheIndex;
		(n._cacheIndex = i), (t[i] = n), t.pop(), (e._cacheIndex = null);
		const r = e._clip.uuid,
			o = this._actionsByClip,
			a = o[r],
			l = a.knownActions,
			c = l[l.length - 1],
			h = e._byClipCacheIndex;
		(c._byClipCacheIndex = h), (l[h] = c), l.pop(), (e._byClipCacheIndex = null);
		const u = a.actionByRoot,
			d = (e._localRoot || this._root).uuid;
		delete u[d],
			l.length === 0 && delete o[r],
			this._removeInactiveBindingsForAction(e);
	}
	_removeInactiveBindingsForAction(e) {
		const t = e._propertyBindings;
		for (let n = 0, i = t.length; n !== i; ++n) {
			const r = t[n];
			--r.referenceCount === 0 && this._removeInactiveBinding(r);
		}
	}
	_lendAction(e) {
		const t = this._actions,
			n = e._cacheIndex,
			i = this._nActiveActions++,
			r = t[i];
		(e._cacheIndex = i), (t[i] = e), (r._cacheIndex = n), (t[n] = r);
	}
	_takeBackAction(e) {
		const t = this._actions,
			n = e._cacheIndex,
			i = --this._nActiveActions,
			r = t[i];
		(e._cacheIndex = i), (t[i] = e), (r._cacheIndex = n), (t[n] = r);
	}
	_addInactiveBinding(e, t, n) {
		const i = this._bindingsByRootAndName,
			r = this._bindings;
		let o = i[t];
		o === void 0 && ((o = {}), (i[t] = o)),
			(o[n] = e),
			(e._cacheIndex = r.length),
			r.push(e);
	}
	_removeInactiveBinding(e) {
		const t = this._bindings,
			n = e.binding,
			i = n.rootNode.uuid,
			r = n.path,
			o = this._bindingsByRootAndName,
			a = o[i],
			l = t[t.length - 1],
			c = e._cacheIndex;
		(l._cacheIndex = c),
			(t[c] = l),
			t.pop(),
			delete a[r],
			Object.keys(a).length === 0 && delete o[i];
	}
	_lendBinding(e) {
		const t = this._bindings,
			n = e._cacheIndex,
			i = this._nActiveBindings++,
			r = t[i];
		(e._cacheIndex = i), (t[i] = e), (r._cacheIndex = n), (t[n] = r);
	}
	_takeBackBinding(e) {
		const t = this._bindings,
			n = e._cacheIndex,
			i = --this._nActiveBindings,
			r = t[i];
		(e._cacheIndex = i), (t[i] = e), (r._cacheIndex = n), (t[n] = r);
	}
	_lendControlInterpolant() {
		const e = this._controlInterpolants,
			t = this._nActiveControlInterpolants++;
		let n = e[t];
		return (
			n === void 0 &&
				((n = new Dl(
					new Float32Array(2),
					new Float32Array(2),
					1,
					this._controlInterpolantsResultBuffer
				)),
				(n.__cacheIndex = t),
				(e[t] = n)),
			n
		);
	}
	_takeBackControlInterpolant(e) {
		const t = this._controlInterpolants,
			n = e.__cacheIndex,
			i = --this._nActiveControlInterpolants,
			r = t[i];
		(e.__cacheIndex = i), (t[i] = e), (r.__cacheIndex = n), (t[n] = r);
	}
	clipAction(e, t, n) {
		const i = t || this._root,
			r = i.uuid;
		let o = typeof e == "string" ? Zr.findByName(i, e) : e;
		const a = o !== null ? o.uuid : e,
			l = this._actionsByClip[a];
		let c = null;
		if (
			(n === void 0 && (o !== null ? (n = o.blendMode) : (n = go)), l !== void 0)
		) {
			const u = l.actionByRoot[r];
			if (u !== void 0 && u.blendMode === n) return u;
			(c = l.knownActions[0]), o === null && (o = c._clip);
		}
		if (o === null) return null;
		const h = new oy(this, o, t, n);
		return this._bindAction(h, c), this._addInactiveAction(h, a, r), h;
	}
	existingAction(e, t) {
		const n = t || this._root,
			i = n.uuid,
			r = typeof e == "string" ? Zr.findByName(n, e) : e,
			o = r ? r.uuid : e,
			a = this._actionsByClip[o];
		return (a !== void 0 && a.actionByRoot[i]) || null;
	}
	stopAllAction() {
		const e = this._actions,
			t = this._nActiveActions;
		for (let n = t - 1; n >= 0; --n) e[n].stop();
		return this;
	}
	update(e) {
		e *= this.timeScale;
		const t = this._actions,
			n = this._nActiveActions,
			i = (this.time += e),
			r = Math.sign(e),
			o = (this._accuIndex ^= 1);
		for (let c = 0; c !== n; ++c) t[c]._update(i, e, r, o);
		const a = this._bindings,
			l = this._nActiveBindings;
		for (let c = 0; c !== l; ++c) a[c].apply(o);
		return this;
	}
	setTime(e) {
		this.time = 0;
		for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
		return this.update(e);
	}
	getRoot() {
		return this._root;
	}
	uncacheClip(e) {
		const t = this._actions,
			n = e.uuid,
			i = this._actionsByClip,
			r = i[n];
		if (r !== void 0) {
			const o = r.knownActions;
			for (let a = 0, l = o.length; a !== l; ++a) {
				const c = o[a];
				this._deactivateAction(c);
				const h = c._cacheIndex,
					u = t[t.length - 1];
				(c._cacheIndex = null),
					(c._byClipCacheIndex = null),
					(u._cacheIndex = h),
					(t[h] = u),
					t.pop(),
					this._removeInactiveBindingsForAction(c);
			}
			delete i[n];
		}
	}
	uncacheRoot(e) {
		const t = e.uuid,
			n = this._actionsByClip;
		for (const o in n) {
			const a = n[o].actionByRoot,
				l = a[t];
			l !== void 0 && (this._deactivateAction(l), this._removeInactiveAction(l));
		}
		const i = this._bindingsByRootAndName,
			r = i[t];
		if (r !== void 0)
			for (const o in r) {
				const a = r[o];
				a.restoreOriginalState(), this._removeInactiveBinding(a);
			}
	}
	uncacheAction(e, t) {
		const n = this.existingAction(e, t);
		n !== null && (this._deactivateAction(n), this._removeInactiveAction(n));
	}
}
Sd.prototype._controlInterpolantsResultBuffer = new Float32Array(1);
class Ho {
	constructor(e) {
		typeof e == "string" &&
			(console.warn("THREE.Uniform: Type parameter is no longer needed."),
			(e = arguments[1])),
			(this.value = e);
	}
	clone() {
		return new Ho(this.value.clone === void 0 ? this.value : this.value.clone());
	}
}
class Td extends bi {
	constructor(e, t, n = 1) {
		super(e, t), (this.meshPerAttribute = n);
	}
	copy(e) {
		return super.copy(e), (this.meshPerAttribute = e.meshPerAttribute), this;
	}
	clone(e) {
		const t = super.clone(e);
		return (t.meshPerAttribute = this.meshPerAttribute), t;
	}
	toJSON(e) {
		const t = super.toJSON(e);
		return (
			(t.isInstancedInterleavedBuffer = !0),
			(t.meshPerAttribute = this.meshPerAttribute),
			t
		);
	}
}
Td.prototype.isInstancedInterleavedBuffer = !0;
class Ed {
	constructor(e, t, n, i, r) {
		(this.buffer = e),
			(this.type = t),
			(this.itemSize = n),
			(this.elementSize = i),
			(this.count = r),
			(this.version = 0);
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setBuffer(e) {
		return (this.buffer = e), this;
	}
	setType(e, t) {
		return (this.type = e), (this.elementSize = t), this;
	}
	setItemSize(e) {
		return (this.itemSize = e), this;
	}
	setCount(e) {
		return (this.count = e), this;
	}
}
Ed.prototype.isGLBufferAttribute = !0;
class ay {
	constructor(e, t, n = 0, i = 1 / 0) {
		(this.ray = new Un(e, t)),
			(this.near = n),
			(this.far = i),
			(this.camera = null),
			(this.layers = new yo()),
			(this.params = {
				Mesh: {},
				Line: { threshold: 1 },
				LOD: {},
				Points: { threshold: 1 },
				Sprite: {}
			});
	}
	set(e, t) {
		this.ray.set(e, t);
	}
	setFromCamera(e, t) {
		t && t.isPerspectiveCamera
			? (this.ray.origin.setFromMatrixPosition(t.matrixWorld),
			  this.ray.direction
					.set(e.x, e.y, 0.5)
					.unproject(t)
					.sub(this.ray.origin)
					.normalize(),
			  (this.camera = t))
			: t && t.isOrthographicCamera
			? (this.ray.origin
					.set(e.x, e.y, (t.near + t.far) / (t.near - t.far))
					.unproject(t),
			  this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld),
			  (this.camera = t))
			: console.error("THREE.Raycaster: Unsupported camera type: " + t.type);
	}
	intersectObject(e, t = !0, n = []) {
		return nl(e, this, n, t), n.sort(uh), n;
	}
	intersectObjects(e, t = !0, n = []) {
		for (let i = 0, r = e.length; i < r; i++) nl(e[i], this, n, t);
		return n.sort(uh), n;
	}
}
function uh(s, e) {
	return s.distance - e.distance;
}
function nl(s, e, t, n) {
	if ((s.layers.test(e.layers) && s.raycast(e, t), n === !0)) {
		const i = s.children;
		for (let r = 0, o = i.length; r < o; r++) nl(i[r], e, t, !0);
	}
}
class il {
	constructor(e = 1, t = 0, n = 0) {
		return (this.radius = e), (this.phi = t), (this.theta = n), this;
	}
	set(e, t, n) {
		return (this.radius = e), (this.phi = t), (this.theta = n), this;
	}
	copy(e) {
		return (
			(this.radius = e.radius), (this.phi = e.phi), (this.theta = e.theta), this
		);
	}
	makeSafe() {
		return (this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi))), this;
	}
	setFromVector3(e) {
		return this.setFromCartesianCoords(e.x, e.y, e.z);
	}
	setFromCartesianCoords(e, t, n) {
		return (
			(this.radius = Math.sqrt(e * e + t * t + n * n)),
			this.radius === 0
				? ((this.theta = 0), (this.phi = 0))
				: ((this.theta = Math.atan2(e, n)),
				  (this.phi = Math.acos(Mt(t / this.radius, -1, 1)))),
			this
		);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
class ly {
	constructor(e = 1, t = 0, n = 0) {
		return (this.radius = e), (this.theta = t), (this.y = n), this;
	}
	set(e, t, n) {
		return (this.radius = e), (this.theta = t), (this.y = n), this;
	}
	copy(e) {
		return (this.radius = e.radius), (this.theta = e.theta), (this.y = e.y), this;
	}
	setFromVector3(e) {
		return this.setFromCartesianCoords(e.x, e.y, e.z);
	}
	setFromCartesianCoords(e, t, n) {
		return (
			(this.radius = Math.sqrt(e * e + n * n)),
			(this.theta = Math.atan2(e, n)),
			(this.y = t),
			this
		);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
const dh = new G();
class gr {
	constructor(e = new G(1 / 0, 1 / 0), t = new G(-1 / 0, -1 / 0)) {
		(this.min = e), (this.max = t);
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		const n = dh.copy(t).multiplyScalar(0.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return (
			(this.min.x = this.min.y = 1 / 0), (this.max.x = this.max.y = -1 / 0), this
		);
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y;
	}
	getCenter(e) {
		return this.isEmpty()
			? e.set(0, 0)
			: e.addVectors(this.min, this.max).multiplyScalar(0.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	containsPoint(e) {
		return !(
			e.x < this.min.x ||
			e.x > this.max.x ||
			e.y < this.min.y ||
			e.y > this.max.y
		);
	}
	containsBox(e) {
		return (
			this.min.x <= e.min.x &&
			e.max.x <= this.max.x &&
			this.min.y <= e.min.y &&
			e.max.y <= this.max.y
		);
	}
	getParameter(e, t) {
		return t.set(
			(e.x - this.min.x) / (this.max.x - this.min.x),
			(e.y - this.min.y) / (this.max.y - this.min.y)
		);
	}
	intersectsBox(e) {
		return !(
			e.max.x < this.min.x ||
			e.min.x > this.max.x ||
			e.max.y < this.min.y ||
			e.min.y > this.max.y
		);
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return dh.copy(e).clamp(this.min, this.max).sub(e).length();
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
}
gr.prototype.isBox2 = !0;
const fh = new w(),
	qs = new w();
class Ad {
	constructor(e = new w(), t = new w()) {
		(this.start = e), (this.end = t);
	}
	set(e, t) {
		return this.start.copy(e), this.end.copy(t), this;
	}
	copy(e) {
		return this.start.copy(e.start), this.end.copy(e.end), this;
	}
	getCenter(e) {
		return e.addVectors(this.start, this.end).multiplyScalar(0.5);
	}
	delta(e) {
		return e.subVectors(this.end, this.start);
	}
	distanceSq() {
		return this.start.distanceToSquared(this.end);
	}
	distance() {
		return this.start.distanceTo(this.end);
	}
	at(e, t) {
		return this.delta(t).multiplyScalar(e).add(this.start);
	}
	closestPointToPointParameter(e, t) {
		fh.subVectors(e, this.start), qs.subVectors(this.end, this.start);
		const n = qs.dot(qs);
		let r = qs.dot(fh) / n;
		return t && (r = Mt(r, 0, 1)), r;
	}
	closestPointToPoint(e, t, n) {
		const i = this.closestPointToPointParameter(e, t);
		return this.delta(n).multiplyScalar(i).add(this.start);
	}
	applyMatrix4(e) {
		return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this;
	}
	equals(e) {
		return e.start.equals(this.start) && e.end.equals(this.end);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}
const ph = new w();
class cy extends Fe {
	constructor(e, t) {
		super(),
			(this.light = e),
			this.light.updateMatrixWorld(),
			(this.matrix = e.matrixWorld),
			(this.matrixAutoUpdate = !1),
			(this.color = t);
		const n = new Me(),
			i = [
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				1,
				0,
				1,
				0,
				0,
				0,
				-1,
				0,
				1,
				0,
				0,
				0,
				0,
				1,
				1,
				0,
				0,
				0,
				0,
				-1,
				1
			];
		for (let o = 0, a = 1, l = 32; o < l; o++, a++) {
			const c = (o / l) * Math.PI * 2,
				h = (a / l) * Math.PI * 2;
			i.push(Math.cos(c), Math.sin(c), 1, Math.cos(h), Math.sin(h), 1);
		}
		n.setAttribute("position", new fe(i, 3));
		const r = new vt({ fog: !1, toneMapped: !1 });
		(this.cone = new Rt(n, r)), this.add(this.cone), this.update();
	}
	dispose() {
		this.cone.geometry.dispose(), this.cone.material.dispose();
	}
	update() {
		this.light.updateMatrixWorld();
		const e = this.light.distance ? this.light.distance : 1e3,
			t = e * Math.tan(this.light.angle);
		this.cone.scale.set(t, t, e),
			ph.setFromMatrixPosition(this.light.target.matrixWorld),
			this.cone.lookAt(ph),
			this.color !== void 0
				? this.cone.material.color.set(this.color)
				: this.cone.material.color.copy(this.light.color);
	}
}
const Rn = new w(),
	Xs = new pe(),
	_a = new pe();
class Cd extends Rt {
	constructor(e) {
		const t = Rd(e),
			n = new Me(),
			i = [],
			r = [],
			o = new re(0, 0, 1),
			a = new re(0, 1, 0);
		for (let c = 0; c < t.length; c++) {
			const h = t[c];
			h.parent &&
				h.parent.isBone &&
				(i.push(0, 0, 0),
				i.push(0, 0, 0),
				r.push(o.r, o.g, o.b),
				r.push(a.r, a.g, a.b));
		}
		n.setAttribute("position", new fe(i, 3)),
			n.setAttribute("color", new fe(r, 3));
		const l = new vt({
			vertexColors: !0,
			depthTest: !1,
			depthWrite: !1,
			toneMapped: !1,
			transparent: !0
		});
		super(n, l),
			(this.type = "SkeletonHelper"),
			(this.isSkeletonHelper = !0),
			(this.root = e),
			(this.bones = t),
			(this.matrix = e.matrixWorld),
			(this.matrixAutoUpdate = !1);
	}
	updateMatrixWorld(e) {
		const t = this.bones,
			n = this.geometry,
			i = n.getAttribute("position");
		_a.copy(this.root.matrixWorld).invert();
		for (let r = 0, o = 0; r < t.length; r++) {
			const a = t[r];
			a.parent &&
				a.parent.isBone &&
				(Xs.multiplyMatrices(_a, a.matrixWorld),
				Rn.setFromMatrixPosition(Xs),
				i.setXYZ(o, Rn.x, Rn.y, Rn.z),
				Xs.multiplyMatrices(_a, a.parent.matrixWorld),
				Rn.setFromMatrixPosition(Xs),
				i.setXYZ(o + 1, Rn.x, Rn.y, Rn.z),
				(o += 2));
		}
		(n.getAttribute("position").needsUpdate = !0), super.updateMatrixWorld(e);
	}
}
function Rd(s) {
	const e = [];
	s && s.isBone && e.push(s);
	for (let t = 0; t < s.children.length; t++) e.push.apply(e, Rd(s.children[t]));
	return e;
}
class hy extends je {
	constructor(e, t, n) {
		const i = new fi(t, 4, 2),
			r = new Nt({ wireframe: !0, fog: !1, toneMapped: !1 });
		super(i, r),
			(this.light = e),
			this.light.updateMatrixWorld(),
			(this.color = n),
			(this.type = "PointLightHelper"),
			(this.matrix = this.light.matrixWorld),
			(this.matrixAutoUpdate = !1),
			this.update();
	}
	dispose() {
		this.geometry.dispose(), this.material.dispose();
	}
	update() {
		this.color !== void 0
			? this.material.color.set(this.color)
			: this.material.color.copy(this.light.color);
	}
}
const uy = new w(),
	mh = new re(),
	gh = new re();
class dy extends Fe {
	constructor(e, t, n) {
		super(),
			(this.light = e),
			this.light.updateMatrixWorld(),
			(this.matrix = e.matrixWorld),
			(this.matrixAutoUpdate = !1),
			(this.color = n);
		const i = new ui(t);
		i.rotateY(Math.PI * 0.5),
			(this.material = new Nt({ wireframe: !0, fog: !1, toneMapped: !1 })),
			this.color === void 0 && (this.material.vertexColors = !0);
		const r = i.getAttribute("position"),
			o = new Float32Array(r.count * 3);
		i.setAttribute("color", new Oe(o, 3)),
			this.add(new je(i, this.material)),
			this.update();
	}
	dispose() {
		this.children[0].geometry.dispose(), this.children[0].material.dispose();
	}
	update() {
		const e = this.children[0];
		if (this.color !== void 0) this.material.color.set(this.color);
		else {
			const t = e.geometry.getAttribute("color");
			mh.copy(this.light.color), gh.copy(this.light.groundColor);
			for (let n = 0, i = t.count; n < i; n++) {
				const r = n < i / 2 ? mh : gh;
				t.setXYZ(n, r.r, r.g, r.b);
			}
			t.needsUpdate = !0;
		}
		e.lookAt(uy.setFromMatrixPosition(this.light.matrixWorld).negate());
	}
}
class Ld extends Rt {
	constructor(e = 10, t = 10, n = 4473924, i = 8947848) {
		(n = new re(n)), (i = new re(i));
		const r = t / 2,
			o = e / t,
			a = e / 2,
			l = [],
			c = [];
		for (let d = 0, f = 0, m = -a; d <= t; d++, m += o) {
			l.push(-a, 0, m, a, 0, m), l.push(m, 0, -a, m, 0, a);
			const x = d === r ? n : i;
			x.toArray(c, f),
				(f += 3),
				x.toArray(c, f),
				(f += 3),
				x.toArray(c, f),
				(f += 3),
				x.toArray(c, f),
				(f += 3);
		}
		const h = new Me();
		h.setAttribute("position", new fe(l, 3)),
			h.setAttribute("color", new fe(c, 3));
		const u = new vt({ vertexColors: !0, toneMapped: !1 });
		super(h, u), (this.type = "GridHelper");
	}
}
class fy extends Rt {
	constructor(e = 10, t = 16, n = 8, i = 64, r = 4473924, o = 8947848) {
		(r = new re(r)), (o = new re(o));
		const a = [],
			l = [];
		for (let u = 0; u <= t; u++) {
			const d = (u / t) * (Math.PI * 2),
				f = Math.sin(d) * e,
				m = Math.cos(d) * e;
			a.push(0, 0, 0), a.push(f, 0, m);
			const x = u & 1 ? r : o;
			l.push(x.r, x.g, x.b), l.push(x.r, x.g, x.b);
		}
		for (let u = 0; u <= n; u++) {
			const d = u & 1 ? r : o,
				f = e - (e / n) * u;
			for (let m = 0; m < i; m++) {
				let x = (m / i) * (Math.PI * 2),
					y = Math.sin(x) * f,
					g = Math.cos(x) * f;
				a.push(y, 0, g),
					l.push(d.r, d.g, d.b),
					(x = ((m + 1) / i) * (Math.PI * 2)),
					(y = Math.sin(x) * f),
					(g = Math.cos(x) * f),
					a.push(y, 0, g),
					l.push(d.r, d.g, d.b);
			}
		}
		const c = new Me();
		c.setAttribute("position", new fe(a, 3)),
			c.setAttribute("color", new fe(l, 3));
		const h = new vt({ vertexColors: !0, toneMapped: !1 });
		super(c, h), (this.type = "PolarGridHelper");
	}
}
const xh = new w(),
	Ys = new w(),
	yh = new w();
class py extends Fe {
	constructor(e, t, n) {
		super(),
			(this.light = e),
			this.light.updateMatrixWorld(),
			(this.matrix = e.matrixWorld),
			(this.matrixAutoUpdate = !1),
			(this.color = n),
			t === void 0 && (t = 1);
		let i = new Me();
		i.setAttribute(
			"position",
			new fe([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0], 3)
		);
		const r = new vt({ fog: !1, toneMapped: !1 });
		(this.lightPlane = new yn(i, r)),
			this.add(this.lightPlane),
			(i = new Me()),
			i.setAttribute("position", new fe([0, 0, 0, 0, 0, 1], 3)),
			(this.targetLine = new yn(i, r)),
			this.add(this.targetLine),
			this.update();
	}
	dispose() {
		this.lightPlane.geometry.dispose(),
			this.lightPlane.material.dispose(),
			this.targetLine.geometry.dispose(),
			this.targetLine.material.dispose();
	}
	update() {
		xh.setFromMatrixPosition(this.light.matrixWorld),
			Ys.setFromMatrixPosition(this.light.target.matrixWorld),
			yh.subVectors(Ys, xh),
			this.lightPlane.lookAt(Ys),
			this.color !== void 0
				? (this.lightPlane.material.color.set(this.color),
				  this.targetLine.material.color.set(this.color))
				: (this.lightPlane.material.color.copy(this.light.color),
				  this.targetLine.material.color.copy(this.light.color)),
			this.targetLine.lookAt(Ys),
			(this.targetLine.scale.z = yh.length());
	}
}
const Zs = new w(),
	rt = new Kr();
class my extends Rt {
	constructor(e) {
		const t = new Me(),
			n = new vt({ color: 16777215, vertexColors: !0, toneMapped: !1 }),
			i = [],
			r = [],
			o = {},
			a = new re(16755200),
			l = new re(16711680),
			c = new re(43775),
			h = new re(16777215),
			u = new re(3355443);
		d("n1", "n2", a),
			d("n2", "n4", a),
			d("n4", "n3", a),
			d("n3", "n1", a),
			d("f1", "f2", a),
			d("f2", "f4", a),
			d("f4", "f3", a),
			d("f3", "f1", a),
			d("n1", "f1", a),
			d("n2", "f2", a),
			d("n3", "f3", a),
			d("n4", "f4", a),
			d("p", "n1", l),
			d("p", "n2", l),
			d("p", "n3", l),
			d("p", "n4", l),
			d("u1", "u2", c),
			d("u2", "u3", c),
			d("u3", "u1", c),
			d("c", "t", h),
			d("p", "c", u),
			d("cn1", "cn2", u),
			d("cn3", "cn4", u),
			d("cf1", "cf2", u),
			d("cf3", "cf4", u);
		function d(m, x, y) {
			f(m, y), f(x, y);
		}
		function f(m, x) {
			i.push(0, 0, 0),
				r.push(x.r, x.g, x.b),
				o[m] === void 0 && (o[m] = []),
				o[m].push(i.length / 3 - 1);
		}
		t.setAttribute("position", new fe(i, 3)),
			t.setAttribute("color", new fe(r, 3)),
			super(t, n),
			(this.type = "CameraHelper"),
			(this.camera = e),
			this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(),
			(this.matrix = e.matrixWorld),
			(this.matrixAutoUpdate = !1),
			(this.pointMap = o),
			this.update();
	}
	update() {
		const e = this.geometry,
			t = this.pointMap,
			n = 1,
			i = 1;
		rt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),
			at("c", t, e, rt, 0, 0, -1),
			at("t", t, e, rt, 0, 0, 1),
			at("n1", t, e, rt, -n, -i, -1),
			at("n2", t, e, rt, n, -i, -1),
			at("n3", t, e, rt, -n, i, -1),
			at("n4", t, e, rt, n, i, -1),
			at("f1", t, e, rt, -n, -i, 1),
			at("f2", t, e, rt, n, -i, 1),
			at("f3", t, e, rt, -n, i, 1),
			at("f4", t, e, rt, n, i, 1),
			at("u1", t, e, rt, n * 0.7, i * 1.1, -1),
			at("u2", t, e, rt, -n * 0.7, i * 1.1, -1),
			at("u3", t, e, rt, 0, i * 2, -1),
			at("cf1", t, e, rt, -n, 0, 1),
			at("cf2", t, e, rt, n, 0, 1),
			at("cf3", t, e, rt, 0, -i, 1),
			at("cf4", t, e, rt, 0, i, 1),
			at("cn1", t, e, rt, -n, 0, -1),
			at("cn2", t, e, rt, n, 0, -1),
			at("cn3", t, e, rt, 0, -i, -1),
			at("cn4", t, e, rt, 0, i, -1),
			(e.getAttribute("position").needsUpdate = !0);
	}
	dispose() {
		this.geometry.dispose(), this.material.dispose();
	}
}
function at(s, e, t, n, i, r, o) {
	Zs.set(i, r, o).unproject(n);
	const a = e[s];
	if (a !== void 0) {
		const l = t.getAttribute("position");
		for (let c = 0, h = a.length; c < h; c++) l.setXYZ(a[c], Zs.x, Zs.y, Zs.z);
	}
}
const Js = new Bt();
class Pd extends Rt {
	constructor(e, t = 16776960) {
		const n = new Uint16Array([
				0,
				1,
				1,
				2,
				2,
				3,
				3,
				0,
				4,
				5,
				5,
				6,
				6,
				7,
				7,
				4,
				0,
				4,
				1,
				5,
				2,
				6,
				3,
				7
			]),
			i = new Float32Array(8 * 3),
			r = new Me();
		r.setIndex(new Oe(n, 1)),
			r.setAttribute("position", new Oe(i, 3)),
			super(r, new vt({ color: t, toneMapped: !1 })),
			(this.object = e),
			(this.type = "BoxHelper"),
			(this.matrixAutoUpdate = !1),
			this.update();
	}
	update(e) {
		if (
			(e !== void 0 &&
				console.warn("THREE.BoxHelper: .update() has no longer arguments."),
			this.object !== void 0 && Js.setFromObject(this.object),
			Js.isEmpty())
		)
			return;
		const t = Js.min,
			n = Js.max,
			i = this.geometry.attributes.position,
			r = i.array;
		(r[0] = n.x),
			(r[1] = n.y),
			(r[2] = n.z),
			(r[3] = t.x),
			(r[4] = n.y),
			(r[5] = n.z),
			(r[6] = t.x),
			(r[7] = t.y),
			(r[8] = n.z),
			(r[9] = n.x),
			(r[10] = t.y),
			(r[11] = n.z),
			(r[12] = n.x),
			(r[13] = n.y),
			(r[14] = t.z),
			(r[15] = t.x),
			(r[16] = n.y),
			(r[17] = t.z),
			(r[18] = t.x),
			(r[19] = t.y),
			(r[20] = t.z),
			(r[21] = n.x),
			(r[22] = t.y),
			(r[23] = t.z),
			(i.needsUpdate = !0),
			this.geometry.computeBoundingSphere();
	}
	setFromObject(e) {
		return (this.object = e), this.update(), this;
	}
	copy(e) {
		return Rt.prototype.copy.call(this, e), (this.object = e.object), this;
	}
}
class gy extends Rt {
	constructor(e, t = 16776960) {
		const n = new Uint16Array([
				0,
				1,
				1,
				2,
				2,
				3,
				3,
				0,
				4,
				5,
				5,
				6,
				6,
				7,
				7,
				4,
				0,
				4,
				1,
				5,
				2,
				6,
				3,
				7
			]),
			i = [
				1,
				1,
				1,
				-1,
				1,
				1,
				-1,
				-1,
				1,
				1,
				-1,
				1,
				1,
				1,
				-1,
				-1,
				1,
				-1,
				-1,
				-1,
				-1,
				1,
				-1,
				-1
			],
			r = new Me();
		r.setIndex(new Oe(n, 1)),
			r.setAttribute("position", new fe(i, 3)),
			super(r, new vt({ color: t, toneMapped: !1 })),
			(this.box = e),
			(this.type = "Box3Helper"),
			this.geometry.computeBoundingSphere();
	}
	updateMatrixWorld(e) {
		const t = this.box;
		t.isEmpty() ||
			(t.getCenter(this.position),
			t.getSize(this.scale),
			this.scale.multiplyScalar(0.5),
			super.updateMatrixWorld(e));
	}
}
class xy extends yn {
	constructor(e, t = 1, n = 16776960) {
		const i = n,
			r = [
				1,
				-1,
				1,
				-1,
				1,
				1,
				-1,
				-1,
				1,
				1,
				1,
				1,
				-1,
				1,
				1,
				-1,
				-1,
				1,
				1,
				-1,
				1,
				1,
				1,
				1,
				0,
				0,
				1,
				0,
				0,
				0
			],
			o = new Me();
		o.setAttribute("position", new fe(r, 3)),
			o.computeBoundingSphere(),
			super(o, new vt({ color: i, toneMapped: !1 })),
			(this.type = "PlaneHelper"),
			(this.plane = e),
			(this.size = t);
		const a = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1],
			l = new Me();
		l.setAttribute("position", new fe(a, 3)),
			l.computeBoundingSphere(),
			this.add(
				new je(
					l,
					new Nt({
						color: i,
						opacity: 0.2,
						transparent: !0,
						depthWrite: !1,
						toneMapped: !1
					})
				)
			);
	}
	updateMatrixWorld(e) {
		let t = -this.plane.constant;
		Math.abs(t) < 1e-8 && (t = 1e-8),
			this.scale.set(0.5 * this.size, 0.5 * this.size, t),
			(this.children[0].material.side = t < 0 ? lt : ai),
			this.lookAt(this.plane.normal),
			super.updateMatrixWorld(e);
	}
}
const vh = new w();
let js, ba;
class yy extends Fe {
	constructor(
		e = new w(0, 0, 1),
		t = new w(0, 0, 0),
		n = 1,
		i = 16776960,
		r = n * 0.2,
		o = r * 0.2
	) {
		super(),
			(this.type = "ArrowHelper"),
			js === void 0 &&
				((js = new Me()),
				js.setAttribute("position", new fe([0, 0, 0, 0, 1, 0], 3)),
				(ba = new vn(0, 0.5, 1, 5, 1)),
				ba.translate(0, -0.5, 0)),
			this.position.copy(t),
			(this.line = new yn(js, new vt({ color: i, toneMapped: !1 }))),
			(this.line.matrixAutoUpdate = !1),
			this.add(this.line),
			(this.cone = new je(ba, new Nt({ color: i, toneMapped: !1 }))),
			(this.cone.matrixAutoUpdate = !1),
			this.add(this.cone),
			this.setDirection(e),
			this.setLength(n, r, o);
	}
	setDirection(e) {
		if (e.y > 0.99999) this.quaternion.set(0, 0, 0, 1);
		else if (e.y < -0.99999) this.quaternion.set(1, 0, 0, 0);
		else {
			vh.set(e.z, 0, -e.x).normalize();
			const t = Math.acos(e.y);
			this.quaternion.setFromAxisAngle(vh, t);
		}
	}
	setLength(e, t = e * 0.2, n = t * 0.2) {
		this.line.scale.set(1, Math.max(1e-4, e - t), 1),
			this.line.updateMatrix(),
			this.cone.scale.set(n, t, n),
			(this.cone.position.y = e),
			this.cone.updateMatrix();
	}
	setColor(e) {
		this.line.material.color.set(e), this.cone.material.color.set(e);
	}
	copy(e) {
		return (
			super.copy(e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this
		);
	}
}
class Dd extends Rt {
	constructor(e = 1) {
		const t = [0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
			n = [1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1],
			i = new Me();
		i.setAttribute("position", new fe(t, 3)),
			i.setAttribute("color", new fe(n, 3));
		const r = new vt({ vertexColors: !0, toneMapped: !1 });
		super(i, r), (this.type = "AxesHelper");
	}
	setColors(e, t, n) {
		const i = new re(),
			r = this.geometry.attributes.color.array;
		return (
			i.set(e),
			i.toArray(r, 0),
			i.toArray(r, 3),
			i.set(t),
			i.toArray(r, 6),
			i.toArray(r, 9),
			i.set(n),
			i.toArray(r, 12),
			i.toArray(r, 15),
			(this.geometry.attributes.color.needsUpdate = !0),
			this
		);
	}
	dispose() {
		this.geometry.dispose(), this.material.dispose();
	}
}
class vy {
	constructor() {
		(this.type = "ShapePath"),
			(this.color = new re()),
			(this.subPaths = []),
			(this.currentPath = null);
	}
	moveTo(e, t) {
		return (
			(this.currentPath = new kr()),
			this.subPaths.push(this.currentPath),
			this.currentPath.moveTo(e, t),
			this
		);
	}
	lineTo(e, t) {
		return this.currentPath.lineTo(e, t), this;
	}
	quadraticCurveTo(e, t, n, i) {
		return this.currentPath.quadraticCurveTo(e, t, n, i), this;
	}
	bezierCurveTo(e, t, n, i, r, o) {
		return this.currentPath.bezierCurveTo(e, t, n, i, r, o), this;
	}
	splineThru(e) {
		return this.currentPath.splineThru(e), this;
	}
	toShapes(e, t) {
		function n(p) {
			const M = [];
			for (let v = 0, _ = p.length; v < _; v++) {
				const E = p[v],
					A = new $t();
				(A.curves = E.curves), M.push(A);
			}
			return M;
		}
		function i(p, M) {
			const v = M.length;
			let _ = !1;
			for (let E = v - 1, A = 0; A < v; E = A++) {
				let D = M[E],
					H = M[A],
					I = H.x - D.x,
					b = H.y - D.y;
				if (Math.abs(b) > Number.EPSILON) {
					if (
						(b < 0 && ((D = M[A]), (I = -I), (H = M[E]), (b = -b)),
						p.y < D.y || p.y > H.y)
					)
						continue;
					if (p.y === D.y) {
						if (p.x === D.x) return !0;
					} else {
						const L = b * (p.x - D.x) - I * (p.y - D.y);
						if (L === 0) return !0;
						if (L < 0) continue;
						_ = !_;
					}
				} else {
					if (p.y !== D.y) continue;
					if ((H.x <= p.x && p.x <= D.x) || (D.x <= p.x && p.x <= H.x)) return !0;
				}
			}
			return _;
		}
		const r = Kt.isClockWise,
			o = this.subPaths;
		if (o.length === 0) return [];
		if (t === !0) return n(o);
		let a, l, c;
		const h = [];
		if (o.length === 1)
			return (l = o[0]), (c = new $t()), (c.curves = l.curves), h.push(c), h;
		let u = !r(o[0].getPoints());
		u = e ? !u : u;
		const d = [],
			f = [];
		let m = [],
			x = 0,
			y;
		(f[x] = void 0), (m[x] = []);
		for (let p = 0, M = o.length; p < M; p++)
			(l = o[p]),
				(y = l.getPoints()),
				(a = r(y)),
				(a = e ? !a : a),
				a
					? (!u && f[x] && x++,
					  (f[x] = { s: new $t(), p: y }),
					  (f[x].s.curves = l.curves),
					  u && x++,
					  (m[x] = []))
					: m[x].push({ h: l, p: y[0] });
		if (!f[0]) return n(o);
		if (f.length > 1) {
			let p = !1;
			const M = [];
			for (let v = 0, _ = f.length; v < _; v++) d[v] = [];
			for (let v = 0, _ = f.length; v < _; v++) {
				const E = m[v];
				for (let A = 0; A < E.length; A++) {
					const D = E[A];
					let H = !0;
					for (let I = 0; I < f.length; I++)
						i(D.p, f[I].p) &&
							(v !== I && M.push({ froms: v, tos: I, hole: A }),
							H ? ((H = !1), d[I].push(D)) : (p = !0));
					H && d[v].push(D);
				}
			}
			M.length > 0 && (p || (m = d));
		}
		let g;
		for (let p = 0, M = f.length; p < M; p++) {
			(c = f[p].s), h.push(c), (g = m[p]);
			for (let v = 0, _ = g.length; v < _; v++) c.holes.push(g[v].h);
		}
		return h;
	}
}
const Id = new Float32Array(1),
	_y = new Int32Array(Id.buffer);
class by {
	static toHalfFloat(e) {
		e > 65504 &&
			(console.warn("THREE.DataUtils.toHalfFloat(): value exceeds 65504."),
			(e = 65504)),
			(Id[0] = e);
		const t = _y[0];
		let n = (t >> 16) & 32768,
			i = (t >> 12) & 2047;
		const r = (t >> 23) & 255;
		return r < 103
			? n
			: r > 142
			? ((n |= 31744), (n |= (r == 255 ? 0 : 1) && t & 8388607), n)
			: r < 113
			? ((i |= 2048), (n |= (i >> (114 - r)) + ((i >> (113 - r)) & 1)), n)
			: ((n |= ((r - 112) << 10) | (i >> 1)), (n += i & 1), n);
	}
}
const My = 0,
	wy = 1,
	Sy = 0,
	Ty = 1,
	Ey = 2;
function Ay(s) {
	return (
		console.warn(
			"THREE.MeshFaceMaterial has been removed. Use an Array instead."
		),
		s
	);
}
function Cy(s = []) {
	return (
		console.warn("THREE.MultiMaterial has been removed. Use an Array instead."),
		(s.isMultiMaterial = !0),
		(s.materials = s),
		(s.clone = function () {
			return s.slice();
		}),
		s
	);
}
function Ry(s, e) {
	return (
		console.warn("THREE.PointCloud has been renamed to THREE.Points."),
		new ns(s, e)
	);
}
function Ly(s) {
	return (
		console.warn("THREE.Particle has been renamed to THREE.Sprite."), new Ro(s)
	);
}
function Py(s, e) {
	return (
		console.warn("THREE.ParticleSystem has been renamed to THREE.Points."),
		new ns(s, e)
	);
}
function Dy(s) {
	return (
		console.warn(
			"THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."
		),
		new Mi(s)
	);
}
function Iy(s) {
	return (
		console.warn(
			"THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."
		),
		new Mi(s)
	);
}
function Fy(s) {
	return (
		console.warn(
			"THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."
		),
		new Mi(s)
	);
}
function By(s, e, t) {
	return (
		console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."),
		new w(s, e, t)
	);
}
function zy(s, e) {
	return (
		console.warn(
			"THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setUsage( THREE.DynamicDrawUsage ) instead."
		),
		new Oe(s, e).setUsage(Qi)
	);
}
function Ny(s, e) {
	return (
		console.warn(
			"THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."
		),
		new Ru(s, e)
	);
}
function Oy(s, e) {
	return (
		console.warn(
			"THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."
		),
		new Lu(s, e)
	);
}
function Uy(s, e) {
	return (
		console.warn(
			"THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."
		),
		new Pu(s, e)
	);
}
function Hy(s, e) {
	return (
		console.warn(
			"THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."
		),
		new Du(s, e)
	);
}
function Gy(s, e) {
	return (
		console.warn(
			"THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."
		),
		new vo(s, e)
	);
}
function ky(s, e) {
	return (
		console.warn(
			"THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."
		),
		new Iu(s, e)
	);
}
function Vy(s, e) {
	return (
		console.warn(
			"THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."
		),
		new _o(s, e)
	);
}
function Wy(s, e) {
	return (
		console.warn(
			"THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."
		),
		new fe(s, e)
	);
}
function qy(s, e) {
	return (
		console.warn(
			"THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."
		),
		new Bu(s, e)
	);
}
Ft.create = function (s, e) {
	return (
		console.log("THREE.Curve.create() has been deprecated"),
		(s.prototype = Object.create(Ft.prototype)),
		(s.prototype.constructor = s),
		(s.prototype.getPoint = e),
		s
	);
};
kr.prototype.fromPoints = function (s) {
	return (
		console.warn(
			"THREE.Path: .fromPoints() has been renamed to .setFromPoints()."
		),
		this.setFromPoints(s)
	);
};
function Xy(s) {
	return (
		console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."),
		new Dd(s)
	);
}
function Yy(s, e) {
	return (
		console.warn(
			"THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."
		),
		new Pd(s, e)
	);
}
function Zy(s, e) {
	return (
		console.warn(
			"THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."
		),
		new Rt(new xl(s.geometry), new vt({ color: e !== void 0 ? e : 16777215 }))
	);
}
Ld.prototype.setColors = function () {
	console.error(
		"THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead."
	);
};
Cd.prototype.update = function () {
	console.error("THREE.SkeletonHelper: update() no longer needs to be called.");
};
function Jy(s, e) {
	return (
		console.warn(
			"THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."
		),
		new Rt(new wl(s.geometry), new vt({ color: e !== void 0 ? e : 16777215 }))
	);
}
Ct.prototype.extractUrlBase = function (s) {
	return (
		console.warn(
			"THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."
		),
		ho.extractUrlBase(s)
	);
};
Ct.Handlers = {
	add: function () {
		console.error(
			"THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead."
		);
	},
	get: function () {
		console.error(
			"THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead."
		);
	}
};
function jy(s) {
	return (
		console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."),
		new nn(s)
	);
}
function $y(s) {
	return (
		console.warn(
			"THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."
		),
		new hd(s)
	);
}
gr.prototype.center = function (s) {
	return (
		console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),
		this.getCenter(s)
	);
};
gr.prototype.empty = function () {
	return (
		console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),
		this.isEmpty()
	);
};
gr.prototype.isIntersectionBox = function (s) {
	return (
		console.warn(
			"THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."
		),
		this.intersectsBox(s)
	);
};
gr.prototype.size = function (s) {
	return (
		console.warn("THREE.Box2: .size() has been renamed to .getSize()."),
		this.getSize(s)
	);
};
Bt.prototype.center = function (s) {
	return (
		console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),
		this.getCenter(s)
	);
};
Bt.prototype.empty = function () {
	return (
		console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),
		this.isEmpty()
	);
};
Bt.prototype.isIntersectionBox = function (s) {
	return (
		console.warn(
			"THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."
		),
		this.intersectsBox(s)
	);
};
Bt.prototype.isIntersectionSphere = function (s) {
	return (
		console.warn(
			"THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."
		),
		this.intersectsSphere(s)
	);
};
Bt.prototype.size = function (s) {
	return (
		console.warn("THREE.Box3: .size() has been renamed to .getSize()."),
		this.getSize(s)
	);
};
On.prototype.empty = function () {
	return (
		console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),
		this.isEmpty()
	);
};
Qr.prototype.setFromMatrix = function (s) {
	return (
		console.warn(
			"THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."
		),
		this.setFromProjectionMatrix(s)
	);
};
Ad.prototype.center = function (s) {
	return (
		console.warn("THREE.Line3: .center() has been renamed to .getCenter()."),
		this.getCenter(s)
	);
};
mt.prototype.flattenToArrayOffset = function (s, e) {
	return (
		console.warn(
			"THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."
		),
		this.toArray(s, e)
	);
};
mt.prototype.multiplyVector3 = function (s) {
	return (
		console.warn(
			"THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."
		),
		s.applyMatrix3(this)
	);
};
mt.prototype.multiplyVector3Array = function () {
	console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.");
};
mt.prototype.applyToBufferAttribute = function (s) {
	return (
		console.warn(
			"THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."
		),
		s.applyMatrix3(this)
	);
};
mt.prototype.applyToVector3Array = function () {
	console.error("THREE.Matrix3: .applyToVector3Array() has been removed.");
};
mt.prototype.getInverse = function (s) {
	return (
		console.warn(
			"THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."
		),
		this.copy(s).invert()
	);
};
pe.prototype.extractPosition = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."
		),
		this.copyPosition(s)
	);
};
pe.prototype.flattenToArrayOffset = function (s, e) {
	return (
		console.warn(
			"THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."
		),
		this.toArray(s, e)
	);
};
pe.prototype.getPosition = function () {
	return (
		console.warn(
			"THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."
		),
		new w().setFromMatrixColumn(this, 3)
	);
};
pe.prototype.setRotationFromQuaternion = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."
		),
		this.makeRotationFromQuaternion(s)
	);
};
pe.prototype.multiplyToArray = function () {
	console.warn("THREE.Matrix4: .multiplyToArray() has been removed.");
};
pe.prototype.multiplyVector3 = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."
		),
		s.applyMatrix4(this)
	);
};
pe.prototype.multiplyVector4 = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."
		),
		s.applyMatrix4(this)
	);
};
pe.prototype.multiplyVector3Array = function () {
	console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.");
};
pe.prototype.rotateAxis = function (s) {
	console.warn(
		"THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."
	),
		s.transformDirection(this);
};
pe.prototype.crossVector = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."
		),
		s.applyMatrix4(this)
	);
};
pe.prototype.translate = function () {
	console.error("THREE.Matrix4: .translate() has been removed.");
};
pe.prototype.rotateX = function () {
	console.error("THREE.Matrix4: .rotateX() has been removed.");
};
pe.prototype.rotateY = function () {
	console.error("THREE.Matrix4: .rotateY() has been removed.");
};
pe.prototype.rotateZ = function () {
	console.error("THREE.Matrix4: .rotateZ() has been removed.");
};
pe.prototype.rotateByAxis = function () {
	console.error("THREE.Matrix4: .rotateByAxis() has been removed.");
};
pe.prototype.applyToBufferAttribute = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."
		),
		s.applyMatrix4(this)
	);
};
pe.prototype.applyToVector3Array = function () {
	console.error("THREE.Matrix4: .applyToVector3Array() has been removed.");
};
pe.prototype.makeFrustum = function (s, e, t, n, i, r) {
	return (
		console.warn(
			"THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."
		),
		this.makePerspective(s, e, n, t, i, r)
	);
};
pe.prototype.getInverse = function (s) {
	return (
		console.warn(
			"THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."
		),
		this.copy(s).invert()
	);
};
kt.prototype.isIntersectionLine = function (s) {
	return (
		console.warn(
			"THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."
		),
		this.intersectsLine(s)
	);
};
gt.prototype.multiplyVector3 = function (s) {
	return (
		console.warn(
			"THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."
		),
		s.applyQuaternion(this)
	);
};
gt.prototype.inverse = function () {
	return (
		console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),
		this.invert()
	);
};
Un.prototype.isIntersectionBox = function (s) {
	return (
		console.warn(
			"THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."
		),
		this.intersectsBox(s)
	);
};
Un.prototype.isIntersectionPlane = function (s) {
	return (
		console.warn(
			"THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."
		),
		this.intersectsPlane(s)
	);
};
Un.prototype.isIntersectionSphere = function (s) {
	return (
		console.warn(
			"THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."
		),
		this.intersectsSphere(s)
	);
};
st.prototype.area = function () {
	return (
		console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),
		this.getArea()
	);
};
st.prototype.barycoordFromPoint = function (s, e) {
	return (
		console.warn(
			"THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."
		),
		this.getBarycoord(s, e)
	);
};
st.prototype.midpoint = function (s) {
	return (
		console.warn(
			"THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."
		),
		this.getMidpoint(s)
	);
};
st.prototypenormal = function (s) {
	return (
		console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),
		this.getNormal(s)
	);
};
st.prototype.plane = function (s) {
	return (
		console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),
		this.getPlane(s)
	);
};
st.barycoordFromPoint = function (s, e, t, n, i) {
	return (
		console.warn(
			"THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."
		),
		st.getBarycoord(s, e, t, n, i)
	);
};
st.normal = function (s, e, t, n) {
	return (
		console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),
		st.getNormal(s, e, t, n)
	);
};
$t.prototype.extractAllPoints = function (s) {
	return (
		console.warn(
			"THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."
		),
		this.extractPoints(s)
	);
};
$t.prototype.extrude = function (s) {
	return (
		console.warn(
			"THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."
		),
		new tn(this, s)
	);
};
$t.prototype.makeGeometry = function (s) {
	return (
		console.warn(
			"THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."
		),
		new di(this, s)
	);
};
G.prototype.fromAttribute = function (s, e, t) {
	return (
		console.warn(
			"THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."
		),
		this.fromBufferAttribute(s, e, t)
	);
};
G.prototype.distanceToManhattan = function (s) {
	return (
		console.warn(
			"THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."
		),
		this.manhattanDistanceTo(s)
	);
};
G.prototype.lengthManhattan = function () {
	return (
		console.warn(
			"THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."
		),
		this.manhattanLength()
	);
};
w.prototype.setEulerFromRotationMatrix = function () {
	console.error(
		"THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead."
	);
};
w.prototype.setEulerFromQuaternion = function () {
	console.error(
		"THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead."
	);
};
w.prototype.getPositionFromMatrix = function (s) {
	return (
		console.warn(
			"THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."
		),
		this.setFromMatrixPosition(s)
	);
};
w.prototype.getScaleFromMatrix = function (s) {
	return (
		console.warn(
			"THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."
		),
		this.setFromMatrixScale(s)
	);
};
w.prototype.getColumnFromMatrix = function (s, e) {
	return (
		console.warn(
			"THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."
		),
		this.setFromMatrixColumn(e, s)
	);
};
w.prototype.applyProjection = function (s) {
	return (
		console.warn(
			"THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."
		),
		this.applyMatrix4(s)
	);
};
w.prototype.fromAttribute = function (s, e, t) {
	return (
		console.warn(
			"THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."
		),
		this.fromBufferAttribute(s, e, t)
	);
};
w.prototype.distanceToManhattan = function (s) {
	return (
		console.warn(
			"THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."
		),
		this.manhattanDistanceTo(s)
	);
};
w.prototype.lengthManhattan = function () {
	return (
		console.warn(
			"THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."
		),
		this.manhattanLength()
	);
};
We.prototype.fromAttribute = function (s, e, t) {
	return (
		console.warn(
			"THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."
		),
		this.fromBufferAttribute(s, e, t)
	);
};
We.prototype.lengthManhattan = function () {
	return (
		console.warn(
			"THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."
		),
		this.manhattanLength()
	);
};
Fe.prototype.getChildByName = function (s) {
	return (
		console.warn(
			"THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."
		),
		this.getObjectByName(s)
	);
};
Fe.prototype.renderDepth = function () {
	console.warn(
		"THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead."
	);
};
Fe.prototype.translate = function (s, e) {
	return (
		console.warn(
			"THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."
		),
		this.translateOnAxis(e, s)
	);
};
Fe.prototype.getWorldRotation = function () {
	console.error(
		"THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead."
	);
};
Fe.prototype.applyMatrix = function (s) {
	return (
		console.warn(
			"THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."
		),
		this.applyMatrix4(s)
	);
};
Object.defineProperties(Fe.prototype, {
	eulerOrder: {
		get: function () {
			return (
				console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),
				this.rotation.order
			);
		},
		set: function (s) {
			console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),
				(this.rotation.order = s);
		}
	},
	useQuaternion: {
		get: function () {
			console.warn(
				"THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default."
			);
		},
		set: function () {
			console.warn(
				"THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default."
			);
		}
	}
});
je.prototype.setDrawMode = function () {
	console.error(
		"THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary."
	);
};
Object.defineProperties(je.prototype, {
	drawMode: {
		get: function () {
			return (
				console.error(
					"THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."
				),
				vu
			);
		},
		set: function () {
			console.error(
				"THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary."
			);
		}
	}
});
Lo.prototype.initBones = function () {
	console.error("THREE.SkinnedMesh: initBones() has been removed.");
};
pt.prototype.setLens = function (s, e) {
	console.warn(
		"THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."
	),
		e !== void 0 && (this.filmGauge = e),
		this.setFocalLength(s);
};
Object.defineProperties(Wt.prototype, {
	onlyShadow: {
		set: function () {
			console.warn("THREE.Light: .onlyShadow has been removed.");
		}
	},
	shadowCameraFov: {
		set: function (s) {
			console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),
				(this.shadow.camera.fov = s);
		}
	},
	shadowCameraLeft: {
		set: function (s) {
			console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),
				(this.shadow.camera.left = s);
		}
	},
	shadowCameraRight: {
		set: function (s) {
			console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),
				(this.shadow.camera.right = s);
		}
	},
	shadowCameraTop: {
		set: function (s) {
			console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),
				(this.shadow.camera.top = s);
		}
	},
	shadowCameraBottom: {
		set: function (s) {
			console.warn(
				"THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."
			),
				(this.shadow.camera.bottom = s);
		}
	},
	shadowCameraNear: {
		set: function (s) {
			console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),
				(this.shadow.camera.near = s);
		}
	},
	shadowCameraFar: {
		set: function (s) {
			console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),
				(this.shadow.camera.far = s);
		}
	},
	shadowCameraVisible: {
		set: function () {
			console.warn(
				"THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead."
			);
		}
	},
	shadowBias: {
		set: function (s) {
			console.warn("THREE.Light: .shadowBias is now .shadow.bias."),
				(this.shadow.bias = s);
		}
	},
	shadowDarkness: {
		set: function () {
			console.warn("THREE.Light: .shadowDarkness has been removed.");
		}
	},
	shadowMapWidth: {
		set: function (s) {
			console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),
				(this.shadow.mapSize.width = s);
		}
	},
	shadowMapHeight: {
		set: function (s) {
			console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),
				(this.shadow.mapSize.height = s);
		}
	}
});
Object.defineProperties(Oe.prototype, {
	length: {
		get: function () {
			return (
				console.warn(
					"THREE.BufferAttribute: .length has been deprecated. Use .count instead."
				),
				this.array.length
			);
		}
	},
	dynamic: {
		get: function () {
			return (
				console.warn(
					"THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."
				),
				this.usage === Qi
			);
		},
		set: function () {
			console.warn(
				"THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."
			),
				this.setUsage(Qi);
		}
	}
});
Oe.prototype.setDynamic = function (s) {
	return (
		console.warn(
			"THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."
		),
		this.setUsage(s === !0 ? Qi : Ki),
		this
	);
};
(Oe.prototype.copyIndicesArray = function () {
	console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.");
}),
	(Oe.prototype.setArray = function () {
		console.error(
			"THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers"
		);
	});
Me.prototype.addIndex = function (s) {
	console.warn(
		"THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."
	),
		this.setIndex(s);
};
Me.prototype.addAttribute = function (s, e) {
	return (
		console.warn(
			"THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."
		),
		!(e && e.isBufferAttribute) && !(e && e.isInterleavedBufferAttribute)
			? (console.warn(
					"THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."
			  ),
			  this.setAttribute(s, new Oe(arguments[1], arguments[2])))
			: s === "index"
			? (console.warn(
					"THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."
			  ),
			  this.setIndex(e),
			  this)
			: this.setAttribute(s, e)
	);
};
Me.prototype.addDrawCall = function (s, e, t) {
	t !== void 0 &&
		console.warn(
			"THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."
		),
		console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),
		this.addGroup(s, e);
};
Me.prototype.clearDrawCalls = function () {
	console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),
		this.clearGroups();
};
Me.prototype.computeOffsets = function () {
	console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.");
};
Me.prototype.removeAttribute = function (s) {
	return (
		console.warn(
			"THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."
		),
		this.deleteAttribute(s)
	);
};
Me.prototype.applyMatrix = function (s) {
	return (
		console.warn(
			"THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."
		),
		this.applyMatrix4(s)
	);
};
Object.defineProperties(Me.prototype, {
	drawcalls: {
		get: function () {
			return (
				console.error(
					"THREE.BufferGeometry: .drawcalls has been renamed to .groups."
				),
				this.groups
			);
		}
	},
	offsets: {
		get: function () {
			return (
				console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),
				this.groups
			);
		}
	}
});
bi.prototype.setDynamic = function (s) {
	return (
		console.warn(
			"THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."
		),
		this.setUsage(s === !0 ? Qi : Ki),
		this
	);
};
bi.prototype.setArray = function () {
	console.error(
		"THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers"
	);
};
tn.prototype.getArrays = function () {
	console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.");
};
tn.prototype.addShapeList = function () {
	console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.");
};
tn.prototype.addShape = function () {
	console.error("THREE.ExtrudeGeometry: .addShape() has been removed.");
};
Ao.prototype.dispose = function () {
	console.error("THREE.Scene: .dispose() has been removed.");
};
Ho.prototype.onUpdate = function () {
	return (
		console.warn(
			"THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."
		),
		this
	);
};
Object.defineProperties(yt.prototype, {
	wrapAround: {
		get: function () {
			console.warn("THREE.Material: .wrapAround has been removed.");
		},
		set: function () {
			console.warn("THREE.Material: .wrapAround has been removed.");
		}
	},
	overdraw: {
		get: function () {
			console.warn("THREE.Material: .overdraw has been removed.");
		},
		set: function () {
			console.warn("THREE.Material: .overdraw has been removed.");
		}
	},
	wrapRGB: {
		get: function () {
			return console.warn("THREE.Material: .wrapRGB has been removed."), new re();
		}
	},
	shading: {
		get: function () {
			console.error(
				"THREE." +
					this.type +
					": .shading has been removed. Use the boolean .flatShading instead."
			);
		},
		set: function (s) {
			console.warn(
				"THREE." +
					this.type +
					": .shading has been removed. Use the boolean .flatShading instead."
			),
				(this.flatShading = s === sl);
		}
	},
	stencilMask: {
		get: function () {
			return (
				console.warn(
					"THREE." +
						this.type +
						": .stencilMask has been removed. Use .stencilFuncMask instead."
				),
				this.stencilFuncMask
			);
		},
		set: function (s) {
			console.warn(
				"THREE." +
					this.type +
					": .stencilMask has been removed. Use .stencilFuncMask instead."
			),
				(this.stencilFuncMask = s);
		}
	},
	vertexTangents: {
		get: function () {
			console.warn("THREE." + this.type + ": .vertexTangents has been removed.");
		},
		set: function () {
			console.warn("THREE." + this.type + ": .vertexTangents has been removed.");
		}
	}
});
Object.defineProperties(ht.prototype, {
	derivatives: {
		get: function () {
			return (
				console.warn(
					"THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."
				),
				this.extensions.derivatives
			);
		},
		set: function (s) {
			console.warn(
				"THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."
			),
				(this.extensions.derivatives = s);
		}
	}
});
Ze.prototype.clearTarget = function (s, e, t, n) {
	console.warn(
		"THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."
	),
		this.setRenderTarget(s),
		this.clear(e, t, n);
};
Ze.prototype.animate = function (s) {
	console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),
		this.setAnimationLoop(s);
};
Ze.prototype.getCurrentRenderTarget = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."
		),
		this.getRenderTarget()
	);
};
Ze.prototype.getMaxAnisotropy = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."
		),
		this.capabilities.getMaxAnisotropy()
	);
};
Ze.prototype.getPrecision = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."
		),
		this.capabilities.precision
	);
};
Ze.prototype.resetGLState = function () {
	return (
		console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),
		this.state.reset()
	);
};
Ze.prototype.supportsFloatTextures = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."
		),
		this.extensions.get("OES_texture_float")
	);
};
Ze.prototype.supportsHalfFloatTextures = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."
		),
		this.extensions.get("OES_texture_half_float")
	);
};
Ze.prototype.supportsStandardDerivatives = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."
		),
		this.extensions.get("OES_standard_derivatives")
	);
};
Ze.prototype.supportsCompressedTextureS3TC = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."
		),
		this.extensions.get("WEBGL_compressed_texture_s3tc")
	);
};
Ze.prototype.supportsCompressedTexturePVRTC = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."
		),
		this.extensions.get("WEBGL_compressed_texture_pvrtc")
	);
};
Ze.prototype.supportsBlendMinMax = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."
		),
		this.extensions.get("EXT_blend_minmax")
	);
};
Ze.prototype.supportsVertexTextures = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."
		),
		this.capabilities.vertexTextures
	);
};
Ze.prototype.supportsInstancedArrays = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."
		),
		this.extensions.get("ANGLE_instanced_arrays")
	);
};
Ze.prototype.enableScissorTest = function (s) {
	console.warn(
		"THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."
	),
		this.setScissorTest(s);
};
Ze.prototype.initMaterial = function () {
	console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.");
};
Ze.prototype.addPrePlugin = function () {
	console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.");
};
Ze.prototype.addPostPlugin = function () {
	console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.");
};
Ze.prototype.updateShadowMap = function () {
	console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.");
};
Ze.prototype.setFaceCulling = function () {
	console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.");
};
Ze.prototype.allocTextureUnit = function () {
	console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.");
};
Ze.prototype.setTexture = function () {
	console.warn("THREE.WebGLRenderer: .setTexture() has been removed.");
};
Ze.prototype.setTexture2D = function () {
	console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.");
};
Ze.prototype.setTextureCube = function () {
	console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.");
};
Ze.prototype.getActiveMipMapLevel = function () {
	return (
		console.warn(
			"THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."
		),
		this.getActiveMipmapLevel()
	);
};
Object.defineProperties(Ze.prototype, {
	shadowMapEnabled: {
		get: function () {
			return this.shadowMap.enabled;
		},
		set: function (s) {
			console.warn(
				"THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."
			),
				(this.shadowMap.enabled = s);
		}
	},
	shadowMapType: {
		get: function () {
			return this.shadowMap.type;
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),
				(this.shadowMap.type = s);
		}
	},
	shadowMapCullFace: {
		get: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead."
			);
		},
		set: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead."
			);
		}
	},
	context: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."
				),
				this.getContext()
			);
		}
	},
	vr: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"), this.xr
			);
		}
	},
	gammaInput: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."
				),
				!1
			);
		},
		set: function () {
			console.warn(
				"THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."
			);
		}
	},
	gammaOutput: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."
				),
				!1
			);
		},
		set: function (s) {
			console.warn(
				"THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."
			),
				(this.outputEncoding = s === !0 ? $e : gn);
		}
	},
	toneMappingWhitePoint: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."
				),
				1
			);
		},
		set: function () {
			console.warn(
				"THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."
			);
		}
	},
	gammaFactor: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."), 2
			);
		},
		set: function () {
			console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.");
		}
	}
});
Object.defineProperties(Xu.prototype, {
	cullFace: {
		get: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead."
			);
		},
		set: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead."
			);
		}
	},
	renderReverseSided: {
		get: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead."
			);
		},
		set: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead."
			);
		}
	},
	renderSingleSided: {
		get: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead."
			);
		},
		set: function () {
			console.warn(
				"THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead."
			);
		}
	}
});
function Ky(s, e, t) {
	return (
		console.warn(
			"THREE.WebGLRenderTargetCube( width, height, options ) is now WebGLCubeRenderTarget( size, options )."
		),
		new Mo(s, t)
	);
}
Object.defineProperties(ut.prototype, {
	wrapS: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),
				this.texture.wrapS
			);
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),
				(this.texture.wrapS = s);
		}
	},
	wrapT: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),
				this.texture.wrapT
			);
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),
				(this.texture.wrapT = s);
		}
	},
	magFilter: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."
				),
				this.texture.magFilter
			);
		},
		set: function (s) {
			console.warn(
				"THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."
			),
				(this.texture.magFilter = s);
		}
	},
	minFilter: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."
				),
				this.texture.minFilter
			);
		},
		set: function (s) {
			console.warn(
				"THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."
			),
				(this.texture.minFilter = s);
		}
	},
	anisotropy: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."
				),
				this.texture.anisotropy
			);
		},
		set: function (s) {
			console.warn(
				"THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."
			),
				(this.texture.anisotropy = s);
		}
	},
	offset: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),
				this.texture.offset
			);
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),
				(this.texture.offset = s);
		}
	},
	repeat: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),
				this.texture.repeat
			);
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),
				(this.texture.repeat = s);
		}
	},
	format: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),
				this.texture.format
			);
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),
				(this.texture.format = s);
		}
	},
	type: {
		get: function () {
			return (
				console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),
				this.texture.type
			);
		},
		set: function (s) {
			console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),
				(this.texture.type = s);
		}
	},
	generateMipmaps: {
		get: function () {
			return (
				console.warn(
					"THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."
				),
				this.texture.generateMipmaps
			);
		},
		set: function (s) {
			console.warn(
				"THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."
			),
				(this.texture.generateMipmaps = s);
		}
	}
});
Xl.prototype.load = function (s) {
	console.warn(
		"THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead."
	);
	const e = this;
	return (
		new yd().load(s, function (n) {
			e.setBuffer(n);
		}),
		this
	);
};
bd.prototype.getData = function () {
	return (
		console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."),
		this.getFrequencyData()
	);
};
bo.prototype.updateCubeMap = function (s, e) {
	return (
		console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),
		this.update(s, e)
	);
};
bo.prototype.clear = function (s, e, t, n) {
	return (
		console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),
		this.renderTarget.clear(s, e, t, n)
	);
};
Nn.crossOrigin = void 0;
Nn.loadTexture = function (s, e, t, n) {
	console.warn(
		"THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead."
	);
	const i = new ud();
	i.setCrossOrigin(this.crossOrigin);
	const r = i.load(s, t, void 0, n);
	return e && (r.mapping = e), r;
};
Nn.loadTextureCube = function (s, e, t, n) {
	console.warn(
		"THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead."
	);
	const i = new cd();
	i.setCrossOrigin(this.crossOrigin);
	const r = i.load(s, t, void 0, n);
	return e && (r.mapping = e), r;
};
Nn.loadCompressedTexture = function () {
	console.error(
		"THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead."
	);
};
Nn.loadCompressedTextureCube = function () {
	console.error(
		"THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead."
	);
};
function Qy() {
	console.error("THREE.CanvasRenderer has been removed");
}
function ev() {
	console.error("THREE.JSONLoader has been removed.");
}
const tv = {
	createMultiMaterialObject: function () {
		console.error(
			"THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js"
		);
	},
	detach: function () {
		console.error(
			"THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js"
		);
	},
	attach: function () {
		console.error(
			"THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js"
		);
	}
};
function nv() {
	console.error(
		"THREE.LensFlare has been moved to /examples/jsm/objects/Lensflare.js"
	);
}
function iv() {
	return (
		console.error(
			"THREE.ParametricGeometry has been moved to /examples/jsm/geometries/ParametricGeometry.js"
		),
		new Me()
	);
}
function rv() {
	return (
		console.error(
			"THREE.TextGeometry has been moved to /examples/jsm/geometries/TextGeometry.js"
		),
		new Me()
	);
}
function sv() {
	console.error(
		"THREE.FontLoader has been moved to /examples/jsm/loaders/FontLoader.js"
	);
}
function ov() {
	console.error(
		"THREE.Font has been moved to /examples/jsm/loaders/FontLoader.js"
	);
}
function av() {
	console.error("THREE.ImmediateRenderObject has been removed.");
}
typeof __THREE_DEVTOOLS__ != "undefined" &&
	__THREE_DEVTOOLS__.dispatchEvent(
		new CustomEvent("register", { detail: { revision: po } })
	);
typeof window != "undefined" &&
	(window.__THREE__
		? console.warn("WARNING: Multiple instances of Three.js being imported.")
		: (window.__THREE__ = po));
var lv = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			ACESFilmicToneMapping: ll,
			AddEquation: Qn,
			AddOperation: jh,
			AdditiveAnimationBlendMode: hl,
			AdditiveBlending: ro,
			AlphaFormat: ou,
			AlwaysDepth: Vh,
			AlwaysStencilFunc: wu,
			AmbientLight: Hl,
			AmbientLightProbe: _d,
			AnimationClip: Zr,
			AnimationLoader: k0,
			AnimationMixer: Sd,
			AnimationObjectGroup: wd,
			AnimationUtils: Ke,
			ArcCurve: yl,
			ArrayCamera: pl,
			ArrowHelper: yy,
			Audio: Xl,
			AudioAnalyser: bd,
			AudioContext: Wl,
			AudioListener: Z0,
			AudioLoader: yd,
			AxesHelper: Dd,
			AxisHelper: Xy,
			BackSide: lt,
			BasicDepthPacking: _u,
			BasicShadowMap: Gd,
			BinaryTextureLoader: $y,
			Bone: Po,
			BooleanKeyframeTrack: wi,
			BoundingBoxHelper: Yy,
			Box2: gr,
			Box3: Bt,
			Box3Helper: gy,
			BoxBufferGeometry: xn,
			BoxGeometry: xn,
			BoxHelper: Pd,
			BufferAttribute: Oe,
			BufferGeometry: Me,
			BufferGeometryLoader: gd,
			ByteType: tu,
			Cache: pi,
			Camera: Kr,
			CameraHelper: my,
			CanvasRenderer: Qy,
			CanvasTexture: Qu,
			CatmullRomCurve3: _l,
			CineonToneMapping: Qh,
			CircleBufferGeometry: tr,
			CircleGeometry: tr,
			ClampToEdgeWrapping: wt,
			Clock: ql,
			Color: re,
			ColorKeyframeTrack: Il,
			CompressedTexture: gl,
			CompressedTextureLoader: V0,
			ConeBufferGeometry: nr,
			ConeGeometry: nr,
			CubeCamera: bo,
			CubeReflectionMapping: mi,
			CubeRefractionMapping: gi,
			CubeTexture: dr,
			CubeTextureLoader: cd,
			CubeUVReflectionMapping: ur,
			CubeUVRefractionMapping: $r,
			CubicBezierCurve: Fo,
			CubicBezierCurve3: bl,
			CubicInterpolant: sd,
			CullFaceBack: wa,
			CullFaceFront: Ch,
			CullFaceFrontBack: Hd,
			CullFaceNone: Ah,
			Curve: Ft,
			CurvePath: td,
			CustomBlending: Lh,
			CustomToneMapping: eu,
			CylinderBufferGeometry: vn,
			CylinderGeometry: vn,
			Cylindrical: ly,
			DataTexture: oi,
			DataTexture2DArray: wo,
			DataTexture3D: fl,
			DataTextureLoader: hd,
			DataUtils: by,
			DecrementStencilOp: Kd,
			DecrementWrapStencilOp: ef,
			DefaultLoadingManager: ld,
			DepthFormat: Ln,
			DepthStencilFormat: li,
			DepthTexture: co,
			DirectionalLight: Ul,
			DirectionalLightHelper: py,
			DiscreteInterpolant: od,
			DodecahedronBufferGeometry: ir,
			DodecahedronGeometry: ir,
			DoubleSide: In,
			DstAlphaFactor: Nh,
			DstColorFactor: Uh,
			DynamicBufferAttribute: zy,
			DynamicCopyUsage: mf,
			DynamicDrawUsage: Qi,
			DynamicReadUsage: df,
			EdgesGeometry: xl,
			EdgesHelper: Zy,
			EllipseCurve: is,
			EqualDepth: qh,
			EqualStencilFunc: sf,
			EquirectangularReflectionMapping: Ir,
			EquirectangularRefractionMapping: Fr,
			Euler: vi,
			EventDispatcher: bn,
			ExtrudeBufferGeometry: tn,
			ExtrudeGeometry: tn,
			FaceColors: Ty,
			FileLoader: nn,
			FlatShading: sl,
			Float16BufferAttribute: Fu,
			Float32Attribute: Wy,
			Float32BufferAttribute: fe,
			Float64Attribute: qy,
			Float64BufferAttribute: Bu,
			FloatType: dn,
			Fog: ts,
			FogExp2: es,
			Font: ov,
			FontLoader: sv,
			FramebufferTexture: Ku,
			FrontSide: ai,
			Frustum: Qr,
			GLBufferAttribute: Ed,
			GLSL1: xf,
			GLSL3: Ja,
			GreaterDepth: Yh,
			GreaterEqualDepth: Xh,
			GreaterEqualStencilFunc: cf,
			GreaterStencilFunc: af,
			GridHelper: Ld,
			Group: ni,
			HalfFloatType: ii,
			HemisphereLight: Bl,
			HemisphereLightHelper: dy,
			HemisphereLightProbe: vd,
			IcosahedronBufferGeometry: zn,
			IcosahedronGeometry: zn,
			ImageBitmapLoader: xd,
			ImageLoader: Jr,
			ImageUtils: Nn,
			ImmediateRenderObject: av,
			IncrementStencilOp: $d,
			IncrementWrapStencilOp: Qd,
			InstancedBufferAttribute: hi,
			InstancedBufferGeometry: Vl,
			InstancedInterleavedBuffer: Td,
			InstancedMesh: Io,
			Int16Attribute: Hy,
			Int16BufferAttribute: Du,
			Int32Attribute: ky,
			Int32BufferAttribute: Iu,
			Int8Attribute: Ny,
			Int8BufferAttribute: Ru,
			IntType: iu,
			InterleavedBuffer: bi,
			InterleavedBufferAttribute: Fn,
			Interpolant: _n,
			InterpolateDiscrete: Nr,
			InterpolateLinear: Or,
			InterpolateSmooth: no,
			InvertStencilOp: tf,
			JSONLoader: ev,
			KeepStencilOp: io,
			KeyframeTrack: qt,
			LOD: ju,
			LatheBufferGeometry: rr,
			LatheGeometry: rr,
			Layers: yo,
			LensFlare: nv,
			LessDepth: Wh,
			LessEqualDepth: so,
			LessEqualStencilFunc: of,
			LessStencilFunc: rf,
			Light: Wt,
			LightProbe: ss,
			Line: yn,
			Line3: Ad,
			LineBasicMaterial: vt,
			LineCurve: rs,
			LineCurve3: ed,
			LineDashedMaterial: Pl,
			LineLoop: ml,
			LinePieces: wy,
			LineSegments: Rt,
			LineStrip: My,
			LinearEncoding: gn,
			LinearFilter: Ye,
			LinearInterpolant: Dl,
			LinearMipMapLinearFilter: Xd,
			LinearMipMapNearestFilter: qd,
			LinearMipmapLinearFilter: xi,
			LinearMipmapNearestFilter: cl,
			LinearToneMapping: $h,
			Loader: Ct,
			LoaderUtils: ho,
			LoadingManager: Fl,
			LoopOnce: gu,
			LoopPingPong: yu,
			LoopRepeat: xu,
			LuminanceAlphaFormat: cu,
			LuminanceFormat: lu,
			MOUSE: jn,
			Material: yt,
			MaterialLoader: md,
			Math: $l,
			MathUtils: $l,
			Matrix3: mt,
			Matrix4: pe,
			MaxEquation: Aa,
			Mesh: je,
			MeshBasicMaterial: Nt,
			MeshDepthMaterial: To,
			MeshDistanceMaterial: Eo,
			MeshFaceMaterial: Ay,
			MeshLambertMaterial: Rl,
			MeshMatcapMaterial: Ll,
			MeshNormalMaterial: Cl,
			MeshPhongMaterial: El,
			MeshPhysicalMaterial: Tl,
			MeshStandardMaterial: Uo,
			MeshToonMaterial: Al,
			MinEquation: Ea,
			MirroredRepeatWrapping: zr,
			MixOperation: Jh,
			MultiMaterial: Cy,
			MultiplyBlending: Ta,
			MultiplyOperation: jr,
			NearestFilter: et,
			NearestMipMapLinearFilter: Wd,
			NearestMipMapNearestFilter: Vd,
			NearestMipmapLinearFilter: ao,
			NearestMipmapNearestFilter: oo,
			NeverDepth: kh,
			NeverStencilFunc: nf,
			NoBlending: fn,
			NoColors: Sy,
			NoToneMapping: pn,
			NormalAnimationBlendMode: go,
			NormalBlending: Zi,
			NotEqualDepth: Zh,
			NotEqualStencilFunc: lf,
			NumberKeyframeTrack: Xr,
			Object3D: Fe,
			ObjectLoader: W0,
			ObjectSpaceNormalMap: Mu,
			OctahedronBufferGeometry: ui,
			OctahedronGeometry: ui,
			OneFactor: Fh,
			OneMinusDstAlphaFactor: Oh,
			OneMinusDstColorFactor: Hh,
			OneMinusSrcAlphaFactor: al,
			OneMinusSrcColorFactor: zh,
			OrthographicCamera: _i,
			PCFShadowMap: rl,
			PCFSoftShadowMap: Rh,
			PMREMGenerator: $a,
			ParametricGeometry: iv,
			Particle: Ly,
			ParticleBasicMaterial: Iy,
			ParticleSystem: Py,
			ParticleSystemMaterial: Fy,
			Path: kr,
			PerspectiveCamera: pt,
			Plane: kt,
			PlaneBufferGeometry: Qt,
			PlaneGeometry: Qt,
			PlaneHelper: xy,
			PointCloud: Ry,
			PointCloudMaterial: Dy,
			PointLight: Ol,
			PointLightHelper: hy,
			Points: ns,
			PointsMaterial: Mi,
			PolarGridHelper: fy,
			PolyhedronBufferGeometry: en,
			PolyhedronGeometry: en,
			PositionalAudio: j0,
			PropertyBinding: He,
			PropertyMixer: Md,
			QuadraticBezierCurve: Bo,
			QuadraticBezierCurve3: zo,
			Quaternion: gt,
			QuaternionKeyframeTrack: mr,
			QuaternionLinearInterpolant: ad,
			REVISION: po,
			RGBADepthPacking: bu,
			RGBAFormat: ct,
			RGBAIntegerFormat: pu,
			RGBA_ASTC_10x10_Format: qa,
			RGBA_ASTC_10x5_Format: ka,
			RGBA_ASTC_10x6_Format: Va,
			RGBA_ASTC_10x8_Format: Wa,
			RGBA_ASTC_12x10_Format: Xa,
			RGBA_ASTC_12x12_Format: Ya,
			RGBA_ASTC_4x4_Format: Fa,
			RGBA_ASTC_5x4_Format: Ba,
			RGBA_ASTC_5x5_Format: za,
			RGBA_ASTC_6x5_Format: Na,
			RGBA_ASTC_6x6_Format: Oa,
			RGBA_ASTC_8x5_Format: Ua,
			RGBA_ASTC_8x6_Format: Ha,
			RGBA_ASTC_8x8_Format: Ga,
			RGBA_BPTC_Format: Za,
			RGBA_ETC2_EAC_Format: Ia,
			RGBA_PVRTC_2BPPV1_Format: Pa,
			RGBA_PVRTC_4BPPV1_Format: La,
			RGBA_S3TC_DXT1_Format: Qs,
			RGBA_S3TC_DXT3_Format: eo,
			RGBA_S3TC_DXT5_Format: to,
			RGBFormat: au,
			RGB_ETC1_Format: mu,
			RGB_ETC2_Format: Da,
			RGB_PVRTC_2BPPV1_Format: Ra,
			RGB_PVRTC_4BPPV1_Format: Ca,
			RGB_S3TC_DXT1_Format: Ks,
			RGFormat: du,
			RGIntegerFormat: fu,
			RawShaderMaterial: fr,
			Ray: Un,
			Raycaster: ay,
			RectAreaLight: Gl,
			RedFormat: hu,
			RedIntegerFormat: uu,
			ReinhardToneMapping: Kh,
			RepeatWrapping: Br,
			ReplaceStencilOp: jd,
			ReverseSubtractEquation: Dh,
			RingBufferGeometry: sr,
			RingGeometry: sr,
			Scene: Ao,
			SceneUtils: tv,
			ShaderChunk: Ie,
			ShaderLib: Vt,
			ShaderMaterial: ht,
			ShadowMaterial: Sl,
			Shape: $t,
			ShapeBufferGeometry: di,
			ShapeGeometry: di,
			ShapePath: vy,
			ShapeUtils: Kt,
			ShortType: nu,
			Skeleton: Do,
			SkeletonHelper: Cd,
			SkinnedMesh: Lo,
			SmoothShading: kd,
			Sphere: On,
			SphereBufferGeometry: fi,
			SphereGeometry: fi,
			Spherical: il,
			SphericalHarmonics3: kl,
			SplineCurve: No,
			SpotLight: Nl,
			SpotLightHelper: cy,
			Sprite: Ro,
			SpriteMaterial: Co,
			SrcAlphaFactor: ol,
			SrcAlphaSaturateFactor: Gh,
			SrcColorFactor: Bh,
			StaticCopyUsage: pf,
			StaticDrawUsage: Ki,
			StaticReadUsage: uf,
			StereoCamera: X0,
			StreamCopyUsage: gf,
			StreamDrawUsage: hf,
			StreamReadUsage: ff,
			StringKeyframeTrack: Si,
			SubtractEquation: Ph,
			SubtractiveBlending: Sa,
			TOUCH: $n,
			TangentSpaceNormalMap: yi,
			TetrahedronBufferGeometry: or,
			TetrahedronGeometry: or,
			TextGeometry: rv,
			Texture: dt,
			TextureLoader: ud,
			TorusBufferGeometry: ar,
			TorusGeometry: ar,
			TorusKnotBufferGeometry: lr,
			TorusKnotGeometry: lr,
			Triangle: st,
			TriangleFanDrawMode: Zd,
			TriangleStripDrawMode: Yd,
			TrianglesDrawMode: vu,
			TubeBufferGeometry: cr,
			TubeGeometry: cr,
			UVMapping: mo,
			Uint16Attribute: Gy,
			Uint16BufferAttribute: vo,
			Uint32Attribute: Vy,
			Uint32BufferAttribute: _o,
			Uint8Attribute: Oy,
			Uint8BufferAttribute: Lu,
			Uint8ClampedAttribute: Uy,
			Uint8ClampedBufferAttribute: Pu,
			Uniform: Ho,
			UniformsLib: se,
			UniformsUtils: ci,
			UnsignedByteType: mn,
			UnsignedInt248Type: ri,
			UnsignedIntType: Rr,
			UnsignedShort4444Type: ru,
			UnsignedShort5551Type: su,
			UnsignedShortType: $i,
			VSMShadowMap: qi,
			Vector2: G,
			Vector3: w,
			Vector4: We,
			VectorKeyframeTrack: Yr,
			Vertex: By,
			VertexColors: Ey,
			VideoTexture: $u,
			WebGL1Renderer: Zu,
			WebGLCubeRenderTarget: Mo,
			WebGLMultipleRenderTargets: Cu,
			WebGLMultisampleRenderTarget: xo,
			WebGLRenderTarget: ut,
			WebGLRenderTargetCube: Ky,
			WebGLRenderer: Ze,
			WebGLUtils: Yu,
			WireframeGeometry: wl,
			WireframeHelper: Jy,
			WrapAroundEnding: Ur,
			XHRLoader: jy,
			ZeroCurvatureEnding: ei,
			ZeroFactor: Ih,
			ZeroSlopeEnding: ti,
			ZeroStencilOp: Jd,
			_SRGBAFormat: lo,
			sRGBEncoding: $e
		},
		Symbol.toStringTag,
		{ value: "Module" }
	)
);
const _h = { type: "change" },
	Ma = { type: "start" },
	bh = { type: "end" };
class cv extends bn {
	constructor(e, t) {
		super(),
			t === void 0 &&
				console.warn(
					'THREE.OrbitControls: The second parameter "domElement" is now mandatory.'
				),
			t === document &&
				console.error(
					'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
				),
			(this.object = e),
			(this.domElement = t),
			(this.domElement.style.touchAction = "none"),
			(this.enabled = !0),
			(this.target = new w()),
			(this.minDistance = 0),
			(this.maxDistance = 1 / 0),
			(this.minZoom = 0),
			(this.maxZoom = 1 / 0),
			(this.minPolarAngle = 0),
			(this.maxPolarAngle = Math.PI),
			(this.minAzimuthAngle = -1 / 0),
			(this.maxAzimuthAngle = 1 / 0),
			(this.enableDamping = !1),
			(this.dampingFactor = 0.05),
			(this.enableZoom = !0),
			(this.zoomSpeed = 1),
			(this.enableRotate = !0),
			(this.rotateSpeed = 1),
			(this.enablePan = !0),
			(this.panSpeed = 1),
			(this.screenSpacePanning = !0),
			(this.keyPanSpeed = 7),
			(this.autoRotate = !1),
			(this.autoRotateSpeed = 2),
			(this.keys = {
				LEFT: "ArrowLeft",
				UP: "ArrowUp",
				RIGHT: "ArrowRight",
				BOTTOM: "ArrowDown"
			}),
			(this.mouseButtons = { LEFT: jn.ROTATE, MIDDLE: jn.DOLLY, RIGHT: jn.PAN }),
			(this.touches = { ONE: $n.ROTATE, TWO: $n.DOLLY_PAN }),
			(this.target0 = this.target.clone()),
			(this.position0 = this.object.position.clone()),
			(this.zoom0 = this.object.zoom),
			(this._domElementKeyEvents = null),
			(this.getPolarAngle = function () {
				return a.phi;
			}),
			(this.getAzimuthalAngle = function () {
				return a.theta;
			}),
			(this.getDistance = function () {
				return this.object.position.distanceTo(this.target);
			}),
			(this.listenToKeyEvents = function (R) {
				R.addEventListener("keydown", ke), (this._domElementKeyEvents = R);
			}),
			(this.saveState = function () {
				n.target0.copy(n.target),
					n.position0.copy(n.object.position),
					(n.zoom0 = n.object.zoom);
			}),
			(this.reset = function () {
				n.target.copy(n.target0),
					n.object.position.copy(n.position0),
					(n.object.zoom = n.zoom0),
					n.object.updateProjectionMatrix(),
					n.dispatchEvent(_h),
					n.update(),
					(r = i.NONE);
			}),
			(this.update = (function () {
				const R = new w(),
					W = new gt().setFromUnitVectors(e.up, new w(0, 1, 0)),
					ee = W.clone().invert(),
					me = new w(),
					P = new gt(),
					de = 2 * Math.PI;
				return function () {
					const Se = n.object.position;
					R.copy(Se).sub(n.target),
						R.applyQuaternion(W),
						a.setFromVector3(R),
						n.autoRotate && r === i.NONE && H(A()),
						n.enableDamping
							? ((a.theta += l.theta * n.dampingFactor),
							  (a.phi += l.phi * n.dampingFactor))
							: ((a.theta += l.theta), (a.phi += l.phi));
					let q = n.minAzimuthAngle,
						ye = n.maxAzimuthAngle;
					return (
						isFinite(q) &&
							isFinite(ye) &&
							(q < -Math.PI ? (q += de) : q > Math.PI && (q -= de),
							ye < -Math.PI ? (ye += de) : ye > Math.PI && (ye -= de),
							q <= ye
								? (a.theta = Math.max(q, Math.min(ye, a.theta)))
								: (a.theta =
										a.theta > (q + ye) / 2
											? Math.max(q, a.theta)
											: Math.min(ye, a.theta))),
						(a.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, a.phi))),
						a.makeSafe(),
						(a.radius *= c),
						(a.radius = Math.max(n.minDistance, Math.min(n.maxDistance, a.radius))),
						n.enableDamping === !0
							? n.target.addScaledVector(h, n.dampingFactor)
							: n.target.add(h),
						R.setFromSpherical(a),
						R.applyQuaternion(ee),
						Se.copy(n.target).add(R),
						n.object.lookAt(n.target),
						n.enableDamping === !0
							? ((l.theta *= 1 - n.dampingFactor),
							  (l.phi *= 1 - n.dampingFactor),
							  h.multiplyScalar(1 - n.dampingFactor))
							: (l.set(0, 0, 0), h.set(0, 0, 0)),
						(c = 1),
						u ||
						me.distanceToSquared(n.object.position) > o ||
						8 * (1 - P.dot(n.object.quaternion)) > o
							? (n.dispatchEvent(_h),
							  me.copy(n.object.position),
							  P.copy(n.object.quaternion),
							  (u = !1),
							  !0)
							: !1
					);
				};
			})()),
			(this.dispose = function () {
				n.domElement.removeEventListener("contextmenu", J),
					n.domElement.removeEventListener("pointerdown", te),
					n.domElement.removeEventListener("pointercancel", we),
					n.domElement.removeEventListener("wheel", qe),
					n.domElement.removeEventListener("pointermove", he),
					n.domElement.removeEventListener("pointerup", oe),
					n._domElementKeyEvents !== null &&
						n._domElementKeyEvents.removeEventListener("keydown", ke);
			});
		const n = this,
			i = {
				NONE: -1,
				ROTATE: 0,
				DOLLY: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_PAN: 4,
				TOUCH_DOLLY_PAN: 5,
				TOUCH_DOLLY_ROTATE: 6
			};
		let r = i.NONE;
		const o = 1e-6,
			a = new il(),
			l = new il();
		let c = 1;
		const h = new w();
		let u = !1;
		const d = new G(),
			f = new G(),
			m = new G(),
			x = new G(),
			y = new G(),
			g = new G(),
			p = new G(),
			M = new G(),
			v = new G(),
			_ = [],
			E = {};
		function A() {
			return ((2 * Math.PI) / 60 / 60) * n.autoRotateSpeed;
		}
		function D() {
			return Math.pow(0.95, n.zoomSpeed);
		}
		function H(R) {
			l.theta -= R;
		}
		function I(R) {
			l.phi -= R;
		}
		const b = (function () {
				const R = new w();
				return function (ee, me) {
					R.setFromMatrixColumn(me, 0), R.multiplyScalar(-ee), h.add(R);
				};
			})(),
			L = (function () {
				const R = new w();
				return function (ee, me) {
					n.screenSpacePanning === !0
						? R.setFromMatrixColumn(me, 1)
						: (R.setFromMatrixColumn(me, 0), R.crossVectors(n.object.up, R)),
						R.multiplyScalar(ee),
						h.add(R);
				};
			})(),
			F = (function () {
				const R = new w();
				return function (ee, me) {
					const P = n.domElement;
					if (n.object.isPerspectiveCamera) {
						const de = n.object.position;
						R.copy(de).sub(n.target);
						let ce = R.length();
						(ce *= Math.tan(((n.object.fov / 2) * Math.PI) / 180)),
							b((2 * ee * ce) / P.clientHeight, n.object.matrix),
							L((2 * me * ce) / P.clientHeight, n.object.matrix);
					} else
						n.object.isOrthographicCamera
							? (b(
									(ee * (n.object.right - n.object.left)) /
										n.object.zoom /
										P.clientWidth,
									n.object.matrix
							  ),
							  L(
									(me * (n.object.top - n.object.bottom)) /
										n.object.zoom /
										P.clientHeight,
									n.object.matrix
							  ))
							: (console.warn(
									"WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
							  ),
							  (n.enablePan = !1));
				};
			})();
		function B(R) {
			n.object.isPerspectiveCamera
				? (c /= R)
				: n.object.isOrthographicCamera
				? ((n.object.zoom = Math.max(
						n.minZoom,
						Math.min(n.maxZoom, n.object.zoom * R)
				  )),
				  n.object.updateProjectionMatrix(),
				  (u = !0))
				: (console.warn(
						"WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
				  ),
				  (n.enableZoom = !1));
		}
		function O(R) {
			n.object.isPerspectiveCamera
				? (c *= R)
				: n.object.isOrthographicCamera
				? ((n.object.zoom = Math.max(
						n.minZoom,
						Math.min(n.maxZoom, n.object.zoom / R)
				  )),
				  n.object.updateProjectionMatrix(),
				  (u = !0))
				: (console.warn(
						"WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
				  ),
				  (n.enableZoom = !1));
		}
		function N(R) {
			d.set(R.clientX, R.clientY);
		}
		function X(R) {
			p.set(R.clientX, R.clientY);
		}
		function Q(R) {
			x.set(R.clientX, R.clientY);
		}
		function ae(R) {
			f.set(R.clientX, R.clientY),
				m.subVectors(f, d).multiplyScalar(n.rotateSpeed);
			const W = n.domElement;
			H((2 * Math.PI * m.x) / W.clientHeight),
				I((2 * Math.PI * m.y) / W.clientHeight),
				d.copy(f),
				n.update();
		}
		function Z(R) {
			M.set(R.clientX, R.clientY),
				v.subVectors(M, p),
				v.y > 0 ? B(D()) : v.y < 0 && O(D()),
				p.copy(M),
				n.update();
		}
		function K(R) {
			y.set(R.clientX, R.clientY),
				g.subVectors(y, x).multiplyScalar(n.panSpeed),
				F(g.x, g.y),
				x.copy(y),
				n.update();
		}
		function le(R) {
			R.deltaY < 0 ? O(D()) : R.deltaY > 0 && B(D()), n.update();
		}
		function ge(R) {
			let W = !1;
			switch (R.code) {
				case n.keys.UP:
					F(0, n.keyPanSpeed), (W = !0);
					break;
				case n.keys.BOTTOM:
					F(0, -n.keyPanSpeed), (W = !0);
					break;
				case n.keys.LEFT:
					F(n.keyPanSpeed, 0), (W = !0);
					break;
				case n.keys.RIGHT:
					F(-n.keyPanSpeed, 0), (W = !0);
					break;
			}
			W && (R.preventDefault(), n.update());
		}
		function _e() {
			if (_.length === 1) d.set(_[0].pageX, _[0].pageY);
			else {
				const R = 0.5 * (_[0].pageX + _[1].pageX),
					W = 0.5 * (_[0].pageY + _[1].pageY);
				d.set(R, W);
			}
		}
		function V() {
			if (_.length === 1) x.set(_[0].pageX, _[0].pageY);
			else {
				const R = 0.5 * (_[0].pageX + _[1].pageX),
					W = 0.5 * (_[0].pageY + _[1].pageY);
				x.set(R, W);
			}
		}
		function Ne() {
			const R = _[0].pageX - _[1].pageX,
				W = _[0].pageY - _[1].pageY,
				ee = Math.sqrt(R * R + W * W);
			p.set(0, ee);
		}
		function ve() {
			n.enableZoom && Ne(), n.enablePan && V();
		}
		function Ee() {
			n.enableZoom && Ne(), n.enableRotate && _e();
		}
		function ue(R) {
			if (_.length == 1) f.set(R.pageX, R.pageY);
			else {
				const ee = be(R),
					me = 0.5 * (R.pageX + ee.x),
					P = 0.5 * (R.pageY + ee.y);
				f.set(me, P);
			}
			m.subVectors(f, d).multiplyScalar(n.rotateSpeed);
			const W = n.domElement;
			H((2 * Math.PI * m.x) / W.clientHeight),
				I((2 * Math.PI * m.y) / W.clientHeight),
				d.copy(f);
		}
		function Le(R) {
			if (_.length === 1) y.set(R.pageX, R.pageY);
			else {
				const W = be(R),
					ee = 0.5 * (R.pageX + W.x),
					me = 0.5 * (R.pageY + W.y);
				y.set(ee, me);
			}
			g.subVectors(y, x).multiplyScalar(n.panSpeed), F(g.x, g.y), x.copy(y);
		}
		function Te(R) {
			const W = be(R),
				ee = R.pageX - W.x,
				me = R.pageY - W.y,
				P = Math.sqrt(ee * ee + me * me);
			M.set(0, P), v.set(0, Math.pow(M.y / p.y, n.zoomSpeed)), B(v.y), p.copy(M);
		}
		function j(R) {
			n.enableZoom && Te(R), n.enablePan && Le(R);
		}
		function ie(R) {
			n.enableZoom && Te(R), n.enableRotate && ue(R);
		}
		function te(R) {
			n.enabled !== !1 &&
				(_.length === 0 &&
					(n.domElement.setPointerCapture(R.pointerId),
					n.domElement.addEventListener("pointermove", he),
					n.domElement.addEventListener("pointerup", oe)),
				ne(R),
				R.pointerType === "touch" ? C(R) : Ae(R));
		}
		function he(R) {
			n.enabled !== !1 && (R.pointerType === "touch" ? S(R) : Be(R));
		}
		function oe(R) {
			xe(R),
				_.length === 0 &&
					(n.domElement.releasePointerCapture(R.pointerId),
					n.domElement.removeEventListener("pointermove", he),
					n.domElement.removeEventListener("pointerup", oe)),
				n.dispatchEvent(bh),
				(r = i.NONE);
		}
		function we(R) {
			xe(R);
		}
		function Ae(R) {
			let W;
			switch (R.button) {
				case 0:
					W = n.mouseButtons.LEFT;
					break;
				case 1:
					W = n.mouseButtons.MIDDLE;
					break;
				case 2:
					W = n.mouseButtons.RIGHT;
					break;
				default:
					W = -1;
			}
			switch (W) {
				case jn.DOLLY:
					if (n.enableZoom === !1) return;
					X(R), (r = i.DOLLY);
					break;
				case jn.ROTATE:
					if (R.ctrlKey || R.metaKey || R.shiftKey) {
						if (n.enablePan === !1) return;
						Q(R), (r = i.PAN);
					} else {
						if (n.enableRotate === !1) return;
						N(R), (r = i.ROTATE);
					}
					break;
				case jn.PAN:
					if (R.ctrlKey || R.metaKey || R.shiftKey) {
						if (n.enableRotate === !1) return;
						N(R), (r = i.ROTATE);
					} else {
						if (n.enablePan === !1) return;
						Q(R), (r = i.PAN);
					}
					break;
				default:
					r = i.NONE;
			}
			r !== i.NONE && n.dispatchEvent(Ma);
		}
		function Be(R) {
			if (n.enabled !== !1)
				switch (r) {
					case i.ROTATE:
						if (n.enableRotate === !1) return;
						ae(R);
						break;
					case i.DOLLY:
						if (n.enableZoom === !1) return;
						Z(R);
						break;
					case i.PAN:
						if (n.enablePan === !1) return;
						K(R);
						break;
				}
		}
		function qe(R) {
			n.enabled === !1 ||
				n.enableZoom === !1 ||
				r !== i.NONE ||
				(R.preventDefault(), n.dispatchEvent(Ma), le(R), n.dispatchEvent(bh));
		}
		function ke(R) {
			n.enabled === !1 || n.enablePan === !1 || ge(R);
		}
		function C(R) {
			switch ((Y(R), _.length)) {
				case 1:
					switch (n.touches.ONE) {
						case $n.ROTATE:
							if (n.enableRotate === !1) return;
							_e(), (r = i.TOUCH_ROTATE);
							break;
						case $n.PAN:
							if (n.enablePan === !1) return;
							V(), (r = i.TOUCH_PAN);
							break;
						default:
							r = i.NONE;
					}
					break;
				case 2:
					switch (n.touches.TWO) {
						case $n.DOLLY_PAN:
							if (n.enableZoom === !1 && n.enablePan === !1) return;
							ve(), (r = i.TOUCH_DOLLY_PAN);
							break;
						case $n.DOLLY_ROTATE:
							if (n.enableZoom === !1 && n.enableRotate === !1) return;
							Ee(), (r = i.TOUCH_DOLLY_ROTATE);
							break;
						default:
							r = i.NONE;
					}
					break;
				default:
					r = i.NONE;
			}
			r !== i.NONE && n.dispatchEvent(Ma);
		}
		function S(R) {
			switch ((Y(R), r)) {
				case i.TOUCH_ROTATE:
					if (n.enableRotate === !1) return;
					ue(R), n.update();
					break;
				case i.TOUCH_PAN:
					if (n.enablePan === !1) return;
					Le(R), n.update();
					break;
				case i.TOUCH_DOLLY_PAN:
					if (n.enableZoom === !1 && n.enablePan === !1) return;
					j(R), n.update();
					break;
				case i.TOUCH_DOLLY_ROTATE:
					if (n.enableZoom === !1 && n.enableRotate === !1) return;
					ie(R), n.update();
					break;
				default:
					r = i.NONE;
			}
		}
		function J(R) {
			n.enabled !== !1 && R.preventDefault();
		}
		function ne(R) {
			_.push(R);
		}
		function xe(R) {
			delete E[R.pointerId];
			for (let W = 0; W < _.length; W++)
				if (_[W].pointerId == R.pointerId) {
					_.splice(W, 1);
					return;
				}
		}
		function Y(R) {
			let W = E[R.pointerId];
			W === void 0 && ((W = new G()), (E[R.pointerId] = W)),
				W.set(R.pageX, R.pageY);
		}
		function be(R) {
			const W = R.pointerId === _[0].pointerId ? _[1] : _[0];
			return E[W.pointerId];
		}
		n.domElement.addEventListener("contextmenu", J),
			n.domElement.addEventListener("pointerdown", te),
			n.domElement.addEventListener("pointercancel", we),
			n.domElement.addEventListener("wheel", qe, { passive: !1 }),
			this.update();
	}
}
class hv {
	constructor(e) {
		(this.app = e), (this.tasks = []);
	}
	add(e) {
		this.tasks.push(e);
	}
	animate() {
		requestAnimationFrame(this.animate.bind(this)),
			this.tasks.forEach((e) => e()),
			this.app.render();
	}
}
class uv {
	constructor(e, t) {
		(this.app = e),
			(this.THREE = e.THREE),
			(this.settings = {
				load: () => {
					this.app.init();
				},
				progress: (n, i, r) => {},
				gltfExtensions: [".gltf", ".glb"],
				objExtensions: [".obj"],
				textureExtensions: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tga"],
				...t
			}),
			(this.manager = new this.THREE.LoadingManager(
				() => this.settings.load(),
				(n, i, r) => this.settings.progress(n, i, r)
			)),
			this.setUpLoaders();
	}
	setUpLoaders() {
		(this.TextureLoader = !1),
			(this.GLTFLoader = !1),
			(this.OBJLoader = !1),
			this.app.settings.GLTFLoader &&
				(this.GLTFLoader = new this.app.settings.GLTFLoader(this.manager)),
			this.app.settings.OBJLoader &&
				(this.OBJLoader = new this.app.settings.OBJLoader(this.manager)),
			(this.TextureLoader = new this.THREE.TextureLoader(this.manager));
	}
	load() {
		for (const e in this.app.settings.preload) {
			let t = this.app.settings.preload[e];
			this.endsWith(t, this.settings.gltfExtensions) &&
				(this.GLTFLoader
					? this.GLTFLoader.load(t, (n) => {
							this.app.models[e] = n.scene;
					  })
					: console.warn(
							`ThreeasyLoader: GLTFLoader is not defined trying to load: ${t}`
					  )),
				this.endsWith(t, this.settings.objExtensions) &&
					(this.OBJLoader
						? this.OBJLoader.load(t, (n) => {
								this.app.models[e] = n;
						  })
						: console.warn(
								`ThreeasyLoader: OBJLoader is not defined trying to load: ${t}`
						  )),
				this.endsWith(t, this.settings.textureExtensions) &&
					this.TextureLoader.load(t, (n) => {
						(this.app.textures[e] = n), this.setUpTexture(this.app[e]);
					});
		}
	}
	endsWith(e, t) {
		return t.some((n) => e.endsWith(n));
	}
	setUpTexture(e) {
		(e.encoding = this.THREE.sRGBEncoding),
			(e.wrapT = this.THREE.RepeatWrapping),
			(e.wrapS = this.THREE.RepeatWrapping);
	}
}
class dv {
	constructor(e) {
		(this.app = e), (this.tasks = []);
	}
	add(e) {
		this.tasks.push(e);
	}
	load() {
		this.tasks.forEach((e) => e());
	}
}
class fv {
	constructor(e, t) {
		(this.settings = { light: !0, ...t }),
			(this.THREE = e),
			this.setSize(),
			(this.animator = new hv(this)),
			(this.scene = new e.Scene()),
			(this.camera = new e.PerspectiveCamera(
				75,
				this.sizes.w / this.sizes.h,
				1,
				200
			)),
			(this.camera.position.x = 0),
			(this.camera.position.y = 0),
			(this.camera.position.z = 2),
			this.scene.add(this.camera),
			(this.renderer = new e.WebGLRenderer({ antialias: !0 })),
			this.renderer.setSize(this.sizes.w, this.sizes.h),
			this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)),
			(this.renderer.shadowMap.enabled = !0),
			(this.renderer.shadowMap.type = e.PCFSoftShadowMap),
			(this.renderer.physicallyCorrectLights = !0),
			(this.renderer.outputEncoding = e.sRGBEncoding),
			(this.renderer.toneMapping = e.ACESFilmicToneMapping),
			(this.models = {}),
			(this.textures = {}),
			(this.loader = new uv(this)),
			(this.postLoader = new dv(this)),
			this.settings.light &&
				((this.light = new e.AmbientLight(16777215, 1)),
				this.scene.add(this.light)),
			(this.clock = new e.Clock()),
			this.clock.start(),
			document.body.appendChild(this.renderer.domElement),
			window.addEventListener("resize", this.onWindowResize.bind(this), !1),
			this.preload();
	}
	setSize() {
		this.sizes = { w: window.innerWidth, h: window.innerHeight };
	}
	preload() {
		this.settings.preload ? this.loader.load() : this.init();
	}
	postload(e) {
		this.postLoader.add(e);
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	animate(e) {
		this.animator.add(e);
	}
	init() {
		this.postLoader.load(), this.animator.animate();
	}
	resize() {
		this.setSize(),
			(this.camera.aspect = this.sizes.w / this.sizes.h),
			this.camera.updateProjectionMatrix(),
			this.renderer.setSize(this.sizes.w, this.sizes.h),
			this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
	}
	onWindowResize() {
		this.resize();
	}
}
class Hn {
	constructor(e) {
		(this.app = e), this.app.animate(this.animate.bind(this));
	}
	animate() {
		return !1;
	}
}
const pv = `
uniform float amount;
uniform sampler2D tDiffuse;
uniform float time;
varying vec2 vUv;
void main() {

  // rough calculations https://graphtoy.com/?f1(x,t)=frac(x)-.3&v1=false&f2(x,t)=max(f1(x),0)*(1/.7)&v2=false&f3(x,t)=pow(f2(x),3)&v3=false&f4(x,t)=1-ceil(f3(x))%20+%20f3(x)&v4=true&f5(x,t)=step(.5,frac(((pow(1.-f4(x),3))%20+%20t%20*%20.1)*9.))%20*(1/.7)&v5=true&f6(x,t)=step(f3(x),f5(x,t))&v6=false&grid=1&coords=0.6648562003946966,1.4089098911471427,1.0068654346588937
  
  float safe = .3;
  float danger = 1.0 - safe;
  float count = 9.;
  float speed = .1;
  float power = 3.;

  float x = 1. - vUv.x;
  float t = fract(time) ;

  float xShift = fract(x) - safe;
  float normalised = max(xShift,0.) * (1./danger);
  float powerCurve = pow(normalised,power);

  float stripesGradient = fract(((pow(1.-x,power)) + time * speed)*count);
  float stripes = step(.5,stripesGradient);

  float result = step(powerCurve,stripes);
  
  vec3 color = vec3(result);
  gl_FragColor = vec4( color, 1);
}
`,
	mv = `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`;
class gv extends Hn {
	constructor(e) {
		super(e),
			(this.mat = new ht({
				uniforms: { time: { value: 0 } },
				vertexShader: mv,
				fragmentShader: pv
			})),
			(this.geo = new vn(1, 1, 0.1, 3, 1)),
			(this.mesh = new je(this.geo, this.mat)),
			(this.mesh.rotation.x = -Math.PI * 0.5),
			this.app.scene.add(this.mesh);
	}
	animate() {
		this.mat.uniforms.time.value = this.app.clock.getElapsedTime();
	}
}
const xv = `
uniform float amount;
uniform sampler2D tDiffuse;
uniform float time;
uniform float color;
varying vec2 vUv;
void main() {
  
  gl_FragColor = vec4( vec3(color), 1);
}
`,
	yv = `
	varying vec2 vUv;
	uniform float time;

	//	Classic Perlin 3D Noise 
	//	by Stefan Gustavson
	//
	vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
	vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
	vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

	float cnoise(vec3 P){
		vec3 Pi0 = floor(P); // Integer part for indexing
		vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
		Pi0 = mod(Pi0, 289.0);
		Pi1 = mod(Pi1, 289.0);
		vec3 Pf0 = fract(P); // Fractional part for interpolation
		vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
		vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
		vec4 iy = vec4(Pi0.yy, Pi1.yy);
		vec4 iz0 = Pi0.zzzz;
		vec4 iz1 = Pi1.zzzz;

		vec4 ixy = permute(permute(ix) + iy);
		vec4 ixy0 = permute(ixy + iz0);
		vec4 ixy1 = permute(ixy + iz1);

		vec4 gx0 = ixy0 / 7.0;
		vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
		gx0 = fract(gx0);
		vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
		vec4 sz0 = step(gz0, vec4(0.0));
		gx0 -= sz0 * (step(0.0, gx0) - 0.5);
		gy0 -= sz0 * (step(0.0, gy0) - 0.5);

		vec4 gx1 = ixy1 / 7.0;
		vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
		gx1 = fract(gx1);
		vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
		vec4 sz1 = step(gz1, vec4(0.0));
		gx1 -= sz1 * (step(0.0, gx1) - 0.5);
		gy1 -= sz1 * (step(0.0, gy1) - 0.5);

		vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
		vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
		vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
		vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
		vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
		vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
		vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
		vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

		vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
		g000 *= norm0.x;
		g010 *= norm0.y;
		g100 *= norm0.z;
		g110 *= norm0.w;
		vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
		g001 *= norm1.x;
		g011 *= norm1.y;
		g101 *= norm1.z;
		g111 *= norm1.w;

		float n000 = dot(g000, Pf0);
		float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
		float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
		float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
		float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
		float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
		float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
		float n111 = dot(g111, Pf1);

		vec3 fade_xyz = fade(Pf0);
		vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
		vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
		float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
		return 2.2 * n_xyz;
	}

	void main() {
		vUv = uv;

		float PI = 3.14159265;

		vec3 pos = position;
		vec3 noisePos = position * 1.5;
		noisePos.x = noisePos.x + time*.3;
		float noise = cnoise(noisePos) + .5;
		float curve = 1. - pow(abs(pos.y),2.);

		curve = 1. - ((sin((pos.y*PI*2.)-PI*.5)*.5)+.5);
		pos.z = (((curve) + (noise*curve)) * .35) -.75;


		gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
	}
`;
class Mh extends Hn {
	constructor(e, t = 1, n = 0, i = !0) {
		super(e);
		const r = 10,
			o = 1,
			a = 10;
		(this.mat = new ht({
			uniforms: { time: { value: 0 }, color: { value: t } },
			vertexShader: yv,
			fragmentShader: xv,
			wireframe: i,
			side: In
		})),
			(this.geo = new Qt(r, o, r * a, o * a)),
			(this.mesh = new je(this.geo, this.mat)),
			(this.mesh.rotation.x = -Math.PI * 0.5),
			(this.mesh.position.y = n),
			(this.mesh.position.z = 0.45),
			this.app.scene.add(this.mesh);
	}
	animate() {
		this.mat.uniforms.time.value = this.app.clock.getElapsedTime();
	}
}
class vv extends Hn {
	constructor(e, t = 1, n = 0, i = !0) {
		super(e), (this.wire = new Mh(e)), (this.solid = new Mh(e, 0, -0.001, !1));
	}
}
const _v = `
uniform float amount;
uniform sampler2D tDiffuse;
uniform float time;
varying vec2 vUv;
void main() {
  float safe = .3;
  float danger = 1.0 - safe;
  float count = 17.;
  float speed = .05;

  float t = fract(time*speed);
  float x = step(.9, pow(fract(vUv.x * count), 5.)) ;
  float y = step(.9, pow(fract(abs(vUv.y + t) * count), 5.));

  float result = x + y;
  
  vec3 color = vec3(result);
  gl_FragColor = vec4( color, color+.97);
}
`,
	bv = `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`;
class Mv extends Hn {
	constructor(e) {
		super(e),
			(this.mat = new ht({
				uniforms: { time: { value: 0 } },
				vertexShader: bv,
				fragmentShader: _v,
				transparent: !0
			})),
			(this.geo = new Qt(1, 1)),
			(this.mesh = new je(this.geo, this.mat)),
			(this.mesh.rotation.x = -Math.PI * 0.5),
			(this.mesh.position.y = -0.7),
			(this.mesh.position.z = 2.5),
			this.mesh.scale.set(5, 5),
			this.app.scene.add(this.mesh);
	}
	animate() {
		this.mat.uniforms.time.value = this.app.clock.getElapsedTime();
	}
}
class os extends je {
	constructor(e, t = {}) {
		super(e), (this.type = "Reflector");
		const n = this,
			i = t.color !== void 0 ? new re(t.color) : new re(8355711),
			r = t.textureWidth || 512,
			o = t.textureHeight || 512,
			a = t.clipBias || 0,
			l = t.shader || os.ReflectorShader,
			c = new kt(),
			h = new w(),
			u = new w(),
			d = new w(),
			f = new pe(),
			m = new w(0, 0, -1),
			x = new We(),
			y = new w(),
			g = new w(),
			p = new We(),
			M = new pe(),
			v = new pt(),
			_ = new ut(r, o),
			E = new ht({
				uniforms: ci.clone(l.uniforms),
				fragmentShader: l.fragmentShader,
				vertexShader: l.vertexShader
			});
		(E.uniforms.tDiffuse.value = _.texture),
			(E.uniforms.color.value = i),
			(E.uniforms.textureMatrix.value = M),
			(this.material = E),
			(this.onBeforeRender = function (A, D, H) {
				if (
					(u.setFromMatrixPosition(n.matrixWorld),
					d.setFromMatrixPosition(H.matrixWorld),
					f.extractRotation(n.matrixWorld),
					h.set(0, 0, 1),
					h.applyMatrix4(f),
					y.subVectors(u, d),
					y.dot(h) > 0)
				)
					return;
				y.reflect(h).negate(),
					y.add(u),
					f.extractRotation(H.matrixWorld),
					m.set(0, 0, -1),
					m.applyMatrix4(f),
					m.add(d),
					g.subVectors(u, m),
					g.reflect(h).negate(),
					g.add(u),
					v.position.copy(y),
					v.up.set(0, 1, 0),
					v.up.applyMatrix4(f),
					v.up.reflect(h),
					v.lookAt(g),
					(v.far = H.far),
					v.updateMatrixWorld(),
					v.projectionMatrix.copy(H.projectionMatrix),
					M.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
					M.multiply(v.projectionMatrix),
					M.multiply(v.matrixWorldInverse),
					M.multiply(n.matrixWorld),
					c.setFromNormalAndCoplanarPoint(h, u),
					c.applyMatrix4(v.matrixWorldInverse),
					x.set(c.normal.x, c.normal.y, c.normal.z, c.constant);
				const I = v.projectionMatrix;
				(p.x = (Math.sign(x.x) + I.elements[8]) / I.elements[0]),
					(p.y = (Math.sign(x.y) + I.elements[9]) / I.elements[5]),
					(p.z = -1),
					(p.w = (1 + I.elements[10]) / I.elements[14]),
					x.multiplyScalar(2 / x.dot(p)),
					(I.elements[2] = x.x),
					(I.elements[6] = x.y),
					(I.elements[10] = x.z + 1 - a),
					(I.elements[14] = x.w),
					(_.texture.encoding = A.outputEncoding),
					(n.visible = !1);
				const b = A.getRenderTarget(),
					L = A.xr.enabled,
					F = A.shadowMap.autoUpdate;
				(A.xr.enabled = !1),
					(A.shadowMap.autoUpdate = !1),
					A.setRenderTarget(_),
					A.state.buffers.depth.setMask(!0),
					A.autoClear === !1 && A.clear(),
					A.render(D, v),
					(A.xr.enabled = L),
					(A.shadowMap.autoUpdate = F),
					A.setRenderTarget(b);
				const B = H.viewport;
				B !== void 0 && A.state.viewport(B), (n.visible = !0);
			}),
			(this.getRenderTarget = function () {
				return _;
			}),
			(this.dispose = function () {
				_.dispose(), n.material.dispose();
			});
	}
}
os.prototype.isReflector = !0;
os.ReflectorShader = {
	uniforms: {
		color: { value: null },
		tDiffuse: { value: null },
		textureMatrix: { value: null }
	},
	vertexShader: `
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,
	fragmentShader: `
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

		}`
};
class wv extends Hn {
	constructor(e) {
		super(e),
			(this.geo = new Qt(1, 1)),
			(this.mirror = new os(this.geo, {
				clipBias: 0.003,
				textureWidth: window.innerWidth * window.devicePixelRatio,
				textureHeight: window.innerHeight * window.devicePixelRatio,
				color: 16777215
			})),
			(this.mirror.rotation.x = -Math.PI * 0.5),
			(this.mirror.position.y = -0.72),
			(this.mirror.position.z = 2.5),
			this.mirror.scale.set(5, 5),
			this.app.scene.add(this.mirror);
	}
}
class Sv extends Hn {
	constructor(e) {
		super(e), new Mv(e), new wv(e);
	}
}
const _t = new st(),
	$s = new w();
class Tv {
	constructor(e) {
		let t = e.geometry;
		if (!t.isBufferGeometry || t.attributes.position.itemSize !== 3)
			throw new Error(
				"THREE.MeshSurfaceSampler: Requires BufferGeometry triangle mesh."
			);
		t.index &&
			(console.warn(
				"THREE.MeshSurfaceSampler: Converting geometry to non-indexed BufferGeometry."
			),
			(t = t.toNonIndexed())),
			(this.geometry = t),
			(this.randomFunction = Math.random),
			(this.positionAttribute = this.geometry.getAttribute("position")),
			(this.colorAttribute = this.geometry.getAttribute("color")),
			(this.weightAttribute = null),
			(this.distribution = null);
	}
	setWeightAttribute(e) {
		return (
			(this.weightAttribute = e ? this.geometry.getAttribute(e) : null), this
		);
	}
	build() {
		const e = this.positionAttribute,
			t = this.weightAttribute,
			n = new Float32Array(e.count / 3);
		for (let r = 0; r < e.count; r += 3) {
			let o = 1;
			t && (o = t.getX(r) + t.getX(r + 1) + t.getX(r + 2)),
				_t.a.fromBufferAttribute(e, r),
				_t.b.fromBufferAttribute(e, r + 1),
				_t.c.fromBufferAttribute(e, r + 2),
				(o *= _t.getArea()),
				(n[r / 3] = o);
		}
		this.distribution = new Float32Array(e.count / 3);
		let i = 0;
		for (let r = 0; r < n.length; r++) (i += n[r]), (this.distribution[r] = i);
		return this;
	}
	setRandomGenerator(e) {
		return (this.randomFunction = e), this;
	}
	sample(e, t, n) {
		const i = this.distribution[this.distribution.length - 1],
			r = this.binarySearch(this.randomFunction() * i);
		return this.sampleFace(r, e, t, n);
	}
	binarySearch(e) {
		const t = this.distribution;
		let n = 0,
			i = t.length - 1,
			r = -1;
		for (; n <= i; ) {
			const o = Math.ceil((n + i) / 2);
			if (o === 0 || (t[o - 1] <= e && t[o] > e)) {
				r = o;
				break;
			} else e < t[o] ? (i = o - 1) : (n = o + 1);
		}
		return r;
	}
	sampleFace(e, t, n, i) {
		let r = this.randomFunction(),
			o = this.randomFunction();
		return (
			r + o > 1 && ((r = 1 - r), (o = 1 - o)),
			_t.a.fromBufferAttribute(this.positionAttribute, e * 3),
			_t.b.fromBufferAttribute(this.positionAttribute, e * 3 + 1),
			_t.c.fromBufferAttribute(this.positionAttribute, e * 3 + 2),
			t
				.set(0, 0, 0)
				.addScaledVector(_t.a, r)
				.addScaledVector(_t.b, o)
				.addScaledVector(_t.c, 1 - (r + o)),
			n !== void 0 && _t.getNormal(n),
			i !== void 0 &&
				this.colorAttribute !== void 0 &&
				(_t.a.fromBufferAttribute(this.colorAttribute, e * 3),
				_t.b.fromBufferAttribute(this.colorAttribute, e * 3 + 1),
				_t.c.fromBufferAttribute(this.colorAttribute, e * 3 + 2),
				$s
					.set(0, 0, 0)
					.addScaledVector(_t.a, r)
					.addScaledVector(_t.b, o)
					.addScaledVector(_t.c, 1 - (r + o)),
				(i.r = $s.x),
				(i.g = $s.y),
				(i.b = $s.z)),
			this
		);
	}
}
class Ev extends Hn {
	constructor(e) {
		super(e),
			(this.mat = new Nt({ color: "white" })),
			(this.universeGeo = new zn(10, 0)),
			(this.starGeo = new zn(0.02, 0)),
			(this.mesh = new je(this.universeGeo, this.mat));
		const t = new Tv(this.mesh).build(),
			n = 300;
		(this.stars = new Io(this.starGeo, this.mat, n)),
			(this.dummy = new Fe()),
			(this.tempPos = new w());
		for (let i = 0; i < n; i++)
			t.sample(this.tempPos),
				this.dummy.position.copy(this.tempPos),
				this.dummy.updateMatrix(),
				this.stars.setMatrixAt(i, this.dummy.matrix);
		e.scene.add(this.stars);
	}
	animate() {
		this.stars.rotation.x += 0.001;
	}
}
var uo = {
	uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`
};
class xr {
	constructor() {
		(this.enabled = !0),
			(this.needsSwap = !0),
			(this.clear = !1),
			(this.renderToScreen = !1);
	}
	setSize() {}
	render() {
		console.error("THREE.Pass: .render() must be implemented in derived pass.");
	}
}
const Av = new _i(-1, 1, 1, -1, 0, 1),
	Jl = new Me();
Jl.setAttribute("position", new fe([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
Jl.setAttribute("uv", new fe([0, 2, 0, 0, 2, 0], 2));
class fo {
	constructor(e) {
		this._mesh = new je(Jl, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, Av);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
}
class wh extends xr {
	constructor(e, t) {
		super(),
			(this.textureID = t !== void 0 ? t : "tDiffuse"),
			e instanceof ht
				? ((this.uniforms = e.uniforms), (this.material = e))
				: e &&
				  ((this.uniforms = ci.clone(e.uniforms)),
				  (this.material = new ht({
						defines: Object.assign({}, e.defines),
						uniforms: this.uniforms,
						vertexShader: e.vertexShader,
						fragmentShader: e.fragmentShader
				  }))),
			(this.fsQuad = new fo(this.material));
	}
	render(e, t, n) {
		this.uniforms[this.textureID] &&
			(this.uniforms[this.textureID].value = n.texture),
			(this.fsQuad.material = this.material),
			this.renderToScreen
				? (e.setRenderTarget(null), this.fsQuad.render(e))
				: (e.setRenderTarget(t),
				  this.clear &&
						e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
				  this.fsQuad.render(e));
	}
}
class Sh extends xr {
	constructor(e, t) {
		super(),
			(this.scene = e),
			(this.camera = t),
			(this.clear = !0),
			(this.needsSwap = !1),
			(this.inverse = !1);
	}
	render(e, t, n) {
		const i = e.getContext(),
			r = e.state;
		r.buffers.color.setMask(!1),
			r.buffers.depth.setMask(!1),
			r.buffers.color.setLocked(!0),
			r.buffers.depth.setLocked(!0);
		let o, a;
		this.inverse ? ((o = 0), (a = 1)) : ((o = 1), (a = 0)),
			r.buffers.stencil.setTest(!0),
			r.buffers.stencil.setOp(i.REPLACE, i.REPLACE, i.REPLACE),
			r.buffers.stencil.setFunc(i.ALWAYS, o, 4294967295),
			r.buffers.stencil.setClear(a),
			r.buffers.stencil.setLocked(!0),
			e.setRenderTarget(n),
			this.clear && e.clear(),
			e.render(this.scene, this.camera),
			e.setRenderTarget(t),
			this.clear && e.clear(),
			e.render(this.scene, this.camera),
			r.buffers.color.setLocked(!1),
			r.buffers.depth.setLocked(!1),
			r.buffers.stencil.setLocked(!1),
			r.buffers.stencil.setFunc(i.EQUAL, 1, 4294967295),
			r.buffers.stencil.setOp(i.KEEP, i.KEEP, i.KEEP),
			r.buffers.stencil.setLocked(!0);
	}
}
class Cv extends xr {
	constructor() {
		super(), (this.needsSwap = !1);
	}
	render(e) {
		e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
	}
}
class Rv {
	constructor(e, t) {
		if (((this.renderer = e), t === void 0)) {
			const n = { minFilter: Ye, magFilter: Ye, format: ct },
				i = e.getSize(new G());
			(this._pixelRatio = e.getPixelRatio()),
				(this._width = i.width),
				(this._height = i.height),
				(t = new ut(
					this._width * this._pixelRatio,
					this._height * this._pixelRatio,
					n
				)),
				(t.texture.name = "EffectComposer.rt1");
		} else
			(this._pixelRatio = 1), (this._width = t.width), (this._height = t.height);
		(this.renderTarget1 = t),
			(this.renderTarget2 = t.clone()),
			(this.renderTarget2.texture.name = "EffectComposer.rt2"),
			(this.writeBuffer = this.renderTarget1),
			(this.readBuffer = this.renderTarget2),
			(this.renderToScreen = !0),
			(this.passes = []),
			uo === void 0 && console.error("THREE.EffectComposer relies on CopyShader"),
			wh === void 0 && console.error("THREE.EffectComposer relies on ShaderPass"),
			(this.copyPass = new wh(uo)),
			(this.clock = new ql());
	}
	swapBuffers() {
		const e = this.readBuffer;
		(this.readBuffer = this.writeBuffer), (this.writeBuffer = e);
	}
	addPass(e) {
		this.passes.push(e),
			e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	insertPass(e, t) {
		this.passes.splice(t, 0, e),
			e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	removePass(e) {
		const t = this.passes.indexOf(e);
		t !== -1 && this.passes.splice(t, 1);
	}
	isLastEnabledPass(e) {
		for (let t = e + 1; t < this.passes.length; t++)
			if (this.passes[t].enabled) return !1;
		return !0;
	}
	render(e) {
		e === void 0 && (e = this.clock.getDelta());
		const t = this.renderer.getRenderTarget();
		let n = !1;
		for (let i = 0, r = this.passes.length; i < r; i++) {
			const o = this.passes[i];
			if (o.enabled !== !1) {
				if (
					((o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i)),
					o.render(this.renderer, this.writeBuffer, this.readBuffer, e, n),
					o.needsSwap)
				) {
					if (n) {
						const a = this.renderer.getContext(),
							l = this.renderer.state.buffers.stencil;
						l.setFunc(a.NOTEQUAL, 1, 4294967295),
							this.copyPass.render(
								this.renderer,
								this.writeBuffer,
								this.readBuffer,
								e
							),
							l.setFunc(a.EQUAL, 1, 4294967295);
					}
					this.swapBuffers();
				}
				Sh !== void 0 && (o instanceof Sh ? (n = !0) : o instanceof Cv && (n = !1));
			}
		}
		this.renderer.setRenderTarget(t);
	}
	reset(e) {
		if (e === void 0) {
			const t = this.renderer.getSize(new G());
			(this._pixelRatio = this.renderer.getPixelRatio()),
				(this._width = t.width),
				(this._height = t.height),
				(e = this.renderTarget1.clone()),
				e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
		}
		this.renderTarget1.dispose(),
			this.renderTarget2.dispose(),
			(this.renderTarget1 = e),
			(this.renderTarget2 = e.clone()),
			(this.writeBuffer = this.renderTarget1),
			(this.readBuffer = this.renderTarget2);
	}
	setSize(e, t) {
		(this._width = e), (this._height = t);
		const n = this._width * this._pixelRatio,
			i = this._height * this._pixelRatio;
		this.renderTarget1.setSize(n, i), this.renderTarget2.setSize(n, i);
		for (let r = 0; r < this.passes.length; r++) this.passes[r].setSize(n, i);
	}
	setPixelRatio(e) {
		(this._pixelRatio = e), this.setSize(this._width, this._height);
	}
}
new _i(-1, 1, 1, -1, 0, 1);
const Fd = new Me();
Fd.setAttribute("position", new fe([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
Fd.setAttribute("uv", new fe([0, 2, 0, 0, 2, 0], 2));
class Lv extends xr {
	constructor(e, t, n, i, r) {
		super(),
			(this.scene = e),
			(this.camera = t),
			(this.overrideMaterial = n),
			(this.clearColor = i),
			(this.clearAlpha = r !== void 0 ? r : 0),
			(this.clear = !0),
			(this.clearDepth = !1),
			(this.needsSwap = !1),
			(this._oldClearColor = new re());
	}
	render(e, t, n) {
		const i = e.autoClear;
		e.autoClear = !1;
		let r, o;
		this.overrideMaterial !== void 0 &&
			((o = this.scene.overrideMaterial),
			(this.scene.overrideMaterial = this.overrideMaterial)),
			this.clearColor &&
				(e.getClearColor(this._oldClearColor),
				(r = e.getClearAlpha()),
				e.setClearColor(this.clearColor, this.clearAlpha)),
			this.clearDepth && e.clearDepth(),
			e.setRenderTarget(this.renderToScreen ? null : n),
			this.clear &&
				e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
			e.render(this.scene, this.camera),
			this.clearColor && e.setClearColor(this._oldClearColor, r),
			this.overrideMaterial !== void 0 && (this.scene.overrideMaterial = o),
			(e.autoClear = i);
	}
}
const Th = {
	shaderID: "luminosityHighPass",
	uniforms: {
		tDiffuse: { value: null },
		luminosityThreshold: { value: 1 },
		smoothWidth: { value: 1 },
		defaultColor: { value: new re(0) },
		defaultOpacity: { value: 0 }
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
};
class hr extends xr {
	constructor(e, t, n, i) {
		super(),
			(this.strength = t !== void 0 ? t : 1),
			(this.radius = n),
			(this.threshold = i),
			(this.resolution = e !== void 0 ? new G(e.x, e.y) : new G(256, 256)),
			(this.clearColor = new re(0, 0, 0));
		const r = { minFilter: Ye, magFilter: Ye, format: ct };
		(this.renderTargetsHorizontal = []),
			(this.renderTargetsVertical = []),
			(this.nMips = 5);
		let o = Math.round(this.resolution.x / 2),
			a = Math.round(this.resolution.y / 2);
		(this.renderTargetBright = new ut(o, a, r)),
			(this.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
			(this.renderTargetBright.texture.generateMipmaps = !1);
		for (let d = 0; d < this.nMips; d++) {
			const f = new ut(o, a, r);
			(f.texture.name = "UnrealBloomPass.h" + d),
				(f.texture.generateMipmaps = !1),
				this.renderTargetsHorizontal.push(f);
			const m = new ut(o, a, r);
			(m.texture.name = "UnrealBloomPass.v" + d),
				(m.texture.generateMipmaps = !1),
				this.renderTargetsVertical.push(m),
				(o = Math.round(o / 2)),
				(a = Math.round(a / 2));
		}
		Th === void 0 &&
			console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
		const l = Th;
		(this.highPassUniforms = ci.clone(l.uniforms)),
			(this.highPassUniforms.luminosityThreshold.value = i),
			(this.highPassUniforms.smoothWidth.value = 0.01),
			(this.materialHighPassFilter = new ht({
				uniforms: this.highPassUniforms,
				vertexShader: l.vertexShader,
				fragmentShader: l.fragmentShader,
				defines: {}
			})),
			(this.separableBlurMaterials = []);
		const c = [3, 5, 7, 9, 11];
		(o = Math.round(this.resolution.x / 2)),
			(a = Math.round(this.resolution.y / 2));
		for (let d = 0; d < this.nMips; d++)
			this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),
				(this.separableBlurMaterials[d].uniforms.texSize.value = new G(o, a)),
				(o = Math.round(o / 2)),
				(a = Math.round(a / 2));
		(this.compositeMaterial = this.getCompositeMaterial(this.nMips)),
			(this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture),
			(this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture),
			(this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture),
			(this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture),
			(this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture),
			(this.compositeMaterial.uniforms.bloomStrength.value = t),
			(this.compositeMaterial.uniforms.bloomRadius.value = 0.1),
			(this.compositeMaterial.needsUpdate = !0);
		const h = [1, 0.8, 0.6, 0.4, 0.2];
		(this.compositeMaterial.uniforms.bloomFactors.value = h),
			(this.bloomTintColors = [
				new w(1, 1, 1),
				new w(1, 1, 1),
				new w(1, 1, 1),
				new w(1, 1, 1),
				new w(1, 1, 1)
			]),
			(this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors),
			uo === void 0 && console.error("THREE.UnrealBloomPass relies on CopyShader");
		const u = uo;
		(this.copyUniforms = ci.clone(u.uniforms)),
			(this.copyUniforms.opacity.value = 1),
			(this.materialCopy = new ht({
				uniforms: this.copyUniforms,
				vertexShader: u.vertexShader,
				fragmentShader: u.fragmentShader,
				blending: ro,
				depthTest: !1,
				depthWrite: !1,
				transparent: !0
			})),
			(this.enabled = !0),
			(this.needsSwap = !1),
			(this._oldClearColor = new re()),
			(this.oldClearAlpha = 1),
			(this.basic = new Nt()),
			(this.fsQuad = new fo(null));
	}
	dispose() {
		for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
			this.renderTargetsHorizontal[e].dispose();
		for (let e = 0; e < this.renderTargetsVertical.length; e++)
			this.renderTargetsVertical[e].dispose();
		this.renderTargetBright.dispose();
	}
	setSize(e, t) {
		let n = Math.round(e / 2),
			i = Math.round(t / 2);
		this.renderTargetBright.setSize(n, i);
		for (let r = 0; r < this.nMips; r++)
			this.renderTargetsHorizontal[r].setSize(n, i),
				this.renderTargetsVertical[r].setSize(n, i),
				(this.separableBlurMaterials[r].uniforms.texSize.value = new G(n, i)),
				(n = Math.round(n / 2)),
				(i = Math.round(i / 2));
	}
	render(e, t, n, i, r) {
		e.getClearColor(this._oldClearColor),
			(this.oldClearAlpha = e.getClearAlpha());
		const o = e.autoClear;
		(e.autoClear = !1),
			e.setClearColor(this.clearColor, 0),
			r && e.state.buffers.stencil.setTest(!1),
			this.renderToScreen &&
				((this.fsQuad.material = this.basic),
				(this.basic.map = n.texture),
				e.setRenderTarget(null),
				e.clear(),
				this.fsQuad.render(e)),
			(this.highPassUniforms.tDiffuse.value = n.texture),
			(this.highPassUniforms.luminosityThreshold.value = this.threshold),
			(this.fsQuad.material = this.materialHighPassFilter),
			e.setRenderTarget(this.renderTargetBright),
			e.clear(),
			this.fsQuad.render(e);
		let a = this.renderTargetBright;
		for (let l = 0; l < this.nMips; l++)
			(this.fsQuad.material = this.separableBlurMaterials[l]),
				(this.separableBlurMaterials[l].uniforms.colorTexture.value = a.texture),
				(this.separableBlurMaterials[l].uniforms.direction.value =
					hr.BlurDirectionX),
				e.setRenderTarget(this.renderTargetsHorizontal[l]),
				e.clear(),
				this.fsQuad.render(e),
				(this.separableBlurMaterials[
					l
				].uniforms.colorTexture.value = this.renderTargetsHorizontal[l].texture),
				(this.separableBlurMaterials[l].uniforms.direction.value =
					hr.BlurDirectionY),
				e.setRenderTarget(this.renderTargetsVertical[l]),
				e.clear(),
				this.fsQuad.render(e),
				(a = this.renderTargetsVertical[l]);
		(this.fsQuad.material = this.compositeMaterial),
			(this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
			(this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
			(this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors),
			e.setRenderTarget(this.renderTargetsHorizontal[0]),
			e.clear(),
			this.fsQuad.render(e),
			(this.fsQuad.material = this.materialCopy),
			(this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture),
			r && e.state.buffers.stencil.setTest(!0),
			this.renderToScreen
				? (e.setRenderTarget(null), this.fsQuad.render(e))
				: (e.setRenderTarget(n), this.fsQuad.render(e)),
			e.setClearColor(this._oldClearColor, this.oldClearAlpha),
			(e.autoClear = o);
	}
	getSeperableBlurMaterial(e) {
		return new ht({
			defines: { KERNEL_RADIUS: e, SIGMA: e },
			uniforms: {
				colorTexture: { value: null },
				texSize: { value: new G(0.5, 0.5) },
				direction: { value: new G(0.5, 0.5) }
			},
			vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
			fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
		});
	}
	getCompositeMaterial(e) {
		return new ht({
			defines: { NUM_MIPS: e },
			uniforms: {
				blurTexture1: { value: null },
				blurTexture2: { value: null },
				blurTexture3: { value: null },
				blurTexture4: { value: null },
				blurTexture5: { value: null },
				dirtTexture: { value: null },
				bloomStrength: { value: 1 },
				bloomFactors: { value: null },
				bloomTintColors: { value: null },
				bloomRadius: { value: 0 }
			},
			vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
			fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform sampler2D dirtTexture;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
		});
	}
}
hr.BlurDirectionX = new G(1, 0);
hr.BlurDirectionY = new G(0, 1);
const Eh = {
	uniforms: {
		damp: { value: 0.96 },
		tOld: { value: null },
		tNew: { value: null }
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`
};
class Pv extends xr {
	constructor(e = 0.96) {
		super(),
			Eh === void 0 &&
				console.error("THREE.AfterimagePass relies on AfterimageShader"),
			(this.shader = Eh),
			(this.uniforms = ci.clone(this.shader.uniforms)),
			(this.uniforms.damp.value = e),
			(this.textureComp = new ut(window.innerWidth, window.innerHeight, {
				minFilter: Ye,
				magFilter: et,
				format: ct
			})),
			(this.textureOld = new ut(window.innerWidth, window.innerHeight, {
				minFilter: Ye,
				magFilter: et,
				format: ct
			})),
			(this.shaderMaterial = new ht({
				uniforms: this.uniforms,
				vertexShader: this.shader.vertexShader,
				fragmentShader: this.shader.fragmentShader
			})),
			(this.compFsQuad = new fo(this.shaderMaterial));
		const t = new Nt();
		this.copyFsQuad = new fo(t);
	}
	render(e, t, n) {
		(this.uniforms.tOld.value = this.textureOld.texture),
			(this.uniforms.tNew.value = n.texture),
			e.setRenderTarget(this.textureComp),
			this.compFsQuad.render(e),
			(this.copyFsQuad.material.map = this.textureComp.texture),
			this.renderToScreen
				? (e.setRenderTarget(null), this.copyFsQuad.render(e))
				: (e.setRenderTarget(t),
				  this.clear && e.clear(),
				  this.copyFsQuad.render(e));
		const i = this.textureOld;
		(this.textureOld = this.textureComp), (this.textureComp = i);
	}
	setSize(e, t) {
		this.textureComp.setSize(e, t), this.textureOld.setSize(e, t);
	}
}
class Dv extends Hn {
	constructor(e) {
		super(e);
		const t = new Rv(e.renderer);
		e.render = () => t.render();
		const n = new Lv(e.scene, e.camera),
			i = { exposure: 1, bloomStrength: 0.55, bloomThreshold: 0, bloomRadius: 0 },
			r = new hr(new G(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
		(r.threshold = i.bloomThreshold),
			(r.strength = i.bloomStrength),
			(r.radius = i.bloomRadius);
		const o = 0.8,
			a = new Pv(o);
		t.addPass(n), t.addPass(r), t.addPass(a);
	}
}
window.app = new fv(lv);
app.renderer.toneMapping = ll;
new cv(app.camera, app.renderer.domElement);
app.camera.position.y += 0.1;
app.camera.position.z += 1;
app.camera.lookAt(0, 0, 0);
app.triangle = new gv(app);
app.mountains = new vv(app);
app.floor = new Sv(app);
app.stars = new Ev(app);
app.postprocessing = new Dv(app);