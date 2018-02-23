import axios from 'axios';

export function updateCommentArea(comment){
    return {
        type: 'UPDATE_COMMENT',
        payload: comment
    }
}

export function postComment(comment){
    axios.post('http://localhost:3000/api/comments',{
        "author": "TESTICALS",
        "text": "adding more content",
        "date": "2018-02-22T01:48:20.692Z",
        "userId": "5a81ea9b270f8f13fc08adef"
      })
    .then(function(res,req){
    })
    .catch(function(err){
    })
    return {
        type:'POST_COMMENT',
        payload:''
    }

}


// export function displayComments(){
//     const tempUser = '5a8b5f0bb54fb80d00b7cb08'
//     axios.get(`http://localhost:3000/api/users/${tempUser}/comments`)
//     .then(function(res){
//         console.log(res.data)
//         return {
//         }
//     })
//     .catch(function(err){
//         console.log(err)
//     })
// }