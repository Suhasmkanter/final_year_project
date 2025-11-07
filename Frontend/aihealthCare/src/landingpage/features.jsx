import React from "react"
import { Heart, Brain, UserCog } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Features = () => {
    const features = [
        {
            title: "Heart Disease Prediction",
            description:
                "Our advanced AI algorithms analyze patient data to predict heart disease risk with high accuracy, enabling early intervention and personalized treatment plans.",
            icon: Heart,
        },
        {
            title: "Brain Tumor Detection",
            description:
                "Using state-of-the-art image recognition technology, our AI can detect brain tumors from MRI scans with 95% accuracy, significantly improving early diagnosis rates.",
            icon: Brain,
        },
        {
            title: "Personalized Healthcare Insights",
            description:
                "Receive tailored health recommendations based on your unique profile. Our AI analyzes your data to provide actionable insights for improving your overall wellbeing.",
            icon: UserCog,
        },
    ]

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Leveraging artificial intelligence to revolutionize healthcare diagnostics and patient care
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-teal-600" />
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
