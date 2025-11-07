import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // adjust this if needed
import Matter from 'matter-js';

const HeroSection = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());



    return (
        <section className="relative bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

            {/* Background image (if needed) */}
            <div
                className="absolute inset-0 bg-cover bg-center z-10"
                style={{
                    backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
                    backgroundBlendMode: "overlay",
                    opacity: 0.3,
                }}
            ></div>

            {/* Matter.js Canvas */}
            <div
                ref={sceneRef}
                className="absolute inset-0 z-20 pointer-events-none"
            ></div>

            {/* Hero Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 z-30">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Transforming Healthcare with AI
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-100">
                        Predicting health conditions and improving patient care using cutting-edge AI technology.
                    </p>
                    <Link to="/services">
                        <Button size="lg" className="bg-white cursor-pointer text-teal-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6">
                            Try Our Health Predictions
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
