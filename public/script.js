const plotable_col_ids = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const global_data = {
	year: {
        data: { total: {}, days: {} },
        weekday: {
            "0": { total: {}, days: {} },
            "1": { total: {}, days: {} },
            "2": { total: {}, days: {} },
            "3": { total: {}, days: {} },
            "4": { total: {}, days: {} },
            "5": { total: {}, days: {} },
            "6": { total: {}, days: {} }
        },
        array: []
    }
};

/* Data structure

global_data
  year: {
      data: { total: [plotable_col_ids], days: [plotable_col_ids] },
      weekday: { 0: [plotable_col_ids], 1...6: [plotable_col_ids] },
      array: [
        2018: {...},
        2019: {
            data: { total: [plotable_col_ids], days: [plotable_col_ids] },
            weekday: { 0: [plotable_col_ids], 1...6: [plotable_col_ids] },
            array: [
                1: {...},
                2: {...},
                 ...
                11: {...},
                12: {
                    data: { total: [plotable_col_ids], days: [plotable_col_ids] },
                    weekday: { 0: [plotable_col_ids], 1...6: [plotable_col_ids] },
                    array: [
                        1: {...},
                        2: {...},
                         ...
                        30: {...},
                        31: {
                            data: { total: [plotable_col_ids], days: [plotable_col_ids] },
                        }
                    ]
                }
            ]
        }
      ]
  }

*/

GetData();
async function GetData() {
    // Load data
    const response = await fetch('data_file.csv');
    let load_data = await response.text();
    let rows = load_data.split("\n").slice(5);// Remove all uncomplete rows
    
    for (let i = rows.length - 1; i >= 0; i--) {
        let rowdata = rows[i].split(",");
        let year = rowdata[0];
        let _2018_base_year = parseInt(year) - 2018;
        let month = rowdata[1];
        let _1_base_month = parseInt(month) - 1;
        let date = rowdata[2];
        let _1_base_date = parseInt(date) - 1;
        let wday = (new Date(parseInt(year), parseInt(month) - 1, parseInt(date))).getDay();
        let wdID = wday.toString();

        // Array[Year]
        while (global_data.year.array.length <= _2018_base_year) {
            global_data.year.array.push({
                data: { total: {}, days: {} },
                weekday: {
                    "0": { total: {}, days: {} },
                    "1": { total: {}, days: {} },
                    "2": { total: {}, days: {} },
                    "3": { total: {}, days: {} },
                    "4": { total: {}, days: {} },
                    "5": { total: {}, days: {} },
                    "6": { total: {}, days: {} }
                },
                array: []
            });
        }
        // Array[Month]
        while (global_data.year.array[_2018_base_year].array.length <= _1_base_month) {
            global_data.year.array[_2018_base_year].array.push({
                data: { total: {}, days: {} },
                weekday: {
                    "0": { total: {}, days: {} },
                    "1": { total: {}, days: {} },
                    "2": { total: {}, days: {} },
                    "3": { total: {}, days: {} },
                    "4": { total: {}, days: {} },
                    "5": { total: {}, days: {} },
                    "6": { total: {}, days: {} }
                },
                array: []
            });
        }
        // Array[Date]
        let daysinmonth = (new Date(parseInt(year), parseInt(month), 0)).getDate();
        if (global_data.year.array[_2018_base_year].array[_1_base_month].array.length == 0) {
        	for(let day = 0; day < daysinmonth; day++) {
        		global_data.year.array[_2018_base_year].array[_1_base_month].array.push({data: { total: {}, days: {} }});
        	}
        }

        for(let j = 0; j < plotable_col_ids.length; j++) {
            let colID = plotable_col_ids[j].toString();
            let value = parseInt(rowdata[plotable_col_ids[j]]);

            if (isNaN(value) == false) {
                // Overall Total data
                if(global_data.year.data.total.hasOwnProperty(colID) == true) {
                    global_data.year.data.total[colID] += value;
                    global_data.year.data.days[colID]++;
                }
                else {
                    global_data.year.data.total[colID] = value;
                    global_data.year.data.days[colID] = 1;
                }

                // Overall Weekday data
                if (global_data.year.weekday[wdID].total.hasOwnProperty(colID) == true) {
                    global_data.year.weekday[wdID].total[colID] += value;
                    global_data.year.weekday[wdID].days[colID]++;
                }
                else {
                    global_data.year.weekday[wdID].total[colID] = value;
                    global_data.year.weekday[wdID].days[colID] = 1;
                }

                // Year Total data
                if (global_data.year.array[_2018_base_year].data.total.hasOwnProperty(colID) == true) {
                    global_data.year.array[_2018_base_year].data.total[colID] += value;
                    global_data.year.array[_2018_base_year].data.days[colID]++;
                }
                else {
                    global_data.year.array[_2018_base_year].data.total[colID] = value;
                    global_data.year.array[_2018_base_year].data.days[colID] = 1;
                }

                // Year Weekday data
                if (global_data.year.array[_2018_base_year].weekday[wdID].total.hasOwnProperty(colID) == true) {
                    global_data.year.array[_2018_base_year].weekday[wdID].total[colID] += value;
                    global_data.year.array[_2018_base_year].weekday[wdID].days[colID]++;
                }
                else {
                    global_data.year.array[_2018_base_year].weekday[wdID].total[colID] = value;
                    global_data.year.array[_2018_base_year].weekday[wdID].days[colID] = 1;
                }
                
                // Month Total data
                if (global_data.year.array[_2018_base_year].array[_1_base_month].data.total.hasOwnProperty(colID) == true) {
                    global_data.year.array[_2018_base_year].array[_1_base_month].data.total[colID] += value;
                    global_data.year.array[_2018_base_year].array[_1_base_month].data.days[colID]++;
                }
                else {
                    global_data.year.array[_2018_base_year].array[_1_base_month].data.total[colID] = value;
                    global_data.year.array[_2018_base_year].array[_1_base_month].data.days[colID] = 1;
                }

                // Month Weekday data
                if (global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wdID].total.hasOwnProperty(colID) == true) {
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wdID].total[colID] += value;
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wdID].days[colID]++;
                }
                else {
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wdID].total[colID] = value;
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wdID].days[colID] = 1;
                }
                
                // Date Total data
                global_data.year.array[_2018_base_year].array[_1_base_month].array[_1_base_date].data.total[colID] = value;
                global_data.year.array[_2018_base_year].array[_1_base_month].array[_1_base_date].data.days[colID] = 1;
            }
        }
    }
}

function Plot() {
    const graph = d3.select('#month_graph');

    // Line helper function
    const lineFunction = d3.line()
        .x(function (d, i) { return i * 25; })
        .y(function (d) { return 600 - d; });

    // Draw line
    graph.append("path")
        .attr("d", lineFunction(global_data.amonth))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    
    // Draw dots
    const c = graph.selectAll('circle');
    let ce = c.data(global_data.amonth).enter().append('circle');
    ce.style('fill', 'green');
    ce.attr('r', 5);
    ce.attr('cy', (d, i) => { return 600 - d; });
    ce.attr('cx', (d, i) => { return i * 25; });
}