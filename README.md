# 3D Engineering Portfolio
Feel free to fork
A modern, interactive 3D portfolio website built with React, React Three Fiber (R3F), and Drei. This website showcases your journey through various engineering roles in an immersive 3D environment.

## Demo
 [Live demo](http://seanlon.site)
![Image Snapshot 1](https://www.seanlon.site/snapshot1.png)
![Image Snapshot 2](https://www.seanlon.site/snapshot2.png)

## Credits
1. Windsurf
2. Readplayer
3. Polypizza

## Features

- Interactive 3D environment
- Floating role titles with dynamic animations
- Responsive design
- Modern UI with Tailwind CSS
- Smooth animations with Framer Motion

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```


4. Create your avatar and download the file replacement
- Read [How create my own readyplayer avatar](https://docs.readyplayer.me/ready-player-me/what-is-ready-player-me)
```bash
readyplayer.me
```
## Technical Stack

- React
- React Three Fiber (R3F)
- Drei
- Three.js
- Tailwind CSS
- Framer Motion
- Vite

## Note

Make sure to add the Inter Bold font file in the `/public/fonts/` directory as `Inter_Bold.json` for the 3D text to work properly.


## Deploy your site

- Read [How deploy github](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- Run `npm build`
- Copy all content from `dist/<contents-here>`
- Switch to `gh-pages` branch, then paste contents from `dist/<contents-here>`