varying vec2 vUv;
varying float vHeight;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;

uniform sampler2D tHeight;
uniform float displacementScale;
uniform float seaLevel;
uniform float uTime;

void main() {
    vUv = uv;

    // RedFormat FloatType DataTexture (flipY=true, 513×513) – direkt .r lesen (0..1)
    float texel = 1.0 / 513.0;
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

    float yPos = vHeight;
    // Unterwasser: Vertex auf Wasseroberfläche einfrieren + kleine Wellen
    if (vHeight < 0.0) {
        vec4 worldPos4 = modelMatrix * vec4(position, 1.0);
        float wave = sin(worldPos4.x * 0.015 + uTime * 1.2) * 0.18
                   + sin(worldPos4.z * 0.011 + uTime * 0.9) * 0.12;
        yPos = wave;
    }

    vec4 worldPos = modelMatrix * vec4(position + vec3(0.0, yPos, 0.0), 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}