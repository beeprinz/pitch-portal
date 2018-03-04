import axios from 'axios';
const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

export function getDetail(detail){
    return {
        type:'GET_DETAIL_FULFILLED',
        payload: detail,
    }
}

export function getUsersProjects(detail){
    return {
        type:'GET_USERS_PROJECTS',
        payload: detail,
    }
}
export function deleteProject(id, projects) {
    return {
        type: 'DELETE_PROJECT',
        payload: authAxios.delete(`http://localhost:3000/api/projects/${id}`).then(() => { return { id, projects } })
    }
}


