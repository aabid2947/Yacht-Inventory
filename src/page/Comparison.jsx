import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useComparison } from "../context/ComparisonContext";
import defaultBoatImageIcon from "../assets/boat.png"; // Default image if specific one is missing
import RecommendedBoat from '../components/RecommendedBoat'

// Helper for formatting price
const formatPrice = (price) => {
    if (price === null || price === undefined || price === "" || isNaN(parseInt(price))) {
        return "N/A";
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(parseInt(price));
};

// Helper for accessing meta fields safely
const getMetaField = (boat, fieldName, defaultValue = "N/A") => {
    const value = boat?.meta?.[fieldName];
    // If value is an empty string, also consider it as "N/A" or keep it empty based on preference
    // For now, empty string will also fall to defaultValue if not explicitly checked
    if (value === "" && defaultValue === "N/A") return "N/A";
    return value || defaultValue;
};

export default function Comparison() {
    const navigate = useNavigate();
    const { selectedItems, clearSelection, toggleItem } = useComparison();

    // For debugging: Log selectedItems to see their structure and content
    // console.log("Selected items in Comparison page:", JSON.stringify(selectedItems, null, 2));

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    const handleClearAll = () => {
        try {
            clearSelection();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveItem = (item) => {
        toggleItem(item);
        if(selectedItems.length <= 2){
            clearSelection();

            navigate('/')
        }

    };

    const itemsToDisplay = selectedItems.slice(0, 3);

    if (itemsToDisplay.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-8 text-center">
                <h1 className="text-2xl font-semibold mb-4">Comparison</h1>
                <p className="text-lg text-gray-600 mb-6">No boats currently selected for comparison.</p>
                <button
                    className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center gap-2 text-base cursor-pointer mx-auto shadow-md"
                    onClick={() => navigate('/')}
                >
                    <span className="text-lg">←</span> Back to Search
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f0f0] pt-20">
            <div className="max-w-7xl mx-auto p-4">
                {/* Top Boat Cards */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {itemsToDisplay.map((boat, idx) => {
                        const boatTitle = boat.title?.rendered || "Unnamed Boat";
                        return (
                            <div
                                key={boat.id || idx}
                                className={`flex flex-col xl:flex-row gap-4 p-4 items-center xl:items-start w-full md:w-1/2 xl:w-[calc(33.333%-16px)] ${idx !== 2 ? 'xl:border-r xl:border-gray-300 xl:pr-4' : ''
                                    }`}
                            >
                                <img
                                    src={boat.displayImageUrl || defaultBoatImageIcon}
                                    alt={boatTitle}
                                    className="w-36 h-24 rounded-md object-cover"
                                />
                                <div className="flex flex-col justify-between text-center md:text-left flex-grow">
                                    <div className="text-md font-semibold text-gray-800" title={boatTitle}>{boatTitle}</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Year: {getMetaField(boat, '_yacht_year')}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Condition: {getMetaField(boat, '_yacht_boat_condition')}
                                    </div>
                                    <button
                                        className="text-red-600 hover:text-red-800 text-xs mt-2 cursor-pointer font-medium self-center md:self-start"
                                        onClick={() => handleRemoveItem(boat)}
                                    >
                                        Remove from Comparison
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {Array(Math.max(0, 3 - itemsToDisplay.length)).fill(null).map((_, idx) => (
                        <div key={`top-placeholder-${idx}`} aria-hidden="true" className="w-full md:w-1/2 xl:w-[calc(33.333%-16px)] p-3">
                            {/* Placeholder for layout */}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                    <button
                        className="bg-[rgba(39,73,137,1)] hover:bg-blue-800 text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-sm cursor-pointer w-full sm:w-auto justify-center shadow"
                        onClick={handleClearAll}
                    >
                        <span className="text-md">←</span> Back to Search
                    </button>
                    <button
                        className="text-red-600 hover:text-red-800 border border-red-500 hover:bg-red-50 px-5 py-2.5 rounded-md text-sm cursor-pointer w-full sm:w-auto justify-center shadow"
                        onClick={handleClearAll}
                    >
                        Remove All Selections
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Description Section */}
                    <section className="border border-gray-300 rounded-xl p-10 md:p-10 shadow-sm bg-white">
                        <h2 className="text-[26px] font-semibold mb-5 text-black">Description</h2>
                        <div className="grid grid-cols-[1fr] md:grid-cols-4 gap-x-4 gap-y-2">
                            <div className="col-span-1 pb-2 md:pb-0">
                                {['Make', 'Model', 'Year', 'Price', 'Type', 'Class', 'Hull Material', 'Identifier (Stock No.)'].map(label => (
                                    <div key={label} className="text-[18px] font-bold text-black py-1.5 border-b md:border-b-0 md:pr-2">{label}</div>
                                ))}
                            </div>
                            {itemsToDisplay.map((boat) => (
                                <div key={`desc-${boat.id}`} className="col-span-1 md:border-l border-gray-300 md:pl-6 text-sm text-gray-500">
                                    <div className="py-1.5 border-b md:border-none truncate text-[rgba(0,0,0,0.65)]" title={getMetaField(boat, '_yacht_make')}>{getMetaField(boat, '_yacht_make')}</div>
                                    <div className="py-1.5 border-b md:border-none truncate text-[rgba(0,0,0,0.65)]" title={getMetaField(boat, '_yacht_model')}>{getMetaField(boat, '_yacht_model')}</div>
                                    <div className="py-1.5 border-b md:border-none text-[rgba(0,0,0,0.65)]">{getMetaField(boat, '_yacht_year')}</div>
                                    <div className="py-1.5 border-b md:border-none font-semibold text-[rgba(0,0,0,0.65)]">{formatPrice(getMetaField(boat, '_yacht_price', null))}</div>
                                    <div className="py-1.5 border-b md:border-none text-[rgba(0,0,0,0.65)]">{getMetaField(boat, '_yacht_boat_type')}</div> {/* Corrected field */}
                                    <div className="py-1.5 border-b md:border-none text-[rgba(0,0,0,0.65)]">{getMetaField(boat, '_yacht_class')}</div> {/* Likely "N/A" if missing */}
                                    <div className="py-1.5 border-b md:border-none text-[rgba(0,0,0,0.65)]">{getMetaField(boat, '_yacht_hull_material')}</div>
                                    <div className="py-1.5">{getMetaField(boat, '_yacht_identifier')}</div> {/* Changed to _yacht_identifier */}
                                </div>
                            ))}
                            {Array(Math.max(0, 3 - itemsToDisplay.length)).fill(null).map((_, idx) => (
                                <div key={`desc-placeholder-${idx}`} aria-hidden="true" className="hidden md:block col-span-1 md:border-l md:pl-4">
                                    {Array(8).fill(null).map((__, i) => <div key={i} className="text-sm py-1.5 text-gray-400">N/A</div>)}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Engines Section */}
                    <section className="border border-gray-300 rounded-xl p-10 md:p-10 shadow-sm bg-white">
                        <h2 className="text-[26px] font-semibold mb-5 text-black">Engines</h2>
                        <div className="grid grid-cols-[1fr] md:grid-cols-4 gap-x-4 gap-y-2">
                            <div className="col-span-1 pb-2 md:pb-0">
                                {['Engine Make', 'Engine Model', 'Engine HP', 'Fuel Type'].map(label => (
                                    <div key={label} className="text-[18px] font-bold text-black py-1.5 border-b md:border-b-0 md:pr-2">{label}</div>
                                ))}
                            </div>
                            {itemsToDisplay.map((boat) => (
                                <div key={`engine-${boat.id}`} className="col-span-1 md:border-l border-gray-300 md:pl-6 text-sm text-gray-500">
                                    <div className="py-1.5 border-b md:border-none">{getMetaField(boat, '_yacht_engine_make')}</div>
                                    <div className="py-1.5 border-b md:border-none">{getMetaField(boat, '_yacht_engine_model')}</div>
                                    <div className="py-1.5 border-b md:border-none">{getMetaField(boat, '_yacht_engine_hp')}</div> {/* Corrected field */}
                                    <div className="py-1.5">{getMetaField(boat, '_yacht_fuel_type')}</div>
                                </div>
                            ))}
                            {Array(Math.max(0, 3 - itemsToDisplay.length)).fill(null).map((_, idx) => (
                                <div key={`engine-placeholder-${idx}`} aria-hidden="true" className="hidden md:block col-span-1 md:border-l md:pl-4">
                                    {Array(4).fill(null).map((__, i) => <div key={i} className="text-sm py-1.5 text-gray-400">N/A</div>)}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Specifications Section */}
                    <section className="border border-gray-300 rounded-xl p-10 md:p-10 shadow-sm bg-white">
                        <h2 className="text-[26px] font-semibold mb-5 text-black">Specifications</h2>
                        <div className="grid grid-cols-[1fr] md:grid-cols-4 gap-x-4 gap-y-2">
                            <div className="col-span-1 pb-2 md:pb-0">
                                {['Length Overall (ft)', 'Beam (ft)'].map(label => (
                                    <div key={label} className="text-[18px] font-bold text-black py-1.5 border-b md:border-b-0 md:pr-2">{label}</div>
                                ))}
                            </div>
                            {itemsToDisplay.map((boat) => (
                                <div key={`spec-${boat.id}`} className="col-span-1 md:border-l border-gray-300 md:pl-6 text-sm text-gray-500">
                                    <div className="py-1.5 border-b md:border-none">{getMetaField(boat, '_yacht_length_overall')}</div> {/* Corrected field */}
                                    <div className="py-1.5">{getMetaField(boat, '_yacht_beam')}</div> {/* Corrected field */}
                                </div>
                            ))}
                            {Array(Math.max(0, 3 - itemsToDisplay.length)).fill(null).map((_, idx) => (
                                <div key={`spec-placeholder-${idx}`} aria-hidden="true" className="hidden md:block col-span-1 md:border-l md:pl-4">
                                    {Array(2).fill(null).map((__, i) => <div key={i} className="text-sm py-1.5 text-gray-400">N/A</div>)}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}