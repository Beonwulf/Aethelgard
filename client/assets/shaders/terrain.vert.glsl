varying vec2 vUv;
varying float vHeight;
varying vec3 vWorldNormal;

uniform sampler2D tHeight;
uniform float displacementScale;

// Funktion für hochpräzises Auslesen der Höhe
float getPreciseHeight(vec2 uv) {
    vec2 texSize = vec2(512.0, 512.0);
    vec2 texelSize = 1.0 / texSize;
    
    // Wir lesen die 4 Nachbarpixel
    vec4 h00 = texture2D(tHeight, uv);
    vec4 h10 = texture2D(tHeight, uv + vec2(texelSize.x, 0.0));
    vec4 h01 = texture2D(tHeight, uv + vec2(0.0, texelSize.y));
    vec4 h11 = texture2D(tHeight, uv + texelSize);

    // TRICK: Falls dein Tool die Höhe über R und G verteilt hat (Precision Packing)
    // Wenn nicht, nutzt dies einfach nur den R-Kanal glatt.
    float height00 = h00.r + (h00.g / 255.0);
    float height10 = h10.r + (h10.g / 255.0);
    float height01 = h01.r + (h01.g / 255.0);
    float height11 = h11.r + (h11.g / 255.0);

    // Manuelle bilineare Interpolation
    vec2 f = fract(uv * texSize);
    float h = mix(mix(height00, height10, f.x), mix(height01, height11, f.x), f.y);
    
    // Kein S-Kurven-Transform – lineare Höhe für konsistente Tile-Übergänge
    return h;
}

void main() {
    vUv = uv;
    
    float h = getPreciseHeight(uv);
    vHeight = h * displacementScale;

    // Normalen-Berechnung mit leichtem Offset für weichere Schatten
    float offset = 2.0 / 512.0;
    float hL = getPreciseHeight(uv + vec2(-offset, 0.0));
    float hR = getPreciseHeight(uv + vec2(offset, 0.0));
    float hD = getPreciseHeight(uv + vec2(0.0, -offset));
    float hU = getPreciseHeight(uv + vec2(0.0, offset));
    
    vWorldNormal = normalize(vec3((hL - hR) * displacementScale, 4.0, (hD - hU) * displacementScale));

    vec3 newPosition = position + vec3(0.0, vHeight, 0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}