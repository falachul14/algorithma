import { defineStore } from 'pinia'

export const useJSONStore = defineStore('json_document', {
  state: () => ({
    headers: [] as string[],
    rows: [] as Record<string, any>[],
    fileName: '' as string
  }),

  actions: {
    addColumn(key: string) {
  if (!key) return

  // hindari duplicate header
  if (this.headers.includes(key)) return

  this.headers.push(key)

  // tambahkan field ke semua row
  this.rows.forEach(row => {
    row[key] = ''
  })
},

removeRow(index: number) {
  this.rows.splice(index, 1)
},

removeColumn(key: string) {
  this.headers = this.headers.filter(h => h !== key)

  this.rows.forEach(row => {
    delete row[key]
  })
},
    setFileName(name: string) {
      this.fileName = name
    },

    setData(headers: string[], rows: any[]) {
      this.headers = headers
      this.rows = rows.map(r => ({ ...r }))
    },

    updateCell(row: number, key: string, value: any) {
      if (!this.rows[row]) this.rows[row] = {}
      this.rows[row][key] = value
    },

    addRow() {
      const empty: Record<string, any> = {}
      this.headers.forEach(h => (empty[h] = ''))
      this.rows.push(empty)
    },

    reset() {
      this.headers = []
      this.rows = []
      this.fileName = ''
    },
    exportJSON(customName?: string) {
      const fileName =
        customName ||
        this.fileName?.replace(/\.[^/.]+$/, '') + '.json' ||
        'document.json'

      const payload = {
        fileName: this.fileName,
        exportedAt: new Date().toISOString(),
        headers: this.headers,
        rows: this.rows
      }

      const jsonString = JSON.stringify(payload, null, 2)

      const blob = new Blob([jsonString], {
        type: 'application/json'
      })

      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()

      URL.revokeObjectURL(url)
    }
  },

  persist: {
    key: 'document_json_store'
  }
})