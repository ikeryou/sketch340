uniform vec3 color;
uniform float alpha;

varying vec2 vUv;


void main(void) {
  vec4 dest = vec4(color, 1.0);

  dest.gb *= (0.75 * vUv.x) * 10.0;
  dest.r *= (0.5 * vUv.y) * 20.0;

  gl_FragColor = dest;

}
