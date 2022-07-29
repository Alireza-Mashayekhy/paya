<template>
  <div>
    <div class="headline-container">
      <div class="headline">ایجاد ردیف جدید</div>
      <nuxt-link
        :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <ValidationObserver ref="form">
      <form action="#" @submit.prevent="onSubmit">
        <!-- title -->
        <ValidationProvider v-slot="{ errors }" vid="title">
          <div class="mb-3">
            <label for="short-description-input" class="form-label"
              >شرح خدمات</label
            >
            <input
              id="short-description-input"
              v-model="formData.title"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- descriptions -->
        <ValidationProvider v-slot="{ errors }" vid="descriptions">
          <div class="mb-3">
            <label for="description-input" class="form-label"
              >توضیحات تکمیلی</label
            >
            <textarea
              id="description-input"
              v-model="formData.descriptions"
              class="message-box form-control"
            ></textarea>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" vid="date">
          <div class="mb-3">
            <label for="data-input" class="form-label"
              >تاریخ میلادی</label
            >
            <input
              id="date-input"
              v-model="formData.date"
              class="form-control"
              type="date"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-plus"></i>
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
  data() {
    return {
      formData: {
        title: '',
        descriptions: '',
        date : null,
        order: +this.$route.params.orderId,
      },
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$post(
          `managers/api/rows/create/`,
          this.formData
        )
        console.log(res)
        alert('ردیف با موفقیت افزوده شد')
        this.$router.push(`/admin/orders/${this.order}`)
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
.message-box {
  min-height: 170px;
  resize: none;
}
</style>
