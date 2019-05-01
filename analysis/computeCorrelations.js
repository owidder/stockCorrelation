const fs = require("fs");
const csv = require("csvtojson");
const {parse} = require("json2csv");
const _ = require("lodash");
const ss = require("simple-statistics");

const filenames = fs.readdirSync("../public/prices");

const readPrices = (filename) => {
    const pricesStr = fs.readFileSync(`../public/prices/${filename}`);
    const prices = JSON.parse(pricesStr);
    return prices;
}

function dates(prices) {
    return prices.map(p => p.date);
}
function priceForDate(prices, date) {
    return prices.find(eod => eod.date == date).price;
}
const createPoints = (pricesX, pricesY) => {
    const datesX = dates(pricesX);
    const datesY = dates(pricesY);
    const commonDates = _.intersection(datesX, datesY);

    return commonDates.map((date, i) => {
        const xValue = priceForDate(pricesX, date);
        const yValue = priceForDate(pricesY, date);
        return [Number(xValue), Number(yValue)];
    })
}

const getNameFromSymbol = (symbols, symbol) => {
    //if(!symbols.find(s => s.symbol == symbol)) debugger
    return symbols.find(s => s.symbol == symbol).name;
}

csv().fromFile("../public/symbols.csv").then(symbols => {
    _.range(filenames.length-1).forEach(i => {
        _.range(i+1, filenames.length).forEach(j => {
            const symbolX = filenames[i];
            const symbolY = filenames[j];
            const pricesX = readPrices(symbolX);
            const pricesY = readPrices(symbolY);
            const points = createPoints(pricesX, pricesY);
            const xValues = points.map(p => p[0]);
            const yValues = points.map(p => p[1]);
            const nameX = getNameFromSymbol(symbols, symbolX);
            const nameY = getNameFromSymbol(symbols, symbolY);
            //console.log(`${nameX}/${nameY}: ${xValues.length}:${yValues.length} (${i}-${j}) -- ${symbolX}/${symbolY}`)
            const correlation = ss.sampleCorrelation(xValues, yValues).toFixed(1);

            if(!isNaN(correlation)) {
                const correlationStr = String(correlation).replace(".", ",");
                console.log(`${nameX}\t${nameY}\t${correlationStr}`);
            }
        })
    })
})