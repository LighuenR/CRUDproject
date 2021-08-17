<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-container>
        <h1>Task manager</h1>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" lg="6">
            <v-card>
              <v-card-title>Task</v-card-title>
              <v-card-text>
                <v-text-field label="Title" v-model="taskTitle"></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="taskDescription"
                ></v-text-field>
                <v-btn dark color="black" block @click="createTask()"
                  >Send</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" lg="3" v-for="task in tasks" :key="task._id"
            ><v-card>
              <v-card-title>{{ task.title }}</v-card-title>
              <v-card-text>{{ task.description }}</v-card-text>
              <v-btn color="red" block @click="deleteTask(task)">Delete</v-btn>
              <v-btn color="blue" block>Update</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getAllTasks, createTask, deleteTask } from "./services/tasks";

export default {
  data() {
    return {
      tasks: [],
      taskTitle: "",
      taskDescription: "",
      edit: false,
    };
  },
  methods: {
    async getAllTasks() {
      this.tasks = await getAllTasks();
      console.log(this.tasks);
    },
    async createTask() {
      const res = await createTask({
        title: this.taskTitle,
        description: this.taskDescription,
      });
      console.log(res);
      this.getAllTasks();
      this.taskTitle = "";
      this.taskDescription = "";
    },

    async deleteTask(task) {
      deleteTask(task);
      this.getAllTasks();
    },
    /* 
    async putTask(task) {

    } */
  },

  mounted() {
    this.getAllTasks();
  },
};
</script>

<style>
</style>