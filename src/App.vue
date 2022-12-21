<template>
  <div>
    <RouterView>
      <template #default="{ Component, route }">
        <template v-if="route.meta && route.meta.layout == false">
          <component :is="Component" />
        </template>
        <template v-else>
          <DefaultLayout>
            <component :is="Component" />
          </DefaultLayout>
        </template>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const DefaultLayout = defineAsyncComponent(() => import("@/layout/Default.vue"));
</script>

<style scoped></style>
