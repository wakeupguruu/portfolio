**Update (Jan 2026): This PR has now been merged into Zulip’s main branch.**

I finally did it.

I clicked the green button. I generated Pull Request #37039.

For a student, this is a terrifying threshold. You spend years writing code that only you or your professor will ever see. It is code that lives in a vacuum; if it breaks, nobody cries. But open source is different. Open source is a living, breathing city. When you push code to a project like **Zulip**, you aren't just handing in an assignment; you are attempting to renovate a building while people are still working inside it.

The contribution itself seemed small. I wanted to fix a latency issue.

Zulip is a chat application. It relies on real-time communication. But I noticed a specific flaw in how it handled "waking up."

When you close your laptop lid, your computer suspends. The processor halts. The network dies. Time, for the machine, stops. When you open the lid later, the machine wakes up, but the application doesn't always know that immediately.

I dug into a file called `web/src/watchdog.ts`. I found that the app was using a technique called **polling**.

Polling is the computational equivalent of a child in the backseat asking, "Are we there yet?" repeatedly. The watchdog would check the time, wait five seconds, and check again. If the gap between checks was huge, it knew the computer had slept, and it would trigger a reconnect.

But there is a problem with polling. It relies on luck.

If you wake your computer up one second after the watchdog just checked, the app will sit there, frozen and disconnected, for four more seconds until the timer ticks again.

> "Magnitude without direction is just chaos." - [A random math teacher]()

And chaos is exactly what a user feels when they stare at a frozen screen that should be working.

My fix was to stop asking "Are we there yet?" and instead install a doorbell.

I utilized the **Page Lifecycle API**. Modern browsers have a `resume` event. This is the browser screaming "We are back!" the microsecond the operating system wakes up. I also added listeners for `pageshow` to handle the BFCache (the memory state when you navigate back and forth).

The code change was concise. But the reality of open source is that "concise" does not mean "easy."

The PR is still open. It hasn't been merged yet.

Why? Because testing "time" is a nightmare. To prove my code worked, I had to refactor the entire initialization logic of the watchdog. I had to create a test environment where I could mock the universe, manually freezing and unfreezing time to prove that my event listener was faster than the old polling loop.

I spent days staring at console logs, trying to shave off those five seconds.

And that is where I started to wonder... why?

![Alt Text for accessibility](/images/blog/1.jpg)

Why do we care so much about five seconds? In the grand scheme of the universe, five seconds is a rounding error. It is nothing.

But to a human user, five seconds of latency breaks the immersion. We demand that our tools feel "real-time." We want the screen to react the instant we think of a command. We want the machine to be an extension of our own nervous system.

We treat latency as a bug. We treat delay as a failure.

But here is the catch.

While I was obsessing over making the computer perceive reality instantly, I realized that _you_ don't.

You assume you are seeing this text in real-time. You assume you are feeling the mouse or phone in your hand _right now_.

But you aren't.

Nerve impulses are not instantaneous. They travel at finite speeds. Visual information takes roughly 80 to 100 milliseconds to travel from your retina, through the optic nerve, and be processed by the visual cortex.

This means that everything you are seeing right now happened one-tenth of a second ago.

Your brain knows this. If it showed you the raw feed, the world would feel disjointed. So, your brain cheats. It predicts the future. It constructs a model of what it _thinks_ is happening "now" to compensate for the lag.

This is known as the **Specious Present**.

We are rewriting the code in Zulip to remove a five-second lag because we want the computer to be perfect. We want it to be better than us. We want it to be truly present.

My PR #37039 is currently sitting in a repository, waiting for a human to review it. It is code designed to bridge the gap between "asleep" and "awake" instantly. It is an attempt to make a machine that never hesitates.

But it leaves you with an uncomfortable realization.

If I can fix the latency in a chat application with a few lines of code, who is going to fix the latency in you?

If everything you have ever perceived—every smile, every touch, every word you have ever read—was technically a memory by the time you felt it...

Have you ever actually experienced the present moment, or have you just been buffering this whole time?

![Alt Text for accessibility](/images/blog/2.jpg)
