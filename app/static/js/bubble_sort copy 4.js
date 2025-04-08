const codeSnippets = {
  python: `
<span id="line1">for i in range(len(arr) - 1):</span>
<span id="line2">    for j in range(len(arr) - i - 1):</span>
<span id="line3">        if arr[j] > arr[j + 1]:</span>
<span id="line4">            arr[j], arr[j + 1] = arr[j + 1], arr[j]</span>`,

  cpp: `
<span id="line1">for (int i = 0; i < n - 1; i++) {</span>
<span id="line2">    for (int j = 0; j < n - i - 1; j++) {</span>
<span id="line3">        if (arr[j] > arr[j + 1]) {</span>
<span id="line4">            swap(arr[j], arr[j + 1]);</span>
<span id="line5">        }</span>
<span id="line6">    }</span>
<span id="line7">}</span>`,

  java: `
<span id="line1">for (int i = 0; i < arr.length - 1; i++) {</span>
<span id="line2">    for (int j = 0; j < arr.length - i - 1; j++) {</span>
<span id="line3">        if (arr[j] > arr[j + 1]) {</span>
<span id="line4">
<span>            int temp = arr[j];</span> <!-- Separate the 'temp' variable -->
<span>            arr[j] = arr[j + 1];</span>
<span>            arr[j + 1] = temp;</span> <!-- Now the swap happens properly -->
</span>
<span id="line7">        }</span>
<span id="line8">    }</span>
<span id="line9">}</span>`,
};

function showCode(language) {
  document.getElementById("code-display").innerHTML = codeSnippets[language];
}

// Display Python code by default
document.addEventListener("DOMContentLoaded", () => {
  showCode("python");
});

document.addEventListener("DOMContentLoaded", function () {
  let array = [5, 3, 8, 4, 2]; // Sample array
  let steps = [];
  let currentStep = 0;
  let isPlaying = false;
  let interval; // Move interval outside so it's accessible in stopSteps()

  // Record steps for sorting
  function recordStep(arr, i, j, swapping = 0, line = 0) {
    steps.push({ arr: [...arr], i, j, swapping, line });
  }

  // Bubble Sort Algorithm
  function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      recordStep(arr, i, -1, 0, 1); // Line 1 executed

      for (let j = 0; j < len - i - 1; j++) {
        recordStep(arr, i, j, 0, 2); // Line 2 executed

        if (arr[j] <= arr[j + 1]) {
          recordStep(arr, i, j, 0, 5); // Line 5 executed - no swap, just sorted
        } else {
          recordStep(arr, i, j, 2, 3); // Line 3 executed (swap will happen)
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          recordStep(arr, i, j, 1, 4); // Line 4 executed (after swap)
        }
      }
    }
    recordStep(arr, -1, -1, 0, 0); // Finished sorting
  }

  bubbleSort([...array]);

  const visualization = document.getElementById("visualization");
  const variables = document.getElementById("variables");

  // Render a specific step of the sorting
  function renderStep(step) {
    visualization.innerHTML = ""; // Clear previous visualization

    let table = document.createElement("table");
    let indexRow = document.createElement("tr");
    let valueRow = document.createElement("tr");
    let movementRow = document.createElement("tr");

    step.arr.forEach((value, index) => {
      let indexCell = document.createElement("td");
      let valueCell = document.createElement("td");
      let movementCell = document.createElement("td");

      let div = document.createElement("div");
      div.classList.add("bar");
      div.style.height = `${value * 10}px`; // Set height based on value
      div.innerText = value;

      if (index === step.j) {
        div.classList.add("j-index"); // Pink for `j`
      }
      if (index === step.i) {
        div.classList.add("i-index"); // Gray for `i`
      }
      if (step.swapping === 2 && (index === step.j || index === step.j + 1)) {
        div.classList.add("swapping"); // Red for swapping
      }

      if (step.swapping === 1 && (index === step.j || index === step.j + 1)) {
        div.classList.remove("j-index");
        div.classList.add("correct"); // After swap, green for correct
      }

      if (step.line === 5 && (index === step.j || index === step.j + 1)) {
        div.classList.add("sorted"); // Green for sorted
      }

      indexCell.innerText = index;
      valueCell.appendChild(div);

      let movementText = "";
      if (index === step.j && index === step.i) {
        movementText = "i, j";
      } else if (index === step.j) {
        movementText = "j";
      } else if (index === step.i) {
        movementText = "i";
      }
      movementCell.innerText = movementText;

      indexRow.appendChild(indexCell);
      valueRow.appendChild(valueCell);
      movementRow.appendChild(movementCell);
    });

    table.appendChild(indexRow);
    table.appendChild(valueRow);
    table.appendChild(movementRow);
    visualization.appendChild(table);

    variables.innerHTML = `<p>i = ${step.i}, j = ${step.j}</p>`;
    highlightCode(step.line);
  }

  // Highlight the current line of code being executed
  function highlightCode(line) {
    document
      .querySelectorAll("#code-container span")
      .forEach((span) => span.classList.remove("highlight"));
    if (line >= 1 && line <= 4) {
      document.getElementById(`line${line}`).classList.add("highlight");
    }
  }

  // Go to the next step
  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep(steps[currentStep]);
    }
  }

  // Go to the previous step
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep(steps[currentStep]);
    }
  }

  // Play through the steps
  function playSteps() {
    if (!isPlaying) {
      isPlaying = true;
      interval = setInterval(() => {
        if (currentStep >= steps.length - 1) {
          clearInterval(interval);
          isPlaying = false;
        } else {
          nextStep();
        }
      }, 1000); // Adjust speed of visualization here (1 second for each step)
    }
  }

  // Stop the current playback
  function stopSteps() {
    isPlaying = false;
    clearInterval(interval); // Clear the interval to stop playback
  }

  // Reset the visualization
  function resetVisualization() {
    location.reload(); // Reload the page to reset everything
  }

  // Control buttons
  document.getElementById("visualize").addEventListener("click", () => {
    renderStep(steps[0]);
    document.getElementById("next").style.display = "inline-block";
    document.getElementById("prev").style.display = "inline-block";
    document.getElementById("play").style.display = "inline-block";
    document.getElementById("stop").style.display = "inline-block";
    document.getElementById("reset").style.display = "inline-block";
  });

  document.getElementById("next").addEventListener("click", nextStep);
  document.getElementById("prev").addEventListener("click", prevStep);
  document.getElementById("play").addEventListener("click", playSteps);
  document.getElementById("stop").addEventListener("click", stopSteps);
  document.getElementById("reset").addEventListener("click", resetVisualization);
});
