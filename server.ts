import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseGeminiError } from './src/utils/aiErrorUtils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

let cachedKey = '';
let cachedClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = (process.env.GEMINI_API_KEY ?? '').trim();
  if (!apiKey) {
    cachedKey = '';
    cachedClient = null;
    return null;
  }
  if (!cachedClient || cachedKey !== apiKey) {
    cachedKey = apiKey;
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedClient;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateWithRetry(
  client: GoogleGenAI,
  params: Parameters<GoogleGenAI['models']['generateContent']>[0],
  maxAttempts = 3
) {
  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await client.models.generateContent(params);
    } catch (err: unknown) {
      lastError = err;
      const parsed = parseGeminiError(err);
      if (!parsed.retryable || attempt === maxAttempts - 1) {
        throw err;
      }
      await wait(450 * 2 ** attempt);
    }
  }
  throw lastError;
}

interface ChatHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '4mb' }));

  app.post('/api/ai/ask', async (req: Request, res: Response) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        res.status(503).json({
          code: 'MISSING_API_KEY',
          error:
            'GEMINI_API_KEY topilmadi. Settings > Secrets bo‘limida API kalitni tekshiring.',
        });
        return;
      }

      const body = (req.body ?? {}) as {
        prompt?: string;
        history?: ChatHistoryTurn[];
        attachment?: { mimeType?: string; data?: string; name?: string };
      };

      const promptText = typeof body.prompt === 'string' ? body.prompt.trim() : '';
      if (!promptText && !body.attachment?.data) {
        res.status(400).json({ error: 'Savol matni bo‘sh bo‘lmasligi kerak.' });
        return;
      }

      const historyParts = Array.isArray(body.history)
        ? body.history
            .slice(-6)
            .filter(
              (turn) =>
                turn &&
                (turn.role === 'user' || turn.role === 'model') &&
                typeof turn.text === 'string' &&
                turn.text.trim().length > 0
            )
            .map((turn) => ({
              role: turn.role,
              parts: [{ text: turn.text.trim() }],
            }))
        : [];

      const currentParts: Array<
        | { text: string }
        | { inlineData: { mimeType: string; data: string } }
      > = [];

      if (body.attachment?.data && body.attachment?.mimeType) {
        currentParts.push({
          inlineData: {
            mimeType: body.attachment.mimeType,
            data: body.attachment.data,
          },
        });
      }

      currentParts.push({
        text:
          promptText ||
          'Ushbu biriktirilgan faylni molekulyar fizika nuqtai nazaridan tahlil qilib bering.',
      });

      const response = await generateWithRetry(ai, {
        model: 'gemini-4-hydrogen',
        contents: [
          ...historyParts,
          {
            role: 'user',
            parts: currentParts,
          },
        ],
        config: {
          systemInstruction:
            'Siz FizLab platformasining aqlli fizika va molekulyar fizika yordamchisisiz. Foydalanuvchilarga o‘zbek tilida aniq, mantiqiy, tushunarli va ilmiy asoslangan javoblar bering. Zarur bo‘lganda asosiy fizik formulalar (SI birliklari bilan) va bosqichma-bosqich izohlarni keltiring.',
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const answer = (response.text ?? '').trim();
      if (!answer) {
        res.status(502).json({
          error: 'Model javob qaytarmadi. Iltimos, qayta urinib ko‘ring.',
        });
        return;
      }

      res.json({ answer });
    } catch (err: unknown) {
      const parsed = parseGeminiError(err);
      console.error(`[AI /api/ai/ask] ${parsed.code} (${parsed.httpStatus})`);
      res.status(parsed.httpStatus).json({
        code: parsed.code,
        error: parsed.userMessage,
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FizLab server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
