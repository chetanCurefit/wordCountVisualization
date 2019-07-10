const jsdom = require("jsdom");

module.exports = (webpageText) => {
    const { JSDOM } = jsdom;

    let worldList = [];
    let urlsList = [];
    const dom = new JSDOM(webpageText);

    // extrating words
    const extractedText = dom.window.document.body.textContent;
    const parsedText = extractedText.replace(/[\r\n]/g, '').replace(/[^\w\s]/gi, ''); // replacing all new lines and then special chars
    worldList = [...worldList, ...parsedText.split(/\W+/)].map(word => word.trim()); // getting words list in extarcted Text and removing white spaces

    // extracting new urls
    const newLinksOnCurrentPage = dom.window.document.body.getElementsByTagName('a');
    for (let i = 0; i < newLinksOnCurrentPage.length; i++) {
        urlsList.push(newLinksOnCurrentPage[i].href);
    }

    return { worldList, urlsList };

}



