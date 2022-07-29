<template>
  <div>
    <div class="headline">لیست تیکت ها</div>
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
                <th scope="col">نام مشتری</th>
                <th scope="col">نام کارشناس</th>
                <th scope="col">عنوان</th>
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ticket, index) in openTickets" :key="ticket.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ ticket.customer }}</td>
                <td>{{ ticket.expert }}</td>
                <td>{{ ticket.subject }}</td>
                <td>
                  <nuxt-link
                    :to="`/admin/ticket/${ticket.id}`"
                    class="btn btn-sm btn-first"
                    >نمایش</nuxt-link
                  >
                  <button
                    class="btn btn-sm btn-primary"
                    @click="onCloseTicket(ticket.id)"
                  >
                    بستن
                  </button>
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
                <th scope="col">نام مشتری</th>
                <th scope="col">نام کارشناس</th>
                <th scope="col">عنوان</th>
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ticket, index) in closeTickets" :key="ticket.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ ticket.customer }}</td>
                <td>{{ ticket.expert }}</td>
                <td>{{ ticket.subject }}</td>
                <td>
                  <nuxt-link
                    :to="`/admin/ticket/${ticket.id}`"
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
  name: 'AdminPageTikcet',
  layout: 'admin',
  async asyncData({ $axios }) {
    const openTickets = await $axios.$get(`managers/api/ticket/list/open/`)
    const closeTickets = await $axios.$get(`managers/api/ticket/list/close/`)
    console.log(openTickets)
    return {
      closeTickets,
      openTickets,
    }
  },

  methods: {
    async onCloseTicket(id) {
      try {
        const res = await this.$axios.$patch(
          `/managers/api/ticket/update/${id}/`,
          {
            status: 'close',
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
