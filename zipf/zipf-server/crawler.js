const fetch = require('node-fetch');
const wordsExtractor = require('./webpageWordsExtractor');
const serverUtils = require('./utils/serverUtils')
const CONSTANTS = require('./constants');


module.exports = async (socketClient, urlToCrawl) => {
    let currentProcessUrlIndex = 0;
    let urlQueue = [urlToCrawl];
    while (urlQueue.length) {
        const currentUrl = urlQueue[currentProcessUrlIndex];
        const sanatizedUrl = currentUrl.indexOf(urlToCrawl) === -1 ? `${urlToCrawl}${currentUrl}` : currentUrl;

        console.log('crawling', sanatizedUrl, '\n\n');

        const currentFetchedPage = await fetch(sanatizedUrl);
        const webPageString = await currentFetchedPage.text();
        const newWordsAndUrls = wordsExtractor(webPageString);
        socketClient.emit('event', newWordsAndUrls.worldList);
        currentProcessUrlIndex++;
        urlQueue.shift();
        urlQueue = [...urlQueue, ...newWordsAndUrls.urlsList];
        await serverUtils.waitInMs(CONSTANTS.WAIT_TIME_BEFORE_NEXT_POLL_MS); // waiting for some time before nextPoll
    }

}