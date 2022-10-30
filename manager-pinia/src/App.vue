<script setup>
import { useUserStore } from "./stores/users";
import { ref } from "vue";
const user_store = useUserStore();
const user_input = ref({
  name: "",
  email: "",
});
const sort = ref(false);
const CreateUser = () => {
  if (!user_input.value.name.trim() || !user_input.value.email.trim()) {
    return alert("Please enter a name and email");
  }
  user_store.create(user_input.value);
  user_input.value = {
    name: "",
    email: "",
  };
};

const DeleteUser = (id) => {
  user_store.delete(id);
  alert("User deleted successfully with id: " + id);
};
</script>

<template>
  <main>
    <h1>Team Manager</h1>

    <form @submit.prevent="CreateUser">
      <input
        type="text"
        placeholder="e.g. Naruto Uzumaki"
        v-model="user_input.name"
      />
      <input
        type="email"
        placeholder="e.g. hokage@ninja.com"
        v-model="user_input.email"
      />
      <input type="submit" value="Create user" />
    </form>

    <label><span>Sort</span><input type="checkbox" v-model="sort" /></label>
    <div class="users" v-if="!sort">
      <div v-for="user in user_store.users" class="user" :key="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button class="btn" @click="DeleteUser(user.id)">Delete</button>
      </div>
    </div>

    <div class="users" v-else>
      <div v-for="user in user_store.usersByName" class="user" :key="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button class="btn" @click="DeleteUser(user.id)">Delete</button>
      </div>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  background-color: #1a1a1a;
}
main {
  padding: 1.5rem;
}
h1 {
  color: #aaa;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
form {
  display: block;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
input:not([type="checkbox"]) {
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
input:not([type="submit"]):not([type="checkbox"]) {
  display: block;
  width: 100%;
  color: rgba(0, 0, 0, 0.75);
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: 0.4s;
}
input:not([type="submit"]):focus {
  border-color: #aaa;
}
input[type="submit"] {
  display: block;
  padding: 0.5rem 1rem;
  background-color: rgba(220, 20, 60, 0.9);
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left: auto;
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  transition: 0.4s;
}
input[type="submit"]:hover {
  transform: scale(1.03);
  background-color: crimson;
}
label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
label input {
  margin-left: 0.5rem;
}
.user {
  display: block;
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  transition: 0.2s;
}
.user div {
  color: #aaa;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}
.user h3 {
  color: rgba(0, 0, 0, 0.75);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  transition: 0.2s;
}
.user p {
  color: rgba(0, 0, 0, 0.55);
}
.user:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}
.user:hover h3 {
  color: crimson;
}
.user:last-of-type {
  margin-bottom: 0;
}

.btn {
  margin-top: 10px;
  color: crimson;
  background-color: #1a1a1a;
}
</style>
