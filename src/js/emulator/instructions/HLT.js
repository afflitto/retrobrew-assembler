class HLT {

  microstep({step, emulator}){
    if(step === 2){
      emulator.clock.stop();
      emulator.reset();
    }
  }
}

export { HLT };
