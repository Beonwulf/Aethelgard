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

    // ── WASSER (Meeresboden) ─────────────────────────────────────────────────
    // Die eigentliche Wasseroberfläche kommt von der WaterManager-Plane bei Y=0.
    // Hier rendern wir den Meeresboden: Terrain-Textur + blaue Tiefentönung.
    if (vHeight < 0.0) {
        float texelSize = 1.0 / tHeightSize.x;
        float hL2 = getHeight(vUv + vec2(-texelSize, 0.0));
        float hR2 = getHeight(vUv + vec2( texelSize, 0.0));
        float hD2 = getHeight(vUv + vec2(0.0, -texelSize));
        float hU2 = getHeight(vUv + vec2(0.0,  texelSize));
        vec3 N2 = normalize(vec3(hL2 - hR2, 4.0, hD2 - hU2));

        float repeat = 128.0;
        vec3 sand = texture(tAtlas, vec3(vUv * repeat, 0.0)).rgb;
        vec3 rock = texture(tAtlas, vec3(vUv * repeat * 0.5, 3.0)).rgb;
        float rockMix2 = smoothstep(0.55, 0.75, 1.0 - N2.y);
        vec3 seafloor = mix(sand, rock, rockMix2);

        // Blaue Tiefentönung: tiefer = dunkler und blauer
        float depth     = clamp(-vHeight / 40.0, 0.0, 1.0);
        vec3 deepTint   = vec3(0.03, 0.12, 0.30);
        seafloor        = mix(seafloor * 0.55, deepTint, depth * 0.80);

        // Caustics auf Meeresboden (threejs-caustics Kern-Trick)
        // min(a,b) zweier gegenläufiger Noise-Layer → tanzende Stern-Lichtmuster
        vec2 cuv1 = vWorldPos.xz * 0.0030 + vec2(uTime * 0.040, uTime * 0.032);
        vec2 cuv2 = vWorldPos.xz * 0.0025 - vec2(uTime * 0.028, uTime * 0.045);
        float cn1 = texture2D(uNoiseTex, cuv1).r;
        float cn2 = texture2D(uNoiseTex, cuv2).r;
        float caustics = pow(min(cn1, cn2) * 3.2, 2.5) * (1.0 - depth * 0.7) * sunIntensity;
        seafloor += sunColor * caustics * 0.70;

        // Schwaches Ambient damit Meeresboden nicht zu dunkel ist
        seafloor += ambientColor * ambientIntensity * 0.25;

        gl_FragColor = vec4(mix(seafloor, fogColor, fogFactor), 1.0);
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