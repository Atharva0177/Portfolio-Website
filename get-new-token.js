const https = require('https');
const querystring = require('querystring');

// ⚠️ REPLACE WITH YOUR VALUES
const client_id = '689d9a8b5786486ea4dc6cf949722a03';
const client_secret = 'fb2c4c416a634af2bc3752ef1ad9f49c';
const code = 'AQAg8j-Xc2h7pATehJY8tyHRcswEpWcclOcL5wLDj0ko_CgR_m7BpVxkLbYsyktDLBXkA0dyVqmcdTQPUP5NeXgQtQLh8oaN7Yec-VRIhuBxKpsDmKQGfsYbumlApg7HU5axVnGyOf-C9ZaMsNa1uS0IvBdjwFtfRiVKzE5gQO1dtIJllpRRuMLzhraCZs7tDTZljUw_SQWh6K-2L_YIRL76obNcQcBx-u6fBFttwmhxevfvXVMKHVBTvK46Kx6z_cz4u5L_OkPyRDNU6huAtZBh_t2xyUqgAVE';  // From the OAuth flow

const postData = querystring.stringify({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: 'http://127.0.0.1:3000',
  client_id: client_id,
  client_secret: client_secret
});

const options = {
  hostname: 'accounts.spotify.com',
  path: '/api/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

console.log('🎵 Getting Spotify tokens...\n');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (response.error) {
        console.error('❌ Error:', response.error);
        console.error('Description:', response.error_description);
        return;
      }
      
      console.log('✅ SUCCESS!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔑 SAVE THESE - YOU ONLY NEED TO DO THIS ONCE!\n');
      console.log('Access Token (expires in 1 hour - don\'t save this):');
      console.log(response.access_token);
      console.log('\n📌 REFRESH TOKEN (SAVE THIS - IT NEVER EXPIRES):');
      console.log(response.refresh_token);
      console.log('\n⏰ Expires in:', response.expires_in, 'seconds (1 hour)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('📝 Add this to your .env.local:\n');
      console.log(`SPOTIFY_CLIENT_ID=${client_id}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${client_secret}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}\n`);
      console.log('💡 This refresh token will work FOREVER!');
      console.log('   Your API will automatically get new access tokens.\n');
      
    } catch (e) {
      console.error('❌ Failed to parse response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e);
});

req.write(postData);
req.end();