<template>
  <div class="text-light sidebar-container">
    <ul class="d-flex flex-column p-0 w-100">
      <li
        class="d-flex flex-column justify-content-center align-items-center mt-3"
      >
        <div>
          <div class="sidebar-profile mb-2 animation-border-color">
            <img
              :src="userInfo.image || '/profile2.png'"
              class="sidebar-profile-image"
              alt="profile"
            />
          </div>
        </div>
        <p class="d-none d-sm-block">
          {{ userInfo.first_name + ' ' + userInfo.last_name }}
        </p>
      </li>

      <li class="py-1 px-2 w-100 right-to-left-animation">
        <nuxt-link
          to="/user/me/"
          exact-active-class="sidebar-axect-active"
          class="sidebar-link"
        >
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-cog"></i>
          </span>
          <span class="ms-1 d-none d-sm-inline-block">تنظیمات</span>
        </nuxt-link>
      </li>

      <li class="py-1 px-2 w-100 right-to-left-animation delay-animation-2">
        <nuxt-link
          to="/user/orders/"
          exact-active-class="sidebar-axect-active"
          class="sidebar-link"
        >
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-shopping-bag"></i>
          </span>
          <span class="ms-1 d-none d-sm-inline-block">لیست سفارشات</span>
        </nuxt-link>
      </li>

      <li class="py-1 px-2 w-100 right-to-left-animation delay-animation-6">
        <nuxt-link
          to="/user/notifictions"
          exact-active-class="sidebar-axect-active"
          class="sidebar-link"
        >
          <span
            class="badge rounded-pill bg-light text-first float-end d-none d-sm-block"
          >
            {{ countNotif }}
          </span>

          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-sms"></i>
          </span>
          <span class="ms-1 d-none d-sm-inline-block">اعلانات</span>
        </nuxt-link>
      </li>

      <li class="py-1 px-2 w-100 right-to-left-animation delay-animation-8">
        <a
          exact-active-class="sidebar-axect-active"
          class="sidebar-link"
          data-bs-toggle="modal"
          href="#exit-modal"
        >
          <span class="d-block d-sm-inline-block text-center">
            <i class="fa fa-sign-out"></i>
          </span>
          <span class="ms-1 d-none d-sm-inline-block">خروج</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebarSection',
  data() {
    return {
      userInfo: {},
      countNotif: 0,
    }
  },
  async mounted() {
    try {
      const userInfo = await this.$axios.$get(`usermodel/api/users/info/`)
      const countNotif = await this.$axios.$get(
        `/customers/api/notifications/list/count-unread/`
      )
      this.userInfo = userInfo[0]
      this.countNotif = countNotif.count
    } catch (ex) {
      console.log(ex)
    }
  },
}
</script>

<style scoped>
.sidebar-profile {
  width: 100px;
  height: 0;
  padding-top: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

@media screen and (max-width: 576px) {
  .sidebar-profile {
    width: 35px;
    border-width: 2px;
  }
}

.sidebar-profile-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
