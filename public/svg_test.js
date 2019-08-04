let AnimateTimeout;

let cursor = {
    x: 0,
    y: 0,
    label: ''
};

let g_data = [];
const g_analyze = {
    "3": {
        "all": {},
        "year": {},
        "month": {},
        "date": {},
        "weekday": {}
    }
};
GetData();
async function GetData() {
    // Load data
    const response = await fetch('data_file.csv');
    let load_data = await response.text();
    let rows = load_data.split("\n").slice(5);// Remove all uncomplete rows
    
    // Setup analyze structure
    const ids = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26 ];
    for(let i = 0; i < ids.length; i++) {
        g_analyze[ids[i].toString()] = {
            "all": {
                "total": 0,
                "count": 0
            },
            "year": {
                "2018": {
                    "total": 0,
                    "count": 0
                },
                "2019": {
                    "total": 0,
                    "count": 0
                }
            },
            "month": {
                "1": {
                    "total": 0,
                    "count": 0
                },
                "2": {
                    "total": 0,
                    "count": 0
                },
                "3": {
                    "total": 0,
                    "count": 0
                },
                "4": {
                    "total": 0,
                    "count": 0
                },
                "5": {
                    "total": 0,
                    "count": 0
                },
                "6": {
                    "total": 0,
                    "count": 0
                },
                "7": {
                    "total": 0,
                    "count": 0
                },
                "8": {
                    "total": 0,
                    "count": 0
                },
                "9": {
                    "total": 0,
                    "count": 0
                },
                "10": {
                    "total": 0,
                    "count": 0
                },
                "11": {
                    "total": 0,
                    "count": 0
                },
                "12": {
                    "total": 0,
                    "count": 0
                }
            },
            "date": {
                "1": {
                    "total": 0,
                    "count": 0
                },
                "2": {
                    "total": 0,
                    "count": 0
                },
                "3": {
                    "total": 0,
                    "count": 0
                },
                "4": {
                    "total": 0,
                    "count": 0
                },
                "5": {
                    "total": 0,
                    "count": 0
                },
                "6": {
                    "total": 0,
                    "count": 0
                },
                "7": {
                    "total": 0,
                    "count": 0
                },
                "8": {
                    "total": 0,
                    "count": 0
                },
                "9": {
                    "total": 0,
                    "count": 0
                },
                "10": {
                    "total": 0,
                    "count": 0
                },
                "11": {
                    "total": 0,
                    "count": 0
                },
                "12": {
                    "total": 0,
                    "count": 0
                },
                "13": {
                    "total": 0,
                    "count": 0
                },
                "14": {
                    "total": 0,
                    "count": 0
                },
                "15": {
                    "total": 0,
                    "count": 0
                },
                "16": {
                    "total": 0,
                    "count": 0
                },
                "17": {
                    "total": 0,
                    "count": 0
                },
                "18": {
                    "total": 0,
                    "count": 0
                },
                "19": {
                    "total": 0,
                    "count": 0
                },
                "20": {
                    "total": 0,
                    "count": 0
                },
                "21": {
                    "total": 0,
                    "count": 0
                },
                "22": {
                    "total": 0,
                    "count": 0
                },
                "23": {
                    "total": 0,
                    "count": 0
                },
                "24": {
                    "total": 0,
                    "count": 0
                },
                "25": {
                    "total": 0,
                    "count": 0
                },
                "26": {
                    "total": 0,
                    "count": 0
                },
                "27": {
                    "total": 0,
                    "count": 0
                },
                "28": {
                    "total": 0,
                    "count": 0
                },
                "29": {
                    "total": 0,
                    "count": 0
                },
                "30": {
                    "total": 0,
                    "count": 0
                },
                "31": {
                    "total": 0,
                    "count": 0
                }
            },
            "weekday": {
                "0": {
                    "total": 0,
                    "count": 0
                },
                "1": {
                    "total": 0,
                    "count": 0
                },
                "2": {
                    "total": 0,
                    "count": 0
                },
                "3": {
                    "total": 0,
                    "count": 0
                },
                "4": {
                    "total": 0,
                    "count": 0
                },
                "5": {
                    "total": 0,
                    "count": 0
                },
                "6": {
                    "total": 0,
                    "count": 0
                }
            }
        };
    }

    // Process data
    for (let i = 0; i < rows.length - 1; i++) {
        g_data.push(rows[i].split(","));

        // Analyze data
        for(let j = 0; j < ids.length; j++) {
            if (g_data[i][ids[j]].length > 0) {
                let value = parseInt(g_data[i][ids[j]]);
                let thisId = ids[j].toString();
                g_analyze[thisId]["all"].total += value;
                g_analyze[thisId]["all"].count++;
                g_analyze[thisId]["year"][g_data[i][0]].total += value;
                g_analyze[thisId]["year"][g_data[i][0]].count++;
                g_analyze[thisId]["month"][g_data[i][1]].total += value;
                g_analyze[thisId]["month"][g_data[i][1]].count++;
                g_analyze[thisId]["date"][g_data[i][2]].total += value;
                g_analyze[thisId]["date"][g_data[i][2]].count++;
                let d = new Date(parseInt(g_data[i][0]), parseInt(g_data[i][1]) - 1, parseInt(g_data[i][2]));
                g_analyze[thisId]["weekday"][d.getDay().toString()].total += value;
                g_analyze[thisId]["weekday"][d.getDay().toString()].count++;
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

function GenerateGraph() {
    let maxY = 0;
    let startIndex = 0;
    let dtp = parseInt(document.getElementById('datatoplot').value);
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    for(let i = 0; i < g_data.length; i++) {
        if(year === g_data[i][0] && month === g_data[i][1]) {
            if (parseInt(g_data[i][dtp]) > maxY) {
                maxY = parseInt(g_data[i][dtp]);
            }
            startIndex = i;
        }
    }
    if (g_analyze[dtp]["month"][month].total / g_analyze[dtp]["month"][month].count > maxY) {
        maxY = g_analyze[dtp]["month"][month].total / g_analyze[dtp]["month"][month].count;
    }
    maxY *= 1.05;// Get some top margin
    const svg = document.getElementById('month_graph');
    svg.innerHTML = '';
    const x_axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    x_axis.setAttribute('x1', 0);
    x_axis.setAttribute('y1', 300);
    x_axis.setAttribute('x2', 800);
    x_axis.setAttribute('y2', 300);
    x_axis.setAttribute('stroke', 'white');
    x_axis.setAttribute('stroke-width', 4);

    // y-grid
    let lines = maxY / 100 + 1;
    let mult = 1;
    if(lines > 10) {
        lines /= 10;
        mult *= 10;
    }
    if(lines < 2) {
        lines *= 10;
        mult /= 10;
    }
    for (let y = 1; y < lines; y++) {
        const offset = mult * 100 * 300 / maxY;
        const y_grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        y_grid.setAttribute('x1', 0);
        y_grid.setAttribute('y1', 300 - (offset * y));
        y_grid.setAttribute('x2', 800);
        y_grid.setAttribute('y2', 300 - (offset * y));
        y_grid.setAttribute('stroke', 'green');
        y_grid.setAttribute('stroke-width', 1);
        svg.appendChild(y_grid);
    }

    // x-grid
    for (let x = 1; x < 32; x++) {
        const offset = 800 / 32;
        const x_grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        x_grid.setAttribute('x1', x * offset);
        x_grid.setAttribute('y1', 0);
        x_grid.setAttribute('x2', x * offset);
        x_grid.setAttribute('y2', 300);
        x_grid.setAttribute('stroke', 'grey');
        x_grid.setAttribute('stroke-width', 1);
        const x_grid_label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        x_grid_label.setAttribute('y', 320);
        let closed = true;
        for(let i = startIndex; i >= 0; i--) {
            if(g_data[i][0] === year && g_data[i][1] === month && parseInt(g_data[i][2]) == x) {
                if(g_data[i][27].length == 1) {
                    closed = false;
                }
            }
        }
        if (closed) {
            x_grid_label.setAttribute('fill', 'red');
        }
        else {
            x_grid_label.setAttribute('fill', 'white');
        }
        x_grid_label.innerHTML = x;
        svg.appendChild(x_grid);
        svg.appendChild(x_grid_label);
        let svgrect = x_grid_label.getBBox();
        x_grid_label.setAttribute('x', x * offset - (svgrect.width / 2));
    }

    svg.appendChild(x_axis);

    PlotLine(maxY, startIndex, dtp, (g_analyze[dtp]["month"][month].total / g_analyze[dtp]["month"][month].count));
}

function PlotLine(maxY, startIndex, dtp, average) {
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    const xscale = 800 / 32;
    const yscale = 300 / maxY;
    const svg = document.getElementById('month_graph');

    const avg_line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    avg_line.setAttribute('x1', 0);
    avg_line.setAttribute('y1', (300 - (average * yscale)));
    avg_line.setAttribute('x2', 800);
    avg_line.setAttribute('y2', (300 - (average * yscale)));
    avg_line.setAttribute('stroke', 'blue');
    avg_line.setAttribute('stroke-width', 2);
    svg.appendChild(avg_line);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    let linedata = (parseInt(g_data[startIndex][2]) * xscale) + ',' + (300 - (parseInt(g_data[startIndex][dtp]) * yscale));
    const dot = [document.createElementNS('http://www.w3.org/2000/svg', 'circle')];
    dot[0].setAttribute('r', '5');
    dot[0].setAttribute('cx', (parseInt(g_data[startIndex][2]) * xscale));
    dot[0].setAttribute('cy', (300 - (parseInt(g_data[startIndex][dtp]) * yscale)));
    dot[0].setAttribute('fill', 'rgb(250,255,50)');
    dot[0].setAttribute('data-label', g_data[startIndex][2] + ',' + g_data[startIndex][dtp]);
    
    for (let i = startIndex - 1; i >= 0; i--) {
        if(year === g_data[i][0] && month === g_data[i][1]) {
            linedata += ' ' + (parseInt(g_data[i][2]) * xscale) + ',' + (300 - (parseInt(g_data[i][dtp]) * yscale));
            dot.push(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
            dot[dot.length - 1].setAttribute('r', '5');
            dot[dot.length - 1].setAttribute('cx', (parseInt(g_data[i][2]) * xscale));
            dot[dot.length - 1].setAttribute('cy', (300 - (parseInt(g_data[i][dtp]) * yscale)));
            dot[dot.length - 1].setAttribute('fill', 'rgb(250,255,50)');
            dot[dot.length - 1].setAttribute('data-label', g_data[i][2] + ',' + g_data[i][dtp]);
        }
	}
	line.setAttribute('points', linedata);
	line.setAttribute('stroke', 'rgb(50,255,50)');
	line.setAttribute('stroke-width', '3');
	line.setAttribute('fill', 'none');
	
    svg.appendChild(line);
    for(let i = 0; i < dot.length; i++) {
        svg.appendChild(dot[i]);
    }
}

function Interact() {
    const datapoints = document.getElementsByTagName('circle');

    cursor.label = '';
    for(let i = 0; i < datapoints.length; i++) {
        let x = parseFloat(datapoints[i].getAttribute('cx'));
        let y = parseFloat(datapoints[i].getAttribute('cy'));

        let dist = Math.sqrt(((x - cursor.x) * (x - cursor.x)) + ((y - cursor.y) * (y - cursor.y)));
        if (dist < 10) {
            datapoints[i].setAttribute('fill', 'red');
            cursor.label = '(' + datapoints[i].getAttribute('data-label') + ')';
        }
        else {
            datapoints[i].setAttribute('fill', 'yellow');
        }
    }

    document.getElementById('val_text').innerHTML = cursor.label;
    let svgrect = document.getElementById('val_text').getBBox();
    document.getElementById('val_back').setAttribute('width', svgrect.width > 0 ? svgrect.width+10 : 0);

    AnimateTimeout = setTimeout(() => {
        Interact();
    }, 100);
}
Interact();

function MMove(event) {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    document.getElementById('cross').setAttribute('transform', 'translate(' + cursor.x + ',' + cursor.y + ')');
}