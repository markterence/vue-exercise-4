<script>
import TodoCardList from "@/src/components/Todo/CardList";
import TodoCardListModal from "@/src/components/Todo/CardListModal";
import listStorage from "@/src/utils/storage/list-storage";

export default {
  components: {
    TodoCardList,
    TodoCardListModal
  },
  data() {
    return {
      logs: [],
      heightInPx: null,
      cardTitle: "",
      listTitle: "",
      creatingCard: !false,
      showCardDetail: false,
      selectedCard: {},
      checked: false,
      // Load the list from the browser local storage
      list: listStorage.load(),
      storageUID: listStorage.load().cardList.length
    };
  },
  created() {
    this.logs = [];
  },
  mounted() {
    this.setHeight();
    this.logs.push(`Storage Loaded: `);
    this.logs.push(`--TotalRows: ${this.storageUID}`);
  },

  watch: {
    list: {
      handler: function(list) {
        listStorage.persist(list);
      },
      deep: true
    }
  },

  computed: {
    textAreaHeight() {
      return this.heightInPx;
    }
  },

  methods: {
    // Re-calculate text-area height
    // Bootstrap-vue's text-area has a minimum row of `2`
    // We need to force the text-area to have the height of `1` row
    setHeight() {
      let height = this.$refs.textArea.computeHeight();
      this.heightInPx = `${parseFloat(height) - 20}px`;
    },

    toggleCreateCard() {
      this.creatingCard = !this.creatingCard;

      this.cardTitle = "";
      this.$nextTick(() => {
        this.$refs.newCardInput.focus();
      });

      this.logs.push(`toggleCreateCard ${this.creatingCard}`);
    },

    viewCardDetail(selectedCard) {
      this.showCardDetail = !this.showCardDetail;

      this.selectedCard = selectedCard;
    },

    closeCardDetail() {
      this.showCardDetail = false;
    },

    addCardToList(cardList) {
      let valuesToAdd = {
        cardTitle: this.cardTitle,
        id: this.storageUID++
      };
      cardList.push(valuesToAdd);

      this.toggleCreateCard();

      this.logs.push(`Add`);
      this.logs.push(`--Value: ${JSON.stringify(valuesToAdd)}`);
    },

    updateCard(newVal) {
      const cardIndex = this.list.cardList.findIndex(o => o.id == newVal.id);
      // Cache oldValue for logging
      const oldValue = this.list.cardList[cardIndex];

      // Reactive update of arrays
      this.$set(this.list.cardList, cardIndex, newVal);

      this.logs.push(`Update`);
      this.logs.push(`--OldValue: ${JSON.stringify(oldValue)}`);
      this.logs.push(`--NewValue: ${JSON.stringify(newVal)}`);

      this.closeCardDetail();
    },

    removeCard(cardToRemove) {
      this.logs.push(`Remove`);
      this.logs.push(`--cardToRemove: ${JSON.stringify(cardToRemove)}`);

      const cardIndex = this.list.cardList.findIndex(
        o => o.id == cardToRemove.id
      );

      const removedCard = this.list.cardList.splice(cardIndex, 1);

      this.logs.push(`--Deleted: ${JSON.stringify(removedCard)}`);
      this.logs.push(`--cardIndex: ${cardIndex}`);
    },

    toggleCheck() {
      // `checked` boolean triggers the UI contextual state.
      this.checked = !this.checked;
      this.list.cardList.forEach(e => {
        this.$set(e, "isComplete", this.checked);
      });
    },

    // TODO: use this function to clear the logs
    clearLogs() {
      this.logs = [];
    }
  }
};
</script>

<template>
  <div :class="$style.board" class="p-2 d-flex">
    <div class="p-2">
      <div :class="$style.list" class="d-flex p-1">
        <div :class="$style.listContent" class="d-flex mh-100 flex-column p-1">
          <!-- Card Header -->
          <div :class="$style.listHeader" class="d-flex">
            <b-form-textarea
              ref="textArea"
              :class="$style.listTitle"
              :style="{ height: textAreaHeight }"
              v-model="list.listTitle"
              @update="setHeight()"
              maxlength="512"
              style="overflow: hidden; overflow-wrap: break-word;"
              rows="2"
              size="sm"
              max-rows="8"
            ></b-form-textarea>
            <div>
              <!--  class="p-2 m-2" -->
              <b-dropdown
                id="dropdown-right"
                :class="$style.listMenuBtn"
                variant="transparent"
                size="sm"
                right
                no-caret
              >
                <template slot="button-content">
                  <a type="button">
                    <FontAwesomeIcon icon="ellipsis-h" />
                  </a>
                </template>
                <b-dropdown-item-btn
                  @click="toggleCheck"
                  :value="checked"
                >{{ checked ? 'Un-check All' : 'Complete All' }}</b-dropdown-item-btn>
              </b-dropdown>
            </div>
          </div>

          <!-- Card List -->
          <div :class="$style.listCards" class="d-flex flex-column">
            <TodoCardList
              v-for="card in list.cardList"
              :key="card.id"
              :card="card"
              @show="viewCardDetail"
              @remove="removeCard"
            />
          </div>

          <!-- Card Footer -->
          <div class="pr-3 py-1 mt-2">
            <!-- Add Card -->
            <div v-show="creatingCard == false">
              <b-form-input
                v-model="cardTitle"
                :autofocus="true"
                ref="newCardInput"
                class="mb-1"
                size="sm"
                placeholder="Enter a title for this card"
              ></b-form-input>
              <b-button
                class="btn-secondary"
                size="sm"
                @click="addCardToList(list.cardList)"
              >Add Card</b-button>
            </div>

            <!-- + Add Another Card -->
            <a v-show="creatingCard" type="button" class="text-dark" @click="toggleCreateCard">
              <div class="d-flex px-1">
                <span class="mr-1">
                  <FontAwesomeIcon icon="plus" class="fa-sm" />
                </span>
                <span>Add Another Card</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <TodoCardListModal
      v-show="showCardDetail"
      :card="selectedCard"
      @close="closeCardDetail"
      @save="updateCard"
    />

    <!-- Sample -->
    <div id="logs" class="mt-4" style=" width: 480px; ">
      <div class="d-flex justify-content-end">
        <b-button size="sm" variant="secondary" @click="clearLogs">Clear</b-button>
      </div>
      <div class="bg-dark text-light p-1" style="overflow: scroll; font-size: 12px; height: 280px;">
        <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
$base-border-radius: 4px;

.board {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f1f1;
}
.list {
  width: 300px;
  margin-bottom: 32px;

  .listContent {
    background-color: #d7d7d7;
    border-radius: $base-border-radius;
    // min-height: 720px;
  }

  .listHeader {
    min-height: 20px;
    padding: 4px 2px;
    margin-bottom: 4px;
  }

  .listTitle {
    background: transparent;
    border: none;
    appearance: none;
    resize: none;
    font-weight: 600;
  }
}
.listCards {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.listMenuBtn {
  border-radius: $base-border-radius;
  &:hover {
    background-color: rgba(229, 229, 229);
  }
}
</style>
