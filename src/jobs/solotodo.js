import JSSoup from 'jssoup';
import fetch from "node-fetch";

const excludes = [4, 5, 7, 8, 10, 11, 13, 14];
const lastSentMessages = {};

export const solotodo = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  const soup = new JSSoup.default(text, false);
  const elements = soup.findAll('div', 'card-block');

  let message = '////***** Solotodo GPU notifier *****////\n';
  message += url;
  message += '\n';
  elements[1].contents.forEach(elem => {
    if (!elem.contents[0].text) return;

    message += elem.contents[0].text + '\n';

    elem.contents[2].contents[0].contents.forEach((md, i) => {
      if (excludes.includes(i)) return;

      if (md.name === 'dt') {
        message += `${md.text.trim()}: `;
      }

      if (md.name === 'dd') {
        message += md.text.trim() + '\n';
      }
    });

    message += `Precio: ${elem.contents[3].text}\n\n`;
  });

  if (message === lastSentMessages[url]) {
    console.log("No hay nuevos datos que enviar");
    return "No hay nuevos datos que enviar";
  }

  lastSentMessages[url] = message;

  return message;
};
