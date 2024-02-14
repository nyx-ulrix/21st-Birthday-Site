console.clear();

const circleElement = document.querySelector(".cursorCircle");
const smallCircleElement = document.querySelector(".innercircle");

//track mouse pos
const mouse = { x: 0, y: 0 };
//prev mouse current pos
const previousMouse = { x: 0, y: 0 };

const circle = { x: 0, y: 0 };

// Initialize variables to track scaling and rotation
let currentScale = 0; // Track current scale value
let currentAngle = 0; // Track current angle value

// Update mouse position on the 'mousemove' event
window.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

// Smoothing value for motion (0 = smoother, 1 = instant)
const speed = 0.1;

// Start animation
const tick = () => {
	// MOVE
	// Calculate circle movement using on current mouse pos and speed
	circle.x += (mouse.x - circle.x) * speed;
	circle.y += (mouse.y - circle.y) * speed;
	// Create a transformation string for cursor translation
	const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

	// SQUEEZE
	// distance from previous mouse pos the change in mouse position
	const deltaMouseX = mouse.x - previousMouse.x;
	const deltaMouseY = mouse.y - previousMouse.y;
	// Update previous mouse position
	previousMouse.x = mouse.x;
	previousMouse.y = mouse.y;
	// Calculate mouse velocity using Pythagorean theorem and adjust speed
	const mouseVelocity = Math.min(
		Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 2,
		90
	);
	// Convert mouse velocity to a value in the range [0, 1]
	const scaleValue = (mouseVelocity / 200) * .1;
	// 4. Smoothly update the current scale
	currentScale += (scaleValue - currentScale) * speed;
	// Create a transformation string for scaling
	const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

	// ROTATE
	// Calculate the angle using the atan2 function
	const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
	// Check for a value to reduce shakiness at low mouse velocity
	if (mouseVelocity > 60) {
		currentAngle = angle;
	}
	// Create a transformation string for rotation
	const rotateTransform = `rotate(${currentAngle}deg)`;

	// Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
	circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
	window.requestAnimationFrame(tick);
};

// Start the animation loop
tick();
