import fs from "fs"
import { Transform, pipeline } from "stream"
import rotate from "./src/rotate.js"




/// validate
/// construct properties
const wStream = fs.createWriteStream("./data/output.txt", { flags: "a" })

const file = true
const tranformStream = new Transform({
    transform: (chunk, encoding, callback) => {
        callback(false, rotate(chunk.toString(), 7))
    }
})

const runPipeline = (inbound, outbound) => {
    pipeline(
        inbound,
        tranformStream,
        outbound,
        (err) => {
            if (err) {
                process.stderr.write(err.message)
            }
        }
    )
}

if (!!file) {
    const rStream = fs.createReadStream("./data/input.txt")
    rStream.on("open", () => runPipeline(rStream, wStream))
    rStream.on("error", () => runPipeline(process.stdin, wStream))
} else {
    runPipeline(process.stdin, wStream)
}



