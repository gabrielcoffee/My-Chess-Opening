async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function splitAmounts(amount){
    switch (amount){
        case 25:
            return 13;
        case 50:
            return 25;
        case 75:
            return 38;
        case 100:
            return 50;
    }
}
