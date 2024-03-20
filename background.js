chrome.action.onClicked.addListener(async (tab) => {
  let [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.tabs.sendMessage(activeTab.id, {
    message: "get_url",
    url: activeTab.url,
  });
});
chrome.tabs.create({ url: "notice.html" });
