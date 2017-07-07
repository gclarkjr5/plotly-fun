// Transform the data to the proper format for Plotly
function byMonth_Line(data) {
    let colors = {
        Other: `#a7a9ac`,
        Transient: `blue`,
        Unjustified: `#cddc38`,
        NoValue: `#246987`,
        Justified: `#00AFD5`
    }
    let byJustification = _.groupBy(data, `ClosedReason`);
    let xMonth = _.map(byJustification, (x, name) => {
        let xAxis = _.map(_.uniq(_.map(x, y => {
            return y.Month
        })), z => {
            return { x: z }
        });

        let grpbyMonth = _.groupBy(x, `Month`)
        let yAxis = _.map(grpbyMonth, y => {
            return { y: y.length }
        });
        let mergedData = _.merge(xAxis, yAxis);
        // console.log(mergedData)
        let fullData = {
            x: _.map(mergedData, y => {
                return y.x
            }),
            y: _.map(mergedData, y => {
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
            title: `Count`
        },
        // yaxis: {
        //     categoryorder: `array`,
        //     categoryarray: sorted
        // },
        width: $(window).width() - 100,
        height: ($(window).height() - ($(`#myTabs`).height() + 5))/2,
        margin: {
            l: 310,
            // r: 200
        }
    }
    // console.log()
    // // Plot the data
    Plotly.newPlot('byMonth_Line', xMonth, layout);
}