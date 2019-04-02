import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import { Emulator } from './emulator/emulator.js';

const emulator = new Emulator({debug: false, uiTick: updateUI});
window.emulator = emulator;

$(() => {
  $('#clock-play-pause').click(() => {
    if(window.emulator.clock.isRunning) {
      window.emulator.clock.stop();
      $('#clock-play-pause').html(`<i class="fas fa-play"></i>`);
      $('#clock-play-pause').addClass('btn-success');
      $('#clock-play-pause').removeClass('btn-danger');
    } else {
      window.emulator.clock.start();
      $('#clock-play-pause').html(`<i class="fas fa-pause"></i>`);
      $('#clock-play-pause').addClass('btn-danger');
      $('#clock-play-pause').removeClass('btn-success');
    }
  });

  $('#clock-step').click(() => {
    if(window.emulator.clock.isRunning) {
      window.emulator.clock.stop();
      $('#clock-play-pause').html(`<i class="fas fa-play"></i>`);
      $('#clock-play-pause').addClass('btn-success');
      $('#clock-play-pause').removeClass('btn-danger');
    } else {
      window.emulator.clock.step();
    }
  });

  updateUI(); //fill in memory/registers with initial state
});

function updateUI() {
  $('#register-pc').text(window.emulator.pc.value.toString(2).padStart(4, '0'));
  $('#register-a').text(window.emulator.regA.value.toString(2).padStart(8, '0'));
  $('#register-b').text(window.emulator.regB.value.toString(2).padStart(8, '0'));
  $('#register-out').text(window.emulator.regOut.value.toString(2).padStart(8, '0'));
  $('#register-mar').text(window.emulator.mar.value.toString(2).padStart(4, '0'));
  $('#register-ir').text(window.emulator.ir.instruction.toString(2).padStart(4, '0') + ' ' + window.emulator.ir.data.toString(2).padStart(4, '0'));
  $('#register-flag-zero').text(window.emulator.flags.zero);
  $('#register-flag-carry').text(window.emulator.flags.carry);


  $('#memory-display').html(generateMemoryDisplay(window.emulator.memory.memory, window.emulator.pc.value));
}


function generateMemoryDisplay(memory, pc) {
  let html = '';

  for(let i = 0; i < 4; i++) {
    html += `<div class="row">`;
    for(let j = 0; j < 4; j++) {
      const isPC = pc === j + i*4;
      html += `<div class="col-xs-3 m-3 memory-display ${isPC ? 'memory-pc':''}">${memory[j + i*4].toString(16).padStart(2, '0')}</div>`;
    }
    html += `</div>`;
  }
  return html;
}
