# Project description

**TextFlow** is a mobile prototype for an academic reading and study companion app. It simulates an iPhone-sized experience and helps students manage their book library, track reading progress, discover new books, and monitor study habits.

### Key screens

- **Library** — Browse your curriculum, see what you're currently reading, pick up where you left off, and filter/sort books by category or author.
- **Reading View** — Read chapter by chapter with automatic progress tracking and chapter navigation.
- **Search & Discovery** — Find books with fuzzy search (powered by Fuse.js), and explore featured, recommended, and trending titles.
- **Study Insights** — View reading streaks, time invested, weekly goals, and a daily activity chart.

# How to run
## React + TypeScript + Vite 

Minimal starter template for building React apps with TypeScript, Vite, and sensible tooling (ESLint, Type-checking, optional React compiler).

### Features

- React + TypeScript with Vite for fast HMR and builds
- ESLint configured for TypeScript with recommended rules
- Optional React compiler enabled for build-time optimizations
- Support for either `@vitejs/plugin-react` (Oxc) or `@vitejs/plugin-react-swc` (SWC)

### Prerequisites

- Node.js 18+ and npm (or a compatible package manager)
- Recommended editor: VS Code or IntelliJ IDEA with TypeScript support

### Quick start

1. Clone the repo
   - `git clone <repo-url>`
2. Install dependencies
   - `npm install`
3. Run the development server
   - `npm run dev`

## Vite React plugin choices

- `@vitejs/plugin-react` — uses Oxc
- `@vitejs/plugin-react-swc` — uses SWC for faster transformations in many setups

To switch plugin, update `vite.config.ts` and install the corresponding package.

