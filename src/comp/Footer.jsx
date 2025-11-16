
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: ["Games", "Tournaments", "LeaderBoard", "Premium Membership"]
    },
    {
      title: "Contact Us",
      content: [
        { label: "Email:", value: "support@gobudy.com" },
        { label: "Phone:", value: "+91 98765 43210" },
        { label: "Location:", value: "India" }
      ]
    },
    {
      title: "Support",
      links: ["Help Center", "FAQs", "Terms & Conditions", "Privacy Policy"]
    }
  ];

  const socialLinks = [
    { icon: "fa-github", label: "GitHub" },
    { icon: "fa-whatsapp", label: "WhatsApp" },
    { icon: "fa-facebook", label: "Facebook" },
    { icon: "fa-youtube", label: "YouTube" }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d] to-black px-6 md:px-10 py-16 md:py-20 overflow-hidden"
      >
        {/* Background gradient accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-[#0d0d0d] to-gray-950/50 pointer-events-none" />

        {/* Main Footer Content */}
        <motion.footer
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {/* Brand Section */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center gap-3 group cursor-pointer mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}/logo1-removebg-preview.png`}
                alt="GoBudy Logo"
                className="w-12 h-12 group-hover:drop-shadow-[0_0_15px_rgba(229,9,20,0.6)] transition-all"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              />
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                Go<span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">
                  Budy
                </span>
              </h1>
            </motion.div>

            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              The ultimate gaming platform to connect with players, join tournaments,
              and showcase your skills.
            </p>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#e50914]/50 hover:text-[#e50914] transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <i className={`fa-brands ${social.icon} text-lg group-hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.6)] transition-all`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links & Contact Sections */}
          {footerSections.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              className="flex flex-col text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (sectionIdx + 1) * 0.1 }}
            >
              <h2 className="text-white font-black text-base sm:text-lg md:text-xl tracking-tight mb-5 flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-[#e50914] to-[#ff6b6b] rounded-full"></span>
                {section.title}
              </h2>

              <ul className="space-y-3">
                {section.links && section.links.map((link, idx) => (
                  <motion.li
                    key={idx}
                    className="text-gray-400 hover:text-[#e50914] cursor-pointer text-sm font-medium transition-colors duration-300 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="group-hover:text-[#e50914]">→</span> {link}
                  </motion.li>
                ))}

                {section.content && section.content.map((item, idx) => (
                  <li key={idx} className="text-gray-400 text-sm font-medium">
                    <span className="text-[#00e5ff] font-bold">{item.label}</span> {item.value}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.footer>

        {/* Divider */}
        <motion.div
          className="relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Copyright Section */}
        <motion.div
          className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <i className="fa-regular fa-copyright text-[#00e5ff]"></i>
            <p>
              2025 <span className="text-white font-black">Go</span>
              <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent font-black">
                Budy
              </span>
              . All rights reserved.
            </p>
          </div>

          <motion.p
            className="text-xs text-gray-600 hover:text-[#00e5ff] transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Made with <span className="text-[#e50914]">♥</span> for gamers
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}