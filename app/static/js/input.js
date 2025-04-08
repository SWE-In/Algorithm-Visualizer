document.getElementById("executeButton").addEventListener("click", function () {
    let code = document.getElementById("codeInput").value;

    fetch('/execute', {
        method: "POST",
        body: JSON.stringify({ code: code }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("outputDisplay").textContent = "Error: " + data.error;
            return;
        }

        steps = data.execution_log;
        document.getElementById("outputDisplay").textContent = data.output;
        displayStep(0);
    });
});

let steps = [];
let currentStep = 0;
let interval = null;

// Display step-by-step execution
function displayStep(index) {
    if (index < 0 || index >= steps.length) return;

    currentStep = index;
    let step = steps[index];

    // Highlight the current line in the code snippet
    highlightCode(step.line);

    // Show all variable values
    let varOutput = "<h3>Variable State</h3><ul>";
    for (let key in step.locals) {
        let value = JSON.stringify(step.locals[key]); // Convert value to string
        if (value.length < 50) {  // Check if length is less than 50
            varOutput += `<li>${key}: ${value}</li>`;
        }
    }
    
    varOutput += "</ul>";
    document.getElementById("variables").innerHTML = varOutput;
}

// Highlight the line currently executing
function highlightCode(lineNumber) {
    let codeSnippet = document.getElementById("codeInput").value.split("\n");

    let highlightedCode = codeSnippet.map((line, index) => {
        return index + 1 === lineNumber
            ? `<span style="background: yellow; display: block;">${line}</span>`
            : `<span>${line}</span>`;
    }).join("\n");

    document.getElementById("codeSnippet").innerHTML = `<pre><code>${highlightedCode}</code></pre>`;
}


// Button event listeners
document.getElementById("next").addEventListener("click", function () {
    if (currentStep < steps.length - 1) displayStep(currentStep + 1);
});

document.getElementById("prev").addEventListener("click", function () {
    if (currentStep > 0) displayStep(currentStep - 1);
});

document.getElementById("play").addEventListener("click", function () {
    interval = setInterval(function () {
        if (currentStep < steps.length - 1) {
            displayStep(currentStep + 1);
        } else {
            clearInterval(interval);
        }
    }, 1000);
});

document.getElementById("stop").addEventListener("click", function () {
    clearInterval(interval);
});

document.getElementById("reset").addEventListener("click", function () {
    displayStep(0);
});
