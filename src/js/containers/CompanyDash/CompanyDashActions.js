import axios from 'axios';
const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

export function getProjectDetail(projectId) {
  return {
    type: 'GET_PROJECT_DETAIL',
    payload: authAxios
      .get('http://localhost:3000/api/projects/' + projectId)
      .then(r => {
        return r.data;
      })
      .catch(err => res.status(500).send('bad response'))
  };
}

export function getUsersProjects(detail) {
  return {
    type: 'GET_USERS_PROJECTS',
    payload: detail
  };
}

export function deleteProject(id, projects) {
  return {
    type: 'DELETE_PROJECT',
    payload: authAxios
      .delete(`http://localhost:3000/api/projects/${id}`)
      .then(() => {
        return { id, projects };
      })
  };
}
