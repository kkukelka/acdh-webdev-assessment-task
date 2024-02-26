import { ref } from "vue";

export function getPassages() {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const fetchPassages = async (quote?: string, limit = 10, offset = 0) => {
    isLoading.value = true;
    try {
      const response = await fetch(
        `https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?zitat=${quote}&zitat_lookup=icontains&limit=${limit}&offset=${offset}`
      );
      data.value = await response.json();
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, fetchPassages };
}
