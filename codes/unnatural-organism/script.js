var canvas = document.getElementById("org"),
    context = canvas.getContext("2d"),
    width = canvas.getAttribute("width"),
    height = canvas.getAttribute("height")

context.fillStyle = "#5fa"

function draw (increment) {//}, linePer) {

    var mainLineLength = width * 3 / 4,
        points = [],
        i = 0,
        j = 0

    while (j++ < width) {
        i += increment
        points.push({
            x: mainLineLength - j + width / 4,
            y: height / 2 + (Math.sin(i) * height / 4)
        })
    }

    for (var key in points) {
        if (points.hasOwnProperty(key)) {
            var value = points[key]
            context.fillRect(value.x, value.y, 1, 1)
            if (!(value.x % 50)) {//linePer)) {
                var k = value.y,
                    l = 0.001
                while (k++ < value.y + height / 4) {
                    context.fillRect(value.x + (Math.sin(l) * value.x / 2) + Math.tan(Math.atan(l += 0.01) * Math.atan(l += 0.01)), k, 1, 1)
                }
                var m = value.y,
                    n = 0.001
                while (m-- > value.y - height / 4) {
                    context.fillRect(value.x + (Math.sin(n) * value.x / 2) + Math.tan(Math.atan(n += 0.01) * Math.atan(n += 0.01)) , m, 1, 1)
                }
            }
        }
    }

}

var inc = 0.0001,
    increasing = true
//    ,
//    per = 90,
//    increasingPer = true

var loop = setInterval(function() {
    context.clearRect(0, 0, parseInt(width), parseInt(height))
    if (increasing) {
        inc += 0.0001
        if (inc > 0.01)
            increasing = false
    }
    if (!increasing) {
        inc -= 0.0001
        if (inc < -0.01)
            increasing = true
    }
//    if (increasingPer) {
//        per -= 1
//        if (per < 25)
//            increasingPer = false
//    }
//    if (!increasingPer) {
//        per += 1
//        if (per > 50)
//            increasingPer = true
//    }
    draw(inc)//, per)
}, 60)