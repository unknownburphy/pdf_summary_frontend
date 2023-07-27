import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const langchainSummary = async (selectedFile) => {
  const loadingTask = pdfjs.getDocument(selectedFile);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  let extractedText = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    extractedText += pageText;
  }

  console.log(extractedText);

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    maxTokens: -1,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
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
    verbose: true,
  });
  const res = await chain.call({
    input_documents: docs,
  });

  console.log(res);
  return res;
};

export default langchainSummary;
