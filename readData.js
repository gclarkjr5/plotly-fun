`use strict`

const fs = require(`fs`);
const csv = require(`fast-csv`);
const moment = require(`moment`);
const chokidar = require(`chokidar`);

module.exports = callback => {
    // The location of the csv files
    let folderLocation = `C:\\Users\\clarkg\\Documents\\plotlyData\\`

    watchFolderandReadFile(folderLocation);

    // What to do when new files get added to the directory
    function watchFolderandReadFile(fLocation) {
        let watcher = chokidar.watch(fLocation, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });
        // let allData = [];
        watcher
            .on('add', path => {
                console.log(path)
                readStreamAndPushJSONtoObject(path)
                // console.log(`${fLocation}\\${file}`, allData)
            })
            // .on(`unlink`, path => {
            //     // console.log(path)
            //     let file = []
            //     fs.readdir(fLocation, (err, items) => {
            //         for (var i = 0; i < items.length; i++) {
            //             console.log(`${fLocation}\\${items[i]}`);
            //             // file.push(`${fLocation}\\${items[i]}`);
            //             readStreamAndPushJSONtoObject(`${fLocation}\\${items[i]}`)
            //         }
            //         // console.log(file)
            //     });
                
            //     // readStreamAndPushJSONtoObject(path)
            // })
    }

    // Read in the csv files, transform it and return it
    function readStreamAndPushJSONtoObject(fileName) {
        // console.log(fileName)
        fs.createReadStream(fileName)
            .pipe(csv({ objectMode: true, headers: true, trim: true }))
            .on(`data`, data => {
                let f = formatData(data);
                // arr.push()
                callback(f)
            })
            .on(`end`, () => {
                // callback(arr);
            })
    }

    // Format the data
    function formatData(data) {
        data.Month = moment(data.ClosedDate).format(`MMMM YYYY`)
        data.DN = `${data.PartNumber} : ${data.DNName}`
        delete data.PartID
        delete DNName
        return data
    }
}