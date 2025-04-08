from flask import Flask, render_template, request, jsonify
import subprocess
import sys
import io

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/bubble_sort')
def bubble_sort():
    return render_template('bubble_sort.html')

@app.route('/merge_sort')
def merge_sort():
    return render_template('merge_sort.html')

@app.route('/selection_sort')
def selection_sort():
    return render_template('selection_sort.html')

@app.route('/insertion_sort')
def insertion_sort():
    return render_template('insertion_sort.html')

@app.route('/quick_sort')
def quick_sort():
    return render_template('quick_sort.html')

@app.route('/heap_sort')
def heap_sort():
    return render_template('heap_sort.html')

@app.route('/shell_sort')
def shell_sort():
    return render_template('shell_sort.html')

@app.route('/counting_sort')
def counting_sort():
    return render_template('counting_sort.html')

@app.route('/radix_sort')
def radix_sort():
    return render_template('radix_sort.html')

@app.route('/bucket_sort')
def bucket_sort():
    return render_template('bucket_sort.html')

@app.route('/input', methods=['GET', 'POST'])
def input_page():
    return render_template('input.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code', '')

    if not code.strip():
        return jsonify({"error": "No code provided"}), 400

    execution_log = []

    def trace(frame, event, arg):
        if event == "line":
            locals_snapshot = {}

            # Only store serializable values (avoid objects like `type`)
            for var, value in frame.f_locals.items():
                try:
                    locals_snapshot[var] = str(value)  # Convert to string
                except:
                    locals_snapshot[var] = "Unserializable"

            execution_log.append({
                "line": frame.f_lineno,
                "locals": locals_snapshot
            })
        return trace

    # Redirect stdout to capture print statements
    old_stdout = sys.stdout
    sys.stdout = output = io.StringIO()

    try:
        compiled_code = compile(code, '<string>', 'exec')
        sys.settrace(trace)
        exec(compiled_code, {})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        sys.settrace(None)
        sys.stdout = old_stdout  # Reset stdout

    return jsonify({
        "execution_log": execution_log,
        "output": output.getvalue().strip()
    })
 
if __name__ == '__main__':
    app.run(debug=True)
