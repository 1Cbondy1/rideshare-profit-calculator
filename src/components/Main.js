import React from 'react';

var vehicles = [
    {
        id: 1,
        type: 'Small Sedan',
        maintenancePerMile: 0.0853,
        depreciationPerMile: 0.1493,
    },
    {
        id: 2,
        type: 'Medium Sedan',
        maintenancePerMile: 0.0918,
        depreciationPerMile: 0.2113,
    },
    {
        id: 3,
        type: 'Large Sedan',
        maintenancePerMile: 0.0949,
        depreciationPerMile: 0.2707,
    },
    {
        id: 4,
        type: 'Small SUV',
        maintenancePerMile: 0.0909,
        depreciationPerMile: 0.2088,
    },
    {
        id: 5,
        type: 'Medium SUV',
        maintenancePerMile: 0.0960,
        depreciationPerMile: 0.2529,
    },
    {
        id: 6,
        type: 'Minivan',
        maintenancePerMile: 0.0873,
        depreciationPerMile: 0.2690,
    },
    {
        id: 7,
        type: 'Pickup Truck',
        maintenancePerMile: 0.0877,
        depreciationPerMile: 0.2464,
    },
    {
        id: 8,
        type: 'Hybrid',
        maintenancePerMile: 0.0770,
        depreciationPerMile: 0.2058,
    },
    {
        id: 9,
        type: 'Electric',
        maintenancePerMile: 0.0660,
        depreciationPerMile: 0.3500,
    },
]

class Main extends React.Component {
    state = {
        selectedVehicle: 4,
        cityMileage: '',
        highwayMileage: '',
        price: '',
        includeDepreciation: false,
    };

    handleSlider = (e) => this.setState({ selectedVehicle: parseFloat(e.target.value) });
    handleCityMileage = (e) => this.setState({ cityMileage: parseFloat(e.target.value) });
    handleHighwayMileage = (e) => this.setState({ highwayMileage: parseFloat(e.target.value) });
    handlePrice = (e) => this.setState({ price: parseFloat(e.target.value) });
    handleDepreciation = () =>
        this.setState(
            prevState => ({ includeDepreciation: !prevState.includeDepreciation })
        );
        
    calculateCost = () => {
        const averageMileageCost = (this.state.cityMileage + this.state.highwayMileage)/2;
        const selectedMaintenanceCost = vehicles[this.state.selectedVehicle].maintenancePerMile;
        const prelimCost = (this.state.price/averageMileageCost) + selectedMaintenanceCost;

        const costPerMile = this.state.includeDepreciation 
            ? (prelimCost + vehicles[this.state.selectedVehicle].depreciationPerMile) 
            : prelimCost;

        // Only display calculation if all fields are filled
        const costDisplay = (!isNaN(this.state.cityMileage) && !isNaN(this.state.highwayMileage) && !isNaN(this.state.price) && this.state.cityMileage !== '' && this.state.highwayMileage !== '' && this.state.price !== '')
            ? <p><strong>${costPerMile.toFixed(2)}</strong> per mile</p>
            : <p class="warning">~Complete the form to calculate your vehicle's cost~</p>

        return costDisplay;
    }

    render() {
        return (
            <main class="main-content">

                <div class="title-section">
                    <h1>RIDESHARE PROFITABILITY CALCULATOR</h1>
                    <p class="disclaimer">
                        *Calculations account for fuel, maintenence, repairs, and depreciation costs. Auto insurance, licensing, registration, taxes, and financing are not included. All values assume 15,000 miles annually and are sourced from
                        <a href="https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4"> https://exchange.aaa.com/automotive/driving-costs/#.XtwAYJ5Kiu4</a>
                    </p>
                </div>

                <form>
                    <div class="lottie-container form-section">
                        {vehicles[this.state.selectedVehicle].type}
                    </div>

                    <div class="form-section">
                        <p>What type of vehicle do you drive?</p>
                        <p class="disclaimer">*Type used to calculate cost of maintenance, repairs, and depreciation.</p>
                        <input type="range" min="0" max={vehicles.length - 1} value={this.state.selectedVehicle} id="type-slider" onChange={this.handleSlider}/>
                        <p>{vehicles[this.state.selectedVehicle].type}</p>
                    </div>

                    <div class="form-section">
                        <p>What is your vehicle's gas mileage? (MPG)</p>
                        <input type="number" placeholder="City" value={this.state.cityMileage} onChange={this.handleCityMileage} required></input>
                        <br/>
                        <input type="number" placeholder="Highway" value={this.state.highwayMileage} onChange={this.handleHighwayMileage}required></input>
                    </div>

                    <div class="form-section">
                        <p>What is the current price of gas? (Gal)</p>
                        <input type="number" placeholder="Price" value={this.state.price} onChange={this.handlePrice} required></input>
                    </div>

                    <div class="form-section">
                        <input type="checkbox" id="depreciation-checbox" value={this.state.includeDepreciation} onChange={this.handleDepreciation}></input>
                        <label for="depreciation-checbox">Include Depreciation?</label>
                    </div>

                    <div>
                        <p>TOTAL COST (USD):</p>
                        <p>{this.calculateCost()}</p>
                    </div>
                </form>
            </main>
        );
    }
}

export default Main;
