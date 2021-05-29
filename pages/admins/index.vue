<template>
  <!-- <div class="flex flex-col w-full min-h-screen space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Administradores
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white shadow sm:rounded-lg">
      <div class="flex flex-col px-4 py-5 sm:p-6">
        <img src="@/static/images/index-admin.svg" alt="Index Admin" class="h-auto mx-auto w-60">
        <p class="text-xl">
          Gestionar los detalles del administrador
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-400">
          Aquí es donde puede ver la información de los administradores y gestionar sus accesos.
        </p>
        <div class="mt-2 mb-6">
          <base-button to="/admins/create">
            Agregar administrador
          </base-button>
        </div>
      </div>
    </div>
  </div> -->
  <div class="mt-4">
    <h1 class="sr-only">
      Recent questions
    </h1>
    <ul class="space-y-4">
      <li class="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <article aria-labelledby="question-title-81614">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixqx=ewQE7Eu8DO&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">Dries Vincent</a>
                </p>
                <p class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">
                    <time datetime="2020-12-09T11:43:00">December 9 at 11:43 AM</time>
                  </a>
                </p>
              </div>
              <div class="flex self-center flex-shrink-0">
                <div x-data="Components.menu({ open: false })" x-init="init()" class="relative inline-block text-left">
                  <div>
                    <button
                      id="options-menu-0-button"
                      type="button"
                      class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                      x-ref="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      x-bind:aria-expanded="open.toString()"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="w-5 h-5"
                        x-description="Heroicon name: solid/dots-vertical"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    x-show="open"
                    x-transition:enter="transition ease-out duration-100"
                    x-transition:enter-start="transform opacity-0 scale-95"
                    x-transition:enter-end="transform opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-75"
                    x-transition:leave-start="transform opacity-100 scale-100"
                    x-transition:leave-end="transform opacity-0 scale-95"
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-ref="menu-items"
                    x-description="Dropdown menu, show/hide based on menu state."
                    x-bind:aria-activedescendant="activeDescendant"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-0-button"
                    tabindex="-1"
                    style="display: none;"
                  >
                    <div class="py-1" role="none">
                      <a
                        id="options-menu-0-item-0"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-900 bg-gray-100"
                        x-state:on="Active"
                        x-state:off="Not Active"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/star"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Add to favorites</span>
                      </a>
                      <a
                        id="options-menu-0-item-1"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/code"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Embed</span>
                      </a>
                      <a
                        id="options-menu-0-item-2"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/flag"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span>Report content</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 id="question-title-81614" class="mt-4 text-base font-medium text-gray-900">
              What would you have done differently if you ran Jurassic Park?
            </h2>
          </div>
          <div class="mt-2 space-y-4 text-sm text-gray-700">
            <p>
              Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.
            </p>
            <p>
              Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be…
            </p>
          </div>
          <div class="flex justify-between mt-6 space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/thumb-up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium text-gray-900">29</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/chat-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">11</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">2.7k</span>
                  <span class="sr-only">views</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/share"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>

      <li class="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <article aria-labelledby="question-title-89019">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixqx=ewQE7Eu8DO&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">Lindsay Walton</a>
                </p>
                <p class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">
                    <time datetime="2020-12-08T22:45:00">December 8 at 10:45 PM</time>
                  </a>
                </p>
              </div>
              <div class="flex self-center flex-shrink-0">
                <div x-data="Components.menu({ open: false })" x-init="init()" class="relative inline-block text-left">
                  <div>
                    <button
                      id="options-menu-1-button"
                      type="button"
                      class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                      x-ref="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      x-bind:aria-expanded="open.toString()"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="w-5 h-5"
                        x-description="Heroicon name: solid/dots-vertical"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    x-show="open"
                    x-transition:enter="transition ease-out duration-100"
                    x-transition:enter-start="transform opacity-0 scale-95"
                    x-transition:enter-end="transform opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-75"
                    x-transition:leave-start="transform opacity-100 scale-100"
                    x-transition:leave-end="transform opacity-0 scale-95"
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-ref="menu-items"
                    x-description="Dropdown menu, show/hide based on menu state."
                    x-bind:aria-activedescendant="activeDescendant"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-1-button"
                    tabindex="-1"
                    style="display: none;"
                  >
                    <div class="py-1" role="none">
                      <a
                        id="options-menu-1-item-0"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        x-state:on="Active"
                        x-state:off="Not Active"

                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/star"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Add to favorites</span>
                      </a>
                      <a
                        id="options-menu-1-item-1"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/code"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Embed</span>
                      </a>
                      <a
                        id="options-menu-1-item-2"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/flag"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span>Report content</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 id="question-title-89019" class="mt-4 text-base font-medium text-gray-900">
              What's it like to be a golden retriever?
            </h2>
          </div>
          <div class="mt-2 space-y-4 text-sm text-gray-700">
            <p>
              Man I am glad you asked this question. I'm a 6 year old golden retriever and while I still have a few years left to experience, I think I've been around long enough to tell you what it's really like.
            </p>
            <p>
              Most people think being a dog is awesome. You sleep as much as you want, all of your meals are prepared for you, and someone literally picks up your poop you. And yeah, you know what, those parts <em>are</em> pretty awesome. But there's a dark side to being a golden retriever that they don't tell you about…
            </p>
          </div>
          <div class="flex justify-between mt-6 space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/thumb-up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium text-gray-900">316</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/chat-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">41</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">11.7k</span>
                  <span class="sr-only">views</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/share"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>

      <li class="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <article aria-labelledby="question-title-92742">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&amp;ixqx=ewQE7Eu8DO&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">Blake Reid</a>
                </p>
                <p class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">
                    <time datetime="2020-12-08T22:11:00">December 8 at 10:11 PM</time>
                  </a>
                </p>
              </div>
              <div class="flex self-center flex-shrink-0">
                <div x-data="Components.menu({ open: false })" x-init="init()" class="relative inline-block text-left">
                  <div>
                    <button
                      id="options-menu-2-button"
                      type="button"
                      class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                      x-ref="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      x-bind:aria-expanded="open.toString()"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="w-5 h-5"
                        x-description="Heroicon name: solid/dots-vertical"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    x-show="open"
                    x-transition:enter="transition ease-out duration-100"
                    x-transition:enter-start="transform opacity-0 scale-95"
                    x-transition:enter-end="transform opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-75"
                    x-transition:leave-start="transform opacity-100 scale-100"
                    x-transition:leave-end="transform opacity-0 scale-95"
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-ref="menu-items"
                    x-description="Dropdown menu, show/hide based on menu state."
                    x-bind:aria-activedescendant="activeDescendant"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-2-button"
                    tabindex="-1"
                    style="display: none;"
                  >
                    <div class="py-1" role="none">
                      <a
                        id="options-menu-2-item-0"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        x-state:on="Active"
                        x-state:off="Not Active"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/star"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Add to favorites</span>
                      </a>
                      <a
                        id="options-menu-2-item-1"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/code"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Embed</span>
                      </a>
                      <a
                        id="options-menu-2-item-2"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/flag"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span>Report content</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 id="question-title-92742" class="mt-4 text-base font-medium text-gray-900">
              Am I actually dead like the guy from the Sixth Sense?
            </h2>
          </div>
          <div class="mt-2 space-y-4 text-sm text-gray-700">
            <p>
              This is something most people wonder about themselves at least 4 or 5 times throughout their life. Everyone ignores you for weeks on end (including your immediate family) and the only person who will talk to you is a little boy you are treating because he thinks he sees dead people.
            </p>
            <p>
              The fact is, you can't <em>really</em> know if you're just a weird dead ghost thing until the rest of the world finally decides to acknowledge you again. But there are a few things you can test that are generally <em>correlated</em> with not being a weird dead ghost thing, namely…
            </p>
          </div>
          <div class="flex justify-between mt-6 space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/thumb-up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium text-gray-900">114</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/chat-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">19</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">987</span>
                  <span class="sr-only">views</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/share"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>

      <li class="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <article aria-labelledby="question-title-41150">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&amp;ixqx=ewQE7Eu8DO&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">Kristin Watson</a>
                </p>
                <p class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">
                    <time datetime="2020-12-08T19:11:00">December 8 at 7:11 PM</time>
                  </a>
                </p>
              </div>
              <div class="flex self-center flex-shrink-0">
                <div x-data="Components.menu({ open: false })" x-init="init()" class="relative inline-block text-left">
                  <div>
                    <button
                      id="options-menu-3-button"
                      type="button"
                      class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                      x-ref="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      x-bind:aria-expanded="open.toString()"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="w-5 h-5"
                        x-description="Heroicon name: solid/dots-vertical"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-ref="menu-items"
                    x-description="Dropdown menu, show/hide based on menu state."
                    x-bind:aria-activedescendant="activeDescendant"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-3-button"
                    tabindex="-1"
                    style="display: none;"
                  >
                    <div class="py-1" role="none">
                      <a
                        id="options-menu-3-item-0"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        x-state:on="Active"
                        x-state:off="Not Active"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/star"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Add to favorites</span>
                      </a>
                      <a
                        id="options-menu-3-item-1"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/code"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Embed</span>
                      </a>
                      <a
                        id="options-menu-3-item-2"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/flag"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span>Report content</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 id="question-title-41150" class="mt-4 text-base font-medium text-gray-900">
              What's the most unforgettable meal you've ever had?
            </h2>
          </div>
          <div class="mt-2 space-y-4 text-sm text-gray-700">
            <p>
              One time we ordered a pizza from this local place downtown we'd always wanted to try. Everyone told us it was the best pizza they'd ever had in their entire lives and we couldn't wait to see what it was all about.
            </p>
            <p>
              We placed the order at 5:45pm and it showed up at around 6:30pm. We opened the box excited to take in the aroma of this incredible pie, but we were not prepared for what we saw. Instead of the pepperoni pizza we ordered, they had delivered us a…
            </p>
          </div>
          <div class="flex justify-between mt-6 space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/thumb-up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium text-gray-900">121</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/chat-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">8</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">2.1k</span>
                  <span class="sr-only">views</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/share"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>

      <li class="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <article aria-labelledby="question-title-62760">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixqx=ewQE7Eu8DO&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">Hector Gibbons</a>
                </p>
                <p class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">
                    <time datetime="2020-12-08T18:02:00">December 8 at 6:02 PM</time>
                  </a>
                </p>
              </div>
              <div class="flex self-center flex-shrink-0">
                <div x-data="Components.menu({ open: false })" x-init="init()" class="relative inline-block text-left">
                  <div>
                    <button
                      id="options-menu-4-button"
                      type="button"
                      class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                      x-ref="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      x-bind:aria-expanded="open.toString()"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="w-5 h-5"
                        x-description="Heroicon name: solid/dots-vertical"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-ref="menu-items"
                    x-description="Dropdown menu, show/hide based on menu state."
                    x-bind:aria-activedescendant="activeDescendant"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-4-button"
                    tabindex="-1"
                    style="display: none;"
                  >
                    <div class="py-1" role="none">
                      <a
                        id="options-menu-4-item-0"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        x-state:on="Active"
                        x-state:off="Not Active"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/star"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Add to favorites</span>
                      </a>
                      <a
                        id="options-menu-4-item-1"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/code"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Embed</span>
                      </a>
                      <a
                        id="options-menu-4-item-2"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/flag"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span>Report content</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 id="question-title-62760" class="mt-4 text-base font-medium text-gray-900">
              What would your pro wrestling finishing move be?
            </h2>
          </div>
          <div class="mt-2 space-y-4 text-sm text-gray-700">
            <p>
              Great question. The first thing you need to decide is should your finishing move be something you do to hurt your opponent enough to then get the pin, or a submission move that causes your opponent to give up.
            </p>
            <p>
              Personally, I've always found submission moves to be a lot less exciting than a powerbomb or a moonsault off the top rope. Sure there's a few classics that the crowd goes nuts for like the Sharpshooter, but most of them just don't get the same pop as a Tombstone or a Stone Cold Stunner. If I had to choose, my first choice would be…
            </p>
          </div>
          <div class="flex justify-between mt-6 space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/thumb-up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium text-gray-900">1.5k</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/chat-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">117</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">21.5k</span>
                  <span class="sr-only">views</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/share"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>

      <li class="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <article aria-labelledby="question-title-41387">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&amp;ixqx=ewQE7Eu8DO&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">Jillian Steward</a>
                </p>
                <p class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">
                    <time datetime="2020-12-08T17:34:00">December 8 at 5:34 PM</time>
                  </a>
                </p>
              </div>
              <div class="flex self-center flex-shrink-0">
                <div x-data="Components.menu({ open: false })" x-init="init()" class="relative inline-block text-left">
                  <div>
                    <button
                      id="options-menu-5-button"
                      type="button"
                      class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                      x-ref="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      x-bind:aria-expanded="open.toString()"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="w-5 h-5"
                        x-description="Heroicon name: solid/dots-vertical"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-ref="menu-items"
                    x-description="Dropdown menu, show/hide based on menu state."
                    x-bind:aria-activedescendant="activeDescendant"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-5-button"
                    tabindex="-1"
                    style="display: none;"
                  >
                    <div class="py-1" role="none">
                      <a
                        id="options-menu-5-item-0"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        x-state:on="Active"
                        x-state:off="Not Active"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/star"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Add to favorites</span>
                      </a>
                      <a
                        id="options-menu-5-item-1"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/code"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Embed</span>
                      </a>
                      <a
                        id="options-menu-5-item-2"
                        href="#"
                        class="flex px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <svg
                          class="w-5 h-5 mr-3 text-gray-400"
                          x-description="Heroicon name: solid/flag"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span>Report content</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 id="question-title-41387" class="mt-4 text-base font-medium text-gray-900">
              How on earth do magnets work though seriously?
            </h2>
          </div>
          <div class="mt-2 space-y-4 text-sm text-gray-700">
            <p>
              Magnets are an incredibly interesting natural phenomenon, with their discovery dating back at least 2500 years.
            </p>
            <p>
              Scientists will tell you a bunch of stuff about how in magnetic materials, most of the electrons spin in the same direction. Somehow that apparently magically makes random bits of metal stick together. Sure, okay scientists. Here's the truth, what they don't want you to know…
            </p>
          </div>
          <div class="flex justify-between mt-6 space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/thumb-up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium text-gray-900">776</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/chat-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">27</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium text-gray-900">6.2k</span>
                  <span class="sr-only">views</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <svg
                    class="w-5 h-5"
                    x-description="Heroicon name: solid/share"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Admins',
  layout: 'default'
}
</script>
