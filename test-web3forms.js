// Test script to verify Web3Forms access key
// Run with: node test-web3forms.js

const ACCESS_KEY = 'f48db4af-7ee0-4c62-a2c4-c8380e972134' // Your access key

async function testWeb3Forms() {
  console.log('Testing Web3Forms access key...')
  console.log('Access Key:', ACCESS_KEY)
  console.log('')

  // Create URL-encoded form data
  const formBody = new URLSearchParams({
    access_key: ACCESS_KEY,
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from the test script'
  })

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    })

    console.log('Response Status:', response.status)
    console.log('Response Status Text:', response.statusText)
    console.log('Content-Type:', response.headers.get('content-type'))
    console.log('')

    const text = await response.text()
    console.log('Raw Response:')
    console.log(text)
    console.log('')

    // Try to parse as JSON
    try {
      const data = JSON.parse(text)
      console.log('Parsed JSON:')
      console.log(JSON.stringify(data, null, 2))
      
      if (data.success) {
        console.log('\n✅ SUCCESS! Your access key is working correctly.')
        console.log('Check your email inbox for the test message.')
      } else {
        console.log('\n❌ FAILED:', data.message)
      }
    } catch (e) {
      console.log('⚠️  Response is not JSON (likely HTML error page)')
      console.log('This usually means:')
      console.log('  1. Your access key has not been verified via email')
      console.log('  2. The access key is invalid')
      console.log('  3. Web3Forms service is down')
      console.log('')
      console.log('ACTION REQUIRED:')
      console.log('  → Check your email for a verification link from Web3Forms')
      console.log('  → Click the verification link to activate your account')
      console.log('  → Wait a few minutes after verification')
      console.log('  → Run this test script again')
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message)
  }
}

testWeb3Forms()
