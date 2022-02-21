import fs from 'fs';
import readLine from 'readline-sync';
// @ts-ignore
import ffmetadata from 'ffmetadata';

const folder = readLine
  .questionPath('What is the path ?: ', {
    isDirectory: true
  })
  .trim();
const sheikhName = readLine.question('What is the sheikh name ?: ').trim();

const names = JSON.parse(fs.readFileSync('./sur-names.json').toString());

fs.readdir(folder, async (err, files) => {
  for (let index = 0; index < files.length; index++) {
    const element = files[index];

    const oldName = `${element}`;
    const newName = `${sheikhName} ${names[index]}.mp3`;
    const data = {
      artist: `Sheikh ${sheikhName}`.trim(),
      track: `${index + 1}/114`,
      album: `Sheikh ${sheikhName}`.trim(),
      title: newName,
      date: new Date().toISOString()
    };
    const options = {
      attachments: ['quran.jpg']
    };

    await writeMetadata(`${folder}/${oldName}`, data, options);

    fs.renameSync(`${folder}/${oldName}`, `${folder}/${newName}`);

    console.log(`Done: ${newName} ✔`);
  }
});

async function writeMetadata(path: String, data: {}, options: {}): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmetadata.write(path, data, options, (err: Error) => {
      if (err) {
        console.log('[DEBUG] error:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
