import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ImageResultDialog({ image, open, onOpenChange }) {
    if (!image) return null;
    console.log(image.prediction);
    const hasError = !!image?.prediction?.error;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="truncate">{image?.file?.name}</DialogTitle>
                    <DialogDescription className="text-sm text-gray-400">
                        {hasError ? "Prediction failed" : "Detailed prediction and analysis"}
                    </DialogDescription>
                </DialogHeader>

                {hasError ? (
                    <div className="my-8 p-6 bg-red-600/40 rounded-xl text-center text-red-100 font-semibold">
                        {image.prediction.error}
                    </div>
                ) : (
                    <>
                        {/* Visualization */}
                        <section className="my-4">
                            <h3 className="text-lg font-semibold mb-2 text-primary-foreground/80">
                                Visualization
                            </h3>
                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 flex justify-center">
                                <img
                                    src={image?.prediction?.gradcam || image?.preview}
                                    alt="Grad-CAM Visualization"
                                    className="max-w-full max-h-[60vh] sm:max-h-[400px] object-contain"
                                />
                            </div>
                            <p className="text-sm text-gray-400 mt-2 text-center">
                                Highlighted regions show where the model focused attention during prediction.
                            </p>
                        </section>

                        {/* Prediction Summary */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                            <div className="p-4 rounded-2xl bg-white/10">
                                <p className="text-sm text-gray-400 mb-1">Tumor Type</p>
                                <p className="text-xl sm:text-2xl font-bold text-white break-words">
                                    {image?.prediction?.type}
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/10">
                                <p className="text-sm text-gray-400 mb-1">Confidence Score</p>
                                <p className="text-xl sm:text-2xl font-bold text-green-400">
                                    {(image?.prediction?.confidence * 100).toFixed(1)}%
                                </p>
                            </div>
                        </section>

                        {/* Analysis Details */}
                        <section className="my-4">
                            <h3 className="text-lg font-semibold mb-2 text-primary-foreground/80">Analysis Details</h3>
                            <div className="grid gap-3">
                                <Detail label="Model Used" value="VGG16 (Transfer Learning)" />
                                <Detail label="Image Resolution" value="512x512 pixels" />
                                <Detail label="Prediction Status" value="Completed" color="text-green-400" />
                            </div>
                        </section>

                        {/* Confidence Breakdown */}
                        <section className="my-4">
                            <h3 className="text-lg font-semibold mb-2 text-primary-foreground/80">Confidence Breakdown</h3>
                            <div className="space-y-2">
                                {Object.entries(image?.prediction?.probabilities || {}).map(([label, prob], i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                                            <span className="text-gray-400 truncate">{label}</span>
                                            <span className="font-semibold">{(prob * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${prob * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                <DialogFooter>
                    <Button variant="secondary" className="w-full" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

function Detail({ label, value, color }) {
    return (
        <div className="flex justify-between items-center bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base">
            <span className="text-gray-400">{label}</span>
            <span className={`font-semibold ${color || ""}`}>{value}</span>
        </div>
    );
}
