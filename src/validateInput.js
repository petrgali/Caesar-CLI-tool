
const rules = {
    action: [
        (data) => { if (data !== "encode" && data !== "decode") return `Input error. ${data} action is not supported.` }
    ],
    shift: [
        (data) => { if (typeof data !== "number" || typeof data === NaN) return `Input error. ${data} is not a valid shift value` }
    ]
}
const flags = {
    mandatory: {
        action: ["-a", "--action"],
        shift: ["-s", "--shift"]
    },
    optional: ["-i", "--input", "-o", "--output"]
}

const usage = `
Usage: caesar-cli [(-s,--shift | -i,--input | -o,--output | -a,--action)]
    -s, --shift       a shift positive/negative int     *required option 
    -a, --action      an action encode/decode           *required option     
    -i, --input       an input file
    -o, --output      an output file
`

const parseInput = (args) => {
    if (!Object.values(flags.mandatory)
        .every(options => options
            .some(option => args
                .some(arg => arg === option)))) {
        process.stderr.write(`Invalid input format.${usage}`)
        process.exit(1)
    }
}

const validate = (args) => {
    parseInput(process.argv.slice(2))
    return {
        userInput: {
            inbound: "./data/input.txt",
            outbound: "./data/output.txt",
            action: "encode",
            shift: 7
        }
    }
}

export default validate