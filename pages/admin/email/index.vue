<template>
  <div>
    <div class="headline">ارسال ایمیل</div>
    <ValidationObserver ref="form">
      <form action="#" @submit.prevent="onSubmit">
        <!-- user -->
        <ValidationProvider v-slot="{ errors }" vid="title">
          <div class="mb-3">
            <label for="role-input" class="form-label">مشتری</label>
            <select
              id="role-input"
              v-model="formData.user"
              class="form-select form-select-sm"
            >
              <option selected>...</option>
              <option
                v-for="user in customerUsers"
                :key="user.id"
                :value="user.id"
              >{{ user.first_name + ' ' + user.last_name }} - {{user.email}}</option>
            </select>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- subject -->
        <ValidationProvider v-slot="{ errors }" vid="subject">
          <div class="mb-3">
            <label for="label-input" class="form-label">عنوان ایمیل</label>
            <input
              id="label-input"
              v-model="formData.subject"
              class="form-control form-control-sm"
            />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- message -->
        <ValidationProvider v-slot="{ errors }" vid="message">
          <div class="mb-3">
            <label for="message-input" class="form-label">متن ایمیل</label>
            <textarea
              id="message-input"
              v-model="formData.message"
              class="message-box form-control"
            ></textarea>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" vid="image">
          <div class="mb-3">
            <label for="name-input" class="form-label">فایل پیوست</label>
            <div>
              <input id="name-input" @change="addFileToFormData" ref="fileInput" type="file" />
            </div>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">ارسال ایمیل</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'admin',
  async asyncData({ $axios }) {
    const users = await $axios.$get('managers/api/users/list/')
    console.log(users)
    return {
      users,
    }
  },

  data() {
    return {
      formData: {
        subject: '',
        message: '',
        user: null,
        file : null
      },
    }
  },

  computed: {
    customerUsers() {
      return this.users.filter(user => user.role === "customer")
    },
  },

  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$post(
          `managers/api/emails/create/`,
          this.formData
        )
        console.log(res)
        alert('ایمیل شما با موفقیت ارسال شد')
        this.$router.push('/admin/')
      } catch (ex) {
        console.log(ex)
        if (ex.response.status === 400) {
          this.formData.file = this.$refs.form.setErrors(ex.response.data)
        }
      }
    },

    addFileToFormData() {
      this.formData.file = this.$refs.fileInput.files[0]
    }
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
</style>
