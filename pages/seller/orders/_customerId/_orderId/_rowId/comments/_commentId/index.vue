<template>
  <div>
    <div class="headline-container">
      <div class="headline">فایل های کامنت</div>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments`"
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
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="head"
        >لیست ردیف ها</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/`"
        class="head"
        >کامنت ردیف {{ $route.params.rowId }}</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>فایل شماره {{ $route.params.commentId }}</span>
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
              <span class="d-block d-sm-inline-block text-center">
                            <i class="fa fa-trash"></i>
                        </span>
            </button> -->
          </div>
        </li>
      </ul>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <input ref="fileInput" type="file" />
      </div>

      <button class="btn btn-sm btn-first">
        <span class="d-block d-sm-inline-block text-center"> ارسال فایل </span>
      </button>
    </form>
    <div class="myModal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">فایل با موفقیت ثبت شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageConnectUserSeller',
  layout: 'seller',
  async asyncData({ $axios, params }) {
    const files = await $axios.$get(
      `/experts/api/commentsfiles/list/${params.commentId}/`
    )
    // const row = await $axios.$get(`/experts/api/rows/detail/${params.rowId}/`)
    return {
      files,
      // row: row[0],
    }
  },
  data() {
    return {
      showModal: false,
    }
  },

  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      bodyFormData.append('file', this.$refs.fileInput.files[0])
      bodyFormData.append('comment', +this.$route.params.commentId)

      try {
        const res = await this.$axios.post(
          `/experts/api/commentsfiles/create/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push(
            `/seller/orders/${this.$route.params.customerId}/${this.$route.params.orderId}/${this.$route.params.rowId}/comments`
          )
        }, '3000')
      } catch (ex) {
        console.log(ex)
      }
    },

    async onDelete(id) {
      try {
        const res = await this.$axios.delete(
          `/experts/api/commentsfiles/delete/${this.$route.params.commentId}/`
        )

        console.log(res)
        this.$router.push(
          `/seller/orders/${this.$route.params.customerId}/${this.$route.params.orderId}/${this.$route.params.rowId}/comments`
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
.myModal {
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
