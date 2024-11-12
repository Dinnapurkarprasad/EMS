import React from 'react';

function SummaryCard({ icon, text, number }) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div>
                {icon}
            </div>
            <div>
                <p className="font-semibold text-lg">{text}</p>
                <p className="text-xl font-bold">{number}</p>
            </div>
        </div>
    );
}

export default SummaryCard;
