var fs = require('fs')

class WOF {
    constructor(input){
        console.log(input)

        var path = './input/' + input
        
        var data = fs.readFileSync(path)
        
        var offset = 8
        var length = 20
        
        var startStr = data.slice(0,offset)
        
        var entriesCount = startStr[6]
        
        var entriesCollectionStr = data.slice(offset, offset+length*entriesCount)
        
        
        
        
        var entriesStr = []
        for (var i = 0; i < entriesCount; i++){
            entriesStr.push(entriesCollectionStr.slice(length*i, length*i+length))
        }
        
        function fixFilename(filename){
            var charTable = '._-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            var fixed = ''
            for (var i = 0; i < filename.length; i++){
                var char = filename[i]
                if (charTable.indexOf(char) === -1) continue
                fixed += char
            }
        
            return fixed
        }
        
        var entries = []
        for (var i = 0; i < entriesStr.length; i++){
            var _eS = entriesStr[i]
        
            var dataInfo = {
                offset: _eS.slice(length-8, length-4).readUInt32LE(),
                length: _eS.slice(length-4, length).readUInt32LE(),
                filename: fixFilename(_eS.slice(0, length-8).toString().trim())
            }

            entries.push(dataInfo)
        }
        
        
        //extract data
        var outputPath = './output/' + input.split('.')[0] + '/'
        try { fs.mkdirSync(outputPath) } catch(err) {}
        for (var i = 0; i < entries.length; i++){
            var entry = entries[i]
            console.log('  |- ' + entry.filename)
            
            fs.writeFileSync(outputPath + entry.filename, data.slice(entry.offset, entry.offset+entry.length))
        }

        console.log('\n\n')
    }
}




var inputFiles = fs.readdirSync('./input/')
for (var i = 0; i <  inputFiles.length; i++){
    var file = inputFiles[i].toLowerCase()
    if (file.indexOf('.wof') < 0) continue
    var wof = new WOF(file)
}