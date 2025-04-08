document.getElementById("visualizeBtn").addEventListener("click", function () {
    let algorithm = document.getElementById("algorithm").value;

    // ✅ Load the selected algorithm dynamically
    let scriptTag = document.createElement("script");
    scriptTag.src = `/static/js/${algorithm}.js`;  // Load the correct file
    scriptTag.onload = function () {
        runAlgorithm();  // Run the algorithm after loading the script
    };

    // Remove previous script if it exists
    let existingScript = document.querySelector("#algorithmScript");
    if (existingScript) {
        existingScript.remove();
    }

    scriptTag.id = "algorithmScript";
    document.body.appendChild(scriptTag);
});
