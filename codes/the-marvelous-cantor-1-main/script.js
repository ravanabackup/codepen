const _0x316f18 = _0x4903;
(function (_0x394082, _0x573705) {
	const _0x50acfa = _0x4903,
		_0x3c9eec = _0x394082();
	while (!![]) {
		try {
			const _0x405461 =
				(-parseInt(_0x50acfa(0x8f)) / 0x1) * (-parseInt(_0x50acfa(0xaa)) / 0x2) +
				parseInt(_0x50acfa(0xa8)) / 0x3 +
				-parseInt(_0x50acfa(0xa5)) / 0x4 +
				parseInt(_0x50acfa(0x9e)) / 0x5 +
				(parseInt(_0x50acfa(0x7d)) / 0x6) * (-parseInt(_0x50acfa(0x86)) / 0x7) +
				(-parseInt(_0x50acfa(0xa4)) / 0x8) * (-parseInt(_0x50acfa(0x97)) / 0x9) +
				-parseInt(_0x50acfa(0x94)) / 0xa;
			if (_0x405461 === _0x573705) break;
			else _0x3c9eec["push"](_0x3c9eec["shift"]());
		} catch (_0x1f68a3) {
			_0x3c9eec["push"](_0x3c9eec["shift"]());
		}
	}
})(_0x4024, 0x5ea20);
const canvas = document["getElementById"](_0x316f18(0x99)),
	gl = canvas[_0x316f18(0xa3)](_0x316f18(0xa6));
!gl ? alert("WebGL\x202\x20not\x20supported") : initWebGL();
function _0x4903(_0x3d1688, _0x23ecfc) {
	const _0x4024f1 = _0x4024();
	return (
		(_0x4903 = function (_0x49033c, _0x4b9829) {
			_0x49033c = _0x49033c - 0x7d;
			let _0x5a0526 = _0x4024f1[_0x49033c];
			return _0x5a0526;
		}),
		_0x4903(_0x3d1688, _0x23ecfc)
	);
}
function _0x4024() {
	const _0x53a767 = [
		"#version\x20300\x20es\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20out\x20vec4\x20fragColor;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20time;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20resolution;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20int\x20MAX_STEPS\x20=\x20100;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20MAX_DIST\x20=\x20100.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20SURF_DIST\x20=\x200.001;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20mat2\x20rot(float\x20a)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20s\x20=\x20sin(a);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20c\x20=\x20cos(a);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20mat2(c,\x20-s,\x20s,\x20c);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20sdBox(vec3\x20p,\x20vec3\x20b)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20q\x20=\x20abs(p)\x20-\x20b;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20length(max(q,\x200.0))\x20+\x20min(max(q.x,\x20max(q.y,\x20q.z)),\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20cantorDust(vec3\x20p)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20scale\x20=\x201.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20result\x20=\x201e10;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for\x20(int\x20i\x20=\x200;\x20i\x20<\x204;\x20i++)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20q\x20=\x20mod(p\x20*\x20scale,\x202.0)\x20-\x201.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20scale\x20*=\x203.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20d\x20=\x20sdBox(q,\x20vec3(1.0/3.0));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20result\x20=\x20min(result,\x20d\x20/\x20scale);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20result;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20getDist(vec3\x20p)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20p.xz\x20*=\x20rot(time\x20*\x200.1);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20p.yz\x20*=\x20rot(time\x20*\x200.05);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cantorDust(p);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20rayMarch(vec3\x20ro,\x20vec3\x20rd)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20dO\x20=\x200.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for(int\x20i\x20=\x200;\x20i\x20<\x20MAX_STEPS;\x20i++)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20p\x20=\x20ro\x20+\x20rd\x20*\x20dO;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20dS\x20=\x20getDist(p);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20dO\x20+=\x20dS;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if(dO\x20>\x20MAX_DIST\x20||\x20dS\x20<\x20SURF_DIST)\x20break;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20dO;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20getNormal(vec3\x20p)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20d\x20=\x20getDist(p);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20e\x20=\x20vec2(0.001,\x200);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20n\x20=\x20d\x20-\x20vec3(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20getDist(p-e.xyy),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20getDist(p-e.yxy),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20getDist(p-e.yyx));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20normalize(n);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20render(vec2\x20uv)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20ro\x20=\x20vec3(2.5\x20*\x20sin(time\x20*\x200.1),\x202.0,\x202.5\x20*\x20cos(time\x20*\x200.1));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20lookAt\x20=\x20vec3(0,\x200,\x200);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20f\x20=\x20normalize(lookAt\x20-\x20ro);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20r\x20=\x20normalize(cross(vec3(0,\x201,\x200),\x20f));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20u\x20=\x20cross(f,\x20r);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20c\x20=\x20ro\x20+\x20f\x20*\x201.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20i\x20=\x20c\x20+\x20uv.x\x20*\x20r\x20+\x20uv.y\x20*\x20u;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20rd\x20=\x20normalize(i\x20-\x20ro);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20d\x20=\x20rayMarch(ro,\x20rd);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20p\x20=\x20ro\x20+\x20rd\x20*\x20d;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20col\x20=\x20vec3(0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if(d\x20<\x20MAX_DIST)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20n\x20=\x20getNormal(p);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20lightPos\x20=\x20vec3(5.0\x20*\x20sin(time),\x205.0,\x205.0\x20*\x20cos(time));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20l\x20=\x20normalize(lightPos\x20-\x20p);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20dif\x20=\x20dot(n,\x20l)\x20*\x200.5\x20+\x200.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col\x20=\x20vec3(dif);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Add\x20some\x20color\x20variation\x20based\x20on\x20position\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col\x20*=\x200.8\x20+\x200.2\x20*\x20cos(p\x20*\x200.1\x20+\x20vec3(0,\x202,\x204));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20col;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20uv\x20=\x20(gl_FragCoord.xy\x20-\x200.5\x20*\x20resolution.xy)\x20/\x20resolution.y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20col\x20=\x20render(uv);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Simple\x20tone\x20mapping\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col\x20=\x20col\x20/\x20(1.0\x20+\x20col);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gamma\x20correction\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col\x20=\x20pow(col,\x20vec3(0.4545));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20fragColor\x20=\x20vec4(col,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}",
		"getProgramParameter",
		"5424660qluSzG",
		"addEventListener",
		"getProgramInfoLog",
		"3602133zfFQJz",
		"clear",
		"cantorSetCanvas",
		"uniform1f",
		"resize",
		"vertexAttribPointer",
		"createShader",
		"1243530puXHtG",
		"FLOAT",
		"useProgram",
		"Program\x20link\x20error:",
		"time",
		"getContext",
		"8EvLVpb",
		"774340EEEUDX",
		"webgl2",
		"innerHeight",
		"1900971fhMeuV",
		"position",
		"117902njadBP",
		"ARRAY_BUFFER",
		"uniform2f",
		"createBuffer",
		"linkProgram",
		"innerWidth",
		"1034238rBtmkN",
		"COLOR_BUFFER_BIT",
		"error",
		"LINK_STATUS",
		"TRIANGLE_STRIP",
		"VERTEX_SHADER",
		"bindBuffer",
		"FRAGMENT_SHADER",
		"shaderSource",
		"28joCJzV",
		"resolution",
		"viewport",
		"enableVertexAttribArray",
		"devicePixelRatio",
		"clearColor",
		"getUniformLocation",
		"width",
		"height",
		"9ymliOZ",
		"createProgram",
		"Shader\x20creation\x20failed"
	];
	_0x4024 = function () {
		return _0x53a767;
	};
	return _0x4024();
}
function initWebGL() {
	const _0x252446 = _0x316f18,
		_0x45f51b =
			"#version\x20300\x20es\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20in\x20vec4\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_Position\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}",
		_0x23b7bc = _0x252446(0x92);
	function _0x42c48d(_0x2b874f, _0xe50393, _0x305c1e) {
		const _0x571c69 = _0x252446,
			_0x3ab85d = _0x2b874f[_0x571c69(0x9d)](_0xe50393);
		_0x2b874f[_0x571c69(0x85)](_0x3ab85d, _0x305c1e),
			_0x2b874f["compileShader"](_0x3ab85d);
		if (!_0x2b874f["getShaderParameter"](_0x3ab85d, _0x2b874f["COMPILE_STATUS"]))
			return (
				console["error"](
					"Shader\x20compile\x20error:",
					_0x2b874f["getShaderInfoLog"](_0x3ab85d)
				),
				_0x2b874f["deleteShader"](_0x3ab85d),
				null
			);
		return _0x3ab85d;
	}
	const _0x5c629e = _0x42c48d(gl, gl[_0x252446(0x82)], _0x45f51b),
		_0x5c7479 = _0x42c48d(gl, gl[_0x252446(0x84)], _0x23b7bc);
	if (!_0x5c629e || !_0x5c7479) {
		console["error"](_0x252446(0x91));
		return;
	}
	const _0xd176cc = gl[_0x252446(0x90)]();
	gl["attachShader"](_0xd176cc, _0x5c629e),
		gl["attachShader"](_0xd176cc, _0x5c7479),
		gl[_0x252446(0xae)](_0xd176cc);
	if (!gl[_0x252446(0x93)](_0xd176cc, gl[_0x252446(0x80)])) {
		console[_0x252446(0x7f)](_0x252446(0xa1), gl[_0x252446(0x96)](_0xd176cc));
		return;
	}
	const _0x28c211 = gl["getAttribLocation"](_0xd176cc, _0x252446(0xa9)),
		_0x4027ea = gl[_0x252446(0x8c)](_0xd176cc, _0x252446(0xa2)),
		_0x257d52 = gl["getUniformLocation"](_0xd176cc, _0x252446(0x87)),
		_0x50d6be = gl[_0x252446(0xad)]();
	gl[_0x252446(0x83)](gl[_0x252446(0xab)], _0x50d6be);
	const _0x5edcc3 = [-0x1, -0x1, 0x1, -0x1, -0x1, 0x1, 0x1, 0x1];
	gl["bufferData"](
		gl["ARRAY_BUFFER"],
		new Float32Array(_0x5edcc3),
		gl["STATIC_DRAW"]
	);
	function _0x50a58d() {
		const _0x3c440b = _0x252446;
		(canvas["width"] = window[_0x3c440b(0xaf)] * window[_0x3c440b(0x8a)]),
			(canvas[_0x3c440b(0x8e)] =
				window[_0x3c440b(0xa7)] * window[_0x3c440b(0x8a)]),
			gl[_0x3c440b(0x88)](0x0, 0x0, canvas["width"], canvas[_0x3c440b(0x8e)]);
	}
	window[_0x252446(0x95)](_0x252446(0x9b), _0x50a58d), _0x50a58d();
	function _0x332146(_0x2e4cb2) {
		const _0x5e07d8 = _0x252446;
		(_0x2e4cb2 *= 0.001),
			gl[_0x5e07d8(0x8b)](0x0, 0x0, 0x0, 0x1),
			gl[_0x5e07d8(0x98)](gl[_0x5e07d8(0x7e)]),
			gl[_0x5e07d8(0xa0)](_0xd176cc),
			gl[_0x5e07d8(0x83)](gl[_0x5e07d8(0xab)], _0x50d6be),
			gl[_0x5e07d8(0x89)](_0x28c211),
			gl[_0x5e07d8(0x9c)](_0x28c211, 0x2, gl[_0x5e07d8(0x9f)], ![], 0x0, 0x0),
			gl[_0x5e07d8(0x9a)](_0x4027ea, _0x2e4cb2),
			gl[_0x5e07d8(0xac)](_0x257d52, canvas[_0x5e07d8(0x8d)], canvas["height"]),
			gl["drawArrays"](gl[_0x5e07d8(0x81)], 0x0, 0x4),
			requestAnimationFrame(_0x332146);
	}
	requestAnimationFrame(_0x332146);
}