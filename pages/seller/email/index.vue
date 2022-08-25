<template>
  <div>
    <div class="headline">ارسال ایمیل</div>

    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form action="#" @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <div class="mb-3">
            <label for="role-input" class="form-label">مشتری</label>
            <select
              id="role-input"
              class="form-select form-select-sm"
              v-model="formData.customer"
            >
              <option selected>...</option>
              <option
                v-for="user in customerUsers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.first_name + ' ' + user.last_name }}
              </option>
            </select>
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required">
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

        <ValidationProvider v-slot="{ errors }" rules="required">
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

        <button class="btn btn-sm btn-first">ارسال ایمیل</button>
      </form>
    </ValidationObserver>
    <div class="mymodal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">ایمیل شما با موفقیت ارسال شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'seller',
  async asyncData({ $axios, params }) {
    try {
      const customerUsers = await $axios.$get('/experts/api/customers/list/')
      return {
        customerUsers,
      }
    } catch (ex) {
      console.log(ex)
    }
  },
  data() {
    return {
      showModal: false,
      formData: {
        subject: '',
        message: '',
        customer: null,
      },
    }
  },
  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      for (const property in this.formData) {
        bodyFormData.append(property, this.formData[property])
      }
      try {
        const res = await this.$axios.post(
          `/experts/api/emails/create/`,
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
.mymodal {
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
