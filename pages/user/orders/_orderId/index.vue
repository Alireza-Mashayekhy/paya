<template>
  <div>
    <div class="headline-container">
      <div class="headline">لیست ردیف ها</div>
      <nuxt-link to="/user/orders" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- head -->
    <div class="head">
      <nuxt-link :to="`/user/orders/`" class="head">لیست سفارشات</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span class="head">لیست ردیف ها</span>
    </div>

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
            <td>{{ row.title }}</td>
            <td>
              <nuxt-link
                :to="`/user/orders/${row.order}/${row.id}/file`"
                class="btn btn-sm btn-primary"
              >
                <i class="fa fa-file"></i>
              </nuxt-link>
              <nuxt-link
                :to="`/user/orders/${row.order}/${row.id}/comments`"
                class="btn btn-sm btn-first"
              >
                <i class="fa fa-comment"></i>
              </nuxt-link>

              <button class="btn btn-sm btn-info" @click="openModal(row)">
                <i class="fa fa-clone"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script>
import moment from 'jalali-moment'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle'

export default {
  name: 'AdminPageTikcetOne',
  layout: 'user',
  async asyncData({ $axios, params }) {
    const rows = await $axios.$get(
      `/customers/api/rows/list/${params.orderId}/`
    )
    const openOrders = await $axios.$get('customers/api/orders/list/active/')
    const closeOrders = await $axios.$get('customers/api/orders/list/inactive/')
    return {
      rows,
      openOrders,
      closeOrders,
    }
  },

  data() {
    return {
      currentRow: {},
      loading: false,
      files: [],
    }
  },

  methods: {
    getDate(date) {
      return moment(date).locale('fa').format('YYYY/M/D')
    },

    openModal(row) {
      this.currentRow = row
      this.loading = true

      this.$axios
        .$get(`customers/api/rowsfiles/list/${row.id}/`)
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
</style>
