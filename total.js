// script.js

let experiment_start_time = new Date().getTime();
let show_mouse = `<img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
style="transform: translateX(-37px) translateY(-90px) scale(1.8) !important;" class="mouse"/></div>`;
let render_hammer = `<img src="image/img1.jpg"/> <div class="hammer"><img src="image/hammer.png" 
style="transform: translateX(-90px) translateY(-130px) scale(2) !important;" class="hammer"/></div>`;
let show_mouse_and_hammer = `
<img src="image/img1.jpg"/>
<div class="mouse_and_hammer_together">
    <img src="image/mouse2.png" style="transform: translateX(-37px) translateY(-90px) scale(1.8) !important;" />
    <img src="image/hammer.png" style="transform: translateX(-90px) translateY(-130px) scale(2) !important;" />
</div>
`;

let start_game = document.querySelector(".start_game")
let background_music = document.querySelector(".music1")
let mapping_1 = [0, 1, 2, 3, 4]
let mapping_2 = [0, 1, 2, 3, 4]
let mapping_3 = [0, 1, 2, 3, 4]
let data = []; // data for each trial will be stored here
let score = document.querySelector(".score")
let trial = document.querySelector(".trial")
score.innerHTML = String(0)
trial.innerHTML = String(0)

function create_all_mappings(){
    mapping_1 = shuffleArray(mapping_1)
    mapping_2 = shuffleArray(mapping_2)
    mapping_3 = shuffleArray(mapping_3)
}

function redirectToSecondPage() {
    start_game.style.top = '-100%'
    background_music.volume = 0.1
    background_music.play()
    training_mapping_1()
}

function training_mapping_1() {
    context_change_into_rose()
    let stimuli = generate_stimuli();
    for (let i = 0; i < 100; i++) {
        setTimeout(function() {
            let this_trial_data = one_training_trial(i, stimuli, mapping_1);
            data.push({trial_number: i, trial_data: this_trial_data});
        }, 5000 * i); // This ensures that each function call is delayed by 1 second more than the previous one
    }
}

function one_training_trial(tr_ial, s_t_i_m_u_l_i, map) {
    let single_trial_data = []
    let trial_stimulus_number = s_t_i_m_u_l_i[tr_ial]
    let original_content = document.querySelector('.game' + trial_stimulus_number).innerHTML
    document.querySelector('.game' + trial_stimulus_number).innerHTML = show_mouse
    let stimulus_display_time = new Date().getTime();
    let keyIndex = ''
    let key_press_time = ''
    document.onkeydown = function (e) {
        switch (e.key) {
            case 'h':
                keyIndex = map[0]
                break
            case 'u':
                keyIndex = map[1]
                break
            case 'i':
                keyIndex = map[2]
                break
            case 'l':
                keyIndex = map[3]
                break
            case 'b':
                keyIndex = map[4]
                break
        }
        key_press_time = new Date().getTime();
        if (keyIndex === trial_stimulus_number) {
            score_number++
            score.innerHTML = String(score_number)
            music3.play()
            setTimeout(function () {
                document.querySelector('.game' + trial_stimulus_number).innerHTML = show_mouse_and_hammer
            }, 200) // display hitting the marmot
        } else {
            music2.play()
            let temp = document.querySelector('.game' + keyIndex).innerHTML
            setTimeout(function () {
                document.querySelector('.game' + keyIndex).innerHTML = render_hammer
            }, 200) // display only the hammer
            document.querySelector('.game' + keyIndex).innerHTML = temp
        }
        document.querySelector('.game' + trial_stimulus_number).innerHTML = original_content
    }
    single_trial_data.push({
        stimulus_number: trial_stimulus_number,
        key_press_number: keyIndex,
        stimulus_display_time: stimulus_display_time,
        key_pressed_time: key_press_time,
    });
    return single_trial_data
}

function generate_stimuli() {
    let temp = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 20; j++) {
            temp.push(i);
        }
    }
    shuffleArray(temp)
    return temp
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

// Initialize the array with numbers 1 to 5
let numbers = [1, 2, 3, 4, 5];
// Shuffle the array to get a random order
shuffleArray(numbers);
// Log the shuffled array to the console
console.log(numbers);

function context_change_into_rose(){
    let element = document.querySelector('.context_cue');
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_rose');
    }
}

function context_change_into_blue(){
    let element = document.querySelector('.context_cue');
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_blue');
    }
}

function context_change_into_purple(){
    let element = document.querySelector('.context_cue');
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_purple');
    }
}

function downloadArrayAsFile(array, filename) {
    // Convert the array to a string format (e.g., JSON)
    const jsonString = JSON.stringify(array);
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], {type: "application/json"});
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor (`a`) element
    const a = document.createElement("a");
    // Set the download attribute of the anchor to the filename
    a.download = filename;
    // Set the href of the anchor to the Blob URL
    a.href = url;
    // Append the anchor to the document body temporarily
    document.body.appendChild(a);
    // Trigger the download by simulating a click on the anchor
    a.click();
    // Clean up by removing the temporary anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

