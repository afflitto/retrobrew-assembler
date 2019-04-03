import { Emulator } from './emulator/emulator.js';
import { Assembler } from './assembler/assembler.js';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

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
		const code = $('#code').val();
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
	selectTextAreaLine($('#code')[0], emulator.pc.value + 1);
}

function updateUrlParam(name, value) {
	const params = new URLSearchParams(location.search);
	params.set(name, value);
	location.search = params.toString();
}

function selectTextAreaLine(textArea, lineNum){
	//from http://lostsource.com/2012/11/30/selecting-textarea-line.html
	lineNum--; // array starts at 0
  const lines = textArea.value.split('\n');

  // calculate start/end
  let startPos = 0, endPos = textArea.value.length;
  for(let i = 0; i < lines.length; i++) {
    if(i == lineNum) {
        break;
    }
    startPos += (lines[i].length+1);
  }

  endPos = lines[lineNum].length+startPos;

  // do selection
  // Chrome / Firefox
  if(typeof(textArea.selectionStart) != "undefined") {
    textArea.focus();
    textArea.selectionStart = startPos;
    textArea.selectionEnd = endPos;
    return true;
  }

  // IE
  if (document.selection && document.selection.createRange) {
    textArea.focus();
    textArea.select();
    const range = document.selection.createRange();
    range.collapse(true);
    range.moveEnd("character", endPos);
    range.moveStart("character", startPos);
    range.select();
    return true;
  }

  return false;
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
