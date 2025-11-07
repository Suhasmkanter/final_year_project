"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Download, CheckCircle2, XCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"



const DISEASE_LABELS = {
    NORM: "Normal",
    MI: "Myocardial Infarction",
    STTC: "ST-T Changes",
    CD: "Conduction Defect",
    HYP: "Hypertrophy",
}

export default function ECGResults({ data, fileName }) {
    console.log(data, fileName)
    const [downloading, setDownloading] = useState(false)

    const chartData = data[0].predictions.map(pred =>
        Object.entries(pred.probabilities).map(([disease, confidence]) => ({
            name: DISEASE_LABELS[disease] || disease,
            confidence: Math.round(confidence * 100),
            // Use confidence directly or set a fixed threshold if needed
            threshold: 50 // or any threshold you want to compare against
        }))
    ).flat();


    const getPrediction = (confidence, threshold) => {
        console.log(confidence, threshold)
        return confidence >= threshold
    }

    const downloadReport = () => {
        setDownloading(true)

        const timestamp = new Date().toISOString().split("T")[0]
        const csvContent = [
            ["ECG Analysis Report"],
            [`File: ${fileName}`],
            [`Date: ${new Date().toLocaleString()}`],
            [],
            ["Disease/Condition", "Confidence (%)", "Threshold (%)", "Prediction"],
            ...Object.entries(data.predictions).map(([disease, confidence]) => [
                DISEASE_LABELS[disease],
                Math.round(confidence * 100),
                Math.round((data.optimized_thresholds[data.optimized_thresholds] || 0) * 100),
                getPrediction(confidence, data.optimized_thresholds[data.optimized_thresholds] || 0)
                    ? "Positive"
                    : "Negative",
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `ecg-report-${timestamp}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        setDownloading(false)
    }
    console.log(data, 'helloDataBro Hi here ')

    return (
        <div className="space-y-8">
            {/* Results Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Analysis Results</h2>
                    <Button
                        onClick={downloadReport}
                        disabled={downloading}
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                    >
                        <Download className="h-4 w-4" />
                        {downloading ? "Downloading..." : "Download Report"}
                    </Button>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    File: <span className="font-medium">{fileName}</span>
                </p>

                {/* Disease Predictions Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    {Object?.entries(data[0]?.predictions).map(([disease, confidence]) => {
                        const threshold = 0.50
                        const confidencePercent = Math.round(confidence.confidence * 100)
                        const thresholdPercent = Math.round(threshold * 100)

                        const isPredictedPositive = getPrediction(confidence.confidence, threshold)
                        console.log(confidence, isPredictedPositive)
                        return (
                            <div
                                key={disease}
                                className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-slate-50 dark:bg-slate-700/50"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{DISEASE_LABELS[disease]}</h3>
                                    {isPredictedPositive ? (
                                        <CheckCircle2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    )}
                                </div>

                                {/* Confidence Bar */}
                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Confidence</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{confidencePercent}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${confidencePercent}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Prediction Result */}
                                <div className="flex items-center justify-between text-sm">
                                    {/* <span className="text-slate-600 dark:text-slate-400">Threshold: {thresholdPercent}%</span> */}
                                    <span
                                        className={`font-semibold px-3 py-1 rounded-full text-xs ${isPredictedPositive
                                            ? "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200"
                                            : "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200"
                                            }`}
                                    >
                                        {isPredictedPositive ? "Positive" : "Negative"}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Confidence Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="name" stroke="var(--color-foreground)" style={{ fontSize: "12px" }} />
                        <YAxis stroke="var(--color-foreground)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-card)",
                                border: `1px solid var(--color-border)`,
                                borderRadius: "8px",
                                color: "var(--color-foreground)",
                            }}
                        />
                        <Legend />
                        <Bar dataKey="confidence" fill="var(--color-chart-1)" name="Confidence (%)" radius={[8, 8, 0, 0]} />
                        {/* <Bar dataKey="threshold" fill="var(--color-chart-2)" name="Threshold (%)" radius={[8, 8, 0, 0]} /> */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
