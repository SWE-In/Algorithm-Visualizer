const codeSnippets = {
    python: `
    <span id="line1">def selection_sort(arr):</span>
    <span id="line2">    n = len(arr)</span>
    <span id="line3">    for i in range(n - 1):</span>
    <span id="line4">        min_idx = i</span>
    <span id="line5">        for j in range(i + 1, n):</span>
    <span id="line6">            if arr[j] < arr[min_idx]:</span>
    <span id="line7">                min_idx = j</span>
    <span id="line8">        arr[i], arr[min_idx] = arr[min_idx], arr[i]</span>`,

    cpp: `
    <span id="line1">void selectionSort(vector<int>& arr) {</span>
    <span id="line2">    int n = arr.size();</span>
    <span id="line3">    for (int i = 0; i < n - 1; i++) {</span>
    <span id="line4">        int min_idx = i;</span>
    <span id="line5">        for (int j = i + 1; j < n; j++) {</span>
    <span id="line6">            if (arr[j] < arr[min_idx]) {</span>
    <span id="line7">                min_idx = j;</span>
    <span id="line10">            }</span>
    <span id="line9">        }</span>
    <span id="line8">        swap(arr[i], arr[min_idx]);</span>
    <span id="line11">    }</span>
    <span id="line12">}</span>`,

    java: `
    <span id="line1">public class SelectionSort {</span>
    <span id="line2">    public static void selectionSort(int[] arr) {</span>
    <span id="line2">        int n = arr.length;</span>
    <span id="line3">        for (int i = 0; i < n - 1; i++) {</span>
    <span id="line4">            int min_idx = i;</span>
    <span id="line5">            for (int j = i + 1; j < n; j++) {</span>
    <span id="line6">                if (arr[j] < arr[min_idx]) {</span>
    <span id="line7">                    min_idx = j;</span>
    <span id="line9">                }</span>
    <span id="line9">            }</span>
<span id="line10"><span id="line11">            int temp = arr[i];</span>
    <span id="line12">            arr[i] = arr[min_idx];</span>
    <span id="line13">            arr[min_idx] = temp;</span></span>
    <span id="line14">        }</span>
    <span id="line15">    }</span>
    <span id="line16">}</span>`
};

// Show Python code by default
document.addEventListener("DOMContentLoaded", () => {
    showCode("python");
});

function showCode(language) {
    document.getElementById("code-display").innerHTML = codeSnippets[language];
}

document.addEventListener("DOMContentLoaded", function () {
    let array = [8, 7, 4, 13, 9, 6, 10];
    let steps = [];
    let currentStep = 0;
    let isPlaying = false;
    let interval;

    function recordStep(arr, i, min_idx, line, isSwap = false) {
        steps.push({ arr: [...arr], i, min_idx, line, isSwap });
    }
    

    function selectionSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let min_idx = i;
            recordStep(arr, i, min_idx, 4); // Mark initial min_idx
    
            for (let j = i + 1; j < n; j++) {
                recordStep(arr, i, min_idx, 5);
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                    recordStep(arr, i, min_idx, 6);
                }
            }
    
            // ✅ Record step BEFORE swap to show correct elements being swapped
            recordStep(arr, i, min_idx, 8, true); // Mark swap step
    
            // Perform the swap
            [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
            
            recordStep(arr, i, min_idx, 8); // Final step after swap
        }
    }
    

    selectionSort([...array]);

    const visualization = document.getElementById("visualization");
    const variables = document.getElementById("variables");

    function renderStep(step, prevStep = null) {
        visualization.innerHTML = "";
    
        let table = document.createElement("table");
        table.classList.add("responsive-table");
    
        let indexRow = document.createElement("tr");
        let valueRow = document.createElement("tr");
        let labelRow = document.createElement("tr");  
    
        step.arr.forEach((value, index) => {
            let indexCell = document.createElement("td");
            let valueCell = document.createElement("td");
            let labelCell = document.createElement("td");
    
            let div = document.createElement("div");
            div.classList.add("bar");
            div.style.height = `${value * 5}px`;
            div.innerText = value;
    
            if (index === step.i) div.classList.add("current-index");
            if (index === step.min_idx) div.classList.add("min-index");
    
            // ✅ Highlight swapping elements in the correct step
            if (step.isSwap && (index === step.i || index === step.min_idx)) {
                div.classList.add("swapping");
            }
    
            indexCell.innerText = index;
            valueCell.appendChild(div);
    
            let labelText = "";
            if (index === step.i) labelText += "C "; // Current
            if (index === step.min_idx) labelText += "M"; // Min
            labelCell.innerText = labelText;
    
            indexRow.appendChild(indexCell);
            valueRow.appendChild(valueCell);
            labelRow.appendChild(labelCell);
        });
    
        table.appendChild(indexRow);
        table.appendChild(valueRow);
        table.appendChild(labelRow);  
        visualization.appendChild(table);
    
        variables.innerHTML = `<p>Current Index = ${step.i}, Min Index = ${step.min_idx}</p>`;
    
        highlightCode(step.line);
    }
    
    

    function highlightCode(line) {
        document.querySelectorAll("#code-container span").forEach((span) => {
            span.classList.remove("highlight");
        });

        let currentLine = document.getElementById(`line${line}`);
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
