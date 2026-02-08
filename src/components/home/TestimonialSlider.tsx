import { useState, useEffect } from 'preact/hooks';

interface Testimonial {
    quote: string;
    author: string;
    detail: string;
    rating: number;
}

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            setIsAnimating(false);
        }, 300); // Wait for fade out
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            setIsAnimating(false);
        }, 300);
    };

    const goToSlide = (index: number) => {
        if (index === currentIndex || isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsAnimating(false);
        }, 300);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative max-w-4xl mx-auto px-4 sm:px-12">
            {/* Navigation Buttons - Desktop */}
            <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold transition-colors duration-300 p-2"
                aria-label="Previous testimonial"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold transition-colors duration-300 p-2"
                aria-label="Next testimonial"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Testimonial Content */}
            <div
                className={`text-center transition-opacity duration-300 ease-in-out px-4 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            >
                {/* Decorative Quote Mark */}
                <div className="text-gold opacity-50 font-heading text-6xl lg:text-8xl leading-none mb-6">
                    &ldquo;
                </div>

                {/* Quote Text */}
                <p className="text-white text-xl md:text-2xl italic leading-relaxed mb-8 font-light">
                    {currentTestimonial.quote}
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6 text-gold">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 fill-current"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>

                {/* Author Info */}
                <h4 className="text-sand font-heading text-lg font-semibold mb-1">
                    {currentTestimonial.author}
                </h4>

                <p className="text-white/60 text-sm uppercase tracking-wider">
                    {currentTestimonial.detail}
                </p>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-gold w-8'
                                : 'bg-white/20 hover:bg-white/50'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                    />
                ))}
            </div>
        </div>
    );
}
