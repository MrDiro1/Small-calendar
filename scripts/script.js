const STORAGE_KEY = 'tear_calendar_days'

function loadDays() {
	const stored = localStorage.getItem(STORAGE_KEY)
	return stored ? parseInt(stored, 10) : 0
}

function saveDays(days) {
	localStorage.setItem(STORAGE_KEY, days)
}

function updateDisplay(days) {
	document.getElementById('dayCount').textContent = days
}

function setDays() {
	const input = document.getElementById('daysInput')
	const days = parseInt(input.value)
	if (!isNaN(days) && days > 0) {
		saveDays(days)
		updateDisplay(days)
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

document.addEventListener('DOMContentLoaded', () => {
	updateDisplay(loadDays())
})
