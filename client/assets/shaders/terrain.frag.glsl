uniform vec3  fogColor;
uniform float fogDensity;
uniform vec3  sunDir;
uniform vec3  sunColor;
uniform float sunIntensity;
uniform vec3  moonDir;
uniform vec3  moonColor;
uniform float moonIntensity;
uniform vec3  ambientColor;
uniform float ambientIntensity;
uniform sampler2DArray tAtlas;  // Layer: 0=Sand, 1=Gras, 2=Wald, 3=Fels
uniform sampler2D tHeight;
uniform sampler2D uNoiseTex;
uniform float displacementScale;
uniform float seaLevel;
uniform vec2 tHeightSize;
uniform float uTime;
uniform vec3 uCameraPos;

varying vec2 vUv;
varying float vHeight;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;


float getHeight(vec2 uv) {
    return (texture2D(tHeight, uv).r - seaLevel) * displacementScale;
}


void main() {
    // 4. NEBEL (gemeinsam für Land und Wasser)
    float dist      = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = 1.0 - exp(-fogDensity * fogDensity * dist * dist);
    fogFactor       = clamp(fogFactor, 0.0, 1.0);

    // ── WASSER ──────────────────────────────────────────────────────────────
    if (vHeight < 0.0) {
        // Tiefenbasierte Wasserfarbe: flach = türkis, tief = dunkelblau
        float depth     = clamp(-vHeight / 30.0, 0.0, 1.0);
        vec3 shallowCol = vec3(0.05, 0.45, 0.55);
        vec3 deepCol    = vec3(0.01, 0.10, 0.28);
        vec3 waterCol   = mix(shallowCol, deepCol, depth);

        // ── Noise Layer (Wellen + Kaustik) ──────────────────────────────────
        // Grobe Wellen (surface normals)
        vec2 uv1 = vWorldPos.xz * 0.0005 + vec2(uTime * 0.010,  uTime * 0.010);
        vec2 uv2 = vWorldPos.xz * 0.0007 - vec2(uTime * 0.005,  uTime * 0.015);
        float n1 = texture2D(uNoiseTex, uv1).r;
        float n2 = texture2D(uNoiseTex, uv2).r;
        float ns = (n1 + n2) * 0.5;

        // Feine Kaustik-Layer (schnell scrollend, kleinere Skala)
        // Trick aus threejs-caustics: min(a,b) erzeugt Stern-Muster wie echte Lichtbrechung
        vec2 cuv1 = vWorldPos.xz * 0.0022 + vec2(uTime * 0.035,  uTime * 0.028);
        vec2 cuv2 = vWorldPos.xz * 0.0018 - vec2(uTime * 0.022,  uTime * 0.038);
        float cn1 = texture2D(uNoiseTex, cuv1).r;
        float cn2 = texture2D(uNoiseTex, cuv2).r;
        // min(cn1,cn2) → Kaustik-Stern-Muster; nur in flachem Wasser sichtbar
        float caustics = pow(min(cn1, cn2) * 2.8, 3.0) * (1.0 - depth) * sunIntensity;
        waterCol += sunColor * caustics * 0.45;

        // ── Küstenschaum ────────────────────────────────────────────────────
        float shoreBlend = clamp(-vHeight / 3.0, 0.0, 1.0); // 0=Strand, 1=tief
        // Äußerer Ring (breit, weich)
        float foam1 = smoothstep(0.58, 0.70, ns) * (1.0 - shoreBlend);
        // Innerer Ring (schmal, heller) – Brechungslinie
        float foam2 = smoothstep(0.70, 0.78, ns) * (1.0 - shoreBlend * 0.5);
        waterCol = mix(waterCol, vec3(0.9, 0.95, 1.0), foam1 * 0.45 + foam2 * 0.65);

        // ── Wellennormale + Specular ─────────────────────────────────────────
        vec3 wNorm   = normalize(vec3((n1 - 0.5) * 0.20, 1.0, (n2 - 0.5) * 0.20));
        vec3 viewDir = normalize(uCameraPos - vWorldPos);
        vec3 halfVec = normalize(sunDir + viewDir);
        float spec   = pow(max(dot(wNorm, halfVec), 0.0), 160.0);
        waterCol    += sunColor * sunIntensity * spec * 0.85;

        // ── Fresnel (Horizont-Reflexion) ─────────────────────────────────────
        float fresnel = pow(1.0 - max(dot(viewDir, wNorm), 0.0), 3.5);
        waterCol      = mix(waterCol, fogColor, fresnel * 0.40);

        gl_FragColor = vec4(mix(waterCol, fogColor, fogFactor), 1.0);
        return;
    }

    // ── LAND ────────────────────────────────────────────────────────────────
    // 1. NORMALE (Heightmap-Ableitung)
    float texelSize = 1.0 / tHeightSize.x;
    float hL = getHeight(vUv + vec2(-texelSize, 0.0));
    float hR = getHeight(vUv + vec2( texelSize, 0.0));
    float hD = getHeight(vUv + vec2(0.0, -texelSize));
    float hU = getHeight(vUv + vec2(0.0,  texelSize));
    vec3 N = normalize(vec3(hL - hR, 4.0, hD - hU));

    // 2. BIOME BLENDING
    float repeat = 128.0;
    vec3 sand   = texture(tAtlas, vec3(vUv * repeat,       0.0)).rgb;
    vec3 grass  = texture(tAtlas, vec3(vUv * repeat,       1.0)).rgb;
    vec3 forest = texture(tAtlas, vec3(vUv * repeat,       2.0)).rgb;
    vec3 rock   = texture(tAtlas, vec3(vUv * repeat * 0.5, 3.0)).rgb;

    float slope   = 1.0 - N.y;
    float rockMix = smoothstep(0.65, 0.85, slope);
    float s2g     = smoothstep(2.0,   12.0,   vHeight);
    float g2f     = smoothstep(150.0, 400.0,  vHeight);
    float f2r     = smoothstep(600.0, 1000.0, vHeight);

    vec3 col = mix(sand, grass, s2g);
    col = mix(col, forest, g2f);
    col = mix(col, rock, f2r);
    col = mix(col, rock, rockMix);

    // 3. BELEUCHTUNG (Sonne + Mond + Ambient)
    float sunDiff  = max(dot(N, sunDir), 0.0);
    vec3  sunLight = sunColor * sunIntensity * sunDiff;

    float moonDiff  = max(dot(N, moonDir), 0.0);
    vec3  moonLight = moonColor * moonIntensity * moonDiff;

    vec3 ambient  = ambientColor * ambientIntensity;
    vec3 lighting = max(ambient + sunLight + moonLight, vec3(0.03));
    vec3 litColor = col * lighting;

    gl_FragColor = vec4(mix(litColor, fogColor, fogFactor), 1.0);
}