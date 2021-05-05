<template>
  <section class="overflow-x-hidden">
    <Navbar />
    <slot />
    <Footer />
  </section>
</template>

<script>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";

export default {
  components: { Navbar, Footer },
};
</script>
