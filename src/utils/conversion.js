export function getBit(number, bitPosition) {
    return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

export function setBit(number, bitPosition) {
    return number | (1 << bitPosition);
}

export function clearBit(number, bitPosition) {
    const mask = ~(1 << bitPosition);
    return number & mask;
}

export function updateBit(number, bitPosition, bitValue) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    return (number & clearMask) | (bitValueNormalized << bitPosition);
}

export function registerToFloat(regs, digits) {
    var buffer = new ArrayBuffer(4);
    var intView = new Int16Array(buffer);
    var floatView = new Float32Array(buffer);
    intView[0] = regs[0]
    intView[1] = regs[1];
    return floatView[0].toFixed(digits);
}

export function floatToRegister(float) {
    var buffer = new ArrayBuffer(4);
    var intView = new Uint16Array(buffer);
    var floatView = new Float32Array(buffer);
    floatView[0] = float;
    return intView;
}
