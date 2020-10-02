const axios = require('axios');
const stateList = require('./states');

const API_KEY = 'f8c39d1a3ce44b9772f00aa5ad65de14';

const getStateTwoDigitCode = (stateFullName) => {
    return stateList[stateFullName];
}

const stateWithhighestEmission = async (from, to) => {
    let stateEmission = 0;
    let stateWithBiggestEmission;

    for(state in stateList) {
        let stateTwoDigitCode = getStateTwoDigitCode(state);
        
        let response = await axios.get(`http://api.eia.gov/series/?api_key=${API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-${stateTwoDigitCode}.A`);

        let stateData = response.data.series[0].data;
        
        for(let i = stateData.length - 1; i >= 0; i--) {
            if(stateData[i][0] >= from && stateData[i][0] <= to) {
                let tempEmission = stateData[i][1];
                
                if(tempEmission > stateEmission) {
                    stateEmission = tempEmission;
                    stateWithBiggestEmission = state;
                }
            }
        }
    }

    return {
        "State with the biggest emission":stateWithBiggestEmission,
        "State emission": `${stateEmission.toFixed(1)} million metric tons CO2`
    }
}

module.exports = {
    stateWithhighestEmission,
}