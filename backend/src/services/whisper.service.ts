// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios').default || require('axios');
import * as fs from 'fs';

export class WhisperService {
  private static apiKey = process.env.OPENAI_API_KEY || '';

  /**
   * Transcribe a locally saved audio file using OpenAI Whisper API.
   */
  public static async transcribeAudio(filePath: string): Promise<string> {
    if (this.apiKey) {
      try {
        // Prepare multipart form data
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        formData.append('model', 'whisper-1');
        formData.append('language', 'fr');

        const response = await axios.post(
          'https://api.openai.com/v1/audio/transcriptions',
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              ...formData.getHeaders()
            }
          }
        );

        return response.data.text || '';
      } catch (error) {
        console.error('Error in Whisper Speech-to-Text API', error);
      }
    }

    return '';
  }
}
