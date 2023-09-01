chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "fetchedHTML") {
        // Parse the HTML content using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(message.content, 'text/html');

        // Extract content from heading and <p> tags
        let extractedContent = "";
        doc.querySelectorAll('h1, h2, p').forEach(element => {
            extractedContent += element.innerHTML + '\n';
        });

        // Send parsed content back to background script
        sendResponse({action: "parsedHTML", content: extractedContent});

        // Forward the parsed content to the React app:
        window.postMessage({type: "FROM_CONTENT_SCRIPT", text: extractedContent}, "*");
    }
});