import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import * as fs from "fs";

//test용 키
const apiKey = "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";

const run = async () => {
  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  const text = fs.readFileSync("text.txt", { encoding: "utf-8", flag: "r" });
  const model = new OpenAI({
    openAIApiKey: apiKey,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await textSplitter.createDocuments([text]);

  const mapPrompt1 =
    "Write a consice summary of the followings: {text}\n CONCISE SUMMARY :";
  const promptTest1 = new PromptTemplate({
    inputVariables: ["text"],
    template: mapPrompt1,
  });

  const mapPrompt2 =
    " the following texts by combining them into a Notion page format. : {text}\n RSEULT :";
  const promptTest2 = new PromptTemplate({
    inputVariables: ["text"],
    template: mapPrompt2,
  });

  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model, {
    type: "map_reduce",
    // returnIntermediateSteps: true,
    combineMapPrompt: promptTest1,
    combinePrompt: promptTest2,
    verbose: true,
  });
  const res = await chain.call({
    input_documents: docs,
  });
  console.log(res);
};

run();
