<template>
  <div>
    <div class="headline-container">
      <div class="headline">فایل ها</div>
      <nuxt-link
        :to="`/user/orders/${$route.params.orderId}/`"
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
          <a :href="file.file" target="_blank"> فایل {{ index + 1 }} </a>
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
      `/customers/api/rowsfiles/list/${params.rowId}/`
    )

    const row = await $axios.$get(`/customers/api/rows/detail/${params.rowId}/`)

    return {
      files,
      row: row[0],
    }
  },
}
</script>

<style scoped>
.message-box {
  min-height: 170px;
  resize: none;
}
</style>
