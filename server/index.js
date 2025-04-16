import TelegramBot from "node-telegram-bot-api"
const token = "8057142084:AAGum2YPEOclStho_uq-n5iQrob4cX6b5_0"
const bot = new TelegramBot(token, { polling: true })


bot.setMyCommands([
    { command: '/start', description: "Boshlash" },
    { command: '/about', description: "Biz haqimizda" }
])
bot.on('message', async message => {
    const chatId = message.chat.id
    const text = message.text
    if (text === '/start') {
        return bot.sendMessage(chatId, `Hello  ${message.chat.first_name}`)
    }
    if (text === '/about') {
        return bot.sendMessage(chatId, 'Startum Online Course ', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: "About Course",
                            web_app: {
                                url: "https://online-course11.netlify.app/"
                            }
                        }
                    ]
                ]
            }
        })

    }
    try {
        if (message.web_app_data?.data) {
            const data = JSON.parse(message.web_app_data.data)
            data.map((item, index) => {
                bot.sendMessage(chatId, `Sizning tanlagan kursingiz " ${item.title} "va narxi "${item.price}$" darajasi "${item.level}" va qancha davom edish "${item.length}"  `)
            })
        }
    } catch (error) {
        console.log(error)
    }
})
