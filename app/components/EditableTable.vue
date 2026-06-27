<script setup lang="ts">
import { useExcelStore } from '~/stores/excelStore'

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const store = useExcelStore()

const onInput = (row: number, key: string, e: Event) => {
  const value = (e.target as HTMLInputElement).value
  store.updateCell(row, key, value)
}

const focusCell = (row: number, col: number) => {
  const el = document.querySelector(
    `input[data-row="${row}"][data-col="${col}"]`
  ) as HTMLInputElement | null

  el?.focus()
}

const onKeyDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement
  const row = Number(target.dataset.row)
  const col = Number(target.dataset.col)

  const maxRow = store.rows.length - 1
  const maxCol = store.headers.length - 1

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      focusCell(Math.min(row + 1, maxRow), col)
      break

    case 'ArrowUp':
      e.preventDefault()
      focusCell(Math.max(row - 1, 0), col)
      break

    case 'ArrowRight':
      e.preventDefault()
      focusCell(row, Math.min(col + 1, maxCol))
      break

    case 'ArrowLeft':
      e.preventDefault()
      focusCell(row, Math.max(col - 1, 0))
      break

    case 'Enter':
      e.preventDefault()
      focusCell(Math.min(row + 1, maxRow), col)
      break

    case 'Tab':
      e.preventDefault()
      focusCell(row, Math.min(col + 1, maxCol))
      break
  }
}
</script>
<template>
    <div class="flex flex-col gap-5">
        <div class="flex justify-between items-center">
            <div>
                <h4 class="font-semibold text-xl">Nama file: {{ store.fileName }}</h4>
            </div>
            <div class="flex flex-row gap-3 items-center">
                <UButton icon="i-lucide-trash" color="error" class="cursor-pointer" @click="emit('reset')">Hapus</UButton>
                <UButton icon="i-lucide-download" class="cursor-pointer" @click="store.exportExcel()">Download</UButton>
            </div>
        </div>
        <div class="overflow-auto border rounded">
          <table class="min-w-full border-collapse">
            <thead>
              <tr>
                <th class="border p-2 bg-gray-100">#</th>
                <th
                  v-for="h in store.headers"
                  :key="h"
                  class="border p-2 bg-gray-100"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in store.rows" :key="i">
                <td class="border p-2 bg-gray-50 text-center w-12">
                  {{ i + 1 }}
                </td>
                <td
                  v-for="(h, j) in store.headers"
                  :key="h"
                  class="border p-0"
                >
                  <input
                    class="w-full p-2 outline-none focus:bg-blue-50"
                    :value="row[h] ?? ''"
                    :data-row="i"
                    :data-col="j"
                    @input="onInput(i, h, $event)"
                    @keydown="onKeyDown($event)"
                  />
                </td>
              </tr>
            </tbody>
      
          </table>
        </div>
    </div>
</template>