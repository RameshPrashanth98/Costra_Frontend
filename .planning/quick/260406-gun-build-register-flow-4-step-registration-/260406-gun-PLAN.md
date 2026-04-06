---
phase: quick
plan: 260406-gun
type: execute
wave: 1
depends_on: []
files_modified:
  - src/flows/register/screens/RegisterScreen.tsx
autonomous: true
must_haves:
  truths:
    - "User sees Step 1 form with name input and +94 phone input"
    - "Continue button is disabled until both name and phone are filled"
    - "User sees Step 2 OTP screen with 4 digit boxes after pressing Continue"
    - "First active OTP box has lime background, others have dark background"
    - "User sees Step 3 economic profile with 4 chip-selection groups"
    - "Selected chips turn lime with dark text"
    - "User sees Step 4 account ready confirmation with 3 info rows"
    - "Go to Login button navigates to /login"
    - "Each step transition re-triggers fadeUp animations"
    - "Already registered link on Step 1 navigates to /login"
    - "Change number link on Step 2 returns to Step 1"
  artifacts:
    - path: "src/flows/register/screens/RegisterScreen.tsx"
      provides: "Complete 4-step registration flow"
      min_lines: 400
  key_links:
    - from: "RegisterScreen.tsx"
      to: "/login"
      via: "Link component and useNavigate"
      pattern: "navigate.*login|to=./login"
---

<objective>
Replace the placeholder RegisterScreen with a complete 4-step registration flow matching HIFI designs.

Purpose: Deliver the registration user journey — name+phone entry, OTP verification, economic profile selection, and account ready confirmation — all managed via useState step within a single RegisterScreen.tsx file.
Output: Fully styled, animated RegisterScreen.tsx with 4 internal steps.
</objective>

<execution_context>
@.planning/quick/260406-gun-build-register-flow-4-step-registration-/260406-gun-PLAN.md
</execution_context>

<context>
@src/flows/register/screens/RegisterScreen.tsx (current placeholder — will be replaced)
@src/flows/login/screens/LoginScreen.tsx (reference for patterns: StatusBar, CostraBrand, fadeUp, inline styles, design tokens)

<interfaces>
<!-- Pattern reference extracted from LoginScreen.tsx -->

StatusBar component: Inline component with time "9:41", signal bars SVG, wifi SVG, battery SVG.
  - Padding: 12px 24px 8px, JetBrains Mono 0.8rem 600 for time, #FAFAFA color.

CostraBrand component: Lime square (32x32, #C8FF00, borderRadius 4) with C-path SVG + "COSTRA" text.
  - Outfit 900, 0.95rem, letterSpacing 0.15em, #FAFAFA.

fadeUp animation helper: Returns CSSProperties with opacity 0, animation using keyframe with cubic-bezier(0.16,1,0.3,1).
  - Delays staggered in ~80ms increments.

Design tokens:
  - Dark bg: #050505, Card bg: #0A0A0B, Card border: #1C1C1F
  - Input bg: #141416, Input border: #2A2A2E
  - Lime accent: #C8FF00, Light text: #FAFAFA, Muted: #A1A1AA, Dim: #52525B
  - Fonts: Outfit (sans), JetBrains Mono (mono)
  - Button: lime bg, #050505 text, borderRadius 14, padding 16px, Outfit 600 1rem
  - Button disabled: opacity 0.4
  - Button press: scale(0.98) on mouseDown/touchStart
  - Eyebrow: JetBrains Mono, 0.6rem, #C8FF00, letterSpacing 0.2em, uppercase, 500
  - Heading: Outfit 800, 1.65rem, lineHeight 1.2, #FAFAFA
  - Body: Outfit 300, 0.85rem, lineHeight 1.65, #A1A1AA
  - Label: JetBrains Mono, 0.6rem, #52525B, letterSpacing 0.18em, uppercase, 500
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build complete 4-step RegisterScreen</name>
  <files>src/flows/register/screens/RegisterScreen.tsx</files>
  <action>
Replace the entire RegisterScreen.tsx placeholder with a full 4-step registration flow. Copy the StatusBar, CostraBrand, KEYFRAMES, and fadeUp helper from LoginScreen.tsx exactly (inline, not imported). Rename the keyframe to `registerFadeUp` to avoid collision.

**State management:**
- `step` (1-4) controls which view renders
- `name` (string) for full name input
- `phone` (string) for phone input
- `otp` (string[4]) array for OTP digits — use 4 separate useRef<HTMLInputElement> for auto-focus
- `otpTimer` (number) countdown from 30, using useEffect + setInterval
- `profile` object: `{ income: string | null, earnStyle: string | null, dependents: string | null, debt: string | null }`

**Key on step for animation re-trigger:** Wrap step content in a div with `key={step}` so fadeUp animations replay on every step transition.

**Step 1 — Register Form:**
- Eyebrow: "CREATE ACCOUNT"
- Heading: "Enter your name and enter your mobile no."
- Body: "Use your full name and active mobile number to create your Costra account."
- Card (bg #0A0A0B, border 1px solid #1C1C1F, rounded 16px, padding 20px):
  - "FULL NAME" label (dim uppercase JetBrains Mono)
  - Full-width text input, bg transparent, border-bottom 1px solid #2A2A2E, no outline, placeholder "Enter Your Full Name" (placeholder-zinc-600), Outfit 0.9rem, color #FAFAFA
  - Spacing (marginTop 18px)
  - "MOBILE NUMBER" label
  - Row: "+94" chip (bg #141416, border 1px solid #2A2A2E, rounded 10, padding 10px 14px, Outfit 600 0.9rem #FAFAFA) + phone input (tel type, flex 1, same style as LoginScreen phone input, placeholder "Enter Your Mobile No")
  - Helper below divider: "We'll send a one-time code to verify your number and continue." (dim #52525B, Outfit 300, 0.78rem)
- "Continue" lime button — disabled when `!name.trim() || !phone.trim()`
- Bottom text: "Already registered? " + Link to="/login" in lime ("Log in")

**Step 2 — OTP Verification:**
- Eyebrow: "OTP VERIFICATION"
- Heading: "Verify your mobile number."
- Body: "Enter the 4-digit code sent to +94 {phone} to finish setting up your Costra account." (use the actual phone value)
- Card:
  - "ENTER CODE" label
  - 4 individual input boxes in a row with gap 12px:
    - Each: width 64px, height 64px, textAlign center, fontSize 1.4rem, fontWeight 700, borderRadius 12px, border none, outline none, fontFamily Outfit
    - The currently focused (active) input: bg #C8FF00, color #050505
    - Non-focused empty: bg #141416, border 1px solid #2A2A2E, color #FAFAFA
    - Non-focused filled: bg #141416, border 1px solid #2A2A2E, color #FAFAFA
    - Track focus with a `focusedOtp` state (index) — update on onFocus of each input
    - Auto-advance: onChange, if digit entered, move focus to next input. On Backspace in empty input, move focus to previous.
    - inputMode="numeric", maxLength 1, pattern="[0-9]"
  - Below inputs row: "Resend code in 00:{timer}" (dim) — timer counts down from 30. When reaches 0, show "Resend code" as a lime clickable span that resets timer to 30.
  - Same line or next line: "Change number" link (lime, Outfit 600) — sets step back to 1
- "Verify and Continue" lime button — disabled until all 4 otp slots are filled (non-empty)
- On click: accept any 4 digits (hardcoded acceptance), advance to step 3

**Step 3 — Economic Profile:**
- Eyebrow: "STEP 3 OF 3"
- Heading: "Tell us about your money situation."
- Body: "This helps Costra adjust spending alerts, wallet guidance, and insights to your real economic pressure."
- This step must scroll — wrap content area in overflow-y-auto with flex-1
- 4 choice group cards, each: bg #0A0A0B, border 1px solid #1C1C1F, rounded 16px, padding 20px, marginBottom 14px
  - Card title: Outfit 500, 0.85rem, #FAFAFA, marginBottom 14px
  - Chip row: flex flex-wrap, gap 10px
  - Group 1 — "Approx. household income per month": chips ["Under Rs.40k", "Rs.40k-80k", "Above Rs.80k"] mapped to profile.income
  - Group 2 — "How do you usually earn?": chips ["Daily wages", "Monthly salary", "Mixed / irregular"] mapped to profile.earnStyle
  - Group 3 — "How many people depend on this income?": chips ["1-2", "3-4", "5+"] mapped to profile.dependents
  - Group 4 — "Are you currently paying debt or loans?": chips ["Yes, regularly", "Sometimes", "No"] mapped to profile.debt
  - Chip style unselected: bg transparent, border 1px solid #2A2A2E, color #FAFAFA, borderRadius 20px, padding 8px 16px, Outfit 400 0.8rem, cursor pointer, transition 0.15s
  - Chip style selected: bg #C8FF00, color #050505, border 1px solid #C8FF00, fontWeight 600
- "Finish Setup" lime button (always enabled — profile is optional)
- Below button: "You can update these later in Profile > Financial Setup." (dim #52525B, 0.75rem, textAlign center)

**Step 4 — Account Ready:**
- Eyebrow: "ACCOUNT READY"
- Heading: "Your Costra account has been created."
- Body: "You're all set. Use your registered mobile number and password to log in and start tracking your real cost of living."
- Card with 3 info rows separated by 1px #1C1C1F dividers:
  - Row 1: Lime circle (width 36, height 36, bg #C8FF00, rounded full, flex center) containing a checkmark SVG (black stroke, ~16px) + text column: "Setup complete" (Outfit 600 0.9rem #FAFAFA) + "Your profile is saved and ready for first login." (Outfit 300 0.78rem #A1A1AA)
  - Row 2: Muted circle (width 36, height 36, bg #141416, border 1px solid #2A2A2E, rounded full) containing phone/device SVG icon (stroke #52525B) + text: "Sign in using the mobile number you registered during setup." (Outfit 400 0.85rem #FAFAFA)
  - Row 3: Lime circle (same as row 1) with check-circle SVG + text: "Your verification is complete, so you can log in immediately." (Outfit 400 0.85rem #FAFAFA)
  - Each row: flex row, gap 14px, items-center, padding 16px 0
- "Go to Login" lime button — onClick: navigate('/login')

**Outer wrapper (same as LoginScreen):**
- `<style>{KEYFRAMES}</style>` at top
- div with className="flex flex-col min-h-[100dvh]", bg #050505, paddingTop env(safe-area-inset-top), paddingBottom max(env(safe-area-inset-bottom), 16px)
- StatusBar at top
- Content div: flex-1 flex-col, padding 0 24px
- For Step 3 specifically: make the content div overflow-y-auto since it has more content than viewport

**Button component pattern (reuse across all steps):**
Create an inline LimeButton component or just repeat the pattern from LoginScreen: width 100%, padding 16px, bg #C8FF00, color #050505, borderRadius 14, border none, Outfit 600 1rem. Disabled state: opacity 0.4, cursor default. Press effect: scale(0.98) on mouseDown/touchStart, scale(1) on mouseUp/touchEnd.

**Animation stagger per step:**
Each step's elements should stagger fadeUp delays starting at 0 and incrementing by ~80ms (brand 0, eyebrow 80, heading 160, body 240, card 320, button 400, footer 440 — adjust as needed for content density).
  </action>
  <verify>
    <automated>cd "D:/1.Product Development with AI/1.1 project/4.Cost of living tracker/Frontend" && npx tsc --noEmit 2>&1 | head -30 && npm run build 2>&1 | tail -10</automated>
  </verify>
  <done>
RegisterScreen.tsx compiles without errors. File contains all 4 steps with correct state management, all design tokens match spec, animations re-trigger on step change, all navigation links work (Link to /login, Change number back to step 1), OTP inputs auto-advance, economic profile chips toggle selection, all buttons have correct disabled/enabled states.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Complete 4-step registration flow: (1) Name + phone form, (2) OTP verification with auto-advancing digit inputs and countdown timer, (3) Economic profile with selectable chips, (4) Account ready confirmation. All with HIFI styling, fadeUp animations on each step transition, and correct navigation.</what-built>
  <how-to-verify>
    1. Run `npm run dev` and navigate to http://localhost:5173/register
    2. Step 1: Verify "CREATE ACCOUNT" eyebrow, name and phone inputs, +94 chip, "Continue" button disabled until both filled. Check "Already registered? Log in" link goes to /login.
    3. Fill name and phone, press Continue. Verify fadeUp animations replay.
    4. Step 2: Verify OTP boxes — first box has lime background when focused. Type 4 digits, verify auto-advance. Check countdown timer and "Change number" link returns to step 1.
    5. Press "Verify and Continue". Verify step 3 loads with animations.
    6. Step 3: Tap chips in each group — verify selected chip turns lime, only one selected per group. Scroll to verify overflow works. Press "Finish Setup".
    7. Step 4: Verify 3 info rows with icons, "Go to Login" button navigates to /login.
    8. Overall: Check dark theme, font consistency, spacing, and mobile feel at 393px width.
  </how-to-verify>
  <resume-signal>Type "approved" or describe issues to fix</resume-signal>
</task>

</tasks>

<verification>
- TypeScript compiles: `npx tsc --noEmit`
- Production build succeeds: `npm run build`
- Route /register renders the new RegisterScreen
- All 4 steps accessible via sequential navigation
- No console errors in browser
</verification>

<success_criteria>
- RegisterScreen.tsx contains a 4-step flow controlled by useState
- Step transitions replay fadeUp animations (key={step})
- All design tokens match HIFI spec (colors, fonts, spacing, radii)
- OTP inputs auto-advance on digit entry and back on Backspace
- Economic profile chips toggle correctly (one per group)
- Navigation: Continue -> OTP -> Profile -> Ready -> /login all work
- "Change number" returns to step 1, "Already registered" links to /login
- Builds without TypeScript or bundler errors
</success_criteria>

<output>
After completion, create `.planning/quick/260406-gun-build-register-flow-4-step-registration-/260406-gun-SUMMARY.md`
</output>
