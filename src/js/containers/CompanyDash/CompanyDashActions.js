import axios from 'axios';



export function getProjectDetail(projectId) {
console.log('company dash actions projectId param', projectId)
    return {
        type: 'GET_PROJECT_DETAIL',
        payload: axios
        .get('http://localhost:3000/api/projects/' + projectId)
        .then(r => {
        console.log('company dash actions projectId res.data',r.data);
        return r.data
    })
        .catch(err => res.status(500).send('bad response'))
    }
}

export function getUsersProjects(detail) {
    console.log('Actions projectId and projectName', detail)
    return {
        type: 'GET_USERS_PROJECTS',
        payload: detail,
    }
}

export function deleteProject(id, projects) {
    
    return {
        type: 'DELETE_PROJECT',
        payload: axios.delete(`http://localhost:3000/api/projects/${id}`).then(() => { return { id, projects } })
    }
}

