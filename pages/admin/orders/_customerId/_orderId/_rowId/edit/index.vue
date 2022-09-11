<template>
  <div>
    <div class="headline-container">
      <div class="headline">ویرایش ردیف</div>
      <nuxt-link
        :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- head -->
    <div class="head">
      <nuxt-link to="/admin/orders" class="head">لیست مشتریان</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span v-for="u in users" :key="u.id">
        <nuxt-link
          :to="`/admin/orders/${$route.params.customerId}/`"
          class="head"
          v-if="u.id == $route.params.customerId"
          >سفارشات({{ u.first_name }})</nuxt-link
        >
      </span>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="head"
        >ردیف های({{ $route.params.orderId }})</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>ویرایش ردیف {{ $route.params.rowId }}</span>
    </div>

    <div v-for="data in formData" :key="data.id">
      <div v-if="data.id == $route.params.rowId">
        <!-- title -->
        <ValidationProvider v-slot="{ errors }" vid="title">
          <div class="mb-3">
            <label for="short-description-input" class="form-label"
              >شرح خدمات</label
            >
            <input
              id="short-description-input"
              v-model="data.title"
              type="text"
              class="form-control form-control-sm"
              :placeholder="data.title"
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
              v-model="data.descriptions"
              class="message-box form-control"
              :placeholder="data.descriptions"
            ></textarea>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" vid="status">
          <div class="mb-3">
            <label for="description-input" class="form-label">وضعیت</label>
            <input
              id="description-input"
              v-model="data.status"
              class="form-control form-control-sm"
              :placeholder="data.status"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first" @click="check(data.id)">
          <span class="d-block d-sm-inline-block text-center">
            <i>ویرایش</i>
          </span>
        </button>
      </div>
    </div>

    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">ردیف با موفقیت ویرایش شد.</div>
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
      myData: null,
    }
  },
  async asyncData({ $axios, params }) {
    const row = await $axios.$get(`/managers/api/rows/detail/${params.rowId}/`)
    const users = await $axios.$get(
      `managers/api/users/detail/${params.customerId}/`
    )
    return {
      formData: row,
      users,
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$put(
          `managers/api/rows/update/${this.$route.params.rowId}/`,
          this.myData
        )
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `ردیف شما ویرایش شد.`,
          }
        )
        console.log(resp)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push(
            `/admin/orders/${this.$route.params.customerId}/${this.$route.params.orderId}`
          )
        }, '3000')
        console.log(res)
      } catch (ex) {
        console.log(ex)
        if (ex.response.status === 400) {
          this.$refs.form.setErrors(ex.response.data)
        }
      }
    },

    check(id) {
      const row = this.formData.filter((o) => o.id === id)
      this.myData = row[0]
      this.onSubmit()
    },
  },
}
</script>

<style scoped>
.message-box {
  min-height: 170px;
  resize: none;
}
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
