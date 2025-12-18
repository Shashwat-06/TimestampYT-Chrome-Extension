console.log("Content script loaded");
type TimeStampRespone = {
  time: Number;
  title: String;
  url: String;
};

chrome.runtime.onMessage.addListener(
  (msg: { type: String }, _, sendResponse) => {
    if (msg.type !== "GET_TIMESTAMP") return;
    const video = document.querySelector("video") as HTMLVideoElement | null;
    if (!video) {
      sendResponse({ error: "No video found" });
      return;
    }
    const response: TimeStampRespone = {
      time: video.currentTime,
      title: document.title,
      url: window.location.href.split("&")[0],
    };
    sendResponse(response);
  }
);
