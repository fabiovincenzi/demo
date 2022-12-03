const source = `private static void TestKernel(Index1D index, ArrayView<int> input, ArrayView<int> output)
{
    output[index] = input[index];
}`;
var editor = CodeMirror.fromTextArea(document.getElementById("source"), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "text/x-csharp",
    extraKeys: { "Ctrl-Space": "autocomplete" }
});

var output = CodeMirror.fromTextArea(document.getElementById("output"), {
    lineNumbers: true,
    matchBrackets: true,
    readOnly: true,
    mode: "text/x-csharp",
    extraKeys: { "Ctrl-Space": "autocomplete" }
});
editor.getDoc().setValue(source);