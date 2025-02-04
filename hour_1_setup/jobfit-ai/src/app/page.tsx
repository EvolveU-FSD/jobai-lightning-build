'use client'
import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">JobFit AI</h1>
      <textarea
        className="w-full p-2 border"
        placeholder="Paste Resume Here"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      </div>
  );
}