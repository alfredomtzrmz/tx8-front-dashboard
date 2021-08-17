<template>
  <div class="flex flex-col w-full min-h-screen">
    <the-navbar />
    <the-sidebar />
    <main class="relative px-8 py-6 overflow-y-auto md:ml-60">
      <nuxt />
    </main>
    <base-notification />
  </div>
</template>
