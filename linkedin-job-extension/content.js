// guard against double-injection
if (!window.__liJobTrackerInjected) {
  window.__liJobTrackerInjected = true;
  console.log("✅ LinkedIn Job Tracker content script loaded");

  let lastKey = "";
  let lastUrl = location.href;

  function extractJobData() {
    // 1) JSON-LD
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld) {
      try {
        const obj = JSON.parse(ld.textContent);
        const t = obj.title?.trim() || "";
        const c = obj.hiringOrganization?.name?.trim() || "";
        if (t && c) return { title: t, company: c };
      } catch {}
    }
    // 2) <h1> fallback
    const t = document.querySelector("h1")?.innerText.trim() || "";
    // 3) company via any <a href*="/company/">
    let c = "";
    document.querySelectorAll('a[href*="/company/"]').forEach(a => {
      const txt = a.innerText.trim();
      if (txt && !/show more|learn more|see all/i.test(txt)) {
        c = txt;
      }
    });
    return { title: t, company: c };
  }

  function storeIfNew() {
    const { title, company } = extractJobData();
    const key = `${title}@@${company}`;
    if (title && company && key !== lastKey) {
      lastKey = key;
      localStorage.setItem("linkedin_job", JSON.stringify({ title, company }));
      console.log("🚀 Stored job:", { title, company });
    }
  }

  // initial extract
  storeIfNew();

  // watch for LinkedIn’s SPA navigation
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      console.log("🔄 URL changed:", lastUrl);
      setTimeout(storeIfNew, 500);
    }
  }).observe(document, { childList: true, subtree: true });

  // answer popup’s getJob requests
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getJob") {
      const raw = localStorage.getItem("linkedin_job");
      sendResponse({ job: raw ? JSON.parse(raw) : null });
    }
  });
}
