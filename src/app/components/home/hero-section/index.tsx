"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const socialIcon = [
    {
      img: "/images/icon/twitter-icon.svg",
      href: "#!",
      icon: "Twitter",
    },
    {
      img: "/images/icon/social.png",
      href: "https://www.linkedin.com/in/khizar-shaikh-a25049288/",
      icon: "LinkedIn",
    },
    {
      img: "/images/icon/github (1).png",
      href: "https://github.com/khizarshaikh-ai",
      icon: "GitHub",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // 🔒 Honeypot spam protection
    if (data.get("company")) {
      setLoading(false);
      return;
    }

    const res = await fetch("https://formspree.io/f/mlggerna", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <section>
      <div className="container">
        <div>
          {/* Banner */}
          <div className="w-full h-72">
            <Image
              src="/images/hero-sec/banner.png"
              alt="banner-img"
              width={1080}
              height={267}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border-x border-primary/10">
            <div className="relative flex flex-col xs:flex-row items-center xs:items-start justify-center xs:justify-between max-w-3xl mx-auto gap-10 xs:gap-3 px-4 sm:px-7 pt-22 pb-8 sm:pb-12">
              {/* Avatar */}
              <div className="absolute top-0 transform -translate-y-1/2">
                <Image
                  src="/images/hero-sec/cropped_circle_image.png"
                  alt="user-img"
                  width={145}
                  height={145}
                  className="border-4 border-white rounded-full"
                />
                <span className="absolute bottom-2.5 right-5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 sm:gap-3 items-center text-center xs:items-start">
                <h1>Khizar Shaikh</h1>
                <p className="text-violet-700 font-normal">
                  Full Stack Developer | Python & Data Science
                </p>
                <div className="flex items-center gap-2">
                  <Image src="/images/icon/map-icon.svg" alt="map-icon" width={20} height={20} />
                  <p className="text-primary">HYD, Pakistan</p>
                </div>
              </div>

              {/* Social + CTA */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  {socialIcon.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="p-2.5 sm:p-3.5 hover:bg-primary/5 border border-primary/10 rounded-full"
                    >
                      <Image src={item.img} alt={item.icon} width={18} height={18} />
                    </Link>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setOpen(true);
                    setSubmitted(false);
                  }}
                  className="h-auto rounded-full p-0.5 bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)]"
                >
                  <span className="flex items-center gap-3 bg-primary hover:bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)] py-2.5 px-5 rounded-full">
                    <Image src="/images/icon/spark-icon.svg" alt="spark-icon" width={14} height={14} />
                    <span className="text-sm sm:text-base font-semibold text-white">
                      Get in touch
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 relative
                          animate-in fade-in zoom-in duration-300
                          sm:rounded-2xl sm:max-w-md
                          max-sm:h-full max-sm:rounded-none max-sm:p-5">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Get in touch</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot */}
                  <input type="text" name="company" className="hidden" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-primary text-white py-2 font-semibold disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 animate-in fade-in">
                <h3 className="text-xl font-semibold mb-2">Message sent 🎉</h3>
                <p className="text-gray-600">
                  Thanks for reaching out. I’ll get back to you soon.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 rounded-full bg-primary text-white px-6 py-2 font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
