import { Client, Intents } from 'discord.js';

// events
import { config } from "../utils/config.js";
import { events } from "./events/index.js";

// jobs
import { solotodo } from './jobs/solotodo.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const gpu = [
  "https://www.solotodo.cl/video_cards?gpu_families=106058&gpu_lines=819952&ordering=offer_price_usd&",
  "https://www.solotodo.cl/video_cards?gpu_families=106058&gpu_lines=1240913&ordering=offer_price_usd&"
];

client.on('ready', events.ready);
client.on("messageCreate", events.messageCreate);

const main = async () => {
  await client.login(config.token);

  setInterval(() => {
    gpu.forEach(async (url) => {
      const message = await solotodo(url);

      if (message !== "No hay nuevos datos que enviar") {
        client.channels.cache.get('920003485938876446').send(message);
      }
    });
  }, 1000 * 60);
};

main();
