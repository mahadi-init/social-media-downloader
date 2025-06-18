"use client";

import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-static";

const instagram = {
  id: "instagram",
  name: "Instagram",
  icon: "📷",
  gradient: "from-pink-500 via-purple-500 to-indigo-500",
  placeholder: "https://www.instagram.com/p/...",
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const blob = await res.blob();
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = `video-${uuidv4().slice(0, 4)}.mp4`;
        a.click();
      } else {
        alert("Failed to download video");
      }
    } catch (error) {
      alert("An error occurred while downloading");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="md:text-3xl text-[1.7rem] leading-none font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
            📥 Instagram Video Downloader
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Download videos from Instagram
          </p>
        </div>

        {/* Download Form */}
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl animate-fade-in-up animation-delay-500">
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${instagram?.gradient} text-white font-medium mb-4`}
              >
                <span className="mr-2 text-xl">{instagram?.icon}</span>
                {instagram?.name} Downloader
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="url"
                  placeholder={instagram?.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-8 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : `bg-gradient-to-r ${instagram?.gradient} hover:shadow-2xl hover:shadow-purple-500/25`
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Downloading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">⬇️</span>
                    Download Video
                  </div>
                )}
              </button>
            </form>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="mr-2">⚡</span>
                Fast Download
              </div>
              <div className="flex items-center">
                <span className="mr-2">🔒</span>
                Secure & Private
              </div>
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                Mobile Friendly
              </div>
              <div className="flex items-center">
                <span className="mr-2">🆓</span>
                100% Free
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto mt-12 animate-fade-in-up animation-delay-1000">
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              How to Use
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  1
                </div>
                <p className="text-gray-300 text-sm">Select Platform</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  2
                </div>
                <p className="text-gray-300 text-sm">Paste Video URL</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  3
                </div>
                <p className="text-gray-300 text-sm">Click Download</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  4
                </div>
                <p className="text-gray-300 text-sm">Enjoy Your Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
