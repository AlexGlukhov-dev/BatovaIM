export const addZero = num => {
    if(num.toString().length < 2) {
        return `0${num}`;
    }else {
        return num;
    }
};

export const stopScroll = () => {
    document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.overflow = 'hidden'
};

/** format price function */
export const formatPrice = price => {
    const formatter = new Intl.NumberFormat("ru");

    return formatter.format(price)
};

export const formatPrice2 = price => {
    const formatter = new Intl.NumberFormat("ru", {minimumFractionDigits: 2});

    return formatter.format(price)
};

/** nouns declination function */
export const wordDecl = (number, words=["товар", "товара", "товаров"]) => {

    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
      ];
};

/** set expires cookies */
export const setExpiresCookies = numberOfDaysToAdd => {
    const someDate = new Date();
    const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    return new Date(result);
};

/** function that sums values of the same keys in objects array */
export const keyValuesSum = arr => {
    let counts = arr.reduce((prev, curr) => {
        let count = prev.get(curr.id) || 0;
        prev.set(curr.id, curr.amount + count);
        return prev;
    }, new Map());

    return [...counts].map(([id, amount]) => ({id, amount}));
};

/** function that controls scroll offsetY
 * @param y top offset trigger while scrolling
 * @param stateSetter useState setter*/
    export const checkScroll = (y= 100, stateSetter) => {
        if (window.scrollY > y) {
            stateSetter(true)
        } else {
            stateSetter(false)
        }
    };

/** function that removes all excess chars from tel number
 * @param tel phone number with chars +, (, ), ' ', -
 * @return tel number containing only numbers
 */
export const cleanPhoneNumber = (tel) => {
    return tel.replace(/-|\+|\.|\s|\(|\)/g,'').replace(/(\d{3})(\d{3})(\d{3})/g,'$1$2$3');
};

/** function that makes unique objects array
 * @param arr array of non-unique objects
 * @param prop object key for unique test
 * @return array of unique objects
 */
export const getUniqueArrItems = (arr, prop) => {
    const set = new Set;
    return arr.filter(o => !set.has(o[prop]) && set.add(o[prop]));
};