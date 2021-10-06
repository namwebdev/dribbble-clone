<template>
  <Banner />
  <div v-if="loading" class="flex items-center justify-center my-4 h-44">
    <div class="animate-spin">
      <Logo />
    </div>
    <p class="ml-1.5 font-bold">
      Welcome to <span class="text-primary">Dribbble</span>, please wait ...
    </p>
  </div>
  <div v-if="!loading" class="container">
    <!-- <CategoryTabs :categories="categories" /> -->
    <ListShot :categories="categories" />
  </div>
</template>

<script>
import categoryApi from "@/api/Factory/categories.js";
import Banner from "@/components/Banner.vue";
import Logo from "@/components/Logo.vue";
import CategoryTabs from "@/components/CategoryTabs.vue";
import ListShot from "@/components/Shot/List.vue";

export default {
  components: { Banner, Logo, CategoryTabs, ListShot },
  data() {
    return {
      categories: [],
      loading: false,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        const { data } = await categoryApi.get();
        this.categories = data || [];
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
