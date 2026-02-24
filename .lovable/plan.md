

# Integrate Spline + Spotlight Components

## Current State
- `SplineScene` already exists at `src/components/SplineScene.tsx` (works, but not in `/ui` folder)
- `Card` component already exists at `src/components/ui/card.tsx` (complete)
- All NPM dependencies (`@splinetool/runtime`, `@splinetool/react-spline`, `framer-motion`) are already installed
- `animate-spotlight` keyframe is missing from Tailwind config

## Changes

### 1. Create `src/components/ui/splite.tsx`
Copy the provided `SplineScene` component into the `ui` folder as a named export. The existing `src/components/SplineScene.tsx` will remain for backward compatibility (it's used by `HeroSection.tsx`).

### 2. Create `src/components/ui/spotlight.tsx`
Use the **Aceternity** version (SVG-based spotlight with the `animate-spotlight` class). This is the simpler, dependency-free version that pairs well with the demo component.

### 3. Update `tailwind.config.ts`
Add the `spotlight` keyframe animation:
```
keyframes: {
  spotlight: {
    "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
    "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
  },
}
animation: {
  spotlight: "spotlight 2s ease .75s 1 forwards",
}
```

### 4. Create `src/components/ui/demo.tsx`
The demo component showcasing the Spline scene inside a Card with Spotlight effect. This serves as a reusable example/showcase component.

### 5. No changes to `card.tsx`
The existing card component is already complete and matches what's needed.

## Technical Notes
- The `'use client'` directives in the provided code are Next.js-specific and will be removed since this is a Vite project.
- The existing `SplineScene` default export at `src/components/SplineScene.tsx` stays untouched so current imports (HeroSection) keep working.
- The new `splite.tsx` in `/ui` uses a named export (`export function SplineScene`) matching the provided code.
