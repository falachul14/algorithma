import * as XLSX from 'xlsx'

export const useFileParser = () => {
  const parseExcel = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer)

    const sheetName = workbook.SheetNames?.[0]
    if (!sheetName) {
      return { headers: [], rows: [] }
    }

    const sheet = workbook.Sheets[sheetName]

    if (!sheet) {
      return { headers: [], rows: [] }
    }

    const json = XLSX.utils.sheet_to_json(sheet, { defval: '' })

    const headers =
      json.length > 0 && json[0]
        ? Object.keys(json[0] as Record<string, any>)
        : []

    return { headers, rows: json }
  }

  const parseJSON = async (file: File) => {
  const text = await file.text()
  const data = JSON.parse(text)

  // CASE 1: array of object (normal table)
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const headers = Object.keys(data[0])

    return {
      headers,
      rows: data
    }
  }

  // CASE 2: single object
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const headers = Object.keys(data)

    return {
      headers,
      rows: [data]
    }
  }

  // CASE 3: fallback (primitive / invalid)
  return {
    headers: [],
    rows: []
  }
}

  return { parseExcel, parseJSON }
}