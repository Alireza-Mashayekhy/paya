<template>
  <div class="container-login">
    <div class="login-box">
      <header class="mb-4 fs-3 text-center">
        <div class="align-center">فرم ورود</div>
      </header>
      <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">
          <!-- username -->
          <ValidationProvider v-slot="{ errors }" vid="username">
            <div class="mb-3">
              <label for="email-input" class="form-label">ایمیل</label>
              <input
                id="email-input"
                v-model="formData.username"
                type="text"
                class="form-control form-control-sm d-ltr"
              />
              <span class="text-xs text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <!-- password -->
          <ValidationProvider v-slot="{ errors }" vid="password">
            <div class="mb-3">
              <label for="pass-input" class="form-label">رمز ورود</label>
              <input
                id="pass-input"
                v-model="formData.password"
                type="password"
                class="form-control form-control-sm d-ltr"
              />
              <span class="text-xs text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="text-center mt-4">
            <button class="btn btn-sm btn-first mybtn">ورود</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div class="modal" v-show="showModal">
      <div class="loginError">
        <div class="errorHead">اررور</div>
        <div class="errorBody">ایمیل یا رمز عبور اشتباه است.</div>
        <div class="errorFoot">
          <button class="btn btn-danger" @click="closeModal">بستن</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      showModal: false,
    }
  },
  methods: {
    async onSubmit() {
      // try {
      //   const res = await this.$axios.$post(`api-token-auth/`, this.formData)
      //   console.log(res)
      // } catch (ex) {
      //   console.log(ex)
      //   if (ex.response.status === 400) {
      //     this.$refs.form.setErrors(ex.response.data)
      //   }
      // }
      // login
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.formData.username.toLowerCase(),
            password: this.formData.password,
          },
        })
        console.log(response)
        const userRole = this.$auth.user[0].role
        if (userRole === 'customer') {
          this.$router.push('/user')
        } else if (userRole === 'manager') {
          this.$router.push('/admin')
        } else if (userRole === 'expert') {
          this.$router.push('/seller')
        }
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          // this.$refs.form.setErrors(error.response.data)
          this.showModal = true
        }
      }
    },
    closeModal() {
      this.showModal = false
    },
  },
}
</script>

<style scoped>
.container-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(30deg, rgb(41, 243, 15), #338040, black);
  background-size: cover !important;
  background-position: center !important;
}

.login-box {
  position: relative;
  width: 400px;
  margin: 0 10px;
  border-radius: 4px;
  background: white;
  padding: 30px 40px;
  animation-name: 'moveing-fade';
  animation-duration: 1s;
  animation-iteration-count: 1;
}
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
.loginError {
  background-color: white;
  height: auto;
  width: 500px;
  margin: auto;
  padding: 30px;
  border-radius: 20px;
}

.errorHead {
  border-bottom: 1px solid #acacac;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
.errorBody {
  font-size: 17px;
  padding: 20px 0px;
  border-bottom: 1px solid #acacac;
}
.errorFoot {
  direction: ltr;
  padding-top: 20px;
}
.form-label {
  font-size: 15px;
}
.form-control {
  border: 1px solid black;
}
.mybtn {
  width: 30%;
  font-size: 15px !important;
  font-weight: bold;
}
</style>
