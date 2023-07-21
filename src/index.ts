import * as muxjs from "mux.js";
console.log('↓ muxjs');
console.log(muxjs);

document.getElementById('file').addEventListener('change', selectFile)

async function selectFile(e: any) {
  const file = e.target.files[0];
  console.log('↓ file');
  console.log(file);

  const buf = await readVideo(file);
  const bytes = new Uint8Array(buf);
  const probeResult = muxjs.mp4.probe.tracks(bytes);
  console.log('↓ muxjs.mp4.probe.tracks result');
  console.table(probeResult);
  const inspectResult = muxjs.mp4.tools.inspect(bytes);
  console.log('↓ muxjs.mp4.tools.inspect result');
  console.log(inspectResult);
}

async function readVideo(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
