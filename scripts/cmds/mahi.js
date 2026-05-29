const axios = require('axios');

const LOCKED_AUTHOR = "FARHAN-KHAN";

// 🎵 Voice List
const songs = [
    "https://files.catbox.moe/rbbukc.mp3",
    "https://files.catbox.moe/lssnaq.mp3",
    "https://files.catbox.moe/dwwa0b.mp3",
    "https://files.catbox.moe/oqdhpi.mp3",
    "https://files.catbox.moe/kgl4qy.mp3",
    "https://files.catbox.moe/q62hco.mp3",
    "https://files.catbox.moe/941wy3.mp3",
    "https://files.catbox.moe/y951y2.mp3",
    "https://files.catbox.moe/j8aly8.mp3",
    "https://files.catbox.moe/knbcsa.mp3",
    "https://files.catbox.moe/6r9a0q.mp3",
    "https://files.catbox.moe/tksdsh.mp3",
    "https://files.catbox.moe/ng48w0.mp3",
    "https://files.catbox.moe/xpsbrv.mp3",
    "https://files.catbox.moe/yclzbp.mp3",
    "https://files.catbox.moe/jtselt.mp3",
    "https://files.catbox.moe/k6zvre.mp3",
    "https://files.catbox.moe/n00sm0.mp3",
    "https://files.catbox.moe/vobj4c.mp3",
    "https://files.catbox.moe/nv8t0p.mp3",
    "https://files.catbox.moe/znipjw.mp3",
    "https://files.catbox.moe/d0lcxj.mp3",
    "https://files.catbox.moe/cf01jp.mp3",
    "https://files.catbox.moe/q7fu6p.mp3"
];

let songIndex = 0;

module.exports = {
    config: {
        name: "mahi",
        aliases: [],
        version: "11.1.0",
        author: "FARHAN-KHAN",
        countDown: 0,
        role: 0,
        description: "Voice reply only for mahi",
        category: "fun"
    },

    onStart: async function () {},

    onChat: async function ({ api, event }) {

        const { body, threadID, messageID } = event;

        if (!body) return;

        const lowerBody = body.toLowerCase().trim();

        // ✅ ONLY mahi trigger
        if (
            lowerBody === "mahi" ||
            lowerBody.startsWith("mahi ")
        ) {

            try {

                const songUrl = songs[songIndex];
                songIndex = (songIndex + 1) % songs.length;

                const songStream = await axios({
                    url: songUrl,
                    method: "GET",
                    responseType: "stream",
                    timeout: 10000,
                    headers: {
                        "User-Agent": "Mozilla/5.0"
                    }
                });

                return api.sendMessage({
                    attachment: [songStream.data]
                }, threadID, messageID);

            } catch (err) {

                console.log("❌ Voice Error:", err.message);

            }
        }
    }
};

// 🔒 AUTHOR LOCK
if (module.exports.config.author !== "FARHAN-KHAN") {
    console.log("❌ AUTHOR CHANGED! BOT STOPPED");
    process.exit(1);
}