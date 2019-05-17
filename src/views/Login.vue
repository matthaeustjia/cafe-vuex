<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="signIn">
                    <v-text-field prepend-icon="person" v-model="user" label="Login" type="text"></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      v-model="password"
                      label="Password"
                      type="password"
                    ></v-text-field>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" color="primary">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import store from "@/store";
export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      let user = this.user + "@cafe.com";
      auth.signInWithEmailAndPassword(user, this.password).then(() => {
        store.commit("setUser", this.user), this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>