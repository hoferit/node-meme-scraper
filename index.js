import * as fs from 'node:fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const dir = './memes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
// get html text from the website
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
// using await to ensure that the promise resolves
const body = await response.text();

// parse the html text and extract memes
const $ = cheerio.load(body);
const memeList = [];
// loop and filter through the html using CSS selector

$('div').each((i, element) => {
  const memeItem = $(element).find('img').attr('src');
  memeList.push(memeItem);
});
// selecting the first 10 pictures of the list and loop through to slice away the width property
const memes = memeList.slice(3, 13);
// for loop that iterates from 0 to 9, it creates strings for filename and downloads links from array using the same counter and saves them
for (let i = 0; i <= 9; i++) {
  let fileName = `0${i + 1}.jpg`;
  if (fileName === '010.jpg') {
    fileName = '10.jpg';
  }
  await fetch(memes[i]).then((res) => {
    res.body.pipe(fs.createWriteStream(`./memes/${fileName}`));
  });
}
