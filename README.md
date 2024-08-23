Poverty Lightroom™

Simple image editor to learn basic webgl concepts like textures, shaders and buffers. Oh, and to write some C(they call it glsl but only see c) and be thankful for garbage collectors.

I used:

- shadcn/radix for components as does every basic frontend dev nowdays(got bloated real quick, because i didnt know which components im going to need, so i just installed all of them)
- next.js app router
- tailwind
- webgl
- honorable mentions:
  - zustand
  - react-dropzone

How to run:

1. npm install
2. npm run dev
   1. if you're brave u can build it
   2. npm run build
   3. npm start
3. drop in your image or upload it using file browser
4. do your basic edits
5. export it

notes: i got the basic effect sliders working but with abysmal performance, definitely not 60fps, i think shader code itself is fine, its most likely useless rerenders hapenning due to shady useEffect code.
