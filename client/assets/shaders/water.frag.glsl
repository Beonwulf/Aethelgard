uniform sampler2D uNoiseTex;
uniform float uTime;
uniform float uFogDensity;
uniform vec3 uFogColor;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uWaterColor;
uniform vec3 uCameraPos;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
    // ── Nebel ─────────────────────────────────────────────────────────────────
    float dist      = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
    fogFactor       = clamp(fogFactor, 0.0, 1.0);

    vec3 viewDir = normalize(uCameraPos - vWorldPosition);

    // ── Von unten ─────────────────────────────────────────────────────────────
    if (viewDir.y <= 0.0) {
        gl_FragColor = vec4(mix(vec3(0.01, 0.08, 0.18), uFogColor, fogFactor), 1.0);
        return;
    }

    // ── Wellennormale aus Noise (NUR für Lighting, NICHT für Farbe) ───────────
    vec2 uv1 = vWorldPosition.xz * 0.0003 + vec2(uTime * 0.007, uTime * 0.005);
    vec2 uv2 = vWorldPosition.xz * 0.0005 - vec2(uTime * 0.004, uTime * 0.008);
    float n1 = texture2D(uNoiseTex, uv1).r;
    float n2 = texture2D(uNoiseTex, uv2).r;
    vec3 wNorm = normalize(vec3((n1 - 0.5) * 0.10, 1.0, (n2 - 0.5) * 0.10));

    // ── Wasserfarbe: FLACH TÜRKIS, ohne Noise-Farb-Einfluss ──────────────────
    vec3 waterCol = uWaterColor;

    // ── Specular: ein scharfer Sonnenglanz-Punkt ──────────────────────────────
    vec3 halfVec = normalize(uSunDir + viewDir);
    float spec   = pow(max(dot(wNorm, halfVec), 0.0), 350.0);
    waterCol    += uSunColor * spec * 0.8;

    // ── Fresnel: dezente Aufhellung am Horizont ───────────────────────────────
    float NdotV   = max(dot(wNorm, viewDir), 0.0);
    float fresnel = pow(1.0 - NdotV, 5.0);
    waterCol      = mix(waterCol, uFogColor * 0.7, fresnel * 0.12);

    gl_FragColor = vec4(mix(waterCol, uFogColor, fogFactor), 0.85);
}
}