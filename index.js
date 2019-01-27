
const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR // simple linear regression
const csvFilePath = 'Advertising.csv';
const readline = require('readline'); // For user prompt to allow predictions

const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let csvData = [], // Parsed Data
    X = [],  // Input
    y = [];  // Output

let regressionModel;

csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })

    .on('done', () => {
        dressData(); // To get data points from JSON Objects
        perfomRegression();
    });

//Function Declarations:

function dressData() {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */

     csvData.forEach(row => {
         X.push(returnFloat(row.radio));
         y.push(returnFloat(row.sales));
     });
}


function returnFloat(value){
    return parseFloat(value);
}

function perfomRegression() {
    regressionModel = new SLR(X,y); // Train the model on training data
    console.log(regressionModel.toString(3));
    predictOutput();
}

function predictOutput() {
    lineReader.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}