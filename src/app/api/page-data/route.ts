import { NextResponse } from "next/server";

const experienceData = [
    {
        icon: "/images/icon/code.png",
        role: "Full-stack Developer - TechSolutions",
        location: "Remote",
        startYear: "2022",
        endYear: "2023",
        bulletPoints: [
            "Built end-to-end web applications, improving user engagement and performance",
            "Collaborated with backend and frontend teams to deliver features efficiently",
            "Developed reusable components and modules used across multiple projects"
        ]
    },
    {
        icon: "/images/icon/python.png",
        role: "Python Developer - Solusify",
        location: "Remote",
        startYear: "2020",
        endYear: "2021",
        bulletPoints: [
            "Developed Python applications and scripts to automate workflows and data processing",
            "Built and tested data-driven models to generate insights and predictions",
            "Mentored junior developers and peers on Python best practices and clean coding"
        ]
    },
]

const educationData = [
    {
        date: "Jan 2018 - May 2020",
        title: "A-levels in Computer Science",
        subtitle: "RockFord High School — Rockford, HYD"
    },
    {
        date: "Jan 2018 - Mar 2021",
        title: "IT Honors",
        subtitle: "Aptech — Hyd, Pakistan"
    },
    {
        date: "Mar 2021 - Jul 2021",
        title: "Master Python by building 100 projects in 100 days",
        subtitle: "Dr. Angela Yu — Udemy"
    }
];


const projectOverview = {
    caseStudies: [
        { name: "Wellnest", url: "#" },
        { name: "ScoutHire", url: "#" },
    ],
    sideProjects: [
        { name: "Chatbot-Mina", url: "https://github.com/khizarshaikh-ai/chatbot-mina" },
        { name: "Mini NFT Marketplace", comingSoon: true },
        { name: "Smart City Dashboard", comingSoon: true },
        { name: "Web3 + Social Media Hybrid", comingSoon: true },
    ]
};


export const GET = async () => {
    return NextResponse.json({
        experienceData,
        educationData,
        projectOverview
    });
};