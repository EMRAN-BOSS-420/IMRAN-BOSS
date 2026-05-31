module.exports = {
	config: {
		name: "autoreactunsend",
		version: "1.0",
		author: "ChatGPT",
		role: 0,
		description: "🐦‍🔥 react dile bot msg unsend korbe",
		category: "box chat"
	},

	onReaction: async function ({ event, api }) {
		try {
			if (
				event.reaction == "🐦‍🔥" &&
				event.userID != api.getCurrentUserID()
			) {
				api.unsendMessage(event.messageID);
			}
		}
		catch (e) {
			console.log(e);
		}
	}
};