<template>
  <div>
    <v-layout wrap justify-space-around>
      <v-flex xs6 row>
        <v-layout row>
          <v-flex xs6>
            <v-layout column>
              <v-icon>fa fa-coffee</v-icon>
              <v-layout column v-for="drink,parent_index in drinks">
                <v-btn
                  round
                  large
                  @click="showMenuToggle(parent_index)"
                  color="primary"
                >{{drink.name}}</v-btn>
                <v-layout
                  v-if="showMenuIndex == parent_index"
                  column
                  v-for="content, index in drink"
                >
                  <v-btn
                    large
                    round
                    v-if="content.size"
                    @click="addItemToInvoice(drinks[showMenuIndex],index)"
                    color="success"
                  >{{content.size}} ${{content.price}}</v-btn>
                </v-layout>
              </v-layout>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout column>
              <v-icon>fas fa-utensils</v-icon>
              <v-layout column v-for="food, index in foods">
                <v-btn
                  round
                  large
                  @click="addItemToInvoice(food,index)"
                  color="primary"
                >{{food.name}} ${{food.price}}</v-btn>
              </v-layout>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-flex xs12>
          <v-layout v-if="showOptionIndex != null" column>
            <v-icon>list</v-icon>
            <v-layout
              v-if="showOptionIndex != null && showOptionType=='food'"
              column
              v-for="option, index in foodOptions"
            >
              <v-btn large @click="addOptionToInvoice(option)" color="secondary">{{option.name}}</v-btn>
            </v-layout>
            <v-layout
              v-if="showOptionIndex != null && showOptionType=='drink'"
              column
              v-for="option in drinkOptions"
            >
              <v-btn large @click="addOptionToInvoice(option)" color="secondary">{{option.name}}</v-btn>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-flex>

      <v-flex xs5>
        <v-text-field
          autocomplete="off"
          name="name"
          label="Name..."
          v-model="customerName"
          append-icon="fas fa-address-card"
          single-line
        ></v-text-field>
        <v-card>
          <v-list v-if="itemList.length > 0">
            <v-list-group v-for="order, parent_index in itemList" no-action v-model="order.active">
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content @click="showOption(parent_index,order.type)">
                    <v-list-tile-title>{{order.size}} {{order.name}} ${{order.price}}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon @click="removeItemFromInvoice(parent_index)" color="red">fa fa-trash</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </template>

              <v-list-tile v-for="optionList, index in order.option">
                <v-list-tile-content>
                  <v-list-tile-title>{{ optionList.name }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon
                    @click="removeOptionFromInvoice(parent_index, index)"
                    color="red"
                  >fa fa-trash</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
        <v-layout v-if="itemList.length > 0" class="my-2" row justify-space-around>
          <v-card>
            <h1>Total ${{total}}</h1>
          </v-card>
          <v-card>
            <h1>Due ${{amountDue}}</h1>
          </v-card>
        </v-layout>

        <v-layout class="mt-2 pb-5" v-if="itemList.length > 0" justify-center>
          <v-flex v-if="paymentMethod == null" xs12>
            <v-layout column justify-center>
              <v-btn @click="paymentMethodToggle('cash')" block large color="success">
                <v-icon>far fa-money-bill-alt</v-icon>
              </v-btn>
              <v-btn @click="paymentMethodToggle('card')" block large color="warning">
                <v-icon>far fa-credit-card</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex v-else xs12>
            <v-layout v-if="paymentMethod == 'cash'" column reverse justify-center>
              <v-form @submit.prevent="paidBy('cash')">
                <v-text-field
                  @focus="amountPaid = ''"
                  autocomplete="off"
                  label="Cash amount..."
                  v-model="amountPaid"
                  append-icon="far fa-money-bill-alt"
                  single-line
                  :rules="[() => amountPaid.length > 0 || 'This field is required']"
                  required
                ></v-text-field>
                <v-btn type="submit" block large color="success">Submit</v-btn>
                <v-btn @click="paymentMethod = null" block large color="warning">Back</v-btn>
              </v-form>
            </v-layout>
            <v-layout v-else column justify-center>
              <v-form @submit.prevent="paidBy('card')">
                <v-text-field
                  autocomplete="off"
                  @focus="amountPaid = ''"
                  label="Amount..."
                  v-model="amountPaid"
                  append-icon="far fa-credit-card"
                  single-line
                ></v-text-field>
                <v-btn type="submit" block large color="success">Submit</v-btn>
                <v-btn @click="paymentMethod = null" block large color="warning">Back</v-btn>
              </v-form>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store";
import { time } from "@/firebase";

export default {
  data() {
    return {
      itemList: [],
      paid: [],
      amountPaid: "",
      customerName: "",
      showMenuIndex: null,
      showOptionType: false,
      showOptionIndex: null,
      paymentMethod: null,
      drinkOptions: [
        { name: "Sugar+0.5", price: 0 },
        { name: "Sugar+1", price: 0 },
        { name: "+Hot", price: 0 },
        { name: "+Espresso", price: 1 }
      ],
      foodOptions: [
        { name: "Bacon", price: 2 },
        { name: "Chicken", price: 2 },
        { name: "Beef", price: 2 },
        { name: "Mayo", price: 0 }
      ]
    };
  },
  methods: {
    paymentMethodToggle(paymentMethod) {
      this.amountPaid = this.amountDue;
      this.paymentMethod = paymentMethod;
    },
    showOption(index, type) {
      this.showOptionIndex = index;
      this.showOptionType = type;
    },
    showMenuToggle(index) {
      if (index == this.showMenuIndex) {
        this.showMenuIndex = null;
      } else {
        this.showMenuIndex = index;
      }
    },
    removeOptionFromInvoice(parent_index, index) {
      let currentPrice = parseFloat(this.itemList[parent_index].price);
      this.itemList[parent_index].price = parseFloat(
        currentPrice - this.itemList[parent_index].option[index].price
      );
      this.itemList[parent_index].option.splice(index, 1);
      this.paymentMethod = null;
    },
    addOptionToInvoice(option) {
      this.itemList[this.showOptionIndex].option.push(option);
      let currentPrice = parseFloat(this.itemList[this.showOptionIndex].price);
      this.itemList[this.showOptionIndex].price = parseFloat(
        currentPrice + option.price
      );
      this.paymentMethod = null;
    },
    removeItemFromInvoice(parent_index) {
      this.itemList.splice(parent_index, 1);
      this.showOptionIndex = null;
      this.paymentMethod = null;
    },
    paidBy(paymentType) {
      if (paymentType == "card") {
        if (this.amountPaid > this.amountDue) {
          this.$toasted.error("Card amount must be lower than amount due.", {
            theme: "toasted-primary",
            fullWidth: true,
            position: "bottom-right",
            duration: 5000
          });
        } else {
          this.paid.push({ paymentType, amount: this.amountPaid });
        }
      } else {
        if (this.amountPaid > this.amountDue) {
          this.$toasted.success(
            "Change: $" +
              parseFloat(this.amountPaid - this.amountDue).toFixed(2),
            {
              theme: "toasted-primary",
              fullWidth: true,
              position: "bottom-right",
              duration: 5000
            }
          );
          this.paid.push({ paymentType, amount: this.amountDue });
        } else {
          this.paid.push({ paymentType, amount: this.amountPaid });
        }
      }

      this.paymentMethod = null;
      if (this.amountDue == 0) {
        db.ref("invoice").push({
          itemList: this.itemList,
          paid: this.paid,
          customerName: this.customerName,
          createdAt: time
        });

        this.$toasted.success("Payment is succesfull", {
          theme: "toasted-primary",
          fullWidth: true,
          position: "bottom-right",
          duration: 5000
        });
        this.itemList = [];
        this.customerName = "";
        this.paid = [];
        this.paymentMethod = null;
        this.showOptionIndex = null;
      }
    },
    addItemToInvoice(item, index) {
      if (item.type == "drink") {
        item = {
          name: item.name,
          type: item.type,
          size: item[index].size,
          price: item[index].price,
          served: false,
          option: []
        };
      } else {
        item = {
          name: item.name,
          type: item.type,
          price: item.price,
          served: false,
          option: []
        };
      }
      this.showMenuIndex = null;
      this.showOptionIndex = this.itemList.length;
      this.showOptionType = item.type;
      this.paymentMethod = null;
      this.itemList.push(item);
      this.itemList[this.itemList.length - 1].active = true;
    }
  },
  computed: {
    amountDue() {
      let amountDue = 0;
      for (let i = 0; i < this.paid.length; i++) {
        amountDue += parseFloat(this.paid[i].amount);
      }
      amountDue = parseFloat(this.total - amountDue);
      return Math.round(amountDue * 100) / 100;
    },
    total: function() {
      let total = 0;
      for (let i = 0; i < this.itemList.length; i++) {
        total += parseFloat(this.itemList[i].price);
      }
      return Math.round(total * 100) / 100;
    },
    drinks() {
      return store.state.products.filter(product => product.type == "drink");
    },
    foods() {
      return store.state.products.filter(product => product.type == "food");
    }
  },
  components: {}
};
</script>
<style scoped>
.btn-large {
  height: 500px;
}
</style>
