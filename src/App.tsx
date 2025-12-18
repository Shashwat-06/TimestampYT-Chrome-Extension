import { useEffect, useState } from "react";
import "./App.css";

type TimestampEntry = {
  title: string;
  url: string;
  time: number;
  createdAt: number;
};
function App() {
  const [timestamps, setTimestamps] = useState<TimestampEntry[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(
      { timestamps: [] },
      (data: { timestamps: TimestampEntry[] }) => {
        setTimestamps(data.timestamps);
      }
    );
  }, []);

  const saveTimeStamp = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "GET_TIMESTAMP" },
        (response) => {
          if (!response || response.error) {
            setStatus("no video found");
            return;
          }
          const entry: TimestampEntry = {
            title: response.title,
            url: `${response.url}&t=${Math.floor(response.time)}s`,
            time: response.time,
            createdAt: Date.now(),
          };

          chrome.storage.sync.get(
            { timestamps: [] as TimestampEntry[] },
            (data: { timestamps: TimestampEntry[] }) => {
              const updated = [...data.timestamps, entry];
              chrome.storage.sync.set({
                timestamps: [...data.timestamps, entry],
              });
              setTimestamps(updated);
              setStatus("timeStamp saved successfully");
            }
          );
        }
      );
    });
  };

  return (
    <>
      <h1>YouTube Timestamp Saver</h1>
      <button onClick={saveTimeStamp}>Save Timestamp</button>
      <p>{status}</p>
      <ul>
        {timestamps.map((ts) => (
          <li key={ts.createdAt}>
            <a href={ts.url} target="_blank">
              {ts.title}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(ts.url);
              }}
            >
              copy to clipboard
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
