<template>
  <div class="flex flex-col w-full min-h-screen">
    <the-navbar />
    <the-sidebar />
    <main class="relative px-6 py-6 overflow-y-auto sm:px-8 lg:ml-60">
      <nuxt />
    </main>
    <BaseNotification />
    <BaseAlert />
  </div>
</template>
