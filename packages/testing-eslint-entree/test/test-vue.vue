<template>
    <div @click="() => {
        const obj = {
            a: 1,
        b: 2,
        }
    }" class="classy" data-foo="bar">
    <!--
        foo
    bar
    -->
    <div></div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const someRef = ref();
let foo = 'bar';

type Empty = {};

const obj = {
a: 1,
    b: 2,
    c: foo
};

const computed_withSideEffect = computed(() => {
    const x = obj.b + 1;
    obj.a = x;
});

const fn = () => <T>(x: T) => 0;

</script>
