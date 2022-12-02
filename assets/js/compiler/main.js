import { dotnet } from './dotnet.js';
import { Gui } from './gui.js';

console.log("ciaoo");
console.log("AA");
const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const { setModuleImports, getAssemblyExports, getConfig, runMainAndExit } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

const gui = new Gui();
const source = `private static void TestKernel(Index1D index, ArrayView<int> input, ArrayView<int> output)
{
    output[index] = input[index];
}`;
gui.configureEditor();
gui.editor.getDoc().setValue(source);

document.addEventListener('DOMContentLoaded',() => {
    //LOADING OF ASSEMBLIES FOR THE ROSLYN COMPILER
    var totalFiles = 0;
    var arraybuffer;
    const req = new XMLHttpRequest();
req.responseType = 'json';
req.open('GET', "../assets/js/compiler/mono-config.json", true); //getting the config file that lists all the resources the roslyn compiler needs
req.onload = function () {
    var jsonResponse = req.response;
    arraybuffer = new Array(totalFiles);
    var loadedFiles = 0;

    for (var i = 0; i < jsonResponse.assets.length; i++) {
        if (jsonResponse.assets[i].behavior == 'assembly' && jsonResponse.assets[i].name.includes(".dll")) {
            const http = new XMLHttpRequest();
            http.onload = (e) => {
                arraybuffer[loadedFiles] = new Uint8Array(http.response);
                loadedFiles++;
                if (loadedFiles == totalFiles) { //If i loaded all the files i can enable the compile button
                    gui.hideLoader();
                }
            };
            http.open("GET", "../assets/js/compiler/managed/".concat(jsonResponse.assets[i].name));
            http.responseType = "arraybuffer";
            http.send();
            totalFiles++;
        }
    }
};
req.send(null);
});


const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

async function compile() {
    const s = gui.editor.getValue();
    var debug = document.getElementById("flexCheckDebug").checked;
    var assertions = document.getElementById("flexCheckAssertions").checked;
    var optimizationLvl = document.getElementById("optimizationLevel");
    exports.Program.Compile(s, debug, assertions, parseInt(optimizationLvl.value));
}

document.getElementById('compile').addEventListener('click', compile);

setModuleImports("main.js", {
    references: (i) => {
        return arraybuffer[i];
    },
    totalFiles: () => arraybuffer.length,
    fillOptimizationLevelDropDown: (ol, value) => {
        gui.addElementToSelect(ol, value);
    },
    setOutput: (out) => {
        gui.output.getDoc().setValue(out);
    }
});
runMainAndExit(config.mainAssemblyName, []);