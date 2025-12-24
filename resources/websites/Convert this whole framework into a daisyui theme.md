<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Convert this whole framework into a daisyui theme https://skeleton-framework.github.io/

You can approximate Skeleton as a daisyUI theme by recreating its color palette, typography, and spacing as a custom theme, then using Tailwind utilities for layout instead of Skeleton’s grid.[^1_1][^1_2]

Below is a **starting point** daisyUI custom theme that mimics Skeleton’s look-and-feel (light, spacious, grey borders, blue accents, Raleway-ish typography).

## DaisyUI theme config

In your Tailwind CSS (or main CSS with daisyUI plugin) add a custom theme like this:[^1_2]

```css
@import "tailwindcss";
@plugin "daisyui";

@plugin "daisyui/theme" {
  name: "skeleton-ish";
  default: true;
  prefersdark: false;
  color-scheme: light;

  /* base background & text (similar to Skeleton’s white card + dark text) [web:2] */
  --color-base-100: oklch(99% 0 0);        /* page background */
  --color-base-200: oklch(97% 0 0);        /* subtle panels */
  --color-base-300: oklch(92% 0 0);        /* borders */
  --color-base-content: oklch(24% 0 0);    /* main text */

  /* primary accent – Skeleton uses a fairly flat blue for links/buttons [web:2] */
  --color-primary: oklch(60% 0.12 250);
  --color-primary-content: oklch(98% 0 0);

  /* secondary/accent – muted gray/blue for less important actions [web:2] */
  --color-secondary: oklch(70% 0.04 250);
  --color-secondary-content: oklch(25% 0 0);

  --color-accent: oklch(68% 0.12 200);
  --color-accent-content: oklch(98% 0 0);

  --color-neutral: oklch(35% 0 0);
  --color-neutral-content: oklch(98% 0 0);

  /* state colors – you can tune these to match your project */
  --color-info: oklch(70% 0.1 240);
  --color-info-content: oklch(99% 0 0);
  --color-success: oklch(70% 0.12 150);
  --color-success-content: oklch(99% 0 0);
  --color-warning: oklch(80% 0.12 85);
  --color-warning-content: oklch(26% 0.03 85);
  --color-error: oklch(65% 0.18 25);
  --color-error-content: oklch(99% 0 0);

  /* radii – Skeleton is mostly square with tiny rounding */
  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 0.25rem;

  /* base sizes & border thickness to feel like Skeleton’s thin borders [web:2] */
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;

  /* subtle shadows (Skeleton is mostly flat) */
  --depth: 0.5;
  --noise: 0;
}
```

Then enable the theme in your HTML:

```html
<html data-theme="skeleton-ish">
  <head>
    <!-- Load Raleway from Google Fonts like Skeleton does [web:2] -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        font-family: "Raleway", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 15px; /* Skeleton base is 1.5rem = 15px over 1.6 line-height [web:2] */
        line-height: 1.6;
      }
      h1 { font-size: 5.0rem; line-height: 1.2; }
      h2 { font-size: 4.2rem; line-height: 1.25; }
      h3 { font-size: 3.6rem; line-height: 1.3; }
      h4 { font-size: 3.0rem; line-height: 1.35; }
      h5 { font-size: 2.4rem; line-height: 1.4; }
      h6 { font-size: 1.5rem; line-height: 1.4; }
      /* Match Skeleton’s simple link style [web:2] */
      a {
        color: oklch(60% 0.12 250);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body class="bg-base-100 text-base-content">
    ...
  </body>
</html>
```


## Using daisyUI instead of Skeleton classes

Skeleton’s grid and utilities become Tailwind/daisyUI utilities instead.[^1_1][^1_2]

- Replace Skeleton columns (`.one-half`, `.one-third`, `.twelve.columns`, etc.) with Tailwind grid classes, for example:
    - `.one-half` → `class="w-full md:w-1/2"`
    - `.one-third` → `class="w-full md:w-1/3"`
- Replace utilities like `.u-full-width`, `.u-pull-right`, `.u-text-center` with Tailwind:
    - `.u-full-width` → `w-full`
    - `.u-pull-right` → `float-right`
    - `.u-text-center` → `text-center`[^1_3][^1_1]

For components, use daisyUI but the theme above will make them visually similar to Skeleton:

- Buttons → `class="btn btn-primary"` for Skeleton-style primary actions.
- Forms → `class="input input-bordered w-full"` and `class="select select-bordered"` to mimic normalized heights.[^1_3][^1_2]
- Cards/sections → `class="card bg-base-100 shadow-sm border border-base-300"` to resemble Skeleton panels.[^1_2][^1_1]


## Mapping overview

| Skeleton feature | DaisyUI / Tailwind equivalent |
| :-- | :-- |
| 12-column fluid grid | `grid`, `grid-cols-*`, `md:w-1/2`, `md:w-1/3` etc. |
| Raleway base typography | Global font-family + custom heading sizes |
| 15px base, 1.6 lineheight | `:root { font-size: 15px; line-height: 1.6; }` |
| Blue links/buttons | `--color-primary` in custom theme |
| Utility helpers | Tailwind utilities (`w-full`, `float-right`, etc.) |

If you share a specific Skeleton page or component you want mirrored, an exact daisyUI markup translation can be sketched for that structure.
<span style="display:none">[^1_10][^1_4][^1_5][^1_6][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://www.sitepoint.com/getting-started-with-skeleton-simple-css-boilerplate/

[^1_2]: https://daisyui.com/docs/themes/

[^1_3]: https://skeleton-framework.github.io

[^1_4]: https://www.reddit.com/r/Frontend/comments/2osrqr/skeleton_20_css_framework_looks_like_its_not_dead/

[^1_5]: https://www.reddit.com/r/webdev/comments/2ourvn/skeleton_20_css_framework/

[^1_6]: https://segakuin.com/css/skeleton/

[^1_7]: https://daisyui.com/docs/themes/?lang=en

[^1_8]: https://www.reddit.com/r/sveltejs/comments/xkb0um/css_frameworks_switched_from_bulmaio_to_skeleton/

[^1_9]: https://www.youtube.com/watch?v=CKOH37J1EnI

[^1_10]: https://www.skeleton.dev

