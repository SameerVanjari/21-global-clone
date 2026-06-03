# Twenty1Global — Design System Worktrees

Seven distinct redesigns of the Twenty1Global Trading LLC website, each in its own git worktree.

## Quick Start

```bash
cd /Users/apple/projects/self-work/clone-work

# Pick a design and enter its worktree:
cd <design-name>

# Install dependencies (first time only):
npm install

# Start dev server:
npm run dev
```

## Available Designs

| # | Name | Directory | Port | Style |
|---|---|---|---|---|
| 1 | Editorial Magazine | `editorial-magazine/` | 3000 | Print-magazine editorial, Lora serif + DM Sans |
| 2 | Brutalist Industrial | `brutalist-industrial/` | 3001 | Raw terminal/data aesthetic, JetBrains Mono only |
| 3 | Art Deco Opulence | `art-deco-opulent/` | 3002 | 1920s Gatsby luxury, Playfair Display + gold |
| 4 | Swiss International | `swiss-international/` | 3003 | Swiss modernism, Inter only, red accent |
| 5 | Organic Biophilic | `organic-biophilic/` | 3004 | Nature-infused warmth, Cormorant Garamond + Lora |
| 6 | Retro-Futuristic | `retro-futuristic/` | 3005 | Cyber-trade glass morphism, Sora + neon |
| 7 | Architectural Monolith | `architectural-monolith/` | 3006 | Monumental minimalism, Manrope + deep shadows |

## Running Multiple Designs Simultaneously

Each design runs on its own port. To run them all:

```bash
# Terminal 1
cd /Users/apple/projects/self-work/clone-work/editorial-magazine && npm run dev

# Terminal 2
cd /Users/apple/projects/self-work/clone-work/brutalist-industrial && npm run dev -- -p 3001

# Terminal 3
cd /Users/apple/projects/self-work/clone-work/art-deco-opulent && npm run dev -- -p 3002

# Terminal 4
cd /Users/apple/projects/self-work/clone-work/swiss-international && npm run dev -- -p 3003

# Terminal 5
cd /Users/apple/projects/self-work/clone-work/organic-biophilic && npm run dev -- -p 3004

# Terminal 6
cd /Users/apple/projects/self-work/clone-work/retro-futuristic && npm run dev -- -p 3005

# Terminal 7
cd /Users/apple/projects/self-work/clone-work/architectural-monolith && npm run dev -- -p 3006
```

## Using Opencode in Each Worktree

Open separate terminal windows, each in a different worktree:

```bash
# Window 1: Editorial Magazine
cd /Users/apple/projects/self-work/clone-work/editorial-magazine
opencode

# Window 2: Brutalist Industrial
cd /Users/apple/projects/self-work/clone-work/brutalist-industrial
opencode

# Window 3: Art Deco Opulence
cd /Users/apple/projects/self-work/clone-work/art-deco-opulent
opencode

# ... etc for all 7 designs
```

Each opencode session will be scoped to its own worktree with its own git branch.

## Git Worktree Cheat Sheet

```bash
cd /Users/apple/projects/self-work/clone-work

# List all worktrees
git worktree list

# List all branches
git branch -a

# Switch to main repo
cd /Users/apple/projects/self-work/clone-work

# Remove a worktree (after done)
git worktree remove <name>

# Check what branch a worktree is on
git -C <name> branch
```

## Project Structure (each design)

```
<design-name>/
  DESIGN.md          # Design system specification
  src/
    app/
      globals.css    # Complete design tokens + animations
      layout.tsx     # Root layout with fonts
      page.tsx       # Main page (composes all sections)
    components/
      effects/
        ScrollReveal.tsx   # Scroll-triggered animations
      layout/
        NavHeader.tsx      # Fixed navigation
        DotNav.tsx         # Side dot navigation
        Footer.tsx         # Site footer
      sections/
        Hero.tsx           # Hero section
        Services.tsx       # Services/capabilities
        About.tsx          # About/philosophy
        Locations.tsx      # Global offices
        Contact.tsx        # Contact/CTA
```

## Tech Stack (all designs)

- Next.js 16 (App Router)
- Tailwind CSS v4
- shadcn/ui
- Lenis (smooth scrolling)
- TypeScript
- Google Fonts
