import { Emulator } from './emulator/emulator.js';
import { Assembler } from './assembler/assembler.js';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

//create CPU and make it global
const emulator = new Emulator({debug: false, uiTick: updateUI});
window.emulator = emulator;

//load initial program into memory
const code = window.localStorage.code || '';
$('#code').val(code);
emulator.memory.memory = Assembler.assemble(code);

$(() => { //window ready
	//set up play/pause/step listeners
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

	$('#code').change(() => {
		const code = $('#code').val();
		emulator.memory.memory = Assembler.assemble(code);

		window.localStorage.code = code;

		updateUI();
	})

  updateUI(); //fill in memory/registers with initial state
});

function updateUI() {
	//update register printout with their values
  $('#register-pc').text(window.emulator.pc.value.toString(2).padStart(4, '0'));
  $('#register-a').text(window.emulator.regA.value.toString(2).padStart(8, '0'));
  $('#register-b').text(window.emulator.regB.value.toString(2).padStart(8, '0'));
  $('#register-out').text(window.emulator.regOut.value.toString(2).padStart(8, '0'));
  $('#register-mar').text(window.emulator.mar.value.toString(2).padStart(4, '0'));
  $('#register-ir').text(window.emulator.ir.instruction.toString(2).padStart(4, '0') + ' ' + window.emulator.ir.data.toString(2).padStart(4, '0'));
  $('#register-flag-zero').text('Zero: ' + window.emulator.flags.zero);
  $('#register-flag-carry').text('Carry: ' + window.emulator.flags.carry);

	//print memory contents
  $('#memory-display').html(generateMemoryDisplay(window.emulator.memory.memory, window.emulator.pc.value));

	//update clock play/pause button when halted
	if(!window.emulator.clock.isRunning) {
		$('#clock-play-pause').html(`<i class="fas fa-play"></i>`);
		$('#clock-play-pause').addClass('btn-success');
		$('#clock-play-pause').removeClass('btn-danger');
	}
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
