import React, { Component } from 'react';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImageIndex: 0,
        };
    }
    handleImageClick = (index) => {
        this.setState({ selectedImageIndex: index });
    };

    handleNextImage = () => {
        const { gallery } = this.props;
        this.setState((prevState) => ({
        selectedImageIndex:
            (prevState.selectedImageIndex + 1) % gallery.length,
        }));
    };

    handlePrevImage = () => {
        const { gallery } = this.props;
        this.setState((prevState) => ({
        selectedImageIndex:
            (prevState.selectedImageIndex - 1 + gallery.length) % gallery.length,
        }));
    };

    render() {
        const { gallery, name } = this.props
        const { selectedImageIndex } = this.state
        const selectedImage = (gallery.length > 0)? gallery[selectedImageIndex]: '';    

        return (
            <div className="flex flex-col md:flex-row lg:w-1/2 lg:pr-8"
                data-testid='product-gallery'
            >
                    {/* Thumbnails */}
                    <div className="flex md:flex-col items-start space-y-2 space-x-2 mb-4 md:mb-0">
                        {gallery.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-20 h-20 object-contain cursor-pointer ${
                            selectedImageIndex === index
                                ? 'border border-green-500'
                                : ''
                            }`}
                            onClick={() => this.handleImageClick(index)}
                        />
                        ))}
                    </div>

                    {/* Main Image with Navigation Arrows */}
                    <div className="relative w-full h-96 md:pl-4">
                        <img
                            src={selectedImage}
                            alt={name}
                            className="w-full h-64 md:h-96 object-contain"
                        />

                        {/* Previous Button */}
                        <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 ml-10 bg-gray-800 text-white hover:bg-gray-700"
                        onClick={this.handlePrevImage}
                        >
                        <img src={arrowLeft} alt="carousel left scroll button" />
                        </button>

                        {/* Next Button */}
                        <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 mr-6 bg-gray-800 text-white hover:bg-gray-700"
                        onClick={this.handleNextImage}
                        >
                        <img src={arrowRight} alt="carousel right scroll button" />
                        </button>
                    </div>
                </div>
        );
    }
}

export default ImageCarousel;