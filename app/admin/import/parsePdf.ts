'use server';
import fs from 'fs';
function transformTextToObject(text: string) {
  // Ersetzen von NEW-LINE mit einem Zeilenumbruch
  let lines = text
    .split(/NEW-LINE[A-D] /)
    .map((line) => line.trim())
    .filter((line) => line !== '');

  lines = lines.map((line) => line.replace(/NEW-LINE/g, ' '));

  const lbaNumber = lines[0].match(/^(\d+)/);

  return {
    lbaIndex: lbaNumber ? lbaNumber[0] : null,
    question: lines[0]
      .replace(/^(\d+)/, '')
      .trim()
      .replace('\r', ' '),
    answers: lines.slice(1).map((answer) => answer.replace(/\r/g, '')),
  };
}

export const parsePDF = () => {
  const pdf = fs.readFileSync('./pdfText.txt', 'utf8');
  let currentQuestionNumber = 0;
  const letQuestionsText: string[][] = [];

  pdf.split('\n').forEach((questionText: string) => {
    const questionStartsWithNumber = questionText.match(/^(\d+).*/);

    if (
      questionStartsWithNumber &&
      !(parseInt(questionStartsWithNumber[1]) > 300)
    ) {
      currentQuestionNumber++;
      letQuestionsText[currentQuestionNumber] = [];
    }

    letQuestionsText[currentQuestionNumber] = [
      ...letQuestionsText[currentQuestionNumber],
      questionText,
    ];
  });

  const questions = letQuestionsText.map((questionText: string[]) => {
    const questionLines = questionText.filter((line: string) => {
      return line.trim() !== '' && line !== null;
    });

    const allQuestionsText = questionLines.join('NEW-LINE');

    return transformTextToObject(allQuestionsText);
  });

  return questions;
};
