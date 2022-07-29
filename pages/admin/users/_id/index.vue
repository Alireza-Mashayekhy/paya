<template>
  <div>
    <div class="headline-container">
      <div class="headline">ویرایش کاربر</div>
      <nuxt-link to="/admin/users" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <ValidationObserver ref="form">
      <form action="#" @submit.prevent="">
        <!-- first name -->
        <ValidationProvider v-slot="{ errors }" vid="first_name">
          <div class="mb-3">
            <label for="name-input" class="form-label"
              >نام کاربر <span class="text-danger">*</span></label
            >
            <input
              id="name-input"
              v-model="user[0].first_name"
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
              v-model="user[0].last_name"
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
              v-model="user[0].email"
              type="text"
              class="form-control form-control-sm"
              value="علی"
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

        <!-- country -->
        <ValidationProvider v-slot="{ errors }" vid="country">
          <div class="mb-3">
            <label for="country-input" class="form-label"
              >کشور <span class="text-danger">*</span></label
            >
            <input
              id="country-input"
              v-model="user[0].country"
              type="text"
              class="form-control form-control-sm"
              value="علی"
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
              v-model="user[0].phone"
              type="text"
              class="form-control form-control-sm"
              value="علی"
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
              v-model="user[0].company"
              type="text"
              class="form-control form-control-sm"
              value="علی"
            />
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

        <!-- <div class="mb-3">
        <label for="password-input" class="form-label"
          >رمز ورود <span class="text-danger">*</span></label
        >
        <input
          id="password-input"
          v-model="formData.company"
          type="text"
          class="form-control form-control-sm"
          value="علی"
        />
        </div> -->

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

        <!-- <div v-if="formData.role == 'user'" class="mb-3">
        <label for="seller-input" class="form-label"
          >کارشناس <span class="text-danger">*</span></label
        >
        <select
          id="rosellerle-input"
          v-model="formData.role"
          class="form-select form-select-sm"
        >
          <option selected>...</option>
          <option value="user">علی</option>
          <option value="seller">لیلا</option>
          <option value="admin">رحیم</option>
        </select>
      </div> -->

        <button class="btn btn-sm btn-first" @click="onEditUser">
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-pencil"></i>
          </span>
        </button>
        <button class="btn btn-sm btn-danger" @click="readyToDelete">
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-trash"></i>
          </span>
        </button>
      </form>
    </ValidationObserver>
    <WarnModal
      v-if="showModal"
      @closeModal="showModal = false"
      :userId="idToDelete"
    />
  </div>
</template>

<script>
export default {
  name: 'AdminPageNewUser',
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const user = await $axios.$get(`/managers/api/users/detail/${params.id}/`)
    console.log(user)
    return {
      user,
    }
  },
  data() {
    return {
      showModal: false,
      idToDelete: null,
      formData: {
        role: 'customer',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        password: '',
      },
    }
  },

  methods: {
    async onEditUser() {
      try {
        const bodyFormData = new FormData()
        for (const property in this.formData) {
          bodyFormData.append(property, this.formData[property])
        }
        bodyFormData.append('image', this.$refs.fileInput.files[0])

        const res = await this.$axios.$put(
          `managers/api/users/update/${this.$route.params.id}/`,
          this.bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res)
      } catch (ex) {
        if (ex.response.status === 400) {
          this.$refs.form.setErrors(ex.response.data)
        }
        console.log(ex)
      }
    },

    readyToDelete() {
      this.showModal = true
      this.idToDelete = this.$route.params.id
    },
  },
}
</script>
