# Optimizing Real-Time Reconnection in Zulip: My First Open Source Contribution

**Project:** [Zulip](https://zulip.com/) (Open Source Team Chat)  
**Pull Request:** [#37039 - watchdog: Improve unsuspend responsiveness using Page Lifecycle API](https://github.com/zulip/zulip/pull/37039)  
**Tech Stack:** TypeScript, JavaScript, Page Lifecycle API

## The Problem: The 5-Second Lag

Zulip relies on a mechanism called the `watchdog` to ensure the client stays connected to the server. Previously, this watchdog functioned on a "polling" system. It would check the system time roughly every 5 seconds to see if a significant amount of time had passed (indicating the computer had been asleep).

While functional, this created a noticeable UX friction. If a user opened their laptop immediately after a check had occurred, the application would sit frozen for up to 5 seconds before the next check triggered a reconnection. In a real-time chat app, a 5-second delay every time you wake your computer is a significant annoyance.

## The Solution: Event-Driven Architecture

I tackled this by shifting the logic from a passive polling model to an active event-driven model.

Instead of just waiting for the timer to tick, I implemented the modern **Page Lifecycle API**, specifically the `resume` event. This event fires immediately when the browser detects that the system has woken up from a frozen state. I also added support for the `pageshow` event to handle the Back-Forward Cache (BFCache), ensuring the app reconnects instantly even when navigating back to a cached page.

**Key Changes:**

- Added event listeners for `resume` and `pageshow`.
- Ensured immediate execution of the `unsuspend` logic upon these events.
- Added safeguards to ensure the code works in Node.js environments (where `window` and `document` are not defined).

## The Challenge: Testing "Time"

The hardest part of this contribution wasn't the event listeners themselves; it was the testing.

The existing `watchdog` code had side effects (timers starting automatically) that made it difficult to test in a controlled environment. I couldn't simply "wait" for the computer to sleep in a unit test.

To solve this, I had to refactor the initialization logic of the watchdog module. I wrapped the setup code in an exported function, allowing the test suite to manually reset and initialize the watchdog. This enabled me to mock the passage of time and simulate system suspension without actually freezing the test runner.

## The Outcome & Learnings

This was my first significant open-source contribution, and it taught me that **code is only as good as its tests.**

Writing the feature took an hour; refactoring the code to be testable took days. I learned how to navigate a large, existing codebase, communicate with maintainers, and handle edge cases (like server-side rendering environments).

The Pull Request is currently under review. Once merged, this change will eliminate the "wake-up lag" for Zulip users, making the application feel snappy and truly real-time.
