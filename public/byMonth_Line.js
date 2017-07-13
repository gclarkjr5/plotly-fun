// Transform the data to the proper format for Plotly
function byMonth_Line(data) {
    let colors = {
        Other: `#a7a9ac`,
        Transient: `blue`,
        Unjustified: `#cddc38`,
        NoValue: `#246987`,
        Justified: `#00AFD5`
    }
    let months = _.uniq(_.map(data, x => {
        return x.Month
    }));
    let sortM = months.sort(function (a, b) {
        return new Date(a) - new Date(b)
    });

    // let ms = [];
    // let whole = []

    let byJustification = _.groupBy(data, `ClosedReason`);
    let xMonth = _.map(byJustification, (x, name) => {
        let xAxis = _.uniq(_.map(x, y => {
            return y.Month
        }));
        let xNum = _.map(xAxis, y => {
            return {
                x: y
            }
        });

        let grpbyMonth = _.groupBy(x, `Month`)
        let yAxis = _.map(grpbyMonth, y => {
            return { y: y.length }
        });
        let mergedData = _.merge(xNum, yAxis)

        let fullObj = _.map(sortM, y => {
            let f = _.find(mergedData, z => {
                return z.x === y
            });
            if(typeof f == "undefined") {
                return {
                    x: y,
                    y: NaN
                }
            } else {
                return f
            }
        });
        let fullData = {
            x: _.map(fullObj, y => {
                return y.x
            }),
            y: _.map(fullObj, y => {
                return y.y
            }),
            marker: {
                color: colors[name]
            },
            name: name,
            type: `line`
        }
        return fullData
    });

    let layout = {
        title: `Trend of Alert Justifications by Month`,
        xaxis: {
            title: `Count`
        },

        width: $(window).width() - 100,
        height: ($(window).height() - ($(`#myTabs`).height() + 5)) / 2,
        margin: {
            l: 310
        }
    }

    // // Plot the data
    Plotly.newPlot('byMonth_Line', xMonth, layout);
}