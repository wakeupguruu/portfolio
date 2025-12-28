# Saving Eyes, One Slide at a Time

**Project:** [Dark PDF](https://darkpdf.vercel.app/)  
**Repo:** [wakeupguruu/dark-pdf](https://github.com/wakeupguruu/dark-pdf)  
**Tech Stack:** TypeScript, React, PDF.js, Vercel

## The Problem: Late Night Eye Strain

The inspiration for this tool came from a very specific, painful reality: exam season. I found myself pulling all-nighters, staring at hundreds of pages of bright white PDF slides in a dark room. The contrast was blinding, and my eyes were burning.

I tried existing solutions—browser extensions and "dark mode" converters—but the results were disappointing. Most tools either:

1. Simply inverted the colors, turning images into negatives (making diagrams look like crime scenes).
2. Ruined the text formatting entirely.
3. Required sign-ups or uploaded my private study notes to a server.

I didn't want a complex editor; I just wanted to read comfortably without going blind.

## The Solution: A Privacy-First Dark Mode Engine

I built **Dark PDF** to do one thing perfectly: convert documents into a clean, elegant dark mode while preserving the integrity of the content.

Unlike basic color inverters, I focused on a smart conversion logic. The tool targets the background and text specifically—turning the canvas pure black and the text high-contrast white—while attempting to keep images and diagrams natural.

**Key Features:**

- **Smart Inversion:** Backgrounds go dark, text goes white, but images remain intelligible.
- **Privacy First:** Zero server uploads. The conversion logic runs entirely in the browser (client-side), so your documents never leave your machine.
- **No Friction:** No sign-ups, no watermarks, and no installation required. Just drag, drop, and read.

## Technical Approach

The project is built with **TypeScript** for type safety and deployed on **Vercel** for speed.

The core challenge was manipulating the PDF rendering layer. Instead of treating the PDF as a flat image, the tool interacts with the PDF structure to modify the rendering palette before re-assembling it. This ensures that the text remains crisp rather than becoming a blurry, inverted screenshot.

## The Outcome

What started as a personal utility to survive exam week has turned into a deployed web app that anyone can use. I’ve tested it on a wide range of academic papers, slides, and ebooks to ensure the formatting holds up.

It is simple, fast, and does exactly what it says on the tin: gives your eyes the rest they deserve.

_Try it out at [darkpdf.vercel.app](https://darkpdf.vercel.app/)_
