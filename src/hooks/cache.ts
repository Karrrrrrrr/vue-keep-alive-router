import { computed, markRaw, ref, shallowReactive } from "vue";

export const useKeyCachedComponent = (prefix = "Key_") => {
    const map = shallowReactive((new Map))
    const includes = computed(() => [...map.keys()])
    const makeKey = (key: string | number) => prefix + key
    const remove = (key: string) => map.delete(makeKey(key))
    const makeComponent = (Component: any, key: number | string) => {
        // console.log('call make component', Component, key)
        if (!Component) return Component
        const name = makeKey(key)
        // const name = Component.type.__name + "_" + key
        if (map.has(name)) return map.get(name)
        const newComponent = { ...Component.type, name: name }
        map.set(name, newComponent)
        return newComponent
    }

    return {
        makeComponent,
        includes,
        remove,
        makeKey,
        contains: (key: string) => {
            return map.has(makeKey(key))
        }
    }
}
