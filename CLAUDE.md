# Fullstack React + Python Agent Stack

## Tech Stack
- **Frontend:** React 19, TanStack Start, Tailwind CSS v4, shadcn/ui
- **Backend:** Python 3.12+, FastAPI, LangChain, LangGraph
- **Monorepo:** Turborepo + pnpm
- **Python Tooling:** uv

## Context7 Library IDs
- TanStack Start: `/websites/tanstack_start`
- TanStack Router: `/tanstack/router`
- shadcn/ui: `/websites/ui_shadcn`
- LangChain: `/websites/langchain_oss_python`
- LangGraph: `/llmstxt/langchain-ai_github_io_langgraph_llms-full_txt`
- FastAPI: `/fastapi/fastapi`
- Tailwind CSS: `/tailwindlabs/tailwindcss`

## Project Structure
```
apps/
├── web/                    # React frontend (TanStack Start)
│   ├── src/routes/         # File-based routing
│   ├── src/components/     # App components
│   └── components/ui/      # shadcn/ui components
└── api/                    # Python backend (FastAPI + LangGraph)
    ├── src/main.py         # FastAPI entry point
    ├── src/agents/         # LangGraph agents
    ├── src/chains/         # LangChain chains
    └── src/routes/         # API route handlers
```

---

## Best Practices

### Running Commands (CRITICAL)

**Python/Backend:** Always run from `apps/api` directory or use `--directory` flag:
```bash
# Correct - run from api directory
cd apps/api && uv run python -m src.main

# Correct - use --directory flag from anywhere
uv run --directory apps/api pytest
uv run --directory apps/api python -c "from src.agents import example; print(example)"

# WRONG - will fail with import errors
uv run python apps/api/src/main.py
python apps/api/src/main.py
```

**Frontend:** Always run from `apps/web` directory for shadcn and local commands:
```bash
# Correct
cd apps/web && npx shadcn@latest add button
cd apps/web && pnpm add some-package

# Using turbo from project root is also correct
pnpm dev:web
```

### Frontend (React/TanStack/Tailwind/shadcn)

**Component Organization:**
- shadcn/ui primitives go in `components/ui/` (auto-generated, don't modify heavily)
- App-specific components go in `src/components/`
- Page components live in route files in `src/routes/`

**Styling Best Practices:**
- Use Tailwind utilities directly, avoid custom CSS unless necessary
- Use `cn()` helper from `lib/utils` for conditional classes
- Prefer shadcn/ui variants over custom styling: `<Button variant="outline">` not custom classes
- Don't use `@apply` in CSS - use utilities directly in JSX

**TanStack Router:**
- Use `createFileRoute` for all routes - the path is derived from filename
- Use `loader` for data fetching, not `useEffect` in components
- Use `Link` component, not `<a>` tags for internal navigation
- Route params: `$paramName` in filename → `Route.useParams()` in component

**State Management:**
- Local state: `useState` for component-specific state
- Server state: TanStack Query (if added) or loader data
- Form state: Use `react-hook-form` with shadcn/ui Form components
- Avoid prop drilling - use composition or context sparingly

**Don't Reinstall:**
- React, ReactDOM (comes with TanStack Start)
- Tailwind CSS, PostCSS (comes with TanStack Start)
- Vite (comes with TanStack Start)
- Adding these causes version conflicts

### Backend (Python/FastAPI/LangChain/LangGraph)

**Running Python Code:**
- Always use `uv run` - never use bare `python` command
- Run tests: `uv run --directory apps/api pytest`
- Run scripts: `uv run --directory apps/api python -m src.module`
- Interactive: `cd apps/api && uv run python`

**FastAPI Patterns:**
- Use `APIRouter` with prefixes for route organization
- Use Pydantic models for request/response validation
- Use dependency injection for shared resources (db, auth, etc.)
- Return proper HTTP status codes with `HTTPException`

**LangChain/LangGraph Patterns:**
- Define state with `TypedDict` for type safety
- Use `@tool` decorator for agent tools
- Keep agent definitions in `src/agents/`, chains in `src/chains/`
- Use LCEL (`|` operator) for chain composition
- Store prompts as constants or in separate files, not inline

**Environment Variables:**
- Load with `python-dotenv` at app startup
- Never commit `.env` - use `.env.example` as template
- Access via `os.getenv("VAR_NAME")` with defaults

**Testing:**
- Use `pytest` with `httpx.AsyncClient` for API tests
- Test files in `tests/` directory, named `test_*.py`
- Use fixtures for common setup (app client, mock data)

---

## Conventions

### Frontend
- **Routing:** File-based in `src/routes/` using `createFileRoute`
- **Components:** shadcn/ui in `components/ui/`, app components in `src/components/`
- **Styling:** Tailwind utilities, `cn()` for conditional classes
- **DON'T reinstall:** React, Tailwind, Vite (already in TanStack Start template)

### Backend
- **Entry:** `src/main.py` with FastAPI + CORS middleware
- **Routes:** `APIRouter(prefix="/api/v1/...")` in `src/routes/`
- **Agents:** `StateGraph` in `src/agents/`, use `@tool` decorator
- **Chains:** LCEL patterns in `src/chains/`
- **Env:** `.env` (never commit), document in `.env.example`

---

## Common Tasks

### Add frontend page
```tsx
// apps/web/src/routes/example.tsx
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/example')({ component: Example })
function Example() { return <div>Content</div> }
```

### Add shadcn component
```bash
cd apps/web && npx shadcn@latest add [component]
```

### Add API endpoint
```python
# apps/api/src/routes/example.py
from fastapi import APIRouter
router = APIRouter(prefix="/api/v1/example")

@router.get("/")
async def get_items():
    return {"items": []}
```

### Add LangGraph agent
```python
# apps/api/src/agents/example.py
from langgraph.graph import StateGraph
from typing import TypedDict

class AgentState(TypedDict):
    messages: list

def create_agent():
    graph = StateGraph(AgentState)
    # Add nodes and edges
    return graph.compile()
```

---

## Troubleshooting

### Python imports not working
Ensure all directories have `__init__.py` files.

### CORS errors
Add CORS middleware to `src/main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000", "http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
```

### `tree` command not found (macOS)
`tree` is not installed by default. Use `find` or `ls` instead:
```bash
# Instead of: tree -L 2
find . -maxdepth 2 -type f | head -50

# Or use ls recursively
ls -la apps/ && ls -la apps/web/ && ls -la apps/api/
```

### Windows users
Use WSL2 (recommended), Git Bash, or translate commands to PowerShell.

**Command translation reference:**
| Bash | PowerShell |
|------|------------|
| `mkdir -p dir` | `New-Item -ItemType Directory -Force -Path dir` |
| `mv src dest` | `Move-Item -Path src -Destination dest` |
| `rm -rf dir` | `Remove-Item -Recurse -Force dir` |
| `cat file >> dest` | `Get-Content file \| Add-Content dest` |
| `ls -la` | `Get-ChildItem -Force` |
| `cd dir && cmd` | `Set-Location dir; cmd` |
| `find . -name "*.txt"` | `Get-ChildItem -Recurse -Filter "*.txt"` |

**Running Python on Windows:**
```powershell
# From project root
uv run --directory apps\api pytest
uv run --directory apps\api python -m src.main

# Or change directory first
Set-Location apps\api
uv run pytest
```
