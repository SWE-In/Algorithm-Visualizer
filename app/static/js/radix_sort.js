const codeSnippets = {
    python: `
<span id="line1">def radix_sort(arr):</span>
<span id="line2">    max_val = max(arr)</span>
<span id="line3">    exp = 1</span>

<span id="line4">    while max_val // exp > 0:</span>
<span id="line5">        counting_sort(arr, exp)</span>
<span id="line6">        exp *= 10</span>

<span id="line7">def counting_sort(arr, exp):</span>
<span id="line8">    n = len(arr)</span>
<span id="line9">    output = [0] * n</span>
<span id="line10">    count = [0] * 10</span>

<span id="line11">    for i in range(n):</span>
<span id="line12">        index = (arr[i] // exp) % 10</span>
<span id="line13">        count[index] += 1</span>

<span id="line14">    for i in range(1, 10):</span>
<span id="line15">        count[i] += count[i - 1]</span>

<span id="line16"><span id="line17">    for i in range(n - 1, -1, -1):</span>
<span id="line17">        index = (arr[i] // exp) % 10</span>
<span id="line18">        output[count[index] - 1] = arr[i]</span>
<span id="line19">        count[index] -= 1</span></span>

<span id="line20">    for i in range(n):</span>
<span id="line21">        arr[i] = output[i]</span>
    `,
    cpp: `
<span id="line1">#include &lt;iostream&gt;</span>
<span id="line2">using namespace std;</span>

<span id="line3">void countingSort(int arr[], int n, int exp) {</span>
<span id="line4">    int output[n];</span>
<span id="line5">    int count[10] = {0};</span>

<span id="line6">    for (int i = 0; i < n; i++)</span>
<span id="line7">        count[(arr[i] / exp) % 10]++;</span>

<span id="line8">    for (int i = 1; i < 10; i++)</span>
<span id="line9">        count[i] += count[i - 1];</span>

<span id="line10">    for (int i = n - 1; i >= 0; i--) {</span>
<span id="line11">        output[count[(arr[i] / exp) % 10] - 1] = arr[i];</span>
<span id="line12">        count[(arr[i] / exp) % 10]--;</span>
<span id="line13">    }</span>

<span id="line14">    for (int i = 0; i < n; i++)</span>
<span id="line15">        arr[i] = output[i];</span>
<span id="line16">}</span>

<span id="line17">void radixSort(int arr[], int n) {</span>
<span id="line18">    int maxVal = *max_element(arr, arr + n);</span>

<span id="line19">    for (int exp = 1; maxVal / exp > 0; exp *= 10)</span>
<span id="line20">        countingSort(arr, n, exp);</span>
<span id="line21">}</span>

<span id="line22">int main() {</span>
<span id="line23">    int arr[] = {55, 45, 75, 90, 80, 40, 49, 66};</span>
<span id="line24">    int n = sizeof(arr) / sizeof(arr[0]);</span>

<span id="line25">    radixSort(arr, n);</span>

<span id="line26">    for (int i = 0; i < n; i++)</span>
<span id="line27">        cout << arr[i] << " ";</span>
<span id="line28">    return 0;</span>
<span id="line29">}</span>
`,
java: `
<span id="line1">import java.util.Arrays;</span>

<span id="line2">class RadixSort {</span>

<span id="line3">    static void countingSort(int arr[], int exp) {</span>
<span id="line4">        int n = arr.length;</span>
<span id="line5">        int output[] = new int[n];</span>
<span id="line6">        int count[] = new int[10];</span>

<span id="line7">        Arrays.fill(count, 0);</span>

<span id="line8">        for (int i = 0; i < n; i++)</span>
<span id="line9">            count[(arr[i] / exp) % 10]++;</span>

<span id="line10">        for (int i = 1; i < 10; i++)</span>
<span id="line11">            count[i] += count[i - 1];</span>

<span id="line12">        for (int i = n - 1; i >= 0; i--) {</span>
<span id="line13">            output[count[(arr[i] / exp) % 10] - 1] = arr[i];</span>
<span id="line14">            count[(arr[i] / exp) % 10]--;</span>
<span id="line15">        }</span>

<span id="line16">        for (int i = 0; i < n; i++)</span>
<span id="line17">            arr[i] = output[i];</span>
<span id="line18">    }</span>

<span id="line19">    static void radixSort(int arr[]) {</span>
<span id="line20">        int max = Arrays.stream(arr).max().getAsInt();</span>

<span id="line21">        for (int exp = 1; max / exp > 0; exp *= 10)</span>
<span id="line22">            countingSort(arr, exp);</span>
<span id="line23">    }</span>

<span id="line24">    public static void main(String args[]) {</span>
<span id="line25">        int arr[] = {55, 45, 75, 90, 80, 40, 49, 66};</span>

<span id="line26">        radixSort(arr);</span>

<span id="line27">        for (int num : arr)</span>
<span id="line28">            System.out.print(num + " ");</span>
<span id="line29">    }</span>
<span id="line30">}</span>
`,

};


document.addEventListener("DOMContentLoaded", () => {
    showCode("python");
});

function showCode(language) {
    document.getElementById("code-display").innerHTML = codeSnippets[language];
}
document.addEventListener("DOMContentLoaded", function () {
    let array = [55, 45, 75, 90, 80, 40, 49, 66];
    let steps = [];
    let currentStep = 0;
    let isPlaying = false;
    let interval;

    function recordStep(arr, digit, exp, output, count, stepDesc, line, i = null, index = null, countIndex = null, swapHappened = false, swapIndex = null) {
        steps.push({
            arr: [...arr],
            digit,
            exp,
            output: [...output],
            count: [...count],
            stepDesc,
            line,
            i,  
            index,  
            countIndex,  
            swapHappened,
            swapIndex
        });
    }

    function getMax(arr) {
        return Math.max(...arr);
    }

    function countingSort(arr, exp) {
        let output = new Array(arr.length).fill(0);
        recordStep(arr, null, exp, output, [], `Initialize output array`, 3);

        let count = new Array(10).fill(0);
        recordStep(arr, null, exp, output, count, `Initialize count array`, 4);

        for (let i = 0; i < arr.length; i++) {
            let digit = Math.floor(arr[i] / exp) % 10;
            recordStep(arr, digit, exp, output, count, `Extract digit ${digit} from ${arr[i]}`, 6, i);

            count[digit]++;
            recordStep(arr, digit, exp, output, count, `Increment count of digit ${digit}`, 7, i, null, digit);
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
            recordStep(arr, null, exp, output, count, `Update count array at index ${i}`, 9, null, i);
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            let digit = Math.floor(arr[i] / exp) % 10;
            recordStep(arr, digit, exp, output, count, `Extract digit ${digit} from ${arr[i]}`, 12, i);

            output[count[digit] - 1] = arr[i];
            recordStep(arr, digit, exp, output, count, `Place ${arr[i]} in output array`, 13, i, count[digit] - 1);

            count[digit]--;
            recordStep(arr, digit, exp, output, count, `Decrement count of digit ${digit}`, 14, i, null, digit);
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            recordStep(arr, null, exp, output, count, `Copy sorted values back to arr`, 16, i);
        }
    }

    function radixSort(arr) {
        let max = getMax(arr);
        recordStep(arr, null, null, [], [], "Find max value", 1);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }

    radixSort([...array]);

    const visualization = document.getElementById("visualization");
    const variables = document.getElementById("variables");

    function renderStep(step) {
        visualization.innerHTML = "";
    
        const table = document.createElement("table");
        table.classList.add("responsive-table");
    
        const indexRow = document.createElement("tr");
        const valueRow = document.createElement("tr");
        const variableRow = document.createElement("tr");
    
        step.arr.forEach((value, index) => {
            const indexCell = document.createElement("td");
            const valueCell = document.createElement("td");
            const variableCell = document.createElement("td");
    
            const div = document.createElement("div");
            div.classList.add("bar");
            div.style.height = `${value}px`;  // Scaling for better visualization
            div.innerText = value;
    
            // 🟡 **Fix swap highlighting**
            if (step.swapHappened && (index === step.swapIndex || index === step.swapIndex2)) {
                div.classList.add("swapping"); // Ensure both bars in swap are highlighted
            } else if (index === step.i) {
                div.classList.add("current-index");
            }
    
            indexCell.innerText = index;
            valueCell.appendChild(div);
    
            let varText = [];
            if (step.i !== null && index === step.i) varText.push(`i (${step.i})`);
            if (step.index !== null && index === step.index) varText.push(`index (${step.index})`);
            if (step.countIndex !== null && index === step.countIndex) varText.push(`count[${step.countIndex}] = ${step.count[step.countIndex]}`);
            if (step.swapHappened && (index === step.swapIndex || index === step.swapIndex2)) varText.push("Swapped");
    
            variableCell.innerText = varText.join(", ");
    
            indexRow.appendChild(indexCell);
            valueRow.appendChild(valueCell);
            variableRow.appendChild(variableCell);
        });
    
        table.appendChild(indexRow);
        table.appendChild(valueRow);
        table.appendChild(variableRow);
        visualization.appendChild(table);
    
        // 🔹 Display step details
        variables.innerHTML = `
            <p><strong>Step:</strong> ${step.stepDesc}</p>
            <p><strong>exp:</strong> ${step.exp !== null ? step.exp : '-'}</p>
            <p><strong>i:</strong> ${step.i !== undefined && step.i !== null ? step.i : '-'}</p>
            <p><strong>index:</strong> ${step.index !== undefined && step.index !== null ? step.index : '-'}</p>
            <p><strong>count:</strong> [${step.count ? step.count.join(', ') : '-'}]</p>
            <p><strong>output:</strong> [${step.output ? step.output.join(', ') : '-'}]</p>
        `;
    
        // 🔹 Highlight correct code line
        if (step.line !== null) {
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
    document.getElementById("reset").addEventListener("click", resetVisualization);
});
