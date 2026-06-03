const axios = require("axios");

let imageIndex = 0;

module.exports = {
  config: {
    name: "adminmention",
    version: "20.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fast caption + image reply",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    // 🔒 Author lock
    if (this.config.author !== "Farhan-Khan") return;

    const admins = [
      { uid: "61590253059850", names: ["@Emran Boss"] },
      { uid: "61586695271407", names: ["@ ইমরান"] }
    ];

    const senderID = String(event.senderID);
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );

    if (!isMentioning) return;

    // 🖼️ Image list (ভিডিওর জায়গায়)
    const images = [
      "https://files.catbox.moe/8s4kkw.png",
      "https://files.catbox.moe/8s4kkw.png",
      "https://files.catbox.moe/8s4kkw.png"
    ];

    const imageUrl = images[imageIndex];
    imageIndex = (imageIndex + 1) % images.length;

    // ✍️ captions
    const captions = [
      "Mantion_দিস না ইমরান বস এর মন মন ভালো নেই আস্কে-!💔🥀",
      "- আমার বস ইমরান এর সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
      "👉আমার বস ইমরান এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো",
      "বস ইমরান কে এত মেনশন না দিয়ে বক্স আসো হট করে দিবো🤷‍ঝাং 😘🥒",
      "বস ইমরান কে Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",
      "ইমরান বস এখন বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
      "ইমরান বস কে এতো মেনশন নাহ দিয়া বস কে একটা জি এফ দে 😒 😏",
      "Mantion_না দিয়ে বস ইমরান এর সাথে সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
      "বস ইমরান কে মেনশন দিসনা পারলে একটা জি এফ দে",
      "বাল পাকনা Mantion_দিস না বস ইমরান প্রচুর বিজি আছে 🥵🥀🤐",
      "চুমু খাওয়ার বয়স টা আমার বস ইমরান চকলেট🍫খেয়ে উড়িয়ে দিল 🤗"
    ];

    const mentionNames = mentionedIDs.map(id => `@${id}`).join(", ");

    const caption = `
✿•≫───────────────≪•✿
『 ${captions[Math.floor(Math.random() * captions.length)]} 』
✿•≫───────────────≪•✿
`;

    try {
      // ⚡ Fast Image Fetch
      const imgStream = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
        timeout: 5000, // fast response
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      await message.reply({
        body: caption,
        attachment: imgStream.data
      });

    } catch (err) {
      console.log("❌ Image error:", err.message);
      await message.reply("😢 পিক দিতে পারলাম না");
    }
  }
};
