// import React, { Component } from 'react';
// import { Document, Page } from 'react-pdf';
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const convertPdfToText = async (file) => {
  const loadingTask = pdfjs.getDocument(file);
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
  return extractedText;
};
