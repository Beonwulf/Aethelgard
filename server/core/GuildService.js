import slugify from 'slugify';

export class GuildService {
    constructor(db) {
        this.db = db;
    }

    async getGuilds() {
        const guilds = await this.db('guilds').select('*');
        const guildsWithMemberCount = await Promise.all(
            guilds.map(async (guild) => {
                const memberCount = await this.getGuildMemberCount(guild.id);
                return { ...guild, memberCount };
            })
        );
        return guildsWithMemberCount;
    }

    async getGuildMemberCount(guildId) {
        const result = await this.db('guild_members')
            .where({ guild_id: guildId })
            .count('id as count')
            .first();
        return result.count;
    }

    async createGuild(name, tag) {
        const slug = slugify(name, { lower: true, strict: true });
        const [newGuild] = await this.db('guilds')
            .insert({
                name,
                tag,
                slug,
            })
            .returning('*');
        return newGuild;
    }

    async deleteGuild(id) {
        await this.db('guilds').where({ id }).del();
    }
}
