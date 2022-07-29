<template>
  <div>
    <div class="headline-container mb-5">
      <div class="headline">نمایش یک تیکت</div>
      <nuxt-link to="/user/ticket/" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- <div class="head">علیرضا</div> -->
    <div class="mb-5">
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.role == 'customer'" class="card my-message mb-2">
          <div class="card-body">{{ message.message }}</div>
          <div v-if="message.file" class="card-body">
            <a :href="message.file" target="_blank">فایل پیوست</a>
          </div>
        </div>

        <div v-else class="d-flex mb-2">
          <div class="card friend-message">
            <div class="card-body">{{ message.message }}</div>
            <div v-if="message.file" class="card-body">
              <a :href="message.file" target="_blank">فایل پیوست</a>
            </div>
          </div>
          <div class="ms-1">
            <img src="/profile2.png" class="profile-image" alt="profile" />
          </div>
        </div>
      </div>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="message-input" class="form-label">متن پیام</label>
        <textarea
          id="message-input"
          v-model="text"
          class="message-box form-control"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="file-input" class="form-label">فایل پیوست</label>
        <input id="file-input" ref="fileInput" type="file" />
      </div>

      <button class="btn btn-sm btn-first">ارسال پیام</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'user',
  async asyncData({ $axios, params }) {
    const messages = await $axios.$get(
      `managers/api/ticket/detail/${params.id}/`
    )
    console.log(messages)
    return {
      messages,
    }
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    async onSubmit() {
      const bodyFormData = new FormData()
      if (this.$refs.fileInput.files[0]) {
        bodyFormData.append('file', this.$refs.fileInput.files[0])
      }
      bodyFormData.append('ticket', +this.$route.params.id)
      bodyFormData.append('message', this.text)

      try {
        const res = await this.$axios.post(
          `/customers/api/message/create/`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res)
        this.$router.push(`/user/ticket/`)
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
</style>
