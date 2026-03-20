## Overview

TaxCopilot is an AI-powered legal assistant built for Indian tax professionals. It helps lawyers, consultants, and businesses navigate GST notices and disputes—taking a scanned PDF of a tax notice and turning it into a structured legal analysis, a grounded reply draft, and an ongoing conversation grounded in actual law.

The core challenge was not just "wrapping an LLM around legal documents." It was building a system that could **cite real sections**, **refuse to hallucinate**, and **produce court-ready output** while remaining fast enough for daily professional use.

## Problem

Indian tax professionals face an avalanche of GST notices and dispute filings, each requiring:

- Document parsing from scanned, non-machine-readable PDFs
- Deep knowledge of the CGST Act, SGST Act, IGST Act, GST Rules, and Income Tax Act 1961
- Drafting formal, legally defensible replies citing specific sections and rules
- Doing all of this under tight deadlines

The existing workflow is almost entirely manual. A consultant receives a notice, extracts the key demands by reading it line by line, looks up relevant sections, and drafts a reply in Google Docs. This can take hours per case.

## Solution

TaxCopilot compresses that workflow into minutes. A user uploads their notice, and the system:

1. **OCR-extracts** the full text using AWS Textract (handling scanned PDFs and handwritten notices)
2. **Retrieves relevant law** from a pgvector knowledge base seeded with Indian tax statutes
3. **Analyzes** the notice—classifying its type, extracting demands, deadlines, and risk level
4. **Generates a formal draft reply** grounded strictly in retrieved law (with citation validation and automatic retry on hallucination)
5. **Enters a live chat session** where the user can drill into any aspect, ask follow-up questions, and generate strategy or HTML-formatted drafts

Every legal assertion is traced back to a retrieved passage. If the knowledge base doesn't have it, the system says so—it does not fabricate section numbers.

## Architecture

TaxCopilot is built as four decoupled services, each with a focused responsibility.

- **AI Microservice** (Python / FastAPI): The intelligence layer. Handles all five modes—`chat`, `decode`, `analyze`, `strategy`, and `draft`—via a single unified `/api/v1/ask` endpoint. Uses pgvector for semantic retrieval (Bedrock Titan embeddings) and AWS Bedrock (Nova Lite) as the primary LLM, with Gemini 2.5 Flash as an automatic fallback. Chat history is stored server-side in PostgreSQL.

- **Backend Service** (Node.js / Express / Prisma): Manages users, authentication (JWT), cases, documents, and file uploads to S3. Implements soft-delete and restore for cases, and persists per-case chat sessions and message history.

- **Gateway Service** (Node.js / Express): A lightweight reverse proxy that rate-limits all inbound traffic, validates JWT tokens, and routes requests to the appropriate downstream service. The frontend only ever talks to the gateway.

- **Frontend** (Next.js / TypeScript): A clean workspace UI with a case-based structure. Each case has its own sidebar, document library, chat panel, and a rich-text editor (TipTap) for drafting. A custom `FontSizeExtension` enables professional formatting in the legal draft editor.

## Challenges

### 1. Hallucination Prevention

LLMs will confidently cite non-existent sections if not constrained. I built a **citation validation pass** that extracts every `Section X` and `Rule Y` reference from the model's output and checks whether those numbers appear in the retrieved context. If they don't, the system sends an explicit warning message and forces a retry. The final output marks whether the reply is fully grounded.

### 2. Dual-LLM Fallback Without Code Duplication

Both Bedrock and Gemini are called identically—same LangChain interface, same prompt structure. On any Bedrock failure (`BotoCoreError`, `ClientError`), the system falls back to Gemini transparently. The `_invoke_bedrock_with_fallback` helper encapsulates this, keeping mode-specific services clean.

### 3. Server-Side Chat History

Rather than trusting the frontend to send accurate history on every request, TaxCopilot stores all messages in a Postgres table with `(document_id, mode, created_at)` indexing. Each mode request loads only the last N messages as context. This means context is always consistent regardless of which device or tab the user is on.

### 4. Agentic Legal Drafting

The "draft" mode editor isn't just generation—it is an **agentic editor**. The system receives the full HTML document and a user instruction ("add a confidentiality clause after paragraph 3", "fill state as Maharashtra"), then returns the complete modified document. The output is direct HTML, preserving all formatting, indentation, and legal structure. No markdown, no partial sections.

## Learnings

Building a production AI product on top of regulated, citation-dependent content forced a discipline that toy projects don't. You cannot get away with vague output when a wrong section number could cause a client to lose a ₹10 lakh dispute.

The biggest shift was moving from **generation-first** to **retrieval-first** thinking. The LLM is the last step, not the first. Everything before it—Textract, pgvector retrieval, history loading, document caching—exists to give the model the exact right context so it can stop guessing.
