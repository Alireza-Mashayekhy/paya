<template>
  <div>
    <div class="headline">تنظیمات</div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form action="#" @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <div class="mb-3">
            <label for="pass-input" class="form-label">رمز ورود قبلی</label>
            <input
              id="pass-input"
              v-model="oldPass"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" vid="newPass" rules="required">
          <div class="mb-3">
            <label for="new-pass-input" class="form-label">رمز ورود جدید</label>
            <input
              id="new-pass-input"
              v-model="newPass"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="confirmed:newPass|required"
        >
          <div class="mb-3">
            <label for="new-pass-agin-input" class="form-label"
              >تکرار رمز ورود
            </label>
            <input
              id="new-pass-agin-input"
              v-model="newPassAgain"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center"> ثبت </span>
        </button>
      </form>
    </ValidationObserver>

    <hr />
    <form action="#">
      <div class="mb-3">
        <div class="form-check form-switch">
          <input
            id="flexSwitchCheckDefault"
            v-model="notification"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            >مایل به دریافت ایمیل اطلاع رسانی وضعیت سفارش هستم .</label
          >
        </div>
      </div>
    </form>
    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">اطلاعات شما با موفقیت به روز شد.</div>
      </div>
    </div>
    <div class="modal" v-show="pass">
      <div class="dangerNote">
        <div class="succussBody">رمز وارد شده اشتباه است.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellerPageConnectInfo',
  layout: 'user',

  async asyncData({ $axios }) {
    try {
      const userInfo = await $axios.$get(`usermodel/api/users/info/`)
      const notification = await $axios.$get(`customers/api/notification/see/`)
      console.log(userInfo)
      return {
        notifications: userInfo[0].notifications,
        userInfo,
        notification,
      }
    } catch (ex) {
      console.log(ex)
    }
  },
  data() {
    return {
      showModal: false,
      oldPass: '',
      newPass: '',
      newPassAgain: '',
      pass: false,
    }
  },
  watch: {
    notification(newValue) {
      this.onChangeNotifiction(newValue)
      console.log(this.notification)
    },
  },

  methods: {
    async onSubmit() {
      if (this.newPassAgain === this.newPass) {
        try {
          const res = await this.$axios.$patch(
            `customers/api/account/update/`,
            {
              password: this.oldPass,
              newـpassword: this.newPass,
              notifications: this.notifications,
            }
          )
          this.showModal = true
          setTimeout(() => {
            this.showModal = false
          }, '3000')
          console.log(res)
        } catch (ex) {
          console.log(ex)
          this.pass = true
          setTimeout(() => {
            this.pass = false
          }, '3000')
        }
      }
    },

    async onChangeNotifiction(newValue) {
      try {
        const notification = newValue
        console.log('not ' + notification)
        const res = await this.$axios.$post(
          `customers/api/notification/change/`,
          {
            notification,
          }
        )

        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
    },
  },
}
</script>
<style scoped>
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
