"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_sync_1 = __importDefault(require("readline-sync"));
// @ts-ignore
const ffmetadata_1 = __importDefault(require("ffmetadata"));
const folder = readline_sync_1.default
    .questionPath('What is the path ?: ', {
    isDirectory: true
})
    .trim();
const sheikhName = readline_sync_1.default.question('What is the sheikh name ?: ').trim();
const names = JSON.parse(fs_1.default.readFileSync('./sur-names.json').toString());
fs_1.default.readdir(folder, (err, files) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        const oldName = `${element}`;
        const newName = `${sheikhName} ${names[index]}.mp3`;
        const data = {
            artist: sheikhName,
            track: `${index + 1}/114`,
            album: `Sheikh ${sheikhName}`.trim(),
            title: newName,
            date: new Date().toISOString()
        };
        const options = {
            attachments: ['quran.jpg']
        };
        yield writeMetadata(`${folder}/${oldName}`, data, options);
        fs_1.default.renameSync(`${folder}/${oldName}`, `${folder}/${newName}`);
        console.log(`Done: ${newName} ✔`);
    }
}));
function writeMetadata(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            ffmetadata_1.default.write(path, data, options, (err) => {
                if (err) {
                    console.log('[DEBUG] error:', err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
