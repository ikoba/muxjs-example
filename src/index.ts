import * as muxjs from "mux.js";
console.log(muxjs);

document.getElementById('file').addEventListener('change', selectFile)

function selectFile(e: any) {
  const file = e.target.files[0];
  console.log(file);

  readVideo(file).then(slice => {
    console.log(slice);
    const bytes = new Uint8Array(slice);
    const res = muxjs.mp4.probe.tracks(bytes);
    console.log(res);
  })
}

function readVideo(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
