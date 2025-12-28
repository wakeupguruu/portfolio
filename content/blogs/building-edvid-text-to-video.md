## I Tried to Turn Text Into Videos

### This Is What It Cost Me.

If you’ve ever watched an educational YouTube video and thought:

> _“How hard can this be?”_

Congratulations. You’re as naive as I was.

This is the story of **EdVid** — a system I built, broke, rebuilt, doubted, and eventually shipped.  
EdVid turns text prompts into animated educational videos using AI-generated **Manim** code.

It sounds fancy.  
It is fancy.  
It’s also painful.

---

## How the Idea Actually Started

Before EdVid had a name, a repository, or even a plan, it started with a **3Blue1Brown** video.

Watching Grant Sanderson explain math using clean, almost magical animations was the first time I realized something important:

> _This isn’t just animation. This is code._

That moment stuck with me.

I’m a visual learner. If I can’t see something — really see it — I struggle to understand it. This applies to math, physics, chemistry, anything abstract. Reading paragraphs never worked as well as watching ideas unfold visually.

So the thought naturally formed:

> _What if someone could enter a topic and immediately see it explained visually?_

At the time, it stayed just that — a thought.

---

## From Thought to Project

Weeks later, when the idea was almost forgotten, I watched a video by **Harkirat Singh**. He was casually discussing his ideas for 2025, talking about LLMs, AI, and then briefly mentioned using **Manim** to generate educational content.

That was the moment of validation.

When someone experienced independently arrives at the same direction you were already thinking about, you realize you’re not completely delusional.

That’s when the idea stopped being a thought and became **EdVid**.

---

## What EdVid Actually Does

At a high level, EdVid:

- Takes a user prompt via chat
- Sends it to an AI model (Claude)
- Receives executable Manim code
- Renders scenes into videos
- Merges them into a final output
- Stores state so videos can be continued later

Simple.

Right?

---

## The Lowest Point

The lowest point wasn’t a bug.  
It wasn’t a crash.  
It was running out of money.

Most of the system was already built, which somehow made it worse. I remember thinking:

> _What’s the point of finishing this? No one cares. I’m already broke._

Progress slowed. Some days I worked for hours.  
Some days I didn’t work at all.

That’s the part no one romanticizes.

---

## What I Learned (The Honest Part)

Building EdVid taught me things tutorials never will:

- Code generation is useless without execution discipline
- UX matters even for developer tools
- Video pipelines punish sloppy architecture
- Side effects will destroy your tests if you let them

Most importantly:

> **Shipping something real forces growth faster than consuming content ever will.**

---

## What I’m Actually Proud Of

Here’s the part I don’t downplay.

This system was built **entirely on my own initiative**.

- No step-by-step tutorials
- No blog posts explaining how to do it
- No YouTube playlist titled _“Build an AI video generator in 10 hours”_

To the best of my knowledge, I may be one of the first people to combine:

**AI-generated code → Manim → automated video rendering**  
into a single working system.

Is it polished? No.  
Does it break? Yes.  
Does it work? Also yes.

If you’re building something ambitious and it feels harder than expected, that’s not a red flag — that’s a signal you’re learning something real.

---

## Project Link

You can check out the project here:  
👉 **GitHub:** `https://github.com/wakeupguruu/EdVid`
