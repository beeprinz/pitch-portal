import axios from "axios";
const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('userId');

const authAxios = axios.create({
  headers: { Authorization: token }
});

export function getProject(detail) { 
  return {
    type: "GET_PROJECT",
    payload: detail  
    }
} 

export function getProjectById(id) {
    return {
        type: 'GET_PROJECT_BY_ID',
        payload: authAxios.get('http://localhost:3000/api/projects/' + id)
            .then(r => r.data)
            .catch(e => console.log(e.message))
    }
}

export function changeProjectInfo(detail, values) {
    return {
        type: "CHANGE_PROJECT_INFO",
        payload: authAxios
        .patch('http://localhost:3000/api/projects/' + detail.id, values)
        .then(response => {
          return response.data
      })
        .catch(err => {
            return { error: err.message }
  
        })
    }
}

export function toggleEdit() {
    return { type: "TOGGLE_EDIT" }
}

export function savedDone() {
  return {
      type: "CHANGE_STATUS"
  }
}
