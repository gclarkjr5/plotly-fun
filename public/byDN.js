// Transform the data to the proper format for Plotly
function byDN(data, monthFilter) {
    if (monthFilter === `All`) {
        data = data
    } else {
        data = _.filter(data, x => {
            return x.MonthFormat === monthFilter
        })
    }
    let colors = {
        Other: `#a7a9ac`,
        Transient: `blue`,
        Unjustified: `#cddc38`,
        NoValue: `#246987`,
        Justified: `#00AFD5`
    }
    let months = _.map(data, x => {
        return moment(x.ClosedDate).format(`YYYY-MM-DD`)
    });
    // console.log(months)
    let month = _.map(months, x => {
        return moment(x, `YYYY-MM-DD`)
    });
    let maxMin = {
        min: moment.min(month),
        max: moment.max(month)
    }
    // console.log(maxMin)

    let byJustification = _.groupBy(data, `ClosedReason`);
    let xJust = _.map(byJustification, (x, name) => {
        let xAxis = _.map(_.uniq(_.map(x, y => {
            return y.DN
        })), z => {
            return { x: z }
        });

        let grpbyDN = _.groupBy(x, `DN`)
        let yAxis = _.map(grpbyDN, y => {
            return { y: y.length }
        });
        let mergedData = _.merge(xAxis, yAxis);
        let fullData = {
            x: _.map(mergedData, y => {
                return y.y
            }),
            y: _.map(mergedData, y => {
                return y.x
            }),
            marker: {
                color: colors[name]
            },
            name: name,
            type: `bar`,
            orientation: `h`
        }
        return fullData
    });

    let gDN = _.groupBy(data, `DN`);
    let order = _.map(gDN, (x, i) => {
        return {
            DN: i,
            num: x.length
        }
    })
    let sorted = _.map(_.orderBy(order, [`num`], [`asc`]), x => {
        return x.DN
    })

    let layout = {
        barmode: `stack`,
        title: `${maxMin.min._i} to ${maxMin.max._i}`,
        xaxis: {
            title: `Count`
        },
        yaxis: {
            categoryorder: `array`,
            categoryarray: sorted
        },
        width: $(window).width() - 100,
        height: $(window).height() - ($(`select`).height() + 3) - ($(`#myTabs`).height() + 5),
        margin: {
            l: 310,
            // r: 200
        }
    }
    // console.log()
    // Plot the data
    Plotly.newPlot('byDN', xJust, layout);
}