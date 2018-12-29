import parameterMap from './parameters.json';
import { registerToFloat, getBit } from './conversion';

export default class ParameterFactory {
    static create(parameterName, registers) {
        if (parameterName in parameterMap) {
            const parameterDescription = parameterMap[parameterName];
            const data = registers.slice(parameterDescription.register, parameterDescription.register + 2)
            switch(parameterDescription.type) {

                case 'time': {
                    const date = new Date();
                    return {
                        name: `godzina`,
                        value: `${date.toLocaleTimeString('pl-PL')}`
                    }
                }

                case 'date': {
                    const date = new Date();
                    return {
                        name: `data`,
                        value: `${date.toLocaleDateString('pl-PL')}`
                    }
                }

                case 'bit': {
                    const bit = getBit(registers[parameterDescription.register], parameterDescription.bit);
                    return {
                        ...parameterDescription,
                        value: parameterDescription.values[bit]
                    }
                }

                case 'flag': {
                    const value = Math.log2((registers[parameterDescription.register] & parameterDescription.mask) >> parameterDescription.shift)
                    return {
                        ...parameterDescription,
                        name: parameterDescription.name,
                        value: parameterDescription.values[value],
                        unit: parameterDescription.units[value] && `[${parameterDescription.units[value]}]`,
                        digits: parameterDescription.digits[value],
                    }
                }

                case 'ufloat': {
                    const urange = ParameterFactory.create('urange', registers);
                    const value = registerToFloat(data, urange.digits)
                    return {
                        name: parameterDescription.name,
                        unit: urange.unit,
                        value
                    }
                }

                case 'ifloat': {
                    const irange = ParameterFactory.create('irange', registers);
                    const value = registerToFloat(data, irange.digits)
                    return {
                        name: parameterDescription.name,
                        unit: irange.unit,
                        value
                    }
                }

                default: {
                    return {
                        ...parameterDescription,
                        value: registerToFloat(data, parameterDescription.digits || 0)
                    }
                }
            }
        }
    }
}
