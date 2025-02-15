<template>
  <div>
    <button @click="routerTo">
      模拟跳转
    </button>
    <div class="about">
      <button @click="count++">
        {{ count }}
      </button>
    </div>
  </div>
</template>

<style>

</style>

<script setup>
import { onActivated, onDeactivated, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { genId } from "@/utils/id.js";

const id = ref(0)
const router = useRouter()
const route = useRoute()

const count = ref(0)

onMounted(() => {
  id.value = route.query.t
})

onActivated(() => {
  console.log('onActivated', id.value)
})
onDeactivated(() => {
  console.log('onDeactivated', id.value)
})
const routerTo = () => {
  router.push({
    name: "about",
    // query: { t: (genId()) }
  })
}

</script>
