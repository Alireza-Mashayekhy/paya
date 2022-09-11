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
              v-model="formData.customer"
              class="form-select form-select-sm"
            >
              <option selected>...</option>
              <option
                v-for="user in customerUsers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.first_name + ' ' + user.last_name }} -
                {{ user.email }} - {{ user.country }}
              </option>
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
              <input
                id="name-input"
                @change="addFileToFormData"
                ref="fileInput"
                type="file"
                multiple
              />
            </div>
            <div v-show="uploadMax" style="color: red">
              شما بیشتر از 3 فایل نمیتوانید آپلود کنید
            </div>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button class="btn btn-sm btn-first">ارسال ایمیل</button>
      </form>
    </ValidationObserver>
    <div class="modal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">ایمیل شما با موفقیت ارسال شد.</div>
      </div>
    </div>
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
        customer: null,
      },
      file: null,
      uploadMax: false,
      showModal: false,
    }
  },

  computed: {
    customerUsers() {
      return this.users.filter((user) => user.role === 'customer')
    },
  },

  methods: {
    async onSubmit() {
      try {
        const bodyFormData = new FormData()
        for (const property in this.formData) {
          bodyFormData.append(property, this.formData[property])
        }
        bodyFormData.append('file1', this.$refs.fileInput.files[0])
        const res = await this.$axios.$post(
          `managers/api/emails/create/`,
          bodyFormData
        )
        console.log(res)
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push('/admin/')
        }, '3000')
      } catch (ex) {
        console.log(ex)
        if (ex.response.status === 400) {
          this.formData.file = this.$refs.form.setErrors(ex.response.data)
        }
      }
    },

    addFileToFormData() {
      if (this.$refs.fileInput.files.length > 3) {
        this.uploadMax = true
      }
      if (this.$refs.fileInput.files.length < 3) {
        this.uploadMax = false
        this.formData.file = this.$refs.fileInput.files[0]
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
