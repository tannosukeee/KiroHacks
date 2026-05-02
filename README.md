# [PROJECT NAME]

> [One-line tagline]

## What it does

[2-3 sentences describing the product and the problem it solves]

## The problem we're solving

[Concrete description of the social problem, ideally with statistics]

## How we built it

Built with Python, FastAPI, SQLAlchemy, Streamlit, and Anthropic Claude API. 
Developed entirely in Kiro IDE with spec-driven development, agent hooks, and custom MCP integrations.

## Track alignment

**Track**: [TRACK NAME]

[Explanation of why this project fits the track]

## Social good impact

[Specific population, specific problem, specific outcome]

## Tech stack

- **Language**: Python 3.11+
- **Backend**: FastAPI, SQLAlchemy 2.0 (async), SQLite
- **Frontend**: Streamlit
- **AI**: Anthropic Claude API (Claude Sonnet 4)
- **IDE**: Kiro

## Setup and run

### Prerequisites
- Python 3.11 or higher
- Anthropic API key (from console.anthropic.com)

### Installation
```bash
git clone https://github.com/[USERNAME]/[REPO-NAME].git
cd [REPO-NAME]
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### Running
```bash
# Terminal 1 - backend
uvicorn src.main:app --reload

# Terminal 2 - frontend
streamlit run frontend/streamlit_app.py
```

Frontend at http://localhost:8501, API docs at http://localhost:8000/docs

## Kiro Powers Writeup

### Spec-driven development

[Describe specs created in .kiro/specs/. Examples:
- Spec X: requirements, design decisions, task breakdown
- How spec-driven approach prevented scope creep
- Comparison with vibe coding for specific features]

### Agent hooks

[Describe hooks in .kiro/hooks/. Examples:
- Hook for auto-running tests on save
- Hook for syncing spec changes with implementation
- Time saved and bugs prevented]

### Steering documents

[Describe .kiro/steering/ files. Examples:
- Coding conventions doc enforced consistent style
- Architecture doc prevented layering violations
- Project overview kept Kiro focused on scope]

### MCP integrations

[Describe custom MCP servers or external integrations. Examples:
- Custom MCP server for [domain-specific data source]
- External API integration via MCP
- Capabilities enabled that weren't possible otherwise]

### Vibe coding moments

[Describe moments where conversational coding shined. Examples:
- Quick prototyping of feature X
- Iterating on prompt engineering for Y
- Most impressive code generation moment]

## Demo

[Link to YouTube/Vimeo demo video - 3 minutes]

## Team

- Tan Nguyen
- Valerie Truong
- Kailuan Liu

## License

MIT - see [LICENSE](LICENSE) file for details.

## Acknowledgments

Built at KiroHacks 2026, hosted by Cal Poly's CS+AI Club. Special thanks to AWS for sponsoring and providing on-site mentorship.