---
name: costra-m3-builder
description: >
  Build React + Tailwind components from UI screenshots using Material 3 patterns, restyled with 
  Costra's design tokens (dark #050505, lime accent #C8FF00, Outfit + JetBrains Mono, rounded 
  cards/buttons, mobile-first). Costra is a cost-of-living tracker for Sri Lankan households. Use 
  this skill whenever the user uploads a UI screenshot, mockup, wireframe, or Figma export and 
  wants it built as React. Also trigger for "build this screen", "convert this design", "create 
  components from this UI", "match this interface", "replicate this layout", Costra branding, or 
  M3/Material components with Costra tokens. Trigger even if the user just drops an image — if 
  there's a UI screenshot and they want it built, use this skill. Also trigger for dark-themed 
  fintech/expense-tracking UI or lime/neon accent mobile components.
---

# Costra M3 Component Builder

You turn UI screenshots into production-quality React + Tailwind components that follow Material 3 structural patterns but are fully restyled with Costra's design tokens. Costra is a daily cost-of-living tracker app for Sri Lankan households — dark-first, mobile-first, with an electric lime (#C8FF00) accent.

## Step 1: Load the references

Before writing any code, read both reference files in this skill's directory:

```
references/costra-tokens.md    — Full color, typography, spacing, radius, elevation tokens
references/m3-mapping.md       — How each M3 component maps to Costra styling
```

These are your source of truth for values. But the patterns below (learned from building real screens) take priority when they conflict with the reference files.

## Step 2: Analyze the screenshot

Study the uploaded UI image carefully. Identify:

1. **Layout structure** — What's the page skeleton? (mobile screen, full-width scroll, fixed bottom nav, etc.)
2. **M3 component inventory** — List every distinct component visible. Map each to its M3 equivalent using `references/m3-mapping.md`.
3. **Content and copy** — Read ALL visible text, labels, headings, placeholder content, amounts, dates
4. **States** — Note any hover, active, selected, disabled, or error states shown
5. **Icons** — Identify icons and find Lucide equivalents

Present this analysis as a brief inventory before coding.

## Step 3: Build the components

### Architecture

Produce a **single .jsx artifact** that contains:
1. Shared utility components at the top (StatusBar, CostraBrand, CostraCTA, BottomNav, etc.)
2. Screen-specific components in the middle
3. A default export at the bottom with navigation state to switch between screens

### The Golden Rules (learned from real builds)

These are the most important patterns. They override the reference files where they conflict.

#### Use inline styles, not Tailwind arbitrary values

For color-critical elements, prefer inline `style={{}}` over Tailwind arbitrary classes. This guarantees exact color matching. Use Tailwind only for layout utilities (flex, gap, padding patterns).

```jsx
// ✅ CORRECT — exact colors guaranteed
style={{ background: "#0A0A0B", border: "1px solid #1C1C1F", borderRadius: 16 }}

// ❌ AVOID for colors — can render differently
className="bg-[#0A0A0B] border-[#1C1C1F] rounded-[16px]"
```

Tailwind classes are fine for: `flex`, `flex-col`, `items-center`, `justify-between`, `gap-*`, `flex-1`, `overflow-y-auto`, `cursor-pointer`, `transition-all`, `w-full`, etc.

#### Radius values (NOT 0px — this is critical)

The actual Costra HiFi designs use rounded corners, not brutalist 0px. These are the real values:

| Element | Radius | Notes |
|---------|--------|-------|
| CTA Buttons | `14px` | Pill-ish, NOT sharp |
| Cards / Containers | `16px` | Generous rounding |
| Inner cards / List groups | `14px` | Slightly smaller |
| Icon containers | `12px` | Small rounded squares |
| Filter chips | `9999px` | Full pill |
| OTP boxes | `12px` | Rounded squares |
| Badges / Status pills | `9999px` | Full pill |
| Logo icon | `4-8px` | Slightly rounded square |
| Search bars | `14px` | Matches card rounding |

#### Font loading (MUST include)

Every artifact must include this at the top inside a `<style>` block:

```jsx
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  ::selection { background: #C8FF00; color: #050505; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  input::placeholder { color: #52525B; }
  input:focus { border-bottom-color: #C8FF00 !important; }
  @keyframes costraFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .costra-fade { animation: costraFadeIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
`}</style>
```

#### Mobile frame

Always wrap the artifact in a max-width container:

```jsx
<div style={{ maxWidth: 393, margin: "0 auto", position: "relative", overflow: "hidden", background: "#050505", minHeight: "100vh" }}>
```

### Exact Color Values

These are non-negotiable. Use these exact hex values:

```
Page background:          #050505
Card/panel background:    #0A0A0B
Nested container bg:      #111113
Hover/active surface:     #18181B
Visible border:           #27272A
Subtle border:            #1C1C1F
Muted text:               #52525B
Secondary text:           #A1A1AA
Primary text:             #FAFAFA
White:                    #FFFFFF
Accent (lime):            #C8FF00
Accent dim:               #9FCC00
Accent glow:              rgba(200, 255, 0, 0.12)
Accent glow subtle:       rgba(200, 255, 0, 0.06)
Error/danger:             #EF4444
Warning:                  #F59E0B
Success:                  #22C55E
Info:                     #3B82F6
```

### Component Patterns (copy-paste ready)

#### Status Bar
```jsx
const StatusBar = () => (
  <div className="flex items-center justify-between" style={{ padding: "12px 24px 8px" }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#FAFAFA", fontWeight: 600 }}>9:41</span>
    <div className="flex items-center gap-1">
      {/* signal + wifi + battery SVGs */}
    </div>
  </div>
);
```

#### Brand Mark
```jsx
const CostraBrand = () => (
  <div className="flex items-center gap-2.5">
    <div style={{ width: 32, height: 32, background: "#C8FF00", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 17, height: 17, border: "2.5px solid #050505", borderRadius: 2 }} />
    </div>
    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "0.95rem", letterSpacing: "0.15em", color: "#FFF" }}>COSTRA</span>
  </div>
);
```

#### CTA Button (Primary)
```jsx
style={{
  width: "100%", padding: "16px",
  background: "#C8FF00", color: "#050505",
  borderRadius: 14, border: "none",
  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1rem",
}}
```

#### CTA Button (Outlined)
```jsx
style={{
  width: "100%", padding: "16px",
  background: "transparent", color: "#FAFAFA",
  borderRadius: 14, border: "1px solid #27272A",
  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1rem",
}}
```

#### CTA Button (Danger)
```jsx
style={{
  width: "100%", padding: "16px",
  background: "transparent", color: "#EF4444",
  borderRadius: 14, border: "1px solid rgba(239,68,68,0.3)",
  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1rem",
}}
```

#### Section Label (mono, lime, uppercase)
```jsx
style={{
  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
  color: "#C8FF00", letterSpacing: "0.2em",
  textTransform: "uppercase", fontWeight: 500, marginBottom: 14,
}}
```

#### Field Label (mono, muted, uppercase)
```jsx
style={{
  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
  color: "#52525B", letterSpacing: "0.18em",
  textTransform: "uppercase", fontWeight: 500, marginBottom: 10,
}}
```

#### Page Title
```jsx
style={{
  fontFamily: "'Outfit', sans-serif", fontWeight: 800,
  fontSize: "1.8rem", lineHeight: 1.15, color: "#FAFAFA",
}}
```

#### Body Description
```jsx
style={{
  fontFamily: "'Outfit', sans-serif", fontWeight: 300,
  fontSize: "0.85rem", lineHeight: 1.65, color: "#A1A1AA",
}}
```

#### Card Container
```jsx
style={{
  background: "#0A0A0B", borderRadius: 16,
  border: "1px solid #1C1C1F", padding: "24px 20px",
}}
```

#### Feature Card (left lime accent)
```jsx
style={{
  background: "#111113", borderRadius: 12,
  border: "1px solid #1E1E20",
  borderLeft: "3px solid #C8FF00",
  padding: "20px",
}}
```

#### Filter Chip (active)
```jsx
style={{
  padding: "8px 16px", borderRadius: 9999,
  background: "#C8FF00", border: "1.5px solid #C8FF00",
  color: "#050505",
  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
  letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600,
}}
```

#### Filter Chip (inactive)
```jsx
style={{
  padding: "8px 16px", borderRadius: 9999,
  background: "transparent", border: "1.5px solid #27272A",
  color: "#A1A1AA",
  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
  letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
}}
```

#### Icon Container (in list items)
```jsx
style={{
  width: 40, height: 40, borderRadius: 12,
  background: "#111113", border: "1px solid #1C1C1F",
  display: "flex", alignItems: "center", justifyContent: "center",
}}
```

#### Bottom Navigation
- Background: `#0A0A0B`, border-top: `1px solid #1C1C1F`
- Active tab: lime pill bg `rgba(200,255,0,0.12)` behind icon, icon + label in `#C8FF00`
- Inactive: icon + label in `#52525B`
- Labels: JetBrains Mono, `0.5rem`, uppercase, letter-spacing 0.08em

#### Text Input (bottom-border style)
```jsx
style={{
  width: "100%", background: "transparent",
  border: "none", borderBottom: "1px solid #27272A",
  padding: "12px 0",
  fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem",
  color: "#FAFAFA", outline: "none",
}}
// Focus state handled via CSS: input:focus { border-bottom-color: #C8FF00 !important; }
```

#### +94 Country Code Chip
```jsx
style={{
  background: "#C8FF00", color: "#050505",
  fontFamily: "'Outfit', sans-serif", fontWeight: 600,
  fontSize: "0.9rem", padding: "10px 14px", borderRadius: 10,
}}
```

#### Dot Indicators
- Active: `#C8FF00`, 10×10px, full round
- Inactive: `#2A2A20` (dark olive, NOT pure gray), 8×8px, full round

#### Alert/Insight Banner
```jsx
// Lime-tinted insight
style={{
  background: "rgba(200,255,0,0.06)", borderRadius: 14,
  border: "1px solid rgba(200,255,0,0.12)", padding: "14px 16px",
}}

// Warning alert
style={{
  background: "#111113", borderRadius: 12,
  border: "1px solid #1C1C1F", padding: "14px 16px",
}}
// Use AlertTriangle icon with color="#F59E0B" for warnings
// Use Lightbulb icon with color="#C8FF00" for insights
```

### Typography Quick Reference

| Role | Font | Weight | Size | Color | Extra |
|------|------|--------|------|-------|-------|
| Page title | Outfit | 800 | 1.8rem | #FAFAFA | lineHeight: 1.15 |
| Section heading | Outfit | 700 | 1rem | #FAFAFA | — |
| Card title | Outfit | 600-700 | 0.95rem | #FAFAFA | — |
| Body text | Outfit | 300 | 0.85rem | #A1A1AA | lineHeight: 1.65 |
| Big amount | Outfit | 900 | 2.6rem | #FAFAFA | lineHeight: 1.1 |
| Section label | JetBrains Mono | 500 | 0.6rem | #C8FF00 | uppercase, tracking 0.2em |
| Field label | JetBrains Mono | 500 | 0.6rem | #52525B | uppercase, tracking 0.18em |
| Timestamp | JetBrains Mono | 400 | 0.6rem | #52525B | tracking 0.05em |
| Nav label | JetBrains Mono | 500 | 0.5rem | #52525B/#C8FF00 | uppercase, tracking 0.08em |
| Transaction amount | Outfit | 600 | 0.9rem | #FAFAFA | — |
| Chip text | JetBrains Mono | 500-600 | 0.65rem | varies | uppercase, tracking 0.06em |
| CTA button | Outfit | 600 | 1rem | #050505 | — |

### Icons

Always import from `lucide-react`. Use `strokeWidth={1.5}` for standard icons, `strokeWidth={2}` or `strokeWidth={2.5}` for emphasis (like checkmarks inside buttons).

**IMPORTANT — verified icons only.** The artifact environment uses lucide-react@0.383.0. Many icon names that seem logical do NOT exist in this version and will crash the artifact. Only use icons you are certain exist.

**Verified safe icons for Costra:**
- Navigation: `ArrowLeft`, `Home`, `List`, `BarChart3`, `Wallet`, `UserCircle`, `ChevronRight`, `X`
- Finance: `ArrowDownLeft` (income), `ArrowUpRight` (expense), `TrendingUp`, `TrendingDown`, `Coins`
- Categories: `Utensils` (food), `Bus` (transport), `ShoppingBag` (shopping), `Zap` (bills), `Coffee`, `Heart` (health), `Music` (fun), `BookOpen` (education)
- Income sources: `Landmark` (job), `Briefcase` (business), `Laptop` (freelance), `Users` (family), `Gift` (gifts), `RotateCcw` (refund)
- Actions: `Plus`, `Mic`, `Pen`, `Trash2`, `Search`, `Bell`, `User`, `Settings`, `LogOut`, `RefreshCw`
- Feedback: `AlertTriangle`, `Lightbulb`, `Check`, `CheckCircle`, `ShieldCheck`, `Info`, `Award`
- Form: `Calendar`, `CreditCard`, `Tag`, `FileText`, `Smartphone`, `Globe`, `Lock`, `Moon`
- UI: `MoreHorizontal`, `Grid3X3`, `MessageSquare`, `Sparkles`, `HelpCircle`, `Headphones`

**DO NOT USE these — they will crash:**
- `PiggyBank` / `Piggy Bank` — use `Coins` instead
- `Smile` / `SmilePlus` — use `Music` instead
- `GraduationCap` — use `BookOpen` instead
- `Building2` — use `Landmark` instead
- `DollarSign` — use `Coins` or inline SVG instead
- Any icon with spaces in the name

When unsure if an icon exists, use `MoreHorizontal` as a safe fallback or create a small inline SVG.

## Step 4: Present to the user

After generating the artifact, provide a brief summary:

1. **Components built** — list each and its M3 mapping
2. **Interactions** — which states are wired up
3. **Offer next steps** — adjust, add states, or build next screen

## Quality Checklist

Before finishing, verify:
- [ ] Font import is included in `<style>` block
- [ ] All text uses Outfit (headings/body) or JetBrains Mono (labels/captions/timestamps/nav)
- [ ] Cards use borderRadius 14-16px, NOT 0px
- [ ] CTA buttons use borderRadius 14px, NOT 0px
- [ ] Primary accent is `#C8FF00` everywhere
- [ ] Page background is `#050505`
- [ ] All labels/captions are JetBrains Mono, uppercase, with letter-spacing
- [ ] Content/copy from the screenshot is faithfully reproduced
- [ ] Lucide icons use `strokeWidth={1.5}`
- [ ] **ALL icon imports are from the verified safe list** — no guessing
- [ ] Mobile frame wrapper with maxWidth 393 is applied
- [ ] Screen transition animation (`.costra-fade`) is applied

## Common Mistakes to Avoid

- **Using invalid Lucide icons** — Many icon names like `PiggyBank`, `Smile`, `GraduationCap`, `Building2` do NOT exist in lucide-react@0.383.0 and will crash the entire artifact silently. Always check the verified list above. When in doubt, use `MoreHorizontal` or an inline SVG.
- **Using 0px border-radius** — The design system doc says 0px but the actual HiFi designs use 14-16px on cards and buttons. Always follow the HiFi, not the abstract spec.
- **Using Tailwind arbitrary color classes** — Use inline styles for colors to guarantee exact matching. Tailwind arbitrary values can render differently.
- **Using M3's default colors** — No Material purple, teal, or blue. Everything is Costra's dark palette + lime.
- **Forgetting JetBrains Mono for labels** — Every caption, timestamp, field label, nav label, badge, chip, and status text uses JetBrains Mono in uppercase with letter-spacing. This is the most distinctive Costra pattern.
- **Forgetting the accent glow** — `rgba(200,255,0,0.12)` is used for focus rings, active nav pill backgrounds, status badge backgrounds, and insight banners.
- **Generic placeholder text** — Always use the actual text from the screenshot. Costra is a Sri Lankan household expense tracker — amounts are in ₹, names are Sri Lankan, categories are everyday items.
- **Forgetting inactive dot color** — Inactive pagination dots are `#2A2A20` (dark olive), NOT pure gray.
