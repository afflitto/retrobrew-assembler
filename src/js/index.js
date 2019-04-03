import { Emulator } from './emulator/emulator.js';
import { Assembler } from './assembler/assembler.js';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';

//create CPU and make it global
const emulator = new Emulator({debug: false, uiTick: updateUI});
window.emulator = emulator;

//load initial program into memory
const params = new URLSearchParams(location.search);
let code = '';
if(params.has('code')) {
	code = atob(params.get('code'));
} else if(window.localStorage.code) {
	code = window.localStorage.code;
}
$('#code').val(code);
emulator.memory.memory = Assembler.assemble(code);

//set stored clock frequency
if(params.has('frequency')) {
	emulator.clock.updateFrequency(params.get('frequency'));
	$('#clock-frequency').val(params.get('frequency'));
} else if(window.localStorage.frequency) {
	emulator.clock.updateFrequency(window.localStorage.frequency);
	$('#clock-frequency').val(window.localStorage.frequency);
}

//set up codemirror
const codemirror = CodeMirror.fromTextArea($('#code')[0], {
	lineNumbers: true
});
window.cm = codemirror

$(() => { //window ready
	//set up play/pause/step listeners
  $('#clock-play-pause').click(() => {
    if(window.emulator.clock.isRunning) {
      window.emulator.clock.stop();
      $('#clock-play-pause').html(`<i class="fas fa-play"></i>`);
      $('#clock-play-pause').addClass('btn-success');
      $('#clock-play-pause').removeClass('btn-danger');

			//enable stepping and freq changing
			$('#clock-step').prop('disabled', false);
			$('#clock-frequency').prop('disabled', false);
    } else {
      window.emulator.clock.start();
      $('#clock-play-pause').html(`<i class="fas fa-pause"></i>`);
      $('#clock-play-pause').addClass('btn-danger');
      $('#clock-play-pause').removeClass('btn-success');

			//disable stepping and freq changing
			$('#clock-step').prop('disabled', true);
			$('#clock-frequency').prop('disabled', true);
    }
  });

  $('#clock-step').click(() => {
    if(!window.emulator.clock.isRunning) {
      window.emulator.clock.step();
    }
  });

	//re-assemble code when it's updated
	$('#assemble-button').click(() => {
		const code = codemirror.getValue();
		emulator.memory.memory = Assembler.assemble(code);

		window.localStorage.code = code;

		updateUrlParam('code', btoa(code));

		updateUI();
	});

	//update clock's frequency with new value
	$('#clock-frequency').change(() => {
		const freq = $('#clock-frequency').val();
		if(freq > 0 && freq < 1000) {
			emulator.clock.updateFrequency(freq);
			window.localStorage.frequency = freq;
			updateUrlParam('frequency', freq);
		}
	});

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
	$('#register-out-decimal').text(window.emulator.regOut.value.toString().padStart(3, '0'))

	//print memory contents
  $('#memory-display').html(generateMemoryDisplay(window.emulator.memory.memory, window.emulator.pc.value));

	//update clock play/pause button when halted
	if(!window.emulator.clock.isRunning) {
		$('#clock-play-pause').html(`<i class="fas fa-play"></i>`);
		$('#clock-play-pause').addClass('btn-success');
		$('#clock-play-pause').removeClass('btn-danger');

		//enable stepping and freq changing
		$('#clock-step').prop('disabled', false);
		$('#clock-frequency').prop('disabled', false);
	}

	//highlight line of code being executed
	const line = emulator.pc.value
	codemirror.setSelection({line: line, ch: 0}, {line: line, ch: 100});
}

function updateUrlParam(name, value) {
	const params = new URLSearchParams(location.search);
	params.set(name, value);
	location.search = params.toString();
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
