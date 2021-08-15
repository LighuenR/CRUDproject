import axios from "axios";

const apiURL = "http://localhost:3300/api/task";

const ajax = axios.create();

export const getAllTasks = () => {
  return ajax
    .get(apiURL + "/")
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const createTask = (task) => {
  return ajax
    .post(apiURL + "/", task)
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteTask = (task) => {
  return ajax
    .delete(apiURL + `/${task._id}`)
    .then(res => {
      console.log(res)
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
};