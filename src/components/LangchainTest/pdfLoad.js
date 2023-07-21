import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const pdfLoader = async (selectedFile) => {
  const loader = new PDFLoader("pdf1.pdf", { splitPages: false });

  const docs = await loader.load();
  console.log(docs);
  return docs;
};
pdfLoader();
export default pdfLoader;
