import { useEffect, useState } from "react";
import "./App.css";
import { Copy, Trash } from "lucide-react";

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
  const deleteTimeStamp = (id: number) => {
    chrome.storage.sync.get(
      { timestamps: [] as TimestampEntry[] },
      (data: { timestamps: TimestampEntry[] }) => {
        const updated = data.timestamps.filter(
          (ts: TimestampEntry) => ts.createdAt !== id
        );

        chrome.storage.sync.set({ timestamps: updated }, () => {
          setTimestamps(updated);
        });
      }
    );
  };
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
    <div className="w-72 h-96 mt-4 font-sans flex flex-col">
      <h1 className="whitespace-nowrap">TimestampYT</h1>
      <button onClick={saveTimeStamp} className="mt-2 mx-20">
        Save Timestamp
      </button>
      <p>{status}</p>
      <ul className="max-h-64 overflow-y-auto overflow-x-hidden ">
        {timestamps.map((ts) => (
          <li key={ts.createdAt}>
            <div className="bg-[#1a1a1c] rounded-xl m-2 flex flex-row justify-around p-2">
              {" "}
              <a
                href={ts.url}
                target="_blank"
                className="flex-3 w-full flex-wrap"
              >
                {ts.title}
              </a>
              <button
                className="flex-1 flex justify-center items-center"
                onClick={() => {
                  navigator.clipboard.writeText(ts.url);
                }}
              >
                <Copy />
              </button>
              <button
                onClick={() => {
                  deleteTimeStamp(ts.createdAt);
                }}
              >
                <Trash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
