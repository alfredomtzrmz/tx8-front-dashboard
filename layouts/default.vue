<template>
  <div class="flex flex-col w-full min-h-screen">
    <TheSidebar />
    <div class="lg:ml-80">
      <TheNavbar />
      <main class="overflow-y-auto relative">
        <div class="p-4 mx-auto w-full max-w-7xl md:p-6 lg:p-8">
          <nuxt />
        </div>
      </main>
    </div>
    <BaseNotification />
    <BaseAlert />
  </div>
</template>
