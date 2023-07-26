import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//test용 키
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const langchainSummary = async (selectedFile) => {
  // const loader = new PDFLoader(selectedFile, { splitPages: false });

  // const loader = new PDFLoader(selectedFile, {
  // you may need to add `.then(m => m.default)` to the end of the import
  //   pdfjs: () => import("pdfjs-dist/legacy/build/pdf.js"),
  // });
  // const pdfText = await loader.load();
  // console.log(pdfText);
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

  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    maxTokens: -1,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await textSplitter.createDocuments([extractedText]);

  const mapPrompt1 =
    "Write a concise summary of the following:\n\n\n\n {text} \n\n\nCONCISE SUMMARY :";
  const mapPrompt = new PromptTemplate({
    inputVariables: ["text"],
    template: mapPrompt1,
  });

  const mapPrompt2 =
    "Write a summary of the following as long as possible and make them as a markdown:\n\n\n\n {text} \n\n\nmarkdown SUMMARY :";
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

export default langchainSummary;
