import { type NextRequest, NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

interface ContactData {
  name: string
  email: string
  message: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create or append to Excel-like CSV that can be imported to Excel
    await saveContactToExcel({ name, email, message, timestamp: new Date().toISOString() })

    console.log("Contact form submission:", { name, email, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

async function saveContactToExcel(data: ContactData) {
  try {
    // Use public folder or create a data folder
    const dataDir = path.join(process.cwd(), "public", "data")
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const filePath = path.join(dataDir, "contacts.csv")
    
    // Format data for CSV
    const csvLine = `"${escapeCSV(data.name)}","${escapeCSV(data.email)}","${escapeCSV(data.message)}","${data.timestamp}"\n`

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Create new file with headers
      const header = `"Name","Email","Message","Timestamp"\n`
      fs.writeFileSync(filePath, header + csvLine)
    } else {
      // Append to existing file
      fs.appendFileSync(filePath, csvLine)
    }

    console.log("✅ Contact saved to CSV:", filePath)

    // Also try to create Excel file if possible
    try {
      await createExcelFile(dataDir)
    } catch (excelError) {
      console.log("Excel conversion skipped, but CSV saved successfully:", excelError)
    }
  } catch (error) {
    console.error("Error saving contact data:", error)
    throw error
  }
}

function escapeCSV(str: string): string {
  // Escape double quotes and remove line breaks
  return str.replace(/"/g, '""').replace(/\n/g, " ").replace(/\r/g, " ")
}

async function createExcelFile(dataDir: string) {
  try {
    // Dynamically import exceljs only when needed
    const ExcelJS = (await import("exceljs")).default

    const csvPath = path.join(dataDir, "contacts.csv")
    const excelPath = path.join(dataDir, "contacts.xlsx")

    // Read CSV and create Excel
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Contacts")

    // Add headers
    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Message", key: "message", width: 50 },
      { header: "Timestamp", key: "timestamp", width: 25 },
    ]

    // Read CSV and add rows
    const csvContent = fs.readFileSync(csvPath, "utf-8")
    const lines = csvContent.split("\n").slice(1) // Skip header

    lines.forEach((line) => {
      if (line.trim()) {
        const [name, email, message, timestamp] = parseCSVLine(line)
        worksheet.addRow({ name, email, message, timestamp })
      }
    })

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4F46E5" },
    }

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      if (column.width) {
        column.width = Math.min(column.width, 50)
      }
    })

    await workbook.xlsx.writeFile(excelPath)
    console.log("✅ Excel file created:", excelPath)
  } catch (error) {
    console.log("Excel library not available, CSV saved instead")
    throw error
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}
