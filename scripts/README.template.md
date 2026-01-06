# # {{PROJECT_NAME}}

{{DESCRIPTION}}

## Tech Stack

- **Frontend:** React 19 + TanStack Start + Tailwind v4 + shadcn/ui
- **Backend:** Python + FastAPI + LangChain + LangGraph
- **Monorepo:** Turborepo + pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- pnpm (`npm install -g pnpm`)
- uv (`pip install uv` or `brew install uv`)

### Setup

```bash
pnpm install
```

Create environment files:
```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

### Development

```bash
# Run both frontend and backend
pnpm dev

# Run only frontend (http://localhost:3000)
pnpm dev:web

# Run only backend (http://localhost:8000)
pnpm dev:api
```

### Other Commands

```bash
pnpm build      # Build all apps
pnpm lint       # Lint all apps
pnpm test       # Run all tests
pnpm stop       # Kill dev servers on ports 3000/8000
```

## Project Structure

```
├── apps/
│   ├── web/                 # React 19 + TanStack Start frontend
│   │   ├── src/routes/      # File-based routing
│   │   ├── src/components/  # App components
│   │   └── components/ui/   # shadcn/ui components
│   └── api/                 # Python FastAPI + LangGraph backend
│       ├── src/main.py      # FastAPI entry point
│       ├── src/agents/      # LangGraph agents
│       ├── src/chains/      # LangChain chains
│       └── src/routes/      # API route handlers
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
├── CLAUDE.md                # AI coding assistant instructions
└── turbo.json               # Turborepo configuration
```

## API Documentation

Once the backend is running, view the API docs at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
