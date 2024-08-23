const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = a_texCoord;
  }
`

const fragmentShaderSource = `
 precision mediump float;

uniform sampler2D u_image;
uniform float u_contrast;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_exposure;

varying vec2 v_texCoord;

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Apply exposure
    color.rgb *= pow(2.0, u_exposure);
    
    // Apply contrast
    color.rgb = (color.rgb - 0.5) * u_contrast + 0.5;
    
    // Apply brightness
    color.rgb += u_brightness;
    
    // Apply saturation
    vec3 hsv = rgb2hsv(color.rgb);
    hsv.y *= u_saturation;
    color.rgb = hsv2rgb(hsv);
    
    gl_FragColor = color;
}
`

export function initWebGL(
  canvas: HTMLCanvasElement,
): WebGLRenderingContext | null {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported')
    return null
  }

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  return gl
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`compiling shaders error: ${gl.getShaderInfoLog(shader)}`)
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | null {
  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      `error: cant start shader program: ${gl.getProgramInfoLog(program)}`,
    )
    return null
  }

  return program
}

let imageTexture: WebGLTexture | null = null

export function createImageTexture(
  gl: WebGLRenderingContext,
  image: HTMLImageElement,
): WebGLTexture | null {
  if (!imageTexture) {
    imageTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, imageTexture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  }

  gl.bindTexture(gl.TEXTURE_2D, imageTexture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

  return imageTexture
}

let program: WebGLProgram | null = null

export function renderImage(
  gl: WebGLRenderingContext,
  image: HTMLImageElement,
  effects: Record<string, number>,
) {
  if (!program) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    )
    if (!vertexShader || !fragmentShader) return

    program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) return
  }

  gl.useProgram(program)

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  )

  // why not follow same corrdination system
  const texCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0,
      1, // bottom left
      1,
      1, // bottom right
      0,
      0, // top left
      1,
      0, // top right
    ]),
    gl.STATIC_DRAW,
  )

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')
  gl.enableVertexAttribArray(texCoordLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

  createImageTexture(gl, image)

  gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0)
  gl.uniform1f(
    gl.getUniformLocation(program, 'u_contrast'),
    effects.contrast + 1,
  )
  gl.uniform1f(
    gl.getUniformLocation(program, 'u_saturation'),
    effects.saturation + 1,
  )
  gl.uniform1f(
    gl.getUniformLocation(program, 'u_brightness'),
    effects.brightness,
  )
  gl.uniform1f(gl.getUniformLocation(program, 'u_exposure'), effects.exposure)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

// export function applyWatermark() {
//   // to be done
//   // create another texture for watermark?
//   // somehow blend both textures in the shader?
// }
