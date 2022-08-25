<template>
  <div>
    <div class="headline">اعلانات</div>

    <!-- nav -->
    <ul class="nav nav-tabs mb-5">
      <li class="nav-item">
        <button
          class="nav-link text-first active"
          data-bs-toggle="tab"
          data-bs-target="#active-orders"
          type="button"
        >
          جدید
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link text-first"
          data-bs-toggle="tab"
          data-bs-target="#end-orders"
          type="button"
        >
          دیده شده
        </button>
      </li>
    </ul>

    <!-- nav content -->
    <div class="tab-content">
      <div id="active-orders" class="tab-pane fade show active" tabindex="0">
        <div class="table-responsive">
          <table class="table table-sm table-bordered text-center align-middle">
            <thead class="text-nowrap">
              <tr>
                <th scope="col">#</th>
                <th scope="col">تاریخ</th>
                <th scope="col">توضیحات</th>
                <th scope="col">نوع عملیات</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(notif, index) in unreadNotif" :key="notif.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ getDate(notif.date) }}</td>
                <td>{{ notif.descriptions }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-first"
                    @click="onReadNotif(notif)"
                  >
                    دیده شد
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="end-orders" class="tab-pane fade" tabindex="0">
        <div class="table-responsive">
          <table class="table table-sm table-bordered text-center align-middle">
            <thead class="text-nowrap">
              <tr>
                <th scope="col">#</th>
                <th scope="col">تاریخ</th>
                <th scope="col">توضیحات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(notif, index) in readedNotif" :key="notif.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ getDate(notif.date) }}</td>
                <td>{{ notif.descriptions }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mymodal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">پیام شما با موفقیت دیده شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'jalali-moment'

export default {
  name: 'UserPageNotifictions',
  layout: 'seller',

  async asyncData({ $axios }) {
    const readedNotif = await $axios.$get(
      `/customers/api/notifications/list/read/`
    )
    const unreadNotif = await $axios.$get(
      `/customers/api/notifications/list/unread/`
    )
    return {
      readedNotif,
      unreadNotif,
    }
  },
  data() {
    return {
      showModal: false,
    }
  },

  methods: {
    getDate(date) {
      return moment(date).locale('fa').format('YYYY/M/D')
    },
    async onReadNotif(notif) {
      try {
        const res = await this.$axios.$patch(
          `/customers/api/notifications/update/${notif.id}/`,
          {
            ...notif,
            status: 'read',
          }
        )
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          location.reload()
        }, '3000')
        console.log(res)
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
  background-color: var(--sidebar-item-bg-hover);
  color: #fff;
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
