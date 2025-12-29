# GROUND RULES

> [!CAUTION] > **NEVER COMMIT THIS FILE.**
> This file serves as the strict constitution for working on this project.

## Core Directives

1.  **Read Before Acting**: Before making _any_ changes, you must review these rules.
2.  **Zero Tolerance**: Breaking these rules is a violation of trust.

## Technical Rules

3.  **No CSS !important on Dynamic Elements**: Never use the Tailwind `!` modifier (e.g., `text-white!`) or `!important` in CSS on elements that change dynamically. This overrides potential state changes and breaks responsiveness.
4.  **Preserve Desktop Logic**: **NEVER** change the logic or layout of the laptop/desktop version. All changes must be additive or responsive-only (using media queries like `md:` or `lg:`).
5.  **No Inline CSS for Colors**: Do not add new colors using inline styles or arbitrary Tailwind values (e.g., `text-[#123456]`). Always define new colors in `app/globals.css` and use the CSS variable.
6.  **Responsive First**: Mobile designs must strictly match the provided screenshots.
7.  **Clean Code**: Remove unused imports and console logs before finishing a task.
8.  **Verify Builds**: Always run `npm run build` locally before confirming a task is complete.
9.  **Image Optimization**: Use Next.js `<Image>` component; avoid standard `<img>` tags unless necessary for specific SVG cases.
10. **File Naming**: Keep filenames consistent (kebab-case for app files, PascalCase for components).

## Design Rules

11. **Mobile Layout Matches Screenshots**: The mobile view should replicate the provided reference images exactly (Header links visible, specific typography scales, font weights).
12. **Theme Consistency**: Ensure all new elements support both Light and Dark modes.

---

_Last Updated: 2025-12-30_
