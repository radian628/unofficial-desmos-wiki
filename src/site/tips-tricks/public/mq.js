const MQ = MathQuill.getInterface(2);

// copyable mathquill
Array.from(document.querySelectorAll(".copy")).forEach(elem => {
    const container = document.createElement("div");
    container.className = "copy-container";

    const btn = document.createElement("button");

    btn.innerText = "Copy";

    btn.onclick=()=>{
        navigator.clipboard.writeText(elem.dataset.text);
        btn.innerText = "Copied!";
        setTimeout(() => {
            btn.innerText = "Copy";
        }, 1000);
    }
    
    elem.parentElement.insertBefore(container, elem);
    elem.parentElement.removeChild(elem);
    container.appendChild(elem);
    container.appendChild(btn);
});

// mathquill elements
Array.from(document.querySelectorAll(".math")).forEach(elem => {
    elem.dataset.text = elem.innerText;
    MQ.StaticMath(elem);
});
