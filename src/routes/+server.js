import { json } from '@sveltejs/kit';
import { NTFY_TOPIC } from '$env/static/private';
import axios from 'axios';

async function postMessageToNtfy(message) {
	return axios.post('https://ntfy.sh/lizquickping', message);
}

export async function POST({ request }) {
	const { message } = await request.json();
	await postMessageToNtfy(message);
	return json({ message }, { status: 201 });
}
