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
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="lg:hidden z-50 relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold rounded"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                    <span
                        className={`w-full h-0.5 bg-navy transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`w-full h-0.5 bg-navy transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'
                            }`}
                    />
                    <span
                        className={`w-full h-0.5 bg-navy transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-navy z-40 lg:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <nav className="h-full flex flex-col items-center justify-center px-8">
                    {/* Navigation Links */}
                    <ul className="space-y-8 text-center mb-12">
                        {links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`text-2xl font-heading transition-colors duration-200 ${currentPath === link.href
                                            ? 'text-gold'
                                            : 'text-white hover:text-gold'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Book Now Button */}
                    <a
                        href="/book"
                        onClick={closeMenu}
                        className="btn-primary text-lg px-8 py-4"
                    >
                        Book Now
                    </a>
                </nav>
            </div>
        </>
    );
}
