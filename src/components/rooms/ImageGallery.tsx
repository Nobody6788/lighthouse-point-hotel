import { useState, useEffect } from 'preact/hooks';

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const nextImage = (e: Event) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: Event) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[400px] md:h-[500px]">
                {/* Main Large Image */}
                <div
                    className="md:col-span-2 h-full relative cursor-pointer overflow-hidden rounded-lg group"
                    onClick={() => openLightbox(0)}
                >
                    <img
                        src={images[0]}
                        alt="Room main view"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-navy shadow-sm">
                        View Gallery
                    </div>
                </div>

                {/* Side Stacked Images */}
                <div className="hidden md:flex flex-col gap-2 h-full">
                    {images.slice(1, 3).map((img, idx) => (
                        <div
                            key={idx}
                            className="h-1/2 relative cursor-pointer overflow-hidden rounded-lg group"
                            onClick={() => openLightbox(idx + 1)}
                        >
                            <img
                                src={img}
                                alt={`Room view ${idx + 2}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Scroll Strip (visible on small screens only if needed, but grid handles it reasonably well. 
          The request asked for a horizontal scrollable strip on mobile. Let's do a simple implementation for mobile) */}
            <div className="md:hidden flex overflow-x-auto gap-2 mt-2 pb-2 snap-x">
                {images.slice(1).map((img, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 w-3/4 aspect-[4/3] rounded-lg overflow-hidden snap-center relative"
                        onClick={() => openLightbox(idx + 1)}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Controls */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 text-white/50 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Main Image */}
                    <img
                        src={images[currentIndex]}
                        alt="Gallery fullscreen"
                        className="max-h-[90vh] max-w-full object-contain shadow-2xl rounded-sm"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />

                    {/* Index Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-widest bg-black/50 px-4 py-1 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
