<template>
  <div>
    <div class="headline">لیست کاربران</div>
    <div class="d-flex mb-2">
      <select
        v-model="filter.role"
        class="form-select form-select-sm filter-input me-1"
      >
        <option selected value="">نوع کاربر</option>
        <option value="customer">مشتری</option>
        <option value="expert">کارشناس</option>
        <option value="manager">مدیر</option>
      </select>

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
            <th scope="col">نام و نام خانوادگی</th>
            <th scope="col">کشور</th>
            <th scope="col">دسترسی</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="pages-fade">
          <tr v-for="(user, index) in lastFilteresUsers" :key="user.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.first_name + ' ' + user.last_name }}</td>
            <th scope="col">{{ user.country }}</th>
            <td>{{ getRole(user.role) }}</td>
            <td class="d-flex justify-content-center gap-2">
              <nuxt-link
                :to="`/admin/users/profile/${index + 1}`"
                class="btn btn-sm btn-info"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa">&#128100;</i>
                </span>
              </nuxt-link>
              <nuxt-link
                :to="`/admin/users/${index + 1}`"
                class="btn btn-sm btn-first"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-pencil"></i>
                </span>
              </nuxt-link>
              <button
                class="btn btn-sm btn-danger"
                @click="readyToDelete(user.id)"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
    <WarnModal
      v-if="showModal"
      @closeModal="showModal = false"
      @filterUser="filterUser"
      :userId="idToDelete"
    />
  </div>
</template>

<script>
import WarnModal from '~/components/public/WarnModal.vue'
export default {
  name: 'AdminPageListUser',
  layout: 'admin',
  async asyncData({ $axios }) {
    const users = await $axios.$get('managers/api/users/list/')
    console.log(users)
    return {
      users,
    }
  },
  data() {
    return {
      showModal: false,
      showModal2: false,
      countryFilter: '',
      userNamesFilter: '',
      idToDelete: null,
      filter: {
        country: '',
        role: '',
      },
      searching: null,
    }
  },
  computed: {
    filteredUserNames() {
      if (!this.userNamesFilter && this.countryFilter) return []
      let filteredName = this.userNamesFilter
      if (filteredName.length > 3) filteredName = filteredName.slice(0, 3)
      return this.users.filter(
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
      return this.users.filter((user) => user.country.includes(filteredCountry))
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
  watch: {
    async 'filter.role'(newValue) {
      if (newValue) {
        const users = await this.$axios.$get(
          `/managers/api/users/filter/role/${newValue}/`
        )
        this.users = users
      } else {
        const users = await this.$axios.$get('managers/api/users/list/')
        this.users = users
      }
    },
  },
  methods: {
    getRole(role) {
      switch (role) {
        case 'customer':
          return 'مشتری'
        case 'manager':
          return 'مدیر'
        case 'expert':
          return 'کارشناس'
      }
    },
    filterUser() {
      this.users = this.users.filter((u) => u.id !== this.idToDelete)
    },
    readyToDelete(userId) {
      this.showModal = true
      this.idToDelete = userId
    },
  },
  components: { WarnModal },
}
</script>

<style scoped>
.filter-input {
  max-width: 150px;
}
</style>
