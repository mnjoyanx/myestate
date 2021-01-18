<template>
  <div>
    <yandex-map
        :coords="coords"
        zoom="4"
        style="width: 100%; max-width: 100%; height: 90vh;"
    >
    </yandex-map>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      coords: [20.099943, 50.706567],
      controls: []
    }
  },
  mounted(){
  }
}
</script>

<style scoped>

</style>