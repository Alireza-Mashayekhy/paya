<template>
  <div>
    <div class="headline">لیست تیکت ها</div>

    <div class="mb-2">
      <nuxt-link to="/user/ticket/new" class="btn btn-sm btn-first"
        >ایجاد تیکت جدید</nuxt-link
      >
    </div>

    <ul class="nav nav-tabs mb-5">
      <li class="nav-item">
        <button
          class="nav-link text-first active"
          data-bs-toggle="tab"
          data-bs-target="#active-ticket"
          type="button"
        >
          فعال
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-first"
          data-bs-toggle="tab"
          data-bs-target="#close-ticket"
          type="button"
        >
          بسته شده
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <div id="active-ticket" class="tab-pane fade show active" tabindex="0">
        <!-- active table -->
        <div class="table-responsive">
          <table class="table table-sm table-bordered text-center align-middle">
            <thead class="text-nowrap">
              <tr>
                <th scope="col">#</th>
                <th scope="col">عنوان</th>
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ticket, index) in openTickets" :key="ticket.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ ticket.subject }}</td>
                <td>
                  <nuxt-link
                    :to="`/user/ticket/${ticket.id}`"
                    class="btn btn-sm btn-first"
                    >نمایش</nuxt-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="close-ticket" class="tab-pane fade" tabindex="0">
        <!-- close table -->
        <div class="table-responsive">
          <table class="table table-sm table-bordered text-center align-middle">
            <thead class="text-nowrap">
              <tr>
                <th scope="col">#</th>
                <th scope="col">نام کارشناس</th>
                <th scope="col">عنوان</th>
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ticket, index) in closeTickets" :key="ticket.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ ticket.subject }}</td>
                <td>
                  <nuxt-link
                    :to="`/user/ticket/${ticket.id}`"
                    class="btn btn-sm btn-first"
                    >نمایش</nuxt-link
                  >
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
export default {
  name: 'SellerPageTikcet',
  layout: 'user',
  async asyncData({ $axios }) {
    const tckets = await $axios.$get(`/customers/api/ticket/list/`)

    return {
      tckets,
    }
  },

  computed: {
    openTickets() {
      return this.tckets.filter((ticket) => ticket.status === 'open')
    },

    closeTickets() {
      return this.tckets.filter((ticket) => ticket.status === 'close')
    },
  },
}
</script>
