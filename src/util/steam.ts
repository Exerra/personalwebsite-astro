const { PUBLIC_STEAM_KEY, PUBLIC_STEAM_USER, PROD } = import.meta.env

interface GamesResponse {
    response: {
        game_count: number,
        games: Array<{
            appid: number,
            playtime_forever: number,
            playtime_windows_forever: number,
            playtime_mac_forever: number,
            playtime_linux_forever: number,
            rtime_last_played: number,
        }>
    }
}

interface AchievementsResponse {
    playerstats: {
        steamID: string,
        gameName: string,
        achievements: Array<{
            apiname: string,
            achieved: 0 | 1,
            unlocktime: number 
        }>,
        success: boolean
    }
}

const getOwnedGames = async () => {
    const games = await (
        await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${PUBLIC_STEAM_KEY}&steamid=${PUBLIC_STEAM_USER}&include_played_free_games=true`)
    ).json()

    return games as GamesResponse
}

const getGameAchievements = async (appid: number) => {
    const ftch = await fetch(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=${PUBLIC_STEAM_KEY}&steamid=${PUBLIC_STEAM_USER}&appid=${appid}`)

	const data = await ftch.json()

    return data as AchievementsResponse
}

const calculatePlaytime = async () => {
    const games = await getOwnedGames()

    let playtime = 0

    games.response.games.forEach(game => {
        playtime = playtime + game.playtime_forever
    });

    return playtime
}

export { getOwnedGames, getGameAchievements, calculatePlaytime }