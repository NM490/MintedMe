// app/not-found.js
"use client"
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center glow">
                {/* Animated 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        404
                    </h1>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">
                        Page not found
                    </h2>

                    <p className="text-lg text-foreground/70 max-w-md mx-auto">
                        Sorry, we couldn't find the page you're looking for.
                        The page might have been moved or doesn't exist.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <Link
                            href="/"
                            className="px-6 py-3 bg-gradient-to-r from-[#0142d9] to-purple-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Return to Homepage
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 border border-gray-300 hover:bg-white hover:text-primary  font-medium rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                            Go Back
                        </button>
                    </div>

                    
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </div>
        </div>
    );
}