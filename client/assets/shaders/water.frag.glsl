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
    // ── Nebel ────────────────────────────────────────────────────────────────
    float dist      = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
    fogFactor       = clamp(fogFactor, 0.0, 1.0);

    // ── Noise Layer (Wellen-Normalen) ─────────────────────────────────────────
    vec2 uv1 = vWorldPosition.xz * 0.0005 + vec2(uTime * 0.010,  uTime * 0.010);
    vec2 uv2 = vWorldPosition.xz * 0.0007 - vec2(uTime * 0.005,  uTime * 0.015);
    float n1 = texture2D(uNoiseTex, uv1).r;
    float n2 = texture2D(uNoiseTex, uv2).r;
    float ns = (n1 + n2) * 0.5;

    // ── Fake Caustics (threejs-caustics Trick: min(a,b) → Stern-Muster) ──────
    vec2 cuv1 = vWorldPosition.xz * 0.0022 + vec2(uTime * 0.035, uTime * 0.028);
    vec2 cuv2 = vWorldPosition.xz * 0.0018 - vec2(uTime * 0.022, uTime * 0.038);
    float cn1 = texture2D(uNoiseTex, cuv1).r;
    float cn2 = texture2D(uNoiseTex, cuv2).r;
    float caustics = pow(min(cn1, cn2) * 2.8, 3.0) * uSunIntensity;

    vec3 waterCol = uWaterColor;
    waterCol += uSunColor * caustics * 0.35;

    // ── Küstenschaum ─────────────────────────────────────────────────────────
    float foam1 = smoothstep(0.60, 0.72, ns);
    float foam2 = smoothstep(0.72, 0.80, ns);
    waterCol = mix(waterCol, vec3(0.92, 0.96, 1.0), foam1 * 0.40 + foam2 * 0.70);

    // ── Wellennormale + Specular ──────────────────────────────────────────────
    vec3 wNorm   = normalize(vec3((n1 - 0.5) * 0.25, 1.0, (n2 - 0.5) * 0.25));
    vec3 viewDir = normalize(uCameraPos - vWorldPosition);
    vec3 halfVec = normalize(uSunDir + viewDir);
    float spec   = pow(max(dot(wNorm, halfVec), 0.0), 160.0);
    waterCol    += uSunColor * uSunIntensity * spec * 0.90;

    // ── Fresnel: nur leicht, sonst wird alles grau ────────────────────────────
    float fresnel = pow(1.0 - max(dot(viewDir, wNorm), 0.0), 4.0);
    waterCol      = mix(waterCol, uFogColor * 0.6 + waterCol * 0.4, fresnel * 0.25);

    // ── Alpha: nah etwas transparenter (Meeresboden durchscheinen) ────────────
    float alpha = mix(0.82, 0.97, clamp(dist / 3000.0, 0.0, 1.0));

    // ── Von unten: dunkles Blau-Grün ─────────────────────────────────────────
    vec3 viewUp = normalize(vec3(0.0, 1.0, 0.0));
    float fromBelow = step(dot(viewDir, viewUp), 0.0);
    vec3 underwaterSurface = vec3(0.02, 0.15, 0.25);
    waterCol = mix(waterCol, underwaterSurface, fromBelow);
    alpha    = mix(alpha, 1.0, fromBelow);

    gl_FragColor = vec4(mix(waterCol, uFogColor, fogFactor), alpha);
}