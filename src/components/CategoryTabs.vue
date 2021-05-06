<template>
  <ul
    v-if="!loading"
    class="shots mt-4 overflow-x-scroll sm:overflow-hidden justify-center flex items-center min-w-min w-full mx-auto h-10 lg:max-w-2xl"
    id="shots"
  >
    <li v-for="category in categories" :key="category.id">
      <span
        class="text-black hover:text-black-hover transition-effect cursor-pointer text-sm px-5 min-w-max"
        :class="{ active: isCateActive(category) }"
        @click="handleRouteToCategoryPage(category)"
      >
        {{ category.name }}
      </span>
    </li>
  </ul>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import categoryApi from "@/api/Factory/categories.js";

export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const categories = ref([]);
    const router = useRouter();
    const route = useRoute();

    initShots();
    // onMounted(() => handleSwipeShots());

    function initShots() {
      const allItem = [{ id: 0, name: "All" }];
      categories.value = [...allItem, ...props.categories];
    }
    function isCateActive(category) {
      if (route.params.category) return category.tag === route.params.category;
      return category.id === 0;
    }
    function handleRouteToCategoryPage(category) {
      // const routeObj = category.tag
      //   ? { name: "Category", params: { category: category.tag } }
      //   : { name: "Home" };
      // router.push(routeObj);
      const routeLink = category.tag ? `/category/${category.tag}` : "/";
      window.location.href = routeLink;
    }
    function handleSwipeShots() {
      const slider = document.getElementById("shots");
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    }

    return {
      categories,
      handleRouteToCategoryPage,
      isCateActive,
    };
  },
};
</script>
<style scoped>
ul {
  min-width: 200px;
}
li {
  min-width: 120px;
  text-align: center;
}
.shots.active {
  scroll-behavior: smooth;
  cursor: grabbing;
  cursor: -webkit-grabbing;
}
span.active {
  background: rgba(13, 12, 34, 0.05);
  @apply text-black-hover rounded-md py-1;
}
</style>
