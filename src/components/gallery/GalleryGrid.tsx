import { useState, useEffect, useCallback } from 'preact/hooks';

interface GalleryImage {
    src: string;
    category: string;
    alt: string;
    aspect: string; // 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]'
}

interface GalleryGridProps {
    images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [filteredImages, setFilteredImages] = useState(images);
    const [isAnimating, setIsAnimating] = useState(false);

    // Filter Categories
    const categories = ['All', 'Rooms', 'Dining', 'Spa', 'Beach', 'Events', 'Aerial'];

    // Handle Filter Change
    useEffect(() => {
        setIsAnimating(true);
        setTimeout(() => {
            if (activeFilter === 'All') {
                setFilteredImages(images);
            } else {
                setFilteredImages(images.filter(img => img.category === activeFilter));
            }
            setIsAnimating(false);
        }, 300);
    }, [activeFilter, images]);

    // Lightbox Navigation
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        document.body.style.overflow = '';
    };

    const nextImage = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
    }, [lightboxIndex, filteredImages]);

    const prevImage = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
    }, [lightboxIndex, filteredImages]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, nextImage, prevImage]);

    return (
        <div>
            {/* FILTER TABS */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                                ? 'bg-gold text-white shadow-md scale-105'
                                : 'bg-transparent text-navy hover:bg-sand/20 border border-transparent'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* GALLERY GRID */}
            <div
                className={`columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 px-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
            >
                {filteredImages.map((img, index) => (
                    <div
                        key={img.src}
                        className="break-inside-avoid relative group rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className={`w-full ${img.aspect} object-cover transition-transform duration-700 group-hover:scale-110`}
                            loading="lazy"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                            <span className="bg-gold text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {img.category}
                            </span>
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!isAnimating && filteredImages.length === 0 && (
                <div className="text-center py-20 text-charcoal/60">
                    <p className="text-lg">No photos found in this category.</p>
                </div>
            )}

            {/* LIGHTBOX */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-50"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Controls */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-50 hidden md:block"
                        aria-label="Previous"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-50 hidden md:block"
                        aria-label="Next"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Main Image */}
                    <div className="relative max-h-[90vh] max-w-full">
                        <img
                            src={filteredImages[lightboxIndex].src}
                            alt={filteredImages[lightboxIndex].alt}
                            className="max-h-[90vh] max-w-full object-contain shadow-2xl rounded-sm"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-[-30px] left-0 right-0 text-center text-white/60 text-sm">
                            {filteredImages[lightboxIndex].category}
                        </div>
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest bg-black/30 px-4 py-1 rounded-full">
                        {lightboxIndex + 1} / {filteredImages.length}
                    </div>
                </div>
            )}
        </div>
    );
}
