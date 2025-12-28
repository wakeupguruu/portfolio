## Overview

EdVid is an AI-powered educational video generator designed to simplify the creation of complex explanatory content. It leverages **Manim** (Mathematical Animation Engine) to programmatically generate high-quality animations, making it easier for educators and creators to visualize abstract concepts without deep video editing expertise.

The core idea was to bridge the gap between technical script-writing and visual output, allowing users to focus on the _content_ rather than the _animation curves_.

## Problem

Creating high-quality educational videos, especially those involving math or physics, is incredibly time-consuming.

- **Traditional tools** (After Effects, Premiere) have a steep learning curve.
- **Manim** is powerful but requires writing raw Python code, which isn't accessible to everyone.
- **Consistency** is hard to maintain across a series of videos when doing everything manually.

## Solution

EdVid provides a web-based interface where users can input a script or a set of key concepts. The system then:

1.  **Analyzes the text** using an LLM to identify key entities and relationships.
2.  **Generates Manim code** corresponding to those visualizations.
3.  **Renders the scene** in the background.
4.  **Stitches the video** together with voiceover (if selected).

This transforms a hours-long workflow into a minutes-long process, democratization access to high-quality educational animations.

## Architecture

The system is built as a modern web application with a heavy backend processing pipeline.

- **Frontend**: Next.js (React) for the dashboard and editor.
- **Backend API**: Python (FastAPI) to handle the logic and interface with Manim.
- **Queue System**: Redis/Celery for handling long-running rendering tasks.
- **Storage**: AWS S3 for storing generated assets and final videos.

## Challenges

### 1. Sandboxing Executable Code

Allowing an LLM to generate code that is then executed on the server is inherently risky. We had to build a robust **sandboxing environment** (using Docker containers) to ensure that the generated Manim code couldn't access the host system or network in unauthorized ways.

### 2. Latency

Video rendering is CPU-intensive. To keep the UI responsive, we implemented a **WebSocket connection** to stream progress updates back to the client in real-time. This gave users immediate feedback even if the final render took a few minutes.

## Learnings

Building EdVid reinforced the importance of **asynchronous architecture** for compute-heavy applications. Initially, we tried to handle requests synchronously, which led to timeouts and a poor user experience. Moving to a job queue architecture was a critical pivot that made the system scalable.

It also highlighted the current limitations of LLMs in generating perfect syntactic code for niche libraries like Manim. We had to implement a **self-correction loop** where the system attempts to run the code, catches errors, feeds them back to the LLM, and retries.
