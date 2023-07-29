import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const langchainSummary = async (selectedFile) => {
  // parse pdf file
  try {
    pdfjs.getDocument(selectedFile);
  } catch (error) {
    console.log(error);
    alert("파일을 불러오는데 실패했습니다.");
    return { text: "error", intermediateSteps: [] };
  }

  const loadingTask = pdfjs.getDocument(selectedFile);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  // over 50 pages is not allowed
  if (numPages > 50) {
    throw new Error("앗! 50p 이상의 pdf는 요약할 수 없습니다...");
  }
  let extractedText = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    extractedText += pageText;
  }
  console.log(extractedText.length);
  // set chunk size depending on the length of text
  let chunkSize;
  if (extractedText.length < 10000) {
    chunkSize = 1000;
  } else if (extractedText.length < 20000) {
    chunkSize = 2000;
  } else if (extractedText.length < 40000) {
    chunkSize = 3000;
  } else if (extractedText.length < 80000) {
    chunkSize = 4000;
  } else {
    chunkSize = 8000;
  }

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-16k",
    openAIApiKey: apiKey,
    maxTokens: -1,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSize,
    chunkOverlap: 200,
  });
  const docs = await textSplitter.createDocuments([extractedText]);

  // PROMPT that will be used to summarize each document.
  const mapPromptText =
    "Write a concise summary of the following:\n\n\n\n {text} \n\n\nCONCISE SUMMARY IN KOREAN :";
  const mapPrompt = new PromptTemplate({
    inputVariables: ["text"],
    template: mapPromptText,
  });

  //PROMPT that will be used to summarize the combined documents.
  const combinePromptText =
    "Write a concise summary of the following:\n\n\n\n {text} \n\n\nCONCISE SUMMARY IN KOREAN :";
  const combinePrompt = new PromptTemplate({
    inputVariables: ["text"],
    template: combinePromptText,
  });

  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model, {
    type: "map_reduce",
    returnIntermediateSteps: true,
    combineMapPrompt: mapPrompt,
    combinePrompt: combinePrompt,
    // verbose: true,
  });
  const res = await chain.call({
    input_documents: docs,
  });

  console.log(res);
  return res;
};

export default langchainSummary;
