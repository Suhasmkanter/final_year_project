"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"



export default function PredictionListView({ predictingAll, images, onSelectImage }) {
    const predictedImages = images.filter((img) => img.prediction)

    return (
        <div className="space-y-3">
            {predictedImages.map((image) => (
                <Card
                    key={image.id}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onSelectImage(image)}
                >
                    <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0">
                            <img
                                src={image.preview || "/placeholder.svg"}
                                alt={image.file.name}
                                className="w-20 h-20 object-cover rounded border border-border"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{image.file.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Tumor Type: <span className="font-semibold text-foreground">{image.prediction?.type}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Confidence:{" "}
                                <span className="font-semibold text-primary">{(image.prediction?.confidence * 100).toFixed(1)}%</span>
                            </p>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                </Card>
            ))}
        </div>
    )
}
