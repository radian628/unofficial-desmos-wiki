if (-not (Test-Path -Path .\node.zip)) {
    Invoke-WebRequest https://nodejs.org/dist/v18.17.1/node-v18.17.1-win-x64.zip -OutFile .\node.zip 
}

if (-not (Test-Path -Path ./node)){
    Expand-Archive -Path node.zip -DestinationPath .\node
}

$env:Path = '.\node\node-v18.17.1-win-x64;' + $env:Path

npm i


npm run serve