<template>
  <div>
    <div class="headline-container">
      <div class="headline">فایل ها</div>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- head -->
    <div class="head">
      <nuxt-link to="/seller/orders" class="head">لیست مشتریان</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/`"
        class="head"
        >لیست سفارشات</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.rowId}`"
        class="head"
        >لیست ردیف ها</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>فایل ردیف {{ $route.params.rowId }}</span>
    </div>

    <div>
      <ul class="list-group mb-3">
        <li
          v-for="(file, index) in files"
          :key="file.id"
          class="list-group-item"
        >
          <div class="d-flex justify-content-between">
            <a :href="file.file" target="_blank"> فایل {{ index + 1 }} </a>
            <!-- <button class="btn btn-sm btn-danger" @click="onDelete(file.id)">
              حذف
            </button> -->
          </div>
        </li>
      </ul>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <input ref="fileInput" type="file" multiple />
      </div>

      <button class="btn btn-sm btn-first">
        <span class="d-block d-sm-inline-block text-center"> ارسال فایل </span>
      </button>
    </form>
    <div class="mymodal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">فایل شما با موفقیت ثبت شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'seller',
  data() {
    return {
      showModal: false,
    }
  },
  async asyncData({ $axios, params }) {
    const files = await $axios.$get(
      `experts/api/rowsfiles/list/${params.rowId}/`
    )
    const row = await $axios.$get(`/experts/api/rows/detail/${params.rowId}/`)

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
          `experts/api/rowsfiles/create/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `فایل جدیدی برای ردیف شما ثبت شد`,
          }
        )
        console.log(resp)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push(
            `/seller/orders/${this.$route.params.customerId}/${this.$route.params.orderId}`
          )
        }, '3000')
        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
    },

    async onDelete(id) {
      try {
        const res = await this.$axios.delete(
          `experts/api/rowsfiles/delete/${id}/`
        )

        console.log(res)
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `فایلی از ردیف شما حذف شد`,
          }
        )
        console.log(resp)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          location.reload()
        }, '3000')
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
.mymodal {
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
