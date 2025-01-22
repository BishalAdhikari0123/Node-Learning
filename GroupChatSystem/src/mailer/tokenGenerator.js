function sixDigitToken () {
    const random = (100000 + parseInt(Math.random() * 1000000)).toString();
    if (random.length !== 6) return sixDigitToken();
    else return random;
}


export default sixDigitToken;