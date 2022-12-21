const crypto    = require('crypto');
const generator = require('generate-password');

class userService {
    constructor(users, teams){
        this.users = users,
        this.teams = teams
    }

    async findUserByEmail(email){
        const user = await this.users.findUserByEmail(email);
        return user
    }

    async hashText(text){
        return crypto.createHash('md5').update(text).digest('hex');
    }

    async createUser(firstname, lastname, email, password){
        const user = await this.users.findUserByEmail(email)
        if (user){
            return {error: true, message: "This e-mail has already been used."};
        } 

        const result = await this.users.createUser(firstname, lastname, email, password)
        return result
    }

    async joinTeam(id, teamId){
        const result = await this.users.joinTeam(id, teamId)
        return result
    }

    async findAllUserByTeamId(id){
        const result = await this.users.findAllUserByTeamId(id);
        return result
    }
}

module.exports = userService;