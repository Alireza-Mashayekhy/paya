<template>
  <div>
    <div class="headline-container mb-5">
      <div class="headline">کامنت ها</div>
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
      <nuxt-link :to="`/admin/orders/${$route.params.customerId}/`" class="head"
        >لیست سفارشات</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}`"
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
              ({{ مشتری }}) ({{ comment.date.split('T')[0] }})
              <div style="float: left">
                <button
                  class="btn btn-sm btn-success"
                  @click="beforReadyToEdit(comment.id)"
                >
                  <span class="d-block d-sm-inline-block text-center">
                    <i class="fa fa-pen"></i>
                  </span>
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="beforReadyToDelete(comment.id)"
                >
                  <span class="d-block d-sm-inline-block text-center">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
              </div>
            </div>
            <div class="card-body">{{ comment.text }}</div>
            <div class="card-body">
              <nuxt-link
                :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/${comment.id}`"
                >فایل ها</nuxt-link
              >
            </div>
          </div>
          <div class="ms-1">
            <img src="/profile2.png" class="profile-image" alt="profile" />
          </div>
        </div>

        <div v-else class="card my-message mb-2">
          <div class="card-header" v-if="comment.role == 'expert'">
            {{ comment.id }}
            ( کارشناس ) ({{ comment.date.split('T')[0] }})
            <div style="float: left">
              <div style="float: left">
                <button
                  class="btn btn-sm btn-success"
                  @click="beforReadyToEdit(comment.id)"
                >
                  <span class="d-block d-sm-inline-block text-center">
                    <i class="fa fa-pen"></i>
                  </span>
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="beforReadyToDelete(comment.id)"
                >
                  <span class="d-block d-sm-inline-block text-center">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-header" v-else>
            {{ comment.id }}
            ( مدیر ) ({{ comment.date.split('T')[0] }})
            <div style="float: left">
              <button
                class="btn btn-sm btn-success"
                @click="beforReadyToEdit(comment.id)"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-pen"></i>
                </span>
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="beforReadyToDelete(comment.id)"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="card-body">{{ comment.text }}</div>
          <div class="card-body">
            <nuxt-link
              :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/${comment.id}`"
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
    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">کامنت شما با موفقیت ثبت شد.</div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal" v-show="showModal2">
      <div class="dangerModal">
        <div class="dangerNote" style="background: white; color: black">
          <div class="border-bottom pb-2">
            ایا از پاک کردن این کامنت مطمئنید؟
          </div>
          <div class="mt-2" style="float: left">
            <button class="btn btn-sm btn-dark" @click="showModal2 = false">
              انصراف
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteOrder">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal2 -->
    <div class="modal" v-show="showModal3">
      <div class="succussNote">
        <div class="succussBody">کامنت شما با موفقیت حذف شد.</div>
      </div>
    </div>
    <!-- modal3 -->
    <div class="modal" v-show="showModal4">
      <div class="dangerModal">
        <div class="dangerNote" style="background: white; color: black">
          <div class="border-bottom pb-2">
            <lable for="number">متن کامنت</lable>
            <input class="w-100" id="number" v-model="formData.text" required />
            <p class="text-danger" v-show="showError2">
              پر کردن این فیلد اجباری است.
            </p>
          </div>
          <div class="mt-2" style="float: left">
            <button class="btn btn-sm btn-dark" @click="showModal4 = false">
              انصراف
            </button>
            <button class="btn btn-sm btn-success" @click="editOrder">
              ویرایش
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal4 -->
    <div class="modal" v-show="showModal5">
      <div class="succussNote">
        <div class="succussBody">کامنت شما با موفقیت ویرایش شد.</div>
      </div>
    </div>
    {{ idToDelete }}
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'admin',

  async asyncData({ $axios, params }) {
    const comments = await $axios.$get(
      `/managers/api/comments/list/${params.rowId}/`
    )
    console.log('comments ', comments)
    const row = await $axios.$get(`/managers/api/rows/detail/${params.rowId}/`)
    return {
      comments,
      row: row[0],
      rows: row,
    }
  },

  data() {
    return {
      text: '',
      showModal: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      showModal5: false,
      idToDelete: null,
      showError2: false,
      formData: {
        text: '',
      },
    }
  },

  methods: {
    beforReadyToDelete(userId) {
      const comments = this.comments.filter((o) => o.id === userId)
      this.showModal2 = true
      this.idToDelete = comments[0].id
    },
    beforReadyToEdit(userId) {
      const comments = this.comments.filter((o) => o.id === userId)
      this.showModal4 = true
      this.idToDelete = comments[0].id
    },
    async onSubmit() {
      try {
        const res = await this.$axios.$post(`managers/api/comments/create/`, {
          text: this.text,
          row: this.$route.params.rowId,
          role: 'expert',
        })
        console.log(res)
        // const resp = await this.$axios.$post(
        //   '/customers/api/notifications/create/',
        //   {
        //     customer: this.$route.params.customerId,
        //     status: 'unread',
        //     descriptions: `کامنتی برای ردیف شما ثبت شد`,
        //   }
        // )
        // console.log(resp)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push(
            `/admin/orders/${this.$route.params.customerId}/${this.$route.params.orderId}`
          )
        }, '3000')
      } catch (ex) {
        console.log(ex)
        // if (ex.response.status === 400) {
        //   this.$refs.form.setErrors(ex.response.data)
        // }
      }
    },
    async deleteOrder() {
      try {
        const res = await this.$axios.$delete(
          `managers/api/comments/delete/${this.idToDelete}/`
        )
        console.log(res)
        this.showModal2 = false
        this.showModal3 = true
        setTimeout(() => {
          this.showModal3 = false
          location.reload()
        }, '3000')
      } catch (ex) {
        console.log(ex)
      }
    },
    async editOrder() {
      try {
        const res = await this.$axios.$put(
          `managers/api/comments/update/${this.idToDelete}/`,
          {
            text: this.formData.text,
            row: this.$route.params.rowId,
          }
        )
        console.log(res)
        this.showModal4 = false
        this.showModal5 = true
        setTimeout(() => {
          this.showModal5 = false
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
