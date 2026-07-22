import { askGemini } from "../services/geminiService.js";

// Career Chat
export const careerChat = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are Waypoint AI, a professional career mentor.

Answer the following question in a practical and concise way.

Question:
${message}
`;

    const reply = await askGemini(prompt);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      reply: "Unable to generate response.",
    });
  }
};

// Resume Analyzer
export const resumeAnalyzer = async (req, res) => {
  try {
    const { resume } = req.body;

    const prompt = `
You are an ATS Resume Expert.

Analyze this resume.

Resume:
${resume}

Return:
1. ATS Score (/100)
2. Strengths
3. Weaknesses
4. Missing Skills
5. Suggestions
`;

    const feedback = await askGemini(prompt);

    res.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      feedback: "Resume analysis failed.",
    });
  }
};

// Career Roadmap
export const careerRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;

    const roadmap = await askGemini(`
Create a detailed learning roadmap to become a ${goal}.

Include:
- Beginner
- Intermediate
- Advanced
- Projects
- Certifications
- Timeline
`);

    res.json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      roadmap: "Unable to generate roadmap.",
    });
  }
};

// Skill Gap
export const skillGap = async (req, res) => {
  try {
    const { jobTitle, skills } = req.body;

    const analysis = await askGemini(`
Target Job:
${jobTitle}

Current Skills:
${skills}

Identify:
- Missing Skills
- Learning Resources
- Project Ideas
- Estimated Learning Time
`);

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      analysis: "Skill Gap Analysis failed.",
    });
  }
};

// Interview Prep
export const interviewPrep = async (req, res) => {
  try {
    const { role } = req.body;

    const questions = await askGemini(`
Generate 10 interview questions with answers for a ${role}.

Include:
- HR
- Technical
- Scenario Based
`);

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      questions: "Interview generation failed.",
    });
  }
};