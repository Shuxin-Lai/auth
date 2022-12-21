<template>
  <AButton type="link">button</AButton>
  <ADivider></ADivider>
  <div>Current user:</div>

  <div>
    {{ user }}
  </div>

  <div>
    <AButton @click="set">set</AButton>
  </div>
  <div>
    {{ obj }}
    <AButton @click="get">get</AButton>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { createStorage } from "@/utils/storage";
import { ref, toRefs } from "vue";

const { user } = toRefs(useUserStore());
const storage = createStorage({ alive: 1, type: "local", prefix: "test" });
const obj = ref({});
const set = () => {
  storage.set("test1", { name: "test1" });
};

const get = () => {};
</script>

<style scoped></style>
