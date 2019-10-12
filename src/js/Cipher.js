export default class Cipher {
    static encrypt(secret, text) {
        secret = secret.split(" ")[0].toUpperCase();
        text = text.split(" ").join("_").toUpperCase();
        const n = secret.length;
        const m = Math.ceil(text.length / n);
        const secretOrder = [];
        const unordered = [];

        secret.split("").forEach((letter, index) => {
            secretOrder.push([index, letter.charCodeAt(0)]);
            unordered.push(Array(m).fill(0));
        });

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                unordered[i][j] = text[(j * n) + i] !== undefined ? text[(j * n) + i] : "X";
            }
        }

        secretOrder.sort((a, b) => a[1] - b[1]);
        let result = "";

        for (let i = 0; i < n; i++) {
            let id = secretOrder[i][0];
            for (let j = 0; j < m; j++) {
                result += unordered[id][j];
                id = id === 0 ? id - 1 + n : id - 1;
            }
        }

        return result;
    }

    static decrypt(secret, text) {
        secret = secret.split(" ")[0].toUpperCase();
        text = text.split(" ").join("_").toUpperCase().split("");
        const n = secret.length;
        const m = Math.ceil(text.length / n);
        const secretOrder = [];
        const unordered = [];

        secret.split("").forEach((letter, index) => {
            secretOrder.push([index, letter.charCodeAt(0)]);
            unordered.push(Array(m).fill(0));
        });

        secretOrder.sort((a, b) => a[1] - b[1]);

        for (let i = 0; i < n; i++) {
            let id = secretOrder[i][0];
            for (let j = 0; j < m; j++) {
                unordered[id][j] = text.shift();
                id = id === 0 ? id - 1 + n : id - 1;
            }
        }

        let result = "";
        try {
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    result += unordered[j][i];
                }
            }
        }
        catch (error) {
            console.error('error: ', error);
        }

        return result;
    }
}