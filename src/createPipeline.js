import fs from "fs"
import { Transform, pipeline } from "stream"

const streamPipeline = {
    rStream: (input) => {
        return !!input
            ? fs.createReadStream(input)
            : process.stdin
    },
    wStream: (output) => {
        return !!output
            ? fs.createWriteStream(output, { flags: "a" })
            : process.stdout
    },
    transformStream: (callbackFunc, config) => new Transform({
        transform: (chunk, encoding, callback) => {
            callback(
                false,
                callbackFunc({
                    str: chunk.toString(),
                    shift: config.shift,
                    cycle: config.cycle,
                    intervals: config.intervals
                }))
        }
    }),
    run: (inbound, transform, outbound) => {
        pipeline(
            inbound,
            transform,
            outbound,
            (err) => {
                if (err) {
                    process.stderr.write(err.message)
                    process.exit(1)
                }
            }
        )
    }
}

export default streamPipeline