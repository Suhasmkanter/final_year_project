"use client"

import { X, Loader2, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"


export default function ImagePreview({ clickopen, setclickOpen, predictionDone, image, onRemove, onPredict, onSelectImage }) {
    console.log("Rendering ImagePreview for image:", image?.prediction?.type, image?.prediction?.confidence)
    return (
        <Card onClick={predictionDone ? () => {
            setclickOpen(!clickopen)
            onSelectImage(image)
        } : null
        } className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/30" >
            {/* Image Container */}
            < div className="relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden group" >
                <img
                    src={image.preview || "/placeholder.svg"}
                    alt={image.file.name}
                    className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-300"
                />

                <button
                    onClick={() => onRemove(image.id)}
                    className="absolute top-3 right-3 bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
                    title="Remove image"
                >
                    <X className="w-4 h-4" />
                </button>

                {
                    image.loading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                    )
                }

                {
                    image.prediction && !image.loading && (
                        <div className="absolute top-3 left-3 bg-green-500/90 text-white rounded-full p-2 shadow-lg backdrop-blur-sm">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    )
                }
            </div >

            {/* Content Container */}
            < div className="p-5 space-y-4" >
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">File</p>
                    <p className="text-sm font-medium text-foreground truncate hover:text-clip" title={image.file.name}>
                        {image.file.name}
                    </p>
                </div>

                {
                    image.prediction && (
                        <div className="space-y-4">
                            <div className="space-y-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/10">
                                {/* Tumor Type */}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tumor Type</p>
                                    <div className="inline-block bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
                                        {image.prediction.type}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Confidence</p>
                                        <span className="text-sm font-bold text-primary">
                                            {(image.prediction.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                                            style={{ width: `${image.prediction.confidence * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                }
            </div >
        </Card >
    )
}
