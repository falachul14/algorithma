<script setup lang="ts">
import { useJSONStore } from '~/stores/jsonStore'

const store = useJSONStore()

const onInput = (row: number, key: string, e: Event) => {
  const value = (e.target as HTMLInputElement).value
  store.updateCell(row, key, value)
}

const addColumnPrompt = () => {
  const key = prompt('Nama field baru (contoh: age, city)')
  if (key) store.addColumn(key)
}
</script>

<template>
  <div class="flex flex-col gap-4">

    <!-- Toolbar -->
    <div class="flex justify-between items-center">
      <h3 class="font-semibold text-lg">JSON Editor</h3>

      <div class="flex gap-2">
        <UButton size="sm" @click="store.addRow()">+ Row</UButton>
        <UButton size="sm" @click="addColumnPrompt()">+ Column</UButton>
        <UButton size="sm" color="error" @click="store.reset()">Reset</UButton>
      </div>
    </div>

    <!-- TABLE -->
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
              <div class="flex justify-between items-center">
                <span>{{ h }}</span>
                <button
                  class="text-red-500"
                  @click="store.removeColumn(h)"
                >
                  ✕
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, i) in store.rows" :key="i">
            <td class="border p-2 text-center bg-gray-50">
              {{ i + 1 }}
            </td>

            <td
              v-for="h in store.headers"
              :key="h"
              class="border p-0"
            >
              <input
                class="w-full p-2 outline-none focus:bg-blue-50"
                :value="row[h] ?? ''"
                @input="onInput(i, h, $event)"
              />
            </td>

            <td class="border p-2 text-center">
              <button
                class="text-red-500"
                @click="store.removeRow(i)"
              >
                delete
              </button>
            </td>

          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>