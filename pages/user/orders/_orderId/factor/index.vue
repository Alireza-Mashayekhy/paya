<template>
  <div>
    <div class="headline-container">
      <div class="headline">فاکتور ها</div>
      <nuxt-link
        :to="`/user/orders/${$route.params.orderId}/`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- <div class="head">{{ order.title }}</div> -->

    <div>
      <ul class="list-group mb-3">
        <li class="list-group-item">
          <div class="d-flex justify-content-between">
            <a :href="files.file" target="_blank"> فاکتور </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'user',
  async asyncData({ $axios, params }) {
    const files = await $axios.$get(
      `/managers/api/orders/file/detail/${params.orderId}/`
    )
    const order = await $axios.$get(
      `/managers/api/rows/detail/${params.orderId}/`
    )
    return {
      files,
      order: order[0],
    }
  },
  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      bodyFormData.append('file', this.$refs.fileInput.files[0])
      bodyFormData.append('order', +this.$route.params.orderId)

      try {
        const res = await this.$axios.post(
          `/managers/api/orders/file/create/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res)
        this.$router.push(`/admin/orders/${this.$route.params.customerId}`)
      } catch (ex) {
        console.log(ex)
      }
    },

    async onDelete(id) {
      try {
        const res = await this.$axios.delete(
          `/managers/api/orders/file/delete/${id}/`
        )

        console.log(res)
        this.$router.push(`/admin/orders/${this.$route.params.customerId}/`)
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
