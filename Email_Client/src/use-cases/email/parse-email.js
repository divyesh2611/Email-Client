module.exports = function makeParseEmail({
  b64Decode
})
{
   
    
   return async function parseEmail({email}){
      //  const headers = email.data.payload.headers;
      //   const threadId = email.data.threadId;
      //   const snippet = email.data.snippet;
      //   const msgId = email.data.id ;
      //   let from,date,subject,to,bcc,cc;
      //   for(let i=0;i<headers.length;i++){
      //       switch (headers[i].name) {
      //           case 'To':
      //           to = headers[i].value
      //           console.log("To",headers[i].value,typeof headers[i].value )
      //             break;
      //           case 'Date':
      //             date = headers[i].value
      //             console.log("date",headers[i].value)
      //             break;
      //           case 'Subject':
      //             subject = headers[i].value
      //             console.log("subject",headers[i].value)
      //             break;
      //           case 'From':
      //             from = headers[i].value
      //             console.log("from",headers[i].value)
      //             break;
      //           case 'Bcc':
      //               bcc = headers[i].value
      //               console.log("Bcc",headers[i].value)
      //               break;
      //           case 'Cc':
      //               cc = headers[i].value
      //               console.log("cc",headers[i].value)
      //               break;
      //         }
      //   }
    
      //       let decodedTextBody;
      //       let decodedHtmlBody;
      //       console.log("body",email.data.payload.body.size,typeof email.data.payload.body.size)
      //       if(email.data.payload.body.size == 0){
      //          let textBody =  email.data.payload.parts[0].body.data?email.data.payload.parts[0].body.data:null
      //          let htmlBody = email.data.payload.parts[1] ?email.data.payload.parts[1].body.data:null;
            
      //          if(textBody)
      //            decodedTextBody = Buffer.from(textBody, 'base64').toString('utf-8');
      //          if(htmlBody)
      //             decodedHtmlBody = Buffer.from(htmlBody, 'base64').toString('utf-8')
      //       }
      //       else{
      //          let htmlBody =  email.data.payload.body.data ? email.data.payload.body.data :null;
      //          if(htmlBody)
      //            decodedHtmlBody = Buffer.from(htmlBody, 'base64').toString('utf-8');
              
      //       }

      //       const parts  =email.data.payload.parts;
      //       let attachmentData = [];
      //           // console.log("part1",parts[0].parts[1])
      //           if(parts){
      //               for (let i = 0; i < parts.length; i++) {
      //                   const part = parts[i];
      //                   if (part.filename && part.filename.length > 0) 
      //                       attachmentData.push(part);
      //               }
      //               if(parts[0].parts){
      //                   for(let j=0;j<parts[0].parts.length;j++){
      //                       if(parts[0].parts[j].filename){
      //                           attachmentData.push(parts[0].parts[j]);
      //                       }
      //                   }
      //               }
                    
      //           }
      //           // console.log("*****************attachment data***************",attachmentData)
      //       return Object.freeze({
      //           to,from,subject,cc,bcc,date,msgId,decodedTextBody,decodedHtmlBody,threadId,snippet,attachmentData
      //       })


      function urlB64Decode(string) {
        return string
         ? decodeURIComponent(escape(b64Decode(string.replace(/\-/g, '+').replace(/\_/g, '/'))))
         : '';
      }
      
      /**
       * Takes the header array filled with objects and transforms it into a more
       * pleasant key-value object.
       * @param  {array} headers
       * @return {object}
       */
      function indexHeaders(headers) {
        if (!headers) {
          return {};
        } else {
          return headers.reduce(function (result, header) {
            result[header.name.toLowerCase()] = header.value;
            return result;
          }, {});
        }
      }
      
      /**
       * Takes a response from the Gmail API's GET message method and extracts all
       * the relevant data.
       * @param  {object} response
       * @return {object}
       */
      function parseMessage(response) {
        var result = {
          id: response.id,
          threadId: response.threadId,
          labelIds: response.labelIds,
          snippet: response.snippet,  
          historyId: response.historyId
        };
        if (response.internalDate) {
          result.internalDate = parseInt(response.internalDate);
        }
      
        var payload = response.payload;
        if (!payload) {
          return result;
        }
      
        var headers = indexHeaders(payload.headers);
        result.headers = headers;
      
        var parts = [payload];
        var firstPartProcessed = false;
      
        while (parts.length !== 0) {
          var part = parts.shift();
          if (part.parts) {
            parts = parts.concat(part.parts);
          }
          if (firstPartProcessed) {
            headers = indexHeaders(part.headers);
          }
      
          if (!part.body) {
            continue;
          }
      
          var isHtml = part.mimeType && part.mimeType.indexOf('text/html') !== -1;
          var isPlain = part.mimeType && part.mimeType.indexOf('text/plain') !== -1;
          var isAttachment = Boolean(part.body.attachmentId || (headers['content-disposition'] && headers['content-disposition'].toLowerCase().indexOf('attachment') !== -1));
          var isInline = headers['content-disposition'] && headers['content-disposition'].toLowerCase().indexOf('inline') !== -1;
      
          if (isHtml && !isAttachment) {
            result.textHtml = urlB64Decode(part.body.data);
          } else if (isPlain && !isAttachment) {
            result.textPlain = urlB64Decode(part.body.data);
          }  else if (isInline) {
          var body = part.body;
          if(!result.inline) {
            result.inline = [];
          }
          result.inline.push({
            filename: part.filename,
            mimeType: part.mimeType,
            size: body.size,
            attachmentId: body.attachmentId,
            headers: indexHeaders(part.headers)
          });
        }
        else if (isAttachment) {
          var body = part.body;
          if(!result.attachments) {
            result.attachments = [];
          }
          result.attachments.push({
            filename: part.filename,
            mimeType: part.mimeType,
            size: body.size,
            attachmentId: body.attachmentId,
            headers: indexHeaders(part.headers)
          });
        }
      
          firstPartProcessed = true;
        }

        // console.log("result",result);
        return result;
      }
      
      
    return await parseMessage(email)
      

    }
}
      
    
