import questions_raw from "../assets/questions.txt?raw";
import survey_questions_raw from "../assets/survey-questions.txt?raw";

function processQuestions(rawQuestions) {
  return rawQuestions
    .split("\n")
    .filter((e) => e) // filter out any blank questions (blank lines in questions.txt)
    .map((question_text) => {
      return { question_text, hash: hash(question_text) };
    })
    .sort((a, b) => a.question_text.localeCompare(b.question_text));
}

const conversation = processQuestions(questions_raw);
const survey = processQuestions(survey_questions_raw);

export const questionSets = {
  conversation, // default question set
  survey,
};

export const questionSetPathMap = {
  "/": "conversation", //defalut
  "/survey": "survey",
};

export function hash(s) {
  const hash = Array.from(s).reduce((hash, char) => {
    const result = (hash << 5) - hash + char.charCodeAt(0);
    return result & result;
  }, 0);
  return Math.abs(hash).toString(24);
}
