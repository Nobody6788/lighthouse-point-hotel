export interface Room {
    id: string;
    slug: string;
    name: string;
    price: number;
    size: string;
    bed: string;
    view: string;
    description: string;
    longDescription: string;
    images: string[];
    badge?: string;
    amenities: string[];
    details: {
        maxGuests: number;
        floor: string;
        checkIn: string;
        checkOut: string;
    };
}

export const rooms: Room[] = [
    {
        id: "1",
        slug: "ocean-view-suite",
        name: "Ocean View Suite",
        price: 389,
        size: "520 sq ft",
        bed: "King Bed",
        view: "Ocean View",
        description: "Wake up to panoramic Atlantic views from your private balcony. This spacious suite features a separate living area, marble bathroom with soaking tub, and coastal-inspired décor.",
        longDescription: "Experience the ultimate in coastal luxury with our Ocean View Suite. Perched on the upper floors, these suites offer unobstructed views of the Atlantic Ocean, allowing you to wake up to the soothing sound of waves and breathtaking sunrises.\n\nThe suite features a spacious open-plan layout with a dedicated living area, perfect for relaxing after a day of exploration. The décor reflects the serene beauty of the coast, with a palette of soft blues, sandy beiges, and crisp whites. A private furnished balcony provides the perfect vantage point for morning coffee or evening cocktails.",
        images: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32", // Main
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", // Bedroom
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a", // Bathroom
            "https://images.unsplash.com/photo-1540541338287-41700207dee6"  // Balcony/View
        ],
        badge: "Most Popular",
        amenities: [
            "King-size bed", "Private balcony", "Ocean view", "Free Wi-Fi",
            "55\" Smart TV", "Mini bar", "Nespresso machine", "Rainfall shower",
            "Luxury bathrobes", "Room service 24/7", "In-room safe", "Air conditioning"
        ],
        details: {
            maxGuests: 2,
            floor: "3rd-5th",
            checkIn: "3:00 PM",
            checkOut: "11:00 AM"
        }
    },
    {
        id: "2",
        slug: "harbor-view-room",
        name: "Harbor View Room",
        price: 259,
        size: "380 sq ft",
        bed: "Queen Bed",
        view: "Harbor View",
        description: "Overlooking the charming lighthouse harbor, this cozy room offers a quiet retreat with nautical touches, plush bedding, and a workspace for the modern traveler.",
        longDescription: "Enjoy a peaceful retreat overlooking the historic lighthouse harbor. Detailed with nautical touches and warm wood accents, this room captures the essence of a maritime getaway.",
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6"
        ],
        badge: "Best Value",
        amenities: [
            "Queen-size bed", "Harbor view", "Free Wi-Fi", "Work desk",
            "Smart TV", "Coffee maker", "Rainfall shower", "Air conditioning"
        ],
        details: {
            maxGuests: 2,
            floor: "1st-2nd",
            checkIn: "3:00 PM",
            checkOut: "11:00 AM"
        }
    },
    {
        id: "3",
        slug: "lighthouse-penthouse",
        name: "Lighthouse Penthouse",
        price: 899,
        size: "1200 sq ft",
        bed: "2 King Beds",
        view: "Panoramic",
        description: "Our crown jewel — a two-story penthouse with 360° views, private wraparound terrace, full gourmet kitchen, and dedicated butler service for the ultimate luxury experience.",
        longDescription: "The pinnacle of luxury living. Our Lighthouse Penthouse spans two floors and offers unparalleled 360-degree views of the coastline. Featuring a private wraparound terrace, a full gourmet kitchen, and a dedicated butler, this is the ultimate escape.",
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6"
        ],
        badge: "Luxury",
        amenities: [
            "2 King-size beds", "Private terrace", "Panoramic view", "Butler service",
            "Gourmet kitchen", "Jacuzzi", "Free Wi-Fi", "Smart TV system"
        ],
        details: {
            maxGuests: 4,
            floor: "Top Floor",
            checkIn: "2:00 PM",
            checkOut: "12:00 PM"
        }
    },
    {
        id: "4",
        slug: "garden-retreat",
        name: "Garden Retreat",
        price: 199,
        size: "340 sq ft",
        bed: "Queen Bed",
        view: "Garden View",
        description: "Nestled among our lush tropical gardens, this room offers a serene escape with a private patio, outdoor seating, and easy access to the resort pool.",
        longDescription: "Find tranquility in our Garden Retreat rooms. Located on the ground floor with direct access to our lush tropical gardens, these rooms feature a private patio perfect for reading or enjoying the fresh air.",
        images: [
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6"
        ],
        badge: "",
        amenities: [
            "Queen-size bed", "Private patio", "Garden view", "Free Wi-Fi",
            "Pool access", "Smart TV", "Mini fridge", "Air conditioning"
        ],
        details: {
            maxGuests: 2,
            floor: "Ground",
            checkIn: "3:00 PM",
            checkOut: "11:00 AM"
        }
    },
    {
        id: "5",
        slug: "coastal-deluxe-king",
        name: "Coastal Deluxe King",
        price: 319,
        size: "450 sq ft",
        bed: "King Bed",
        view: "Partial Ocean",
        description: "Enjoy partial ocean views and extra space in our Deluxe King room. Features a seating area, premium linens, and our signature rainfall shower.",
        longDescription: "Upgrade your stay with our Coastal Deluxe King. Offering more space and partial ocean views, these rooms are designed for comfort with a generous seating area and premium amenities.",
        images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6"
        ],
        badge: "",
        amenities: [
            "King-size bed", "Partial ocean view", "Seating area", "Free Wi-Fi",
            "Smart TV", "Premium linens", "Rainfall shower", "Air conditioning"
        ],
        details: {
            maxGuests: 2,
            floor: "2nd-4th",
            checkIn: "3:00 PM",
            checkOut: "11:00 AM"
        }
    },
    {
        id: "6",
        slug: "family-seaside-suite",
        name: "Family Seaside Suite",
        price: 459,
        size: "680 sq ft",
        bed: "King + Twin Beds",
        view: "Ocean View",
        description: "Perfect for families, this suite offers a master bedroom with a King bed and a separate area with two Twin beds. Includes a kitchenette and dining area.",
        longDescription: "Create lasting memories in our Family Seaside Suite. Designed with families in mind, this suite offers privacy and togetherness with separate sleeping areas and a convenient kitchenette.",
        images: [
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6"
        ],
        badge: "Family Friendly",
        amenities: [
            "King bed + 2 Twins", "Kitchenette", "Dining area", "Ocean view",
            "Free Wi-Fi", "2 Smart TVs", "Bathtub", "Air conditioning"
        ],
        details: {
            maxGuests: 4,
            floor: "1st-3rd",
            checkIn: "3:00 PM",
            checkOut: "11:00 AM"
        }
    }
];
