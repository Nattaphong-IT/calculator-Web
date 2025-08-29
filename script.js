let currentInput = '';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // ถ้าเป็น 0 และไม่ใช่จุดทศนิยม ให้แทนที่
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    // แสดงผลด้วย × แทน *
    display.textContent = currentInput.replace(/\*/g, '×');
}
// Function เคลียร์ทั้งหมด
function clearAll() {
    currentInput = '';
    document.getElementById('display').textContent = '0';
}

// Function เคลียร์ตัวสุดท้าย
function clearEntry() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('display').textContent = currentInput.replace(/\*/g, '×');
    } else {
        clearAll();
    }
}

// Function คำนวณผลลัพธ์
function calculate() {
    try {
        if (currentInput === '') return;
        
        // แทนที่ × กลับเป็น * สำหรับการคำนวณ
        let expression = currentInput.replace(/×/g, '*');
        
        // ตรวจสอบว่ามีตัวอักษรที่ไม่ควรมี
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error('Invalid characters');
        }
        
        let result = eval(expression);
        
        // ตรวจสอบผลลัพธ์
        if (!isFinite(result)) {
            throw new Error('Invalid result');
        }
        
        // ปัดเศษถ้าจำเป็น
        if (result.toString().length > 12) {
            result = parseFloat(result.toFixed(8));
        }
        
        document.getElementById('display').textContent = result;
        currentInput = result.toString();
        shouldResetDisplay = true;
        
    } catch (error) {
        document.getElementById('display').textContent = 'Error';
        currentInput = '';
        shouldResetDisplay = true;
    }
}

// Event Listener สำหรับคีย์บอร์ด
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault(); // ป้องกันการค้นหาใน browser
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        clearEntry();
    }
});

// Function สำหรับ Debug (ไม่จำเป็นในการใช้งานจริง)
function showCurrentInput() {
    console.log('Current Input:', currentInput);
}