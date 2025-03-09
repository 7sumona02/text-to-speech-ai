import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import gTTS from 'gtts';

export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }

  try {
    const gtts = new gTTS(text, 'en');
    const filePath = join(process.cwd(), 'public', 'audio.mp3');
    gtts.save(filePath, (err) => {
      if (err) {
        return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
      }
    });

    return NextResponse.json({ url: '/audio.mp3' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}