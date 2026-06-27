<script lang="ts" setup>
import { useJSONStore } from '~/stores/jsonStore';
import { useFileParser } from '~/composables/useFileParser'

const store = useJSONStore()
const { parseJSON } = useFileParser()
const files = ref<File | null>(null)

watch(files, async (val) => {
  const file = Array.isArray(val) ? val[0] : val
  if (!file) return

//   if (!isValidFile(file)) {
//     toast.add({
//         title: 'Format file tidak sesuai',
//         description: 'Hanya Excel (.xlsx/.xls) yang diperbolehkan',
//         color: 'warning'
//     })
//     files.value = null
//     return
//   }

  const result = await parseJSON(file)

  console.log("result: ", result)

  store.setData(result.headers, result.rows)
  store.setFileName(file.name)
})

const hasData = computed(() =>
  store.headers.length > 0 && store.rows.length > 0
)

const resetAll = async () => {
  store.reset()

  await nextTick()
  files.value = null
}
</script>
<template>
<div class="flex flex-col gap-5">
    <ClientOnly>
        <UContainer class="mt-0 justify-items-start pt-5 md:grid md:grid-rows-[max-content] md:justify-center md:items-start md:pt-8 md:pb-5">
            <UCard class="w-full md:w-115">
                <UFileUpload :preview="false" accept="application/json" label="Drag file disini" description="Hanya format .json" class="w-full min-h-48" v-model="files"/>
            </UCard>
        </UContainer>
        <UContainer>
            <EditableJSON/>
        </UContainer>
    </ClientOnly>
</div>
</template>