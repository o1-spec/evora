import { Response } from 'express';
import { prisma } from '../services/db.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { WhisperService } from '../services/whisper.service';
import { OpenAIService } from '../services/openai.service';
import { ElevenLabsService } from '../services/elevenlabs.service';
import * as path from 'path';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios').default || require('axios');

export class AiController {

  /**
   * Process uploaded student speech file, transcribe it via Whisper, and evaluate grammar/fluency via GPT
   */
  public static async evaluateSpeech(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Fichier audio requis pour l\'évaluation.' });
      }
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      const userId = req.user.id;
      const audioFilePath = req.file.path;
      const { taskInstruction } = req.body;

      const instruction = taskInstruction || "Exercice général de prononciation française.";

      // 1. Transcribe audio using Whisper
      const transcript = await WhisperService.transcribeAudio(audioFilePath);

      // Clean up local temp file synchronously
      try {
        fs.unlinkSync(audioFilePath);
      } catch (err) {
        console.error('Failed to delete temp audio file:', err);
      }

      if (!transcript) {
        return res.status(422).json({ error: 'Le système n\'a pas pu transcrire votre voix. Essayez de parler plus distinctement.' });
      }

      // 2. Evaluate transcription using GPT
      const evaluation = await OpenAIService.evaluateSpeaking(transcript, instruction);

      // 3. Log AI usage and tokens
      await prisma.aIUsageLog.create({
        data: {
          userId,
          service: 'whisper_and_gpt_speaking',
          inputToken: 200,
          outputToken: 350
        }
      });

      return res.status(200).json({
        transcript,
        evaluation
      });
    } catch (error) {
      console.error('Evaluate speech error:', error);
      return res.status(500).json({ error: 'Failed to process AI speech assessment.' });
    }
  }

  /**
   * Synthesize French sentences to high-quality MP3 audio files for exercises or listening sections
   */
  public static async synthesizeText(req: AuthenticatedRequest, res: Response) {
    try {
      const { text, filename } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Le texte à synthétiser est obligatoire.' });
      }

      const fileId = filename || `voice_${Math.random().toString(36).substring(4)}`;
      const outputDir = path.join(__dirname, '../../public/audio');

      // Synthesize
      const audioPath = await ElevenLabsService.textToSpeech(text, outputDir, fileId);

      // Log usage
      if (req.user) {
        await prisma.aIUsageLog.create({
          data: {
            userId: req.user.id,
            service: 'elevenlabs_tts',
            inputToken: text.length
          }
        });
      }

      // Return public URL route
      return res.status(200).json({
        audioUrl: `/static/audio/${path.basename(audioPath)}`
      });
    } catch (error) {
      console.error('Synthesize text error:', error);
      return res.status(500).json({ error: 'Failed to synthesize French audio.' });
    }
  }

  /**
   * Conversation panel with interactive French AI Tutor
   */
  public static async tutorChat(req: AuthenticatedRequest, res: Response) {
    try {
      const { message, chatHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Le message de l\'élève est obligatoire.' });
      }

      const apiKey = process.env.OPENAI_API_KEY || '';
      const useOllama = process.env.USE_OLLAMA === 'true';
      let reply = "";

      if (useOllama || apiKey) {
        try {
          const apiUrl = useOllama 
            ? `${process.env.OLLAMA_API_URL || 'http://localhost:11434/v1'}/chat/completions`
            : 'https://api.openai.com/v1/chat/completions';
          const modelName = useOllama
            ? (process.env.OLLAMA_MODEL || 'llama3')
            : 'gpt-4o';
          const authHeader = useOllama ? 'Bearer ollama' : `Bearer ${apiKey}`;

          const messages = [
            {
              role: 'system',
              content: "You are 'Évora AI', a friendly, encouraging, and highly professional French language tutor. Help the student improve their French grammar, spelling, vocabulary, and TCF Canada preparation. Respond mainly in French (A1-B2 adjusted depending on student queries) but clarify complex rules in English when helpful. Keep responses concise and engaging!"
            },
            ...(chatHistory || []).map((msg: any) => ({
              role: msg.role === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            { role: 'user', content: message }
          ];

          const response = await axios.post(
            apiUrl,
            { model: modelName, messages, temperature: 0.7 },
            { headers: { Authorization: authHeader, 'Content-Type': 'application/json' } }
          );

          reply = response.data.choices[0].message.content || "";
        } catch (err) {
          console.error(`Error in ${useOllama ? 'Ollama' : 'OpenAI'} Chat, falling back to mock...`, err);
        }
      }

      // Offline friendly fallback response
      if (!reply) {
        reply = `Bonjour ! Je suis votre tuteur Évora IA. [Mode Local] C'est une excellente question concernant la langue française. 

Pour progresser en français et exceller au TCF Canada, je vous conseille de réviser régulièrement les bases :
1. Pratiquez votre compréhension orale avec nos exercices d'écoute.
2. Écrivez de courts textes pour que je puisse corriger votre grammaire.
3. Conjuguez le subjonctif présent pour les expressions de doute ou d'opinion (ex: "Il faut que je fasse").

Comment puis-je vous aider aujourd'hui ? Voulez-vous qu'on révise la différence entre "a" et "à" ou qu'on fasse une simulation de TCF ?`;
      }

      if (req.user) {
        await prisma.aIUsageLog.create({
          data: {
            userId: req.user.id,
            service: 'gpt-4o-tutor-chat',
            inputToken: 150,
            outputToken: 200
          }
        });
      }

      return res.status(200).json({ reply });
    } catch (error) {
      console.error('Tutor chat error:', error);
      return res.status(500).json({ error: 'Failed to process tutoring request.' });
    }
  }
}
