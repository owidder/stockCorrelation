const fs = require("fs");
const csv = require("csvtojson");
const {parse} = require("json2csv");
const _ = require("lodash");

const filenames = fs.readdirSync("../public/prices");

const readPrices = (filename) => {
    const pricesStr = fs.readFileSync(`../public/prices/${filename}`);
    const prices = JSON.parse(pricesStr);
    return prices;
}

csv().fromFile("../public/symbols.csv").then(symbols => {
    _.range(filenames.length-1).forEach(i => {
        _.range(i+1, filenames.length).forEach(j => {
            const prices1 = readPrices(filenames[i]);
            const prices2 = readPrices(filenames[j]);
        })
    })
})