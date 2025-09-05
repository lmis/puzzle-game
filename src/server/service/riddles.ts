import { CONGRATULATIONS_KEY, TerminalItem } from "@/domain-model";
import { SECRET_ANSWERS } from "@/server/env";

const trivialAnswers = [
  ["biene", "die biene", "bienen", "die bienen"],
  ["photosynthese", "die photosynthese", "die fotosynthese", "fotosynthese"],
];
// Putting these into the env variables, so you cannot get them from GitHub.
const secretAnswers = JSON.parse(SECRET_ANSWERS) as [string][];
const answers = [...trivialAnswers, ...secretAnswers];

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
[Fehler: 41 55 54]
...b32(394) b32(494)?
...Typenbezeichnung[0]: COBS Prepend 'ja'
...Typenbezeichnung[1]= ??ö????
...Mikroprocessor-Info: X=80, Y=28, Z=6 
`,
  `Fehlerzustand: Kassette 2 defekt. Spule automatisch zurück zur Ausgangslage...
...
Sehr gut. Die Kassette 2 ist wieder da, wo sie Anfangs war. Von diesem Punkt aus kann's weitergehen.
...
[Fehler: Benötige Eingabe 44]
...Ablaufprotokoll:
(+1,+1) -> (-2,-2) -> (+3, +2) -> (-4, -3) -> (+2, +0)
+➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡+
⬇52|YY|F6|MB|RR|AS|44⬇
+--+--+--+--+--+--+--+
⬇80|28|NI|PK| K|WO|OL⬇
+--+--+--+--+--+--+--+
⬇KB|Z6|UQ|TE|TS|RT|RT⬇
+--+--+--+--+--+--+--+
⬇RA|RO|RU|RE|WE|SU|LL⬇
+--+--+--+--+--+--+--+
⬇K2|PO|PU|PI|PL|ST|CH⬇
+➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡➡+
`,
  `Nicht nur Insekten, sondern auch Arrachnoide sind wichtig für die Natur. Sie fangen Schädlinge und halten das ökologische Gleichgewicht langjährig im Feld. Wie sagt man Umgangssprachlich zu ihnen?
N) Nagjbegr
O) Zve zvg 
P) Rgjnf, qnff
Q) Evpugvt ivryr qrvare
R) Vagreangvbanyra
S) Xhzcryf zötra.
T) Nore 
U) Avpug qra
V) Rkgenoervgra!
W) Enssfg qh'f?
`,
  `Sehr gut! Spinne ist richtig.
[Fehler: 0xF6 Dies ist kein Originalgerät. ModifiKatIon erkannt. Es verstößt gegen die Geschäftsbedingungen, Fremdteile einzubauen. B(r|l)aut?k(leid|raut)]
Teile die Typennummer des unzugelassenen Geräts mit:
`,
  `[WARNUNG: Rechenbaustein überhitzt!]
Ubssragyvpu fvaq jve hagre haf, Oynhxenhg. Vpu xbaagr qvr Cebgbxbyyr üore qvr Xähsr qre Fpurvasvezra svaqra, nore vpu tynhor, zna ung jnf orzrexg. Abpu unora fvr zvpu avpug vz Ivfvre, nore vpu mrefgöer zrvar Nofpuevsgra haq Nhsmrvpuahatra haq uvagreyrtr fvr uvre va ubssragyvpu hafpurvaonere Sbez. Snyyf vpu zvg qrz Erpuare natrunygra jreqr, ubssr vpu, zrva unezybfrf, xnchggrf Xvaqrefcvry jveq avpug jrvgre ornpugrg. Vpu gnhpur vz Fnsrubhfr nz Qäzrevgmfrr hagre ovf vue zvpu ubyra xöaag - Fpujhatenq.
AbeqGrpu, Bfyb. "Ynobegrpuavx" = Jvapurfgre-Cynggra, 30ZO. Rzcsäatre: IRO Zvxebryrxgebavx Resheg.
FjvffPbzc NT, Müevpu. "Oüebznfpuvara" = RCEBZ-Cebtenzzvrere. Rzcsäatre ZsF, Nog. 82/7, Ucg. 4.
Genaf-Vzcbeg TzoU, Unzohet. "Zrqvmvavfpur Treägr" = Vagry KLM + ENZ. Ebhgr: Jvra -> Cent. Rzcsäatre bssvmvryy Xloreargvx Vafgvghg. Erny: MSG Qerfqra
RhebQngn, Tras. "Grfgtreägr" = "Zbgbenyn ZP68000". Rzcsäatre: IRO Ebobgeba Ryrxgebavx Evrfn.
... Typennummer iAPX: ?????
`,
];

export const getNextQuestionOrCongratulations = (key: number): TerminalItem => {
  return questions[key]
    ? {
        key: `riddle-${key}`,
        content: questions[key],
      }
    : {
        key: CONGRATULATIONS_KEY,
        content:
          "Damit habt ihr das Spiel gewonnen und so viel gelernt über fleißige Bienen und die Wege - kreuz und quer durch die Welt -, die sie gehen, um an Nektar zu kommen!",
      };
};

export const getAnsweredQuestions = (maxKey: number) => {
  const items: TerminalItem[] = [];
  for (let k = 0; k < maxKey; k++) {
    items.push(
      { key: `riddle-${k}`, content: questions[k] },
      { key: `answer-${k}`, content: answers[k][0], input: true },
    );
  }
  return items;
};

export const check = (key: number, input: string): boolean =>
  answers[key].some((answer) => matches(answer, input));

const matches = (answer: string, input: string) =>
  input.toLowerCase().trim() === answer.toLowerCase().trim();
