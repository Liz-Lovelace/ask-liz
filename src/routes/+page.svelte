<script>
	let message = '';
	let response = '';

	const sendMessage = async () => {
		const res = await fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message })
		});

		if (res.ok) {
			response = 'success';
		} else {
			const error = await res.json();
			response = error.message;
		}
	};
</script>

<div>
	<input type="text" bind:value={message} placeholder="Type a message..." />
	<button on:click={sendMessage}>Send Message</button>

	<p>{response}</p>
</div>
