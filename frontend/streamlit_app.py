"""Streamlit frontend entry point."""
import os

import httpx
import streamlit as st

API_URL = os.environ.get("API_URL", "http://localhost:8000")

st.set_page_config(
    page_title="Hackathon Project",
    page_icon=":sparkles:",
    layout="wide",
)

st.title("Hackathon Project")
st.caption("Built at KiroHacks 2026")

# Sidebar
with st.sidebar:
    st.header("Navigation")
    st.markdown("Add your navigation here")

    # Health check
    try:
        response = httpx.get(f"{API_URL}/health", timeout=2.0)
        if response.status_code == 200:
            st.success("API connected")
        else:
            st.warning(f"API returned {response.status_code}")
    except httpx.RequestError:
        st.error("API not reachable")

# Main content
st.markdown("## Welcome")
st.write("Replace this with your project content on hackathon day.")