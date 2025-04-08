const codeSnippets = {
  python: `
<span id="line1">def counting_sort(arr):</span>
<span id="line3"><span id="line2">    max_val = max(arr)</span>
<span id="line2">    count = [0] * (max_val + 1)</span>
<span id="line4">    output = [0] * len(arr)</span></span>

<span id="line6">
<span id="line5">    for num in arr:</span>
<span id="line5">        count[num] += 1</span></span>

<span id="line8"><span id="line7">    for i in range(1, len(count)):</span>
<span id="line7">        count[i] += count[i - 1]</span></span>

<span id="line10"><span id="line9">    for i in reversed(range(len(arr))):</span>
<span id="line9">        output[count[arr[i]] - 1] = arr[i]</span>
<span id="line11">        count[arr[i]] -= 1</span></span>

<span id="line13"><span id="line12">    for i in range(len(arr)):</span>
<span id="line12">        arr[i] = output[i]</span></span>`,
};

document.addEventListener("DOMContentLoaded", () => {
  showCode("python"); // Default language
});

function showCode(language) {
  document.getElementById("code-display").innerHTML = codeSnippets[language];
}

document.addEventListener("DOMContentLoaded", function () {
  let array = [4, 10, 12, 8, 9, 5, 7];
  let steps = [];
  let currentStep = 0;
  let isPlaying = false;
  let interval;

  function recordStep(
    arr,
    count,
    output,
    max_val,
    i,
    stepDesc,
    line,
    swapIndex = null,
    swapHappened = false
  ) {
    steps.push({
      arr: [...arr],
      count: [...count],
      output: [...output],
      max_val,
      i,
      stepDesc,
      line,
      swapIndex,
      swapHappened, // ✅ Added flag to track actual swaps
    });
  }

  function countingSort(arr) {
    let max_val = Math.max(...arr);
    let count = new Array(max_val + 1).fill(0);
    let output = new Array(arr.length).fill(0);

    recordStep(
      arr,
      count,
      output,
      max_val,
      null,
      "Initialized Count and Output Arrays",
      3
    );

    for (let num of arr) {
      count[num]++;
      recordStep(
        arr,
        count,
        output,
        max_val,
        null,
        `Increment count for ${num}`,
        6
      );
    }

    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
      recordStep(
        arr,
        count,
        output,
        max_val,
        i,
        `Update count at index ${i}`,
        8
      );
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      let num = arr[i];
      let targetIndex = count[num] - 1; // Where the element should go

      output[targetIndex] = num;
      count[num]--;

      let swapHappened = targetIndex !== i; // ✅ Only mark as swap if indices are different
      recordStep(
        arr,
        count,
        output,
        max_val,
        i,
        `Placing ${num} in Output`,
        10,
        targetIndex,
        swapHappened
      );
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      recordStep(
        arr,
        count,
        output,
        max_val,
        i,
        `Copying Output back to Array`,
        13
      );
    }
  }

  countingSort([...array]);

  const visualization = document.getElementById("visualization");
  const variables = document.getElementById("variables");

  function renderStep(step) {
    visualization.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("responsive-table");

    const indexRow = document.createElement("tr");
    const valueRow = document.createElement("tr");
    const labelRow = document.createElement("tr");

    step.arr.forEach((value, index) => {
      const indexCell = document.createElement("td");
      const valueCell = document.createElement("td");
      const labelCell = document.createElement("td");

      const div = document.createElement("div");
      div.classList.add("bar");
      div.style.height = `${value * 5}px`;
      div.innerText = value;

      // ✅ Only apply .swapping when an actual swap happened
      if (step.swapHappened && (index === step.i || index === step.swapIndex)) {
        div.classList.add("swapping");
      } else if (index === step.i) {
        div.classList.add("current-index");
      }

      indexCell.innerText = index;
      valueCell.appendChild(div);

      let labelText = "";
      if (index === step.i) labelText += "index(i)";
      if (index === step.swapIndex && step.swapHappened)
        labelText += "Do Swap!";
      labelCell.innerText = labelText;

      indexRow.appendChild(indexCell);
      valueRow.appendChild(valueCell);
      labelRow.appendChild(labelCell);
    });

    table.appendChild(indexRow);
    table.appendChild(valueRow);
    table.appendChild(labelRow);
    visualization.appendChild(table);

    variables.innerHTML = `
            <p><strong>Step:</strong> ${step.stepDesc}</p>
            <p><strong>max_val:</strong> ${step.max_val}</p>
            <p><strong>i:</strong> ${step.i !== null ? step.i : "-"}</p>
            <p><strong>count:</strong> [${step.count.join(", ")}]</p>
            <p><strong>output:</strong> [${step.output.join(", ")}]</p>
        `;

    if (currentStep < steps.length - 4) {
      highlightCode(step.line);
    }
  }

  function highlightCode(line) {
    document.querySelectorAll("#code-container span").forEach((span) => {
      span.classList.remove("highlight");
    });
    const currentLine = document.getElementById(`line${line}`);
    if (currentLine) {
      currentLine.classList.add("highlight");
    }
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep(steps[currentStep]);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep(steps[currentStep]);
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
      }, 500);
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
    renderStep(steps[0]);
    currentStep = 0;
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
  document
    .getElementById("reset")
    .addEventListener("click", resetVisualization);
});
