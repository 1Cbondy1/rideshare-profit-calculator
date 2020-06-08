import React from 'react';
import Animation from './Animation';

import { vehicles } from '../data/vehicles.js'

class Main extends React.Component {
    state = {
        selectedVehicle: 4,
        cityMileage: '',
        highwayMileage: '',
        price: '',
        distance: '',
        includeDepreciation: false
    };

    handleSlider = (e) => this.setState({ selectedVehicle: parseFloat(e.target.value) });
    handleCityMileage = (e) => {
        const contstrained = parseFloat(e.target.value) > 99
            ? 99
            : parseFloat(e.target.value)
        this.setState({ cityMileage: contstrained })
    };
    handleHighwayMileage = (e) => {
        const contstrained = parseFloat(e.target.value) > 99
            ? 99
            : parseFloat(e.target.value)
        this.setState({ highwayMileage: contstrained })
    };
    handlePrice = (e) => {
        const contstrained = parseFloat(e.target.value) > 99
            ? 99
            : parseFloat(e.target.value)
        this.setState({ price: contstrained })
    };
    handleDistance = (e) => {
        const contstrained = parseFloat(e.target.value) > 9999
            ? 9999
            : parseFloat(e.target.value)
        this.setState({ distance: contstrained })
    };
    handleDepreciation = () =>
        this.setState(
            prevState => ({ includeDepreciation: !prevState.includeDepreciation })
        );
    resetValues = () => this.setState({ 
        selectedVehicle: 4,
        cityMileage: '',
        highwayMileage: '',
        price: '',
        distance: '',
    })

    calculateTotalCost = (costPerMile, displayCostPerMile) => {
        const totalCost = costPerMile * this.state.distance;

        // Only display total cost number if all fields are filled
        const displayTotalCost = !isNaN(this.state.distance) && this.state.distance !== '';
        const totalNumber = displayTotalCost && displayCostPerMile
            ? `$${totalCost.toFixed(2)}`
            : `-`

        return <>
            <p className="cost-snapshot-label">Total Cost</p>
            <div className="cost-snapshot-value">{totalNumber}</div>
        </>
    }  
    calculateCostPerMile = () => {
        const averageMileageCost = (this.state.cityMileage + this.state.highwayMileage)/2;
        const selectedMaintenanceCost = vehicles[this.state.selectedVehicle].maintenancePerMile;
        const prelimCost = (this.state.price/averageMileageCost) + selectedMaintenanceCost;

        const costPerMile = this.state.includeDepreciation 
            ? (prelimCost + vehicles[this.state.selectedVehicle].depreciationPerMile) 
            : prelimCost;

        // Only display cost per mile number if all neccessary fields are filled
        const displayCostPerMile = !isNaN(this.state.cityMileage) && !isNaN(this.state.highwayMileage) && !isNaN(this.state.price) && this.state.cityMileage !== '' && this.state.highwayMileage !== '' && this.state.price !== '';
        const perMileNumber = displayCostPerMile 
            ? `$${costPerMile.toFixed(2)}`
            : `-`

        const costDisplay = 
            <section className="cost-snapshot-section">
                <div>
                    <p className="cost-snapshot-label">Cost Per Mile</p>
                    <div className="cost-snapshot-value">
                        {perMileNumber}
                    </div>
                </div>
                <div>
                    {this.calculateTotalCost(costPerMile, displayCostPerMile)}
                </div>
            </section>

        return costDisplay;
    }

    render() {
        return (
            <>
                <section> 
                    <div className="title-section">
                        <h1>RIDESHARE PROFITABILITY CALCULATOR</h1>
                        <p className="disclaimer">
                            *This application is intended to calculate the true cost your vehicle in order to determine the profitability of driving for a rideshare service. Calculations account for fuel, maintenence, repairs, and depreciation costs. Auto insurance, licensing, registration, taxes, and financing are not included. All values assume 15,000 miles annually and are sourced from
                            <a href="https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4"> https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4</a>
                        </p>
                    </div>
                </section>

                <main className="main-content">
                    <form>
                        <div className="lottie-container">
                            <Animation />
                        </div>
                        <div className="form-section">
                            <p>What type of vehicle do you drive?</p>
                            <p className="disclaimer">*Type used to calculate cost of maintenance, repairs, and depreciation.</p>
                            <input type="range" min="0" max={vehicles.length - 1} value={this.state.selectedVehicle} id="type-slider" onChange={this.handleSlider}/>
                            <p>{vehicles[this.state.selectedVehicle].type}</p>
                        </div>
                        <div className="form-section">
                            <p>What is your vehicle's gas mileage? (MPG)</p>
                            <input type="number" max="999" placeholder="City" value={this.state.cityMileage} onChange={this.handleCityMileage} required></input>
                            <br/>
                            <input type="number" placeholder="Highway" value={this.state.highwayMileage} onChange={this.handleHighwayMileage} required></input>
                        </div>
                        <div className="form-section">
                            <p>What is the current price of gas? (USD)</p>
                            <input type="number" placeholder="Price" value={this.state.price} onChange={this.handlePrice} required></input>
                        </div>
                        <div className="form-section">
                            <p>How far did you drive? (mi)</p>
                            <input type="number" placeholder="Distance" value={this.state.distance} onChange={this.handleDistance} required></input>
                        </div>
                        <div className="form-section">
                            <input type="checkbox" id="depreciation-checkbox" value={this.state.includeDepreciation} onChange={this.handleDepreciation}></input>
                            <label htmlFor="depreciation-checkbox">Include Depreciation?</label>
                        </div>
                    </form>
                    <div className="cost-snapshot">
                        <h2>Cost Snapshot</h2>
                        {this.calculateCostPerMile()}
                        <button className="secondary-button" onClick={this.resetValues}>Reset</button>
                    </div>
                </main>

                <section className="donate-section">
                    Donate:
                </section>
            </>
        );
    }
}

export default Main;
