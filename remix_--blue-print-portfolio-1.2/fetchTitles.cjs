const https = require('https');
const urls = [
  'https://drive.google.com/thumbnail?id=1wV1HyHVQjdHoaCBJBrk15-HfKp7CcLMD&sz=w1000'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(res.statusCode);
  });
});
