<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-container>
        <h2>Tareitas</h2>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-col cols="6">
          <v-card>
            <v-card-title>Tasks</v-card-title>
            <v-card-text>
              <v-text-field label="Title" v-model="taskTitle"></v-text-field>
              <v-text-field
                label="Description"
                v-model="taskDescription"
              ></v-text-field>
              <v-btn dark color="black" block @click="createTask()"
                >Enviar</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col v-for="task in tasks" :key="task._id"
              ><v-card>
                <v-card-title>{{ task.title }}</v-card-title>
                <v-card-text>{{ task.description }}</v-card-text>
                <v-btn color="red" @click="deleteTask(task)">Eliminar</v-btn>
              </v-card></v-col
            >
          </v-row>
        </v-col>
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
    },

    async deleteTask(task) {
      deleteTask(task);
      this.getAllTasks();
    },
  },

  mounted() {
    this.getAllTasks();
  },
};
</script>