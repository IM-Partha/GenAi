import { Buffer } from "buffer";
import "./FileUpload.css";
import Loader from "./Loader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

function FileUpload({ setFile }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  // Google Gemini API setup
  const genAI = new GoogleGenerativeAI("AIzaSyCxaYf5Bq5U_RhDlumHdZKmVGlvTbHYkjo");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Handle file upload
  async function handleFileUpload(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileBuffer = await selectedFile.arrayBuffer();
    const fileData = {
      type: selectedFile.type,
      file: Buffer.from(fileBuffer).toString("base64"),
      imageUrl: selectedFile.type.includes("pdf")
        ? "/document-icon.png"
        : URL.createObjectURL(selectedFile),
    };

    console.log("File uploaded:", fileData);
    setFile(fileData);
    setUploadedFile(fileData);
    setStatus("idle");
  }

  // Fetch summary when file is uploaded
  async function getSummary() {
    if (!uploadedFile) return;
    setStatus("loading");

    try {
      const result = await model.generateContent([
        {
          inlineData: {
            data: uploadedFile.file,
            mimeType: uploadedFile.type,
          },
        },
        `
          Summarize the document in one short paragraph (less than 100 words).
          Use only plain text, no markdowns or HTML tags.
        `,
      ]);

      setSummary(result.response.text());
      setStatus("success");
    } catch (error) {
      console.error("Error generating summary:", error);
      setStatus("error");
    }
  }

  // Automatically trigger summary after file upload
  useEffect(() => {
    if (uploadedFile && status === "idle") {
      getSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFile, status]);

  return (
    <section className="file-upload">
      <h2 className="title">📄 Upload a PDF</h2>
      <input className="upload-btn"
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
      />

      {/* Summary section */}
      {uploadedFile && (
        <div className="summary-section">
          <img
            src={uploadedFile.imageUrl}
            alt="Preview"
            className="preview-image"
          />
          <h3>Summary</h3>

          {status === "loading" && <Loader />}
          {status === "success" && (
            <p className="summary-text">{summary.length>0 ? "PDF Upload SuccessFully" :"PDF Upload Failed"}</p>
          )}
          {status === "error" && (
            <p className="error-text">⚠️ Error generating summary. Try again.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default FileUpload;
