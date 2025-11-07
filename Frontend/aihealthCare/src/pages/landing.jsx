import Navbar from "@/landingpage/navbar"
import Footer from '@/landingpage/footer'
import Features from "@/landingpage/features"
import Team from "@/landingpage/team"
import Hero from "@/landingpage/hero"
export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <Features />
                <Team />
            </main>
            <Footer />
        </div>
    )
}
