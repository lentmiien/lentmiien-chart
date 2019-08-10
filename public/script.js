const plotable_col_ids = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const global_data = {
	year: {
        data: { total: {}, days: {} },
        weekday: [
            { total: {}, days: {} },
            { total: {}, days: {} },
            { total: {}, days: {} },
            { total: {}, days: {} },
            { total: {}, days: {} },
            { total: {}, days: {} },
            { total: {}, days: {} }
        ],
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
    
    for (let i = rows.length - 2; i >= 0; i--) {
        let rowdata = rows[i].split(",");
        let year = rowdata[0];
        let _2018_base_year = parseInt(year) - 2018;
        let month = rowdata[1];
        let _1_base_month = parseInt(month) - 1;
        let date = rowdata[2];
        let _1_base_date = parseInt(date) - 1;
        let wday = (new Date(parseInt(year), parseInt(month) - 1, parseInt(date))).getDay();

        // Array[Year]
        while (global_data.year.array.length <= _2018_base_year) {
            global_data.year.array.push({
                data: { total: {}, days: {} },
                weekday: [
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} }
                ],
                array: []
            });
        }
        // Array[Month]
        while (global_data.year.array[_2018_base_year].array.length <= _1_base_month) {
            global_data.year.array[_2018_base_year].array.push({
                data: { total: {}, days: {} },
                weekday: [
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} }
                ],
                array: []
            });
        }
        // Array[Date]
        let daysinmonth = (new Date(parseInt(year), parseInt(month), 0)).getDate();
        if (global_data.year.array[_2018_base_year].array[_1_base_month].array.length == 0) {
        	for(let day = 0; day < daysinmonth; day++) {
        		global_data.year.array[_2018_base_year].array[_1_base_month].array.push({data: { total: {}, days: {} }});
                for (let t = 0; t < plotable_col_ids.length; t++) {
                	global_data.year.array[_2018_base_year].array[_1_base_month].array[day].data.total[plotable_col_ids[t].toString()] = 0;
                	global_data.year.array[_2018_base_year].array[_1_base_month].array[day].data.days[plotable_col_ids[t].toString()] = 0;
                }
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
                if (global_data.year.weekday[wday].total.hasOwnProperty(colID) == true) {
                    global_data.year.weekday[wday].total[colID] += value;
                    global_data.year.weekday[wday].days[colID]++;
                }
                else {
                    global_data.year.weekday[wday].total[colID] = value;
                    global_data.year.weekday[wday].days[colID] = 1;
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
                if (global_data.year.array[_2018_base_year].weekday[wday].total.hasOwnProperty(colID) == true) {
                    global_data.year.array[_2018_base_year].weekday[wday].total[colID] += value;
                    global_data.year.array[_2018_base_year].weekday[wday].days[colID]++;
                }
                else {
                    global_data.year.array[_2018_base_year].weekday[wday].total[colID] = value;
                    global_data.year.array[_2018_base_year].weekday[wday].days[colID] = 1;
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
                if (global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].total.hasOwnProperty(colID) == true) {
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].total[colID] += value;
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].days[colID]++;
                }
                else {
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].total[colID] = value;
                    global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].days[colID] = 1;
                }
                
                // Date Total data
                global_data.year.array[_2018_base_year].array[_1_base_month].array[_1_base_date].data.total[colID] = value;
                global_data.year.array[_2018_base_year].array[_1_base_month].array[_1_base_date].data.days[colID] = 1;
            }
        }
    }

    // Setup interface
    const datatoplot = document.getElementById('datatoplot');
    datatoplot.innerHTML += '<option value="3">e_support(IN)</option>';
    datatoplot.innerHTML += '<option value="4">e_support(OUT)</option>';
    datatoplot.innerHTML += '<option value="5">Rakuten(IN)</option>';
    datatoplot.innerHTML += '<option value="6">Rakuten(OUT)</option>';
    datatoplot.innerHTML += '<option value="7">ebay(IN)</option>';
    datatoplot.innerHTML += '<option value="8">ebay(OUT)</option>';
    datatoplot.innerHTML += '<option value="9">PayPal(IN)</option>';
    datatoplot.innerHTML += '<option value="10">PayPal(OUT)</option>';
    datatoplot.innerHTML += '<option value="11">Amazon(IN)</option>';
    datatoplot.innerHTML += '<option value="12">Amazon(OUT)</option>';
    datatoplot.innerHTML += '<option value="13">Cancel</option>';
    datatoplot.innerHTML += '<option value="14">Zendesk</option>';
    datatoplot.innerHTML += '<option value="18">Total</option>';
    datatoplot.innerHTML += '<option value="19">_Graveyard</option>';
    datatoplot.innerHTML += '<option value="20">Order Acknowledgment</option>';
    datatoplot.innerHTML += '<option value="21">Order Cancellation</option>';
    datatoplot.innerHTML += '<option value="22">Order Update</option>';
    datatoplot.innerHTML += '<option value="23">Payment Acknowledgment</option>';
    datatoplot.innerHTML += '<option value="24">Payment Reminder</option>';
    datatoplot.innerHTML += '<option value="25">Payment Request</option>';
    datatoplot.innerHTML += '<option value="26">Shipping Notification</option>';
}

function Plot() {
    const year = parseInt(document.getElementById('year').value) - 2018;
    const month = parseInt(document.getElementById('month').value) - 1;
    const column = document.getElementById('datatoplot').value;
    const graph = d3.select('#month_graph');

    // X scale
    var x = d3.scaleLinear().domain([0, global_data.year.array[year].array[month].array.length]).range([50, 750]);
    // Y scale
    var y = d3.scaleLinear().domain([0, d3.max(global_data.year.array[year].array[month].array, (d) => { return d.data.total[column]; })]).range([300, 30]);

    // X axis
    let xAxis = d3.axisBottom().scale(x);
    d3.select("#month_xaxis").attr("transform", "translate(0, 300)").call(xAxis);
    // Y axis
    let yAxis = d3.axisLeft().scale(y);
    d3.select("#month_yaxis").attr("transform", "translate(50, 0)").call(yAxis);

    // Line helper function
    const lineFunction = d3.line()
        .x(function(d, i) { return x(i+1); })
        .y(function (d, i) { return y(d.data.total[column]); });

    // Draw line
    graph.select("path")
        .attr("d", lineFunction(global_data.year.array[year].array[month].array))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // Draw dots
    const c = graph.selectAll('circle').data(global_data.year.array[year].array[month].array);
    c.style('fill', (d, i) => {
        if (d.data.total["4"] > 0) {
            return 'green';
        }
        else {
            return 'red';
        }
    });
    c.attr('cy', (d, i) => { return y(d.data.total[column]); });
    c.attr('cx', (d, i) => { return x(i+1); });
    let c_enter = c.enter().append('circle');
    c_enter.style('fill', (d, i) => {
        if(d.data.total["4"] > 0) {
            return 'green';
        }
        else {
            return 'red';
        }
    });
    c_enter.attr('r', 5);
    c_enter.attr('cy', (d, i) => { return y(d.data.total[column]); });
    c_enter.attr('cx', (d, i) => { return x(i+1); });
    c.exit().remove();
}