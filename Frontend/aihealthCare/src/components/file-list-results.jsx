"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import ECGResults from "../components/ecg-results"
import { Download, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"

const ITEMS_PER_PAGE = 6



export default function FileListResults({ results, onClear }) {
    console.log(results, 'Hello Results Bro ')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedFileIndex, setSelectedFileIndex] = useState(null)
    const [downloading, setDownloading] = useState(false)

    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentFiles = results.slice(startIndex, endIndex)

    const downloadAllReports = async () => {
        setDownloading(true)
        try {
            // Create individual CSV files for each result
            const csvFiles = results.map((result, index) => {
                const timestamp = new Date().toISOString().split("T")[0]
                const csvContent = [
                    ["ECG Analysis Report"],
                    [`File: ${result.fileName}`],
                    [`Date: ${new Date().toLocaleString()}`],
                    [],
                    ["Disease/Condition", "Confidence (%)", "Threshold (%)", "Prediction"],
                    ...Object.entries(result.data.predictions).map(([disease, confidence]) => {
                        const threshold =
                            result.data.optimized_thresholds[result.data.optimized_thresholds] || 0
                        const diseaseLabels = {
                            NORM: "Normal",
                            MI: "Myocardial Infarction",
                            STTC: "ST-T Changes",
                            CD: "Conduction Defect",
                            HYP: "Hypertrophy",
                        }
                        return [
                            diseaseLabels[disease],
                            Math.round(confidence * 100),
                            Math.round(threshold * 100),
                            confidence >= threshold ? "Positive" : "Negative",
                        ]
                    }),
                ]
                    .map((row) => row.join(","))
                    .join("\n")

                const baseFileName = result.fileName.split(".")[0]
                return {
                    name: `ecg-report-${baseFileName}-${index + 1}.csv`,
                    content: csvContent,
                }
            })

            // Create a simple text file with all reports
            const allReportsContent = csvFiles
                .map((file) => {
                    return `${file.name}\n${"=".repeat(50)}\n${file.content}\n\n`
                })
                .join("")

            // Download as single text file for now (simplified approach)
            const blob = new Blob([allReportsContent], { type: "text/plain" })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `ecg-reports-all-${new Date().toISOString().split("T")[0]}.txt`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header with actions */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Analysis Results</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {results.length} file{results.length !== 1 ? "s" : ""} analyzed
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={downloadAllReports}
                            disabled={downloading}
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                        >
                            <Download className="h-4 w-4" />
                            {downloading ? "Downloading..." : "Download All"}
                        </Button>
                        <Button onClick={onClear} variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Trash2 className="h-4 w-4" />
                            Clear
                        </Button>
                    </div>
                </div>
            </div>

            {/* File List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFiles.map((result, index) => {
                    const actualIndex = startIndex + index
                    return (
                        <button
                            key={actualIndex}
                            onClick={() => setSelectedFileIndex(actualIndex)}
                            className="text-left bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {result.fileName}
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                                        {(results[0]?.data[0]?.predictions?.some(
                                            pred => pred.predicted_label !== "NORM"
                                        )
                                            ? "Conditions detected"
                                            : "Normal")}
                                    </p>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Detail Dialog */}
            {selectedFileIndex !== null && results[selectedFileIndex] && (
                <Dialog open={selectedFileIndex !== null} onOpenChange={() => setSelectedFileIndex(null)}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{results[selectedFileIndex].fileName}</DialogTitle>
                        </DialogHeader>
                        <ECGResults data={results[selectedFileIndex].data} fileName={results[selectedFileIndex].fileName} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
