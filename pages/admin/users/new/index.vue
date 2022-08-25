<template>
  <div>
    <div class="headline">افزودن کاربر</div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form action="#" @submit.prevent="handleSubmit(onSubmit)">
        <!-- first name -->
        <ValidationProvider
          v-slot="{ errors }"
          vid="first_name"
          rules="required"
        >
          <div class="mb-3">
            <label for="name-input" class="form-label"
              >نام کاربر <span class="text-danger">*</span></label
            >
            <input
              id="name-input"
              v-model="formData.first_name"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- last name -->
        <ValidationProvider
          v-slot="{ errors }"
          vid="last_name"
          rules="required"
        >
          <div class="mb-3">
            <label for="lastname-input" class="form-label"
              >نام خانوادگی <span class="text-danger">*</span></label
            >
            <input
              id="lastname-input"
              v-model="formData.last_name"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- email -->
        <ValidationProvider
          v-slot="{ errors }"
          vid="email"
          rules="required|email"
        >
          <div class="mb-3">
            <label for="email-input" class="form-label"
              >ایمیل <span class="text-danger">*</span></label
            >
            <input
              id="email-input"
              v-model="formData.email"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
            <span class="text-xs text-danger" v-show="alert"
              >این ایمیل قبلا وارد شده است.</span
            >
          </div>
        </ValidationProvider>

        <!-- country -->
        <ValidationProvider v-slot="{ errors }" vid="country">
          <div class="mb-3">
            <label for="country-input" class="form-label"
              >کشور <span class="text-danger">*</span></label
            >
            <input
              id="country-input"
              v-model="formData.country"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- phone -->
        <ValidationProvider
          v-slot="{ errors }"
          vid="phone"
          v-if="custom"
          rules="length:11"
        >
          <div class="mb-3">
            <label for="mobile-input" class="form-label">موبایل</label>
            <input
              id="mobile-input"
              v-model="formData.phone"
              type="number"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- company -->
        <ValidationProvider v-slot="{ errors }" vid="company" v-if="custom">
          <div class="mb-3">
            <label for="company-input" class="form-label">شرکت</label>
            <input
              id="company-input"
              v-model="formData.company"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- password -->
        <ValidationProvider
          v-slot="{ errors }"
          vid="password"
          rules="charnum|required"
        >
          <div class="mb-3">
            <label for="password-input" class="form-label"
              >رمز ورود <span class="text-danger">*</span></label
            >
            <input
              id="password-input"
              v-model="formData.password"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- role -->
        <ValidationProvider v-slot="{ errors }" vid="role" rules="required">
          <div class="mb-3">
            <label for="role-input" class="form-label"
              >دسترسی <span class="text-danger">*</span></label
            >
            <select
              id="role-input"
              v-model="formData.role"
              class="form-select form-select-sm"
            >
              <option value="customer">مشتری</option>
              <option value="expert">کارشناس</option>
              <option value="manager">مدیر</option>
            </select>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- profile -->
        <ValidationProvider vid="image">
          <div class="mb-3">
            <label for="name-input" class="form-label"
              >پروفایل کاربر<span class="text-danger">*</span></label
            >
            <div>
              <input
                id="name-input"
                ref="fileInput"
                type="file"
                @change="changedFile"
              />
            </div>
            <span class="text-xs text-danger" v-if="showError"
              >پرکردن این فیلد اجباری است</span
            >
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center">
            <i>افزودن</i>
          </span>
        </button>
      </form>
    </ValidationObserver>
    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">کاربر شما با موفقیت ساخته شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageNewUser',
  layout: 'admin',
  async asyncData({ $axios }) {
    const users = await $axios.$get(`managers/api/users/list/`)
    return {
      users,
    }
  },
  data() {
    return {
      showModal: false,
      showError: false,
      alert: false,
      custom: false,
      file: null,
      formData: {
        role: 'customer',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        company: '',
        expert: '',
      },
    }
  },

  watch: {
    'formData.email'(newVal) {
      this.formData.email = newVal.toLowerCase()
      this.alert = false
      for (let i = 0; i < this.users.length; i++) {
        if (this.formData.email === this.users[i].email) {
          this.alert = true
        }
      }
    },
    'formData.role'() {
      if (this.formData.role === 'customer') {
        this.custom = false
      } else {
        this.custom = true
      }
    },
  },

  methods: {
    changedFile() {
      this.showError = false
    },
    async onSubmit() {
      const bodyFormData = new FormData()
      for (const property in this.formData) {
        bodyFormData.append(property, this.formData[property])
      }
      bodyFormData.append('image', this.$refs.fileInput.files[0])
      this.showError = false
      if (this.alert === false) {
        if (this.$refs.fileInput.files.length !== 0) {
          try {
            const res = await this.$axios.post(
              `managers/api/users/create/`,
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
              this.$router.push('/admin/users')
            }, '3000')
          } catch (ex) {
            if (ex.response.status === 400) {
              this.$refs.form.setErrors(ex.response.data)
            }
          }
        } else {
          this.showError = true
        }
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
