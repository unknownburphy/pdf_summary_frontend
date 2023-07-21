import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import * as fs from "fs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

//test용 키
const apiKey = "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";

const langchainSummary = async (selectedFile) => {
  const loader = new PDFLoader("pdf1.pdf", { splitPages: false });

  const pdfText = await loader.load();
  console.log(pdfText);

  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  // const text = fs.readFileSync("text1.txt", { encoding: "utf-8", flag: "r" });
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    maxTokens: -1,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  // when use pdf file
  const docs = await textSplitter.splitDocuments(pdfText);
  // const docs = await textSplitter.createDocuments([text]);

  const mapPrompt1 =
    "Write a concise summary of the following:\n\n\n\n {text} \n\n\nCONCISE SUMMARY IN KOREAN:";
  const mapPrompt = new PromptTemplate({
    inputVariables: ["text"],
    template: mapPrompt1,
  });

  const mapPrompt2 =
    "Write a concise summary of the following:\n\n\n\n {text} \n\n\nCONCISE SUMMARY IN KOREAN:";
  const combinePrompt = new PromptTemplate({
    inputVariables: ["text"],
    template: mapPrompt2,
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

  //json으로 res 변환 후 txt파일에 기록
  // const jsonString = JSON.stringify(res);

  // const fileName = "output.txt"; // Replace with your desired file name
  // fs.writeFile(fileName, jsonString, { encoding: "utf8" }, (err) => {
  //   if (err) {
  //     console.error("Error writing to the file:", err);
  //   } else {
  //     console.log(`Object successfully written to ${fileName}`);
  //   }
  // });
};

export default langchainSummary();
