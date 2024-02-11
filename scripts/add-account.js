const fs = require('node:fs')
const { createBot } = require('mineflayer')
const yargs = require('yargs')

const options = yargs
    .usage("Usage: -n <name>")
    .option("name", {
        alias: "n",
        describe: "The name of the account.",
        demandOption: true
    })
    .argv

let bot = createBot({
    host: "play.molean.com",
    fakeHost: "play.molean.com",
    username: options.name,
    auth: "microsoft",
})

bot.on('spawn', () => {
    if (!fs.existsSync("./accounts.json")) {
        fs.writeFileSync("./accounts.json", "[]")
    }
    let file = fs.readFileSync("./accounts.json")
    /**
     * @type {string[]}
     */
    let accounts = JSON.parse(file.toString())
    if (!accounts.includes(options.name)) {
        accounts.push(options.name)
        fs.writeFileSync("./accounts.json", JSON.stringify(accounts))
        console.log(`Successfully added the account ${bot.username} as the name ${options.name}`)
    } else {
        console.log("The account is already in the list.")
    }
    process.exit()
})