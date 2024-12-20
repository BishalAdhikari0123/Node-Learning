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
cryptoData.currencies.push({
    'name': "Solana",
    "exchangeRate": 190,
    'foundIn': '2020'
    
})
// console.log(`there are ${cryptoData.currencies.length} number of data`)
// console.log(`the rate of ${cryptoData.currencies.bitcoin} is ${cryptoData.currencies[0].exchangeRate} as of ${cryptoData.currencies[0].foundIn}`)
// console.log(cryptoData)
cryptoData.currencies[3].exchangeRate=2.4;
console.log(cryptoData)
// There are 4 currency data
// The rate of bitcoin is 97000 as of 21 may, 2024

for(i=0;i<cryptoData.currencies.length;i++){
    console.log(`The rate of ${cryptoData.currencies[i].name} is ${cryptoData.currencies[i].exchangeRate}.`)
}