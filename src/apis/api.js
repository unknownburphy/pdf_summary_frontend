import axios from "axios";

export const gptApi = (question) => {
  const url = "https://api.openai.com/v1/completions";

  const headers = {
    Authorization: "Bearer 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",
    "Content-Type": "application/json",
  };

  const data = {
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 500,
  };

  const response = axios.post(url, data, { headers });

  return response;
};
