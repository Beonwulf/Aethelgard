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

    // ── Seitenbestimmung (von oben / von unten) ───────────────────────────────
    vec3 viewDir = normalize(uCameraPos - vWorldPosition);
    bool fromAbove = viewDir.y > 0.0;

    // ── Von unten: einfache Unterseite ───────────────────────────────────────
    if (!fromAbove) {
        gl_FragColor = vec4(mix(vec3(0.01, 0.08, 0.18), uFogColor, fogFactor), 1.0);
        return;
    }

    // ── Noise: zwei gegenläufige Layer ────────────────────────────────────────
    vec2 uv1 = vWorldPosition.xz * 0.0004 + vec2(uTime * 0.008, uTime * 0.006);
    vec2 uv2 = vWorldPosition.xz * 0.0006 - vec2(uTime * 0.004, uTime * 0.010);
    float n1 = texture2D(uNoiseTex, uv1).r;
    float n2 = texture2D(uNoiseTex, uv2).r;

    // ── Wellennormale ─────────────────────────────────────────────────────────
    vec3 wNorm   = normalize(vec3((n1 - 0.5) * 0.12, 1.0, (n2 - 0.5) * 0.12));
    vec3 halfVec = normalize(uSunDir + viewDir);

    // ── Specular: scharf und punktförmig (wie Sonnenlicht auf Wasser) ─────────
    float spec = pow(max(dot(wNorm, halfVec), 0.0), 300.0) * uSunIntensity;

    // ── Fresnel: Horizont erscheint heller/reflektiver ────────────────────────
    float NdotV   = max(dot(wNorm, viewDir), 0.0);
    float fresnel = pow(1.0 - NdotV, 5.0);

    // ── Wasserfarbe: tiefes Blau-Türkis, KEIN weisser Überzug ────────────────
    vec3 waterCol = uWaterColor;
    // Hauch Spiegelung am Horizont (Himmels-Farbe, dezent)
    waterCol = mix(waterCol, uFogColor * 0.8, fresnel * 0.15);
    // Schlanker Sonnenglanz-Punkt
    waterCol += uSunColor * spec * 0.6;

    // ── Nur winzige Schaumkronen an den höchsten Noise-Spitzen ───────────────
    float ns   = (n1 + n2) * 0.5;
    float foam = smoothstep(0.74, 0.80, ns);
    waterCol   = mix(waterCol, vec3(1.0), foam * 0.30);

    gl_FragColor = vec4(mix(waterCol, uFogColor, fogFactor), 0.88);
}
}