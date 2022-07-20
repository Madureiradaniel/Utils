const crypto = require('crypto');
const atob = require('atob');

exports.Aes = class {
    static hexToBase64(str) {
        return Buffer.from(str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "), 'hex').toString('base64')
    }

    static base64ToHex(str) {
        for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
            let tmp = bin.charCodeAt(i).toString(16);
            if (tmp.length === 1) tmp = "0" + tmp;
            hex[hex.length] = tmp;
        }
        return hex.join(" ");
    }

    static #decrypt(text) {
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(text.key), text.iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }


    static #encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(text.key), text.iv);
        let encrypted = cipher.update(text.text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return this.hexToBase64(encrypted.toString('hex'));
    }


    static getEncrypted(json, KEY) {
        try {
            var iv = Buffer.from(new ArrayBuffer(16));
            let text = { text: JSON.stringify(json), key: KEY, iv: iv }
            return this.#encrypt(text)
        } catch (e) {
            console.log(e)
            return { error: true }
        }
    }

    static getDecrypted(encrypted, KEY) {
        try {
            var iv = Buffer.from(new ArrayBuffer(16));
            let text = { key: KEY, iv: iv }

            let dataHex = this.base64ToHex(encrypted);
            dataHex = dataHex.split(' ');
            dataHex = dataHex.join('');
            text.encryptedData = dataHex;
            let decrypted = this.#decrypt(text);
            return JSON.parse(decrypted);
        } catch (e) {
            console.log(e)
            return { error: true }
        }
    }
}