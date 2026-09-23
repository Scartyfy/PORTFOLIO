const https = require('https');
const urls = [
  'https://drive.google.com/file/d/1dV8PDpPb23biy6QHFpyOdrefsZftAgnY/view?usp=sharing',
  'https://drive.google.com/file/d/1J5dudpctxl4QwO1UEGodEbrGOCSj_8Tp/view?usp=sharing',
  'https://drive.google.com/file/d/1xfu-EW3-CtAnS1V-UoOvc_I0ubfxIRjy/view?usp=sharing',
  'https://drive.google.com/file/d/1nIZ3cYLqpC4KCv_rWDGGWJtzRDgOhhqN/view?usp=sharing',
  'https://drive.google.com/file/d/1wV1HyHVQjdHoaCBJBrk15-HfKp7CcLMD/view?usp=sharing'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<title>(.*?)<\/title>/);
      console.log(match ? match[1] : 'No title');
    });
  });
});
