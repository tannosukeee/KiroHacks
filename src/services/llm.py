"""Wrapper around Anthropic Claude API. All LLM calls go through here."""
from functools import lru_cache

from anthropic import AsyncAnthropic

from src.config import settings


@lru_cache(maxsize=1)
def get_client() -> AsyncAnthropic:
    """Return cached Anthropic client instance."""
    return AsyncAnthropic(api_key=settings.anthropic_api_key)


async def ask_claude(
    prompt: str,
    system: str | None = None,
    model: str | None = None,
    max_tokens: int = 1024,
) -> str:
    """Send a single-turn prompt to Claude and return the text response.

    Args:
        prompt: User message content
        system: Optional system prompt for behavior priming
        model: Override default model
        max_tokens: Maximum tokens in response

    Returns:
        Text content of Claude's response
    """
    client = get_client()
    response = await client.messages.create(
        model=model or settings.anthropic_model,
        max_tokens=max_tokens,
        system=system or "You are a helpful assistant.",
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text