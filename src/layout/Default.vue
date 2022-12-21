<template>
  <div>
    <div class="links">
      <RouterLink :to="{ name: ROUTE_NAME.home }"> Home</RouterLink>
      <RouterLink :to="{ name: ROUTE_NAME.profile }">Profile</RouterLink>
      <RouterLink :to="{ name: ROUTE_NAME.login }">Login</RouterLink>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ROUTE_NAME } from "@/router/constant";
</script>

<style scoped>
.links {
  display: flex;
  gap: 8px;
}
</style>
