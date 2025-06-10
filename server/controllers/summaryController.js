const Summary = require('../models/Summary');
const User = require('../models/User');
const { getVideoDetails } = require('../utils/youtube');
const { OpenAI } = require('openai');
const YouTube = require('youtube-transcript');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

// @desc    Create a new summary
// @route   POST /api/summaries
// @access  Private
const createSummary = async (req, res) => {
  const { videoUrl } = req.body;

  try {
    // Check if user has reached daily limit
    const user = await User.findById(req.user._id);
    const now = new Date();
    const lastSummary = user.lastSummaryDate;

    if (!user.isPremium && lastSummary && (now - lastSummary) < 24 * 60 * 60 * 1000 && user.summaryCount >= 3) {
      return res.status(400).json({ 
        message: 'Daily limit reached. Upgrade to premium for unlimited summaries.' 
      });
    }

    // Get video details and transcript
    const { videoId, title, thumbnail, duration } = await getVideoDetails(videoUrl);
    const transcriptArray = await YouTube.YouTubeTranscriptApi.getTranscript(videoId);
    const transcript = transcriptArray.map(item => item.text).join(' ');

    // Generate summary using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes YouTube videos concisely." },
        { role: "user", content: `Summarize this video transcript in 3-5 bullet points:\n\n${transcript}` }
      ],
      max_tokens: 200
    });

    const summaryText = response.choices[0].message.content;

    // Create summary
    const summary = await Summary.create({
      user: req.user._id,
      videoId,
      title,
      thumbnail,
      duration,
      summary: summaryText
    });

    // Update user's summary count
    user.summaryCount += 1;
    user.lastSummaryDate = now;
    await user.save();

    res.status(201).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating summary' });
  }
};

// @desc    Get user's summaries
// @route   GET /api/summaries
// @access  Private
const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({ user: req.user._id }).sort('-createdAt');
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSummary,
  getSummaries
};