import fs from "fs"
import shiftConfig from "./shiftConfig.js"
import { Command } from "commander"
import { flags, usage } from "./processingConfig.js"

const program = new Command()
program
    .option("-a, --action <text>")
    .option("-s, --shift <numbers>")
    .option("-i, --input <file>")
    .option("-o, --output <file>")
    .configureOutput({
        writeErr: (str) => {
            process.stdout.write(`\n[FATAL] ${str}${usage}`)
            process.exit(1)
        },
    })
    .parse(process.argv)

const options = program.opts()

const rules = {
    action: [
        (data) => {
            if (data != "encode" && data != "decode")
                return `\n[FATAL]: action "${data}" is not supported.`
        }
    ],
    shift: [
        (data) => {
            if (typeof +data !== "number" || typeof data === NaN)
                return `\n[FATAL]: ${data} is not a valid shift value`
        },
        (data) => {
            if (+data % Math.floor(+data) != 0 && +data !== 0)
                return "\n[FATAL]: only integer shift values are supported"
        },
    ],
    input: [
        (data) => { testPath(data, fs.constants.F_OK, fs.constants.R_OK) }
    ],
    output: [
        (data) => { testPath(data, fs.constants.F_OK, fs.constants.W_OK) }
    ]
}
const testPath = (path, exist, accesible) => {
    try {
        fs.accessSync(path, exist | accesible)
    } catch (err) {
        process.stderr.write(`\n[FATAL]: specified file "${path}" is unreachable\n`)
        process.exit(1)
    }
}
const parseRules = () => {
    let err
    if (!Object.values(flags.mandatory)
        .every(flag => Object.keys(options)
            .some(option => flag.includes(option)))) {
        err = `\n[FATAL]: input doesn't meet minimal requirements`
        return err
    }
    Object.entries(options).map((option) => {
        Object.keys(rules).map(rule => {
            if (rule === option[0]) {
                rules[rule].map(f => {
                    if (f(...option.slice(1)))
                        err = f(...option.slice(1))
                })
            }
        })
    })
    return err
}
const validate = () => {
    if (parseRules()) {
        process.stderr.write(parseRules() + usage)
        process.exit(1)
    }
    if (options.action === "decode") options.shift = -options.shift
    options.shift %= shiftConfig.cycle
    return {
        userInput: {
            inbound: options.input,
            outbound: options.output,
            action: options.action,
            shift: options.shift
        }
    }
}

export default validate