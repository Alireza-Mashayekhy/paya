<template>
  <footer class="footer-section p-3">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div class="pe-md-3 mb-3 mb-md-0">
        <p>
          پیشرو اندیشان یاسان (پایا)، اولین مجموعه ارائه دهنده خدمات تخصصی
          زنجیره تامین و صادرات مواد غذایی و کالاهای سوپرماکتی ایرانی به پنج
          قاره
        </p>
        <a
          href="https://paya.co.ir//about/"
          target="_blank"
          class="btn btn-sm btn-first"
          >
            <span class="d-block d-sm-inline-block text-center">
              <i class="fa fa-plus"></i>
            </span>
          </a
        >
      </div>

      <div>
        <img src="/logo.png" class="logo" alt="logo" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FotterSection',
}
</script>

<style scoped>
.footer-section {
  background-color: var(--bs-gray-200);
}

.logo {
  width: 100px;
}
</style>
