import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-bold mb-4">HealthAI</h3>
                        <p className="text-gray-400 mb-4">
                            Transforming healthcare with artificial intelligence to improve patient outcomes and care.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-teal-500">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-500">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-500">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-500">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-teal-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-gray-400 hover:text-teal-500">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#team" className="text-gray-400 hover:text-teal-500">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-gray-400 hover:text-teal-500">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-teal-500">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-teal-500">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-teal-500">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-teal-500">
                                    HIPAA Compliance
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-teal-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">GM University , Davangere, Karnataka, India </span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-teal-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-400">(555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="text-teal-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-400">info@healthai.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} HealthAI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
