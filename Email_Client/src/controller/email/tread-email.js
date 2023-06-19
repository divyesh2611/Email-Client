module.exports = function makeTreadEmailsController({
axios
}){
    return async function treadEmailsController(req,res){
        const userId = 'me'; // or specify the user's email address
        const accessToken = 'ya29.a0AWY7Ckl2MWS_CaSL9bv4OtXBX_ikcju679U6Axr39c9YUyjzDP3EClSNyPPTfCfndcdCLBsS_ZkBjdoUvVseXzi8-Vd7RQ2CnSeHJDVa8M_2RmM6sniYYE4t6pPhBxO-O3fc3m76zIwuLDyY1a9cqvpHjJg2aCgYKAa0SARMSFQG1tDrpIF-FSQBt6PK5JATdxqmufg0163';
        
        console.log("accessToken",accessToken)
    try {
    // const response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/threads`, {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    // });

    // const threads = response.data.threads;
    // console.log('Threads:', threads);
    
    res.send()
  } catch (error) {
    console.error('Error retrieving threads:', error.response.data);
  }

    }
}