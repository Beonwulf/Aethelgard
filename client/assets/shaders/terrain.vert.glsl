varying vec2 vUv;
varying float vHeight;
varying vec3 vWorldNormal;

uniform sampler2D tHeight;
uniform float displacementScale;
uniform float seaLevel;

void main() {
    vUv = uv;

    // RedFormat FloatType DataTexture (flipY=true) – direkt .r lesen (0..1)
    float texel = 1.0 / 512.0;
    float h  = texture2D(tHeight, uv).r;
    float hL = texture2D(tHeight, uv + vec2(-texel, 0.0)).r;
    float hR = texture2D(tHeight, uv + vec2( texel, 0.0)).r;
    float hD = texture2D(tHeight, uv + vec2(0.0, -texel)).r;
    float hU = texture2D(tHeight, uv + vec2(0.0,  texel)).r;

    // seaLevel abziehen damit 0.147 = Y=0 (Meeresspiegel)
    vHeight = (h - seaLevel) * displacementScale;

    vWorldNormal = normalize(vec3(
        (hL - hR) * displacementScale,
        4.0,
        (hD - hU) * displacementScale
    ));

    vec3 newPosition = position + vec3(0.0, vHeight, 0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}