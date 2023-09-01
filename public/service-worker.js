// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
  
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === 'complete') {
    const url = new URL(tab.url);
    // Fetch the HTML content of the webpage
    fetch(url,{method: 'GET'})
      .then(response => {return response.text()})
      .then(html => {
        return html;
      }).then(html => chrome.runtime.sendMessage({action: "fetchedHTML", content: html}))
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });
  }
});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Get the information about the newly activated tab
  const tabId = activeInfo.tabId;

  // Retrieve the tab using its ID
  chrome.tabs.get(tabId, function(tab) {
    // Check if the tab is accessible
    if (!chrome.runtime.lastError && tab && tab.url.startsWith("http")) {
      const pageUrl = tab.url;
      console.log("URL of the active page:", pageUrl);

      // Fetch the HTML content of the webpage
      fetch(tab.url,{method: 'GET'})
      .then(response => { return response.text()})
      .then(html => {
        return html
      }).then(html => chrome.runtime.sendMessage({action: "fetchedHTML", content: html}))
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });
    }
  });
});