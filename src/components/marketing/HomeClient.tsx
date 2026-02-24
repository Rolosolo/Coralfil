"use client";

import { motion } from "@/components/motion-client";
import { GlassSpongeFeature } from "@/components/marketing/GlassSpongeFeature";
import Link from "next/link";
import {
    Rocket,
    ChevronDown,
    ArrowRight,
    FlaskConical,
    Grid,
    Brain,
    Handshake,
    CheckCircle,
    Network
} from "lucide-react";

export default function HomeClient() {
    return (
        <div className="flex-grow bg-[#02060c] relative">
            {/* ------------------------------- */}
            {/* 1. HERO SECTION                 */}
            {/* ------------------------------- */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#010307]">
                {/* Background Image / Placeholder for Video */}
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 0.6 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        alt="Cinematic deep sea coral reef environment visualization"
                        className="w-full h-full object-cover mix-blend-luminosity animate-float"
                        style={{ animationDuration: '20s' }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCovIh_7Q6DF2l3xdQQ7w51SV46VEOqVydGiNH2GzC4gXgVCySb2acCYrjvKzk0U5GoL4FknBlIbP-bJ1BmMxXIjfW_UgFqgMQEMgHepX0kIzft4X8gNBqlLq-te7h5XlIpKY_6dQnAuWE4J_vuyqD5qDZCpBro6ti2D4QI-h-duNILkpyubD3swqeaUJsQ4cxtOG0Ou89gkuzl6NBs2dR76piTudHvED9D2TQT7FXOo2rFXifuXvW1AXQIpeIjTivZUOWNj2nIqdU"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,12,0.8)_100%)]"></div>
                    {/* Bioluminescent Streaks */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 0.2, x: 0 }}
                        transition={{ delay: 1, duration: 2 }}
                        className="absolute top-1/4 -left-1/4 w-[150%] h-1 rotate-12 bg-gradient-to-r from-transparent via-[#00D9C0] to-transparent blur-[40px]"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 0.15, x: 0 }}
                        transition={{ delay: 1.5, duration: 2 }}
                        className="absolute top-2/3 -right-1/4 w-[150%] h-1 -rotate-6 bg-gradient-to-r from-transparent via-[#00D9C0] to-transparent blur-[40px]"
                    ></motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02060c]/20 to-[#02060c]"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl 2xl:max-w-7xl px-6 mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] font-semibold text-[#00D9C0]">
                            The Future of Marine Restoration
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-[#00D9C0] text-black text-[10px] uppercase tracking-widest font-black shadow-[0_0_20px_rgba(0,217,192,0.4)]">
                            v2.0 PRO
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] mb-8 text-white"
                    >
                        Restoring Reefs at the<br />
                        <span className="text-glow-gradient">Speed of Nature.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        A mystical synthesis of marine biology and machine intelligence. Engineering resilience for Pacific Glass Sponges and Caribbean Reefs.
                    </motion.p>

                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/dashboard" className="btn-premium bg-[#0077BE]/90 hover:bg-[#0077BE] text-white px-10 py-5 rounded-full text-lg font-semibold flex items-center gap-3 group">
                            Explore ReefMaker™ AI
                            <Rocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                        <GlassSpongeFeature />
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 animate-bounce"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-white">Descent</span>
                    <ChevronDown className="w-8 h-8 text-white" />
                </motion.div>
            </section>

            {/* ------------------------------- */}
            {/* 2. IMPACT STATISTICS            */}
            {/* ------------------------------- */}
            <section className="py-32 bg-[#02060c] relative" id="impact">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-semibold mb-8 leading-tight tracking-tight text-white">
                                We&apos;re Losing Our Oceans.<br />
                                <span className="text-gray-600">But We&apos;re Building Them Back.</span>
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed">
                                Traditional restoration is too slow. Too expensive. Too small. We engineered a better way—guided by nature, powered by AI.
                            </p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.2
                                    }
                                }
                            }}
                            className="grid grid-cols-2 gap-8"
                        >
                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                                className="glass-card p-8 rounded-3xl"
                            >
                                <div className="text-4xl font-bold text-[#FF6B6B] font-mono mb-2">95%</div>
                                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">Larvae Loss</div>
                                <p className="text-gray-400 text-sm mt-3 leading-relaxed">Of coral larvae never find a suitable home in the wild.</p>
                            </motion.div>
                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                                className="glass-card p-8 rounded-3xl"
                            >
                                <div className="text-4xl font-bold text-[#FF6B6B] font-mono mb-2">90%</div>
                                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">Risk Level</div>
                                <p className="text-gray-400 text-sm mt-3 leading-relaxed">Of reefs projected at critical risk by 2050.</p>
                            </motion.div>
                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                                className="glass-card p-8 rounded-3xl col-span-2"
                            >
                                <div className="text-4xl font-bold text-[#00D9C0] font-mono mb-2">$2.7T</div>
                                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">Ecosystem Value</div>
                                <p className="text-gray-400 text-sm mt-3 leading-relaxed">In global ecosystem services at stake annually across the blue economy.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ------------------------------- */}
            {/* 3. PROP TECH (Grid)             */}
            {/* ------------------------------- */}
            <section className="py-32 bg-[#040914]" id="technology">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-24">
                        <span className="text-[#00D9C0] font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Proprietary Ecosystem</span>
                        <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-white">Nature&apos;s Blueprint, Reimagined.</h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Card 1: Pellets */}
                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#0c1629] border border-white/5 hover:border-[#00D9C0]/30 transition-all duration-500 min-h-[600px] flex flex-col justify-between p-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02060c] z-10"></div>
                            <img alt="CoralStick™ precision nutrition ionic pellets" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXDak9hm-FGIaoyQE8dVvICB8GuqH2uymw9pLeLqvvOkG1uJyeMvKvRlbIsivt2bUHNwjywi1NXtSQ4qWP2Pm-VkBBamZh1Ivs8fv82c9u35OVd5t972fjNMX-_1yEqQVZTw_dTs36kWanvM5SXwzwud4Fik4Pvt_QHJcG2ydiQ4eLGuAw6nyPh1Bev5Q2Ud-8BcBuYFDiDuv4_C0pLmi7bK729wLqkDBcNnBAJviMaBYaCNjER7yYGwVu6z2WyRZptjdUwXEiVQ8" />
                            <div className="relative z-20">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur flex items-center justify-center mb-8 border border-white/10">
                                    <FlaskConical className="text-[#FF6B6B] w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-semibold mb-3 text-white">CoralStick™ Pellets</h3>
                                <p className="text-gray-400">Precision nutrition that sticks where it&apos;s needed most.</p>
                            </div>
                            <div className="relative z-20">
                                <ul className="space-y-4 mb-8 text-sm text-gray-400">
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>Biodegradable matrix</li>
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>7-day controlled nutrient release</li>
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>85% adhesion success rate</li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 2: C-Brick */}
                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#0c1629] border border-white/5 hover:border-[#00D9C0]/30 transition-all duration-500 min-h-[600px] flex flex-col justify-between p-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02060c] z-10"></div>
                            <img alt="C-Brick™ 3D-printed biomimetic coral substrate" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-7VNh1Dz7HPG50qXW05jsncOXKSFu5ekx1--FTHYoJ_zRiKuWzxVeYLFyeeCHlg6oWlzygogeIle-utrOBgud8WlKBgHTPdokffbIKfG1E561H7BwSQeO9_X651agp6TpQtQ8FAuIWa9R9DOTbBDxVeT3DknhKP9UXU0SgECWUlAO63D-8NLoheeqkzx0YhQAdyN75duv2cC3e_Q6YVPiss7aTpK92k4_BXUn4Zk1jIKTeTFV5eMQQL05yLRdktHCntJF0zHctz0" />
                            <div className="relative z-20">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur flex items-center justify-center mb-8 border border-white/10">
                                    <Grid className="text-white w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-semibold mb-3 text-white">C-Brick™ Substrates</h3>
                                <p className="text-gray-400">Building structural reef integrity brick by brick.</p>
                            </div>
                            <div className="relative z-20">
                                <ul className="space-y-4 mb-8 text-sm text-gray-400">
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white"></span>3D-printed biomimetic design</li>
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white"></span>Embedded nutrient channels</li>
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white"></span>4-6x higher settlement density</li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 3: AI (Highlighted) */}
                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#0c1629] ring-1 ring-[#00D9C0]/30 shadow-[0_0_80px_rgba(0,217,192,0.1)] transition-all duration-500 min-h-[600px] flex flex-col justify-between p-10 lg:-mt-10 lg:h-[680px]">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#00D9C0]/10 to-[#02060c] z-10"></div>
                            <img alt="ReefMaker™ AI neural network visualization" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000 ease-out"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_g7AQNgeKotOibvi5Tdw4TJ8mNU5Gg_L0E4xy9YH-YhN9ypvSF7CmnGyWV_4hzF764bFoXQLQamv_ZQjpFqzPBT7Opkr3w1Qj9AInvOFYJqnJM0d_y0iujqoLmAOpW9SKH83aTR9fLVXV_dJS-l7mrKQTiKDjRhYTxEjC6LUmBzq1wasZKvzqX9qHN8hjXqIsfiGwnr37QYymoevsBUzIIg7iyKilMqhLVKn4i89KmZUqgvlB_ch7MYNCUigHJPYkBqBGPzDa-Vo" />
                            <div className="relative z-20">
                                <div className="w-16 h-16 rounded-2xl bg-[#00D9C0] flex items-center justify-center mb-10 shadow-2xl shadow-[#00D9C0]/50">
                                    <Brain className="text-black w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-bold mb-4 text-white">ReefMaker™ AI</h3>
                                <p className="text-[#00D9C0] font-bold text-lg">The Intelligence of Restoration</p>
                            </div>
                            <div className="relative z-20">
                                <p className="text-gray-300 mb-8 text-base leading-relaxed">
                                    Our AI platform analyzes localized marine conditions to design custom C-Brick™ arrays and species-targeted nutrition plans.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="w-full bg-[#00D9C0] hover:bg-[#00f2ff] text-black font-extrabold py-5 rounded-2xl transition-all shadow-xl hover:shadow-[#00D9C0]/40 flex items-center justify-center gap-3"
                                >
                                    Try Demo
                                    <Rocket className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------- */}
            {/* 4. PHILANTHROPY                 */}
            {/* ------------------------------- */}
            <section className="py-32 bg-[#02060c] relative overflow-hidden" id="philanthropy">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#00D9C0]/5 to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-[#FF6B6B] font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Philanthropy & Adoption</span>
                        <h2 className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tight">Adopt a Reef. Offset Your Carbon.</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                            Directly fund restoration by adopting C-Bricks™. Access detailed sequestration data for verifiable tax rebates and corporate social impact reporting.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* 1: INDIVIDUAL */}
                        <div className="glass-card rounded-[2.5rem] p-10 hover:border-[#00D9C0]/40 transition-all duration-500 group flex flex-col">
                            <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#00D9C0]/20 transition-all border border-white/10">
                                <Handshake className="text-[#00D9C0] w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Adopt a C-Brick™</h3>
                            <div className="text-4xl font-mono text-white mb-6">$50 <span className="text-sm text-gray-500 font-sans font-normal tracking-normal">/ unit</span></div>
                            <ul className="space-y-4 mb-10 text-sm text-gray-400 flex-grow">
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00D9C0] w-4 h-4" />GPS Precise Location Tracking</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00D9C0] w-4 h-4" />Annual Biological Growth Report</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00D9C0] w-4 h-4" />Verified ~20kg CO2 Sequestration</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-black transition-all font-bold tracking-wide">Adopt Now</button>
                        </div>

                        {/* 2: CLUSTER (Highlighted) */}
                        <div className="bg-gradient-to-b from-[#0077BE]/20 to-[#02060c]/60 backdrop-blur-2xl border border-[#0077BE]/40 rounded-[2.5rem] p-10 transform md:-translate-y-6 shadow-2xl shadow-[#0077BE]/20 flex flex-col relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0077BE] text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest text-white shadow-xl">Impact Tier</div>
                            <div className="h-16 w-16 rounded-2xl bg-[#0077BE]/30 flex items-center justify-center mb-8 border border-white/10">
                                <Network className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Restoration Cluster</h3>
                            <div className="text-4xl font-mono text-white mb-6">$450 <span className="text-sm text-gray-400 font-sans font-normal tracking-normal">/ 10 units</span></div>
                            <ul className="space-y-4 mb-10 text-sm text-gray-200 flex-grow">
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00f2ff] w-4 h-4" />Dedicated underwater plaque</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00f2ff] w-4 h-4" />Bi-annual biological photography</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00f2ff] w-4 h-4" />Verified Carbon Credits (Tax Rebate)</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#00f2ff] w-4 h-4" />~250kg CO2 Sequestration</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-[#0077BE] text-white hover:bg-[#00f2ff] hover:text-black transition-all font-extrabold shadow-xl shadow-[#0077BE]/30">Adopt Cluster</button>
                        </div>

                        {/* 3: CORPORATE */}
                        <div className="glass-card rounded-[2.5rem] p-10 hover:border-[#FF6B6B]/40 transition-all duration-500 group flex flex-col">
                            <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#FF6B6B]/20 transition-all border border-white/10">
                                <Brain className="text-[#FF6B6B] w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Corporate & Philanthropic</h3>
                            <div className="text-4xl font-mono text-white mb-6">$5k+ <span className="text-sm text-gray-500 font-sans font-normal tracking-normal">/ bespoke</span></div>
                            <ul className="space-y-4 mb-10 text-sm text-gray-400 flex-grow">
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#FF6B6B] w-4 h-4" />Location selection from target projects</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#FF6B6B] w-4 h-4" />Co-sponsored events & materials</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#FF6B6B] w-4 h-4" />Access to high-fidelity media assets</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-[#FF6B6B] w-4 h-4" />Institutional Carbon Offsets</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-black transition-all font-bold tracking-wide">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------- */}
            {/* 5. INVESTOR FOOTER TEASER       */}
            {/* ------------------------------- */}
            <section className="py-24 bg-[#010307] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,217,192,0.05)_0%,transparent_50%)]"></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-white mb-4">Invest in the Blue Economy</h2>
                        <p className="text-gray-400">
                            Join the venture-backed coalition scale-up. Download our Series B investment prospectus and impact report.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/investors" className="btn-premium bg-white text-[#02060c] px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100">
                            View Investor Portal
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
