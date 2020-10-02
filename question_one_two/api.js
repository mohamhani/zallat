const axios = require('axios');
const stateList = require('./states');

const getStateTwoDigitCode = (stateFullName) => {
    return stateList[stateFullName];
}

const getState = async (stateTwoDigitCode) => {
    const state = await axios.get(`http://api.eia.gov/series/?api_key=${process.env.API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-${stateTwoDigitCode}.A`);

    const stateData = state.data.series[0].data;

    return stateData;
}

const getStateEmission = async (state, year) => {
    const stateTwoDigitCode = getStateTwoDigitCode(state);

    const stateData = await getState(stateTwoDigitCode);

    for(var i = 0; i < stateData.length; i++) {
        if(stateData[i][0] === year) {
            return stateData[i][1];
        }
    }

    return `The year that you have entered isn't in the data`;
}

const getStateTotalTax = async (from, to, state) => {
    const stateTwoDigitCode = getStateTwoDigitCode(state);

    const stateData = await getState(stateTwoDigitCode);

    let totalTax = 0;

    for(var i = stateData.length - 1; i >= 0; i--) {
        if(stateData[i][0] >= from && stateData[i][0] <= to) {
            totalTax += stateData[i][1];
        }
    }

    return `${totalTax.toFixed(1)} million`;
}

module.exports = {
    stateEmission: getStateEmission,
    stateTotalTax: getStateTotalTax
}