varying vec2 vUv;
varying vec3 vWorldPosition;

uniform float uTime;
uniform sampler2D uNoiseTex;

void main() {
	vUv = uv;
	vec4 worldPos = modelMatrix * vec4(position, 1.0);

	// Wellen-Displacement via Noise
	vec2 wuv1 = worldPos.xz * 0.0006 + vec2(uTime * 0.012, uTime * 0.009);
	vec2 wuv2 = worldPos.xz * 0.0009 - vec2(uTime * 0.007, uTime * 0.014);
	float w1 = texture2D(uNoiseTex, wuv1).r - 0.5;
	float w2 = texture2D(uNoiseTex, wuv2).r - 0.5;
	worldPos.y += (w1 + w2) * 0.35;

	vWorldPosition = worldPos.xyz;
	gl_Position = projectionMatrix * viewMatrix * worldPos;
}