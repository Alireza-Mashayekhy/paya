<template>
  <div>
    <div class="headline-container mb-5">
      <div class="headline">کامنت ها</div>
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
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="head"
        >لیست ردیف ها</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>کامنت ردیف {{ $route.params.rowId }}</span>
    </div>

    <div class="mb-5">
      <div v-for="comment in comments" :key="comment.id">
        <div class="d-flex mb-2" v-if="comment.role == 'customer'">
          <div class="card friend-message">
            <div class="card-header">
              {{ comment.id }}
              ({{ comment.role }}) ({{ comment.date.split('T')[0] }})
            </div>
            <div class="card-body">{{ comment.text }}</div>
            <div class="card-body">
              <nuxt-link
                :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/${comment.id}`"
                >فایل ها</nuxt-link
              >
            </div>
          </div>
        </div>

        <div v-else class="card my-message mb-2">
          <div class="card-header">
            {{ comment.id }}
            ({{ comment.role }}) ({{ comment.date.split('T')[0] }})
          </div>
          <div class="card-body">{{ comment.text }}</div>
          <div class="card-body">
            <nuxt-link
              :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/${comment.id}`"
              >فایل ها</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="message-input" class="form-label">متن کامنت</label>
        <textarea
          id="message-input"
          v-model="text"
          class="message-box form-control"
        ></textarea>
      </div>

      <button class="btn btn-sm btn-first">ارسال کامنت</button>
    </form>
    <div class="mymodal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">کامنت شما با موفقیت ثبت شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'seller',

  async asyncData({ $axios, params }) {
    const comments = await $axios.$get(
      `/experts/api/comments/list/${params.rowId}/`
    )
    console.log(comments)
    const row = await $axios.$get(`/experts/api/rows/detail/${params.rowId}/`)
    return {
      comments,
      row: row[0],
    }
  },

  data() {
    return {
      text: '',
      showModal: false,
    }
  },

  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$post(`experts/api/comments/create/`, {
          text: this.text,
          row: this.$route.params.rowId,
          role: 'expert',
        })
        console.log(res)
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `کامنت جدیدی برای ردیف شما ثبت شد`,
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
        // if (ex.response.status === 400) {
        //   this.$refs.form.setErrors(ex.response.data)
        // }
      }
    },
  },
}
</script>

<style scoped>
.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid var(--bs-gray-500);
}

.friend-message {
  width: 90%;
  margin-right: auto;
}

.my-message {
  width: 90%;
  background-color: var(--bs-gray-300);
  color: var(--bs-gray-900);
}

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
