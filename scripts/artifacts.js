let path = require('path')
let ncp = require('ncp').ncp

ncp.limit = 16

let srcPath = 'build/contracts/Foxcon2022.json'
let destPath = 'src/lib/Foxcon2022.json'

console.log('Copying Contract JSON files...')
ncp(srcPath, destPath, function (err) {
  if (err) {
    console.log('copy error...')
    return console.error(err)
  }
  console.log('copy complete...')
})