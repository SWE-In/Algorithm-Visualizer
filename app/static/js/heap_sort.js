const codeSnippets = {
    python: `
<span id="line1">def heapify(arr, n, i):</span>
<span id="line2">    largest = i</span>
<span id="line3">    l = 2 * i + 1</span>
<span id="line4">    r = 2 * i + 2</span>
<span id="line5">    if l < n and arr[l] > arr[largest]:</span>
<span id="line6">        largest = l</span>
<span id="line7">    if r < n and arr[r] > arr[largest]:</span>
<span id="line8">        largest = r</span>
<span id="line9">    if largest != i:</span>
<span id="line10">        arr[i], arr[largest] = arr[largest], arr[i]</span>
<span id="line11">        heapify(arr, n, largest)</span>

<span id="line12">def heap_sort(arr):</span>
<span id="line13">    n = len(arr)</span>
<span id="line14">    for i in range(n // 2 - 1, -1, -1):</span>
<span id="line15">        heapify(arr, n, i)</span>
<span id="line16">    for i in range(n - 1, 0, -1):</span>
<span id="line17">        arr[i], arr[0] = arr[0], arr[i]</span>
<span id="line18">        heapify(arr, i, 0)</span>
`,

    cpp: `
<span id="line1">void heapify(vector<int>& arr, int n, int i) {</span>
<span id="line2">    int largest = i;</span>
<span id="line3">    int l = 2 * i + 1;</span>
<span id="line4">    int r = 2 * i + 2;</span>
<span id="line5">    if (l < n && arr[l] > arr[largest])</span>
<span id="line6">        largest = l;</span>
<span id="line7">    if (r < n && arr[r] > arr[largest])</span>
<span id="line8">        largest = r;</span>
<span id="line9">    if (largest != i) {</span>
<span id="line10">        swap(arr[i], arr[largest]);</span>
<span id="line11">        heapify(arr, n, largest);</span>
<span id="line12">    }</span>
<span id="line13">}</span>

<span id="line14">void heapSort(vector<int>& arr) {</span>
<span id="line15">    int n = arr.size();</span>
<span id="line16">    for (int i = n / 2 - 1; i >= 0; i--)</span>
<span id="line17">        heapify(arr, n, i);</span>
<span id="line18">    for (int i = n - 1; i > 0; i--) {</span>
<span id="line19">        swap(arr[0], arr[i]);</span>
<span id="line20">        heapify(arr, i, 0);</span>
<span id="line21">    }</span>
<span id="line22">}</span>
`,

    java: `
<span id="line1">public class HeapSort {</span>
<span id="line2">    public void heapify(int arr[], int n, int i) {</span>
<span id="line3">        int largest = i;</span>
<span id="line4">        int l = 2 * i + 1;</span>
<span id="line5">        int r = 2 * i + 2;</span>
<span id="line6">        if (l < n && arr[l] > arr[largest])</span>
<span id="line7">            largest = l;</span>
<span id="line8">        if (r < n && arr[r] > arr[largest])</span>
<span id="line9">            largest = r;</span>
<span id="line10">        if (largest != i) {</span>
<span id="line11">            int swap = arr[i];</span>
<span id="line12">            arr[i] = arr[largest];</span>
<span id="line13">            arr[largest] = swap;</span>
<span id="line14">            heapify(arr, n, largest);</span>
<span id="line15">        }</span>
<span id="line16">    }</span>

<span id="line17">    public void sort(int arr[]) {</span>
<span id="line18">        int n = arr.length;</span>
<span id="line19">        for (int i = n / 2 - 1; i >= 0; i--)</span>
<span id="line20">            heapify(arr, n, i);</span>
<span id="line21">        for (int i = n - 1; i > 0; i--) {</span>
<span id="line22">            int temp = arr[0];</span>
<span id="line23">            arr[0] = arr[i];</span>
<span id="line24">            arr[i] = temp;</span>
<span id="line25">            heapify(arr, i, 0);</span>
<span id="line26">        }</span>
<span id="line27">    }</span>
<span id="line28">}</span>
`
};

document.addEventListener("DOMContentLoaded", () => {
    showCode("python");

    const array = [12, 14, 10, 8, 7, 9, 3, 11, 4, 5];
    let steps = [];
    let currentStep = 0;
    let isPlaying = false;
    let interval;

    function recordStep(arr, heapSize, i, largest, line, isSwap = false) {
        steps.push({ arr: [...arr], heapSize, i, largest, line, isSwap });
    }

    function heapify(arr, n, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        recordStep(arr, n, i, largest, 2);

        if (l < n && arr[l] > arr[largest]) {
            largest = l;
            recordStep(arr, n, i, largest, 5);
        }

        if (r < n && arr[r] > arr[largest]) {
            largest = r;
            recordStep(arr, n, i, largest, 7);
        }

        if (largest !== i) {
            recordStep(arr, n, i, largest, 9, true);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            recordStep(arr, n, i, largest, 10);
            heapify(arr, n, largest);
        }
    }

    function heapSort(arr) {
        let n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            recordStep(arr, n, i, i, 14);
            heapify(arr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            recordStep(arr, i, 0, i, 17, true);
            [arr[0], arr[i]] = [arr[i], arr[0]];
            recordStep(arr, i, 0, i, 18);
            heapify(arr, i, 0);
        }
    }

    heapSort([...array]);

    function renderStep(step) {
        const visualization = document.getElementById("visualization");
        visualization.innerHTML = "";
    
        const table = document.createElement("table");
        const indexRow = document.createElement("tr");
        const valueRow = document.createElement("tr");
        const labelRow = document.createElement("tr");
    
        step.arr.forEach((val, idx) => {
            const valueCell = document.createElement("td");
            const indexCell = document.createElement("td");
            const labelCell = document.createElement("td");
    
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${val * 5}px`;
            bar.innerText = val;
    
            // 🟢 Highlight the currently processed index
            if (idx === step.i) bar.classList.add("current-index");
    
            // 🔴 Highlight the max element found
            if (idx === step.largest) bar.classList.add("max-index");
    
            // 🔄 Highlight swap operation (only when swap happens)
            if (step.isSwap && (idx === step.i || idx === step.largest)) {
                bar.classList.add("swapping");
            }
    
            indexCell.innerText = idx;
            valueCell.appendChild(bar);
    
            // ℹ️ Display index labels
            let label = "";
            if (idx === step.i) label += "C ";   // C = Current
            if (idx === step.largest) label += "L"; // L = Largest
            labelCell.innerText = label;
    
            indexRow.appendChild(indexCell);
            valueRow.appendChild(valueCell);
            labelRow.appendChild(labelCell);
        });
    
        table.appendChild(indexRow);
        table.appendChild(valueRow);
        table.appendChild(labelRow);
        visualization.appendChild(table);
    
        // 📌 Display current variables below visualization
        document.getElementById("variables").innerHTML =
            `<p>Current Index = ${step.i}, Largest = ${step.largest}, Heap Size = ${step.heapSize}</p>`;
    
        // ✨ Highlight the correct line in the code
        highlightCode(step.line);
    }
    

    function highlightCode(line) {
        document.querySelectorAll("#code-container span").forEach(span => {
            span.classList.remove("highlight");
        });

        const lineElem = document.getElementById(`line${line}`);
        if (lineElem) lineElem.classList.add("highlight");
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
            }, 600);
        }
    }

    function stopSteps() {
        clearInterval(interval);
        isPlaying = false;
    }

    function resetVisualization() {
        location.reload();
    }

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

function showCode(language) {
    document.getElementById("code-display").innerHTML = codeSnippets[language];
}
