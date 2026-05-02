# Architecture

## Project structure

src/
api/         FastAPI routers, one file per resource
models/      SQLAlchemy ORM models (database tables)
schemas/     Pydantic request/response schemas (API contracts)
services/    Business logic, sits between API and models
db/          Database setup, session management, base classes
main.py      FastAPI app instance, middleware, router registration
tests/
conftest.py  Shared fixtures (test client, test db)
api/         Endpoint integration tests
services/    Unit tests for service layer
frontend/
streamlit_app.py    Main Streamlit entry point
pages/              Multi-page Streamlit apps go here

## Layering rules (strict)

1. API layer (routers in src/api/) NEVER touches database directly
2. API calls service functions, services call models
3. Schemas (Pydantic) are SEPARATE from Models (SQLAlchemy)
4. Services return ORM models or domain dataclasses, API converts to schemas
5. Frontend (Streamlit) calls API via httpx, never imports from src/ directly

This separation matters because:
- Schemas can change for API versioning without touching DB
- Services are testable without HTTP layer
- Frontend can be swapped (Streamlit to React) without backend changes

## Database

- SQLite for development, file at ./app.db (gitignored)
- Use SQLAlchemy 2.0 async style (DeclarativeBase, async_sessionmaker)
- Async driver: aiosqlite
- Sessions: created per-request via FastAPI dependency
- Migrations: not needed for hackathon, drop and recreate on schema change

## LLM integration

- All Claude API calls go through src/services/llm.py wrapper
- Never call anthropic SDK directly from API routers
- Use Claude Sonnet 4 by default (claude-sonnet-4-20250514)
- Token limits: max_tokens=1024 default, increase only when needed
- Always handle API errors gracefully with user-friendly messages

## Frontend (Streamlit)

- Single app entry: frontend/streamlit_app.py
- Use st.session_state for cross-page state
- Backend URL configurable via environment variable (default localhost:8000)
- Use st.cache_data for expensive computations, st.cache_resource for connections
- Forms: use st.form to batch inputs, avoid rerun storms

## Configuration

- All config in src/config.py using pydantic-settings
- Read from .env file in development
- Never hardcode secrets, API keys, or URLs
- Defaults provided for non-secret config