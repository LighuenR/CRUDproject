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
          <v-col cols="12" lg="4">
            <v-card>
              <v-card-title>Task</v-card-title>
              <v-card-text>
                <v-text-field label="Title" v-model="taskTitle"></v-text-field>
                <v-textarea
                  label="Description"
                  v-model="taskDescription"
                ></v-textarea>
                <v-btn dark color="black" block @click="createTask()"
                  >Send</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="8">
            <v-row>
              
              <v-col cols="12" lg="6" v-for="task in tasks" :key="task._id"
                ><v-card  justify="space-around">
                  <v-card-title>{{ task.title }}</v-card-title>
                  <v-card-text>{{ task.description }}</v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions class="d-flex justify-end">
                  <v-btn
                    elevation="2"
                    class="ma-2"
                    justify="end"
                    small
                    right
                    @click="editDialogf(task)"
                    >Update</v-btn
                  >
                  
                  <v-btn
                 
                   justify-end
                    elevation="2"
                    color="error"
                     class="ma-2"
                    small
                    @click="deleteTask(task)"
                    >Delete</v-btn
                  >
              </v-card-actions>

                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Task id: {{ editId }} </v-card-title>
        <v-card-text>
          <v-text-field label="Edit Title" v-model="editTitle"></v-text-field>
          <v-text-field
            v-model="editDescription"
            label="Edit description"
          ></v-text-field>
          <v-btn dark color="blue" block @click="editTask()">Update</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { getAllTasks, createTask, deleteTask, putTask } from "./services/tasks";

export default {
  data() {
    return {
      tasks: [],
      taskTitle: "",
      taskDescription: "",
      editDialog: false,
      editId: "",
      editTitle: "",
      editDescription: "",
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
      await deleteTask(task);
      this.getAllTasks();
    },

    async editTask() {
      const res = await putTask({
        title: this.editTitle,
        description: this.editDescription,
        _id: this.editId,
      });
      if (res) {
        console.log("Entro sabroson");
        this.getAllTasks();
        this.editDialog = false;
      } else console.log("No se pudo editar");
    },

    editDialogf(task) {
      this.editDialog = true;
      this.editId = task._id;
      this.editTitle = task.title;
      this.editDescription = task.description;
    },
  },

  mounted() {
    this.getAllTasks();
  },
};
</script>

<style>
</style>