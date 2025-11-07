"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-teal-600 font-bold text-xl">NeuroCardio AI</span>
                        </Link>
                    </div>

                    <div className="hidden  md:flex items-center space-x-9">
                        <a href="/" className="text-gray-700 hover:text-teal-600 font-medium">
                            Home
                        </a>
                        <a href="/services" className="text-gray-700 hover:text-teal-600 font-medium">
                            Our Services
                        </a>
                        <a href="#team" className="text-gray-700 hover:text-teal-600 font-medium">
                            Team
                        </a>
                        <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium">
                            Contact Us
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href="#services"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
                            onClick={toggleMenu}
                        >
                            Our Services
                        </Link>
                        <Link
                            href="#team"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
                            onClick={toggleMenu}
                        >
                            Team
                        </Link>
                        <Link
                            href="#contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
                            onClick={toggleMenu}
                        >
                            Contact Us
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
