<template>
  <div>
    <div class="headline">افزودن کاربر</div>
    <ValidationObserver ref="form">
      <form action="#" @submit.prevent="onSubmit">
        <!-- first name -->
        <ValidationProvider v-slot="{ errors }" vid="first_name">
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
        <ValidationProvider v-slot="{ errors }" vid="last_name">
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
        <ValidationProvider v-slot="{ errors }" vid="email">
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
        <ValidationProvider v-slot="{ errors }" vid="phone">
          <div class="mb-3">
            <label for="mobile-input" class="form-label">موبایل</label>
            <input
              id="mobile-input"
              v-model="formData.phone"
              type="text"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- company -->
        <ValidationProvider v-slot="{ errors }" vid="company">
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
        <ValidationProvider v-slot="{ errors }" vid="password">
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
        <ValidationProvider v-slot="{ errors }" vid="role">
          <div class="mb-3">
            <label for="role-input" class="form-label"
              >دسترسی <span class="text-danger">*</span></label
            >
            <select
              id="role-input"
              v-model="formData.role"
              class="form-select form-select-sm"
            >
              <option selected>...</option>
              <option value="customer">مشتری</option>
              <option value="expert">کارشناس</option>
              <option value="manager">مدیر</option>
            </select>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- profile -->
        <ValidationProvider v-slot="{ errors }" vid="image">
          <div class="mb-3">
            <label for="name-input" class="form-label">پروفایل کاربر</label>
            <div>
              <input id="name-input" ref="fileInput" type="file" />
            </div>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-plus"></i>
          </span>
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'AdminPageNewUser',
  layout: 'admin',
  data() {
    return {
      formData: {
        role: 'customer',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        company: '',
      },
    }
  },

  watch: {
    'formData.email'(newVal) {
      this.formData.email = newVal.toLowerCase()
    }
  },

  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      for (const property in this.formData) {
        bodyFormData.append(property, this.formData[property])
      }
      bodyFormData.append('image', this.$refs.fileInput.files[0])

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
        this.$router.push('/admin/users')
      } catch (ex) {
        if (ex.response.status === 400) {
          this.$refs.form.setErrors(ex.response.data)
        }
      }
    },
  },
}
</script>
