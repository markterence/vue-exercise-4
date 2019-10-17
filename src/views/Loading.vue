<script>
export default {};
</script>

<template>
  <Transition appear>
    <FontAwesomeIcon :icon="['fas', 'sync']" spin :class="$style.loadingIcon" />
  </Transition>
</template>

<style lang="scss" module>
.loadingIcon {
  font-size: 20px;
  display: block;
  margin: 0 autol;
}
</style>
