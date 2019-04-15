<template>
  <v-bottom-nav dark fixed :value="true">
    <v-btn to="/" flat color="light-blue">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn to="/orders" flat color="light-blue">
      <span>Order</span>
      <v-icon>shopping_basket</v-icon>
    </v-btn>

    <v-btn to="/management" flat color="light-blue">
      <span>Management</span>
      <v-icon>fastfood</v-icon>
    </v-btn>

    <v-btn to="/report" flat color="light-blue">
      <span>Report</span>
      <v-icon>description</v-icon>
    </v-btn>

    <v-btn to="/register" flat color="light-blue">
      <span>Register</span>
      <v-icon>money</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>
