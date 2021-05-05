<template>
  <div v-if="!loading">
    <div class="list-shot mt-8" id="list-shot">
      <ShotItem v-for="shot in shots" :key="shot.id" :shot="shot" />
    </div>
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
</template>

<script>
import { ref, watch, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import shotsApi from "@/api/Factory/shots.js";
import ShotItem from "@/components/Shot/Item.vue";

export default {
  components: { ShotItem },
  setup() {
    const shots = ref([]);
    const pagination = ref({
      page: 1,
      limit: 12,
    });
    const loading = ref(true);
    const isNoMoreResult = ref(false);
    const route = useRoute();

    watch(
      route,
      (val) => {
        fetchShots(val.query.category_id || null);
      },
      { immediate: true }
    );

    async function fetchShots(category_id) {
      loading.value = true;
      try {
        const { page, limit } = pagination.value;
        const params = {
          page,
          limit,
          ...(category_id && { category_id }),
        };
        const { data } = await shotsApi.get(params);
        shots.value = data || [];
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    }

    return { shots };
  },
  mounted() {
    window.addEventListener("scroll", () => this.loadMore());
    this.emitter.on("change-category", (category) => {
      this.handleGetShotsByCategory(category);
    });
  },
  methods: {
    getShots() {
      this.shots =
        Object.keys(this.currentCategory).length === 0 ||
        this.currentCategory.id === 0
          ? shots.slice(0, 12)
          : shots
              .filter((shot) => {
                return shot.category_id === this.currentCategory.id;
              })
              .slice(0, 12);
      this.isNoMoreResult = false;
    },
    loadMore() {
      const element = document.getElementById("list-shot");
      if (window.scrollY + window.innerHeight >= element.scrollHeight) {
        if (this.shots.length < shots.length)
          this.shots = this.shots.concat(shots.slice(12));
        else {
          this.isNoMoreResult = true;
          window.removeEventListener("scroll", this.loadMore);
        }
      }
    },
    handleGetShotsByCategory(category) {
      if (category) {
        this.currentCategory = category;
        this.getShots();
      }
    },
  },
};
</script>

<style>
.list-shot {
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 2.75rem;
}
</style>
