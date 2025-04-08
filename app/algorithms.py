# Bubble Sort
def bubble_sort(arr):
    steps = []
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            state = [''] * n
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
                state[j] = 'swapping'
                state[j+1] = 'swapping'
            else:
                state[j] = 'active'
                state[j+1] = 'active'
            steps.append(list(state))
        if not swapped:
            break
    # Mark the final sorted state
    final_state = ['sorted'] * n
    steps.append(final_state)
    return steps

# Selection Sort
def selection_sort(arr):
    steps = []
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            state = [''] * len(arr)
            if arr[j] < arr[min_idx]:
                min_idx = j
            state[i] = 'swapping'
            steps.append(list(state))
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        state = [''] * len(arr)
        state[i] = 'sorted'
        steps.append(list(state))
    return steps

# Merge Sort
def merge_sort(arr):
    steps = []

    def merge(left, right):
        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result

    def _merge_sort(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = _merge_sort(arr[:mid])
        right = _merge_sort(arr[mid:])
        merged = merge(left, right)
        state = [''] * len(arr)
        steps.append(list(state))
        return merged

    _merge_sort(arr)
    return steps
