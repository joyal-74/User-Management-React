import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaBrain, FaUsers, FaChartLine, FaQuoteLeft } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-neutral-900 text-white min-h-screen">
            <section className="z-10 pt-30 pb-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-neutral-900">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-purple-400">GenZ</span> Solutions
                    </h1>
                    <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
                        The ultimate toolkit for the next generation. Built by GenZ, for GenZ.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Get Started
                        </button>
                        <button className="bg-transparent hover:bg-neutral-800 text-purple-400 font-bold py-3 px-6 border-2 border-purple-600 rounded-lg transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
                {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-900 to-transparent"></div> */}
            </section>

            <section className="py-10 px-4 sm:px-6 lg:px-8 bg-neutral-900">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why <span className="text-purple-400">Choose Us</span>?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaRocket className="text-4xl text-purple-500" />,
                                title: "Lightning Fast",
                                desc: "Built for the short attention span generation. Get what you need in seconds."
                            },
                            {
                                icon: <FaBrain className="text-4xl text-purple-500" />,
                                title: "AI Powered",
                                desc: "Our smart algorithms learn and adapt to your unique GenZ needs."
                            },
                            {
                                icon: <FaUsers className="text-4xl text-purple-500" />,
                                title: "Community First",
                                desc: "Connect with like-minded individuals who get your vibe."
                            },
                            {
                                icon: <FaChartLine className="text-4xl text-purple-500" />,
                                title: "Always Evolving",
                                desc: "We update faster than TikTok trends to keep you ahead."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-neutral-800 p-6 rounded-lg hover:bg-neutral-700 transition-colors">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-neutral-300">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-800">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        What <span className="text-purple-400">People Say</span>
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "GenZ Solutions literally saved me 5 hours a week. That's like 50 TikTok scrolls!",
                                author: "Alex, 19"
                            },
                            {
                                quote: "Finally a platform that speaks my language. No cringe boomer vibes here.",
                                author: "Jordan, 22"
                            },
                            {
                                quote: "I was skeptical but this actually slaps. 10/10 would recommend to my squad.",
                                author: "Taylor, 21"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-neutral-900 p-6 rounded-lg">
                                <FaQuoteLeft className="text-purple-500 text-2xl mb-4" />
                                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                                <p className="text-purple-400 font-medium">— {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-900 to-purple-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Ready to <span className="text-purple-300">Level Up</span>?
                    </h2>
                    <p className="text-xl mb-8">
                        Join thousands of GenZers who are already optimizing their lives.
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                    >
                        Sign Up Free
                    </button>
                </div>
            </section>

            <footer className="bg-neutral-950 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold">
                                <span className="text-purple-400">GenZ</span> Solutions
                            </h3>
                            <p className="text-neutral-400">The future starts now.</p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-neutral-400 hover:text-purple-400 transition-colors">About</a>
                            <a href="#" className="text-neutral-400 hover:text-purple-400 transition-colors">Features</a>
                            <a href="#" className="text-neutral-400 hover:text-purple-400 transition-colors">Contact</a>
                            <a href="#" className="text-neutral-400 hover:text-purple-400 transition-colors">Privacy</a>
                        </div>
                    </div>
                    <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-500">
                        <p>&copy; {new Date().getFullYear()} GenZ Solutions. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;