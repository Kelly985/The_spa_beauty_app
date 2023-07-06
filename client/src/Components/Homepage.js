import React from 'react';
import Slideshow from './Slideshow';

function Homepage() {
    return (
        <div className="entirePage">
            
                <div className="aboutSection">
                <div className='tittle-top'  ><h1 >THE SPA BEAUTY SHOP</h1></div>
                <br/>   
                    </div>
                <div className="content-container">
                    <div className="text-container">
                    {/* <h3>Additional Content</h3> */}
                    <h2>
                        THE SPA BEAUTY is a leading company in the beauty industry, renowned for its exceptional range of services aimed
                        at enhancing and rejuvenating your natural beauty. With a commitment to providing a luxurious and serene atmosphere,
                        our expert team of professionals offers a diverse selection of treatments tailored to meet your individual needs. From soothing massages and invigorating
                        facials to revitalizing body wraps and indulgent manicures, our comprehensive menu ensures that every aspect of your beauty regimen is covered. With the use of high-quality products and state-of-the-art
                        techniques, we guarantee an experience that leaves you feeling pampered, refreshed, and radiant. Whether you're seeking relaxation, rejuvenation, or a complete beauty transformation, THE SPA BEAUTY is your ultimate
                        destination for all things beauty.
                    </h2>
                    </div>
                    <div className="slideshow-container">
                    <Slideshow />
                </div>
                
                </div>
                </div>
    
    );
}

export default Homepage;
