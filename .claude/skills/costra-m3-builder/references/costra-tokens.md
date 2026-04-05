# Costra Design Tokens — Complete Reference

Use these tokens for every component. Never use raw hex values — always reference the token name so the system stays consistent.

## Color Palette

### Core Surfaces (dark-first)
| Token              | Hex       | Tailwind Custom      | Usage                            |
|--------------------|-----------|----------------------|----------------------------------|
| `c-black`          | `#050505` | `bg-costra-black`    | Page background, deepest layer   |
| `c-surface`        | `#0A0A0B` | `bg-costra-surface`  | Card backgrounds, panels         |
| `c-surface-2`      | `#111113` | `bg-costra-surface2` | Nested containers, code blocks   |
| `c-surface-3`      | `#18181B` | `bg-costra-surface3` | Hover states, active surfaces    |
| `c-border`         | `#27272A` | `border-costra-border`| Visible borders, dividers       |
| `c-border-subtle`  | `#1C1C1F` | `border-costra-subtle`| Faint separators, section lines |
| `c-muted`          | `#52525B` | `text-costra-muted`  | Disabled text, labels, captions  |
| `c-text-secondary` | `#A1A1AA` | `text-costra-secondary`| Body text, descriptions        |
| `c-text`           | `#FAFAFA` | `text-costra-text`   | Primary text, headings           |
| `c-white`          | `#FFFFFF` | `text-white`         | High-emphasis text on accent     |

### Accent — Electric Lime
| Token              | Hex/Value                  | Usage                                    |
|--------------------|----------------------------|------------------------------------------|
| `c-accent`         | `#C8FF00`                  | Primary accent, CTA buttons, links       |
| `c-accent-dim`     | `#9FCC00`                  | Secondary accent, hover states           |
| `c-accent-glow`    | `rgba(200, 255, 0, 0.12)`  | Glow backgrounds, focus rings            |
| `c-accent-glow-2`  | `rgba(200, 255, 0, 0.06)`  | Subtle background tints                  |

### Semantic Colors
| Token        | Hex       | Usage               |
|--------------|-----------|----------------------|
| `c-success`  | `#22C55E` | Positive states      |
| `c-warning`  | `#F59E0B` | Warning states       |
| `c-error`    | `#EF4444` | Error / destructive  |
| `c-info`     | `#3B82F6` | Informational        |

## Typography

### Font Families
| Role      | Font Stack                           | Usage                            |
|-----------|--------------------------------------|----------------------------------|
| Display   | `'Outfit', sans-serif`               | Headings, titles, display text   |
| Body      | `'Outfit', sans-serif`               | Paragraphs, descriptions         |
| Mono      | `'JetBrains Mono', 'Space Mono', monospace` | Code, labels, captions, badges |

### Type Scale
| Style    | Size    | Weight | Line Height | Letter Spacing | Font    | Extra             |
|----------|---------|--------|-------------|----------------|---------|-------------------|
| Display1 | 4.5rem  | 900    | 1           | -0.03em        | Display | uppercase         |
| Display2 | 3rem    | 800    | 1.05        | -0.02em        | Display | uppercase         |
| H1       | 2.25rem | 700    | 1.15        | -0.015em       | Display |                   |
| H2       | 1.5rem  | 600    | 1.3         | 0              | Display |                   |
| H3       | 1.125rem| 600    | 1.4         | 0              | Display |                   |
| Body     | 1rem    | 400    | 1.6         | 0              | Body    | text-secondary    |
| Caption  | 0.75rem | 400    | 1.5         | 0.05em         | Mono    | uppercase, muted  |
| Code     | 0.875rem| 500    | 1.5         | 0              | Mono    | accent color      |
| Label    | 0.65-0.7rem | 400 | 1.8        | 0.08-0.15em    | Mono    | uppercase, muted  |

## Spacing (4px base)
| Token      | Value | Usage examples                     |
|------------|-------|------------------------------------|
| `space-1`  | 4px   | Icon-to-text gap, tight padding    |
| `space-2`  | 8px   | Badge padding, small gaps          |
| `space-3`  | 12px  | List item gaps, card inner padding |
| `space-4`  | 16px  | Standard padding, form gaps        |
| `space-5`  | 20px  | Medium padding                     |
| `space-6`  | 24px  | Card padding, section gaps         |
| `space-8`  | 32px  | Large padding, hero elements       |
| `space-10` | 40px  | Section spacing                    |
| `space-12` | 48px  | Major section padding              |
| `space-16` | 64px  | Page-level vertical spacing        |
| `space-20` | 80px  | Hero spacing                       |
| `space-24` | 96px  | Section top/bottom                 |

## Border Radius

**IMPORTANT:** While the design system foundations document specifies 0px as default, the actual HiFi production screens use generous rounding. Always follow these values from the real designs:

| Element          | Radius    | Notes                                  |
|------------------|-----------|----------------------------------------|
| CTA Buttons      | 14px      | Pill-ish, generous rounding            |
| Cards/Containers | 16px      | Main content cards, form cards         |
| Inner cards      | 14px      | Nested cards, list groups              |
| Icon containers  | 12px      | Small rounded squares for icons        |
| OTP boxes        | 12px      | Rounded code input squares             |
| Search bars      | 14px      | Matches card rounding                  |
| Logo icon        | 4-8px     | Slightly rounded square                |
| Tags/Badges      | 9999px    | Full pill shape                        |
| Filter chips     | 9999px    | Full pill shape                        |
| Avatars          | 9999px    | Full circle                            |
| Alert banners    | 12-14px   | Rounded to match cards                 |
| Country code chip| 10px      | Rounded square (+94 prefix)            |

## Elevation / Shadows
| Token        | Value                           | Usage                  |
|--------------|---------------------------------|------------------------|
| `shadow-xs`  | `0 1px 2px rgba(0,0,0,0.4)`    | Subtle lift            |
| `shadow-sm`  | `0 2px 4px rgba(0,0,0,0.4)`    | Cards                  |
| `shadow-md`  | `0 4px 12px rgba(0,0,0,0.5)`   | Dropdowns, popovers    |
| `shadow-lg`  | `0 8px 24px rgba(0,0,0,0.6)`   | Modals                 |
| `shadow-xl`  | `0 16px 48px rgba(0,0,0,0.7)`  | Hero elements          |
| `shadow-glow`| `0 0 40px rgba(200,255,0,0.12)` | Accent glow effect    |

Depth is primarily communicated through **surface color shifts** and **border definition**, not heavy shadows. Use shadows sparingly.

## Grid
| Property    | Value   |
|-------------|---------|
| Columns     | 12      |
| Gutter      | 24px    |
| Margin      | 48px (24px on mobile) |
| Max Width   | 1280px  |

### Breakpoints
| Name  | Width  | Columns | Gutter | Margin |
|-------|--------|---------|--------|--------|
| sm    | 640px  | 4       | 16px   | 24px   |
| md    | 768px  | 8       | 20px   | 32px   |
| lg    | 1024px | 12      | 24px   | 48px   |
| xl    | 1280px | 12      | 24px   | 48px   |
| 2xl   | 1536px | 12      | 24px   | 48px   |

## Iconography
- Canvas: 24×24px
- Stroke: 1.5px
- Cap/Join: Round/Round
- Sizes: 16, 20, 24, 32
- Style: Geometric, minimal, sharp — use Lucide icons

## Key Design Principles
1. **Brutalist precision** — sharp edges, 0px radius default, no decorative softness
2. **Dark-first** — #050505 base, surfaces get progressively lighter
3. **Electric lime accent** — used sparingly for CTAs, active states, and focus indicators
4. **Mono for labels** — any caption, badge, status indicator, or metadata uses JetBrains Mono in uppercase with letter-spacing
5. **Minimal elevation** — prefer border definition and surface color shifts over shadows
6. **Intentional whitespace** — 4px-based spacing, every pixel deliberate
