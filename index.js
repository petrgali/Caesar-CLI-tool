import compute from "./src/computeShift.js"
import validateInput from "./src/validateInput.js"
import streamPipeline from "./src/createPipeline.js"
import shiftConfig from "./src/shiftConfig.js"

const { userInput } = validateInput()

const readStream = streamPipeline.rStream(userInput.inbound)
const writeStream = streamPipeline.wStream(userInput.outbound)
const transform = streamPipeline.transformStream(
    compute.asciiShift,
    {
        shift: userInput.shift % shiftConfig.cycle,
        ...shiftConfig,
    })

readStream
    .on("open", () => streamPipeline.run(readStream, transform, writeStream))
readStream
    .on("error", () => streamPipeline.run(process.stdin, transform, writeStream))



