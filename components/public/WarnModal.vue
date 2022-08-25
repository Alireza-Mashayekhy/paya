<template>
  <div>
    <transition name="modal-fade">
      <div @click.self="closeModal" class="modal-container">
        <div class="modal-body w-50 w-sm-75">
          <p class="position-absolute top-0" @click.self="closeModal">×</p>
          <div class="text-center">
            <h1>آیا شما مطمئن هستید که میخواهید این کاربر را حذف کنید؟</h1>
          </div>
          <div class="w-100 d-flex justify-content-end gap-2 mt-5">
            <button class="btn btn-sm btn-danger" @click="onDeleteUser">
              <span class="d-block d-sm-inline-block text-center"> حذف </span>
            </button>
            <button class="btn btn-sm btn-primary" @click="closeModal">
              انصراف
            </button>
          </div>
        </div>
      </div>
    </transition>
    <div class="myModal" v-show="showModal2">
      <div class="succussNote">
        <div class="succussBody">کاربر شما با موفقیت حذف شد.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal2: false,
    }
  },
  props: {
    userId: {
      type: [Number, String],
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },

    async onDeleteUser() {
      try {
        const res = await this.$axios.$delete(
          `managers/api/users/delete/${this.userId}/`
        )
        console.log(res)
        this.showModal2 = true
        setTimeout(() => {
          this.closeModal()
          this.$emit('filterUser')
          this.showModal2 = false
          this.$router.push('/admin/users')
        }, '3000')
      } catch (ex) {
        console.log(ex)
      }
    },
  },
}
</script>

<style scoped>
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0 !important;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-container {
  position: fixed;
  inset: 0;
  background-color: rgba(75, 85, 99, 0.6);
  overflow-y: auto;
  height: 100%;
  width: 100%;
  z-index: 50;
}

.modal-body {
  position: relative;
  top: 60px;
  margin: 0 auto;
  padding: 30px 20px 20px;
  border: 1px solid gray;
  border-radius: 6px;
  background-color: white;
}

.modal-body h1,
.modal-body p {
  font-size: 20px;
}

.modal-body p {
  right: 8px;
  cursor: pointer;
}
.myModal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 51;
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
