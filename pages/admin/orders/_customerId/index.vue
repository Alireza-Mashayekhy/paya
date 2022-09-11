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
                <!-- <th scope="col">وضعیت</th> -->
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
                <!-- <td>{{ order.status1 }}</td> -->

                <td class="d-flex justify-content-center gap-2">
                  <nuxt-link
                    :to="`/admin/orders/${order.customer}/${order.id}`"
                    class="btn btn-sm btn-first"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-cogs"></i>
                    </span>
                  </nuxt-link>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="beforReadyToDelete(order.id)"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-trash"></i>
                    </span>
                  </button>
                  <button
                    class="btn btn-sm btn-success"
                    @click="beforReadyToEdit(order.id)"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-pen"></i>
                    </span>
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
                <th scope="col">شماره سفارش</th>
                <th scope="col">تاریخ شروع</th>
                <th scope="col">کارشناس</th>

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

                <td class="d-flex justify-content-center gap-2">
                  <nuxt-link
                    :to="`/admin/orders/${order.customer}/${order.id}/factor`"
                    class="btn btn-sm btn-primary"
                  >
                    فاکتور نهایی
                  </nuxt-link>
                  <nuxt-link
                    :to="`/admin/orders/${order.customer}/${order.id}`"
                    class="btn btn-sm btn-first d-flex align-items-center"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-cogs"></i>
                    </span>
                  </nuxt-link>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="beforReadyToDelete(order.id)"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-trash"></i>
                    </span>
                  </button>
                  <button
                    class="btn btn-sm btn-success"
                    @click="beforReadyToEdit(order.id)"
                  >
                    <span class="d-block d-sm-inline-block text-center">
                      <i class="fa fa-pen"></i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div class="modal" v-show="showModal">
      <div class="dangerModal">
        <div class="dangerNote" style="background: white; color: black">
          <div class="border-bottom pb-2">
            ایا از پاک کردن این سفارش مطمئنید؟
          </div>
          <div class="mt-2" style="float: left">
            <button class="btn btn-sm btn-dark" @click="showModal = false">
              انصراف
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteOrder">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal2 -->
    <div class="modal" v-show="showModal2">
      <div class="succussNote">
        <div class="succussBody">سفارش شما با موفقیت حذف شد.</div>
      </div>
    </div>
    <!-- modal3 -->
    <div class="modal" v-show="showModal3">
      <div class="dangerModal">
        <div class="dangerNote" style="background: white; color: black">
          <div class="border-bottom pb-2">
            <lable for="role-inputs">کارشناس</lable>
            <select
              id="role-inputs"
              v-model="formData.expert"
              class="form-select form-select-sm mb-3"
              name="expert"
            >
              <option
                v-for="expert in expertUsers"
                :key="expert.id"
                :value="expert.id"
                required
              >
                {{ expert.first_name + ' ' + expert.last_name }}
              </option>
            </select>
            <p class="text-danger mb-3" v-show="showError1">
              پر کردن این فیلد اجباری است.
            </p>

            <lable for="number">شماره سفارش</lable>
            <input
              class="w-100"
              v-model="formData.number"
              id="number"
              required
            />
            <p class="text-danger" v-show="showError2">
              پر کردن این فیلد اجباری است.
            </p>
          </div>
          <div class="mt-2" style="float: left">
            <button class="btn btn-sm btn-dark" @click="showModal3 = false">
              انصراف
            </button>
            <button class="btn btn-sm btn-success" @click="editOrder">
              ویرایش
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal4 -->
    <div class="modal" v-show="showModal4">
      <div class="succussNote">
        <div class="succussBody">سفارش شما با موفقیت ویرایش شد.</div>
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

  data() {
    return {
      showModal: false,
      idToDelete: null,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      showError1: false,
      showError2: false,
      formData: {
        expert: '',
        customer: '',
        number: '',
      },
    }
  },

  computed: {
    customerOrdersOpened() {
      return this.orders.filter(
        (order) =>
          +order.customer === +this.$route.params.customerId && !order.closed
      )
    },

    expertUsers() {
      return this.users.filter((user) => {
        return user.role === 'expert'
      })
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
    beforReadyToDelete(userId) {
      const order = this.orders.filter((o) => o.id === userId)
      const order2 = order.filter((o) => o.closed === false)
      this.showModal = true
      this.idToDelete = order2[0].id
    },
    beforReadyToEdit(userId) {
      const order = this.orders.filter((o) => o.id === userId)
      const order2 = order.filter((o) => o.closed === false)
      this.showModal3 = true
      this.formData.customer = order2[0].id
      this.idToDelete = order2[0].id
    },
    async deleteOrder() {
      try {
        const res = await this.$axios.$delete(
          `managers/api/orders/delete/${this.idToDelete}/`
        )
        console.log(res)
        this.showModal = false
        this.showModal2 = true
        setTimeout(() => {
          this.showModal2 = false
          location.reload()
        }, '3000')
      } catch (ex) {
        console.log(ex)
      }
    },
    async editOrder() {
      this.showError1 = false
      this.showError2 = false
      try {
        if (this.formData.number !== '') {
          if (this.formData.expert !== '') {
            const res = await this.$axios.$put(
              `managers/api/orders/update/${this.idToDelete}/`,
              this.formData
            )
            console.log(res)
            this.showModal3 = false
            this.showModal4 = true
            setTimeout(() => {
              this.showModal4 = false
              location.reload()
            }, '3000')
          } else {
            this.showError1 = true
          }
        } else {
          this.showError2 = true
        }
      } catch (ex) {
        console.log(ex)
      }
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(39, 59, 36, 0.6);
}

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
