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
            <i class="fa fa-plug"></i>
          </span>
        </button>
      </form>
    </ValidationObserver>
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
