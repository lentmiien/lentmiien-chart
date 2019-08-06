const plotable_col_ids = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const global_data = {};

/* Data structure

global_data
  Year {
      data: { total: [plotable_col_ids], days: [plotable_col_ids] },
      array: [
        2018: {...},
        2019: {
            data: { total: [plotable_col_ids], days: [plotable_col_ids] },
            array: [
                1: {...},
                2: {...},
                 ...
                11: {...},
                12: {
                    data: { total: [plotable_col_ids], days: [plotable_col_ids] },
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