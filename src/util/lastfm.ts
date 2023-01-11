let apiKey = `6aed96567bff1137f593099e9134b3d0` // maybe bad, maybe not. It will be public in network requests anyways lol so

let emptyImage = "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"

const lastfm = async (setTrack: any) => {
	let scrobbler = await (await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Exerra&api_key=${apiKey}&format=json&limit=1`)).json()

	setTrack(scrobbler.recenttracks.track?.[0])
}

export { lastfm, apiKey, emptyImage }