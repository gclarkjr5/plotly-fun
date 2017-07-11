// Transform the data to the proper format for Plotly
function byMonth_Line(data) {
    let colors = {
        Other: `#a7a9ac`,
        Transient: `blue`,
        Unjustified: `#cddc38`,
        NoValue: `#246987`,
        Justified: `#00AFD5`
    }

    let ms = [];
    let whole = []

    let byJustification = _.groupBy(data, `ClosedReason`);
    let xMonth = _.map(byJustification, (x, name) => {
        let xAxis = _.map(_.uniq(_.map(x, y => {
            ms.push(y.Month)
            return y.Month
        })), z => {
            return { x: z }
        });

        let grpbyMonth = _.groupBy(x, `Month`)
        let yAxis = _.map(grpbyMonth, y => {
            return { y: y.length }
        });
        let mergedData = _.merge(xAxis, yAxis);
        let xAx = _.map(mergedData, y => {
            return y.x
        });
        let xAxSort = xAx.sort(function (a, b) {
            return new Date(a) - new Date(b)
        });
        let finder = _.map(xAxSort, z => {
            let found = _.find(mergedData, y => {
                return y.x === z
            })
            return found
        })
        // whole.push(finder)
        let fullData = {
            x: _.map(finder, y => {
                return y.x
            }),
            y: _.map(finder, y => {
                return y.y
            }),
            marker: {
                color: colors[name]
            },
            name: name
            // type: `bar`
        }
        return fullData
    });
    // console.log(_.flatten(whole))
    let msU = _.uniq(ms);
    let sorted = msU.sort(function (a, b) {
        return new Date(a) - new Date(b)
    });
    // console.log(xMonth)

    // let gDN = _.groupBy(data, `DN`);
    // let order = _.map(gDN, (x, i) => {
    //     return {
    //         DN: i,
    //         num: x.length
    //     }
    // })
    // let sorted = _.map(_.orderBy(order, [`num`], [`asc`]), x => {
    //     return x.DN
    // })

    let layout = {
        // barmode: `stack`,
        title: `Trend of Alert Justifications by Month`,
        xaxis: {
            title: `Count`,
            // categoryorder: `array`,
            // categoryarray: sorted
        },
        // yaxis: {
        //     categoryorder: `array`,
        //     categoryarray: sorted
        // },
        width: $(window).width() - 100,
        height: ($(window).height() - ($(`#myTabs`).height() + 5)) / 2,
        margin: {
            l: 310,
            // r: 200
        }
    }
    // console.log()
    // // Plot the data
    Plotly.newPlot('byMonth_Line', xMonth, layout);
}