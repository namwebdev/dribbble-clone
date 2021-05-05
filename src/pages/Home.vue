<template>
  <Banner />
  <div class="container">
    <CategoryTabs @change="onChangeCategory" />
    <ListShot />
  </div>
  <Footer />
</template>
<script>
import Banner from "@/components/Banner.vue";
import CategoryTabs from "@/components/CategoryTabs.vue";
import ListShot from "@/components/Shot/List.vue";

export default {
  components: { Banner, CategoryTabs, ListShot },
};
</script>
