import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();

    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER;

    if (!accessToken || !phoneNumberId || !recipientNumber) {
      return NextResponse.json({ success: false, error: 'Missing environment variables' }, { status: 500 });
    }

    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientNumber,
        type: 'text',
        text: {
          body: message,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API Error:', data);
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
