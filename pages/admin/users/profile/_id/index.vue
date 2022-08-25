<template>
  <div>
    <div class="headline-container">
      <div class="headline">مشخصات کاربر</div>
      <nuxt-link to="/admin/users" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>
    <div class="details">
      <div class="detail">
        <label>نام :</label>
        <div v-if="user[0].first_name == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].first_name }}</div>
        <label>نام خانوادگی :</label>
        <div v-if="user[0].last_name == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].last_name }}</div>
        <label>ایمیل :</label>
        <div v-if="user[0].email == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].email }}</div>
        <label>کشور :</label>
        <div v-if="user[0].country == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].country }}</div>
        <label>شماره :</label>
        <div v-if="user[0].phone == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].phone }}</div>
        <label>کمپانی :</label>
        <div v-if="user[0].company == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].company }}</div>
        <label>نقش :</label>
        <div v-if="user[0].role == null">وارد نشده</div>
        <div v-else>{{ user[$route.params.id - 1].role }}</div>
      </div>
      <div>
        <div class="sidebar-profile mb-2 animation-border-color pic">
          <img
            :src="user[$route.params.id - 1].image || '/profile2.png'"
            class="sidebar-profile-image"
            alt="profile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const user = await $axios.$get(`/managers/api/users/detail/${params.id}/`)
    console.log(user)
    return {
      user,
    }
  },
}
</script>

<style scoped>
.details {
  display: flex !important;
  justify-content: space-between;
}
.detail {
  display: grid;
  grid-template-columns: 100px 100px;
}
.pic {
  width: 200px;
}
.pic img {
  width: 100%;
}
@media only screen and (max-width: 1000px) and (min-width: 400px) {
  .details {
    flex-direction: column-reverse;
  }
  .pic {
    width: 100px;
  }
  .pic img {
    width: 100%;
  }
  .detail {
    margin-top: 20px;
  }
}
@media only screen and (max-width: 400px) {
  .details {
    flex-direction: column-reverse;
  }
  .pic {
    width: 100px;
  }
  .pic img {
    width: 100%;
  }
  .detail {
    grid-template-columns: 100%;
  }
  .detail div {
    margin-bottom: 20px;
  }
}
</style>
