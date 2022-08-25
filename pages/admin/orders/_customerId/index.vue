<template>
  <div>
    <div class="headline-container mb-5">
      <div class="headline">لیست سفارشات</div>
      <nuxt-link to="/admin/orders" class="btn btn-sm btn-back"
        >بازگشت</nuxt-link
      >
    </div>

    <!-- head -->
    <div class="head">
      <nuxt-link to="/admin/orders" class="head">لیست مشتریان</nuxt-link>
      <span> </span>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <span> </span>
      <span>لیست سفارشات</span>
    </div>

    <!-- nav -->
    <ul class="nav nav-tabs mb-5">
      <li class="nav-item">
        <button
          class="nav-link text-first active"
          data-bs-toggle="tab"
          data-bs-target="#active-orders"
          type="button"
        >
          فعال
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link text-first"
          data-bs-toggle="tab"
          data-bs-target="#end-orders"
          type="button"
        >
          مختومه
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
                <th scope="col">شماره سفارش</th>
                <th scope="col">تاریخ شروع</th>
                <th scope="col">کارشناس</th>
                <th scope="col">وضعیت</th>
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in customerOrdersOpened"
                :key="order.id"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ order.number }}</td>
                <td>{{ getDate(order.date) }}</td>
                <td>{{ expertName }}</td>
                <td>{{ order.status1 }}</td>

                <td>
                  <nuxt-link
                    :to="`/admin/orders/${order.customer}/${order.id}`"
                    class="btn btn-sm btn-first"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-cogs"></i>
                    </span>
                  </nuxt-link>
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
                <th scope="col">شماره سفارش</th>
                <th scope="col">تاریخ شروع</th>
                <th scope="col">کارشناس</th>
                <th scope="col">وضعیت</th>
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in customerOrdersClosed"
                :key="order.id"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ order.number }}</td>
                <td>{{ getDate(order.date) }}</td>
                <td>{{ order.expert }}</td>
                <td>{{ order.status1 }}</td>

                <td>
                  <nuxt-link
                    :to="`/admin/orders/${order.customer}/${order.id}/factor`"
                    class="btn btn-sm btn-primary"
                  >
                    فاکتور نهایی
                  </nuxt-link>
                  <nuxt-link
                    :to="`/admin/orders/${order.customer}/${order.id}`"
                    class="btn btn-sm btn-first"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-cogs"></i>
                    </span>
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'jalali-moment'

export default {
  name: 'AdminPageTikcetOne',
  layout: 'admin',
  async asyncData({ $axios }) {
    const orders = await $axios.$get('managers/api/orders/list/')
    const users = await $axios.$get('managers/api/users/list/')
    return {
      orders,
      users,
    }
  },

  computed: {
    customerOrdersOpened() {
      return this.orders.filter(
        (order) =>
          +order.customer === +this.$route.params.customerId && !order.closed
      )
    },

    expertName() {
      const expert = this.users.filter(
        (u) => u.id === this.customerOrdersOpened[0].expert
      )[0]
      return expert.first_name + ' ' + expert.last_name
    },

    customerOrdersClosed() {
      return this.orders.filter(
        (order) =>
          +order.customer === +this.$route.params.customerId && order.closed
      )
    },
  },

  methods: {
    getDate(date) {
      return moment(date).locale('fa').format('YYYY/M/D')
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
