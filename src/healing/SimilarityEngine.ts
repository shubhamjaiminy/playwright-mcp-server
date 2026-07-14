export class SimilarityEngine {

    static similarity(a: string, b: string): number {

        a = a.toLowerCase().trim();
        b = b.toLowerCase().trim();

        if (a === b) return 100;

        if (a.includes(b) || b.includes(a))
            return 90;

        const wordsA = a.split(" ");
        const wordsB = b.split(" ");

        let common = 0;

        for (const w of wordsA) {
            if (wordsB.includes(w))
                common++;
        }

        return Math.round(
            common /
            Math.max(wordsA.length, wordsB.length)
            * 100
        );
    }

}