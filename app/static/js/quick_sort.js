const codeSnippets = {
  python: `
<span id="line1">def quick_sort(arr, low, high):</span>
<span id="line2">    if low < high:</span>
<span id="line3">        pivot = partition(arr, low, high)</span>
<span id="line4">        quick_sort(arr, low, pivot - 1)</span>
<span id="line5">        quick_sort(arr, pivot + 1, high)</span>

<span id="line6">def partition(arr, low, high):</span>
<span id="line7">    pivot = arr[high]</span>
<span id="line8">    i = low - 1</span>
<span id="line9">    for j in range(low, high):</span>
<span id="line10">        if arr[j] < pivot:</span>
<span id="line11">            i += 1</span>
<span id="line12">            arr[i], arr[j] = arr[j], arr[i]</span>
<span id="line13">    arr[i + 1], arr[high] = arr[high], arr[i + 1]</span>
<span id="line14">    return i + 1</span>`,
};

function showCode(language) {
  document.getElementById("code-display").innerHTML = codeSnippets[language];
}

// Display Python code by default
document.addEventListener("DOMContentLoaded", () => {
  showCode("python");
});

// ------------------------- Highlighting + Variables -------------------------

document.addEventListener("DOMContentLoaded", function () {
  let steps = [];
  let currentStep = 0;
  let isPlaying = false;
  let interval;

  function recordStep(low, high, pivot, line, i = null, j = null) {
    steps.push({ low, high, pivot, line, i, j });
  }

  function partition(arr, low, high) {
    recordStep(low, high, "-", 6);
    let pivot = arr[high];
    recordStep(low, high, pivot, 7);

    let i = low - 1;
    recordStep(low, high, pivot, 8, i);

    for (let j = low; j < high; j++) {
      recordStep(low, high, pivot, 9, i, j);
      if (arr[j] < pivot) {
        i++;
        recordStep(low, high, pivot, 11, i, j);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        recordStep(low, high, pivot, 12, i, j);
      }
    }

    recordStep(low, high, pivot, 13, i);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    recordStep(low, high, pivot, 14, i);
    return i + 1;
  }

  function quickSort(arr, low, high) {
    if (low < high) {
      recordStep(low, high, "-", 2);
      let pivot = partition(arr, low, high);
      recordStep(low, high, pivot, 3);

      if (low < pivot - 1) {
        recordStep(low, pivot - 1, pivot, 4);
        quickSort(arr, low, pivot - 1);
      }

      if (pivot + 1 < high) {
        recordStep(pivot + 1, high, pivot, 5);
        quickSort(arr, pivot + 1, high);
      }
    }
  }

  quickSort([10, 3, 8, 15, 6, 12, 2, 18, 7, 1], 0, 9);

  function highlightCode(step) {
    document.querySelectorAll("#code-container span").forEach((span) =>
      span.classList.remove("highlight")
    );
    if (step.line >= 1 && step.line <= 14) {
      document.getElementById(`line${step.line}`).classList.add("highlight");
    }

    document.getElementById("variables").innerHTML = `
      <p>Low = ${step.low}, High = ${step.high}, Pivot = ${step.pivot}, 
         i = ${step.i !== null ? step.i : '-'}, 
         j = ${step.j !== null ? step.j : '-'}</p>`;
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      highlightCode(steps[currentStep]);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      highlightCode(steps[currentStep]);
    }
  }

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
      }, 1000);
    }
  }

  function stopSteps() {
    isPlaying = false;
    clearInterval(interval);
  }

  function resetVisualization() {
    location.reload();
  }

  document.getElementById("visualize").addEventListener("click", () => {
    highlightCode(steps[0]);
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
