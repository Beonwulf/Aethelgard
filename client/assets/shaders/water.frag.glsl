uniform sampler2D uNoiseTex;
uniform float uTime;
uniform vec3 uFogColor;
uniform vec3 uSunDir;
uniform vec3 uWaterColor;
uniform vec3 uCameraPos;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
    // 1. ZWEI LAYER NOISE (scrollen in verschiedene Richtungen)
    vec2 uv1 = vWorldPosition.xz * 0.0005 + vec2(uTime * 0.01, uTime * 0.01);
    vec2 uv2 = vWorldPosition.xz * 0.0007 - vec2(uTime * 0.005, uTime * 0.015);
    
    float n1 = texture2D(uNoiseTex, uv1).r;
    float n2 = texture2D(uNoiseTex, uv2).r;
    
    // Kombiniertes Rauschen für die Oberflächenstruktur
    float noiseSum = (n1 + n2) * 0.5;

    // 2. FARBE & SCHAUM
    // Basis-Blau
    vec3 col = uWaterColor;
    
    // Schaumkronen (nur an den hellsten Stellen des Rauschens)
    float foam = smoothstep(0.65, 0.75, noiseSum);
    col = mix(col, vec3(0.9, 0.95, 1.0), foam * 0.4);

    // 3. LICHTREFLEXION (Specular) - Das macht "nasses" Wasser aus
    vec3 worldNormal = vec3(0.0, 1.0, 0.0);
    // Wir faken eine Störung der Normale durch das Rauschen für Glitzern
    worldNormal.x += (n1 - 0.5) * 0.1;
    worldNormal.z += (n2 - 0.5) * 0.1;
    worldNormal = normalize(worldNormal);

    vec3 viewDir = normalize(uCameraPos - vWorldPosition);
    vec3 reflectDir = reflect(-uSunDir, worldNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128.0);
    
    // Sonnenglanz hinzufügen
    col += vec3(1.0, 0.9, 0.7) * spec * 0.6;

    // 4. NEBEL & TRANSPARENZ
    float dist = length(uCameraPos - vWorldPosition);
    float fogFactor = clamp(dist / 20000.0, 0.0, 1.0);
    
    // Am Horizont wird das Wasser eins mit dem Nebel/Himmel
    vec3 finalCol = mix(col, uFogColor, fogFactor);
    
    gl_FragColor = vec4(finalCol, 0.8); // 0.8 für leichte Transparenz
}