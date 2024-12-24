//created an array
var cryptoData = {
    date: "21 may, 2024",
    currencies: [
        {
            'name': "BitCoin",
            "exchangeRate": 97000,
            'foundIn': '2005'
        },
        {
            'name': "Ethereum",
            "exchangeRate": 3200,
            'foundIn': '2013'
        },
        {
            'name': "DogeCOIN",
            "exchangeRate": 0.32,
            'foundIn': '2016'
        },
        {
            'name': "Stack",
            "exchangeRate": 2.2,
            'foundIn': '2019'
        }
    ],
}
//Task 1: Display the exchange rate for Ethereum

console.log(`The exchange rate for Ethereum is: ${cryptoData.currencies[1].exchangeRate} as of ${cryptoData.date}`);

//Task 2: Add a new cryptocurrency called Solana
cryptoData.currencies.push({
    name: "Solana",
    exchangeRate: 190,
    foundIn: "2020"
    });

console.log(cryptoData);

//Task 3: Change the exchange rate of Stack
cryptoData.currencies[3].exchangeRate = 2.45;
console.log(cryptoData);

//Task 4: Update the foundIn year for Dogecoin
cryptoData.currencies[2].foundIn = "2014";
console.log(cryptoData);

//Task 5: Remove the cryptocurrency DogeCoin from the list
cryptoData.currencies.splice(2, 1);
console.log(cryptoData)

//Task 6: Calculate the total exchange rate for all currencies
function totalExchangeRate(){
    let total = 0;
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        total += cryptoData.currencies[i].exchangeRate;
        }
        return total;
}
console.log(`The total exchange rate is ${totalExchangeRate()}`);

//Task 7: Display all cryptocurrencies found after 2010
function foundAfter2010(){
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        if (cryptoData.currencies[i].foundIn > 2010) {
            console.log(cryptoData.currencies[i].name);
        }
    }}
    console.log('The crypto found after 2010 are: ');
    foundAfter2010();


//Task 8: Add a new property symbol to each currencies
function addSymbol(symbol,Currency){
    for(let i = 0; i < cryptoData.currencies.length; i++){
        if(cryptoData.currencies[i].name == Currency){
            cryptoData.currencies[i].Symbol = symbol;
        }
}
}
addSymbol('btc','BitCoin');
addSymbol('eth','Ethereum');
addSymbol('doge','Dogecoin');
addSymbol('stack','Stack');
addSymbol('sol','Solana');


console.log(cryptoData);

//Task 9: Sort the currencies by exchange rate
function sortExchangeRate(){
    cryptoData.currencies.sort(function(a, b) {
        return b.exchangeRate - a.exchangeRate;
        });
        return cryptoData.currencies;
        }
        sortExchangeRate()
      console.log('After Sorting in Descending: ')
      for(let i = 0; i < cryptoData.currencies.length; i++){
        
        console.log(`${cryptoData.currencies[i].name} = ${cryptoData.currencies[i].exchangeRate}`)
      }

//Task 10: Find the currency with the highest exchange rate
function findHighestExchangeRate(){
    let highest = cryptoData.currencies[0].exchangeRate;
    let highestCurrency = cryptoData.currencies[0].name;
    for (let i = 1; i < cryptoData.currencies.length; i++) {
        if (cryptoData.currencies[i].exchangeRate > highest) {
            highest = cryptoData.currencies[i].exchangeRate;
            highestCurrency = cryptoData.currencies[i].name;
            }
            }
            return highestCurrency;
            }
            findHighestExchangeRate()
            console.log(`The currency with the highest exchange rate is: ${findHighestExchangeRate()}
            `);
    

//Task 11: Find the index of Ethereum in the currencies list

function findEthereumIndex(){
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        if (cryptoData.currencies[i].name == 'Ethereum') {
            return i;
            }
        }
}

console.log(`The index of Ethereum is: ${findEthereumIndex()}`);

//Task 12: Display the names of all currencies in a single string
function displayAllCurrencies(){
    let allCurrencies = '';
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        allCurrencies += cryptoData.currencies[i].name + ', ';
        }
    
    return allCurrencies;
}
console.log(`All currencies: ${displayAllCurrencies()}`);

//Task 13: Create a new object cryptoSummary
function currencyDate(){
    let currenciesDate = "";
    for(let i = 0; i < cryptoData.currencies.length; i++){
        currenciesDate += cryptoData.currencies[i].name + ": " + cryptoData.currencies[i].foundIn + ", ";
}
return currenciesDate;
}

function createCryptoSummary(){
    let cryptoSummary = {
        'Date': currencyDate(),
        'TotalCurrencies': cryptoData.currencies.length,
        }
        return cryptoSummary;
        }
    console.log("Crypto Summary: ")
console.log(createCryptoSummary());

//Task 14: Add a property lastUpdated with the current date
function addLastUpdated(){

    return cryptoData.lastUpdated = new Date().getDate () + '-' + new Date().getMonth () + '-' + new Date().getFullYear()
}
addLastUpdated();
console.log(cryptoData);

//Task 15: Find the currency with the name "Stack"

function findCurrencyByName(name){
    for( let i = 0; i < cryptoData.currencies.length; i++){
        if(cryptoData.currencies[i].name == name){
            return 'Name :' + cryptoData.currencies[i].name + '\n' + 'Exchange Rate: ' + cryptoData.currencies[i].exchangeRate +'\n'+ 'Date:' + cryptoData.currencies[i].foundIn;
        }
}
}
console.log("find currency by Name: ");

console.log(findCurrencyByName('Stack'))

//Task 16: Create an object of crypto names and their rates
function currencyRate(){
    let currenciesRate = "";
    for(let i = 0; i < cryptoData.currencies.length; i++){
        currenciesRate += cryptoData.currencies[i].name + ": " + cryptoData.currencies[i].exchangeRate + ",";
}
return currenciesRate;
}
let cryptoRates = {
    'Rates: ' : currencyRate()
};
console.log(cryptoRates)

//Task 17: Convert the exchange rate of all currencies to USD
function convertToUSD(){
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        cryptoData.currencies[i].exchangeRate = cryptoData.currencies[i].exchangeRate * 1.1;
        }
        }
        console.log('Suppose the given exchange rate is in Euro')
        console.log(cryptoData);

//Task 18: Show how many years ago each cryptocurrency was created
function yearsAgo(){
    let years;
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        years = new Date().getFullYear() - cryptoData.currencies[i].foundIn;
        console.log(cryptoData.currencies[i].name + ' was created ' + years + ' years ago.')
        cryptoData.currencies[i].yearsAgo = years;
        }

        }
        yearsAgo();
        console.log(cryptoData)

//Task 19: Check if a currency exists in the list
function checkCurrencyExistence(currencyName){
    currencyName = currencyName.toLowerCase();
    for (let i = 0; i < cryptoData.currencies.length; i++) {
        if (cryptoData.currencies[i].name.toLowerCase() == currencyName) {
            return true;
            }
            else
            return false;
        }
    }
    let currency = "solana"
    if(checkCurrencyExistence(currency)== true){
        console.log(currency + " exists in the list");
    }
    else{
        console.log(currency + " does not exist in the list");
        }

//Task 20: Display the cryptocurrency with the earliest found year
function earliestFoundYear(){
    let earliestYear = cryptoData.currencies[0].foundIn;
    let earliestCurrency = cryptoData.currencies[0].name;
    for (let i = 1; i < cryptoData.currencies.length; i++) {
        if (cryptoData.currencies[i].foundIn < earliestYear) {
            earliestYear = cryptoData.currencies[i].foundIn;
            earliestCurrency = cryptoData.currencies[i].name;
            }
            }
            console.log('The cryptocurrency with the earliest found year is ' + earliestCurrency + ' which was found in ' + earliestYear + '.');
                }
    earliestFoundYear();















