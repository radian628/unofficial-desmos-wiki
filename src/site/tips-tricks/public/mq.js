const MQ = MathQuill.getInterface(2);

Array.from(document.querySelectorAll(".math")).forEach(elem => {
    MQ.StaticMath(elem);
});