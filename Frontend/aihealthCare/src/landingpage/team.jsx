import React from "react";
import { Linkedin, Twitter } from "lucide-react";

const Team = () => {
    const teamMembers = [
        {
            name: "Pavan C",
            role: "Developer",
            bio: "Computer Science student working on heart disease prediction features.",
            image: "/pavanpicture.jpg",
        },
        {
            name: "Sujay V Devaraj",
            role: "Developer",
            bio: "CS student focusing on AI and machine learning for medical imaging.",
            image: "/Sujaypicture.jpg",
        },
        {
            name: "Ritesh S Chawan",
            role: "Developer",
            bio: "Student interested in healthcare data analysis and predictive modeling.",
            image: "/Riteshpicture.jpg",
        },
        {
            name: "Suhas M K",
            role: "Developer",
            bio: "CS student building user-friendly interfaces and project integration.",
            image: "/suhasmkpicture.jpg",
        },
    ];

    return (
        <section id="team" className="transition-all" style={{ padding: "5rem 0", backgroundColor: "#fff" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a202c", marginBottom: "1rem" }}>
                        Meet the Team
                    </h2>
                    <p style={{ fontSize: "1.25rem", color: "#718096" }}>Passionate Healthcare Innovators</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            style={{
                                borderRadius: "0.5rem",
                                overflow: "hidden",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "box-shadow 0.3s ease-in-out",
                            }}
                        >
                            <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>
                            <div style={{ padding: "1.5rem" }}>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1a202c", marginBottom: "0.5rem" }}>
                                    {member.name}
                                </h3>
                                <p style={{ color: "#319795", fontWeight: "500", marginBottom: "1rem" }}>{member.role}</p>
                                <p style={{ color: "#4a5568", marginBottom: "1rem" }}>{member.bio}</p>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <a href="#" style={{ color: "#718096" }}>
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="#" style={{ color: "#718096" }}>
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
