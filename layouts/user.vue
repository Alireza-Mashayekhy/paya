<template>
  <div>
    <div class="row g-0 min-vh-100">
      <aside class="col-2 col-sm-4 col-md-3 col-xl-2">
        <UserSidebar />
      </aside>
      <main class="col-10 col-sm-8 col-md-9 col-xl-10 fade-animation">
        <div class="h-100 d-flex flex-column justify-content-between">
          <div class="p-4 mb-5">
            <Nuxt />
          </div>
          <FooterSection />
        </div>
      </main>
    </div>
    <ExitModal />
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  middleware: ['auth'],
}
</script>

<style scoped>
.navbar {
  background-color: var(--bs-gray-200);
  border-color: var(--bs-gray-400) !important;
}
</style>
