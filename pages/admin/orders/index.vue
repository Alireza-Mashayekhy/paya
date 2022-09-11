<template>
  <div>
    <div class="headline">لیست مشتریان</div>
    <div class="d-flex mb-2">
      <input
        v-model="countryFilter"
        type="text"
        class="form-control form-control-sm filter-input me-1"
        placeholder="کشور"
      />

      <input
        type="search"
        v-model="userNamesFilter"
        placeholder="جستجو در کاربران"
        class="form-control form-control-sm filter-input"
      />
    </div>
    <div class="table-responsive">
      <table class="table table-sm table-bordered text-center align-middle">
        <thead class="text-nowrap">
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام مشتری</th>
            <th scope="col">کشور</th>
            <th scope="col">شرکت</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in lastFilteresUsers" :key="user.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.first_name + ' ' + user.last_name }}</td>
            <td>{{ user.country }}</td>
            <td>{{ user.company }}</td>
            <td>
              <nuxt-link
                :to="`/admin/orders/${user.id}`"
                class="btn btn-sm btn-first"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-suitcase"></i>
                </span>
              </nuxt-link>
              <!-- <button
                class="btn btn-sm btn-danger"
                @click="beforReadyToDelete(user.id)"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-trash"></i>
                </span>
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <WarnModalOrders
      v-if="showModal2"
      @closeModal="showModal2 = false"
      :userId="idToDelete"
    />
  </div>
</template>

<script>
export default {
  name: 'AdminPageListUser',
  layout: 'admin',

  data() {
    return {
      showModal: false,
      showModal2: false,
      idToDelete: null,
      userNamesFilter: '',
      countryFilter: '',
      deletOrders: '',
    }
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get('managers/api/users/list/')
    const orders = await $axios.$get('managers/api/orders/list/')
    console.log(users)
    return {
      users,
      orders,
    }
  },
  computed: {
    customerUsers() {
      return this.users.filter((user) => user.role === 'customer')
    },

    filteredUserNames() {
      if (!this.userNamesFilter && this.countryFilter) return []
      let filteredName = this.userNamesFilter
      if (filteredName.length > 3) filteredName = filteredName.slice(0, 3)
      return this.customerUsers.filter(
        (user) =>
          user.first_name.includes(filteredName) ||
          user.last_name.includes(filteredName)
      )
    },
    filteredCountry() {
      if (!this.countryFilter && this.userNamesFilter) return []
      let filteredCountry = this.countryFilter
      if (filteredCountry.length > 3)
        filteredCountry = filteredCountry.slice(0, 3)
      return this.customerUsers.filter((user) =>
        user.country.includes(filteredCountry)
      )
    },

    lastFilteresUsers() {
      const lastUsers = []
      for (const user of this.filteredUserNames) {
        lastUsers.push(user)
      }
      for (const user of this.filteredCountry) {
        if (!lastUsers.includes(user)) lastUsers.push(user)
      }
      return lastUsers
    },
  },
  methods: {
    beforReadyToDelete(userId) {
      const order = this.orders.filter((o) => o.customer === userId)
      const order2 = order.filter((o) => o.closed === false)
      this.showModal2 = true
      this.idToDelete = order2
    },
  },
}
</script>
