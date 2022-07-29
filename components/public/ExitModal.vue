<template>
  <div>
    <!-- modal -->
    <div id="exit-modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">خروج از پنل</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <p>آیا از پنل خارج میشوید ؟</p>
            <div>
              <button class="btn btn-sm btn-back" data-bs-dismiss="modal">
                لغو
              </button>
              <button
                class="btn btn-sm btn-danger"
                data-bs-dismiss="modal"
                @click="onLogout"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExitModal',
  methods: {
    async onLogout() {
      const res = await this.$auth.logout()
      console.log(res)
    },
  },
}
</script>
