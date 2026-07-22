import pdf from "pdf-parse";

export async function extractResumeText(file) {
  try {
    if (!file) {
      throw new Error("No resume uploaded.");
    }

    // PDF
    if (file.mimetype === "application/pdf") {
      const data = await pdf(file.buffer);
      return data.text;
    }

    // DOC/DOCX (temporary fallback)
    return file.buffer.toString("utf8");
  } catch (error) {
    console.error("Resume Parser Error:", error);
    throw new Error("Unable to parse resume.");
  }
}