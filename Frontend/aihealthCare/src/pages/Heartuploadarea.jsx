"use client"

import { useState } from "react"
import ECGUploader from "../components/ecg-uploader"
import FileListResults from "../components/file-list-results"
import { Spinner } from "@/components/ui/spinner"


export default function Home({ detectionType }) {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleFileUpload = async (files) => {
        setError(null)
        setLoading(true)

        for (const file of files) {
            const formData = new FormData()
            formData.append('Diseasetype', detectionType)
            formData.append("ecg_files", file)
            alert('working ')
            try {
                const response = await fetch("https://disease-detection-app.onrender.com/predict/heartdisease", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.error || "Failed to process ECG file")
                }

                const data = await response.json()
                console.log(data)
                setResults((prev) => [...prev, { fileName: file.name, data: data.data }])
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            }
        }

        setLoading(false)
    }

    const handleClearResults = () => {
        setResults([])
        setError(null)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-2 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Main Content */}
                <div className="grid gap-8">
                    {/* Upload Section */}
                    <ECGUploader onFileUpload={handleFileUpload} isLoading={loading} disabled={loading} />

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <Spinner className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                            <p className="text-slate-600 dark:text-slate-400">Processing ECG files...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Error</h3>
                            <p className="text-red-800 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    {/* Results Section with File List and Pagination */}
                    {results.length > 0 && !loading && <FileListResults results={results} onClear={handleClearResults} />}
                </div>
            </div>
        </main>
    )
}
