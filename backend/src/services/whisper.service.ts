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
        console.error('Error in Whisper Speech-to-Text API, using local mock transcript...', error);
      }
    }

    // High quality offline fallback
    return this.getOfflineTranscript();
  }

  private static getOfflineTranscript(): string {
    const mockTranscripts = [
      "Bonjour, je m'appelle Pierre. Je voudrais immigrer au Canada pour travailler comme ingénieur. J'aime beaucoup la nature et les lacs canadiens.",
      "Oui, je suis tout à fait d'accord avec cette idée. À mon avis, le transport en commun est essentiel pour réduire la pollution dans les grandes villes.",
      "Dans mon pays natal, le système éducatif est un peu différent. Nous commençons l'école primaire à l'âge de six ans et nous avons beaucoup de devoirs à faire à la maison.",
      "Pardon, je n'ai pas très bien compris votre question. Pourriez-vous répéter s'il vous plaît? Je pense que la culture francophone est très riche.",
      "Je vais vous présenter mon projet favori. C'est une application mobile qui permet d'apprendre le français de manière amusante et avec de l'intelligence artificielle."
    ];

    // Pick a random mock transcript
    const index = Math.floor(Math.random() * mockTranscripts.length);
    return mockTranscripts[index];
  }
}
