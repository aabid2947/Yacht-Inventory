import Boat from "../assets/boat.png"
import { useNavigate } from "react-router-dom"
import { useComparison } from "../context/ComparisonContext"

export default function BoatListing() {
    const navigate = useNavigate()
    const { selectedItems, clearSelection } = useComparison()

    const handleRemove = () => {
        try {
            clearSelection()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=" max-w-7xl mx-auto p-4">
            {/* Boat Cards */}
            <div className="flex flex-row  gap-6 mb-6">
                {[1, 2, 3].map((item, idx) => (
                    <div
                        key={item}
                        className={`flex flex-col xl:flex-row gap-4 p-3 items-center xl:items-start w-full xl:w-[calc(33.333%-16px)] ${idx !== 0 ? 'border-l border-gray-400' : ''
                            }`}
                    >
                        <img
                            src={Boat}
                            alt="2024 Aviara AV32 Outboard"
                            className="w-32 h-20 rounded-md object-contain md:object-cover"
                        />
                        <div className="flex flex-col justify-between text-center md:text-left">
                            <div className="text-sm font-medium">2024 Aviara AV32 Outboard</div>
                            <div className="text-xs text-gray-500">
                                {idx === 0 && '2023'}
                                {idx === 1 && '2024'}
                                {idx === 2 && 'New'}
                            </div>
                            <button className="text-red-500 text-xs mt-1 cursor-pointer" onClick={() => handleRemove}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>




            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm cursor-pointer" onClick={() => navigate('/')}>
                    <span className="text-xs">←</span> Back to search
                </button>
                <button className="text-red-500 px-4 py-2 text-sm cursor-pointer" onClick={handleRemove}>Remove all</button>
            </div>

            {/* Description Section */}
            <div className="border rounded-2xl p-4 md:px-12 mb-4">
                <h2 className="font-bolder mb-4">Description</h2>
                <div className="grid grid-cols-4 gap-4">
                    {/* Label Column */}
                    <div className="col-span-1 ">
                        <div className="grid grid-cols-1 gap-2 font-bolder">
                            <div className="text-sm">Make</div>
                            <div className="text-sm">Model</div>
                            <div className="text-sm">Year</div>
                            <div className="text-sm">Price</div>
                            <div className="text-sm">Type</div>
                            <div className="text-sm">Class</div>
                            <div className="text-sm">Hull Material</div>
                            <div className="text-sm">Stock Number</div>
                        </div>
                    </div>

                    {/* Data Columns with Vertical Lines */}
                    {[1, 2, 3].map((col) => (
                        <div
                            key={col}
                            className="col-span-1 border-l pl-4 font-light text-gray-500" // border-left and padding for spacing
                        >
                            <div className="grid grid-cols-1 gap-2">
                                <div className="text-sm">Aviara</div>
                                <div className="text-sm">AV32 Outboard</div>
                                <div className="text-sm">2024</div>
                                <div className="text-sm">$424,495</div>
                                <div className="text-sm">Power</div>
                                <div className="text-sm">Sports Cruiser</div>
                                <div className="text-sm">Fiberglass</div>
                                <div className="text-sm">AV20034</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Engines Section */}
            <div className="border rounded-2xl p-4 md:px-12 mb-4">
                <h2 className="font-bolder mb-4">Engines</h2>
                <div className="grid grid-cols-4 gap-4">
                    {/* Label Column */}
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-2 font-bolder">
                            <div className="text-sm">Engine Make</div>
                            <div className="text-sm">Engine Model</div>
                            <div className="text-sm">Propulsion</div>
                            <div className="text-sm">Fuel Type</div>
                        </div>
                    </div>

                    {/* Data Columns with Vertical Lines */}
                    {[1, 2, 3].map((col) => (
                        <div key={col} className="col-span-1 border-l pl-4 text-gray-500">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="text-sm">MERCURY</div>
                                <div className="text-sm">300XL V10</div>
                                <div className="text-sm">4800.0 hp</div>
                                <div className="text-sm">Unleaded</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Specifications Section */}
            <div className="border rounded-2xl md:px-12 p-4">
                <h2 className="mb-4 font-bolder">Specifications</h2>
                <div className="grid grid-cols-4 gap-4">
                    {/* Label Column */}
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-2 font-bolder">
                            <div className="text-sm">Length</div>
                            <div className="text-sm">Beam</div>
                        </div>
                    </div>

                    {/* Data Columns with Vertical Lines */}
                    {[1, 2, 3].map((col) => (
                        <div key={col} className="col-span-1 border-l pl-4 text-gray-500">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="text-sm">34</div>
                                <div className="text-sm">10.33</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
