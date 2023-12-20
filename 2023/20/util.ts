const rowRegex = /^([&%])([a-z]+) -> (.+)$/;
export function processInput(input: String): String[] {
  const inputs = {};
  const modules = input.split("\n").filter(x => x).reduce((acc, row) => {
    let moduleName, moduleType, outputStr;
    if (row.startsWith('broadcaster')) {
      ([moduleName, outputStr] = row.split(' -> '));
      moduleType = moduleName;
    } else {
      ([,moduleType, moduleName, outputStr] = row.match(rowRegex));
    }
    const outputs = outputStr.split(', ');
    outputs.forEach(o => {
      inputs[o] ||= [];
      inputs[o].push(moduleName);
    });
    acc[moduleName] = {
      type: moduleType,
      outputs,
    };
    if (moduleType === '%') {
      acc[moduleName].state = false;
    }
    return acc;
  }, {});
  Object.entries(modules).forEach(([key, m]) => {
    if (m.type !== '&') return true;
    modules[key].state = inputs[key].reduce((acc, inn) => {
      acc[inn] = 0;
      return acc;
    }, {});
  });
  return modules;
}

export class Machine {
  data = null;
  pulseCounts = [0, 0];

  constructor(input: String) {
    this.data = processInput(input);
  }

  cycle(): void {
    this.pulseCounts[0]++;
    let stack = [{pulse: 0, name: 'broadcaster', source: null}];

    while (stack.length > 0) {
      stack = stack.reduce((acc, {pulse, name, source}) => {
        const module = this.data[name];
        if (!module) return acc;
        switch (module.type) {
          case 'broadcaster': {
            // send the received pulse to all outputs
            this.pulseCounts[pulse] += module.outputs.length;
            module.outputs.forEach(o => acc.push({
              name: o,
              pulse,
              source: name,
            }));
            break;
          }
          case '%': {
            if (pulse === 0) {
              // ignores high pulses.
              // on low pulse, invert state and send a high pulse if on, low if off.
              const newState = !module.state;
              const newPulse = newState ? 1 : 0;
              this.pulseCounts[newPulse] += module.outputs.length;
              this.data[name].state = newState;
              module.outputs.forEach(o => {
                acc.push({
                  name: o,
                  pulse: newPulse,
                  source: name,
                });
              });
            }
            break;
          }
          case '&': {
            // if all inputs match, it sends the inverse pulse
            this.data[name].state[source] = pulse;
            const allInputs = Object.values(this.data[name].state);
            const newPulse = allInputs.every(x => x === 1) ? 0 : 1;
            this.pulseCounts[newPulse] += module.outputs.length;
            module.outputs.forEach(o => {
              acc.push({
                name: o,
                pulse: newPulse,
                source: name,
              });
            });
            break;
          }
          default:
            throw new Error('buh?!');
        }
        return acc;
      }, []);
    }
  }
}
