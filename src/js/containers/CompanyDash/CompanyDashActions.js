export function getProjectDetail(detail){
    console.log('Actions payload', detail)
    return {
        type:'GET_PROJECT_DETAIL_FULFILLED',
        payload: detail,
    }
}