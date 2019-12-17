<script>
import faker from "faker";

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
  data() {
    return {
      comment: ""
    };
  },
  computed: {
    cardDetail() {
      return Object.assign({}, this.card);
    }
  },
  methods: {
    save(card) {
      this.$emit("save", card);
    },
    randomComment() {
      return faker.hacker.phrase();
    }
  }
};
</script>
<template>
  <div :class="$style.cardListModal">
    <div
      class="d-flex h-100 align-items-center justify-content-center overflow-hidden"
      v-on:click.self="$emit('close')"
    >
      <div class="card bg-light mb-3 mx-100" :class="$style.cardDetailContainer">
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
              <b-button size="sm" v-on:click.self="$emit('close')">Close</b-button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Description</h5>
          <b-form-textarea
            :class="$style.cardDetailHeader"
            style="overflow: hidden; overflow-wrap: break-word;"
            rows="8"
            size="sm"
            max-rows="25"
            :readonly="card.isComplete"
            v-model="cardDetail.cardDescription"
          ></b-form-textarea>
          <div class="d-flex mt-3">
            <b-button size="sm" @click.self="save(cardDetail)">Save</b-button>
          </div>

          <div class="d-flex border-bottom pb-3">
            <div class="form-column col-sm-12">
              <div class="form-group">
                <div class="mb-3">
                  <span>Add a comment</span>
                  <button class="btn btn-sm py-0 btn-secondary float-right">Comment</button>
                </div>
                <textarea class="form-control" v-model="comment"></textarea>
              </div>
            </div>
          </div>

          <div class="comment container">
            <div class="timeline-items position-relative">
              <div class="mb-2 ml-4 mt-3 d-flex" v-for="i in 20" :key="`comment-${i}`">
                <div class="mr-3">
                  <img src="@src/assets/logo.png" alt class="rounded-circle" width="44" height="44" />
                </div>
                <Comment>
                  <div slot="comment-header">
                    <span class="text-black-50">Jake - 2019 July 18</span>
                  </div>
                  <div slot="comment">{{ randomComment() }}</div>
                </Comment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.comment {
  position: relative;
  text-align: left;
  font-size: 13px;
  &:before {
    content: " ";
    border-left: 1px solid #d1d8dd;
    position: absolute;
    top: 0px;
    bottom: -124px;
    left: 120px;
    z-index: 0;
  }
}
.cardListModal {
  overflow: auto;
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

.cardDetailContainer {
  width: 740px;
  margin-top: 48px;
  top: 0;
  position: absolute;
}
</style>
