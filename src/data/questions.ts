import { Question } from "../types";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "How satisfied are you with our products?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: "q2",
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: "q3",
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: "q4",
    text: "On a scale of 1–10, how likely are you to recommend us to friends and family?",
    type: "rating",
    min: 1,
    max: 10,
  },
  {
    id: "q5",
    text: "What could we do to improve our service?",
    type: "text",
  },
];
