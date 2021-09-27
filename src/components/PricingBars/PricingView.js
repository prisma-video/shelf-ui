import React from 'react';

const PricingView = () => (
<div className="section section--top">
    <div className="container">
        <div className="row row--grid">
            <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
                <div className="price">
                    <div className="price__item price__item--first"><span>Basic</span> <span>Free</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> 7 days</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> 720p Resolution</span></div>
                    <div className="price__item price__item--none"><span><i className="icon ion-ios-close"></i> Limited Availability</span></div>
                    <div className="price__item price__item--none"><span><i className="icon ion-ios-close"></i> Desktop Only</span></div>
                    <div className="price__item price__item--none"><span><i className="icon ion-ios-close"></i> Limited Support</span></div>
                    <a href="#" className="price__btn">Choose Plan</a>
                </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
                <div className="price price--premium">
                    <div className="price__item price__item--first"><span>Premium</span> <span>$34.99 <sub>/ month</sub></span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> 1 Month</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> Full HD</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> Lifetime Availability</span></div>
                    <div className="price__item price__item--none"><span><i className="icon ion-ios-close"></i> TV & Desktop</span></div>
                    <div className="price__item price__item--none"><span><i className="icon ion-ios-close"></i> 24/7 Support</span></div>
                    <a href="#" className="price__btn">Choose Plan</a>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 order-md-3">
                <div className="price">
                    <div className="price__item price__item--first"><span>Cinematic</span> <span>$49.99 <sub>/ month</sub></span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> 2 Months</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> Ultra HD</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> Lifetime Availability</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> Any Device</span></div>
                    <div className="price__item"><span><i className="icon ion-ios-checkmark"></i> 24/7 Support</span></div>
                    <a href="#" className="price__btn">Choose Plan</a>
                </div>
            </div>
        </div>
    </div>
</div>
);

export default PricingView;