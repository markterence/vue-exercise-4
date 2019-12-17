<template>
  <div class="card bg-light" style="width: 75%">
    <div class="card-header">
      <slot name="comment-header" />
    </div>
    <div class="card-body">
      <p class="card-text">
        <slot name="comment" />
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>
