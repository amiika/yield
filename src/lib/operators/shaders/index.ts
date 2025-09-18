
import type { Category } from '../../types';

// Scene
import { march } from './march';
import { smoothmarch } from './smoothmarch';
import { render } from './render';
import { light } from './light';
import { background } from './background';
import { camera } from './camera';
import { fog } from './fog';
import { shadow } from './shadow';
import { material } from './material';
import { post } from './post';
import { iterations } from './iterations';
import { near } from './near';
import { far } from './far';

// Color & Materials
import { rgb } from './rgb';
import { hsv } from './hsv';
import { wavecolor } from './wavecolor';
import { cnoise } from './cnoise';
import { fluid } from './curl';
import { worley } from './worley';
import { voronoi } from './voronoi';
import { randomcolor } from './randomcolor';
import { julia } from './julia';
import { juliaset } from './juliaset';
import { mandelbrot } from './mandelbrot';
import { mandelbrotset } from './mandelbrotset';
import { glsl } from './glsl';
import { fbm } from './fbm';
import { cloud } from './cloud';
import { texture } from './texture';
import { smoothstep } from './smoothstep';
import { color } from './color';
import { image } from './image';
import { fuse } from './fuse';
import { sprite } from './sprite';

// Post-processing effects
import { invert } from './invert';
import { edge } from './edge';
import { brightness } from './brightness';
import { contrast } from './contrast';

// Utils
import { vec } from './vec';
import { vec2 } from './vec2';
import { vec3 } from './vec3';
import { vec4 } from './vec4';
import { width } from './width';
import { height } from './height';

// Geometries
import { box } from './box';
import { sphere } from './sphere';
import { capsule } from './capsule';
import { cone } from './cone';
import { cylinder } from './cylinder';
import { hexprism } from './hexprism';
import { mandelbox } from './mandelbox';
import { mandelbulb } from './mandelbulb';
import { octahedron } from './octahedron';
import { plane } from './plane';
import { roundbox } from './roundbox';
import { torus } from './torus';
import { torus88 } from './torus88';
import { torus82 } from './torus82';
import { triprism } from './triprism';
import { fractal } from './fractal';
import { psychobox } from './psychobox';
import { topology } from './topology';
// 2D Geometries
import { arc2d } from './arc2d';
import { box2d } from './box2d';
import { circle2d } from './circle2d';
import { cross2d } from './cross2d';
import { ellipse2d } from './ellipse2d';
import { equilateralTriangle2d } from './equilateralTriangle2d';
import { heart2d } from './heart2d';
import { hexagon2d } from './hexagon2d';
import { hexagram2d } from './hexagram2d';
import { isoscelesTriangle2d } from './isoscelesTriangle2d';
import { moon2d } from './moon2d';
import { octogon2d } from './octogon2d';
import { parallelogram2d } from './parallelogram2d';
import { pentagon2d } from './pentagon2d';
import { pie2d } from './pie2d';
import { rhombus2d } from './rhombus2d';
import { roundedbox2d } from './roundedbox2d';
import { roundedx2d } from './roundedx2d';
import { segment2d } from './segment2d';
import { star2d } from './star2d';
import { trapezoid2d } from './trapezoid2d';
import { triangle2d } from './triangle2d';
import { vesica2d } from './vesica2d';
import { shape } from './shape';
import { pathSDF } from './pathSDF';


// Combinators
import { difference } from './difference';
import { smoothUnion } from './smoothUnion';
import { smoothDifference } from './smoothDifference';
import { smoothIntersection } from './smoothIntersection';
import { roundUnion } from './roundUnion';
import { roundIntersection } from './roundIntersection';
import { roundDifference } from './roundDifference';
import { chamferUnion } from './chamferUnion';
import { chamferIntersection } from './chamferIntersection';
import { chamferDifference } from './chamferDifference';
import { pipe } from './pipe';
import { carve } from './engrave';
import { groove } from './groove';
import { tongue } from './tongue';
import { stairsUnion } from './stairsUnion';
import { stairsIntersection } from './stairsIntersection';
import { stairsDifference } from './stairsDifference';

// Transformations / Positioning
import { translate } from './translate';
import { rotatesdf } from './rotatesdf';
import { resize } from './scale';
import { repeat } from './repeat';
import { mirrorRepeat } from './mirrorRepeat';
import { limitedRepeat } from './limitedRepeat';
import { polarRepeat } from './polarRepeat';
import { rectangularRepeat } from './rectangularRepeat';
import { mirror } from './mirror';
import { mirrorX } from './mirrorX';
import { mirrorY } from './mirrorY';
import { mirrorZ } from './mirrorZ';
import { bend } from './bend';
import { twist } from './twist';
import { elongate } from './elongate';
import { transform } from './transform';

// Alterations / Displacements
import { onion } from './onion';
import { round } from './round';
import { halve } from './halve';
import { displace } from './displace';

// Distance Functions
import { distEuclidean } from './distEuclidean';
import { distManhattan } from './distManhattan';
import { distChebychev } from './distChebychev';
import { distMinkowski } from './distMinkowski';

// Demos & High-Level
import { path } from './path';

export const shaders: Category = {
    name: "Shaders",
    description: "Operators for creating 3D scenes with Signed Distance Fields.",
    definitions: {
        // Scene
        march,
        smoothmarch,
        render,
        "light": light,
        background,
        camera,
        fog,
        shadow,
        material,
        post,
        iterations,
        near,
        far,

        // Color & Materials
        cloud,
        cnoise,
        color,
        fluid,
        fbm,
        fuse,
        glsl,
        hsv,
        image,
        julia,
        juliaset,
        mandelbrot,
        mandelbrotset,
        randomcolor,
        rgb,
        sprite,
        texture,
        wavecolor,
        worley,
        voronoi,
        smoothstep,

        // Post-processing effects
        "invert": invert,
        "edge": edge,
        "brightness": brightness,
        "contrast": contrast,

        // Utils
        vec,
        vec2,
        vec3,
        vec4,
        width,
        height,
        
        // Geometries
        box,
        sphere,
        capsule,
        cone,
        cylinder,
        hexprism,
        mandelbox,
        mandelbulb,
        octahedron,
        plane,
        roundbox,
        torus,
        torus88,
        torus82,
        triprism,
        fractal,
        psychobox,
        pathSDF,
        topology,
        // 2D Geometries
        arc2d,
        box2d,
        circle2d,
        cross2d,
        ellipse2d,
        equilateralTriangle2d,
        heart2d,
        hexagon2d,
        hexagram2d,
        isoscelesTriangle2d,
        moon2d,
        octogon2d,
        parallelogram2d,
        pentagon2d,
        pie2d,
        rhombus2d,
        roundedbox2d,
        roundedx2d,
        segment2d,
        shape,
        star2d,
        trapezoid2d,
        triangle2d,
        vesica2d,


        // Combinators
        difference,
        smoothUnion,
        smoothDifference,
        smoothIntersection,
        roundUnion,
        roundIntersection,
        roundDifference,
        chamferUnion,
        chamferIntersection,
        chamferDifference,
        pipe,
        carve,
        groove,
        tongue,
        stairsUnion,
        stairsIntersection,
        stairsDifference,


        // Transformations / Positioning
        translate,
        rotatesdf,
        resize,
        repeat,
        mirrorRepeat,
        limitedRepeat,
        polarRepeat,
        rectangularRepeat,
        mirror,
        mirrorX,
        mirrorY,
        mirrorZ,
        bend,
        twist,
        elongate,
        transform,
        
        // Alterations / Displacements
        displace,
        halve,
        onion,
        round,

        // Distance Functions
        "distEuclidean": distEuclidean,
        "distManhattan": distManhattan,
        "distChebychev": distChebychev,
        "distMinkowski": distMinkowski,
        
        // Demos & High-Level
        path,
    }
};