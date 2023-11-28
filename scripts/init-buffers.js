function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);

    return {
        position: positionBuffer,
    };
}

function initPositionBuffer(gl) {
    // Create a buffer for the square's positions.
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.
    const positions = [];
    for (let i = 0; i < 10; i++) {
        positions.push(0.1)
        positions.push(0)
        positions.push(Math.cos((18 * i - 90) * Math.PI / 180) + 0.1)
        positions.push(Math.sin((18 * i - 90) * Math.PI / 180))
        positions.push(Math.cos((18 * (i + 1) - 90) * Math.PI / 180) + 0.1)
        positions.push(Math.sin((18 * (i + 1) - 90) * Math.PI / 180))
    }
    for (let i = 0; i < 10; i++) {
        positions.push(-0.1)
        positions.push(0)
        positions.push(Math.cos((18 * i + 90) * Math.PI / 180) - 0.1)
        positions.push(Math.sin((18 * i + 90) * Math.PI / 180))
        positions.push(Math.cos((18 * (i + 1) + 90) * Math.PI / 180) - 0.1)
        positions.push(Math.sin((18 * (i + 1) + 90) * Math.PI / 180))
    }
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
}

export {initBuffers};
