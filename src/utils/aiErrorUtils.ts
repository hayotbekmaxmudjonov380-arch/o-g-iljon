export type AiErrorCode =
  | 'MISSING_API_KEY'
  | 'BILLING_REQUIRED'
  | 'PERMISSION_DENIED'
  | 'API_KEY_INVALID'
  | 'QUOTA_EXCEEDED'
  | 'MODEL_NOT_FOUND'
  | 'TRANSIENT_ERROR'
  | 'UNKNOWN_ERROR';

export interface ParsedAiError {
  httpStatus: number;
  code: AiErrorCode;
  userMessage: string;
  retryable: boolean;
}

interface RawGeminiErrorShape {
  status?: number;
  code?: number | string;
  message?: string;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

function extractEmbeddedJson(rawMessage: string): RawGeminiErrorShape['error'] | null {
  const start = rawMessage.indexOf('{');
  const end = rawMessage.lastIndexOf('}');
  if (start === -1 || end <= start) return null;

  try {
    const parsed = JSON.parse(rawMessage.slice(start, end + 1)) as RawGeminiErrorShape;
    if (parsed && typeof parsed === 'object') {
      if (parsed.error && typeof parsed.error === 'object') {
        return parsed.error;
      }
      return {
        code: typeof parsed.code === 'number' ? parsed.code : undefined,
        message: typeof parsed.message === 'string' ? parsed.message : undefined,
        status: typeof parsed.status === 'string' ? parsed.status : undefined,
      };
    }
  } catch {
    return null;
  }
  return null;
}

export function parseGeminiError(err: unknown): ParsedAiError {
  const errObj = (err && typeof err === 'object' ? err : {}) as RawGeminiErrorShape;
  const rawMessage =
    err instanceof Error
      ? err.message
      : typeof err === 'string'
        ? err
        : typeof errObj.message === 'string'
          ? errObj.message
          : '';

  const embedded = rawMessage ? extractEmbeddedJson(rawMessage) : null;
  const numericStatus =
    typeof errObj.status === 'number'
      ? errObj.status
      : typeof embedded?.code === 'number'
        ? embedded.code
        : typeof errObj.code === 'number'
          ? errObj.code
          : 0;

  const statusText = (embedded?.status ?? (typeof errObj.code === 'string' ? errObj.code : '')).toUpperCase();
  const detailMessage = embedded?.message ?? rawMessage;
  const lower = detailMessage.toLowerCase();

  if (
    lower.includes('free tier is not available') ||
    lower.includes('set up billing') ||
    lower.includes('upgrade to the paid tier')
  ) {
    return {
      httpStatus: 403,
      code: 'BILLING_REQUIRED',
      userMessage:
        'Joriy loyihada Gemini API bepul tarifi faol emas. AI yordamchidan foydalanish uchun to‘lov (billing) yoqilgan API kalitni tanlang yoki Settings > Secrets bo‘limida kalitni yangilang.',
      retryable: false,
    };
  }

  if (
    numericStatus === 400 &&
    (lower.includes('api key not valid') ||
      lower.includes('api_key_invalid') ||
      lower.includes('invalid argument'))
  ) {
    return {
      httpStatus: 400,
      code: 'API_KEY_INVALID',
      userMessage:
        'GEMINI_API_KEY yaroqsiz yoki noto‘g‘ri kiritilgan. Iltimos, Settings > Secrets bo‘limida API kalitni tekshiring.',
      retryable: false,
    };
  }

  if (numericStatus === 403 || statusText === 'PERMISSION_DENIED') {
    return {
      httpStatus: 403,
      code: 'PERMISSION_DENIED',
      userMessage:
        'Gemini API so‘rovi rad etildi (ruxsat yo‘q). Settings > Secrets bo‘limida API kalit va loyiha ruxsatlarini tekshiring.',
      retryable: false,
    };
  }

  if (numericStatus === 404 || statusText === 'NOT_FOUND') {
    return {
      httpStatus: 404,
      code: 'MODEL_NOT_FOUND',
      userMessage:
        'Tanlangan Gemini modeli topilmadi yoki hozircha qo‘llab-quvvatlanmaydi.',
      retryable: false,
    };
  }

  if (numericStatus === 429 || statusText === 'RESOURCE_EXHAUSTED') {
    return {
      httpStatus: 429,
      code: 'QUOTA_EXCEEDED',
      userMessage:
        'Gemini API so‘rovlar limiti tugadi. Biroz kutib qayta urinib ko‘ring yoki Settings > Secrets bo‘limida pullik (billing) API kalitni ulang.',
      retryable: true,
    };
  }

  if (
    numericStatus === 500 ||
    numericStatus === 502 ||
    numericStatus === 503 ||
    numericStatus === 504 ||
    statusText === 'UNAVAILABLE' ||
    lower.includes('overloaded') ||
    lower.includes('fetch failed') ||
    lower.includes('econnreset') ||
    lower.includes('etimedout')
  ) {
    return {
      httpStatus: 503,
      code: 'TRANSIENT_ERROR',
      userMessage:
        'AI serveri vaqtincha band yoki tarmoq uzilishi yuz berdi. Bir necha soniyadan so‘ng qayta urinib ko‘ring.',
      retryable: true,
    };
  }

  return {
    httpStatus: 500,
    code: 'UNKNOWN_ERROR',
    userMessage:
      'FizLab AI javobini olishda kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
    retryable: false,
  };
}
