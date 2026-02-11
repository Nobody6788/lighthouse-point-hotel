import { useState, useEffect } from 'preact/hooks';

interface NavLink {
    label: string;
    href: string;
}

interface MobileNavProps {
    links: NavLink[];
    currentPath: string;
}

export default function MobileNav({ links, currentPath }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Hamburger Button - Hidden when menu is open */}
            <button
                onClick={toggleMenu}
                className={`lg:hidden z-[10000] relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold rounded-lg bg-white/5 border border-navy/10 hover:border-gold/30 transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Open menu"
                aria-expanded={isOpen ? 'true' : 'false'}
            >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                    <span className="w-full h-0.5 bg-navy" />
                    <span className="w-full h-0.5 bg-navy" />
                    <span className="w-full h-0.5 bg-navy" />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                {/* Enhanced Background - Solid dark overlay for maximum readability */}
                <div className="absolute inset-0 bg-navy backdrop-blur-md" />

                {/* Content */}
                <div className={`relative h-full flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                    {/* Header with Logo and Close Button */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                        <h2 className="text-white text-base font-bold tracking-wide">
                            Lighthouse Point Hotel
                        </h2>
                        <button
                            onClick={closeMenu}
                            className="group flex w-9 h-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links - Clean Sans-Serif */}
                    <nav className="flex-1 px-6 pt-4 pb-3">
                        <ul className="space-y-2">
                            {links.map((link, index) => (
                                <li
                                    key={link.href}
                                    className={`transform transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={closeMenu}
                                        className={`group flex items-center gap-3 py-1.5 transition-all duration-300 ${currentPath === link.href
                                            ? 'text-gold'
                                            : 'text-white hover:text-gold'
                                            }`}
                                    >
                                        <span className="text-lg font-medium">
                                            {link.label}
                                        </span>
                                        {currentPath === link.href && (
                                            <div className="h-[2px] w-8 bg-gold rounded-full" />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Book Your Stay CTA */}
                        <div className={`mt-4 transform transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${links.length * 50}ms` }}>
                            <a
                                href="/book"
                                onClick={closeMenu}
                                className="flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-navy text-sm font-bold shadow-[0_0_30px_rgba(238,205,43,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(238,205,43,0.5)] transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book Your Stay
                            </a>
                        </div>
                    </nav>

                    {/* Compact Footer - Contact & Social */}
                    <div className={`mt-auto px-6 pb-4 border-t border-white/10 pt-3 transform transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${(links.length + 1) * 50}ms` }}>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-1 mb-3">
                            <p className="text-white/40 text-[10px] uppercase tracking-wider">Contact</p>
                            <a href="tel:+15551234567" className="text-white text-xs font-semibold hover:text-gold transition-colors">
                                +1 (555) 123-4567
                            </a>
                            <a href="mailto:info@lighthousepoint.com" className="text-white/70 text-xs hover:text-gold transition-colors">
                                info@lighthousepoint.com
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-gold/40 text-white/60 hover:text-gold transition-all"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-gold/40 text-white/60 hover:text-gold transition-all"
                                aria-label="Facebook"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-gold/40 text-white/60 hover:text-gold transition-all"
                                aria-label="Twitter"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
