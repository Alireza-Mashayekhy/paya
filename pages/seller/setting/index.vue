<template>
  <div>
    <div class="headline">تنظیمات</div>
    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="pass-input" class="form-label">رمز ورود قبلی</label>
        <input
          id="pass-input"
          v-model="oldPass"
          type="text"
          class="form-control form-control-sm"
        />
      </div>

      <div class="mb-3">
        <label for="new-pass-input" class="form-label">رمز ورود جدید</label>
        <input
          id="new-pass-input"
          v-model="newPass"
          type="text"
          class="form-control form-control-sm"
        />
      </div>

      <div class="mb-3">
        <label for="new-pass-agin-input" class="form-label"
          >رمز ورود جدید</label
        >
        <input
          id="new-pass-agin-input"
          v-model="newPassAgain"
          type="text"
          class="form-control form-control-sm"
        />
      </div>

      <hr />
      <form action="#">
      <div class="mb-3">
        <div class="form-check form-switch">
          <input
            id="flexSwitchCheckDefault"
            v-model="notifications"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            >مایل به دریافت ایمیل اطلاع رسانی وضعیت سفارش هستم .</label
          >
        </div>
      </div>
    </form>

      <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center">
              <i class="fa fa-pencil"></i>
          </span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SellerPageConnectInfo',
  layout: 'seller',
  data() {
    return {
      oldPass: '',
      notifications : '',
      newPass: '',
      newPassAgain: '',
    }
  },

  methods: {
    async onSubmit() {
      if (this.newPassAgain === this.newPass) {
        try {
          const res = await this.$axios.$patch(`experts/api/account/update/`, {
            password: this.oldPass,
            newـpassword: this.newPass,
          })
          console.log(res)
        } catch (ex) {
          console.log(ex)
        }
      }
    },
  },
}
</script>
