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

    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form action="#" @submit.prevent="handleSubmit(onSubmit)">
        <!-- title -->
        <ValidationProvider v-slot="{ errors }" vid="title" rules="required">
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
        <ValidationProvider
          v-slot="{ errors }"
          vid="descriptions"
          rules="required"
        >
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

        <ValidationProvider v-slot="{ errors }" vid="status" rules="required">
          <div class="mb-3">
            <label for="status-input" class="form-label">وضعیت</label>
            <input
              id="status-input"
              v-model="formData.status"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center">
            <i>ایجاد ردیف</i>
          </span>
        </button>
      </form>
    </ValidationObserver>
    <div class="myModal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">ردیف شما با موفقیت ایجاد شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'admin',
  data() {
    return {
      showModal: false,
      formData: {
        title: '',
        descriptions: '',
        status: '',
        order: this.$route.params.orderId,
      },
    }
  },
  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      for (const property in this.formData) {
        bodyFormData.append(property, this.formData[property])
      }
      console.log(bodyFormData)
      try {
        const res = await this.$axios.post(
          `managers/api/rows/create/`,
          bodyFormData
        )
        this.showModal = true
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `ردیف جدیدی برای سفارش شما ایجاد شد`,
          }
        )
        console.log(resp)
        setTimeout(() => {
          this.showModal = false
          this.$router.push(
            `/admin/orders/${this.$route.params.customerId}/${this.$route.params.orderId}/`
          )
        }, '3000')
        console.log(res)
      } catch (ex) {
        console.log(ex)
        // if (ex.response.status === 400) {
        //   this.$refs.form.setErrors(ex.response.data)
        // }
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
.myModal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 51;
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
