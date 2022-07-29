<template>
  <div>
    <div class="headline-container">
      <div class="headline">فایل ها</div>
      <nuxt-link
        :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <div class="head">{{ row.title }}</div>

    <div>
      <ul class="list-group mb-3">
        <li
          v-for="(file, index) in files"
          :key="file.id"
          class="list-group-item"
        >
          <div class="d-flex justify-content-between">
            <a :href="file.file" target="_blank"> فایل {{ index + 1 }} </a>
            <button class="btn btn-sm btn-danger" @click="onDelete(file.id)">
              <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-trash"></i>
              </span>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <input ref="fileInput" type="file" />
      </div>

      <button class="btn btn-sm btn-first">
        <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-plus"></i>
          </span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const files = await $axios.$get(
      `managers/api/rowsfiles/list/${params.rowId}/`
    )
    const row = await $axios.$get(`/managers/api/rows/detail/${params.rowId}/`)

    return {
      files,
      row: row[0],
    }
  },
  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      bodyFormData.append('file', this.$refs.fileInput.files[0])
      bodyFormData.append('row', +this.$route.params.rowId)

      try {
        const res = await this.$axios.post(
          `managers/api/rowsfiles/create/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res)
        this.$router.push(
          `/admin/orders/${this.$route.params.customerId}/${this.$route.params.orderId}`
        )
      } catch (ex) {
        console.log(ex)
      }
    },

    async onDelete(id) {
      try {
        const res = await this.$axios.delete(
          `managers/api/rowsfiles/delete/${id}/`
        )

        console.log(res)
        this.$router.push(
          `/admin/orders/${this.$route.params.customerId}/${this.$route.params.orderId}`
        )
      } catch (ex) {
        console.log(ex)
      }
    },
  },
}
</script>

<style scoped>
.message-box {
  min-height: 170px;
  resize: none;
}
</style>
