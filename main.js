// typewriter - https://codepen.io/hi-im-si/pen/ALgzqo
// matrix rain - https://codepen.io/yaclive/pen/EayLYO

const base = "https://github.com/MechaXYZ/cats/raw/main/green"
var matrix = document.querySelector(".matrix")
var ctx = matrix.getContext("2d")
var images = []

matrix.width = window.innerWidth
matrix.height = window.innerHeight

var letters = " goofy.matrix.rain.effect"
letters = letters.split("")

var font_size = 50
var columns = Math.floor(matrix.width / font_size)

var drops = []

for (let i = 0; i < columns; i++) {
	drops[i] = matrix.height
}

for (var i = 1; i <= 24; i++) {
	var img = new Image(font_size, font_size)
	img.src = `${base}/cat_${i}.png`

	images[i - 1] = img
}

function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, .1)"
	ctx.fillRect(0, 0, matrix.width, matrix.height)

	for (var i = 0; i < drops.length; i++) {
		// var text = letters[drops[i] % letters.length]
		const img = images[Math.floor(Math.random() * images.length)]

		ctx.fillStyle = "#0f0"
		ctx.font = font_size + "px Lucida Console"
		// ctx.fillText(text, i * font_size, drops[i] * font_size)
		
		ctx.drawImage(img, i * font_size, drops[i] * font_size, font_size, font_size)

		drops[i]++
		
		if (drops[i] * font_size > matrix.height && Math.random() > .96) {
			drops[i] = 0
		}
	}
}

function Typewriter(el, text, time, bold) {
	this.target = text
	this.time = time
	this.bold = bold
	this.txt = ""
	this.el = el
	this.tick()
}

Typewriter.prototype.tick = function() {
	this.txt = this.target.substring(0, this.txt.length + 1)

	if (this.bold != "true") {
		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>'
	} else {
		this.el.innerHTML = '<span class="wrap"><b>'+this.txt+'</b></span>'
	}

	var delta
	var that = this
	
	if (this.time) {
		delta = (this.time / this.target.length) * 1000
	} else {
		delta = 100
	}
	
	if (this.txt != this.target) {
		setTimeout(function() {
			that.tick()
		}, delta)
	}
}

setInterval(draw, 66)

setTimeout(function() {	
	var elements = document.getElementsByClassName("typewrite")

	for (var i = 0; i < elements.length; i++) {
		var text = elements[i].getAttribute("data-text")
		var bold = elements[i].getAttribute("data-bold")
		var time = parseFloat(elements[i].getAttribute("data-time"))

		new Typewriter(elements[i], text, time, bold)
	}
}, 50)

window.onresize = function() {
	matrix.width = window.innerWidth
	matrix.height = window.innerHeight

	columns = Math.floor(matrix.width / font_size)
	drops = drops.slice(0, columns)

	for (let i = 0; i < columns; i++) {
		if (drops[i] == null) {
			drops[i] = matrix.height
		}
	}
}