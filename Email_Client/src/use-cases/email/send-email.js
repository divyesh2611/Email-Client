module.exports = function makeSendEmailUsecase({
    google,
    oauth2Client,
    getUserByEmail,
    base64 ,
    fs
})
{
    return async function sendEmail({emailAddress, database})
    {
   
        let user =  await getUserByEmail({email:emailAddress, database});
        // console.log(user);
        oauth2Client.setCredentials({
            access_token: user.accesstoken,
            refresh_token: user.reftoken,
        });
        const inlinePath = '/home/ad.rapidops.com/divyesh.parmar/Desktop/clean_code/Email_Client/src/public/inlineAttachments/plane1.jpg';
        const filePath = '/home/ad.rapidops.com/divyesh.parmar/Desktop/clean_code/Email_Client/src/public/attachments/bike.jpg';
        const imageName = path.basename(inlinePath);
        const inlineImage = fs.readFileSync(inlinePath).toString('base64')
        const fileName = path.basename(filePath);
        const fileContent = fs.readFileSync(filePath).toString('base64');

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });


  const message = [
    `From: divyeshparmar112001@gmail.com`,
    `To: divyesh11parmar@gmail.com`,
    'Content-Type: multipart/mixed; boundary="boundary_example"',
    '',
    '--boundary_example',
    'Content-Type: multipart/related; boundary="boundary_related_example"',
    '',
    '--boundary_related_example',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    '<p>Here is an image:</p>',
    `<img src="cid:image_cid">`,
    '',
    `--boundary_related_example`,
    `Content-Type: image/jpeg; name="${imageName}"`,
    `Content-Disposition: inline; filename="${imageName}"`,
    `Content-Transfer-Encoding: base64`,
    `Content-ID: <image_cid>`,
    '',
    `${inlineImage}`,
    '',
    `--boundary_related_example--`,
    '',
    `--boundary_example`,
    `Content-Type: application/pdf; name="${fileName}"`,
    `Content-Disposition: attachment; filename="${fileName}"`,
    `Content-Transfer-Encoding: base64`,
    '',
    `${fileContent}`,
    '',
    `--boundary_example--`
  ].join('\n');
  
    //   const encodedMessage = base64.encodeURI(message)

        const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

       await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage
        }
        }, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Email sent:', res.data);
        });

    }

}