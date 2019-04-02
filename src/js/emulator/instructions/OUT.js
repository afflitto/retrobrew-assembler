class OUT {

  microstep({step, emulator}){
    if(step === 2) {
      emulator.regA.out();
      emulator.regOut.in();
      console.log("OUT: " + emulator.regOut.value)
    }
  }
}

export { OUT };
