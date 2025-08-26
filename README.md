# AI Rewriter Demo (Next.js)

A minimal **Next.js 14** demo that rewrites user text using **OpenAI**. Includes a simple UI and an API route. If an `OPENAI_API_KEY` is not provided, the API falls back to a **mocked** rewriter so you can still demo it.

## ✨ Features

- Next.js App Router with `/api/rewrite` endpoint
- Client UI (textarea + tone selector + extra instructions)
- Uses OpenAI via `openai` npm package
- Graceful **mock mode** when no API key is set
- Strict TypeScript and simple, clean code

## 🚀 Quickstart

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Set up your OpenAI API key (Optional)**
    For real AI rewriting, create a `.env.local` file in the project's root directory and add your key:
    ```
    OPENAI_API_KEY=sk-...
    ```
    If you skip this step, the app will run in mock mode.

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Navigate to `http://localhost:3000` in your web browser.