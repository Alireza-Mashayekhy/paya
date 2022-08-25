<template>
  <div>
    <div class="headline-container">
      <div class="headline">ویرایش کاربر</div>
      <nuxt-link to="/admin/users" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <ValidationObserver v-slot="{ handleSubmit }">
      <form action="#" @submit.prevent="handleSubmit(onEditUser)">
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
              v-model="user[$route.params.id - 1].first_name"
              type="text"
              class="form-control form-control-sm"
              :placeholder="user[$route.params.id - 1].first_name"
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
              v-model="user[$route.params.id - 1].last_name"
              type="text"
              class="form-control form-control-sm"
              :placeholder="user[$route.params.id - 1].last_name"
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
              v-model="user[$route.params.id - 1].email"
              type="text"
              class="form-control form-control-sm"
              value="علی"
              :placeholder="user[$route.params.id - 1].email"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- country -->
        <ValidationProvider v-slot="{ errors }" vid="country" rules="required">
          <div class="mb-3">
            <label for="country-input" class="form-label"
              >کشور <span class="text-danger">*</span></label
            >
            <input
              id="country-input"
              v-model="user[$route.params.id - 1].country"
              type="text"
              class="form-control form-control-sm"
              value="علی"
              :placeholder="user[$route.params.id - 1].country"
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
              v-model="user[$route.params.id - 1].phone"
              type="text"
              class="form-control form-control-sm"
              value="علی"
              :placeholder="user[$route.params.id - 1].phone"
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
              v-model="user[$route.params.id - 1].company"
              type="text"
              class="form-control form-control-sm"
              value="علی"
              :placeholder="user[$route.params.id - 1].company"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- profile -->
        <ValidationProvider v-slot="{ errors }" vid="image" rules="required">
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
        <ValidationProvider v-slot="{ errors }" vid="role" rules="required">
          <div class="mb-3">
            <label for="role-input" class="form-label"
              >دسترسی <span class="text-danger">*</span></label
            >
            <select
              id="role-input"
              v-model="user[$route.params.id - 1].role"
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
            <i>ویرایش</i>
          </span>
        </button>
        <button class="btn btn-sm btn-danger" @click="readyToDelete">
          <span class="d-block d-sm-inline-block text-center">
            <i>حذف</i>
          </span>
        </button>
      </form>
    </ValidationObserver>
    <WarnModal
      v-if="showModal"
      @closeModal="showModal = false"
      :userId="idToDelete"
    />
    <div class="modal" v-show="showModal2">
      <div class="succussNote">
        <div class="succussBody">کاربر شما با موفقیت ویرایش شد.</div>
      </div>
    </div>
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
      showModal2: false,
      idToDelete: null,
      myData: [],
      formData: {
        role: 'customer',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
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
        bodyFormData.append('role', this.user[this.$route.params.id - 1].role)
        bodyFormData.append(
          'first_name',
          this.user[this.$route.params.id - 1].first_name
        )
        bodyFormData.append(
          'last_name',
          this.user[this.$route.params.id - 1].last_name
        )
        bodyFormData.append('email', this.user[this.$route.params.id - 1].email)
        bodyFormData.append('phone', this.user[this.$route.params.id - 1].phone)
        bodyFormData.append(
          'country',
          this.user[this.$route.params.id - 1].country
        )
        bodyFormData.append(
          'company',
          this.user[this.$route.params.id - 1].company
        )
        bodyFormData.append(
          'password',
          this.user[this.$route.params.id - 1].password
        )
        bodyFormData.append('image', this.$refs.fileInput.files[0])

        const res = await this.$axios.$put(
          `managers/api/users/update/${
            this.user[this.$route.params.id - 1].id
          }/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res)
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.user[this.$route.params.id - 1].id,
            status: true,
            descriptions: 'مشخصات کاربری شما ویرایش شد.',
          }
        )
        console.log(resp)
        this.showModal2 = true
        setTimeout(() => {
          this.showModal2 = false
          this.$router.push('/admin/users')
        }, '3000')
      } catch (ex) {
        console.log(ex)
        if (ex.response.status === 400) {
          this.$refs.form.setErrors(ex.response.data)
        }
      }
    },

    readyToDelete() {
      this.showModal = true
      this.idToDelete = this.$route.params.id
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
</style>
