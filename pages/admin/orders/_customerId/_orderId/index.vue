<template>
  <div>
    <div class="headline-container">
      <div class="headline">لیست ردیف ها</div>
      <nuxt-link
        :to="`/admin/orders/${$route.params.customerId}/`"
        class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>
    <div v-for="o in order" :key="o.id">
      <div v-if="o.id == $route.params.orderId">
        <div v-if="!o.closed" class="mb-2">
          <nuxt-link
            :to="`/admin/orders/${$route.params.customerId}/${$route.params.orderId}/new`"
            class="btn btn-sm btn-first"
            >ایجاد ردیف جدید</nuxt-link
          >

          <button class="btn btn-sm btn-primary" @click="showModal = true">
            پایان سفارش
          </button>
        </div>

        <div v-else class="mb-2">
          <button class="btn btn-sm btn-primary" @click="showModal2 = true">
            فعال کردن سفارش
          </button>
        </div>
      </div>
    </div>

    <div class="head">
      <nuxt-link to="/admin/orders" class="head">لیست مشتریان</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <nuxt-link :to="`/admin/orders/${$route.params.customerId}/`" class="head"
        >لیست سفارشات</nuxt-link
      >
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>لیست ردیف ها</span>
    </div>

    <!-- nav content -->
    <div class="table-responsive">
      <table class="table table-sm table-bordered text-center align-middle">
        <thead class="text-nowrap">
          <tr>
            <th scope="col">#</th>
            <th scope="col">تاریخ</th>
            <th scope="col">شرح خدمات</th>
            <th scope="col">توضیحات تکمیلی</th>
            <th scope="col">وضعیت</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ getDate(row.date) }}</td>
            <td class="longTxt">{{ row.title }}</td>
            <td class="longTxt">{{ row.descriptions }}</td>
            <td>{{ row.status }}</td>
            <td>
              <nuxt-link
                :to="`/admin/orders/${$route.params.customerId}/${row.order}/${row.id}/edit`"
                class="btn btn-sm btn-secondary"
              >
                <span class="d-block d-sm-inline-block text-center">
                  <i class="fa fa-pencil"></i>
                </span>
              </nuxt-link>
              <nuxt-link
                :to="`/admin/orders/${$route.params.customerId}/${row.order}/${row.id}/comments`"
                class="btn btn-sm btn-first"
              >
                <i class="fa fa-comments"></i>
              </nuxt-link>
              <nuxt-link
                :to="`/admin/orders/${$route.params.customerId}/${row.order}/${row.id}/file`"
                class="btn btn-sm btn-primary"
              >
                <i class="fa fa-file"></i>
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- modal -->
    <div class="modal" v-show="showModal">
      <div class="loginError">
        <div class="errorHead d-flex">
          <h5 class="modal-title">پایان سفارش</h5>
        </div>
        <div class="errorBody">
          <div class="mb-3">
            <label for="file-end-order">فاکتور نهایی</label>
            <input id="file-end-order" ref="factorFile" type="file" />
            <p v-show="showThisError" style="color: red">
              پرکردن فایل الزامیست
            </p>
          </div>
        </div>
        <div class="errorFoot">
          <button class="btn btn-sm btn-back" @click="showModal = false">
            لغو
          </button>
          <button class="btn btn-sm btn-first" @click="onEndOrder" ref="">
            مختومه
          </button>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal" v-show="showModal2">
      <div class="loginError">
        <div class="errorHead">
          <h5 class="modal-title">فعال کردن سفارش</h5>
        </div>
        <div class="errorBody">
          <div class="modal-body">
            <div>
              <button class="btn btn-sm btn-back" data-bs-dismiss="modal">
                لغو
              </button>
              <button class="btn btn-sm btn-first" @click="onOpenOrder">
                فعال کردن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal" v-show="showModal3">
      <div class="loginError">
        <div class="errorHead">
          <h5 class="modal-title">ردیف یک</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="errorBody">
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
        <div class="errorFoot">
          <button class="btn btn-danger">بستن</button>
        </div>
      </div>
    </div>
    <div class="succussModal" v-show="showModal4">
      <div class="succussNote">
        <div class="succussBody">سفارش شما با موفقیت به پایان رسید.</div>
      </div>
    </div>
    <div class="succussModal" v-show="showModal5">
      <div class="succussNote">
        <div class="succussBody">سفارش شما با موفقیت فعال شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'jalali-moment'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle'

export default {
  name: 'AdminPageTikcetOne',
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const rows = await $axios.$get(`managers/api/rows/list/${params.orderId}/`)
    const order = await $axios.$get(
      `/managers/api/orders/detail/${params.orderId}/`
    )
    const users = await $axios.$get(
      `managers/api/users/detail/${params.customerId}/`
    )
    // console.log('orders ', order)
    return {
      rows,
      order,
      users,
    }
  },

  data() {
    return {
      showModal: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      showModal5: false,
      showThisError: false,
      currentRow: {},
      loading: false,
      files: [],
    }
  },

  methods: {
    async onEditStatus() {
      try {
        const res = await this.$axios.$patch(
          `/managers/api/orders/update/${this.$route.params.orderId}/`,
          {
            status: this.order.status,
          }
        )
        console.log(res)
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
            `/managers/api/orders/file/create/`,
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
              descriptions: `سفارش شما به پایان رسید`,
            }
          )
          console.log(resp)
          this.showModal = false
          this.showModal4 = true
          setTimeout(() => {
            this.showModal4 = false
            this.$router.push(`/admin/orders/${this.$route.params.customerId}`)
          }, '3000')
        } catch (ex) {}
        try {
          const res = await this.$axios.$patch(
            `/managers/api/orders/update/${this.$route.params.orderId}/`,
            {
              closed: true,
            }
          )
          console.log(res)
        } catch (ex) {
          console.log(ex)
        }
      } else {
        this.showThisError = true
      }
    },

    async onOpenOrder() {
      try {
        const res = await this.$axios.$patch(
          `/managers/api/orders/update/${this.$route.params.orderId}/`,
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
        this.showModal2 = false
        this.showModal5 = true
        setTimeout(() => {
          this.showModal5 = false
          this.$router.push(`/admin/orders/${this.$route.params.customerId}`)
        }, '3000')

        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
    },

    getDate(date) {
      return moment(date).locale('fa').format('YYYY/M/D')
    },

    openModalMoreInfo(row) {
      this.currentRow = row
      this.loading = true

      this.$axios
        .$get(`/managers/api/rowsfiles/list/${row.id}/`)
        .then((data) => {
          this.files = data
          this.loading = false
        })

      const modal = new Modal(document.getElementById('moreInfo'))

      modal.show()
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
.longTxt {
  max-width: 200px;
  overflow: hidden;
  overflow-wrap: break-word;
}
.succussModal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 10;
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
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
.loginError {
  background-color: white;
  height: auto;
  width: 500px;
  margin: auto;
  padding: 30px;
  border-radius: 20px;
}

.errorHead {
  border-bottom: 1px solid #acacac;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
.errorBody {
  padding: 20px 0px;
  border-bottom: 1px solid #acacac;
}
.errorFoot {
  padding-top: 20px;
}
</style>
