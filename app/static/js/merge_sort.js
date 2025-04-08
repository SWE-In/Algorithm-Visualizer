const codeSnippets = {
    python: `
    <span id="line1">def merge_sort(arr, left, right):</span>
    <span id="line2">    if left < right:</span>
    <span id="line3">        mid = (left + right) // 2</span>
    <span id="line4">        merge_sort(arr, left, mid)</span>
    <span id="line5">        merge_sort(arr, mid + 1, right)</span>
    <span id="line6">        merge(arr, left, mid, right)</span>`,
    cpp: `
    <span id="line1">void mergeSort(vector<int>& arr, int left, int right) {</span>
    <span id="line2">    if (left < right) {</span>
    <span id="line3">        int mid = left + (right - left) / 2;</span>
    <span id="line4">        mergeSort(arr, left, mid);</span>
    <span id="line5">        mergeSort(arr, mid + 1, right);</span>
    <span id="line6">        merge(arr, left, mid, right);</span>
    <span id="line7">    }</span>
    <span id="line8">}</span>`,
    java: `
    <span id="line1">public class MergeSort {</span>
    <span id="line1">    public static void mergeSort(int[] arr, int left, int right) {</span>
    <span id="line2">        if (left < right) {</span>
    <span id="line3">            int mid = left + (right - left) / 2;</span>
    <span id="line4">            mergeSort(arr, left, mid);</span>
    <span id="line5">            mergeSort(arr, mid + 1, right);</span>
    <span id="line6">            merge(arr, left, mid, right);</span>
    <span id="line8">        }</span>
    <span id="line9">    }</span>
    <span id="line10">}</span>`

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

    function recordStep(arr, left, mid, right, line) {
        steps.push({ arr: [...arr], left, mid, right, line });
    }

    function mergeSort(arr, left, right) {
        recordStep(arr, left, null, right, 1);

        if (left < right) {
            recordStep(arr, left, null, right, 2);

            let mid = Math.floor((left + right) / 2);
            recordStep(arr, left, mid, right, 3);

            mergeSort(arr, left, mid);
            recordStep(arr, left, mid, right, 4);

            mergeSort(arr, mid + 1, right);
            recordStep(arr, left, mid, right, 5);

            merge(arr, left, mid, right);
            recordStep(arr, left, mid, right, 6);
        }
    }

    function merge(arr, left, mid, right) {
        let leftArr = arr.slice(left, mid + 1);
        let rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            recordStep(arr, left, mid, right, 6);
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }

        recordStep(arr, left, mid, right, 6);
    }

    mergeSort([...array], 0, array.length - 1);

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
    
            if (index === step.mid) div.classList.add("mid-index");
            if (index >= step.left && index <= step.right) div.classList.add("active");
    
            if (currentStep < steps.length - 1 && (index === step.left || index === step.right)) {
                div.classList.add("swapping");
            }
            
    
            indexCell.innerText = index;
            valueCell.appendChild(div);
    
            let labelText = "";
            if (index === step.left) labelText += "L";
            if (index === step.mid) labelText += "M";
            if (index === step.right) labelText += "R";
    
            labelCell.innerText = labelText;
            indexRow.appendChild(indexCell);
            valueRow.appendChild(valueCell);
            labelRow.appendChild(labelCell);
        });
    
        table.appendChild(indexRow);
        table.appendChild(valueRow);
        table.appendChild(labelRow);
        visualization.appendChild(table);
    
        variables.innerHTML = `<p>Left = ${step.left}, Mid = ${step.mid}, Right = ${step.right}</p>`;
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
            }, 500); // Normal execution speed (0.5 sec per step)
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
