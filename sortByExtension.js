// Operating System
const os = require("os");
const path = require("path");
// File System
const fs = require("fs");
// __dirname is a global variable in Node.js that contains the path of the current directory of the executed script.
const currentPath = path.join(__dirname, "Downloads");

function sortByExtension(file) {
  const extension = path.extname(file);
  if (extension != "") {
    const newPath = path.join(currentPath, extension);
    fs.mkdir(newPath, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory ${newPath}: ${err}");
        return;
      }
      moveFile(file, newPath);
    });
  }
}
function moveFile(file, newPath) {
  const oldPath = path.join(currentPath, file);
  const newFilePath = path.join(newPath, file);
  fs.rename(oldPath, newFilePath, (err) => {
    if (err) {
      console.error(`Error moving file ${file} to ${newPath}: ${err}`);
      return;
    }
    console.log(`Successfully moved file ${file} to ${newPath}`);
  });
}
fs.readdir(currentPath, (err, files) => {
  if (err) {
    console.error(`Error reading files in ${currentPath}: ${err}`);
    return;
  }
  if (!files || !files.length) {
    console.log("No files found in the directory");
    return;
  }
  files.forEach(sortByExtension);
});

// !files checks if the variable files is either null or undefined. If the variable files is not defined or has no value, it is undefined, and the condition returns true.

// !files.length checks if the length of the array is equal to 0. If the array is empty, it has a length of 0 and the condition returns true.
