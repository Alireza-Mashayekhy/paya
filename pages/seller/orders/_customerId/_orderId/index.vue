<template>
  <div>
    <div class="headline-container">
      <div class="headline">لیست ردیف ها</div>
      <nuxt-link to="/seller/orders/1" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>
    <div v-for="order in orders" :key="order.id">
      <div v-if="order.id == $route.params.orderId">
        <div v-if="!order.closed" class="mb-2">
          <nuxt-link
            :to="`/seller/orders/${$route.params.customerId}/${$route.params.orderId}/new`"
            class="btn btn-sm btn-first"
            >ایجاد ردیف جدید</nuxt-link
          >

          <button
            class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#end-order"
          >
            پایان سفارش
          </button>
        </div>

        <div v-else class="mb-2">
          <button class="btn btn-sm btn-primary" @click="onOpenOrder">
            فعال کردن سفارش
          </button>
        </div>
      </div>
    </div>

    <!-- head -->
    <div class="head">
      <nuxt-link to="/seller/orders" class="head">لیست مشتریان</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link
        :to="`/seller/orders/${$route.params.customerId}/`"
        class="head"
        >لیست سفارشات</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span class="head">لیست ردیف ها</span>
    </div>

    <!-- nav content -->
    <div class="table-responsive">
      <table class="table table-sm table-bordered text-center align-middle">
        <thead class="text-nowrap">
          <tr>
            <th scope="col">#</th>
            <th scope="col">تاریخ</th>
            <th scope="col">شرح خدمات</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ getDate(row.date) }}</td>
            <td>{{ row.descriptions }}</td>
            <td>
              <nuxt-link
                :to="`/seller/orders/${$route.params.customerId}/${row.order}/${row.id}/edit`"
                class="btn btn-sm btn-secondary"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-pencil"></i>
                </span>
              </nuxt-link>
              <nuxt-link
                :to="`/seller/orders/${$route.params.customerId}/${row.order}/${row.id}/comments`"
                class="btn btn-sm btn-first"
              >
                <i class="fa fa-comments"></i>
              </nuxt-link>

              <nuxt-link
                :to="`/seller/orders/${$route.params.customerId}/${row.order}/${row.id}/file`"
                class="btn btn-sm btn-primary"
              >
                <i class="fa fa-file"></i>
              </nuxt-link>

              <button
                class="btn btn-sm btn-info"
                @click="openModalMoreInfo(row)"
              >
                <i class="fa fa-clone"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <form action="#" class="mt-3" @submit.prevent="onEditStatus">
      <div class="input-group input-group-sm">
        <span class="input-group-text">وضعیت سفارش</span>
        <input v-model="status" type="text" class="form-control" />
        <button class="btn btn-first">ثبت</button>
      </div>
    </form>
    <!-- modal -->
    <div id="end-order" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">پایان سفارش</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="file-end-order">فاکتور نهایی</label>
              <input id="file-end-order" ref="factorFile" type="file" />
            </div>
            <div>
              <button class="btn btn-sm btn-back" data-bs-dismiss="modal">
                لغو
              </button>
              <button class="btn btn-sm btn-first" @click="onEndOrder">
                مختومه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div id="moreInfo" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ردیف یک</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <dl class="row">
              <dt class="col-sm-3">تاریخ</dt>
              <dd class="col-sm-9">{{ getDate(currentRow.date) }}</dd>

              <dt class="col-sm-3">شرح خدمات</dt>
              <dd class="col-sm-9">{{ currentRow.title }}</dd>

              <dt class="col-sm-3">توضیحات</dt>
              <dd class="col-sm-9">{{ currentRow.descriptions }}</dd>

              <dt class="col-sm-3">فایل ها</dt>
              <dd class="col-sm-9">
                <div
                  :class="{ 'spinner-border spinner-border-sm': loading }"
                ></div>
                <a
                  v-for="(file, index) in files"
                  :key="file.id"
                  :href="file.file"
                  target="_blank"
                  >فایل {{ index + 1 }}</a
                >
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="mymodal" v-show="showModal">
      <div class="succussNote">
        <div class="succussBody">سفارش شما با موفقیت به پایان رسید.</div>
      </div>
    </div>
    <div class="mymodal" v-show="showModal2">
      <div class="succussNote">
        <div class="succussBody">وضعیت سفارش با موفقیت ثبت شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'jalali-moment'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle'

export default {
  name: 'AdminPageTikcetOne',
  layout: 'seller',
  async asyncData({ $axios, params }) {
    try {
      const rows = await $axios.$get(
        `/experts/api/rows/list/${params.orderId}/`
      )
      const openOrders = await $axios.$get('experts/api/orders/list/active/')
      const closeOrders = await $axios.$get('experts/api/orders/list/inactive/')
      const users = await $axios.$get('experts/api/customers/list/')
      const status = await $axios.$get(
        `experts/api/orders/SeeStatus/${params.orderId}/`
      )
      const orders = [].concat(openOrders, closeOrders)
      return {
        rows,
        orders,
        users,
        status,
      }
    } catch (ex) {
      console.log(ex)
    }
  },
  data() {
    return {
      currentRow: {},
      loading: false,
      files: [],
      showModal: false,
      showModal2: false,
    }
  },
  methods: {
    getDate(date) {
      return moment(date).locale('fa').format('YYYY/M/D')
    },

    openModalMoreInfo(row) {
      this.currentRow = row
      this.loading = true

      this.$axios
        .$get(`/experts/api/rowsfiles/list/${row.id}/`)
        .then((data) => {
          this.files = data
          this.loading = false
        })

      const modal = new Modal(document.getElementById('moreInfo'))

      modal.show()
    },

    async onOpenOrder() {
      try {
        const res = await this.$axios.$patch(
          `/experts/api/orders/update/${this.$route.params.orderId}/`,
          {
            closed: false,
          }
        )
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `سفارش شما فعال شد`,
          }
        )
        console.log(resp)
        this.$router.push(`/admin/orders/${this.$route.params.customerId}`)
        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
    },

    async onEditStatus() {
      try {
        const res = await this.$axios.$post(`/experts/api/orders/getStatus/`, {
          status: this.status,
          id: this.$route.params.orderId,
        })
        console.log(res)
        this.showModal2 = true
        setTimeout(() => {
          this.showModal2 = false
          location.reload()
        }, '3000')
        const resp = await this.$axios.$post(
          '/customers/api/notifications/create/',
          {
            customer: this.$route.params.customerId,
            status: 'unread',
            descriptions: `وضعیت جدیدی برای سفارش شما ثبت شد`,
          }
        )
        console.log(resp)
      } catch (ex) {
        console.log(ex)
      }
    },

    async onEndOrder() {
      if (this.$refs.factorFile.files[0]) {
        const bodyFormData = new FormData()
        bodyFormData.append('file', this.$refs.factorFile.files[0])
        bodyFormData.append('order', this.$route.params.orderId)

        try {
          const res = await this.$axios.post(
            `/experts/api/orders/file/create/`,
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
              customer: this.$route.params.customerId,
              status: 'unread',
              descriptions: `سفارش شما به پایان رسید `,
            }
          )
          console.log(resp)
          this.showModal = true
          setTimeout(() => {
            this.showModal = false
            this.$router.push(`/seller/orders/${this.$route.params.customerId}`)
          }, '3000')
        } catch (ex) {}
      }

      try {
        const res = await this.$axios.$patch(
          `/experts/api/orders/update/${this.$route.params.orderId}/`,
          {
            closed: true,
          }
        )
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
