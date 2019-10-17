<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },

  methods: {
    //$emit('check')
  }
};
</script>
<template>
  <a href="#" :class="[{ [$style.listCompleted]: card.isComplete }, $style.listCard]">
    <span
      :class="$style.listCardEdit"
      class="mr-1 mt-1 p-1 px-2"
      v-on:click.stop="$emit('remove', card)"
    >
      <FontAwesomeIcon icon="trash-alt" class="fa-xs" />
    </span>
    <div class="d-flex align-items-center p-2" @click="$emit('show', card)">
      <b-form-checkbox size="sm" v-model="card.isComplete" @change="$emit('check',card)"></b-form-checkbox>
      <div
        :class="[
          $style.listCardDetails,
          { [$style.completed]: card.isComplete }
        ]"
      >
        <span :class="$style.listCardTitle">{{ card.cardTitle }}</span>
      </div>
    </div>
  </a>
</template>

<style lang="scss" module>
.listCompleted {
  background-color: #ccc !important;
}
.completed {
  text-decoration: line-through;
  color: #888;
}

.listCard {
  background-color: #eee;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  border-radius: 2px;
  margin-bottom: 6px;
  color: #333;
  position: relative;
  min-height: 30px;
  &:hover {
    text-decoration: none;
    color: #444;
  }
  .listCardTitle {
    text-decoration: none;
    word-wrap: break-word;
    overflow: hidden;
  }
}

.listCardDetails {
  overflow: hidden;
  width: 100%;
  margin-right: 8px;
}
.listCardHead {
  opacity: 0;
  &:hover {
    opacity: 1;
  }
}
.listCardEdit {
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 4px;
  &:hover {
    opacity: 1;
    background-color: #d5d5d5;
    color: var(--pink);
  }
}
</style>
