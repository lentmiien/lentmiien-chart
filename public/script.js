let c = d3.select('#month_graph').selectAll('circle');

c.data([100, 200, 300]);
let ce = c.enter().append('circle');

c.style('fill', 'red');
ce.style('fill', 'green');

c.attr('r', 10);
ce.attr('r', 15);
c.attr('cy', 100);
ce.attr('cy', 100);
c.attr('cx', (d, i) => {return d;});
ce.attr('cx', (d, i) => {return d;});

