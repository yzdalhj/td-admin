<template>
  <iframe :src="baseApi + 'magic/web/index.html'" width="100%" height="100%" frameborder="0"></iframe>
</template>

<script>
export default {
  data() {
    return {
      baseApi: import.meta.env.VITE_BASE_API,
    };
  },
};
</script>
<style scoped>
iframe {
  /* position: absolute; */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
