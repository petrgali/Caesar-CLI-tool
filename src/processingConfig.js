export { flags, usage }

const flags = {
    mandatory: {
        action: ["a", "action"],
        shift: ["s", "shift"]
    }
}


const usage = `

Usage: node caesar-tool.js (-s,--shift) | (-i,--input) | (-o,--output) | (-a,--action)
    -s, --shift       must be a positive/negative int    *required option 
    -a, --action      you can encode/decode              *required option     
    -i, --input       specify an input file
    -o, --output      specify an output file


`