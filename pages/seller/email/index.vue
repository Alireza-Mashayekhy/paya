<template>
  <div>
    <div class="headline">ارسال ایمیل</div>

    <form action="#">
      <div class="mb-3">
        <label for="role-input" class="form-label">مشتری</label>
        <select id="role-input" class="form-select form-select-sm">
          <option selected>...</option>
          <!-- <option v-for="user in customerUsers" :key="user.id" :value="user.id">
            {{ user.first_name + ' ' + user.last_name }}
          </option> -->
        </select>
      </div>

      <div class="mb-3">
        <label for="label-input" class="form-label">عنوان ایمیل</label>
        <input
          id="label-input"
          v-model="formData.subject"
          class="form-control form-control-sm"
        />
      </div>

      <div class="mb-3">
        <label for="message-input" class="form-label">متن ایمیل</label>
        <textarea
          id="message-input"
          v-model="formData.message"
          class="message-box form-control"
        ></textarea>
      </div>

      <button class="btn btn-sm btn-first">ارسال ایمیل</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminPageTikcetOne',
  layout: 'seller',
  data() {
    return {
      formData: {
        subject: '',
        message: '',
        user: null,
      },
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
