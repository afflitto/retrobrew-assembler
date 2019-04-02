import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import { Emulator } from './emulator/emulator.js';

const emulator = new Emulator({debug: false, uiTick: () => {
  $('#register-pc').text(window.emulator.pc.value.toString(2).padStart(4, '0'));
  $('#register-a').text(window.emulator.regA.value.toString(2).padStart(8, '0'));
  $('#register-b').text(window.emulator.regB.value.toString(2).padStart(8, '0'));
  $('#register-out').text(window.emulator.regOut.value.toString(2).padStart(8, '0'));
  $('#register-mar').text(window.emulator.mar.value.toString(2).padStart(4, '0'));
  $('#register-ir').text(window.emulator.ir.instruction.toString(2).padStart(4, '0') + ' ' + window.emulator.ir.data.toString(2).padStart(4, '0'));
  $('#register-flag-zero').text(window.emulator.flags.zero);
  $('#register-flag-carry').text(window.emulator.flags.carry);
}});
window.emulator = emulator;
