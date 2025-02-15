import { computed, markRaw, ref } from "vue";

export const useKeyCachedComponent = () => {
    const map = ref((new Map))
    const includes = computed(() => [...map.value.keys()])
    const makeKey = (key: string | number) => "Key_" + key
    const remove = (key: string) => map.value.delete(makeKey(key))
    const makeComponent = (Component: any, key: number | string) => {
        // console.log('call make component', Component, key)
        if (!Component) return Component
        const name = makeKey(key)
        // const name = Component.type.__name + "_" + key
        if (map.value.has(name)) return map.value.get(name)
        const newComponent = markRaw({ ...Component.type, name: name })
        map.value.set(name, newComponent)
        return newComponent
    }

    return {
        makeComponent,
        includes,
        remove,
        makeKey,
        contains: (key: string) => {
            return map.value.has(makeKey(key))
        },
        map
    }
}
