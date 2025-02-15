<script setup lang="ts">
import { computed, markRaw, ref } from "vue";
import { useRouter } from "vue-router";
import { useKeyCachedComponent } from "@/hooks/cache.ts";


const current = ref(0)
const { includes, makeComponent, remove, makeKey, contains, map } = useKeyCachedComponent()
const router = useRouter()
const onClickLeft = () => router.go(-1)
const OUT_IN = "out-in"
const IN_OUT = "in-out"

const mode = ref(IN_OUT)
const modeName = ref('leave')
router.beforeEach(async (to, from, next) => {
  const toKey = to.query.t as string
  const fromKey = from.query.t as string
  const ok = contains(toKey)
  if (!ok) {
    mode.value = ''
    modeName.value = 'push'
  } else {
    mode.value = ''
    modeName.value = 'pop'
  }
  await next()
  if (ok) {
    // 这里必须setTimeout
    setTimeout(() => {
      remove(fromKey)
    }, 0)
  }
})


</script>

<template>
  <van-nav-bar
      fixed
      title="标题"
      :left-text="(includes.length > 1) ? '返回' : ''"
      :left-arrow="(includes.length > 1)"
      @click-left="onClickLeft"
  />
  <div style="height: var(--van-nav-bar-height)"></div>
  <div
      style="position: relative;width: 100vw; height: calc(100vh - var(--van-nav-bar-height)); outline: 1px solid black;overflow-x: hidden; overflow-y: auto;">
    <router-view v-slot="{Component, route}">
      <Transition :mode="mode" :name=" includes.length > 0 ? modeName : undefined ">
        <keep-alive :include="includes">
          <component :is="makeComponent(Component, route.query.t)"/>
        </keep-alive>
        <!--          <div style="position: absolute;top: 0;left: 0" :key=" route.query.t">-->
        <!--          </div>-->
      </Transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">


.push {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
    top: 0;
    position: absolute;
    left: 0
  }

  &-enter-active {
    z-index: 1;
  }

  &-enter-active {
    position: absolute;
    transition: all 300ms;

  }

  &-leave-to {
    //opacity: 0;
    z-index: -1;
  }

  &-enter-from,
  &-leave-to {
    //opacity: 0;
  }

  &-enter-from {
    transform: translateX(100vw);
  }
}

.pop {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
    top: 0;
    position: absolute;
    left: 0
  }

  &-leave-active {
    z-index: 1;
  }

  &-enter-active {
    position: absolute;
    transition: all 300ms;

  }


  &-leave-to {
    opacity: 0;
    transform: translateX(100vw);
  }
}
</style>
