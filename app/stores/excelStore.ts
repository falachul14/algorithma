import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'

export const useExcelStore = defineStore('excel_document', {
  state: () => ({
    headers: [] as string[],
    rows: [] as Record<string, any>[],
    fileName: '' as string
  }),

  actions: {
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

    exportExcel(customName?: string) {
      const fileName =
        customName ||
        this.fileName?.replace(/\.[^/.]+$/, '') + '.xlsx' ||
        'document.xlsx'

      const orderedRows = this.rows.map(row => {
        const obj: Record<string, any> = {}

        this.headers.forEach(h => {
          obj[h] = row[h] ?? ''
        })

        return obj
      })

      const worksheet = XLSX.utils.json_to_sheet(orderedRows)

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

      XLSX.writeFile(workbook, fileName)
    }
  },

  persist: {
    key: 'document_excel_store'
  }
})