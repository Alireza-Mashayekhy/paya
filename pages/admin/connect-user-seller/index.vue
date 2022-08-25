<template>
  <div>
    <div class="headline">اتصال مشتری به کارشناس</div>

    <ValidationObserver ref="form">
      <form action="#" @submit.prevent="onSubmit">
        <!-- customer -->
        <ValidationProvider v-slot="{ errors }" vid="customer">
          <div class="mb-3">
            <label for="role-input" class="form-label">مشتری</label>
            <select
              id="role-input"
              v-model="customer"
              class="form-select form-select-sm"
            >
              <option selected>...</option>
              <option
                v-for="user in customerUsers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.first_name + ' ' + user.last_name }}
              </option>
            </select>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- expert -->
        <ValidationProvider v-slot="{ errors }" vid="expert">
          <div class="mb-3">
            <label for="role-input" class="form-label">کارشناس</label>
            <select
              id="role-input"
              v-model="expert"
              class="form-select form-select-sm"
            >
              <option selected>...</option>
              <option
                v-for="user in expertUsers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.first_name + ' ' + user.last_name }}
              </option>
            </select>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center">
            <i>اتصال</i>
          </span>
        </button>
      </form>
    </ValidationObserver>
    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">مشتری شما با موفقیت به کارشناس متصل شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'admin',
  async asyncData({ $axios }) {
    const users = await $axios.$get('managers/api/users/list/')
    return {
      users,
    }
  },

  data() {
    return {
      customer: null,
      expert: null,
      showModal: false,
    }
  },

  computed: {
    customerUsers() {
      return this.users.filter((user) => {
        return user.role === 'customer'
      })
    },

    expertUsers() {
      return this.users.filter((user) => {
        return user.role === 'expert'
      })
    },
  },

  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$patch(
          `managers/api/users/update/${this.customer}/`,
          {
            expert: this.expert,
          }
        )
        console.log(res)
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.expert,
            status: 'unread',
            descriptions: `شما به مشتری شماره ${this.customer} وصل شدید`,
          }
        )
        console.log(resp)
        const resp2 = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.customer,
            status: 'unread',
            descriptions: `شما به کارشناس شماره ${this.expert} وصل شدید`,
          }
        )
        console.log(resp2)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
        }, '3000')
      } catch (ex) {
        console.log(ex)
        if (ex.response.status === 400) {
          this.$refs.form.setErrors(ex.response.data)
        }
      }
    },
  },
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(42, 48, 56, 0.6);
}
.succussNote {
  background-color: green;
  height: auto;
  width: 500px;
  margin: auto;
  padding: 30px;
  border-radius: 20px;
  color: white;
}

.succesBody {
  font-size: 17px;
  padding: 20px 0px;
  border-bottom: 1px solid #acacac;
}
</style>
