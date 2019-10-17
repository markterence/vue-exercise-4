<script>
export default {
  props: {
    card: {
      type: Object,
      required: false,
      default: function() {
        return {
          cardTitle: "T"
        };
      }
    }
  },
  computed: {
    cardDetail() {
      return Object.assign({}, this.card);
    }
  },
  methods: {
    save(card) {
      this.$emit("save", card);
    }
  }
};
</script>
<template>
  <div :class="$style.cardListModal">
    <div
      class="d-flex h-100 align-items-center justify-content-center"
      v-on:click.self="$emit('close')"
    >
      <div class="card bg-light mb-3" style="width: 640px">
        <div class="card-header">
          <div class="d-flex justify-space-between">
            <b-form-textarea
              ref="textArea"
              :class="$style.cardDetailHeader"
              maxlength="512"
              style="overflow: hidden; overflow-wrap: break-word;"
              rows="2"
              size="sm"
              max-rows="8"
              :readonly="card.isComplete"
              v-model="cardDetail.cardTitle"
            ></b-form-textarea>
            <div class="ml-3">
              <b-button size="sm" v-on:click.self="$emit('close')"
                >Close</b-button
              >
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Description</h5>
          <b-form-textarea
            :class="$style.cardDetailHeader"
            style="overflow: hidden; overflow-wrap: break-word;"
            rows="15"
            size="sm"
            max-rows="25"
            :readonly="card.isComplete"
            v-model="cardDetail.cardDescription"
          ></b-form-textarea>
          <div class="d-flex mt-3">
            <b-button size="sm" @click.self="save(cardDetail)">Save</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.cardListModal {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.cardDetailHeader {
  font-weight: 600;
  background: transparent;
  border: none;
  appearance: none;
}
</style>
