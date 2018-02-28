import axios from 'axios';

export function updateCommentArea(comment){
    return {
        type: 'UPDATE_COMMENT',
        payload: comment
    }
}

export function postComment(){
    return {
        type:'POST_COMMENT',
        payload:''
    }
}

export function intitialRender(){
    return{
        type:'INITIAL_RENDER',
        payload: ''
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