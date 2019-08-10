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
                date: [
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
                    { total: {}, days: {} },
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

                // Year Date data
                for(let avg = -2; avg <= 2; avg++) {
                    let index = _1_base_date + avg;
                    if(index < 0) { index += 31; }
                    if(index > 30) { index -= 31; }
                    if (global_data.year.array[_2018_base_year].date[index].total.hasOwnProperty(colID) == true) {
                        global_data.year.array[_2018_base_year].date[index].total[colID] += value;
                        global_data.year.array[_2018_base_year].date[index].days[colID]++;
                    }
                    else {
                        global_data.year.array[_2018_base_year].date[index].total[colID] = value;
                        global_data.year.array[_2018_base_year].date[index].days[colID] = 1;
                    }
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

    // Adjustment for old data (add 1 day for each 0 data date)
    let yy = 0;
    for (let mm = 0; mm < 12 && mm < global_data.year.array[yy].array.length; mm++) {
        for (let dd = 0; dd < 31 && dd < global_data.year.array[yy].array[mm].array.length; dd++) {
            if(global_data.year.array[yy].array[mm].array[dd].data.total['3'] == 0) {
                // 0 data date
                for(let cc = 0; cc < plotable_col_ids.length; cc++) {
                    const cc_str = plotable_col_ids[cc].toString();
                    global_data.year.data.days[cc_str]++;
                    global_data.year.array[yy].data.days[cc_str]++;
                    global_data.year.array[yy].array[mm].data.days[cc_str]++;
                }
            }
        }
    }
    yy = 1;
    for (let mm = 0; mm < 6 && mm < global_data.year.array[yy].array.length; mm++) {
        for (let dd = 0; dd < 31 && dd < global_data.year.array[yy].array[mm].array.length; dd++) {
            if (global_data.year.array[yy].array[mm].array[dd].data.total['3'] == 0) {
                // 0 data date
                for (let cc = 0; cc < plotable_col_ids.length; cc++) {
                    const cc_str = plotable_col_ids[cc].toString();
                    global_data.year.data.days[cc_str]++;
                    global_data.year.array[yy].data.days[cc_str]++;
                    global_data.year.array[yy].array[mm].data.days[cc_str]++;
                }
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
    const m_graph = d3.select('#month_graph');
    const w_graph = d3.select('#weekday_graph');
    const y_graph = d3.select('#year_graph');

    /*******************************
     * Month graph
     */

    // X scale
    var x = d3.scaleLinear().domain([0, global_data.year.array[year].array[month].array.length]).range([50, 750]);
    // Y scale
    var y = d3.scaleLinear().domain([0, d3.max(global_data.year.array[year].array[month].array, (d) => { return d.data.total[column]; })]).range([300, 30]);

    // X axis
    let xAxis = d3.axisBottom().scale(x).tickFormat((d, i) => {
        return (i*2) + "日";
    });
    d3.select("#month_xaxis").attr("transform", "translate(0, 300)").call(xAxis);
    // Y axis
    let yAxis = d3.axisLeft().scale(y);
    d3.select("#month_yaxis").attr("transform", "translate(50, 0)").call(yAxis);

    // Grid lines
    const make_y_gridlines = () => {
        return d3.axisLeft(y)
            .ticks(5)
    }
    d3.select("#month_ygrid")
        .attr("class", "grid")
        .attr("transform", "translate(50, 0)")
        .call(make_y_gridlines()
            .tickSize(-700)
            .tickFormat("")
        )

    // Line helper function
    const lineFunction = d3.line()
        .x(function(d, i) { return x(i + 1); })
        .y(function (d, i) { return y(d.data.total[column]); });
    const lineFunction2 = d3.line()
        .x(function (d, i) { return x(i + 1); })
        .y(function (d, i) { return y(d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0); });
    const w_lineFunction = d3.line()
        .x(function (d, i) { return x(i + 1); })
        .y(function (d, i) { return y(d.days[column] > 0 ? d.total[column] / d.days[column] : 0); });

    // Draw year average line
    m_graph.select("#m_yearavg")
        .attr("d", w_lineFunction(global_data.year.array[year].date))
        .attr("stroke", "rgba(200,200,200,0.5)")
        .attr("stroke-width", 5)
        .attr("fill", "none");

    // Draw this month line
    m_graph.select("#m_thism")
        .attr("d", lineFunction(global_data.year.array[year].array[month].array))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // Draw dots
    const c = m_graph.selectAll('circle').data(global_data.year.array[year].array[month].array);
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

    /*******************************
     * Weekday graph
     */

    // X scale
    x = d3.scaleLinear().domain([0, global_data.year.array[year].array[month].weekday.length]).range([50, 250]);
    // Y scale
    y = d3.scaleLinear().domain([
        0,
        d3.max([d3.max(global_data.year.array[year].weekday, (d) => { return d.days[column] > 0 ? d.total[column] / d.days[column] : 0; }), d3.max(global_data.year.array[year].array[month].weekday, (d) => { return d.days[column] > 0 ? d.total[column] / d.days[column] : 0; })])
    ]).range([550, 350]);

    // X axis
    const wtrans = ['', '', '日', '', '月', '', '火', '', '水', '', '木', '', '金', '', '土'];
    xAxis = d3.axisBottom().scale(x).tickFormat((d, i) => {
        return wtrans[i];
    });
    d3.select("#weekday_xaxis").attr("transform", "translate(0, 550)").call(xAxis);
    // Y axis
    yAxis = d3.axisLeft().scale(y);
    d3.select("#weekday_yaxis").attr("transform", "translate(50, 0)").call(yAxis);

    // Draw year average line
    w_graph.select("#wd_yearavg")
        .attr("d", w_lineFunction(global_data.year.array[year].weekday))
        .attr("stroke", "rgba(200,200,200,0.5)")
        .attr("stroke-width", 5)
        .attr("fill", "none");

    // Draw line
    w_graph.select("#wd_thism")
        .attr("d", w_lineFunction(global_data.year.array[year].array[month].weekday))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // Draw dots
    const c2 = w_graph.selectAll('circle').data(global_data.year.array[year].array[month].weekday);
    c2.style('fill', 'green');
    c2.attr('cy', (d, i) => { return y(d.days[column] > 0 ? d.total[column] / d.days[column] : 0); });
    c2.attr('cx', (d, i) => { return x(i + 1); });
    let c2_enter = c2.enter().append('circle');
    c2_enter.style('fill', 'green');
    c2_enter.attr('r', 5);
    c2_enter.attr('cy', (d, i) => { return y(d.days[column] > 0 ? d.total[column] / d.days[column] : 0); });
    c2_enter.attr('cx', (d, i) => { return x(i + 1); });
    c2.exit().remove();

    /*******************************
     * Year graph
     */

    // X scale
    x = d3.scaleLinear().domain([0, 12]).range([300, 750]);
    // Y scale
    y = d3.scaleLinear().domain([
        0,
        d3.max([d3.max(global_data.year.array[year > 0 ? year - 1 : year].array, (d) => { return d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0; }), d3.max(global_data.year.array[year].array, (d) => { return d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0; })])
    ]).range([550, 350]);

    // X axis
    //const wtrans = ['', '', '日', '', '月', '', '火', '', '水', '', '木', '', '金', '', '土'];
    xAxis = d3.axisBottom().scale(x).tickFormat((d, i) => {
        return i + '月';
    });
    d3.select("#year_xaxis").attr("transform", "translate(0, 550)").call(xAxis);
    // Y axis
    yAxis = d3.axisLeft().scale(y);
    d3.select("#year_yaxis").attr("transform", "translate(300, 0)").call(yAxis);

    // Draw year average line
    y_graph.select("#y_yearavg")
        .attr("d", lineFunction2(global_data.year.array[year > 0 ? year - 1 : year].array))
        .attr("stroke", "rgba(200,200,200,0.5)")
        .attr("stroke-width", 5)
        .attr("fill", "none");

    // Draw line
    y_graph.select("#y_thisy")
        .attr("d", lineFunction2(global_data.year.array[year].array))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // Draw dots
    const c3 = y_graph.selectAll('circle').data(global_data.year.array[year].array);
    c3.style('fill', 'green');
    c3.attr('cy', (d, i) => { return y(d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0); });
    c3.attr('cx', (d, i) => { return x(i + 1); });
    let c3_enter = c3.enter().append('circle');
    c3_enter.style('fill', 'green');
    c3_enter.attr('r', 5);
    c3_enter.attr('cy', (d, i) => { return y(d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0); });
    c3_enter.attr('cx', (d, i) => { return x(i + 1); });
    c3.exit().remove();
}