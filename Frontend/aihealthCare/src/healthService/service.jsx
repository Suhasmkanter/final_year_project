"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import { Image } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { ChevronLeft, Upload, Heart, Brain, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import './healthservice.css'
import Navbar from "@/landingpage/navbar"
import UploadArea from "@/pages/UploadArea"
import Home from "@/pages/Heartuploadarea"
export default function PredictionPage() {
    const [detectionType, setDetectionType] = useState(null)
    const [image, setImage] = useState(null)
    const [predictionResult, setPredictionResult] = useState(null)
    const [selectedCity, setSelectedCity] = useState("")
    const [loading, setLoading] = useState(false)

    // Heart disease form state
    useEffect(() => {
        setLoading(false)
    })
    const [heartForm, setHeartForm] = useState({
        age: "",
        bloodPressure: "",
        cholesterol: "",
        bloodSugar: "",
        maxHeartRate: "",
    })

    // Dropzone for brain tumor image upload
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0]
            setImage(file)
            console.log(file)
        },
    })

    // Handle heart disease form input changes
    const handleHeartFormChange = (e) => {
        const { name, value } = e.target
        setHeartForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle prediction submission
    const handlePredict = async () => {
        setLoading(true)
        console.log(image)
        const formData = new FormData()
        formData.append('image', image)
        console.log(image instanceof File)
        try {
            let response = await fetch('https://disease-detection-app.onrender.com/predict/braintumor'
                ,
                {
                    method: 'POST',
                    body: formData
                }
            )
            let data = await response.json()
            console.log(data)
            setPredictionResult(data)
        } catch (error) {

        }



    }

    // Reset to detection type selection
    const handleBack = () => {
        setDetectionType(null)
        setPredictionResult(null)
        setImage(null)
        setHeartForm({
            age: "",
            bloodPressure: "",
            cholesterol: "",
            bloodSugar: "",
            maxHeartRate: "",
        })
    }

    // Doctor data based on city and detection type
    const getDoctors = () => {
        if (!selectedCity) return []

        const doctors = {
            Mumbai: [
                {
                    id: 1,
                    name: "Dr. Priya Sharma",
                    specialization: detectionType === "brain" ? "Neurologist" : "Cardiologist",
                    experience: "15 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 2,
                    name: "Dr. Rajesh Patel",
                    specialization: detectionType === "brain" ? "Neurosurgeon" : "Interventional Cardiologist",
                    experience: "12 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
            Delhi: [
                {
                    id: 3,
                    name: "Dr. Ananya Gupta",
                    specialization: detectionType === "brain" ? "Neurologist" : "Cardiologist",
                    experience: "18 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 4,
                    name: "Dr. Vikram Singh",
                    specialization: detectionType === "brain" ? "Neurosurgeon" : "Cardiac Surgeon",
                    experience: "20 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
            Bangalore: [
                {
                    id: 5,
                    name: "Dr. Karthik Rao",
                    specialization: detectionType === "brain" ? "Neurologist" : "Cardiologist",
                    experience: "14 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 6,
                    name: "Dr. Meera Iyer",
                    specialization: detectionType === "brain" ? "Neuro-oncologist" : "Preventive Cardiologist",
                    experience: "16 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
            Chennai: [
                {
                    id: 7,
                    name: "Dr. Senthil Kumar",
                    specialization: detectionType === "brain" ? "Neurologist" : "Cardiologist",
                    experience: "17 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 8,
                    name: "Dr. Lakshmi Narayan",
                    specialization: detectionType === "brain" ? "Neurosurgeon" : "Cardiac Electrophysiologist",
                    experience: "19 years",
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
        }

        return doctors[selectedCity] || []
    }
    console.log(predictionResult, image)

    return (
        <div className="w-full mx-auto px-4 ">
            <Navbar />
            {detectionType && (
                <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={handleBack}>
                    <ChevronLeft size={16} />
                    Back to Detection Selection
                </Button>
            )}

            {/* 1. Detection Type Selection Section */}
            {!detectionType && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Choose the Type of Detection You Want</h1>
                        <p className="text-muted-foreground">Select the medical condition you want to predict</p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                        <Card
                            className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary w-full sm:w-[85%] md:w-[80%] lg:col-span-2"
                            onClick={() => setDetectionType("brain")}
                        >
                            <CardHeader className="text-center">
                                <Brain className="w-16 h-16 mx-auto text-primary" />
                                <CardTitle>Brain Tumor Detection</CardTitle>
                                <CardDescription>Upload an MRI scan for tumor detection</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card
                            className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary w-full sm:w-[85%] md:w-[80%] lg:col-span-2"
                            onClick={() => setDetectionType("heart")}
                        >
                            <CardHeader className="text-center">
                                <Heart className="w-16 h-16 mx-auto text-primary" />
                                <CardTitle>Heart Disease Prediction</CardTitle>
                                <CardDescription>Enter health metrics for heart risk assessment</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

            )}

            {/* 2. Dynamic Input Section */}
            {detectionType && !predictionResult && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            {detectionType === "brain" ? "Brain Tumor Detection" : "Heart Disease Prediction"}
                        </h2>
                        <p className="text-muted-foreground">
                            {detectionType === "brain"
                                ? "Upload an MRI scan image for analysis"
                                : "Enter your health metrics for heart disease risk assessment"}
                        </p>
                    </div>

                    {detectionType === "brain" ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload MRI Scan</CardTitle>
                                <CardDescription>Drag and drop or click to select an MRI scan image</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UploadArea detectionType={detectionType} />
                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>

                            </CardHeader>
                            <CardContent>
                                <Home detectionType={detectionType} />
                            </CardContent>
                            <CardFooter>
                                {/* <Button
                                    className="w-full"
                                    disabled={loading || !Object.values(heartForm).every((val) => val !== "")}
                                    onClick={handlePredict}
                                >
                                    {loading ? "Processing..." : "Predict"}
                                </Button> */}
                            </CardFooter>
                        </Card>
                    )}
                </div>
            )}

            {/* 3. Performance Metrics Section */}
            {predictionResult && (
                <div className="space-y-10 animate-fadeIn">
                    <Card className="border-2 shadow-md">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-2">
                                {predictionResult.result.includes("Positive") || predictionResult.result.includes("Detected") ? (
                                    <AlertCircle className="w-12 h-12 text-red-500" />
                                ) : (
                                    <CheckCircle className="w-12 h-12 text-green-500" />
                                )}
                            </div>
                            <CardTitle className="text-2xl">{predictionResult.result}</CardTitle>
                            <CardDescription>AI Prediction Result</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Confidence</span>
                                    <span className="font-medium">{predictionResult.confidence * 100}%</span>
                                </div>
                                <Progress
                                    value={predictionResult.confidence}
                                    className={`h-2 ${predictionResult.confidence * 100 > 80
                                        ? "bg-green-600"
                                        : predictionResult.confidence * 100 > 60
                                            ? "bg-yellow-100"
                                            : "bg-red-600"
                                        }`}
                                    indicatorClassName={`${predictionResult.confidence * 100 > 80
                                        ? "bg-green-500"
                                        : predictionResult.confidence * 100 > 60
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                        }`}
                                />
                            </div>

                            {/* <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <div className="text-sm text-muted-foreground">Accuracy</div>
                                    <div className="font-medium">{predictionResult.metrics.accuracy}</div>
                                </div>
                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <div className="text-sm text-muted-foreground">Precision</div>
                                    <div className="font-medium">{predictionResult.metrics.precision}</div>
                                </div>
                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <div className="text-sm text-muted-foreground">Recall</div>
                                    <div className="font-medium">{predictionResult.metrics.recall}</div>
                                </div>
                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <div className="text-sm text-muted-foreground">F1 Score</div>
                                    <div className="font-medium">{predictionResult.metrics.f1Score}</div>
                                </div>
                            </div>

                            <div className="bg-muted/20 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">AI Explanation</h4>
                                <p className="text-sm text-muted-foreground">{predictionResult.explanation}</p>
                            </div> */}
                        </CardContent>
                    </Card>

                    {/* 4. Doctor Suggestion Section */}
                    {/* <div className="space-y-6">
                        <h3 className="text-xl font-bold">Recommended Specialists</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-muted-foreground" />
                                <Select onValueChange={setSelectedCity}>
                                    <SelectTrigger className="w-full md:w-[200px]">
                                        <SelectValue placeholder="Select Your City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                                        <SelectItem value="Delhi">Delhi</SelectItem>
                                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                                        <SelectItem value="Chennai">Chennai</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedCity && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {getDoctors().map((doctor) => (
                                        <Card key={doctor.id} className="overflow-hidden">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="relative w-full sm:w-24 h-24">
                                                    <Image
                                                        src={doctor.image || "/placeholder.svg"}
                                                        alt={doctor.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-4 flex-1">
                                                    <h4 className="font-bold">{doctor.name}</h4>
                                                    <p className="text-sm text-primary">{doctor.specialization}</p>
                                                    <p className="text-xs text-muted-foreground">{doctor.experience} experience</p>
                                                    <Button size="sm" className="mt-2">
                                                        Book Appointment
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {selectedCity && getDoctors().length === 0 && (
                                <p className="text-muted-foreground">No specialists available in this city.</p>
                            )}

                            {!selectedCity && (
                                <p className="text-muted-foreground">Please select a city to see specialist recommendations.</p>
                            )}
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    )
}
