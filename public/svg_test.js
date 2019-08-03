let AnimateTimeout;

let plotData = [
    100,
    150,
    50,
    120,
    75
];

let cursor = {
    x: 0,
    y: 0,
    label: ''
};

function PlotLine() {
	const svg = document.getElementById('svg');
	const line = document.createElement('polyline');
	let linedata = '0,' + plotData[0];
	for(let i = 1; i < plotData.length; i++) {
		linedata += ' ' + (i*100) + ',' + plotData[i];
	}
	line.setAttribute('points', linedata);
	line.setAttribute('stroke', 'rgb(50,255,50)');
	line.setAttribute('stroke-width', '3');
	line.setAttribute('fill', 'none');
	
	svg.append(line);
}
PlotLine();

function Animate(indata) {
    if (indata <= 0) { indata = 800*5-1; }

    let x = indata % 800;
    let y = plotData[parseInt(indata / 800)];
    cursor.label = '';

    document.getElementById('test').setAttribute('cx', x);
    document.getElementById('test').setAttribute('cy', y);

    let dist = Math.sqrt(((x - cursor.x) * (x - cursor.x)) + ((y - cursor.y) * (y - cursor.y)));
    if(dist < 20) {
        document.getElementById('test').setAttribute('fill', 'yellow');
        cursor.label = '(' + parseInt(indata / 800) + ',' + plotData[parseInt(indata / 800)] + ')';
    }
    else {
        document.getElementById('test').setAttribute('fill', 'blue');
    }

    document.getElementById('val_text').innerHTML = cursor.label;

    AnimateTimeout = setTimeout(() => {
        Animate(indata-1);
    }, 100);
}

Animate(800*5-1);

function MMove(event) {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    document.getElementById('cross').setAttribute('transform', 'translate(' + cursor.x + ',' + cursor.y + ')');
}