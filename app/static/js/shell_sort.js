const codeSnippets = {
    python: `
<span id="line1">def shell_sort(arr):</span>
<span id="line2">    n = len(arr)</span>
<span id="line3">    gap = n // 2</span>
<span id="line4">    while gap > 0:</span>
<span id="line5">        for i in range(gap, n):</span>
<span id="line6">            temp = arr[i]</span>
<span id="line7">            j = i</span>
<span id="line8">            while j >= gap and arr[j - gap] > temp:</span>
<span id="line9">                arr[j] = arr[j - gap]</span>
<span id="line10">                j -= gap</span>
<span id="line11">            arr[j] = temp</span>
<span id="line12">        gap //= 2</span>
    `,

    cpp: `
<span id="line1">void shellSort(vector<int>& arr) {</span>
<span id="line2">    int n = arr.size();</span>
<span id="line3">    for (int gap = n / 2; gap > 0; gap /= 2) {</span>
<span id="line4">        for (int i = gap; i < n; i++) {</span>
<span id="line5">            int temp = arr[i];</span>
<span id="line6">            int j = i;</span>
<span id="line7">            while (j >= gap && arr[j - gap] > temp) {</span>
<span id="line8">                arr[j] = arr[j - gap];</span>
<span id="line9">                j -= gap;</span>
<span id="line10">            }</span>
<span id="line11">            arr[j] = temp;</span>
<span id="line12">        }</span>
<span id="line13">    }</span>
<span id="line14">}</span>
    `,

    java: `
<span id="line1">public class ShellSort {</span>
<span id="line2">    public static void shellSort(int[] arr) {</span>
<span id="line3">        int n = arr.length;</span>
<span id="line4">        for (int gap = n / 2; gap > 0; gap /= 2) {</span>
<span id="line5">            for (int i = gap; i < n; i++) {</span>
<span id="line6">                int temp = arr[i];</span>
<span id="line7">                int j = i;</span>
<span id="line8">                while (j >= gap && arr[j - gap] > temp) {</span>
<span id="line9">                    arr[j] = arr[j - gap];</span>
<span id="line10">                    j -= gap;</span>
<span id="line11">                }</span>
<span id="line12">                arr[j] = temp;</span>
<span id="line13">            }</span>
<span id="line14">        }</span>
<span id="line15">    }</span>
<span id="line16">}</span>
    `
};


document.addEventListener("DOMContentLoaded", () => {
    showCode("python");
});

function showCode(language) {
    document.getElementById("code-display").innerHTML = codeSnippets[language];
}

document.addEventListener("DOMContentLoaded", function () {
    let array = [22, 7, 4, 13, 9, 6, 10];
    let steps = [];
    let currentStep = 0;
    let isPlaying = false;
    let interval;

    function recordStep(arr, i, j, gap, line, label = "") {
        steps.push({ arr: [...arr], i, j, gap, line, label });
    }

    function shellSort(arr) {
        const n = arr.length;
        let gap = Math.floor(n / 2);

        recordStep(arr, -1, -1, gap, 3);

        while (gap > 0) {
            recordStep(arr, -1, -1, gap, 4);

            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;

                recordStep(arr, i, j, gap, 6);

                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    recordStep(arr, i, j, gap, 9, "shifting");
                    j -= gap;
                    recordStep(arr, i, j, gap, 10);
                }

                arr[j] = temp;
                recordStep(arr, i, j, gap, 11, "inserting");
            }

            gap = Math.floor(gap / 2);
            recordStep(arr, -1, -1, gap, 12);
        }
    }

    shellSort([...array]);

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

            if (step.label === "shifting" && index === step.j) {
                div.classList.add("shifting");
            }

            if (step.label === "inserting" && index === step.j) {
                div.classList.add("inserting");
            }

            indexCell.innerText = index;
            valueCell.appendChild(div);

            let labelText = "";
            if (index === step.i) labelText += "i ";
            if (index === step.j) labelText += "j ";
            labelCell.innerText = labelText;

            indexRow.appendChild(indexCell);
            valueRow.appendChild(valueCell);
            labelRow.appendChild(labelCell);
        });

        table.appendChild(indexRow);
        table.appendChild(valueRow);
        table.appendChild(labelRow);
        visualization.appendChild(table);

        variables.innerHTML = `<p>i = ${step.i}, j = ${step.j}, gap = ${step.gap}</p>`;

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
