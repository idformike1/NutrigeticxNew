"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#F4EDE6] pt-32 pb-20 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h1 className="text-100-regular text-[#2e3a1f] mb-8">Talk to<br />Our Team</h1>
          
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <p className="text-18-caps text-[#2e3a1f]/60 mb-12">
                WE REVIEW EACH REQUEST TO RESERVE EARLY ACCESS FOR FARMS THAT CAN BENEFIT MOST.
              </p>
              
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-14-caps text-[#8aab5a] mb-2">Email</p>
                  <a href="mailto:hello@farmminerals.com" className="text-30-regular text-[#2e3a1f] hover:opacity-60 transition-opacity">
                    hello@farmminerals.com
                  </a>
                </div>
                <div>
                  <p className="text-14-caps text-[#8aab5a] mb-2">Social</p>
                  <a href="https://linkedin.com" target="_blank" className="text-30-regular text-[#2e3a1f] hover:opacity-60 transition-opacity">
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
            
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="bg-transparent border-b border-[#2e3a1f]/20 py-4 text-14-caps focus:border-[#2e3a1f] outline-none" />
                <input type="text" placeholder="Last Name" className="bg-transparent border-b border-[#2e3a1f]/20 py-4 text-14-caps focus:border-[#2e3a1f] outline-none" />
              </div>
              <input type="email" placeholder="Email Address" className="bg-transparent border-b border-[#2e3a1f]/20 py-4 text-14-caps focus:border-[#2e3a1f] outline-none" />
              <input type="text" placeholder="Farm Name / Company" className="bg-transparent border-b border-[#2e3a1f]/20 py-4 text-14-caps focus:border-[#2e3a1f] outline-none" />
              <textarea placeholder="Tell us about your operation" rows={4} className="bg-transparent border-b border-[#2e3a1f]/20 py-4 text-14-caps focus:border-[#2e3a1f] outline-none resize-none" />
              
              <button type="submit" className="mt-8 px-10 py-4 bg-[#2e3a1f] text-[#F4EDE6] text-14-caps w-fit transition-transform hover:scale-105 active:scale-95">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
