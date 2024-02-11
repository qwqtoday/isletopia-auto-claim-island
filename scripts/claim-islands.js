const { createBot } = require('mineflayer')
const fs = require('fs')



async function main() {
    let file = fs.readFileSync("./accounts.json")
    /**
     * @type {string[]}
     */
    let accounts = JSON.parse(file.toString())
    for (let account of accounts) {
        console.log(account)
        let bot = createBot({
            host: "play.molean.com",
            fakeHost: "play.molean.com",
            username: account,
            auth: "microsoft",
            viewDistance: 2
        })
        let promise = new Promise((resolve, reject) => {
            bot.once('spawn', async () => {
                bot.chat("/is create")
                await bot.waitForTicks(20 * 10)
                resolve()
            })
        })
        await promise
        bot.end()
    }
}

main()