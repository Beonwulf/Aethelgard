uniform vec3 fogColor;
uniform float fogDensity;
uniform vec3 sunDirection;
uniform sampler2D tSand, tGrass, tForest, tRock, tHeight;
uniform float displacementScale;
uniform vec2 tHeightSize;

varying vec2 vUv;
varying float vHeight;
varying vec3 vWorldNormal;


// Hilfsfunktion um die Höhe an einem UV-Punkt zu lesen
float getHeight(vec2 uv) {
    return texture2D(tHeight, uv).r * displacementScale;
}


void main() {
	// 1. NORMALE NEU BERECHNEN (SMOOTHING)
    // Wir schauen uns die direkten Nachbar-Pixel an
    float texelSize = 1.0 / tHeightSize.x;
    
    float hL = getHeight(vUv + vec2(-texelSize, 0.0));
    float hR = getHeight(vUv + vec2(texelSize, 0.0));
    float hD = getHeight(vUv + vec2(0.0, -texelSize));
    float hU = getHeight(vUv + vec2(0.0, texelSize));

    // Die "wahre" Normale berechnen (2.0 ist ein Glättungsfaktor, höher = flacher)
    vec3 smoothNormal = normalize(vec3(hL - hR, 2.0, hD - hU));

    // 2. BIOME LOGIK (wie bei dir, aber mit smoothNormal)
    float repeat = 16.0;
    vec3 sand = texture2D(tSand, vUv * repeat).rgb;
    vec3 grass = texture2D(tGrass, vUv * repeat).rgb;
    vec3 forest = texture2D(tForest, vUv * repeat).rgb;
    vec3 rock = texture2D(tRock, vUv * (repeat * 0.5)).rgb;

    float slope = 1.0 - smoothNormal.y; // Hier die neue Normale nutzen!
    float rockMix = smoothstep(0.4, 0.7, slope);

    float s2g = smoothstep(2.0, 12.0, vHeight);
    vec3 col = mix(sand, grass, s2g);
    float g2f = smoothstep(150.0, 400.0, vHeight);
    col = mix(col, forest, g2f);
    float f2r = smoothstep(600.0, 1000.0, vHeight);
    vec3 withHeightRock = mix(col, rock, f2r);

    vec3 finalCol = mix(withHeightRock, rock, rockMix);

    // 3. LICHT (Schatten ohne Treppen)
    // Wir nutzen sunDirection und unsere berechnete smoothNormal
    float d = dot(smoothNormal, normalize(sunDirection));
    d = clamp(d, 0.0, 1.0);
    
    // Schattenfarbe etwas bläulich/dunkel, Lichtfarbe warm
    vec3 ambient = fogColor * 0.3; 
    vec3 lightRes = mix(ambient, vec3(1.0, 0.95, 0.8), d);
    vec3 finalWithLight = finalCol * lightRes;

    // 4. NEBEL (Exponential)
    float dist = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = 1.0 - exp(-fogDensity * fogDensity * dist * dist);
    fogFactor = clamp(fogFactor, 0.0, 1.0);

    gl_FragColor = vec4(mix(finalWithLight, fogColor, fogFactor), 1.0);
}