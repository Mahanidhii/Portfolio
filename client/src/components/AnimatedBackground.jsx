import { useEffect, useRef } from 'react';

/**
 * WebGL animated particle canvas — the neural-node shader from the Stitch design.
 * Renders floating cyan particles that react to mouse position.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth  || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
      }
    }

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        vec3 color = vec3(0.04, 0.04, 0.07);

        // Subtle grid
        vec2 gridUv = fract(uv * 20.0);
        float grid = smoothstep(0.0, 0.02, gridUv.x) * smoothstep(1.0, 0.98, gridUv.x);
        grid *= smoothstep(0.0, 0.02, gridUv.y) * smoothstep(1.0, 0.98, gridUv.y);
        color += (1.0 - grid) * 0.015;

        // Neural node particles
        for (float i = 0.0; i < 30.0; i++) {
          float h = hash(vec2(i, 1.23));
          vec2 pos = vec2(hash(vec2(h, 0.45)), hash(vec2(h, 0.67)));
          pos.x += sin(u_time * 0.1 + h * 6.28) * 0.1;
          pos.y += cos(u_time * 0.15 + h * 6.28) * 0.1;

          float dist = length(uv - pos);
          float glow = 0.0008 / (dist + 0.001);

          vec3 accent = vec3(0.0, 0.86, 0.93); // primary-fixed-dim
          color += glow * accent * (0.5 + 0.5 * sin(u_time + h * 10.0));

          float mouseDist = length(uv - mouse);
          if (mouseDist < 0.2) {
            float mouseGlow = smoothstep(0.2, 0.0, mouseDist) * 0.08;
            color += mouseGlow * accent * 0.2;
          }
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uRes   = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let rafId;
    function render(t) {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime)  gl.uniform1f(uTime, t * 0.001);
      if (uRes)   gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ opacity: 0.5 }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} aria-hidden="true" />
    </div>
  );
}
