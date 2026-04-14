"use client";

import React from 'react';
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "@/components/motion-client";
import { ShoppingBag, ChevronRight, Package, Truck, Info, Mail } from "lucide-react";

const PRODUCTS = [
    {
        id: "prawn-reset",
        name: "Prawn Reset",
        category: "Aquaculture Solutions",
        description: "Optimized microbial stabilization and ammonia control for intensive prawn cultivation environments. Enhances growth rates through precision mineralization.",
        specs: ["High Bioavailability", "pH Neutralizing", "Ammonia Binding"],
        image: "/products/minerals-prawn.jpg"
    },
    {
        id: "landscape-shells",
        name: "Landscape Crushed Shells",
        category: "Eco-Aesthetics",
        description: "Premium, sustainably sourced crushed shells for architectural landscaping and habitat restoration. Naturally high albedo for thermal regulation.",
        specs: ["UV Reflective", "Sustainable Sourcing", "Graded Textures"],
        image: "/products/minerals-shells.jpg"
    },
    {
        id: "agri-poultry",
        name: "Agri/Poultry Additives",
        category: "Feed Enrichment",
        description: "Pure calcium carbonate feed supplements. Essential for eggshell integrity and bone density in high-yield poultry systems.",
        specs: ["99.1% Calcium Carbonate", "Trace-Free", "Micronized"],
        image: "/products/minerals-agri.jpg"
    },
    {
        id: "pharmaceutical-calcium",
        name: "Pharmaceutical Grade Calcium",
        category: "Medical & Food",
        description: "USP/FCC compliant high-purity calcium carbonate available upon request for food enrichment and pharmaceutical delivery systems.",
        specs: ["USP/FCC Grade", "Batch-Tested", "Sterile Packaging"],
        image: "/products/minerals-pharma.jpg"
    }
];

export default function BulkMineralsPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        company: '',
        qty: '',
        location: '',
        products: [] as string[]
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    const handleCheckboxChange = (productName: string) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.includes(productName)
                ? prev.products.filter(p => p !== productName)
                : [...prev.products, productName]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            const res = await fetch('/api/minerals/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', company: '', qty: '', location: '', products: [] });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#02060c] text-white">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto border-b border-white/5 pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                            Bulk <span className="text-primary">Minerals</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-medium">
                            Scale your operations with premium, sustainably harvested marine minerals. From intensive aquaculture to pharmaceutical-grade purity.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PRODUCTS.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                        >
                            <div className="aspect-[16/9] w-full bg-slate-900 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-transparent to-transparent z-10"></div>
                                {/* Placeholder for product image */}
                                <div className="absolute inset-0 flex items-center justify-center text-slate-800">
                                    <Package size={80} className="opacity-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-700" />
                                </div>
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[9px] font-black text-primary uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">{product.name}</h3>
                                <p className="text-sm text-slate-500 mb-8 leading-relaxed flex-grow">
                                    {product.description}
                                </p>
                                
                                <div className="space-y-3 mb-10">
                                    {product.specs.map(spec => (
                                        <div key={spec} className="flex items-center gap-3">
                                            <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_4px_rgba(0,217,192,1)]"></div>
                                            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{spec}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Pricing</span>
                                        <span className="text-lg font-black text-white tracking-tighter">Bulk Inquiry</span>
                                    </div>
                                    <Link href="#contact" className="flex items-center gap-3 px-6 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                        Inquire <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact / RFQ Section */}
            <section id="contact" className="py-32 px-6">
                <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-primary/10 to-transparent p-1">
                    <div className="bg-[#030812] rounded-[2.25rem] p-12 md:p-16 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10 rounded-full"></div>
                        
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-black tracking-tighter mb-6 leading-none">
                                Request Bulk <br /> <span className="text-primary brightness-150">Pricing Schedule</span>
                            </h2>
                            <p className="text-slate-400 font-medium mb-12">
                                For orders exceeding 1 metric ton, please provide your operational requirements. Our logistics team will issue a formal quote within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                                            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all text-sm font-bold" 
                                            placeholder="First Last" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Company Entity</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.company}
                                            onChange={(e) => setFormData(f => ({ ...f, company: e.target.value }))}
                                            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all text-sm font-bold" 
                                            placeholder="Legal Organization" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Quantity Needed</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.qty}
                                        onChange={(e) => setFormData(f => ({ ...f, qty: e.target.value }))}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all text-sm font-bold" 
                                        placeholder="e.g. 5 Metric Tons" 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Logistics / Location</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.location}
                                        onChange={(e) => setFormData(f => ({ ...f, location: e.target.value }))}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all text-sm font-bold" 
                                        placeholder="Site Coordinates or Region" 
                                    />
                                </div>

                                <div className="space-y-4 pt-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Products of Interest</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {PRODUCTS.map(p => (
                                            <label key={p.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:bg-white/[0.08] transition-all group ${formData.products.includes(p.name) ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/10'}`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.products.includes(p.name)}
                                                    onChange={() => handleCheckboxChange(p.name)}
                                                    className="w-4 h-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary/50" 
                                                />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${formData.products.includes(p.name) ? 'text-primary' : 'text-slate-400 group-hover:text-slate-200'}`}>{p.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`w-full h-16 mt-8 rounded-2xl font-black uppercase tracking-[0.25em] text-xs transition-all flex items-center justify-center gap-4 ${isSubmitting ? 'bg-white/10 text-slate-500 cursor-wait' : 'bg-primary text-black hover:bg-white shadow-[0_0_40px_rgba(0,217,192,0.3)]'}`}
                                >
                                    {isSubmitting ? 'Transmitting...' : (
                                        <>
                                            <Mail size={18} /> Transmit Request
                                        </>
                                    )}
                                </button>
                                
                                {status === 'success' && (
                                    <p className="text-center text-xs font-bold text-primary animate-pulse">Transmission Successful. Our team will contact you shortly.</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-center text-xs font-bold text-red-500">Transmission Failed. Please contact hello@coralfil.com directly.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logistics Footer */}
            <section className="py-20 px-6 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex gap-6 items-start">
                        <div className="p-3 bg-white/5 rounded-xl text-slate-500">
                            <Truck size={20} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Global Logistics</h4>
                            <p className="text-xs text-slate-500 leading-relaxed italic">Vessel, rail, and ground transport available across BC and International ports.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="p-3 bg-white/5 rounded-xl text-slate-500">
                            <ShieldBag size={20} /> {/* Handling missing icon later if ShieldBag is not avail */}
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Quality Assurance</h4>
                            <p className="text-xs text-slate-500 leading-relaxed italic">Every shipment accompanied by independent lab analysis and COA.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="p-3 bg-white/5 rounded-xl text-slate-500">
                            <Info size={20} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Pricing Disclosure</h4>
                            <p className="text-xs text-slate-500 leading-relaxed italic">Prices fluctuate weekly based on maritime shipping index and harvest volume.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// Simple placeholder for missing icon
function ShieldBag({ size, className }) {
    return <Package size={size} className={className} />;
}
