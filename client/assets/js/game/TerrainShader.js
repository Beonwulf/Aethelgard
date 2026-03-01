import * as THREE from 'three';

export const TerrainShader = {
    uniforms: {
        tSand: { value: null },
        tGrass: { value: null },
        tForest: { value: null },
        tRock: { value: null },
        tHeight: { value: null },
        displacementScale: { value: 1445.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying float vHeight;
        varying vec3 vWorldNormal;
        
        uniform sampler2D tHeight;
        uniform float displacementScale;

        void main() {
            vUv = uv;
            
            // 1. Höhe des aktuellen Punktes
            float h = texture2D(tHeight, uv).r;
            vHeight = h * displacementScale;
            
            // 2. Normalen-Berechnung (Fake-Glättung)
            // Wir schauen uns die Nachbarpixel an, um die Steigung zu berechnen
            float texel = 1.0 / 512.0;
            float hL = texture2D(tHeight, uv + vec2(-texel, 0.0)).r;
            float hR = texture2D(tHeight, uv + vec2(texel, 0.0)).r;
            float hD = texture2D(tHeight, uv + vec2(0.0, -texel)).r;
            float hU = texture2D(tHeight, uv + vec2(0.0, texel)).r;
            
            // Diese Vektorberechnung erzeugt eine glatte Normale für das Shading
            vWorldNormal = normalize(vec3((hL - hR) * displacementScale, 2.0, (hD - hU) * displacementScale));

            // 3. Position im 3D-Raum
            vec3 newPosition = position + vec3(0.0, vHeight, 0.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        varying float vHeight;
        varying vec3 vWorldNormal;
        
        uniform sampler2D tSand, tGrass, tForest, tRock;

        void main() {
            float repeat = 16.0;
            vec3 sand = texture2D(tSand, vUv * repeat).rgb;
            vec3 grass = texture2D(tGrass, vUv * repeat).rgb;
            vec3 forest = texture2D(tForest, vUv * repeat).rgb;
            vec3 rock = texture2D(tRock, vUv * (repeat * 0.5)).rgb;

            // Steilheit berechnen (vWorldNormal.y ist 1.0 wenn flach)
            float slope = 1.0 - vWorldNormal.y;
            float rockMix = smoothstep(0.2, 0.5, slope);

            // Höhen-Mischung
            float s2g = smoothstep(2.0, 12.0, vHeight);
            vec3 col = mix(sand, grass, s2g);

            float g2f = smoothstep(150.0, 400.0, vHeight);
            col = mix(col, forest, g2f);

            // Am Ende Fels einmischen, wenn es steil ist ODER sehr hoch
            float f2r = smoothstep(600.0, 1000.0, vHeight);
            vec3 withHeightRock = mix(col, rock, f2r);
            
            vec3 finalCol = mix(withHeightRock, rock, rockMix);

            // Simples Licht von oben
            float light = dot(vWorldNormal, normalize(vec3(0.3, 1.0, 0.3))) * 0.5 + 0.5;
            
            gl_FragColor = vec4(finalCol * light, 1.0);
        }
    `
};