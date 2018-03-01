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
  return {
    type: 'GET_USERS_PROJECTS',
    payload: detail
  };
}
