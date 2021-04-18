<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <the-sidebar />
    <div class="flex flex-col flex-1 overflow-auto focus:outline-none" tabindex="0">
      <the-navbar />
      <main class="relative z-0 flex-1 p-8 overflow-y-auto">
        <nuxt />
      </main>
    </div>
  </div>
</template>
