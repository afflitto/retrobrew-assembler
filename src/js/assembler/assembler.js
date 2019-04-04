class Assembler {
  static assemble(code){
    let labels = [];
    let memoryOps = [];
    let memoryData = [];

    let lines = code.split('\n').filter(line => line.trim()); //filter out empty lines
    if(lines.length > 16) {
      throw `Error: Not enough memory for this code! (${lines.length} lines)`;
    }

    //find labels
    lines.forEach((line, lineNumber) => {
      const regex = /^([.A-Za-z0-9]*:)?\s*([A-Za-z]*)?\s*([.A-Za-z0-9]*)?\s?$/g;
      const [fullMatch, label, op, operand] = regex.exec(line);

      if(label) {
        const strippedLabel = label.toLowerCase().replace(':', '');
        labels.push({name: strippedLabel, lineNumber: lineNumber});
      }
    });

    //create ops
    lines.forEach((line, lineNumber) => {
      const regex = /^([.A-Za-z0-9]*:)?\s*([A-Za-z]*)?\s*([.A-Za-z0-9]*)?\s?$/g;
      const [fullMatch, label, op, operand] = regex.exec(line);

      if(op) {
        if(InstructionMap[op] || InstructionMap[op] === 0 || op.toLowerCase() === 'db') {
          memoryOps[lineNumber] = InstructionMap[op];
        } else {
          throw `Error: Unknown op: ${op} (line ${lineNumber + 1})`;
        }
      } else {
        throw `Error: No op (line ${lineNumber + 1})`;
      }
    });

    //create data and replace labels
    lines.forEach((line, lineNumber) => {
      const regex = /^([.A-Za-z0-9]*:)?\s*([A-Za-z]*)?\s*([.A-Za-z0-9]*)?\s?$/g;
      const [fullMatch, label, op, operand] = regex.exec(line);

      if(operand) {
        if(parseInt(operand) >= 0) {
          memoryData[lineNumber] = parseInt(operand);
        } else {
          const addressFromLabel = labels.filter(label => {
            return label.name === operand.toLowerCase();
          })[0];

          if(addressFromLabel) {
            memoryData[lineNumber] = addressFromLabel.lineNumber;
          } else {
            throw `Error: Unknown label: ${operand} (line ${lineNumber + 1})`
          }
        }
      }
    });

    let memory = [];
    //combine memory and data operands
    for(let i = 0; i < 16; i++) {
      if(memoryOps[i]) {
        memory[i] = memoryOps[i] << 4;
      } else {
        memory[i] = 0;
      }
      if(memoryData[i]) {
        memory[i] |= memoryData[i];
      }
    }

    return memory;
  }
}

const InstructionMap = {
  "NOP": 0b0000,
  "LDA": 0b0001,
  "ADD": 0b0010,
  "SUB": 0b0011,
  "STA": 0b0100,
  "LDI": 0b0101,
  "JMP": 0b0110,
  "JEZ": 0b0111,
  "JC": 0b1000,
  "OUT": 0b1110,
  "HLT": 0b1111,
}

export { Assembler };
