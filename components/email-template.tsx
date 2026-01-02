import * as React from 'react';

interface EmailTemplateProps {
    trackName: string;
    artistName: string;
    albumArt: string;
    trackUrl: string;
    previewUrl: string | null;
    message?: string;
    suggesterName?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    trackName,
    artistName,
    albumArt,
    trackUrl,
    previewUrl,
    message,
    suggesterName,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#333' }}>New Song Suggestion! 🎵</h1>
        {suggesterName && (
            <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '16px' }}>
                Suggested by <strong style={{ color: '#000' }}>{suggesterName}</strong>
            </p>
        )}

        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            marginTop: '20px',
            backgroundColor: '#fafafa'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                <img
                    src={albumArt}
                    alt="Album Art"
                    style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#000' }}>{trackName}</h2>
                    <p style={{ margin: '0', color: '#666' }}>by {artistName}</p>
                </div>
            </div>

            <a
                href={trackUrl}
                style={{
                    display: 'inline-block',
                    backgroundColor: '#1DB954',
                    color: 'white',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}
            >
                Listen on Spotify
            </a>
        </div>

        {message && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <p style={{ margin: '0', fontStyle: 'italic', color: '#555' }}>"{message}"</p>
            </div>
        )}
    </div>
);
