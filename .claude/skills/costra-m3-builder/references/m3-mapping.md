# Material 3 → Costra Component Mapping

When identifying M3 components in a UI screenshot, use this reference to understand which M3 pattern applies and how to restyle it with Costra tokens.

## Mapping Principles

1. **Identify the M3 component pattern** — what role does the element play? (navigation, input, action, container, feedback)
2. **Adopt M3 structure and behavior** — layout, state management, accessibility roles, keyboard interactions
3. **Replace all M3 visuals with Costra tokens** — colors, radius, typography, spacing, elevation

## Component Reference

### Actions

#### Button (M3: FilledButton, OutlinedButton, TextButton, FAB)
**Costra adaptation:**
- Border-radius: 0px (always)
- Primary: bg `#C8FF00`, text `#050505`, font-weight 600, uppercase, letter-spacing 0.08em, font-family Mono
- Secondary/Outlined: transparent bg, 1px border `#27272A`, text `#FAFAFA`, hover border `#C8FF00`
- Text/Ghost: no bg, no border, text `#A1A1AA`, hover text `#C8FF00`
- FAB: bg `#C8FF00`, text `#050505`, 0px radius (not rounded)
- States: hover shifts to `#9FCC00` for filled; glow border for outlined
- Sizing: px-6 py-3 for default, px-4 py-2 for small, px-8 py-4 for large
- All button text: mono font, uppercase, letter-spacing

#### IconButton (M3: IconButton, FilledIconButton)
- 0px radius, square shape
- Standard: transparent bg, icon color `#A1A1AA`, hover `#C8FF00`
- Filled: bg `#18181B`, border `#27272A`, icon `#FAFAFA`
- Size: 40×40px default, 32×32px compact

#### SegmentedButton
- 0px radius on all segments
- Border: 1px `#27272A`
- Selected: bg `#C8FF00`, text `#050505`
- Unselected: bg transparent, text `#A1A1AA`

### Navigation

#### TopAppBar (M3: CenterAlignedTopAppBar, LargeTopAppBar)
- bg: `#050505` with `backdrop-filter: blur(20px)` and 85% opacity
- border-bottom: 1px `#1C1C1F`
- Title: Outfit font, weight 600-900, uppercase with letter-spacing
- Navigation icon and actions: icon buttons with Costra styling
- Height: 60px

#### NavigationBar / BottomNavigation
- bg: `#0A0A0B`, border-top: 1px `#1C1C1F`
- Active: icon + label in `#C8FF00`
- Inactive: icon + label in `#52525B`
- Labels: mono font, 0.6rem, uppercase
- No indicator pill — just color change

#### NavigationRail
- bg: `#0A0A0B`, border-right: 1px `#1C1C1F`
- Width: 72px
- Same active/inactive pattern as BottomNav

#### NavigationDrawer
- bg: `#0A0A0B`, border-right: 1px `#27272A`
- Section labels: mono, 0.6rem, accent color, uppercase
- Items: Outfit font, hover bg `#111113`
- Active item: left border 2px `#C8FF00`, text `#FAFAFA`

#### Tabs (M3: PrimaryTabs, SecondaryTabs)
- 0px radius
- Active: text `#C8FF00`, bottom border 2px `#C8FF00`
- Inactive: text `#52525B`
- Tab text: mono font, 0.7rem, uppercase, letter-spacing 0.08em
- bg: transparent

### Containers

#### Card (M3: FilledCard, OutlinedCard, ElevatedCard)
- 0px radius (always)
- Outlined (default): bg `#0A0A0B`, border 1px `#1C1C1F`, hover border `#27272A`
- Filled: bg `#111113`, no border
- Elevated: bg `#0A0A0B`, shadow-sm
- Padding: 24px (space-6)
- Interactive cards: hover translateY(-2px), border-color transition

#### Dialog / Modal
- 0px radius
- bg: `#0A0A0B`, border 1px `#27272A`
- Overlay: rgba(5,5,5,0.85) with backdrop-blur
- Title: Outfit, weight 700
- Shadow: shadow-lg

#### BottomSheet
- 0px radius (no top rounding)
- bg: `#0A0A0B`, border-top 1px `#27272A`
- Handle: 32×2px bar, color `#27272A`

### Inputs

#### TextField (M3: FilledTextField, OutlinedTextField)
- 0px radius
- bg: `#0A0A0B` (filled) or transparent (outlined)
- Border: 1px `#27272A`, focus border `#C8FF00`
- Label: mono font, 0.65rem, `#52525B`, uppercase
- Input text: Outfit, `#FAFAFA`
- Focus glow: `0 0 0 1px rgba(200,255,0,0.12)`
- Error state: border `#EF4444`, label `#EF4444`

#### SearchBar
- 0px radius
- bg: `#111113`, border 1px `#27272A`
- Placeholder: mono, `#52525B`
- Search icon: `#52525B`, focus `#C8FF00`

#### Checkbox
- 0px radius (square, no rounding)
- Unchecked: border 1.5px `#27272A`
- Checked: bg `#C8FF00`, check icon `#050505`
- Size: 18×18px

#### RadioButton
- Full circle (radius 9999px)
- Unchecked: border 1.5px `#27272A`
- Selected: border `#C8FF00`, inner dot `#C8FF00`

#### Switch
- Track: 0px radius, bg `#27272A` (off), `#C8FF00` (on)
- Thumb: 0px radius (square), bg `#FAFAFA` (off), `#050505` (on)

#### Slider
- Track: 2px height, bg `#27272A`, active fill `#C8FF00`
- Thumb: 0px radius (square), 16×16px, bg `#C8FF00`

#### DatePicker / TimePicker
- 0px radius on all elements
- Header: bg `#111113`
- Selected date: bg `#C8FF00`, text `#050505`
- Today: border 1px `#C8FF00`

### Data Display

#### List / ListItem
- No radius, no divider bg — use 1px border-bottom `#1C1C1F`
- Leading: icon or avatar
- Title: Outfit, weight 500
- Subtitle: Outfit, `#A1A1AA`
- Trailing: mono font for metadata

#### DataTable
- 0px radius
- Header: bg `#111113`, text mono 0.65rem uppercase `#52525B`
- Row: bg `#0A0A0B`, border-bottom 1px `#1C1C1F`
- Row hover: bg `#111113`
- Cell text: Outfit for content, Mono for numbers/codes

#### Badge
- radius: 2px
- bg: `#C8FF00`, text `#050505`
- Error badge: bg `#EF4444`, text white
- Font: mono, 0.6rem, weight 600

#### Chip (M3: AssistChip, FilterChip, InputChip)
- Filter/Input: radius 9999px (pill)
- bg: `#111113`, border 1px `#27272A`
- Selected: bg `#C8FF00`, text `#050505`, no border
- Text: mono, 0.7rem

#### Tooltip
- radius: 4px
- bg: `#18181B`, border 1px `#27272A`
- Text: mono, 0.7rem, `#FAFAFA`

### Feedback

#### Snackbar
- 0px radius
- bg: `#18181B`, border 1px `#27272A`
- Text: Outfit, `#FAFAFA`
- Action: mono, uppercase, `#C8FF00`

#### ProgressIndicator (Linear)
- 0px radius
- Track: bg `#111113`, height 2px
- Progress: bg `#C8FF00`

#### ProgressIndicator (Circular)
- Stroke: 2px, color `#C8FF00`
- Track: `#27272A`

#### Alert / Banner
- 0px radius
- Border-left: 3px with semantic color (success/warning/error/info)
- bg: surface with subtle tint of semantic color (6% opacity)
- Icon: semantic color
- Text: Outfit

### Layout

#### Divider
- 1px solid `#1C1C1F` (subtle) or `#27272A` (visible)

#### Scaffold / Page Layout
- bg: `#050505`
- Content max-width: 1280px, centered
- Page padding: 48px horizontal (24px mobile)
