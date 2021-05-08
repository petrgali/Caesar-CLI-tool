import compute from "./src/computeShift.js"
import validateInput from "./src/processInput.js"
import streamPipeline from "./src/createPipeline.js"
import shiftConfig from "./src/shiftConfig.js"

const { userInput } = validateInput()
const readStream = streamPipeline.rStream(userInput.inbound)
const writeStream = streamPipeline.wStream(userInput.outbound)
const transform = streamPipeline.transformStream(
    compute.asciiShift,
    {
        shift: userInput.shift,
        ...shiftConfig,
    })

streamPipeline.run(readStream, transform, writeStream)



