<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
}>();

const emits = defineEmits(["next", "prev"]);

const upperBound = computed(() => {
  let upperBound =
    (props.currentPage - 1) * props.itemsPerPage + Number(props.itemsPerPage);
  return props.totalResults <= upperBound ? props.totalResults : upperBound;
});
</script>

<template>
  <div class="flex flex-col items-center">
    <span class="text-sm text-gray-400">
      Showing
      <span class="font-semibold text-white">{{
        currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage
      }}</span>
      to
      <span class="font-semibold text-white">{{ upperBound }}</span>
      of
      <span class="font-semibold text-white">{{ totalResults }}</span>
      Entries
    </span>
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed rounded-s hover:bg-gray-900 mr-4"
        :disabled="currentPage <= 1"
        @click="$emit('prev')"
      >
        <svg
          class="w-3.5 h-3.5 me-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Prev
      </button>
      <button
        class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed rounded-s hover:bg-gray-900"
        :disabled="props.totalResults <= upperBound"
        @click="$emit('next')"
      >
        Next
        <svg
          class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
