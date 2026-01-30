import { useState } from 'react';
import Head from 'next/head';

interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

export default function YouTubeTranscription() {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTranscript([]);
    setVideoTitle('');

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('URL YouTube non valido. Inserisci un link valido.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/youtube-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nel recupero della trascrizione');
      }

      setTranscript(data.transcript);
      setVideoTitle(data.title || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFullText = (): string => {
    return transcript.map(segment => segment.text).join(' ');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFullText());
      alert('Trascrizione copiata negli appunti!');
    } catch {
      alert('Errore nella copia');
    }
  };

  return (
    <>
      <Head>
        <title>YouTube Transcription - Ottieni la trascrizione di un video</title>
        <meta name="description" content="Ottieni la trascrizione di qualsiasi video YouTube" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>YouTube Transcription</h1>
          <p style={styles.subtitle}>Inserisci un link YouTube per ottenere la trascrizione del video</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              style={styles.input}
              disabled={loading}
            />
            <button
              type="submit"
              style={styles.button}
              disabled={loading || !url.trim()}
            >
              {loading ? 'Caricamento...' : 'Ottieni Trascrizione'}
            </button>
          </form>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {transcript.length > 0 && (
            <div style={styles.resultContainer}>
              {videoTitle && <h2 style={styles.videoTitle}>{videoTitle}</h2>}

              <div style={styles.actions}>
                <button onClick={copyToClipboard} style={styles.copyButton}>
                  Copia testo completo
                </button>
              </div>

              <div style={styles.transcriptContainer}>
                <h3 style={styles.sectionTitle}>Trascrizione completa:</h3>
                <div style={styles.fullText}>
                  {getFullText()}
                </div>

                <h3 style={styles.sectionTitle}>Trascrizione con timestamp:</h3>
                <div style={styles.segments}>
                  {transcript.map((segment, index) => (
                    <div key={index} style={styles.segment}>
                      <span style={styles.timestamp}>{formatTime(segment.start)}</span>
                      <span style={styles.text}>{segment.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px',
    color: '#888888',
    marginBottom: '32px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '250px',
    padding: '14px 18px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #333333',
    backgroundColor: '#0f0f0f',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    padding: '14px 18px',
    backgroundColor: '#ff000020',
    border: '1px solid #ff0000',
    borderRadius: '8px',
    color: '#ff6b6b',
    marginBottom: '24px',
  },
  resultContainer: {
    marginTop: '24px',
  },
  videoTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '16px',
  },
  actions: {
    marginBottom: '20px',
  },
  copyButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    border: '1px solid #333333',
    backgroundColor: '#252525',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  transcriptContainer: {
    backgroundColor: '#0f0f0f',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #333333',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#888888',
    marginBottom: '12px',
    marginTop: '20px',
  },
  fullText: {
    color: '#ffffff',
    lineHeight: '1.8',
    fontSize: '15px',
    whiteSpace: 'pre-wrap',
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
  },
  segments: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  segment: {
    display: 'flex',
    gap: '16px',
    padding: '10px 0',
    borderBottom: '1px solid #252525',
  },
  timestamp: {
    color: '#ff0000',
    fontFamily: 'monospace',
    fontSize: '13px',
    minWidth: '50px',
    flexShrink: 0,
  },
  text: {
    color: '#e0e0e0',
    fontSize: '14px',
    lineHeight: '1.5',
  },
};
