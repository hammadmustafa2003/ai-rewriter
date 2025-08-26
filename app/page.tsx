'use client';

import React, { useState } from 'react';

type RewriteResponse = {
  output: string;
  model: string;
  mocked?: boolean;
};

export default function Page() {
  const [input, setInput] = useState<string>('Paste your paragraph here...');
  const [tone, setTone] = useState<string>('professional');
  const [instructions, setInstructions] = useState<string>('Improve grammar, clarity, and flow while preserving meaning.');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, tone, instructions }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Request failed');
      }
      const data: RewriteResponse = await res.json();
      setResult(data.output);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>AI Text Rewriter</h1>
      <p style={{ marginTop: 0 }}>Instantly improve grammar, tone, and clarity. Includes a mock fallback if no API key is set.</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        <label>
          <div style={{ marginBottom: 8 }}>Tone</div>
          <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ padding: 8, width: '100%' }}>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="concise">Concise</option>
            <option value="persuasive">Persuasive</option>
            <option value="empathetic">Empathetic</option>
          </select>
        </label>

        <label>
          <div style={{ marginBottom: 8 }}>Instructions (optional)</div>
          <input
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Any extra guidance for the AI"
            style={{ padding: 8, width: '100%' }}
          />
        </label>

        <label>
          <div style={{ marginBottom: 8 }}>Input Text</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            style={{ padding: 12, width: '100%', resize: 'vertical' }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #ccc', cursor: 'pointer' }}
        >
          {loading ? 'Rewriting…' : 'Rewrite'}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #f99', borderRadius: 8 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <section style={{ marginTop: 24 }}>
          <h2>Result</h2>
          <textarea readOnly value={result} rows={10} style={{ padding: 12, width: '100%', resize: 'vertical' }} />
        </section>
      )}

      <footer style={{ marginTop: 40, fontSize: 12, opacity: 0.8 }}>
        Tip: Set <code>OPENAI_API_KEY</code> in <code>.env.local</code> to use real AI. Without it, the API returns a mocked rewrite.
      </footer>
    </main>
  );
}