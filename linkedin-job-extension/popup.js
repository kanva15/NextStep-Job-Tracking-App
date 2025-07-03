document.addEventListener("DOMContentLoaded", () => {
  const infoEl      = document.getElementById("jobInfo");
  const saveBtn     = document.getElementById("saveBtn");
  const statusSelect= document.getElementById("statusSelect");
  const statusMsg   = document.getElementById("statusMessage");

  // 1) ask the page (content script) for the latest job
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getJob" }, response => {
      const job = response?.job;
      if (job?.title && job?.company) {
        infoEl.innerText = `${job.title} @ ${job.company}`;
        saveBtn.disabled = false;
      } else {
        infoEl.innerText = "Not on a LinkedIn job page";
      }
    });
  });

  // 2) on save, re-fetch job, then POST to your server
  saveBtn.addEventListener("click", () => {
    statusMsg.innerText = "Saving…";
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getJob" },
        response => {
          const job = response?.job;
          if (!job) {
            statusMsg.innerText = "❌ No job to save";
            return;
          }
          fetch("http://localhost:5000/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              company: job.company,
              position: job.title,
              notes: "Saved via extension",
              status: statusSelect.value,
            }),
          })
            .then(r => r.json())
            .then(() => {
              statusMsg.innerText = "✅ Saved!";
              saveBtn.disabled = true;
            })
            .catch(() => {
              statusMsg.innerText = "❌ Failed to save";
            });
        }
      );
    });
  });
});
