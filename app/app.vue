<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'light'
  }
})
</script>
<template>
  <UApp color-mode="light">
    <div class="flex flex-row">
      <main class="view flex-col line-height-[initial] flex w-full flex-wrap min-w-307.5 pb-10">
        <div class="relative flex w-full flex-wrap justify-center">
          <section class="relative flex shrink-0 flex-col w-full text-left">
            <div>
              <div class="md:shadow-[0_2px_4px_0_#00000026]">
                <div class="w-full max-w-292.5 mx-auto flex justify-start px-4 py-5 text-center md:grid md:grid-cols-3 md:items-center md:justify-center md:px-2.5 md:py-5.5">
                  <div></div>
                  <div class="flex items-center justify-center gap-3">
                    <NuxtLink to="/" class="aria-[current=page]:text-primary hover:text-primary">Excel Editor</NuxtLink>
                    <NuxtLink to="/json" class="aria-[current=page]:text-primary hover:text-primary">JSON Editor</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="relative flex w-full flex-wrap justify-center">
          <div class="relative flex shrink-0 flex-col w-full text-left">
            <NuxtPage />
          </div>
        </div>
      </main>
    </div>
  </UApp>
</template>
