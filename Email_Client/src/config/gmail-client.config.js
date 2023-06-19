const CLIENT_ID = "574397757533-2ocl7bjgcfno99juute1ml8836345qgh.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
const ACCESS_TOKEN = "ya29.a0Ael9sCMRsXvb--nT1CvqnM4rQettWd_MQ1CrG_5lW0GiONBmQqrQKU13ZwKrIjrATDOsi5Nnw_KpbVZkTP26bDfmvkYZkHbs2gsKmuS0_LQ-BMUZU84POCnD8u3M8fxg-RjLosKhQfrDAlSDzY4Cgj8pRsBgaCgYKAcQSARMSFQF4udJhxN2LUf6RzFBZ0HWzbMvCqw0163";
const REFRESH_TOKEN = "1//0gRfEbtXCZytLCgYIARAAGBASNwF-L9Iruda2iOnKN6AdECczKxYhEFrRxAHqAZe0g-tCMM-sOqacSlJF20HQkmK4eX2c_S8cRN8";
const { OAuth2Client } = require('google-auth-library');


const oauth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
  // oauth2Client.setCredentials({
  //   access_token: ACCESS_TOKEN,
  //   refresh_token: REFRESH_TOKEN,
  // });

module.exports = oauth2Client;