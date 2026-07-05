import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuSparkles, LuArrowRight, LuBrainCircuit, LuTarget, LuZap, LuCode, LuCheckCircle } from "react-icons/lu";
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

// --- Framer Motion Animation Variants ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Fallback features in case you don't import APP_FEATURES from utils/data
const FEATURES = [
  { id: 1, title: "Role-Specific Prep", description: "Tailored questions for your exact industry and seniority level.", icon: <LuTarget /> },
  { id: 2, title: "Deep Dive Concepts", description: "Expand on complex topics with AI-guided explanations.", icon: <LuCode /> },
  { id: 3, title: "Instant Feedback", description: "Get real-time corrections and suggestions to improve your delivery.", icon: <LuZap /> },
  { id: 4, title: "Smart Organization", description: "Keep your notes, frameworks, and answers perfectly structured.", icon: <LuCheckCircle /> },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    setOpenAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white overflow-hidden">
      
      {/* --- Sticky Glassmorphism Header --- */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-zinc-100"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
              <LuBrainCircuit size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight">PrepAI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setCurrentPage("login"); setOpenAuthModal(true); }}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => { setCurrentPage("signup"); setOpenAuthModal(true); }}
              className="bg-zinc-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-zinc-800 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.header>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-6 flex flex-col items-center text-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-900 text-xs font-semibold mb-8">
              <LuSparkles className="text-zinc-500 w-3.5 h-3.5" />
              <span>The Next Generation of Interviewing</span>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Ace the interview. <br />
              <span className="text-zinc-400">Master your career.</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-zinc-500 max-w-2xl mb-10 leading-relaxed font-medium">
              Get role-specific questions, expand answers when you need them, and dive deeper into concepts. Your ultimate preparation toolkit.
            </motion.p>
            
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handleCTA}
                className="group flex items-center justify-center gap-2 bg-zinc-900 text-white text-base font-medium px-8 py-4 rounded-full hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-900/20 w-full sm:w-auto"
              >
                Get Started Free
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* --- Hero Image Presentation --- */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 pb-32"
        >
           <div className="rounded-[2.5rem] overflow-hidden bg-zinc-50 border border-zinc-200 shadow-2xl shadow-zinc-200/50 p-2 md:p-4">
             {/* Replace with your actual HERO_IMAGE.png */}
             <div className="w-full aspect-video bg-zinc-200 rounded-[2rem] border border-zinc-100 overflow-hidden relative group">
               <img
                 src="HERO_IMAGE.png"
                 alt="Platform Interface"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               {/* Optional overlay gradient for aesthetic */}
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 to-transparent pointer-events-none" />
             </div>
           </div>
        </motion.section>

        {/* --- Features Grid --- */}
        <section className="bg-zinc-50 py-32 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Everything you need to shine.
              </h2>
              <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
                Powerful features designed to organize your thoughts, refine your delivery, and elevate your confidence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-900 mb-6 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed text-sm font-medium">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
          </div>
        </section>
      </main>

      {/* --- Minimalist Footer --- */}
      <footer className="bg-white border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-900 font-semibold tracking-tight">
             <LuBrainCircuit size={18} />
             PrepAI
          </div>
          <p className="text-zinc-400 text-sm font-medium">
            Made by Gaurav (Unique_Devs)
          </p>
        </div>
      </footer>

      {/* --- Auth Modal --- */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="p-2">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;