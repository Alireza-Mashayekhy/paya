<template>
  <div>
    <div class="headline-container mb-5">
      <div class="headline">کامنت ها</div>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <div class="head">-</div>
    <div class="mb-5">
      <div v-for="comment in comments" :key="comment.id">
        <div class="d-flex mb-2" v-if="comment.role == 'customer'">
          <div class="card friend-message">
            <div class="card-header">
              {{ comment.id }}
              ({{ comment.role }}) ({{ comment.date.split('T')[0] }})
            </div>
            <div class="card-body">{{ comment.text }}</div>
            <div class="card-body">
              <nuxt-link
                :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/${comment.id}`"
                >فایل ها</nuxt-link
              >
            </div>
          </div>
          <div class="ms-1">
            <img src="/profile2.png" class="profile-image" alt="profile" />
          </div>
        </div>

        <div v-else class="card my-message mb-2">
          <div class="card-header">
            {{ comment.id }}
            ({{ comment.role }}) ({{ comment.date.split('T')[0] }})
          </div>
          <div class="card-body">{{ comment.text }}</div>
          <div class="card-body">
            <nuxt-link
              :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/${$route.params.rowId}/comments/${comment.id}`"
              >فایل ها</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="message-input" class="form-label">متن کامنت</label>
        <textarea
          id="message-input"
          v-model="text"
          class="message-box form-control"
        ></textarea>
      </div>

      <button class="btn btn-sm btn-first">ارسال کامنت</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'seller',

  async asyncData({ $axios, params }) {
    const comments = await $axios.$get(
      `/experts/api/comments/list/${params.rowId}/`
    )
    console.log(comments)
    // const row = await $axios.$get(`/experts/api/rows/detail/${params.rowId}/`)
    return {
      comments,
      // row: row[0],
    }
  },

  data() {
    return {
      text: '',
    }
  },

  methods: {
    async onSubmit() {
      try {
        const res = await this.$axios.$post(`managers/api/comments/create/`, {
          text: this.text,
          row: this.$route.params.rowId,
          role: 'expert',
        })
        console.log(res)
        this.$router.push(
          `/seller/orders/${this.$route.params.customerId}/${this.$route.params.orderId}`
        )
      } catch (ex) {
        console.log(ex)
        // if (ex.response.status === 400) {
        //   this.$refs.form.setErrors(ex.response.data)
        // }
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
