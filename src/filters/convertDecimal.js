export default (value) => {
    if (value.toString().endsWith('00')) {
        let num = value / 100
        return num
    } else {
        let num = value / 100
        return num.toFixed(2)
    }
}
