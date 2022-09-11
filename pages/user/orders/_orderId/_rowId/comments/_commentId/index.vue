<template>
  <div>
    <div class="headline-container">
      <div class="headline">فایل های کامنت</div>
      <nuxt-link
        :to="`/user/orders/${$route.params.orderId}/${$route.params.rowId}/comments`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- head -->
    <div class="head">
      <nuxt-link :to="`/user/orders/`" class="head">لیست سفارشات</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link :to="`/user/orders/${$route.params.orderId}`" class="head"
        >لیست ردیف ها</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/user/orders/${$route.params.orderId}/${$route.params.rowId}/comments`"
        class="head"
        >کامنت ردیف {{ $route.params.rowId }}</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>فایل کامنت {{ $route.params.commentId }}</span>
    </div>

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

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <input ref="fileInput" type="file" multiple />
      </div>

      <button class="btn btn-sm btn-first">
        <span class="d-block d-sm-inline-block text-center"> ارسال فایل </span>
      </button>
    </form>
    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">فایل شما با موفقیت ثبت شد.</div>
      </div>
    </div>
    <div class="modal" v-show="pass">
      <div class="dangerNote">
        <div class="succussBody">لفطا فایلی را آپلود کنید</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'user',
  async asyncData({ $axios, params }) {
    const files = await $axios.$get(
      `/customers/api/commentsfiles/list/${params.commentId}/`
    )
    const row = await $axios.$get(`/customers/api/rows/detail/${params.rowId}/`)
    return {
      files,
      row: row[0],
      showModal: false,
      pass: false,
    }
  },

  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      bodyFormData.append('file', this.$refs.fileInput.files[0])
      bodyFormData.append('comment', +this.$route.params.commentId)

      try {
        const res = await this.$axios.post(
          `/customers/api/commentsfiles/create/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push(
            `/user/orders/${this.$route.params.orderId}/${this.$route.params.rowId}/comments`
          )
        }, '3000')
        console.log(res)
      } catch (ex) {
        console.log(ex)
        this.pass = true
        setTimeout(() => {
          this.pass = false
        }, '3000')
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
.dangerNote {
  background-color: red;
  height: auto;
  width: 500px;
  margin: auto;
  padding: 30px;
  border-radius: 20px;
  color: white;
}
</style>
