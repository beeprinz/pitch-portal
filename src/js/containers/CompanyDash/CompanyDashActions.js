// export function getProjectDetail(detail){
//     console.log('Actions projectId and projectName', detail)
//     return {
//         type:'GET_PROJECT_DETAIL_FULFILLED',
//         payload: detail,
//     }
// }

export function getUsersProjects(detail){
    console.log('Actions projectId and projectName', detail)
    return {
        type:'GET_USERS_PROJECTS',
        payload: detail,
    }
}

export function getStatus(status){
    console.log('Actions projectStatus', status)
    return {
        type:'GET_STATUS_FULFILLED',
        payload: status,
    }
}