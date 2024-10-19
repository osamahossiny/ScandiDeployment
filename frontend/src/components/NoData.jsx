import React, { Component } from 'react';

class NoData extends Component {
    render() {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">Sorry</h1>
                <p className="text-xl text-gray-600 mb-8">hmmm, There is no data to show.</p>
            </div>
        );
    }
}

export default NoData;