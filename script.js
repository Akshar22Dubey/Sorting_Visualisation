// const n = 10;
// const array = [];
// intialisation();

// let audioCtx = null;
// function playNote(freq) {
//   if (audioCtx == null) {
//     audioCtx = new (AudioContext ||
//       webkitAudioContext ||
//       window.webkitAudioContext)();
//   }

//   const dur = 0.1;
//   const osc = audioCtx.createOscillator();
//   osc.frequency.value = freq;
//   osc.start();
//   osc.stop(audioCtx.currentTime + dur);
//   osc.connect(audioCtx.destination);
// }
// function intialisation() {
//   for (let i = 0; i < n; i++) {
//     array[i] = Math.random();
//   }
//   show_bar();
// }

// function play() {
//   const copy = [...array];
//   const move = sorting_algo(copy);
//   animate(move);
// }

// function animate(move) {
//   if (move.length == 0) {
//     show_bar();
//     return;
//   }

//   const moves = move.shift();
//   const [i, j] = moves.indices;

//   if (moves.type == "swap") {
//     [array[i], array[j]] = [array[j], array[i]];
//   }

//   playNote(200 + array[i] * 500);
//   playNote(200 + array[j] * 500);

//   show_bar(moves);

//   setTimeout(function () {
//     animate(move);
//   }, 50);
// }
// // Bubble sort

// function sorting_algo(array) {
//   const move = [];
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n - i; j++) {
//       move.push({ indices: [j, j + 1], type: "comp" });
//       if (array[j] > array[j + 1]) {
//         move.push({ indices: [j, j + 1], type: "swap" });
//         [array[j], array[j + 1]] = [array[j + 1], array[j]];
//       }
//     }
//   }
//   // Selection sort

//   for (let i = 1; i < n - 1; i++) {
//     let min_index = i;
//     for (let j = i + 1; j < n; j++) {
//       if (array[j] < array[min_index]) {
//         min_index = j;
//       }
//     }

//     [array[min_index], array[i]] = [array[i], array[min_index]];
//   }

//   return move;
// }

// function show_bar(moves) {
//   container.innerHTML = "";
//   for (let i = 0; i < n; i++) {
//     const bar = document.createElement("div");
//     bar.style.height = array[i] * 100 + "%";
//     bar.classList.add("bar");

//     if (moves && moves.indices.includes(i)) {
//       bar.style.backgroundColor = moves.type == "swap" ? "red" : "black";
//     }
//     container.appendChild(bar);
//   }
// }
 const n = 10;
 const array = [];
 const container = document.getElementById("container");
 let audioCtx = null;

 initialisation();

 function initialisation() {
   for (let i = 0; i < n; i++) {
     array[i] = Math.random();
   }
   show_bar();
 }

 function play() {
   const copy = [...array];
   const moves = sorting_algo(copy);
   animate(moves);
 }

 function playNote(freq) {
   if (audioCtx === null) {
     audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   }

   // Ensure frequency is finite
   if (!isFinite(freq)) {
     console.error("Invalid frequency:", freq);
     return;
   }

   const dur = 0.1;
   const osc = audioCtx.createOscillator();
   osc.frequency.value = freq;
   osc.start();
   osc.stop(audioCtx.currentTime + dur);
   osc.connect(audioCtx.destination);
 }

 function animate(moves) {
   if (moves.length === 0) {
     show_bar();
     return;
   }

   const move = moves.shift();
   const [i, j] = move.indices;

   if (move.type === "swap") {
     [array[i], array[j]] = [array[j], array[i]];
   }

   playNote(200 + array[i] * 500);
   playNote(200 + array[j] * 500);

   show_bar(move);

   setTimeout(function () {
     animate(moves);
   }, 50);
 }

 // Bubble sort
 function sorting_algo(array) {
   const moves = [];
   for (let i = 0; i < n - 1; i++) {
     for (let j = 0; j < n - i - 1; j++) {
       moves.push({ indices: [j, j + 1], type: "comp" });
       if (array[j] > array[j + 1]) {
         moves.push({ indices: [j, j + 1], type: "swap" });
         [array[j], array[j + 1]] = [array[j + 1], array[j]];
       }
     }
   }
   return moves;
 }

 function show_bar(move) {
   container.innerHTML = "";
   for (let i = 0; i < n; i++) {
     const bar = document.createElement("div");
     bar.style.height = array[i] * 100 + "%";
     bar.classList.add("bar");

     if (move && move.indices.includes(i)) {
       bar.style.backgroundColor = move.type === "swap" ? "yellow" : "red";
     }
     container.appendChild(bar);
   }
 }