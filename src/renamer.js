const fs = require("fs");
const path = require("path");
const readLine = require("readline-sync");
// @ts-ignore
const ffmetadata = require("ffmetadata");

function main() {
  const folder = readLine
    .questionPath("What is the path ?: ", {
      isDirectory: true,
    })
    .trim();
  const sheikhName = readLine.question("What is the sheikh name ?: ").trim();

  fs.readdir(folder, async (err, files) => {
    for (let [index, oldFile] of Object.entries(files)) {
      const newName = `${sheikhName} ${names[index]}.mp3`;
      const data = {
        artist: `Sheikh ${sheikhName}`,
        track: `${index + 1}/114`,
        album: `Sheikh ${sheikhName}`,
        title: newName,
        date: new Date().toISOString(),
      };
      const options = {
        attachments: ["quran.jpg"],
      };

      await writeMetadata(path.join(folder, oldFile), data, options);

      fs.renameSync(path.join(folder, oldFile), path.join(folder, newName));

      console.log(`Done: ${newName} ✔`);
    }
  });
}

async function writeMetadata(path, data, options) {
  return new Promise((resolve, reject) => {
    ffmetadata.write(path, data, options, (err) => {
      if (err) {
        console.log("[DEBUG] error:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const names = [
  "001 Al-Fatihah الفاتحة (the Opening)",
  "002 Al-Baqarah البقرة (the Cow)",
  "003 Aali Imran آل عمران (the Family of Imran)",
  "004 An-Nisaa النساء (the Women)",
  "005 Al-Maaidah المائدة (the Table)",
  "006 Al-Anaam الأنعام (the Cattle)",
  "007 Al-Aaraf الأعراف (the Heights)",
  "008 Al-Anfal الأنفال (the Spoils of War)",
  "009 At-Taubah التوبة (براءة) (the Repentance)",
  "010 Yunus يونس (Yunus)",
  "011 Hud هود (Hud)",
  "012 Yusuf يوسف (Yusuf)",
  "013 Ar-Raad الرعد (the Thunder)",
  "014 Ibrahim إبراهيم (Ibrahim)",
  "015 Al-Hijr الحجر (the Rocky Tract)",
  "016 An-Nahl النحل (the Bees)",
  "017 Al-Israa الإسراء (بني إسرائيل) (the Night Journey)",
  "018 Al-Kahf الكهف (the Cave)",
  "019 Maryam مريم (Maryam)",
  "020 Ta-Ha طه (Ta-Ha)",
  "021 Al-Anbiyaa الأنبياء (the Prophets)",
  "022 Al-Haj الحج (the Pilgrimage)",
  "023 Al-Muaminun المؤمنون (the Believers)",
  "024 An-Nur النور (the Light)",
  "025 Al-Furqan الفرقان (the Criterion)",
  "026 Ash-Shuaaraa الشعراء (the Poets)",
  "027 An-Naml النمل (the Ants)",
  "028 Al-Qasas القصص (the Stories)",
  "029 Al-Ankabut العنكبوت (the Spider)",
  "030 Ar-Rum الروم (the Romans)",
  "031 Luqman لقمان (Luqman)",
  "032 As-Sajdah السجدة (the Prostration)",
  "033 Al-Ahzab الأحزاب (the Combined Forces)",
  "034 Sabaa سبأ (the Sabeans)",
  "035 Al-Fatir فاطر (the Originator)",
  "036 Ya-Sin يس (Ya-Sin)",
  "037 As-Saffah الصافات (Those Ranges in Ranks)",
  "038 Sad ص (Sad)",
  "039 Az-Zumar الزمر (the Groups)",
  "040 Ghafar غافر (المؤمن) (the Forgiver)",
  "041 Fusilat فصلت (Distinguished)",
  "042 Ash-Shura الشورى (the Consultation)",
  "043 Az-Zukhruf الزخرف (the Gold)",
  "044 Ad-Dukhan الدخان (the Smoke)",
  "045 Al-Jathiyah الجاثية (the Kneeling)",
  "046 Al-Ahqaf الأحقاف (the Valley)",
  "047 Muhammad محمد (Muhammad)",
  "048 Al-Fatah الفتح (the Victory)",
  "049 Al-Hujurat الحجرات (the Dwellings)",
  "050 Qaf ق (Qaf)",
  "051 Adz-Dzariyah الذاريات (the Scatterers)",
  "052 At-Tur الطور (the Mount)",
  "053 An-Najm النجم (the Star)",
  "054 Al-Qamar القمر (the Moon)",
  "055 Ar-Rahman الرحمن (the Most Gracious)",
  "056 Al-Waqiaah الواقعة (the Event)",
  "057 Al-Hadid الحديد (the Iron)",
  "058 Al-Mujadilah المجادلة (the Reasoning)",
  "059 Al-Hashr الحشر (the Gathering)",
  "060 Al-Mumtahanah الممتحنة (the Tested)",
  "061 As-Saf الصف (the Row)",
  "062 Al-Jumaah الجمعة (Friday)",
  "063 Al-Munafiqun المنافقون (the Hypocrites)",
  "064 At-Taghabun التغابن (the Loss & Gain)",
  "065 At-Talaq الطلاق (the Divorce)",
  "066 At-Tahrim التحريم (the Prohibition)",
  "067 Al-Mulk الملك (تبارك) (the Kingdom)",
  "068 Al-Qalam القلم (the Pen)",
  "069 Al-Haqqah الحاقة (the Inevitable)",
  "070 Al-Maaarij المعارج (the Elevated Passages)",
  "071 Nuh نوح (Nuh)",
  "072 Al-Jinn الجن (the Jinn)",
  "073 Al-Muzammil المزمل (the Wrapped)",
  "074 Al-Mudaththir المدثر (the Cloaked)",
  "075 Al-Qiyamah القيامة (the Resurrection)",
  "076 Al-Insan الإنسان (the Human)",
  "077 Al-Mursalat المرسلات (Those Sent Forth)",
  "078 An-Nabaa النبأ (the Great News)",
  "079 An-Naziaat النازعات (Those Who Pull Out)",
  "080 Abasa عبس (He Frowned)",
  "081 At-Takwir التكوير (the Overthrowing)",
  "082 Al-Infitar الانفطار (the Cleaving)",
  "083 Al-Mutaffifin المطففين (Those Who Deal in Fraud)",
  "084 Al-Inshiqaq الانشقاق (the Splitting Asunder)",
  "085 Al-Buruj البروج (the Stars)",
  "086 At-Tariq الطارق (the Nightcomer)",
  "087 Al-Aala الأعلى (the Most High)",
  "088 Al-Ghashiyah الغاشية (the Overwhelming)",
  "089 Al-Fajr الفجر (the Dawn)",
  "090 Al-Balad البلد (the City)",
  "091 Ash-Shams الشمس (the Sun)",
  "092 Al-Layl الليل (the Night)",
  "093 Adh-Dhuha الضحى (the Forenoon)",
  "094 Al-Inshirah الشرح (the Opening Forth)",
  "095 At-Tin التين (the Fig)",
  "096 Al-Alaq العلق (the Clot)",
  "097 Al-Qadar القدر (the Night of Decree)",
  "098 Al-Bayinah البينة (the Proof)",
  "099 Az-Zalzalah الزلزلة (the Earthquake)",
  "100 Al-Adiyah العاديات (the Runners)",
  "101 Al-Qariaah القارعة (the Striking Hour)",
  "102 At-Takathur التكاثر (the Piling Up)",
  "103 Al-Asr العصر (the Time)",
  "104 Al-Humazah الهمزة (the Slanderer)",
  "105 Al-Fil الفيل (the Elephant)",
  "106 Quraish قريش (Quraish)",
  "107 Al-Maaun الماعون (the Assistance)",
  "108 Al-Kauthar الكوثر (the River of Abundance)",
  "109 Al-Kafirun الكافرون (the Disbelievers)",
  "110 An-Nasr النصر (the Help)",
  "111 Al-Masad المسد (the Palm Fiber)",
  "112 Al-Ikhlas الإخلاص (the Sincerity)",
  "113 Al-Falaq الفلق (the Daybreak)",
  "114 An-Nas الناس (Mankind)",
];

main();
