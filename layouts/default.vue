<template>
  <div class="flex flex-col w-full min-h-screen">
    <the-navbar />
    <div class="flex flex-col">
      <the-sidebar />
      <main class="relative min-h-screen px-4 py-4 overflow-y-auto lg:ml-64 xs:px-6 xs:py-6 md:py-8 md:px-12">
        <nuxt />
      </main>
    </div>
  </div>
</template>
