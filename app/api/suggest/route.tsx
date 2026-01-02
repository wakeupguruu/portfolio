import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ownerEmail = process.env.OWNER_EMAIL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { track, message } = body;

    if (!track) {
      return NextResponse.json({ error: 'Track data required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Music <onboarding@resend.dev>', // Default testing domain
      to: [ownerEmail],
      subject: `Song Suggestion: ${track.name}`,
      react: <EmailTemplate
        trackName={track.name}
        artistName={track.artists[0].name}
        albumArt={track.album.images[0]?.url}
        trackUrl={track.external_urls.spotify}
        previewUrl={track.preview_url}
        message={message}
        suggesterName={body.suggesterName}
      />,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Suggest API Error:', error);
    return NextResponse.json({ error: 'Failed to send suggestion' }, { status: 500 });
  }
}
