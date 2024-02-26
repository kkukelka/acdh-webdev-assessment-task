<script setup lang="ts">
import { ITableData } from "../types/table";

const props = defineProps<{
  data?: ITableData;
}>();
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-50 uppercase bg-gray-700">
        <tr>
          <th v-for="header in data?.headers" scope="col" class="px-6 py-3">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data?.items"
          class="text-gray-300 bg-gray-800 border-b border-gray-500"
        >
          <td v-for="(value, key) in item" class="px-6 py-4">
            <a
              v-if="key === 'id'"
              :href="`https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/${value}`"
              target="_blank"
              class="hover:underline text-blue-400 underline-offset-2"
            >
              {{ value }}
            </a>
            <div v-else class="line-clamp-1">
              {{ value }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
