const rotate = (str, shift) => {
    const abcLength = 26
    let out = ""
    for (let idx in str) {
        if (shift / abcLength !== 0) shift = shift % abcLength
        if (str.charCodeAt(idx) >= 65 && str.charCodeAt(idx) <= 90) {
            if (shift >= 0) {
                str.charCodeAt(idx) + shift > 90
                    ? out += String.fromCharCode(str.charCodeAt(idx) + shift - abcLength)
                    : out += String.fromCharCode(str.charCodeAt(idx) + shift)
            } else {
                str.charCodeAt(idx) + shift < 65 && shift < 0
                    ? out += String.fromCharCode(str.charCodeAt(idx) + shift + abcLength)
                    : out += String.fromCharCode(str.charCodeAt(idx) + shift)
            }
        } else if (str.charCodeAt(idx) >= 97 && str.charCodeAt(idx) <= 122) {
            if (shift >= 0) {
                str.charCodeAt(idx) + shift > 122 && shift >= 0
                    ? out += String.fromCharCode(str.charCodeAt(idx) + shift - abcLength)
                    : out += String.fromCharCode(str.charCodeAt(idx) + shift)

            } else {
                str.charCodeAt(idx) + shift < 97 && shift < 0
                    ? out += String.fromCharCode(str.charCodeAt(idx) + shift + abcLength)
                    : out += String.fromCharCode(str.charCodeAt(idx) + shift)
            }

        } else {
            out += str[idx]
        }
    }
    return out
}

export default rotate