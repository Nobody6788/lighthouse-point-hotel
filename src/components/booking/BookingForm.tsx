import { useState, useEffect, useRef } from 'preact/hooks';

interface Room {
    id: string;
    name: string;
    price: number;
    image: string;
    amenities: string[];
}

const rooms: Room[] = [
    { id: 'garden', name: 'Garden Retreat', price: 199, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304', amenities: ['Garden View', 'King Bed', 'Free WiFi'] },
    { id: 'harbor', name: 'Harbor View Room', price: 259, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427', amenities: ['Harbor View', 'Queen Bed', 'Balcony'] },
    { id: 'coastal', name: 'Coastal Deluxe King', price: 319, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32', amenities: ['Partial Ocean View', 'King Bed', 'Soaking Tub'] },
    { id: 'ocean', name: 'Ocean View Suite', price: 389, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', amenities: ['Ocean View', 'King Bed', 'Living Area'] },
    { id: 'family', name: 'Family Seaside Suite', price: 459, image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a', amenities: ['2 Bedrooms', 'Ocean View', 'Kitchenette'] },
    { id: 'penthouse', name: 'Lighthouse Penthouse', price: 899, image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4', amenities: ['360° Views', 'Private Terrace', 'Butler Service'] }
];

export default function BookingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');

    // Form state
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [occasion, setOccasion] = useState('None');
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [receiveOffers, setReceiveOffers] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Refs for scroll tracking
    const step1Ref = useRef<HTMLDivElement>(null);
    const step2Ref = useRef<HTMLDivElement>(null);
    const step3Ref = useRef<HTMLDivElement>(null);

    // Calculate nights
    const nights = checkIn && checkOut ?
        Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;

    // Calculate total
    const selectedRoomData = rooms.find(r => r.id === selectedRoom);
    const roomRate = selectedRoomData?.price || 0;
    const estimatedTotal = roomRate * nights;

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    // Handle form submission
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const refNum = 'LPH-' + Math.floor(100000 + Math.random() * 900000);
        setReferenceNumber(refNum);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Scroll tracking for step indicators
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + 200;

            if (step3Ref.current && scrollY >= step3Ref.current.offsetTop) {
                setCurrentStep(3);
            } else if (step2Ref.current && scrollY >= step2Ref.current.offsetTop) {
                setCurrentStep(2);
            } else {
                setCurrentStep(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16 px-4">
                <div className="mb-8 animate-bounce-in">
                    <svg className="w-20 h-20 mx-auto text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl text-navy font-bold mb-4">
                    Thank You, {firstName}!
                </h2>
                <p className="text-lg text-charcoal/80 mb-6">
                    Your booking inquiry has been received.
                </p>
                <div className="bg-sand/20 rounded-lg p-6 mb-8 text-left">
                    <p className="text-charcoal/80 mb-4">
                        We'll review availability for <strong className="text-navy">{selectedRoomData?.name}</strong> and contact you at <strong className="text-navy">{email}</strong> within 2 hours to confirm your reservation.
                    </p>
                    <p className="text-sm text-charcoal/60">
                        Inquiry Reference: <span className="font-mono font-bold text-gold">{referenceNumber}</span>
                    </p>
                </div>
                <p className="text-charcoal/70 mb-6">
                    Questions? Call us at <a href="tel:+19545550123" className="text-ocean hover:text-gold transition-colors">(954) 555-0123</a>
                </p>
                <a href="/" className="btn-primary inline-block">Return to Home</a>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative">
            {/* Main Form Column */}
            <div className="w-full lg:w-2/3">

                {/* Step Indicators */}
                <div className="mb-12">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 1 ? 'bg-gold text-white' : 'bg-sand/30 text-charcoal/50'}`}>
                                1
                            </div>
                            <span className="text-xs mt-2 text-center">Dates & Guests</span>
                        </div>
                        <div className={`flex-1 h-1 mx-2 transition-all ${currentStep >= 2 ? 'bg-gold' : 'bg-sand/30'}`}></div>
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 2 ? 'bg-gold text-white' : 'bg-sand/30 text-charcoal/50'}`}>
                                2
                            </div>
                            <span className="text-xs mt-2 text-center">Select Room</span>
                        </div>
                        <div className={`flex-1 h-1 mx-2 transition-all ${currentStep >= 3 ? 'bg-gold' : 'bg-sand/30'}`}></div>
                        <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 3 ? 'bg-gold text-white' : 'bg-sand/30 text-charcoal/50'}`}>
                                3
                            </div>
                            <span className="text-xs mt-2 text-center">Your Details</span>
                        </div>
                    </div>
                </div>

                <form name="booking-inquiry" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                    <input type="hidden" name="form-name" value="booking-inquiry" />

                    {/* STEP 1: Dates & Guests */}
                    <div ref={step1Ref} className="bg-sand/20 rounded-xl p-6 md:p-8 mb-8">
                        <h3 className="font-heading text-2xl text-navy font-bold mb-6">Dates & Guests</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Check-in Date <span className="text-gold">*</span></label>
                                <input
                                    type="date"
                                    name="checkIn"
                                    min={today}
                                    required
                                    value={checkIn}
                                    onChange={(e) => setCheckIn((e.target as HTMLInputElement).value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Check-out Date <span className="text-gold">*</span></label>
                                <input
                                    type="date"
                                    name="checkOut"
                                    min={checkIn || today}
                                    required
                                    value={checkOut}
                                    onChange={(e) => setCheckOut((e.target as HTMLInputElement).value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Adults <span className="text-gold">*</span></label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center text-xl font-bold"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        name="adults"
                                        value={adults}
                                        readOnly
                                        className="flex-1 text-center border border-gray-300 rounded-lg py-3 px-4"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setAdults(Math.min(6, adults + 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Children</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center text-xl font-bold"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        name="children"
                                        value={children}
                                        readOnly
                                        className="flex-1 text-center border border-gray-300 rounded-lg py-3 px-4"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setChildren(Math.min(4, children + 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gold hover:bg-gold/10 transition-all flex items-center justify-center text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-navy mb-2">Special Occasion?</label>
                            <select
                                name="occasion"
                                value={occasion}
                                onChange={(e) => setOccasion((e.target as HTMLSelectElement).value)}
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                            >
                                <option value="None">None</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Honeymoon">Honeymoon</option>
                                <option value="Business">Business</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* STEP 2: Select Room */}
                    <div ref={step2Ref} className="bg-sand/20 rounded-xl p-6 md:p-8 mb-8">
                        <h3 className="font-heading text-2xl text-navy font-bold mb-6">Select Room</h3>

                        <div className="space-y-4">
                            {rooms.map((room) => (
                                <label
                                    key={room.id}
                                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedRoom === room.id
                                            ? 'border-gold bg-gold/5'
                                            : 'border-gray-200 hover:border-gold/50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="room"
                                        value={room.id}
                                        checked={selectedRoom === room.id}
                                        onChange={() => setSelectedRoom(room.id)}
                                        className="w-5 h-5 text-gold focus:ring-gold"
                                        required
                                    />
                                    <img src={room.image} alt={room.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h4 className="font-heading text-lg text-navy font-bold">{room.name}</h4>
                                        <p className="text-sm text-charcoal/60">{room.amenities.join(' • ')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-charcoal/60">From</p>
                                        <p className="font-heading text-xl text-gold font-bold">${room.price}</p>
                                        <p className="text-xs text-charcoal/50">per night</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* STEP 3: Guest Details */}
                    <div ref={step3Ref} className="bg-sand/20 rounded-xl p-6 md:p-8 mb-8">
                        <h3 className="font-heading text-2xl text-navy font-bold mb-6">Your Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">First Name <span className="text-gold">*</span></label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName((e.target as HTMLInputElement).value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Last Name <span className="text-gold">*</span></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName((e.target as HTMLInputElement).value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Email <span className="text-gold">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Phone <span className="text-gold">*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-navy mb-2">Special Requests</label>
                            <textarea
                                name="specialRequests"
                                rows={3}
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests((e.target as HTMLTextAreaElement).value)}
                                placeholder="Any dietary needs, accessibility requirements, or special occasion details..."
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="receiveOffers"
                                    checked={receiveOffers}
                                    onChange={(e) => setReceiveOffers((e.target as HTMLInputElement).checked)}
                                    className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded mt-1"
                                />
                                <span className="text-sm text-charcoal/80">I'd like to receive exclusive offers and updates</span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    required
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms((e.target as HTMLInputElement).checked)}
                                    className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded mt-1"
                                />
                                <span className="text-sm text-charcoal/80">
                                    I agree to the <a href="#" className="text-ocean hover:text-gold transition-colors underline">booking terms</a> and <a href="#" className="text-ocean hover:text-gold transition-colors underline">cancellation policy</a> <span className="text-gold">*</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Mobile Submit Button */}
                    <div className="lg:hidden">
                        <button type="submit" className="btn-primary w-full py-4 text-lg">
                            Submit Inquiry
                        </button>
                    </div>
                </form>
            </div>

            {/* Summary Sidebar */}
            <div className="w-full lg:w-1/3">
                <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-xl p-6 border border-sand/20">
                    <h3 className="font-heading text-xl text-navy font-bold mb-6">Booking Summary</h3>

                    <div className="space-y-3 mb-6 text-sm">
                        <div className="flex justify-between">
                            <span className="text-charcoal/60">Room:</span>
                            <span className="font-semibold text-navy">{selectedRoomData?.name || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-charcoal/60">Check-in:</span>
                            <span className="font-semibold text-navy">{checkIn || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-charcoal/60">Check-out:</span>
                            <span className="font-semibold text-navy">{checkOut || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-charcoal/60">Nights:</span>
                            <span className="font-semibold text-navy">{nights || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-charcoal/60">Guests:</span>
                            <span className="font-semibold text-navy">
                                {adults} {adults === 1 ? 'adult' : 'adults'}
                                {children > 0 && `, ${children} ${children === 1 ? 'child' : 'children'}`}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-sand/30 pt-4 mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-charcoal/60">Rate:</span>
                            <span className="text-navy">${roomRate} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-heading text-lg text-navy font-bold">Estimated Total:</span>
                            <span className="font-heading text-2xl text-gold font-bold">${estimatedTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-charcoal/50 mt-2">Final price confirmed upon availability check</p>
                    </div>

                    <button type="submit" form="booking-inquiry" className="btn-primary w-full py-4 text-lg mb-4 hidden lg:block">
                        Submit Inquiry
                    </button>

                    <div className="text-center text-sm text-charcoal/60 space-y-2">
                        <p className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure submission
                        </p>
                        <p className="text-xs">No payment required now</p>
                        <p className="text-xs">We'll confirm availability within 2 hours</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
