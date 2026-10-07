import * as THREE from "three";
import { gsap } from "@/lib/gsap";

/*
 * Full-screen WebGL slideshow for the hero headers.
 * - smoky "coffee pour" wipe between slides with a crema-gold sheen on the edge
 * - wide screens: the picture sits right and melts into darkness on the left so the headline reads
 * - steam curling up through the frame, slow gold light sweep, vignette, film grain
 * - pointer parallax and warm dust drifting through the light
 * A slide can be a photo or a looping video.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex1;
  uniform sampler2D uTex2;
  uniform vec2 uRes1;
  uniform vec2 uRes2;
  uniform vec2 uView;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uZoom;
  uniform float uFocusX;
  uniform float uFrame;
  uniform float uDim1;
  uniform float uDim2;
  uniform float uSteam;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  vec2 coverUv(vec2 uv, vec2 texRes) {
    float viewAspect = (uView.x * uFrame) / uView.y;
    float texAspect = texRes.x / texRes.y;
    vec2 scale = vec2(1.0);
    if (viewAspect > texAspect) scale.y = texAspect / viewAspect;
    else scale.x = viewAspect / texAspect;
    vec2 offset = vec2((1.0 - scale.x) * uFocusX, (1.0 - scale.y) * 0.5);
    return uv * scale + offset;
  }

  vec3 sampleImg(sampler2D tex, vec2 res, vec2 uv, vec2 distort, float dim) {
    uv.x = (uv.x - (1.0 - uFrame)) / uFrame;
    float fade = mix(1.0, smoothstep(-0.05, 0.55, uv.x), step(uFrame, 0.99));
    vec2 c = uv - 0.5;
    c /= uZoom;
    c += uMouse * 0.014;
    vec2 u = coverUv(c + 0.5 + distort, res);
    u = clamp(u, 0.001, 0.999);
    vec3 col = texture2D(tex, u).rgb * dim;
    // age the picture toward an old sepia print, like the printed menu's artwork
    float l = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(l) * vec3(1.14, 0.93, 0.68), 0.45);
    return col * fade;
  }

  void main() {
    vec2 uv = vUv;
    float n = fbm(uv * 3.0 + uTime * 0.05);

    // smoky wipe rising from the bottom-right, like milk folding into espresso
    float edge = uProgress * 1.7 - 0.3;
    float field = (1.0 - uv.x) * 0.55 + (1.0 - uv.y) * 0.25 + n * 0.5;
    float mask = smoothstep(edge - 0.09, edge + 0.09, field);
    float band = smoothstep(0.14, 0.0, abs(field - edge)) * step(0.001, uProgress) * step(uProgress, 0.999);

    vec2 d1 = vec2(n - 0.5, n * 0.4) * 0.09 * uProgress;
    vec2 d2 = vec2(n - 0.5, n * 0.4) * 0.09 * (1.0 - uProgress);
    vec3 a = sampleImg(uTex1, uRes1, uv, d1, uDim1);
    vec3 b = sampleImg(uTex2, uRes2, uv, d2, uDim2);
    vec3 col = mix(b, a, mask);

    // crema-gold at the wipe edge
    col += band * vec3(0.55, 0.36, 0.14);

    // steam curling up through the frame
    vec2 sp = vec2(uv.x * 2.2 + sin(uv.y * 3.0 + uTime * 0.25) * 0.25, uv.y * 1.4 - uTime * 0.07);
    float steam = smoothstep(0.52, 0.95, fbm(sp * 2.0 + vec2(0.0, n)));
    steam *= smoothstep(0.0, 0.45, uv.y) * smoothstep(1.0, 0.55, uv.y);
    col += steam * uSteam * vec3(0.95, 0.88, 0.78);

    // slow gold light sweep catching the highlights
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float sweepPos = fract(uTime * 0.04) * 2.4 - 0.7;
    float diag = uv.x * 0.85 + uv.y * 0.35;
    float sweep = smoothstep(0.2, 0.0, abs(diag - sweepPos));
    col += sweep * smoothstep(0.15, 0.7, lum) * 0.2 * vec3(1.0, 0.82, 0.5);

    // vignette
    vec2 v = uv - 0.5;
    col *= smoothstep(0.95, 0.25, length(v * vec2(1.1, 1.3)));

    // film grain
    col += (hash(uv * uView + fract(uTime) * 100.0) - 0.5) * 0.04;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const dustVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.12 + aSeed * 6.28) * 0.06 + uMouse.x * 0.03 * aSize * 0.3;
    p.y += mod(uTime * 0.02 * (0.4 + aSeed) + aSeed * 2.0, 2.2) - 1.1;
    p.y += uMouse.y * 0.03 * aSize * 0.3;
    vAlpha = 0.25 + 0.75 * abs(sin(uTime * 0.6 + aSeed * 20.0));
    gl_Position = vec4(p.xy, 0.0, 1.0);
    gl_PointSize = aSize;
  }
`;

const dustFragment = /* glsl */ `
  precision highp float;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(1.0, 0.82, 0.52, a * vAlpha * 0.55);
  }
`;

export interface HeroSlideMedia {
  src: string;
  /** 0 = keep left edge in frame, 1 = keep right edge */
  focusX: number;
  /** brightness multiplier, for very bright pictures */
  dim?: number;
  /** a looping, muted background video instead of a photo */
  video?: boolean;
  /** still frame shown while a video loads */
  poster?: string;
}

export class HeroScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private material: THREE.ShaderMaterial;
  private dust: THREE.ShaderMaterial;
  private textures: THREE.Texture[] = [];
  private sizes: THREE.Vector2[] = [];
  private videos: HTMLVideoElement[] = [];
  private current = 0;
  private raf = 0;
  private clock = new THREE.Clock();
  private mouseTarget = new THREE.Vector2();
  private visible = true;
  private observer: IntersectionObserver;
  private media: HeroSlideMedia[];
  private canvas: HTMLCanvasElement;

  /**
   * Draws into a fresh <canvas> appended to `host` (removed again on dispose): a canvas whose
   * context was force-lost can never be reused, so remounts must never share one.
   */
  constructor(host: HTMLElement, media: HeroSlideMedia[], onReady?: () => void) {
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 h-full w-full";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    this.canvas = canvas;
    this.media = media;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x241811);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTex1: { value: null },
        uTex2: { value: null },
        uRes1: { value: new THREE.Vector2(1, 1) },
        uRes2: { value: new THREE.Vector2(1, 1) },
        uView: { value: new THREE.Vector2(1, 1) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uZoom: { value: 1.04 },
        uFocusX: { value: media[0].focusX },
        uFrame: { value: 1 },
        uDim1: { value: media[0].dim ?? 1 },
        uDim2: { value: media[0].dim ?? 1 },
        uSteam: { value: 0.07 },
      },
      depthTest: false,
    });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material));

    // warm dust
    const count = 150;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const dpr = Math.min(window.devicePixelRatio, 2);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = Math.random() * 2 - 1;
      pos[i * 3 + 1] = Math.random() * 2 - 1;
      size[i] = (Math.random() * 2.8 + 0.8) * dpr;
      seed[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    this.dust = new THREE.ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } },
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    this.scene.add(new THREE.Points(geo, this.dust));

    // A slide counts as ready once it has anything to show (a video's poster is enough),
    // so a large video never holds up the preloader.
    const ready = new Set<number>();
    const settle = (i: number, tex: THREE.Texture, w: number, h: number) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      const previous = this.textures[i];
      this.textures[i] = tex;
      this.sizes[i] = new THREE.Vector2(w, h);
      if (i === this.current) {
        const u = this.material.uniforms;
        u.uTex1.value = tex;
        u.uTex2.value = tex;
        u.uRes1.value = this.sizes[i];
        u.uRes2.value = this.sizes[i];
      }
      if (previous && previous !== tex) previous.dispose();
      ready.add(i);
      if (ready.size === media.length) onReady?.();
    };

    const loader = new THREE.TextureLoader();
    media.forEach((m, i) => {
      if (m.video) {
        const video = document.createElement("video");
        video.src = m.src;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "auto";
        video.crossOrigin = "anonymous";
        this.videos[i] = video;
        let playing = false;
        // Show the poster until the first video frame is decoded
        if (m.poster) {
          loader.load(m.poster, (tex) => {
            if (playing) return tex.dispose();
            const img = tex.image as HTMLImageElement;
            settle(i, tex, img.width, img.height);
          });
        }
        video.addEventListener(
          "loadeddata",
          () => {
            playing = true;
            settle(i, new THREE.VideoTexture(video), video.videoWidth, video.videoHeight);
          },
          { once: true },
        );
        // If the file fails and there's no poster, don't hold the preloader forever
        video.addEventListener("error", () => !m.poster && onReady?.(), { once: true });
        video.play().catch(() => {});
      } else {
        loader.load(m.src, (tex) => {
          const img = tex.image as HTMLImageElement;
          settle(i, tex, img.width, img.height);
        });
      }
    });

    this.resize();
    window.addEventListener("resize", this.resize);
    window.addEventListener("pointermove", this.onPointer);
    this.observer = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      // Pause videos while the hero is off-screen
      this.videos.forEach((v, i) => {
        if (!v) return;
        if (this.visible && i === this.current) v.play().catch(() => {});
        else v.pause();
      });
    });
    this.observer.observe(canvas);
    this.tick();
  }

  /** Smoky wipe to another slide. */
  goTo(index: number, duration = 1.9) {
    if (index === this.current || !this.textures[index]) return;
    const u = this.material.uniforms;
    const video = this.videos[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    u.uTex1.value = this.textures[this.current];
    u.uRes1.value = this.sizes[this.current];
    u.uDim1.value = this.media[this.current].dim ?? 1;
    u.uTex2.value = this.textures[index];
    u.uRes2.value = this.sizes[index];
    u.uDim2.value = this.media[index].dim ?? 1;
    u.uProgress.value = 0;
    const leaving = this.videos[this.current];
    gsap.killTweensOf(u.uProgress);
    gsap.to(u.uProgress, { value: 1, duration, ease: "power3.inOut", onComplete: () => leaving?.pause() });
    gsap.to(u.uFocusX, { value: this.media[index].focusX, duration, ease: "power3.inOut" });
    gsap.fromTo(u.uZoom, { value: 1.14 }, { value: 1.04, duration: 7, ease: "power2.out" });
    this.current = index;
  }

  intro() {
    gsap.fromTo(this.material.uniforms.uZoom, { value: 1.35 }, { value: 1.04, duration: 3.4, ease: "expo.out" });
  }

  private onPointer = (e: PointerEvent) => {
    this.mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  };

  private resize = () => {
    const parent = this.canvas.parentElement!;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    this.renderer.setSize(w, h, false);
    this.material.uniforms.uView.value.set(w, h);
    // wide screens: the picture sits right and melts into darkness behind the headline
    this.material.uniforms.uFrame.value = w / h > 1.2 ? 0.8 : 1;
    // Resizing wipes the canvas; redraw now rather than leaving a blank frame until the next tick
    this.renderer.render(this.scene, this.camera);
  };

  private tick = () => {
    this.raf = requestAnimationFrame(this.tick);
    if (!this.visible) return;
    const t = this.clock.getElapsedTime();
    const u = this.material.uniforms;
    u.uTime.value = t;
    (u.uMouse.value as THREE.Vector2).lerp(this.mouseTarget, 0.04);
    this.dust.uniforms.uTime.value = t;
    this.dust.uniforms.uMouse.value.copy(u.uMouse.value);
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("pointermove", this.onPointer);
    this.observer.disconnect();
    this.videos.forEach((v) => {
      if (!v) return;
      v.pause();
      v.removeAttribute("src");
      v.load();
    });
    this.textures.forEach((t) => t?.dispose());
    this.material.dispose();
    this.dust.dispose();
    this.renderer.dispose();
    // browsers cap live WebGL contexts (~16); free this one immediately on page change
    this.renderer.forceContextLoss();
    this.canvas.remove();
  }
}
