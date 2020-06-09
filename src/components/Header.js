import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <header> 
                <div className="title-section">
                    <h1>RIDESHARE COST CALCULATOR</h1>
                    <p className="disclaimer">
                        *This tool is intended to calculate the true cost of operating your vehicle for a rideshare service. Calculations account for fuel, maintenance, repairs, and depreciation costs. Auto insurance, licensing, registration, taxes, and financing are not included. All values assume 15,000 miles annually and are sourced from
                        <a href="https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4"> https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4</a>
                    </p>
                </div>
            </header>
        );
    }
}

export default Header;
