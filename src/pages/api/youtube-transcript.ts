import type { NextApiRequest, NextApiResponse } from 'next';

interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

interface TranscriptResponse {
  transcript?: TranscriptSegment[];
  title?: string;
  error?: string;
}

async function getVideoInfo(videoId: string): Promise<{ title: string; captionTracks: any[] }> {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });

  if (!response.ok) {
    throw new Error('Impossibile accedere al video');
  }

  const html = await response.text();

  // Extract video title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : '';

  // Extract caption tracks from ytInitialPlayerResponse
  const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
  if (!playerResponseMatch) {
    throw new Error('Impossibile trovare i dati del video');
  }

  let playerResponse;
  try {
    playerResponse = JSON.parse(playerResponseMatch[1]);
  } catch {
    throw new Error('Errore nel parsing dei dati del video');
  }

  const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

  return { title, captionTracks };
}

async function fetchTranscript(captionUrl: string): Promise<TranscriptSegment[]> {
  const response = await fetch(captionUrl);
  if (!response.ok) {
    throw new Error('Impossibile scaricare la trascrizione');
  }

  const xml = await response.text();
  const segments: TranscriptSegment[] = [];

  // Parse XML manually
  const textMatches = xml.matchAll(/<text start="([^"]*)" dur="([^"]*)"[^>]*>([^<]*)<\/text>/g);

  for (const match of textMatches) {
    const start = parseFloat(match[1]);
    const duration = parseFloat(match[2]);
    let text = match[3];

    // Decode HTML entities
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/\n/g, ' ')
      .trim();

    if (text) {
      segments.push({ text, start, duration });
    }
  }

  return segments;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranscriptResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non permesso' });
  }

  const { videoId } = req.body;

  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Video ID richiesto' });
  }

  // Validate video ID format
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return res.status(400).json({ error: 'Formato Video ID non valido' });
  }

  try {
    const { title, captionTracks } = await getVideoInfo(videoId);

    if (captionTracks.length === 0) {
      return res.status(404).json({
        error: 'Nessuna trascrizione disponibile per questo video. Il video potrebbe non avere sottotitoli.',
      });
    }

    // Prefer Italian, then English, then any available
    const preferredLanguages = ['it', 'en', 'a.it', 'a.en'];
    let selectedTrack = captionTracks[0];

    for (const lang of preferredLanguages) {
      const track = captionTracks.find(
        (t: any) => t.languageCode === lang || t.vssId?.includes(lang)
      );
      if (track) {
        selectedTrack = track;
        break;
      }
    }

    const transcript = await fetchTranscript(selectedTrack.baseUrl);

    if (transcript.length === 0) {
      return res.status(404).json({
        error: 'La trascrizione è vuota',
      });
    }

    return res.status(200).json({ transcript, title });
  } catch (error) {
    console.error('Transcript error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Errore nel recupero della trascrizione',
    });
  }
}
