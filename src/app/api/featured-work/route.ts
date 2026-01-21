import { NextResponse } from "next/server";

const featureWork = [
    {
        title: "GitHub Profile Analyzer",
        description: "#",
        roles: ["Python | Streamlit | Data Analysis"],
        image: "/images/feature-work/start.png"
    },
    {
        title: "GitHub Profile Analyzer",
        description: "#",
        roles: ["Python | Streamlit | Data Analysis"],
        image: "/images/feature-work/emily.png"
    }
]

export const GET = async () => {
    return NextResponse.json({
        featureWork
    });
};