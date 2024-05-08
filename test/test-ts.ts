import { computed, ref } from "vue";

function sandbox() {
    const someRef = ref();

    const obj = {
        a: 1,
        b:  2
    };

    const computed_withSideEffect = computed(() => {
        const x = obj.b+1;
        obj.a = x;
    });

    function context() {
        const curried = () => <T>(source: T) => 0;
    }
}
