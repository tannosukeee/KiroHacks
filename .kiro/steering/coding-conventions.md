# Coding Conventions

## Python style
- Python 3.11+ syntax (use `X | Y` for unions, not `Union[X, Y]`)
- Type hints REQUIRED for all function signatures, parameters, and return values
- Use Pydantic v2 BaseModel for data validation, never raw dicts in API contracts
- Prefer async/await for all FastAPI endpoints and DB operations
- Use `pathlib.Path` instead of `os.path` for file operations

## Naming conventions
- Functions: snake_case with descriptive verbs (get_user, create_project, not user, project)
- Classes: PascalCase (ProjectService, UserSchema)
- Constants: UPPER_SNAKE_CASE at module level (MAX_FILE_SIZE, DEFAULT_TIMEOUT)
- Private functions: prefix with underscore (_internal_helper)
- Pydantic schemas: suffix with In/Out for request/response (ProjectIn, ProjectOut)
- SQLAlchemy models: singular noun (Project, not Projects)

## Error handling
- Use FastAPI's HTTPException for API errors, not raw exceptions
- Always include detail message in HTTPException with actionable info
- HTTP status codes: 400 for validation, 404 for not-found, 409 for conflict, 500 for unexpected
- Log errors with context (user_id, request_id) before raising
- Never leak internal exception details to clients

## Async patterns
- All DB calls must be awaited
- Use `async with` for session context managers
- Avoid blocking calls in async functions (no `time.sleep`, use `asyncio.sleep`)
- For LLM calls, use the async client and await responses

## Testing
- Every endpoint MUST have at least one happy-path test and one error test
- Use pytest fixtures defined in conftest.py for shared setup
- Test files mirror source structure: src/api/projects.py corresponds to tests/api/test_projects.py
- Use httpx.AsyncClient for testing async endpoints, not TestClient
- Mock LLM calls in unit tests, real calls only in integration tests marked with @pytest.mark.integration

## Comments and docstrings
- Don't write comments that just rename variables (bad: `i += 1  # increment i`)
- Do write comments explaining WHY, not WHAT (good: `# fallback for users on old client versions`)
- Public functions need docstrings: short summary line, blank line, then details if complex
- Use Google-style docstrings for consistency

## Imports
- Standard library first, then third-party, then local imports
- Use absolute imports for src/ modules (from src.services import llm)
- No wildcard imports (no `from x import *`)