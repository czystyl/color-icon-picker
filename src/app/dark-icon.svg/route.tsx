import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';
import Icon from '../icon';

export const runtime = 'edge';

export async function GET() {
  try {
    const icon = Icon().dark;
    if (!icon) {
      return NextResponse.json(
        { error: 'Failed to generate icon' },
        { status: 500 }
      );
    }

    return new ImageResponse(icon, {
      width: 32,
      height: 32,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating icon:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
