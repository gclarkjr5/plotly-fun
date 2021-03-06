// Transform the data to the proper format for Plotly
function byMonth(data) {
    let colors = {
        Other: `#a7a9ac`,
        Transient: `blue`,
        Unjustified: `#cddc38`,
        NoValue: `#246987`,
        Justified: `#00AFD5`
    }

    let ms = [];

    let byJustification = _.groupBy(data, `ClosedReason`);
    let xMonth = _.map(byJustification, (x, name) => {
        let xAxis = _.map(_.uniq(_.map(x, y => {
            ms.push(y.Month)
            return y.Month
        })), z => {
            return { x : z }
        });

        let grpbyMonth = _.groupBy(x, `Month`)
        let yAxis = _.map(grpbyMonth, y => {
            return { y: y.length }
        });
        let mergedData = _.merge(xAxis, yAxis);
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
            name: name,
            type: `bar`
        }
        return fullData
    });
    let msU = _.uniq(ms);
    let sorted = msU.sort(function (a, b) {
        return new Date(a) - new Date(b)
    });

    let layout = {
        barmode: `stack`,
        title: `Alerts by Month`,
        xaxis: {
            title: `Count`,
            categoryorder: `array`,
            categoryarray: sorted
        },
        width: $(window).width() - 100,
        height: ($(window).height() - ($(`#myTabs`).height() + 5)) / 2,
        margin: {
            l: 310
        }
    }
    // // Plot the data
    Plotly.newPlot('byMonth', xMonth, layout);
}