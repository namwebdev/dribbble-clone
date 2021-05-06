<template>
  <div class="shot-container">
    <div class="shot-preview relative">
      <a :href="link" target="_blank" class="shot-overlay transition-effect">
        <div class="h-1/4 flex items-center justify-between w-full px-4">
          <div class="text-white font-bold">{{ title }}</div>
          <a :href="link" target="_blank" class="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              class="icon fill-current"
            >
              <path
                d="M15.2121 0.75C14.5218 0.75 13.9621 1.30964 13.9621 2C13.9621 2.69036 14.5218 3.25 15.2121 3.25H18.9822L7.11612 15.1161C6.62796 15.6043 6.62796 16.3957 7.11612 16.8839C7.60427 17.372 8.39573 17.372 8.88388 16.8839L20.75 5.01777V8.5C20.75 9.19036 21.3096 9.75 22 9.75C22.6904 9.75 23.25 9.19036 23.25 8.5V2C23.25 1.30964 22.6904 0.75 22 0.75H15.2121Z"
              />
              <path
                d="M3.25 8C3.25 7.0335 4.0335 6.25 5 6.25H8.1C8.79036 6.25 9.35 5.69036 9.35 5C9.35 4.30964 8.79036 3.75 8.1 3.75H5C2.65279 3.75 0.75 5.65279 0.75 8V19C0.75 21.3472 2.65279 23.25 5 23.25H16C18.3472 23.25 20.25 21.3472 20.25 19V15.9C20.25 15.2096 19.6904 14.65 19 14.65C18.3096 14.65 17.75 15.2096 17.75 15.9V19C17.75 19.9665 16.9665 20.75 16 20.75H5C4.0335 20.75 3.25 19.9665 3.25 19V8Z"
              />
            </svg>
          </a>
        </div>
      </a>

      <img class="rounded-xl" :src="image" :alt="title" />
    </div>
    <!--  -->
    <div class="flex justify-between mt-3">
      <div class="flex items-center">
        <img
          class="rounded-circle h-6"
          :src="author_avatar"
          :alt="author_name"
        />
        <a :href="author_link" target="_blank" class="text-sm ml-2 font-bold">
          {{ author_name }}
        </a>
      </div>
      <!--  -->
      <div class="flex items-center">
        <div class="flex items-center text-icon-gray">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            width="14"
            height="11"
            role="img"
            class="icon fill-current shot-tools-icon"
          >
            <path
              d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z"
            ></path>
          </svg>
          <span class="text-xs text-deep-blue ml-0.5">{{ like }}</span>
        </div>
        <div class="flex items-center text-icon-gray ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            role="img"
            class="icon fill-current shot-tools-icon"
          >
            <path
              d="M7 3.45833C5.87242 3.45833 4.95833 4.37242 4.95833 5.5C4.95833 6.62758 5.87242 7.54167 7 7.54167C8.12758 7.54167 9.04167 6.62758 9.04167 5.5C9.04167 4.37242 8.12758 3.45833 7 3.45833ZM7 0.25C3.13425 0.25 0 4.625 0 5.5C0 6.375 3.13425 10.75 7 10.75C10.8657 10.75 14 6.375 14 5.5C14 4.625 10.8657 0.25 7 0.25ZM7 8.70833C5.22783 8.70833 3.79167 7.27217 3.79167 5.5C3.79167 3.72783 5.22783 2.29167 7 2.29167C8.77217 2.29167 10.2083 3.72783 10.2083 5.5C10.2083 7.27217 8.77217 8.70833 7 8.70833Z"
            ></path>
          </svg>
          <span class="text-xs text-deep-blue ml-0.5">{{ view }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shot: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const {
      title,
      image,
      link,
      author_name,
      author_avatar,
      author_link,
      like,
      view,
    } = props.shot;

    return {
      title,
      image,
      link,
      author_name,
      author_avatar,
      author_link,
      like,
      view,
    };
  },
};
</script>

<style>
.shot-preview:hover > .shot-overlay {
  @apply opacity-100;
}
.shot-overlay {
  background: linear-gradient(
    180deg,
    transparent 62%,
    rgba(0, 0, 0, 0.00345888) 63.94%,
    rgba(0, 0, 0, 0.014204) 65.89%,
    rgba(0, 0, 0, 0.0326639) 67.83%,
    rgba(0, 0, 0, 0.0589645) 69.78%,
    rgba(0, 0, 0, 0.0927099) 71.72%,
    rgba(0, 0, 0, 0.132754) 73.67%,
    rgba(0, 0, 0, 0.177076) 75.61%,
    rgba(0, 0, 0, 0.222924) 77.56%,
    rgba(0, 0, 0, 0.267246) 79.5%,
    rgba(0, 0, 0, 0.30729) 81.44%,
    rgba(0, 0, 0, 0.341035) 83.39%,
    rgba(0, 0, 0, 0.367336) 85.33%,
    rgba(0, 0, 0, 0.385796) 87.28%,
    rgba(0, 0, 0, 0.396541) 89.22%,
    rgba(0, 0, 0, 0.4) 91.17%
  );
  @apply opacity-0 flex items-end absolute top-0 left-0 h-full w-full rounded-xl cursor-pointer;
}
</style>
