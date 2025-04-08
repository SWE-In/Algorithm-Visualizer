const codeSnippets = {
    python: `
    <span id="line1">def insertion_sort(arr):</span>
    <span id="line2">    for i in range(1, len(arr)):</span>
    <span id="line3">        key = arr[i]</span>
    <span id="line4">        j = i - 1</span>
    <span id="line5">        while j >= 0 and key < arr[j]:</span>
    <span id="line6">            arr[j + 1] = arr[j]</span>
    <span id="line7">            j -= 1</span>
    <span id="line8">        arr[j + 1] = key</span>`,

    cpp: `
    <span id="line1">void insertionSort(vector<int>& arr) {</span>
    <span id="line1">    int n = arr.size();</span>
    <span id="line2">    for (int i = 1; i < n; i++) {</span>
    <span id="line3">        int key = arr[i];</span>
    <span id="line4">        int j = i - 1;</span>
    <span id="line5">        while (j >= 0 && arr[j] > key) {</span>
    <span id="line6">            arr[j + 1] = arr[j];</span>
    <span id="line7">            j--;</span>
    <span id="line9">        }</span>
    <span id="line8">        arr[j + 1] = key;</span>
    <span id="line11">    }</span>
    <span id="line12">}</span>`,

    java: `
    <span id="line1">public class InsertionSort {</span>
    <span id="line1">    public static void insertionSort(int[] arr) {</span>
    <span id="line2">        for (int i = 1; i < arr.length; i++) {</span>
    <span id="line3">            int key = arr[i];</span>
    <span id="line4">            int j = i - 1;</span>
    <span id="line5">            while (j >= 0 && arr[j] > key) {</span>
    <span id="line6">                arr[j + 1] = arr[j];</span>
    <span id="line7">                j--;</span>
    <span id="line9">            }</span>
    <span id="line8">            arr[j + 1] = key;</span>
    <span id="line11">        }</span>
    <span id="line12">    }</span>
    <span id="line13">}</span>`
};

document.addEventListener("DOMContentLoaded", () => {
    showCode("python"); // Default language
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

    function recordStep(arr, i, j, key, line, isShift = false, isInsert = false) {
        steps.push({ arr: [...arr], i, j, key, line, isShift, isInsert });
    }

    function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            recordStep(arr, i, j, key, 3); // key assignment
            recordStep(arr, i, j, key, 4); // j assignment

            while (j >= 0 && arr[j] > key) {
                recordStep(arr, i, j, key, 5, true); // entering while
                arr[j + 1] = arr[j];
                recordStep(arr, i, j, key, 6, true); // shift
                j--;
                recordStep(arr, i, j, key, 7); // j--
            }

            arr[j + 1] = key;
            recordStep(arr, i, j, key, 8, false, true); // insert key
        }
    }

    insertionSort([...array]);

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

            if (index === step.i) div.classList.add("current-index");
            if (index === step.j) div.classList.add("min-index");

            if (step.isShift && (index === step.j + 1)) {
                div.classList.add("shifting");
            }

            if (step.isInsert && (index === step.j + 1)) {
                div.classList.add("inserting");
            }

            indexCell.innerText = index;
            valueCell.appendChild(div);

            let labelText = "";
            if (index === step.i) labelText += "i ";
            if (index === step.j) labelText += "j ";
            if (index === step.j + 1 && step.isInsert) labelText += "Inserted";
            labelCell.innerText = labelText;

            indexRow.appendChild(indexCell);
            valueRow.appendChild(valueCell);
            labelRow.appendChild(labelCell);
        });

        table.appendChild(indexRow);
        table.appendChild(valueRow);
        table.appendChild(labelRow);
        visualization.appendChild(table);

        variables.innerHTML = `<p>i = ${step.i}, j = ${step.j}, key = ${step.key}</p>`;

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
    document.getElementById("reset").addEventListener("click", resetVisualization);
});
