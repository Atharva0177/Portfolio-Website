import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Using Web3Forms API (free service)
    // Get your access key from https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

    // Validate that access key is configured
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      console.error('Web3Forms access key not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please set up Web3Forms access key.' },
        { status: 500 }
      )
    }

    console.log('Sending email via Web3Forms...')

    // Use FormData as per Web3Forms official example
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('subject', subject)
    formData.append('message', message)

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    console.log('Web3Forms response status:', response.status)
    console.log('Web3Forms response headers:', response.headers.get('content-type'))

    // Check if the response is OK first
    if (!response.ok) {
      const responseText = await response.text()
      console.error('Web3Forms error response:', responseText.substring(0, 500))
      
      return NextResponse.json(
        { error: `Email service error: ${response.status}. Your access key may be invalid or unverified. Please check your Web3Forms account and verify your email address.` },
        { status: 500 }
      )
    }

    // Try to parse JSON response
    let data
    try {
      data = await response.json()
    } catch (parseError) {
      const responseText = await response.text()
      console.error('Failed to parse Web3Forms response as JSON')
      console.error('Response text:', responseText.substring(0, 500))
      return NextResponse.json(
        { error: 'Invalid response from email service. Your Web3Forms access key may not be activated. Please check your email for a verification link from Web3Forms.' },
        { status: 500 }
      )
    }

    if (data.success) {
      console.log('Email sent successfully via Web3Forms')
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      )
    } else {
      console.error('Web3Forms error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to send message. Please verify your Web3Forms access key.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
