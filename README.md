# Vybe Tutor

> A IDE extension to help students learn from vibe coding rather than exploit it. 

## What it does

[2-3 sentences describing the product and the problem it solves]

## The problem we're solving

Vibe coding has been a great tool for students, faculty, and companies alike. Yet, it can become a double-edged sword, especially for students. For example, students can blindly paste code without understanding what the code is doing or security concerns that come with the code. We aim to build an extension to provide real-time and inline for students when vibe coding. 

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
- **Backend**: FastAPI, SQLite
- **Frontend**: React
- **AI**: Google Gemini 2.5 Flash 
- **IDE**: Kiro

## Setup and run

### Prerequisites
- Python 3.11 or higher
- Google Gemini (from Google AI Studio)

### Installation
```bash
git clone https://github.com/tannosukeee/KiroHacks.git
cd KiroHacks
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
brew install python        # (Optional) Install Python via Homebrew
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GOOGLE_GEMINI_API_KEY
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

### Agent Hooks

We use hooks in `.kiro/hooks/` to automate repetitive tasks and maintain consistency across the system.
**Examples:**
- **Auto-run tests on save**  
  Runs tests when relevant files change, helping catch errors early and reducing manual checks.
- **Spec to implementation sync**  
  Ensures updates to contracts (e.g., Zod schemas and message types) are reflected across the codebase, preventing mismatches between AI output and UI.
- **Mock to real mode switching**  
  Enables seamless fallback between mock responses and live Gemini calls for faster development and safer demos.
**Impact:**
- Saves time by reducing manual steps  
- Prevents bugs caused by stale types or broken contracts  
- Keeps the AI pipeline consistent and predictable

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
