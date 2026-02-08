import { useState } from 'preact/hooks';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                    <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                        aria-expanded={openIndex === index}
                    >
                        <span className="font-heading text-lg text-navy font-semibold pr-4">
                            {item.question}
                        </span>
                        <span
                            className={`text-gold text-2xl font-light transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-45' : ''
                                }`}
                        >
                            +
                        </span>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="px-6 pb-6 text-charcoal/80 leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
