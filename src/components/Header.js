import React from 'react';

class Header extends React.Component {
    state = {
        hidden: true
    };

    handleClick = () =>
        this.setState(
            prevState => ({ hidden: !prevState.hidden })
        );

    render() {
        return (
            <header> 
                <div className="title-section">
                    <h1>THE REAL COST OF RIDESHARE</h1>
                    <div className={`trigger ${!this.state.hidden && "info-on"}`} onClick={() => this.handleClick()}>
                        What is this?<span>▼</span>
                    </div>
                    <p className={`disclaimer ${!this.state.hidden && "info-on"}`}>
                        This tool is intended to calculate the true cost of operating your vehicle for a rideshare service. Calculations account for fuel, maintenance, repairs, and depreciation costs. Auto insurance, licensing, registration, taxes, and financing are not included. All values assume 15,000 miles annually and are sourced from
                        <a href="https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4"> https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4</a>
                        <br/><br/>
                        Animation Credit: @MohamedIrfan <a href="https://lottiefiles.com/irfanzx">https://lottiefiles.com/irfanzx</a>
                    </p>
                </div>
            </header>
        );
    }
}

export default Header;
