<template>
  <div>
    <div class="headline-container">
      <div class="headline">تیکت جدید</div>
      <nuxt-link to="/user/ticket" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="pass-input" class="form-label">عنوان</label>
        <input
          id="pass-input"
          v-model="title"
          type="text"
          class="form-control form-control-sm"
        />
      </div>

      <button class="btn btn-sm btn-first">ارسال پیام</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SellerPageConnectInfo',
  layout: 'user',
  data() {
    return {
      title: '',
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$post(`customers/api/ticket/create/`, {
          subject: this.title,
        })
        console.log(res)
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
