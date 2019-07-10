module.exports = {
    waitInMs: function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}