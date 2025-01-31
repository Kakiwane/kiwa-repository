const { evaluate } = require("mathjs");

module.exports = {
    name: "m",
    description: "Kalkulator sederhana",
    async execute(message, args) {
        if (args.length === 0) {
            return message.reply("❌ Tolong berikan ekspresi matematika untuk dihitung!");
        }

        const expression = args.join(" ");
        try {
            let result = evaluate(expression);

            // Memastikan hasil selalu berupa float dengan 2 angka desimal
            if (typeof result === "number") {
                result = parseFloat(result.toFixed(2));
            }

            await message.reply(`Hasil dari \`${expression}\` adalah **${result}**`);
        } catch (error) {
            await message.reply("❌ Ekspresi matematika tidak valid!");
        }
    },
};
