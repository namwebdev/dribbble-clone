<template>
  <div v-if="!loading">
    <div class="list-shot" id="list-shot">
      <ShotItem v-for="shot in shots" :key="shot.id" :shot="shot" />
    </div>
    <div v-show="isLoadMore && !isNoMoreResult">Load more...</div>
    <div
      v-show="isNoMoreResult"
      class="flex items-center justify-center mt-8 text-xs"
    >
      <img
        class="mr-1"
        width="14"
        height="14"
        src="https://cdn.dribbble.com/assets/dribbble-ball-icon-4e54c54abecf8efe027abe6f8bc7794553b8abef3bdb49cd15797067cf80ca53.svg"
        alt=""
      />
      No more shots
    </div>
  </div>
  <div v-if="loading" class="list-shot">
    <ShotLoadingItem v-for="(shot, index) in 4" :key="index" />
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import shotsApi from "@/api/Factory/shots.js";
import ShotItem from "@/components/Shot/Item.vue";
import ShotLoadingItem from "@/components/Shot/Loading.vue";

export default {
  components: { ShotItem, ShotLoadingItem },
  setup() {
    const shots = ref([]);
    const shotPagination = reactive({ page: 1, total_pages: 1 });
    const loading = ref(true);
    const isLoadMore = ref(false);
    const isNoMoreResult = ref(false);
    const route = useRoute();

    watch(
      route,
      () => {
        reFetchShots();
      },
      { immediate: true }
    );

    onMounted(() => {
      window.addEventListener("scroll", async () => {
        const element = document.getElementById("list-shot");
        await nextTick();
        if (
          element &&
          window.scrollY + window.innerHeight >= element.scrollHeight
        )
          await loadMore();
      });
    });

    async function reFetchShots() {
      loading.value = true;
      try {
        shots.value = [];
        shotPagination.page = 1;
        isNoMoreResult.value = false;
        await fetchShots(shotPagination.page);
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    }
    async function fetchShots(page = 1, limit = 12) {
      try {
        const { category_id } = route.query;
        const params = {
          page,
          limit,
          ...(category_id && { category_id }),
        };
        const { data, pagination } = await shotsApi.get(params);
        if (data && pagination) {
          shots.value = shots.value.concat(data);
          shotPagination.page = pagination.page || 1;
          shotPagination.total_pages = pagination.total_pages || 1;
        }
      } catch (e) {
        console.log(e);
      }
    }
    async function loadMore() {
      const { page = 1, total_pages = 1 } = shotPagination;
      try {
        if (page < total_pages) {
          shotPagination.page++;
          isLoadMore.value = true;
          await fetchShots(shotPagination.page);
        } else isNoMoreResult.value = true;
      } catch (e) {
        console.log(e);
      } finally {
        isLoadMore.value = false;
      }
    }

    return { shots, loading, shotPagination, isLoadMore, isNoMoreResult };
  },
};
</script>

<style>
.list-shot {
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 2.75rem;
  @apply mt-8;
}
</style>
