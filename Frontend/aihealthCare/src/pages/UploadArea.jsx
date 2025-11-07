"use client"


import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImagePreview from "../components/imagepreview"
import PredictionListView from "../components/prediction-list-view"
import PredictionDetailModal from "../components/prediction-detail-modal"



export default function UploadArea({ detectionType }) {
    const [images, setImages] = useState([])
    const [dragActive, setDragActive] = useState(false)
    const [viewMode, setViewMode] = useState("grid")
    const [selectedImage, setSelectedImage] = useState(null)
    const [predictingAll, setPredictingAll] = useState(false)
    const [predictionDone, setpredictionDone] = useState(false)
    const [clickOpen, setclickOpen] = useState(false)
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

        const files = e.dataTransfer.files
        processFiles(files)
    }

    const handleFileInput = (e) => {
        if (e.target.files) {
            processFiles(e.target.files)
        }
    }

    const processFiles = (files) => {
        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const newImage = {
                        id: Math.random().toString(36).substr(2, 9),
                        file,
                        preview: e.target?.result,
                    }
                    setImages((prev) => [...prev, newImage])
                }
                reader.readAsDataURL(file)
            }
        })
    }

    const removeImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id))
    }


    const predictImage = async (id) => {

    }

    const predictAll = async () => {
        setPredictingAll(true)

        // Set all images to loading state
        setImages((prev) =>
            prev.map((img) => ({
                ...img,
                loading: true,
            })),
        )

        // Prepare form data
        const formdata = new FormData()
        formdata.append('Diseasetype', detectionType)
        images.forEach((img) => formdata.append("images", img.file))

        try {
            const response = await fetch('http://localhost:3000/predict/braintumor', {
                method: 'POST',
                body: formdata,
            })
            const data = await response.json()
            console.log("Batch prediction response:", data)

            // Map API results to images state
            const predictions = data.predictions
            setpredictionDone(true)
            setImages((prev) =>
                prev.map((img, idx) => {
                    const prediction = predictions[idx] || {}
                    return {
                        ...img,
                        loading: false,
                        prediction: {
                            type: prediction.disease || "Unknown",
                            confidence: prediction.confidence || 0,
                            probabilities: prediction.probabilities || [],
                            gradcam: prediction.gradcam || null, // placeholder if you add Grad-CAM later
                            model_name: prediction.model_name || "",
                            image_pixels: prediction.image_pixels || [],
                            error: prediction.error || null
                        },
                    }
                }),
            )
        } catch (error) {
            console.error("Error during batch prediction:", error)
            // Reset loading in case of error
            setImages((prev) =>
                prev.map((img) => ({
                    ...img,
                    loading: false,
                })),
            )
        } finally {
            setPredictingAll(false)
        }
    }


    const exportResults = () => {
        if (!images || images.length === 0) {
            alert("No predictions available to export.")
            return
        }

        // Filter only those with predictions
        const predictedImages = images.filter(img => img.prediction)
        if (predictedImages.length === 0) {
            alert("No prediction data found.")
            return
        }

        // Build CSV headers
        let csvContent = "Filename,Disease,Confidence,Probabilities\n"

        // Build each row
        predictedImages.forEach(img => {
            const fileName = img.file.name
            const disease = img.prediction.type
            const confidence = (img.prediction.confidence * 100).toFixed(2) + "%"

            // Convert probabilities object to string like "glomia:0.01, meningioma:0.98, ..."
            const probabilities = Object.entries(img.prediction.probabilities || {})
                .map(([label, value]) => `${label}:${(value * 100).toFixed(2)}%`)
                .join(" | ")

            csvContent += `${fileName},${disease},${confidence},"${probabilities}"\n`
        })

        // Create blob and trigger download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `brain_tumor_predictions_${new Date().toISOString().split("T")[0]}.csv`
        link.click()
        URL.revokeObjectURL(url)
    }


    const hasUnpredictedImages = images.some((img) => !img.prediction)
    const hasPredictions = images.some((img) => img.prediction)
    console.log("Rendered with images:", images)
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 relative">


            {/* Upload Area */}
            <Card
                className={`border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border"
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <label htmlFor="file-input" className="cursor-pointer">

                    <input type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" id="file-input" />
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Drag and drop your MRI images here</h3>
                    <p className="text-muted-foreground mb-4">or click to select files</p>
                    <Button onClick={() => document.getElementById("file-input").click()} variant="default">Select Files</Button>
                </label>
            </Card>

            {/* Images Section */}
            {images.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-foreground">
                            {images.length} image{images.length !== 1 ? "s" : ""} uploaded
                        </h3>
                        <div className="flex gap-3">
                            {hasUnpredictedImages && (
                                <Button onClick={predictAll} disabled={predictingAll} className='bg-black text-white'>
                                    {predictingAll ? "Predicting All..." : "Predict All"}
                                </Button>
                            )}
                            {hasPredictions && (
                                <>
                                    <Button onClick={() => setViewMode("grid")} variant={viewMode === "grid" ? "default" : "outline"}>
                                        Grid View
                                    </Button>
                                    <Button onClick={() => setViewMode("list")} variant={viewMode === "list" ? "default" : "outline"}>
                                        List View
                                    </Button>
                                    <Button onClick={exportResults} variant="outline">
                                        Export Results (CSV)
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Grid View */}
                    {viewMode === "grid" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {images.map((image) => (
                                <ImagePreview clickopen={clickOpen} setclickOpen={setclickOpen} predictionDone={predictionDone} onSelectImage={setSelectedImage} key={image.id} image={image} onRemove={removeImage} onPredict={predictImage} />
                            ))}
                        </div>
                    )}

                    {/* List View */}
                    {viewMode === "list" && hasPredictions && (
                        <PredictionListView images={images} onSelectImage={setSelectedImage} />
                    )}
                </div>
            )}

            {images.length === 0 && (
                <div className="mt-12 text-center py-12">
                    <p className="text-muted-foreground">No images uploaded yet</p>
                </div>
            )}

            {selectedImage && <PredictionDetailModal open={clickOpen} image={selectedImage} onOpenChange={() => {
                setclickOpen(!clickOpen)
                setSelectedImage(null)
            }} />}
        </div>
    )
}
