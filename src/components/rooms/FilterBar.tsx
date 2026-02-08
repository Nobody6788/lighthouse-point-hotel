import { useState } from 'preact/hooks';

interface FilterBarProps {
    onFilterChange?: (filter: string) => void;
    onSortChange?: (sort: string) => void;
}

export default function FilterBar({ onFilterChange, onSortChange }: FilterBarProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeSort, setActiveSort] = useState('Price: Low to High');

    const filters = ['All', 'Ocean View', 'Harbor View', 'Garden'];
    const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Room Size'];

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        if (onFilterChange) onFilterChange(filter);
    };

    const handleSortChange = (e: any) => {
        const value = e.target.value;
        setActiveSort(value);
        if (onSortChange) onSortChange(value);
    };

    return (
        <div className="sticky top-20 z-30 bg-white shadow-sm border-b border-sand/30 py-4 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="text-sm font-semibold text-navy mr-2 my-auto hidden md:inline-block">View Type:</span>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === filter
                                    ? 'bg-gold text-white shadow-sm'
                                    : 'bg-white text-charcoal border border-sand hover:border-gold hover:text-gold'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3">
                    <label htmlFor="sort-select" className="text-sm font-semibold text-navy whitespace-nowrap">Sort by:</label>
                    <div className="relative">
                        <select
                            id="sort-select"
                            value={activeSort}
                            onChange={handleSortChange}
                            className="appearance-none bg-white border border-sand text-charcoal text-sm rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer min-w-[160px]"
                        >
                            {sortOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
