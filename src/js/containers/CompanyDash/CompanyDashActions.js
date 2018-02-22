export function getDetail(detail) {

    return {
        type: 'GET_DETAIL_FULFILLED',
        payload: detail,
    }
}

export function getUsersProjects(detail) {
    console.log('Actions projectId and projectName', detail)
    return {
        type: 'GET_USERS_PROJECTS',
        payload: detail,
    }
}