let SavedData = { data: [] };
if (localStorage.hasOwnProperty('GraphData') == true) {
  SavedData = JSON.parse(localStorage.getItem('GraphData'));
  const shower = document.getElementById('show');
  for (let i = 0; i < SavedData.data.length; i++) {
    shower.innerHTML += '<option value="' + i + '">' + SavedData.data[i].title + '</option>';
  }
}

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

GetData();
async function GetData() {
  // Load data
  const response = await fetch('data_file.csv');
  let load_data = await response.text();
  let rows = load_data.split('\n').slice(5); // Remove all uncomplete rows
  const datetoplot = document.getElementById('datetoplot');

  for (let i = rows.length - 2; i >= 0; i--) {
    let rowdata = rows[i].split(',');
    let year = rowdata[0];
    let _2018_base_year = parseInt(year) - 2018;
    let month = rowdata[1];
    let _1_base_month = parseInt(month) - 1;
    let date = rowdata[2];
    let _1_base_date = parseInt(date) - 1;
    let wday = new Date(parseInt(year), parseInt(month) - 1, parseInt(date)).getDay();

    // Add dates with data
    if (datetoplot.innerHTML.indexOf('_' + _2018_base_year + '_' + _1_base_month + '_') == -1) {
      datetoplot.innerHTML += '<option value="_' + _2018_base_year + '_' + _1_base_month + '_">' + year + '年' + month + '月</option>';
      datetoplot.value = '_' + _2018_base_year + '_' + _1_base_month + '_';
    }

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
    let daysinmonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    if (global_data.year.array[_2018_base_year].array[_1_base_month].array.length == 0) {
      for (let day = 0; day < daysinmonth; day++) {
        global_data.year.array[_2018_base_year].array[_1_base_month].array.push({ data: { total: {}, days: {} } });
        for (let t = 0; t < plotable_col_ids.length; t++) {
          global_data.year.array[_2018_base_year].array[_1_base_month].array[day].data.total[plotable_col_ids[t].toString()] = 0;
          global_data.year.array[_2018_base_year].array[_1_base_month].array[day].data.days[plotable_col_ids[t].toString()] = 0;
        }
      }
    }

    for (let j = 0; j < plotable_col_ids.length; j++) {
      let colID = plotable_col_ids[j].toString();
      let value = parseInt(rowdata[plotable_col_ids[j]]);

      if (isNaN(value) == false) {
        // Overall Total data
        if (global_data.year.data.total.hasOwnProperty(colID) == true) {
          global_data.year.data.total[colID] += value;
          global_data.year.data.days[colID]++;
        } else {
          global_data.year.data.total[colID] = value;
          global_data.year.data.days[colID] = 1;
        }

        // Overall Weekday data
        if (global_data.year.weekday[wday].total.hasOwnProperty(colID) == true) {
          global_data.year.weekday[wday].total[colID] += value;
          global_data.year.weekday[wday].days[colID]++;
        } else {
          global_data.year.weekday[wday].total[colID] = value;
          global_data.year.weekday[wday].days[colID] = 1;
        }

        // Year Total data
        if (global_data.year.array[_2018_base_year].data.total.hasOwnProperty(colID) == true) {
          global_data.year.array[_2018_base_year].data.total[colID] += value;
          global_data.year.array[_2018_base_year].data.days[colID]++;
        } else {
          global_data.year.array[_2018_base_year].data.total[colID] = value;
          global_data.year.array[_2018_base_year].data.days[colID] = 1;
        }

        // Year Weekday data
        if (global_data.year.array[_2018_base_year].weekday[wday].total.hasOwnProperty(colID) == true) {
          global_data.year.array[_2018_base_year].weekday[wday].total[colID] += value;
          global_data.year.array[_2018_base_year].weekday[wday].days[colID]++;
        } else {
          global_data.year.array[_2018_base_year].weekday[wday].total[colID] = value;
          global_data.year.array[_2018_base_year].weekday[wday].days[colID] = 1;
        }

        // Year Date data
        for (let avg = -2; avg <= 2; avg++) {
          let index = _1_base_date + avg;
          if (index < 0) {
            index += 31;
          }
          if (index > 30) {
            index -= 31;
          }
          if (global_data.year.array[_2018_base_year].date[index].total.hasOwnProperty(colID) == true) {
            global_data.year.array[_2018_base_year].date[index].total[colID] += value;
            global_data.year.array[_2018_base_year].date[index].days[colID]++;
          } else {
            global_data.year.array[_2018_base_year].date[index].total[colID] = value;
            global_data.year.array[_2018_base_year].date[index].days[colID] = 1;
          }
        }

        // Month Total data
        if (global_data.year.array[_2018_base_year].array[_1_base_month].data.total.hasOwnProperty(colID) == true) {
          global_data.year.array[_2018_base_year].array[_1_base_month].data.total[colID] += value;
          global_data.year.array[_2018_base_year].array[_1_base_month].data.days[colID]++;
        } else {
          global_data.year.array[_2018_base_year].array[_1_base_month].data.total[colID] = value;
          global_data.year.array[_2018_base_year].array[_1_base_month].data.days[colID] = 1;
        }

        // Month Weekday data
        if (global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].total.hasOwnProperty(colID) == true) {
          global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].total[colID] += value;
          global_data.year.array[_2018_base_year].array[_1_base_month].weekday[wday].days[colID]++;
        } else {
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
  datatoplot.innerHTML += '<option value="3">顧客問い合わせ（e_support受信）</option>';
  datatoplot.innerHTML += '<option value="4">メール送信（e_support送信）</option>';
  datatoplot.innerHTML += '<option value="5">顧客問い合わせ（楽天受信）</option>';
  datatoplot.innerHTML += '<option value="6">メール送信（楽天送信）</option>';
  datatoplot.innerHTML += '<option value="7">ebay問い合わせ（受信）</option>';
  datatoplot.innerHTML += '<option value="8">ebayメッセージ（送信）</option>';
  datatoplot.innerHTML += '<option value="9">PayPal異議・クレーム更新</option>';
  datatoplot.innerHTML += '<option value="10">PayPal更新の処理</option>';
  datatoplot.innerHTML += '<option value="11">Amazon問い合わせ（受信）</option>';
  datatoplot.innerHTML += '<option value="12">Amazonメッセージ（送信）</option>';
  datatoplot.innerHTML += '<option value="13">顧客問い合わせでのキャンセル</option>';
  datatoplot.innerHTML += '<option value="14">Zendesk新規チケット</option>';
  datatoplot.innerHTML += '<option value="18">FMのe_support送信合計</option>';
  datatoplot.innerHTML += '<option value="19">その他の送信</option>';
  datatoplot.innerHTML += '<option value="20">注文完了</option>';
  datatoplot.innerHTML += '<option value="21">注文キャンセル</option>';
  datatoplot.innerHTML += '<option value="22">注文変更</option>';
  datatoplot.innerHTML += '<option value="23">決済完了</option>';
  datatoplot.innerHTML += '<option value="24">入金リマインダー</option>';
  datatoplot.innerHTML += '<option value="25">入金案内</option>';
  datatoplot.innerHTML += '<option value="26">発送案内</option>';
}

function Plot() {
  const datetoplot = document.getElementById('datetoplot').value.split('_');
  const year = parseInt(datetoplot[1]);
  const month = parseInt(datetoplot[2]);
  const column = document.getElementById('datatoplot').value;
  const m_graph = d3.select('#month_graph');
  const w_graph = d3.select('#weekday_graph');
  const y_graph = d3.select('#year_graph');

  /*******************************
   * Month graph
   */

  // X scale
  var x = d3
    .scaleLinear()
    .domain([0, global_data.year.array[year].array[month].array.length])
    .range([50, 750]);
  // Y scale
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(global_data.year.array[year].array[month].array, d => {
        return d.data.total[column];
      })
    ])
    .range([300, 30]);

  // X axis
  let xAxis = d3
    .axisBottom()
    .scale(x)
    .tickFormat((d, i) => {
      return i * 2 + '日';
    });
  d3.select('#month_xaxis')
    .attr('transform', 'translate(0, 300)')
    .call(xAxis);
  // Y axis
  let yAxis = d3.axisLeft().scale(y);
  d3.select('#month_yaxis')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);

  // Grid lines
  const make_y_gridlines = () => {
    return d3.axisLeft(y).ticks(5);
  };
  d3.select('#month_ygrid')
    .attr('class', 'grid')
    .attr('transform', 'translate(50, 0)')
    .call(
      make_y_gridlines()
        .tickSize(-700)
        .tickFormat('')
    );

  // Line helper function
  const lineFunction = d3
    .line()
    .x(function(d, i) {
      return x(i + 1);
    })
    .y(function(d, i) {
      return y(d.data.total[column]);
    });
  const lineFunction2 = d3
    .line()
    .x(function(d, i) {
      return x(i + 1);
    })
    .y(function(d, i) {
      return y(d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0);
    });
  const w_lineFunction = d3
    .line()
    .x(function(d, i) {
      return x(i + 1);
    })
    .y(function(d, i) {
      return y(d.days[column] > 0 ? d.total[column] / d.days[column] : 0);
    });

  // Draw year average line
  m_graph
    .select('#m_yearavg')
    .attr('d', w_lineFunction(global_data.year.array[year].date))
    .attr('stroke', 'rgba(200,200,200,0.5)')
    .attr('stroke-width', 5)
    .attr('fill', 'none');

  // Draw this month line
  m_graph
    .select('#m_thism')
    .attr('d', lineFunction(global_data.year.array[year].array[month].array))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  // Draw dots
  const c = m_graph.selectAll('circle').data(global_data.year.array[year].array[month].array);
  c.style('fill', (d, i) => {
    if (d.data.total['4'] > 0) {
      return 'green';
    } else {
      return 'red';
    }
  });
  c.attr('cy', (d, i) => {
    return y(d.data.total[column]);
  });
  c.attr('cx', (d, i) => {
    return x(i + 1);
  });
  c.insert('svg:title', ':first-child').text(d => d.data.total[column]);
  let c_enter = c.enter().append('circle');
  c_enter.style('fill', (d, i) => {
    if (d.data.total['4'] > 0) {
      return 'green';
    } else {
      return 'red';
    }
  });
  c_enter.attr('r', 5);
  c_enter.attr('cy', (d, i) => {
    return y(d.data.total[column]);
  });
  c_enter.attr('cx', (d, i) => {
    return x(i + 1);
  });
  c_enter.insert('svg:title', ':first-child').text(d => d.data.total[column]);
  c.exit().remove();

  /*******************************
   * Weekday graph
   */

  // X scale
  x = d3
    .scaleLinear()
    .domain([0, global_data.year.array[year].array[month].weekday.length])
    .range([50, 250]);
  // Y scale
  y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max([
        d3.max(global_data.year.array[year].weekday, d => {
          return d.days[column] > 0 ? d.total[column] / d.days[column] : 0;
        }),
        d3.max(global_data.year.array[year].array[month].weekday, d => {
          return d.days[column] > 0 ? d.total[column] / d.days[column] : 0;
        })
      ])
    ])
    .range([550, 350]);

  // X axis
  const wtrans = ['', '', '日', '', '月', '', '火', '', '水', '', '木', '', '金', '', '土'];
  xAxis = d3
    .axisBottom()
    .scale(x)
    .tickFormat((d, i) => {
      return wtrans[i];
    });
  d3.select('#weekday_xaxis')
    .attr('transform', 'translate(0, 550)')
    .call(xAxis);
  // Y axis
  yAxis = d3.axisLeft().scale(y);
  d3.select('#weekday_yaxis')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);

  // Draw year average line
  w_graph
    .select('#wd_yearavg')
    .attr('d', w_lineFunction(global_data.year.array[year].weekday))
    .attr('stroke', 'rgba(200,200,200,0.5)')
    .attr('stroke-width', 5)
    .attr('fill', 'none');

  // Draw line
  w_graph
    .select('#wd_thism')
    .attr('d', w_lineFunction(global_data.year.array[year].array[month].weekday))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  // Draw dots
  const c2 = w_graph.selectAll('circle').data(global_data.year.array[year].array[month].weekday);
  c2.style('fill', 'green');
  c2.attr('cy', (d, i) => {
    return y(d.days[column] > 0 ? d.total[column] / d.days[column] : 0);
  });
  c2.attr('cx', (d, i) => {
    return x(i + 1);
  });
  c2.insert('svg:title', ':first-child').text(d => d.days[column] > 0 ? d.total[column] / d.days[column] : 0);
  let c2_enter = c2.enter().append('circle');
  c2_enter.style('fill', 'green');
  c2_enter.attr('r', 5);
  c2_enter.attr('cy', (d, i) => {
    return y(d.days[column] > 0 ? d.total[column] / d.days[column] : 0);
  });
  c2_enter.attr('cx', (d, i) => {
    return x(i + 1);
  });
  c2_enter.insert('svg:title', ':first-child').text(d => d.days[column] > 0 ? d.total[column] / d.days[column] : 0);
  c2.exit().remove();

  /*******************************
   * Year graph
   */

  // X scale
  x = d3
    .scaleLinear()
    .domain([0, 12])
    .range([300, 750]);
  // Y scale
  y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max([
        d3.max(global_data.year.array[year > 0 ? year - 1 : year].array, d => {
          return d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0;
        }),
        d3.max(global_data.year.array[year].array, d => {
          return d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0;
        })
      ])
    ])
    .range([550, 350]);

  // X axis
  //const wtrans = ['', '', '日', '', '月', '', '火', '', '水', '', '木', '', '金', '', '土'];
  xAxis = d3
    .axisBottom()
    .scale(x)
    .tickFormat((d, i) => {
      return i + '月';
    });
  d3.select('#year_xaxis')
    .attr('transform', 'translate(0, 550)')
    .call(xAxis);
  // Y axis
  yAxis = d3.axisLeft().scale(y);
  d3.select('#year_yaxis')
    .attr('transform', 'translate(300, 0)')
    .call(yAxis);

  // Draw year average line
  y_graph
    .select('#y_yearavg')
    .attr('d', lineFunction2(global_data.year.array[year > 0 ? year - 1 : year].array))
    .attr('stroke', 'rgba(200,200,200,0.5)')
    .attr('stroke-width', 5)
    .attr('fill', 'none');

  // Draw line
  y_graph
    .select('#y_thisy')
    .attr('d', lineFunction2(global_data.year.array[year].array))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  // Draw dots
  const c3 = y_graph.selectAll('circle').data(global_data.year.array[year].array);
  c3.style('fill', 'green');
  c3.attr('cy', (d, i) => {
    return y(d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0);
  });
  c3.attr('cx', (d, i) => {
    return x(i + 1);
  });
  c3.insert('svg:title', ':first-child').text(d => d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0);
  let c3_enter = c3.enter().append('circle');
  c3_enter.style('fill', 'green');
  c3_enter.attr('r', 5);
  c3_enter.attr('cy', (d, i) => {
    return y(d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0);
  });
  c3_enter.attr('cx', (d, i) => {
    return x(i + 1);
  });
  c3_enter.insert('svg:title', ':first-child').text(d => d.data.days[column] > 0 ? d.data.total[column] / d.data.days[column] : 0);
  c3.exit().remove();

  // Update title
  const bu_date = document.getElementById('datetoplot');
  const bu_data = document.getElementById('datatoplot');
  document.getElementById('title_cur').innerHTML =
    bu_data.options[bu_data.selectedIndex].text + '(' + bu_date.options[bu_date.selectedIndex].text + ')';
}

function CopyGraph() {
  const bu_date = document.getElementById('datetoplot');
  const bu_data = document.getElementById('datatoplot');
  const data = document
    .getElementsByClassName('graph')[0]
    .outerHTML.split('id=')
    .join('oldid=');
  SavedData.data.push({
    title: bu_data.options[bu_data.selectedIndex].text + '(' + bu_date.options[bu_date.selectedIndex].text + ')',
    content: data
  });
  const shower = document.getElementById('show');
  const bu_shower = shower.value;
  shower.innerHTML +=
    '<option value="' + (SavedData.data.length - 1) + '">' + SavedData.data[SavedData.data.length - 1].title + '</option>';
  document.getElementById('datetoplot').value = bu_date.value;
  document.getElementById('datatoplot').value = bu_data.value;
  document.getElementById('show').value = bu_shower;

  // Save data in browser
  localStorage.setItem('GraphData', JSON.stringify(SavedData));

  // Display the graph
  document.getElementById('show').value = (SavedData.data.length - 1).toString();
  Display();
}

function Display() {
  const shower = document.getElementById('show');

  // Clear snd stop if 無し selected
  if (shower.value.length == 0) {
    document.getElementById('graph').innerHTML = '';
    return;
  }

  const sid = parseInt(shower.value);
  document.getElementById('graph').innerHTML = SavedData.data[sid].content;

  // Update title
  document.getElementById('title_save').innerHTML = SavedData.data[sid].title;
}

function DeleteGraph() {
  const shower = document.getElementById('show');

  // Stop if 無し selected
  if (shower.value.length == 0) {
    return;
  }

  // Calculate index and remove data
  const sid = parseInt(shower.value);
  SavedData.data.splice(sid, 1);
  document.getElementById('graph').innerHTML = '';

  // Update select box
  shower.innerHTML = '<option value="">無し</option>';
  SavedData.data.forEach((d, i) => {
    shower.innerHTML += '<option value="' + i + '">' + d.title + '</option>';
  });

  // Save data in browser
  localStorage.setItem('GraphData', JSON.stringify(SavedData));
}

function GenerateReport() {
  const datetoplot = document.getElementById('datetoplot').value.split('_');
  const year = parseInt(datetoplot[1]);
  const month = parseInt(datetoplot[2]);
  const lastmonth_year = year - (month == 0 ? 1 : 0);
  const lastmonth_month = month == 0 ? 11 : month - 1;

  let report = `【${month + 1}月のメール処理のレポート】<br>`;
  report += `お疲れ様です。<br><br>`;
  report += `${month + 1}月分のメール処理データを添付いたします。<br><br>`;
  report += `■前月と比べると<br>`;

  // 3: 顧客問い合わせ（e_support受信）
  let tv = global_data.year.array[year].array[month].data.total['3'];
  let lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['3'];
  let value = tv - lv;
  let percent = parseInt((10000 * value) / lv) / 100;
  let sign = value > 0 ? '+' : '';
  report += `・メール問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 5: 顧客問い合わせ（楽天受信）
  tv = global_data.year.array[year].array[month].data.total['5'];
  lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['5'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・楽天問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 7: ebay問い合わせ（受信）
  tv = global_data.year.array[year].array[month].data.total['7'];
  lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['7'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・eBay問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 9: PayPal異議・クレーム更新
  tv = global_data.year.array[year].array[month].data.total['9'];
  lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['9'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・PayPal問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 11:Amazon問い合わせ（受信）
  tv = global_data.year.array[year].array[month].data.total['11'];
  lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['11'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・アマゾン問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 13:顧客問い合わせでのキャンセル
  tv = global_data.year.array[year].array[month].data.total['13'];
  lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['13'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・キャンセルが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 14:Zendesk新規チケット
  tv = global_data.year.array[year].array[month].data.total['14'];
  lv = global_data.year.array[lastmonth_year].array[lastmonth_month].data.total['14'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・Zendeskチケットが　${sign}${value}　件変わっている(${sign}${percent}%)<br><br>`;

  report += `■去年の${month + 1}月と比べると<br>`;

  // 3: 顧客問い合わせ（e_support受信）
  tv = global_data.year.array[year].array[month].data.total['3'];
  lv = global_data.year.array[year - 1].array[month].data.total['3'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・メール問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 5: 顧客問い合わせ（楽天受信）
  tv = global_data.year.array[year].array[month].data.total['5'];
  lv = global_data.year.array[year - 1].array[month].data.total['5'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・楽天問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 7: ebay問い合わせ（受信）
  tv = global_data.year.array[year].array[month].data.total['7'];
  lv = global_data.year.array[year - 1].array[month].data.total['7'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・eBay問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 9: PayPal異議・クレーム更新
  tv = global_data.year.array[year].array[month].data.total['9'];
  lv = global_data.year.array[year - 1].array[month].data.total['9'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・PayPal問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 11:Amazon問い合わせ（受信）
  tv = global_data.year.array[year].array[month].data.total['11'];
  lv = global_data.year.array[year - 1].array[month].data.total['11'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・アマゾン問い合わせが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 13:顧客問い合わせでのキャンセル
  tv = global_data.year.array[year].array[month].data.total['13'];
  lv = global_data.year.array[year - 1].array[month].data.total['13'];
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・キャンセルが　${sign}${value}　件変わっている(${sign}${percent}%)<br>`;

  // 14:Zendesk新規チケット
  tv = global_data.year.array[year].array[month].data.total['14'];
  lv = global_data.year.array[year - 1].array[month].data.total['14'];
  lv = isNaN(lv) ? 0 : lv;
  value = tv - lv;
  percent = parseInt((10000 * value) / lv) / 100;
  sign = value > 0 ? '+' : '';
  report += `・Zendeskチケットが　${sign}${value}　件変わっている(${sign}${percent}%)<br><br>`;

  report += `よろしくお願いいたします。`;

  document.getElementById('report').innerHTML = report;
}
