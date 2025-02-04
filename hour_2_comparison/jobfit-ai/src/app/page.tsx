'use client'
import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [list, setList] = useState<string[] | null>([]);

  const analyzeJobFit = async () => {
    const response = await fetch("http://localhost:5001/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription }),
    });
    const data = await response.json();
    setMatchScore(data.matchScore);
    setList(data.list);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">JobFit AI</h1>
      <textarea
        className="w-full p-2 border"
        placeholder="Paste Resume Here"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <textarea
        className="w-full p-2 border mt-2"
        placeholder="Paste Job Description Here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button onClick={analyzeJobFit} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
        Analyze Fit
      </button>
      {/* {matchScore !== null && <p className="mt-2">Match Score: {matchScore}%</p>} */}
      {list !== null && <ul>
        {list.map((listItem, index) => (
          
          <ShowListItem key={index} text={listItem} index={index} />
        ))}
      </ul>}
    </div>
  );
}

interface ShowListItemProps {
  text: string;
  index: number;
}

function ShowListItem({ text, index }: ShowListItemProps) {
  return (
    <>
      <p>{index}:</p>
      <li>{text}</li>;
    </>
  )
}
