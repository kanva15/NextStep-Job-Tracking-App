// background.js
// Relay popup→content messages by tab

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getJob") {
    // find the active LinkedIn tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab) {
        return sendResponse({ job: null });
      }
      chrome.tabs.sendMessage(
        tab.id,
        { action: "extractJob" },
        (response) => {
          sendResponse(response || { job: null });
        }
      );
    });
    return true; // keep channel open for async sendResponse
  }
});
