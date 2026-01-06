# TanStack + Python Agent Stack Template

A modern fullstack template combining React 19 frontend (TanStack Start) with Python FastAPI + LangGraph backend, optimized for AI agent development with Claude Code.

## 🚀 Use This Template

### Option 1: GitHub Template (Recommended)

Click **"Use this template"** button on GitHub, then clone your new repository.

### Option 2: Clone Directly

```bash
git clone https://github.com/YOUR_USERNAME/claude-tanstack-python-starter.git my-project
cd my-project
```

### Option 3: degit (No Git History)

```bash
npx degit YOUR_USERNAME/claude-tanstack-python-starter my-project
cd my-project
```

### After Cloning: Run Setup

```bash
pnpm run init-project
pnpm install
```

The setup script will:
- Prompt for your project name
- Update all `package.json` files and `pyproject.toml`
- Optionally reinitialize git history

## 📋 Prerequisites

- **Node.js** 18+ and **pnpm** 8+
- **Python** 3.12+ and **uv** (Python package manager)
- **OpenAI API key** (for LangGraph agents)

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

Add your OpenAI API key to `apps/api/.env`:
```
OPENAI_API_KEY=your_key_here
```

### 3. Start Development

Run both frontend and backend:
```bash
pnpm dev
```

Or run individually:
```bash
pnpm dev:web  # Frontend on http://localhost:3000
pnpm dev:api  # Backend on http://localhost:8000
```

## 📁 Project Structure

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

## 📜 Available Commands

| Command | Description |
|---------|-------------|
| `pnpm run init-project` | Initialize project with your name |
| `pnpm dev` | Start all services |
| `pnpm dev:web` | Frontend only |
| `pnpm dev:api` | Backend only |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all code |
| `pnpm test` | Run tests |
| `pnpm check-types` | Type checking |
| `pnpm stop` | Stop dev servers (ports 3000 & 8000) |

## 🤖 AI-Powered Development

This template includes a `CLAUDE.md` file with comprehensive instructions for AI coding assistants. When using Claude Code or similar tools:

- The AI understands the project structure and conventions
- Context7 library IDs are pre-configured for accurate documentation lookups
- Common tasks have documented patterns to follow

## 🔧 Tech Stack

**Frontend:**
- React 19
- TanStack Start & Router
- Tailwind CSS v4
- shadcn/ui

**Backend:**
- Python 3.13+
- FastAPI
- LangChain & LangGraph
- uv (Python package manager)

**DevOps:**
- Turborepo (monorepo management)
- pnpm (Node.js package manager)

## 📝 After Using Template

1. Run `pnpm run init-project` to configure project name
2. Configure your environment variables
3. Update this README with your project's specific information
4. Remove or update the GitHub templates in `.github/` as needed

## 📄 License

MIT
