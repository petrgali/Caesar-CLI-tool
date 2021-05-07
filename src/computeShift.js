const compute = {
    negative: (idx, shift, num, cycle) => {
        return (idx + shift < num)
            ? String.fromCharCode(idx + shift + cycle)
            : String.fromCharCode(idx + shift)
    },
    positive: (idx, shift, num, cycle) => {
        return (idx + shift > num)
            ? String.fromCharCode(idx + shift - cycle)
            : String.fromCharCode(idx + shift)
    },
    asciiShift: ({ str, shift, cycle, intervals }) => {
        let out = ""
        for (let idx in str) {
            if (!intervals.some(range => str.charCodeAt(idx) >= range.min && str.charCodeAt(idx) <= range.max))
                out += str[idx]
            intervals.map(range => {
                if (str.charCodeAt(idx) >= range.min && str.charCodeAt(idx) <= range.max) {
                    shift >= 0
                        ? out += compute.positive(str.charCodeAt(idx), shift, range.max, cycle)
                        : out += compute.negative(str.charCodeAt(idx), shift, range.min, cycle)
                }
            })
        }
        return out
    }
}
export default compute