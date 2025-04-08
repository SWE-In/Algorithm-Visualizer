const codeSnippets = {
  python: `
<span id="line1">def bucket_sort(arr):</span>
<span id="line2">    n = len(arr)</span>
<span id="line3">    buckets = [[] for _ in range(n)]</span>

<span id="line4">    for num in arr:</span>
<span id="line5">        index = int(n * num)</span>
<span id="line6">        buckets[index].append(num)</span>

<span id="line7">    for bucket in buckets:</span>
<span id="line8">        bucket.sort()</span>

<span id="line9">    output = []</span>
<span id="line10">    for bucket in buckets:</span>
<span id="line11">        output.extend(bucket)</span>

<span id="line12">    return output</span>
`,

  cpp: `
<span id="line1">#include <iostream></span>
<span id="line2">#include <vector></span>
<span id="line3">#include <algorithm></span>
<span id="line4">using namespace std;</span>

<span id="line5">void bucketSort(vector<float>& arr) {</span>
<span id="line6">    int n = arr.size();</span>
<span id="line7">    vector<vector<float>> buckets(n);</span>

<span id="line8">    for (float num : arr) {</span>
<span id="line9">        int index = num * n;</span>
<span id="line10">        buckets[index].push_back(num);</span>
<span id="line11">    }</span>

<span id="line12">    for (auto& bucket : buckets) {</span>
<span id="line13">        sort(bucket.begin(), bucket.end());</span>
<span id="line14">    }</span>

<span id="line15">    int idx = 0;</span>
<span id="line16">    for (auto& bucket : buckets) {</span>
<span id="line17">        for (float num : bucket) {</span>
<span id="line18">            arr[idx++] = num;</span>
<span id="line19">        }</span>
<span id="line20">    }</span>
<span id="line21">}</span>
`,

  java: `
<span id="line1">import java.util.*;</span>

<span id="line2">class BucketSort {</span>
<span id="line3">    public static void bucketSort(float[] arr) {</span>
<span id="line4">        int n = arr.length;</span>
<span id="line5">        List<Float>[] buckets = new List[n];</span>

<span id="line6">        for (int i = 0; i < n; i++) {</span>
<span id="line7">            buckets[i] = new ArrayList<>();</span>
<span id="line8">        }</span>

<span id="line9">        for (float num : arr) {</span>
<span id="line10">            int index = (int) (num * n);</span>
<span id="line11">            buckets[index].add(num);</span>
<span id="line12">        }</span>

<span id="line13">        for (List<Float> bucket : buckets) {</span>
<span id="line14">            Collections.sort(bucket);</span>
<span id="line15">        }</span>

<span id="line16">        int idx = 0;</span>
<span id="line17">        for (List<Float> bucket : buckets) {</span>
<span id="line18">            for (float num : bucket) {</span>
<span id="line19">                arr[idx++] = num;</span>
<span id="line20">            }</span>
<span id="line21">        }</span>
<span id="line22">    }</span>
<span id="line23">}</span>
`,
};

document.addEventListener("DOMContentLoaded", () => {
  showCode("python");
});

function showCode(language) {
  document.getElementById("code-display").innerHTML = codeSnippets[language];
}

document.addEventListener("DOMContentLoaded", function () {
  let array = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68];
  let steps = [];
  let currentStep = 0;
  let isPlaying = false;
  let interval;

  function recordStep(buckets, output, stepDesc, line, i = null, currentValue = null) {
    steps.push({
        buckets: buckets.map(bucket => [...bucket]),
        output: [...output],
        stepDesc,
        line,
        i, // Track the active index
        currentValue // Track the value being processed
    });
}


  function bucketSort(arr) {
    let n = arr.length;
    let buckets = Array.from({ length: n }, () => []);
    let output = [];

    recordStep(buckets, output, "Initialize empty buckets", 1);

   // Insert elements into buckets
for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(n * arr[i]);
    buckets[index].push(arr[i]);
    recordStep(buckets, output, `Insert ${arr[i]} into Bucket ${index}`, 5, index, arr[i]); 
}


    // Sort each bucket
    for (let i = 0; i < n; i++) {
      if (buckets[i].length > 0) {
        buckets[i].sort((a, b) => a - b);
        recordStep(buckets, output, `Sort Bucket ${i}`, 9);
      }
    }

    // Merge buckets into output
for (let i = 0; i < n; i++) {
    if (buckets[i].length > 0) {
        output.push(...buckets[i]);
        recordStep(buckets, output, `Merging Bucket ${i} → Output`, 13, i);
    }
}
  }

  bucketSort([...array]);

  const visualization = document.getElementById("visualization");
  const variables = document.getElementById("variables");

  function renderStep(step) {
    visualization.innerHTML = "";

    // Create a table for bucket visualization
    const table = document.createElement("table");
    table.classList.add("bucket-table");

    const indexRow = document.createElement("tr");
    const bucketRow = document.createElement("tr");
    const iRow = document.createElement("tr"); // Row for tracking i

    step.buckets.forEach((bucket, index) => {
        const indexCell = document.createElement("td");
        const bucketCell = document.createElement("td");
        const iCell = document.createElement("td");

        indexCell.innerText = `Bucket ${index}`;
        bucketCell.innerText = `[${bucket.join(", ")}]`;
        iCell.innerText = "-"; // Default placeholder

        // 🔥 Highlight bucket where insertion is happening
        if (step.line === 5 && index === step.i) {
            bucketCell.classList.add("highlight-bucket");
            iCell.innerText = `⬅ (Inserting ${step.currentValue})`;
            iCell.classList.add("highlight-index");
        } 
        
        // 🔥 Highlight bucket being merged into output
        if (step.line === 13 && step.i === index) {
            bucketCell.classList.add("newly-added");
            iCell.innerText = `⬅ (Merging Bucket ${index})`;
            iCell.classList.add("merge-index");
        }

        indexRow.appendChild(indexCell);
        bucketRow.appendChild(bucketCell);
        iRow.appendChild(iCell);
    });

    table.appendChild(indexRow);
    table.appendChild(bucketRow);
    table.appendChild(iRow);
    visualization.appendChild(table);

    // Output Section (Sorted elements)
    const outputDiv = document.createElement("div");
    outputDiv.classList.add("output-section");

    step.output.forEach((num, idx) => {
        const numSpan = document.createElement("span");
        numSpan.innerText = num;
        numSpan.classList.add("output-number");

        // 🔥 Highlight numbers recently added to output
        if (step.line === 13 && step.i !== null && 
            idx >= step.output.length - step.buckets[step.i].length) {
            numSpan.classList.add("newly-added");
        }

        outputDiv.appendChild(numSpan);
    });

    visualization.appendChild(outputDiv);

    // Display step description
    variables.innerHTML = `<p><strong>Step:</strong> ${step.stepDesc}</p>`;

    highlightCode(step.line);
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
