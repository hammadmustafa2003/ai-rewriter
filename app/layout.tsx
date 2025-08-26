import React from 'react';

export const metadata = {
  title: "AI Rewriter Demo",
  description: "Rewrite and improve text instantly with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, Arial, sans-serif', margin: 0, padding: 24 }}>
        {children}
      </body>
    </html>
  );
}