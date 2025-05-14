let countdownInterval

function setDays() {
	const input = document.getElementById('daysInput')
	const dayCount = parseInt(input.value, 10)

	if (!isNaN(dayCount) && dayCount > 0) {
		const endTime = Date.now() + dayCount * 24 * 60 * 60 * 1000

		localStorage.setItem('calendar_dayCount', dayCount)
		localStorage.setItem('calendar_endTime', endTime)

		document.getElementById('dayCount').textContent = dayCount
		startCountdown(endTime)
	}
}

function tearDay() {
	const title = document.getElementById('dayCount')
	let current = parseInt(title.textContent, 10)

	if (current > 0) {
		current -= 1
		title.textContent = current
		localStorage.setItem('calendar_dayCount', current)
	}
}

function startCountdown(endTime) {
	clearInterval(countdownInterval)

	const timerElement = document.getElementById('countdown-timer')

	function updateCountdown() {
		const now = Date.now()
		const remaining = endTime - now

		if (remaining <= 0) {
			timerElement.textContent = "Time's up!"
			clearInterval(countdownInterval)
			return
		}

		const hours = Math.floor(remaining / (1000 * 60 * 60))
		const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

		timerElement.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`
	}

	updateCountdown()
	countdownInterval = setInterval(updateCountdown, 1000)
}

window.addEventListener('DOMContentLoaded', () => {
	const savedCount = localStorage.getItem('calendar_dayCount')
	const savedEndTime = localStorage.getItem('calendar_endTime')

	if (savedCount && savedEndTime) {
		document.getElementById('dayCount').textContent = savedCount
		startCountdown(parseInt(savedEndTime, 10))
	}
})
