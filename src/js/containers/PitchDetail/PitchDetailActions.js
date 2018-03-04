import axios from "axios";
import Cookies from 'cookies-js'

export function getProjectById(id) {
    return {
        type: 'GET_PROJECT_BY_ID',
        payload: axios.get('http://localhost:3000/api/projects/' + id)
            .then(r => r.data)
            .catch(e => console.log(e.message))
    }
}

export function changeProjectInfo(detail, values) {
  console.log('values from pitch detail actions',values)
    return {
        type: "CHANGE_PROJECT_INFO",
        payload: axios
        .patch('http://localhost:3000/api/projects/' + detail.id, values)
        .then(response => {
          console.log("put request pitch detail actions", response)
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

export function changeStatus(detail, value) {
    console.log('value for put request', value)
    const statusValue = {
        status: value
    }
    return {
        type: 'CHANGE_STATUS',
        payload: axios.patch('http://localhost:3000/api/projects/' + detail.id, statusValue)
        .then(response => {
            console.log("put request pitch detail actions FOR STATUS", response)
            return response.data
        })
            .catch(e => console.log(e.message))  
    }
 }
