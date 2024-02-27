<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Pagination from "./components/Pagination.vue";
import SearchField from "./components/SearchField.vue";
import Spinner from "./components/Spinner.vue";
import TableView from "./components/TableView.vue";
import { getPassages } from "./composables/getPassages.ts";

const quote = ref("");
const currentPage = ref(1);
const limit = ref(10);
const totalResults = ref(0);

const { data, error, isLoading, fetchPassages } = getPassages();

onMounted(async () => {
  await fetchPassages("", limit.value);
  totalResults.value = data.value?.count;
});

const search = async (pagination?: "next" | "prev") => {
  if (pagination) {
    if (pagination === "next") {
      currentPage.value += 1;
    }
    if (pagination === "prev") {
      currentPage.value -= 1;
    }
  } else {
    currentPage.value = 1;
  }
  let offset = (currentPage.value - 1) * limit.value;
  await fetchPassages(quote.value, limit.value, offset);
  totalResults.value = data.value?.count;
};

const filteredData = computed(() => {
  const mappedData = data.value?.results?.map((r) => ({
    id: r.id,
    displayLabel: r.display_label,
    keywords: r.key_word?.map((k) => k.stichwort),
    origination:
      r.text.start_date || r.text.end_date
        ? `(${r.text.start_date}${
            r.text.end_date ? `-${r.text.end_date}` : ""
          })`
        : "n/a",
  }));
  return mappedData || [];
});

watch(limit, async () => {
  await search();
});

const tableData = ref({
  headers: ["ID", "Display Name", "Keywords", "Origination"],
  items: filteredData,
});
</script>

<template>
  <div class="max-w-6xl mx-auto py-16 px-5">
    <div class="flex space-x-5">
      <aside class="w-1/5 pt-14">
        <SearchField
          placeholder="Quote..."
          v-model:model-value="quote"
          class="mb-5"
        />
        <button
          class="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-400 font-semibold px-5 py-2 rounded-lg w-24 flex justify-center"
          :disabled="isLoading"
          @click="search()"
        >
          <Spinner v-if="isLoading" />
          <template v-else>Search</template>
        </button>
      </aside>
      <div class="w-4/5">
        <div class="flex mb-6 items-baseline">
          <p class="text-2xl font-semibold flex-grow">
            Total results: {{ totalResults }}
          </p>
          <form class="max-w-sm mx-auto flex items-center">
            <label for="limit" class="block font-medium text-white mr-2"
              >Limit:</label
            >
            <select
              id="limit"
              v-model.number="limit"
              class="border text-sm rounded-lg block w-full px-2.5 py-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </form>
        </div>
        <template v-if="data">
          <TableView
            :data="tableData"
            class="w-full"
            :class="isLoading ? 'opacity-50' : 'opacity-100'"
          />
          <Pagination
            :total-results="totalResults"
            :current-page="currentPage"
            :items-per-page="limit"
            class="mt-5"
            @next="search('next')"
            @prev="search('prev')"
          />
        </template>
        <div v-else-if="error" class="p-5 text-white">
          There was an error while processing your request.<br />(Response:
          {{ error }})
        </div>
      </div>
    </div>
  </div>
</template>
