export interface GLSLFunction {
    code: string;
    dependencies: string[];
}

export const glslLibrary: Record<string, GLSLFunction> = {
    // --- Helper functions ---
    dot2: {
        code: `float dot2( in vec2 v ) { return dot(v,v); }`,
        dependencies: [],
    },
    ndot: {
        code: `float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }`,
        dependencies: [],
    },
    extrude: {
        code: `float extrude(float d2, float z, float h) {
    vec2 d = vec2(d2, abs(z) - h * 0.5);
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}`,
        dependencies: [],
    },
    smax: {
        code: `float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(a, b, h) - k * h * (1.0 - h);
}`,
        dependencies: [],
    },
    
    // --- Procedural Textures ---
    texture_dots: {
        code: `vec3 texture_dots(vec3 p, float scale) {
    vec3 p_scaled = p * scale;
    float d = length(fract(p_scaled) - 0.5);
    return vec3(step(0.25, d));
}`,
        dependencies: [],
    },
    texture_stripes: {
        code: `vec3 texture_stripes(vec3 p, float scale) {
    float stripes = sin((p.x + p.y + p.z) * scale * 5.0);
    return vec3(step(0.0, stripes));
}`,
        dependencies: [],
    },
    texture_checkers: {
        code: `vec3 texture_checkers(vec3 p, float scale) {
    vec3 p_scaled = floor(p * scale);
    float check = mod(p_scaled.x + p_scaled.y + p_scaled.z, 2.0);
    return vec3(check);
}`,
        dependencies: [],
    },

    // --- Noise Utilities ---
    snoise: {
        code: `vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzz, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 );
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}`,
        dependencies: [],
    },
    cnoise: {
        code: `float cnoise(vec3 p) { return snoise(p) * 0.5 + 0.5; }
float cnoise(vec2 p) { return snoise(vec3(p, 0.0)) * 0.5 + 0.5; }`,
        dependencies: ['snoise'],
    },
    vector_snoise: {
        code: `vec3 vector_snoise(vec3 p) {
    return vec3(
        snoise(p),
        snoise(p + vec3(100.0, 24.5, 34.6)),
        snoise(p - vec3(54.2, 14.7, 78.1))
    );
}`,
        dependencies: ['snoise'],
    },
    curl: {
        code: `vec3 curl(vec3 p) {
    const float e = 0.001;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);

    vec3 n_y1 = vector_snoise(p + dy); vec3 n_y0 = vector_snoise(p - dy);
    vec3 n_z1 = vector_snoise(p + dz); vec3 n_z0 = vector_snoise(p - dz);
    vec3 n_x1 = vector_snoise(p + dx); vec3 n_x0 = vector_snoise(p - dx);
    
    float x = (n_y1.z - n_y0.z) - (n_z1.y - n_z0.y);
    float y = (n_z1.x - n_z0.x) - (n_x1.z - n_x0.z);
    float z = (n_x1.y - n_y0.y) - (n_y1.x - n_y0.y);
    
    vec3 curlVec = vec3(x, y, z) / (2.0 * e);
    return curlVec * 0.5 + 0.5;
}

vec3 curl(vec2 p) {
    const float e = 0.001;
    float n1 = snoise(vec3(p + vec2(0.0, e), 0.0));
    float n2 = snoise(vec3(p - vec2(0.0, e), 0.0));
    float n3 = snoise(vec3(p + vec2(e, 0.0), 0.0));
    float n4 = snoise(vec3(p - vec2(e, 0.0), 0.0));
    vec2 curl2d = vec2(n1 - n2, n4 - n3) / (2.0 * e);
    curl2d = curl2d * 0.5 + 0.5;
    return vec3(curl2d.x, curl2d.y, (curl2d.x + curl2d.y) * 0.5);
}`,
        dependencies: ['vector_snoise', 'snoise'],
    },
    random: {
        code: `float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(vec3 pos) {
    return fract(sin(dot(pos.xyz, vec3(12.9898, 78.233, 151.7182))) * 43758.5453123);
}`,
        dependencies: [],
    },
    random2: {
        code: `vec2 random2(vec2 st) {
    return vec2(random(st), random(st + vec2(1.23, 4.56)));
}`,
        dependencies: ['random'],
    },
    worley: {
        code: `vec2 worley(vec2 p) {
    vec2 g = floor(p);
    vec2 f = fract(p);
    float jitter = (sin(u_time) * 0.5 + 0.5);

    float F1 = 8.0;
    float F2 = 8.0;

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 lattice = vec2(x,y);
            vec2 offset = vec2(random(g + lattice)) * jitter;
            float d = distance(lattice + offset, f);
            if(d < F1) {
                F2 = F1;
                F1 = d;
            } else if(d < F2) {
                F2 = d;
            }
        }
    }
    return vec2(F1,F2);
}

vec2 worley(vec3 p) {
    vec3 g = floor(p);
    vec3 f = fract(p);
    float jitter = (sin(u_time) * 0.5 + 0.5);

    float F1 = 8.0;
    float F2 = 8.0;

    for (int z = -1; z <= 1; z++) {
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec3 lattice = vec3(x,y,z);
                vec3 offset = vec3(random(g + lattice)) * jitter;
                float d = distance(lattice + offset, f);
                if(d < F1) {
                    F2 = F1;
                    F1 = d;
                } else if(d < F2) {
                    F2 = d;
                }
            }
        }
    }
    return vec2(F1,F2);
}`,
        dependencies: ['random'],
    },
    voronoi: {
        code: `vec3 voronoi(vec2 uv, float time) {
    vec2 i_uv = floor(uv);
    vec2 f_uv = fract(uv);
    vec3 rta = vec3(0.0, 0.0, 10.0);
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 p_rand = random2(i_uv + neighbor);
            vec2 p = 0.5 + 0.5 * sin(time + 6.2831853 * p_rand);
            vec2 diff = neighbor + p - f_uv;
            float dist = length(diff);
            if ( dist < rta.z ) {
                rta.xy = p;
                rta.z = dist;
            }
        }
    }
    return rta;
}
vec3 voronoi(vec2 p)  { return voronoi(p, u_time); }
vec3 voronoi(vec3 p)  { return voronoi(p.xy, p.z); }`,
        dependencies: ['random2'],
    },
    noise2d_val: {
        code: `float noise2d_val (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}`,
        dependencies: ['random'],
    },
    fbm: {
        code: `float fbm(in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) { // Unrolled loop for NUM_OCTAVES 5
        v += a * noise2d_val(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float fbm(in vec3 _st) { // 3D version using existing snoise
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; ++i) {
        v += a * cnoise(_st);
        _st = _st * 2.0 + 100.0;
        a *= 0.5;
    }
    return v;
}`,
        dependencies: ['noise2d_val', 'cnoise'],
    },
    cloud_color: {
        code: `vec3 cloud_color(vec3 p, float u_time, vec3 colorA, vec3 colorB) {
    vec2 st = p.xy * 3.0;
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);
    float f = fbm(st+r);
    color = mix(colorA, colorB, clamp((f*f)*4.0,0.0,1.0));
    color = mix(color, vec3(0,0,0.164706), clamp(length(q),0.0,1.0));
    color = mix(color, vec3(0.666667,1,1), clamp(length(r.x),0.0,1.0));
    return (f*f*f+.6*f*f+.5*f)*color;
}`,
        dependencies: ['fbm'],
    },

    // --- Fractal Functions ---
    cart2polar: {
        code: `vec3 cart2polar(vec3 p) {
    float r = length(p);
    if (r < 0.0001) return vec3(0.0); // Guard against division by zero at the origin
    float theta = acos(p.z / r);
    float phi = atan(p.y, p.x);
    return vec3(r, theta, phi);
}`,
        dependencies: [],
    },
    mandelbulbSDF: {
        code: `vec2 mandelbulbSDF( in vec3 st ) {
   vec3 zeta = st;
   float m = dot(st,st);
   float dz = 1.0;
   float n = 8.0;
   const int maxiterations = 20;
   float iterations = 0.0;
   for (int i = 0; i < maxiterations; i+=1) {
       dz = n*pow(m, 3.5)*dz + 1.0;
       vec3 sphericalZ = cart2polar( zeta );
       float newx = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * cos(sphericalZ.z*n);
       float newy = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * sin(sphericalZ.z*n);
       float newz = pow(sphericalZ.x, n) * cos(sphericalZ.y*n);
       zeta.x = newx + st.x;
       zeta.y = newy + st.y;
       zeta.z = newz + st.z;
       m = dot(zeta, zeta);
       if ( m > 2.0 ) break;
   }
   return vec2(0.25*log(m) * sqrt(m) / dz, iterations);
}`,
        dependencies: ['cart2polar'],
    },
    pow2: {
        code: `float pow2( float x ) { return x*x; }`,
        dependencies: [],
    },
    juliaSDF: {
        code: `float juliaSDF( vec2 st, vec2 c, float r) {
    vec2 z = st * r;
    float n = 0.0;
    const int I = 50;
    for (int i = I; i > 0; i--) {
        if ( length(z) > 4.0 ) { n = float(i)/float(I); break; }
        z = vec2( (pow2(z.x) - pow2(z.y)) + c.x, (2.0*z.x*z.y) + c.y );
    }
    return n;
}`,
        dependencies: ['pow2'],
    },
    mandelbrotSDF: {
        code: `float mandelbrotSDF( vec2 st, float r) {
    vec2 z = vec2(0.0);
    vec2 c = st * r;
    float n = 0.0;
    const int I = 50;
    for (int i = I; i > 0; i--) {
        if ( length(z) > 4.0 ) { n = float(i)/float(I); break; }
        z = vec2( (z.x*z.x - z.y*z.y) + c.x, (2.0*z.x*z.y) + c.y );
    }
    return n;
}`,
        dependencies: [],
    },
    sdFractal: {
        code: `float sdFractal(vec3 p, float iterations, float scale) {
    vec3 offset = p;
    vec3 z = p;
    float dr = 1.0;
    for (int i = 0; i < 256; i++) {
        if(float(i) >= iterations) break;
        // Box folding operation
        z = clamp(z, -1.0, 1.0) * 2.0 - z;
        // Spherical inversion
        float r2 = dot(z, z);
        if (r2 < 0.5) { // minRadius^2 = 0.5
            float temp = 1.0 / r2;
            z *= temp;
            dr *= temp;
        }
        z = z * scale + offset;
        dr = dr * abs(scale) + 1.0;
    }
    return length(z) / abs(dr);
}`,
        dependencies: [],
    },
    sdPsychobox: {
        code: `float sdPsychobox(vec3 p, float iterations) {
    p = fract(p) - 0.5;
    float s = 1.0;
    for (int i = 0; i < 128; i++) {
        if(float(i) >= iterations) break;
        float m = dot(p, p) * 0.7;
        if (m < 0.001) break;
        p /= m;
        s *= m;
        p.xy = fract(p.xy) - 0.5;
        p.xyz = p.yzx;
    }
    return (length(p) - 1.0) * s;
}`,
        dependencies: [],
    },

    // --- Color Utilities ---
    hsv2rgb: {
        code: `vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`,
        dependencies: [],
    },
    random_color: {
        code: `vec3 random_color(vec3 p) {
    vec3 p3  = fract(p * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xxy + p3.yzz)*p3.zyx);
}`,
        dependencies: [],
    },

    // --- Distance Functions ---
    distEuclidean: { code: `float distEuclidean(vec2 a, vec2 b) { return distance(a, b); }`, dependencies: [] },
    distManhattan: { code: `float distManhattan(vec2 a, vec2 b) { return abs(a.x - b.x) + abs(a.y - b.y); }`, dependencies: [] },
    distChebychev: { code: `float distChebychev(vec2 a, vec2 b) { return max(abs(a.x - b.x), abs(a.y - b.y)); }`, dependencies: [] },
    distMinkowski: { code: `float distMinkowski(vec2 a, vec2 b, float p) { return pow(pow(abs(a.x - b.x), p) + pow(abs(a.y - b.y), p), 1.0 / p); }`, dependencies: [] },

    // --- 3D Primitives ---
    sdSphere: { code: `float sdSphere( vec3 p, float s ) { return length(p)-s; }`, dependencies: [] },
    sdBox: { code: `float sdBox( vec3 p, vec3 b ) { vec3 q = abs(p) - b; return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0); }`, dependencies: [] },
    sdRoundbox: { code: `float sdRoundbox( vec3 p, vec3 b, float r ) { vec3 q = abs(p) - b; return length(max(q,0.0)) - r; }`, dependencies: [] },
    sdTorus: { code: `float sdTorus( vec3 p, vec2 t ) { vec2 q = vec2(length(p.xz)-t.x,p.y); return length(q)-t.y; }`, dependencies: [] },
    sdTorus88: { code: `float sdTorus88( vec3 p, vec2 t ) { vec2 q = vec2(length(p.xz)-t.x,p.y); return max(abs(q.x),abs(q.y))-t.y; }`, dependencies: [] },
    sdTorus82: { code: `float sdTorus82( vec3 p, vec2 t ) { vec2 q = vec2(length(p.xy)-t.x,p.z); return length(q)-t.y; }`, dependencies: [] },
    sdPlane: { code: `float sdPlane(vec3 p, vec3 n, float h) { return dot(p, n) + h; }`, dependencies: [] },
    sdCapsule: { code: `float sdCapsule( vec3 p, vec3 a, vec3 b, float r ) { vec3 pa = p - a, ba = b - a; float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 ); return length( pa - ba*h ) - r; }`, dependencies: [] },
    sdCone: { code: `float sdCone( vec3 p, vec2 c ) { float q = length(p.xy); return dot(normalize(c), vec2(q, p.z)); }`, dependencies: [] },
    sdCylinder: { code: `float sdCylinder( vec3 p, vec2 h ) { vec2 d = abs(vec2(length(p.xz),p.y)) - h; return min(max(d.x,d.y),0.0) + length(max(d,0.0)); }`, dependencies: [] },
    sdHexprism: { code: `float sdHexprism( vec3 p, vec2 h ) { vec3 q = abs(p); return max(q.z-h.y,max((q.x*0.866025+q.y*0.5),q.y)-h.x); }`, dependencies: [] },
    sdTriprism: { code: `float sdTriprism( vec3 p, vec2 h ) { vec3 q = abs(p); return max(q.z-h.y, max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5); }`, dependencies: [] },
    sdOctahedron: { code: `float sdOctahedron( vec3 p, float s) { p = abs(p); return (p.x+p.y+p.z-s)*0.57735027; }`, dependencies: [] },
    sdMandelbox: { code: `float sdMandelbox(vec3 p, float scale, float iterations, float folding) { vec3 z=p; float dr=1.0; for(int n=0;n<int(iterations);n++){z=clamp(z,-folding,folding)*2.0-z;float r2=dot(z,z);if(r2<0.5){z*=1.0/r2;dr=dr/r2;}z=z*scale+p;dr=dr*abs(scale)+1.0;} return length(z)/abs(dr); }`, dependencies: [] },
    sdMandelbulb: { code: `float sdMandelbulb(vec3 p) { return mandelbulbSDF(p).x; }`, dependencies: ['mandelbulbSDF'] },

    // --- 2D Primitives ---
    sdArc2d: { code: `float sdArc2d( in vec3 p_3d, in vec2 sc, in float ra, float rb ) { vec2 p = p_3d.xy; p.x = abs(p.x); vec2 p2 = (sc.y*p.x>sc.x*p.y) ? p : vec2( dot(p,sc), ndot(p,sc) ); float d2d = sign(p2.x)*length(p2-vec2(ra,0.0)) - rb; return extrude(d2d, p_3d.z, 0.1);}`, dependencies: ['extrude', 'ndot'] },
    sdBox2d: { code: `float sdBox2d(in vec3 p_3d, in vec2 b){vec2 p=p_3d.xy;vec2 d=abs(p)-b;float d2d=length(max(d,0.0))+min(max(d.x,d.y),0.0);return extrude(d2d,p_3d.z,0.1);}`, dependencies: ['extrude'] },
    sdCircle2d: { code: `float sdCircle2d(vec3 p_3d, float r){ float d2d = length(p_3d.xy)-r; return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdCross2d: { code: `float sdCross2d( in vec3 p_3d, in vec2 b, float r ) { vec2 p = p_3d.xy; p = abs(p); p = (p.y>p.x) ? p.yx : p; vec2 q = p - b; float k = max(q.y,q.x); vec2 w = (k>0.0) ? q : vec2(b.y-p.x,-k); float d2d = sign(k)*length(max(w,0.0)) + r; return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdEllipse2d: { code: `float sdEllipse2d( in vec3 p_3d, in vec2 ab ) { vec2 p = p_3d.xy; p = abs(p); if( p.x > p.y ) p=p.yx; float l = ab.y-ab.x; float m = (l*p.x + l*p.y)/ (l*l); float n = clamp( m, 0.0, 1.0 ); vec2 q = p - ab.x*normalize(mix(ab.yx,vec2(1.0,0.0),n)); float d2d = length(q) * sign(p.y-ab.y); return extrude(d2d, p_3d.z, 0.1);}`, dependencies: ['extrude'] },
    sdEquilateralTriangle2d: { code: `float sdEquilateralTriangle2d( in vec3 p_3d, float r ) { vec2 p = p_3d.xy; const float k = sqrt(3.0); p.x = abs(p.x) - r; p.y = p.y + r/k; if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0; p.x -= clamp( p.x, -2.0*r, 0.0 ); float d2d = -length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdHeart2d: { code: `float sdHeart2d( in vec3 p_3d ) { vec2 p = p_3d.xy; p.x = abs(p.x); float d2d; if( p.y+p.x>1.0 ) d2d = sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0; else d2d = sqrt(min(dot2(p-vec2(0.00,1.00)), dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude', 'dot2'] },
    sdHexagon2d: { code: `float sdHexagon2d( in vec3 p_3d, float r ) { vec2 p = p_3d.xy; const vec3 k = vec3(-0.866025404,0.5,0.577350269); p = abs(p); p -= 2.0*min(dot(k.xy,p),0.0)*k.xy; p -= vec2(clamp(p.x, -k.z*r, k.z*r), r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdHexagram2d: { code: `float sdHexagram2d( in vec3 p_3d, in float r ) { vec2 p = p_3d.xy; const vec4 k = vec4(-0.5,0.86602540,0.57735027,1.73205081); p = abs(p); p -= 2.0*min(dot(vec2(k.x,k.y),p),0.0)*vec2(k.x,k.y); p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y); p -= vec2(clamp(p.x,r*k.z,r*k.w),r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdIsoscelesTriangle2d: { code: `float sdIsoscelesTriangle2d( in vec3 p_3d, in vec2 q ) { vec2 p = p_3d.xy; p.x = abs(p.x); vec2 a = p - q*clamp( dot(p,q)/dot(q,q), 0.0, 1.0 ); vec2 b = p - q*vec2( clamp( p.x/q.x, 0.0, 1.0 ), 1.0 ); float s = -sign( q.y ); vec2 d = min( vec2( dot(a,a), s*(p.x*q.y-p.y*q.x) ), vec2( dot(b,b), s*(p.y-q.y)  )); float d2d = -sqrt(d.x)*sign(d.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdMoon2d: { code: `float sdMoon2d( vec3 p_3d, float d, float ra, float rb ) { vec2 p = p_3d.xy; p.y = abs(p.y); float a = (ra*ra - rb*rb + d*d)/(2.0*d); float b = sqrt(max(ra*ra-a*a,0.0)); float d2d; if( d*(p.x*b-p.y*a) > d*d*max(b-p.y,0.0) ) d2d = length(p-vec2(a,b)); else d2d = max( length(p)-ra, -length(p-vec2(d,0))+rb ); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdNgon2d: { code: `float sdNgon2d( in vec3 p_3d, in float r, in float n) { vec2 p = p_3d.xy; float an = 3.141593/n; vec2  acs = vec2(cos(an),sin(an)); float bn = mod(atan(p.y,p.x),2.0*an) - an; p = length(p)*vec2(cos(bn),abs(sin(bn))); p -= r*acs; p.y += clamp(-p.y, 0.0, r*acs.y); float d2d = length(p)*sign(p.x); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdOctogon2d: { code: `float sdOctogon2d( in vec3 p_3d, in float r ) { vec2 p = p_3d.xy; const vec3 k = vec3(-0.92387953, 0.38268343, 0.41421356); p = abs(p); p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y); p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y); p -= vec2(clamp(p.x,-k.z*r,k.z*r),r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdParallelogram2d: { code: `float sdParallelogram2d( in vec3 p_3d, float wi, float he, float sk ) { vec2 p = p_3d.xy; vec2 e = vec2(sk,he); p = (p.y<0.0)?-p:p; vec2 q = p - e*clamp(dot(p,e)/dot(e,e),0.0,1.0); q -= vec2(clamp(q.x,-wi,wi),0.0); float d2d = length(q)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdPentagon2d: { code: `float sdPentagon2d( in vec3 p_3d, in float r ) { vec2 p = p_3d.xy; const vec3 k = vec3(0.80901699, 0.58778525, 0.72654253); p.x = abs(p.x); p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y); p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y); p -= vec2(clamp(p.x,-r*k.z,r*k.z),r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdPie2d: { code: `float sdPie2d( in vec3 p_3d, in vec2 c, in float r ){ vec2 p = p_3d.xy; p.x = abs(p.x); float l = length(p) - r; float m = length(p-c*clamp(dot(p,c),0.0,r)); float d2d = max(l,m*sign(c.y*p.x-c.x*p.y)); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdRhombus2d: { code: `float sdRhombus2d( in vec3 p_3d, in vec2 b ) { vec2 p = p_3d.xy; p=abs(p); float h = clamp( (-2.0*ndot(p,b) + ndot(b,b))/dot(b,b), -1.0, 1.0 ); vec2 d = p - 0.5*b*vec2(1.0-h,1.0+h); float d2d = length(d)*sign( p.x*b.y + p.y*b.x - b.x*b.y ); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude', 'ndot'] },
    sdRoundedbox2d: { code: `float sdRoundedbox2d( in vec3 p_3d, in vec2 b, in vec4 r ) { vec2 p = p_3d.xy; r.xy = (p.x>0.0)?r.xy : r.zw; r.x  = (p.y>0.0)?r.x  : r.y; vec2 q = abs(p)-b+r.x; float d2d = min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x; return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdRoundedx2d: { code: `float sdRoundedx2d( in vec3 p_3d, in float w, in float r ) { vec2 p = p_3d.xy; p = abs(p); float d2d = length(p-min(p.x+p.y,w)*0.5) - r; return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },
    sdSegment2d: { code: `float sdSegment2d(in vec3 p_3d, in vec2 a, in vec2 b){vec2 p=p_3d.xy;vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);float d2d=length(pa-ba*h);return extrude(d2d,p_3d.z,0.1);}`, dependencies: ['extrude'] },
    sdStar2d: { code: `float sdStar2d(in vec3 p_3d, in float r, in float n, in float m) { vec2 p = p_3d.xy; float an = 3.141593/n; float en = 3.141593/m; vec2  acs = vec2(cos(an),sin(an)); vec2  ecs = vec2(cos(en),sin(en)); float bn = mod(atan(p.x,-p.y),2.0*an) - an; p = length(p)*vec2(cos(bn),abs(sin(bn))); p -= r*acs; p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y); float d2d = length(p)*sign(p.x); return extrude(d2d, p_3d.z, 0.1);}`, dependencies: ['extrude'] },
    sdTrapezoid2d: { code: `float sdTrapezoid2d( in vec3 p_3d, float r1, float r2, float he ) { vec2 p = p_3d.xy; vec2 k1 = vec2(r2,he); vec2 k2 = vec2(r2-r1,2.0*he); p.x = abs(p.x); vec2 ca = vec2(p.x-min(p.x,(p.y<0.0)?r1:r2), abs(p.y)-he); vec2 cb = p - k1 + k2*clamp( dot(k1-p,k2)/dot2(k2), 0.0, 1.0 ); float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0; float d2d = s*sqrt( min(dot2(ca),dot2(cb)) ); return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude', 'dot2'] },
    sdTriangle2d: { code: `float sdTriangle2d( in vec3 p_3d, in vec2 p0, in vec2 p1, in vec2 p2 ) { vec2 p = p_3d.xy; vec2 e0 = p1-p0, e1 = p2-p1, e2 = p0-p2; vec2 v0 = p -p0, v1 = p -p1, v2 = p -p2; vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 ); vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 ); vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 ); float s = sign( e0.x*e2.y - e0.y*e2.x ); float d2d = sqrt(min(min(dot2(pq0),dot2(pq1)),dot2(pq2))) * s; return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude', 'dot2'] },
    sdVesica2d: { code: `float sdVesica2d( vec3 p_3d, float w, float h ) { vec2 p = p_3d.xy; p = abs(p); float b = sqrt(w*w-h*h); float d2d = ((p.y-h)*b>p.x*h) ? length(p-vec2(0.0,h)) : length(p-vec2(-b,0))-w; return extrude(d2d, p_3d.z, 0.1); }`, dependencies: ['extrude'] },

    // --- Combinators ---
    opU: { code: `vec2 opU( vec2 d1, vec2 d2 ) { return (d1.x<d2.x) ? d1 : d2; }`, dependencies: [] },
    opS: { code: `vec2 opS( vec2 d1, vec2 d2, float k ) { float h = clamp(0.5+0.5*(d2.x-d1.x)/k,0.0,1.0); float d=mix(d2.x,d1.x,h)-k*h*(1.0-h); float m=mix(d2.y, d1.y,h); return vec2(d, m); }`, dependencies: [] },
    opD: { code: `vec2 opD( vec2 d1, vec2 d2 ) { return (d1.x>-d2.x) ? d1 : vec2(-d2.x, d2.y); }`, dependencies: [] },
    opI: { code: `vec2 opI( vec2 d1, vec2 d2 ) { return (d1.x>d2.x) ? d1 : d2; }`, dependencies: [] },
    opXor: { code: `vec2 opXor(vec2 d1, vec2 d2) { float d=max(min(d1.x,d2.x),-max(d1.x,d2.x)); return vec2(d,(d1.x<d2.x)?d1.y:d2.y);}`, dependencies: [] },
    opSS: { code: `vec2 opSS(vec2 d1,vec2 d2,float k){float h=clamp(0.5-0.5*(d2.x+d1.x)/k,0.0,1.0);float d=mix(d2.x,-d1.x,h)+k*h*(1.0-h);float m=mix(d2.y,d1.y,h);return vec2(d,m);}`, dependencies: [] },
    opSI: { code: `vec2 opSI(vec2 d1,vec2 d2,float k){float h=clamp(0.5-0.5*(d2.x-d1.x)/k,0.0,1.0);float d=mix(d2.x,d1.x,h)+k*h*(1.0-h);float m=mix(d2.y,d1.y,h);return vec2(d,m);}`, dependencies: [] },
    opRound: { code: `vec2 opRound(vec2 d, float r) { return vec2(d.x - r, d.y); }`, dependencies: [] },
    opPipe: { code: `vec2 opPipe(vec2 d1, vec2 d2, float r) { return vec2(length(vec2(d1.x, d2.x)) - r, opU(d1, d2).y); }`, dependencies: ['opU'] },
    opEngrave: { code: `vec2 opEngrave(vec2 d1, vec2 d2, float r) { return vec2(max(d1.x, d2.x - r), opU(d1, d2).y); }`, dependencies: ['opU'] },
    opGroove: { code: `vec2 opGroove(vec2 d1, vec2 d2, float r) { return vec2(max(d1.x, min(d2.x, -d2.x + r)), opU(d1, d2).y); }`, dependencies: ['opU'] },
    opTongue: { code: `vec2 opTongue(vec2 d1, vec2 d2, float r) { return vec2(min(d1.x, max(d2.x, -d2.x + r)), opU(d1, d2).y); }`, dependencies: ['opU'] },
    opStairs: { code: `vec2 opStairs( vec2 d1, vec2 d2, float r, float n ) { float s=r/n; float u=d2.x-r; return opU(d1,vec2(min(d2.x,0.5*(u+d1.x+abs(mod(u-d1.x,2.0*s)-s))),d2.y));}`, dependencies: ['opU'] },

    // --- Transformations ---
    opTx: { code: `vec3 opTx( vec3 p, vec3 t ) { return p-t; }`, dependencies: [] },
    opElongate: { code: `vec3 opElongate( vec3 p, vec3 h ) { return p - clamp( p, -h, h ); }`, dependencies: [] },
    rotationMatrix: { code: `mat3 rotationMatrix(vec3 axis, float angle) { axis = normalize(axis); float s=sin(angle); float c=cos(angle); float oc=1.0-c; return mat3(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s, oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s, oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c); }`, dependencies: [] },
    opRot: { code: `vec3 opRot( vec3 p, vec3 axis, float angle) { return inverse(rotationMatrix(axis, angle)) * p; }`, dependencies: ['rotationMatrix'] },
    opRep: { code: `vec3 opRep( vec3 p, vec3 spacing ) { return mod(p,spacing)-0.5*spacing; }`, dependencies: [] },
    opMirrorRepeat: { code: `vec3 opMirrorRepeat(vec3 p, vec3 s){vec3 id=round(p/s);vec3 r=p-s*id;if(mod(id.x,2.)>0.5)r.x=-r.x;if(mod(id.y,2.)>0.5)r.y=-r.y;if(mod(id.z,2.)>0.5)r.z=-r.z;return r;}`, dependencies: [] },
    opLimitedRepeat: { code: `vec3 opLimitedRepeat(vec3 p,vec3 s,vec3 l){return p-s*clamp(round(p/s),-l,l);}`, dependencies: [] },
    opRectangularRepeat: { code: `vec3 opRectangularRepeat(vec3 p,vec2 s,float spacing){vec2 q=p.xy;q=abs(q/spacing)-(s*0.5-0.5);if(q.x<q.y)q=q.yx;q.y-=min(0.,round(q.y));p.xy=q*spacing;return p;}`, dependencies: [] },
    opTwist: { code: `vec3 opTwist(vec3 p,float k){float c=cos(k*p.y);float s=sin(k*p.y);mat2 m=mat2(c,-s,s,c);vec3 q=vec3(m*p.xz,p.y);return q;}`, dependencies: [] },
    opBend: { code: `vec3 opBend(vec3 p,float k){float c=cos(k*p.x);float s=sin(k*p.x);mat2 m=mat2(c,-s,s,c);vec3 q=vec3(m*p.xy,p.z);return q;}`, dependencies: [] },
    opMirror: { code: `vec3 opMirror( vec3 p ){ return abs(p); }`, dependencies: [] },
    opMirrorX: { code: `vec3 opMirrorX(vec3 p) { p.x = abs(p.x); return p; }`, dependencies: [] },
    opMirrorY: { code: `vec3 opMirrorY(vec3 p) { p.y = abs(p.y); return p; }`, dependencies: [] },
    opMirrorZ: { code: `vec3 opMirrorZ(vec3 p) { p.z = abs(p.z); return p; }`, dependencies: [] },

    // --- Alterations ---
    opOnion: { code: `vec2 opOnion(vec2 d, float thickness) { return vec2(abs(d.x) - thickness, d.y); }`, dependencies: [] },
    opHalve: { code: `vec2 opHalve(vec2 d, vec3 p, float dir) { float ps=0.;if(dir==0.)ps=p.y;else if(dir==1.)ps=-p.y;else if(dir==2.)ps=-p.x;else if(dir==3.)ps=p.x;return vec2(max(d.x,ps),d.y);}`, dependencies: [] },
    
    // --- Scene Functions ---
    getNormal: { code: `vec3 getNormal(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}`, dependencies: [] },
    calcSoftshadow: { code: `float calcSoftshadow(in vec3 ro,in vec3 rd,float k){float res=1.;float t=.01;for(int i=0;i<32;i++){float h=map(ro+rd*t).x;if(h<.001)return 0.;res=min(res,k*h/t);t+=h;}return res;}`, dependencies: [] },
    
    // --- Post-Processing ---
    post_invert: { code: `vec3 post_invert(vec3 c, vec2 uv) { return 1.0 - c; }`, dependencies: [] },
    post_brightness: { code: `vec3 post_brightness(vec3 c, vec2 uv, float amount) { return c + amount; }`, dependencies: [] },
    post_contrast: { code: `vec3 post_contrast(vec3 c, vec2 uv, float amount) { return (c - 0.5) * amount + 0.5; }`, dependencies: [] },
    post_edge: { code: `vec3 post_edge(vec3 c, vec2 uv) { vec3 dx = dFdx(c); vec3 dy = dFdy(c); float edge = length(vec3(length(dx), length(dy), 0.0)); return vec3(smoothstep(0.01, 0.05, edge)); }`, dependencies: [] },
};