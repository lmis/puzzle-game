import { CONGRATULATIONS_KEY, TerminalItem } from "@/domain-model";
import { RIDDLE_ANSWERS } from "@/server/env";

const limitLineWidth = (item: string) => {
  return item
    .split("\n")
    .map((line) => {
      const [first, ...rest] = line.split(" ");
      let res = first;
      let count = first.length;
      for (const word of rest) {
        if (count + word.length < 60) {
          res += " " + word;
          count += word.length + 1;
        } else {
          res += "\n" + word;
          count = word.length;
        }
      }
      return res;
    })
    .join("\n");
};

const answers = JSON.parse(RIDDLE_ANSWERS) as string[];
const questions: string[] = [
  `Entdecke die Natur - spielend Lernen!
Komm mit auf einen Spaziergang durch den Wald und lerne wie Pflanzen von Blaukraut bis Minze wachsen, warum Wasser im Kreislauf bleibt und weshalb selbst das kleinste Schwungrad der Natur wichtig ist, damit alles im Gleichgewicht bleibt.

Erstes Rätsel:
Wer summt über Wald und Wiese, bestäubt die Blüten und sorgt für fruchtige Ernte?`,
  `Genau! Die 42 4C 41 55 4Biene!
Nächste Frage:
Wie nennt man den Vorgang, bei dem Pflanzen aus Wasser, Kohlendi0x52id und Sonnenlicht ihre eigene Nahrung herstellen?`,
  `Toll! Photosynthese ist richtig.
Weiter geht's:
[Err: 41 55 54]
...Trace: b32(394) b32(494)?
...Sorted -D
...COBs: 'ja' = ???????
...CPU-Info: X=80, Y=28, Z=6 
`,
  `Fehlerzustand: Kassete 2 defekt. Spule zurück zur Ausgangslage...
...
Sehr gut. Die Kassete 2 ist wieder da wo sie war. Von diesem Punkt aus, kanns weitergehen.
...
Fehler: Benötige Eingabe 44.
...Trace: 
(+1,-1) -> (-2,+2) -> (+3, -2) -> (-4, +3) -> (+2, +0)
+--+--+--+--+--+--+--+
|QX|YY|F6|MB|RR|AS|UJ|
+--+--+--+--+--+--+--+
|BK|PP|NI|PK| K|WO|OL|
+--+--+--+--+--+--+--+
|KB|PP|UQ|TE|TS|RT|RT|
+--+--+--+--+--+--+--+
|RA|RO|RU|RE|WE|SU|LL|
+--+--+--+--+--+--+--+
|KK|PO|PU|PI|PL|ST|CH|
+--+--+--+--+--+--+--+
`,
  `Insekten sehen andere Spektren des Lichtes als wir Menschen. Was für uns rot aussieht, kann für eine Biene ganz anders aussehen. Was sehen Bienen, wenn wir rot sehen?
N) Hz jrvgre
O) Mh xbzzra
P) Nagjbegr
Q) Zvg zrvarz
R) Yvrofgra
S) Unaqryfthg`,
  `[WARNUNG: iAPX überhitzt!]
Ubssragyvpu fvaq jve hagre haf, Oynhxenhg. Vpu xbaagr qvr Cebgbxbyyr üore qvr Xähsr qre Fpurvasvezra svaqra, nore vpu tynhor, zna ung jnf orzrexg. Abpu unora fvr zvpu avpug vz Ivfvre, nore vpu mrefgöer zrvar Nofpuevsgra haq Nhsmrvpuhatra haq uvagreyrtr fvr uvre va ubssragyvpu hafpurvaonere Sbez. Snyyf vpu zvg qrz Erpuare natrunygra jreqr, ubssr vpu zrva unezybfrf, xnchggrf Xvaqrefcvry jveq avpug jrvgre ornpugrg. Vpu gnhpur vz Fnsrubhfr nz Qäznevgmfrr hagre ovf vue zvpu ubyra xöaag - Fpujhatenq.
AbeqGrpu, Bfyb. "Ynobegrpuavx" = Jvapurfgre-Cynggra, 30ZO. Rzcsäatre: IRO Zvxebryrxgebavx Resheg.
FjvffPbzc NT, Müevpu. "Oüebznfpuvara" = RCEBZ-Cebtenzzvrere. Rzcsäatre ZsF, Nog. 82/7, Ucg. 4.
Genaf-Vzcbeg TzoU, Unzohet. "Zrqvmvavfpur Treägr" = Vagry KLM + ENZ. Ebhgr: Jvra -> Cent. Rzcsäatre bsvmvryy Xloreargvx Vafgvghg. Erny: MSG Qerfqra
RhebQngn, Tras. "Grfgtreägr" = "Zbgbenyn ZP68000". Rzcsäatre: IRO Ebobgeba Ryrxgebavx Evrfn.
... Typennummer iAPX: ?????
`,
].map((item) => limitLineWidth(item));

export const getNextQuestionOrCongratulations = (key: number): TerminalItem => {
  return questions[key]
    ? {
        key: `riddle-${key}`,
        content: questions[key],
      }
    : {
        key: CONGRATULATIONS_KEY,
        content: limitLineWidth(
          "Damit hast du das Spiel gewonnen! So viel gelernt über fleißige Bienen und die Wege kreuz und queer durch die Welt, die sie gehen, um an Nektar zu kommen!",
        ),
      };
};

export const getAnsweredQuestions = (maxKey: number) => {
  const items: TerminalItem[] = [];
  for (let k = 0; k < maxKey; k++) {
    items.push(
      { key: `riddle-${k}`, content: questions[k] },
      { key: `answer-${k}`, content: answers[k], input: true },
    );
  }
  return items;
};

export const check = (key: number, answer: string): boolean => {
  return answers[key].toLowerCase().trim() === answer.toLowerCase().trim();
};
