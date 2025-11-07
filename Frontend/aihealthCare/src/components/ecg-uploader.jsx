"use client"

import React from "react"

import { useRef, useState } from "react"
import { Button } from "../components/ui/button"
import { Upload, FileIcon, X } from "lucide-react"



const ACCEPTED_FORMATS = [".mat", ".csv", ".edf", ".dat"]
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export default function ECGUploader({ onFileUpload, isLoading, disabled }) {
    const fileInputRef = useRef(null)
    const [dragActive, setDragActive] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [validationError, setValidationError] = useState(null)

    const validateFile = (file) => {
        // Check file type
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
        if (!ACCEPTED_FORMATS.includes(fileExtension)) {
            setValidationError(`Invalid file format. Accepted formats: ${ACCEPTED_FORMATS.join(", ")}`)
            return false
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            setValidationError("File size exceeds 50MB limit")
            return false
        }

        return true
    }

    const handleFileSelect = (files) => {
        setValidationError(null)
        const newFiles = []
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                newFiles.push(files[i])
            } else {
                return // Stop on first invalid file
            }
        }
        setSelectedFiles((prev) => [...prev, ...newFiles])
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        handleFileSelect(e.dataTransfer.files)
    }

    const handleFileInputChange = (e) => {
        if (e.target.files) {
            handleFileSelect(e.target.files)
        }
    }

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            onFileUpload(selectedFiles)
            setSelectedFiles([])
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const removeFile = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleClear = () => {
        setSelectedFiles([])
        setValidationError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div className="w-full">
            <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Upload ECG Files</h2>

                {/* Drop Zone */}
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${dragActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={ACCEPTED_FORMATS.join(",")}
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={disabled}
                    />

                    {selectedFiles.length === 0 ? (
                        <div>
                            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                Drag and drop your ECG files here
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">or</p>
                            <Button onClick={() => fileInputRef.current?.click()} variant="outline" disabled={disabled}>
                                Browse Files
                            </Button>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                                Supported formats: {ACCEPTED_FORMATS.join(", ")} (Max 50MB per file)
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-3 rounded"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        <div className="text-left">
                                            <p className="font-medium text-slate-900 dark:text-white text-sm">{file.name}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
                                        aria-label={`Remove ${file.name}`}
                                    >
                                        <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    </button>
                                </div>
                            ))}
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                size="sm"
                                disabled={disabled}
                                className="mt-4 w-full"
                            >
                                Add More Files
                            </Button>
                        </div>
                    )}
                </div>

                {/* Validation Error */}
                {validationError && (
                    <div className="mt-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-sm text-red-800 dark:text-red-200">{validationError}</p>
                    </div>
                )}

                {/* Upload Button */}
                {selectedFiles.length > 0 && !validationError && (
                    <div className="mt-6 flex gap-3">
                        <Button onClick={handleUpload} disabled={disabled || selectedFiles.length === 0} className="flex-1">
                            {isLoading
                                ? "Processing..."
                                : `Analyze ${selectedFiles.length} File${selectedFiles.length !== 1 ? "s" : ""}`}
                        </Button>
                        <Button onClick={handleClear} variant="outline" disabled={disabled}>
                            Clear
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
