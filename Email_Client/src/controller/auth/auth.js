function makeAuthController({ createUser, client }) {
  return Object.freeze({
    googleAuthLogin,
    googleAuthCallback,
  });

  function googleAuthLogin(req, res) {
    // console.log("googleauth")
    try {
      const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "email",
          "profile",
          "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/gmail.compose",
        ],
      });
      console.log("authUrl",authUrl);
      res.redirect(authUrl);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
  async function googleAuthCallback(req, res) {
    const { code } = req.query;
    console.log("code",code)
    try {
      const { tokens } = await client.getToken(code);
      console.log("access_token", tokens);
      client.setCredentials(tokens);
      // console.log("called");
      // get user informations
      const { data } = await client.request({
        url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        method: "GET",
      });


      const databaseName = "test1";
      if (tokens.refresh_token) {
        const userdata = {
          name: data.name,
          email: data.email,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token
        }
        const results = await createUser({ name: data.name, email: data.email, database:databaseName ,accessToken: tokens.access_token,
          refToken: tokens.refresh_token,expiryDate:new Date(tokens.expiry_date)})
      }
      console.log("google data : ", data);


      

      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = makeAuthController;
