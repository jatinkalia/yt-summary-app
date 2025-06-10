const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

const getVideoDetails = async (url) => {
  try {
    // Extract video ID from URL
    const videoId = url.split('v=')[1].split('&')[0];
    
    // Get video details
    const response = await youtube.videos.list({
      part: 'snippet,contentDetails',
      id: videoId
    });

    const video = response.data.items[0];
    
    return {
      videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
      duration: video.contentDetails.duration
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw new Error('Failed to fetch video details');
  }
};

module.exports = {
  getVideoDetails
};
// ads