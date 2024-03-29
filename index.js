const svg = d3.select('svg');

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const margin = {top: 5, bottom: 5, left: 80, right: 50};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const treeLayout = d3.tree()
        .size([innerHeight, innerWidth]);

    svg
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    svg.call(d3.zoom().on('zoom', () => {
        g.attr('transform', d3.event.transform);
    }));

d3.json('data.json')
    .then(data => {
    const root = d3.hierarchy(data);
    const links = treeLayout(root).links();
    const linkPathGenerator = d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x);

    g.selectAll('path').data(links)
        .enter().append('path')
            .attr('d', linkPathGenerator);

    g.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.y)
        .attr('y', d => d.x)
        .attr('dy', '0.32em')
        .attr('text-anchor', d => d.children ? 'middle' : 'start')
        .attr('font-size', d => 3.20 - d.depth + 'em')
        .text(d => d.data.data.id);
});